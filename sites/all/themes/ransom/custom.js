(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.ransom = {
		attach: function(context, settings) { 
			$( ".header-mobile" ).append('<div class="title"><h2>Menu</h2></div>');
		}
	}

})(jQuery, Drupal, this, this.document);
