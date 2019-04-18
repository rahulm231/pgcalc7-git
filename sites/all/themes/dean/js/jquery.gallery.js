(function($) {
    "use strict";

    $.extend($.fn, {
		slideGallery: function(_options) {
			_options = $.extend({
				galleryHeight    : 'slide', // slide, window
				nextLink         : '.next',
				prevLink         : '.prev',
				holder           : '.holder',
				slides           : '.slide',
				nav              : '.nav',
                effect           : 'slide', // slide, fade
				difHeight        : 0,
                hoverTimerStop   : false,
                slideTimer       : false, // or some time - 5000, 3000
				slideDuration    : 10,
                onChangeCallback : function(){}
			}, _options);
			
			var $win = $(window),
				$body = $('body');
			
			// additional fn
			var getHeight = {
				slide : function($slides){
					var maxHeight = -1;
					$slides.each(function() {
						var h = $(this).outerHeight(true); 
						maxHeight = h > maxHeight ? h : maxHeight;
					});
					return maxHeight;
				},
				window : function($slides, $slider){
					if ($slider.is(':visible')) {
						$body.css({
							'overflow':'hidden',
							'height':$win.height()
						});
						$('#page').css({
							'overflow':'hidden',
							'height':$win.height()
						});
					}
					return $win.height() - _options.difHeight;
				}
			};

			this.each(function(j, _slider) {
				var $slider = $(_slider),
					$holder = $(_options.holder,_slider),
					$slidesOriginal = $(_options.slides,$holder),
					$nav = (typeof _options.nav == 'string') ? $(_options.nav,_slider) : _options.nav,
					$nextLink = $(_options.nextLink,_slider),
					$prevLink = $(_options.prevLink,_slider);

				var _cur = 0, _holderWidth, _mDir, _n, _length, _anim = false, _dur = _options.slideDuration, _delta, _timer = false, $slides = $slidesOriginal;

                _slider.updateSlider = function(){
                    _holderWidth = $slider.width();
                    $slides.css('width',_holderWidth);
                    switch(_options.effect) {
                        case 'slide':
                            $holder.css('left',-_holderWidth*_cur);
                            break;
                        case 'fade':
                            $slides.hide().eq(_cur).show();
                            break;
                    }
                    var _newHeight = getHeight[_options.galleryHeight]($slides, $slider);

                    if (_newHeight > 10) {
                        $holder.height(_newHeight);
                        $slider.addClass('gallery-init');
                    }
                    if(_options.slideTimer && !_timer) {
                        _timer = setTimeout(_slider.nextSlide, _options.slideTimer);
                    }
                    $slides.removeClass('active').eq(_cur).addClass('active');
                };

                if ($slides.length > 1) {
                    var $clone1 = $slidesOriginal.eq(0).clone();
                    var $clone2 = $slidesOriginal.eq($slidesOriginal.length-1).clone();

                    if (_options.effect != 'fade') {
                        $holder.append($clone1);
                        $holder.prepend($clone2);
                        $slides.eq(1).addClass('first-slide');
                        _cur = 1;
                    } else {
                        $slides.eq(0).addClass('first-slide');
                    }

                    $slides = $(_options.slides,$holder);
                    _length = $slides.length;

                    _slider.changeComplite = function () {
                        switch(_options.effect) {
                            case 'slide':
                                if(_cur <= 0) _cur = _length - 2;
                                if(_cur >= _length-1) _cur = 1;
                                $holder.css({"left":-_holderWidth * _cur});
                                break;
                            case 'fade':
                                $slides.removeClass('active');
                                $slides.eq(_cur).addClass('active viewed');
                                break;
                        }
                        _anim = false;
                        if(_options.slideTimer && !_timer) _timer = setTimeout(_slider.nextSlide, _options.slideTimer);
                    };

                    _slider.setActive = function(_nn) {
                        _cur = _nn;
                        $slides.filter('.active').trigger('stop-view').removeClass('active');
                        $slides.eq(_cur).addClass('viewed active').trigger('view');

                        if (_options.effect == 'slide') {
                            if (_cur == 1) {$slides.eq(_length-1).trigger('view').addClass('viewed');}
                            if (_cur == 0 || _cur == _length-2) {$slides.eq(0).trigger('view').addClass('viewed');}
                        }

                        if ($nav.length) {
                            if (_options.effect == 'slide') {
                                _nn -=  1;
                                if (_nn >= _length-2) _nn = 0;
                            }
                            $nav.parent().removeClass('active');
                            $nav.eq(_nn).parent().addClass('active');
                        }
                    }

                    var _tempPause = 0;

                    $slider.on('pause', function(){
                        if (_tempPause == 0 && _options.slideTimer) {
                            if(_timer) {clearTimeout(_timer); _timer = false;};
                            _tempPause = _options.slideTimer;
                            _options.slideTimer = false;
                        }
                    }).on('play', function(){
                        if (_tempPause > 0 && !_options.slideTimer) {
                            _options.slideTimer = _tempPause;
                            _tempPause = 0;
                            if(_options.slideTimer && !_timer) _timer = setTimeout(_slider.nextSlide, _options.slideTimer);
                        }
                    });

                    if (_options.hoverTimerStop) {
                        $slider.on('mouseenter', function(){
                            $slider.trigger('pause');
                        }).on('mouseleave', function(){
                            $slider.trigger('play');
                        });
                    }

                    _slider.setActive(_cur);

                    _slider.changeTo = function(_toN) {

                        if(_anim) return false
                        _anim = true;
                        if(typeof _toN == "number") _n = _toN;

                        if(_options.slideTimer && _timer) {clearTimeout(_timer); _timer = false;};

                        switch(_options.effect) {
                            case 'slide':
                                $holder.animate({"left":-_holderWidth * _n}, {duration:_dur, complete:_slider.changeComplite});
                                break;
                            case 'fade':
                                if(_n > _length-1) _n = 0;
                                if(_n < 0) _n = _length-1;
                                var _hideItem = _cur;

                                $slides.eq(_n).fadeIn(_dur, function(){
                                    $slides.eq(_hideItem).hide();
                                    _slider.changeComplite();
                                });
                                break;
                        }
                        if (typeof _options.onChangeCallback == "function") _options.onChangeCallback(_n);
                        _slider.setActive(_n);
                    }

                    _slider.nextSlide = function(){
                        _n = _cur + 1;
                        _slider.changeTo();
                        return false
                    }
                    _slider.prevSlide = function(){
                        _n = _cur - 1;
                        _slider.changeTo();
                        return false
                    }

                    if (typeof $().hammer == 'function') {

                        var _events = 'swipeleft swiperight';

                        if (_options.effect == 'slide') {
                            _events = 'release dragleft dragright '+_events;
                        }

                        $holder.hammer({ drag_block_horizontal: true })
                            .on(_events, function(ev){
                                    // disable browser scrolling
                                    ev.gesture.preventDefault();

                                switch(ev.type) {
                                    case 'dragright':
                                    case 'dragleft':
                                        $holder.css({'left':ev.gesture.deltaX + (-_holderWidth * _cur)});
                                        break;

                                    case 'swipeleft':
                                        _slider.nextSlide()
                                        ev.gesture.stopDetect();
                                        break;

                                    case 'swiperight':
                                        _slider.prevSlide();
                                        ev.gesture.stopDetect();
                                        break;

                                    case 'release':
                                        if (Math.abs(ev.gesture.deltaX) > _holderWidth/4) {
                                            if (ev.gesture.deltaX < 0) {
                                                _cur = _cur + 1;
                                            } else {
                                                _cur = _cur - 1;
                                            }
                                        }
                                        _anim = true;
                                        _slider.setActive(_cur);
                                        $holder.animate({"left":-_holderWidth * _cur}, {duration:_dur,  complete:_slider.changeComplite});
                                        break;
                                }
                            });
                    }

                    $nav.each(function(_num){
                        $(this).on('click', function(e){
                            e.preventDefault();
                            if (_options.effect == "slide") _num += 1;
                            if (_cur != _num) _slider.changeTo(_num);
                        });
                    });

                    $nextLink.click(_slider.nextSlide);
                    $prevLink.click(_slider.prevSlide);
                } else {
                    _cur = 0;
                    $nextLink.css('visibility','hidden');
                    $prevLink.css('visibility','hidden');
                }
				
				$win.on('resize',_slider.updateSlider).on('load',_slider.updateSlider);
				_slider.updateSlider();
			});
		
			return this;
		}
	});
})(jQuery);