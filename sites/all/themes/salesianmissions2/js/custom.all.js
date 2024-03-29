/* global screenReaderText */
jQuery(window).load(function () {
    fixFooterBottom();
    callback_menu_align();
});
jQuery(window).resize(function () {
    fixFooterBottom();
    callback_menu_align();
});


/* CENTERED MENU */
var callback_menu_align = function () {
    var headerWrap = jQuery('header.header');
    var navWrap = jQuery('.main-navigation');
    var logoWrap = jQuery('.navbar-header');
    var containerWrap = jQuery('.container');
    var classToAdd = 'menu-align-center';
    if (headerWrap.hasClass(classToAdd)) {
        headerWrap.removeClass(classToAdd);
    }
    var logoWidth = logoWrap.outerWidth();
    var menuWidth = navWrap.outerWidth();
    var containerWidth = containerWrap.width();
    if (menuWidth + logoWidth > containerWidth) {
        headerWrap.addClass(classToAdd);
    } else {
        if (headerWrap.hasClass(classToAdd)) {
            headerWrap.removeClass(classToAdd);
        }
    }
    jQuery('.sticky-navigation-open').css('min-height', '70');
    var headerHeight = jQuery('.sticky-navigation').outerHeight();
    if (headerHeight > 70) {
        jQuery('.sticky-navigation-open').css('min-height', headerHeight);
    } else {
        jQuery('.sticky-navigation-open').css('min-height', 70);
    }
};

/* STICKY FOOTER */
function fixFooterBottom() {
    var header = jQuery('header.header');
    var footer = jQuery('footer.footer');
    var content = jQuery('.content-wrap');
    content.css('min-height', '1px');
    var headerHeight = header.outerHeight();
    var footerHeight = footer.outerHeight();
    var contentHeight = content.outerHeight();
    var windowHeight = jQuery(window).height();
    var totalHeight = headerHeight + footerHeight + contentHeight;
    if (totalHeight < windowHeight) {
        content.css('min-height', windowHeight - headerHeight - footerHeight);
    } else {
        content.css('min-height', '1px');
    }
}

jQuery(document).ready(function ($) {
    'use strict';
    /*---------------------------------------*/
    /*	BOOTSTRAP FIXES
     /*---------------------------------------*/
    var oldSSB = jQuery.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function () {
        oldSSB.apply(this);
        if (this.scrollbarWidth) {
            jQuery('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
        }
    };
    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function () {
        oldRSB.apply(this);
        jQuery('.navbar-fixed-top').css('padding-right', '');
    };
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
                document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                        )
                );
        document.querySelector('head').appendChild(msViewportStyle);
    }
});


/*=================================
 ===  SMOOTH SCROLL NAVIGATION     ====
 =================================== */
jQuery(document).ready(function () {
    jQuery('#menu-primary a[href*="#"]:not([href="#"]), a.woocommerce-review-link[href*="#"]:not([href="#"]), a.post-comments[href*="#"]:not([href="#"])').bind('click', function () {
        var headerHeight;
        var hash = this.hash;
        var idName = hash.substring(1);    // get id name
        var alink = this;                 // this button pressed
        // check if there is a section that had same id as the button pressed
        if (jQuery('section [id*=' + idName + ']').length > 0 && jQuery(window).innerWidth() >= 767) {
            jQuery('.current').removeClass('current');
            jQuery(alink).parent('li').addClass('current');
        } else {
            jQuery('.current').removeClass('current');
        }
        if (jQuery(window).innerWidth() >= 767) {
            headerHeight = jQuery('.sticky-navigation').outerHeight();
        } else {
            headerHeight = 0;
        }
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top - headerHeight + 10
                }, 1200);
                return false;
            }
        }
    });


    jQuery('#inpage_scroll_btn').click(function () {
        var anchor = jQuery('#inpage_scroll_btn').attr('data-anchor');
        var offset = -60;
        jQuery('html, body').animate({
            scrollTop: jQuery(anchor).offset().top + offset
        }, 1200);
    });
});



/*---------------------------------------*/
/*  NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
 /*---------------------------------------*/
