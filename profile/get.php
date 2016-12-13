<?php
require_once('profile_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$username = get_sanitized_username();
$profile = null;
$response = [];

// If username supplied, do basic checks.
if ($username) {
    // Check that this is the username logged in, or a moderator / administrator.
    if ($_SESSION && $_SESSION['user_record']) {
        $currentUserLevel = $_SESSION['user_record']['userLevel'];
        $currentUsername = $_SESSION['user_record']['username'];

        // Check that the user logged in is a moderator/administrator, or a normal user getting their own profile.
        if ($currentUserLevel == 'moderator' || $currentUserLevel == 'administrator' ||
            ($currentUserLevel == 'normal' && $currentUsername == $username)) {
            // Look the specified username up in the profiles table.
            if ($conn) {
                $query = "SELECT * FROM `profiles` WHERE `username` = '$username';";
                $result = mysqli_query($conn, $query);
                if ($result && (mysqli_num_rows($result) == 1) && ($profile = mysqli_fetch_assoc($result))) {
                    // Convert the boolean and numeric data.
                    $profile = convert_profile_to_client($profile);

                    // Build success response to user.
                    $response = [
                        'success' => true,
                        'profile' => $profile
                    ];
                }
                // Failed to get the row data.
                else {
                    dd_error_log("profile/get profile $username not found");
                    dd_error_log("failed query: " . $query);
                    $response = [
                        'success' => false,
                        'query' => $query,
                        '$result' => $result,
                        'message' => 'Profile not found (code q5)'
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                dd_error_log("profile/get failed to connect to database");
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }
        }
        // Privilege violation: normal user accessing profile other than their own.
        else {
            dd_error_log("profile/get privilege violation");
            $response = [
                'success' => false,
                'message' => 'Invalid account access'
            ];
        }
    }
    // No session or not logged in.
    else {
        dd_error_log("profile/get with no session or login");
        $response = [
            'success' => false,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    dd_error_log("profile/get missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing username'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
