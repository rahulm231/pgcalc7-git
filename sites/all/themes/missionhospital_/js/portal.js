
  
  if (getParameter("pageID") != 1)
    window.location.reload();

  function getParameter(cres_param_name) {
    cres_param_name = 
	  cres_param_name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+cres_param_name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "1";
    else
      return results[1];
  }
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  } else {
    var expires = "";
  };
  document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  };
  return null;
};

function eraseCookie(name) {
  createCookie(name,"",-1);
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

var agent = navigator.userAgent;      
var isWebkit = (agent.indexOf("AppleWebKit") > 0);      
var isIPad = (agent.indexOf("iPad") > 0);      
var isIOS = (agent.indexOf("iPhone") > 0 || agent.indexOf("iPod") > 0);     
var isAndroid = (agent.indexOf("Android")  > 0);     
var isNewBlackBerry = (agent.indexOf("AppleWebKit") > 0 && agent.indexOf("BlackBerry") > 0);     
var isWebOS = (agent.indexOf("webOS") > 0);      
var isWindowsMobile = (agent.indexOf("IEMobile") > 0);     
var isSmallScreen = (screen.width < 767 || (isAndroid && screen.width < 1000));     
var isUnknownMobile = (isWebkit && isSmallScreen);     
var isMobile = (isIOS || isAndroid || isNewBlackBerry || isWebOS || isWindowsMobile || isUnknownMobile);     
var isTablet = (isIPad || (isMobile && !isSmallScreen)); 
var dv = readCookie('desktopview');
var queryString = window.location.search;
var stringPresent = getQueryVariable("dvToggle");

if (stringPresent == "1") {
  createCookie('desktopview',1-(dv||0),0);
// } else {
//   if ( isMobile && isSmallScreen && (dv != "1")) {
//     if (window.location.href.indexOf("https") >= 0) 
//       location.href = "https://m-stjoe.giftlegacy.com/" + queryString;
//     else
//       location.href = "http://m.mymhgift.org/" + queryString;
//   }
// }//------------------------------------------ Browser / OS ------------------------------------------------------
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "unknown";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "unknown";
		this.OSVer = this.searchString(this.dataOS) || "unknown";
		this.OS = this.OSVer.indexOf('Win')>-1 ? 'Windows': this.OSVer; 
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
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
	dataOS : [
		{
			string: navigator.userAgent,
			subString: "Windows NT 5.1",
			identity: "Windows XP"
		},
		{
			string: navigator.userAgent,
			subString: "Windows NT 6.0",
			identity: "Windows Vista"
		},
		{
			string: navigator.userAgent,
			subString: "Windows NT 6.1",
			identity: "Windows 7"
		},
		{
			string: navigator.userAgent,
			subString: "Windows NT 5.2",
			identity: "Windows Server 2003/XP x64"
		},
		{
			string: navigator.userAgent,
			subString: "Windows NT 5.01",
			identity: "Windows 2000 SP1"
		},
		{
			string: navigator.userAgent,
			subString: "Windows NT 5.0",
			identity: "Windows 2000"
		},
		{
			string: navigator.userAgent,
			subString: "Windows 98;Win 9x 4.90",
			identity: "Windows Me"
		},
		{
			string: navigator.userAgent,
			subString: "Windows 98",
			identity: "Windows 98"
		},
		{
			string: navigator.userAgent,
			subString: "Windows 95",
			identity: "Windows 95"
		},
		{
			string: navigator.userAgent,
			subString: "Windows CE",
			identity: "Windows CE"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac OS X"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

//------------------------------------------- Flash ---------------------------------------------------

//Flash Player Version Detection - Rev 1.6
//Detect Client Browser type
//Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	version = version.replace('WIN ','');
	version = version.split(',').join('.');
	return version;
}

//JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

//When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

     	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
if (src.indexOf('?') != -1)
 return src.replace(/\?/, ext+'?'); 
else
 return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
 var str = '';
 if (isIE && isWin && !isOpera)
 {
		str += '<object ';
		for (var i in objAttrs)
			str += i + '="' + objAttrs[i] + '" ';
		for (var i in params)
			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
		str += '></object>';
 } else {
		str += '<embed ';
		for (var i in embedAttrs)
			str += i + '="' + embedAttrs[i] + '" ';
		str += '> </embed>';
 }

 document.write(str);
}

function AC_FL_RunContent(){
var ret = 
 AC_GetArgs
 (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
  , "application/x-shockwave-flash"
 );
AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
var ret = new Object();
ret.embedAttrs = new Object();
ret.params = new Object();
ret.objAttrs = new Object();
for (var i=0; i < args.length; i=i+2){
 var currArg = args[i].toLowerCase();    

 switch (currArg){	
   case "classid":
     break;
   case "pluginspage":
     ret.embedAttrs[args[i]] = args[i+1];
     break;
   case "src":
   case "movie":	
     args[i+1] = AC_AddExtension(args[i+1], ext);
     ret.embedAttrs["src"] = args[i+1];
     ret.params[srcParamName] = args[i+1];
     break;
   case "onafterupdate":
   case "onbeforeupdate":
   case "onblur":
   case "oncellchange":
   case "onclick":
   case "ondblClick":
   case "ondrag":
   case "ondragend":
   case "ondragenter":
   case "ondragleave":
   case "ondragover":
   case "ondrop":
   case "onfinish":
   case "onfocus":
   case "onhelp":
   case "onmousedown":
   case "onmouseup":
   case "onmouseover":
   case "onmousemove":
   case "onmouseout":
   case "onkeypress":
   case "onkeydown":
   case "onkeyup":
   case "onload":
   case "onlosecapture":
   case "onpropertychange":
   case "onreadystatechange":
   case "onrowsdelete":
   case "onrowenter":
   case "onrowexit":
   case "onrowsinserted":
   case "onstart":
   case "onscroll":
   case "onbeforeeditfocus":
   case "onactivate":
   case "onbeforedeactivate":
   case "ondeactivate":
   case "type":
   case "codebase":
     ret.objAttrs[args[i]] = args[i+1];
     break;
   case "id":
   case "width":
   case "height":
   case "align":
   case "vspace": 
   case "hspace":
   case "class":
   case "title":
   case "accesskey":
   case "name":
   case "tabindex":
     ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
     break;
   default:
     ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
 }
}
ret.objAttrs["classid"] = classid;
if (mimeType) ret.embedAttrs["type"] = mimeType;
return ret;
}

var xmlHttp;
function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } 
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();                
    }
}
function sendStatistics(sessionNew, CID){

	if(sessionNew){

		var opt = '';
		var wmpVer='-1';
		if(wmpVer==null) wmpVer='-1';
		opt='CID='+CID+
			'&Browser='+BrowserDetect.browser+
			'&BrowserVer='+BrowserDetect.version+
			'&OS='+BrowserDetect.OS+
			'&OSVer='+BrowserDetect.OSVer+
			'&FlashVer='+GetSwfVer()+
			'&JavaVer='+navigator.javaEnabled()+	
			'&WMPVer='+wmpVer+
			'&ScreenRes='+screen.width+'x'+screen.height+
			'&ScreenColors='+screen.colorDepth+
			'&Act=Visitor';

		createXMLHttpRequest();
		xmlHttp.open("POST", 'AccessVisitors', true);
		//xmlHttp.onreadystatechange = null;
	    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    //xmlHttp.setRequestHeader("Content-length", opt.length);
	    //xmlHttp.setRequestHeader("Connection", "close");
		xmlHttp.send(opt);	
	}
}

function setPageStatistics(CID, PID){
	var opt = 'CID='+CID+'&PID='+PID+'&Act=Page';
	createXMLHttpRequest();
	xmlHttp.open("POST", 'AccessVisitors', true);
	//xmlHttp.onreadystatechange = temp;
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", opt.length);
    xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(opt);
}

function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
	    window.onload = func;
	  } else {
	    window.onload = function() {
	      if (oldonload) {
	        oldonload();
	      }
	      func();
	    }
	  }
}
function addUnLoadEvent(func) {
	  var oldonunload = window.onunload;
	  if (typeof window.onunload != 'function') {
	    window.onunload = func;
	  } else {
	    window.onunload = function() {
	      if (oldonunload) {
	    	 oldonunload();
	      }
	      func();
	    }
	  }
}

window.onload = function(){	sendStatistics(true,491); }
window.onunload = function(){ setPageStatistics(491,64946); }


  
