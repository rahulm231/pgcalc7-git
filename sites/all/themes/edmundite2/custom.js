(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			// Menu toggle
	       $('.header-mobile-open-icon').click(funciton(){
	         $('.page > .header-mobile').toggleClass('header-mobile-open');
	       });

})(jQuery, Drupal, this, this.document);