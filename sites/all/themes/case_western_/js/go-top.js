// Go to top button for bitset templetes

jQuery(document).ready(function(){
	// show or hide sticy go to top button
	jQuery(window).scroll(function(){
		if(jQuery(this).scrollTop() > 200){
			jQuery('.go-top').fadeIn(300);
		} else {
			jQuery('.go-top').fadeOut(300);
		}
	});
	// animate go to button
	jQuery('.go-top').click(function(event){
		event.preventDefault();

		jQuery('html, body').animate({scrollTop: 0}, 500);
	})
});