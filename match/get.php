<?php
require_once('../profile/profile_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$response = [];
$username = '';

// Make sure username has been provided.
if (isset($_POST['username']) && ($username = $_POST['username'])) {

    // Check that user is logged in; no need for administrator check.
    if ($_SESSION && $_SESSION['user_record'] && $_SESSION['user_record']['userLevel']) {
        // Check the connection.
        if ($conn) {
            // Build the query to the matches database for the best 20 matches.
            // Omit the ones where the current user has already approved or rejected.
            // Omit the ones where the other user has already rejected.
            $query1 = "SELECT * FROM `matches` 
            WHERE (`firstId` = '$username' AND `firstApproval` = 'unevaluated' AND `secondApproval` != 'rejected')
            OR (`secondId` = '$username' AND `secondApproval` = 'unevaluated' AND `firstApproval` != 'rejected')
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

                    // Log this to the error_log.
                    dd_error_log("get matches for '$username' from IP " . $_SERVER['REMOTE_ADDR']);

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

// The $response has been built; send it back to the user.
print(json_encode($response));
