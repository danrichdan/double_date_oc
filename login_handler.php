<?php
// Array of valid login information - will be replaced by database access.
$validUsers = [
    '1' => [
        'username'  => 'dan.riches',
        'password'  => '090a512b2a11ed98ce466a8d7260c4b4e003b775',
        //'password'  => 'dan.riches33',
        'name'      => 'Dan Riches',
        'email'     => 'driches@ymail.com',
        'userLevel' => 3
        ],
    '2' => [
        'username'  => 'junie.hyun',
        'password'  => 'c297a1a5d47715d15607a776757e32feee851f0e',
        //'password'  => 'junie.hyun55',
        'name'      => 'Junie Hyun',
        'email'     => 'huniehyun@gmail.com',
        'userLevel' => 3
        ],
    '3' => [
        'username'  => 'wade.wooldridge',
        'password'  => '8089cfc55657a56803a06619de8d9783081a1ba0',
        //'password'  => 'wade.wooldridge44',
        'name'      => 'Wade Wooldridge',
        'email'     => 'waderwooldridge@gmail.com',
        'userLevel' => 3
        ],
    '4' => [
        'username'  => 'moderator63',
        'password'  => 'c8156e735c6732221885e3b849447f9676f95d61',
        //'password'  => 'moderator63.36',
        'name'      => 'Neville Chamberlain',
        'email'     => 'appeaser@gmail.com',
        'userLevel' => 2
        ],
    '5' => [
        'username'  => 'DD123456',
        'password'  => '98a16c09b0759e63ef7df53592724e8eeddb953a',
        //'password'  => 'password123456',
        'name'      => 'Earl and Joyce',
        'email'     => 'earl_and_joyce@gmail.com',
        'userLevel' => 1
        ],
    '6' => [
        'username'  => 'DD987654',
        'password'  => '568f9d0dd83109d84f54e67e3fbc5e8170bb0c40',
        //'password'  => 'password987654',
        'name'      => 'Bob and Leslie',
        'email'     => 'bob_and_leslie@gmail.com',
        'userLevel' => 1
    ]
];

// Start the session.
session_start();

// Get the data passed in, and do basic verification.
$username = '';
$password = '';
$userRecord = null;
$response = [];

// Get the username and password provided.
// If we cannot do this, or strip it down to nothing, it is the same as a logout.
if (isset($_POST['username']) && $_POST['username']) {
    $username = filter_var($_POST['username'], FILTER_SANITIZE_STRING,
        FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_HIGH);
}

if (isset($_POST['password']) && $_POST['password']) {
    $password = sha1($_POST['password']);
}

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

// If username provided and not password, check login status.
else if ($username) {
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

// If neither username nor password provided, log out.
else {
    if (isset($_SESSION['user_record'])) {
        unset($_SESSION['user_record']);
    }
    $response = [
        'success' => true,
        'message' => 'User logged out'
    ];
}

// The $response has been built; send it back to the user.
print(json_encode($response));
