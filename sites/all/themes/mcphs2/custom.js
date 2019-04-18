(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.apps = {
		attach: function(context, settings) {	

			$('div.pgc-share').remove();
			$('.pgc-print a').attr('aria-label', 'Print');
			$('.pgc-email a').attr('aria-label', 'Email');
			$('.pgc-share a').attr('aria-label', 'Share');
			$('.icon-print').attr('aria-hidden','true');
			$('.icon-email').attr('aria-hidden','true');
			$('.icon-share').attr('aria-hidden','true');
			/*$('#main-menu li a').attr('aria-hidden','true');*/
			$('#pgc-contact-block a span').attr('aria-hidden','true');
			$('#pgc-contact-footer-block a span').attr('aria-hidden','true');
			$('#pgc_resource_block a span').attr('aria-hidden','true');
			$('.accordion-switch a span').attr('aria-hidden','true');
			$('#pgc-contact-block a').removeAttr('title');
			$('#pgc-contact-footer-block a').removeAttr('title');
			$('#block-system-main-menu').attr('role','navigation');
			$('#block-system-main-menu').attr('aria-label','Secondary');
			$('#block-pgc-misc-blocks-mobilenav').attr('role','navigation');
			$('#block-pgc-misc-blocks-mobilenav').attr('aria-label','Secondary');
			$(".header-mobile .control").attr('tabindex','0');
			$(".pgc-font-size .increase").attr('aria-label','Increase text size');
			$(".pgc-font-size .decrease").attr('aria-label','Decrease text size');
			
		} // Attach ends
	} // Drupal Behavior Ends   	  
})(jQuery, Drupal, this, this.document);