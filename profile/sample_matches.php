<?php
require_once('profile_common.php');
require_once('../common/connect_database.php');

$profile = null;
$response = [];

// If profile supplied, do basic checks.
if (isset($_POST['profile']) && ($profile = $_POST['profile'])) {
    // Convert and sanitize the fields in the profile.
    $temp = print_r($profile, true);
    $profile = convert_profile_from_client($profile);

    // Check that user is logged in; no need for administrator check.
    if ($_SESSION && $_SESSION['user_record'] && $_SESSION['user_record']['userLevel']) {
        // Check that the data supplied is valid.
        $zipcode = $profile['zipcode'];
        $distanceMax = $profile['distanceMax'];
        $ourAgeMin = $profile['ourAgeMin'];
        $ourAgeMax = $profile['ourAgeMax'];
        $theirAgeMin = $profile['theirAgeMin'];
        $theirAgeMax = $profile['theirAgeMax'];

        if ($zipcode >= 90000 && $zipcode <= 99999 &&
            $distanceMax >= 1 && $distanceMax <= 100 &&
            $ourAgeMin >= 18 && $ourAgeMin <= 99 &&
            $ourAgeMax >= $ourAgeMin && $ourAgeMax <= 99) {
            // Check the connection.
            if ($conn) {

                $query = "BLAH;";

                $result = mysqli_query($conn, $query);
                if ($result && (mysqli_num_rows($result) >= 1)) {
                    while ($match = mysqli_fetch_assoc($result)) {
                        // Convert the boolean and numeric data.
                        $match = convert_profile_to_client($match);

                        // Push data into return array.

                    }

                    // Build success response to user.
                    $response = [
                        'success' => true,
                        'temp' => $temp,
                        'query' => $query
                    ];

                }
                // Failed to get the row data.
                else {
                    $response = [
                        'success' => false,
                        'message' => 'Failed to locate matches',
                        'query' => $query
                    ];
                }
            }
            // Failed to connect to the database.
            else {
                $response = [
                    'success' => false,
                    'message' => 'Failed to connect to profile database'
                ];
            }

        }
        // Invalid parameter passed.
        else {
            $response = [
                'success' => false,
                'message' => 'Invalid profile parameter'
            ];
        }
    }
    // No session or not logged in.
    else {
        $response = [
            'success' => false,
            'temp' => $temp,
            'message' => 'Not logged in'
        ];
    }
}
// If some parameter missing, return an error.
else {
    $response = [
        'success' => false,
        'message' => 'Missing profile'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
