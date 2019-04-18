 /**
 *
 * St. Sebastians - default
 * @link http://stsebs.redesign.finalsite.com/
 * Built By: Jeff Snow
 * Project Manager: Connie Cavallo
 * Designer: Natalie Sequeira
 *
 */

/*!
 * global_enhancements is a file particular to certain pages
 * it contains site enhancement js only
**/


jQuery(function($) {
  // ================================
  // Off Canvas Menu
  // ================================


  //Exit Off Canvas / Modal button
  $('<button class="exit-off-canvas"></button>').appendTo('body');
  $('<button class="mobile-menu-trigger"><span class="fa fa-bars"></span> MAIN MENU</button>').insertAfter('.nav-mobile');

  //Off Canvas Menu
  var offCanvasMenu = true, //Boolean
      headerItemsToClone = [$('.nav-mobile'), $('.nav-util')]; //List what you want to display in the mobile menu

  if(offCanvasMenu === true) {
    $('<div id="mobile-menu"><button class="mobile-menu-close">Close</button></div>').prependTo('#fsPageWrapper');

    $.each(headerItemsToClone, function(i, val) {
        $(val).clone().appendTo('#mobile-menu');
    });
    $('#mobile-menu .nav-mobile').removeClass('nav-mobile').addClass('mobile-main');
    $('#mobile-menu .mobile-main .fsNavLevel1 > li > a').append('<span class="next-menu-btn"></span>');

    //Activate Menu
    $('.mobile-menu-trigger').click(function() {
      $('body').toggleClass('menu_active');
    });


    $('.top-search-container').clone().prependTo('#mobile-menu');

    //Activate Search menu within the mobile menu

    placeholder($(".top-search"), "I’m searching for...");
    //If on a tier 2 page then do this stuff
    if($('#mobile-menu .mobile-main .fsNavLevel1 > .fsNavCurrentPage, #mobile-menu .mobile-main .fsNavLevel1 > .fsNavCurrentPageAncestor').length) {
      //Adds class based on conditional being true
      $('#mobile-menu').addClass('mobile-menu-level2-active');
    }

      //Add tier 2 panel structure
      $('<div class="mobile-menu-level2"><button class="mobile-back-btn">Back</button><button class="mobile-menu-close">Close</button></div>').appendTo('#mobile-menu');
      $('#mobile-menu .mobile-main').clone().appendTo('.mobile-menu-level2');

      //Removes conditionally added class if user clicks the back btn
      $('#mobile-menu .mobile-back-btn').click(function() {
        $('#mobile-menu').removeClass('mobile-menu-level2-active');
      });
      
      //Closes menu
    $('.mobile-menu-close').click(function() {
      $('body').removeClass('menu_active');
    });
    $('.exit-off-canvas').click(function() {
      $('body').removeClass('menu_active');
    });

    //Renavigates you to correct tier 2 sections
    $('.next-menu-btn').on('click', function(e) {
      //Prevent navigating to page if you click on a span within an anchor tag
      e.preventDefault();

      //Stores the href of the parent page when you click on its child span tag
      var parentPage = $(this).parent('a').attr('href');

      //Changes the active class based on the tier 2 section you are trying to navigate to
      $('.mobile-menu-level2 .mobile-main .fsNavLevel1 > .fsNavCurrentPage').removeClass('fsNavCurrentPage');
      $('.mobile-menu-level2 .mobile-main .fsNavLevel1 > .fsNavCurrentPageAncestor').removeClass('fsNavCurrentPageAncestor');
      $('.mobile-menu-level2 .mobile-main .fsNavLevel1 > li > a[href="'+parentPage+'"]').parent('li').addClass('fsNavCurrentPage');
      $('#mobile-menu').addClass('mobile-menu-level2-active');
    });

    
  }

  // Toggle attribute of the body
  $('.drawer-trigger').click(function() {

    $body.toggleClass('drawer-is-active');

  });

  // Remove attribute on the bottom if anything other than
  // what is mentioned is clicked on
  $(document).on('click', function(event) {

    if (!$(event.target).closest('.drawer, .drawer-trigger, .next').length) {
      $body.removeClass('drawer-is-active');
    }

  });

  //check if browser supports placeholders for placeholder()
  $.support.placeholder = (function(){
	var i = document.createElement('input');
	return 'placeholder' in i;
  })();

  var $body = $('body');
  var $mainSlideshow ='.main-slideshow';
  var $home75th ='.home-75th';
  



   // ================================
  // Site animations not IE
  // ================================

  function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0) {
      return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
    

    // If IE 11 then look for Updated user agent string.
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
      return 11;
    } else {
      return 0; //It is not IE
    }
  }

  if (GetIEVersion() > 0) {
     $('body').addClass('ie11ish')
  } else {
    $('blockquote, .fs_style_22, .fs_style_23, .fs_style_28, .fs_style_29, .lead-in').viewportChecker({
      // Class to add to the elements when they are visible
      classToAdd: 'visible',

      // The offset of the elements (let them appear earlier or later)
      offset: 30,

      // Add the possibility to remove the class if the elements are not visible
      repeat: false,
    });

    
  }

  $('.nav-util .fsNavLevel1 > li:last-child > a').on("click", function(e){
    e.preventDefault();
  });

  // ================================
  // Home
  // ================================

  if($('body:not(.fsDraftMode)').hasClass('landing')){
    // Slideshow must use:
    // Media Element >> 'player' mode >> 'custom player' option under 'advanced settings'

    // Find slideshow data
    $('.main-slideshow .fsMediaContainer').on('init', function(event, slick, direction){
         $($body).addClass('slideshowloaded');
      });
    $($mainSlideshow).insertAfter('#fsHeader>.fsBanner .header-photo');
    $('.slideshow-buttons').appendTo($mainSlideshow);
    $('<div class="dots-container"></div>').appendTo($mainSlideshow);

    // Slideshow must use:
    // Media Element >> 'player' mode >> 'custom player' option under 'advanced settings'

    // Find slideshow data
    var jsonMainSlides = $($mainSlideshow + ' .fsMediaCustomPlayer').attr('data-playlisturl');

    $.getJSON(jsonMainSlides, function(data) {

      // Populate Slideshow
      $.each(data.objects, function(i, object) {
        $('<article style="background-image: url(' + object.full_path + ');"></article>')
          .prepend('<div class="caption"><div class="caption-title">' + object.object_title + '</div><div class="caption-description">' + object.object_description + '</div></div>')
          .appendTo($mainSlideshow + ' .fsMediaContainer');
      });
      

    }).done(function(){

      //$('<div class="arrowHolder">').appendTo('.main-slideshow');
      
      $('.main-slideshow .fsMediaContainer').slick({
          infinite: true, 
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          accessibility: true,
          adaptiveHeight: true,
          dots: true,
          speed: 500,
          arrows: false,
          appendDots: '.dots-container',
          autoplay: true,
          autoplaySpeed: 5000,
          responsive: [{
            breakpoint: 1250,
            settings: {
            }
          }]
       })
       .on('setPosition', function(event, slick){
          $('.main-slideshow .dots-container').prependTo('.main-slideshow article.slick-active .caption');
        });

       $('.fsElementContent a[href*="youtube.com/w"], .fsElementContent a[href*="vimeo.com"]').nivoLightbox(); 
    });

    // Find slideshow data
    $('.main-slideshow .fsMediaContainer').on('init', function(event, slick, direction){
         $($body).addClass('slideshowloaded');
      });
    $($mainSlideshow).insertAfter('#fsHeader>.fsBanner .header-photo');
    $('.slideshow-buttons').appendTo($mainSlideshow);
    

    // Slideshow must use:
    // Media Element >> 'player' mode >> 'custom player' option under 'advanced settings'



    // 75th Slideshow
    var jsonMainSlides2 = $($home75th + ' .fsMediaCustomPlayer').attr('data-playlisturl');

    $.getJSON(jsonMainSlides2, function(data) {

      // Populate Slideshow
      $.each(data.objects, function(i, object) {
        $('<article style="background-image: url(' + object.full_path + ');"></article>')
          .prepend('<div class="caption"><div class="caption-title">' + object.object_title + '</div><div class="caption-description">' + object.object_description + '</div></div>')
          .appendTo($home75th + ' .fsMediaContainer');
      });
      

    }).done(function(){
      
      $('.home-75th .fsMediaContainer').slick({
          infinite: true, 
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          accessibility: true,
          adaptiveHeight: true,
          dots: false,
          speed: 500,
          arrows: true,
          autoplay: false,
          prevArrow: '<span class="icon-arrowleft"></span>',
          nextArrow: '<span class="icon-arrowright"></span>',
          autoplaySpeed: 5000,
          responsive: [{
            breakpoint: 1250,
            settings: {
            }
          }]
       });

        
       $('.home-75th .fsMediaContainer').on('click', function(){
          $(this).slick('slickPlay').addClass('clickeroo');
       });

       $('.fsElementContent a[href*="youtube.com/w"], .fsElementContent a[href*="vimeo.com"]').nivoLightbox(); 

    });

    $('.landing-calendar article').unwrap();
    $('.home-calendar article').unwrap();
    $('.home-calendar .fsListItems').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        accessibility: true,
        adaptiveHeight: true,
        variableHeight: true,
        dots: false,
        speed: 500,
        arrows: true,
        prevArrow: '<span class="icon-arrowleft"></span>',
        nextArrow: '<span class="icon-arrowright"></span>',
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 1100,
          settings: {
           slidesToShow: 3,
          slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
           slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: "unslick"
        }]
     });//home calendar

    

    $('.landing-calendar .fsListItems').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        accessibility: true,
        adaptiveHeight: true,
        variableHeight: true,
        dots: false,
        speed: 500,
        arrows: true,
        prevArrow: '<span class="icon-arrowleft"></span>',
        nextArrow: '<span class="icon-arrowright"></span>',
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 1100,
          settings: {
           slidesToShow: 3,
          slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
           slidesToScroll: 2,
          }
        },
        {
          breakpoint: 500,
          settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
          }
        }]
     });//home calendar

    $('.multiday-calendar .fsListItems').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        accessibility: true,
        adaptiveHeight: true,
        variableHeight: true,
        dots: false,
        speed: 500,
        arrows: true,
        prevArrow: '<span class="icon-arrowleft"></span>',
        nextArrow: '<span class="icon-arrowright"></span>',
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 1100,
          settings: {
           slidesToShow: 3,
          slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
           slidesToScroll: 2,
          }
        },
        {
          breakpoint: 500,
          settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
          }
        }]
     });//home calendar

    backgroundImage('.home-news a.fsThumbnail');
    
    $('.home-news .fsListItems').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: true,
        adaptiveHeight: true,
        dots: false,
        speed: 500,
        arrows: true,
        prevArrow: '<span class="icon-arrowleft"></span>',
        nextArrow: '<span class="icon-arrowright"></span>',
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 1400,
          settings: {
           slidesToShow: 4,
          slidesToScroll: 4,
          }
        },
        {
          breakpoint: 1100,
          settings: {
           slidesToShow: 3,
           slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
           adaptiveHeight: true,
           slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
          }
        }]
     });

    

    // instagram slider


    //$('.nav-social-container').appendTo('.social-home > .fsElementContent');

    $('.infogfx-slider-container > .fsElementContent').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    accessibility: true,
    adaptiveHeight: true,
    variableHeight: true,
    dots: false,
    speed: 500,
    arrows: true,
    prevArrow: '<span class="icon-arrowleft"></span>',
    nextArrow: '<span class="icon-arrowright"></span>',
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [{
      breakpoint: 1000,
      settings: {
       slidesToShow: 3
      }
    },
    {
      breakpoint: 800,
      settings: {
       slidesToShow: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
       slidesToShow: 1
      }
    }]
 });//highlight slid

  $('.spirit-people-container > .fsElementContent').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    adaptiveHeight: true,
    variableHeight: true,
    dots: false,
    speed: 500,
    arrows: true,
    prevArrow: '<span class="icon-arrowleft"></span>',
    nextArrow: '<span class="icon-arrowright"></span>',
    autoplay: false,
    autoplaySpeed: 5000
  });//highlight slid
    

  $('.testimonial-box').each(function(){
    var hreffle = $(this).find('footer a').clone().addClass('hreffle').empty();
    $(this).append(hreffle);
  });

  $('.buttons-over-image li a').wrapInner('<span></span>');

  $('.mastery-box').each(function(){
    var hreffle = $(this).find('.fsElementContent a').clone().addClass('hreffle').empty();
    $(this).append(hreffle);
  });

  $('.graduates-box').each(function(){
    var hreffle = $(this).find('footer a').clone().addClass('hreffle').empty();
    $(this).append(hreffle);
    $(this).find('footer').appendTo($(this).find('.fsElementContent'));
  });

  $('.athletic-link-box').each(function(){
    var hreffle = $(this).find('footer a').clone().addClass('hreffle').empty();
    $(this).append(hreffle);
  });

  $('.programs-container .program').wrapInner('<div class="vcenter"></div>');
  $('.athletics-video').wrapInner('<div class="vcenter"></div>');
  
}//landing home not draft

  
if($('body:not(.fsDraftMode)').length > 0 ) {
  backgroundImage('.athletics-news a.fsThumbnail');
    
    $('.athletics-news .fsListItems').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: true,
        adaptiveHeight: true,
        variableHeight: true,
        dots: false,
        speed: 500,
        arrows: true,
        prevArrow: '<span class="icon-arrowleft"></span>',
        nextArrow: '<span class="icon-arrowright"></span>',
        autoplaySpeed: 5000,
        responsive: [{
          breakpoint: 1400,
          settings: {
           slidesToShow: 4,
          slidesToScroll: 4,
          }
        },
        {
          breakpoint: 1100,
          settings: {
           slidesToShow: 3,
           slidesToScroll: 3,
          }
        },
        {
          breakpoint: 800,
          settings: {
           slidesToShow: 2,
           slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
          }
        }]
     });


  if($('#fsHeader .multiphoto-top').length > 0) {
    //$('.multiphoto-top').insertAfter('.header-photo');

    var imgamount = $('.multiphoto-top > .fsElementContent img').length;

    $('.multiphoto-top > .fsElementContent img').each(function(i, elem) {

      var img = $(elem);

      var parentparagraph = $(this).parent('p');
      
      var div = $('<div class="hphotoCommon">').css({
        background: 'url(' + img.attr('src') + ') no-repeat'
      });
      if($(parentparagraph).length>0){$(this).unwrap();}

      img.replaceWith(div);

      div.addClass('hphotos' + imgamount);
    });
  } 

  if($('.team-droplist').length > 0) {

    if($('.multiphoto-top').length > 0) {
      $('.team-droplist').insertAfter('.multiphoto-top');
    } else {
      $('.team-droplist').insertAfter('.header-photo');
    }

    if($('body:not(.fsDraftMode)')) {
      $('.fsAthleticsTeamDirectory > li').each(function(){
        function isEmpty( el ){
          return !$.trim(el.html());
        }
        var theLi = $(this).find('> ul');


        if (isEmpty($(theLi))) {
          $(this).remove();
        }

      });
    }
  }
}// draft


  // ================================
  // Drop down columns
  // ================================

  // 4 Column Nav Layout
    var num_cols = 2,
      container = $('.nav-main .fsNavLevel1 > li > .fsNavPageInfo > ul'),
      listItem = 'li',
      listClass = 'twoCol-list';
    container.each(function() {
      var items_per_col = new Array(),
        items = $(this).find(listItem),
        min_items_per_col = Math.floor(items.length / num_cols),
        difference = items.length - (min_items_per_col * num_cols);
      for (var i = 0; i < num_cols; i++) {
        if (i < difference) {
          items_per_col[i] = min_items_per_col + 1;
        }
        else {
          items_per_col[i] = min_items_per_col;
        }
      }
      for (var i = 0; i < num_cols; i++) {
        $(this).append($('<ul ></ul>').addClass(listClass));
        for (var j = 0; j < items_per_col[i]; j++) {
          var pointer = 0;
          for (var k = 0; k < i; k++) {
            pointer += items_per_col[k];
          }
          $(this).find('.' + listClass).last().append(items[j + pointer]);
        }
      }
    });


  // ================================
  // Style Guide
  // ================================

  if($('.fsPageTitle').text() == 'Style Guide') {

    $($body).addClass('style-guide-page');

  }




});

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
**/


