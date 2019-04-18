<!DOCTYPE html>
<!--[if lt IE 9]><html class="lt-ie9" original-class="lt-ie9" lang="en" dir="ltr"><![endif]--><!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html lang="en" dir="ltr" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# book: http://ogp.me/ns/book# profile: http://ogp.me/ns/profile# video: http://ogp.me/ns/video# product: http://ogp.me/ns/product# content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ rdfs: http://www.w3.org/2000/01/rdf-schema# sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#"><!--<![endif]--><head profile="http://www.w3.org/1999/xhtml/vocab"><!--[if IE]><![endif]--><!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<![endif]--><meta charset="utf-8"><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var o=n[t]={exports:{}};e[t][0].call(o.exports,function(n){var o=e[t][1][n];return r(o||n)},o,o.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({1:[function(e,n,t){function r(){}function o(e,n,t){return function(){return i(e,[c.now()].concat(u(arguments)),n?null:this,t),n?void 0:this}}var i=e("handle"),a=e(2),u=e(3),f=e("ee").get("tracer"),c=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,n){s[n]=o(d+n,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),n.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,n){var t={},r=this,o="function"==typeof n;return i(l+"tracer",[c.now(),e,t],r),function(){if(f.emit((o?"":"no-")+"fn-start",[c.now(),r,o],t),o)try{return n.apply(this,arguments)}finally{f.emit("fn-end",[c.now()],t)}}}};a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,n){m[n]=o(l+n)}),newrelic.noticeError=function(e){"string"==typeof e&&(e=new Error(e)),i("err",[e,c.now()])}},{}],2:[function(e,n,t){function r(e,n){var t=[],r="",i=0;for(r in e)o.call(e,r)&&(t[i]=n(r,e[r]),i+=1);return t}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],3:[function(e,n,t){function r(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(o<0?0:o);++r<o;)i[r]=e[n+r];return i}n.exports=r},{}],4:[function(e,n,t){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,n,t){function r(){}function o(e){function n(e){return e&&e instanceof r?e:e?f(e,u,i):i()}function t(t,r,o,i){if(!d.aborted||i){e&&e(t,r,o);for(var a=n(o),u=m(t),f=u.length,c=0;c<f;c++)u[c].apply(a,r);var p=s[y[t]];return p&&p.push([b,t,r,a]),a}}function l(e,n){v[e]=m(e).concat(n)}function m(e){return v[e]||[]}function w(e){return p[e]=p[e]||o(t)}function g(e,n){c(e,function(e,t){n=n||"feature",y[t]=n,n in s||(s[n]=[])})}var v={},y={},b={on:l,emit:t,get:w,listeners:m,context:n,buffer:g,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",f=e("gos"),c=e(2),s={},p={},d=n.exports=o();d.backlog=s},{}],gos:[function(e,n,t){function r(e,n,t){if(o.call(e,n))return e[n];var r=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(e,n,t){function r(e,n,t,r){o.buffer([e],r),o.emit(e,n,t)}var o=e("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(e,n,t){function r(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");n.exports=r},{}],loader:[function(e,n,t){function r(){if(!x++){var e=h.info=NREUM.info,n=d.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&n))return s.abort();c(y,function(n,t){e[n]||(e[n]=t)}),f("mark",["onload",a()+h.offset],null,"api");var t=d.createElement("script");t.src="https://"+e.agent,n.parentNode.insertBefore(t,n)}}function o(){"complete"===d.readyState&&i()}function i(){f("mark",["domContent",a()+h.offset],null,"api")}function a(){return E.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-h.offset}var u=(new Date).getTime(),f=e("handle"),c=e(2),s=e("ee"),p=window,d=p.document,l="addEventListener",m="attachEvent",w=p.XMLHttpRequest,g=w&&w.prototype;NREUM.o={ST:setTimeout,SI:p.setImmediate,CT:clearTimeout,XHR:w,REQ:p.Request,EV:p.Event,PR:p.Promise,MO:p.MutationObserver};var v=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1044.min.js"},b=w&&g&&g[l]&&!/CriOS/.test(navigator.userAgent),h=n.exports={offset:u,now:a,origin:v,features:{},xhrWrappable:b};e(1),d[l]?(d[l]("DOMContentLoaded",i,!1),p[l]("load",r,!1)):(d[m]("onreadystatechange",o),p[m]("onload",r)),f("mark",["firstbyte",u],null,"api");var x=0,E=e(4)},{}]},{},["loader"]);</script><link rel="shortcut icon" href="/sites/all/themes/bentley2/linked/bentley-favicon_1.ico" type="image/vnd.microsoft.icon"><!--<script>(function() {
 var _fbq = window._fbq || (window._fbq = []);
 if (!_fbq.loaded) {
 var fbds = document.createElement('script');
 fbds.async = true;
 fbds.src = '//connect.facebook.net/en_US/fbds.js';
 var s = document.getElementsByTagName('script')[0];
 s.parentNode.insertBefore(fbds, s);
 _fbq.loaded = true;
 }
 _fbq.push(['addPixelId', '766692573417884']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
--><noscript><img height="1" width="1" alt="" style="display:none" src="/sites/all/themes/bentley2/img/tr"></noscript><script src="/sites/all/themes/bentley2/js/oct.js" type="text/javascript"></script><script type="text/javascript">
twttr.conversion.trackPid('l5bzt');</script><noscript>
<img height="1" width="1" style="display:none;" alt="" src="/sites/all/themes/bentley2/img/adsct"><img height="1" width="1" style="display:none;" alt="" src="/sites/all/themes/bentley2/img/5a394be838182"></noscript><!-- Hotjar Tracking Code for http://www.bentley.edu --><script>
 (function(h,o,t,j,a,r){
 h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
 h._hjSettings={hjid:225927,hjsv:5};
 a=o.getElementsByTagName('head')[0];
 r=o.createElement('script');r.async=1;
 r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
 a.appendChild(r);
 })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script><meta name="description" content="Bentley University in Massachusetts is one of the nation&rsquo;s leading business schools with undergraduate offerings, MBA programs and seven MS degrees. Among universities in Boston, Bentley is recognized for its accounting programs, IT degrees, college technology and experiential learning opportunities."><meta name="generator" content="Drupal"><title><?php print $head_title; ?></title><meta name="MobileOptimized" content="width"><meta name="HandheldFriendly" content="true"><meta name="viewport" content="width=device-width"><meta http-equiv="cleartype" content="on"><meta property="fb:admins" content="bent.falcon"><style>
@import url("/sites/all/themes/bentley2/css/system.base.css");
@import url("/sites/all/themes/bentley2/css/system.messages.css");
@import url("/sites/all/themes/bentley2/css/system.theme.css");
</style><style>
@import url("/sites/all/themes/bentley2/css/jquery.ui.core.min.css");
@import url("/sites/all/themes/bentley2/css/jquery.ui.theme.min.css");
@import url("/sites/all/themes/bentley2/css/jquery.ui.accordion.min.css");
@import url("/sites/all/themes/bentley2/css/jquery.ui.tabs.min.css");
@import url("/sites/all/themes/bentley2/css/jquery.ui.menu.min.css");
@import url("/sites/all/themes/bentley2/css/jquery.ui.autocomplete.min.css");
</style><style>
@import url("/sites/all/themes/bentley2/css/adaptive-image.css");
@import url("/sites/all/themes/bentley2/css/bentley_tweaks.css");
@import url("/sites/all/themes/bentley2/css/videojs.css");
@import url("/sites/all/themes/bentley2/css/comment.css");
@import url("/sites/all/themes/bentley2/css/datepicker.1.7.css");
@import url("/sites/all/themes/bentley2/css/field.css");
@import url("/sites/all/themes/bentley2/css/google_cse.css");
@import url("/sites/all/themes/bentley2/css/mollom.css");
@import url("/sites/all/themes/bentley2/css/node.css");
@import url("/sites/all/themes/bentley2/css/poll.css");
@import url("/sites/all/themes/bentley2/css/search.css");
@import url("/sites/all/themes/bentley2/css/user.css");
@import url("/sites/all/themes/bentley2/css/views.css");
</style><style>
@import url("/sites/all/themes/bentley2/css/apachesolr_autocomplete.css");
@import url("/sites/all/themes/bentley2/css/jquery.autocomplete.css");
@import url("/sites/all/themes/bentley2/css/colorbox_style.css");
@import url("/sites/all/themes/bentley2/css/ctools.css");
@import url("/sites/all/themes/bentley2/css/panels.css");
@import url("/sites/all/themes/bentley2/css/views_slideshow.css");
@import url("/sites/all/themes/bentley2/css/font-awesome.css");
@import url("/sites/all/themes/bentley2/css/bentley_tweaks_charcounter.css");
</style><style>
@import url("/sites/all/themes/bentley2/css/normalize.css");
@import url("/sites/all/themes/bentley2/css/wireframes.css");
@import url("/sites/all/themes/bentley2/css/responsive-sidebars.css");
@import url("/sites/all/themes/bentley2/css/tabs.css");
@import url("/sites/all/themes/bentley2/css/pages.css");
@import url("/sites/all/themes/bentley2/css/ecosystem.css");
@import url("/sites/all/themes/bentley2/css/blocks.css");
@import url("/sites/all/themes/bentley2/css/navigation.css");
@import url("/sites/all/themes/bentley2/css/views-styles.css");
@import url("/sites/all/themes/bentley2/css/nodes.css");
@import url("/sites/all/themes/bentley2/css/comments.css");
@import url("/sites/all/themes/bentley2/css/forms.css");
@import url("/sites/all/themes/bentley2/css/fields.css");
@import url("/sites/all/themes/bentley2/css/print.css");
@import url("/sites/all/themes/bentley2/css/home.css");
</style><!--[if lte IE 8]>
<style>
@import url("/sites/all/themes/bentley2/css/lte-ie8.css");
</style>
<![endif]--><script src="/sites/all/themes/bentley2/js/modernizr.min.js"></script><!--<script>document.cookie='adaptive_image='+Math.max(screen.width,screen.height)+';</script>--><script src="/sites/all/themes/bentley2/js/1b843e8194c772a0d4525f75864fca7d.js"></script>
<?php
print $head;
print $styles;
print $scripts;
?>
<!--[if IE 7]>
<link rel="stylesheet" href="/sites/all/themes/pgcalc_master/ie7/ie7.css">
<![endif]-->
</head>
<?php
print $page_top;
print $page;
print $page_bottom;
?>
</html>
