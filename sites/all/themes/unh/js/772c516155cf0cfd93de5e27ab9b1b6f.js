/**
 * Make sure that flexslider z-index is correct.
 */
(function($) {
  Drupal.behaviors.unh_flexslider_accessibility = {
      
    // Make all links within hidden slides untabbable.
    attach: function(context,settings) {
      $('.flexslider').bind('start', function(e,slider) {
        // Add href to nav controls.  
        $('.flexslider .flex-control-nav a, .flexslider .flex-control-paging a, .flexslider .flex-pauseplay a').attr('href','#');
        slider.slides.eq(slider.currentSlide).siblings().find('a').attr('tabindex', '-1');
      });
      $('.flexslider').bind('after', function(e,slider) {
        slider.slides.eq(slider.currentSlide).find('a').removeAttr('tabindex');
        slider.slides.eq(slider.currentSlide).siblings().find('a').attr('tabindex', '-1');
      });
    }
  }

}(jQuery));;
