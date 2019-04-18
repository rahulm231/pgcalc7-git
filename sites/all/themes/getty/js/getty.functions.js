// Fix issues when logs are running but console isn't open.
// Primarily with IE8 and IE9
if (typeof console === "undefined") {
    window.console = {
        log: function() {}
    };
}

// function to return which type of device from User Agent.
function getUA() {
	var ua = navigator.userAgent;
	return ua;
}

// add the if ie stuff early for 10 and 11, as we need to check to avoid a couple functions
// Detect IE and append class to <html> element
// http://marxo.me/target-ie-in-css/
function setIE1011() {
	var UA = getUA();
	var html = document.documentElement;
	if (UA.indexOf("IEMobile") === -1) {
	    if ((UA.indexOf("rv:11.") !== -1) && (!html.classList.contains('ie11')) && window.navigator.msPointerEnabled) {
	        html.classList.add("ie11");
	    } else if ((UA.indexOf("MSIE 10.") !== -1) && (!html.classList.contains('ie10')) && window.navigator.msPointerEnabled) {
	        html.classList.add("ie10");
	    }
	}
}

// now run the above function immediately
// Maybe this should have gone in the Getty Get functions instead?
setIE1011();
// Now that we have set the class ie10 or ie11 in the html element, we can always check for it.
// detect if ie10
function ie10() {
	if ( jQuery('html').hasClass('ie10') === true ) {
        return true;
    } else {
        return false;
    }
}

// detect if ie11
function ie11() {
	if ( jQuery('html').hasClass('ie11') === true ) {
        return true;
    } else {
        return false;
    }
}

// detect if ie9 or not
function ie9() {
    if ( jQuery('html').hasClass('ie9') === true ) {
        return true;
    } else {
        return false;
    }
}

// detect if ie8
function ie8() {
    if ( jQuery('html').hasClass('lt-ie9') === true ) {
        return true;
    } else {
        return false;
    }
}

// Create startsWith function for strings. 
// Useful for finding out if a string starts with something specific.
// Note there's a get_subdomain() function below.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) === 0;
	};
}

// create endsWith function for strings. Useful for finding out if a string ends with something,
// like a specific .tld: .edu, .org, etc.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

//set up the document domain to get around security issues
// Maybe this should go into our set functions instead?
if ( window.location.hostname.endsWith('getty.edu') === true ) {
	//console.log("domain is getty, set up document.domain");
	document.domain="getty.edu";
}

// Check orientation, and reserve an event to run stuff. This isn't used for anything yet that I know of.
// have to split it out for ie8, as it doesn't support addEventListener
if(!ie8()) {
	window.addEventListener('orientationchange', function(evt) {
		switch(window.orientation) {
			case 0: // portrait
				//alert("portrait");
				break;
			
			case 180: // portrait
				//alert("portrait");
				break;
				
			case 90: // landscape
				//alert("landscape");
				break;
			case -90: // landscape
				//alert("landscape");
				break;
		}
	}, false);
}

// Format money function in javascript
// Note that this does not add a dollar sign (or pound sign, etc), you're responsible for that.
// Basically an example of "Prototypal Inheritance".
// Take the Number object and extend it with a formatMoney function
// c = the amount of places in the decimals to round to
// d = decimal. Period by default, otherwise... whatever you want
// t = place separator, like the comma in 1,000. comma by default
// Usage: if you want to convert the following to a money format
// 123456789.12345 to 123,456,789.12
// (123456789.12345).formatMoney(2);
// And add a dollar sign? "jQuery" + (123456789.12345).formatMoney(2);
// will display: jQuery123,456,789.12
// http://stackoverflow.com/a/149099/1078904
Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "jQuery1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

// get the subdomain in the url
function get_subdomain() {
	var sd = window.location.hostname.split('.');
	if (sd.length < 2) {
		return false;
	} else if (sd.length === 3) {
		return sd[0];
	} else if (sd.length > 3) {
		return sd.slice(-2).join('.');
	}
}

// Hex to RGB function.
// Useful for returning something like #ffffff to (255,255,255)
// This is primarily to create javascript styles with alpha channels, see next function.
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])jQuery/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})jQuery/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert hex code to RGBA.
// Similar to above, except adds alpha.
// Useful for converting #ffffff at 50% alpha to (255,255,255,.5)
function hexToRgba(hex,a) {
	var rgb = hexToRgb(hex);
	var rgba = "rgba("+rgb.r+","+rgb.g+","+rgb.b+","+a+")";
	return rgba;
}

// function to decode html entities, since javascript can't.
// This is similar to PHP's htmlentities(). 
// Basically creates a Text area element, then returns the text.value, which autoconverts entities.
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Calculate whether a number is a float or not
// "wtf is a float?" A number that isn't an integer:
// 1.23 = float
// 123 = integer
// 0 = integer
// 0.12 = float
// http://stackoverflow.com/a/3886106/1078904
// Returns true/false
function isFloat(n) {
    return n === +n && n !== (n|0);
}

// calculate whether a number is an integer
// Returns true/false
function isInteger(n) {
    return n === +n && n === (n|0);
}

// check if a character on the keyboard pressed is a number. 
// This is applied universally in the doc load on keypress for input[type="number"]
// I had to use this in Foundation Grant for the number slider, 
// and will be useful any time an HTML5 number element is used.
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ( charCode != 46 && charCode > 31
    && ( charCode < 48 || charCode > 57 ) )
        return false;

    return true;
}

// generate a unique ID in the form of a number
// Returns a 16 digit number based on the date and time down to milliseconds.
function getUniqueID() {
	var c = 1;
    var d = new Date(),
        m = d.getMilliseconds() + "",
        u = ++d + m + (++c === 10000 ? (c = 1) : c);
    return u;
}

// detect if in small interface "mobile" mode, using class on html element
function isSmall() {
	if ( jQuery('html').hasClass('small') === true ) {
		return true;
	} else {
		return false;
	}
}

// detect if in medium interface "tablet" mode
function isMedium() {
	if ( jQuery('html').hasClass('medium') === true ) {
		return true;
	} else {
		return false;
	}
}

// detect if in large interface "large" mode
function isLarge() {
	if ( jQuery('html').hasClass('large') === true ) {
		return true;
	} else {
		return false;
	}
}

// detect if in x-large interface or fully widened browser mode
function isXlarge() {
	if ( jQuery('html').hasClass('xlarge') === true ) {
		return true;
	} else {
		return false;
	}
}

// NOTE MAY NOT BE RELIABLE!!! THIS STRING IS RETURNING UA OF KNOWN MOBILE FROM DETECTMOBILEBROWSERS.COM
// THIS IS BECAUSE NONE OF THE MODERNIZR TOUCH TESTS WORK RELIABLY ANYMORE!!!
// This will need to be updated periodically and... ARGH. Good luck.
function isTouch() {
	if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)||navigator.vendor.substr(0,4)||window.opera.substr(0,4))) {
		if ( jQuery('html').hasClass('touch') === false) jQuery('html').addClass('touch');
		if ( jQuery('html').hasClass('no-touch') === true) jQuery('html').removeClass('no-touch');
		return true; 
	} else { 
		if ( jQuery('html').hasClass('touch') === true) jQuery('html').removeClass('touch');
		if ( jQuery('html').hasClass('no-touch') === false) jQuery('html').addClass('no-touch');
		return false; 
	}
}

// Useful way to detect whether your page is inside an iframe or not.
// This is particularly useful for Fancybox. If you have a page that needs to hide some elements if they're in a fancybox,
// but then show them when they're not--like the Connect with Us page--use this.
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Sneaky way of doing iPHone specific stuff
function isIphone() {
	var ua = getUA();
	var iphone = !!~ua.indexOf('iPhone') || !!~ua.indexOf('iPod');
	return iphone;
}
// self explanatory, no?
function isIpad() {
	var ua = getUA();
	var ipad = !!~ua.indexOf('iPad');
	return ipad;
}
function isIos() {
	var ios = isIphone() || isIpad();
	return ios;
}
function isAndroid() {
	var ua = getUA();
	var android = !!~ua.indexOf('Android');
	return android;
}

// fixes a chrome issue with printing
// http://stackoverflow.com/questions/23071291/javascript-window-print-in-chrome-closing-new-window-or-tab-instead-of-cancel
function xbrowse_print() {
	window.print();
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
	  window.location.reload();
	}
}

// This is a function used with Foundation's Abide to force matching on selects in custom forms.
// Great example of this is in the Collection Image Request forms, where there are "other" type values.
// inp = the select that is toggling
// optval is the value you're looking to match to, usually an "other" type value
// targ is the #id name. Needs hash.
// focus is the #id of the input you want to force focus on. requires hash tag.
function option_field_toggle( inp, optval, targ, focus ) {
	var type,
		val,
		custom = inp.next().hasClass('custom'),
		focus = jQuery(focus);
	if(inp.prop('tagName') === "SELECT") {
		type = "SELECT";
		val = inp.find(":selected").val();
	} else if(inp.prop('tagName') === "INPUT") {
		type = inp.attr("type");
		val = inp.val();
	}
	
	if ( val === optval) {
		jQuery(targ).slideToggle();
		if(ie9() !== true) {
			focus.focus();
		}
	} else if ( val !== optval && jQuery(targ).is(":visible") ) {
		jQuery(targ).slideToggle();
	}
}

