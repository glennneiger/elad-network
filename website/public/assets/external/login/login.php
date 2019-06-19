<?php
// core configuration
include_once "config/core.php";

// set page title
$page_title = "Login";

// include login checker
$require_login=false;
include_once "login_checker.php";

// include classes
include_once "config/database.php";
include_once "objects/user.php";
include_once "libs/php/pw-hashing/passwordLib.php";

// get database connection
$database = new Database();
$db = $database->getConnection();

// initialize objects
$user = new User($db);

// default to false
$access_denied=false;

// if the login form was submitted
if($_POST){

	// check if email and password are in the database
	$user->email=$_POST['email'];

	// check if email exists, also get user details using this emailExists() method
	$email_exists = $user->emailExists();

	// validate login
	if ($email_exists && password_verify($_POST['password'], $user->password) && $user->status==1){

		// if it is, set the session value to true
		$_SESSION['logged_in'] = true;
		$_SESSION['user_id'] = $user->id;
		$_SESSION['access_level'] = $user->access_level;
		$_SESSION['firstname'] = htmlspecialchars($user->firstname, ENT_QUOTES, 'UTF-8') ;
		$_SESSION['lastname'] = $user->lastname;

		// if access level is 'Admin', redirect to admin section
		if($user->access_level=='Admin'){
			header("Location: {$home_url}admin/index.php?action=login_success");
		}

		// else, redirect only to 'Customer' section
		else{
			header("Location: {$home_url}index.php?action=login_success");
		}
	}

	// if username does not exist or password is wrong
	else{
		$access_denied=true;
	}
}

// include page header HTML
include_once "layout_head.php";

// to prevent undefined index notice
$action = isset($_GET['action']) ? $_GET['action'] : "";

?>
<div class="col-sm-6 col-md-4 col-md-offset-4">
<?php

// if an email was verified
if($action=='email_verified'){
	echo "<div class='alert alert-success'>";
		echo "<strong>Your email was verified. Thank you!</strong> Please login.";
	echo "</div>";
}

// get 'action' value in url parameter to display corresponding prompt messages
$action=isset($_GET['action']) ? $_GET['action'] : "";

// tell the user he is not yet logged in
if($action =='not_yet_logged_in'){
	echo "<div class=\"alert alert-danger margin-top-40\" role=\"alert\">Please login.</div>";
}

// tell the user to login
else if($action=='please_login'){
	echo "<div class='alert alert-info'>";
		echo "<strong>Please login to access that page.</strong>";
	echo "</div>";
}

// tell the user if access denied
if($access_denied){
	echo "<div class=\"alert alert-danger margin-top-40\" role=\"alert\">";
		echo "Access Denied.<br /><br />";
		echo "Your username or password maybe incorrect";
	echo "</div>";
}
?>

	<!-- actual HTML login form -->
	<div class="account-wall">
		<div id="my-tab-content" class="tab-content">
			<div class="tab-pane active" id="login">
				<img class="profile-img" src="images/login-icon.png">
				<form class="form-signin" action="login" method="post">
					<input type="text" name="email" class="form-control" placeholder="Email" required autofocus />
					<input type="password" name="password" class="form-control" placeholder="Password" required />
					<input type="submit" class="btn btn-lg btn-primary btn-block" value="Log In" />
				</form>
			</div>

			<!-- give user other options -->
			<div style='text-align:center;'>
				<a href='<?php echo $home_url; ?>register'>Sign up</a> • <a href='<?php echo $home_url; ?>forgot_password'>Forgot password?</a>
			</div>

		</div>
	</div>
</div>

<?php
// footer HTML and JavaScript codes
include_once "layout_foot.php";
?>
