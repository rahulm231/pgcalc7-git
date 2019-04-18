(function($, Drupal, window, document, undefined) {
	Drupal.behaviors.uusc = {
		attach : function(context, settings) {

			$(window).load(function() {
				// $('a').removeAttr('onClick');
				
				$(".block-pgc-slideshow-block").addClass("heading__media");
				
				if($(window).width()>998){
				  $(".block-pgc-slideshow-block").appendTo( ".heading--has-media" );
				  
				  if($(".block-pgc-slideshow-block").length===0){
				    $(".heading__intro .region-menu").prependTo( ".pg-content-inline-blocks" );
				    $(".pg-content-inline-blocks .region-menu").css("margin-bottom","20px");
				    $(".pg-wrap > .pg-content-body").css("min-height","530px");
				    $(".pg-wrap > .pg-content-body").css("width","62%");
				    $(".pg-wrap > .pg-content-body #pgc-app-container").css("display","inline-block");
				    $(".heading--has-media").hide();
				  }	
				}
				
			});

		} // Attach ends
	} // Drupal Behavior Ends
})(jQuery, Drupal, this, this.document); 