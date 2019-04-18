<body id="blog" class="interior-bp interior" original-class="interior-bp interior">
 
 
<!-- ******** START LIGHTBOX STYLES ******** -->
<style>
 #lightbox-channel {
 background: #e86d1f;
 padding: 3.5%;
 border: none;
 }
 #lightbox-channel h1 {
 margin-top: 0;
 margin-bottom: 30px;
 color: #FFF;
 font-size: 60px;
 line-height: 64px;
 text-align: center;
 }
 #lightbox-channel.test-on h1 {
 margin: 0 0 10px;
 }
 #lightbox-channel h2 {
 color: white;
 font-style: normal;
 font-size: 44px;
 font-weight: 500;
 margin: 0 0 30px;
 text-align: center;
 }
 #lightbox-channel .close-reveal-modal {
 position: absolute;
 top: 10px;
 right: 10px;
 cursor: pointer;
 }
 #lightbox-channel form input[type="text"] {
 font-family: "Whitney 4r", "Whitney A", "Whitney B", "Whitney", sans-serif;
 font-size: 24px;
 background: #f4b68f;
 color: #FFF;
 box-shadow: none;
 border: none;
 padding: 5px 10px;
 border-radius: 7px;
 height: 60px;
 box-sizing: border-box;
 }
 #lightbox-channel form input[type="text"]::-webkit-input-placeholder {
 color: #f9e6da;
 }
 #lightbox-channel form input[type="text"]:-moz-placeholder {
 color: #f9e6da;
 }
 #lightbox-channel form input[type="text"]::-moz-placeholder {
 color: #f9e6da;
 }
 #lightbox-channel form input[type="text"]:-ms-input-placeholder {
 color: #f9e6da;
 }
 #lightbox-channel form #email {
 width: 100%;
 }
 #lightbox-channel .action-light,
 #lightbox-channel .action-light span {
 background: #FFF;
 line-height: 60px;
 height: 60px;
 padding: 0 !important;
 }
 #lightbox-channel .action-light {
 width: 100%;
 font-family: "Whitney 4r", "Whitney A", "Whitney B", "Whitney", sans-serif;
 font-size: 28px;
 font-weight: 600;
 color: #e86d1f;
 text-align: center;
 position: relative;
 border-radius: 7px;
 }
 #lightbox-channel .action-light span {
 border-left: 5px solid;
 top: 0;
 position: absolute;
 right: 0;
 }
 #lightbox-channel .action-light span:after {
 font-size: 36px;
 padding: 0 9px;
 }
 @media only screen and (max-width: 600px) {
 #lightbox-channel form #email {
 width: 100%;
 }
 }
</style><!-- ********* END LIGHTBOX STYLES ********* --><!-- ********** START LIGHTBOX HTML ********** --><div id="lightbox-channel" class="reveal-modal lightbox-standard interstitial-asset" original-class="reveal-modal lightbox-standard interstitial-asset" data-name="lightbox-channel" data-type="BSD Lightbox" data-cookie="lightbox-channel">
 <a class="close-reveal-modal" original-class="close-reveal-modal" tabindex="1"><img src="/sites/all/themes/pih/img/x-out.png" alt="Close"></a>
 <div class="content-top" original-class="content-top">
 <h1>Poverty Makes You Sick.</h1>
 <h2>That&acirc;&#128;&#153;s why we&acirc;&#128;&#153;re here.</h2>
 </div>
 <div class="content-bottom" original-class="content-bottom">
 <form>
 <input type="text" name="email" id="email" placeholder="email address"><button type="submit" class="action-light action-split action-block" original-class="action-light action-split action-block">Join us<span class="arrow" original-class="arrow"></span></button>
 </form>
 </div>
 </div>
<!-- ********** END LIGHTBOX HTML ********** -->
<!-- ********** START INTERSTITIAL JS ********** -->
<script type="text/javascript">
function showLightbox() {
 jQuery('#lightbox-channel').reveal({
 position: 'centered',
 animation: 'fade',
 animationspeed: 300
 });
}
</script><script type="text/javascript">
var assetName = jQuery(".interstitial-asset").data("name"),
 assetType = jQuery(".interstitial-asset").data("type"),
 assetCookie = jQuery(".interstitial-asset").data("cookie"),
 placement = '';
if(placement == ''){
 placement = 'http://www.pih.org/';
}
// set the source POST -> &source=source_parameter
var source_parameter = ga_integration_config.util.readCookie("source") || "";
// set the subsource POST -> &subsource=final_subsource
// where subsource can be passed to the function
var subsource = 'testsubsource',
 existing_subsource = typeof subsource !== 'undefined' ? subsource : "",
 final_subsource = window.location.href;
