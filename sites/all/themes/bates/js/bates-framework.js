var screenWidth;
var tagline;

/** Add some missing Date methods
 */
Date.prototype.getDayName = function() {
	switch (this.getDay()) {
		case 0 : return 'Sunday';
		case 1 : return 'Monday';
		case 2 : return 'Tuesday';
		case 3 : return 'Wednesday';
		case 4 : return 'Thursday';
		case 5 : return 'Friday';
		case 6 : return 'Saturday';
		default : return null;
	}
};
Date.prototype.getMonthName = function() {
	switch(this.getMonth()) {
		case 0: return 'January';
		case 1: return 'February';
		case 2: return 'March';
		case 3: return 'April';
		case 4: return 'May';
		case 5: return 'June';
		case 6: return 'July';
		case 7: return 'August';
		case 8: return 'September';
		case 9: return 'October';
		case 10: return 'November';
		case 11: return 'December';
	}
};
Date.prototype.getOrdinal = function() {
	var x = this.getDate();
    while(x>9){
        x -= 10;
    }
	switch(x) {
        case 0: return 'th';
		case 1: return 'st';
		case 2: return 'nd';
		case 3: return 'rd';
		case 4:
		case 5:
		case 6:
		case 7:
		case 8: 
		case 9:
			return 'th';
	}
};
Date.prototype.getPhpDate = function() {
    
    var zeropad = function (n,w){
        var pad=new Array(1+w).join('0');
        return (pad+n).slice(-pad.length);
    };
    
    var outdate= {};
    outdate.month = zeropad(this.getMonth() + 1, 2);
    outdate.day = zeropad(this.getDate(),2);
    outdate.year = this.getFullYear();
    return outdate.year + '-' + outdate.month + '-' + outdate.day;
};


