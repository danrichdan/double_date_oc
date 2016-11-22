<?php
require_once('user_common.php');

$response = [];

if (isset($_SESSION['user_record'])) {
    unset($_SESSION['user_record']);
}
$response = [
    'success' => true,
    'message' => 'User logged out'
];

// The $response has been built; send it back to the user.
print(json_encode($response));