var guid = jQuery.cookie("guid");
function isSignedUp() {
 _gaq.push(["_trackEvent", assetType, "Not Loaded (signed up)", assetName, 0, true]);
}
function notSignedUp() {
 var cookie = jQuery.cookie(assetCookie);
 if (cookie != 'viewed') {
 setTimeout(function(){
 if(assetType == "BSD Lightbox"){showLightbox();} else {showMeerkat();}
 }, 5000);
 _gaq.push(["_trackEvent", assetType, "Load", assetName, 0, true]);
 /* Interstitial closed */
 jQuery("#cboxClose, #cboxOverlay, .close-button").one("keydown mousedown", function(e){
 if (e.type === "mousedown" || e.which === 13) {
 _gaq.push(["_trackEvent", assetType, "Close", assetName, 0, true]);
 }
 });
 /* Form submitted */
 jQuery(".interstitial-asset form").on('submit', function(e) {
 jQuery(".spinner").show();
 e.preventDefault();
 e.stopPropagation();
 var data = {
 signup_form_id: '235',
 email: jQuery(".interstitial-asset #email").val(),
 source: source_parameter,
 subsource: final_subsource
 };
 data = jQuery.param(data);
 jQuery.post("/php/process_signup_lightbox", data)
 .done( function(data, status, jqXHR){
 console.log(data, status, jqXHR);
 _gaq.push(["_trackEvent", assetType, "Submit", assetName, 0, true]);
 window.location = "http://act.pih.org/page/content/thanks-for-joining";
 })
 .fail( function(data, status,c ){ console.log(data,status,c,"fail"); jQuery(".error").slideDown(); jQuery('.spinner').hide(); });
 });
 jQuery.cookie(assetCookie, 'viewed', {
 expires: parseFloat(1),
 path: '/',
 domain: 'pih.org'
 });
 }
}
function hasDonated() {
 _gaq.push(["_trackEvent", assetType, "Not Loaded (has donated)", assetName, 0, true]);
}
function notDonated() {
 var cookie = jQuery.cookie(assetCookie);
 if (cookie != 'viewed') {
 setTimeout(function(){
 if(assetType == "BSD Lightbox"){showLightbox();} else {showMeerkat();}
 }, 5000);
 _gaq.push(["_trackEvent", assetType, "Load", assetName, 0, true]);
 /* Interstitial closed */
 jQuery("#cboxClose, #cboxOverlay, .close-button").one("keydown mousedown", function(e){
 if (e.type === "mousedown" || e.which === 13) {
 _gaq.push(["_trackEvent", assetType, "Close", assetName, 0, true]);
 }
 });
 /* Donate button clicked */
 jQuery(".interstitial-asset .action-block").one("keydown mousedown", function(e){
 if (e.type === "mousedown" || e.which === 13) {
 _gaq.push(["_trackEvent", assetType, "Donate Button", assetName, 0, true]);
 }
 });
 jQuery.cookie(assetCookie, 'viewed', {
 expires: parseFloat(1),
 path: '/',
 domain: 'pih.org'
 });
 }
}
</script><script type="text/javascript">
if(window.location.href == placement){
 // Check LoE Level
 if(guid) {
 jQuery.ajax({
 url:"/page/graph/loe/" + guid,
 cache: true,
 dataType: "json",
 success: function( consituent ) {
 if ( consituent.email ) {isSignedUp();} else {notSignedUp();}
 },
 error: function(e) {
 //console.log('error: ' + e.responseText);
 }
 });
 } else {notSignedUp();}
}
</script><!-- ********** END INTERSTITIAL JS ********** --><div id="container">
 <header id="main-header"><div class="centered" original-class="centered">
 <h1 class="header-logo logo" original-class="header-logo logo"><a href="http://www.pih.org/" class="ir" original-class="ir">Partners In Health</a></h1>
 <div class="tagline-wrapper header-desktop-up" original-class="tagline-wrapper header-desktop-up">
 <h2 class="tagline" original-class="tagline">we <strong>go.</strong> we make <strong>house calls.</strong>
</h2>
 <h2 class="tagline" original-class="tagline">we build <strong>health systems.</strong> we <strong>stay.</strong>
</h2>
 </div>
 <div class="header-actions header-desktop-up" original-class="header-actions header-desktop-up">
 <a href="https://www.facebook.com/partnersinhealth" target="_blank" class="header-actions__social fa fa-facebook" original-class="header-actions__social fa fa-facebook"></a>
 <a href="https://twitter.com/PIH" target="_blank" class="header-actions__social fa fa-twitter" original-class="header-actions__social fa fa-twitter"></a>
 <a href="http://www.pih.org/donate" class="donate action-light action-split" original-class="donate action-light action-split">Donate Now <span class="arrow" original-class="arrow"></span></a>
 </div>
 <div class="mobile-menu" original-class="mobile-menu">
 <a id="mobile-search-trigger" class="mobile-menu-item menu-search fa fa-search" original-class="mobile-menu-item menu-search fa fa-search"></a>
 <a href="#menu" class="mobile-menu-item bigslide-menu fa fa-bars" original-class="mobile-menu-item bigslide-menu fa fa-bars"></a>
 </div>
 </div>
