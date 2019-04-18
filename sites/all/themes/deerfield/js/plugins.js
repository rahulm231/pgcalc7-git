( function( $ ) {
	$( document ).ready( function() {


		/**
		 * Auto add lightbox to images that link to photos/pictures
		 */
		$('a').each(function() {
			if ( IsValidImageUrl( $(this).attr('href') ) ) {
				if ( typeof $(this).data('lightbox') === "undefined" ) {
					$(this).attr("data-lightbox", "gallerySet");
				}
			}
		});

		function IsValidImageUrl( url ) {
		    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(url);
		}



		var speed = 125;
		var easing = 'swing';

		/* 	
		 *	Clicking on the header object with a specific class will
		 *	show or hide the next objects content and toggle the 
		 *	.active class
		 */

		$(document).on( 'click', '.next-vis-ctrl', function(){
			var t = $(this);
			tc = t.next();
			if ( t.hasClass( 'active' ) ) {
				tc.animate( { opacity: 0 }, ( speed / 2 ) );
				tc.slideUp( speed, easing, function( ) { t.removeClass( 'active' ) });	
			}else{
				tc.slideDown( speed, easing, function( ) { t.addClass( 'active' ) });
				tc.animate( { opacity: 1 }, ( speed / 2 ) );
			}
		});


		$('.toggle').on( 'click', function() {
			$t = $( this );
			$tgt = $( $t.attr( 'rel' ) );
			c = 'active';
			
			if ( ! $t.hasClass( c ) ) { 
				$t.siblings( '.toggle.active' ).removeClass( c );
				$t.addClass( c );

				$ptgt = $tgt.siblings( '.content.active' );
			
				$ptgt.fadeOut( ( speed ), function( ) { 
					$ptgt.removeClass( c );
					$tgt.fadeIn( ( speed ), function( ) { 
						$tgt. addClass( c ); 
					} );
				} );
				

			//	$ptgt.animate( { opacity: 0 }, ( speed / 2 ) );
			//	$ptgt.slideUp( speed, easing, function( ) { $ptgt.removeClass( c ) } );

			//	$tgt.slideDown( speed, easing, function( ) { $tgt.addClass( c ) } );
			//	$tgt.animate( { opacity: 1 }, ( speed / 2 ) );

			}
		});


		$( '.child-page-link' ).on( 'click', function( event ) {
	  		
	  		var target_obj = $( this ).attr( 'rel' );
	  		$( '.child-page.active' ).removeClass( 'active' );
	  		$( target_obj  ).addClass( 'active' );

	  		$( '.child-page-link.active' ).removeClass( 'active' );
	  		$( this ).addClass( 'active' );

		});


		$( '.subsection-link' ).on( 'click', function( event ) {

	  		var target_obj = $( this ).attr( 'href' );

	  		$( '.subsection-content.active' ).removeClass( 'active' );
	  		$( target_obj ).addClass( 'active' );

	  		$( '.subsection-link.active' ).removeClass( 'active' );
	  		$( this ).addClass( 'active' );

		});

						

		/**
		 *	Setup data tables for ordering of table rows
		 */		
		if ( !!$('table.orderable').dataTable ) {
		
			$( 'table.orderable.upcoming-events' ).dataTable( {
		    	'iDisplayLength': 1000000,
		    	'aaSorting': [[ 0, 'asc' ]],
		    });

		    $( 'table.orderable.archive-events' ).dataTable( {
		    	'iDisplayLength': 1000000,
		    	'aaSorting': [[ 0, 'desc' ]],
		    });

		}
	    

		/**
		 *	Wrap video frames in container to ensure flexible resizing while maintaing the aspect ratio
		 */
		// $( '.sidebar-column iframe').wrap('<div class="video-container-outer"><div class="video-container"></div></div>');
		$( '.featured-image-container iframe' ).wrap('<div class="video-container-outer"><div class="video-container"></div></div>');
		$( '.featured-video-container iframe' ).wrap('<div class="video-container-outer"><div class="video-container"></div></div>');
		$( '.entry-aside iframe' ).wrap('<div class="video-container-outer"><div class="video-container"></div></div>');
		$( '#why-deerfield iframe' ).wrap('<div class="video-container-outer"><div class="video-container"></div></div>');
		

		$('.dropdown-menu').bind('change', function () {
          var url = $(this).val();
          if (url) {
              window.location = url;
          }
          return false;
      });

	});
} )( jQuery );