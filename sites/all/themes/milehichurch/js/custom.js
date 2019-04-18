(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.bmm = {
		attach: function(context, settings) { 

// if($('.subnav-mobile-mask li a:last').hasClass('active'))
// {
// 	$('.subnav-mobile-mask').css('margin','0px');
// }

if ($(window).width() <= 999) {  

    if($('#pgc-banner').text().length == 0)
		{
			$('.subnav-mobile-mask').css('margin','0px');
		}

       }     


	}
}

})(jQuery, Drupal, this, this.document);