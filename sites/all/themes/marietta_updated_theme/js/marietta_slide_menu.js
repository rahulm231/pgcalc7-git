(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.marietta_slide_menu = {
    attach: function(context, settings) {

      var navMenuID = Drupal.settings.marietta_slide_menu.navMenuID;
      var $navMenu = $('#' + navMenuID);

      $navMenu.once('slideMenu', function() {
        // initialization
        var ESCAPE_CODE = 27;

        var $navAllLinks = $navMenu.find('a');
        var $navTopLevelLinks = $navAllLinks.not('ul.slide-nav-menu a');
        var $searchInputs = $navMenu.find('input:not([type="hidden"])');

        var menuOpenSelector = Drupal.settings.marietta_slide_menu.menuOpenSelector;
        var searchOpenSelector = Drupal.settings.marietta_slide_menu.searchOpenSelector;
        var $openButtons = $(searchOpenSelector + ', ' + menuOpenSelector); // the buttons that open the nav
        var $clickedOpenButton = null; // keep track of which button opened the nav (menu or search link)

        var $allSubmenus = $('ul.slide-nav-menu');

        // Create jQuery functions to work on the submenu ULs
        $.fn.extend({
          marSlideNavSubmenuClose: function() {
            if (this.is('ul.slide-nav-menu')) {
              this.slideUp('fast').attr('aria-hidden', 'true');
              // Change the arrow direction
              this.siblings('a.submenu-toggle').attr('aria-label', 'Submenu collapsed').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
              // remove submenu links from tab order
              this.find('a').attr('tabIndex', '-1');
            }
            return this;
          },
          marSlideNavSubmenuOpen: function() {
            if (this.is('ul.slide-nav-menu')) {
              this.slideDown('fast').removeAttr('aria-hidden');
              // Change the arrow direction
              this.siblings('a.submenu-toggle').attr('aria-label', 'Submenu expanded').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
              // add submenu links to tab order and set focus to first link
              this.find('a').removeAttr('tabIndex').eq(0).focus();
            }
            return this;
          }
        });

        function closeMenu() {
          $navMenu.removeClass('active').attr('aria-hidden');
          $openButtons.attr('aria-label', 'Search and menu collapsed');
          // Take all nav links and search inputs out of tab order
          $navAllLinks.attr('tabIndex', '-1');
          $searchInputs.attr('tabIndex', '-1');
          $allSubmenus.removeClass('active').marSlideNavSubmenuClose();
          if ($clickedOpenButton) {
            // Set focus back to the button that opened the nav
            $clickedOpenButton.focus();
          }
        }

        // Initialize to closed state
        $openButtons.attr({'aria-controls': navMenuID, 'aria-haspopup': 'true'});
        closeMenu();
        $navMenu.find('ul.slide-nav-menu').attr('aria-hidden', 'true');

        function openMenu() {
          $navMenu.removeClass('closed').addClass('active').removeAttr('aria-hidden');
          $openButtons.attr('aria-label', 'Search and menu expanded');
          // Add all nav links and search inputs back to tab order
          $navTopLevelLinks.removeAttr('tabIndex');
          $searchInputs.removeAttr('tabIndex');
        }

        $navMenu.find('.marietta-slide-menu-wrapper').on("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function() {
          if ($navMenu.hasClass('active')) {
            if ($clickedOpenButton.is(searchOpenSelector)) {
              // if the search button was clicked, wait for CSS animation to finish and then set focus to search field
              $('.marietta-slide-nav-search').focus();
            }
            else {
              // otherwise set focus after timeout to the first link in the nav (which actually is the close nav link
              $navAllLinks.eq(0).focus();
            }
          }
          else {
            $navMenu.addClass('closed');
          }
        }).on('swiperight', function(e) {
          e.stopPropagation();
          closeMenu();
        }).children().on("webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend", function(e) {
          // prevent transitionend event from bubbling up
          e.stopPropagation();
          e.preventDefault();
        });

        // Handle opening the nav
        $openButtons.click(function(e) {
          e.preventDefault();
          e.stopPropagation();

          $clickedOpenButton = $(this);

          openMenu();
        });

        // Handle opening/closing the submenus
        $navMenu.find('.submenu-toggle').click(function(e) {
          e.preventDefault();
          e.stopPropagation();
          var $subMenu = $(this).siblings('ul.slide-nav-menu').toggleClass('active');
          if ($subMenu.hasClass('active')) {
            $subMenu.marSlideNavSubmenuOpen();
          }
          else {
            $subMenu.marSlideNavSubmenuClose();
          }
        });

        // Handle closing submenus with the escape key
        $allSubmenus.attr('tabIndex', '-1').on('keydown', function(event) {
          if (event.which == ESCAPE_CODE) {
            event.stopImmediatePropagation(); // don't let this bubble up
            // Set focus back to the toggle button that controls this submenu
            $(this).removeClass('active').marSlideNavSubmenuClose().siblings('a.submenu-toggle').focus();
          }
        });

        // Handle closing the slide in with escape key
        $navMenu.attr('tabIndex', '-1').on('keydown', function(event) {
          if (event.which == ESCAPE_CODE) {
            closeMenu();

          }
        });

        // Handle closing the nav by clicking the close button or the overlay
        $navMenu.find('.marietta-slide-menu-overlay, .slide-menu-close-button').click(function(e) {
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
        });
      });
    }
  };

})(jQuery, Drupal, this, this.document);
