function _DebugTrace(message)
{
    var traceConsole = $('TraceConsole');
    if (traceConsole != null)
    {
        var debugPanel = getParent(getParent(traceConsole));
        if (debugPanel.style.display == 'none')
            debugPanel.style.display = 'block';
        Sys.Debug.trace(message);
    }
}
function _DebugTraceDump(control, message)
{
    var traceConsole = $('TraceConsole');
    if (traceConsole != null)
    {
        var debugPanel = getParent(getParent(traceConsole));
        if (debugPanel.style.display == 'none')
            debugPanel.style.display = 'block';
        Sys.Debug.traceDump(control, message);
    }
}
function _DebugFail(message)
{
    Sys.Debug.fail(message);
}

//###########################################################
// Header functions
//#############################################################

function __Document_Head_Init(noCookiesUrl, checkBrowserMessage, disableContextMenu)
{
    if (!__CookiesEnabled())
        window.location.href = noCookiesUrl;

    if (checkBrowserMessage != 0)
    { alert(checkBrowserMessage); }

    __CloseDisposableWindow();

    // Only disable the context menu in IE7 (basically imis desktop)
    if (disableContextMenu) {
        if (typeof jQuery == "undefined") { // if no jQuery, disable anyway
            document.oncontextmenu = __DisableContextMenu;
        }
        else {
            if (browser.isIE && browser.version == 7)
                document.oncontextmenu = __DisableContextMenu;        
        }
    }
}

function __CloseDisposableWindow()
{
    if (__GetCookieValue("Asi.Web.Browser.DisposableWindow.Loaded") == "true")
    {
        var disposableWindow = window.open("", "Asi_Web_Browser_DisposableWindow", "width=1,height=1,top=9999,left=9999,resizable=no,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no");
        disposableWindow.close();
        document.cookie = "Asi.Web.Browser.DisposableWindow.Loaded=false;path=/";
    }
}

function __CookiesEnabled()
{
    if (__GetCookieValue("Asi.Web.Browser.CookiesEnabled") != "true")
    {
        document.cookie = "Asi.Web.Browser.CookiesEnabled=true;path=/";
        if (__GetCookieValue("Asi.Web.Browser.CookiesEnabled") != "true")
            return false;
    }
    return true;
}

function __GetCookieValue(cookieName)
{
    if (document.cookie != null)
    {
        var startPos = document.cookie.indexOf(cookieName + "=");
        if (startPos < 0)
            return null;
        startPos += cookieName.length + 1;
        var endPos = document.cookie.indexOf(";", startPos);
        if (endPos == -1)
            endPos = document.cookie.length;
        return unescape(document.cookie.substring(startPos, endPos));
    }
    return null;
}

function __WindowOnLoad()
{
    var ic = gWindowOnLoad.length;
    for (var i = 1; i < ic; i++)
    {
        if (gWindowOnLoad[i] && gWindowOnLoad[i] != __WindowOnLoad)
        {
            gWindowOnLoad[i]();
        }
    }
}
function SetDocumentTitle(title)
{
    gDocumentTitle = title;
}

function CheckCommit(customMessage)
{
    if (gPostBackFormObject != null)
    {
        if (__NeedCommit())
        {
            var confirmMessage = customMessage;
            if (confirmMessage == null || confirmMessage == "")
            {
                confirmMessage = gDefaultConfirmMessage;
            }
            return confirm(confirmMessage);
        }
    }
    return true;
}

function __DisableContextMenu(sender, args) {
    var e = sender ? sender.target.tagName : event.srcElement.tagName;
    return (e && (e.toUpperCase() == "INPUT" || e.toUpperCase() == "TEXTAREA"));
}

// ###########################################################
// Collection of Utility JavaScript functions compiled by ASI
// ###########################################################

//
// Client-side version of Asi.Aid.CollapsedSimpleName(). Strips name of whitespace and special characters,
// and does camel casing. This method must be kept in sync with the server version.
//
function CollapsedSimpleName(value) {
    var space = ' ';
    var underscore = '_';

    if (value == null) return null;
    value = value.replace(/^\s+|\s+$/g, ''); // trims the value
    if (value.length == 0) return '';

    var sb = '';
    var lastChar = space;    
    for (var x = 0, xc = value.length; x < xc; x++) {
        if (IsLetterOrDigit(value.charAt(x)) || value.charAt(x) == underscore) {
            if (IsLetterOrDigit(lastChar))
                sb = sb + value.charAt(x);
            else {
                // If the first character is a digit, make valid by adding a character first
                if (sb.length == 0 && IsDigit(value.charAt(x)))
                    sb = sb + 'N';
                sb = sb + value.charAt(x).toUpperCase();
            }
        }
        lastChar = value.charAt(x);
    }
    return sb;
}

function IsLetterOrDigit(value) {
    var regEx = /[a-zA-Z0-9]/;
    if (value.match(regEx) == null)
        return false;
    return true;
}

function IsDigit(value) {
    var regEx = /[0-9]/;
    if (value.match(regEx) == null)
        return false;
    return true;
}

function IsEmail(value) {
    // regex taken from http://www.regular-expressions.info/email.html
    var regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (value.match(regEx) == null)
        return false;
    return true;
}

//
// Adds event to window.onload without overwriting currently assigned onload functions.
//
function addLoadEvent(loadFunc)
{
    if (loadFunc)
    {
        var oldonload = window.onload;
        if (typeof window.onload != 'function')
        {
            window.onload = loadFunc;
        }
        else
        {
            window.onload = function()
            {
                if (typeof oldonload == 'function') oldonload();
                loadFunc();
            }
        }
    }
}

// Add RadControl related load events
//
function addAjaxLoadEvent(loadFunc)
{
    function f() { loadFunc(); Sys.Application.remove_load(f); };
    Sys.Application.add_load(f);
}

//
// Adds event to window.onresize without overwriting currently assigned onresize functions.
//
function addResizeEvent(resizeFunc, resizeControl)
{
    if (resizeControl == null)
        resizeControl = window;

    $addHandler(resizeControl, 'resize', resizeFunc);

    //	var oldonresize = resizeControl.onresize;
    //	if (typeof resizeWin.onresize != 'function'){
    //resizeControl.onresize = resizeFunc;
    //	} else {
    //		resizeControl.onresize = function(){
    //		oldonresize();
    //		resizeFunc();
    //		}
    //	}
}
var resizeFunctionNames = new Array();
//
// Adds a function name to a collection of function names that should be executed
// when the content is resized (window resize, or page content resized).
//
function addContentResizeEvent(resizeFunctionName)
{
    resizeFunctionNames.push(resizeFunctionName);
}
//
// Call this function after the main content area has been resized.
//
function contentResized(contentWidth, contentHeight)
{
    for (var i = 0; i < resizeFunctionNames.length; i++)
    {
        var evalText = resizeFunctionNames[i] + '(' + contentWidth + ',' + contentHeight + ')';
        eval(evalText);
    }
}
//
// nextObject and previousObject perform exactly the same function as nextSibling and previousSibling, 
// but will only return the next/previous HTML element, ignoring text nodes altogether
//
function getNextObject(n)
{
    do n = n.nextSibling;
    while (n && n.nodeType != 1);
    return n;
}
function getPreviousObject(p)
{
    do p = p.previousSibling;
    while (p && p.nodeType != 1);
    return p;
}

function cancelSubmit()
{
    return CancelEvent();
}
//
// Browser-independent way of cancelling the last event.
// Example:
//  <button onclick="if (!confirm('Do Something?')) return CancelEvent(); else doSomething();" />
//
function CancelEvent(e)
{
    if (!e)
    {
        e = window.event;
    }

    if (e != null)
        e.returnValue = false;
    return false;
}
// I can never remember the casing for this function, so this makes it not matter.
function cancelEvent()
{
    return CancelEvent();
}
//
// Browser-independent function for cancelling event
// propagation (event bubbling).
//
function CancelEventPropagation(e)
{
    if (!e)
    {
        e = window.event;
    }
    e.cancelBubble = true;

    if (e.stopPropagation)
        e.stopPropagation();
}
//
// Browser-independent method for getting the last event source object
//
function eventSource(e)
{
    if (window.event)
        return window.event.srcElement;

    return e.target;
}
//
// Get the last key entered by user
//
function KeyStroke(e)
{
    if (window.event)
    {
        return e.keyCode;
    }
    else
    {
        return e.which;
    }
}
//
// Convenience function for extracting a number from a given variable (presumably of
// some other type, like string)
//
function ExtractNumber(value)
{
    var n = parseInt(value);
    return n == null || isNaN(n) ? 0 : n;
}
//
// Convenience function for saving lots of typing, instead of typing 
// document.getElementById() all the time.
//
function $(id)
{
    return document.getElementById(id);
}
//
// Given any object within a form, this function will find the containing form and submit it
//
function submitForm(object)
{
    if (object && object != null)
        form = findAncestor(object, "FORM");
    else
        form = window.template;

    if (form != null)
        form.submit();
}
// Given an element, return its parent in a way that both IE6 and actual standards-compliant browsers both support.
function getParent(element)
{
    return element.parentNode || element.parentElement;
}
if (!window.Node) var Node =
    {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    }
