<!DOCTYPE html>
<!--[if IEMobile 7]><html class="no-js ie iem7" original-class="no-js ie iem7" lang="en" dir="ltr"><![endif]--><!--[if lte IE 6]><html class="no-js ie lt-ie9 lt-ie8 lt-ie7" original-class="no-js ie lt-ie9 lt-ie8 lt-ie7" lang="en" dir="ltr"><![endif]--><!--[if (IE 7)&(!IEMobile)]><html class="no-js ie lt-ie9 lt-ie8" original-class="no-js ie lt-ie9 lt-ie8" lang="en" dir="ltr"><![endif]--><!--[if IE 8]><html class="no-js ie lt-ie9" original-class="no-js ie lt-ie9" lang="en" dir="ltr"><![endif]--><!--[if (gte IE 9)|(gt IEMobile 7)]><html class="no-js ie" original-class="no-js ie" lang="en" dir="ltr" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# book: http://ogp.me/ns/book# profile: http://ogp.me/ns/profile# video: http://ogp.me/ns/video# product: http://ogp.me/ns/product#"><![endif]--><!--[if !IE]><!--><html class="no-js" original-class="no-js" lang="en" dir="ltr" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# book: http://ogp.me/ns/book# profile: http://ogp.me/ns/profile# video: http://ogp.me/ns/video# product: http://ogp.me/ns/product#"><!--<![endif]--><head><!--[if IE]><![endif]--><link rel="dns-prefetch" href="//s7.addthis.com"><link rel="preconnect" href="//s7.addthis.com"><link rel="dns-prefetch" href="//maxcdn.bootstrapcdn.com"><link rel="preconnect" href="//maxcdn.bootstrapcdn.com"><link rel="preconnect" href="//fonts.gstatic.com" crossorigin=""><link rel="dns-prefetch" href="//fonts.gstatic.com"><link rel="preconnect" href="//cse.google.com"><link rel="dns-prefetch" href="//cse.google.com"><link rel="preconnect" href="//google_tag"><link rel="dns-prefetch" href="//google_tag"><link rel="dns-prefetch" href="//facebook_tracking_pixel"><link rel="preconnect" href="//facebook_tracking_pixel"><link rel="dns-prefetch" href="//www.google-analytics.com"><link rel="preconnect" href="//www.google-analytics.com"><link rel="dns-prefetch" href="//stats.g.doubleclick.net"><link rel="preconnect" href="//stats.g.doubleclick.net"><meta charset="utf-8"><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var o=n[t]={exports:{}};e[t][0].call(o.exports,function(n){var o=e[t][1][n];return r(o||n)},o,o.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({1:[function(e,n,t){function r(){}function o(e,n,t){return function(){return i(e,[c.now()].concat(u(arguments)),n?null:this,t),n?void 0:this}}var i=e("handle"),a=e(3),u=e(4),f=e("ee").get("tracer"),c=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,n){s[n]=o(d+n,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),n.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,n){var t={},r=this,o="function"==typeof n;return i(l+"tracer",[c.now(),e,t],r),function(){if(f.emit((o?"":"no-")+"fn-start",[c.now(),r,o],t),o)try{return n.apply(this,arguments)}catch(e){throw f.emit("fn-err",[arguments,this,e],t),e}finally{f.emit("fn-end",[c.now()],t)}}}};a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,n){m[n]=o(l+n)}),newrelic.noticeError=function(e,n){"string"==typeof e&&(e=new Error(e)),i("err",[e,c.now(),!1,n])}},{}],2:[function(e,n,t){function r(e,n){if(!o)return!1;if(e!==o)return!1;if(!n)return!0;if(!i)return!1;for(var t=i.split("."),r=n.split("."),a=0;a<r.length;a++)if(r[a]!==t[a])return!1;return!0}var o=null,i=null,a=/Version\/(\S+)\s+Safari/;if(navigator.userAgent){var u=navigator.userAgent,f=u.match(a);f&&u.indexOf("Chrome")===-1&&u.indexOf("Chromium")===-1&&(o="Safari",i=f[1])}n.exports={agent:o,version:i,match:r}},{}],3:[function(e,n,t){function r(e,n){var t=[],r="",i=0;for(r in e)o.call(e,r)&&(t[i]=n(r,e[r]),i+=1);return t}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],4:[function(e,n,t){function r(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(o<0?0:o);++r<o;)i[r]=e[n+r];return i}n.exports=r},{}],5:[function(e,n,t){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,n,t){function r(){}function o(e){function n(e){return e&&e instanceof r?e:e?f(e,u,i):i()}function t(t,r,o,i){if(!d.aborted||i){e&&e(t,r,o);for(var a=n(o),u=v(t),f=u.length,c=0;c<f;c++)u[c].apply(a,r);var p=s[y[t]];return p&&p.push([b,t,r,a]),a}}function l(e,n){h[e]=v(e).concat(n)}function m(e,n){var t=h[e];if(t)for(var r=0;r<t.length;r++)t[r]===n&&t.splice(r,1)}function v(e){return h[e]||[]}function g(e){return p[e]=p[e]||o(t)}function w(e,n){c(e,function(e,t){n=n||"feature",y[t]=n,n in s||(s[n]=[])})}var h={},y={},b={on:l,addEventListener:l,removeEventListener:m,emit:t,get:g,listeners:v,context:n,buffer:w,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",f=e("gos"),c=e(3),s={},p={},d=n.exports=o();d.backlog=s},{}],gos:[function(e,n,t){function r(e,n,t){if(o.call(e,n))return e[n];var r=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(e,n,t){function r(e,n,t,r){o.buffer([e],r),o.emit(e,n,t)}var o=e("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(e,n,t){function r(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");n.exports=r},{}],loader:[function(e,n,t){function r(){if(!E++){var e=x.info=NREUM.info,n=l.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&n))return s.abort();c(y,function(n,t){e[n]||(e[n]=t)}),f("mark",["onload",a()+x.offset],null,"api");var t=l.createElement("script");t.src="https://"+e.agent,n.parentNode.insertBefore(t,n)}}function o(){"complete"===l.readyState&&i()}function i(){f("mark",["domContent",a()+x.offset],null,"api")}function a(){return O.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-x.offset}var u=(new Date).getTime(),f=e("handle"),c=e(3),s=e("ee"),p=e(2),d=window,l=d.document,m="addEventListener",v="attachEvent",g=d.XMLHttpRequest,w=g&&g.prototype;NREUM.o={ST:setTimeout,SI:d.setImmediate,CT:clearTimeout,XHR:g,REQ:d.Request,EV:d.Event,PR:d.Promise,MO:d.MutationObserver};var h=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1118.min.js"},b=g&&w&&w[m]&&!/CriOS/.test(navigator.userAgent),x=n.exports={offset:u,now:a,origin:h,features:{},xhrWrappable:b,userAgent:p};e(1),l[m]?(l[m]("DOMContentLoaded",i,!1),d[m]("load",r,!1)):(l[v]("onreadystatechange",o),d[v]("onload",r)),f("mark",["firstbyte",u],null,"api");var E=0,O=e(5)},{}]},{},["loader"]);</script><link rel="profile" href="/sites/all/themes/aier2/linked/vocab"><link rel="apple-touch-icon-precomposed" href="/sites/all/themes/aier2/linked/7de423e50154e5a9f5b9c6f018480972.png" sizes="114x114"><link rel="shortcut icon" href="/sites/all/themes/aier2/linked/favicon.ico" type="image/vnd.microsoft.icon"><meta name="HandheldFriendly" content="true"><meta name="MobileOptimized" content="width"><meta http-equiv="cleartype" content="on"><link rel="apple-touch-icon-precomposed" href="/sites/all/themes/aier2/linked/9d8ab759f8b3bdc2decd6551e18da8c6.png" sizes="144x144"><link rel="apple-touch-icon-precomposed" href="/sites/all/themes/aier2/linked/apple-touch-icon-precomposed.png"><link rel="apple-touch-icon-precomposed" href="/sites/all/themes/aier2/linked/b88f0ffa7c364401fb4e2aa9285a654d.png" sizes="72x72"><meta name="description" content="The American Institute for Economic Research is a not-for-profit that&nbsp;educates Americans on the value of personal freedom, free enterprise, property rights, limited government and sound money. The institute owns various assets and one is a fully owned subsidiary, American Investment Services, Inc. (AIS). &nbsp;AIS is an S.E.C. Registered Investment Adviser founded in 1978 and is"><meta name="abstract" content="AIER helps people build the economic and financial capacity to live free, independent, and fulfilling lives. Non-profit and independent, we provide research-based insights and information on how best to pursue your economic and financial goals."><meta name="robots" content="follow, index"><meta name="keywords" content="Business Conditions Monthly, Business-Cycle Conditions, Daily Economy, Executive Briefs, Research Briefs, Everyday Price Index, Research Studies, Inflation Reports, Economic Bulletin, Special Reports, Modern Portfolio Theory"><meta name="viewport" content="width=device-width"><meta name="generator" content="Drupal 7 (http://drupal.org)"><link rel="canonical" href="https://www.aier.org/american-investment-services-inc"><link rel="shortlink" href="https://www.aier.org/node/4170"><meta property="og:title" content="American Investment Services, Inc."><meta property="og:description" content="The American Institute for Economic Research is a not-for-profit that&nbsp;educates Americans on the value of personal freedom, free enterprise, property rights, limited government and sound money. The institute owns various assets and one is a fully owned subsidiary, American Investment Services, Inc. (AIS). &nbsp;AIS is an S.E.C. Registered Investment Adviser founded in 1978 and is governed by a Board of Directors appointed by AIER.&nbsp;AIS provides low-cost independent Asset Management Services to individuals (including IRAs), estates, trusts, retirement plans and charitable organizations.&nbsp;"><meta property="og:updated_time" content="2018-02-05T10:19:16-05:00"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:creator" content="@aier"><meta name="twitter:creator:id" content="37975072"><meta name="twitter:url" content="https://www.aier.org/american-investment-services-inc"><meta name="twitter:title" content="American Investment Services, Inc."><meta name="twitter:description" content="The American Institute for Economic Research is a not-for-profit that&nbsp;educates Americans on the value of personal freedom, free enterprise, property rights, limited government and sound money. The"><meta property="article:published_time" content="2014-05-15T08:56:13-04:00"><meta property="article:modified_time" content="2018-02-05T10:19:16-05:00"><noscript><img height="1" width="1" style="display:none" src="/sites/all/themes/aier2/img/tr"></noscript><title><?php print $head_title; ?></title><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/font-awesome.min.css" media="all"><style>@font-face{font-family:'Open Sans';font-style:normal;font-weight:400;src:local('Open Sans Regular'),local('OpenSans-Regular'),url(/sites/all/themes/aier2/cssAssets/mem8YaGs126MiZpBA-UFVZ0d.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/mem8YaGs126MiZpBA-UFVZ0e.ttf) format('truetype');}@font-face{font-family:'Open Sans';font-style:normal;font-weight:600;src:local('Open Sans SemiBold'),local('OpenSans-SemiBold'),url(/sites/all/themes/aier2/cssAssets/mem5YaGs126MiZpBA-UNirkOUuhv.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/mem5YaGs126MiZpBA-UNirkOUuhs.ttf) format('truetype');}@font-face{font-family:'Open Sans';font-style:normal;font-weight:700;src:local('Open Sans Bold'),local('OpenSans-Bold'),url(/sites/all/themes/aier2/cssAssets/mem5YaGs126MiZpBA-UN7rgOUuhv.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf) format('truetype');}@font-face{font-family:'Source Sans Pro';font-style:normal;font-weight:300;src:local('Source Sans Pro Light'),local('SourceSansPro-Light'),url(/sites/all/themes/aier2/cssAssets/28d03185fff7d212ef1c5f0525dfd146.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/d7178566effa932ed3911f6e44a8c285.ttf) format('truetype');}@font-face{font-family:'Source Sans Pro';font-style:normal;font-weight:400;src:local('Source Sans Pro Regular'),local('SourceSansPro-Regular'),url(/sites/all/themes/aier2/cssAssets/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7j.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7g.ttf) format('truetype');}@font-face{font-family:'Source Sans Pro';font-style:normal;font-weight:700;src:local('Source Sans Pro Bold'),local('SourceSansPro-Bold'),url(/sites/all/themes/aier2/cssAssets/cb1c1a4ecd5b56593f2ef73fef8a1086.woff) format('woff'),url(/sites/all/themes/aier2/cssAssets/2765013ae32738b4c0308ddc97c6bef0.ttf) format('truetype');}</style><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/49a81f942caee9a53f501ff130a20f38.css" media="all"><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/7fc128fc96b10951b54a76f3f6316030.css" media="all"><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/6333032b23cb57a3b03b5ab21d7f1e34.css" media="all"><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/c338930d0e3c820afde1f558caa669e0.css" media="all"><!--[if lte IE 8]><link type="text/css" rel="stylesheet" href="/sites/all/themes/aier2/css/3b8c61dfb3d09a7b78974c9b278a7c25.css" media="all" /><![endif]--><!--[if lte IE 9]><script type="text/javascript" src="/sites/all/themes/aier2/js/f8db67facc0974bb6252f27b2b26c3da.js#ie9-" onload="if(jQuery.isFunction(jQuery.holdReady)){jQuery.holdReady(true);}"></script><![endif]--><!--[if gt IE 9]><script type="text/javascript" src="/sites/all/themes/aier2/js/f8db67facc0974bb6252f27b2b26c3da.js#ie10+" defer="defer" onload="if(jQuery.isFunction(jQuery.holdReady)){jQuery.holdReady(true);}"></script><![endif]--><!--[if !IE]><!--><script type="text/javascript" src="/sites/all/themes/aier2/js/f8db67facc0974bb6252f27b2b26c3da.js" defer onload="if(jQuery.isFunction(jQuery.holdReady)){jQuery.holdReady(true);}"></script><!--<![endif]--><script type="text/javascript" src="/sites/all/themes/aier2/js/c4a6f9bb139bdac2541ecbdd42df9cbc.js" defer onload="
function advagg_mod_1() {
// Count how many times this function is called.
advagg_mod_1.count = ++advagg_mod_1.count || 1;
try {
if (advagg_mod_1.count &lt;= 40) {
init_drupal_core_settings();
// Set this to 100 so that this function only runs once.
advagg_mod_1.count = 100;
}
}
catch(e) {
if (advagg_mod_1.count &gt;= 40) {
// Throw the exception if this still fails after running 40 times.
throw e;
}
else {
// Try again in 1 ms.
window.setTimeout(advagg_mod_1, 1);
}
}
}
function advagg_mod_1_check() {
if (window.init_drupal_core_settings &amp;&amp; window.jQuery &amp;&amp; window.Drupal) {
advagg_mod_1();
}
else {
window.setTimeout(advagg_mod_1_check, 1);
}
}
advagg_mod_1_check();"></script><script type="text/javascript" src="/sites/all/themes/aier2/js/d47530ac1d73491dbc799bb917438794.js" defer></script>
<!--<script type="text/javascript">
//--><!--
(function(i,s,o,r){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date()})(window,document,"script","ga");ga("create", "UA-574001-1", {"cookieDomain":"auto"});ga("send", "pageview");
</script>--><script type="text/javascript" async="async" src="/sites/all/themes/aier2/js/analytics.js"></script><script type="text/javascript" src="/sites/all/themes/aier2/js/9da3a002930c4f7076c0056b37b2ec82.js" defer async="async"></script><script type="text/javascript">
<!--//--><![CDATA[//><!--
function init_drupal_core_settings() {jQuery.extend(Drupal.settings,{"basePath":"\/","pathPrefix":"","ajaxPageState":{"theme":"nt_aier","theme_token":"7Wd683iDtbmKFVDIYPsIP1gOZR4qxLJ7e_RGa9GODZU","jquery_version":"1.8","css":{"https:\/\/maxcdn.bootstrapcdn.com\/font-awesome\/4.4.0\/css\/font-awesome.min.css":1,"css?family=Open+Sans:400,600,700|Source+Sans+Pro:400,300,700":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/system\/system.base.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/system\/system.menus.theme.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/system\/system.messages.theme.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/system\/system.theme.css":1,"sites\/all\/modules\/contrib\/dc_ajax_add_cart\/css\/dc_ajax_add_cart.css":1,"sites\/all\/modules\/contrib\/date\/date_api\/date.css":1,"sites\/all\/modules\/contrib\/date\/date_popup\/themes\/datepicker.1.7.css":1,"modules\/node\/node.css":1,"sites\/all\/modules\/contrib\/picture\/picture_wysiwyg.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/field\/field.theme.css":1,"sites\/all\/modules\/contrib\/youtube\/css\/youtube.css":1,"sites\/all\/modules\/contrib\/views\/css\/views.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/user\/user.base.css":1,"sites\/all\/themes\/omega\/omega\/css\/modules\/user\/user.theme.css":1,"sites\/all\/modules\/contrib\/ckeditor\/css\/ckeditor.css":1,"sites\/all\/modules\/custom\/aier_fcb\/css\/jquery.bxslider.css":1,"sites\/all\/modules\/contrib\/ctools\/css\/ctools.css":1,"sites\/all\/modules\/contrib\/lightbox2\/css\/lightbox.css":1,"sites\/all\/modules\/contrib\/mobile_navigation\/mobile_navigation.css":1,"sites\/all\/libraries\/fontawesome\/css\/all.css":1,"sites\/all\/themes\/nt_aier\/css\/nt-aier.normalize.css":1,"sites\/all\/themes\/nt_aier\/css\/nt-aier.hacks.css":1,"sites\/all\/themes\/nt_aier\/css\/nt-aier.styles.css":1,"sites\/all\/themes\/nt_aier\/css\/addthis.css":1,"sites\/all\/themes\/nt_aier\/css\/nt-aier.no-query.css":1},"js":{"public:\/\/google_tag\/google_tag.script.js":1,"sites\/all\/themes\/omega\/omega\/js\/no-js.js":1,"sites\/all\/modules\/contrib\/jquery_update\/js\/jquery_update.js":1,"misc\/progress.js":1,"sites\/all\/modules\/contrib\/dc_ajax_add_cart\/js\/dc_ajax_add_cart_html.js":1,"sites\/all\/modules\/contrib\/geo_filter\/geo_filter.js":1,"sites\/all\/modules\/contrib\/lightbox2\/js\/lightbox.js":1,"sites\/all\/modules\/contrib\/mobile_navigation\/js\/mobile_menu.js":1,"sites\/all\/modules\/contrib\/mobile_navigation\/mobile_navigation.js":1,"sites\/all\/modules\/contrib\/google_analytics\/googleanalytics.js":1,"sites\/all\/themes\/nt_aier\/js\/nt-aier.behaviors.js":1,"sites\/all\/themes\/nt_aier\/js\/aier7.addthis.js":1,"public:\/\/facebook_tracking_pixel\/fb_tkpx.1858570597751699.js":1,"sites\/all\/modules\/contrib\/jquery_update\/replace\/jquery\/1.8\/jquery.min.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"misc\/ajax.js":1,"https:\/\/www.aier.org\/sites\/default\/files\/googleanalytics\/analytics.js?pnhsrl":1,"sites\/all\/modules\/contrib\/picture\/picturefill2\/picturefill.min.js":1,"sites\/all\/modules\/contrib\/picture\/picture.min.js":1}},"lightbox2":{"rtl":0,"file_path":"\/(\\w\\w\/)public:\/","default_image":"\/sites\/all\/modules\/contrib\/lightbox2\/images\/brokenimage.jpg","border_size":10,"font_color":"000","box_color":"fff","top_position":"","overlay_opacity":"0.8","overlay_color":"000","disable_close_click":true,"resize_sequence":0,"resize_speed":400,"fade_in_speed":400,"slide_down_speed":600,"use_alt_layout":false,"disable_resize":false,"disable_zoom":false,"force_show_nav":false,"show_caption":true,"loop_items":false,"node_link_text":"View Image Details","node_link_target":false,"image_count":"Image !current of !total","video_count":"Video !current of !total","page_count":"Page !current of !total","lite_press_x_close":"press \u003Ca href=\u0022#\u0022 onclick=\u0022hideLightbox(); return FALSE;\u0022\u003E\u003Ckbd\u003Ex\u003C\/kbd\u003E\u003C\/a\u003E to close","download_link_text":"","enable_login":false,"enable_contact":false,"keys_close":"c x 27","keys_previous":"p 37","keys_next":"n 39","keys_zoom":"z","keys_play_pause":"32","display_image_size":"original","image_node_sizes":"()","trigger_lightbox_classes":"","trigger_lightbox_group_classes":"","trigger_slideshow_classes":"","trigger_lightframe_classes":"","trigger_lightframe_group_classes":"","custom_class_handler":0,"custom_trigger_classes":"","disable_for_gallery_lists":true,"disable_for_acidfree_gallery_lists":true,"enable_acidfree_videos":true,"slideshow_interval":5000,"slideshow_automatic_start":true,"slideshow_automatic_exit":true,"show_play_pause":true,"pause_on_next_click":false,"pause_on_previous_click":true,"loop_slides":false,"iframe_width":600,"iframe_height":400,"iframe_border":1,"enable_video":false,"useragent":"Mozilla\/5.0 (X11; Linux x86_64; rv:12.0) Gecko\/20100101 Firefox\/21.0"},"mobile_navigation":{"breakpoint":"(min-width: 1025px)","menuSelector":"#superfish-1","menuPlugin":"accordion","showEffect":"fixed_right","showItems":"active_trail","tabHandler":1,"menuWidth":"65","specialClasses":0,"mainPageSelector":".l-page","useMask":1,"menuLabel":"\u003Ci class=\u0022fa fa-bars\u0022\u003E\u003C\/i\u003EMenu","expandActive":0},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc(x|m)?|dot(x|m)?|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt(x|m)?|pot(x|m)?|pps(x|m)?|ppam|sld(x|m)?|thmx|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls(x|m|b)?|xlt(x|m)|xlam|xml|z|zip"}});
if(jQuery.isFunction(jQuery.holdReady)){jQuery.holdReady(false);}} if(window.jQuery && window.Drupal){init_drupal_core_settings();}
//--><!]]>
</script>
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