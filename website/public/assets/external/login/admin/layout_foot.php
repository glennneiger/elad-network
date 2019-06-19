	</div>
	<!-- /container -->

<!-- jQuery library -->
<script src="<?php echo $home_url; ?>libs/js/jquery.js"></script>

<!-- our custom JavaScript -->
<script src="<?php echo $home_url; ?>libs/js/custom-script.js"></script>

<!-- jQuery UI JavaScript -->
<script src="<?php echo $home_url; ?>libs/js/jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
	
<!-- Bootstrap JavaScript -->
<script src="<?php echo $home_url; ?>libs/js/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="<?php echo $home_url; ?>libs/js/bootstrap/docs-assets/js/holder.js"></script>

<script>
// jQuery codes
$(document).ready(function(){
	
	// click listener for all delete buttons
	$(document).on('click', '.delete-object', function(){

		// current button
		var current_element=$(this);
		
		// id of record to be deleted
		var id = $(this).attr('delete-id');
		
		// php file used for deletion
		var delete_file = $(this).attr('delete-file');
		
		// confirmation pop up before deleting a record
		var q = confirm("Record will be deleted.");
		
		// if the user clicked ok
		if (q == true){

			// post the request to specified delete file
			$.post(delete_file, {
				object_id: id
			}, function(data){
				
				// show the response to the console
				console.log(data);
				
				// if deleting product image or pdf
				if(delete_file=='delete_image.php' || delete_file=='delete_pdf.php'){
					current_element.parent().hide();
				}
				
				// if deleting product, category, user, etc.
				else{
					document.location.href = document.URL;
				}
				
			}).fail(function() {
				alert('Unable to delete.');
			});
		}
			
		return false;
	});
	
	// register and edit profile submit form catch, used to tell user if password is strong enough or not
	$('#create-user, #update-user').submit(function(){
		
		var password_input = $('#passwordInput').text();
		var confirm_password_input = $('#confirmPasswordInput').text();
		
		if(password_input=="" && confirm_password_input==""){
			return true;
		}
		
		else{
			var password_strenght=$('#passwordStrength').text();
			if(password_strenght!='Good Password!'){
				alert('Password not strong enough');
				return false
			}
		}
		
		return true;
	});
	
});


</script>

<!-- rich text editor for product description, etc. -->
<script type="text/javascript" src="<?php echo $home_url; ?>libs/js/yellow-text-master/dist/yellow-text.min.js"></script>
<script type="text/javascript">
$(function() {
	// make the rich text editor plugin work
	$('.js-textarea').YellowText({
		defaultFont: 'Arial'
	});
});
</script>
	
<!-- end the HTML page -->
</body>
</html>