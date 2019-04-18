
// Console Shim
if(typeof console === "undefined") {
    console = {
        log: function() { },
        debug: function() { }
    };
}

/**
 *
 */
var myVideoFilter = new (function($)
{
    var me = this;
	
    me.init = function(elem)
    {
		// pull all categories, and get the list
		// for the drop down
		var cats = [];
		$(".video-sidebar .video-cat").each( function( index,val ) { 
				var val = $(val).html(); 
				if ( val.length > 0 ) {
					cats[val] = 1;
				}
			});
		
		for ( var cat in cats ) { 
			var li = "<li><a href='javascript:void(0)' onclick='myVideoFilter.filter(\""+cat+"\")'>"+cat+"</a></li>";
			$(".video-filters").append( li );
		}
		
		// pull out all the high priority and push to the front
		var lows = $(".videos-list .video-item.low-priority").remove();
		$(".videos-list").append( lows );
    }
	
    me.filter = function( cat ) 
    {
		$(".videos-list li").each( function(index,val) { 
				var tmp = $(val).find(".video-cat").html();
				if ( tmp == cat || cat == "" ) { 
					$(val).show();
				}
				else {
					$(val).hide();
				}
			});
		var name = cat;
		if ( name.length > 20 ) { 
			name = name.substr(0,20) + "...";
		}
		$(".video-header h4").html( name );
		$(".video-filters").hide();
    }
	
    me.toggle = function()
    {
		$(".video-filters").toggle();
    }
	
})(jQuery);



var myCarousel = new (function($) 
{
	var me = this;
	
	me.slideContainer = null;
	me.controlsContainer = null;
	me.num = 0;
	me.current = 0;
	
	/**
	 *
	 */
	me.init = function( elem ) 
	{ 
	    me.controlsContainer = $( ".carousel-controls" );
	    me.slideContainer = $(elem);
	    
	    var items = $(elem).find("li");
	    me.num = items.length;
	    
	    var html = "<li><a class='previous' href='javascript:myCarousel.previous();'>&lt;</a></li>";
	    for ( var i=0;i<me.num;i++ ) { 
			html += "<li><a href='javascript:myCarousel.select("+i+");'>o</a></li>";
	    }
	    html += "<li><a class='next' href='javascript:myCarousel.next();'>&gt;</a></li>";
	    
	    me.controlsContainer.find("ul").append( html );
		
	    me.select(0);

	    setInterval( function() { me.next(); }, 7000 );
	}
	
	me.next = function() 
	{
	    me.current ++;
	    if ( me.current > (me.num - 1) ) { 
			me.current = 0;
	    }
	    me.select( me.current );
	};
	
	me.previous = function() 
	{
	    me.current --;
	    if ( me.current < 0 ) { 
			me.current = me.num - 1;
	    }
	    me.select( me.current );
	};
	
	me.select = function(which) 
	{
	    me.current = which;
		
	    // hide all LIs, show current
	    me.slideContainer.find( "li" ).hide();
	    me.slideContainer.find( "li:eq("+which+")" ).show();
		
	    // add current to li
	    me.controlsContainer.find( "li" ).removeClass("current");
	    me.controlsContainer.find( "li:eq("+(me.current+1)+")" ).addClass("current");
	}
	
})(jQuery);



/**
 * SPLASH Functions
 */

var splash;
var splashes = [
    {
	"start":"Thur May 07 2015 00:00:01 GMT-0400 (EDT)",
	"end":"Mon May 25 2015 23:58:00 GMT-0400 (EDT)",
	"link":'http://action.farmsanctuary.org/site/Donation2?df_id=13840&13840.donation=form1',
	"image":'/wp-content/themes/farmsanctuary/images/splash-20150505.jpg',
	"cookie":"ce-splash-",
	"cookieExpire":"Sunday, 31-May-2015 23:59:59 GMT"
    },
    {
	"start":"Mon May 25 2015 23:59:00 GMT-0400 (EDT)",
	"end":"Sun May 31 2015 23:58:00 GMT-0400 (EDT)",
	"link":'http://action.farmsanctuary.org/site/Donation2?df_id=13840&13840.donation=form1',
	"image":'/wp-content/themes/farmsanctuary/images/splash-20150505.jpg',
	"cookie":"ce-splash-",
	"cookieExpire":"Sunday, 31-May-2015 23:59:59 GMT"
    }
];