jQuery(function($) {

  var $body = $('body'),
      $navMain = $('.nav-main'),
      $navSub = $('.nav-third'),
      $portalNav = $('.portal-nav'),
      $portalLeft = $('.portal-left-nav'),
      drawer = '.drawer',
      mobileBP = 600;




 

  $body.addClass('pageloaded');

  // header photo
  backgroundImage('.header-photo');

  $('.fsElementContent a[href*="youtube.com/w"], .fsElementContent a[href*="vimeo.com"]').nivoLightbox(); 

  //powered by move
  $('#fsPoweredByFinalsite').appendTo('.footer-links > .fsElementContent');

  $('#fsHeader .nav-main .fsNavLevel1 > li > .fsNavPageInfo').wrapInner('<div class="contain"></div>');

  // ================================
  // Navigation
  // ================================

  //$('.nav-portal .fsNavLevel1').removeClass('fsNavLevel1').addClass('fsNavLevel2').insertAfter('.nav-util .fsNavLevel1 > li > a[href*="myseb"]').wrap('<div class="fsNavPageInfo"></div>');

  // Create a section title based on the current page

  var $navMain_level1 = $('.nav-main:first .fsNavLevel1'),
      $navSub_title = $navSub.find('> header > .fsElementTitle'),
      $portalNav_title = $portalNav.find('> header > .fsElementTitle'),
      $portalLeft_title = $portalLeft.find('> header > .fsElementTitle'),
      sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();

  if (sectionTitle.length !== 0) {
    $navSub_title.html(sectionTitle);
  }

  if($navSub.find('nav .fsNavLevel1').length !== 0) {
      $navSub.removeClass( 'nav-sub-empty' );
  } else {
      $navSub.addClass( 'nav-sub-empty' );
  }

  // nav-sub - mobile toggle
  $navSub_title.click( function() {
    $(this).closest( $navSub ).toggleClass( 'active-nav' );
  });

  $(document).on('click', function(event) {
    if ( !$(event.target).closest( $navSub ).length ) {
        $navSub.removeClass( 'active-nav' );
    }
  });

  if ($('.portal-nav').length !== 0) {
    $portalNav_title.html('In This Section');
  }

  if($portalNav.find('nav .fsNavLevel1').length !== 0) {
      $portalNav.removeClass( 'nav-sub-empty' );
  } else {
      $portalNav.addClass( 'nav-sub-empty' );
  }

  // nav-sub - mobile toggle
  $portalNav_title.click( function() {
    $(this).closest( $portalNav ).toggleClass( 'active-nav' );
  });

  if($portalNav.find('nav .fsNavLevel1').length !== 0) {
      $portalNav.removeClass( 'nav-sub-empty' );
  } else {
      $portalNav.addClass( 'nav-sub-empty' );
  }

  $(document).on('click', function(event) {
    if ( !$(event.target).closest( $portalNav ).length ) {
        $portalNav.removeClass( 'active-nav' );
    }
  });


//
  if ($('.portal-left-nav').length !== 0) {
    $portalLeft_title.html('In This Section');
  }

  if($portalLeft.find('nav .fsNavLevel1').length !== 0) {
      $portalLeft.removeClass( 'nav-sub-empty' );
  } else {
      $portalLeft.addClass( 'nav-sub-empty' );
  }

  // nav-sub - mobile toggle
  $portalLeft_title.click( function() {
    $(this).closest( $portalLeft ).toggleClass( 'active-nav' );
  });

  if($portalLeft.find('nav .fsNavLevel1').length !== 0) {
      $portalLeft.removeClass( 'nav-sub-empty' );
  } else {
      $portalLeft.addClass( 'nav-sub-empty' );
  }

  $(document).on('click', function(event) {
    if ( !$(event.target).closest( $portalLeft ).length ) {
        $portalLeft.removeClass( 'active-nav' );
    }
  });
  //Search Trigger

  /*=============================*/
  /* Search triggers             */
  /*=============================*/
  $body.on('click', '#fsHeader .nav-util-right .fsNavLevel1 > li > a[href*="search"]', function(e){

    $body.addClass('search-expanded');
    e.preventDefault();
    $body.removeClass('campus-active');
  });

  $body.on('click', '#fsHeader .top-search-container, #fsHeader .nav-util-right .fsNavLevel1 > li > a[href*="search"]', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', function (e) {
    $body.removeClass('search-expanded');
    
  });

  $('.team-droplist header').click(function(){
    $('.team-droplist').toggleClass('active');
  });

  $(document).on('click', function(event) {

    if (!$(event.target).closest('.team-droplist header, .team-droplist .fsElementContent').length) {
      $('.team-droplist').removeClass('active');
    }

  });
  

  //Campus drop trigger

  /*=============================*/
  /* Campus Drop triggers             */
  /*=============================*/
  $body.on('click', '#fsHeader .nav-util-right .fsNavLevel1 > li > a[href*="campus"]', function(j){

    $body.addClass('campus-active');
    j.preventDefault();
    $body.removeClass('search-expanded');
  });

  $body.on('click', '#fsHeader .drop-campuses, #fsHeader .nav-util-right .fsNavLevel1 > li > a[href*="campus"]', function(j) {
    j.stopPropagation();
  });

  $(document).on('click', function (j) {
    $body.removeClass('campus-active');
  });



  if($('.header-photo').length === 0 && $('.multiphoto-top').length === 0 ) {
    $('body').addClass('nophoto');
  }

  

  // ================================
  // Best Practice Portals Scripts
  // ================================

    //move hero image 
    if($('body:not(.fsDraftMode)').hasClass('portal')){
      $('.portal-hero').insertBefore('#fsPageBodyWrapper');

      $('.nav-sub')
        .clone()
        //.removeClass('nav-sub')
        .addClass('portal-sub-mobile')
        .insertBefore('#fsPageBodyWrapper');
      $('.portal-sub-mobile').prepend('<div class="sub-trigger">More Pages</div>');

      $('.sub-trigger').click(function(){
        $(this).parent().toggleClass('active');
      });

      backgroundImage($('.portal-news a.fsThumbnail'));
      backgroundImage($('.portal-directory .fsPhoto'));

      $('.portal-cal footer .fsElementFooterContent').appendTo('.portal-cal > .fsElementContent > .fsListItems');

      $('.portal-student-announcements').prependTo('#fsPageBody');
      $('.portal-photos').insertAfter('#fsPageBodyWrapper');
    }

  // ================================
  // Responsive Built-in sliders 
  // ================================

  // the following takes care of the news/calendar slideshow option
  // and makes them responsive

	var targets = [ 
		'.fsNews.fsSlideshow',
		'.fsCalendar.fsSlideshow'
	];


	var bp = [{

    breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
    breakpoint: mobileBP,
      settings: {
        slidesToShow: 1,
        dots: false
			}
	}];

	for (var i = 0; i < targets.length; i++) {
		$(targets[i] + ' .fsElementSlideshow').slick('slickSetOption', 'responsive', bp, true);
	}

});



