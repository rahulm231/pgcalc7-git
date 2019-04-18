 /**
 *
 * Central Catholic High School - default_17
 * @link https://centralcatholicnet.finalsite.com
 * Site Template : newclientcustom
 * Built By: Jordan Melendez
 * Project Manager: Jaime Skerker
 * Designer: Nathan Lyttle
 * ==== Git Info ====
 * Branch Name: clients/centralcatholicnet
 * Build version: 3.2.4
 * Git Tag: v3.0-165-gd8cd75921a
 * Last build by: Kosha Burnett
 *
 **/

// Build package info 
window.buildinfo = {
  buildname : 'fs-composer-build',
  ver : '3.2.4',
  template : 'newclientcustom'
};

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/


jQuery(function($) {

    'use strict';

    var HOME;
    var OFFCANVAS;
    var SUBNAV;
    var UTIL;
    var ADA;

    var $html = $('html');
    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navSub = $('.nav-sub');
    var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
    var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
    var $navSub_title = $navSub.find('> header > .fsElementTitle');
    var bpMobile = 600;
    var bpTablet = 800;
    var isHome = $('.home').length;
    var notDraftMode = !$('.fsDraftMode').length; // if (isHome && notDraftMode)....
    var notComposeMode = !$('.fsComposeMode').length;
    var $headerHeight = null;

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();


        // check for buildinfo and add classes to body tag
        (function(){

            if ( window.buildinfo !== undefined ){
                var b = document.getElementsByTagName('body')[0];
                b.setAttribute( 'data-buildver', window.buildinfo.ver );
                b.setAttribute( 'data-sitetemplate', window.buildinfo.template );

                /*
                     // how to style against certain versions
                     body[data-buildver^="2.0"]{
                     margin-top: 100px;
                     }
                 */
            }

        })();

    //Detect iOS
    var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    var android = ['Android'].indexOf(navigator.platform) >= 0;

    if (!iOS) {
      $html.addClass('not-ios');
    } else {
      $html.addClass('is-ios');
    }

    if (android) {
      $html.addClass('is-android');
    }

    //Double Tap To Go
    $('#fsHeader .nav-main .fsNavLevel1 > .fsNavParentPage').doubleTapToGo();

    //Quicklins preventDefault
    $('.quicklinks-nav').find('.fsNavLevel1 > li > a').on('click', function(e) {
      e.preventDefault();
    });

    //Remove Headroom on Tablet
    if ($(window).width() < 1025) {
      $body.find('#fsHeader').removeClass('animated');
      console.log('less');
    } else {
      $body.find('#fsHeader').addClass('animated');
    }

    //For custom-slider: body class to style each slide  at different view widths
    $(window).on('load resize', function() {
      var allClasses = 'custom-slider-desktop custom-slider-tablet custom-slider-portrait custom-slider-mobile';
      var headroomClass = 'animated';

      if ($(window).width() >= 1050) {
        $body.removeClass(allClasses);
        $body.addClass('custom-slider-desktop');
      } else if ($(window).width() < 1050 && $(window).width() >= 800) {
        $body.removeClass(allClasses);
        $body.addClass('custom-slider-tablet');
      } else if ($(window).width() < 800 && $(window).width() >= 500) {
        $body.removeClass(allClasses);
        $body.addClass('custom-slider-portrait');
      } else if ($(window).width() < 500) {
        $body.removeClass(allClasses);
        $body.addClass('custom-slider-mobile');
      }

      //Remove Headroom on Tablet Resize
      if ($(window).width() < 1025) {
        $body.find('#fsHeader').removeClass('animated');
      } else {
        $body.find('#fsHeader').addClass('animated');
      }
    });

    // On Scroll Events
    // ===========================

    $(window).on('scroll', function() {
      //Close Search on Scroll
      $('.top-search-element').removeClass('active');
    });

    //On Resize Events
    $(window).on('load resize', function() {

      if (notComposeMode) {
        //dynamic header height
        $headerHeight = document.getElementById('fsHeader').offsetHeight;

        if ($(window).width() >= 700 ) {
          $('#fsPageBodyWrapper').css('margin-top', ($headerHeight));

          $('.custom-page-pop').appendTo('.hero-slider-container');

        } else {
          $('#fsPageBodyWrapper').css('margin-top', $headerHeight);

          $('.custom-page-pop').insertAfter('.hero-slider-container');

        }
      }

    });

    // On Load Events
    // ===========================
    $(window).on('load', function() {

      if (isHome) {
        //infographics animation
        $('.infographic-container').find('.infographic-box').each(function() {
          var el = $(this);
          var waypoint = new Waypoint.Inview({
            element: el,
            enter: function() {
              el.addClass('animate');

            }
          });
        });

        //latest news animation
        var inview = new Waypoint.Inview({
          element: $('.latest-news-container').find('.headline-cover'),
          enter: function() {
            $('.latest-news-container').find('.headline-cover').addClass('slideIn');
            $('.latest-news-container').find('.headline-callout').addClass('slideIn');
          }
        });

        //testimonial animation
        var testimonialAnimation = new Waypoint({
          element: $('.testimonial-container'),
          offset: 400,
          handler: function() {
            $('.testimonial-container').addClass('slideIn');
          }
        });

        //Social Feeds Animation
        $('.happening-now-container').find('.fsFeed-post').each(function() {
          var el = $(this);
          var waypoint = new Waypoint.Inview({
            element: el,
            enter: function() {
              el.addClass('animate');
            }
          });
        });

        var lowerFeedAnimation = new Waypoint.Inview({
          element: $('.happening-now-container').find('.lower-feed'),
          enter: function() {
            var counter = 0;
            $('.happening-now-container').find('.lower-feed').addClass('animate');
          }
        });
      }

      if ($('.we-are-marist').length) {
        //We are Marist Animation
        var maristAnimation = new Waypoint.Inview({
          element: $('.we-are-marist'),
          entered: function() {
            $('.we-are-marist').find('header').addClass('slideIn');
            $('.we-are-marist').find('.fsElementContent').addClass('slideIn');
          }
        });
      }
    });

    // ================================
    // Home
    // ================================

    HOME = {


        init: function() {
          this.slideshow();
        },

        slideshow: function() {
          $('.hero-slider-container').fsMultimediaSlideshow();
        },

        collegesSlider: function() {
          $('.colleges-slider').each(function() {
            var self = $(this);

            self.mediaSlider({
              mediaTemplate:[
                '<article class="college-slide" style="background-image: url({imgSrc});">',
                  '<img src="{imgSrc}" alt="{captionTitle}" class="college-img" />',
                '</article>'
              ], // html markup
              slick: {
                slidesToShow: 10,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 5000,
                cssEase: 'linear',
                variableWidth: true,
                pauseOnHover: false,
                lazyLoad: 'progressive',
                dots: false
              },
              bp: 0,   //when to pull in mobile size images
              preSlickCallback: function(element) {}, //code to run before slick inits
              callback: function(element) {} //element parameter returns current element
            });
          });
        },


        testimonialSlider: function() {
          var testimonialContainer = $('.testimonial-container');
          var testimonial = $('.testimonial');

          testimonial.each(function() {
            $(this).children().wrapAll('<div class="content-wrapper" />');
          });
		/*
          testimonialContainer.find('> .fsElementContent').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            dots: true,
            arrows: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5000
          });
          */
        },

        latestNews: function() {
          var latestNewsContainer = $('.latest-news-container');
          var firstNewsPost = latestNewsContainer.find('.fsListItems article:first-of-type').clone().addClass('headline-cover');

          //create headline cover photo from 1st news post
          latestNewsContainer.find('> .fsElementContent').prepend(firstNewsPost);

          //prevent page reload on click of large headline image
          latestNewsContainer.find('> .fsElementContent .fsThumbnail').removeAttr('href');

          //redirect click of headline image to post where it came from.
          $('.headline-cover').find('.fsThumbnail').on('click', function(e) {
            latestNewsContainer.find('.fsListItems article:first-of-type .fsThumbnail').trigger('click');
          });
        },

        socialFeeds: function() {
          // use case:
          $('.upper-feed').each(function() {
            var self = $(this);

            self.fsFeedPull(6, {
              feedTemplate:[
                '<article class="fsFeed-post" style="background-image: url({imgSrc})">',
                  '<img src="{imgSrc}" class="feed-img" />',
                  '<div class="feed-content">',
                    '<div class="like-count">{likeCount}</div>',
                    '<div class="comment-count">{commentCount}</div>',
                    '<a href="{fullUrl}" class="feed-source {feedSrc}" target="_blank" >{feedSrc}</a>',
                  '</div>',
                '</article>'
              ], // html markup

              callback: function() {}
            });
          });
        },

        customSlider: function() {

          $('.custom-slider').find('.fsElementContent').append('<div class="slider-controls" />');

          //desktop slider
          $('.custom-slider').each(function() {
            var self = $(this);

            self.mediaSlider({
              mediaTemplate:[
                '<article class="custom-slide" style="background-image: url({imgSrc});">',
                  '<div class="image-wrapper" style="background-image: url({imgSrc});">',
                    '<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />',
                  '</div>',
                  '<div class="caption-wrapper">',
                    '<div class="caption-title">{captionTitle}</div>',
                    '<div class="caption-desc">{captionDesc}</div>',
                  '</div>',
                '</article>'
              ], // html markup
              slick: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
                adaptiveHeight: false,
                appendArrows: $('.custom-slider').find('.slider-controls'),
                responsive: [
                  {
                    breakpoint: 1050,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      adaptiveHeight: true
                    }
                  },
                  {
                    breakpoint: 800,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      adaptiveHeight: true
                    }
                  }
                ]
              },
              bp: 0, //when to pull in mobile size images
              preSlickCallback: function(element) {

                var classCounter = 1;

                $(element).find('article').each(function() {
                  $(this).addClass('item-' + classCounter++);

                  if (classCounter > 3) {
                    classCounter = 1;
                  }
                });
              }, //code to run before slick inits
              callback: function(element) {} //element parameter returns current element
            });
          });
        }

    };

    if (isHome && notComposeMode) {
      HOME.init();
    }

    if (notComposeMode) {
      HOME.latestNews();
      HOME.testimonialSlider();
      HOME.customSlider();
      HOME.collegesSlider();
      HOME.socialFeeds();

    }

    // ================================
    // Off Canvas Menu
    // ================================

    OFFCANVAS = {

        init: function() {
            this.clickHandler();
            this.expandNav();
            this.scrollOrNotScroll();
        },

        clickHandler: function() {
            // Toggle attribute of the body
            $('.drawer-trigger').click(function() {
                $body.toggleClass('drawer-is-active');
            });

            // Remove attribute on the bottom if anything other than
            // what is mentioned is clicked on
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#fsMenu, .drawer-trigger').length) {
                    $body.removeClass('drawer-is-active');
                }
            });
        },

        expandNav: function() {
          $('#fsMenu').find('.fsNavParentPage').each(function() {
            var el = $(this);
            var expandButton = '<button class="expand-nav">Expand</button>';

            $(this).prepend(expandButton);

            $(this).find('.expand-nav').on('click', function(){
              el.toggleClass('open');
            });
          });
        },

        scrollOrNotScroll: function() {
          //get height of mobile menu
          var menuHeight = $('#fsMenu').find('.fsMenu').height();

          //if menu is taller than screen height add scroll
          if (menuHeight > $(window).height()) {
            $('body').addClass('scroll-menu');
          }  else {
            $('body').removeClass('scroll-menu');
          }
        },

    };

    OFFCANVAS.init();

    // Listen for orientation changes
    $(window).resize(function() {
      OFFCANVAS.scrollOrNotScroll();
    });

    // ================================
    // Sub Navigation
    // ================================

    SUBNAV = {

        init: function() {

            this.title();
            this.mobileNav();
            this.tierNav();
            this.breadcrumb();
            this.dropdown();
            this.expandNav();
        },

        // Create a section title based on the current page
        title: function() {
            if (sectionTitle.length !== 0) {
                $navSub_title.html(sectionTitle);
            }

            if ($navSub.find('nav .fsNavLevel1').length !== 0) {
                $navSub.removeClass('nav-sub-empty');
            } else {
                $navSub.addClass('nav-sub-empty');
            }

        },

        mobileNav: function() {
            // nav-sub - mobile toggle
            $navSub_title.click(function() {
                $(this).closest($navSub).toggleClass('active-nav');
            });

            // nav-sub remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($navSub).length) {
                    $navSub.removeClass('active-nav');
                }
            });

        },

        tierNav: function() {
          $('.nav-tier').insertAfter('#fsHeader .fsBanner');
        },

        breadcrumb: function() {
          $('.fsBreadcrumb').prependTo('#fsPageBody');
        },

        dropdown: function() {
          var dropmenu = $('.nav-sub.dropdown');

          if (dropmenu.length && notComposeMode) {
            console.log('there');
            dropmenu.insertBefore('#fsPageContent');
          }
        },

        expandNav: function() {
          $('.nav-sub.dropdown').find('.fsNavParentPage').each(function() {
            var el = $(this);
            var expandButton = '<button class="expand-nav">Expand</button>';

            $(this).prepend(expandButton);

            $(this).find('.expand-nav').on('click', function(){
              el.toggleClass('open');
            });
          });
        }

    };

    if (notComposeMode) {
      SUBNAV.init();
    }

    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

        init: function() {

            this.respondSliders();
            this.photoBlock();
            this.tableOverflow();
            this.searchToggle();
            this.customPagePop();
            //this.megaNav();
            this.fiftyfifty();
        },

        respondSliders: function() {

            // ================================
            // Responsive Built-in sliders
            // ================================

            // the following takes care of the news/calendar slideshow option
            // and makes them responsive

            var targets = [
                '.fsPostElement.fsSlideshow',
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
                    dots: true
                }
            }];

            for (var i = 0; i < targets.length; i++) {
                $(targets[i] + ' .fsElementSlideshow')
                   // .slick('slickSetOption', 'responsive', bp, true);
            }

        },

        photoBlock: function() {
          // find 50/50 content element with photo on left
          // and make the photo a bg image
          var photoBlockLeft = $body.find('.photo-block.left');

          photoBlockLeft.each(function() {
             var imgSrc = $(this).find(' > .fsElementContent img').attr('src');

             $(this).find('> .fsElementContent').css('background-image', 'url(" '+ imgSrc +' ")');
          });

        },

        tableOverflow: function() {
          $('body').find('table').each(function(){
            //created to add overflow property to
            $(this).wrapAll('<div class="table-wrapper" />');
          });
        },

        searchToggle: function() {
          $('.search-trigger').on('click', function() {
            $('.top-search-element').toggleClass('active');
          });
        },

        customPagePop: function() {
          //open/close page pop

          if ($('.custom-page-pop').length) {
            $body.addClass('has-custom-page-pop');
          } else {
            $body.addClass('no-custom-page-pop');
          }

          $('<button class="mobile-pop-trigger">Page Pop</button>').appendTo('#fsPageBody');


          $('button.close-pop').on('click', function(e) {

            $('.custom-page-pop').toggleClass('active');
            $body.toggleClass('active-notification');
          });

          $('button.mobile-pop-trigger').on('click', function(e) {

            $('.custom-page-pop').toggleClass('active');
            $body.toggleClass('active-notification');
          });

          //close page pop on body click
          $(document).on('click', function(e) {
            if (!$(e.target).closest('.custom-page-pop, .mobile-pop-trigger').length) {
              $('.custom-page-pop').removeClass('active');
              $body.removeClass('active-notification');
            }
          });

        },

        megaNav: function() {

          //split nav
          $navMain.find('.fsNavLevel2').columns({
            columns: 2,
            addWrapper: true
          });

          //navPageInfo
          $navMain.find('li').each(function() {
            //inner wrapper
            $(this).find('.fsNavPageInfo').children().wrapAll('<div class="inner-wrapper" />');

            //thumbnail bg
            var imgSrc = $(this).find('.fsNavPageThumbnail img').attr('src');
            $(this).find('.fsNavPageThumbnail').css('background-image', 'url(" ' + imgSrc +' ")');
          });

        },

        headroom: function() {
          //headroom
          $('#fsHeader').headroom({
            tolerance : 5,
            classes: {
              "initial": "animated",
              "pinned": "slideDown",
              "unpinned": "slideUp"
            }
          });
        },

        fiftyfifty: function() {
          // ================================
          // 5050 Slideshow Treatment
          // ================================
          if($(".fiftyfiftySlider").length) {
            var $bpaSlider = $(".fiftyfiftySlider");
            $bpaSlider.each(function() {
              var _self = $(this);
              _self.mediaSlider({
                mediaTemplate:[
                  '<div class="bpa-slide">',
                    '<div class="caption-wrapper">',
                      '<div class="caption-title">{captionTitle}</div>',
                      '<div class="caption-desc">{captionDesc}</div>',
                    '</div>',
                    '<article style="background-image: url({imgSrc});">',
                      '<img src="{imgSrc}" class="bpa-img" />',
                    '</article>',
                  '</div>'
                ],
                callback: function() {
                  _self.find('.fsMediaCustomPlayer').slick({
                    fade:true

                  });
                }
              });
            });
          }
        },

        headerPhoto: function() {
          var headerPhoto = $body.find('.interior-header-photo');
          var imgSrc = headerPhoto.find('img').attr('src');

          headerPhoto.css('background-image', 'url( ' + imgSrc + ' )');

          if (headerPhoto.length) {
            headerPhoto.prependTo('#fsPageBodyWrapper');
            $body.addClass('has-header-photo');
          }

        },

        organizePostsList: function() {
          //not in banners
          var postsList = $('.fsPageContent').find('.fsPostElement');

          postsList.find('.fsListItems article').each(function() {
            var post = $(this);

            post.find('.fsDateTime').insertBefore(post.find('.fsTitle'));
          });
        },

        resuableContentBlock: function() {
          //we are marist block on homepage to be reusable everywhere
          if ($('.we-are-marist').length && !isHome) {
            $('.we-are-marist').insertBefore('#fsFooter');
          }
        }

    };


    if (notComposeMode) {
      UTIL.init();
      UTIL.headerPhoto();
      UTIL.organizePostsList();
      UTIL.resuableContentBlock();

      $(window).on('load', function() {
        UTIL.headroom();
      });
    }

    ADA = {
      init: function() {
        this.accessibilityMenu();
        this.googleTranslateAccessibility();
      },

      accessibilityMenu: function() {

          if (notDraftMode) {
              $navMain.find(".fsNavLevel1").accessibility_menu();
              $body.find(".quicklinks-nav .fsNavLevel1").accessibility_menu();
          }

      },

      googleTranslateAccessibility: function() {

          if($("#google_translate_element").length) {
              var maxTranslateAttempts = 50;
              var checkTranslate = setInterval(function() {
                  maxTranslateAttempts -= 1;
                  if($("#google_translate_element select.goog-te-combo").length) {
                      clearInterval(checkTranslate);
                      if((!$("#google_translate_element select.goog-te-combo").parent()[0].length && $("#google_translate_element select.goog-te-combo").parent()[0].tagName !== "LABEL") && (!$("#google_translate_element select.goog-te-combo").prev().length || $("#google_translate_element select.goog-te-combo").prev()[0].tagName !== "LABEL")) {
                          $("#google_translate_element select.goog-te-combo").before('<label for="select-translate">Translate Website</label>');
                          $("#google_translate_element select.goog-te-combo").attr("id","select-translate");
                      }
                  } else if(maxTranslateAttempts === 0) {
                      clearInterval(checkTranslate);
                  }
              }, 200);
          }
      },

    };

    ADA.init();

}); //jQuery


