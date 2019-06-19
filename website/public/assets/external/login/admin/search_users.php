<?php
// core configuration
include_once "../config/core.php";

// include classes
include_once '../config/database.php';
include_once '../objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// initialize objects
$user = new User($db);

// get search term
$search_term=isset($_GET['s']) ? $_GET['s'] : '';

// set page title
$page_title = "User Search Results";

// include page header HTML
include_once "layout_head.php";

// search users based on search term
$stmt = $user->search($search_term, $from_record_num, $records_per_page);

// count retrieved users
$num = $stmt->rowCount();

// to identify page for paging
$page_url="search_users.php?s={$search_term}&";

// include users table HTML template
include_once "read_users_template.php";

// include page footer HTML
include_once "layout_foot.php";
?>