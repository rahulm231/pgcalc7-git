(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.brynmawr_custom = {
		attach: function(context, settings) { 
		  var origin = window.location.origin+"/";
		  if(window.location.origin == window.location.href || origin == window.location.href){
		  }else{
		  	$('#block-system-main-menu h2 a').attr('style', 'background:none !important');
		  }
		}
	}

})(jQuery, Drupal, this, this.document);