function backgroundImage(t) {
    backgroundElement = t, $(backgroundElement).each(function() {
        var t = $(this).find("img").attr("src");
        $(this).css("background-image", 'url("' + t + '")')
    })
}

function debounce(t, e, n) {
    var i;
    return function() {
        var o = this,
            s = arguments,
            r = function() {
                i = null, n || t.apply(o, s)
            },
            a = n && !i;
        clearTimeout(i), i = setTimeout(r, e), a && t.apply(o, s)
    }
}

function placeholder(t, e) {
    "use strict";
    var n, i, o = 100,
        s = 100;
    n = function r() {
        t.find("input.gsc-input").length ? $.support.placeholder ? t.find("input.gsc-input").attr("placeholder", e) : t.find("input.gsc-input").attr("value", e) : o > 0 && (i = setTimeout(r, s), o -= 1)
    }, i = setTimeout(n, s)
}

function nano(t, e) {
    return t.replace(/\{([\w\.]*)\}/g, function(t, n) {
        for (var i = n.split("."), o = e[i.shift()], s = 0, r = i.length; s < r; s++) o = o[i[s]];
        return "undefined" != typeof o && null !== o ? o : ""
    })
}
if (function(t) {
        t && (t.fn.headroom = function(e) {
            return this.each(function() {
                var n = t(this),
                    i = n.data("headroom"),
                    o = "object" == typeof e && e;
                o = t.extend(!0, {}, Headroom.options, o), i || (i = new Headroom(this, o), i.init(), n.data("headroom", i)), "string" == typeof e && (i[e](), "destroy" === e && n.removeData("headroom"))
            })
        }, t("[data-headroom]").each(function() {
            var e = t(this);
            e.headroom(e.data())
        }))
    }(window.Zepto || window.jQuery), jQuery(".fsCalendar.fsGrid").length) {
    jQuery(".fsCalendar.fsGrid").addClass("smallCal");
    var eventview, scrollUp, onClickGridEvent = function(t) {
            var e, n, i = $(t.target).closest(".fsCalendarDaybox");
            n = i.clone(), e = eventview.offset().top - 16, $(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"), eventview.empty().append(n), i.addClass("selected"), $("html,body").animate({
                scrollTop: e
            }, 450)
        },
        onClickScrollUp = function() {
            var t = $(".fsCalendarMonthBrowser").offset().top - 16;
            $("html,body").animate({
                scrollTop: t
            }, 450)
        },
        onAJAXSuccess = function(t, e, n, i) {
            var o = $(i).hasClass("fsCalendar fsGrid");
            o && initCalendar()
        },
        initCalendar = function() {
            eventview = $('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"), scrollUp = $('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview), scrollUp.on("click", onClickScrollUp), $(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"), $(".fsCalendarEventGrid").on("click", ".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ", onClickGridEvent)
        };
    $(document).ajaxSuccess(onAJAXSuccess), initCalendar()
}! function(t) {
    "use strict";

    function e(e, n) {
        var i = this;
        i.wrapper, i.numOfCol, i.menuTag, i.newCol, i.itemsPerColumn, i.element = t(e), i.defaults = {
            columns: 2,
            breakAt: 0,
            itemsInColumn: !1,
            addWrapper: !1,
            wrapper: "<div class='col-wrap' />"
        }, i.settings = t.extend({}, i.defaults, n), i.init()
    }
    e.prototype = {
        init: function() {
            var t = this;
            t.items = t.element.children(), t.classList = t.element.attr("class") ? t.element.attr("class") : "", t.elementTag = t.element.prop("tagName").toLowerCase(), t.items.length < t.settings.breakAt || (t.columnPrep(), t.createColumns(), t.distributeItems())
        },
        columnPrep: function() {
            var e = this;
            e.element.addClass("menu-col column-1"), e.settings.addWrapper && (e.wrapper = t(e.settings.wrapper), e.wrapper.insertBefore(e.element), e.element.appendTo(e.wrapper)), e.settings.itemsInColumn ? e.itemsPerColumn = e.settings.columns : e.itemsPerColumn = Math.ceil(e.items.length / e.settings.columns), e.numOfCol = Math.ceil(e.items.length / e.itemsPerColumn)
        },
        createColumns: function() {
            for (var e = this, n = e.numOfCol; n > 1; n--) e.newCol = t("<" + e.elementTag + ">", {
                "class": e.classList + " menu-col column-" + n
            }), e.newCol.insertAfter(e.element)
        },
        distributeItems: function() {
            var e, n, i = this,
                o = 1;
            t.each(i.items, function(s) {
                s + 1 > i.itemsPerColumn && (n = (s + 1) % i.itemsPerColumn, (1 == n || 1 == i.itemsPerColumn && 0 == n) && (o++, e = i.settings.addWrapper ? i.wrapper.find(".column-" + o) : i.element.siblings(".column-" + o)), t(this).appendTo(e))
            })
        }
    }, t.fn.columns = function(t) {
        this.each(function() {
            new e(this, t)
        })
    }
}(jQuery),
function(t, e, n, i) {
    t.fn.doubleTapToGo = function(i) {
        return !!("ontouchstart" in e || navigator.msMaxTouchPoints || navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) && (this.each(function() {
            var e = !1;
            t(this).on("click", function(n) {
                var i = t(this);
                i[0] != e[0] && (n.preventDefault(), e = i)
            }), t(n).on("click touchstart MSPointerDown", function(n) {
                for (var i = !0, o = t(n.target).parents(), s = 0; s < o.length; s++) o[s] == e[0] && (i = !1);
                i && (e = !1)
            })
        }), this)
    }
}(jQuery, window, document), /*$.fn.fsFeedPull = function(t, e) {
        targetClass = this;
        var n = $(targetClass),
            i = n.attr("data-feed-url"),
            o = {
                per: t,
                page: 1
            },
            s = $.extend({
                feedTemplate: ""
            }, e),
            r = {
                slide: s.feedTemplate.join("\n")
            };
        $.getJSON(i, o, function(t) {
            $.each(t.posts.items, function(e, i) {
                n.find(">.fsElementContent").append(nano(r.slide, {
                    fullUrl: t.posts.items[e].full_url,
                    imgSrc: t.posts.items[e].image,
                    likeCount: t.posts.items[e].like_count,
                    commentCount: t.posts.items[e].comment_count,
                    feedDesc: t.posts.items[e].unformatted_message,
                    feedSrc: t.posts.items[e].source.source
                }))
            })
        }).done(function() {
            e.callback()
        }).fail(function() {
            n.append("<span>Sorry, an error occured when retrieving this feed data. Please refresh the page to try again.</span>").css("textAlign", "center")
        })
    }, */
    function(t) {
        "use strict";

        function e(e, n) {
            var i = this,
                o = {
                    mediaTemplate: ['<article class="universal-slide">', '<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />', '<div class="caption-wrapper">', '<div class="caption-title">{captionTitle}</div>', '<div class="caption-desc">{captionDesc}</div>', "</div>", "</article>"],
                    bp: 600,
                    callback: null,
                    url: null
                };
            i.element = e, i.container = e, i.settings = t.extend(!0, {}, o, n), i.url = "", i.init()
        }

        function n(t) {
            var e = document.createElement("div");
            return e.innerHTML = t, e.childNodes[0]
        }
        e.prototype = {
            init: function() {
                var t = this;
                t.element.classList.contains("fsMedia") ? (t.container = t.element.getElementsByClassName("fsMediaCustomPlayer")[0], t.url = t.container.getAttribute("data-playlisturl")) : t.settings.url && (t.url = t.settings.url), t.html = Array.isArray(t.settings.mediaTemplate) ? t.settings.mediaTemplate.join("\n") : t.settings.mediaTemplate, t.getContent()
            },
            getContent: function() {
                var e = this;
                t.getJSON(e.url).done(function(t) {
                    for (var i = t.objects, o = 0; o < i.length; o++) {
                        var s = n(nano(e.html, {
                            imgSrc: window.innerWidth > e.settings.bp ? i[o].full_path : i[o].mobile_path,
                            captionTitle: i[o].object_title,
                            captionDesc: i[o].object_description
                        }));
                        0 == s.textContent.trim().length && s.getElementsByClassName("caption-wrapper").length && s.getElementsByClassName("caption-wrapper")[0].classList.add("is-empty"), e.container.appendChild(s)
                    }
                    e.callback()
                })
            },
            callback: function() {
                var t = this;
                "function" == typeof t.settings.callback && t.settings.callback.call()
            }
        }, t.fn.mediaPull = function(t) {
            this.each(function() {
                new e(this, t)
            })
        }
    }(jQuery), /* $.fn.fsMultimediaSlideshow = function(t) {
        function e(t, e) {
            var n = t.find(".fsMediaCustomPlayer"),
                i = n.attr("data-playlisturl");
            n.data("display_loaded", !1), $.getJSON(i).done(function(i) {
                e && "function" == typeof e && e(i, t, n)
            }).fail(function() {
                n.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign", "center")
            })
        }

        function n(t, e, n, i) {
            var o, s, r = 600,
                a = $(window);
            a.width() > r ? o = "full" : (o = "mobile", a.on("resize", function() {
                a.width() > r && !n.data("display_loaded") && (a.data("display_loaded", !0), $(".fsMediaCustomPlayer").find("article").each(function() {
                    var t = $(this),
                        e = t.find("img").attr("src").replace("/mobile/", "/fullsize/");
                    t.find("img").attr("src", e), t.css("background-image", 'url("' + e + '")'), t.children(".multimedia-img-wrapper").css("background-image", 'url("' + e + '")')
                }))
            }));
            var l = $();
            return $.each(t.objects, function(e, n) {
                s = "full" === o ? t.objects[e].full_path : t.objects[e].mobile_path;
                var r = nano(i.slide, {
                    imgSrc: s,
                    captionTitle: t.objects[e].object_title,
                    captionDesc: t.objects[e].object_description
                });
                l = l.add(r)
            }), l
        }
        var i = {
            bp: 0
        };
        $(this).each(function(o) {
            this.settings = $.extend({}, i, t);
            var s = $(this),
                r = s.children(".fsElementContent"),
                a = 0,
                l = !1,
                c = $(window),
                d = this.settings.bp,
                u = $(".no-touch"),
                f = $(".touch"),
                p = {
                    slide: ['<article class="multimedia-slide" style="background-image: url({imgSrc});">', '<div class="multimedia-controls">', '<button class="slider-prev-btn">Prev</button>', '<button class="slider-play-btn">Play</button>', '<button class="slider-pause-btn">Pause</button>', '<button class="slider-next-btn">Next</button>', "</div>", '<div class="multimedia-img-wrapper inner-wrapper" style="background-image: url({imgSrc});"><img src="{imgSrc}" class="multimedia-img" /></div>', "</article>"].join("\n")
                };
            s.addClass("fsMediaCustomPlayer"), r.on({
                init: function(t, e) {
                    r.find("video").each(function() {
                        $(this).prop("muted", !0)
                    }), $(".slider-prev-btn").on("click", function() {
                        r.slick("slickPrev")
                    }), $(".slider-next-btn").on("click", function() {
                        r.slick("slickNext")
                    }), $(".video-prev-btn").on("click", function() {
                        r.slick("slickPrev")
                    }), $(".video-next-btn").on("click", function() {
                        r.slick("slickNext")
                    }), $(".video-mute").on("click", function() {
                        $(this).parents(".hero-slider-container").find(".video-mute, .video-unmute").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").prop("muted", !0)
                    }), $(".video-unmute").on("click", function() {
                        $(this).parents(".hero-slider-container").find(".video-mute, .video-unmute").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").prop("muted", !1)
                    }), $(".pausebutton").on("click", function() {
                        $(this).parents(".hero-slider-container").find(".playbutton, .pausebutton").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").get(0).pause()
                    }), $(".pausebutton").on("keydown", function(t) {
                        var e = t.keyCode;
                        32 != e && 13 != e || ($(this).parents(".hero-slider-container").find(".playbutton, .pausebutton").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").get(0).pause())
                    }), $(".playbutton").on("click", function() {
                        $(this).parents(".hero-slider-container").find(".playbutton, .pausebutton").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").get(0).play()
                    }), $(".playbutton").on("keydown", function(t) {
                        var e = t.keyCode;
                        32 != e && 13 != e || ($(this).parents(".hero-slider-container").find(".playbutton, .pausebutton").each(function() {
                            $(this).toggle()
                        }), $(this).parent().parent().parent().find("video").get(0).play())
                    }), $(".slider-pause-btn").on("click", function() {
                        console.log("paused"), $(this).parents(".hero-slider-container").find(".slider-play-btn, .slider-pause-btn").each(function() {
                            $(this).toggle()
                        }), r.slick("slickSetOption", "autoplay", !1).slick("slickPause")
                    }), $(".slider-pause-btn").on("keydown", function(t) {
                        var e = t.keyCode;
                        32 != e && 13 != e || ($(this).parents(".hero-slider-container").find(".slider-play-btn, .slider-pause-btn").each(function() {
                            $(this).toggle()
                        }), r.slick("slickSetOption", "autoplay", !1).slick("slickPause"))
                    }), $(".slider-play-btn").on("click", function() {
                        $(this).parents(".hero-slider-container").find(".slider-play-btn, .slider-pause-btn").each(function() {
                            $(this).toggle()
                        }), r.slick("slickSetOption", "autoplay", !0).slick("slickPlay")
                    }), $(".slider-play-btn").on("keydown", function(t) {
                        var e = t.keyCode;
                        32 != e && 13 != e || ($(this).parents(".hero-slider-container").find(".slider-play-btn, .slider-pause-btn").each(function() {
                            $(this).toggle()
                        }), r.slick("slickSetOption", "autoplay", !0).slick("slickPlay"))
                    }), $("html.is-ios").length && r.find("video").each(function() {
                        $(this).prop("muted", !1)
                    }), $("html.is-android").length && r.find("video").each(function() {
                        $(this).prop("muted", !1)
                    });
                    var n = e.$slides.eq(e.currentSlide).find("video");
                    c.width() > d && n.length && u.length && (n[0].play(), n.on("ended", function(t) {
                        e.slickNext()
                    }))
                },
                beforeChange: function(t, e, n, i) {
                    var o = e.$slides.eq(e.currentSlide).find("video");
                    c.width() > d && (o.length && u.length ? o[0].pause() : e.slickPause())
                },
                afterChange: function(t, e, n) {
                    var i = e.$slides.eq(e.currentSlide).find("video");
                    c.width() > d && i.length && u.length && (i[0].play(), i.on("ended", function(t) {
                        e.slickNext()
                    }))
                },
                checkQueue: function(t) {
                    l && (a || r.slick({
                        dots: !1,
                        arrows: !1,
                        appendArrows: s.children(".multimedia-controls"),
                        fade: !0,
                        adaptiveHeight: !1,
                        accessibility: !1,
                        autoplay: !1,
                        pauseOnHover: !1,
                        speed: 1e3,
                        autoplaySpeed: 8e3,
                        responsive: [{
                            breakpoint: 600,
                            settings: {
                                dots: !1,
                                arrows: !1,
                                appendArrows: s.children(".multimedia-controls"),
                                fade: !0,
                                adaptiveHeight: !1,
                                accessibility: !1,
                                autoplay: !1,
                                pauseOnHover: !1,
                                speed: 1e3,
                                autoplaySpeed: 8e3
                            }
                        }]
                    }))
                }
            }), r.children().each(function(t) {
                var i = $(this);
                i.hasClass("fsMedia") && i.children(".fsElementContent").children(".fsMediaContainer").hasClass("fsMediaCustomPlayer") ? (a++, e(i, function(t, e, o) {
                    var s = $(window);
                    1 === t.group_type ? (i.html(n(t, e, o, p)), i.children().eq(0).unwrap()) : 3 === t.group_type && $.each(t.objects, function(e) {
                        var n, o = t.objects[e],
                            r = o.mobile_path;
                        n = s.width() > 600 && u.length ? o.hd_video_path : f.length ? o.mobile_video_path : o.mobile_video_path;
                        var a = $('<article class="multimedia-slide video-slide" />'),
                            l = $('<div class="multimedia-controls"><button class="video-prev-btn">Prev</button><button class="playbutton">Play</button><button class="pausebutton">Pause</button><button class="video-next-btn">Next</button></div>'),
                            c = $('<div class="video-wrapper inner-wrapper" style="background-image: url(' + r + ')"><video src=' + n + ' /><button class="sound-button video-mute">Mute</button><button class="sound-button video-unmute">Unmute</button></div>');
                        $('<div class="caption-wrapper"><div class="caption-title">' + o.object_title + '</div><div class="caption-desc">' + o.object_description + "</div></div>");
                        i.html(a.append(l, c)), i.children().eq(0).unwrap(), c[0].muted = !1, c[0].controls = !1, c[0].autoplay = !1
                    }), a--, r.trigger("checkQueue")
                })) : i.remove()
            }), l = !0
        })
    }, */
    function(t) {
        "use strict";

        function e(e, n) {
            var i, o = this;
            o.element = e, o.isMedia = !1, o.html = "", i = {
                slidesToShow: 1,
                accessibility: !0,
                dots: !0,
                arrows: !0,
                infinite: !0,
                autoplay: !1,
                pauseOnHover: !1,
                adaptiveHeight: !0
            }, o.defaults = {
                mediaTemplate: ['<article class="universal-slide">', '<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />', '<div class="caption-wrapper">', '<div class="caption-title">{captionTitle}</div>', '<div class="caption-desc">{captionDesc}</div>', "</div>", "</article>"],
                slick: i,
                bp: 600,
                preSlickCallback: null,
                callback: null
            }, o.settings = t.extend(!0, {}, o.defaults, n), o.init()
        }

        function n(t) {
            var e = document.createElement("div");
            return e.innerHTML = t, e.childNodes[0]
        }

        function i(e) {
            e.classList.toggle("slider-playing"), e.classList.toggle("slider-paused"), e.classList.contains("slider-playing") ? t(e).slick("slickPlay") : t(e).slick("slickPause")
        }
        e.prototype = {
            init: function() {
                var e = this;
                e.element.classList.contains("fsMedia") ? e.isMedia = !0 : e.element.classList.contains("fsMediaCustomPlayer") && (e.element = t(e.element).parents(".fsMedia")[0], e.isMedia = !0), e.slider = e.isMedia ? e.element.getElementsByClassName("fsMediaCustomPlayer")[0] : e.element, e.slider.classList.add("fsCustomSlider"), e.html = Array.isArray(e.settings.mediaTemplate) ? e.settings.mediaTemplate.join("\n") : e.settings.mediaTemplate, e.isMedia ? e.sliderPrep() : document.body.classList.contains("fsDraftMode") || e.slickInit()
            },
            sliderPrep: function() {
                var e = this;
                t(e.element).mediaPull({
                    mediaTemplate: e.settings.mediaTemplate,
                    bp: e.settings.bp,
                    callback: function() {
                        e.slickInit()
                    }
                })
            },
            slickInit: function() {
                var e = this,
                    o = t(e.slider);
                o.on("init", function(t, o) {
                    var s = n("<button class='slider-play-btn'>Play</button>");
                    s.addEventListener("click", function() {
                        i(e.slider)
                    }), o.options.autoplay ? e.slider.classList.add("slider-playing") : e.slider.classList.add("slider-paused"), "function" == typeof e.settings.callback && e.settings.callback.call(e, e.element)
                }), "function" == typeof e.settings.preSlickCallback && e.settings.preSlickCallback.call(e, e.element), o.slick(e.settings.slick)
            }
        }, t.fn.mediaSlider = function(t) {
            this.each(function() {
                new e(this, t)
            })
        }
    }(jQuery),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Headroom = e()
    }(this, function() {
        "use strict";

        function t(t) {
            this.callback = t, this.ticking = !1
        }

        function e(t) {
            return t && "undefined" != typeof window && (t === window || t.nodeType)
        }

        function n(t) {
            if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
            var i, o, s = t || {};
            for (o = 1; o < arguments.length; o++) {
                var r = arguments[o] || {};
                for (i in r) "object" != typeof s[i] || e(s[i]) ? s[i] = s[i] || r[i] : s[i] = n(s[i], r[i])
            }
            return s
        }

        function i(t) {
            return t === Object(t) ? t : {
                down: t,
                up: t
            }
        }

        function o(t, e) {
            e = n(e, o.options), this.lastKnownScrollY = 0, this.elem = t, this.tolerance = i(e.tolerance), this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop, this.onBottom = e.onBottom, this.onNotBottom = e.onNotBottom
        }
        var s = {
            bind: !! function() {}.bind,
            classList: "classList" in document.documentElement,
            rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
        };
        return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, t.prototype = {
            constructor: t,
            update: function() {
                this.callback && this.callback(), this.ticking = !1
            },
            requestTick: function() {
                this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
            },
            handleEvent: function() {
                this.requestTick()
            }
        }, o.prototype = {
            constructor: o,
            init: function() {
                if (o.cutsTheMustard) return this.debouncer = new t(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this
            },
            destroy: function() {
                var t = this.classes;
                this.initialised = !1;
                for (var e in t) t.hasOwnProperty(e) && this.elem.classList.remove(t[e]);
                this.scroller.removeEventListener("scroll", this.debouncer, !1)
            },
            attachEvent: function() {
                this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
            },
            unpin: function() {
                var t = this.elem.classList,
                    e = this.classes;
                !t.contains(e.pinned) && t.contains(e.unpinned) || (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this))
            },
            pin: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this))
            },
            top: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this))
            },
            notTop: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this))
            },
            bottom: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.bottom) || (t.add(e.bottom), t.remove(e.notBottom), this.onBottom && this.onBottom.call(this))
            },
            notBottom: function() {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.notBottom) || (t.add(e.notBottom), t.remove(e.bottom), this.onNotBottom && this.onNotBottom.call(this))
            },
            getScrollY: function() {
                return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
            },
            getViewportHeight: function() {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            },
            getElementPhysicalHeight: function(t) {
                return Math.max(t.offsetHeight, t.clientHeight)
            },
            getScrollerPhysicalHeight: function() {
                return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
            },
            getDocumentHeight: function() {
                var t = document.body,
                    e = document.documentElement;
                return Math.max(t.scrollHeight, e.scrollHeight, t.offsetHeight, e.offsetHeight, t.clientHeight, e.clientHeight)
            },
            getElementHeight: function(t) {
                return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
            },
            getScrollerHeight: function() {
                return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            },
            isOutOfBounds: function(t) {
                var e = t < 0,
                    n = t + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
                return e || n
            },
            toleranceExceeded: function(t, e) {
                return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e]
            },
            shouldUnpin: function(t, e) {
                var n = t > this.lastKnownScrollY,
                    i = t >= this.offset;
                return n && i && e
            },
            shouldPin: function(t, e) {
                var n = t < this.lastKnownScrollY,
                    i = t <= this.offset;
                return n && e || i
            },
            update: function() {
                var t = this.getScrollY(),
                    e = t > this.lastKnownScrollY ? "down" : "up",
                    n = this.toleranceExceeded(t, e);
                this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), t + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(t, n) ? this.unpin() : this.shouldPin(t, n) && this.pin(), this.lastKnownScrollY = t)
            }
        }, o.options = {
            tolerance: {
                up: 0,
                down: 0
            },
            offset: 0,
            scroller: window,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                bottom: "headroom--bottom",
                notBottom: "headroom--not-bottom",
                initial: "headroom"
            }
        }, o.cutsTheMustard = "undefined" != typeof s && s.rAF && s.bind && s.classList, o
    }),
    function() {
        "use strict";

        function t(i) {
            if (!i) throw new Error("No options passed to Waypoint constructor");
            if (!i.element) throw new Error("No element option passed to Waypoint constructor");
            if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, i), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, e += 1
        }
        var e = 0,
            n = {};
        t.prototype.queueTrigger = function(t) {
            this.group.queueTrigger(this, t)
        }, t.prototype.trigger = function(t) {
            this.enabled && this.callback && this.callback.apply(this, t)
        }, t.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete n[this.key]
        }, t.prototype.disable = function() {
            return this.enabled = !1, this
        }, t.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, t.prototype.next = function() {
            return this.group.next(this)
        }, t.prototype.previous = function() {
            return this.group.previous(this)
        }, t.invokeAll = function(t) {
            var e = [];
            for (var i in n) e.push(n[i]);
            for (var o = 0, s = e.length; o < s; o++) e[o][t]()
        }, t.destroyAll = function() {
            t.invokeAll("destroy")
        }, t.disableAll = function() {
            t.invokeAll("disable")
        }, t.enableAll = function() {
            t.Context.refreshAll();
            for (var e in n) n[e].enabled = !0;
            return this
        }, t.refreshAll = function() {
            t.Context.refreshAll()
        }, t.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, t.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, t.adapters = [], t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, t.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = t
    }(),
    function() {
        "use strict";

        function t(t) {
            window.setTimeout(t, 1e3 / 60)
        }

        function e(t) {
            this.element = t, this.Adapter = o.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, n += 1, o.windowContext || (o.windowContext = !0, o.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var n = 0,
            i = {},
            o = window.Waypoint,
            s = window.onload;
        e.prototype.add = function(t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[e][t.key] = t, this.refresh()
        }, e.prototype.checkEmpty = function() {
            var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                n = this.element == this.element.window;
            t && e && !n && (this.adapter.off(".waypoints"), delete i[this.key])
        }, e.prototype.createThrottledResizeHandler = function() {
            function t() {
                e.handleResize(), e.didResize = !1
            }
            var e = this;
            this.adapter.on("resize.waypoints", function() {
                e.didResize || (e.didResize = !0, o.requestAnimationFrame(t))
            })
        }, e.prototype.createThrottledScrollHandler = function() {
            function t() {
                e.handleScroll(), e.didScroll = !1
            }
            var e = this;
            this.adapter.on("scroll.waypoints", function() {
                e.didScroll && !o.isTouch || (e.didScroll = !0, o.requestAnimationFrame(t))
            })
        }, e.prototype.handleResize = function() {
            o.Context.refreshAll()
        }, e.prototype.handleScroll = function() {
            var t = {},
                e = {
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
            for (var n in e) {
                var i = e[n],
                    o = i.newScroll > i.oldScroll,
                    s = o ? i.forward : i.backward;
                for (var r in this.waypoints[n]) {
                    var a = this.waypoints[n][r];
                    if (null !== a.triggerPoint) {
                        var l = i.oldScroll < a.triggerPoint,
                            c = i.newScroll >= a.triggerPoint,
                            d = l && c,
                            u = !l && !c;
                        (d || u) && (a.queueTrigger(s), t[a.group.id] = a.group)
                    }
                }
            }
            for (var f in t) t[f].flushTriggers();
            this.oldScroll = {
                x: e.horizontal.newScroll,
                y: e.vertical.newScroll
            }
        }, e.prototype.innerHeight = function() {
            return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
        }, e.prototype.remove = function(t) {
            delete this.waypoints[t.axis][t.key], this.checkEmpty()
        }, e.prototype.innerWidth = function() {
            return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
        }, e.prototype.destroy = function() {
            var t = [];
            for (var e in this.waypoints)
                for (var n in this.waypoints[e]) t.push(this.waypoints[e][n]);
            for (var i = 0, o = t.length; i < o; i++) t[i].destroy()
        }, e.prototype.refresh = function() {
            var t, e = this.element == this.element.window,
                n = e ? void 0 : this.adapter.offset(),
                i = {};
            this.handleScroll(), t = {
                horizontal: {
                    contextOffset: e ? 0 : n.left,
                    contextScroll: e ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: e ? 0 : n.top,
                    contextScroll: e ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            };
            for (var s in t) {
                var r = t[s];
                for (var a in this.waypoints[s]) {
                    var l, c, d, u, f, p = this.waypoints[s][a],
                        h = p.options.offset,
                        m = p.triggerPoint,
                        g = 0,
                        v = null == m;
                    p.element !== p.element.window && (g = p.adapter.offset()[r.offsetProp]), "function" == typeof h ? h = h.apply(p) : "string" == typeof h && (h = parseFloat(h), p.options.offset.indexOf("%") > -1 && (h = Math.ceil(r.contextDimension * h / 100))), l = r.contextScroll - r.contextOffset, p.triggerPoint = Math.floor(g + l - h), c = m < r.oldScroll, d = p.triggerPoint >= r.oldScroll, u = c && d, f = !c && !d, !v && u ? (p.queueTrigger(r.backward), i[p.group.id] = p.group) : !v && f ? (p.queueTrigger(r.forward), i[p.group.id] = p.group) : v && r.oldScroll >= p.triggerPoint && (p.queueTrigger(r.forward), i[p.group.id] = p.group)
                }
            }
            return o.requestAnimationFrame(function() {
                for (var t in i) i[t].flushTriggers()
            }), this
        }, e.findOrCreateByElement = function(t) {
            return e.findByElement(t) || new e(t)
        }, e.refreshAll = function() {
            for (var t in i) i[t].refresh()
        }, e.findByElement = function(t) {
            return i[t.waypointContextKey]
        }, window.onload = function() {
            s && s(), e.refreshAll()
        }, o.requestAnimationFrame = function(e) {
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
            n.call(window, e)
        }, o.Context = e
    }(),
    function() {
        "use strict";

        function t(t, e) {
            return t.triggerPoint - e.triggerPoint
        }

        function e(t, e) {
            return e.triggerPoint - t.triggerPoint
        }

        function n(t) {
            this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
        }
        var i = {
                vertical: {},
                horizontal: {}
            },
            o = window.Waypoint;
        n.prototype.add = function(t) {
            this.waypoints.push(t)
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
                i.sort(o ? e : t);
                for (var s = 0, r = i.length; s < r; s += 1) {
                    var a = i[s];
                    (a.options.continuous || s === i.length - 1) && a.trigger([n])
                }
            }
            this.clearTriggerQueues()
        }, n.prototype.next = function(e) {
            this.waypoints.sort(t);
            var n = o.Adapter.inArray(e, this.waypoints),
                i = n === this.waypoints.length - 1;
            return i ? null : this.waypoints[n + 1]
        }, n.prototype.previous = function(e) {
            this.waypoints.sort(t);
            var n = o.Adapter.inArray(e, this.waypoints);
            return n ? this.waypoints[n - 1] : null
        }, n.prototype.queueTrigger = function(t, e) {
            this.triggerQueues[e].push(t)
        }, n.prototype.remove = function(t) {
            var e = o.Adapter.inArray(t, this.waypoints);
            e > -1 && this.waypoints.splice(e, 1)
        }, n.prototype.first = function() {
            return this.waypoints[0]
        }, n.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, n.findOrCreate = function(t) {
            return i[t.axis][t.name] || new n(t)
        }, o.Group = n
    }(),
    function() {
        "use strict";

        function t(t) {
            this.$element = e(t)
        }
        var e = window.jQuery,
            n = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, n) {
            t.prototype[n] = function() {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[n].apply(this.$element, t)
            }
        }), e.each(["extend", "inArray", "isEmptyObject"], function(n, i) {
            t[i] = e[i]
        }), n.adapters.push({
            name: "jquery",
            Adapter: t
        }), n.Adapter = t
    }(),
    function() {
        "use strict";

        function t(t) {
            return function() {
                var n = [],
                    i = arguments[0];
                return t.isFunction(arguments[0]) && (i = t.extend({}, arguments[1]), i.handler = arguments[0]), this.each(function() {
                    var o = t.extend({}, i, {
                        element: this
                    });
                    "string" == typeof o.context && (o.context = t(this).closest(o.context)[0]), n.push(new e(o))
                }), n
            }
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
    }(),
    function(t) {
        "use strict";
        var e = {
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9"
        };
        t.fn.accessibility_menu = function(n) {
            var i = t.extend({
                    menuClass: "menu-item-open",
                    mainMenuLabel: "Main Menu",
                    mainMenuRole: "navigation",
                    topMenuRole: "menubar",
                    listItemsRole: "menuitem",
                    subNavRole: "menu",
                    firstTab: "level2"
                }, n),
                o = t(this),
                s = ".fsNavPageInfo",
                r = ".fsNavLevel1",
                a = ".fsNavLevel2",
                l = ".fsNavPageDescription",
                c = o.find("> li > a");
            t(this).parent().attr("role", i.mainMenuRole).attr("aria-label", i.mainMenuLabel), t(this).attr("role", i.topMenuRole).find("li").attr("role", i.listItemsRole), t(this).find(a).attr("role", i.subNavRole), t(this).find(s).find("a").attr("tabIndex", -1), t(c).each(function() {
                t(this).next(s).length > 0 && t(this).parent("li").attr("aria-haspopup", "true").find(s).attr("aria-hidden", "true")
            }), t(c).bind("focus mouseenter mouseleave", function() {
                var e = new Array;
                if (t(this).parents(r).find("> li > a").removeAttr("tabindex"), t(this).parents(r).find("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabindex", -1), t(this).next(s).attr("aria-hidden", "false").parent("li").addClass(i.menuClass), e.push(t(this)[0]), "level2" == i.firstTab) {
                    if (t(this).next(s).find(a).find("a").length)
                        for (var n = 0; n < t(this).next(s).find(a).find("a").length; n++) e.push(t(this).next(s).find(a).find("a")[n]);
                    if (t(this).next(s).find(l).find("a").length)
                        for (var o = 0; o < t(this).next(s).find(l).find("a").length; o++) e.push(t(this).next(s).find(l).find("a")[o])
                } else if ("pagedesc" == i.firstTab) {
                    if (t(this).next(s).find(l).find("a").length)
                        for (var c = 0; c < t(this).next(s).find(l).find("a").length; c++) e.push(t(this).next(s).find(l).find("a")[c]);
                    if (t(this).next(s).find(a).find("a").length)
                        for (var d = 0; d < t(this).next(s).find(a).find("a").length; d++) e.push(t(this).next(s).find(a).find("a")[d])
                }
                for (var u = 0; u < e.length; u++) e[u].setAttribute("tabindex", u)
            }), t(this).on("mouseleave", function() {
                t(this).find("> li > a").removeAttr("tabindex"), t(this).find("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1)
            }), t(c).keydown(function(n) {
                var o = t(this).parent("li").find(s).find("a").length;
                if (38 == n.keyCode) n.preventDefault(), t(this).parent("li").find(s).find("a").length && t(this).parent("li").find(s).find("a[tabindex=" + o + "]").focus();
                else if (39 == n.keyCode) n.preventDefault(),
                    0 == t(this).parent("li").next("li").length ? t(this).parents(r).find("> li").first().find("a").first().focus() : t(this).parent("li").next("li").find("a").first().focus();
                else if (40 == n.keyCode) t(this).parent("li").find(s).find("a").length && (n.preventDefault(), t(this).parent("li").addClass(i.menuClass).find(s).attr("aria-hidden", "false"), t(this).parent("li").find("a[tabindex=1]").focus());
                else if (37 == n.keyCode) n.preventDefault(), 0 == t(this).parent("li").prev("li").length ? t(this).parents(r).find("> li").last().find("a").first().focus() : t(this).parent("li").prev("li").find("a").first().focus();
                else if (9 == n.keyCode)
                    if (n.shiftKey)
                        if (0 == t(this).parent("li").prev("li").length) t(this).parents(r).find("> li > a").removeAttr("tabindex"), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1);
                        else if (t(this).parent("li").prev("li").length) {
                    n.preventDefault();
                    var a = t(this).parent("li").prev("li").find(s).find("a").length;
                    t(this).parents(r).find("> li > a").removeAttr("tabindex"), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1), t(this).parent("li").prev("li").addClass(i.menuClass).find(s).attr("aria-hidden", "false"), t(this).parent("li").prev("li").find(">a").focus().parent().find(s).find("a[tabindex=" + a + "]").focus()
                } else t(this).parents(r).find("> li > a").removeAttr("tabindex"), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1);
                else t(this).parent("li").find(s).find("a").length && (n.preventDefault(), t(this).parent("li").addClass(i.menuClass).find(s).attr("aria-hidden", "false"), t(this).parent("li").find("a[tabindex=1]").focus());
                else 32 == n.keyCode ? (n.preventDefault(), window.location = t(this).attr("href")) : 27 == n.keyCode ? (n.preventDefault(), t("." + i.menuClass).removeClass(i.menuClass).find("> a").removeAttr("tabindex").parent("li").find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1)) : t(this).parent("li").find(s + "[aria-hidden=false] a").each(function() {
                    if (t(this).text().substring(0, 1).toLowerCase() == e[n.keyCode]) return t(this).focus(), !1
                })
            });
            var d = t(this).find(s).find("a");
            t(d).keydown(function(n) {
                var o = t(this).parents(s).find("a").length,
                    a = parseInt(t(this).attr("tabindex"));
                if (38 == n.keyCode) n.preventDefault(), 1 == a ? t(this).parents(s).parent("li").find("a").first().focus() : t(this).parents(s).find("a[tabindex=" + (a - 1) + "]").focus();
                else if (39 == n.keyCode) n.preventDefault(), 0 == t(this).parents(s).parent("li").next("li").length ? t(this).parents(r).find("> li").first().find("a").first().focus() : t(this).parents(s).parent("li").next("li").find("a").first().focus();
                else if (40 == n.keyCode) n.preventDefault(), a == o ? t(this).parents(s).parent("li").find("a").first().focus() : t(this).parents(s).find("a[tabindex=" + (a + 1) + "]").focus();
                else if (27 == n.keyCode || 37 == n.keyCode) n.preventDefault(), t(this).parents(s).parent("li").find("> a").focus(), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true");
                else if (9 == n.keyCode) n.shiftKey ? (n.preventDefault(), 1 == a ? t(this).parents(s).parent("li").find("a").first().focus() : t(this).parents(s).find("a[tabindex=" + (a - 1) + "]").focus()) : a == o ? t(this).parents(s).parent("li").next("li").length ? (n.preventDefault(), t(this).parents(s).parent("li").next("li").find("a").first().focus()) : (t(this).parents(r).find("> li > a").removeAttr("tabindex"), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1)) : (n.preventDefault(), t(this).parents(s).find("a[tabindex=" + (a + 1) + "]").focus());
                else if (32 == n.keyCode) n.preventDefault(), window.location = t(this).attr("href");
                else {
                    var l = !1;
                    t(this).parent("li").nextAll("li").find("a").each(function() {
                        if (t(this).text().substring(0, 1).toLowerCase() == e[n.keyCode]) return t(this).focus(), l = !0, !1
                    }), l || t(this).parent("li").prevAll("li").find("a").each(function() {
                        if (t(this).text().substring(0, 1).toLowerCase() == e[n.keyCode]) return t(this).focus(), !1
                    })
                }
            }), t(document).click(function() {
                t(this).parents(r).find("> li > a").removeAttr("tabindex"), t("." + i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden", "true").find("a").attr("tabIndex", -1)
            }), t(this).click(function(t) {
                t.stopPropagation()
            })
        }
    }(jQuery), window.Modernizr = function(t, e, n) {
        function i(t) {
            y.cssText = t
        }

        function o(t, e) {
            return typeof t === e
        }

        function s(t, e) {
            return !!~("" + t).indexOf(e)
        }

        function r(t, e) {
            for (var i in t) {
                var o = t[i];
                if (!s(o, "-") && y[o] !== n) return "pfx" != e || o
            }
            return !1
        }

        function a(t, e, i) {
            for (var s in t) {
                var r = e[t[s]];
                if (r !== n) return i === !1 ? t[s] : o(r, "function") ? r.bind(i || e) : r
            }
            return !1
        }

        function l(t, e, n) {
            var i = t.charAt(0).toUpperCase() + t.slice(1),
                s = (t + " " + x.join(i + " ") + i).split(" ");
            return o(e, "string") || o(e, "undefined") ? r(s, e) : (s = (t + " " + k.join(i + " ") + i).split(" "), a(s, e, n))
        }
        var c, d, u, f = "2.8.3",
            p = {},
            h = !0,
            m = e.documentElement,
            g = "modernizr",
            v = e.createElement(g),
            y = v.style,
            w = {}.toString,
            b = " -webkit- -moz- -o- -ms- ".split(" "),
            C = "Webkit Moz O ms",
            x = C.split(" "),
            k = C.toLowerCase().split(" "),
            S = {
                svg: "http://www.w3.org/2000/svg"
            },
            T = {},
            $ = [],
            P = $.slice,
            E = function(t, n, i, o) {
                var s, r, a, l, c = e.createElement("div"),
                    d = e.body,
                    u = d || e.createElement("body");
                if (parseInt(i, 10))
                    for (; i--;) a = e.createElement("div"), a.id = o ? o[i] : g + (i + 1), c.appendChild(a);
                return s = ["&#173;", '<style id="s', g, '">', t, "</style>"].join(""), c.id = g, (d ? c : u).innerHTML += s, u.appendChild(c), d || (u.style.background = "", u.style.overflow = "hidden", l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(u)), r = n(c, t), d ? c.parentNode.removeChild(c) : (u.parentNode.removeChild(u), m.style.overflow = l), !!r
            },
            A = function(e) {
                var n = t.matchMedia || t.msMatchMedia;
                if (n) return n(e) && n(e).matches || !1;
                var i;
                return E("@media " + e + " { #" + g + " { position: absolute; } }", function(e) {
                    i = "absolute" == (t.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).position
                }), i
            },
            j = {}.hasOwnProperty;
        u = o(j, "undefined") || o(j.call, "undefined") ? function(t, e) {
            return e in t && o(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return j.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var n = P.call(arguments, 1),
                i = function() {
                    if (this instanceof i) {
                        var o = function() {};
                        o.prototype = e.prototype;
                        var s = new o,
                            r = e.apply(s, n.concat(P.call(arguments)));
                        return Object(r) === r ? r : s
                    }
                    return e.apply(t, n.concat(P.call(arguments)))
                };
            return i
        }), T.flexbox = function() {
            return l("flexWrap")
        }, T.flexboxlegacy = function() {
            return l("boxDirection")
        }, T.touch = function() {
            var n;
            return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : E(["@media (", b.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
                n = 9 === t.offsetTop
            }), n
        }, T.cssanimations = function() {
            return l("animationName")
        }, T.csscolumns = function() {
            return l("columnCount")
        }, T.csstransforms = function() {
            return !!l("transform")
        }, T.csstransforms3d = function() {
            var t = !!l("perspective");
            return t && "webkitPerspective" in m.style && E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e, n) {
                t = 9 === e.offsetLeft && 3 === e.offsetHeight
            }), t
        }, T.csstransitions = function() {
            return l("transition")
        }, T.video = function() {
            var t = e.createElement("video"),
                n = !1;
            try {
                (n = !!t.canPlayType) && (n = new Boolean(n), n.ogg = t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (i) {}
            return n
        }, T.audio = function() {
            var t = e.createElement("audio"),
                n = !1;
            try {
                (n = !!t.canPlayType) && (n = new Boolean(n), n.ogg = t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (i) {}
            return n
        }, T.svg = function() {
            return !!e.createElementNS && !!e.createElementNS(S.svg, "svg").createSVGRect
        }, T.inlinesvg = function() {
            var t = e.createElement("div");
            return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) == S.svg
        }, T.svgclippaths = function() {
            return !!e.createElementNS && /SVGClipPath/.test(w.call(e.createElementNS(S.svg, "clipPath")))
        };
        for (var M in T) u(T, M) && (d = M.toLowerCase(), p[d] = T[M](), $.push((p[d] ? "" : "no-") + d));
        return p.addTest = function(t, e) {
                if ("object" == typeof t)
                    for (var i in t) u(t, i) && p.addTest(i, t[i]);
                else {
                    if (t = t.toLowerCase(), p[t] !== n) return p;
                    e = "function" == typeof e ? e() : e, "undefined" != typeof h && h && (m.className += " " + (e ? "" : "no-") + t), p[t] = e
                }
                return p
            }, i(""), v = c = null,
            function(t, e) {
                function n(t, e) {
                    var n = t.createElement("p"),
                        i = t.getElementsByTagName("head")[0] || t.documentElement;
                    return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild)
                }

                function i() {
                    var t = y.elements;
                    return "string" == typeof t ? t.split(" ") : t
                }

                function o(t) {
                    var e = v[t[m]];
                    return e || (e = {}, g++, t[m] = g, v[g] = e), e
                }

                function s(t, n, i) {
                    if (n || (n = e), d) return n.createElement(t);
                    i || (i = o(n));
                    var s;
                    return s = i.cache[t] ? i.cache[t].cloneNode() : h.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), !s.canHaveChildren || p.test(t) || s.tagUrn ? s : i.frag.appendChild(s)
                }

                function r(t, n) {
                    if (t || (t = e), d) return t.createDocumentFragment();
                    n = n || o(t);
                    for (var s = n.frag.cloneNode(), r = 0, a = i(), l = a.length; r < l; r++) s.createElement(a[r]);
                    return s
                }

                function a(t, e) {
                    e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(n) {
                        return y.shivMethods ? s(n, t, e) : e.createElem(n)
                    }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function(t) {
                        return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                    }) + ");return n}")(y, e.frag)
                }

                function l(t) {
                    t || (t = e);
                    var i = o(t);
                    return y.shivCSS && !c && !i.hasCSS && (i.hasCSS = !!n(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || a(t, i), t
                }
                var c, d, u = "3.7.0",
                    f = t.html5 || {},
                    p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    m = "_html5shiv",
                    g = 0,
                    v = {};
                ! function() {
                    try {
                        var t = e.createElement("a");
                        t.innerHTML = "<xyz></xyz>", c = "hidden" in t, d = 1 == t.childNodes.length || function() {
                            e.createElement("a");
                            var t = e.createDocumentFragment();
                            return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                        }()
                    } catch (n) {
                        c = !0, d = !0
                    }
                }();
                var y = {
                    elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: u,
                    shivCSS: f.shivCSS !== !1,
                    supportsUnknownElements: d,
                    shivMethods: f.shivMethods !== !1,
                    type: "default",
                    shivDocument: l,
                    createElement: s,
                    createDocumentFragment: r
                };
                t.html5 = y, l(e)
            }(this, e), p._version = f, p._prefixes = b, p._domPrefixes = k, p._cssomPrefixes = x, p.mq = A, p.testProp = function(t) {
                return r([t])
            }, p.testAllProps = l, p.testStyles = E, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + $.join(" ") : ""), p
    }(this, this.document),
    function(t, e, n) {
        function i(t) {
            return "[object Function]" == g.call(t)
        }

        function o(t) {
            return "string" == typeof t
        }

        function s() {}

        function r(t) {
            return !t || "loaded" == t || "complete" == t || "uninitialized" == t
        }

        function a() {
            var t = v.shift();
            y = 1, t ? t.t ? h(function() {
                ("c" == t.t ? f.injectCss : f.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
            }, 0) : (t(), a()) : y = 0
        }

        function l(t, n, i, o, s, l, c) {
            function d(e) {
                if (!p && r(u.readyState) && (w.r = p = 1, !y && a(), u.onload = u.onreadystatechange = null, e)) {
                    "img" != t && h(function() {
                        C.removeChild(u)
                    }, 50);
                    for (var i in $[n]) $[n].hasOwnProperty(i) && $[n][i].onload()
                }
            }
            var c = c || f.errorTimeout,
                u = e.createElement(t),
                p = 0,
                g = 0,
                w = {
                    t: i,
                    s: n,
                    e: s,
                    a: l,
                    x: c
                };
            1 === $[n] && (g = 1, $[n] = []), "object" == t ? u.data = n : (u.src = n, u.type = t), u.width = u.height = "0", u.onerror = u.onload = u.onreadystatechange = function() {
                d.call(this, g)
            }, v.splice(o, 0, w), "img" != t && (g || 2 === $[n] ? (C.insertBefore(u, b ? null : m), h(d, c)) : $[n].push(u))
        }

        function c(t, e, n, i, s) {
            return y = 0, e = e || "j", o(t) ? l("c" == e ? k : x, t, e, this.i++, n, i, s) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
        }

        function d() {
            var t = f;
            return t.loader = {
                load: c,
                i: 0
            }, t
        }
        var u, f, p = e.documentElement,
            h = t.setTimeout,
            m = e.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            y = 0,
            w = "MozAppearance" in p.style,
            b = w && !!e.createRange().compareNode,
            C = b ? p : m.parentNode,
            p = t.opera && "[object Opera]" == g.call(t.opera),
            p = !!e.attachEvent && !p,
            x = w ? "object" : p ? "script" : "img",
            k = p ? "script" : x,
            S = Array.isArray || function(t) {
                return "[object Array]" == g.call(t)
            },
            T = [],
            $ = {},
            P = {
                timeout: function(t, e) {
                    return e.length && (t.timeout = e[0]), t
                }
            };
        f = function(t) {
            function e(t) {
                var e, n, i, t = t.split("!"),
                    o = T.length,
                    s = t.pop(),
                    r = t.length,
                    s = {
                        url: s,
                        origUrl: s,
                        prefixes: t
                    };
                for (n = 0; n < r; n++) i = t[n].split("="), (e = P[i.shift()]) && (s = e(s, i));
                for (n = 0; n < o; n++) s = T[n](s);
                return s
            }

            function r(t, o, s, r, a) {
                var l = e(t),
                    c = l.autoCallback;
                l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = i(o) ? o : o[t] || o[r] || o[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, o, s, r, a) : ($[l.url] ? l.noexec = !0 : $[l.url] = 1, s.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (i(o) || i(c)) && s.load(function() {
                    d(), o && o(l.origUrl, a, r), c && c(l.origUrl, a, r), $[l.url] = 2
                })))
            }

            function a(t, e) {
                function n(t, n) {
                    if (t) {
                        if (o(t)) n || (u = function() {
                            var t = [].slice.call(arguments);
                            f.apply(this, t), p()
                        }), r(t, u, e, 0, c);
                        else if (Object(t) === t)
                            for (l in a = function() {
                                    var e, n = 0;
                                    for (e in t) t.hasOwnProperty(e) && n++;
                                    return n
                                }(), t) t.hasOwnProperty(l) && (!n && !--a && (i(u) ? u = function() {
                                var t = [].slice.call(arguments);
                                f.apply(this, t), p()
                            } : u[l] = function(t) {
                                return function() {
                                    var e = [].slice.call(arguments);
                                    t && t.apply(this, e), p()
                                }
                            }(f[l])), r(t[l], u, e, l, c))
                    } else !n && p()
                }
                var a, l, c = !!t.test,
                    d = t.load || t.both,
                    u = t.callback || s,
                    f = u,
                    p = t.complete || s;
                n(c ? t.yep : t.nope, !!d), d && n(d)
            }
            var l, c, u = this.yepnope.loader;
            if (o(t)) r(t, 0, u, 0);
            else if (S(t))
                for (l = 0; l < t.length; l++) c = t[l], o(c) ? r(c, 0, u, 0) : S(c) ? f(c) : Object(c) === c && a(c, u);
            else Object(t) === t && a(t, u)
        }, f.addPrefix = function(t, e) {
            P[t] = e
        }, f.addFilter = function(t) {
            T.push(t)
        }, f.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", u = function() {
            e.removeEventListener("DOMContentLoaded", u, 0), e.readyState = "complete"
        }, 0)), t.yepnope = d(), t.yepnope.executeStack = a, t.yepnope.injectJs = function(t, n, i, o, l, c) {
            var d, u, p = e.createElement("script"),
                o = o || f.errorTimeout;
            p.src = t;
            for (u in i) p.setAttribute(u, i[u]);
            n = c ? a : n || s, p.onreadystatechange = p.onload = function() {
                !d && r(p.readyState) && (d = 1, n(), p.onload = p.onreadystatechange = null)
            }, h(function() {
                d || (d = 1, n(1))
            }, o), l ? p.onload() : m.parentNode.insertBefore(p, m)
        }, t.yepnope.injectCss = function(t, n, i, o, r, l) {
            var c, o = e.createElement("link"),
                n = l ? a : n || s;
            o.href = t, o.rel = "stylesheet", o.type = "text/css";
            for (c in i) o.setAttribute(c, i[c]);
            r || (m.parentNode.insertBefore(o, m), h(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, /* $.fn.randomize = function(t) {
        var e = t ? $(this).find(t) : $(this).children(),
            n = e.parent();
        return n.each(function() {
            $(this).children(t).sort(function() {
                return Math.round(Math.random()) - .5
            }).detach().appendTo(this)
        }), this
    }, */
    function(t) {
        var e = t({});
        t.subscribe = function() {
            e.on.apply(e, arguments)
        }, t.unsubscribe = function() {
            e.off.apply(e, arguments)
        }, t.publish = function() {
            e.trigger.apply(e, arguments)
        }
    }(jQuery),
    function() {
        "use strict";

        function t() {}

        function e(t) {
            this.options = n.Adapter.extend({}, e.defaults, t), this.axis = this.options.horizontal ? "horizontal" : "vertical", this.waypoints = [], this.element = this.options.element, this.createWaypoints()
        }
        var n = window.Waypoint;
        e.prototype.createWaypoints = function() {
            for (var t = {
                    vertical: [{
                        down: "enter",
                        up: "exited",
                        offset: "100%"
                    }, {
                        down: "entered",
                        up: "exit",
                        offset: "bottom-in-view"
                    }, {
                        down: "exit",
                        up: "entered",
                        offset: 0
                    }, {
                        down: "exited",
                        up: "enter",
                        offset: function() {
                            return -this.adapter.outerHeight()
                        }
                    }],
                    horizontal: [{
                        right: "enter",
                        left: "exited",
                        offset: "100%"
                    }, {
                        right: "entered",
                        left: "exit",
                        offset: "right-in-view"
                    }, {
                        right: "exit",
                        left: "entered",
                        offset: 0
                    }, {
                        right: "exited",
                        left: "enter",
                        offset: function() {
                            return -this.adapter.outerWidth()
                        }
                    }]
                }, e = 0, n = t[this.axis].length; e < n; e++) {
                var i = t[this.axis][e];
                this.createWaypoint(i)
            }
        }, e.prototype.createWaypoint = function(t) {
            var e = this;
            this.waypoints.push(new n({
                context: this.options.context,
                element: this.options.element,
                enabled: this.options.enabled,
                handler: function(t) {
                    return function(n) {
                        e.options[t[n]].call(e, n)
                    }
                }(t),
                offset: t.offset,
                horizontal: this.options.horizontal
            }))
        }, e.prototype.destroy = function() {
            for (var t = 0, e = this.waypoints.length; t < e; t++) this.waypoints[t].destroy();
            this.waypoints = []
        }, e.prototype.disable = function() {
            for (var t = 0, e = this.waypoints.length; t < e; t++) this.waypoints[t].disable()
        }, e.prototype.enable = function() {
            for (var t = 0, e = this.waypoints.length; t < e; t++) this.waypoints[t].enable()
        }, e.defaults = {
            context: window,
            enabled: !0,
            enter: t,
            entered: t,
            exit: t,
            exited: t
        }, n.Inview = e
    }();