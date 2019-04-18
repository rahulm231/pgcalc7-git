(function ($) {
  Drupal.behaviors.giftTypes = {
    init: function() {
      // Gift details accordion
      $('.pg-gift-details .accordion-items').css('display', 'none');
      $('.pg-gift-details .accordion-switch').unbind('click').click(function(){
        if($(this).hasClass('open')) {
          $(this).find('span').removeClass('icon-arrow-up').addClass('icon-arrow-down');
          $('.pg-gift-details .accordion-items').slideUp('slow');
          $(this).html($(this).html().replace('Hide', 'Show More'));
          $(this).removeClass('open');
        } else {
          $(this).find('span').removeClass('icon-arrow-down').addClass('icon-arrow-up');
          $('.pg-gift-details .accordion-items').slideDown('slow');
          $(this).html($(this).html().replace('Show More', 'Hide'));
          $(this).addClass('open');
        }
      })
    }
  }
}(jQuery));
// There's a problem with our jQuery loading before the ingested site's
// jQuery which is causing jQuery plugins to break (the "once" plugin in this case).
// I'm using this workaround for now
jQuery(function() {
  Drupal.behaviors.giftTypes.init();
});
