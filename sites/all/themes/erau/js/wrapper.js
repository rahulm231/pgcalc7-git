!function(){function e(){if(!r&&(r=!0,l)){for(var e=0;e<l.length;e++)l[e].call(window,[]);l=[]}}function t(e){var t=window.onload;window.onload="function"!=typeof window.onload?e:function(){t&&t(),e()}}function n(){if(!d){if(d=!0,document.addEventListener&&!a.opera&&document.addEventListener("DOMContentLoaded",e,!1),a.msie&&window==top&&function(){if(!r){try{document.documentElement.doScroll("left")}catch(t){return void setTimeout(arguments.callee,0)}e()}}(),a.opera&&document.addEventListener("DOMContentLoaded",function(){if(!r){for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].disabled)return void setTimeout(arguments.callee,0);e()}},!1),a.safari){var n;!function(){if(!r){if("loaded"!=document.readyState&&"complete"!=document.readyState)return void setTimeout(arguments.callee,0);if(void 0===n){for(var t=document.getElementsByTagName("link"),o=0;o<t.length;o++)"stylesheet"==t[o].getAttribute("rel")&&n++;var i=document.getElementsByTagName("style");n+=i.length}return document.styleSheets.length!=n?void setTimeout(arguments.callee,0):void e()}}()}t(e)}}var o=window.DomReady={},i=navigator.userAgent.toLowerCase(),a={version:(i.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(i),opera:/opera/.test(i),msie:/msie/.test(i)&&!/opera/.test(i),mozilla:/mozilla/.test(i)&&!/(compatible|webkit)/.test(i)},d=!1,r=!1,l=[];o.ready=function(e){n(),r?e.call(window,[]):l.push(function(){return e.call(window,[])})},n()}();
/* 
 * @Description: This script should be placed directly after the <body> tag.
 * @Usage: <script type="text/javascript" src="wrapper.js" id="erau-wrapper-script" hide-header campus="prescott"></script>
 * @Attributes:
 * - hide-header => Will tell the script to disregard appending the header file.
 * - campus => ["daytonabeach", "prescott", "worldwide"] default is "daytonabeach". Controls copyright information.
 */

/* Get parameters from script tag. */
var parameters = document.getElementById("erau-wrapper-script");
var hideERAUHeader = parameters.getAttribute("hide-header");
var showGive = parameters.getAttribute("show-give");
var showAdmissions = parameters.getAttribute("show-admissions");
var showPortal = parameters.getAttribute("show-portal");
var campus = parameters.getAttribute("campus");
var customLinks = parameters.getAttribute("custom-links");
var footerPlacement = parameters.getAttribute("footer-placement");

var directoryLink = '<a href="http://erau.edu/administration/directory/">Directory</a>';
var accessibilityLink = '<a href="http://erau.edu/terms-use#accessibility">Accessibility</a>';
var militaryLink = '<a href="http://erau.edu/terms-use#military-disclaimer">Military Disclaimer</a>';
var termsLink = '<a href="http://erau.edu/terms-use" title="Terms of Use">Terms of&nbsp;Use</a>';
var sitemapLink = '';
var feedbackLink = '';
var separator = '&nbsp;| ';

switch (campus) {
	case "daytona-beach":
		if (location.hostname == 'daytonabeach.erau.edu') {
			sitemapLink = '<a href="http://daytonabeach.erau.edu/sitemap.html" title="Sitemap A-Z">Sitemap</a>';
			feedbackLink = '<a href="http://daytonabeach.erau.edu/feedback/index.html">Web Feedback</a>';
		}
		var infoLinks = 
			[
				sitemapLink,
				directoryLink,
				feedbackLink
			]
		var legalLinks = 
			[
				accessibilityLink,
				militaryLink,
				termsLink
			]
		var footerAddress = '600 South Clyde Morris&nbsp;Blvd.<br>Daytona Beach,&nbsp;FL 32114-3900';
		break;
	case "prescott":
		if (location.hostname == 'prescott.erau.edu') {
			sitemapLink = '<a href="http://prescott.erau.edu/sitemap.html" title="Sitemap A-Z">Sitemap</a>';
			feedbackLink = '<a href="http://prescott.erau.edu/feedback/index.html">Web Feedback</a>';
		}
		var infoLinks = 
			[
				sitemapLink,
				directoryLink,
				feedbackLink
			]
		var legalLinks = 
			[
				accessibilityLink,
				militaryLink,
				termsLink
			]
		var footerAddress = '3700 Willow Creek&nbsp;Road<br>Prescott,&nbsp;AZ 86301-3720';
		break;
	case "worldwide":
		if (location.hostname == 'worldwide.erau.edu') {
			sitemapLink = '<a href="http://worldwide.erau.edu/site-map/" title="Sitemap A-Z">Sitemap</a>';
			feedbackLink = '<a href="http://worldwide.erau.edu/feedback/">Web Feedback</a>';
		}
		var infoLinks = 
			[
				sitemapLink,
				directoryLink,
				feedbackLink,
				'<a href="http://worldwide.erau.edu/administration/contact/">Contact</a>'
			]
		var legalLinks = 
			[
				accessibilityLink,
				militaryLink,
				termsLink
			]
		var footerAddress = '600 South Clyde Morris&nbsp;Blvd.<br>Daytona Beach,&nbsp;FL 32114-3900';
		break;
	default:
		var infoLinks = [
			]
		var legalLinks = 
			[
				directoryLink,
				accessibilityLink,
				militaryLink,
				termsLink
			]
		var footerAddress = '600 South Clyde Morris&nbsp;Blvd.<br>Daytona Beach,&nbsp;FL 32114-3900';
}