// function to wait for the screen to stop moving before making adjustments to stuff.
var waitForFinalEvent = (function() {
	var timers = {};
	return function(callback, ms, uniqueId) {
		//console.log("timer: " + uniqueId);
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// Convert the query string to an associative array, including keys of the same name
function queryStringToJSON(str) {            
    var pairs = str.split('&');
    var result = {};
    pairs.forEach(function(pair) {
		pair = pair.split('=');
		var name = pair[0];
		var value = pair[1];
		if( name.length ) {
			if (result[name] !== undefined) {
				if (!result[name].push) {
					result[name] = [result[name]];
				}
				result[name].push(value || '');
			} else {
				result[name] = value || '';
			}
		}
    });
    return( result );
}

// decode a url string, including replacing + with ' '
function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

// remove the hash including the '#' from the url without updating page. 
// Used in Collection I think. Might not be used at all anywhere, I'm not sure this totally worked.
function removeHash() { 
	var scrollV, scrollH, loc = window.location;
	if ("pushState" in history)
		history.pushState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		scrollV = document.body.scrollTop;
		scrollH = document.body.scrollLeft;
		
		loc.hash = "";
		
		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scrollV;
		document.body.scrollLeft = scrollH;
	}
}

// update a variable containing the URL with new parameters or hashes
// OR add/remove a parameter, if there are multiple with the same key
// var newURL = updateURLParameter(window.location.href, 'locId', 'newLoc');
//    newURL = updateURLParameter(newURL, 'resId', 'newResId');
function updateURLParameter(url, param, paramVal, replace_action) {
	// if no replace_action is defined, then assume we're replacing/updating
	// possible combinations should be true, false
	replace_action = (typeof replace_action === "undefined") ? true : replace_action;
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    var rows_txt = '';
    var param_match = false;
	
	// if there's already ?parameters, check to see which
    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;
		
		// create an array of the existing params
        tempArray = additionalURL.split("&");
		
		// loop through the existing params to find out if ours exists, and take action
        for (i=0; i<tempArray.length; i++) {
        	// if this element of the array isn't our param, add it back. Basically reconstructing the query string.
        	// note that array params get converted to html entities in firefox. Need to convert them back.
        	var qn = decodeURIComponent(tempArray[i].split('=')[0]);
            if( (qn != param) || (replace_action==false && qn == param && tempArray[i].split('=')[1] != paramVal) ) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
            
            // if paramVal was blank, that meant to just blank out that parameter's value.
            // OR remove the param if replace_action is false, by returning a blank.
            // note that youll need to mess with rows_txt below as well
            if( (qn == param && paramVal == '' && replace_action == true) || 
            	(qn == param && tempArray[i].split('=')[1] == paramVal && replace_action == false ) ) {
	            //console.log("found param, value should be blanked");
	            newAdditionalURL += '';
            }
			
			// if we find a matching parameter, we need to signal we did so we know to not add.
			// otherwise we'll add this parameter in rows_txt below.
			if( (qn == param && tempArray[i].split('=')[1] == paramVal) ) {
				param_match = true;
			}
        }        
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }
    if(TheAnchor)
        paramVal += "#" + TheAnchor;
	
	// rows_txt is now going to be where we add the param if it didn't exist,
	// or a duplicate param with new value if replace_action is false,
	// or return nothing if replace_action is true and paramVal is blank or replace_action is false, and param and paramVal match
	//console.log("replace_action",replace_action);
	//console.log("paramVal", paramVal);
	if( (replace_action === true && paramVal != '') || (replace_action === false && param_match == false) ) {
		//console.log("replace action is true, and paramVal is defined. add it in");
    	rows_txt = temp + "" + param + "=" + paramVal;
    } else if ((replace_action === true && paramVal == '') || (replace_action === false && param_match == true)) {
	    //console.log("replace action is true, but paramVal is blank, OR replace action is false, and param is matched. remove");
	    rows_txt = '';
	}
	
    if (newAdditionalURL === "" && rows_txt === "") {
	    return baseURL;
    } else {
    	if (baseURL.endsWith('/') !== true) {
	    	if(baseURL.endsWith('.php') === true || baseURL.endsWith('.jsp') === true || baseURL.endsWith('.html') === true || baseURL.endsWith('.htm') === true) {
		    	// do nothing
	    	} else {
		    	baseURL += "/";
	    	}
    	}
    	
		return baseURL + "?" + newAdditionalURL + rows_txt;
	}
}

// update page location with new url
function updateURL(winTitle, newURL) {
	//console.log("updateURL: "+ winTitle + newURL);
	window.history.replaceState(null, winTitle, newURL);
}

// function to select text.
// This is useful if you want to have text automatically selected, like to ease copy/paste.
// Used in Collection image request stuff.
function selectText(element) {
    var doc = document,
        text = doc.getElementById(element),
        range, 
        selection
    ;    
    if (doc.body.createTextRange) { //IE
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

// set up a check carousel variable set
// these get updated if a carousel is on the page, and checkCarousel is run
// checkCarousel is only run if the &artview parameter is in the url.
// This should probably get moved to Collection, and it's totally possible that this is purely for Cycle2
// Which... one day should probably get pulled and replaced with CarouFredSel as it's not supported anymore.
var cready = false;
var ccheck;
function checkCarousel() {
	//console.log("check carousel, cready: " + cready);
	cready = (typeof cready == 'undefined') ? false : cready;
	if (jQuery('.carousel').find('ul[class*="-block-grid-"]')) {
		if (jQuery('#'+jQuery.getUrlVar('artview')+' img').load(function(){cready=true;}));
	}
	if (cready == true) {
		//console.log("Carousel is ready, hit the click, clear the interval");
		jQuery('#'+jQuery.getUrlVar('artview')).click();
		clearInterval(ccheck);
	} else if (cready == false) {
		//console.log("carousel NOT ready. resetting timeout.");
		ccheck = setTimeout(checkCarousel, 1000);
	}
}

// set up a function to convert an object name into a string for use in things like the timer uniqueID
function get_object_class(obj) {
	obj = (typeof obj != "object" || obj === null) ? false : /(\w+)\(/.exec(obj.constructor.toString())[1];
	return obj;
}

// jQuery Functions
(function(jQuery) {
	// forms functions
	// Serialize the data of a bunch of inputs in a form
	// see open-content-download-form
	jQuery.fn.serializeObject = function() {
	    var o = {};
	    var a = this.serializeArray();
	    jQuery.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	// limit the amount of text in a text input field
	// see open-content-download-form
	jQuery.fn.limit  = function(options) {
		var defaults = {
			limit: 400,
			id_result: false,
			alertClass: "red-text"
		}
		var options = jQuery.extend(defaults, options);
		return this.each(function() {
			var characters = options.limit;
			if(options.id_result != false) {
				jQuery("#"+options.id_result).append("You have <strong>"+characters+"</strong> characters remaining");
			}
			jQuery(this).keyup(function(){
					if(jQuery(this).val().length > characters){
						jQuery(this).val(jQuery(this).val().substr(0, characters));
					}
					if(options.id_result != false) {
						var remaining =  characters - jQuery(this).val().length;
						jQuery("#"+options.id_result).html("You have <strong>"+	 remaining+"</strong> characters remaining");
						if(remaining <= 10) {
							//jQuery("#"+options.id_result).addClass(options.alertClass);
							jQuery("#"+options.id_result).removeClass("hide");
						} else {
							//jQuery("#"+options.id_result).removeClass(options.alertClass);
							jQuery("#"+options.id_result).addClass("hide");
						}
					}
			});
		});
	};
	// removes filter terms from under search boxes
	// used in prep_checkboxes()
	jQuery.fn.termRemover = function(args) {
		args = (typeof args == 'undefined') ? {} : args;
		args.filterList = (typeof args.filterList === 'undefined') ? jQuery('.filter-list') : jQuery(args.filterList);
		jQuery(this).on("click", function() {
			// console.log(jQuery(this));
			var this_check = jQuery(this).attr('id');
			this_check = this_check.substr(5);
			jQuery(this).remove();
			var this_label = args.filterList.find("label[for='" + this_check + "']");
			// do some fancy footwork to prevent the page from jumping to the label.
			this_label.on('click', function(e){
				e.preventDefault();
				var target = window[this_check];
			    target.checked = !target.checked;
			    jQuery(target).trigger('change');
			});
			this_label.trigger('click');
			this_label.off('click');
			if (jQuery("dl#search-terms dd").length == 0) {
				jQuery("dl#search-terms").hide();
			}
		});
	}
	//fix Zurb Foundation's section accordion/tab auto switch, as it doesn't work in their latest release
	jQuery.fn.gettySectionFix = function() {
		var sc = jQuery(this).find('.section-container');
		function switch_sections(section) {
			if (jQuery('html').hasClass('small') === true) {
				section.attr('data-section','accordion');
				section.attr('data-options', 'one_up:false;');
				if (section.hasClass('accordion') !== true) section.toggleClass('accordion');
				if (section.hasClass('tabs') === true) section.toggleClass('tabs');
				section.children('.active').find('span.icon-plus-sign2').toggleClass('icon-plus-sign2 icon-minus-sign-alt');
				section.children(':not(".active")').find('span.icon-minus-sign-alt').toggleClass('icon-plus-sign2 icon-minus-sign-alt');
				
				section.find('.title').map(function(e,i) {
					jQuery(this).on('click').click(function() {
						accordion_click();
						jQuery(this).parent().siblings().find('span.icon-minus-sign-alt').toggleClass('icon-plus-sign2 icon-minus-sign-alt');
					});
				});
			} else if (jQuery('html').hasClass('small') === false) {
				section.attr('data-section','tabs');
				//section.attr('data-options', '');
				if (section.hasClass('tabs') !== true) section.toggleClass('tabs');
				if (section.hasClass('accordion'))  section.toggleClass('accordion');
				if (section.find('.active').length != 1) {
					section.find('section').first().addClass('active');
				}
			}
			section.foundation('section', 'reflow');
		}
		
		switch_sections(sc);
		
		var ww = jQuery(window).width();
        jQuery(window).resize(function() {
        	if (ww != jQuery(window).width()) {
				waitForFinalEvent(function() {
					switch_sections(sc);
					//sc.foundation('section', 'reflow');
					//console.log('openSeaDragon: Wait complete');
				}, 300, "switch_sections_"+jQuery(this).attr('id'));
			}
		});
	};
	// plugin to check if a button is bound to a click event
	jQuery.fn.isBound = function(type, fn) {
		var data = jQuery._data(this[0], 'events')[type];
		
		if (data === undefined || data.length === 0) {
			return false;
		}
		
		return (-1 !== jQuery.inArray(fn, data));
	};
	// function to get variable hash from url
	// useful for open-access download form
	// as well as collections alternate image deeplink
	jQuery.extend({
		getUrlVars: function() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			//console.dir(vars);
			return vars;
		},
		getUrlVar: function(name) {
			return jQuery.getUrlVars()[name];
		}
	});
	jQuery.extend({
		getUrlArrays : function() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				var key = hash[0].split('[]')[0];
				if(!vars[key]) {
					vars.push(key);
					vars[key] = [];
				}
				vars[key].push(hash[1]);
			}
			return vars;
		},
		getUrlArray: function(name) {
			return jQuery.getUrlArrays()[name];
		}
	});
	// Vertically align images. in fixed image area.
	// NOTE: THIS WON'T WORK ON HIDDEN IMAGES, OR IMAGES IN A HIDDEN ELEMENT!!!
	// Instead, run this on the elements after the parent has been revealed.
	// See GRI's Connecting Seas as an example.
	jQuery.fn.gettyVertAlign = function(args) {
		args = (typeof args == 'undefined') ? {} : args;
		args.vAlign = (typeof args.vAlign == 'undefined') ? 'middle' : args.vAlign;
		args.thisObj = jQuery(this);
		args.thisID = Math.floor( Math.random()*99999 );
		//console.log(args.thisID);
		calculateTopPadding(args.thisObj);
			
		
		function calculateTopPadding(obj) {
			var i = obj.children('img');
			//console.log(i);
			//console.dir(i);
			var h = obj.height();
			//console.log('h: '+h);
			//console.log('w: ' + w);
			// get height, including those of hidden divs
			var ih = i.height();
			if (ih === 0) {
				ih = i.height();
			}
			//console.log('ih: ' +ih);
			var pt;
			if (obj.is(':visible')) {
				//console.log("obj is visible");
				if (args.vAlign === 'middle') {
					//console.log("vAlign is middle");
					pt = (h-ih)/2;
				} else if (args.vAlign === 'bottom') {
					pt = (h-ih);
				}
				//console.log('pt: '+pt);
i.css({
					'paddingTop': pt
				});
/*
				i.animate({
					paddingTop:	pt
				}, 200, "swing");
*/
			}
		}
		jQuery(window).resize(function() {
			waitForFinalEvent(function() {
				calculateTopPadding(args.thisObj);
			}, 600, "timer_"+args.thisID);
		});
	};
	
	// Similar to vertical align. 
	// Use on stuff like mixed slideshow, where images are absolutely positioned inside absolute positioned elements.
	jQuery.fn.gettyHorzAlign = function(args) {
		args = (typeof args == 'undefined') ? {} : args;
		args.thisObj = jQuery(this);
		args.thisID = Math.floor( Math.random()*99999 );
		//console.log(args.thisID);
		calculateLeftMargin(args.thisObj);
		
		function calculateLeftMargin(obj) {
			var i = obj.find('img');
			//console.log("----\n"+i.attr('alt'));
			//console.dir(i);
			//console.log(i);
			var w = obj.width();
			//console.log('object w', w);
			
			var iw = i.width();
			//console.log('img w', iw);
			var ml;
			if (obj.is(':visible')) {
				ml = (w-iw)/2;
				//console.log('margin-left: '+ml);
				i.css({
					marginLeft:	ml
				});
			}
		}
		jQuery(window).resize(function() {
			waitForFinalEvent(function() {
				calculateLeftMargin(args.thisObj);
			}, 100, "timer_"+args.thisID);
		});
		
	};
	
    // Carousels will need some sort of click action.
    // On object pages with zoom, first item needs to instantiate the openSeadragon. (also needs to show zoom controls)
    // OpenSeadragon variables should be declared on the page, so need a way to link to that (in case more than one).
    // Otherwise, we need to dictate whether the click is resetting the primary image, (and hide zoom controls if they exist)
    // or whether it's launching a new page.
    // Don't forget the Mobile wrinkle: Zoom doesn't work well on mobile, so first image on mobile should push the enlarge.
    // Clicking the enlarge will push mobile into full screen.
    // Clicking other alt images will need to replace that enlarge, but it needs to be restored instead of zoom.
    jQuery.fn.gettyCarousel = function(args) {
    	thisSlide=1;
        args = (typeof args == 'undefined') ? {} : args;
        args.thisID = jQuery(this).attr('id');
        args.thisCarousel = jQuery(this).find('.carousel');
        var slideIndex = 0;
        args.thisCarousel.on('cycle-after', function( event, opts, API) {   
            slideIndex = opts.slideNum - 1;
        });
        args.zoomDl = (typeof args.zoomDl == 'undefined') ? false : args.zoomDl;
        args.zoomOrderImg = (typeof args.zoomOrderImg == 'undefined') ? false : args.zoomOrderImg;
        args.controls = (typeof args.controls == 'undefined') ? args.thisCarousel.find('.carousel-controls') : jQuery('#'+args.controls);
        args.altImgSources = (typeof args.altImgSources == 'undefined' || get_object_keys(args.altImgSources) == 0) ? false : args.altImgSources;
        args.visibleSlidePerSize = (typeof args.visibleSlidePerSize == 'undefined') ? { sm: 2, med: 5, lrg: 7, xlrg: 7} : args.visibleSlidePerSize;
        //console.dir(args.visibleSlidePerSize);
        args.pager = (args.pager == 'undefined') ? args.thisCarousel.find('.carousel-pager') : jQuery(args.pager);
        args.caption = (args.caption == 'undefined') ? args.thisCarousel.find('.carousel-caption') : jQuery(args.caption);
        //console.log(args.caption);
        args.carouselImgNum = (args.altImgSources == false) ? args.thisCarousel.find('figure').length : get_object_keys(args.altImgSources);
        //console.log("carousel image number: " + args.carouselImgNum);
        
        //console.log("slideNum: "+slideIndex);
        // if zoomVar is defined, then there's a zoom object.
        args.zoomVar = (typeof args.zoomVar == 'undefined') ? false : args.zoomVar;
        //largeImgContainer should be the ID without the #, e.g. 'zoom-image-display'
        args.largeImgContainer = (typeof args.largeImgContainer == 'undefined') ? jQuery('#object-image-display') : jQuery('#'+args.largeImgContainer);
        args.zoomControls = (typeof args.zoomControls == 'undefined') ? args.largeImgContainer.parent().nextAll('.image-controls') : args.zoomControls;		
		//create variable to store dz between switching to alt image and back
		var dz;
		
        args.captionContainer = (args.largeImgContainer == false) ? false : args.largeImgContainer.nextAll('.gallery-image-caption');
        args.allowDeepLink = (args.allowDeepLink == 'undefined') ? true : args.allowDeepLink;
        
        
        var downloadControl = jQuery(args.zoomControls).find('li a[id^="download-"]');
        var downloadableMessage = jQuery('#download-available-message');
        var downloadMobileWarning = jQuery('#download-mobile-size-warning');
        var orderImageContainer = jQuery('#order-image-container');
		
        
        // if there's a zoom object, then there needs to be a thumbnail that turns it back on IF there's a carousel
        if (args.zoomVar != false) {
        	args.carouselImgNum += 1;
            args.zoomThumb = (typeof args.zoomThumb == 'undefined') ? jQuery(this).find('.carousel figure:first-child') : jQuery(args.zoomThumb);
            
            // get the openseadragon container and controls to show/hide
            var zoomContainer = jQuery(args.zoomVar.container);
            var zoomControls = jQuery(args.zoomControls).find('li a[id^="zoom-"]');
            var imgcap;
            var imgcredit;
            if (args.altImgSources !== false) imgcap = args.zoomThumb.find('figcaption strong').text();
            if (args.altImgSources !== false) imgcredit = jQuery('.gallery-image-caption').find('.object-media-copyright').first().text();
            // console.log(imgcredit);
            //console.log(args.zoomVar.container);
            //console.log(zoomControls)
	        

	        function prep_touch_zoom() {
		        zoomContainer.hide();
				jQuery(args.zoomThumb).find('img').clone().addClass('gallery-image').appendTo(args.largeImgContainer);
				var ztc = args.largeImgContainer.find('.gallery-image');
				
				ztc.click(function() {
					zoomViewer.setFullScreen(true);
				});
	        }            
                    
            // When zoom thumbnail is clicked, check if visible. If so, don't do anything. 
            // If not, kill whatever is there and show zoom.
			if (args.altImgSources != false) {
	            args.zoomThumb.click(function() {
	                if ( args.zoomVar.isVisible() == false ) {
	                	args.zoomVar.setVisible(true);
	                    zoomContainer.show();
	                    zoomControls.show();
	                    if (args.zoomDl !== false) {
		                    downloadControl.show().attr('href',args.dlBaseHref+'&dlimgurl='+args.zoomDl.resourceUri+'&uoiid='+args.zoomHash).find('small span').text('(' + args.zoomDl.fileSize + ')');
		                    downloadableMessage.show();
		                    if (isTouch()) downloadMobileWarning.show();
		                    orderImageContainer.hide();
	                    } else {
		                    downloadControl.hide();
		                    downloadableMessage.hide();
		                    if (isTouch()) downloadMobileWarning.hide();
		                    orderImageContainer.show().find('#order-image').attr('href',args.orderImgBaseHref+"&uoiid="+args.zoomHhash);
	                    }
	                    args.largeImgContainer.toggleClass('zoom-image-object');
	                    if (args.largeImgContainer.parent().hasClass('vertical-middle')==true) {
	                    	//console.log("has vertical middle, disabling");
		                    args.largeImgContainer.parent().toggleClass('vertical-middle');
	                    }
	                    // console.log("Image cap: " + imgcap);
	                    args.largeImgContainer.nextAll('.gallery-image-caption').find('strong').text(imgcap);
	                    //console.log(imgcredit);
	                    args.largeImgContainer.nextAll('.gallery-image-caption').find('.object-media-copyright').text(imgcredit);
	
	                    if ( args.largeImgContainer.find('.gallery-image').length > 0 ) {
	                        args.largeImgContainer.find('.gallery-image').remove();
	                    }
	                    
	                    if (isTouch()) {
			            	// display an image and hide the zoom
			            	prep_touch_zoom();
						}
						
	                    // Clear Deep linking url var
						if (args.allowDeepLink == true)	{
							if (ie8() || ie9() ) {
								ie_draw_deep_link('artview', '');
							} else {
								updateURL(window.document.title, updateURLParameter(window.location.href, 'artview', ''));
							}
						}
						//if (typeof dz !== 'undefined') {
							applyZoomHash({
								timer: 300, 
								zoomObject: args.zoomVar,
								coords:	dz
							});
						//}
	                }
	            });
	        }
        }
        //console.log("number of carousel images: " + args.carouselImgNum);
       
        init_carousel({
        	next: args.next,
        	prev: args.prev,
        	pager: args.pager,
        	caption: args.caption,
	        carousel: args.thisCarousel,
            gotoSlide:  slideIndex,
            carouselImgNum: args.carouselImgNum
        });
        
        // IF there are alt images, map their click.
        if (args.altImgSources != false) {
	        // if any other item is clicked, and there is a zoom, don't apply this click to the first item
	        jQuery(this).find('.carousel figure').map(function(e, i) {
	            if (args.zoomVar != false && args.zoomThumb.is(this)) {
	                //console.log("skip this");
	            } else {
	                jQuery(this).click(function() {
	                	
	                    if (args.largeImgContainer.prev('.loader').length > 0 ) {
	                        //console.log("loader still exists");
	                        args.largeImgContainer.prevAll('.loader').remove();
	                    }
	                    //args.largeImgContainer.css({
	                    //  visibility: 'visible',
	                    //  opacity:    0
	                    //}).gettyLateFadeImg({
	                        //hiddenParent
	                    //});
	                    if ( args.zoomVar != false && args.zoomVar.isVisible() == true) {
	                        args.zoomVar.setVisible(false);
	                        zoomContainer.hide()
	                        zoomControls.hide();
	                        args.largeImgContainer.toggleClass('zoom-image-object');
	                    }
	                    if ( args.largeImgContainer.find('.gallery-image').length > 0 ) {
	                        //console.log('img exists, kill it');
	                        args.largeImgContainer.find('.gallery-image').remove();
	                    }
	                    if (args.largeImgContainer.parent().hasClass('vertical-middle')!= true) {
	                    	//console.log("needs vertical-middle, adding");
		                    args.largeImgContainer.parent().toggleClass('vertical-middle');
	                    }
	                    var imgIndx = ( jQuery(this).parent('li').length > 0 ) ? jQuery(this).parent().index() : jQuery(this).index();
		                //console.log("imgIndx before zoomVar check: " + imgIndx);
		               // console.log("is zoomvar true or false? "+args.zoomVar);
		                imgIndx = (args.zoomVar !== false) ? "img" + ( imgIndx -1 ) :  "img" + imgIndx;
						//console.log("imgIndx after zoomVar check: " + imgIndx);
						
						// update which slide is active, IF Carousel is true. Need to add 1 because of 0 base index.
						if (get_fluid()) thisSlide = args.thisCarousel.data('cycle.API').getSlideIndex(this) + 1;
						
						// recalc slideIndex
						slideIndex = get_updated_carousel_slideIndex(slideIndex, thisSlide);
						
						var imgID = args.altImgSources[imgIndx].imgID;
						if (jQuery.getUrlVar('dz') !== undefined) {
							dz = getZoomHash();
							updateURL(window.document.title, updateURLParameter(window.location.href, 'dz', ''));
						} else {
							dz = undefined;
						}
						if (args.allowDeepLink == true) {
							if (ie8() || ie9() ) {
								ie_draw_deep_link('artview', imgID);
							} else {
								updateURL(window.document.title, updateURLParameter(window.location.href, 'artview', imgID));
							}
						}
	                    var imgcap = args.altImgSources[imgIndx].caption;
	                    var imgsrc = args.altImgSources[imgIndx].pathUrl;
	                    var imgcopy = args.altImgSources[imgIndx].mediaCopyright;
	                    var imgalt = imgcap;
	                    var imgtitle = decodeHtml(args.altImgSources[imgIndx].title);
	                    var imgid = args.altImgSources[imgIndx].imgID;
	                    var clearance = args.altImgSources[imgIndx].clearance;
	                    
	                    if ( clearance === "DOWNLOAD") {
		                     downloadControl.show().attr('href',args.dlBaseHref+'&dlimgurl='+args.altImgSources[imgIndx].resourceUri+'&uoiid='+args.altImgSources[imgIndx].hash).find('small span').text('(' + args.altImgSources[imgIndx].fileSize + ')');
	                        downloadableMessage.show();
	                        orderImageContainer.hide();
	                        if (isTouch()) downloadMobileWarning.show();
	                    } else {
		                    downloadControl.hide();
		                    downloadableMessage.hide();
		                    orderImageContainer.show().find('#order-image').attr('href',args.orderImgBaseHref+"&uoiid="+args.altImgSources[imgIndx].hash);
		                    if (isTouch()) downloadMobileWarning.hide();
	                    }

	                    args.largeImgContainer.nextAll('.gallery-image-caption').find('strong').text(imgcap);
	                    imgcopy = (imgcopy === "null") ? "" : "Image: " + imgcopy;
	                    args.largeImgContainer.nextAll('.gallery-image-caption').find('.object-media-copyright').text(imgcopy);
	                    
	                    var oimg = new Image();
	                    
	                    jQuery(oimg).load(function() {
	                        args.largeImgContainer.append(jQuery(this));
	                    }).attr({
	                        src:    imgsrc,
	                        alt:    imgalt,
	                        class:  'gallery-image',
	                        title: imgtitle
	                    });
	                    //console.log(args.thisCarousel);
	                    kill_carousel({
	                        carousel: args.thisCarousel
	                    });
	                    // console.log("check slideIndex again..."+slideIndex);
	                    init_carousel({
	                    	next: args.next,
				        	prev: args.prev,
				        	pager: args.pager,
				        	caption: args.caption,
				        	visibleSlides: get_visibleSlides(),
	                        carousel: args.thisCarousel,
	                        gotoSlide:  slideIndex,
	                        carouselImgNum: args.carouselImgNum
	                    });  
	                             
	                });
	            }
	        });
	    }
        
        function get_interchange_src(imgsrc) {
            //console.log(src);
            var srcPath = imgsrc.substring(0, imgsrc.lastIndexOf('_sm') );
            //console.log(srcPath);
            var isrc = '['+srcPath+'_med.jpg, (med)], ['+srcPath+'_lrg.jpg, (lrg)]';
            //console.log(isrc);
            return isrc;
        }
        
		function build_block_grid(carousel) {
			carousel.find('figure').wrapAll('<ul class="small-block-grid-' + args.visibleSlidePerSize.sm + ' medium-block-grid-' + args.visibleSlidePerSize.med + ' large-block-grid-' + args.visibleSlidePerSize.xlrg + '"/>').wrap('<li>');
		}
        
        function get_visibleSlides() {
			// Depending on width of page, display a different number of slides.
			// Also depends on the total number of slides, if less than the setting,
			// reset the visibleSlides to that number.
			if ( jQuery('html').hasClass('small') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.sm) {
					args.controls.hide();
					return args.carouselImgNum;
				} else {
					args.controls.show();
					return args.visibleSlidePerSize.sm;
				}
			} else if ( jQuery('html').hasClass('medium') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.med) {
					args.controls.hide();
					return args.carouselImgNum;
				} else {
					args.controls.show();
					return args.visibleSlidePerSize.med;
				}
			} else if ( jQuery('html').hasClass('large') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.lrg) {
					args.controls.hide();
					return args.carouselImgNum;
				} else {
					args.controls.show();
					return args.visibleSlidePerSize.lrg;
				}
			} else if ( jQuery('html').hasClass('xlarge') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.xlrg) {
					args.controls.hide();
					return args.carouselImgNum;
				} else {
					args.controls.show();
					return args.visibleSlidePerSize.xlrg;
				}
			}
        }
		   
		function get_fluid() {
			if ( jQuery('html').hasClass('small') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.sm) {
					return false;
				} else {
					return true;
				}
			} else if ( jQuery('html').hasClass('medium') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.med) {
					return false;
				} else {
					return true;
				}
			} else if ( jQuery('html').hasClass('large') === true || jQuery('html').hasClass('xlarge') === true ) {
				if (args.carouselImgNum <= args.visibleSlidePerSize.xlrg) {
					return false;
				} else {
					return true;
				}
			}
		}
		function init_carousel( args ) {
			//console.log("init carousel");
			args = (typeof args == 'undefined') ? {} : args;
			args.carousel = (typeof args.carousel == 'undefined') ? false : args.carousel;
			args.visibleSlides = (typeof args.visibleSlides == 'undefined') ? get_visibleSlides() : args.visibleSlides;
			var totalSlides = args.carouselImgNum - args.visibleSlides + 1;
			args.gotoSlide = (typeof args.gotoSlide == 'undefined') ? 1 : args.gotoSlide;
			if (get_fluid() == false) {
				//console.log("set up block-grid on " + args.carousel.attr('class'));
				build_block_grid(args.carousel);
			} else {
				var opts = {
					next:			args.next,
					prev:			args.prev,
					pager:			args.pager,
					caption:		args.caption,
					captionTemplate:	"Page {{slideNum}} of " + totalSlides,
				    autoHeight:     "calc",
				    manualSpeed:    200,
				    carouselVisible:   args.visibleSlides,
				    carouselFluid:  true,
				    allowWrap:      false,
				    paused:         true,
				    slides:         ">figure",
				    fx:             "carousel",
				    swipe:          true,
				    pagerEvent:     'click.cycle',
				    updateView:     1,
				    log:            false,
				    startingSlide:  args.gotoSlide
				};
				args.carousel.cycle(opts);
				// updateView to get pager disabled to work right
				args.carousel.data( 'cycle.API' ).updateView();
			}
		}
        
        function get_object_keys(obj) {
        	//console.log("get_object_keys obj: " + obj);
	        var count = 0;
	        if (ie8()) {
				var i;
				
				for (i in obj) {
				    if (obj.hasOwnProperty(i)) {
				        count++;
				    }
				}
	        } else {
		        count = Object.keys(obj).length;
	        }
	        return count;
        }
		function kill_carousel( args ) {
		    args = (typeof args == 'undefined') ? {} : args;
		    args.carousel = (typeof args.carousel == 'undefined') ? false : args.carousel;
		    if ( args.carousel != false ) {
		    	// need to check whether it's a ul or cycle()
		    	// remove ul and li, otherwise destroy cycle()
		    	if ( args.carousel.find('ul').length > 0) {
			    	//console.log("has a ul");
			    	args.carousel.find('figure').each(function() {
					    jQuery(this).parent().parent().before(this);
					});
					args.carousel.find('ul').remove();
		    	} else {
			        args.carousel.cycle('destroy');
			    }
		    }
		}
		
		function get_updated_carousel_slideIndex(slide_index, this_slide) {
			if (this_slide > get_visibleSlides() ) {
				slide_index = this_slide - get_visibleSlides();
			} else {
				slide_index = slide_index;
			}
			return slide_index;
		}
		
		function rebuild_carousel_after_screen_change() {
			waitForFinalEvent(function() {
				slideIndex = get_updated_carousel_slideIndex(slideIndex, thisSlide);
				kill_carousel({
	                carousel: args.thisCarousel
	            });
				init_carousel({
	            	next: args.next,
		        	prev: args.prev,
		        	pager: args.pager,
		        	caption: args.caption,
		        	visibleSlides: get_visibleSlides(),
	                carousel: args.thisCarousel,
	                gotoSlide:  slideIndex,
	                carouselImgNum: args.carouselImgNum
	            });
            }, 400, "timer_"+args.thisID);
		}
		
		var isfs = false;
		document.addEventListener("webkitfullscreenchange", function() {
			if (document.webkitIsFullScreen == false) {
				rebuild_carousel_after_screen_change();
			}
		}, false);
		
		var ww = jQuery(window).width();
        jQuery(window).resize(function() {
        	if (ww != jQuery(window).width()) {
        		rebuild_carousel_after_screen_change();
			}
		});
    };
    
    // Set up you tube playlists.
    // Need youtube playlist ID (playlist?list= value on YouTube)
    // Also need the initial video to display. Multiple options:
    // If not defined, and an embed is on the page, use the embed
    // If defined as an id, and an embed is on the page, replace embed with defined id.
    // Note: Private videos will be skipped automatically.
    jQuery.fn.gettyYTPlayList = function( args ) {
	    args = (typeof args == 'undefined') ? {} : args;
	    args.playlistID = (typeof args.playlistID == 'undefined') ? false : args.playlistID;
	    args.defaultVideo = (typeof args.defaultVideo == 'undefined') ? false : args.defaultVideo;
	    args.thisContainer = this;
	    //console.log(args.thisContainer);
	    //console.log(args.defaultVideo);
	    // Set up the json feed from the playlist. Note that this will break if no playlist is defined.
	    if (args.playlistID == false ) {
		    console.log('Please define the YouTube Playlist. Video section removed.');
		    args.thisContainer.remove();
		    return;
	    }
	    var ytapiurl    = 'http://gdata.youtube.com/feeds/api/playlists/' + args.playlistID + '?v=2&alt=json&callback=?';
		
		// Grab the json feed.
		jQuery.getJSON(ytapiurl, 'jsonp', function(data) {
			//console.log(data);
		    // Set up initial video embed, if one doesn't exist
		    if (args.thisContainer.find('.playlist-vid iframe').length == 0) {
		    
		    	args.thisContainer.find('.playlist-vid .flex-video').html('<iframe width="560" height="315" frameborder="0" allowfullscreen></iframe>');
		    	// check if there's a default video defined. If not, set first in playlist.
		    	if (args.defaultVideo != false) {
				    args.thisContainer.find('.playlist-vid .flex-video iframe').attr('src', '//www.youtube.com/embed/' + args.defaultVideo);
			    } else {
			    	// place the first video id, reset defaultVideo to that ID for later 'active' class use
				    args.thisContainer.find('.playlist-vid .flex-video iframe').attr('src', '//www.youtube.com/embed/' + data.feed.entry[0].mediajQuerygroup.ytjQueryvideoid.jQueryt);
				    args.defaultVideo = data.feed.entry[0].mediajQuerygroup.ytjQueryvideoid.jQueryt;
			    }
		    } else if (args.thisContainer.find('.playlist-vid iframe').length > 0 && args.defaultVideo != false ) {
				args.thisContainer.find('.playlist-vid .flex-video iframe').attr('src', '//www.youtube.com/embed/' + args.defaultVideo);
		    }
	    	
			
			// With each feed.entry in the resulting data, set up the <li> and the .click()
			jQuery.each(data.feed.entry, function(i, item) {
				
				// if an item is set to Private, skip it.
				if (item.appjQuerycontrol != undefined && item.appjQuerycontrol.ytjQuerystate.reasonCode == 'private') {
					//console.log("private");
				} else {
					//console.dir(item);
			   		var title	  = item['title']['jQueryt'];
					var videoid  = item.mediajQuerygroup.ytjQueryvideoid.jQueryt;
					
					var pubdate  = item['published']['jQueryt'];
					var fulldate = new Date(pubdate).toLocaleDateString();
					
					var thumbimg = item.mediajQuerygroup.mediajQuerythumbnail[2].url;
					
					var vlink  = item.mediajQuerygroup.mediajQuerycontent[0].url;
					var ytlink = item.mediajQuerygroup.mediajQueryplayer.url;
					var numviews = item.ytjQuerystatistics.viewCount;
					var numcomms = item.gdjQuerycomments.gdjQueryfeedLink.countHint;
					
					var htmlString ='<li><figure class="clearfix"><img class="pull-left small-width-33 medium-width-33 large-width-25" src="' + thumbimg + '" alt="YouTube Thumbnail: ' + title +'">';
					htmlString +='<figcaption><h5>' + title + '</h5></figcaption></figure></li>';
					var li = jQuery(htmlString);
					
					if (args.defaultVideo != false && (videoid == args.defaultVideo)) {
						//console.log("videoid: " + videoid + " : defaultVideo: " + args.defaultVideo);
						li.addClass('active');
					}
					
					li.click(function(e) {
						jQuery(this).siblings('.active').toggleClass('active');
						jQuery(this).addClass('active');
						args.thisContainer.find('.playlist-vid iframe').remove();
						args.thisContainer.find('.playlist-vid .flex-video').html('<iframe width="560" height="315" src="//www.youtube.com/embed/'+ videoid +'" frameborder="0" allowfullscreen></iframe>');
					});
					args.thisContainer.find('ul.no-bullet').append(li);
				}
			});
		});
		
		//var adj = args.thisContainer.find('.playlist-list > h5').outerHeight(true);
		
		args.thisContainer.find('.playlist-list .scrollable-content').matchHeight({
	        sourceHeight: jQuery(this).find('.playlist-vid'),
	        adjust: args.thisContainer.find('.playlist-list > h5'),
	        minHeight: false,
	        small: false,
	        medium: true,
	        large: true,
	        xlarge: true
	    });
	    
	    jQuery(window).load(function() {
		    args.thisContainer.find('.scrollable-content').mCustomScrollbar({
	            scrollInertia:  0,
	            advanced: {
	                updatedOnBrowserResize: true
	            }
	        });
	    });
	    
    };
    
    
    // fade in interchange images that have a massive effect on page render, like hero-image, or Visit/[loc]/plan/index image
    // make sure the image, or the container, is set to visible: hidden; and opacity: 0;
    // then, if the container is hidden, make sure to declare it as the hiddenParent to fade it in.
    jQuery.fn.gettyLateFadeImg = function( args ) {
        args = (typeof args == 'undefined') ? {} : args;
        args.hiddenParent = (typeof args.hiddenParent == 'undefined') ? jQuery(this) : args.hiddenParent;
        jQuery(this).on('replace', 'img', function(e, new_path, original_path) {
            if ( args.hiddenParent.css('display') == 'none' || jQuery('html').hasClass('small') == true || args.hiddenParent.css('opacity') == 1 ) {
                //console.log("skip, on mobile!");
                return false;
            } else {
                // console.log("don't skip, not on mobile");
                args.hiddenParent.gettyAddLoader();
                
                //console.log(e.currentTarget, new_path, original_path);
                //alert(args.hiddenParent);
                jQuery(e.currentTarget).load(function() {
                    args.hiddenParent.prev('.loader').animate({opacity:0},1000, function() {
                        jQuery(this).remove();
                    });
                    args.hiddenParent.css('visibility','visible').animate({opacity:1},1000, function() {
                        jQuery(this).prevAll('.loader').remove();
                    });
                });
            }
        });
    };
    // a little loader that will pop into the DOM before whatever you attach it to, and sort of center itself in the space.
    // note: whatever you attach it to cannot be set as display:none!!! otherwise offset won't work.
    jQuery.fn.gettyAddLoader = function() {
        var w = jQuery(this).width();
        var h = ( jQuery(this).outerHeight() === 0 ) ? 500 : jQuery(this).outerHeight();
        var lo; // a variable set aside to contain the loader object
        var po; // html to create loader
        var low;
        var loh;
        var lx;
        var ly;
		
        
        
        if (ie8() || ie9()) {
            po = '<span class="loader" style="visibility:hidden;">Loading...</span>';
        } else {
            po = '<span class="loader icon-spinner icon-spin icon-2x" style="visibility:hidden;"></span>';
        }
        jQuery(this).before(po);

        lo = jQuery(this).prev('.loader');
        low = lo.width();
        loh = lo.height();
        
        //console.log(h);
        lx = ((w/2) - (low/2));
        ly = ((h/2) - (loh/2));
        
        jQuery(this).prev('.loader').css({
            position: 'absolute',
            left:   lx,
            top:    ly,
            zIndex: 999,
            visibility: 'visible'
        });
    };

    // clickable tiles
    // used to make tiles on landing pages clickable
    // expects a class, but probably could use an id? with each?
    // needs a data-href attribute to specify specific url in case no href, or multiple hrefs
    // specify some different cases for opening in new window in the if
    jQuery.fn.clickable_tile = function() {
        jQuery(this).css('cursor','pointer');
        var loc = jQuery(this).attr("data-getty-href");
        jQuery(this).on('click', function(e) {
        	// console.log("data-getty-href-new:", typeof jQuery(this).attr('data-getty-href-new'));
        	if ( loc.endsWith(".pdf") || typeof jQuery(this).attr('data-getty-href-new') !== "undefined")  {
        		//console.log("pdf, new window");
            	window.open(loc);
            } else if ( loc.startsWith('/') || loc.startsWith('#') || loc.startsWith('http://localhost') || loc.indexOf('getty.edu/') != -1 || typeof jQuery(this).attr('data-getty-href-self') !== "undefined" ) {
            	//console.log("internal url, same window");
            	window.location = loc;
            } else {
            	//console.log("external, new window");
            	window.open(loc);
            }
            return false;
        });
    };
    
    jQuery.fn.matchHeight = function(args) {
    	args.timeCount = (typeof args.timeCount == 'undefined') ? 200 : args.timeCount;
        args = (typeof args == 'undefined') ? {} : args;
        args.target = jQuery(this);
        args.sourceHeight = (typeof args.sourceHeight == 'undefined') ? alert("Choose a source element to match height against") : args.sourceHeight;
        args.adjust = (typeof args.adjust == 'undefined') ? 0 : args.adjust;
        args.small = (typeof args.small == 'undefined') ? false : args.small;
        args.medium = (typeof args.medium == 'undefined') ? false : args.medium;
        args.large = (typeof args.large == 'undefined') ? false : args.large;
        args.xlarge = (typeof args.xlarge == 'undefined') ? false : args.xlarge;
        args.minHeight = (typeof args.minHeight == 'undefined') ? true : args.minHeight;
        args.ie8Padding = (typeof args.ie8Padding == 'undefined') ? true : args.ie8Padding;
        
        //console.log("target element: ", args.target);
        //console.log("source element: ", args.sourceHeight);
        //console.log("adjust height: ", args.adjust);
        //console.log("maintain for small?: ", args.small);
        //console.log("maintain for medium?: ", args.medium);
        //console.log("maintain for large?", args.large);
        //console.log("maintain for xlarge?", args.xlarge);
        
        function applyHeight() {
            var mb = args.target.css('margin-bottom');
            // console.log("mb: ", mb);
            var sh;
            if (typeof args.adjust == 'object') {
		        args.adjust.objectHeight = -1 * args.adjust.outerHeight(true);
		        //console.log(args.adjust.objectHeight);
		        sh = args.sourceHeight.height() + args.adjust.objectHeight;
	        } else if (args.adjust != 0) {
	        	sh = args.sourceHeight.height() + args.adjust;
	        } else {
		        sh = args.sourceHeight.height()
	        }
            
            //console.log("sh: ", sh);
            
            // get top and bottom padding from target element for IE8, since it's a piece of crap browser.
            var tp = parseInt(args.target.css('padding-top')) + parseInt(args.target.css('padding-bottom'));
            
            // use min-height unless minHeight is set to false.
            // for use in places like slideshows
            var hvar = (args.minHeight == true) ? 'min-height' : 'height';
            var hval = (args.minHeight == true) ? '0' : 'auto';
            if (args.small == true && jQuery('html').hasClass('small') === true) {
                //console.log("in small, and maintain for small true");
                args.target.css(hvar, sh).css('margin-bottom', '0');
            } else if (args.small == false && jQuery('html').hasClass('small') === true ) {
                //console.log("in small, and maintain for small false");
                args.target.css(hvar,hval).css('margin-bottom', mb);
            }
            
            if (args.medium == true && jQuery('html').hasClass('medium')==true) {
                //console.log("in medium, maintain for medium true");
                args.target.css(hvar, sh).css('margin-bottom', '0');
            } else if (args.medium == false && jQuery('html').hasClass('medium') == true) {
                //console.log("in medium, maintain for med is false");
                args.target.css(hvar,hval).css('margin-bottom', mb);
            }
            
            if (args.large == true && jQuery('html').hasClass('large') === true) {
                //console.log("in large, maintain for large is true");
                args.target.css(hvar, sh).css('margin-bottom', '0');
            } else if (args.large == false && jQuery('html').hasClass('large') === true) {
                //console.log("in large, maintain for large is false");
                args.target.css(hvar,hval).css('margin-bottom', mb);
            }
            
            if (args.xlarge == true && jQuery('html').hasClass('xlarge') === true) {
                //console.log("in xlarge, maintain is true");
                args.target.css(hvar, sh).css('margin-bottom', '0');
            } else if (args.xlarge == false && jQuery('html').hasClass('xlarge') === true) {
                //console.log("in xlarge, maintain is false");
                args.target.css(hvar,hval).css('margin-bottom', mb);
            }
            
            if (ie8()) {
                if (args.ie8Padding == true) {
                    //console.log("IE8: sh:" + sh + "| tp: " + tp);
                    sh -= tp;
                }
                args.target.css(hvar, sh).css('margin-bottom', '0');
            }
        }

        jQuery(document).ready(function() {
            applyHeight();
        });
        // on resize, match the height as it expands/contracts
        var thisRand = ((Math.random()*100)+1);
        jQuery(window).resize(function() {
			waitForFinalEvent(function() {
				applyHeight();
				//console.log("timer_" + thisRand);
			}, args.timeCount, "timer_" + thisRand);
		});
        
    };
    jQuery.fn.animateRotate = function(angle, duration, easing, complete) {
        var args = jQuery.speed(duration, easing, complete);
        var step = args.step;
        return this.each(function(i, e) {
            args.step = function(now) {
                jQuery.style(e, 'transform', 'rotate(' + now + 'deg)');
                if (step) return step.apply(this, arguments);
            };
    
            jQuery({deg: 0}).animate({deg: angle}, args);
        });
    };
})( jQuery );