jQuery(function($){
	
	function toggleText($el){
		var toggletext = $el.data('toggletext');
		if( toggletext == null ) return;
		var txt = $el.text();
		var html = $el.html();
		html = html.replace(txt,toggletext);
		$el.data('toggletext',txt);
		$el.html(html);
	}
	
	screenWidth = $(window).width();
	
	$(window).resize( function() {
		screenWidth = $(window).width();
		moveTagline();
	});

	
	/* we need to move the tagline around in the DOM so that the
	 * site menu slides down correctly in tablet view. 8/2014 jp
	 */
	function moveTagline() {
		// Can't use window width, as Chrome calculates it wrong.
		// if ( $(window).width() < 800 ) {
		if ( $('#toggleSiteNav').is(':visible') ) {
			tagline = $('header h1 .tagline').detach();
			$('header').append(tagline);
		} else {
			tagline = $('header > .tagline').detach();
			$('header h1').append(tagline);
		}
	}
	moveTagline();

	// If there is no site menu, don't show the sitemenu toggler either
	if ( $('#site-nav ul').length == 0 ) {
		$('#toggleSiteNav').remove();
	}
	
	
	/******
	 * Interactions
	 *
	 *****/
	
	function toggleGlobalSearchInput ($me) {
		// *** closing the search box
	
		toggleText($me);
	
		if( $me.hasClass('jqActive') ) {
			
			//$('#globalSearch').removeClass('jqActive');
			$('#globalSearch').removeClass('jqActive');
			$('#globalWordmark').show();			
			$me.removeClass('jqActive');
			
			
		// *** opening the search box
		} else {

			$('#globalSearch').addClass('jqActive');
			$me.addClass('jqActive');
			
			$('#globalSearch input[type="text"]').focus();
			
			if( screenWidth < 550 ) {
				
				$('#globalWordmark').hide();
				
			}
			
		}
		
		return false;
	}
	$('#globalSearchButton').live('click',function(){
		toggleGlobalSearchInput ( $(this) );
		return false;
	})
	
	
	function toggleGlobalMenu ( $me ) {
	
		toggleText($me);
	
		// *** closing the global menu 
		if( $me.hasClass('jqActive') ) {
			
			$me.removeClass('jqActive');
			$('#globalNav').removeClass('jqActive');
			$('#globalMenu').slideUp(200);
			
			$('#globalNav').find('.drawerPointer').hide();
		
		// *** opening the global menu
		} else {
			
			$me.addClass('jqActive');
			$('#globalNav').addClass('jqActive');
			$('#globalMenu').slideDown(200);
			
			$('#globalNav').find('.drawerPointer').show();
			
		}
		
	}
	$('#globalMenuButton').live('click',function(){
		toggleGlobalMenu ( $(this) );
		return false;
	})
	
	
	function toggleSubMenu ( $me ) {
		

		
	}
	// need to use delegation (2nd parameter) because some toggleSubMenus are being dynamically created.
	$('#globalMenu, #site-nav').live('click', '.toggleSubMenu', function(e){
		
		// if we are doing the hover menus, just display the arrow, but make it inactive
		if( $(window).width() >= 800 && $(this).parents('#site-nav').length > 0 )
			return false;

		$myMenu = $(this).parents('li').eq(0).find('ul').eq(0);
		
		// *** closing the sub menu
		if( $(this).hasClass('jqActive') ) {
		 
			$(this).removeClass('jqActive');
			$myMenu.slideUp(200);
		
		// *** opening the sub menu
		} else {
			
			$(this).addClass('jqActive');
			$myMenu.slideDown(200);
			
		}
		
	})
	
	$('#site-nav li, #globalMenu li').each(function(){
		if( $(this).find('ul').length > 0) {
			$(this).append('<span class="toggleSubMenu"></span>');
		}
	})
	
	
	function toggleSiteMenu( $me ) {
		
		toggleText($me);
		
		// *** closing the site/page menu
		if( $me.hasClass('jqActive') ) {
			
			//$('.tagline').show();
			
			$me.text( $me.data('closedtext') );
			
			$me.removeClass('jqActive');
			$('#site-nav').slideUp(200);
			
		// *** opening the site/page menu
		} else {
		
			$me.addClass('jqActive');
			
			$('#site-nav').slideDown(200);
			
			//$('.tagline').hide();			
		}
		
	}
	$('#toggleSiteNav').live('click.bates-framework', function(){
		toggleSiteMenu ( $(this) );
		
		return false;
	});

	
	$('#backToTop').live('click', function() {
	
		$('html, body').animate({scrollTop:0}, 300);
		return false;
		
	})
	
	
	/* The next bit is expanding the images with captions wherein the 
	 * caption element has a hardcoded size. We shouldn't have to
	 * do this, but it's going to make the transition to a larger breakpoint
	 * easier. -JP 08/2014
	 */
	$('.wpcontent-area .wp-caption').each(function(){
		if( $(this).width() > 599 ) {
			$(this).width('100%');
		}
	})
	
	
	/* Make the entire row clickable instead of just the actual link
	 */
	$('.archive-row').css('cursor','pointer');
	$('.archive-row').live('click touchstart',function(){
		
		var href = $(this).find('a').eq(0).attr('href');
		window.location = href;
		
	});
	
	
	/* Look for <img> tags wrapped in <a> & remove the border bottom
	 */
	$('.body-area img').parent('a').css('border-bottom','0px');


	
	/* Bates Breadcrumbs
	 * based off menu structure instead of page heirarchy
	 */
	var url = window.location.hostname + window.location.pathname;
	$bc = $('.js-breadcrumb');
	
	// if there is no sitemenu, remove the breadcrumbs box
	if ( $('#site-nav ul').length == 0) {
		$bc.remove();
	} else {
	
		var crumbs = new Array()
			,mylink
			// get the site home information
			,sitename = $('header h1 a').text()
			,siteurl = $('header h1 a').attr('href')
		;

		$('#site-nav a').each(function(){
	
			mylink = $(this).attr('href');

			// if the <a> was never given a "#" for the href, it won't have a href="" attribute
			if(typeof mylink === 'undefined')
				mylink='';

			mylink = mylink.replace('https://','').replace('http://','');
			
			
			if ( mylink == url) {

				var siteNameInMenu = false;
				
				// how many levels deep are we?
				var levelCount = $(this).parents('li').length;
				// add one for the home link
				levelCount++;
				// if we are adding one for the site homepage
				if( sitename != $(this).parents('li').last().find('a').first().text() ) {
					levelCount++;
					siteNameInMenu = true;
				}

				for(i=0 ; i < $(this).parents('li').length ; i++ ) {

					var $p = $(this).parents('li').eq(i).find('a').eq(0);
					
					// if there are more than 3 items, truncate each
					var linktext = $p.text();
					var title = '';
					if(levelCount>3){
						var chopTo;
						// based on how many items in the crumbs (and initial screen width), truncate to a different level
						switch(levelCount) {
							case 4 :
								chopTo = (screenWidth > 1200) ? 55 : 45;
								break;
							case 5 :
								chopTo = (screenWidth > 1200) ? 45 : 38;
								break;
							default : //  > 5
								chopTo = (screenWidth > 1200) ? 30 : 25;
								break;
						}
						linktext = linktext.substring(0,chopTo);
						// if we had to truncate, add an ellipsis
						if( linktext.length < $p.text().length ) {
							linktext += '&hellip;';
							title = ' title="'+$p.text()+'" ';
						}
					}

					// if the page is the one
					// we're currently on, don't make a link, just the text
					if ( i == 0 ) {
						crumbs.push('<a href="#" '+title+' class="bc-current-page">' + linktext + '</a>');

					// if the link is a placeholder, don't make it linked
					} else if ( typeof $p.attr('href') == 'undefined') {
						crumbs.push('<a '+title+'>' + linktext + '</a>');
						
					} else {
						crumbs.push('<a class="bc-link" '+title+' href="' + $p.attr('href') + '">' + linktext + '</a>');
					}
					
					
				}

				
				// if we're not on the site homepage, add the site homepage to the crumbs
				/* NOTE: This only works if the site title and the text of the
				 * 	menu link are exactly the same -JP
				 */
				if ( siteNameInMenu ) {
					crumbs.push('<a class="bc-link" href="'+siteurl+'">'+sitename+'</a>');
				}
				


				return false;// to stop looping through the page items
				
			}
			
		});
		

		// If the current page is not in the menu.
		if ( crumbs.length == 0 ) {
			// if this is a post
			if( typeof breadcrumb_vars !== 'undefined' ) {
	
				var linktext = $('.page-title').text();
				if( linktext != '')
					crumbs.push('<a class="bc-current-page" href="#">'+linktext+'</a>');

				if(breadcrumb_vars["post_type"].toLowerCase() == 'posts' ) {
					crumbs.push('<a class="bc-link" href="'+breadcrumb_vars["archive_link"]+'">Posts</a>');
				} else if (breadcrumb_vars["post_type"].toLowerCase() != 'pages' ) {
					crumbs.push('<a class="bc-link bc-fakelink" href="#">'+breadcrumb_vars["post_type"]+'</a>')
				}

				if( sitename != '')
					crumbs.push('<a class="bc-link" href="' + siteurl + '">' + sitename + '</a>');

			} else {
				// can't find what we need for the breadcrumbs, give it up
				$bc.hide();
				// crumbs.push('<a class="bc-current-page" href="' + siteurl + '">' + sitename + '</a>');
			}
		}
		

		// if a site parent has been set in options, add it here, before the final "Bates"
		if( typeof batesFrameworkSettings.parentSite != 'undefined' ){
			crumbs.push('<a class="bc-link bc-parentSite-link" href="'+batesFrameworkSettings.parentSite.siteUrl+'">'+batesFrameworkSettings.parentSite.siteName+'</a>');
		}

		// add the main link
		crumbs.push('<a class="bc-home-link bc-link" href="/">Bates</a>');
		
		// the array needs to be reversed, as it's in the wrong order.
		crumbs.reverse();
		crumbStr = crumbs.join('');

		if( $bc.find('.wrapper').length > 0 ) {
			$bc.find('.wrapper').empty();
			$bc.find('.wrapper').html(crumbStr);
		} else {
			$bc.empty();
			$bc.html(crumbStr);
		}		
	}

	/**
	 * Now do the folding thing on small screens
	 */
	var resetBreadcrumbsTimeout;

	// if there are less than 4 items in the breadcrumbs, do a more static breadcrumb
	var shouldDoBreadcrumbAnimation = function() {
		return $('.breadcrumb a').length > 3;
	};
	
	var resetBreadcrumbs = function() {
		$('.breadcrumb a').removeClass('bc-hiding bc-clicked').attr('title','');
		window.clearTimeout(resetBreadcrumbsTimeout);
	};

	var figureBreadcrumbLayout = function() {
		var bcCount = $('.breadcrumb a').length;
		if(screenWidth < 550 || ( screenWidth < 800 && shouldDoBreadcrumbAnimation() ) ) {

			var extraW = $('.bc-current-page').width();
			var outerW = $('.breadcrumb').width();
			var remainingW = outerW - extraW;
			var links = $('.breadcrumb a').not('.bc-current-page').length;
			var width = Math.round(remainingW/links);
			$('.breadcrumb .bc-link').not('.bc-home-link, .bc-current-page').css('width',width+'px');

		} else {
			$('.breadcrumb .bc-link').not('.bc-home-link, .bc-current-page').css('width','auto');
		}

		if( ! shouldDoBreadcrumbAnimation() ) {
			$('.breadcrumb .bc-home-link').css('width','auto');
		}
	};

	figureBreadcrumbLayout();

	$(window).live('resize',function(){
		figureBreadcrumbLayout();
	});

	$('.breadcrumb a.bc-link').live('click',function(e){

		if( $(this).hasClass('bc-clicked') || screenWidth >= 800 || ! shouldDoBreadcrumbAnimation() ) {
			// default link action		  
		} else {
			$(this).addClass('bc-clicked');
			$(this).attr('title','Click again to go to page');
			$(this).siblings().not('.bc-current-page').addClass('bc-hiding').removeClass('bc-clicked').attr('title','');
			e.preventDefault();
			window.clearTimeout(resetBreadcrumbsTimeout);
			resetBreadcrumbsTimeout = window.setTimeout(resetBreadcrumbs,2200);
		}

	});

	$('.breadcrumb a.bc-current-page').live('click',function(e){
		resetBreadcrumbs();
		e.preventDefault();
	});
	


	/* Smooth scroll for in-page links
	 */
	$('.main-content a[href^="#"], a[href^="#"].js-smoothscroll').live('click',function(e){
		
		// this next line ensures that we're only messing with links on the same page. 
		// @see https://css-tricks.com/snippets/jquery/smooth-scrolling/
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var targetId = $(this).attr('href');
			if( targetId === '#' ) return;
			
			var $target = $( targetId );
			if( $target.length == 0 ) return;
			
			e.preventDefault();

			// add the hash to the url bar
			history.pushState({},'',targetId);
			
			var offset = $target.offset().top;		
			$('body,html').animate({
				scrollTop: offset
			},600);
		}
	});
	
	/** 
	 * Make iframes keep their initial proportions at any screen width if it has 
	 *   class="maintain-proportions"
	 * @hat-tip  https://benmarshall.me/responsive-iframes/ 
	 */
	(function(){
		var $iframes = $( "iframe.maintain-proportions" );
		$iframes.each(function () {
			var w = $(this).width();
			var h = $(this).height();
			$(this).data( "ratio", h/w )
				.removeAttr( "width" )
				.removeAttr( "height" )
			;
		});
	
		var maintainProportions = function(){
			$iframes.each( function() {
				var width = $( this ).parent().width();
				$( this ).width( width )
				.height( width * $( this ).data( "ratio" ) );
			});
		};

		$(window).resize(function(){
			maintainProportions();
		});
		maintainProportions();

	})();

	// track which page people come from when they submit the feedback form
	var feedbackLink = $('footer a#footer-feedback');
	if( feedbackLink.length > 0){
		var fbl_url = feedbackLink.attr('href');
		var currentUrl = encodeURIComponent( window.location.href );
		if( fbl_url.indexOf('?') > -1 )
			fbl_url += '&fromPage=' + currentUrl;
		else
			fbl_url += '?fromPage=' + currentUrl;

		feedbackLink.attr( 'href', fbl_url ); 
	}

})


