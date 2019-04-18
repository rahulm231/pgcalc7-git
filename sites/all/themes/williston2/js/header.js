jQuery(document).ready(function($) {

	function replaceSvg() {
		var $img = $(this);
	    var imgClass = $img.attr('class');
	    var imgID = $img.attr('id');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        var $svg = $(data).find('svg');
	        $svg.addClass(imgClass);
	        $svg.attr('id', imgID);
	        $svg.removeAttr('xmlns');
	        $img.replaceWith($svg);
	    }, 'xml');
	}

	function checkClick(e) {
		console.log('here');
		var id = e.target.getAttribute('id');
		if(!(id == 'searchform-text' || id == 'searchsubmit' || id == 'opensearch')) {
			$(document).off('click', checkClick);
			$('.header__search-bar').addClass('header__search-bar--hidden');
		}
	}

	$('form .header__search-button').each(replaceSvg);

	$('header .header__menu-wrapper__menu-button').on('click', function() {
		$('#main-menu').toggleClass('main-menu--hidden');
		$('body').toggleClass('menu-visible');
		$('.header').toggleClass('header--menu-visible');
		$('.header__nav').toggleClass('header__nav--dark');
		$('.header__menu-wrapper').toggleClass('header__menu-wrapper--dark');
		$('.header__menu-wrapper__menu-button').toggleClass('header__menu-wrapper__menu-button--dark');
		$('.header__brand').toggleClass('header__brand--dark');
		$('.header__search-button').toggleClass("header__search-button--dark");
		$('.header__search-button-wrapper').toggleClass("header__search-button-wrapper--dark");
	});

	$('#opensearch').on('click', function() {
		$('.header__search-bar').removeClass('header__search-bar--hidden');
		$('#searchform-text').focus();
		$(document).on('click', checkClick);
	});

	$('.main-menu__link').on('click', function(e) {
		var href = $(this).attr('href');
		
		if(href.indexOf('#') > -1) {
			href = href.split('#')[0];

			if(window.location.pathname == href) {
				$('#main-menu').addClass('main-menu--hidden');
				$('body').removeClass('menu-visible');
				$('.header').removeClass('header--menu-visible');
				$('.header__nav').removeClass('header__nav--dark');
				$('.header__menu-button').removeClass('header__menu-button--dark');
				$('.header__brand').removeClass('header__brand--dark');
			}
		}

	});

	var headerScrollTop = 60;

	if(window.pageYOffset > headerScrollTop) {
		$('.header').addClass('header--fixed');
	} else {
		$('.header').removeClass('header--fixed');
	}

	window.onscroll = function(e) {
		var offset = window.pageYOffset;

		if(offset > headerScrollTop) {
			$('.header').addClass('header--fixed');
		} else {
			$('.header').removeClass('header--fixed');
		}
	}
});