// mobile/tablet search button anchor rewrite
jQuery('#simple-search-button').on('click',function(e) {
    e.preventDefault();
    jQuery('#simple-search > form').submit();
});

// this changes the plus sign to minus sign on accordions on click, as it doesn't work out of box.
function accordion_click() {
	jQuery(this).find('span.icon-base+span').toggleClass('icon-plus-sign2 icon-minus-sign-alt');
}

// if you have an element with the class .clear-input, you can set it up to clear an input
// by simply giving it an id that starts with "clear-" and ends with the id of the input you want to clear.
// <input type="text" id="inputMania"> <span id="clear-inputMania">x</span>
function setup_clear_input() {
	jQuery('.clear-input').each(function() {
		var cb = jQuery(this).find('span[id^="clear-"]').attr('id');
		var inp = jQuery('#' + cb.split('-')[1]);
		jQuery(this).on('click', function() {
			inp.val('');
		});
	});
	
}
// run a few items on page load
// this may be the totally wrong place for all of this. 
// This stuff should probably get pushed into the getty.get-includes.js once everything is done processing.
jQuery(document).ready(function() {
	// make sure input[type="number"] is only allowing numbers on key press.
	jQuery('input[type="number"]').keypress(function(e){
		return isNumberKey(e);
	});
	
	// initialize the off canvas stuff. 
	// Note, as we migrate to the ajax include solution, this should probably get removed.
	// Otherwise it will be getting called twice.
	off_canvas_init();
	language_choice_init();
	
	// .minimal cancel button
	// This appears in pages that appear in fancybox and you want a cancel button to close the box.
	// This kind of code should only get migrated into a minimal.js and only called on those pages.
	jQuery('.minimal #cancel-button').click(function() {
		parent.jQuery.fancybox.close();
	});
	// hide minimal cancel button if it appears in fancybox frame
	if (inIframe() === false) {
		jQuery(".minimal #cancel-button").hide();
	}
	
	// set up any input clear buttons
	setup_clear_input();
	
	// accordions should have the plus and minus icons. Swap them on click
	jQuery('.accordion .title').click(accordion_click);
	
	// find .button-submit, make it submit its closest parent form
	jQuery('.button-submit').click(function(e) {
		e.preventDefault();
		jQuery(this).closest('form').submit();
	});
	
	// set up a checkCarousel function to set up a timer
	// check for artview in url.
	// if it exists, set a timer, then wait for everything to be loaded and ready before initiating.
	// This is really only for collection stuff. should probably get moved eventually,
	// and then probably get re-edited if switched from Cycle to CarouFredSel.
	if ( jQuery.getUrlVar('artview') ) {
		// cready is carousel ready.
		// variable is set up with the checkCarousel function above.
		// Set this up for an interval to load altimages once carousel is fully initialized
		jQuery('.carousel').on('cycle-post-initialize', function(e, opts) {
			cready = true;
	    });
	    jQuery('.carousel').on('cycle-destroy', function() {
		    cready = false;
	    });
	    // checkCarousel() is defined in getty.functions.js
	    checkCarousel();
	}
	
    //clickable tiles
    // This is global
    jQuery.each(jQuery('[data-getty-href]'), function() {
        jQuery(this).clickable_tile();
    });
    
	// #advanced-search is in the global menu.
	// This could get thrown into getty.get-includes easily.
    jQuery('#advanced-search form.custom input.button').click(function() {
    	//console.log("clicking");
		jQuery('#advanced-search form.custom').submit();
	});
    
    // A global click to force pdfs to open in a new window.
    jQuery("#content").on('click',"a[hrefjQuery='.pdf']", function(e) {
    	e.preventDefault();
    	window.open(jQuery(this).attr('href'));
    });
    
    // Fancybox customized for Getty.
    jQuery(".fancybox").fancybox({
        fitToView : false,
        autoSize : false,
        closeClick : false,
        openEffect : 'none',
        closeEffect : 'none',
        scrolling : 'auto',
        preload : 'false',
        maxWidth: '940',
        beforeLoad : function() {
            if ( ( ie8() || ie9() ) && this.href.indexOf('http://tickets.getty.edu/') != -1 ) {
                window.open(jQuery(this).attr('href'), '_blank');
                return false;
            }
            if ( jQuery(this.element).data('fancybox-width') ) {
                this.width  = parseInt(this.element.data('fancybox-width'));
            } else {
                this.width = '90%';
            }
            if ( jQuery(this.element).data('fancybox-height') ) {
                this.height = parseInt(this.element.data('fancybox-height'));
            } else {
                this.height = '90%';
            }
        },
        helpers : {
            title : null
        }
    });
    
    // run random crap for IE8 to make it work nice.
    // At some point this can get deleted.
    ie8_functions();
    
    // reveal the utilities in the upper right corner in medium down
    jQuery('#utility-display').click(function() {
        jQuery(this).children().toggleClass('icon-muted');
        //jQuery(this).find('.icon-stack-base').next().toggleClass('icon-chevron-left icon-chevron-right');
        jQuery(this).next().toggle();
        jQuery(this).siblings('#day-filter').toggleClass('small-pull-1');
    });
    
    // hides all the wrapper stuff in minimal pages. 
    // Probably should have gone into a minimal.js only for those pages. Sigh.
    minimalHideChrome();
});

