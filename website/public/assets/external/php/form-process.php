<?php

ini_set( "display_errors" , "on");
error_reporting(E_ALL);
//echo mail("registration@elad.network","New Registration", "hell") ?"sent" :"error";

$errorMSG = "";

// NAME
$txtname ="name";
$txtemail = "amorson@elad.network";
$txtmessage = "Hello";

$EmailTo = "registration@elad.network";
$Subject = "New Message Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $txtname;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $txtemail;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $txtmessage;
$Body .= "\n";

// send email
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: Sender <plaform@elad.network> ' . "\r\n";
$headers .=   "Reply-To: registration@elad.network" . "\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

$success = mail($EmailTo, $Subject, $Body, $headers );

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
        print_r(error_get_last());
    } else {
        echo $errorMSG;
    }
}

?>