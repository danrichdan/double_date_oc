<?php
require_once('user_common.php');
require_once('../common/connect_database.php');
require_once('../common/dd_error_log.php');

$username = get_sanitized_username();
$password = get_sanitized_password();

$userRecord = null;
$response = [];

// If username and password provided, try to look up the username in the user database.
if ($username && $password) {
    if ($conn) {
        $query = "SELECT * FROM `users` WHERE `username` = '$username' AND `locked` = '0';";
        $result = mysqli_query($conn, $query);
        if ($result && (mysqli_num_rows($result) == 1) && ($userRecord = mysqli_fetch_assoc($result))) {
            // Got the row data.
            if ($userRecord['username'] == $username &&
                $userRecord['password'] == $password) {
                // Log this to the error_log.
                dd_error_log("user '$username' logged in");

                // $username and $password match.  Save in $_SESSION, leaving off the password.
                unset($userRecord['password]']);
                $_SESSION['user_record'] = $userRecord;

                // Reset the failedLogins count in the user record to 0.
                update_failed_logins($conn, $username, 0);

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
                // Increment the failedLogins count in the user record.
                $failedLogins = $userRecord['failedLogins'] + 1;
                update_failed_logins($conn, $username, $failedLogins);

                // Log this to the error_log.
                dd_error_log("user '$username' failed login, count: $failedLogins");

                // Delay the login.
                sleep($failedLogins * 2);

                $response = [
                    'success' => false,
                    'message' => 'Invalid username or password (code p7)'
                ];
            }
        }
        // Failed to get the row data.
        else {
            dd_error_log("user/login invalid username $username");
            $response = [
                'success' => false,
                'message' => 'Invalid username or password (code q6)'
            ];
        }

    }
    // Failed to connect to the database.
    else {
        dd_error_log("user/login failed to connect to database");
        $response = [
            'success' => false,
            'message' => 'Failed to connect to user database'
        ];
    }

}

// If username or password missing, return an error.
else {
    dd_error_log("user/login missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing username or password'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