// This doesn't have to do with Chrome the browser, but with the old phrase referring to constant elements as "chrome"
// like the header, footer, etc.
// In .minimal pages, we need to hide a bunch of stuff, and do some resizing. This does that.
function minimalHideChrome() {
	if (inIframe() === true && jQuery('body').hasClass('minimal') === true) {
	    jQuery('#banner, #level2-nav, #global-nav-wrapper, #l2-search-row, #utilities, #utility-display, #footer, #mobile-panel-nav').hide();
	    jQuery('html, body').css({
		    'min-height': '100%',
		    'background': '#fff'
	    });
	    if (ie9() === true) {
		    jQuery('#wrapper').css('width','100%');
	    }
	}
}

// Set up onMediaQueries
// https://github.com/JoshBarr/on-media-query
// mquery is a global variable that contains the current browser size media query class
// gets updated when MQ initiates.
var mquery;
var MQ;
var queries = [
    {
        context: 'small',
        match: function(a) {
            jQuery('html').toggleClass('small');
            mquery = 'small';
            //console.log("small on");
           // reinit_carousel({visibleSlides: 2});
        },
        unmatch: function() {
            jQuery('html').toggleClass('small');
            //console.log("small off");
           // kill_carousel();
        }
    },
    {
        context: 'medium',
        match: function(a) {
            jQuery('html').toggleClass('medium');
            if ( jQuery('#utilities').is(':visible') == false && jQuery('body').hasClass('minimal') === false && inIframe() === false) {
                jQuery('#utilities').show();
            }
            mquery = 'medium';
            //reinit_carousel({visibleSlides: 3});
        },
        unmatch: function() {
            jQuery('html').toggleClass('medium');
            //console.log("medium off");
            //kill_carousel();
        }
    },
    {
        context: 'large',
        match: function(a) {
            jQuery('html').toggleClass('large');
            mquery = 'large';
            //console.log("large on");
            //reinit_carousel({visibleSlides: 4});
        },
        unmatch: function() {
            jQuery('html').toggleClass('large');
            //console.log("large off");
            //kill_carousel();
        }
    },
    {
        context: 'xlarge',
        match: function(a) {
            jQuery('html').toggleClass('xlarge');
            mquery = 'xlarge';
            //console.log("xlarge on");
            //reinit_carousel({visibleSlides: 5});
        },
        unmatch: function() {
            jQuery('html').toggleClass('xlarge');
            //console.log("xlarge off");
           // kill_carousel();
        }
    }
];
if(!ie8())
	MQ.init(queries);

