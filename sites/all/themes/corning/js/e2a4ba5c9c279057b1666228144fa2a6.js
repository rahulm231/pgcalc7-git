/**
 * @file
 * Attach javascript handlers to livestream controls.
 */

(function ($) {
  Drupal.behaviors.livestream = {
    attach: function (context, settings) {
      $('.livestream-callout-close').click(function (e) {
        e.preventDefault();
        $('.pane-livestream-callout').hide(400, function(){
          // Remove the iframe when it's done to stop video from playing in background.
          $('.pane-livestream-callout iframe').remove();
        });
      });
    }
  };
}(jQuery));
;
