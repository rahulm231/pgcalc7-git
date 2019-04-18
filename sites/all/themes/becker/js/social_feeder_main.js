// Just in case
$ = jQuery;


jQuery(document).ready(function($) {
	var social_plugin_path = social_feeder_wp_info.plugin_path;

	// START handle click on top level service
		$('#social_feeder_list .social_feeder_service a').click(function(event) {
			// prevent any default browser action on the click (like link following)
			event.preventDefault();
			
			/**
			 * Initial state setup
			 */
				// Remove the 'active' class from all social services
				$('#social_feeder_list .social_feeder_service a').parent().removeClass('active');
				
				// Add the 'active' class to the selected social service
				$(this).parent().addClass('active');

				// Get the service to pull, for later use
				var service_to_pull = $(this).data('social-feeder-linked-service');

				// Assign the loading class, CSS should provide an appropriate visual on this class
				$('#social_feeder_accounts_list_wrapper').html('').addClass('social_feeder_loading');
				$('#social_feeder_wrapper').removeClass('social_feeder_single_account');
			/********************************************/



			/**
			 * AJAX request to get the data for the social feeds
			 */
				$.ajax({
					url: social_plugin_path+'/_social_feed/v1/account_list/'+service_to_pull,
					type: 'GET',
					dataType: 'html',
				})
				.done(function(result) {
					// done on succesful completion
					obj = JSON.parse(result);
					result = obj.markup;
					var count = obj.count;

					// Handle the case where there is only one account for the feed,
					// in this case the accounts list will be hidden (in css).
					if (count==1)
					{
						$('#social_feeder_wrapper').addClass('social_feeder_single_account');
					}

					$('#social_feeder_accounts_list_wrapper').html(result).removeClass('social_feeder_loading');

					// START handle click on account level item
						$('#social_feeder_account_list .social_feeder_account a').click(function(event) {
							event.preventDefault();
							$('#social_feeder_account_list .social_feeder_account a').parent().removeClass('active');
							$(this).parent().addClass('active');

							$('#social_feeder_accounts_list_wrapper, #social_feeder_posts_list_wrapper, #social_feeder_account_list_opener').removeClass('social_feeder_mobile_nav_active');
							$('#social_feeder_posts_list_wrapper').html('').addClass('social_feeder_loading');

							var service_to_pull = $(this).data('social-feeder-linked-service');
							var account_to_pull = $(this).data('social-feeder-linked-account');

							$.ajax({
								url: social_plugin_path+'/_social_feed/v1/post_list/'+service_to_pull+'/'+account_to_pull,
								type: 'GET',
								dataType: 'html',
							})
							.done(function(result) {
								$('#social_feeder_posts_list_wrapper').html(result).removeClass('social_feeder_loading');
								
								// Instantiate fancybox on anything new
								$(".fancybox").fancybox();
								// Run the test to see if the grid JS should be used
								sf_run_grid_test();

								// START view controls
									$('#social_feeder_post_list_controls_toggle').click(function(event) {
										event.preventDefault();
										$('#social_feeder_post_list_controls_wrapper').toggleClass('active');
									});
									$('#social_feeder_post_list_controls .social_feeder_control_btn').click(function(event) {
										event.preventDefault();

										var viewClass = 'social_feeder_' + $(this).data('sf-post-list-view');
										$('#social_feeder_wrapper').removeClass('social_feeder_grid_view social_feeder_list_view').addClass(viewClass);

										// Run the test to see if the grid JS should be used
										sf_run_grid_test();
									
									});
								// END view controls

								// Just for testing
								// $('#ajax_test_holder').html(result);
							})
							.fail(function() {
								// done if there is an error
							})
							.always(function() {
								// done on completion regarldess of sucess
							});
							
						});
					// END handle click on account level item
					// 
					$('#social_feeder_account_list .social_feeder_account a').first().click();
				})
				.fail(function() {
					// done if there is an error
				})
				.always(function() {
					// done on completion regardless of sucess
				});
			/********************************************/
		
		}); // end on click
		
	// END handle click on top level service


	
	

	// START initial feed view
		$('#social_feeder_list .social_feeder_service a').first().click();
	// END initial feed view



	// START mobile off canvas nav coding
		$('#social_feeder_account_list_opener').click(function(event) {
			event.preventDefault();
			$('#social_feeder_accounts_list_wrapper, #social_feeder_posts_list_wrapper, #social_feeder_account_list_opener').toggleClass('social_feeder_mobile_nav_active');
		});
	// END mobile off canvas nav coding
});


function sf_run_grid_test()
{
	if ($('#social_feeder_wrapper').hasClass('social_feeder_grid_view'))
	{
		// alert('should be a grid, so initialize');
		$('#social_feeder_posts_list').masonry({
			itemSelector: '.social_feeder_social_item'
		});
		$('#social_feeder_posts_list').imagesLoaded( function()
		{
			$('#social_feeder_posts_list').masonry('layout');
		});
	}
	else
	{
		// alert('should not be a grid, so destroy');
		$('#social_feeder_posts_list').masonry('destroy');
	}
}