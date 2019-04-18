/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-multiplebgs-opacity-rgba-textshadow-csscolumns-generatedcontent-cssgradients-canvas-canvastext-draganddrop-input-inputtypes-svg-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function L(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(k),g.offsetWidth,e=k.value!=l,g.removeChild(k)):e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.5.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e});var K=function(c,d){var f=c.join(""),g=d.length;y(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9,e.generatedcontent=(j.generatedcontent&&j.generatedcontent.offsetHeight)>=1,e.fontface=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",n.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join(""),['#generatedcontent:after{content:"',l,'";visibility:hidden}'].join("")],["fontface","touch","generatedcontent"]);s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.touch=function(){return e.touch},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.fontface=function(){return e.fontface},s.generatedcontent=function(){return e.generatedcontent},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect};for(var M in s)C(s,M)&&(x=M.toLowerCase(),e[x]=s[M](),v.push((e[x]?"":"no-")+x));return e.input||L(),D(""),i=k=null,function(a,b){function g(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function h(){var a=k.elements;return typeof a=="string"?a.split(" "):a}function i(a){var b={},c=a.createElement,e=a.createDocumentFragment,f=e();a.createElement=function(a){var e=(b[a]||(b[a]=c(a))).cloneNode();return k.shivMethods&&e.canHaveChildren&&!d.test(a)?f.appendChild(e):e},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+h().join().replace(/\w+/g,function(a){return b[a]=c(a),f.createElement(a),'c("'+a+'")'})+");return n}")(k,f)}function j(a){var b;return a.documentShived?a:(k.shivCSS&&!e&&(b=!!g(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),f||(b=!i(a)),b&&(a.documentShived=b),a)}var c=a.html5||{},d=/^<|^(?:button|form|map|select|textarea)$/i,e,f;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>",e="hidden"in a,f=a.childNodes.length==1||function(){try{b.createElement("a")}catch(a){return!0}var c=b.createDocumentFragment();return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"}()})();var k={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:j};a.html5=k,j(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return o.call(a)=="[object Function]"}function e(a){return typeof a=="string"}function f(){}function g(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function h(){var a=p.shift();q=1,a?a.t?m(function(){(a.t=="c"?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){a!="img"&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l={},o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};y[c]===1&&(r=1,y[c]=[],l=b.createElement(a)),a=="object"?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),a!="img"&&(r||y[c]===2?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i(b=="c"?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),p.length==1&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&o.call(a.opera)=="[object Opera]",l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return o.call(a)=="[object Array]"},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,i){var j=b(a),l=j.autoCallback;j.url.split(".").pop().split("?").shift(),j.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]||h),j.instead?j.instead(a,e,f,g,i):(y[j.url]?j.noexec=!0:y[j.url]=1,f.load(j.url,j.forceCSS||!j.forceJS&&"css"==j.url.split(".").pop().split("?").shift()?"c":c,j.noexec,j.attrs,j.timeout),(d(e)||d(l))&&f.load(function(){k(),e&&e(j.origUrl,i,g),l&&l(j.origUrl,i,g),y[j.url]=2})))}function i(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var j,l,m=this.yepnope.loader;if(e(a))g(a,0,m,0);else if(w(a))for(j=0;j<a.length;j++)l=a[j],e(l)?g(l,0,m,0):w(l)?B(l):Object(l)===l&&i(l,m);else Object(a)===a&&i(a,m)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
/*
 * jQuery FlexSlider v2.6.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function(a){var b=!0;a.flexslider=function(c,d){var e=a(c);e.vars=a.extend({},a.flexslider.defaults,d);var k,f=e.vars.namespace,g=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,h=("ontouchstart"in window||g||window.DocumentTouch&&document instanceof DocumentTouch)&&e.vars.touch,i="click touchend MSPointerUp",j="",l="vertical"===e.vars.direction,m=e.vars.reverse,n=e.vars.itemWidth>0,o="fade"===e.vars.animation,p=""!==e.vars.asNavFor,q={};a.data(c,"flexslider",e),q={init:function(){e.animating=!1,e.currentSlide=parseInt(e.vars.startAt?e.vars.startAt:0,10),isNaN(e.currentSlide)&&(e.currentSlide=0),e.animatingTo=e.currentSlide,e.atEnd=0===e.currentSlide||e.currentSlide===e.last,e.containerSelector=e.vars.selector.substr(0,e.vars.selector.search(" ")),e.slides=a(e.vars.selector,e),e.container=a(e.containerSelector,e),e.count=e.slides.length,e.syncExists=a(e.vars.sync).length>0,"slide"===e.vars.animation&&(e.vars.animation="swing"),e.prop=l?"top":"marginLeft",e.args={},e.manualPause=!1,e.stopped=!1,e.started=!1,e.startTimeout=null,e.transitions=!e.vars.video&&!o&&e.vars.useCSS&&function(){var a=document.createElement("div"),b=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var c in b)if(void 0!==a.style[b[c]])return e.pfx=b[c].replace("Perspective","").toLowerCase(),e.prop="-"+e.pfx+"-transform",!0;return!1}(),e.ensureAnimationEnd="",""!==e.vars.controlsContainer&&(e.controlsContainer=a(e.vars.controlsContainer).length>0&&a(e.vars.controlsContainer)),""!==e.vars.manualControls&&(e.manualControls=a(e.vars.manualControls).length>0&&a(e.vars.manualControls)),""!==e.vars.customDirectionNav&&(e.customDirectionNav=2===a(e.vars.customDirectionNav).length&&a(e.vars.customDirectionNav)),e.vars.randomize&&(e.slides.sort(function(){return Math.round(Math.random())-.5}),e.container.empty().append(e.slides)),e.doMath(),e.setup("init"),e.vars.controlNav&&q.controlNav.setup(),e.vars.directionNav&&q.directionNav.setup(),e.vars.keyboard&&(1===a(e.containerSelector).length||e.vars.multipleKeyboard)&&a(document).bind("keyup",function(a){var b=a.keyCode;if(!e.animating&&(39===b||37===b)){var c=39===b?e.getTarget("next"):37===b&&e.getTarget("prev");e.flexAnimate(c,e.vars.pauseOnAction)}}),e.vars.mousewheel&&e.bind("mousewheel",function(a,b,c,d){a.preventDefault();var f=b<0?e.getTarget("next"):e.getTarget("prev");e.flexAnimate(f,e.vars.pauseOnAction)}),e.vars.pausePlay&&q.pausePlay.setup(),e.vars.slideshow&&e.vars.pauseInvisible&&q.pauseInvisible.init(),e.vars.slideshow&&(e.vars.pauseOnHover&&e.hover(function(){e.manualPlay||e.manualPause||e.pause()},function(){e.manualPause||e.manualPlay||e.stopped||e.play()}),e.vars.pauseInvisible&&q.pauseInvisible.isHidden()||(e.vars.initDelay>0?e.startTimeout=setTimeout(e.play,e.vars.initDelay):e.play())),p&&q.asNav.setup(),h&&e.vars.touch&&q.touch(),(!o||o&&e.vars.smoothHeight)&&a(window).bind("resize orientationchange focus",q.resize),e.find("img").attr("draggable","false"),setTimeout(function(){e.vars.start(e)},200)},asNav:{setup:function(){e.asNav=!0,e.animatingTo=Math.floor(e.currentSlide/e.move),e.currentItem=e.currentSlide,e.slides.removeClass(f+"active-slide").eq(e.currentItem).addClass(f+"active-slide"),g?(c._slider=e,e.slides.each(function(){var b=this;b._gesture=new MSGesture,b._gesture.target=b,b.addEventListener("MSPointerDown",function(a){a.preventDefault(),a.currentTarget._gesture&&a.currentTarget._gesture.addPointer(a.pointerId)},!1),b.addEventListener("MSGestureTap",function(b){b.preventDefault();var c=a(this),d=c.index();a(e.vars.asNavFor).data("flexslider").animating||c.hasClass("active")||(e.direction=e.currentItem<d?"next":"prev",e.flexAnimate(d,e.vars.pauseOnAction,!1,!0,!0))})})):e.slides.on(i,function(b){b.preventDefault();var c=a(this),d=c.index(),g=c.offset().left-a(e).scrollLeft();g<=0&&c.hasClass(f+"active-slide")?e.flexAnimate(e.getTarget("prev"),!0):a(e.vars.asNavFor).data("flexslider").animating||c.hasClass(f+"active-slide")||(e.direction=e.currentItem<d?"next":"prev",e.flexAnimate(d,e.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){e.manualControls?q.controlNav.setupManual():q.controlNav.setupPaging()},setupPaging:function(){var d,g,b="thumbnails"===e.vars.controlNav?"control-thumbs":"control-paging",c=1;if(e.controlNavScaffold=a('<ol class="'+f+"control-nav "+f+b+'"></ol>'),controlRole=e.vars.useAriaAttributes===!0?' role="button" ':"",e.pagingCount>1)for(var h=0;h<e.pagingCount;h++){g=e.slides.eq(h),void 0===g.attr("data-thumb-alt")&&g.attr("data-thumb-alt","");var k=""!==g.attr("data-thumb-alt")?k=' alt="'+g.attr("data-thumb-alt")+'"':"";if(d="thumbnails"===e.vars.controlNav?'<img src="'+g.attr("data-thumb")+'"'+k+controlRole+"/>":'<a href="#"'+controlRole+">"+c+"</a>","thumbnails"===e.vars.controlNav&&!0===e.vars.thumbCaptions){var l=g.attr("data-thumbcaption");""!==l&&void 0!==l&&(d+='<span class="'+f+'caption">'+l+"</span>")}e.controlNavScaffold.append("<li>"+d+"</li>"),c++}e.controlsContainer?a(e.controlsContainer).append(e.controlNavScaffold):e.append(e.controlNavScaffold),q.controlNav.set(),q.controlNav.active(),e.controlNavScaffold.delegate("a, img",i,function(b){if(b.preventDefault(),""===j||j===b.type){var c=a(this),d=e.controlNav.index(c);c.hasClass(f+"active")||(e.direction=d>e.currentSlide?"next":"prev",e.flexAnimate(d,e.vars.pauseOnAction))}""===j&&(j=b.type),q.setToClearWatchedEvent()})},setupManual:function(){e.controlNav=e.manualControls,q.controlNav.active(),e.controlNav.bind(i,function(b){if(b.preventDefault(),""===j||j===b.type){var c=a(this),d=e.controlNav.index(c);c.hasClass(f+"active")||(d>e.currentSlide?e.direction="next":e.direction="prev",e.flexAnimate(d,e.vars.pauseOnAction))}""===j&&(j=b.type),q.setToClearWatchedEvent()})},set:function(){var b="thumbnails"===e.vars.controlNav?"img":"a";e.controlNav=a("."+f+"control-nav li "+b,e.controlsContainer?e.controlsContainer:e)},active:function(){e.controlNav.removeClass(f+"active").eq(e.animatingTo).addClass(f+"active")},update:function(b,c){e.pagingCount>1&&"add"===b?e.controlNavScaffold.append(a('<li><a href="#">'+e.count+"</a></li>")):1===e.pagingCount?e.controlNavScaffold.find("li").remove():e.controlNav.eq(c).closest("li").remove(),q.controlNav.set(),e.pagingCount>1&&e.pagingCount!==e.controlNav.length?e.update(c,b):q.controlNav.active()}},directionNav:{setup:function(){var b=a('<ul class="'+f+'direction-nav"><li class="'+f+'nav-prev"><a role="button" class="'+f+'prev" href="#">'+e.vars.prevText+'</a></li><li class="'+f+'nav-next"><a role="button" class="'+f+'next" href="#">'+e.vars.nextText+"</a></li></ul>");e.customDirectionNav?e.directionNav=e.customDirectionNav:e.controlsContainer?(a(e.controlsContainer).append(b),e.directionNav=a("."+f+"direction-nav li a",e.controlsContainer)):(e.append(b),e.directionNav=a("."+f+"direction-nav li a",e)),q.directionNav.update(),e.directionNav.bind(i,function(b){b.preventDefault();var c;""!==j&&j!==b.type||(c=a(this).hasClass(f+"next")?e.getTarget("next"):e.getTarget("prev"),e.flexAnimate(c,e.vars.pauseOnAction)),""===j&&(j=b.type),q.setToClearWatchedEvent()})},update:function(){var a=f+"disabled";1===e.pagingCount?e.directionNav.addClass(a).attr("tabindex","-1"):e.vars.animationLoop?e.directionNav.removeClass(a).removeAttr("tabindex"):0===e.animatingTo?e.directionNav.removeClass(a).filter("."+f+"prev").addClass(a).attr("tabindex","-1"):e.animatingTo===e.last?e.directionNav.removeClass(a).filter("."+f+"next").addClass(a).attr("tabindex","-1"):e.directionNav.removeClass(a).removeAttr("tabindex")}},pausePlay:{setup:function(){controlRole=e.vars.useAriaAttributes===!0?' role="button" ':"";var b=a('<div class="'+f+'pauseplay"><a href="#" + '+controlRole+"></a></div>");e.controlsContainer?(e.controlsContainer.append(b),e.pausePlay=a("."+f+"pauseplay a",e.controlsContainer)):(e.append(b),e.pausePlay=a("."+f+"pauseplay a",e)),q.pausePlay.update(e.vars.slideshow?f+"pause":f+"play"),e.pausePlay.bind(i,function(b){b.preventDefault(),""!==j&&j!==b.type||(a(this).hasClass(f+"pause")?(e.manualPause=!0,e.manualPlay=!1,e.pause()):(e.manualPause=!1,e.manualPlay=!0,e.play())),""===j&&(j=b.type),q.setToClearWatchedEvent()})},update:function(a){"play"===a?e.pausePlay.removeClass(f+"pause").addClass(f+"play").html(e.vars.playText):e.pausePlay.removeClass(f+"play").addClass(f+"pause").html(e.vars.pauseText)}},touch:function(){function u(a){a.stopPropagation(),e.animating?a.preventDefault():(e.pause(),c._gesture.addPointer(a.pointerId),t=0,f=l?e.h:e.w,i=Number(new Date),d=n&&m&&e.animatingTo===e.last?0:n&&m?e.limit-(e.itemW+e.vars.itemMargin)*e.move*e.animatingTo:n&&e.currentSlide===e.last?e.limit:n?(e.itemW+e.vars.itemMargin)*e.move*e.currentSlide:m?(e.last-e.currentSlide+e.cloneOffset)*f:(e.currentSlide+e.cloneOffset)*f)}function v(a){a.stopPropagation();var b=a.target._slider;if(b){var e=-a.translationX,g=-a.translationY;return t+=l?g:e,h=t,q=l?Math.abs(t)<Math.abs(-e):Math.abs(t)<Math.abs(-g),a.detail===a.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){c._gesture.stop()}):void((!q||Number(new Date)-i>500)&&(a.preventDefault(),!o&&b.transitions&&(b.vars.animationLoop||(h=t/(0===b.currentSlide&&t<0||b.currentSlide===b.last&&t>0?Math.abs(t)/f+2:1)),b.setProps(d+h,"setTouch"))))}}function w(c){c.stopPropagation();var e=c.target._slider;if(e){if(e.animatingTo===e.currentSlide&&!q&&null!==h){var g=m?-h:h,j=g>0?e.getTarget("next"):e.getTarget("prev");e.canAdvance(j)&&(Number(new Date)-i<550&&Math.abs(g)>50||Math.abs(g)>f/2)?e.flexAnimate(j,e.vars.pauseOnAction):o||e.flexAnimate(e.currentSlide,e.vars.pauseOnAction,!0)}a=null,b=null,h=null,d=null,t=0}}var a,b,d,f,h,i,j,k,p,q=!1,r=0,s=0,t=0;g?(c.style.msTouchAction="none",c._gesture=new MSGesture,c._gesture.target=c,c.addEventListener("MSPointerDown",u,!1),c._slider=e,c.addEventListener("MSGestureChange",v,!1),c.addEventListener("MSGestureEnd",w,!1)):(j=function(g){e.animating?g.preventDefault():(window.navigator.msPointerEnabled||1===g.touches.length)&&(e.pause(),f=l?e.h:e.w,i=Number(new Date),r=g.touches[0].pageX,s=g.touches[0].pageY,d=n&&m&&e.animatingTo===e.last?0:n&&m?e.limit-(e.itemW+e.vars.itemMargin)*e.move*e.animatingTo:n&&e.currentSlide===e.last?e.limit:n?(e.itemW+e.vars.itemMargin)*e.move*e.currentSlide:m?(e.last-e.currentSlide+e.cloneOffset)*f:(e.currentSlide+e.cloneOffset)*f,a=l?s:r,b=l?r:s,c.addEventListener("touchmove",k,!1),c.addEventListener("touchend",p,!1))},k=function(c){r=c.touches[0].pageX,s=c.touches[0].pageY,h=l?a-s:a-r,q=l?Math.abs(h)<Math.abs(r-b):Math.abs(h)<Math.abs(s-b);var g=500;(!q||Number(new Date)-i>g)&&(c.preventDefault(),!o&&e.transitions&&(e.vars.animationLoop||(h/=0===e.currentSlide&&h<0||e.currentSlide===e.last&&h>0?Math.abs(h)/f+2:1),e.setProps(d+h,"setTouch")))},p=function(g){if(c.removeEventListener("touchmove",k,!1),e.animatingTo===e.currentSlide&&!q&&null!==h){var j=m?-h:h,l=j>0?e.getTarget("next"):e.getTarget("prev");e.canAdvance(l)&&(Number(new Date)-i<550&&Math.abs(j)>50||Math.abs(j)>f/2)?e.flexAnimate(l,e.vars.pauseOnAction):o||e.flexAnimate(e.currentSlide,e.vars.pauseOnAction,!0)}c.removeEventListener("touchend",p,!1),a=null,b=null,h=null,d=null},c.addEventListener("touchstart",j,!1))},resize:function(){!e.animating&&e.is(":visible")&&(n||e.doMath(),o?q.smoothHeight():n?(e.slides.width(e.computedW),e.update(e.pagingCount),e.setProps()):l?(e.viewport.height(e.h),e.setProps(e.h,"setTotal")):(e.vars.smoothHeight&&q.smoothHeight(),e.newSlides.width(e.computedW),e.setProps(e.computedW,"setTotal")))},smoothHeight:function(a){if(!l||o){var b=o?e:e.viewport;a?b.animate({height:e.slides.eq(e.animatingTo).innerHeight()},a).css("overflow","visible"):b.innerHeight(e.slides.eq(e.animatingTo).innerHeight())}},sync:function(b){var c=a(e.vars.sync).data("flexslider"),d=e.animatingTo;switch(b){case"animate":c.flexAnimate(d,e.vars.pauseOnAction,!1,!0);break;case"play":c.playing||c.asNav||c.play();break;case"pause":c.pause()}},uniqueID:function(b){return b.filter("[id]").add(b.find("[id]")).each(function(){var b=a(this);b.attr("id",b.attr("id")+"_clone")}),b},pauseInvisible:{visProp:null,init:function(){var a=q.pauseInvisible.getHiddenProp();if(a){var b=a.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(b,function(){q.pauseInvisible.isHidden()?e.startTimeout?clearTimeout(e.startTimeout):e.pause():e.started?e.play():e.vars.initDelay>0?setTimeout(e.play,e.vars.initDelay):e.play()})}},isHidden:function(){var a=q.pauseInvisible.getHiddenProp();return!!a&&document[a]},getHiddenProp:function(){var a=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var b=0;b<a.length;b++)if(a[b]+"Hidden"in document)return a[b]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(k),k=setTimeout(function(){j=""},3e3)}},e.flexAnimate=function(b,c,d,f,g){if(e.vars.animationLoop||b===e.currentSlide||(e.direction=b>e.currentSlide?"next":"prev"),p&&1===e.pagingCount&&(e.direction=e.currentItem<b?"next":"prev"),!e.animating&&(e.canAdvance(b,g)||d)&&e.is(":visible")){if(p&&f){var i=a(e.vars.asNavFor).data("flexslider");if(e.atEnd=0===b||b===e.count-1,i.flexAnimate(b,!0,!1,!0,g),e.direction=e.currentItem<b?"next":"prev",i.direction=e.direction,Math.ceil((b+1)/e.visible)-1===e.currentSlide||0===b)return e.currentItem=b,e.slideAttributes(b),!1;e.currentItem=b,e.slideAttributes(b),b=Math.floor(b/e.visible)}if(e.animating=!0,e.animatingTo=b,c&&e.pause(),e.vars.before(e),e.syncExists&&!g&&q.sync("animate"),e.vars.controlNav&&q.controlNav.active(),n||e.slideAttributes(b),e.atEnd=0===b||b===e.last,e.vars.directionNav&&q.directionNav.update(),b===e.last&&(e.vars.end(e),e.vars.animationLoop||e.pause()),o)h?(e.slides.eq(e.currentSlide).css({opacity:0,zIndex:1,display:"none"}),e.slides.eq(b).css({opacity:1,zIndex:2,display:"block"}),e.wrapup(j)):(e.slides.eq(e.currentSlide).css({zIndex:1,display:"none"}).animate({opacity:0},e.vars.animationSpeed,e.vars.easing),e.slides.eq(b).css({zIndex:2,display:"block"}).animate({opacity:1},e.vars.animationSpeed,e.vars.easing,e.wrapup));else{var k,r,s,j=l?e.slides.filter(":first").height():e.computedW;n?(k=e.vars.itemMargin,s=(e.itemW+k)*e.move*e.animatingTo,r=s>e.limit&&1!==e.visible?e.limit:s):r=0===e.currentSlide&&b===e.count-1&&e.vars.animationLoop&&"next"!==e.direction?m?(e.count+e.cloneOffset)*j:0:e.currentSlide===e.last&&0===b&&e.vars.animationLoop&&"prev"!==e.direction?m?0:(e.count+1)*j:m?(e.count-1-b+e.cloneOffset)*j:(b+e.cloneOffset)*j,e.setProps(r,"",e.vars.animationSpeed),e.transitions?(e.vars.animationLoop&&e.atEnd||(e.animating=!1,e.currentSlide=e.animatingTo),e.container.unbind("webkitTransitionEnd transitionend"),e.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(e.ensureAnimationEnd),e.wrapup(j)}),clearTimeout(e.ensureAnimationEnd),e.ensureAnimationEnd=setTimeout(function(){e.wrapup(j)},e.vars.animationSpeed+100)):e.container.animate(e.args,e.vars.animationSpeed,e.vars.easing,function(){e.wrapup(j)})}e.vars.smoothHeight&&q.smoothHeight(e.vars.animationSpeed)}},e.wrapup=function(a){o||n||(0===e.currentSlide&&e.animatingTo===e.last&&e.vars.animationLoop?e.setProps(a,"jumpEnd"):e.currentSlide===e.last&&0===e.animatingTo&&e.vars.animationLoop&&e.setProps(a,"jumpStart")),e.animating=!1,e.currentSlide=e.animatingTo,e.vars.after(e)},e.animateSlides=function(){!e.animating&&b&&e.flexAnimate(e.getTarget("next"))},e.pause=function(){clearInterval(e.animatedSlides),e.animatedSlides=null,e.playing=!1,e.vars.pausePlay&&q.pausePlay.update("play"),e.syncExists&&q.sync("pause")},e.slideAttributes=function(a){f=e.vars.namespace,1==e.vars.useAriaAttributes?(e.slides.removeClass(f+"active-slide").attr("aria-hidden","true").eq(a).addClass(f+"active-slide").removeAttr("aria-hidden"),e.vars.ariaPolite&&(e.slides.find(f+"caption").removeAttr("aria-live"),e.playing===!1&&e.slides.eq(a).find("."+f+"caption").attr("aria-live","polite"))):e.slides.removeClass(f+"active-slide").eq(a).addClass(f+"active-slide")},e.play=function(){e.playing&&clearInterval(e.animatedSlides),e.animatedSlides=e.animatedSlides||setInterval(e.animateSlides,e.vars.slideshowSpeed),e.started=e.playing=!0,e.vars.pausePlay&&q.pausePlay.update("pause"),e.syncExists&&q.sync("play")},e.stop=function(){e.pause(),e.stopped=!0},e.canAdvance=function(a,b){var c=p?e.pagingCount-1:e.last;return!!b||(!(!p||e.currentItem!==e.count-1||0!==a||"prev"!==e.direction)||(!p||0!==e.currentItem||a!==e.pagingCount-1||"next"===e.direction)&&(!(a===e.currentSlide&&!p)&&(!!e.vars.animationLoop||(!e.atEnd||0!==e.currentSlide||a!==c||"next"===e.direction)&&(!e.atEnd||e.currentSlide!==c||0!==a||"next"!==e.direction))))},e.getTarget=function(a){return e.direction=a,"next"===a?e.currentSlide===e.last?0:e.currentSlide+1:0===e.currentSlide?e.last:e.currentSlide-1},e.setProps=function(a,b,c){var d=function(){var c=a?a:(e.itemW+e.vars.itemMargin)*e.move*e.animatingTo,d=function(){if(n)return"setTouch"===b?a:m&&e.animatingTo===e.last?0:m?e.limit-(e.itemW+e.vars.itemMargin)*e.move*e.animatingTo:e.animatingTo===e.last?e.limit:c;switch(b){case"setTotal":return m?(e.count-1-e.currentSlide+e.cloneOffset)*a:(e.currentSlide+e.cloneOffset)*a;case"setTouch":return m?a:a;case"jumpEnd":return m?a:e.count*a;case"jumpStart":return m?e.count*a:a;default:return a}}();return d*-1+"px"}();e.transitions&&(d=l?"translate3d(0,"+d+",0)":"translate3d("+d+",0,0)",c=void 0!==c?c/1e3+"s":"0s",e.container.css("-"+e.pfx+"-transition-duration",c),e.container.css("transition-duration",c)),e.args[e.prop]=d,(e.transitions||void 0===c)&&e.container.css(e.args),e.container.css("transform",d)},e.setup=function(b){if(o)e.slides.css({width:"100%",float:"left",marginRight:"-100%",position:"relative"}),"init"===b&&(h?e.slides.css({opacity:0,display:"none",webkitTransition:"opacity "+e.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(e.currentSlide).css({opacity:1,zIndex:2,display:"block"}):0==e.vars.fadeFirstSlide?e.slides.css({opacity:0,display:"none",zIndex:1}).eq(e.currentSlide).css({zIndex:2,display:"block"}).css({opacity:1}):e.slides.css({opacity:0,display:"none",zIndex:1}).eq(e.currentSlide).css({zIndex:2,display:"block"}).animate({opacity:1},e.vars.animationSpeed,e.vars.easing)),e.vars.smoothHeight&&q.smoothHeight();else{var c,d;"init"===b&&(e.viewport=a('<div class="'+f+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(e).append(e.container),e.cloneCount=0,e.cloneOffset=0,m&&(d=a.makeArray(e.slides).reverse(),e.slides=a(d),e.container.empty().append(e.slides))),e.vars.animationLoop&&!n&&(e.cloneCount=2,e.cloneOffset=1,"init"!==b&&e.container.find(".clone").remove(),e.container.append(q.uniqueID(e.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(q.uniqueID(e.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),e.newSlides=a(e.vars.selector,e),c=m?e.count-1-e.currentSlide+e.cloneOffset:e.currentSlide+e.cloneOffset,l&&!n?(e.container.height(200*(e.count+e.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){e.newSlides.css({display:"block"}),e.doMath(),e.viewport.height(e.h),e.setProps(c*e.h,"init")},"init"===b?100:0)):(e.container.width(200*(e.count+e.cloneCount)+"%"),e.setProps(c*e.computedW,"init"),setTimeout(function(){e.doMath(),e.newSlides.css({width:e.computedW,marginRight:e.computedM,float:"left",display:"block"}),e.vars.smoothHeight&&q.smoothHeight()},"init"===b?100:0))}n||e.slideAttributes(e.currentSlide),e.vars.init(e)},e.doMath=function(){var a=e.slides.first(),b=e.vars.itemMargin,c=e.vars.minItems,d=e.vars.maxItems;e.w=void 0===e.viewport?e.width():e.viewport.width(),e.h=a.height(),e.boxPadding=a.outerWidth()-a.width(),n?(e.itemT=e.vars.itemWidth+b,e.itemM=b,e.minW=c?c*e.itemT:e.w,e.maxW=d?d*e.itemT-b:e.w,e.itemW=e.minW>e.w?(e.w-b*(c-1))/c:e.maxW<e.w?(e.w-b*(d-1))/d:e.vars.itemWidth>e.w?e.w:e.vars.itemWidth,e.visible=Math.floor(e.w/e.itemW),e.move=e.vars.move>0&&e.vars.move<e.visible?e.vars.move:e.visible,e.pagingCount=Math.ceil((e.count-e.visible)/e.move+1),e.last=e.pagingCount-1,e.limit=1===e.pagingCount?0:e.vars.itemWidth>e.w?e.itemW*(e.count-1)+b*(e.count-1):(e.itemW+b)*e.count-e.w-b):(e.itemW=e.w,e.itemM=b,e.pagingCount=e.count,e.last=e.count-1),e.computedW=e.itemW-e.boxPadding,e.computedM=e.itemM},e.update=function(a,b){e.doMath(),n||(a<e.currentSlide?e.currentSlide+=1:a<=e.currentSlide&&0!==a&&(e.currentSlide-=1),e.animatingTo=e.currentSlide),e.vars.controlNav&&!e.manualControls&&("add"===b&&!n||e.pagingCount>e.controlNav.length?q.controlNav.update("add"):("remove"===b&&!n||e.pagingCount<e.controlNav.length)&&(n&&e.currentSlide>e.last&&(e.currentSlide-=1,e.animatingTo-=1),q.controlNav.update("remove",e.last))),e.vars.directionNav&&q.directionNav.update()},e.addSlide=function(b,c){var d=a(b);e.count+=1,e.last=e.count-1,l&&m?void 0!==c?e.slides.eq(e.count-c).after(d):e.container.prepend(d):void 0!==c?e.slides.eq(c).before(d):e.container.append(d),e.update(c,"add"),e.slides=a(e.vars.selector+":not(.clone)",e),e.setup(),e.vars.added(e)},e.removeSlide=function(b){var c=isNaN(b)?e.slides.index(a(b)):b;e.count-=1,e.last=e.count-1,isNaN(b)?a(b,e.slides).remove():l&&m?e.slides.eq(e.last).remove():e.slides.eq(b).remove(),e.doMath(),e.update(c,"remove"),e.slides=a(e.vars.selector+":not(.clone)",e),e.setup(),e.vars.removed(e)},q.init()},a(window).blur(function(a){b=!1}).focus(function(a){b=!0}),a.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,useAriaAttributes:!0,ariaPolite:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},a.fn.flexslider=function(b){if(void 0===b&&(b={}),"object"==typeof b)return this.each(function(){var c=a(this),d=b.selector?b.selector:".slides > li",e=c.find(d);1===e.length&&b.allowOneSlide===!1||0===e.length?(e.fadeIn(400),b.start&&b.start(c)):void 0===c.data("flexslider")&&new a.flexslider(this,b)});var c=a(this).data("flexslider");switch(b){case"play":c.play();break;case"pause":c.pause();break;case"stop":c.stop();break;case"next":c.flexAnimate(c.getTarget("next"),!0);break;case"prev":case"previous":c.flexAnimate(c.getTarget("prev"),!0);break;default:"number"==typeof b&&c.flexAnimate(b,!0)}}}(jQuery);;
(function ($) {
  // @todo convert to use Drupal.behaviors
  // @todo add configuration options

  // Register callback to save references to flexslider instances. Allows
  // Views Slideshow controls to affect the slider
  function flexslider_views_slideshow_register(fullId, slider) {
    Drupal.flexsliderViewsSlideshow.active = Drupal.flexsliderViewsSlideshow.active || {};
    Drupal.flexsliderViewsSlideshow.active[fullId] = slider;
  }

  Drupal.behaviors.flexsliderViewsSlideshow = {
    attach: function (context) {
      $('.flexslider_views_slideshow_main:not(.flexslider_views_slideshow-processed)', context).addClass('flexslider_views_slideshow-processed').each(function() {
        // Get the ID of the slideshow
        var fullId = '#' + $(this).attr('id');

        // Create settings container
        var settings = Drupal.settings.flexslider_views_slideshow[fullId];

        //console.log(settings);

        // @todo map the settings from the form to their javascript equivalents
        settings.targetId = fullId;

        settings.loaded = false;

        // Assign default settings
		// @todo update the list of options to match the new set
        settings.opts = {
          // v2.x options
          namespace:settings.namespace,
          selector:settings.selector,
          easing:settings.easing,
          direction:settings.direction,
          reverse:settings.reverse,
          smoothHeight:settings.smoothHeight,
          startAt:settings.startAt,
          animationSpeed:settings.animationSpeed,
          initDelay:settings.initDelay,
          useCSS:settings.useCSS,
          touch:settings.touch,
          video:settings.video,
          keyboard:settings.keyboard,
          multipleKeyboard:settings.multipleKeyboard,
          mousewheel:settings.mousewheel,
          controlsContainer:settings.controlsContainer,
          sync:settings.sync,
          asNavFor:settings.asNavFor,
          itemWidth:settings.itemWidth,
          itemMargin:settings.itemMargin,
          minItems:settings.minItems,
          maxItems:settings.maxItems,
          move:settings.move,
          // v1.x options
          animation:settings.animation,
          slideshow:settings.slideshow,
          slideshowSpeed:settings.slideshowSpeed,
          directionNav:settings.directionNav,
          controlNav:settings.controlNav,
          prevText:settings.prevText,
          nextText:settings.nextText,
          pausePlay:settings.pausePlay,
          pauseText:settings.pauseText,
          playText:settings.playText,
          randomize:settings.randomize,
          animationLoop:settings.animationLoop,
          pauseOnAction:settings.pauseOnAction,
          pauseOnHover:settings.pauseOnHover,
          manualControls:settings.manualControls,
          start: function(slider) {
            flexslider_views_slideshow_register(fullId, slider);
            slider.trigger('start', [slider]);
          },
          before: function(slider) {
            slider.trigger('before', [slider]);
          },
          after: function(slider) {
            slider.trigger('after', [slider]);
          },
          end: function(slider) {
            slider.trigger('end', [slider]);
          },
          added: function(slider) {
            slider.trigger('added', [slider]);
          },
          removed: function(slider) {
            slider.trigger('removed', [slider]);
          }
        };

        Drupal.flexsliderViewsSlideshow.load(fullId);
      });
    }
  };


  // Initialize the flexslider object
  Drupal.flexsliderViewsSlideshow = Drupal.flexsliderViewsSlideshow || {};

  // Load mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.load = function(fullId) {
    var settings = Drupal.settings.flexslider_views_slideshow[fullId];

    // Ensure the slider isn't already loaded
    if (!settings.loaded) {
      $(settings.targetId + " .flexslider").flexslider(settings.opts);
      settings.loaded = true;
    }
  }

  // Pause mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.pause = function (options) {
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].pause();
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].manualPause = true;
  }

  // Play mapping from Views Slideshow to FlexSlider
  Drupal.flexsliderViewsSlideshow.play = function (options) {
    console.log(Drupal.flexsliderViewsSlideshow);
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].resume();
    Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].manualPause = false;
  }

  Drupal.flexsliderViewsSlideshow.nextSlide = function (options) {
    var target = Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].getTarget('next');

    if (Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].canAdvance(target)) {
      Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].flexAnimate(target, Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].vars.pauseOnAction);
    }
  }
  Drupal.flexsliderViewsSlideshow.previousSlide = function (options) {
    var target = Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].getTarget('prev');

    if (Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].canAdvance(target)) {
      Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].flexAnimate(target, Drupal.flexsliderViewsSlideshow.active['#flexslider_views_slideshow_main_' + options.slideshowID].vars.pauseOnAction);
    }
  }
  // @todo add support for jquery mobile page init
})(jQuery);
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
