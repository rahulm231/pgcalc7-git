 /**
 *
 * Buckingham, Brown & Nichols - default_16
 * @link http://www.bbns.org/
 * Built By: EasyWebOs
 * Project Manager: Mike Hartzler
 * Designer: Julianne Hamilton
 *
 */

/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/


jQuery(function($) {

    'use strict';

    var HOME = HOME || {};
    var SUBNAV = SUBNAV || {};
    var OFFCANVAS = OFFCANVAS || {};
    var UTIL = UTIL || {};

    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navSub = $('.nav-sub');
    var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
    var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
    var $navSub_title = $navSub.find('> header > .fsElementTitle');
    var bpMobile = 600;
    var bpTablet = 800;
    var isHome = $('.home').length;
    var notDraftMode = !$('.fsDraftMode').length; // if (isHome && notDraftMode)....

    //check if browser supports placeholders for placeholder()
    $.support.placeholder = (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();


    // ================================
    // Sub Navigation
    // ================================

    SUBNAV = {

        init: function() {

            this.title();
            this.mobileNav();

        },

        // Create a section title based on the current page
        title: function() {
            if (sectionTitle.length !== 0) {
                $navSub_title.html(sectionTitle);
            }

            if ($navSub.find('nav .fsNavLevel1').length !== 0) {
                $navSub.removeClass('nav-sub-empty');
            } else {
                $navSub.addClass('nav-sub-empty');
            }

        },

        mobileNav: function() {
            // nav-sub - mobile toggle
            $navSub_title.click(function() {
                $(this).closest($navSub).toggleClass('active-nav');
            });

            // nav-sub remove click elsewhere
            $(document).on('click', function(event) {
                if (!$(event.target).closest($navSub).length) {
                    $navSub.removeClass('active-nav');
                }
            });

        }

    };

    SUBNAV.init();


    // ================================
    // Off Canvas Menu
    // ================================
    OFFCANVAS = {

        init: function() {
            this.clickHandler();
        },

        clickHandler: function() {
            // Toggle attribute of the body
            $('.drawer-trigger').click(function() {
                $body.toggleClass('drawer-is-active');
            });

            // Remove attribute on the bottom if anything other than
            // what is mentioned is clicked on
            $(document).on('click', function(event) {
                if (!$(event.target).closest('#fsMenu, .drawer-trigger').length) {
                    $body.removeClass('drawer-is-active');
                }
            });
        }

    };

    OFFCANVAS.init();


    // ================================
    // Home
    // ================================

    HOME = {


        init: function() {

            this.exampleFunction();

            //NOTE: this is commented out because it most likely will break (example only)
            this.slideshow();
            this.allSchoolsCalendar();
            this.exploreTextToggle();
            this.fetchSocialFeeds();
            this.responsiveUtil();
            this.exploreVideoSliders();

        },

        exampleFunction: function() {

            console.log('// Home Page Init ' + isHome);
            // create functions like this, then call them in init
        },

        //NOTE: THIS IS AN EXAMPLE, NOT A REAL THING

        fetchSocialFeeds : function(){
          $('.instagram-container > .fsElementContent').fsFeedPull('27219','1', {

             feedTemplate:[
               '<article class="fsFeed-post">',
                 '<a href="{fullURL}" target="_blank"><img src="{imgSrc}" class="feed-img" border="0" /></a>',
                 '<a href="https://www.instagram.com/bbnschool/" target="_blank" class="ribbon"></a>',
                 '<a href="{fullURL}" target="_blank" class="caption-overlay">{feedDesc}</a>',
                '</article>'
             ], // html markup



           }, "Instagram");

           $('.facebook-container > .fsElementContent').fsFeedPull('27219','1', {

              feedTemplate:[
                '<article class="fsFeed-post">',
                  '<h2 class="sec-title">Buckingham Browne & Nichols School</h2>',
                  '',
                  '<div class="feed-content">',
                    '<div class="feed-desc"><span class="feed-date">{dateCreatedFB}</span>{feedDesc}</div>',
                  '</div>',
              '</article>',
              '<a href="https://www.facebook.com/buckinghambrownenichols/" target="_blank" class="ribbon"></a>',
              ], // html markup

              callback : function(){
                $(".facebook-container .feed-desc").mCustomScrollbar({
                  axis: "y",
                  theme: "dark"
                });
              }


            }, "Facebook");




            $('.twitter-container > .fsElementContent').fsFeedPull('27219','1', {

               feedTemplate:[
                 '<article class="fsFeed-post">',

                   '<h2 class="sec-title">BB&N School <span>@BBNSchool</span></h2>',
                   '<div class="icon-wrapper">',
                   '<a target="_blank" href="{fullURL}" class="fav"></a>',
                   '<a target="_blank" href="{fullURL}" class="retweet"></a>',
                   '<a target="_blank" href="{fullURL}" class="time">{dateCreated}</a>',
                   '</div>',
                   '<div class="feed-content">',
                     '<div class="feed-desc">{feedDesc}</div>',
                   '</div>',
               '</article>',
               '<a href="https://twitter.com/BBNSchool" target="_blank" class="ribbon"></a>',
               ], // html markup



             }, "Twitter");




        },

        slideshow: function() {

            // src/plugins/fsMediaPull.js
            /*
            $('.universal-slideshow').mediaSlider({

                mediaTemplate: [
                    '<article class="universal-slide" style="background-image: url({imgSrc});">',
                    '</article>'
                ], // html markup

                callback: function() {
                    $('.universal-slideshow').find('.fsMediaCustomPlayer').slick({
                      slidesToShow: 1,
                      slidesToScroll: 1
                    });
                }

            });
            */
            var count = 1;
            $('<div class="news-pop-overlay"></div>').appendTo($("#fsPageWrapper"));
            $(".slider-news-source article").each(function(){

              var image = $(this).find('.fsThumbnail img').attr('src');
              $(this).append('<div class="inner"></div>');
              $(this).find(".inner").css('background-image', 'url("' + image + '")');

              $(this).find(".fsAuthor").remove();


              $('<div class="custom-news-pop news-pop-'+count+'"></div>').appendTo($(".news-pop-overlay"));
              $(this).find(".fsTitle").clone().appendTo($('.news-pop-'+count));
              $(this).find(".fsDateTime").appendTo($('.news-pop-'+count));
              $('<div class="pop-news-content-area"></div>').appendTo($('.news-pop-'+count));
              $('<a class="pop-news-close"></a>').appendTo($('.news-pop-'+count));
              $(this).find(".fsThumbnail").appendTo($('.news-pop-'+count+' > .pop-news-content-area'));
              $(this).find(".fsBody").appendTo($('.news-pop-'+count+' > .pop-news-content-area'));
              $('<div class="overlay"></div>')
              .append('<h3>Buckingham Browne & Nichols School</h3><div class="news-pop-link" rel="'+ count +'"><p class="explore">Explore the Story</p></div>')
              .appendTo($(this));
              $(this).find(".fsTitle").prependTo($(this).find(".news-pop-link"));
              $(this).appendTo(".universal-slideshow > .fsElementContent");




              count++;

            });

            //Down Arrow on the Slider



            $('.universal-slideshow > .fsElementContent').slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              fade: true,
              arrows:true,
              prevArrow: '<a class="main-slider-prev"></a>',
              nextArrow: '<a class="main-slider-next"></a>',
              autoplay: true,
              autoplaySpeed: 3000
            });

            $('<a class="slider-down-arrow animated"></a>').appendTo(".universal-slideshow > .fsElementContent");

            $(".news-pop-link").click(function(){
              $(".news-pop-overlay").addClass("active");
              var num = $(this).attr("rel");
              console.log($(".news-pop-"+num));
              $(".news-pop-"+num).addClass("active");
            });

            $(".pop-news-close").click(function(e){
              $(this).parent().removeClass("active");
              $(".news-pop-overlay").removeClass("active");
              e.preventDefault();
            });

            $(".slider-down-arrow").click(function(){
              $('html, body').animate({
                      scrollTop: $("#fsPageBodyWrapper").offset().top
                  }, 800);
            });

        },

        allSchoolsCalendar : function(){
          $(".all-schools-calendar .fsDayContainer").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false
          });
        },

        exploreTextToggle : function(){
          $(".explore-text h2").click(function(){
                $(".explore-text p").slideUp();
                $(this).closest(".explore-text").find("p").slideDown("fast", function(){
                  $(".explore-text").removeClass("active");
                  $(this).closest(".explore-text").addClass("active");
              });
              var item = $(this).attr("rel");
              $(".home-vimeo-video").removeClass("active");
              $(".home-vimeo-video.video"+item).addClass("active");
              if($(window).width() < 1120){
                $(".right-video").appendTo($(this).closest(".explore-text > .fsElementContent"));
              }
          });
        },

        exploreVideoSliders : function(){
          $(".video1 > .fsElementContent").slick({
            slidesToShow:1,
            slidesToScroll:1,
            fade:true,
            arrows:true,
            dots:false,
            prevArrow:'<div class="video-prev-arrow"></div>',
            nextArrow:'<div class="video-next-arrow"></div>'

          });
          $(".video2 > .fsElementContent").slick({
            slidesToShow:1,
            slidesToScroll:1,
            fade:true,
            arrows:true,
            dots:false,
            prevArrow:'<a class="video-prev-arrow"></a>',
            nextArrow:'<a class="video-next-arrow"></a>'

          });
          $(".video3 > .fsElementContent").slick({
            slidesToShow:1,
            slidesToScroll:1,
            fade:true,
            arrows:true,
            dots:false,
            prevArrow:'<a class="video-prev-arrow"></a>',
            nextArrow:'<a class="video-next-arrow"></a>'

          });
        },

        //Responsive Functions
        responsiveUtil: function(){
          $( window ).resize(function() {
              if($( window ).width() < 1100){
                $(".all-calendar").appendTo($(".school-calendars > .fsElementContent"));
              }else{
                $(".all-calendar").appendTo($(".home-calendar> .fsContainer > .fsElementContent"));
              }
          });

          if($( window ).width() < 1100){
            $(".all-calendar").appendTo($(".school-calendars > .fsElementContent"));
          }


          $( window ).resize(function() {
              if($( window ).width() < 1100){
                $(".facebook-container").appendTo($(".social-feed-container .left-part > .fsElementContent"));
                $(".twitter-container").appendTo($(".social-feed-container .left-part > .fsElementContent"));
              }else{
                $(".facebook-container").appendTo($(".social-feed-container .right-part > .fsElementContent"));
                $(".twitter-container").appendTo($(".social-feed-container .right-part > .fsElementContent"));
              }
          });

          // Add margin to homepage Silent video for adjustment

          if($(window).width() > 1414){
            $(".home-video-area .fsMedia").css("margin-top", $(window).width()*0.103*-1);
          }
          else if($(window).width() > 1030){
            $(".home-video-area .fsMedia").css("margin-top", $(window).width()*0.070*-1);
          }

          $( window ).resize(function() {
            if($(window).width() > 1414){
              $(".home-video-area .fsMedia").css("margin-top", $(window).width()*0.103*-1);
            }
            else if($(window).width() > 1030){
              $(".home-video-area .fsMedia").css("margin-top", $(window).width()*0.070*-1);
            }
            else{
              $(".home-video-area .fsMedia").css("margin-top", "0px");
            }
          });

          //Move Explore Section Video Inside Accordion


          if($(window).width() < 1120){
            $(".right-video").appendTo($(".explore-text.active > .fsElementContent"));
          }

          $( window ).resize(function() {
            if($(window).width() < 1120){
              $(".right-video").appendTo($(".explore-text.active > .fsElementContent"));
            }else{
              $(".right-video").appendTo($(".home-explore-container > .fsContainer > .fsElementContent"));
            }
          });


            if($(window).width() < 1120 ){
              $(".right-video").css("height",$(window).width() * 0.47 + $(".home-vimeo-video.active  footer").height());
            }



          $( window ).resize(function() {
            if($(window).width() > 1120){
              $(".right-video").css("height","520px");
            }
            else{
              $(".right-video").css("height",$(window).width() * 0.47 + $(".home-vimeo-video.active  footer").height());
            }




          });



        }


    };


    if (isHome) {

        HOME.init();

    }


    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

        respondSliders: function() {

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

                breakpoint: bpTablet,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: bpMobile,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll:1,
                    dots: false
                }
            }];

            for (var i = 0; i < targets.length; i++) {
                $(targets[i] + ' .fsElementSlideshow')
                    .slick('slickSetOption', 'responsive', bp, true);
            }

        },

        fixNavigation: function(){
          var counter = 1;
          $( ".nav-main  .fsNavLevel1 > li > .fsNavPageInfo" ).each(function() {

            $('<div class="menu-set-container"></div>').appendTo($(this));


            if(counter === 3){
              $(this).find(".fsNavPageThumbnail").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavLevel2").remove();
              $(".campus-sub-nav").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavPageDescription").appendTo($(this).find(".menu-set-container"));
            }
            else if(counter === 4){
              $(this).find(".fsNavPageThumbnail").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavLevel2").remove();
              $(".academics-sub-nav").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavPageDescription").appendTo($(this).find(".menu-set-container"));
            }
            else if(counter === 5){
              $(this).find(".fsNavPageThumbnail").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavLevel2").remove();
              $(".arts-sub-nav").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavPageDescription").appendTo($(this).find(".menu-set-container"));
            }
            else if(counter === 6){
              $(this).find(".fsNavPageThumbnail").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavLevel2").remove();
              $(".athletics-sub-nav").appendTo($(this).find(".menu-set-container"));
              $(this).find(".fsNavPageDescription").appendTo($(this).find(".menu-set-container"));
            }
            else{
            $(this).find(".fsNavPageThumbnail").appendTo($(this).find(".menu-set-container"));
            $(this).find(".fsNavLevel2").appendTo($(this).find(".menu-set-container"));
            $(this).find(".fsNavPageDescription").appendTo($(this).find(".menu-set-container"));
            }



            var middle_element = Math.ceil(($(this).find(".fsNavLevel2 > li").length) / 2) - 1;
            //console.log(middle_element);

            if(($(this).find(".fsNavLevel2 > li").length) % 2 === 0){
              $(this).find(".fsNavLevel2 > li:eq("+ middle_element +")").addClass("middle_element");
              $(this).find(".fsNavLevel2 > li:last-child").addClass("middle_element");
            }

            if(($(this).find(".fsNavLevel2 > li").length) % 2 !== 0){
                $(this).find(".fsNavLevel2").append("<li><a>&nbsp;</a></li>");
                $(this).find(".fsNavLevel2 > li:last-child").addClass("middle_element");
            }


            counter++;

          });

          //$("#fsMenu").appendTo($(".header-top-placeholder > .fsElementContent"));
          $(".header-top-placeholder").after($("#fsMenu"));
          //Double Tap to Go
          $(".nav-main .fsNavLevel1 > li").doubleTapToGo();

          $("#fsPoweredByFinalsite").appendTo($(".footer-container-right"));


          $('<a class="mobile-nav-open">Main Menu</a>').appendTo($(".header-top-container-inner > .fsElementContent"));

          $(".mobile-nav-open").click(function(e){
            if($(this).hasClass("active")){
              $(this).removeClass("active");
              $(".mobile-nav-container").slideUp();
            }else {
              $(this).addClass("active");
              $(".mobile-nav-container").slideDown();
            }
          });

          $(".schools-hover .buttons").doubleTapToGo();

        },

        searchToggle : function(){
          /*
          $(".search-btn").click(function(e){
            $(".top-search").addClass("active");
            e.preventDefault();
          });
          */
          $(".header-search-area").hover(function(){
            if($(window).width()<700){
              $(".site-info-container").hide();
            }
          },
        function(){
          $(".site-info-container").show();
        });


        },

        closeSearch : function(){
          /*
          $(document).on('click', function(event) {
              if (!$(event.target).closest(".top-search").length && !$(event.target).closest(".search-btn").length) {
                  $(".top-search").removeClass('active');
              }
          });
          */
        }

    };

    UTIL.respondSliders();
    UTIL.fixNavigation();
    UTIL.searchToggle();
    UTIL.closeSearch();

}); //jQuery


