(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.sidwell = {
		attach: function(context, settings) { 
			
			$('.pg-how-gift-helps').addClass('accordion-item')
			$(".pg-how-gift-helps").appendTo(".pg-gift-details .accordion-items");
		}
	}

})(jQuery, Drupal, this, this.document);
