<?php
require_once('profile_common.php');

// Get a convenient name for DIRECTORY_SEPARATOR.
$ds = DIRECTORY_SEPARATOR;

// Where to store the uploads.
$uploadDir = 'uploads';

// Response object.
$response = [
    'success' => false
];

// Check that the required information has been supplied.
if (isset($_FILES) && isset($_FILES['file']) && isset($_FILES['file']['tmp_name'])) {
    $tempFile = $_FILES['file']['tmp_name'];
    $basePath = dirname(__FILE__) . $ds . '..' . $ds;
    $targetPathLocal = $uploadDir . $ds . rawurlencode($_FILES['file']['name']);
    $targetPathUrl   = $uploadDir . '/' . rawurlencode($_FILES['file']['name']);
    $targetFile = $basePath . $targetPathLocal;
    if (move_uploaded_file($tempFile, $targetFile)) {
        $response['success'] = true;
        $response['newLink'] = $targetPathUrl;
    }
    // Error moving file.
    else {
        $response['message'] = 'move_uploaded_file failed';
    }

}
// Necessary information not supplied.
else {
    $response['files'] = $_FILES;
}

// Return the response to the user.
echo json_encode($response);
