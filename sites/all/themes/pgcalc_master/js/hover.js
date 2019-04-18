(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.pgchover = {
		attach: function(context, settings) {	
		  $('.pgc-hover-boxgrid.pgc-hover-caption').hover(function(){
			$(".pgc-hover-cover", this).stop().animate({top:'0px',height: '100%'},{queue:false,duration:160});
		  }, function() {
			$(".pgc-hover-cover", this).stop().animate({top:'70%',height: '100%'},{queue:false,duration:160});
		  });			
		}
	}
})(jQuery, Drupal, this, this.document);