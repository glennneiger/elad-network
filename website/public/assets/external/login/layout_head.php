<?php
// initialize if session cart is empty
if(!isset($_SESSION['cart'])){
	$_SESSION['cart']=array();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- set the page title, for seo purposes too -->
    <title><?php echo isset($page_title) ? strip_tags($page_title) : "Store Front"; ?></title>

    <!-- Bootstrap CSS -->
	<link href="<?php echo $home_url; ?>libs/js/bootstrap/dist/css/bootstrap.css" rel="stylesheet" media="screen">

	<!-- blue imp gallery CSS -->
	<link rel="stylesheet" href="<?php echo $home_url; ?>libs/js/Bootstrap-Image-Gallery-3.1.1/css/blueimp-gallery.min.css">
	<link rel="stylesheet" href="<?php echo $home_url; ?>libs/js/Bootstrap-Image-Gallery-3.1.1/css/bootstrap-image-gallery.min.css">

    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<!-- custom CSS -->
	<style>
	.margin-bottom-1em{
		margin-bottom:1em;
	}

	.width-30-percent{
		width:30%;
	}

	.margin-1em-zero{
		margin:1em 0;
	}

	.width-30-percent{
		width:30%;
	}

	.width-70-percent{
		width:70%;
	}

	.photo-thumb{
		width:214px;
		height:214px;
		float:left;
		border: thin solid #d1d1d1;
		margin:0 1em 1em 0;
	}

	div#blueimp-gallery div.modal {
		overflow: visible;

	}

	.form-signin
	{
		max-width: 330px;
		padding: 15px;
		margin: 0 auto;
	}
	.form-signin .form-control
	{
		position: relative;
		font-size: 16px;
		height: auto;
		padding: 10px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.form-signin .form-control:focus
	{
		z-index: 2;
	}
	.form-signin input[type="text"]
	{
		margin-bottom: -1px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.form-signin input[type="password"]
	{
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.account-wall
	{
		margin-top: 40px;
		padding: 40px 0px 20px 0px;
		background-color: #ffffff;
		box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
	}
	.login-title
	{
		color: #555;
		font-size: 22px;
		font-weight: 400;
		display: block;
	}
	.profile-img
	{
		width: 96px;
		height: 96px;
		margin: 0 auto 10px;
		display: block;
		-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;
	}
	.select-img
	{
		border-radius: 50%;
		display: block;
		height: 75px;
		margin: 0 30px 10px;
		width: 75px;
		-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;
	}
	.select-name
	{
		display: block;
		margin: 30px 10px 10px;
	}

	.logo-img
	{
		width: 96px;
		height: 96px;
		margin: 0 auto 10px;
		display: block;
		-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;
	}

	.margin-top-40{
		margin-top:40px;
	}

	.text-align-center{
		text-align:center;
	}
	</style>

</head>
<body>

	<!-- include the navigation bar -->
	<?php include_once 'navigation.php'; ?>

    <!-- container -->
    <div class="container">

		<?php
		// if given page title is 'Login', do not display the title
		if($page_title!="Login"){
		?>
		<div class='col-md-12'>
	        <div class="page-header">
	            <h1><?php echo isset($page_title) ? $page_title : "The Code of a Ninja"; ?></h1>
	        </div>
		</div>
		<?php
		}
		?>
