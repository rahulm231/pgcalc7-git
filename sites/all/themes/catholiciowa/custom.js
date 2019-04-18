(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.pgcalc_custom_filters = {
		attach: function(context, settings) { 
			  
	        $("li.ssi-facebook a").hover(
			  function() {
			    $(this).find("img.facebook-white").hide();
			    $(this).find("img.facebook-purple").show();
			  }, function() {
			    $(this).find("img.facebook-white").show();
			    $(this).find("img.facebook-purple").hide();
			  }
			);
			
			$("li.ssi-twitter a").hover(
			  function() {
			    $(this).find("img.twitter-white").hide();
			    $(this).find("img.twitter-purple").show();
			  }, function() {
			    $(this).find("img.twitter-white").show();
			    $(this).find("img.twitter-purple").hide();
			  }
			);
		      
		}
	}

})(jQuery, Drupal, this, this.document);

