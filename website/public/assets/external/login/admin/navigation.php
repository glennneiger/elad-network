<!-- navbar -->
<div class="navbar navbar-default navbar-static-top" role="navigation">
	<div class="container">

		<div class="navbar-header">
			<!-- to enable navigation dropdown when viewed in mobile device -->
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			</button>

			<!-- Change "Site Admin" to your site name -->
			<a class="navbar-brand" href="<?php echo $home_url; ?>admin/index.php">Site Admin</a>
		</div>

		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav">


				<!-- highlight for order related pages -->
				<li <?php echo $page_title=="Admin Index" ? "class='active'" : ""; ?>>
					<a href="<?php echo $home_url; ?>admin/index.php">Home</a>
				</li>

				<!-- highlight for user related pages -->
				<li <?php
						echo $page_title=="Users"
							|| $page_title=="Create User"
							|| $page_title=="Update User"
							|| $page_title=="User Search Results"
							|| $page_title=="Change Password"
							|| strip_tags($page_title)=="Users / Edit User"
							|| strip_tags($page_title)=="Users / Create User"
							? "class='active'" : ""; ?> >
					<a href="<?php echo $home_url; ?>admin/read_users.php">Users</a>
				</li>
			</ul>

			<!-- options in the upper right corner of the page -->
			<ul class="nav navbar-nav pull-right">
				<li>
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
						<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
						&nbsp;&nbsp;<?php echo $_SESSION['firstname']; ?>
						&nbsp;&nbsp;<span class="caret"></span>
					</a>
					<ul class="dropdown-menu" role="menu">
						<!-- update currently logged in admin user -->
						<li>
							<a href="<?php echo $home_url . "admin/update_user.php?id=" . $_SESSION['user_id']; ?>">Edit Profile</a>
						</li>

						<!-- change password -->
						<li>
							<a href="<?php echo $home_url . "admin/change_password.php?id=" . $_SESSION['user_id']; ?>">Change Password</a>
						</li>

						<!-- log out user -->
						<li><a href="<?php echo $home_url; ?>logout.php">Logout</a></li>
					</ul>
				</li>
			</ul>

		</div><!--/.nav-collapse -->

	</div>
</div>
<!-- /navbar -->
