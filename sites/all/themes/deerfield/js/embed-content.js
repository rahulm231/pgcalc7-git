jQuery(document).ready(function($) {

	function embedContentLinkClick( $this, $container ) {
		$container.find( '.embed-content-link.active' ).removeClass( 'active' );
		$this.addClass('active');
		
		if ( ! $this.hasClass('ajax-link') ) {
			
			var target_obj = $this.attr( 'rel' );
			  	
	  		if ( ! $( target_obj ).hasClass( 'active') ) {

	  			$container.find('.embed-content.active').fadeOut("fast",function(){
	  				$container.find('.embed-content.active').removeClass('active');
	  				$( target_obj ).fadeIn("fast",function(){
	  					$( target_obj ).addClass('active');
	  				});
	  			});

	  		}

		}
	}

	
	$(document).on( 'click', '.embed-content-link', function(e) {
		
		var $container = $( this ).closest( '.embed-container' );
		
		var $contentMenu = $container.find( '.embed-content-menu' );

		// content is set via CSS media queries when the menu is compressed to toggle the different states
		if ( $contentMenu.css('content').length == 0 ) {
			
			embedContentLinkClick( $(this), $container );
			
			
			
		}
		else {
			if ( $contentMenu.hasClass( 'visible-embed-content-menu' ) ) {			
				
				$container.find( '.embed-content-menu' ).removeClass('visible-embed-content-menu');
				embedContentLinkClick( $(this), $container );
			
			}
			else {
				$contentMenu.addClass( 'visible-embed-content-menu' );
			}
			
		}

	});


});