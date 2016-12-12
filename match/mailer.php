<?php
require_once('../common/email_credentials.php');
require_once('../common/dd_error_log.php');
require_once('../PHPMailer/PHPMailerAutoload.php');

function send_one_email($thisUser, $otherUser) {
    $thisName = $thisUser['name'];
    $thisEmail = $thisUser['email'];

    $otherName = $otherUser['name'];
    $otherCity = $otherUser['city'];
    $otherEmail = $otherUser['email'];
    $otherLink = $otherUser['pictureLink'];
    $otherParagraph = $otherUser['paragraph'];

    $mail = new PHPMailer;
    //$mail->SMTPDebug = 3;                 // Enable verbose debug output
    $mail->isSMTP();                        // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                 // Enable SMTP authentication

    // Mailer comes from the DoubleDateOC mailer email address.
    $mail->Username = EMAIL_USER;           // SMTP username
    $mail->Password = EMAIL_PASS;           // SMTP password
    $mail->SMTPSecure = 'tls';              // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                      // TCP port to connect to
    $options = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->smtpConnect($options);
    $mail->From = EMAIL_USER;                                   // Sending email address
    $mail->FromName = 'DoubleDateOC Mailer (Do NOT reply)';     // Sending email name
    $mail->addAddress($thisEmail, $thisName);                   // Recipient email and friendly name.
    $mail->addReplyTo(EMAIL_USER, 'DoubleDateOC Mailer');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //$mail->addAttachment('/var/tmp/file.tar.gz');             // Add attachments
    $mail->addAttachment('../' . $otherLink, 'match.jpg');      // Picture link.
    $mail->isHTML(true);                    // Set email format to HTML

    $mail->Subject = "DoubleDateOC match for $thisName.";
    $body = "Congratulations, $thisName!<br><br>";
    $body .= "The DoubleDateOC matcher has matched you up with $otherName in $otherCity.<br>";
    $body .= "As a reminder, their picture is attached and their paragraph was:<br>$otherParagraph<br><br>";
    $body .= "You have the following common interests:<br>";
    $body .= get_common_interest_string($thisUser, $otherUser) . "<br><br>";
    $body .= "Their e-mail address is $otherEmail.<br>";
    $body .= "You should contact them and set up your first meeting.<br>";
    $body .= "Remember to use basic precautions when meeting for the first time with people you don't know,<br>";
    $body .= "such as meeting in a public place.  Have a great time!<br>";

    $altBody = "Congratulations, $thisName!\n\n";
    $altBody .= "The DoubleDateOC matcher has matched you up with $otherName in $otherCity.\n";
    $altBody .= "As a reminder, their picture is attached and their paragraph was:\n$otherParagraph\n\n";
    $altBody .= "You have the following common interests:\n";
    $altBody .= get_common_interest_string($thisUser, $otherUser) . "\n\n";
    $altBody .= "Their e-mail address is $otherEmail.\n";
    $altBody .= "You should contact them and set up your first meeting.\n";
    $altBody .= "Remember to use basic precautions when meeting for the first time with people you don't know,\n";
    $altBody .= "such as meeting in a public place.  Have a great time!\n";

    $mail->Body = $body;
    $mail->AltBody = $altBody;

    //$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
        dd_error_log("match/mailer: failed email to $thisEmail: " . $mail->ErrorInfo);
        $retStatus = 'Message could not be sent: ' . $mail->ErrorInfo;
    } else {
        $retStatus = 'Message sent';
    }

    return $retStatus;
}

function send_both_emails($row1, $row2) {
    $mailStatus1 = send_one_email($row1, $row2);
    $mailStatus2 = send_one_email($row2, $row1);
    $mailStatus = "1: $mailStatus1, 2: $mailStatus2";
    return $mailStatus;
}