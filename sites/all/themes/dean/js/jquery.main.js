(function ($) {
	//'use strict';

	var _mobWidth = 720;

	$(document).ready(function () {

		var $tabLinks = $('.main .tabset a');
        var $accordionBlok = $('ul.accordion');

		// layout functionality
		$.subscribe("change-dim", function (e, _dim) {
			if (_dim > _mobWidth) {
				$tabLinks.simpleTab();
				$accordionBlok.mAccordion('destroy');
			} else {
				$tabLinks.simpleTab('destroy');
				$accordionBlok.mAccordion({
					opener: 'p.acc-headline > a',
					slide: 'div.acc-body',
					activeItemClass: 'open',
					openerActiveClass: 'active',
					accordionLevel: 'ul.lvl',
					accordionItem: '> li',
					duration: 400
				});
			}
		});

		animScroll();
		stickyBar();
		loadMore();
		majorsTabs();
		contentAccordion();

		// forms
		ieClearTextInput();
		CustomForm();
		selectDropDown();

		// galleries
		videoSlides();
		fadeGallery();
		fadeGalleryContent();
		slideGalleryBlock();
		galleryWithThumbnails();

		// panels functionality
		quickLinks();
		genNavPanelsForMob();
		initPanels();

		// widgets
		//twitterWidget();

		$(window).on('resize', function () {
			var _dim = $(this).width();
			$.publish("change-dim", _dim);
		}).trigger('resize');

		$(document.body).on('click', function (e) {
			$.publish('click-el', e.target);
		});

	});

	function selectDropDown() {
		$('div.majors-select-block').each(function (_item) {
			var $majorsSelect = $('div.majors-select', this),
                $majorsDrop = $('div.majors-drop', this),
                $body = $('body'),
                _curDim = $(window).width();

			$majorsDrop.on('hide-drop', function () {
				$majorsDrop.fadeOut().removeClass('drop-is-opened');
			});
			$majorsDrop.on('show-drop', function () {
				$majorsDrop.fadeIn().addClass('drop-is-opened');
			});

			$.subscribe('click-el', function (e, _target) {
				if (!$(_target).is($majorsSelect) && !$(_target).is($majorsDrop) && !$(_target).parents('.majors-select').length && !$(_target).parents('.majors-drop').length) {
					$majorsDrop.trigger('hide-drop');
				}
			});
			$.subscribe("change-dim", function (e, _dim) {
				_curDim = _dim;
			});

			var _parentId = 'main-drop-panel-' + _item;
			var $panel = $('<div>', { "class": "nav-block mob-panel select-drop-panel", "id": _parentId });
			var _html = '<a href="#" class="lnk-close">close</a><div class="navigation">';
			_html += $majorsDrop.find('> div').html();
			_html += '</div>';
			$panel.html(_html);
			$body.append($panel);

			$majorsSelect.on('click', function (e) {
				e.preventDefault();
				if (_curDim > _mobWidth) {
					if ($majorsDrop.hasClass('drop-is-opened')) {
						$majorsDrop.trigger('hide-drop');
					} else {
						$majorsDrop.trigger('show-drop');
					}
				} else {
					$panel.trigger('show');
				}
			});

			$panel.find('div.navigation li:has("ul")').each(function (j) {
				var $linkParent = $('> a', this),
                    $ul = $('> ul', this);

				var _childId = subNavPanels($ul, $linkParent, _parentId, j, 1);
				$linkParent.attr('data-childPanel', _childId);
			});

			function subNavPanels($uls, $parentLink, _parentPanelId, _index, _lvl) {
				var _curLvl = _lvl + 1,
                    _curID = 'sub-drop-panel-' + _index + '-' + _curLvl,
                    $subPanel = $('<div>', { "class": "nav-block sub-panel mob-panel select-drop-panel", "id": _curID }),
                    _curHtml = '<a href="#' + _parentPanelId + '" class="lnk-prev">previous</a><a href="#" class="lnk-close">close</a><div class="navigation"><ul class="lvl' + _curLvl + '"><li>';

				_curHtml += '<a href="' + $parentLink.attr('href') + '">' + $parentLink.text() + '</a><ul>';

				$uls.find('> li').each(function (j) {
					var $subLink = $('> a', this),
                        $uls = $('> ul', this),
                        _subPanelId = '';

					if ($uls.length) {
						$(this).addClass('has-child');
						_subPanelId = subNavPanels($uls, $subLink, _curID, j, _curLvl);
					}

					_curHtml += '<li><a href="' + $subLink.attr('href') + '" ' + _subPanelId + '>' + $subLink.text() + '</a></li>';
				});
				_curHtml += '</ul></li></ul></div>';
				$subPanel.html(_curHtml);
				$body.append($subPanel);
				$uls.remove();
				return _curID;
			}

		});
	}

	function galleryWithThumbnails() {

		if (typeof $().slideGallery == 'function' && typeof $().galleryScroll == 'function') {

			$('div.major-slider').each(function (i, _mSlider) {

				var $thumbnails = $('div.tools', this),
                    $gallery = $(this),
                    $controls = $('<div>', { "class": "controls" }).hide(),
                    _activePage = 0, _setItem = 0;

				$gallery.slideGallery({
					galleryHeight: 'slide',
					nextLink: 'a.none',
					prevLink: 'a.none',
					holder: 'ul.gallery-content',
					slides: '> li',
					nav: '.thumbnails a',
					effect: 'fade',
					hoverTimerStop: true,
					slideTimer: (typeof _opt == 'object' && typeof _opt.majorSliderTimer == 'number') ? _opt.majorSliderTimer : false,
					slideDuration: (typeof _opt == 'object' && typeof _opt.majorSliderFadeDuration == 'number') ? _opt.majorSliderFadeDuration : 750,
					onChangeCallback: function (_cur) {
						var $thumbnailsPager = $thumbnails.data('pager'),
                            _maxItems = $thumbnails.data('maxItems'),
                            _setItem = Math.floor(_cur / _maxItems) * _maxItems;

						if (_setItem > $thumbnailsPager.length - 1) _setItem = $thumbnailsPager.length - 1;
						if (_setItem != _activePage) {
							_activePage = _setItem;
							$thumbnailsPager.eq(_setItem).trigger('click');
						}
					}
				});


				$thumbnails.append($controls);
				$thumbnails.galleryScroll({
					btPrev: 'a.lnk-prev',
					btNext: 'a.lnk-next',
					holder: 'div.thumbnails',
					mover: '> ul',
					scrollEl: '> li',
					duration: (typeof _opt == 'object' && typeof _opt.majorSliderSlideDuration == 'number') ? _opt.majorSliderSlideDuration : 5000,
					step: 1,
					vertical: false,
					autoRotation: false,
					stopARbyHover: false,
					startARafterClick: false,
					generateNumLinks: 'div.controls'
				});
			});
		}
	}

	function majorsTabs() {
		$('section.majors-tabs').each(function () {
			var $mTabs = $('ul.tabset a', this);
			$mTabs.simpleTab();
		});
	}

	function videoSlides() {
		$('div.visual > ul > li > div.video-block').each(function (i) {
			var $video = $('video, object', this).attr('id', 'video' + i),
                $holderV = $(this),
                $holderVParent = $holderV.closest('li'),
                $slideTxt = $holderVParent.find('> div.txt'),
                $img = $holderVParent.find('> div.image-wrapper'),
                _settings = {},
                _firsLoad = true,
                _id = 'video' + i,
                _myPlayer = {};

			if (isMobile.any()) {
				$holderV.remove();
			} else {
				_myPlayer.init = 0;


				if (typeof videojs == "function") {
					videojs.options.flash.swf = (typeof _opt == 'object' && typeof _opt.swf == 'string') ? _opt.swf : "swf/video-js.swf";
					_settings.techOrder = ["html5", "flash"];

					videojs(_id, _settings).ready(function () {
						_myPlayer = this;
						_myPlayer.init = 1;
						_myPlayer.ver = 'v' + i;

						_myPlayer.volume(0);

						_myPlayer.on('play', function () {
							if ($img) $img.fadeTo(300, 0);
						});
						if ($holderVParent.is(':visible')) {
							$holderVParent.trigger('view');
						}
					});

					var _play = function () {
						_myPlayer.load();
						_myPlayer.play();
					}

					$holderVParent.on('view', function () {
						if (_myPlayer.init == 1) {
							_myPlayer.init = 2;
							_play();
							if (_firsLoad) {
								_firsLoad = false;
								setTimeout(_play, 500);
							}
						}
					});

					$holderVParent.on('stop-view', function (e) {
						if (_myPlayer.init == 2) {
							_myPlayer.init = 1;
							_myPlayer.pause();
						}
					});
				}
			}
		});
	}

	function contentAccordion() {
		var $contentAccordion = $('div.articles-accordion > ul');

		if ($contentAccordion.length) {
			$contentAccordion.mAccordion({
				opener: 'a.lnk-opener',
				slide: 'div.add-content',
				activeItemClass: 'open',
				openerActiveClass: 'active',
				accordionLevel: 'ul.lvl',
				accordionItem: '> li',
				duration: 400
			});
		}
	}

	function loadMore() {
		$('p.lnk-more').each(function (i, _p) {
			var $link = $('> a', _p),
                _dots = '';

			$link.on('click', function (e) {
				e.preventDefault();
				if (!$(this).hasClass('loading')) {
					$(this).addClass('loading').html('Loading<span class="dots"></span>');
					var $dotHolder = $('span.dots', this);
					var _timer = setInterval(function () {
						_dots += '.';
						if (_dots == '....') _dots = '';
						$dotHolder.text(_dots);
					}, 250);

					$.ajax({
						url: this.href,
						success: function (_data) {
							if (_timer) clearInterval(_timer);
							$loadData = $('<div>', { "class": "load-data" }).hide();
							$loadData.html(_data);
							$(_p).replaceWith($loadData);
							$loadData.slideDown();
						}
					})
				}
			});
		});
	}

	function stickyBar() {
		var $stickyBar = $('div.sticky-bar, div.page-wrapper > nav.headline'),
            $win = $(window),
            _dur = 400,
            _curDim = $win.width();

		$.subscribe("change-dim", function (e, _dim) {
			_curDim = _dim;
		});

		if ($stickyBar.length && $stickyBar.find('div.fake-bar').length) {
			var $fixedBar = $stickyBar.clone().addClass('fixed-bar'),
                $fakeBar = $fixedBar.find('div.fake-bar').show(),
                $win = $(window);

			$stickyBar.after($fixedBar);
			$stickyBar.css({ 'visibility': 'hidden' });
			$fixedBar.css({ 'position': 'fixed', 'bottom': 0, 'left': 0 });

			$stickyBar.checkPosition = function () {
				if (_curDim < _mobWidth) return false;
				var _topOriginal = $stickyBar.offset().top,
                    _topFixed = $win.scrollTop() + $win.height() - $fixedBar.height();

				if (_topFixed >= _topOriginal) {
					$stickyBar.css({ 'visibility': 'visible' });
					$fixedBar.css({ 'position': 'absolute', 'bottom': 'auto', 'left': 0, top: _topOriginal });
					$fakeBar.fadeOut(150, function () {
						$fixedBar.css({ 'visibility': 'hidden' });
					});
				} else {
					$stickyBar.css({ 'visibility': 'hidden' });
					$fixedBar.css({ 'position': 'fixed', 'visibility': 'visible', 'bottom': 0, 'left': 0, 'top': 'auto' });
					$fakeBar.slideDown();
				}
			}

		} else {

			var _barIsOpen = $.cookie('barIsOpen'), $footer = $('footer');

			if (_barIsOpen === undefined) { _barIsOpen = '1'; }
			$.cookie('barIsOpen', _barIsOpen, { expires: 365, path: '/' });

			$stickyBar.css({ 'position': 'fixed', 'bottom': 10 });

			var $slideBar = $stickyBar.find('> div:first'),
                $opacityBlock = $stickyBar.find('div.opacity');

			$slideBar.css({ marginLeft: -_curDim, width: _curDim, position: 'relative' });

			if (_barIsOpen == '1') {
				$stickyBar.css({ bottom: 0 }).addClass('bar-is-open');
				$slideBar.css({ marginLeft: 0 });
				$opacityBlock.css('opacity', 1);
			} else {
				$opacityBlock.css('opacity', 0);
			}

			$stickyBar.find('div.wrapper a.lnk-close, a.lnk-paw ').on('click', function (e) {
				e.preventDefault();
				if (_barIsOpen == '0') {
					_barIsOpen = '1';
					$stickyBar.css({ bottom: 0 }).addClass('bar-is-open');
					$slideBar.animate({ marginLeft: 0 }, {
						duration: _dur, easing: 'easieEaseInCubic', complete: function () {
							$opacityBlock.animate({ 'opacity': 1 }, { duration: _dur });
						}
					})
				} else {
					_barIsOpen = '0';
					$opacityBlock.animate({ 'opacity': 0 }, {
						duration: _dur, complete: function () {
							$slideBar.animate({ marginLeft: -_curDim }, {
								duration: _dur, easing: 'easieEaseInCubic', complete: function () {
									$stickyBar.css({ bottom: 10 }).removeClass('bar-is-open');
								}
							});
						}
					});
				}
				$.cookie('barIsOpen', _barIsOpen, { expires: 365, path: '/' });
			});

			$stickyBar.checkPosition = function () {
				var _bottom = (_barIsOpen == '1') ? 0 : 10,
                    _topOriginal = $footer.offset().top - $stickyBar.height(),
                    _topFixed = $win.scrollTop() + $win.height() - $stickyBar.height() - _bottom;

				if (_topFixed >= _topOriginal) {
					$stickyBar.css({ 'position': 'absolute', top: _topOriginal }).addClass('near-footer');
				} else {
					$stickyBar.css({ 'position': 'fixed', 'bottom': _bottom, 'top': 'auto' }).removeClass('near-footer');
				}
			}
			$.subscribe("change-dim", function (e, _dim) {
				if (_barIsOpen == '1') {
					$stickyBar.addClass('bar-is-open');
					$slideBar.css({ width: _dim, marginLeft: 0 });
				} else {
					$stickyBar.removeClass('bar-is-open');
					$slideBar.css({ width: _dim, marginLeft: -_dim });
				}
			});
		}

		$win.on('scroll.stickyBar resize.stickyBar', function () {
			$stickyBar.checkPosition();
		});
		$stickyBar.checkPosition();
	}

	function animScroll() {
		var $winObj = $('html, body');
		$('p.lnk-top-page a').on('click', function (e) {
			e.preventDefault();
			$winObj.animate({ scrollTop: 0 }, 'slow');
		});
	}

	function initPanels() {
		var $panels = $('.mob-panel'),
            _dur = 400,
            _curDim = 0,
            _minHeight = $(document.body).height();

		$panels.each(function (i, _panel) {
			var $panel = $(_panel).css({ left: -9999 });

			$panel.find('a.lnk-close').on('click', function (e) {
				e.preventDefault();
				$panel.trigger('close');
			});

			$panel.find('a.lnk-prev').on('click', function (e) {
				e.preventDefault();
				var _id = this.href.indexOf('#') != -1 ? this.href.substr(this.href.indexOf('#')) : false;
				if (_id) {
					$(_id).trigger('show', [e.target]);
				}
			});

			$panel.on('show', function (e, _target) {
				if (!$(this).hasClass('active-panel')) {
					var $activePanel = $panels.not(this).filter('.active-panel').removeClass('active-panel');
					$(this).addClass('active-panel');
					if ($(this).hasClass('sub-panel') && !$(_target).hasClass('lnk-prev')) {
						$(this).css({ left: _curDim });
					}
					$(this).animate({
						left: 0
					}, {
						duration: _dur, easing: 'easieEaseInCubic', complete: function () {
							if ($activePanel.length) $activePanel.trigger('hide');
						}
					});
				}
			});
			$panel.on('close', function () {
				if ($(this).hasClass('active-panel')) {
					$(this).removeClass('active-panel');
					$(this).animate({
						left: -_curDim
					}, { duration: _dur });
				}
			});
			$panel.on('hide.panels', function () {
				$(this).css({ left: -_curDim }).removeClass('active-panel');
			});
		});

		var _firstLoad = true;
		$.subscribe("change-dim", function (e, _dim) {
			if (_curDim != _dim || _firstLoad) {
				_firstLoad = false;
				_curDim = _dim;
				$panels.trigger('hide.panels');
				$panels.trigger('hide.qLinks');
				_minHeight = $(document.body).height();
				$panels.css('min-height', _minHeight);
			}
		});

		$('a[data-childpanel]').on('click', function (e) {
			e.preventDefault();
			var _panelId = $(this).data('childpanel');
            var $panel = $('#' + _panelId);

			if ($panel) {
				$panel.trigger('show');
			}
		});

	}

	function genNavPanelsForMob() {
		var $body = $('body');
        var $campMenu = $('header ul.camp-menu');
		var $mainNavPanel = mainNavPanels('main-nav-panel', 'lvl1', $('ul.main-menu > li'), $('ul.main-menu > li.fake a'));

		mainNavPanels('audience-nav-panel', 'headline-nav', $('nav.headline ul > li'), $('nav.headline a.mobile-lnk'));

		$mainNavPanel.append($campMenu.clone());

		function mainNavPanels(_id, _class, $list, $link) {
			var $panel = $('<div>', { "class": "nav-block mob-panel", "id": _id });
			var _html = '<a href="#" class="lnk-close">close</a><div class="navigation"><ul class="' + _class + '">';

			$list.not('.fake').each(function (i, element) {
				var $link = $('> a', this);
				var $drop = $('div.drop', this);
				var _panelId = '';

				if ($drop.length > 0) {
					_panelId = subNavPanels($drop.find('div.column > ul'), $link, 'main-nav-panel', i, 1);
				}

				_html += '<li><a href="' + $link.attr('href') + '" ' + _panelId + '>' + $link.text() + '</a></li>';
			});

			_html += '</ul></div>';
			$panel.html(_html);

			$link.attr('data-childpanel', _id);
			$body.append($panel);

			return $panel;
		}

		function subNavPanels($uls, $parentLink, _parentPanelId, _index, _lvl) {
			var _curLvl = _lvl + 1;
			//var _curID = 'nav-panel-' + _index + '-' + _curLvl;
			var _curID = $uls.parents('li').first().attr('data-id');
			var $subPanel = $('<div>', { "class": "nav-block sub-panel mob-panel", "id": _curID });
            var _curHtml = '<a href="#' + _parentPanelId + '" class="lnk-prev">previous</a><a href="#" class="lnk-close">close</a><div class="navigation"><ul class="lvl' + _curLvl + '"><li>';

			_curHtml += '<a href="' + $parentLink.attr('href') + '">' + $parentLink.text() + '</a><ul>';

			$uls.find('> li').each(function (idx, element) {
				var $subLink = $('> a', this);
				var $uls = $('> ul', this);
                var _subPanelId = '';

				if ($uls.length > 0) {
					_subPanelId = subNavPanels($uls, $subLink, _curID, idx, _curLvl);
				}

				_curHtml += '<li><a href="' + $subLink.attr('href') + '" ' + _subPanelId + '>' + $subLink.text() + '</a></li>';
			});

			_curHtml += '</ul></li></ul></div>';
			$subPanel.html(_curHtml).append($campMenu.clone());
			$body.append($subPanel);

			return 'data-childpanel="' + _curID + '"';
		}
	}

	function quickLinks() {
		var _dur = 400,
            _cur = -1,
            _curDim,
            $slideBlock = $('div.top-slide-block'),
            $links = $('.top-menu a');

		$.subscribe("change-dim", function (e, _dim) {
			_curDim = _dim;
		});

		$links.each(function (i, _link) {
			var _id = _link.href.indexOf('#') != -1 ? _link.href.substr(_link.href.indexOf('#')) : false;
			if (_id) {
				var $slide = $(_id).removeClass('hide-desc').css('marginTop', -9999), _h;

				$slide.addClass('hide-desc mob-panel');

				$.subscribe("change-dim", function (e, _dim) {
					if (_dim > _mobWidth) {
						$slide.addClass('slide-desc-version').removeClass('slide-mob-version');
					} else {
						$slide.addClass('slide-mob-version').removeClass('slide-desc-version');
					}
				});

				$(_link).on('click', function (e) {
					e.preventDefault();
					$links.removeClass('active');
					if (_cur != i) {
						$(this).addClass('active');
						if ($slide.hasClass('slide-desc-version')) {
							_h = $slide.outerHeight();
							if ($slideBlock.hasClass('open-slide')) {
								$slideBlock.height($slideBlock.height());
								$slideBlock.find('> div:visible').fadeOut(_dur / 2, function () {
									$(this).removeAttr('style').addClass('hide-desc');
									$slide.removeClass('hide-desc').css('marginTop', 0).hide().fadeIn(_dur / 2);
								});
								$slideBlock.animate({ 'height': _h }, {
									duration: _dur, easing: 'easieEaseInCubic', step: function () {
										$(window).trigger('scroll');
									}, complete: function () {
										$(this).removeAttr('style');
										$(window).trigger('scroll');
									}
								});

							} else {
								_h = $slide.removeClass('hide-desc').outerHeight();
								$slide.css('marginTop', -_h).animate({ 'marginTop': 0 }, {
									duration: _dur, easing: 'easieEaseInCubic', step: function () {
										$(window).trigger('scroll');
									}, complete: function () {
										$(window).trigger('scroll');
									}
								});
								$slideBlock.addClass('open-slide');
							}
						} else {
							$slide.trigger('show');
						}
						_cur = i;
					}
				});

				$slide.on('hide.qLinks', function () {
					_cur = -1;
					if ($slide.hasClass('slide-desc-version')) {
						$slide.addClass('hide-desc').removeAttr('style');
						$links.removeClass('active');
						$slideBlock.removeClass('open-slide');
					}
				});

				$slide.find('a.lnk-close').on('click', function (e) {
					e.preventDefault();
					_cur = -1;
					if ($slide.hasClass('slide-desc-version')) {
						$slide.animate({ 'marginTop': -_h }, {
							duration: _dur, step: function () {
								$(window).trigger('scroll');
							}, complete: function () {
								$links.removeClass('active');
								$(this).addClass('hide-desc').removeAttr('style');
								$slideBlock.removeClass('open-slide');
								$(window).trigger('scroll');
							}
						});
					} else {
						$slide.trigger('close');
						$links.removeClass('active');
					}
				});
			}
		});
	}

	function fadeGallery() {
		if (typeof $().slideGallery == 'function') {
			showGalleryText(0);
			$('div.visual').slideGallery({
				galleryHeight: 'slide',
				nextLink: 'a.lnk-next',
				prevLink: 'a.lnk-prev',
				holder: '> ul',
				slides: '> li',
				effect: 'fade', // slide, fade
				hoverTimerStop: false,
				slideTimer: (typeof _opt == 'object' && typeof _opt.galleryTimeout == 'number') ? _opt.galleryTimeout : false,
				slideDuration: (typeof _opt == 'object' && typeof _opt.fadeDuration == 'number') ? _opt.fadeDuration : 350
			});
		}
	}

	function fadeGalleryContent() {
		if (typeof $().slideGallery == 'function') {
			$('article.image-slider').slideGallery({
				galleryHeight: 'slide', // slide, window
				nextLink: 'a.lnk-next',
				prevLink: 'a.lnk-prev',
				holder: 'ul.slider-content',
				slides: '> li',
				nav: '.gallery-tools a',
				effect: 'fade', // slide, fade
				hoverTimerStop: true,
				slideTimer: (typeof _opt == 'object' && typeof _opt.contentGalleryTimeout == 'number') ? _opt.contentGalleryTimeout : 5000,
				slideDuration: (typeof _opt == 'object' && typeof _opt.contentGalleryFadeDuration == 'number') ? _opt.contentGalleryFadeDuration : 750,
				onChangeCallback: function (_cur) {
					// _cur is the number of the current slide - zero-based
					showGalleryText(_cur);
				}
			});
		}
	}

	function showGalleryText(currSlide) {
		if ($(".slidetext").length > 0) {
			$(".slidetext").hide();
			$(".slidetext").eq(currSlide).show();
		}
	}

	//function fadeGalleryContent() {
	//    if (typeof $().slideGallery == 'function') {
	//        $('article.image-slider').slideGallery({
	//            galleryHeight  : 'slide', // slide, window
	//            nextLink       : 'a.lnk-next',
	//            prevLink       : 'a.lnk-prev',
	//            holder         : 'ul.slider-content',
	//            slides         : '> li',
	//            nav            : '.gallery-tools a',
	//            effect         : 'fade', // slide, fade
	//            hoverTimerStop : true,
	//            slideTimer     : (typeof _opt == 'object' && typeof _opt.contentGalleryTimeout == 'number') ? _opt.contentGalleryTimeout : 5000,
	//            slideDuration  : (typeof _opt == 'object' && typeof _opt.contentGalleryFadeDuration == 'number') ? _opt.contentGalleryFadeDuration : 750
	//        });
	//    }
	//}

	function slideGalleryBlock() {
		if (typeof $().slideGallery == 'function') {

			$('li.acc-spotlights div.acc-body > div').slideGallery({
				galleryHeight: 'slide', // slide, window
				nextLink: 'a.lnk-next',
				prevLink: 'a.lnk-prev',
				holder: 'div.gallery-content ul',
				slides: '> li',
				nav: '.gallery-tools a',
				effect: 'slide', // slide, fade
				slideDuration: (typeof _opt == 'object' && typeof _opt.slideDuration == 'number') ? _opt.slideDuration : 350
			});
		}
	}

	function twitterWidget() {
		// twitter widget
		if (typeof $().jTweetsAnywhere == 'function' && typeof _opt == 'object' && typeof _opt.twitterUsername == 'string') {
			$('#twitterWidget').jTweetsAnywhere({
				username: _opt.twitterUsername,
				count: 3,
				showTweetFeed: {
					showActionReply: true,
					showActionRetweet: true
				}
			});
		}
	}

	function CustomForm() {
		jcf.lib.domReady(function () {
			jcf.customForms.replaceAll();
		});
	}

	function ieClearTextInput() {
		if (typeof $().placeholder == 'function') {
			$('input[placeholder], textarea[placeholder]').placeholder();
		}
	}

})(jQuery);
