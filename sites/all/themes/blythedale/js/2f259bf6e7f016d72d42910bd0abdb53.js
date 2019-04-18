(function($) {

  Drupal.behaviors.ohoAlert = {
    attach: function(context, settings) {

      $('#alert-wrapper').once('ohoAlert', function() {
        $.get('/js/oho-alert/get-message', function(message) {
          if (message) {
            $('body').addClass('has-alert');
          }
          $('#alert-wrapper').html(message);
        });
      });

    }
  };

})(jQuery);
;
