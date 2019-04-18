 /**
 *
 * Buckingham, Browne, & Nichols - Advancement - advancement-17
 * @link https://www.bbns.org/
 * Site Template : advancement
 * Built By: Wendy D Beaulac
 * Project Manager: Laurie Murphy
 * Designer: David Decker
 * ==== Git Info ====
 * Branch Name: clients/buckingham-advancement
 * Build version: 1.23.0
 * Git Tag: Composer-Build-2.0-476-g028423c
 * Last build by: Wendy Beaulac
 *
 **/

// Build package info 
window.buildinfo = {
  buildname : 'fs-composer-build',
  ver : '1.23.0',
  template : 'advancement'
};

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
                $navSub_title.html("IN This Section");
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


            this.slideshow();
            this.homepageTextSlider();
        },

        slideshow: function() {

            // src/plugins/fsMediaPull.js
            $('.universal-slideshow').each(function() {
              var self = $(this);
              self.mediaSlider({
                mediaTemplate: [
                  '<article class="universal-slide" style="background-image: url({imgSrc});">',
                  '<div class="overlay"></div>',
                  '<div class="caption">{captionDesc}</div>',
                  '</article>'
                ],
                slick: {
                  slidesToShow:1,
                  slidesToScroll:1,
                  arrows:true,
                  dots:false
                },
                callback:function() {
                  self.find(".slick-track").attr("title","Hero Slideshow");
                }
              });
            });
        },

        homepageTextSlider : function(){

          $("body:not(.fsComposeMode) .homepage-fast-facts-container > .fsElement > .fsElementContent").slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:true,
              dots:true
          });
          $("body:not(.fsComposeMode) .homepage-fast-facts-container").find(".slick-track").attr("title","Fast Facts about our school");

        }

    };


    if (isHome) {

        HOME.init();

    }


    // ================================
    // Utility & milliseconds Functions
    // ================================

    UTIL = {

      ADA: function() {
          //ADA google translate
            var checkTranslate = setInterval(function() {
              if($("#google_translate_element select.goog-te-combo").length) {
                  clearInterval(checkTranslate);
                  if((!$("#google_translate_element select.goog-te-combo").parent()[0].length && $("#google_translate_element select.goog-te-combo").parent()[0].tagName !== "LABEL") && (!$("#google_translate_element select.goog-te-combo").prev().length || $("#google_translate_element select.goog-te-combo").prev()[0].tagName !== "LABEL")) {
                      $("#google_translate_element select.goog-te-combo").before('<label for="select-translate">Translate Website</label>');
                      $("#google_translate_element select.goog-te-combo").attr("id","select-translate");
                  }
              }
          },200);
          //ADA Menu
            if ($("body:not(.fsDraftMode)").length) {
              $("#fsHeader .nav-main .fsNavLevel1").accessibility_menu();
            }
      },
        respondSliders: function() {

            // ================================
            // Responsive Built-in sliders
            // ================================

            // the following takes care of the news/calendar slideshow option
            // and makes them responsive

            var _$targets,
            options
            ;

        _$targets = $( '.fsCalendar.fsSlideshow, .fsNews.fsSlideshow' );

        options = {
            'arrows': true,
            'mobileFirst': true,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'adaptiveHeight': true,
            'responsive': [
                {
                    'breakpoint': 600,
                    'settings': {
                        'slidesToShow': 2,
                        'slidesToScroll': 1
                    }
                },
                {
                    'breakpoint': 900,
                    'settings': {
                        'slidesToShow': 3,
                        'slidesToScroll': 1
                    }
                },
                {
                    'breakpoint': 1180,
                    'settings': {
                        'slidesToShow': 3,
                        'slidesToScroll': 1
                    }
                }
            ]
        };

        if( !_$targets.length ){ return; }

        _$targets.each( function ( index, element ){
            var checkEach = setInterval(function() {
                if(_$targets[0].classList.contains("fsCalendar")) {
                    clearInterval(checkEach);
                    _$targets.find(".slick-track").attr("title","Slideshow of calendar events");
                } else if(_$targets[0].classList.contains("fsNews")) {
                    clearInterval(checkEach);
                    _$targets.find(".slick-track").attr("title","Slideshow of news articles");
                }
            },100);
            if(!_$targets.find(".fsPager, .slick-dots").length) {
                _$targets.find("article").each(function () {
                    var $slide = $(this);
                    if ($slide.attr('aria-describedby') !== undefined) { // ignore extra/cloned slides
                        $(this).find(".fsTitle").attr('id', $slide.attr('aria-describedby'));
                    }
                });
            }
            var _$carousel = $( element ).find( '.fsElementSlideshow')
                ;

            for (var property in options ) {
                if( options.hasOwnProperty( property ) ) {
                    _$carousel
                        .slick( 'setOption', property, options[property], true );
                }
            }

        } );


        },

        //fix all Navigation related issues
        fixNav: function(){
          $(".nav-main .fsNavLevel1 > li").doubleTapToGo();
          $('<a class="mobile-nav-open">Menu</a>').appendTo($(".header-top-container > .fsElementContent"));

          $('.mobile-nav-open').click(function(){
            $("#fsMenu").fadeIn();
          });

          $(".mobile-nav-close-button a").click(function(){
            $("#fsMenu").fadeOut();
          });

        },

        responsiveFixes : function(){

          // if($(window).width() < 780){
          //   $(".nav-sub").prependTo($("#fsPageContent"));
          // }
          //
          // $(window).resize(function(){
          //   if($(window).width() < 780){
          //     $(".nav-sub").prependTo($("#fsPageContent"));
          //   }else{
          //     $(".nav-sub").prependTo($("#fsBannerRight > .fsBanner"));
          //   }
          // });

          //Translate Button Repositioning in Mobile Menu

          if($(window).width() < 880){
            $(".google-translate-toggle").appendTo($(".mobile-translate-link > .fsElementContent"));
            $("#google_translate_element").appendTo($(".mobile-translate-link > .fsElementContent"));
          }

          $(window).resize(function(){
            if($(window).width() < 880){
              $(".google-translate-toggle").appendTo($(".mobile-translate-link > .fsElementContent"));
              $("#google_translate_element").appendTo($(".mobile-translate-link > .fsElementContent"));
            }else{
              $(".google-translate-toggle").appendTo($(".header-top-right-translate > .fsElementContent"));
              $("#google_translate_element").appendTo($(".header-top-right-translate > .fsElementContent"));
            }
          });


          $("#fsPoweredByFinalsite").appendTo($("#fsFooter"));

        },

        commonUtils : function(){

          //Search Open and Close

          //Open
          $(".search-icon").click(function(e){
            $(".top-search").addClass("active");
            e.preventDefault();
          });

          //Close

          $(document).on('click', function(event) {
              if (!$(event.target).closest('.header-top-search-container').length) {
                  $(".top-search").removeClass("active");
              }
          });

        }



    };

    UTIL.respondSliders();
    UTIL.fixNav();
    UTIL.responsiveFixes();
    UTIL.commonUtils();
    UTIL.ADA();

}); //jQuery


