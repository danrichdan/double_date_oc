<?php
require_once('mailer.php');
require_once('../profile/profile_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$response = [];
$username = '';
$targetUsername = '';
$approve = false;       // true to approve, false to reject.

// Make sure username and targetUsername and approve have been provided.
if (isset($_POST['username']) && ($username = $_POST['username']) &&
    isset($_POST['targetUsername']) && ($targetUsername = $_POST['targetUsername']) &&
    isset($_POST['approve'])) {
    $approve = ($_POST['approve'] === "true");

    // Check that user is logged in; no need for administrator check.
    if ($_SESSION && $_SESSION['user_record'] && $_SESSION['user_record']['userLevel']) {
        // Check the connection.
        if ($conn) {
            // Build the query to set the data for specified match in the table. Note that there are two
            // possibilities: if the username is the lower of the two, it matches the firstId field, and we
            // will set the firstApproval field.  If the username is the higher of the two, it matches the
            // secondId field, and we will set the secondApproval field.
            if (strcmp($username, $targetUsername) < 0) {
                // $username < $targetUsername
                $usernameLower = true;
                $usernameField = "firstId";
                $targetField = "secondId";
                $modifyField = "firstApproval";
            } else {
                // $username > $targetUsername
                $usernameLower = false;
                $usernameField = "secondId";
                $targetField = "firstId";
                $modifyField = "secondApproval";
            }

            // Set field value based on whether we are approving or rejected.
            $modifyValue = ($approve ? "approved" : "rejected");

            // Log this to the error_log.
            dd_error_log("'$username' $modifyValue '$targetUsername'");

            $query1 = "UPDATE `matches`
            SET `$modifyField` = '$modifyValue'
            WHERE `$usernameField` = '$username' AND `$targetField` = '$targetUsername';";

            $result = mysqli_query($conn, $query1);
            if ($result && (mysqli_affected_rows($conn) == 1)) {
                // The update of the record has worked. If this was an approval, read back the record and,
                // if both users have now approved this match, send e-mails to both users.
                $mailStatus = "";
                if ($approve) {
                    // Approve (not reject) succeeded; see if second half of double-approve.
                    $mailStatus = "no double-match";
                    $query2 = "SELECT * from `matches`
                    WHERE `$usernameField` = '$username' AND `$targetField` = '$targetUsername';";

                    $result = mysqli_query($conn, $query2);
                    if ($result && (mysqli_num_rows($result) == 1)) {
                        // Got the one row we were expecting.
                        $row = mysqli_fetch_assoc($result);
                        if ($row['firstApproval'] == 'approved' && $row['secondApproval'] == 'approved') {
                            // Log this to the error_log.
                            dd_error_log("double approval emails for '$username' and '$targetUsername'");

                            // Double-approval; try to send e-mails.
                            $mailStatus = 'double approval';
                            $query3 = "SELECT *
                            FROM `users` AS `u`
                            JOIN `profiles` AS `p` ON `u`.`username` = `p`.`username`
                            WHERE `u`.`username` = '$username' OR `u`.`username` = '$targetUsername'";

                            $result = mysqli_query($conn, $query3);
                            if ($result && (mysqli_num_rows($result) == 2)) {
                                // Got the two rows for the double-match.
                                $row1 = mysqli_fetch_assoc($result);
                                $row2 = mysqli_fetch_assoc($result);

                                $mailStatus = send_both_emails($row1, $row2);
                            }
                            else {
                                $mailStatus = 'get users/profiles failed';
                            }
                        }
                        else {
                            $mailStatus = 'single approval; no e-mails.';
                        }
                    }
                    else {
                        // Failed query2 or did not get one row.
                        $mailStatus = 'get double-match row failed';
                    }
                }
                else {
                    // Reject; don't bother trying to look for a double-approve.
                    $mailStatus = "reject; no check for double-approve";
                }

                // Return success status. Note that the mailer status is returned separately for troubleshooting;
                // the return status of "approve" is whether the approve/reject worked, not the mailer status.
                $response = [
                    'success' => true,
                    'mailStatus' => $mailStatus,
                    'query1' => $query1
                ];
                if (isset($query2)) {
                    $response['query2'] = $query2;
                }
                if (isset($query3)) {
                    $response['query3'] = $query3;
                }
            }
            // Match update failed.
            else {
                dd_error_log("match/approve match update failed");
                $response = [
                    'success' => false,
                    'query1' => $query1,
                    'message' => 'Match update failed'
                ];
            }

        }
        // Failed to connect to the database.
        else {
            dd_error_log("match/approve failed to connect to database");
            $response = [
                'success' => false,
                'message' => 'Failed to connect to the database'
            ];
        }

    }
    // No session or not logged in.
    else {
        dd_error_log("match/approve with no session or login");
        $response = [
            'success' => false,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    dd_error_log("match/approve missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing parameter'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
