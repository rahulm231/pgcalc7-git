var FORMALIZE=(function(b,e,f,a){var h="placeholder" in f.createElement("input");var i="autofocus" in f.createElement("input");var g="webkitAppearance" in f.createElement("select").style;var d=!!(b.browser.msie&&parseInt(b.browser.version,10)===6);var c=!!(b.browser.msie&&parseInt(b.browser.version,10)===7);return{go:function(){for(var j in FORMALIZE.init){FORMALIZE.init[j]();}},init:{detect_webkit:function(){if(!g){return;}b("html").addClass("is_webkit");},full_input_size:function(){if(!c||!b("textarea, input.input_full").length){return;}b("textarea, input.input_full").wrap('<span class="input_full_wrap"></span>');},ie6_skin_inputs:function(){if(!d||!b("input, select, textarea").length){return;}var j=/button|submit|reset/;var k=/date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;b("input").each(function(){var l=b(this);if(this.getAttribute("type").match(j)){l.addClass("ie6_button");if(this.disabled){l.addClass("ie6_button_disabled");}}else{if(this.getAttribute("type").match(k)){l.addClass("ie6_input");if(this.disabled){l.addClass("ie6_input_disabled");}}}});b("textarea, select").each(function(){if(this.disabled){b(this).addClass("ie6_input_disabled");}});},autofocus:function(){if(i||!b(":input[autofocus]").length){return;}b(":input[autofocus]:visible:first").focus();},placeholder:function(){if(h||!b(":input[placeholder]").length){return;}FORMALIZE.misc.add_placeholder();b(":input[placeholder]").each(function(){var j=b(this);var k=j.attr("placeholder");j.focus(function(){if(j.val()===k){j.val("").removeClass("placeholder_text");}}).blur(function(){FORMALIZE.misc.add_placeholder();});j.closest("form").submit(function(){if(j.val()===k){j.val("").removeClass("placeholder_text");}}).bind("reset",function(){setTimeout(FORMALIZE.misc.add_placeholder,50);});});}},misc:{add_placeholder:function(){if(h||!b(":input[placeholder]").length){return;}b(":input[placeholder]").each(function(){var j=b(this);var k=j.attr("placeholder");if(!j.val()||j.val()===k){j.val(k).addClass("placeholder_text");}});}}};})(jQuery,this,this.document);jQuery(document).ready(function(){FORMALIZE.go();});;
/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

  var $event = $.event,
    $special,
    resizeTimeout;

  $special = $event.special.debouncedresize = {
    setup: function() {
      $( this ).on( "resize", $special.handler );
    },
    teardown: function() {
      $( this ).off( "resize", $special.handler );
    },
    handler: function( event, execAsap ) {
      // Save the context
      var context = this,
        args = arguments,
        dispatch = function() {
          // set correct event type
          event.type = "debouncedresize";
          $event.dispatch.apply( context, args );
        };

      if ( resizeTimeout ) {
        clearTimeout( resizeTimeout );
      }

      execAsap ?
        dispatch() :
        resizeTimeout = setTimeout( dispatch, $special.threshold );
    },
    threshold: 150
  };

})(jQuery);;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  // init flexibility
  Drupal.behaviors.bmcInitFlexibility = {
    attach: function(context, settings) {
      $('body').once('bmcInitFlexibility', function() {
        flexibility(document.body);
      });
    }
  };

  Drupal.behaviors.bmc = {
    attach: function (context, settings) {
      settings = settings || Drupal.settings;
      context = context || document;

      if (context === document) {

        var $slideshows = $('.views_slideshow_cycle_main', document);
        if ($slideshows.length) {
          this.setupSlideshows(context, settings, $slideshows);
        }

        // Reload page on device orientation change
        if (window.DeviceOrientationEvent) {
          window.addEventListener('orientationchange', function () {
            location.reload();
          }, false);
        }

        // Detect device agent and add class to body
        var deviceAgent = navigator.userAgent.toLowerCase();
        var isTouchDevice = Modernizr.touch ||
          (deviceAgent.match(/(iphone|ipod|ipad)/) ||
          deviceAgent.match(/(android)/) ||
          deviceAgent.match(/(iemobile)/) ||
          deviceAgent.match(/iphone/i) ||
          deviceAgent.match(/ipad/i) ||
          deviceAgent.match(/ipod/i) ||
          deviceAgent.match(/blackberry/i) ||
          deviceAgent.match(/bada/i));
        if (isTouchDevice) {
          $('body').addClass('mobile');
        } else {
          $('body').addClass('desktop');
        }

        // apply body class on window resize
        this.applyMobileBodyClass(context, settings);
      }
    },

    setupSlideshows: function(context, settings, $slideshows) {
      $(window).resize(function () {
        $slideshows.each(function (i) {
          var img_height;
          $(this).find('.views-slideshow-cycle-main-frame-row').each(function () {
            var tmp_img_height = $(this).height();
            if (tmp_img_height !== 0) {
              img_height = tmp_img_height;
            }
            return;
          });
          if (img_height !== 0) {
            $(this).height(img_height).children('.views-slideshow-cycle-main-frame').height(img_height);
          }
          return;
        });
      });
    },

    applyMobileBodyClass: function(context, settings) {
      var respondWidth = Drupal.settings.responsive_menu.min_width || 800;
      $(window).on('debouncedresize', function(e) {
        if ($(window).width() < respondWidth) {
          $('body').addClass('is-small-viewport');
        } else {
          $('body').removeClass('is-small-viewport');
        }
      });
    }
  };

  // Mobile version of left sidebar navigational menus
  Drupal.behaviors.bmcLeftSubnavs = {
    attach: function(context, settings) {
      settings = settings || Drupal.settings;
      context = context || document;

      settings.bmcLeftSubnavs = $.extend({}, {
        respondWidth: parseInt(Drupal.settings.responsive_menu.min_width) || 800,
        blockSelector: '.region-sidebar-first .block-og-menu, .region-sidebar-first .block-menu',
        menuSelector: '.menu',
        active: false,
        dynamicTitle: []
      });

      var subnav = this;

      var $blocks = $(settings.bmcLeftSubnavs.blockSelector, context);

      if ($blocks.length) {
        if ($(window).width() < settings.bmcLeftSubnavs.respondWidth) {
          subnav.collapse(context, settings, $blocks);
        }
        $(window).on('debouncedresize', function() {
          if (!settings.bmcLeftSubnavs.active && $(window).width() < settings.bmcLeftSubnavs.respondWidth) {
            subnav.collapse(context, settings, $blocks);
          } else if (settings.bmcLeftSubnavs.active && $(window).width() > settings.bmcLeftSubnavs.respondWidth) {
            subnav.expand(context, settings, $blocks);
          }
        });
      }
    },
    collapse: function(context, settings, $blocks) {
      var subnav = this;

      $.each($blocks, function(i) {
        var $blockId = $blocks[i].id;
        var $block = $('#' + $blockId);

        // find the title
        var $title = $block.find('.block__title');

        // if there is no title, try to create one
        if (!$title.length) {
          // if this is a menu block, create
          // the title from the first <li.is-active-trail.expanded> link element
          var $activePage = $block.find('.menu:eq(0) li:eq(0) > a').clone();

          $block.prepend('<h2 class="block__title"></h2>');
          $title = $block.find('.block__title');

          $title.append($activePage);

          // indicate this title has been dynamically generated
          // we'll have to remove it from the DOM later
          settings.bmcLeftSubnavs.dynamicTitle.push(true);
        } else {
          settings.bmcLeftSubnavs.dynamicTitle.push(false);
        }

        // insert the drop down toggle button
        $title.prepend('<i class="icon-expander"></i>');

        // add the click listener to the title
        $('.icon-expander', $block).on('touchstart click', function (e) {
          subnav.accordion(context, settings, $block, e)
        });
      });

      settings.bmcLeftSubnavs.active = true;
    },
    expand: function(context, settings, $blocks) {
      var subnav = this;

      $.each($blocks, function(i) {
        var $blockId = $blocks[i].id;
        var $block = $('#' + $blockId);

        // find the title
        var $title = $block.find('.block__title');

        // show the subnav menu
        $block.removeClass('open');

        // if a dynamic title was added, remove it
        if (settings.bmcLeftSubnavs.dynamicTitle[i]) {
          $title.remove();
        }

        // remove the toggle icon
        $('.icon-expander', $block).remove();
      });

      settings.bmcLeftSubnavs.active = false;
    },
    accordion: function(context, settings, $block, e) {
      e.preventDefault();
      e.stopPropagation();
      e.handled = false;
      if (!e.handled) {
        $block.toggleClass('open');
        e.handled = true;
      }
    }
  };

  // Handle Resposnive Menus
  Drupal.behaviors.responsiveMenu = {
    attach: function (context, settings) {
      $(window).resize(function () {
        $('.mean-container #block-menu-block-2').removeClass('visible');
        //$('.desktop.mean-container #block-search-form').removeClass('visible');
        $('.mean-nav').removeClass('gap');
        $('#block-menu-block-5').removeClass('on');
        // $('#edit-search-block-form--2').focus(function(){
        //   $('#block-search-form').addClass('very');
        // })
        $('a.meanmenu-reveal').click(function () {
          $('.mean-container #block-menu-block-2').toggleClass('visible');
          //$('.mean-container #block-search-form').toggleClass('visible');
          $('.mean-nav').toggleClass('gap');
          $('#block-menu-block-5').toggleClass('on');
        });
      });
      // $('#edit-search-block-form--2').focus(function(){
      //     $('#block-search-form').addClass('very');
      // })
      $('a.meanmenu-reveal').click(function () {
        $('.mean-container #block-menu-block-2').toggleClass('visible');
        //$('.mean-container #block-search-form').toggleClass('visible');
        $('.mean-nav').toggleClass('gap');
        $('#block-menu-block-5').toggleClass('on');
      });
    }
  };


  Drupal.behaviors.SidebarMenuDropdown = {
    attach: function (context, settings) {

      $('aside.sidebars .block-menu-block').hover(function () {
          $(this).addClass('over');
          $(this).find('.menu-block-wrapper').addClass('open');
          $('#main').prepend('<div class="overlay"></div>');
        },
        function () {
          $(this).removeClass('over');
          $(this).find('.menu-block-wrapper').removeClass('open');
          $('.overlay').remove();
        }
      );

    }
  };

  // Search button animation.
  Drupal.behaviors.SearchbarToggle = {
    attach: function (context, settings) {

      $('#block-bmc-search-bmc-search').hover(function () {
        $(this).toggleClass('full');
        $('td.gsc-input').toggleClass('visible');
      });

    }
  };

  Drupal.behaviors.NavPreventDefault = {
    attach: function (context, settings) {

      $('#block-menu-block-5 .menu-mlid-750 a').first().click(function (e) {
        e.preventDefault();
      });

      $.fn.accessibleDropDown = function () {
        var el = $(this);

        /* Setup dropdown menus for IE 6 */

        $("li", el).mouseover(function () {
          $(this).addClass("hover");
        }).mouseout(function () {
          $(this).removeClass("hover");
        });

        /* Make dropdown menus keyboard accessible */

        $("a", el).focus(function () {
          $(this).parents("li").addClass("hover");
        }).blur(function () {
          $(this).parents("li").removeClass("hover");
        });
      };

      $('#block-menu-block-5 .menu-block-wrapper').accessibleDropDown();

    }
  };

})(jQuery, Drupal, window, document);
;