//if ie8, fix a ton of crap
function ie8_functions() {
    if ( ie8() ) {
        ie8_load_large_images();
        ie8_fix_last_child_grid();
        jQuery('*:last-child').addClass('last-child');
    }
}

// Interchange doesn't work in IE8. Load large image replacements in its stead.
function ie8_load_large_images() {
    jQuery('img').each(function() {
        //console.log(jQuery(this).attr('src'));
        var di = jQuery(this).attr('data-interchange');
        //console.log(di);
        if (typeof(di) !== 'undefined') {
            var s = di.lastIndexOf('[');
            //console.log(s);
            s++;
            var e = di.lastIndexOf(', (');
            var src = di.substring(s, e);
            jQuery(this).attr('src',src);
        }
    });
}

// fix IE8's lack of last-child to make a grid without enough columns work
function ie8_fix_last_child_grid() {
    jQuery('[class*="column"]+[class*="column"]:last-child').css('float', 'right');
}

// google map initializer. This is for the maps in Visit
// uses old version of google maps, but could be updated if needed
function map_initialize(args) {
	args = (typeof args == 'undefined') ? {} : args;
    args.mapLat = (typeof args.mapLat == 'undefined') ? alert("Map Latitude (mapLat) required") : args.mapLat;
    args.mapLng = (typeof args.mapLng == 'undefined') ? alert("Map Longitude (mapLng) required") : args.mapLng;
    args.target = (typeof args.target == 'undefined') ? 'map_canvas' : args.target;
    args.markerLat = (typeof args.markerLat == 'undefined') ? alert("Marker Latitude (markerLat) required") : args.markerLat;
    args.markerLng = (typeof args.markerLng == 'undefined') ? alert("Marker Longitude (markerLng) required") : args.markerLng;
    args.markerTitle = (typeof args.markerTitle == 'undefined') ? "Museum Parking" : args.markerTitle;
    args.markerContent = (typeof args.markerContent == 'undefined') ? "Parking entrance." : args.markerContent; 
    args.zoom = (typeof args.zoom == 'undefined') ? 15 : args.zoom;
    
    var latlng = new google.maps.LatLng(args.mapLat,args.mapLng);
    var settings = {
        zoom: args.zoom,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [ 
            { 
                "elementType": "geometry.fill", 
                "stylers": [ 
                    { "visibility": "on" }, 
                    { "color": "#ffffff" } 
                ] 
            },{ 
                "featureType": "water", 
                "elementType": "geometry.fill", 
                "stylers": [ 
                    { "color": "#dcdcdc" } 
                ] 
            },{ 
                "stylers": [ 
                    { "saturation": -100 } 
                ] 
            },{ 
                "featureType": "road", 
                "elementType": "labels.icon", 
                "stylers": [ 
                    { "gamma": 0.08 } 
                ] 
            },{ 
                "featureType": "road", 
                "elementType": "labels.text.stroke", 
                "stylers": [ 
                    { "color": "#ffffff" } 
                ] 
            },{ 
                "featureType": "road", 
                "elementType": "labels.text.fill", 
                "stylers": [ 
                    { "color": "#000000" } 
                ] 
            },{ 
            } 
        ]
    };
    var map = new google.maps.Map(document.getElementById(args.target), settings);
    /* var gettyLogo = new google.maps.MarkerImage('images/logo.png',
    new google.maps.Size(100,50),
    new google.maps.Point(0,0),
    new google.maps.Point(50,50)
    );
    var logoShadow = new google.maps.MarkerImage('images/logo_shadow.png',
    new google.maps.Size(130,50),
    new google.maps.Point(0,0),
    new google.maps.Point(65, 50)
    );*/
    var contentString = '<div id="google-content">' +
        '<div>'+
        '</div>'+
        '<h4>'+args.markerTitle+'</h4>'+
        '<div>'+
        '<p>' + args.markerContent +
        '</p>'+
        '</div>'+
        '</div>';
    var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });
    var museumPos = new google.maps.LatLng(args.markerLat,args.markerLng);
    
    var museumMarker = new google.maps.Marker({
        position: museumPos,
        map: map,
        // icon: gettyLogo,
        // shadow: logoShadow,
        title: args.markerTitle
    });
    google.maps.event.addListener(museumMarker, 'click', function() {
        //console.log("clicking");
        infoWindow.open(map,museumMarker);
    });
}

