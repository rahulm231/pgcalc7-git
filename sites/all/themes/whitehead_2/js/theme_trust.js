var $j = jQuery.noConflict();
windowHeight = $j(window).height(),
    adminOffset = $j('body').hasClass('admin-bar') ? 32 : 0,
    navOffset = $j('.logo').outerHeight(),
    bannerType = $j('.top-banner').attr('id'),
    scroll = $j(window).scrollTop(),
    navHeight = $j("#main-nav").height(),
    finalOffset = navOffset + adminOffset,
    headerBreakPoint = 0,
    headerContentWidth = 0,
    mobileBreakPoint = 780,
    masonry = $j('.masonry').length,
    parallaxSkroll = false,
    breakpoints = {
        "Large": [9999, 3], // *3* columns for all larger screens
        "Medium": [800, 2], // For *Medium* screens of *1100 to 700*, set Isotope to *2* columns
        "Small": [500, 1] // For *Small* screens below *700*, set Isotope to *1* column
    };


/**
 * Mobile Detection
 */

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/**
 * Check if browser is IE
 */
function isIE() {
    if ($j('body').hasClass('ie')) {
        ie = true;
    } else {
        ie = false;
    }
    return ie;
}

/**
 * Check if browser is Edge
 */

function isEdge() {
    if (!!navigator.userAgent.match(/Edge/)) {
        return true;
    }
}

/**
 * Header Setup
 */
function menuSetup() {
    // Misc.
    // -- Hover menus
    $j('ul.sf-menu').superfish({
        cssArrows: false,
		speed: 'fast', 
		speedOut: 'fast',
    });
}


/**
 * Masonry Blog Initialization
 *
 * Check to see if the layout mode is set to masonry, and
 * defaults to fitRows if the .masonry class is not found.
 * Initializes Isotope on the $gridContainer var
 */

function initMasonryBlog() {
    var gridContainer = $j('.blog .masonry');
    if (gridContainer.length) {
        gridContainer.each(function() {
            var $this = $j(this);
            $this.waitForImages(function() {
                $this.isotope({
                    itemSelector: '.post.small',
                    resizable: true,
                    masonry: {
                        columnWidth: ''
                    }
                });
                $j('.post.small').addClass('show');
            });
        });
    }
}



/**
 * Filter Navigation
 *
 * Binds the Isotope filtering function to clicks on the
 * portfolio filter links using the data-filter attribute
 */

function filterInit() {
    var $filterNavA = $j('#filter-nav a');
    $filterNavA.click(function() {
        var selector = $j(this).attr('data-filter');
        $j(this).parents('.projects').find('.thumbs').isotope({
            filter: selector
        });
        if (!$j(this).hasClass('selected')) {
            $j(this).parents('#filter-nav').find('.selected').removeClass('selected');
            $j(this).addClass('selected');
            //$j(this).parent.addClass( 'selected' );
        }
        return false;
    });
}

/**
 * Portfolio Initialization
 *
 * Check to see if the layout mode is set to masonry, and
 * defaults to fitRows if the .masonry class is not found.
 * Initializes Isotope on the $gridContainer var
 */

function initPortfolio() {
	var gridContainer = $j('.projects .thumbs');
	if(gridContainer.length){

		masonryProjectResize();

		gridContainer.each(function(){
			var $this = $j(this);
			$this.waitForImages(function(){

                $this.isotope({
					itemSelector: '.project.small',
					resizable: false,
					masonry: {
						columnWidth: '.grid-sizer'
					}
				});
				$j('.projects .thumbs .project.small').addClass('show');
			});
		});
	}
}

/**
 * Resize Masonry Grid Items
 *
 */

function masonryProjectResize() {
    if ($j('.masonry-with-gutter').length || $j('.masonry-without-gutter').length) {
        var defaultSize = $j('.projects .grid-sizer').width();
        var projectDefault = $j('.projects .project.small');
        var projectMasonryDefault = $j('.projects .masonry-default');
        var projectMasonryWide = $j('.projects .masonry-wide');
        var projectMasonryTall = $j('.projects .masonry-tall');
        var projectMasonryWideTall = $j('.projects .masonry-wide_tall');
        projectDefault.css('height', defaultSize);
        projectMasonryDefault.css('height', defaultSize);
        projectMasonryWide.css('height', defaultSize);
        projectMasonryTall.css('height', defaultSize * 2);
        projectMasonryWideTall.css('height', defaultSize * 2);
        projectMasonryWideTall.css('width', defaultSize * 2);
    }
}


