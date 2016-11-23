<?php
require_once('user_common.php');

$userRecord = null;
$response = [];

// If username and password provided, try to log in.
if ($username && $password) {
    $found = false;
    foreach ($validUsers as $userId => $userRecord) {
        if ($userRecord['username'] == $username &&
            $userRecord['password'] == $password) {
            // $username in table, and $password matches.  Save in $_SESSION.
            $_SESSION['user_record'] = $userRecord;
            $_SESSION['user_record']['username'] = $username;
            //unset($_SESSION['user_record']['password']);

            // Build success response to user.
            $response = [
                'success' => true,
                'name' => $_SESSION['user_record']['name'],
                'username' => $_SESSION['user_record']['username'],
                'userId' => $userId,
                'userLevel' => $_SESSION['user_record']['userLevel']
            ];
            $found = true;
            break;
        }
    }

    if (!$found) {
        // $username not found, or $password did not match.
        if (isset($_SESSION['user_record'])) {
            unset($_SESSION['user_record']);
        }

        $response = [
            'success' => false,
            'message' => 'Invalid username or password'
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
