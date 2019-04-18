 (function ($) {


/* ==========================================================================
   Helpers
   ========================================================================== */

  $.fn.exists = function() {
    return $(this).length>0;
  };

  //Initiate placeholder polyfill for browsers that don't support it.
  //$('input, textarea').placeholder();

  // Initiate hero slider
  /*
  $("#hero-slider").owlCarousel({
      autoPlay : 10000,
      navigation : true, // Show next and prev buttons
      slideSpeed : 800,
      paginationSpeed: 800,
      singleItem:true,
      rewindSpeed: 3000,
      slideSpeed: 600,
      transitionStyle : "fadeUp",
      navigationText: ["&#xf053", "&#xf054"]

      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });*/

/* ==========================================================================
   Responsive Navigation
   ========================================================================== */

  var $menu = $('#menu'),
      $menulink = $('.menu-link');

  $menulink.on("click", function(e) {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    e.preventDefault();
  });


/* ==========================================================================
   Tables
   ========================================================================== */

//$("table").addClass('responsive');

/* ==========================================================================
   Swipebox
   ========================================================================== */

//$( '.popup' ).swipebox();

/* ==========================================================================
   Wrap embedded youtube videos in container so it will be full width & responsive
   ========================================================================== */

$('.page-content iframe').wrap('<div class="embed-container">');


/* Data Tables */
if ($('.tribe-events-calendar').length < 0) {
  $('#data_table').DataTable();
  console.log("calendar here");
};


/* Sidebar pdf icon fix */
$('.side-callout img[class*="wp-image"]').parent('a').addClass('no-icon');

/* ==========================================================================
   Socialite
   ========================================================================== */
  /*
  Socialite.load('.share-buttons');

  Socialite.setup({
    facebook: {
      lang     : 'en_GB',
      appId    : 365310390240240
    }
  });
  */
  // lil' print button for recipes page

  $('.print-btn').on("click", function(){
    window.print();
    return false;
  });


/* ==========================================================================
   Print button
   ========================================================================== */

  $("#print-btn").on("click", function(e){
    window.print();
    e.preventDefault();
  });

/* ==========================================================================
   Quovolver
   ========================================================================== */
/*
 $('.quote-slides').quovolver({
    children : 'li',
    transitionSpeed : 500,
    autoPlay : true,
    autoPlaySpeed: 8000,
    equalHeight: true,
    navNext: true,
    navPrev: true,
    navPrevText: '&#xf053',
    navNextText: '&#xf054',
    navPosition: 'below'
  });
  */

/* ==========================================================================
   List Search
   ========================================================================== */

  var monkeyList = new List('fundSearchPanel', {
	  valueNames: ['fundlink'],
	  page: 40,
	  plugins: [ ListPagination({}) ]
  });

  $('#fundSearchBox').keyup(function() {
     if(!this.value) { // zero-length string
        $('.fundSearchInnerPanel').hide();
        $('.fund-list').show();
     } else {
        $('.fundSearchInnerPanel').show();
        $('.fund-list').hide();
     }
  });

})(jQuery);

jQuery(document).ready(function ($) {

  $.fn.extend({
   scrollToMe: function () {
     var x = $(this).offset().top - 100;
     $('html,body').animate({scrollTop: x}, 400);
  }});

   if ( location.hash ) {
     $('.azc_tsh_toggle a[href="'+location.hash+'"]').parent().addClass('azc_tsh_toggle_active').next().css("display", "block");
     //$(document).scrollTop( $('.azc_tsh_toggle a[href="'+location.hash+'"]').offset().top - 100 );

     $('.azc_tsh_toggle a').each(function(){
      if ( $('.azc_tsh_toggle a').attr("href") == location.hash ) {
        $('.azc_tsh_toggle a[href="'+location.hash+'"]').scrollToMe();
      }
     });
    }

    //prev
    // if ( location.hash ) {
    //  $('.azc_tsh_toggle a[href="'+location.hash+'"]').parent().addClass('azc_tsh_toggle_active').next().css("display", "block");
    //  //$(document).scrollTop( $('.azc_tsh_toggle a[href="'+location.hash+'"]').offset().top - 100 );
    //  $('.azc_tsh_toggle a[href="'+location.hash+'"]').scrollToMe();
    // }
});