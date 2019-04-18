(function ($) {
  Drupal.behaviors.BmcGoogleSearch = {
    attach: function (context, settings) {
      (function() {
        // TODO: change this from the test instance to the actual BMC instance.
        var cx = '006817779651444157333:aajvf38w1uq';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();
    }
  }
}(jQuery));
;
