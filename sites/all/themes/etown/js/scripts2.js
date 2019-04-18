// JavaScript Document

// Start Main menu mobile
jQuery(function() {
	var items = jQuery('.overlapblackbg, .slideLeft');
	var wsmenucontent = jQuery('.wsmenucontent');
	
	var menuopen = function() {
	jQuery(items).removeClass('menuclose').addClass('menuopen');
						}
	var menuclose = function() { 
	jQuery(items).removeClass('menuopen').addClass('menuclose');
	}

	jQuery('#navToggle').click(function(){
		if (wsmenucontent.hasClass('menuopen')) {jQuery(menuclose)}
		else {jQuery(menuopen)}
	});
	wsmenucontent.click(function(){
		if (wsmenucontent.hasClass('menuopen')) {jQuery(menuclose)}
	});
	
	jQuery('#navToggle,.overlapblackbg').on('click', function(){
	jQuery('.wsmenucontainer').toggleClass( "mrginleft" );
	});

	jQuery('.wsmenu-list li').has('.wsmenu-submenu, .wsmenu-submenu-sub, .wsmenu-submenu-sub-sub').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
	
	jQuery('.wsmenu-list li').has('.megamenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>');
		
	jQuery('.wsmenu-mobile').click(function(){
		jQuery('.wsmenu-list').slideToggle('slow');
	});
	jQuery('.wsmenu-click').click(function(){
	jQuery(this).siblings('.wsmenu-submenu').slideToggle('slow');
	jQuery(this).children('.wsmenu-arrow').toggleClass('wsmenu-rotate');
	jQuery(this).siblings('.wsmenu-submenu-sub').slideToggle('slow');
	jQuery(this).siblings('.wsmenu-submenu-sub-sub').slideToggle('slow');
	jQuery(this).siblings('.megamenu').slideToggle('slow');
		
	});

});
// end main menu mobile

// start main menu on click 

	var removeClass = window.matchMedia("screen and (min-width: 781px)")
	jQuery(window).load(function(){
	jQuery('.wsmenu-list > li > a').on('click', function(){
    if(!jQuery(this).parents().hasClass('onclickopen')){
        jQuery('.wsmenu-list > li').removeClass('onclickopen');    
    }
    jQuery(this).parent().addClass('onclickopen');
	removeClass = false;
	});
	
	jQuery('.wsmenu-submenu > li > a').on('click', function(){
    if(!jQuery(this).parents().hasClass('onclickopen02')){
        jQuery('.wsmenu-submenu > li > a').removeClass('onclickopen02');    
    }
    jQuery(this).parent().addClass('onclickopen02');
	removeClass = false;
	});
	
	jQuery('.wsmenu-submenu-sub > li > a').on('click', function(){
    if(!jQuery(this).parents().hasClass('onclickopen03')){
        jQuery('.wsmenu-submenu-sub > li > a').removeClass('onclickopen03');    
    }
    jQuery(this).parent().addClass('onclickopen03');
	removeClass = false;
	});
	
	
	jQuery("body").click(function () {
    if (removeClass){
        jQuery(".wsmenu-list > li").removeClass('onclickopen');
		jQuery(".wsmenu-submenu > li").removeClass('onclickopen02');
		jQuery(".wsmenu-submenu-sub > li").removeClass('onclickopen03');
    }
    removeClass = true;
	});

		jQuery(document).keydown(function(e){
			if(e.keyCode == 27) {
				if (jQuery('.wsmenu-list > li').hasClass('onclickopen')) {
					jQuery('.wsmenu-list > li').removeClass('onclickopen');
				} 
			}
		});

		
	jQuery(".megamenu").click(function(e){
    e.stopPropagation();
	});
	 
});


// end main menu on click



// start header-video
// end header-video


// start side nav

