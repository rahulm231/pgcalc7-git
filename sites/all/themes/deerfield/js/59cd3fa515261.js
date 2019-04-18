/**
 *  FAQ Ajax Javascript
 *  -----------------------------------------------------------------------------------------------------------------
 *	Handle helpful ranking for faqs via ajax
 *
 *  @version 0.1
 *  @package Deerfield 
 *  @todo Remaining Tasks
 */


( function( $ ) {
    $( document ).ready( function() {


    	var speed = 250;
		var easing = 'swing';

		$( '.rate-post' ).click( function() {
			var post_content = '';
			var i = $( this ).attr('id').split( '-post-' );
			
			var post_id		= i[1];
			post_content 	+= 'post_id=' +  post_id + '&';
			
			if ( $( this ).hasClass( 'increment' ) ) {
				var adjustment_val	= 1;
			} else if ( $( this ).hasClass( 'decrement' ) ) {
				var adjustment_val	= -1;
			}

			var post_data = {
					action: 'rate_faq',
					postID: post_id,
					adjustment: adjustment_val,
					nonce: dfajax.rate_faq_nonce,
				};
			
			$.post( dfajax.ajaxurl, post_data, function( response ) {
				
				$( '.post-' + post_id ).find( '.rate-post' ).each( function( ){
					$( this ).slideUp( speed, easing );
				});
				$( '.post-' + post_id + ' .feedback' ).append('<span class="response">Thank you for your feedback.</span>');
			});
		});


	});
} )( jQuery );