function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function debounce(e,t,n){var o;return function(){var a=this,i=arguments,r=function(){o=null,n||e.apply(a,i)},l=n&&!o;clearTimeout(o),o=setTimeout(r,t),l&&e.apply(a,i)}}function placeholder(e,t){"use strict";var n,o,a=100,i=100;n=function r(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):a>0&&(o=setTimeout(r,i),a-=1)},o=setTimeout(n,i)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var o=n.split("."),a=t[o.shift()],i=0,r=o.length;i<r;i++)a=a[o[i]];return"undefined"!=typeof a&&null!==a?a:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,o=$(e.target).closest(".fsCalendarDaybox");n=o.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),o.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,o){var a=$(o).hasClass("fsCalendar fsGrid");a&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}var dateFormat=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,t=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,o=function(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e};return function(a,i,r){var l=dateFormat;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(a)||/\d/.test(a)||(i=a,a=void 0),a=a?new Date(a):new Date,isNaN(a))throw SyntaxError("invalid date");i=String(l.masks[i]||i||l.masks["default"]),"UTC:"==i.slice(0,4)&&(i=i.slice(4),r=!0);var s=r?"getUTC":"get",c=a[s+"Date"](),d=a[s+"Day"](),u=a[s+"Month"](),f=a[s+"FullYear"](),m=a[s+"Hours"](),h=a[s+"Minutes"](),p=a[s+"Seconds"](),g=a[s+"Milliseconds"](),v=r?0:a.getTimezoneOffset(),y={d:c,dd:o(c),ddd:l.i18n.dayNames[d],dddd:l.i18n.dayNames[d+7],m:u+1,mm:o(u+1),mmm:l.i18n.monthNames[u],mmmm:l.i18n.monthNames[u+12],yy:String(f).slice(2),yyyy:f,h:m%12||12,hh:o(m%12||12),H:m,HH:o(m),M:h,MM:o(h),s:p,ss:o(p),l:o(g,3),L:o(g>99?Math.round(g/10):g),t:m<12?"a":"p",tt:m<12?"am":"pm",T:m<12?"A":"P",TT:m<12?"AM":"PM",Z:r?"UTC":(String(a).match(t)||[""]).pop().replace(n,""),o:(v>0?"-":"+")+o(100*Math.floor(Math.abs(v)/60)+Math.abs(v)%60,4),S:["th","st","nd","rd"][c%10>3?0:(c%100-c%10!=10)*c%10]};return i.replace(e,function(e){return e in y?y[e]:e.slice(1,e.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.format=function(e,t){return dateFormat(this,e,t)},function(e,t,n,o){e.fn.doubleTapToGo=function(o){return!!("ontouchstart"in t||navigator.msMaxTouchPoints||navigator.userAgent.toLowerCase().match(/windows phone os 7/i))&&(this.each(function(){var t=!1;e(this).on("click",function(n){var o=e(this);o[0]!=t[0]&&(n.preventDefault(),t=o)}),e(n).on("click touchstart MSPointerDown",function(n){for(var o=!0,a=e(n.target).parents(),i=0;i<a.length;i++)a[i]==t[0]&&(o=!1);o&&(t=!1)})}),this)}}(jQuery,window,document),$.fn.fsFeedPull=function(e,t,n,o){targetClass=this;var a=$(targetClass),i="https://www.juicer.io/api/feeds/"+e,r={per:t,page:1,filter:o},l=$.extend({feedTemplate:""},n),s={slide:l.feedTemplate.join("\n")};$.getJSON(i,r,function(e){$.each(e.posts.items,function(t,n){var o=jQuery.timeago(e.posts.items[t].external_created_at),i=dateFormat(e.posts.items[t].external_created_at,"mmm dd");a.append(nano(s.slide,{imgSrc:e.posts.items[t].image,likeCount:e.posts.items[t].like_count,feedDesc:e.posts.items[t].message,fullURL:e.posts.items[t].full_url,dateCreated:o,dateCreatedFB:i}))})}).done(function(){n.callback()}).fail(function(){a.append("<span>Falied to load feeds</span>").css("textAlign","center")})},$.fn.mediaSlider=function(e){slideshowClass=this;var t,n,o=600,a=$(slideshowClass).find(".fsMediaCustomPlayer"),i=a.attr("data-playlisturl"),r=$.extend({mediaTemplate:""},e),l={slide:r.mediaTemplate.join("\n")};a.data("display_loaded",!1),$.getJSON(i,function(e){var i;$(window).width()>o?t="full":(t="mobile",$(window).on("resize",function(){var e=$(this).width();e>o&&!a.data("display_loaded")&&!i&&($(window).data("display_loaded",!0),i=!0,a.find("article").each(function(){var e=$(this).find("img").attr("src").replace("/mobile/","/fullsize/");$(this).find("img").attr("src",e),$(this).attr("style",'background-image: url("'+e+'");')}))})),$.each(e.objects,function(o,i){n="full"===t?e.objects[o].full_path:e.objects[o].mobile_path,a.append(nano(l.slide,{imgSrc:n,captionTitle:e.objects[o].object_title,captionDesc:e.objects[o].object_description}))})}).done(function(){e.callback()}).fail(function(){a.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign","center")})},function(e){"use strict";e.fn.fitVids=function(t){var n={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var o=document.head||document.getElementsByTagName("head")[0],a=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",i=document.createElement("div");i.innerHTML='<p>x</p><style id="fit-vids-style">'+a+"</style>",o.appendChild(i.childNodes[1])}return t&&e.extend(n,t),this.each(function(){var t=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];n.customSelector&&t.push(n.customSelector);var o=".fitvidsignore";n.ignore&&(o=o+", "+n.ignore);var a=e(this).find(t.join(","));a=a.not("object object"),a=a.not(o),a.each(function(){var t=e(this);if(!(t.parents(o).length>0||"embed"===this.tagName.toLowerCase()&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)){t.css("height")||t.css("width")||!isNaN(t.attr("height"))&&!isNaN(t.attr("width"))||(t.attr("height",9),t.attr("width",16));var n="object"===this.tagName.toLowerCase()||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height(),a=isNaN(parseInt(t.attr("width"),10))?t.width():parseInt(t.attr("width"),10),i=n/a;if(!t.attr("name")){var r="fitvid"+e.fn.fitVids._count;t.attr("name",r),e.fn.fitVids._count++}t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),t.removeAttr("height").removeAttr("width")}})})},e.fn.fitVids._count=0}(window.jQuery||window.Zepto),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var n="function"==typeof define&&define.amd,o="undefined"!=typeof module&&module.exports,a="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";n||(o?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+a+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,n="mCustomScrollbar",o="mCS",a=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),n=f.call(this);if(t.live){var s=t.liveSelector||this.selector||a,c=e(s);if("off"===t.live)return void h(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&h(s)},500)}else h(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),m(t),e(n).each(function(){var n=e(this);if(!n.data(o)){n.data(o,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:n.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var a=n.data(o),i=a.opt,l=n.data("mcs-axis"),s=n.data("mcs-scrollbar-position"),c=n.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,m(i)),v.call(this),a&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+a.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,n)}})},update:function(t,n){var a=t||f.call(this);return e(a).each(function(){var t=e(this);if(t.data(o)){var a=t.data(o),i=a.opt,r=e("#mCSB_"+a.idx+"_container"),l=e("#mCSB_"+a.idx),s=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")];if(!r.length)return;a.tweenRunning&&J(t),n&&a&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),w.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",y(r)),a.overflowed=C.call(this),k.call(this),i.autoDraggerLength&&b.call(this),S.call(this),B.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(a.overflowed[0]?s[0].height()>s[0].parent().height()?T.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),a.contentReset.y=null):(T.call(this),"y"===i.axis?M.call(this):"yx"===i.axis&&a.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(a.overflowed[1]?s[1].width()>s[1].parent().width()?T.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),a.contentReset.x=null):(T.call(this),"x"===i.axis?M.call(this):"yx"===i.axis&&a.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),n&&a&&(2===n&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===n&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,n){if("undefined"!=typeof t&&null!=t){var a=f.call(this);return e(a).each(function(){var a=e(this);if(a.data(o)){var i=a.data(o),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,n),c=U.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=q.call(this,c[0],"y"),c[1]=q.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ae()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(a,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(a,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(o)&&J(t)})},disable:function(t){var n=f.call(this);return e(n).each(function(){var n=e(this);n.data(o)&&(n.data(o),X.call(this,"remove"),M.call(this),t&&T.call(this),k.call(this,!0),n.addClass(d[3]))})},destroy:function(){var t=f.call(this);return e(t).each(function(){var a=e(this);if(a.data(o)){var i=a.data(o),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&h(r.liveSelector||e(t).selector),X.call(this,"remove"),M.call(this),T.call(this),a.removeData(o),K(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),a.removeClass(n+" _"+o+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?a:this},m=function(t){var n=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],o=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],a=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=!(e.inArray(t.theme,n)>-1)&&t.autoDraggerLength,t.autoExpandScrollbar=!(e.inArray(t.theme,o)>-1)&&t.autoExpandScrollbar,t.scrollButtons.enable=!(e.inArray(t.theme,a)>-1)&&t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1||t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},h=function(e){l[e]&&(clearTimeout(l[e]),K(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),a=t.data(o),i=a.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+a.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+a.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+a.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+a.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+a.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+a.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+a.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",m="x"!==i.axis&&"rtl"===a.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===a.langDir?"989999px":i.setLeft,t.addClass(n+" _"+o+"_"+a.idx+f+m).wrapInner("<div id='mCSB_"+a.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+a.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+a.langDir+"' /></div>");var h=e("#mCSB_"+a.idx),p=e("#mCSB_"+a.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",y(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),h.addClass("mCSB_outside").after(c)):(h.addClass("mCSB_inside").append(c),p.wrap(u)),x.call(this);var g=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},y=function(t){var n=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],o=t.parent().width();return n[0]>o?n[0]:n[1]>o?n[1]:"100%"},w=function(){var t=e(this),n=t.data(o),a=n.opt,i=e("#mCSB_"+n.idx+"_container");if(a.advanced.autoExpandHorizontalScroll&&"y"!==a.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===a.advanced.autoExpandHorizontalScroll||2!==a.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},x=function(){var t=e(this),n=t.data(o),a=n.opt,i=e(".mCSB_"+n.idx+"_scrollbar:first"),r=ne(a.scrollButtons.tabindex)?"tabindex='"+a.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===a.axis?l[2]:l[0],"x"===a.axis?l[3]:l[1],l[2],l[3]];a.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},b=function(){var t=e(this),n=t.data(o),a=e("#mCSB_"+n.idx),i=e("#mCSB_"+n.idx+"_container"),r=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],l=[a.height()/i.outerHeight(!1),a.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},S=function(){var t=e(this),n=t.data(o),a=e("#mCSB_"+n.idx),i=e("#mCSB_"+n.idx+"_container"),r=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-a.height(),i.outerWidth(!1)-a.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];n.scrollRatio={y:s[0],x:s[1]}},_=function(e,t,n){var o=n?d[0]+"_expanded":"",a=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+o),a.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),a.removeClass(d[1])):(e.addClass(d[0]),a.addClass(d[1])))},C=function(){var t=e(this),n=t.data(o),a=e("#mCSB_"+n.idx),i=e("#mCSB_"+n.idx+"_container"),r=null==n.overflowed?i.height():i.outerHeight(!1),l=null==n.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>a.height(),l>a.width()]},T=function(){var t=e(this),n=t.data(o),a=n.opt,i=e("#mCSB_"+n.idx),r=e("#mCSB_"+n.idx+"_container"),l=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(J(t),("x"!==a.axis&&!n.overflowed[0]||"y"===a.axis&&n.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==a.axis&&!n.overflowed[1]||"x"===a.axis&&n.overflowed[1]){var s=dx=0;"rtl"===n.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/n.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},B=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),A.call(n[0])):t()},100)}var n=e(this),a=n.data(o),i=a.opt;if(!a.bindEvents){if(D.call(this),i.contentTouchScroll&&O.call(this),I.call(this),i.mouseWheel.enable){var r;t()}N.call(this),R.call(this),i.advanced.autoScrollOnFocus&&F.call(this),i.scrollButtons.enable&&z.call(this),i.keyboard.enable&&H.call(this),a.bindEvents=!0}},M=function(){var t=e(this),n=t.data(o),a=n.opt,i=o+"_"+n.idx,r=".mCSB_"+n.idx+"_scrollbar",l=e("#mCSB_"+n.idx+",#mCSB_"+n.idx+"_container,#mCSB_"+n.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+n.idx+"_dragger_vertical,#mCSB_"+n.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+n.idx+"_container");a.advanced.releaseDraggableSelectors&&l.add(e(a.advanced.releaseDraggableSelectors)),a.advanced.extraDraggableSelectors&&l.add(e(a.advanced.extraDraggableSelectors)),n.bindEvents&&(e(document).add(e(!j()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),K(t[0],"_focusTimeout"),clearTimeout(n.sequential.step),K(n.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),K(s[0],"onCompleteTimeout"),n.bindEvents=!1)},k=function(t){var n=e(this),a=n.data(o),i=a.opt,r=e("#mCSB_"+a.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+a.idx+"_container"),s=[e("#mCSB_"+a.idx+"_scrollbar_vertical"),e("#mCSB_"+a.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(a.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(a.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),a.overflowed[0]||a.overflowed[1]?n.removeClass(d[5]):n.addClass(d[5])},E=function(t){var n=t.type,o=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,a=j()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(n){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return o?[t.originalEvent.pageY-o[0]+a[0],t.originalEvent.pageX-o[1]+a[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return o?[t.pageY-o[0]+a[0],t.pageX-o[1]+a[1],!1]:[t.pageY,t.pageX,!1]}},D=function(){function t(e,t,o,a){if(m[0].idleTimer=d.scrollInertia<233?250:0,n.attr("id")===f[1])var i="x",s=(n[0].offsetLeft-t+a)*l.scrollRatio.x;else var i="y",s=(n[0].offsetTop-e+o)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var n,a,i,r=e(this),l=r.data(o),d=l.opt,u=o+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],m=e("#mCSB_"+l.idx+"_container"),h=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?h.add(e(d.advanced.releaseDraggableSelectors)):h,g=d.advanced.extraDraggableSelectors?e(!j()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!j()||top.document);h.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(m,!1),J(r),n=e(this);var o=n.offset(),l=E(t)[0]-o.top,u=E(t)[1]-o.left,f=n.height()+o.top,h=n.width()+o.left;f>l&&l>0&&h>u&&u>0&&(a=l,i=u),_(n,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var o=n.offset(),r=E(e)[0]-o.top,l=E(e)[1]-o.left;t(a,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(n){var o=n.offset(),r=E(e)[0]-o.top,l=E(e)[1]-o.left;if(a===r&&i===l)return;t(a,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){n&&(_(n,"active",d.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),L.call(m,!0)})},O=function(){function n(e){if(!te(e)||c||E(e)[2])return void(t=0);t=1,S=0,_=0,d=1,C.removeClass("mCS_touch_action");var n=D.offset();u=E(e)[0]-n.top,f=E(e)[1]-n.left,W=[E(e)[0],E(e)[1]]}function a(e){if(te(e)&&!c&&!E(e)[2]&&(B.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!_||S)&&d)){g=Q();var t=k.offset(),n=E(e)[0]-t.top,o=E(e)[1]-t.left,a="mcsLinearOut";if(I.push(n),A.push(o),W[2]=Math.abs(E(e)[0]-W[0]),W[3]=Math.abs(E(e)[1]-W[1]),T.overflowed[0])var i=O[0].parent().height()-O[0].height(),r=u-n>0&&n-u>-(i*T.scrollRatio.y)&&(2*W[3]<W[2]||"yx"===B.axis);if(T.overflowed[1])var l=O[1].parent().width()-O[1].width(),m=f-o>0&&o-f>-(l*T.scrollRatio.x)&&(2*W[2]<W[3]||"yx"===B.axis);r||m?(R||e.preventDefault(),S=1):(_=1,C.addClass("mCS_touch_action")),R&&e.preventDefault(),x="yx"===B.axis?[u-n,f-o]:"x"===B.axis?[null,f-o]:[u-n,null],D[0].idleTimer=250,T.overflowed[0]&&s(x[0],P,a,"y","all",!0),T.overflowed[1]&&s(x[1],P,a,"x",L,!0)}}function i(e){if(!te(e)||c||E(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),J(C),p=Q();var n=k.offset();m=E(e)[0]-n.top,h=E(e)[1]-n.left,I=[],A=[]}function r(e){if(te(e)&&!c&&!E(e)[2]){d=0,e.stopImmediatePropagation(),S=0,_=0,v=Q();var t=k.offset(),n=E(e)[0]-t.top,o=E(e)[1]-t.left;if(!(v-g>30)){w=1e3/(v-p);var a="mcsEaseOut",i=2.5>w,r=i?[I[I.length-2],A[A.length-2]]:[0,0];y=i?[n-r[0],o-r[1]]:[n-m,o-h];var u=[Math.abs(y[0]),Math.abs(y[1])];w=i?[Math.abs(y[0]/4),Math.abs(y[1]/4)]:[w,w];var f=[Math.abs(D[0].offsetTop)-y[0]*l(u[0]/w[0],w[0]),Math.abs(D[0].offsetLeft)-y[1]*l(u[1]/w[1],w[1])];x="yx"===B.axis?[f[0],f[1]]:"x"===B.axis?[null,f[1]]:[f[0],null],b=[4*u[0]+B.scrollInertia,4*u[1]+B.scrollInertia];var C=parseInt(B.contentTouchScroll)||0;x[0]=u[0]>C?x[0]:0,x[1]=u[1]>C?x[1]:0,T.overflowed[0]&&s(x[0],b[0],a,"y",L,!1),T.overflowed[1]&&s(x[1],b[1],a,"x",L,!1)}}}function l(e,t){var n=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?n[0]:n[3]:e>60?t>3?n[3]:n[2]:e>30?t>8?n[1]:t>6?n[0]:t>4?t:n[2]:t>8?t:n[3]}function s(e,t,n,o,a,i){e&&G(C,e.toString(),{dur:t,scrollEasing:n,dir:o,overwrite:a,drag:i})}var d,u,f,m,h,p,g,v,y,w,x,b,S,_,C=e(this),T=C.data(o),B=T.opt,M=o+"_"+T.idx,k=e("#mCSB_"+T.idx),D=e("#mCSB_"+T.idx+"_container"),O=[e("#mCSB_"+T.idx+"_dragger_vertical"),e("#mCSB_"+T.idx+"_dragger_horizontal")],I=[],A=[],P=0,L="yx"===B.axis?"none":"all",W=[],N=D.find("iframe"),F=["touchstart."+M+" pointerdown."+M+" MSPointerDown."+M,"touchmove."+M+" pointermove."+M+" MSPointerMove."+M,"touchend."+M+" pointerup."+M+" MSPointerUp."+M],R=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;D.bind(F[0],function(e){n(e)}).bind(F[1],function(e){a(e)}),k.bind(F[0],function(e){i(e)}).bind(F[2],function(e){r(e)}),N.length&&N.each(function(){e(this).bind("load",function(){j(this)&&e(this.contentDocument||this.contentWindow.document).bind(F[0],function(e){n(e),i(e)}).bind(F[1],function(e){a(e)}).bind(F[2],function(e){r(e)})})})},I=function(){function n(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function a(e,t,n){d.type=n&&i?"stepped":"stepless",d.scrollAmount=10,$(r,e,t,"mcsLinearOut",n?60:null)}var i,r=e(this),l=r.data(o),s=l.opt,d=l.sequential,u=o+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),m=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&n()){var o=f.offset(),r=E(e)[0]-o.top+f[0].offsetTop,c=E(e)[1]-o.left+f[0].offsetLeft;r>0&&r<m.height()&&c>0&&c<m.width()?d.step&&a("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?a("on",38):r>m.height()&&a("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?a("on",37):c>m.width()&&a("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,a("off",null)),c=!1)})},A=function(){function t(t,o){if(J(n),!W(n,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*a.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],m="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],h=Math.abs(e("#mCSB_"+a.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||o:t.deltaX;else var u="y",f=[Math.round(r*a.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],m="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],h=Math.abs(e("#mCSB_"+a.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||o;"y"===u&&!a.overflowed[0]||"x"===u&&!a.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(m=t.deltaFactor,d=17),G(n,(h-v*m).toString(),{dir:u,dur:d}))}}if(e(this).data(o)){var n=e(this),a=n.data(o),i=a.opt,r=o+"_"+a.idx,l=e("#mCSB_"+a.idx),c=[e("#mCSB_"+a.idx+"_dragger_vertical"),e("#mCSB_"+a.idx+"_dragger_horizontal")],d=e("#mCSB_"+a.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){j(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,n){t(e,n)})})}),l.bind("mousewheel."+r,function(e,n){t(e,n)})}},P=new Object,j=function(t){var n=!1,o=!1,a=null;if(void 0===t?o="#empty":void 0!==e(t).attr("id")&&(o=e(t).attr("id")),o!==!1&&void 0!==P[o])return P[o];if(t){try{var i=t.contentDocument||t.contentWindow.document;a=i.body.innerHTML}catch(r){}n=null!==a}else{try{var i=top.document;a=i.body.innerHTML}catch(r){}n=null!==a}return o!==!1&&(P[o]=n),n},L=function(e){var t=this.find("iframe");if(t.length){var n=e?"auto":"none";t.css("pointer-events",n)}},W=function(t,n){var a=n.nodeName.toLowerCase(),i=t.data(o).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(a,i)>-1&&!(e.inArray(a,r)>-1&&!e(n).is(":focus"))},N=function(){var t,n=e(this),a=n.data(o),i=o+"_"+a.idx,r=e("#mCSB_"+a.idx+"_container"),l=r.parent(),s=e(".mCSB_"+a.idx+"_scrollbar ."+d[12]);
s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(n){c=!0,e(n.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(o){if(t&&(t=0,e(o.target).hasClass(d[12])||e(o.target).hasClass("mCSB_draggerRail"))){J(n);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!a.overflowed[1])return;var c="x",u=o.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!a.overflowed[0])return;var c="y",u=o.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(n,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},F=function(){var t=e(this),n=t.data(o),a=n.opt,i=o+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var n=e(document.activeElement),o=r.find(".mCustomScrollBox").length,i=0;n.is(a.advanced.autoScrollOnFocus)&&(J(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=o?(i+17)*o:0,t[0]._focusTimeout=setTimeout(function(){var e=[oe(n)[0],oe(n)[1]],o=[r[0].offsetTop,r[0].offsetLeft],s=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-n.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-n.outerWidth(!1)],c="yx"!==a.axis||s[0]||s[1]?"all":"none";"x"===a.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===a.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},R=function(){var t=e(this),n=t.data(o),a=o+"_"+n.idx,i=e("#mCSB_"+n.idx+"_container").parent();i.bind("scroll."+a,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+n.idx+"_scrollbar").css("visibility","hidden")})},z=function(){var t=e(this),n=t.data(o),a=n.opt,i=n.sequential,r=o+"_"+n.idx,l=".mCSB_"+n.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(o){function r(e,n){i.scrollAmount=a.scrollButtons.scrollAmount,$(t,e,n)}if(o.preventDefault(),ee(o)){var l=e(this).attr("class");switch(i.type=a.scrollButtons.scrollType,o.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,n.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||n.tweenRunning)return;r("on",l)}}})},H=function(){function t(t){function o(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&a.tweenRunning||$(n,e,t)}switch(t.type){case"blur":a.tweenRunning&&r.dir&&o("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!a.overflowed[0]||(37===l||39===l)&&!a.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),o(s,l))}else if(33===l||34===l){if((a.overflowed[0]||a.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){J(n);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&a.overflowed[1]&&!a.overflowed[0])var m="x",h=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var m="y",h=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(n,h.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((a.overflowed[0]||a.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&a.overflowed[1]&&!a.overflowed[0])var m="x",h=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var m="y",h=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(n,h.toString(),{dir:m,scrollEasing:"mcsEaseInOut"})}}}var n=e(this),a=n.data(o),i=a.opt,r=a.sequential,l=o+"_"+a.idx,s=e("#mCSB_"+a.idx),c=e("#mCSB_"+a.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),m=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){j(this)&&e(this.contentDocument||this.contentWindow.document).bind(m[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(m[0],function(e){t(e)})},$=function(t,n,a,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var n="stepped"!==f.type,o=r?r:e?n?p/1.5:g:1e3/60,a=e?n?7.5:40:2.5,s=[Math.abs(m[0].offsetTop),Math.abs(m[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],h="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*a):s[0]+f.dir[1]*(d[0]*a),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),y="auto"!==f.scrollAmount?v:h,w=i?i:e?n?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",x=!!e;return e&&17>o&&(y="x"===f.dir[0]?s[1]:s[0]),G(t,y.toString(),{dir:f.dir[0],scrollEasing:w,dur:o,onComplete:x}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},o)))}function s(){clearTimeout(f.step),K(f,"step"),J(t)}var c=t.data(o),u=c.opt,f=c.sequential,m=e("#mCSB_"+c.idx+"_container"),h="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(n){case"on":if(f.dir=[a===d[16]||a===d[15]||39===a||37===a?"x":"y",a===d[13]||a===d[15]||38===a||37===a?-1:1],J(t),ne(a)&&"stepped"===f.type)return;l(h);break;case"off":s(),(h||c.tweenRunning&&f.dir)&&l(!0)}},U=function(t){var n=e(this).data(o).opt,a=[];return"function"==typeof t&&(t=t()),t instanceof Array?a=t.length>1?[t[0],t[1]]:"x"===n.axis?[null,t[0]]:[t[0],null]:(a[0]=t.y?t.y:t.x||"x"===n.axis?null:t,a[1]=t.x?t.x:t.y||"y"===n.axis?null:t),"function"==typeof a[0]&&(a[0]=a[0]()),"function"==typeof a[1]&&(a[1]=a[1]()),a},q=function(t,n){if(null!=t&&"undefined"!=typeof t){var a=e(this),i=a.data(o),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;n||(n="x"===r.axis?"x":"y");var d="x"===n?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===n?l[0].offsetLeft:l[0].offsetTop,m="x"===n?"left":"top";switch(c){case"function":return t();case"object":var h=t.jquery?t:e(t);if(!h.length)return;return"x"===n?oe(h)[1]:oe(h)[0];case"string":case"number":if(ne(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&ne(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var h=l.find(":"+t);return"x"===n?oe(h)[1]:oe(h)[0]}return e(t).length?"x"===n?oe(e(t))[1]:oe(e(t))[0]:(l.css(m,t),void u.update.call(null,a[0]))}}},X=function(t){function n(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&n()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){a(this)}))},c.advanced.autoUpdateTimeout))}function a(t){function n(e,t){return function(){return t.apply(e,arguments)}}function o(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var a=new Image;a.onload=n(a,o),a.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(o),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void K(f[0],"autoUpdate")):void n()},Y=function(e,t,n){return Math.round(e/t)*t-n},J=function(t){var n=t.data(o),a=e("#mCSB_"+n.idx+"_container,#mCSB_"+n.idx+"_container_wrapper,#mCSB_"+n.idx+"_dragger_vertical,#mCSB_"+n.idx+"_dragger_horizontal");a.each(function(){Z.call(this)})},G=function(t,n,a){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||x>=b[0]+C,c.callbacks.alwaysTriggerOffsets||-T>=x]}function l(){var e=[m[0].offsetTop,m[0].offsetLeft],n=[y[0].offsetTop,y[0].offsetLeft],o=[m.outerHeight(!1),m.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:m,top:e[0],left:e[1],draggerTop:n[0],draggerLeft:n[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(o[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(o[1])-i[1])),direction:a.dir}}var s=t.data(o),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},a=e.extend(d,a),u=[a.dur,a.drag?0:a.dur],f=e("#mCSB_"+s.idx),m=e("#mCSB_"+s.idx+"_container"),h=m.parent(),p=c.callbacks.onTotalScrollOffset?U.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?U.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=a.trigger,0===h.scrollTop()&&0===h.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),h.scrollTop(0).scrollLeft(0)),"_resetY"!==n||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==n||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==n&&"_resetX"!==n){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===a.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;n=Y(n,v,c.snapOffset)}switch(a.dir){case"x":var y=e("#mCSB_"+s.idx+"_dragger_horizontal"),w="left",x=m[0].offsetLeft,b=[f.width()-m.outerWidth(!1),y.parent().width()-y.width()],S=[n,0===n?0:n/s.scrollRatio.x],C=p[1],T=g[1],B=C>0?C/s.scrollRatio.x:0,M=T>0?T/s.scrollRatio.x:0;break;case"y":var y=e("#mCSB_"+s.idx+"_dragger_vertical"),w="top",x=m[0].offsetTop,b=[f.height()-m.outerHeight(!1),y.parent().height()-y.height()],S=[n,0===n?0:n/s.scrollRatio.y],C=p[0],T=g[0],B=C>0?C/s.scrollRatio.y:0,M=T>0?T/s.scrollRatio.y:0}S[1]<0||0===S[0]&&0===S[1]?S=[0,0]:S[1]>=b[1]?S=[b[0],b[1]]:S[0]=-S[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(m[0].onCompleteTimeout),V(y[0],w,Math.round(S[1]),u[1],a.scrollEasing),!s.tweenRunning&&(0===x&&S[0]>=0||x===b[0]&&S[0]<=b[0])||V(m[0],w,Math.round(S[0]),u[0],a.scrollEasing,a.overwrite,{onStart:function(){a.callbacks&&a.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,_(y),s.cbOffsets=r())},onUpdate:function(){a.callbacks&&a.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(a.callbacks&&a.onComplete){"yx"===c.axis&&clearTimeout(m[0].onCompleteTimeout);var e=m[0].idleTimer||0;m[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&S[1]>=b[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&S[1]<=M&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,m[0].idleTimer=0,_(y,"hide")},e)}}})}},V=function(e,t,n,o,a,i,r){function l(){b.stop||(y||h.call(),y=Q()-v,s(),y>=b.time&&(b.time=y>b.time?y+f-(y-b.time):y+f-1,b.time<y+1&&(b.time=y+1)),b.time<o?b.id=m(l):g.call())}function s(){o>0?(b.currVal=u(b.time,w,S,o,a),x[t]=Math.round(b.currVal)+"px"):x[t]=n+"px",p.call()}function c(){f=1e3/60,b.time=y+f,m=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},b.id=m(l)}function d(){null!=b.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(b.id):clearTimeout(b.id),b.id=null)}function u(e,t,n,o,a){switch(a){case"linear":case"mcsLinear":return n*e/o+t;case"mcsLinearOut":return e/=o,e--,n*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=o/2,1>e?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=o/2,1>e?n/2*Math.pow(2,10*(e-1))+t:(e--,n/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=o/2,1>e?n/2*e*e*e+t:(e-=2,n/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=o,e--,-n*(e*e*e*e-1)+t;case"easeOutStrong":return n*(-Math.pow(2,-10*e/o)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=o)*e,r=i*e;return t+n*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,m,r=r||{},h=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=Q(),y=0,w=e.offsetTop,x=e.style,b=e._mTween[t];"left"===t&&(w=e.offsetLeft);var S=n-w;b.stop=0,"none"!==i&&d(),c()},Q=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],n=0;n<t.length;n++){var o=t[n];e._mTween[o].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[o].id):clearTimeout(e._mTween[o].id),e._mTween[o].id=null,e._mTween[o].stop=1)}},K=function(e,t){try{delete e[t]}catch(n){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ne=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},oe=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ae=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return!!t&&document[t]};e.fn[n]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[n]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[n].defaults=i,window[n]=!0,e(window).bind("load",function(){e(a)[n](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var n,o,a=e(t),i=a.parents(".mCSB_container");if(i.length)return n=i.parent(),o=[i[0].offsetTop,i[0].offsetLeft],o[0]+oe(a)[0]>=0&&o[0]+oe(a)[0]<n.height()-a.outerHeight(!1)&&o[1]+oe(a)[1]>=0&&o[1]+oe(a)[1]<n.width()-a.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,n,o){var a,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===o[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return a=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+oe(s)[0],c[0].offsetLeft+oe(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[a[0]<i[0]?d[0]:d[1],a[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+a[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+a[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var n=e(t).data(o);if(n)return n.overflowed[0]||n.overflowed[1]}})})})}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof module&&"object"==typeof module.exports?require("jquery"):jQuery)}(function(e){function t(){var t=i.settings;if(t.autoDispose&&!e.contains(document.documentElement,this))return e(this).timeago("dispose"),this;var r=n(this);return isNaN(r.datetime)||(0===t.cutoff||Math.abs(a(r.datetime))<t.cutoff?e(this).text(o(r.datetime)):e(this).attr("title").length>0&&e(this).text(e(this).attr("title"))),this}function n(t){if(t=e(t),!t.data("timeago")){t.data("timeago",{datetime:i.datetime(t)});var n=e.trim(t.text());i.settings.localeTitle?t.attr("title",t.data("timeago").datetime.toLocaleString()):!(n.length>0)||i.isTime(t)&&t.attr("title")||t.attr("title",n)}return t.data("timeago")}function o(e){return i.inWords(a(e))}function a(e){return(new Date).getTime()-e.getTime()}e.timeago=function(t){return o(t instanceof Date?t:"string"==typeof t?e.timeago.parse(t):"number"==typeof t?new Date(t):e.timeago.datetime(t))};var i=e.timeago;e.extend(e.timeago,{settings:{refreshMillis:6e4,allowPast:!0,allowFuture:!1,localeTitle:!1,cutoff:0,autoDispose:!0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"",suffixFromNow:"from now",inPast:"any moment now",seconds:"1 m",minute:"1 min",minutes:"%d min",hour:"1h",hours:"%d h",day:"1d",days:"%d d",month:"1m",months:"%d m",year:"1 y",years:"%d ",wordSeparator:" ",numbers:[]}},inWords:function(t){function n(n,a){var i=e.isFunction(n)?n(a,t):n,r=o.numbers&&o.numbers[a]||a;return i.replace(/%d/i,r)}if(!this.settings.allowPast&&!this.settings.allowFuture)throw"timeago allowPast and allowFuture settings can not both be set to false.";var o=this.settings.strings,a=o.prefixAgo,i=o.suffixAgo;if(this.settings.allowFuture&&t<0&&(a=o.prefixFromNow,i=o.suffixFromNow),!this.settings.allowPast&&t>=0)return this.settings.strings.inPast;var r=Math.abs(t)/1e3,l=r/60,s=l/60,c=s/24,d=c/365,u=r<45&&n(o.seconds,Math.round(r))||r<90&&n(o.minute,1)||l<45&&n(o.minutes,Math.round(l))||l<90&&n(o.hour,1)||s<24&&n(o.hours,Math.round(s))||s<42&&n(o.day,1)||c<30&&n(o.days,Math.round(c))||c<45&&n(o.month,1)||c<365&&n(o.months,Math.round(c/30))||d<1.5&&n(o.year,1)||n(o.years,Math.round(d)),f=o.wordSeparator||"";return void 0===o.wordSeparator&&(f=" "),e.trim([a,u,i].join(f))},parse:function(t){var n=e.trim(t);return n=n.replace(/\.\d+/,""),n=n.replace(/-/,"/").replace(/-/,"/"),n=n.replace(/T/," ").replace(/Z/," UTC"),n=n.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),n=n.replace(/([\+\-]\d\d)$/," $100"),new Date(n)},datetime:function(t){var n=i.isTime(t)?e(t).attr("datetime"):e(t).attr("title");return i.parse(n)},isTime:function(t){return"time"===e(t).get(0).tagName.toLowerCase()}});var r={init:function(){var n=e.proxy(t,this);n();var o=i.settings;o.refreshMillis>0&&(this._timeagoInterval=setInterval(n,o.refreshMillis))},update:function(n){var o=n instanceof Date?n:i.parse(n);e(this).data("timeago",{datetime:o}),i.settings.localeTitle&&e(this).attr("title",o.toLocaleString()),t.apply(this)},updateFromDOM:function(){e(this).data("timeago",{datetime:i.parse(i.isTime(this)?e(this).attr("datetime"):e(this).attr("title"))}),t.apply(this)},dispose:function(){this._timeagoInterval&&(window.clearInterval(this._timeagoInterval),this._timeagoInterval=null)}};e.fn.timeago=function(e,t){var n=e?r[e]:r.init;if(!n)throw new Error("Unknown function name '"+e+"' for timeago");return this.each(function(){n.call(this,t)}),this},document.createElement("abbr"),document.createElement("time")}),window.Modernizr=function(e,t,n){function o(e){y.cssText=e}function a(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function r(e,t){for(var o in e){var a=e[o];if(!i(a,"-")&&y[a]!==n)return"pfx"!=t||a}return!1}function l(e,t,o){for(var i in e){var r=t[e[i]];if(r!==n)return o===!1?e[i]:a(r,"function")?r.bind(o||t):r}return!1}function s(e,t,n){var o=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+S.join(o+" ")+o).split(" ");return a(t,"string")||a(t,"undefined")?r(i,t):(i=(e+" "+_.join(o+" ")+o).split(" "),l(i,t,n))}var c,d,u,f="2.8.3",m={},h=!0,p=t.documentElement,g="modernizr",v=t.createElement(g),y=v.style,w={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),b="Webkit Moz O ms",S=b.split(" "),_=b.toLowerCase().split(" "),C={svg:"http://www.w3.org/2000/svg"},T={},B=[],M=B.slice,k=function(e,n,o,a){var i,r,l,s,c=t.createElement("div"),d=t.body,u=d||t.createElement("body");if(parseInt(o,10))for(;o--;)l=t.createElement("div"),l.id=a?a[o]:g+(o+1),c.appendChild(l);return i=["&#173;",'<style id="s',g,'">',e,"</style>"].join(""),c.id=g,(d?c:u).innerHTML+=i,u.appendChild(c),d||(u.style.background="",u.style.overflow="hidden",s=p.style.overflow,p.style.overflow="hidden",p.appendChild(u)),r=n(c,e),d?c.parentNode.removeChild(c):(u.parentNode.removeChild(u),p.style.overflow=s),!!r},E=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var o;return k("@media "+t+" { #"+g+" { position: absolute; } }",function(t){o="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),o},D={}.hasOwnProperty;u=a(D,"undefined")||a(D.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return D.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=M.call(arguments,1),o=function(){if(this instanceof o){var a=function(){};a.prototype=t.prototype;var i=new a,r=t.apply(i,n.concat(M.call(arguments)));return Object(r)===r?r:i}return t.apply(e,n.concat(M.call(arguments)))};return o}),T.flexbox=function(){return s("flexWrap")},T.flexboxlegacy=function(){return s("boxDirection")},T.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:k(["@media (",x.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},T.cssanimations=function(){return s("animationName")},T.csscolumns=function(){return s("columnCount")},T.csstransforms=function(){return!!s("transform")},T.csstransforms3d=function(){var e=!!s("perspective");return e&&"webkitPerspective"in p.style&&k("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},T.csstransitions=function(){return s("transition")},T.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(o){}return n},T.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(o){}return n},T.svg=function(){return!!t.createElementNS&&!!t.createElementNS(C.svg,"svg").createSVGRect},T.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==C.svg},T.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(w.call(t.createElementNS(C.svg,"clipPath")))};for(var O in T)u(T,O)&&(d=O.toLowerCase(),m[d]=T[O](),B.push((m[d]?"":"no-")+d));return m.addTest=function(e,t){if("object"==typeof e)for(var o in e)u(e,o)&&m.addTest(o,e[o]);else{if(e=e.toLowerCase(),m[e]!==n)return m;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(p.className+=" "+(t?"":"no-")+e),m[e]=t}return m},o(""),v=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),o=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",o.insertBefore(n.lastChild,o.firstChild)}function o(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function a(e){var t=v[e[p]];return t||(t={},g++,e[p]=g,v[g]=t),t}function i(e,n,o){if(n||(n=t),d)return n.createElement(e);o||(o=a(n));var i;return i=o.cache[e]?o.cache[e].cloneNode():h.test(e)?(o.cache[e]=o.createElem(e)).cloneNode():o.createElem(e),!i.canHaveChildren||m.test(e)||i.tagUrn?i:o.frag.appendChild(i)}function r(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||a(e);for(var i=n.frag.cloneNode(),r=0,l=o(),s=l.length;r<s;r++)i.createElement(l[r]);return i}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+o().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function s(e){e||(e=t);var o=a(e);return y.shivCSS&&!c&&!o.hasCSS&&(o.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,o),e}var c,d,u="3.7.0",f=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p="_html5shiv",g=0,v={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,d=!0}}();var y={elements:f.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:u,shivCSS:f.shivCSS!==!1,supportsUnknownElements:d,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:s,createElement:i,createDocumentFragment:r};e.html5=y,s(t)}(this,t),m._version=f,m._prefixes=x,m._domPrefixes=_,m._cssomPrefixes=S,m.mq=E,m.testProp=function(e){return r([e])},m.testAllProps=s,m.testStyles=k,p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+B.join(" "):""),m}(this,this.document),function(e,t,n){function o(e){return"[object Function]"==g.call(e)}function a(e){return"string"==typeof e}function i(){}function r(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function l(){var e=v.shift();y=1,e?e.t?h(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),l()):y=0}function s(e,n,o,a,i,s,c){function d(t){if(!m&&r(u.readyState)&&(w.r=m=1,!y&&l(),u.onload=u.onreadystatechange=null,t)){"img"!=e&&h(function(){b.removeChild(u)},50);for(var o in B[n])B[n].hasOwnProperty(o)&&B[n][o].onload()}}var c=c||f.errorTimeout,u=t.createElement(e),m=0,g=0,w={t:o,s:n,e:i,a:s,x:c};1===B[n]&&(g=1,B[n]=[]),"object"==e?u.data=n:(u.src=n,u.type=e),u.width=u.height="0",u.onerror=u.onload=u.onreadystatechange=function(){d.call(this,g)},v.splice(a,0,w),"img"!=e&&(g||2===B[n]?(b.insertBefore(u,x?null:p),h(d,c)):B[n].push(u))}function c(e,t,n,o,i){return y=0,t=t||"j",a(e)?s("c"==t?_:S,e,t,this.i++,n,o,i):(v.splice(this.i++,0,e),1==v.length&&l()),this}function d(){var e=f;return e.loader={load:c,i:0},e}var u,f,m=t.documentElement,h=e.setTimeout,p=t.getElementsByTagName("script")[0],g={}.toString,v=[],y=0,w="MozAppearance"in m.style,x=w&&!!t.createRange().compareNode,b=x?m:p.parentNode,m=e.opera&&"[object Opera]"==g.call(e.opera),m=!!t.attachEvent&&!m,S=w?"object":m?"script":"img",_=m?"script":S,C=Array.isArray||function(e){return"[object Array]"==g.call(e)},T=[],B={},M={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};f=function(e){function t(e){var t,n,o,e=e.split("!"),a=T.length,i=e.pop(),r=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;n<r;n++)o=e[n].split("="),(t=M[o.shift()])&&(i=t(i,o));for(n=0;n<a;n++)i=T[n](i);return i}function r(e,a,i,r,l){var s=t(e),c=s.autoCallback;s.url.split(".").pop().split("?").shift(),s.bypass||(a&&(a=o(a)?a:a[e]||a[r]||a[e.split("/").pop().split("?")[0]]),s.instead?s.instead(e,a,i,r,l):(B[s.url]?s.noexec=!0:B[s.url]=1,i.load(s.url,s.forceCSS||!s.forceJS&&"css"==s.url.split(".").pop().split("?").shift()?"c":n,s.noexec,s.attrs,s.timeout),(o(a)||o(c))&&i.load(function(){d(),a&&a(s.origUrl,l,r),c&&c(s.origUrl,l,r),B[s.url]=2})))}function l(e,t){function n(e,n){if(e){if(a(e))n||(u=function(){var e=[].slice.call(arguments);f.apply(this,e),m()}),r(e,u,t,0,c);else if(Object(e)===e)for(s in l=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(s)&&(!n&&!--l&&(o(u)?u=function(){var e=[].slice.call(arguments);f.apply(this,e),m()}:u[s]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),m()}}(f[s])),r(e[s],u,t,s,c))}else!n&&m()}var l,s,c=!!e.test,d=e.load||e.both,u=e.callback||i,f=u,m=e.complete||i;n(c?e.yep:e.nope,!!d),d&&n(d)}var s,c,u=this.yepnope.loader;if(a(e))r(e,0,u,0);else if(C(e))for(s=0;s<e.length;s++)c=e[s],a(c)?r(c,0,u,0):C(c)?f(c):Object(c)===c&&l(c,u);else Object(e)===e&&l(e,u)},f.addPrefix=function(e,t){M[e]=t},f.addFilter=function(e){T.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",u=function(){t.removeEventListener("DOMContentLoaded",u,0),t.readyState="complete"},0)),e.yepnope=d(),e.yepnope.executeStack=l,e.yepnope.injectJs=function(e,n,o,a,s,c){var d,u,m=t.createElement("script"),a=a||f.errorTimeout;m.src=e;for(u in o)m.setAttribute(u,o[u]);n=c?l:n||i,m.onreadystatechange=m.onload=function(){!d&&r(m.readyState)&&(d=1,n(),m.onload=m.onreadystatechange=null)},h(function(){d||(d=1,n(1))},a),s?m.onload():p.parentNode.insertBefore(m,p)},e.yepnope.injectCss=function(e,n,o,a,r,s){var c,a=t.createElement("link"),n=s?l:n||i;a.href=e,a.rel="stylesheet",a.type="text/css";for(c in o)a.setAttribute(c,o[c]);r||(p.parentNode.insertBefore(a,p),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},jQuery(function(e){e("body.portal:not(.fsComposeMode)").length&&(e(".portal-hero").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-nav").clone().addClass("portal-sub-mobile").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-mobile").prepend('<div class="sub-trigger">More Pages</div>'),e(".sub-trigger").click(function(){e(this).parent().toggleClass("active")}),backgroundImage(e(".portal-news a.fsThumbnail")),backgroundImage(e(".portal-directory .fsPhoto")),e(".portal-cal footer .fsElementFooterContent").appendTo(".portal-cal > .fsElementContent > .fsListItems"),e(".portal-student-announcements").prependTo("#fsPageBody"),e(".portal-photos").insertAfter("#fsPageBodyWrapper"))}),$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e){var t=e({});e.subscribe=function(){t.on.apply(t,arguments)},e.unsubscribe=function(){t.off.apply(t,arguments)},e.publish=function(){t.trigger.apply(t,arguments)}}(jQuery);