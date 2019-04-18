$(function(){
	$('.main-nav').animate({ opacity: 1},300,function(){
		$('.hero-image').animate({ opacity: 1},500);
	});
});

var PROJECT = (function ($, undefined) {
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
		pointerClick = isTouchDevice ? 'touchstart' : 'click',
		transitionEventEnd = (function () {
			var t,
				el = document.createElement('div'),
				transitions = {
					transition: 'transitionend',
					WebkitTransition: 'webkitTransitionEnd'
				}

			for(t in transitions) {
				if(el.style[t] !== undefined) {
					return transitions[t];
				}
			}

			return false;
		})(),

		win = $(window),
		doc = $(document),
		html = $('html'),
		body = $('body'),

		subscribers = {},

		mediaList = {
			mobile: '0 - 767',
			tablet: '768 - 1024',
			desktop: '1025 - Infinity'
		},

		currentMedia = getMedia(),
		timer = null;

	function touchStartHandler(fn) {
		if(!isTouchDevice) return fn;

		return function () {
			var args = Array.prototype.slice.call(arguments)

			this.addEventListener('touchmove', h, false);
			this.addEventListener('touchend', h, false);

			function h(e) {
				this.removeEventListener('touchmove', h);
				this.removeEventListener('touchend', h);

				e.type === 'touchend' && fn.apply(this, args);
			}
		};
	}

	function getScrollBarWidth() {
		var div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width =  '50px';
		div.style.height = '50px';

		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		var scrollWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);

		return scrollWidth;
	}


	function getMedia() {
		var w = window.innerWidth,
			key;

		for(key in mediaList) {
			if(mediaList.hasOwnProperty(key)) {
				var arr = mediaList[key].split('-'),
					min = +arr[0],
					max = +arr[1];

				if(w >= min && w <= max) {
					return key;
				}
			}
		}

		return 'no match';
	}

	function on(type, fn) {
		if(typeof this.subscribers[type] === 'undefined') {
			subscribers[type] = [];
		}
		subscribers[type].push(fn);
	}

	function off(type, fn) {
		subscribersHandler('off', type, fn);
	}

	function fire(type) {
		subscribersHandler('fire', type);
	}

	function subscribersHandler(action, type, fn) {
		var subscrs = subscribers[type],
			i,
			max = subscrs ? subscrs.length : 0;

		for(i = 0; i < max; i += 1) {
			if(action === 'fire') {
				subscrs[i]();
			}
			else if(action === 'off') {
				if(subscrs[i] === fn) {
					subscrs.splice(i, 1);
				}
			}
		}
	}

	html.removeClass('no-js');
	isTouchDevice ? html.addClass('touch') : html.addClass('no-touch');

	win.on('resize orientationchange', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			var media = getMedia();
			if(media !== currentMedia) {
				currentMedia = media;
				fire('changeMedia');
			}
			fire('resize');
		}, 150);
	});

	return {
		transitionEventEnd: transitionEventEnd,
		isTouchDevice: isTouchDevice,
		pointerClick: pointerClick,
		currentMedia: function () {return currentMedia;},
		isMobile: function () {
			return currentMedia === 'mobile';
		},
		isTablet: function () {
			return currentMedia === 'tablet';
		},
		isDesktop: function () {
			return currentMedia === 'desktop';
		},

		win: win,
		doc: doc,
		html: html,
		body: body,

		utils: {
			touchStartHandler: touchStartHandler,
			getScrollBarWidth: getScrollBarWidth
		},

		subscribers: subscribers,

		on: on,
		off: off,
		fire: fire
	}
})(jQuery);

var $win = $(window);

(function ($, undefined) {
	initMobNav();
	initAccordion({
		scrollToOpener: false
	});
})(jQuery);

