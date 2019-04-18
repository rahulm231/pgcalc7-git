(function ($) { $(document).ready(function() {
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
      });

})})(jQuery);