//
// Given an object and a type of ancestor to find, locates the first ancestor of the given object that is of the specified type.
// If none is found, null is returned
//
function findAncestor(object, type)
{
    oParent = getParent(object);
    while (oParent != null)
    {
        if (oParent.tagName.toLowerCase() == type.toLowerCase())
            return oParent;
        oParent = getParent(oParent);
    }
    return null;
}
function trim(str, chars)
{
    return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function rtrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
} //
// Browser-independent function for returning the height of the current page.
//
function livePageHeight()
{
    if (window.innerHeight && window.scrollMaxY && BrowserDetect.version < 3) // Firefox 2
    {
        return window.innerHeight + window.scrollMaxY;

    }
    else // works in Explorer 6, 7 Strict, Mozilla, Safari and FireFox 3
    {
        return document.body.offsetHeight + document.body.offsetTop;
    }

    return null;
    //	if (window.innerHeight != null)
    //		return window.innerHeight;
    //		
    //	if (document.body.clientHeight != null)
    //		return document.body.clientHeight;
    //		
    //	return null;
}
//
// Browser-independent function for returning the width of the current page.
//
function livePageWidth()
{
    if (window.innerHeight && window.scrollMaxY) // Firefox 
    {
        return window.innerWidth + window.scrollMaxX;

    }
    else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
    {
        return document.body.offsetWidth + document.body.offsetLeft;
    }

    return null;

    //	if (window.innerWidth != null)
    //		return window.innerWidth;
    //		
    //	if (document.body.clientWidth != null)
    //		return document.body.clientWidth;
    //		
    //	return null;
}
//
// Given an object, finds its absolute and relative position on the page.
// Returns a "shape" which contains these attributes:
//  left, top, width, height, absoluteLeft, absoluteTop
//
function findAbsoluteCoords(obj)
{
    var shape = new Object();
    shape.left = obj.offsetLeft;
    shape.top = obj.offsetTop;
    shape.width = obj.clientWidth;
    shape.height = obj.clientHeight;
    shape.absoluteLeft = 0;
    shape.absoluteTop = 0;


    // figure out the absolute x,y coords by going up the ancestory
    var temp = obj;
    while (temp != null)
    {
        var tagName = temp.tagName.toUpperCase();
        if (tagName == 'BODY' || tagName == 'FORM' || tagName == 'HTML')
            break;

        shape.absoluteLeft = shape.absoluteLeft + temp.offsetLeft;
        shape.absoluteTop = shape.absoluteTop + temp.offsetTop;
        temp = temp.offsetParent;

        if (temp != null && (temp.style.position == 'absolute' || temp.style.position == 'relative'))
            break;
    }

    // if the width is 0 (i.e., unspecified) make it as wide as possible
    if (shape.width == 0)
        shape.width = livePageWidth() - shape.absoluteLeft;

    // if the height is 0 (i.e., unspecified) make it as tall as possible
    if (shape.height == 0)
        shape.height = livePageHeight() - shape.absoluteTop;

    return shape;
}
//
// Returns an array of the url parameters, with each element in the form of "param=value"
//
function GetURLParameters()
{
    var url = window.document.URL.toString();

    if (url.indexOf("?") > 0)
    {
        var parts = url.split("?");
        var paramsArray = parts[1].split("&");
        return paramsArray;
    }
    return null;
}
//
// Return the value in the URL parameter string for a given parameter name
//
function FindURLParameter(paramName)
{
    paramName = paramName.toUpperCase();
    var paramsArray = GetURLParameters();
    if (paramsArray != null)
        return FindParameterInArray(paramName, paramsArray);
    return null;
}
//
// Given an array of parm=value strings, splits the parm name from the value, looks for the paramName in the array of names
// and if found returns the param value
//
function FindParameterInArray(paramName, paramsArray)
{
    paramName = paramName.toUpperCase();
    for (i = 0; i < paramsArray.length; i++)
    {
        var sParam = paramsArray[i].split("=");
        if (sParam[0].toUpperCase() == paramName)
            return sParam[1];
    }
    return null;
}
function findPos(obj)
{
    var curleft = curtop = 0;
    if (obj.offsetParent)
    {
        do
        {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [curleft, curtop];
}

//
// Move an element directly on top of another element.  Optionally
// make it the same size or set an offset for X and Y coordinates.
//
//
// Move an element directly on top of another element.  Optionally
// make it the same size or set an offset for X and Y coordinates.
//
function Cover(bottomElement, topElement, ignoreSize, offsetX, offsetY)
{
    var location = findPos(bottomElement);
    topElement.style.position = 'absolute';

    var positionY = location[1];
    if (offsetY != null && !isNaN(offsetY))
        positionY = positionY + offsetY;

    var positionX = location[0];
    if (offsetX != null && !isNaN(offsetX))
        positionX = positionX + offsetX;

    var bottomheight = 0;
    var bottomwidth = 0;

    // Use local vars for the Bottom control size - In this case we can compare those values to actual screen size and adjast them if size greater then Screen.
    bottomheight = bottomElement.offsetHeight;
    if (screen.height < bottomheight)
        bottomheight = screen.height;
    bottomwidth = bottomElement.offsetWidth;
    if (screen.width < bottomwidth)
        bottomwidth = screen.width;


    if (!ignoreSize)
    {
        topElement.style.height = bottomheight + 'px';
        topElement.style.width = bottomwidth + 'px';
    }

    // figure out the physical area of the page the browser is currently displaying, accounting for any scrolling
    var pageLeft = GetViewportScrollPos().x;
    var pageRight = pageLeft + document.body.offsetWidth - 1;
    var pageTop = GetViewportScrollPos().y;
    var pageBottom = pageTop + document.body.offsetHeight - 1;

    /*
    var pageHeight = livePageHeight() - 30;
    var pageWidth = livePageWidth() - 30;
    */

    // Check Right/Bottom screen boundaries
    var elementHeight = topElement.offsetHeight > 0 ? topElement.offsetHeight : bottomheight;
    var elementWidth = topElement.offsetWidth > 0 ? topElement.offsetWidth : bottomwidth;
    if ((positionY + elementHeight) > pageBottom)
        positionY = pageBottom - elementHeight;
    if ((positionX + elementWidth) > pageRight)
        positionX = pageRight - elementWidth;

    // Check Top/Left screen boundaries
    if (positionX < pageLeft)
        positionX = pageLeft;
    if (positionY < pageTop)
        positionY = pageTop;

    topElement.style.top = positionY + 'px';
    topElement.style.left = positionX + 'px';

    topElement.style.zIndex = 1001; // bottomElement.style.zIndex + 1;
}
//
// Create a cookie
//
function createCookie(name, value, days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
//
// Read a cookie
//
function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
//
// Delete a cookie
//
function eraseCookie(name)
{
    createCookie(name, "", -1);
}

/** Determines if the string is a url */
function IsUrl(s, optionalSchema)
{
    var regexp = new RegExp('^(([a-z]+)://)' + (optionalSchema ? '?' : '') + '([a-z0-9\-]+|[a-z0-9][a-z0-9\-\.\_]*\.[a-z]+)(:[0-9]+)?(/.*)?$', 'i');
    return regexp.test(s);
}

// 
// Browser Detection
//
var BrowserDetect = {
    init: function()
    {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data)
    {
        for (var i = 0; i < data.length; i++)
        {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString)
            {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString)
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
		{ string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari"
		},
		{
		    prop: window.opera,
		    identity: "Opera"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{		// for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
	],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
		}
	]

};


BrowserDetect.init();

/*
Returns the x/y coordinates of an element relative to the viewport.
If an element is at x=10,y=1000, but the browser window is scrolled down by 950px, the return coords will be x=10,y=50
*/
function GetElementViewportOffset(forElement)
{

    var valueY = 0, valueX = 0, docBody = document.body;

    var element = forElement;
    do
    {
        valueY += element.offsetTop || 0;
        valueX += element.offsetLeft || 0;
        // Safari fix
        if (element.offsetParent == docBody && element.style.position && element.style.position == 'absolute') break;
    } while (element = element.offsetParent);

    element = forElement;
    do
    {
        // Opera < 9.5 sets scrollTop/Left on both HTML and BODY elements.
        // Other browsers set it only on the HTML element. The BODY element
        // can be skipped since its scrollTop/Left should always be 0.
        if (element != docBody)
        {
            valueY -= element.scrollTop || 0;
            valueX -= element.scrollLeft || 0;
        }
    } while (element = element.parentNode);

    var coords = new Object();
    coords.x = valueX;
    coords.y = valueY;

    return coords;
}


/*
Size an image to fit within specific width and height bounds.
If the image is larger than the bounds, it will be downsized maintaining its aspect ratio.
If the image is smaller than the bounds and allowUpsize=true, the image will be upsized maintaining its aspect ratio.

Params
imageElement = (ref) reference to the image element to be sized
maxWidth = (int) max allowed width in pixels or null
maxHeight = (int) max allowed height in pixels or null
allowUpsize = (bool) if the image is smaller than the bounds, then upscale it
    
maxWidth AND/OR maxHeight can be specified.
maxWidth
The image width will be set to the specified maxWidth
The height will be adjusted accordingly to maintain aspect ratio. There will be no upper bound for resulting height.
maxHeight
The image height will be set to the specified maxHeight.
The width will be adjusted accordingly to maintain aspect ratio. There will be no upper bound for resulting width.
maxWidth AND maxHeight
Based on the images aspect ratio, the relevant maximum sizing parameter will be selected i.e. either width or height.
The image will then be sized to its maximum based on that dimension i.e. either width to maxWidth or height to maxHeight.
The other dimension will be adjusted accordingly to maintain aspect ratio. 
The final result will be that both width and height fall within the bounds of maxWidth and maxHeight.
*/
function SizeImageWithinBounds(imageElement, maxWidth, maxHeight, allowUpsize) {

    // were we given some bounds
    maxWidth = parseInt(maxWidth);
    if (isNaN(maxWidth)) maxWidth = 0;
    maxHeight = parseInt(maxHeight);
    if (isNaN(maxHeight)) maxHeight = 0;
    if (maxWidth <= 0 && maxHeight <= 0) return;

    // do we have an image
    if (imageElement == null) return;
    if (!imageElement.tagName) return;
    if (imageElement.tagName.toUpperCase() != "IMG") return;
    var width = imageElement.width;
    var height = imageElement.height;
    if (width == 0 || height == 0) return;

    // determine current aspect ratio
    var aspectRatio = imageElement.width / imageElement.height;

    // figure out sizing mode
    var sizeMode = 0;       // 0(none), 1(by width), 2(by height)
    if (maxWidth > 0 && maxHeight > 0) {
        // width and height
        sizeMode = (Math.floor(maxWidth / aspectRatio) <= maxHeight) ? 1 : 2;
    }
    else {
        if (maxWidth > 0) {
            // width
            if (width > maxWidth || (width < maxWidth && allowUpsize)) sizeMode = 1;
        }
        else {
            // height
            if (height > maxHeight || (height < maxHeight && allowUpsize)) sizeMode = 2;
        }
    }
    if (sizeMode == 0) return;

    // size the image
    if (sizeMode == 1) {
        // by width
        width = maxWidth;
        height = Math.max(Math.floor(width / aspectRatio), 1);
    }
    else {
        // by height
        height = maxHeight;
        width = Math.max(Math.floor(height * aspectRatio), 1);
    }
    imageElement.width = width;
    imageElement.height = height;

}


/*
Returns the x/y scroll positions of viewport.
This refers to the browser or iFrame scrollbars, not the scrollbars of any sub elements on the page.
*/
function GetViewportScrollPos()
{

    var scrollPos = new Object();
    scrollPos.x = scrollPos.y = 0;

    if (typeof window.pageYOffset != 'undefined')
    {
        scrollPos.y = window.pageYOffset;
        scrollPos.x = window.pageXOffset;
    }
    else
        if (document.documentElement)
    {
        scrollPos.y = document.documentElement.scrollTop;
        scrollPos.x = document.documentElement.scrollLeft;
    }
    else
        if (document.body && typeof document.body.scrollTop != 'undefined')
    {
        scrollPos.y = document.body.scrollTop;
        scrollPos.x = document.body.scrollLeft;
    }

    return scrollPos;

}

function hasClass(el, className) {
    if (el !== null) {
        var re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
        return re.test(el['className']);
    }
    return false;
}

function addClass(el, className)
{
    if (this.hasClass(el, className))
        return;
    if (el !== null) {
        el['className'] = [el['className'], className].join(' ');
    }
}

function removeClass(el, className)
{
    var re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', 'g');
    if (!hasClass(el, className))
        return;
    if (el !== null) {
        var c = el['className'];
        el['className'] = c.replace(re, ' ');
        if (hasClass(el, className)) {
            removeClass(el, className);
        }
    }
}
function replaceClass(el, oldClassName, newClassName)
{
    if (oldClassName === newClassName)
        return false;
    var re = new RegExp('(?:^|\\s+)' + oldClassName + '(?:\\s+|$)', 'g');
    if (!hasClass(el, oldClassName))
    {
        addClass(el, newClassName);
        return;
    }
    el['className'] = el['className'].replace(re, ' ' + newClassName + ' ');
    if (hasClass(el, oldClassName))
    {
        replaceClass(el, oldClassName, newClassName);
    }
}

// ############################################################################
// Collection of JavaScript functions that are required throughout ASI 
// software.  These functions are different from those found in ASIUtility.js 
// in that they are only useful if used inside Asi.Webroot.
// ############################################################################

//
// A browser-independent function for determining if the user has the CTRL key
// pressed.
//
function IsCtrl(e)
{
    if (window.event) 
        return window.event.ctrlKey;
    if (e.ctrlKey)
        return e.ctrlKey;
    return (e.modifiers & Event.CONTROL_MASK == Event.CONTROL_MASK);
}
//
// A browser-independent function for determining if the user has the SHIFT key
// pressed.
//
function IsShift(e)
{
    if (window.event) 
        return window.event.shiftKey;
    if (e.shiftKey)
        return e.shiftKey;
    return (e.modifiers & Event.SHIFT_MASK == Event.SHIFT_MASK);
}
//
// Use this function when you want to pass back to the server the state
// of the user's CTRL key.  On the server-side Method you can access whether
// the CTRL key was pressed using the DisplayPageBase.IsCtrl property.
// If this function name changes you must change DisplayPageBase.CLIENTSCRIPT_SetIsCtrl
//
function SetIsCtrl(e)
{
    if ($get('__CTRLKEY') != null)
        $get('__CTRLKEY').value = IsCtrl(e);

    // TODO: should i create the hidden input element if it's not already on the Form?
}
//
// Use this function when you want to pass back to the server the state
// of the user's SHIFT key.  On the server-side Method you can access whether
// the SHIFT key was pressed using the DisplayPageBase.IsShift property.
// If this function name changes you must change DisplayPageBase.CLIENTSCRIPT_SetIsShift
//
function SetIsShift(e)
{
    if ($get('__SHIFTKEY') != null)
        $get('__SHIFTKEY').value = IsShift(e);

    // TODO: should i create the hidden input element if it's not already on the Form?
}
//
// Perform the specified event on the specifed control.  Also sets the
// requested argument into the __EVENTARGUMENT hidden input element.
// If eventName is not specified 'click' will be used by default.
//
function InitiateControlEventWithArgument(controlClientID, argument, eventName)
{
    if (eventName == null)
        eventName = 'click';

    if (argument != null && argument != '')
        $get('__EVENTARGUMENT').value = argument;

    var ajaxifiedControl = $get(controlClientID);
    if (ajaxifiedControl != null)
        eval('ajaxifiedControl.' + eventName + '()');
}
//
//
//
function InitiatePostBack(controlUniqueId, argument)
{
    __doPostBack(controlUniqueId, argument);
}
//
// To support the bug with ajax tabcontainer not persisting current
// active tab across postbacks.
//
var ignoreTabChange = false;
// TODO: Would like to do the same thing on save, in case the validation failure is in another tab.
function TabContainer_OnActiveTabChanged(sender, args)
{
    sender.get_clientStateField().value = sender.saveClientState();
    if (typeof (Page_ClientValidate) == 'function')
    {
        if (!ignoreTabChange && !Page_ClientValidate())
        {
            ShowFailedTab(sender);
        }
    }
}
function ShowProblemTab()
{
    if (typeof (Page_ClientValidate) == 'function' && !Page_IsValid)
    {
        // Find all ajax tabviews on the page.
        var tabContainers = jQuery('.ajax__tab_xp').get();
        for (var i = 0; i < tabContainers.length; ++i)
        {
            ShowFailedTab($find(tabContainers[i].id));
        }
    }
}
function ShowFailedTab(tabContainer)
{
    // Check to see if there is a validator on the current tab that failed. If so, disallow the tab change.
    for (i = 0; i < Page_Validators.length; ++i)
    {
        var val = Page_Validators[i];
        if (val.evaluationfunction(val) == false)
        {
            // Find the tab containing the invalid control.
            var tabs = tabContainer.get_tabs();

            var control = val.parentNode;
            while (control != null)
            {
                for (var i = 0; i < tabs.length; ++i)
                {
                    if (control == tabs[i]._element)
                    {
                        ignoreTabChange = true;
                        tabContainer.set_activeTab(tabs[i]);
                        ignoreTabChange = false;
                        return;
                    }
                }
                control = control.parentNode;
            }
        }
    }
}
function getElementsByClassName(classname, node)
{
    if (!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);
    return a;
}

var win = null;
function NewWindow(sURL, sName, sSize, sMode, sAppendWebsiteKey, callBackFunction, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction)
{

    // default to large
    var w = 750;
    var h = 500;
    var winName = '';

    if (sSize.toLowerCase() == 'current' || sSize.toLowerCase() == 'c') { w = window.document.body.offsetWidth - 20; h = window.document.body.offsetHeight - 20; mw = 800; mh = 600 };
    if (sSize.toLowerCase() == 'full' || sSize.toLowerCase() == 'f') { w = 900; h = 600; mw = 800; mh = 600 };
    if (sSize == '' || sSize.toLowerCase() == 'large' || sSize.toLowerCase() == 'l') { w = 750; h = 500; mw = 750; mh = 500 };
    if (sSize.toLowerCase() == 'medium' || sSize.toLowerCase() == 'm') { w = 650; h = 400; mw = 650; mh = 400 };
    if (sSize.toLowerCase() == 'small' || sSize.toLowerCase() == 's') { w = 400; h = 200; ; mw = 400; mh = 200 };
    if (sSize.toLowerCase() == 'help' || sSize.toLowerCase() == 'h') { w = 650; h = 400; mw = 650; mh = 400 };
    if (sSize.toLowerCase() == 'print' || sSize.toLowerCase() == 'p') { w = 750; h = 500; mw = 750; mh = 500 };
    if (sSize.toLowerCase() == 'flowchart' || sSize.toLowerCase() == 'l') { w = 790; h = 515; mw = 790; mh = 515 };

    if ((sAppendWebsiteKey == null || sAppendWebsiteKey) && (typeof gWebsiteKey != 'undefined' && gWebsiteKey != 'null' && sURL.indexOf('&WebsiteKey=') < 0))
        sURL += '&WebsiteKey=' + gWebsiteKey;

    if (sName.indexOf("-") >= 1)
    {
        winName = sName.substr(0, 9);
    }
    else
    {
        winName = sName;
    }
    
    //function ShowDialog_NoReturnValue(url, args, width, height, title, iconUrl, templateType, callBackFunction, windowName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, sourceObject)
    ShowDialog_NoReturnValue(sURL, null, w, h, sName, null, 'D', callBackFunction, winName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, null);
}

function RefreshBySubmit()
{
    if (gPostBackFormObject != null)
    {
        gPostBackFormObject.submit();
    }
    else
    {
        if (document.forms.length > 0)
        {
            document.forms[0].submit();
        }
        else
        {
            window.location.href = window.location.href;
        }
    }
}

function SetDefaultStyle(item)
{
    if (item.className != 'VTabSelectedStyle')
        item.className = 'VTabDefaultStyle';
}

function SetHoverStyle(item)
{
    if (item.className != 'VTabSelectedStyle')
        item.className = 'VTabHoverStyle';
}

function UpdateFormInputAndSubmit(name, val)
{
    var docForms = document.forms;
    if (docFormsLen > 0)
    {
        for (var i = 0, ic = docForms.length; i < ic; i++)
        {
            if (docForms[i].elements[name] != null)
            {
                docForms[i].elements[name].value = val;
                docForms[i].submit();
                break;
            }
        }
    }
}

function toggleElement(targetId, controlImage)
{
    target = document.getElementById(targetId);
    switch (target.style.display)
    {
        case ("block"):
            target.style.display = "none";
            controlImage.src = gWebRoot + "/AsiCommon/Images/+.gif";
            break;
        default:
            target.style.display = "block";
            controlImage.src = gWebRoot + "/AsiCommon/Images/-.gif";
            break;
    }
}

//Append a fields value into another field
function fieldAppend(selectfield, fieldId)
{
    var selval = selectfield.options[selectfield.selectedIndex].value;
    var output = document.getElementById(fieldId);
    output.count = (typeof output.count == 'undefined') ? 1 : ++output.count;
    output.value += selval + ' \n';
}

var brushState = "block";
var existingClassNames = new Array();

function surfToEditNavigationItem(key)
{
    ShowDialog_NoReturnValue(gWebRoot + "/iMIS/ContentManagement/NavigationItemProperties.aspx?iUniformKey=" + key, null, '800', '600', 'Navigation Designer', '~/AsiCommon/Images/icon_nav.gif', 'E');
    CancelEvent();
}

function surfToEditContentItem(contentRecordKey, contentItemKey, contentTypeKey, windowTitle)
{        
    ShowDialog_NoReturnValue(gWebRoot + "/iMIS/ContentManagement/ContentItemEdit.aspx?ContentTypeKey=" + contentTypeKey + "&ContentKey=" + contentRecordKey + 
    "&ContentItemKey=" + contentItemKey + "&iOperation=Edit", null, '800', '600', windowTitle, null, 'E', null, null, false, true, null, null);   
    CancelEvent();
}

function surfToEditHtmlContentItem(contentRecordKey, contentItemKey, contentTypeKey, windowTitle)
{
    ShowDialog_NoReturnValue(gWebRoot + "/iMIS/ContentManagement/ContentItemEdit.aspx?ContentTypeKey=" + contentTypeKey + "&ContentKey=" + contentRecordKey +
    "&ContentItemKey=" + contentItemKey + "&iOperation=Edit", null, '97%', '97%', windowTitle, null, 'E', null, null, false, true, null, null);
    CancelEvent();
}

function surfToEditContentRecord(key, queryStringParams)
{
    var url = gWebRoot + '/iMIS/ContentManagement/ContentDesigner.aspx?ShowSummary=false&TemplateType=E&ShowMenu=true&DialogMode=true&ShowHierarchyTree=false&Mode=EditContent&ShowAddress=false&ContentHierarchyKey=' + key;
    if (queryStringParams != null && queryStringParams.length > 0)
    {
        if (queryStringParams.substr(0, 1) == '?')
            queryStringParams = queryStringParams.substr(1);

        if (queryStringParams.substr(0, 1) != '&')        
            queryStringParams = '&' + queryStringParams;
      
        url += queryStringParams;
    }
    //ShowDialog_NoReturnValue(url, null, '95%', '95%', 'Content Designer', '~/AsiCommon/Images/icon_con.gif', 'E');
    NewWindow(url, 'Content Designer', 'current', 'nonmodal', false);

    CancelEvent();
}

setBodyCssClass(gIsEasyEditEnabled);
function setBodyCssClass(isEasyEditEnabled) {
    if (isEasyEditEnabled) {
        jQuery("Body").addClass("EasyEditOn");
    }
}

function contentRecordChangeRequest(key, queryStringParams)
{
    var url = gWebRoot + '/AsiCommon/Controls/ContentManagement/ContentDesigner/ContentChangeRequestEdit.aspx?CloseWindowOnCommit=true&PageOperation=New&ContentRecordKey=' + key;
    if (queryStringParams != null && queryStringParams.length > 0)
    {
        if (queryStringParams.substr(0, 1) == '?')
            queryStringParams = queryStringParams.substr(1);

        if (queryStringParams.substr(0, 1) != '&')
            queryStringParams = '&' + queryStringParams;

        url += queryStringParams;
    }
    ShowDialog_NoReturnValue(url, null, '600', '400', 'Content Designer', '~/AsiCommon/Images/icon_con.gif', 'E');

    CancelEvent();
}

function emailAFriend(pageTitle)
{
    var url = gWebRoot + '/iMIS/ContentManagement/EmailAFriend.aspx?PageTitle=' + pageTitle + '&PreserveStatefulBusinessContainer=true';
    ShowDialog_NoReturnValue(url, null, 600, 400, 'E-mail a friend', '~/AsiCommon/Images/icon_email.gif', 'E');

    return CancelEvent();
}

function printThisPage()
{
    window.open(gWebRoot + '/iMIS/Print.aspx');
}

function printThisPageTemplate()
{
    var url = window.location.href;
    var re = new RegExp('[?&]TemplateType=[A-Za-z]', "g");
    url = url.replace(re, "");
    if (url.indexOf("?") < 0)
        url += "?";
    else if (url.indexOf("?") != url.length - 1) // don't append '&' if the last character in the url is '?'
        url += "&";
    url += "TemplateType=P";
    window.location.href = url;
}

function showHideBrush()
{
    var links = document.getElementsByName("editlink");

    if (links == null || links.length == 0) {
        alert('There are no Screen Designer Panels to edit on this page.');
        return;
    }

    for (var i = 0; i < links.length; i++)
    {
        links[i].style.display = brushState;
        links[i].className = "";
        if (brushState == "block")
        {
            existingClassNames[i] = getParent(links[i]).className;

            getParent(links[i]).className = "PanelEditLink";
            var title = links[i].getAttribute("panelName");
            getParent(links[i]).title = title;
        }
        else
        {
            getParent(links[i]).className = existingClassNames[i];
            getParent(links[i]).title = "";
        }
    }
    if (brushState == "none")
        brushState = "block";
    else
        brushState = "none";
}

function Rollover(obj, image) {
    obj.src = image;
}

function printWindow() {
    var bV = parseInt(navigator.appVersion);
    if (bV >= 4) window.print();
}

function emailWindow() {
    alert('email window');
}

function showInfoCenter() {
    alert('InfoCenter');
}

// CDR - 11/29/2006 - window.showHelp is a standard javascript func - commenting out b/c it was killing help links
//CP 6/13/12 -modified because regular showHelp was not working except in IE, so now using a pop up for rest of browsers
function showHelpDialog(url) {
    var agent = navigator.userAgent.toLowerCase();
    var iOperatingSys = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) ? true : false;
    if (/msie/.test(agent)) {
        window.showHelp(url);
    }
    else if (iOperatingSys) {
        window.open(url, '_blank', '');
    } else {
        window.showModalDialog(url);        
    }    
}

//
// Same thing as ShowDialog except that it doesn't return the Dialog Window at the end of the function.  This is necessary
// if you want to hook up this function directly to <a href="javascript:ShowDialog(...)">.
//
function ShowDialog_NoReturnValue(url, args, width, height, title, iconUrl, templateType, callBackFunction, windowName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, sourceObject)
{
    ShowDialog(url, args, width, height, title, iconUrl, templateType, callBackFunction, windowName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, sourceObject);
}
var RadWindowInformation = new Object();
//
// Opens a modal dialog given the parameters
//
function ShowDialog(url, args, width, height, title, iconUrl, templateType, callBackFunction,
windowName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, sourceObject)
{
    if (url.indexOf('~') == 0)
        url = gWebRoot + url.substring(1);

    if (windowName == null || windowName.length == 0)
        windowName = 'GenericWindow';

    if (url.indexOf("TemplateType=") < 0)
    {
        if (templateType == null || templateType.length == 0)
            templateType = "E";
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + "TemplateType=" + templateType;
    }
    if (closeWindowOnCommit && url.indexOf("CloseWindowOnCommit") < 0)
    {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + "CloseWindowOnCommit=" + closeWindowOnCommit;
    }
    if (preserveStatefulBusinessContainer && url.indexOf("PreserveStatefulBusinessContainer") < 0)
    {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + "PreserveStatefulBusinessContainer=" + preserveStatefulBusinessContainer;
        var parentPageInstanceKey = $get('PageInstanceKey');
        if (parentPageInstanceKey != null)
            url += "&ParentPageInstanceKey=" + parentPageInstanceKey.value;
    }
    if (url.indexOf("DialogCacheParam") < 0)
    {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + "DialogCacheParam=" + Math.random();
    }
    // Indicate in the URL that this is a popup
    if (url.indexOf("IsPopup") < 0) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + "IsPopup=true";
    }

    var pageWidth = livePageWidth();
    if ((width + '').indexOf('%') > -1)
        width = pageWidth * (parseInt(width) / 100);
    else if (width > pageWidth)
        width = pageWidth;

    var pageHeight = livePageHeight();
    if ((height + '').indexOf('%') > -1)
        height = pageHeight * (parseInt(height) / 100);
    else if (height > pageHeight)
        height = pageHeight;

    RadWindowInformation.windowName = windowName;
    RadWindowInformation.url = url;
    RadWindowInformation.args = args;
    RadWindowInformation.width = width;
    RadWindowInformation.height = height;
    RadWindowInformation.title = title;
    RadWindowInformation.iconUrl = iconUrl;
    RadWindowInformation.callBackFunction = callBackFunction;
    RadWindowInformation.dialogCloseFunction = dialogCloseFunction;
    RadWindowInformation.sourceObject = sourceObject;
    RadWindowInformation.dialogWindow = null;
       
    var windowManager = GetRadWindowManager();
    if (windowManager == null)
    {
        DelaySetupRadWindow();
        return null;
    }
    var dialogWindow = windowManager.getWindowByName(windowName);
    if (dialogWindow != null && dialogWindow.IsClosed())
    {
        dialogWindow.Name = null;
        dialogWindow = null;
    }

    if (dialogWindow == null)
        dialogWindow = window.radopen(null, windowName);
    if (dialogWindow == null)
    {
        DelaySetupRadWindow();
        return null;
    }
    
    // Prevent the content designer window from allowing a resize by dragging the edge of the RadWindow 
    if (dialogWindow != null && url.indexOf('Mode=EditContent') > -1 || url.indexOf('/ContentRecordEdit.aspx?') > -1)
        dialogWindow.set_behaviors(4 + 16 + 32 + 64);

    if (dialogWindow != null && url.indexOf('/WebsiteEdit.aspx?') > -1
    || url.indexOf('/SelectTheme.aspx?') > -1) {
        height = livePageHeight() - 10;
        width = livePageWidth() - 10;
        dialogWindow.setSize(width, height);
        dialogWindow.maximize();
        dialogWindow.set_animationDuration(0);
        dialogWindow.set_behaviors(4 + 64);
        dialogWindow.set_destroyOnClose(false);
        //dialogWindow.set_visibleTitlebar(false);
        //dialogWindow.set_visibleStatusbar(false);
    }
       
    RadWindowInformation.dialogWindow = dialogWindow;
    return SetupRadWindow();
}

function DelaySetupRadWindow()
{
    // Have to delay a little bit to give the RadWindowManager time to open the window.
    addAjaxLoadEvent(SetupRadWindow);
}

function SetWindowTitle(oWindow, args)
{
    oWindow.set_title(RadWindowInformation.title);
}

Sys.EventHandlerList.prototype.removeExtraneousHandlers = function(id, keepFirst) {
    a = this._getEvent(id, true);
    b = null;
    if (a.length > 0) {
        b = a[0];
    }
    Array.clear(this._getEvent(id, true));
    if (keepFirst && b != null) {
        Array.add(this._getEvent(id, true), b);
    }
};

function SetupRadWindow()
{
    var dialogWindow = RadWindowInformation.dialogWindow;
    if (dialogWindow == null)
        dialogWindow = GetRadWindowManager().getWindowByName(RadWindowInformation.windowName);

    dialogWindow.get_events().removeExtraneousHandlers('beforeClose', false);
    dialogWindow.get_events().removeExtraneousHandlers('close', true);
    // SBI 7448 - Need to set title in page load (for Safari)
    //dialogWindow.set_title(RadWindowInformation.title);
    dialogWindow.remove_pageLoad(SetWindowTitle);
    dialogWindow.add_pageLoad(SetWindowTitle);

    // TODO: after Telerik decides to implement SetIcon we need to use it instead of 
    // this hack
    //actionWindow.SetIcon(result.IconUrl);
    //dialogWindow.ii = iconUrl;
    //dialogWindow.Ii = iconUrl;
    //ctl00_ctl02[result.WindowName].children(0).children(0).children(1).children(1).children(0).children(0).children(0).children(0).src = result.IconUrl;

    dialogWindow.Argument = RadWindowInformation.args;
    dialogWindow.dialogArguments = RadWindowInformation.args;
    if (RadWindowInformation.callBackFunction != null)
        dialogWindow.add_beforeClose(RadWindowInformation.callBackFunction);
    if (RadWindowInformation.dialogCloseFunction != null)
        dialogWindow.add_close(RadWindowInformation.dialogCloseFunction);
    dialogWindow.SourceObject = RadWindowInformation.sourceObject;

    dialogWindow.setUrl(RadWindowInformation.url);
    dialogWindow.SetVisible(true); //DT6174 - Show() moved here in order to resolve issue with display of scrollbars
    // fix; ensure the dialog never starts out larger than the browser window.
    var viewWidth = GetViewportWidth();
    var viewHeight = GetViewportHeight();
    if (RadWindowInformation.width > viewWidth) RadWindowInformation.width = viewWidth;
    if (RadWindowInformation.height > viewHeight) RadWindowInformation.height = viewHeight;
    dialogWindow.setSize(RadWindowInformation.width, RadWindowInformation.height);
    dialogWindow.set_visibleStatusbar(false);
    // Set the window icon
    var oTitle = dialogWindow.GetTitlebar();
    var oAnchor = oTitle.getElementsByTagName('a');
    oAnchor[0].style.background = "url(about:blank)";

    dialogWindow.center();

    return dialogWindow;
}

// opens a dialog window
// Parameters:
//	contentCode - the ContentCode of the content to show in the dialog.  Required.
//	modal - if true the dialog is modal, if false it is pseudo modal, meaning it can postback etc.  If not supplied, false (pseudo) is assumed
//  urlParamString - any url params to pass to the window (e.g., the server).  Should be a string like param1=value1&param2=value2 etc.
//  args - any arguments passed to the client as dialogArguments (for modal), or accessible in opener.dialogWin.args if pseudo
//	width - the width of the dialog.  If not supplied, 600 is assumed
//	height - the width of the dialog.  If not supplied, 400 is assumed
//  returnFunc -- reference to the function (on this caller) to be called when the dialog is done
//  navigationCode - If specified, this value is put into the query string.  This is to allow the IQD to
//    utilize this function.
//  title - the title to appear on the pop-up window
function CMOpenDialog(contentCode, modal, width, height, urlParamString, args, returnFunc, navigationCode, title)
{
    // contentCode is required
    if (contentCode != null)
    {
        // initialize any parameters not sent
        if (urlParamString == null)
            urlParamString = "";
        else if (urlParamString.substr(0, 1) != "&")
            urlParamString = "&" + urlParamString;
        if (width == null)
            width = 600;
        if (height == null)
            height = 400;
        if (title == null)
            title = '';

        var url = gWebRoot + "/iMIS/ContentManagement/Template.aspx?ContentCode=" + contentCode + urlParamString;
        if (typeof gWebsiteKey != 'undefined' && gWebsiteKey != 'null' && url.indexOf('&WebsiteKey=') < 0)
            url += '&WebsiteKey=' + gWebsiteKey;

        if (navigationCode != null)
            url = url + "&NavigationCode=" + navigationCode;

        ShowDialog(url, args, width, height, title, '', 'E', returnFunc);
    }
    else
        alert('contentCode is required!');
}

function GetViewportWidth()
{
    var viewportwidth;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined')
    {
        viewportwidth = window.innerWidth;
    }
    else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0)
    {
        // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        viewportwidth = document.documentElement.clientWidth;
    }
    else
    {
        // older versions of IE
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
    }

    return viewportwidth;
}

