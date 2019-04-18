jQuery(function($){	
	"use strict";
	
	// Global Variables
	var $window = $(window);
	var $body = $("body");
	
	// Modal is called on the body as it's primary function is made up of action listeners
	// that are only called on <a> tags.
	$body.skid_modal();	
	
    
    // ==========================================================================================
    // Bootstrap Carousel Gallery Fix
    // ==========================================================================================
    photo_gallery_slider_size();
    $window.resize(function() {
        $(".photo-gallery-slider").find(".item").css("width", "auto");
        $(".photo-gallery-slider").find(".item").css("height", "auto");
        photo_gallery_slider_size();
    });
    function photo_gallery_slider_size() {
        var photo_gallery_slider = $(".photo-gallery-slider");
        if(photo_gallery_slider.length > 0) {
            photo_gallery_slider.each(function() {	
                var pg_slider_width = $(this).find(".item:first-child img").width();
                var pg_slider_height = $(this).find(".item:first-child img").height();

                $(this).find(".item").css("width", pg_slider_width + "px");
                $(this).find(".item").css("height", pg_slider_height + "px");
            });
        }
    }
    
	
	
	// ==========================================================================================
	// Carousel Gallery
	// ==========================================================================================
	var carousel = $("div[data-gallery='carousel']");
	var carousel_index = 0;
	if (carousel.length > 0) {		
  		carousel.each(function() {			
			if($(this).find("ul").length > 0 && $(this).find("li").length > 0) {
				$(this).attr("id", "carousel" + carousel_index);
				var options = { 
					count: parseInt($(this).attr("data-count")),
					left: $(this).attr("data-left"),
					right: $(this).attr("data-right"),
					autorotate: $(this).attr("data-auto-rotate")
				};

				$("#carousel" + carousel_index).kraken_carousel(options);			
				carousel_index++;
			} else {
				console.log("Kraken Gallery [carousel]: Either UL and/or LI not present.");
			}
		});										
	}
	
	// ==========================================================================================
	// Gallery Modal
	// ==========================================================================================
	$body.on("click", ".photo-modal" , function(){ 
		//$(".modal").modal("hide");
		$(".modal-body").empty();
		$(".modal-title").empty();
		$(".modal-footer").empty();
		
		// Get Title
		var title = $(this).attr("title");
		
		// Get Body
		var image_url = $(this).attr("href");
		var caption = $(this).attr("data-caption");
		var body = "<img src='"+ image_url +"' alt='' />";
		if(caption !== "") { body = body + "<div class='caption'><p>"+ caption +"</p></div>"; }		
		
		
		// Get Footer
		var photo_group = $(this).attr("data-group");
		var photo_array = [];
		$("a[data-group='" + photo_group +"']").each(function() {
			var tmp = [$(this).attr("href"), $(this).attr("title"), $(this).attr("data-caption"), $(this).attr("data-group")];
			photo_array.push(tmp);
		});
		

		
		var footer = "";
		var previous_url = "";
		var previous_title = "";
		var previous_caption = "";
		
		var next_url = "";
		var next_title = "";
		var next_caption = "";
		var count = 0;
		if(photo_array.length > 1) {
			for(var i=0; i<photo_array.length; i++) {
				if(photo_array[i][0] === image_url) {
					count = i + 1;
					if(i === 0) { 
						previous_url = photo_array[photo_array.length - 1][0]; 
						previous_title = photo_array[photo_array.length - 1][1]; 
						previous_caption = photo_array[photo_array.length - 1][2]; 
					} else { 
						previous_url = photo_array[i-1][0]; 
						previous_title = photo_array[i-1][1]; 
						previous_caption = photo_array[i-1][2]; 
					}
					if(i === (photo_array.length - 1)) { 
						next_url = photo_array[0][0]; 
						next_title = photo_array[0][1];
						next_caption = photo_array[0][2];
					} else { 
						next_url = photo_array[i+1][0]; 
						next_title = photo_array[i+1][1]; 
						next_caption = photo_array[i+1][2]; 
					}
					break;				   
				}			
			}
			footer = footer + "<a href='"+ previous_url +"' class='left photo-modal' title='"+ previous_title +"' data-caption='"+ previous_caption +"' data-group='"+ photo_group +"'><span class='glyphicon glyphicon-chevron-left'></span> Previous</a>";
			footer = footer + "<a href='"+ next_url +"' class='right photo-modal' title='"+ next_title +"' data-caption='"+ next_caption +"' data-group='"+ photo_group +"'>Next <span class='glyphicon glyphicon-chevron-right'></span> </a>";
			body = body + "<span class='thumbnail-number'>"+ count +" of "+ photo_array.length +"</span>";
		} else {
			footer = "";
		}
		
		// Sets Information for the Modal
		if(image_url !== "" && image_url !== "#") {
			$(".modal-title").html(title);
			$(".modal-body").hide().html(body).fadeIn('slow');
			$(".modal-footer").html(footer);

			$('.modal').modal({show:true});

			return false;
		} else {
			console.log("Modal Image URL is empty.");
			return false;
		}
	}); 	
	
	
	
	
	
	
	
});











