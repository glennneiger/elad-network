<?php
// core configuration
include_once "../config/core.php";

// make it work in PHP 5.4
include_once "../libs/php/pw-hashing/passwordLib.php";

// set page title
$page_title = "Change Password";

// include login checker
include_once "login_checker.php";

// get database connection
include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

// prepare user object
$user = new User($db);

// parameters
$user_id=isset($_GET['id']) ? $_GET['id'] : die('User ID not found.');

// include page header HTML
include_once "layout_head.php";

echo "<div class='col-md-12'>";

	// if HTML form was posted / submitted
	if($_POST){

		// new password
		$user->password=$_POST['password'];

		// get user id from session
		$user->id=$user_id;

		// update user information
		if($user->changePassword()){

			// tell the user it was updated
			echo "<div class='alert alert-success'>Password was changed.</div>";
		}

		// tell the user update was failed
		else{
			echo "<div class='alert alert-danger'>Unable to change password.</div>";
		}
	}

	?>

	<!-- HTML form to update user -->
	<form action='change_password.php?id=<?php echo $user_id; ?>' method='post' id='change-password'>

		<table class='table table-hover table-responsive table-bordered'>

			<tr>
				<td style='width:30%;'>New Password</td>
				<td><input type='password' name='password' class='form-control' required id='passwordInput' /></td>
			</tr>

			<tr>
				<td>Re-type New Password</td>
				<td>
					<input type='password' name='confirm_password' class='form-control' required id='confirmPasswordInput' />
					<p>
						<div class="" id="passwordStrength"></div>
					</p>
				</td>
			</tr>

			<tr>
				<td></td>
				<td>
					<button type="submit" class="btn btn-primary">
						<span class="glyphicon glyphicon-edit"></span> Change Password
					</button>
				</td>
			</tr>

		</table>
	</form>

<?php
echo "</div>";

// include page footer HTML
include_once "layout_foot.php";
?>
