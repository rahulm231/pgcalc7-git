(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.bentley = {
		attach: function(context, settings) { 
			
			$(".block-pgc-contact-block h2").css("cursor","pointer");			
			$(".block-pgc-contact-block h2").click(function(){
			  window.location = "contact-us";
		    });
		}
	}

})(jQuery, Drupal, this, this.document);