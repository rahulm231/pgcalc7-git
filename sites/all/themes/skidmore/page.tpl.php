<body>
<noscript>
<style type="text/css">
#controls-wrapper, #ctmTabWrap { display: none }
#logo-dark { display: inline }

</style></noscript>


<!-- Begin Changes on 4rd Nov 2016 Regarding - PGCS-439 -->
<style type="text/css">
@media screen and (max-width: 767px){
	#pageWrapper #navCol {
	    display: none;
	}
}
</style>
<!-- End Changes on 4rd Nov 2016 Regarding - PGCS-439 -->
<script type="text/javascript">
		$(document).ready(function() {
			
		});
	</script><script>
          if( typeof(OUC) == "undefined") { var OUC = {}; }
          // add and populate properties of the OUC object
      OUC.path = "/about/index.php"; 
      OUC.dirname = "/about/"; 
      OUC.httproot = "http://www.skidmore.edu/";
      OUC.blogFeed = "";
      OUC.blogCategory = "";
      OUC.blogQuantity = "";
        </script><script type="text/javascript" src="/sites/all/themes/skidmore/js/jquery.orbit-1.2.3.min.js"></script><link rel="stylesheet" href="/sites/all/themes/skidmore/css/orbit-1.2.3.css" type="text/css"><script type="text/javascript">
		$(window).load(function() {
			$('#featured').orbit({
				/////// DEDFAULT OPTIONS BELOW ADJUST AS NEEDED ///////////

				animation: 'fade',                  // fade, horizontal-slide, vertical-slide, horizontal-push
				animationSpeed: 800,                // how fast animtions are
				timer: true, 			 // true or false to have the timer
				advanceSpeed: 4000, 		 // if timer is enabled, time between transitions 
				pauseOnHover: false, 		 // if you hover pauses the slider
				startClockOnMouseOut: false, 	 // if clock should start on MouseOut
				startClockOnMouseOutAfter: 1000, 	 // how long after MouseOut should the timer start again
				directionalNav: true, 		 // manual advancing directional navs
				captions: true, 			 // do you want captions?
				captionAnimation: 'fade', 		 // fade, slideOpen, none
				captionAnimationSpeed: 800, 	 // if so how quickly should they animate in
				bullets: true,			 // true or false to activate the bullet navigation
				bulletThumbs: false,		 // thumbnails for the bullets
				bulletThumbLocation: '',		 // location from this file where thumbs will be
				afterSlideChange: function(){} 	 // empty function 
			});
			
					//ensure that the size of the image will not be larger than the column it is in
					var rightNavWidth = $('#subNav').width() + 50;
					var colWidth = $('.orbit-wrapper').parent().width() - rightNavWidth; //gets column width - width of right navigation
					var orbitWrapper = $('.orbit-wrapper').width(); //get width of orbit wrapper
					if(orbitWrapper > colWidth) { //determine if the size of the wrapper is larger than the size of the column
						
						//resize images to fit within new size
						$('#featured img').css('width', colWidth);

						//if so resize the size of the wrapper and div
						$('.orbit-wrapper').css('width', colWidth); //sets the orbit-wrapper div to the correct size
						$('#featured').css('width', colWidth); //sets the orbit div to the correct size
						
						//determine if now that after images and divs have been resized, if the height of the wrapper is larger than the image height
						var imageHeight = $('#featured img').first().height();
						var orbitWrapperHeight = $('.orbit-wrapper').height();
						if(orbitWrapperHeight > imageHeight) {
							//wrapper is larger in height
							$('.orbit-wrapper').css('height', imageHeight); //resize wrapper
							$('#featured').css('height', imageHeight); //resize div
						}
					}
				
		});
	</script><meta name="keywords" content="Saratoga Springs, New York, North East, NY, Liberal Arts, Skidmore, Skidmore College, higher education, creative thought matters, about skidmore, about skidmore college"><meta name="description" content="Founded more than a century ago and located in Saratoga Springs, New York, on a beautiful 890-acre campus, Skidmore is a highly regarded liberal arts college known for its creative approaches to just about everything. The college's core belief: creative thought matters."><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"><link rel="stylesheet" href="/sites/all/themes/skidmore/css/frame-subsite.css" type="text/css" media="screen"><script type="text/javascript">
$(document).ready(function() {
	$.supersized({
		slides      :       [                       // Slideshow Images

        	{image: '/sites/all/themes/skidmore/img/OCT-_DSC6027.jpg', logo: 'dark'}],
	});
});
</script><!-- Orbit Slider included by default --><!-- Random Orbit Slider --><script src="/sites/all/themes/skidmore/js/jquery.shuffle.js" type="text/javascript" charset="utf-8">/</script><script type="text/javascript">
			//$(document).ready(function() {
			//	$('#featured').shuffle();
			//});
		</script><section id="pageWrapper"><style type="text/css"></style><section id="leftCol"><script type="text/javascript" src="/sites/all/themes/skidmore/js/e2campus.js"></script><div class="SmartBoard_Surround"></div>
	<script type="text/javascript" src="/sites/all/themes/skidmore/js/53da8e477c52a6f82447608ef864c2e3"></script><!-- logo --><a href="http://www.skidmore.edu"><img src="/sites/all/themes/skidmore/img/logo-white.png" border="0" id="logo-light" class="logo" alt="Skidmore College"></a>
	<a href="http://www.skidmore.edu"><img src="/sites/all/themes/skidmore/img/logo-green.png" border="0" id="logo-dark" class="logo" alt="Skidmore College"></a>
	<section id="navCol" class="colHeight">
	<?php print render($page['menu']); ?>
	<section class="clearBoth" style="margin-top:20px;"></section>