/*
 ** Load More Projects
 */

function loadMoreProjects() {
    if ($j('.projects .load-more-button').length) {
        var i = 1;

        $j('.load-more-button a').on('click', function(e) {
            e.preventDefault();
            var gridContainer = $j('.projects .thumbs');
            var link = $j(this).attr('href');
            var $content = '.projects .thumbs';
            var $anchor = '.projects .load-more-button a';
            var $next_href = $j($anchor).attr('href'); // Get URL for the next set of projects
            var loadMoreButton = $j('.projects .load-more-holder .load-more-button');
            var loading = $j('.projects .load-more-holder .loading');

            loadMoreButton.addClass('hidden');
            loading.removeClass('hidden');
            $j.get(link + '', function(data) {


                var $new_content = $j($content, data).wrapInner('').html(); // Load only the projects
                $next_href = $j($anchor, data).attr('href'); // Get the new href

                $j($content, data).waitForImages(function() {

                    $j('.projects .thumbs .project.small:last').after($new_content); // Append the new projects

                    masonryProjectResize();
                    gridContainer.isotope('on', 'layoutComplete',
                        function(laidOutItems) {
                            $j('.project.small:not(.show)').addClass('show');
                        }
                    );
                    gridContainer.isotope('reloadItems').isotope();


                    if ($j('.load-more-button').data('rel') > i) {
                        $j('.load-more-button a').attr('href', $next_href); // Change the next URL
                    } else {
                        $j('.load-more-button').remove();
                    }

                    loadMoreButton.removeClass('hidden');
                    loading.addClass('hidden');
                });
            });
            i++;
        });
    }
}


/**
 * Slide Nav Setup
 */

function initSlideMenu() {
    var siteContainer = $j('#site-wrap');
    slideMenu = $j('#slide-panel');
    slideMenuHeight = slideMenu.innerHeight();
    $j('.hamburger').on('click', function() {
		$j(this).toggleClass('is-active');
        slideMenu.stop(true,true).slideToggle("slow"); //easeInOutSine works also nice at 200ms
		return false;
    });
}

/**
 * Mobile Menu Submenus
 * Set collapsable submenus.
 */
// Toggle sub menus
function initMobileSubMenus() {
    jQuery("#slide-panel nav").find("li.menu-item-has-children").click(function() {
        jQuery("#slide-panel nav").not(this).find("ul").next().slideToggle(100);
        jQuery(this).find("> ul").stop(true, true).slideToggle(100);
        jQuery(this).toggleClass("active-sub-menu");
        return false;
    });

    // Don't fire sub menu toggle if a user is trying to click the link
    jQuery(".menu-item-has-children a").click(function(e) {
        e.stopPropagation();
        return true;
    });
}



/**
 * Header Search Setup
 */

function initHeaderSearch() {
    var headerSearchBar = $j('.header-search');
    $j('.search-toggle.open').on('click', function() {
        headerSearchBar.addClass('open');
        headerSearchBar.find('#s').focus();
    });
    $j('.search-toggle.close').on('click', function() {
        headerSearchBar.removeClass('open');
        headerSearchBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            headerSearchBar.addClass('finished');
        });
    });
}

/**
 * Single Page Nav Links
 */

function initSinglePageNav() {
    lastId = "";
    topMenu = $j('#site-header .main-nav');
    headerHeight = 0;
    adminBarHeight = $j('body').hasClass('admin-bar') ? 32 : 0;
    scrollOffest = adminBarHeight + headerHeight;
    // All list items
    menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
        var target = this.hash;
        var item = $j(target);
        if (item.length) {
            return item;
        }
    });
    $j('.main-nav a[href^="#"], #slide-mobile-menu a[href^="#"]').click(function(e) {
        e.preventDefault();
        var target = this.hash;
        var targetElement = $j(target);
        $j(window).scrollTo(targetElement, {
	
            duration: 500,
            interrupt: false,
            offset: -(scrollOffest+59)
        });

    });
}

