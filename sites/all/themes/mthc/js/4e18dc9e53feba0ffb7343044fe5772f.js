/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 *
 * @copyright Copyright (c) 2014 Palantir.net
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

/**
 * Mobile navigation behavior
 * - Add a slideToggle function to show / hide the mobile navigation.
 * - Also add an active class to the mobile nav button.
 */
Drupal.behaviors.mobile_nav = {
  attach: function(context, settings) {
    // Find the mobile nav link that will have click event added to it.
    var mobile_nav_button = $('.mobile__menu-link');
    // Find the container with all of the mobile nav links
    var mobile_nav = $('.mobile__container')
    // Add a click event to show/hide the mobile nav.
    mobile_nav_button.click(function() {
      // Add slideToggle to the mobile nav container.
      mobile_nav.slideToggle();
      // Toggle an active class on the link.
      mobile_nav_button.toggleClass('mobile__menu-link--is-active');
    });
  }
};

/**
 * Mobile navigation behavior
 * - Mobile nav hover will be removed.
 * -
 */
Drupal.behaviors.mobile_navbar = {
  attach: function(context, settings) {
    var $window;
    var $navbar = $('.level-1');
    // Get our window object.
    $window = $(window);
    // Remove bindings when browser is below 959px.
    $window.bind("load resize",function(e) {
      if ($window.width() < 959) {
        $navbar.unbind();
      }
    });
  }
};

// Create a behavior for the flexslider slide shows.
Drupal.behaviors.slideshow = {
  attach: function(context, settings) {
    // If hero flexslider exists.
    if ($('.hero__flexslider').length) {
      $('.hero__flexslider')
      .flexslider({
        selector: '.slides > .slide',
        animation: 'fade',
        directionNav: true,
        controlNav: true
      });
    }
  }
};

// Equal heights for highlight blocks.
Drupal.behaviors.highlight_height = {
  attach: function(context, settings) {
    var $window;
    var maxHeight = -1;
    var homepage_highlights = $('.node-homepage .highlight');
    var sidebar_highlights = $('.sidebar-highlight .highlight:not(:first)');
    // Get our window object.
    $window = $(window);
    // Wait till after the images are loaded or this calc will be incorrect.
    $window.bind("load resize", function() {
      if ($window.width() > 600) {
        if (homepage_highlights.length) {
          // On resize reset height.
          homepage_highlights.each(function(index) {
            $(this).height('auto');
          });
          // Reset our variable.
          maxHeight = -1;
          homepage_highlights.each(function(index) {
            // Get max height.
            if ($(this).outerHeight(true) > maxHeight) {
              maxHeight = $(this).outerHeight(true);
            }
          });
          homepage_highlights.height(maxHeight);
        }
        // Landing page calculated differently because of design -- see var above.
        if (sidebar_highlights.length) {
          // On resize reset height.
          sidebar_highlights.each(function(index) {
            $(this).height('auto');
          });
          // Reset our variable.
          maxHeight = -1;
          sidebar_highlights.each(function(index) {
            // Get max height.
            if ($(this).outerHeight(true) > maxHeight) {
              maxHeight = $(this).outerHeight(true);
            }
          });
          sidebar_highlights.height(maxHeight);
        }
      }
      else {
        $('.highlight').height('auto');
      }
    });
  }
};

})(jQuery, Drupal, this, this.document);
;
