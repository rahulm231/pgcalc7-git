<!DOCTYPE html>
<html class="no-js" original-class="no-js" lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0; maximum-scale=1.0"><meta name="keywords" content=""><meta name="description" content=""><link rel="shortcut icon" type="image/ico" href="/sites/all/themes/brooklyn/linked/favicon.ico"><title><?php print $head_title; ?></title><link rel="stylesheet" href="/sites/all/themes/brooklyn/css/app.css"><!-- Compiled Sass CSS --><script src="/sites/all/themes/brooklyn/js/modernizr.js"></script><!-- Modernizr --><script src="/sites/all/themes/brooklyn/js/jquery.js"></script><!-- jQuery --><!--[if lt IE 9]>
 <script src="/sites/all/themes/brooklyn/js/html5.js"></script>
 <![endif]--><!-- Google Analytics --><script type="text/javascript">
 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-16095067-6']);
 _gaq.push(['_trackPageview']);
 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();
 function trackClick(eventCategory,eventAction,eventLabel) {
 _gaq.push(['_trackEvent',eventCategory,eventAction,eventLabel]);
 };
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
