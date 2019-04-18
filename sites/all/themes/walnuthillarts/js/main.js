 /**
 *
 * Walnut Hill School for the Arts - default_16
 * @link http://redesign-2016---walnut-hill-579.walnuthill.finalsite.com/
 * Built By: Stephen Petrus
 * Project Manager: Jamie
 * Designer: Nathan Lyttle
 *
 */

/*!
 * global_enhancements is a file particular to certain pages
 * it contains site enhancement js only
**/


jQuery(function($) {

  var html = $(document.documentElement),
    body = $(document.body),
    doc = $(document),
    win = $(window),
    header = $('#fsHeader'),
    footer = $('#fsFooter'),
    offCanvas = $('#fsMenu'),
    pageBodyWrapper = $('#fsPageBodyWrapper'),
    pageBody = $('#fsPageBody'),
    pageContent = $('#fsPageContent'),
    pageContentBase = pageContent.children('.fsPageLayout').children('.fsDiv'),
    isComposer = body.hasClass('fsComposeMode');


  // ================================
  // Home
  // ================================

  if ( body.hasClass('home') ) {
    pageContentBase.children('.panel-featured').each(function(i) {
      if (i>0) return false;

      var _ = $(this);

      _.find('.module-featured, .callout-featured').each(function(i) {
        var item = $(this);
        var link = item.find('footer a');

        if (link.length) {
          var overlay = $('<a href="' + link.attr('href') + '" class="featured-overlay"></a>');

          if (item.hasClass('callout-featured')) {
            link.appendTo(item.find('.fsElementContent'));
          }

          item.prepend(overlay);
        }
      });

      _.addClass('element-loaded');
    });

    pageContentBase.children('.panel-upcoming-events').each(function(i) {
      if (i>0) return false;

      var _ = $(this);

      _.find('article').unwrap('.fsDayContainer');

      _.addClass('element-loaded');
    });

    pageContentBase.children('.panel-top-stories').each(function(i) {
      if (i>0) return false;

      var _ = $(this);

      var arrows = $('<div class="slideshow-arrows"></div>'),
        listItems = _.find('.fsListItems'),
        articles = listItems.find('article')
        ;

      articles.each(function(i) {
        var self = $(this);

        var thumb = self.find('.fsThumbnail');
        self.prepend('<div class="slide-index">' + (i + 1) + ' of ' + articles.length + '</div>');
        self.wrapInner('<div class="article-inner"></div>');
        self.prepend(thumb);
      });

      _.find('.fsNews').append(arrows);
      listItems.slick({
        'accessibility': false,
        'arrows': true,
        'appendArrows': arrows,
        'prevArrow': '<div class="slick-prev">Previous</div>',
        'nextArrow': '<div class="slick-next">Next</div>',
        'slide': 'article',
        'fade': true
      });

      _.addClass('element-loaded');
    });

    pageContentBase.children('.panel-points-of-pride').each(function(i) {
      if (i>0) return false;

      var _ = $(this),
        container = _.find('> .fsContainer > .fsElementContent'),
        arrows = $('<div class="slideshow-arrows"></div>').appendTo(container),
        dots = $('<div class="slideshow-index"></div>').appendTo(container)
        ;

      container.slick({
        'accessibility': false,
        'adaptiveHeight': true,
        'arrows': true,
        'appendArrows': arrows,
        'prevArrow': '<div class="slick-prev">Previous</div>',
        'nextArrow': '<div class="slick-next">Next</div>',
        'dots': true,
        'appendDots': dots,
        'slide': '.fsContent',
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'autoplay': true,
        'autoplaySpeed': 7000
      });

      _.addClass('element-loaded');
    });
  }

  if (body.hasClass('news-media')) {
    (function() {
      var pageContent = $('#fsPageContent'),
        isComposer = $(document.body).hasClass('fsComposeMode')
        ;
  
      // Hero
      var hero = pageContent.find('.panel-hero');
      if (hero.length) {
        (function() {
          var media = hero.find('.fsMedia'),
            player = hero.find('.fsMediaCustomPlayer')
            ;

          if (media.length && player.length) {
            media.mediaSlider({
              mediaTemplate:[
                '<article class="slide-hero">',
                  '<div class="image-wrapper" style="background-image: url({imgSrc});">',
                    '<img src="{imgSrc}" class="universal-img" />',
                  '</div>',
                  '<div class="caption-wrapper">',
                    '<div class="caption-title">{captionTitle}</div>',
                    '<div class="caption-desc">{captionDesc}</div>',
                  '</div>',
                '</article>'
              ], // html markup
              callback: function() {
                if (!isComposer) {
                  hero.insertBefore('#fsPageBodyWrapper');
                }

                player.find('article').each(function(i) {
                  var title = $(this).find('.caption-title');

                  // Remove title if it has been set to '.'
                  if (title.length) {
                    if (title.text() === '.') {
                      title.remove();
                    }
                  }
                });

                var arrows = $('<div class="slideshow-arrows"></div>').appendTo(player),
                  dots = $('<div class="slideshow-index"></div>').insertAfter(player)
                  ;

                player.slick({
                  'accessibility': true,
                  'adaptiveHeight': true,
                  'arrows': true,
                  'appendArrows': arrows,
                  'dots': true,
                  'appendDots': dots,
                  'autoplay': player.data('autoplay') || false,
                  'autoplaySpeed': 7000,
                  'slide': 'article',
                  'slidesToShow': 1,
                  'slidesToScroll': 1
                });

                hero.addClass('element-loaded');
              }
            });
          }
        })();
      }

      // Photos
      var photos = pageContent.find('.panel-photos');
      if (photos.length) {
        (function() {
          var media = photos.find('.fsMedia'),
            player = photos.find('.fsMediaCustomPlayer')
            ;

          if (media.length && player.length) {
            media.mediaSlider({

              mediaTemplate:[
                '<article class="slide-photo" style="background-image: url({imgSrc});">',
                  '<img src="{imgSrc}" class="universal-img" />',
                '</article>'
              ], // html markup

              callback: function() {
                player.find('img').on('load', function() {
                  $(this).closest('article').addClass('photo-loaded');
                });

                player.prepend('<div class="slide-sizer"></div>');

                photos.addClass('element-loaded');
              }
            });
          }
        })();
      }

      // Videos
      var videos = pageContent.find('.panel-videos');
      if (videos.length) {
        (function() {

          videos.find('.video-item').each(function(i) {
            var self = $(this),
              header = self.find('header'),
              img = self.find('header img'),
              link = self.find('.fsElementContent a')
              ;

            if (header.length && img.length) {
              var url = 'url(\'' + img.attr('src') + '\')';
              header.css('background-image', url);
            }

            if (link.length) {
              link.nivoLightbox();
            }
          });
        })();
      }
    })();
  }

  // ================================
  // Admissions
  // ================================

  if ( body.hasClass('admissions') ) {
    var events = pageContentBase.find('.admission-events');
    events.find('article').unwrap();
    events.addClass('element-loaded');
  }

  // ================================
  // Giving
  // ================================

  // main page
  if (body.hasClass('donation-pages')) {
    // // hero
    $('.hero').each(function() {
      var _ = $(this);

      // move page title
      _.find('> header').prependTo( _.find('> .fsElementContent') );

      // spotlight
      $('.spotlight > .fsDiv > .fsElement').each( function() {
        var self = $(this);
        self.find('.fsElementContent').appendTo( self.find('header') );
      });
    });
    
    donationPagesPanels();
  }

  function donationPagesPanels() {
    // move panels
    // $('.ways-give-panel, .types-gifts-panel').insertBefore('#fsPageWrapper');

    $('.ways-give-panel,.types-gifts-panel').insertAfter('.hero > .fsElementContent');
    
    // enquire
    // .register("screen and (min-width: 800px)", {
    //   match: function() {
    //     $('.ways-give-panel,.types-gifts-panel').insertAfter('.hero > .fsElementContent');
    //   },
    //   unmatch: function() {
    //     $('.ways-give-panel,.types-gifts-panel').insertBefore('#fsPageWrapper');
    //   }
    // }, true);

    // add close icon
    $('.ways-give-panel > .fsContainer > header .fsElementTitle, .types-gifts-panel > .fsContainer > header .fsElementTitle').prepend('<div class="close-panel"><span>Close</span></div>');

    // open panels
    $('.ways-give-intro').click( function() {
      $('body, .ways-give-panel').toggleClass( 'panel-active' );
    });

    $('.types-gifts-intro').click( function() {
      $('body, .types-gifts-panel').toggleClass( 'panel-active' );
    });

    // close panels
    $('.close-panel').click( function() {
      $(this).parent().parent().toggleClass( 'panel-active' );
      $('body').toggleClass('panel-active');
    });

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.ways-give-intro, .types-gifts-intro').length) {
      $('body, .ways-give-panel, .types-gifts-panel').removeClass( 'panel-active' );
      }
    });
  }
});
/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
**/


