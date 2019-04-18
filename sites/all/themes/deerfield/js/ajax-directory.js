jQuery(document).ready(function($) {
	
	
	$(document).on( 'click', '.department-load-link', function(e) {

		e.preventDefault();
		var title 	= $(this).data('title');
		var url 	= $(this).attr('href');
		var request_data = {
			action: 'load_department',
			query: $(this).data('query'),
			nonce: uf_ajax.nonce
		};

		if ( $(this).hasClass( 'embed-content-link' ) ) {
			var $eventHandler = $(this);
		} else {
			// if a department is clicked
			if ( typeof $(this).data('query').department != 'undefined' ) {
				var $eventHandler = $( '#' + $(this).data('query').department + '-embed-menu-link');
			} else if ( typeof $(this).data('query').author_name != 'undefined' ) {
				var $eventHandler = $( '#staff-embed-menu-link');
			} else {
				var $eventHandler = $(this);
			}
		}
		
		//author_name
		
		
		var $loadingSprite = $eventHandler.find( '.loading-sprite' );
		

		$('.embed-content-link').removeClass('active');
		// turn on loading sprite
		$eventHandler.addClass('loading');
		$eventHandler.addClass('active');

		var angle = 0;
		var rotateSprite = setInterval( function(){
		    angle += 10;
		    $loadingSprite.rotate( angle );
		},25);
		$loadingSprite.fadeIn('50');

		// fade out content
		$('.department-load-target').fadeOut("fast");
		$.when(
			
			// load content
			$.post( uf_ajax.url, request_data, function( response ) {
				$('.department-load-target').html( response );
			})
		
		).then( function(){
			
			// fade content in
			// window.history.pushState( "data", title, url );
			
			$('html, body').animate({scrollTop : 0},500);

			$('.department-load-target').fadeIn("fast", function(){
				
				// turn off loading sprite
				$eventHandler.removeClass('loading');	
				$loadingSprite.fadeOut('50', function(){
					clearInterval(rotateSprite);
				});	

			} );


		});

	});


	$(document).on( 'click', '.department-body-load-link', function(e) {
		
		e.preventDefault();
		
		var title = $(this).data('title');
		var url = $(this).attr('href');
		var request_data = {
			action: 'load_department_body',
			query: $(this).data('query'),
			nonce: uf_ajax.nonce
		};
		var $loadingSprite = $('.department-body-loading-sprite');
		var angle = 0;
		var rotateSprite = setInterval( function(){
		    angle += 10;
		    $loadingSprite.rotate( angle );
		},25);
		$loadingSprite.fadeIn('50');
		

		$.when(
			$.post( uf_ajax.url, request_data, function( response ) {
				$('.department-body-load-target').html( response );
			})
		).then( function(){
			// window.history.pushState( "data", title, url );
			$('.department-body-load-target').fadeIn("fast", function(){
				$('.department-body-loading-sprite').fadeOut("fast");
				$loadingSprite.fadeOut('50', function(){
					clearInterval(rotateSprite);
					
				});
			});
		});

	});

});