<!--/.centered-->
 <nav class="header-desktop-up" original-class="header-desktop-up"><ul class="centered sf-menu" original-class="centered sf-menu"><li class="node_our-story level_1 has_children first_child" original-class="node_our-story level_1 has_children first_child">
 <a href="http://www.pih.org/pages/our-mission"><span class="long" original-class="long">Our Story</span><span class="short" original-class="short">Our Story</span></a>
 <ul><li class="node_our-founders level_2 first_child" original-class="node_our-founders level_2 first_child">
 <a href="http://www.pih.org/pages/our-founders"><span class="long" original-class="long">Our Founders</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_our-mission level_2" original-class="node_our-mission level_2">
 <a href="http://www.pih.org/pages/our-mission"><span class="long" original-class="long">Our Mission</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_our-principles level_2" original-class="node_our-principles level_2">
 <a href="http://www.pih.org/pages/our-principles"><span class="long" original-class="long">Our Principles</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_governance level_2" original-class="node_governance level_2">
 <a href="http://www.pih.org/pages/governance"><span class="long" original-class="long">Governance</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_partnerships level_2 last_child" original-class="node_partnerships level_2 last_child">
 <a href="http://www.pih.org/partnerships"><span class="long" original-class="long">Partnerships</span><span class="short" original-class="short">Partnerships</span></a>
 </li>
 </ul></li>
 <li class="node_our-work level_1 has_children" original-class="node_our-work level_1 has_children">
 <a href="http://www.pih.org/priority-programs"><span class="long" original-class="long">Our Work</span><span class="short" original-class="short">Our Work</span></a>
 <ul><li class="node_countries level_2 first_child" original-class="node_countries level_2 first_child">
 <a href="http://www.pih.org/countries"><span class="long" original-class="long">Countries</span><span class="short" original-class="short">countries</span></a>
 </li>
 <li class="node_priority-programs level_2 last_child" original-class="node_priority-programs level_2 last_child">
 <a href="http://www.pih.org/priority-programs"><span class="long" original-class="long">Priority Programs</span><span class="short" original-class="short"></span></a>
 </li>
 </ul></li>
 <li class="node_support-our-work level_1 has_children" original-class="node_support-our-work level_1 has_children">
 <a href="http://www.pih.org/support"><span class="long" original-class="long">Support Our Work</span><span class="short" original-class="short">Support</span></a>
 <ul><li class="node_donate level_2 has_children first_child" original-class="node_donate level_2 has_children first_child">
 <a href="https://donate.pih.org/donate"><span class="long" original-class="long">Donate</span><span class="short" original-class="short"></span></a>
 <ul><li class="node_monthly-donations level_3 first_child" original-class="node_monthly-donations level_3 first_child">
 <a href="https://donate.pih.org/give-today/pauls-partners?subsource=header_navbar"><span class="long" original-class="long">Monthly Donations</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_gifts-of-stock-or-securities level_3" original-class="node_gifts-of-stock-or-securities level_3">
 <a href="http://www.pih.org/pages/more-ways-to-give#stock-securities"><span class="long" original-class="long">Gifts of Stock or Securities</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_donate-in-honor-or-memory level_3" original-class="node_donate-in-honor-or-memory level_3">
 <a href="https://donate.pih.org/page/contribute/gifts-in-honor-or-memory?subsource=00000000navbartrib_on101_web"><span class="long" original-class="long">Donate in Honor or Memory</span><span class="short" original-class="short">Donate in Honor</span></a>
 </li>
 <li class="node_planned-giving level_3" original-class="node_planned-giving level_3">
 <a href="http://legacy.pih.org"><span class="long" original-class="long">Planned Giving</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_more-ways-to-give level_3" original-class="node_more-ways-to-give level_3">
 <a href="http://www.pih.org/pages/more-ways-to-give"><span class="long" original-class="long">More Ways to Give</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_manage-your-online-giving level_3 last_child" original-class="node_manage-your-online-giving level_3 last_child">
 <a href="http://www.pih.org/taxreceipt"><span class="long" original-class="long">Manage Your Online Giving</span><span class="short" original-class="short"></span></a>
 </li>
 </ul></li>
 <li class="node_join-us level_2 has_children last_child" original-class="node_join-us level_2 has_children last_child">
 <a href="http://act.pih.org/page/s/quicksignup"><span class="long" original-class="long">Join Us</span><span class="short" original-class="short"></span></a>
 <ul><li class="node_make-fundraising-personal level_3 first_child" original-class="node_make-fundraising-personal level_3 first_child">
 <a href="http://www.pih.org/pages/make-fundraising-personal"><span class="long" original-class="long">Fundraise</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_pih-engage level_3" original-class="node_pih-engage level_3">
 <a href="http://engage.pih.org"><span class="long" original-class="long">PIH Engage</span><span class="short" original-class="short"></span></a>
 </li>
 <li class="node_events level_3 last_child" original-class="node_events level_3 last_child">
 <a href="http://www.pih.org/pages/events"><span class="long" original-class="long">Events</span><span class="short" original-class="short"></span></a>
 </li>
 </ul></li>
 </ul></li>
 <li class="node_news level_1 last_child" original-class="node_news level_1 last_child">
 <a href="http://www.pih.org/blog"><span class="long" original-class="long">News</span><span class="short" original-class="short">News</span></a>
 </li>
<li class="header-search" original-class="header-search">
 <form class="site-search-form" original-class="site-search-form" action="http://www.pih.org/search" name="cse-search-box" method="get">
 <input id="search-box" type="text" class="search-box" original-class="search-box" name="q"><label for="search-box"><span class="fa fa-search search-icon" original-class="fa fa-search search-icon"></span></label>
 </form>
 <script type="text/javascript" src="/sites/all/themes/pih/js/brand"></script></li>
 
