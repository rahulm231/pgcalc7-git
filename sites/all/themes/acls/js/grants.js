jQuery(document).ready(function ($) {

    //Implementation of sideImageShow
    jQuery('#sideImageShowWrapper .btnLeftWrapper, #sideImageShowWrapper .btnRightWrapper').mouseenter(function () {
        jQuery(this).find('a').fadeIn();
    }).mouseleave(function () {
        jQuery(this).find('a').fadeOut();
    });
    function sideImageShowCallback(carousel) {
        jQuery('#sideImageShowWrapper .btnRightWrapper a').bind('click', function () {
            carousel.next();
            return false;
        });
        jQuery('#sideImageShowWrapper .btnLeftWrapper a').bind('click', function () {
            carousel.prev();
            return false;
        });
    }
    jQuery('#sideImageShow').jcarousel({
        initCallback: sideImageShowCallback,
        visible: 1,
        scroll: 1,
        itemVisibleInCallback: {
            onBeforeAnimation: function () { },
            onAfterAnimation: function (carousel, item, idx, state) {
                var entryTotal = jQuery('#sideImageShow li').size();
                jQuery('#sideImageShowWrapper .btnLeftWrapper, #sideImageShowWrapper .btnRightWrapper').show();
                if (idx == 1) {
                    jQuery('#sideImageShowWrapper .btnLeftWrapper').hide();
                } else if (idx == entryTotal) {
                    jQuery('#sideImageShowWrapper .btnRightWrapper').hide();
                }
            }
        }
    });

    //Implementation of BookSLide
    function sideBookShowCallback(carousel) {
        jQuery('#sideBookShowWrapper .btnRightWrapper a').bind('click', function () {
            carousel.next();
            return false;
        });
        jQuery('#sideBookShowWrapper .btnLeftWrapper a').bind('click', function () {
            carousel.prev();
            return false;
        });
    }
    jQuery('#sideBookShow').jcarousel({
        initCallback: sideBookShowCallback,
        visible: 1,
        scroll: 1,
        itemVisibleInCallback: {
            onBeforeAnimation: function () { },
            onAfterAnimation: function (carousel, item, idx, state) {
                var entryTotal = jQuery('#sideBookShow li').size();
                console.log(idx);
                jQuery('#sideBookShowWrapper .btnLeftWrapper, #sideBookShowWrapper .btnRightWrapper').show();
                if (idx == 1) {
                    jQuery('#sideBookShowWrapper .btnLeftWrapper').hide();
                } else if (idx == entryTotal) {
                    jQuery('#sideBookShowWrapper .btnRightWrapper').hide();
                }
            }
        }
    });


});