function mainNav() {
    if (jQuery('.overlay-layer-nav').hasClass('sticky-navigation-open')) {
        return false;
    }
    var $llorix_one_lite_header_height;
    var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var topMenuClose = -70;
    var topMenuOpen = 0;
    if (jQuery('.admin-bar').length > 0) {
        $llorix_one_lite_header_height = jQuery('.navbar').height();
        topMenuClose = $llorix_one_lite_header_height * -1;
        topMenuOpen = 32;
    }
    if (top > 40) {
        jQuery('.appear-on-scroll').stop().animate({
            'opacity': '1',
            'top': topMenuOpen
        });
    } else {
        jQuery('.appear-on-scroll').stop().animate({
            'top': topMenuClose,
            'opacity': '0'
        });
    }
}

/* TOP NAVIGATION MENU SELECTED ITEMS */
function scrolled() {

    if (jQuery(window).width() >= 751) {
        var llorix_one_lite_scrollTop = jQuery(window).scrollTop();       // cursor position
        var headerHeight = jQuery('.sticky-navigation').outerHeight();   // header height
        var isInOneSection = 'no';                              // used for checking if the cursor is in one section or not
        // for all sections check if the cursor is inside a section
        jQuery('section').each(function () {
            var thisID = '#' + jQuery(this).attr('id');           // section id
            var llorix_one_lite_offset = jQuery(this).offset().top;         // distance between top and our section
            var thisHeight = jQuery(this).outerHeight();         // section height
            var thisBegin = llorix_one_lite_offset - headerHeight;                      // where the section begins
            var thisEnd = llorix_one_lite_offset + thisHeight - headerHeight;         // where the section ends
            // if position of the cursor is inside of the this section
            if (llorix_one_lite_scrollTop >= thisBegin && llorix_one_lite_scrollTop <= thisEnd) {
                isInOneSection = 'yes';
                jQuery('.current').removeClass('current');
                jQuery('#menu-primary a[href$="' + thisID + '"]').parent('li').addClass('current');    // find the menu button with the same ID section
                return false;
            }
            if (isInOneSection === 'no') {
                jQuery('.current').removeClass('current');
            }
        });
    }

}

var timer;

/* sticky menu without top part */
var $body = jQuery('body');
var $nav = jQuery('.sticky-navigation');
var veryTopHeaderHeight;
var adminBarHeight;
var isAdminBar;
var limit;
jQuery(document).ready(function () {
    veryTopHeaderHeight = jQuery('.very-top-header').height();
    adminBarHeight = 32;
    isAdminBar = jQuery('#wpadminbar').length !== 0;
    limit = 0;
});

jQuery(window).scroll(function () {

    mainNav();

    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(function () {
        scrolled();
    }, 500);

    /* sticky menu without top part */
    if (window.innerWidth > 768) {
        var window_offset = $body.offset().top - jQuery(window).scrollTop();
        if (typeof $nav !== 'undefined') {
            if (isAdminBar) {
                if (typeof $nav.parent() !== 'undefined') {
                    limit = ($nav.parent().hasClass('sticky-navigation-open') ? -veryTopHeaderHeight : 0) + adminBarHeight;
                }
            } else {
                if (typeof $nav.parent() !== 'undefined') {
                    limit = $nav.parent().hasClass('sticky-navigation-open') ? -veryTopHeaderHeight : 0;
                }
            }
            if (window_offset < limit) {
                $nav.css('top', limit);
            } else {
                $nav.css('top', window_offset);
            }
        }
    }


});

var window_width_old;
jQuery(document).ready(function () {
    window_width_old = jQuery('.container').width();
    if (window_width_old <= 462) {
        jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
        jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
    } else if (window_width_old <= 750) {
        jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 2, selector: '.product', calcMin: false});
        jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
    } else {
        jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 4, selector: '.product', calcMin: false});
        jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 2, selector: '.product', calcMin: false});
    }
});

jQuery(window).resize(function () {
    if (window_width_old !== jQuery('.container').outerWidth()) {
        window_width_old = jQuery('.container').outerWidth();
        if (window_width_old <= 462) {
            jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
            jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
        } else if (window_width_old <= 750) {
            jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 2, selector: '.product', calcMin: false});
            jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 1, selector: '.product', calcMin: false});
        } else {
            jQuery('.post-type-archive-product .products').llorix_one_lite_gridpinterest({columns: 4, selector: '.product', calcMin: false});
            jQuery('.cart-collaterals .products').llorix_one_lite_gridpinterest({columns: 2, selector: '.product', calcMin: false});
        }
    }
});

