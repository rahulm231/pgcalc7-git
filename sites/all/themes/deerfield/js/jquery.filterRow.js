/**
 *  Filter Javascript
 *  -----------------------------------------------------------------------------------------------------------------
 *
 *  @version 0.1
 *  @package Deerfield 
 *  @todo Remaining Tasks
 *		- Change select reset to us 'siblings'
 *		- Functionality is shared by other filter scripts and should be used as a plugin
 */

( function( $ ) {
    $( document ).ready( function() {


    	var speed = 250;
		var easing = 'swing';


		$( '.filter-select' ).change( function() {

			// $( '#' + $( this ).attr('id') ).val( classToShow );
			$( '#' + $( this ).attr('id') ).parent().siblings().children( 'select' ).val( 'all' );

			var classToShow = $( this ).val();
			
			if ( classToShow == "all" ) {
				
				$( '.filter-item' ).each( function() { 
					$( this ).animate( { opacity: 1 }, ( speed / 2 ) );
					$( this ).addClass( 'show' );
					$( this ).slideDown( speed, easing );
				});

			}
			else {
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
			}

		});


	});
} )( jQuery );
