function MailMunchBaseForm(e){this.options=e,this.prepared=!1,this.readied=!1,this.dont_show=!1,this.subscribed=!1,this.iframeReady=!1,this.iframeInterval=null,this.viewId=MailMunchHelpers.generateID(),this.formVisible=!1,this.firstResize=!1,this.originalScroll=0,this.firedPixels=[],this.testWidgetIds=[],"undefined"!=typeof _mmunch&&MailMunchHelpers.extendObject(this.options,_mmunch||{})}window.mailmunch={},window.MailMunchWidgets=[],"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var i;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return-1;var r=+t||0;if(1/0===Math.abs(r)&&(r=0),r>=o)return-1;for(i=Math.max(r>=0?r:o-Math.abs(r),0);o>i;){if(i in n&&n[i]===e)return i;i++}return-1});var MailMunchDeviceDetect=function(e){void 0===e&&(e={}),this.init=function(){return this.mm=window.matchMedia,this.mm&&!e.useUA?(this.method="media queries",this.type=t()):(this.method="user agent strings",this.type=r()),e.verbose?[this.type,this.method]:this.type};var t=function(){return n(320)&&o(480)?"smartphone":n(768)&&o(1024)?"tablet":"desktop"},i=function(e,t){return window.matchMedia("screen and ("+e+"-device-width: "+t+"px)").matches},n=function(e){return i("min",e)},o=function(e){return i("max",e)},r=function(){var e=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))?"smartphone":"desktop"};return this.init()},MailMunchAjax={};MailMunchAjax.createCORSRequest=function(e,t){var i=new XMLHttpRequest;return"withCredentials"in i?i.open(e,t,!0):"undefined"!=typeof XDomainRequest?(i=new XDomainRequest,i.open(e,t)):i=null,i},MailMunchAjax.send=function(e,t){var i=MailMunchAjax.createCORSRequest("GET",e);i.onload=function(){var e=i.responseText;t(e,i)},i.onerror=function(){t("[]",i)},i.send()},MailMunchBaseForm.prototype.getHTML=function(){var e=this;if(this.options.widgetUpdatedAt)var t="//a.mailmunch.co/forms-cache/"+this.options.siteID+"/"+this.options.widgetID+"/index-"+this.options.widgetUpdatedAt+".html";else var t="//forms.mailmunch.co/form/"+this.options.siteID+"/"+this.options.widgetID;MailMunchAjax.send(t,function(t){e.loadHTML(t)},"GET",{},!0)},MailMunchBaseForm.prototype._loadHTML=function(e,t){e=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument,e.document.open(),e.document.write(t),e.document.close()},MailMunchBaseForm.prototype.getWidgetId=function(){return this.options.widgetID},MailMunchBaseForm.prototype.inputFocus=function(){},MailMunchBaseForm.prototype.inputBlur=function(){},MailMunchBaseForm.prototype._scrollTo=function(e,t){var i=document.documentElement;this.originalScroll=(window.pageYOffset||i.scrollTop)-(i.clientTop||0),window.scrollTo(e,t)},MailMunchBaseForm.prototype.prepare=function(){},MailMunchBaseForm.prototype._afterPrepare=function(){this.prepared=!0,this.getHTML(),this.options.debug&&MailMunchHelpers.infoLog("Prepared >> "+this.viewId)},MailMunchBaseForm.prototype._fireEvent=function(e){var t="//analytics.mailmunch.co/event/?site_id="+this.options.siteID+"&widget_id="+this.options.widgetID+"&event_name="+e+"&cache="+(new Date).getTime();document.location.href&&(t+="&referrer="+encodeURIComponent(document.location.href)),this.options.visitorId&&(t+="&visitor_id="+this.options.visitorId),MailMunchHelpers.appendImage(t,1,1),this.options.debug&&MailMunchHelpers.infoLog("Fire Event >> "+this.viewId+" >> "+e)},MailMunchBaseForm.prototype._firePixel=function(pixel_code){if(pixel_code&&!(this.firedPixels.indexOf(pixel_code)>=0)){this.firedPixels.push(pixel_code);var divId="mailmunch-pixel-"+MailMunchHelpers.generateID(),div=document.createElement("div");div.id=divId,div.style.display="none",div.innerHTML=pixel_code,document.body.appendChild(div);for(var codes=div.getElementsByTagName("script"),i=0;i<codes.length;i++)eval(codes[i].text);this.options.debug&&MailMunchHelpers.infoLog("Fire Pixel >> "+this.viewId+" >> "+pixel_code)}},MailMunchBaseForm.prototype._beforeShow=function(e){var t=this;return e||!this.dont_show&&!this.subscribed?(this.prepared||this.prepare(),this.iframeReady?(clearInterval(this.iframeInterval),this._fireEvent("views"),this.options.viewPixel&&this._firePixel(this.options.viewPixel),this.options.debug&&MailMunchHelpers.infoLog("Show >> "+this.viewId),!0):(clearInterval(this.iframeInterval),this.iframeInterval=setInterval(function(){t.show(e)},500),!1)):!1},MailMunchBaseForm.prototype.show=function(){},MailMunchBaseForm.prototype.hide=function(){},MailMunchBaseForm.prototype.remove=function(){},MailMunchBaseForm.prototype._beforePreview=function(){var e=this;return this.prepared||this.prepare(),this.iframeReady?(clearInterval(this.iframeInterval),!0):(clearInterval(this.iframeInterval),this.iframeInterval=setInterval(function(){e.preview()},500),!1)},MailMunchBaseForm.prototype.iframeLoaded=function(e,t){this.resizeWidget(e,t),this.iframeReady=!0,this.options.debug&&MailMunchHelpers.infoLog("Iframe Loaded >> "+this.viewId+" width: "+e+" height: "+t)},MailMunchBaseForm.prototype._beforeResize=function(e,t){this.options.iframeWidth=e,this.options.iframeHeight=t,this.options.debug&&MailMunchHelpers.infoLog("Iframe Resized >> "+this.viewId+" width: "+e+" height: "+t)},MailMunchBaseForm.prototype.resizeWidget=function(){},MailMunchBaseForm.prototype.reposition=function(){},MailMunchBaseForm.prototype.userSubscribed=function(e){if(this.subscribed=!0,MailMunchHelpers.setCookie("mailmunch_subscribed_"+this.options.listID,"true",365),this.options.subscribePixel){var t=this.options.subscribePixel;e&&e.email&&(t=t.replace(new RegExp("\\[EMAIL\\]","gi"),e.email)),this._firePixel(t)}if(this.options.subscribeRedirect&&this.options.redirectURL){var i=this.options.redirectURL,n=this.options.redirectDelay||0;setTimeout(function(){document.location.href=i.replace(new RegExp("\\[EMAIL\\]","gi"),e.email)},n)}},MailMunchBaseForm.prototype.init=function(){};var MailMunchHelpers=function(){return{generateID:function(){return(new Date).getTime().toString(16)+parseInt(1e5*Math.random()).toString(16)},inheritPrototype:function(e,t){var i=Object.create(t.prototype);i.constructor=e,e.prototype=i},addEvent:function(e,t,i){e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i)},hasClass:function(e,t){return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:function(e,t){MailMunchHelpers.hasClass(e,t)||(e.className+=" "+t)},removeClass:function(e,t){if(MailMunchHelpers.hasClass(e,t)){var i=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(i," ")}},setCookie:function(e,t,i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var o="expires="+n.toGMTString();document.cookie=e+"="+t+"; "+o+"; path=/"},getScale:function(e){var t=this.getZoomFactor(),i=this.getWindowWidth()*t,n=e.getBoundingClientRect().width*t;return i/n},getCookie:function(e){for(var t=e+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){for(var o=i[n];" "==o.charAt(0);)o=o.substring(1);if(-1!=o.indexOf(t))return o.substring(t.length,o.length)}return""},getParameterByName:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),i=t.exec(location.search);return null==i?"":decodeURIComponent(i[1].replace(/\+/g," "))},getWindowWidth:function(){var e=0;if("number"==typeof window.innerWidth)e=window.innerWidth;else{var t=document.documentElement.clientHeight,i=document.body.clientHeight;e=t>0?t:i}return e},getWindowHeight:function(){var e=0;if("number"==typeof window.innerHeight)e=window.innerHeight;else{var t=document.documentElement.clientHeight,i=document.body.clientHeight;e=t>0?t:i}return e},getDocumentHeight:function(){var e=document.body,t=document.documentElement,i=Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight);return i},getDocumentWidth:function(){var e=document.body,t=document.documentElement,i=Math.max(e.scrollWidth,e.offsetWidth,t.clientWidth,t.scrollWidth,t.offsetWidth);return i},getZoomFactor:function(){var e,t=90==Math.abs(window.orientation);return e=320==window.screen.width?t?480:320:window.screen[t?"height":"width"],e/window.innerWidth},getScrollTop:function(){var e;return"number"==typeof window.pageYOffset?e=window.pageYOffset:document.body&&document.body.scrollTop?e=document.body.scrollTop:document.documentElement&&document.documentElement.scrollTop&&(e=document.documentElement.scrollTop),e},getScrollYPercent:function(){return(this.getScrollTop()+this.getWindowHeight())/this.getDocumentHeight()*100},searchPosts:function(e){return _mmunch.postData.ID==e?!0:!1},searchCategories:function(e){for(var t=_mmunch.postCategories.length,i=0;t>i;i++){if(_mmunch.postCategories[i].name.toString().toLowerCase()==e.toString().toLowerCase())return!0;if(_mmunch.postCategories[i].slug.toString().toLowerCase()==e.toString().toLowerCase())return!0;if(_mmunch.postCategories[i].cat_ID.toString().toLowerCase()==e.toString().toLowerCase())return!0}return!1},isPhone:function(){return"smartphone"==MailMunchDeviceDetect()},isTablet:function(){return"tablet"==MailMunchDeviceDetect()},isDesktop:function(){return"desktop"==MailMunchDeviceDetect()},extendObject:function(e,t){for(var i in t)e[i]=t[i];return e},contains:function(e,t){for(var i=e.length;i--;)if(e[i]===t)return!0;return!1},appendImage:function(e,t,i){var n=document.createElement("img");n.src=e,n.style.display="none",t&&(n.width=t),i&&(n.height=i),document.body.appendChild(n)},loadCss:function(e){if(document.createStyleSheet)document.createStyleSheet(e);else{var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(t)}},getElementsByClassName:function(e,t){if(document.getElementsByClassName)return document.getElementsByClassName(t);for(var i=[],n=new RegExp("(^| )"+t+"( |$)"),o=e.getElementsByTagName("*"),r=0,s=o.length;s>r;r++)n.test(o[r].className)&&i.push(o[r]);return i},forEach:function(e,t,i){for(var n=0,o=e.length;o>n;++n)n in e&&t.call(i,e[n],n,e)},registerLoadEvent:function(e){var t=this;return"complete"===document.readyState||"loaded"==document.readyState||"interactive"==document.readyState?void e():void(document.addEventListener?(document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1),e()},!1),window.addEventListener("load",function(){t.registerLoadEvent(e)},!1)):(document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),e())}),document.documentElement.doScroll&&window==window.top&&!function(){try{document.documentElement.doScroll("left")}catch(t){return void setTimeout(arguments.callee,0)}e()}()),window.addEventListener?window.addEventListener("onload",e,!1):window.attachEvent("onload",e)))},infoLog:function(e){e="MailMunch Info: "+e,"undefined"!=typeof console&&"function"==typeof console.log?console.log(e,""):alert(e)},errorLog:function(e){e="MailMunch Error: "+e,"undefined"!=typeof console&&"function"==typeof console.error?console.error(e,""):alert(e)},fireComplementicsPixel:function(){var e=this.getCookie("_mailmunch_seen_month");""==e&&(this.setCookie("_mailmunch_seen_month","true",30),this.registerLoadEvent(function(){var e=document.createElement("iframe");e.setAttribute("src","//s.thebrighttag.com/tag?site=yri1Ute&mode=iframe"),e.setAttribute("width","1"),e.setAttribute("height","1"),e.style.visibility="hidden",e.style.display="none",document.body.appendChild(e),window._cmpTag=window._cmpTag||[],function(){var e=document.createElement("script");e.async=1,e.src="//static.complementics.com/wt/410/webtag.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()}))}}}();if("undefined"==typeof _mmunch)var _mmunch={};!function(e,t,i,n){var o,r,s=!1;if(!(o=e.jQuery)||i!=o.fn.jquery||n(o,s)){var a=t.createElement("script");a.type="text/javascript",a.src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js",a.onload=a.onreadystatechange=function(){s||(r=this.readyState)&&"loaded"!=r&&"complete"!=r||(n((o=e.jQuery).noConflict(1),s=!0),o(a).remove())},(t.getElementsByTagName("head")[0]||t.documentElement).appendChild(a)}}(window,document,"1.11.3",function($,jquery_loaded){_mmunch.isSecondPageview=MailMunchHelpers.getCookie("mailmunch_second_pageview"),MailMunchHelpers.setCookie("mailmunch_second_pageview","true",365),_mmunch.visitorId=MailMunchHelpers.getCookie("_mailmunch_visitor_id");try{"undefined"!=typeof _mmunch.postCategories&&"string"==typeof _mmunch.postCategories&&(_mmunch.postCategories=$.parseJSON(_mmunch.postCategories)),"undefined"!=typeof _mmunch.postData&&"string"==typeof _mmunch.postData&&(_mmunch.postData=$.parseJSON(_mmunch.postData)),"undefined"!=typeof _mmunch.categoryData&&"string"==typeof _mmunch.categoryData&&(_mmunch.categoryData=$.parseJSON(_mmunch.categoryData))}catch(e){}$(window).on("message",function(e){var t=e.originalEvent.data;if(!("undefined"==typeof t||"undefined"==typeof t.indexOf||t.indexOf("mailmunch-iframe")<0)){var t=$.parseJSON(t);"undefined"!=typeof t.widget_id&&"undefined"!=typeof t.type&&$.each(MailMunchWidgets,function(e,i){return i.getWidgetId()!=t.widget_id?!0:void("loaded"==t.type?i.iframeLoaded(t.width,t.height):"close"==t.type?i.hide():"subscribed"==t.type?i.userSubscribed(t.fields):"resize"==t.type?i.resizeWidget(t.width,t.height):"input-focus"==t.type?i.inputFocus(t.posTop):"input-blur"==t.type&&i.inputBlur(t.posTop))})}});var WidgetLoader={init:function(){this.ready=!1,this.widgets=[],this.chosenVariations=[],this.testWidgetIds={},this.siteSettings=[],this.siteId=this.getSiteId(),this._settingsUrl="",this._euVisitor=!1,this._tracking=!1,this.siteId&&this.initSite()},pageview:function(){this.ready&&(this.widgets=[],this.chosenVariations=[],this.testWidgetIds={},$.each(MailMunchWidgets,function(e,t){t.remove()}),MailMunchWidgets=[],this.prepareWidgets())},getScripts:function(e,t){var i=0;if(i==e.length)return void t();for(var n=function(){i++,i===e.length&&t()},o=0;o<e.length;o++)$.ajax({type:"GET",url:e[o],success:n,dataType:"script",cache:!0})},getSiteId:function(){var e=$("#mailmunch-script");return e.length>0?e.attr("data-mailmunch-site-id"):!1},initSite:function(){var e=this,t="//forms.mailmunch.co/sites/"+this.siteId;_mmunch.visitorId&&(t+="?visitor_id="+_mmunch.visitorId),MailMunchAjax.send(t,function(t,i){var t=$.parseJSON(t);e._settingsUrl=t.timestamp?"//a.mailmunch.co/forms-cache/"+e.siteId+"/settings-"+t.timestamp+".json":"//a.mailmunch.co/forms-cache/"+e.siteId+"/settings.json",e._tracking="1"==i.getResponseHeader("X-MM-Tracking"),e._euVisitor="1"==i.getResponseHeader("X-MM-EU-Continent"),!_mmunch.visitorId&&t.visitorId&&(MailMunchHelpers.setCookie("_mailmunch_visitor_id",t.visitorId,365),_mmunch.visitorId=t.visitorId),t.load&&e.loadSiteSettings()})},loadSiteSettings:function(){var e=this;MailMunchAjax.send(e._settingsUrl,function(t,i){var t=$.parseJSON(t);e.siteSettings=t.widgets,e.prepareWidgets(),"function"==typeof i.getResponseHeader&&(!e._tracking||e._euVisitor||t.premium||MailMunchHelpers.fireComplementicsPixel())})},prepareWidgets:function(){var e=this,t=this.siteSettings;return t.length>0&&($.each(t,function(t,i){return e.shouldLoadWidget(i)?void e.widgets.push(i):!0}),e.widgets.length>0)?(e.chooseVariations(),e.loadWidgetTypes(),void e.loadRecaptcha()):void(this.ready=!0)},shouldLoadWidget:function(e){var t=!0;return this.isEnabledOnDevice(e)||(t=!1),this.isEnabledOnPage(e)||(t=!1),t},loadWidgetTypes:function(){var e=this,t=$.map(this.widgets,function(e){return e.type}),i=$.grep(t,function(e,i){return null!=e&&i===$.inArray(e,t)});if(0==i.length)return void(this.ready=!0);var n=$.map(i,function(e){return"undefined"!=typeof window["MailMunch"+e]?null:"//a.mailmunch.co/app/v1/"+e.toLowerCase()+".js"});this.getScripts(n,function(){e.loadWidgets()})},loadWidgets:function(){var e=this;$.each(this.widgets,function(t,i){e.loadWidget(i)}),this.ready=!0},loadWidget:function(e){var t=this;if(this.isBeingUsed(e)){var i=!0;$.inArray(e.id,t.chosenVariations)>-1&&(i=!1);var n=this.testWidgetIds[e.widget_test_id],o=new window["MailMunch"+e.type](e.settings);i&&(o.dont_show=!0),MailMunchHelpers.registerLoadEvent(function(){MailMunchWidgets.push(o),n&&(o.testWidgetIds=n),o.init()})}},chooseVariations:function(){var e=this,t=$.grep(this.widgets,function(e){return null==e.widget_test_id});this.chosenVariations=$.map(t,function(e){return e.id});var i=$.map(this.widgets,function(e){return e.widget_test_id}),n=$.grep(i,function(e,t){return null!=e&&t===$.inArray(e,i)});$.each(n,function(t,i){var n=$.grep(e.widgets,function(e){return e.widget_test_id==i}),o=$.map(n,function(e){return e.id}),r=n[Math.floor(Math.random()*n.length)];e.chosenVariations.push(r.id),e.testWidgetIds[i]=$.grep(o,function(e){return e!=r.id})})},loadRecaptcha:function(){if("undefined"!=typeof grecaptcha)return!0;var e=!1;$.each(this.widgets,function(t,i){i.settings&&1==i.settings.recaptcha&&(e=!0)}),e&&$.ajax({type:"GET",url:"https://www.google.com/recaptcha/api.js",dataType:"script",cache:!0})},isEnabledOnDevice:function(e){var t=!0;return(!MailMunchHelpers.isDesktop()||e.settings.desktopSupported&&e.settings.desktopEnabled)&&(!MailMunchHelpers.isPhone()||e.settings.mobileSupported&&e.settings.mobileEnabled)?!MailMunchHelpers.isTablet()||e.settings.tabletSupported&&e.settings.tabletEnabled||(t=!1):t=!1,t},isEnabledOnPage:function(widget){var display_rules=widget.settings.display_rules;return MailMunchHelpers.getParameterByName("mailmunch_preview")==widget.id||eval(display_rules)?!0:!1},isBeingUsed:function(e){var t=!0,i=$.inArray(e.id,this.chosenVariations)>-1;return i||(t=!1,$('*[href^="#mailmunch-pop-'+e.id+'"]').length>0&&(t=!0),$(".mailmunch-pop-"+e.id).length>0&&(t=!0),$(".mailmunch-forms-widget-"+e.id).length>0&&(t=!0),$(".mailmunch-wordpress-widget-"+e.id).length>0&&(t=!0)),t}};window.mailmunch.pageview=function(){WidgetLoader.pageview()},MailMunchHelpers.loadCss("//a.mailmunch.co/app/v1/styles.css"),WidgetLoader.init()});