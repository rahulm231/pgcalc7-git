(function(){
try {

	// Todo: Add Debug code tied to location.search

    if(gnp_settings === undefined) {
         var gnp_settings = {};
    }
    
    if(gnp_request === undefined) {
    	var gnp_request = {};    	
    }
    
   if( "background-color" in gnp_settings) {
       var bgcolor = gnp_settings["background-color"]
   } else {
       var bgcolor = "white";
   }
      
   if( "link-color" in gnp_settings) {
       var linkColor = gnp_settings["link-color"]
   } else {
       var linkColor = "#0009A8";
   }
   
   if( "css-wildcard-reset" in gnp_settings) {
      var wildCardReset = gnp_settings["css-wildcard-reset"];
   } else {
      var wildCardReset = false; 
   }
   
   if( "theme" in gnp_settings) {
      var gnp_theme = gnp_settings["theme"];
   } else {
      var gnp_theme = "default";
   }
   
   
   
   var clear = "background: #FFF;\
   border: none;\
   color: " + bgcolor + ";\
   display: block;\
   font: normal;\
   height: auto;\
   letter-spacing: normal;\
   line-height: normal;\
   margin: 0;\
   padding: 0;\
   text-transform: normal;\
   visibility: visible;\
   width: auto;\
   word-spacing: normal;\
   z-index: auto;";
   
   var def = "                     \
   <style>";
   
   if(wildCardReset) {
        def += "div.gnp_top_rated_badge * { " + clear + "} ";
   }
   
   def += "\
       div.gnp_trb {\
           visibility:visible;\
           text-align:center;\
           display:inline-block;\
           background-color:" + bgcolor + ";\
          }\
       div.gnp_trb br { display:none; }\
       div.gnp_trb span.gnp_lb {\
           display:block;\
           height:17px;\
           text-align:center;\
           color:" + linkColor + "!important;\
       }\
       div.gnp_trb span.gnp_lb a{\
           font-family:'HelveticaNeue-Light','Helvetica Neue Light','Helvetica Neue',Helvetica,Arial;\
           display:inline-block;\
           font-weight:bold;\
           font-size:13px;\
           color:" + linkColor + "!important;\
       }\
   </style>\
   <!-- Default Style -->";
   
   if((typeof gnp_theme) == "string") {
       switch(gnp_theme) {   
       case 'none':
           // no css output. Completly user provided.  
           break;      
       case 'default':
       default:
           document.write(def);   
           break;
       }
   }
} catch (err) {
/*debugt logic here ; ) */
	
}
})()