function GetViewportHeight()
{
    var viewportheight;

    if (typeof window.innerWidth != 'undefined')
    {
        viewportheight = window.innerHeight;
    }
    else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0)
    {
        viewportheight = document.documentElement.clientHeight;
    }
    else
    {
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }

    return viewportheight;
}

// One object tracks the current modal dialog opened from this window.
var dialogWin = new Object();

// Generate a pseudo modal dialog that can do postback etc. i.e., it is a real window that acts modal
// Parameters:
//    url -- URL of the page/frameset to be loaded into dialog
//    width -- pixel width of the dialog window
//    height -- pixel height of the dialog window
//    returnFunc -- reference to the function (on this page)
//                  that is to act on the data returned from the dialog
//    args -- [optional] any data you need to pass to the dialog
function ShowPseudoDialog(url, args, width, height, returnFunc)
{
    // set the window events on the parent so that trying to go back there set focus back to the dialog
    window.attachEvent('onclick', checkModal);
    window.attachEvent('onfocus', checkModal);

    // SAT - 11/9/2006 - DT18027
    // Added the following try/catch to handle the exception which occurs when the parent of the 
    // dialog is hosted in c/s.
    var newDialog = false;
    try
    {
        if (!dialogWin.win || (dialogWin.win && dialogWin.win.closed))
            newDialog = true;
    }
    catch (e)
    {
        if (e.message == 'The remote server machine does not exist or is unavailable')
            newDialog = true;
    }

    if (newDialog)
    {
        // Initialize properties of the modal dialog object.
        dialogWin.returnFunc = returnFunc;
        dialogWin.returnedValue = "";
        dialogWin.args = args;
        if (typeof (returnFunc) == "string" && returnFunc != "")
        {
            if (url.indexOf("?") < 0)
                url += "?" + "iCallbackFunction=" + returnFunc;
            else
                url += "&" + "iCallbackFunction=" + returnFunc;
        }
        dialogWin.url = url;
        dialogWin.width = width;
        dialogWin.height = height;
        // Keep name unique so Navigator doesn't overwrite an existing dialog.
        dialogWin.name = (new Date()).getSeconds().toString();
        // Assemble window attributes and center on the screen
        dialogWin.left = (screen.width - dialogWin.width) / 2;
        dialogWin.top = (screen.height - dialogWin.height) / 2;
        var attr = "left=" + dialogWin.left + ",top=" +
            dialogWin.top + ",scrollbars=yes,resizable=yes,width=" + dialogWin.width +
            ",height=" + dialogWin.height;

        // Generate the dialog and make sure it has focus.
        dialogWin.win = window.open(dialogWin.url, dialogWin.name, attr);
        dialogWin.win.focus();
    } else
    {
        dialogWin.win.focus();
    }
}