/*
// Mobile panel calls
jQuery(function() {
// function to toggle the mobile off canvas panel if browsing on a desktop client
// this was for an old version of off canvas done for old collection stuff. 
// I'm fairly sure that #mobile-search and #mobile-panel no longer exist.
  var mobileSearch = jQuery('#mobile-search');
  var mobilePanel = jQuery('#mobile-panel');

  jQuery(mobileSearch).click(function() {
    jQuery(mobilePanel).toggleClass('toggle');
  });
  jQuery('.button.close').click(function() {
    jQuery(mobilePanel).toggleClass('toggle');
  });

  
	jQuery(window).resize(function() {
	  // console.log('resized');
	  if( jQuery(mobilePanel).hasClass('toggle') ) {
	    jQuery(mobilePanel).toggleClass('toggle');
	  }
	});


  // swipe functions for mobile panel, checks for screen width at phone breakpoint (480px)
  // var mobileBreak = 480;
  // if( jQuery('html').hasClass('touch') ) {
    // tie a touch event to the search icon and 'close' menu entry
    // jQuery(mobileSearch).on({
    //   'touchend': function() {
    //     jQuery(mobilePanel).toggleClass('toggle');
    //   }
    // });
    // jQuery('.mobile-field.close').on({
    //   'touchend': function() {
    //     jQuery(mobilePanel).toggleClass('toggle');
    //   }
    // });

    // if( jQuery(window).width() <= mobileBreak ) {
    //   console.log("touch enabled, non-tablet");
    //   jQuery(mobilePanel).swipe({
    //     swipeLeft:function(event, direction, distance, duration, fingerCount) {
    //       jQuery(this).toggleClass('toggle');
    //     }
    //   });
    //   jQuery('#wrapper').swipe({
    //     swipeRight:function(event, direction, distance, duration, fingerCount) {
    //       jQuery(mobilePanel).toggleClass('toggle');
    //     }
    //   });
    // }
  // }
});
*/

// needed a way to calculate and move the off canvas panel from the right to a correct position.
// However, this needs to change if the browser width is greater than "large",
// which is basically the max width of our content area.
// Xlarge is any browser width greater than our max width of content area.
function calculate_oc_right() {
	var mobilePanel = jQuery('#mobile-panel-nav');
	var containerEl = ( jQuery('#wrapper').length > 0 ) ? jQuery('#wrapper') : jQuery('#mcCon');
	var wr = (jQuery(window).width() - ( containerEl.offset().left + containerEl.outerWidth() ) );
	if ( jQuery('html').hasClass('xlarge') ) {
		mobilePanel.css('right',wr);
	} else {
		mobilePanel.css('right','0px');
	}
}

// Mobile Off Canvas Toggle. Similar to search above, but this is redesign; what is above will probably go away.
function off_canvas_init() {
	if (jQuery('.minimal #global-nav').hasClass('off-canvas') === true) {
		jQuery('.minimal #global-nav.off-canvas .top-bar-mobile, #mobile-panel-nav').removeClass('show-for-medium-down');
	}
	// function to toggle the mobile off canvas panel if browsing on a desktop client
	var ocToggle = jQuery('#toggle-offcanvas');
	var mobilePanel = jQuery('#mobile-panel-nav');
	jQuery(ocToggle).off('click');
	jQuery(ocToggle).on('click',function() {
		if( mobilePanel.hasClass('toggle') === false ) {
			calculate_oc_right();
		}
		mobilePanel.toggleClass('toggle');
	});
	mobilePanel.find('.close').off('click');
	mobilePanel.find('.close').on('click',function() {
		mobilePanel.toggleClass('toggle');    
	});
	
	jQuery(window).resize(function() {
		// console.log('resized');
		if( mobilePanel.hasClass('toggle') ) {
			mobilePanel.toggleClass('toggle');
		}
		calculate_oc_right();
	});
	
	// add the icon-caret where needed, and toggle the menu open.
	mobilePanel.find('.has-dropdown > a').each(function() {
		var this_a = jQuery(this);
		//console.log(this_a.hasClass());
		this_a.next('ul.dropdown').addClass('hidden');
		if(this_a.next('span[class*="icon-caret"]').length === 0){
			this_a.after('<span class="icon-caret-down icon-large"></span>');
			this_a.next('span').on('click', function() {
				jQuery(this).toggleClass('icon-caret-down icon-caret-up').next('ul.dropdown').toggleClass('hidden');
			});
		}
		if (this_a.hasClass('active') === true) {
			//console.log(this_a, this_a.next());
			this_a.next().trigger('click');
		}
	});
}