jQuery(function(){
	jQuery(".dropdown-menu > li > a.trigger").on("click",function(e){
		var current=jQuery(this).next();
		var grandparent=jQuery(this).parent().parent();
		if(jQuery(this).hasClass('down-caret')||jQuery(this).hasClass('left-caret'))
			jQuery(this).toggleClass('left-caret down-caret');
		grandparent.find('.down-caret').not(this).toggleClass('left-caret down-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	jQuery(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=jQuery(this).closest('.dropdown');
		root.find('.down-caret').toggleClass('left-caret down-caret');
		root.find('.sub-menu:visible').hide();
	});
});


// parallax

jQuery(document).ready(function(){
   // cache the window object
   jQuerywindow = jQuery(window);
 
   jQuery('section[data-type="parallax"]').each(function(){
     // declare the variable to affect the defined data-type
     var jQueryscroll = jQuery(this);
                     
      jQuery(window).scroll(function() {
        // HTML5 proves useful for helping with creating JS functions!
        // also, negative value because we're scrolling upwards                             
        var yPos = -(jQuerywindow.scrollTop() / jQueryscroll.data('speed')); 
         
        // background position
        var coords = '50% '+ yPos + 'px';
 
        // move the background
        jQueryscroll.css({ backgroundPosition: coords });    
      }); // end window scroll
   });  // end section function
}); // close out script




// random show

jQuery(document).ready(function() {
var random = Math.floor(Math.random() * jQuery('.random-load').length);
jQuery('.random-load').hide().eq(random).show();
});

jQuery(document).ready(function() {
var random = Math.floor(Math.random() * jQuery('.random-load2').length);
jQuery('.random-load2').hide().eq(random).show();
});

jQuery(document).ready(function() {
var random = Math.floor(Math.random() * jQuery('.random-load3').length);
jQuery('.random-load3').hide().eq(random).show();
});

jQuery(document).ready(function() {
var random = Math.floor(Math.random() * jQuery('.random-load4').length);
jQuery('.random-load4').hide().eq(random).show();
});



// major minors programs search 
/*
jQuery(document).ready(function() {
		jQuery('#search-programs').hideseek({
			nodata: 'No results found',
			navigation: true
		});
});

// major minors programs search 
jQuery(document).ready(function() {
		jQuery('#hideseek').hideseek({
			nodata: 'No results found',
			navigation: true
		});
});
*/


// side nav add class active
jQuery(document).ready(function() {
    var url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/jQuery/,'') + "jQuery"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
        // now grab every link from the navigation
        jQuery('.nav li a').each(function(){
            // and test its normalized href against the url pathname regexp
            if(urlRegExp.test(this.href.replace(/\/jQuery/,''))){
                jQuery(this).addClass('active');
            }
        });

});


//smooth scroll test
jQuery(document).ready(function(jQuery) {
 
	jQuery(".scroll").click(function(event){		
		event.preventDefault();
		jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top}, 500);
	});
});


//link to accordian expanded from another page
jQuery(document).ready(function () {
    if(location.hash != null && location.hash != ""){
        jQuery('.collapse').removeClass('in');
        jQuery(location.hash + '.collapse').collapse('show');
    }
});

//CCM Used to set cookies and toggle classes on/off (for smart toggling of content based on actions)
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1)}if(c.indexOf(name)==0){return c.substring(name.length,c.length)}}return""}function CookieClassOn(cname){var strOn=getCookie(cname);if(strOn!=""){jQuery('.'+strOn).show()}}function CookieClassOff(cname){var strOff=getCookie(cname);if(strOff!=""){jQuery('.'+strOff).hide()}}


//DAN 7-13-17 Used to add active to left side nav level 1/2 submenu so it shows inline for wayfinding
jQuery(window).load(function(){
	
jQuery('.dropdown-menu .sub-menu li a').each(function() {
  if (jQuery(this).hasClass('active')) {
    jQuery(this).closest('.sub-menu').siblings('a.trigger').addClass("active");
    jQuery(this).parent('.dropdown-menu').siblings('dropdown-toggle').addClass("active");

	}
});	

jQuery('.dropdown li a').each(function() {
  if (jQuery(this).hasClass('active')) {
    jQuery(this).closest('.dropdown-menu').siblings('a.dropdown-toggle').addClass("active");
  }
});

});	

