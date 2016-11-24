<?php
require_once('user_common.php');
require_once('connect_database.php');

$username = get_sanitized_username();
$password = get_sanitized_password();

$userRecord = null;
$response = [];

// If username and password provided, try to look up the username in the user database.
if ($username && $password) {
    if ($conn) {
        $query = "SELECT * FROM `users` WHERE `username` = '$username';";
        $result = mysqli_query($conn, $query);
        if ($result && (mysqli_num_rows($result) == 1) && ($userRecord = mysqli_fetch_assoc($result))) {
            // Got the row data.
            if ($userRecord['username'] == $username &&
                $userRecord['password'] == $password) {
                // $username and $password match.  Save in $_SESSION, leaving off the password.
                unset($userRecord['password]']);
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
            // Password did not match.
            else {
                $response = [
                    'success' => false,
                    'message' => 'Invalid username or password (code p7)'
                ];
            }
        }
        // Failed to get the row data.
        else {
            $response = [
                'success' => false,
                'message' => 'Invalid username or password (code q6)'
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

// If username or password missing, return an error.
else {
    $response = [
        'success' => false,
        'message' => 'Missing username or password'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