</ul></nav></header><div class="mobile-search header-search" original-class="mobile-search header-search">
 <header class="search-header" original-class="search-header"><a href="http://www.pih.org/">
 <img src="/sites/all/themes/pih/img/header-logo-white.png" class="mobile-logo" original-class="mobile-logo"></a>
 <a id="mobile-search-close" class="mobile-menu-item fa fa-times" original-class="mobile-menu-item fa fa-times"></a>
 </header><form class="mobile-search-form" original-class="mobile-search-form" action="/search" name="cse-search-box" method="get">
 <fieldset class="search-fields" original-class="search-fields"><input id="search-box" type="text" class="search-input__mobile" original-class="search-input__mobile" name="q" placeholder="Search pih.org"><button class="mobile-search-btn fa fa-search" original-class="mobile-search-btn fa fa-search"></button>
 </fieldset></form>
 <script type="text/javascript" src="/sites/all/themes/pih/js/brand"></script></div> <!-- /.mobile-search -->
 <aside id="menu" class="bigslide-panel" original-class="bigslide-panel" role="navigation"><div class="bigslide-panel__wrap" original-class="bigslide-panel__wrap">
 <ul class="bigSlide-nav" original-class="bigSlide-nav"><li class="node_our-story level_1 has_children first_child" original-class="node_our-story level_1 has_children first_child">
 <a href="http://www.pih.org/pages/our-mission" class="bigSlide-nav__link nested_level_1" original-class="bigSlide-nav__link nested_level_1"><span class="long" original-class="long">Our Story</span></a>
 <ul><li class="node_our-founders level_2 first_child" original-class="node_our-founders level_2 first_child">
 <a href="http://www.pih.org/pages/our-founders" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Our Founders</span></a>
 </li>
 <li class="node_our-mission level_2" original-class="node_our-mission level_2">
 <a href="http://www.pih.org/pages/our-mission" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Our Mission</span></a>
 </li>
 <li class="node_our-principles level_2" original-class="node_our-principles level_2">
 <a href="http://www.pih.org/pages/our-principles" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Our Principles</span></a>
 </li>
 <li class="node_our-history level_2" original-class="node_our-history level_2">
 <a href="http://www.pih.org/pages/our-history" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Our History</span></a>
 </li>
 <li class="node_governance level_2" original-class="node_governance level_2">
 <a href="http://www.pih.org/pages/governance" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Governance</span></a>
 </li>
 <li class="node_partnerships level_2 last_child" original-class="node_partnerships level_2 last_child">
 <a href="http://www.pih.org/partnerships" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Partnerships</span></a>
 </li>
 </ul></li>
 <li class="node_our-work level_1 has_children" original-class="node_our-work level_1 has_children">
 <a href="http://www.pih.org/priority-programs" class="bigSlide-nav__link nested_level_1" original-class="bigSlide-nav__link nested_level_1"><span class="long" original-class="long">Our Work</span></a>
 <ul><li class="node_countries level_2 first_child" original-class="node_countries level_2 first_child">
 <a href="http://www.pih.org/countries" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Countries</span></a>
 </li>
 <li class="node_priority-programs level_2 last_child" original-class="node_priority-programs level_2 last_child">
 <a href="http://www.pih.org/priority-programs" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Priority Programs</span></a>
 </li>
 </ul></li>
 <li class="node_support-our-work level_1 has_children" original-class="node_support-our-work level_1 has_children">
 <a href="http://www.pih.org/support" class="bigSlide-nav__link nested_level_1" original-class="bigSlide-nav__link nested_level_1"><span class="long" original-class="long">Support Our Work</span></a>
 <ul><li class="node_donate level_2 has_children first_child" original-class="node_donate level_2 has_children first_child">
 <a href="https://donate.pih.org/donate" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Donate</span></a>
 <ul><li class="node_monthly-donations level_3 first_child" original-class="node_monthly-donations level_3 first_child">
 <a href="https://donate.pih.org/give-today/pauls-partners?subsource=header_navbar" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Monthly Donations</span></a>
 </li>
 <li class="node_manage-your-online-giving level_3" original-class="node_manage-your-online-giving level_3">
 <a href="http://www.pih.org/taxreceipt" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Manage Your Online Giving</span></a>
 </li>
 <li class="node_donate-in-honor-or-memory level_3" original-class="node_donate-in-honor-or-memory level_3">
 <a href="https://donate.pih.org/page/contribute/gifts-in-honor-or-memory?subsource=00000000navbartrib_on101_web" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Donate in Honor or Memory</span></a>
 </li>
 <li class="node_more-ways-to-give level_3 last_child" original-class="node_more-ways-to-give level_3 last_child">
 <a href="http://www.pih.org/pages/more-ways-to-give" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">More Ways to Give</span></a>
 </li>
 </ul></li>
 <li class="node_join-us level_2 has_children last_child" original-class="node_join-us level_2 has_children last_child">
 <a href="http://act.pih.org/page/s/quicksignup" class="bigSlide-nav__link nested_level_2" original-class="bigSlide-nav__link nested_level_2"><span class="long" original-class="long">Join Us</span></a>
 <ul><li class="node_take-action level_3 first_child" original-class="node_take-action level_3 first_child">
 <a href="http://www.pih.org/action" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Take Action</span></a>
 </li>
 <li class="node_make-fundraising-personal level_3" original-class="node_make-fundraising-personal level_3">
 <a href="http://www.pih.org/pages/make-fundraising-personal" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Fundraise</span></a>
 </li>
 <li class="node_pih-engage level_3" original-class="node_pih-engage level_3">
 <a href="http://engage.pih.org" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">PIH Engage</span></a>
 </li>
 <li class="node_events level_3 last_child" original-class="node_events level_3 last_child">
 <a href="http://www.pih.org/pages/events" class="bigSlide-nav__link nested_level_3" original-class="bigSlide-nav__link nested_level_3"><span class="long" original-class="long">Events</span></a>
 </li>
 </ul></li>
 </ul></li>
 <li class="node_news level_1 last_child" original-class="node_news level_1 last_child">
 <a href="http://www.pih.org/blog" class="bigSlide-nav__link nested_level_1" original-class="bigSlide-nav__link nested_level_1"><span class="long" original-class="long">News</span></a>
 </li>
</ul><div class="bigslide-panel__social" original-class="bigslide-panel__social">
 <a href="http://www.facebook.com/partnersinhealth" class="social-ico fa fa-facebook-square" original-class="social-ico fa fa-facebook-square" target="_blank"></a>
 <a href="http://twitter.com/PIH" target="_blank" class="social-ico fa fa-twitter" original-class="social-ico fa fa-twitter"></a>
 </div> <!-- /.bigslide-panel__social-->
 </div> <!-- /.bigslide-panel__wrap -->
 </aside><!-- /.bigslide-panel --><div class="bigSlide-push push" original-class="bigSlide-push push">