// Invoked by onFocus event handler of EVERY frame,
// return focus to dialog window if it's open.
function checkModal()
{
    setTimeout("finishChecking()", 50);
    return true;
}

function finishChecking()
{
    // try-catch required to handle exception when dialog's parent is hosted in omnis.
    try
    {
        if (dialogWin.win && !dialogWin.win.closed)
        {
            dialogWin.win.focus();
        }
    }
    catch (e)
    {
        if (e.message == 'The remote server machine does not exist or is unavailable')
            return;
    }
}

function wait()
{
    window.document.body.style.cursor = "wait";

    //disable all input type=submit,img,button objects so user doesn't
    //inadvertantly click a button while page is posting
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i].getAttribute("type") == null)
            continue;
        var type = inputs[i].getAttribute("type").toLowerCase();
        if ((type == "submit" || type == "image" || type == "button"))
            inputs[i].disabled = true;
    }
}
function waitStop()
{
    window.document.body.style.cursor = "default";

    //disable all input type=submit,img,button objects so user doesn't
    //inadvertantly click a button while page is posting
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i].getAttribute("type") == null)
            continue;
        var type = inputs[i].getAttribute("type").toLowerCase();
        if ((type == "submit" || type == "image" || type == "button"))
            inputs[i].disabled = false;
    }
}

function dropDownListNavigate(ddl)
{
    var loc = ddl.options[ddl.selectedIndex].value;
    if (loc != "")
    {
        if (loc.substr(0, 1) == '~')
        {
            loc = gWebRoot + loc.substr(1);
        }
        location.href = loc;
    }
}

