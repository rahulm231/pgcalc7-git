$(document).ready(function() {

$(".pictureSlider .fsElementSlideshow").slick({
    dots: false,
    arrows: true,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000
});

$(".fsPrevButton").on("click", function(){
    $(".slick-prev").click();
});

$(".fsNextButton").on("click", function(){
    $(".slick-next").click();
});

$(".newsSlider .fsElementSlideshow").slick({
    arrows: false,
    dots: true,
    dotsClass: "fsPager",
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000
});

$(".fsPager li").each(function(){
    $(this).html("<button type=\"button\" data-role=\"none\"></button>");
});

//Adds class to news posts with thumbnail
$('.fsNews article').each(function() {
	if($(this).find('.fsThumbnail').length > 0) {
		$(this).addClass('thumbnail-active');
	}
});



function backgroundImage($element) {

  backgroundElement = $element;

  $(backgroundElement).each(function() {

    var image = $(this).find('img').attr('src');

    $(this).css('background-image', 'url(' + image + ')');

  });

}



//Debouncing for Window Resize Events
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};



//SEARCH
//Search Toggle
$('#fsHeader .fsSearch header a').on('click', function() {
	$('body').addClass('search-active');
});

//Search Element Timer/Code
var checkGoogleSearch = setInterval(function(){
      if($('#___gcse_0').length > 0){
      	clearInterval(checkGoogleSearch);

        $('body').on('click', function() {
			$('body').removeClass('search-active');
		});

		$('.fsSearch header a, input.gsc-input').on('click', function(e) {
		    e.stopPropagation();
		});
      }
},100);



//Move Google Translate 
$('#google_translate_element').appendTo('#fsHeader .nav-util ul:first-child li:last-child');


//MENUS
/*Off Canvas Menu Options*/
var offCanvasMenu = true, //Boolean
	menuBP = 1120, //Mobile Menu Trigger Breakpoint
    menuAlignment = 'top', //Options: left, right, top, or null
    headerItemsToClone = ['.nav-main', '.nav-util']; //List what you need

//Off Canvas Menu
if(offCanvasMenu == true) {

	$('<div class="nav-offcanvas">').prependTo('body');

	$('#fsHeader .nav-main header a').on('click', function() {
		$('body').toggleClass('menu-active');

		return false;
	});

	$.each(headerItemsToClone, function(i, val) {
	    $(val).clone().appendTo('.nav-offcanvas');
	});

	$('.nav-offcanvas .nav-util ul:first-child li:last-child #google_translate_element').remove();

	if($(window).outerWidth() < menuBP) {
		$('#fsHeader .header-top .fsSearch').appendTo('#fsHeader .nav-main header .fsElementHeaderContent');
	}

	if($(window).outerWidth() < 960) {
		$('#fsHeader .nav-util ul:first-child li:last-child #google_translate_element').appendTo('.nav-offcanvas .nav-util ul:first-child li:last-child');
	}

	var menuResize = debounce(function() {
		if($(window).outerWidth() > menuBP) {
			$('body').removeClass('menu-active');

			$('#fsHeader .nav-main .fsSearch').insertAfter('#fsHeader .nav-util');
		} else if($(window).outerWidth() < menuBP) {
			$('#fsHeader .header-top .fsSearch').appendTo('#fsHeader .nav-main header .fsElementHeaderContent');
		}
	}, 250);

	window.addEventListener('resize', menuResize);

	var moveTranslate = debounce(function() {
		if($(window).outerWidth() > 960) {
			$('.nav-offcanvas .nav-util ul:first-child li:last-child #google_translate_element').appendTo('#fsHeader .nav-util ul:first-child li:last-child');
		} else if($(window).outerWidth() < 960) {
			$('#fsHeader .nav-util ul:first-child li:last-child #google_translate_element').appendTo('.nav-offcanvas .nav-util ul:first-child li:last-child');
		}
	}, 250);

	window.addEventListener('resize', moveTranslate);

}



/*Collapsible Menu Variables*/
var collapsibleMenu = false, //Boolean
    menuToBeCollapsed = '.secondaryNav', //Either .mainNav or .secondaryNav or alternatively .desktopNav or .mobileNav (used in theme 4)
    menuBtnText = 'In This Section'; //anything you want

//Collapsible Menu
if(collapsibleMenu == true) {
	$(''+menuToBeCollapsed+' .fsElementContent').shrinkToBtn({
	    btnHTML : '<div class="stbBtn"><span>'+menuBtnText+'</span></div>',
	    containerID : 'nav5',
	    animate : true
	});
}


//Smart Header
$('.header-top:not(.fsStateEditable), .nav-container:not(.fsStateEditable)').wrapAll('<div class="supah-smaht-headah"></div>').parents('body').addClass('smaht-headah-active');

var smartHeader = document.getElementsByClassName("supah-smaht-headah")[0];
var headroom = new Headroom(smartHeader, {
	"offset": 240,
	"tolerance": 5,
	"classes": {
		"initial": "animated",
		"pinned": "slideDown",
    	"unpinned": "slideUp"
	}
});

headroom.init();



//Google Translate
$('.goog-te-menu-frame').wrap('<div class="frame-wrap">');



/*Moves Leftbanner for Tablet on down*/
enquire.register('screen and (max-width: 850px)', {

	match: function() {
		$('#fsBannerLeft').insertAfter('#fsBannerRight');
	},
	unmatch: function() {
		$('#fsBannerLeft').prependTo('#fsPageBody');
	}

});



/*Landing Page Slider*/
$('.landing-slider .fsThumbnail').on('click', function() {
	return false;
});


/*College Matriculation Sliders*/
imagesLoaded($('.logo-scroller-small:not(.fsStateEditable) ul'), function() {

	$('.logo-scroller-small:not(.fsStateEditable) ul').on('init', function(event, slick){
		// var trackHeight = $(this).find('.slick-track').outerHeight();
		// $(this).find('li.slick-slide').css('height', trackHeight).parents('.logo-scroller-small').addClass('heightCalculated');
	
		$(this).find('.slick-dots').prependTo($(this).parents('.fsElementContent'));
	});


	$('.logo-scroller-small:not(.fsStateEditable) ul').slick({
		autoplay: true,
		autoplaySpeed: 6000,
		dots: true,
		arrows: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					adaptiveHeight: false
				}
			}
		]
	});


	if($('.logo-scroller-small:not(.fsStateEditable) header').length > 0) {
		$('.logo-scroller-small:not(.fsStateEditable)').each(function() {
			$(this).addClass('headerEnabled');
		});
	}
});



imagesLoaded($('.logo-scroller-full:not(.fsStateEditable) ul'), function() {

	$('.logo-scroller-full:not(.fsStateEditable) ul').on('init', function(event, slick){
		// var trackHeight = $(this).find('.slick-track').outerHeight();
		// $(this).find('li.slick-slide').css('height', trackHeight).parents('.logo-scroller-full').addClass('heightCalculated');
	
		$(this).find('.slick-dots').prependTo($(this).parents('.fsElementContent'));
	});


	$('.logo-scroller-full:not(.fsStateEditable) ul').slick({
		autoplay: true,
		autoplaySpeed: 6000,
		dots: true,
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					adaptiveHeight: false
				}
			}
		]
	});
});





//Homepage Specific JS
if($('body').hasClass('home-page')) {
	$('.home-video footer').on('click', function() {
		$('.home-video').toggleClass('video-desc-off');

		return false;
	});


	// $('.slider-ltr, .slider-rtl').each(function() {
	// 	$(this).find('.fsBody').wrapInner('<div class="content-wrap"></div>');
	// });

	$('.slider-rtl').each(function() {
		$(this).find('> header').insertAfter($(this).find('> .fsElementContent'));
	});

	$('.slider-rtl article, .slider-ltr article').each(function() {
		$(this).find('.fsBody').wrapInner('<div class="content-wrap"></div>');

		$(this).find('a.fsThumbnail, .fsTitle a').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();

			return false;
		}).css('cursor', 'default');

		if (!$(this).find('.content-wrap').text().trim().length) {
        	$(this).find('.fsBody').addClass("body-empty");
    	}
	});

	$('.slider-ltr header, .slider-rtl header').append('<a href="#" class="next-slide"></a>');


	//Generates Random Intervals
	var min = 3;
	var max = 8;

	enquire.register('screen and (max-width: 530px)', {
		setup : function() {
			var x = Math.floor(Math.random() * (max - min + 1)) + min;
			x = x * 1000;

			$('.slider-rtl:first-child > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "left",
				width: "variable",
				height: "auto",
				align: "right",
				items: {
					visible: 7,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: false,
					timeoutDuration: x
				},
				next: ".slider-rtl:first-child > header .next-slide"
			});

			var y = Math.floor(Math.random() * (max - min + 1)) + min;
			y = y * 1000;
			$('.slider-ltr > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "left",
				width: "variable",
				height: "auto",
				align: "right",
				items: {
					visible: 7,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: false,
					timeoutDuration: y
				},
				prev: ".slider-ltr > header .next-slide"
			});

			var z = Math.floor(Math.random() * (max - min + 1)) + min;
			z = z * 1000;
			$('.slider-rtl:last-child > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "left",
				width: "variable",
				height: "auto",
				align: "right",
				items: {
					visible: 7,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: false,
					timeoutDuration: z
				},
				next: ".slider-rtl:last-child > header .next-slide"
			});
    	},
		match: function() {
			$('.slider-rtl > .fsElementContent .fsListItems, .slider-ltr > .fsElementContent .fsListItems').trigger('destroy');

			$('.slider-rtl > header, .slider-ltr > header').on('click', function() {
				$(this).siblings('.fsElementContent').slideToggle(500);
				$(this).toggleClass('header-on');
			});
		},
		unmatch: function() {
			$('.slider-rtl > header, .slider-ltr > header').unbind('click');
			$('.slider-rtl > .fsElementContent, .slider-ltr > .fsElementContent').removeAttr('style');

			$('.slider-rtl > .fsElementContent .fsListItems, .slider-ltr > .fsElementContent .fsListItems').trigger('destroy');
			var x = Math.floor(Math.random() * (max - min + 1)) + min;
			x = x * 1000;

			$('.slider-rtl:first-child > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "left",
				width: "variable",
				height: "auto",
				align: "right",
				items: {
					visible: 8,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: true,
					timeoutDuration: x
				},
				next: ".slider-rtl:first-child > header .next-slide"
			});

			var y = Math.floor(Math.random() * (max - min + 1)) + min;
			y = y * 1000;
			$('.slider-ltr > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "left",
				width: "variable",
				height: "auto",
				align: "left",
				items: {
					visible: 8,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: true,
					timeoutDuration: y
				},
				prev: ".slider-ltr > header .next-slide"
			});

			var z = Math.floor(Math.random() * (max - min + 1)) + min;
			z = z * 1000;
			$('.slider-rtl:last-child > .fsElementContent .fsListItems').caroufredsel({
				circular: true,
				infinite: true,
				direction: "right",
				width: "variable",
				height: "auto",
				align: "right",
				items: {
					visible: 8,
					width: 280,
					height: 200
				},
				scroll: {
					items: 1,
					pauseOnHover: true
				},
				auto: {
					play: true,
					timeoutDuration: z
				},
				next: ".slider-rtl:last-child > header .next-slide"
			});
		}

	});



	/*Titans Tell*/
	$('.titans-tell .fsTitle a').on('click', function() {
		return false;
	})

	$('<div class="youtubeModal"><span class="ytmClose">Close</span></div>').appendTo('body');
	$('.titans-tell article').each(function() {
		$(this).find('a[href*="you"]').on('click', function() {
			$('.youtubeModal').addClass('youtubeModal-active');
	
			var youtubeURL = $(this).attr('href');
			youtubeURL = youtubeURL.split("=");
	
			$('<div class="youtubeWrapper"><iframe width="420" height="315" src="https://www.youtube.com/embed/'+youtubeURL[1]+'?autoplay=1" frameborder="0" allowfullscreen></iframe></div>').appendTo('.youtubeModal');
	
	
			return false;
		});
	});
	$('.ytmClose, .youtubeModal').on('click', function() {
		$('.youtubeModal').removeClass('youtubeModal-active');
		$('.youtubeWrapper').remove();
	});


	var titansTell = $('.titans-tell .fsListItems');
	titansTell.on('init', function(event, slick){
		$('.titans-tell .slick-slide:not(.slick-cloned)').each(function(i) {
			var bg = $(this).find('.fsThumbnail img').attr('src');
			$('.titans-tell .slick-dots li').eq(i).find('button').css('background', '#8f948c url('+bg+') center center no-repeat');
		});

		$('.titans-tell .slick-dots').prependTo('.titans-tell .slick-slider');
	});

	// titansTell.slick({
	// 	autoplay: true,
	// 	dots: true,
	// 	arrows: false,
	// 	adaptiveHeight: true,
	// 	// responsive: [
 //  //           {
 //  //               breakpoint: 530,
 //  //               settings: {
 //  //                   slidesToShow: 1,
 //  //                   slidesToScroll: 1
 //  //               }
 //  //           },
 //  //       ]
	// });


	enquire.register("screen and (max-width:530px)", {
	    // OPTIONAL
	    // If supplied, triggered when a media query matches.
	    match : function() {
	    	titansTell.slick('unslick');

	    	titansTell.find('article').slice(0 + 3, titansTell.find('article').length).appendTo($('.titans-tell'));

			titansTell.slick({
				autoplay: true,
				autoplaySpeed: 6000,
				dots: true,
				arrows: false,
				adaptiveHeight: true
			});
	    },

	    // OPTIONAL
	    // If supplied, triggered when the media query transitions
	    // *from a matched state to an unmatched state*.
	    unmatch : function() {
	    	titansTell.slick('unslick');

	    	$('.titans-tell > article').appendTo(titansTell);

			titansTell.slick({
				autoplay: true,
				autoplaySpeed: 6000,
				dots: true,
				arrows: false,
				adaptiveHeight: true
			});
	    },

	    // OPTIONAL
	    // If supplied, triggered once, when the handler is registered.
	    setup : function() {
			titansTell.slick({
				autoplay: true,
				autoplaySpeed: 6000,
				dots: true,
				arrows: false,
				adaptiveHeight: true
			});
	    }
	});


	/*Around Campus*/
	$('.around-campus .fsListItems .fsDayContainer').each(function(){
		$(this).find('article').appendTo($(this).parent('.fsListItems'));
		$(this).remove();
	})

	$('.around-campus .fsListItems').on('init', function(event, slick){
		$('.around-campus .slick-dots').prependTo('.around-campus .slick-slider');
	});

	$('.around-campus .fsListItems').slick({
		autoplay: true,
		autoplaySpeed: 6000,
		dots: true,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
		]
	});



	function loadHomeVideo(jsonVideoURL) {

		$.getJSON(jsonVideoURL, function(data) {

			$.each(data.objects, function(i, object) {
			  	$('<div class="vid-inner"></div>')
    				.append("<video poster="+object.display_path+" src="+object.hd_video_path+" muted loop autoplay /></div>")
    				.prependTo('.home-video .fsMediaContainer');
			});

		}).done(function() {

			$('video').attr('id', 'home-vid');

			$('.home-video').on('click', function() {
				var v = document.getElementById("home-vid");
				v.play();
			});

		}).fail(function() {

			$('.home-video .fsMediaContainer').append('<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>').css('textAlign', 'center');

		});

	}

	$('.home-video').each(function() {
		var jsonVideoURL = $(this).find('.fsMediaCustomPlayer').attr('data-playlisturl');
		loadHomeVideo(jsonVideoURL);
	});

}


if($('body').hasClass('social-mashup')) {

	function loadPhotoSlider(jsonURL, slider) {
		$.getJSON(jsonURL, function(data) {

		  $.each(data.objects, function(i, object) {
		    $('<article class="slide"></article>')
		    .append("<img src="+object.display_path+" /></div>")
		    .appendTo(slider.find('.fsMediaContainer'));
		  });

		  //$('.photo-slider .fsElementContent').prepend('<div class="sliderControls"><a class="homePrev" href="#"></a><a class="homeNext" href="#"></a></div>');

		}).done(function() {

		  slider.find('.fsMediaContainer').slick();

		  backgroundImage(slider.find('.slick-slide'));

		}).fail(function() {

		  slider.find('.fsMediaContainer').append('<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>').css('textAlign', 'center');

		});
	}

	$('.photo-slider').each(function() {
		var thisSlider = $(this);

		var jsonURL = $(this).find('.fsMediaCustomPlayer').attr('data-playlisturl');
		loadPhotoSlider(jsonURL, thisSlider);
	});


	var checkYoutube = setInterval(function(){
	      if($('.fsYoutube iframe').length > 0){
	      	clearInterval(checkYoutube);

			$('.fsYoutube').each(function() {
				backgroundImage($(this));

				$(this).prepend('<span class="youtube-play"></span>');

				$(this).find('> .fsElementContent').prepend('<span class="youtube-close"></span>');

				var youtubeURL = $(this).find('iframe').attr('src');

				$(this).find('.youtube-play').on('click', function() {
					$(this).parents('.fsYoutube').addClass('youtube-vid-active');

					$(this).parents('.fsYoutube').find('iframe').attr('src', youtubeURL + "&autoplay=1&wmode=transparent");
				});
			});

			$('.youtube-close').on('click', function() {
				$(this).parents('.fsYoutube').removeClass('youtube-vid-active');
				$(this).parents('.fsYoutube').find('iframe').removeAttr('src');
			});
	      }
	},100);



	var checkFacebook = setInterval(function(){
	      if($('.fsFacebookListItem').length > 0){
	      	clearInterval(checkFacebook);

			$('.fsFacebookListItem').each(function() {
				$(this).find('.fsFacebookFrom').remove();

      			var length = 150;
      			var myString = $(this).contents().get(0).nodeValue;
      			var myTruncatedString = myString.substring(0,length);

      			$('<p class="truncated-facebook-text"></p>').prependTo($(this));
      			$(this).find('.truncated-facebook-text').text(myTruncatedString + '... ');
      		});

      		$('.fsFacebookFollow a').text('More on Facebook');
	      }
	},100);



	//Twitter feed hack
	// $(function(){

	//   var checkTwitter = setInterval(function(){
	//     if( $('body').data('data-twttr-id') === "twttr-sandbox-0" ){
	//       renderTweets();
	//       clearInterval(checkTwitter);
	//     }
	//   },100);


	// });

	renderTweets();

	function renderTweets(){

	  var checkTweets = setInterval(function(){
	    if( $('#twitter-widget-0').contents().find('.tweet').length > 0 ){
	      clearInterval(checkTweets);

	      var twt =  $('#twitter-widget-0').contents();
	      var tweets = twt.find('.tweet');
	      var show = 2;

	      $('.fsTwitter .fsElementContent').append('<ul class="tweets">');

	      tweets.each(function(i){
	        if(i<show+1){
	          $(this).appendTo('.fsTwitter .fsElementContent .tweets');
	        }
	      });

	      $('#twitter-widget-0').remove();

	      $('.fsTwitter footer').appendTo($('.fsTwitter > .fsElementContent'));
	    }
	  },100);


	}
}



//Set top padding to site based on account bar existing
var checkAccountBar = setInterval(function(){
      if($('#fsAccountBar').length > 0) {
      	clearInterval(checkAccountBar);

		var accountBarHeight = $('#fsAccountBar').outerHeight();
		$('#fsPageWrapper').css('paddingTop', accountBarHeight);
      }
},100);

var accountMenuResize = debounce(function() {
	var accountBarHeight = $('#fsAccountBar').outerHeight();
	$('#fsPageWrapper').css('paddingTop', accountBarHeight);
}, 100);

window.addEventListener('resize', accountMenuResize);



function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

var IEversion = detectIE();

if (IEversion !== false) {
  $('body').addClass('browser-ie');
} else {
  return;
}

});