<!-- Begin Changes on 3rd Nov 2016 Regarding - PGCS-439 -->
	<!-- Start Search Form -->
		<form action="http://www.skidmore.edu/search/results.php" id="googleSearchArea" method="get">
			<input type="hidden" name="cx" value="008099026904397476085:1sc26mxgi04" /><input type="hidden" name="cof" value="FORID:10" /><input type="hidden" name="ie" value="UTF-8" />
			<input type="search" id="cse_search" class="googleSearch" name="q" value="" /><input type="submit" class="googleBtn" name="submitBTN" value="" />
		</form><!-- Add autocomplete to the search box. -->
		<script src="//www.google.com/jsapi" type="text/javascript"></script>
		<script type="text/javascript">
		google.load( 'search', '1' );
		// Run this once the Google search JavaScript has loaded
		google.setOnLoadCallback( function() {
			google.search.CustomSearchControl.attachAutoCompletion(
				'008099026904397476085:1sc26mxgi04',
				document.getElementById( 'cse_search' ),
				'googleSearchArea' );
		});
		</script><script type="text/javascript" src="//www.google.com/cse/brand?lang=en&form=googleSearchArea" async="async"></script>
		<!-- End Search Form -->
	<section class="clearBoth"></section>	

	<section id="socialMedia">
		<a href="https://www.facebook.com/SkidmoreCollege" target="_blank"><img style="border: 0;" src="/sites/all/themes/skidmore/img/facebook.png" alt="Facebook Page" width="22" height="22"></a> 
		<a href="https://twitter.com/skidmorecollege" target="_blank"><img style="border: 0;" src="/sites/all/themes/skidmore/img/twitter.png" alt="Twitter Feed" width="22" height="22"></a> 
		<a href="http://www.youtube.com/user/SkidmoreCollege" target="_blank"><img style="border: 0;" src="/sites/all/themes/skidmore/img/youtube.png" alt="YouTube Videos" width="22" height="22"></a> 
		<a href="/social/" target="_blank"><img style="border: 0;" src="/sites/all/themes/skidmore/img/topage.png" alt="Skidmore's Social Media Page" width="22" height="22"></a>
	</section>

	<footer>
		<!-- Start Footer Include -->
		<address>
			<p>Skidmore College<br><a href="http://g.co/maps/gfkyy" target="_blank">815 North Broadway<br>Saratoga Springs, NY 12866</a><br>518-580-5000<br><a href="mailto:info@skidmore.edu">info@skidmore.edu</a></p>
			<style>
				#supersized { margin-top: 0px; }
			</style>
		</address>
		<!-- End Footer Include -->
	</footer>
<!-- End Changes on 3rd Nov 2016 Regarding - PGCS-439 -->

</section>

	</section><article id="rightCol"><?php require(DRUPAL_ROOT."/sites/all/themes/pgcalc_master/page.content.tpl.php"); ?></article><section id="socialShare"><ul><li><span class="st_facebook_hcount" displaytext=""></span></li>
		<li><span class="st_twitter_hcount" displaytext=""></span></li>
		<li><span class="st_googleplus_hcount" displaytext=""></span></li>
		<li><span class="st_pinterest_hcount" displaytext=""></span></li>
		<li><span class="st_email_hcount" displaytext=""></span></li>
	</ul><!-- Place this render call where appropriate --><script type="text/javascript">
	  (function() {
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	  })();
	</script><a href="#" class="increaseFont">A</a>
	<a href="#" class="resetFont">A</a>
	<a href="#" class="decreaseFont">A</a>
</section><section class="clearBoth"></section></section><nav id="botNav"><section class="floatRight"><img class="lr5" style="border: 0;" src="/sites/all/themes/skidmore/img/ctm-full.png" alt="Creative Thought Matters" height="17"></section><a href="http://www.skidmore.edu/directions/index.php">Map &amp; Directions</a> <a href="http://www.skidmore.edu/search/index.php">A-Z Index</a> <a href="http://calendar.skidmore.edu/MasterCalendar/">Event Calendar</a> <a href="http://www.skidmore.edu/search/index.php">Directories</a> <a href="https://careers.skidmore.edu/applicants/jsp/shared/Welcome_css.jsp">Employment</a> <a href="http://www.skidmore.edu/sustainability/index.php">Sustainability</a> <a href="http://www.skidmore.edu/diversity/">Diversity</a> <a href="http://www.skidmore.edu/emergency/">Emergency Preparedness</a>
<section class="clearBoth"></section></nav><div style="position: absolute; top: 0px; right 0px;">
         <a href="http://a.cms.omniupdate.com/10?skin=oucampus" target="_top" style="text-decoration: none;">   </a>
      </div>

<script type="text/javascript">
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0026/8485.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script><!-- Global Foot for Skidmore College --><script type="text/javascript">
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0026/8485.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script>

</body>