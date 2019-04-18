!function ($, common) {
    "use strict";

    var url = common.getPageUrl();

    // Media query event listener (https://www.sitepoint.com/javascript-media-queries/)
    var $width = "(min-width: 710px)";
    var mq     = window.matchMedia($width);

    // If there are tabs, start looking for tabs that overflow the container and wrap, then force expando early
    $('.accordion-tabs').each(function() {
        var self = $(this);
         collapseEarlyCheck(self);
        $( window ).resize(function() {
            self.removeClass("forced-expando"); //remove this to get non-expando context tab width
            collapseEarlyCheck(self);
        });
    });

    $('.accordion-tab').each(function (index) {
        var $li             = $(this);
        var $this_accordion = $li.parent();
        var $tab_content    = $li.find('> .tab-content').hide();
        var $tab_link       = $li.find('> .tab-link').append('<div class="dropdown-toggle"></div>');
        var default_tab     = $('.accordion-tab').find('.is-active');

        // If this isn't an expando, listen for width change to display as expando at small widths
        $this_accordion.data('isExpando', $this_accordion.hasClass('is-expando'));
        if (!$this_accordion.data('isExpando')) {
            mq.addListener(widthChange);
            widthChange(mq);
        }

        // Append anchor link
        var anchor_url = url.pageUrl + '#' + $li.attr('id');
        common.appendAnchor($li, anchor_url);

        // Open and show first tab
        if (!$this_accordion.data('isExpando') || default_tab) { // tabs
            if (index === 0 && !default_tab) {
                openTab($li);
            } else if ($li.hasClass('is-active')) {
                closeTabs($this_accordion);
                openTab($li);
            }
        }

        $tab_link.click(function (e) {

            e.preventDefault();
            if (!$this_accordion.data('isExpando')) { // tabs

                if (!$li.hasClass('is-active')) {

                    closeTabs($this_accordion);
                    openTab($li);
                } else{
                    $li.toggleClass('is-active');
                    $tab_content.toggleClass('is-open').slideToggle(100, reloadTab($li))
                }
            } else { // expando
                // target nested li elements
                //toggleActive($li);
                $li.toggleClass('is-active');

                //toggleOpen($tab_content);
                $tab_content.toggleClass('is-open').slideToggle(100, reloadTab($li));

            }
        });

        function toggleActive($el) {
            $el.parents('.accordion-tab').toggleClass('is-active');
            $el.toggleClass('is-active');
        }

        function toggleOpen($el){
            $el.parents();
            $el.toggleClass('is-open');
        }
        // Media query change handler
        function widthChange(mq) {
            $this_accordion.data('isExpando', !mq.matches);
            var $active_tabs = $('> li.is-active', $this_accordion);
            activeTabCheck($this_accordion);
        }
    });

    // open automatically with ID
    var $autoOpen = $('#' + url.urlObj.attr('fragment'));
    var $autoOpenParent = $autoOpen.parents('.accordion-tab');
    $autoOpen.add($autoOpenParent).find(' > .tab-link').click();

    // Reload iframes
    function reloadTab($el) {
        var $WmsInclude = $el.find('.WmsInclude');
        if ($WmsInclude.length) {
            $WmsInclude.attr('src', function (i, val) {
                return val;
            });
        }
    }

    function closeTabs($accordion) {
        $accordion.find('> .is-active').removeClass('is-active');
        $accordion.find('> li > .tab-content.is-open').removeClass('is-open').hide();
    }

    function openTab($li) {
        $li.addClass('is-active');
        $li.find('> .tab-content').addClass('is-open').show();
    }
    //check to see if collective tab width is > main content area and collapse to expando
    function collapseEarlyCheck(self){
        var mainw = $(self).width() - 5; // minus 5 to add small tolerance for mouse event timing
        var tabsw = 0;
        self.children('.accordion-tab').each(function() {
            tabsw += $(this).outerWidth( true );
        });
        if (mainw <= tabsw) {
            self.data('isExpando', self.hasClass('is-expando'));
            if (!self.data('isExpando')) {
                self.addClass("forced-expando");
            }
        } else{
            self.removeClass("forced-expando");
            activeTabCheck(self);
        }
    }

    //when toggling states (expando to tab), check and init a tab state
    function activeTabCheck(self){
        var $active_tabs = $('> li.is-active', self);

        // If no tabs are active, make first active
        if (!$active_tabs.length) {
            openTab($('> li', self).first());
        }

        // If more than one tab is active, make only first tab active
        if ($active_tabs.length > 1) {
            closeTabs(self);
            openTab($active_tabs.first())
        }
    }

}(jQuery, wms.common);