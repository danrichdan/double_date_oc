<?php
require_once('../profile/profile_common.php');
require_once('../common/connect_database.php');

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

            $query1 = "UPDATE `matches`
            SET `$modifyField` = '$modifyValue'
            WHERE `$usernameField` = '$username' AND `$targetField` = '$targetUsername';";

            $result = mysqli_query($conn, $query1);
            if ($result && (mysqli_affected_rows($conn) == 1)) {
                // The update of the record has worked. If this was an approval, read back the record and,
                // if both users have now approved this match, send e-mails to both users.

                // TODO: check whether to send e-mails on double-approval.

                // Return success status.
                $response = [
                    'success' => true,
                    'post' => $_POST,
                    'query1' => $query1
                ];
            }
            // Match update failed.
            else {
                $response = [
                    'success' => false,
                    'query1' => $query1,
                    'message' => 'Match update failed'
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
