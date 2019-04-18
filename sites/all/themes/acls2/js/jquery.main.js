
function emailSignUp(group) {
    var obj = new Object();

    if (group == "emailsignup") {
        obj.Email = $(".footer-input-email").val();
        obj.FirstName = $(".footer-input-fn").val();
        obj.LastName = $(".footer-input-ln").val();
    }
    else {
        obj.Email = $(".sidebar-input-email").val();
        obj.FirstName = $(".sidebar-input-fn").val();
        obj.LastName = $(".sidebar-input-ln").val();
    }
    $.ajax("/shared/service/DbCalls.asmx/EmailSignUp",
        {
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            data: JSON.stringify(obj),
            success: function (data) {
                if (data.d) {
                    $("#modalSignUpSuccess").modal();
                    $(".footer-input-email").val('');
                    $(".footer-input-fn").val('');
                    $(".footer-input-ln").val('');
                }
                else {
                    $("#modalSignUpError").modal();
                }
            }
        });
}
function checkEmail(group) {
    var obj = new Object();

    if (group == "emailsignup") {
        obj.Email = $(".footer-input-email").val();
    }
    else {
        obj.Email = $(".sidebar-input-email").val();
    }

    $.ajax("/shared/service/DbCalls.asmx/EmailSignUpExists",
        {
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            data: JSON.stringify(obj),
            success: function (data) {
                console.log(data);
                if (data.d) {
                    $("#modalSignUpExists").modal();
                    $(".footer-input-email").val('');
                    $(".footer-input-fn").val('');
                    $(".footer-input-ln").val('');
                }
                else {
                    emailSignUp(group);
                }
            }
        });
}

function validate(group) {
    Page_ClientValidate(group);

    if (Page_IsValid) {
        checkEmail(group);
    }
}

// page init
jQuery(function () {
    // initTouchNav();
    initCarousel();
    initSlideShow();
    initMobileNav();
    initCustomCollapse();
    initToolTip();
    initRetinaCover();

    jQuery(".dataTable tr td:first-child").css("padding-left", "0");
    jQuery(".dataTable tr th:first-child").css("padding-left", "0");

    jQuery(".panel-heading span").click(function () {
        jQuery(".panel-default.active").removeClass("active").removeClass("active-parent");
        jQuery(this).parents(".panel-default").addClass("active").addClass("active-parent");

        if (jQuery(this).hasClass("collapsed")) {
            jQuery(this).addClass("close").removeClass("open");
        }
        else {
            jQuery(this).addClass("open").removeClass("close");
        }
    });

    jQuery(".hide-on-load").show();
});

jQuery(window).load(function () {
    initDataTables();
    initMobileNavigation();
    initAnchors();
    initVideo();
});


function initVideo() {
    var wrapper = jQuery('.team-area');
    var holders = wrapper.find('.video-block');
    var activeClass = 'video-active';
    var galleryApi = jQuery('.gallery').data('ScrollGallery');

    jQuery('.video-block').each(function () {
        var holder = jQuery(this);
        var play = holder.find('.play');
        var box = holder.find('.video-box');
        var url = box.data('url');
        var source = box.data('source');

        var done = false;

        var player;
        var videoID = 'player' + url;

        box.attr('id', videoID);

        onIframeAPIReady();

        function onIframeAPIReady() {
            function stopVideo() {
                if (source === 'youtube') {
                    player.pauseVideo();
                } else if (source === 'vimeo') {
                    player.pause();
                }
                if (galleryApi.options.autoRotation === true) {
                    galleryApi.startRotation();
                }
            };
            function playVideo() {
                if (source === 'youtube') {
                    player.playVideo();
                } else if (source === 'vimeo') {
                    player.play();
                }
                if (galleryApi.options.autoRotation === true) {
                    galleryApi.stopRotation();
                }
            };
            function playEvents() {
                play.on('click', function (e) {
                    e.preventDefault();

                    holders.removeClass(activeClass);
                    holder.addClass(activeClass);

                    jQuery(window).trigger('stopVideo');

                    setTimeout(function () {
                        playVideo();
                    }, 100);
                });

                jQuery(window).on('stopVideo', stopVideo);
            }
            if (source === 'youtube') {
                player = new YT.Player(videoID, {
                    height: box.data('height') || 360,
                    width: box.data('width') || 640,
                    videoId: url,
                    playerVars: {
                        rel: 0,
                        controls: 0,
                        showinfo: 0
                    },
                    events: {
                        'onReady': function () {
                            playEvents();
                        }
                    }
                });
            } else if (source === 'vimeo') {
                player = new Vimeo.Player(videoID, {
                    id: url,
                    height: box.data('height') || 360,
                    width: box.data('width') || 640,
                    loop: false
                });

                player.ready().then(function () {
                    playEvents();
                });
            }

        };
    });
}

function initToolTip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

// initialize smooth anchor links
function initAnchors() {
    new SmoothScroll({
        anchorLinks: '.alpha-list a[href^="#"]:not([href="#"])',
        activeClasses: 'parent'
    });
}

function initRetinaCover() {
    jQuery('.bg-stretch').retinaCover();
}

// init data tables
function initDataTables() {
    jQuery('#data-table').DataTable({
        ajax: 'inc/table-data.json',
        aoColumns: [{
            mData: 'sname',
            sTitle: 'Society Name'
        }, {
            mData: 'dname',
            sTitle: 'Delegate Name'
        }, {
            mData: 'officer',
            sTitle: 'Executive Officer'
        }]
    });
}

// custom collapse init
function initCustomCollapse() {
    jQuery('body').on('click', function (e) {
        var searchForm = jQuery('.search-form');
        if (jQuery(e.target).closest('.top-bar').length === 0) {
            if (searchForm.hasClass('collapse in')) {
                searchForm.collapse('hide');
            }
        }
    });
    jQuery('.society-links').each(function () {
        var holder = jQuery(this);
        var btnCollapse = holder.find('.btn-collapse');
        var btnExpand = holder.find('.btn-expand');
        var accordion = holder.find('.links-area');
        var openers = accordion.find('a[data-parent="#' + accordion.attr('id') + '"]');
        var collapses = accordion.find('.collapse');
        var activeClass = 'in';

        console.log(collapses);
        collapses.each(function () {
            var collapse = jQuery(this);

            btnCollapse.on('click', function (e) {
                e.preventDefault();

                if (collapse.hasClass(activeClass)) {
                    collapse.collapse('hide');
                }
            });

            btnExpand.on('click', function (e) {
                e.preventDefault();
                if (!collapse.hasClass(activeClass)) {
                    collapse.collapse('show');
                }
            });

            openers.on('click', function (e) {
                e.preventDefault();
                var link = jQuery(this);

                if ('#' + collapse.attr('id') !== link.data('target')) {
                    collapse.collapse('hide');
                }
            });
        });
    });
}

function initMobileNavigation() {
    jQuery('.nav-holder').each(function () {
        var navHolder = jQuery(this);
        var timer;

        ResponsiveHelper.addRange({
            '..1023': {
                on: function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        navHolder.mobileNavigation();
                    }, 100);
                }
            },
            '1024..': {
                on: function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        if (navHolder.data('MobileNavigation') !== undefined) {
                            navHolder.data('MobileNavigation').destroy();
                        }
                    }, 100);
                }
            }
        });
    });
}

// scroll gallery init
function initCarousel() {
    var activeClass = 'video-active';
    var holders = jQuery('.team-area').find('.video-block');

    jQuery('.gallery').scrollGallery({
        mask: '.galler-mask',
        slider: '.gallery-slideset',
        slides: '.gallery-slide',
        btnPrev: '.slide-prev',
        btnNext: '.slide-next',
        generatePagination: '.slider-dots',
        stretchSlideToMask: true,
        maskAutoSize: true,
        autoRotation: false,
        switchTime: 10000,
        animSpeed: 500,
        step: false,
        onChange: function () {
            jQuery(window).trigger('stopVideo');
            holders.removeClass(activeClass);
        }
    });
}

// fade gallery init
function initSlideShow() {
    jQuery('.slideshow').fadeGallery({
        slides: '.slide',
        btnPrev: '.btn-prev',
        btnNext: '.btn-next',
        generatePagination: '.swither-dots',
        event: 'click',
        useSwipe: true,
        autoRotation: true,
        autoHeight: true,
        switchTime: 10000,
        animSpeed: 1000
    });
}

// mobile menu init
function initMobileNav() {
    jQuery('body').mobileNav({
        hideOnClickOutside: true,
        menuActiveClass: 'nav-active',
        menuOpener: '.nav-opener',
        menuDrop: '.nav-holder'
    });
    jQuery('body').mobileNav({
        hideOnClickOutside: true,
        menuActiveClass: 'sidebar-active',
        menuOpener: '.sidebar-opener',
        menuDrop: '.sidebar-menu'
    });
}

/*!
 * SmoothScroll module
 */
; (function ($, exports) {
    // private variables
    var page,
        win = $(window),
        activeBlock, activeWheelHandler,
        wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

    // animation handlers
    function scrollTo(offset, options, callback) {
        // initialize variables
        var scrollBlock;
        if (document.body) {
            if (typeof options === 'number') {
                options = { duration: options };
            } else {
                options = options || {};
            }
            page = page || $('html, body');
            scrollBlock = options.container || page;
        } else {
            return;
        }

        // treat single number as scrollTop
        if (typeof offset === 'number') {
            offset = { top: offset };
        }

        // handle mousewheel/trackpad while animation is active
        if (activeBlock && activeWheelHandler) {
            activeBlock.off(wheelEvents, activeWheelHandler);
        }
        if (options.wheelBehavior && options.wheelBehavior !== 'none') {
            activeWheelHandler = function (e) {
                if (options.wheelBehavior === 'stop') {
                    scrollBlock.off(wheelEvents, activeWheelHandler);
                    scrollBlock.stop();
                } else if (options.wheelBehavior === 'ignore') {
                    e.preventDefault();
                }
            };
            activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
        }

        // start scrolling animation
        scrollBlock.stop().animate({
            scrollLeft: offset.left,
            scrollTop: offset.top
        }, options.duration, function () {
            if (activeWheelHandler) {
                scrollBlock.off(wheelEvents, activeWheelHandler);
            }
            if ($.isFunction(callback)) {
                callback();
            }
        });
    }

    // smooth scroll contstructor
    function SmoothScroll(options) {
        this.options = $.extend({
            anchorLinks: 'a[href^="#"]',	// selector or jQuery object
            container: null,		// specify container for scrolling (default - whole page)
            extraOffset: null,		// function or fixed number
            activeClasses: null,	// null, "link", "parent"
            easing: 'swing',		// easing of scrolling
            animMode: 'duration',	// or "speed" mode
            animDuration: 800,		// total duration for scroll (any distance)
            animSpeed: 1500,		// pixels per second
            anchorActiveClass: 'anchor-active',
            sectionActiveClass: 'section-active',
            wheelBehavior: 'stop', // "stop", "ignore" or "none"
            useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
        }, options);
        this.init();
    }
    SmoothScroll.prototype = {
        init: function () {
            this.initStructure();
            this.attachEvents();
        },
        initStructure: function () {
            var self = this;

            this.container = this.options.container ? $(this.options.container) : $('html,body');
            this.scrollContainer = this.options.container ? this.container : win;
            this.anchorLinks = jQuery(this.options.anchorLinks).filter(function () {
                return document.getElementById(this.getAttribute('href').slice(1));
            });
        },
        getAnchorTarget: function (link) {
            // get target block from link href
            var targetId = $(link).attr('href');
            return $(targetId.length > 1 ? targetId : 'html');
        },
        getTargetOffset: function (block) {
            // get target offset
            var blockOffset = block.offset().top;
            if (this.options.container) {
                blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
            }

            // handle extra offset
            if (typeof this.options.extraOffset === 'number') {
                blockOffset -= this.options.extraOffset;
            } else if (typeof this.options.extraOffset === 'function') {
                blockOffset -= this.options.extraOffset(block);
            }
            return { top: blockOffset };
        },
        attachEvents: function () {
            var self = this;

            // handle active classes
            if (this.options.activeClasses && this.anchorLinks.length) {
                // cache structure
                this.anchorData = [];

                for (var i = 0; i < this.anchorLinks.length; i++) {
                    var link = jQuery(this.anchorLinks[i]),
                        targetBlock = self.getAnchorTarget(link),
                        anchorDataItem;

                    $.each(self.anchorData, function (index, item) {
                        if (item.block[0] === targetBlock[0]) {
                            anchorDataItem = item;
                        }
                    });

                    if (anchorDataItem) {
                        anchorDataItem.link = anchorDataItem.link.add(link);
                    } else {
                        self.anchorData.push({
                            link: link,
                            block: targetBlock
                        });
                    }
                };

                // add additional event handlers
                this.resizeHandler = function () {
                    self.recalculateOffsets();
                };
                this.scrollHandler = function () {
                    self.refreshActiveClass();
                };

                this.recalculateOffsets();
                this.scrollContainer.on('scroll', this.scrollHandler);
                win.on('resize', this.resizeHandler);
            }

            // handle click event
            this.clickHandler = function (e) {
                self.onClick(e);
            };
            if (!this.options.useNativeAnchorScrolling) {
                this.anchorLinks.on('click', this.clickHandler);
            }
        },
        recalculateOffsets: function () {
            var self = this;
            $.each(this.anchorData, function (index, data) {
                data.offset = self.getTargetOffset(data.block);
                data.height = data.block.outerHeight();
            });
            this.refreshActiveClass();
        },
        refreshActiveClass: function () {
            var self = this,
                foundFlag = false,
                containerHeight = this.container.prop('scrollHeight'),
                viewPortHeight = this.scrollContainer.height(),
                scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

            // user function instead of default handler
            if (this.options.customScrollHandler) {
                this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
                return;
            }

            // sort anchor data by offsets
            this.anchorData.sort(function (a, b) {
                return a.offset.top - b.offset.top;
            });
            function toggleActiveClass(anchor, block, state) {
                anchor.toggleClass(self.options.anchorActiveClass, state);
                block.toggleClass(self.options.sectionActiveClass, state);
            }

            // default active class handler
            $.each(this.anchorData, function (index) {
                var reverseIndex = self.anchorData.length - index - 1,
                    data = self.anchorData[reverseIndex],
                    anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

                if (scrollTop >= containerHeight - viewPortHeight) {
                    // handle last section
                    if (reverseIndex === self.anchorData.length - 1) {
                        toggleActiveClass(anchorElement, data.block, true);
                    } else {
                        toggleActiveClass(anchorElement, data.block, false);
                    }
                } else {
                    // handle other sections
                    if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
                        foundFlag = true;
                        toggleActiveClass(anchorElement, data.block, true);
                    } else {
                        toggleActiveClass(anchorElement, data.block, false);
                    }
                }
            });
        },
        calculateScrollDuration: function (offset) {
            var distance;
            if (this.options.animMode === 'speed') {
                distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
                return (distance / this.options.animSpeed) * 1000;
            } else {
                return this.options.animDuration;
            }
        },
        onClick: function (e) {
            var targetBlock = this.getAnchorTarget(e.currentTarget),
                targetOffset = this.getTargetOffset(targetBlock);

            e.preventDefault();
            scrollTo(targetOffset, {
                container: this.container,
                wheelBehavior: this.options.wheelBehavior,
                duration: this.calculateScrollDuration(targetOffset)
            });
        },
        destroy: function () {
            if (this.options.activeClasses) {
                win.off('resize', this.resizeHandler);
                this.scrollContainer.off('scroll', this.scrollHandler);
            }
            this.anchorLinks.off('click', this.clickHandler);
        }
    };

    // public API
    $.extend(SmoothScroll, {
        scrollTo: function (blockOrOffset, durationOrOptions, callback) {
            scrollTo(blockOrOffset, durationOrOptions, callback);
        }
    });

    // export module
    exports.SmoothScroll = SmoothScroll;
}(jQuery, this));

/*
 * jQuery Mobile Navigation plugin
 */
