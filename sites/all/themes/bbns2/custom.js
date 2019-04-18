(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.bbns = {
		attach: function(context, settings) { 

			//$( window ).load(function() {
			if($(window).width() < 999)
				{
				  $('#pgc-container').addClass('gift');
				} 

			}	
		}
	})(jQuery, Drupal, this, this.document);
