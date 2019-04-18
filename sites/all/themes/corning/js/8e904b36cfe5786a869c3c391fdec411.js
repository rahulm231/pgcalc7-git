/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
*		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );;
(function ($) {
    $(function() {
        $('.webform-client-form #edit-submit').click(function(e) {
            if (!confirmClass()) {
                e.preventDefault();
            }
        });

        var confirmClass = function() {
            return confirm('Once this form is submitted you can not change the information provided.  Are you sure you want to continue?');
        }

		// Z-index fix for IE 7
		if(version = navigator.appVersion.match(/MSIE (\d).\d/)){
			if(parseInt(version[1]) == 7){
				var zIndexNumber = 1000;
				$('#site-menu div').each(function() {
					$(this).css('zIndex', zIndexNumber);
					zIndexNumber -= 10;
				});
			}
		}

        if($.colorbox){
    		$('.zoom-image').colorbox({
    			rel: 'gallery',
    			maxWidth: "80%",
    			maxHeight: "80%"
            });

            // easy colorbox video
            $('a.colorbox-video').colorbox({
                iframe: true,
                innerWidth: 640,
                innerHeight: 480,
                maxWidth: '100%',
                maxHeight: '100%'
            });
        }

		// remove colons from labels
		$('.field-label').each(function() {
			var label = $(this).text().replace(':', '');
			$(this).text(label);
		});

        // make links to flickr photos open in a new window
        $('.views-field-field-flickr-image a').attr('target', '_blank');

        // fix inline colorbox captions
        $('a.colorbox').each(function() {
            var title = $(this).find('img').attr('title');
            $(this).attr('title', title);
        });

        // Allow small res images to be used for simpler editing
        if (!!Drupal.settings['12ColumnTokens']) {
            $('.galleria img, .image-gallery img, .image-gallery-fixed img').each(function(i, el) {
                if (!!el.src.indexOf('files/styles/1_column/')) {
                    var src = el.src.replace('1_column/', '12_column/');
                    var path = el.src.split('public/').pop().split('?').shift();
                    var token = Drupal.settings['12ColumnTokens']['public://' + path];

                    src = src.split('?').shift() + '?itok=' + token;
                    el.src = src;
                }
            });
        }

        // Create image galleries
        $('.galleria, .image-gallery').galleria({
            autoplay: 5000,
            width: '100%',
            height: 400,
            transition: 'slide',
            imageCrop: true,
            imageTimeout: 180000
        });

        $('.image-gallery-fixed').galleria({
            autoplay: 5000,
            width: 460,
            height: 400,
            transition: 'slide',
            imageCrop: false,
            imageTimeout: 180000
        });

        $(document).bind('content_expand', function() {
            $('.image-gallery .galleria-container').width('100%');
            var galleria = Galleria.get(0);
            if(galleria) {
            	galleria.rescale();
            }

            imagesExpanded();
        });

        $(document).bind('content_collapse', function() {
            $('.image-gallery .galleria-container').width('100%');
            var galleria = Galleria.get(0);
            if(galleria) {
            	galleria.rescale();
            }

            imagesCollapsed();
        });

        if (window.ADAPT_STATE == 'collapsed') {
            imagesCollapsed();
        } else {
            imagesExpanded();
        }

        // Create TOC out of h2.heading
        var headings = $('.node-type-article h2.heading');
		generateTOC(headings, 'menu');

        $('.node-type-article li.toc-menu a').click(function(e) {
            e.preventDefault();
            $.scrollTo('h2.heading:eq(' + $(this).data('idx') + ')', 1000);
        });

        // Create TOC out of h2.toc
        var items = $('div.toc');

        generateTOC(items, 'list');

        $('li.toc-list a').click(function(e){
            e.preventDefault();
            $.scrollTo('div.toc:eq(' + $(this).data('idx') + ')', 1000);
        });

        $('a.toc-top').click(function(e) {
            e.preventDefault();
            $.scrollTo('#main', 1000);
        });

    });

	function generateTOC(items, type){
        if (items.length){
            // deal with multiple titles and build a toc menu
            var topLink = '<a href="#top" class="toc-top">Top</a>',
                menu = '',
                output = '',
                count = items.length,
                col = Math.ceil(count / 3),
                menu = [];

            items.each(function(idx){
                menu[idx] =
                    '<li class="toc-'+type+' toc-item">' +
                    '<a data-idx="' + idx + '" href="#toc-' + idx + '">' + $(this).text() + '</a>' +
                    '</li>';
                $(this).append(topLink);
            });

            if(menu.length){
                switch(type){
                    case 'menu':
                        output = '<ul class="toc-'+type+'">' + menu.join('') + '</ul>';
                        break;
                    case 'list':
                        // build out 3 columns
                        for(var j = 0; j < 3; j++){
                            output += '<ul class="toc-'+type+'">';
                            output += menu.slice( (j * col), ((j + 1) * col) ).join('');
                            output += '</ul>';
                        }
                        break;
                }

                $('.pane-node-content .pane-title-wrap, .pane-page-title .pane-title-wrap').after(output);
            }

            // Make sure all the uls get the same height
            $('ul.toc-list').css({ height: $('ul.toc-list').height() });

        }
	}

    function resizeResultImages(target, from, to) {
        $(target).each(function() {
            $(this).removeAttr('width');
            $(this).removeAttr('height');
            var resultImage = $(this).attr('src');
            resultImage = resultImage.replace(from, to);
            $(this).attr('src', resultImage);
        });
    }

    function resizeVideoResults(state) {
        if (state == 'expanded') {
            $('.view-press-images .grid-4, .view-press-images .grid-3, .view-videos .grid-4, .view-videos .grid-3').each(function() {
                $(this).addClass('grid-4');
                $(this).removeClass('grid-3');
            });
        } else if (state == 'collapsed') {
            $('.view-press-images .grid-3, .view-press-images .grid-4, .view-videos .grid-4, .view-videos .grid-3').each(function() {
                $(this).addClass('grid-3');
                $(this).removeClass('grid-4');
            });
        }
    }

    function imagesCollapsed() {
        resizeResultImages('.result-list-item .list-item-image img', '3_column_square', '2_column_square');
        resizeResultImages('.node-press-release .teaser-image img', '3_column_square', '2_column_square');
        resizeResultImages('.view-press-images img', '4_column_square', '3_column_square');
        resizeResultImages('.pane-node-field-press-images img', '2_column_square', '1_column_square');
        resizeVideoResults('collapsed');
    }

    function imagesExpanded() {
        resizeResultImages('.result-list-item .list-item-image img', '2_column_square', '3_column_square');
        resizeResultImages('.node-press-release .teaser-image img', '2_column_square', '3_column_square');
        resizeResultImages('.view-press-images img', '3_column_square', '4_column_square');
        resizeResultImages('.pane-node-field-press-images img', '1_column_square', '2_column_square');
        resizeVideoResults('expanded');
    }
})(jQuery);
;
// https://gist.github.com/1096291

