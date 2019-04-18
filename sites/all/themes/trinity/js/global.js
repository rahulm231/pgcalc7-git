/*
 *  Linkify - v1.1.6
 *  Find URLs in plain text and return HTML for discovered links.
 *  https://github.com/HitSend/jQuery-linkify/
 *
 *  Made by SoapBox Innovations, Inc.
 *  Under MIT License
 */

var globalFunctions = {};

!function(a,b,c){"use strict";function d(a,b){this._defaults=e,this.element=a,this.setOptions(b),this.init()}var e={tagName:"a",newLine:"\n",target:"_blank",linkClass:null,linkClasses:[],linkAttributes:null};d.prototype={constructor:d,init:function(){1===this.element.nodeType?d.linkifyNode.call(this,this.element):this.element=d.linkify.call(this,this.element.toString())},setOptions:function(a){this.settings=d.extendSettings(a,this.settings)},toString:function(){return this.element.toString()}},d.extendSettings=function(a,b){var c;b=b||{};for(c in e)b[c]||(b[c]=e[c]);for(c in a)b[c]=a[c];return b},d.linkMatch=new RegExp(["(",'\\s|[^a-zA-Z0-9.\\+_\\/"\\>\\-]|^',")(?:","(","[a-zA-Z0-9\\+_\\-]+","(?:","\\.[a-zA-Z0-9\\+_\\-]+",")*@",")?(","http:\\/\\/|https:\\/\\/|ftp:\\/\\/",")?(","(?:(?:[a-zA-Z0-9][a-zA-Z0-9_%\\-_+]*\\.)+)",")(","(?:com|ca|co|edu|gov|net|org|dev|biz|cat|int|pro|tel|mil|aero|asia|coop|info|jobs|mobi|museum|name|post|travel|local|[a-zA-Z]{2})",")(","(?::\\d{1,5})",")?(","(?:","[\\/|\\?]","(?:","[\\-a-zA-Z0-9_%#*&+=~!?,;:.\\/]*",")*",")","[\\-\\/a-zA-Z0-9_%#*&+=~]","|","\\/?",")?",")(",'[^a-zA-Z0-9\\+_\\/"\\<\\-]|$',")"].join(""),"g"),d.emailLinkMatch=/(<[a-zA-Z]+ href=\")(http:\/\/)([a-zA-Z0-9\+_\-]+(?:\.[a-zA-Z0-9\+_\-]+)*@)/g,d.linkify=function(a,b){var c,e,f,g=[];this.constructor===d&&this.settings?(e=this.settings,b&&(e=d.extendSettings(b,e))):e=d.extendSettings(b),f=e.linkClass?e.linkClass.split(/\s+/):[],f.push.apply(f,e.linkClasses),a=a.replace(/</g,"&lt;").replace(/(\s)/g,"$1$1"),g.push("$1<"+e.tagName,'href="http://$2$4$5$6$7"'),g.push('class="linkified'+(f.length>0?" "+f.join(" "):"")+'"'),e.target&&g.push('target="'+e.target+'"');for(c in e.linkAttributes)g.push([c,'="',e.linkAttributes[c].replace(/\"/g,"&quot;").replace(/\$/g,"&#36;"),'"'].join(""));return g.push(">$2$3$4$5$6$7</"+e.tagName+">$8"),a=a.replace(d.linkMatch,g.join(" ")),a=a.replace(d.emailLinkMatch,"$1mailto:$3"),a=a.replace(/(\s){2}/g,"$1"),a=a.replace(/\n/g,e.newLine)},d.linkifyNode=function(a){var b,e,f,g,h;if(a&&"object"==typeof a&&1===a.nodeType&&"a"!==a.tagName.toLowerCase()&&!/[^\s]linkified[\s$]/.test(a.className)){for(b=[],g=d._dummyElement||c.createElement("div"),e=a.firstChild,f=a.childElementCount;e;){if(3===e.nodeType){for(;g.firstChild;)g.removeChild(g.firstChild);for(g.innerHTML=d.linkify.call(this,e.textContent||e.innerText||e.nodeValue),b.push.apply(b,g.childNodes);g.firstChild;)g.removeChild(g.firstChild)}else 1===e.nodeType?b.push(d.linkifyNode(e)):b.push(e);e=e.nextSibling}for(;a.firstChild;)a.removeChild(a.firstChild);for(h=0;h<b.length;h++)a.appendChild(b[h])}return a},d._dummyElement=c.createElement("div"),a.fn.linkify=function(b){return this.each(function(){var c;(c=a.data(this,"plugin-linkify"))?(c.setOptions(b),c.init()):a.data(this,"plugin-linkify",new d(this,b))})},a.fn.linkify.Constructor=d,a(b).on("load",function(){a("[data-linkify]").each(function(){var b,c=a(this),d=c.attr("data-linkify"),e={tagName:c.attr("data-linkify-tagname"),newLine:c.attr("data-linkify-newline"),target:c.attr("data-linkify-target"),linkClass:c.attr("data-linkify-linkclass")};for(var f in e)"undefined"==typeof e[f]&&delete e[f];b="this"===d?c:c.find(d),b.linkify(e)})}),a("body").on("click",".linkified",function(){var c=a(this),d=c.attr("href"),e=/^mailto:/i.test(d),f=c.attr("target");return e?b.location.href=d:b.open(d,f),!1})}(jQuery,window,document);

jQuery.support.css3transition = (function () {
	var thisBody = document.body || document.documentElement,
		thisStyle = thisBody.style,
		support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
	return support;
})();

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.MaxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

// check for valid email address
function isEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
//converts all static email addresses into hyperlinked email addresses
function emailize() {
    var all = document.getElementsByTagName("*");
    var tagNames = ["BODY", "HTML", "SCRIPT", "A", "LINK", "TITLE", "META", "NOSCRIPT", "FORM", "INPUT"];
    var regEx = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;
    for (var i = 0, max = all.length; i < max; i++) {
        if (tagNames.indexOf(all[i].tagName) < 0 && (typeof all[i].textContent != "undefined" || jQuery.trim(all[i].textContent) != "")) {
            var match = all[i].textContent.match(regEx);
            if (match != null && all[i].innerHTML.search("mailto:" + match[0]) < 0) {

                var hyperlinkEmail = "<a href='mailto:" + match[0] + "'>" + match[0] + "</a>";
                all[i].innerHTML = all[i].innerHTML.replace(regEx, hyperlinkEmail);
            }
        }
    }
}

function validateBrochureForm() {
    var fName = jQuery.trim(document.forms["brochureform"]["first"].value);
    var lName = jQuery.trim(document.forms["brochureform"]["last"].value);
    var email = jQuery.trim(document.forms["brochureform"]["email"].value);
    var checkpoint = function() {
        if (document.forms["brochureform"]["honeypot"]) return jQuery.trim(document.forms["brochureform"]["honeypot"].value);
        if (document.forms["brochureform"]["ebroCheckpoint"]) return jQuery.trim(document.forms["brochureform"]["ebroCheckpoint"].value);
    }

    if ("" != checkpoint()) {
        //spam bot filled in hidden field, bypass form submission
        jQuery.magnificPopup.close();
        return false;
    } else if (fName != "" && lName != "" && email != "") {
        if (!isEmail(email)) {
            alert("Please enter a valid email address");
            return false;
        } else {
            jQuery.magnificPopup.close();
            return true;
        }
    } else {
        alert("Please fill your first name, last name and email address");
        return false;
    }
}
function validatePEPCForm(){
	var fName = jQuery.trim(document.forms["PEPCForm"]["first"].value);
	var lName = jQuery.trim(document.forms["PEPCForm"]["last"].value);
	var email = jQuery.trim(document.forms["PEPCForm"]["email"].value);
	var checkpoint = function(){
		if(document.forms["PEPCForm"]["honeypot"]) return jQuery.trim(document.forms["PEPCForm"]["honeypot"].value);
		if(document.forms["PEPCForm"]["pepcCheckpoint"]) return jQuery.trim(document.forms["PEPCForm"]["pepcCheckpoint"].value);
	}

	if("" != checkpoint()){
		//spam bot filled in hidden field, bypass form submission
		jQuery.magnificPopup.close();
		return false;

	}else if(fName != "" && lName != "" && email != ""){
		if(!isEmail(email)){
			alert("Please enter a valid email address");
			return false;
		}else{
			jQuery.magnificPopup.close();
			return true;
		}
	} else {
		alert("Please fill your first name, last name and email address");
		return false;
	}
}

function validateDcgaForm() {
	var fName = jQuery.trim(document.forms["DCGAbrochureform"]["first"].value);
	var lName = jQuery.trim(document.forms["DCGAbrochureform"]["last"].value);
	var email = jQuery.trim(document.forms["DCGAbrochureform"]["email"].value);
	var checkpoint = function(){
		if(document.forms["DCGAbrochureform"]["honeypot"]) return jQuery.trim(document.forms["DCGAbrochureform"]["honeypot"].value);
		if(document.forms["DCGAbrochureform"]["dcgaCheckpoint"]) return jQuery.trim(document.forms["DCGAbrochureform"]["dcgaCheckpoint"].value);
	}

	if("" != checkpoint()){
		//spam bot filled in hidden field, bypass form submission
		jQuery.magnificPopup.close();
		return false;
	}else if(fName != "" && lName != "" && email != ""){
		if(!isEmail(email)){
			alert("Please enter a valid email address");
			return false;
		}else{
			jQuery.magnificPopup.close();
			return true;
		}
	} else {
		alert("Please fill your first name, last name and email address");
		return false;
	}
}

var deviceAgent = navigator.userAgent.toLowerCase();
//this variable is set to null if the device is not iphone, ipod or ipad
var isiOS = deviceAgent.match(/(iphone|ipod|ipad)/);

jQuery(document).ready(function () {

	//set the orgId to GI URLs without orgId
	var giDomain = "web.giftillustrator.com";
	jQuery.each(jQuery(".lightbox, .home-lightbox, .secondary-lightbox"), function(){
		var isGI = jQuery(this).attr("href").search(giDomain) > -1;
		var calcUrl = jQuery(this).attr("href");
		if(isGI && jQuery(this).attr("href").search("orgId") == -1){
			calcUrl += "?orgId=" + orgId;
			jQuery(this).attr("href",calcUrl);
		}
		//remove :8080 from all GI urls
		if(isGI){
			calcUrl = calcUrl.replace(':8080','');
			jQuery(this).attr("href",calcUrl);
		}
	});
	//set the getting started page body background none
	jQuery('.not-sure-where-to-being-questionnaire').parent().css("background-image","none");
	jQuery('.fancybox-form').magnificPopup({
		type: 'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

	jQuery(".stl-journey-paths a.stl-popup").attr("oncontextmenu", "return false;");

	var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");
	jQuery(".not-sure-where-to-being-questionnaire input").on("click", function () {
		var parent = jQuery(this).parents("li");
		var choice = parent.attr("id") + alphabet[jQuery(this).val()];
		var nextQ = parent.next().attr("class");
		var nextChoice = choice + nextQ;
		jQuery(".getting-started-suggestion").hide();
		parent.nextAll("li").find("input").removeAttr("checked");
		parent.nextAll("li").hide();
		if (jQuery("#" + nextChoice).length > 0) {
			jQuery("#" + nextChoice).show();
			jQuery('html, body').animate({
				scrollTop: jQuery("#" + nextChoice).offset().top
			}, 500);
		} else {
			jQuery("." + choice).show();
			jQuery('html, body').animate({
				scrollTop: jQuery("." + choice).offset().top
			}, 500);
		}
	});
	if(!isTouchDevice()){
		jQuery("a.fancybox-getting-started").fancybox({
			'margin': 0,
			'padding': 0,
			'speedIn': 500,
			'speedOut': 500,
			'titlePosition': 'over',
			'transitionIn': 'fade',
			'transitionOut': 'fade',
			'type': 'iframe',
			'scrolling': 'auto',
			'height': 400,
			'width': 700,
			'centerOnScroll': true,
			'onStart': function () {
				jQuery(document).scrollTop('0');
				jQuery("body").css({ 'overflow': 'hidden' });
			},
			'onClosed': function () {
				jQuery("body").css({ 'overflow': 'visible' });
			}
		});
	}

var flyoverSetup = function() {

	var topDiff = 13;
	if(!isTouchDevice()){
		jQuery(".flyover-link").each(function () {
			if(jQuery(this).attr("rel"))
			{
				var flyover = jQuery(this).attr("rel").toLowerCase();
				if (!jQuery(this).next().is(flyover)) {
					// Wrap the flyover link in a span tag so that we can
					// position the pop-up relative to it on our desktop version
					jQuery(this).wrap("<span class='flyover-link-wrap not-touch-device'></span>");
					jQuery(this).parent().append(jQuery(flyover));
					//jQuery(flyover).css("top", jQuery(this).position().top + topDiff);
				}
			}
		});
		jQuery(".flyover-link").click(function (event) {
			event.preventDefault();
		});
	} else {
		// Reposition the popup top placement when a device's
		// orientation changes
		jQuery( window ).on( "orientationchange", function() {
			jQuery(".flyover-link").each(
				function () {
					var flyover = jQuery(this).attr("rel").toLowerCase();
					jQuery(flyover).css("top", jQuery(this).position().top + topDiff);
				}
			);
		});
		jQuery(".flyover-link").click(
			function () {
			var iteration=jQuery(this).data('iteration')||1
			switch ( iteration) {
				case 1:
					var flyover = jQuery(this).attr("rel").toLowerCase();
					if (!jQuery(this).next().is(flyover)) {
						// Wrap the flyover link in a span tag so that we can
						// position the pop-up relative to it on our desktop version
						jQuery(this).wrap("<span class='flyover-link-wrap'></span>");
						jQuery(this).parent().append(jQuery(flyover));
						jQuery(flyover).css("top", jQuery(this).position().top + topDiff);
					}
					jQuery(flyover).show();
					break;

				case 2:
					var flyover = jQuery(this).attr("rel").toLowerCase();
				jQuery(flyover).hide();
					break;
			}
			iteration++;
			if (iteration>2) iteration=1
			jQuery(this).data('iteration',iteration)
		});

		// When the screen is touched let's check to see if we've clicked on
		// a flyover link and open it. If not, then we'll cycle through all
		// flyovers and close them. - JK
		// -----------------------------------------------------------------------------
		var dragging = false;
		jQuery(document).on("touchmove", function()
		{
			// If we're dragging then set the variable to true so that
			// when we lift our finger the page knows that we don't
			// want to clear the flyovers, but move the page.
			dragging = true;
		});

		jQuery(document).on('touchend', function(event)
		{
			if(dragging == false)
			{
				// If we're not dragging and have clicked on something other than
				// a flyover link then clear the flyovers
				if (!$(event.target).closest('.flyover-link-wrap').length) {
					jQuery(".flyover-link").each(function()
					{
						var flyover = jQuery(this).attr("rel").toLowerCase();
						var iteration = jQuery(this).data("iteration");
						if(iteration == 2)
						{
							jQuery(flyover).hide();
							jQuery(this).data("iteration", 1);
						}
					});
				}
			}
			else
			{
				// If we're dragging then leave the flyovers open but
				// set the dragging variable to false to set it up for
				// the next check.
				dragging = false;
			}
		});
	}
}

globalFunctions.flyoverSetup = flyoverSetup;

	jQuery(".custom-captcha-form").attr('action', '');
	jQuery(".custom-captcha-form").submit(function (e) {
	    var url = "../../../Action/processFormWithCaptcha.cshtml";
	    jQuery.ajax({
	        type: "POST",
	        url: url,
	        dataType: 'json',
	        async: false,
	        data: jQuery(".custom-captcha-form").serialize(),
	        success: function (resp) {
	            if (resp.result === "failed") {
	                alert(resp.content);
	                e.preventDefault();
	                return false;
	            } else {
	                e.preventDefault();
	                var sendURL = resp.content;
	                window.open(sendURL, '_self');
	            }
	        }
	    });
	})

	// Add text to empty anchor tags to fix 508 compliance errors
	setTimeout(function()
	{
		jQuery("#fancybox-close").html("<span class='offscreen'>Close</span>");
		jQuery("#fancybox-left-ico").html("<span class='offscreen'>Left</span>");
		jQuery("#fancybox-right-ico").html("<span class='offscreen'>Right</span>");
	}, 100);

	// Fix IGX glitch. IGX for some reason places "</textarea>" insed of
	// your textarea field whenever you check in the page. We can remove
	// this line of code once IGX comes up with a fix.
	jQuery("textarea").val("");
	//converts all static email addresses into hyperlinked email addresses
	//emailize();
	jQuery("body").linkify();
});


jQuery(document).ready(function(){
  var getting_started = "";
  jQuery(".q1 input[type='radio']").click(function(){
    getting_started = '1)' + jQuery(this).data('title');
  });
  jQuery(".q2 input[type='radio']").click(function(){
    getting_started = getting_started + ' 2)' + jQuery(this).data('title');
  });
  jQuery(".getting-started-suggestion a").click(function(){
    s.eVar42 = getting_started + ' 3)' + jQuery(this).attr('title');
    s.linkTrackVars='events,eVar42';
    s.linkTrackEvents='event11';
    s.events='event11';
    s.tl(true,'o','Site Tool');
  });
});



/* querystring functions for PEPC */
function paramExists(parameter){
	//Get Query String from url
	fullQString = window.location.search.substring(1);

	paramCount = 0;
	queryStringComplete = "?";

	if(fullQString.length > 0){
		//Split Query String into separate parameters
		paramArray = fullQString.split("&");

		//Loop through params, check if parameter exists.
		for (i=0;i<paramArray.length;i++){
			currentParameter = paramArray[i].split("=");
			if(currentParameter[0] == parameter) { //Parameter already exists in current url
				return true;
			}
		}
	}
	return false;
}

function gup(param){
  param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + param + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// A jQuery based placeholder polyfill http://www.jacklmoore.com/notes/form-placeholder-text/
jQuery(document).ready(function(){
  function add() {
    if(jQuery(this).val() === ''){
      jQuery(this).val(jQuery(this).attr('placeholder')).addClass('placeholder');
    }
  }

  function remove() {
    if(jQuery(this).val() === jQuery(this).attr('placeholder')){
      jQuery(this).val('').removeClass('placeholder');
    }
  }

  // Create a dummy element for feature detection
  if (!('placeholder' in jQuery('<input>')[0])) {

    // Select the elements that have a placeholder attribute
    jQuery('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

    // Remove the placeholder text before the form is submitted
    jQuery('form').submit(function(){
      jQuery(this).find('input[placeholder], textarea[placeholder]').each(remove);
    });
  }

	// Unwrap script tags from IGX generated <p> tags
	jQuery("script").each(function()
	{
		if(jQuery(this).parent().is("p") && jQuery(this).parent().children().size() == 1)
		{
			jQuery(this).unwrap();
		}
	});

	// Toggle Plus/Minus for collapsable elements
	jQuery("a[data-toggle='collapse']").each(function()
	{
			jQuery(this).on("click", function()
			{
					var icon = jQuery(this).children("span.glyphicon");
					var plusIcon = jQuery(this).children("span.glyphicon-plus-sign");
					var minusIcon = jQuery(this).children("span.glyphicon-minus-sign");

					if(plusIcon.length)
					{
						 icon.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
					}
					else if(minusIcon.length)
					{
						 icon.addClass("glyphicon-plus-sign").removeClass("glyphicon-minus-sign");
					}
			});
	});

	jQuery(".navbar-brand").click(function() {
		jQuery(this).parent().find("button").click();
		return false;
	});

	// Give each journey section a unique class based on the visible button text. For example, the section giving amount would
	// have the class .giving-amount-wrap applied to it.
	jQuery(".journey-main .stl-col.stl-w-04 .stl-button").each(function() {
	        jQuery(this).parents("div.stl-col.stl-w-04").addClass(jQuery(this).text().toLowerCase().replace(/\s+/, "-") + "-wrap");
	});

	// Capitalize the letters IRA in the Journey 70+ popup box
	var $iraLink = jQuery('#136 a[onClick*="IRA"], #142 a[onClick*="IRA"]');
	if($iraLink.length) {
		$iraLink.html($iraLink.html().replace(/ira/i, '<span class="force-upper">IRA</span>'));
	}



});
jQuery(window).load(function() {



    // Fix an HTML issue found on the retirement-plan-check-up-tips syndicated article
    if (jQuery('body.retirement-plan-check-up-tips .syndicated ol li:last-child').length || jQuery('body#retirement-plan-check-up-tips-page .syndicated ol li:last-child').length) {
        var $lastTip = jQuery('.syndicated ol li:last-child');
        $lastTip.html($lastTip.html().replace('A<strong>ssess Your Debt', '<strong>Assess Your Debt'));
    }
    // Fix an HTML issue found on the include-in-your-emergency-plan syndicated article
    if (jQuery('body.include-in-your-emergency-plan').length || jQuery('body#include-in-your-emergency-plan-page').length) {
        var $includedText = jQuery('.syndicated');
        $includedText.html($includedText.html().replace('by included a gift', 'by including a gift'));
    }
    // Fix an HTML issue found on the make-sure-your-will-keeps-pace-with-your-life syndicated article
    if (jQuery('body.make-sure-your-will-keeps-pace-with-your-life').length || jQuery('body#make-sure-your-will-keeps-pace-with-your-life-page').length) {
        var $includedText = jQuery('.syndicated');
        $includedText.html($includedText.html().replace('please contact an estate planning attorney at', 'please contact us at'));
    }
		// Fix an HTML issue found on the /ensure-you-live-forever
		if (jQuery('body.ensure-you-live-forever').length || jQuery('body#ensure-you-live-forever-page').length) {
				var $includedText = jQuery('.syndicated');
				$includedText.html($includedText.html().replace('Discuss how making gift to a charity', 'Discuss how making a gift to a charity'));
		}
    // Fix an HTML issue found on estate-plan-update article
    if (jQuery('body.estate-plan-update').length || jQuery('body#estate-plan-update-page').length) {
        if (jQuery('div.main-copy ul:nth-of-type(2) li:nth-child(5)').html() == 'Can provide for a backup trustee if you’re filling that role and you become incapacitated. Is an affordable way to support the people and causes you love most.') {
            jQuery('div.main-copy ul:nth-of-type(2) li:nth-child(5)').replaceWith(
                '<li>Can provide for a backup trustee if you&#39;re filling that role and you become incapacitated.</li><li>Is an affordable way to support the people and causes you love most.</li>');
        }
    }
    // Change an href on social-security-rules article
    if (jQuery('body.social-security-rules').length || jQuery('body#social-security-rules-page').length) {
        jQuery('a:contains("Social Security website")').attr('href', 'https://www.ssa.gov/planners/retire/claiming.html');
    }

    // Change the title of Summer Emergency Planning article
    if (jQuery('body.summer-emergency-planning').length || jQuery('body#summer-emergency-planning-page').length) {
        jQuery('h1:contains("Summer Emergency Planning")').html('4 Tips for Emergency Planning');
    }

    // Change the title of Summer Emergency Planning article
    if (jQuery('body.summer-emergency-planning').length || jQuery('body#summer-emergency-planning-page').length) {
        jQuery('h1:contains("Summer Emergency Planning")').html('4 Tips for Emergency Planning');
    }

    // Replacing text overcome-winter-page
    if(document.body.id === "overcome-winter-page" || jQuery('body').hasClass('overcome-winter')){
        var documentTitle = {
            articleName: document.title.split('|')[0].trim(),
            organizationName: document.title.split('|')[1].trim()
        }
        var pageTitle = 'Change Your Outlook as You Extend Hope';
        jQuery('.stl-page-title').html(pageTitle);
        jQuery('.stl-page-subtitle').remove();

        documentTitle.articleName = pageTitle;
        document.title = documentTitle.articleName + ' | ' + documentTitle.organizationName;

        var winter = jQuery('.syndicated')[0];
        jQuery(winter).find('p')[0].innerText = "Heading into springtime always holds great promise. It's the perfect time to renew your commitment to being—and doing—better every day.";
        jQuery(winter).find('p')[1].innerText = "To get started, here are three helpful tips:";
    }

    // Replacing text broccoli-philanthropy-page
     if(document.body.id === "broccoli-philanthropy-page" || jQuery('body').hasClass('broccoli-philanthropy')){
        var documentTitle = {
            articleName: document.title.split('|')[0].trim(),
            organizationName: document.title.split('|')[1].trim()
        }
        var pageTitle = 'Discover How You Can Achieve Your Philanthropic Goals';
        var subPageTitle = '3 Steps to Help You Get Started';
        jQuery('.stl-page-title').html(pageTitle);
        jQuery('.stl-page-subtitle').html(subPageTitle);

        documentTitle.articleName = pageTitle;
        document.title = documentTitle.articleName + ' | ' + documentTitle.organizationName;

        var broccoli = jQuery('.syndicated')[0];
        jQuery(jQuery(broccoli).find('p')[0]).remove();
        jQuery(broccoli).find('p')[0].innerText = "The early months of a new year are a time when many of us focus on what’s important in our lives and set goals for what we want to achieve in the coming broccoli.";
        jQuery(broccoli).find('p')[1].innerText = "If increasing your family’s charitableness or getting involved with " + documentTitle.organizationName + " is a goal you’ve set this year, but you’re not sure how to get the ball rolling, here are three ways you can get started.";
    }

    // Replacing text peanut-butter-and-jelly-page
     if(document.body.id === "peanut-butter-and-jelly-page" || jQuery('body').hasClass('peanut-butter-and-jelly')){
        var documentTitle = {
            articleName: document.title.split('|')[0].trim(),
            organizationName: document.title.split('|')[1].trim()
        }

        var PBJ = jQuery('.syndicated')[0];
        jQuery(jQuery(PBJ).find('p')[0]).remove();
        jQuery(PBJ).find('p')[0].innerText = "Life is too short. We recommend focusing on what's important in your life and setting goals for the coming months. To get started, use these four ways to be more charitable at " + documentTitle.organizationName + ".";
    }

    // Remove Orphan from Q4 Whats New article
    if (jQuery('body.easy-ways-to-help-before-dec-31').length || jQuery('body#easy-ways-to-help-before-dec-31-page').length) {
        jQuery('h1').each(function() {
            var string = jQuery(this).html();
            string = string.replace(/ ([^ ]*)$/, '&nbsp;$1');
            jQuery(this).html(string);
        });
    }

    // Remove Orphan from Whats New
    if (jQuery('#stl-whats-new').length) {
        jQuery('a:contains("Dec. 31")').each(function() {
            var string = jQuery(this).html();
            string = string.replace(/ ([^ ]*)$/, '&nbsp;$1');
            jQuery(this).html(string);
        });
    }

    // Correction on Syndicated article /your-financial-future
    var duplicate = {};
    jQuery('body.your-financial-future .syndicated, body#your-financial-future-page .syndicated').parent().find('p').each(function() {  
        var txt = jQuery(this).html();  
        if (duplicate[txt])     jQuery(this).remove();  
        else     duplicate[txt] = true;
    });

    // Correction on Syndicated article /worry-out-of-retirement
    if (jQuery('body.worry-out-of-retirement').length || jQuery('body#worry-out-of-retirement-page').length) {
        var $includedText = jQuery('.syndicated');
        $includedText.html($includedText.html().replace('Worrying about having enough money to meet your needs and do the things you want to shouldn’t be a part of retirement planning.', 'Ensuring you have enough money to meet your needs and do the things you want to is all part of retirement planning.'));
    }

		// Correction on Syndicated article /life-after-40
		if (jQuery('body.life-after-40').length || jQuery('body#life-after-40-page').length) {
				var $includedText = jQuery('.syndicated');
				$includedText.html($includedText.html().replace('Retirement plan assets are exposed to federal income taxes that could be as much as 39.6 percent after your lifetime.', 'If you leave these assets to your loved ones, the distributions are subject to income taxes based on your heirs&rsquo; ordinary income tax rate.'));
		}

		// Correction on Syndicated article /moves-to-make-after-50
		if (jQuery('body.moves-to-make-after-50').length || jQuery('body#moves-to-make-after-50-page').length) {
				var $includedText = jQuery('.syndicated');
				$includedText.html($includedText.html().replace('These amounts are current as of 2016.', 'These amounts are current for the 2017 tax year.'));
		}

            //Order of values in each 'local' section is hugely important. Changing the order will
    // change the context of the case study text. You have been warned. :)

    var caseStudyComponent = {
        global: {
            '2.4 percent': '1.6 percent',
        },
        charitableLeadTrusts: {
            selector: function () {
                return jQuery('body.charitable-lead-trusts').length || jQuery('body#charitable-lead-trusts-page').length ? true : false;
            },
            local: {
                '$56,000': '$175,000',
                '$840,000': '$2,625,000',
                '$698,488': '$2,317,400',
                '$2,182,775': '$2,317,400',
                '$101,512': '$182,600',
                '$317,225': '$182,600',
            },
            matchMultiple: {
                '$800,000': '$2,500,000'
            }
        },
        charitableGiftAnnuities: {
            selector: function () {
                return jQuery('body.charitable-gift-annuities').length || jQuery('body#charitable-gift-annuities-page').length ? true : false;
            },
            local: {
                '$5,544': '$4,166'
            }
        },
        trusts: {
            selector: function () {
                return jQuery('body.trusts').length || jQuery('body#trusts-page').length ? true : false;
            },
            local: {
                '$56,000': '$175,000',
                '$840,000': '$2,625,000',
                '$698,488': '$2,317,400',
                '$2,182,775': '$2,317,400',
                '$101,512': '$182,600',
                '$317,225': '$182,600',
            },
            matchMultiple: {
                '$800,000': '$2,500,000'
            }
        },
        charitableRemainderTrusts: {
            selector: function () {
                return jQuery('body.charitable-remainder-trusts').length || jQuery('body#charitable-remainder-trusts-page').length || jQuery('body.remainder-trusts').length || jQuery('body#remainder-trusts-page').length ? true : false;
            },
            local: {
                '$81,305': '$97,613',
                '$22,765': '$27,332',
                '75' : '60',
                '$500,000' : '$250,000',
                '$30,000' : '$15,000',
                '$275,725' : '$81,305',
                '$90,989' : '$22,765',
                '33' : '28'
            }
        }

    }

    var _getCaseStudyText = jQuery('#stl_case-study').html();

    var _setCaseStudyText = function (value) {
        jQuery('#stl_case-study').html(value);
    };

    var caseStudyText = _getCaseStudyText;

    var executeGlobal = function () {

        for (var key in caseStudyComponent.global) {
            caseStudyText = caseStudyText.replace(key, caseStudyComponent.global[key]);
        }

    };

    var executeFlippedGlobal = function () {

        for (var key in caseStudyComponent.global) {
            caseStudyText = caseStudyText.replace(caseStudyComponent.global[key], key);
        }

    };

    var filtered = Object.keys(caseStudyComponent).filter(function (key) {
        return key != 'global';
    });

    var executeSectionSpecific = function () {
        filtered.forEach(function (property, index) {

            if (caseStudyComponent[property].selector()) {
                var outerLoopLocal = caseStudyComponent[property].local;

                for (var key in caseStudyComponent[property].local) {
                    caseStudyText = caseStudyText.replace(key, outerLoopLocal[key]);
                }

                if (caseStudyComponent[property].matchMultiple) {
                    var outerLoopMultiple = caseStudyComponent[property].matchMultiple;
                    for (var key in caseStudyComponent[property].matchMultiple) {
                        caseStudyText = caseStudyText.replace(new RegExp('\\' + key, 'g'), outerLoopMultiple[key]);
                    }
                }

            }

        });
    };

    //Reverse the arguments so that the value that the key references is what were searching for in //the text and the key's literal string value is what were replacing the match with
    var executeFlippedSectionSpecific = function () {
        filtered.forEach(function (property, index) {

            if (caseStudyComponent[property].selector()) {
                var outerLoopLocal = caseStudyComponent[property].local;

                for (var key in caseStudyComponent[property].local) {
                    caseStudyText = caseStudyText.replace(outerLoopLocal[key], key);
                }

                if (caseStudyComponent[property].matchMultiple) {
                    var outerLoopMultiple = caseStudyComponent[property].matchMultiple;
                    for (var key in caseStudyComponent[property].matchMultiple) {
                        caseStudyText = caseStudyText.replace(new RegExp('\\' + outerLoopMultiple[key], 'g'), key);
                    }
                }

            }

        });
    };

    //Currently using flipped due to values being reverted back to their original value before 08/2016 change
    //See aroulnd line 324
    if (jQuery('#stl_case-study').length > 0) {
        executeFlippedGlobal();
        executeFlippedSectionSpecific();
        _setCaseStudyText(caseStudyText);
    }


    jQuery(".contactEMAddr").on("click",function (e) {
	    e.preventDefault();
	    var uname = $(this).data('uname').trim();
        var domain = $(this).data('domain').trim();
        var email = "mailto:" + uname + "@" + domain;
		window.location.href = email;
	});

    globalFunctions.flyoverSetup();

});