// add the active class into our menus. This is assuming the structure of the /global/r/html-includes/nav-*.html
// It's a recursive function. Call it on the top level array of anchors, like this:
/* 
jQuery('#level2-nav-container a).each(function() {
	add_active_class(jQuery(this));
});
*/
function add_active_class(anchr) {
	
	// add an array of 'a' tags.
	// Grab the hostname and the pathname so that we can match up with subdomains.
	
	var this_page = [window.location.hostname],
		this_a = jQuery(anchr),
		this_href = [this_a[0].hostname],
		this_active = true;
		
		this_page.push.apply(this_page, window.location.pathname.replace(/^\/|\/jQuery/g, '').split('/'));
		this_href.push.apply(this_href,this_a[0].pathname.replace(/^\/|\/jQuery/g, '').split('/'));
				
	// Next check each A's href for whether its path matches, and whether its length matches.
	// This is tricky because we need to know whether the last this_page array element is a page name,
	// and if it is, whether it's an index page. 
	// If so, we need to match it with an anchor tag that may or may not have that index page spelled out.
	// So, to make it easier, just pop index pages off, and then do the same for the anchor href.
	if ( this_page[this_page.length-1].indexOf("index") != -1 || this_page[this_page.length-1] === "") {
		this_page.pop();
	}
	if (this_href[this_href.length-1].indexOf("index") != -1 || this_href[this_href.length-1] ===  "") {
		this_href.pop();
	}
	
	// console.log("this_page", this_page);
	// console.log(this_a, this_href);
	
	// We need to both check whether parent menu items match, as well as the page itself matches.
	// Do this by going through the href by its length and match each array element.
	// If it's a short link, it will match the page's elements
	// If it's a long link, it will stop matching against short page elements.
	for(var i = 0; i<this_href.length; i++) {
		if(this_href[i] !== this_page[i]) {
			this_active = false;
			break;
		}
	}
	if (this_active === true) {
		// console.log("active: ", this_a);
		this_a.addClass("active");
	}
}

// validation for pagination. NOT AJAX. Because I can't figure that out right now.
// this was used in collection pages but now... may not be?
// This should be examined when Collection pages get redesigned, as I think JP and Will quit using it
// when Daniel rebuilt the search pages for Collection.
jQuery(function() {
	jQuery('.pagination-goto').find('form[method="GET"]').on('submit', function(e) {
		var pTotal = parseInt( jQuery(this).closest('.pagination-goto').find('.pager-top-total').text() );
		var pEntered = parseInt( jQuery(this).find('.pager-input').val() );
		if (pEntered > pTotal) {
			jQuery(this).closest('li').addClass('error');
			return false;
		}
	});
});

// This is for the little Collection Search slidey thing that appears only in collection pages.
// Kind of a cool concept; a collection only context search in their pages.
// Probably should have been moved into collection js. sigh.
// Hehehe funny to see JP's early javascript work.
jQuery(function() {
  // Collections Search functions
  var searchVis = 0;

  // get screen width, set the width of the search input box.
  // 36 is the width of the leftmost search icon. 
  // 156 is the width of the elements to the right of the input box.
  var srcWidth;
  var searchWidth;
  var inputWidth;
  var searchCollapseWidth = jQuery('.l2-search-collapse').outerWidth();
  //console.log("searchCollapseWidth: " + searchCollapseWidth);
  var searchLabelCollectionsW = jQuery('#search-col-label').outerWidth();
  var searchLabelVideosW = jQuery('#search-vid-label').outerWidth();
  var labelWidth = jQuery('#label-width').outerWidth();
  var searchIconWidth = jQuery('.l2-search-icon').outerWidth();
  var rightSide = searchCollapseWidth + searchLabelVideosW + searchLabelCollectionsW + searchIconWidth;
  //console.log("rightSide: " + rightSide);

  var searchIconWidth = 45;
  // var rightOfInputBox = 153;
  // var rightOfInputBox = 297;
  var rightOfInputBox = rightSide -5;
  //console.log("rightOfInputBox: " + rightOfInputBox);

  //console.log('computed right: ' + rightSide);
  // rightSide = searchCollapseWidth + labelWidth + searchIconWidth;
  // console.log('computed right: ' + rightSide);
  //console.log('manual right: ' + rightOfInputBox);

  function setSearchWidths() {
    srcWidth = jQuery('#wrapper').width();
    // console.log("srcWidth: " + srcWidth);
    searchWidth = srcWidth - searchIconWidth;
    // console.log("searchWidth: " + searchWidth);
    inputWidth = searchWidth - rightOfInputBox;
    // console.log("inputWidth: " + inputWidth);
    jQuery('.l2-search-input').width(inputWidth);
  }
  setSearchWidths();

  // set the search bar to 0 width
  // ios fix for search bar
  var baseSearchWidth;
  if ( jQuery('html').hasClass('touch') ) {
    baseSearchWidth = "1px";
  } else {
    baseSearchWidth = "0px";
  }
  jQuery('.l2-search-sub').width(baseSearchWidth);


  // function to hide the search bar
  function hideSearch() {
    // console.log("hideSearch fired");
    jQuery('.l2-search-text').toggle();
    // jQuery('#l2-search').css('width', 'auto');
    jQuery('.l2-search-sub').animate(
        {
            width: baseSearchWidth
        }, 200, function() {
          jQuery('.l2-search-icon, .l2-search-text').toggleClass("toggled");
          
        }
    );
    searchVis = (searchVis + 1) % 2;
    //console.log("searchVis: " + searchVis);
  }



  // function to show the search bar
  function showSearch() {
    // console.log("showSearch fired");
    setSearchWidths();
    // console.log(searchWidth);
    jQuery('.l2-search-text').toggle();
    jQuery('.l2-search-sub').animate(
        {
            width: searchWidth
        }, 400, function() {
          jQuery('#l2-search').css('width', srcWidth);
        }
    ).queue('fx');
    
    jQuery('.l2-search-icon, .l2-search-text').toggleClass("toggled");
    searchVis = (searchVis + 1) % 2;
    setTimeout(function() {
      jQuery('.l2-search-input').focus();
    }, 500);
    // 
    
    // console.log("searchVis: " + searchVis);
  }



  // link the hideSearch() function to the collapse button
  jQuery('.l2-search-collapse').click(function() {
          hideSearch();
  });

  // link the showSearch() function to the search icon and text
  jQuery('.l2-search-icon, .l2-search-text').click(function() {
    if(!jQuery('.l2-search-icon, .l2-search-text').hasClass("toggled")) {
      showSearch();
    }
  });

  // functions to hide the search on focus-out
  jQuery(document).click(function() {
    // console.log("Clicked outside.");
    if(searchVis === 1) {
      hideSearch();
    }
  });
  jQuery('#l2-search').click(function(event) {
    // console.log('clicked inside');
    event.stopPropagation();
  });
  jQuery(window).resize(function() {
    if(searchVis === 1) {
      hideSearch();
      // console.log("Done");
    }
  });
});

// set up an object around the zoom hash for applyZoomHash()
// This is primarily for openSeadragon, to be able to allow for bookmarking specific zoomed areas in a zoom image
// Since zoom images are used all over the site, this shouldn't be in Collection.
function getZoomHash() {
	if (jQuery.getUrlVar('dz') != undefined) {
		var h = new Object();
		var i = jQuery.getUrlVar('dz').split(',');
		//console.log(i);
		h['x'] = parseFloat(i[0]);
		h['y'] = parseFloat(i[1]);
		h['z'] = parseFloat(i[2]);
		return h;
	}
}
// Apply a hash by grabbing the query string for the zoom coordinates and forcing seadragon to zoom to those coordinates
function applyZoomHash(args) {
	args = (typeof args == 'undefined') ? {} : args;
	args.timer = (typeof args.timer == 'undefined') ? 300 : args.timer;
	args.zoom = (typeof args.zoom == 'undefined') ? zoomViewer : args.zoom;
	args.coords = (typeof args.coords == 'undefined') ? false : args.coords;

	if (jQuery.getUrlVar('dz') !== undefined) {
		var zp = getZoomHash();
		setTimeout( function() {
			args.zoom.viewport.panTo(new OpenSeadragon.Point(zp['x'],zp['y']), true).zoomTo(zp['z']);
		}, args.timer);
	} else if (args.coords !== false) {
		setTimeout( function() {
			args.zoom.viewport.panTo(new OpenSeadragon.Point(args.coords['x'],args.coords['y']), true).zoomTo(args.coords['z']);
		}, args.timer);
	} else {
		setTimeout( function() {
			args.zoom.viewport.goHome();
		}, args.timer);
	}
}
// update the zoom cordinates while a user is using the zoom object, so they can bookmark it
function updateZoomCoordUrl(args) {
	args = (typeof args == 'undefined') ? {} : args;
	args.zoomObject  = (typeof args.zoomObject == 'undefined') ? zoomViewer : args.zoomObject;
	args.urlParam  = (typeof args.urlParam == 'undefined') ? 'dz' : args.urlParam;
	
	var coords = args.zoomObject.viewport.getCenter(true)['x'].toFixed(4) + "," + args.zoomObject.viewport.getCenter(true)['y'].toFixed(4) + "," + args.zoomObject.viewport.getZoom(true).toFixed(2);
	if (ie8() || ie9() ) {
		ie_draw_deep_link(args.urlParam, coords);
	} else {
		updateURL(window.document.title, updateURLParameter(window.location.href, args.urlParam, coords));
	}	
}
// drawing a deep link for IE since we can't alter query strings in old IE. This eventually should be phased out.
// ONLY for collection at this point.
// That is, if anyone can convince anyone to dump IE9 support.
function ie_draw_deep_link(param, val) {
	var url = [location.protocol, '//', location.host, location.pathname].join('') + '?objectid=' + jQuery.getUrlVar('objectid');
	if ( jQuery('#ie-share-link').length > 0) {
    	jQuery('#ie-share-link').remove();
	}
	if (val !== '') {
		url += "&" + param + "=" + val;
	}
	//console.log(url);
    jQuery('#object-primary-image').before('<p id="ie-share-link"><strong id="ie-share-label" class="anchor">Link to this view</strong>: <span id="ie-share-url">'+ url +'</span></p>');
    jQuery("#ie-share-link").click(function() {
		selectText('ie-share-url');
	});
}
// related to above. This stuff is currently really only in Collection, and only for IE9.
function clear_ie9_placeholder() {
	if (ie9() === true) {
		jQuery('input[type="text"]').each(function() {
			if (jQuery(this).val() === jQuery(this).attr('placeholder')) {
				jQuery(this).val('');
			}
		});
	}
}


// filtered search, checkboxes, etc.
// active terms are checked boxes in the filter list
var active_terms = Array();
// Need to run through checkboxes on browsers that remember checked items and add terms to search box.
// This is used in lots of places; foundation grants search is one. Collection search I think as well.
function process_search_checkboxes(args) {
	args = (typeof args === 'undefined') ? {} : args;
	args.filterList = (typeof args.filterList === 'undefined') ? '.filter-list' : args.filterList;
	args.triggerFunction = (typeof args.triggerFunction === 'undefined') ? false : args.triggerFunction;
	//Temporarily set up form until search page gets updated
	args.targetForm = (typeof args.targetForm === 'undefined') ? '#cs1' : args.targetForm;
	jQuery(args.filterList).find("input").each(function() {
		if (active_terms.length > 0) {
			jQuery(this).prop('checked',false);
			for(var x = 0; x < active_terms.length; x++) {
			    var y = active_terms[x];
		        var this_term = jQuery(this).attr('id');
		        if (y == this_term) {
		            jQuery(this).prop('checked',true);
		            prep_search_checkbox(jQuery(this));
		        }
			}
		} else {
			prep_search_checkbox(jQuery(this));
		}
		jQuery(this).on('change',function(ev) {
			prep_search_checkbox(jQuery(this));
			clear_ie9_placeholder();
			if (args.triggerFunction !== false) args.triggerFunction(this);
		});
	});
}

