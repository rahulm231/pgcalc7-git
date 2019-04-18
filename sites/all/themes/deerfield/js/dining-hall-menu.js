jQuery(document).ready(function($) {
	
	$(document).on( 'click', '.dh-link', function(e) {
		e.preventDefault();
		$target = $( '#' + $(this).data('target') );
		$('.active-dh-link').removeClass('active-dh-link');
		$(this).addClass('active-dh-link');

		$( '.active-dh-menu-container').fadeOut( 'fast', function(){
			$( '.active-dh-menu-container').removeClass( 'active-dh-menu-container' );
			$target.fadeIn( 'fast', function(){
				$target.addClass( 'active-dh-menu-container' );
				dh_meal_switcher( $('.active-dh-menu-container .dh-meal-name').first() );
			});
		});

	});

	$(document).on( 'click', '.dh-meal-name', function(e) {
		e.preventDefault();
		dh_meal_switcher( $(this) );
	});

	function dh_meal_switcher( $obj ) {
		$('.dh-meal-name').removeClass( 'active-dh-meal-link');
		$obj.addClass( 'active-dh-meal-link');
		
		$target = $( '#' + $obj.data('target') );

		$( '.active-dh-meal-container' ).fadeOut( 'fast', function(){
			$( '.dh-meal-container' ).removeClass( 'active-dh-meal-container' );
			$target.fadeIn( 'fast', function(){
				$target.addClass( 'active-dh-meal-container' );
			});
		});
	}

});