(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.jfof_custom = {
		attach: function(context, settings) { 
		  if(Drupal.settings.basePath=='/'){
		  	$('#block-pgc-misc-blocks-mobilenav').removeAttr('style');
		  }
		  
		  
		  if ($(window).width() < 415) {
   		    $('.field-name-body p img').removeAttr('style');
		  }
		}
	}

})(jQuery, Drupal, this, this.document);

