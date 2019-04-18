jQuery(document).ready(function($) {
	$('.stl-popup').magnificPopup({
		type:'inline',
		preloader:false
	});
	
	// Accordions - Hide all, show on section
	$('div.stl-accordion div.stl-section').hide();
	$('div.stl-accordion div.stl-section').eq(0).slideToggle();
	$('div.stl-accordion h3.stl-toggle').eq(0).addClass('stl-open');
	$('div.stl-accordion .stl-toggle').click(function () {
		if( $(this).next().is(':visible') ) {
			$(this).next('div.stl-section').slideToggle();
			$(this).toggleClass('stl-open');
		} else {
			$('div.stl-accordion div.stl-section').hide()
			$('div.stl-accordion .stl-toggle').removeClass('stl-open')
			$(this).next('div.stl-section').slideToggle();
			$(this).toggleClass('stl-open');
		}
	});
});