function singlePageNavScroll() {
    // Get container scroll position
    var fromTop = $j(this).scrollTop() + scrollOffest + 140;
    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($j(this).offset().top <= fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur.attr("id") : "";
    if (lastId !== id) {
	//alert(id);
	
        //alert(cur.data("rowId"));
        lastId = id;
        // Set/remove active class
        menuItems.parent().removeClass("active");
		$j("[href=#" + id + "]").parent().addClass("active");
    }
}

/**
 * Init lightbox links
 */

function initLightbox() {
    $j("a[data-rel^='prettyPhoto']").prettyPhoto({
        hook: 'data-rel',
        social_tools: '',
        autoplay: false,
        show_title: false,
        deeplinking: false,
        overlay_gallery: false,
        markup: '<div class="pp_pic_holder"> \
<div class="ppt">&nbsp;</div> \
<div class="pp_top"> \
<div class="pp_left"></div> \
<div class="pp_middle"></div> \
<div class="pp_right"></div> \
</div> \
<div class="pp_content_container"> \
<div class="pp_left"> \
<div class="pp_right"> \
<div class="pp_content"> \
<div class="pp_loaderIcon"></div> \
<div class="pp_fade"> \
<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
<div class="pp_hoverContainer"> \
<a class="pp_next" href="#"></a> \
<a class="pp_previous" href="#"></a> \
</div> \
<div id="pp_full_res"></div> \
<div class="pp_details"> \
<p class="currentTextHolder">0/0</p> \
<a class="pp_close" href="#"></a> \
</div> \
</div> \
</div> \
</div> \
</div> \
</div> \
<div class="pp_bottom"> \
<div class="pp_left"></div> \
<div class="pp_middle"></div> \
<div class="pp_right"></div> \
</div> \
</div> \
<div class="pp_overlay"></div>',
    });
}

/**
 * Parallax
 */

function initParallax() {
    if (isEdge()) {
        return false;
    }
    $j('.parallax-inner').remove();
    $j('.parallax-section').each(function() {
        var skrollrSpeed,
            skrollrSize,
            skrollrStart,
            skrollrEnd,
            parallaxSectionId,
            $parallaxElement,
            parallaxSectionHeight,
            parallaxImage;
        parallaxSectionId = $j(this).data('parallaxId');
        parallaxSection = $j(this);
        var pOffset = parallaxSection.offset(); //Get the offset of the parallax section
        var pOffsetTop = pOffset.top;
        $parallaxElement = $j('<div />').addClass('parallax-inner').appendTo($j(this));
        if (pOffsetTop < 100) {
            parallaxSection.addClass('top');
        }
        $parallaxElement.attr('data-parallax', '{"y": 330, "distance": 2000, "smoothness": 0}');
        if (!isMobile.any()) {}
    });
}


function ieParallax() {
    $j('.parallax-section').each(function() {
        var parallaxSection = $j(this);
        parallaxSection.css({
            'background-attachemnt': 'fixed'
        });
    });
}

/**
* Sticky Header
*/

function stickyHeader(){	
	var fromTop = $j(document).scrollTop();
	$j('.sticky-header #site-header').toggleClass("sticky", (fromTop > 100));
}

function initStickyHeader(){
	var stickyHeader = $j('.sticky-header #site-header');
	if(!stickyHeader.hasClass('transparent') && $j('body').hasClass('sticky-header')){	
		stickyHeader.waitForImages(function() {
			headerHeight = stickyHeader.height();
			$j('#middle').css('padding-top', headerHeight);
		});
	}
	$j('#middle').css('opacity', 1);
}

function makeHeaderMobileFriendly(){
	
	var mobileBreakpoint = $j('body').attr('data-mobile-breakpoint');
	if($j(window).width() < parseInt(mobileBreakpoint)){
		if($j('#site-header').hasClass("is-transparent")){
			$j('#site-header').removeClass("transparent");
		}
		if($j('body').hasClass("has-sticky-header")){
			$j('body').removeClass("sticky-header");
			$j('#middle').css('padding-top', 0);
			
		}
	}else{
		if($j('#site-header').hasClass("is-transparent")){
			$j('#site-header').addClass("transparent");
		}
		if($j('body').hasClass("has-sticky-header")){
			$j('#middle').css('padding-top', headerHeight);
			$j('body').addClass("sticky-header");
		}
	}
}


/**
 * Megamenu width
 */

function megamenuWidth() {
    var headerWidth = $j('#site-header .logo-and-nav').outerWidth();
    $j('.mega-menu.full-width ul').css('width', headerWidth + 'px');
}



/**
 * Scroll to top button
 */

function initScrollToTopButton() {
    if ($j('#scroll-to-top')) {
        $j('#scroll-to-top').click(function(e) {
            $j(window).scrollTo(0, {
                duration: 500,
                interrupt: false
            });
        })
    }
}

function scrollToTopButton() {
    if ($j('#scroll-to-top')) {
        var fromTop = $j(document).scrollTop();
        $j('#scroll-to-top').toggleClass("active", (fromTop > 200));
    }
}


/**
 * Set poster image for background videos in Slider Revolution
 */
function revSliderMobilePoster() {
    var mobile = 'ontouchend' in window;
    $j('.tp-videolayer').each(function() {
        var $this = $j(this);
        if (!mobile) {
            // to keep the video poster for desktop, comment out or remove the line below
            $this.attr('data-videoposter', '');
            return;
        }
        $this.removeClass('fullscreenvideo tp-videolayer').addClass('mobile-video-fallback-image').css(
            'background-image', 'url(' + $this.attr('data-videoposter') + ')'
        );
    });
}

/**
 * Fix mouse wheel zoom on Google Maps
 */
function fixGoogleMapMouseWheelZoom() {
    $j('.sow-google-map-canvas').addClass('scroll-off'); // set the pointer events to none on doc ready
    $j('.widget_sow-google-map').on('click', function() {
        $j('.sow-google-map-canvas').removeClass('scroll-off'); // set the pointer events true on click
    });
    // disable pointer events when the mouse leave the canvas area;
    $j(".widget_sow-google-map").mouseleave(function() {
        $j('.sow-google-map-canvas').addClass('scroll-off'); // set the pointer events to none when mouse leaves the map area
    });
}


/**
 * Fade out preloader
 */
$j(window).load(function() {
    $j('body').addClass('loaded');
    $j('#loader-container').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        $j('#loader-container').addClass('finished');
    });
})


