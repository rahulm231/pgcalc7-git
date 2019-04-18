(function ($, Drupal, window, document, undefined) {
  var select2Template = {
    /**
     * Adds needsclick class to all DOM elements in the Select2 results list
     * so they can be accessible on iOS mobile when FastClick is initiated too.
     */
    templateResult: function(result, container) {
      if (!result.id) {
        return result.text;
      }
      container.className += ' needsclick';
      return result.text;
    }
  };

  // Function to attach select. Specifies a placeholder for a coup.
  var attachSelect2 = function(index, el) {
    var $select = $(this);
    if ($select.is('select')) {
      if ($.fn.select2) {
        var template = select2Template;
        if (typeof $select.data('select2placeholder') !== 'undefined') {
          template.placeholder = $select.data('select2placeholder');
        }
        $select.select2(template).data('select2').$container.find('*').addClass('needsclick');

        // var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // if (iOS) {
        //   $select.on('select2:open', function(e) {
        //     console.log('select2');
        //     $('body').one('click', function(e) {
        //         $select.select2('close');
        //     });
        //   });
        // }
      }
    }
  };

  Drupal.behaviors.marietta_custom = {
    attach: function(context, settings) {
      // Enable Select2 on Webform drop downs that don't have the disable-select2 class.
      $('.webform-component').find('select').not('disable-select2').once('select2', attachSelect2);

      // Enable Select2 on selects that have select2 class.
      $('select.select2').once('select2', attachSelect2);

      // Enable Select2 on views exposed form selects.
      $('.views-exposed-form').find('select').once('select2', attachSelect2);

      // Enable Select2 on ctools jump menus
      $('select.ctools-jump-menu-select').once('select2', attachSelect2);

      $('form.node-form').find('select[multiple="multiple"]').once('select2', attachSelect2);

      // Enable Hyphenator.
      if (typeof Hyphenator !== 'undefined') {
        Hyphenator.config({
          remoteloading: false,
          useCSS3hyphenation: true
        });
        Hyphenator.run();
      }

      // Add Perfect Scrollbar to sidebar nav menu.
      if ($.fn.perfectScrollbar) {
        $('.sidebar-menu-block').find('ul.menu.accordion-nav-top-level-menu').once('perfectScrollbar', function() {
          var $sidebarMenu = $(this);
          $sidebarMenu.perfectScrollbar({
            scrollYMarginOffset: 30,
            suppressScrollX: true,
            wheelPropagation: true
          }).on('accordionSubmenuClosed accordionSubmenuOpened', function(e) {
            // Recalculate scrollbar geometry when accordion menu opens or closes.
            $sidebarMenu.perfectScrollbar('update');
            if (e.hasOwnProperty('init') && e.init) {
              var $currentPageMenuLink = $sidebarMenu.find('a.active');
              var menuVerticalOffset = $currentPageMenuLink.offset().top - $sidebarMenu.offset().top;
              if (menuVerticalOffset > 0 && $sidebarMenu.scrollTop() < $sidebarMenu.height()) {
                $sidebarMenu.scrollTop(menuVerticalOffset).perfectScrollbar('update');
              }
            }
          });
        });
      }
    }
  };

})(jQuery, Drupal, this, this.document);