// run through a filter list and add values to a hidden input
// This was done in early collection search.
// In foundation search, I wound up using the query string to check what filters and parameters were set.
function get_search_parameters(args) {
	args = (typeof args === 'undefined') ? {} : args;
	args.filterList = (typeof args.filterList === 'undefined') ? jQuery('.filter-list') : jQuery(args.filterList);
	args.filterStore = (typeof args.filterStore === 'undefined') ? jQuery("#filter-store") : jQuery(args.filterStore);
	args.filterType = (typeof args.filterType === 'undefined') ? "checkbox" : args.filterType;
	//console.log(args.filterStore)
	var input_string = (function() {
		switch(args.filterType) {
			case "checkbox":
				return "input[type='checkbox']:checked";

				break;
			case "number":
			case "text":
			case "slider":
				return "input";
				break;
		}
	})();
	//console.log(input_string);
	args.filterStore.val(args.filterList.find(input_string).map(function() { return this.value }).get().join('##'));
	// console.log(args.filterStore.val());
	return true;
}

// set up the search input area, with the filters listed below a search input
// this creates the little clickable buttons that relate to the checkboxes in the filter list.
// foundation grants, and collections use this.
function prep_search_checkbox( el ) {
	var this_term = el.attr('id');
	var this_term_label = (el.next().next().hasClass('filter-name') === true) ? el.next().next().text() /* + " ("+el.parent().prev('.filter-count').text() +")" */ : el.parent('label').text();
	var this_term_cat = (el.parents('section').find('span.filter-type-name').length > 0) ? el.parents('section').find('.filter-type-name').text() : el.parents('section').find('h5').text();
	var search_term_cat = "";
	if (this_term_cat !== "") {
		search_term_cat = "<small>"+this_term_cat+"</small>";
	}
	if (el.is(':checked')) {
		// show 'clear tags'
		if (!jQuery("dl#search-terms").is(":visible")) {
			jQuery("dl#search-terms").show();
		}
		
		//pop open filter box
		if (el.closest('section').parent().hasClass('accordion') === true && !el.closest('section').hasClass('active')) {
			el.closest('section').children('h5').trigger('click');
		}
		
		// append search term with close button.
		jQuery("dl#search-terms").append('<dd id="term-'+this_term+'">'+search_term_cat+'<span class="icon-stack clear-item hide-for-print"><span class="icon-base icon-large icon-light icon-circle"></span><span class="icon-remove-sign icon-large icon-muted"></span></span><span>'+this_term_label+'</span></dd>').find("dd#term-"+this_term).termRemover();
	} else {
		jQuery("dl#search-terms").find("#term-"+this_term).remove();
		if (jQuery("dl#search-terms dd").length === 0) {
			jQuery("dl#search-terms").hide();
		}
	}
}

// This is a function to move stuff around on the page on resize so that we don't have to have two copies of stuff,
// one for small and medium, one for large and xlarge, etc.
// Basically, you set up an args object with a target and a source, and then you set up which sizes you want the element to move on.
// The function then creates a little hidden placeholder HR with a unique ID, and places it before the element to be moved "sourceElement"
// It then moves the source to right after the target element, "targetElement"
// When the browser size triggers a change back, then the function finds that hidden hr and inserts it back after it,
// then removes the hr.
// Used in the footer for the mobile menu shuffle, and on search pages when search UI moves from the top in large/medium
// to the bottom in small.
function move_element_on_resize(args) {
	var pid = getUniqueID();
    var placeholder = '<hr id="'+pid+'" style="height:0;margin:0;padding:0;display:inline;background:transparent;border:0;">';
	var this_pid = '#'+pid;
	return function() {
		args = (typeof args === 'undefined') ? {} : args;
		args.sourceElement = (typeof args.sourceElement === 'undefined') ? alert("Error: move_element_on_resize source undefined") : jQuery(args.sourceElement);
		args.targetElement = (typeof args.targetElement === 'undefined') ? alert("Error: move_element_on_resize target undefined") : jQuery(args.targetElement);
		// console.log(args);
		// for now, only using insertAfter. Will work around this if we ever need to.
		//args.placementMethod = (typeof args.placementMethod === 'undefined') ? 'insertAfter' : args.placementMethod;
		args.small = (typeof args.small == 'undefined') ? false : args.small;
	    args.medium = (typeof args.medium == 'undefined') ? false : args.medium;
	    args.large = (typeof args.large == 'undefined') ? false : args.large;
	    args.xlarge = (typeof args.xlarge == 'undefined') ? false : args.xlarge;
	    
		
	    function move_to_new_spot() {
		    if (jQuery(this_pid).length === 0) {
	            args.sourceElement.before(placeholder);
	            args.sourceElement.insertAfter(args.targetElement);
			}
	    }
	    function return_to_old_spot() {
		    if (jQuery(this_pid).length > 0) {
	            args.sourceElement.insertAfter(jQuery(this_pid));
	            jQuery(this_pid).remove();
	        }
	    }
	    function move_element() {
	        if (args.small == true && jQuery('html').hasClass('small') === true) {
	            // console.log("in small, and move for small true");
	            move_to_new_spot();
	        } else if (args.small == false && jQuery('html').hasClass('small') === true ) {
	            // console.log("in small, and move for small false");
	            return_to_old_spot();
	        }
	        
	        if (args.medium == true && jQuery('html').hasClass('medium')==true) {
	            // console.log("in medium, move for medium true");
	            move_to_new_spot();
	        } else if (args.medium == false && jQuery('html').hasClass('medium') == true) {
	            // console.log("in medium, move for med is false");
	            return_to_old_spot();
	        }
	        
	        if (args.large == true && jQuery('html').hasClass('large') === true) {
	            // console.log("in large, move for large is true");
	            move_to_new_spot();
	        } else if (args.large == false && jQuery('html').hasClass('large') === true) {
	            // console.log("in large, move for large is false");
	            return_to_old_spot();
	        }
	        
	        if (args.xlarge == true && jQuery('html').hasClass('xlarge') === true) {
	            // console.log("in xlarge, move is true");
	            move_to_new_spot();
	        } else if (args.xlarge == false && jQuery('html').hasClass('xlarge') === true) {
	            // console.log("in xlarge, move is false");
	            return_to_old_spot();
	        }
	    }
	    move_element();
	}
}

// Change languages from utilities.
// This is Visit-centric. At time of authoring, we had english, mainland chinese and spanish.
// IF we wind up needing this in other places, AND our language set is limited,
// consider shifting the language array out of this function and passing it in as a parameter.
// Then store the language array in the section that needs it defined. I should have done that. Sigh.
function language_choice_init() {
	// First, create a language array of currently offered languages. 
	// (this is the part that could get moved out and passed in).
	var l_a = [
		'en',
		'zh-cn',
		'es'
	],
	p_a = window.location.pathname.slice(1);
	// set up an array out of the current window's path.
	// This will allow us to know what language is currently set.
	p_a = p_a.split('/');
	
	// check path against language array to actually see which is set.
	// will return the element in the array that matches.
	var cp = (function() {
		// So... we're looping through the language array defined above,
		// and checking to see if path array element 0 matches anything inside it.
		// "But why, Will?" Because we don't actually set English up in the path,
		// and we need to know if it's en.
		for (i=0; i<l_a.length; i++) {
			//console.log("p_a[0]",p_a[0]);
			//console.log("l_a[i]", l_a[i]);
			if (p_a[0] === l_a[i]) {
				return l_a[i];
			}
		}
		// if nothing returns, then it's en
		// update p_a and return l_a[0]
		p_a.unshift(l_a[0]);
		return l_a[0];
	})();
	//console.log("p_a:", p_a);
	//console.log("cp:",cp);
	
	jQuery('#language-select li[data-getty-lang="'+cp+'"]').addClass('active');
	
	// OK, had to make sure that any click action was switched off.
	jQuery('#language-select li').off('click');
	
	// and now set the on click on the language-select LI.
	// Note I switched this to an 'on' so that if dynamic LIs are added they get their click event.
	jQuery('#language-select').on('click', 'li',function() {
		var tl = jQuery(this).attr('data-getty-lang'),
			np = '';
			
		for (i=0; i<p_a.length; i++) {
			// Special case if it's english, as path doesn't include /en/
			if (i === 0) {
				np+= (tl === 'en') ? '' : '/'+tl;
				// if in english, lp_a[0] is /visit/
			} else {
				np += '/' + p_a[i];
			}
		}
		//console.log(np);
		window.location.href=np;
	});
}

/*
//open seadragon stuff.
// collection version moved into object page
// exhibition version moving into exhibition js
jQuery(function() {
	if (typeof(OpenSeadragon) === 'function' && typeof(zoomViewer) !== 'undefined') {
	    //console.log("OSd exists. define strings, do other stuff");
	    //Redefine text strings
	    OpenSeadragon.setString("Tooltips.FullPage", "Toggle full page");
	    OpenSeadragon.setString("Tooltips.Home", "Reset image");
	    OpenSeadragon.setString("Tooltips.ZoomIn", "Zoom in");
	    OpenSeadragon.setString("Tooltips.ZoomOut", "Zoom out");
	    OpenSeadragon.setString("Tooltips.NextPage", "Next page");
	    OpenSeadragon.setString("Tooltips.PreviousPage", "Previous page");
		
		zoomViewer.addHandler('animation-finish', function() {
			var gbx = zoomViewer.viewport.getBounds()['x'].toFixed(4);
			var gby = zoomViewer.viewport.getBounds()['y'].toFixed(4);
			var ghbx = zoomViewer.viewport.getHomeBounds()['x'].toFixed(4);
			var ghby = zoomViewer.viewport.getBounds()['y'].toFixed(4);
			var gz = zoomViewer.viewport.getZoom().toFixed(2);
			var ghz = zoomViewer.viewport.getHomeZoom().toFixed(2);
			
			//console.log(gbx + ":" +ghbx+ ", " + gby + ":" +ghby + "," + gz + ":" + ghz);
			if (zoomViewer.isVisible() == true) {
				//console.log("ZoomViewer registering visible");
				if ( ( gbx == ghbx && gby == ghby && gz == ghz)) {
					//console.log("home bound matches current bound");
					if (ie8() || ie9() ) {
						ie_draw_deep_link('dz', '');
						//console.log("animation finish, ie");
					} else {
						updateURL(window.document.title, updateURLParameter(window.location.href, 'dz', ''));
					}
				} else {
					//console.log("animation finish, ie, else statement");
					updateZoomCoordUrl();
				}
			}
		});
		
		// toggle the icon-contract for fullscreen.
		zoomViewer.addHandler('pre-full-screen', function() {
			// console.log("full screen, should toggleClass the expand");
			jQuery('#zoom-full-screen > span').toggleClass('icon-expand icon-contract');
			zoomViewer.removeAllHandlers('animation-finish');
		});
		
		if (ie8() || ie9() ) {
			zoomViewer.addHandler('full-page', function() {
				// console.log("full page, should toggleClass the expand");
				jQuery('#zoom-full-screen > span').toggleClass('icon-expand icon-contract');
			});
		}
		
		zoomViewer.addHandler('full-screen', function() {
			if (zoomViewer.isFullPage() === false) {
				zoomViewer.addHandler('animation-finish', function() {
					updateZoomCoordUrl();
				});
			}
		});
		
		applyZoomHash({timer: 300});
		
		var sdww = jQuery(window).width();
        jQuery(window).resize(function() {
        	if (sdww != jQuery(window).width()) {
				waitForFinalEvent(function() {
					applyZoomHash({	timer: 0 });
					//console.log('openSeaDragon: Wait complete');
				}, 300, "timer_zoomViewer");
			}
		});
	}
});
*/