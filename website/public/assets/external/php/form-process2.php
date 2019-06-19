<?php

$errorMSG = "";

// NAME
if (empty($_POST["name2"])) {
    $errorMSG = "Name is required ";
} else {
    $name2 = $_POST["name2"];
}

// EMAIL
if (empty($_POST["email2"])) {
    $errorMSG .= "Email is required ";
} else {
    $email2 = $_POST["email2"];
}


// TEL
if (empty($_POST["tel2"])) {
    $errorMSG .= "Phone is required ";
} else {
    $tel2 = $_POST["tel2"];
}


$EmailTo = "registrations@elad.network";
$Subject = "New Message Received";

// prepare email body text
$Body = "";
$Body .= "Name2: ";
$Body .= $name2;
$Body .= "\n";
$Body .= "Email2: ";
$Body .= $email2;
$Body .= "\n";
$Body .= "Tel2: ";
$Body .= $tel2;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
