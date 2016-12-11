<?php
// Common code for all user/*.php actions.

// Start the session.
session_start();

// Get the data passed in, and do basic verification.
$username = '';
$password = '';
$name = '';
$email = '';

function get_sanitized_username() {
    if (isset($_POST['username']) && $_POST['username']) {
        return filter_var($_POST['username'], FILTER_SANITIZE_STRING,
            FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_HIGH);
    }
    else {
        return "";
    }
}

function get_sanitized_password() {
    if (isset($_POST['password']) && $_POST['password']) {
        return sha1($_POST['password']);
    }
    else {
        return "";
    }
}

function get_sanitized_name() {
    if (isset($_POST['name']) && $_POST['name']) {
        return filter_var($_POST['name'], FILTER_SANITIZE_STRING,
            FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_HIGH);
    }
    else {
        return "";
    }
}

function get_sanitized_email() {
    if (isset($_POST['email']) && $_POST['email']) {
        return filter_var($_POST['email'], FILTER_SANITIZE_STRING,
            FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_HIGH);
    }
    else {
        return "";
    }
}

// Update the failedLogins value in the user table.
function update_failed_logins($conn, $username, $failedLogins) {
    // Build a query string to set the new value, and optionally to lock the user record.
    $query = "UPDATE `users` SET `failedLogins` = $failedLogins ";
    if ($failedLogins == 10) {
        $query .= ", `locked` = '1', `lockReason` = 'failedlogins' ";
    }
    $query .= "WHERE `username` = '$username';";

    $result = mysqli_query($conn, $query);
    if ($result && (mysqli_affected_rows($conn) == 1)) {
        // TODO: Log success message here.
    }
    else {
        // TODO: Log error message here.
    }

}