(function ($) {
  Drupal.behaviors.titlebar = {
    init: function(context, settings) {
      // Using percentage font size to easily increase/decrease page font size
      var baseFontSize = 100;
      $('.pgc-font-size a').click(function() {
        if($(this).hasClass('increase')) {
          if(baseFontSize < 150)
            baseFontSize += 20;
          $('.pg-content-body p').css('font-size', baseFontSize+'%');
        } else {
          if(baseFontSize > 70)
            baseFontSize -= 10;
          $('.pg-content-body p').css('font-size', baseFontSize+'%');
        }
      });

      // Print button
      var href = window.location.href;			
	  if(href.indexOf("/pgc-print")!==-1){	  	
	  	window.print();
	  }     
    }
  };
}(jQuery));
// There's a problem with our jQuery loading before the ingested site's
// jQuery which is causing jQuery plugins to break (the "once" plugin in this case).
// I'm using this workaround for now
jQuery(function() {
  Drupal.behaviors.titlebar.init();
});