(function($){

window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var t = window.styleMedia || window.media;
        if (!t) {
            var e = document.createElement("style"),
                i = document.getElementsByTagName("script")[0],
                s = null;
            e.type = "text/css", e.id = "matchmediajs-test", i.parentNode.insertBefore(
                e, i), s = "getComputedStyle" in window && window.getComputedStyle(
                e, null) || e.currentStyle, t = {
                matchMedium: function(t) {
                    var i = "@media " + t +
                        "{ #matchmediajs-test { width: 1px; } }";
                    return e.styleSheet ? e.styleSheet.cssText = i :
                        e.textContent = i, "1px" === s.width
                }
            }
        }
        return function(e) {
            return {
                matches: t.matchMedium(e || "all"),
                media: e || "all"
            }
        }
    }()),
    function() {
        if (window.matchMedia && window.matchMedia("all").addListener) return !
            1;
        var t = window.matchMedia,
            e = t("only all").matches,
            i = !1,
            s = 0,
            o = [],
            n = function(e) {
                clearTimeout(s), s = setTimeout(function() {
                    for (var e = 0, i = o.length; i > e; e++) {
                        var s = o[e].mql,
                            n = o[e].listeners || [],
                            r = t(s.media).matches;
                        if (r !== s.matches) {
                            s.matches = r;
                            for (var a = 0, c = n.length; c > a; a++) n[
                                a].call(window, s)
                        }
                    }
                }, 30)
            };
        window.matchMedia = function(s) {
            var r = t(s),
                a = [],
                c = 0;
            return r.addListener = function(t) {
                e && (i || (i = !0, window.addEventListener("resize", n, !
                    0)), 0 === c && (c = o.push({
                    mql: r,
                    listeners: a
                })), a.push(t))
            }, r.removeListener = function(t) {
                for (var e = 0, i = a.length; i > e; e++) a[e] === t &&
                    a.splice(e, 1)
            }, r
        }
    }(), ! function(t, e, i) {
        var s = window.matchMedia;
        "undefined" != typeof module && module.exports ? module.exports = i(s) :
            "function" == typeof define && define.amd ? define(function() {
                return e[t] = i(s)
            }) : e[t] = i(s)
    }("enquire", this, function(t) {
        "use strict";

        function e(t, e) {
            var i, s = 0,
                o = t.length;
            for (s; o > s && (i = e(t[s], s), i !== !1); s++);
        }

        function i(t) {
            return "[object Array]" === Object.prototype.toString.apply(
                t)
        }

        function s(t) {
            return "function" == typeof t
        }

        function o(t) {
            this.options = t, !t.deferSetup && this.setup()
        }

        function n(e, i) {
            this.query = e, this.isUnconditional = i, this.handlers = [],
                this.mql = t(e);
            var s = this;
            this.listener = function(t) {
                s.mql = t, s.assess()
            }, this.mql.addListener(this.listener)
        }

        function r() {
            if (!t) throw new Error(
                "matchMedia not present, legacy browsers require a polyfill"
            );
            this.queries = {}, this.browserIsIncapable = !t("only all")
                .matches
        }
        return o.prototype = {
            setup: function() {
                this.options.setup && this.options.setup(), this.initialised = !
                    0
            },
            on: function() {
                !this.initialised && this.setup(), this.options.match &&
                    this.options.match()
            },
            off: function() {
                this.options.unmatch && this.options.unmatch()
            },
            destroy: function() {
                this.options.destroy ? this.options.destroy() :
                    this.off()
            },
            equals: function(t) {
                return this.options === t || this.options.match ===
                    t
            }
        }, n.prototype = {
            addHandler: function(t) {
                var e = new o(t);
                this.handlers.push(e), this.matches() && e.on()
            },
            removeHandler: function(t) {
                var i = this.handlers;
                e(i, function(e, s) {
                    return e.equals(t) ? (e.destroy(), !i.splice(
                        s, 1)) : void 0
                })
            },
            matches: function() {
                return this.mql.matches || this.isUnconditional
            },
            clear: function() {
                e(this.handlers, function(t) {
                        t.destroy()
                    }), this.mql.removeListener(this.listener),
                    this.handlers.length = 0
            },
            assess: function() {
                var t = this.matches() ? "on" : "off";
                e(this.handlers, function(e) {
                    e[t]()
                })
            }
        }, r.prototype = {
            register: function(t, o, r) {
                var a = this.queries,
                    c = r && this.browserIsIncapable;
                return a[t] || (a[t] = new n(t, c)), s(o) && (o = {
                    match: o
                }), i(o) || (o = [o]), e(o, function(e) {
                    s(e) && (e = {
                        match: e
                    }), a[t].addHandler(e)
                }), this
            },
            unregister: function(t, e) {
                var i = this.queries[t];
                return i && (e ? i.removeHandler(e) : (i.clear(),
                    delete this.queries[t])), this
            }
        }, new r
    }), ! function(t, e) {
        "use strict";

        function i(t) {
            this.callback = t, this.ticking = !1
        }

        function s(e) {
            return e && "undefined" != typeof t && (e === t || e.nodeType)
        }

        function o(t) {
            if (arguments.length <= 0) throw new Error(
                "Missing arguments in extend function");
            var e, i, n = t || {};
            for (i = 1; i < arguments.length; i++) {
                var r = arguments[i] || {};
                for (e in r) n[e] = "object" != typeof n[e] || s(n[e]) ? n[
                    e] || r[e] : o(n[e], r[e])
            }
            return n
        }

        function n(t) {
            return t === Object(t) ? t : {
                down: t,
                up: t
            }
        }

        function r(t, e) {
            e = o(e, r.options), this.lastKnownScrollY = 0, this.elem = t,
                this.debouncer = new i(this.update.bind(this)), this.tolerance =
                n(e.tolerance), this.classes = e.classes, this.offset = e.offset,
                this.scroller = e.scroller, this.initialised = !1, this.onPin =
                e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop,
                this.onNotTop = e.onNotTop
        }
        var a = {
            bind: !! function() {}.bind,
            classList: "classList" in e.documentElement,
            rAF: !!(t.requestAnimationFrame || t.webkitRequestAnimationFrame ||
                t.mozRequestAnimationFrame)
        };
        t.requestAnimationFrame = t.requestAnimationFrame || t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame, i.prototype = {
                constructor: i,
                update: function() {
                    this.callback && this.callback(), this.ticking = !1
                },
                requestTick: function() {
                    this.ticking || (requestAnimationFrame(this.rafCallback ||
                        (this.rafCallback = this.update.bind(this))
                    ), this.ticking = !0)
                },
                handleEvent: function() {
                    this.requestTick()
                }
            }, r.prototype = {
                constructor: r,
                init: function() {
                    return r.cutsTheMustard ? (this.elem.classList.add(this
                        .classes.initial), setTimeout(this.attachEvent
                        .bind(this), 100), this) : void 0
                },
                destroy: function() {
                    var t = this.classes;
                    this.initialised = !1, this.elem.classList.remove(t.unpinned,
                        t.pinned, t.top, t.initial), this.scroller.removeEventListener(
                        "scroll", this.debouncer, !1)
                },
                attachEvent: function() {
                    this.initialised || (this.lastKnownScrollY = this.getScrollY(),
                        this.initialised = !0, this.scroller.addEventListener(
                            "scroll", this.debouncer, !1), this.debouncer
                        .handleEvent())
                },
                unpin: function() {
                    var t = this.elem.classList,
                        e = this.classes;
                    (t.contains(e.pinned) || !t.contains(e.unpinned)) && (t
                        .add(e.unpinned), t.remove(e.pinned), this.onUnpin &&
                        this.onUnpin.call(this))
                },
                pin: function() {
                    var t = this.elem.classList,
                        e = this.classes;
                    t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(
                        e.pinned), this.onPin && this.onPin.call(
                        this))
                },
                top: function() {
                    var t = this.elem.classList,
                        e = this.classes;
                    t.contains(e.top) || (t.add(e.top), t.remove(e.notTop),
                        this.onTop && this.onTop.call(this))
                },
                notTop: function() {
                    var t = this.elem.classList,
                        e = this.classes;
                    t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top),
                        this.onNotTop && this.onNotTop.call(this))
                },
                getScrollY: function() {
                    return void 0 !== this.scroller.pageYOffset ? this.scroller
                        .pageYOffset : void 0 !== this.scroller.scrollTop ?
                        this.scroller.scrollTop : (e.documentElement || e.body
                            .parentNode || e.body).scrollTop
                },
                getViewportHeight: function() {
                    return t.innerHeight || e.documentElement.clientHeight ||
                        e.body.clientHeight
                },
                getDocumentHeight: function() {
                    var t = e.body,
                        i = e.documentElement;
                    return Math.max(t.scrollHeight, i.scrollHeight, t.offsetHeight,
                        i.offsetHeight, t.clientHeight, i.clientHeight)
                },
                getElementHeight: function(t) {
                    return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
                },
                getScrollerHeight: function() {
                    return this.scroller === t || this.scroller === e.body ?
                        this.getDocumentHeight() : this.getElementHeight(
                            this.scroller)
                },
                isOutOfBounds: function(t) {
                    var e = 0 > t,
                        i = t + this.getViewportHeight() > this.getScrollerHeight();
                    return e || i
                },
                toleranceExceeded: function(t, e) {
                    return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[
                        e]
                },
                shouldUnpin: function(t, e) {
                    var i = t > this.lastKnownScrollY,
                        s = t >= this.offset;
                    return i && s && e
                },
                shouldPin: function(t, e) {
                    var i = t < this.lastKnownScrollY,
                        s = t <= this.offset;
                    return i && e || s
                },
                update: function() {
                    var t = this.getScrollY(),
                        e = t > this.lastKnownScrollY ? "down" : "up",
                        i = this.toleranceExceeded(t, e);
                    this.isOutOfBounds(t) || (t <= this.offset ? this.top() :
                        this.notTop(), this.shouldUnpin(t, i) ? this.unpin() :
                        this.shouldPin(t, i) && this.pin(), this.lastKnownScrollY =
                        t)
                }
            }, r.options = {
                tolerance: {
                    up: 0,
                    down: 0
                },
                offset: 0,
                scroller: t,
                classes: {
                    pinned: "headroom--pinned",
                    unpinned: "headroom--unpinned",
                    top: "headroom--top",
                    notTop: "headroom--not-top",
                    initial: "headroom"
                }
            }, r.cutsTheMustard = "undefined" != typeof a && a.rAF && a.bind &&
            a.classList, t.Headroom = r
    }(window, document),
    function() {
        function t() {}

        function e(t, e) {
            for (var i = t.length; i--;)
                if (t[i].listener === e) return i;
            return -1
        }

        function i(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var s = t.prototype,
            o = this,
            n = o.EventEmitter;
        s.getListeners = function(t) {
                var e, i, s = this._getEvents();
                if ("object" == typeof t) {
                    e = {};
                    for (i in s) s.hasOwnProperty(i) && t.test(i) && (e[i] = s[
                        i])
                } else e = s[t] || (s[t] = []);
                return e
            }, s.flattenListeners = function(t) {
                var e, i = [];
                for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
                return i
            }, s.getListenersAsObject = function(t) {
                var e, i = this.getListeners(t);
                return i instanceof Array && (e = {}, e[t] = i), e || i
            }, s.addListener = function(t, i) {
                var s, o = this.getListenersAsObject(t),
                    n = "object" == typeof i;
                for (s in o) o.hasOwnProperty(s) && -1 === e(o[s], i) && o[s].push(
                    n ? i : {
                        listener: i,
                        once: !1
                    });
                return this
            }, s.on = i("addListener"), s.addOnceListener = function(t, e) {
                return this.addListener(t, {
                    listener: e,
                    once: !0
                })
            }, s.once = i("addOnceListener"), s.defineEvent = function(t) {
                return this.getListeners(t), this
            }, s.defineEvents = function(t) {
                for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
                return this
            }, s.removeListener = function(t, i) {
                var s, o, n = this.getListenersAsObject(t);
                for (o in n) n.hasOwnProperty(o) && (s = e(n[o], i), -1 !== s &&
                    n[o].splice(s, 1));
                return this
            }, s.off = i("removeListener"), s.addListeners = function(t, e) {
                return this.manipulateListeners(!1, t, e)
            }, s.removeListeners = function(t, e) {
                return this.manipulateListeners(!0, t, e)
            }, s.manipulateListeners = function(t, e, i) {
                var s, o, n = t ? this.removeListener : this.addListener,
                    r = t ? this.removeListeners : this.addListeners;
                if ("object" != typeof e || e instanceof RegExp)
                    for (s = i.length; s--;) n.call(this, e, i[s]);
                else
                    for (s in e) e.hasOwnProperty(s) && (o = e[s]) && (
                        "function" == typeof o ? n.call(this, s, o) : r.call(
                            this, s, o));
                return this
            }, s.removeEvent = function(t) {
                var e, i = typeof t,
                    s = this._getEvents();
                if ("string" === i) delete s[t];
                else if ("object" === i)
                    for (e in s) s.hasOwnProperty(e) && t.test(e) && delete s[e];
                else delete this._events;
                return this
            }, s.removeAllListeners = i("removeEvent"), s.emitEvent = function(
                t, e) {
                var i, s, o, n, r = this.getListenersAsObject(t);
                for (o in r)
                    if (r.hasOwnProperty(o))
                        for (s = r[o].length; s--;) i = r[o][s], i.once === !0 &&
                            this.removeListener(t, i.listener), n = i.listener.apply(
                                this, e || []), n === this._getOnceReturnValue() &&
                            this.removeListener(t, i.listener);
                return this
            }, s.trigger = i("emitEvent"), s.emit = function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(t, e)
            }, s.setOnceReturnValue = function(t) {
                return this._onceReturnValue = t, this
            }, s._getOnceReturnValue = function() {
                return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue :
                    !0
            }, s._getEvents = function() {
                return this._events || (this._events = {})
            }, t.noConflict = function() {
                return o.EventEmitter = n, t
            }, "function" == typeof define && define.amd ? define(
                "eventEmitter/EventEmitter", [], function() {
                    return t
                }) : "object" == typeof module && module.exports ? module.exports =
            t : this.EventEmitter = t
    }.call(this),
    function(t) {
        function e(e) {
            var i = t.event;
            return i.target = i.target || i.srcElement || e, i
        }
        var i = document.documentElement,
            s = function() {};
        i.addEventListener ? s = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : i.attachEvent && (s = function(t, i, s) {
            t[i + s] = s.handleEvent ? function() {
                var i = e(t);
                s.handleEvent.call(s, i)
            } : function() {
                var i = e(t);
                s.call(t, i)
            }, t.attachEvent("on" + i, t[i + s])
        });
        var o = function() {};
        i.removeEventListener ? o = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : i.detachEvent && (o = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (s) {
                t[e + i] = void 0
            }
        });
        var n = {
            bind: s,
            unbind: o
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", n) :
            t.eventie = n
    }(this),
    function(t, e) {
        "function" == typeof define && define.amd ? define([
                "eventEmitter/EventEmitter", "eventie/eventie"
            ], function(i, s) {
                return e(t, i, s)
            }) : "object" == typeof exports ? module.exports = e(t, require(
                "wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded =
            e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        function s(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function o(t) {
            return "[object Array]" === u.call(t)
        }

        function n(t) {
            var e = [];
            if (o(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0, s = t.length; s > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function r(t, e, i) {
            if (!(this instanceof r)) return new r(t, e);
            "string" == typeof t && (t = document.querySelectorAll(t)),
                this.elements = n(t), this.options = s({}, this.options),
                "function" == typeof e ? i = e : s(this.options, e), i &&
                this.on("always", i), this.getImages(), l && (this.jqDeferred =
                    new l.Deferred);
            var o = this;
            setTimeout(function() {
                o.check()
            })
        }

        function a(t) {
            this.img = t
        }

        function c(t) {
            this.src = t, f[t] = this
        }
        var l = t.jQuery,
            d = t.console,
            p = void 0 !== d,
            u = Object.prototype.toString;
        r.prototype = new e, r.prototype.options = {}, r.prototype.getImages =
            function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; e > t; t++) {
                    var i = this.elements[t];
                    "IMG" === i.nodeName && this.addImage(i);
                    var s = i.nodeType;
                    if (s && (1 === s || 9 === s || 11 === s))
                        for (var o = i.querySelectorAll("img"), n = 0, r =
                            o.length; r > n; n++) {
                            var a = o[n];
                            this.addImage(a)
                        }
                }
            }, r.prototype.addImage = function(t) {
                var e = new a(t);
                this.images.push(e)
            }, r.prototype.check = function() {
                function t(t, o) {
                    return e.options.debug && p && d.log("confirm", t,
                            o), e.progress(t), i++, i === s && e.complete(), !
                        0
                }
                var e = this,
                    i = 0,
                    s = this.images.length;
                if (this.hasAnyBroken = !1, !s) return void this.complete();
                for (var o = 0; s > o; o++) {
                    var n = this.images[o];
                    n.on("confirm", t), n.check()
                }
            }, r.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred
                        .notify && e.jqDeferred.notify(e, t)
                })
            }, r.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var i = e.hasAnyBroken ? "reject" :
                            "resolve";
                        e.jqDeferred[i](e)
                    }
                })
            }, l && (l.fn.imagesLoaded = function(t, e) {
                var i = new r(this, t, e);
                return i.jqDeferred.promise(l(this))
            }), a.prototype = new e, a.prototype.check = function() {
                var t = f[this.img.src] || new c(this.img.src);
                if (t.isConfirmed) return void this.confirm(t.isLoaded,
                    "cached was confirmed");
                if (this.img.complete && void 0 !== this.img.naturalWidth)
                    return void this.confirm(0 !== this.img.naturalWidth,
                        "naturalWidth");
                var e = this;
                t.on("confirm", function(t, i) {
                    return e.confirm(t.isLoaded, i), !0
                }), t.check()
            }, a.prototype.confirm = function(t, e) {
                this.isLoaded = t, this.emit("confirm", this, e)
            };
        var f = {};
        return c.prototype = new e, c.prototype.check = function() {
            if (!this.isChecked) {
                var t = new Image;
                i.bind(t, "load", this), i.bind(t, "error", this), t.src =
                    this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, c.prototype.onload = function(t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, c.prototype.onerror = function(t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, c.prototype.confirm = function(t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit(
                "confirm", this, e)
        }, c.prototype.unbindProxyEvents = function(t) {
            i.unbind(t.target, "load", this), i.unbind(t.target,
                "error", this)
        }, r
    }),
    function($) {
        function sc_setScroll(t, e, i) {
            return "transition" == i.transition && "swing" == e && (e =
                "ease"), {
                anims: [],
                duration: t,
                orgDuration: t,
                easing: e,
                startTime: getTime()
            }
        }

        function sc_startScroll(t, e) {
            for (var i = 0, s = t.anims.length; s > i; i++) {
                var o = t.anims[i];
                o && o[0][e.transition](o[1], t.duration, t.easing, o[2])
            }
        }

        function sc_stopScroll(t, e) {
            is_boolean(e) || (e = !0), is_object(t.pre) && sc_stopScroll(t.pre,
                e);
            for (var i = 0, s = t.anims.length; s > i; i++) {
                var o = t.anims[i];
                o[0].stop(!0), e && (o[0].css(o[1]), is_function(o[2]) && o[
                    2]())
            }
            is_object(t.post) && sc_stopScroll(t.post, e)
        }

        function sc_afterScroll(t, e, i) {
            switch (e && e.remove(), i.fx) {
                case "fade":
                case "crossfade":
                case "cover-fade":
                case "uncover-fade":
                    t.css("opacity", 1), t.css("filter", "")
            }
        }

        function sc_fireCallbacks(t, e, i, s, o) {
            if (e[i] && e[i].call(t, s), o[i].length)
                for (var n = 0, r = o[i].length; r > n; n++) o[i][n].call(t,
                    s);
            return []
        }

        function sc_fireQueue(t, e, i) {
            return e.length && (t.trigger(cf_e(e[0][0], i), e[0][1]), e.shift()),
                e
        }

        function sc_hideHiddenItems(t) {
            t.each(function() {
                var t = $(this);
                t.data("_cfs_isHidden", t.is(":hidden")).hide()
            })
        }

        function sc_showHiddenItems(t) {
            t && t.each(function() {
                var t = $(this);
                t.data("_cfs_isHidden") || t.show()
            })
        }

        function sc_clearTimers(t) {
            return t.auto && clearTimeout(t.auto), t.progress &&
                clearInterval(t.progress), t
        }

        function sc_mapCallbackArguments(t, e, i, s, o, n, r) {
            return {
                width: r.width,
                height: r.height,
                items: {
                    old: t,
                    skipped: e,
                    visible: i
                },
                scroll: {
                    items: s,
                    direction: o,
                    duration: n
                }
            }
        }

        function sc_getDuration(t, e, i, s) {
            var o = t.duration;
            return "none" == t.fx ? 0 : ("auto" == o ? o = e.scroll.duration /
                e.scroll.items * i : 10 > o && (o = s / o), 1 > o ? 0 :
                ("fade" == t.fx && (o /= 2), Math.round(o)))
        }

        function nv_showNavi(t, e, i) {
            var s = is_number(t.items.minimum) ? t.items.minimum : t.items.visible +
                1;
            if ("show" == e || "hide" == e) var o = e;
            else if (s > e) {
                debug(i, "Not enough items (" + e + " total, " + s +
                    " needed): Hiding navigation.");
                var o = "hide"
            } else var o = "show";
            var n = "show" == o ? "removeClass" : "addClass",
                r = cf_c("hidden", i);
            t.auto.button && t.auto.button[o]()[n](r), t.prev.button && t.prev
                .button[o]()[n](r), t.next.button && t.next.button[o]()[n](
                    r), t.pagination.container && t.pagination.container[o]
                ()[n](r)
        }

        function nv_enableNavi(t, e, i) {
            if (!t.circular && !t.infinite) {
                var s = "removeClass" == e || "addClass" == e ? e : !1,
                    o = cf_c("disabled", i);
                if (t.auto.button && s && t.auto.button[s](o), t.prev.button) {
                    var n = s || 0 == e ? "addClass" : "removeClass";
                    t.prev.button[n](o)
                }
                if (t.next.button) {
                    var n = s || e == t.items.visible ? "addClass" :
                        "removeClass";
                    t.next.button[n](o)
                }
            }
        }

        function go_getObject(t, e) {
            return is_function(e) ? e = e.call(t) : is_undefined(e) && (e = {}),
                e
        }

        function go_getItemsObject(t, e) {
            return e = go_getObject(t, e), is_number(e) ? e = {
                visible: e
            } : "variable" == e ? e = {
                visible: e,
                width: e,
                height: e
            } : is_object(e) || (e = {}), e
        }

        function go_getScrollObject(t, e) {
            return e = go_getObject(t, e), is_number(e) ? e = 50 >= e ? {
                items: e
            } : {
                duration: e
            } : is_string(e) ? e = {
                easing: e
            } : is_object(e) || (e = {}), e
        }

        function go_getNaviObject(t, e) {
            if (e = go_getObject(t, e), is_string(e)) {
                var i = cf_getKeyCode(e);
                e = -1 == i ? $(e) : i
            }
            return e
        }

        function go_getAutoObject(t, e) {
            return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
                    button: e
                } : is_boolean(e) ? e = {
                    play: e
                } : is_number(e) && (e = {
                    timeoutDuration: e
                }), e.progress && (is_string(e.progress) || is_jquery(e.progress)) &&
                (e.progress = {
                    bar: e.progress
                }), e
        }

        function go_complementAutoObject(t, e) {
            return is_function(e.button) && (e.button = e.button.call(t)),
                is_string(e.button) && (e.button = $(e.button)), is_boolean(
                    e.play) || (e.play = !0), is_number(e.delay) || (e.delay =
                    0), is_undefined(e.pauseOnEvent) && (e.pauseOnEvent = !
                    0), is_boolean(e.pauseOnResize) || (e.pauseOnResize = !
                    0), is_number(e.timeoutDuration) || (e.timeoutDuration =
                    10 > e.duration ? 2500 : 5 * e.duration), e.progress &&
                (is_function(e.progress.bar) && (e.progress.bar = e.progress
                    .bar.call(t)), is_string(e.progress.bar) && (e.progress
                    .bar = $(e.progress.bar)), e.progress.bar ? (
                    is_function(e.progress.updater) || (e.progress.updater =
                        $.fn.carouFredSel.progressbarUpdater),
                    is_number(e.progress.interval) || (e.progress.interval =
                        50)) : e.progress = !1), e
        }

        function go_getPrevNextObject(t, e) {
            return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
                button: e
            } : is_number(e) && (e = {
                key: e
            }), e
        }

        function go_complementPrevNextObject(t, e) {
            return is_function(e.button) && (e.button = e.button.call(t)),
                is_string(e.button) && (e.button = $(e.button)), is_string(
                    e.key) && (e.key = cf_getKeyCode(e.key)), e
        }

        function go_getPaginationObject(t, e) {
            return e = go_getNaviObject(t, e), is_jquery(e) ? e = {
                container: e
            } : is_boolean(e) && (e = {
                keys: e
            }), e
        }

        function go_complementPaginationObject(t, e) {
            return is_function(e.container) && (e.container = e.container.call(
                    t)), is_string(e.container) && (e.container = $(e.container)),
                is_number(e.items) || (e.items = !1), is_boolean(e.keys) ||
                (e.keys = !1), is_function(e.anchorBuilder) || is_false(e.anchorBuilder) ||
                (e.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder),
                is_number(e.deviation) || (e.deviation = 0), e
        }

        function go_getSwipeObject(t, e) {
            return is_function(e) && (e = e.call(t)), is_undefined(e) && (e = {
                onTouch: !1
            }), is_true(e) ? e = {
                onTouch: e
            } : is_number(e) && (e = {
                items: e
            }), e
        }

        function go_complementSwipeObject(t, e) {
            return is_boolean(e.onTouch) || (e.onTouch = !0), is_boolean(e.onMouse) ||
                (e.onMouse = !1), is_object(e.options) || (e.options = {}),
                is_boolean(e.options.triggerOnTouchEnd) || (e.options.triggerOnTouchEnd = !
                    1), e
        }

        function go_getMousewheelObject(t, e) {
            return is_function(e) && (e = e.call(t)), is_true(e) ? e = {} :
                is_number(e) ? e = {
                    items: e
                } : is_undefined(e) && (e = !1), e
        }

        function go_complementMousewheelObject(t, e) {
            return e
        }

        function gn_getItemIndex(t, e, i, s, o) {
            if (is_string(t) && (t = $(t, o)), is_object(t) && (t = $(t, o)),
                is_jquery(t) ? (t = o.children().index(t), is_boolean(i) ||
                    (i = !1)) : is_boolean(i) || (i = !0), is_number(t) ||
                (t = 0), is_number(e) || (e = 0), i && (t += s.first), t +=
                e, s.total > 0) {
                for (; t >= s.total;) t -= s.total;
                for (; 0 > t;) t += s.total
            }
            return t
        }

        function gn_getVisibleItemsPrev(t, e, i) {
            for (var s = 0, o = 0, n = i; n >= 0; n--) {
                var r = t.eq(n);
                if (s += r.is(":visible") ? r[e.d.outerWidth](!0) : 0, s >
                    e.maxDimension) return o;
                0 == n && (n = t.length), o++
            }
        }

        function gn_getVisibleItemsPrevFilter(t, e, i) {
            return gn_getItemsPrevFilter(t, e.items.filter, e.items.visibleConf
                .org, i)
        }

        function gn_getScrollItemsPrevFilter(t, e, i, s) {
            return gn_getItemsPrevFilter(t, e.items.filter, s, i)
        }

        function gn_getItemsPrevFilter(t, e, i, s) {
            for (var o = 0, n = 0, r = s, a = t.length; r >= 0; r--) {
                if (n++, n == a) return n;
                var c = t.eq(r);
                if (c.is(e) && (o++, o == i)) return n;
                0 == r && (r = a)
            }
        }

        function gn_getVisibleOrg(t, e) {
            return e.items.visibleConf.org || t.children().slice(0, e.items
                .visible).filter(e.items.filter).length
        }

        function gn_getVisibleItemsNext(t, e, i) {
            for (var s = 0, o = 0, n = i, r = t.length - 1; r >= n; n++) {
                var a = t.eq(n);
                if (s += a.is(":visible") ? a[e.d.outerWidth](!0) : 0, s >
                    e.maxDimension) return o;
                if (o++, o == r + 1) return o;
                n == r && (n = -1)
            }
        }

        function gn_getVisibleItemsNextTestCircular(t, e, i, s) {
            var o = gn_getVisibleItemsNext(t, e, i);
            return e.circular || i + o > s && (o = s - i), o
        }

        function gn_getVisibleItemsNextFilter(t, e, i) {
            return gn_getItemsNextFilter(t, e.items.filter, e.items.visibleConf
                .org, i, e.circular)
        }

        function gn_getScrollItemsNextFilter(t, e, i, s) {
            return gn_getItemsNextFilter(t, e.items.filter, s + 1, i, e.circular) -
                1
        }

        function gn_getItemsNextFilter(t, e, i, s) {
            for (var o = 0, n = 0, r = s, a = t.length - 1; a >= r; r++) {
                if (n++, n >= a) return n;
                var c = t.eq(r);
                if (c.is(e) && (o++, o == i)) return n;
                r == a && (r = -1)
            }
        }

        function gi_getCurrentItems(t, e) {
            return t.slice(0, e.items.visible)
        }

        function gi_getOldItemsPrev(t, e, i) {
            return t.slice(i, e.items.visibleConf.old + i)
        }

        function gi_getNewItemsPrev(t, e) {
            return t.slice(0, e.items.visible)
        }

        function gi_getOldItemsNext(t, e) {
            return t.slice(0, e.items.visibleConf.old)
        }

        function gi_getNewItemsNext(t, e, i) {
            return t.slice(i, e.items.visible + i)
        }

        function sz_storeMargin(t, e, i) {
            e.usePadding && (is_string(i) || (i = "_cfs_origCssMargin"), t.each(
                function() {
                    var t = $(this),
                        s = parseInt(t.css(e.d.marginRight), 10);
                    is_number(s) || (s = 0), t.data(i, s)
                }))
        }

        function sz_resetMargin(t, e, i) {
            if (e.usePadding) {
                var s = is_boolean(i) ? i : !1;
                is_number(i) || (i = 0), sz_storeMargin(t, e,
                    "_cfs_tempCssMargin"), t.each(function() {
                    var t = $(this);
                    t.css(e.d.marginRight, s ? t.data(
                        "_cfs_tempCssMargin") : i + t.data(
                        "_cfs_origCssMargin"))
                })
            }
        }

        function sz_storeOrigCss(t) {
            t.each(function() {
                var t = $(this);
                t.data("_cfs_origCss", t.attr("style") || "")
            })
        }

        function sz_restoreOrigCss(t) {
            t.each(function() {
                var t = $(this);
                t.attr("style", t.data("_cfs_origCss") || "")
            })
        }

        function sz_setResponsiveSizes(t, e) {
            var i = (t.items.visible, t.items[t.d.width]),
                s = t[t.d.height],
                o = is_percentage(s);
            e.each(function() {
                var e = $(this),
                    n = i - ms_getPaddingBorderMargin(e, t, "Width");
                e[t.d.width](n), o && e[t.d.height](
                    ms_getPercentage(n, s))
            })
        }

        function sz_setSizes(t, e) {
            var i = t.parent(),
                s = t.children(),
                o = gi_getCurrentItems(s, e),
                n = cf_mapWrapperSizes(ms_getSizes(o, e, !0), e, !1);
            if (i.css(n), e.usePadding) {
                var r = e.padding,
                    a = r[e.d[1]];
                e.align && 0 > a && (a = 0);
                var c = o.last();
                c.css(e.d.marginRight, c.data("_cfs_origCssMargin") + a), t
                    .css(e.d.top, r[e.d[0]]), t.css(e.d.left, r[e.d[3]])
            }
            return t.css(e.d.width, n[e.d.width] + 2 * ms_getTotalSize(s, e,
                "width")), t.css(e.d.height, ms_getLargestSize(s, e,
                "height")), n
        }

        function ms_getSizes(t, e, i) {
            return [ms_getTotalSize(t, e, "width", i), ms_getLargestSize(t,
                e, "height", i)]
        }

        function ms_getLargestSize(t, e, i, s) {
            return is_boolean(s) || (s = !1), is_number(e[e.d[i]]) && s ? e[
                    e.d[i]] : is_number(e.items[e.d[i]]) ? e.items[e.d[i]] :
                (i = i.toLowerCase().indexOf("width") > -1 ? "outerWidth" :
                    "outerHeight", ms_getTrueLargestSize(t, e, i))
        }

        function ms_getTrueLargestSize(t, e, i) {
            for (var s = 0, o = 0, n = t.length; n > o; o++) {
                var r = t.eq(o),
                    a = r.is(":visible") ? r[e.d[i]](!0) : 0;
                a > s && (s = a)
            }
            return s
        }

        function ms_getTotalSize(t, e, i, s) {
            if (is_boolean(s) || (s = !1), is_number(e[e.d[i]]) && s) return
                e[e.d[i]];
            if (is_number(e.items[e.d[i]])) return e.items[e.d[i]] * t.length;
            for (var o = i.toLowerCase().indexOf("width") > -1 ?
                    "outerWidth" : "outerHeight", n = 0, r = 0, a = t.length; a >
                r; r++) {
                var c = t.eq(r);
                n += c.is(":visible") ? c[e.d[o]](!0) : 0
            }
            return n
        }

        function ms_getParentSize(t, e, i) {
            var s = t.is(":visible");
            s && t.hide();
            var o = t.parent()[e.d[i]]();
            return s && t.show(), o
        }

        function ms_getMaxDimension(t, e) {
            return is_number(t[t.d.width]) ? t[t.d.width] : e
        }

        function ms_hasVariableSizes(t, e, i) {
            for (var s = !1, o = !1, n = 0, r = t.length; r > n; n++) {
                var a = t.eq(n),
                    c = a.is(":visible") ? a[e.d[i]](!0) : 0;
                s === !1 ? s = c : s != c && (o = !0), 0 == s && (o = !0)
            }
            return o
        }

        function ms_getPaddingBorderMargin(t, e, i) {
            return t[e.d["outer" + i]](!0) - t[e.d[i.toLowerCase()]]()
        }

        function ms_getPercentage(t, e) {
            if (is_percentage(e)) {
                if (e = parseInt(e.slice(0, -1), 10), !is_number(e)) return
                    t;
                t *= e / 100
            }
            return t
        }

        function cf_e(t, e, i, s, o) {
            return is_boolean(i) || (i = !0), is_boolean(s) || (s = !0),
                is_boolean(o) || (o = !1), i && (t = e.events.prefix + t),
                s && (t = t + "." + e.events.namespace), s && o && (t += e.serialNumber),
                t
        }

        function cf_c(t, e) {
            return is_string(e.classnames[t]) ? e.classnames[t] : t
        }

        function cf_mapWrapperSizes(t, e, i) {
            is_boolean(i) || (i = !0);
            var s = e.usePadding && i ? e.padding : [0, 0, 0, 0],
                o = {};
            return o[e.d.width] = t[0] + s[1] + s[3], o[e.d.height] = t[1] +
                s[0] + s[2], o
        }

        function cf_sortParams(t, e) {
            for (var i = [], s = 0, o = t.length; o > s; s++)
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n].indexOf(typeof t[s]) > -1 && is_undefined(i[n])) {
                        i[n] = t[s];
                        break
                    }
            return i
        }

        function cf_getPadding(t) {
            if (is_undefined(t)) return [0, 0, 0, 0];
            if (is_number(t)) return [t, t, t, t];
            if (is_string(t) && (t = t.split("px").join("").split("em").join(
                "").split(" ")), !is_array(t)) return [0, 0, 0, 0];
            for (var e = 0; 4 > e; e++) t[e] = parseInt(t[e], 10);
            switch (t.length) {
                case 0:
                    return [0, 0, 0, 0];
                case 1:
                    return [t[0], t[0], t[0], t[0]];
                case 2:
                    return [t[0], t[1], t[0], t[1]];
                case 3:
                    return [t[0], t[1], t[2], t[1]];
                default:
                    return [t[0], t[1], t[2], t[3]]
            }
        }

        function cf_getAlignPadding(t, e) {
            var i = is_number(e[e.d.width]) ? Math.ceil(e[e.d.width] -
                ms_getTotalSize(t, e, "width")) : 0;
            switch (e.align) {
                case "left":
                    return [0, i];
                case "right":
                    return [i, 0];
                case "center":
                default:
                    return [Math.ceil(i / 2), Math.floor(i / 2)]
            }
        }

        function cf_getDimensions(t) {
            for (var e = [
                    ["width", "innerWidth", "outerWidth", "height",
                        "innerHeight", "outerHeight", "left", "top",
                        "marginRight", 0, 1, 2, 3
                    ],
                    ["height", "innerHeight", "outerHeight", "width",
                        "innerWidth", "outerWidth", "top", "left",
                        "marginBottom", 3, 2, 1, 0
                    ]
                ], i = e[0].length, s = "right" == t.direction ||
                "left" == t.direction ? 0 : 1, o = {}, n = 0; i > n; n++) o[
                e[0][n]] = e[s][n];
            return o
        }

        function cf_getAdjust(t, e, i, s) {
            var o = t;
            if (is_function(i)) o = i.call(s, o);
            else if (is_string(i)) {
                var n = i.split("+"),
                    r = i.split("-");
                if (r.length > n.length) var a = !0,
                    c = r[0],
                    l = r[1];
                else var a = !1,
                    c = n[0],
                    l = n[1];
                switch (c) {
                    case "even":
                        o = 1 == t % 2 ? t - 1 : t;
                        break;
                    case "odd":
                        o = 0 == t % 2 ? t - 1 : t;
                        break;
                    default:
                        o = t
                }
                l = parseInt(l, 10), is_number(l) && (a && (l = -l), o += l)
            }
            return (!is_number(o) || 1 > o) && (o = 1), o
        }

        function cf_getItemsAdjust(t, e, i, s) {
            return cf_getItemAdjustMinMax(cf_getAdjust(t, e, i, s), e.items
                .visibleConf)
        }

        function cf_getItemAdjustMinMax(t, e) {
            return is_number(e.min) && e.min > t && (t = e.min), is_number(
                e.max) && t > e.max && (t = e.max), 1 > t && (t = 1), t
        }

        function cf_getSynchArr(t) {
            is_array(t) || (t = [
                [t]
            ]), is_array(t[0]) || (t = [t]);
            for (var e = 0, i = t.length; i > e; e++) is_string(t[e][0]) &&
                (t[e][0] = $(t[e][0])), is_boolean(t[e][1]) || (t[e][1] = !
                    0), is_boolean(t[e][2]) || (t[e][2] = !0), is_number(t[
                    e][3]) || (t[e][3] = 0);
            return t
        }

        function cf_getKeyCode(t) {
            return "right" == t ? 39 : "left" == t ? 37 : "up" == t ? 38 :
                "down" == t ? 40 : -1
        }

        function cf_setCookie(t, e, i) {
            if (t) {
                var s = e.triggerHandler(cf_e("currentPosition", i));
                $.fn.carouFredSel.cookie.set(t, s)
            }
        }

        function cf_getCookie(t) {
            var e = $.fn.carouFredSel.cookie.get(t);
            return "" == e ? 0 : e
        }

        function in_mapCss(t, e) {
            for (var i = {}, s = 0, o = e.length; o > s; s++) i[e[s]] = t.css(
                e[s]);
            return i
        }

        function in_complementItems(t, e, i, s) {
            return is_object(t.visibleConf) || (t.visibleConf = {}),
                is_object(t.sizesConf) || (t.sizesConf = {}), 0 == t.start &&
                is_number(s) && (t.start = s), is_object(t.visible) ? (t.visibleConf
                    .min = t.visible.min, t.visibleConf.max = t.visible.max,
                    t.visible = !1) : is_string(t.visible) ? ("variable" ==
                    t.visible ? t.visibleConf.variable = !0 : t.visibleConf
                    .adjust = t.visible, t.visible = !1) : is_function(t.visible) &&
                (t.visibleConf.adjust = t.visible, t.visible = !1),
                is_string(t.filter) || (t.filter = i.filter(":hidden").length >
                    0 ? ":visible" : "*"), t[e.d.width] || (e.responsive ?
                    (debug(!0, "Set a " + e.d.width + " for the items!"), t[
                        e.d.width] = ms_getTrueLargestSize(i, e,
                        "outerWidth")) : t[e.d.width] = ms_hasVariableSizes(
                        i, e, "outerWidth") ? "variable" : i[e.d.outerWidth]
                    (!0)), t[e.d.height] || (t[e.d.height] =
                    ms_hasVariableSizes(i, e, "outerHeight") ? "variable" :
                    i[e.d.outerHeight](!0)), t.sizesConf.width = t.width, t
                .sizesConf.height = t.height, t
        }

        function in_complementVisibleItems(t, e) {
            return "variable" == t.items[t.d.width] && (t.items.visibleConf
                .variable = !0), t.items.visibleConf.variable || (
                is_number(t[t.d.width]) ? t.items.visible = Math.floor(
                    t[t.d.width] / t.items[t.d.width]) : (t.items.visible =
                    Math.floor(e / t.items[t.d.width]), t[t.d.width] =
                    t.items.visible * t.items[t.d.width], t.items.visibleConf
                    .adjust || (t.align = !1)), ("Infinity" == t.items.visible ||
                    1 > t.items.visible) && (debug(!0,
                    'Not a valid number of visible items: Set to "variable".'
                ), t.items.visibleConf.variable = !0)), t
        }

        function in_complementPrimarySize(t, e, i) {
            return "auto" == t && (t = ms_getTrueLargestSize(i, e,
                "outerWidth")), t
        }

        function in_complementSecondarySize(t, e, i) {
            return "auto" == t && (t = ms_getTrueLargestSize(i, e,
                "outerHeight")), t || (t = e.items[e.d.height]), t
        }

        function in_getAlignPadding(t, e) {
            var i = cf_getAlignPadding(gi_getCurrentItems(e, t), t);
            return t.padding[t.d[1]] = i[1], t.padding[t.d[3]] = i[0], t
        }

        function in_getResponsiveValues(t, e) {
            var i = cf_getItemAdjustMinMax(Math.ceil(t[t.d.width] / t.items[
                t.d.width]), t.items.visibleConf);
            i > e.length && (i = e.length);
            var s = Math.floor(t[t.d.width] / i);
            return t.items.visible = i, t.items[t.d.width] = s, t[t.d.width] =
                i * s, t
        }

        function bt_pauseOnHoverConfig(t) {
            if (is_string(t)) var e = t.indexOf("immediate") > -1 ? !0 : !1,
                i = t.indexOf("resume") > -1 ? !0 : !1;
            else var e = i = !1;
            return [e, i]
        }

        function bt_mousesheelNumber(t) {
            return is_number(t) ? t : null
        }

        function is_null(t) {
            return null === t
        }

        function is_undefined(t) {
            return is_null(t) || void 0 === t || "" === t || "undefined" ===
                t
        }

        function is_array(t) {
            return t instanceof Array
        }

        function is_jquery(t) {
            return t instanceof jQuery
        }

        function is_object(t) {
            return (t instanceof Object || "object" == typeof t) && !
                is_null(t) && !is_jquery(t) && !is_array(t) && !is_function(
                    t)
        }

        function is_number(t) {
            return (t instanceof Number || "number" == typeof t) && !isNaN(
                t)
        }

        function is_string(t) {
            return (t instanceof String || "string" == typeof t) && !
                is_undefined(t) && !is_true(t) && !is_false(t)
        }

        function is_function(t) {
            return t instanceof Function || "function" == typeof t
        }

        function is_boolean(t) {
            return t instanceof Boolean || "boolean" == typeof t || is_true(
                t) || is_false(t)
        }

        function is_true(t) {
            return t === !0 || "true" === t
        }

        function is_false(t) {
            return t === !1 || "false" === t
        }

        function is_percentage(t) {
            return is_string(t) && "%" == t.slice(-1)
        }

        function getTime() {
            return (new Date).getTime()
        }

        function deprecated(t, e) {
            debug(!0, t +
                " is DEPRECATED, support for it will be removed. Use " +
                e + " instead.")
        }

        function debug(t, e) {
            if (!is_undefined(window.console) && !is_undefined(window.console
                .log)) {
                if (is_object(t)) {
                    var i = " (" + t.selector + ")";
                    t = t.debug
                } else var i = ""; if (!t) return !1;
                e = is_string(e) ? "carouFredSel" + i + ": " + e : [
                    "carouFredSel" + i + ":", e
                ], window.console.log(e)
            }
            return !1
        }
        $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(
            options, configs) {
            if (0 == this.length) return debug(!0,
                'No element found for "' + this.selector + '".'
            ), this;
            if (this.length > 1) return this.each(function() {
                $(this).carouFredSel(options, configs)
            });
            var $cfs = this,
                $tt0 = this[0],
                starting_position = !1;
            $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler(
                "_cfs_triggerEvent", "currentPosition"), $cfs.trigger(
                "_cfs_triggerEvent", ["destroy", !0]));
            var FN = {};
            FN._init = function(t, e, i) {
                t = go_getObject($tt0, t), t.items =
                    go_getItemsObject($tt0, t.items), t.scroll =
                    go_getScrollObject($tt0, t.scroll), t.auto =
                    go_getAutoObject($tt0, t.auto), t.prev =
                    go_getPrevNextObject($tt0, t.prev), t.next =
                    go_getPrevNextObject($tt0, t.next), t.pagination =
                    go_getPaginationObject($tt0, t.pagination), t.swipe =
                    go_getSwipeObject($tt0, t.swipe), t.mousewheel =
                    go_getMousewheelObject($tt0, t.mousewheel), e &&
                    (opts_orig = $.extend(!0, {}, $.fn.carouFredSel
                        .defaults, t)), opts = $.extend(!0, {}, $.fn
                        .carouFredSel.defaults, t), opts.d =
                    cf_getDimensions(opts), crsl.direction = "up" ==
                    opts.direction || "left" == opts.direction ?
                    "next" : "prev";
                var s = $cfs.children(),
                    o = ms_getParentSize($wrp, opts, "width");
                if (is_true(opts.cookie) && (opts.cookie =
                        "caroufredsel_cookie_" + conf.serialNumber),
                    opts.maxDimension = ms_getMaxDimension(opts, o),
                    opts.items = in_complementItems(opts.items,
                        opts, s, i), opts[opts.d.width] =
                    in_complementPrimarySize(opts[opts.d.width],
                        opts, s), opts[opts.d.height] =
                    in_complementSecondarySize(opts[opts.d.height],
                        opts, s), opts.responsive && (is_percentage(
                        opts[opts.d.width]) || (opts[opts.d.width] =
                        "100%")), is_percentage(opts[opts.d.width]) &&
                    (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage =
                        opts[opts.d.width], opts[opts.d.width] =
                        ms_getPercentage(o, crsl.primarySizePercentage),
                        opts.items.visible || (opts.items.visibleConf
                            .variable = !0)), opts.responsive ? (
                        opts.usePadding = !1, opts.padding = [0, 0,
                            0, 0
                        ], opts.align = !1, opts.items.visibleConf.variable = !
                        1) : (opts.items.visible || (opts =
                            in_complementVisibleItems(opts, o)),
                        opts[opts.d.width] || (!opts.items.visibleConf
                            .variable && is_number(opts.items[opts.d
                                .width]) && "*" == opts.items.filter ?
                            (opts[opts.d.width] = opts.items.visible *
                                opts.items[opts.d.width], opts.align = !
                                1) : opts[opts.d.width] =
                            "variable"), is_undefined(opts.align) &&
                        (opts.align = is_number(opts[opts.d.width]) ?
                            "center" : !1), opts.items.visibleConf.variable &&
                        (opts.items.visible =
                            gn_getVisibleItemsNext(s, opts, 0))),
                    "*" == opts.items.filter || opts.items.visibleConf
                    .variable || (opts.items.visibleConf.org = opts
                        .items.visible, opts.items.visible =
                        gn_getVisibleItemsNextFilter(s, opts, 0)),
                    opts.items.visible = cf_getItemsAdjust(opts.items
                        .visible, opts, opts.items.visibleConf.adjust,
                        $tt0), opts.items.visibleConf.old = opts.items
                    .visible, opts.responsive) opts.items.visibleConf
                    .min || (opts.items.visibleConf.min = opts.items
                        .visible), opts.items.visibleConf.max || (
                        opts.items.visibleConf.max = opts.items.visible
                    ), opts = in_getResponsiveValues(opts, s, o);
                else switch (opts.padding = cf_getPadding(opts.padding),
                    "top" == opts.align ? opts.align = "left" :
                    "bottom" == opts.align && (opts.align =
                        "right"), opts.align) {
                    case "center":
                    case "left":
                    case "right":
                        "variable" != opts[opts.d.width] && (
                            opts = in_getAlignPadding(opts,
                                s), opts.usePadding = !0);
                        break;
                    default:
                        opts.align = !1, opts.usePadding = 0 ==
                            opts.padding[0] && 0 == opts.padding[
                                1] && 0 == opts.padding[2] && 0 ==
                            opts.padding[3] ? !1 : !0
                }
                is_number(opts.scroll.duration) || (opts.scroll.duration =
                        500), is_undefined(opts.scroll.items) && (
                        opts.scroll.items = opts.responsive || opts
                        .items.visibleConf.variable || "*" != opts.items
                        .filter ? "visible" : opts.items.visible),
                    opts.auto = $.extend(!0, {}, opts.scroll, opts.auto),
                    opts.prev = $.extend(!0, {}, opts.scroll, opts.prev),
                    opts.next = $.extend(!0, {}, opts.scroll, opts.next),
                    opts.pagination = $.extend(!0, {}, opts.scroll,
                        opts.pagination), opts.auto =
                    go_complementAutoObject($tt0, opts.auto), opts.prev =
                    go_complementPrevNextObject($tt0, opts.prev),
                    opts.next = go_complementPrevNextObject($tt0,
                        opts.next), opts.pagination =
                    go_complementPaginationObject($tt0, opts.pagination),
                    opts.swipe = go_complementSwipeObject($tt0,
                        opts.swipe), opts.mousewheel =
                    go_complementMousewheelObject($tt0, opts.mousewheel),
                    opts.synchronise && (opts.synchronise =
                        cf_getSynchArr(opts.synchronise)), opts.auto
                    .onPauseStart && (opts.auto.onTimeoutStart =
                        opts.auto.onPauseStart, deprecated(
                            "auto.onPauseStart",
                            "auto.onTimeoutStart")), opts.auto.onPausePause &&
                    (opts.auto.onTimeoutPause = opts.auto.onPausePause,
                        deprecated("auto.onPausePause",
                            "auto.onTimeoutPause")), opts.auto.onPauseEnd &&
                    (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd,
                        deprecated("auto.onPauseEnd",
                            "auto.onTimeoutEnd")), opts.auto.pauseDuration &&
                    (opts.auto.timeoutDuration = opts.auto.pauseDuration,
                        deprecated("auto.pauseDuration",
                            "auto.timeoutDuration"))
            }, FN._build = function() {
                $cfs.data("_cfs_isCarousel", !0);
                var t = $cfs.children(),
                    e = in_mapCss($cfs, ["textAlign", "float",
                        "position", "top", "right", "bottom",
                        "left", "zIndex", "width", "height",
                        "marginTop", "marginRight",
                        "marginBottom", "marginLeft"
                    ]),
                    i = "relative";
                switch (e.position) {
                    case "absolute":
                    case "fixed":
                        i = e.position
                }
                "parent" == conf.wrapper ? sz_storeOrigCss($wrp) :
                    $wrp.css(e), $wrp.css({
                        overflow: "hidden",
                        position: i
                    }), sz_storeOrigCss($cfs), $cfs.data(
                        "_cfs_origCssZindex", e.zIndex), $cfs.css({
                        textAlign: "left",
                        "float": "none",
                        position: "absolute",
                        top: 0,
                        right: "auto",
                        bottom: "auto",
                        left: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        marginLeft: 0
                    }), sz_storeMargin(t, opts), sz_storeOrigCss(t),
                    opts.responsive && sz_setResponsiveSizes(opts,
                        t)
            }, FN._bind_events = function() {
                FN._unbind_events(), $cfs.bind(cf_e("stop", conf),
                    function(t, e) {
                        return t.stopPropagation(), crsl.isStopped ||
                            opts.auto.button && opts.auto.button
                            .addClass(cf_c("stopped", conf)),
                            crsl.isStopped = !0, opts.auto.play &&
                            (opts.auto.play = !1, $cfs.trigger(
                                cf_e("pause", conf), e)), !0
                    }), $cfs.bind(cf_e("finish", conf),
                    function(t) {
                        return t.stopPropagation(), crsl.isScrolling &&
                            sc_stopScroll(scrl), !0
                    }), $cfs.bind(cf_e("pause", conf), function(
                    t, e, i) {
                    if (t.stopPropagation(), tmrs =
                        sc_clearTimers(tmrs), e && crsl.isScrolling
                    ) {
                        scrl.isStopped = !0;
                        var s = getTime() - scrl.startTime;
                        scrl.duration -= s, scrl.pre && (
                                scrl.pre.duration -= s),
                            scrl.post && (scrl.post.duration -=
                                s), sc_stopScroll(scrl, !1)
                    }
                    if (crsl.isPaused || crsl.isScrolling ||
                        i && (tmrs.timePassed += getTime() -
                            tmrs.startTime), crsl.isPaused ||
                        opts.auto.button && opts.auto.button
                        .addClass(cf_c("paused", conf)),
                        crsl.isPaused = !0, opts.auto.onTimeoutPause
                    ) {
                        var o = opts.auto.timeoutDuration -
                            tmrs.timePassed,
                            n = 100 - Math.ceil(100 * o /
                                opts.auto.timeoutDuration);
                        opts.auto.onTimeoutPause.call($tt0,
                            n, o)
                    }
                    return !0
                }), $cfs.bind(cf_e("play", conf), function(t, e,
                    i, s) {
                    t.stopPropagation(), tmrs =
                        sc_clearTimers(tmrs);
                    var o = [e, i, s],
                        n = ["string", "number", "boolean"],
                        r = cf_sortParams(o, n);
                    if (e = r[0], i = r[1], s = r[2],
                        "prev" != e && "next" != e && (e =
                            crsl.direction), is_number(i) ||
                        (i = 0), is_boolean(s) || (s = !1),
                        s && (crsl.isStopped = !1, opts.auto
                            .play = !0), !opts.auto.play)
                        return t.stopImmediatePropagation(),
                            debug(conf,
                                "Carousel stopped: Not scrolling."
                            );
                    crsl.isPaused && opts.auto.button && (
                            opts.auto.button.removeClass(
                                cf_c("stopped", conf)),
                            opts.auto.button.removeClass(
                                cf_c("paused", conf))),
                        crsl.isPaused = !1, tmrs.startTime =
                        getTime();
                    var a = opts.auto.timeoutDuration + i;
                    return dur2 = a - tmrs.timePassed, perc =
                        100 - Math.ceil(100 * dur2 / a),
                        opts.auto.progress && (tmrs.progress =
                            setInterval(function() {
                                var t = getTime() -
                                    tmrs.startTime +
                                    tmrs.timePassed,
                                    e = Math.ceil(100 *
                                        t / a);
                                opts.auto.progress.updater
                                    .call(opts.auto.progress
                                        .bar[0], e)
                            }, opts.auto.progress.interval)
                        ), tmrs.auto = setTimeout(function() {
                            opts.auto.progress && opts.auto
                                .progress.updater.call(
                                    opts.auto.progress.bar[
                                        0], 100), opts.auto
                                .onTimeoutEnd && opts.auto
                                .onTimeoutEnd.call($tt0,
                                    perc, dur2), crsl.isScrolling ?
                                $cfs.trigger(cf_e(
                                        "play", conf),
                                    e) : $cfs.trigger(
                                    cf_e(e, conf), opts
                                    .auto)
                        }, dur2), opts.auto.onTimeoutStart &&
                        opts.auto.onTimeoutStart.call($tt0,
                            perc, dur2), !0
                }), $cfs.bind(cf_e("resume", conf), function(t) {
                    return t.stopPropagation(), scrl.isStopped ?
                        (scrl.isStopped = !1, crsl.isPaused = !
                            1, crsl.isScrolling = !0, scrl.startTime =
                            getTime(), sc_startScroll(scrl,
                                conf)) : $cfs.trigger(cf_e(
                            "play", conf)), !0
                }), $cfs.bind(cf_e("prev", conf) + " " + cf_e(
                    "next", conf), function(t, e, i, s, o) {
                    if (t.stopPropagation(), crsl.isStopped ||
                        $cfs.is(":hidden")) return t.stopImmediatePropagation(),
                        debug(conf,
                            "Carousel stopped or hidden: Not scrolling."
                        );
                    var n = is_number(opts.items.minimum) ?
                        opts.items.minimum : opts.items.visible +
                        1;
                    if (n > itms.total) return t.stopImmediatePropagation(),
                        debug(conf,
                            "Not enough items (" + itms
                            .total + " total, " + n +
                            " needed): Not scrolling.");
                    var r = [e, i, s, o],
                        a = ["object", "number/string",
                            "function", "boolean"
                        ],
                        c = cf_sortParams(r, a);
                    e = c[0], i = c[1], s = c[2], o = c[3];
                    var l = t.type.slice(conf.events.prefix
                        .length);
                    if (is_object(e) || (e = {}),
                        is_function(s) && (e.onAfter = s),
                        is_boolean(o) && (e.queue = o), e =
                        $.extend(!0, {}, opts[l], e), e.conditions &&
                        !e.conditions.call($tt0, l)) return
                        t.stopImmediatePropagation(),
                        debug(conf,
                            'Callback "conditions" returned false.'
                        );
                    if (!is_number(i)) {
                        if ("*" != opts.items.filter) i =
                            "visible";
                        else
                            for (var d = [i, e.items, opts[
                                    l].items], c = 0, p =
                                d.length; p > c; c++)
                                if (is_number(d[c]) ||
                                    "page" == d[c] ||
                                    "visible" == d[c]) {
                                    i = d[c];
                                    break
                                } switch (i) {
                            case "page":
                                return t.stopImmediatePropagation(),
                                    $cfs.triggerHandler(
                                        cf_e(l + "Page",
                                            conf), [e, s]);
                            case "visible":
                                opts.items.visibleConf.variable ||
                                    "*" != opts.items.filter ||
                                    (i = opts.items.visible)
                        }
                    }
                    if (scrl.isStopped) return $cfs.trigger(
                            cf_e("resume", conf)), $cfs
                        .trigger(cf_e("queue", conf), [
                            l, [e, i, s]
                        ]), t.stopImmediatePropagation(),
                        debug(conf,
                            "Carousel resumed scrolling."
                        );
                    if (e.duration > 0 && crsl.isScrolling)
                        return e.queue && ("last" == e.queue &&
                                (queu = []), ("first" != e.queue ||
                                    0 == queu.length) &&
                                $cfs.trigger(cf_e("queue",
                                    conf), [l, [e, i, s]])),
                            t.stopImmediatePropagation(),
                            debug(conf,
                                "Carousel currently scrolling."
                            );
                    if (tmrs.timePassed = 0, $cfs.trigger(
                        cf_e("slide_" + l, conf), [e, i]
                    ), opts.synchronise)
                        for (var u = opts.synchronise, f = [
                            e, i
                        ], h = 0, p = u.length; p > h; h++) {
                            var g = l;
                            u[h][2] || (g = "prev" == g ?
                                    "next" : "prev"), u[h][
                                    1
                                ] || (f[0] = u[h][0].triggerHandler(
                                    "_cfs_triggerEvent", [
                                        "configuration",
                                        g
                                    ])), f[1] = i + u[h][3],
                                u[h][0].trigger(
                                    "_cfs_triggerEvent", [
                                        "slide_" + g, f
                                    ])
                        }
                    return !0
                }), $cfs.bind(cf_e("slide_prev", conf),
                    function(t, e, i) {
                        t.stopPropagation();
                        var s = $cfs.children();
                        if (!opts.circular && 0 == itms.first)
                            return opts.infinite && $cfs.trigger(
                                cf_e("next", conf), itms.total -
                                1), t.stopImmediatePropagation();
                        if (sz_resetMargin(s, opts), !is_number(
                            i)) {
                            if (opts.items.visibleConf.variable)
                                i = gn_getVisibleItemsPrev(s,
                                    opts, itms.total - 1);
                            else if ("*" != opts.items.filter) {
                                var o = is_number(e.items) ? e.items :
                                    gn_getVisibleOrg($cfs, opts);
                                i = gn_getScrollItemsPrevFilter(
                                    s, opts, itms.total - 1,
                                    o)
                            } else i = opts.items.visible;
                            i = cf_getAdjust(i, opts, e.items,
                                $tt0)
                        }
                        if (opts.circular || itms.total - i <
                            itms.first && (i = itms.total -
                                itms.first), opts.items.visibleConf
                            .old = opts.items.visible, opts.items
                            .visibleConf.variable) {
                            var n = cf_getItemsAdjust(
                                gn_getVisibleItemsNext(s,
                                    opts, itms.total - i),
                                opts, opts.items.visibleConf
                                .adjust, $tt0);
                            n >= opts.items.visible + i && itms
                                .total > i && (i++, n =
                                    cf_getItemsAdjust(
                                        gn_getVisibleItemsNext(
                                            s, opts, itms.total -
                                            i), opts, opts.items
                                        .visibleConf.adjust,
                                        $tt0)), opts.items.visible =
                                n
                        } else if ("*" != opts.items.filter) {
                            var n =
                                gn_getVisibleItemsNextFilter(s,
                                    opts, itms.total - i);
                            opts.items.visible =
                                cf_getItemsAdjust(n, opts, opts
                                    .items.visibleConf.adjust,
                                    $tt0)
                        }
                        if (sz_resetMargin(s, opts, !0), 0 == i)
                            return t.stopImmediatePropagation(),
                                debug(conf,
                                    "0 items to scroll: Not scrolling."
                                );
                        for (debug(conf, "Scrolling " + i +
                                " items backward."), itms.first +=
                            i; itms.first >= itms.total;) itms.first -=
                            itms.total;
                        opts.circular || (0 == itms.first && e.onEnd &&
                                e.onEnd.call($tt0, "prev"),
                                opts.infinite || nv_enableNavi(
                                    opts, itms.first, conf)),
                            $cfs.children().slice(itms.total -
                                i, itms.total).prependTo($cfs),
                            itms.total < opts.items.visible + i &&
                            $cfs.children().slice(0, opts.items
                                .visible + i - itms.total).clone(!
                                0).appendTo($cfs);
                        var s = $cfs.children(),
                            r = gi_getOldItemsPrev(s, opts, i),
                            a = gi_getNewItemsPrev(s, opts),
                            c = s.eq(i - 1),
                            l = r.last(),
                            d = a.last();
                        sz_resetMargin(s, opts);
                        var p = 0,
                            u = 0;
                        if (opts.align) {
                            var f = cf_getAlignPadding(a, opts);
                            p = f[0], u = f[1]
                        }
                        var h = 0 > p ? opts.padding[opts.d[3]] :
                            0,
                            g = !1,
                            m = $();
                        if (i > opts.items.visible && (m = s.slice(
                            opts.items.visibleConf.old,
                            i), "directscroll" == e.fx)) {
                            var v = opts.items[opts.d.width];
                            g = m, c = d, sc_hideHiddenItems(g),
                                opts.items[opts.d.width] =
                                "variable"
                        }
                        var b = !1,
                            _ = ms_getTotalSize(s.slice(0, i),
                                opts, "width"),
                            w = cf_mapWrapperSizes(ms_getSizes(
                                a, opts, !0), opts, !opts.usePadding),
                            y = 0,
                            S = {},
                            k = {},
                            T = {},
                            C = {},
                            x = {},
                            P = {},
                            j = {},
                            O = sc_getDuration(e, opts, i, _);
                        switch (e.fx) {
                            case "cover":
                            case "cover-fade":
                                y = ms_getTotalSize(s.slice(0,
                                        opts.items.visible),
                                    opts, "width")
                        }
                        g && (opts.items[opts.d.width] = v),
                            sz_resetMargin(s, opts, !0), u >= 0 &&
                            sz_resetMargin(l, opts, opts.padding[
                                opts.d[1]]), p >= 0 &&
                            sz_resetMargin(c, opts, opts.padding[
                                opts.d[3]]), opts.align && (
                                opts.padding[opts.d[1]] = u,
                                opts.padding[opts.d[3]] = p), P[
                                opts.d.left] = -(_ - h), j[opts
                                .d.left] = -(y - h), k[opts.d.left] =
                            w[opts.d.width];
                        var z = function() {},
                            E = function() {},
                            M = function() {},
                            I = function() {},
                            A = function() {},
                            H = function() {},
                            N = function() {},
                            L = function() {},
                            q = function() {},
                            D = function() {},
                            F = function() {};
                        switch (e.fx) {
                            case "crossfade":
                            case "cover":
                            case "cover-fade":
                            case "uncover":
                            case "uncover-fade":
                                b = $cfs.clone(!0).appendTo(
                                    $wrp)
                        }
                        switch (e.fx) {
                            case "crossfade":
                            case "uncover":
                            case "uncover-fade":
                                b.children().slice(0, i).remove(),
                                    b.children().slice(opts.items
                                        .visibleConf.old).remove();
                                break;
                            case "cover":
                            case "cover-fade":
                                b.children().slice(opts.items.visible)
                                    .remove(), b.css(j)
                        }
                        if ($cfs.css(P), scrl = sc_setScroll(O,
                                e.easing, conf), S[opts.d.left] =
                            opts.usePadding ? opts.padding[opts
                                .d[3]] : 0, ("variable" == opts[
                                    opts.d.width] || "variable" ==
                                opts[opts.d.height]) && (z =
                                function() {
                                    $wrp.css(w)
                                }, E = function() {
                                    scrl.anims.push([$wrp, w])
                                }), opts.usePadding) {
                            switch (d.not(c).length && (T[opts.d
                                    .marginRight] = c.data(
                                    "_cfs_origCssMargin"),
                                0 > p ? c.css(T) : (N =
                                    function() {
                                        c.css(T)
                                    }, L = function() {
                                        scrl.anims.push([c,
                                            T
                                        ])
                                    })), e.fx) {
                                case "cover":
                                case "cover-fade":
                                    b.children().eq(i - 1).css(
                                        T)
                            }
                            d.not(l).length && (C[opts.d.marginRight] =
                                l.data("_cfs_origCssMargin"),
                                M = function() {
                                    l.css(C)
                                }, I = function() {
                                    scrl.anims.push([l, C])
                                }), u >= 0 && (x[opts.d.marginRight] =
                                d.data("_cfs_origCssMargin") +
                                opts.padding[opts.d[1]], A =
                                function() {
                                    d.css(x)
                                }, H = function() {
                                    scrl.anims.push([d, x])
                                })
                        }
                        F = function() {
                            $cfs.css(S)
                        };
                        var W = opts.items.visible + i - itms.total;
                        D = function() {
                            if (W > 0 && ($cfs.children().slice(
                                    itms.total).remove(),
                                r = $($cfs.children().slice(
                                    itms.total - (
                                        opts.items.visible -
                                        W)).get().concat(
                                    $cfs.children()
                                    .slice(0, W).get()
                                ))), sc_showHiddenItems(
                                g), opts.usePadding) {
                                var t = $cfs.children().eq(
                                    opts.items.visible +
                                    i - 1);
                                t.css(opts.d.marginRight, t
                                    .data(
                                        "_cfs_origCssMargin"
                                    ))
                            }
                        };
                        var R = sc_mapCallbackArguments(r, m, a,
                            i, "prev", O, w);
                        switch (q = function() {
                                sc_afterScroll($cfs, b, e),
                                    crsl.isScrolling = !1, clbk
                                    .onAfter = sc_fireCallbacks(
                                        $tt0, e, "onAfter", R,
                                        clbk), queu =
                                    sc_fireQueue($cfs, queu,
                                        conf), crsl.isPaused ||
                                    $cfs.trigger(cf_e("play",
                                        conf))
                            }, crsl.isScrolling = !0, tmrs =
                            sc_clearTimers(tmrs), clbk.onBefore =
                            sc_fireCallbacks($tt0, e,
                                "onBefore", R, clbk), e.fx) {
                            case "none":
                                $cfs.css(S), z(), M(), A(), N(),
                                    F(), D(), q();
                                break;
                            case "fade":
                                scrl.anims.push([$cfs, {
                                        opacity: 0
                                    },
                                    function() {
                                        z(), M(), A(),
                                            N(), F(), D(),
                                            scrl =
                                            sc_setScroll(
                                                O, e.easing,
                                                conf),
                                            scrl.anims.push(
                                                [$cfs, {
                                                        opacity: 1
                                                    },
                                                    q
                                                ]),
                                            sc_startScroll(
                                                scrl,
                                                conf)
                                    }
                                ]);
                                break;
                            case "crossfade":
                                $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([b, {
                                        opacity: 0
                                    }]), scrl.anims.push([$cfs, {
                                            opacity: 1
                                        },
                                        q
                                    ]), E(), M(), A(), N(), F(),
                                    D();
                                break;
                            case "cover":
                                scrl.anims.push([b, S,
                                    function() {
                                        M(), A(), N(),
                                            F(), D(), q()
                                    }
                                ]), E();
                                break;
                            case "cover-fade":
                                scrl.anims.push([$cfs, {
                                    opacity: 0
                                }]), scrl.anims.push([b, S,
                                    function() {
                                        M(), A(), N(),
                                            F(), D(), q()
                                    }
                                ]), E();
                                break;
                            case "uncover":
                                scrl.anims.push([b, k, q]), E(),
                                    M(), A(), N(), F(), D();
                                break;
                            case "uncover-fade":
                                $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    }]), scrl.anims.push([b, k,
                                        q
                                    ]), E(), M(), A(), N(), F(),
                                    D();
                                break;
                            default:
                                scrl.anims.push([$cfs, S,
                                    function() {
                                        D(), q()
                                    }
                                ]), E(), I(), H(), L()
                        }
                        return sc_startScroll(scrl, conf),
                            cf_setCookie(opts.cookie, $cfs,
                                conf), $cfs.trigger(cf_e(
                                "updatePageStatus", conf), [!
                                1, w
                            ]), !0
                    }), $cfs.bind(cf_e("slide_next", conf),
                    function(t, e, i) {
                        t.stopPropagation();
                        var s = $cfs.children();
                        if (!opts.circular && itms.first ==
                            opts.items.visible) return opts.infinite &&
                            $cfs.trigger(cf_e("prev", conf),
                                itms.total - 1), t.stopImmediatePropagation();
                        if (sz_resetMargin(s, opts), !is_number(
                            i)) {
                            if ("*" != opts.items.filter) {
                                var o = is_number(e.items) ? e.items :
                                    gn_getVisibleOrg($cfs, opts);
                                i = gn_getScrollItemsNextFilter(
                                    s, opts, 0, o)
                            } else i = opts.items.visible;
                            i = cf_getAdjust(i, opts, e.items,
                                $tt0)
                        }
                        var n = 0 == itms.first ? itms.total :
                            itms.first;
                        if (!opts.circular) {
                            if (opts.items.visibleConf.variable)
                                var r = gn_getVisibleItemsNext(
                                        s, opts, i),
                                    o = gn_getVisibleItemsPrev(
                                        s, opts, n - 1);
                            else var r = opts.items.visible,
                                o = opts.items.visible;
                            i + r > n && (i = n - o)
                        }
                        if (opts.items.visibleConf.old = opts.items
                            .visible, opts.items.visibleConf.variable
                        ) {
                            for (var r = cf_getItemsAdjust(
                                    gn_getVisibleItemsNextTestCircular(
                                        s, opts, i, n),
                                    opts, opts.items.visibleConf
                                    .adjust, $tt0); opts.items.visible -
                                i >= r && itms.total > i;) i++,
                                r = cf_getItemsAdjust(
                                    gn_getVisibleItemsNextTestCircular(
                                        s, opts, i, n), opts,
                                    opts.items.visibleConf.adjust,
                                    $tt0);
                            opts.items.visible = r
                        } else if ("*" != opts.items.filter) {
                            var r =
                                gn_getVisibleItemsNextFilter(s,
                                    opts, i);
                            opts.items.visible =
                                cf_getItemsAdjust(r, opts, opts
                                    .items.visibleConf.adjust,
                                    $tt0)
                        }
                        if (sz_resetMargin(s, opts, !0), 0 == i)
                            return t.stopImmediatePropagation(),
                                debug(conf,
                                    "0 items to scroll: Not scrolling."
                                );
                        for (debug(conf, "Scrolling " + i +
                                " items forward."), itms.first -=
                            i; 0 > itms.first;) itms.first +=
                            itms.total;
                        opts.circular || (itms.first == opts.items
                                .visible && e.onEnd && e.onEnd.call(
                                    $tt0, "next"), opts.infinite ||
                                nv_enableNavi(opts, itms.first,
                                    conf)), itms.total < opts.items
                            .visible + i && $cfs.children().slice(
                                0, opts.items.visible + i -
                                itms.total).clone(!0).appendTo(
                                $cfs);
                        var s = $cfs.children(),
                            a = gi_getOldItemsNext(s, opts),
                            c = gi_getNewItemsNext(s, opts, i),
                            l = s.eq(i - 1),
                            d = a.last(),
                            p = c.last();
                        sz_resetMargin(s, opts);
                        var u = 0,
                            f = 0;
                        if (opts.align) {
                            var h = cf_getAlignPadding(c, opts);
                            u = h[0], f = h[1]
                        }
                        var g = !1,
                            m = $();
                        if (i > opts.items.visibleConf.old && (
                            m = s.slice(opts.items.visibleConf
                                .old, i), "directscroll" ==
                            e.fx)) {
                            var v = opts.items[opts.d.width];
                            g = m, l = d, sc_hideHiddenItems(g),
                                opts.items[opts.d.width] =
                                "variable"
                        }
                        var b = !1,
                            _ = ms_getTotalSize(s.slice(0, i),
                                opts, "width"),
                            w = cf_mapWrapperSizes(ms_getSizes(
                                c, opts, !0), opts, !opts.usePadding),
                            y = 0,
                            S = {},
                            k = {},
                            T = {},
                            C = {},
                            x = {},
                            P = sc_getDuration(e, opts, i, _);
                        switch (e.fx) {
                            case "uncover":
                            case "uncover-fade":
                                y = ms_getTotalSize(s.slice(0,
                                        opts.items.visibleConf
                                        .old), opts,
                                    "width")
                        }
                        g && (opts.items[opts.d.width] = v),
                            opts.align && 0 > opts.padding[opts
                                .d[1]] && (opts.padding[opts.d[
                                1]] = 0), sz_resetMargin(s,
                                opts, !0), sz_resetMargin(d,
                                opts, opts.padding[opts.d[1]]),
                            opts.align && (opts.padding[opts.d[
                                1]] = f, opts.padding[opts.d[
                                3]] = u), x[opts.d.left] = opts
                            .usePadding ? opts.padding[opts.d[3]] :
                            0;
                        var j = function() {},
                            O = function() {},
                            z = function() {},
                            E = function() {},
                            M = function() {},
                            I = function() {},
                            A = function() {},
                            H = function() {},
                            N = function() {};
                        switch (e.fx) {
                            case "crossfade":
                            case "cover":
                            case "cover-fade":
                            case "uncover":
                            case "uncover-fade":
                                b = $cfs.clone(!0).appendTo(
                                    $wrp), b.children().slice(
                                    opts.items.visibleConf.old
                                ).remove()
                        }
                        switch (e.fx) {
                            case "crossfade":
                            case "cover":
                            case "cover-fade":
                                $cfs.css("zIndex", 1), b.css(
                                    "zIndex", 0)
                        }
                        if (scrl = sc_setScroll(P, e.easing,
                            conf), S[opts.d.left] = -_, k[
                            opts.d.left] = -y, 0 > u && (S[
                            opts.d.left] += u), ("variable" ==
                            opts[opts.d.width] ||
                            "variable" == opts[opts.d.height]
                        ) && (j = function() {
                            $wrp.css(w)
                        }, O = function() {
                            scrl.anims.push([$wrp, w])
                        }), opts.usePadding) {
                            var L = p.data("_cfs_origCssMargin");
                            f >= 0 && (L += opts.padding[opts.d[
                                1]]), p.css(opts.d.marginRight,
                                L), l.not(d).length && (C[
                                    opts.d.marginRight] = d
                                .data("_cfs_origCssMargin")
                            ), z = function() {
                                d.css(C)
                            }, E = function() {
                                scrl.anims.push([d, C])
                            };
                            var q = l.data("_cfs_origCssMargin");
                            u > 0 && (q += opts.padding[opts.d[
                                    3]]), T[opts.d.marginRight] =
                                q, M = function() {
                                    l.css(T)
                                }, I = function() {
                                    scrl.anims.push([l, T])
                                }
                        }
                        N = function() {
                            $cfs.css(x)
                        };
                        var D = opts.items.visible + i - itms.total;
                        H = function() {
                            D > 0 && $cfs.children().slice(
                                itms.total).remove();
                            var t = $cfs.children().slice(0,
                                i).appendTo($cfs).last();
                            if (D > 0 && (c =
                                    gi_getCurrentItems(s,
                                        opts)),
                                sc_showHiddenItems(g), opts
                                .usePadding) {
                                if (itms.total < opts.items
                                    .visible + i) {
                                    var e = $cfs.children()
                                        .eq(opts.items.visible -
                                            1);
                                    e.css(opts.d.marginRight,
                                        e.data(
                                            "_cfs_origCssMargin"
                                        ) + opts.padding[
                                            opts.d[1]])
                                }
                                t.css(opts.d.marginRight, t
                                    .data(
                                        "_cfs_origCssMargin"
                                    ))
                            }
                        };
                        var F = sc_mapCallbackArguments(a, m, c,
                            i, "next", P, w);
                        switch (A = function() {
                                $cfs.css("zIndex", $cfs.data(
                                        "_cfs_origCssZindex"
                                    )), sc_afterScroll($cfs, b,
                                        e), crsl.isScrolling = !
                                    1, clbk.onAfter =
                                    sc_fireCallbacks($tt0, e,
                                        "onAfter", F, clbk),
                                    queu = sc_fireQueue($cfs,
                                        queu, conf), crsl.isPaused ||
                                    $cfs.trigger(cf_e("play",
                                        conf))
                            }, crsl.isScrolling = !0, tmrs =
                            sc_clearTimers(tmrs), clbk.onBefore =
                            sc_fireCallbacks($tt0, e,
                                "onBefore", F, clbk), e.fx) {
                            case "none":
                                $cfs.css(S), j(), z(), M(), N(),
                                    H(), A();
                                break;
                            case "fade":
                                scrl.anims.push([$cfs, {
                                        opacity: 0
                                    },
                                    function() {
                                        j(), z(), M(),
                                            N(), H(),
                                            scrl =
                                            sc_setScroll(
                                                P, e.easing,
                                                conf),
                                            scrl.anims.push(
                                                [$cfs, {
                                                        opacity: 1
                                                    },
                                                    A
                                                ]),
                                            sc_startScroll(
                                                scrl,
                                                conf)
                                    }
                                ]);
                                break;
                            case "crossfade":
                                $cfs.css({
                                    opacity: 0
                                }), scrl.anims.push([b, {
                                    opacity: 0
                                }]), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    },
                                    A
                                ]), O(), z(), M(), N(), H();
                                break;
                            case "cover":
                                $cfs.css(opts.d.left, $wrp[opts
                                        .d.width]()), scrl.anims
                                    .push([$cfs, x, A]), O(), z(),
                                    M(), H();
                                break;
                            case "cover-fade":
                                $cfs.css(opts.d.left, $wrp[opts
                                        .d.width]()), scrl.anims
                                    .push([b, {
                                        opacity: 0
                                    }]), scrl.anims.push([$cfs,
                                        x, A
                                    ]), O(), z(), M(), H();
                                break;
                            case "uncover":
                                scrl.anims.push([b, k, A]), O(),
                                    z(), M(), N(), H();
                                break;
                            case "uncover-fade":
                                $cfs.css({
                                    opacity: 0
                                }), scrl.anims.push([$cfs, {
                                    opacity: 1
                                }]), scrl.anims.push([b, k,
                                    A
                                ]), O(), z(), M(), N(), H();
                                break;
                            default:
                                scrl.anims.push([$cfs, S,
                                    function() {
                                        N(), H(), A()
                                    }
                                ]), O(), E(), I()
                        }
                        return sc_startScroll(scrl, conf),
                            cf_setCookie(opts.cookie, $cfs,
                                conf), $cfs.trigger(cf_e(
                                "updatePageStatus", conf), [!
                                1, w
                            ]), !0
                    }), $cfs.bind(cf_e("slideTo", conf),
                    function(t, e, i, s, o, n, r) {
                        t.stopPropagation();
                        var a = [e, i, s, o, n, r],
                            c = ["string/number/object",
                                "number", "boolean", "object",
                                "string", "function"
                            ],
                            l = cf_sortParams(a, c);
                        return o = l[3], n = l[4], r = l[5], e =
                            gn_getItemIndex(l[0], l[1], l[2],
                                itms, $cfs), 0 == e ? !1 : (
                                is_object(o) || (o = !1),
                                "prev" != n && "next" != n && (
                                    n = opts.circular ? itms.total /
                                    2 >= e ? "next" : "prev" :
                                    0 == itms.first || itms.first >
                                    e ? "next" : "prev"),
                                "prev" == n && (e = itms.total -
                                    e), $cfs.trigger(cf_e(n,
                                    conf), [o, e, r]), !0)
                    }), $cfs.bind(cf_e("prevPage", conf),
                    function(t, e, i) {
                        t.stopPropagation();
                        var s = $cfs.triggerHandler(cf_e(
                            "currentPage", conf));
                        return $cfs.triggerHandler(cf_e(
                            "slideToPage", conf), [s -
                            1, e, "prev", i
                        ])
                    }), $cfs.bind(cf_e("nextPage", conf),
                    function(t, e, i) {
                        t.stopPropagation();
                        var s = $cfs.triggerHandler(cf_e(
                            "currentPage", conf));
                        return $cfs.triggerHandler(cf_e(
                            "slideToPage", conf), [s +
                            1, e, "next", i
                        ])
                    }), $cfs.bind(cf_e("slideToPage", conf),
                    function(t, e, i, s, o) {
                        t.stopPropagation(), is_number(e) || (e =
                            $cfs.triggerHandler(cf_e(
                                "currentPage", conf)));
                        var n = opts.pagination.items || opts.items
                            .visible,
                            r = Math.ceil(itms.total / n) - 1;
                        return 0 > e && (e = r), e > r && (e =
                            0), $cfs.triggerHandler(cf_e(
                            "slideTo", conf), [e * n, 0, !
                            0, i, s, o
                        ])
                    }), $cfs.bind(cf_e("jumpToStart", conf),
                    function(t, e) {
                        if (t.stopPropagation(), e = e ?
                            gn_getItemIndex(e, 0, !0, itms,
                                $cfs) : 0, e += itms.first, 0 !=
                            e) {
                            if (itms.total > 0)
                                for (; e > itms.total;) e -=
                                    itms.total;
                            $cfs.prepend($cfs.children().slice(
                                e, itms.total))
                        }
                        return !0
                    }), $cfs.bind(cf_e("synchronise", conf),
                    function(t, e) {
                        if (t.stopPropagation(), e) e =
                            cf_getSynchArr(e);
                        else {
                            if (!opts.synchronise) return debug(
                                conf,
                                "No carousel to synchronise."
                            );
                            e = opts.synchronise
                        }
                        for (var i = $cfs.triggerHandler(cf_e(
                                "currentPosition", conf
                            )), s = !0, o = 0, n = e.length; n >
                            o; o++) e[o][0].triggerHandler(cf_e(
                            "slideTo", conf), [i, e[o][
                            3
                        ], !0]) || (s = !1);
                        return s
                    }), $cfs.bind(cf_e("queue", conf), function(
                    t, e, i) {
                    return t.stopPropagation(), is_function(
                            e) ? e.call($tt0, queu) :
                        is_array(e) ? queu = e :
                        is_undefined(e) || queu.push([e, i]),
                        queu
                }), $cfs.bind(cf_e("insertItem", conf),
                    function(t, e, i, s, o) {
                        t.stopPropagation();
                        var n = [e, i, s, o],
                            r = ["string/object",
                                "string/number/object",
                                "boolean", "number"
                            ],
                            a = cf_sortParams(n, r);
                        if (e = a[0], i = a[1], s = a[2], o = a[
                                3], is_object(e) && !is_jquery(
                                e) ? e = $(e) : is_string(e) &&
                            (e = $(e)), !is_jquery(e) || 0 == e
                            .length) return debug(conf,
                            "Not a valid object.");
                        is_undefined(i) && (i = "end"),
                            sz_storeMargin(e, opts),
                            sz_storeOrigCss(e);
                        var c = i,
                            l = "before";
                        "end" == i ? s ? (0 == itms.first ? (i =
                                itms.total - 1, l = "after"
                            ) : (i = itms.first, itms.first +=
                                e.length), 0 > i && (i = 0)) :
                            (i = itms.total - 1, l = "after") :
                            i = gn_getItemIndex(i, o, s, itms,
                                $cfs);
                        var d = $cfs.children().eq(i);
                        return d.length ? d[l](e) : (debug(conf,
                                "Correct insert-position not found! Appending item to the end."
                            ), $cfs.append(e)), "end" == c || s ||
                            itms.first > i && (itms.first += e.length),
                            itms.total = $cfs.children().length,
                            itms.first >= itms.total && (itms.first -=
                                itms.total), $cfs.trigger(cf_e(
                                "updateSizes", conf)), $cfs.trigger(
                                cf_e("linkAnchors", conf)), !0
                    }), $cfs.bind(cf_e("removeItem", conf),
                    function(t, e, i, s) {
                        t.stopPropagation();
                        var o = [e, i, s],
                            n = ["string/number/object",
                                "boolean", "number"
                            ],
                            r = cf_sortParams(o, n);
                        if (e = r[0], i = r[1], s = r[2], e instanceof $ &&
                            e.length > 1) return a = $(), e.each(
                            function() {
                                var t = $cfs.trigger(
                                    cf_e(
                                        "removeItem",
                                        conf), [$(
                                            this),
                                        i, s
                                    ]);
                                t && (a = a.add(t))
                            }), a;
                        if (is_undefined(e) || "end" == e) a =
                            $cfs.children().last();
                        else {
                            e = gn_getItemIndex(e, s, i, itms,
                                $cfs);
                            var a = $cfs.children().eq(e);
                            a.length && itms.first > e && (itms
                                .first -= a.length)
                        }
                        return a && a.length && (a.detach(),
                            itms.total = $cfs.children().length,
                            $cfs.trigger(cf_e("updateSizes",
                                conf))), a
                    }), $cfs.bind(cf_e("onBefore", conf) + " " +
                    cf_e("onAfter", conf), function(t, e) {
                        t.stopPropagation();
                        var i = t.type.slice(conf.events.prefix
                            .length);
                        return is_array(e) && (clbk[i] = e),
                            is_function(e) && clbk[i].push(e),
                            clbk[i]
                    }), $cfs.bind(cf_e("currentPosition", conf),
                    function(t, e) {
                        if (t.stopPropagation(), 0 == itms.first)
                            var i = 0;
                        else var i = itms.total - itms.first;
                        return is_function(e) && e.call($tt0, i),
                            i
                    }), $cfs.bind(cf_e("currentPage", conf),
                    function(t, e) {
                        t.stopPropagation();
                        var i, s = opts.pagination.items ||
                            opts.items.visible,
                            o = Math.ceil(itms.total / s - 1);
                        return i = 0 == itms.first ? 0 : itms.first <
                            itms.total % s ? 0 : itms.first !=
                            s || opts.circular ? Math.round((
                                    itms.total - itms.first) /
                                s) : o, 0 > i && (i = 0), i > o &&
                            (i = o), is_function(e) && e.call(
                                $tt0, i), i
                    }), $cfs.bind(cf_e("currentVisible", conf),
                    function(t, e) {
                        t.stopPropagation();
                        var i = gi_getCurrentItems($cfs.children(),
                            opts);
                        return is_function(e) && e.call($tt0, i),
                            i
                    }), $cfs.bind(cf_e("slice", conf), function(
                    t, e, i, s) {
                    if (t.stopPropagation(), 0 == itms.total)
                        return !1;
                    var o = [e, i, s],
                        n = ["number", "number", "function"],
                        r = cf_sortParams(o, n);
                    if (e = is_number(r[0]) ? r[0] : 0, i =
                        is_number(r[1]) ? r[1] : itms.total,
                        s = r[2], e += itms.first, i +=
                        itms.first, items.total > 0) {
                        for (; e > itms.total;) e -= itms.total;
                        for (; i > itms.total;) i -= itms.total;
                        for (; 0 > e;) e += itms.total;
                        for (; 0 > i;) i += itms.total
                    }
                    var a, c = $cfs.children();
                    return a = i > e ? c.slice(e, i) : $(c.slice(
                            e, itms.total).get().concat(
                            c.slice(0, i).get())),
                        is_function(s) && s.call($tt0, a),
                        a
                }), $cfs.bind(cf_e("isPaused", conf) + " " +
                    cf_e("isStopped", conf) + " " + cf_e(
                        "isScrolling", conf), function(t, e) {
                        t.stopPropagation();
                        var i = t.type.slice(conf.events.prefix
                                .length),
                            s = crsl[i];
                        return is_function(e) && e.call($tt0, s),
                            s
                    }), $cfs.bind(cf_e("configuration", conf),
                    function(e, a, b, c) {
                        e.stopPropagation();
                        var reInit = !1;
                        if (is_function(a)) a.call($tt0, opts);
                        else if (is_object(a)) opts_orig = $.extend(!
                                0, {}, opts_orig, a), b !== !1 ?
                            reInit = !0 : opts = $.extend(!0, {},
                                opts, a);
                        else if (!is_undefined(a))
                            if (is_function(b)) {
                                var val = eval("opts." + a);
                                is_undefined(val) && (val = ""),
                                    b.call($tt0, val)
                            } else {
                                if (is_undefined(b)) return eval(
                                    "opts." + a);
                                "boolean" != typeof c && (c = !
                                        0), eval("opts_orig." +
                                        a + " = b"), c !== !1 ?
                                    reInit = !0 : eval("opts." +
                                        a + " = b")
                            }
                        if (reInit) {
                            sz_resetMargin($cfs.children(),
                                    opts), FN._init(opts_orig),
                                FN._bind_buttons();
                            var sz = sz_setSizes($cfs, opts);
                            $cfs.trigger(cf_e(
                                "updatePageStatus",
                                conf), [!0, sz])
                        }
                        return opts
                    }), $cfs.bind(cf_e("linkAnchors", conf),
                    function(t, e, i) {
                        return t.stopPropagation(),
                            is_undefined(e) ? e = $("body") :
                            is_string(e) && (e = $(e)),
                            is_jquery(e) && 0 != e.length ? (
                                is_string(i) || (i =
                                    "a.caroufredsel"), e.find(i)
                                .each(function() {
                                    var t = this.hash || "";
                                    t.length > 0 && -1 !=
                                        $cfs.children().index(
                                            $(t)) && $(this)
                                        .unbind("click").click(
                                            function(e) {
                                                e.preventDefault(),
                                                    $cfs.trigger(
                                                        cf_e(
                                                            "slideTo",
                                                            conf
                                                        ),
                                                        t)
                                            })
                                }), !0) : debug(conf,
                                "Not a valid object.")
                    }), $cfs.bind(cf_e("updatePageStatus", conf),
                    function(t, e) {
                        if (t.stopPropagation(), opts.pagination
                            .container) {
                            var i = opts.pagination.items ||
                                opts.items.visible,
                                s = Math.ceil(itms.total / i);
                            e && (opts.pagination.anchorBuilder &&
                                (opts.pagination.container.children()
                                    .remove(), opts.pagination
                                    .container.each(
                                        function() {
                                            for (var t = 0; s >
                                                t; t++) {
                                                var e =
                                                    $cfs.children()
                                                    .eq(
                                                        gn_getItemIndex(
                                                            t *
                                                            i,
                                                            0, !
                                                            0,
                                                            itms,
                                                            $cfs
                                                        ));
                                                $(this).append(
                                                    opts
                                                    .pagination
                                                    .anchorBuilder
                                                    .call(
                                                        e[
                                                            0
                                                        ],
                                                        t +
                                                        1
                                                    ))
                                            }
                                        })), opts.pagination
                                .container.each(function() {
                                    $(this).children().unbind(
                                        opts.pagination
                                        .event).each(
                                        function(t) {
                                            $(this)
                                                .bind(
                                                    opts
                                                    .pagination
                                                    .event,
                                                    function(
                                                        e
                                                    ) {
                                                        e
                                                            .preventDefault(),
                                                            $cfs
                                                            .trigger(
                                                                cf_e(
                                                                    "slideTo",
                                                                    conf
                                                                ), [
                                                                    t *
                                                                    i, -
                                                                    opts
                                                                    .pagination
                                                                    .deviation, !
                                                                    0,
                                                                    opts
                                                                    .pagination
                                                                ]
                                                            )
                                                    }
                                                )
                                        })
                                }));
                            var o = $cfs.triggerHandler(cf_e(
                                    "currentPage", conf)) +
                                opts.pagination.deviation;
                            return o >= s && (o = 0), 0 > o &&
                                (o = s - 1), opts.pagination.container
                                .each(function() {
                                    $(this).children().removeClass(
                                            cf_c("selected",
                                                conf)).eq(o)
                                        .addClass(cf_c(
                                            "selected",
                                            conf))
                                }), !0
                        }
                    }), $cfs.bind(cf_e("updateSizes", conf),
                    function() {
                        var t = opts.items.visible,
                            e = $cfs.children(),
                            i = ms_getParentSize($wrp, opts,
                                "width");
                        if (itms.total = e.length, crsl.primarySizePercentage ?
                            (opts.maxDimension = i, opts[opts.d
                                .width] = ms_getPercentage(
                                i, crsl.primarySizePercentage
                            )) : opts.maxDimension =
                            ms_getMaxDimension(opts, i), opts.responsive ?
                            (opts.items.width = opts.items.sizesConf
                                .width, opts.items.height =
                                opts.items.sizesConf.height,
                                opts = in_getResponsiveValues(
                                    opts, e, i), t = opts.items
                                .visible, sz_setResponsiveSizes(
                                    opts, e)) : opts.items.visibleConf
                            .variable ? t =
                            gn_getVisibleItemsNext(e, opts, 0) :
                            "*" != opts.items.filter && (t =
                                gn_getVisibleItemsNextFilter(e,
                                    opts, 0)), !opts.circular &&
                            0 != itms.first && t > itms.first) {
                            if (opts.items.visibleConf.variable)
                                var s = gn_getVisibleItemsPrev(
                                        e, opts, itms.first) -
                                    itms.first;
                            else if ("*" != opts.items.filter)
                                var s =
                                    gn_getVisibleItemsPrevFilter(
                                        e, opts, itms.first) -
                                    itms.first;
                            else var s = opts.items.visible -
                                itms.first;
                            debug(conf,
                                    "Preventing non-circular: sliding " +
                                    s + " items backward."),
                                $cfs.trigger(cf_e("prev", conf),
                                    s)
                        }
                        opts.items.visible = cf_getItemsAdjust(
                                t, opts, opts.items.visibleConf
                                .adjust, $tt0), opts.items.visibleConf
                            .old = opts.items.visible, opts =
                            in_getAlignPadding(opts, e);
                        var o = sz_setSizes($cfs, opts);
                        return $cfs.trigger(cf_e(
                            "updatePageStatus", conf), [!
                            0, o
                        ]), nv_showNavi(opts, itms.total,
                            conf), nv_enableNavi(opts, itms
                            .first, conf), o
                    }), $cfs.bind(cf_e("destroy", conf),
                    function(t, e) {
                        return t.stopPropagation(), tmrs =
                            sc_clearTimers(tmrs), $cfs.data(
                                "_cfs_isCarousel", !1), $cfs.trigger(
                                cf_e("finish", conf)), e &&
                            $cfs.trigger(cf_e("jumpToStart",
                                conf)), sz_restoreOrigCss($cfs.children()),
                            sz_restoreOrigCss($cfs), FN._unbind_events(),
                            FN._unbind_buttons(), "parent" ==
                            conf.wrapper ? sz_restoreOrigCss(
                                $wrp) : $wrp.replaceWith($cfs), !
                            0
                    }), $cfs.bind(cf_e("debug", conf), function() {
                    return debug(conf, "Carousel width: " +
                            opts.width), debug(conf,
                            "Carousel height: " + opts.height
                        ), debug(conf, "Item widths: " +
                            opts.items.width), debug(conf,
                            "Item heights: " + opts.items.height
                        ), debug(conf,
                            "Number of items visible: " +
                            opts.items.visible), opts.auto.play &&
                        debug(conf,
                            "Number of items scrolled automatically: " +
                            opts.auto.items), opts.prev.button &&
                        debug(conf,
                            "Number of items scrolled backward: " +
                            opts.prev.items), opts.next.button &&
                        debug(conf,
                            "Number of items scrolled forward: " +
                            opts.next.items), conf.debug
                }), $cfs.bind("_cfs_triggerEvent", function(t,
                    e, i) {
                    return t.stopPropagation(), $cfs.triggerHandler(
                        cf_e(e, conf), i)
                })
            }, FN._unbind_events = function() {
                $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("",
                    conf, !1)), $cfs.unbind("_cfs_triggerEvent")
            }, FN._bind_buttons = function() {
                if (FN._unbind_buttons(), nv_showNavi(opts, itms.total,
                        conf), nv_enableNavi(opts, itms.first, conf),
                    opts.auto.pauseOnHover) {
                    var t = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                    $wrp.bind(cf_e("mouseenter", conf, !1),
                        function() {
                            $cfs.trigger(cf_e("pause", conf), t)
                        }).bind(cf_e("mouseleave", conf, !1),
                        function() {
                            $cfs.trigger(cf_e("resume", conf))
                        })
                }
                if (opts.auto.button && opts.auto.button.bind(cf_e(
                    opts.auto.event, conf, !1), function(t) {
                    t.preventDefault();
                    var e = !1,
                        i = null;
                    crsl.isPaused ? e = "play" : opts.auto.pauseOnEvent &&
                        (e = "pause", i =
                            bt_pauseOnHoverConfig(opts.auto
                                .pauseOnEvent)), e && $cfs.trigger(
                            cf_e(e, conf), i)
                }), opts.prev.button && (opts.prev.button.bind(
                    cf_e(opts.prev.event, conf, !1),
                    function(t) {
                        t.preventDefault(), $cfs.trigger(
                            cf_e("prev", conf))
                    }), opts.prev.pauseOnHover)) {
                    var t = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                    opts.prev.button.bind(cf_e("mouseenter", conf, !
                        1), function() {
                        $cfs.trigger(cf_e("pause", conf), t)
                    }).bind(cf_e("mouseleave", conf, !1),
                        function() {
                            $cfs.trigger(cf_e("resume", conf))
                        })
                }
                if (opts.next.button && (opts.next.button.bind(cf_e(
                        opts.next.event, conf, !1),
                    function(t) {
                        t.preventDefault(), $cfs.trigger(
                            cf_e("next", conf))
                    }), opts.next.pauseOnHover)) {
                    var t = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                    opts.next.button.bind(cf_e("mouseenter", conf, !
                        1), function() {
                        $cfs.trigger(cf_e("pause", conf), t)
                    }).bind(cf_e("mouseleave", conf, !1),
                        function() {
                            $cfs.trigger(cf_e("resume", conf))
                        })
                }
                if (opts.pagination.container && opts.pagination.pauseOnHover) {
                    var t = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                    opts.pagination.container.bind(cf_e(
                        "mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), t)
                    }).bind(cf_e("mouseleave", conf, !1),
                        function() {
                            $cfs.trigger(cf_e("resume", conf))
                        })
                }
                if ((opts.prev.key || opts.next.key) && $(document)
                    .bind(cf_e("keyup", conf, !1, !0, !0), function(
                        t) {
                        var e = t.keyCode;
                        e == opts.next.key && (t.preventDefault(),
                            $cfs.trigger(cf_e("next", conf))
                        ), e == opts.prev.key && (t.preventDefault(),
                            $cfs.trigger(cf_e("prev", conf))
                        )
                    }), opts.pagination.keys && $(document).bind(
                        cf_e("keyup", conf, !1, !0, !0), function(t) {
                            var e = t.keyCode;
                            e >= 49 && 58 > e && (e = (e - 49) *
                                opts.items.visible, itms.total >=
                                e && (t.preventDefault(), $cfs.trigger(
                                    cf_e("slideTo", conf), [
                                        e, 0, !0, opts.pagination
                                    ])))
                        }), $.fn.swipe) {
                    var e = "ontouchstart" in window;
                    if (e && opts.swipe.onTouch || !e && opts.swipe
                        .onMouse) {
                        var i = $.extend(!0, {}, opts.prev, opts.swipe),
                            s = $.extend(!0, {}, opts.next, opts.swipe),
                            o = function() {
                                $cfs.trigger(cf_e("prev", conf), [i])
                            },
                            n = function() {
                                $cfs.trigger(cf_e("next", conf), [s]);
                            };
                        switch (opts.direction) {
                            case "up":
                            case "down":
                                opts.swipe.options.swipeUp = n,
                                    opts.swipe.options.swipeDown =
                                    o;
                                break;
                            default:
                                opts.swipe.options.swipeLeft = n,
                                    opts.swipe.options.swipeRight =
                                    o
                        }
                        crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(
                            opts.swipe.options), $wrp.css(
                            "cursor", "move"), crsl.swipe = !0
                    }
                }
                if ($.fn.mousewheel && opts.mousewheel) {
                    var r = $.extend(!0, {}, opts.prev, opts.mousewheel),
                        a = $.extend(!0, {}, opts.next, opts.mousewheel);
                    crsl.mousewheel && $wrp.unbind(cf_e(
                        "mousewheel", conf, !1)), $wrp.bind(
                        cf_e("mousewheel", conf, !1), function(
                            t, e) {
                            t.preventDefault(), e > 0 ? $cfs.trigger(
                                    cf_e("prev", conf), [r]) :
                                $cfs.trigger(cf_e("next", conf), [
                                    a
                                ])
                        }), crsl.mousewheel = !0
                }
                if (opts.auto.play && $cfs.trigger(cf_e("play",
                    conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                    var c = function() {
                            $cfs.trigger(cf_e("finish", conf)),
                                opts.auto.pauseOnResize && !crsl.isPaused &&
                                $cfs.trigger(cf_e("play", conf)),
                                sz_resetMargin($cfs.children(),
                                    opts), $cfs.trigger(cf_e(
                                    "updateSizes", conf))
                        },
                        l = $(window),
                        d = null;
                    if ($.debounce && "debounce" == conf.onWindowResize)
                        d = $.debounce(200, c);
                    else if ($.throttle && "throttle" == conf.onWindowResize)
                        d = $.throttle(300, c);
                    else {
                        var p = 0,
                            u = 0;
                        d = function() {
                            var t = l.width(),
                                e = l.height();
                            (t != p || e != u) && (c(), p = t,
                                u = e)
                        }
                    }
                    l.bind(cf_e("resize", conf, !1, !0, !0), d)
                }
            }, FN._unbind_buttons = function() {
                var t = (cf_e("", conf), cf_e("", conf, !1));
                ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(
                        ns3), $(window).unbind(ns3), $wrp.unbind(t),
                    opts.auto.button && opts.auto.button.unbind(t),
                    opts.prev.button && opts.prev.button.unbind(t),
                    opts.next.button && opts.next.button.unbind(t),
                    opts.pagination.container && (opts.pagination.container
                        .unbind(t), opts.pagination.anchorBuilder &&
                        opts.pagination.container.children().remove()
                    ), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css(
                        "cursor", "default"), crsl.swipe = !1),
                    crsl.mousewheel && (crsl.mousewheel = !1),
                    nv_showNavi(opts, "hide", conf), nv_enableNavi(
                        opts, "removeClass", conf)
            }, is_boolean(configs) && (configs = {
                debug: configs
            });
            var crsl = {
                    direction: "next",
                    isPaused: !0,
                    isScrolling: !1,
                    isStopped: !1,
                    mousewheel: !1,
                    swipe: !1
                },
                itms = {
                    total: $cfs.children().length,
                    first: 0
                },
                tmrs = {
                    auto: null,
                    progress: null,
                    startTime: getTime(),
                    timePassed: 0
                },
                scrl = {
                    isStopped: !1,
                    duration: 0,
                    startTime: 0,
                    easing: "",
                    anims: []
                },
                clbk = {
                    onBefore: [],
                    onAfter: []
                },
                queu = [],
                conf = $.extend(!0, {}, $.fn.carouFredSel.configs,
                    configs),
                opts = {},
                opts_orig = $.extend(!0, {}, options),
                $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap(
                    "<" + conf.wrapper.element + ' class="' + conf.wrapper
                    .classname + '" />').parent();
            if (conf.selector = $cfs.selector, conf.serialNumber = $.fn
                .carouFredSel.serialNumber++, conf.transition = conf.transition &&
                $.fn.transition ? "transition" : "animate", FN._init(
                    opts_orig, !0, starting_position), FN._build(), FN._bind_events(),
                FN._bind_buttons(), is_array(opts.items.start)) var
                start_arr = opts.items.start;
            else {
                var start_arr = [];
                0 != opts.items.start && start_arr.push(opts.items.start)
            } if (opts.cookie && start_arr.unshift(parseInt(
                    cf_getCookie(opts.cookie), 10)), start_arr.length >
                0)
                for (var a = 0, l = start_arr.length; l > a; a++) {
                    var s = start_arr[a];
                    if (0 != s) {
                        if (s === !0) {
                            if (s = window.location.hash, 1 > s.length)
                                continue
                        } else "random" === s && (s = Math.floor(Math.random() *
                            itms.total)); if ($cfs.triggerHandler(cf_e(
                            "slideTo", conf), [s, 0, !0, {
                            fx: "none"
                        }])) break
                    }
                }
            var siz = sz_setSizes($cfs, opts),
                itm = gi_getCurrentItems($cfs.children(), opts);
            return opts.onCreate && opts.onCreate.call($tt0, {
                    width: siz.width,
                    height: siz.height,
                    items: itm
                }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0,
                    siz
                ]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug &&
                $cfs.trigger(cf_e("debug", conf)), $cfs
        }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
            synchronise: !1,
            infinite: !0,
            circular: !0,
            responsive: !1,
            direction: "left",
            items: {
                start: 0
            },
            scroll: {
                easing: "swing",
                duration: 500,
                pauseOnHover: !1,
                event: "click",
                queue: !1
            }
        }, $.fn.carouFredSel.configs = {
            debug: !1,
            transition: !1,
            onWindowResize: "throttle",
            events: {
                prefix: "",
                namespace: "cfs"
            },
            wrapper: {
                element: "div",
                classname: "caroufredsel_wrapper"
            },
            classnames: {}
        }, $.fn.carouFredSel.pageAnchorBuilder = function(t) {
            return '<a href="#"><span>' + t + "</span></a>"
        }, $.fn.carouFredSel.progressbarUpdater = function(t) {
            $(this).css("width", t + "%")
        }, $.fn.carouFredSel.cookie = {
            get: function(t) {
                t += "=";
                for (var e = document.cookie.split(";"), i = 0, s =
                    e.length; s > i; i++) {
                    for (var o = e[i];
                        " " == o.charAt(0);) o = o.slice(1);
                    if (0 == o.indexOf(t)) return o.slice(t.length)
                }
                return 0
            },
            set: function(t, e, i) {
                var s = "";
                if (i) {
                    var o = new Date;
                    o.setTime(o.getTime() + 864e5 * i), s =
                        "; expires=" + o.toGMTString()
                }
                document.cookie = t + "=" + e + s + "; path=/"
            },
            remove: function(t) {
                $.fn.carouFredSel.cookie.set(t, "", -1)
            }
        }, $.extend($.easing, {
            quadratic: function(t) {
                var e = t * t;
                return t * (-e * t + 4 * e - 6 * t + 4)
            },
            cubic: function(t) {
                return t * (4 * t * t - 9 * t + 6)
            },
            elastic: function(t) {
                var e = t * t;
                return t * (33 * e * e - 106 * e * t + 126 * e -
                    67 * t + 15)
            }
        }))
    }(jQuery), window.Modernizr = function(t, e, i) {
        function s(t) {
            h.cssText = t
        }

        function o(t, e) {
            return typeof t === e
        }
        var n, r, a, c = "2.8.3",
            l = {},
            d = !0,
            p = e.documentElement,
            u = "modernizr",
            f = e.createElement(u),
            h = f.style,
            g = {}.toString,
            m = " -webkit- -moz- -o- -ms- ".split(" "),
            v = {
                svg: "http://www.w3.org/2000/svg"
            },
            b = {},
            _ = [],
            w = _.slice,
            y = function(t, i, s, o) {
                var n, r, a, c, l = e.createElement("div"),
                    d = e.body,
                    f = d || e.createElement("body");
                if (parseInt(s, 10))
                    for (; s--;) a = e.createElement("div"), a.id = o ? o[s] :
                        u + (s + 1), l.appendChild(a);
                return n = ["&#173;", '<style id="s', u, '">', t, "</style>"].join(
                        ""), l.id = u, (d ? l : f).innerHTML += n, f.appendChild(
                        l), d || (f.style.background = "", f.style.overflow =
                        "hidden", c = p.style.overflow, p.style.overflow =
                        "hidden", p.appendChild(f)), r = i(l, t), d ? l.parentNode
                    .removeChild(l) : (f.parentNode.removeChild(f), p.style.overflow =
                        c), !!r
            },
            $ = {}.hasOwnProperty;
        a = o($, "undefined") || o($.call, "undefined") ? function(t, e) {
            return e in t && o(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return $.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var i = w.call(arguments, 1),
                s = function() {
                    if (this instanceof s) {
                        var o = function() {};
                        o.prototype = e.prototype;
                        var n = new o,
                            r = e.apply(n, i.concat(w.call(arguments)));
                        return Object(r) === r ? r : n
                    }
                    return e.apply(t, i.concat(w.call(arguments)))
                };
            return s
        }), b.touch = function() {
            var i;
            return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ?
                i = !0 : y(["@media (", m.join("touch-enabled),("), u, ")",
                    "{#modernizr{top:9px;position:absolute}}"
                ].join(""), function(t) {
                    i = 9 === t.offsetTop
                }), i
        }, b.video = function() {
            var t = e.createElement("video"),
                i = !1;
            try {
                (i = !!t.canPlayType) && (i = new Boolean(i), i.ogg = t.canPlayType(
                        'video/ogg; codecs="theora"').replace(/^no$/, ""),
                    i.h264 = t.canPlayType(
                        'video/mp4; codecs="avc1.42E01E"').replace(/^no$/,
                        ""), i.webm = t.canPlayType(
                        'video/webm; codecs="vp8, vorbis"').replace(/^no$/,
                        ""))
            } catch (s) {}
            return i
        }, b.svg = function() {
            return !!e.createElementNS && !!e.createElementNS(v.svg, "svg")
                .createSVGRect
        }, b.inlinesvg = function() {
            var t = e.createElement("div");
            return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) ==
                v.svg
        }, b.svgclippaths = function() {
            return !!e.createElementNS && /SVGClipPath/.test(g.call(e.createElementNS(
                v.svg, "clipPath")))
        };
        for (var S in b) a(b, S) && (r = S.toLowerCase(), l[r] = b[S](), _.push(
            (l[r] ? "" : "no-") + r));
        return l.addTest = function(t, e) {
                if ("object" == typeof t)
                    for (var s in t) a(t, s) && l.addTest(s, t[s]);
                else {
                    if (t = t.toLowerCase(), l[t] !== i) return l;
                    e = "function" == typeof e ? e() : e, "undefined" != typeof d &&
                        d && (p.className += " " + (e ? "" : "no-") + t), l[t] =
                        e
                }
                return l
            }, s(""), f = n = null,
            function(t, e) {
                function i(t, e) {
                    var i = t.createElement("p"),
                        s = t.getElementsByTagName("head")[0] || t.documentElement;
                    return i.innerHTML = "x<style>" + e + "</style>", s.insertBefore(
                        i.lastChild, s.firstChild)
                }

                function s() {
                    var t = b.elements;
                    return "string" == typeof t ? t.split(" ") : t
                }

                function o(t) {
                    var e = v[t[g]];
                    return e || (e = {}, m++, t[g] = m, v[m] = e), e
                }

                function n(t, i, s) {
                    if (i || (i = e), d) return i.createElement(t);
                    s || (s = o(i));
                    var n;
                    return n = s.cache[t] ? s.cache[t].cloneNode() : h.test(
                            t) ? (s.cache[t] = s.createElem(t)).cloneNode() :
                        s.createElem(t), !n.canHaveChildren || f.test(t) ||
                        n.tagUrn ? n : s.frag.appendChild(n)
                }

                function r(t, i) {
                    if (t || (t = e), d) return t.createDocumentFragment();
                    i = i || o(t);
                    for (var n = i.frag.cloneNode(), r = 0, a = s(), c = a.length; c >
                        r; r++) n.createElement(a[r]);
                    return n
                }

                function a(t, e) {
                    e.cache || (e.cache = {}, e.createElem = t.createElement,
                        e.createFrag = t.createDocumentFragment, e.frag =
                        e.createFrag()), t.createElement = function(i) {
                        return b.shivMethods ? n(i, t, e) : e.createElem(
                            i)
                    }, t.createDocumentFragment = Function("h,f",
                        "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                        s().join().replace(/[\w\-]+/g, function(t) {
                            return e.createElem(t), e.frag.createElement(
                                t), 'c("' + t + '")'
                        }) + ");return n}")(b, e.frag)
                }

                function c(t) {
                    t || (t = e);
                    var s = o(t);
                    return b.shivCSS && !l && !s.hasCSS && (s.hasCSS = !!i(
                        t,
                        "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
                    )), d || a(t, s), t
                }
                var l, d, p = "3.7.0",
                    u = t.html5 || {},
                    f =
                    /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    h =
                    /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    g = "_html5shiv",
                    m = 0,
                    v = {};
                ! function() {
                    try {
                        var t = e.createElement("a");
                        t.innerHTML = "<xyz></xyz>", l = "hidden" in t, d = 1 ==
                            t.childNodes.length || function() {
                                e.createElement("a");
                                var t = e.createDocumentFragment();
                                return "undefined" == typeof t.cloneNode ||
                                    "undefined" == typeof t.createDocumentFragment ||
                                    "undefined" == typeof t.createElement
                            }()
                    } catch (i) {
                        l = !0, d = !0
                    }
                }();
                var b = {
                    elements: u.elements ||
                        "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: p,
                    shivCSS: u.shivCSS !== !1,
                    supportsUnknownElements: d,
                    shivMethods: u.shivMethods !== !1,
                    type: "default",
                    shivDocument: c,
                    createElement: n,
                    createDocumentFragment: r
                };
                t.html5 = b, c(e)
            }(this, e), l._version = c, l._prefixes = m, l.testStyles = y, p.className =
            p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (d ? " js " + _.join(
                " ") : ""), l
    }(this, this.document),
    function(t, e, i) {
        function s(t) {
            return "[object Function]" == m.call(t)
        }

        function o(t) {
            return "string" == typeof t
        }

        function n() {}

        function r(t) {
            return !t || "loaded" == t || "complete" == t ||
                "uninitialized" == t
        }

        function a() {
            var t = v.shift();
            b = 1, t ? t.t ? h(function() {
                ("c" == t.t ? u.injectCss : u.injectJs)(t.s, 0, t.a,
                    t.x, t.e, 1)
            }, 0) : (t(), a()) : b = 0
        }

        function c(t, i, s, o, n, c, l) {
            function d(e) {
                if (!f && r(p.readyState) && (_.r = f = 1, !b && a(), p
                    .onload = p.onreadystatechange = null, e)) {
                    "img" != t && h(function() {
                        y.removeChild(p)
                    }, 50);
                    for (var s in C[i]) C[i].hasOwnProperty(s) && C[i][
                        s
                    ].onload()
                }
            }
            var l = l || u.errorTimeout,
                p = e.createElement(t),
                f = 0,
                m = 0,
                _ = {
                    t: s,
                    s: i,
                    e: n,
                    a: c,
                    x: l
                };
            1 === C[i] && (m = 1, C[i] = []), "object" == t ? p.data = i :
                (p.src = i, p.type = t), p.width = p.height = "0", p.onerror =
                p.onload = p.onreadystatechange = function() {
                    d.call(this, m)
                }, v.splice(o, 0, _), "img" != t && (m || 2 === C[i] ? (y.insertBefore(
                    p, w ? null : g), h(d, l)) : C[i].push(p))
        }

        function l(t, e, i, s, n) {
            return b = 0, e = e || "j", o(t) ? c("c" == e ? S : $, t, e,
                this.i++, i, s, n) : (v.splice(this.i++, 0, t), 1 == v.length &&
                a()), this
        }

        function d() {
            var t = u;
            return t.loader = {
                load: l,
                i: 0
            }, t
        }
        var p, u, f = e.documentElement,
            h = t.setTimeout,
            g = e.getElementsByTagName("script")[0],
            m = {}.toString,
            v = [],
            b = 0,
            _ = "MozAppearance" in f.style,
            w = _ && !!e.createRange().compareNode,
            y = w ? f : g.parentNode,
            f = t.opera && "[object Opera]" == m.call(t.opera),
            f = !!e.attachEvent && !f,
            $ = _ ? "object" : f ? "script" : "img",
            S = f ? "script" : $,
            k = Array.isArray || function(t) {
                return "[object Array]" == m.call(t)
            },
            T = [],
            C = {},
            x = {
                timeout: function(t, e) {
                    return e.length && (t.timeout = e[0]), t
                }
            };
        u = function(t) {
                function e(t) {
                    var e, i, s, t = t.split("!"),
                        o = T.length,
                        n = t.pop(),
                        r = t.length,
                        n = {
                            url: n,
                            origUrl: n,
                            prefixes: t
                        };
                    for (i = 0; r > i; i++) s = t[i].split("="), (e = x[s.shift()]) &&
                        (n = e(n, s));
                    for (i = 0; o > i; i++) n = T[i](n);
                    return n
                }

                function r(t, o, n, r, a) {
                    var c = e(t),
                        l = c.autoCallback;
                    c.url.split(".").pop().split("?").shift(), c.bypass ||
                        (o && (o = s(o) ? o : o[t] || o[r] || o[t.split("/")
                            .pop().split("?")[0]]), c.instead ? c.instead(
                            t, o, n, r, a) : (C[c.url] ? c.noexec = !0 :
                            C[c.url] = 1, n.load(c.url, c.forceCSS || !
                                c.forceJS && "css" == c.url.split(".").pop()
                                .split("?").shift() ? "c" : i, c.noexec,
                                c.attrs, c.timeout), (s(o) || s(l)) &&
                            n.load(function() {
                                d(), o && o(c.origUrl, a, r), l &&
                                    l(c.origUrl, a, r), C[c.url] =
                                    2
                            })))
                }

                function a(t, e) {
                    function i(t, i) {
                        if (t) {
                            if (o(t)) i || (p = function() {
                                var t = [].slice.call(arguments);
                                u.apply(this, t), f()
                            }), r(t, p, e, 0, l);
                            else if (Object(t) === t)
                                for (c in a = function() {
                                    var e, i = 0;
                                    for (e in t) t.hasOwnProperty(e) &&
                                        i++;
                                    return i
                                }(), t) t.hasOwnProperty(c) && (!i && !
                                    --a && (s(p) ? p = function() {
                                        var t = [].slice.call(
                                            arguments);
                                        u.apply(this, t), f()
                                    } : p[c] = function(t) {
                                        return function() {
                                            var e = [].slice
                                                .call(
                                                    arguments
                                                );
                                            t && t.apply(
                                                this, e
                                            ), f()
                                        }
                                    }(u[c])), r(t[c], p, e, c, l))
                        } else !i && f()
                    }
                    var a, c, l = !!t.test,
                        d = t.load || t.both,
                        p = t.callback || n,
                        u = p,
                        f = t.complete || n;
                    i(l ? t.yep : t.nope, !!d), d && i(d)
                }
                var c, l, p = this.yepnope.loader;
                if (o(t)) r(t, 0, p, 0);
                else if (k(t))
                    for (c = 0; c < t.length; c++) l = t[c], o(l) ? r(l, 0, p,
                        0) : k(l) ? u(l) : Object(l) === l && a(l, p);
                else Object(t) === t && a(t, p)
            }, u.addPrefix = function(t, e) {
                x[t] = e
            }, u.addFilter = function(t) {
                T.push(t)
            }, u.errorTimeout = 1e4, null == e.readyState && e.addEventListener &&
            (e.readyState = "loading", e.addEventListener("DOMContentLoaded", p =
                function() {
                    e.removeEventListener("DOMContentLoaded", p, 0), e.readyState =
                        "complete"
                }, 0)), t.yepnope = d(), t.yepnope.executeStack = a, t.yepnope.injectJs =
            function(t, i, s, o, c, l) {
                var d, p, f = e.createElement("script"),
                    o = o || u.errorTimeout;
                f.src = t;
                for (p in s) f.setAttribute(p, s[p]);
                i = l ? a : i || n, f.onreadystatechange = f.onload = function() {
                    !d && r(f.readyState) && (d = 1, i(), f.onload = f.onreadystatechange =
                        null)
                }, h(function() {
                    d || (d = 1, i(1))
                }, o), c ? f.onload() : g.parentNode.insertBefore(f, g)
            }, t.yepnope.injectCss = function(t, i, s, o, r, c) {
                var l, o = e.createElement("link"),
                    i = c ? a : i || n;
                o.href = t, o.rel = "stylesheet", o.type = "text/css";
                for (l in s) o.setAttribute(l, s[l]);
                r || (g.parentNode.insertBefore(o, g), h(i, 0))
            }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, ! function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) :
            "undefined" != typeof exports ? module.exports = t(require("jquery")) :
            t(jQuery)
    }(function(t) {
        "use strict";
        var e = window.Slick || {};
        e = function() {
                function e(e, s) {
                    var o, n, r, a = this;
                    if (a.defaults = {
                            accessibility: !0,
                            adaptiveHeight: !1,
                            appendArrows: t(e),
                            appendDots: t(e),
                            arrows: !0,
                            asNavFor: null,
                            prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',
                            nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',
                            autoplay: !1,
                            autoplaySpeed: 3e3,
                            centerMode: !1,
                            centerPadding: "50px",
                            cssEase: "ease",
                            customPaging: function(t, e) {
                                return
                                    '<button type="button" data-role="none">' +
                                    (e + 1) + "</button>"
                            },
                            dots: !1,
                            dotsClass: "slick-dots",
                            draggable: !0,
                            easing: "linear",
                            edgeFriction: .35,
                            fade: !1,
                            focusOnSelect: !1,
                            infinite: !0,
                            initialSlide: 0,
                            lazyLoad: "ondemand",
                            mobileFirst: !1,
                            pauseOnHover: !0,
                            pauseOnDotsHover: !1,
                            respondTo: "window",
                            responsive: null,
                            rows: 1,
                            rtl: !1,
                            slide: "",
                            slidesPerRow: 1,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 500,
                            swipe: !0,
                            swipeToSlide: !1,
                            touchMove: !0,
                            touchThreshold: 5,
                            useCSS: !0,
                            variableWidth: !1,
                            vertical: !1,
                            verticalSwiping: !1,
                            waitForAnimate: !0
                        }, a.initials = {
                            animating: !1,
                            dragging: !1,
                            autoPlayTimer: null,
                            currentDirection: 0,
                            currentLeft: null,
                            currentSlide: 0,
                            direction: 1,
                            $dots: null,
                            listWidth: null,
                            listHeight: null,
                            loadIndex: 0,
                            $nextArrow: null,
                            $prevArrow: null,
                            slideCount: null,
                            slideWidth: null,
                            $slideTrack: null,
                            $slides: null,
                            sliding: !1,
                            slideOffset: 0,
                            swipeLeft: null,
                            $list: null,
                            touchObject: {},
                            transformsEnabled: !1
                        }, t.extend(a, a.initials), a.activeBreakpoint =
                        null, a.animType = null, a.animProp = null, a.breakpoints = [],
                        a.breakpointSettings = [], a.cssTransitions = !
                        1, a.hidden = "hidden", a.paused = !1, a.positionProp =
                        null, a.respondTo = null, a.rowCount = 1, a.shouldClick = !
                        0, a.$slider = t(e), a.$slidesCache = null, a.transformType =
                        null, a.transitionType = null, a.visibilityChange =
                        "visibilitychange", a.windowWidth = 0, a.windowTimer =
                        null, o = t(e).data("slick") || {}, a.options =
                        t.extend({}, a.defaults, o, s), a.currentSlide =
                        a.options.initialSlide, a.originalSettings = a.options,
                        n = a.options.responsive || null, n && n.length >
                        -1) {
                        a.respondTo = a.options.respondTo || "window";
                        for (r in n) n.hasOwnProperty(r) && (a.breakpoints
                            .push(n[r].breakpoint), a.breakpointSettings[
                                n[r].breakpoint] = n[r].settings);
                        a.breakpoints.sort(function(t, e) {
                            return a.options.mobileFirst === !0 ?
                                t - e : e - t
                        })
                    }
                    "undefined" != typeof document.mozHidden ? (a.hidden =
                            "mozHidden", a.visibilityChange =
                            "mozvisibilitychange") : "undefined" !=
                        typeof document.msHidden ? (a.hidden =
                            "msHidden", a.visibilityChange =
                            "msvisibilitychange") : "undefined" !=
                        typeof document.webkitHidden && (a.hidden =
                            "webkitHidden", a.visibilityChange =
                            "webkitvisibilitychange"), a.autoPlay = t.proxy(
                            a.autoPlay, a), a.autoPlayClear = t.proxy(a
                            .autoPlayClear, a), a.changeSlide = t.proxy(
                            a.changeSlide, a), a.clickHandler = t.proxy(
                            a.clickHandler, a), a.selectHandler = t.proxy(
                            a.selectHandler, a), a.setPosition = t.proxy(
                            a.setPosition, a), a.swipeHandler = t.proxy(
                            a.swipeHandler, a), a.dragHandler = t.proxy(
                            a.dragHandler, a), a.keyHandler = t.proxy(a
                            .keyHandler, a), a.autoPlayIterator = t.proxy(
                            a.autoPlayIterator, a), a.instanceUid = i++,
                        a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, a.init(),
                        a.checkResponsive(!0)
                }
                var i = 0;
                return e
            }(), e.prototype.addSlide = e.prototype.slickAdd = function(e,
                i, s) {
                var o = this;
                if ("boolean" == typeof i) s = i, i = null;
                else if (0 > i || i >= o.slideCount) return !1;
                o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides
                    .length ? t(e).appendTo(o.$slideTrack) : s ? t(e).insertBefore(
                        o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) :
                    s === !0 ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(
                        o.$slideTrack), o.$slides = o.$slideTrack.children(
                        this.options.slide), o.$slideTrack.children(this.options
                        .slide).detach(), o.$slideTrack.append(o.$slides),
                    o.$slides.each(function(e, i) {
                        t(i).attr("data-slick-index", e)
                    }), o.$slidesCache = o.$slides, o.reinit()
            }, e.prototype.animateHeight = function() {
                var t = this;
                if (1 === t.options.slidesToShow && t.options.adaptiveHeight ===
                    !0 && t.options.vertical === !1) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.animate({
                        height: e
                    }, t.options.speed)
                }
            }, e.prototype.animateSlide = function(e, i) {
                var s = {},
                    o = this;
                o.animateHeight(), o.options.rtl === !0 && o.options.vertical ===
                    !1 && (e = -e), o.transformsEnabled === !1 ? o.options.vertical ===
                    !1 ? o.$slideTrack.animate({
                        left: e
                    }, o.options.speed, o.options.easing, i) : o.$slideTrack
                    .animate({
                        top: e
                    }, o.options.speed, o.options.easing, i) : o.cssTransitions ===
                    !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft),
                        t({
                            animStart: o.currentLeft
                        }).animate({
                            animStart: e
                        }, {
                            duration: o.options.speed,
                            easing: o.options.easing,
                            step: function(t) {
                                t = Math.ceil(t), o.options.vertical ===
                                    !1 ? (s[o.animType] =
                                        "translate(" + t +
                                        "px, 0px)", o.$slideTrack.css(
                                            s)) : (s[o.animType] =
                                        "translate(0px," + t +
                                        "px)", o.$slideTrack.css(s)
                                    )
                            },
                            complete: function() {
                                i && i.call()
                            }
                        })) : (o.applyTransition(), e = Math.ceil(e), s[o.animType] =
                        o.options.vertical === !1 ? "translate3d(" + e +
                        "px, 0px, 0px)" : "translate3d(0px," + e +
                        "px, 0px)", o.$slideTrack.css(s), i && setTimeout(
                            function() {
                                o.disableTransition(), i.call()
                            }, o.options.speed))
            }, e.prototype.asNavFor = function(e) {
                var i = this,
                    s = null !== i.options.asNavFor ? t(i.options.asNavFor)
                    .slick("getSlick") : null;
                null !== s && s.slideHandler(e, !0)
            }, e.prototype.applyTransition = function(t) {
                var e = this,
                    i = {};
                i[e.transitionType] = e.options.fade === !1 ? e.transformType +
                    " " + e.options.speed + "ms " + e.options.cssEase :
                    "opacity " + e.options.speed + "ms " + e.options.cssEase,
                    e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides
                    .eq(t).css(i)
            }, e.prototype.autoPlay = function() {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount >
                    t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer =
                        setInterval(t.autoPlayIterator, t.options.autoplaySpeed)
                    )
            }, e.prototype.autoPlayClear = function() {
                var t = this;
                t.autoPlayTimer && clearInterval(t.autoPlayTimer)
            }, e.prototype.autoPlayIterator = function() {
                var t = this;
                t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide +
                        1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(
                            t.currentSlide + t.options.slidesToScroll)) : (
                        0 === t.currentSlide - 1 && (t.direction = 1), t.slideHandler(
                            t.currentSlide - t.options.slidesToScroll)) : t
                    .slideHandler(t.currentSlide + t.options.slidesToScroll)
            }, e.prototype.buildArrows = function() {
                var e = this;
                e.options.arrows === !0 && e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow = t(e.options.prevArrow), e.$nextArrow =
                        t(e.options.nextArrow), e.htmlExpr.test(e.options.prevArrow) &&
                        e.$prevArrow.appendTo(e.options.appendArrows), e.htmlExpr
                        .test(e.options.nextArrow) && e.$nextArrow.appendTo(
                            e.options.appendArrows), e.options.infinite !==
                        !0 && e.$prevArrow.addClass("slick-disabled"))
            }, e.prototype.buildDots = function() {
                var e, i, s = this;
                if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                    for (i = '<ul class="' + s.options.dotsClass + '">', e =
                        0; e <= s.getDotCount(); e += 1) i += "<li>" + s.options
                        .customPaging.call(this, s, e) + "</li>";
                    i += "</ul>", s.$dots = t(i).appendTo(s.options.appendDots),
                        s.$dots.find("li").first().addClass("slick-active")
                        .attr("aria-hidden", "false")
                }
            }, e.prototype.buildOut = function() {
                var e = this;
                e.$slides = e.$slider.children(":not(.slick-cloned)").addClass(
                        "slick-slide"), e.slideCount = e.$slides.length, e.$slides
                    .each(function(e, i) {
                        t(i).attr("data-slick-index", e)
                    }), e.$slidesCache = e.$slides, e.$slider.addClass(
                        "slick-slider"), e.$slideTrack = 0 === e.slideCount ?
                    t('<div class="slick-track"/>').appendTo(e.$slider) : e
                    .$slides.wrapAll('<div class="slick-track"/>').parent(),
                    e.$list = e.$slideTrack.wrap(
                        '<div aria-live="polite" class="slick-list"/>').parent(),
                    e.$slideTrack.css("opacity", 0), (e.options.centerMode ===
                        !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll =
                        1), t("img[data-lazy]", e.$slider).not("[src]").addClass(
                        "slick-loading"), e.setupInfinite(), e.buildArrows(),
                    e.buildDots(), e.updateDots(), e.options.accessibility ===
                    !0 && e.$list.prop("tabIndex", 0), e.setSlideClasses(
                        "number" == typeof this.currentSlide ? this.currentSlide :
                        0), e.options.draggable === !0 && e.$list.addClass(
                        "draggable")
            }, e.prototype.buildRows = function() {
                var t, e, i, s, o, n, r, a = this;
                if (s = document.createDocumentFragment(), n = a.$slider.children(),
                    a.options.rows > 1) {
                    for (r = a.options.slidesPerRow * a.options.rows, o =
                        Math.ceil(n.length / r), t = 0; o > t; t++) {
                        var c = document.createElement("div");
                        for (e = 0; e < a.options.rows; e++) {
                            var l = document.createElement("div");
                            for (i = 0; i < a.options.slidesPerRow; i++) {
                                var d = t * r + (e * a.options.slidesPerRow +
                                    i);
                                n.get(d) && l.appendChild(n.get(d))
                            }
                            c.appendChild(l)
                        }
                        s.appendChild(c)
                    }
                    a.$slider.html(s), a.$slider.children().children().children()
                        .width(100 / a.options.slidesPerRow + "%").css({
                            display: "inline-block"
                        })
                }
            }, e.prototype.checkResponsive = function(e) {
                var i, s, o, n = this,
                    r = n.$slider.width(),
                    a = window.innerWidth || t(window).width();
                if ("window" === n.respondTo ? o = a : "slider" === n.respondTo ?
                    o = r : "min" === n.respondTo && (o = Math.min(a, r)),
                    n.originalSettings.responsive && n.originalSettings.responsive
                    .length > -1 && null !== n.originalSettings.responsive) {
                    s = null;
                    for (i in n.breakpoints) n.breakpoints.hasOwnProperty(i) &&
                        (n.originalSettings.mobileFirst === !1 ? o < n.breakpoints[
                            i] && (s = n.breakpoints[i]) : o > n.breakpoints[
                            i] && (s = n.breakpoints[i]));
                    null !== s ? null !== n.activeBreakpoint ? s !== n.activeBreakpoint &&
                        (n.activeBreakpoint = s, "unslick" === n.breakpointSettings[
                            s] ? n.unslick() : (n.options = t.extend({},
                            n.originalSettings, n.breakpointSettings[
                                s]), e === !0 && (n.currentSlide =
                            n.options.initialSlide), n.refresh())) : (n.activeBreakpoint =
                            s, "unslick" === n.breakpointSettings[s] ? n.unslick() :
                            (n.options = t.extend({}, n.originalSettings, n
                                    .breakpointSettings[s]), e === !0 && (n
                                    .currentSlide = n.options.initialSlide),
                                n.refresh())) : null !== n.activeBreakpoint &&
                        (n.activeBreakpoint = null, n.options = n.originalSettings,
                            e === !0 && (n.currentSlide = n.options.initialSlide),
                            n.refresh())
                }
            }, e.prototype.changeSlide = function(e, i) {
                var s, o, n, r = this,
                    a = t(e.target);
                switch (a.is("a") && e.preventDefault(), n = 0 !== r.slideCount %
                    r.options.slidesToScroll, s = n ? 0 : (r.slideCount - r
                        .currentSlide) % r.options.slidesToScroll, e.data.message
                ) {
                    case "previous":
                        o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow -
                            s, r.slideCount > r.options.slidesToShow && r.slideHandler(
                                r.currentSlide - o, !1, i);
                        break;
                    case "next":
                        o = 0 === s ? r.options.slidesToScroll : s, r.slideCount >
                            r.options.slidesToShow && r.slideHandler(r.currentSlide +
                                o, !1, i);
                        break;
                    case "index":
                        var c = 0 === e.data.index ? 0 : e.data.index || t(
                            e.target).parent().index() * r.options.slidesToScroll;
                        r.slideHandler(r.checkNavigable(c), !1, i);
                        break;
                    default:
                        return
                }
            }, e.prototype.checkNavigable = function(t) {
                var e, i, s = this;
                if (e = s.getNavigableIndexes(), i = 0, t > e[e.length - 1])
                    t = e[e.length - 1];
                else
                    for (var o in e) {
                        if (t < e[o]) {
                            t = i;
                            break
                        }
                        i = e[o]
                    }
                return t
            }, e.prototype.cleanUpEvents = function() {
                var e = this;
                e.options.dots === !0 && e.slideCount > e.options.slidesToShow &&
                    t("li", e.$dots).off("click.slick", e.changeSlide), e.options
                    .dots === !0 && e.options.pauseOnDotsHover === !0 && e.options
                    .autoplay === !0 && t("li", e.$dots).off(
                        "mouseenter.slick", e.setPaused.bind(e, !0)).off(
                        "mouseleave.slick", e.setPaused.bind(e, !1)), e.options
                    .arrows === !0 && e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)
                    ), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                    e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                    e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                    e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                    e.$list.off("click.slick", e.clickHandler), e.options.autoplay ===
                    !0 && t(document).off(e.visibilityChange, e.visibility),
                    e.$list.off("mouseenter.slick", e.setPaused.bind(e, !0)),
                    e.$list.off("mouseleave.slick", e.setPaused.bind(e, !1)),
                    e.options.accessibility === !0 && e.$list.off(
                        "keydown.slick", e.keyHandler), e.options.focusOnSelect ===
                    !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler),
                    t(window).off("orientationchange.slick.slick-" + e.instanceUid,
                        e.orientationChange), t(window).off(
                        "resize.slick.slick-" + e.instanceUid, e.resize), t(
                        "[draggable!=true]", e.$slideTrack).off("dragstart",
                        e.preventDefault), t(window).off(
                        "load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).off("ready.slick.slick-" + e.instanceUid, e
                        .setPosition)
            }, e.prototype.cleanUpRows = function() {
                var t, e = this;
                e.options.rows > 1 && (t = e.$slides.children().children(),
                    t.removeAttr("style"), e.$slider.html(t))
            }, e.prototype.clickHandler = function(t) {
                var e = this;
                e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(),
                    t.preventDefault())
            }, e.prototype.destroy = function() {
                var e = this;
                e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), t(
                        ".slick-cloned", e.$slider).remove(), e.$dots && e.$dots
                    .remove(), e.$prevArrow && "object" != typeof e.options
                    .prevArrow && e.$prevArrow.remove(), e.$nextArrow &&
                    "object" != typeof e.options.nextArrow && e.$nextArrow.remove(),
                    e.$slides && (e.$slides.removeClass(
                        "slick-slide slick-active slick-center slick-visible"
                    ).attr("aria-hidden", "true").removeAttr(
                        "data-slick-index").css({
                        position: "",
                        left: "",
                        top: "",
                        zIndex: "",
                        opacity: "",
                        width: ""
                    }), e.$slider.html(e.$slides)), e.cleanUpRows(), e.$slider
                    .removeClass("slick-slider"), e.$slider.removeClass(
                        "slick-initialized")
            }, e.prototype.disableTransition = function(t) {
                var e = this,
                    i = {};
                i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack
                    .css(i) : e.$slides.eq(t).css(i)
            }, e.prototype.fadeSlide = function(t, e) {
                var i = this;
                i.cssTransitions === !1 ? (i.$slides.eq(t).css({
                    zIndex: 1e3
                }), i.$slides.eq(t).animate({
                    opacity: 1
                }, i.options.speed, i.options.easing, e)) : (i.applyTransition(
                    t), i.$slides.eq(t).css({
                    opacity: 1,
                    zIndex: 1e3
                }), e && setTimeout(function() {
                    i.disableTransition(t), e.call()
                }, i.options.speed))
            }, e.prototype.filterSlides = e.prototype.slickFilter =
            function(t) {
                var e = this;
                null !== t && (e.unload(), e.$slideTrack.children(this.options
                    .slide).detach(), e.$slidesCache.filter(t).appendTo(
                    e.$slideTrack), e.reinit())
            }, e.prototype.getCurrent = e.prototype.slickCurrentSlide =
            function() {
                var t = this;
                return t.currentSlide
            }, e.prototype.getDotCount = function() {
                var t = this,
                    e = 0,
                    i = 0,
                    s = 0;
                if (t.options.infinite === !0) s = Math.ceil(t.slideCount /
                    t.options.slidesToScroll);
                else if (t.options.centerMode === !0) s = t.slideCount;
                else
                    for (; e < t.slideCount;)++s, e = i + t.options.slidesToShow,
                        i += t.options.slidesToScroll <= t.options.slidesToShow ?
                        t.options.slidesToScroll : t.options.slidesToShow;
                return s - 1
            }, e.prototype.getLeft = function(t) {
                var e, i, s, o = this,
                    n = 0;
                return o.slideOffset = 0, i = o.$slides.first().outerHeight(),
                    o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow &&
                        (o.slideOffset = -1 * o.slideWidth * o.options.slidesToShow,
                            n = -1 * i * o.options.slidesToShow), 0 !== o.slideCount %
                        o.options.slidesToScroll && t + o.options.slidesToScroll >
                        o.slideCount && o.slideCount > o.options.slidesToShow &&
                        (t > o.slideCount ? (o.slideOffset = -1 * (o.options
                                .slidesToShow - (t - o.slideCount)) * o
                            .slideWidth, n = -1 * (o.options.slidesToShow -
                                (t - o.slideCount)) * i) : (o.slideOffset = -
                            1 * o.slideCount % o.options.slidesToScroll *
                            o.slideWidth, n = -1 * o.slideCount % o.options
                            .slidesToScroll * i))) : t + o.options.slidesToShow >
                    o.slideCount && (o.slideOffset = (t + o.options.slidesToShow -
                        o.slideCount) * o.slideWidth, n = (t + o.options
                        .slidesToShow - o.slideCount) * i), o.slideCount <=
                    o.options.slidesToShow && (o.slideOffset = 0, n = 0), o
                    .options.centerMode === !0 && o.options.infinite === !0 ?
                    o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow /
                        2) - o.slideWidth : o.options.centerMode === !0 &&
                    (o.slideOffset = 0, o.slideOffset += o.slideWidth *
                        Math.floor(o.options.slidesToShow / 2)), e = o.options
                    .vertical === !1 ? -1 * t * o.slideWidth + o.slideOffset :
                    -1 * t * i + n, o.options.variableWidth === !0 && (s =
                        o.$slideTrack.children(".slick-slide").eq(o.slideCount <=
                            o.options.slidesToShow || o.options.infinite ===
                            !1 ? t : t + o.options.slidesToShow), e = s[0] ?
                        -1 * s[0].offsetLeft : 0, o.options.centerMode ===
                        !0 && (s = o.$slideTrack.children(".slick-slide").eq(
                                o.options.infinite === !1 ? t : t + o.options
                                .slidesToShow + 1), e = s[0] ? -1 * s[0].offsetLeft :
                            0, e += (o.$list.width() - s.outerWidth()) / 2)
                    ), e
            }, e.prototype.getOption = e.prototype.slickGetOption =
            function(t) {
                var e = this;
                return e.options[t]
            }, e.prototype.getNavigableIndexes = function() {
                var t, e = this,
                    i = 0,
                    s = 0,
                    o = [];
                for (e.options.infinite === !1 ? (t = e.slideCount - e.options
                    .slidesToShow + 1, e.options.centerMode === !0 && (
                        t = e.slideCount)) : (i = -1 * e.options.slidesToScroll,
                    s = -1 * e.options.slidesToScroll, t = 2 * e.slideCount
                ); t > i;) o.push(i), i = s + e.options.slidesToScroll, s +=
                    e.options.slidesToScroll <= e.options.slidesToShow ? e.options
                    .slidesToScroll : e.options.slidesToShow;
                return o
            }, e.prototype.getSlick = function() {
                return this
            }, e.prototype.getSlideCount = function() {
                var e, i, s, o = this;
                return s = o.options.centerMode === !0 ? o.slideWidth *
                    Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide ===
                    !0 ? (o.$slideTrack.find(".slick-slide").each(function(
                            e, n) {
                            return n.offsetLeft - s + t(n).outerWidth() /
                                2 > -1 * o.swipeLeft ? (i = n, !1) :
                                void 0
                        }), e = Math.abs(t(i).attr("data-slick-index") - o.currentSlide) ||
                        1) : o.options.slidesToScroll
            }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
                var i = this;
                i.changeSlide({
                    data: {
                        message: "index",
                        index: parseInt(t)
                    }
                }, e)
            }, e.prototype.init = function() {
                var e = this;
                t(e.$slider).hasClass("slick-initialized") || (t(e.$slider)
                    .addClass("slick-initialized"), e.buildRows(), e.buildOut(),
                    e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(),
                    e.updateArrows(), e.updateDots()), e.$slider.trigger(
                    "init", [e])
            }, e.prototype.initArrowEvents = function() {
                var t = this;
                t.options.arrows === !0 && t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.on("click.slick", {
                        message: "previous"
                    }, t.changeSlide), t.$nextArrow.on("click.slick", {
                        message: "next"
                    }, t.changeSlide))
            }, e.prototype.initDotEvents = function() {
                var e = this;
                e.options.dots === !0 && e.slideCount > e.options.slidesToShow &&
                    t("li", e.$dots).on("click.slick", {
                        message: "index"
                    }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover ===
                    !0 && e.options.autoplay === !0 && t("li", e.$dots).on(
                        "mouseenter.slick", e.setPaused.bind(e, !0)).on(
                        "mouseleave.slick", e.setPaused.bind(e, !1))
            }, e.prototype.initializeEvents = function() {
                var e = this;
                e.initArrowEvents(), e.initDotEvents(), e.$list.on(
                        "touchstart.slick mousedown.slick", {
                            action: "start"
                        }, e.swipeHandler), e.$list.on(
                        "touchmove.slick mousemove.slick", {
                            action: "move"
                        }, e.swipeHandler), e.$list.on(
                        "touchend.slick mouseup.slick", {
                            action: "end"
                        }, e.swipeHandler), e.$list.on(
                        "touchcancel.slick mouseleave.slick", {
                            action: "end"
                        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler),
                    e.options.autoplay === !0 && t(document).on(e.visibilityChange,
                        e.visibility.bind(e)), e.$list.on(
                        "mouseenter.slick", e.setPaused.bind(e, !0)), e.$list
                    .on("mouseleave.slick", e.setPaused.bind(e, !1)), e.options
                    .accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler),
                    e.options.focusOnSelect === !0 && t(e.$slideTrack).children()
                    .on("click.slick", e.selectHandler), t(window).on(
                        "orientationchange.slick.slick-" + e.instanceUid, e
                        .orientationChange.bind(e)), t(window).on(
                        "resize.slick.slick-" + e.instanceUid, e.resize.bind(
                            e)), t("[draggable!=true]", e.$slideTrack).on(
                        "dragstart", e.preventDefault), t(window).on(
                        "load.slick.slick-" + e.instanceUid, e.setPosition),
                    t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
            }, e.prototype.initUI = function() {
                var t = this;
                t.options.arrows === !0 && t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots ===
                    !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(),
                    t.options.autoplay === !0 && t.autoPlay()
            }, e.prototype.keyHandler = function(t) {
                var e = this;
                37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
                        data: {
                            message: "previous"
                        }
                    }) : 39 === t.keyCode && e.options.accessibility === !0 &&
                    e.changeSlide({
                        data: {
                            message: "next"
                        }
                    })
            }, e.prototype.lazyLoad = function() {
                function e(e) {
                    t("img[data-lazy]", e).each(function() {
                        var e = t(this),
                            i = t(this).attr("data-lazy"),
                            s = document.createElement("img");
                        s.onload = function() {
                            e.animate({
                                opacity: 1
                            }, 200)
                        }, s.src = i, e.css({
                            opacity: 0
                        }).attr("src", i).removeAttr(
                            "data-lazy").removeClass(
                            "slick-loading")
                    })
                }
                var i, s, o, n, r = this;
                r.options.centerMode === !0 ? r.options.infinite === !0 ? (
                        o = r.currentSlide + (r.options.slidesToShow / 2 +
                            1), n = o + r.options.slidesToShow + 2) : (o =
                        Math.max(0, r.currentSlide - (r.options.slidesToShow /
                            2 + 1)), n = 2 + (r.options.slidesToShow / 2 +
                            1) + r.currentSlide) : (o = r.options.infinite ?
                        r.options.slidesToShow + r.currentSlide : r.currentSlide,
                        n = o + r.options.slidesToShow, r.options.fade ===
                        !0 && (o > 0 && o--, n <= r.slideCount && n++)), i =
                    r.$slider.find(".slick-slide").slice(o, n), e(i), r.slideCount <=
                    r.options.slidesToShow ? (s = r.$slider.find(
                        ".slick-slide"), e(s)) : r.currentSlide >= r.slideCount -
                    r.options.slidesToShow ? (s = r.$slider.find(
                            ".slick-cloned").slice(0, r.options.slidesToShow),
                        e(s)) : 0 === r.currentSlide && (s = r.$slider.find(
                            ".slick-cloned").slice(-1 * r.options.slidesToShow),
                        e(s))
            }, e.prototype.loadSlider = function() {
                var t = this;
                t.setPosition(), t.$slideTrack.css({
                        opacity: 1
                    }), t.$slider.removeClass("slick-loading"), t.initUI(),
                    "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
            }, e.prototype.next = e.prototype.slickNext = function() {
                var t = this;
                t.changeSlide({
                    data: {
                        message: "next"
                    }
                })
            }, e.prototype.orientationChange = function() {
                var t = this;
                t.checkResponsive(), t.setPosition()
            }, e.prototype.pause = e.prototype.slickPause = function() {
                var t = this;
                t.autoPlayClear(), t.paused = !0
            }, e.prototype.play = e.prototype.slickPlay = function() {
                var t = this;
                t.paused = !1, t.autoPlay()
            }, e.prototype.postSlide = function(t) {
                var e = this;
                e.$slider.trigger("afterChange", [e, t]), e.animating = !1,
                    e.setPosition(), e.swipeLeft = null, e.options.autoplay ===
                    !0 && e.paused === !1 && e.autoPlay()
            }, e.prototype.prev = e.prototype.slickPrev = function() {
                var t = this;
                t.changeSlide({
                    data: {
                        message: "previous"
                    }
                })
            }, e.prototype.preventDefault = function(t) {
                t.preventDefault()
            }, e.prototype.progressiveLazyLoad = function() {
                var e, i, s = this;
                e = t("img[data-lazy]", s.$slider).length, e > 0 && (i = t(
                    "img[data-lazy]", s.$slider).first(), i.attr(
                    "src", i.attr("data-lazy")).removeClass(
                    "slick-loading").load(function() {
                    i.removeAttr("data-lazy"), s.progressiveLazyLoad(),
                        s.options.adaptiveHeight === !0 && s.setPosition()
                }).error(function() {
                    i.removeAttr("data-lazy"), s.progressiveLazyLoad()
                }))
            }, e.prototype.refresh = function() {
                var e = this,
                    i = e.currentSlide;
                e.destroy(), t.extend(e, e.initials), e.init(), e.changeSlide({
                    data: {
                        message: "index",
                        index: i
                    }
                }, !1)
            }, e.prototype.reinit = function() {
                var e = this;
                e.$slides = e.$slideTrack.children(e.options.slide).addClass(
                        "slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >=
                    e.slideCount && 0 !== e.currentSlide && (e.currentSlide =
                        e.currentSlide - e.options.slidesToScroll), e.slideCount <=
                    e.options.slidesToShow && (e.currentSlide = 0), e.setProps(),
                    e.setupInfinite(), e.buildArrows(), e.updateArrows(), e
                    .initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(),
                    e.options.focusOnSelect === !0 && t(e.$slideTrack).children()
                    .on("click.slick", e.selectHandler), e.setSlideClasses(
                        0), e.setPosition(), e.$slider.trigger("reInit", [e])
            }, e.prototype.resize = function() {
                var e = this;
                t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
                    e.windowDelay = window.setTimeout(function() {
                        e.windowWidth = t(window).width(), e.checkResponsive(),
                            e.setPosition()
                    }, 50))
            }, e.prototype.removeSlide = e.prototype.slickRemove = function(
                t, e, i) {
                var s = this;
                return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : s
                        .slideCount - 1) : t = e === !0 ? --t : t, s.slideCount <
                    1 || 0 > t || t > s.slideCount - 1 ? !1 : (s.unload(),
                        i === !0 ? s.$slideTrack.children().remove() : s.$slideTrack
                        .children(this.options.slide).eq(t).remove(), s.$slides =
                        s.$slideTrack.children(this.options.slide), s.$slideTrack
                        .children(this.options.slide).detach(), s.$slideTrack
                        .append(s.$slides), s.$slidesCache = s.$slides,
                        void s.reinit())
            }, e.prototype.setCSS = function(t) {
                var e, i, s = this,
                    o = {};
                s.options.rtl === !0 && (t = -t), e = "left" == s.positionProp ?
                    Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ?
                    Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, s.transformsEnabled ===
                    !1 ? s.$slideTrack.css(o) : (o = {}, s.cssTransitions ===
                        !1 ? (o[s.animType] = "translate(" + e + ", " + i +
                            ")", s.$slideTrack.css(o)) : (o[s.animType] =
                            "translate3d(" + e + ", " + i + ", 0px)", s.$slideTrack
                            .css(o)))
            }, e.prototype.setDimensions = function() {
                var t = this;
                t.options.vertical === !1 ? t.options.centerMode === !0 &&
                    t.$list.css({
                        padding: "0px " + t.options.centerPadding
                    }) : (t.$list.height(t.$slides.first().outerHeight(!0) *
                            t.options.slidesToShow), t.options.centerMode ===
                        !0 && t.$list.css({
                            padding: t.options.centerPadding + " 0px"
                        })), t.listWidth = t.$list.width(), t.listHeight =
                    t.$list.height(), t.options.vertical === !1 && t.options
                    .variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth /
                        t.options.slidesToShow), t.$slideTrack.width(
                        Math.ceil(t.slideWidth * t.$slideTrack.children(
                            ".slick-slide").length))) : t.options.variableWidth ===
                    !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth =
                        Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(
                            t.$slides.first().outerHeight(!0) * t.$slideTrack
                            .children(".slick-slide").length)));
                var e = t.$slides.first().outerWidth(!0) - t.$slides.first()
                    .width();
                t.options.variableWidth === !1 && t.$slideTrack.children(
                    ".slick-slide").width(t.slideWidth - e)
            }, e.prototype.setFade = function() {
                var e, i = this;
                i.$slides.each(function(s, o) {
                    e = -1 * i.slideWidth * s, t(o).css(i.options.rtl ===
                        !0 ? {
                            position: "relative",
                            right: e,
                            top: 0,
                            zIndex: 800,
                            opacity: 0
                        } : {
                            position: "relative",
                            left: e,
                            top: 0,
                            zIndex: 800,
                            opacity: 0
                        })
                }), i.$slides.eq(i.currentSlide).css({
                    zIndex: 900,
                    opacity: 1
                })
            }, e.prototype.setHeight = function() {
                var t = this;
                if (1 === t.options.slidesToShow && t.options.adaptiveHeight ===
                    !0 && t.options.vertical === !1) {
                    var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                    t.$list.css("height", e)
                }
            }, e.prototype.setOption = e.prototype.slickSetOption =
            function(t, e, i) {
                var s = this;
                s.options[t] = e, i === !0 && (s.unload(), s.reinit())
            }, e.prototype.setPosition = function() {
                var t = this;
                t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t
                    .setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider
                    .trigger("setPosition", [t])
            }, e.prototype.setProps = function() {
                var t = this,
                    e = document.body.style;
                t.positionProp = t.options.vertical === !0 ? "top" : "left",
                    "top" === t.positionProp ? t.$slider.addClass(
                        "slick-vertical") : t.$slider.removeClass(
                        "slick-vertical"), (void 0 !== e.WebkitTransition ||
                        void 0 !== e.MozTransition || void 0 !== e.msTransition
                    ) && t.options.useCSS === !0 && (t.cssTransitions = !0),
                    void 0 !== e.OTransform && (t.animType = "OTransform",
                        t.transformType = "-o-transform", t.transitionType =
                        "OTransition", void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective && (t.animType = !1)
                    ), void 0 !== e.MozTransform && (t.animType =
                        "MozTransform", t.transformType = "-moz-transform",
                        t.transitionType = "MozTransition", void 0 === e.perspectiveProperty &&
                        void 0 === e.MozPerspective && (t.animType = !1)),
                    void 0 !== e.webkitTransform && (t.animType =
                        "webkitTransform", t.transformType =
                        "-webkit-transform", t.transitionType =
                        "webkitTransition", void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective && (t.animType = !1)
                    ), void 0 !== e.msTransform && (t.animType =
                        "msTransform", t.transformType = "-ms-transform", t
                        .transitionType = "msTransition", void 0 === e.msTransform &&
                        (t.animType = !1)), void 0 !== e.transform && t.animType !==
                    !1 && (t.animType = "transform", t.transformType =
                        "transform", t.transitionType = "transition"), t.transformsEnabled =
                    null !== t.animType && t.animType !== !1
            }, e.prototype.setSlideClasses = function(t) {
                var e, i, s, o, n = this;
                n.$slider.find(".slick-slide").removeClass("slick-active").attr(
                        "aria-hidden", "true").removeClass("slick-center"),
                    i = n.$slider.find(".slick-slide"), n.options.centerMode ===
                    !0 ? (e = Math.floor(n.options.slidesToShow / 2), n.options
                        .infinite === !0 && (t >= e && t <= n.slideCount -
                            1 - e ? n.$slides.slice(t - e, t + e + 1).addClass(
                                "slick-active").attr("aria-hidden", "false") :
                            (s = n.options.slidesToShow + t, i.slice(s - e +
                                1, s + e + 2).addClass("slick-active").attr(
                                "aria-hidden", "false")), 0 === t ? i.eq(i.length -
                                1 - n.options.slidesToShow).addClass(
                                "slick-center") : t === n.slideCount - 1 &&
                            i.eq(n.options.slidesToShow).addClass(
                                "slick-center")), n.$slides.eq(t).addClass(
                            "slick-center")) : t >= 0 && t <= n.slideCount -
                    n.options.slidesToShow ? n.$slides.slice(t, t + n.options
                        .slidesToShow).addClass("slick-active").attr(
                        "aria-hidden", "false") : i.length <= n.options.slidesToShow ?
                    i.addClass("slick-active").attr("aria-hidden", "false") :
                    (o = n.slideCount % n.options.slidesToShow, s = n.options
                        .infinite === !0 ? n.options.slidesToShow + t : t,
                        n.options.slidesToShow == n.options.slidesToScroll &&
                        n.slideCount - t < n.options.slidesToShow ? i.slice(
                            s - (n.options.slidesToShow - o), s + o).addClass(
                            "slick-active").attr("aria-hidden", "false") :
                        i.slice(s, s + n.options.slidesToShow).addClass(
                            "slick-active").attr("aria-hidden", "false")),
                    "ondemand" === n.options.lazyLoad && n.lazyLoad()
            }, e.prototype.setupInfinite = function() {
                var e, i, s, o = this;
                if (o.options.fade === !0 && (o.options.centerMode = !1), o
                    .options.infinite === !0 && o.options.fade === !1 && (i =
                        null, o.slideCount > o.options.slidesToShow)) {
                    for (s = o.options.centerMode === !0 ? o.options.slidesToShow +
                        1 : o.options.slidesToShow, e = o.slideCount; e > o
                        .slideCount - s; e -= 1) i = e - 1, t(o.$slides[i])
                        .clone(!0).attr("id", "").attr("data-slick-index",
                            i - o.slideCount).prependTo(o.$slideTrack).addClass(
                            "slick-cloned");
                    for (e = 0; s > e; e += 1) i = e, t(o.$slides[i]).clone(!
                        0).attr("id", "").attr("data-slick-index", i +
                        o.slideCount).appendTo(o.$slideTrack).addClass(
                        "slick-cloned");
                    o.$slideTrack.find(".slick-cloned").find("[id]").each(
                        function() {
                            t(this).attr("id", "")
                        })
                }
            }, e.prototype.setPaused = function(t) {
                var e = this;
                e.options.autoplay === !0 && e.options.pauseOnHover === !0 &&
                    (e.paused = t, e.autoPlayClear())
            }, e.prototype.selectHandler = function(e) {
                var i = this,
                    s = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target)
                    .parents(".slick-slide"),
                    o = parseInt(s.attr("data-slick-index"));
                return o || (o = 0), i.slideCount <= i.options.slidesToShow ?
                    (i.$slider.find(".slick-slide").removeClass(
                            "slick-active").attr("aria-hidden", "true"), i.$slides
                        .eq(o).addClass("slick-active").attr("aria-hidden",
                            "false"), i.options.centerMode === !0 && (i.$slider
                            .find(".slick-slide").removeClass(
                                "slick-center"), i.$slides.eq(o).addClass(
                                "slick-center")), void i.asNavFor(o)) :
                    void i.slideHandler(o)
            }, e.prototype.slideHandler = function(t, e, i) {
                var s, o, n, r, a = null,
                    c = this;
                return e = e || !1, c.animating === !0 && c.options.waitForAnimate ===
                    !0 || c.options.fade === !0 && c.currentSlide === t ||
                    c.slideCount <= c.options.slidesToShow ? void 0 : (e ===
                        !1 && c.asNavFor(t), s = t, a = c.getLeft(s), r = c
                        .getLeft(c.currentSlide), c.currentLeft = null ===
                        c.swipeLeft ? r : c.swipeLeft, c.options.infinite ===
                        !1 && c.options.centerMode === !1 && (0 > t || t >
                            c.getDotCount() * c.options.slidesToScroll) ?
                        void(c.options.fade === !1 && (s = c.currentSlide,
                            i !== !0 ? c.animateSlide(r, function() {
                                c.postSlide(s)
                            }) : c.postSlide(s))) : c.options.infinite ===
                        !1 && c.options.centerMode === !0 && (0 > t || t >
                            c.slideCount - c.options.slidesToScroll) ? void(
                            c.options.fade === !1 && (s = c.currentSlide, i !==
                                !0 ? c.animateSlide(r, function() {
                                    c.postSlide(s)
                                }) : c.postSlide(s))) : (c.options.autoplay ===
                            !0 && clearInterval(c.autoPlayTimer), o = 0 > s ?
                            0 !== c.slideCount % c.options.slidesToScroll ?
                            c.slideCount - c.slideCount % c.options.slidesToScroll :
                            c.slideCount + s : s >= c.slideCount ? 0 !== c.slideCount %
                            c.options.slidesToScroll ? 0 : s - c.slideCount :
                            s, c.animating = !0, c.$slider.trigger(
                                "beforeChange", [c, c.currentSlide, o]), n =
                            c.currentSlide, c.currentSlide = o, c.setSlideClasses(
                                c.currentSlide), c.updateDots(), c.updateArrows(),
                            c.options.fade === !0 ? (i !== !0 ? c.fadeSlide(
                                o, function() {
                                    c.postSlide(o)
                                }) : c.postSlide(o), void c.animateHeight()) :
                            void(i !== !0 ? c.animateSlide(a, function() {
                                c.postSlide(o)
                            }) : c.postSlide(o))))
            }, e.prototype.startLoad = function() {
                var t = this;
                t.options.arrows === !0 && t.slideCount > t.options.slidesToShow &&
                    (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots ===
                    !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                    t.$slider.addClass("slick-loading")
            }, e.prototype.swipeDirection = function() {
                var t, e, i, s, o = this;
                return t = o.touchObject.startX - o.touchObject.curX, e = o
                    .touchObject.startY - o.touchObject.curY, i = Math.atan2(
                        e, t), s = Math.round(180 * i / Math.PI), 0 > s &&
                    (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl ===
                    !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options
                    .rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ?
                    o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping ===
                    !0 ? s >= 35 && 135 >= s ? "left" : "right" :
                    "vertical"
            }, e.prototype.swipeEnd = function() {
                var t, e = this;
                if (e.dragging = !1, e.shouldClick = e.touchObject.swipeLength >
                    10 ? !1 : !0, void 0 === e.touchObject.curX) return !1;
                if (e.touchObject.edgeHit === !0 && e.$slider.trigger(
                        "edge", [e, e.swipeDirection()]), e.touchObject.swipeLength >=
                    e.touchObject.minSwipe) switch (e.swipeDirection()) {
                    case "left":
                        t = e.options.swipeToSlide ? e.checkNavigable(e
                                .currentSlide + e.getSlideCount()) : e.currentSlide +
                            e.getSlideCount(), e.slideHandler(t), e.currentDirection =
                            0, e.touchObject = {}, e.$slider.trigger(
                                "swipe", [e, "left"]);
                        break;
                    case "right":
                        t = e.options.swipeToSlide ? e.checkNavigable(e
                                .currentSlide - e.getSlideCount()) : e.currentSlide -
                            e.getSlideCount(), e.slideHandler(t), e.currentDirection =
                            1, e.touchObject = {}, e.$slider.trigger(
                                "swipe", [e, "right"])
                } else e.touchObject.startX !== e.touchObject.curX && (
                    e.slideHandler(e.currentSlide), e.touchObject = {}
                )
            }, e.prototype.swipeHandler = function(t) {
                var e = this;
                if (!(e.options.swipe === !1 || "ontouchend" in document &&
                    e.options.swipe === !1 || e.options.draggable === !
                    1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject
                    .fingerCount = t.originalEvent && void 0 !== t.originalEvent
                    .touches ? t.originalEvent.touches.length : 1, e.touchObject
                    .minSwipe = e.listWidth / e.options.touchThreshold,
                    e.options.verticalSwiping === !0 && (e.touchObject.minSwipe =
                        e.listHeight / e.options.touchThreshold), t.data
                    .action) {
                    case "start":
                        e.swipeStart(t);
                        break;
                    case "move":
                        e.swipeMove(t);
                        break;
                    case "end":
                        e.swipeEnd(t)
                }
            }, e.prototype.swipeMove = function(t) {
                var e, i, s, o, n, r = this;
                return n = void 0 !== t.originalEvent ? t.originalEvent.touches :
                    null, !r.dragging || n && 1 !== n.length ? !1 : (e = r.getLeft(
                            r.currentSlide), r.touchObject.curX = void 0 !==
                        n ? n[0].pageX : t.clientX, r.touchObject.curY =
                        void 0 !== n ? n[0].pageY : t.clientY, r.touchObject
                        .swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject
                            .curX - r.touchObject.startX, 2))), r.options.verticalSwiping ===
                        !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(
                            Math.pow(r.touchObject.curY - r.touchObject
                                .startY, 2)))), i = r.swipeDirection(),
                        "vertical" !== i ? (void 0 !== t.originalEvent && r
                            .touchObject.swipeLength > 4 && t.preventDefault(),
                            o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject
                                .curX > r.touchObject.startX ? 1 : -1), r.options
                            .verticalSwiping === !0 && (o = r.touchObject.curY >
                                r.touchObject.startY ? 1 : -1), s = r.touchObject
                            .swipeLength, r.touchObject.edgeHit = !1, r.options
                            .infinite === !1 && (0 === r.currentSlide &&
                                "right" === i || r.currentSlide >= r.getDotCount() &&
                                "left" === i) && (s = r.touchObject.swipeLength *
                                r.options.edgeFriction, r.touchObject.edgeHit = !
                                0), r.swipeLeft = r.options.vertical === !1 ?
                            e + s * o : e + s * (r.$list.height() / r.listWidth) *
                            o, r.options.verticalSwiping === !0 && (r.swipeLeft =
                                e + s * o), r.options.fade === !0 || r.options
                            .touchMove === !1 ? !1 : r.animating === !0 ? (
                                r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)
                        ) : void 0)
            }, e.prototype.swipeStart = function(t) {
                var e, i = this;
                return 1 !== i.touchObject.fingerCount || i.slideCount <= i
                    .options.slidesToShow ? (i.touchObject = {}, !1) : (
                        void 0 !== t.originalEvent && void 0 !== t.originalEvent
                        .touches && (e = t.originalEvent.touches[0]), i.touchObject
                        .startX = i.touchObject.curX = void 0 !== e ? e.pageX :
                        t.clientX, i.touchObject.startY = i.touchObject.curY =
                        void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !
                            0))
            }, e.prototype.unfilterSlides = e.prototype.slickUnfilter =
            function() {
                var t = this;
                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(
                    this.options.slide).detach(), t.$slidesCache.appendTo(
                    t.$slideTrack), t.reinit())
            }, e.prototype.unload = function() {
                var e = this;
                t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(),
                    e.$prevArrow && "object" != typeof e.options.prevArrow &&
                    e.$prevArrow.remove(), e.$nextArrow && "object" !=
                    typeof e.options.nextArrow && e.$nextArrow.remove(), e.$slides
                    .removeClass("slick-slide slick-active slick-visible").attr(
                        "aria-hidden", "true").css("width", "")
            }, e.prototype.unslick = function() {
                var t = this;
                t.destroy()
            }, e.prototype.updateArrows = function() {
                var t, e = this;
                t = Math.floor(e.options.slidesToShow / 2), e.options.arrows ===
                    !0 && e.options.infinite !== !0 && e.slideCount > e.options
                    .slidesToShow && (e.$prevArrow.removeClass(
                            "slick-disabled"), e.$nextArrow.removeClass(
                            "slick-disabled"), 0 === e.currentSlide ? (e.$prevArrow
                            .addClass("slick-disabled"), e.$nextArrow.removeClass(
                                "slick-disabled")) : e.currentSlide >= e.slideCount -
                        e.options.slidesToShow && e.options.centerMode ===
                        !1 ? (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow
                            .removeClass("slick-disabled")) : e.currentSlide >=
                        e.slideCount - 1 && e.options.centerMode === !0 &&
                        (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow
                            .removeClass("slick-disabled")))
            }, e.prototype.updateDots = function() {
                var t = this;
                null !== t.$dots && (t.$dots.find("li").removeClass(
                        "slick-active").attr("aria-hidden", "true"), t.$dots
                    .find("li").eq(Math.floor(t.currentSlide / t.options
                        .slidesToScroll)).addClass("slick-active").attr(
                        "aria-hidden", "false"))
            }, e.prototype.visibility = function() {
                var t = this;
                document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : (
                    t.paused = !1, t.autoPlay())
            }, t.fn.slick = function() {
                var t, i = this,
                    s = arguments[0],
                    o = Array.prototype.slice.call(arguments, 1),
                    n = i.length,
                    r = 0;
                for (r; n > r; r++)
                    if ("object" == typeof s || "undefined" == typeof s ? i[
                        r].slick = new e(i[r], s) : t = i[r].slick[s].apply(
                        i[r].slick, o), "undefined" != typeof t) return t;
                return i
            }
    });
})(jq11);

