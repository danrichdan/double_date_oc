<?php
require_once('../profile/profile_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$profile = null;
$response = [];

// If profile supplied, do basic checks.
if (isset($_POST['profile']) && ($profile = $_POST['profile'])) {
    // Convert and sanitize the fields in the profile.
    $temp = print_r($profile, true);
    $profile = convert_profile_from_client($profile);

    // Check that user is logged in; no need for administrator check.
    if ($_SESSION && $_SESSION['user_record'] && $_SESSION['user_record']['userLevel']) {
        // Check that the data supplied is valid.
        $username = $profile['username'];
        $zipcode = $profile['zipcode'];
        $distanceMax = $profile['distanceMax'];
        $ourAgeMin = $profile['ourAgeMin'];
        $ourAgeMax = $profile['ourAgeMax'];
        $theirAgeMin = $profile['theirAgeMin'];
        $theirAgeMax = $profile['theirAgeMax'];

        if ($username >= 'DD000000' && $username <= 'DD999999' &&
            $zipcode >= 90000 && $zipcode <= 99999 &&
            $distanceMax >= 1 && $distanceMax <= 100 &&
            $ourAgeMin >= 18 && $ourAgeMin <= 99 &&
            $ourAgeMax >= $ourAgeMin && $ourAgeMax <= 99) {
            // Check the connection.
            if ($conn) {
                // Validate the zipcode field, and translate it to city, state, latitude, and longitude.
                $zipcodeRow = lookup_zipcode($conn, $profile['zipcode']);
                if ($zipcodeRow) {
                    // lookup_zipcode succeeded; save lat/long to insert in query.
                    $latitude = $zipcodeRow['latitude'];
                    $longitude = $zipcodeRow['longitude'];

                    /* Sample query: see sample_matches.php */

                    // Start with the static part of the query.
                    $selectQuery = "SELECT *,
                    ((abs(`p`.`latitude` - $latitude) * 69.172) + (abs(`p`.`longitude` - $longitude) * 0.83 * 69.172)) AS distance
                    FROM `users` AS `u`
                    JOIN `profiles` AS `p` ON `u`.`username` = `p`.`username`
                    WHERE `u`.`userLevel` = 'normal'
                    AND `u`.`locked` = '0' ";

                    // Add the part where we check the age ranges against the supplied profile.
                    $selectQuery .= "AND `p`.`ourAgeMin` >= $theirAgeMin
                    AND `p`.`ourAgeMax` <= $theirAgeMax
                    AND `p`.`theirAgeMin` <= $ourAgeMin
                    AND `p`.`theirAgeMax` >= $ourAgeMax ";

                    // Add the part where we select on any interests in the supplied profile.
                    $selectQuery .= "AND (";
                    $interestCount = 0;

                    global $booleanFields;
                    foreach ($booleanFields as $field) {
                        if ($profile[$field]) {
                            // Set in supplied profile; add it to the query.
                            if ($interestCount != 0) {
                                $selectQuery .= "OR ";
                            }
                            $selectQuery .= "`p`.`$field` = '1' ";
                            $interestCount += 1;
                        }
                    }

                    // Add the closing parenthesis for the selection on interests.
                    $selectQuery .= ") ";

                    // Add the distance checks against the stored record and the supplied profile.
                    $selectQuery .= "HAVING distance <= `p`.`distanceMax`
                               AND distance <= $distanceMax ";

                    // Make sure at least one of the interests was supplied, or there is no point in the query.
                    if ($interestCount) {
                        $result = mysqli_query($conn, $selectQuery);
                        if ($result && (mysqli_num_rows($result) >= 1)) {
                            $matches = [];
                            // Gather/calculate the data we will use for the INSERT query.
                            while ($row = mysqli_fetch_assoc($result)) {
                                // Calculate quality of match.  Note that if the age or distance check matched,
                                // or there are no common interests, this has already been filtered out of the
                                // return data.  The calculation is based on the distance and the number of matches.
                                // The lower the distance, the better.  The more matches, the better.
                                // Current = (50 - distance) + (5 * interests<up to 10>)
                                $distancePoints = 50 - round($row['distance']);
                                if ($distancePoints < 0) {
                                    $distancePoints = 0;
                                }

                                $commonInterestCount = get_common_interest_count($profile, $row);
                                $interestPoints = 5 * $commonInterestCount;
                                if ($interestPoints > 50) {
                                    $interestPoints = 50;
                                }

                                $quality = $distancePoints + $interestPoints;
                                
                                $match = [
                                    'username' => $row['username'],
                                    'distance' => $row['distance'],
                                    'commonInterestCount' => $commonInterestCount,
                                    'quality'  => $quality
                                ];
                                
                                // Push data into return array.
                                array_push($matches, $match);
                            }

                            // Now convert the $matches array into a new query to INSERT / UPDATE the match table.
                            $insertQuery = "INSERT INTO `matches`
                            (`firstId`, `secondId`, `quality`)
                            VALUES 
                            ";

                            // Add values from the matches array.  Note that the matches array should always return
                            // at least one match, since it will be a perfect match for itself.  This should be
                            // filtered out in the following code.
                            $first_one = true;
                            foreach ($matches as $match) {
                                if ($username == $match['username']) {
                                    continue;
                                }
                                else if ($username < $match['username']) {
                                    $firstId = $username;
                                    $secondId = $match['username'];
                                } else {
                                    $firstId = $match['username'];
                                    $secondId = $username;
                                }
                                $quality = $match['quality'];

                                // Handle the comma on all but the last one.
                                if ($first_one) {
                                    $first_one = false;
                                } else {
                                    $insertQuery .= ', ';
                                }

                                $insertQuery .= "('$firstId', '$secondId', $quality)";
                            }

                            // Add the constant part at the end of the query.
                            $insertQuery .= " ON DUPLICATE KEY UPDATE `quality` = VALUES(`quality`);";

                            // Try to execute the query. Note that mysqli_affected_rows will only return the number
                            // of rows inserted. It is quite normal that no rows are added, and rows are only
                            // modified, or even that no rows will be modified. Because of that, we specifically
                            // do NOT try to test mysqli_affected_rows from the $insertQuery.
                            $result = mysqli_query($conn, $insertQuery);
                            if ($result) {
                                // Log this to the error_log.
                                dd_error_log("match calculation completed for '$username'");

                                // Build success response to user.
                                $response = [
                                    'success' => true,
                                    'temp' => $temp,
                                    'selectQuery' => $selectQuery,
                                    'matches' => $matches,
                                    'insertQuery' => $insertQuery
                                ];
                            }
                            // Insert query failed.
                            else {
                                dd_error_log("match/calculate insert query failed");
                                dd_error_log("failed query: " . $insertQuery);
                                $response = [
                                    'success' => false,
                                    'message' => 'Insert query failed',
                                    'temp' => $temp,
                                    'selectQuery' => $selectQuery,
                                    'matches' => $matches,
                                    'insertQuery' => $insertQuery
                                ];
                            }
                        }
                        // Select query failed.
                        else {
                            dd_error_log("match/calculate select query failed");
                            dd_error_log("failed query: " . $selectQuery);
                            $response = [
                                'success' => false,
                                'message' => 'Select query failed',
                                'selectQuery' => $selectQuery
                            ];
                        }
                    }
                    // No interests were specified.
                    else {
                        dd_error_log("match/calculate with no interests");
                        $response = [
                            'success' => false,
                            'message' => 'Invalid profile parameter: no interests'
                        ];
                    }
                }
                // Lookup zipcode failed.
                else {
                    dd_error_log("match/calculate zipcode failed for $zipcode");
                    $response = [
                        'success' => false,
                        'message' => 'Invalid zipcode'
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                dd_error_log("match/calculate failed to connect to database");
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }

        }
        // Invalid parameter passed.
        else {
            dd_error_log("match/calculate invalid parameter");
            $response = [
                'success' => false,
                'message' => 'Invalid profile parameter'
            ];
        }
    }
    // No session or not logged in.
    else {
        dd_error_log("match/calculate with no session or login");
        $response = [
            'success' => false,
            'temp' => $temp,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    dd_error_log("match/calculate missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing profile'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