<div id="fb-root"></div>
<script>(function(d, s, id) {
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) return;
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=197764666980570&version=v2.0";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script><div class="content-wrapper" original-class="content-wrapper">
<div class="centered has-sideshare" original-class="centered has-sideshare">
 <!-- /.sidebar-share -->
 <div id="content" class="clearfix" original-class="clearfix">
 
 <aside class="bp-entry-meta-top" original-class="bp-entry-meta-top"><div class="byline-post-details" original-class="byline-post-details">
 
 </div>
 </aside><!-- ./blog-entry-meta-top --><div class="bp-entry-content clearfix" original-class="bp-entry-content clearfix">
 <article class="blog_sidebar_on base blog-entry story clearfix" original-class="blog_sidebar_on base blog-entry story clearfix"><?php require(DRUPAL_ROOT."/sites/all/themes/pgcalc_master/page.content.tpl.php"); ?></article><!-- /.blog-entry --><aside class="sidebar" original-class="sidebar"><div class="related-links box" original-class="related-links box">
 <div class="related-links-content-panels" original-class="related-links-content-panels">
 
 <div class="related-links-content country" original-class="related-links-content country"><?php print render($page['menu']); ?></div>
 
 
 <div class="related-links-content priority-program" original-class="related-links-content priority-program">
 
 
 <a href="http://www.pih.org/blog/cervical-cancer-program-expands-in-haiti">
 <time>January 29, 2016</time><p>Cervical Cancer Program Expands in Haiti</p>
 </a>
 
 
 <a href="http://www.pih.org/blog/dr.-moi-will-see-you-now">
 <time>January 15, 2016</time><p>&lsquo;Dr. Mo&Atilde;&shy;&rsquo; Will See You Now</p>
 </a>
 
 
 <a href="http://www.pih.org/blog/immigration-crisis-health-as-a-human-right-in-haiti">
 <time>January 05, 2016</time><p>Immigration Crisis, Health as a Human Right in Haiti</p>
 </a>
 
 
 <a href="http://www.pih.org/blog/video-thank-you-from-dr.-paul-farmer-and">
 <time>December 31, 2015</time><p>VIDEO: Thank you from Dr. Paul Farmer and Mariatu</p>
 </a>
 
 
 <a href="http://www.pih.org/blog/2015-the-year-in-quotes">
 <time>December 21, 2015</time><p>2015: The Year in Quotes</p>
 </a>
 
 </div>
 
 <div class="related-links-content popular" original-class="related-links-content popular">
 <!--1878|1889|1881|1422|1894--> <a href="http://www.pih.org/blog/for-ebola-countries-need-tools-to-treat-patients-in-their-communities">
 <time>September 24, 2014</time><p>Ebola: Countries Need &lsquo;Staff, Stuff, and Systems&rsquo;</p>
 </a>
 <a href="http://www.pih.org/blog/ebola-a-call-to-action">
 <time>September 19, 2014</time><p>Ebola: A Call to Action from PIH&rsquo;s Dr. Joia Mukherjee</p>
 </a>
 <a href="http://www.pih.org/media/welcome-to-partners-in-health">
 <time>October 18, 2012</time><p>Welcome to Partners In Health</p>
 </a>
 <a href="http://www.pih.org/blog/jama-the-ebola-outbreak-fragile-health-systems-and-quality-as-a-cure">
 <time>October 07, 2014</time><p>JAMA: &lsquo;The Ebola Outbreak, Fragile Health Systems, and Quality as a Cure&rsquo;</p>
 </a>
 </div>
 </div>
<!--/.related-links-content-panels-->
</div>
 </aside><!-- /.sidebar --></div> <!-- /.bp-entry-content-->
 </div>
<!--/#content-->
 <!-- /.blog-posts-latest -->
</div>
<!--/.centered-->
</div>
<!--/.content-wrapper-->
<div class="slidebox take-action-list" original-class="slidebox take-action-list">
 <ul><li>Take Action</li>
 
 
 
 
 </ul><a href="#" class="slidebox-close" original-class="slidebox-close">Close</a>
</div>
<!--/.slidebox-->
 
<!-- **** START OPTIMIZELY **** -->
<!-- ******** START LIGHTBOX STYLES ******** -->
<style>
#lightbox-either-or {
 background: #e86d1f;
 padding: 3.5%;
 border: none;
}
#lightbox-either-or h1 {
 margin-top: 0;
 margin-bottom: 30px;
 color: #FFF;
 font-size: 60px;
 line-height: 64px;
 text-align: center;
}
#lightbox-either-or .close-reveal-modal {
 position: absolute;
 top: 10px;
 right: 10px;
 cursor: pointer;
}
#lightbox-either-or form input[type="text"] {
 font-family: "Whitney 4r", "Whitney A", "Whitney B", "Whitney", sans-serif;
 font-size: 24px;
 background: #f4b68f;
 color: #FFF;
 box-shadow: none;
 border: none;
 padding: 5px 10px;
 border-radius: 7px;
 height: 60px;
 box-sizing: border-box;
}
#lightbox-either-or form input[type="text"]::-webkit-input-placeholder {
 color: #f9e6da;
}
#lightbox-either-or form input[type="text"]:-moz-placeholder {
 color: #f9e6da;
}
#lightbox-either-or form input[type="text"]::-moz-placeholder {
 color: #f9e6da;
}
#lightbox-either-or form input[type="text"]:-ms-input-placeholder {
 color: #f9e6da;
}
#lightbox-either-or form #email {
 width: 100%;
}
#lightbox-either-or form button {
 width: 100%;
 height: 60px;
 background: #FFF;
 font-size: 28px;
 font-weight: 600;
 color: #e86d1f;
 text-align: center;
 padding-right: 60px !important;
 border-radius: 7px;
}
#lightbox-either-or form button span {
 background: #FFF;
 height: 46px;
 border-left: 5px solid;
 padding: 6px 8px 8px !important;
}
#lightbox-either-or form button span:after {
 font-size: 36px;
 padding: 0 9px;
}
@media only screen and (max-width: 600px) {
 #lightbox-either-or form #email {
 width: 100%;
 }
 #lightbox-either-or form #zip {
 width: 100%;
 margin-left: 0;
 margin-top: 10px;
 }
}
</style><!-- ********* END LIGHTBOX STYLES ********* --><!-- ********** START LIGHTBOX HTML ********** --><div id="lightbox-either-or" class="reveal-modal lightbox-standard" original-class="reveal-modal lightbox-standard" data-name="lightbox-either-or">
 <a class="close-reveal-modal" original-class="close-reveal-modal" tabindex="1"><img src="/sites/all/themes/pih/img/x-out.png" alt="Close"></a>
 <div class="content-top" original-class="content-top">
 <h1>We believe health is a human right.</h1>
 </div>
 <div class="content-bottom" original-class="content-bottom">
 <form>
 <input type="text" name="email" id="email" placeholder="email address"><button type="submit" class="action-light action-split action-block" original-class="action-light action-split action-block">Join the Movement<span class="arrow" original-class="arrow"></span></button>
 </form>
 </div>
