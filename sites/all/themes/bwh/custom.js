(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.bwh_custom = {
		attach: function(context, settings) { 
			if( $('#block-pgc-slideshow-block-pgc-slideshow-block').length ){
			    $('#block-pgc-slideshow-block-pgc-slideshow-block #pgc-banner img').after($('#block-pgc-misc-blocks-mobilenav'));
			}
			
			if(window.location.pathname!=='/'){
			  if ($("#main-menu .active-trail")[0]){
		        $(".region-menu  h2.title a").css({"background": "#f4f4f4", "color": "#0054a3"});
		      }
		    }		
		    
		    $('#edit-submitted-unlock-my-matching-funds-now-1').click(function(){
		      $('#webform-component-unlock-funds').toggle();
		    }); 
		    
		    if( $('.submission-message').length ){
			    $('.submission-message').append($('.pg-wrap .messages'));
			}   
		}
	}

})(jQuery, Drupal, this, this.document);