
/* On Document Ready
********************************************/
jQuery(function($){ 
	
	/* Initialize mobile menu
	********************************************/
	jQuery('#off-canvas').offcanvas({
		modifiers: 'right'
	});

	//Mobile Nav Accordion
	jQuery('#off-canvas #ContentMobNav18').navAccordion({
		expandButtonText: '<i class="fas fa-chevron-down"></i><span class="sr-only">Expand</span>',  //Text inside of Expand button - this can be a Font Awesome Icon
		collapseButtonText: '<i class="fas fa-chevron-up"></i><span class="sr-only">Collapse</span>'  //Text inside of Collapse button - this can be a Font Awesome Icon
	});

	//Secondary Nav Accordion
	jQuery('.interior #ContentLeftNav18').navAccordion({
		expandButtonText: '<i class="fas fa-chevron-down"></i><span class="sr-only">Expand</span>',  //Text inside of Expand button - this can be a Font Awesome Icon
		collapseButtonText: '<i class="fas fa-chevron-up"></i><span class="sr-only">Collapse</span>'  //Text inside of Collapse button - this can be a Font Awesome Icon
	});
	
	/* Dropdown Nav
	********************************************/
	jQuery('.desktopNav li').on( 'mouseenter', function(e){
		jQuery(this).addClass('sfHover');
	});
	jQuery('.desktopNav li').on( 'mouseleave', function(e){
		jQuery(this).removeClass('sfHover');
	});

	// fix to trigger dropdown menus on focus, not just on hover
    jQuery('.desktopNav li').focusin(function(e) {
        jQuery(this).addClass('sfHover');
    });
    jQuery('.desktopNav li').focusout(function(e) {
        jQuery(this).removeClass('sfHover');
    });
		//Touch
		jQuery('.support-touchevents .desktopNavInner > ul > li:has(ul) > a').on('click', function(e){
			if(!jQuery(this).hasClass('open')){
				e.preventDefault();
				jQuery('.desktopNav .open').removeClass('open');
				jQuery(this).addClass('open');
			}
		});
		if(jQuery('html').hasClass('touch')) {
			jQuery(document).on('click', function(e){
				if (!jQuery(e.target).hasClass('open')) {
					jQuery('.desktopNav .open').removeClass('open');
				}
			});
		}
	
	// site search toggle
	jQuery(".siteSearchToggle a").wrap('<div role="search"></div>');
	jQuery(".siteSearchToggle a").on('click',function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('open')) {
		  jQuery(this).removeClass('open');
		  jQuery(".searchWrap").removeClass('open');
		  jQuery(".searchWrap").attr('aria-hidden','true');
		} else {
		  jQuery(this).addClass('open');
		  jQuery(".searchWrap").addClass('open');
		  jQuery(".searchWrap").attr('aria-hidden','false');
		}
		
	  });
	
	//Logged in
	if (jQuery("#CmsMasterMenu").length > 0){
		jQuery('html').addClass('loggedin');
	}
	
	//Remove Empty space from subtitle
	jQuery ('.PageSubTitleHeader').each(function() {
		if(jQuery(this).text().trim().replace(/\&nbsp\;/g, '').length === 0) {
			jQuery(this).parent().css('display', 'none');
			jQuery(this).parent().next('br').css('display', 'none');
		}
	});
	
	//Fix background images if messed up by Chrome
	jQuery('div[style*="background-image"].thumb').each(function(){
		var style = jQuery(this).attr('style');
		style = style.replace(/(\s)/g, '').replace(/(background-image:url\('?"?)(http:\/\/[^\)]*?\/\/)/g, '$1/');
		jQuery(this).attr('style', style);
	});

	console.log('site search toggle next');
	// site search toggle
	jQuery(".siteSearchToggle a").on('click',function(e) {
		console.log('site search toggle click');
		//e.preventDefault();
		if(jQuery(this).hasClass('showSearch')) {
		  console.log('close search');
		  jQuery(this).removeClass('showSearch');
		  jQuery(".searchWrap").hide();
		  jQuery(".searchWrap").attr('aria-hidden','true');
		  jQuery(this).attr('aria-expanded','false');
		} else {
		  console.log('open search');
		  jQuery(this).addClass('showSearch');
		  jQuery(".searchWrap").show();
		  jQuery(".searchWrap").attr('aria-hidden','false');
		  jQuery(this).attr('aria-expanded','true');
		  jQuery("#ContentSearch input").focus();
		}
		return false;
		
	  });
	
	//Search Accessibility
	jQuery('img[id$="_imgbtnSearch"]').attr({'role' : 'button', 'tabindex' : '0'});
	jQuery(".siteSearchToggle a").attr('role','button');
	jQuery(".siteSearchToggle a").attr('aria-haspopup','true');
	jQuery(".siteSearchToggle a").attr('aria-expanded','false');
	//Search Placeholder
	jQuery('.search input[type="text"], .mobileSearch input[type="text"]').attr('placeholder', 'Search');	

	jQuery(document).keyup(function(e) {
		if (jQuery("#ContentSearch input").is(":focus")) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				jQuery(".siteSearchToggle a").removeClass('showSearch');
				jQuery(".searchWrap").hide();
				jQuery(".searchWrap").attr('aria-hidden','true');
				jQuery(".siteSearchToggle a").attr('aria-expanded','false');
				jQuery(".siteSearchToggle a").focus();
		   }
		}
	});	

	


	//wrap all news articles in a wrapper
	jQuery('.newsItem').newsItemSlice({
		containerWrapper: '<div class="newsWrap"></div>'	
	});

	//wrap all events in a wrapper
	jQuery('.eventItem').newsItemSlice({
		containerWrapper: '<div class="eventsWrap"></div>'	
	});

	//init interior slick slider - square images
	jQuery('.slickItem-square').newsItemSlice({
		containerWrapper: '<div class="slickWrap slickSquareWrap"></div>'	
	});
	jQuery('.slickSquareWrap').slick({
		dots: false,
		infinite: false,
		speed: 300,
		prevArrow:'<button type="button" class="slick-arrow slick-prev" aria-label="View Previous Item"><i class="fas fa-chevron-left"></i></button>',
		nextArrow:'<button type="button" class="slick-arrow slick-next" aria-label="View Next Item"><i class="fas fa-chevron-right"></i></button>',
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 699,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
			
		}]
	});
	
	//init interior slick slider - circle images
	jQuery('.slickItem-circle').newsItemSlice({
		containerWrapper: '<div class="slickWrap slickCircleWrap"></div>'	
	});
	jQuery('.slickCircleWrap').slick({
		dots: false,
		infinite: false,
		speed: 300,
		prevArrow:'<button type="button" class="slick-arrow slick-prev" aria-label="View Previous Item"><i class="fas fa-chevron-left"></i></button>',
		nextArrow:'<button type="button" class="slick-arrow slick-next" aria-label="View Next Item"><i class="fas fa-chevron-right"></i></button>',
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
			breakpoint: 699,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
			
		}]
	});
});



