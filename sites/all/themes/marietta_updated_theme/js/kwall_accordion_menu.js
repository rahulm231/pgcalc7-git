/**
 * @file
 * For accordion functionality.
 */

(function ($, Drupal, window, document, undefined) {
  var $allAccordionMenuBlocks = $('.accordion-menu-block');
  Drupal.behaviors.kwall_accordion_menu = {
    attach: function(context, settings) {
      $allAccordionMenuBlocks.each(function(index, element) {
        var $accordionMenuBlock = $(this);
        $accordionMenuBlock.once('accordionMenu', function() {
          var ESCAPE_CODE = 27;
          var $allSubmenus = $('ul.accordion-nav-sub-menu');

          // Create jQuery functions to work on the submenu ULs.
          $.fn.extend({
            accNavSubmenuClose: function() {
              if (this.is('ul.accordion-nav-sub-menu')) {
                var $submenu = this;
                $submenu.slideUp('fast', function() {
                  // Fire a custom event that other scripts can listen for.
                  $submenu.trigger({
                    type: 'accordionSubmenuClosed',
                    submenu: $submenu
                  });
                }).attr('aria-hidden', 'true');
                // Change the arrow direction.
                $submenu.siblings('a.submenu-toggle').attr('aria-label', 'Submenu collapsed').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
                // Remove submenu links from tab order.
                $submenu.find('a').attr('tabIndex', '-1');
              }
              return this;
            },
            accNavSubmenuOpen: function(init) {
              if (typeof init == 'undefined' || init !== true) {
                init = false;
              }
              if (this.is('ul.accordion-nav-sub-menu')) {
                var $submenu = this;
                $submenu.each(function() {
                  var $aSubmenu = $(this);
                  $aSubmenu.slideDown('fast', function() {
                    // Fire a custom event that other scripts can listen for.
                    $aSubmenu.trigger({
                      type: 'accordionSubmenuOpened',
                      submenu: $aSubmenu,
                      init: init
                    });
                  });
                }).removeAttr('aria-hidden');
                // Change the arrow direction.
                $submenu.siblings('a.submenu-toggle').attr('aria-label', 'Submenu expanded').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                // Add submenu links to tab order and set focus to first link.
                if (!init) {
                  $submenu.find('a').removeAttr('tabIndex').eq(0).focus();
                }
                else {
                  // Add submenu links to tab order if initializing.
                  $submenu.find('a').removeAttr('tabIndex');
                  $submenu.addClass('active');
                }
              }
              return this;
            }
          });

          // Initialize all submenu links.
          $allSubmenus.find('a').attr('tabIndex', '-1');
          $accordionMenuBlock.find('li.is-active-trail').children('ul.accordion-nav-menu').accNavSubmenuOpen(true);

          // Handle opening/closing the submenus.
          $accordionMenuBlock.find('.submenu-toggle').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $submenuToggle = $(this);
            var $subMenu = $submenuToggle.siblings('ul.accordion-nav-menu').toggleClass('active');
            if ($subMenu.hasClass('active')) {
              $subMenu.accNavSubmenuOpen();
              // Close other open submenu
              $submenuToggle.parent().siblings().find('ul.accordion-nav-menu.active').removeClass('active').accNavSubmenuClose();
            }
            else {
              $subMenu.accNavSubmenuClose();
            }
          });

          $allSubmenus.attr('tabIndex', '-1').bind('keydown', function(event) {
            if (event.which == ESCAPE_CODE) {
              // Don't let this bubble up.
              event.stopImmediatePropagation();
              // Set focus back to the toggle button that controls this submenu.
              $(this).removeClass('active').accNavSubmenuClose().siblings('a.submenu-toggle').focus();
            }
          });
        });
      });
    }
  };

})(jQuery, Drupal, this, this.document);
