;(function ($) {
    "use strict";

    // Document Ready
    $(document).ready(function () {

        var body = $('body'),
            windowWidth = $(window).width();

        // Carousel
        var carousel = body.find('.dgt-slider-carousel');
        if ($(carousel).length > 0) {
            $(carousel).each(function () {
                var navigation = false,
                    pagination = false,
                    number = 1;
                if ($(this).data('control') != '') {
                    navigation = $(this).data('control');
                }
                if ($(this).data('pager') != '') {
                    pagination = $(this).data('pager');
                }
                if ($(this).data('number') != '') {
                    number = $(this).data('number');
                }
                $(this).owlCarousel({
                    items: number,
                    itemsDesktop: [1199, 1],
                    itemsDesktopSmall: [979, 1],
                    itemsTablet: [768, 1],
                    autoWidth: true,
                    pagination: pagination,
                    navigation: navigation,
                    navigationText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
                });
            })
        }

        // Carousel gallery
        var imgCarousel = body.find('.dgt-flickity-slider-wrap');
        if ($(imgCarousel).length > 0) {
            $(imgCarousel).each(function () {
                var galleryCarousel = $(this).find('.dgt-flickity-slider');
                var galleryNav = $(this).find('.dgt-flickity-slider-nav');
                // 1st carousel, main
                $(galleryCarousel).flickity({
                    freeScroll: true,
                    wrapAround: true,
                    pageDots: false
                });
                // 2nd carousel, navigation
                $(galleryNav).flickity({
                    asNavFor: '.dgt-flickity-slider',
                    contain: true,
                    prevNextButtons: false,
                    pageDots: false
                });
            });

        }

        // Fixed Header
        var fixed_header = body.find('.fixed-header');
        if (fixed_header.length > 0) {
            if ($(window).scrollTop() > 50) {
                $(fixed_header).removeClass('not-sticking').addClass('sticking');
            }
            $('.fixed-header').stickMe({
                topOffset: 50
            });
        }

        // Isotope
        var isotopItem = body.find('.dgt-isotope-wrap');
        if (isotopItem.length > 0) {
            $(isotopItem).each(function () {
                var itemSelect = $(this).find('.dgt-isotope-item');
                $(this).isotope({});
            });
        }

        // Counter Box
        var counter = body.find('.dgt-counter');
        if (counter.length > 0) {
            $(counter).each(function () {
                var delay = 100,
                    time = 2000;
                if ($(this).data('delay') != '') {
                    delay = $(this).data('delay');
                }
                if ($(this).data('time') != '') {
                    time = $(this).data('time');
                }
                $(this).counterUp({
                    delay: delay,
                    time: time
                });
            });
        }

        // Search
        var searchCategory = body.find('.dgt-search-wrap');
        if (searchCategory.length > 0) {
            var searchIcon = $(this).find('.dgt-search-icon'),
                searchCloseIcon = $(this).find('.dgt-search-close');
            $(searchIcon).click(function () {
                $(this).closest('.dgt-search-wrap').addClass('dgt-search-open');
            });
            $(searchCloseIcon).click(function () {
                $(this).closest('.dgt-search-wrap').removeClass('dgt-search-open');
            });
        }

        // Back to top
        if ($('#dgt-back-top').length) {
            var scrollTrigger = 300,
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#dgt-back-top').fadeIn();
                    } else {
                        $('#dgt-back-top').fadeOut();
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
            $('#dgt-back-top').on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        // Progress bar
        jQuery('.dgt-cause-percent').each(function () {
            jQuery().waypoint && jQuery(this).waypoint(function () {
                jQuery(this).animate({
                    width: jQuery(this).data('percent') + "%",
                }, 1400);
            }, {triggerOnce: !0, offset: "bottom-in-view"});
        });

        // Select Box
        jQuery('.orderby').selectBox({
            topPositionCorrelation: 40
        });

        // Countdown
        if ($('.dgt-countdown').length) {
            $('.dgt-countdown').each(function () {
                var time = $(this).data('time');
                $(this).countdown(time, function (event) {
                    $(this).html(event.strftime('<p><span>%D</span>Days</p><p><span>%H</span>Hours</p><p><span>%M</span>Minute</p><p><span>%S</span>Sec</p>'));
                });
            })
        }

        // Venobox (video lightbox)
        if ($('.dgt-venobox').length) {
            $('.dgt-venobox').each(function () {
                $(this).venobox({
                    titleattr: 'data-title',    // default: 'title'
                    numeratio: true,            // default: false
                    infinigall: true            // default: false
                });
            });
        }

        // Menu toggle
        var headerMobileOpen = body.find('.header-mobile-open-icon'),
            headerMobileClose = body.find('.header-mobile-close'),
            headerMobile = body.find('.header-mobile');
        if (jQuery(headerMobileOpen).length > 0) {
            if (jQuery(headerMobile).length > 0) {
                var menuArrow = '<span class="menu-arrow ion-android-add"></span>',
                    menuDrop = jQuery(".mobile-menu").find(".sub-menu");

                jQuery(headerMobileOpen).click(function () {
                    jQuery(this).closest('body').find(headerMobile).addClass('header-mobile-open');
                });

                jQuery(headerMobileClose).click(function () {
                    jQuery(this).closest('body').find(headerMobile).removeClass('header-mobile-open');
                });

                jQuery(menuDrop).closest(".menu-item").append(menuArrow);
                jQuery(".mobile-menu .menu-arrow").click(function () {
                    jQuery(this).closest("ul").find(".sub-menu").slideUp();
                    jQuery(this).prev().slideDown();
                    jQuery(this).closest("ul").find(".menu-arrow").removeClass('ion-android-remove').addClass('ion-android-add');
                    jQuery(this).removeClass('ion-android-add').addClass('ion-android-remove');
                });
            }
        }

        // Footer Toggle
        if (windowWidth < 768) {
            var footerWidgetTitle = jQuery('.site-footer').find('.widget-title');
            if (jQuery(footerWidgetTitle).length > 0) {
                jQuery(footerWidgetTitle).click(function () {
                    jQuery(this).closest('.footer-widget').find('.widget-title').next().slideUp();
                    jQuery(this).closest('.footer-widget').find('.widget-title').removeClass('open');
                    if (jQuery(this).hasClass('open')) {
                        jQuery(this).next().slideUp();
                        jQuery(this).removeClass('open');
                    } else {
                        jQuery(this).next().slideDown();
                        jQuery(this).addClass('open');
                    }
                });
            }
        }

        // Footer Toggle
        if (windowWidth < 992) {
            var WidgetTitle = jQuery('.sidebar').find('.widget-title');
            if (jQuery(WidgetTitle).length > 0) {
                jQuery(WidgetTitle).click(function () {
                    jQuery(this).closest('.sidebar').find('.widget-title').next().slideUp();
                    jQuery(this).closest('.sidebar').find('.widget-title').removeClass('open');
                    if (jQuery(this).hasClass('open')) {
                        jQuery(this).next().slideUp();
                        jQuery(this).removeClass('open');
                    } else {
                        jQuery(this).next().slideDown();
                        jQuery(this).addClass('open');
                    }
                });
            }
        }

    });

    // Window Load
    $(window).load(function () {
        var preloading = $('body').find('.dgt-loading-wrap');
        if (preloading.length > 0) {
            $(preloading).fadeOut();
        }
    });
})(window.jQuery);
