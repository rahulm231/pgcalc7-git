(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.pgc_slides = {
		attach: function(context, settings) { 
			
		  var sInterval = settings.slideshow_interval;
		  $(".rslides").responsiveSlides({
	        timeout: sInterval,
	      });
		   
		  if($(".rslides").length > 0){
		    $('#block-pgc-misc-blocks-mobilenav').css('z-index', 2);
		   	$('#block-pgc-misc-blocks-mobilenav').css('top', -76);
		  }
		   
	    }
	}

})(jQuery, Drupal, this, this.document);

