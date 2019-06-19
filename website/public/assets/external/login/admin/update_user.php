<?php
// core configuration
include_once "../config/core.php";

// make it work in PHP 5.4
include_once "../libs/php/pw-hashing/passwordLib.php";

// check if logged in as admin
include_once "login_checker.php";

// include classes
include_once '../config/database.php';
include_once '../objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// initialize objects
$user = new User($db);

// set page title
$page_title = "<a href='read_users.php'>Users</a> / Edit User";

// include page header HTML
include_once "layout_head.php";

echo "<div class='col-md-12'>";

	// get user id on the URL parameter
	$user_id=isset($_GET['id']) ? $_GET['id'] : die('Missing user ID.');

	// if HTML form was submitted / posted
	if($_POST){

		// set posted values to user properties
		$user->firstname=$_POST['firstname'];
		$user->lastname=$_POST['lastname'];
		$user->email=$_POST['email'];
		$user->contact_number=$_POST['contact_number'];
		$user->address=$_POST['address'];
		$user->access_level=$_POST['access_level'];
		$user->status=$_POST['status'];
		$user->id=$user_id;

		// update the user
		if($user->update()){

			// get currently logged in user first name
			$user->id=$_SESSION['user_id'];
			$user->readOne();

			// change saved firstname
			$_SESSION['firstname']=$user->firstname;

			// tell the user it was updated
			echo "<div class='alert alert-success'>User was edited</div>";
		}

		// unable to edit user
		else{
			echo "<div class='alert alert-danger' role='alert'>Unable to edit user.</div>";
		}
	}

	// set user id property
	$user->id=$user_id;

	// read user details
	$user->readOne();
	?>

	<!-- HTML form to update user -->
	<form action='update_user.php?id=<?php echo $user_id; ?>' method='post' id='update-user'>

	    <table class='table table-hover table-responsive table-bordered'>

	        <tr>
	            <td class='width-30-percent'>Firstname</td>
	            <td><input type='text' name='firstname' value="<?php echo $user->firstname; ?>" class='form-control' required></td>
	        </tr>

	        <tr>
	            <td>Lastname</td>
	            <td><input type='text' name='lastname' value="<?php echo $user->lastname; ?>" class='form-control' required></td>
	        </tr>

			<tr>
	            <td>Contact Number</td>
	            <td><input type='text' name='contact_number' value="<?php echo $user->contact_number; ?>" class='form-control' required></td>
	        </tr>

			<tr>
	            <td>Address</td>
	            <td><textarea name='address' class='form-control' required><?php echo $user->address; ?></textarea></td>
	        </tr>

			<?php
			// if it is the first admin user, access level is automatically 'Admin'
			if($user_id==1){
				echo "<input type='hidden' name='access_level' value='Admin' />";
			}

			// else there's the choice, either the user will be 'Admin' or 'Customer'
			else{
			?>

			<tr>
	            <td>Access Level</td>
	            <td>
					<div class="btn-group" data-toggle="buttons">

						<!-- highlight the correct access level button -->
						<label class="btn btn-default <?php echo $user->access_level=='Customer' ? 'active' : ''; ?>">
							<input type="radio" name="access_level" value="Customer" <?php echo $user->access_level=='Customer' ? 'checked' : ''; ?>> Customer
						</label>

						<label class="btn btn-default <?php echo $user->access_level=='Admin' ? 'active' : ''; ?>">
							<input type="radio" name="access_level" value="Admin" <?php echo $user->access_level=='Admin' ? 'checked' : ''; ?>> Admin
						</label>

					</div>
				</td>
	        </tr>

			<?php
			}
			?>

			<tr>
	            <td>Email</td>
	            <td><input type='email' name='email' value="<?php echo $user->email; ?>" class='form-control' required></td>
	        </tr>

			<tr>
	            <td>Status</td>
	            <td>
					<div class="btn-group" data-toggle="buttons">

						<!-- highlight the correct status button -->
						<label class="btn btn-default <?php echo $user->status==0 ? 'active' : ''; ?>">
							<input type="radio" name="status" value="0" <?php echo $user->status==0 ? 'checked' : ''; ?>> Pending
						</label>

						<label class="btn btn-default <?php echo $user->status==1 ? 'active' : ''; ?>">
							<input type="radio" name="status" value="1" <?php echo $user->status==1 ? 'checked' : ''; ?>> Confirmed
						</label>

					</div>
				</td>
	        </tr>
			
	        <tr>
	            <td></td>
	            <td>
					<button type="submit" class="btn btn-primary">
						<span class="glyphicon glyphicon-edit"></span> Edit User
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
