<?php
require_once('user_common.php');

$userRecord = null;
$response = [];

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

        $response = [
            'success' => false,
            'message' => 'Specified username is not logged in'
        ];
    }
}

// username not provided.
else {
    $response = [
        'success' => false,
        'message' => 'Missing username'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
