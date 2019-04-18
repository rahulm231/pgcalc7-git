( function( $ ) {
	$( document ).ready( function() {


		var navAniSpeed = 360;
		

		menu_resizeend();

		//	A function to wait for end of window resizing before performing anaction
		var rtime = new Date(1, 1, 2000, 12,00,00);
		var timeout = false;
		var menu_delta = 250;

		$( window ).resize( function() {
		    rtime = new Date();
		    if ( timeout === false ) {
		        timeout = true;
		        setTimeout( menu_resizeend, menu_delta );
		    }
		});
		

		/**
		 * Hide and show specific menus depending on the size after resizing the browser. 
		 * Classes are set, Cookies are not
		 */
		function menu_resizeend() {
			if ( $( window ).width() > 840 ) {
				
				if ( ! $( 'body' ).hasClass('no-subnav') ) {	
					
				    if (new Date() - rtime < menu_delta) {
				        setTimeout(menu_resizeend, menu_delta);
				    } else {
				        timeout = false;
				       	if ( $( window ).width() > 920 ) {
				       		if ( $( 'body' ).hasClass( 'hide_subnav' ) ) {
				       			toggle_subnav( false, true );

				       		}
				       	}
				       	if ( $( window ).width() > 520 && $( window ).width() < 920 ) {
				       		if ( ! $( 'body' ).hasClass( 'hide_nav' ) ) {
				       			toggle_nav( false, true );
				       		}
				       	}
				       	if ( $( window ).width() < 520 || $( window ).width() > 920 ) {
							$( 'body' ).removeClass( 'responsive_show_nav' );
							if ( $( 'body' ).hasClass( 'hide_nav' ) ) {
				       			toggle_nav( false, true );

				       		}
				       	}
				    } 
				}
			}

		}


		/* navigation styles */
		$( '#nav_toggle' ).on( 'click', function(){ 
			toggle_nav( true, true ); 
		} );

		
		$(' #nav_toggle_area' ).on( 'click', function(){ 
			toggle_nav( true, true ); 
		} );
		

		/* subnavigation animations */
		$( '#subnav_toggle' ).on( 'click', function(){ 
			toggle_subnav( true, true ); 
		} );

		$(' #subnav_toggle_area' ).on( 'click', function(){ 
			toggle_subnav( true, true ); 
		} );


		/* subnavigation animations */
		$( '#responsive_nav_toggle_area ' ).on( 'click', function(){ 
			$( 'body' ).toggleClass( 'responsive_show_nav' );
			$('html, body').scrollTop(0);
		} );
		



		function toggle_nav( setCookie, toggleClass ) {
			if ( ! $( 'body' ).hasClass( 'hiding_nav' ) ) {
				var setCookie = setCookie;
				var toggleClass = toggleClass;
				/* show nav */
				if ( $( 'body' ).hasClass( 'hide_nav' ) ) {
					$( 'body' ).addClass( 'hiding_nav' );
					$( '#site_logo' ).animate( { opacity: 0 }, navAniSpeed / 2 );
					$( '#ui_toggle_container' ).animate( { opacity: 0 }, navAniSpeed / 2, function(){
						$( '#nav_lc_bg' ).animate({ width: '144px', maxWidth: '144px'}, navAniSpeed );
						$( '#nav_lc' ).animate({ width: '144px', minWidth: '144px' }, navAniSpeed, function(){
							if ( toggleClass ) {
								$( 'body' ).toggleClass( 'hide_nav' );
								$( 'body' ).toggleClass( 'show_nav' );
							}
							$( '#site_logo' ).animate( { opacity: 1 }, navAniSpeed / 2 );
							$( '#nav' ).animate( { opacity: 1 }, navAniSpeed / 2 );
							$( '#ui_toggle_container' ).animate( { opacity: 1 }, navAniSpeed / 2 );
							if ( setCookie )
								$.cookie( 'nav_status', 'visible', { path: '/', expires: 1 });
							$( 'body' ).removeClass( 'hiding_nav' );
							$( 'body' ).trigger( 'resizedNav' );

						} );
					} ) ;
					
				}
				/* hide nav */
				else {
					$( 'body' ).addClass( 'hiding_nav' );
					$( '#site_logo' ).animate( { opacity: 0 }, navAniSpeed / 2 );
					$( '#ui_toggle_container' ).animate( { opacity: 0 }, navAniSpeed / 2) ;
					$( '#nav' ).animate( { opacity: 0 }, navAniSpeed / 2, function(){
						$( '#nav_lc_bg' ).animate({ width: '48px', maxWidth: '48px' }, navAniSpeed );
						$( '#nav_lc' ).animate({ width: '48px', minWidth: '48px' }, navAniSpeed, function(){
							if ( toggleClass ) {
								$( 'body' ).toggleClass( 'hide_nav' );
								$( 'body' ).toggleClass( 'show_nav' );
							}
							$( '#site_logo' ).animate( { opacity: 1 }, navAniSpeed / 2 );
							$( '#ui_toggle_container' ).animate( { opacity: 1 }, navAniSpeed / 2 );
							if ( setCookie )
								$.cookie( 'nav_status', 'hidden', { path: '/', expires: 1 });
							$( 'body' ).removeClass( 'hiding_nav' );
							$( 'body' ).trigger( 'resizedNav' );
						} );
					} );
				}
			}
		}


		function toggle_subnav( setCookie, toggleClass ) {
			
			if ( ! $( 'body' ).hasClass( 'hiding_subnav' ) ) {
				var setCookie = setCookie;
				var toggleClass = toggleClass;
				/* show sub nav */
				if ( $( 'body' ).hasClass( 'hide_subnav' ) ) {
					$( 'body' ).addClass( 'hiding_subnav' );
					$( '#subnav_lc' ).animate({ width: '196px',  minWidth: '196px'  }, navAniSpeed, function(){
						if ( toggleClass ) {
							$( 'body' ).toggleClass( 'hide_subnav' );
							$( 'body' ).toggleClass( 'show_subnav' );
						}
						if ( setCookie )
							$.cookie( 'subnav_status', 'visible', { path: '/', expires: 1 });
						$( 'body' ).removeClass( 'hiding_subnav' );
						$( 'body' ).trigger( 'resizedNav' );
					});
				}
				/* hide subnav */
				else {
					$( 'body' ).addClass( 'hiding_subnav' );
					$( '#subnav_lc' ).animate({ width: '8px', minWidth: '8px' }, navAniSpeed, function(){
						if ( toggleClass ) {
							$( 'body' ).toggleClass( 'hide_subnav' );
							$( 'body' ).toggleClass( 'show_subnav' );
						}
						if ( setCookie )
							$.cookie( 'subnav_status', 'hidden', { path: '/', expires: 1 });
						$( 'body' ).removeClass( 'hiding_subnav' );
						$( 'body' ).trigger( 'resizedNav' );
					});
				}
			}
		}
	});
} )( jQuery );	