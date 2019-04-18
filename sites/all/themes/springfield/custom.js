(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			$(".off-canvas-control button").click(function(){
			  $('.off-canvas-wrapper-inner').toggleClass('is-off-canvas-open');
			  $('.off-canvas-wrapper-inner').toggleClass('is-open-right');
		    });
		}
	}

})(jQuery, Drupal, this, this.document);