function getFacebook(e,t,n){function i(e,t){var n=t.object_id,i="/cf_endpoints/facebook.cfm?action=photo&id="+n;$.getJSON(i,function(t){photo_src=t.source,e.find(".fb-inner").append('<div class="entry-photo"><img src="'+photo_src+'" ></div>')})}n=n||3;var o=1,a="/cf_endpoints/facebook.cfm?id="+e;$.getJSON(a,function(a){for(var r=a.data,s=0;s<r.length;s++){var l=r[s],c=(l.message,l.from.id),d=(l.link,l.status_type);if(c===e&&n>0&&("added_photos"===d||"shared_story"===d)){var h='<article class="facebook-post '+l.status_type+'"><a class="facebook-title" href="'+l.link+'" target="_blank">'+l.name+'</a><div class="facebook-picture"><img src='+l.picture+" /></div>";h+='<div class="entry-content">'+l.message+"</div>",h+='<div class="shared-description">'+l.description+"</div>",h+="</article>";var f=$(h).appendTo(t+[o]);n--,o++,l.picture&&l.object_id&&i(f,l)}}$('.entry-content:contains("undefined")').remove()})}function socialFeedsInit(){var e=[{url:"http://widget.stagram.com/rss/n/lenoirrhyne/",classname:"instagram",target:".instagram-posts .fsElementContent",number:16,loaded:!1}];for(i=0;i<e.length;i++)loadFeed(e[i]);var t=setInterval(function(){$('iframe[id*="twitter-widget"]').length&&($(".fsTwitter").each(function(){renderTweets(this)}),clearInterval(t))},100)}function loadFeed(e){var t=e.url,n=e.classname,i="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22"+t+"%22&format=json&diagnostics=true&callback=",o=$(e.target);$.getJSON(i,function(t){for(var i=t.query.results.item,a=0;a<e.number;a++){var r=i[a],s=r.link,l='<div class="entry '+n+'-entry">';l+='<div class="entry-title"><a href="'+s+'" target="_blank">'+r.title+"</a></div>",l+='<div class="entry-content">'+r.description+"</div>",l+="</div>";var c=$(l).appendTo(o);switch(e.classname){case"instagram":$("img",c).eq(1).appendTo(c).wrap('<div class="img-wrap"><a href="'+s+'" target="_blank">'),backgroundImage(".img-wrap");break;case"facebook":$("img",c).each(function(e){e>0&&$(this).remove()});break;case"tumblr":$()}}if(e.loaded=!0,"instagram"==n){var d=$(".instagram-entry"),h=parseInt(Math.random()*($(".instagram-entry").length-1));$(d[h]).find(".img-wrap").clone().appendTo(".instagram-clone .fsElementContent"),$(".instagram-posts .fsElementContent").slick({dots:!1,arrows:!0,prevArrow:'<span class="slick-prev icon-chevron-thin-left"></span>',nextArrow:'<span class="slick-next icon-chevron-thin-right"></span>',infinite:!0,slidesToShow:8,centerMode:!1,variableWidth:!0,cssEase:"linear",speed:2e3,autoplay:!0,autoplaySpeed:3e3,pauseOnHover:!0,responsive:[{breakpoint:650,settings:{speed:2e3}}]})}"tumblr"==n&&backgroundImage(".tumblr-entry")})}function renderTweets(e){var t=setInterval(function(){if($('iframe[id*="twitter"]').contents().find(".timeline-TweetList-tweet").length>0){clearInterval(t);var n=$(e).find('iframe[id*="twitter"]').contents(),i=n.find(".timeline-TweetList-tweet"),o=4;$(e).append('<ul class="tweets">'),i.each(function(t){o>t&&$(this).appendTo($(e).find(".tweets")),$(this).find("time").prependTo($(this).find(".footer"))})}$('iframe[id*="twitter-widget"]').hide(),$(".tweets .timeline-TweetList-tweet:nth-child(4)").appendTo(".twitter4 .fsElementContent"),$(".tweets .timeline-TweetList-tweet:nth-child(3)").appendTo(".twitter3 .fsElementContent"),$(".tweets .timeline-TweetList-tweet:nth-child(2)").appendTo(".twitter2 .fsElementContent"),$(".tweets .timeline-TweetList-tweet:nth-child(1)").appendTo(".twitter1 .fsElementContent")},100)}function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function date(){var e,t,n=".date-container",i=new Date,o=i.getYear(),a=i.getDay(),r=i.getMonth(),s=i.getDate(),l=i.getHours();e=l%12||12,t=12>l?"am":"pm";var c=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes();1e3>o&&(o+=1900),10>s&&(s="0"+s);var d=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),h=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"),f='<div class="date"><div class="day">'+d[a]+',</div><div class="month"> '+h[r]+" "+s+'</div><div class="time">'+e+":"+c+" "+t+"</div></div>";$(n).html(f)}function debounce(e,t,n){var i;return function(){var o=this,a=arguments,r=function(){i=null,n||e.apply(o,a)},s=n&&!i;clearTimeout(i),i=setTimeout(r,t),s&&e.apply(o,a)}}function placeholder(e,t){"use strict";var n,i,o=100,a=100;n=function r(){e.find("input").length?$.support.placeholder?e.find("input").attr("placeholder",t):e.find("input").attr("value",t):o>0&&(i=setTimeout(r,a),o-=1)},i=setTimeout(n,a)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var i=n.split("."),o=t[i.shift()],a=0,r=i.length;r>a;a++)o=o[i[a]];return"undefined"!=typeof o&&null!==o?o:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,i=$(e.target).closest(".fsCalendarDaybox");n=i.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),i.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,i){var o=$(i).hasClass("fsCalendar fsGrid");o&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}$.fn.mediaSlider=function(e){slideshowClass=this;var t,n,i=600,o=$(slideshowClass).find(".fsMediaCustomPlayer"),a=o.attr("data-playlisturl"),r=$.extend({mediaTemplate:""},e),s={slide:r.mediaTemplate.join("\n")};o.data("display_loaded",!1),$.getJSON(a,function(e){$(window).width()>i?t="full":(t="mobile",$(window).on("resize",function(){var e=$(this).width();e>i&&!o.data("display_loaded")&&($(window).data("display_loaded",!0),o.find("article").each(function(){var e=$(this).find("img").attr("src").replace("/mobile/","/fullsize/");$(this).find("img").attr("src",e),$(this).attr("style",'background-image: url("'+e+'");')}))})),$.each(e.objects,function(i,a){n="full"===t?e.objects[i].full_path:e.objects[i].mobile_path,o.append(nano(s.slide,{imgSrc:n,captionTitle:e.objects[i].object_title,captionDesc:e.objects[i].object_description}))})}).done(function(){e.callback()}).fail(function(){o.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign","center")})},window.Modernizr=function(e,t,n){function i(e){b.cssText=e}function o(e,t){return typeof e===t}function a(e,t){return!!~(""+e).indexOf(t)}function r(e,t){for(var i in e){var o=e[i];if(!a(o,"-")&&b[o]!==n)return"pfx"==t?o:!0}return!1}function s(e,t,i){for(var a in e){var r=t[e[a]];if(r!==n)return i===!1?e[a]:o(r,"function")?r.bind(i||t):r}return!1}function l(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+C.join(i+" ")+i).split(" ");return o(t,"string")||o(t,"undefined")?r(a,t):(a=(e+" "+k.join(i+" ")+i).split(" "),s(a,t,n))}var c,d,h,f="2.8.3",u={},p=!0,v=t.documentElement,m="modernizr",g=t.createElement(m),b=g.style,y={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),w="Webkit Moz O ms",C=w.split(" "),k=w.toLowerCase().split(" "),$={svg:"http://www.w3.org/2000/svg"},T={},E=[],S=E.slice,j=function(e,n,i,o){var a,r,s,l,c=t.createElement("div"),d=t.body,h=d||t.createElement("body");if(parseInt(i,10))for(;i--;)s=t.createElement("div"),s.id=o?o[i]:m+(i+1),c.appendChild(s);return a=["&#173;",'<style id="s',m,'">',e,"</style>"].join(""),c.id=m,(d?c:h).innerHTML+=a,h.appendChild(c),d||(h.style.background="",h.style.overflow="hidden",l=v.style.overflow,v.style.overflow="hidden",v.appendChild(h)),r=n(c,e),d?c.parentNode.removeChild(c):(h.parentNode.removeChild(h),v.style.overflow=l),!!r},A=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var i;return j("@media "+t+" { #"+m+" { position: absolute; } }",function(t){i="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),i},M={}.hasOwnProperty;h=o(M,"undefined")||o(M.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return M.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=S.call(arguments,1),i=function(){if(this instanceof i){var o=function(){};o.prototype=t.prototype;var a=new o,r=t.apply(a,n.concat(S.call(arguments)));return Object(r)===r?r:a}return t.apply(e,n.concat(S.call(arguments)))};return i}),T.flexbox=function(){return l("flexWrap")},T.flexboxlegacy=function(){return l("boxDirection")},T.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:j(["@media (",x.join("touch-enabled),("),m,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},T.cssanimations=function(){return l("animationName")},T.csscolumns=function(){return l("columnCount")},T.csstransforms=function(){return!!l("transform")},T.csstransforms3d=function(){var e=!!l("perspective");return e&&"webkitPerspective"in v.style&&j("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},T.csstransitions=function(){return l("transition")},T.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},T.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},T.svg=function(){return!!t.createElementNS&&!!t.createElementNS($.svg,"svg").createSVGRect},T.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==$.svg},T.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(y.call(t.createElementNS($.svg,"clipPath")))};for(var L in T)h(T,L)&&(d=L.toLowerCase(),u[d]=T[L](),E.push((u[d]?"":"no-")+d));return u.addTest=function(e,t){if("object"==typeof e)for(var i in e)h(e,i)&&u.addTest(i,e[i]);else{if(e=e.toLowerCase(),u[e]!==n)return u;t="function"==typeof t?t():t,"undefined"!=typeof p&&p&&(v.className+=" "+(t?"":"no-")+e),u[e]=t}return u},i(""),g=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=g[e[v]];return t||(t={},m++,e[v]=m,g[m]=t),t}function a(e,n,i){if(n||(n=t),d)return n.createElement(e);i||(i=o(n));var a;return a=i.cache[e]?i.cache[e].cloneNode():p.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!a.canHaveChildren||u.test(e)||a.tagUrn?a:i.frag.appendChild(a)}function r(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),r=0,s=i(),l=s.length;l>r;r++)a.createElement(s[r]);return a}function s(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function l(e){e||(e=t);var i=o(e);return b.shivCSS&&!c&&!i.hasCSS&&(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||s(e,i),e}var c,d,h="3.7.0",f=e.html5||{},u=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",m=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,d=!0}}();var b={elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:h,shivCSS:f.shivCSS!==!1,supportsUnknownElements:d,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:l,createElement:a,createDocumentFragment:r};e.html5=b,l(t)}(this,t),u._version=f,u._prefixes=x,u._domPrefixes=k,u._cssomPrefixes=C,u.mq=A,u.testProp=function(e){return r([e])},u.testAllProps=l,u.testStyles=j,v.className=v.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+E.join(" "):""),u}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==m.call(e)}function o(e){return"string"==typeof e}function a(){}function r(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function s(){var e=g.shift();b=1,e?e.t?p(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),s()):b=0}function l(e,n,i,o,a,l,c){function d(t){if(!u&&r(h.readyState)&&(y.r=u=1,!b&&s(),h.onload=h.onreadystatechange=null,t)){"img"!=e&&p(function(){w.removeChild(h)},50);for(var i in E[n])E[n].hasOwnProperty(i)&&E[n][i].onload()}}var c=c||f.errorTimeout,h=t.createElement(e),u=0,m=0,y={t:i,s:n,e:a,a:l,x:c};1===E[n]&&(m=1,E[n]=[]),"object"==e?h.data=n:(h.src=n,h.type=e),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){d.call(this,m)},g.splice(o,0,y),"img"!=e&&(m||2===E[n]?(w.insertBefore(h,x?null:v),p(d,c)):E[n].push(h))}function c(e,t,n,i,a){return b=0,t=t||"j",o(e)?l("c"==t?k:C,e,t,this.i++,n,i,a):(g.splice(this.i++,0,e),1==g.length&&s()),this}function d(){var e=f;return e.loader={load:c,i:0},e}var h,f,u=t.documentElement,p=e.setTimeout,v=t.getElementsByTagName("script")[0],m={}.toString,g=[],b=0,y="MozAppearance"in u.style,x=y&&!!t.createRange().compareNode,w=x?u:v.parentNode,u=e.opera&&"[object Opera]"==m.call(e.opera),u=!!t.attachEvent&&!u,C=y?"object":u?"script":"img",k=u?"script":C,$=Array.isArray||function(e){return"[object Array]"==m.call(e)},T=[],E={},S={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};f=function(e){function t(e){var t,n,i,e=e.split("!"),o=T.length,a=e.pop(),r=e.length,a={url:a,origUrl:a,prefixes:e};for(n=0;r>n;n++)i=e[n].split("="),(t=S[i.shift()])&&(a=t(a,i));for(n=0;o>n;n++)a=T[n](a);return a}function r(e,o,a,r,s){var l=t(e),c=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=i(o)?o:o[e]||o[r]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,a,r,s):(E[l.url]?l.noexec=!0:E[l.url]=1,a.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(o)||i(c))&&a.load(function(){d(),o&&o(l.origUrl,s,r),c&&c(l.origUrl,s,r),E[l.url]=2})))}function s(e,t){function n(e,n){if(e){if(o(e))n||(h=function(){var e=[].slice.call(arguments);f.apply(this,e),u()}),r(e,h,t,0,c);else if(Object(e)===e)for(l in s=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--s&&(i(h)?h=function(){var e=[].slice.call(arguments);f.apply(this,e),u()}:h[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),u()}}(f[l])),r(e[l],h,t,l,c))}else!n&&u()}var s,l,c=!!e.test,d=e.load||e.both,h=e.callback||a,f=h,u=e.complete||a;n(c?e.yep:e.nope,!!d),d&&n(d)}var l,c,h=this.yepnope.loader;if(o(e))r(e,0,h,0);else if($(e))for(l=0;l<e.length;l++)c=e[l],o(c)?r(c,0,h,0):$(c)?f(c):Object(c)===c&&s(c,h);else Object(e)===e&&s(e,h)},f.addPrefix=function(e,t){S[e]=t},f.addFilter=function(e){T.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",h=function(){t.removeEventListener("DOMContentLoaded",h,0),t.readyState="complete"},0)),e.yepnope=d(),e.yepnope.executeStack=s,e.yepnope.injectJs=function(e,n,i,o,l,c){var d,h,u=t.createElement("script"),o=o||f.errorTimeout;u.src=e;for(h in i)u.setAttribute(h,i[h]);n=c?s:n||a,u.onreadystatechange=u.onload=function(){!d&&r(u.readyState)&&(d=1,n(),u.onload=u.onreadystatechange=null)},p(function(){d||(d=1,n(1))},o),l?u.onload():v.parentNode.insertBefore(u,v)},e.yepnope.injectCss=function(e,n,i,o,r,l){var c,o=t.createElement("link"),n=l?s:n||a;o.href=e,o.rel="stylesheet",o.type="text/css";for(c in i)o.setAttribute(c,i[c]);r||(v.parentNode.insertBefore(o,v),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(e){e.fn.viewportChecker=function(t){var n={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(e,t){},scrollHorizontal:!1,scrollBox:window};e.extend(n,t);var i=this,o={height:e(n.scrollBox).height(),width:e(n.scrollBox).width()},a=-1!=navigator.userAgent.toLowerCase().indexOf("webkit")||-1!=navigator.userAgent.toLowerCase().indexOf("windows phone")?"body":"html";return this.checkElements=function(){var t,r;n.scrollHorizontal?(t=e(a).scrollLeft(),r=t+o.width):(t=e(a).scrollTop(),r=t+o.height),i.each(function(){var i=e(this),a={},s={};if(i.data("vp-add-class")&&(s.classToAdd=i.data("vp-add-class")),i.data("vp-remove-class")&&(s.classToRemove=i.data("vp-remove-class")),i.data("vp-add-class-full-view")&&(s.classToAddForFullView=i.data("vp-add-class-full-view")),i.data("vp-keep-add-class")&&(s.removeClassAfterAnimation=i.data("vp-remove-after-animation")),i.data("vp-offset")&&(s.offset=i.data("vp-offset")),i.data("vp-repeat")&&(s.repeat=i.data("vp-repeat")),i.data("vp-scrollHorizontal")&&(s.scrollHorizontal=i.data("vp-scrollHorizontal")),i.data("vp-invertBottomOffset")&&(s.scrollHorizontal=i.data("vp-invertBottomOffset")),e.extend(a,n),e.extend(a,s),!i.data("vp-animated")||a.repeat){String(a.offset).indexOf("%")>0&&(a.offset=parseInt(a.offset)/100*o.height);var l=a.scrollHorizontal?i.offset().left:i.offset().top,c=a.scrollHorizontal?l+i.width():l+i.height(),d=Math.round(l)+a.offset,h=a.scrollHorizontal?d+i.width():d+i.height();a.invertBottomOffset&&(h-=2*a.offset),r>d&&h>t?(i.removeClass(a.classToRemove),i.addClass(a.classToAdd),a.callbackFunction(i,"add"),r>=c&&l>=t?i.addClass(a.classToAddForFullView):i.removeClass(a.classToAddForFullView),i.data("vp-animated",!0),a.removeClassAfterAnimation||i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){i.removeClass(a.classToAdd)})):i.hasClass(a.classToAdd)&&a.repeat&&(i.removeClass(a.classToAdd+" "+a.classToAddForFullView),a.callbackFunction(i,"remove"),i.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&e(document).bind("touchmove MSPointerMove pointermove",this.checkElements),e(n.scrollBox).bind("load scroll",this.checkElements),e(window).resize(function(t){o={height:e(n.scrollBox).height(),width:e(n.scrollBox).width()},i.checkElements()}),this.checkElements(),this}}(jQuery),$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e,t,n,i){function o(t,n){this.el=t,this.$el=e(this.el),this.options=e.extend({},r,n),this._defaults=r,this._name=a,this.init()}var a="nivoLightbox",r={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(e){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(e){},onNext:function(e){},errorMessage:"The requested content cannot be loaded. Please try again later."};o.prototype={init:function(){var t=this;e("html").hasClass("nivo-lightbox-notouch")||e("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in n&&e("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(e){t.showLightbox(e)}),this.options.keyboardNav&&e("body").off("keyup").on("keyup",function(n){var i=n.keyCode?n.keyCode:n.which;27==i&&t.destructLightbox(),37==i&&e(".nivo-lightbox-prev").trigger("click"),39==i&&e(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(t){var n=this,i=this.$el,o=this.checkContent(i);if(o){t.preventDefault(),this.options.beforeShowLightbox.call(this);var a=this.constructLightbox();if(a){var r=a.find(".nivo-lightbox-content");if(r){if(e("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(r,i),this.$el.attr("data-lightbox-gallery")){var s=e('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');e(".nivo-lightbox-nav").show(),e(".nivo-lightbox-prev").off("click").on("click",function(t){t.preventDefault();var o=s.index(i);i=s.eq(o-1),e(i).length||(i=s.last()),n.processContent(r,i),n.options.onPrev.call(this,[i])}),e(".nivo-lightbox-next").off("click").on("click",function(t){t.preventDefault();var o=s.index(i);i=s.eq(o+1),e(i).length||(i=s.first()),n.processContent(r,i),n.options.onNext.call(this,[i])})}setTimeout(function(){a.addClass("nivo-lightbox-open"),n.options.afterShowLightbox.call(this,[a])},1)}}}},checkContent:function(e){var t=e.attr("href"),n=t.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==t.match(/\.(jpeg|jpg|gif|png)$/i)?!0:n?!0:"ajax"==e.attr("data-lightbox-type")?!0:"#"==t.substring(0,1)&&"inline"==e.attr("data-lightbox-type")?!0:"iframe"==e.attr("data-lightbox-type")},processContent:function(n,i){var o=this,a=i.attr("href"),r=a.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(n.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&i.attr("data-lightbox-hidpi")&&(a=i.attr("data-lightbox-hidpi")),null!==a.match(/\.(jpeg|jpg|gif|png)$/i)){var s=e("<img>",{src:a});s.one("load",function(){var i=e('<div class="nivo-lightbox-image" />');i.append(s),n.html(i).removeClass("nivo-lightbox-loading"),i.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"}),e(t).resize(function(){i.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&e(this).load()}),s.error(function(){var t=e('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")})}else if(r){var l="",c="nivo-lightbox-video";if("youtube"==r[1]&&(l="http://www.youtube.com/embed/"+r[4],c="nivo-lightbox-youtube"),"youtu"==r[1]&&(l="http://www.youtube.com/embed/"+r[3],c="nivo-lightbox-youtube"),"vimeo"==r[1]&&(l="http://player.vimeo.com/video/"+r[3],c="nivo-lightbox-vimeo"),l){var d=e("<iframe>",{src:l,"class":c,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(d),d.load(function(){n.removeClass("nivo-lightbox-loading")})}}else if("ajax"==i.attr("data-lightbox-type"))e.ajax({url:a,cache:!1,success:function(i){var o=e('<div class="nivo-lightbox-ajax" />');o.append(i),n.html(o).removeClass("nivo-lightbox-loading"),o.outerHeight()<n.height()&&o.css({position:"relative",top:"50%","margin-top":-(o.outerHeight()/2)+"px"}),e(t).resize(function(){o.outerHeight()<n.height()&&o.css({position:"relative",top:"50%","margin-top":-(o.outerHeight()/2)+"px"})})},error:function(){var t=e('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")}});else if("#"==a.substring(0,1)&&"inline"==i.attr("data-lightbox-type"))if(e(a).length){var h=e('<div class="nivo-lightbox-inline" />');h.append(e(a).clone().show()),n.html(h).removeClass("nivo-lightbox-loading"),h.outerHeight()<n.height()&&h.css({position:"relative",top:"50%","margin-top":-(h.outerHeight()/2)+"px"}),e(t).resize(function(){h.outerHeight()<n.height()&&h.css({position:"relative",top:"50%","margin-top":-(h.outerHeight()/2)+"px"})})}else{var f=e('<div class="nivo-lightbox-error"><p>'+o.options.errorMessage+"</p></div>");n.html(f).removeClass("nivo-lightbox-loading")}else{if("iframe"!=i.attr("data-lightbox-type"))return!1;var u=e("<iframe>",{src:a,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(u),u.load(function(){n.removeClass("nivo-lightbox-loading")})}if(i.attr("title")){var p=e("<span>",{"class":"nivo-lightbox-title"});p.text(i.attr("title")),e(".nivo-lightbox-title-wrap").html(p)}else e(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(e(".nivo-lightbox-overlay").length)return e(".nivo-lightbox-overlay");var t=e("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),n=e("<div>",{"class":"nivo-lightbox-wrap"}),i=e("<div>",{"class":"nivo-lightbox-content"}),o=e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),a=e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),r=e("<div>",{"class":"nivo-lightbox-title-wrap"}),s=0;s&&t.addClass("nivo-lightbox-ie"),n.append(i),n.append(r),t.append(n),t.append(o),t.append(a),e("body").append(t);var l=this;return l.options.clickOverlayToClose&&t.on("click",function(t){(t.target===this||e(t.target).hasClass("nivo-lightbox-content")||e(t.target).hasClass("nivo-lightbox-image"))&&l.destructLightbox()}),a.on("click",function(e){e.preventDefault(),l.destructLightbox()}),t},destructLightbox:function(){var t=this;this.options.beforeHideLightbox.call(this),e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),e(".nivo-lightbox-nav").hide(),e("body").removeClass("nivo-lightbox-body-effect-"+t.options.effect);var n=0;n&&(e(".nivo-lightbox-overlay iframe").attr("src"," "),e(".nivo-lightbox-overlay iframe").remove()),e(".nivo-lightbox-prev").off("click"),e(".nivo-lightbox-next").off("click"),e(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var e="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return t.devicePixelRatio>1?!0:!(!t.matchMedia||!t.matchMedia(e).matches)}},e.fn[a]=function(t){return this.each(function(){e.data(this,a)||e.data(this,a,new o(this,t))})}}(jQuery,window,document);