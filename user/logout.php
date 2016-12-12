<?php
require_once('user_common.php');
require_once('../common/dd_error_log.php');

$response = [];
$username = 'unknown';

if (isset($_SESSION['user_record'])) {
    $username = $_SESSION['user_record']['username'];
    unset($_SESSION['user_record']);
}

// Log this logout to the error_log.
dd_error_log("user '$username' logged out");

$response = [
    'success' => true,
    'message' => 'User logged out'
];

// The $response has been built; send it back to the user.
print(json_encode($response));
