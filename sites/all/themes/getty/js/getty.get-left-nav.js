// 12-3-2015:  This js renders the left nav for the responsive template (detail page)  

var myJSONObject = "";
var gHtmlOut = "";

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function RenderNavLevel() {
	var navPathNames = arguments[0];
	var navPos = arguments[1];
	var navClass = arguments[2];
	var navObjIdx = arguments[3];
	// console.log ("RenderNavLevel() navPathNames: " + navPathNames + " navPathNames[navPos]:" + navPathNames[navPos] + " navPos:" + navPos + " navClass: " + navClass + " navObjIdx: " + navObjIdx); 
	var ulTag = "";
	var linePrepend = "";
	if (navPathNames.length >= navPos) {
	// console.log (" here1 " ); 
		if  (navPos == 1) {
			linePrepend = "h4";
			}
		else if  (navPos == 2) {
			ulTag += '<ul class="side-nav">';
			linePrepend = "li";
			}
		else if (navClass == "active") {
			//console.log (" check navpos: "+ navPos + " against next navpos: " + myJSONObject.nav.nav_element[navObjIdx + 1]["@position"] ); 
			ulTag += '<ul class="side-nav-opened">';
			linePrepend = "li";
			}
		// console.log (" here2 " ); 	
		if (ulTag || navPos == 1) {
			gHtmlOut += ulTag;
			//if(navObjIdx) {navObjIdx++}; //increment this if it's NOT zero, the first element.  If it's not zero it has been called recursively 
			// console.log (" here3 " ); 	
			// console.log (" navObjIdx: " + navObjIdx + " navPos: " + navPos + " myJSONObject.nav.nav_element[navObjIdx][@position]: " + myJSONObject.nav.nav_element[navObjIdx]["@position"] ); 	
			for (;navObjIdx < myJSONObject.nav.nav_element.length && myJSONObject.nav.nav_element[navObjIdx]["@position"] >= navPos; navObjIdx++) {
				// console.log ("navObjIdx: " + navObjIdx + " myJSONObject.nav.nav_element[navObjIdx][@name]: " + myJSONObject.nav.nav_element[navObjIdx]["@name"] + " myJSONObject.nav.nav_element[navObjIdx][@position]: " + myJSONObject.nav.nav_element[navObjIdx]["@position"] ); 
				navClass = "";
				if (myJSONObject.nav.nav_element[navObjIdx]["@position"] == navPos ) {
					//console.log ("namecheck navPathNames[navPos]: " + navPathNames[navPos] + "  myJSONObject.nav.nav_element[navObjIdx][@name]: " + myJSONObject.nav.nav_element[navObjIdx]["@name"]  ); 
					var  navPathName = decodeHtml(navPathNames[navPos])  ;
					navPathName.replace("&lt;","<");
					navPathName.replace("&gt;",">");
					var  navObjNavPathName = decodeHtml(myJSONObject.nav.nav_element[navObjIdx]["@name"] )  ;
					// console.log ("namecheck2 navPathName: " + navPathName + "  navObjNavPathName: " + navObjNavPathName  ); 
					if (navObjNavPathName == navPathName) {
						navClass = "active";
						}
					if (navPos == 1 && navClass != "active" ) {
						continue;
						}	
					// console.log (" navClass: " + navClass + "  myJSONObject.nav.nav_element[navObjIdx][@left_nav]: " +   myJSONObject.nav.nav_element[navObjIdx]["@left_nav"]  ); 	
					//gHtmlOut += '<' + linePrepend + '><a class="'+ navClass +'" href="' + myJSONObject.nav.nav_element[navObjIdx].url["$t"] + '">' + myJSONObject.nav.nav_element[navObjIdx]["@name"]  + '</a>';
					if (myJSONObject.nav.nav_element[navObjIdx]["@left_nav"] == "t" || (myJSONObject.nav.nav_element[navObjIdx]["@left_nav"] == "v" && navClass == "active" )) {
					   gHtmlOut += '<' + linePrepend + '><a class="'+ navClass +'" href="' + myJSONObject.nav.nav_element[navObjIdx].url["$t"] + '">' + navObjNavPathName  + '</a>';
						}
					if (navPos == 1) {gHtmlOut += '</' + linePrepend + '>'};
					if (navPathNames.length >= (navPos + 1)  && navClass == "active") {
						navObjIdx++;
						navObjIdx = RenderNavLevel(navPathNames,navPos + 1,navClass, navObjIdx );
						}
					if (navPos != 1) {gHtmlOut += '</' + linePrepend + '>'};	
					if (navPos == 1 && navClass == "active" ) {
						break;
						}	
					}
				}	
			navObjIdx--;	//decrement idx so that parent loop can capture indexed object
			nav_class = "";
			if(ulTag) {
				gHtmlOut += "</ul>";
				}
			}
		}
	return(navObjIdx);	
}
/*
$(function() {
	$.ajax({
		dataType: "json",
		url: "/global/nav/" + navArray[0] + ".json",
		success: function(jsonObj) {
			myJSONObject = jsonObj;
			RenderNavLevel(navArray ,1,"",0);
			var element = document.getElementById("left-nav");
			element.innerHTML = gHtmlOut;
			}
		});
});	
*/