jQuery(function($) {

  var mobileBP = 600;
  var html = $(document.documentElement),
    body = $(document.body),
    doc = $(document),
    win = $(window),
    header = $('#fsHeader'),
    footer = $('#fsFooter'),
    offCanvas = $('#fsMenu'),
    // pageTitle = $('#fsPageContent > .fsPageTitle'),
    pageBodyWrapper = $('#fsPageBodyWrapper'),
    pageBody = $('#fsPageBody'),
    pageContent = $('#fsPageContent'),
    pageContentBase = pageContent.children('.fsPageLayout').children('.fsDiv'),
    hasHero = false,
    isComposer = body.hasClass('fsComposeMode');

  $('#fsPoweredByFinalsite').appendTo(footer.children('.fsBanner'));

  (function() {
    var scrollWidth = window.innerWidth - document.body.clientWidth;
    body.append([
      '<style type="text/css">',
        'body:not(.fsComposeMode) .panel-full-width.fsContainer > header,',
        'body:not(.fsComposeMode) .panel-full-width.fsContainer > .fsElementContent,',
        'body:not(.fsComposeMode) .panel-full-width.fsContainer > footer ',
        'body:not(.fsComposeMode) .panel-full-width.fsSharedContainer > .fsContainer > header,',
        'body:not(.fsComposeMode) .panel-full-width.fsSharedContainer > .fsContainer > .fsElementContent,',
        'body:not(.fsComposeMode) .panel-full-width.fsSharedContainer > .fsContainer > footer ',
        '{ width: calc(100vw - ' + scrollWidth + 'px); transform: translateX(' + (scrollWidth / 2) + 'px); }',
      '</style>'
    ].join(''));
  })();
  
  // ================================
  //  Page Hero
  // ================================

  $('.hero-image').each(function(i) {
    var _ = $(this);

    if (i>0) {
      if (!isComposer) _.remove();
      return false;
    }

    html.addClass('has-hero');

    if (_.hasClass('fsContent')) {
      // if (!isComposer) {
      if (!body.hasClass('fsComposeMode')) {

        _.insertBefore('#fsPageBodyWrapper');
        _.addClass('element-loaded');
      }
    }

    if (_.hasClass('fsMedia')) {
      _.mediaSlider({ 
        mediaTemplate:[
          '<article class="universal-slide" style="background-image: url({imgSrc});">',
            '<img src="{imgSrc}" class="universal-img" />',
          '</article>'
        ], // html markup
        'callback': function(elm) {
          var arrows = $('<div class="slideshow-arrows"></div>');
          arrows.appendTo(elm.children('.fsElementContent'));

          var player = elm.find('.fsMediaCustomPlayer');

          player.slick({
            accessibility: false,
            dots: false,
            arrows: true,
            appendArrows: arrows,
            prevArrow: '<div class="slick-prev">Previous</div>',
            nextArrow: '<div class="slick-next">Next</div>',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 7000,
            pauseOnHover: false,
            slidesToShow: 1,
            slidesToScroll: 1
          });

          if (!isComposer) {
            _.insertBefore('#fsPageBodyWrapper');
            _.addClass('element-loaded');

            player.slick('getSlick').setPosition();
          }
        }
      });      
    }
  });


  // ================================
  //  Off Canvas
  // ================================


  (function() {
    var breadcrumbs = header.find('.container-breadcrumbs');

    if (breadcrumbs.length) {
      breadcrumbs.insertBefore('#fsPageBody').addClass('element-loaded');
    }
  })();

  if (header.length) {
    header.prepend('<div class="off-canvas-toggle"><span>Menu</span><div class="off-canvas-toggle-icon"><span></span><span></span><span></span><span></span></div>');
    header.on('click','.off-canvas-toggle', function(e) {
      body.toggleClass('off-canvas-active');
    });

    offCanvas.insertBefore('#fsPageWrapper');
    offCanvas.prepend('<div class="off-canvas-overlay"></div>');
    offCanvas.on('click','.off-canvas-overlay', function(e) {
      e.preventDefault();
      e.stopPropagation();

      body.removeClass('off-canvas-active');
    });

    offCanvas.find('.fsMenu').addClass('element-loaded');
  }

  (function() {
    var subNavHeader = header.find('.header-sub-nav'),
      subNav = subNavHeader.find('.nav-sub')
      ;

    if (subNav.length) {
      subNav.find('li.fsNavParentPage').each(function(i) {
        var _ = $(this),
          link = _.children('a')
          ;

        $('<div class="menu-toggle"></a>').insertAfter(link);
      });
      
      subNav.on('click','.menu-toggle', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var _ = $(this);

        _.siblings('.fsNavPageInfo').slideToggle();

        _.parent().toggleClass('menu-open');
      });
            
      subNav.find('.fsNavLevel2 .fsNavCurrentPage > .menu-toggle, .fsNavLevel2 .fsNavCurrentPageAncestor > .menu-toggle').click();

      // var breadcrumbs = $('.container-breadcrumbs');
      // if (breadcrumbs.length) {
        subNavHeader.prependTo('#fsPageBodyWrapper');
      // } else {
        // subNavHeader.insertAfter(breadcrumbs);
      // }

      subNav.addClass('element-loaded');
    }
  })();

  (function() {
    var mainNav = offCanvas.find('.nav-main-mobile');

    if (mainNav.length) {
      var floatNav = mainNav.clone();

      floatNav.find('ul.fsNavLevel1').prepend('<li><a class="site-info-float" href="/" title="Walnut Hill School for the Arts">Home</a></li>');
      floatNav.removeClass('nav-main-mobile').addClass('nav-main nav-main-float').prependTo('#fsHeader');

      var myEfficientFn = debounce(function() {
        if (win.scrollTop() > header.outerHeight(true)) {
          html.addClass('nav-float');
        } else {
          html.removeClass('nav-float');
        }
      }, 100);

      window.addEventListener('resize', myEfficientFn);
      window.addEventListener('scroll', myEfficientFn);

      mainNav.find('.fsNavLevel1').prepend('<li><a href="/">Home</a></li>');
    }
  })();

  header.find('.nav-main .fsNavLevel1 > li > .fsNavPageInfo').each(function(i) {
    var info = $(this);

    if (info.length) {
      var links = info.find('> .fsNavLevel2'),
        desc = info.find('> .fsNavPageDescription'),
        thumb = info.find('> .fsNavPageThumbnail')
        ;

      if (!links.length) {
        links = $('<ul class="fsNavLevel2"></ul>');
      }

      if (!thumb.length) {
        thumb = $('<div class="fsNavPageThumbnail fsNavPageInfoPlaceholder"></div>');
      }

      if (!desc.length) {
        desc = $('<div class="fsNavPageDescription fsNavPageInfoPlaceholder"></div>');
      }

      info.append(desc);
      info.append(thumb);
      info.append(links);
    }
  });


  // ================================
  //  Custom Search
  // ================================

  (function() {
    var search = header.find('.search-custom'),
      input = search.find('input')
      ;

    if (search.length) {
      search.on('click', '.search-custom-toggle', function(e) {

        e.stopPropagation();
        e.preventDefault();

        if (!html.hasClass('search-open')) {
          html.addClass('search-open');
          input.focus();

          html.on('click.search', function(e) {
            html.removeClass('search-open');
            html.off('click.search');
          });
        } else {
          html.removeClass('search-open');
        }
      });

      search.on('click', '.fsElementContent', function(e) {
        e.stopPropagation();
      });
    }
  })();

  if (!isComposer) {
    pageContentBase.find('img.fs_style_27, img.fs_style_28').each(function(i) {
      var _ = $(this);

      var title = _.attr('title');
      if (title.length) {

        var fig = $('<div class="figure"></div>');
        if (_.hasClass('fs_style_27')) {
           fig.addClass('fs_style_27');
        }
        if (_.hasClass('fs_style_28')) {
           fig.addClass('fs_style_28');
        }

        var caption = $('<caption>' + title + '</caption>');

        fig.attr('style', _.attr('style'));
        fig.css('font-size', '');
        fig.css('line-height', '');
        fig.append(_.clone());
        fig.append(caption);
        _.replaceWith(fig);
      }
    });    
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



function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function date(){var e,t,n=".date-container",o=new Date,i=o.getYear(),a=o.getDay(),r=o.getMonth(),l=o.getDate(),s=o.getHours();e=s%12||12,t=s<12?"am":"pm";var c=o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes();i<1e3&&(i+=1900),l<10&&(l="0"+l);var d=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"),u=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"),h='<div class="date"><div class="day">'+d[a]+',</div><div class="month"> '+u[r]+" "+l+'</div><div class="time">'+e+":"+c+" "+t+"</div></div>";$(n).html(h)}function debounce(e,t,n){var o;return function(){var i=this,a=arguments,r=function(){o=null,n||e.apply(i,a)},l=n&&!o;clearTimeout(o),o=setTimeout(r,t),l&&e.apply(i,a)}}function placeholder(e,t){"use strict";var n,o,i=100,a=100;n=function r(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):i>0&&(o=setTimeout(r,a),i-=1)},o=setTimeout(n,a)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var o=n.split("."),i=t[o.shift()],a=0,r=o.length;a<r;a++)i=i[o[a]];return"undefined"!=typeof i&&null!==i?i:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,o=$(e.target).closest(".fsCalendarDaybox");n=o.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),o.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,o){var i=$(o).hasClass("fsCalendar fsGrid");i&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}$.fn.mediaSlider=function(e){slideshowClass=this;var t,n,o=600,i=$(slideshowClass).find(".fsMediaCustomPlayer"),a=i.attr("data-playlisturl"),r=$.extend({mediaTemplate:""},e),l={slide:r.mediaTemplate.join("\n")};i.data("display_loaded",!1),$.getJSON(a,function(e){var a;$(window).width()>o?t="full":(t="mobile",$(window).on("resize",function(){var e=$(this).width();e>o&&!i.data("display_loaded")&&!a&&($(window).data("display_loaded",!0),a=!0,i.find("article").each(function(){var e=$(this),t=e.find("img").attr("src").replace("/mobile/","/fullsize/");e.find("img").attr("src",t),e.attr("style",'background-image: url("'+t+'");')}))})),$.each(e.objects,function(o,a){n="full"===t?e.objects[o].full_path:e.objects[o].mobile_path,i.append(nano(l.slide,{imgSrc:n,captionTitle:e.objects[o].object_title,captionDesc:e.objects[o].object_description}))})}).done(function(){e.callback($(slideshowClass))}).fail(function(){i.append("<span>Please make sure you have content added to media manager and that you have selected the correct element settings.</span>").css("textAlign","center")})},window.Modernizr=function(e,t,n){function o(e){b.cssText=e}function i(e,t){return typeof e===t}function a(e,t){return!!~(""+e).indexOf(t)}function r(e,t){for(var o in e){var i=e[o];if(!a(i,"-")&&b[i]!==n)return"pfx"!=t||i}return!1}function l(e,t,o){for(var a in e){var r=t[e[a]];if(r!==n)return o===!1?e[a]:i(r,"function")?r.bind(o||t):r}return!1}function s(e,t,n){var o=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+w.join(o+" ")+o).split(" ");return i(t,"string")||i(t,"undefined")?r(a,t):(a=(e+" "+k.join(o+" ")+o).split(" "),l(a,t,n))}var c,d,u,h="2.8.3",f={},p=!0,v=t.documentElement,g="modernizr",m=t.createElement(g),b=m.style,y={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",w=C.split(" "),k=C.toLowerCase().split(" "),E={svg:"http://www.w3.org/2000/svg"},$={},S=[],T=S.slice,j=function(e,n,o,i){var a,r,l,s,c=t.createElement("div"),d=t.body,u=d||t.createElement("body");if(parseInt(o,10))for(;o--;)l=t.createElement("div"),l.id=i?i[o]:g+(o+1),c.appendChild(l);return a=["&#173;",'<style id="s',g,'">',e,"</style>"].join(""),c.id=g,(d?c:u).innerHTML+=a,u.appendChild(c),d||(u.style.background="",u.style.overflow="hidden",s=v.style.overflow,v.style.overflow="hidden",v.appendChild(u)),r=n(c,e),d?c.parentNode.removeChild(c):(u.parentNode.removeChild(u),v.style.overflow=s),!!r},M=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var o;return j("@media "+t+" { #"+g+" { position: absolute; } }",function(t){o="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),o},P={}.hasOwnProperty;u=i(P,"undefined")||i(P.call,"undefined")?function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")}:function(e,t){return P.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=T.call(arguments,1),o=function(){if(this instanceof o){var i=function(){};i.prototype=t.prototype;var a=new i,r=t.apply(a,n.concat(T.call(arguments)));return Object(r)===r?r:a}return t.apply(e,n.concat(T.call(arguments)))};return o}),$.flexbox=function(){return s("flexWrap")},$.flexboxlegacy=function(){return s("boxDirection")},$.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:j(["@media (",x.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},$.cssanimations=function(){return s("animationName")},$.csscolumns=function(){return s("columnCount")},$.csstransforms=function(){return!!s("transform")},$.csstransforms3d=function(){var e=!!s("perspective");return e&&"webkitPerspective"in v.style&&j("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e},$.csstransitions=function(){return s("transition")},$.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(o){}return n},$.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(o){}return n},$.svg=function(){return!!t.createElementNS&&!!t.createElementNS(E.svg,"svg").createSVGRect},$.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==E.svg},$.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(y.call(t.createElementNS(E.svg,"clipPath")))};for(var L in $)u($,L)&&(d=L.toLowerCase(),f[d]=$[L](),S.push((f[d]?"":"no-")+d));return f.addTest=function(e,t){if("object"==typeof e)for(var o in e)u(e,o)&&f.addTest(o,e[o]);else{if(e=e.toLowerCase(),f[e]!==n)return f;t="function"==typeof t?t():t,"undefined"!=typeof p&&p&&(v.className+=" "+(t?"":"no-")+e),f[e]=t}return f},o(""),m=c=null,function(e,t){function n(e,t){var n=e.createElement("p"),o=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",o.insertBefore(n.lastChild,o.firstChild)}function o(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function i(e){var t=m[e[v]];return t||(t={},g++,e[v]=g,m[g]=t),t}function a(e,n,o){if(n||(n=t),d)return n.createElement(e);o||(o=i(n));var a;return a=o.cache[e]?o.cache[e].cloneNode():p.test(e)?(o.cache[e]=o.createElem(e)).cloneNode():o.createElem(e),!a.canHaveChildren||f.test(e)||a.tagUrn?a:o.frag.appendChild(a)}function r(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||i(e);for(var a=n.frag.cloneNode(),r=0,l=o(),s=l.length;r<s;r++)a.createElement(l[r]);return a}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+o().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function s(e){e||(e=t);var o=i(e);return b.shivCSS&&!c&&!o.hasCSS&&(o.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,o),e}var c,d,u="3.7.0",h=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,m={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){c=!0,d=!0}}();var b={elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:u,shivCSS:h.shivCSS!==!1,supportsUnknownElements:d,shivMethods:h.shivMethods!==!1,type:"default",shivDocument:s,createElement:a,createDocumentFragment:r};e.html5=b,s(t)}(this,t),f._version=h,f._prefixes=x,f._domPrefixes=k,f._cssomPrefixes=w,f.mq=M,f.testProp=function(e){return r([e])},f.testAllProps=s,f.testStyles=j,v.className=v.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+S.join(" "):""),f}(this,this.document),function(e,t,n){function o(e){return"[object Function]"==g.call(e)}function i(e){return"string"==typeof e}function a(){}function r(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function l(){var e=m.shift();b=1,e?e.t?p(function(){("c"==e.t?h.injectCss:h.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),l()):b=0}function s(e,n,o,i,a,s,c){function d(t){if(!f&&r(u.readyState)&&(y.r=f=1,!b&&l(),u.onload=u.onreadystatechange=null,t)){"img"!=e&&p(function(){C.removeChild(u)},50);for(var o in S[n])S[n].hasOwnProperty(o)&&S[n][o].onload()}}var c=c||h.errorTimeout,u=t.createElement(e),f=0,g=0,y={t:o,s:n,e:a,a:s,x:c};1===S[n]&&(g=1,S[n]=[]),"object"==e?u.data=n:(u.src=n,u.type=e),u.width=u.height="0",u.onerror=u.onload=u.onreadystatechange=function(){d.call(this,g)},m.splice(i,0,y),"img"!=e&&(g||2===S[n]?(C.insertBefore(u,x?null:v),p(d,c)):S[n].push(u))}function c(e,t,n,o,a){return b=0,t=t||"j",i(e)?s("c"==t?k:w,e,t,this.i++,n,o,a):(m.splice(this.i++,0,e),1==m.length&&l()),this}function d(){var e=h;return e.loader={load:c,i:0},e}var u,h,f=t.documentElement,p=e.setTimeout,v=t.getElementsByTagName("script")[0],g={}.toString,m=[],b=0,y="MozAppearance"in f.style,x=y&&!!t.createRange().compareNode,C=x?f:v.parentNode,f=e.opera&&"[object Opera]"==g.call(e.opera),f=!!t.attachEvent&&!f,w=y?"object":f?"script":"img",k=f?"script":w,E=Array.isArray||function(e){return"[object Array]"==g.call(e)},$=[],S={},T={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};h=function(e){function t(e){var t,n,o,e=e.split("!"),i=$.length,a=e.pop(),r=e.length,a={url:a,origUrl:a,prefixes:e};for(n=0;n<r;n++)o=e[n].split("="),(t=T[o.shift()])&&(a=t(a,o));for(n=0;n<i;n++)a=$[n](a);return a}function r(e,i,a,r,l){var s=t(e),c=s.autoCallback;s.url.split(".").pop().split("?").shift(),s.bypass||(i&&(i=o(i)?i:i[e]||i[r]||i[e.split("/").pop().split("?")[0]]),s.instead?s.instead(e,i,a,r,l):(S[s.url]?s.noexec=!0:S[s.url]=1,a.load(s.url,s.forceCSS||!s.forceJS&&"css"==s.url.split(".").pop().split("?").shift()?"c":n,s.noexec,s.attrs,s.timeout),(o(i)||o(c))&&a.load(function(){d(),i&&i(s.origUrl,l,r),c&&c(s.origUrl,l,r),S[s.url]=2})))}function l(e,t){function n(e,n){if(e){if(i(e))n||(u=function(){var e=[].slice.call(arguments);h.apply(this,e),f()}),r(e,u,t,0,c);else if(Object(e)===e)for(s in l=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(s)&&(!n&&!--l&&(o(u)?u=function(){var e=[].slice.call(arguments);h.apply(this,e),f()}:u[s]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),f()}}(h[s])),r(e[s],u,t,s,c))}else!n&&f()}var l,s,c=!!e.test,d=e.load||e.both,u=e.callback||a,h=u,f=e.complete||a;n(c?e.yep:e.nope,!!d),d&&n(d)}var s,c,u=this.yepnope.loader;if(i(e))r(e,0,u,0);else if(E(e))for(s=0;s<e.length;s++)c=e[s],i(c)?r(c,0,u,0):E(c)?h(c):Object(c)===c&&l(c,u);else Object(e)===e&&l(e,u)},h.addPrefix=function(e,t){T[e]=t},h.addFilter=function(e){$.push(e)},h.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",u=function(){t.removeEventListener("DOMContentLoaded",u,0),t.readyState="complete"},0)),e.yepnope=d(),e.yepnope.executeStack=l,e.yepnope.injectJs=function(e,n,o,i,s,c){var d,u,f=t.createElement("script"),i=i||h.errorTimeout;f.src=e;for(u in o)f.setAttribute(u,o[u]);n=c?l:n||a,f.onreadystatechange=f.onload=function(){!d&&r(f.readyState)&&(d=1,n(),f.onload=f.onreadystatechange=null)},p(function(){d||(d=1,n(1))},i),s?f.onload():v.parentNode.insertBefore(f,v)},e.yepnope.injectCss=function(e,n,o,i,r,s){var c,i=t.createElement("link"),n=s?l:n||a;i.href=e,i.rel="stylesheet",i.type="text/css";for(c in o)i.setAttribute(c,o[c]);r||(v.parentNode.insertBefore(i,v),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(e,t,n,o){function i(t,n){this.el=t,this.$el=e(this.el),this.options=e.extend({},r,n),this._defaults=r,this._name=a,this.init()}var a="nivoLightbox",r={effect:"fade",theme:"default",keyboardNav:!0,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(e){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(e){},onNext:function(e){},errorMessage:"The requested content cannot be loaded. Please try again later."};i.prototype={init:function(){var t=this;e("html").hasClass("nivo-lightbox-notouch")||e("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in n&&e("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(e){t.showLightbox(e)}),this.options.keyboardNav&&e("body").off("keyup").on("keyup",function(n){var o=n.keyCode?n.keyCode:n.which;27==o&&t.destructLightbox(),37==o&&e(".nivo-lightbox-prev").trigger("click"),39==o&&e(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(t){var n=this,o=this.$el,i=this.checkContent(o);if(i){t.preventDefault(),this.options.beforeShowLightbox.call(this);var a=this.constructLightbox();if(a){var r=a.find(".nivo-lightbox-content");if(r){if(e("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(r,o),this.$el.attr("data-lightbox-gallery")){var l=e('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');e(".nivo-lightbox-nav").show(),e(".nivo-lightbox-prev").off("click").on("click",function(t){t.preventDefault();var i=l.index(o);o=l.eq(i-1),e(o).length||(o=l.last()),n.processContent(r,o),n.options.onPrev.call(this,[o])}),e(".nivo-lightbox-next").off("click").on("click",function(t){t.preventDefault();var i=l.index(o);o=l.eq(i+1),e(o).length||(o=l.first()),n.processContent(r,o),n.options.onNext.call(this,[o])})}setTimeout(function(){a.addClass("nivo-lightbox-open"),n.options.afterShowLightbox.call(this,[a])},1)}}}},checkContent:function(e){var t=e.attr("href"),n=t.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==t.match(/\.(jpeg|jpg|gif|png)$/i)||(!!n||("ajax"==e.attr("data-lightbox-type")||("#"==t.substring(0,1)&&"inline"==e.attr("data-lightbox-type")||"iframe"==e.attr("data-lightbox-type"))))},processContent:function(n,o){var i=this,a=o.attr("href"),r=a.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(n.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&o.attr("data-lightbox-hidpi")&&(a=o.attr("data-lightbox-hidpi")),null!==a.match(/\.(jpeg|jpg|gif|png)$/i)){var l=e("<img>",{src:a});l.one("load",function(){var o=e('<div class="nivo-lightbox-image" />');o.append(l),n.html(o).removeClass("nivo-lightbox-loading"),o.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"}),e(t).resize(function(){o.css({"line-height":e(".nivo-lightbox-content").height()+"px",height:e(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&e(this).load()}),l.error(function(){var t=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")})}else if(r){var s="",c="nivo-lightbox-video";if("youtube"==r[1]&&(s="http://www.youtube.com/embed/"+r[4],c="nivo-lightbox-youtube"),"youtu"==r[1]&&(s="http://www.youtube.com/embed/"+r[3],c="nivo-lightbox-youtube"),"vimeo"==r[1]&&(s="http://player.vimeo.com/video/"+r[3],c="nivo-lightbox-vimeo"),s){var d=e("<iframe>",{src:s,"class":c,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(d),d.load(function(){n.removeClass("nivo-lightbox-loading")})}}else if("ajax"==o.attr("data-lightbox-type"))e.ajax({url:a,cache:!1,success:function(o){var i=e('<div class="nivo-lightbox-ajax" />');i.append(o),n.html(i).removeClass("nivo-lightbox-loading"),i.outerHeight()<n.height()&&i.css({position:"relative",top:"50%","margin-top":-(i.outerHeight()/2)+"px"}),e(t).resize(function(){i.outerHeight()<n.height()&&i.css({position:"relative",top:"50%","margin-top":-(i.outerHeight()/2)+"px"})})},error:function(){var t=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(t).removeClass("nivo-lightbox-loading")}});else if("#"==a.substring(0,1)&&"inline"==o.attr("data-lightbox-type"))if(e(a).length){var u=e('<div class="nivo-lightbox-inline" />');u.append(e(a).clone().show()),n.html(u).removeClass("nivo-lightbox-loading"),u.outerHeight()<n.height()&&u.css({position:"relative",top:"50%","margin-top":-(u.outerHeight()/2)+"px"}),e(t).resize(function(){u.outerHeight()<n.height()&&u.css({position:"relative",top:"50%","margin-top":-(u.outerHeight()/2)+"px"})})}else{var h=e('<div class="nivo-lightbox-error"><p>'+i.options.errorMessage+"</p></div>");n.html(h).removeClass("nivo-lightbox-loading")}else{if("iframe"!=o.attr("data-lightbox-type"))return!1;var f=e("<iframe>",{src:a,"class":"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});n.html(f),f.load(function(){n.removeClass("nivo-lightbox-loading")})}if(o.attr("title")){var p=e("<span>",{"class":"nivo-lightbox-title"});p.text(o.attr("title")),e(".nivo-lightbox-title-wrap").html(p)}else e(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(e(".nivo-lightbox-overlay").length)return e(".nivo-lightbox-overlay");var t=e("<div>",{"class":"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),n=e("<div>",{"class":"nivo-lightbox-wrap"}),o=e("<div>",{"class":"nivo-lightbox-content"}),i=e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),a=e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),r=e("<div>",{"class":"nivo-lightbox-title-wrap"}),l=0;l&&t.addClass("nivo-lightbox-ie"),n.append(o),n.append(r),t.append(n),t.append(i),t.append(a),e("body").append(t);var s=this;return s.options.clickOverlayToClose&&t.on("click",function(t){(t.target===this||e(t.target).hasClass("nivo-lightbox-content")||e(t.target).hasClass("nivo-lightbox-image"))&&s.destructLightbox()}),a.on("click",function(e){e.preventDefault(),s.destructLightbox()}),t},destructLightbox:function(){var t=this;this.options.beforeHideLightbox.call(this),e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),e(".nivo-lightbox-nav").hide(),e("body").removeClass("nivo-lightbox-body-effect-"+t.options.effect);var n=0;n&&(e(".nivo-lightbox-overlay iframe").attr("src"," "),e(".nivo-lightbox-overlay iframe").remove()),e(".nivo-lightbox-prev").off("click"),e(".nivo-lightbox-next").off("click"),e(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var e="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return t.devicePixelRatio>1||!(!t.matchMedia||!t.matchMedia(e).matches)}},e.fn[a]=function(t){return this.each(function(){e.data(this,a)||e.data(this,a,new i(this,t))})}}(jQuery,window,document),jQuery(function(e){e("body.portal:not(.fsComposeMode)").length&&(e(".portal-hero").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-nav").clone().addClass("portal-sub-mobile").insertBefore("#fsPageBodyWrapper"),e(".portal-sub-mobile").prepend('<div class="sub-trigger">More Pages</div>'),e(".sub-trigger").click(function(){e(this).parent().toggleClass("active")}),backgroundImage(e(".portal-news a.fsThumbnail")),backgroundImage(e(".portal-directory .fsPhoto")),e(".portal-cal footer .fsElementFooterContent").appendTo(".portal-cal > .fsElementContent > .fsListItems"),e(".portal-student-announcements").prependTo("#fsPageBody"),e(".portal-photos").insertAfter("#fsPageBodyWrapper")),onAJAXSuccess=function(t,n,o,i){o.url.indexOf("const_page")!==-1&&backgroundImage(e(".portal-directory .fsPhoto"))},e(document).ajaxSuccess(onAJAXSuccess)}),$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this};