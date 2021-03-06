<?php
require_once('user_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$name = get_sanitized_name();
$password = get_sanitized_password();
$email = get_sanitized_email();

$userRecord = null;
$response = [];

// If all parameters provided, try to add the username to the user database.
if ($name && $password && $email) {
    if ($conn) {
        $query = "INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `userLevel`, `created`, `modified`)
                  VALUES (NULL, '', '$password', '$name', '$email', 'normal', NOW(), CURRENT_TIMESTAMP);";
        $result = mysqli_query($conn, $query);
        if ($result && (mysqli_affected_rows($conn) == 1)) {
            // Get the new id.
            $newId = mysqli_insert_id($conn);
            if ($newId) {
                $temp = 100000 + ($newId * 23);
                $username = 'DD' . strval($temp);

                $query2 = "UPDATE `users` SET `username` = '$username' WHERE `users`.`id` = $newId";
                $result2 = mysqli_query($conn, $query2);
                if ($result && (mysqli_affected_rows($conn) == 1)) {
                    // Second query (update username) worked.

                    // Assume this means we are logged in as the new user.
                    $userRecord['id'] = $newId;
                    $userRecord['username'] = $username;
                    $userRecord['name'] = $name;
                    $userRecord['userLevel'] = 'normal';
                    $_SESSION['user_record'] = $userRecord;

                    // Log this login to the error_log.
                    dd_error_log("user '$username' created and logged in");

                    // Build success response to user.
                    $response = [
                        'success' => true,
                        'username' =>   $userRecord['username'],
                        'name' =>       $userRecord['name'],
                        'userId' =>     $userRecord['id'],
                        'userLevel' =>  $userRecord['userLevel']
                    ];
                }
                // Second query (update username) failed.
                else {
                    dd_error_log("user/add second (update) query failed");
                    dd_error_log("failed query: " . $query2);
                    $response = [
                        'success' => false,
                        'message' => 'Add failed (code U2)'
                    ];
                }

            }
            // Failed get a new id.
            else {
                dd_error_log("user/add failed to get a new ID");
                $response = [
                    'success' => false,
                    'message' => 'Add failed (code I0)'
                ];
            }
        }
        // Failed to affect one row.
        else {
            dd_error_log("user/add failed to affect one row");
            dd_error_log("failed query: " . $query);
            $response = [
                'success' => false,
                'message' => 'Add failed (code Q3)'
            ];
        }

    }
    // Failed to connect to the database.
    else {
        dd_error_log("user/add failed to connect to database");
        $response = [
            'success' => false,
            'message' => 'Failed to connect to user database'
        ];
    }

}

// If some parameter missing, return an error.
else {
    dd_error_log("user/add missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing name or password or email'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
