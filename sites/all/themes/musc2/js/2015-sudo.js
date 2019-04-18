(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


jQuery(function($) {
	
  <!--- stop the slider script from running if this is a banner rather than a slider --->
  if ($('#slider .banner').length == 0) {
  
    var sliderExists = false,
        sliderMoves = [
          {
            min:960,
            max:9999,
            enter: function() {		
            if (!sliderExists) {
              sudoSlider = $("#slider").sudoSlider({
                responsive: true,
                continuous:true,
                pause: '8000',
                prevNext:true,
                prevhtml: "<a href='#' class='prev'><img src='/sites/all/themes/musc2/img/prev.png' /></a>",
                nexthtml: "<a href='#' class='next'><img src='/sites/all/themes/musc2/img/next.png' /></a>",
                effect:'slide',
                speed:'800',
                numeric:true,
                auto:true,
								updateBefore: true,
                initCallback: function(){
                  var totalWidth = 0,
                      controlL = $('#slider_container #controls a.prev').outerWidth(),
                      controlR = $('#slider_container #controls a.next').outerWidth();
                    
                  $('#slider_container #controls ol li').each(function(index) {
                      totalWidth += parseInt($(this).width(), 10);
                  });
                
                  var	controlW = totalWidth + controlL + controlR;
                  
                  $('#slider_container #controls .controls').css({'width': totalWidth});
                  $('#slider_container #controls').css({'width': controlW + 40});
                
                  var ih = $('#slider li .desc').eq(0).outerHeight();
                  var ch = $('#controls').outerHeight();
                  $('#slider_container #controls').css({'top':ih - ch});
                }
              });
              
              $('#slider li > img').on('load',function() {
                $(window).trigger('resize');
              });
                  
              var sliderExists = true;
            }
            else { sudoSlider.init() }
          },
          exit: function() { sudoSlider.destroy() }
        }
      ];
    
    breakdance(sliderMoves);	
  }
});