</div>
<!-- ********** END LIGHTBOX HTML ********** -->
<!-- ********** START LIGHTBOX JS ********** -->
<script type="text/javascript">
function testLightbox() {
 jQuery('#lightbox-either-or').reveal({
 position: 'centered',
 animation: 'fade',
 animationspeed: 300
 });
}
function showLightbox() {
 jQuery('#lightbox-either-or').reveal({
 position: 'centered',
 animation: 'fade',
 animationspeed: 300
 });
}
function optimizelyLightbox(subsource) {
 var lightboxName = jQuery("#lightbox-either-or").data("name");
 // set the source POST -> &source=source_parameter
 var source_parameter = ga_integration_config.util.readCookie("source") || "";
 // set the subsource POST -> &subsource=final_subsource
 // where subsource can be passed to the function
 var existing_subsource = typeof subsource !== 'undefined' ? subsource : "";
 var final_subsource = window.location.href;
 // Check LoE Level
 var guid = jQuery.cookie("guid");
 if ( guid ) {
 jQuery.ajax({
 url:"/page/graph/loe/" + guid,
 cache: true,
 dataType: "json",
 success: function( consituent ) {
 if ( consituent.email ) {isSignedUp();} else {notSignedUp();}
 },
 error: function(e) {
 console.log('error: ' + e.responseText);
 }
 });
 } else {notSignedUp();}
 // LoE
 function isSignedUp() {
 // Do nothing.
 _gaq.push(["_trackEvent", "BSD Lightbox", "Not Loaded (signed up)", lightboxName, 0, true]);
 }
 function notSignedUp() {
 var cookie = jQuery.cookie('either-or');
 if (cookie != 'viewed') {
 setTimeout(function() {showLightbox();}, 5000);
 _gaq.push(["_trackEvent", "BSD Lightbox", "Load", lightboxName, 0, true]);
 /* Lightbox Closed! */
 jQuery("#cboxClose, #cboxOverlay").one("keydown mousedown", function(e){
 if (e.type === "mousedown" || e.which === 13) {
 _gaq.push(["_trackEvent", "BSD Lightbox", "Close", lightboxName, 0, true]);
 }
 });
 /* Form Submitted! */
 jQuery("#lightbox-either-or form").on('submit', function(e) {
 jQuery(".spinner").show();
 e.preventDefault();
 e.stopPropagation();
 var data = {
 signup_form_id: '235',
 email: jQuery("#lightbox-either-or #email").val(),
 zip: jQuery("#lightbox-either-or #zip").val(),
 source: source_parameter,
 subsource: final_subsource
 };
 data = jQuery.param(data);
 jQuery.post("/php/process_signup_lightbox", data)
 .done( function(data, status, jqXHR){
 console.log(data, status, jqXHR);
 _gaq.push(["_trackEvent", "BSD Lightbox", "Submit", lightboxName, 0, true]);
 window.location = "http://act.pih.org/page/content/thanks-for-joining";
 })
 .fail( function(data, status,c ){ console.log(data,status,c,"fail"); jQuery(".error").slideDown(); jQuery('.spinner').hide(); });
 });
 jQuery.cookie('either-or', 'viewed', {
 expires: 7,
 path: '/',
 domain: 'pih.org'
 });
 }
 }
}
</script><!-- ********** END LIGHTBOX JS ********** --><!-- ******** START MEERKAT STYLES ******** --><style>
#meerkat-either-or {
 box-sizing: border-box;
 position: fixed;
 display: none;
 bottom:0;
 left:0;
 width: 100%;
 background: #e86d1f;
 padding: 20px 35px;
 border: none;
 z-index: 9001;
}
#meerkat-either-or .content {
 width: 100%;
 max-width: 875px;
 margin: 0 auto;
 position: relative;
}
#meerkat-either-or .content .close-button {
 position: absolute;
 top: 0;
 right: -35px;
}
#meerkat-either-or .content > div {
 float: left;
 display: inline-block;
}
#meerkat-either-or .content .content-left {
 width: 45%;
}
#meerkat-either-or .content .content-right {
 width: 53.5%;
 margin-left: 1.5%;
}
#meerkat-either-or h1 {
 margin-top: 0;
 margin-bottom: 30px;
 color: #FFF;
 font-size: 50px;
 line-height: 50px;
 text-align: left;
}
#meerkat-either-or form {
}
#meerkat-either-or form .row {
 margin-top: 15px;
}
#meerkat-either-or form input[type="text"] {
 font-family: "Whitney 4r", "Whitney A", "Whitney B", "Whitney", sans-serif;
 font-size: 24px;
 background: #f4b68f;
 color: #FFF;
 box-shadow: none;
 border: none;
 padding: 5px 10px;
 border-radius: 7px;
 height: 40px;
 box-sizing: border-box;
}
#meerkat-either-or form #email {
 width: 100%;
}
#meerkat-either-or form #zip {
 width: 30%;
 float: left;
}
#meerkat-either-or form button {
 width: 67%;
 margin-left: 3%;
 height: 40px;
 background: #FFF;
 font-size: 18px;
 font-weight: 600;
 color: #e86d1f;
 text-align: left;
 padding-right: 60px !important;
 padding-left: 10px;
 border-radius: 7px;
}
#meerkat-either-or form button span {
 background: #FFF;
 height: 26px;
 border-left: 4px solid;
 padding: 6px 8px 8px !important;
}
#meerkat-either-or form button span:after {
 font-size: 22px;
 padding: 0 2px;
}
@media only screen and (max-width: 999px) {
 #meerkat-either-or h1 {
 margin-bottom: 10px;
 font-size: 36px;
 line-height: 36px;
 padding-right: 40px;
 }
 #meerkat-either-or .content .close-button {
 position: absolute;
 top: 0;
 right: 0px;
 }
 #meerkat-either-or .content .content-left {
 width: 100%;
 display: block;
 }
 #meerkat-either-or .content .content-right {
 width: 100%;
 margin-left: 0;
 display:block;
 }
 #meerkat-either-or form #email {
 width: 29.5%;
 float: left;
 }
 #meerkat-either-or form .row {
 margin-top: 0;
 width: 68.5%;
 margin-left: 1.5%;
 float: left;
 }
 #meerkat-either-or form #zip {
 width: 30%;
 float: left;
 }
 #meerkat-either-or form button {
 width: 67%;
 margin-left: 3%;
 }
}
@media only screen and (max-width: 767px) {
 #meerkat-either-or form #email {
 width: 100%;
 float: none;
 }
 #meerkat-either-or form .row {
 margin-top: 10px;
 width: 100%;
 float: none;
 margin-left: 0;
 }
 #meerkat-either-or form #zip {
 margin-top: 0;
 width: 100%;
 float: none;
 }
 #meerkat-either-or form button {
 margin-top: 10px;
 width: 100%;
 float: none;
 margin-left: 0;
 }
}
@media only screen and (max-width: 360px) {
 #meerkat-either-or form button {
 font-size: 14px;
 }
}
</style><!-- ********* END MEERKAT STYLES ********* --><!-- ********* START MEERKAT HTML ********* --><div id="meerkat-either-or" class="reveal-meerkat" original-class="reveal-meerkat" data-name="meerkat-either-or">
 <div class="content clearfix" original-class="content clearfix">
 <a class="close-button" original-class="close-button" tabindex="1"><img src="http://act.pih.org/sites/all/themes/pih/img/x-out.png" alt="Close"></a>
 <div class="content-left" original-class="content-left">
 <h1>We believe health is a human right.</h1>
 </div>
 <div class="content-right" original-class="content-right">
 <form class="clearfix" original-class="clearfix" id="signup">
 <input type="text" name="email" id="email" placeholder="email address"><div class="row clearfix" original-class="row clearfix">
 <button type="submit" class="action-light action-split action-block" original-class="action-light action-split action-block">Join the Movement<span class="arrow" original-class="arrow"></span></button>
 </div>
 </form>
 </div>
 </div>
