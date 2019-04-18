/**
 *  FAQ Javascript
 *  -----------------------------------------------------------------------------------------------------------------
 *	Generic javascript for content filtering
 *
 *  @version 0.1
 *  @package Deerfield 
 *  @todo Remaining Tasks
 *		- Change select reset to us 'siblings'
 */


( function( $ ) {
    $( document ).ready( function() {


    	var speed = 250;
		var easing = 'swing';
		

		function showFAQ( $obj ) {
			t = $obj.parent().parent();
			tc = t.find( '.entry-content' );
			if ( t.hasClass( 'active' ) ) {
				t.removeClass( 'active' );
				tc.animate( { opacity: 0 }, ( speed / 2 ) );
				tc.slideUp( speed, easing );
				$obj.find('.arrow').animateRotate( 0, speed );
			}else{
				t.addClass( 'active' ); 	
				tc.slideDown( speed, easing );
				tc.animate( { opacity: 1 }, ( speed / 2 ) );
				$obj.find('.arrow').animateRotate( 90, speed);
			}
		}


		/**
		 *	Rotate arrow on FAQ show
		 */

		$.fn.animateRotate = function( angle, duration, easing, complete ) {
		    var args = $.speed(duration, easing, complete);
		    var step = args.step;
		    return this.each(function(i, e) {
		        args.step = function(now) {
		            $.style(e, 'transform', 'rotate(' + now + 'deg)');
		            if (step) return step.apply(this, arguments);
		        };

		        $({deg: 0}).animate({deg: angle}, args);
		    });
		};



		/**
		 *	If a hash tag is passed, auto show and highlight that item
		 */

		if ( window.location.hash.length > 0 ) {
			showFAQ( $( window.location.hash + ' .header' ) );
			$( window.location.hash ).addClass( 'focus' );
		}
		

		/**
		 *	Show item on click
		 */

		$(document).on( 'click', '.filter-item .header', function(e) {
			showFAQ( $( this ) );
		});

		/**
		 *	Enable filtering via tag cloud
		 */
		$(document).on( 'click', '.faq-tag-cloud-link', function(e) {
					
			var classToShow = $( this ).attr( 'rel' );
			$( '#faq-tag-filter' ).val( classToShow );
			$( '#faq-tag-filter' ).parent().siblings().children( 'select' ).val( 'all' );

			$( '.filter-item' ).each( function( ) {
				if ( $( this ).hasClass( classToShow ) ) {
					$( this ).addClass( 'show' );
					$( this ).slideDown( speed, easing );
					$( this ).animate( { opacity: 1 }, ( speed / 2 ) );
				}
				else {
					$( this ).removeClass( 'show' );
					$( this ).animate( { opacity: 0 }, ( speed / 2 ) );
					$( this ).slideUp( speed, easing );
				}

			});
		});


	});
} )( jQuery );
