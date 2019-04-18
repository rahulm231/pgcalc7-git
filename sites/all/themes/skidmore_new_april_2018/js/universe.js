jQuery(function($){	
	"use strict";
	
	// ====================================================================================================
	// Google Analytics Code to track PDF files.
	// ====================================================================================================
	$("a[href$='pdf']").each(function() {
    	var pdfLabel = $(this).attr('href');
      	var pdfOnClick = "_gaq.push(['_trackEvent', 'PDF', 'Download', '" + pdfLabel + "']);";
      	$(this).attr("onClick", pdfOnClick);
    }); 
	
	// ====================================================================================================
	// Vimeo Videos Responsive
	// ====================================================================================================
	// Find all Vimeo videos
	$("iframe[src*='vimeo.com']").wrap("<div class='vimeo_video'></div>");
	$("iframe[src*='youtube.com']").wrap("<div class='vimeo_video'></div>");
	
	
	// ====================================================================================================
	// Easter Egg
	// ====================================================================================================
	console.log("SSSSS   S   S   SSSSS   SSSS    S   S   SSSSS   SSSS    SSSSS   \nS       S  S      S     S   S   SS SS   S   S   S   S   S       \nSSSSS   SSS       S     S   S   S S S   S   S   SSSS    SSSSS   \n    S   S  S      S     S   S   S   S   S   S   S  S    S       \nSSSSS   S   S   SSSSS   SSSS    S   S   SSSSS   S   S   SSSSS   \n");	
	console.log(" SSSS    SSS    S       S       SSSSS   SSSSS   SSSSS\nS       S   S   S       S       S       S       S\nS       S   S   S       S       SSSSS   S SSS   SSSSS\nS       S   S   S       S       S       S   S   S\n SSSS    SSS    SSSSS   SSSSS   SSSSS   SSSSS   SSSSS");

	// ====================================================================================================
	// Smooth Scrolling for # links
	// ====================================================================================================	
	/*
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not("[data-toggle='collapse']")
        .not("[data-toggle='tab']")
        .not(".translate-webpage")
        .not(".toggle-hidden")
        .not(".carousel-control")
        .not(".asset-ctm a")
        .click(function(event) {
    	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			// Figure out element to scroll to			
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');						
			// Does a scroll target exist?
			if (target.length) {				
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					}
				});
			}
		}
	});
    */
	
	
});
