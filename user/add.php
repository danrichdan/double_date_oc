<?php
require_once('user_common.php');
require_once('../common/connect_database.php');

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
                    $response = [
                        'success' => false,
                        'message' => 'Add failed (code U2)'
                    ];
                }

            }
            // Failed get a new id.
            else {
                $response = [
                    'success' => false,
                    'message' => 'Add failed (code I0)'
                ];
            }
        }
        // Failed to affect one row.
        else {
            $response = [
                'success' => false,
                'message' => 'Add failed (code Q3)'
            ];
        }

    }
    // Failed to connect to the database.
    else {
        $response = [
            'success' => false,
            'message' => 'Failed to connect to user database'
        ];
    }

}

// If some parameter missing, return an error.
else {
    $response = [
        'success' => false,
        'message' => 'Missing name or password or email'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
