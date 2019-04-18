jQuery(function($){	
	"use strict";
	
	// Global Variables
	var $window = $(window);
    
    
    // ====================================================================================================
    // Clear Modal on Close
    // ====================================================================================================    
    $('.modal').on('hidden.bs.modal', function(){
        $(this).find('.modal-body').html("");
    });
	
	// ====================================================================================================
	// Vertical Profiles - Click
	// ====================================================================================================
	$("body").on("click", ".vertical-profiles a", function() {
		var profile_id = $(this).attr("href");
		if(!$(profile_id).hasClass("active")) {
			$(".vertical-profiles .profile.active").animate({
				'width':'toggle'
			}, function() {
				$(this).removeClass("active");
				
				$(profile_id).animate({
				'width':'toggle'
				}, function() {
					$(this).addClass("active");
				});
			});
			
			
		} 
		
		return false;
	});
	
    // ====================================================================================================
	// Dropdown (select) redirect to URL in Option
	// ====================================================================================================
    $("body").on("change", "select.redirect-to-url", function() {        
        if($(this).val() !== "") {
           window.location = $(this).val();
        }
    });
    
    // ====================================================================================================
	// News Feed - Pagination
	// ====================================================================================================
    $("body").on("click", "a.news-more", function() {
        var filter = $(this).attr("data-filter");
        var tag = $(this).attr("data-tag");
        var year = $(this).attr("data-year");
        var count = $(this).attr("data-count");
        var pagination = $(this).attr("data-pagination");
        var url = "https://www.skidmore.edu/_resources/php/blog/news-archive-listing.php";
        var more = $(this);
        
        if(filter === "tag") {
            url = url + "?filter=tag&tag=" + tag + "&count=" + count + "&pagination=" + pagination + "&filter-display=no";
        } else if(filter === "year") {
            url = url + "?filter=year&year=" + year + "&count=" + count + "&pagination=" + pagination + "&filter-display=no";
        }
        
        $.ajax({
           url: url
        }).done(function(msg) {
            $(msg).appendTo(".news-list");
            more.parent().css("display", "none");
        });
                
        
        return false;
    });
    
    // ====================================================================================================
    // Hover Grid - Modal
    // ====================================================================================================
   	$(".hg-lightbox a").click(function() {
        $("#myModal .modal-title").html("");
        $("#myModal .modal-footer").html("");
        $.ajax({
           url: $(this).attr("href") 
        }).done(function(data) {
            $("#myModal .modal-body").html(data);
            $("#myModal").modal("show");
        });
        
        return false;
    });  
    
    // ====================================================================================================
    // Asset - SS2S
    // ====================================================================================================
    $(".asset-s2s .small-image a").click(function() {
        $(".asset-s2s .small-image li").removeClass("active");   
        $(this).parent("li").addClass("active"); 
        
        $(".asset-s2s .persona").removeClass("persona-active");
        $(".asset-s2s .persona").addClass("persona-hide");
        
        var persona = $(this).attr("href");
        $(persona).removeClass("persona-hide");
        $(persona).addClass("persona-active");
        
        return false;
    });
	
	// ====================================================================================================
	// Link directly to Accordion Drop Down
	// ====================================================================================================
	if(location.hash !== null && location.hash !== ""){        
        var hash_url = location.hash.replace("(", "");
        hash_url = hash_url.replace(")", "");
        hash_url = hash_url.replace("|", "");
        
        var target = $(hash_url + '.collapse');        
        
		if(target.length > 0) {
			$('.collapse').removeClass('in');
        	target.collapse('show'); 
			
			$('html, body').animate({
				scrollTop: (target.offset().top - 150)
			}, 1000);
		}				
    }
    
    // ====================================================================================================
	// Events (right blocks) Action Listener for Mobile
	// ====================================================================================================   
    $(".cal-bar .title a").click(function() {
        if($window.width() < 991) {
            $(".cal-bar .date").slideToggle('fast');
            
            return false;
        }
        
    }); 
    
	
	
	// ====================================================================================================
	// Header Action Listener for to tab through drop down menus
	// ====================================================================================================
	$(".top ul li ul a").on("focus", function() {
		$(".top ul li ul").css("left", 0);
	});
	$(".top ul li ul a").on("blur", function() {
		$(".top ul li ul").attr("style", "");
	});
	
	
	$("header .primary-navigation > li a").on("focus", function() {
		if($window.width() > 991) {
			if($window.scrollTop() > 50) {	
				$(this).parents("ul").addClass("active2");	
			} else {
				$(this).parents("ul").addClass("active");
			}
			
		}
	});
	$("header .primary-navigation > li a").on("blur", function() {
		if($window.width() > 991) {
			if($window.scrollTop() > 50) {	
				$("header .primary-navigation > li > ul").removeClass("active2");
			} else {
				$("header .primary-navigation > li > ul").removeClass("active");
			}
		}
	});
	
	// ====================================================================================================
	// Header - Sub-Navigation Fly-Out Doesn't Go Off Screen
	// ====================================================================================================
	sub_navigation_fly_out_check();
	
	$window.resize(function() {
		sub_navigation_fly_out_check();
	});
	
	function sub_navigation_fly_out_check() {	
		var window_width = $window.width();
		
		$(".primary-navigation > li").each(function() {
			if($(this).has("ul").length > 0) {
				var sub_navigation_width = $(this).find("ul").outerWidth();
				
				var this_left = $(this).offset();
				var total_offset = this_left.left + sub_navigation_width + 20;
				if(total_offset > window_width) {
					$(this).find("ul").addClass("right0");
				} else {
					$(this).find("ul").removeClass("right0");
				}				
			}
		});
	}
	
	// ====================================================================================================
	// Header - Translate Webspage Link
	// ====================================================================================================
	$(".translate-webpage").click(function() {
		var url = $(this).attr("href");
		window.location.hash = url;
        location.reload();
		return false;
	});
	
	
	
	
	
	
	
	
	
		
	// ====================================================================================================	
	// Side Navigation
	// ====================================================================================================		
	/* Mobile Expansion */
    $("nav.side-navigation .title").click(function() {
		if($window.width() < 992) {
            var expand_element = $("nav.side-navigation > ul");
            if(expand_element.is(":visible")) { 
                $(this).find("span").removeClass("glyphicon-minus");
                $(this).find("span").addClass("glyphicon-plus");
            } else {
                $(this).find("span").removeClass("glyphicon-plus");
                $(this).find("span").addClass("glyphicon-minus");
            }

            expand_element.slideToggle("fast");
        }
            
        return false;
	});
	
    /* Scrolling with Page */
	if($(".side-navigation").not(".quick-links").not(".snippet-main-message .side-navigation").length) {
		var $sidebar   = $(".side-navigation").not(".quick-links"); 
		//var $sidebar_height = $sidebar.outerHeight(true);
		var $sidebar_offset     = $sidebar.offset();

		var $container = $(".main");
		var $container_height = $container.outerHeight(true);    
		//var $container_offset = $container.offset();

		var topPadding = 130;

		$window.scroll(function() {	
			if($window.width() > 992) {
				var new_marginTop = $window.scrollTop() - $sidebar_offset.top + topPadding;

				// Checks if needs to scroll
				if ($window.scrollTop() > $sidebar_offset.top - 120) {
					// checks if needs to stop
					if(($sidebar.outerHeight(false) + new_marginTop) < $container_height) {
						$sidebar.css("marginTop", new_marginTop);
					}			
				} else {
					$sidebar.css("marginTop", 0);
				}	
			}
		});
	}
	
    /* Dropdown */
	$(".side-navigation ul li a > span").click(function() {
		if($(this).parent().siblings("ul").is(":visible")) {
			side_navigation_close($(this));
		} else {
			side_navigation_open($(this));
		}
		
		
		return false;
	});
    
    $(document).keypress(function(e) {
        if(e.which === 13) {
            $(".side-navigation ul li a > span").each(function() {
               if($(this).is(":focus")) {
                   if($(this).parent().siblings("ul").is(":visible")) {
                       side_navigation_close($(this));                       
                   } else {
                       side_navigation_open($(this));
                   }
               }
            });
        }
    });
    
    function side_navigation_open(this_element) {
        this_element.removeClass("glyphicon-chevron-down");
        this_element.addClass("glyphicon-chevron-up");
        
        this_element.parent().siblings("ul").slideToggle('fast');
    }
    
    function side_navigation_close(this_element) {
        this_element.removeClass("glyphicon-chevron-up");
        this_element.addClass("glyphicon-chevron-down");
        
        this_element.parent().siblings("ul").slideToggle('fast');
    }
    
	

	
	
	
	
	
				
	// ==================================================
	// Header - Scroll Box Shadow
	// ==================================================		
	header_scroll();
	
	$(window).scroll(function() {
		header_scroll();
	});
	
	function header_scroll() {
		if($(window).width() > 991) { 		
			if($(window).scrollTop() > 50) {			
				$("header").addClass("scroll");
				$(".buffer").addClass("scroll");
			} else {
				$("header").removeClass("scroll");
				$(".buffer").removeClass("scroll"); 
			}
		} else {
			$("header").removeClass("scroll");	
			$(".buffer").removeClass("scroll"); 
		}	
	}
	
	
	// ==================================================
	// Header - Expand Navigation on Mobile
	// ==================================================
	$(".header-mobile-trigger-navigation a").click(function() {
		var primary_nav = $(".primary-navigation");
		if(primary_nav.is(":visible")) {
			$(this).find("img").attr("src", "/_images/icons/mobile-menu-icon.svg");		
		} else {
			$(this).find("img").attr("src", "/_images/icons/mobile-menu-close-icon.svg");
		}
		$(".mobile-google-search").slideToggle('fast');
		$(".primary-navigation").slideToggle('fast');

		return false;
	});
	
	// ==================================================
	// Header - Expand SUB-Navigation on Mobile
	// ==================================================
	$(".header-mobile-trigger-sub-navigation").click(function() {
		var ul_sibling = $(this).siblings("ul");
		
		if(ul_sibling.is(":visible")) {
			$(this).find("img").css("transform", "rotate(0deg)");
		} else { 
			$(this).find("img").css("transform", "rotate(180deg)");
			
		}
		ul_sibling.slideToggle('fast');
		
		return false;
	});
	
	
	// ==================================================
	// Footer - Expand Navigation on Mobile
	// ==================================================
	$(".footer-mobile-trigger-navigation a").click(function() {
		var navigation_expand = $(this).attr("href");
		navigation_expand.replace("#", "");
		if($(navigation_expand).is(":visible")) {
			$(navigation_expand).slideToggle('fast');
			$(this).find("img").css("transform", "rotate(0deg)");
		} else {
			$(navigation_expand).slideToggle('fast');
			$(this).find("img").css("transform", "rotate(180deg)");
		}
		return false;
	});
		
	
	// ==================================================
	// Asset - News Carousel
	// ==================================================
	$(".asset-recent-news").skid_carousel({
		item_count_display : 3,
		item_gutter : 30,
		breakpoint : {
			desktop : {
				item_count_display : 3,
				item_gutter : 30
			},
			tablet : {
				item_count_display : 2,
				item_gutter : 30
			},
			mobile : {
				item_count_display : 1,
				item_gutter : 30
			}
		}
	});	
	
	// ==================================================
	// Asset - Creative Thought Matters
	// ==================================================
	$(".asset-ctm .persona .small-image li").click(function() {
		var persona = $(this).find("a").attr("href").replace("#", "");
		var persona_area = $(this).parents(".asset-ctm");
		
		persona_area.find(".persona .small-image li").removeClass("active");
		persona_area.find(".persona .small-image li a[href='#"+ persona +"']").parents("li").addClass("active");
		
		persona_area.find(".persona-active").removeClass("persona-active");
		persona_area.find(".persona").addClass("persona-hide");
		$("#" + persona).addClass("persona-active");
		$("#" + persona).removeClass("persona-hide");
		
		return false;
	});
	
	
	// ==================================================
	// Asset - Student to Student
	// ==================================================
	$(".asset-s2s .persona .small-image li").click(function() {
		var persona = $(this).find("a").attr("href").replace("#", "");
		var persona_area = $(this).parents(".asset-s2s");
		
		persona_area.find(".persona .small-image li").removeClass("active");
		persona_area.find(".persona .small-image li a[href='#"+ persona +"']").parents("li").addClass("active");
		
		persona_area.find(".persona-active").removeClass("persona-active");
		persona_area.find(".persona").addClass("persona-hide");
		$("#" + persona).addClass("persona-active");
		$("#" + persona).removeClass("persona-hide");
		
		return false;
	});
	
	
	
	$(".toggle-hidden").click(function() {
		var css_class = "." + $(this).attr("href").replace("#", "");
		var data_close = $(this).attr("data-close");
		var data_open = $(this).attr("data-open");
		
		if($(css_class).is(":visible")) {
			$(this).html(data_close);
		} else {
			$(this).html(data_open);
		}
		
		$(css_class).toggle();
		
		return false;
	});
    
    
    
    // ==================================================
	// Prevent Bootstrap Collapse from jumping to the top
	// ==================================================
    $('a[data-toggle="collapse"]').click( function(event) {
        event.preventDefault();
    });
		
});




