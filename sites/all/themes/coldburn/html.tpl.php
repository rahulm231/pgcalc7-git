<!DOCTYPE html>
<!--[if lt IE 7]> <html class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie6" original-class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie6"> <![endif]--><!--[if IE 7]> <html class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie7" original-class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie7"> <![endif]--><!--[if IE 8]> <html class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie8" original-class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default ie8"> <![endif]--><!--[if gt IE 8]><!--><html class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default" original-class="layout_13 page_2268 parentpageid_1566 layout_standard hasTopbanner hasLeftbanner hasBottombanner pagetype_default"><!--<![endif]--><head><title><?php print $head_title; ?></title><meta name="description" content="Become More Involved - Colburn"><meta name="keywords" content="Become More Involved, Friends, Colburn"><meta name="poweredby" content="finalsite.com"><meta http-equiv="X-UA-Compatible" content="IE=Edge"><meta http-equiv="Expires" content="0"><meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1"><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var o=n[t]={exports:{}};e[t][0].call(o.exports,function(n){var o=e[t][1][n];return r(o?o:n)},o,o.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({QJf3ax:[function(e,n){function t(e){function n(n,t,a){e&&e(n,t,a),a||(a={});for(var u=c(n),f=u.length,s=i(a,o,r),p=0;f>p;p++)u[p].apply(s,t);return s}function a(e,n){f[e]=c(e).concat(n)}function c(e){return f[e]||[]}function u(){return t(n)}var f={};return{on:a,emit:n,create:u,listeners:c,_events:f}}function r(){return{}}var o="nr@context",i=e("gos");n.exports=t()},{gos:"7eSDFh"}],ee:[function(e,n){n.exports=e("QJf3ax")},{}],3:[function(e,n){function t(e){return function(){r(e,[(new Date).getTime()].concat(i(arguments)))}}var r=e("handle"),o=e(1),i=e(2);"undefined"==typeof window.newrelic&&(newrelic=window.NREUM);var a=["setPageViewName","addPageAction","setCustomAttribute","finished","addToTrace","inlineHit","noticeError"];o(a,function(e,n){window.NREUM[n]=t("api-"+n)}),n.exports=window.NREUM},{1:12,2:13,handle:"D5DuLP"}],gos:[function(e,n){n.exports=e("7eSDFh")},{}],"7eSDFh":[function(e,n){function t(e,n,t){if(r.call(e,n))return e[n];var o=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:o,writable:!0,enumerable:!1}),o}catch(i){}return e[n]=o,o}var r=Object.prototype.hasOwnProperty;n.exports=t},{}],D5DuLP:[function(e,n){function t(e,n,t){return r.listeners(e).length?r.emit(e,n,t):void(r.q&&(r.q[e]||(r.q[e]=[]),r.q[e].push(n)))}var r=e("ee").create();n.exports=t,t.ee=r,r.q={}},{ee:"QJf3ax"}],handle:[function(e,n){n.exports=e("D5DuLP")},{}],XL7HBI:[function(e,n){function t(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:i(e,o,function(){return r++})}var r=1,o="nr@id",i=e("gos");n.exports=t},{gos:"7eSDFh"}],id:[function(e,n){n.exports=e("XL7HBI")},{}],G9z0Bl:[function(e,n){function t(){var e=d.info=NREUM.info,n=f.getElementsByTagName("script")[0];if(e&&e.licenseKey&&e.applicationID&&n){c(p,function(n,t){n in e||(e[n]=t)});var t="https"===s.split(":")[0]||e.sslForHttp;d.proto=t?"https://":"http://",a("mark",["onload",i()]);var r=f.createElement("script");r.src=d.proto+e.agent,n.parentNode.insertBefore(r,n)}}function r(){"complete"===f.readyState&&o()}function o(){a("mark",["domContent",i()])}function i(){return(new Date).getTime()}var a=e("handle"),c=e(1),u=window,f=u.document;e(2);var s=(""+location).split("?")[0],p={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-686.min.js"},d=n.exports={offset:i(),origin:s,features:{}};f.addEventListener?(f.addEventListener("DOMContentLoaded",o,!1),u.addEventListener("load",t,!1)):(f.attachEvent("onreadystatechange",r),u.attachEvent("onload",t)),a("mark",["firstbyte",i()])},{1:12,2:3,handle:"D5DuLP"}],loader:[function(e,n){n.exports=e("G9z0Bl")},{}],12:[function(e,n){function t(e,n){var t=[],o="",i=0;for(o in e)r.call(e,o)&&(t[i]=n(o,e[o]),i+=1);return t}var r=Object.prototype.hasOwnProperty;n.exports=t},{}],13:[function(e,n){function t(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(0>o?0:o);++r<o;)i[r]=e[n+r];return i}n.exports=t},{}]},{},["G9z0Bl"]);</script><link rel="shortcut icon" href="//www.colburnschool.edu/uploaded/favicon.ico"><link rel="canonical" href="http://www.colburnschool.edu/page.cfm?p=2268"><link rel="stylesheet" href="/sites/all/themes/coldburn/css/styles.cfm"><link type="text/css" rel="stylesheet" href="/sites/all/themes/coldburn/css/ss.css"><style type="text/css">
 body { background-color: #ffffff; margin-top:0px;margin-right:0;margin-bottom:0;margin-left:0px; color: #555555; font: 15px ; line-height: 140%; }
 table {text-align:left;}
 a {color:#00a9e0;}
 a:visited {color:#00a9e0;}
 a:active {color:#00a9e0;}
 input {font: 15px ; color: #555555;}
 select {font: 15px ;}
 textarea {font: 15px ; color: #555555;}
 .buttons {font: 15px ; color:white; font-weight:bold; background-color:#00a9e0;}
 .text_misc, .text_misc td {line-height: normal;}
 .text_misc p {margin-top: 0px;}
 .hier { font: 11px lucinda; color: #333333; }
 #topcontainer { text-align:center; }
 #topbanner { width:970px; margin-top:0px; margin-right:auto; margin-left:auto; padding-top:0px; padding-right:0px; padding-bottom:0px; padding-left:0px;}
 
 #midcontainer { text-align:center;}
 #mainmiddle { width:970px; height:0px; margin-top:0px; margin-right:auto; margin-bottom:0px; margin-left:auto; }
 #contentdiv { min-height: 0px; height: 100%; }
 #bottomcontainer { text-align:center;}
 #bottombanner { width:970px; margin-top:; margin-right:auto; margin-bottom:; margin-left:auto; padding-top:0px; padding-right:0; padding-bottom:0px; padding-left:0px; } 
 #poweredby { padding-top: 5px; padding-bottom: 5px; text-align: center; }
 #poweredby div { width: 970px; margin: auto; text-align: left; }
 </style><link rel="alternate" type="application/rss+xml" title="All Categories" href="/sites/all/themes/coldburn/linked/rss.cfm"><link rel="alternate" type="application/rss+xml" title="Academy News" href="/sites/all/themes/coldburn/linked/561d3994598f5.cfm"><link rel="alternate" type="application/rss+xml" title="Adult Study News" href="/sites/all/themes/coldburn/linked/561d39946e18c.cfm"><link rel="alternate" type="application/rss+xml" title="Alumni News" href="/sites/all/themes/coldburn/linked/561d39948b340.cfm"><link rel="alternate" type="application/rss+xml" title="Conservatory News" href="/sites/all/themes/coldburn/linked/561d39949b508.cfm"><link rel="alternate" type="application/rss+xml" title="CSPA News" href="/sites/all/themes/coldburn/linked/561d3994b3b52.cfm"><link rel="alternate" type="application/rss+xml" title="Dance News" href="/sites/all/themes/coldburn/linked/561d3994c9f2e.cfm"><link rel="alternate" type="application/rss+xml" title="Faculty News" href="/sites/all/themes/coldburn/linked/561d3994de1be.cfm"><link rel="alternate" type="application/rss+xml" title="The Colburn School News" href="/sites/all/themes/coldburn/linked/561d3995071ab.cfm"><script type="text/javascript" src="/sites/all/themes/coldburn/js/jquery.min.js"></script><script type="text/javascript"> var $j = jQuery.noConflict(); </script><script type="text/javascript" src="/sites/all/themes/coldburn/js/fs_global.js"></script>
 <style type="text/css" media="screen">
 #navtable_530{ list-style-type:none; margin: 0px 0px 0px 0px; padding:0; }
 #navtable_530 ul{list-style-type:none;margin:0;padding:0;}
 #navtable_530 a, #navtable_530 a:link, #navtable_530 a:visited{display:block; color:#00a9e0; padding-top:4px; padding-right:1px; padding-bottom:5px; padding-left:20px; margin-bottom:0px; border-color: #D2D4D3; border-style: solid; border-width: 0px 0px 1px 0px; font-size:12px; text-decoration:none;}
 #navtable_530 span{display:block; background-image:none !important; }
 /* 2nd level */
 #navtable_530 ul a{color:#ffffff !important; background:#99d6ea !important;padding-left:20px !important;border-color:#D2D4D3 !important;font-size:12px !important;font-weight:normal !important;}
 #navtable_530 ul a span{background-image:none !important;}
 /* 3rd level */
 #navtable_530 ul ul a {color:#ffffff !important;background:#004c97 !important;padding-left:30px !important;border-color:#D2D4D3 !important;font-size:12px !important;font-weight:normal !important;}
 #navtable_530 ul ul a span{background-image:none !important;}
 /* On State */
 #navtable_530 a.navon{ color:#ffffff !important;background:#004c97 !important;border-color:#D2D4D3 !important; }
 #navtable_530 a.navon span{}
 
 /* Hover State */
 #navtable_530 a:hover{color:#ffffff !important;background:#004c97 !important; border-color:#D2D4D3 !important;}
 </style><link type="text/css" rel="stylesheet" href="/sites/all/themes/coldburn/css/jquery.ui.1.8rc3.css"><style type="text/css"></style><style type="text/css">
 
 #bannermod562 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px; }
 #bannermod562, #bannermod562 td { }
 #bannermod562 .bannermodtitle{ }
 #bannermod562 .bannermodcontent { padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; }
 
 #bannermod520 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px; }
 #bannermod520, #bannermod520 td { }
 #bannermod520 .bannermodtitle{ }
 #bannermod520 .bannermodcontent { padding-left: 226px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; }
 
 #bannermod522 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px; }
 #bannermod522, #bannermod522 td { font-family: lucinda; color: #00a9e0; }
 #bannermod522 .bannermodtitle{ }
 #bannermod522 .bannermodcontent { padding-left: 246px; padding-right: 0px; padding-top: 20px; padding-bottom: 0px; }
 #bannerdiv522 a {color: #00a9e0} #bannerdiv522 a:visited {color: #00a9e0} #bannerdiv522 a:active {color: #00a9e0} 
 #bannermod530 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px; }
 #bannermod530, #bannermod530 td { font-family: lucinda; } 
 #bannermod530 .bannermodtitle{ } 
 #bannermod530 .bannermodtd { padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px; }
 
 #bannermod523 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px;}
 #bannermod523, #bannermod523 td {font-family: lucinda;color: #00a9e0;}
 #bannermod523 .bannermodcontent { padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px;}
 #bannermod523 .bannermodtitle{ }
 #bannerdiv523 a {color: #00a9e0} #bannerdiv523 a:visited {color: #99d6ea} #bannerdiv523 a:active {color: #99d6ea} 
 #bannermod524 { margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px;}
 #bannermod524, #bannermod524 td {}
 #bannermod524 .bannermodcontent { padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 0px;}
 #bannermod524 .bannermodtitle{ }
 
 </style><script src="uploaded/2012_redesign/code/global_vars.js?021710" type="text/javascript" language="javascript"></script><script type="text/javascript" src="http://use.typekit.com/xyf1zew.js"></script><script type="text/javascript">try{Typekit.load();}catch(e){}</script><link href="/sites/all/themes/coldburn/css/Code_2014_Re-Skin.css" rel="stylesheet" type="text/css"><link href="/sites/all/themes/coldburn/css/support.custom.css" rel="stylesheet" type="text/css"><!--[if lte IE 8]>
<link href="/sites/all/themes/coldburn/css/ie8.css" rel="stylesheet" type="text/css">
<![endif]--><!-- Added from phone call - margins on headers in tables causing problems --><style>table h3 {margin:0;}
#contentdiv table {width:100%;}</style>
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