// opens the BSA object browser as a pop-up allowing the user to select one or more documents or folders for return to the caller
// Parameters:
//  urlParamString - any url params to pass to the browser (see list of available arguments in object browser documentation.  
//     Should be a string like param1=value1&param2=value2 etc.
//  returnFunc -- reference to the function (on the caller) to be called when the dialog is done.  This function will receive
//     the following parameters from the browser:
//        count - the number of keys selected by the user
//        keys - a comma delimited list of the keys selected: HierarchyKeys for folders or DocumentKeys for anything else
//		  type - the DocumentTypeCode of the document selected if there is only one.  Null if more than one
//		  name - the DocumentName of the document selected if there is only one.  Null if more than one
//        executeCallbackOnClose - whether to execute returnFunc anytime the dialog is closed (true), or only when it's closed after a commit operation (false).
function OpenObjectBrowserSized(urlParamString, returnFunc, singleSelect, publishedOnly, args, width, height, executeCallbackOnClose)
{
    var url = gWebRoot + '/AsiCommon/Controls/BSA/ObjectBrowser.aspx?TemplateType=E&DialogMode=true';
    var preserveBusContainer = true;
    
    if (urlParamString != null)
    {
        var paramsArray = urlParamString.split("&");

        // we have a few defaults for the pop-up browser that differ from the browser's normal defaults. 
        // Set them unless they are already in the urlParamString
        if (FindParameterInArray("Mode", paramsArray) == null)
            urlParamString += "&Mode=SelectContent";
        if (singleSelect != null && singleSelect && FindParameterInArray("AllowMultiSelect", paramsArray) == null)
            urlParamString += "&AllowMultiSelect=false";
        if (publishedOnly != null && FindParameterInArray("PublishedOnly", paramsArray) == null)
            urlParamString += "&PublishedOnly=" + publishedOnly;
        
        if (urlParamString.substr(0, 1) != "&")
            url += "&";
        url += urlParamString;

        //check to see if stateful business container needs to be preserved
        if (FindParameterInArray("PreserveContainer", paramsArray) != null)
            preserveBusContainer = false;
    }
    else
    {
        url += "&Mode=SelectContent";
        if (singleSelect != null && singleSelect)
            url += "&AllowMultiSelect=false";
        if (publishedOnly != null)
            url += "&PublishedOnly=" + publishedOnly;
    }
    //CP 11/7/12 SBI#32199: Setting preserveStatefulBusinessContainer value to true because otherwise iparts' configs using this would break if tried to call twice in a row
    return ShowDialog(url, args, width, height, 'Document Browser', null, 'E', returnFunc, 'ObjectBrowser', false, preserveBusContainer, (executeCallbackOnClose ? returnFunc : null));
}

// opens the BSA object browser as a pop-up allowing the user to select one or more documents or folders for return to the caller
// Parameters:
//  urlParamString - any url params to pass to the browser (see list of available arguments in object browser documentation.  
//     Should be a string like param1=value1&param2=value2 etc.
//  returnFunc -- reference to the function (on the caller) to be called when the dialog is done.  This function will receive
//     the following parameters from the browser:
//        count - the number of keys selected by the user
//        keys - a comma delimited list of the keys selected: HierarchyKeys for folders or DocumentKeys for anything else
//		  type - the DocumentTypeCode of the document selected if there is only one.  Null if more than one
//		  name - the DocumentName of the document selected if there is only one.  Null if more than one
function OpenObjectBrowser(urlParamString, returnFunc, singleSelect, publishedOnly, args)
{
    return OpenObjectBrowserSized(urlParamString, returnFunc, singleSelect, publishedOnly, args, 800, 600, false);
}

function OpenContentForSaveAs(documentHierarchyKey, filename, returnFunc) {
    var url = gWebRoot + '/AsiCommon/Controls/BSA/ObjectBrowser.aspx?TypeFilter=CON,CFL&ShowMenu=false&ShowFilename=true&DialogMode=true&PublishedOnly=false&Mode=SelectContainer&AutoSizeObjectBrowser=true';

    url += "&DocumentHierarchyKey=" + documentHierarchyKey;
    url += "&Filename=" + filename;

    //function ShowDialog(url, args, width, height, title, iconUrl, templateType, callBackFunction, windowName, closeWindowOnCommit, preserveStatefulBusinessContainer, dialogCloseFunction, sourceObject)
    return ShowDialog(url, '', 800, 600, 'Content Browser', null, 'E', returnFunc, 'ObjectBrowser', false, false, null);
}
function OpenContentForEdit(contentHierarchyKey)
{
    var url = gWebRoot + '/iMIS/ContentManagement/ContentDesigner.aspx?TemplateType=E&ShowMenu=true&DialogMode=true';

    url += "&ContentHierarchyKey=" + contentHierarchyKey;

    var obWindow = radopen(url, 'ObjectBrowser');
    return obWindow;
}
function EditContentItem(hierarchyKey)
{
    OpenContentForEdit(hierarchyKey);
}
function OpenFinderAdder(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, width, height)
{
    OpenFinderAdderWithQueryFilter(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, "", width, height, "");
}
function OpenFinderAdderWithQueryFilter(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, filterValue, width, height, addTargetUrl)
{
    var url = gWebRoot + '/AsiCommon/Controls/Shared/FinderAdder/FinderAdder.aspx?DialogMode=true';

    if (documentKey != null)
        url += "&DocumentKey=" + documentKey;
    else if (documentPath != null)
        url += "&DocumentPath=" + documentPath;
    else if (atomName != null)
        url += "&AtomName=" + atomName;

    if (displayValueColumn != null && displayValueColumn.length > 0)
        url += "&DisplayValueColumn=" + displayValueColumn;
    if (keyValueColumn != null && keyValueColumn.length > 0)
        url += "&DataKeyName=" + keyValueColumn;

    if (filterValue != null && filterValue.length > 0)
        url += "&filterValue=" + filterValue;

    // we have a few defaults for the pop-up browser that differ from the browser's normal defaults. 
    // Set them unless they are already in the urlParamString
    if (singleSelect != null && singleSelect)
        url += "&AllowMultiSelect=false";
    else
        url += "&AllowMultiSelect=true&PagingEnabled=false";

    if (addTargetUrl != null && addTargetUrl.length > 0)
        url += "&AddTargetUrl=" + addTargetUrl;

    if (width == null)
        width = 800;
    if (height == null)
        height = 600;

    var windowTitle = "Find";
    if (addTargetUrl != null && addTargetUrl.length > 0) windowTitle = "Find/Add";

    return ShowDialog(url, null, width, height, windowTitle, null, 'E', returnFunc, 'ObjectBrowser', false, true);
}
function OpenPartyFinderAdder(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, width, height) {
    OpenPartyFinderAdderWithQueryFilter(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, "", width, height, false, null);
}
function OpenPartyFinderAdderWithQueryFilter(returnFunc, singleSelect, documentKey, documentPath, atomName, displayValueColumn, keyValueColumn, filterValue, width, height, addGuests, addType, addTargetShortcut) {
    var url = gWebRoot + '/AsiCommon/Controls/Shared/FinderAdder/PartyFinderAdder.aspx?DialogMode=true';

    if (documentKey != null)
        url += "&DocumentKey=" + documentKey;
    else if (documentPath != null)
        url += "&DocumentPath=" + documentPath;
    else if (atomName != null)
        url += "&AtomName=" + atomName;

    if (displayValueColumn != null && displayValueColumn.length > 0)
        url += "&DisplayValueColumn=" + displayValueColumn;
    if (keyValueColumn != null && keyValueColumn.length > 0)
        url += "&DataKeyName=" + keyValueColumn;

    if (filterValue != null && filterValue.length > 0)
        url += "&filterValue=" + filterValue;

    // we have a few defaults for the pop-up browser that differ from the browser's normal defaults. 
    // Set them unless they are already in the urlParamString
    if (singleSelect != null && singleSelect)
        url += "&AllowMultiSelect=false";
    else
        url += "&AllowMultiSelect=true&PagingEnabled=false";
   
    if (addGuests != null && addGuests == "True")
        url += "&AllowAdd=" + addGuests;

    if (addType != null && addType.length > 0)
        url += "&PartyType=" + addType;

    if (width == null)
        width = 800;
    if (height == null)
        height = 600;
    
    var windowTitle = "Find";
    if (addGuests != null && addGuests == "True") windowTitle = "Find/Add";

    if (addTargetShortcut != null && addTargetShortcut.length > 0)
        url += "&addTargetShortcut=" + addTargetShortcut;

    return ShowDialog(url, null, width, height, windowTitle, null, 'E', returnFunc, 'ObjectBrowser', false, true);
}
function OpenFileUpload(returnFunc, documentStorageKey, documentServerPath, maxFileSize, allowedTypes, enableDescriptionField)
{
    var url = gWebRoot + '/AsiCommon/Controls/Shared/FileUpload/FileUpload.aspx';
    if (documentStorageKey != null && documentStorageKey.length > 0)
        url += "?DocumentStorageKey=" + documentStorageKey;
    if (documentServerPath != null && documentServerPath.length > 0)
    {
        if (url.indexOf("?") < 0)
            url += "?DocumentServerPath=" + documentServerPath;
        else
            url += "&DocumentServerPath=" + documentServerPath;
    }
    if (maxFileSize != null && maxFileSize > 0)
    {
        if (url.indexOf("?") < 0)
            url += "?MaxFileUploadSize=" + maxFileSize;
        else
            url += "&MaxFileUploadSize=" + maxFileSize;
    }
    if (allowedTypes != null && allowedTypes.length > 0) {
        if (url.indexOf("?") < 0)
            url += "?AllowedTypes=" + allowedTypes;
        else 
            url += "&AllowedTypes=" + allowedTypes;
    }
    if (enableDescriptionField != null && enableDescriptionField.toLowerCase() == 'true') {
        if (url.indexOf("?") < 0)
            url += "?EnableDescriptionField=true";
        else
            url += "&EnableDescriptionField=true";
    }

    return ShowDialog(url, null, 450, 430, "File Upload", null, 'E', returnFunc, 'GenericWindow', false, true);
}

// opens the BSA object browser in Save mode
// Parameters:
//  urlParamString - any url params to pass to the browser (see list of available arguments in object browser documentation.  
//     Should be a string like param1=value1&param2=value2 etc.
//  returnFunc -- reference to the function (on the caller) to be called when the dialog is done.  This function will receive
//     the following parameters from the browser:
//        hierarchyKey - the hierarchy key of the folder selected by the user
//        filename - the name of the file to be saved
function OpenObjectSaver(urlParamString, returnFunc)
{
    var paramsArray = urlParamString.split("&");

    // we have one default for the saver that differs from the pop-up browser
    // Set it unless it is already in the urlParamString
    if (FindParameterInArray("ShowFilename", paramsArray) == null)
        urlParamString = urlParamString + "&ShowFilename=true";
    if (FindParameterInArray("Mode", paramsArray) == null)
        urlParamString = urlParamString + "&Mode=SelectContainer";

    OpenObjectBrowser(urlParamString, returnFunc);
}
function clickButton(e, buttonid)
{
    var bt = document.getElementById(buttonid);
    if (typeof bt == 'object')
    {
        var evt = navigator.appName.indexOf('Netscape') > (-1) ? e : event;
        if (evt.keyCode == 13)
        {
            bt.click();
            return cancelEvent();
        }
    }
    return true;
}

var dirty = true;
//window.onunload = finish;
function finish(buttonId)
{
    if (dirty && window.opener)
    {
        //		tryU
        {
            if (buttonId)
            {
                var button = window.opener.document.getElementById(buttonId);

                if (button == null && window.opener.dialogWin.args != null)
                {
                    button = window.opener.document.getElementById(window.opener.dialogWin.args);
                }
                if (button != null)
                    button.click();
            }

            if (button == null && window.opener.RefreshBySubmit)
                window.opener.RefreshBySubmit();

            if (window.opener.dialogWin.returnFunc != null)
                window.opener.dialogWin.returnFunc();

        }
        //	    catch(e)
        //	    {
        //	        // exception will happen when dialog opened from within Client/Server b/c of 
        //	        // security.  this will be a problem.
        //	    }
    }
    else if (dirty && parent)
    {
        // If we were opened in an iframe (for example, in the Edit Pane in ObjectBrowser2), notify the parent page
        // that we committed so that it can update any needed status.
        if (typeof parent.SubPage_Committed == 'function')
            parent.SubPage_Committed();
        else if (parent.objectBrowserClass !== null)
            parent.objectBrowserClass.SubPage_Committed();
    }
}

