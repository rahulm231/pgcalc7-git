/*!
	Colorbox v1.6.0
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in y[0]&&!y[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),y.focus())}function c(t){c.str!==t&&(y.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!$){$=q=!0,c(_.get("className")),y.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=(l!==!1?Math.min(h,a(l,"x")):h)-z-D,_.h=(f!==!1?Math.min(s,a(f,"y")):s)-N-j,I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(S).hide(),y.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){y||(V=!1,E=t(i),y=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),M=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),x=n(se,"Wrapper"),b=n(se,"Content").append(S=n(se,"Title"),F=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),R=n("button","Slideshow"),M),B=t('<button type="button"/>').attr({id:Z+"Close"}),x.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),L=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(F).add(R)),e.body&&!y.parent().length&&t(e.body).append(v,y.append(x,L))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return y?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;$&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),$&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if(q=!0,U=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){M.show()},100),_.get("inline")){var c=t(e);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),U=_.get("createImg"),t(U).addClass(Z+"Photo").bind("error",function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var t;_.get("retinaImage")&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){U.height-=U.height*t,U.width-=U.width*t},_.mw&&U.width>_.mw&&(t=(U.width-_.mw)/U.width,o()),_.mh&&U.height>_.mh&&(t=(U.height-_.mh)/U.height,o())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",h(U)},1)}),U.src=e):e&&L.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,y,x,b,T,C,H,k,W,E,I,L,M,S,F,R,K,P,B,O,_,j,D,N,z,A,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullScreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){R.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),y.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),R.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),y.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,R.hide(),t(),ae.unbind(ne,e).unbind(ie,t),y.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),R.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(y[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(y[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=y.offset();if(E.unbind("resize."+Z),y.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,y.css({position:"fixed"})):(l=h,d=s,y.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),y.css({top:c.top,left:c.left,visibility:"visible"}),x[0].style.width=x[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||y.css(r),y.dequeue().animate(r,{duration:e||0,complete:function(){n(),q=!1,x[0].style.width=_.w+z+D+"px",x[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(L.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),L.hide(),t(U).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&y[0].style.removeAttribute("filter")}var n,o,a=W.length;$&&(o=function(){clearTimeout(Q),M.hide(),u(ne),_.get("onComplete")},S.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&F.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?y.fadeTo(g,1,i):i())},"fade"===_.get("transition")?y.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!q&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!q&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){$&&!G&&(G=!0,$=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),y.stop().fadeTo(_.get("fadeOut")||0,0,function(){y.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){y&&(y.stop(),t[Y].close(),y.stop(!1,!0).remove(),v.remove(),G=!1,y=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    // Use "data-colorbox-gallery" if set otherwise use "rel".
    settings.colorbox.rel = function () {
      if ($(this).data('colorbox-gallery')) {
        return $(this).data('colorbox-gallery');
      }
      else {
        return $(this).attr('rel');
      }
    };

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);

    $(context).bind('cbox_complete', function () {
      Drupal.attachBehaviors('#cboxLoadedContent');
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('.colorbox-load', context)
      .once('init-colorbox-load', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
/*!
 * jQuery meanMenu v2.0.6 (Drupal Responsive Menus version)
 * @Copyright (C) 2012-2013 Chris Wharton (https://github.com/weare2ndfloor/meanMenu)
 *
 */
