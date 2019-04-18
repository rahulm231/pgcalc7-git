(function ($) { $(document).ready(function() {
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

})})(jQuery);