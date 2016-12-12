<?php
require_once('profile_common.php');
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
        $zipcode = $profile['zipcode'];
        $distanceMax = $profile['distanceMax'];
        $ourAgeMin = $profile['ourAgeMin'];
        $ourAgeMax = $profile['ourAgeMax'];
        $theirAgeMin = $profile['theirAgeMin'];
        $theirAgeMax = $profile['theirAgeMax'];

        if ($zipcode >= 90000 && $zipcode <= 99999 &&
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

                    /* Sample query.
                    SELECT *,
                    ((abs(`p`.`latitude` - 33.70) * 69.172) + (abs(`p`.`longitude` - -117.87) * 0.83 * 69.172)) AS distance
                    FROM `users` AS `u`
                    JOIN `profiles` AS `p` ON `u`.`username` = `p`.`username`

                    # Find normal users, not locked.
                    WHERE `u`.`userLevel` = 'normal'
                    AND `u`.`locked` = '0'

                    # Check age ranges.
                    AND `p`.`ourAgeMin` >= 42     # compare to new theirAgeMin
                    AND `p`.`ourAgeMax` <= 62     # compare to new theirAgeMax
                    AND `p`.`theirAgeMin` <= 55   # compare to new ourAgeMin
                    AND `p`.`theirAgeMax` >= 57   # compare to new ourAgeMax

                    # Check interests.
                    AND (`p`.`bicycling` = '1'
                         OR `p`.`cooking` = '1'
                        )

                    # Check distance.
                    HAVING distance <= `p`.`distanceMax`
                    AND distance <= 20            # compare to new maxDistance
                    */
                    // Start with the static part of the query.
                    $query = "SELECT *,
                    ((abs(`p`.`latitude` - $latitude) * 69.172) + (abs(`p`.`longitude` - $longitude) * 0.83 * 69.172)) AS distance
                    FROM `users` AS `u`
                    JOIN `profiles` AS `p` ON `u`.`username` = `p`.`username`
                    WHERE `u`.`userLevel` = 'normal'
                    AND `u`.`locked` = '0' ";

                    // Add the part where we check the age ranges against the supplied profile.
                    $query .= "AND `p`.`ourAgeMin` >= $theirAgeMin
                    AND `p`.`ourAgeMax` <= $theirAgeMax
                    AND `p`.`theirAgeMin` <= $ourAgeMin
                    AND `p`.`theirAgeMax` >= $ourAgeMax ";

                    // Add the part where we select on any interests in the supplied profile.
                    $query .= "AND (";
                    $interestCount = 0;

                    global $booleanFields;
                    foreach ($booleanFields as $field) {
                        if ($profile[$field]) {
                            // Set in supplied profile; add it to the query.
                            if ($interestCount != 0) {
                                $query .= "OR ";
                            }
                            $query .= "`p`.`$field` = '1' ";
                            $interestCount += 1;
                        }
                    }

                    // Add the closing parenthesis for the selection on interests.
                    $query .= ") ";

                    // Add the distance checks against the stored record and the supplied profile.
                    $query .= "HAVING distance <= `p`.`distanceMax`
                               AND distance <= $distanceMax ";

                    // Add the limit count of 20 for now.
                    $query .= "LIMIT 20;";

                    // Make sure at least one of the interests was supplied, or there is no point in the query.
                    if ($interestCount) {
                        $result = mysqli_query($conn, $query);
                        if ($result && (mysqli_num_rows($result) >= 1)) {
                            $matches = [];
                            while ($row = mysqli_fetch_assoc($result)) {
                                // Convert the boolean and numeric data.
                                $row = convert_profile_to_client($row);

                                // Get only the fields that we are going to let the user see.
                                $match = [
                                    'username' => $row['username'],
                                    'pictureLink' => $row['pictureLink'],
                                    'paragraph' => $row['paragraph'],
                                    'zipcode' => $row['zipcode'],
                                    'city' => $row['city'],
                                    'commonInterests' => get_common_interest_count($profile, $row)
                                ];

                                // Push data into return array.
                                array_push($matches, $match);
                            }

                            // Build success response to user.
                            $response = [
                                'success' => true,
                                'temp' => $temp,
                                'query' => $query,
                                'matches' => $matches
                            ];

                        } // Failed to get the row data.
                        else {
                            dd_error_log("profile/samples no matches found");
                            $response = [
                                'success' => false,
                                'message' => 'no matches found',
                                'query' => $query
                            ];
                        }
                    } // No interests were specified.
                    else {
                        dd_error_log("profile/samples no interests specified");
                        $response = [
                            'success' => false,
                            'message' => 'Invalid profile parameter: no interests'
                        ];
                    }
                } // Lookup zipcode failed.
                else {
                    dd_error_log("profile/samples lookup zipcode failed");
                    $response = [
                        'success' => false,
                        'message' => 'Invalid zipcode'
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                dd_error_log("profile/samples failed to connect to database");
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }

        }
        // Invalid parameter passed.
        else {
            dd_error_log("profile/samples invalid parameter");
            $response = [
                'success' => false,
                'message' => 'Invalid profile parameter'
            ];
        }
    }
    // No session or not logged in.
    else {
        dd_error_log("profile/samples with no session or login");
        $response = [
            'success' => false,
            'temp' => $temp,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    dd_error_log("profile/samples missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing profile'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
