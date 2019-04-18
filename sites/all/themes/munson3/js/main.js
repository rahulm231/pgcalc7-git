
$(".locations-serve .map-hide-show").click(function () {
    $(".locations-serve .actual-map").slideToggle();
});

$(".hide-map-icon").click(function () {
    $(this).toggleClass("show-map hide-map-icon");

});

$(document).ready(function () {

    $(".news-panel .panel-default .panel-body").matchHeight();

    $('.page.page-single .sidebar li a.selected').parents('.parent-item').addClass('active');


    //******************* MEDIA QUERY CHECKER - RESPONSIVE JS ****************
    var sizes = [320, 480, 768, 992, 1200]; // QUERY SIZES

    function getClosest(width) {
        var closest = sizes.reduce(function (prev, curr) {
            return (Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev);
        });
        return closest;
    }

    var current = getClosest($(window).width());

    $(window).resize(mediaQcheck);
    function mediaQcheck() {

        var width = $(window).width();
        var closest = getClosest(width);
        if (current != closest) {
            //THIS IS ONLY TRIGGERED ONCE ON EVERY MEDIA QUERY CHANGE
            current = closest;
            if (current > 768) {
                //DISABLE SLIDERS
                //cardGridSlider.destroySlider();
                // imgGridSlider.destroySlider();
            } else {
                //ENABLE SLIDERS
                //cardGridSlider.reloadSlider();
                // imgGridSlider.reloadSlider();
            }
        }
    };
    //SET INITIAL VALUES
    mediaQcheck();
    //******************* END MEDIA QUERY CHECKER ****************

    // *******************
    // *******************

    // Smooth page scroll to an anchor on the same page
});



enquire.register("screen and (max-width:991px)", {
    match : function() {

        $('div .list-group.list-group-locations').insertAfter('.middle-content');
        $('.locations-serve .side-right').insertAfter('.locations-serve .fad-details .about-loc');
    },
    unmatch : function() {
        $('div .list-group.list-group-locations').insertAfter('.page .sidebar .list-group');
        $('.locations-serve .side-right').insertBefore('.locations-serve .fad-details .about-loc');

    },

});



// $(window).resize(function() {
//     if( $(this).width() < 767 ) {
//          $('.page .list-group.list-group-locations h4').click(function() {
//             $('.page .list-group.list-group-locations .list-group-item').slideToggle();
//          });
//     } 
// }