/**
 * Fix mouswheel scroll in IE for fixed backgrounds
 */

if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
    $j('body').on("mousewheel", function() {
        // remove default behavior
        event.preventDefault();

        //scroll without smoothing
        var wheelDelta = event.wheelDelta;
        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
}

/**
 * Fade In Items on Scroll
 */

function fadeInItems() {
    $j('.project.small').each(function(i) {

        var bottom_of_object = $j(this).offset().top + $j(this).outerHeight();
        var bottom_of_window = $j(window).scrollTop() + $j(window).height();

        /* If the object is completely visible in the window, fade it it */
        if (bottom_of_window > bottom_of_object) {
            var offset = $j(this).offset();
            var delay = offset.left * .3;
            $j(this).delay(delay).animate({
                'opacity': '1',
                'margin-top': 0,
            }, 500);

        }

    });
}


/**
 * Init Counter
 */

function initCounter() {

    $j(".counter-number").each(function() {
        var $countTo = parseInt($j(this).text());
        $j(this).waypoint(function() {
            $j(this).countTo({
                from: 0,
                to: $countTo,
                speed: 900,
                refreshInterval: 25
            });
        }, {
            triggerOnce: true,
            offset: '99%'
        });
    });
}


/**
 * Carousel
 */

function initCarousel(){
	$j('.weston-carousel').each(function() {

		var columns = 3;
		var tabletcolumns = 3;
	   	var nav = true;
	   	var pagination = true;
	   	var autoplay = false;
		var loop = false;
	   	var animationtime = 4000;

	   	columns = $j(this).data("columns");
	   	tabletcolumns = $j(this).data("tabletcolumns");
	   	nav = $j(this).data("nav");
	   	pagination = $j(this).data("pagination");
	   	autoplay = $j(this).data("autoplay");
		loop = $j(this).data("loop");
	   	animationtime = $j(this).data("animationtime");

		$j(this).on('initialized.owl.carousel', function(event){ 
			$j(this).css('display', 'block');
		    $j(this).animate({'opacity': 1}, 600);
		});

		$j(this).owlCarousel({
	    	items : columns,
			autoplay: autoplay,	
			loop: loop,
			dots: pagination,
			nav: false,
			center: false,
			smartSpeed: 500,
			autoheight: false,
			navText: "",
			responsive:{
			        0:{
			            items:1
			        },
					480:{
			            items:tabletcolumns
			        },
			        980:{
			            items:columns
			        }
			    }
	    });

	});
}

/**
* Video Background
*/
function resizeVideoBackground() {
	
	var min_w = 1200; // minimum video width allowed
	var video_width_original = 1280;  // original video dimensions
	var video_height_original = 720;
	var vid_ratio = 1280/720;
    $j('.video-wrap').each(function(i){
        
        var $sectionHeight = $j(this).parent('.vc_row').outerHeight();         
        var $sectionWidth = $j(this).parent('.vc_row').outerWidth();

        $j(this).width($sectionWidth);
        $j(this).height($sectionHeight);
    
        // calculate scale ratio
        var scale_h = $sectionWidth / video_width_original;
        var scale_v = ($sectionHeight - $sectionHeight) / video_height_original; 
        var scale = scale_h > scale_v ? scale_h : scale_v;
        
        // limit minimum width
        min_w = vid_ratio * ($sectionHeight+20);
        
        if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}
            
        $j(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original + 20));
        $j(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original + 20));
        
        $j(this).scrollLeft(($j(this).find('video').width() - $sectionWidth) / 2);
        $j(this).scrollTop(($j(this).find('video').height() - ($sectionHeight)) / 2);

        $j(this).find('.mejs-overlay, .mejs-poster').scrollTop(($j(this).find('video').height() - ($sectionHeight)) / 2);

    });
}

