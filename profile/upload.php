<?php
require_once('profile_common.php');
require_once('../common/dd_error_log.php');

// Get a convenient name for DIRECTORY_SEPARATOR.
$ds = DIRECTORY_SEPARATOR;

// Where to store the uploads.
$uploadDir = 'uploads';

// Response object.
$response = [
    'success' => false
];

// Picture upload happens before we log in, so don't check for a user_record in the $_SESSION.
if (isset($_FILES) && isset($_FILES['file']) && isset($_FILES['file']['tmp_name'])) {
    $tempFile = $_FILES['file']['tmp_name'];
    $basePath = dirname(__FILE__) . $ds . '..' . $ds;
    $randomName = sha1_file($tempFile);
    $targetPathLocal = $uploadDir . $ds . $randomName;
    $targetPathUrl = $uploadDir . '/' . $randomName;
    $targetFile = $basePath . $targetPathLocal;

    if (move_uploaded_file($tempFile, $targetFile)) {
        // Try to resize the image to a standard 600x450 with "best fit".
        $pic = new Imagick($targetFile);
        $pic->resizeImage(600, 450, Imagick::FILTER_LANCZOS, 1, TRUE);
        $pic->writeImage($targetFile);
        $pic->destroy();

        // Set up success status back to the user, including the new file path.
        $response['success'] = true;
        $response['newLink'] = $targetPathUrl;
    } // Error moving file.
    else {
        dd_error_log("profile/upload move_uploaded_file failed");
        $response['message'] = 'move_uploaded_file failed';
    }

} // Necessary information not supplied.
else {
    dd_error_log("profile/upload invalid request");
    $response['message'] = 'Invalid request';
    $response['files'] = $_FILES;
}

// Return the response to the user.
echo json_encode($response);
