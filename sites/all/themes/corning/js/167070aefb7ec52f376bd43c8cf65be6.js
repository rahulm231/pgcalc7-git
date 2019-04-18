(function ($) {

  var initTracking = function () {

    if (typeof _gaq == 'undefined') return false;

    // Top-Level Navigation Links
    $('#main-menu > li > a').click(function () {
      _gaq.push(['_trackEvent', 'Main Menu', 'Link', $(this).text()]);
    });

    // Mega Menu Navigation Links
    $('.mega-list a').click(function () {
      _gaq.push(['_trackEvent', 'Mega Menu', 'Link', $(this).text()]);
    });

    // Mega Menu Callout Links
    $('#nav-wrapper a.callout-link').click(function () {
      _gaq.push(['_trackEvent', 'Mega Menu', 'Callout', $(this).text()]);
    });

    // Side Nav Links
    $('.sidebar-left .menu a').click(function () {
      _gaq.push(['_trackEvent', 'Side Nav', 'Link', $(this).text()]);
    });

    // Footer Language Links
    $('.footer-language > a').click(function () {
      _gaq.push(['_trackEvent', 'Footer Language', 'Link', $(this).text()]);
    });

    // Footer Menu Links
    $('.region-footer-left a').click(function () {
      _gaq.push(['_trackEvent', 'Footer Nav', 'Link', $(this).text()]);
    });

    // Footer Watermark
    $('a.watermark').click(function () {
      _gaq.push(['_trackEvent', 'Footer Hotspot', 'Link', $(this).text()]);
    });

    // User Menu Links
    $('#site-slogan a').click(function () {
      _gaq.push(['_trackEvent', 'User Nav', 'Link', $(this).text()]);
    });

    //  CMOG Logo
    $('#branding #logo a').click(function () {
      _gaq.push(['_trackEvent', 'Header Branding', 'Link', 'cmog logo']);
    });

    //  CMOG Name
    $('#branding #site-name a').click(function () {
      _gaq.push(['_trackEvent', 'Header Branding', 'Link', 'cmog name']);
    });

    //  Add to Set
    $('a.add-to-set').click(function () {
      _gaq.push(['_trackEvent', 'Add to Set', 'Link', $(this).text()]);
    });

    //  TOC Nav Links
    $('.toc-menu a').click(function () {
      _gaq.push(['_trackEvent', 'TOC Links', 'Link', $(this).text()]);
    });

    //  TOC Top Links
    $('a.toc-top').click(function () {
      _gaq.push(['_trackEvent', 'TOC Links', 'Link', $(this).text()]);
    });


    // Home Page Image Slider
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', '.view-homepage-slider .views-row a', function () {
        var id = $('.homepage-slider-title', this).text();
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', id]);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('.view-homepage-slider .views-row a').live('click', function () {
        var id = $('.homepage-slider-title', this).text();
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', id]);
      });
    }

    // Home Page Image Slider Next / Prev
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', '.view-homepage-slider .homepage-slider-nav', function () {
        var id = $(this).is('.homepage-slider-nav-next') ? 'Next' : 'Previous';
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', id]);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('.view-homepage-slider .homepage-slider-nav').live('click', function () {
        var id = $(this).is('.homepage-slider-nav-next') ? 'Next' : 'Previous';
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', id]);
      });
    }

    // Home Page Image Slider Nav
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', '.view-homepage-slider .homepage-slider-nav-index a', function () {
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', 'Navigation']);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('.view-homepage-slider .homepage-slider-nav-index a').live('click', function () {
        _gaq.push(['_trackEvent', 'Homepage Slider', 'Click', 'Navigation']);
      });
    }


    // Collection Navigation Links
    $('.search-navigator a').click(function () {
      var type = null;
      switch (true) {
        case ($('body').hasClass('node-type-library')):
          type = 'Library';
          break;
        case ($('body').hasClass('node-type-artwork')):
          type = 'Artwork';
          break;
      }

      var id = null;
      switch ($(this).parent().attr('class')) {
        case 'next-item':
          id = 'Next';
          break;
        case 'navigation-summary':
          id = 'Search Result';
          break;
        case 'previous-item':
          id = 'Previous';
          break;
      }

      if (type && id) {
        _gaq.push(['_trackEvent', type, 'Click', id]);
      }
    });

    // Tickets Links
    $('a[href^="http://reservations"]').click(function () {
      var id = $('title').text().split(' | ')[0];
      if ($(this).parents('ul.mega-list').length) id = 'Mega Menu';

      _gaq.push(['_trackEvent', 'Tickets', 'Click', id]);
    });

    // Make Your Own Glass View
    $('.view-make-your-own-glass .views-row a').click(function () {
      var id = _buildViewLabel(this);
      _gaq.push(['_trackEvent', 'MYOG', 'Click', id]);
    });

    // Home Page Featured Articles View
    $('body.front .view-featured-articles .views-row a').click(function () {
      var id = _buildViewLabel(this);
      _gaq.push(['_trackEvent', 'Homepage Featured Articles', 'Click', id]);
    });

    // Home Page Upcoming Events
    $('body.front .view-event-front-page .views-row a').click(function () {
      var id = _buildViewLabel(this);
      _gaq.push(['_trackEvent', 'Homepage Upcoming Events', 'Click', id]);
    });

    // Home Page Special Exhibitions
    $('body.front .view-exhibition-front-page .views-row a').click(function () {
      var id = _buildViewLabel(this);
      _gaq.push(['_trackEvent', 'Homepage Special Exhibitions', 'Click', id]);
    });

    // Home Page Accordion Links
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', 'body.front .accordion-panel a', function () {
        var id = $(this).find('h4').text();
        _gaq.push(['_trackEvent', 'Homepage Accordion', 'Click', id]);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('body.front .accordion-panel a').live('click', function () {
        var id = $(this).find('h4').text();
        _gaq.push(['_trackEvent', 'Homepage Accordion', 'Click', id]);
      });
    }


    // Home Page Accordion Toggle Panels
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', 'body.front .accordion-panel-control-container', function () {
        var id = $(this).closest('.accordion-panel').find('h4').text();
        _gaq.push(['_trackEvent', 'Homepage Accordion', 'Toggle', id]);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('body.front .accordion-panel-control-container').live('click', function () {
        var id = $(this).closest('.accordion-panel').find('h4').text();
        _gaq.push(['_trackEvent', 'Homepage Accordion', 'Toggle', id]);
      });

    }

    // Plan Your Visit
    $('.view-plan-your-visit a').click(function () {
      var id = $(this).closest('.views-row').find('.callout-markup a').eq(0).text();
      _gaq.push(['_trackEvent', 'Plan Your Visit', 'Click', id]);
    });

    // Search Results
    if ($.isFunction($.fn.on)) {
      // For jQuery 1.7+
      $(document).on('click', '#search-results-list a', function () {
        var test = $(this).closest('.result-list-item').find('.class-instructor');
        if (!test.length) return true;

        var id = _buildSearchLabel(this) + ' - ' + $(this).closest('.result-list-item').find('.field-name-field-event-date .field-item').eq(0).text();
        _gaq.push(['_trackEvent', 'Studio Classes', 'Click', id]);
      });
    } else {
      // For jQuery 1.3.x -> 1.6.x
      // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
      // This is not here for jQuery 1.9, it's here for legacy users.
      $('#search-results-list a').live('click', function () {
        var test = $(this).closest('.result-list-item').find('.class-instructor');
        if (!test.length) return true;

        var id = _buildSearchLabel(this) + ' - ' + $(this).closest('.result-list-item').find('.field-name-field-event-date .field-item').eq(0).text();
        _gaq.push(['_trackEvent', 'Studio Classes', 'Click', id]);
      });
    }


  }

  // Parses a view to return a human-readable id
  var _buildViewLabel = function (el) {
    var title = $(el).closest('.views-row').find('.views-field-title a').text();
    var type = ($(el).children('img').length)
      ? 'image'
      : ($(el).is('.more-link') || $(el).parent().is('.more-link'))
        ? 'more'
        : 'title';
    return title + ' (' + type + ')';
  }

  // Parses search pane to return a human-readable id
  var _buildSearchLabel = function (el) {
    var title = $(el).closest('.result-list-item').find('.list-item-description a').eq(0).text();
    var type = ($(el).children('img').length)
      ? 'image'
      : 'title';
    return title + ' (' + type + ')';
  }

  Drupal.behaviors.eventTracking = {
    attach: initTracking
  }

})(jQuery);
;
(function($) {
  $(document).ready(function(){
    if ( $("details").length > 0 ) { // details element polyfill
      if (!('open' in document.createElement('details'))) { // check for existence 'open' attribute on created element to determine if browser has native support
        (function(){}).call(this),function(){var t,e,n,r,o,u,i,a,l;i={element:function(){var t,e,n,r,o;return e=document.createElement("details"),"open"in e?(e.innerHTML="<summary>a</summary>b",e.setAttribute("style","position: absolute; left: -9999px"),r=null!=(o=document.body)?o:document.documentElement,r.appendChild(e),t=e.offsetHeight,e.open=!0,n=e.offsetHeight,r.removeChild(e),t!==n):!1}(),toggleEvent:function(){var t;return t=document.createElement("details"),"ontoggle"in t}()},i.element&&i.toggleEvent||(r=function(){return document.head.insertAdjacentHTML("afterbegin",'<style>@charset"UTF-8";details{display:block;}details:not([open])>*:not(summary){display:none;}details>summary{display:block;}details>summary::before{content:"\u25ba";padding-right:0.3rem;font-size:0.6rem;cursor:default;}details[open]>summary::before{content:"\u25bc";}</style>')},n=function(){var t,e,n,r,o;return t=document.createElement("details").constructor.prototype,r=t.setAttribute,n=t.removeAttribute,o=null!=(e=Object.getOwnPropertyDescriptor(t,"open"))?e.set:void 0,Object.defineProperties(t,{open:{set:function(t){return"DETAILS"===this.tagName?(t?this.setAttribute("open",""):this.removeAttribute("open"),t):null!=o?o.call(this,t):void 0}},setAttribute:{value:function(t,e){return l(this,function(n){return function(){return r.call(n,t,e)}}(this))}},removeAttribute:{value:function(t){return l(this,function(e){return function(){return n.call(e,t)}}(this))}}})},o=function(){return e(function(t){return t.hasAttribute("open")?t.removeAttribute("open"):t.setAttribute("open","")})},u=function(){var t;return"undefined"!=typeof MutationObserver&&null!==MutationObserver?(t=new MutationObserver(function(t){var e,n,r,o,u,i;for(u=[],n=0,r=t.length;r>n;n++)o=t[n],i=o.target,e=o.attributeName,"DETAILS"===i.tagName&&"open"===e?u.push(a(i)):u.push(void 0);return u}),t.observe(document.documentElement,{attributes:!0,subtree:!0})):e(function(t){var e;return e=t.getAttribute("open"),setTimeout(function(){return t.getAttribute("open")!==e?a(t):void 0},1)})},t=function(t){return!(t.defaultPrevented||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||t.target.isContentEditable)},e=function(e){return addEventListener("click",function(n){var r,o,u;return t(n)&&(o=n.target,u=o.tagName,r=o.parentElement,"SUMMARY"===u&&"DETAILS"===(null!=r?r.tagName:void 0))?e(r):void 0},!1)},a=function(t){var e;return e=document.createEvent("Events"),e.initEvent("toggle",!0,!1),t.dispatchEvent(e)},l=function(t,e){var n,r;return n=t.getAttribute("open"),r=e(),t.getAttribute("open")!==n&&a(t),r},i.element||(r(),n(),o()),i.element&&!i.toggleEvent&&u())}.call(this),function(){}.call(this);
      }
    }
  });

})(jQuery);
;
