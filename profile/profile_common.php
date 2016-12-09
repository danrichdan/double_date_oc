<?php
// Common code for all profile/*.php actions.

// Start the session.
session_start();

// Get the data passed in, and do basic verification.
$username = '';

// Get the list of fields to use, excluding the id.
$fields = array('username', 'pictureLink', 'paragraph',
                'zipcode', 'distanceMax',
                'ourAgeMin', 'ourAgeMax', 'theirAgeMin', 'theirAgeMax');

$booleanFields = array('boardGames', 'cardGames', 'cooking', 'conversation',
    'crafts', 'bookClub', 'movieNight',
    'artGalleries', 'comedy', 'classicalConcerts', 'popularConcerts',
    'ballroomDancing', 'countryDancing', 'salsaDancing', 'casualDining', 'fineDining',
    'karaoke', 'liveTheater', 'movies', 'wineTasting',
    'bicycling', 'bowling', 'golf', 'hiking', 'horsebackRiding', 'kayaking',
    'motorcycling', 'racquetball', 'tennis', 'walking',
    'camping', 'rving', 'domesticTravel', 'travelAbroad');

$zipcodeFields = array('city', 'latitude', 'longitude');

// Get a sanitized version of a string parameter.
function get_sanitized_string($s) {
//    return filter_var($s, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_LOW);
    return filter_var($s, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_HIGH | FILTER_FLAG_ENCODE_LOW);
}

// Get a sanitized version of the username passed in.
function get_sanitized_username() {
    if (isset($_POST['username']) && $_POST['username']) {
        return filter_var($_POST['username'], FILTER_SANITIZE_STRING,
            FILTER_FLAG_STRIP_HIGH | FILTER_FLAG_STRIP_LOW);
    }
    else {
        return "";
    }
}

// Look up a zipcode in the zipcodes table and return city, latitude, longitude.
// Returns false on any failure.
function lookup_zipcode($conn, $zipcode)
{
    $query = "SELECT `zipcode`, `city`, `latitude`, `longitude`
              FROM `zipcodes` 
              WHERE `zipcode` = '$zipcode';";

    $result = mysqli_query($conn, $query);
    if ($result && (mysqli_num_rows($result) == 1) && ($row = mysqli_fetch_assoc($result))) {
        return array(
            'zipcode' => $row['zipcode'],
            'city' => $row['city'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude']
        );
    }

    // Query failed, e.g. zipcode not valid or in table.
    return false;
}

// Check whether a boolean string is "true" or "1".
function check_boolean_string($s) {
    return $s == "true" || $s == "1";
}
// Convert a profile from the database so it returns numbers and booleans correctly.
function convert_profile_to_client($profile) {
    // Convert the numeric values from "123" to 123.
    $profile['profileId'] = intval($profile['id']);
    $profile['zipcode'] = intval($profile['zipcode']);
    $profile['latitude'] = doubleval($profile['latitude']);
    $profile['longitude'] = doubleval($profile['longitude']);
    $profile['distanceMax'] = intval($profile['distanceMax']);
    $profile['ourAgeMin'] = intval($profile['ourAgeMin']);
    $profile['ourAgeMax'] = intval($profile['ourAgeMax']);
    $profile['theirAgeMin'] = intval($profile['theirAgeMin']);
    $profile['theirAgeMax'] = intval($profile['theirAgeMax']);

    // Convert the quotes back to the user representation.
    $profile['paragraph'] = htmlspecialchars_decode($profile['paragraph'], ENT_QUOTES);

    // Convert the booleans from "0" or "1" to a boolean.
    global $booleanFields;
    foreach ($booleanFields as $field) {
        $profile[$field] = ($profile[$field] == "1");
    }

    return $profile;
}

// Convert a profile from the client so it can be entered into the database.
function convert_profile_from_client($profile) {
    // Convert string values to sanitized versions.
    $profile['username'] = get_sanitized_string($profile['username']);
    $profile['pictureLink'] = get_sanitized_string($profile['pictureLink']);
    $profile['paragraph'] = get_sanitized_string($profile['paragraph']);
    
    // Convert the numeric values to sanitized versions.
    $profile['id'] = get_sanitized_string((string)$profile['profileId']);
    $profile['zipcode'] = get_sanitized_string((string)$profile['zipcode']);
    $profile['distanceMax'] = get_sanitized_string((string)$profile['distanceMax']);
    $profile['ourAgeMin'] = get_sanitized_string((string)$profile['ourAgeMin']);
    $profile['ourAgeMax'] = get_sanitized_string((string)$profile['ourAgeMax']);
    $profile['theirAgeMin'] = get_sanitized_string((string)$profile['theirAgeMin']);
    $profile['theirAgeMax'] = get_sanitized_string((string)$profile['theirAgeMax']);

    // Convert the booleans from a boolean to "0" or "1".
    global $booleanFields;
    foreach ($booleanFields as $field) {
        $profile[$field] = check_boolean_string($profile[$field]) ? "1" : "0";
    }

    return $profile;
}

// Get the list of common interests between two profiles.
function get_common_interest_string($p1, $p2) {
    $count = 0;
    $retString = "";
    global $booleanFields;
    foreach ($booleanFields as $field) {
        if (check_boolean_string($p1[$field]) && check_boolean_string($p2[$field])) {
            $count += 1;
            if ($count != 1) {
                $retString .= ", ";
            }
            $retString .= $field;
        }
    }
    return $retString;
}

// Get the count of common interests between two profiles.
function get_common_interest_count($p1, $p2) {
    $count = 0;
    global $booleanFields;
    foreach ($booleanFields as $field) {
        if (check_boolean_string($p1[$field]) && check_boolean_string($p2[$field])) {
            $count += 1;
        }
    }
    return $count;
}