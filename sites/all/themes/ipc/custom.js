(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.ipc = {
		attach: function(context, settings) { 
			$('.search-trigger .fa-search').click(function(){
			  $('body').toggleClass("search-is-visible");
			});
			
			$('.mobile-trigger .fa-bars').click(function(){
			  $('body').toggleClass("mobile-is-visible");
			});
			
			$( window ).resize(function() {
			  if ($(window).width() > 1024) {			  
			    $('body').removeClass("desktop-nav-is-too-wide");
			  }else{
			    $('body').addClass("desktop-nav-is-too-wide");	
			  }
			});
			
			if ($(window).width() > 1024) {			  
			  $('body').removeClass("desktop-nav-is-too-wide");
			}else{
			  $('body').addClass("desktop-nav-is-too-wide");	
			}
		}
	}
})(jQuery, Drupal, this, this.document);