; (function ($) {
    function MobileNavigation(options) {
        this.options = $.extend({
            addClassBeforeAnimation: true,
            hideOnClickOutside: false,
            slider: '#nav',
            listItems: 'li',
            opener: '> a',
            nextLevel: '> .drop-wrap > .dropdown-menu',
            activeClass: 'active-state',
            backBtn: '<a href="#" class="btn-back" />',
            navActiveClass: 'menu-active',
            animSpeed: 400
        }, options);
        this.init();
    }
    MobileNavigation.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function () {
            var self = this;
            this.holder = $(this.options.holder);
            this.slider = this.holder.find(this.options.slider);
            this.allListItems = this.slider.find(this.options.listItems).has(this.options.nextLevel);
            this.allOpeners = $();
            this.moveOffset = this.slider.innerWidth();
            this.allBack = $();
            this.allListItems.each(function () {
                var listItem = $(this);
                var opener = listItem.find(self.options.opener);
                var drop = listItem.find(self.options.nextLevel);
                var parentDrop = listItem.closest(drop);
                var backLink = $(self.options.backBtn);
                var backText = opener.text();
                backLink.text(backText).prependTo(drop);
                self.allOpeners = self.allOpeners.add(opener);
                opener.data({
                    drop: drop,
                    listItem: listItem,
                    backLink: backLink
                });
                listItem.data({
                    drop: drop,
                    opener: opener
                });
                self.allBack = self.allBack.add(backLink);
            });
            this.levelCounter = 0;
        },
        attachEvents: function () {
            var self = this;

            this.resizeHandler = function () {
                self.onPageResize();
            };

            $(window).on('resize orientationchange load', this.resizeHandler);
            this.allOpeners.each(function () {
                var currOpener = $(this);
                var backLink = currOpener.data('backLink');
                currOpener.on('click.menu', function (e) {
                    e.preventDefault();
                    self.showLevel(currOpener.data('listItem'));
                });
                if (backLink && backLink.length) {
                    backLink.on('click.menu', function (e) {
                        e.preventDefault();
                        self.hideLevel(currOpener.data('listItem'));
                    });
                }
            });
        },
        showLevel: function (listItem) {
            var self = this;
            jQuery(self.options.holder).addClass(self.options.navActiveClass);
            ++this.levelCounter;
            this.moveSlider();
            listItem.siblings().removeClass(this.options.activeClass);
            listItem.addClass(this.options.activeClass);
        },
        hideLevel: function (listItem) {
            var self = this;
            --this.levelCounter;
            if (self.levelCounter === 0) {
                jQuery(self.options.holder).removeClass(self.options.navActiveClass);
            };
            this.moveSlider({
                complete: function () {
                    listItem.removeClass(self.options.activeClass);
                }
            });
        },
        hideAllLevels: function () {
            var self = this;
            this.levelCounter = 0;
            jQuery(self.options.holder).removeClass(self.options.navActiveClass);
            this.moveSlider({
                complete: function () {
                    self.allListItems.removeClass(self.options.activeClass);
                }
            });
        },
        moveSlider: function (obj) {
            this.slider.stop().animate({ marginLeft: -this.levelCounter * this.moveOffset }, (obj && obj.noAnim) ? 0 : this.options.animSpeed, function () {
                if (obj && obj.complete) obj.complete();
            });
        },
        onPageResize: function () {
            this.moveOffset = this.slider.innerWidth();
            this.moveSlider({ noAnim: true });
        },
        destroy: function () {
            this.allOpeners.off('click.menu');
            this.allBack.remove();
            this.allListItems.removeClass(this.options.activeClass);
            this.slider.stop().css({ marginLeft: '' });
            $(window).off('resize orientationchange load', this.resizeHandler);
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    // jQuery plugin interface
    $.fn.mobileNavigation = function (opt) {
        return this.each(function () {
            jQuery(this).data('MobileNavigation', new MobileNavigation($.extend(opt, { holder: this })));
        });
    };
}(jQuery));

/*
 * Responsive Layout helper
 */
ResponsiveHelper = (function ($) {
    // init variables
    var handlers = [],
        prevWinWidth,
        win = $(window),
        nativeMatchMedia = false;

    // detect match media support
    if (window.matchMedia) {
        if (window.Window && window.matchMedia === Window.prototype.matchMedia) {
            nativeMatchMedia = true;
        } else if (window.matchMedia.toString().indexOf('native') > -1) {
            nativeMatchMedia = true;
        }
    }

    // prepare resize handler
    function resizeHandler() {
        var winWidth = win.width();
        if (winWidth !== prevWinWidth) {
            prevWinWidth = winWidth;

            // loop through range groups
            $.each(handlers, function (index, rangeObject) {
                // disable current active area if needed
                $.each(rangeObject.data, function (property, item) {
                    if (item.currentActive && !matchRange(item.range[0], item.range[1])) {
                        item.currentActive = false;
                        if (typeof item.disableCallback === 'function') {
                            item.disableCallback();
                        }
                    }
                });

                // enable areas that match current width
                $.each(rangeObject.data, function (property, item) {
                    if (!item.currentActive && matchRange(item.range[0], item.range[1])) {
                        // make callback
                        item.currentActive = true;
                        if (typeof item.enableCallback === 'function') {
                            item.enableCallback();
                        }
                    }
                });
            });
        }
    }
    win.bind('load resize orientationchange', resizeHandler);

    // test range
    function matchRange(r1, r2) {
        var mediaQueryString = '';
        if (r1 > 0) {
            mediaQueryString += '(min-width: ' + r1 + 'px)';
        }
        if (r2 < Infinity) {
            mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
        }
        return matchQuery(mediaQueryString, r1, r2);
    }

    // media query function
    function matchQuery(query, r1, r2) {
        if (window.matchMedia && nativeMatchMedia) {
            return matchMedia(query).matches;
        } else if (window.styleMedia) {
            return styleMedia.matchMedium(query);
        } else if (window.media) {
            return media.matchMedium(query);
        } else {
            return prevWinWidth >= r1 && prevWinWidth <= r2;
        }
    }

    // range parser
    function parseRange(rangeStr) {
        var rangeData = rangeStr.split('..');
        var x1 = parseInt(rangeData[0], 10) || -Infinity;
        var x2 = parseInt(rangeData[1], 10) || Infinity;
        return [x1, x2].sort(function (a, b) {
            return a - b;
        });
    }

    // export public functions
    return {
        addRange: function (ranges) {
            // parse data and add items to collection
            var result = { data: {} };
            $.each(ranges, function (property, data) {
                result.data[property] = {
                    range: parseRange(property),
                    enableCallback: data.on,
                    disableCallback: data.off
                };
            });
            handlers.push(result);

            // call resizeHandler to recalculate all events
            prevWinWidth = null;
            resizeHandler();
        }
    };
}(jQuery));

/*
 * jQuery Carousel plugin
 */
; (function ($) {
    function ScrollGallery(options) {
        this.options = $.extend({
            mask: 'div.mask',
            slider: '>*',
            slides: '>*',
            activeClass: 'active',
            disabledClass: 'disabled',
            btnPrev: 'a.btn-prev',
            btnNext: 'a.btn-next',
            generatePagination: false,
            pagerList: '<ul>',
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: 'a',
            pagerLinks: '.pagination li',
            currentNumber: 'span.current-num',
            totalNumber: 'span.total-num',
            btnPlay: '.btn-play',
            btnPause: '.btn-pause',
            btnPlayPause: '.btn-play-pause',
            galleryReadyClass: 'gallery-js-ready',
            autorotationActiveClass: 'autorotation-active',
            autorotationDisabledClass: 'autorotation-disabled',
            stretchSlideToMask: false,
            circularRotation: true,
            disableWhileAnimating: false,
            autoRotation: false,
            pauseOnHover: isTouchDevice ? false : true,
            maskAutoSize: false,
            switchTime: 10000,
            animSpeed: 5000,
            event: 'click',
            swipeThreshold: 15,
            handleTouch: true,
            vertical: false,
            useTranslate3D: false,
            step: false
        }, options);
        this.init();
    }
    ScrollGallery.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.refreshPosition();
                this.refreshState(true);
                this.resumeRotation();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function () {
            // define dimensions proporties
            this.fullSizeFunction = this.options.vertical ? 'outerHeight' : 'outerWidth';
            this.innerSizeFunction = this.options.vertical ? 'height' : 'width';
            this.slideSizeFunction = 'outerHeight';
            this.maskSizeProperty = 'height';
            this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

            // control elements
            this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.mask = this.gallery.find(this.options.mask);
            this.slider = this.mask.find(this.options.slider);
            this.slides = this.slider.find(this.options.slides);
            this.btnPrev = this.gallery.find(this.options.btnPrev);
            this.btnNext = this.gallery.find(this.options.btnNext);
            this.currentStep = 0; this.stepsCount = 0;

            // get start index
            if (this.options.step === false) {
                var activeSlide = this.slides.filter('.' + this.options.activeClass);
                if (activeSlide.length) {
                    this.currentStep = this.slides.index(activeSlide);
                }
            }

            // calculate offsets
            this.calculateOffsets();

            // create gallery pagination
            if (typeof this.options.generatePagination === 'string') {
                this.pagerLinks = $();
                this.buildPagination();
            } else {
                this.pagerLinks = this.gallery.find(this.options.pagerLinks);
                this.attachPaginationEvents();
            }

            // autorotation control buttons
            this.btnPlay = this.gallery.find(this.options.btnPlay);
            this.btnPause = this.gallery.find(this.options.btnPause);
            this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

            // misc elements
            this.curNum = this.gallery.find(this.options.currentNumber);
            this.allNum = this.gallery.find(this.options.totalNumber);
        },
        attachEvents: function () {
            // bind handlers scope
            var self = this;
            this.bindHandlers(['onWindowResize']);
            $(window).bind('load resize orientationchange', this.onWindowResize);

            // previous and next button handlers
            if (this.btnPrev.length) {
                this.prevSlideHandler = function (e) {
                    e.preventDefault();
                    self.prevSlide();
                };
                this.btnPrev.bind(this.options.event, this.prevSlideHandler);
            }
            if (this.btnNext.length) {
                this.nextSlideHandler = function (e) {
                    e.preventDefault();
                    self.nextSlide();
                };
                this.btnNext.bind(this.options.event, this.nextSlideHandler);
            }

            // pause on hover handling
            if (this.options.pauseOnHover && !isTouchDevice) {
                this.hoverHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = true;
                        self.pauseRotation();
                    }
                };
                this.leaveHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = false;
                        self.resumeRotation();
                    }
                };
                this.gallery.bind({ mouseenter: this.hoverHandler, mouseleave: this.leaveHandler });
            }

            // autorotation buttons handler
            if (this.btnPlay.length) {
                this.btnPlayHandler = function (e) {
                    e.preventDefault();
                    self.startRotation();
                };
                this.btnPlay.bind(this.options.event, this.btnPlayHandler);
            }
            if (this.btnPause.length) {
                this.btnPauseHandler = function (e) {
                    e.preventDefault();
                    self.stopRotation();
                };
                this.btnPause.bind(this.options.event, this.btnPauseHandler);
            }
            if (this.btnPlayPause.length) {
                this.btnPlayPauseHandler = function (e) {
                    e.preventDefault();
                    if (!self.gallery.hasClass(self.options.autorotationActiveClass)) {
                        self.startRotation();
                    } else {
                        self.stopRotation();
                    }
                };
                this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
            }

            // enable hardware acceleration
            if (isTouchDevice && this.options.useTranslate3D) {
                this.slider.css({ '-webkit-transform': 'translate3d(0px, 0px, 0px)' });
            }

            // swipe event handling
            if (isTouchDevice && this.options.handleTouch && window.Hammer && this.mask.length) {
                this.swipeHandler = new Hammer.Manager(this.mask[0]);
                this.swipeHandler.add(new Hammer.Pan({
                    direction: self.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
                    threshold: self.options.swipeThreshold
                }));

                this.swipeHandler.on('panstart', function () {
                    if (self.galleryAnimating) {
                        self.swipeHandler.stop();
                    } else {
                        self.pauseRotation();
                        self.originalOffset = parseFloat(self.slider.css(self.animProperty));
                    }
                }).on('panmove', function (e) {
                    var tmpOffset = self.originalOffset + e[self.options.vertical ? 'deltaY' : 'deltaX'];
                    tmpOffset = Math.max(Math.min(0, tmpOffset), self.maxOffset);
                    self.slider.css(self.animProperty, tmpOffset);
                }).on('panend', function (e) {
                    self.resumeRotation();
                    if (e.distance > self.options.swipeThreshold) {
                        if (e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN) {
                            self.nextSlide();
                        } else {
                            self.prevSlide();
                        }
                    } else {
                        self.switchSlide();
                    }
                });
            }
        },
        onWindowResize: function () {
            if (!this.galleryAnimating) {
                this.calculateOffsets();
                this.refreshPosition();
                this.buildPagination();
                this.refreshState();
                this.resizeQueue = false;
            } else {
                this.resizeQueue = true;
            }
        },
        refreshPosition: function () {
            this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
            this.tmpProps = {};
            this.tmpProps[this.animProperty] = this.getStepOffset();
            this.slider.stop().css(this.tmpProps);
        },
        calculateOffsets: function () {
            var self = this, tmpOffset, tmpStep;
            if (this.options.stretchSlideToMask) {
                var tmpObj = {};
                tmpObj[this.innerSizeFunction] = this.mask[this.innerSizeFunction]();
                this.slides.css(tmpObj);
            }

            this.maskSize = this.mask[this.innerSizeFunction]();
            this.sumSize = this.getSumSize();
            this.maxOffset = this.maskSize - this.sumSize;

            // vertical gallery with single size step custom behavior
            if (this.options.vertical && this.options.maskAutoSize) {
                this.options.step = 1;
                this.stepsCount = this.slides.length;
                this.stepOffsets = [0];
                tmpOffset = 0;
                for (var i = 0; i < this.slides.length; i++) {
                    tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
                    this.stepOffsets.push(tmpOffset);
                }
                this.maxOffset = tmpOffset;
                return;
            }

            // scroll by slide size
            if (typeof this.options.step === 'number' && this.options.step > 0) {
                this.slideDimensions = [];
                this.slides.each($.proxy(function (ind, obj) {
                    self.slideDimensions.push($(obj)[self.fullSizeFunction](true));
                }, this));

                // calculate steps count
                this.stepOffsets = [0];
                this.stepsCount = 1;
                tmpOffset = tmpStep = 0;
                while (tmpOffset > this.maxOffset) {
                    tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
                    tmpStep += this.options.step;
                    this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
                    this.stepsCount++;
                }
            }
                // scroll by mask size
            else {
                // define step size
                this.stepSize = this.maskSize;

                // calculate steps count
                this.stepsCount = 1;
                tmpOffset = 0;
                while (tmpOffset > this.maxOffset) {
                    tmpOffset -= this.stepSize;
                    this.stepsCount++;
                }
            }
        },
        getSumSize: function () {
            var sum = 0;
            this.slides.each($.proxy(function (ind, obj) {
                sum += $(obj)[this.fullSizeFunction](true);
            }, this));
            this.slider.css(this.innerSizeFunction, sum);
            return sum;
        },
        getStepOffset: function (step) {
            step = step || this.currentStep;
            if (typeof this.options.step === 'number') {
                return this.stepOffsets[this.currentStep];
            } else {
                return Math.min(0, Math.max(-this.currentStep * this.stepSize, this.maxOffset));
            }
        },
        getSlideSize: function (i1, i2) {
            var sum = 0;
            for (var i = i1; i < Math.min(i2, this.slideDimensions.length) ; i++) {
                sum += this.slideDimensions[i];
            }
            return sum;
        },
        buildPagination: function () {
            if (typeof this.options.generatePagination === 'string') {
                if (!this.pagerHolder) {
                    this.pagerHolder = this.gallery.find(this.options.generatePagination);
                }
                if (this.pagerHolder.length && this.oldStepsCount != this.stepsCount) {
                    this.oldStepsCount = this.stepsCount;
                    this.pagerHolder.empty();
                    this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                    for (var i = 0; i < this.stepsCount; i++) {
                        $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
                    }
                    this.pagerLinks = this.pagerList.children();
                    this.attachPaginationEvents();
                }
            }
        },
        attachPaginationEvents: function () {
            var self = this;
            this.pagerLinksHandler = function (e) {
                e.preventDefault();
                self.numSlide(self.pagerLinks.index(e.currentTarget));
            };
            this.pagerLinks.bind(this.options.event, this.pagerLinksHandler);
        },
        prevSlide: function () {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                if (this.currentStep > 0) {
                    this.currentStep--;
                    this.switchSlide();
                } else if (this.options.circularRotation) {
                    this.currentStep = this.stepsCount - 1;
                    this.switchSlide();
                }

                var currentItem = $(".gallery-slide.active .video-block iframe").data("docname");
                if (currentItem == null || currentItem == undefined || currentItem == '') {
                    currentItem = $(".gallery-slide.active .video-box").data("docname");
                }
                console.info("currentItem", currentItem);
                $("h2.no-super").text(currentItem);
            }
        },
        nextSlide: function (fromAutoRotation) {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                if (this.currentStep < this.stepsCount - 1) {
                    this.currentStep++;
                    this.switchSlide();
                } else if (this.options.circularRotation || fromAutoRotation === true) {
                    this.currentStep = 0;
                    this.switchSlide();
                }

                var currentItem = $(".gallery-slide.active .video-block iframe").data("docname");
                if (currentItem == null || currentItem == undefined || currentItem == '') {
                    currentItem = $(".gallery-slide.active .video-box").data("docname");
                }
                console.info("currentItem", currentItem);
                $("h2.no-super").text(currentItem);
            }
        },
        numSlide: function (c) {
            if (this.currentStep != c) {
                this.currentStep = c;
                this.switchSlide();
            }
        },
        switchSlide: function () {
            var self = this;
            this.galleryAnimating = true;
            this.tmpProps = {};
            this.tmpProps[this.animProperty] = this.getStepOffset();
            this.slider.stop().animate(this.tmpProps, {
                duration: this.options.animSpeed, complete: function () {
                    // animation complete
                    self.galleryAnimating = false;
                    if (self.resizeQueue) {
                        self.onWindowResize();
                    }

                    // onchange callback
                    self.makeCallback('onChange', self);
                    self.autoRotate();
                }
            });
            this.refreshState();

            // onchange callback
            this.makeCallback('onBeforeChange', this);
        },
        refreshState: function (initial) {
            if (this.options.step === 1 || this.stepsCount === this.slides.length) {
                this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
            }
            this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
            this.curNum.html(this.currentStep + 1);
            this.allNum.html(this.stepsCount);

            // initial refresh
            if (this.options.maskAutoSize && typeof this.options.step === 'number') {
                this.tmpProps = {};
                this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep, this.slides.length - 1))[this.slideSizeFunction](true);
                this.mask.stop()[initial ? 'css' : 'animate'](this.tmpProps);
            }

            // disabled state
            if (!this.options.circularRotation) {
                this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
                if (this.currentStep === 0) this.btnPrev.addClass(this.options.disabledClass);
                if (this.currentStep === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
            }

            // add class if not enough slides
            this.gallery.toggleClass('not-enough-slides', this.sumSize <= this.maskSize);
        },
        startRotation: function () {
            this.options.autoRotation = true;
            this.galleryHover = false;
            this.autoRotationStopped = false;
            this.resumeRotation();
        },
        stopRotation: function () {
            this.galleryHover = true;
            this.autoRotationStopped = true;
            this.pauseRotation();
        },
        pauseRotation: function () {
            this.gallery.addClass(this.options.autorotationDisabledClass);
            this.gallery.removeClass(this.options.autorotationActiveClass);
            clearTimeout(this.timer);
        },
        resumeRotation: function () {
            if (!this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.gallery.removeClass(this.options.autorotationDisabledClass);
                this.autoRotate();
            }
        },
        autoRotate: function () {
            var self = this;
            clearTimeout(this.timer);
            if (this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
                this.timer = setTimeout(function () {
                    self.nextSlide(true);
                }, this.options.switchTime);
            } else {
                this.pauseRotation();
            }
        },
        bindHandlers: function (handlersList) {
            var self = this;
            $.each(handlersList, function (index, handler) {
                var origHandler = self[handler];
                self[handler] = function () {
                    return origHandler.apply(self, arguments);
                };
            });
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            // destroy handler
            $(window).unbind('load resize orientationchange', this.onWindowResize);
            this.btnPrev.unbind(this.options.event, this.prevSlideHandler);
            this.btnNext.unbind(this.options.event, this.nextSlideHandler);
            this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
            this.gallery.unbind('mouseenter', this.hoverHandler);
            this.gallery.unbind('mouseleave', this.leaveHandler);

            // autorotation buttons handlers
            this.stopRotation();
            this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
            this.btnPause.unbind(this.options.event, this.btnPauseHandler);
            this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);

            // destroy swipe handler
            if (this.swipeHandler) {
                this.swipeHandler.destroy();
            }

            // remove inline styles, classes and pagination
            var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
            this.gallery.removeClass(unneededClasses.join(' '));
            this.slider.add(this.slides).removeAttr('style');
            if (typeof this.options.generatePagination === 'string') {
                this.pagerHolder.empty();
            }
        }
    };

    // detect device type
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.scrollGallery = function (opt) {
        return this.each(function () {
            $(this).data('ScrollGallery', new ScrollGallery($.extend(opt, { holder: this })));
        });
    };
}(jQuery));

/*
 * jQuery SlideShow plugin
 */
; (function ($) {
    function FadeGallery(options) {
        this.options = $.extend({
            slides: 'ul.slideset > li',
            activeClass: 'active',
            disabledClass: 'disabled',
            btnPrev: 'a.btn-prev',
            btnNext: 'a.btn-next',
            generatePagination: false,
            pagerList: '<ul>',
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: 'a',
            pagerLinks: '.pagination li',
            currentNumber: 'span.current-num',
            totalNumber: 'span.total-num',
            btnPlay: '.btn-play',
            btnPause: '.btn-pause',
            btnPlayPause: '.btn-play-pause',
            galleryReadyClass: 'gallery-js-ready',
            autorotationActiveClass: 'autorotation-active',
            autorotationDisabledClass: 'autorotation-disabled',
            autorotationStopAfterClick: false,
            circularRotation: true,
            switchSimultaneously: true,
            disableWhileAnimating: false,
            disableFadeIE: false,
            autoRotation: false,
            pauseOnHover: true,
            autoHeight: false,
            useSwipe: false,
            swipeThreshold: 15,
            switchTime: 4000,
            animSpeed: 600,
            event: 'click'
        }, options);
        this.init();
    }
    FadeGallery.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.refreshState(true);
                this.autoRotate();
                this.makeCallback('onInit', this);
            }
        },
        findElements: function () {
            // control elements
            this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
            this.slides = this.gallery.find(this.options.slides);
            this.slidesHolder = this.slides.eq(0).parent();
            this.stepsCount = this.slides.length;
            this.btnPrev = this.gallery.find(this.options.btnPrev);
            this.btnNext = this.gallery.find(this.options.btnNext);
            this.currentIndex = 0;

            // disable fade effect in old IE
            if (this.options.disableFadeIE && !$.support.opacity) {
                this.options.animSpeed = 0;
            }

            // create gallery pagination
            if (typeof this.options.generatePagination === 'string') {
                this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
                this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                for (var i = 0; i < this.stepsCount; i++) {
                    $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i + 1);
                }
                this.pagerLinks = this.pagerList.children();
            } else {
                this.pagerLinks = this.gallery.find(this.options.pagerLinks);
            }

            // get start index
            var activeSlide = this.slides.filter('.' + this.options.activeClass);
            if (activeSlide.length) {
                this.currentIndex = this.slides.index(activeSlide);
            }
            this.prevIndex = this.currentIndex;

            // autorotation control buttons
            this.btnPlay = this.gallery.find(this.options.btnPlay);
            this.btnPause = this.gallery.find(this.options.btnPause);
            this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

            // misc elements
            this.curNum = this.gallery.find(this.options.currentNumber);
            this.allNum = this.gallery.find(this.options.totalNumber);

            // handle flexible layout
            this.slides.css({ display: 'block', opacity: 0 }).eq(this.currentIndex).css({
                opacity: ''
            });
        },
        attachEvents: function () {
            var self = this;

            // flexible layout handler
            this.resizeHandler = function () {
                self.onWindowResize();
            };
            $(window).bind('load resize orientationchange', this.resizeHandler);

            if (this.btnPrev.length) {
                this.btnPrevHandler = function (e) {
                    e.preventDefault();
                    self.prevSlide();
                    if (self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.btnPrev.bind(this.options.event, this.btnPrevHandler);
            }
            if (this.btnNext.length) {
                this.btnNextHandler = function (e) {
                    e.preventDefault();
                    self.nextSlide();
                    if (self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.btnNext.bind(this.options.event, this.btnNextHandler);
            }
            if (this.pagerLinks.length) {
                this.pagerLinksHandler = function (e) {
                    e.preventDefault();
                    self.numSlide(self.pagerLinks.index(e.currentTarget));
                    if (self.options.autorotationStopAfterClick) {
                        self.stopRotation();
                    }
                };
                this.pagerLinks.bind(self.options.event, this.pagerLinksHandler);
            }

            // autorotation buttons handler
            if (this.btnPlay.length) {
                this.btnPlayHandler = function (e) {
                    e.preventDefault();
                    self.startRotation();
                };
                this.btnPlay.bind(this.options.event, this.btnPlayHandler);
            }
            if (this.btnPause.length) {
                this.btnPauseHandler = function (e) {
                    e.preventDefault();
                    self.stopRotation();
                };
                this.btnPause.bind(this.options.event, this.btnPauseHandler);
            }
            if (this.btnPlayPause.length) {
                this.btnPlayPauseHandler = function (e) {
                    e.preventDefault();
                    if (!self.gallery.hasClass(self.options.autorotationActiveClass)) {
                        self.startRotation();
                    } else {
                        self.stopRotation();
                    }
                };
                this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
            }

            // swipe gestures handler
            if (this.options.useSwipe && window.Hammer && isTouchDevice) {
                this.swipeHandler = new Hammer.Manager(this.gallery[0]);
                this.swipeHandler.add(new Hammer.Swipe({
                    direction: Hammer.DIRECTION_HORIZONTAL,
                    threshold: self.options.swipeThreshold
                }));
                this.swipeHandler.on('swipeleft', function () {
                    self.nextSlide();
                }).on('swiperight', function () {
                    self.prevSlide();
                });
            }

            // pause on hover handling
            if (this.options.pauseOnHover) {
                this.hoverHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = true;
                        self.pauseRotation();
                    }
                };
                this.leaveHandler = function () {
                    if (self.options.autoRotation) {
                        self.galleryHover = false;
                        self.resumeRotation();
                    }
                };
                this.gallery.bind({ mouseenter: this.hoverHandler, mouseleave: this.leaveHandler });
            }
        },
        onWindowResize: function () {
            if (this.options.autoHeight) {
                this.slidesHolder.css({ height: this.slides.eq(this.currentIndex).outerHeight(true) });
            }
        },
        prevSlide: function () {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                this.prevIndex = this.currentIndex;
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.switchSlide();
                } else if (this.options.circularRotation) {
                    this.currentIndex = this.stepsCount - 1;
                    this.switchSlide();
                }
            }
        },
        nextSlide: function (fromAutoRotation) {
            if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                this.prevIndex = this.currentIndex;
                if (this.currentIndex < this.stepsCount - 1) {
                    this.currentIndex++;
                    this.switchSlide();
                } else if (this.options.circularRotation || fromAutoRotation === true) {
                    this.currentIndex = 0;
                    this.switchSlide();
                }
            }
        },
        numSlide: function (c) {
            if (this.currentIndex != c) {
                this.prevIndex = this.currentIndex;
                this.currentIndex = c;
                this.switchSlide();
            }
        },
        switchSlide: function () {
            var self = this;
            if (this.slides.length > 1) {
                this.galleryAnimating = true;
                if (!this.options.animSpeed) {
                    this.slides.eq(this.prevIndex).css({ opacity: 0 });
                } else {
                    this.slides.eq(this.prevIndex).stop().animate({ opacity: 0 }, { duration: this.options.animSpeed });
                }

                this.switchNext = function () {
                    if (!self.options.animSpeed) {
                        self.slides.eq(self.currentIndex).css({ opacity: '' });
                    } else {
                        self.slides.eq(self.currentIndex).stop().animate({ opacity: 1 }, { duration: self.options.animSpeed });
                    }
                    clearTimeout(this.nextTimer);
                    this.nextTimer = setTimeout(function () {
                        self.slides.eq(self.currentIndex).css({ opacity: '' });
                        self.galleryAnimating = false;
                        self.autoRotate();

                        // onchange callback
                        self.makeCallback('onChange', self);
                    }, self.options.animSpeed);
                };

                if (this.options.switchSimultaneously) {
                    self.switchNext();
                } else {
                    clearTimeout(this.switchTimer);
                    this.switchTimer = setTimeout(function () {
                        self.switchNext();
                    }, this.options.animSpeed);
                }
                this.refreshState();

                // onchange callback
                this.makeCallback('onBeforeChange', this);
            }
        },
        refreshState: function (initial) {
            this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
            this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
            this.curNum.html(this.currentIndex + 1);
            this.allNum.html(this.stepsCount);

            // initial refresh
            if (this.options.autoHeight) {
                if (initial) {
                    this.slidesHolder.css({ height: this.slides.eq(this.currentIndex).outerHeight(true) });
                } else {
                    this.slidesHolder.stop().animate({ height: this.slides.eq(this.currentIndex).outerHeight(true) }, { duration: this.options.animSpeed });
                }
            }

            // disabled state
            if (!this.options.circularRotation) {
                this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
                if (this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
                if (this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
            }

            // add class if not enough slides
            this.gallery.toggleClass('not-enough-slides', this.stepsCount === 1);
        },
        startRotation: function () {
            this.options.autoRotation = true;
            this.galleryHover = false;
            this.autoRotationStopped = false;
            this.resumeRotation();
        },
        stopRotation: function () {
            this.galleryHover = true;
            this.autoRotationStopped = true;
            this.pauseRotation();
        },
        pauseRotation: function () {
            this.gallery.addClass(this.options.autorotationDisabledClass);
            this.gallery.removeClass(this.options.autorotationActiveClass);
            clearTimeout(this.timer);
        },
        resumeRotation: function () {
            if (!this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.gallery.removeClass(this.options.autorotationDisabledClass);
                this.autoRotate();
            }
        },
        autoRotate: function () {
            var self = this;
            clearTimeout(this.timer);
            if (this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
                this.gallery.addClass(this.options.autorotationActiveClass);
                this.timer = setTimeout(function () {
                    self.nextSlide(true);
                }, this.options.switchTime);
            } else {
                this.pauseRotation();
            }
        },
        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            // navigation buttons handler
            this.btnPrev.unbind(this.options.event, this.btnPrevHandler);
            this.btnNext.unbind(this.options.event, this.btnNextHandler);
            this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
            $(window).unbind('load resize orientationchange', this.resizeHandler);

            // remove autorotation handlers
            this.stopRotation();
            this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
            this.btnPause.unbind(this.options.event, this.btnPauseHandler);
            this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);
            this.gallery.unbind('mouseenter', this.hoverHandler);
            this.gallery.unbind('mouseleave', this.leaveHandler);

            // remove swipe handler if used
            if (this.swipeHandler) {
                this.swipeHandler.destroy();
            }
            if (typeof this.options.generatePagination === 'string') {
                this.pagerHolder.empty();
            }

            // remove unneeded classes and styles
            var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
            this.gallery.removeClass(unneededClasses.join(' '));
            this.slidesHolder.add(this.slides).removeAttr('style');
        }
    };

    // detect device type
    var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

    // jquery plugin
    $.fn.fadeGallery = function (opt) {
        return this.each(function () {
            $(this).data('FadeGallery', new FadeGallery($.extend(opt, { holder: this })));
        });
    };
}(jQuery));

/*
 * Simple Mobile Navigation
 */