(function(e){"use strict";e.fn.meanmenu=function(t){var n={meanMenuTarget:jQuery(this),meanMenuContainer:"body",meanMenuClose:"X",meanMenuCloseSize:"18px",meanMenuOpen:"<span /><span /><span />",meanRevealPosition:"right",meanRevealPositionDistance:"0",meanRevealColour:"",meanRevealHoverColour:"",meanScreenWidth:"480",meanNavPush:"",meanShowChildren:true,meanExpandableChildren:true,meanExpand:"+",meanContract:"-",meanRemoveAttrs:false,onePage:false,removeElements:""};var t=e.extend(n,t);var r=document.documentElement.clientWidth||document.body.clientWidth;return this.each(function(){function x(){if(a=="center"){var e=document.documentElement.clientWidth||document.body.clientWidth;var t=e/2-22+"px";C="left:"+t+";right:auto;";if(!S){jQuery(".meanmenu-reveal").css("left",t)}else{jQuery(".meanmenu-reveal").animate({left:t})}}}function A(){if(jQuery(L).is(".meanmenu-reveal.meanclose")){L.html(s)}else{L.html(u)}}function O(){jQuery(".mean-bar,.mean-push").remove();jQuery(i).removeClass("mean-container");jQuery(e).show();T=false;N=false;jQuery(E).removeClass("mean-remove")}function M(){if(r<=h){jQuery(E).addClass("mean-remove");N=true;jQuery(i).addClass("mean-container");jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+k+'">Show Navigation</a><nav class="mean-nav"></nav></div>');var t=jQuery(n).html();jQuery(".mean-nav").html(t);if(b){jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function(){jQuery(this).removeAttr("class");jQuery(this).removeAttr("id")})}jQuery(e).before('<div class="mean-push" />');jQuery(".mean-push").css("margin-top",p);jQuery(e).hide();jQuery(".meanmenu-reveal").show();jQuery(d).html(u);L=jQuery(d);jQuery(".mean-nav ul").hide();if(v){if(m){jQuery(".mean-nav ul ul").each(function(){if(jQuery(this).children().length){jQuery(this,"li:first").parent().append('<a class="mean-expand" href="#" style="font-size: '+o+'">'+g+"</a>")}});jQuery(".mean-expand").on("click",function(e){e.preventDefault();if(jQuery(this).hasClass("mean-clicked")){jQuery(this).text(g);jQuery(this).prev("ul").slideUp(300,function(){})}else{jQuery(this).text(y);jQuery(this).prev("ul").slideDown(300,function(){})}jQuery(this).toggleClass("mean-clicked")})}else{jQuery(".mean-nav ul ul").show()}}else{jQuery(".mean-nav ul ul").hide()}jQuery(".mean-nav ul li").last().addClass("mean-last");L.removeClass("meanclose");jQuery(L).click(function(e){e.preventDefault();if(T==false){L.css("text-align","center");L.css("text-indent","0");L.css("font-size",o);jQuery(".mean-nav ul:first").slideDown();T=true}else{jQuery(".mean-nav ul:first").slideUp();T=false}L.toggleClass("meanclose");A();jQuery(E).addClass("mean-remove")});if(w){jQuery(".mean-nav ul > li > a:first-child").on("click",function(){jQuery(".mean-nav ul:first").slideUp();T=false;jQuery(L).toggleClass("meanclose").html(u)})}}else{O()}}var e=t.meanMenuTarget;var n=t.meanMenuTarget.clone();n.find(".contextual-links-wrapper").remove().find("ul.contextual-links").remove();var i=t.meanMenuContainer;var s=t.meanMenuClose;var o=t.meanMenuCloseSize;var u=t.meanMenuOpen;var a=t.meanRevealPosition;var f=t.meanRevealPositionDistance;var l=t.meanRevealColour;var c=t.meanRevealHoverColour;var h=t.meanScreenWidth;var p=t.meanNavPush;var d=".meanmenu-reveal";var v=t.meanShowChildren;var m=t.meanExpandableChildren;var g=t.meanExpand;var y=t.meanContract;var b=t.meanRemoveAttrs;var w=t.onePage;var E=t.removeElements;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i)){var S=true}if(navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i)){jQuery("html").css("overflow-y","scroll")}var T=false;var N=false;if(a=="right"){C="right:"+f+";left:auto;"}if(a=="left"){var C="left:"+f+";right:auto;"}x();var k="background:"+l+";color:"+l+";"+C;var L="";if(!S){jQuery(window).resize(function(){r=document.documentElement.clientWidth||document.body.clientWidth;if(r>h){O()}else{O()}if(r<=h){M();x()}else{O()}})}window.onorientationchange=function(){x();r=document.documentElement.clientWidth||document.body.clientWidth;if(r>=h){O()}if(r<=h){if(N==false){M()}}};M()})}})(jQuery)
;
/**
 * @file
 * Integrate Mean Menu library with Responsive Menus module.
 */
