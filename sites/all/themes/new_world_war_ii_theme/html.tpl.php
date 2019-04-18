<!DOCTYPE html>
<html dir="ltr" lang="en" prefix="content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ og: http://ogp.me/ns# rdfs: http://www.w3.org/2000/01/rdf-schema# schema: http://schema.org/ sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#"><head><meta charset="utf-8"><script type="text/javascript">
 window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var o=n[t]={exports:{}};e[t][0].call(o.exports,function(n){var o=e[t][1][n];return r(o||n)},o,o.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({1:[function(e,n,t){function r(){}function o(e,n,t){return function(){return i(e,[c.now()].concat(u(arguments)),n?null:this,t),n?void 0:this}}var i=e("handle"),a=e(2),u=e(3),f=e("ee").get("tracer"),c=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,n){s[n]=o(d+n,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),n.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,n){var t={},r=this,o="function"==typeof n;return i(l+"tracer",[c.now(),e,t],r),function(){if(f.emit((o?"":"no-")+"fn-start",[c.now(),r,o],t),o)try{return n.apply(this,arguments)}finally{f.emit("fn-end",[c.now()],t)}}}};a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,n){m[n]=o(l+n)}),newrelic.noticeError=function(e){"string"==typeof e&&(e=new Error(e)),i("err",[e,c.now()])}},{}],2:[function(e,n,t){function r(e,n){var t=[],r="",i=0;for(r in e)o.call(e,r)&&(t[i]=n(r,e[r]),i+=1);return t}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],3:[function(e,n,t){function r(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(o<0?0:o);++r<o;)i[r]=e[n+r];return i}n.exports=r},{}],4:[function(e,n,t){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,n,t){function r(){}function o(e){function n(e){return e&&e instanceof r?e:e?f(e,u,i):i()}function t(t,r,o,i){if(!d.aborted||i){e&&e(t,r,o);for(var a=n(o),u=m(t),f=u.length,c=0;c<f;c++)u[c].apply(a,r);var p=s[y[t]];return p&&p.push([b,t,r,a]),a}}function l(e,n){v[e]=m(e).concat(n)}function m(e){return v[e]||[]}function w(e){return p[e]=p[e]||o(t)}function g(e,n){c(e,function(e,t){n=n||"feature",y[t]=n,n in s||(s[n]=[])})}var v={},y={},b={on:l,emit:t,get:w,listeners:m,context:n,buffer:g,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",f=e("gos"),c=e(2),s={},p={},d=n.exports=o();d.backlog=s},{}],gos:[function(e,n,t){function r(e,n,t){if(o.call(e,n))return e[n];var r=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(e,n,t){function r(e,n,t,r){o.buffer([e],r),o.emit(e,n,t)}var o=e("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(e,n,t){function r(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");n.exports=r},{}],loader:[function(e,n,t){function r(){if(!x++){var e=h.info=NREUM.info,n=d.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&n))return s.abort();c(y,function(n,t){e[n]||(e[n]=t)}),f("mark",["onload",a()+h.offset],null,"api");var t=d.createElement("script");t.src="https://"+e.agent,n.parentNode.insertBefore(t,n)}}function o(){"complete"===d.readyState&&i()}function i(){f("mark",["domContent",a()+h.offset],null,"api")}function a(){return E.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-h.offset}var u=(new Date).getTime(),f=e("handle"),c=e(2),s=e("ee"),p=window,d=p.document,l="addEventListener",m="attachEvent",w=p.XMLHttpRequest,g=w&&w.prototype;NREUM.o={ST:setTimeout,SI:p.setImmediate,CT:clearTimeout,XHR:w,REQ:p.Request,EV:p.Event,PR:p.Promise,MO:p.MutationObserver};var v=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1044.min.js"},b=w&&g&&g[l]&&!/CriOS/.test(navigator.userAgent),h=n.exports={offset:u,now:a,origin:v,features:{},xhrWrappable:b};e(1),d[l]?(d[l]("DOMContentLoaded",i,!1),p[l]("load",r,!1)):(d[m]("onreadystatechange",o),p[m]("onload",r)),f("mark",["firstbyte",u],null,"api");var x=0,E=e(4)},{}]},{},["loader"]);
 </script><meta content="Other Ways to Support the Museum | The National WWII Museum | New Orleans" name="title"><meta content="summary" name="twitter:card"><meta content="The National WWII Museum | New Orleans" property="og:site_name"><meta content="Other Ways to Support the Museum | The National WWII Museum | New Orleans" name="twitter:title"><meta content="@nwwiim" name="twitter:site"><meta content="Your support allows future generations to better appreciate the real stories of our heroes, their struggle and sacrifice. You can help us to honor the legacy of the &acirc;&#128;&#156;Greatest Generation&acirc;&#128;&#157; in a variety of ways." name="twitter:description"><meta content="Your support allows future generations to better appreciate the real stories of our heroes, their struggle and sacrifice." name="description"><meta content="https://www.nationalww2museum.org/give/other-ways-support-museum" property="og:url"><meta content="Other Ways to Support the Museum | The National WWII Museum | New Orleans" property="og:title"><meta content="https://www.nationalww2museum.org/give/other-ways-support-museum" name="twitter:url"><meta content="Your support allows future generations to better appreciate the real stories of our heroes, their struggle and sacrifice. You can help us to honor the legacy of the &acirc;&#128;&#156;Greatest Generation&acirc;&#128;&#157; in a variety of ways." property="og:description"><meta content="https://www.nationalww2museum.org/sites/default/files/2017-07/donate-an-artifact-960x700.jpg" name="twitter:image"><meta content="https://www.nationalww2museum.org/sites/default/files/2017-07/donate-an-artifact-960x700.jpg" property="og:image"><meta content="https://www.nationalww2museum.org/sites/default/files/2017-07/donate-an-artifact-960x700.jpg" property="og:image:url"><meta content="Drupal 8 (https://www.drupal.org)" name="Generator"><meta content="width" name="MobileOptimized"><meta content="true" name="HandheldFriendly"><meta content="width=device-width, initial-scale=1.0" name="viewport"><link href="/themes/nwwiim/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon"><link href="/give/other-ways-support-museum" rel="canonical"><link href="/node/725" rel="shortlink"><link href="/give/other-ways-support-museum" rel="revision"><title><?php print $head_title; ?></title><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport"><link href="/themes/nwwiim/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"><link href="/themes/nwwiim/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"><link href="/themes/nwwiim/favicons/favicon-194x194.png" rel="icon" sizes="194x194" type="image/png"><link href="/themes/nwwiim/favicons/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png"><link href="/themes/nwwiim/favicons/android-chrome-384x384.png" rel="icon" sizes="384x384" type="image/png"><link href="/themes/nwwiim/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"><link href="/themes/nwwiim/favicons/manifest.json" rel="manifest"><link href="/themes/nwwiim/favicons/safari-pinned-tab.svg" rel="mask-icon"><link href="/themes/nwwiim/favicons/favicon.ico" rel="shortcut icon"><meta content="#00396a" name="msapplication-TileColor"><meta content="/themes/nwwiim/favicons/mstile-150x150.png" name="msapplication-TileImage"><meta content="/themes/nwwiim/favicons/browserconfig.xml" name="msapplication-config"><meta content="#ffffff" name="theme-color"><script src="/sites/all/themes/new_world_war_ii_theme/js/ajl2pve.js">
 </script><script>
 try{Typekit.load({ async: true });}catch(e){}
 </script><link href="/sites/all/themes/new_world_war_ii_theme/css/469b3d472de8213866fe35c023d37c16.css" media="all" rel="stylesheet"><link href="/sites/all/themes/new_world_war_ii_theme/css/085cd45ac6351f8fe61e2eefdb827ee7.css" media="all" rel="stylesheet"><!--[if lte IE 9]>
<link rel="stylesheet" href="/sites/all/themes/new_world_war_ii_theme/css/96a462991d9d8e95ca80821ae82b6663.css" media="all" />
<![endif]--><script>
 (function(d) {
 var config = {
 kitId: 'lfg0ugm',
 scriptTimeout: 3000,
 async: true
 },
 h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
 })(document);
</script>
<?php
print $head;
print $styles;
//print $scripts;
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
<?php
print $scripts;
?>
</html>
