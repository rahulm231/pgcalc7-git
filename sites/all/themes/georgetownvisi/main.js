 /**
 *
 * Georgetown Visitation Preparatory School - default_16
 * @link http://visiorg.finalsite.com
 * Built By: Jorge Piquer
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

    var HOME;
    var OFFCANVAS;
    var SUBNAV;
    var UTIL;

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

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();


    // ================================
    // Blockquote
    // ================================

    $('blockquote').wrapInner('<div class="block-wrapper"></div');

    // ================================
    // 5050 Slideshow Treatment
    // ================================
    $(".fsAthleticsEvent.custom-scroll .fsListItems").slick({
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 6
          }
        }
      ]
    });
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

    // ================================
    // Main Search
    // ================================
    $('.header-top .search-trigger-container').click( function() {
      $('.top-search, .search-trigger-container, .nav-utility-header').addClass('active');
    });

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.search-trigger-container, #fsHeader .top-search').length) {
        $('.top-search, .search-trigger-container, .nav-utility-header').removeClass('active');
      }
    });


    // ================================
    // Main Menu
    // ================================
    $(function($) {
      var num_cols = 2,
      container = $('.nav-main .fsNavLevel2'),
      listItem = 'li',
      listClass = 'column-list';
      container.each(function() {
        var items_per_col = [],
        items = $(this).find(listItem),
        min_items_per_col = Math.floor(items.length / num_cols),
        difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
          if (i < difference) {
            items_per_col[i] = min_items_per_col + 1;
          } else {
            items_per_col[i] = min_items_per_col;
          }
        }
        for (var l = 0; l < num_cols; l++) {
          $(this).append($('<ul ></ul>').addClass(listClass));
          for (var j = 0; j < items_per_col[l]; j++) {
            var pointer = 0;
            for (var k = 0; k < l; k++) {
                pointer += items_per_col[k];
            }
            $(this).find('.' + listClass).last().append(items[j + pointer]);
          }
        }
      });
    });

    $navMain_level1.find('.fsNavPageThumbnail > img').wrap("<div class='thumbnail-wrapper'></div");
    $navMain_level1.find('.fsNavPageDescription > img').wrap("<p class='fs_style_31'></p>");

    $('.nav-main .fsNavLevel1 > li').doubleTapToGo();

    $('.nav-utility-header .fsNavLevel1 > .fsNavParentPage').doubleTapToGo();

    // ================================
    // Fixed Menu
    // ================================


    //check if there is no hero image in the header & apply the no-hero style
    if((!$(".home").length) && (!$(".interior-hero").length) && (!$(".landing-slider").length)) {
      $body.addClass('no-hero');
      fixedHeaderNoHero();
    }

    var $menuStick = $('.nav-main').offset().top;

    $navMain_level1.prepend('<a href="/" class="fixed-logo"></a>');

    function fixedHeader() {
      if ($(window).width() > 750) {
        if ($(window).scrollTop() >= $menuStick) {
          $navMain.addClass('is-fixed');
          $('.search-trigger-container').appendTo('.is-fixed > .fsElementContent > nav > .fsNavLevel1');
          $('.top-search').appendTo('.is-fixed > .fsElementContent > nav > .fsNavLevel1');
          if ($('#fsAccountBar').length) {
            $navMain.addClass('fixed-account');
          } else {
            $navMain.removeClass('fixed-account');
          }
        } else {
          $navMain.removeClass('is-fixed');
          $('.search-trigger-container').insertAfter('.header-top .seo-content');
          $('.top-search').insertBefore('.header-top .nav-utility-header');
        }
      }
    }

    function fixedHeaderNoHero() {

      if ($(window).width() > 750) {
        if ($(window).scrollTop() >= 1) {

          $navMain.addClass('is-fixed');
          //$('.header-top').hide();
          $('.search-trigger-container').appendTo('#fsHeader .nav-main .fsNavLevel1');
          $('.top-search').appendTo('#fsHeader .nav-main .fsNavLevel1');
          if ($('#fsAccountBar').length) {
            $navMain.addClass('fixed-account');
          } else {
            $navMain.removeClass('fixed-account');
          }
        } else {
          $navMain.removeClass('is-fixed');
          //$('.header-top').show();
          $('.search-trigger-container').appendTo('#fsHeader .nav-main .fsNavLevel1');
          $('.top-search').appendTo('#fsHeader .nav-main .fsNavLevel1');
        }
      }
    }

    // only run this if there is a header landing image or landing slider
    if($('body:not(.fsComposeMode)').length){
      var scroll = false;

      $(window).scroll(function() {
        scroll = true;
      });

      setInterval(function() {
        if(scroll) {
          scroll = false;

          if((!$(".home").length) && (!$(".interior-hero").length) && (!$(".landing-slider").length)) {
              fixedHeaderNoHero();
              //console.log('fixed header no hero');
            } else {
              fixedHeader();
              //console.log('regular fixed header');
            }
        }
      }, 100);
    }

    // ================================
    // Interior Hero Image
    // ================================

    if($('body:not(.fsComposeMode)').length) {
      $('.interior-hero').appendTo('#fsHeader > .fsBanner');
      $('.landing-slider').appendTo('#fsHeader > .fsBanner');
      $('.fsAthleticsEvent.custom-scroll').appendTo('#fsHeader > .fsBanner');
    }
    $('.landing-slider').each(function() {
      var self = $(this);
      self.mediaSlider({
        mediaTemplate:[
          '<article class="universal-slide" style="background-image: url({imgSrc});">',
            '<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />',
          '</article>'
        ], // html markup
        callback: function() {
          self.find('.fsMediaCustomPlayer').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: false,
            dots:true,
            adaptiveHeight:true,
            autoplay:true,
            speed: 1500
          });
        }
      });
    });

    // ================================
    // Home
    // ================================


    HOME = {


        init: function() {

            // NOTE: call HOME functions here like
            this.slideshow();

        },

        slideshow: function() {

          $('.video-slide').each(function() {

            var $heroVideoContainer = $(this).find('.fsMediaCustomPlayer');
            var videoURL = $heroVideoContainer.attr('data-playlisturl');

            $.getJSON(videoURL, function(data) {

                $.each(data.objects, function(i, object) {
                    // $('<div class="vid-inner"  ></div>');
                    $('<div class="vid-inner" style="background-image: url('+object.display_path+');"></div>')
                    .append("<img src="+object.display_path+" />")
                    .append("<video src="+object.hd_video_path+" muted autoplay/>")
                    // .prependTo("<video src="+object.hd_video_path+" ></video>")
                    .prependTo($heroVideoContainer);
                });
            }).done(function() {


            var mediaContainer = $('.hero-media-container .fsElementContent'),
                tabContainer = $('.hero-tabs-container  .fsElementContent'),
                // mediaArray = $('.hero-media-container > .fsElementContent > .hero-slide'),
                // tabsArray = $('.hero-tabs-container  .fsElementContent > .hero-tab');
                mediaArray = $('.hero-slide'),
                tabsArray = $('.hero-tab');

            $('video').attr('id', 'hero-vid');
            $('.hero-slide:last-child').addClass('last');
            $('.hero-slide:first-child').addClass('first active-slide');
            $('.hero-tab:last-child').addClass('last');
            $('.hero-tab:first-child').addClass('first active-tab');
            $('.hero-slide').addClass('start-slide');
            $('.hero-tab').addClass('start-tab');

            var $activeSlide = $('.active-slide');
            var video = $activeSlide.find('#hero-vid');
            var notActiveVideo = $('.hero-slide:not(.active-slide)').find('#hero-vid');

            var $heroSlide = $('.hero-slide');
            var $heroTab = $('.hero-tab');

            if ($(window).width() > 699) {


              notActiveVideo.removeAttr('autoplay');


              $heroSlide.find('video').on('ended', function(event){
                var thisSlide = $(this).parents('.start-slide');
                var nextSlide = thisSlide.next();
                var nextVideo = nextSlide.find('#hero-vid');
                var tabIndex = nextSlide.index();
                var $firstSlide = $('.start-slide.first');
                var $firstTab = $('.hero-tab.first');

                // tabsArray.removeClass('active-tab');
                thisSlide.removeClass('active-slide');

                thisSlide.removeClass('restart-slide');

                if (thisSlide.hasClass('last')) {
                  tabsArray.removeClass('active-tab');
                  $firstSlide.find('#hero-vid').get(0).play();
                  $firstSlide.addClass('active-slide');
                  $firstTab.addClass('active-tab');
                } else if (thisSlide.hasClass('start-slide')){
                  tabsArray.removeClass('active-tab');
                    $('.hero-media-container > header').addClass('overlay-fade');
                    nextVideo[0].play();
                    $heroSlide.find('video').currentTime = 0;
                    nextVideo.attr('autoplay', 'autoplay');
                    nextSlide.addClass('active-slide');
                    tabsArray.eq(tabIndex).addClass('active-tab');
                }

              });

              // $('.hero-media-container').videoSlider();

              $('.hero-tab').each(function() {
                var _ = $(this);
                var slideIndex = _.index();

                _.on({
                  mouseenter: function(e){
                    $heroSlide.removeClass('start-slide');
                    $heroTab.removeClass('start-tab');

                    $('.hero-slide:not(.active-slide)').find('#hero-vid')[0].pause();
                    $('.hero-slide').find('#hero-vid').removeAttr('loop', 'loop');

                    // $('#hero-vid').get(0).pause();

                    $heroTab.removeClass('active-tab');
                    $heroSlide.removeClass('active-slide');
                    _.addClass('hovered active-tab');

                    var tabIndex = _.index();
                    $heroSlide.removeClass('active-slide');


                    // $heroSlide.find('video').get(0).pause();
                    $heroSlide.eq(tabIndex).addClass('active-slide');
                    $heroSlide.eq(tabIndex).find('#hero-vid').get(0).currentTime = 0;
                    $heroSlide.eq(tabIndex).find('#hero-vid')[0].play();
                    $heroSlide.eq(tabIndex).find('#hero-vid').attr('loop','loop');
                  },

                  mouseleave:function(e){
                    // $('#hero-vid').get(0).pause();
                    var tabIndexOut = $(this).index();
                    if (! $(e.toElement).hasClass('hero-tab')) {

                      $heroTab.removeClass('hovered');


                      // $('.active-slide').find('#hero-vid').on('ended', function(){
                      $('.hero-slide').eq(tabIndexOut).find('#hero-vid').on('ended', function(){
                        var $activeSlideOut = $(this).parents('.hero-slide');
                        var slideIndexOut = $activeSlideOut.index();

                        $(this).attr('loop', 'loop');

                        // $activeSlideOut.removeClass('active-slide');

                        // $('.hero-slide').find('#hero-vid').get(0).currentTime = 0;
                        // $(this).get(0).play();
                        // $heroTab.eq(slideIndexOut).addClass('active-tab');

                        // if ($activeSlideOut.hasClass('last')) {
                        //   $('.hero-slide.first').find('#hero-vid').get(0).play();
                        //   $('.hero-slide.first').addClass('active-slide');
                        //   $('.hero-tab.first').addClass('active-tab');
                        //   $('.hero-slide.first').find('#hero-vid').attr('loop', 'loop');
                        // } else {
                        //   $activeSlideOut.next().addClass('active-slide');
                        //   $heroTab.eq(slideIndexOut).next().addClass('active-tab');
                        //   $activeSlideOut.next().find('#hero-vid').get(0).currentTime = 0;
                        //   $activeSlideOut.next().find('#hero-vid')[0].play();
                        //   $activeSlideOut.next().find('#hero-vid').attr('loop', 'loop');
                        // }

                      });
                      //


                      // $heroSlide.addClass('restart-slide');

                      // $('restart-slide').eq(tabIndexOut).find('#hero-vid').on('ended', function(){
                      //   var newVideo = $(this).parents('.hero-video');
                      //   newVideo.removeClass('active-slide');
                      //   newVideo.next().find('#hero-vid').get(0).play();
                      //   newVideo.next().addClass('active-slide');
                      //   // $('.hero-slide.first').find('#hero-vid').get(0).play();
                      //   // $('.hero-slide.first').addClass('active-slide');
                      //   // $('.hero-tab.first').addClass('active-tab');
                      // });

                    } else {
                      console.log('to tab');
                      // $heroSlide.videoSlider();
                      // $heroSlide.find('video').get(0).pause();
                      // $heroSlide.find('video').currentTime = 0;
                      // $heroSlide.find('video').currentTime = 0;

                      // _.addClass('hovered');
                    }
                  }
                });
              });

            // }

              } else {
                tabContainer.find('.hero-tab').removeClass('active-tab');
                tabContainer.find('.hero-tab:first-child').addClass('active-tab-mobile');
                mediaContainer.find('.hero-slide:first-child').addClass('active-slide');

                $('.hero-tab').hover(function(){
                  if ($(this).hasClass('active-tab-mobile')) {
                    return true;
                  } else {
                    $('.hero-tab').removeClass('active-tab-mobile');
                    $('.hero-slide').removeClass('active-slide');
                    $(this).toggleClass('active-tab-mobile');
                    var slideIndex3 = tabContainer.children('.active-tab, .active-tab-mobile').index();
                    mediaArray.eq(slideIndex3).toggleClass('active-slide');
                  }
                });

              }



            }).fail(function() {

                $heroVideoContainer.append('<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>').css('textAlign', 'center');

            });

          });
        }

    };

    if (isHome) {

        HOME.init();

    }
    // --------------------------------
    // Header dotted line treatment

    // if (isHome) {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();

      if ($('.voices-container').length){
        var voicesTop = $('.voices-container').offset().top;
        if ((voicesTop-300) < scrollTop) {
          $('.voices-container > header').addClass('animate-line');
        } else {
          $('.voices-container > header').removeClass('animate-line');
        }
      }
      if ($('.infographic-container').length){
        var infoTop = $('.infographic-container').offset().top;
        if ((infoTop-300) < scrollTop) {
          $('.infographic-container > header').addClass('animate-line');
        } else {
          $('.infographic-container > header').removeClass('animate-line');
        }
      }
      if ($('.news-container').length){
        var newsTop = $('.news-container').offset().top;
        if ((newsTop-300) < scrollTop) {
          $('.news-container > header').addClass('animate-line');
        } else {
          $('.news-container > header').removeClass('animate-line');
        }
      }
      if ($('.video-header').length){
        var videoTop = $('.video-header').offset().top;
        if ((videoTop-300) < scrollTop) {
          $('.video-header > header').addClass('animate-line');
        } else {
          $('.video-header > header').removeClass('animate-line');
        }
      }
    });
    // } else {
    //   $(window).scroll(function() {
    //     var scrollTop = $(window).scrollTop(),
    //       infoTop = $('.infographic-container').offset().top;

    //     if ((infoTop-300) < scrollTop) {
    //       $('.infographic-container > header').addClass('animate-line');
    //     } else {
    //       $('.infographic-container > header').removeClass('animate-line');
    //     }
    //   });
    // }

    // ================================
    // Voices Slideshow
    // ================================

    if (notDraftMode) {
      $('.home:not(.fsComposeMode) .voices-container > .fsElementContent').slick({
        slidesToShow:  1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: '0px',
			  infinite: false
      });
    }

    $('.voices-slide').each(function(){
      $(this).find('.profile--style5').addClass('in-slide');
    });

    // ================================
    // Infographic Slideshow
    // ================================
    setTimeout(function() {
      if($("body:not(.home) .infographic-container > .fsElementContent").width() !== $("body:not(.home) #fsPageContent").width()) {
        $("body:not(.home) .infographic-container").addClass("along-left-banner");
      }
      if($("body:not(.home) .voices-container > .fsElementContent").width() !== $("body:not(.home) #fsPageContent").width()) {
        $("body:not(.home) .voices-container").addClass("along-left-banner");
      }
    },1000);
    $(window).on("resize",function() {
      if($("body:not(.home) .infographic-container > .fsElementContent").width() == $("body:not(.home) #fsPageContent").width()) {
        $("body:not(.home) .infographic-container").removeClass("along-left-banner");
      } else {
        $("body:not(.home) .infographic-container").addClass("along-left-banner");
      }
      if($("body:not(.home) .voices-container > .fsElementContent").width() == $("body:not(.home) #fsPageContent").width()) {
        $("body:not(.home) .voices-container").removeClass("along-left-banner");
      } else {
        $("body:not(.home) .voices-container").addClass("along-left-banner");
      }
    });

    var infoSlides = $('.infographic-container > footer > .fsElementFooterContent').text();

    $('body:not(.fsComposeMode) .infographic-container > .fsElementContent').slick({
      slidesToShow:  infoSlides,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3
          }
        },
        {
        breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    $.fn.setIcon = function() {

      $('.infographic-stat .fsElementHeaderContent').each(function(i) {
        var iconGet = $(this).text();
        $(this).append("<i></i>");
        $(this).find('i').addClass(iconGet);
      });
    };

    $('.home:not(.fsComposeMode) .info-box').setIcon();

    // ================================
    // Visitation Voices
    // ================================

    $('.profile .fsElementFooterContent').wrapInner('<div class="footer-wrap"></div>');

    $('.profile .fsElementFooterContent').each(function(){
      $(this).find('a').appendTo(this);
    });

    $('.profile:not(.profile--style5) .footer-wrap').dotdotdot({
      watch: window
    });

    $('.profile--style5 .footer-wrap em').dotdotdot({
      watch: window
    });

    $('.profile.profile--style5 img').wrap('<div class="border-wrapper"></div>');

    // ================================
    // Image Callouts
    // ================================
    $(".image-callout").each(function() {
      var anchor = $(this).find(">.fsElementContent a").first();
      anchor.clone().addClass("overlay").prependTo($(this));
    });

    // ================================
    // News & Events
    // ================================

    $('.news-home article').each(function() {
      $(this).children().not('.fsThumbnail').wrapAll('<div class="news-content"></div>');
      if ($(this).find('.fsThumbnail').length) {
        return true;
      } else {
        $(this).addClass('no-image');
        $(this).prepend("<a class='fsThumbnail fsNewsPostLink' href='#'><img src='/uploaded/themes/default_16/images/news-fallback.png' alt='News Default Image'></a>");
      }
    });

    $('.calendar-home article').unwrap();
    $('.calendar-home').each(function(){
      var dates = $('article', this);
      for(var i = 0; i < dates.length; i+=3) {
        dates.slice(i, i+3).wrapAll('<div class="slide-wrapper"></div');
      }
    });

    $('.calendar-home > .fsElementContent > .fsListItems').slick({
      slidesToShow:  1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    });

    // ================================
    // Athletic Events List
    // ================================

    // $('.fsAthleticsEvent.fsList article').each(function(){
    //   var $eventTime = $(this).find('.fsDateTime');
    //   $(':not(.fsDate)', $eventTime).children().wrapAll('<div class="time-wrapper"></div>');
    //   $('time-wrapper').insertBefore($(this).find('.fsTitle'));
    // });


    // ================================
    // Off Canvas Menu
    // ================================

    if($navSub.find('nav .fsNavLevel1').length !== 0) {
      $navSub.removeClass( 'nav-sub-empty' );
    } else {
      $navSub.addClass( 'nav-sub-empty' );
    }

    // nav-sub - mobile toggle
    $navSub_title.click( function() {
      $(this).closest( '.nav-sub' ).toggleClass( 'active-nav' );
    });

    $(document).on('click', function(event) {
      if ( !$(event.target).closest( '.nav-sub' ).length ) {
        $navSub.removeClass( 'active-nav' );
      }
    });

    $('.header-top > .fsElementContent').prepend([
      '<div class="drawer-ribbon">',
      '<button class="drawer-trigger" href="#"></button>',
      '</div>'
    ].join('\n'));

    $('.fsMenu').prepend('<div class="close-btn"></div>');

    $('.drawer-trigger').click(function() {
      $body.toggleClass('drawer-is-active');
    });

    $('.close-btn').click(function(){
      $('body').removeClass('drawer-is-active');
    });

    $('.mobile-nav li.fsNavParentPage').prepend('<div class="drop-trigger"></div>');

    $('.drop-trigger').click(function() {
      $(this).toggleClass('expanded');
      $(this).parent().find('> .fsNavPageInfo').slideToggle();
      $(this).parent().toggleClass('active');
      //need to make sure that current pages get the active class added to them by default and dont get it stuck to them
    });

    $('.fsMenu .mobile-nav ul li.fsNavCurrentPage').addClass('active');
    $('.fsMenu .mobile-nav ul li.fsNavCurrentPageAncestor').addClass('active');

    $('.fsMenu .mobile-nav ul li.fsNavCurrentPage > .drop-trigger').addClass('expanded');
    $('.fsMenu .mobile-nav ul li.fsNavCurrentPageAncestor > .drop-trigger').addClass('expanded');

    $('.utility-news-calendar').clone().appendTo('.drawer-ribbon');
    $('.utility-header .search-trigger-container').clone().appendTo('.drawer-ribbon');

    $('#fsMenu .nav-utility-header .fsNavLevel1 > li:first-child > a').text('Login');

    $('.drawer-ribbon .search-trigger-container').click(function() {
      $body.toggleClass('drawer-is-active');
    });

    // ================================
    // Sub Navigation
    // ================================

    $('.nav-sub').prepend('<div class="section-title"><a href="/'+sectionTitle+'">' + sectionTitle + '</a></div>');
    $('.section-title:empty').remove();

    // If the section title is clicked, activate the sub nav
    $('.section-title').click(function() {
      $(this).parent().toggleClass('active-nav');
    });

    $('.section-title a').click(function(e) {
      if($(window).width()<900) {
        e.preventDefault();
      }
    });

    if($navSub.find('nav .fsNavLevel1').length !== 0) {
      $navSub.removeClass( 'nav-sub-empty' );
    } else {
      $navSub.addClass( 'nav-sub-empty' );
    }

    // nav-sub - mobile toggle
    $navSub_title.click( function() {
      $(this).closest( '.nav-sub' ).toggleClass( 'active-nav' );
    });

    $(document).on('click', function(event) {
      if ( !$(event.target).closest( '.nav-sub' ).length ) {
        $navSub.removeClass( 'active-nav' );
      }
    });


    // ================================
    // Breadcrumb Navigation
    // ================================

    $('.fsBreadcrumb .fsNavBreadcrumbSeperator').text("\u2014");

    if($('body:not(.style-guide):not(.fsComposeMode)').length) {
      $('.fsBreadcrumb').prependTo('#fsPageBody');
    }

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

        announcement: function() {

          if ($('.announcement').length) {
            $('.announcement').before('<div class="announcement-tag">Announcement Open</div>');
            $('.announcement header').before('<div class="close-btn"></div>');
          }

          if(notDraftMode) {
          $(window).on('load',function(){
            $('.announcement').insertAfter('#fsHeader > .fsBanner');
            $('.announcement-tag').insertAfter('#fsHeader > .fsBanner');
          });
          }

          $('.announcement .close-btn').on('click', function() {
            $('.announcement, .announcement-tag').addClass('hidden');
          });
          $('.announcement-tag').on('click', function() {
            $('.announcement, .announcement-tag').removeClass('hidden');
          });

          $(window).on('load resize', function() {
            if ($(window).width() < 999) {
              $('.announcement, .announcement-tag').addClass('hidden');
            }
          });

        },

    };

    UTIL.respondSliders();
    UTIL.announcement();

    // ================================
    // Enhancements
    // ================================

    $('.module').each(function() {
      $(this).find('img').prependTo($(this)).wrap('<div class="image-wrapper"></div>');
    });

}); //jQuery


function backgroundImage(t){backgroundElement=t,$(backgroundElement).each(function(){var t=$(this).find("img").attr("src");$(this).css("background-image",'url("'+t+'")')})}function debounce(t,e,i){var n;return function(){var o=this,a=arguments,r=function(){n=null,i||t.apply(o,a)},l=i&&!n;clearTimeout(n),n=setTimeout(r,e),l&&t.apply(o,a)}}function placeholder(t,e){"use strict";var i,n,o=100,a=100;i=function r(){t.find("input.gsc-input").length?$.support.placeholder?t.find("input.gsc-input").attr("placeholder",e):t.find("input.gsc-input").attr("value",e):o>0&&(n=setTimeout(r,a),o-=1)},n=setTimeout(i,a)}function nano(t,e){return t.replace(/\{([\w\.]*)\}/g,function(t,i){for(var n=i.split("."),o=e[n.shift()],a=0,r=n.length;a<r;a++)o=o[n[a]];return"undefined"!=typeof o&&null!==o?o:""})}if($.fn.campusMap=function(){function t(t){var e=t[0].dataset.mediaPlaylistId;e="/cf_endpoints/routes.cfm/media/groups/"+e+"/objects.json",$.getJSON(e,function(t){$.each(t.objects,function(t,e){$('<article class="fsSlide">          <div class="fsCaptionTitleWrapper">            <div class="fsSlideTitle">'+e.object_title+'</div>          </div>          <div class="fsCaptionDescWrapper">            <div class="fsSlideDescription">'+e.object_description+'</div>          </div>          <div class="fsSlideImage" style="background-image: url('+e.full_path+');">            <img title="'+e.object_title+'" src="'+e.full_path+'" class="universal-img" />          </div>        </article>').appendTo($(".map-detail"))})}).done(function(){$(".map-detail").slick({slide:"article",dots:!1,arrows:!1,adaptiveHeight:!0}),$(".map-detail").on("afterChange",function(t,e,i){$(this).find(".slick-slide.slick-active .slick-dots li:nth-child("+(i+1)+")").addClass("slick-active"),e.setOption("autoplaySpeed",7500)})})}function e(t,e){$(".coordinates-popup").length&&$(".coordinates-popup").remove();var i=e.offset().left,n=e.offset().top;finalX=((t.pageX-i)/a*100).toFixed(2),finalY=((t.pageY-n)/r*100).toFixed(2),$('<span style="top:'+finalY+"%;left:"+finalX+'%;" class="coordinates-popup"><span class="html-markup">&lt;li&gt;&lt;a href="" data-posx="'+finalX+'" data-posy="'+finalY+'"&gt;ENTER TITLE HERE&lt;/a&gt;&lt;/li&gt;</span><button class="copyButton">Copy</button></span>').prependTo(e)}var i=this,n=($(document).height(),$("body"));if($(i.selector).length){$(document).on("click",".copyButton",function(){var t=$("<input>");$("body").append(t),t.val($(".html-markup").text()).select(),document.execCommand("copy"),t.remove(),$(".copyButton").addClass("success").html("Copied")});var o=$(".map-container"),a=o.width(),r=o.height();$("body.fsDraftMode.campus-map .map-container img").on("click",function(t){e(t,o)}),$(document).on("click",function(t){$(t.target).closest(".map-pop-container, .map-key a, .map-points a").length||(n.removeClass("map-pop-active"),$(".map-pop-wrapper").remove(),$(".map-points li").removeClass("active-modal"))}),$(".locations li").each(function(t){$(this).find("a").prepend('<span class="marker">'+ ++t+"</span>")}),$(".locations").each(function(t){$(this).addClass("category-"+(t+1)),$(this).find("li > a").addClass("link-"+(t+1))}),$(".locations > .fsElementContent").each(function(){$(this).clone().removeAttr("id").removeClass("fsElementContent").addClass("map-points").appendTo(".map-container")}),$(".map-points ul:not(.redactor-toolbar) > li").each(function(){var t=$(this).find("> a").data("posx"),e=$(this).find("> a").data("posy");$(this).css({left:t+"%",top:e-3+"%"})}),$(".locations .fsElementContent ul:not(.redactor-toolbar) > li, .map-points ul:not(.redactor-toolbar)>li").each(function(e){$(this).addClass("pin-"+(e+1)),$(this).find("a").click(function(){$(".map-pop-wrapper").remove(),$(".map-points ul > li").removeClass("active-modal"),$(this).parent("li").addClass("active-modal");var e=$(this).data("posx"),i=$(this).data("posy");$('<div class="map-pop-wrapper"><div class="map-pop-container"><div class="map-detail"></div></div></div>').appendTo($(".map-container")),$(".map-pop-wrapper").css({left:e+"%",top:i+"%"}),$("html, body").animate({scrollTop:$(".map-container").offset().top-20},700);var n=$(this).parent().index()+1;$(".map-points ul > li.pin-"+n).addClass("active-modal");$(this).attr("href");return $("body").addClass("map-pop-active"),t($(this)),!1})})}},$("body.campus-map").campusMap(),$(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(t){var e,i,n=$(t.target).closest(".fsCalendarDaybox");i=n.clone(),e=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(i),n.addClass("selected"),$("html,body").animate({scrollTop:e},450)},onClickScrollUp=function(){var t=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:t},450)},onAJAXSuccess=function(t,e,i,n){var o=$(n).hasClass("fsCalendar fsGrid");o&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}!function(t,e,i,n){t.fn.doubleTapToGo=function(n){return!!("ontouchstart"in e||navigator.msMaxTouchPoints||navigator.userAgent.toLowerCase().match(/windows phone os 7/i))&&(this.each(function(){var e=!1;t(this).on("click",function(i){var n=t(this);n[0]!=e[0]&&(i.preventDefault(),e=n)}),t(i).on("click touchstart MSPointerDown",function(i){for(var n=!0,o=t(i.target).parents(),a=0;a<o.length;a++)o[a]==e[0]&&(n=!1);n&&(e=!1)})}),this)}}(jQuery,window,document),function(t){function e(e){function n(e){var i=(d.gutterX,d.gutterY,d.cellH),n=d.cellW,a=t(e),r=a.find(a.attr("data-handle"));o.setDraggable(e,{handle:r[0],onStart:function(t){c.animate&&o.transition&&o.setTransition(this,""),a.css("z-index",9999).addClass("fw-float"),c.onBlockDrag.call(e,t)},onDrag:function(t,o){var r=a.position(),l=Math.round(r.top/i),h=Math.round(r.left/n),u=Math.round(a.width()/n),f=Math.round(a.height()/i);l=Math.min(Math.max(0,l),d.limitRow-f),h=Math.min(Math.max(0,h),d.limitCol-u),s.setHoles({top:l,left:h,width:u,height:f}),s.refresh(),c.onBlockMove.call(e,t)},onDrop:function(o){var r=a.position(),l=Math.round(r.top/i),h=Math.round(r.left/n),u=Math.round(a.width()/n),f=Math.round(a.height()/i);l=Math.min(Math.max(0,l),d.limitRow-f),h=Math.min(Math.max(0,h),d.limitCol-u),a.removeClass("fw-float"),a.css({zIndex:"auto",top:l*i,left:h*n});var p,g,m,v;for(g=0;g<f;++g)for(p=0;p<u;++p)m=g+l+"-"+(p+h),v=d.matrix[m],v&&1!=v&&t("#"+v).removeAttr("data-position");d.holes={},a.attr({"data-width":a.width(),"data-height":a.height(),"data-position":l+"-"+h}),s.refresh(),c.onBlockDrop.call(e,o)}})}var r=t(e);"static"==r.css("position")&&r.css("position","relative");var l=Number.MAX_VALUE,s=this;o.totalGrid+=1;var c=t.extend({},o.defaultConfig),d={arguments:null,blocks:{},events:{},matrix:{},holes:{},cellW:0,cellH:0,cellS:1,filter:"",lastId:0,length:0,maxWoB:0,maxHoB:0,minWoB:l,minHoB:l,running:0,gutterX:15,gutterY:15,totalCol:0,totalRow:0,limitCol:666666,limitRow:666666,sortFunc:null,keepOrder:!1};c.runtime=d,d.totalGrid=o.totalGrid;var h=document.body.style;o.transition||(null!=h.webkitTransition||null!=h.MozTransition||null!=h.msTransition||null!=h.OTransition||null!=h.transition)&&(o.transition=!0),t.extend(s,{addCustomEvent:function(t,e){var i=d.events;return t=t.toLowerCase(),!i[t]&&(i[t]=[]),e.eid=i[t].length,i[t].push(e),this},appendBlock:function(e){var i=t(e).appendTo(r),l=null,s=[];d.arguments&&(t.isFunction(d.sortFunc)&&i.sort(d.sortFunc),i.each(function(t,e){e.index=++t,l=o.loadBlock(e,c),l&&s.push(l)}),a[c.engine](s,c),o.setWallSize(d,r),d.length=i.length,i.each(function(t,e){o.showBlock(e,c),(c.draggable||e.getAttribute("data-draggable"))&&n(e)}))},appendHoles:function(t){var e,i=[].concat(t),n={};for(e=0;e<i.length;++e)n=i[e],d.holes[n.top+"-"+n.left+"-"+n.width+"-"+n.height]=n;return this},container:r,destroy:function(){var e=r.find(c.selector).removeAttr("id");e.each(function(e,i){$item=t(i);var n=1*$item.attr("data-width")||"",o=1*$item.attr("data-height")||"";$item.width(n).height(o).css({position:"static"})})},fillHoles:function(t){if(0==arguments.length)d.holes={};else{var e,i=[].concat(t),n={};for(e=0;e<i.length;++e)n=i[e],delete d.holes[n.top+"-"+n.left+"-"+n.width+"-"+n.height]}return this},filter:function(t){return d.filter=t,d.arguments&&this.refresh(),this},fireEvent:function(t,e,i){var n=d.events;if(t=t.toLowerCase(),n[t]&&n[t].length)for(var o=0;o<n[t].length;++o)n[t][o].call(this,e,i);return this},fitHeight:function(t){var t=t?t:r.height()||i.height();this.fitZone("auto",t),d.arguments=arguments},fitWidth:function(t){var t=t?t:r.width()||i.width();this.fitZone(t,"auto"),d.arguments=arguments},fitZone:function(e,l){var h=r.find(c.selector).removeAttr("id"),u=null,f=[];l=l?l:r.height()||i.height(),e=e?e:r.width()||i.width(),d.arguments=arguments,o.resetGrid(d),o.adjustUnit(e,l,c),d.filter?(h.data("active",0),h.filter(d.filter).data("active",1)):h.data("active",1),t.isFunction(d.sortFunc)&&h.sort(d.sortFunc),h.each(function(e,i){var n=t(i);i.index=++e,u=o.loadBlock(i,c),u&&n.data("active")&&f.push(u)}),s.fireEvent("onGridReady",r,c),a[c.engine](f,c),o.setWallSize(d,r),s.fireEvent("onGridArrange",r,c),d.length=h.length,h.each(function(t,e){o.showBlock(e,c),(c.draggable||e.getAttribute("data-draggable"))&&n(e)})},fixPos:function(e){return t(e.block).attr({"data-position":e.top+"-"+e.left}),this},fixSize:function(e){return null!=e.height&&t(e.block).attr({"data-height":e.height}),null!=e.width&&t(e.block).attr({"data-width":e.width}),this},prepend:function(t){return r.prepend(t),d.arguments&&this.refresh(),this},refresh:function(){var t=arguments.length?arguments:d.arguments,e=d.arguments,i=e?e.callee:this.fitWidth;return i.apply(this,Array.prototype.slice.call(t,0)),this},reset:function(e){return t.extend(c,e),this},setHoles:function(t){var e,i=[].concat(t),n={};for(d.holes={},e=0;e<i.length;++e)n=i[e],d.holes[n.top+"-"+n.left+"-"+n.width+"-"+n.height]=n;return this},sortBy:function(t){return d.sortFunc=t,d.arguments&&this.refresh(),this},unFilter:function(){return delete d.filter,this.refresh(),this}}),r.attr("data-min-width",80*Math.floor(i.width()/80));for(var u in o.plugin)o.plugin.hasOwnProperty(u)&&o.plugin[u].call(s,c,r);i.resize(function(){d.running||(d.running=1,setTimeout(function(){d.running=0,c.onResize.call(s,r)},122),r.attr("data-min-width",80*Math.floor(i.width()/80)))})}null==t.isNumeric&&(t.isNumeric=function(t){return null!=t&&t.constructor===Number}),null==t.isFunction&&(t.isFunction=function(t){return null!=t&&t instanceof Function});var i=t(window),n=t(document),o={defaultConfig:{animate:!1,cellW:100,cellH:100,delay:0,engine:"giot",fixSize:null,gutterX:15,gutterY:15,keepOrder:!1,selector:"> div",draggable:!1,cacheSize:!0,rightToLeft:!1,bottomToTop:!1,onGapFound:function(){},onComplete:function(){},onResize:function(){},onBlockDrag:function(){},onBlockMove:function(){},onBlockDrop:function(){},onBlockReady:function(){},onBlockFinish:function(){},onBlockActive:function(){},onBlockResize:function(){}},plugin:{},totalGrid:1,transition:!1,loadBlock:function(e,i){var n=i.runtime,o=n.gutterX,a=n.gutterY,r=n.cellH,l=n.cellW,s=null,c=t(e),d=c.data("active"),h=c.attr("data-position"),u=parseInt(c.attr("data-fixSize")),f=n.lastId++ +"-"+n.totalGrid;if(c.hasClass("fw-float"))return null;c.attr({id:f,"data-delay":e.index}),i.animate&&this.transition&&this.setTransition(e,""),isNaN(u)&&(u=null),null==u&&(u=i.fixSize);var p=u?"ceil":"round";null==c.attr("data-height")&&c.attr("data-height",c.height()),null==c.attr("data-width")&&c.attr("data-width",c.width());var g=1*c.attr("data-height"),m=1*c.attr("data-width");i.cacheSize||(e.style.width="",m=c.width(),e.style.height="",g=c.height());var v=m?Math[p]((m+o)/l):0,b=g?Math[p]((g+a)/r):0;if(u||"auto"!=i.cellH||(c.width(l*v-o),e.style.height="",g=c.height(),b=g?Math.round((g+a)/r):0),u||"auto"!=i.cellW||(c.height(r*b-a),e.style.width="",m=c.width(),v=m?Math.round((m+o)/l):0),null!=u&&(v>n.limitCol||b>n.limitRow))s=null;else if(b&&b<n.minHoB&&(n.minHoB=b),v&&v<n.minWoB&&(n.minWoB=v),b>n.maxHoB&&(n.maxHoB=b),v>n.maxWoB&&(n.maxWoB=v),0==m&&(v=0),0==g&&(b=0),s={resize:!1,id:f,width:v,height:b,fixSize:u},h){h=h.split("-"),s.y=1*h[0],s.x=1*h[1],s.width=null!=u?v:Math.min(v,n.limitCol-s.x),s.height=null!=u?b:Math.min(b,n.limitRow-s.y);var y=s.y+"-"+s.x+"-"+s.width+"-"+s.height;d?(n.holes[y]={id:s.id,top:s.y,left:s.x,width:s.width,height:s.height},this.setBlock(s,i)):delete n.holes[y]}return null==c.attr("data-state")?c.attr("data-state","init"):c.attr("data-state","move"),i.onBlockReady.call(e,s,i),h&&d?null:s},setBlock:function(t,e){var i=e.runtime,n=i.gutterX,o=i.gutterY,a=t.height,r=t.width,l=i.cellH,s=i.cellW,c=t.x,d=t.y;e.rightToLeft&&(c=i.limitCol-c-r),e.bottomToTop&&(d=i.limitRow-d-a);var h={fixSize:t.fixSize,resize:t.resize,top:d*l,left:c*s,width:s*r-n,height:l*a-o};return h.top=1*h.top.toFixed(2),h.left=1*h.left.toFixed(2),h.width=1*h.width.toFixed(2),h.height=1*h.height.toFixed(2),t.id&&(i.blocks[t.id]=h),h},showBlock:function(e,i){function n(){if(c&&l.attr("data-state","start"),i.animate&&s.transition&&s.setTransition(e,d),o.length-=1,r)r.fixSize&&(r.height=1*l.attr("data-height"),r.width=1*l.attr("data-width")),l.css({opacity:1,width:r.width,height:r.height}),l[a]({top:r.top,left:r.left}),null!=l.attr("data-nested")&&s.nestedGrid(e,i);else{var t=parseInt(e.style.height)||0,n=parseInt(e.style.width)||0,h=parseInt(e.style.left)||0,u=parseInt(e.style.top)||0;l[a]({left:h+n/2,top:u+t/2,width:0,height:0,opacity:0})}if(i.onBlockFinish.call(e,r,i),0==o.length){var f=i.animate?500:0;e.delay=setTimeout(function(){i.onComplete.call(e,r,i)},f)}}var o=i.runtime,a=i.animate&&!this.transition?"animate":"css",r=o.blocks[e.id],l=t(e),s=this,c="move"!=l.attr("data-state"),d=c?"width 0.5s, height 0.5s":"top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";e.delay&&clearTimeout(e.delay),l.hasClass("fw-float")||(s.setTransition(e,""),e.style.position="absolute",i.onBlockActive.call(e,r,i),r&&r.resize&&i.onBlockResize.call(e,r,i),i.delay>0?e.delay=setTimeout(n,i.delay*l.attr("data-delay")):n())},nestedGrid:function(i,n){var o,a=t(i),r=n.runtime,l=a.attr("data-gutterX")||n.gutterX,s=a.attr("data-gutterY")||n.gutterY,c=a.attr("data-method")||"fitZone",d=a.attr("data-nested")||"> div",h=a.attr("data-cellH")||n.cellH,u=a.attr("data-cellW")||n.cellW,f=r.blocks[i.id];if(f)switch(o=new e(a),o.reset({cellH:h,cellW:u,gutterX:1*l,gutterY:1*s,selector:d,cacheSize:!1}),c){case"fitHeight":o[c](f.height);break;case"fitWidth":o[c](f.width);break;case"fitZone":o[c](f.width,f.height)}},adjustBlock:function(e,i){var n=i.runtime,o=n.gutterX,a=n.gutterY,r=t("#"+e.id),l=n.cellH,s=n.cellW;"auto"==i.cellH&&(r.width(e.width*s-o),r[0].style.height="",e.height=Math.round((r.height()+a)/l))},adjustUnit:function(e,i,n){var o=n.gutterX,a=n.gutterY,r=n.runtime,l=n.cellW,s=n.cellH;if(t.isFunction(l)&&(l=l(e)),l=1*l,!t.isNumeric(l)&&(l=1),t.isFunction(s)&&(s=s(i)),s=1*s,!t.isNumeric(s)&&(s=1),t.isNumeric(e)){l<1&&(l*=e);var c=Math.max(1,Math.floor(e/l));t.isNumeric(o)||(o=(e-c*l)/Math.max(1,c-1),o=Math.max(0,o)),c=Math.floor((e+o)/l),r.cellW=(e+o)/Math.max(c,1),r.cellS=r.cellW/l,r.gutterX=o,r.limitCol=c}if(t.isNumeric(i)){s<1&&(s*=i);var d=Math.max(1,Math.floor(i/s));t.isNumeric(a)||(a=(i-d*s)/Math.max(1,d-1),a=Math.max(0,a)),d=Math.floor((i+a)/s),r.cellH=(i+a)/Math.max(d,1),r.cellS=r.cellH/s,r.gutterY=a,r.limitRow=d}t.isNumeric(e)||(l<1&&(l=r.cellH),r.cellW=1!=l?l*r.cellS:1,r.gutterX=o,r.limitCol=666666),t.isNumeric(i)||(s<1&&(s=r.cellW),r.cellH=1!=s?s*r.cellS:1,r.gutterY=a,r.limitRow=666666),r.keepOrder=n.keepOrder},resetGrid:function(t){t.blocks={},t.length=0,t.cellH=0,t.cellW=0,t.lastId=1,t.matrix={},t.totalCol=0,t.totalRow=0},setDraggable:function(e,i){var o=!1,a={startX:0,startY:0,top:0,left:0,handle:null,onDrop:function(){},onDrag:function(){},onStart:function(){}};t(e).each(function(){function e(t){return t.stopPropagation(),t=t.originalEvent,t.touches&&(o=!0,t=t.changedTouches[0]),2!=t.button&&3!=t.which&&(s.onStart.call(d,t),s.startX=t.clientX,s.startY=t.clientY,s.top=parseInt(h.css("top"))||0,s.left=parseInt(h.css("left"))||0,n.bind("mouseup touchend",l),n.bind("mousemove touchmove",r)),!1}function r(t){t=t.originalEvent,o&&(t=t.changedTouches[0]),h.css({top:s.top-(s.startY-t.clientY),left:s.left-(s.startX-t.clientX)}),s.onDrag.call(d,t)}function l(t){t=t.originalEvent,o&&(t=t.changedTouches[0]),s.onDrop.call(d,t),n.unbind("mouseup touchend",l),n.unbind("mousemove touchmove",r)}var s=t.extend({},a,i),c=s.handle||this,d=this,h=t(d),u=t(c),f=h.css("position");"absolute"!=f&&h.css("position","relative"),h.find("iframe, form, input, textarea, .ignore-drag").each(function(){t(this).on("touchstart mousedown",function(t){t.stopPropagation()})}),n.unbind("mouseup touchend",l),n.unbind("mousemove touchmove",r),u.unbind("mousedown touchstart").bind("mousedown touchstart",e)})},setTransition:function(e,i){var n=e.style,o=t(e);!this.transition&&o.stop?o.stop():null!=n.webkitTransition?n.webkitTransition=i:null!=n.MozTransition?n.MozTransition=i:null!=n.msTransition?n.msTransition=i:null!=n.OTransition?n.OTransition=i:n.transition=i},getFreeArea:function(t,e,i){for(var n=Math.min(t+i.maxHoB,i.limitRow),o=Math.min(e+i.maxWoB,i.limitCol),a=o,r=n,l=i.matrix,s=t;s<r;++s)for(var c=e;c<o;++c)l[s+"-"+c]&&e<c&&c<a&&(a=c);for(var s=t;s<n;++s)for(var c=e;c<a;++c)l[s+"-"+c]&&t<s&&s<r&&(r=s);return{top:t,left:e,width:a-e,height:r-t}},setWallSize:function(t,e){var i=t.totalRow,n=t.totalCol,o=t.gutterY,a=t.gutterX,r=t.cellH,l=t.cellW,s=Math.max(0,l*n-a),c=Math.max(0,r*i-o);e.attr({"data-total-col":n,"data-total-row":i,"data-wall-width":Math.ceil(s),"data-wall-height":Math.ceil(c)}),t.limitCol<t.limitRow&&!e.attr("data-height")&&e.height(Math.ceil(c))}},a={giot:function(t,e){function i(t,e,i,n,o){for(var a=e;a<e+o;){for(var r=i;r<i+n;)p[a+"-"+r]=t,++r>c&&(c=r);++a>d&&(d=a)}}var n=e.runtime,a=n.limitRow,r=n.limitCol,l=0,s=0,c=n.totalCol,d=n.totalRow,h={},u=n.holes,f=null,p=n.matrix,g=Math.max(r,a),m=null,v=null,b=r<a?1:0,y=null,w=Math.min(r,a);for(var x in u)u.hasOwnProperty(x)&&i(u[x].id||!0,u[x].top,u[x].left,u[x].width,u[x].height);for(var C=0;C<g&&t.length;++C){b?s=C:l=C,y=null;for(var k=0;k<w&&t.length;++k)if(f=null,b?l=k:s=k,!n.matrix[s+"-"+l]){if(m=o.getFreeArea(s,l,n),null==e.fixSize){if(y&&!b&&n.minHoB>m.height){y.height+=m.height,y.resize=!0,i(y.id,y.y,y.x,y.width,y.height),o.setBlock(y,e);continue}if(y&&b&&n.minWoB>m.width){y.width+=m.width,y.resize=!0,i(y.id,y.y,y.x,y.width,y.height),o.setBlock(y,e);continue}}if(n.keepOrder)f=t.shift(),f.resize=!0;else{for(var x=0;x<t.length;++x)if(!(t[x].height>m.height||t[x].width>m.width)){f=t.splice(x,1)[0];break}if(null==f&&null==e.fixSize)for(var x=0;x<t.length;++x)if(null==t[x].fixSize){f=t.splice(x,1)[0],f.resize=!0;break}}if(null!=f)f.resize&&(b?(f.width=m.width,"auto"==e.cellH&&o.adjustBlock(f,e),f.height=Math.min(f.height,m.height)):(f.height=m.height,f.width=Math.min(f.width,m.width))),h[f.id]={id:f.id,x:l,y:s,width:f.width,height:f.height,resize:f.resize,fixSize:f.fixSize},y=h[f.id],i(y.id,y.y,y.x,y.width,y.height),o.setBlock(y,e);else{var v={x:l,y:s,fixSize:0};if(b){v.width=m.width,v.height=0;for(var $=l-1,T=s;p[T+"-"+$];)p[T+"-"+l]=!0,v.height+=1,T+=1}else{v.height=m.height,v.width=0;for(var T=s-1,$=l;p[T+"-"+$];)p[s+"-"+$]=!0,v.width+=1,$+=1}e.onGapFound(o.setBlock(v,e),e)}}}n.matrix=p,n.totalRow=d,n.totalCol=c}};e.addConfig=function(e){t.extend(o.defaultConfig,e)},e.createEngine=function(e){t.extend(a,e)},e.createPlugin=function(e){t.extend(o.plugin,e)},e.getMethod=function(t){return o[t]},window.Freewall=window.freewall=e}(window.Zepto||window.jQuery),$.fn.mediaSlider=function(t){slideshowClass=this;var e,i,n=600,o=$(slideshowClass).find(".fsMediaCustomPlayer"),a=o.attr("data-playlisturl"),r=$.extend({mediaTemplate:""},t),l={slide:r.mediaTemplate.join("\n")};o.data("display_loaded",!1),$.getJSON(a,function(t){var a;$(window).width()>n?e="full":(e="mobile",$(window).on("resize",function(){var t=$(this).width();t>n&&!o.data("display_loaded")&&!a&&($(window).data("display_loaded",!0),a=!0,o.find("article").each(function(){var t=$(this).find("img").attr("src").replace("/mobile/","/fullsize/");$(this).find("img").attr("src",t),$(this).attr("style",'background-image: url("'+t+'");')}))})),$.each(t.objects,function(n,a){i="full"===e?t.objects[n].full_path:t.objects[n].mobile_path,o.append(nano(l.slide,{imgSrc:i,captionTitle:t.objects[n].object_title,captionDesc:t.objects[n].object_description}))})}).done(function(){t.callback()}).fail(function(){o.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign","center")})},function(t,e){function i(t,e,i){var n=t.children(),o=!1;t.empty();for(var r=0,l=n.length;r<l;r++){var s=n.eq(r);if(t.append(s),i&&t.append(i),a(t,e)){s.remove(),o=!0;break}i&&i.detach()}return o}function n(e,i,r,l,s){var c=!1,d="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",h="script, .dotdotdot-keep";return e.contents().detach().each(function(){var u=this,f=t(u);if("undefined"==typeof u)return!0;if(f.is(h))e.append(f);else{if(c)return!0;e.append(f),!s||f.is(l.after)||f.find(l.after).length||e[e.is(d)?"after":"append"](s),a(r,l)&&(c=3==u.nodeType?o(f,i,r,l,s):n(f,i,r,l,s)),c||s&&s.detach()}}),i.addClass("is-truncated"),c}function o(e,i,n,o,l){var d=e[0];if(!d)return!1;var u=c(d),f=u.indexOf(" ")!==-1?" ":"　",p="letter"==o.wrap?"":f,g=u.split(p),m=-1,v=-1,b=0,y=g.length-1;for(o.fallbackToLetter&&0==b&&0==y&&(p="",g=u.split(p),y=g.length-1);b<=y&&(0!=b||0!=y);){var w=Math.floor((b+y)/2);if(w==v)break;v=w,s(d,g.slice(0,v+1).join(p)+o.ellipsis),n.children().each(function(){t(this).toggle().toggle()}),a(n,o)?(y=v,o.fallbackToLetter&&0==b&&0==y&&(p="",g=g[0].split(p),m=-1,v=-1,b=0,y=g.length-1)):(m=v,b=v)}if(m==-1||1==g.length&&0==g[0].length){var x=e.parent();e.detach();var C=l&&l.closest(x).length?l.length:0;if(x.contents().length>C?d=h(x.contents().eq(-1-C),i):(d=h(x,i,!0),C||x.detach()),d&&(u=r(c(d),o),s(d,u),C&&l)){var k=l.parent();t(d).parent().append(l),t.trim(k.html())||k.remove()}}else u=r(g.slice(0,m+1).join(p),o),s(d,u);return!0}function a(t,e){return t.innerHeight()>e.maxHeight}function r(e,i){for(;t.inArray(e.slice(-1),i.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),i.lastCharacter.noEllipsis)<0&&(e+=i.ellipsis),e}function l(t){return{width:t.innerWidth(),height:t.innerHeight()}}function s(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function c(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function d(t){do t=t.previousSibling;while(t&&1!==t.nodeType&&3!==t.nodeType);return t}function h(e,i,n){var o,a=e&&e[0];if(a){if(!n){if(3===a.nodeType)return a;if(t.trim(e.text()))return h(e.contents().last(),i)}for(o=d(a);!o;){if(e=e.parent(),e.is(i)||!e.length)return!1;o=d(e[0])}if(o)return h(t(o),i)}return!1}function u(e,i){return!!e&&("string"==typeof e?(e=t(e,i),!!e.length&&e):!!e.jquery&&e)}function f(t){for(var e=t.innerHeight(),i=["paddingTop","paddingBottom"],n=0,o=i.length;n<o;n++){var a=parseInt(t.css(i[n]),10);isNaN(a)&&(a=0),e-=a}return e}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(e){if(0==this.length)return t.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(e)});var o=this,r=o.contents();o.data("dotdotdot")&&o.trigger("destroy.dot"),o.data("dotdotdot-style",o.attr("style")||""),o.css("word-wrap","break-word"),"nowrap"===o.css("white-space")&&o.css("white-space","normal"),o.bind_events=function(){return o.bind("update.dot",function(e,l){switch(o.removeClass("is-truncated"),e.preventDefault(),e.stopPropagation(),typeof s.height){case"number":s.maxHeight=s.height;break;case"function":s.maxHeight=s.height.call(o[0]);break;default:s.maxHeight=f(o)}s.maxHeight+=s.tolerance,"undefined"!=typeof l&&(("string"==typeof l||"nodeType"in l&&1===l.nodeType)&&(l=t("<div />").append(l).contents()),l instanceof t&&(r=l)),g=o.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(r.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var d=!1,h=!1;return c.afterElement&&(d=c.afterElement.clone(!0),d.show(),c.afterElement.detach()),a(g,s)&&(h="children"==s.wrap?i(g,s,d):n(g,o,g,s,d)),g.replaceWith(g.contents()),g=null,t.isFunction(s.callback)&&s.callback.call(o[0],h,r),c.isTruncated=h,h}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],c.isTruncated),c.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],r),r}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),o.unwatch().unbind_events().contents().detach().end().append(r).attr("style",o.data("dotdotdot-style")||"").removeClass("is-truncated").data("dotdotdot",!1)}),o},o.unbind_events=function(){return o.unbind(".dot"),o},o.watch=function(){if(o.unwatch(),"window"==s.watch){var e=t(window),i=e.width(),n=e.height();e.bind("resize.dot"+c.dotId,function(){i==e.width()&&n==e.height()&&s.windowResizeFix||(i=e.width(),n=e.height(),h&&clearInterval(h),h=setTimeout(function(){o.trigger("update.dot")},100))})}else d=l(o),h=setInterval(function(){if(o.is(":visible")){var t=l(o);d.width==t.width&&d.height==t.height||(o.trigger("update.dot"),d=t)}},500);return o},o.unwatch=function(){return t(window).unbind("resize.dot"+c.dotId),h&&clearInterval(h),o};var s=t.extend(!0,{},t.fn.dotdotdot.defaults,e),c={},d={},h=null,g=null;return s.lastCharacter.remove instanceof Array||(s.lastCharacter.remove=t.fn.dotdotdot.defaultArrays.lastCharacter.remove),s.lastCharacter.noEllipsis instanceof Array||(s.lastCharacter.noEllipsis=t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),c.afterElement=u(s.after,o),c.isTruncated=!1,c.dotId=p++,o.data("dotdotdot",!0).bind_events().trigger("update.dot"),s.watch&&o.watch(),o},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},t.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},t.fn.dotdotdot.debug=function(t){};var p=1,g=t.fn.html;t.fn.html=function(i){return i!=e&&!t.isFunction(i)&&this.data("dotdotdot")?this.trigger("update",[i]):g.apply(this,arguments)};var m=t.fn.text;t.fn.text=function(i){return i!=e&&!t.isFunction(i)&&this.data("dotdotdot")?(i=t("<div />").text(i).html(),this.trigger("update",[i])):m.apply(this,arguments)}}}(jQuery),jQuery(document).ready(function(t){t(".dot-ellipsis").each(function(){var e=t(this).hasClass("dot-resize-update"),i=t(this).hasClass("dot-timer-update"),n=0,o=t(this).attr("class").split(/\s+/);t.each(o,function(t,e){var i=e.match(/^dot-height-(\d+)$/);null!==i&&(n=Number(i[1]))});var a=new Object;i&&(a.watch=!0),e&&(a.watch="window"),n>0&&(a.height=n),t(this).dotdotdot(a)})}),jQuery(window).on("load",function(){jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")}),function(t){"use strict";t.fn.succinct=function(e){var i=t.extend({size:240,omission:"...",ignore:!0},e);return this.each(function(){var e,n,o=t(this),a=/[!-\/:-@\[-`{-~]$/,r=function(){o.each(function(){e=t(this).html(),e.length>i.size&&(n=t.trim(e).substring(0,i.size).split(" ").slice(0,-1).join(" "),i.ignore&&(n=n.replace(a,"")),t(this).html(n+i.omission))})};r()})}}(jQuery),window.Modernizr=function(t,e,i){function n(t){b.cssText=t}function o(t,e){return typeof t===e}function a(t,e){return!!~(""+t).indexOf(e)}function r(t,e){for(var n in t){var o=t[n];if(!a(o,"-")&&b[o]!==i)return"pfx"!=e||o}return!1}function l(t,e,n){for(var a in t){var r=e[t[a]];if(r!==i)return n===!1?t[a]:o(r,"function")?r.bind(n||e):r}return!1}function s(t,e,i){var n=t.charAt(0).toUpperCase()+t.slice(1),a=(t+" "+C.join(n+" ")+n).split(" ");return o(e,"string")||o(e,"undefined")?r(a,e):(a=(t+" "+k.join(n+" ")+n).split(" "),l(a,e,i))}var c,d,h,u="2.8.3",f={},p=!0,g=e.documentElement,m="modernizr",v=e.createElement(m),b=v.style,y={}.toString,w=" -webkit- -moz- -o- -ms- ".split(" "),x="Webkit Moz O ms",C=x.split(" "),k=x.toLowerCase().split(" "),$={svg:"http://www.w3.org/2000/svg"},T={},M=[],S=M.slice,E=function(t,i,n,o){var a,r,l,s,c=e.createElement("div"),d=e.body,h=d||e.createElement("body");if(parseInt(n,10))for(;n--;)l=e.createElement("div"),l.id=o?o[n]:m+(n+1),c.appendChild(l);return a=["&#173;",'<style id="s',m,'">',t,"</style>"].join(""),c.id=m,(d?c:h).innerHTML+=a,h.appendChild(c),d||(h.style.background="",h.style.overflow="hidden",s=g.style.overflow,g.style.overflow="hidden",g.appendChild(h)),r=i(c,t),d?c.parentNode.removeChild(c):(h.parentNode.removeChild(h),g.style.overflow=s),!!r},j=function(e){var i=t.matchMedia||t.msMatchMedia;if(i)return i(e)&&i(e).matches||!1;var n;return E("@media "+e+" { #"+m+" { position: absolute; } }",function(e){n="absolute"==(t.getComputedStyle?getComputedStyle(e,null):e.currentStyle).position}),n},z={}.hasOwnProperty;h=o(z,"undefined")||o(z.call,"undefined")?function(t,e){return e in t&&o(t.constructor.prototype[e],"undefined")}:function(t,e){return z.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var i=S.call(arguments,1),n=function(){if(this instanceof n){var o=function(){};o.prototype=e.prototype;var a=new o,r=e.apply(a,i.concat(S.call(arguments)));return Object(r)===r?r:a}return e.apply(t,i.concat(S.call(arguments)))};return n}),T.flexbox=function(){return s("flexWrap")},T.flexboxlegacy=function(){return s("boxDirection")},T.touch=function(){var i;return"ontouchstart"in t||t.DocumentTouch&&e instanceof DocumentTouch?i=!0:E(["@media (",w.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(t){i=9===t.offsetTop}),i},T.cssanimations=function(){return s("animationName")},T.csscolumns=function(){return s("columnCount")},T.csstransforms=function(){return!!s("transform")},T.csstransforms3d=function(){var t=!!s("perspective");return t&&"webkitPerspective"in g.style&&E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e,i){t=9===e.offsetLeft&&3===e.offsetHeight}),t},T.csstransitions=function(){return s("transition")},T.video=function(){var t=e.createElement("video"),i=!1;try{(i=!!t.canPlayType)&&(i=new Boolean(i),i.ogg=t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),i.h264=t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),i.webm=t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(n){}return i},T.audio=function(){var t=e.createElement("audio"),i=!1;try{(i=!!t.canPlayType)&&(i=new Boolean(i),i.ogg=t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),i.mp3=t.canPlayType("audio/mpeg;").replace(/^no$/,""),i.wav=t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),i.m4a=(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return i},T.svg=function(){return!!e.createElementNS&&!!e.createElementNS($.svg,"svg").createSVGRect},T.inlinesvg=function(){var t=e.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==$.svg;
},T.svgclippaths=function(){return!!e.createElementNS&&/SVGClipPath/.test(y.call(e.createElementNS($.svg,"clipPath")))};for(var B in T)h(T,B)&&(d=B.toLowerCase(),f[d]=T[B](),M.push((f[d]?"":"no-")+d));return f.addTest=function(t,e){if("object"==typeof t)for(var n in t)h(t,n)&&f.addTest(n,t[n]);else{if(t=t.toLowerCase(),f[t]!==i)return f;e="function"==typeof e?e():e,"undefined"!=typeof p&&p&&(g.className+=" "+(e?"":"no-")+t),f[t]=e}return f},n(""),v=c=null,function(t,e){function i(t,e){var i=t.createElement("p"),n=t.getElementsByTagName("head")[0]||t.documentElement;return i.innerHTML="x<style>"+e+"</style>",n.insertBefore(i.lastChild,n.firstChild)}function n(){var t=b.elements;return"string"==typeof t?t.split(" "):t}function o(t){var e=v[t[g]];return e||(e={},m++,t[g]=m,v[m]=e),e}function a(t,i,n){if(i||(i=e),d)return i.createElement(t);n||(n=o(i));var a;return a=n.cache[t]?n.cache[t].cloneNode():p.test(t)?(n.cache[t]=n.createElem(t)).cloneNode():n.createElem(t),!a.canHaveChildren||f.test(t)||a.tagUrn?a:n.frag.appendChild(a)}function r(t,i){if(t||(t=e),d)return t.createDocumentFragment();i=i||o(t);for(var a=i.frag.cloneNode(),r=0,l=n(),s=l.length;r<s;r++)a.createElement(l[r]);return a}function l(t,e){e.cache||(e.cache={},e.createElem=t.createElement,e.createFrag=t.createDocumentFragment,e.frag=e.createFrag()),t.createElement=function(i){return b.shivMethods?a(i,t,e):e.createElem(i)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+n().join().replace(/[\w\-]+/g,function(t){return e.createElem(t),e.frag.createElement(t),'c("'+t+'")'})+");return n}")(b,e.frag)}function s(t){t||(t=e);var n=o(t);return b.shivCSS&&!c&&!n.hasCSS&&(n.hasCSS=!!i(t,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(t,n),t}var c,d,h="3.7.0",u=t.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",m=0,v={};!function(){try{var t=e.createElement("a");t.innerHTML="<xyz></xyz>",c="hidden"in t,d=1==t.childNodes.length||function(){e.createElement("a");var t=e.createDocumentFragment();return"undefined"==typeof t.cloneNode||"undefined"==typeof t.createDocumentFragment||"undefined"==typeof t.createElement}()}catch(i){c=!0,d=!0}}();var b={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:h,shivCSS:u.shivCSS!==!1,supportsUnknownElements:d,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:s,createElement:a,createDocumentFragment:r};t.html5=b,s(e)}(this,e),f._version=u,f._prefixes=w,f._domPrefixes=k,f._cssomPrefixes=C,f.mq=j,f.testProp=function(t){return r([t])},f.testAllProps=s,f.testStyles=E,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+M.join(" "):""),f}(this,this.document),function(t,e,i){function n(t){return"[object Function]"==m.call(t)}function o(t){return"string"==typeof t}function a(){}function r(t){return!t||"loaded"==t||"complete"==t||"uninitialized"==t}function l(){var t=v.shift();b=1,t?t.t?p(function(){("c"==t.t?u.injectCss:u.injectJs)(t.s,0,t.a,t.x,t.e,1)},0):(t(),l()):b=0}function s(t,i,n,o,a,s,c){function d(e){if(!f&&r(h.readyState)&&(y.r=f=1,!b&&l(),h.onload=h.onreadystatechange=null,e)){"img"!=t&&p(function(){x.removeChild(h)},50);for(var n in M[i])M[i].hasOwnProperty(n)&&M[i][n].onload()}}var c=c||u.errorTimeout,h=e.createElement(t),f=0,m=0,y={t:n,s:i,e:a,a:s,x:c};1===M[i]&&(m=1,M[i]=[]),"object"==t?h.data=i:(h.src=i,h.type=t),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){d.call(this,m)},v.splice(o,0,y),"img"!=t&&(m||2===M[i]?(x.insertBefore(h,w?null:g),p(d,c)):M[i].push(h))}function c(t,e,i,n,a){return b=0,e=e||"j",o(t)?s("c"==e?k:C,t,e,this.i++,i,n,a):(v.splice(this.i++,0,t),1==v.length&&l()),this}function d(){var t=u;return t.loader={load:c,i:0},t}var h,u,f=e.documentElement,p=t.setTimeout,g=e.getElementsByTagName("script")[0],m={}.toString,v=[],b=0,y="MozAppearance"in f.style,w=y&&!!e.createRange().compareNode,x=w?f:g.parentNode,f=t.opera&&"[object Opera]"==m.call(t.opera),f=!!e.attachEvent&&!f,C=y?"object":f?"script":"img",k=f?"script":C,$=Array.isArray||function(t){return"[object Array]"==m.call(t)},T=[],M={},S={timeout:function(t,e){return e.length&&(t.timeout=e[0]),t}};u=function(t){function e(t){var e,i,n,t=t.split("!"),o=T.length,a=t.pop(),r=t.length,a={url:a,origUrl:a,prefixes:t};for(i=0;i<r;i++)n=t[i].split("="),(e=S[n.shift()])&&(a=e(a,n));for(i=0;i<o;i++)a=T[i](a);return a}function r(t,o,a,r,l){var s=e(t),c=s.autoCallback;s.url.split(".").pop().split("?").shift(),s.bypass||(o&&(o=n(o)?o:o[t]||o[r]||o[t.split("/").pop().split("?")[0]]),s.instead?s.instead(t,o,a,r,l):(M[s.url]?s.noexec=!0:M[s.url]=1,a.load(s.url,s.forceCSS||!s.forceJS&&"css"==s.url.split(".").pop().split("?").shift()?"c":i,s.noexec,s.attrs,s.timeout),(n(o)||n(c))&&a.load(function(){d(),o&&o(s.origUrl,l,r),c&&c(s.origUrl,l,r),M[s.url]=2})))}function l(t,e){function i(t,i){if(t){if(o(t))i||(h=function(){var t=[].slice.call(arguments);u.apply(this,t),f()}),r(t,h,e,0,c);else if(Object(t)===t)for(s in l=function(){var e,i=0;for(e in t)t.hasOwnProperty(e)&&i++;return i}(),t)t.hasOwnProperty(s)&&(!i&&!--l&&(n(h)?h=function(){var t=[].slice.call(arguments);u.apply(this,t),f()}:h[s]=function(t){return function(){var e=[].slice.call(arguments);t&&t.apply(this,e),f()}}(u[s])),r(t[s],h,e,s,c))}else!i&&f()}var l,s,c=!!t.test,d=t.load||t.both,h=t.callback||a,u=h,f=t.complete||a;i(c?t.yep:t.nope,!!d),d&&i(d)}var s,c,h=this.yepnope.loader;if(o(t))r(t,0,h,0);else if($(t))for(s=0;s<t.length;s++)c=t[s],o(c)?r(c,0,h,0):$(c)?u(c):Object(c)===c&&l(c,h);else Object(t)===t&&l(t,h)},u.addPrefix=function(t,e){S[t]=e},u.addFilter=function(t){T.push(t)},u.errorTimeout=1e4,null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",h=function(){e.removeEventListener("DOMContentLoaded",h,0),e.readyState="complete"},0)),t.yepnope=d(),t.yepnope.executeStack=l,t.yepnope.injectJs=function(t,i,n,o,s,c){var d,h,f=e.createElement("script"),o=o||u.errorTimeout;f.src=t;for(h in n)f.setAttribute(h,n[h]);i=c?l:i||a,f.onreadystatechange=f.onload=function(){!d&&r(f.readyState)&&(d=1,i(),f.onload=f.onreadystatechange=null)},p(function(){d||(d=1,i(1))},o),s?f.onload():g.parentNode.insertBefore(f,g)},t.yepnope.injectCss=function(t,i,n,o,r,s){var c,o=e.createElement("link"),i=s?l:i||a;o.href=t,o.rel="stylesheet",o.type="text/css";for(c in n)o.setAttribute(c,n[c]);r||(g.parentNode.insertBefore(o,g),p(i,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(t,e,i,n){function o(e,i){this.el=e,this.$el=t(this.el),this.options=t.extend({},r,i),this._defaults=r,this._name=a,this.init()}var a="nivoLightbox",r={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(t){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(t){},onNext:function(t){},errorMessage:"The requested content cannot be loaded. Please try again later."};o.prototype={init:function(){var e=this;t("html").hasClass("nivo-lightbox-notouch")||t("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in i&&t("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(t){e.showLightbox(t)}),this.options.keyboardNav&&t("body").off("keyup").on("keyup",function(i){var n=i.keyCode?i.keyCode:i.which;27==n&&e.destructLightbox(),37==n&&t(".nivo-lightbox-prev").trigger("click"),39==n&&t(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(e){var i=this,n=this.$el,o=this.checkContent(n);if(o){e.preventDefault(),this.options.beforeShowLightbox.call(this);var a=this.constructLightbox();if(a){var r=a.find(".nivo-lightbox-content");if(r){if(t("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(r,n),this.$el.attr("data-lightbox-gallery")){var l=t('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');t(".nivo-lightbox-nav").show(),t(".nivo-lightbox-prev").off("click").on("click",function(e){e.preventDefault();var o=l.index(n);n=l.eq(o-1),t(n).length||(n=l.last()),i.processContent(r,n),i.options.onPrev.call(this,[n])}),t(".nivo-lightbox-next").off("click").on("click",function(e){e.preventDefault();var o=l.index(n);n=l.eq(o+1),t(n).length||(n=l.first()),i.processContent(r,n),i.options.onNext.call(this,[n])})}setTimeout(function(){a.addClass("nivo-lightbox-open"),i.options.afterShowLightbox.call(this,[a])},1)}}}},checkContent:function(t){var e=t.attr("href"),i=e.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==e.match(/\.(jpeg|jpg|gif|png)$/i)||(!!i||("ajax"==t.attr("data-lightbox-type")||("#"==e.substring(0,1)&&"inline"==t.attr("data-lightbox-type")||"iframe"==t.attr("data-lightbox-type"))))},processContent:function(i,n){var o=this,a=n.attr("href"),r=a.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(i.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&n.attr("data-lightbox-hidpi")&&(a=n.attr("data-lightbox-hidpi")),null!==a.match(/\.(jpeg|jpg|gif|png)$/i)){var l=t("<img>",{src:a});l.one("load",function(){var n=t('<div class="nivo-lightbox-image" />');n.append(l),i.html(n).removeClass("nivo-lightbox-loading"),n.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"}),t(e).resize(function(){n.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&t(this).load()}),l.error(function(){var e=t('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");i.html(e).removeClass("nivo-lightbox-loading")})}else if(r){var s="",c="nivo-lightbox-video";if("youtube"==r[1]&&(s="http://www.youtube.com/embed/"+r[4],c="nivo-lightbox-youtube"),"youtu"==r[1]&&(s="http://www.youtube.com/embed/"+r[3],c="nivo-lightbox-youtube"),"vimeo"==r[1]&&(s="http://player.vimeo.com/video/"+r[3],c="nivo-lightbox-vimeo"),s){var d=t("<iframe>",{src:s,"class":c,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});i.html(d),d.load(function(){i.removeClass("nivo-lightbox-loading")})}}else if("ajax"==n.attr("data-lightbox-type"))t.ajax({url:a,cache:!1,success:function(n){var o=t('<div class="nivo-lightbox-ajax" />');o.append(n),i.html(o).removeClass("nivo-lightbox-loading"),o.outerHeight()<i.height()&&o.css({position:"relative",top:"50%","margin-top":-(o.outerHeight()/2)+"px"}),t(e).resize(function(){o.outerHeight()<i.height()&&o.css({position:"relative",top:"50%","margin-top":-(o.outerHeight()/2)+"px"})})},error:function(){var e=t('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");i.html(e).removeClass("nivo-lightbox-loading")}});else if("#"==a.substring(0,1)&&"inline"==n.attr("data-lightbox-type"))if(t(a).length){var h=t('<div class="nivo-lightbox-inline" />');h.append(t(a).clone().show()),i.html(h).removeClass("nivo-lightbox-loading"),h.outerHeight()<i.height()&&h.css({position:"relative",top:"50%","margin-top":-(h.outerHeight()/2)+"px"}),t(e).resize(function(){h.outerHeight()<i.height()&&h.css({position:"relative",top:"50%","margin-top":-(h.outerHeight()/2)+"px"})})}else{var u=t('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");i.html(u).removeClass("nivo-lightbox-loading")}else{if("iframe"!=n.attr("data-lightbox-type"))return!1;var f=t("<iframe>",{src:a,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});i.html(f),f.load(function(){i.removeClass("nivo-lightbox-loading")})}if(n.attr("title")){var p=t("<span>",{"class":"nivo-lightbox-title"});p.text(n.attr("title")),t(".nivo-lightbox-title-wrap").html(p)}else t(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(t(".nivo-lightbox-overlay").length)return t(".nivo-lightbox-overlay");var e=t("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),i=t("<div>",{"class":"nivo-lightbox-wrap"}),n=t("<div>",{"class":"nivo-lightbox-content"}),o=t('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),a=t('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),r=t("<div>",{"class":"nivo-lightbox-title-wrap"}),l=0;l&&e.addClass("nivo-lightbox-ie"),i.append(n),i.append(r),e.append(i),e.append(o),e.append(a),t("body").append(e);var s=this;return s.options.clickOverlayToClose&&e.on("click",function(e){(e.target===this||t(e.target).hasClass("nivo-lightbox-content")||t(e.target).hasClass("nivo-lightbox-image"))&&s.destructLightbox()}),a.on("click",function(t){t.preventDefault(),s.destructLightbox()}),e},destructLightbox:function(){var e=this;this.options.beforeHideLightbox.call(this),t(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),t(".nivo-lightbox-nav").hide(),t("body").removeClass("nivo-lightbox-body-effect-"+e.options.effect);var i=0;i&&(t(".nivo-lightbox-overlay iframe").attr("src"," "),t(".nivo-lightbox-overlay iframe").remove()),t(".nivo-lightbox-prev").off("click"),t(".nivo-lightbox-next").off("click"),t(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var t="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return e.devicePixelRatio>1||!(!e.matchMedia||!e.matchMedia(t).matches)}},t.fn[a]=function(e){return this.each(function(){t.data(this,a)||t.data(this,a,new o(this,e))})}}(jQuery,window,document),$.fn.randomize=function(t){var e=t?$(this).find(t):$(this).children(),i=e.parent();return i.each(function(){$(this).children(t).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(t){var e=t({});t.subscribe=function(){e.on.apply(e,arguments)},t.unsubscribe=function(){e.off.apply(e,arguments)},t.publish=function(){e.trigger.apply(e,arguments)}}(jQuery);