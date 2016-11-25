<?php
require_once('profile_common.php');
require_once('../common/connect_database.php');

$username = null;
$profile = null;
$response = [];

// If profile supplied, do basic checks.
if (isset($_POST['profile']) && ($profile = $_POST['profile'])) {
    // Convert and sanitize the fields in the profile.
    $temp1 = print_r($profile, true);
    $temp3 = gettype($profile['bicycling']);
    $profile = convert_profile_from_client($profile);
    $temp2 = print_r($profile, true);
    $profileId = $profile['profileId'];
    $username = $profile['username'];

    // Check that this is the username logged in, or an administrator is logged in.
    if ($profileId && $username && $_SESSION && $_SESSION['user_record']) {
        $currentUserLevel = $_SESSION['user_record']['userLevel'];
        $currentUsername = $_SESSION['user_record']['username'];

        // Check that the user logged in is a moderator/administrator, or a normal user getting their own profile.
        if ($currentUserLevel == 'administrator' ||
            ($currentUserLevel == 'normal' && $currentUsername == $username)) {
            // Add the specified profile to the profiles table.
            if ($conn) {
                // Build query strings for the field names and their values.
                $query1 = '';
                foreach ($fields as $field) {
                    if ($query1) {
                        $query1 .= ', ';
                    }
                    $query1 .= "`$field` = '$profile[$field]'";
                }
                $query = "UPDATE `profiles` SET $query1 WHERE `profiles`.`id` = $profileId;";

                $result = mysqli_query($conn, $query);
                // Just check result; don't check affected rows, to tolerate not updating any fields.
                if ($result) {
                    // Get the new id.
                    $profileId = mysqli_insert_id($conn);

                    // Build success response to user.
                    $response = [
                        'success' => true,
                        'temp1' => $temp1,
                        'temp2' => $temp2,
                        'temp3' => $temp3,
                        'query' => $query
                    ];
                }
                // Failed to get the row data.
                else {
                    $response = [
                        'success' => false,
                        'message' => 'Failed to update profile',
                        'query' => $query
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
        // Privilege violation: normal user accessing profile other than their own.
        else {
            $response = [
                'success' => false,
                'message' => 'Invalid account access'
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
        'message' => 'Missing profile'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