/**
 * jQuery.responsiveVideo
 * Version 1.1
 * Copyright (c) 2014 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 01/16/2014
 *
 * 2017-10
 * Optimized slightly by Jake Paris
 **/
jQuery(function($){
	$.fn.responsiveVideo=function(){$('head').append('<style>.responsive-video-wrapper{width:100%;position:relative;padding:0}.responsive-video-wrapper iframe,.responsive-video-wrapper object,.responsive-video-wrapper embed{position:absolute;top:0;left:0;width:100%;height:100%}</style>');$(this).find('iframe[src*="player.vimeo.com"],iframe[src*="youtube.com"],iframe[src*="youtube-nocookie.com"],iframe[src*="dailymotion.com"],iframe[src*="kickstarter.com"][src*="video.html"], object,embed').not('object object').each(function(){var $v=$(this);if($v.parents('object').length)return;if(!$v.prop('id'))$v.attr('id','rvw'+Math.floor(Math.random()*999999));$v.wrap('<div class="responsive-video-wrapper" style="padding-top:'+($v.attr('height')/$v.attr('width')*100)+'%" />').removeAttr('height').removeAttr('width')})}
	$('.wpcontent-area').responsiveVideo();
});


/**
 * Make our site nav accessible by keyboard
 * 
 */

  /* Polyfill for element.closest()
   * @ref  https://developer.mozilla.org/en-US/docs/Web/API/Element/closest.html
   */
if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;if (!Element.prototype.closest) Element.prototype.closest = function(s) {var el = this;var ancestor = this; if (!document.documentElement.contains(el)) return null;do {if (ancestor.matches(s)) return ancestor;ancestor = ancestor.parentElement;} while (ancestor !== null); return null;};

document.addEventListener('keydown', function(e){
	var focusedEl = document.activeElement;
	// only if focused element is in the site nav
	if( ! focusedEl.closest('#site-nav') )
		return;
	// only if the tab key was pressed
	if( e.which !== 9 ) // tab
		return;
	var parent = focusedEl.parentNode;
	// navigate our way up the dom tree and add activeclass to every li
	while( parent.tagName !== 'NAV' ){
		if( parent.parentNode.id == 'site-nav-menu' ) {
			// the top-level li element
			var topLevelLi = parent.parentNode;
			var topLis = document.getElementById('site-nav-menu');
			// remove the active class from all other top-level li
			for(var c=0;c<topLis.children.length;c++){
				if( topLis.children[c] != topLevelLi )
					topLis.children[c].classList.remove('js-focused');
			}
		}
		if( parent.tagName == 'LI' ){
			parent.classList.add('js-focused');
		}
		parent = parent.parentNode;
	}
});
