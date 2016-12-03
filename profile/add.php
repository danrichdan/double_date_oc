<?php
require_once('profile_common.php');
require_once('../common/connect_database.php');

$username = null;
$profile = null;
$response = [];

// If profile supplied, do basic checks.
if (isset($_POST['profile']) && ($profile = $_POST['profile'])) {
    // Convert and sanitize the fields in the profile.
    $temp = print_r($profile, true);
    $profile = convert_profile_from_client($profile);
    $username = $profile['username'];

    // Check that this is the username logged in, or an administrator is logged in.
    if ($username && $_SESSION && $_SESSION['user_record']) {
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
                    $query1 = '`id`';
                    $query2 = 'NULL';
                    global $fields;
                    foreach ($fields as $field) {
                        $query1 .= ", `$field`";
                        $query2 .= ", '$profile[$field]'";
                    }
                    global $booleanFields;
                    foreach ($booleanFields as $field) {
                        $query1 .= ", `$field`";
                        $query2 .= ", '$profile[$field]'";
                    }

                    global $zipcodeFields;
                    foreach ($zipcodeFields as $field) {
                        $query1 .= ", `$field`";
                        $query2 .= ", '$zipcodeRow[$field]'";
                    }

                    $query = "INSERT INTO `profiles` ($query1) VALUES ($query2);";

                    $result = mysqli_query($conn, $query);
                    if ($result && (mysqli_affected_rows($conn) == 1)) {
                        // Get the new id.
                        $profileId = mysqli_insert_id($conn);

                        // Build success response to user.
                        $response = [
                            'success' => true,
                            'profileId' => $profileId,
                            'temp' => $temp,
                            'query' => $query
                        ];
                        // Add in the extra values from the zipcode.
                        foreach ($zipcodeFields as $field) {
                            $response[$field] = $zipcodeRow[$field];
                        }
                    }
                    // Failed to get the row data.
                    else {
                        $response = [
                            'success' => false,
                            'message' => 'Failed to insert profile',
                            'query' => $query
                        ];
                    }
                }
                // lookup_zipcode failed.
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
