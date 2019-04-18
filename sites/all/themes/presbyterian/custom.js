// page init
jQuery(function () {
    initAccordion();
    initOpenClose({
        'openClose': '.header',
        'opener': '.open-menu',
        'slide': '.menu',
        'activeClass': 'active',
        'afterOpen': function () {
            $('body').addClass('menu-active');
        },
        'afterClose': function () {
            $('body').removeClass('menu-active');
        }
    });
    initOpenClose();
});

// accordion menu init
function initAccordion() {
    jQuery('ul.accordion').slideAccordion({
        opener: '>a.opener',
        slider: '>ul',
        animSpeed: 300
    });
    jQuery('ul.accordion-list').slideAccordion({
        opener: 'a.opener',
        slider: 'div.slide',
        animSpeed: 300
    });
}

function initOpenClose(opt) {
    var defaults = {
        'openClose': '.open-close',
        'opener': '.opener',
        'slide': '.slide',
        'activeClass': 'active',
        'fade': false,
        'closeOnBodyClick': false,
        'afterOpen': null,
        'afterClose': null,
        'beforeClose': null,
        'beforeClose': null
    }

    var options = jQuery.extend({}, defaults, opt);

    jQuery(options.openClose).find(options.opener).each(function () {
        var $openClose = jQuery(this).parents(options.openClose);
        var $slide = $openClose.find(options.slide);

        jQuery(this).click(function (e) {
            if ($slide.is(':animated')) return;

            if ($slide.is(':hidden')) {
                $openClose.addClass(options.activeClass);
                open($slide);
            } else {
                $openClose.removeClass(options.activeClass);
                close($slide);
            }
            e.preventDefault();
        });
    });

    function close($slide) {
        if (options.beforeClose) options.beforeClose();

        if (options.fade) {
            $slide.fadeOut(function () {
                if (options.afterClose) options.afterClose();
            });
        } else {
            $slide.slideUp(function () {
                if (options.afterClose) options.afterClose();
            });
        }
        if (options.closeOnBodyClick) {
            $(document).off('.openClose');
        }
    }

    function open($slide) {
        if (options.beforeOpen) options.beforeOpen();

        if (options.fade) {
            $slide.fadeIn(function () {
                if (options.afterOpen) options.afterOpen();
            });
        } else {
            $slide.slideDown(function () {
                if (options.afterOpen) options.afterOpen();
            });
        }
        if (options.closeOnBodyClick) {
            $(document).on('touchstart.openClose click.openClose', function (e) {
                if (!jQuery(e.target).closest(options.openClose).length) {
                    close(slide);
                }
            });
        }
    }
}

/*
 * jQuery Accordion plugin
 */
;(function ($) {
    $.fn.slideAccordion = function (opt) {
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            activeClass: 'active',
            opener: '.opener',
            slider: '.slide',
            animSpeed: 300,
            collapsible: true,
            event: 'click'
        }, opt);

        return this.each(function () {
            // options
            var accordion = $(this);
            var items = accordion.find(':has(' + options.slider + ')');

            items.each(function () {
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);
                opener.bind(options.event, function (e) {
                    if (!slider.is(':animated')) {
                        if (item.hasClass(options.activeClass)) {
                            if (options.collapsible) {
                                slider.slideUp(options.animSpeed, function () {
                                    hideSlide(slider);
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            // show active
                            var levelItems = item.siblings('.' + options.activeClass);
                            var sliderElements = levelItems.find(options.slider);
                            item.addClass(options.activeClass);
                            showSlide(slider).hide().slideDown(options.animSpeed);

                            // collapse others
                            sliderElements.slideUp(options.animSpeed, function () {
                                levelItems.removeClass(options.activeClass);
                                hideSlide(sliderElements);
                            });
                        }
                    }
                    e.preventDefault();
                });
                if (item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
            });
        });
    };

    // accordion slide visibility
    var showSlide = function (slide) {
        return slide.css({position: '', top: '', left: '', width: ''});
    };
    var hideSlide = function (slide) {
        return slide.show().css({position: 'absolute', top: -9999, left: -9999, width: slide.width()});
    };
}(jQuery));

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
    
    $('#seniorbar-show').click(function (){
      $(this).hide();
      $('#seniorbar-base').show();    	
    });
    
    $('#seniorbar-base .seniorbar-head').click(function (){
      $(this).closest('#seniorbar-base').hide();
      $('#seniorbar-show').show();    	
    });
});