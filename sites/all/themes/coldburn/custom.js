(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.coldburn_custom = {
		attach: function(context, settings) { 
			var tabwrap = $('#tabs-wrapper').children().length;
			var slideshow = $('#block-pgc-slideshow-block-pgc-slideshow-block').length;
			if(tabwrap == 0 && slideshow == 0){
			    $('.pg-content-inline-blocks').css('margin-top',"15px");
			}
		}
	}

})(jQuery, Drupal, this, this.document);