(function ($) {
	"use strict";
	
	var $window = $(window);
	var $body = $("body");
	
	// ========================================================================================================================================================================================================
	// Carousel - Help Documentation: ****ADD THIS****
	// ========================================================================================================================================================================================================
	$.fn.kraken_carousel = function(options) {
		var parent = $(this);
		var container = parent.find("ul");		
		var items_list = items_list_set(parent.find("li"));	
		var items = { current: 0, total: items_list.length };
		mobile_li_resize();
		
		// Action Listeners
		parent.find(options.right).click(function() { move_container(items.current + options.count); return false; });
		parent.find(options.left).click(function()  { move_container(items.current - options.count); return false; });		
		parent.swipe({
			swipeLeft:function(event, direction, distance, duration, fingerCount) { move_container(items.current + options.count); return false; },
			swipeRight:function(event, direction, distance, duration, fingerCount) { move_container(items.current - options.count); return false; }				
		});
		
		$window.resize(function() {
			mobile_li_resize();
		});
		
		
		/* ================================================== */
		/* Function move_container() */
		/* Moves the UL container margin left one way or another depending on which page.
		/* @param(next_item) [int] - which item going to 
		/* return(none)
		/* ================================================== */
		function move_container(next_item) {			
			items_list = items_list_set(parent.find("li"));	
			
			if(next_item < 0) { next_item = (items.total - 1); }
			if(next_item > (items.total - 1)) { next_item = 0; }
			
			var new_margin_left = 0;
			for(var i=0; i<next_item; i++) {
				new_margin_left = new_margin_left + items_list[i];
			}
			
			new_margin_left = new_margin_left * -1;
			
			container.animate({
				marginLeft: new_margin_left + "px" 
			});
			
			items.current = next_item;						
		}
		
		
		/* ================================================== */
		/* Function items_list_set() */
		/* Loops through all the items and creates an array with their width
		/* @param(items) [jQuery object] 
		/* return(array)
		/* ================================================== */
		function items_list_set(items) {
			var list = [];
			items.each(function(i) {
				list[i] = parseInt($(this).outerWidth(true));
			});	
			return list;
		}
		
		
		/* ================================================== */
		/* Function items_list_set() */
		/* Loops through all the items and creates an array with their width
		/* @param(items) [jQuery object] 
		/* return(array)
		/* ================================================== */
		function mobile_li_resize() {
			if($window.outerWidth(true) < 991) {
				var container_width = parent.outerWidth(false);
		   		parent.find("li").css("width", container_width + "px");
	   		} else {
				parent.find("li").css("width", "auto");
		   	}
		}
	}; // end kraken_carousel
	
	
	
	
	
	
	
	
	
	
	
	
	// ========================================================================================================================================================================================================
	// Skidmore Modal
	// ========================================================================================================================================================================================================
	$.fn.skid_modal = function() {
		// Variables	
		var $modal_container = "";		

		// ==================================================
		// Action Listener - a.fullscreen
		// ==================================================
		$(".fullscreen").click(function() {
			$modal_container = "";
			var $modal_href = $(this).attr("href");
			//var $modal_title = $(this).attr("title");

			// Figure out what kind of lightbox we are doing (vimeo, image, image gallery, iframe)
			// Then format the container for it approprietly
			
			// 1) Vimeo
			if($modal_href.indexOf("https://vimeo.com/") >= 0) {
				var $vimeo_id = $modal_href.replace("https://vimeo.com/", "");
				$modal_container = $modal_container + "<div class='modal-container modal-video'>";
				$modal_container = $modal_container + "<div class='body'><div class='vimeo_video'><iframe src='https://player.vimeo.com/video/"+ $vimeo_id +"?autoplay=1&byline=0&portrait=0' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>";				
				$modal_container = $modal_container + "</div>";
			} else {
				// 2) Image
				// 3) Image Gallery
				// 4) iframe
			}
			
			open_modal();
			return false;
		});
		
		// ==================================================
		// Action Listener - close modal
		// ==================================================
		$("body").on('click', ".modal-close", function() { 
			close_modal();
			return false;
		});
		$("body").on('click', ".modal-overlay", function() { 
			close_modal();
			return false;
		});
		
		// ==================================================
		// function open_modal()
		// ==================================================
		function open_modal() {
			// Remove Scrollbar while modal is open
			$("body").css("overflow-y", "hidden");				

			// Add html to the Page		
			$("body").append("<div class='skid-modal'><div class='modal-overlay'><div class='modal-close'><span class='glyphicon glyphicon-remove'></span></div>"+ $modal_container +"</div></div>");
			
			// Fade it In
			$(".skid-modal").fadeIn('fast');
		}
		
		// ==================================================
		// function close_modal()
		// ==================================================
		function close_modal() {
			$(".skid-modal").fadeOut('fast', function() {
				$(".skid-modal").remove();					
			});				

			// Remove Scrollbar
			$("body").css("overflow-y", "scroll");	
		}
	}; // end skid_modal
	
	
}( jQuery ));


