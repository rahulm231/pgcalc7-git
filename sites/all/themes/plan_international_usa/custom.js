(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.plan_usa = {
		attach: function(context, settings) { 
			$('ul.menucolumn li.bluesponsorship').hover(
			  function() {
			    $('.widemenu #menu-image').css( 'background-image','url("/sites/all/themes/plan_international_usa/img/menu-image-1.jpg")');
			    $('.widemenu #menu-image-mask').addClass( "bluesponsorship" );
			  }, function() {
			    $('.widemenu #menu-image').css( "background-image",'' );
			    $('.widemenu #menu-image-mask').removeClass( "bluesponsorship" );
			  }
			);
			
			$('ul.menucolumn li.lightorangegiftsofhope').hover(
			  function() {
			    $('.widemenu #menu-image').css( 'background-image','url("/sites/all/themes/plan_international_usa/img/menu-image-2.jpg")');
			    $('.widemenu #menu-image-mask').addClass( "lightorangegiftsofhope" );
			  }, function() {
			    $('.widemenu #menu-image').css( "background-image",'' );
			    $('.widemenu #menu-image-mask').removeClass( "lightorangegiftsofhope" );
			  }
			);
			
			$('ul.menucolumn li.pinkbecauseiamagirl').hover(
			  function() {
			    $('.widemenu #menu-image').css( 'background-image','url("/sites/all/themes/plan_international_usa/img/menu-image-3.jpg")');
			    $('.widemenu #menu-image-mask').addClass( "pinkbecauseiamagirl" );
			  }, function() {
			    $('.widemenu #menu-image').css( "background-image",'' );
			    $('.widemenu #menu-image-mask').removeClass( "pinkbecauseiamagirl" );
			  }
			);
			
			$('ul.menucolumn li.purpleadvocacyandyouth').hover(
			  function() {
			    $('.widemenu #menu-image').css( 'background-image','url("/sites/all/themes/plan_international_usa/img/menu-image-4.png")');
			    $('.widemenu #menu-image-mask').addClass( "purpleadvocacyandyouth" );
			  }, function() {
			    $('.widemenu #menu-image').css( "background-image",'' );
			    $('.widemenu #menu-image-mask').removeClass( "purpleadvocacyandyouth" );
			  }
			);
		}
	}

})(jQuery, Drupal, this, this.document);