// Reduce arrays
infoLinks = infoLinks.filter(function(e){return e});
legalLinks = legalLinks.filter(function(e){return e});

// If infoLinks array has just 0-1 links, merge it into legalLinks
if (infoLinks.length < 2) {
	legalLinks = infoLinks.concat(legalLinks);
	infoLinks = [];
}

// Join links with separator
infoLinks = infoLinks.join(separator);
legalLinks = legalLinks.join(separator);

// Place line-break between link groups
var footerLinks = [infoLinks, legalLinks]
	.filter(function(e){return e})
	.join('<br>');


if (customLinks == "true" || customLinks == "") {
} else if (customLinks !== null && customLinks !== "false") {
	var footerLinks = customLinks;
}

var padding = "5px";
// Display header immediatly with initial pageload.
if (!hideERAUHeader) {
	if (!showGive && !showAdmissions && !showPortal) {
		var header = '<a href="http://www.erau.edu/"><img src="https://assets.erau.edu/affiliate/logo-erau.png" alt="Embry-Riddle.edu" style="width:137px;height:23px;"></a>';
		var padding = "10px";
	} else {
		var header = '<ul class="wrapper-list-inline">';
		if (showGive) {
			header = header + '<li><a href="http://givingto.erau.edu/"><span>Give</span></a></li>';
		}
		if (showAdmissions) {
			header = header + '<li><a href="https://erau.askadmissions.net/vip/"><span>ER@YOU</span></a></li>';
		}
		if (showPortal) {
			header = header + '<li><a href="https://ernie.erau.edu"><span>ERNIE</span> <span class="icon-er-lock"></span></a></li>';
		}
		var header = header + '<li><a href="http://www.erau.edu/"><span>Embry-Riddle.edu</span></a></li></ul>';
	}
	document.write('<div id="topbar-holder" class="hidden-print"><div id="topbar" class="erau-wrapper" style="padding:' + padding + ' 0;"><div class="wrapper-container"><div class="wrapper-row wrapper-text-right wrapper-text-center-xs"><div class="wrapper-col-xs-12">' + header + '</div></div></div></div></div>');
}