/**
* VC Tweaks
*/
function vcTweaks(){
	$j('.vc_pie_chart').each(function(i) {
		var color = $j(this).data("pie-color");
		$j(this).css('color', color);
	});

	$j('.progressbar').each(function() {
	    $j(this).waypoint(function(){ 
	    	var perc = $j(this).attr('data-perc');
	        $j(this).find('.progress-percentage').animate({ "width" : perc + "%"}, perc*14);
	    	},{ offset: '96%' }); 
	});

}

/** 
*Number Field
*/
// Number Field Stepper
function initNumberFields(){
	$j('.qty').bootstrapNumber({
		upClass: 'plus',
		downClass: 'minus'
	});
}


/**
* Initialize Everything
*/

$j(document).ready(function() {
    initSlideMenu();
    $j(".content-area").fitVids();
	initNumberFields()
    menuSetup();
    filterInit();
    loadMoreProjects();
    initSinglePageNav();
    initStickyHeader();
    initHeaderSearch();
    megamenuWidth();
    initMobileSubMenus();
    revSliderMobilePoster();
    initScrollToTopButton();
    fixGoogleMapMouseWheelZoom();
    initCounter();
	vcTweaks();
	makeHeaderMobileFriendly();
	$j( "div.gallery br" ).remove();
	setTimeout(function(){
	    resizeVideoBackground();
	    $j('.video-wrap').animate({'opacity' : '1'}, 600);
	}, 600);

	// Remove Video on mobile Devices
	if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === true) {
	    $j('.video-wrap').remove();      
	}
	
	//fadeInItems();
    //Scroll events
    $j(window).scroll(function() {
		if(!isMobile.any()){
			stickyHeader();
		}
        singlePageNavScroll();
        scrollToTopButton();
		//fadeInItems();
    });
    $j(window).bind('resize', function(e) {
        window.resizeEvt;
        $j(window).resize(function() {
            clearTimeout(window.resizeEvt);
			resizeVideoBackground(); 
            window.resizeEvt = setTimeout(function() {
				makeHeaderMobileFriendly();
                initPortfolio();
                megamenuWidth();
				$j('.weston-carousel').data('owl.carousel');
            }, 250);
        });
    });
});

$j(window).load(function() {
    initMasonryBlog();
	initCarousel()
    initPortfolio();
	initLightbox();
	stickyHeader();
    if (!isMobile.any() && !isIE()) {
        initParallax();
    }
    if (isIE() || isEdge()) {
        ieParallax();
    }
    singlePageNavScroll();
})


/******CUSTOM THEME FUNCTIONS*******/



$j(document).ready(function() {
	
var $header = $j('#site-header'),
    scrollClass = 'on-scroll',
    activateAtY = 20;

function deactivateHeader() {
    if (!$header.hasClass(scrollClass)) {
        $header.addClass(scrollClass);
    }
}

function activateHeader() {
    if ($header.hasClass(scrollClass)) {
        $header.removeClass(scrollClass);
    }
}	
	
	
	$j(window).scroll(function() {
		if($j(window).scrollTop() > activateAtY) {
			deactivateHeader();
		} else {
			activateHeader();
		}
	});
});