 /**
 *
 * Sidwell Friends School - default_16
 * @link http://sidwell.finalsite.com
 * Built By: Lindsey Noble
 * Project Manager: Mike Hartzler
 * Designer: Julianne Hamilton
 *
 */

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/


jQuery(function($) {

    'use strict';

    var ENHANCEMENTS = ENHANCEMENTS || {};
    var HEADER = HEADER || {};
    var HOME = HOME || {};
    var INIT = INIT || {};
    var SUBNAV = SUBNAV || {};
    var OFFCANVAS = OFFCANVAS || {};
    var UTIL = UTIL || {};

    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navSub = $('.nav-horizontal');
    var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
    var $navMain_level2 = $('.nav-main .fsNavLevel2');
    var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
    var $navSub_title = $navSub.find('> header > .fsElementTitle');
    var bpMobile = 600;
    var bpTablet = 800;
    var isHome = $('.home').length;
    var notComposeMode = !$('.fsComposeMode').length; // if (isHome && notDraftMode)....
    var $noTouch = $('.no-touch');
    var $touch = $('.touch');

    var $header = $('#fsHeader');
    var $siteSearch = $(".site-search");
    var $drawerTrigger = $('.nav-hotlink > header');
    var $mobileMenu = $('.nav-mobile');
    var $landingSlideshow = $('.slideshow-hero-landing');


    //enhancement variables

    var $buttonImageLink = $('.button-image');
    var $buttonEnhancementElement = $('.button-enhancement');
    var $explorePosts = $('.explore-element');

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();




    // ================================
    // Reusable Enhancement Functions
    // ================================

    ENHANCEMENTS = {


        buttonStyled: function() {

            // $buttonImageLink.wrapInner('<div class="button-content" />');
            $buttonImageLink.each(function() {
                var $buttonTitle = $(this).find('.fsElementHeaderContent').clone();
                var $buttonContent = $(this).find('> footer');
                var $buttonLink = $(this).find('a').attr('href');

                $buttonContent.prepend($buttonTitle);

                // $(this).find('.fsElementActionButtonContainer').prependTo(this);

                // $(this).prepend('<a href="' + $buttonLink + '" class="buttonLink"/>');
            });



            $buttonImageLink.doubleTapToGo();
        },

        heroLandingSlideshow: function() {

            $landingSlideshow.each(function() {
              var self = $(this);

              self.insertBefore('.nav-horizontal');

              self.mediaSlider({
                mediaTemplate:[
                  '<article class="slide-hero" style="background-image: url({imgSrc});">',
                    // '<div class="image-wrapper" style="background-image: url({imgSrc});">',
                        '<img src="{imgSrc}" class="img-hero" alt="{captionTitle}" />',
                    // '</div>',
                  '</article>'
                ], // html markup

                callback: function() {

                  self.find('.fsMediaCustomPlayer').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: false,
                    adaptiveHeight: false,
                    autoplay: false,
                    // autoplaySpeed: 5000,
                    // speed: 1000,
                    responsive: [
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            pauseOnHover: false,
                            adaptiveHeight: true,
                          }
                        },
                      ]
                  });
                }
              });
            });

        },

        buttonEnhancement: function() {

            $buttonEnhancementElement.each(function() {
                var $btn2Title = $(this).find('.fsElementTitle').clone();
                var $btn2Content = $(this).find('> footer');
                var $btn2Link = $(this).find('a').attr('href');
                var $btn2Target = $(this).find('a').attr('target');

                $(this).find('a').attr('target="_self"');
                $(this).wrapInner('<div class="button-link-content" />');
                $(this).prepend($btn2Title);

                if (typeof $btn2Target !== typeof undefined && $btn2Target !== false) {
                    $(this).wrapInner('<a href="'+ $btn2Link + '" target="'+ $btn2Target + '" class="button-link-wrapper" />');
                } else {
                    $(this).wrapInner('<a href="'+ $btn2Link + '" class="button-link-wrapper" />');
                }



            });

        },

        quakerEducation: function() {

            $('.aqe-anchor-nav a').smoothScroll({
                speed: 700, // Integer. How fast to complete the scroll in milliseconds
                offset: -200, // Integer. How far to offset the scrolling anchor location in pixels
            });

            var $anchorNav = $('.aqe-anchor-nav');
            var $descAnchor1 = $('.aqe-panel.one');
            var $descAnchor2 = $('.aqe-panel.two');
            var $descAnchor3 = $('.aqe-panel.three');
            var $descAnchor4 = $('.aqe-panel.four');
            var $descAnchor5 = $('.aqe-panel.five');

            $anchorNav.find('a').on('click', function() {
                $anchorNav.find('a').removeClass('on');
                $(this).addClass('on');
            });

            $anchorNav
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $(this.element).addClass('fix-nav');
                  $('body').removeClass('drawer-is-active');
                }
                else {
                  $(this.element).removeClass('fix-nav');
                }

              }, {

            });

            $descAnchor1
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('a').removeClass('on');
                  $anchorNav.find('.anchor-desc1').addClass('on');
                }
                else {
                  $anchorNav.find('.anchor-desc1').removeClass('on');
                }

              }, {
              offset:  130
            });

            $descAnchor2
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('a').removeClass('on');
                  $anchorNav.find('.anchor-desc2').addClass('on');
                }
                else {
                  $anchorNav.find('.anchor-desc2').removeClass('on');
                  $anchorNav.find('.anchor-desc1').addClass('on');
                }

              }, {
              offset:  130
            });

            $descAnchor3
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('a').removeClass('on');
                  $anchorNav.find('.anchor-desc3').addClass('on');
                }
                else {
                  $anchorNav.find('.anchor-desc3').removeClass('on');
                  $anchorNav.find('.anchor-desc2').addClass('on');
                }

              }, {
              offset:  130
            });


            $descAnchor4
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('a').removeClass('on');
                  $anchorNav.find('.anchor-desc4').addClass('on');
                }
                else {
                  $anchorNav.find('.anchor-desc4').removeClass('on');
                  $anchorNav.find('.anchor-desc3').addClass('on');
                }

              }, {
              offset:  130
            });

            $descAnchor5
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('a').removeClass('on');
                  $anchorNav.find('.anchor-desc5').addClass('on');
                }
                else {
                  $anchorNav.find('.anchor-desc5').removeClass('on');
                  $anchorNav.find('.anchor-desc4').addClass('on');
                }

              }, {
              offset:  130
            });

            $('.posts-custom')
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $anchorNav.find('.anchor-desc5').removeClass('on');
                  $anchorNav.addClass('hide-nav');
                }
                else {
                  $anchorNav.find('.anchor-desc5').addClass('on');
                  $anchorNav.removeClass('hide-nav');
                }

              }, {
              offset:  180
            });

        },

        // ================================
        // Custom Athletics Tab Functions
        // ================================

        customTabs: function() {

          var constAJAXSuccess = function constAJAXSuccess(event, xhr, options, data){
              initTabs();
          },

          initTabs = function initTabs() {

              $('.fsAthleticsEvent.fsList .fsAthleticsOpponents').each(function() {
                $(this).closest('article').find('.fsTitle').append(this);
              });
              $('.fsAthleticsEvent.fsList .fsAthleticsLocations').each(function() {
                $(this).closest('article').find('.fsTitle').append(this);
              });

              $('.fsAthleticsEvent.fsList .fsTitle').each(function() {
                $(this).closest('article').find('.fsAthleticsStatus').prependTo(this);
              });

              $('.fsAthleticsEvent.fsList article').each(function() {
                $('.fsAthleticsAdvantage:contains("Home")').closest('.fsAthleticsAdvantage').addClass('home');
              });

              $('.fsAthleticsEvent.fsList .fsAthleticsResultWrapper').each(function() {
                $(this).closest('article').find('.fsDateTime').prepend(this);
              });

            };

            $(document).ajaxSuccess(constAJAXSuccess);

            initTabs();

      },




    };

    // ================================
    // Header Functions
    // ================================

    HEADER = {

        init: function() {

            // scrollyNav();

            this.headerSearch();
            //this.splitNav();
            this.headerFixed();

            if ( $touch.length && $(window).width() > 899 && $(window).width() < 1201 ) {
                $navMain.find('.fsNavLevel1 > li').doubleTapToGo();
            }

        },

        headerSearch: function() {

            placeholder($siteSearch, "Search the site");
            // // nav-horizontal - mobile toggle
            $siteSearch.find('> header').click(function() {
                $siteSearch.toggleClass('active-search');
            });

            // nav-horizontal remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($siteSearch).length) {
                    $siteSearch.removeClass('active-search');
                }
            });

        },
	    /*
        splitNav: function() {
            $navMain_level2.fsColumns({
              columns: 2,
              addWrapper: true
            });
        },
		*/
        headerFixed: function() {

            $header
              .waypoint(function(direction) {

                if (direction === 'down') {
                  $(this.element).addClass('fix-me');
                }
                else {
                  $(this.element).removeClass('fix-me');
                }

              }, {
              offset:  -120
            });
        }

    };


    // ================================
    // Home
    // ================================

    HOME = {


        init: function() {

            this.heroSlideshow();
            this.buttonVoices();
            this.explorePanel();

        },

        heroSlideshow: function() {

            $('.slideshow-hero').each(function() {
              var self = $(this);

              self.mediaSlider({
                mediaTemplate:[
                  '<article class="slide-hero" style="background-image: url({imgSrc});">',
                    '<div class="image-wrapper" style="background-image: url({imgSrc});">',
                        '<img src="{imgSrc}" class="img-hero" alt="{captionTitle}" />',
                    '</div>',
                    '<div class="caption-wrapper">',
                      '<div class="caption-title">{captionTitle}</div>',
                      '<div class="caption-desc">{captionDesc}</div>',
                    '</div>',
                  '</article>'
                ], // html markup

                callback: function() {

                  self.find('.fsMediaCustomPlayer').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: false,
                    adaptiveHeight: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    speed: 1000,
                    responsive: [
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            pauseOnHover: false,
                            adaptiveHeight: true,
                          }
                        },
                      ]
                  });
                }
              });
            });

        },

        buttonVoices: function() {

            var $buttonVoicesLink = $('.button-voices');

            $buttonVoicesLink.each(function() {
                var $buttonTitle = $(this).find('.fsElementTitle').clone();
                var $buttonContent = $(this).find('> .fsElementContent');
                // var $buttonLink = $(this).find('a').attr('href');
                var $buttonLink = $(this).find('.fsElementFooterContent').clone();
                var $buttonFooter = $(this).find('> footer');
                var $buttonHeader = $(this).find('> header');

                $buttonContent.prepend($buttonTitle);
                $(this).append($buttonLink);
                $buttonHeader.append($buttonFooter);

            });



            $buttonVoicesLink.doubleTapToGo();
        },

        explorePanel: function() {
            $explorePosts.find('> header').prependTo('.explore-element .fsListItems');
            $explorePosts.find('article > .fsThumbnail[data-opens-in="page"]').parent().addClass('open-page');
            $explorePosts.find('article.open-page').doubleTapToGo();
        }

    };


    // ================================
    // Initiation Function
    // ================================

    INIT = {
        init: function() {



            if (notComposeMode) {
                HEADER.init();
                ENHANCEMENTS.buttonStyled();
                UTIL.contentBeforePageTitle();
            }

            SUBNAV.init();
            OFFCANVAS.init();
            UTIL.respondSliders();
            UTIL.timeMeridian();

            if (isHome && notComposeMode) {

                HOME.init();

            }

            if ($landingSlideshow.length && notComposeMode) {
                ENHANCEMENTS.heroLandingSlideshow();
            }

            if ($buttonEnhancementElement.length && notComposeMode) {
                ENHANCEMENTS.buttonEnhancement();
            }

            if ($('.treatment-quaker-edu').length && notComposeMode) {
                ENHANCEMENTS.quakerEducation();
            }

            if ($('.athletic-tabs').length) {
                ENHANCEMENTS.customTabs();
            }

            if ($('.fsDirectory').length) {
                UTIL.directoryCustom();
            }

            if ($('.posts-custom').length) {
                UTIL.postsCustomAjax();
            }



            $('.posts-custom article > .fsThumbnail[data-opens-in="page"]').parent().addClass('open-page');
            $('.posts-custom article.open-page').doubleTapToGo();
        }
    };

    // ================================
    // Off Canvas Menu
    // ================================
    OFFCANVAS = {

        init: function() {
            this.clickHandler();
            this.accordionNav();
        },

        clickHandler: function() {
            // Toggle attribute of the body
            $drawerTrigger.click(function() {
                $body.toggleClass('drawer-is-active');
            });

            // Remove attribute on the bottom if anything other than
            // what is mentioned is clicked on
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#fsMenu, .nav-hotlink > header').length) {
                    $body.removeClass('drawer-is-active');
                }
            });
        },


        accordionNav: function() {

            var $parentNavs = $mobileMenu.find('.fsNavParentPage');

            $parentNavs.each(function(){
                $(this).append('<button class="mobile-toggle" />');
            });

            $('.mobile-toggle').click(function() {
                $(this).parent().toggleClass('open');
            });
        }

    };

    // ================================
    // Sub Navigation
    // ================================

    SUBNAV = {

        init: function() {

            this.title();
            this.mobileNav();

        },

        // Create a section title based on the current page
        title: function() {
            if (sectionTitle.length !== 0) {
                $navSub_title.html(sectionTitle);
            }

            if ($navSub.find('nav .fsNavLevel1').length !== 0) {
                $navSub.removeClass('nav-horizontal-empty');
            } else {
                $navSub.addClass('nav-horizontal-empty');
            }

        },

        mobileNav: function() {
            // nav-horizontal - mobile toggle
            $navSub_title.click(function() {
                $(this).closest($navSub).toggleClass('active-nav');
            });

            // nav-horizontal remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($navSub).length) {
                    $navSub.removeClass('active-nav');
                }
            });

        }

    };




    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

        respondSliders: function() {

            // ================================
            // Responsive Built-in sliders
            // ================================

            // the following takes care of the news/calendar slideshow option
            // and makes them responsive

            var targets = [
                '.fsNews.fsSlideshow',
                '.fsCalendar.fsSlideshow'
            ];


            var bp = [{

                breakpoint: bpTablet,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: bpMobile,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll:1,
                    dots: false
                }
            }];

            for (var i = 0; i < targets.length; i++) {
                $(targets[i] + ' .fsElementSlideshow')
                    .slick('slickSetOption', 'responsive', bp, true);
            }

        },

        timeMeridian: function() {
            $(".fsMeridian").each(function () {
                $(this).html( $(this).html().replace(/AM/g,"a.m.") );
                $(this).html( $(this).html().replace(/PM/g,"p.m.") );
            });
        },

        directoryCustom: function() {


            var constAJAXSuccess = function constAJAXSuccess(event, xhr, options, data){
                initDirectory();
            },

            initDirectory = function initDirectory(){

                $('.fsDirectory').find('.fsConstituentItem:not(.has-class-year)').each(function() {
                    var $constTitle = $(this).find('.fsFullName');
                    var $constHasClassYear = $(this).find('.fsClassOf').parent().addClass('has-class-year');

                    if ($(this).hasClass('has-class-year')) {
                        var constClassYear = $(this).find('.fsClassOf').text().split('Class of ')[1];
                        $constTitle.append("<span class='class-year'> " + constClassYear + "</spand>");
                    }
                });
            };

            $(document).ajaxSuccess(constAJAXSuccess);

            initDirectory();
        },

        contentBeforePageTitle: function() {
            if ($('.fsPageTitle').length && $('.before-page-title').length) {
                $('.before-page-title').insertBefore('.fsPageTitle');
            }
        },

        postsCustomAjax: function() {
            var postAJAXSuccess = function postAJAXSuccess(event, xhr, options, data){
                initPostCustom();
            },

            initPostCustom = function initPostCustom(){
                ElementQueries.init();
            };

            $(document).ajaxSuccess(postAJAXSuccess);

            initPostCustom();
        }

    };

    INIT.init();

}); //jQuery