// Append required CSS also with initial pageload.
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var css = '@charset "utf-8";@import url("https://assets.erau.edu/fonts/erau.css");body{margin:0}.erau-wrapper a{background:transparent}.erau-wrapper a:active,.erau-wrapper a:hover{outline:0}.erau-wrapper strong{font-weight:700}.erau-wrapper hr{margin-top:20px;margin-bottom:20px;border:0;border-top:2px solid #585858;-moz-box-sizing:content-box;box-sizing:content-box;height:0}.erau-wrapper button{color:inherit;font:inherit;margin:0;overflow:visible;text-transform:none;-webkit-appearance:button;cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit}.erau-wrapper button::-moz-focus-inner{border:0;padding:0}.erau-wrapper{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.42857143;color:#333;position:relative}.erau-wrapper *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.erau-wrapper a:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.erau-wrapper p{margin:0 0 10px}.wrapper-text-left{text-align:left}.wrapper-text-right{text-align:right}.wrapper-text-center{text-align:center}.wrapper-text-justify{text-align:justify}.erau-wrapper ul > li{padding:4px 0}.wrapper-list-unstyled{padding-left:0;list-style:none}.wrapper-list-inline{padding-left:0;list-style:none;margin-left:-5px}.erau-wrapper .wrapper-list-inline > li{display:inline-block;padding-left:5px;padding-right:5px}.wrapper-sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.wrapper-container{overflow:visible;margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px;max-width:1170px;width:100%}.wrapper-row{margin-left:-15px;margin-right:-15px}.wrapper-col-xs-1,.wrapper-col-sm-1,.wrapper-col-md-1,.wrapper-col-lg-1,.wrapper-col-xs-2,.wrapper-col-sm-2,.wrapper-col-md-2,.wrapper-col-lg-2,.wrapper-col-xs-3,.wrapper-col-sm-3,.wrapper-col-md-3,.wrapper-col-lg-3,.wrapper-col-xs-4,.wrapper-col-sm-4,.wrapper-col-md-4,.wrapper-col-lg-4,.wrapper-col-xs-5,.wrapper-col-sm-5,.wrapper-col-md-5,.wrapper-col-lg-5,.wrapper-col-xs-6,.wrapper-col-sm-6,.wrapper-col-md-6,.wrapper-col-lg-6,.wrapper-col-xs-7,.wrapper-col-sm-7,.wrapper-col-md-7,.wrapper-col-lg-7,.wrapper-col-xs-8,.wrapper-col-sm-8,.wrapper-col-md-8,.wrapper-col-lg-8,.wrapper-col-xs-9,.wrapper-col-sm-9,.wrapper-col-md-9,.wrapper-col-lg-9,.wrapper-col-xs-10,.wrapper-col-sm-10,.wrapper-col-md-10,.wrapper-col-lg-10,.wrapper-col-xs-11,.wrapper-col-sm-11,.wrapper-col-md-11,.wrapper-col-lg-11,.wrapper-col-xs-12,.wrapper-col-sm-12,.wrapper-col-md-12,.wrapper-col-lg-12{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.wrapper-col-xs-1,.wrapper-col-xs-2,.wrapper-col-xs-3,.wrapper-col-xs-4,.wrapper-col-xs-5,.wrapper-col-xs-6,.wrapper-col-xs-7,.wrapper-col-xs-8,.wrapper-col-xs-9,.wrapper-col-xs-10,.wrapper-col-xs-11,.wrapper-col-xs-12{float:left}.wrapper-col-xs-12{width:100%}.wrapper-col-xs-11{width:91.66666667%}.wrapper-col-xs-10{width:83.33333333%}.wrapper-col-xs-9{width:75%}.wrapper-col-xs-8{width:66.66666667%}.wrapper-col-xs-7{width:58.33333333%}.wrapper-col-xs-6{width:50%}.wrapper-col-xs-5{width:41.66666667%}.wrapper-col-xs-4{width:33.33333333%}.wrapper-col-xs-3{width:25%}.wrapper-col-xs-2{width:16.66666667%}.wrapper-col-xs-1{width:8.33333333%}.wrapper-col-xs-pull-12{right:100%}.wrapper-col-xs-pull-11{right:91.66666667%}.wrapper-col-xs-pull-10{right:83.33333333%}.wrapper-col-xs-pull-9{right:75%}.wrapper-col-xs-pull-8{right:66.66666667%}.wrapper-col-xs-pull-7{right:58.33333333%}.wrapper-col-xs-pull-6{right:50%}.wrapper-col-xs-pull-5{right:41.66666667%}.wrapper-col-xs-pull-4{right:33.33333333%}.wrapper-col-xs-pull-3{right:25%}.wrapper-col-xs-pull-2{right:16.66666667%}.wrapper-col-xs-pull-1{right:8.33333333%}.wrapper-col-xs-pull-0{right:0}.wrapper-col-xs-push-12{left:100%}.wrapper-col-xs-push-11{left:91.66666667%}.wrapper-col-xs-push-10{left:83.33333333%}.wrapper-col-xs-push-9{left:75%}.wrapper-col-xs-push-8{left:66.66666667%}.wrapper-col-xs-push-7{left:58.33333333%}.wrapper-col-xs-push-6{left:50%}.wrapper-col-xs-push-5{left:41.66666667%}.wrapper-col-xs-push-4{left:33.33333333%}.wrapper-col-xs-push-3{left:25%}.wrapper-col-xs-push-2{left:16.66666667%}.wrapper-col-xs-push-1{left:8.33333333%}.wrapper-col-xs-push-0{left:0}.wrapper-col-xs-offset-12{margin-left:100%}.wrapper-col-xs-offset-11{margin-left:91.66666667%}.wrapper-col-xs-offset-10{margin-left:83.33333333%}.wrapper-col-xs-offset-9{margin-left:75%}.wrapper-col-xs-offset-8{margin-left:66.66666667%}.wrapper-col-xs-offset-7{margin-left:58.33333333%}.wrapper-col-xs-offset-6{margin-left:50%}.wrapper-col-xs-offset-5{margin-left:41.66666667%}.wrapper-col-xs-offset-4{margin-left:33.33333333%}.wrapper-col-xs-offset-3{margin-left:25%}.wrapper-col-xs-offset-2{margin-left:16.66666667%}.wrapper-col-xs-offset-1{margin-left:8.33333333%}.wrapper-col-xs-offset-0{margin-left:0}@media (min-width: 480px){.wrapper-col-sm-1,.wrapper-col-sm-2,.wrapper-col-sm-3,.wrapper-col-sm-4,.wrapper-col-sm-5,.wrapper-col-sm-6,.wrapper-col-sm-7,.wrapper-col-sm-8,.wrapper-col-sm-9,.wrapper-col-sm-10,.wrapper-col-sm-11,.wrapper-col-sm-12{float:left}.wrapper-col-sm-12{width:100%}.wrapper-col-sm-11{width:91.66666667%}.wrapper-col-sm-10{width:83.33333333%}.wrapper-col-sm-9{width:75%}.wrapper-col-sm-8{width:66.66666667%}.wrapper-col-sm-7{width:58.33333333%}.wrapper-col-sm-6{width:50%}.wrapper-col-sm-5{width:41.66666667%}.wrapper-col-sm-4{width:33.33333333%}.wrapper-col-sm-3{width:25%}.wrapper-col-sm-2{width:16.66666667%}.wrapper-col-sm-1{width:8.33333333%}.wrapper-col-sm-pull-12{right:100%}.wrapper-col-sm-pull-11{right:91.66666667%}.wrapper-col-sm-pull-10{right:83.33333333%}.wrapper-col-sm-pull-9{right:75%}.wrapper-col-sm-pull-8{right:66.66666667%}.wrapper-col-sm-pull-7{right:58.33333333%}.wrapper-col-sm-pull-6{right:50%}.wrapper-col-sm-pull-5{right:41.66666667%}.wrapper-col-sm-pull-4{right:33.33333333%}.wrapper-col-sm-pull-3{right:25%}.wrapper-col-sm-pull-2{right:16.66666667%}.wrapper-col-sm-pull-1{right:8.33333333%}.wrapper-col-sm-pull-0{right:0}.wrapper-col-sm-push-12{left:100%}.wrapper-col-sm-push-11{left:91.66666667%}.wrapper-col-sm-push-10{left:83.33333333%}.wrapper-col-sm-push-9{left:75%}.wrapper-col-sm-push-8{left:66.66666667%}.wrapper-col-sm-push-7{left:58.33333333%}.wrapper-col-sm-push-6{left:50%}.wrapper-col-sm-push-5{left:41.66666667%}.wrapper-col-sm-push-4{left:33.33333333%}.wrapper-col-sm-push-3{left:25%}.wrapper-col-sm-push-2{left:16.66666667%}.wrapper-col-sm-push-1{left:8.33333333%}.wrapper-col-sm-push-0{left:0}.wrapper-col-sm-offset-12{margin-left:100%}.wrapper-col-sm-offset-11{margin-left:91.66666667%}.wrapper-col-sm-offset-10{margin-left:83.33333333%}.wrapper-col-sm-offset-9{margin-left:75%}.wrapper-col-sm-offset-8{margin-left:66.66666667%}.wrapper-col-sm-offset-7{margin-left:58.33333333%}.wrapper-col-sm-offset-6{margin-left:50%}.wrapper-col-sm-offset-5{margin-left:41.66666667%}.wrapper-col-sm-offset-4{margin-left:33.33333333%}.wrapper-col-sm-offset-3{margin-left:25%}.wrapper-col-sm-offset-2{margin-left:16.66666667%}.wrapper-col-sm-offset-1{margin-left:8.33333333%}.wrapper-col-sm-offset-0{margin-left:0}}@media (min-width: 768px){.wrapper-col-md-1,.wrapper-col-md-2,.wrapper-col-md-3,.wrapper-col-md-4,.wrapper-col-md-5,.wrapper-col-md-6,.wrapper-col-md-7,.wrapper-col-md-8,.wrapper-col-md-9,.wrapper-col-md-10,.wrapper-col-md-11,.wrapper-col-md-12{float:left}.wrapper-col-md-12{width:100%}.wrapper-col-md-11{width:91.66666667%}.wrapper-col-md-10{width:83.33333333%}.wrapper-col-md-9{width:75%}.wrapper-col-md-8{width:66.66666667%}.wrapper-col-md-7{width:58.33333333%}.wrapper-col-md-6{width:50%}.wrapper-col-md-5{width:41.66666667%}.wrapper-col-md-4{width:33.33333333%}.wrapper-col-md-3{width:25%}.wrapper-col-md-2{width:16.66666667%}.wrapper-col-md-1{width:8.33333333%}.wrapper-col-md-pull-12{right:100%}.wrapper-col-md-pull-11{right:91.66666667%}.wrapper-col-md-pull-10{right:83.33333333%}.wrapper-col-md-pull-9{right:75%}.wrapper-col-md-pull-8{right:66.66666667%}.wrapper-col-md-pull-7{right:58.33333333%}.wrapper-col-md-pull-6{right:50%}.wrapper-col-md-pull-5{right:41.66666667%}.wrapper-col-md-pull-4{right:33.33333333%}.wrapper-col-md-pull-3{right:25%}.wrapper-col-md-pull-2{right:16.66666667%}.wrapper-col-md-pull-1{right:8.33333333%}.wrapper-col-md-pull-0{right:0}.wrapper-col-md-push-12{left:100%}.wrapper-col-md-push-11{left:91.66666667%}.wrapper-col-md-push-10{left:83.33333333%}.wrapper-col-md-push-9{left:75%}.wrapper-col-md-push-8{left:66.66666667%}.wrapper-col-md-push-7{left:58.33333333%}.wrapper-col-md-push-6{left:50%}.wrapper-col-md-push-5{left:41.66666667%}.wrapper-col-md-push-4{left:33.33333333%}.wrapper-col-md-push-3{left:25%}.wrapper-col-md-push-2{left:16.66666667%}.wrapper-col-md-push-1{left:8.33333333%}.wrapper-col-md-push-0{left:0}.wrapper-col-md-offset-12{margin-left:100%}.wrapper-col-md-offset-11{margin-left:91.66666667%}.wrapper-col-md-offset-10{margin-left:83.33333333%}.wrapper-col-md-offset-9{margin-left:75%}.wrapper-col-md-offset-8{margin-left:66.66666667%}.wrapper-col-md-offset-7{margin-left:58.33333333%}.wrapper-col-md-offset-6{margin-left:50%}.wrapper-col-md-offset-5{margin-left:41.66666667%}.wrapper-col-md-offset-4{margin-left:33.33333333%}.wrapper-col-md-offset-3{margin-left:25%}.wrapper-col-md-offset-2{margin-left:16.66666667%}.wrapper-col-md-offset-1{margin-left:8.33333333%}.wrapper-col-md-offset-0{margin-left:0}}@media (min-width: 992px){.wrapper-col-lg-1,.wrapper-col-lg-2,.wrapper-col-lg-3,.wrapper-col-lg-4,.wrapper-col-lg-5,.wrapper-col-lg-6,.wrapper-col-lg-7,.wrapper-col-lg-8,.wrapper-col-lg-9,.wrapper-col-lg-10,.wrapper-col-lg-11,.wrapper-col-lg-12{float:left}.wrapper-col-lg-12{width:100%}.wrapper-col-lg-11{width:91.66666667%}.wrapper-col-lg-10{width:83.33333333%}.wrapper-col-lg-9{width:75%}.wrapper-col-lg-8{width:66.66666667%}.wrapper-col-lg-7{width:58.33333333%}.wrapper-col-lg-6{width:50%}.wrapper-col-lg-5{width:41.66666667%}.wrapper-col-lg-4{width:33.33333333%}.wrapper-col-lg-3{width:25%}.wrapper-col-lg-2{width:16.66666667%}.wrapper-col-lg-1{width:8.33333333%}.wrapper-col-lg-pull-12{right:100%}.wrapper-col-lg-pull-11{right:91.66666667%}.wrapper-col-lg-pull-10{right:83.33333333%}.wrapper-col-lg-pull-9{right:75%}.wrapper-col-lg-pull-8{right:66.66666667%}.wrapper-col-lg-pull-7{right:58.33333333%}.wrapper-col-lg-pull-6{right:50%}.wrapper-col-lg-pull-5{right:41.66666667%}.wrapper-col-lg-pull-4{right:33.33333333%}.wrapper-col-lg-pull-3{right:25%}.wrapper-col-lg-pull-2{right:16.66666667%}.wrapper-col-lg-pull-1{right:8.33333333%}.wrapper-col-lg-pull-0{right:0}.wrapper-col-lg-push-12{left:100%}.wrapper-col-lg-push-11{left:91.66666667%}.wrapper-col-lg-push-10{left:83.33333333%}.wrapper-col-lg-push-9{left:75%}.wrapper-col-lg-push-8{left:66.66666667%}.wrapper-col-lg-push-7{left:58.33333333%}.wrapper-col-lg-push-6{left:50%}.wrapper-col-lg-push-5{left:41.66666667%}.wrapper-col-lg-push-4{left:33.33333333%}.wrapper-col-lg-push-3{left:25%}.wrapper-col-lg-push-2{left:16.66666667%}.wrapper-col-lg-push-1{left:8.33333333%}.wrapper-col-lg-push-0{left:0}.wrapper-col-lg-offset-12{margin-left:100%}.wrapper-col-lg-offset-11{margin-left:91.66666667%}.wrapper-col-lg-offset-10{margin-left:83.33333333%}.wrapper-col-lg-offset-9{margin-left:75%}.wrapper-col-lg-offset-8{margin-left:66.66666667%}.wrapper-col-lg-offset-7{margin-left:58.33333333%}.wrapper-col-lg-offset-6{margin-left:50%}.wrapper-col-lg-offset-5{margin-left:41.66666667%}.wrapper-col-lg-offset-4{margin-left:33.33333333%}.wrapper-col-lg-offset-3{margin-left:25%}.wrapper-col-lg-offset-2{margin-left:16.66666667%}.wrapper-col-lg-offset-1{margin-left:8.33333333%}.wrapper-col-lg-offset-0{margin-left:0}}.wrapper-btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:14px;line-height:1.42857143;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wrapper-btn:focus,.wrapper-btn:active:focus,.wrapper-btn.active:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.wrapper-btn:hover,.wrapper-btn:focus{color:#333;text-decoration:none}.wrapper-btn:active,.wrapper-btn.active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.wrapper-erau-wrapper .btn-link{color:#428bca;font-weight:400;cursor:pointer;border-radius:0}.wrapper-btn-link,.wrapper-btn-link:active,.wrapper-btn-link[disabled],.erau-wrapper fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.wrapper-btn-link,.wrapper-btn-link:hover,.wrapper-btn-link:focus,.wrapper-btn-link:active{border-color:transparent}.wrapper-btn-link:hover,.wrapper-btn-link:focus{color:#2a6496;text-decoration:underline;background-color:transparent}.wrapper-btn-block{display:block;width:100%;padding-left:0;padding-right:0}.wrapper-clearfix:before,.wrapper-clearfix:after,.wrapper-container:before,.wrapper-container:after,.wrapper-row:before,.wrapper-row:after{content:" ";display:table}.wrapper-clearfix:after,.wrapper-container:after,.wrapper-row:after{clear:both}.wrapper-center-block{display:block;margin-left:auto;margin-right:auto}.wrapper-pull-right{float:right!important;}.wrapper-pull-left{float:left!important}.wrapper-hide{display:none!important}.wrapper-show{display:block!important}.wrapper-invisible{visibility:hidden}.wrapper-text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.wrapper-hidden{display:none!important;visibility:hidden!important}.wrapper-visible-xs,.wrapper-visible-sm,.wrapper-visible-md,.wrapper-visible-lg{display:none!important}@media (max-width: 479px){.wrapper-visible-xs{display:block!important}}@media (min-width: 480px) and (max-width: 767px){.wrapper-visible-sm{display:block!important}}@media (min-width: 768px) and (max-width: 991px){.wrapper-visible-md{display:block!important}}@media (min-width: 992px){.wrapper-visible-lg{display:block!important}}@media (max-width: 479px){.wrapper-hidden-xs{display:none!important}}@media (min-width: 480px) and (max-width: 767px){.wrapper-hidden-sm{display:none!important}}@media (min-width: 768px) and (max-width: 991px){.wrapper-hidden-md{display:none!important}}@media (min-width: 992px){.wrapper-hidden-lg{display:none!important}}.wrapper-no-wrap{white-space:nowrap}.erau-wrapper p{line-height:24px}.erau-wrapper a,.erau-wrapper a:link{font-weight:700}.erau-wrapper a:hover{text-decoration:underline}#topbar-holder{background:#a5915e;background-image:-webkit-linear-gradient(top,color-stop(rgba(163,145,97,1.0) 0%),color-stop(rgba(162,144,94,1.0) 100%));background-image:linear-gradient(to bottom,rgba(163,145,97,1.0) 0%,rgba(162,144,94,1.0) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#a39161",endColorstr="#a2905e",GradientType=0);clear:both}#topbar{background-color:#a39161;font-size:12px;margin-left:auto;margin-right:auto;width:100%;padding:4px 12px;overflow:hidden}#topbar ul{text-align:center;margin:0}#topbar ul li{margin-left:12px;white-space:nowrap}#topbar ul li:first-child{margin-left:0}#topbar a{color:#4c3525;text-decoration:none}#topbar .icon-er-vip-square,#topbar .icon-er-lock{font-size:18px}#topbar .icon-er-eagle{font-size:24px}#topbar *{vertical-align:middle}@media only screen and (min-width: 480px){.erau-wrapper a:link{text-decoration:underline}#topbar ul{text-align:right}}@media only screen and (min-width: 768px){.erau-wrapper a:link,.erau-wrapper a:visited{text-decoration:none}.erau-wrapper a:hover{text-decoration:underline}#topbar-holder{display:block}}.erau-wrapper a{border:0;-webkit-transition:color .1s ease-out;-moz-transition:color .1s ease-out;-o-transition:color .1s ease-out;transition:color .1s ease-out}.erau-wrapper a:hover,.erau-wrapper a:focus,.erau-wrapper a:active,.wrapper-btn:hover,.wrapper-btn:focus,.wrapper-btn:active{text-decoration:none}#topbar-holder,#university-links,#university-copyright,.erau-wrapper ul,.erau-wrapper p{font-size:12px;line-height:2;position:relative}#topbar-holder{z-index:2;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,0.3);box-shadow:0 2px 5px 0 rgba(0,0,0,0.3)}#topbar-holder a{color:#3e3009;font-weight:700}#topbar-holder a:hover,#topbar-holder a:focus,#topbar-holder a:active{color:#715817}#topbar-holder + div{position:relative;z-index:1}#erau-wrapper-footer-toggle{text-align:left;padding:10px 15px;background:rgba(0,0,0,0.1)}#university-links{background-color:#666666;color:#a5a5a5;clear:both;text-shadow:0 1px 2px #333;text-shadow:0 1px 2px rgba(0,0,0,0.4)}#university-links h4{color:#d6d6d6;text-shadow:0 1px 2px #333;text-shadow:0 1px 2px rgba(0,0,0,0.4);margin:0}#erau-wrapper-footer-expandable{padding-top:30px;padding-bottom:30px}#university-links a{color:#e8e8e8;font-weight:700}#university-links a:hover,#university-links a:focus,#university-links a:active{color:#9b9b9b}#university-links ul{border-right:2px solid #585858;margin:0}#university-links ul:last-child{border-right:0}#university-links li{list-style:none}#university-copyright{background-color:#2a2a2a;color:#d1d1d1;padding:40px 0;width:100%;display:block;clear:both}#university-copyright a{color:#fff;text-decoration:none}#university-copyright a:hover,#university-copyright a:focus,#university-copyright a:active{color:gray}#university-copyright .icon-eagle,#university-copyright .icon-er-eagle{font-size:81px;color:#A39161}#university-copyright a:hover .icon-eagle,#university-copyright a:focus .icon-eagle,#university-copyright a:active .icon-eagle,#university-copyright a:hover .icon-er-eagle,#university-copyright a:focus .icon-er-eagle,#university-copyright a:active .icon-er-eagle{color:#635a44}#university-copyright .wrapper-social{line-height:0;margin-bottom:0;margin-top:15px;}#university-copyright .wrapper-social a{font-size:30px;}#university-copyright .wrapper-social a, #university-copyright .wrapper-social + p a{color:#a3a3a3}#university-copyright .wrapper-social a:hover,#university-copyright .wrapper-social a:focus,#university-copyright .wrapper-social a:active,#university-copyright .wrapper-social + p a:hover,#university-copyright .wrapper-social + p a:focus,#university-copyright .wrapper-social + p a:active{color:#767676}.erau-wrapper [class^="icon-"],.erau-wrapper [class*=" icon-"]{display:inline;width:auto;height:auto;background:none;margin-top:0}.erau-wrapper li{float:none;margin:0}.erau-wrapper p.text-center,.wrapper-text-center p{text-align:center}.erau-wrapper p.text-left,.wrapper-text-left p{text-align:left}.erau-wrapper p.text-right,.wrapper-text-right p{text-align:right}@media (max-width: 479px){.wrapper-text-right-xs,.wrapper-text-right-xs p{text-align:right!important}.wrapper-text-left-xs,.wrapper-text-left-xs p{text-align:left!important}.wrapper-text-center-xs,.wrapper-text-center-xs p{text-align:center!important}#university-links ul:nth-child(2),#university-links ul:nth-child(4){border-right:0}.wrapper-clear-xs{clear:both}}@media (min-width: 480px) and (max-width: 767px){.wrapper-text-right-sm,.wrapper-text-right-sm p{text-align:right!important}.wrapper-text-left-sm,.wrapper-text-left-sm p{text-align:left!important}.wrapper-text-center-sm,.wrapper-text-center-sm p{text-align:center!important}#university-links ul:nth-child(2){border-right:0}.wrapper-clear-sm{clear:both}}@media (min-width: 768px) and (max-width: 991px){.wrapper-text-right-md,.wrapper-text-right-md p{text-align:right!important}.wrapper-text-left-md,.wrapper-text-left-md p{text-align:left!important}.wrapper-text-center-md,.wrapper-text-center-md p{text-align:center!important}.wrapper-clear-md{clear:both}}@media (min-width: 992px){.wrapper-text-right-lg,.wrapper-text-right-lg p{text-align:right!important}.wrapper-text-left-lg,.wrapper-text-left-lg p{text-align:left!important}.wrapper-text-center-lg,.wrapper-text-center-lg p{text-align:center!important}.wrapper-clear-lg{clear:both}}';
style.type = 'text/css';
head.appendChild(style);
if (style.styleSheet){
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}