(function ($, window, document, undefined) {
    var defaults = {
        columns: 3,
        selector: 'div',
        excludeParentClass: '',
        calcMin: true
    };
    function LlorixOneLiteGridPinterest(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.defaults = defaults;
        this.init();
    }
    LlorixOneLiteGridPinterest.prototype.init = function () {
        var self = this,
                $container = $(this.element);
        var $select_options = $(this.element).children();
        self.make_magic($container, $select_options);
    };
    LlorixOneLiteGridPinterest.prototype.make_magic = function (container) {
        var self = this;
        var $container = $(container),
                columns_height = [],
                prefix = 'llorix_one_lite',
                unique_class = prefix + '_grid_' + self.make_unique();
        var local_class = prefix + '_grid';
        var classname;
        var substr_index = this.element.className.indexOf(prefix + '_grid_');
        if (substr_index > -1) {
            classname = this.element.className.substr(0, this.element.className.length - unique_class.length - local_class.length - 2);
        } else {
            classname = this.element.className;
        }
        var my_id;
        if (this.element.id === '') {
            my_id = prefix + '_id_' + self.make_unique();
        } else {
            my_id = this.element.id;
        }
        $container.after('<div id="' + my_id + '" class="' + classname + ' ' + local_class + ' ' + unique_class + '"></div>');
        var i;
        for (i = 1; i <= this.options.columns; i++) {
            columns_height.push(0);
            var first_cols = '';
            var last_cols = '';
            if (i % self.options.columns === 1) {
                first_cols = prefix + '_grid_first';
            }
            if (i % self.options.columns === 0) {
                first_cols = prefix + '_grid_last';
            }
            $('.' + unique_class).append('<div class="' + prefix + '_grid_col_' + this.options.columns + ' ' + prefix + '_grid_column_' + i + ' ' + first_cols + ' ' + last_cols + '"></div>');
        }
        var calcMin = this.options.calcMin;
        var cols = this.options.columns;
        if (this.element.className.indexOf(local_class) < 0) {

            $container.children(this.options.selector).each(function (index) {
                var this_index;
                if (calcMin === true) {
                    var min = Math.min.apply(null, columns_height);
                    this_index = columns_height.indexOf(min) + 1;
                } else {
                    this_index = index % cols + 1;
                }
                $(this).attr(prefix + 'grid-attr', 'this-' + index).appendTo('.' + unique_class + ' .' + prefix + '_grid_column_' + this_index);
                if (calcMin === true) {
                    columns_height[this_index - 1] = $('.' + unique_class + ' .' + prefix + '_grid_column_' + this_index).height();
                }

            });

        } else {
            var no_boxes = $container.find(this.options.selector).length;
            for (i = 0; i < no_boxes; i++) {
                var this_index;
                if (calcMin === true) {
                    var min = Math.min.apply(null, columns_height);
                    this_index = columns_height.indexOf(min) + 1;
                }
                else {
                    this_index = i % cols + 1;
                }
                $('#' + this.element.id).find('[' + prefix + 'grid-attr="this-' + i + '"]').appendTo('.' + unique_class + ' .' + prefix + '_grid_column_' + this_index);
                if (calcMin === true) {
                    columns_height[this_index - 1] = $('.' + unique_class + ' .' + prefix + '_grid_column_' + this_index).height();
                }
            }
        }
        $container.remove();
    };

    LlorixOneLiteGridPinterest.prototype.make_unique = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    LlorixOneLiteGridPinterest.prototype.allValuesSame = function (arr) {
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[0]) {
                return false;
            }
        }
        return true;
    };

    $.fn.llorix_one_lite_gridpinterest = function (options) {
        return this.each(function () {
            var value = '';
            if (!$.data(this, value)) {
                $.data(this, value, new LlorixOneLiteGridPinterest(this, options));
            }
        });
    };
})(jQuery);

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};



/*=====================================
 ========= ACCESSIBILITY READY =========
 =======================================*/

// MENU NAVIGATION WITH ARROW KEYS
(function ($) {


    $('.menu-item a').on('keydown', function (e) {
        // left key
        if (e.which === 37) {
            e.preventDefault();
            $(this).parent().prev().children('a').focus();
        }
        // right key
        else if (e.which === 39) {
            e.preventDefault();
            $(this).parent().next().children('a').focus();
        }
        // down key
        else if (e.which === 40) {
            e.preventDefault();
            if ($(this).next().next().length) {
                $(this).next().next().find('li:first-child a').first().focus();
            }
            else {
                $(this).parent().next().children('a').focus();
            }
        }
        // up key
        else if (e.which === 38) {
            e.preventDefault();
            if ($(this).parent().prev().length) {
                $(this).parent().prev().children('a').focus();
            }
            else {
                $(this).parents('ul').first().prev().prev().focus();
            }
        }
    });
})(jQuery);