/* 
Derived from a script by Alejandro Gervasio. 
Modified to work in FireFox by Stefan Mischook for Killersites.com

How it works: just apply the CSS class of 'column' to your pages' main columns.
*/
var MatchColumnsSemaphore = false;
matchColumns = function()
{
    var divs, contDivs, maxHeight, divHeight, d;

    // get all <div> elements in the document 
    divs = document.getElementsByTagName('div');
    contDivs = [];

    // initialize maximum height value 
    maxHeight = 0;

    // iterate over all <div> elements in the document 
    for (var i = 0; i < divs.length; i++)
    {
        // make collection with <div> elements with class attribute 'column' 
        if (/\bcolumn\b/.test(divs[i].className))
        {
            d = divs[i];
            contDivs[contDivs.length] = d;
            // determine height for <div> element 
            if (d.offsetHeight)
                divHeight = d.offsetHeight;
            else if (d.style.pixelHeight)
                divHeight = d.style.pixelHeight;
            else
            {
                // added the time  out for use when resizing is happening onload (like in rad window)
                if (MatchColumnsSemaphore)
                    MatchColumnsSemaphore = false;
                else
                {
                    window.setTimeout(matchColumns, 500);
                    MatchColumnsSemaphore = true;
                    return;
                }
            }
            // calculate maximum height 
            maxHeight = Math.max(maxHeight, divHeight);
        }
    }

    // assign maximum height value to all of container <div> elements 
    for (var i = 0; i < contDivs.length; i++)
        contDivs[i].style.height = maxHeight + "px";
}

// Runs the script when page loads 
window.onload = function()
{
    if (document.getElementsByTagName)
        matchColumns();
}

// Set the next fields value and append additional values
function setNextAppend(theField)
{
    theForm = theField.form;
    for (i = 0; i < theForm.elements.length; i++)
    {
        if (theForm.elements[i].id == theField.id)
        {
            theForm.elements[i + 1].value += '\n' + theField.value;
            break;
        }
    }
}

// Set the next fields value without appending
function setNext(theField)
{
    theForm = theField.form;
    for (i = 0; i < theForm.elements.length; i++)
    {
        if (theForm.elements[i].id == theField.id)
        {
            theForm.elements[i + 1].value = theField.value;
            break;
        }
    }
}

// Input type button on panels that need to handle navigating
function ButtonNavigate(url)
{
    if (url != "")
        location.href = url;

}

//<![CDATA[

//*****************************************************************************
// Do not remove this notice.
//
// Copyright 2000 by Mike Hall.
// See http://www.brainjar.com for terms of use.
//*****************************************************************************

//----------------------------------------------------------------------------
// Code to determine the browser and version.
//----------------------------------------------------------------------------
function Browser()
{

    var ua, s, i;

    this.isIE = false;  // Internet Explorer
    this.isNS = false;  // Netscape
    this.version = null;

    ua = navigator.userAgent;

    s = "MSIE";
    if ((i = ua.indexOf(s)) >= 0)
    {
        this.isIE = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    s = "Netscape6/";
    if ((i = ua.indexOf(s)) >= 0)
    {
        this.isNS = true;
        this.version = parseFloat(ua.substr(i + s.length));
        return;
    }

    // Treat any other "Gecko" browser as NS 6.1.

    s = "Gecko";
    if ((i = ua.indexOf(s)) >= 0)
    {
        this.isNS = true;
        this.version = 6.1;
        return;
    }
}

var browser = new Browser();

//----------------------------------------------------------------------------
// Code for handling the menu bar and active button.
//----------------------------------------------------------------------------

var activeButton = null;

/* [MODIFIED] This code commented out, not needed for activate/deactivate
on mouseover.

// Capture mouse clicks on the page so any active button can be
// deactivated.

if (browser.isIE)
document.onmousedown = pageMousedown;
else
document.addEventListener("mousedown", pageMousedown, true);

function pageMousedown(event) {

var el;

// If there is no active button, exit.

if (activeButton == null)
return;

// Find the element that was clicked on.

if (browser.isIE)
el = window.event.srcElement;
else
el = (event.target.tagName ? event.target : event.target.parentNode);

// If the active button was clicked on, exit.

if (el == activeButton)
return;

// If the element is not part of a menu, reset and clear the active
// button.

if (getContainerWith(el, "DIV", "menu") == null) {
resetButton(activeButton);
activeButton = null;
}
}

[END MODIFIED] */

function buttonClick(event, menuId)
{
    var button;

    // Get the target button element.

    if (browser.isIE)
        button = window.event.srcElement;
    else
        button = event.currentTarget;

    // Blur focus from the link to remove that annoying outline.

    button.blur();

    // Associate the named menu to this button if not already done.
    // Additionally, initialize menu display.

    if (button.menu == null)
    {
        button.menu = document.getElementById(menuId);
        if (button.menu.isInitialized == null)
            menuInit(button.menu);
    }

    // [MODIFIED] Added for activate/deactivate on mouseover.

    // Set mouseout event handler for the button, if not already done.

    if (button.onmouseout == null)
        button.onmouseout = buttonOrMenuMouseout;

    // Exit if this button is the currently active one.

    if (button == activeButton)
        return false;

    // [END MODIFIED]

    // Reset the currently active button, if any.

    if (activeButton != null)
        resetButton(activeButton);

    // Activate this button, unless it was the currently active one.

    if (button != activeButton)
    {
        depressButton(button);
        activeButton = button;
    }
    else
        activeButton = null;

    return false;
}

function buttonMouseover(event, menuId)
{
    var button;

    // [MODIFIED] Added for activate/deactivate on mouseover.

    // Activates this button's menu if no other is currently active.

    if (activeButton == null)
    {
        buttonClick(event, menuId);
        return;
    }

    // [END MODIFIED]

    // Find the target button element.

    if (browser.isIE)
        button = window.event.srcElement;
    else
        button = event.currentTarget;

    // If any other button menu is active, make this one active instead.

    if (activeButton != null && activeButton != button)
        buttonClick(event, menuId);
}

function depressButton(button)
{

    var x, y;

    // Update the button's style class to make it look like it's
    // depressed.

    button.className += " menuButtonActive";

    // [MODIFIED] Added for activate/deactivate on mouseover.

    // MODIFIED - R.Wenger 9/22/04 - attache event because the code below won't if there is already another event there (e.g., rollover)
    button.attachEvent('onmouseout', buttonOrMenuMouseout);

    // Set mouseout event handler for the button, if not already done.
    if (button.onmouseout == null)
        button.onmouseout = buttonOrMenuMouseout;
    if (button.menu.onmouseout == null)
        button.menu.onmouseout = buttonOrMenuMouseout;

    // [END MODIFIED]

    // Position the associated drop down menu under the button and
    // show it.

    x = getPageOffsetLeft(button);
    y = getPageOffsetTop(button) + button.offsetHeight;

    // For IE, adjust position.

    if (browser.isIE)
    {
        x += button.offsetParent.clientLeft;
        y += button.offsetParent.clientTop;
    }

    // [MODIFIED] Adjust menu position if it pops up off screen [JG 1/22/05]
    var menuRight = 0;
    var menuBottom = 0;
    var bodyRight = document.body.offsetLeft + document.body.offsetWidth - 30; // -30 for the scroll bar;
    var bodyBottom = document.body.offsetTop + document.body.offsetHeight - 30; // -30 for the scroll bar;
    var parent = getParent(button.menu);

    var menuOffsetLeft = x + getPageOffsetLeft(parent)
    var menuOffsetTop = y + getPageOffsetTop(parent) + parent.offsetHeight;

    if (browser.isIE)
    {
        menuRight = menuOffsetLeft + button.menu.clientWidth;
        menuBottom = menuOffsetTop + button.menu.clientHeight;
    }
    else
    {
        // i don't know how to get the width and height for
        // DIV elements on non-IE browsers, so just assume
        // width to be 100 pixels and height to be 300
        menuRight = menuOffsetLeft + 100;
        menuBottom = menuOffsetTop + 300;
    }

    if (menuRight > bodyRight)
    {
        x -= (menuRight - bodyRight);
        menuRight = x + button.menu.clientWidth;
    }
    if (menuBottom > bodyBottom)
    {
        //y -= (menuBottom - bodyBottom);
        menuBottom = y + button.menu.clientHeight;
    }
    // [END MODIFIED]

    // Set menu position and make it visible
    button.menu.style.left = x + "px";
    button.menu.style.top = y + "px";
    button.menu.style.visibility = "visible";

    // [MODIFIED] Added to hide <select> fields so the menu won't be covered
    var allSelectFields = document.getElementsByTagName("select");

    for (i = 0; i < allSelectFields.length; i++)
    {
        var selectField = allSelectFields(i);

        // only hide select field if its at least partially covered by the menu
        var selectFieldX = getPageOffsetLeft(selectField);
        var selectFieldY = getPageOffsetTop(selectField) + selectField.offsetHeight;
        var selectFieldRight = 0;
        var selectFieldBottom = 0;

        if (browser.isIE)
        {
            selectFieldX += selectField.offsetParent.clientLeft;
            selectFieldY += selectField.offsetParent.clientTop;

            selectFieldRight += selectFieldX + selectField.clientWidth;
            selectFieldBottom += selectFieldY + selectField.clientHeight;
        }
        else
        {
            selectFieldRight += selectFieldX + 200;
            selectFieldBottom += selectFieldY + 20;
        }

        menuBottom += 5;

        //alert("X: "+selectFieldX+"\t"+menuOffsetLeft+"\r\nR: "+selectFieldRight+"\t"+menuRight+"\r\nY: "+selectFieldY+"\t"+menuOffsetTop+"\r\nB: "+selectFieldBottom+"\t"+menuBottom);
        if (squareIntersectsSquare(selectFieldX, selectFieldRight, selectFieldY, selectFieldBottom, menuOffsetLeft, menuRight, menuOffsetTop, menuBottom))
        {
            selectField.style.visibility = "hidden";
        }
    }
    // [END MODIFIED]
}

function numberOrder(a, b) { return a - b; }

function squareIntersectsSquare(aLeft, aRight, aTop, aBottom, bLeft, bRight, bTop, bBottom)
{
    xArray = new Array(aLeft, aRight, bLeft, bRight);
    xArray.sort(numberOrder);
    yArray = new Array(aTop, aBottom, bTop, bBottom);
    yArray.sort(numberOrder);

    if ((xArray[0] == aLeft && xArray[1] == aRight) ||
		(xArray[0] == bLeft && xArray[1] == bRight))
        return false;

    if ((yArray[0] == aTop && yArray[1] == aBottom) ||
		(yArray[0] == bTop && yArray[1] == bBottom))
        return false;

    return true;
}

function resetButton(button)
{

    // Restore the button's style class.

    removeClassName(button, "menuButtonActive");

    // Hide the button's menu, first closing any sub menus.

    if (button.menu != null)
    {
        closeSubMenu(button.menu);
        button.menu.style.visibility = "hidden";
    }

    // [MODIFIED] Added to hide <select> fields so the menu won't be covered
    var allSelectFields = document.getElementsByTagName("select");
    for (i = 0; i < allSelectFields.length; i++)
    {
        allSelectFields(i).style.visibility = "visible";
    }
    // [END MODIFIED]  
}

//----------------------------------------------------------------------------
// Code to handle the menus and sub menus.
//----------------------------------------------------------------------------

function menuMouseover(event)
{

    var menu;

    // Find the target menu element.

    if (browser.isIE)
        menu = getContainerWith(window.event.srcElement, "DIV", "menu");
    else
        menu = event.currentTarget;

    // Close any active sub menu.

    if (menu.activeItem != null)
        closeSubMenu(menu);
}

function menuItemMouseover(event, menuId)
{

    var item, menu, x, y;

    // Find the target item element and its parent menu element.

    if (browser.isIE)
        item = getContainerWith(window.event.srcElement, "A", "menuItem");
    else
        item = event.currentTarget;
    menu = getContainerWith(item, "DIV", "menu");

    // Close any active sub menu and mark this one as active.

    if (menu.activeItem != null)
        closeSubMenu(menu);
    menu.activeItem = item;

    // Highlight the item element.

    item.className += " menuItemHighlight";

    // Initialize the sub menu, if not already done.

    if (item.subMenu == null)
    {
        item.subMenu = document.getElementById(menuId);
        if (item.subMenu.isInitialized == null)
            menuInit(item.subMenu);
    }

    // [MODIFIED] Added for activate/deactivate on mouseover.

    // Set mouseout event handler for the sub menu, if not already done.

    if (item.subMenu.onmouseout == null)
        item.subMenu.onmouseout = buttonOrMenuMouseout;

    // [END MODIFIED]

    // Get position for submenu based on the menu item.

    x = getPageOffsetLeft(item) + item.offsetWidth;
    y = getPageOffsetTop(item);

    // Adjust position to fit in view.

    var maxX, maxY;

    if (browser.isNS)
    {
        maxX = window.scrollX + window.innerWidth;
        maxY = window.scrollY + window.innerHeight;
    }
    if (browser.isIE)
    {
        maxX = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) +
      (document.documentElement.clientWidth != 0 ? document.documentElement.clientWidth : document.body.clientWidth);
        maxY = Math.max(document.documentElement.scrollTop, document.body.scrollTop) +
      (document.documentElement.clientHeight != 0 ? document.documentElement.clientHeight : document.body.clientHeight);
    }
    maxX -= item.subMenu.offsetWidth;
    maxY -= item.subMenu.offsetHeight;

    if (x > maxX)
        x = Math.max(0, x - item.offsetWidth - item.subMenu.offsetWidth
      + (menu.offsetWidth - item.offsetWidth));
    y = Math.max(0, Math.min(y, maxY));

    // Position and show the sub menu.

    item.subMenu.style.left = x + "px";
    item.subMenu.style.top = y + "px";
    item.subMenu.style.visibility = "visible";

    // Stop the event from bubbling.

    if (browser.isIE)
        window.event.cancelBubble = true;
    else
        event.stopPropagation();
}