function addEvent(element, eventName, func) {
	if (element) {
        if (element.addEventListener) {
        	return element.addEventListener(eventName, func, false);
        } else if (element.attachEvent) {
            return element.attachEvent("on" + eventName, func);
        }
    }
};

// Append all footer DOM.
var currentYear = new Date().getFullYear();
var footer = document.createElement('div');
footer.style.clear = "both";
footer.className = "hidden-print";
footer.innerHTML = '<div id="university-links" class="erau-wrapper"><button id="erau-wrapper-footer-toggle" class="toggle wrapper-btn wrapper-btn-link wrapper-btn-block wrapper-visible-xs" type="button"><h4><span class="icon-er-menu wrapper-pull-right"></span>University Links</h4></button><div id="erau-wrapper-footer-expandable" class="wrapper-container expandable wrapper-hidden-xs wrapper-text-center"><div class="row"><ul class="wrapper-list-unstyled wrapper-col-xs-6 wrapper-col-sm-4 wrapper-col-lg-2"><li><a href="http://faculty.erau.edu/">Faculty Directory</a></li><li><a href="http://givingto.erau.edu/">Giving to ERAU</a></li><li><a href="http://crowdfunding.erau.edu/">Crowdfunding</a></li><li><a href="http://alumni.erau.edu/">Alumni Association</a></li><li><a href="http://catalog.erau.edu/">Course Catalog</a></li></ul><ul class="wrapper-list-unstyled wrapper-col-xs-6 wrapper-col-sm-4 wrapper-col-sm-push-4 wrapper-col-lg-2 wrapper-col-lg-push-0"><li><a href="http://news.erau.edu/">Newsroom</a></li><li><a href="http://embryriddlesports.com/">Athletics</a></li><li><a href="http://summercamps.erau.edu/">Summer Camps</a></li><li><a href="http://dualenrollment.erau.edu/">Dual Enrollment</a></li><li><a href="http://lift.erau.edu/">Lift Magazine</a></li></ul><div class="wrapper-clearfix wrapper-col-xs-12 wrapper-visible-xs wrapper-clearfix"><hr></div><ul class="wrapper-list-unstyled wrapper-col-xs-12 wrapper-col-sm-4 wrapper-col-sm-pull-4 wrapper-col-lg-4 wrapper-col-lg-pull-0"><li><a href="http://daytonabeach.erau.edu/">Daytona Beach, FL Campus</a></li><li><a href="http://prescott.erau.edu/">Prescott, AZ Campus</a></li><li><a href="http://worldwide.erau.edu/">Worldwide Campus</a></li><li><a href="http://online.erau.edu/">Online Campus</a></li><li><a href="http://asia.erau.edu/">Asia Campus</a></li></ul><div class="wrapper-clearfix wrapper-col-xs-12 wrapper-visible-xs wrapper-visible-sm wrapper-visible-md wrapper-clearfix"><hr></div><ul class="wrapper-list-unstyled wrapper-col-xs-6 wrapper-col-sm-4 wrapper-col-sm-push-2 wrapper-col-lg-2 wrapper-col-lg-push-0"><li><a href="http://careerservices.erau.edu/">Career Services</a></li><li><a href="http://eraucareers.erau.edu/">Working at ERAU</a></li><li><a href="http://proed.erau.edu/"><span class="wrapper-hidden-md wrapper-hidden-lg">Professional Education</span><span class="wrapper-visible-md wrapper-visible-lg">Professional Ed.</span></a></li><li><a href="http://erau.edu/administration/consumer-information/">Consumer Information</a></li><li><a href="https://erau.edu/administration/title-ix/">Civil Rights Equity&nbsp;&amp; Title&nbsp;IX</a></li></ul><ul class="wrapper-list-unstyled wrapper-col-xs-6 wrapper-col-sm-4 wrapper-col-sm-push-2 wrapper-col-lg-2 wrapper-col-lg-push-0"><li><a href="http://research.erau.edu/">Research at ERAU</a></li><li><a href="http://undergraduateresearch.erau.edu/">Undergraduate Research</a></li><li><a href="http://nextgen.erau.edu/">NextGen Programs</a></li><li><a href="http://commons.erau.edu/">Scholarly Commons</a></li><li><a href="http://library.erau.edu/">Library</a></li></ul></div></div></div><div id="university-copyright" class="erau-wrapper"><div class="wrapper-container wrapper-text-center"><div class="wrapper-row"><div class="wrapper-col-md-2 wrapper-col-md-push-5" style="margin-top:-20px;"><p><a href="http://www.erau.edu/" style="text-decoration:none;display:inline-block;"><span class="icon-er-eagle"></span><br><strong>erau.edu</strong></a></p></div><div class="wrapper-col-sm-6 wrapper-col-md-5 wrapper-col-md-pull-2 wrapper-text-center wrapper-text-right-sm wrapper-text-right-md wrapper-text-right-lg"><p>Administrative Offices: <br class="wrapper-visible-xs wrapper-visible-sm">' + footerAddress + '</p></div><p class="wrapper-col-sm-6 wrapper-col-md-5 wrapper-text-center wrapper-text-left-sm wrapper-text-left-md wrapper-text-left-lg">Copyright &copy; '+ currentYear +' <br class="wrapper-visible-xs wrapper-visible-sm"><a href="http://www.erau.edu/">Embry-Riddle Aeronautical&nbsp;University</a>. <br>All rights reserved.</p></div><div class="wrapper-row"><div class="wrapper-col-xs-12"><p class="text-center"><br>'+footerLinks+'</p></div></div><div class="wrapper-row"><ul class="wrapper-social wrapper-list-inline"><li><a href="https://www.facebook.com/EmbryRiddleUniversity"><span class="wrapper-sr-only">Facebook</span><span class="icon-er-facebook-square"></span></a></li><li><a href="https://twitter.com/EmbryRiddle"><span class="wrapper-sr-only">Twitter</span><span class="icon-er-twitter-square"></span></a></li><li><a href="http://instagram.com/EmbryRiddle"><span class="wrapper-sr-only">Instagram</span><span class="icon-er-instagram-square"></span></a></li><li><a href="https://www.linkedin.com/edu/school?id=18085"><span class="wrapper-sr-only">LinkedIn</span><span class="icon-er-linkedin-square"></span></a></li></ul><p class="text-center"><a class="wrapper-alt-link" href="http://social.erau.edu/">social.erau.edu</a></p></div></div></div>';