//ACCESSIBILITY MENU
(function ($) {

    function initMainNavigation(container) {
        // Add dropdown toggle that display child menu items.
        container.find('.menu-item-has-children > a').after('<button class="dropdown-toggle" aria-expanded="false"><span class="dropdown-toggle-inner">' + screenReaderText.expand + '</span></button>');

        // Toggle buttons and submenu items with active children menu items.
        container.find('.current-menu-ancestor > button').addClass('toggled-on');
        container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on');

        // Add menu items with submenus to aria-haspopup="true".
        container.find('.menu-item-has-children').attr('aria-haspopup', 'true');

        container.find('.dropdown-toggle').click(function (e) {
            var _this = $(this);
            e.preventDefault();
            _this.toggleClass('toggled-on');
            _this.next('.children, .sub-menu').toggleClass('toggled-on');
            _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
            _this.find('.dropdown-toggle-inner').html(_this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand);
        });
    }

    initMainNavigation($('.main-navigation'));

    var masthead = $('#masthead');
    var menuToggle = masthead.find('#menu-toggle');
    var siteHeaderMenu = masthead.find('#site-header-menu');
    var siteNavigation = masthead.find('#site-navigation');

    // Enable menuToggle.
    (function () {
        // Return early if menuToggle is missing.
        if (!menuToggle) {
            return;
        }

        // Add an initial values for the attribute.
        menuToggle.click(function () {
            $(this).add(siteHeaderMenu).toggleClass('toggled-on');
        });
    })();


    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    (function () {
        if (!siteNavigation || !siteNavigation.children().length) {
            return;
        }

        if ('ontouchstart' in window) {
            siteNavigation.find('.menu-item-has-children > a').on('touchstart.llorix-one-lite', function (e) {
                var el = $(this).parent('li');
                if (!el.hasClass('focus')) {
                    e.preventDefault();
                    el.toggleClass('focus');
                    el.siblings('.focus').removeClass('focus');
                }
            });
        }

        siteNavigation.find('a').on('focus.llorix-one-lite blur.llorix-one-lite', function () {
            $(this).parents('.menu-item').toggleClass('focus');
        });
    })();


    // Add he default ARIA attributes for the menu toggle and the navigations.
    function onResizeARIA() {
        if (910 > window.innerWidth) {
            if (menuToggle.hasClass('toggled-on')) {
                menuToggle.attr('aria-expanded', 'true');
            } else {
                menuToggle.attr('aria-expanded', 'false');
            }

            if (siteHeaderMenu.hasClass('toggled-on')) {
                siteNavigation.attr('aria-expanded', 'true');
            } else {
                siteNavigation.attr('aria-expanded', 'false');
            }

            menuToggle.attr('aria-controls', 'site-navigation social-navigation');
        } else {
            menuToggle.removeAttr('aria-expanded');
            siteNavigation.removeAttr('aria-expanded');
            menuToggle.removeAttr('aria-controls');
        }
    }

    jQuery(document).ready(function () {
        jQuery(window).on('load.llorix-one-lite', onResizeARIA);
    });


})(jQuery);


jQuery(document).ready(function () {
    if (isMobile) {
        fixed_responsive_bg_body();
    }
    // hide #back-top first
    jQuery("#back-top").hide();
    // fade in #back-top
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 500) {
                jQuery('#back-top').fadeIn();
            } else {
                jQuery('#back-top').fadeOut();

            }
        });
        // scroll body to 0px on click
        jQuery('a#back-top').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    jQuery('.owl-carousel.owl-home').owlCarousel({
        loop: true,
        margin: 10,
        navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
                loop: false
            },
            1200: {
                items: 4,
                loop: false
            }
        }
    });
});

function fixed_responsive_bg_body() {
    if (jQuery('body').hasClass('custom-background')) {
        var thisItem = jQuery('body.custom-background');
        thisItem.prepend('<div class="mobile-bg-fixed" style="background-image:' + thisItem.css('background-image') + ';"></div>');
    }
}
