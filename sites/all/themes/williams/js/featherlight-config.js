;(function ($) {
    "use strict";

    $.fn.wmsDoOverlay = function () {
        var $overlay = this;
        if ($overlay.length > 1) {
            // Use gallery overlay for multiple elements
            $overlay.featherlightGallery({
                nextIcon    : '',
                previousIcon: '',
                variant     : 'featherlight-gallery2',
                //always add arrows
                afterContent: function (event) {
                    var $self     = this;
                    var $instance = $self.$instance.find('.' + $self.namespace + '-content');
                    // remove default navigation
                    $instance.find('span.featherlight-previous').remove();
                    $instance.find('span.featherlight-next').remove();
                    $instance.append($self.createNavigation('previous'));
                    $instance.append($self.createNavigation('next'));
                    $instance.find('.featherlight-close').html('<span class="btb bt-times"></span>');
                    $instance.find('.featherlight-previous, .featherlight-next').addClass('featherlight-navigation');
                },
                onResize    : function (event) {
                    $('.featherlight-content').wmsTrackOverlayViews();

                    // re init addthis for social btns that are in overlays
                    if('undefined' !== typeof addthis) {
                        addthis.toolbox('.addthis_toolbox');
                    }
                },
                afterOpen   : function () {
                    $('html.js').css('overflow', 'hidden');
                },
                afterClose  : function () {
                    $('html.js').css('overflow', 'auto');
                }
            });
        } else if ($overlay.length == 1) {
            // Use single overlay
            $overlay.featherlight({
                onResize: function (event) {
                    $('.featherlight-content').wmsTrackOverlayViews();
                }
            });
        }
        return $overlay;
    };

    /*
     * Track what content get viewed in the home grid overly
     */
    $.fn.wmsTrackOverlayViews = function () {
        // Called from grid click and overlay arrow click
        var gridNum = $('.feature', this).data('grid-num');
        if (!gridNum) {
            return this;
        }
        var itemTitle = $('#grid-' + gridNum).data('title');
        //        console.log('Box ' + gridNum + ': ' + itemTitle);
        _gaq.push(['_trackEvent', 'Homepage Grid', 'Overlay View', 'Box ' + gridNum + ': ' + itemTitle]);
        return this;
    };

    // for magazines, apply fancybox style except to videos
    $('body.meerkat-magazine #content a:not(".fancybox-media, .type-video"):has("img")').addClass('fancybox').attr('rel', 'meerkat-mag-group');

    // above rule breaks stuff, remove fancybox for these cases
    $('body.meerkat-magazine #content .past-edition a').removeClass('fancybox');
    $('body.meerkat-magazine #content .gallery-filmstrip a').removeClass('fancybox');
    $('body.meerkat-magazine #content .overlay-hover a').removeClass('fancybox');
    $('body.meerkat-magazine #content .edition-gallery-grid a').removeClass('fancybox');

    // force galleries to use custom overlay
    $('[data-featherlight-gallery]').wmsDoOverlay();

    // catch legacy fancybox
    $('.fancybox').wmsDoOverlay();

    // WP galleries use overlay
    $('.gallery-grid ul li a')
        .featherlightGallery({
            nextIcon    : '',
            previousIcon: '',
            variant     : 'featherlight-wp-gallery'
        });

})(jQuery);