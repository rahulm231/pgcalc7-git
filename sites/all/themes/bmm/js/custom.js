(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.bmm = {
		attach: function(context, settings) { 
		var home_path = window.location.pathname;

		 if(home_path == "/content/plan-your-legacy")
		 {
		
			$('.side-navigation ul li:first').addClass('active');
		 }
 
   $('.side-navigation ul li').each(function()
   { 
   		var K = jQuery('#page-title').text();
		if(K == $(this).text())
		{
			$(this).addClass('active');
		}
   }
     );

	}
}

})(jQuery, Drupal, this, this.document);