function Columns(e, t) {
    var n = this;
    n.wrapper, n.numOfCol, n.menuTag, n.newCol, n.itemsPerColumn, n.element = jQuery(e), n.defaults = {
        columns: 2,
        breakAt: 0,
        itemsInColumn: !1,
        addWrapper: !1,
        wrapper: "<div class='col-wrap' />"
    }//, n.settings = $.extend({}, n.defaults, t), n.init()
}

function backgroundImage(e) {
    backgroundElement = e, $(backgroundElement).each(function() {
        var e = $(this).find("img").attr("src");
        $(this).css("background-image", 'url("' + e + '")')
    })
}

function debounce(e, t, n) {
    var i;
    return function() {
        var o = this,
            r = arguments,
            s = function() {
                i = null, n || e.apply(o, r)
            },
            a = n && !i;
        clearTimeout(i), i = setTimeout(s, t), a && e.apply(o, r)
    }
}

function placeholder(e, t) {
    "use strict";
    var n, i, o = 100,
        r = 100;
    n = function s() {
        e.find("input.gsc-input").length ? $.support.placeholder ? e.find("input.gsc-input").attr("placeholder", t) : e.find("input.gsc-input").attr("value", t) : o > 0 && (i = setTimeout(s, r), o -= 1)
    }, i = setTimeout(n, r)
}

