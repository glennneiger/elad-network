<?php
// core configuration
include_once "config/core.php";

// set page title
$page_title="Index";

// include login checker
$require_login=true;
include_once "login_checker.php";

// include page header HTML
include_once 'layout_head.php';

echo "<div class='col-md-12'>";

	// to prevent undefined index notice
	$action = isset($_GET['action']) ? $_GET['action'] : "";

	// used when somethign was added to cart
	$id = isset($_GET['id']) ? $_GET['id'] : "";
	$name = isset($_GET['name']) ? htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8') : "";

	// if login was successful
	if($action=='login_success'){
		echo "<div class='alert alert-info'>";
			echo "<strong>Hi " . $_SESSION['firstname'] . ", welcome back!</strong>";
		echo "</div>";
	}

	// if user was not admin
	else if($action=='not_admin'){
		echo "<div class=\"alert alert-danger margin-top-40\" role=\"alert\">You cannot access that page.</div>";
	}

	// if login was successful
	else if($action=='already_logged_in'){
		echo "<div class='alert alert-info'>";
			echo "<strong>You are already logged in.</strong>";
		echo "</div>";
	}

	echo "<div class='alert alert-info'>";
		echo "Content when logged in will be here. For example, your premium products or services.";
	echo "</div>";

echo "</div>";

// footer HTML and JavaScript codes
include 'layout_foot.php';
?>
