jQuery(document).ready(function() {
	 jQuery("#gotosearch").click(function(){
		 jQuery("header").addClass("mobileHeaderResize");
	 });
	
	
	jQuery("#ContentToplinks ul li:first-child").addClass("first");
	jQuery("#ContentToplinks ul li:last-child").addClass("last");
	jQuery("#ContentToplinks ul").append('<div class="clear"></div>');
	jQuery("#ContentBreadCrumbs").append('<div class="clear"></div>');
	jQuery("#ContentSearch").wrapInner('<div class="searchModuleWrapper" title="Search"></div>');
	jQuery("#ContentMemberTools ul").append('<div class="clear"></div>');
	jQuery("#ContentMemberTools ul li:last-child").addClass("last");
	jQuery(".rightColWrapper:first").addClass("first");
	
	if (jQuery("ul").hasClass("imod-cms-menu2")){
		/* find image sizes / This only works with items that have a class added to them */
		jQuery("#MainBody").find("img.imodImgSize").wrap("<div class='imodImgWrap'></div>");
		jQuery(".imodImgWrap").append("<span class='findImgSize'><span class='fa fa-info-circle'></span></span>");
		/* get images native size (before being resized by max-width */
		// Get on screen image
		jQuery(".findImgSize").click(function() {
			jQuery(this).parent().parent().removeAttr("href");
			var image = new Image();
			image.src = jQuery(this).parent().find("img").attr("src");
			alert('width: ' + image.naturalWidth + ' and height: ' + image.naturalHeight);
		});
	}
	/********************************************/
	/* find parent of selected li. Travel up the DOM to the closest li and apply the selected class. */
	
	jQuery("#ContentLeftNav ul#nav3 li.selected").parent().closest("li").addClass("selected");
	jQuery("#ContentLeftNav ul#nav4 li.selected").parent().closest("li").addClass("selected");
	jQuery("#ContentLeftNav ul#nav5 li.selected").parent().closest("li").addClass("selected");

	jQuery("#cid_591_SendPage").parent().addClass("hideItem");
	
	jQuery(".eventWrapper .imodDateMonthAbrev").parent().addClass("imodDateBlock");
	
	/* news pattern */
	jQuery(".impactNews .newsWrapper").first().addClass("alpha");
  	jQuery(".impactNews .newsWrapper").last().addClass("omega");
	jQuery("#ContentMiddle .newsWrapper").first().addClass("alpha");
  	jQuery("#ContentMiddle .newsWrapper").last().addClass("omega");
	
	/* hover over thumbnail image / add class to highlight text */
	jQuery( ".newsWrapperInternal" ).hover(
	function() {
		jQuery( this,".imodLink a" ).addClass( "addHover" );
		}, function() {
		jQuery( this,".imodLink a" ).removeClass( "addHover" );
		}
	);
		
			
	/* full width nav */
	jQuery('.full-width').horizontalNav({});
	jQuery("#ContentToplinks li.alignMid a").wrapInner("<span class='linkSm'></span>");
	
	  
  	/* randomly changes the background image on structWrapper */
	jQuery(".structWrapper").addClass("bg" + Math.round(Math.random() * 15));//number of backgrounds (0-16)

	
/* fade in "go to top" button */
	// Show or hide the sticky footer button (TOP button)
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > 200) {
			jQuery('.go-top').fadeIn(200);
		} else {
			jQuery('.go-top').fadeOut(200);
		}
	});
	
	// Animate the scroll to top
	jQuery('.go-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, 300);
	});



 //Main nav on touchscreen
       if(jQuery('html').hasClass('touch')) {
               jQuery("#ContentToplinks > ul > li > a").click(function() {
                       if(jQuery(this).next().is("ul")) {
                               if(jQuery(this).hasClass("open")) {
                                       window.location = jQuery(this).attr("href");
                               }
                               else {
                                       jQuery('#ContentToplinks .open').removeClass('open');
                                       jQuery(this).addClass('open');
                                       return false;
                               }
                       }
               });
       } 

	/* makes youtube iframe and vimeo embed videos responsive */
	/* this interferes with iModules frames ... need to find another way ... this may need to be added manually */
	/*jQuery("#ContentMiddle iframe").wrap('<div class="video-container"></div>');
	jQuery("#ContentMiddle object").wrap('<div class="video-container"></div>');
	jQuery("#ContentMiddle embed").wrap('<div class="video-container"></div>');*/
	
/* add functionality to main nav for mobile */
/*	jQuery("#ContentToplinks ul").addClass("showUL");
	jQuery("#ContentToplinks").append("<div class='menuMobile'><i class='icon-list-ul'></i></div>");*/
	
 // hides the #contenttoplinks as soon as the DOM is ready
 // jQuery('#contenttoplinks').hide();
 
 // toggles the #contenttoplinks on clicking the noted link  
/*	jQuery('.menuMobile').click(function() {
	jQuery('#ContentToplinks ul.showUL').toggleClass('hideUL');
	});*/
   
/* identify if browser is less than a certain size */
/*	jQuery("#ContentLeftNav li.selected a:first").removeAttr("href").css("cursor","pointer");
	jQuery("#ContentLeftNav li.selected").click(function() {
		jQuery("#ContentLeftNav li.selected ul").toggleClass("showUL");
	});*/


	
//When page loads...
	jQuery(".tab_content").hide(); //Hide all content
	jQuery(".tabNav li:first").addClass("active").show(); //Activate first tab
	jQuery(".tab_content:first").show(); //Show first tab content

	//On Click Event
	jQuery(".tabNav li").click(function() {
		jQuery(".tabNav li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab_content").hide(); //Hide all tab content

		var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});
	
	//Interior Featured News Pattern
	var divs = jQuery(".newsWrapperInternal");
	for(var i=0; i<divs.length;) {
	  i += divs.eq(i).nextUntil(':not(.newsWrapperInternal)').andSelf().wrapAll('<div class="newsWrapperInternalWrap"></div>').length;
	}
	jQuery('.newsWrapperInternalWrap').each(function(){
		var staff= jQuery(".newsWrapperInternal", this);
		for(var i = 0; i < staff.length; i+=3) {
		  staff.slice(i, i+3).wrapAll("<div class='newsWrapperInternalRow'></div>");
		};
	});


});