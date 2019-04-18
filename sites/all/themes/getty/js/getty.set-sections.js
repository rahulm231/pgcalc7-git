// 6-24-2014: this file is a copy of /global/jscript/nav/topnav.js, just renamed to set-section.js for the newly recreated responsive templates.

var url = document.URL;
var rootPath = url.replace(/(\w+):\/\/teamsite(\.getty\.edu)?\/iw\/cci\/meta\/no-injection\/iw-mount\/\w+\/main\/\w+\/WORKAREA\/\w+|(\w+):\/\/teamsite(\.getty\.edu)?\/iw-mount\/\w+\/main\/\w+\/WORKAREA\/\w+|(\w+):\/\/teamsite(\.getty\.edu)?\/iw\/cci\/meta\/no-injection\/iw-mount\/\w+\/main\/\w+\/STAGING|(\w+):\/\/teamsite(\.getty\.edu)?\/iw-mount\/\w+\/main\/\w+\/STAGING|(\w+):\/\/(\w+)/, "");
var dirs = rootPath.split("/");
var gSection = "";
var gSectionPrefix = "";
var gSectionSubNavNode = "";
var gSectionName = "";
var gAllowLytebox = 1;
// dirs[1] = "research";
var sections = new Array("home", "visit", "museum", "research", "conservation", "foundation", "about"); //these values should reflect the actual dir. (the trust tab is really about, because that's the dir everything lives in)

if (url.indexOf("search.getty.edu") > -1 ) {
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";
	gAllowLytebox = 1;
	}
else if (dirs[1] == "research") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	gSectionPrefix = "gri";
	gSectionName = "The Getty Research Institute";
	}
else if (dirs[1] == "conservation") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	gSectionPrefix = "gci";
	gSectionName = "The Getty Conservation Institute";
	}	
else if (dirs[1] == "about") { 
	gSection = "about";
	gSectionSubNavNode = dirs[2];
	if (gSectionSubNavNode == "mission.html") { gSectionSubNavNode = "mission"  };
	if (gSectionSubNavNode == "contact_us.html") { gSectionSubNavNode = "contact_us"  };
	gSectionPrefix = "trust";
	gSectionName = "The Getty";	
	}
else if (dirs[1] == "news" ) { 
	gSection = "trust";
	gSectionSubNavNode = "news";
	gSectionPrefix = "trust";
	gSectionName = "The Getty Trust";		
	}	
else if (dirs[1] == "visit") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	gSectionPrefix = "visit";
	gSectionName = "Visit";		
	}	
else if (dirs[1] == "mygetty") { 
	gSection = "museum";
	gSectionSubNavNode = "art";
	//gSectionSubNavNode = (gSectionSubNavNode == "mygetty") ?  "art" : gSectionSubNavNode;
	gSectionPrefix = "museum";
	gSectionName = "The J. Paul Getty Museum";		
	}	
else if (dirs[1] == "art") { 
	gSection = "museum";
	gSectionSubNavNode = dirs[2];
	gSectionSubNavNode = (!gSectionSubNavNode || gSectionSubNavNode == "index.html" || gSectionSubNavNode == "gettyguide") ?  "art" : gSectionSubNavNode;
	gSectionPrefix = "museum";	
	gSectionName = "The J. Paul Getty Museum";
	}		
else if (dirs[1] == "education") { 
	gSection = "museum";
	gSectionSubNavNode = "education";
	//if (gSectionSubNavNode == "about.html") { gSectionSubNavNode = "about"  };
	gSectionPrefix = "museum";
	gSectionName = "The J. Paul Getty Museum";	
	}		
else if (dirs[1] == "museum") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	if (gSectionSubNavNode == "about.html") { gSectionSubNavNode = "about"  };
	if (gSectionSubNavNode == "symposia") { gSectionSubNavNode = "research"  };
	if (gSectionSubNavNode == "conservation") { gSectionSubNavNode = "research"  };
	gSectionPrefix = "museum";
	gSectionName = "The J. Paul Getty Museum";	
	}			
else if (dirs[1] == "foundation") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	gSectionPrefix = "foundation";
	gSectionName = "The Getty Foundation";	
	}	
else if (dirs[1] == "grants") { 
	gSection = "foundation";
	gSectionSubNavNode = "grants";
	gSectionPrefix = "foundation";
	gSectionName = "The Getty Foundation";		
	}	
else if ((!dirs[1]) || (dirs[1] == "index.html")) { 
	gSection = "home";
	//gSectionSubNavNode = dirs[2];
	gSectionPrefix = "home";
	gSectionName = "The Getty";	
	}
else if (dirs[1] == "subscribe") { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";	
	}
else if (dirs[1] == "legal") { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";	
	}
else if (dirs[1] == "staff") { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";	
	}
else if (dirs[1] == "osip") { 
	gSection = "osip";
	gSectionSubNavNode = dirs[2];
	gSectionPrefix = "osip";
	gSectionName = "OSIP";	
	}
else if (dirs[1] == "podcasts") { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";		
	}
else if (dirs[1] == "cgi-bin") { 
	gSectionSubNavNode = dirs[2];
	gAllowLytebox = 0;
	if (gSectionSubNavNode == "trippack") { 
		gSection = "museum";  
		gSectionSubNavNode = "education";  
		gSectionPrefix = "museum";
		gSectionName = "The J. Paul Getty Museum";		   
		}
	}
else if (dirs[1] == "publications") { 
	gSection = dirs[1];
	gSectionSubNavNode = dirs[2];
	var idx = gSectionSubNavNode.indexOf('.html');
	if (idx > -1) {
		gSectionSubNavNode = gSectionSubNavNode.substring(0,idx);
		}
	gSectionPrefix = "publications";
	gSectionName = "Getty Publications";	
	}		
else if (dirs[1] == "Search" || dirs[1] == "search" ) { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";			
	}
else if (dirs[1] == "global" && dirs[2] =="connect.html") {
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "connect";
	gSectionName = "Connect With Us";
}		
else { 
	gSection = "home";
	gSectionSubNavNode = "";
	gSectionPrefix = "home";
	gSectionName = "The Getty";			
	}				
//gSectionSubNavNode = (gSectionSubNavNode == "index.html") ? "" : gSectionSubNavNode;	

// 8/19/16 - this is temporary placement for calendar datepicker code 

	function getDateX(incr) {
		var now = new Date();
		var mm = now.getMonth() + 1;
		var mms = "" + mm;
		if(mms.length < 2 ){
			mms = "0" + mms;
			}
		var dd = now.getDate() + incr;
		var dds = "" + dd;
		if(dds.length < 2 ){
			dds = "0" + dds;
			}
		return ( now.getFullYear() + mms + dds );
	}	
    
	$(function() {
		if (gSection == "visit") {
			var currDayString = getDateX(0);
			//console.log( "currDayString: " + currDayString ); 
			$("#mini-cal td span").each(function() {
				var html = $(this).html();
				var spanclass = $(this).attr('class');
				var date = html.substring(25,33);
				var idx = html.indexOf("</b>");
				var daystring = html.substring(40,idx+4);    
				//console.log ( "html:" + html + " spanclass:" + spanclass + " date:" + date + " daystring:" + daystring);
				if (date && currDayString > date) {
					$(this).html(daystring);
					$(this).removeClass("page");
					$(this).addClass("gray");
					}
			});	
		}
	});
// this is end of temporary calendar datepicker code	