function initMobNav(opt) {
	var settings = $.extend({
		opener: '.mobile-nav-opener',
		menu: '.mobile-nav',
		activeCls: 'menu-opened',
		overlay: {
			cls: 'mobile-nav-overlay'
		}
	}, opt);

	var $opener = $(settings.opener);
	var $panel = $(settings.menu);

	if(!$opener.length || !$panel.length) return;

	var $body = $('body');
	var $overlay = null;
	var activeCls = settings.activeCls;
	var navIsOpened = false;
	var transitionEvent = whichTransitionEvent();

	if(settings.overlay) {
		initOverlay();
	}

	$opener.on('click', function (e) {
		e.preventDefault();
		if(navIsOpened) {
			hideNav();
		}
		else {
			showNav();
		}
	});

	$panel.hammer({
		drag_min_distance: 100
	}).on(settings.direction === 'right' ? 'dragright' : 'dragleft', hideNav);

	$panel.data('mobNav', {
		hide: hideNav,
		show: showNav,
		isOpened: navIsOpened
	});

	// local functions

	function initOverlay() {
		var overlayCls = settings.overlay.cls || 'mobile-nav-overlay';
		var $overlay = 
			$('<div>')
				.addClass(overlayCls)
				.css({
					'visibility': 'hidden',
					'opacity': 0
				})
				.appendTo($body);
	}

	function hideOverlay() {
		if(transitionEvent) {
			$overlay.one(transitionEvent, function() {
				$overlay.css('visibility', 'hidden');
			});
		}
		else {
			$overlay.css('visibility', 'hidden');
		}
		$overlay.css('opacity', 0);
	}

	function showOverlay() {
		$overlay.css({
			'visibility': 'visible',
			'opacity': 1
		});
	}

	function hideNav() {
		$overlay && hideOverlay();

		if(transitionEvent) {
			$panel.one(transitionEvent, function() {
				navIsOpened = false;
			});
		}
		else {
			navIsOpened = false;
		}
		
		$body.removeClass(activeCls);
	}

	function showNav() {
		$overlay && showOverlay();

		if(transitionEvent) {
			$panel.one(transitionEvent, function() {
				navIsOpened = true;
			});
		}
		else {
			navIsOpened = true;
		}

		$body.addClass(activeCls);
	}
}

function whichTransitionEvent() {
	var t;
	var el = document.createElement('div');
	var transitions = {
		'transition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	}

	for(t in transitions) {
		if(el.style[t] !== undefined) {
			return transitions[t];
		}
	}

	return false;
}

function initAccordion(opt) {
	var settings = $.extend({
		'accordion': '.accordion',
		'opener': '.opener',
		'slide': '.slide',
		'activeClass': 'active',
		'animSpeed': 300,
		'scrollToOpener': true
	}, opt);

	var $winScroll = $('html, body');

	$(settings.accordion).each(function () {
		var $accordion = $(this);

		$(settings.slide, $accordion).css('display', 'none');

		$accordion
			.find('.' + settings.activeClass)
			.eq(0)
			.next()
			.css('display', 'block');

		$accordion.on('click', settings.opener, function () {
			var $this = $(this),
				$newActiveSlide = $this.next(),
				$activeOpener = $accordion.find(settings.opener + '.' + settings.activeClass),
				$activeSlide = $activeOpener.next();

			if($this.is($activeOpener)) {
				closeSlide($activeOpener, $activeSlide);
			}
			else {
				closeSlide($activeOpener, $activeSlide);
				openSlide($this, $newActiveSlide);
			}

			return false;
		});
	});

	function closeSlide($opener, $slide) {
		$opener.removeClass(settings.activeClass);
		$opener.parent().removeClass(settings.activeClass);
		$slide.stop().slideUp(settings.animSpeed);
	}

	function openSlide($opener, $slide) {
		$opener.addClass(settings.activeClass);
		$opener.parent().addClass(settings.activeClass);
		$slide.stop().slideDown(settings.animSpeed, function () {
			if(settings.scrollToOpener) $winScroll.animate({
				scrollTop: ($opener.offset().top)
			}, settings.animSpeed);
		});
	}
}

