(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.georgetownvisi = {
		attach: function(context, settings) { 
			var imgsrc =  $('.header-image img').attr('src');
			if($('.header-image img').length > 0){
			  $('header .interior-hero img').attr('src',imgsrc);	
			  $('header .interior-hero').show();
			  $('header .site-info-container').show();	
			  $('.header-image').remove();	
			}
				
		}
	}

})(jQuery, Drupal, this, this.document);