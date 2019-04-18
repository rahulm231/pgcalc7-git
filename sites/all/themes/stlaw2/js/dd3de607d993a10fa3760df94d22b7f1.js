(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var focusVisible = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory();
	}(commonjsGlobal, (function () {
	  /**
	   * https://github.com/WICG/focus-visible
	   */
	  function init() {
	    var hadKeyboardEvent = true;
	    var hadFocusVisibleRecently = false;
	    var hadFocusVisibleRecentlyTimeout = null;

	    var inputTypesWhitelist = {
	      text: true,
	      search: true,
	      url: true,
	      tel: true,
	      email: true,
	      password: true,
	      number: true,
	      date: true,
	      month: true,
	      week: true,
	      time: true,
	      datetime: true,
	      'datetime-local': true
	    };

	    /**
	     * Helper function for legacy browsers and iframes which sometimes focus
	     * elements like document, body, and non-interactive SVG.
	     * @param {Element} el
	     */
	    function isValidFocusTarget(el) {
	      if (
	        el &&
	        el !== document &&
	        el.nodeName !== 'HTML' &&
	        el.nodeName !== 'BODY' &&
	        'classList' in el &&
	        'contains' in el.classList
	      ) {
	        return true;
	      }
	      return false;
	    }

	    /**
	     * Computes whether the given element should automatically trigger the
	     * `focus-visible` class being added, i.e. whether it should always match
	     * `:focus-visible` when focused.
	     * @param {Element} el
	     * @return {boolean}
	     */
	    function focusTriggersKeyboardModality(el) {
	      var type = el.type;
	      var tagName = el.tagName;

	      if (tagName == 'INPUT' && inputTypesWhitelist[type] && !el.readOnly) {
	        return true;
	      }

	      if (tagName == 'TEXTAREA' && !el.readOnly) {
	        return true;
	      }

	      if (el.isContentEditable) {
	        return true;
	      }

	      return false;
	    }

	    /**
	     * Add the `focus-visible` class to the given element if it was not added by
	     * the author.
	     * @param {Element} el
	     */
	    function addFocusVisibleClass(el) {
	      if (el.classList.contains('focus-visible')) {
	        return;
	      }
	      el.classList.add('focus-visible');
	      el.setAttribute('data-focus-visible-added', '');
	    }

	    /**
	     * Remove the `focus-visible` class from the given element if it was not
	     * originally added by the author.
	     * @param {Element} el
	     */
	    function removeFocusVisibleClass(el) {
	      if (!el.hasAttribute('data-focus-visible-added')) {
	        return;
	      }
	      el.classList.remove('focus-visible');
	      el.removeAttribute('data-focus-visible-added');
	    }

	    /**
	     * Treat `keydown` as a signal that the user is in keyboard modality.
	     * Apply `focus-visible` to any current active element and keep track
	     * of our keyboard modality state with `hadKeyboardEvent`.
	     * @param {Event} e
	     */
	    function onKeyDown(e) {
	      if (isValidFocusTarget(document.activeElement)) {
	        addFocusVisibleClass(document.activeElement);
	      }

	      hadKeyboardEvent = true;
	    }

	    /**
	     * If at any point a user clicks with a pointing device, ensure that we change
	     * the modality away from keyboard.
	     * This avoids the situation where a user presses a key on an already focused
	     * element, and then clicks on a different element, focusing it with a
	     * pointing device, while we still think we're in keyboard modality.
	     * @param {Event} e
	     */
	    function onPointerDown(e) {
	      hadKeyboardEvent = false;
	    }

	    /**
	     * On `focus`, add the `focus-visible` class to the target if:
	     * - the target received focus as a result of keyboard navigation, or
	     * - the event target is an element that will likely require interaction
	     *   via the keyboard (e.g. a text box)
	     * @param {Event} e
	     */
	    function onFocus(e) {
	      // Prevent IE from focusing the document or HTML element.
	      if (!isValidFocusTarget(e.target)) {
	        return;
	      }

	      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
	        addFocusVisibleClass(e.target);
	      }
	    }

	    /**
	     * On `blur`, remove the `focus-visible` class from the target.
	     * @param {Event} e
	     */
	    function onBlur(e) {
	      if (!isValidFocusTarget(e.target)) {
	        return;
	      }

	      if (
	        e.target.classList.contains('focus-visible') ||
	        e.target.hasAttribute('data-focus-visible-added')
	      ) {
	        // To detect a tab/window switch, we look for a blur event followed
	        // rapidly by a visibility change.
	        // If we don't see a visibility change within 100ms, it's probably a
	        // regular focus change.
	        hadFocusVisibleRecently = true;
	        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
	        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
	          hadFocusVisibleRecently = false;
	          window.clearTimeout(hadFocusVisibleRecentlyTimeout);
	        }, 100);
	        removeFocusVisibleClass(e.target);
	      }
	    }

	    /**
	     * If the user changes tabs, keep track of whether or not the previously
	     * focused element had .focus-visible.
	     * @param {Event} e
	     */
	    function onVisibilityChange(e) {
	      if (document.visibilityState == 'hidden') {
	        // If the tab becomes active again, the browser will handle calling focus
	        // on the element (Safari actually calls it twice).
	        // If this tab change caused a blur on an element with focus-visible,
	        // re-apply the class when the user switches back to the tab.
	        if (hadFocusVisibleRecently) {
	          hadKeyboardEvent = true;
	        }
	        addInitialPointerMoveListeners();
	      }
	    }

	    /**
	     * Add a group of listeners to detect usage of any pointing devices.
	     * These listeners will be added when the polyfill first loads, and anytime
	     * the window is blurred, so that they are active when the window regains
	     * focus.
	     */
	    function addInitialPointerMoveListeners() {
	      document.addEventListener('mousemove', onInitialPointerMove);
	      document.addEventListener('mousedown', onInitialPointerMove);
	      document.addEventListener('mouseup', onInitialPointerMove);
	      document.addEventListener('pointermove', onInitialPointerMove);
	      document.addEventListener('pointerdown', onInitialPointerMove);
	      document.addEventListener('pointerup', onInitialPointerMove);
	      document.addEventListener('touchmove', onInitialPointerMove);
	      document.addEventListener('touchstart', onInitialPointerMove);
	      document.addEventListener('touchend', onInitialPointerMove);
	    }

	    function removeInitialPointerMoveListeners() {
	      document.removeEventListener('mousemove', onInitialPointerMove);
	      document.removeEventListener('mousedown', onInitialPointerMove);
	      document.removeEventListener('mouseup', onInitialPointerMove);
	      document.removeEventListener('pointermove', onInitialPointerMove);
	      document.removeEventListener('pointerdown', onInitialPointerMove);
	      document.removeEventListener('pointerup', onInitialPointerMove);
	      document.removeEventListener('touchmove', onInitialPointerMove);
	      document.removeEventListener('touchstart', onInitialPointerMove);
	      document.removeEventListener('touchend', onInitialPointerMove);
	    }

	    /**
	     * When the polfyill first loads, assume the user is in keyboard modality.
	     * If any event is received from a pointing device (e.g. mouse, pointer,
	     * touch), turn off keyboard modality.
	     * This accounts for situations where focus enters the page from the URL bar.
	     * @param {Event} e
	     */
	    function onInitialPointerMove(e) {
	      // Work around a Safari quirk that fires a mousemove on <html> whenever the
	      // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
	      if (e.target.nodeName.toLowerCase() === 'html') {
	        return;
	      }

	      hadKeyboardEvent = false;
	      removeInitialPointerMoveListeners();
	    }

	    document.addEventListener('keydown', onKeyDown, true);
	    document.addEventListener('mousedown', onPointerDown, true);
	    document.addEventListener('pointerdown', onPointerDown, true);
	    document.addEventListener('touchstart', onPointerDown, true);
	    document.addEventListener('focus', onFocus, true);
	    document.addEventListener('blur', onBlur, true);
	    document.addEventListener('visibilitychange', onVisibilityChange, true);
	    addInitialPointerMoveListeners();

	    document.body.classList.add('js-focus-visible');
	  }

	  /**
	   * Subscription when the DOM is ready
	   * @param {Function} callback
	   */
	  function onDOMReady(callback) {
	    var loaded;

	    /**
	     * Callback wrapper for check loaded state
	     */
	    function load() {
	      if (!loaded) {
	        loaded = true;

	        callback();
	      }
	    }

	    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
	      callback();
	    } else {
	      loaded = false;
	      document.addEventListener('DOMContentLoaded', load, false);
	      window.addEventListener('load', load, false);
	    }
	  }

	  if (typeof document !== 'undefined') {
	    onDOMReady(init);
	  }

	})));
	});

	var version="0.3.1",classCallCheck=function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,o){for(var t=0;t<o.length;t++){var i=o[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}return function(o,t,i){return t&&e(o.prototype,t),i&&e(o,i),o}}(),toConsumableArray=function(e){if(Array.isArray(e)){for(var o=0,t=Array(e.length);o<e.length;o++)t[o]=e[o];return t}return Array.from(e)},MicroModal=function(){var e=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],o=function(){function o(e){var t=e.targetModal,i=e.triggers,n=void 0===i?[]:i,a=e.onShow,r=void 0===a?function(){}:a,s=e.onClose,l=void 0===s?function(){}:s,c=e.openTrigger,d=void 0===c?"data-micromodal-trigger":c,u=e.closeTrigger,h=void 0===u?"data-micromodal-close":u,f=e.disableScroll,v=void 0!==f&&f,g=e.disableFocus,m=void 0!==g&&g,b=e.awaitCloseAnimation,y=void 0!==b&&b,k=e.debugMode,w=void 0!==k&&k;classCallCheck(this,o),this.modal=document.getElementById(t),this.config={debugMode:w,disableScroll:v,openTrigger:d,closeTrigger:h,onShow:r,onClose:l,awaitCloseAnimation:y,disableFocus:m},n.length>0&&this.registerTriggers.apply(this,toConsumableArray(n)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this);}return createClass(o,[{key:"registerTriggers",value:function(){for(var e=this,o=arguments.length,t=Array(o),i=0;i<o;i++)t[i]=arguments[i];t.forEach(function(o){o.addEventListener("click",function(){return e.showModal()});});}},{key:"showModal",value:function(){this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add("is-open"),this.setFocusToFirstNode(),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.onShow(this.modal);}},{key:"closeModal",value:function(){var e=this.modal;this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement.focus(),this.config.onClose(this.modal),this.config.awaitCloseAnimation?this.modal.addEventListener("animationend",function o(){e.classList.remove("is-open"),e.removeEventListener("animationend",o,!1);},!1):e.classList.remove("is-open");}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var o=document.querySelector("body");switch(e){case"enable":Object.assign(o.style,{overflow:"initial",height:"initial"});break;case"disable":Object.assign(o.style,{overflow:"hidden",height:"100vh"});}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown);}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown);}},{key:"onClick",value:function(e){e.target.hasAttribute(this.config.closeTrigger)&&(this.closeModal(),e.preventDefault());}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.maintainFocus(e);}},{key:"getFocusableNodes",value:function(){var o=this.modal.querySelectorAll(e);return Object.keys(o).map(function(e){return o[e]})}},{key:"setFocusToFirstNode",value:function(){if(!this.config.disableFocus){var e=this.getFocusableNodes();e.length&&e[0].focus();}}},{key:"maintainFocus",value:function(e){var o=this.getFocusableNodes();if(this.modal.contains(document.activeElement)){var t=o.indexOf(document.activeElement);e.shiftKey&&0===t&&(o[o.length-1].focus(),e.preventDefault()),e.shiftKey||t!==o.length-1||(o[0].focus(),e.preventDefault());}else o[0].focus();}}]),o}(),t=null,i=function(e,o){var t=[];return e.forEach(function(e){var i=e.attributes[o].value;void 0===t[i]&&(t[i]=[]),t[i].push(e);}),t},n=function(e){if(!document.getElementById(e))return console.warn("MicroModal v"+version+": ❗Seems like you have missed %c'"+e+"'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'+e+'"></div>'),!1},a=function(e){if(e.length<=0)return console.warn("MicroModal v"+version+": ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'),!1},r=function(e,o){if(a(e),!o)return !0;for(var t in o)n(t);return !0};return {init:function(e){var t=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=[].concat(toConsumableArray(document.querySelectorAll("["+t.openTrigger+"]"))),a=i(n,t.openTrigger);if(!0!==t.debugMode||!1!==r(n,a))for(var s in a){var l=a[s];t.targetModal=s,t.triggers=[].concat(toConsumableArray(l)),new o(t);}},show:function(e,i){var a=i||{};a.targetModal=e,!0===a.debugMode&&!1===n(e)||(t=new o(a)).showModal();},close:function(){t.closeModal();}}}();

	!function(){if("undefined"!=typeof window){var t=window.navigator.userAgent.match(/Edge\/(\d{2})\./),e=!!t&&parseInt(t[1],10)>=16;if("objectFit"in document.documentElement.style!=!1&&!e)return void(window.objectFitPolyfill=function(){return !1});var i=function(t){var e=window.getComputedStyle(t,null),i=e.getPropertyValue("position"),n=e.getPropertyValue("overflow"),o=e.getPropertyValue("display");i&&"static"!==i||(t.style.position="relative"),"hidden"!==n&&(t.style.overflow="hidden"),o&&"inline"!==o||(t.style.display="block"),0===t.clientHeight&&(t.style.height="100%"),-1===t.className.indexOf("object-fit-polyfill")&&(t.className=t.className+" object-fit-polyfill");},n=function(t){var e=window.getComputedStyle(t,null),i={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px",top:"auto",right:"auto",bottom:"auto",left:"auto","margin-top":"0px","margin-right":"0px","margin-bottom":"0px","margin-left":"0px"};for(var n in i){e.getPropertyValue(n)!==i[n]&&(t.style[n]=i[n]);}},o=function(t,e,i){var n,o,l,a,d;if(i=i.split(" "),i.length<2&&(i[1]=i[0]),"x"===t)n=i[0],o=i[1],l="left",a="right",d=e.clientWidth;else{if("y"!==t)return;n=i[1],o=i[0],l="top",a="bottom",d=e.clientHeight;}return n===l||o===l?void(e.style[l]="0"):n===a||o===a?void(e.style[a]="0"):"center"===n||"50%"===n?(e.style[l]="50%",void(e.style["margin-"+l]=d/-2+"px")):n.indexOf("%")>=0?(n=parseInt(n),void(n<50?(e.style[l]=n+"%",e.style["margin-"+l]=d*(n/-100)+"px"):(n=100-n,e.style[a]=n+"%",e.style["margin-"+a]=d*(n/-100)+"px"))):void(e.style[l]=n)},l=function(t){var e=t.dataset?t.dataset.objectFit:t.getAttribute("data-object-fit"),l=t.dataset?t.dataset.objectPosition:t.getAttribute("data-object-position");e=e||"cover",l=l||"50% 50%";var a=t.parentNode;i(a),n(t),t.style.position="absolute",t.style.height="100%",t.style.width="auto","scale-down"===e&&(t.style.height="auto",t.clientWidth<a.clientWidth&&t.clientHeight<a.clientHeight?(o("x",t,l),o("y",t,l)):(e="contain",t.style.height="100%")),"none"===e?(t.style.width="auto",t.style.height="auto",o("x",t,l),o("y",t,l)):"cover"===e&&t.clientWidth>a.clientWidth||"contain"===e&&t.clientWidth<a.clientWidth?(t.style.top="0",t.style.marginTop="0",o("x",t,l)):"scale-down"!==e&&(t.style.width="100%",t.style.height="auto",t.style.left="0",t.style.marginLeft="0",o("y",t,l));},a=function(t){if(void 0===t)t=document.querySelectorAll("[data-object-fit]");else if(t&&t.nodeName)t=[t];else{if("object"!=typeof t||!t.length||!t[0].nodeName)return !1;t=t;}for(var i=0;i<t.length;i++)if(t[i].nodeName){var n=t[i].nodeName.toLowerCase();"img"!==n||e?"video"===n&&(t[i].readyState>0?l(t[i]):t[i].addEventListener("loadedmetadata",function(){l(this);})):t[i].complete?l(t[i]):t[i].addEventListener("load",function(){l(this);});}return !0};document.addEventListener("DOMContentLoaded",function(){a();}),window.addEventListener("resize",function(){a();}),window.objectFitPolyfill=a;}}();

	var ally_min = createCommonjsModule(function (module, exports) {
	/*! ally.js - v1.4.1 - https://allyjs.io/ - MIT License */
	!function(e){module.exports=e();}(function(){var e;return function t(e,n,r){function i(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof commonjsRequire&&commonjsRequire;if(!u&&s)return s(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return i(n?n:t)},c,c.exports,t,e,n,r);}return n[a].exports}for(var o="function"==typeof commonjsRequire&&commonjsRequire,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e){return e&&"object"===("undefined"==typeof e?"undefined":ft(e))&&"default"in e?e["default"]:e}function i(){var e={activeElement:document.activeElement,windowScrollTop:window.scrollTop,windowScrollLeft:window.scrollLeft,bodyScrollTop:document.body.scrollTop,bodyScrollLeft:document.body.scrollLeft},t=document.createElement("iframe");t.setAttribute("style","position:absolute; position:fixed; top:0; left:-2px; width:1px; height:1px; overflow:hidden;"),t.setAttribute("aria-live","off"),t.setAttribute("aria-busy","true"),t.setAttribute("aria-hidden","true"),document.body.appendChild(t);var n=t.contentWindow,r=n.document;r.open(),r.close();var i=r.createElement("div");return r.body.appendChild(i),e.iframe=t,e.wrapper=i,e.window=n,e.document=r,e}function o(e,t){e.wrapper.innerHTML="";var n="string"==typeof t.element?e.document.createElement(t.element):t.element(e.wrapper,e.document),r=t.mutate&&t.mutate(n,e.wrapper,e.document);return r||r===!1||(r=n),!n.parentNode&&e.wrapper.appendChild(n),r&&r.focus&&r.focus(),t.validate?t.validate(n,r,e.document):e.document.activeElement===r}function a(e){e.activeElement===document.body?(document.activeElement&&document.activeElement.blur&&document.activeElement.blur(),Et.is.IE10&&document.body.focus()):e.activeElement&&e.activeElement.focus&&e.activeElement.focus(),document.body.removeChild(e.iframe),window.scrollTop=e.windowScrollTop,window.scrollLeft=e.windowScrollLeft,document.body.scrollTop=e.bodyScrollTop,document.body.scrollLeft=e.bodyScrollLeft;}function u(e){var t=void 0;try{t=window.localStorage&&window.localStorage.getItem(e),t=t?JSON.parse(t):{};}catch(n){t={};}return t}function s(e,t){if(document.hasFocus())try{window.localStorage&&window.localStorage.setItem(e,JSON.stringify(t));}catch(n){}else try{window.localStorage&&window.localStorage.removeItem(e);}catch(n){}}function l(){var e=document.createElement("div");return e.innerHTML='<svg><foreignObject width="30" height="30">\n      <input type="text"/>\n  </foreignObject></svg>',e.firstChild.firstChild}function c(e){return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+e+"</svg>"}function d(e){if(!e.focus)try{HTMLElement.prototype.focus.call(e);}catch(t){xn(e);}}function f(e,t,n){return d(t),n.activeElement===t}function m(){var e=Ft(Pn);return Object.keys(_n).forEach(function(t){e[t]=_n[t]();}),e}function b(){zn.warn("trying to focus inert element",this);}function v(e,t){if(t){var n=jn(e);$n({element:e,attribute:"tabindex",temporaryValue:"-1",saveValue:null!==n?n:""});}else $n({element:e,attribute:"tabindex"});}function h(e,t){Zn({element:e,attribute:"controls",remove:t});}function g(e,t){$n({element:e,attribute:"focusable",temporaryValue:t?"false":void 0});}function p(e,t){Zn({element:e,attribute:"xlink:href",remove:t});}function x(e,t){$n({element:e,attribute:"aria-disabled",temporaryValue:t?"true":void 0});}function y(e,t){t?e.focus=b:delete e.focus;}function w(e,t){if(t){var n=e.style.pointerEvents||"";e.setAttribute("data-inert-pointer-events",n),e.style.pointerEvents="none";}else{var r=e.getAttribute("data-inert-pointer-events");e.removeAttribute("data-inert-pointer-events"),e.style.pointerEvents=r;}}function E(e,t){x(e,t),v(e,t),y(e,t),w(e,t);var n=e.nodeName.toLowerCase();("video"===n||"audio"===n)&&h(e,t),("svg"===n||e.ownerSVGElement)&&(Jn.focusSvgFocusableAttribute?g(e,t):Jn.focusSvgTabindexAttribute||"a"!==n||p(e,t)),t?e.setAttribute("data-ally-disabled","true"):e.removeAttribute("data-ally-disabled");}function S(e){er.some(function(t){return e[t]?(tr=t,!0):!1});}function T(e,t){return tr||S(e),e[tr](t)}function A(e){var t=e.webkitUserModify||"";return Boolean(t&&-1!==t.indexOf("write"))}function O(e){return [e.getPropertyValue("overflow"),e.getPropertyValue("overflow-x"),e.getPropertyValue("overflow-y")].some(function(e){return "auto"===e||"scroll"===e})}function C(e){return e.display.indexOf("flex")>-1}function I(e,t,n,r){return "div"!==t&&"span"!==t?!1:n&&"div"!==n&&"span"!==n&&!O(r)?!1:e.offsetHeight<e.scrollHeight||e.offsetWidth<e.scrollWidth}function L(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=void 0===n?{flexbox:!1,scrollable:!1,shadow:!1}:n;nr||(nr=Bn());var i=ht({label:"is/focus-relevant",resolveDocument:!0,context:t});if(!r.shadow&&i.shadowRoot)return !0;var o=i.nodeName.toLowerCase();if("input"===o&&"hidden"===i.type)return !1;if("input"===o||"select"===o||"button"===o||"textarea"===o)return !0;if("legend"===o&&nr.focusRedirectLegend)return !0;if("label"===o)return !0;if("area"===o)return !0;if("a"===o&&i.hasAttribute("href"))return !0;if("object"===o&&i.hasAttribute("usemap"))return !1;if("object"===o){var a=i.getAttribute("type");if(!nr.focusObjectSvg&&"image/svg+xml"===a)return !1;if(!nr.focusObjectSwf&&"application/x-shockwave-flash"===a)return !1}if("iframe"===o||"object"===o)return !0;if("embed"===o||"keygen"===o)return !0;if(i.hasAttribute("contenteditable"))return !0;if("audio"===o&&(nr.focusAudioWithoutControls||i.hasAttribute("controls")))return !0;if("video"===o&&(nr.focusVideoWithoutControls||i.hasAttribute("controls")))return !0;if(nr.focusSummary&&"summary"===o)return !0;var u=Hn(i);if("img"===o&&i.hasAttribute("usemap"))return u&&nr.focusImgUsemapTabindex||nr.focusRedirectImgUsemap;if(nr.focusTable&&("table"===o||"td"===o))return !0;if(nr.focusFieldset&&"fieldset"===o)return !0;var s="svg"===o,l=i.ownerSVGElement,c=i.getAttribute("focusable"),d=jn(i);if("use"===o&&null!==d&&!nr.focusSvgUseTabindex)return !1;if("foreignobject"===o)return null!==d&&nr.focusSvgForeignobjectTabindex;if(T(i,"svg a")&&i.hasAttribute("xlink:href"))return !0;if((s||l)&&i.focus&&!nr.focusSvgNegativeTabindexAttribute&&0>d)return !1;if(s)return u||nr.focusSvg||nr.focusSvgInIframe||Boolean(nr.focusSvgFocusableAttribute&&c&&"true"===c);if(l){if(nr.focusSvgTabindexAttribute&&u)return !0;if(nr.focusSvgFocusableAttribute)return "true"===c}if(u)return !0;var f=window.getComputedStyle(i,null);if(A(f))return !0;if(nr.focusImgIsmap&&"img"===o&&i.hasAttribute("ismap")){var m=Yn({context:i}).some(function(e){return "a"===e.nodeName.toLowerCase()&&e.hasAttribute("href")});if(m)return !0}if(!r.scrollable&&nr.focusScrollContainer)if(nr.focusScrollContainerWithoutOverflow){if(I(i,o))return !0}else if(O(f))return !0;if(!r.flexbox&&nr.focusFlexboxContainer&&C(f))return !0;var b=i.parentElement;if(!r.scrollable&&b){var v=b.nodeName.toLowerCase(),h=window.getComputedStyle(b,null);if(nr.focusScrollBody&&I(b,o,v,h))return !0;if(nr.focusChildrenOfFocusableFlexbox&&C(h))return !0}return !1}function N(e,t){if(e.findIndex)return e.findIndex(t);var n=e.length;if(0===n)return -1;for(var r=0;n>r;r++)if(t(e[r],r,e))return r;return -1}function M(e){if(ur||(ur=ar("object, iframe")),void 0!==e._frameElement)return e._frameElement;e._frameElement=null;var t=e.parent.document.querySelectorAll(ur);return [].some.call(t,function(t){var n=ir(t);return n!==e.document?!1:(e._frameElement=t,!0)}),e._frameElement}function k(e){var t=yt(e);if(!t.parent||t.parent===t)return null;try{return t.frameElement||M(t)}catch(n){return null}}function _(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)}function P(e){return e.some(function(e){return "none"===_(e,"display")})}function F(e){var t=N(e,function(e){var t=_(e,"visibility");return "hidden"===t||"collapse"===t});if(-1===t)return !1;var n=N(e,function(e){return "visible"===_(e,"visibility")});return -1===n?!0:n>t?!0:!1}function B(e){var t=1;return "summary"===e[0].nodeName.toLowerCase()&&(t=2),e.slice(t).some(function(e){return "details"===e.nodeName.toLowerCase()&&e.open===!1})}function D(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=void 0===n?{notRendered:!1,cssDisplay:!1,cssVisibility:!1,detailsElement:!1,browsingContext:!1}:n,i=ht({label:"is/visible",resolveDocument:!0,context:t}),o=i.nodeName.toLowerCase();if(!r.notRendered&&sr.test(o))return !0;var a=Yn({context:i}),u="audio"===o&&!i.hasAttribute("controls");if(!r.cssDisplay&&P(u?a.slice(1):a))return !1;if(!r.cssVisibility&&F(a))return !1;if(!r.detailsElement&&B(a))return !1;if(!r.browsingContext){var s=k(i),l=D.except(r);if(s&&!l(s))return !1}return !0}function R(e,t){var n=t.querySelector('map[name="'+bt(e)+'"]');return n||null}function W(e){var t=e.getAttribute("usemap");if(!t)return null;var n=pt(e);return R(t.slice(1),n)}function H(e){var t=e.parentElement;if(!t.name||"map"!==t.nodeName.toLowerCase())return null;var n=pt(e);return n.querySelector('img[usemap="#'+bt(t.name)+'"]')||null}function j(e){var t=e.nodeName.toLowerCase();return "fieldset"===t&&e.disabled}function q(e){var t=e.nodeName.toLowerCase();return "form"===t&&e.disabled}function G(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=void 0===n?{onlyFocusableBrowsingContext:!1,visible:!1}:n,i=ht({label:"is/only-tabbable",resolveDocument:!0,context:t});if(!r.visible&&!lr(i))return !1;if(!r.onlyFocusableBrowsingContext&&(Et.is.GECKO||Et.is.TRIDENT||Et.is.EDGE)){var o=k(i);if(o&&jn(o)<0)return !1}var a=i.nodeName.toLowerCase(),u=jn(i);return "label"===a&&Et.is.GECKO?null!==u&&u>=0:Et.is.GECKO&&i.ownerSVGElement&&!i.focus&&"a"===a&&i.hasAttribute("xlink:href")&&Et.is.GECKO?!0:!1}function K(e){var t=e.nodeName.toLowerCase();if("embed"===t||"keygen"===t)return !0;var n=jn(e);if(e.shadowRoot&&null===n)return !0;if("label"===t)return !vr.focusLabelTabindex||null===n;if("legend"===t)return null===n;if(vr.focusSvgFocusableAttribute&&(e.ownerSVGElement||"svg"===t)){var r=e.getAttribute("focusable");return r&&"false"===r}return "img"===t&&e.hasAttribute("usemap")?null===n||!vr.focusImgUsemapTabindex:"area"===t?!dr(e):!1}function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=void 0===n?{disabled:!1,visible:!1,onlyTabbable:!1}:n;vr||(vr=Bn());var i=br.rules.except({onlyFocusableBrowsingContext:!0,visible:r.visible}),o=ht({label:"is/focusable",resolveDocument:!0,context:t}),a=rr.rules({context:o,except:r});if(!a||K(o))return !1;if(!r.disabled&&mr(o))return !1;if(!r.onlyTabbable&&i(o))return !1;if(!r.visible){var u={context:o,except:{}};if(vr.focusInHiddenIframe&&(u.except.browsingContext=!0),vr.focusObjectSvgHidden){var s=o.nodeName.toLowerCase();"object"===s&&(u.except.cssVisibility=!0);}if(!lr.rules(u))return !1}var l=k(o);if(l){var c=l.nodeName.toLowerCase();if(!("object"!==c||vr.focusInZeroDimensionObject||l.offsetWidth&&l.offsetHeight))return !1}var d=o.nodeName.toLowerCase();return "svg"===d&&vr.focusSvgInIframe&&!l&&null===o.getAttribute("tabindex")?!1:!0}function Z(e){var t=function(t){return t.shadowRoot?NodeFilter.FILTER_ACCEPT:e(t)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP};return t.acceptNode=t,t}function $(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.includeContext,r=e.includeOnlyTabbable,i=e.strategy;t||(t=document.documentElement);for(var o=hr.rules.except({onlyTabbable:r}),a=pt(t),u=a.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,"all"===i?gr:Z(o),!1),s=[];u.nextNode();)u.currentNode.shadowRoot?(o(u.currentNode)&&s.push(u.currentNode),s=s.concat($({context:u.currentNode.shadowRoot,includeOnlyTabbable:r,strategy:i}))):s.push(u.currentNode);return n&&("all"===i?rr(t)&&s.unshift(t):o(t)&&s.unshift(t)),s}function U(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.includeContext,r=e.includeOnlyTabbable,i=yr(),o=t.querySelectorAll(i),a=hr.rules.except({onlyTabbable:r}),u=[].filter.call(o,a);return n&&a(t)&&u.unshift(t),u}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=void 0===n?{flexbox:!1,scrollable:!1,shadow:!1,visible:!1,onlyTabbable:!1}:n;Er||(Er=Bn());var i=ht({label:"is/tabbable",resolveDocument:!0,context:t});if(Et.is.BLINK&&Et.is.ANDROID&&Et.majorVersion>42)return !1;var o=k(i);if(o){if(Et.is.WEBKIT&&Et.is.IOS)return !1;if(jn(o)<0)return !1;if(!r.visible&&(Et.is.BLINK||Et.is.WEBKIT)&&!lr(o))return !1;var a=o.nodeName.toLowerCase();if("object"===a){var u="Chrome"===Et.name&&Et.majorVersion>=54||"Opera"===Et.name&&Et.majorVersion>=41;if(Et.is.WEBKIT||Et.is.BLINK&&!u)return !1}}var s=i.nodeName.toLowerCase(),l=jn(i),c=null===l?null:l>=0;if(Et.is.EDGE&&Et.majorVersion>=14&&o&&i.ownerSVGElement&&0>l)return !0;var d=c!==!1,f=null!==l&&l>=0;if(i.hasAttribute("contenteditable"))return d;if(Sr.test(s)&&c!==!0)return !1;if(Et.is.WEBKIT&&Et.is.IOS){var m="input"===s&&"text"===i.type||"password"===i.type||"select"===s||"textarea"===s||i.hasAttribute("contenteditable");if(!m){var b=window.getComputedStyle(i,null);m=A(b);}if(!m)return !1}if("use"===s&&null!==l&&(Et.is.BLINK||Et.is.WEBKIT&&9===Et.majorVersion))return !0;if(T(i,"svg a")&&i.hasAttribute("xlink:href")){if(d)return !0;if(i.focus&&!Er.focusSvgNegativeTabindexAttribute)return !0}if("svg"===s&&Er.focusSvgInIframe&&d)return !0;if(Et.is.TRIDENT||Et.is.EDGE){if("svg"===s)return Er.focusSvg?!0:i.hasAttribute("focusable")||f;if(i.ownerSVGElement)return Er.focusSvgTabindexAttribute&&f?!0:i.hasAttribute("focusable")}if(void 0===i.tabIndex)return Boolean(r.onlyTabbable);if("audio"===s){if(!i.hasAttribute("controls"))return !1;if(Et.is.BLINK)return !0}if("video"===s)if(i.hasAttribute("controls")){if(Et.is.BLINK||Et.is.GECKO)return !0}else if(Et.is.TRIDENT||Et.is.EDGE)return !1;if("object"===s&&(Et.is.BLINK||Et.is.WEBKIT))return !1;if("iframe"===s)return !1;if(!r.scrollable&&Et.is.GECKO){var v=window.getComputedStyle(i,null);if(O(v))return d}if(Et.is.TRIDENT||Et.is.EDGE){if("area"===s){var h=H(i);if(h&&jn(h)<0)return !1}var g=window.getComputedStyle(i,null);if(A(g))return i.tabIndex>=0;if(!r.flexbox&&C(g))return null!==l?f:Tr(i)&&Ar(i);if(I(i,s))return !1;var p=i.parentElement;if(p){var x=p.nodeName.toLowerCase(),y=window.getComputedStyle(p,null);if(I(p,s,x,y))return !1;if(C(y))return f}}return i.tabIndex>=0}function z(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}function J(e,t){return N(e,function(e){return t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING})}function Q(e,t,n){var r=[];return t.forEach(function(t){var i=!0,o=e.indexOf(t);-1===o&&(o=J(e,t),i=!1),-1===o&&(o=e.length);var a=vt(n?n(t):t);a.length&&r.push({offset:o,replace:i,elements:a});}),r}function Y(e,t){var n=0;t.sort(function(e,t){return e.offset-t.offset}),t.forEach(function(t){var r=t.replace?1:0,i=[t.offset+n,r].concat(t.elements);e.splice.apply(e,i),n+=t.elements.length-r;});}function ee(e){var t=e.nodeName.toLowerCase();return "input"===t||"textarea"===t||"select"===t||"button"===t}function te(e,t){var n=e.getAttribute("for");return n?t.getElementById(n):e.querySelector("input, select, textarea")}function ne(e){var t=e.parentNode,n=wr({context:t,strategy:"strict"});return n.filter(ee)[0]||null}function re(e,t){var n=Cr({context:t.body,strategy:"strict"});if(!n.length)return null;var r=Lr({list:n,elements:[e]}),i=r.indexOf(e);return i===r.length-1?null:r[i+1]}function ie(e,t){if(!Nr.focusRedirectLegend)return null;var n=e.parentNode;return "fieldset"!==n.nodeName.toLowerCase()?null:"tabbable"===Nr.focusRedirectLegend?re(e,t):ne(e,t)}function oe(e){if(!Nr.focusRedirectImgUsemap)return null;var t=W(e);return t&&t.querySelector("area")||null}function ae(e){var t=Yn({context:e}),n=t.slice(1).map(function(e){return {element:e,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft}});return function(){n.forEach(function(e){e.element.scrollTop=e.scrollTop,e.element.scrollLeft=e.scrollLeft;});}}function ue(e){if(e.focus)return e.focus(),xt(e)?e:null;var t=yt(e);try{return t.HTMLElement.prototype.focus.call(e),xt(e)?e:null}catch(n){var r=xn(e);return r&&xt(e)?e:null}}function se(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.force;t?this.instances=0:this.instances--,this.instances||(this.disengage(),this._result=null);}function le(){return this.instances?(this.instances++,this._result):(this.instances++,this._result=this.engage()||{},this._result.disengage=se.bind(this),this._result)}function ce(){}function de(){if(document.activeElement){if(document.activeElement!==Wr){var e=new Dr("active-element",{bubbles:!1,cancelable:!1,detail:{focus:document.activeElement,blur:Wr}});document.dispatchEvent(e),Wr=document.activeElement;}}else document.body.focus();Hr!==!1&&(Hr=requestAnimationFrame(de));}function fe(){Hr=!0,Wr=document.activeElement,de();}function me(){cancelAnimationFrame(Hr),Hr=!1;}function be(){for(var e=[document.activeElement];e[0]&&e[0].shadowRoot;)e.unshift(e[0].shadowRoot.activeElement);return e}function ve(){var e=Gr({context:document.activeElement});return [document.activeElement].concat(e)}function he(){this.context&&(this.context.forEach(this.disengage),this.context=null,this.engage=null,this.disengage=null);}function ge(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context;return this.context=vt(t||document),this.context.forEach(this.engage),{disengage:he.bind(this)}}function pe(){}function xe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.parent,n=e.element,r=e.includeSelf;if(t)return function(e){return Boolean(r&&e===t||t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)};if(n)return function(e){return Boolean(r&&n===e||e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)};throw new TypeError("util/compare-position#getParentComparator required either options.parent or options.element")}function ye(e){var t=e.context,n=e.filter,r=function(e){var t=xe({parent:e});return n.some(t)},i=[],o=function(e){return n.some(function(t){return e===t})?NodeFilter.FILTER_REJECT:r(e)?NodeFilter.FILTER_ACCEPT:(i.push(e),NodeFilter.FILTER_REJECT)};o.acceptNode=o;for(var a=pt(t),u=a.createTreeWalker(t,NodeFilter.SHOW_ELEMENT,o,!1);u.nextNode(););return i}function we(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=ht({label:"query/shadow-hosts",resolveDocument:!0,defaultToDocument:!0,context:t}),r=pt(t),i=r.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,mi,!1),o=[];for(n.shadowRoot&&(o.push(n),o=o.concat(we({context:n.shadowRoot})));i.nextNode();)o.push(i.currentNode),o=o.concat(we({context:i.currentNode.shadowRoot}));return o}function Ee(e){return Qn(e,!0)}function Se(e){return Qn(e,!1)}function Te(e){$n({element:e,attribute:"aria-hidden",temporaryValue:"true"});}function Ae(e){$n({element:e,attribute:"aria-hidden"});}function Oe(e,t){var n=e.indexOf(t);if(n>0){var r=e.splice(n,1);return r.concat(e)}return e}function Ce(e,t){return Ii.tabsequenceAreaAtImgPosition&&(e=Ti(e,t)),e=Ci(e)}function Ie(e){var t=e?null:!1;return {altKey:t,ctrlKey:t,metaKey:t,shiftKey:t}}function Le(e){var t=-1!==e.indexOf("*"),n=Ie(t);return e.forEach(function(e){if("*"!==e){var t=!0,r=e.slice(0,1);"?"===r?t=null:"!"===r&&(t=!1),t!==!0&&(e=e.slice(1));var i=Ri[e];if(!i)throw new TypeError('Unknown modifier "'+e+'"');n[i]=t;}}),n}function Ne(e){var t=Ni[e]||parseInt(e,10);if(!t||"number"!=typeof t||isNaN(t))throw new TypeError('Unknown key "'+e+'"');return [t].concat(Ni._alias[t]||[])}function Me(e,t){return !Wi.some(function(n){return "boolean"==typeof e[n]&&Boolean(t[n])!==e[n]})}function ke(){Zi=0,$i=0;}function _e(e){e.isPrimary!==!1&&Zi++;}function Pe(e){return e.isPrimary!==!1?e.touches?void(Zi=e.touches.length):void(window.setImmediate||window.setTimeout)(function(){Zi=Math.max(Zi-1,0);}):void 0}function Fe(e){switch(e.keyCode||e.which){case 16:case 17:case 18:case 91:case 93:return}$i++;}function Be(e){switch(e.keyCode||e.which){case 16:case 17:case 18:case 91:case 93:return}(window.setImmediate||window.setTimeout)(function(){$i=Math.max($i-1,0);});}function De(){return {pointer:Boolean(Zi),key:Boolean($i)}}function Re(){Zi=$i=0,window.removeEventListener("blur",ke,!1),document.documentElement.removeEventListener("keydown",Fe,!0),document.documentElement.removeEventListener("keyup",Be,!0),Ui.forEach(function(e){document.documentElement.removeEventListener(e,_e,!0);}),Xi.forEach(function(e){document.documentElement.removeEventListener(e,Pe,!0);});}function We(){return window.addEventListener("blur",ke,!1),document.documentElement.addEventListener("keydown",Fe,!0),document.documentElement.addEventListener("keyup",Be,!0),Ui.forEach(function(e){document.documentElement.addEventListener(e,_e,!0);}),Xi.forEach(function(e){document.documentElement.addEventListener(e,Pe,!0);}),{get:De}}function He(e){return e.hasAttribute("autofocus")}function je(e){return e.tabIndex<=0}function qe(e){var t=e.getAttribute&&e.getAttribute("class")||"";return ""===t?[]:t.split(" ")}function Ge(e,t,n){var r=qe(e),i=r.indexOf(t),o=-1!==i,a=void 0!==n?n:!o;a!==o&&(a||r.splice(i,1),a&&r.push(t),e.setAttribute("class",r.join(" ")));}function Ke(e,t){return Ge(e,t,!1)}function Ve(e,t){return Ge(e,t,!0)}function Ze(e){var t="";if(e.type===to||"shadow-focus"===e.type){var n=ro.get();t=ao||n.pointer&&"pointer"||n.key&&"key"||"script";}else"initial"===e.type&&(t="initial");document.documentElement.setAttribute("data-focus-source",t),e.type!==no&&(uo[t]||Ve(document.documentElement,"focus-source-"+t),uo[t]=!0,oo=t);}function $e(){return oo}function Ue(e){return uo[e]}function Xe(e){ao=e;}function ze(){ao=!1;}function Je(){Ze({type:no}),oo=ao=null,Object.keys(uo).forEach(function(e){Ke(document.documentElement,"focus-source-"+e),uo[e]=!1;}),ro.disengage(),io&&io.disengage(),document.removeEventListener("shadow-focus",Ze,!0),document.documentElement.removeEventListener(to,Ze,!0),document.documentElement.removeEventListener(no,Ze,!0),document.documentElement.removeAttribute("data-focus-source");}function Qe(){return io=$r(),document.addEventListener("shadow-focus",Ze,!0),document.documentElement.addEventListener(to,Ze,!0),document.documentElement.addEventListener(no,Ze,!0),ro=zi(),Ze({type:"initial"}),{used:Ue,current:$e,lock:Xe,unlock:ze}}function Ye(e){var t=e||Kr();lo.cssShadowPiercingDeepCombinator||(t=t.slice(-1));var n=[].slice.call(document.querySelectorAll(vo),0),r=t.map(function(e){return Yn({context:e})}).reduce(function(e,t){return t.concat(e)},[]);n.forEach(function(e){-1===r.indexOf(e)&&Ke(e,bo);}),r.forEach(function(e){-1===n.indexOf(e)&&Ve(e,bo);});}function et(){ho=(window.setImmediate||window.setTimeout)(function(){Ye();});}function tt(){(window.clearImmediate||window.clearTimeout)(ho),Ye();}function nt(e){Ye(e.detail.elements);}function rt(){go&&go.disengage(),(window.clearImmediate||window.clearTimeout)(ho),document.removeEventListener(mo,et,!0),document.removeEventListener(fo,tt,!0),document.removeEventListener("shadow-focus",nt,!0),[].forEach.call(document.querySelectorAll(vo),function(e){Ke(e,bo);});}function it(){lo||(lo=Bn(),vo=ar("."+bo)),go=$r(),document.addEventListener(mo,et,!0),document.addEventListener(fo,tt,!0),document.addEventListener("shadow-focus",nt,!0),Ye();}function ot(e,t){var n=Math.max(e.top,t.top),r=Math.max(e.left,t.left),i=Math.max(Math.min(e.right,t.right),r),o=Math.max(Math.min(e.bottom,t.bottom),n);return {top:n,right:i,bottom:o,left:r,width:i-r,height:o-n}}function at(){var e=window.innerWidth||document.documentElement.clientWidth,t=window.innerHeight||document.documentElement.clientHeight;return {top:0,right:e,bottom:t,left:0,width:e,height:t}}function ut(e){var t=e.getBoundingClientRect(),n=e.offsetWidth-e.clientWidth,r=e.offsetHeight-e.clientHeight,i={top:t.top,left:t.left,right:t.right-n,bottom:t.bottom-r,width:t.width-n,height:t.height-r,area:0};return i.area=i.width*i.height,i}function st(e){var t=window.getComputedStyle(e,null),n="visible";return t.getPropertyValue("overflow-x")!==n&&t.getPropertyValue("overflow-y")!==n}function lt(e){return st(e)?e.offsetHeight<e.scrollHeight||e.offsetWidth<e.scrollWidth:!1}function ct(e){var t=Yn({context:e}).slice(1).filter(lt);return t.length?t.reduce(function(e,t){var n=ut(t),r=ot(n,e);return r.area=Math.min(n.area,e.area),r},ut(t[0])):null}var dt=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},mt=r(e("platform")),bt=r(e("css.escape")),vt=function(e){if(!e)return [];if(Array.isArray(e))return e;if(void 0!==e.nodeType)return [e];if("string"==typeof e&&(e=document.querySelectorAll(e)),void 0!==e.length)return [].slice.call(e,0);throw new TypeError("unexpected input "+String(e))},ht=function(e){var t=e.context,n=e.label,r=void 0===n?"context-to-element":n,i=e.resolveDocument,o=e.defaultToDocument,a=vt(t)[0];if(i&&a&&a.nodeType===Node.DOCUMENT_NODE&&(a=a.documentElement),!a&&o)return document.documentElement;if(!a)throw new TypeError(r+" requires valid options.context");if(a.nodeType!==Node.ELEMENT_NODE&&a.nodeType!==Node.DOCUMENT_FRAGMENT_NODE)throw new TypeError(r+" requires options.context to be an Element");return a},gt=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=ht({label:"get/shadow-host",context:t}),r=null;n;)r=n,n=n.parentNode;return r.nodeType===r.DOCUMENT_FRAGMENT_NODE&&r.host?r.host:null},pt=function(e){return e?e.nodeType===Node.DOCUMENT_NODE?e:e.ownerDocument||document:document},xt=function(e){var t=ht({label:"is/active-element",resolveDocument:!0,context:e}),n=pt(t);if(n.activeElement===t)return !0;var r=gt({context:t});return r&&r.shadowRoot.activeElement===t?!0:!1},yt=function(e){var t=pt(e);return t.defaultView||window},wt=function(e){var t=ht({label:"element/blur",context:e});if(!xt(t))return null;var n=t.nodeName.toLowerCase();if("body"===n)return null;if(t.blur)return t.blur(),document.activeElement;var r=yt(t);try{r.HTMLElement.prototype.blur.call(t);}catch(i){var o=r.document&&r.document.body;if(!o)return null;var a=o.getAttribute("tabindex");o.setAttribute("tabindex","-1"),o.focus(),a?o.setAttribute("tabindex",a):o.removeAttribute("tabindex");}return r.document.activeElement},Et=JSON.parse(JSON.stringify(mt)),St=Et.os.family||"",Tt="Android"===St,At="Windows"===St.slice(0,7),Ot="OS X"===St,Ct="iOS"===St,It="Blink"===Et.layout,Lt="Gecko"===Et.layout,Nt="Trident"===Et.layout,Mt="EdgeHTML"===Et.layout,kt="WebKit"===Et.layout,_t=parseFloat(Et.version),Pt=Math.floor(_t);Et.majorVersion=Pt,Et.is={ANDROID:Tt,WINDOWS:At,OSX:Ot,IOS:Ct,BLINK:It,GECKO:Lt,TRIDENT:Nt,EDGE:Mt,WEBKIT:kt,IE9:Nt&&9===Pt,IE10:Nt&&10===Pt,IE11:Nt&&11===Pt};var Ft=function(e){var t=i(),n={};return Object.keys(e).map(function(r){n[r]=o(t,e[r]);}),a(t),n},Bt="1.4.1",Dt="undefined"!=typeof window&&window.navigator.userAgent||"",Rt="ally-supports-cache",Wt=u(Rt);(Wt.userAgent!==Dt||Wt.version!==Bt)&&(Wt={}),Wt.userAgent=Dt,Wt.version=Bt;var Ht={get:function(){return Wt},set:function(e){Object.keys(e).forEach(function(t){Wt[t]=e[t];}),Wt.time=(new Date).toISOString(),s(Rt,Wt);}},jt=function(){var e=void 0;try{document.querySelector("html >>> :first-child"),e=">>>";}catch(t){try{document.querySelector("html /deep/ :first-child"),e="/deep/";}catch(n){e="";}}return e},qt="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Gt={element:"div",mutate:function(e){return e.innerHTML='<map name="image-map-tabindex-test"><area shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="'+qt+'">',e.querySelector("area")}},Kt={element:"div",mutate:function(e){return e.innerHTML='<map name="image-map-tabindex-test"><area href="#void" tabindex="-1" shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" alt="" src="'+qt+'">',!1},validate:function(e,t,n){if(Et.is.GECKO)return !0;var r=e.querySelector("area");return r.focus(),n.activeElement===r}},Vt={element:"div",mutate:function(e){return e.innerHTML='<map name="image-map-area-href-test"><area shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-area-href-test" alt="" src="'+qt+'">',e.querySelector("area")},validate:function(e,t,n){return Et.is.GECKO?!0:n.activeElement===t}},Zt={name:"can-focus-audio-without-controls",element:"audio",mutate:function(e){try{e.setAttribute("src",qt);}catch(t){}}},$t="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",Ut={element:"div",mutate:function(e){return e.innerHTML='<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#broken-image-map-test" alt="" src="'+$t+'">',e.querySelector("area")}},Xt={element:"div",mutate:function(e){return e.setAttribute("tabindex","-1"),e.setAttribute("style","display: -webkit-flex; display: -ms-flexbox; display: flex;"),e.innerHTML='<span style="display: block;">hello</span>',e.querySelector("span")}},zt={element:"fieldset",mutate:function(e){e.setAttribute("tabindex",0),e.setAttribute("disabled","disabled");}},Jt={element:"fieldset",mutate:function(e){e.innerHTML="<legend>legend</legend><p>content</p>";}},Qt={element:"span",mutate:function(e){e.setAttribute("style","display: -webkit-flex; display: -ms-flexbox; display: flex;"),e.innerHTML='<span style="display: block;">hello</span>';}},Yt={element:"form",mutate:function(e){e.setAttribute("tabindex",0),e.setAttribute("disabled","disabled");}},en={element:"a",mutate:function(e){return e.href="#void",e.innerHTML='<img ismap src="'+qt+'" alt="">',e.querySelector("img")}},tn={element:"div",mutate:function(e){return e.innerHTML='<map name="image-map-tabindex-test"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="'+qt+'">',e.querySelector("img")}},nn={element:function(e,t){var n=t.createElement("iframe");e.appendChild(n);var r=n.contentWindow.document;return r.open(),r.close(),n},mutate:function(e){e.style.visibility="hidden";var t=e.contentWindow.document,n=t.createElement("input");return t.body.appendChild(n),n},validate:function(e){var t=e.contentWindow.document,n=t.querySelector("input");return t.activeElement===n}},rn=!Et.is.WEBKIT,on=function(){return rn},an={element:"div",mutate:function(e){e.setAttribute("tabindex","invalid-value");}},un={element:"label",mutate:function(e){e.setAttribute("tabindex","-1");},validate:function(e,t,n){e.offsetHeight;return e.focus(),n.activeElement===e}},sn="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0ic3ZnIj48dGV4dCB4PSIxMCIgeT0iMjAiIGlkPSJzdmctbGluay10ZXh0Ij50ZXh0PC90ZXh0Pjwvc3ZnPg==",ln={element:"object",mutate:function(e){e.setAttribute("type","image/svg+xml"),e.setAttribute("data",sn),e.setAttribute("width","200"),e.setAttribute("height","50"),e.style.visibility="hidden";}},cn={name:"can-focus-object-svg",element:"object",mutate:function(e){e.setAttribute("type","image/svg+xml"),e.setAttribute("data",sn),e.setAttribute("width","200"),e.setAttribute("height","50");},validate:function(e,t,n){return Et.is.GECKO?!0:n.activeElement===e}},dn=!Et.is.IE9,fn=function(){return dn},mn={element:"div",mutate:function(e){return e.innerHTML='<map name="focus-redirect-img-usemap"><area href="#void" shape="rect" coords="63,19,144,45"></map><img usemap="#focus-redirect-img-usemap" alt="" src="'+qt+'">',
	e.querySelector("img")},validate:function(e,t,n){var r=e.querySelector("area");return n.activeElement===r}},bn={element:"fieldset",mutate:function(e){return e.innerHTML='<legend>legend</legend><input tabindex="-1"><input tabindex="0">',!1},validate:function(e,t,n){var r=e.querySelector('input[tabindex="-1"]'),i=e.querySelector('input[tabindex="0"]');return e.focus(),e.querySelector("legend").focus(),n.activeElement===r&&"focusable"||n.activeElement===i&&"tabbable"||""}},vn={element:"div",mutate:function(e){return e.setAttribute("style","width: 100px; height: 50px; overflow: auto;"),e.innerHTML='<div style="width: 500px; height: 40px;">scrollable content</div>',e.querySelector("div")}},hn={element:"div",mutate:function(e){e.setAttribute("style","width: 100px; height: 50px;"),e.innerHTML='<div style="width: 500px; height: 40px;">scrollable content</div>';}},gn={element:"div",mutate:function(e){e.setAttribute("style","width: 100px; height: 50px; overflow: auto;"),e.innerHTML='<div style="width: 500px; height: 40px;">scrollable content</div>';}},pn={element:"details",mutate:function(e){return e.innerHTML="<summary>foo</summary><p>content</p>",e.firstElementChild}},xn=function(e){var t=e.ownerSVGElement||"svg"===e.nodeName.toLowerCase();if(!t)return !1;var n=l();e.appendChild(n);var r=n.querySelector("input");return r.focus(),r.disabled=!0,e.removeChild(n),!0},yn={element:"div",mutate:function(e){return e.innerHTML=c('<text focusable="true">a</text>'),e.querySelector("text")},validate:f},wn={element:"div",mutate:function(e){return e.innerHTML=c('<text tabindex="0">a</text>'),e.querySelector("text")},validate:f},En={element:"div",mutate:function(e){return e.innerHTML=c('<text tabindex="-1">a</text>'),e.querySelector("text")},validate:f},Sn={element:"div",mutate:function(e){return e.innerHTML=c(['<g id="ally-test-target"><a xlink:href="#void"><text>link</text></a></g>','<use xlink:href="#ally-test-target" x="0" y="0" tabindex="-1" />'].join("")),e.querySelector("use")},validate:f},Tn={element:"div",mutate:function(e){return e.innerHTML=c('<foreignObject tabindex="-1"><input type="text" /></foreignObject>'),e.querySelector("foreignObject")||e.getElementsByTagName("foreignObject")[0]},validate:f},An=Boolean(Et.is.GECKO&&"undefined"!=typeof SVGElement&&SVGElement.prototype.focus),On=function(){return An},Cn={element:"div",mutate:function(e){return e.innerHTML=c(""),e.firstChild},validate:f},In={element:"div",mutate:function(e){e.setAttribute("tabindex","3x");}},Ln={element:"table",mutate:function(e,t,n){var r=n.createDocumentFragment();r.innerHTML="<tr><td>cell</td></tr>",e.appendChild(r);}},Nn={element:"video",mutate:function(e){try{e.setAttribute("src",qt);}catch(t){}}},Mn=Et.is.GECKO||Et.is.TRIDENT||Et.is.EDGE,kn=function(){return Mn},_n={cssShadowPiercingDeepCombinator:jt,focusInZeroDimensionObject:on,focusObjectSwf:fn,focusSvgInIframe:On,tabsequenceAreaAtImgPosition:kn},Pn={focusAreaImgTabindex:Gt,focusAreaTabindex:Kt,focusAreaWithoutHref:Vt,focusAudioWithoutControls:Zt,focusBrokenImageMap:Ut,focusChildrenOfFocusableFlexbox:Xt,focusFieldsetDisabled:zt,focusFieldset:Jt,focusFlexboxContainer:Qt,focusFormDisabled:Yt,focusImgIsmap:en,focusImgUsemapTabindex:tn,focusInHiddenIframe:nn,focusInvalidTabindex:an,focusLabelTabindex:un,focusObjectSvg:cn,focusObjectSvgHidden:ln,focusRedirectImgUsemap:mn,focusRedirectLegend:bn,focusScrollBody:vn,focusScrollContainerWithoutOverflow:hn,focusScrollContainer:gn,focusSummary:pn,focusSvgFocusableAttribute:yn,focusSvgTabindexAttribute:wn,focusSvgNegativeTabindexAttribute:En,focusSvgUseTabindex:Sn,focusSvgForeignobjectTabindex:Tn,focusSvg:Cn,focusTabindexTrailingCharacters:In,focusTable:Ln,focusVideoWithoutControls:Nn},Fn=null,Bn=function(){return Fn?Fn:(Fn=Ht.get(),Fn.time||(Ht.set(m()),Fn=Ht.get()),Fn)},Dn=void 0,Rn=/^\s*(-|\+)?[0-9]+\s*$/,Wn=/^\s*(-|\+)?[0-9]+.*$/,Hn=function(e){Dn||(Dn=Bn());var t=Dn.focusTabindexTrailingCharacters?Wn:Rn,n=ht({label:"is/valid-tabindex",resolveDocument:!0,context:e}),r=n.hasAttribute("tabindex"),i=n.hasAttribute("tabIndex");if(!r&&!i)return !1;var o=n.ownerSVGElement||"svg"===n.nodeName.toLowerCase();if(o&&!Dn.focusSvgTabindexAttribute)return !1;if(Dn.focusInvalidTabindex)return !0;var a=n.getAttribute(r?"tabindex":"tabIndex");return "-32768"===a?!1:Boolean(a&&t.test(a))},jn=function(e){if(!Hn(e))return null;var t=e.hasAttribute("tabindex"),n=t?"tabindex":"tabIndex",r=parseInt(e.getAttribute(n),10);return isNaN(r)?-1:r},qn=void 0,Gn=void 0,Kn={input:!0,select:!0,textarea:!0,button:!0,fieldset:!0,form:!0},Vn=function(e){qn||(qn=Bn(),qn.focusFieldsetDisabled&&delete Kn.fieldset,qn.focusFormDisabled&&delete Kn.form,Gn=new RegExp("^("+Object.keys(Kn).join("|")+")$"));var t=ht({label:"is/native-disabled-supported",context:e}),n=t.nodeName.toLowerCase();return Boolean(Gn.test(n))},Zn=function(e){var t=e.element,n=e.attribute,r="data-cached-"+n,i=t.getAttribute(r);if(null===i){var o=t.getAttribute(n);if(null===o)return;t.setAttribute(r,o||""),t.removeAttribute(n);}else{var a=t.getAttribute(r);t.removeAttribute(r),t.setAttribute(n,a);}},$n=function(e){var t=e.element,n=e.attribute,r=e.temporaryValue,i=e.saveValue,o="data-cached-"+n;if(void 0!==r){var a=i||t.getAttribute(n);t.setAttribute(o,a||""),t.setAttribute(n,r);}else{var u=t.getAttribute(o);t.removeAttribute(o),""===u?t.removeAttribute(n):t.setAttribute(n,u);}},Un=function(){},Xn={log:Un,debug:Un,info:Un,warn:Un,error:Un},zn="undefined"!=typeof console?console:Xn,Jn=void 0,Qn=function(e,t){Jn||(Jn=Bn());var n=ht({label:"element/disabled",context:e});t=Boolean(t);var r=n.hasAttribute("data-ally-disabled"),i=1===arguments.length;return Vn(n)?i?n.disabled:(n.disabled=t,n):i?r:r===t?n:(E(n,t),n)},Yn=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=[],r=ht({label:"get/parents",context:t});r;)n.push(r),r=r.parentNode,r&&r.nodeType!==Node.ELEMENT_NODE&&(r=null);return n},er=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector"],tr=null,nr=void 0;L.except=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(t){return L({context:t,except:e})};return t.rules=L,t};var rr=L.except({}),ir=function(e){try{return e.contentDocument||e.contentWindow&&e.contentWindow.document||e.getSVGDocument&&e.getSVGDocument()||null}catch(t){return null}},or=void 0,ar=function(e){if("string"!=typeof or){var t=jt();t&&(or=", html "+t+" ");}return or?e+or+e.replace(/\s*,\s*/g,",").split(",").join(or):e},ur=void 0,sr=/^(area)$/;D.except=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(t){return D({context:t,except:e})};return t.rules=D,t};var lr=D.except({}),cr=void 0,dr=function(e){cr||(cr=Bn());var t=ht({label:"is/valid-area",context:e}),n=t.nodeName.toLowerCase();if("area"!==n)return !1;var r=t.hasAttribute("tabindex");if(!cr.focusAreaTabindex&&r)return !1;var i=H(t);if(!i||!lr(i))return !1;if(!cr.focusBrokenImageMap&&(!i.complete||!i.naturalHeight||i.offsetWidth<=0||i.offsetHeight<=0))return !1;if(!cr.focusAreaWithoutHref&&!t.href)return cr.focusAreaTabindex&&r||cr.focusAreaImgTabindex&&i.hasAttribute("tabindex");var o=Yn({context:i}).slice(1).some(function(e){var t=e.nodeName.toLowerCase();return "button"===t||"a"===t});return o?!1:!0},fr=void 0,mr=function(e){fr||(fr=Bn());var t=ht({label:"is/disabled",context:e});if(t.hasAttribute("data-ally-disabled"))return !0;if(!Vn(t))return !1;if(t.disabled)return !0;var n=Yn({context:t});return n.some(j)?!0:!fr.focusFormDisabled&&n.some(q)?!0:!1};G.except=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(t){return G({context:t,except:e})};return t.rules=G,t};var br=G.except({}),vr=void 0;V.except=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(t){return V({context:t,except:e})};return t.rules=V,t};var hr=V.except({}),gr=Z(rr),pr=void 0,xr=void 0,yr=function(){return pr||(pr=Bn()),"string"==typeof xr?xr:(xr=""+(pr.focusTable?"table, td,":"")+(pr.focusFieldset?"fieldset,":"")+"svg a,a[href],area[href],input, select, textarea, button,iframe, object, embed,keygen,"+(pr.focusAudioWithoutControls?"audio,":"audio[controls],")+(pr.focusVideoWithoutControls?"video,":"video[controls],")+(pr.focusSummary?"summary,":"")+"[tabindex],[contenteditable]",xr=ar(xr))},wr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.includeContext,r=e.includeOnlyTabbable,i=e.strategy,o=void 0===i?"quick":i,a=ht({label:"query/focusable",resolveDocument:!0,defaultToDocument:!0,context:t}),u={context:a,includeContext:n,includeOnlyTabbable:r,strategy:o};if("quick"===o)return U(u);if("strict"===o||"all"===o)return $(u);throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict", "all"]')},Er=void 0,Sr=/^(fieldset|table|td|body)$/;X.except=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(t){return X({context:t,except:e})};return t.rules=X,t};var Tr=rr.rules.except({flexbox:!0}),Ar=X.except({flexbox:!0}),Or=X.except({}),Cr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.includeContext,r=e.includeOnlyTabbable,i=e.strategy,o=Or.rules.except({onlyTabbable:r});return wr({context:t,includeContext:n,includeOnlyTabbable:r,strategy:i}).filter(o)},Ir=function(e){return e.sort(z)},Lr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.list,n=e.elements,r=e.resolveElement,i=t.slice(0),o=vt(n).slice(0);Ir(o);var a=Q(i,o,r);return Y(i,a),i},Nr=void 0,Mr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.skipFocusable;Nr||(Nr=Bn());var r=ht({label:"get/focus-redirect-target",context:t});if(!n&&hr(r))return null;var i=r.nodeName.toLowerCase(),o=pt(r);return "label"===i?te(r,o):"legend"===i?ie(r,o):"img"===i?oe(r,o):null},kr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.except,r=ht({label:"get/focus-target",context:t}),i=null,o=function(e){var t=hr.rules({context:e,except:n});return t?(i=e,!0):(i=Mr({context:e,skipFocusable:!0}),Boolean(i))};return o(r)?i:(Yn({context:r}).slice(1).some(o),i)},_r={flexbox:!0,scrollable:!0,onlyTabbable:!0},Pr=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.defaultToAncestor,r=t.undoScrolling,i=ht({label:"element/focus",context:e}),o=hr.rules({context:i,except:_r});if(!n&&!o)return null;var a=kr({context:i,except:_r});if(!a)return null;if(xt(a))return a;var u=void 0;r&&(u=ae(a));var s=ue(a);return u&&u(),s},Fr={blur:wt,disabled:Qn,focus:Pr};"undefined"!=typeof window&&function(){for(var e=0,t=["ms","moz","webkit","o"],n="",r="",i=0,o=t.length;o>i;++i)n=window[t[i]+"RequestAnimationFrame"],r=window[t[i]+"CancelAnimationFrame"]||window[t[i]+"CancelRequestAnimationFrame"];"function"!=typeof window.requestAnimationFrame&&(window.requestAnimationFrame=window[n]||function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+r);},r);return e=n+r,i}),"function"!=typeof window.cancelAnimationFrame&&(window.cancelAnimationFrame=window[r]||function(e){clearTimeout(e);});}();var Br="undefined"!=typeof window&&window.CustomEvent||function(){};"function"!=typeof Br&&(Br=function(e,t){var n=document.createEvent("CustomEvent");return !t&&(t={bubbles:!1,cancelable:!1,detail:void 0}),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n},Br.prototype=window.Event.prototype);var Dr=Br,Rr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.engage,n=e.disengage,r={engage:t||ce,disengage:n||ce,instances:0,_result:null};return le.bind(r)},Wr=void 0,Hr=void 0,jr=Rr({engage:fe,disengage:me}),qr=function(e){var t=ht({label:"is/shadowed",resolveDocument:!0,context:e});return Boolean(gt({context:t}))},Gr=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=[],r=ht({label:"get/shadow-host-parents",context:t});r&&(r=gt({context:r}));)n.push(r);return n},Kr=function(){return null===document.activeElement&&document.body.focus(),qr(document.activeElement)?ve():be()},Vr=void 0,Zr=void 0;"undefined"!=typeof document&&document.documentElement.createShadowRoot?!function(){var e=void 0,t=void 0,n=function(){i(),(window.clearImmediate||window.clearTimeout)(e),e=(window.setImmediate||window.setTimeout)(function(){o();});},r=function(e){e.addEventListener("blur",n,!0),t=e;},i=function(){t&&t.removeEventListener("blur",n,!0),t=null;},o=function(){var e=Kr();if(1===e.length)return void i();r(e[0]);var t=new CustomEvent("shadow-focus",{bubbles:!1,cancelable:!1,detail:{elements:e,active:e[0],hosts:e.slice(1)}});document.dispatchEvent(t);},a=function(){(window.clearImmediate||window.clearTimeout)(e),o();};Vr=function(){document.addEventListener("focus",a,!0);},Zr=function(){(window.clearImmediate||window.clearTimeout)(e),t&&t.removeEventListener("blur",n,!0),document.removeEventListener("focus",a,!0);};}():Vr=Zr=function(){};var $r=Rr({engage:Vr,disengage:Zr}),Ur={activeElement:jr,shadowFocus:$r},Xr=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.engage,n=e.disengage,r={engage:t||pe,disengage:n||pe,context:null};return ge.bind(r)},zr=void 0,Jr=void 0,Qr=Et.is.TRIDENT&&(Et.is.IE10||Et.is.IE11);Qr?!function(){var e=function(e){var t=kr({context:e.target,except:{flexbox:!0,scrollable:!0}});if(t&&t!==e.target){window.setImmediate(function(){t.focus();});var n=[].map.call(t.children,function(e){var t=e.style.visibility||"",n=e.style.transition||"";return e.style.visibility="hidden",e.style.transition="none",[e,t,n]});window.setImmediate(function(){n.forEach(function(e){e[0].style.visibility=e[1],e[0].style.transition=e[2];});});}};zr=function(t){t.addEventListener("mousedown",e,!0);},Jr=function(t){t.removeEventListener("mousedown",e,!0);};}():zr=function(){};var Yr=Xr({engage:zr,disengage:Jr}),ei=void 0,ti=void 0,ni=Et.is.OSX&&(Et.is.GECKO||Et.is.WEBKIT);ni?!function(){var e=function(e){if(!e.defaultPrevented&&T(e.target,"input, button, button *")){var t=kr({context:e.target});(window.setImmediate||window.setTimeout)(function(){t.focus();});}},t=function(e){if(!e.defaultPrevented&&T(e.target,"label, label *")){var t=kr({context:e.target});t&&t.focus();}};ei=function(n){n.addEventListener("mousedown",e,!1),n.addEventListener("mouseup",t,!1);},ti=function(n){n.removeEventListener("mousedown",e,!1),n.removeEventListener("mouseup",t,!1);};}():ei=function(){};var ri=Xr({engage:ei,disengage:ti}),ii=void 0,oi=void 0,ai=Et.is.WEBKIT;ai?!function(){var e=function(e){var t=kr({context:e.target});!t||t.hasAttribute("tabindex")&&Hn(t)||(t.setAttribute("tabindex",0),(window.setImmediate||window.setTimeout)(function(){t.removeAttribute("tabindex");},0));};ii=function(t){t.addEventListener("mousedown",e,!0),t.addEventListener("touchstart",e,!0);},oi=function(t){t.removeEventListener("mousedown",e,!0),t.removeEventListener("touchstart",e,!0);};}():ii=function(){};var ui=Xr({engage:ii,disengage:oi}),si={pointerFocusChildren:Yr,pointerFocusInput:ri,pointerFocusParent:ui},li=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=pt(t),r=void 0;try{r=n.activeElement;}catch(i){}return r&&r.nodeType||(r=n.body||n.documentElement),r},ci=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.filter;if(t=ht({label:"get/insignificant-branches",defaultToDocument:!0,context:t}),n=vt(n),!n.length)throw new TypeError("get/insignificant-branches requires valid options.filter");return ye({context:t,filter:n})},di={activeElement:li,activeElements:Kr,focusRedirectTarget:Mr,focusTarget:kr,insignificantBranches:ci,parents:Yn,shadowHostParents:Gr,shadowHost:gt},fi={activeElement:xt,disabled:mr,focusRelevant:rr,focusable:hr,onlyTabbable:br,shadowed:qr,tabbable:Or,validArea:dr,validTabindex:Hn,visible:lr},mi=function(e){return e.shadowRoot?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP};mi.acceptNode=mi;for(var bi={childList:!0,subtree:!0},vi=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.context,o=r.callback,a=r.config;n(this,e),this.config=a,this.disengage=this.disengage.bind(this),this.clientObserver=new MutationObserver(o),this.hostObserver=new MutationObserver(function(e){return e.forEach(t.handleHostMutation,t)}),this.observeContext(i),this.observeShadowHosts(i);}return dt(e,[{key:"disengage",value:function(){this.clientObserver&&this.clientObserver.disconnect(),this.clientObserver=null,this.hostObserver&&this.hostObserver.disconnect(),this.hostObserver=null;}},{key:"observeShadowHosts",value:function(e){var t=this,n=we({context:e});n.forEach(function(e){return t.observeContext(e.shadowRoot)});}},{key:"observeContext",value:function(e){this.clientObserver.observe(e,this.config),this.hostObserver.observe(e,bi);}},{key:"handleHostMutation",value:function(e){if("childList"===e.type){var t=vt(e.addedNodes).filter(function(e){return e.nodeType===Node.ELEMENT_NODE});t.forEach(this.observeShadowHosts,this);}}}]),e}(),hi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.callback,r=e.config;if("function"!=typeof n)throw new TypeError("observe/shadow-mutations requires options.callback to be a function");if("object"!==("undefined"==typeof r?"undefined":ft(r)))throw new TypeError("observe/shadow-mutations requires options.config to be an object");if(!window.MutationObserver)return {disengage:function(){}};var i=ht({label:"observe/shadow-mutations",resolveDocument:!0,defaultToDocument:!0,context:t}),o=new vi({context:i,callback:n,config:r});return {disengage:o.disengage}},gi={attributes:!0,childList:!0,subtree:!0,attributeFilter:["tabindex","disabled","data-ally-disabled"]},pi=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=r.context,o=r.filter;n(this,e),this._context=vt(i||document.documentElement)[0],this._filter=vt(o),this._inertElementCache=[],this.disengage=this.disengage.bind(this),this.handleMutation=this.handleMutation.bind(this),this.renderInert=this.renderInert.bind(this),this.filterElements=this.filterElements.bind(this),this.filterParentElements=this.filterParentElements.bind(this);var a=wr({context:this._context,includeContext:!0,strategy:"all"});this.renderInert(a),this.shadowObserver=hi({context:this._context,config:gi,callback:function(e){return e.forEach(t.handleMutation)}});}return dt(e,[{key:"disengage",value:function(){this._context&&(Se(this._context),this._inertElementCache.forEach(function(e){return Se(e)}),this._inertElementCache=null,this._filter=null,this._context=null,this.shadowObserver&&this.shadowObserver.disengage(),this.shadowObserver=null);}},{key:"listQueryFocusable",value:function(e){return e.map(function(e){return wr({context:e,includeContext:!0,strategy:"all"})}).reduce(function(e,t){return e.concat(t)},[])}},{key:"renderInert",value:function(e){var t=this,n=function(e){t._inertElementCache.push(e),Ee(e);};e.filter(this.filterElements).filter(this.filterParentElements).filter(function(e){return !Qn(e)}).forEach(n);}},{key:"filterElements",value:function(e){var t=xe({element:e,includeSelf:!0});return !this._filter.some(t)}},{key:"filterParentElements",value:function(e){var t=xe({parent:e});return !this._filter.some(t)}},{key:"handleMutation",value:function(e){if("childList"===e.type){var t=vt(e.addedNodes).filter(function(e){return e.nodeType===Node.ELEMENT_NODE});if(!t.length)return;var n=this.listQueryFocusable(t);this.renderInert(n);}else"attributes"===e.type&&this.renderInert([e.target]);}}]),e}(),xi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.filter,r=new pi({context:t,filter:n});return {disengage:r.disengage}},yi={attributes:!1,childList:!0,subtree:!0},wi=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.context,i=t.filter;n(this,e),this._context=vt(r||document.documentElement)[0],this._filter=vt(i),this.disengage=this.disengage.bind(this),this.handleMutation=this.handleMutation.bind(this),this.isInsignificantBranch=this.isInsignificantBranch.bind(this);var o=ci({context:this._context,filter:this._filter});o.forEach(Te),this.startObserver();}return dt(e,[{key:"disengage",value:function(){this._context&&([].forEach.call(this._context.querySelectorAll("[data-cached-aria-hidden]"),Ae),this._context=null,this._filter=null,this._observer&&this._observer.disconnect(),this._observer=null);}},{key:"startObserver",value:function(){var e=this;window.MutationObserver&&(this._observer=new MutationObserver(function(t){return t.forEach(e.handleMutation)}),this._observer.observe(this._context,yi));}},{key:"handleMutation",value:function(e){"childList"===e.type&&vt(e.addedNodes).filter(function(e){return e.nodeType===Node.ELEMENT_NODE}).filter(this.isInsignificantBranch).forEach(Te);}},{key:"isInsignificantBranch",value:function(e){var t=Yn({context:e});if(t.some(function(e){return "true"===e.getAttribute("aria-hidden")}))return !1;var n=xe({element:e});return this._filter.some(n)?!1:!0}}]),e}(),Ei=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.filter,r=new wi({context:t,filter:n});return {disengage:r.disengage}},Si=function(){function e(t){n(this,e),this._document=pt(t),this.maps={};}return dt(e,[{key:"getAreasFor",value:function(e){return this.maps[e]||this.addMapByName(e),this.maps[e]}},{key:"addMapByName",value:function(e){var t=R(e,this._document);t&&(this.maps[t.name]=Cr({context:t}));}},{key:"extractAreasFromList",value:function(e){return e.filter(function(e){var t=e.nodeName.toLowerCase();if("area"!==t)return !0;var n=e.parentNode;return this.maps[n.name]||(this.maps[n.name]=[]),this.maps[n.name].push(e),!1},this)}}]),e}(),Ti=function(e,t){var n=t.querySelectorAll("img[usemap]"),r=new Si(t),i=r.extractAreasFromList(e);return n.length?Lr({list:i,elements:n,resolveElement:function(e){var t=e.getAttribute("usemap").slice(1);return r.getAreasFor(t)}}):i},Ai=function(){function e(t,r){n(this,e),this.context=t,this.sortElements=r,this.hostCounter=1,this.inHost={},this.inDocument=[],this.hosts={},this.elements={};}return dt(e,[{key:"_registerHost",value:function(e){if(!e._sortingId){e._sortingId="shadow-"+this.hostCounter++,this.hosts[e._sortingId]=e;var t=gt({context:e});t?(this._registerHost(t),this._registerHostParent(e,t)):this.inDocument.push(e);}}},{key:"_registerHostParent",value:function(e,t){this.inHost[t._sortingId]||(this.inHost[t._sortingId]=[]),this.inHost[t._sortingId].push(e);}},{key:"_registerElement",value:function(e,t){this.elements[t._sortingId]||(this.elements[t._sortingId]=[]),this.elements[t._sortingId].push(e);}},{key:"extractElements",value:function(e){return e.filter(function(e){var t=gt({context:e});return t?(this._registerHost(t),this._registerElement(e,t),!1):!0},this)}},{key:"sort",value:function(e){var t=this._injectHosts(e);return t=this._replaceHosts(t),this._cleanup(),t}},{key:"_injectHosts",value:function(e){return Object.keys(this.hosts).forEach(function(e){var t=this.elements[e],n=this.inHost[e],r=this.hosts[e].shadowRoot;this.elements[e]=this._merge(t,n,r);},this),this._merge(e,this.inDocument,this.context)}},{key:"_merge",value:function(e,t,n){var r=Lr({list:e,elements:t});return this.sortElements(r,n)}},{key:"_replaceHosts",value:function(e){return Lr({list:e,elements:this.inDocument,resolveElement:this._resolveHostElement.bind(this)})}},{key:"_resolveHostElement",value:function(e){var t=Lr({list:this.elements[e._sortingId],elements:this.inHost[e._sortingId],resolveElement:this._resolveHostElement.bind(this)}),n=jn(e);return null!==n&&n>-1?[e].concat(t):t}},{key:"_cleanup",value:function(){Object.keys(this.hosts).forEach(function(e){delete this.hosts[e]._sortingId;},this);}}]),e}(),Oi=function(e,t,n){var r=new Ai(t,n),i=r.extractElements(e);return i.length===e.length?n(e):r.sort(i)},Ci=function(e){var t={},n=[],r=e.filter(function(e){var r=e.tabIndex;return void 0===r&&(r=jn(e)),0>=r||null===r||void 0===r?!0:(t[r]||(t[r]=[],n.push(r)),t[r].push(e),!1)}),i=n.sort().map(function(e){return t[e]}).reduceRight(function(e,t){return t.concat(e)},r);return i},Ii=void 0,Li=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.includeContext,r=e.includeOnlyTabbable,i=e.strategy;Ii||(Ii=Bn());var o=vt(t)[0]||document.documentElement,a=Cr({context:o,includeContext:n,includeOnlyTabbable:r,strategy:i});return a=document.body.createShadowRoot&&Et.is.BLINK?Oi(a,o,Ce):Ce(a,o),n&&(a=Oe(a,o)),a},Ni={tab:9,left:37,up:38,right:39,down:40,pageUp:33,"page-up":33,pageDown:34,"page-down":34,end:35,home:36,enter:13,escape:27,space:32,shift:16,capsLock:20,"caps-lock":20,ctrl:17,alt:18,meta:91,pause:19,insert:45,"delete":46,backspace:8,_alias:{91:[92,93,224]}},Mi=1;26>Mi;Mi++)Ni["f"+Mi]=Mi+111;for(var ki=0;10>ki;ki++){var _i=ki+48,Pi=ki+96;Ni[ki]=_i,Ni["num-"+ki]=Pi,Ni._alias[_i]=[Pi];}for(var Fi=0;26>Fi;Fi++){var Bi=Fi+65,Di=String.fromCharCode(Bi).toLowerCase();Ni[Di]=Bi;}var Ri={alt:"altKey",ctrl:"ctrlKey",meta:"metaKey",shift:"shiftKey"},Wi=Object.keys(Ri).map(function(e){return Ri[e]}),Hi=function(e){return e.split(/\s+/).map(function(e){var t=e.split("+"),n=Le(t.slice(0,-1)),r=Ne(t.slice(-1));return {keyCodes:r,modifiers:n,matchModifiers:Me.bind(null,n)}})},ji=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={},n=vt(e.context)[0]||document.documentElement;delete e.context;var r=vt(e.filter);delete e.filter;var i=Object.keys(e);if(!i.length)throw new TypeError("when/key requires at least one option key");var o=function(e){e.keyCodes.forEach(function(n){t[n]||(t[n]=[]),t[n].push(e);});};i.forEach(function(t){if("function"!=typeof e[t])throw new TypeError('when/key requires option["'+t+'"] to be a function');var n=function(n){return n.callback=e[t],n};Hi(t).map(n).forEach(o);});var a=function(e){if(!e.defaultPrevented){if(r.length){var i=xe({element:e.target,includeSelf:!0});if(r.some(i))return}var o=e.keyCode||e.which;t[o]&&t[o].forEach(function(t){t.matchModifiers(e)&&t.callback.call(n,e,u);});}};n.addEventListener("keydown",a,!1);var u=function(){n.removeEventListener("keydown",a,!1);};return {disengage:u}},qi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context;return t||(t=document.documentElement),Li(),ji({"?alt+?shift+tab":function(e){e.preventDefault();var n=Li({context:t}),r=e.shiftKey,i=n[0],o=n[n.length-1],a=r?i:o,u=r?o:i;if(xt(a))return void u.focus();var s=void 0,l=n.some(function(e,t){return xt(e)?(s=t,!0):!1});if(!l)return void i.focus();var c=r?-1:1;n[s+c].focus();}})},Gi={disabled:xi,hidden:Ei,tabFocus:qi},Ki={"aria-busy":{"default":"false",values:["true","false"]},"aria-checked":{"default":void 0,values:["true","false","mixed",void 0]},"aria-disabled":{"default":"false",values:["true","false"]},"aria-expanded":{"default":void 0,values:["true","false",void 0]},"aria-grabbed":{"default":void 0,values:["true","false",void 0]},"aria-hidden":{"default":"false",values:["true","false"]},"aria-invalid":{"default":"false",values:["true","false","grammar","spelling"]},"aria-pressed":{"default":void 0,values:["true","false","mixed",void 0]},"aria-selected":{"default":void 0,values:["true","false",void 0]},"aria-atomic":{"default":"false",values:["true","false"]},"aria-autocomplete":{"default":"none",values:["inline","list","both","none"]},"aria-dropeffect":{"default":"none",multiple:!0,values:["copy","move","link","execute","popup","none"]},"aria-haspopup":{"default":"false",values:["true","false"]},"aria-live":{"default":"off",values:["off","polite","assertive"]},"aria-multiline":{"default":"false",values:["true","false"]},"aria-multiselectable":{"default":"false",values:["true","false"]},"aria-orientation":{"default":"horizontal",values:["vertical","horizontal"]},"aria-readonly":{"default":"false",values:["true","false"]},"aria-relevant":{"default":"additions text",multiple:!0,values:["additions","removals","text","all"]},"aria-required":{"default":"false",values:["true","false"]},"aria-sort":{"default":"none",other:!0,values:["ascending","descending","none"]}},Vi={attribute:Ki,keycode:Ni},Zi=0,$i=0,Ui=["touchstart","pointerdown","MSPointerDown","mousedown"],Xi=["touchend","touchcancel","pointerup","MSPointerUp","pointercancel","MSPointerCancel","mouseup"],zi=Rr({engage:We,disengage:Re}),Ji={interactionType:zi,shadowMutations:hi},Qi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.sequence,r=e.strategy,i=e.ignoreAutofocus,o=e.defaultToContext,a=e.includeOnlyTabbable,u=-1;n||(t=vt(t||document.body)[0],n=Cr({context:t,includeOnlyTabbable:a,strategy:r})),n.length&&!i&&(u=N(n,He)),n.length&&-1===u&&(u=N(n,je));var s=hr.rules.except({onlyTabbable:a});return -1===u&&o&&t&&s(t)?t:n[u]||null},Yi={firstTabbable:Qi,focusable:wr,shadowHosts:we,tabbable:Cr,tabsequence:Li},eo="undefined"!=typeof document&&"onfocusin"in document,to=eo?"focusin":"focus",no=eo?"focusout":"blur",ro=void 0,io=void 0,oo=null,ao=null,uo={pointer:!1,key:!1,script:!1,initial:!1},so=Rr({engage:Qe,disengage:Je}),lo=void 0,co="undefined"!=typeof document&&"onfocusin"in document,fo=co?"focusin":"focus",mo=co?"focusout":"blur",bo="ally-focus-within",vo=void 0,ho=void 0,go=void 0,po=Rr({engage:it,disengage:rt}),xo={focusSource:so,focusWithin:po},yo=function Oo(e){var t=e.getBoundingClientRect(),n=at();n.area=n.width*n.height;var r=n,i=ct(e);if(i){if(!i.width||!i.height)return 0;r=ot(i,n),r.area=i.area;}var o=ot(t,r);if(!o.width||!o.height)return 0;var a=t.width*t.height,u=Math.min(a,r.area),Oo=Math.round(o.width)*Math.round(o.height)/u,s=1e4,l=Math.round(Oo*s)/s;return Math.min(l,1)},wo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.callback,r=e.area;if("function"!=typeof n)throw new TypeError("when/visible-area requires options.callback to be a function");"number"!=typeof r&&(r=1);var i=ht({label:"when/visible-area",context:t}),o=void 0,a=null,u=function(){o&&cancelAnimationFrame(o);},s=function(){return !lr(i)||yo(i)<r||n(i)===!1},l=function(){return s()?void a():void u()};return a=function(){o=requestAnimationFrame(l);},a(),{disengage:u}},Eo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.context,n=e.callback,r=e.area;if("function"!=typeof n)throw new TypeError("when/focusable requires options.callback to be a function");var i=ht({label:"when/focusable",context:t}),o=function(e){return hr(e)?n(e):!1},a=pt(i),u=wo({context:i,callback:o,area:r}),s=function l(){a.removeEventListener("focus",l,!0),u&&u.disengage();};return a.addEventListener("focus",s,!0),{disengage:s}},So={focusable:Eo,key:ji,visibleArea:wo},To="undefined"!=typeof window&&window.ally,Ao={element:Fr,event:Ur,fix:si,get:di,is:fi,maintain:Gi,map:Vi,observe:Ji,query:Yi,style:xo,when:So,version:Bt,noConflict:function(){return "undefined"!=typeof window&&window.ally===this&&(window.ally=To),this}};t.exports=Ao;},{"css.escape":2,platform:3}],2:[function(t,n,r){(function(t){!function(t,i){"object"==typeof r?n.exports=i(t):"function"==typeof e&&e.amd?e([],i.bind(t,t)):i(t);}("undefined"!=typeof t?t:this,function(e){if(e.CSS&&e.CSS.escape)return e.CSS.escape;var t=function(e){if(0==arguments.length)throw new TypeError("`CSS.escape` requires an argument.");for(var t,n=String(e),r=n.length,i=-1,o="",a=n.charCodeAt(0);++i<r;)t=n.charCodeAt(i),o+=0!=t?t>=1&&31>=t||127==t||0==i&&t>=48&&57>=t||1==i&&t>=48&&57>=t&&45==a?"\\"+t.toString(16)+" ":(0!=i||1!=r||45!=t)&&(t>=128||45==t||95==t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t)?n.charAt(i):"\\"+n.charAt(i):"�";return o};return e.CSS||(e.CSS={}),e.CSS.escape=t,t});}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],3:[function(t,n,r){(function(t){(function(){function i(e){return e=String(e),e.charAt(0).toUpperCase()+e.slice(1)}function o(e,t,n){var r={"10.0":"10",6.4:"10 Technical Preview",6.3:"8.1",6.2:"8",6.1:"Server 2008 R2 / 7",
	"6.0":"Server 2008 / Vista",5.2:"Server 2003 / XP 64-bit",5.1:"XP",5.01:"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"};return t&&n&&/^Win/i.test(e)&&!/^Windows Phone /i.test(e)&&(r=r[/[\d.]+$/.exec(e)])&&(e="Windows "+r),e=String(e),t&&n&&(e=e.replace(RegExp(t,"i"),n)),e=u(e.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,"$1").split(" on ")[0])}function a(e,t){var n=-1,r=e?e.length:0;if("number"==typeof r&&r>-1&&w>=r)for(;++n<r;)t(e[n],n,e);else s(e,t);}function u(e){return e=m(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:i(e)}function s(e,t){for(var n in e)A.call(e,n)&&t(e[n],n,e);}function l(e){return null==e?i(e):O.call(e).slice(8,-1)}function c(e,t){var n=null!=e?typeof e[t]:"number";return !/^(?:boolean|number|string|undefined)$/.test(n)&&("object"==n?!!e[t]:!0)}function d(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function f(e,t){var n=null;return a(e,function(r,i){n=t(n,r,i,e);}),n}function m(e){return String(e).replace(/^ +| +$/g,"")}function b(e){function t(t){return f(t,function(t,n){return t||RegExp("\\b"+(n.pattern||d(n))+"\\b","i").exec(e)&&(n.label||n)})}function n(t){return f(t,function(t,n,r){return t||(n[X]||n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(X)]||RegExp("\\b"+d(r)+"(?:\\b|\\w*\\d)","i").exec(e))&&r})}function r(t){return f(t,function(t,n){return t||RegExp("\\b"+(n.pattern||d(n))+"\\b","i").exec(e)&&(n.label||n)})}function i(t){return f(t,function(t,n){var r=n.pattern||d(n);return !t&&(t=RegExp("\\b"+r+"(?:/[\\d.]+|[ \\w.]*)","i").exec(e))&&(t=o(t,r,n.label||n)),t})}function a(t){return f(t,function(t,n){var r=n.pattern||d(n);return !t&&(t=RegExp("\\b"+r+" *\\d+[.\\w_]*","i").exec(e)||RegExp("\\b"+r+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(e))&&((t=String(n.label&&!RegExp(r,"i").test(n.label)?n.label:t).split("/"))[1]&&!/[\d.]+/.test(t[0])&&(t[0]+=" "+t[1]),n=n.label||n,t=u(t[0].replace(RegExp(r,"i"),n).replace(RegExp("; *(?:"+n+"[_-])?","i")," ").replace(RegExp("("+n+")[-_.]?(\\w)","i"),"$1 $2"))),t})}function v(t){return f(t,function(t,n){return t||(RegExp(n+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(e)||0)[1]||null})}function p(){return this.description||""}var x=h,y=e&&"object"==typeof e&&"String"!=l(e);y&&(x=e,e=null);var w=x.navigator||{},T=w.userAgent||"";e||(e=T);var A,C,I=y||S==g,L=y?!!w.likeChrome:/\bChrome\b/.test(e)&&!/internal|\n/i.test(O.toString()),N="Object",M=y?N:"ScriptBridgingProxyObject",k=y?N:"Environment",_=y&&x.java?"JavaPackage":l(x.java),P=y?N:"RuntimeObject",F=/\bJava/.test(_)&&x.java,B=F&&l(x.environment)==k,D=F?"a":"α",R=F?"b":"β",W=x.document||{},H=x.operamini||x.opera,j=E.test(j=y&&H?H["[[Class]]"]:l(H))?j:H=null,q=e,G=[],K=null,V=e==T,Z=V&&H&&"function"==typeof H.version&&H.version(),$=t([{label:"EdgeHTML",pattern:"Edge"},"Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"]),U=r(["Adobe AIR","Arora","Avant Browser","Breach","Camino","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel","K-Meleon","Konqueror","Lunascape","Maxthon",{label:"Microsoft Edge",pattern:"Edge"},"Midori","Nook Browser","PaleMoon","PhantomJS","Raven","Rekonq","RockMelt","SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser",{label:"SRWare Iron",pattern:"Iron"},"Sunrise","Swiftfox","WebPositive","Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chrome",{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"Firefox for iOS",pattern:"FxiOS"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"]),X=a([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nexus","Nook","PlayBook","PlayStation 3","PlayStation 4","PlayStation Vita","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),z=n({Apple:{iPad:1,iPhone:1,iPod:1},Archos:{},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1,Nexus:1},HP:{TouchPad:1},HTC:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{"PlayStation 4":1,"PlayStation 3":1,"PlayStation Vita":1}}),J=i(["Windows Phone","Android","CentOS",{label:"Chrome OS",pattern:"CrOS"},"Debian","Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","OpenBSD","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "]);if($&&($=[$]),z&&!X&&(X=a([z])),(A=/\bGoogle TV\b/.exec(X))&&(X=A[0]),/\bSimulator\b/i.test(e)&&(X=(X?X+" ":"")+"Simulator"),"Opera Mini"==U&&/\bOPiOS\b/.test(e)&&G.push("running in Turbo/Uncompressed mode"),"IE"==U&&/\blike iPhone OS\b/.test(e)?(A=b(e.replace(/like iPhone OS/,"")),z=A.manufacturer,X=A.product):/^iP/.test(X)?(U||(U="Safari"),J="iOS"+((A=/ OS ([\d_]+)/i.exec(e))?" "+A[1].replace(/_/g,"."):"")):"Konqueror"!=U||/buntu/i.test(J)?z&&"Google"!=z&&(/Chrome/.test(U)&&!/\bMobile Safari\b/i.test(e)||/\bVita\b/.test(X))||/\bAndroid\b/.test(J)&&/^Chrome/.test(U)&&/\bVersion\//i.test(e)?(U="Android Browser",J=/\bAndroid\b/.test(J)?J:"Android"):"Silk"==U?(/\bMobi/i.test(e)||(J="Android",G.unshift("desktop mode")),/Accelerated *= *true/i.test(e)&&G.unshift("accelerated")):"PaleMoon"==U&&(A=/\bFirefox\/([\d.]+)\b/.exec(e))?G.push("identifying as Firefox "+A[1]):"Firefox"==U&&(A=/\b(Mobile|Tablet|TV)\b/i.exec(e))?(J||(J="Firefox OS"),X||(X=A[1])):(!U||(A=!/\bMinefield\b/i.test(e)&&/\b(?:Firefox|Safari)\b/.exec(U)))&&(U&&!X&&/[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(A+"/")+8))&&(U=null),(A=X||z||J)&&(X||z||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(J))&&(U=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(J)?J:A)+" Browser")):J="Kubuntu",Z||(Z=v(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))","Version",d(U),"(?:Firefox|Minefield|NetFront)"])),(A="iCab"==$&&parseFloat(Z)>3&&"WebKit"||/\bOpera\b/.test(U)&&(/\bOPR\b/.test(e)?"Blink":"Presto")||/\b(?:Midori|Nook|Safari)\b/i.test(e)&&!/^(?:Trident|EdgeHTML)$/.test($)&&"WebKit"||!$&&/\bMSIE\b/i.test(e)&&("Mac OS"==J?"Tasman":"Trident")||"WebKit"==$&&/\bPlayStation\b(?! Vita\b)/i.test(U)&&"NetFront")&&($=[A]),"IE"==U&&(A=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e)||0)[1])?(U+=" Mobile",J="Windows Phone "+(/\+$/.test(A)?A:A+".x"),G.unshift("desktop mode")):/\bWPDesktop\b/i.test(e)?(U="IE Mobile",J="Windows Phone 8.x",G.unshift("desktop mode"),Z||(Z=(/\brv:([\d.]+)/.exec(e)||0)[1])):"IE"!=U&&"Trident"==$&&(A=/\brv:([\d.]+)/.exec(e))&&(U&&G.push("identifying as "+U+(Z?" "+Z:"")),U="IE",Z=A[1]),V){if(c(x,"global"))if(F&&(A=F.lang.System,q=A.getProperty("os.arch"),J=J||A.getProperty("os.name")+" "+A.getProperty("os.version")),I&&c(x,"system")&&(A=[x.system])[0]){J||(J=A[0].os||null);try{A[1]=x.require("ringo/engine").version,Z=A[1].join("."),U="RingoJS";}catch(Q){A[0].global.system==x.system&&(U="Narwhal");}}else"object"==typeof x.process&&!x.process.browser&&(A=x.process)?(U="Node.js",q=A.arch,J=A.platform,Z=/[\d.]+/.exec(A.version)[0]):B&&(U="Rhino");else l(A=x.runtime)==M?(U="Adobe AIR",J=A.flash.system.Capabilities.os):l(A=x.phantom)==P?(U="PhantomJS",Z=(A=A.version||null)&&A.major+"."+A.minor+"."+A.patch):"number"==typeof W.documentMode&&(A=/\bTrident\/(\d+)/i.exec(e))&&(Z=[Z,W.documentMode],(A=+A[1]+4)!=Z[1]&&(G.push("IE "+Z[1]+" mode"),$&&($[1]=""),Z[1]=A),Z="IE"==U?String(Z[1].toFixed(1)):Z[0]);J=J&&u(J);}Z&&(A=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(Z)||/(?:alpha|beta)(?: ?\d)?/i.exec(e+";"+(V&&w.appMinorVersion))||/\bMinefield\b/i.test(e)&&"a")&&(K=/b/i.test(A)?"beta":"alpha",Z=Z.replace(RegExp(A+"\\+?$"),"")+("beta"==K?R:D)+(/\d+\+?/.exec(A)||"")),"Fennec"==U||"Firefox"==U&&/\b(?:Android|Firefox OS)\b/.test(J)?U="Firefox Mobile":"Maxthon"==U&&Z?Z=Z.replace(/\.[\d.]+/,".x"):/\bXbox\b/i.test(X)?(J=null,"Xbox 360"==X&&/\bIEMobile\b/.test(e)&&G.unshift("mobile mode")):!/^(?:Chrome|IE|Opera)$/.test(U)&&(!U||X||/Browser|Mobi/.test(U))||"Windows CE"!=J&&!/Mobi/i.test(e)?"IE"==U&&V&&null===x.external?G.unshift("platform preview"):(/\bBlackBerry\b/.test(X)||/\bBB10\b/.test(e))&&(A=(RegExp(X.replace(/ +/g," *")+"/([.\\d]+)","i").exec(e)||0)[1]||Z)?(A=[A,/BB10/.test(e)],J=(A[1]?(X=null,z="BlackBerry"):"Device Software")+" "+A[0],Z=null):this!=s&&"Wii"!=X&&(V&&H||/Opera/.test(U)&&/\b(?:MSIE|Firefox)\b/i.test(e)||"Firefox"==U&&/\bOS X (?:\d+\.){2,}/.test(J)||"IE"==U&&(J&&!/^Win/.test(J)&&Z>5.5||/\bWindows XP\b/.test(J)&&Z>8||8==Z&&!/\bTrident\b/.test(e)))&&!E.test(A=b.call(s,e.replace(E,"")+";"))&&A.name&&(A="ing as "+A.name+((A=A.version)?" "+A:""),E.test(U)?(/\bIE\b/.test(A)&&"Mac OS"==J&&(J=null),A="identify"+A):(A="mask"+A,U=j?u(j.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(A)&&(J=null),V||(Z=null)),$=["Presto"],G.push(A)):U+=" Mobile",(A=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(e)||0)[1])&&(A=[parseFloat(A.replace(/\.(\d)$/,".0$1")),A],"Safari"==U&&"+"==A[1].slice(-1)?(U="WebKit Nightly",K="alpha",Z=A[1].slice(0,-1)):(Z==A[1]||Z==(A[2]=(/\bSafari\/([\d.]+\+?)/i.exec(e)||0)[1]))&&(Z=null),A[1]=(/\bChrome\/([\d.]+)/i.exec(e)||0)[1],537.36==A[0]&&537.36==A[2]&&parseFloat(A[1])>=28&&"WebKit"==$&&($=["Blink"]),V&&(L||A[1])?($&&($[1]="like Chrome"),A=A[1]||(A=A[0],530>A?1:532>A?2:532.05>A?3:533>A?4:534.03>A?5:534.07>A?6:534.1>A?7:534.13>A?8:534.16>A?9:534.24>A?10:534.3>A?11:535.01>A?12:535.02>A?"13+":535.07>A?15:535.11>A?16:535.19>A?17:536.05>A?18:536.1>A?19:537.01>A?20:537.11>A?"21+":537.13>A?23:537.18>A?24:537.24>A?25:537.36>A?26:"Blink"!=$?"27":"28")):($&&($[1]="like Safari"),A=A[0],A=400>A?1:500>A?2:526>A?3:533>A?4:534>A?"4+":535>A?5:537>A?6:538>A?7:601>A?8:"8"),$&&($[1]+=" "+(A+="number"==typeof A?".x":/[.+]/.test(A)?"":"+")),"Safari"==U&&(!Z||parseInt(Z)>45)&&(Z=A)),"Opera"==U&&(A=/\bzbov|zvav$/.exec(J))?(U+=" ",G.unshift("desktop mode"),"zvav"==A?(U+="Mini",Z=null):U+="Mobile",J=J.replace(RegExp(" *"+A+"$"),"")):"Safari"==U&&/\bChrome\b/.exec($&&$[1])&&(G.unshift("desktop mode"),U="Chrome Mobile",Z=null,/\bOS X\b/.test(J)?(z="Apple",J="iOS 4.3+"):J=null),Z&&0==Z.indexOf(A=/[\d.]+$/.exec(J))&&e.indexOf("/"+A+"-")>-1&&(J=m(J.replace(A,""))),$&&!/\b(?:Avant|Nook)\b/.test(U)&&(/Browser|Lunascape|Maxthon/.test(U)||"Safari"!=U&&/^iOS/.test(J)&&/\bSafari\b/.test($[1])||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(U)&&$[1])&&(A=$[$.length-1])&&G.push(A),G.length&&(G=["("+G.join("; ")+")"]),z&&X&&X.indexOf(z)<0&&G.push("on "+z),X&&G.push((/^on /.test(G[G.length-1])?"":"on ")+X),J&&(A=/ ([\d.+]+)$/.exec(J),C=A&&"/"==J.charAt(J.length-A[0].length-1),J={architecture:32,family:A&&!C?J.replace(A[0],""):J,version:A?A[1]:null,toString:function(){var e=this.version;return this.family+(e&&!C?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(A=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(q))&&!/\bi686\b/i.test(q)?(J&&(J.architecture=64,J.family=J.family.replace(RegExp(" *"+A),"")),U&&(/\bWOW64\b/i.test(e)||V&&/\w(?:86|32)$/.test(w.cpuClass||w.platform)&&!/\bWin64; x64\b/i.test(e))&&G.unshift("32-bit")):J&&/^OS X/.test(J.family)&&"Chrome"==U&&parseFloat(Z)>=39&&(J.architecture=64),e||(e=null);var Y={};return Y.description=e,Y.layout=$&&$[0],Y.manufacturer=z,Y.name=U,Y.prerelease=K,Y.product=X,Y.ua=e,Y.version=U&&Z,Y.os=J||{architecture:null,family:null,version:null,toString:function(){return "null"}},Y.parse=b,Y.toString=p,Y.version&&G.unshift(Z),Y.name&&G.unshift(U),J&&U&&(J!=String(J).split(" ")[0]||J!=U.split(" ")[0]&&!X)&&G.push(X?"("+J+")":"on "+J),G.length&&(Y.description=G.join(" ")),Y}var v={"function":!0,object:!0},h=v[typeof window]&&window||this,g=h,p=v[typeof r]&&r,x=v[typeof n]&&n&&!n.nodeType&&n,y=p&&x&&"object"==typeof t&&t;!y||y.global!==y&&y.window!==y&&y.self!==y||(h=y);var w=Math.pow(2,53)-1,E=/\bOpera/,S=this,T=Object.prototype,A=T.hasOwnProperty,O=T.toString,C=b();"function"==typeof e&&"object"==typeof e.amd&&e.amd?(h.platform=C,e(function(){return C})):p&&x?s(C,function(e,t){p[t]=e;}):h.platform=C;}).call(this);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}]},{},[1])(1)});
	
	});

	var bodyScrollLock = createCommonjsModule(function (module, exports) {
	!function(o,e){if("function"==typeof undefined&&undefined.amd)undefined(["exports"],e);else e(exports);}(commonjsGlobal,function(exports){Object.defineProperty(exports,"__esModule",{value:!0});var n="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iPad|iPhone|iPod|(iPad Simulator)|(iPhone Simulator)|(iPod Simulator)/.test(window.navigator.platform),i=null,l=[],d=!1,u=-1,c=void 0,a=void 0,s=function(o){var e=o||window.event;return e.preventDefault&&e.preventDefault(),!1},o=function(){setTimeout(function(){void 0!==a&&(document.body.style.paddingRight=a,a=void 0),void 0!==c&&(document.body.style.overflow=c,c=void 0);});};exports.disableBodyScroll=function(r,o){var t;n?r&&!l.includes(r)&&(l=[].concat(function(o){if(Array.isArray(o)){for(var e=0,t=Array(o.length);e<o.length;e++)t[e]=o[e];return t}return Array.from(o)}(l),[r]),r.ontouchstart=function(o){1===o.targetTouches.length&&(u=o.targetTouches[0].clientY);},r.ontouchmove=function(o){var e,t,n,i;1===o.targetTouches.length&&(t=r,i=(e=o).targetTouches[0].clientY-u,t&&0===t.scrollTop&&0<i?s(e):(n=t)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&i<0?s(e):e.stopPropagation());},d||(document.addEventListener("touchmove",s,{passive:!1}),d=!0)):(t=o,setTimeout(function(){if(void 0===a){var o=!!t&&!0===t.reserveScrollBarGap,e=window.innerWidth-document.documentElement.clientWidth;o&&0<e&&(a=document.body.style.paddingRight,document.body.style.paddingRight=e+"px");}void 0===c&&(c=document.body.style.overflow,document.body.style.overflow="hidden");}),i||(i=r));},exports.clearAllBodyScrollLocks=function(){n?(l.forEach(function(o){o.ontouchstart=null,o.ontouchmove=null;}),d&&(document.removeEventListener("touchmove",s,{passive:!1}),d=!1),l=[],u=-1):(o(),i=null);},exports.enableBodyScroll=function(e){n?(e.ontouchstart=null,e.ontouchmove=null,l=l.filter(function(o){return o!==e}),d&&0===l.length&&(document.removeEventListener("touchmove",s,{passive:!1}),d=!1)):i===e&&(o(),i=null);};});
	});

	unwrapExports(bodyScrollLock);
	var bodyScrollLock_1 = bodyScrollLock.disableBodyScroll;
	var bodyScrollLock_2 = bodyScrollLock.enableBodyScroll;
	var bodyScrollLock_3 = bodyScrollLock.clearAllBodyScrollLocks;

	// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
	var trapFocus = function trapFocus(el) {
	    var focusableEls = el.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
	    var firstFocusableEl = focusableEls[0];
	    var lastFocusableEl = focusableEls[focusableEls.length - 1];
	    var KEYCODE_TAB = 9;

	    var eventHandler = function eventHandler(e) {
	        var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

	        if (!isTabPressed) {
	            return;
	        }

	        if (e.shiftKey) /* shift + tab */{
	                if (document.activeElement === firstFocusableEl) {
	                    lastFocusableEl.focus();
	                    e.preventDefault();
	                }
	            } else /* tab */{
	                if (document.activeElement === lastFocusableEl) {
	                    firstFocusableEl.focus();
	                    e.preventDefault();
	                }
	            }
	    };

	    el.addEventListener('keydown', eventHandler);

	    return eventHandler;
	};

	var releaseFocus = function releaseFocus(el, eventHandler) {
	    el.removeEventListener('keydown', eventHandler);
	};

	var toConsumableArray$1 = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	var isSmallScreen = window.matchMedia('(max-width: 960px)').matches;

	var isEscape = function isEscape(e) {
	    var key = e.key,
	        keyCode = e.keyCode;

	    return key === "Escape" || keyCode === 27;
	};

	var animateHeight = function animateHeight(element, action) {
	    if (action === 'open') {
	        requestAnimationFrame(function () {
	            element.style.height = element.scrollHeight + 'px';
	        });
	    } else {
	        requestAnimationFrame(function () {
	            element.style.height = '0px';
	        });
	    }
	};

	var toggleHamburgerState = function toggleHamburgerState(state) {
	    var el = state.el,
	        hamburger = state.hamburger,
	        hamburgerText = state.hamburgerText,
	        panel = state.panel,
	        active = state.active;


	    state.active = !active;
	    el.classList.toggle('active');
	    hamburger.classList.toggle('active');
	    hamburger.setAttribute('aria-expanded', state.active);
	    panel.classList.toggle('active');

	    if (isSmallScreen) {
	        state.panelItems.forEach(function (el) {
	            return el.tabIndex = state.active ? 0 : -1;
	        });
	    }

	    if (state.active) {
	        bodyScrollLock_1(panel);
	        state.focusHandler = trapFocus(el);
	        hamburgerText.textContent = 'Close menu';
	    } else {
	        bodyScrollLock_2(panel);
	        releaseFocus(el, state.focusHandler);
	        hamburger.focus();
	        state.focusHandler = null;
	        hamburgerText.textContent = 'Open menu';
	    }
	};

	var toggleAccordion = function toggleAccordion(target) {
	    var parent = target.parentElement;
	    var sibling = target.nextElementSibling;
	    var isActive = sibling.classList.contains('active');
	    var prop = isActive ? 'remove' : 'add';

	    parent.classList[prop]('active');
	    target.setAttribute('aria-expanded', !isActive);
	    sibling.classList[prop]('active');
	    animateHeight(sibling, isActive ? 'close' : 'open');
	};

	var closeTabbedMenus = function closeTabbedMenus() {
	    var otherLists = document.querySelectorAll('.tab-opened-menu');
	    for (var i = 0; i < otherLists.length; i++) {
	        otherLists[i].classList.remove('tab-opened-menu');
	    }
	};

	// General event binding
	var events = function events(state) {
	    var el = state.el,
	        hamburger = state.hamburger,
	        panel = state.panel;

	    // Show/hide hamburger menu on hamburger click

	    hamburger.addEventListener('click', function (e) {
	        e.preventDefault();

	        toggleHamburgerState(state);
	    });

	    // Hide menu if escape key is pressed
	    window.addEventListener('keydown', function (e) {
	        if (isEscape(e) && state.active) {
	            toggleHamburgerState(state);
	        }
	    });

	    // Hamburger menu accordion show/hide
	    panel.addEventListener('click', function (e) {
	        var target = e.target;
	        var isTopLevel = target.classList.contains('site-nav__link') && +target.dataset.level === 0;

	        var width = window.innerWidth;

	        if (isTopLevel && target.getAttribute('aria-haspopup') === 'true' && width <= 960) {
	            e.preventDefault();
	            toggleAccordion(target);
	        }
	    });

	    // keypress items
	    window.addEventListener('keyup', function (e) {
	        var keyNum = 'which' in e ? e.which : e.keyCode; // cross-browser keycode values
	        var target = e.target;
	        var focuswithin = document.querySelector('.no-focuswithin');

	        if (keyNum === 9 && focuswithin !== null) {
	            // browsers that don't support focus-within for tabbing
	            var parent = target.parentElement;

	            if (parent !== undefined && parent !== null) {
	                var parentClasses = parent.classList;
	                var isMenuItem = parentClasses.contains('site-nav__item');
	                var isUtilityItem = parentClasses.contains('site-utility__item');
	                var hasChild = parentClasses.contains('has-child');

	                if (isUtilityItem) {
	                    closeTabbedMenus();
	                } else if (isMenuItem && hasChild) {
	                    closeTabbedMenus();

	                    var list = target.nextElementSibling;
	                    list.classList.add('tab-opened-menu');
	                }
	            }
	        }
	    });

	    // Add scrolled class if not at top of page, remove otherwise
	    document.addEventListener('scroll', function (e) {
	        var prop = window.pageYOffset > 0 ? 'add' : 'remove';
	        el.classList[prop]('scrolled');
	    });
	};

	var init = function init() {
	    var el = document.querySelector('.site-header');
	    var panel = el.querySelector('.js-nav-panel');
	    var state = {
	        el: el,
	        hamburger: el.querySelector('.js-hamburger-toggle'),
	        hamburgerText: el.querySelector('.js-hamburger-text'),
	        panel: panel,
	        panelItems: [].concat(toConsumableArray$1(panel.querySelectorAll('a'))),
	        active: false,
	        focusHandler: null
	    };

	    if (isSmallScreen) {
	        state.panelItems.forEach(function (el) {
	            return el.tabIndex = -1;
	        });
	    }

	    events(state);
	};

	var navigationInit = (function () {
	    init();
	});

	var hammer = createCommonjsModule(function (module) {
	/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;

	    if (!obj) {
	        return;
	    }

	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }

	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;

	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;

	    if (properties) {
	        assign(childP, properties);
	    }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;

	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }

	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }

	    return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);

	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;

	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;

	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };

	    this.init();

	}

	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },

	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },

	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;

	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;

	    if (isFirst) {
	        manager.session = {};
	    }

	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;

	    // compute scale, rotation etc
	    computeInputData(manager, input);

	    // emit secret event
	    manager.emit('hammer.input', input);

	    manager.recognize(input);
	    manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;

	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }

	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }

	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;

	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);

	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	    computeIntervalInputData(session, input);

	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}

	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};

	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };

	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }

	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;

	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;

	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);

	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }

	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }

	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;

	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }

	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }

	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }

	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];

	    return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;

	    this.pressed = false; // mousedown state

	    Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];

	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }

	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }

	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }

	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }

	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});

	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;

	    Input.apply(this, arguments);

	    this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;

	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }

	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }

	        // update the event in the store
	        store[storeIndex] = ev;

	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });

	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;

	    Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }

	        if (!this.started) {
	            return;
	        }

	        var touches = normalizeSingleTouches.call(this, ev, type);

	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);

	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }

	    return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};

	    Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;

	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }

	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;

	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });

	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }

	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }

	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }

	    if (!changedTargetTouches.length) {
	        return;
	    }

	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	    Input.apply(this, arguments);

	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);

	    this.primaryTouch = null;
	    this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }

	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }

	        this.callback(manager, inputEvent, inputData);
	    },

	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});

	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}

	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];

	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}

	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}

	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }

	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },

	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },

	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },

	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;

	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }

	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture

	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;

	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }

	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }

	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },

	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }

	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }

	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }

	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }

	    return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});

	    this.id = uniqueId();

	    this.manager = null;

	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);

	    this.state = STATE_POSSIBLE;

	    this.simultaneous = {};
	    this.requireFail = [];
	}

	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},

	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },

	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }

	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },

	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },

	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }

	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },

	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },

	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },

	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },

	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;

	        function emit(event) {
	            self.manager.emit(event, input);
	        }

	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }

	        emit(self.options.event); // simple 'eventName' events

	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }

	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },

	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },

	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },

	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);

	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }

	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }

	        this.state = this.process(inputDataClone);

	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },

	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line

	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },

	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },

	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },

	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;

	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);

	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);

	    this.pX = null;
	    this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },

	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },

	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;

	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },

	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },

	    emit: function(input) {

	        this.pX = input.deltaX;
	        this.pY = input.deltaY;

	        var direction = directionStr(input.direction);

	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },

	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);

	    this._timer = null;
	    this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },

	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;

	        this._input = input;

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }

	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },

	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },

	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;

	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }

	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },

	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }

	        this.manager.emit(this.options.event, input);
	    }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);

	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;

	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },

	    process: function(input) {
	        var options = this.options;

	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;

	        this.reset();

	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }

	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;

	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }

	            this._input = input;

	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },

	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,

	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,

	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,

	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,

	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,

	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],

	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',

	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',

	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',

	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',

	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',

	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});

	    this.options.inputTarget = this.options.inputTarget || element;

	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};

	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);

	    toggleCssProps(this, true);

	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}

	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },

	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },

	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }

	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);

	        var recognizer;
	        var recognizers = this.recognizers;

	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;

	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }

	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];

	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }

	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },

	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }

	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },

	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }

	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }

	        this.recognizers.push(recognizer);
	        recognizer.manager = this;

	        this.touchAction.update();
	        return recognizer;
	    },

	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }

	        recognizer = this.get(recognizer);

	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);

	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }

	        return this;
	    },

	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },

	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },

	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }

	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }

	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };

	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },

	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);

	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,

	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,

	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,

	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,

	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,

	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,

	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});

	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;

	if (typeof undefined === 'function' && undefined.amd) {
	    undefined(function() {
	        return Hammer;
	    });
	} else if (module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}

	})(window, document, 'Hammer');
	});

	var correctAngles = function correctAngles(angle) {
	    angle = Math.abs(angle);

	    if (parseFloat(angle) > parseFloat(157.5) && parseFloat(angle) < parseFloat(180)) {
	        return true;
	    }

	    if (parseFloat(angle) < parseFloat(22.5) && parseFloat(angle) > parseFloat(-22.5)) {
	        return true;
	    }

	    return false;
	};

	var checkVelocity = function checkVelocity(velocity) {
	    // Force a move if they're scrolling violently. :)
	    if (parseFloat(velocity) < parseFloat(-0.2)) {
	        return 1;
	    }

	    if (parseFloat(velocity) > parseFloat(0.2)) {
	        return -1;
	    }

	    return 0;
	};

	var updateCaption = function updateCaption(state) {
	    state.numberElement.textContent = state.active + 1;
	    state.captionElement.textContent = state.captions[state.active];
	};

	var updateDots = function updateDots(state) {
	    [].concat(toConsumableArray$1(state.dotsElement.children)).forEach(function (dot, index) {
	        dot.classList[activeProp(index !== state.active)]('active');
	    });
	};

	var activeProp = function activeProp(compare) {
	    return compare ? 'remove' : 'add';
	};

	var updateItem = function updateItem(element, compare) {
	    element.classList[activeProp(compare)]('active');
	    element.setAttribute('aria-hidden', compare);
	};

	var updateActive = function updateActive(state) {
	    if (!state.infinite) {
	        updateItem(state.prev, state.active === 0);
	        updateItem(state.next, state.active === state.total);
	    }

	    state.items.forEach(function (item, index) {
	        updateItem(item, state.active !== index);
	    });
	};

	var animateSlide = function animateSlide(track, amount) {
	    requestAnimationFrame(function () {
	        track.style.transform = 'translate3d(' + amount + ', 0, 0)';
	    });
	};

	var moveSlide = function moveSlide(state) {
	    animateSlide(state.track, '-' + 100 * state.active + '%');
	};

	var events$1 = function events(slideshows) {
	    slideshows.forEach(function (slideshow) {
	        var items = [].concat(toConsumableArray$1(slideshow.querySelectorAll('.js-slideshow-item')));
	        var track = slideshow.querySelector('.js-slideshow-track');
	        var state = {
	            active: 0,
	            total: items.length - 1,
	            items: items,
	            track: track,
	            prev: slideshow.querySelector('.js-slideshow-prev'),
	            next: slideshow.querySelector('.js-slideshow-next'),
	            numberElement: slideshow.querySelector('.js-slideshow-number'),
	            captionElement: slideshow.querySelector('.js-slideshow-caption'),
	            dotsElement: slideshow.querySelector('.js-slideshow-dots'),
	            captions: items.map(function (item) {
	                return item.dataset.caption;
	            }),
	            infinite: slideshow.dataset.infinite === 'true',
	            hammertime: new hammer(track)
	        };

	        state.prev.addEventListener('click', function (e) {
	            if (state.infinite) {
	                state.active = state.active !== state.total ? state.active + 1 : 0;
	            } else {
	                state.active = state.active !== state.total ? state.active + 1 : state.total;
	            }

	            if (state.captionElement) {
	                updateCaption(state);
	            }

	            if (state.dotsElement) {
	                updateDots(state);
	            }
	            updateActive(state);
	            moveSlide(state);
	        });

	        state.next.addEventListener('click', function (e) {
	            if (state.infinite) {
	                state.active = state.active !== 0 ? state.active - 1 : state.total;
	            } else {

	                state.active = state.active !== 0 ? state.active - 1 : 0;
	            }

	            if (state.captionElement) {
	                updateCaption(state);
	            }

	            if (state.dotsElement) {
	                updateDots(state);
	            }
	            updateActive(state);
	            moveSlide(state);
	        });

	        state.hammertime.on('panleft panright', function (e) {
	            if (correctAngles(e.angle)) {
	                var offset = e.target.width * state.active;

	                if (e.type === 'panleft' && state.active !== state.total) {
	                    animateSlide(state.track, '-' + (Math.abs(e.deltaX) + offset) + 'px');
	                } else if (e.type === 'panright' && state.active !== 0) {
	                    animateSlide(state.track, '-' + (-e.deltaX + offset) + 'px');
	                }
	            }
	        });

	        state.hammertime.on('panend', function (e) {
	            if (Math.ceil(e.distance) > e.target.width / 2 || checkVelocity(e.velocity) !== 0) {
	                if (e.velocity < 0) {
	                    state.active = state.active !== state.total ? state.active + 1 : state.total;
	                } else if (e.velocity > 0) {
	                    state.active = state.active !== 0 ? state.active - 1 : 0;
	                }
	            }

	            if (state.captionElement) {
	                updateCaption(state);
	            }

	            if (state.dotsElement) {
	                updateDots(state);
	            }

	            updateActive(state);
	            moveSlide(state);
	        });
	    });
	};

	var phrasesInit = (function () {
	    var slideshows = [].concat(toConsumableArray$1(document.querySelectorAll('.js-basic-slideshow')));

	    if (slideshows.length) {
	        events$1(slideshows);
	    }
	});

	// https://github.com/jonathantneal/posthtml-aria-tabs/blob/master/client.js
	var init$1 = function init() {
	    var cache = {},
	        last;

	    Array.prototype.forEach.call(document.querySelectorAll('.share-modal__body [role="tablist"]'), function (tablist) {
	        Array.prototype.forEach.call(tablist.querySelectorAll('[href^="#"][role="tab"]'), function (tab, index, tabs) {
	            cache[tab.hash] = [tab, document.getElementById(tab.getAttribute('aria-controls'))];

	            if (tab.getAttribute('aria-selected') === 'true') {
	                last = cache[''] = cache[tab.hash];
	            } else {
	                tab.setAttribute('tabindex', -1);
	            }

	            tab.addEventListener('keydown', function (event) {
	                var next = event.keyCode === 37 ? tabs[index - 1] : event.keyCode === 39 ? tabs[index + 1] : null;

	                if (next) {
	                    location.hash = next.hash;

	                    next.focus();
	                }
	            });
	        });
	    });

	    window.addEventListener('hashchange', onhashchange);

	    onhashchange();

	    function onhashchange() {
	        var tab = cache[location.hash];

	        if (tab) {
	            if (last) {
	                last[0].removeAttribute('aria-selected');
	                last[0].setAttribute('tabindex', -1);
	                last[1].setAttribute('hidden', '');
	            }

	            tab[0].setAttribute('aria-selected', 'true');
	            tab[0].removeAttribute('tabindex');
	            tab[1].removeAttribute('hidden', '');

	            last = tab;
	        }
	    }
	};

	var requestAnimFrame = function requestAnimFrame(cb) {
	    return window.requestAnimationFrame(cb) || window.webkitRequestAnimationFrame(cb) || window.mozRequestAnimationFrame(cb) || window.msRequestAnimationFrame(cb) || function (cb) {
	        setTimeout(cb, 0);
	    };
	};

	var animateAccordion = function animateAccordion(element, action) {
	    if (action === 'open') {
	        requestAnimFrame(function () {
	            element.style.height = element.scrollHeight + 'px';
	        });
	    } else {
	        requestAnimFrame(function () {
	            element.style.height = '0px';
	        });
	    }
	};

	var toggleAccordion$1 = function toggleAccordion(target) {
	    // Gather necessary elements
	    var targetSection = target.parentElement;
	    var targetContent = targetSection.querySelector('.accordion__item-content');
	    var isTargetActive = targetSection.classList.contains('active');
	    var activeSections = [].concat(toConsumableArray$1(targetSection.parentElement.querySelectorAll('.active')));
	    // If target is not currently active
	    if (!isTargetActive) {
	        // If only one section is allowed open at a time
	        {
	            activeSections.forEach(function (section) {
	                animateAccordion(section.querySelector('.accordion__item-content'), 'close');
	                section.classList.remove('active');
	            });
	            animateAccordion(targetContent, 'open');
	            targetSection.classList.add('active');
	            return;
	        }
	        // If multiple sections can be open at once
	        animateAccordion(targetContent, 'open');
	        targetSection.classList.add('active');
	        return;
	    }
	    // If target is currently active
	    animateAccordion(targetContent, 'close');
	    targetSection.classList.remove('active');
	};

	var handleEvent = function handleEvent(accordion) {
	    // Attach event listener to each accordion
	    accordion.addEventListener('click', function (event) {
	        // Make sure to only fire when trigger has been clicked
	        var isTrigger = event.target.classList.contains('js-accordion-trigger');
	        if (isTrigger) {
	            toggleAccordion$1(event.target);
	        }
	    });
	};

	var setActive = function setActive(accordion) {
	    [].concat(toConsumableArray$1(accordion.querySelectorAll('.accordion__item'))).forEach(function (section) {
	        if (section.classList.contains('active')) {
	            var content = section.querySelector('.accordion__item-content');
	            content.style.height = content.scrollHeight + 'px';
	        }
	    });
	};

	var init$2 = function init() {
	    // Gather all accordions on page
	    var accordions = [].concat(toConsumableArray$1(document.querySelectorAll('.accordion__item')));
	    accordions.forEach(function (accordion) {
	        handleEvent(accordion);
	        setActive(accordion);
	    });
	};

	var accordionInit = (function () {
	    init$2();
	});

	/**
		* progressbar.js
		* Retrieves value from template and assigns width to progress bar through CSS custom prop
		*
	*/

	// import CountUp from '/util/countUp';


	// retrieve progress value from template
	var getCurrentProgress = function getCurrentProgress(ele) {
		return document.getElementById(ele).getAttribute('aria-valuenow');
	};

	// const startCounter = (ele, currentCount) => {
	// 	return new CountUp(ele, 0, currentCount);
	// };

	// update css custom property to draw progress bar
	var updateProgressBar = function updateProgressBar(ele, cssProp) {
		var currentLevel = getCurrentProgress('campaign-progress');
		var container = document.querySelector(ele);

		// startCounter('.progressbar__label > strong', currentLevel);
		container.style.setProperty(cssProp, currentLevel);
	};

	var progressBarInit = (function () {
		if (document.querySelector('.progressbar__indicator') !== null) {
			updateProgressBar('.progressbar', '--progress-value');
		}
	});

	/**
		* gallery.js
		* Creates instance of flickity gallery
		*
	*/

	// construct flickity gallery: accepts an object with options
	var buildGallery = function buildGallery(ele, obj) {
		var slideContainer = document.querySelector(ele);
		var flick = new Flickity(slideContainer, {
			contain: true,
			dots: obj.hasOwnProperty('dots') ? obj.dots : true,
			autoPlay: obj.hasOwnProperty('autoPlay') ? obj.autoPlay : false,
			resize: true,
			adaptiveHeight: obj.hasOwnProperty('adaptiveHeight') ? obj.adaptiveHeight : true,
			setGallerySize: obj.hasOwnProperty('setGallerySize') ? obj.setGallerySize : true,
			wrapAround: obj.hasOwnProperty('wrapAround') ? obj.wrapAround : true
		});
	};

	var galleryInit = (function () {
		if (document.querySelector('.image-gallery__wrapper') !== null) {
			// image gallery
			var options = {
				adaptiveHeight: false,
				wrapAround: false
			};

			buildGallery('.image-gallery__wrapper', options);
		}
	});

	MicroModal.init({
		disableScroll: true
	});

	if (!window.ActiveXObject && "ActiveXObject" in window) {
		document.querySelector('body').classList.add('ie');
	}

	navigationInit();
	phrasesInit();
	init$1();
	accordionInit();
	progressBarInit();
	galleryInit();
	objectFitPolyfill();

	(function (l) {
		var i,
		    s = { touchend: function touchend() {} };for (i in s) {
			l.addEventListener(i, s);
		}
	})(document); // sticky hover fix in iOS

}());
;
/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
!function(t,e,i){var n,o,a,r,h,s,l,d,c,g,u,f,p,m,w,v,x,b,y,T,C,H,k,W,E,I,M,L,P,S,F,R,K,B={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullscreen=!0,i}},O="colorbox",$="cbox",N=$+"Element",_=$+"_open",j=$+"_load",D=$+"_complete",z=$+"_cleanup",A=$+"_closed",q=$+"_purge",U=t("<a/>"),G="div",Q=0,J={};function V(i,n,o){var a=e.createElement(i);return n&&(a.id=$+n),o&&(a.style.cssText=o),t(a)}function X(){return i.innerHeight?i.innerHeight:t(i).height()}function Y(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(void 0!==(n=t(this.el).attr("data-cbox-"+e))?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==B[e]&&(this.cache[e]=B[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function Z(t){var e=c.length,i=(I+t)%e;return i<0?e+i:i}function tt(t,e){return Math.round((/%/.test(t)?("x"===e?g.width():X())/100:1)*parseInt(t,10))}function et(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function it(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function nt(t){"contains"in o[0]&&!o[0].contains(t.target)&&t.target!==n[0]&&(t.stopPropagation(),o.focus())}function ot(t){ot.str!==t&&(o.add(n).removeClass(ot.str).addClass(t),ot.str=t)}function at(i){t(e).trigger(i),U.triggerHandler(i)}var rt=function(){var t,e,i=$+"Slideshow_",n="click."+$;function a(){clearTimeout(e)}function r(){(C.get("loop")||c[I+1])&&(a(),e=setTimeout(R.next,C.get("slideshowSpeed")))}function h(){v.html(C.get("slideshowStop")).attr("aria-lable",C.get("slideshowStop")).unbind(n).one(n,s),U.bind(D,r).bind(j,a),o.removeClass(i+"off").addClass(i+"on")}function s(){a(),U.unbind(D,r).unbind(j,a),v.html(C.get("slideshowStart")).attr("aria-lable",C.get("slideshowStart")).unbind(n).one(n,function(){R.next(),h()}),o.removeClass(i+"on").addClass(i+"off")}function l(){t=!1,v.attr("aria-hidden","true").hide(),a(),U.unbind(D,r).unbind(j,a),o.removeClass(i+"off "+i+"on")}return function(){t?C.get("slideshow")||(U.unbind(z,l),l()):C.get("slideshow")&&c[1]&&(t=!0,U.one(z,l),C.get("slideshowAuto")?h():s(),v.show(),v.attr("aria-hidden","false").show())}}();function ht(a){var g,w;if(!S){if(g=t(a).data(O),C=new Y(a,g),w=C.get("rel"),I=0,w&&!1!==w&&"nofollow"!==w?(c=t("."+N).filter(function(){return new Y(this,t.data(this,O)).get("rel")===w}),-1===(I=c.index(C.el))&&(c=c.add(C.el),I=c.length-1)):c=t(C.el),!L){L=P=!0,ot(C.get("className")),o.css({visibility:"hidden",display:"block",opacity:""}).attr("aria-hidden","true"),u=V(G,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),r.css({width:"",height:""}).append(u),H=h.height()+d.height()+r.outerHeight(!0)-r.height(),k=s.width()+l.width()+r.outerWidth(!0)-r.width(),W=u.outerHeight(!0),E=u.outerWidth(!0);var v=tt(C.get("initialWidth"),"x"),x=tt(C.get("initialHeight"),"y"),b=C.get("maxWidth"),K=C.get("maxHeight");C.w=Math.max((!1!==b?Math.min(v,tt(b,"x")):v)-E-k,0),C.h=Math.max((!1!==K?Math.min(x,tt(K,"y")):x)-W-H,0),u.css({width:"",height:C.h}),R.position(),at(_),C.get("onOpen"),T.add(m).hide(),o.attr("aria-hidden","false").focus(),C.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",nt,!0),U.one(A,function(){e.removeEventListener("focus",nt,!0)})),C.get("returnFocus")&&U.one(A,function(){t(C.el).focus()})}var B=parseFloat(C.get("opacity"));n.css({opacity:B==B?B:"",cursor:C.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),C.get("closeButton")?y.html(C.get("close")).attr("aria-label",C.get("close")).attr("aria-hidden","false").appendTo(r):y.appendTo("<div/>"),function(){var e,n,o,a=R.prep,r=++Q;P=!0,M=!1,at(q),at(j),C.get("onLoad"),C.h=C.get("height")?tt(C.get("height"),"y")-W-H:C.get("innerHeight")&&tt(C.get("innerHeight"),"y"),C.w=C.get("width")?tt(C.get("width"),"x")-E-k:C.get("innerWidth")&&tt(C.get("innerWidth"),"x"),C.mw=C.w,C.mh=C.h,C.get("maxWidth")&&(C.mw=tt(C.get("maxWidth"),"x")-E-k,C.mw=C.w&&C.w<C.mw?C.w:C.mw);C.get("maxHeight")&&(C.mh=tt(C.get("maxHeight"),"y")-W-H,C.mh=C.h&&C.h<C.mh?C.h:C.mh);if(e=C.get("href"),F=setTimeout(function(){p.show()},100),C.get("inline")){var h=t(e).eq(0);o=t("<div>").hide().insertBefore(h),U.one(q,function(){o.replaceWith(h)}),a(h)}else C.get("iframe")?a(" "):C.get("html")?a(C.get("html")):et(C,e)?(e=it(C,e),M=C.get("createImg"),t(M).addClass($+"Photo").bind("error."+$,function(){a(V(G,"Error").html(C.get("imgError")))}).one("load",function(){r===Q&&setTimeout(function(){var e;C.get("retinaImage")&&i.devicePixelRatio>1&&(M.height=M.height/i.devicePixelRatio,M.width=M.width/i.devicePixelRatio),C.get("scalePhotos")&&(n=function(){M.height-=M.height*e,M.width-=M.width*e},C.mw&&M.width>C.mw&&(e=(M.width-C.mw)/M.width,n()),C.mh&&M.height>C.mh&&(e=(M.height-C.mh)/M.height,n())),C.h&&(M.style.marginTop=Math.max(C.mh-M.height,0)/2+"px"),c[1]&&(C.get("loop")||c[I+1])&&(M.style.cursor="pointer",t(M).bind("click."+$,function(){R.next()})),M.style.width=M.width+"px",M.style.height=M.height+"px",a(M)},1)}),M.src=e):e&&f.load(e,C.get("data"),function(e,i){r===Q&&a("error"===i?V(G,"Error").html(C.get("xhrError")):t(this).contents())})}()}}function st(){o||(K=!1,g=t(i),o=V(G).attr({id:O,class:!1===t.support.opacity?$+"IE":"",role:"dialog","aria-hidden":"true","aria-labelledby":"cboxTitle","aria-describedby":"cboxCurrent",tabindex:"-1"}).hide(),n=V(G,"Overlay").hide(),p=t([V(G,"LoadingOverlay")[0],V(G,"LoadingGraphic")[0]]),a=V(G,"Wrapper"),r=V(G,"Content").append(m=V(G,"Title"),w=V(G,"Current"),b=t('<button type="button">previous</button>').attr({id:$+"Previous","aria-label":"previous","aria-hidden":"true"}),x=t('<button type="button">next</button>').attr({id:$+"Next","aria-label":"next","aria-hidden":"true"}),v=t('<button type="button">start slideshow</button>').attr({id:$+"Slideshow","aria-label":"start slideshow","aria-hidden":"true"}),p),y=t('<button type="button">close</button>').attr({id:$+"Close","aria-label":"close","aria-hidden":"true"}),a.append(V(G).append(V(G,"TopLeft"),h=V(G,"TopCenter"),V(G,"TopRight")),V(G,!1,"clear:left").append(s=V(G,"MiddleLeft"),r,l=V(G,"MiddleRight")),V(G,!1,"clear:left").append(V(G,"BottomLeft"),d=V(G,"BottomCenter"),V(G,"BottomRight"))).find("div div").css({float:"left"}),f=V(G,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),T=x.add(b).add(w).add(v)),e.body&&!o.parent().length&&t(e.body).append(n,o.append(a,f))}t[O]||(t(st),(R=t.fn[O]=t[O]=function(i,a){var r=this;return i=i||{},t.isFunction(r)&&(r=t("<a/>"),i.open=!0),r[0]?(st(),function(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),ht(this))}return!!o&&(K||(K=!0,x.click(function(){R.next()}),b.click(function(){R.prev()}),y.click(function(){R.close()}),n.click(function(){C.get("overlayClose")&&R.close()}),t(e).bind("keydown."+$,function(t){var e=t.keyCode;L&&C.get("escKey")&&27===e&&(t.preventDefault(),R.close()),L&&C.get("arrowKey")&&c[1]&&!t.altKey&&(37===e?(t.preventDefault(),b.click()):39===e&&(t.preventDefault(),x.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+$,"."+N,i):t("."+N).live("click."+$,i)),!0)}()&&(a&&(i.onComplete=a),r.each(function(){var e=t.data(this,O)||{};t.data(this,O,t.extend(e,i))}).addClass(N),new Y(r[0],i).get("open")&&ht(r[0])),r):r}).position=function(e,i){var n,c,u,f=0,p=0,m=o.offset();function w(){h[0].style.width=d[0].style.width=r[0].style.width=parseInt(o[0].style.width,10)-k+"px",r[0].style.height=s[0].style.height=l[0].style.height=parseInt(o[0].style.height,10)-H+"px"}if(g.unbind("resize."+$),o.css({top:-9e4,left:-9e4}),c=g.scrollTop(),u=g.scrollLeft(),C.get("fixed")?(m.top-=c,m.left-=u,o.css({position:"fixed"})):(f=c,p=u,o.css({position:"absolute"})),!1!==C.get("right")?p+=Math.max(g.width()-C.w-E-k-tt(C.get("right"),"x"),0):!1!==C.get("left")?p+=tt(C.get("left"),"x"):p+=Math.round(Math.max(g.width()-C.w-E-k,0)/2),!1!==C.get("bottom")?f+=Math.max(X()-C.h-W-H-tt(C.get("bottom"),"y"),0):!1!==C.get("top")?f+=tt(C.get("top"),"y"):f+=Math.round(Math.max(X()-C.h-W-H,0)/2),o.css({top:m.top,left:m.left,visibility:"visible"}).attr("aria-hidden","false"),a[0].style.width=a[0].style.height="9999px",n={width:C.w+E+k,height:C.h+W+H,top:f,left:p},e){var v=0;t.each(n,function(t){n[t]===J[t]||(v=e)}),e=v}J=n,e||o.css(n),o.dequeue().animate(n,{duration:e||0,complete:function(){w(),P=!1,a[0].style.width=C.w+E+k+"px",a[0].style.height=C.h+W+H+"px",C.get("reposition")&&setTimeout(function(){g.bind("resize."+$,R.position)},1),t.isFunction(i)&&i()},step:w})},R.resize=function(t){var e;L&&((t=t||{}).width&&(C.w=tt(t.width,"x")-E-k),t.innerWidth&&(C.w=tt(t.innerWidth,"x")),u.css({width:C.w}),t.height&&(C.h=tt(t.height,"y")-W-H),t.innerHeight&&(C.h=tt(t.innerHeight,"y")),t.innerHeight||t.height||(e=u.scrollTop(),u.css({height:"auto"}),C.h=u.height()),u.css({height:C.h}),e&&u.scrollTop(e),R.position("none"===C.get("transition")?0:C.get("speed")))},R.prep=function(i){if(L){var n,a="none"===C.get("transition")?0:C.get("speed");u.remove(),(u=V(G,"LoadedContent").append(i)).hide().appendTo(f.show()).css({width:(C.w=C.w||u.width(),C.w=C.mw&&C.mw<C.w?C.mw:C.w,C.w),overflow:C.get("scrolling")?"auto":"hidden"}).css({height:(C.h=C.h||u.height(),C.h=C.mh&&C.mh<C.h?C.mh:C.h,C.h)}).prependTo(r),f.hide(),t(M).css({float:"none"}),ot(C.get("className")),n=function(){var i,n,r=c.length;function h(){!1===t.support.opacity&&o[0].style.removeAttribute("filter")}L&&(n=function(){clearTimeout(F),p.hide(),at(D),C.get("onComplete")},m.html(C.get("title")).show(),u.show(),r>1?("string"==typeof C.get("current")&&w.html(C.get("current").replace("{current}",I+1).replace("{total}",r)).show(),$showNext=C.get("loop")||I<r-1,x[$showNext?"show":"hide"]().html(C.get("next")).attr("aria-hidden",$showNext?"false":"true").attr("aria-label",C.get("next")),$showPrev=C.get("loop")||I,b[$showPrev?"show":"hide"]().html(C.get("previous")).attr("aria-hidden",$showPrev?"false":"true").attr("aria-label",C.get("previous")),rt(),C.get("preloading")&&t.each([Z(-1),Z(1)],function(){var i=c[this],n=new Y(i,t.data(i,O)),o=n.get("href");o&&et(n,o)&&(o=it(n,o),e.createElement("img").src=o)})):T.hide(),C.get("iframe")?(i=C.get("createIframe"),C.get("scrolling")||(i.scrolling="no"),t(i).attr({src:C.get("href"),class:$+"Iframe"}).one("load",n).appendTo(u),U.one(q,function(){i.src="//about:blank"}),C.get("fastIframe")&&t(i).trigger("load")):n(),"fade"===C.get("transition")?o.fadeTo(a,1,h):h())},"fade"===C.get("transition")?o.fadeTo(a,0,function(){R.position(0,n)}):R.position(a,n)}},R.next=function(){!P&&c[1]&&(C.get("loop")||c[I+1])&&(I=Z(1),ht(c[I]))},R.prev=function(){!P&&c[1]&&(C.get("loop")||I)&&(I=Z(-1),ht(c[I]))},R.close=function(){L&&!S&&(S=!0,L=!1,at(z),C.get("onCleanup"),g.unbind("."+$),n.fadeTo(C.get("fadeOut")||0,0),o.stop().fadeTo(C.get("fadeOut")||0,0,function(){o.hide().attr("aria-hidden","true"),n.hide(),at(q),u.remove(),setTimeout(function(){S=!1,at(A),C.get("onClosed")},1)}))},R.remove=function(){o&&(o.stop(),t[O].close(),o.stop(!1,!0).remove(),n.remove(),S=!1,o=null,t("."+N).removeData(O).removeClass(N),t(e).unbind("click."+$).unbind("keydown."+$))},R.element=function(){return t(C.el)},R.settings=B)}(jQuery,document,window);;
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.initColorbox = {
    attach: function (context, settings) {
      if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
        return;
      }

      if (settings.colorbox.mobiledetect && window.matchMedia) {
        // Disable Colorbox for small screens.
        var mq = window.matchMedia('(max-device-width: ' + settings.colorbox.mobiledevicewidth + ')');
        if (mq.matches) {
          return;
        }
      }

      settings.colorbox.rel = function () {
        return $(this).data('colorbox-gallery')
      };

      $('.colorbox', context)
        .once('init-colorbox')
        .colorbox(settings.colorbox);
    }
  };

})(jQuery, Drupal);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var ids = [];

  Drupal.behaviors.copyFieldValue = {
    attach: function attach(context) {
      Object.keys(drupalSettings.copyFieldValue || {}).forEach(function (element) {
        ids.push(element);
      });

      if (ids.length) {
        $('body').once('copy-field-values').on('value:copy', this.valueTargetCopyHandler);

        $('#' + ids.join(', #')).once('copy-field-values').on('blur', this.valueSourceBlurHandler);
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload' && ids.length) {
        $('body').removeOnce('copy-field-values').off('value:copy');
        $('#' + ids.join(', #')).removeOnce('copy-field-values').off('blur');
      }
    },
    valueTargetCopyHandler: function valueTargetCopyHandler(e, value) {
      var $target = $(e.target);
      if ($target.val() === '') {
        $target.val(value);
      }
    },
    valueSourceBlurHandler: function valueSourceBlurHandler(e) {
      var value = $(e.target).val();
      var targetIds = drupalSettings.copyFieldValue[e.target.id];
      $('#' + targetIds.join(', #')).trigger('value:copy', value);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 * The video_embed_field colorbox integration.
 */

(function($) {
  Drupal.behaviors.video_embed_field_colorbox = {
    attach: function (context, settings) {
      $('.video-embed-field-launch-modal', context).once().click(function(e) {
        // Allow the thumbnail that launches the modal to link to other places
        // such as video URL, so if the modal is sidestepped things degrade
        // gracefully.
        e.preventDefault();
        $.colorbox($.extend(settings.colorbox, {'html': $(this).data('video-embed-field-modal')}));
      });
    }
  };
})(jQuery);
;
