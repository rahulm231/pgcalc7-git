// toggle shortcode
	
	jQuery('.toggle-view li').click(function () {
		var text = jQuery(this).children('div.panel');
		if (text.is(':hidden')) {
			text.slideDown('200');	
		} else {
			text.slideUp('200');	
		}
	});
		
// tab shortcode
 	jQuery('.myTab a').click(function (e) {
		e.preventDefault();
	 	jQuery(this).tab('show');
	});




