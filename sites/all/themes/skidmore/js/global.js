jQuery(function($){
	// ====================================================================================================
	// jQuery Date Picker for OU Forms
	// ====================================================================================================
	$(".datepicker input").datepicker({
		dateFormat: 'mm/dd/yy'
	});
	
	
	// ====================================================================================================
	// Google Analytics Code to track PDF files.
	// ====================================================================================================
	$("a[href$='pdf']").each(function(index) {
    	pdfLabel = $(this).attr('href');
      	pdfOnClick = "_gaq.push(['_trackEvent', 'PDF', 'Download', '" + pdfLabel + "']);";
      	$(this).attr("onClick", pdfOnClick);
    }); 
	
	
	// ====================================================================================================
	// ColorBox PopUp
	// ====================================================================================================
	if($.colorbox) { $(".popUpImage").colorbox({rel: "group", maxWidth: "80%"}); } 
	
	
	// ====================================================================================================
	// Snippets - Used with OU Campus 
	// ====================================================================================================	
	// ========== Read More ==========
	$(".snippetReadMoreLink a").click(function() {
		var parent_container = $(this).parents(".snippetReadMore");
		parent_container.find(".snippetReadMoreTxt").animate({ height: 'toggle' }, function() {
			var pageH = 0;
			pageH = $(document).height();
			$("#navCol").height(pageH);	
		});
		
		var linkWording = $(this).html();
		if(linkWording == "Less") {
			$(this).html("More");
			$(this).css("background-image", "url(/_resources/icons/icon-arrow-right-darkgrey.png)");
		} else {
			$(this).html("Less");
			$(this).css("background-image", "url(/_resources/icons/icon-arrow-down-darkgrey.png)");
			
		}
		
		return false;
	});
	
	// ========== Read More - Lists ==========
	$(".list-more").on("click", ".list-more-link", function() {		
		var parent_list_more = $(this).parent(".list-more");
		
		if($(this).find("span").html() === "+") {
			$(this).find("span").html("-");		
			parent_list_more.find(".list-more-group").css("display","block");
		} else {
			$(this).find("span").html("+");		
			parent_list_more.find(".list-more-group").css("display","none");	
		}
		
		return false;
	});

	
	// ====================================================================================================
	// Vimeo Videos Responsive
	// ====================================================================================================
	// Find all YouTube videos
	var $allVideos = $("iframe[src^='vimeo.com']");
	
    $allVideos.each(function() {
	  $(this).wrap("<div class='vimeo_video'></div>");
	});

	
	// ====================================================================================================
	// Table Transformations
	// ====================================================================================================
	// ===== Image Reveal =====
	$(window).load(function() {
		$(".tt-image-reveal .canvas").each(function() {
			// Set width and height for containers
			var image_width = $(this).children(".top-image").children("img").outerWidth();
			var image_height = $(this).children(".top-image").children("img").outerHeight();
			console.log(image_width);
			console.log(image_height);
			
			$(this).children(".top-image").css("width", image_width + "px");
			$(this).children(".top-image").css("height", image_height + "px");
			$(this).children(".bottom-image").css("width", image_width + "px");
			$(this).children(".bottom-image").css("height", image_height + "px");
			$(this).css("width", image_width + 64 + "px");
			$(this).css("height", image_height + "px");
			
			// Add the Scroll Bar
			$(this).append("<div class='tt-image-reveal-scroll'></div>"); 
			
			// Center the Scroll Bar
			var scroll_top = (image_height / 2) - 32;	
			$(this).children(".tt-image-reveal-scroll").css("top", scroll_top + "px"); 
		});
		
		$( ".tt-image-reveal-scroll" ).draggable({containment: ".canvas", axis: "x", drag: function() {
			var drag_left = parseInt($(this).css("left")); 
			$(this).parent().children(".top-image").css("width", drag_left+ "px");
		}});
	});
});