/* Global Functions
********************************************/

	/*  News Item Slicer
	 *
	 *  USAGE EXAMPLE:
	 *  jQuery('.bx_slide').newsItemSlice({
	 *  	containerWrapper: '<div class="bx_slider"></div>'
	 *  	//rowWrapper: '<div class="row"></div>'
	 *  	//countPerRow: 3	
	 *  });
	 */
	(function($) { $.fn.newsItemSlice = function(options){ var items = $(this), selector = items.selector, containerWrapper = options.containerWrapper, rowWrapper = options.rowWrapper, countPerRow = options.countPerRow; for(var i=0; i < items.length;) { var wrap = items.eq(i).nextUntil(':not(' + selector + ')').addBack().wrapAll(containerWrapper); i += wrap.length; if (countPerRow !== undefined) { for(var b = 0; b < wrap.length; b+=countPerRow) { wrap.slice(b, b+countPerRow).wrapAll(rowWrapper); } } } }; }(jQuery));
	
	
	/*  Remove Table Function
	 *
	 *  USAGE EXAMPLE: 
	 *  removeTable('.className')
	 */
	function removeTable(element){
		jQuery(element).closest('table')
			.find('td > div').unwrap().unwrap().unwrap().unwrap();
	}



/* Smooth Scrolling - CSS Tricks 
http://css-tricks.com/snippets/jquery/smooth-scrolling/
********************************************/
jQuery(function() {
  jQuery('a[href*=#]:not([href=#]):not([class="tabLink"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html,body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });
});

// Spli Footer Columns
jQuery(function($) {
    var num_cols = 2,
    container = jQuery('footer .split-list'),
    listItem = 'li',
    listClass = 'sub-list';
    container.each(function() {
        var items_per_col = [];
        var items = jQuery(this).find(listItem);
        var min_items_per_col = Math.floor(items.length / num_cols);
        var difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
            if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
            } else {
                items_per_col[i] = min_items_per_col;
            }
        }
        for (var a = 0; a < num_cols; a++) {
            jQuery(this).append(jQuery('<div class="col-xs-6" ></div>').addClass(listClass));
            for (var j = 0; j < items_per_col[a]; j++) {
                var pointer = 0;
                for (var k = 0; k < a; k++) {
                    pointer += items_per_col[k];
                }
                $(this).find('.' + listClass).last().append(items[j + pointer]);
            }
        }
    });
});