// Wait for DOM to be loaded before appending footer.
DomReady.ready(function() {

	if (footerPlacement !== null && footerPlacement !== "") {
		var footerPlacementSegments = footerPlacement.split(" ");
		var location = footerPlacementSegments[footerPlacementSegments.length-1];

		if (location == footerPlacement) {
			// No first parameter provided. Treat footerPlacement as ID.
			// console.log('Place footer after #' + location);
			applyFooter(location);
		} else {
			switch (footerPlacementSegments[0]) {
				case "before":
					// console.log('Place footer before #' + location);
					applyFooter(location, 'before');
					break;
				case "prepend":
					// console.log('Prepend footer in #' + location);
					applyFooter(location, 'prepend');
					break;
				case "append":
					// console.log('Append footer in #' + location);
					applyFooter(location, 'append');
					break;
				default:
					// console.log('Place footer after #' + location);
					applyFooter(location, 'after');
			}
		}
	} else {
		// Default footer location: inject to #entirety if present, otherwise end of page
		applyFooter('entirety');
	}


	// Enable footer menu on mobile.
	addEvent(document.getElementById("erau-wrapper-footer-toggle"), 'click', toggleFooterLinks);
	//document.getElementById().addEventListener('click', toggleFooterLinks, false);
	function toggleFooterLinks() {
		toggleClass('wrapper-hidden-xs', document.getElementById("erau-wrapper-footer-expandable"));
	}
	function toggleClass(toggleClass,el) {
	  var current = el.className.split(/\s+/)
		 ,exist   =  ~current.indexOf(toggleClass)
	  current.splice(exist ? current.indexOf(toggleClass) : 0,
					 exist ? 1 : 0, 
					!exist ? toggleClass : null);
	  el.className = current.join(' ').trim();
	}
});

function applyFooter(id,position) {
	if (document.getElementById(id)) {
		if (document.getElementById(id) instanceof Object) {
			switch (position) {
				case "before":
					document.getElementById(id).parentNode.insertBefore(footer, document.getElementById(id));
					break;
				case "prepend":
					document.getElementById(id).insertBefore(footer,document.getElementById(id).firstChild);
					break;
				case "append":
					document.getElementById(id).appendChild(footer);
					break;
				default:
					document.getElementById(id).parentNode.insertBefore(footer, document.getElementById(id).nextSibling);
			}
		} else {
			document.getElementsByTagName('body')[0].appendChild(footer);
		}
	} else {
		document.getElementsByTagName('body')[0].appendChild(footer);
	}
}