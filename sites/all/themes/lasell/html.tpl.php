<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" original-class="no-js ie6 oldie" lang="en"> <![endif]--><!--[if IE 7]> <html class="no-js ie7 oldie" original-class="no-js ie7 oldie" lang="en"> <![endif]--><!--[if IE 8]> <html class="no-js ie8 oldie" original-class="no-js ie8 oldie" lang="en"> <![endif]--><!--[if IE 9]> <html class="no-js ie9 oldie" original-class="no-js ie9 oldie" lang="en"> <![endif]--><!--[if gt IE 9]><!--><html class="no-js" lang="en"><!--<![endif]--><head id="MainHead"><meta charset="utf-8"><meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"><title><?php print $head_title; ?></title><meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"><link href="/sites/all/themes/lasell/css/root.css" id="MainStyle" rel="stylesheet" type="text/css"><link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon"><link href="images/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"><!-- Respond.js for IE8 support of media queries --><!--[if lt IE 9]>
 <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
 <![endif]--><!-- Facebook Pixel Code --><script>
	! function(f, b, e, v, n, t, s) {
	if (f.fbq)
	return;
	n = f.fbq = function() {
	n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
	};
	if (!f._fbq)
	f._fbq = n;
	n.push = n;
	n.loaded = !0;
	n.version = '2.0';
	n.queue = [];
	t = b.createElement(e);
	t.async = !0;
	t.src = v;
	s = b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t, s)
	}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '1790012387941123');
	fbq('track', "PageView");
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