function closeSubMenu(menu)
{

    if (menu == null || menu.activeItem == null)
        return;

    // Recursively close any sub menus.

    if (menu.activeItem.subMenu != null)
    {
        closeSubMenu(menu.activeItem.subMenu);
        menu.activeItem.subMenu.style.visibility = "hidden";
        menu.activeItem.subMenu = null;
    }
    removeClassName(menu.activeItem, "menuItemHighlight");
    menu.activeItem = null;
}

// [MODIFIED] Added for activate/deactivate on mouseover. Handler for mouseout
// event on buttons and menus.

function buttonOrMenuMouseout(event)
{
    var el;

    // If there is no active button, exit.

    if (activeButton == null)
        return;

    // Find the element the mouse is moving to.

    if (browser.isIE)
        el = window.event.toElement;
    else if (event.relatedTarget != null)
        el = (event.relatedTarget.tagName ? event.relatedTarget : getParent(event.relatedTarget));

    // If the element is not part of a menu, reset the active button.

    if (getContainerWith(el, "DIV", "menu") == null)
    {
        resetButton(activeButton);
        activeButton = null;
    }
    // MODIFIED - R.Wenger 9/22/04 - remove event attached in depressButton above
    window.event.srcElement.detachEvent('onmouseout', buttonOrMenuMouseout);
}

// [END MODIFIED]

//----------------------------------------------------------------------------
// Code to initialize menus.
//----------------------------------------------------------------------------

function menuInit(menu)
{

    var itemList, spanList;
    var textEl, arrowEl;
    var itemWidth;
    var w, dw;
    var i, j;

    // For IE, replace arrow characters.

    if (browser.isIE)
    {
        menu.style.lineHeight = "2.5ex";
        spanList = menu.getElementsByTagName("SPAN");
        for (i = 0; i < spanList.length; i++)
            if (hasClassName(spanList[i], "menuItemArrow"))
        {
            spanList[i].style.fontFamily = "Webdings";
            spanList[i].firstChild.nodeValue = "4";
        }
    }

    // Find the width of a menu item.

    itemList = menu.getElementsByTagName("A");
    if (itemList.length > 0)
        itemWidth = itemList[0].offsetWidth;
    else
        return;

    // For items with arrows, add padding to item text to make the
    // arrows flush right.

    for (i = 0; i < itemList.length; i++)
    {
        spanList = itemList[i].getElementsByTagName("SPAN");
        textEl = null;
        arrowEl = null;
        for (j = 0; j < spanList.length; j++)
        {
            if (hasClassName(spanList[j], "menuItemText"))
                textEl = spanList[j];
            if (hasClassName(spanList[j], "menuItemArrow"))
                arrowEl = spanList[j];
        }
        if (textEl != null && arrowEl != null)
            textEl.style.paddingRight = (itemWidth
        - (textEl.offsetWidth + arrowEl.offsetWidth)) + "px";
    }

    // Fix IE hover problem by setting an explicit width on first item of
    // the menu.

    if (browser.isIE)
    {
        w = itemList[0].offsetWidth;
        itemList[0].style.width = w + "px";
        dw = itemList[0].offsetWidth - w;
        w -= dw;
        itemList[0].style.width = w + "px";
    }

    // Mark menu as initialized.

    menu.isInitialized = true;
}

//----------------------------------------------------------------------------
// General utility functions.
//----------------------------------------------------------------------------

function getContainerWith(node, tagName, className)
{

    // Starting with the given node, find the nearest containing element
    // with the specified tag name and style class.

    while (node != null)
    {
        if (node.tagName != null && node.tagName == tagName &&
        hasClassName(node, className))
            return node;
        node = getParent(node);
    }

    return node;
}

function hasClassName(el, name)
{

    var i, list;

    // Return true if the given element currently has the given class
    // name.

    list = el.className.split(" ");
    for (i = 0; i < list.length; i++)
        if (list[i] == name)
        return true;

    return false;
}

function removeClassName(el, name)
{

    var i, curList, newList;

    if (el.className == null)
        return;

    // Remove the given class name from the element's className property.

    newList = new Array();
    curList = el.className.split(" ");
    for (i = 0; i < curList.length; i++)
        if (curList[i] != name)
        newList.push(curList[i]);
    el.className = newList.join(" ");
}

function getPageOffsetLeft(el)
{

    var x;

    // Return the x coordinate of an element relative to the page.

    x = el.offsetLeft;

    // MODIFIED - R.Wenger - absolute positioning messes up the calculation so only continue if not using absolute positioning
    if (el.offsetParent != null && el.offsetParent.style.position != 'absolute')
        x += getPageOffsetLeft(el.offsetParent);

    return x;
}

function getPageOffsetTop(el)
{

    var y;

    // Return the x coordinate of an element relative to the page.

    y = el.offsetTop;
    // MODIFIED - R.Wenger - absolute positioning messes up the calculation so only continue if not using absolute positioning
    if (el.offsetParent != null && el.offsetParent.style.position != 'absolute')
        y += getPageOffsetTop(el.offsetParent);

    return y;
}

// Look for any fields with submit actions specified to handle return/enter keypress events.
// e.g. <div id="SomeContainerId" data-SubmitAction='{"ButtonId":"ClientSaveButtonId", "ClientId":"ClientControlID"}' />
// e.g. DataPanel.Attributes.Add("data-SubmitAction", string.Format(CultureInfo.InvariantCulture, "{{\"ButtonId\":\"{0}\", \"ClientId\":\"{1}\"}}", Update.ClientID, ClientID));
// e.g. DataPanel.Attributes.Add("data-SubmitAction", string.Format(CultureInfo.InvariantCulture, "{{\"ButtonId\":\"{0}\", \"ClientId\":\"{1}\", \"HiddenFocusableFieldId\":\"{2}\"}}", Update.ClientID, ClientID, HiddenFocusableFieldId.ClientID));
jQuery(document).ready(function () {
    // Ensures this works across ajax requests.
    Sys.Application.add_load(function () {
        handleSubmitActions();
        Sys.Application.remove_load(function () {
            handleSubmitActions();
        });
    });
    
    function handleSubmitActions() {
        // Look for any submit actions.
        var fields = jQuery('*[data-SubmitAction]');
        if (fields == null) return;
        for (var i = 0; i < fields.length; i++) {
            var tempField = fields[i];
            if (tempField != null && tempField.id != "") {
                // The container or field with the attribute also has an ID,
                // so just create the submit action.
                createSubmitAction(tempField);
            }
            else if (tempField != null && tempField.childNodes != null && tempField.childNodes.length > 0) {
                // The container doesn't have an ID, so handle 'contained fields' individually
                // ('copy' the submit action attribute, then create the submit action).
                var tempChildFields = tempField.childNodes;
                for (var x = 0; x < tempChildFields.length; x++) {
                    var tempChildField = tempChildFields[x];
                    addSubmitActionAttribute(tempChildField, tempField);
                    createSubmitAction(tempChildField);
                }
            }
        }
    }
    
    function addSubmitActionAttribute(fieldToAddAttribTo, fieldWithAttrib) {
        // Validate. Just return if info is missing.
        if (fieldToAddAttribTo == null) return;
        var fieldToAddAttribToId = fieldToAddAttribTo.id;
        if (fieldToAddAttribToId == "") return;
        var containedField = jQuery(fieldToAddAttribTo);
        if (containedField == null) return;
        var submitAction = jQuery(fieldWithAttrib).data('submitaction');
        if (submitAction == null) return;
        
        // Add the submit action attribute to the 'contained field',
        // which is the field inside the container that has the attribute.
        //
        // Must use 'attr' to copy the actual value, then update the ClientId key 
        // with the contained field's ID.
        containedField.attr('data-SubmitAction', jQuery(fieldWithAttrib).attr('data-SubmitAction'));
        containedField.data('submitaction').ClientId = fieldToAddAttribToId;
    }
    
    function createSubmitAction(field) {
        // Validate. Just return if info is missing.
        if (field == null) return;
        var fieldId = field.id;
        if (fieldId == "") return;
        var submitActionField = jQuery(field);
        if (submitActionField == null) return;
        var submitAction = submitActionField.data('submitaction');
        if (submitAction == null) return;
        
        // Gather the info needed to handle the keypress events.
        var submitActionClientId = submitAction.ClientId;
        if (submitActionClientId != null && submitActionClientId != 'undefined' && submitActionClientId.trim != '') {
            var submitActionButtonId = submitAction.ButtonId || '';
            var submitActionHiddenFocusableFieldId = submitAction.HiddenFocusableFieldId || '';
            var enterKeyClassInstanceVar = 'enterKeyPressClass_' + submitActionClientId + fieldId;

            // Instantiate the EnterKeyPressClass class.
            var classInstance = 'var ' + enterKeyClassInstanceVar + ' = new EnterKeyPressClass("' + submitActionButtonId + '", "' + submitActionHiddenFocusableFieldId + '");';
            eval(classInstance);
            // Call the TurnOnEnterKey method.
            var methodCall = enterKeyClassInstanceVar + '.TurnOnEnterKey("' + fieldId + '");';
            eval(methodCall);
        }
    }
}); // jQuery(document).ready(function () {

