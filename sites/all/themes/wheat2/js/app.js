(function ($, document, window) {

	var cache = {},
		$window = $(window),
		$document = $(document)
	;

	$document.foundation();

	/**
	 * Utility for retrieving an element from the DOM. Retrieved elements are
	 * stored in local cache for performance.
	 *
	 * @param string selector
	 * @return jQuery
	 */
	var getElement = function (selector) {
		if (typeof cache[selector] === 'undefined') {
			cache[selector] = $(selector);
		}
		return cache[selector];
	};

	/**
	 * Updates the search-input placeholder when on mobile.
	 */
	var updateSearchPlaceholder = function () {
		var $search = getElement('.top-bar').find('.search');
		var $searchInput = $search.find('.search__input');

		if (!$searchInput.data('original-placeholder')) {
			$searchInput.data('original-placeholder', $searchInput.attr('placeholder'));
		}

		if (!Foundation.MediaQuery.atLeast('large')) {
			$searchInput.attr('placeholder', $searchInput.data('alt-placeholder'));
		} else {
			$searchInput.attr('placeholder', $searchInput.data('original-placeholder'));
		}
	};

	/**
	 * Makes mega-menu items a normal menu when on mobile.
	 */
	var updateMenus = function () {
		// Iterate over each mega menu, clone it's child menu-items and make
		// them siblings of the mega menu.
		getElement('.top-bar').find('.mega-menu').each(function () {
			var $thisMegaMenu = $(this);

			if ($thisMegaMenu.is(':visible')) {
				$thisMegaMenu.hide();

				// If we've already cloned the mega menu's children, just show
				// them and bail.
				if ($thisMegaMenu.next('.menu-item').length) {
					return $thisMegaMenu.nextAll('.menu-item').show();
				}

				// Iterate over each mega menu's children and remove and
				// unnecessary markup such as images and menu-item descriptions.
				$thisMegaMenu.find('.mega-menu__menu-item__title').each(function () {
					var $title = $(this);
					var $menu = $title.closest('.menu');
					var $menuItem = $title.closest('.menu-item').clone();
					var $a = $title.closest('a').clone();

					$a.html($title.html());

					$menuItem
						.addClass('is-submenu-item is-drilldown-submenu-item')
						.html('')
						.append($a)
						.appendTo($menu)
					;
				});
			} else {
				$thisMegaMenu.show().nextAll('.menu-item').hide();
			}
		});
	};

	/**
	 * Initialize CTA link hover states.
	 */
	var initCtaLinks = function () {
		getElement('.footer-before').waypoint(function (direction) {
			var $ctaLinks = getElement('.footer-before').find('.cta-links');
			if ('down' === direction) {
				$ctaLinks.addClass('unstuck');
			} else {
				$ctaLinks.removeClass('unstuck');
			}
		}, {
			offset: 'bottom-in-view'
		});

		getElement('.footer-before .cta-links__item').each(function () {
			$(this).hover(
				function () {
					if (!Foundation.MediaQuery.atLeast('medium')) {
						return;
					}

					var $linkItem = $(this)
						, $inner = $linkItem.find('.cta-links__item__inner')
						, $desc = $inner.children('.cta-links__item__description')
						, linkItemDimensions = Foundation.Box.GetDimensions($linkItem)
						, innerDimensions = Foundation.Box.GetDimensions($inner)
					;

					$linkItem.css('width', linkItemDimensions.width);
					$linkItem.css('height', linkItemDimensions.height);
					$inner.data('originalHeight', innerDimensions.height);
					$inner.css('max-height', innerDimensions.height);
					// Give the DOM a chance to set max-height; otherwise the slide
					// up effect doesn't work.
					setTimeout(function () {
						$desc.show();
						$inner.addClass('hovering');
						$inner.css('max-height', 300);
					}, 5);
				},
				function () {
					if (!Foundation.MediaQuery.atLeast('medium')) {
						return;
					}

					var $linkItem = $(this)
						, $inner = $linkItem.find('.cta-links__item__inner')
						, $desc = $inner.children('.cta-links__item__description')
						, transitionEnd = Foundation.transitionend()
					;

					$inner.one(transitionEnd, function () {
						$desc.hide();
						$linkItem.attr('style', '');
						$inner.attr('style', '').removeClass('hovering');
					});
					$inner.css('max-height', $inner.data('originalHeight'));
				}
			);
		});
	};

	/**
	 * Initialize footer link animations.
	 */
	var initFooterLinks = function () {
		// We can't use inline css to alter pseudo element properties, so we
		// need to use an inline stylesheet instead.
		$('head').append('<style id="site-footer-custom"></style>');

		// Get our elements.
		var $siteFooterPrimary = getElement('.site-footer__primary')
			, $style = getElement('#site-footer-custom')
		;

		// On hover of li items, move the little lime line to the correct position
		$siteFooterPrimary.find('li').hover(
			function () {
				var $li = $(this)
					, liHeight = $li.height()
					, $parentColumn = $li.closest('.columns')
					, parentColumnId = $parentColumn.attr('id')
					, $parentMenu = $li.closest('.menu')
					, parentMenuId = $parentMenu.attr('id')
					, $link = $li.children('a')
					, linkPaddingTop = parseFloat($link.css('padding-top'))
					, linkPaddingBottom = parseFloat($link.css('padding-bottom'))
					, linkTextHeight = liHeight - linkPaddingTop - linkPaddingBottom
					, pos = $li.position()
					, offset = (linkTextHeight / 2) - 15
					, top = pos.top + linkPaddingTop + offset
					, columnMidPoint = $parentColumn.width() / 2
					,
					selector = pos.left < columnMidPoint ? '#' + parentColumnId + ':after' : '#' + parentMenuId + ':after'
				;

				$style.html(selector + '{ top:' + top + 'px; }');
			},
			function () {
				$style.html('');
			}
		);
	};

	// Initialize load more
	var initLoadMore = function () {
		getElement('form[data-load-more]').parent().on('submit', function (e) {
			var $form = $(e.target);

			if (!$form.data('loadMore')) {
				return;
			}

			e.preventDefault();

			var $target = $('#' + $form.data('load-more'))
				, $pagedInput = $form.children('input[name="paged"]')
				, $button = $form.children('button')
			;

			$button.prop('disabled', true);
			$target.css('max-height', $target.height());

			$.post($form.attr('target'), $form.serialize())
				.done(function done(res) {
					var data = (res || {}).data || {};
					var page = data.page || {};

					// Append new posts to target element.
					if (data.html) {
						$target.append(data.html).css('max-height', 999999);
					}

					if (page.url) {
						// Push state to history in case user refreshes page, etc.
						history.pushState({}, '', page.url);
					}

					if (page.title) {
						// Update the document title accordingly. NOTE: we can't just use
						// the value from response.data.page.title because HTML entities
						// arent' handled correctly. This little workaround fixes that.
						// http://stackoverflow.com/questions/11591174/escaping-of-attribute-values-using-jquery-attr
						document.title = $('<div/>').html(page.title).text();
					}

					if (data.nextPage) {
						$button.prop('disabled', false);
						$pagedInput.val(data.nextPage);
					}
				})
			;
		});
	};

	/**
	 * Initialize video players.
	 */
	var initVideoPlayers = function () {
		getElement('.tabs').on('change.zf.tabs', onTabsChanged);
		getElement('.video-player').on('click', function (e) {
			e.preventDefault();

			var $link = $(this)
				, $player = $link.children()
				, playerId = $player.attr('id')
			;

			if (!$link.hasClass('paused')) {
				$link.addClass('loading');
			}

			if ($player.length && $player.data('youtube-vid')) {
				if ($link.data('player')) {
					$link.data('player').playVideo();
				} else {
					$link.data('player', new YT.Player(playerId, {
						height: '100%',
						width: '100%',
						videoId: $player.data('youtube-vid'),
						events: {
							onReady: function (e) {
								$link.addClass('ready');
								e.target.playVideo();
							},
							onStateChange: function (e) {
								if (YT.PlayerState.PLAYING === e.data) {
									$link.removeClass('paused loading').addClass('playing');
								} else if (YT.PlayerState.PAUSED === e.data) {
									$link.addClass('paused').removeClass('playing');
								} else {
									$link.removeClass('playing');
								}
							}
						}
					}));
				}
			}
		});
	};
	/*
	 * Initialize slick sliders
	 */

	var initCarousels = function () {
		$('.experience-carousel').each(function (idx, item) {
			if ($(this).children().length > 1) {
				var carouselId = 'carousel' + idx;
				// this.id = carouselId;
				$(this).slick({
					arrows: false,
					infinite: true,
					variableWidth: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					focusOnSelect: true,
					responsive: [
						{
							breakpoint: 640,
							settings: {
								arrows: true,
								prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
								nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
								slidesToShow: 1,
								slidesToScroll: 1,
								dots: false,
								variableWidth: false
							}
						}
					]
				})
			}
			else {
				$(this).addClass('inactiveSlider');
			}
		})
	};

	var activeCarousel = function () {
		$('#featured-carousel .content-wrapper').replaceWith($('#full-carousel .slick-current .content-wrapper').clone());
		$('#featured-carousel .experience-carousel__slide__content__image').replaceWith($('#full-carousel .slick-current .experience-carousel__slide__content__image').clone());

		getElement('#full-carousel .slick-slide .experience-carousel__slide__content').each(function () {
			$(this).on('click', function () {
				$('#featured-carousel .experience-carousel__slide__content__image').addClass('inactive').delay(1000).queue(function () {
					$('#featured-carousel .inactive').remove().dequeue();
				});
				$('#featured-carousel .experience-carousel__slide__content').append($(this).children('.experience-carousel__slide__content__image').clone());
				$('#featured-carousel .experience-carousel__slide__content .content-wrapper').replaceWith($(this).children('.experience-carousel__slide__content .content-wrapper').clone());
				$('#featured-carousel .experience-carousel__slide__content__image').removeClass('active').delay(50).queue(function () {
					$(this).addClass('active').dequeue();
				});
				$('#featured-carousel .content-wrapper').removeClass('active').delay(100).queue(function () {
					$(this).addClass('active').dequeue();
				});
			});
		});

		// imgHeight = $('#featured-carousel img').height();
		// $('#full-carousel').css('margin-top', imgHeight - '130');
		// $(window).resize(function() {
		// 	imgHeight = $('#featured-carousel img').height();
		//   	console.log(imgHeight);
		//   	$('#full-carousel').css('margin-top', imgHeight - '130');
		// });
	};

	/*
	 * Initialize slick sliders
	 */

	var initCalloutSlides = function () {
		$('.page-component--callout-slider__popup').each(function (idx, item) {
			if ($(this).children().length > 1) {
				var carouselId = 'callout-popup' + idx;
				// this.id = carouselId;
				$(this).slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
					nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
					variableWidth: false,
					fade: true
				})
			}
			else {
				$(this).addClass('inactiveSlider');
			}
		});
		$('.page-component--callout-slider__slidenav__item').on('click', function () {
			var $this = $(this)
				, $activeSlider = $this.closest('.row').next('.page-component--callout-slider__active')
			;
			$activeSlider.addClass('visible').find('.slick-slider').slick('slickGoTo', $this.index());
		});
		$('.page-component--callout-slider__active  .toggle-close').on('click', function () {
			$(this).closest('.page-component--callout-slider__active').removeClass('visible');
		});
	};


	/*
	 * Initialize magnific popup galleries
	 */

	var initGalleries = function () {
		$('.page-component--image-gallery__wrapper').magnificPopup({
			delegate: 'a', // child items selector, by clicking on it popup will open
			type: 'image',
			gallery: {
				enabled: true,
				// arrowMarkup: '<div class="row columns page-component--image-gallery__wrapper__arrows"><button title="%title% type="button" class="mfp-arrow mfp-arrow-%dir%"></button></div>',
				tCounter: ''
			},
			image: {
				titleSrc: 'title'
			},
			mainClass: 'mfp-fade'
			// other options
		});
	}
	// Add class to galleries for column count depending on number of items
	var columnCount = function() {
  	$('.page-component--image-gallery__wrapper').each(function() {
  	  if ($(this).children().length > 5) {
  	    $(this).addClass('column-3');
  	  }
  	  if ($(this).children().length > 8) {
  	    $(this).addClass('column-4');
  	  }
  	});
	}

	// Setting Course Finder filter to be open by default
	var activeFilter = function() {
		$('.post-type-archive-course .filters__section .accordion .accordion-item').each(function() {
			$(this).addClass('is-active');
		})
	}


	/**
	 * Initialize filter forms.
	 */
	var initFilterForms = function () {
		// Datepicker inputs
		getElement('.filters__date__field').datepicker({
			constrainInput: true,
			dateFormat: "yy-mm-dd",
			nextText: "",
			prevText: ""
		});
		// Datepicker icons
		getElement('.filters__date__icon').on('click', function () {
			$(this).prev().datepicker('show');
		});
		// Reset button
		getElement('.filters__reset').on('click', function (e) {
			e.preventDefault();
			window.location.href = $(this).closest('form').attr('action');
		});
		// Posts-per-page select menu
		getElement('select[name="ppp"]').on('change', function (e) {
			$(this).closest('form').trigger('submit');
		});
		// Submit form when check boxes are checked
		getElement('.filters').find('[type="checkbox"]').on('change', function (e) {
			var $form = $(this).closest('form');
			$form.trigger('submit');
			$form.find(':input').prop('disabled', true);
		});
	};

	/**
	 * Fires when Foundation tabs are changed.
	 */
	var onTabsChanged = function (event, $target, $targetContent) {
		// Pause any video players that may exist in inactive tabs.
		$targetContent.closest('.tabs-content').find('.video-player').each(function () {
			var $this = $(this);
			if ($this.data('player')) {
				$this.data('player').pauseVideo();
			}
		});
	};

	/**
	 * Simple Click trigger for Wheaton Experience components
	 */
	var experienceCards = function () {
		getElement('.slide-arrow').each(function () {
			$(this).on('click', function () {
				$(this).closest('.page-component--wheaton-experience__profile').toggleClass('active');
			});
		});
	}

	/**
	 * Initialize content carousels.
	 */
	var initContentCarousels = function () {
		getElement('.page-component--content-carousel__slides').slick({
			adaptiveHeight: true,
			prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
			nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>'
		});
	};

	var updateSidebarMenu = function (newSize, oldSize) {
		var $elm = getElement('#menu-sidebar-menu').children('.menu-item').children('.nested');
		if ('small' === newSize) {
			new Foundation.AccordionMenu($elm, { 'submenuToggle' : true });
			$elm.find('.submenu-toggle').on('click', function () {
				$elm.foundation('down', $(this).next('.nested').find('.nested'));
			});
		} else if ($elm.attr('data-accordion-menu')){
			$elm.foundation('_destroy');
		}
	};

	$window.on('changed.zf.mediaquery', function (event, newSize, oldSize) {
		updateMenus();
		updateSearchPlaceholder();
		updateSidebarMenu(newSize);
	});

	$document.on('toggled.zf.responsiveToggle', function () {
		updateMenus();
		updateSearchPlaceholder();
	});

	// Show/hide utility-menu when drilling down in responsive menu.
	getElement('.top-bar__main-menu')
		.on('open.zf.drilldown', function () {
			getElement('.top-bar').find('.top-bar__utility-menu').hide();
		})
		.on('hide.zf.drilldown closed.zf.drilldown', function () {
			getElement('.top-bar').find('.top-bar__utility-menu').show();
		})
	;

	// Initialize CTA links
	$document.ready(initCtaLinks);

	// Initialize footer links
	$document.ready(initFooterLinks);

	// Initialize slick sliders
	$document.ready(initCarousels);
	$document.ready(activeCarousel);
	$document.ready(initCalloutSlides);

	// Initialize Magnific galleries
	$document.ready(initGalleries);
	$document.ready(columnCount);
	$document.ready(activeFilter);
	
	// Wheaton Experience component
	$document.ready(experienceCards);

	// Initialize load more
	initLoadMore();

	// Initialize filter forms
	initFilterForms();

	// Update sidebar menu style
	updateSidebarMenu(Foundation.MediaQuery.current);

	// Add classes to body tag when document is ready
	$document.ready(function () {
		$('body').addClass('dom-ready');
	});

	// Add classes to body tag when all assets are loaded.
	$window.load(function () {
		$('body').addClass('assets-loaded');
	});

	// Initialize video players
	$document.ready(initVideoPlayers);

	// Initialize content carousels
	$document.ready(initContentCarousels);

})(jQuery, document, window);