function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function debounce(e,t,n){var i;return function(){var a=this,r=arguments,s=function(){i=null,n||e.apply(a,r)},o=n&&!i;clearTimeout(i),i=setTimeout(s,t),o&&e.apply(a,r)}}function placeholder(e,t){"use strict";var n,i,a=100,r=100;n=function s(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):a>0&&(i=setTimeout(s,r),a-=1)},i=setTimeout(n,r)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var i=n.split("."),a=t[i.shift()],r=0,s=i.length;r<s;r++)a=a[i[r]];return"undefined"!=typeof a&&null!==a?a:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,i=$(e.target).closest(".fsCalendarDaybox");n=i.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),i.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,i){var a=$(i).hasClass("fsCalendar fsGrid");a&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}!function(e,t,n,i){e.fn.doubleTapToGo=function(i){return!!("ontouchstart"in t||navigator.msMaxTouchPoints||navigator.userAgent.toLowerCase().match(/windows phone os 7/i))&&(this.each(function(){var t=!1;e(this).on("click",function(n){var i=e(this);i[0]!=t[0]&&(n.preventDefault(),t=i)}),e(n).on("click touchstart MSPointerDown",function(n){for(var i=!0,a=e(n.target).parents(),r=0;r<a.length;r++)a[r]==t[0]&&(i=!1);i&&(t=!1)})}),this)}}(jQuery,window,document),function(e){"use strict";function t(t,n){var i=this,a={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],bp:600,callback:null,url:null};i.element=t,i.container=t,i.settings=e.extend(!0,{},a,n),i.url="",i.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}t.prototype={init:function(){var e=this;e.element.classList.contains("fsMedia")?(e.container=e.element.getElementsByClassName("fsMediaCustomPlayer")[0],e.url=e.container.getAttribute("data-playlisturl")):e.settings.url&&(e.url=e.settings.url),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.getContent()},getContent:function(){var t=this;e.getJSON(t.url).done(function(e){for(var i=e.objects,a=0;a<i.length;a++){var r=n(nano(t.html,{imgSrc:window.innerWidth>t.settings.bp?i[a].full_path:i[a].mobile_path,captionTitle:i[a].object_title,captionDesc:i[a].object_description}));0==r.textContent.trim().length&&r.getElementsByClassName("caption-wrapper").length&&r.getElementsByClassName("caption-wrapper")[0].classList.add("is-empty"),t.container.appendChild(r)}t.callback()})},callback:function(){var e=this;"function"==typeof e.settings.callback&&e.settings.callback.call()}},e.fn.mediaPull=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";function t(t,n){var i,a=this;a.element=t,a.isMedia=!1,a.html="",i={slidesToShow:1,accessibility:!0,dots:!0,arrows:!0,infinite:!0,autoplay:!1,pauseOnHover:!1,adaptiveHeight:!0},a.defaults={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],slick:i,bp:600,preSlickCallback:null,callback:null},a.settings=e.extend(!0,{},a.defaults,n),a.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}function i(t){t.classList.toggle("slider-playing"),t.classList.toggle("slider-paused"),t.classList.contains("slider-playing")?e(t).slick("slickPlay"):e(t).slick("slickPause")}t.prototype={init:function(){var t=this;t.element.classList.contains("fsMedia")?t.isMedia=!0:t.element.classList.contains("fsMediaCustomPlayer")&&(t.element=e(t.element).parents(".fsMedia")[0],t.isMedia=!0),t.slider=t.isMedia?t.element.getElementsByClassName("fsMediaCustomPlayer")[0]:t.element,t.slider.classList.add("fsCustomSlider"),t.html=Array.isArray(t.settings.mediaTemplate)?t.settings.mediaTemplate.join("\n"):t.settings.mediaTemplate,t.isMedia?t.sliderPrep():document.body.classList.contains("fsDraftMode")||t.slickInit()},sliderPrep:function(){var t=this;e(t.element).mediaPull({mediaTemplate:t.settings.mediaTemplate,bp:t.settings.bp,callback:function(){t.slickInit()}})},slickInit:function(){var t=this,a=e(t.slider);a.on("init",function(e,a){var r=n("<button class='slider-play-btn'>Play</button>");r.addEventListener("click",function(){i(t.slider)}),t.slider.insertBefore(r,t.slider.firstChild),a.options.autoplay?t.slider.classList.add("slider-playing"):t.slider.classList.add("slider-paused"),"function"==typeof t.settings.callback&&t.settings.callback.call(t,t.element)}),"function"==typeof t.settings.preSlickCallback&&t.settings.preSlickCallback.call(t,t.element),a.slick(t.settings.slick)}},e.fn.mediaSlider=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";var t={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};e.fn.accessibility_menu=function(n){var i=e.extend({menuClass:"menu-item-open",mainMenuLabel:"Main Menu",mainMenuRole:"navigation",topMenuRole:"menubar",listItemsRole:"menuitem",subNavRole:"menu",firstTab:"level2"},n),a=e(this),r=".fsNavPageInfo",s=".fsNavLevel1",o=".fsNavLevel2",l=".fsNavPageDescription",c=a.find("> li > a");e(this).parent().attr("role",i.mainMenuRole).attr("aria-label",i.mainMenuLabel),e(this).attr("role",i.topMenuRole).find("li").attr("role",i.listItemsRole),e(this).find(o).attr("role",i.subNavRole),e(this).find(r).find("a").attr("tabIndex",-1),e(c).each(function(){e(this).next(r).length>0&&e(this).parent("li").attr("aria-haspopup","true").find(r).attr("aria-hidden","true")}),e(c).bind("focus mouseenter mouseleave",function(){var t=new Array;if(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e(this).parents(s).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabindex",-1),e(this).next(r).attr("aria-hidden","false").parent("li").addClass(i.menuClass),t.push(e(this)[0]),"level2"==i.firstTab){if(e(this).next(r).find(o).find("a").length)for(var n=0;n<e(this).next(r).find(o).find("a").length;n++)t.push(e(this).next(r).find(o).find("a")[n]);if(e(this).next(r).find(l).find("a").length)for(var a=0;a<e(this).next(r).find(l).find("a").length;a++)t.push(e(this).next(r).find(l).find("a")[a])}else if("pagedesc"==i.firstTab){if(e(this).next(r).find(l).find("a").length)for(var c=0;c<e(this).next(r).find(l).find("a").length;c++)t.push(e(this).next(r).find(l).find("a")[c]);if(e(this).next(r).find(o).find("a").length)for(var d=0;d<e(this).next(r).find(o).find("a").length;d++)t.push(e(this).next(r).find(o).find("a")[d])}for(var f=0;f<t.length;f++)t[f].setAttribute("tabindex",f)}),e(this).on("mouseleave",function(){e(this).find("> li > a").removeAttr("tabindex"),e(this).find("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(c).keydown(function(n){var a=e(this).parent("li").find(r).find("a").length;38==n.keyCode?(n.preventDefault(),e(this).parent("li").find(r).find("a").length&&e(this).parent("li").find(r).find("a[tabindex="+a+"]").focus()):39==n.keyCode?(n.preventDefault(),0==e(this).parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parent("li").next("li").find("a").first().focus()):40==n.keyCode?e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus()):37==n.keyCode?(n.preventDefault(),0==e(this).parent("li").prev("li").length?e(this).parents(s).find("> li").last().find("a").first().focus():e(this).parent("li").prev("li").find("a").first().focus()):9==n.keyCode?e(this).parent("li").find(r).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(r).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus()):32==n.keyCode?(n.preventDefault(),window.location=e(this).attr("href")):27==n.keyCode?(n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find("> a").removeAttr("tabindex").parent("li").find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):e(this).parent("li").find(r+"[aria-hidden=false] a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})});var d=e(this).find(r).find("a");e(d).keydown(function(n){var a=e(this).parents(r).find("a").length,o=parseInt(e(this).attr("tabindex"));if(38==n.keyCode)n.preventDefault(),1==o?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(o-1)+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parents(r).parent("li").next("li").length?e(this).parents(s).find("> li").first().find("a").first().focus():e(this).parents(r).parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)n.preventDefault(),o==a?e(this).parents(r).parent("li").find("a").first().focus():e(this).parents(r).find("a[tabindex="+(o+1)+"]").focus();else if(27==n.keyCode||37==n.keyCode)n.preventDefault(),e(this).parents(r).parent("li").find("> a").focus(),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true");else if(9==n.keyCode)o==a?e(this).parents(r).parent("li").next("li").length?(n.preventDefault(),e(this).parents(r).parent("li").next("li").find("a").first().focus()):(e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):(n.preventDefault(),e(this).parents(r).find("a[tabindex="+(o+1)+"]").focus());else if(32==n.keyCode)n.preventDefault(),window.location=e(this).attr("href");else{var l=!1;e(this).parent("li").nextAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),l=!0,!1}),l||e(this).parent("li").prevAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})}}),e(document).click(function(){e(this).parents(s).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(r).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(this).click(function(e){e.stopPropagation()})}}(jQuery),window.Modernizr=function(e,t,n){function i(e){y.cssText=e}function a(e,t){return typeof e===t}function r(e,t){return!!~(""+e).indexOf(t)}function s(e,t){for(var i in e){var a=e[i];if(!r(a,"-")&&y[a]!==n)return"pfx"!=t||a}return!1}function o(e,t,i){for(var r in e){var s=t[e[r]];if(s!==n)return i===!1?e[r]:a(s,"function")?s.bind(i||t):s}return!1}function l(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),r=(e+" "+k.join(i+" ")+i).split(" ");return a(t,"string")||a(t,"undefined")?s(r,t):(r=(e+" "+w.join(i+" ")+i).split(" "),o(r,t,n))}var c,d,f,u="2.8.3",p={},h=!0,m=t.documentElement,v="modernizr",g=t.createElement(v),y=g.style,b={}.toString,C=" -webkit- -moz- -o- -ms- ".split(" "),x="Webkit Moz O ms",k=x.split(" "),w=x.toLowerCase().split(" "),T={svg:"http://www.w3.org/2000/svg"},E={},S=[],M=S.slice,D=function(e,n,i,a){var r,s,o,l,c=t.createElement("div"),d=t.body,f=d||t.createElement("body");if(parseInt(i,10))for(;i--;)o=t.createElement("div"),o.id=a?a[i]:v+(i+1),c.appendChild(o);return r=["&#173;",'<style id="s',v,'">',e,"</style>"].join(""),c.id=v,(d?c:f).innerHTML+=r,f.appendChild(c),d||(f.style.background="",f.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(f)),s=n(c,e),d?c.parentNode.removeChild(c):(f.parentNode.removeChild(f),m.style.overflow=l),!!s},j=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var i;return D("@media "+t+" { #"+v+" { position: absolute; } }",function(t){i="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),i},P={}.hasOwnProperty;f=a(P,"undefined")||a(P.call,"undefined")?function(e,t){return t in e&&a(e.constructor.prototype[t],"undefined")}:function(e,t){return P.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=M.call(arguments,1),i=function(){if(this instanceof i){var a=function(){};a.prototype=t.prototype;var r=new a,s=t.apply(r,n.concat(M.call(arguments)));return Object(s)===s?s:r}return t.apply(e,n.concat(M.call(arguments)))};return i}),E.flexbox=function(){return l("flexWrap")},E.flexboxlegacy=function(){return l("boxDirection")},E.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:D(["@media (",C.join("touch-enabled),("),v,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},E.cssanimations=function(){return l("animationName")},E.csscolumns=function(){return l("columnCount")},E.csstransforms=function(){return!!l("transform")},E.csstransforms3d=function(){var e=!!l("perspective");return e&&"webkitPerspective"in m.style&&D("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},E.csstransitions=function(){return l("transition")},E.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},E.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},E.svg=function(){return!!t.createElementNS&&!!t.createElementNS(T.svg,"svg").createSVGRect},E.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==T.svg},E.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(b.call(t.createElementNS(T.svg,"clipPath")))};for(var L in E)f(E,L)&&(d=L.toLowerCase(),p[d]=E[L](),S.push((p[d]?"":"no-")+d));return p.addTest=function(e,t){if("object"==typeof e)for(var i in e)f(e,i)&&p.addTest(i,e[i]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(m.className+=" "+(t?"":"no-")+e),p[e]=t}return p},i(""),g=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=y.elements;return"string"==typeof e?e.split(" "):e}function a(e){var t=g[e[m]];return t||(t={},v++,e[m]=v,g[v]=t),t}function r(e,n,i){if(n||(n=t),d)return n.createElement(e);i||(i=a(n));var r;return r=i.cache[e]?i.cache[e].cloneNode():h.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!r.canHaveChildren||p.test(e)||r.tagUrn?r:i.frag.appendChild(r)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||a(e);for(var r=n.frag.cloneNode(),s=0,o=i(),l=o.length;s<l;s++)r.createElement(o[s]);return r}function o(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?r(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function l(e){e||(e=t);var i=a(e);return y.shivCSS&&!c&&!i.hasCSS&&(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||o(e,i),e}var c,d,f="3.7.0",u=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,m="_html5shiv",v=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,d=!0}}();var y={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:f,shivCSS:u.shivCSS!==!1,supportsUnknownElements:d,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:r,createDocumentFragment:s};e.html5=y,l(t)}(this,t),p._version=u,p._prefixes=C,p._domPrefixes=w,p._cssomPrefixes=k,p.mq=j,p.testProp=function(e){return s([e])},p.testAllProps=l,p.testStyles=D,m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+S.join(" "):""),p}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==v.call(e)}function a(e){return"string"==typeof e}function r(){}function s(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function o(){var e=g.shift();y=1,e?e.t?h(function(){("c"==e.t?u.injectCss:u.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),o()):y=0}function l(e,n,i,a,r,l,c){function d(t){if(!p&&s(f.readyState)&&(b.r=p=1,!y&&o(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&h(function(){x.removeChild(f)},50);for(var i in S[n])S[n].hasOwnProperty(i)&&S[n][i].onload()}}var c=c||u.errorTimeout,f=t.createElement(e),p=0,v=0,b={t:i,s:n,e:r,a:l,x:c};1===S[n]&&(v=1,S[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){d.call(this,v)},g.splice(a,0,b),"img"!=e&&(v||2===S[n]?(x.insertBefore(f,C?null:m),h(d,c)):S[n].push(f))}function c(e,t,n,i,r){return y=0,t=t||"j",a(e)?l("c"==t?w:k,e,t,this.i++,n,i,r):(g.splice(this.i++,0,e),1==g.length&&o()),this}function d(){var e=u;return e.loader={load:c,i:0},e}var f,u,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],v={}.toString,g=[],y=0,b="MozAppearance"in p.style,C=b&&!!t.createRange().compareNode,x=C?p:m.parentNode,p=e.opera&&"[object Opera]"==v.call(e.opera),p=!!t.attachEvent&&!p,k=b?"object":p?"script":"img",w=p?"script":k,T=Array.isArray||function(e){return"[object Array]"==v.call(e)},E=[],S={},M={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};u=function(e){function t(e){var t,n,i,e=e.split("!"),a=E.length,r=e.pop(),s=e.length,r={url:r,origUrl:r,prefixes:e};for(n=0;n<s;n++)i=e[n].split("="),(t=M[i.shift()])&&(r=t(r,i));for(n=0;n<a;n++)r=E[n](r);return r}function s(e,a,r,s,o){var l=t(e),c=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(a&&(a=i(a)?a:a[e]||a[s]||a[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,a,r,s,o):(S[l.url]?l.noexec=!0:S[l.url]=1,r.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(a)||i(c))&&r.load(function(){d(),a&&a(l.origUrl,o,s),c&&c(l.origUrl,o,s),S[l.url]=2})))}function o(e,t){function n(e,n){if(e){if(a(e))n||(f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}),s(e,f,t,0,c);else if(Object(e)===e)for(l in o=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--o&&(i(f)?f=function(){var e=[].slice.call(arguments);u.apply(this,e),p()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(u[l])),s(e[l],f,t,l,c))}else!n&&p()}var o,l,c=!!e.test,d=e.load||e.both,f=e.callback||r,u=f,p=e.complete||r;n(c?e.yep:e.nope,!!d),d&&n(d)}var l,c,f=this.yepnope.loader;if(a(e))s(e,0,f,0);else if(T(e))for(l=0;l<e.length;l++)c=e[l],a(c)?s(c,0,f,0):T(c)?u(c):Object(c)===c&&o(c,f);else Object(e)===e&&o(e,f)},u.addPrefix=function(e,t){M[e]=t},u.addFilter=function(e){E.push(e)},u.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=d(),e.yepnope.executeStack=o,e.yepnope.injectJs=function(e,n,i,a,l,c){var d,f,p=t.createElement("script"),a=a||u.errorTimeout;p.src=e;for(f in i)p.setAttribute(f,i[f]);n=c?o:n||r,p.onreadystatechange=p.onload=function(){!d&&s(p.readyState)&&(d=1,n(),p.onload=p.onreadystatechange=null)},h(function(){d||(d=1,n(1))},a),l?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,i,a,s,l){var c,a=t.createElement("link"),n=l?o:n||r;a.href=e,a.rel="stylesheet",a.type="text/css";for(c in i)a.setAttribute(c,i[c]);s||(m.parentNode.insertBefore(a,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e){var t=e({});e.subscribe=function(){t.on.apply(t,arguments)},e.unsubscribe=function(){t.off.apply(t,arguments)},e.publish=function(){t.trigger.apply(t,arguments)}}(jQuery);