// ====================================================================================================
// Asset - Carousel
// ====================================================================================================
(function ($) {
	"use strict";
	
	$.fn.skid_carousel = function(options) {
		// Default Values
		if(options.item_count_display === "") { options.item_count_display = 3; }
		if(options.item_gutter === "") { options.item_gutter = 30; }

		var container = {};
		container.object = $(this);
		var item = {};
		var page = {};
		
		// Set Defaults
		set_control();

		// Action Listeners
		$(this).find(".carousel-right").click(function() { move_container(page.current + 1); return false; });
		$(this).find(".carousel-left").click(function()  { move_container(page.current - 1); return false; });
		$(this).find(".carousel-breadcrumbs ul li a").click(function() { var page = $(this).attr("href").replace("#", ""); move_container(page); return false; });
		$(window).resize(function() { set_control(); });
		$(".asset-skid-carousel").swipe({
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				move_container(page.current + 1);
			},
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				move_container(page.current - 1);
			}				
		});
		
		
		/* ================================================== */
		/* function set_control() */
		/* Controls everything based on Window Size */
		/* @param(none) */
		/* return(none) */
		/* ================================================== */
		function set_control() {
			if($(window).width() > 1199) { 
				options.item_count_display = options.breakpoint.desktop.item_count_display;
				options.item_gutter = options.breakpoint.desktop.item_gutter;
				set_defaults();
				set_item_width();
				set_breadcrumbs(); 				
				container.object.find(".carousel-container ul").css("margin-left", 0);
			} else if($(window).width() <= 991) {
				options.item_count_display = options.breakpoint.mobile.item_count_display;
				options.item_gutter = options.breakpoint.mobile.item_gutter;
				set_defaults();
				set_item_width();
				set_breadcrumbs();				
				container.object.find(".carousel-container ul").css("margin-left", 0);
			} else if($(window).width() <= 1199) { 
				options.item_count_display = options.breakpoint.tablet.item_count_display;
				options.item_gutter = options.breakpoint.tablet.item_gutter;
				set_defaults();
				set_item_width();
				set_breadcrumbs();				
				container.object.find(".carousel-container ul").css("margin-left", 0);
			}
		}
		
		/* ================================================== */
		/* function set_defaults() */
		/* Sets the default values */
		/* @param(none) */
		/* return(none) */
		/* ================================================== */
		function set_defaults() {
			container.left_margin = 0;
			container.width = container.object.find(".carousel-container").outerWidth();				

			item.width = (container.width / options.item_count_display) - (options.item_gutter / options.item_count_display);
			item.count = container.object.find(".carousel-items li").length;		

			page.current = 0;
			page.max = Math.ceil(item.count / options.item_count_display);
		}
		
		
		/* ================================================== */
		/* function set_breadcrumbs() */
		/* Sets the appropriate number of breadcrumbs.
		/* @param(none) */
		/* return(none) */
		/* ================================================== */
		function set_breadcrumbs() {
			var breadcrumb_html = "<ul>";
			for(var i=0; i<page.max; i++) {
				if(i === 0) {
					breadcrumb_html = breadcrumb_html + "<li><a href='#"+ i +"' class='active'></a></li>";
				} else {
					breadcrumb_html = breadcrumb_html + "<li><a href='#"+ i +"'></a></li>";
				}
			}
			breadcrumb_html = breadcrumb_html + "</ul>";
			container.object.find(".carousel-breadcrumbs").html(breadcrumb_html);
		}
		
		/* ================================================== */
		/* Function set_item_width() */
		/* Sets the width of the item */
		/* @param(none) */
		/* return(none) */		
		/* ================================================== */
		function set_item_width() {
			container.object.find(".carousel-items li").css("width", item.width + "px");
		}

		/* ================================================== */
		/* Function move_container() */
		/* Moves the UL container margin left one way or another depending on which page.
		/* @param(new_page) [int] - Page that UL is to move to.
		/* return(none)
		/* ================================================== */
		function move_container(new_page) {
			// Check if at begginning or end of pages so it can loop around.		
			if(new_page < 0) {
				new_page = (page.max - 1); // minus 1 b/c starting at Zero
			} else if(new_page >= page.max) {
				new_page = 0;
			}

			page.current = new_page;
			//console.log(new_page);

			container.left_margin = ((container.width * -1) * new_page) + (options.item_gutter * new_page);

			container.object.find(".carousel-container ul").animate({
				marginLeft: container.left_margin + "px" 
			});

			//Update Breadcrumbs
			container.object.find(".active").removeClass("active");
			container.object.find(".carousel-breadcrumbs ul li a[href*='#"+ new_page +"']").addClass("active");
		}
	};
}( jQuery ));