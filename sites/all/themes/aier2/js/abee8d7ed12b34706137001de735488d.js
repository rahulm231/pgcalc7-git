(function ($) {

  /**
   * Event listener to check for touch device.
   */
  window.addEventListener('touchstart', function onFirstTouch() {
    // Set body class.
    document.body.classList.add('is-touch-device');
    // Set some global variable.
    window.IS_TOUCH_DEVICE = true;
    // Stop listening after initial touch.
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);

  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
  Drupal.theme.prototype.ntAierExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
   * advantage of Behaviors over a simple 'document.ready()' lies in how it
   * interacts with content loaded through Ajax. Opposed to the
   * 'document.ready()' event which is only fired once when the page is
   * initially loaded, behaviors get re-executed whenever something is added to
   * the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */
  Drupal.behaviors.ntAierExampleBehavior = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.
      $('.some-selector', context).once('foo', function () {
        // Now, we are invoking the previously declared theme function using two
        // settings as arguments.
        var $anchor = Drupal.theme('ntAierExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

        // The anchor is then appended to the current element.
        $anchor.appendTo(this);
      });
    }
  };

  /**
   * Includes data attribute to table cells for responsive purposes.
   *
   * @type {{attach: Drupal.behaviors.aierTableDataAttr.attach}}
   */
  Drupal.behaviors.aierTableDataAttr = {
    attach: function (context, settings) {
      $('table td', context).each(function () {
        var tdIndex = $(this).index();
        var thTable = $(this).closest('table').find('th').eq(tdIndex).html();
        if (typeof thTable != 'undefined') {
          $(this).attr('data-label', thTable);
        }
      })
    }
  }

  /**
   * Includes behavior required to set active and passive mobile navigation
   * buttons.
   *
   * @type {{attach: Drupal.behaviors.aierMobileNav.attach}}
   */
  Drupal.behaviors.aierMobileNav = {
    attach: function (context, settings) {

      // Clone preheader menu to use as utility menu on mobile nav
      /*var str_utility_menu;
      str_utility_menu = '.block--menu-menu-preheader-menu';

      var utility_menu_items = $(str_utility_menu + ' .menu').children().clone();
      var utility_menu = $('<ul/>').append(utility_menu_items);
      utility_menu.addClass('utility-nav');*/

      // Wrap main ul nav inside div
      /*$('#mobile-menu').wrap('<div id="main-menu-wrap"></div>');*/

      // Append utility menu after nav wrapper
      /*$('#mobile-menu').parent().after(utility_menu);*/

      // Assign height to main ul nav
      /*$('#main-menu-wrap').css({'height': $(window).height() - 235 + 'px'});*/

      // Mobile menu toggle button.
      $('#mobile-menu-button', context).click(function() {
        $(this).parent().find('.l-region--navigation')
          .toggleClass('active');
        $(this).parent().find('.l-region--header')
          .toggleClass('active');
      });

      // Mobile main menu.
      $('.l-region--navigation', context).find('ul.menu > li > i').click(function(e) {
        $(this).parent().toggleClass('active');
      });

      // Change mobile nav menu icon on open/close
      //$('#menu-attached-button', context).click(function () {
      //  if ($(this).hasClass('active')) {
      //    $(this).html('<i class="fa fa-times"></i>Close');
      //  } else {
      //    $(this).html('<i class="fa fa-bars"></i>Menu');
      //  }
      //});
      //$('#mobile-navigation-mask', context).click(function () {
      //  if ($('#menu-attached-button').hasClass('active')) {
      //    $('#menu-attached-button').html('<i class="fa fa-times"></i>Close');
      //  } else {
      //    $('#menu-attached-button').html('<i class="fa fa-bars"></i>Menu');
      //  }
      //});
    }
  };

  /**
   * Disqus.
   */
  Drupal.behaviors.aier_disqus = {
    attach: function (context, settings) {

      var disqus_shortname  = 'aier';
      var disqus_identifier = '';
      var disqus_url        = '';
      var disqus_config = function () {
        this.language = 'en';
      };

      (function() {
        var dsq   = document.createElement('script');
        dsq.type  = 'text/javascript'; dsq.async = true;
        dsq.src   = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();

      $(document, context).on('click', 'button.show-comments', function() {
        disqus_identifier = $(this).data('disqus-identifier');
        disqus_url        = $(this).data('disqus-url');

        var $comments = $('#disqus_thread').attr('id', '');
        $comments.height($comments.height())
          .prev().text('View comments');

        $(this).text('Update comments')
          .next().attr('id', 'disqus_thread').height('auto');

        reset(disqus_identifier, disqus_url);
      });

      var reset = function (disqus_identifier, disqus_url) {
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = disqus_identifier;
            this.page.url        = disqus_url;
          }
        });
      };

    }
  };

  /**
   * Main section.
   */
  Drupal.behaviors.AIERV2 = {
    attach: function (context, settings) {

      bastiat_chapters_wrapper_height();

      if ($.isFunction($.fn.flexslider)) {
        $('.slider-wrap').flexslider();
      }

      $('.staff-contact-swch', context).live('click', function() {
        $('.staff-contact-box', context).toggle();
        return false;
      });

      /**
       * CC form Conversion code helper.
       */
      if ($('.ctct-embed-signup').length) {
        var form = setInterval(function () {
          var is_submitted = $('.ctct-embed-signup')
            .find('#success_message').is(':visible');

          if (is_submitted) {
            if (typeof goog_report_conversion === 'function') {
              goog_report_conversion(window.location.href);
            }
            clearInterval(form);
          }
        }, 1000);
      }

    }
  };

  /**
   * Sets height of the Bastiat Chapters wrapper.
   */
  function bastiat_chapters_wrapper_height() {
    var $wrapper = $(".view-chapters").find('.view-content');
    var $items = $wrapper.find('.item-list');
    var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;

    var maxHeight = Math.max.apply(null, $items.map(function () {
      return $(this).height();
    }).get());

    if (isIE && !/Edge\/\d./i.test(navigator.userAgent)) {
      $wrapper.css({
        'max-height': maxHeight,
        'height'    : maxHeight
      });
    }
    else {
      $wrapper.css({
        'max-height': maxHeight
      });
    }
  }

  /**
   * Detect touch devices.
   */
  function is_touch_device() {
    // ontouchstart works for most browsers, onmsgesturechange is for IE10.
    return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
  }

})(jQuery);

;/*})'"*/
;/*})'"*/
(function(o){Drupal.behaviors.aierAddThis=Drupal.behaviors.aierAddThis||{};Drupal.behaviors.aierAddThis.attach=function(t,e){o(document,t).on('click','.custom_button',function(e){e.preventDefault();addthis.init();addthis.toolbox('.addthis_toolbox');o(this).parents('.addthis_toolbox').find('.hover_menu',t).slideToggle(200)});o('#block-block-2 .content p',t).append(o('.custom_button20',t));o('.custom_button20',t).on('click',function(e){o('.hover_menu20',t).slideToggle(200);e.preventDefault()})}})(jQuery);;/*})'"*/
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','//connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1858570597751699');fbq('track', "PageView");
;/*})'"*/
;/*})'"*/
