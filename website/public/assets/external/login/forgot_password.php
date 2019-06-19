<?php
// core configuration
include_once "config/core.php";

// set page title
$page_title = "Forgot Password";

// include login checker
include_once "login_checker.php";

// include classes
include_once "config/database.php";
include_once 'objects/user.php';
include_once "libs/php/utils.php";

// get database connection
$database = new Database();
$db = $database->getConnection();

// initialize objects
$user = new User($db);
$utils = new Utils();

// include page header HTML
include_once "layout_head.php";

?>
<div class="col-sm-12">
<?php

// if the login form was submitted
if($_POST){

	// check if username and password are in the database
	$user->email=$_POST['email'];

	if($user->emailExists()){

		// update access code for user
		$access_code=$utils->getToken();

		$user->access_code=$access_code;
		if($user->updateAccessCode()){

			// send reset link
			$body="Hi there.<br /><br />";
			$body.="Please click the following link to reset your password: {$home_url}reset_password/?access_code={$access_code}";
			$subject="Reset Password";
			$send_to_email=$_POST['email'];

			// if($utils->sendEmailViaPhpMailerLibrary($send_to_email, $subject, $body)){
			if($utils->sendEmailViaPhpMail($send_to_email, $subject, $body)){
				echo "<div class=\"alert alert-info alert-dismissable\">";
					echo "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>";
					echo "Password reset link was sent to your email. Click that link to reset your password.";
				echo "</div>";
			}

			else{
				echo "<div class=\"alert alert-danger alert-dismissable\">";
					echo "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>";
					echo "ERROR: Unable to send reset link.";
				echo "</div>";
			}
		}

		else{
			echo "<div class=\"alert alert-danger alert-dismissable\">";
				echo "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>";
				echo "ERROR: Unable to update access code.";
			echo "</div>";
		}

	}

	else{
		echo "<div class=\"alert alert-danger alert-dismissable\">";
			echo "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>";
			echo "Your email cannot be found.";
		echo "</div>";
	}
}

// get 'action' value in url parameter to display corresponding prompt messages
$action=isset($_GET['action']) ? $_GET['action'] : "";

// tell the user he is not yet logged in
if($action =='not_yet_logged_in'){
	echo "<div class=\"alert alert-danger margin-top-40\" role=\"alert\">Please login.</div>";
}

?>

	<!-- actual HTML login form -->
	<div class="account-wall">
		<div id="my-tab-content" class="tab-content">
			<div class="tab-pane active" id="login">
				<img class="profile-img" src="images/login-icon.png">
				<form class="form-signin" action="forgot_password" method="post">
					<input type="email" name="email" class="form-control" placeholder="Your email" required autofocus>
					<input type="submit" class="btn btn-lg btn-primary btn-block" value="Send Reset Link" style='margin-top:1em;' />
				</form>
			</div>

		</div>
	</div>
</div>

<?php
// footer HTML and JavaScript codes
include_once "layout_foot.php";
?>
