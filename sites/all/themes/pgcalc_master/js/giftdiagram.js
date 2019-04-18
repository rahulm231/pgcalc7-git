(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.giftdiagram = {
		attach: function(context, settings) {	
			if($(window).width() < 415){
			  if($('#pgc-container .notify-mobile').length===0){
			    $( "#pgc-container" ).prepend( "<div class='notify-mobile' style='color: gray;font-style: italic;'>Please rotate your phone or tablet to use this calculator.</div>" );	
			  }
			  
			}
			
			$(window).resize(function() {
			  if($(window).width() > 414){
			    $("#pgc-container .notify-mobile").remove();
			  }else{
			    if($('#pgc-container .notify-mobile').length===0){
			      $( "#pgc-container" ).prepend( "<div class='notify-mobile' style='color: gray;font-style: italic;'>Please rotate your phone or tablet to use this calculator.</div>" );	
			    }	
			  }
			});
		}
	}
})(jQuery, Drupal, this, this.document);