/**
 * 
 */
function splashCheck() {
    console.log( "splash: check" );

    var debug = (window.location.search.indexOf( "debug" ) != -1);

    for ( var i=0;i<splashes.length;i++ ) { 

	// test each splash, and break on the first that matches current day
	splash = splashes[i];

	console.log( "splash: testing splash: " + i );
	console.log( "splash: start: " + splash.start );
	console.log( "splash: end: " + splash.end );

	// use a time based check to show 
	var startTime = (new Date(splash.start)).getTime();
	var endTime = (new Date(splash.end)).getTime();
	var curTime = (new Date()).getTime();
	var showIt = false;
	
	// create the cookie name dynamically from the start time
	splash.cookie = splash.cookie + startTime;
	
	// check if time is within threshold or if roadblock is in the url for testing
	if ( debug ||
	     (curTime > startTime && curTime < endTime) || 
	     (window.location.search.indexOf( "roadblock" ) != -1) ) {
	    showIt = true;
	    console.log( "splash: splash time is now" );
	    break;
	}
	else {
	    console.log( "splash: time is not in threshold and roadblock is not in url" );
	}
    }
    
    // check for the cookie that they'd seen the "roadblock"
    if ( debug || (showIt && document.cookie.indexOf(splash.cookie + "=true") == -1) ) {
	console.log( "splash: creating splash modal" );

	var roadblock = jQuery("<div class='ce-roadblock-modal'><div class='modal-background'></div><div class='modal-content'><a href='#' onclick='splashDonate();'><img class='ce-roadblock' src='"+splash.image+"' /></a></div></div>");
	jQuery("body").append(roadblock);
	jQuery(".modal-background").fadeTo( 0, 0.8 );

	var w = window.innerWidth; // * window.devicePixelRatio; //jQuery("#page").width();
	var h = window.innerHeight; //jQuery("body").height();
	//if ( debug ) alert( window.devicePixelRatio );
	//if ( debug ) alert ( w );

	roadblock.width( w );
	roadblock.height( h );

	var bg = roadblock.find(".modal-background");
	bg.width( w + "px" );
	bg.height( h + "px" );

	// dynamically set left to center
	var img = roadblock.find(".modal-content");
	if ( w > 480 ) {
	    img.css( { "left": (w/2 - 340) + "px" } );
	}
		
	img.append( "<a class='ce-roadblock-skip' href='#' onclick='splashClose();'><img src='/wp-content/themes/farmsanctuary/images/splash-skip-cta.png'></a>" );
	
	roadblock.find("img").load( function() {
	    jQuery(".modal-content").animate( {"top":"75px"},300 );
	});
    }
    else {
	console.log( "splash: already cookied, not showing splash" );
    }
}

function splashDonate() {
    console.log( "splash: donate" );
    splashClose();
    window.location = splash.link;
}

function splashClose() {
    console.log( "splash: close" );
    // set a cookie
    if ( document.cookie.indexOf(splash.cookie + "=true") == -1 ) {
        var val = document.cookie;
	var cookie = splash.cookie+"=true; expires="+splash.cookieExpire+"; path=/";
	val = val + "; " + cookie;
	document.cookie = cookie;
    }

    // close modal
    jQuery(".modal-content").animate( {"top":"-1000px"},300, function() {
        jQuery(".ce-roadblock-modal").remove();
    });
}


jQuery(document).ready( function() 
{ 
    // start carousel rotation
    myCarousel.init( ".home-heros" );
    
    // init vidoe if on page
    if ( jQuery(".video-sidebar").length > 0 ) { 
	myVideoFilter.init();
    }
    
    // 
    jQuery("a").each( function( index, link ) { 
	    var href = jQuery(this).attr("href");
	    if ( href.indexOf("album=") > 0 ) { 
		jQuery( this ).attr( 'href', href + "#content" );
	    }
	});

    //console.log("ready");
    // add the menu button to the page
    jQuery('header#branding').prepend( '<a id="menu-toggle" href="javascript:void(0);">menu</a>' );
    jQuery("#menu-toggle").click( function() { 
	jQuery('nav#access').toggle();
    });

    setTimeout( splashCheck, 1000 );
});