(function ($) {
  Drupal.behaviors.responsive_menus_mean_menu = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      $.each(settings.responsive_menus, function(ind, iteration) {
        if (iteration.responsive_menus_style != 'mean_menu') {
          return true;
        }
        if (!iteration.selectors.length) {
          return;
        }
        // Set 1/0 to true/false respectively.
        $.each(iteration, function(key, value) {
          if (value == 0) {
            iteration[key] = false;
          }
          if (value == 1) {
            iteration[key] = true;
          }
        });
        // Call meanmenu() with our custom settings.
        $(iteration.selectors).once('responsive-menus-mean-menu', function() {
          $(this).meanmenu({
            meanMenuClose: iteration.close_txt || "X",
            meanMenuCloseSize: iteration.close_size || "18px",
            meanMenuOpen: iteration.trigger_txt || "<span /><span /><span />",
            meanRevealPosition: iteration.position || "right",
            meanScreenWidth: iteration.media_size || "480",
            meanExpand: iteration.expand_txt || "+",
            meanContract: iteration.contract_txt || "-",
            meanShowChildren: iteration.show_children,
            meanExpandableChildren: iteration.expand_children,
            meanRemoveAttrs: iteration.remove_attrs
          });
        });
      });

    }
  };
}(jQuery));
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {
    Drupal.behaviors.colorboxNode = {
        // Lets find our class name and change our URL to
        // our defined menu path to open in a colorbox modal.
        attach: function (context, settings) {
            // Make sure colorbox exists.
            if (!$.isFunction($.colorbox)) {
                return;
            }

            // Mobile detection extracted from the colorbox module.
            // If the mobile setting is turned on, it will turn off the colorbox modal for mobile devices.
            if (settings.colorbox.mobiledetect && window.matchMedia) {
                // Disable Colorbox for small screens.
                mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
                if (mq.matches) {
                    return;
                }
            }


            $('.colorbox-node', context).once('init-colorbox-node-processed', function () {
                $(this).colorboxNode({'launch': false});
            });

            // When using contextual links and clicking from within the colorbox
            // we need to close down colorbox when opening the built in overlay.
            $('ul.contextual-links a', context).once('colorboxNodeContextual').click(function () {
                $.colorbox.close();
            });
        }
    };

    // Bind our colorbox node functionality to an anchor
    $.fn.colorboxNode = function (options) {
        var settings = {
            'launch': true
        };

        $.extend(settings, options);

        var href = $(this).attr('data-href');
        if (typeof href == 'undefined' || href == false) {
            href = $(this).attr('href');
        }
        // Create an element so we can parse our a URL no matter if its internal or external.
        var parse = document.createElement('a');
        parse.href = href;
        // Lets add our colorbox link after the base path if necessary.
        var base_path = Drupal.settings.basePath;
        var pathname = parse.pathname;

        // Lets check to see if the pathname has a forward slash.
        // This problem happens in IE7/IE8
        if (pathname.charAt(0) != '/') {
            pathname = '/' + parse.pathname;
        }

        // If clean URL's are not turned on, lets check for that.
        var url = $.getParameterByName('q', href);
        if (base_path != '/') {
            if (url != '') {
                var link = pathname.replace(base_path, base_path + '?q=colorbox/') + url;
            } else {
                console.log('check2');
                var link = pathname.replace(base_path, base_path + 'colorbox/') + parse.search;
            }
        } else {
            if (url != '') {
                var link = base_path + '?q=colorbox' + pathname + url;
            } else {
                var link = base_path + 'colorbox' + pathname + parse.search;
            }
        }

        // Bind Ajax behaviors to all items showing the class.
        var element_settings = {};

        // This removes any loading/progress bar on the clicked link
        // and displays the colorbox loading screen instead.
        element_settings.progress = { 'type': 'none' };
        // For anchor tags, these will go to the target of the anchor rather
        // than the usual location.
        if (href) {
            element_settings.url = link;
            element_settings.event = 'click';
        }

        $(this).click(function () {
            $this = $(this).clone();

            // Clear out the rel to prevent any confusion if not using the gallery class.
            if(!$this.hasClass('colorbox-node-gallery')) {
                $this.attr('rel', '');
            }

            // Lets extract our width and height giving priority to the data attributes.
            var innerWidth = $this.data('inner-width');
            var innerHeight = $this.data('inner-height');
            if (typeof innerWidth != 'undefined' && typeof innerHeight != 'undefined') {
                var params = $.urlDataParams(innerWidth, innerHeight);
            } else {
                var params = $.urlParams(href);
            }

            params.html = '<div id="colorboxNodeLoading"></div>';
            params.onComplete = function () {
                $this.colorboxNodeGroup();
            }
            params.open = true;

            // Launch our colorbox with the provided settings
            $this.colorbox($.extend({}, Drupal.settings.colorbox, params));
        });

        // Log our click handler to our ajax object
        var base = $(this).attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Default to auto click for manual call to this function.
        if (settings.launch) {
            Drupal.ajax[base].eventResponse(this, 'click');
            $(this).click();
        }
    }

    // Allow for grouping on links to showcase a gallery with left/right arrows.
    // This function will find the next index of each link on the page by the rel
    // and manually force a click on the link to call that AJAX and update the
    // modal window.
    $.fn.colorboxNodeGroup = function () {
        // Lets do setup our gallery type of functions.
        var $this = $(this);
        var rel = $this.attr('rel');
        if(rel && $this.hasClass('colorbox-node-gallery')) {
            if ($('a.colorbox-node-gallery[rel="' + rel + '"]:not("#colorbox a[rel="' + rel + '"]")').length > 1) {
                $related = $('a.colorbox-node-gallery[rel="' + rel + '"]:not("#colorbox a[rel="' + rel + '"]")');

                // filter $related array by href, to have mutliple colorbox links to the same target
                // appear as one item in the gallery only
                var $related_unique = [];
                $related.each(function() {
                    findHref($related_unique, this.href);
                    if (!findHref($related_unique, this.href).length) {
                        $related_unique.push(this);
                    }
                });
                // we have to get the actual used element from the filtered list in order to get it's relative index
                var current = findHref($related_unique, $this.get(0).href);
                $related = $($related_unique);
                var idx = $related.index($(current));
                var tot = $related.length;

                // Show our gallery buttons
                $('#cboxPrevious, #cboxNext').show();
                $.colorbox.next = function () {
                    index = getIndex(1);
                    $related[index].click();
                };
                $.colorbox.prev = function () {
                    index = getIndex(-1);
                    $related[index].click();
                };

                // Setup our current HTML
                $('#cboxCurrent').html(Drupal.settings.colorbox.current.replace('{current}', idx + 1).replace('{total}', tot)).show();

                var prefix = 'colorbox';
                // Remove Bindings and re-add
                // @TODO: There must be a better way?  If we don't remove it causes a memory to be exhausted.
                $(document).unbind('keydown.' + prefix);

                // Add Key Bindings
                $(document).bind('keydown.' + prefix, function (e) {
                    var key = e.keyCode;
                    if ($related[1] && !e.altKey) {
                        if (key === 37) {
                            e.preventDefault();
                            $.colorbox.prev();
                        } else if (key === 39) {
                            e.preventDefault();
                            $.colorbox.next();
                        }
                    }
                });
            }

            function getIndex(increment) {
                var max = $related.length;
                var newIndex = (idx + increment) % max;
                return (newIndex < 0) ? max + newIndex : newIndex;
            }

            // Find a colorbox link by href in an array
            function findHref(items, href){
                return $.grep(items, function(n, i){
                    return n.href == href;
                });
            };
        }
    }

    // Utility function to parse out our width/height from our url params
    $.urlParams = function (url) {
        var p = {},
            e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function (s) {
                return decodeURIComponent(s.replace(a, ' '));
            },
            q = url.split('?');
        while (e = r.exec(q[1])) {
            e[1] = d(e[1]);
            e[2] = d(e[2]);
            switch (e[2].toLowerCase()) {
                case 'true':
                case 'yes':
                    e[2] = true;
                    break;
                case 'false':
                case 'no':
                    e[2] = false;
                    break;
            }
            if (e[1] == 'width') {
                e[1] = 'innerWidth';
            }
            if (e[1] == 'height') {
                e[1] = 'innerHeight';
            }
            p[e[1]] = e[2];
        }
        return p;
    };

    // Utility function to return our data attributes for width/height
    $.urlDataParams = function (innerWidth, innerHeight) {
        return {'innerWidth':innerWidth,'innerHeight':innerHeight};
    };

    $.getParameterByName = function(name, href) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexString = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexString);
        var found = regex.exec(href);
        if(found == null)
            return "";
        else
            return decodeURIComponent(found[1].replace(/\+/g, " "));
    }

})(jQuery);
;
