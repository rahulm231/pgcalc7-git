var MonoTypeWebFonts={};MonoTypeWebFonts.addEvent=function(e,n){if("undefined"!=typeof MonoTypeWebFonts.loadFonts)MonoTypeWebFonts.addEvent(e,n);else{var o=this;setTimeout(function(){o.addEvent(e,n)},0)}};mti_loadScript( function () {if(window.addEventListener){  window.addEventListener('load', function(){MonoTypeWebFonts.cleanup();}, false);}else if(window.attachEvent){  window.attachEvent('onload', function(){MonoTypeWebFonts.cleanup();});}MonoTypeWebFonts.loadColo = function(){};MonoTypeWebFonts.cleanupExecuted = false;MonoTypeWebFonts.cleanup = function(){if(MonoTypeWebFonts.cleanupExecuted === true){ return; }MonoTypeWebFonts.cleanupExecuted = (window['mti_element_cache'].length > 0);var className = document.documentElement.className;var MTIConfig = window['MTIConfig'] || { 'RemoveMTIClass': false };if(MTIConfig['RemoveMTIClass']==true){eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 l(2,n){n(2);2=2.D;r(2){l(2,n);2=2.A}}8 e(4){9(j.e){o j.e(4)}x{5 k=[];l(j.I,8(2){5 a,c=2.4,i;9(c){a=c.z(\' \');p(i=0;i<a.f;i++){9(a[i]===4){k.F(2);J}}}});o k}}H(8(){5 3=e(\'m\');5 u=E.K;5 h=u.B(),C=8(t){o h.G(t)>-1},b=(!(/R|T/i.q(h))&&/S\\s(\\d)/.q(h)),c=L;9((v.$1==6)||(v.$1==7)){c=Q}r(3.f>0){p(5 i=0;i<3.f;i++){5 w=3[i].4.z(\' \');9(w.f==1&&!c){3[i].M(\'N\')}x{3[i].4=3[i].4.y(/m/O,\' \').y(/^\\s+|\\s+$/g,\'\')}}3=e(\'m\')}},P);',56,56,'||node|mti_elements|className|var|||function|if|||||getElementsByClassName|length||ua||document|results|walkTheDOM|mti_font_element|func|return|for|test|while||||RegExp|classList|else|replace|split|nextSibling|toLowerCase|is|firstChild|navigator|push|indexOf|setTimeout|body|break|userAgent|false|removeAttribute|class|ig|40000|true|opera|msie|webtv'.split('|'),0,{}))}className = className;if(!document.getElementById('MonoTypeFontApiFontTracker')){eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5 3="6://j.i.z/t/1.7";a(k.l.h==\'8:\'){3=3.g(/6:/,\'8:\')}5 b=9.d(\'e\')[0];5 2=9.v(\'w\');a(2){2.4(\'y\',\'u\');2.4(\'s\',\'o/7\');2.4(\'q\',\'r\');2.4(\'f\',3+"?p=x&n=m");b.c(2)}',36,36,'||cssEle|fontTrackingUrl|setAttribute|var|http|css|https|document|if|head|appendChild|getElementsByTagName|HEAD|href|replace|protocol|fonts|fast|window|location|a8fc2843-7305-43ae-a2ed-084547973cec|projectid|text|apiType|rel|stylesheet|type||MonoTypeFontApiFontTracker|createElement|LINK|js|id|net'.split('|'),0,{}))}window['mti_element_cache'] = [];};MonoTypeWebFonts._fontActiveEventList = [];MonoTypeWebFonts._fontLoadingEventList = [];MonoTypeWebFonts._activeEventList = [];MonoTypeWebFonts._inActiveEventList = [];MonoTypeWebFonts.addEvent = function(eventName, callbackFunction){   if(eventName.toLowerCase() == 'fontactive'){      MonoTypeWebFonts._fontActiveEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'fontloading'){      MonoTypeWebFonts._fontLoadingEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'inactive'){      MonoTypeWebFonts._inActiveEventList.push(callbackFunction);  }else if(eventName.toLowerCase() == 'active'){      MonoTypeWebFonts._activeEventList.push(callbackFunction);  }};MonoTypeWebFonts.loadFonts = function(){MonoTypeWebFonts.load({monotype:{efg:false, reqSub:false, enableOtf: false, otfJsParentUrl: 'https://fast.fonts.net/jsapi/otjs/', pfL:[{'fontfamily' : "Proxima N W01 Reg" ,contentIds :{EOT: '7e90123f-e4a7-4689-b41f-6bcfe331c00a',WOFF: 'e56ecb6d-da41-4bd9-982d-2d295bec9ab0',WOFF2: '64017d81-9430-4cba-8219-8f5cc28b923e',TTF: '2aff4f81-3e97-4a83-9e6c-45e33c024796',SVG: 'ab9cd062-380f-4b53-b1a7-c0bec7402235'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 Reg It" ,contentIds :{EOT: 'bc15a635-a09b-40d1-a5c4-70310166177d',WOFF: '9c69c878-2255-4027-8632-ed3635cddf45',WOFF2: '129d49d6-5492-4ed1-96f7-0528c6d53abc',TTF: 'b7eb3871-e910-4522-9982-effb425a2714',SVG: 'a0d89860-20e5-4bc0-b6c5-eae8ae0ebbbf'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 Smbd" ,contentIds :{EOT: '87e4b4fc-cdf1-450a-8bed-dd818cba908d',WOFF: '70ae52ec-d89b-4c6a-9402-854ebe423c54',WOFF2: 'ae47a7f5-89da-4879-b934-29722c3dd451',TTF: '6a35571c-ea14-4dac-9ae1-0e7af0abeec8',SVG: 'ac2bdafc-d4a8-49d0-8a10-4e2f16bf7e3c'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 Smbd It" ,contentIds :{EOT: '06ebb3e2-5f11-4e26-8736-0f7acb3c7743',WOFF: 'd2a02f92-9826-4117-ae36-8fcfd72ad46e',WOFF2: 'df119bf8-cb81-4373-9682-6054d9dd0770',TTF: 'd786d7d1-696a-47f9-9d03-7608fcb29cc4',SVG: 'e7fe23f1-b364-4a20-905a-86ed7e89efae'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 Bold" ,contentIds :{EOT: 'fbc6b03a-b3a1-427c-a884-053deca3a53c',WOFF: 'd999c07b-a049-4eb5-b8a6-4f36ae25e67e',WOFF2: '0d416408-95c6-4ad7-b08d-e60573d3b37d',TTF: '4d4a75f5-d32a-4a09-8665-133afd39cc37',SVG: '8152bc4e-d700-4c78-b6be-326893e6f53f'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 Bold It" ,contentIds :{EOT: 'cb0c3396-af1a-4c16-95aa-8085e21044c7',WOFF: '46d5674a-f287-4240-b87a-f207aeb83064',WOFF2: 'a6315c03-b55d-42b0-8ed6-79060867137d',TTF: '9bd640b2-9a56-4391-b213-767ae9c30ef4',SVG: '1500822b-1abc-4461-81dd-b48cfcf99020'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "Proxima N W01 X Cd Thin" ,contentIds :{EOT: '852d65c0-77b1-4088-a1ab-46e290c5bd46',WOFF: '0c30b89e-ab7f-4a19-9380-d5cde939ca7b',WOFF2: 'c54f9dbd-9780-47f5-9d1c-ce0f9e3af84a',TTF: 'da55c773-bb34-438c-9957-3c7b1cd58a1a',SVG: 'cbac01b4-d85a-4034-a575-e4059ddf49ce'}, enableSubsetting : false, enableOtf: false},{'fontfamily' : "ProximaNW01-XCdLight" ,contentIds :{EOT: '85f593b2-a19e-4063-8ab7-d255724eedb8',WOFF: '760a6dc8-a841-4553-b5c5-fc38c01fcd69',WOFF2: 'cbdc3c41-c647-4067-9db4-1b7cdb7cfeb5',TTF: 'd32be61e-ce8d-48f5-8134-f087b9cb7a7e',SVG: '4fbc492d-335c-4035-a815-a2325fa8d4be'}, enableSubsetting : false, enableOtf: false}],selectorFontMap:{},ck:'d44f19a684109620e484157ba090e818688d8bf24d3529f63db63c195c73da5a024461d156357fd1ce4a5e86ac3095a021bfce4d09891d07df187f6104b66e512b08b6bec876a1e5e34c7caa87859d217e418d58326a8d9f750aa52e2576528b34257400d904438c1b3fd3e590c3ab663efdcd6186b26a5554c1295cd9a3fe',fcURL:'http://fast.fonts.net/dv2/',env:'',projectId:'a8fc2843-7305-43ae-a2ed-084547973cec',EOD:null},fontloading:function(fontFamily, fontDescription){  for(var i=0; i<MonoTypeWebFonts._fontLoadingEventList.length; i++){      MonoTypeWebFonts._fontLoadingEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);  }},fontactive:function(fontFamily, fontDescription) {  for(var i=0; i<MonoTypeWebFonts._fontActiveEventList.length; i++){      MonoTypeWebFonts._fontActiveEventList[i].call(MonoTypeWebFonts, fontFamily, fontDescription);  }},inactive:function(){  MonoTypeWebFonts.cleanup();  for(var i=0; i<MonoTypeWebFonts._inActiveEventList.length; i++){      MonoTypeWebFonts._inActiveEventList[i].call(MonoTypeWebFonts);  }},active:function(){  MonoTypeWebFonts.cleanup();  for(var i=0; i<MonoTypeWebFonts._activeEventList.length; i++){      MonoTypeWebFonts._activeEventList[i].call(MonoTypeWebFonts);  }}});};try {MonoTypeWebFonts.loadFonts(); } catch (e) {}setTimeout(function(){ MonoTypeWebFonts.cleanup(); }, 40000);});function mti_loadScript(a) { "undefined"!=typeof MTIConfig&&1==MTIConfig.EnableCustomFOUTHandler&&(document.documentElement.style.visibility="hidden");var mti_coreJsURL="https://fast.fonts.net/jsapi/core/mt.js";var env="";var UA=navigator.userAgent.toLowerCase(),isIE8=-1!=UA.indexOf("msie")?parseInt(UA.split("msie")[1]):!1;isIE8&&(mti_coreJsURL="https://fast.fonts.net/jsapi/core/mti.js");"undefined"!=typeof MTIConfig&&1==MTIConfig.EnableDSForAllFonts&&(mti_coreJsURL=isIE8?"https://fast.fonts.net/jsapi/core/mti_cjk.js":"https://fast.fonts.net/jsapi/core/mt_cjk.js");if("undefined"!=typeof MTIConfig&&"undefined"!=typeof MTIConfig.version&&""!=MTIConfig.version){var fileName=mti_coreJsURL.split("/").pop();mti_coreJsURL="https://fast.fonts.net/jsapi/core/"+MTIConfig.version+"/"+fileName}var b=document.createElement("script");b.type="text/javascript",b.readyState?b.onreadystatechange=function(){("loaded"==b.readyState||"complete"==b.readyState)&&(b.onreadystatechange=null,a())}:b.onload=function(){a()},b.src=mti_coreJsURL,document.getElementsByTagName("head")[0].appendChild(b);};