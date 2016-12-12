<?php
require_once('profile_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$username = null;
$profile = null;
$response = [];

// If profile supplied, do basic checks.
if (isset($_POST['profile']) && ($profile = $_POST['profile'])) {
    // Convert and sanitize the fields in the profile.
    $temp0 = ord($profile['paragraph']);
    $temp1 = $profile['paragraph'];
    $profile = convert_profile_from_client($profile);
    $temp2 = $profile['paragraph'];
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
                // Validate the zipcode field, and translate it to city, state, latitude, and longitude.
                $zipcodeRow = lookup_zipcode($conn, $profile['zipcode']);
                if ($zipcodeRow) {
                    // lookup_zipcode succeeded.
                    // Build query strings for the field names and their values.
                    global $fields;
                    $query1 = '';
                    foreach ($fields as $field) {
                        if ($query1) {
                            $query1 .= ', ';
                        }
                        $query1 .= "`$field` = '$profile[$field]'";
                    }
                    global $booleanFields;
                    foreach ($booleanFields as $field) {
                        $query1 .= ", `$field` = '$profile[$field]'";
                    }

                    // Add in the extra values from the zipcode.
                    global $zipcodeFields;
                    foreach ($zipcodeFields as $field) {
                        $query1 .= ", `$field` = '$zipcodeRow[$field]'";
                    }

                    $query = "UPDATE `profiles` SET $query1 WHERE `profiles`.`id` = $profileId;";

                    $result = mysqli_query($conn, $query);
                    // Just check result; don't check affected rows, to tolerate not updating any fields.
                    if ($result) {
                        // Log this to the error_log.
                        dd_error_log("user '$username' updated profileId $profileId");

                        // Build success response to user.
                        $response = [
                            'success' => true,
                            'temp0' => $temp0,
                            'temp1' => $temp1,
                            'temp2' => $temp2,
                            'query' => $query
                        ];
                        // Add in the extra values from the zipcode.
                        foreach ($zipcodeFields as $field) {
                            $response[$field] = $zipcodeRow[$field];
                        }
                    } // Failed to get the row data.
                    else {
                        dd_error_log("profile/update query failed");
                        $response = [
                            'success' => false,
                            'message' => 'Failed to update profile',
                            'query' => $query
                        ];
                    }
                } // lookup_zipcode failed.
                else {
                    dd_error_log("profile/update zipcode failed for " . $profile['zipcode']);
                    $response = [
                        'success' => false,
                        'message' => 'Invalid zipcode'
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                dd_error_log("profile/update failed to connect to database");
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }
        }
        // Privilege violation: normal user accessing profile other than their own.
        else {
            dd_error_log("profile/update privilege violation");
            $response = [
                'success' => false,
                'message' => 'Invalid account access'
            ];
        }
    }
    // No session or not logged in.
    else {
        dd_error_log("profile/update with no session or login");
        $response = [
            'success' => false,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    dd_error_log("profile/update missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing profile'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
