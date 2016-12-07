<?php
require_once('../profile/profile_common.php');
require_once('../common/connect_database.php');

$response = [];
$username = '';

// Make sure username has been provided.
if (isset($_POST['username']) && ($username = $_POST['username'])) {

    // Check that user is logged in; no need for administrator check.
    if ($_SESSION && $_SESSION['user_record'] && $_SESSION['user_record']['userLevel']) {
        // Check the connection.
        if ($conn) {
            // Build the query to the matches database for the best 20 matches.
            $query1 = "SELECT * FROM `matches` 
            WHERE `firstId` = '$username' OR `secondId` = '$username'
            ORDER BY `quality` DESC
            LIMIT 20;";

            $result = mysqli_query($conn, $query1);
            if ($result && (mysqli_num_rows($result) >= 1)) {
                // Collect the usernames from the matches. Note that the search username could be the first in the
                // match and we need to pull the second, or the search username could be second in the match and
                // we need to pull the first.
                $matches = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    if ($row['firstId'] == $username) {
                        array_push($matches, $row['secondId']);
                    } else if ($row['secondId'] == $username) {
                        array_push($matches, $row['firstId']);
                    }
                }
                $temp = $matches;

                // Build a query of the user/profile tables for the matched usernames.
                // SELECT * FROM `users` AS `u`
                // JOIN `profiles` AS `p` on `u`.`username` = `p`.`username`
                // WHERE `u`.`username` = 'DD100230' OR `u`.`username` = 'DD100253'...;
                $query2 = "SELECT * from `users` AS `u`
                JOIN `profiles` AS `p` on `u`.`username` = `p`.`username` ";
                // Add in each of the username in turn.
                $firstOne = true;
                foreach ($matches as $match) {
                    if ($firstOne) {
                        $query2 .= "WHERE `u`.`username` = '$match'";
                        $firstOne = false;
                    } else {
                        $query2 .= "OR `u`.`username` = '$match'";
                    }
                }

                // Add in the closing semicolon.
                $query2 .= ';';

                // Do the second query to get the profiles.
                $result = mysqli_query($conn, $query2);
                if ($result && (mysqli_num_rows($result) >= 1)) {
                    // Return each match to the caller.
                    $matches = [];
                    while ($row = mysqli_fetch_assoc($result)) {
                        $match = convert_profile_to_client($row);
                        array_push($matches, $match);
                    }

                    // Return success status and the matches.
                    $response = [
                        'success' => true,
                        'query1' => $query1,
                        'query2' => $query2,
                        'temp' => $temp,
                        'matches' => $matches
                    ];
                }
                // Lookup profiles failed.
                else {
                    $response = [
                        'success' => false,
                        'query1' => $query1,
                        'query2' => $query2,
                        'message' => 'No new matches found'
                    ];
                }
            }
            // Lookup matches failed.
            else {
                $response = [
                    'success' => false,
                    'query1' => $query1,
                    'message' => 'No matches found'
                ];
            }

        }
        // Failed to connect to the database.
        else {
            $response = [
                'success' => false,
                'message' => 'Failed to connect to the database'
            ];
        }

    }
    // No session or not logged in.
    else {
        $response = [
            'success' => false,
            'temp' => $temp,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    $response = [
        'success' => false,
        'message' => 'Missing parameter'
    ];
}

/*

            // Check the connection.
            if ($conn) {
                // Validate the zipcode field, and translate it to city, state, latitude, and longitude.
                $zipcodeRow = lookup_zipcode($conn, $profile['zipcode']);
                if ($zipcodeRow) {
                    // lookup_zipcode succeeded; save lat/long to insert in query.
                    $latitude = $zipcodeRow['latitude'];
                    $longitude = $zipcodeRow['longitude'];

                    /* Sample query: see sample_matches.php */

/*
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
                            $response = [
                                'success' => false,
                                'message' => 'Select query failed',
                                'selectQuery' => $selectQuery
                            ];
                        }
                    }
                    // No interests were specified.
                    else {
                        $response = [
                            'success' => false,
                            'message' => 'Invalid profile parameter: no interests'
                        ];
                    }
                }
                // Lookup zipcode failed.
                else {
                    $response = [
                        'success' => false,
                        'message' => 'Invalid zipcode'
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }

        }
        // Invalid parameter passed.
        else {
            $response = [
                'success' => false,
                'message' => 'Invalid profile parameter'
            ];
        }
    }
*/

// The $response has been built; send it back to the user.
print(json_encode($response));