;(function ($) {

$.fn.truncateLines = function(options) {
	options = $.extend($.fn.truncateLines.defaults, options);

	return this.each(function(index, container) {
		container = $(container);
		var containerLineHeight = Math.ceil(parseFloat(container.css('line-height')));
		var maxHeight = options.lines * containerLineHeight;
		var truncated = false;
		var truncatedText = $.trim(container.text());
		var overflowRatio = container.height() / maxHeight;
		if (overflowRatio > 2) {
			truncatedText = truncatedText.substr(0, parseInt(truncatedText.length / (overflowRatio - 1), 10) + 1); // slice string based on how much text is overflowing
			container.text(truncatedText);
			truncated = true;
		}
		var oldTruncatedText; // verify that the text has been truncated, otherwise you'll get an endless loop
		while (container.height() > maxHeight && oldTruncatedText != truncatedText) {
			oldTruncatedText = truncatedText;
			truncatedText = truncatedText.replace(/\s.[^\s]*\s?$/, ''); // remove last word
			container.text(truncatedText);
			truncated = true;
		}
		if (truncated) {
			truncatedText = options.ellipsis ? truncatedText + options.ellipsis : truncatedText;
			container.text(truncatedText);
			if (container.height() > maxHeight) {
				truncatedText = truncatedText.replace(/\s.[^\s]*\s?...$/, ''); // remove last word and ellipsis
				truncatedText = options.ellipsis ? truncatedText + options.ellipsis : truncatedText;
				container.text(truncatedText);
			}
		}
	});
};
$.fn.truncateLines.defaults = {
	lines: 8,
	ellipsis: '...'
};

})(jQuery);;
