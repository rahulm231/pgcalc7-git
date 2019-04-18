<!DOCTYPE html>
<html><head><title><?php print $head_title; ?></title><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(t,e,n){function r(n){if(!e[n]){var o=e[n]={exports:{}};t[n][0].call(o.exports,function(e){var o=t[n][1][e];return r(o?o:e)},o,o.exports)}return e[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({QJf3ax:[function(t,e){function n(t){function e(e,n,a){t&&t(e,n,a),a||(a={});for(var c=u(e),f=c.length,s=i(a,o,r),p=0;f>p;p++)c[p].apply(s,n);return s}function a(t,e){f[t]=u(t).concat(e)}function u(t){return f[t]||[]}function c(){return n(e)}var f={};return{on:a,emit:e,create:c,listeners:u,_events:f}}function r(){return{}}var o="nr@context",i=t("gos");e.exports=n()},{gos:"7eSDFh"}],ee:[function(t,e){e.exports=t("QJf3ax")},{}],gos:[function(t,e){e.exports=t("7eSDFh")},{}],"7eSDFh":[function(t,e){function n(t,e,n){if(r.call(t,e))return t[e];var o=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,e,{value:o,writable:!0,enumerable:!1}),o}catch(i){}return t[e]=o,o}var r=Object.prototype.hasOwnProperty;e.exports=n},{}],D5DuLP:[function(t,e){function n(t,e,n){return r.listeners(t).length?r.emit(t,e,n):(o[t]||(o[t]=[]),void o[t].push(e))}var r=t("ee").create(),o={};e.exports=n,n.ee=r,r.q=o},{ee:"QJf3ax"}],handle:[function(t,e){e.exports=t("D5DuLP")},{}],XL7HBI:[function(t,e){function n(t){var e=typeof t;return!t||"object"!==e&&"function"!==e?-1:t===window?0:i(t,o,function(){return r++})}var r=1,o="nr@id",i=t("gos");e.exports=n},{gos:"7eSDFh"}],id:[function(t,e){e.exports=t("XL7HBI")},{}],loader:[function(t,e){e.exports=t("G9z0Bl")},{}],G9z0Bl:[function(t,e){function n(){var t=l.info=NREUM.info;if(t&&t.agent&&t.licenseKey&&t.applicationID&&c&&c.body){l.proto="https"===p.split(":")[0]||t.sslForHttp?"https://":"http://",a("mark",["onload",i()]);var e=c.createElement("script");e.src=l.proto+t.agent,c.body.appendChild(e)}}function r(){"complete"===c.readyState&&o()}function o(){a("mark",["domContent",i()])}function i(){return(new Date).getTime()}var a=t("handle"),u=window,c=u.document,f="addEventListener",s="attachEvent",p=(""+location).split("?")[0],l=e.exports={offset:i(),origin:p,features:{}};c[f]?(c[f]("DOMContentLoaded",o,!1),u[f]("load",n,!1)):(c[s]("onreadystatechange",r),u[s]("onload",n)),a("mark",["firstbyte",i()])},{handle:"D5DuLP"}]},{},["G9z0Bl"]);</script><meta name="description" content="Since 1939, Martin Health System has provided high-quality, award-winning, affordable health care to our community. And because we’re a nonprofit, the gifts from our friends, former patients and families are what keep us here to serve the next generation of patients—thank you! "><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1"><script type="text/javascript">
 var ie = 'foo';
 </script><!--[if lte IE 8]>
<script type="text/javascript">
 ie = 'old';
</script>
<![endif]--><link href="/sites/all/themes/martin/css/css" rel="stylesheet" type="text/css"><link rel="stylesheet" media="screen" type="text/css" href="/sites/all/themes/martin/css/reset.css"><link rel="stylesheet" media="screen" type="text/css" href="/sites/all/themes/martin/css/site.css"><link rel="stylesheet" media="screen" type="text/css" href="/sites/all/themes/martin/css/contentblocks.css"><link rel="stylesheet" media="print" type="text/css" href="/sites/all/themes/martin/css/print.css"><!--[if lt IE 9]>
 <link href='/sites/all/themes/martin/css/ie8.css' rel='stylesheet' type='text/css'>
 <script src="/sites/all/themes/martin/js/html5.js"></script>
 <![endif]--><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"><script type="text/javascript">
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
 ga('create', 'UA-19384240-1', 'auto'); 
 ga('send', 'pageview'); 
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
</html><!-- PC: webos : 0.24100279808044 secs : -->
