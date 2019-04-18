(function ($){
  $(document).ready(function() {
    "use strict";
    
    $(".main-nav li a").each(function(){
      if($(this).attr('href')!==undefined){      	
        var url = "https://www.fandm.edu"+$(this).attr('href');	
        $(this).attr('href',url);
      }
    });	


    if ($(window).width() < 999) {
      $('.pg-content-inline-blocks').insertBefore('.pg-content-footer');
    }
    
	/*
    $('<div class="mobile-menu-header"><div class="mobile-menu-trigger fm-icon-custom-hamburger"></div></div>').appendTo('#pgc-banner');
    $('#block-system-main-menu').clone().removeAttr('id').appendTo('#block-pgc-slideshow-block-pgc-slideshow-block .content');

    function widthCheck() {
      var mobileMenuTrigger = $('.mobile-menu-trigger');
      var mobileMenuHeader = $('.mobile-menu-header');
      var blockMenu = $("#block-pgc-slideshow-block-pgc-slideshow-block .block-menu");

      if ($(window).width() < 960) {
        mobileMenuHeader.show();
        mobileMenuTrigger.unbind().click(function(){
          blockMenu.stop(true,true).animate({height: 'toggle'}, 500);
          mobileMenuTrigger.toggleClass('fm-icon-custom-hamburger').toggleClass('fm-icon-custom-x');
        });
      }
      else {
        mobileMenuHeader.hide();
        blockMenu.removeAttr('style');
        mobileMenuTrigger.unbind();
        mobileMenuTrigger.addClass('fm-icon-custom-hamburger').removeClass('fm-icon-custom-x');
      }
    }

    widthCheck();
    $(window).resize(widthCheck);*/
  });
  
  
 
 
}(jQuery));