// Attach keypress event to textboxes, radio buttons, and checkboxes. When user hits return/enter within textboxes we submit the buttonToClickId.
// We do nothing for radio buttons and checkboxes (it's a no-op). If the buttonToClickId parameter is empty, then pressing return/enter is also a no-op.
//
// A hidden field may (optionally) be specified to save the keypress event field id in for tabbing purposes (for maintaining tab order on postback).
// It can be retrieved server side (e.g. in the OnPreRender event)...
// if (IsPostBack)
// {
//     var masterPage = (MasterPageBase)Page.Master;
//     if (masterPage != null)
//         masterPage.RestoreFocus(MasterPageBase.FocusTargetProperty.Id, HiddenFocusableFieldId.Value);
// }
// HiddenFocusableFieldId.Value = string.Empty;
//
function EnterKeyPressClass(buttonToClickId, hiddenFieldIdToStoreFocusableFieldId) {
    // The serverId parameter can either be a div/container with fields, or an actual field.
    // If serverId is a div/container, then the ClientId of the fields must END with (not contain) the serverId parameter.
    this.TurnOnEnterKey = function (serverId) {
        var fields;
        // Look for a wrapper control with fields to add the keypress event to.
        var container = jQuery("div[id$=" + serverId + "]:first");
        if (container != null)
            fields = container.find('input[type=text], input[type=radio], input[type=checkbox], input[type=password]');
        // If fields weren't found, then try and use the passed in parameter as the field.
        if (container == null || container.length == 0 || fields == null || fields.length == 0)
            fields = jQuery('#' + serverId);
        // Attach the handler to the fields.
        if (fields != null) {
            fields.on('keypress', (function (event) {
                handlEnterKeyPressInInputFields(event);
            }));
        }
    };
    
    function handlEnterKeyPressInInputFields(event) {
        // Get the key/code for the button that was pressed (Enter = 13).
        var key = event.keyCode ? event.keyCode : event.which;
        if (key == 13) {
            // This is for FF autocomplete, which triggers button click when selecting item from drop down, code below prevents it.
            if (window.previousKeyCode) {
                // down=40,up=38,pgdn=34,pgup=33
                if (window.previousKeyCode == 33 || window.previousKeyCode == 34 ||
                    window.previousKeyCode == 39 || window.previousKeyCode == 40) {

                    window.previousKeyCode = key;
                    return;
                }
            }
            
            // Perform the desired action (e.g. click the button).
            switch (event.target.type) {
                case 'text':
                case 'password':
                    // Check if a hidden field was specified to set the focusable field for tabbing and postback behavior.
                    if (hiddenFieldIdToStoreFocusableFieldId != null && hiddenFieldIdToStoreFocusableFieldId != '')
                        saveFocusableFieldId(event.target.id, hiddenFieldIdToStoreFocusableFieldId);
                    var button = jQuery('#' + buttonToClickId);
                    if (button != null && button.length == 1 && !button[0].disabled)
                        button.click(); // __doPostBack('ctl00_SaveButton', 'OnClick'); - this won't fire client events hooked up to the btn.
                    break;
                case 'radio':
                    // Don't submit for radio buttons.
                    break;
                case 'checkbox':
                    // Don't submit for checkboxes.
                    break;
                default:
                    // The default action is not to submit.
                    break;
            }
            event.preventDefault();
            //this is necessary because the generic SaveButton click would trigger print in certain master pages (e.g. Forest/Aspen).
        } else {
            window.previousKeyCode = key;
        }
    }
    
    function saveFocusableFieldId(focusableFieldId, storageFieldId) {
        // Validate. Just return if info is missing.
        if (storageFieldId == null || storageFieldId == "") return;
        if (focusableFieldId == "") return;
        var focusableField = jQuery('#' + focusableFieldId);
        if (focusableField == null) return;

        var storageField = jQuery('#' + storageFieldId);
        if (storageField != null)
            storageField.val(focusableFieldId);
    }
} // end EnterKeyPressClass

//]]>

////////////////////////////////////////////////
// End Menu.js
///////////////////////////////////////////////

//####################
// AtomControl.js
//######################
function ChangeSelectedTab(object)
{
    var i = object.selectedIndex;
    var allTabName = "Tab_";
    var code = allTabName + i;

    var divItems = document.getElementById(code);

    var divItemsOff = document.getElementsByTagName("div");

    // turn off all the tabs
    for (var i = 0; i < divItemsOff.length; i++)
    {
        if ((divItemsOff[i].id) != code && (divItemsOff[i].id).substring(0, 4) == allTabName)
        {
            divItemsOff[i].style.display = "none";
        }
    }

    //  then turn on the tab that was clicked
    if (document.all.namedItem(code).style.display == "none")
    {
        document.all.namedItem(code).style.display = "block";
        if (document.all.namedItem("iAddItemTab") != null)
            document.all.namedItem("iAddItemTab").value = object.selectedIndex;
    }
}

/*function ChangeSelectedTab(code)
{
var allTabName = code.substring(0,3);		
var divItems = document.getElementById(code);
var divItemsOff = document.getElementsByTagName("div");
		
// turn off all the tabs
for (var i = 0; i < divItemsOff.length; i++)
{
if((divItemsOff[i].id)!= code && (divItemsOff[i].id).substring(0,3) == allTabName)
{
divItemsOff[i].style.display="none";
}
}
		
//  then turn on the tab that was clicked
if(document.all.namedItem(code).style.display=="none")
{
document.all.namedItem(code).style.display="block";
}			
				
}*/

function ShowHidePanelSection(sectionID)
{
    element = document.getElementById(sectionID);
    if (element.style.display == "none")
        element.style.display = "block";
    else
        element.style.display = "none";
}

//This is a workaround until we get JavaScript library.
function ValidateTextLength(field, maxLength)
{
    if (field.value.length > maxLength)
        field.value = field.value.substring(0, maxLength);
}

//######################
//end AtomControl.js
//#######################


//####################
// Command bar button validation: CommandButtonBar.cs
//######################

// Runs all validators on the page, independent of an validation groups
// If you pass in a string array of validation groups only those groups will be run
function RunAllValidators(validationGroups, runValidatorsWithoutAGroup) {

    // escape if no validators exist
    if (typeof Page_ClientValidate == "function") {
       
        var i;
        for (i = 0; i < Page_Validators.length; i++) {
            // fire either all validators on the page, or only those in our list of validation groups
            // we also have the option of firing those without a validation group.
            if (IncludeValidationGroup(validationGroups, Page_Validators[i].validationGroup, runValidatorsWithoutAGroup)) {
                ValidatorValidate(Page_Validators[i]); //this fires the validator, ignoring the group
            }
        }
        // If validation has failed, stop all the validators disapearing and stop the page submitting
        ValidatorUpdateIsValid();
	
		// Force validation summary for every group.
		if(validationGroups!=null && validationGroups!='undefined'){
			for (i = 0; i < validationGroups.length; i++){
				ValidationSummaryOnSubmit(validationGroups[i]);        
			}
		}
		else
			ValidationSummaryOnSubmit("");

		// if we are using ajax tabs and a validator fails, this returns the user back to the tab with a failed validator
		ShowProblemTab();
		// if we are using telerik tabs and a validator fails, this returns the user back to the tab with a failed validator
		ShowProblemTelerikTab();

        return Page_IsValid;
    }
    return true;
}

// returns true if the passed in validation group is in our list of those to check
function IncludeValidationGroup(validationGroups, group, runValidatorsWithoutAGroup) {
    if (validationGroups == undefined) // if no group passed in then we're checking everything
    {
        return true;
    }
    // If validator has no group or matches a group in our list then return true.
    if ((group == undefined && runValidatorsWithoutAGroup) || jQuery.inArray(group, validationGroups) >= 0) {
        return true;
    }

    return false;
}

//####################
// END Command bar button validation
//######################

//####################
// BEGIN Handle Telerik radTabStrips if clientside validation has failed.
//######################
//Selects appropriate telerik tab for given failed control.
function ShowProblemTelerikTab() {

    // Handle Talerik TabStrips
    // First get all tabstrips on this page.
    var tabStrips = GetAllTabsStrips();

    //If we have any - deal with it.
    if (tabStrips.length > 0) {
        for (i = 0; i < Page_Validators.length; ++i) {
            var val = Page_Validators[i];
            if (val.evaluationfunction(val) == false) {

                var failedElement = document.getElementById(val.controltovalidate);
                if (failedElement != null) {
                    //first try and find using jQuery and the data-multipage attribute
                    //if can't find it, use old recursive method instead
                    var radMultiPage = null;
                    var domElementForRadMultiPage = jQuery('#' + val.controltovalidate).closest("[data-multipage='yes']").get(0);
                    if (typeof(domElementForRadMultiPage) == "undefined" || domElementForRadMultiPage.length < 1) {
                        radMultiPage = GetMultiPageId(failedElement);
                    } else {
                        radMultiPage = $find(domElementForRadMultiPage.id);
                    }

                    //now ensure we have the correct component
                    var hasMultiPage = false;
                    if (radMultiPage != null) {
                        try {
                            var cnt = radMultiPage.get_pageViews();
                            hasMultiPage = true;
                        }
                        catch (ex) { hasMultiPage = false; }
                    }

                    if (hasMultiPage) {
                        //Find PageView for troubled control
                        var i;
                        var troublePageId = -1;
                        for (i = 0; i < radMultiPage.get_pageViews().get_count(); i++) {

                            if (IsParent(radMultiPage.get_pageViews().getPageView(i).get_id(), failedElement)) {
                                troublePageId = i;
                                break;
                            }
                        }

                        if (troublePageId >= 0) {
                            // OK we have Tabstrips, we have PageView in trouble, so now switch Tabs and display
                            for (i = 0; i < tabStrips.length; i++) {
                                var tabstrip = $find(tabStrips[i].id);
                                if (tabstrip.get_multiPageID() == radMultiPage.get_id()) {
                                    tabstrip.set_selectedIndex(troublePageId);
                                    if (!failedElement.disabled) {
                                        try //IE8 fix: Try-catch only straightforward way to handle case where any of parent elements has display='none'.
                                        {
                                            failedElement.focus();
                                        }
                                        catch (err) { }
                                    }
                                    break;
                                }
                            }

                        }

                    }

                }
                break;
            }
        }
    }
}

//Returns array will all TabStrips on the page
function GetAllTabsStrips() {
    var res = new Array();
    var list = document.getElementsByTagName("DIV");
    if (list.length > 0)
        var i = 0;
    var isTab = false;
    for (i = 0; i < list.length; i++) {
        isTab = false;
        if (list[i].control != null) {

            try {
                if (list[i].control.get_multiPageID() != "")
                    isTab = true;
            }
            catch (exc) { isTab = false }
        }
        if (isTab)
            res.push(list[i]);
    }
    return res;
}

//Returns true if Given ID is parent for the given control
function IsParent(parentId, childcontrol) {
    var res = false;
    if (childcontrol.parentNode != null) {
        if (childcontrol.id == parentId)
            return true;
        else
            res = IsParent(parentId, childcontrol.parentNode);
    }
    return res;
}
//Returns RadMultiPage that contains troubled control
function GetMultiPageId(childcontrol) {
    var res = null;
    if (childcontrol.parentNode != null) {
        if (childcontrol.control != null)
            return childcontrol.control;
        else
            res = GetMultiPageId(childcontrol.parentNode);
        if (res != null)
            return res;
    }
}
//####################
// END Handle Telerik radTabStrips if clientside validation has failed.
//######################

//####################
// BEGIN code to avoid inserting tabs into HTML editor controls.   For 
// accessibility we want to be able to tab through the text entry field
// to get to the next field.
//######################
function OnHTMLEditorClientLoad(editor, args) {
    // This approach from http://www.telerik.com/community/forums/aspnet-ajax/editor/radeditor-tab-key-focus-on-another-control-in-firefox-while-in-ie-it-inserts-whitespace.aspx
    // The idea is, if a tab is pressed, force browsers that do not support the "removeShortCut" code below to ignore a tab in the HTML editor 
    // and focus on the next PanelFieldValue control that can receive focus below the editor.

    editor.attachEventHandler("onkeydown", function (event) {
        var key = event.keyCode ? event.keyCode : event.which;
        if (key == '9') {
            //This editor is contained in an IFrame so need to find it within the document
            var searchBody = jQuery(event.target).closest("body");
            var frames = document.getElementsByTagName("iframe");
            for (var i = 0; i < frames.length; i++) {
                if (jQuery(frames[i].contentWindow.document.body).is(searchBody)) {
                    //This is the IFrame of interest so find its containing PanelFieldValue
                    var closestPanelFieldValue = jQuery(frames[i]).closest(".PanelFieldValue");
                    //Find the index of the closestPanelFieldValue within the entire document
                    var indexOfClosestPanelFieldValue = jQuery(".PanelFieldValue").index(closestPanelFieldValue);
                    //Find the next PanelFieldValue in the document that contains a control that we can set focus on
                    var panelFieldValues = jQuery(".PanelFieldValue");
                    //If this isn't the last PanelFieldValue on the page the look for the next one with a control we can set focus
                    if (indexOfClosestPanelFieldValue < panelFieldValues.length) {
                        //Start searching, begining with the very next PanelFieldValue to the last one on the page
                        for (var j = indexOfClosestPanelFieldValue + 1; j < panelFieldValues.length; j++) {
                            //Get the controls that could accept focus
                            var valueControls = jQuery(panelFieldValues[j]).find('input[type=text], input[type=radio], input[type=checkbox], textarea');
                            if (valueControls != null && valueControls.length > 0) {
                                //Get the first visible control (tried to filter using :visble above but it didn't work so doing this way)
                                for (var k = 0; valueControls.length; k++) {
                                    var control = valueControls[k];
                                    if ((control.style == undefined || control.style['visibility'] == undefined || control.style['visibility'] != 'hidden') &&
                                        (control.style == undefined || control.style['display'] == undefined || control.style['display'] != 'none') &&
                                        (control.css == undefined || control.css['display'] == undefined || control.css['display'] != 'none')) {
                                        //Found a PanelFieldValue that has a visible control we can set focus on
                                        $telerik.cancelRawEvent(event); //Cancel further execution of the event
                                        control.focus();
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }
    });
    editor.removeShortCut("InsertTab");
}
//####################
// END code to avoid inserting tabs into HTML editor controls.  
//######################