; (function ($) {
    function MobileNav(options) {
        this.options = $.extend({
            container: null,
            hideOnClickOutside: false,
            menuActiveClass: 'nav-active',
            menuOpener: '.nav-opener',
            menuDrop: '.nav-drop',
            toggleEvent: 'click',
            outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
        }, options);
        this.initStructure();
        this.attachEvents();
    }
    MobileNav.prototype = {
        initStructure: function () {
            this.page = $('html');
            this.container = $(this.options.container);
            this.opener = this.container.find(this.options.menuOpener);
            this.drop = this.container.find(this.options.menuDrop);
        },
        attachEvents: function () {
            var self = this;

            if (activateResizeHandler) {
                activateResizeHandler();
                activateResizeHandler = null;
            }

            this.outsideClickHandler = function (e) {
                if (self.isOpened()) {
                    var target = $(e.target);
                    if (!target.closest(self.opener).length && !target.closest(self.drop).length) {
                        self.hide();
                    }
                }
            };

            this.openerClickHandler = function (e) {
                e.preventDefault();
                self.toggle();
            };

            this.opener.on(this.options.toggleEvent, this.openerClickHandler);
        },
        isOpened: function () {
            return this.container.hasClass(this.options.menuActiveClass);
        },
        show: function () {
            this.container.addClass(this.options.menuActiveClass);
            if (this.options.hideOnClickOutside) {
                this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
            }
        },
        hide: function () {
            this.container.removeClass(this.options.menuActiveClass);
            if (this.options.hideOnClickOutside) {
                this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
            }
        },
        toggle: function () {
            if (this.isOpened()) {
                this.hide();
            } else {
                this.show();
            }
        },
        destroy: function () {
            this.container.removeClass(this.options.menuActiveClass);
            this.opener.off(this.options.toggleEvent, this.clickHandler);
            this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
    };

    var activateResizeHandler = function () {
        var win = $(window),
            doc = $('html'),
            resizeClass = 'resize-active',
            flag, timer;
        var removeClassHandler = function () {
            flag = false;
            doc.removeClass(resizeClass);
        };
        var resizeHandler = function () {
            if (!flag) {
                flag = true;
                doc.addClass(resizeClass);
            }
            clearTimeout(timer);
            timer = setTimeout(removeClassHandler, 500);
        };
        win.on('resize orientationchange', resizeHandler);
    };

    $.fn.mobileNav = function (options) {
        return this.each(function () {
            var params = $.extend({}, options, { container: this }),
                instance = new MobileNav(params);
            $.data(this, 'MobileNav', instance);
        });
    };
}(jQuery));

/*
 * jQuery retina cover plugin
 */
; (function ($) {
    'use strict';

    var styleRules = {};
    var templates = {
        '2x': [
            '(-webkit-min-device-pixel-ratio: 1.5)',
            '(min-resolution: 192dpi)',
            '(min-device-pixel-ratio: 1.5)',
            '(min-resolution: 1.5dppx)'
        ],
        '3x': [
            '(-webkit-min-device-pixel-ratio: 3)',
            '(min-resolution: 384dpi)',
            '(min-device-pixel-ratio: 3)',
            '(min-resolution: 3dppx)'
        ]
    };

    function addSimple(imageSrc, media, id) {
        var style = buildRule(id, imageSrc);

        addRule(media, style);
    }

    function addRetina(imageData, media, id) {
        var currentRules = templates[imageData[1]].slice();
        var patchedRules = currentRules;
        var style = buildRule(id, imageData[0]);

        if (media !== 'default') {
            patchedRules = $.map(currentRules, function (ele, i) {
                return ele + ' and ' + media;
            });
        }

        media = patchedRules.join(',');

        addRule(media, style);
    }

    function buildRule(id, src) {
        return '#' + id + '{background-image: url("' + src + '");}';
    }

    function addRule(media, rule) {
        var $styleTag = styleRules[media];
        var styleTagData;
        var rules = '';

        if (media === 'default') {
            rules = rule + ' ';
        } else {
            rules = '@media ' + media + '{' + rule + '}';
        }

        if (!$styleTag) {
            styleRules[media] = $('<style>').text(rules).appendTo('head');
        } else {
            styleTagData = $styleTag.text();
            styleTagData = styleTagData.substring(0, styleTagData.length - 2) + ' }' + rule + '}';
            $styleTag.text(styleTagData);
        }
    }

    $.fn.retinaCover = function () {
        return this.each(function () {
            var $block = $(this);
            var $items = $block.children('[data-srcset]');
            var id = 'bg-stretch' + Date.now() + (Math.random() * 1000).toFixed(0);

            if ($items.length) {
                $block.attr('id', id);

                $items.each(function () {
                    var $item = $(this);
                    var data = $item.data('srcset').split(', ');
                    var media = $item.data('media') || 'default';
                    var dataLength = data.length;
                    var itemData;
                    var i;

                    for (i = 0; i < dataLength; i++) {
                        itemData = data[i].split(' ');

                        if (itemData.length === 1) {
                            addSimple(itemData[0], media, id);
                        } else {
                            addRetina(itemData, media, id);
                        }
                    }
                });
            }

            $items.detach();
        });
    };
}(jQuery));

/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function (a) { var b = navigator.userAgent; a.HTMLPictureElement && /ecko/.test(b) && b.match(/rv\:(\d+)/) && RegExp.$1 < 41 && addEventListener("resize", function () { var b, c = document.createElement("source"), d = function (a) { var b, d, e = a.parentNode; "PICTURE" === e.nodeName.toUpperCase() ? (b = c.cloneNode(), e.insertBefore(b, e.firstElementChild), setTimeout(function () { e.removeChild(b) })) : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) && (a._pfLastSize = a.offsetWidth, d = a.sizes, a.sizes += ",100vw", setTimeout(function () { a.sizes = d })) }, e = function () { var a, b = document.querySelectorAll("picture > img, img[srcset][sizes]"); for (a = 0; a < b.length; a++) d(b[a]) }, f = function () { clearTimeout(b), b = setTimeout(e, 99) }, g = a.matchMedia && matchMedia("(orientation: landscape)"), h = function () { f(), g && g.addListener && g.addListener(f) }; return c.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? h() : document.addEventListener("DOMContentLoaded", h), f }()) }(window), function (a, b, c) { "use strict"; function d(a) { return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a } function e(b, c) { var d = new a.Image; return d.onerror = function () { z[b] = !1, aa() }, d.onload = function () { z[b] = 1 === d.width, aa() }, d.src = c, "pending" } function f() { L = !1, O = a.devicePixelRatio, M = {}, N = {}, s.DPR = O || 1, P.width = Math.max(a.innerWidth || 0, y.clientWidth), P.height = Math.max(a.innerHeight || 0, y.clientHeight), P.vw = P.width / 100, P.vh = P.height / 100, r = [P.height, P.width, O].join("-"), P.em = s.getEmValue(), P.rem = P.em } function g(a, b, c, d) { var e, f, g, h; return "saveData" === A.algorithm ? a > 2.7 ? h = c + 1 : (f = b - c, e = Math.pow(a - .6, 1.5), g = f * e, d && (g += .1 * e), h = a + g) : h = c > 1 ? Math.sqrt(a * b) : a, h > c } function h(a) { var b, c = s.getSet(a), d = !1; "pending" !== c && (d = r, c && (b = s.setRes(c), s.applySetCandidate(b, a))), a[s.ns].evaled = d } function i(a, b) { return a.res - b.res } function j(a, b, c) { var d; return !c && b && (c = a[s.ns].sets, c = c && c[c.length - 1]), d = k(b, c), d && (b = s.makeUrl(b), a[s.ns].curSrc = b, a[s.ns].curCan = d, d.res || _(d, d.set.sizes)), d } function k(a, b) { var c, d, e; if (a && b) for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++) if (a === s.makeUrl(e[c].url)) { d = e[c]; break } return d } function l(a, b) { var c, d, e, f, g = a.getElementsByTagName("source"); for (c = 0, d = g.length; d > c; c++) e = g[c], e[s.ns] = !0, f = e.getAttribute("srcset"), f && b.push({ srcset: f, media: e.getAttribute("media"), type: e.getAttribute("type"), sizes: e.getAttribute("sizes") }) } function m(a, b) { function c(b) { var c, d = b.exec(a.substring(m)); return d ? (c = d[0], m += c.length, c) : void 0 } function e() { var a, c, d, e, f, i, j, k, l, m = !1, o = {}; for (e = 0; e < h.length; e++) f = h[e], i = f[f.length - 1], j = f.substring(0, f.length - 1), k = parseInt(j, 10), l = parseFloat(j), W.test(j) && "w" === i ? ((a || c) && (m = !0), 0 === k ? m = !0 : a = k) : X.test(j) && "x" === i ? ((a || c || d) && (m = !0), 0 > l ? m = !0 : c = l) : W.test(j) && "h" === i ? ((d || c) && (m = !0), 0 === k ? m = !0 : d = k) : m = !0; m || (o.url = g, a && (o.w = a), c && (o.d = c), d && (o.h = d), d || c || a || (o.d = 1), 1 === o.d && (b.has1x = !0), o.set = b, n.push(o)) } function f() { for (c(S), i = "", j = "in descriptor"; ;) { if (k = a.charAt(m), "in descriptor" === j) if (d(k)) i && (h.push(i), i = "", j = "after descriptor"); else { if ("," === k) return m += 1, i && h.push(i), void e(); if ("(" === k) i += k, j = "in parens"; else { if ("" === k) return i && h.push(i), void e(); i += k } } else if ("in parens" === j) if (")" === k) i += k, j = "in descriptor"; else { if ("" === k) return h.push(i), void e(); i += k } else if ("after descriptor" === j) if (d(k)); else { if ("" === k) return void e(); j = "in descriptor", m -= 1 } m += 1 } } for (var g, h, i, j, k, l = a.length, m = 0, n = []; ;) { if (c(T), m >= l) return n; g = c(U), h = [], "," === g.slice(-1) ? (g = g.replace(V, ""), e()) : f() } } function n(a) { function b(a) { function b() { f && (g.push(f), f = "") } function c() { g[0] && (h.push(g), g = []) } for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ;) { if (e = a.charAt(j), "" === e) return b(), c(), h; if (k) { if ("*" === e && "/" === a[j + 1]) { k = !1, j += 2, b(); continue } j += 1 } else { if (d(e)) { if (a.charAt(j - 1) && d(a.charAt(j - 1)) || !f) { j += 1; continue } if (0 === i) { b(), j += 1; continue } e = " " } else if ("(" === e) i += 1; else if (")" === e) i -= 1; else { if ("," === e) { b(), c(), j += 1; continue } if ("/" === e && "*" === a.charAt(j + 1)) { k = !0, j += 2; continue } } f += e, j += 1 } } } function c(a) { return k.test(a) && parseFloat(a) >= 0 ? !0 : l.test(a) ? !0 : "0" === a || "-0" === a || "+0" === a ? !0 : !1 } var e, f, g, h, i, j, k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i; for (f = b(a), g = f.length, e = 0; g > e; e++) if (h = f[e], i = h[h.length - 1], c(i)) { if (j = i, h.pop(), 0 === h.length) return j; if (h = h.join(" "), s.matchesMedia(h)) return j } return "100vw" } b.createElement("picture"); var o, p, q, r, s = {}, t = function () { }, u = b.createElement("img"), v = u.getAttribute, w = u.setAttribute, x = u.removeAttribute, y = b.documentElement, z = {}, A = { algorithm: "" }, B = "data-pfsrc", C = B + "set", D = navigator.userAgent, E = /rident/.test(D) || /ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35, F = "currentSrc", G = /\s+\+?\d+(e\d+)?w/, H = /(\([^)]+\))?\s*(.+)/, I = a.picturefillCFG, J = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", K = "font-size:100%!important;", L = !0, M = {}, N = {}, O = a.devicePixelRatio, P = { px: 1, "in": 96 }, Q = b.createElement("a"), R = !1, S = /^[ \t\n\r\u000c]+/, T = /^[, \t\n\r\u000c]+/, U = /^[^ \t\n\r\u000c]+/, V = /[,]+$/, W = /^\d+$/, X = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, Y = function (a, b, c, d) { a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c) }, Z = function (a) { var b = {}; return function (c) { return c in b || (b[c] = a(c)), b[c] } }, $ = function () { var a = /^([\d\.]+)(em|vw|px)$/, b = function () { for (var a = arguments, b = 0, c = a[0]; ++b in a;) c = c.replace(a[b], a[++b]); return c }, c = Z(function (a) { return "return " + b((a || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";" }); return function (b, d) { var e; if (!(b in M)) if (M[b] = !1, d && (e = b.match(a))) M[b] = e[1] * P[e[2]]; else try { M[b] = new Function("e", c(b))(P) } catch (f) { } return M[b] } }(), _ = function (a, b) { return a.w ? (a.cWidth = s.calcListLength(b || "100vw"), a.res = a.w / a.cWidth) : a.res = a.d, a }, aa = function (a) { var c, d, e, f = a || {}; if (f.elements && 1 === f.elements.nodeType && ("IMG" === f.elements.nodeName.toUpperCase() ? f.elements = [f.elements] : (f.context = f.elements, f.elements = null)), c = f.elements || s.qsa(f.context || b, f.reevaluate || f.reselect ? s.sel : s.selShort), e = c.length) { for (s.setupRun(f), R = !0, d = 0; e > d; d++) s.fillImg(c[d], f); s.teardownRun(f) } }; o = a.console && console.warn ? function (a) { console.warn(a) } : t, F in u || (F = "src"), z["image/jpeg"] = !0, z["image/gif"] = !0, z["image/png"] = !0, z["image/svg+xml"] = b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"), s.ns = ("pf" + (new Date).getTime()).substr(0, 9), s.supSrcset = "srcset" in u, s.supSizes = "sizes" in u, s.supPicture = !!a.HTMLPictureElement, s.supSrcset && s.supPicture && !s.supSizes && !function (a) { u.srcset = "data:,a", a.src = "data:,a", s.supSrcset = u.complete === a.complete, s.supPicture = s.supSrcset && s.supPicture }(b.createElement("img")), s.selShort = "picture>img,img[srcset]", s.sel = s.selShort, s.cfg = A, s.supSrcset && (s.sel += ",img[" + C + "]"), s.DPR = O || 1, s.u = P, s.types = z, q = s.supSrcset && !s.supSizes, s.setSize = t, s.makeUrl = Z(function (a) { return Q.href = a, Q.href }), s.qsa = function (a, b) { return a.querySelectorAll(b) }, s.matchesMedia = function () { return a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? s.matchesMedia = function (a) { return !a || matchMedia(a).matches } : s.matchesMedia = s.mMQ, s.matchesMedia.apply(this, arguments) }, s.mMQ = function (a) { return a ? $(a) : !0 }, s.calcLength = function (a) { var b = $(a, !0) || !1; return 0 > b && (b = !1), b }, s.supportsType = function (a) { return a ? z[a] : !0 }, s.parseSize = Z(function (a) { var b = (a || "").match(H); return { media: b && b[1], length: b && b[2] } }), s.parseSet = function (a) { return a.cands || (a.cands = m(a.srcset, a)), a.cands }, s.getEmValue = function () { var a; if (!p && (a = b.body)) { var c = b.createElement("div"), d = y.style.cssText, e = a.style.cssText; c.style.cssText = J, y.style.cssText = K, a.style.cssText = K, a.appendChild(c), p = c.offsetWidth, a.removeChild(c), p = parseFloat(p, 10), y.style.cssText = d, a.style.cssText = e } return p || 16 }, s.calcListLength = function (a) { if (!(a in N) || A.uT) { var b = s.calcLength(n(a)); N[a] = b ? b : P.width } return N[a] }, s.setRes = function (a) { var b; if (a) { b = s.parseSet(a); for (var c = 0, d = b.length; d > c; c++) _(b[c], a.sizes) } return b }, s.setRes.res = _, s.applySetCandidate = function (a, b) { if (a.length) { var c, d, e, f, h, k, l, m, n, o = b[s.ns], p = s.DPR; if (k = o.curSrc || b[F], l = o.curCan || j(b, k, a[0].set), l && l.set === a[0].set && (n = E && !b.complete && l.res - .1 > p, n || (l.cached = !0, l.res >= p && (h = l))), !h) for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++) if (c = a[d], c.res >= p) { e = d - 1, h = a[e] && (n || k !== s.makeUrl(c.url)) && g(a[e].res, c.res, p, a[e].cached) ? a[e] : c; break } h && (m = s.makeUrl(h.url), o.curSrc = m, o.curCan = h, m !== k && s.setSrc(b, h), s.setSize(b)) } }, s.setSrc = function (a, b) { var c; a.src = b.url, "image/svg+xml" === b.set.type && (c = a.style.width, a.style.width = a.offsetWidth + 1 + "px", a.offsetWidth + 1 && (a.style.width = c)) }, s.getSet = function (a) { var b, c, d, e = !1, f = a[s.ns].sets; for (b = 0; b < f.length && !e; b++) if (c = f[b], c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type))) { "pending" === d && (c = d), e = c; break } return e }, s.parseSets = function (a, b, d) { var e, f, g, h, i = b && "PICTURE" === b.nodeName.toUpperCase(), j = a[s.ns]; (j.src === c || d.src) && (j.src = v.call(a, "src"), j.src ? w.call(a, B, j.src) : x.call(a, B)), (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) && (e = v.call(a, "srcset"), j.srcset = e, h = !0), j.sets = [], i && (j.pic = !0, l(b, j.sets)), j.srcset ? (f = { srcset: j.srcset, sizes: v.call(a, "sizes") }, j.sets.push(f), g = (q || j.src) && G.test(j.srcset || ""), g || !j.src || k(j.src, f) || f.has1x || (f.srcset += ", " + j.src, f.cands.push({ url: j.src, d: 1, set: f }))) : j.src && j.sets.push({ srcset: j.src, sizes: null }), j.curCan = null, j.curSrc = c, j.supported = !(i || f && !s.supSrcset || g), h && s.supSrcset && !j.supported && (e ? (w.call(a, C, e), a.srcset = "") : x.call(a, C)), j.supported && !j.srcset && (!j.src && a.src || a.src !== s.makeUrl(j.src)) && (null === j.src ? a.removeAttribute("src") : a.src = j.src), j.parsed = !0 }, s.fillImg = function (a, b) { var c, d = b.reselect || b.reevaluate; a[s.ns] || (a[s.ns] = {}), c = a[s.ns], (d || c.evaled !== r) && ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b), c.supported ? c.evaled = r : h(a)) }, s.setupRun = function () { (!R || L || O !== a.devicePixelRatio) && f() }, s.supPicture ? (aa = t, s.fillImg = t) : !function () { var c, d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/, e = function () { var a = b.readyState || ""; f = setTimeout(e, "loading" === a ? 200 : 999), b.body && (s.fillImgs(), c = c || d.test(a), c && clearTimeout(f)) }, f = setTimeout(e, b.body ? 9 : 99), g = function (a, b) { var c, d, e = function () { var f = new Date - d; b > f ? c = setTimeout(e, b - f) : (c = null, a()) }; return function () { d = new Date, c || (c = setTimeout(e, b)) } }, h = y.clientHeight, i = function () { L = Math.max(a.innerWidth || 0, y.clientWidth) !== P.width || y.clientHeight !== h, h = y.clientHeight, L && s.fillImgs() }; Y(a, "resize", g(i, 99)), Y(b, "readystatechange", e) }(), s.picturefill = aa, s.fillImgs = aa, s.teardownRun = t, aa._ = s, a.picturefillCFG = { pf: s, push: function (a) { var b = a.shift(); "function" == typeof s[b] ? s[b].apply(s, a) : (A[b] = a[0], R && s.fillImgs({ reselect: !0 })) } }; for (; I && I.length;) a.picturefillCFG.push(I.shift()); a.picturefill = aa, "object" == typeof module && "object" == typeof module.exports ? module.exports = aa : "function" == typeof define && define.amd && define("picturefill", function () { return aa }), s.supPicture || (z["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==")) }(window, document);

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
if (Object.create) { !function (a, b, c, d) { "use strict"; function e(a, b, c) { return setTimeout(k(a, c), b) } function f(a, b, c) { return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 } function g(a, b, c) { var e; if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) } function h(a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a } function i(a, b) { return h(a, b, !0) } function j(a, b, c) { var d, e = b.prototype; d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c) } function k(a, b) { return function () { return a.apply(b, arguments) } } function l(a, b) { return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a } function m(a, b) { return a === d ? b : a } function n(a, b, c) { g(r(b), function (b) { a.addEventListener(b, c, !1) }) } function o(a, b, c) { g(r(b), function (b) { a.removeEventListener(b, c, !1) }) } function p(a, b) { for (; a;) { if (a == b) return !0; a = a.parentNode } return !1 } function q(a, b) { return a.indexOf(b) > -1 } function r(a) { return a.trim().split(/\s+/g) } function s(a, b, c) { if (a.indexOf && !c) return a.indexOf(b); for (var d = 0; d < a.length;) { if (c && a[d][c] == b || !c && a[d] === b) return d; d++ } return -1 } function t(a) { return Array.prototype.slice.call(a, 0) } function u(a, b, c) { for (var d = [], e = [], f = 0; f < a.length;) { var g = b ? a[f][b] : a[f]; s(e, g) < 0 && d.push(a[f]), e[f] = g, f++ } return c && (d = b ? d.sort(function (a, c) { return a[b] > c[b] }) : d.sort()), d } function v(a, b) { for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length;) { if (c = ib[g], e = c ? c + f : b, e in a) return e; g++ } return d } function w() { return ob++ } function x(a) { var b = a.ownerDocument; return b.defaultView || b.parentWindow } function y(a, b) { var c = this; this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) { l(a.options.enable, [a]) && c.handler(b) }, this.init() } function z(a) { var b, c = a.options.inputClass; return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A) } function A(a, b, c) { var d = c.pointers.length, e = c.changedPointers.length, f = b & yb && d - e === 0, g = b & (Ab | Bb) && d - e === 0; c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c } function B(a, b) { var c = a.session, d = b.pointers, e = d.length; c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1); var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = F(d); b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b); var j = a.element; p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j } function C(a, b) { var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {}; (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) } function D(a, b) { var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp; if (b.eventType != Bb && (i > xb || h.velocity === d)) { var j = h.deltaX - b.deltaX, k = h.deltaY - b.deltaY, l = G(i, j, k); e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction; b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g } function E(a) { for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: lb(a.pointers[c].clientX), clientY: lb(a.pointers[c].clientY) }, c++; return { timeStamp: nb(), pointers: b, center: F(b), deltaX: a.deltaX, deltaY: a.deltaY } } function F(a) { var b = a.length; if (1 === b) return { x: lb(a[0].clientX), y: lb(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++; return { x: lb(c / b), y: lb(d / b) } } function G(a, b, c) { return { x: b / a || 0, y: c / a || 0 } } function H(a, b) { return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb } function I(a, b, c) { c || (c = Kb); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return Math.sqrt(d * d + e * e) } function J(a, b, c) { c || (c = Kb); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return 180 * Math.atan2(e, d) / Math.PI } function K(a, b) { return J(b[1], b[0], Lb) - J(a[1], a[0], Lb) } function L(a, b) { return I(b[0], b[1], Lb) / I(a[0], a[1], Lb) } function M() { this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments) } function N() { this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] } function O() { this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments) } function P(a, b) { var c = t(a.touches), d = t(a.changedTouches); return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [c, d] } function Q() { this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments) } function R(a, b) { var c = t(a.touches), d = this.targetIds; if (b & (yb | zb) && 1 === c.length) return d[c[0].identifier] = !0, [c, c]; var e, f, g = t(a.changedTouches), h = [], i = this.target; if (f = c.filter(function (a) { return p(a.target, i) }), b === yb) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++; for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], e++; return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0 } function S() { y.apply(this, arguments); var a = k(this.handler, this); this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a) } function T(a, b) { this.manager = a, this.set(b) } function U(a) { if (q(a, bc)) return bc; var b = q(a, cc), c = q(a, dc); return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b } function V(a) { this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = ec, this.simultaneous = {}, this.requireFail = [] } function W(a) { return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : "" } function X(a) { return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : "" } function Y(a, b) { var c = b.manager; return c ? c.get(a) : a } function Z() { V.apply(this, arguments) } function $() { Z.apply(this, arguments), this.pX = null, this.pY = null } function _() { Z.apply(this, arguments) } function ab() { V.apply(this, arguments), this._timer = null, this._input = null } function bb() { Z.apply(this, arguments) } function cb() { Z.apply(this, arguments) } function db() { V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 } function eb(a, b) { return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b) } function fb(a, b) { b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), gb(this, !0), g(b.recognizers, function (a) { var b = this.add(new a[0](a[1])); a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) } function gb(a, b) { var c = a.element; g(a.options.cssProps, function (a, d) { c.style[v(c.style, d)] = b ? a : "" }) } function hb(a, c) { var d = b.createEvent("Event"); d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) } var ib = ["", "webkit", "moz", "MS", "ms", "o"], jb = b.createElement("div"), kb = "function", lb = Math.round, mb = Math.abs, nb = Date.now, ob = 1, pb = /mobile|tablet|ip(ad|hone|od)|android/i, qb = "ontouchstart" in a, rb = v(a, "PointerEvent") !== d, sb = qb && pb.test(navigator.userAgent), tb = "touch", ub = "pen", vb = "mouse", wb = "kinect", xb = 25, yb = 1, zb = 2, Ab = 4, Bb = 8, Cb = 1, Db = 2, Eb = 4, Fb = 8, Gb = 16, Hb = Db | Eb, Ib = Fb | Gb, Jb = Hb | Ib, Kb = ["x", "y"], Lb = ["clientX", "clientY"]; y.prototype = { handler: function () { }, init: function () { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler) }, destroy: function () { this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler) } }; var Mb = { mousedown: yb, mousemove: zb, mouseup: Ab }, Nb = "mousedown", Ob = "mousemove mouseup"; j(M, y, { handler: function (a) { var b = Mb[a.type]; b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: vb, srcEvent: a })) } }); var Pb = { pointerdown: yb, pointermove: zb, pointerup: Ab, pointercancel: Bb, pointerout: Bb }, Qb = { 2: tb, 3: ub, 4: vb, 5: wb }, Rb = "pointerdown", Sb = "pointermove pointerup pointercancel"; a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, { handler: function (a) { var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Pb[d], f = Qb[a.pointerType] || a.pointerType, g = f == tb, h = s(b, a.pointerId, "pointerId"); e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } }); var Tb = { touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb }, Ub = "touchstart", Vb = "touchstart touchmove touchend touchcancel"; j(O, y, { handler: function (a) { var b = Tb[a.type]; if (b === yb && (this.started = !0), this.started) { var c = P.call(this, a, b); b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: tb, srcEvent: a }) } } }); var Wb = { touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb }, Xb = "touchstart touchmove touchend touchcancel"; j(Q, y, { handler: function (a) { var b = Wb[a.type], c = R.call(this, a, b); c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: tb, srcEvent: a }) } }), j(S, y, { handler: function (a, b, c) { var d = c.pointerType == tb, e = c.pointerType == vb; if (d) this.mouse.allow = !1; else if (e && !this.mouse.allow) return; b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c) }, destroy: function () { this.touch.destroy(), this.mouse.destroy() } }); var Yb = v(jb.style, "touchAction"), Zb = Yb !== d, $b = "compute", _b = "auto", ac = "manipulation", bc = "none", cc = "pan-x", dc = "pan-y"; T.prototype = { set: function (a) { a == $b && (a = this.compute()), Zb && (this.manager.element.style[Yb] = a), this.actions = a.toLowerCase().trim() }, update: function () { this.set(this.manager.options.touchAction) }, compute: function () { var a = []; return g(this.manager.recognizers, function (b) { l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), U(a.join(" ")) }, preventDefaults: function (a) { if (!Zb) { var b = a.srcEvent, c = a.offsetDirection; if (this.manager.session.prevented) return void b.preventDefault(); var d = this.actions, e = q(d, bc), f = q(d, dc), g = q(d, cc); return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0 } }, preventSrc: function (a) { this.manager.session.prevented = !0, a.preventDefault() } }; var ec = 1, fc = 2, gc = 4, hc = 8, ic = hc, jc = 16, kc = 32; V.prototype = { defaults: {}, set: function (a) { return h(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function (a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function (a) { return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function (a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function (a) { if (f(a, "dropRequireFailure", this)) return this; a = Y(a, this); var b = s(this.requireFail, a); return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function () { return this.requireFail.length > 0 }, canRecognizeWith: function (a) { return !!this.simultaneous[a.id] }, emit: function (a) { function b(b) { c.manager.emit(c.options.event + (b ? W(d) : ""), a) } var c = this, d = this.state; hc > d && b(!0), b(), d >= hc && b(!0) }, tryEmit: function (a) { return this.canEmit() ? this.emit(a) : void (this.state = kc) }, canEmit: function () { for (var a = 0; a < this.requireFail.length;) { if (!(this.requireFail[a].state & (kc | ec))) return !1; a++ } return !0 }, recognize: function (a) { var b = h({}, a); return l(this.options.enable, [this, b]) ? (this.state & (ic | jc | kc) && (this.state = ec), this.state = this.process(b), void (this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), void (this.state = kc)) }, process: function () { }, getTouchAction: function () { }, reset: function () { } }, j(Z, V, { defaults: { pointers: 1 }, attrTest: function (a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b }, process: function (a) { var b = this.state, c = a.eventType, d = b & (fc | gc), e = this.attrTest(a); return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc } }), j($, Z, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Jb }, getTouchAction: function () { var a = this.options.direction, b = []; return a & Hb && b.push(dc), a & Ib && b.push(cc), b }, directionTest: function (a) { var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY; return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function (a) { return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a)) }, emit: function (a) { this.pX = a.deltaX, this.pY = a.deltaY; var b = X(a.direction); b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a) } }), j(_, Z, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () { return [bc] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc) }, emit: function (a) { if (this._super.emit.call(this, a), 1 !== a.scale) { var b = a.scale < 1 ? "in" : "out"; this.manager.emit(this.options.event + b, a) } } }), j(ab, V, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function () { return [_b] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time; if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f) this.reset(); else if (a.eventType & yb) this.reset(), this._timer = e(function () { this.state = ic, this.tryEmit() }, b.time, this); else if (a.eventType & Ab) return ic; return kc }, reset: function () { clearTimeout(this._timer) }, emit: function (a) { this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), this.manager.emit(this.options.event, this._input))) } }), j(bb, Z, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () { return [bc] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc) } }), j(cb, Z, { defaults: { event: "swipe", threshold: 10, velocity: .65, direction: Hb | Ib, pointers: 1 }, getTouchAction: function () { return $.prototype.getTouchAction.call(this) }, attrTest: function (a) { var b, c = this.options.direction; return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab }, emit: function (a) { var b = X(a.direction); b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), j(db, V, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function () { return [ac] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time; if (this.reset(), a.eventType & yb && 0 === this.count) return this.failTimeout(); if (d && f && c) { if (a.eventType != Ab) return this.failTimeout(); var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold; this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a; var i = this.count % b.taps; if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () { this.state = ic, this.tryEmit() }, b.interval, this), fc) : ic } return kc }, failTimeout: function () { return this._timer = e(function () { this.state = kc }, this.options.interval, this), kc }, reset: function () { clearTimeout(this._timer) }, emit: function () { this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), eb.VERSION = "2.0.4", eb.defaults = { domEvents: !1, touchAction: $b, enable: !0, inputTarget: null, inputClass: null, preset: [[bb, { enable: !1 }], [_, { enable: !1 }, ["rotate"]], [cb, { direction: Hb }], [$, { direction: Hb }, ["swipe"]], [db], [db, { event: "doubletap", taps: 2 }, ["tap"]], [ab]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } }; var lc = 1, mc = 2; fb.prototype = { set: function (a) { return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function (a) { this.session.stopped = a ? mc : lc }, recognize: function (a) { var b = this.session; if (!b.stopped) { this.touchAction.preventDefaults(a); var c, d = this.recognizers, e = b.curRecognizer; (!e || e && e.state & ic) && (e = b.curRecognizer = null); for (var f = 0; f < d.length;) c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++ } }, get: function (a) { if (a instanceof V) return a; for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c]; return null }, add: function (a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function (a) { if (f(a, "remove", this)) return this; var b = this.recognizers; return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this }, on: function (a, b) { var c = this.handlers; return g(r(a), function (a) { c[a] = c[a] || [], c[a].push(b) }), this }, off: function (a, b) { var c = this.handlers; return g(r(a), function (a) { b ? c[a].splice(s(c[a], b), 1) : delete c[a] }), this }, emit: function (a, b) { this.options.domEvents && hb(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function () { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;) c[d](b), d++ } }, destroy: function () { this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, h(eb, { INPUT_START: yb, INPUT_MOVE: zb, INPUT_END: Ab, INPUT_CANCEL: Bb, STATE_POSSIBLE: ec, STATE_BEGAN: fc, STATE_CHANGED: gc, STATE_ENDED: hc, STATE_RECOGNIZED: ic, STATE_CANCELLED: jc, STATE_FAILED: kc, DIRECTION_NONE: Cb, DIRECTION_LEFT: Db, DIRECTION_RIGHT: Eb, DIRECTION_UP: Fb, DIRECTION_DOWN: Gb, DIRECTION_HORIZONTAL: Hb, DIRECTION_VERTICAL: Ib, DIRECTION_ALL: Jb, Manager: fb, Input: y, TouchAction: T, TouchInput: Q, MouseInput: M, PointerEventInput: N, TouchMouseInput: S, SingleTouchInput: O, Recognizer: V, AttrRecognizer: Z, Tap: db, Pan: $, Swipe: cb, Pinch: _, Rotate: bb, Press: ab, on: n, off: o, each: g, merge: i, extend: h, inherit: j, bindFn: k, prefixed: v }), typeof define == kb && define.amd ? define(function () { return eb }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb }(window, document, "Hammer"); }


/*!
 DataTables 1.10.15
 ©2008-2017 SpryMedia Ltd - datatables.net/license
*/
(function (h) { "function" === typeof define && define.amd ? define(["jquery"], function (E) { return h(E, window, document) }) : "object" === typeof exports ? module.exports = function (E, H) { E || (E = window); H || (H = "undefined" !== typeof window ? require("jquery") : require("jquery")(E)); return h(H, E, E.document) } : h(jQuery, window, document) })(function (h, E, H, k) {
    function Y(a) {
        var b, c, d = {}; h.each(a, function (e) {
            if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ")) c = e.replace(b[0], b[2].toLowerCase()),
                d[c] = e, "o" === b[1] && Y(a[e])
        }); a._hungarianMap = d
    } function J(a, b, c) { a._hungarianMap || Y(a); var d; h.each(b, function (e) { d = a._hungarianMap[e]; if (d !== k && (c || b[d] === k)) "o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), J(a[d], b[d], c)) : b[d] = b[e] }) } function Fa(a) {
        var b = m.defaults.oLanguage, c = a.sZeroRecords; !a.sEmptyTable && (c && "No data available in table" === b.sEmptyTable) && F(a, a, "sZeroRecords", "sEmptyTable"); !a.sLoadingRecords && (c && "Loading..." === b.sLoadingRecords) && F(a, a, "sZeroRecords", "sLoadingRecords");
        a.sInfoThousands && (a.sThousands = a.sInfoThousands); (a = a.sDecimal) && fb(a)
    } function gb(a) {
        A(a, "ordering", "bSort"); A(a, "orderMulti", "bSortMulti"); A(a, "orderClasses", "bSortClasses"); A(a, "orderCellsTop", "bSortCellsTop"); A(a, "order", "aaSorting"); A(a, "orderFixed", "aaSortingFixed"); A(a, "paging", "bPaginate"); A(a, "pagingType", "sPaginationType"); A(a, "pageLength", "iDisplayLength"); A(a, "searching", "bFilter"); "boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : ""); "boolean" === typeof a.scrollX && (a.scrollX =
            a.scrollX ? "100%" : ""); if (a = a.aoSearchCols) for (var b = 0, c = a.length; b < c; b++) a[b] && J(m.models.oSearch, a[b])
    } function hb(a) { A(a, "orderable", "bSortable"); A(a, "orderData", "aDataSort"); A(a, "orderSequence", "asSorting"); A(a, "orderDataType", "sortDataType"); var b = a.aDataSort; "number" === typeof b && !h.isArray(b) && (a.aDataSort = [b]) } function ib(a) {
        if (!m.__browser) {
            var b = {}; m.__browser = b; var c = h("<div/>").css({ position: "fixed", top: 0, left: -1 * h(E).scrollLeft(), height: 1, width: 1, overflow: "hidden" }).append(h("<div/>").css({
                position: "absolute",
                top: 1, left: 1, width: 100, overflow: "scroll"
            }).append(h("<div/>").css({ width: "100%", height: 10 }))).appendTo("body"), d = c.children(), e = d.children(); b.barWidth = d[0].offsetWidth - d[0].clientWidth; b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth; b.bScrollbarLeft = 1 !== Math.round(e.offset().left); b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1; c.remove()
        } h.extend(a.oBrowser, m.__browser); a.oScroll.iBarWidth = m.__browser.barWidth
    } function jb(a, b, c, d, e, f) {
        var g, j = !1; c !== k && (g = c, j = !0); for (; d !==
            e;) a.hasOwnProperty(d) && (g = j ? b(g, a[d], d, a) : a[d], j = !0, d += f); return g
    } function Ga(a, b) { var c = m.defaults.column, d = a.aoColumns.length, c = h.extend({}, m.models.oColumn, c, { nTh: b ? b : H.createElement("th"), sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "", aDataSort: c.aDataSort ? c.aDataSort : [d], mData: c.mData ? c.mData : d, idx: d }); a.aoColumns.push(c); c = a.aoPreSearchCols; c[d] = h.extend({}, m.models.oSearch, c[d]); la(a, d, h(b).data()) } function la(a, b, c) {
        var b = a.aoColumns[b], d = a.oClasses, e = h(b.nTh); if (!b.sWidthOrig) {
            b.sWidthOrig =
                e.attr("width") || null; var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/); f && (b.sWidthOrig = f[1])
        } c !== k && null !== c && (hb(c), J(m.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort")); var g = b.mData, j = R(g), i = b.mRender ? R(b.mRender) : null, c = function (a) { return "string" === typeof a && -1 !== a.indexOf("@") };
        b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter)); b._setter = null; b.fnGetData = function (a, b, c) { var d = j(a, b, k, c); return i && b ? i(d, b, a, c) : d }; b.fnSetData = function (a, b, c) { return S(g)(a, b, c) }; "number" !== typeof g && (a._rowReadObject = !0); a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone)); a = -1 !== h.inArray("asc", b.asSorting); c = -1 !== h.inArray("desc", b.asSorting); !b.bSortable || !a && !c ? (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI =
            d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI)
    } function Z(a) { if (!1 !== a.oFeatures.bAutoWidth) { var b = a.aoColumns; Ha(a); for (var c = 0, d = b.length; c < d; c++) b[c].nTh.style.width = b[c].sWidth } b = a.oScroll; ("" !== b.sY || "" !== b.sX) && ma(a); s(a, null, "column-sizing", [a]) } function $(a, b) { var c = na(a, "bVisible"); return "number" === typeof c[b] ? c[b] : null } function aa(a, b) {
        var c = na(a, "bVisible"), c = h.inArray(b,
            c); return -1 !== c ? c : null
    } function ba(a) { var b = 0; h.each(a.aoColumns, function (a, d) { d.bVisible && "none" !== h(d.nTh).css("display") && b++ }); return b } function na(a, b) { var c = []; h.map(a.aoColumns, function (a, e) { a[b] && c.push(e) }); return c } function Ia(a) {
        var b = a.aoColumns, c = a.aoData, d = m.ext.type.detect, e, f, g, j, i, h, l, q, r; e = 0; for (f = b.length; e < f; e++) if (l = b[e], r = [], !l.sType && l._sManualType) l.sType = l._sManualType; else if (!l.sType) {
            g = 0; for (j = d.length; g < j; g++) {
                i = 0; for (h = c.length; i < h; i++) {
                    r[i] === k && (r[i] = B(a, i, e, "type"));
                    q = d[g](r[i], a); if (!q && g !== d.length - 1) break; if ("html" === q) break
                } if (q) { l.sType = q; break }
            } l.sType || (l.sType = "string")
        }
    } function kb(a, b, c, d) {
        var e, f, g, j, i, n, l = a.aoColumns; if (b) for (e = b.length - 1; 0 <= e; e--) {
            n = b[e]; var q = n.targets !== k ? n.targets : n.aTargets; h.isArray(q) || (q = [q]); f = 0; for (g = q.length; f < g; f++) if ("number" === typeof q[f] && 0 <= q[f]) { for (; l.length <= q[f];) Ga(a); d(q[f], n) } else if ("number" === typeof q[f] && 0 > q[f]) d(l.length + q[f], n); else if ("string" === typeof q[f]) {
                j = 0; for (i = l.length; j < i; j++) ("_all" == q[f] || h(l[j].nTh).hasClass(q[f])) &&
                    d(j, n)
            }
        } if (c) { e = 0; for (a = c.length; e < a; e++) d(e, c[e]) }
    } function N(a, b, c, d) { var e = a.aoData.length, f = h.extend(!0, {}, m.models.oRow, { src: c ? "dom" : "data", idx: e }); f._aData = b; a.aoData.push(f); for (var g = a.aoColumns, j = 0, i = g.length; j < i; j++) g[j].sType = null; a.aiDisplayMaster.push(e); b = a.rowIdFn(b); b !== k && (a.aIds[b] = f); (c || !a.oFeatures.bDeferRender) && Ja(a, e, c, d); return e } function oa(a, b) { var c; b instanceof h || (b = h(b)); return b.map(function (b, e) { c = Ka(a, e); return N(a, c.data, e, c.cells) }) } function B(a, b, c, d) {
        var e = a.iDraw,
        f = a.aoColumns[c], g = a.aoData[b]._aData, j = f.sDefaultContent, i = f.fnGetData(g, d, { settings: a, row: b, col: c }); if (i === k) return a.iDrawError != e && null === j && (K(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b + ", column " + c, 4), a.iDrawError = e), j; if ((i === g || null === i) && null !== j && d !== k) i = j; else if ("function" === typeof i) return i.call(g); return null === i && "display" == d ? "" : i
    } function lb(a, b, c, d) { a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, { settings: a, row: b, col: c }) }
    function La(a) { return h.map(a.match(/(\\.|[^\.])+/g) || [""], function (a) { return a.replace(/\\\./g, ".") }) } function R(a) {
        if (h.isPlainObject(a)) { var b = {}; h.each(a, function (a, c) { c && (b[a] = R(c)) }); return function (a, c, f, g) { var j = b[c] || b._; return j !== k ? j(a, c, f, g) : a } } if (null === a) return function (a) { return a }; if ("function" === typeof a) return function (b, c, f, g) { return a(b, c, f, g) }; if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
            var c = function (a, b, f) {
                var g, j; if ("" !== f) {
                    j = La(f);
                    for (var i = 0, n = j.length; i < n; i++) { f = j[i].match(ca); g = j[i].match(V); if (f) { j[i] = j[i].replace(ca, ""); "" !== j[i] && (a = a[j[i]]); g = []; j.splice(0, i + 1); j = j.join("."); if (h.isArray(a)) { i = 0; for (n = a.length; i < n; i++) g.push(c(a[i], b, j)) } a = f[0].substring(1, f[0].length - 1); a = "" === a ? g : g.join(a); break } else if (g) { j[i] = j[i].replace(V, ""); a = a[j[i]](); continue } if (null === a || a[j[i]] === k) return k; a = a[j[i]] }
                } return a
            }; return function (b, e) { return c(b, e, a) }
        } return function (b) { return b[a] }
    } function S(a) {
        if (h.isPlainObject(a)) return S(a._);
        if (null === a) return function () { }; if ("function" === typeof a) return function (b, d, e) { a(b, "set", d, e) }; if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
            var b = function (a, d, e) {
                var e = La(e), f; f = e[e.length - 1]; for (var g, j, i = 0, n = e.length - 1; i < n; i++) {
                    g = e[i].match(ca); j = e[i].match(V); if (g) { e[i] = e[i].replace(ca, ""); a[e[i]] = []; f = e.slice(); f.splice(0, i + 1); g = f.join("."); if (h.isArray(d)) { j = 0; for (n = d.length; j < n; j++) f = {}, b(f, d[j], g), a[e[i]].push(f) } else a[e[i]] = d; return } j && (e[i] = e[i].replace(V,
                        ""), a = a[e[i]](d)); if (null === a[e[i]] || a[e[i]] === k) a[e[i]] = {}; a = a[e[i]]
                } if (f.match(V)) a[f.replace(V, "")](d); else a[f.replace(ca, "")] = d
            }; return function (c, d) { return b(c, d, a) }
        } return function (b, d) { b[a] = d }
    } function Ma(a) { return D(a.aoData, "_aData") } function pa(a) { a.aoData.length = 0; a.aiDisplayMaster.length = 0; a.aiDisplay.length = 0; a.aIds = {} } function qa(a, b, c) { for (var d = -1, e = 0, f = a.length; e < f; e++) a[e] == b ? d = e : a[e] > b && a[e]--; -1 != d && c === k && a.splice(d, 1) } function da(a, b, c, d) {
        var e = a.aoData[b], f, g = function (c, d) {
            for (; c.childNodes.length;) c.removeChild(c.firstChild);
            c.innerHTML = B(a, b, d, "display")
        }; if ("dom" === c || (!c || "auto" === c) && "dom" === e.src) e._aData = Ka(a, e, d, d === k ? k : e._aData).data; else { var j = e.anCells; if (j) if (d !== k) g(j[d], d); else { c = 0; for (f = j.length; c < f; c++) g(j[c], c) } } e._aSortData = null; e._aFilterData = null; g = a.aoColumns; if (d !== k) g[d].sType = null; else { c = 0; for (f = g.length; c < f; c++) g[c].sType = null; Na(a, e) }
    } function Ka(a, b, c, d) {
        var e = [], f = b.firstChild, g, j, i = 0, n, l = a.aoColumns, q = a._rowReadObject, d = d !== k ? d : q ? {} : [], r = function (a, b) {
            if ("string" === typeof a) {
                var c = a.indexOf("@");
                -1 !== c && (c = a.substring(c + 1), S(a)(d, b.getAttribute(c)))
            }
        }, m = function (a) { if (c === k || c === i) j = l[i], n = h.trim(a.innerHTML), j && j._bAttrSrc ? (S(j.mData._)(d, n), r(j.mData.sort, a), r(j.mData.type, a), r(j.mData.filter, a)) : q ? (j._setter || (j._setter = S(j.mData)), j._setter(d, n)) : d[i] = n; i++ }; if (f) for (; f;) { g = f.nodeName.toUpperCase(); if ("TD" == g || "TH" == g) m(f), e.push(f); f = f.nextSibling } else { e = b.anCells; f = 0; for (g = e.length; f < g; f++) m(e[f]) } if (b = b.firstChild ? b : b.nTr) (b = b.getAttribute("id")) && S(a.rowId)(d, b); return { data: d, cells: e }
    }
    function Ja(a, b, c, d) {
        var e = a.aoData[b], f = e._aData, g = [], j, i, n, l, q; if (null === e.nTr) {
            j = c || H.createElement("tr"); e.nTr = j; e.anCells = g; j._DT_RowIndex = b; Na(a, e); l = 0; for (q = a.aoColumns.length; l < q; l++) {
                n = a.aoColumns[l]; i = c ? d[l] : H.createElement(n.sCellType); i._DT_CellIndex = { row: b, column: l }; g.push(i); if ((!c || n.mRender || n.mData !== l) && (!h.isPlainObject(n.mData) || n.mData._ !== l + ".display")) i.innerHTML = B(a, b, l, "display"); n.sClass && (i.className += " " + n.sClass); n.bVisible && !c ? j.appendChild(i) : !n.bVisible && c && i.parentNode.removeChild(i);
                n.fnCreatedCell && n.fnCreatedCell.call(a.oInstance, i, B(a, b, l), f, b, l)
            } s(a, "aoRowCreatedCallback", null, [j, f, b])
        } e.nTr.setAttribute("role", "row")
    } function Na(a, b) { var c = b.nTr, d = b._aData; if (c) { var e = a.rowIdFn(d); e && (c.id = e); d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? sa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass)); d.DT_RowAttr && h(c).attr(d.DT_RowAttr); d.DT_RowData && h(c).data(d.DT_RowData) } } function mb(a) {
        var b, c, d, e, f, g = a.nTHead, j = a.nTFoot, i = 0 ===
            h("th, td", g).length, n = a.oClasses, l = a.aoColumns; i && (e = h("<tr/>").appendTo(g)); b = 0; for (c = l.length; b < c; b++) f = l[b], d = h(f.nTh).addClass(f.sClass), i && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Oa(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Pa(a, "header")(a, d, f, n); i && ea(a.aoHeader, g); h(g).find(">tr").attr("role", "row"); h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH); h(j).find(">tr>th, >tr>td").addClass(n.sFooterTH);
        if (null !== j) { a = a.aoFooter[0]; b = 0; for (c = a.length; b < c; b++) f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass) }
    } function fa(a, b, c) {
        var d, e, f, g = [], j = [], i = a.aoColumns.length, n; if (b) {
            c === k && (c = !1); d = 0; for (e = b.length; d < e; d++) { g[d] = b[d].slice(); g[d].nTr = b[d].nTr; for (f = i - 1; 0 <= f; f--) !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1); j.push([]) } d = 0; for (e = g.length; d < e; d++) {
                if (a = g[d].nTr) for (; f = a.firstChild;) a.removeChild(f); f = 0; for (b = g[d].length; f < b; f++) if (n = i = 1, j[d][f] === k) {
                    a.appendChild(g[d][f].cell);
                    for (j[d][f] = 1; g[d + i] !== k && g[d][f].cell == g[d + i][f].cell;) j[d + i][f] = 1, i++; for (; g[d][f + n] !== k && g[d][f].cell == g[d][f + n].cell;) { for (c = 0; c < i; c++) j[d + c][f + n] = 1; n++ } h(g[d][f].cell).attr("rowspan", i).attr("colspan", n)
                }
            }
        }
    } function O(a) {
        var b = s(a, "aoPreDrawCallback", "preDraw", [a]); if (-1 !== h.inArray(!1, b)) C(a, !1); else {
            var b = [], c = 0, d = a.asStripeClasses, e = d.length, f = a.oLanguage, g = a.iInitDisplayStart, j = "ssp" == y(a), i = a.aiDisplay; a.bDrawing = !0; g !== k && -1 !== g && (a._iDisplayStart = j ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart =
                -1); var g = a._iDisplayStart, n = a.fnDisplayEnd(); if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, C(a, !1); else if (j) { if (!a.bDestroying && !nb(a)) return } else a.iDraw++; if (0 !== i.length) { f = j ? a.aoData.length : n; for (j = j ? 0 : g; j < f; j++) { var l = i[j], q = a.aoData[l]; null === q.nTr && Ja(a, l); l = q.nTr; if (0 !== e) { var r = d[c % e]; q._sRowStripe != r && (h(l).removeClass(q._sRowStripe).addClass(r), q._sRowStripe = r) } s(a, "aoRowCallback", null, [l, q._aData, c, j]); b.push(l); c++ } } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords :
                    f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", { "class": e ? d[0] : "" }).append(h("<td />", { valign: "top", colSpan: ba(a), "class": a.oClasses.sRowEmpty }).html(c))[0]; s(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ma(a), g, n, i]); s(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ma(a), g, n, i]); d = h(a.nTBody); d.children().detach(); d.append(h(b)); s(a, "aoDrawCallback", "draw", [a]); a.bSorted = !1; a.bFiltered = !1; a.bDrawing = !1
        }
    } function T(a, b) {
        var c = a.oFeatures, d = c.bFilter;
        c.bSort && ob(a); d ? ga(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice(); !0 !== b && (a._iDisplayStart = 0); a._drawHold = b; O(a); a._drawHold = !1
    } function pb(a) {
        var b = a.oClasses, c = h(a.nTable), c = h("<div/>").insertBefore(c), d = a.oFeatures, e = h("<div/>", { id: a.sTableId + "_wrapper", "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter) }); a.nHolding = c[0]; a.nTableWrapper = e[0]; a.nTableReinsertBefore = a.nTable.nextSibling; for (var f = a.sDom.split(""), g, j, i, n, l, q, k = 0; k < f.length; k++) {
            g = null; j = f[k]; if ("<" == j) {
                i = h("<div/>")[0];
                n = f[k + 1]; if ("'" == n || '"' == n) { l = ""; for (q = 2; f[k + q] != n;) l += f[k + q], q++; "H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter); -1 != l.indexOf(".") ? (n = l.split("."), i.id = n[0].substr(1, n[0].length - 1), i.className = n[1]) : "#" == l.charAt(0) ? i.id = l.substr(1, l.length - 1) : i.className = l; k += q } e.append(i); e = h(i)
            } else if (">" == j) e = e.parent(); else if ("l" == j && d.bPaginate && d.bLengthChange) g = qb(a); else if ("f" == j && d.bFilter) g = rb(a); else if ("r" == j && d.bProcessing) g = sb(a); else if ("t" == j) g = tb(a); else if ("i" == j && d.bInfo) g = ub(a); else if ("p" ==
                j && d.bPaginate) g = vb(a); else if (0 !== m.ext.feature.length) { i = m.ext.feature; q = 0; for (n = i.length; q < n; q++) if (j == i[q].cFeature) { g = i[q].fnInit(a); break } } g && (i = a.aanFeatures, i[j] || (i[j] = []), i[j].push(g), e.append(g))
        } c.replaceWith(e); a.nHolding = null
    } function ea(a, b) {
        var c = h(b).children("tr"), d, e, f, g, j, i, n, l, q, k; a.splice(0, a.length); f = 0; for (i = c.length; f < i; f++) a.push([]); f = 0; for (i = c.length; f < i; f++) {
            d = c[f]; for (e = d.firstChild; e;) {
                if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                    l = 1 * e.getAttribute("colspan");
                    q = 1 * e.getAttribute("rowspan"); l = !l || 0 === l || 1 === l ? 1 : l; q = !q || 0 === q || 1 === q ? 1 : q; g = 0; for (j = a[f]; j[g];) g++; n = g; k = 1 === l ? !0 : !1; for (j = 0; j < l; j++) for (g = 0; g < q; g++) a[f + g][n + j] = { cell: e, unique: k }, a[f + g].nTr = d
                } e = e.nextSibling
            }
        }
    } function ta(a, b, c) { var d = []; c || (c = a.aoHeader, b && (c = [], ea(c, b))); for (var b = 0, e = c.length; b < e; b++) for (var f = 0, g = c[b].length; f < g; f++) if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell; return d } function ua(a, b, c) {
        s(a, "aoServerParams", "serverParams", [b]); if (b && h.isArray(b)) {
            var d = {},
            e = /(.*?)\[\]$/; h.each(b, function (a, b) { var c = b.name.match(e); c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value }); b = d
        } var f, g = a.ajax, j = a.oInstance, i = function (b) { s(a, null, "xhr", [a, b, a.jqXHR]); c(b) }; if (h.isPlainObject(g) && g.data) { f = g.data; var n = h.isFunction(f) ? f(b, a) : f, b = h.isFunction(f) && n ? n : h.extend(!0, b, n); delete g.data } n = {
            data: b, success: function (b) { var c = b.error || b.sError; c && K(a, 0, c); a.json = b; i(b) }, dataType: "json", cache: !1, type: a.sServerMethod, error: function (b, c) {
                var d = s(a, null, "xhr",
                    [a, null, a.jqXHR]); -1 === h.inArray(!0, d) && ("parsererror" == c ? K(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && K(a, 0, "Ajax error", 7)); C(a, !1)
            }
        }; a.oAjaxData = b; s(a, null, "preXhr", [a, b]); a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, h.map(b, function (a, b) { return { name: b, value: a } }), i, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(n, { url: g || a.sAjaxSource })) : h.isFunction(g) ? a.jqXHR = g.call(j, b, i, a) : (a.jqXHR = h.ajax(h.extend(n, g)), g.data = f)
    } function nb(a) {
        return a.bAjaxDataGet ? (a.iDraw++, C(a,
            !0), ua(a, wb(a), function (b) { xb(a, b) }), !1) : !0
    } function wb(a) {
        var b = a.aoColumns, c = b.length, d = a.oFeatures, e = a.oPreviousSearch, f = a.aoPreSearchCols, g, j = [], i, n, l, k = W(a); g = a._iDisplayStart; i = !1 !== d.bPaginate ? a._iDisplayLength : -1; var r = function (a, b) { j.push({ name: a, value: b }) }; r("sEcho", a.iDraw); r("iColumns", c); r("sColumns", D(b, "sName").join(",")); r("iDisplayStart", g); r("iDisplayLength", i); var ra = { draw: a.iDraw, columns: [], order: [], start: g, length: i, search: { value: e.sSearch, regex: e.bRegex } }; for (g = 0; g < c; g++) n = b[g],
            l = f[g], i = "function" == typeof n.mData ? "function" : n.mData, ra.columns.push({ data: i, name: n.sName, searchable: n.bSearchable, orderable: n.bSortable, search: { value: l.sSearch, regex: l.bRegex } }), r("mDataProp_" + g, i), d.bFilter && (r("sSearch_" + g, l.sSearch), r("bRegex_" + g, l.bRegex), r("bSearchable_" + g, n.bSearchable)), d.bSort && r("bSortable_" + g, n.bSortable); d.bFilter && (r("sSearch", e.sSearch), r("bRegex", e.bRegex)); d.bSort && (h.each(k, function (a, b) {
                ra.order.push({ column: b.col, dir: b.dir }); r("iSortCol_" + a, b.col); r("sSortDir_" +
                    a, b.dir)
            }), r("iSortingCols", k.length)); b = m.ext.legacy.ajax; return null === b ? a.sAjaxSource ? j : ra : b ? j : ra
    } function xb(a, b) {
        var c = va(a, b), d = b.sEcho !== k ? b.sEcho : b.draw, e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal, f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered; if (d) { if (1 * d < a.iDraw) return; a.iDraw = 1 * d } pa(a); a._iRecordsTotal = parseInt(e, 10); a._iRecordsDisplay = parseInt(f, 10); d = 0; for (e = c.length; d < e; d++) N(a, c[d]); a.aiDisplay = a.aiDisplayMaster.slice(); a.bAjaxDataGet = !1; O(a); a._bInitComplete ||
            wa(a, b); a.bAjaxDataGet = !0; C(a, !1)
    } function va(a, b) { var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp; return "data" === c ? b.aaData || b[c] : "" !== c ? R(c)(b) : b } function rb(a) {
        var b = a.oClasses, c = a.sTableId, d = a.oLanguage, e = a.oPreviousSearch, f = a.aanFeatures, g = '<input type="search" class="' + b.sFilterInput + '"/>', j = d.sSearch, j = j.match(/_INPUT_/) ? j.replace("_INPUT_", g) : j + g, b = h("<div/>", { id: !f.f ? c + "_filter" : null, "class": b.sFilter }).append(h("<label/>").append(j)), f = function () {
            var b = !this.value ?
                "" : this.value; b != e.sSearch && (ga(a, { sSearch: b, bRegex: e.bRegex, bSmart: e.bSmart, bCaseInsensitive: e.bCaseInsensitive }), a._iDisplayStart = 0, O(a))
        }, g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0, i = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", g ? Qa(f, g) : f).on("keypress.DT", function (a) { if (13 == a.keyCode) return !1 }).attr("aria-controls", c); h(a.nTable).on("search.dt.DT", function (b, c) { if (a === c) try { i[0] !== H.activeElement && i.val(e.sSearch) } catch (d) { } });
        return b[0]
    } function ga(a, b, c) { var d = a.oPreviousSearch, e = a.aoPreSearchCols, f = function (a) { d.sSearch = a.sSearch; d.bRegex = a.bRegex; d.bSmart = a.bSmart; d.bCaseInsensitive = a.bCaseInsensitive }; Ia(a); if ("ssp" != y(a)) { yb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive); f(b); for (b = 0; b < e.length; b++) zb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive); Ab(a) } else f(b); a.bFiltered = !0; s(a, null, "search", [a]) } function Ab(a) {
        for (var b =
            m.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) { for (var j = [], i = 0, n = c.length; i < n; i++) e = c[i], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, i) && j.push(e); c.length = 0; h.merge(c, j) }
    } function zb(a, b, c, d, e, f) { if ("" !== b) { for (var g = [], j = a.aiDisplay, d = Ra(b, d, e, f), e = 0; e < j.length; e++) b = a.aoData[j[e]]._aFilterData[c], d.test(b) && g.push(j[e]); a.aiDisplay = g } } function yb(a, b, c, d, e, f) {
        var d = Ra(b, d, e, f), f = a.oPreviousSearch.sSearch, g = a.aiDisplayMaster, j, e = []; 0 !== m.ext.search.length && (c = !0); j = Bb(a); if (0 >= b.length) a.aiDisplay =
            g.slice(); else { if (j || c || f.length > b.length || 0 !== b.indexOf(f) || a.bSorted) a.aiDisplay = g.slice(); b = a.aiDisplay; for (c = 0; c < b.length; c++) d.test(a.aoData[b[c]]._sFilterRow) && e.push(b[c]); a.aiDisplay = e }
    } function Ra(a, b, c, d) { a = b ? a : Sa(a); c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (a) { if ('"' === a.charAt(0)) var b = a.match(/^"(.*)"$/), a = b ? b[1] : a; return a.replace('"', "") }).join(")(?=.*?") + ").*$"); return RegExp(a, d ? "i" : "") } function Bb(a) {
        var b = a.aoColumns, c, d, e, f, g, j, i, h, l = m.ext.type.search; c = !1;
        d = 0; for (f = a.aoData.length; d < f; d++) if (h = a.aoData[d], !h._aFilterData) { j = []; e = 0; for (g = b.length; e < g; e++) c = b[e], c.bSearchable ? (i = B(a, d, e, "filter"), l[c.sType] && (i = l[c.sType](i)), null === i && (i = ""), "string" !== typeof i && i.toString && (i = i.toString())) : i = "", i.indexOf && -1 !== i.indexOf("&") && (xa.innerHTML = i, i = $b ? xa.textContent : xa.innerText), i.replace && (i = i.replace(/[\r\n]/g, "")), j.push(i); h._aFilterData = j; h._sFilterRow = j.join("  "); c = !0 } return c
    } function Cb(a) {
        return {
            search: a.sSearch, smart: a.bSmart, regex: a.bRegex,
            caseInsensitive: a.bCaseInsensitive
        }
    } function Db(a) { return { sSearch: a.search, bSmart: a.smart, bRegex: a.regex, bCaseInsensitive: a.caseInsensitive } } function ub(a) { var b = a.sTableId, c = a.aanFeatures.i, d = h("<div/>", { "class": a.oClasses.sInfo, id: !c ? b + "_info" : null }); c || (a.aoDrawCallback.push({ fn: Eb, sName: "information" }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info")); return d[0] } function Eb(a) {
        var b = a.aanFeatures.i; if (0 !== b.length) {
            var c = a.oLanguage, d = a._iDisplayStart +
                1, e = a.fnDisplayEnd(), f = a.fnRecordsTotal(), g = a.fnRecordsDisplay(), j = g ? c.sInfo : c.sInfoEmpty; g !== f && (j += " " + c.sInfoFiltered); j += c.sInfoPostFix; j = Fb(a, j); c = c.fnInfoCallback; null !== c && (j = c.call(a.oInstance, a, d, e, f, g, j)); h(b).html(j)
        }
    } function Fb(a, b) {
        var c = a.fnFormatNumber, d = a._iDisplayStart + 1, e = a._iDisplayLength, f = a.fnRecordsDisplay(), g = -1 === e; return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a,
            f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
    } function ha(a) {
        var b, c, d = a.iInitDisplayStart, e = a.aoColumns, f; c = a.oFeatures; var g = a.bDeferLoading; if (a.bInitialised) {
            pb(a); mb(a); fa(a, a.aoHeader); fa(a, a.aoFooter); C(a, !0); c.bAutoWidth && Ha(a); b = 0; for (c = e.length; b < c; b++) f = e[b], f.sWidth && (f.nTh.style.width = v(f.sWidth)); s(a, null, "preInit", [a]); T(a); e = y(a); if ("ssp" != e || g) "ajax" == e ? ua(a, [], function (c) {
                var f = va(a, c); for (b = 0; b < f.length; b++) N(a, f[b]); a.iInitDisplayStart =
                    d; T(a); C(a, !1); wa(a, c)
            }, a) : (C(a, !1), wa(a))
        } else setTimeout(function () { ha(a) }, 200)
    } function wa(a, b) { a._bInitComplete = !0; (b || a.oInit.aaData) && Z(a); s(a, null, "plugin-init", [a, b]); s(a, "aoInitComplete", "init", [a, b]) } function Ta(a, b) { var c = parseInt(b, 10); a._iDisplayLength = c; Ua(a); s(a, null, "length", [a, c]) } function qb(a) {
        for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ? d[1] : d, e = h("<select/>", { name: c + "_length", "aria-controls": c, "class": b.sLengthSelect }), g = 0, j = f.length; g < j; g++) e[0][g] =
            new Option(d[g], f[g]); var i = h("<div><label/></div>").addClass(b.sLength); a.aanFeatures.l || (i[0].id = c + "_length"); i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML)); h("select", i).val(a._iDisplayLength).on("change.DT", function () { Ta(a, h(this).val()); O(a) }); h(a.nTable).on("length.dt.DT", function (b, c, d) { a === c && h("select", i).val(d) }); return i[0]
    } function vb(a) {
        var b = a.sPaginationType, c = m.ext.pager[b], d = "function" === typeof c, e = function (a) { O(a) }, b = h("<div/>").addClass(a.oClasses.sPaging +
            b)[0], f = a.aanFeatures; d || c.fnInit(a, b, e); f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({ fn: function (a) { if (d) { var b = a._iDisplayStart, i = a._iDisplayLength, h = a.fnRecordsDisplay(), l = -1 === i, b = l ? 0 : Math.ceil(b / i), i = l ? 1 : Math.ceil(h / i), h = c(b, i), k, l = 0; for (k = f.p.length; l < k; l++) Pa(a, "pageButton")(a, f.p[l], l, h, b, i) } else c.fnUpdate(a, e) }, sName: "pagination" })); return b
    } function Va(a, b, c) {
        var d = a._iDisplayStart, e = a._iDisplayLength, f = a.fnRecordsDisplay(); 0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f &&
            (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : K(a, 0, "Unknown paging action: " + b, 5); b = a._iDisplayStart !== d; a._iDisplayStart = d; b && (s(a, null, "page", [a]), c && O(a)); return b
    } function sb(a) { return h("<div/>", { id: !a.aanFeatures.r ? a.sTableId + "_processing" : null, "class": a.oClasses.sProcessing }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0] } function C(a, b) {
        a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");
        s(a, null, "processing", [a, b])
    } function tb(a) {
        var b = h(a.nTable); b.attr("role", "grid"); var c = a.oScroll; if ("" === c.sX && "" === c.sY) return a.nTable; var d = c.sX, e = c.sY, f = a.oClasses, g = b.children("caption"), j = g.length ? g[0]._captionSide : null, i = h(b[0].cloneNode(!1)), n = h(b[0].cloneNode(!1)), l = b.children("tfoot"); l.length || (l = null); i = h("<div/>", { "class": f.sScrollWrapper }).append(h("<div/>", { "class": f.sScrollHead }).css({ overflow: "hidden", position: "relative", border: 0, width: d ? !d ? null : v(d) : "100%" }).append(h("<div/>",
            { "class": f.sScrollHeadInner }).css({ "box-sizing": "content-box", width: c.sXInner || "100%" }).append(i.removeAttr("id").css("margin-left", 0).append("top" === j ? g : null).append(b.children("thead"))))).append(h("<div/>", { "class": f.sScrollBody }).css({ position: "relative", overflow: "auto", width: !d ? null : v(d) }).append(b)); l && i.append(h("<div/>", { "class": f.sScrollFoot }).css({ overflow: "hidden", border: 0, width: d ? !d ? null : v(d) : "100%" }).append(h("<div/>", { "class": f.sScrollFootInner }).append(n.removeAttr("id").css("margin-left",
                0).append("bottom" === j ? g : null).append(b.children("tfoot"))))); var b = i.children(), k = b[0], f = b[1], r = l ? b[2] : null; if (d) h(f).on("scroll.DT", function () { var a = this.scrollLeft; k.scrollLeft = a; l && (r.scrollLeft = a) }); h(f).css(e && c.bCollapse ? "max-height" : "height", e); a.nScrollHead = k; a.nScrollBody = f; a.nScrollFoot = r; a.aoDrawCallback.push({ fn: ma, sName: "scrolling" }); return i[0]
    } function ma(a) {
        var b = a.oScroll, c = b.sX, d = b.sXInner, e = b.sY, b = b.iBarWidth, f = h(a.nScrollHead), g = f[0].style, j = f.children("div"), i = j[0].style, n = j.children("table"),
        j = a.nScrollBody, l = h(j), q = j.style, r = h(a.nScrollFoot).children("div"), m = r.children("table"), p = h(a.nTHead), o = h(a.nTable), t = o[0], s = t.style, u = a.nTFoot ? h(a.nTFoot) : null, x = a.oBrowser, U = x.bScrollOversize, ac = D(a.aoColumns, "nTh"), P, L, Q, w, Wa = [], y = [], z = [], A = [], B, C = function (a) { a = a.style; a.paddingTop = "0"; a.paddingBottom = "0"; a.borderTopWidth = "0"; a.borderBottomWidth = "0"; a.height = 0 }; L = j.scrollHeight > j.clientHeight; if (a.scrollBarVis !== L && a.scrollBarVis !== k) a.scrollBarVis = L, Z(a); else {
            a.scrollBarVis = L; o.children("thead, tfoot").remove();
            u && (Q = u.clone().prependTo(o), P = u.find("tr"), Q = Q.find("tr")); w = p.clone().prependTo(o); p = p.find("tr"); L = w.find("tr"); w.find("th, td").removeAttr("tabindex"); c || (q.width = "100%", f[0].style.width = "100%"); h.each(ta(a, w), function (b, c) { B = $(a, b); c.style.width = a.aoColumns[B].sWidth }); u && I(function (a) { a.style.width = "" }, Q); f = o.outerWidth(); if ("" === c) { s.width = "100%"; if (U && (o.find("tbody").height() > j.offsetHeight || "scroll" == l.css("overflow-y"))) s.width = v(o.outerWidth() - b); f = o.outerWidth() } else "" !== d && (s.width =
                v(d), f = o.outerWidth()); I(C, L); I(function (a) { z.push(a.innerHTML); Wa.push(v(h(a).css("width"))) }, L); I(function (a, b) { if (h.inArray(a, ac) !== -1) a.style.width = Wa[b] }, p); h(L).height(0); u && (I(C, Q), I(function (a) { A.push(a.innerHTML); y.push(v(h(a).css("width"))) }, Q), I(function (a, b) { a.style.width = y[b] }, P), h(Q).height(0)); I(function (a, b) { a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + z[b] + "</div>"; a.style.width = Wa[b] }, L); u && I(function (a, b) {
                    a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' +
                        A[b] + "</div>"; a.style.width = y[b]
                }, Q); if (o.outerWidth() < f) { P = j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f; if (U && (j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y"))) s.width = v(P - b); ("" === c || "" !== d) && K(a, 1, "Possible column misalignment", 6) } else P = "100%"; q.width = v(P); g.width = v(P); u && (a.nScrollFoot.style.width = v(P)); !e && U && (q.height = v(t.offsetHeight + b)); c = o.outerWidth(); n[0].style.width = v(c); i.width = v(c); d = o.height() > j.clientHeight || "scroll" == l.css("overflow-y"); e = "padding" +
                    (x.bScrollbarLeft ? "Left" : "Right"); i[e] = d ? b + "px" : "0px"; u && (m[0].style.width = v(c), r[0].style.width = v(c), r[0].style[e] = d ? b + "px" : "0px"); o.children("colgroup").insertBefore(o.children("thead")); l.scroll(); if ((a.bSorted || a.bFiltered) && !a._drawHold) j.scrollTop = 0
        }
    } function I(a, b, c) { for (var d = 0, e = 0, f = b.length, g, j; e < f;) { g = b[e].firstChild; for (j = c ? c[e].firstChild : null; g;) 1 === g.nodeType && (c ? a(g, j, d) : a(g, d), d++), g = g.nextSibling, j = c ? j.nextSibling : null; e++ } } function Ha(a) {
        var b = a.nTable, c = a.aoColumns, d = a.oScroll,
        e = d.sY, f = d.sX, g = d.sXInner, j = c.length, i = na(a, "bVisible"), n = h("th", a.nTHead), l = b.getAttribute("width"), k = b.parentNode, r = !1, m, p, o = a.oBrowser, d = o.bScrollOversize; (m = b.style.width) && -1 !== m.indexOf("%") && (l = m); for (m = 0; m < i.length; m++) p = c[i[m]], null !== p.sWidth && (p.sWidth = Gb(p.sWidthOrig, k), r = !0); if (d || !r && !f && !e && j == ba(a) && j == n.length) for (m = 0; m < j; m++) i = $(a, m), null !== i && (c[i].sWidth = v(n.eq(m).width())); else {
            j = h(b).clone().css("visibility", "hidden").removeAttr("id"); j.find("tbody tr").remove(); var t = h("<tr/>").appendTo(j.find("tbody"));
            j.find("thead, tfoot").remove(); j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone()); j.find("tfoot th, tfoot td").css("width", ""); n = ta(a, j.find("thead")[0]); for (m = 0; m < i.length; m++) p = c[i[m]], n[m].style.width = null !== p.sWidthOrig && "" !== p.sWidthOrig ? v(p.sWidthOrig) : "", p.sWidthOrig && f && h(n[m]).append(h("<div/>").css({ width: p.sWidthOrig, margin: 0, padding: 0, border: 0, height: 1 })); if (a.aoData.length) for (m = 0; m < i.length; m++) r = i[m], p = c[r], h(Hb(a, r)).clone(!1).append(p.sContentPadding).appendTo(t); h("[name]",
                j).removeAttr("name"); p = h("<div/>").css(f || e ? { position: "absolute", top: 0, left: 0, height: 1, right: 0, overflow: "hidden" } : {}).append(j).appendTo(k); f && g ? j.width(g) : f ? (j.css("width", "auto"), j.removeAttr("width"), j.width() < k.clientWidth && l && j.width(k.clientWidth)) : e ? j.width(k.clientWidth) : l && j.width(l); for (m = e = 0; m < i.length; m++) k = h(n[m]), g = k.outerWidth() - k.width(), k = o.bBounding ? Math.ceil(n[m].getBoundingClientRect().width) : k.outerWidth(), e += k, c[i[m]].sWidth = v(k - g); b.style.width = v(e); p.remove()
        } l && (b.style.width =
            v(l)); if ((l || f) && !a._reszEvt) b = function () { h(E).on("resize.DT-" + a.sInstance, Qa(function () { Z(a) })) }, d ? setTimeout(b, 1E3) : b(), a._reszEvt = !0
    } function Gb(a, b) { if (!a) return 0; var c = h("<div/>").css("width", v(a)).appendTo(b || H.body), d = c[0].offsetWidth; c.remove(); return d } function Hb(a, b) { var c = Ib(a, b); if (0 > c) return null; var d = a.aoData[c]; return !d.nTr ? h("<td/>").html(B(a, c, b, "display"))[0] : d.anCells[b] } function Ib(a, b) {
        for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++) c = B(a, f, b, "display") + "", c = c.replace(bc,
            ""), c = c.replace(/&nbsp;/g, " "), c.length > d && (d = c.length, e = f); return e
    } function v(a) { return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a } function W(a) {
        var b, c, d = [], e = a.aoColumns, f, g, j, i; b = a.aaSortingFixed; c = h.isPlainObject(b); var n = []; f = function (a) { a.length && !h.isArray(a[0]) ? n.push(a) : h.merge(n, a) }; h.isArray(b) && f(b); c && b.pre && f(b.pre); f(a.aaSorting); c && b.post && f(b.post); for (a = 0; a < n.length; a++) {
            i = n[a][0]; f = e[i].aDataSort; b = 0; for (c = f.length; b < c; b++) g = f[b], j = e[g].sType ||
                "string", n[a]._idx === k && (n[a]._idx = h.inArray(n[a][1], e[g].asSorting)), d.push({ src: i, col: g, dir: n[a][1], index: n[a]._idx, type: j, formatter: m.ext.type.order[j + "-pre"] })
        } return d
    } function ob(a) {
        var b, c, d = [], e = m.ext.type.order, f = a.aoData, g = 0, j, i = a.aiDisplayMaster, h; Ia(a); h = W(a); b = 0; for (c = h.length; b < c; b++) j = h[b], j.formatter && g++, Jb(a, j.col); if ("ssp" != y(a) && 0 !== h.length) {
            b = 0; for (c = i.length; b < c; b++) d[i[b]] = b; g === h.length ? i.sort(function (a, b) {
                var c, e, g, j, i = h.length, k = f[a]._aSortData, m = f[b]._aSortData; for (g =
                    0; g < i; g++) if (j = h[g], c = k[j.col], e = m[j.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c) return "asc" === j.dir ? c : -c; c = d[a]; e = d[b]; return c < e ? -1 : c > e ? 1 : 0
            }) : i.sort(function (a, b) { var c, g, j, i, k = h.length, m = f[a]._aSortData, p = f[b]._aSortData; for (j = 0; j < k; j++) if (i = h[j], c = m[i.col], g = p[i.col], i = e[i.type + "-" + i.dir] || e["string-" + i.dir], c = i(c, g), 0 !== c) return c; c = d[a]; g = d[b]; return c < g ? -1 : c > g ? 1 : 0 })
        } a.bSorted = !0
    } function Kb(a) {
        for (var b, c, d = a.aoColumns, e = W(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
            c = d[f]; var j = c.asSorting; b = c.sTitle.replace(/<.*?>/g,
                ""); var i = c.nTh; i.removeAttribute("aria-sort"); c.bSortable && (0 < e.length && e[0].col == f ? (i.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending); i.setAttribute("aria-label", b)
        }
    } function Xa(a, b, c, d) {
        var e = a.aaSorting, f = a.aoColumns[b].asSorting, g = function (a, b) { var c = a._idx; c === k && (c = h.inArray(a[1], f)); return c + 1 < f.length ? c + 1 : b ? null : 0 }; "number" === typeof e[0] && (e = a.aaSorting = [e]); c && a.oFeatures.bSortMulti ? (c = h.inArray(b,
            D(e, "0")), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0); T(a); "function" == typeof d && d(a)
    } function Oa(a, b, c, d) { var e = a.aoColumns[c]; Ya(b, {}, function (b) { !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function () { Xa(a, c, b.shiftKey, d); "ssp" !== y(a) && C(a, !1) }, 0)) : Xa(a, c, b.shiftKey, d)) }) }
    function ya(a) { var b = a.aLastSort, c = a.oClasses.sSortColumn, d = W(a), e = a.oFeatures, f, g; if (e.bSort && e.bSortClasses) { e = 0; for (f = b.length; e < f; e++) g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3)); e = 0; for (f = d.length; e < f; e++) g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3)) } a.aLastSort = d } function Jb(a, b) {
        var c = a.aoColumns[b], d = m.ext.order[c.sSortDataType], e; d && (e = d.call(a.oInstance, a, b, aa(a, b))); for (var f, g = m.ext.type.order[c.sType + "-pre"], j = 0, i = a.aoData.length; j < i; j++) if (c = a.aoData[j],
            c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) f = d ? e[j] : B(a, j, b, "sort"), c._aSortData[b] = g ? g(f) : f
    } function za(a) {
        if (a.oFeatures.bStateSave && !a.bDestroying) {
            var b = { time: +new Date, start: a._iDisplayStart, length: a._iDisplayLength, order: h.extend(!0, [], a.aaSorting), search: Cb(a.oPreviousSearch), columns: h.map(a.aoColumns, function (b, d) { return { visible: b.bVisible, search: Cb(a.aoPreSearchCols[d]) } }) }; s(a, "aoStateSaveParams", "stateSaveParams", [a, b]); a.oSavedState = b; a.fnStateSaveCallback.call(a.oInstance, a,
                b)
        }
    } function Lb(a, b, c) {
        var d, e, f = a.aoColumns, b = function (b) {
            if (b && b.time) {
                var g = s(a, "aoStateLoadParams", "stateLoadParams", [a, b]); if (-1 === h.inArray(!1, g) && (g = a.iStateDuration, !(0 < g && b.time < +new Date - 1E3 * g) && !(b.columns && f.length !== b.columns.length))) {
                    a.oLoadedState = h.extend(!0, {}, b); b.start !== k && (a._iDisplayStart = b.start, a.iInitDisplayStart = b.start); b.length !== k && (a._iDisplayLength = b.length); b.order !== k && (a.aaSorting = [], h.each(b.order, function (b, c) { a.aaSorting.push(c[0] >= f.length ? [0, c[1]] : c) })); b.search !==
                        k && h.extend(a.oPreviousSearch, Db(b.search)); if (b.columns) { d = 0; for (e = b.columns.length; d < e; d++) g = b.columns[d], g.visible !== k && (f[d].bVisible = g.visible), g.search !== k && h.extend(a.aoPreSearchCols[d], Db(g.search)) } s(a, "aoStateLoaded", "stateLoaded", [a, b])
                }
            } c()
        }; if (a.oFeatures.bStateSave) { var g = a.fnStateLoadCallback.call(a.oInstance, a, b); g !== k && b(g) } else c()
    } function Aa(a) { var b = m.settings, a = h.inArray(a, D(b, "nTable")); return -1 !== a ? b[a] : null } function K(a, b, c, d) {
        c = "DataTables warning: " + (a ? "table id=" + a.sTableId +
            " - " : "") + c; d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d); if (b) E.console && console.log && console.log(c); else if (b = m.ext, b = b.sErrMode || b.errMode, a && s(a, null, "error", [a, d, c]), "alert" == b) alert(c); else { if ("throw" == b) throw Error(c); "function" == typeof b && b(a, d, c) }
    } function F(a, b, c, d) { h.isArray(c) ? h.each(c, function (c, d) { h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d) }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c])) } function Mb(a, b, c) {
        var d, e; for (e in b) b.hasOwnProperty(e) && (d = b[e],
            h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d); return a
    } function Ya(a, b, c) { h(a).on("click.DT", b, function (b) { a.blur(); c(b) }).on("keypress.DT", b, function (a) { 13 === a.which && (a.preventDefault(), c(a)) }).on("selectstart.DT", function () { return !1 }) } function z(a, b, c, d) { c && a[b].push({ fn: c, sName: d }) } function s(a, b, c, d) {
        var e = []; b && (e = h.map(a[b].slice().reverse(), function (b) { return b.fn.apply(a.oInstance, d) })); null !== c && (b = h.Event(c +
            ".dt"), h(a.nTable).trigger(b, d), e.push(b.result)); return e
    } function Ua(a) { var b = a._iDisplayStart, c = a.fnDisplayEnd(), d = a._iDisplayLength; b >= c && (b = c - d); b -= b % d; if (-1 === d || 0 > b) b = 0; a._iDisplayStart = b } function Pa(a, b) { var c = a.renderer, d = m.ext.renderer[b]; return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._ } function y(a) { return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom" } function ia(a, b) {
        var c = [], c = Nb.numbers_length, d = Math.floor(c / 2); b <= c ? c = X(0, b) : a <= d ? (c = X(0,
            c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = X(b - (c - 2), b) : (c = X(a - d + 2, a + d - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0)); c.DT_el = "span"; return c
    } function fb(a) { h.each({ num: function (b) { return Ba(b, a) }, "num-fmt": function (b) { return Ba(b, a, Za) }, "html-num": function (b) { return Ba(b, a, Ca) }, "html-num-fmt": function (b) { return Ba(b, a, Ca, Za) } }, function (b, c) { x.type.order[b + a + "-pre"] = c; b.match(/^html\-/) && (x.type.search[b + a] = x.type.search.html) }) } function Ob(a) {
        return function () {
            var b =
                [Aa(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments)); return m.ext.internal[a].apply(this, b)
        }
    } var m = function (a) {
        this.$ = function (a, b) { return this.api(!0).$(a, b) }; this._ = function (a, b) { return this.api(!0).rows(a, b).data() }; this.api = function (a) { return a ? new t(Aa(this[x.iApiIndex])) : new t(this) }; this.fnAddData = function (a, b) { var c = this.api(!0), d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a); (b === k || b) && c.draw(); return d.flatten().toArray() }; this.fnAdjustColumnSizing =
            function (a) { var b = this.api(!0).columns.adjust(), c = b.settings()[0], d = c.oScroll; a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && ma(c) }; this.fnClearTable = function (a) { var b = this.api(!0).clear(); (a === k || a) && b.draw() }; this.fnClose = function (a) { this.api(!0).row(a).child.hide() }; this.fnDeleteRow = function (a, b, c) { var d = this.api(!0), a = d.rows(a), e = a.settings()[0], h = e.aoData[a[0][0]]; a.remove(); b && b.call(this, e, h); (c === k || c) && d.draw(); return h }; this.fnDestroy = function (a) { this.api(!0).destroy(a) }; this.fnDraw = function (a) { this.api(!0).draw(a) };
        this.fnFilter = function (a, b, c, d, e, h) { e = this.api(!0); null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h); e.draw() }; this.fnGetData = function (a, b) { var c = this.api(!0); if (a !== k) { var d = a.nodeName ? a.nodeName.toLowerCase() : ""; return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null } return c.data().toArray() }; this.fnGetNodes = function (a) { var b = this.api(!0); return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray() }; this.fnGetPosition = function (a) {
            var b = this.api(!0), c = a.nodeName.toUpperCase();
            return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null
        }; this.fnIsOpen = function (a) { return this.api(!0).row(a).child.isShown() }; this.fnOpen = function (a, b, c) { return this.api(!0).row(a).child(b, c).show().child()[0] }; this.fnPageChange = function (a, b) { var c = this.api(!0).page(a); (b === k || b) && c.draw(!1) }; this.fnSetColumnVis = function (a, b, c) { a = this.api(!0).column(a).visible(b); (c === k || c) && a.columns.adjust().draw() }; this.fnSettings = function () { return Aa(this[x.iApiIndex]) };
        this.fnSort = function (a) { this.api(!0).order(a).draw() }; this.fnSortListener = function (a, b, c) { this.api(!0).order.listener(a, b, c) }; this.fnUpdate = function (a, b, c, d, e) { var h = this.api(!0); c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a); (e === k || e) && h.columns.adjust(); (d === k || d) && h.draw(); return 0 }; this.fnVersionCheck = x.fnVersionCheck; var b = this, c = a === k, d = this.length; c && (a = {}); this.oApi = this.internal = x.internal; for (var e in m.ext.internal) e && (this[e] = Ob(e)); this.each(function () {
            var e = {}, g = 1 < d ? Mb(e, a, !0) :
                a, j = 0, i, e = this.getAttribute("id"), n = !1, l = m.defaults, q = h(this); if ("table" != this.nodeName.toLowerCase()) K(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2); else {
                    gb(l); hb(l.column); J(l, l, !0); J(l.column, l.column, !0); J(l, h.extend(g, q.data())); var r = m.settings, j = 0; for (i = r.length; j < i; j++) {
                        var p = r[j]; if (p.nTable == this || p.nTHead.parentNode == this || p.nTFoot && p.nTFoot.parentNode == this) {
                            var t = g.bRetrieve !== k ? g.bRetrieve : l.bRetrieve; if (c || t) return p.oInstance; if (g.bDestroy !== k ? g.bDestroy : l.bDestroy) {
                                p.oInstance.fnDestroy();
                                break
                            } else { K(p, 0, "Cannot reinitialise DataTable", 3); return }
                        } if (p.sTableId == this.id) { r.splice(j, 1); break }
                    } if (null === e || "" === e) this.id = e = "DataTables_Table_" + m.ext._unique++; var o = h.extend(!0, {}, m.models.oSettings, { sDestroyWidth: q[0].style.width, sInstance: e, sTableId: e }); o.nTable = this; o.oApi = b.internal; o.oInit = g; r.push(o); o.oInstance = 1 === b.length ? b : q.dataTable(); gb(g); g.oLanguage && Fa(g.oLanguage); g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = h.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);
                    g = Mb(h.extend(!0, {}, l), g); F(o.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")); F(o, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]); F(o.oScroll, g, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]); F(o.oLanguage, g, "fnInfoCallback"); z(o, "aoDrawCallback", g.fnDrawCallback, "user"); z(o, "aoServerParams", g.fnServerParams, "user"); z(o, "aoStateSaveParams", g.fnStateSaveParams, "user"); z(o, "aoStateLoadParams", g.fnStateLoadParams, "user"); z(o, "aoStateLoaded", g.fnStateLoaded,
                            "user"); z(o, "aoRowCallback", g.fnRowCallback, "user"); z(o, "aoRowCreatedCallback", g.fnCreatedRow, "user"); z(o, "aoHeaderCallback", g.fnHeaderCallback, "user"); z(o, "aoFooterCallback", g.fnFooterCallback, "user"); z(o, "aoInitComplete", g.fnInitComplete, "user"); z(o, "aoPreDrawCallback", g.fnPreDrawCallback, "user"); o.rowIdFn = R(g.rowId); ib(o); var u = o.oClasses; g.bJQueryUI ? (h.extend(u, m.ext.oJUIClasses, g.oClasses), g.sDom === l.sDom && "lfrtip" === l.sDom && (o.sDom = '<"H"lfr>t<"F"ip>'), o.renderer) ? h.isPlainObject(o.renderer) &&
                                !o.renderer.header && (o.renderer.header = "jqueryui") : o.renderer = "jqueryui" : h.extend(u, m.ext.classes, g.oClasses); q.addClass(u.sTable); o.iInitDisplayStart === k && (o.iInitDisplayStart = g.iDisplayStart, o._iDisplayStart = g.iDisplayStart); null !== g.iDeferLoading && (o.bDeferLoading = !0, e = h.isArray(g.iDeferLoading), o._iRecordsDisplay = e ? g.iDeferLoading[0] : g.iDeferLoading, o._iRecordsTotal = e ? g.iDeferLoading[1] : g.iDeferLoading); var v = o.oLanguage; h.extend(!0, v, g.oLanguage); v.sUrl && (h.ajax({
                                    dataType: "json", url: v.sUrl, success: function (a) {
                                        Fa(a);
                                        J(l.oLanguage, a); h.extend(true, v, a); ha(o)
                                    }, error: function () { ha(o) }
                                }), n = !0); null === g.asStripeClasses && (o.asStripeClasses = [u.sStripeOdd, u.sStripeEven]); var e = o.asStripeClasses, x = q.children("tbody").find("tr").eq(0); -1 !== h.inArray(!0, h.map(e, function (a) { return x.hasClass(a) })) && (h("tbody tr", this).removeClass(e.join(" ")), o.asDestroyStripes = e.slice()); e = []; r = this.getElementsByTagName("thead"); 0 !== r.length && (ea(o.aoHeader, r[0]), e = ta(o)); if (null === g.aoColumns) { r = []; j = 0; for (i = e.length; j < i; j++) r.push(null) } else r =
                                    g.aoColumns; j = 0; for (i = r.length; j < i; j++) Ga(o, e ? e[j] : null); kb(o, g.aoColumnDefs, r, function (a, b) { la(o, a, b) }); if (x.length) { var w = function (a, b) { return a.getAttribute("data-" + b) !== null ? b : null }; h(x[0]).children("th, td").each(function (a, b) { var c = o.aoColumns[a]; if (c.mData === a) { var d = w(b, "sort") || w(b, "order"), e = w(b, "filter") || w(b, "search"); if (d !== null || e !== null) { c.mData = { _: a + ".display", sort: d !== null ? a + ".@data-" + d : k, type: d !== null ? a + ".@data-" + d : k, filter: e !== null ? a + ".@data-" + e : k }; la(o, a) } } }) } var U = o.oFeatures,
                                        e = function () {
                                            if (g.aaSorting === k) { var a = o.aaSorting; j = 0; for (i = a.length; j < i; j++) a[j][1] = o.aoColumns[j].asSorting[0] } ya(o); U.bSort && z(o, "aoDrawCallback", function () { if (o.bSorted) { var a = W(o), b = {}; h.each(a, function (a, c) { b[c.src] = c.dir }); s(o, null, "order", [o, a, b]); Kb(o) } }); z(o, "aoDrawCallback", function () { (o.bSorted || y(o) === "ssp" || U.bDeferRender) && ya(o) }, "sc"); var a = q.children("caption").each(function () { this._captionSide = h(this).css("caption-side") }), b = q.children("thead"); b.length === 0 && (b = h("<thead/>").appendTo(q));
                                            o.nTHead = b[0]; b = q.children("tbody"); b.length === 0 && (b = h("<tbody/>").appendTo(q)); o.nTBody = b[0]; b = q.children("tfoot"); if (b.length === 0 && a.length > 0 && (o.oScroll.sX !== "" || o.oScroll.sY !== "")) b = h("<tfoot/>").appendTo(q); if (b.length === 0 || b.children().length === 0) q.addClass(u.sNoFooter); else if (b.length > 0) { o.nTFoot = b[0]; ea(o.aoFooter, o.nTFoot) } if (g.aaData) for (j = 0; j < g.aaData.length; j++) N(o, g.aaData[j]); else (o.bDeferLoading || y(o) == "dom") && oa(o, h(o.nTBody).children("tr")); o.aiDisplay = o.aiDisplayMaster.slice();
                                            o.bInitialised = true; n === false && ha(o)
                                        }; g.bStateSave ? (U.bStateSave = !0, z(o, "aoDrawCallback", za, "state_save"), Lb(o, g, e)) : e()
                }
        }); b = null; return this
    }, x, t, p, u, $a = {}, Pb = /[\r\n]/g, Ca = /<.*?>/g, cc = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/, dc = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), Za = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, M = function (a) { return !a || !0 === a || "-" === a ? !0 : !1 }, Qb = function (a) {
        var b = parseInt(a, 10); return !isNaN(b) &&
            isFinite(a) ? b : null
    }, Rb = function (a, b) { $a[b] || ($a[b] = RegExp(Sa(b), "g")); return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace($a[b], ".") : a }, ab = function (a, b, c) { var d = "string" === typeof a; if (M(a)) return !0; b && d && (a = Rb(a, b)); c && d && (a = a.replace(Za, "")); return !isNaN(parseFloat(a)) && isFinite(a) }, Sb = function (a, b, c) { return M(a) ? !0 : !(M(a) || "string" === typeof a) ? null : ab(a.replace(Ca, ""), b, c) ? !0 : null }, D = function (a, b, c) {
        var d = [], e = 0, f = a.length; if (c !== k) for (; e < f; e++) a[e] && a[e][b] && d.push(a[e][b][c]); else for (; e <
            f; e++) a[e] && d.push(a[e][b]); return d
    }, ja = function (a, b, c, d) { var e = [], f = 0, g = b.length; if (d !== k) for (; f < g; f++) a[b[f]][c] && e.push(a[b[f]][c][d]); else for (; f < g; f++) e.push(a[b[f]][c]); return e }, X = function (a, b) { var c = [], d; b === k ? (b = 0, d = a) : (d = b, b = a); for (var e = b; e < d; e++) c.push(e); return c }, Tb = function (a) { for (var b = [], c = 0, d = a.length; c < d; c++) a[c] && b.push(a[c]); return b }, sa = function (a) {
        var b; a: { if (!(2 > a.length)) { b = a.slice().sort(); for (var c = b[0], d = 1, e = b.length; d < e; d++) { if (b[d] === c) { b = !1; break a } c = b[d] } } b = !0 } if (b) return a.slice();
        b = []; var e = a.length, f, g = 0, d = 0; a: for (; d < e; d++) { c = a[d]; for (f = 0; f < g; f++) if (b[f] === c) continue a; b.push(c); g++ } return b
    }; m.util = { throttle: function (a, b) { var c = b !== k ? b : 200, d, e; return function () { var b = this, g = +new Date, h = arguments; d && g < d + c ? (clearTimeout(e), e = setTimeout(function () { d = k; a.apply(b, h) }, c)) : (d = g, a.apply(b, h)) } }, escapeRegex: function (a) { return a.replace(dc, "\\$1") } }; var A = function (a, b, c) { a[b] !== k && (a[c] = a[b]) }, ca = /\[.*?\]$/, V = /\(\)$/, Sa = m.util.escapeRegex, xa = h("<div>")[0], $b = xa.textContent !== k, bc =
        /<.*?>/g, Qa = m.util.throttle, Ub = [], w = Array.prototype, ec = function (a) { var b, c, d = m.settings, e = h.map(d, function (a) { return a.nTable }); if (a) { if (a.nTable && a.oApi) return [a]; if (a.nodeName && "table" === a.nodeName.toLowerCase()) return b = h.inArray(a, e), -1 !== b ? [d[b]] : null; if (a && "function" === typeof a.settings) return a.settings().toArray(); "string" === typeof a ? c = h(a) : a instanceof h && (c = a) } else return []; if (c) return c.map(function () { b = h.inArray(this, e); return -1 !== b ? d[b] : null }).toArray() }; t = function (a, b) {
            if (!(this instanceof
                t)) return new t(a, b); var c = [], d = function (a) { (a = ec(a)) && (c = c.concat(a)) }; if (h.isArray(a)) for (var e = 0, f = a.length; e < f; e++) d(a[e]); else d(a); this.context = sa(c); b && h.merge(this, b); this.selector = { rows: null, cols: null, opts: null }; t.extend(this, this, Ub)
        }; m.Api = t; h.extend(t.prototype, {
            any: function () { return 0 !== this.count() }, concat: w.concat, context: [], count: function () { return this.flatten().length }, each: function (a) { for (var b = 0, c = this.length; b < c; b++) a.call(this, this[b], b, this); return this }, eq: function (a) {
                var b =
                    this.context; return b.length > a ? new t(b[a], this[a]) : null
            }, filter: function (a) { var b = []; if (w.filter) b = w.filter.call(this, a, this); else for (var c = 0, d = this.length; c < d; c++) a.call(this, this[c], c, this) && b.push(this[c]); return new t(this.context, b) }, flatten: function () { var a = []; return new t(this.context, a.concat.apply(a, this.toArray())) }, join: w.join, indexOf: w.indexOf || function (a, b) { for (var c = b || 0, d = this.length; c < d; c++) if (this[c] === a) return c; return -1 }, iterator: function (a, b, c, d) {
                var e = [], f, g, h, i, n, l = this.context,
                m, p, u = this.selector; "string" === typeof a && (d = c, c = b, b = a, a = !1); g = 0; for (h = l.length; g < h; g++) { var s = new t(l[g]); if ("table" === b) f = c.call(s, l[g], g), f !== k && e.push(f); else if ("columns" === b || "rows" === b) f = c.call(s, l[g], this[g], g), f !== k && e.push(f); else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) { p = this[g]; "column-rows" === b && (m = Da(l[g], u.opts)); i = 0; for (n = p.length; i < n; i++) f = p[i], f = "cell" === b ? c.call(s, l[g], f.row, f.column, g, i) : c.call(s, l[g], f, g, i, m), f !== k && e.push(f) } } return e.length || d ? (a = new t(l, a ?
                    e.concat.apply([], e) : e), b = a.selector, b.rows = u.rows, b.cols = u.cols, b.opts = u.opts, a) : this
            }, lastIndexOf: w.lastIndexOf || function (a, b) { return this.indexOf.apply(this.toArray.reverse(), arguments) }, length: 0, map: function (a) { var b = []; if (w.map) b = w.map.call(this, a, this); else for (var c = 0, d = this.length; c < d; c++) b.push(a.call(this, this[c], c)); return new t(this.context, b) }, pluck: function (a) { return this.map(function (b) { return b[a] }) }, pop: w.pop, push: w.push, reduce: w.reduce || function (a, b) {
                return jb(this, a, b, 0, this.length,
                    1)
            }, reduceRight: w.reduceRight || function (a, b) { return jb(this, a, b, this.length - 1, -1, -1) }, reverse: w.reverse, selector: null, shift: w.shift, slice: function () { return new t(this.context, this) }, sort: w.sort, splice: w.splice, toArray: function () { return w.slice.call(this) }, to$: function () { return h(this) }, toJQuery: function () { return h(this) }, unique: function () { return new t(this.context, sa(this)) }, unshift: w.unshift
        }); t.extend = function (a, b, c) {
            if (c.length && b && (b instanceof t || b.__dt_wrapper)) {
                var d, e, f, g = function (a, b, c) {
                    return function () {
                        var d =
                            b.apply(a, arguments); t.extend(d, d, c.methodExt); return d
                    }
                }; d = 0; for (e = c.length; d < e; d++) f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, t.extend(a, b[f.name], f.propExt)
            }
        }; t.register = p = function (a, b) {
            if (h.isArray(a)) for (var c = 0, d = a.length; c < d; c++) t.register(a[c], b); else for (var e = a.split("."), f = Ub, g, j, c = 0, d = e.length; c < d; c++) {
                g = (j = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c]; var i; a: {
                    i = 0; for (var n = f.length; i < n; i++) if (f[i].name === g) {
                        i =
                        f[i]; break a
                    } i = null
                } i || (i = { name: g, val: {}, methodExt: [], propExt: [] }, f.push(i)); c === d - 1 ? i.val = b : f = j ? i.methodExt : i.propExt
            }
        }; t.registerPlural = u = function (a, b, c) { t.register(a, c); t.register(b, function () { var a = c.apply(this, arguments); return a === this ? this : a instanceof t ? a.length ? h.isArray(a[0]) ? new t(a.context, a[0]) : a[0] : k : a }) }; p("tables()", function (a) {
            var b; if (a) {
                b = t; var c = this.context; if ("number" === typeof a) a = [c[a]]; else var d = h.map(c, function (a) { return a.nTable }), a = h(d).filter(a).map(function () {
                    var a = h.inArray(this,
                        d); return c[a]
                }).toArray(); b = new b(a)
            } else b = this; return b
        }); p("table()", function (a) { var a = this.tables(a), b = a.context; return b.length ? new t(b[0]) : a }); u("tables().nodes()", "table().node()", function () { return this.iterator("table", function (a) { return a.nTable }, 1) }); u("tables().body()", "table().body()", function () { return this.iterator("table", function (a) { return a.nTBody }, 1) }); u("tables().header()", "table().header()", function () { return this.iterator("table", function (a) { return a.nTHead }, 1) }); u("tables().footer()",
            "table().footer()", function () { return this.iterator("table", function (a) { return a.nTFoot }, 1) }); u("tables().containers()", "table().container()", function () { return this.iterator("table", function (a) { return a.nTableWrapper }, 1) }); p("draw()", function (a) { return this.iterator("table", function (b) { "page" === a ? O(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), T(b, !1 === a)) }) }); p("page()", function (a) { return a === k ? this.page.info().page : this.iterator("table", function (b) { Va(b, a) }) }); p("page.info()", function () {
                if (0 ===
                    this.context.length) return k; var a = this.context[0], b = a._iDisplayStart, c = a.oFeatures.bPaginate ? a._iDisplayLength : -1, d = a.fnRecordsDisplay(), e = -1 === c; return { page: e ? 0 : Math.floor(b / c), pages: e ? 1 : Math.ceil(d / c), start: b, end: a.fnDisplayEnd(), length: c, recordsTotal: a.fnRecordsTotal(), recordsDisplay: d, serverSide: "ssp" === y(a) }
            }); p("page.len()", function (a) { return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", function (b) { Ta(b, a) }) }); var Vb = function (a, b, c) {
                if (c) {
                    var d = new t(a);
                    d.one("draw", function () { c(d.ajax.json()) })
                } if ("ssp" == y(a)) T(a, b); else { C(a, !0); var e = a.jqXHR; e && 4 !== e.readyState && e.abort(); ua(a, [], function (c) { pa(a); for (var c = va(a, c), d = 0, e = c.length; d < e; d++) N(a, c[d]); T(a, b); C(a, !1) }) }
            }; p("ajax.json()", function () { var a = this.context; if (0 < a.length) return a[0].json }); p("ajax.params()", function () { var a = this.context; if (0 < a.length) return a[0].oAjaxData }); p("ajax.reload()", function (a, b) { return this.iterator("table", function (c) { Vb(c, !1 === b, a) }) }); p("ajax.url()", function (a) {
                var b =
                    this.context; if (a === k) { if (0 === b.length) return k; b = b[0]; return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource } return this.iterator("table", function (b) { h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a })
            }); p("ajax.url().load()", function (a, b) { return this.iterator("table", function (c) { Vb(c, !1 === b, a) }) }); var bb = function (a, b, c, d, e) {
                var f = [], g, j, i, n, l, m; i = typeof b; if (!b || "string" === i || "function" === i || b.length === k) b = [b]; i = 0; for (n = b.length; i < n; i++) {
                    j = b[i] && b[i].split && !b[i].match(/[\[\(:]/) ? b[i].split(",") :
                        [b[i]]; l = 0; for (m = j.length; l < m; l++) (g = c("string" === typeof j[l] ? h.trim(j[l]) : j[l])) && g.length && (f = f.concat(g))
                } a = x.selector[a]; if (a.length) { i = 0; for (n = a.length; i < n; i++) f = a[i](d, e, f) } return sa(f)
            }, cb = function (a) { a || (a = {}); a.filter && a.search === k && (a.search = a.filter); return h.extend({ search: "none", order: "current", page: "all" }, a) }, db = function (a) { for (var b = 0, c = a.length; b < c; b++) if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a; a.length = 0; return a }, Da = function (a, b) {
                var c,
                d, e, f = [], g = a.aiDisplay; c = a.aiDisplayMaster; var j = b.search; d = b.order; e = b.page; if ("ssp" == y(a)) return "removed" === j ? [] : X(0, c.length); if ("current" == e) { c = a._iDisplayStart; for (d = a.fnDisplayEnd() ; c < d; c++) f.push(g[c]) } else if ("current" == d || "applied" == d) f = "none" == j ? c.slice() : "applied" == j ? g.slice() : h.map(c, function (a) { return -1 === h.inArray(a, g) ? a : null }); else if ("index" == d || "original" == d) { c = 0; for (d = a.aoData.length; c < d; c++) "none" == j ? f.push(c) : (e = h.inArray(c, g), (-1 === e && "removed" == j || 0 <= e && "applied" == j) && f.push(c)) } return f
            };
    p("rows()", function (a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = ""); var b = cb(b), c = this.iterator("table", function (c) {
            var e = b, f; return bb("row", a, function (a) {
                var b = Qb(a); if (b !== null && !e) return [b]; f || (f = Da(c, e)); if (b !== null && h.inArray(b, f) !== -1) return [b]; if (a === null || a === k || a === "") return f; if (typeof a === "function") return h.map(f, function (b) { var e = c.aoData[b]; return a(b, e._aData, e.nTr) ? b : null }); b = Tb(ja(c.aoData, f, "nTr")); if (a.nodeName) {
                    if (a._DT_RowIndex !== k) return [a._DT_RowIndex]; if (a._DT_CellIndex) return [a._DT_CellIndex.row];
                    b = h(a).closest("*[data-dt-row]"); return b.length ? [b.data("dt-row")] : []
                } if (typeof a === "string" && a.charAt(0) === "#") { var i = c.aIds[a.replace(/^#/, "")]; if (i !== k) return [i.idx] } return h(b).filter(a).map(function () { return this._DT_RowIndex }).toArray()
            }, c, e)
        }, 1); c.selector.rows = a; c.selector.opts = b; return c
    }); p("rows().nodes()", function () { return this.iterator("row", function (a, b) { return a.aoData[b].nTr || k }, 1) }); p("rows().data()", function () {
        return this.iterator(!0, "rows", function (a, b) { return ja(a.aoData, b, "_aData") },
            1)
    }); u("rows().cache()", "row().cache()", function (a) { return this.iterator("row", function (b, c) { var d = b.aoData[c]; return "search" === a ? d._aFilterData : d._aSortData }, 1) }); u("rows().invalidate()", "row().invalidate()", function (a) { return this.iterator("row", function (b, c) { da(b, c, a) }) }); u("rows().indexes()", "row().index()", function () { return this.iterator("row", function (a, b) { return b }, 1) }); u("rows().ids()", "row().id()", function (a) {
        for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++) for (var f = 0, g = this[d].length; f <
            g; f++) { var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData); b.push((!0 === a ? "#" : "") + h) } return new t(c, b)
    }); u("rows().remove()", "row().remove()", function () {
        var a = this; this.iterator("row", function (b, c, d) { var e = b.aoData, f = e[c], g, h, i, n, l; e.splice(c, 1); g = 0; for (h = e.length; g < h; g++) if (i = e[g], l = i.anCells, null !== i.nTr && (i.nTr._DT_RowIndex = g), null !== l) { i = 0; for (n = l.length; i < n; i++) l[i]._DT_CellIndex.row = g } qa(b.aiDisplayMaster, c); qa(b.aiDisplay, c); qa(a[d], c, !1); Ua(b); c = b.rowIdFn(f._aData); c !== k && delete b.aIds[c] });
        this.iterator("table", function (a) { for (var c = 0, d = a.aoData.length; c < d; c++) a.aoData[c].idx = c }); return this
    }); p("rows.add()", function (a) { var b = this.iterator("table", function (b) { var c, f, g, h = []; f = 0; for (g = a.length; f < g; f++) c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(oa(b, c)[0]) : h.push(N(b, c)); return h }, 1), c = this.rows(-1); c.pop(); h.merge(c, b); return c }); p("row()", function (a, b) { return db(this.rows(a, b)) }); p("row().data()", function (a) {
        var b = this.context; if (a === k) return b.length && this.length ? b[0].aoData[this[0]]._aData :
            k; b[0].aoData[this[0]]._aData = a; da(b[0], this[0], "data"); return this
    }); p("row().node()", function () { var a = this.context; return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null }); p("row.add()", function (a) { a instanceof h && a.length && (a = a[0]); var b = this.iterator("table", function (b) { return a.nodeName && "TR" === a.nodeName.toUpperCase() ? oa(b, a)[0] : N(b, a) }); return this.row(b[0]) }); var eb = function (a, b) {
        var c = a.context; if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details) c._details.remove(), c._detailsShow =
            k, c._details = k
    }, Wb = function (a, b) {
        var c = a.context; if (c.length && a.length) {
            var d = c[0].aoData[a[0]]; if (d._details) {
                (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach(); var e = c[0], f = new t(e), g = e.aoData; f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"); 0 < D(g, "_details").length && (f.on("draw.dt.DT_details", function (a, b) { e === b && f.rows({ page: "current" }).eq(0).each(function (a) { a = g[a]; a._detailsShow && a._details.insertAfter(a.nTr) }) }), f.on("column-visibility.dt.DT_details",
                    function (a, b) { if (e === b) for (var c, d = ba(b), f = 0, h = g.length; f < h; f++) c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d) }), f.on("destroy.dt.DT_details", function (a, b) { if (e === b) for (var c = 0, d = g.length; c < d; c++) g[c]._details && eb(f, c) }))
            }
        }
    }; p("row().child()", function (a, b) {
        var c = this.context; if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details : k; if (!0 === a) this.child.show(); else if (!1 === a) eb(this); else if (c.length && this.length) {
            var d = c[0], c = c[0].aoData[this[0]], e = [], f = function (a,
                b) { if (h.isArray(a) || a instanceof h) for (var c = 0, k = a.length; c < k; c++) f(a[c], b); else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = ba(d), e.push(c[0])) }; f(a, b); c._details && c._details.detach(); c._details = h(e); c._detailsShow && c._details.insertAfter(c.nTr)
        } return this
    }); p(["row().child.show()", "row().child().show()"], function () { Wb(this, !0); return this }); p(["row().child.hide()", "row().child().hide()"], function () {
        Wb(this, !1);
        return this
    }); p(["row().child.remove()", "row().child().remove()"], function () { eb(this); return this }); p("row().child.isShown()", function () { var a = this.context; return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1 }); var fc = /^([^:]+):(name|visIdx|visible)$/, Xb = function (a, b, c, d, e) { for (var c = [], d = 0, f = e.length; d < f; d++) c.push(B(a, e[d], b)); return c }; p("columns()", function (a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = ""); var b = cb(b), c = this.iterator("table", function (c) {
            var e = a, f = b, g = c.aoColumns,
            j = D(g, "sName"), i = D(g, "nTh"); return bb("column", e, function (a) {
                var b = Qb(a); if (a === "") return X(g.length); if (b !== null) return [b >= 0 ? b : g.length + b]; if (typeof a === "function") { var e = Da(c, f); return h.map(g, function (b, f) { return a(f, Xb(c, f, 0, 0, e), i[f]) ? f : null }) } var k = typeof a === "string" ? a.match(fc) : ""; if (k) switch (k[2]) {
                    case "visIdx": case "visible": b = parseInt(k[1], 10); if (b < 0) { var m = h.map(g, function (a, b) { return a.bVisible ? b : null }); return [m[m.length + b]] } return [$(c, b)]; case "name": return h.map(j, function (a, b) {
                        return a ===
                            k[1] ? b : null
                    }); default: return []
                } if (a.nodeName && a._DT_CellIndex) return [a._DT_CellIndex.column]; b = h(i).filter(a).map(function () { return h.inArray(this, i) }).toArray(); if (b.length || !a.nodeName) return b; b = h(a).closest("*[data-dt-column]"); return b.length ? [b.data("dt-column")] : []
            }, c, f)
        }, 1); c.selector.cols = a; c.selector.opts = b; return c
    }); u("columns().header()", "column().header()", function () { return this.iterator("column", function (a, b) { return a.aoColumns[b].nTh }, 1) }); u("columns().footer()", "column().footer()",
        function () { return this.iterator("column", function (a, b) { return a.aoColumns[b].nTf }, 1) }); u("columns().data()", "column().data()", function () { return this.iterator("column-rows", Xb, 1) }); u("columns().dataSrc()", "column().dataSrc()", function () { return this.iterator("column", function (a, b) { return a.aoColumns[b].mData }, 1) }); u("columns().cache()", "column().cache()", function (a) { return this.iterator("column-rows", function (b, c, d, e, f) { return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c) }, 1) }); u("columns().nodes()",
            "column().nodes()", function () { return this.iterator("column-rows", function (a, b, c, d, e) { return ja(a.aoData, e, "anCells", b) }, 1) }); u("columns().visible()", "column().visible()", function (a, b) {
                var c = this.iterator("column", function (b, c) {
                    if (a === k) return b.aoColumns[c].bVisible; var f = b.aoColumns, g = f[c], j = b.aoData, i, n, l; if (a !== k && g.bVisible !== a) {
                        if (a) { var m = h.inArray(!0, D(f, "bVisible"), c + 1); i = 0; for (n = j.length; i < n; i++) l = j[i].nTr, f = j[i].anCells, l && l.insertBefore(f[c], f[m] || null) } else h(D(b.aoData, "anCells", c)).detach();
                        g.bVisible = a; fa(b, b.aoHeader); fa(b, b.aoFooter); za(b)
                    }
                }); a !== k && (this.iterator("column", function (c, e) { s(c, null, "column-visibility", [c, e, a, b]) }), (b === k || b) && this.columns.adjust()); return c
            }); u("columns().indexes()", "column().index()", function (a) { return this.iterator("column", function (b, c) { return "visible" === a ? aa(b, c) : c }, 1) }); p("columns.adjust()", function () { return this.iterator("table", function (a) { Z(a) }, 1) }); p("column.index()", function (a, b) {
                if (0 !== this.context.length) {
                    var c = this.context[0]; if ("fromVisible" ===
                        a || "toData" === a) return $(c, b); if ("fromData" === a || "toVisible" === a) return aa(c, b)
                }
            }); p("column()", function (a, b) { return db(this.columns(a, b)) }); p("cells()", function (a, b, c) {
                h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null)); h.isPlainObject(b) && (c = b, b = null); if (null === b || b === k) return this.iterator("table", function (b) {
                    var d = a, e = cb(c), f = b.aoData, g = Da(b, e), j = Tb(ja(f, g, "anCells")), i = h([].concat.apply([], j)), l, n = b.aoColumns.length, m, p, u, t, s, v; return bb("cell", d, function (a) {
                        var c = typeof a === "function";
                        if (a === null || a === k || c) { m = []; p = 0; for (u = g.length; p < u; p++) { l = g[p]; for (t = 0; t < n; t++) { s = { row: l, column: t }; if (c) { v = f[l]; a(s, B(b, l, t), v.anCells ? v.anCells[t] : null) && m.push(s) } else m.push(s) } } return m } if (h.isPlainObject(a)) return [a]; c = i.filter(a).map(function (a, b) { return { row: b._DT_CellIndex.row, column: b._DT_CellIndex.column } }).toArray(); if (c.length || !a.nodeName) return c; v = h(a).closest("*[data-dt-row]"); return v.length ? [{ row: v.data("dt-row"), column: v.data("dt-column") }] : []
                    }, b, e)
                }); var d = this.columns(b, c), e = this.rows(a,
                    c), f, g, j, i, n, l = this.iterator("table", function (a, b) { f = []; g = 0; for (j = e[b].length; g < j; g++) { i = 0; for (n = d[b].length; i < n; i++) f.push({ row: e[b][g], column: d[b][i] }) } return f }, 1); h.extend(l.selector, { cols: b, rows: a, opts: c }); return l
            }); u("cells().nodes()", "cell().node()", function () { return this.iterator("cell", function (a, b, c) { return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : k }, 1) }); p("cells().data()", function () { return this.iterator("cell", function (a, b, c) { return B(a, b, c) }, 1) }); u("cells().cache()", "cell().cache()", function (a) {
                a =
                "search" === a ? "_aFilterData" : "_aSortData"; return this.iterator("cell", function (b, c, d) { return b.aoData[c][a][d] }, 1)
            }); u("cells().render()", "cell().render()", function (a) { return this.iterator("cell", function (b, c, d) { return B(b, c, d, a) }, 1) }); u("cells().indexes()", "cell().index()", function () { return this.iterator("cell", function (a, b, c) { return { row: b, column: c, columnVisible: aa(a, c) } }, 1) }); u("cells().invalidate()", "cell().invalidate()", function (a) { return this.iterator("cell", function (b, c, d) { da(b, c, a, d) }) }); p("cell()",
                function (a, b, c) { return db(this.cells(a, b, c)) }); p("cell().data()", function (a) { var b = this.context, c = this[0]; if (a === k) return b.length && c.length ? B(b[0], c[0].row, c[0].column) : k; lb(b[0], c[0].row, c[0].column, a); da(b[0], c[0].row, "data", c[0].column); return this }); p("order()", function (a, b) { var c = this.context; if (a === k) return 0 !== c.length ? c[0].aaSorting : k; "number" === typeof a ? a = [[a, b]] : a.length && !h.isArray(a[0]) && (a = Array.prototype.slice.call(arguments)); return this.iterator("table", function (b) { b.aaSorting = a.slice() }) });
    p("order.listener()", function (a, b, c) { return this.iterator("table", function (d) { Oa(d, a, b, c) }) }); p("order.fixed()", function (a) { if (!a) { var b = this.context, b = b.length ? b[0].aaSortingFixed : k; return h.isArray(b) ? { pre: b } : b } return this.iterator("table", function (b) { b.aaSortingFixed = h.extend(!0, {}, a) }) }); p(["columns().order()", "column().order()"], function (a) { var b = this; return this.iterator("table", function (c, d) { var e = []; h.each(b[d], function (b, c) { e.push([c, a]) }); c.aaSorting = e }) }); p("search()", function (a, b, c, d) {
        var e =
            this.context; return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator("table", function (e) { e.oFeatures.bFilter && ga(e, h.extend({}, e.oPreviousSearch, { sSearch: a + "", bRegex: null === b ? !1 : b, bSmart: null === c ? !0 : c, bCaseInsensitive: null === d ? !0 : d }), 1) })
    }); u("columns().search()", "column().search()", function (a, b, c, d) {
        return this.iterator("column", function (e, f) {
            var g = e.aoPreSearchCols; if (a === k) return g[f].sSearch; e.oFeatures.bFilter && (h.extend(g[f], {
                sSearch: a + "", bRegex: null === b ? !1 : b, bSmart: null === c ?
                    !0 : c, bCaseInsensitive: null === d ? !0 : d
            }), ga(e, e.oPreviousSearch, 1))
        })
    }); p("state()", function () { return this.context.length ? this.context[0].oSavedState : null }); p("state.clear()", function () { return this.iterator("table", function (a) { a.fnStateSaveCallback.call(a.oInstance, a, {}) }) }); p("state.loaded()", function () { return this.context.length ? this.context[0].oLoadedState : null }); p("state.save()", function () { return this.iterator("table", function (a) { za(a) }) }); m.versionCheck = m.fnVersionCheck = function (a) {
        for (var b = m.version.split("."),
            a = a.split("."), c, d, e = 0, f = a.length; e < f; e++) if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d; return !0
    }; m.isDataTable = m.fnIsDataTable = function (a) { var b = h(a).get(0), c = !1; if (a instanceof m.Api) return !0; h.each(m.settings, function (a, e) { var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null, g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null; if (e.nTable === b || f === b || g === b) c = !0 }); return c }; m.tables = m.fnTables = function (a) {
        var b = !1; h.isPlainObject(a) && (b = a.api, a = a.visible); var c = h.map(m.settings,
            function (b) { if (!a || a && h(b.nTable).is(":visible")) return b.nTable }); return b ? new t(c) : c
    }; m.camelToHungarian = J; p("$()", function (a, b) { var c = this.rows(b).nodes(), c = h(c); return h([].concat(c.filter(a).toArray(), c.find(a).toArray())) }); h.each(["on", "one", "off"], function (a, b) { p(b + "()", function () { var a = Array.prototype.slice.call(arguments); a[0] = h.map(a[0].split(/\s/), function (a) { return !a.match(/\.dt\b/) ? a + ".dt" : a }).join(" "); var d = h(this.tables().nodes()); d[b].apply(d, a); return this }) }); p("clear()", function () {
        return this.iterator("table",
            function (a) { pa(a) })
    }); p("settings()", function () { return new t(this.context, this.context) }); p("init()", function () { var a = this.context; return a.length ? a[0].oInit : null }); p("data()", function () { return this.iterator("table", function (a) { return D(a.aoData, "_aData") }).flatten() }); p("destroy()", function (a) {
        a = a || !1; return this.iterator("table", function (b) {
            var c = b.nTableWrapper.parentNode, d = b.oClasses, e = b.nTable, f = b.nTBody, g = b.nTHead, j = b.nTFoot, i = h(e), f = h(f), k = h(b.nTableWrapper), l = h.map(b.aoData, function (a) { return a.nTr }),
            p; b.bDestroying = !0; s(b, "aoDestroyCallback", "destroy", [b]); a || (new t(b)).columns().visible(!0); k.off(".DT").find(":not(tbody *)").off(".DT"); h(E).off(".DT-" + b.sInstance); e != g.parentNode && (i.children("thead").detach(), i.append(g)); j && e != j.parentNode && (i.children("tfoot").detach(), i.append(j)); b.aaSorting = []; b.aaSortingFixed = []; ya(b); h(l).removeClass(b.asStripeClasses.join(" ")); h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone); b.bJUI && (h("th span." + d.sSortIcon +
                ", td span." + d.sSortIcon, g).detach(), h("th, td", g).each(function () { var a = h("div." + d.sSortJUIWrapper, this); h(this).append(a.contents()); a.detach() })); f.children().detach(); f.append(l); g = a ? "remove" : "detach"; i[g](); k[g](); !a && c && (c.insertBefore(e, b.nTableReinsertBefore), i.css("width", b.sDestroyWidth).removeClass(d.sTable), (p = b.asDestroyStripes.length) && f.children().each(function (a) { h(this).addClass(b.asDestroyStripes[a % p]) })); c = h.inArray(b, m.settings); -1 !== c && m.settings.splice(c, 1)
        })
    }); h.each(["column",
        "row", "cell"], function (a, b) { p(b + "s().every()", function (a) { var d = this.selector.opts, e = this; return this.iterator(b, function (f, g, h, i, m) { a.call(e[b](g, "cell" === b ? h : d, "cell" === b ? d : k), g, h, i, m) }) }) }); p("i18n()", function (a, b, c) { var d = this.context[0], a = R(a)(d.oLanguage); a === k && (a = b); c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._); return a.replace("%d", c) }); m.version = "1.10.15"; m.settings = []; m.models = {}; m.models.oSearch = { bCaseInsensitive: !0, sSearch: "", bRegex: !1, bSmart: !0 }; m.models.oRow = {
            nTr: null, anCells: null,
            _aData: [], _aSortData: null, _aFilterData: null, _sFilterRow: null, _sRowStripe: "", src: null, idx: -1
        }; m.models.oColumn = { idx: null, aDataSort: null, asSorting: null, bSearchable: null, bSortable: null, bVisible: null, _sManualType: null, _bAttrSrc: !1, fnCreatedCell: null, fnGetData: null, fnSetData: null, mData: null, mRender: null, nTh: null, nTf: null, sClass: null, sContentPadding: null, sDefaultContent: null, sName: null, sSortDataType: "std", sSortingClass: null, sSortingClassJUI: null, sTitle: null, sType: null, sWidth: null, sWidthOrig: null }; m.defaults =
            {
                aaData: null, aaSorting: [[0, "asc"]], aaSortingFixed: [], ajax: null, aLengthMenu: [10, 25, 50, 100], aoColumns: null, aoColumnDefs: null, aoSearchCols: [], asStripeClasses: null, bAutoWidth: !0, bDeferRender: !1, bDestroy: !1, bFilter: !0, bInfo: !0, bJQueryUI: !1, bLengthChange: !0, bPaginate: !0, bProcessing: !1, bRetrieve: !1, bScrollCollapse: !1, bServerSide: !1, bSort: !0, bSortMulti: !0, bSortCellsTop: !1, bSortClasses: !0, bStateSave: !1, fnCreatedRow: null, fnDrawCallback: null, fnFooterCallback: null, fnFormatNumber: function (a) {
                    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                        this.oLanguage.sThousands)
                }, fnHeaderCallback: null, fnInfoCallback: null, fnInitComplete: null, fnPreDrawCallback: null, fnRowCallback: null, fnServerData: null, fnServerParams: null, fnStateLoadCallback: function (a) { try { return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname)) } catch (b) { } }, fnStateLoadParams: null, fnStateLoaded: null, fnStateSaveCallback: function (a, b) {
                    try {
                        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance +
                            "_" + location.pathname, JSON.stringify(b))
                    } catch (c) { }
                }, fnStateSaveParams: null, iStateDuration: 7200, iDeferLoading: null, iDisplayLength: 10, iDisplayStart: 0, iTabIndex: 0, oClasses: {}, oLanguage: {
                    oAria: { sSortAscending: ": activate to sort column ascending", sSortDescending: ": activate to sort column descending" }, oPaginate: { sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous" }, sEmptyTable: "No data available in table", sInfo: "Showing _START_ to _END_ of _TOTAL_ entries", sInfoEmpty: "Showing 0 to 0 of 0 entries",
                    sInfoFiltered: "(filtered from _MAX_ total entries)", sInfoPostFix: "", sDecimal: "", sThousands: ",", sLengthMenu: "Show _MENU_ entries", sLoadingRecords: "Loading...", sProcessing: "Processing...", sSearch: "Search:", sSearchPlaceholder: "", sUrl: "", sZeroRecords: "No matching records found"
                }, oSearch: h.extend({}, m.models.oSearch), sAjaxDataProp: "data", sAjaxSource: null, sDom: "lfrtip", searchDelay: null, sPaginationType: "simple_numbers", sScrollX: "", sScrollXInner: "", sScrollY: "", sServerMethod: "GET", renderer: null, rowId: "DT_RowId"
            };
    Y(m.defaults); m.defaults.column = { aDataSort: null, iDataSort: -1, asSorting: ["asc", "desc"], bSearchable: !0, bSortable: !0, bVisible: !0, fnCreatedCell: null, mData: null, mRender: null, sCellType: "td", sClass: "", sContentPadding: "", sDefaultContent: null, sName: "", sSortDataType: "std", sTitle: null, sType: null, sWidth: null }; Y(m.defaults.column); m.models.oSettings = {
        oFeatures: {
            bAutoWidth: null, bDeferRender: null, bFilter: null, bInfo: null, bLengthChange: null, bPaginate: null, bProcessing: null, bServerSide: null, bSort: null, bSortMulti: null,
            bSortClasses: null, bStateSave: null
        }, oScroll: { bCollapse: null, iBarWidth: 0, sX: null, sXInner: null, sY: null }, oLanguage: { fnInfoCallback: null }, oBrowser: { bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0 }, ajax: null, aanFeatures: [], aoData: [], aiDisplay: [], aiDisplayMaster: [], aIds: {}, aoColumns: [], aoHeader: [], aoFooter: [], oPreviousSearch: {}, aoPreSearchCols: [], aaSorting: null, aaSortingFixed: [], asStripeClasses: null, asDestroyStripes: [], sDestroyWidth: 0, aoRowCallback: [], aoHeaderCallback: [], aoFooterCallback: [],
        aoDrawCallback: [], aoRowCreatedCallback: [], aoPreDrawCallback: [], aoInitComplete: [], aoStateSaveParams: [], aoStateLoadParams: [], aoStateLoaded: [], sTableId: "", nTable: null, nTHead: null, nTFoot: null, nTBody: null, nTableWrapper: null, bDeferLoading: !1, bInitialised: !1, aoOpenRows: [], sDom: null, searchDelay: null, sPaginationType: "two_button", iStateDuration: 0, aoStateSave: [], aoStateLoad: [], oSavedState: null, oLoadedState: null, sAjaxSource: null, sAjaxDataProp: null, bAjaxDataGet: !0, jqXHR: null, json: k, oAjaxData: k, fnServerData: null,
        aoServerParams: [], sServerMethod: null, fnFormatNumber: null, aLengthMenu: null, iDraw: 0, bDrawing: !1, iDrawError: -1, _iDisplayLength: 10, _iDisplayStart: 0, _iRecordsTotal: 0, _iRecordsDisplay: 0, bJUI: null, oClasses: {}, bFiltered: !1, bSorted: !1, bSortCellsTop: null, oInit: null, aoDestroyCallback: [], fnRecordsTotal: function () { return "ssp" == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length }, fnRecordsDisplay: function () { return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length }, fnDisplayEnd: function () {
            var a =
                this._iDisplayLength, b = this._iDisplayStart, c = b + a, d = this.aiDisplay.length, e = this.oFeatures, f = e.bPaginate; return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c
        }, oInstance: null, sInstance: null, iTabIndex: 0, nScrollHead: null, nScrollFoot: null, aLastSort: [], oPlugins: {}, rowIdFn: null, rowId: null
    }; m.ext = x = {
        buttons: {}, classes: {}, builder: "-source-", errMode: "alert", feature: [], search: [], selector: { cell: [], column: [], row: [] }, internal: {}, legacy: { ajax: null }, pager: {}, renderer: {
            pageButton: {},
            header: {}
        }, order: {}, type: { detect: [], search: {}, order: {} }, _unique: 0, fnVersionCheck: m.fnVersionCheck, iApiIndex: 0, oJUIClasses: {}, sVersion: m.version
    }; h.extend(x, { afnFiltering: x.search, aTypes: x.type.detect, ofnSearch: x.type.search, oSort: x.type.order, afnSortData: x.order, aoFeatures: x.feature, oApi: x.internal, oStdClasses: x.classes, oPagination: x.pager }); h.extend(m.ext.classes, {
        sTable: "dataTable", sNoFooter: "no-footer", sPageButton: "paginate_button", sPageButtonActive: "current", sPageButtonDisabled: "disabled", sStripeOdd: "odd",
        sStripeEven: "even", sRowEmpty: "dataTables_empty", sWrapper: "dataTables_wrapper", sFilter: "dataTables_filter", sInfo: "dataTables_info", sPaging: "dataTables_paginate paging_", sLength: "dataTables_length", sProcessing: "dataTables_processing", sSortAsc: "sorting_asc", sSortDesc: "sorting_desc", sSortable: "sorting", sSortableAsc: "sorting_asc_disabled", sSortableDesc: "sorting_desc_disabled", sSortableNone: "sorting_disabled", sSortColumn: "sorting_", sFilterInput: "", sLengthSelect: "", sScrollWrapper: "dataTables_scroll", sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner", sScrollBody: "dataTables_scrollBody", sScrollFoot: "dataTables_scrollFoot", sScrollFootInner: "dataTables_scrollFootInner", sHeaderTH: "", sFooterTH: "", sSortJUIAsc: "", sSortJUIDesc: "", sSortJUI: "", sSortJUIAscAllowed: "", sSortJUIDescAllowed: "", sSortJUIWrapper: "", sSortIcon: "", sJUIHeader: "", sJUIFooter: ""
    }); var Ea = "", Ea = "", G = Ea + "ui-state-default", ka = Ea + "css_right ui-icon ui-icon-", Yb = Ea + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix"; h.extend(m.ext.oJUIClasses,
        m.ext.classes, {
            sPageButton: "fg-button ui-button " + G, sPageButtonActive: "ui-state-disabled", sPageButtonDisabled: "ui-state-disabled", sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_", sSortAsc: G + " sorting_asc", sSortDesc: G + " sorting_desc", sSortable: G + " sorting", sSortableAsc: G + " sorting_asc_disabled", sSortableDesc: G + " sorting_desc_disabled", sSortableNone: G + " sorting_disabled", sSortJUIAsc: ka + "triangle-1-n", sSortJUIDesc: ka + "triangle-1-s", sSortJUI: ka + "carat-2-n-s",
            sSortJUIAscAllowed: ka + "carat-1-n", sSortJUIDescAllowed: ka + "carat-1-s", sSortJUIWrapper: "DataTables_sort_wrapper", sSortIcon: "DataTables_sort_icon", sScrollHead: "dataTables_scrollHead " + G, sScrollFoot: "dataTables_scrollFoot " + G, sHeaderTH: G, sFooterTH: G, sJUIHeader: Yb + " ui-corner-tl ui-corner-tr", sJUIFooter: Yb + " ui-corner-bl ui-corner-br"
        }); var Nb = m.ext.pager; h.extend(Nb, {
            simple: function () { return ["previous", "next"] }, full: function () { return ["first", "previous", "next", "last"] }, numbers: function (a, b) {
                return [ia(a,
                    b)]
            }, simple_numbers: function (a, b) { return ["previous", ia(a, b), "next"] }, full_numbers: function (a, b) { return ["first", "previous", ia(a, b), "next", "last"] }, first_last_numbers: function (a, b) { return ["first", ia(a, b), "last"] }, _numbers: ia, numbers_length: 7
        }); h.extend(!0, m.ext.renderer, {
            pageButton: {
                _: function (a, b, c, d, e, f) {
                    var g = a.oClasses, j = a.oLanguage.oPaginate, i = a.oLanguage.oAria.paginate || {}, m, l, p = 0, r = function (b, d) {
                        var k, t, u, s, v = function (b) { Va(a, b.data.action, true) }; k = 0; for (t = d.length; k < t; k++) {
                            s = d[k]; if (h.isArray(s)) {
                                u =
                                h("<" + (s.DT_el || "div") + "/>").appendTo(b); r(u, s)
                            } else {
                                m = null; l = ""; switch (s) { case "ellipsis": b.append('<span class="ellipsis">&#x2026;</span>'); break; case "first": m = j.sFirst; l = s + (e > 0 ? "" : " " + g.sPageButtonDisabled); break; case "previous": m = j.sPrevious; l = s + (e > 0 ? "" : " " + g.sPageButtonDisabled); break; case "next": m = j.sNext; l = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled); break; case "last": m = j.sLast; l = s + (e < f - 1 ? "" : " " + g.sPageButtonDisabled); break; default: m = s + 1; l = e === s ? g.sPageButtonActive : "" } if (m !== null) {
                                    u = h("<a>", {
                                        "class": g.sPageButton +
                                        " " + l, "aria-controls": a.sTableId, "aria-label": i[s], "data-dt-idx": p, tabindex: a.iTabIndex, id: c === 0 && typeof s === "string" ? a.sTableId + "_" + s : null
                                    }).html(m).appendTo(b); Ya(u, { action: s }, v); p++
                                }
                            }
                        }
                    }, t; try { t = h(b).find(H.activeElement).data("dt-idx") } catch (u) { } r(h(b).empty(), d); t !== k && h(b).find("[data-dt-idx=" + t + "]").focus()
                }
            }
        }); h.extend(m.ext.type.detect, [function (a, b) { var c = b.oLanguage.sDecimal; return ab(a, c) ? "num" + c : null }, function (a) {
            if (a && !(a instanceof Date) && !cc.test(a)) return null; var b = Date.parse(a);
            return null !== b && !isNaN(b) || M(a) ? "date" : null
        }, function (a, b) { var c = b.oLanguage.sDecimal; return ab(a, c, !0) ? "num-fmt" + c : null }, function (a, b) { var c = b.oLanguage.sDecimal; return Sb(a, c) ? "html-num" + c : null }, function (a, b) { var c = b.oLanguage.sDecimal; return Sb(a, c, !0) ? "html-num-fmt" + c : null }, function (a) { return M(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null }]); h.extend(m.ext.type.search, {
            html: function (a) { return M(a) ? a : "string" === typeof a ? a.replace(Pb, " ").replace(Ca, "") : "" }, string: function (a) {
                return M(a) ?
                    a : "string" === typeof a ? a.replace(Pb, " ") : a
            }
        }); var Ba = function (a, b, c, d) { if (0 !== a && (!a || "-" === a)) return -Infinity; b && (a = Rb(a, b)); a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, ""))); return 1 * a }; h.extend(x.type.order, {
            "date-pre": function (a) { return Date.parse(a) || -Infinity }, "html-pre": function (a) { return M(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + "" }, "string-pre": function (a) { return M(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString() }, "string-asc": function (a, b) {
                return a <
                    b ? -1 : a > b ? 1 : 0
            }, "string-desc": function (a, b) { return a < b ? 1 : a > b ? -1 : 0 }
        }); fb(""); h.extend(!0, m.ext.renderer, {
            header: {
                _: function (a, b, c, d) { h(a.nTable).on("order.dt.DT", function (e, f, g, h) { if (a === f) { e = c.idx; b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass) } }) }, jqueryui: function (a, b, c, d) {
                    h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                    h(a.nTable).on("order.dt.DT", function (e, f, g, h) { if (a === f) { e = c.idx; b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass); b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] == "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI) } })
                }
            }
        }); var Zb = function (a) {
            return "string" === typeof a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g,
                "&quot;") : a
        }; m.render = { number: function (a, b, c, d, e) { return { display: function (f) { if ("number" !== typeof f && "string" !== typeof f) return f; var g = 0 > f ? "-" : "", h = parseFloat(f); if (isNaN(h)) return Zb(f); h = h.toFixed(c); f = Math.abs(h); h = parseInt(f, 10); f = c ? b + (f - h).toFixed(c).substring(2) : ""; return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || "") } } }, text: function () { return { display: Zb } } }; h.extend(m.ext.internal, {
            _fnExternApiFunc: Ob, _fnBuildAjax: ua, _fnAjaxUpdate: nb, _fnAjaxParameters: wb, _fnAjaxUpdateDraw: xb,
            _fnAjaxDataSrc: va, _fnAddColumn: Ga, _fnColumnOptions: la, _fnAdjustColumnSizing: Z, _fnVisibleToColumnIndex: $, _fnColumnIndexToVisible: aa, _fnVisbleColumns: ba, _fnGetColumns: na, _fnColumnTypes: Ia, _fnApplyColumnDefs: kb, _fnHungarianMap: Y, _fnCamelToHungarian: J, _fnLanguageCompat: Fa, _fnBrowserDetect: ib, _fnAddData: N, _fnAddTr: oa, _fnNodeToDataIndex: function (a, b) { return b._DT_RowIndex !== k ? b._DT_RowIndex : null }, _fnNodeToColumnIndex: function (a, b, c) { return h.inArray(c, a.aoData[b].anCells) }, _fnGetCellData: B, _fnSetCellData: lb,
            _fnSplitObjNotation: La, _fnGetObjectDataFn: R, _fnSetObjectDataFn: S, _fnGetDataMaster: Ma, _fnClearTable: pa, _fnDeleteIndex: qa, _fnInvalidate: da, _fnGetRowElements: Ka, _fnCreateTr: Ja, _fnBuildHead: mb, _fnDrawHead: fa, _fnDraw: O, _fnReDraw: T, _fnAddOptionsHtml: pb, _fnDetectHeader: ea, _fnGetUniqueThs: ta, _fnFeatureHtmlFilter: rb, _fnFilterComplete: ga, _fnFilterCustom: Ab, _fnFilterColumn: zb, _fnFilter: yb, _fnFilterCreateSearch: Ra, _fnEscapeRegex: Sa, _fnFilterData: Bb, _fnFeatureHtmlInfo: ub, _fnUpdateInfo: Eb, _fnInfoMacros: Fb, _fnInitialise: ha,
            _fnInitComplete: wa, _fnLengthChange: Ta, _fnFeatureHtmlLength: qb, _fnFeatureHtmlPaginate: vb, _fnPageChange: Va, _fnFeatureHtmlProcessing: sb, _fnProcessingDisplay: C, _fnFeatureHtmlTable: tb, _fnScrollDraw: ma, _fnApplyToChildren: I, _fnCalculateColumnWidths: Ha, _fnThrottle: Qa, _fnConvertToWidth: Gb, _fnGetWidestNode: Hb, _fnGetMaxLenString: Ib, _fnStringToCss: v, _fnSortFlatten: W, _fnSort: ob, _fnSortAria: Kb, _fnSortListener: Xa, _fnSortAttachListener: Oa, _fnSortingClasses: ya, _fnSortData: Jb, _fnSaveState: za, _fnLoadState: Lb, _fnSettingsFromNode: Aa,
            _fnLog: K, _fnMap: F, _fnBindAction: Ya, _fnCallbackReg: z, _fnCallbackFire: s, _fnLengthOverflow: Ua, _fnRenderer: Pa, _fnDataSource: y, _fnRowAttributes: Na, _fnCalculateEnd: function () { }
        }); h.fn.dataTable = m; m.$ = h; h.fn.dataTableSettings = m.settings; h.fn.dataTableExt = m.ext; h.fn.DataTable = function (a) { return h(this).dataTable(a).api() }; h.each(m, function (a, b) { h.fn.DataTable[a] = b }); return h.fn.dataTable
});
