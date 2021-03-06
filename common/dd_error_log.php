<?php
// Constants: where to put the logs.
define('LOGFILE', '../logs/doubledateoc_error.log');

// dd_error_log: Common DoubleDateOC error log routine.
ini_set('log_errors', 1);

function dd_error_log($message) {
    $date = date("Y-m-d H:i:s");
    $fullMessage = $date . ': IP ' . $_SERVER['REMOTE_ADDR'] . ': ' . $message . PHP_EOL;

    // Value 3 means append to the specified log file.
    error_log($fullMessage, 3, LOGFILE);
}
