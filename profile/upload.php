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

// Check that we have a session logged in; don't need to be too specific about who is logged in.
if ($_SESSION && $_SESSION['user_record']) {
    // Check that the required information has been supplied.
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
            $response['message'] = 'move_uploaded_file failed';
        }

    } // Necessary information not supplied.
    else {
        $response['message'] = 'Invalid request';
        $response['files'] = $_FILES;
    }
}
// No user logged in.
else {
    $response['message'] = 'Not logged in';
}

// Return the response to the user.
echo json_encode($response);