</div>
<!-- ********** END MEERKAT HTML ********** -->
<!-- ********** START MEERKAT JS ********** -->
<script type="text/javascript">
function testMeerkat() {
 $meerkat = jQuery('#meerkat-either-or');
 $meerkat.slideDown();
 jQuery('.close-button').on('click', function() {$meerkat.slideUp();});
}
function showMeerkat() {
 $meerkat = jQuery('#meerkat-either-or');
 $meerkat.slideDown();
 jQuery('.close-button').on('click', function() {$meerkat.slideUp();});
}
function optimizelyMeerkat(subsource) {
 // Get Meerkat name
 var meerkatName = jQuery("#meerkat-either-or").data("name");
 // set the source POST -> &source=source_parameter
 var source_parameter = ga_integration_config.util.readCookie("source") || "";
 // set the subsource POST -> &subsource=final_subsource
 // where subsource can be passed to the function
 var existing_subsource = typeof subsource !== 'undefined' ? subsource : "";
 var final_subsource = window.location.href;
 // Check LoE Level
 var guid = jQuery.cookie("guid");
 if ( guid ) {
 jQuery.ajax({
 url:"/page/graph/loe/" + guid,
 cache: true,
 dataType: "json",
 success: function( consituent ) {
 if ( consituent.email ) {isSignedUp();} else {notSignedUp();}
 },
 error: function(e) {
 console.log('error: ' + e.responseText);
 }
 });
 } else {notSignedUp();}
 function isSignedUp() {
 // Do nothing.
 _gaq.push(["_trackEvent", "BSD Meerkat", "Not Loaded (signed up)", meerkatName, 0, true]);
 }
 function notSignedUp() {
 var cookie = jQuery.cookie('either-or');
 if (cookie != 'viewed') {
 setTimeout(function() {showMeerkat();}, 5000);
 _gaq.push(["_trackEvent", "BSD Meerkat", "Load", meerkatName, 0, true]);
 /* Meerkat Closed! */
 jQuery(".close-button").one("keydown mousedown", function(e){
 if (e.type === "mousedown" || e.which === 13) {
 _gaq.push(["_trackEvent", "BSD Meerkat", "Close", meerkatName, 0, true]);
 }
 });
 /* Form Submitted! */
 jQuery("#meerkat-either-or form").on('submit', function(e) {
 jQuery(".spinner").show();
 e.preventDefault();
 e.stopPropagation();
 var data = {
 signup_form_id: '236',
 email: jQuery("#meerkat-either-or #email").val(),
 zip: jQuery("#meerkat-either-or #zip").val(),
 source: source_parameter,
 subsource: final_subsource
 };
 data = jQuery.param(data);
 jQuery.post("/php/process_signup_lightbox", data)
 .done( function(data, status, jqXHR){
 console.log(data, status, jqXHR);
 _gaq.push(["_trackEvent", "BSD Meerkat", "Submit", meerkatName, 0, true]);
 window.location = "https://donate.pih.org/page/share/Quick_signup_share";
 })
 .fail( function(data, status,c ){ console.log(data,status,c,"fail"); jQuery(".error").slideDown(); jQuery('.spinner').hide(); });
 });
 jQuery.cookie('either-or', 'viewed', {
 expires: 7,
 path: '/',
 domain: 'pih.org'
 });
 }
 }
}
</script><!-- ********** END MEERKAT JS ********** --><!-- ***** END OPTIMIZELY ***** --><footer><div class="centered clearfix" original-class="centered clearfix">
 <div class="footer-left" original-class="footer-left">
 
 <form class="quick-signup" original-class="quick-signup" action="http://act.pih.org/page/s/quicksignup" method="post">
 <div class="legend" original-class="legend">Sign up for email updates</div>
 <input type="email" name="email" id="email" placeholder="Email Address" class="text"><input type="image" name="submit" src="/sites/all/themes/pih/img/join-us-blue.png" onmouseover="this.src='/page/-/img/join-us-blue-hover.png'" onmouseout="this.src='/sites/all/themes/pih/img/join-us-blue.png'"><p>92% of your gift goes straight to those in need.</p>
 <a href="http://www.pih.org/donate" class="donate action-light action-split" original-class="donate action-light action-split">Donate Now <span class="arrow" original-class="arrow"></span></a>
 </form>