function nano(e, t) {
    return e.replace(/\{([\w\.]*)\}/g, function(e, n) {
        for (var i = n.split("."), o = t[i.shift()], r = 0, s = i.length; r < s; r++) o = o[i[r]];
        return "undefined" != typeof o && null !== o ? o : ""
    })
}

function scrollyNav() {
    $("html").addClass("not-fixed");
    var e = ($(window).height(), $(".nav-horizontal").height()),
        t = e;
    $(window).on("scroll", function() {
        $(window).scrollTop() > t ? ($("html").addClass("is-fixed"), $("html").removeClass("not-fixed")) : ($("html").removeClass("is-fixed"), $("html").addClass("not-fixed"))
    })
}
if (window.Modernizr = function(e, t, n) {
        function i(e) {
            g.cssText = e
        }

        function o(e, t) {
            return typeof e === t
        }

        function r(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function s(e, t) {
            for (var i in e) {
                var o = e[i];
                if (!r(o, "-") && g[o] !== n) return "pfx" != t || o
            }
            return !1
        }

        function a(e, t, i) {
            for (var r in e) {
                var s = t[e[r]];
                if (s !== n) return i === !1 ? e[r] : o(s, "function") ? s.bind(i || t) : s
            }
            return !1
        }

        function l(e, t, n) {
            var i = e.charAt(0).toUpperCase() + e.slice(1),
                r = (e + " " + S.join(i + " ") + i).split(" ");
            return o(t, "string") || o(t, "undefined") ? s(r, t) : (r = (e + " " + C.join(i + " ") + i).split(" "), a(r, t, n))
        }
        var c, u, d, f = "2.8.3",
            h = {},
            p = !0,
            m = t.documentElement,
            y = "modernizr",
            v = t.createElement(y),
            g = v.style,
            w = {}.toString,
            b = " -webkit- -moz- -o- -ms- ".split(" "),
            x = "Webkit Moz O ms",
            S = x.split(" "),
            C = x.toLowerCase().split(" "),
            T = {
                svg: "http://www.w3.org/2000/svg"
            },
            E = {},
            A = [],
            k = A.slice,
            $ = function(e, n, i, o) {
                var r, s, a, l, c = t.createElement("div"),
                    u = t.body,
                    d = u || t.createElement("body");
                if (parseInt(i, 10))
                    for (; i--;) a = t.createElement("div"), a.id = o ? o[i] : y + (i + 1), c.appendChild(a);
                return r = ["&#173;", '<style id="s', y, '">', e, "</style>"].join(""), c.id = y, (u ? c : d).innerHTML += r, d.appendChild(c), u || (d.style.background = "", d.style.overflow = "hidden", l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(d)), s = n(c, e), u ? c.parentNode.removeChild(c) : (d.parentNode.removeChild(d), m.style.overflow = l), !!s
            },
            z = function(t) {
                var n = e.matchMedia || e.msMatchMedia;
                if (n) return n(t) && n(t).matches || !1;
                var i;
                return $("@media " + t + " { #" + y + " { position: absolute; } }", function(t) {
                    i = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
                }), i
            },
            j = {}.hasOwnProperty;
        d = o(j, "undefined") || o(j.call, "undefined") ? function(e, t) {
            return t in e && o(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return j.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = k.call(arguments, 1),
                i = function() {
                    if (this instanceof i) {
                        var o = function() {};
                        o.prototype = t.prototype;
                        var r = new o,
                            s = t.apply(r, n.concat(k.call(arguments)));
                        return Object(s) === s ? s : r
                    }
                    return t.apply(e, n.concat(k.call(arguments)))
                };
            return i
        }), E.flexbox = function() {
            return l("flexWrap")
        }, E.flexboxlegacy = function() {
            return l("boxDirection")
        }, E.touch = function() {
            var n;
            return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : $(["@media (", b.join("touch-enabled),("), y, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                n = 9 === e.offsetTop
            }), n
        }, E.cssanimations = function() {
            return l("animationName")
        }, E.csscolumns = function() {
            return l("columnCount")
        }, E.csstransforms = function() {
            return !!l("transform")
        }, E.csstransforms3d = function() {
            var e = !!l("perspective");
            return e && "webkitPerspective" in m.style && $("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
                e = 9 === t.offsetLeft && 3 === t.offsetHeight
            }), e
        }, E.csstransitions = function() {
            return l("transition")
        }, E.video = function() {
            var e = t.createElement("video"),
                n = !1;
            try {
                (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (i) {}
            return n
        }, E.audio = function() {
            var e = t.createElement("audio"),
                n = !1;
            try {
                (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (i) {}
            return n
        }, E.svg = function() {
            return !!t.createElementNS && !!t.createElementNS(T.svg, "svg").createSVGRect
        }, E.inlinesvg = function() {
            var e = t.createElement("div");
            return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == T.svg
        }, E.svgclippaths = function() {
            return !!t.createElementNS && /SVGClipPath/.test(w.call(t.createElementNS(T.svg, "clipPath")))
        };
        for (var P in E) d(E, P) && (u = P.toLowerCase(), h[u] = E[P](), A.push((h[u] ? "" : "no-") + u));
        return h.addTest = function(e, t) {
                if ("object" == typeof e)
                    for (var i in e) d(e, i) && h.addTest(i, e[i]);
                else {
                    if (e = e.toLowerCase(), h[e] !== n) return h;
                    t = "function" == typeof t ? t() : t, "undefined" != typeof p && p && (m.className += " " + (t ? "" : "no-") + e), h[e] = t
                }
                return h
            }, i(""), v = c = null,
            function(e, t) {
                function n(e, t) {
                    var n = e.createElement("p"),
                        i = e.getElementsByTagName("head")[0] || e.documentElement;
                    return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
                }

                function i() {
                    var e = g.elements;
                    return "string" == typeof e ? e.split(" ") : e
                }

                function o(e) {
                    var t = v[e[m]];
                    return t || (t = {}, y++, e[m] = y, v[y] = t), t
                }

                function r(e, n, i) {
                    if (n || (n = t), u) return n.createElement(e);
                    i || (i = o(n));
                    var r;
                    return r = i.cache[e] ? i.cache[e].cloneNode() : p.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e), !r.canHaveChildren || h.test(e) || r.tagUrn ? r : i.frag.appendChild(r)
                }

                function s(e, n) {
                    if (e || (e = t), u) return e.createDocumentFragment();
                    n = n || o(e);
                    for (var r = n.frag.cloneNode(), s = 0, a = i(), l = a.length; s < l; s++) r.createElement(a[s]);
                    return r
                }

                function a(e, t) {
                    t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                        return g.shivMethods ? r(n, e, t) : t.createElem(n)
                    }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(g, t.frag)
                }

                function l(e) {
                    e || (e = t);
                    var i = o(e);
                    return g.shivCSS && !c && !i.hasCSS && (i.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || a(e, i), e
                }
                var c, u, d = "3.7.0",
                    f = e.html5 || {},
                    h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    m = "_html5shiv",
                    y = 0,
                    v = {};
                ! function() {
                    try {
                        var e = t.createElement("a");
                        e.innerHTML = "<xyz></xyz>", c = "hidden" in e, u = 1 == e.childNodes.length || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                        }()
                    } catch (n) {
                        c = !0, u = !0
                    }
                }();
                var g = {
                    elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: d,
                    shivCSS: f.shivCSS !== !1,
                    supportsUnknownElements: u,
                    shivMethods: f.shivMethods !== !1,
                    type: "default",
                    shivDocument: l,
                    createElement: r,
                    createDocumentFragment: s
                };
                e.html5 = g, l(t)
            }(this, t), h._version = f, h._prefixes = b, h._domPrefixes = C, h._cssomPrefixes = S, h.mq = z, h.testProp = function(e) {
                return s([e])
            }, h.testAllProps = l, h.testStyles = $, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + A.join(" ") : ""), h
    }(this, this.document), function(e, t, n) {
        function i(e) {
            return "[object Function]" == y.call(e)
        }

        function o(e) {
            return "string" == typeof e
        }

        function r() {}

        function s(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function a() {
            var e = v.shift();
            g = 1, e ? e.t ? p(function() {
                ("c" == e.t ? f.injectCss : f.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), a()) : g = 0
        }

        function l(e, n, i, o, r, l, c) {
            function u(t) {
                if (!h && s(d.readyState) && (w.r = h = 1, !g && a(), d.onload = d.onreadystatechange = null, t)) {
                    "img" != e && p(function() {
                        x.removeChild(d)
                    }, 50);
                    for (var i in A[n]) A[n].hasOwnProperty(i) && A[n][i].onload()
                }
            }
            var c = c || f.errorTimeout,
                d = t.createElement(e),
                h = 0,
                y = 0,
                w = {
                    t: i,
                    s: n,
                    e: r,
                    a: l,
                    x: c
                };
            1 === A[n] && (y = 1, A[n] = []), "object" == e ? d.data = n : (d.src = n, d.type = e), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function() {
                u.call(this, y)
            }, v.splice(o, 0, w), "img" != e && (y || 2 === A[n] ? (x.insertBefore(d, b ? null : m), p(u, c)) : A[n].push(d))
        }

        function c(e, t, n, i, r) {
            return g = 0, t = t || "j", o(e) ? l("c" == t ? C : S, e, t, this.i++, n, i, r) : (v.splice(this.i++, 0, e), 1 == v.length && a()), this
        }

        function u() {
            var e = f;
            return e.loader = {
                load: c,
                i: 0
            }, e
        }
        var d, f, h = t.documentElement,
            p = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            y = {}.toString,
            v = [],
            g = 0,
            w = "MozAppearance" in h.style,
            b = w && !!t.createRange().compareNode,
            x = b ? h : m.parentNode,
            h = e.opera && "[object Opera]" == y.call(e.opera),
            h = !!t.attachEvent && !h,
            S = w ? "object" : h ? "script" : "img",
            C = h ? "script" : S,
            T = Array.isArray || function(e) {
                return "[object Array]" == y.call(e)
            },
            E = [],
            A = {},
            k = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        f = function(e) {
            function t(e) {
                var t, n, i, e = e.split("!"),
                    o = E.length,
                    r = e.pop(),
                    s = e.length,
                    r = {
                        url: r,
                        origUrl: r,
                        prefixes: e
                    };
                for (n = 0; n < s; n++) i = e[n].split("="), (t = k[i.shift()]) && (r = t(r, i));
                for (n = 0; n < o; n++) r = E[n](r);
                return r
            }

            function s(e, o, r, s, a) {
                var l = t(e),
                    c = l.autoCallback;
                l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = i(o) ? o : o[e] || o[s] || o[e.split("/").pop().split("?")[0]]), l.instead ? l.instead(e, o, r, s, a) : (A[l.url] ? l.noexec = !0 : A[l.url] = 1, r.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (i(o) || i(c)) && r.load(function() {
                    u(), o && o(l.origUrl, a, s), c && c(l.origUrl, a, s), A[l.url] = 2
                })))
            }

            function a(e, t) {
                function n(e, n) {
                    if (e) {
                        if (o(e)) n || (d = function() {
                            var e = [].slice.call(arguments);
                            f.apply(this, e), h()
                        }), s(e, d, t, 0, c);
                        else if (Object(e) === e)
                            for (l in a = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(l) && (!n && !--a && (i(d) ? d = function() {
                                var e = [].slice.call(arguments);
                                f.apply(this, e), h()
                            } : d[l] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), h()
                                }
                            }(f[l])), s(e[l], d, t, l, c))
                    } else !n && h()
                }
                var a, l, c = !!e.test,
                    u = e.load || e.both,
                    d = e.callback || r,
                    f = d,
                    h = e.complete || r;
                n(c ? e.yep : e.nope, !!u), u && n(u)
            }
            var l, c, d = this.yepnope.loader;
            if (o(e)) s(e, 0, d, 0);
            else if (T(e))
                for (l = 0; l < e.length; l++) c = e[l], o(c) ? s(c, 0, d, 0) : T(c) ? f(c) : Object(c) === c && a(c, d);
            else Object(e) === e && a(e, d)
        }, f.addPrefix = function(e, t) {
            k[e] = t
        }, f.addFilter = function(e) {
            E.push(e)
        }, f.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", d = function() {
            t.removeEventListener("DOMContentLoaded", d, 0), t.readyState = "complete"
        }, 0)), e.yepnope = u(), e.yepnope.executeStack = a, e.yepnope.injectJs = function(e, n, i, o, l, c) {
            var u, d, h = t.createElement("script"),
                o = o || f.errorTimeout;
            h.src = e;
            for (d in i) h.setAttribute(d, i[d]);
            n = c ? a : n || r, h.onreadystatechange = h.onload = function() {
                !u && s(h.readyState) && (u = 1, n(), h.onload = h.onreadystatechange = null)
            }, p(function() {
                u || (u = 1, n(1))
            }, o), l ? h.onload() : m.parentNode.insertBefore(h, m)
        }, e.yepnope.injectCss = function(e, n, i, o, s, l) {
            var c, o = t.createElement("link"),
                n = l ? a : n || r;
            o.href = e, o.rel = "stylesheet", o.type = "text/css";
            for (c in i) o.setAttribute(c, i[c]);
            s || (m.parentNode.insertBefore(o, m), p(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, function(e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ResizeSensor = t()
    }(this, function() {
        function e(e, t) {
            var n = Object.prototype.toString.call(e),
                i = "[object Array]" === n || "[object NodeList]" === n || "[object HTMLCollection]" === n || "[object Object]" === n || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements,
                o = 0,
                r = e.length;
            if (i)
                for (; o < r; o++) t(e[o]);
            else t(e)
        }
        if ("undefined" == typeof window) return null;
        var t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                return window.setTimeout(e, 20)
            },
            n = function(i, o) {
                function r() {
                    var e = [];
                    this.add = function(t) {
                        e.push(t)
                    };
                    var t, n;
                    this.call = function() {
                        for (t = 0, n = e.length; t < n; t++) e[t].call()
                    }, this.remove = function(i) {
                        var o = [];
                        for (t = 0, n = e.length; t < n; t++) e[t] !== i && o.push(e[t]);
                        e = o
                    }, this.length = function() {
                        return e.length
                    }
                }

                function s(e, t) {
                    return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
                }

                function a(e, n) {
                    if (e.resizedAttached) return void e.resizedAttached.add(n);
                    e.resizedAttached = new r, e.resizedAttached.add(n), e.resizeSensor = document.createElement("div"), e.resizeSensor.className = "resize-sensor";
                    var i = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
                        o = "position: absolute; left: 0; top: 0; transition: 0s;";
                    e.resizeSensor.style.cssText = i, e.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + i + '"><div style="' + o + '"></div></div><div class="resize-sensor-shrink" style="' + i + '"><div style="' + o + ' width: 200%; height: 200%"></div></div>', e.appendChild(e.resizeSensor), "static" == s(e, "position") && (e.style.position = "relative");
                    var a, l, c, u, d = e.resizeSensor.childNodes[0],
                        f = d.childNodes[0],
                        h = e.resizeSensor.childNodes[1],
                        p = e.offsetWidth,
                        m = e.offsetHeight,
                        y = function() {
                            f.style.width = "100000px", f.style.height = "100000px", d.scrollLeft = 1e5, d.scrollTop = 1e5, h.scrollLeft = 1e5, h.scrollTop = 1e5
                        };
                    y();
                    var v = function() {
                            l = 0, a && (p = c, m = u, e.resizedAttached && e.resizedAttached.call())
                        },
                        g = function() {
                            c = e.offsetWidth, u = e.offsetHeight, a = c != p || u != m, a && !l && (l = t(v)), y()
                        },
                        w = function(e, t, n) {
                            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n)
                        };
                    w(d, "scroll", g), w(h, "scroll", g)
                }
                e(i, function(e) {
                    a(e, o)
                }), this.detach = function(e) {
                    n.detach(i, e)
                }
            };
        return n.detach = function(t, n) {
            e(t, function(e) {
                e.resizedAttached && "function" == typeof n && (e.resizedAttached.remove(n), e.resizedAttached.length()) || e.resizeSensor && (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached)
            })
        }, n
    }), function(e, t) {
        "function" == typeof define && define.amd ? define(["./ResizeSensor.js"], t) : "object" == typeof exports ? module.exports = t(require("./ResizeSensor.js")) : e.ElementQueries = t(e.ResizeSensor)
    }(this, function(e) {
        var t = function() {
            function n(e) {
                e || (e = document.documentElement);
                var t = window.getComputedStyle(e, null).fontSize;
                return parseFloat(t) || 16
            }

            function i(e, t) {
                var i = t.split(/\d/),
                    o = i[i.length - 1];
                switch (t = parseFloat(t), o) {
                    case "px":
                        return t;
                    case "em":
                        return t * n(e);
                    case "rem":
                        return t * n();
                    case "vw":
                        return t * document.documentElement.clientWidth / 100;
                    case "vh":
                        return t * document.documentElement.clientHeight / 100;
                    case "vmin":
                    case "vmax":
                        var r = document.documentElement.clientWidth / 100,
                            s = document.documentElement.clientHeight / 100,
                            a = Math["vmin" === o ? "min" : "max"];
                        return t * a(r, s);
                    default:
                        return t
                }
            }

            function o(e) {
                this.element = e, this.options = {};
                var t, n, o, r, s, a, l, c = 0,
                    u = 0;
                this.addOption = function(e) {
                    var t = [e.mode, e.property, e.value].join(",");
                    this.options[t] = e
                };
                var d = ["min-width", "min-height", "max-width", "max-height"];
                this.call = function() {
                    c = this.element.offsetWidth, u = this.element.offsetHeight, s = {};
                    for (t in this.options) this.options.hasOwnProperty(t) && (n = this.options[t], o = i(this.element, n.value), r = "width" == n.property ? c : u, l = n.mode + "-" + n.property, a = "", "min" == n.mode && r >= o && (a += n.value), "max" == n.mode && r <= o && (a += n.value), s[l] || (s[l] = ""), a && -1 === (" " + s[l] + " ").indexOf(" " + a + " ") && (s[l] += " " + a));
                    for (var e in d) d.hasOwnProperty(e) && (s[d[e]] ? this.element.setAttribute(d[e], s[d[e]].substr(1)) : this.element.removeAttribute(d[e]))
                }
            }

            function r(t, n) {
                t.elementQueriesSetupInformation ? t.elementQueriesSetupInformation.addOption(n) : (t.elementQueriesSetupInformation = new o(t), t.elementQueriesSetupInformation.addOption(n), t.elementQueriesSensor = new e(t, function() {
                    t.elementQueriesSetupInformation.call()
                })), t.elementQueriesSetupInformation.call(), h && p.indexOf(t) < 0 && p.push(t)
            }

            function s(e, t, n, i) {
                "undefined" == typeof m[t] && (m[t] = {}), "undefined" == typeof m[t][n] && (m[t][n] = {}), "undefined" == typeof m[t][n][i] ? m[t][n][i] = e : m[t][n][i] += "," + e
            }

            function a() {
                var e;
                if (document.querySelectorAll && (e = document.querySelectorAll.bind(document)), e || "undefined" == typeof $$ || (e = $$), e || "undefined" == typeof jQuery || (e = jQuery), !e) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
                return e
            }

            function l() {
                var e = a();
                for (var t in m)
                    if (m.hasOwnProperty(t))
                        for (var n in m[t])
                            if (m[t].hasOwnProperty(n))
                                for (var i in m[t][n])
                                    if (m[t][n].hasOwnProperty(i))
                                        for (var o = e(m[t][n][i]), s = 0, l = o.length; s < l; s++) r(o[s], {
                                            mode: t,
                                            property: n,
                                            value: i
                                        })
            }

            function c(t) {
                function n() {
                    var e, n = !1;
                    for (e in i) i.hasOwnProperty(e) && o[e].minWidth && t.offsetWidth > o[e].minWidth && (n = e);
                    if (n || (n = s), a != n)
                        if (l[n]) i[a].style.display = "none", i[n].style.display = "block", a = n;
                        else {
                            var c = new Image;
                            c.onload = function() {
                                i[n].src = r[n], i[a].style.display = "none", i[n].style.display = "block", l[n] = !0, a = n
                            }, c.src = r[n]
                        } else i[n].src = r[n]
                }
                var i = [],
                    o = [],
                    r = [],
                    s = 0,
                    a = -1,
                    l = [];
                for (var c in t.children)
                    if (t.children.hasOwnProperty(c) && t.children[c].tagName && "img" === t.children[c].tagName.toLowerCase()) {
                        i.push(t.children[c]);
                        var u = t.children[c].getAttribute("min-width") || t.children[c].getAttribute("data-min-width"),
                            d = t.children[c].getAttribute("data-src") || t.children[c].getAttribute("url");
                        r.push(d);
                        var f = {
                            minWidth: u
                        };
                        o.push(f), u ? t.children[c].style.display = "none" : (s = i.length - 1, t.children[c].style.display = "block")
                    }
                a = s, t.resizeSensor = new e(t, n), n(), h && p.push(t)
            }

            function u() {
                for (var e = a(), t = e("[data-responsive-image],[responsive-image]"), n = 0, i = t.length; n < i; n++) c(t[n])
            }

            function d(e) {
                var t, n;
                for (e = e.replace(/'/g, '"'); null !== (t = y.exec(e));)
                    for (n = t[1] + t[3], attrs = t[2]; null !== (attrMatch = v.exec(attrs));) s(n, attrMatch[1], attrMatch[2], attrMatch[3])
            }

            function f(e) {
                var t = "";
                if (e)
                    if ("string" == typeof e) e = e.toLowerCase(), -1 === e.indexOf("min-width") && -1 === e.indexOf("max-width") || d(e);
                    else
                        for (var n = 0, i = e.length; n < i; n++) 1 === e[n].type ? (t = e[n].selectorText || e[n].cssText, -1 !== t.indexOf("min-height") || -1 !== t.indexOf("max-height") ? d(t) : -1 === t.indexOf("min-width") && -1 === t.indexOf("max-width") || d(t)) : 4 === e[n].type && f(e[n].cssRules || e[n].rules)
            }
            var h = !1,
                p = [],
                m = {},
                y = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/gim,
                v = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/gim,
                g = !1;
            this.init = function(e) {
                h = "undefined" != typeof e && e;
                for (var t = 0, n = document.styleSheets.length; t < n; t++) try {
                    f(document.styleSheets[t].cssRules || document.styleSheets[t].rules || document.styleSheets[t].cssText)
                } catch (i) {
                    if ("SecurityError" !== i.name) throw i
                }
                if (!g) {
                    var o = document.createElement("style");
                    o.type = "text/css", o.innerHTML = "[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img { width: 100%;}", document.getElementsByTagName("head")[0].appendChild(o), g = !0
                }
                l(), u()
            }, this.update = function(e) {
                this.init(e)
            }, this.detach = function() {
                if (!this.withTracking) throw "withTracking is not enabled. We can not detach elements since we don not store it.Use ElementQueries.withTracking = true; before domready or call ElementQueryes.update(true).";
                for (var e; e = p.pop();) t.detach(e);
                p = []
            }
        };
        t.update = function(e) {
            t.instance.update(e)
        }, t.detach = function(e) {
            e.elementQueriesSetupInformation ? (e.elementQueriesSensor.detach(), delete e.elementQueriesSetupInformation, delete e.elementQueriesSensor) : e.resizeSensor && (e.resizeSensor.detach(), delete e.resizeSensor)
        }, t.withTracking = !1, t.init = function() {
            t.instance || (t.instance = new t), t.instance.init(t.withTracking)
        };
        var n = function(e) {
            if (document.addEventListener) document.addEventListener("DOMContentLoaded", e, !1);
            else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) var t = setInterval(function() {
                /loaded|complete/i.test(document.readyState) && (e(), clearInterval(t))
            }, 10);
            else window.onload = e
        };
        return t.listen = function() {
            n(t.init)
        }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = t : (window.ElementQueries = t, t.listen()), t
    }), function(e) {
        function t(e) {
            return e.replace(/(:|\.)/g, "\\$1")
        }
        var n = "1.5.2",
            i = {},
            o = {
                exclude: [],
                excludeWithin: [],
                offset: 0,
                direction: "top",
                scrollElement: null,
                scrollTarget: null,
                beforeScroll: function() {},
                afterScroll: function() {},
                easing: "swing",
                speed: 400,
                autoCoefficient: 2,
                preventDefault: !0
            },
            r = function(t) {
                var n = [],
                    i = !1,
                    o = t.dir && "left" === t.dir ? "scrollLeft" : "scrollTop";
                return this.each(function() {
                    if (this !== document && this !== window) {
                        var t = e(this);
                        t[o]() > 0 ? n.push(this) : (t[o](1), i = t[o]() > 0, i && n.push(this), t[o](0))
                    }
                }), n.length || this.each(function() {
                    "BODY" === this.nodeName && (n = [this])
                }), "first" === t.el && n.length > 1 && (n = [n[0]]), n
            };
        e.fn.extend({
            scrollable: function(e) {
                var t = r.call(this, {
                    dir: e
                });
                return this.pushStack(t)
            },
            firstScrollable: function(e) {
                var t = r.call(this, {
                    el: "first",
                    dir: e
                });
                return this.pushStack(t)
            },
            smoothScroll: function(n, i) {
                if (n = n || {}, "options" === n) return i ? this.each(function() {
                    var t = e(this),
                        n = e.extend(t.data("ssOpts") || {}, i);
                    e(this).data("ssOpts", n)
                }) : this.first().data("ssOpts");
                var o = e.extend({}, e.fn.smoothScroll.defaults, n),
                    r = e.smoothScroll.filterPath(location.pathname);
                return this.unbind("click.smoothscroll").bind("click.smoothscroll", function(n) {
                    var i = this,
                        s = e(this),
                        a = e.extend({}, o, s.data("ssOpts") || {}),
                        l = o.exclude,
                        c = a.excludeWithin,
                        u = 0,
                        d = 0,
                        f = !0,
                        h = {},
                        p = location.hostname === i.hostname || !i.hostname,
                        m = a.scrollTarget || e.smoothScroll.filterPath(i.pathname) === r,
                        y = t(i.hash);
                    if (a.scrollTarget || p && m && y) {
                        for (; f && u < l.length;) s.is(t(l[u++])) && (f = !1);
                        for (; f && d < c.length;) s.closest(c[d++]).length && (f = !1)
                    } else f = !1;
                    f && (a.preventDefault && n.preventDefault(), e.extend(h, a, {
                        scrollTarget: a.scrollTarget || y,
                        link: i
                    }), e.smoothScroll(h))
                }), this
            }
        }), e.smoothScroll = function(t, n) {
            if ("options" === t && "object" == typeof n) return e.extend(i, n);
            var o, r, s, a, l, c = 0,
                u = "offset",
                d = "scrollTop",
                f = {},
                h = {};
            "number" == typeof t ? (o = e.extend({
                link: null
            }, e.fn.smoothScroll.defaults, i), s = t) : (o = e.extend({
                link: null
            }, e.fn.smoothScroll.defaults, t || {}, i), o.scrollElement && (u = "position", "static" === o.scrollElement.css("position") && o.scrollElement.css("position", "relative"))), d = "left" === o.direction ? "scrollLeft" : d, o.scrollElement ? (r = o.scrollElement, /^(?:HTML|BODY)$/.test(r[0].nodeName) || (c = r[d]())) : r = e("html, body").firstScrollable(o.direction), o.beforeScroll.call(r, o), s = "number" == typeof t ? t : n || e(o.scrollTarget)[u]() && e(o.scrollTarget)[u]()[o.direction] || 0, f[d] = s + c + o.offset, a = o.speed, "auto" === a && (l = f[d] - r.scrollTop(), l < 0 && (l *= -1), a = l / o.autoCoefficient), h = {
                duration: a,
                easing: o.easing,
                complete: function() {
                    o.afterScroll.call(o.link, o)
                }
            }, o.step && (h.step = o.step), r.length ? r.stop().animate(f, h) : o.afterScroll.call(o.link, o)
        }, e.smoothScroll.version = n, e.smoothScroll.filterPath = function(e) {
            return e = e || "", e.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
        }, e.fn.smoothScroll.defaults = o
    }(jQuery), $(".fsCalendar.fsGrid").length) {
    $(".fsCalendar.fsGrid").addClass("smallCal");
    var eventview, scrollUp, onClickGridEvent = function(e) {
            var t, n, i = $(e.target).closest(".fsCalendarDaybox");
            n = i.clone(), t = eventview.offset().top - 16, $(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"), eventview.empty().append(n), i.addClass("selected"), $("html,body").animate({
                scrollTop: t
            }, 450)
        },
        onClickScrollUp = function() {
            var e = $(".fsCalendarMonthBrowser").offset().top - 16;
            $("html,body").animate({
                scrollTop: e
            }, 450)
        },
        onAJAXSuccess = function(e, t, n, i) {
            var o = $(i).hasClass("fsCalendar fsGrid");
            o && initCalendar()
        },
        initCalendar = function() {
            eventview = $('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"), scrollUp = $('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview), scrollUp.on("click", onClickScrollUp), $(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"), $(".fsCalendarEventGrid").on("click", ".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ", onClickGridEvent)
        };
    $(document).ajaxSuccess(onAJAXSuccess), initCalendar()
}
Columns.prototype = {
        init: function() {
            var e = this;
            e.items = e.element.children(), e.classList = e.element.attr("class") ? e.element.attr("class") : "", e.elementTag = e.element.prop("tagName").toLowerCase(), e.items.length < e.settings.breakAt || (e.columnPrep(), e.createColumns(), e.distributeItems())
        },
        columnPrep: function() {
            var e = this;
            e.element.addClass("menu-col column-1"), e.settings.addWrapper && (e.wrapper = $(e.settings.wrapper), e.wrapper.insertBefore(e.element), e.element.appendTo(e.wrapper)), e.settings.itemsInColumn ? e.itemsPerColumn = e.settings.columns : e.itemsPerColumn = Math.ceil(e.items.length / e.settings.columns), e.numOfCol = Math.ceil(e.items.length / e.itemsPerColumn)
        },
        createColumns: function() {
            for (var e = this, t = e.numOfCol; t > 1; t--) e.newCol = $("<" + e.elementTag + ">", {
                "class": e.classList + " menu-col column-" + t
            }), e.newCol.insertAfter(e.element)
        },
        distributeItems: function() {
            var e, t, n = this,
                i = 1;
            $.each(n.items, function(o) {
                o + 1 > n.itemsPerColumn && (t = (o + 1) % n.itemsPerColumn, (1 == t || 1 == n.itemsPerColumn && 0 == t) && (i++, e = n.settings.addWrapper ? n.wrapper.find(".column-" + i) : n.element.siblings(".column-" + i)), $(this).appendTo(e))
            })
        }
    }, $.fn.fsColumns = function(e) {
        this.each(function() {
            new Columns(this, e)
        })
    },
    function(e, t, n, i) {
        e.fn.doubleTapToGo = function(i) {
            return !!("ontouchstart" in t || navigator.msMaxTouchPoints || navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) && (this.each(function() {
                var t = !1;
                e(this).on("click", function(n) {
                    var i = e(this);
                    i[0] != t[0] && (n.preventDefault(), t = i)
                }), e(n).on("click touchstart MSPointerDown", function(n) {
                    for (var i = !0, o = e(n.target).parents(), r = 0; r < o.length; r++) o[r] == t[0] && (i = !1);
                    i && (t = !1)
                })
            }), this)
        }
    }(jQuery, window, document), $.fn.mediaSlider = function(e) {
        slideshowClass = this;
        var t, n, i = 600,
            o = $(slideshowClass).find(".fsMediaCustomPlayer"),
            r = o.attr("data-playlisturl"),
            s = $.extend({
                mediaTemplate: ""
            }, e),
            a = {
                slide: s.mediaTemplate.join("\n")
            };
        o.data("display_loaded", !1), $.getJSON(r, function(e) {
            var r;
            $(window).width() > i ? t = "full" : (t = "mobile", $(window).on("resize", function() {
                var e = $(this).width();
                e > i && !o.data("display_loaded") && !r && ($(window).data("display_loaded", !0), r = !0, o.find("article").each(function() {
                    var e = $(this).find("img").attr("src").replace("/mobile/", "/fullsize/");
                    $(this).find("img").attr("src", e), $(this).attr("style", 'background-image: url("' + e + '");')
                }))
            })), $.each(e.objects, function(i, r) {
                n = "full" === t ? e.objects[i].full_path : e.objects[i].mobile_path, o.append(nano(a.slide, {
                    imgSrc: n,
                    captionTitle: e.objects[i].object_title,
                    captionDesc: e.objects[i].object_description
                }))
            })
        }).done(function() {
            e.callback()
        }).fail(function() {
            o.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign", "center")
        })
    }, ! function() {
        "use strict";

        function e(i) {
            if (!i) throw new Error("No options passed to Waypoint constructor");
            if (!i.element) throw new Error("No element option passed to Waypoint constructor");
            if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + t, this.options = e.Adapter.extend({}, e.defaults, i), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, t += 1
        }
        var t = 0,
            n = {};
        e.prototype.queueTrigger = function(e) {
            this.group.queueTrigger(this, e)
        }, e.prototype.trigger = function(e) {
            this.enabled && this.callback && this.callback.apply(this, e)
        }, e.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete n[this.key]
        }, e.prototype.disable = function() {
            return this.enabled = !1, this
        }, e.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, e.prototype.next = function() {
            return this.group.next(this)
        }, e.prototype.previous = function() {
            return this.group.previous(this)
        }, e.invokeAll = function(e) {
            var t = [];
            for (var i in n) t.push(n[i]);
            for (var o = 0, r = t.length; r > o; o++) t[o][e]()
        }, e.destroyAll = function() {
            e.invokeAll("destroy")
        }, e.disableAll = function() {
            e.invokeAll("disable")
        }, e.enableAll = function() {
            e.invokeAll("enable")
        }, e.refreshAll = function() {
            e.Context.refreshAll()
        }, e.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, e.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, e.adapters = [], e.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, e.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = e
    }(),
    function() {
        "use strict";

        function e(e) {
            window.setTimeout(e, 1e3 / 60)
        }

        function t(e) {
            this.element = e, this.Adapter = o.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, e.waypointContextKey = this.key, i[e.waypointContextKey] = this, n += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var n = 0,
            i = {},
            o = window.Waypoint,
            r = window.onload;
        t.prototype.add = function(e) {
            var t = e.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[t][e.key] = e, this.refresh()
        }, t.prototype.checkEmpty = function() {
            var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                t = this.Adapter.isEmptyObject(this.waypoints.vertical);
            e && t && (this.adapter.off(".waypoints"), delete i[this.key])
        }, t.prototype.createThrottledResizeHandler = function() {
            function e() {
                t.handleResize(), t.didResize = !1
            }
            var t = this;
            this.adapter.on("resize.waypoints", function() {
                t.didResize || (t.didResize = !0, o.requestAnimationFrame(e))
            })
        }, t.prototype.createThrottledScrollHandler = function() {
            function e() {
                t.handleScroll(), t.didScroll = !1
            }
            var t = this;
            this.adapter.on("scroll.waypoints", function() {
                (!t.didScroll || o.isTouch) && (t.didScroll = !0, o.requestAnimationFrame(e))
            })
        }, t.prototype.handleResize = function() {
            o.Context.refreshAll()
        }, t.prototype.handleScroll = function() {
            var e = {},
                t = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var n in t) {
                var i = t[n],
                    o = i.newScroll > i.oldScroll,
                    r = o ? i.forward : i.backward;
                for (var s in this.waypoints[n]) {
                    var a = this.waypoints[n][s],
                        l = i.oldScroll < a.triggerPoint,
                        c = i.newScroll >= a.triggerPoint,
                        u = l && c,
                        d = !l && !c;
                    (u || d) && (a.queueTrigger(r), e[a.group.id] = a.group)
                }
            }
            for (var f in e) e[f].flushTriggers();
            this.oldScroll = {
                x: t.horizontal.newScroll,
                y: t.vertical.newScroll
            }
        }, t.prototype.innerHeight = function() {
            return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
        }, t.prototype.remove = function(e) {
            delete this.waypoints[e.axis][e.key], this.checkEmpty()
        }, t.prototype.innerWidth = function() {
            return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
        }, t.prototype.destroy = function() {
            var e = [];
            for (var t in this.waypoints)
                for (var n in this.waypoints[t]) e.push(this.waypoints[t][n]);
            for (var i = 0, o = e.length; o > i; i++) e[i].destroy()
        }, t.prototype.refresh = function() {
            var e, t = this.element == this.element.window,
                n = this.adapter.offset(),
                i = {};
            this.handleScroll(), e = {
                horizontal: {
                    contextOffset: t ? 0 : n.left,
                    contextScroll: t ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: t ? 0 : n.top,
                    contextScroll: t ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            };
            for (var o in e) {
                var r = e[o];
                for (var s in this.waypoints[o]) {
                    var a, l, c, u, d, f = this.waypoints[o][s],
                        h = f.options.offset,
                        p = f.triggerPoint,
                        m = 0,
                        y = null == p;
                    f.element !== f.element.window && (m = f.adapter.offset()[r.offsetProp]), "function" == typeof h ? h = h.apply(f) : "string" == typeof h && (h = parseFloat(h), f.options.offset.indexOf("%") > -1 && (h = Math.ceil(r.contextDimension * h / 100))), a = r.contextScroll - r.contextOffset, f.triggerPoint = m + a - h, l = p < r.oldScroll, c = f.triggerPoint >= r.oldScroll, u = l && c, d = !l && !c, !y && u ? (f.queueTrigger(r.backward), i[f.group.id] = f.group) : !y && d ? (f.queueTrigger(r.forward), i[f.group.id] = f.group) : y && r.oldScroll >= f.triggerPoint && (f.queueTrigger(r.forward), i[f.group.id] = f.group)
                }
            }
            for (var v in i) i[v].flushTriggers();
            return this
        }, t.findOrCreateByElement = function(e) {
            return t.findByElement(e) || new t(e)
        }, t.refreshAll = function() {
            for (var e in i) i[e].refresh()
        }, t.findByElement = function(e) {
            return i[e.waypointContextKey]
        }, window.onload = function() {
            r && r(), t.refreshAll()
        }, o.requestAnimationFrame = function(t) {
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e;
            n.call(window, t)
        }, o.Context = t
    }(),
    function() {
        "use strict";

        function e(e, t) {
            return e.triggerPoint - t.triggerPoint
        }

        function t(e, t) {
            return t.triggerPoint - e.triggerPoint
        }

        function n(e) {
            this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
        }
        var i = {
                vertical: {},
                horizontal: {}
            },
            o = window.Waypoint;
        n.prototype.add = function(e) {
            this.waypoints.push(e)
        }, n.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, n.prototype.flushTriggers = function() {
            for (var n in this.triggerQueues) {
                var i = this.triggerQueues[n],
                    o = "up" === n || "left" === n;
                i.sort(o ? t : e);
                for (var r = 0, s = i.length; s > r; r += 1) {
                    var a = i[r];
                    (a.options.continuous || r === i.length - 1) && a.trigger([n])
                }
            }
            this.clearTriggerQueues()
        }, n.prototype.next = function(t) {
            this.waypoints.sort(e);
            var n = o.Adapter.inArray(t, this.waypoints),
                i = n === this.waypoints.length - 1;
            return i ? null : this.waypoints[n + 1]
        }, n.prototype.previous = function(t) {
            this.waypoints.sort(e);
            var n = o.Adapter.inArray(t, this.waypoints);
            return n ? this.waypoints[n - 1] : null
        }, n.prototype.queueTrigger = function(e, t) {
            this.triggerQueues[t].push(e)
        }, n.prototype.remove = function(e) {
            var t = o.Adapter.inArray(e, this.waypoints);
            t > -1 && this.waypoints.splice(t, 1)
        }, n.prototype.first = function() {
            return this.waypoints[0]
        }, n.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, n.findOrCreate = function(e) {
            return i[e.axis][e.name] || new n(e)
        }, o.Group = n
    }(),
    function() {
        "use strict";

        function e(e) {
            this.$element = t(e)
        }
        var t = window.jQuery,
            n = window.Waypoint;
        t.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(t, n) {
            e.prototype[n] = function() {
                var e = Array.prototype.slice.call(arguments);
                return this.$element[n].apply(this.$element, e)
            }
        }), t.each(["extend", "inArray", "isEmptyObject"], function(n, i) {
            e[i] = t[i]
        }), n.adapters.push({
            name: "jquery",
            Adapter: e
        }), n.Adapter = e
    }(),
    function() {
        "use strict";

        function e(e) {
            return function() {
                var n = [],
                    i = arguments[0];
                return e.isFunction(arguments[0]) && (i = e.extend({}, arguments[1]), i.handler = arguments[0]), this.each(function() {
                    var o = e.extend({}, i, {
                        element: this
                    });
                    "string" == typeof o.context && (o.context = e(this).closest(o.context)[0]), n.push(new t(o))
                }), n
            }
        }
        var t = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
    }(), $.fn.randomize = function(e) {
        var t = e ? $(this).find(e) : $(this).children(),
            n = t.parent();
        return n.each(function() {
            $(this).children(e).sort(function() {
                return Math.round(Math.random()) - .5
            }).detach().appendTo(this)
        }), this
    },
    function(e) {
        var t = e({});
        e.subscribe = function() {
            t.on.apply(t, arguments)
        }, e.unsubscribe = function() {
            t.off.apply(t, arguments)
        }, e.publish = function() {
            t.trigger.apply(t, arguments)
        }
    }(jQuery);