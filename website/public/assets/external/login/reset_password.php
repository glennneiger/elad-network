<?php
// core configuration
include_once "config/core.php";

// set page title
$page_title = "Reset Password";

// include login checker
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

// include page header HTML
include_once "layout_head.php";

?>
<div class="col-sm-12">
<?php

// get email and access code where it came from
$access_code=isset($_GET['access_code']) ? $_GET['access_code'] : die("access_code not found.");

// if form was posted
if($_POST){


	// check if access code exists
	$user->access_code=$access_code;

	if(!$user->accessCodeExists()){
		die('access code not found');
	}

	else{
		// set values to object properties
		$user->password=$_POST['password'];

		// reset password
		if($user->updatePassword()){
			echo "<div class='alert alert-info'>";
				echo "Password was reset. Please <a href='{$home_url}login'>login.</a>";
			echo "</div>";
		}

		else{
			echo "<div class='alert alert-danger'>";
				echo "Unable to reset password.";
			echo "</div>";
		}
	}
}

// if the form wasn't submitted yet, show register form
//else{
?>

<form action='<?php echo $home_url; ?>reset_password/?access_code=<?php echo $access_code; ?>' method='post'>

    <table class='table table-hover table-responsive table-bordered'>

		<tr>
            <td>Password</td>
            <td><input type='password' name='password' class='form-control' required></td>
        </tr>

        <tr>
            <td></td>
            <td>
				<button type="submit" class="btn btn-primary">
					Reset Password
				</button>
            </td>
        </tr>

    </table>
</form>
</div>
<?php
//}

// include page footer HTML
include_once "layout_foot.php";
?>
