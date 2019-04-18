(function ($) {
  Drupal.behaviors.titlebar = {
    init: function(context, settings) {
      // Using percentage font size to easily increase/decrease page font size
      var baseFontSize = 100;
      $('.pgc-font-size a').click(function() {
        if($(this).hasClass('increase')) {
          if(baseFontSize < 150)
            baseFontSize += 20;
            // #PGCS-984 - Starts here
            // $('.pg-content-body p').css('font-size', baseFontSize+'%');
            $('.pg-content-body p').css('font-size', baseFontSize+'%');
            $('.pg-content-body ul li').css('font-size', baseFontSize+'%');
            // #PGCS-984 - Ends here
        } else {
          if(baseFontSize > 70)
            baseFontSize -= 10;
            // #PGCS-984 - Starts here
            // $('.pg-content-body p').css('font-size', baseFontSize+'%');
            $('.pg-content-body p').css('font-size', baseFontSize+'%');
            $('.pg-content-body ul li').css('font-size', baseFontSize+'%');
            // #PGCS-984 - Ends here
        }
      });

      // Print button
      /* replaced by code below as per PGCS-896
      $('.pgc-print a').click(function() {
        window.print();
      })
      */ 
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