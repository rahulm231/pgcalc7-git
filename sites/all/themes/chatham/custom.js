(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.chatham = {
		attach: function(context, settings) { 
			$('#block-system-main-menu > div.content > ul.nav > li.expanded > a').after('<span class="plus">+</span>');
			
			$('#block-system-main-menu > div.content > ul.nav > li.expanded > span').click(function(){
			  $(this).closest('li.expanded').find('ul').slideToggle();	
			});
		}
	}

})(jQuery, Drupal, this, this.document);

