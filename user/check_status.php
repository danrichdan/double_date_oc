<?php
require_once('user_common.php');
require_once('../common/dd_error_log.php');

$userRecord = null;
$response = [];

$username = get_sanitized_username();

// If username provided, check login status.
if ($username) {
    if (isset($_SESSION['user_record']) &&
        isset($_SESSION['user_record']['username']) &&
        $_SESSION['user_record']['username'] === $username) {
        // Logged in as this $username.
        $response = [
            'success' => true,
            'name' => $_SESSION['user_record']['name'],
            'username' => $_SESSION['user_record']['username'],
            'userLevel' => $_SESSION['user_record']['userLevel']
            ];
    } else {
        // Not logged in, or not logged in as this user.
        if (isset($_SESSION['user_record'])) {
            unset($_SESSION['user_record']);
        }

        dd_error_log("user/check specified username is not logged in");
        $response = [
            'success' => false,
            'message' => 'Specified username is not logged in'
        ];
    }
}

// username not provided.
else {
    dd_error_log("user/check missing parameters");
    $response = [
        'success' => false,
        'message' => 'Missing username'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
