/*
 WARNING: This file is part of the core Ultimatum framework. DO NOT edit
 this file under any circumstances.
 */

/**
 *
 * This file is a core Ultimatum file and should not be edited.
 *
 * @package  Ultimatum
 * @author   Wonder Foundry http://www.wonderfoundry.com
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     http://ultimatumtheme.com
 * @version 2.50
 */

/*
 * Function for generating the overlays on gallery items
 */
function ultimatum_image_hover(elements)
    {
    	if(!elements) elements = jQuery('a.overlayed_image');
		var overlay = "", isMobile 	= 'ontouchstart' in document.documentElement;
		if(isMobile) return; 
		elements.on('mouseenter', function(e)
		{
			var link  		= jQuery(this),
				current	 	= link.find('img:first'),
				url		 	= link.attr('href'),
				span_class	= "overlay-type-"+link.attr('data-overlay'),
				opa			= 0.7;

			overlay = link.find('.image-overlay');
			if(!overlay.length)
			{
				if(current.outerHeight() > 50)
				{
				if(!link.css('position') || link.css('position') == 'static') { link.css({ overflow:'hidden',height:'auto',display:'inline'}); }
				overlay = jQuery("<span class='image-overlay "+span_class+"' style='opacity: 0;'><span class='image-overlay-inside'></span></span>").appendTo(link);
				}
			}
			if(current.outerHeight() > 50)
			{
				overlay.css({left:current.position().left + parseInt(current.css("margin-left"),10), top:current.position().top + parseInt(current.css("margin-top"),10)})
					   .css({display:'block','height':current.outerHeight(),'width':current.outerWidth()}).stop().animate({opacity:opa}, 400);
			}
			else
			{
				overlay.css({display:"none"});
			}
		}).on('mouseleave', elements, function(){

			if(overlay.length)
			{
				overlay.stop().animate({opacity:0}, 400);
			}
		});
    }
jQuery(".ult_button").hover(function() {
    var jQueryhoverBg = jQuery(this).attr('data-hoverBg');
    var jQueryhoverColor = jQuery(this).attr('data-hoverColor');

    if (jQueryhoverBg !== undefined) {
        jQuery(this).css('background-color', jQueryhoverBg);
    }
    if (jQueryhoverColor !== undefined) {
        jQuery('.btn-text', this).css('color', jQueryhoverColor);
    }
}, function() {
    var jQueryhoverBg = jQuery(this).attr('data-hoverBg');
    var jQueryhoverColor = jQuery(this).attr('data-hoverColor');
    var jQuerybg = jQuery(this).attr('data-bg');
    var jQuerycolor = jQuery(this).attr('data-color');

    if (jQueryhoverBg !== undefined) {
        if (jQuerybg !== undefined) {
            jQuery(this).css('background-color', jQuerybg);
        } else {
            jQuery(this).css('background-color', '');
        }
    }
    if (jQueryhoverColor !== undefined) {
        if (jQuerycolor !== undefined) {
            jQuery('.btn-text', this).css('color', jQuerycolor);
        } else {
            jQuery('.btn-text', this).css('color', '');
        }
    }
});

jQuery("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',default_width: 900,default_height: 450,theme:pptheme,show_title:false,deeplinking:false,social_tools:''});
jQuery("a.prettyPhoto").prettyPhoto({animation_speed:'normal',default_width: 900,default_height: 450,theme:pptheme,show_title:false,deeplinking:false,social_tools:''});


jQuery(function() {

	jQuery('.accordion').on('show', function (e) {
		jQuery(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    });
    
	jQuery('.accordion').on('hide', function (e) {
		jQuery(this).find('.accordion-toggle').not(jQuery(e.target)).removeClass('active');
    });
        
});

  


jQuery(".ultimatum-responsive-menu").each(function () {
	var form = jQuery('.responsive-nav-form select',this);
	jQuery(form).change(function() {
		window.location = jQuery(this).find("option:selected").val();
 });
 
});
 jQuery(document).ready(function() {
	ultimatum_image_hover();
	jQuery('.ui-tabs-nav li').click(function() {
		setTimeout(function() {
			jQuery(window).trigger('resize');
			}, 300);
		}); 
	if ( jQuery.isFunction(jQuery.fn.fitVids) ) {
		jQuery(".wrapper").fitVids();
	}
});
var viewportWidth = jQuery(window).width();
jQuery(".ultimatum-menu-container").each(function () {
	var width = jQuery(this).attr('data-menureplacer');
	if(width>=viewportWidth){
		jQuery(".ultimatum-regular-menu",this).hide();
		jQuery(".ultimatum-responsive-menu",this).show();
	} else {
		jQuery(".ultimatum-regular-menu",this).show();
		jQuery(".ultimatum-responsive-menu",this).hide();
	}
  });
jQuery(window).resize(function() {
	viewportWidth = jQuery(window).width();
	jQuery(".ultimatum-menu-container").each(function () {
		var width = jQuery(this).attr('data-menureplacer');
		if(width>=viewportWidth){
			jQuery(".ultimatum-regular-menu",this).hide();
			jQuery(".ultimatum-responsive-menu",this).show();
		} else {
			jQuery(".ultimatum-regular-menu",this).show();
			jQuery(".ultimatum-responsive-menu",this).hide();
		}
	  });
});

		    


