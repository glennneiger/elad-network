<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo isset($page_title) ? strip_tags($page_title) : "Store Admin"; ?></title>

    <!-- Bootstrap CSS -->
 	<link href="<?php echo $home_url; ?>libs/js/bootstrap/dist/css/bootstrap.css" rel="stylesheet" media="screen">

    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<!-- jQuery UI CSS -->
	<link rel="stylesheet" href="<?php echo $home_url; ?>libs/js/jquery-ui-1.11.4.custom/jquery-ui.min.css" />

	<!-- rich text editor CSS -->
	<link rel="stylesheet" type="text/css" href="<?php echo $home_url; ?>libs/js/yellow-text-master/demo/stylesheets/yellow-text-default.css" />

	<!-- custom CSS -->
	<style>
	.width-30-percent{
		width:30%;
	}

	.margin-left-1em{
		margin:0 1em 0 0;
	}

	.width-20-em{
		width: 20em;
	}

	.width-13-em{
		width: 13em;
	}

	.margin-zero{
		margin:0;
	}

	.padding-zero{
		padding:0;
	}

	.btn-margin-right{
		margin-right:.5em;
	}

	.margin-bottom-1em{
		margin-bottom:1em;
	}

	.left-margin{
		margin:0 .5em 0 0;
	}

	.right-button-margin{
		margin: 0 0 1em 0;
		overflow: hidden;
	}

	.thumb-image {
		float:left;
		width: 150px;
		height: 150px;
		margin:.6em 1.2em 0 0;
		position:relative;
	}

	.thumb-image .delete-image {
		position:absolute;
		top:-10px;
		right:-10px;
	}

	.delete-image img{
		width:25px;
	}

	.thumb-wrapper{
		border:thin solid #999;
		float:left;
		width: 150px;
		height: 150px;
		margin:.6em 1.2em 0 0;
		position:relative;
	}

	.thumb-wrapper img{
		width:130px; height:130px; margin:10px;
	}

	#html-btn {
		display:none;
	}

	.delete-pdf{
		margin-left:.5em;
	}

	.delete-pdf img{
		width:20px; cursor:pointer;
	}

	.pdf-item{
		padding:0 0 1em 0;
	}
	</style>
</head>
<body>

	<?php
	// include top navigation bar
	include_once "navigation.php";
	?>

    <!-- container -->
    <div class="container">

		<!-- display page title -->
        <div class="col-md-12">
            <div class="page-header">
                <h1><?php echo isset($page_title) ? $page_title : "The Code of a Ninja"; ?></h1>
            </div>
        </div>
