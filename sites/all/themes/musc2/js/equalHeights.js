(function($) {
	$(function() {
		/* sets height of el to auto */	
		var resetHeight = function(els) { $(els).css('height','auto') };	
		
		/* finds tallest element passed to function and sets all elements passed to that height */
		var equalHeights = function(cols) {
			var tallest = 0;
			resetHeight(cols);
			
			$(cols).each(function(idx,itm) {
				tallest = Math.max($(itm).outerHeight(true),tallest);
			});
			
			$(cols).each(function(idx,itm) {
				var padT = parseInt($(itm).css('padding-top').replace("px","").replace("%","")),
						padB = parseInt($(itm).css('padding-bottom').replace("px","").replace("%","")),
						margT = parseInt($(itm).css('margin-top').replace("px","").replace("%","")),
						margB = parseInt($(itm).css('margin-bottom').replace("px","").replace("%","")),
						bordT = parseInt($(itm).css('border-top-width').replace("px","").replace("%","")),
						bordB = parseInt($(itm).css('border-bottom-width').replace("px","").replace("%",""));
				if (isNaN(margT)) { margT = 0 }
				if (isNaN(margB)) { margB = 0 }
				if (isNaN(padT)) { padT = 0 }
				if (isNaN(padB)) { padB = 0 }
				if (isNaN(bordT)) { bordT = 0 }
				if (isNaN(bordB)) { bordB = 0 }			
							
				var extra = padT + padB + margT + margB + bordT + bordB;
				$(itm).css('height',tallest-extra);
			});
		};
							
		var	blueboxRow = $('#blue_boxes.row'),
			  navitems = $('#main_nav .top_nav > ul'),
				equalHeightsMoves = [
					{
						min:680,
						max:1023,
						enter: function() {
							$('#main_nav').css('visibility','hidden');
									equalHeights(navitems);
									var navHeight = $(navitems).outerHeight();
									$('#main_nav').css('height',navHeight);
									$('#main_nav').css({'visibility':'visible'},{'display':'block'});
						},
						exit: function() {
									resetHeight(navitems);
									$('#main_nav').css('height','72px');
						}
					},
					{
						min:680,
						max:9999,
						enter: function() {
              var resizeBox = function() {
                blueboxRow.each(function(idx,itm) {
                  equalHeights($(itm).children('div.block')) 
                });
              }
              resizeBox();
              $(window).on("resize", function() { resizeBox() });
						},
						exit: function() {
						  $(window).off("resize", function() { resizeBox() });
						}
					},
					{
						min:1024,
						max:9999,
						enter: function() {
							var MenuCols = function() { 
                $('#main_nav .content').each(function(idx,itm) {
									equalHeights($(itm).children('.box'));
								});
							}
							MenuCols();
							$(window).on("resize", function() { MenuCols() });							
						},
						exit: function() {}
					}
				];
		
		breakdance(equalHeightsMoves);
	});
})(jQuery);