<!--/.quick-signup-->
 
 <div class="tablet-up-copyright footer-links " original-class="tablet-up-copyright footer-links " id="cse-search-box">
 <figure><figcaption class="footer-legal-copy" original-class="footer-legal-copy"><p>&copy; 2009 - <?php print variable_get('pgc_copyright_year'); ?> Partners In Health All Rights Reserved. <br><span class="reg-mark" original-class="reg-mark">PIH&reg; is a registered trademark of Partners In Health</span></p>
 
 </figcaption></figure></div>
<!--/.tablet-up-copyright.footer-links-->
 </div> <!-- /.footer-left -->
 <div class="footer-right" original-class="footer-right">
 
 <ul class="footer-nav" original-class="footer-nav"><li class="node_faq level_1 first_child" original-class="node_faq level_1 first_child">
 <a href="http://partnersinhealth.zendesk.com">FAQ</a>
 </li>
 <li class="node_contact-partners-in-health level_1" original-class="node_contact-partners-in-health level_1">
 <a href="http://www.pih.org/pages/contact-partners-in-health">Contact Us</a>
 </li>
 <li class="node_join-the-team level_1" original-class="node_join-the-team level_1">
 <a href="http://www.pih.org/pages/employment">Join the Team</a>
 </li>
 <li class="node_media-coverage level_1" original-class="node_media-coverage level_1">
 <a href="http://www.pih.org/media-coverage">Media Coverage</a>
 </li>
 <li class="node_for-the-media level_1" original-class="node_for-the-media level_1">
 <a href="http://www.pih.org/press">For the Media</a>
 </li>
 <li class="node_pih-canada level_1" original-class="node_pih-canada level_1">
 <a href="http://pihcanada.org">PIH Canada</a>
 </li>
 <li class="node_pih-alumni-network level_1 last_child" original-class="node_pih-alumni-network level_1 last_child">
 <a href="https://www.linkedin.com/groups?home=&amp;gid=7463948&amp;trk=anet_ug_hm&amp;goback;=.gmp_7463948">PIH Alumni Network</a>
 </li>
<li><a href="http://www.pih.org/pages/terms">Terms of Use</a></li>
 <li><a href="http://www.pih.org/pages/privacy-policy">Privacy Policy</a></li>
 
</ul><div class="footer-knowledge" original-class="footer-knowledge">
 <h5>Discourse &amp; tools for global health professionals:</h5>
 <a href="http://www.pih.org/knowledge-center">Knowledge Center</a>
 </div>
 
 <div class="mobile-copyright footer-links " original-class="mobile-copyright footer-links ">
 <figure><figcaption class="footer-legal-copy" original-class="footer-legal-copy"><p>&copy; 2009 - <?php print variable_get('pgc_copyright_year'); ?> Partners In Health All Rights Reserved. <br><span class="reg-mark" original-class="reg-mark">PIH&reg; is a registered trademark of Partners In Health</span></p>
 
 </figcaption></figure></div> <!-- /.mobile-copyright -->
 </div> <!-- /.footer-right -->
 </div>
<!--.centered-->
 </footer></div> <!-- /.bigSlide-push -->
 </div> <!-- /#container-->
 <!-- socialeesta -->
 <script>
(function(d){
var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
js = d.createElement('script'); js.id = id; js.async = true;
js.src = '//connect.facebook.net/en_US/all.js'
; d.getElementsByTagName('head')[0].appendChild(js);
 }(document));
</script><div id="fb-root"></div>
<script>
window.fbAsyncInit = function() {
FB.init(
{"status":true,"cookie":true,"oauth":true,"xfbml":true,"appId":"143535985683"}
);};
</script><script>
(function(){
var twsc = document.createElement('script');
twsc.type = 'text/javascript';
twsc.src = '//platform.twitter.com/widgets.js';
document.body.appendChild(twsc);
})();
</script><!-- Google Tag Manager --><noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-T7CMGH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-T7CMGH');</script><!-- End Google Tag Manager --><script type="text/javascript">
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0010/4034.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script><!-- Google Code for Sitewide Remarketing Pixel --><!-- Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. For instructions on adding this tag and more information on the above requirements, read the setup guide: google.com/ads/remarketingsetup --><script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 1011964931;
var google_conversion_label = "DR_pCP31twQQg7jF4gM";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script><script type="text/javascript" src="/sites/all/themes/pih/js/conversion.js">
</script><noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="/sites/all/themes/pih/img/1011964931"></div>
</noscript>
 </body>