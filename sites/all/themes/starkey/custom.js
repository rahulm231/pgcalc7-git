(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
		  if ($(window).width() > 998) {
			var minHeight = parseInt($('.pg-content-inline-blocks').height()) + parseInt(10);
			minHeight = minHeight+"px";		  
			$('.pg-content-body #block-system-main div.node > .content').css('min-height', minHeight);
		  }
		}
	}

})(jQuery, Drupal, this, this.document);