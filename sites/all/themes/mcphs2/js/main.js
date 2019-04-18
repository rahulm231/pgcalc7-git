/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-cssanimations-csstransforms-csstransforms3d-csstransitions-flexbox-touchevents-addtest-domprefixes-hasevent-mq-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles-dontmin-cssclassprefix:support-
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */
/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/
(function(window,document,undefined){var tests=[];/**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */
var ModernizrProto={
// The current version, dummy
_version:"3.3.1",
// Any settings that don't work as separate modules
// can go in here as configuration.
_config:{classPrefix:"support-",enableClasses:true,enableJSClass:true,usePrefixes:true},
// Queue of tests
_q:[],
// Stub these for people who are listening
on:function(test,cb){
// I don't really think people should do this, but we can
// safe guard it a bit.
// -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
// This is in case people listen to synchronous tests. I would leave it out,
// but the code to *disallow* sync tests in the real version of this
// function is actually larger than this.
var self=this;setTimeout(function(){cb(self[test])},0)},addTest:function(name,fn,options){tests.push({name:name,fn:fn,options:options})},addAsyncTest:function(fn){tests.push({name:null,fn:fn})}};
// Fake some of Object.create so we can force non test results to be non "own" properties.
var Modernizr=function(){};Modernizr.prototype=ModernizrProto;
// Leak modernizr globally when you `require` it rather than force it here.
// Overwrite name so constructor name is nicer :D
Modernizr=new Modernizr;var classes=[];/**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */
function is(obj,type){return typeof obj===type}/**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */
function testRunner(){var featureNames;var feature;var aliasIdx;var result;var nameIdx;var featureName;var featureNameSplit;for(var featureIdx in tests){if(tests.hasOwnProperty(featureIdx)){featureNames=[];feature=tests[featureIdx];
// run the test, throw the return value into the Modernizr,
// then based on that boolean, define an appropriate className
// and push it into an array of classes we'll join later.
//
// If there is no name, it's an 'async' test that is run,
// but not directly added to the object. That should
// be done with a post-run addTest call.
if(feature.name){featureNames.push(feature.name.toLowerCase());if(feature.options&&feature.options.aliases&&feature.options.aliases.length){
// Add all the aliases into the names list
for(aliasIdx=0;aliasIdx<feature.options.aliases.length;aliasIdx++){featureNames.push(feature.options.aliases[aliasIdx].toLowerCase())}}}
// Run the test, or use the raw value if it's not a function
result=is(feature.fn,"function")?feature.fn():feature.fn;
// Set each of the names on the Modernizr object
for(nameIdx=0;nameIdx<featureNames.length;nameIdx++){featureName=featureNames[nameIdx];
// Support dot properties as sub tests. We don't do checking to make sure
// that the implied parent tests have been added. You must call them in
// order (either in the test, or make the parent test a dependency).
//
// Cap it to TWO to make the logic simple and because who needs that kind of subtesting
// hashtag famous last words
featureNameSplit=featureName.split(".");if(featureNameSplit.length===1){Modernizr[featureNameSplit[0]]=result}else{
// cast to a Boolean, if not one already
/* jshint -W053 */
if(Modernizr[featureNameSplit[0]]&&!(Modernizr[featureNameSplit[0]]instanceof Boolean)){Modernizr[featureNameSplit[0]]=new Boolean(Modernizr[featureNameSplit[0]])}Modernizr[featureNameSplit[0]][featureNameSplit[1]]=result}classes.push((result?"":"no-")+featureNameSplit.join("-"))}}}}/**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */
var docElement=document.documentElement;/**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */
var isSVG=docElement.nodeName.toLowerCase()==="svg";/**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */
// Pass in an and array of class names, e.g.:
//  ['no-webp', 'borderradius', ...]
function setClasses(classes){var className=docElement.className;var classPrefix=Modernizr._config.classPrefix||"";if(isSVG){className=className.baseVal}
// Change `no-js` to `js` (independently of the `enableClasses` option)
// Handle classPrefix on this too
if(Modernizr._config.enableJSClass){var reJS=new RegExp("(^|\\s)"+classPrefix+"no-js(\\s|$)");className=className.replace(reJS,"$1"+classPrefix+"js$2")}if(Modernizr._config.enableClasses){
// Add the new classes
className+=" "+classPrefix+classes.join(" "+classPrefix);isSVG?docElement.className.baseVal=className:docElement.className=className}}/**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius

   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/

   * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */
var omPrefixes="Moz O ms Webkit";/**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */
var domPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.toLowerCase().split(" "):[];ModernizrProto._domPrefixes=domPrefixes;/**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */
var prefixes=ModernizrProto._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];
// expose these for the plugin API. Look in the source for how to join() them against your input
ModernizrProto._prefixes=prefixes;/**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */
// hasOwnProperty shim by kangax needed for Safari 2.0 support
var hasOwnProp;(function(){var _hasOwnProperty={}.hasOwnProperty;/* istanbul ignore else */
/* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
if(!is(_hasOwnProperty,"undefined")&&!is(_hasOwnProperty.call,"undefined")){hasOwnProp=function(object,property){return _hasOwnProperty.call(object,property)}}else{hasOwnProp=function(object,property){/* yes, this can give false positives/negatives, but most of the time we don't care about those */
return property in object&&is(object.constructor.prototype[property],"undefined")}}})();
// _l tracks listeners for async tests, as well as tests that execute after the initial run
ModernizrProto._l={};/**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */
ModernizrProto.on=function(feature,cb){
// Create the list of listeners if it doesn't exist
if(!this._l[feature]){this._l[feature]=[]}
// Push this test on to the listener list
this._l[feature].push(cb);
// If it's already been resolved, trigger it on next tick
if(Modernizr.hasOwnProperty(feature)){
// Next Tick
setTimeout(function(){Modernizr._trigger(feature,Modernizr[feature])},0)}};/**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */
ModernizrProto._trigger=function(feature,res){if(!this._l[feature]){return}var cbs=this._l[feature];
// Force async
setTimeout(function(){var i,cb;for(i=0;i<cbs.length;i++){cb=cbs[i];cb(res)}},0);
// Don't trigger these again
delete this._l[feature]};/**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */
function addTest(feature,test){if(typeof feature=="object"){for(var key in feature){if(hasOwnProp(feature,key)){addTest(key,feature[key])}}}else{feature=feature.toLowerCase();var featureNameSplit=feature.split(".");var last=Modernizr[featureNameSplit[0]];
// Again, we don't check for parent test existence. Get that right, though.
if(featureNameSplit.length==2){last=last[featureNameSplit[1]]}if(typeof last!="undefined"){
// we're going to quit if you're trying to overwrite an existing test
// if we were to allow it, we'd do this:
//   var re = new RegExp("\\b(no-)?" + feature + "\\b");
//   docElement.className = docElement.className.replace( re, '' );
// but, no rly, stuff 'em.
return Modernizr}test=typeof test=="function"?test():test;
// Set the value (this is the magic, right here).
if(featureNameSplit.length==1){Modernizr[featureNameSplit[0]]=test}else{
// cast to a Boolean, if not one already
/* jshint -W053 */
if(Modernizr[featureNameSplit[0]]&&!(Modernizr[featureNameSplit[0]]instanceof Boolean)){Modernizr[featureNameSplit[0]]=new Boolean(Modernizr[featureNameSplit[0]])}Modernizr[featureNameSplit[0]][featureNameSplit[1]]=test}
// Set a single class (either `feature` or `no-feature`)
/* jshint -W041 */
setClasses([(!!test&&test!=false?"":"no-")+featureNameSplit.join("-")]);/* jshint +W041 */
// Trigger the event
Modernizr._trigger(feature,test)}return Modernizr}
// After all the tests are run, add self to the Modernizr prototype
Modernizr._q.push(function(){ModernizrProto.addTest=addTest});/**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */
function createElement(){if(typeof document.createElement!=="function"){
// This is the case in IE7, where the type of createElement is "object".
// For this reason, we cannot call apply() as Object is not a Function.
return document.createElement(arguments[0])}else if(isSVG){return document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0])}else{return document.createElement.apply(document,arguments)}}/**
   * Modernizr.hasEvent() detects support for a given event
   *
   * @memberof Modernizr
   * @name Modernizr.hasEvent
   * @optionName Modernizr.hasEvent()
   * @optionProp hasEvent
   * @access public
   * @function hasEvent
   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
   * @returns {boolean}
   * @example
   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
   *  By default, it does this detection on a div element
   *
   * ```js
   *  hasEvent('blur') // true;
   * ```
   *
   * However, you are able to give an object as a second argument to hasEvent to
   * detect an event on something other than a div.
   *
   * ```js
   *  hasEvent('devicelight', window) // true;
   * ```
   *
   */
var hasEvent=function(){
// Detect whether event support can be detected via `in`. Test on a DOM element
// using the "blur" event b/c it should always exist. bit.ly/event-detection
var needsFallback=!("onblur"in document.documentElement);function inner(eventName,element){var isSupported;if(!eventName){return false}if(!element||typeof element==="string"){element=createElement(element||"div")}
// Testing via the `in` operator is sufficient for modern browsers and IE.
// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
// "resize", whereas `in` "catches" those.
eventName="on"+eventName;isSupported=eventName in element;
// Fallback technique for old Firefox - bit.ly/event-detection
if(!isSupported&&needsFallback){if(!element.setAttribute){
// Switch to generic element if it lacks `setAttribute`.
// It could be the `document`, `window`, or something else.
element=createElement("div")}element.setAttribute(eventName,"");isSupported=typeof element[eventName]==="function";if(element[eventName]!==undefined){
// If property was created, "remove it" by setting value to `undefined`.
element[eventName]=undefined}element.removeAttribute(eventName)}return isSupported}return inner}();ModernizrProto.hasEvent=hasEvent;/**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */
function getBody(){
// After page load injecting a fake body doesn't work so check if body exists
var body=document.body;if(!body){
// Can't use the real body create a fake one.
body=createElement(isSVG?"svg":"body");body.fake=true}return body}/**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */
function injectElementWithStyles(rule,callback,nodes,testnames){var mod="modernizr";var style;var ret;var node;var docOverflow;var div=createElement("div");var body=getBody();if(parseInt(nodes,10)){
// In order not to give false positives we create a node for each test
// This also allows the method to scale for unspecified uses
while(nodes--){node=createElement("div");node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node)}}style=createElement("style");style.type="text/css";style.id="s"+mod;
// IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
// Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
(!body.fake?div:body).appendChild(style);body.appendChild(div);if(style.styleSheet){style.styleSheet.cssText=rule}else{style.appendChild(document.createTextNode(rule))}div.id=mod;if(body.fake){
//avoid crashing IE8, if background image is used
body.style.background="";
//Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
body.style.overflow="hidden";docOverflow=docElement.style.overflow;docElement.style.overflow="hidden";docElement.appendChild(body)}ret=callback(div,rule);
// If this is done after page load we don't want to remove the body so check if body exists
if(body.fake){body.parentNode.removeChild(body);docElement.style.overflow=docOverflow;
// Trigger layout so kinetic scrolling isn't disabled in iOS6+
docElement.offsetHeight}else{div.parentNode.removeChild(div)}return!!ret}/**
   * Modernizr.mq tests a given media query, live against the current state of the window
   * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
   * gist.github.com/786768
   *
   * @memberof Modernizr
   * @name Modernizr.mq
   * @optionName Modernizr.mq()
   * @optionProp mq
   * @access public
   * @function mq
   * @param {string} mq - String of the media query we want to test
   * @returns {boolean}
   * @example
   * Modernizr.mq allows for you to programmatically check if the current browser
   * window state matches a media query.
   *
   * ```js
   *  var query = Modernizr.mq('(min-width: 900px)');
   *
   *  if (query) {
   *    // the browser window is larger than 900px
   *  }
   * ```
   *
   * Only valid media queries are supported, therefore you must always include values
   * with your media query
   *
   * ```js
   * // good
   *  Modernizr.mq('(min-width: 900px)');
   *
   * // bad
   *  Modernizr.mq('min-width');
   * ```
   *
   * If you would just like to test that media queries are supported in general, use
   *
   * ```js
   *  Modernizr.mq('only all'); // true if MQ are supported, false if not
   * ```
   *
   *
   * Note that if the browser does not support media queries (e.g. old IE) mq will
   * always return false.
   */
var mq=function(){var matchMedia=window.matchMedia||window.msMatchMedia;if(matchMedia){return function(mq){var mql=matchMedia(mq);return mql&&mql.matches||false}}return function(mq){var bool=false;injectElementWithStyles("@media "+mq+" { #modernizr { position: absolute; } }",function(node){bool=(window.getComputedStyle?window.getComputedStyle(node,null):node.currentStyle).position=="absolute"});return bool}}();ModernizrProto.mq=mq;var cssomPrefixes=ModernizrProto._config.usePrefixes?omPrefixes.split(" "):[];ModernizrProto._cssomPrefixes=cssomPrefixes;/**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */
function contains(str,substr){return!!~(""+str).indexOf(substr)}/**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */
var modElem={elem:createElement("modernizr")};
// Clean up this element
Modernizr._q.push(function(){delete modElem.elem});var mStyle={style:modElem.elem.style};
// kill ref for gc, must happen before mod.elem is removed, so we unshift on to
// the front of the queue.
Modernizr._q.unshift(function(){delete mStyle.style});/**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */
function domToCSS(name){return name.replace(/([A-Z])/g,function(str,m1){return"-"+m1.toLowerCase()}).replace(/^ms-/,"-ms-")}/**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */
// Accepts a list of property names and a single value
// Returns `undefined` if native detection not available
function nativeTestProps(props,value){var i=props.length;
// Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
if("CSS"in window&&"supports"in window.CSS){
// Try every prefixed variant of the property
while(i--){if(window.CSS.supports(domToCSS(props[i]),value)){return true}}return false}else if("CSSSupportsRule"in window){
// Build a condition string for every prefixed variant
var conditionText=[];while(i--){conditionText.push("("+domToCSS(props[i])+":"+value+")")}conditionText=conditionText.join(" or ");return injectElementWithStyles("@supports ("+conditionText+") { #modernizr { position: absolute; } }",function(node){return getComputedStyle(node,null).position=="absolute"})}return undefined}/**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */
function cssToDOM(name){return name.replace(/([a-z])-([a-z])/g,function(str,m1,m2){return m1+m2.toUpperCase()}).replace(/^-/,"")}
// testProps is a generic CSS / DOM property test.
// In testing support for a given CSS property, it's legit to test:
//    `elem.style[styleName] !== undefined`
// If the property is supported it will return an empty string,
// if unsupported it will return undefined.
// We'll take advantage of this quick test and skip setting a style
// on our modernizr element, but instead just testing undefined vs
// empty string.
// Property names can be provided in either camelCase or kebab-case.
function testProps(props,prefixed,value,skipValueTest){skipValueTest=is(skipValueTest,"undefined")?false:skipValueTest;
// Try native detect first
if(!is(value,"undefined")){var result=nativeTestProps(props,value);if(!is(result,"undefined")){return result}}
// Otherwise do it properly
var afterInit,i,propsLength,prop,before;
// If we don't have a style element, that means we're running async or after
// the core tests, so we'll need to create our own elements to use
// inside of an SVG element, in certain browsers, the `style` element is only
// defined for valid tags. Therefore, if `modernizr` does not have one, we
// fall back to a less used element and hope for the best.
var elems=["modernizr","tspan"];while(!mStyle.style){afterInit=true;mStyle.modElem=createElement(elems.shift());mStyle.style=mStyle.modElem.style}
// Delete the objects if we created them.
function cleanElems(){if(afterInit){delete mStyle.style;delete mStyle.modElem}}propsLength=props.length;for(i=0;i<propsLength;i++){prop=props[i];before=mStyle.style[prop];if(contains(prop,"-")){prop=cssToDOM(prop)}if(mStyle.style[prop]!==undefined){
// If value to test has been passed in, do a set-and-check test.
// 0 (integer) is a valid property value, so check that `value` isn't
// undefined, rather than just checking it's truthy.
if(!skipValueTest&&!is(value,"undefined")){
// Needs a try catch block because of old IE. This is slow, but will
// be avoided in most cases because `skipValueTest` will be used.
try{mStyle.style[prop]=value}catch(e){}
// If the property value has changed, we assume the value used is
// supported. If `value` is empty string, it'll fail here (because
// it hasn't changed), which matches how browsers have implemented
// CSS.supports()
if(mStyle.style[prop]!=before){cleanElems();return prefixed=="pfx"?prop:true}}else{cleanElems();return prefixed=="pfx"?prop:true}}}cleanElems();return false}/**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */
function fnBind(fn,that){return function(){return fn.apply(that,arguments)}}/**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
function testDOMProps(props,obj,elem){var item;for(var i in props){if(props[i]in obj){
// return the property name as a string
if(elem===false){return props[i]}item=obj[props[i]];
// let's bind a function
if(is(item,"function")){
// bind to obj unless overriden
return fnBind(item,elem||obj)}
// return the unbound function or obj or value
return item}}return false}/**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
function testPropsAll(prop,prefixed,elem,value,skipValueTest){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+" "+cssomPrefixes.join(ucProp+" ")+ucProp).split(" ");
// did they call .prefixed('boxSizing') or are we just testing a prop?
if(is(prefixed,"string")||is(prefixed,"undefined")){return testProps(props,prefixed,value,skipValueTest)}else{props=(prop+" "+domPrefixes.join(ucProp+" ")+ucProp).split(" ");return testDOMProps(props,prefixed,elem)}}
// Modernizr.testAllProps() investigates whether a given style property,
// or any of its vendor-prefixed variants, is recognized
//
// Note that the property names must be provided in the camelCase variant.
// Modernizr.testAllProps('boxSizing')
ModernizrProto.testAllProps=testPropsAll;/**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */
var atRule=function(prop){var length=prefixes.length;var cssrule=window.CSSRule;var rule;if(typeof cssrule==="undefined"){return undefined}if(!prop){return false}
// remove literal @ from beginning of provided property
prop=prop.replace(/^@/,"");
// CSSRules use underscores instead of dashes
rule=prop.replace(/-/g,"_").toUpperCase()+"_RULE";if(rule in cssrule){return"@"+prop}for(var i=0;i<length;i++){
// prefixes gives us something like -o-, and we want O_
var prefix=prefixes[i];var thisRule=prefix.toUpperCase()+"_"+rule;if(thisRule in cssrule){return"@-"+prefix.toLowerCase()+"-"+prop}}return false};ModernizrProto.atRule=atRule;/**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */
var prefixed=ModernizrProto.prefixed=function(prop,obj,elem){if(prop.indexOf("@")===0){return atRule(prop)}if(prop.indexOf("-")!=-1){
// Convert kebab-case to camelCase
prop=cssToDOM(prop)}if(!obj){return testPropsAll(prop,"pfx")}else{
// Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
return testPropsAll(prop,obj,elem)}};/**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */
function testAllProps(prop,value,skipValueTest){return testPropsAll(prop,undefined,undefined,value,skipValueTest)}ModernizrProto.testAllProps=testAllProps;/**
   * testProp() investigates whether a given style property is recognized
   * Property names can be provided in either camelCase or kebab-case.
   *
   * @memberof Modernizr
   * @name Modernizr.testProp
   * @access public
   * @optionName Modernizr.testProp()
   * @optionProp testProp
   * @function testProp
   * @param {string} prop - Name of the CSS property to check
   * @param {string} [value] - Name of the CSS value to check
   * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
   * @returns {boolean}
   * @example
   *
   * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
   * version of the string.
   *
   * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
   *
   * ```js
   * Modernizr.testProp('pointerEvents')  // true
   * ```
   *
   * You can also provide a value as an optional second argument to check if a
   * specific value is supported
   *
   * ```js
   * Modernizr.testProp('pointerEvents', 'none') // true
   * Modernizr.testProp('pointerEvents', 'penguin') // false
   * ```
   */
var testProp=ModernizrProto.testProp=function(prop,value,useValue){return testProps([prop],undefined,value,useValue)};/**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */
var testStyles=ModernizrProto.testStyles=injectElementWithStyles;/**
  * @optionName html5shiv
  * @optionProp html5shiv
  */
// Take the html5 variable out of the html5shiv scope so we can return it.
var html5;if(!isSVG){(function(window,document){/*jshint evil:true */
/** version */
var version="3.7.3";/** Preset options */
var options=window.html5||{};/** Used to skip problem elements */
var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;/** Not all elements can be cloned in IE **/
var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;/** Detect whether the browser supports default html5 styles */
var supportsHtml5Styles;/** Name of the expando, to work with multiple documents or to re-shiv one document */
var expando="_html5shiv";/** The id for the the documents expando */
var expanID=0;/** Cached data for each document */
var expandoData={};/** Detect whether the browser supports unknown elements */
var supportsUnknownElements;(function(){try{var a=document.createElement("a");a.innerHTML="<xyz></xyz>";
//if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
supportsHtml5Styles="hidden"in a;supportsUnknownElements=a.childNodes.length==1||function(){
// assign a false positive if unable to shiv
document.createElement("a");var frag=document.createDocumentFragment();return typeof frag.cloneNode=="undefined"||typeof frag.createDocumentFragment=="undefined"||typeof frag.createElement=="undefined"}()}catch(e){
// assign a false positive if detection fails => unable to shiv
supportsHtml5Styles=true;supportsUnknownElements=true}})();/*--------------------------------------------------------------------------*/
/**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement("p"),parent=ownerDocument.getElementsByTagName("head")[0]||ownerDocument.documentElement;p.innerHTML="x<style>"+cssText+"</style>";return parent.insertBefore(p.lastChild,parent.firstChild)}/**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
function getElements(){var elements=html5.elements;return typeof elements=="string"?elements.split(" "):elements}/**
       * Extends the built-in list of html5 elements
       * @memberOf html5
       * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
       * @param {Document} ownerDocument The context document.
       */
function addElements(newElements,ownerDocument){var elements=html5.elements;if(typeof elements!="string"){elements=elements.join(" ")}if(typeof newElements!="string"){newElements=newElements.join(" ")}html5.elements=elements+" "+newElements;shivDocument(ownerDocument)}/**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data}return data}/**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document|DocumentFragment} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}if(!data){data=getExpandoData(ownerDocument)}var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}
// Avoid adding some elements to fragments in IE < 9 because
// * Attributes like `name` or `type` cannot be set/changed once an element
//   is inserted into a document/fragment
// * Link elements with `src` attributes that are inaccessible, as with
//   a 403 response, will cause the tab/window to crash
// * Script elements appended to fragments will execute when their `src`
//   or `text` property is set
return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node}/**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i])}return clone}/**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}ownerDocument.createElement=function(nodeName){
//abort shiv
if(!html5.shivMethods){return data.createElem(nodeName)}return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+
// unroll the `createElement` calls
getElements().join().replace(/[\w\-:]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")'})+");return n}")(html5,data.frag)}/*--------------------------------------------------------------------------*/
/**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,
// corrects block display not defined in IE6/7/8/9
"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}"+
// adds styling not present in IE6/7/8/9
"mark{background:#FF0;color:#000}"+
// hides non-rendered elements
"template{display:none}")}if(!supportsUnknownElements){shivMethods(ownerDocument,data)}return ownerDocument}/*--------------------------------------------------------------------------*/
/**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
var html5={/**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
elements:options.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",/**
         * current version of html5shiv
         */
version:version,/**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
shivCSS:options.shivCSS!==false,/**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
supportsUnknownElements:supportsUnknownElements,/**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
shivMethods:options.shivMethods!==false,/**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
type:"default",
// shivs the document according to the specified `html5` object options
shivDocument:shivDocument,
//creates a shived element
createElement:createElement,
//creates a shived documentFragment
createDocumentFragment:createDocumentFragment,
//extends list of elements
addElements:addElements};/*--------------------------------------------------------------------------*/
// expose html5
window.html5=html5;
// shiv the document
shivDocument(document);if(typeof module=="object"&&module.exports){module.exports=html5}})(typeof window!=="undefined"?window:this,document)}/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds â€“ https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC
Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously â€“ see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.
*/
// Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
Modernizr.addTest("touchevents",function(){var bool;if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch){bool=true}else{
// include the 'heartz' as a way to have a non matching MQ to help terminate the join
// https://git.io/vznFH
var query=["@media (",prefixes.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");testStyles(query,function(node){bool=node.offsetTop===9})}return bool});/*!
{
  "name": "CSS Animations",
  "property": "cssanimations",
  "caniuse": "css-animation",
  "polyfills": ["transformie", "csssandpaper"],
  "tags": ["css"],
  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
  "notes": [{
    "name" : "Article: 'Dispelling the Android CSS animation myths'",
    "href": "https://goo.gl/OGw5Gm"
  }]
}
!*/
/* DOC
Detects whether or not elements can be animated using CSS
*/
Modernizr.addTest("cssanimations",testAllProps("animationName","a",true));/*!
{
  "name": "Flexbox",
  "property": "flexbox",
  "caniuse": "flexbox",
  "tags": ["css"],
  "notes": [{
    "name": "The _new_ flexbox",
    "href": "http://dev.w3.org/csswg/css3-flexbox"
  }],
  "warnings": [
    "A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
  ]
}
!*/
/* DOC
Detects support for the Flexible Box Layout model, a.k.a. Flexbox, which allows easy manipulation of layout order and sizing within a container.
*/
Modernizr.addTest("flexbox",testAllProps("flexBasis","1px",true));/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/
Modernizr.addTest("csstransforms",function(){
// Android < 3.0 is buggy, so we sniff and blacklist
// http://git.io/hHzL7w
return navigator.userAgent.indexOf("Android 2.")===-1&&testAllProps("transform","scale(1)",true)});/*!
{
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
}
!*/
var newSyntax="CSS"in window&&"supports"in window.CSS;var oldSyntax="supportsCSS"in window;Modernizr.addTest("supports",newSyntax||oldSyntax);/*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/
Modernizr.addTest("csstransforms3d",function(){var ret=!!testAllProps("perspective","1px",true);var usePrefix=Modernizr._config.usePrefixes;
// Webkit's 3D transforms are passed off to the browser's own graphics renderer.
//   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
//   some conditions. As a result, Webkit typically recognizes the syntax but
//   will sometimes throw a false positive, thus we must do a more thorough check:
if(ret&&(!usePrefix||"webkitPerspective"in docElement.style)){var mq;var defaultStyle="#modernizr{width:0;height:0}";
// Use CSS Conditional Rules if available
if(Modernizr.supports){mq="@supports (perspective: 1px)"}else{
// Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
// `@media (transform-3d),(-webkit-transform-3d){ ... }`
mq="@media (transform-3d)";if(usePrefix){mq+=",(-webkit-transform-3d)"}}mq+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}";testStyles(defaultStyle+mq,function(elem){ret=elem.offsetWidth===7&&elem.offsetHeight===18})}return ret});/*!
{
  "name": "CSS Transitions",
  "property": "csstransitions",
  "caniuse": "css-transitions",
  "tags": ["css"]
}
!*/
Modernizr.addTest("csstransitions",testAllProps("transition","all",true));
// Run each test
testRunner();
// Remove the "no-js" class if it exists
setClasses(classes);delete ModernizrProto.addTest;delete ModernizrProto.addAsyncTest;
// Run the things that are supposed to run after the tests
for(var i=0;i<Modernizr._q.length;i++){Modernizr._q[i]()}
// Leak Modernizr namespace
window.Modernizr=Modernizr})(window,document);/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=3e94a5616b1e1291015f)
 * Config saved to config.json and https://gist.github.com/3e94a5616b1e1291015f
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),s=o.data("bs.button"),n="object"==typeof e&&e;s||o.data("bs.button",s=new i(this,n)),"toggle"==e?s.toggle():e&&s.setState(e)})}var i=function(e,o){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,o),this.isLoading=!1};i.VERSION="3.3.1",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",o=this.$element,s=o.is("input")?"val":"html",n=o.data();e+="Text",null==n.resetText&&o.data("resetText",o[s]()),setTimeout(t.proxy(function(){o[s](null==n[e]?this.options[e]:n[e]),"loadingText"==e?(this.isLoading=!0,o.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,o.removeClass(i).removeAttr(i))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));t&&this.$element.toggleClass("active")};var o=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=o,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var o=t(i.target);o.hasClass("btn")||(o=o.closest(".btn")),e.call(o,"toggle"),i.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),+function(t){"use strict";function e(e,o){return this.each(function(){var s=t(this),n=s.data("bs.modal"),r=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e);n||s.data("bs.modal",n=new i(this,r)),"string"==typeof e?n[e](o):r.show&&n.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.1",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,s=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var s=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.options.backdrop&&o.adjustBackdrop(),o.adjustDialog(),s&&o.$element[0].offsetWidth,o.$element.addClass("in").attr("aria-hidden",!1),o.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});s?o.$element.find(".modal-dialog").one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(n)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger("focus").trigger(n)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,s=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&s;if(this.$backdrop=t('<div class="modal-backdrop '+s+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},i.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},i.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var o=t(this),s=o.attr("href"),n=t(o.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,"")),r=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},n.data(),o.data());o.is("a")&&i.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){o.is(":visible")&&o.trigger("focus")})}),e.call(n,r,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var o=t(this),s=o.data("bs.tooltip"),n="object"==typeof e&&e,r=n&&n.selector;(s||"destroy"!=e)&&(r?(s||o.data("bs.tooltip",s={}),s[r]||(s[r]=new i(this,n))):s||o.data("bs.tooltip",s=new i(this,n)),"string"==typeof e&&s[e]())})}var i=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};i.VERSION="3.3.1",i.TRANSITION_DURATION=150,i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,o){this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport);for(var s=this.options.trigger.split(" "),n=s.length;n--;){var r=s[n];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,o){i[t]!=o&&(e[t]=o)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i&&i.$tip&&i.$tip.is(":visible")?void(i.hoverState="in"):(i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show())},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var o=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!o)return;var s=this,n=this.tip(),r=this.getUID(this.type);this.setContent(),n.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&n.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,n[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),n.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?n.appendTo(this.options.container):n.insertAfter(this.$element);var p=this.getPosition(),d=n[0].offsetWidth,c=n[0].offsetHeight;if(h){var f=a,u=this.options.container?t(this.options.container):this.$element.parent(),g=this.getPosition(u);a="bottom"==a&&p.bottom+c>g.bottom?"top":"top"==a&&p.top-c<g.top?"bottom":"right"==a&&p.right+d>g.width?"left":"left"==a&&p.left-d<g.left?"right":a,n.removeClass(f).addClass(a)}var m=this.getCalculatedOffset(a,p,d,c);this.applyPlacement(m,a);var v=function(){var t=s.hoverState;s.$element.trigger("shown.bs."+s.type),s.hoverState=null,"out"==t&&s.leave(s)};t.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",v).emulateTransitionEnd(i.TRANSITION_DURATION):v()}},i.prototype.applyPlacement=function(e,i){var o=this.tip(),s=o[0].offsetWidth,n=o[0].offsetHeight,r=parseInt(o.css("margin-top"),10),a=parseInt(o.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top=e.top+r,e.left=e.left+a,t.offset.setOffset(o[0],t.extend({using:function(t){o.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),o.addClass("in");var l=o[0].offsetWidth,h=o[0].offsetHeight;"top"==i&&h!=n&&(e.top=e.top+n-h);var p=this.getViewportAdjustedDelta(i,e,l,h);p.left?e.left+=p.left:e.top+=p.top;var d=/top|bottom/.test(i),c=d?2*p.left-s+l:2*p.top-n+h,f=d?"offsetWidth":"offsetHeight";o.offset(e),this.replaceArrow(c,o[0][f],d)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(e){function o(){"in"!=s.hoverState&&n.detach(),s.$element.removeAttr("aria-describedby").trigger("hidden.bs."+s.type),e&&e()}var s=this,n=this.tip(),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(n.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",o).emulateTransitionEnd(i.TRANSITION_DURATION):o(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],o="BODY"==i.tagName,s=i.getBoundingClientRect();null==s.width&&(s=t.extend({},s,{width:s.right-s.left,height:s.bottom-s.top}));var n=o?{top:0,left:0}:e.offset(),r={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},a=o?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},s,r,a,n)},i.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,o){var s={top:0,left:0};if(!this.$viewport)return s;var n=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-n-r.scroll,l=e.top+n-r.scroll+o;a<r.top?s.top=r.top-a:l>r.top+r.height&&(s.top=r.top+r.height-l)}else{var h=e.left-n,p=e.left+n+i;h<r.left?s.left=r.left-h:p>r.width&&(s.left=r.left+r.width-p)}return s},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},i.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var o=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery),+function(t){"use strict";function e(e){var i,o=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(o)}function i(e){return this.each(function(){var i=t(this),s=i.data("bs.collapse"),n=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);!s&&n.toggle&&"show"==e&&(n.toggle=!1),s||i.data("bs.collapse",s=new o(this,n)),"string"==typeof e&&s[e]()})}var o=function(e,i){this.$element=t(e),this.options=t.extend({},o.DEFAULTS,i),this.$trigger=t(this.options.trigger).filter('[href="#'+e.id+'"], [data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};o.VERSION="3.3.1",o.TRANSITION_DURATION=350,o.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},o.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},o.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,s=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(s&&s.length&&(e=s.data("bs.collapse"),e&&e.transitioning))){var n=t.Event("show.bs.collapse");if(this.$element.trigger(n),!n.isDefaultPrevented()){s&&s.length&&(i.call(s,"hide"),e||s.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])}}}},o.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var s=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(s,this)).emulateTransitionEnd(o.TRANSITION_DURATION):s.call(this)}}},o.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},o.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,o){var s=t(o);this.addAriaAndCollapsedClass(e(s),s)},this)).end()},o.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var s=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=o,t.fn.collapse.noConflict=function(){return t.fn.collapse=s,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(o){var s=t(this);s.attr("data-target")||o.preventDefault();var n=e(s),r=n.data("bs.collapse"),a=r?"toggle":t.extend({},s.data(),{trigger:this});i.call(n,a)})}(jQuery),+function(t){"use strict";function e(i,o){var s=t.proxy(this.process,this);this.$body=t("body"),this.$scrollElement=t(t(i).is("body")?window:i),this.options=t.extend({},e.DEFAULTS,o),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s),this.refresh(),this.process()}function i(i){return this.each(function(){var o=t(this),s=o.data("bs.scrollspy"),n="object"==typeof i&&i;s||o.data("bs.scrollspy",s=new e(this,n)),"string"==typeof i&&s[i]()})}e.VERSION="3.3.1",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e="offset",i=0;t.isWindow(this.$scrollElement[0])||(e="position",i=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var o=this;this.$body.find(this.selector).map(function(){var o=t(this),s=o.data("target")||o.attr("href"),n=/^#./.test(s)&&t(s);return n&&n.length&&n.is(":visible")&&[[n[e]().top+i,s]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){o.offsets.push(this[0]),o.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),s=this.offsets,n=this.targets,r=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=o)return r!=(t=n[n.length-1])&&this.activate(t);if(r&&e<s[0])return this.activeTarget=null,this.clear();for(t=s.length;t--;)r!=n[t]&&e>=s[t]&&(!s[t+1]||e<=s[t+1])&&this.activate(n[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',o=t(i).parents("li").addClass("active");o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")),o.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var o=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=o,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one("bsTransitionEnd",function(){i=!0});var s=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(s,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);(function(factory){"use strict";if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else if(typeof exports!=="undefined"){module.exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){"use strict";var Slick=window.Slick||{};Slick=function(){var instanceUid=0;function Slick(element,settings){var _=this,dataSettings;_.defaults={accessibility:true,adaptiveHeight:false,appendArrows:$(element),appendDots:$(element),arrows:true,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:false,autoplaySpeed:3e3,centerMode:false,centerPadding:"50px",cssEase:"ease",customPaging:function(slider,i){return $('<button type="button" />').text(i+1)},dots:false,dotsClass:"slick-dots",draggable:true,easing:"linear",edgeFriction:.35,fade:false,focusOnSelect:false,focusOnChange:false,infinite:true,initialSlide:0,lazyLoad:"ondemand",mobileFirst:false,pauseOnHover:true,pauseOnFocus:true,pauseOnDotsHover:false,respondTo:"window",responsive:null,rows:1,rtl:false,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:true,swipeToSlide:false,touchMove:true,touchThreshold:5,useCSS:true,useTransform:true,variableWidth:false,vertical:false,verticalSwiping:false,waitForAnimate:true,zIndex:1e3};_.initials={animating:false,dragging:false,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:false,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:false,slideOffset:0,swipeLeft:null,swiping:false,$list:null,touchObject:{},transformsEnabled:false,unslicked:false};$.extend(_,_.initials);_.activeBreakpoint=null;_.animType=null;_.animProp=null;_.breakpoints=[];_.breakpointSettings=[];_.cssTransitions=false;_.focussed=false;_.interrupted=false;_.hidden="hidden";_.paused=true;_.positionProp=null;_.respondTo=null;_.rowCount=1;_.shouldClick=true;_.$slider=$(element);_.$slidesCache=null;_.transformType=null;_.transitionType=null;_.visibilityChange="visibilitychange";_.windowWidth=0;_.windowTimer=null;dataSettings=$(element).data("slick")||{};_.options=$.extend({},_.defaults,settings,dataSettings);_.currentSlide=_.options.initialSlide;_.originalSettings=_.options;if(typeof document.mozHidden!=="undefined"){_.hidden="mozHidden";_.visibilityChange="mozvisibilitychange"}else if(typeof document.webkitHidden!=="undefined"){_.hidden="webkitHidden";_.visibilityChange="webkitvisibilitychange"}_.autoPlay=$.proxy(_.autoPlay,_);_.autoPlayClear=$.proxy(_.autoPlayClear,_);_.autoPlayIterator=$.proxy(_.autoPlayIterator,_);_.changeSlide=$.proxy(_.changeSlide,_);_.clickHandler=$.proxy(_.clickHandler,_);_.selectHandler=$.proxy(_.selectHandler,_);_.setPosition=$.proxy(_.setPosition,_);_.swipeHandler=$.proxy(_.swipeHandler,_);_.dragHandler=$.proxy(_.dragHandler,_);_.keyHandler=$.proxy(_.keyHandler,_);_.instanceUid=instanceUid++;
// A simple way to check for HTML strings
// Strict HTML recognition (must start with <)
// Extracted from jQuery v1.11 source
_.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/;_.registerBreakpoints();_.init(true)}return Slick}();Slick.prototype.activateADA=function(){var _=this;_.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})};Slick.prototype.addSlide=Slick.prototype.slickAdd=function(markup,index,addBefore){var _=this;if(typeof index==="boolean"){addBefore=index;index=null}else if(index<0||index>=_.slideCount){return false}_.unload();if(typeof index==="number"){if(index===0&&_.$slides.length===0){$(markup).appendTo(_.$slideTrack)}else if(addBefore){$(markup).insertBefore(_.$slides.eq(index))}else{$(markup).insertAfter(_.$slides.eq(index))}}else{if(addBefore===true){$(markup).prependTo(_.$slideTrack)}else{$(markup).appendTo(_.$slideTrack)}}_.$slides=_.$slideTrack.children(this.options.slide);_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.append(_.$slides);_.$slides.each(function(index,element){$(element).attr("data-slick-index",index)});_.$slidesCache=_.$slides;_.reinit()};Slick.prototype.animateHeight=function(){var _=this;if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);_.$list.animate({height:targetHeight},_.options.speed)}};Slick.prototype.animateSlide=function(targetLeft,callback){var animProps={},_=this;_.animateHeight();if(_.options.rtl===true&&_.options.vertical===false){targetLeft=-targetLeft}if(_.transformsEnabled===false){if(_.options.vertical===false){_.$slideTrack.animate({left:targetLeft},_.options.speed,_.options.easing,callback)}else{_.$slideTrack.animate({top:targetLeft},_.options.speed,_.options.easing,callback)}}else{if(_.cssTransitions===false){if(_.options.rtl===true){_.currentLeft=-_.currentLeft}$({animStart:_.currentLeft}).animate({animStart:targetLeft},{duration:_.options.speed,easing:_.options.easing,step:function(now){now=Math.ceil(now);if(_.options.vertical===false){animProps[_.animType]="translate("+now+"px, 0px)";_.$slideTrack.css(animProps)}else{animProps[_.animType]="translate(0px,"+now+"px)";_.$slideTrack.css(animProps)}},complete:function(){if(callback){callback.call()}}})}else{_.applyTransition();targetLeft=Math.ceil(targetLeft);if(_.options.vertical===false){animProps[_.animType]="translate3d("+targetLeft+"px, 0px, 0px)"}else{animProps[_.animType]="translate3d(0px,"+targetLeft+"px, 0px)"}_.$slideTrack.css(animProps);if(callback){setTimeout(function(){_.disableTransition();callback.call()},_.options.speed)}}}};Slick.prototype.getNavTarget=function(){var _=this,asNavFor=_.options.asNavFor;if(asNavFor&&asNavFor!==null){asNavFor=$(asNavFor).not(_.$slider)}return asNavFor};Slick.prototype.asNavFor=function(index){var _=this,asNavFor=_.getNavTarget();if(asNavFor!==null&&typeof asNavFor==="object"){asNavFor.each(function(){var target=$(this).slick("getSlick");if(!target.unslicked){target.slideHandler(index,true)}})}};Slick.prototype.applyTransition=function(slide){var _=this,transition={};if(_.options.fade===false){transition[_.transitionType]=_.transformType+" "+_.options.speed+"ms "+_.options.cssEase}else{transition[_.transitionType]="opacity "+_.options.speed+"ms "+_.options.cssEase}if(_.options.fade===false){_.$slideTrack.css(transition)}else{_.$slides.eq(slide).css(transition)}};Slick.prototype.autoPlay=function(){var _=this;_.autoPlayClear();if(_.slideCount>_.options.slidesToShow){_.autoPlayTimer=setInterval(_.autoPlayIterator,_.options.autoplaySpeed)}};Slick.prototype.autoPlayClear=function(){var _=this;if(_.autoPlayTimer){clearInterval(_.autoPlayTimer)}};Slick.prototype.autoPlayIterator=function(){var _=this,slideTo=_.currentSlide+_.options.slidesToScroll;if(!_.paused&&!_.interrupted&&!_.focussed){if(_.options.infinite===false){if(_.direction===1&&_.currentSlide+1===_.slideCount-1){_.direction=0}else if(_.direction===0){slideTo=_.currentSlide-_.options.slidesToScroll;if(_.currentSlide-1===0){_.direction=1}}}_.slideHandler(slideTo)}};Slick.prototype.buildArrows=function(){var _=this;if(_.options.arrows===true){_.$prevArrow=$(_.options.prevArrow).addClass("slick-arrow");_.$nextArrow=$(_.options.nextArrow).addClass("slick-arrow");if(_.slideCount>_.options.slidesToShow){_.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");_.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");if(_.htmlExpr.test(_.options.prevArrow)){_.$prevArrow.prependTo(_.options.appendArrows)}if(_.htmlExpr.test(_.options.nextArrow)){_.$nextArrow.appendTo(_.options.appendArrows)}if(_.options.infinite!==true){_.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")}}else{_.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"})}}};Slick.prototype.buildDots=function(){var _=this,i,dot;if(_.options.dots===true){_.$slider.addClass("slick-dotted");dot=$("<ul />").addClass(_.options.dotsClass);for(i=0;i<=_.getDotCount();i+=1){dot.append($("<li />").append(_.options.customPaging.call(this,_,i)))}_.$dots=dot.appendTo(_.options.appendDots);_.$dots.find("li").first().addClass("slick-active")}};Slick.prototype.buildOut=function(){var _=this;_.$slides=_.$slider.children(_.options.slide+":not(.slick-cloned)").addClass("slick-slide");_.slideCount=_.$slides.length;_.$slides.each(function(index,element){$(element).attr("data-slick-index",index).data("originalStyling",$(element).attr("style")||"")});_.$slider.addClass("slick-slider");_.$slideTrack=_.slideCount===0?$('<div class="slick-track"/>').appendTo(_.$slider):_.$slides.wrapAll('<div class="slick-track"/>').parent();_.$list=_.$slideTrack.wrap('<div class="slick-list"/>').parent();_.$slideTrack.css("opacity",0);if(_.options.centerMode===true||_.options.swipeToSlide===true){_.options.slidesToScroll=1}$("img[data-lazy]",_.$slider).not("[src]").addClass("slick-loading");_.setupInfinite();_.buildArrows();_.buildDots();_.updateDots();_.setSlideClasses(typeof _.currentSlide==="number"?_.currentSlide:0);if(_.options.draggable===true){_.$list.addClass("draggable")}};Slick.prototype.buildRows=function(){var _=this,a,b,c,newSlides,numOfSlides,originalSlides,slidesPerSection;newSlides=document.createDocumentFragment();originalSlides=_.$slider.children();if(_.options.rows>1){slidesPerSection=_.options.slidesPerRow*_.options.rows;numOfSlides=Math.ceil(originalSlides.length/slidesPerSection);for(a=0;a<numOfSlides;a++){var slide=document.createElement("div");for(b=0;b<_.options.rows;b++){var row=document.createElement("div");for(c=0;c<_.options.slidesPerRow;c++){var target=a*slidesPerSection+(b*_.options.slidesPerRow+c);if(originalSlides.get(target)){row.appendChild(originalSlides.get(target))}}slide.appendChild(row)}newSlides.appendChild(slide)}_.$slider.empty().append(newSlides);_.$slider.children().children().children().css({width:100/_.options.slidesPerRow+"%",display:"inline-block"})}};Slick.prototype.checkResponsive=function(initial,forceUpdate){var _=this,breakpoint,targetBreakpoint,respondToWidth,triggerBreakpoint=false;var sliderWidth=_.$slider.width();var windowWidth=window.innerWidth||$(window).width();if(_.respondTo==="window"){respondToWidth=windowWidth}else if(_.respondTo==="slider"){respondToWidth=sliderWidth}else if(_.respondTo==="min"){respondToWidth=Math.min(windowWidth,sliderWidth)}if(_.options.responsive&&_.options.responsive.length&&_.options.responsive!==null){targetBreakpoint=null;for(breakpoint in _.breakpoints){if(_.breakpoints.hasOwnProperty(breakpoint)){if(_.originalSettings.mobileFirst===false){if(respondToWidth<_.breakpoints[breakpoint]){targetBreakpoint=_.breakpoints[breakpoint]}}else{if(respondToWidth>_.breakpoints[breakpoint]){targetBreakpoint=_.breakpoints[breakpoint]}}}}if(targetBreakpoint!==null){if(_.activeBreakpoint!==null){if(targetBreakpoint!==_.activeBreakpoint||forceUpdate){_.activeBreakpoint=targetBreakpoint;if(_.breakpointSettings[targetBreakpoint]==="unslick"){_.unslick(targetBreakpoint)}else{_.options=$.extend({},_.originalSettings,_.breakpointSettings[targetBreakpoint]);if(initial===true){_.currentSlide=_.options.initialSlide}_.refresh(initial)}triggerBreakpoint=targetBreakpoint}}else{_.activeBreakpoint=targetBreakpoint;if(_.breakpointSettings[targetBreakpoint]==="unslick"){_.unslick(targetBreakpoint)}else{_.options=$.extend({},_.originalSettings,_.breakpointSettings[targetBreakpoint]);if(initial===true){_.currentSlide=_.options.initialSlide}_.refresh(initial)}triggerBreakpoint=targetBreakpoint}}else{if(_.activeBreakpoint!==null){_.activeBreakpoint=null;_.options=_.originalSettings;if(initial===true){_.currentSlide=_.options.initialSlide}_.refresh(initial);triggerBreakpoint=targetBreakpoint}}
// only trigger breakpoints during an actual break. not on initialize.
if(!initial&&triggerBreakpoint!==false){_.$slider.trigger("breakpoint",[_,triggerBreakpoint])}}};Slick.prototype.changeSlide=function(event,dontAnimate){var _=this,$target=$(event.currentTarget),indexOffset,slideOffset,unevenOffset;
// If target is a link, prevent default action.
if($target.is("a")){event.preventDefault()}
// If target is not the <li> element (ie: a child), find the <li>.
if(!$target.is("li")){$target=$target.closest("li")}unevenOffset=_.slideCount%_.options.slidesToScroll!==0;indexOffset=unevenOffset?0:(_.slideCount-_.currentSlide)%_.options.slidesToScroll;switch(event.data.message){case"previous":slideOffset=indexOffset===0?_.options.slidesToScroll:_.options.slidesToShow-indexOffset;if(_.slideCount>_.options.slidesToShow){_.slideHandler(_.currentSlide-slideOffset,false,dontAnimate)}break;case"next":slideOffset=indexOffset===0?_.options.slidesToScroll:indexOffset;if(_.slideCount>_.options.slidesToShow){_.slideHandler(_.currentSlide+slideOffset,false,dontAnimate)}break;case"index":var index=event.data.index===0?0:event.data.index||$target.index()*_.options.slidesToScroll;_.slideHandler(_.checkNavigable(index),false,dontAnimate);$target.children().trigger("focus");break;default:return}};Slick.prototype.checkNavigable=function(index){var _=this,navigables,prevNavigable;navigables=_.getNavigableIndexes();prevNavigable=0;if(index>navigables[navigables.length-1]){index=navigables[navigables.length-1]}else{for(var n in navigables){if(index<navigables[n]){index=prevNavigable;break}prevNavigable=navigables[n]}}return index};Slick.prototype.cleanUpEvents=function(){var _=this;if(_.options.dots&&_.$dots!==null){$("li",_.$dots).off("click.slick",_.changeSlide).off("mouseenter.slick",$.proxy(_.interrupt,_,true)).off("mouseleave.slick",$.proxy(_.interrupt,_,false));if(_.options.accessibility===true){_.$dots.off("keydown.slick",_.keyHandler)}}_.$slider.off("focus.slick blur.slick");if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow&&_.$prevArrow.off("click.slick",_.changeSlide);_.$nextArrow&&_.$nextArrow.off("click.slick",_.changeSlide);if(_.options.accessibility===true){_.$prevArrow&&_.$prevArrow.off("keydown.slick",_.keyHandler);_.$nextArrow&&_.$nextArrow.off("keydown.slick",_.keyHandler)}}_.$list.off("touchstart.slick mousedown.slick",_.swipeHandler);_.$list.off("touchmove.slick mousemove.slick",_.swipeHandler);_.$list.off("touchend.slick mouseup.slick",_.swipeHandler);_.$list.off("touchcancel.slick mouseleave.slick",_.swipeHandler);_.$list.off("click.slick",_.clickHandler);$(document).off(_.visibilityChange,_.visibility);_.cleanUpSlideEvents();if(_.options.accessibility===true){_.$list.off("keydown.slick",_.keyHandler)}if(_.options.focusOnSelect===true){$(_.$slideTrack).children().off("click.slick",_.selectHandler)}$(window).off("orientationchange.slick.slick-"+_.instanceUid,_.orientationChange);$(window).off("resize.slick.slick-"+_.instanceUid,_.resize);$("[draggable!=true]",_.$slideTrack).off("dragstart",_.preventDefault);$(window).off("load.slick.slick-"+_.instanceUid,_.setPosition)};Slick.prototype.cleanUpSlideEvents=function(){var _=this;_.$list.off("mouseenter.slick",$.proxy(_.interrupt,_,true));_.$list.off("mouseleave.slick",$.proxy(_.interrupt,_,false))};Slick.prototype.cleanUpRows=function(){var _=this,originalSlides;if(_.options.rows>1){originalSlides=_.$slides.children().children();originalSlides.removeAttr("style");_.$slider.empty().append(originalSlides)}};Slick.prototype.clickHandler=function(event){var _=this;if(_.shouldClick===false){event.stopImmediatePropagation();event.stopPropagation();event.preventDefault()}};Slick.prototype.destroy=function(refresh){var _=this;_.autoPlayClear();_.touchObject={};_.cleanUpEvents();$(".slick-cloned",_.$slider).detach();if(_.$dots){_.$dots.remove()}if(_.$prevArrow&&_.$prevArrow.length){_.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display","");if(_.htmlExpr.test(_.options.prevArrow)){_.$prevArrow.remove()}}if(_.$nextArrow&&_.$nextArrow.length){_.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display","");if(_.htmlExpr.test(_.options.nextArrow)){_.$nextArrow.remove()}}if(_.$slides){_.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){$(this).attr("style",$(this).data("originalStyling"))});_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.detach();_.$list.detach();_.$slider.append(_.$slides)}_.cleanUpRows();_.$slider.removeClass("slick-slider");_.$slider.removeClass("slick-initialized");_.$slider.removeClass("slick-dotted");_.unslicked=true;if(!refresh){_.$slider.trigger("destroy",[_])}};Slick.prototype.disableTransition=function(slide){var _=this,transition={};transition[_.transitionType]="";if(_.options.fade===false){_.$slideTrack.css(transition)}else{_.$slides.eq(slide).css(transition)}};Slick.prototype.fadeSlide=function(slideIndex,callback){var _=this;if(_.cssTransitions===false){_.$slides.eq(slideIndex).css({zIndex:_.options.zIndex});_.$slides.eq(slideIndex).animate({opacity:1},_.options.speed,_.options.easing,callback)}else{_.applyTransition(slideIndex);_.$slides.eq(slideIndex).css({opacity:1,zIndex:_.options.zIndex});if(callback){setTimeout(function(){_.disableTransition(slideIndex);callback.call()},_.options.speed)}}};Slick.prototype.fadeSlideOut=function(slideIndex){var _=this;if(_.cssTransitions===false){_.$slides.eq(slideIndex).animate({opacity:0,zIndex:_.options.zIndex-2},_.options.speed,_.options.easing)}else{_.applyTransition(slideIndex);_.$slides.eq(slideIndex).css({opacity:0,zIndex:_.options.zIndex-2})}};Slick.prototype.filterSlides=Slick.prototype.slickFilter=function(filter){var _=this;if(filter!==null){_.$slidesCache=_.$slides;_.unload();_.$slideTrack.children(this.options.slide).detach();_.$slidesCache.filter(filter).appendTo(_.$slideTrack);_.reinit()}};Slick.prototype.focusHandler=function(){var _=this;_.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(event){event.stopImmediatePropagation();var $sf=$(this);setTimeout(function(){if(_.options.pauseOnFocus){_.focussed=$sf.is(":focus");_.autoPlay()}},0)})};Slick.prototype.getCurrent=Slick.prototype.slickCurrentSlide=function(){var _=this;return _.currentSlide};Slick.prototype.getDotCount=function(){var _=this;var breakPoint=0;var counter=0;var pagerQty=0;if(_.options.infinite===true){if(_.slideCount<=_.options.slidesToShow){++pagerQty}else{while(breakPoint<_.slideCount){++pagerQty;breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow}}}else if(_.options.centerMode===true){pagerQty=_.slideCount}else if(!_.options.asNavFor){pagerQty=1+Math.ceil((_.slideCount-_.options.slidesToShow)/_.options.slidesToScroll)}else{while(breakPoint<_.slideCount){++pagerQty;breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow}}return pagerQty-1};Slick.prototype.getLeft=function(slideIndex){var _=this,targetLeft,verticalHeight,verticalOffset=0,targetSlide,coef;_.slideOffset=0;verticalHeight=_.$slides.first().outerHeight(true);if(_.options.infinite===true){if(_.slideCount>_.options.slidesToShow){_.slideOffset=_.slideWidth*_.options.slidesToShow*-1;coef=-1;if(_.options.vertical===true&&_.options.centerMode===true){if(_.options.slidesToShow===2){coef=-1.5}else if(_.options.slidesToShow===1){coef=-2}}verticalOffset=verticalHeight*_.options.slidesToShow*coef}if(_.slideCount%_.options.slidesToScroll!==0){if(slideIndex+_.options.slidesToScroll>_.slideCount&&_.slideCount>_.options.slidesToShow){if(slideIndex>_.slideCount){_.slideOffset=(_.options.slidesToShow-(slideIndex-_.slideCount))*_.slideWidth*-1;verticalOffset=(_.options.slidesToShow-(slideIndex-_.slideCount))*verticalHeight*-1}else{_.slideOffset=_.slideCount%_.options.slidesToScroll*_.slideWidth*-1;verticalOffset=_.slideCount%_.options.slidesToScroll*verticalHeight*-1}}}}else{if(slideIndex+_.options.slidesToShow>_.slideCount){_.slideOffset=(slideIndex+_.options.slidesToShow-_.slideCount)*_.slideWidth;verticalOffset=(slideIndex+_.options.slidesToShow-_.slideCount)*verticalHeight}}if(_.slideCount<=_.options.slidesToShow){_.slideOffset=0;verticalOffset=0}if(_.options.centerMode===true&&_.slideCount<=_.options.slidesToShow){_.slideOffset=_.slideWidth*Math.floor(_.options.slidesToShow)/2-_.slideWidth*_.slideCount/2}else if(_.options.centerMode===true&&_.options.infinite===true){_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2)-_.slideWidth}else if(_.options.centerMode===true){_.slideOffset=0;_.slideOffset+=_.slideWidth*Math.floor(_.options.slidesToShow/2)}if(_.options.vertical===false){targetLeft=slideIndex*_.slideWidth*-1+_.slideOffset}else{targetLeft=slideIndex*verticalHeight*-1+verticalOffset}if(_.options.variableWidth===true){if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){targetSlide=_.$slideTrack.children(".slick-slide").eq(slideIndex)}else{targetSlide=_.$slideTrack.children(".slick-slide").eq(slideIndex+_.options.slidesToShow)}if(_.options.rtl===true){if(targetSlide[0]){targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1}else{targetLeft=0}}else{targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0}if(_.options.centerMode===true){if(_.slideCount<=_.options.slidesToShow||_.options.infinite===false){targetSlide=_.$slideTrack.children(".slick-slide").eq(slideIndex)}else{targetSlide=_.$slideTrack.children(".slick-slide").eq(slideIndex+_.options.slidesToShow+1)}if(_.options.rtl===true){if(targetSlide[0]){targetLeft=(_.$slideTrack.width()-targetSlide[0].offsetLeft-targetSlide.width())*-1}else{targetLeft=0}}else{targetLeft=targetSlide[0]?targetSlide[0].offsetLeft*-1:0}targetLeft+=(_.$list.width()-targetSlide.outerWidth())/2}}return targetLeft};Slick.prototype.getOption=Slick.prototype.slickGetOption=function(option){var _=this;return _.options[option]};Slick.prototype.getNavigableIndexes=function(){var _=this,breakPoint=0,counter=0,indexes=[],max;if(_.options.infinite===false){max=_.slideCount}else{breakPoint=_.options.slidesToScroll*-1;counter=_.options.slidesToScroll*-1;max=_.slideCount*2}while(breakPoint<max){indexes.push(breakPoint);breakPoint=counter+_.options.slidesToScroll;counter+=_.options.slidesToScroll<=_.options.slidesToShow?_.options.slidesToScroll:_.options.slidesToShow}return indexes};Slick.prototype.getSlick=function(){return this};Slick.prototype.getSlideCount=function(){var _=this,slidesTraversed,swipedSlide,centerOffset;centerOffset=_.options.centerMode===true?_.slideWidth*Math.floor(_.options.slidesToShow/2):0;if(_.options.swipeToSlide===true){_.$slideTrack.find(".slick-slide").each(function(index,slide){if(slide.offsetLeft-centerOffset+$(slide).outerWidth()/2>_.swipeLeft*-1){swipedSlide=slide;return false}});slidesTraversed=Math.abs($(swipedSlide).attr("data-slick-index")-_.currentSlide)||1;return slidesTraversed}else{return _.options.slidesToScroll}};Slick.prototype.goTo=Slick.prototype.slickGoTo=function(slide,dontAnimate){var _=this;_.changeSlide({data:{message:"index",index:parseInt(slide)}},dontAnimate)};Slick.prototype.init=function(creation){var _=this;if(!$(_.$slider).hasClass("slick-initialized")){$(_.$slider).addClass("slick-initialized");_.buildRows();_.buildOut();_.setProps();_.startLoad();_.loadSlider();_.initializeEvents();_.updateArrows();_.updateDots();_.checkResponsive(true);_.focusHandler()}if(creation){_.$slider.trigger("init",[_])}if(_.options.accessibility===true){_.initADA()}if(_.options.autoplay){_.paused=false;_.autoPlay()}};Slick.prototype.initADA=function(){var _=this,numDotGroups=Math.ceil(_.slideCount/_.options.slidesToShow),tabControlIndexes=_.getNavigableIndexes().filter(function(val){return val>=0&&val<_.slideCount});_.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"});if(_.$dots!==null){_.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function(i){var slideControlIndex=tabControlIndexes.indexOf(i);$(this).attr({role:"tabpanel",id:"slick-slide"+_.instanceUid+i,tabindex:-1});if(slideControlIndex!==-1){$(this).attr({"aria-describedby":"slick-slide-control"+_.instanceUid+slideControlIndex})}});_.$dots.attr("role","tablist").find("li").each(function(i){var mappedSlideIndex=tabControlIndexes[i];$(this).attr({role:"presentation"});$(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+_.instanceUid+i,"aria-controls":"slick-slide"+_.instanceUid+mappedSlideIndex,"aria-label":i+1+" of "+numDotGroups,"aria-selected":null,tabindex:"-1"})}).eq(_.currentSlide).find("button").attr({"aria-selected":"true"}).removeAttr("tabindex").end()}for(var i=_.currentSlide,max=i+_.options.slidesToShow;i<max;i++){_.$slides.eq(i).removeAttr("tabindex")}_.activateADA()};Slick.prototype.initArrowEvents=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},_.changeSlide);_.$nextArrow.off("click.slick").on("click.slick",{message:"next"},_.changeSlide);if(_.options.accessibility===true){_.$prevArrow.on("keydown.slick",_.keyHandler);_.$nextArrow.on("keydown.slick",_.keyHandler)}}};Slick.prototype.initDotEvents=function(){var _=this;if(_.options.dots===true){$("li",_.$dots).on("click.slick",{message:"index"},_.changeSlide);if(_.options.accessibility===true){_.$dots.on("keydown.slick",_.keyHandler)}}if(_.options.dots===true&&_.options.pauseOnDotsHover===true){$("li",_.$dots).on("mouseenter.slick",$.proxy(_.interrupt,_,true)).on("mouseleave.slick",$.proxy(_.interrupt,_,false))}};Slick.prototype.initSlideEvents=function(){var _=this;if(_.options.pauseOnHover){_.$list.on("mouseenter.slick",$.proxy(_.interrupt,_,true));_.$list.on("mouseleave.slick",$.proxy(_.interrupt,_,false))}};Slick.prototype.initializeEvents=function(){var _=this;_.initArrowEvents();_.initDotEvents();_.initSlideEvents();_.$list.on("touchstart.slick mousedown.slick",{action:"start"},_.swipeHandler);_.$list.on("touchmove.slick mousemove.slick",{action:"move"},_.swipeHandler);_.$list.on("touchend.slick mouseup.slick",{action:"end"},_.swipeHandler);_.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},_.swipeHandler);_.$list.on("click.slick",_.clickHandler);$(document).on(_.visibilityChange,$.proxy(_.visibility,_));if(_.options.accessibility===true){_.$list.on("keydown.slick",_.keyHandler)}if(_.options.focusOnSelect===true){$(_.$slideTrack).children().on("click.slick",_.selectHandler)}$(window).on("orientationchange.slick.slick-"+_.instanceUid,$.proxy(_.orientationChange,_));$(window).on("resize.slick.slick-"+_.instanceUid,$.proxy(_.resize,_));$("[draggable!=true]",_.$slideTrack).on("dragstart",_.preventDefault);$(window).on("load.slick.slick-"+_.instanceUid,_.setPosition);$(_.setPosition)};Slick.prototype.initUI=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.show();_.$nextArrow.show()}if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){_.$dots.show()}};Slick.prototype.keyHandler=function(event){var _=this;
//Dont slide if the cursor is inside the form fields and arrow keys are pressed
if(!event.target.tagName.match("TEXTAREA|INPUT|SELECT")){if(event.keyCode===37&&_.options.accessibility===true){_.changeSlide({data:{message:_.options.rtl===true?"next":"previous"}})}else if(event.keyCode===39&&_.options.accessibility===true){_.changeSlide({data:{message:_.options.rtl===true?"previous":"next"}})}}};Slick.prototype.lazyLoad=function(){var _=this,loadRange,cloneRange,rangeStart,rangeEnd;function loadImages(imagesScope){$("img[data-lazy]",imagesScope).each(function(){var image=$(this),imageSource=$(this).attr("data-lazy"),imageSrcSet=$(this).attr("data-srcset"),imageSizes=$(this).attr("data-sizes")||_.$slider.attr("data-sizes"),imageToLoad=document.createElement("img");imageToLoad.onload=function(){image.animate({opacity:0},100,function(){if(imageSrcSet){image.attr("srcset",imageSrcSet);if(imageSizes){image.attr("sizes",imageSizes)}}image.attr("src",imageSource).animate({opacity:1},200,function(){image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")});_.$slider.trigger("lazyLoaded",[_,image,imageSource])})};imageToLoad.onerror=function(){image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");_.$slider.trigger("lazyLoadError",[_,image,imageSource])};imageToLoad.src=imageSource})}if(_.options.centerMode===true){if(_.options.infinite===true){rangeStart=_.currentSlide+(_.options.slidesToShow/2+1);rangeEnd=rangeStart+_.options.slidesToShow+2}else{rangeStart=Math.max(0,_.currentSlide-(_.options.slidesToShow/2+1));rangeEnd=2+(_.options.slidesToShow/2+1)+_.currentSlide}}else{rangeStart=_.options.infinite?_.options.slidesToShow+_.currentSlide:_.currentSlide;rangeEnd=Math.ceil(rangeStart+_.options.slidesToShow);if(_.options.fade===true){if(rangeStart>0)rangeStart--;if(rangeEnd<=_.slideCount)rangeEnd++}}loadRange=_.$slider.find(".slick-slide").slice(rangeStart,rangeEnd);if(_.options.lazyLoad==="anticipated"){var prevSlide=rangeStart-1,nextSlide=rangeEnd,$slides=_.$slider.find(".slick-slide");for(var i=0;i<_.options.slidesToScroll;i++){if(prevSlide<0)prevSlide=_.slideCount-1;loadRange=loadRange.add($slides.eq(prevSlide));loadRange=loadRange.add($slides.eq(nextSlide));prevSlide--;nextSlide++}}loadImages(loadRange);if(_.slideCount<=_.options.slidesToShow){cloneRange=_.$slider.find(".slick-slide");loadImages(cloneRange)}else if(_.currentSlide>=_.slideCount-_.options.slidesToShow){cloneRange=_.$slider.find(".slick-cloned").slice(0,_.options.slidesToShow);loadImages(cloneRange)}else if(_.currentSlide===0){cloneRange=_.$slider.find(".slick-cloned").slice(_.options.slidesToShow*-1);loadImages(cloneRange)}};Slick.prototype.loadSlider=function(){var _=this;_.setPosition();_.$slideTrack.css({opacity:1});_.$slider.removeClass("slick-loading");_.initUI();if(_.options.lazyLoad==="progressive"){_.progressiveLazyLoad()}};Slick.prototype.next=Slick.prototype.slickNext=function(){var _=this;_.changeSlide({data:{message:"next"}})};Slick.prototype.orientationChange=function(){var _=this;_.checkResponsive();_.setPosition()};Slick.prototype.pause=Slick.prototype.slickPause=function(){var _=this;_.autoPlayClear();_.paused=true};Slick.prototype.play=Slick.prototype.slickPlay=function(){var _=this;_.autoPlay();_.options.autoplay=true;_.paused=false;_.focussed=false;_.interrupted=false};Slick.prototype.postSlide=function(index){var _=this;if(!_.unslicked){_.$slider.trigger("afterChange",[_,index]);_.animating=false;if(_.slideCount>_.options.slidesToShow){_.setPosition()}_.swipeLeft=null;if(_.options.autoplay){_.autoPlay()}if(_.options.accessibility===true){_.initADA();if(_.options.focusOnChange){var $currentSlide=$(_.$slides.get(_.currentSlide));$currentSlide.attr("tabindex",0).focus()}}}};Slick.prototype.prev=Slick.prototype.slickPrev=function(){var _=this;_.changeSlide({data:{message:"previous"}})};Slick.prototype.preventDefault=function(event){event.preventDefault()};Slick.prototype.progressiveLazyLoad=function(tryCount){tryCount=tryCount||1;var _=this,$imgsToLoad=$("img[data-lazy]",_.$slider),image,imageSource,imageSrcSet,imageSizes,imageToLoad;if($imgsToLoad.length){image=$imgsToLoad.first();imageSource=image.attr("data-lazy");imageSrcSet=image.attr("data-srcset");imageSizes=image.attr("data-sizes")||_.$slider.attr("data-sizes");imageToLoad=document.createElement("img");imageToLoad.onload=function(){if(imageSrcSet){image.attr("srcset",imageSrcSet);if(imageSizes){image.attr("sizes",imageSizes)}}image.attr("src",imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");if(_.options.adaptiveHeight===true){_.setPosition()}_.$slider.trigger("lazyLoaded",[_,image,imageSource]);_.progressiveLazyLoad()};imageToLoad.onerror=function(){if(tryCount<3){/**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
setTimeout(function(){_.progressiveLazyLoad(tryCount+1)},500)}else{image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");_.$slider.trigger("lazyLoadError",[_,image,imageSource]);_.progressiveLazyLoad()}};imageToLoad.src=imageSource}else{_.$slider.trigger("allImagesLoaded",[_])}};Slick.prototype.refresh=function(initializing){var _=this,currentSlide,lastVisibleIndex;lastVisibleIndex=_.slideCount-_.options.slidesToShow;
// in non-infinite sliders, we don't want to go past the
// last visible index.
if(!_.options.infinite&&_.currentSlide>lastVisibleIndex){_.currentSlide=lastVisibleIndex}
// if less slides than to show, go to start.
if(_.slideCount<=_.options.slidesToShow){_.currentSlide=0}currentSlide=_.currentSlide;_.destroy(true);$.extend(_,_.initials,{currentSlide:currentSlide});_.init();if(!initializing){_.changeSlide({data:{message:"index",index:currentSlide}},false)}};Slick.prototype.registerBreakpoints=function(){var _=this,breakpoint,currentBreakpoint,l,responsiveSettings=_.options.responsive||null;if($.type(responsiveSettings)==="array"&&responsiveSettings.length){_.respondTo=_.options.respondTo||"window";for(breakpoint in responsiveSettings){l=_.breakpoints.length-1;if(responsiveSettings.hasOwnProperty(breakpoint)){currentBreakpoint=responsiveSettings[breakpoint].breakpoint;
// loop through the breakpoints and cut out any existing
// ones with the same breakpoint number, we don't want dupes.
while(l>=0){if(_.breakpoints[l]&&_.breakpoints[l]===currentBreakpoint){_.breakpoints.splice(l,1)}l--}_.breakpoints.push(currentBreakpoint);_.breakpointSettings[currentBreakpoint]=responsiveSettings[breakpoint].settings}}_.breakpoints.sort(function(a,b){return _.options.mobileFirst?a-b:b-a})}};Slick.prototype.reinit=function(){var _=this;_.$slides=_.$slideTrack.children(_.options.slide).addClass("slick-slide");_.slideCount=_.$slides.length;if(_.currentSlide>=_.slideCount&&_.currentSlide!==0){_.currentSlide=_.currentSlide-_.options.slidesToScroll}if(_.slideCount<=_.options.slidesToShow){_.currentSlide=0}_.registerBreakpoints();_.setProps();_.setupInfinite();_.buildArrows();_.updateArrows();_.initArrowEvents();_.buildDots();_.updateDots();_.initDotEvents();_.cleanUpSlideEvents();_.initSlideEvents();_.checkResponsive(false,true);if(_.options.focusOnSelect===true){$(_.$slideTrack).children().on("click.slick",_.selectHandler)}_.setSlideClasses(typeof _.currentSlide==="number"?_.currentSlide:0);_.setPosition();_.focusHandler();_.paused=!_.options.autoplay;_.autoPlay();_.$slider.trigger("reInit",[_])};Slick.prototype.resize=function(){var _=this;if($(window).width()!==_.windowWidth){clearTimeout(_.windowDelay);_.windowDelay=window.setTimeout(function(){_.windowWidth=$(window).width();_.checkResponsive();if(!_.unslicked){_.setPosition()}},50)}};Slick.prototype.removeSlide=Slick.prototype.slickRemove=function(index,removeBefore,removeAll){var _=this;if(typeof index==="boolean"){removeBefore=index;index=removeBefore===true?0:_.slideCount-1}else{index=removeBefore===true?--index:index}if(_.slideCount<1||index<0||index>_.slideCount-1){return false}_.unload();if(removeAll===true){_.$slideTrack.children().remove()}else{_.$slideTrack.children(this.options.slide).eq(index).remove()}_.$slides=_.$slideTrack.children(this.options.slide);_.$slideTrack.children(this.options.slide).detach();_.$slideTrack.append(_.$slides);_.$slidesCache=_.$slides;_.reinit()};Slick.prototype.setCSS=function(position){var _=this,positionProps={},x,y;if(_.options.rtl===true){position=-position}x=_.positionProp=="left"?Math.ceil(position)+"px":"0px";y=_.positionProp=="top"?Math.ceil(position)+"px":"0px";positionProps[_.positionProp]=position;if(_.transformsEnabled===false){_.$slideTrack.css(positionProps)}else{positionProps={};if(_.cssTransitions===false){positionProps[_.animType]="translate("+x+", "+y+")";_.$slideTrack.css(positionProps)}else{positionProps[_.animType]="translate3d("+x+", "+y+", 0px)";_.$slideTrack.css(positionProps)}}};Slick.prototype.setDimensions=function(){var _=this;if(_.options.vertical===false){if(_.options.centerMode===true){_.$list.css({padding:"0px "+_.options.centerPadding})}}else{_.$list.height(_.$slides.first().outerHeight(true)*_.options.slidesToShow);if(_.options.centerMode===true){_.$list.css({padding:_.options.centerPadding+" 0px"})}}_.listWidth=_.$list.width();_.listHeight=_.$list.height();if(_.options.vertical===false&&_.options.variableWidth===false){_.slideWidth=Math.ceil(_.listWidth/_.options.slidesToShow);_.$slideTrack.width(Math.ceil(_.slideWidth*_.$slideTrack.children(".slick-slide").length))}else if(_.options.variableWidth===true){_.$slideTrack.width(5e3*_.slideCount)}else{_.slideWidth=Math.ceil(_.listWidth);_.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true)*_.$slideTrack.children(".slick-slide").length))}var offset=_.$slides.first().outerWidth(true)-_.$slides.first().width();if(_.options.variableWidth===false)_.$slideTrack.children(".slick-slide").width(_.slideWidth-offset)};Slick.prototype.setFade=function(){var _=this,targetLeft;_.$slides.each(function(index,element){targetLeft=_.slideWidth*index*-1;if(_.options.rtl===true){$(element).css({position:"relative",right:targetLeft,top:0,zIndex:_.options.zIndex-2,opacity:0})}else{$(element).css({position:"relative",left:targetLeft,top:0,zIndex:_.options.zIndex-2,opacity:0})}});_.$slides.eq(_.currentSlide).css({zIndex:_.options.zIndex-1,opacity:1})};Slick.prototype.setHeight=function(){var _=this;if(_.options.slidesToShow===1&&_.options.adaptiveHeight===true&&_.options.vertical===false){var targetHeight=_.$slides.eq(_.currentSlide).outerHeight(true);_.$list.css("height",targetHeight)}};Slick.prototype.setOption=Slick.prototype.slickSetOption=function(){/**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */
var _=this,l,item,option,value,refresh=false,type;if($.type(arguments[0])==="object"){option=arguments[0];refresh=arguments[1];type="multiple"}else if($.type(arguments[0])==="string"){option=arguments[0];value=arguments[1];refresh=arguments[2];if(arguments[0]==="responsive"&&$.type(arguments[1])==="array"){type="responsive"}else if(typeof arguments[1]!=="undefined"){type="single"}}if(type==="single"){_.options[option]=value}else if(type==="multiple"){$.each(option,function(opt,val){_.options[opt]=val})}else if(type==="responsive"){for(item in value){if($.type(_.options.responsive)!=="array"){_.options.responsive=[value[item]]}else{l=_.options.responsive.length-1;
// loop through the responsive object and splice out duplicates.
while(l>=0){if(_.options.responsive[l].breakpoint===value[item].breakpoint){_.options.responsive.splice(l,1)}l--}_.options.responsive.push(value[item])}}}if(refresh){_.unload();_.reinit()}};Slick.prototype.setPosition=function(){var _=this;_.setDimensions();_.setHeight();if(_.options.fade===false){_.setCSS(_.getLeft(_.currentSlide))}else{_.setFade()}_.$slider.trigger("setPosition",[_])};Slick.prototype.setProps=function(){var _=this,bodyStyle=document.body.style;_.positionProp=_.options.vertical===true?"top":"left";if(_.positionProp==="top"){_.$slider.addClass("slick-vertical")}else{_.$slider.removeClass("slick-vertical")}if(bodyStyle.WebkitTransition!==undefined||bodyStyle.MozTransition!==undefined||bodyStyle.msTransition!==undefined){if(_.options.useCSS===true){_.cssTransitions=true}}if(_.options.fade){if(typeof _.options.zIndex==="number"){if(_.options.zIndex<3){_.options.zIndex=3}}else{_.options.zIndex=_.defaults.zIndex}}if(bodyStyle.OTransform!==undefined){_.animType="OTransform";_.transformType="-o-transform";_.transitionType="OTransition";if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false}if(bodyStyle.MozTransform!==undefined){_.animType="MozTransform";_.transformType="-moz-transform";_.transitionType="MozTransition";if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.MozPerspective===undefined)_.animType=false}if(bodyStyle.webkitTransform!==undefined){_.animType="webkitTransform";_.transformType="-webkit-transform";_.transitionType="webkitTransition";if(bodyStyle.perspectiveProperty===undefined&&bodyStyle.webkitPerspective===undefined)_.animType=false}if(bodyStyle.msTransform!==undefined){_.animType="msTransform";_.transformType="-ms-transform";_.transitionType="msTransition";if(bodyStyle.msTransform===undefined)_.animType=false}if(bodyStyle.transform!==undefined&&_.animType!==false){_.animType="transform";_.transformType="transform";_.transitionType="transition"}_.transformsEnabled=_.options.useTransform&&(_.animType!==null&&_.animType!==false)};Slick.prototype.setSlideClasses=function(index){var _=this,centerOffset,allSlides,indexOffset,remainder;allSlides=_.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true");_.$slides.eq(index).addClass("slick-current");if(_.options.centerMode===true){var evenCoef=_.options.slidesToShow%2===0?1:0;centerOffset=Math.floor(_.options.slidesToShow/2);if(_.options.infinite===true){if(index>=centerOffset&&index<=_.slideCount-1-centerOffset){_.$slides.slice(index-centerOffset+evenCoef,index+centerOffset+1).addClass("slick-active").attr("aria-hidden","false")}else{indexOffset=_.options.slidesToShow+index;allSlides.slice(indexOffset-centerOffset+1+evenCoef,indexOffset+centerOffset+2).addClass("slick-active").attr("aria-hidden","false")}if(index===0){allSlides.eq(allSlides.length-1-_.options.slidesToShow).addClass("slick-center")}else if(index===_.slideCount-1){allSlides.eq(_.options.slidesToShow).addClass("slick-center")}}_.$slides.eq(index).addClass("slick-center")}else{if(index>=0&&index<=_.slideCount-_.options.slidesToShow){_.$slides.slice(index,index+_.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")}else if(allSlides.length<=_.options.slidesToShow){allSlides.addClass("slick-active").attr("aria-hidden","false")}else{remainder=_.slideCount%_.options.slidesToShow;indexOffset=_.options.infinite===true?_.options.slidesToShow+index:index;if(_.options.slidesToShow==_.options.slidesToScroll&&_.slideCount-index<_.options.slidesToShow){allSlides.slice(indexOffset-(_.options.slidesToShow-remainder),indexOffset+remainder).addClass("slick-active").attr("aria-hidden","false")}else{allSlides.slice(indexOffset,indexOffset+_.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")}}}if(_.options.lazyLoad==="ondemand"||_.options.lazyLoad==="anticipated"){_.lazyLoad()}};Slick.prototype.setupInfinite=function(){var _=this,i,slideIndex,infiniteCount;if(_.options.fade===true){_.options.centerMode=false}if(_.options.infinite===true&&_.options.fade===false){slideIndex=null;if(_.slideCount>_.options.slidesToShow){if(_.options.centerMode===true){infiniteCount=_.options.slidesToShow+1}else{infiniteCount=_.options.slidesToShow}for(i=_.slideCount;i>_.slideCount-infiniteCount;i-=1){slideIndex=i-1;$(_.$slides[slideIndex]).clone(true).attr("id","").attr("data-slick-index",slideIndex-_.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned")}for(i=0;i<infiniteCount+_.slideCount;i+=1){slideIndex=i;$(_.$slides[slideIndex]).clone(true).attr("id","").attr("data-slick-index",slideIndex+_.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned")}_.$slideTrack.find(".slick-cloned").find("[id]").each(function(){$(this).attr("id","")})}}};Slick.prototype.interrupt=function(toggle){var _=this;if(!toggle){_.autoPlay()}_.interrupted=toggle};Slick.prototype.selectHandler=function(event){var _=this;var targetElement=$(event.target).is(".slick-slide")?$(event.target):$(event.target).parents(".slick-slide");var index=parseInt(targetElement.attr("data-slick-index"));if(!index)index=0;if(_.slideCount<=_.options.slidesToShow){_.slideHandler(index,false,true);return}_.slideHandler(index)};Slick.prototype.slideHandler=function(index,sync,dontAnimate){var targetSlide,animSlide,oldSlide,slideLeft,targetLeft=null,_=this,navTarget;sync=sync||false;if(_.animating===true&&_.options.waitForAnimate===true){return}if(_.options.fade===true&&_.currentSlide===index){return}if(sync===false){_.asNavFor(index)}targetSlide=index;targetLeft=_.getLeft(targetSlide);slideLeft=_.getLeft(_.currentSlide);_.currentLeft=_.swipeLeft===null?slideLeft:_.swipeLeft;if(_.options.infinite===false&&_.options.centerMode===false&&(index<0||index>_.getDotCount()*_.options.slidesToScroll)){if(_.options.fade===false){targetSlide=_.currentSlide;if(dontAnimate!==true){_.animateSlide(slideLeft,function(){_.postSlide(targetSlide)})}else{_.postSlide(targetSlide)}}return}else if(_.options.infinite===false&&_.options.centerMode===true&&(index<0||index>_.slideCount-_.options.slidesToScroll)){if(_.options.fade===false){targetSlide=_.currentSlide;if(dontAnimate!==true){_.animateSlide(slideLeft,function(){_.postSlide(targetSlide)})}else{_.postSlide(targetSlide)}}return}if(_.options.autoplay){clearInterval(_.autoPlayTimer)}if(targetSlide<0){if(_.slideCount%_.options.slidesToScroll!==0){animSlide=_.slideCount-_.slideCount%_.options.slidesToScroll}else{animSlide=_.slideCount+targetSlide}}else if(targetSlide>=_.slideCount){if(_.slideCount%_.options.slidesToScroll!==0){animSlide=0}else{animSlide=targetSlide-_.slideCount}}else{animSlide=targetSlide}_.animating=true;_.$slider.trigger("beforeChange",[_,_.currentSlide,animSlide]);oldSlide=_.currentSlide;_.currentSlide=animSlide;_.setSlideClasses(_.currentSlide);if(_.options.asNavFor){navTarget=_.getNavTarget();navTarget=navTarget.slick("getSlick");if(navTarget.slideCount<=navTarget.options.slidesToShow){navTarget.setSlideClasses(_.currentSlide)}}_.updateDots();_.updateArrows();if(_.options.fade===true){if(dontAnimate!==true){_.fadeSlideOut(oldSlide);_.fadeSlide(animSlide,function(){_.postSlide(animSlide)})}else{_.postSlide(animSlide)}_.animateHeight();return}if(dontAnimate!==true){_.animateSlide(targetLeft,function(){_.postSlide(animSlide)})}else{_.postSlide(animSlide)}};Slick.prototype.startLoad=function(){var _=this;if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow){_.$prevArrow.hide();_.$nextArrow.hide()}if(_.options.dots===true&&_.slideCount>_.options.slidesToShow){_.$dots.hide()}_.$slider.addClass("slick-loading")};Slick.prototype.swipeDirection=function(){var xDist,yDist,r,swipeAngle,_=this;xDist=_.touchObject.startX-_.touchObject.curX;yDist=_.touchObject.startY-_.touchObject.curY;r=Math.atan2(yDist,xDist);swipeAngle=Math.round(r*180/Math.PI);if(swipeAngle<0){swipeAngle=360-Math.abs(swipeAngle)}if(swipeAngle<=45&&swipeAngle>=0){return _.options.rtl===false?"left":"right"}if(swipeAngle<=360&&swipeAngle>=315){return _.options.rtl===false?"left":"right"}if(swipeAngle>=135&&swipeAngle<=225){return _.options.rtl===false?"right":"left"}if(_.options.verticalSwiping===true){if(swipeAngle>=35&&swipeAngle<=135){return"down"}else{return"up"}}return"vertical"};Slick.prototype.swipeEnd=function(event){var _=this,slideCount,direction;_.dragging=false;_.swiping=false;if(_.scrolling){_.scrolling=false;return false}_.interrupted=false;_.shouldClick=_.touchObject.swipeLength>10?false:true;if(_.touchObject.curX===undefined){return false}if(_.touchObject.edgeHit===true){_.$slider.trigger("edge",[_,_.swipeDirection()])}if(_.touchObject.swipeLength>=_.touchObject.minSwipe){direction=_.swipeDirection();switch(direction){case"left":case"down":slideCount=_.options.swipeToSlide?_.checkNavigable(_.currentSlide+_.getSlideCount()):_.currentSlide+_.getSlideCount();_.currentDirection=0;break;case"right":case"up":slideCount=_.options.swipeToSlide?_.checkNavigable(_.currentSlide-_.getSlideCount()):_.currentSlide-_.getSlideCount();_.currentDirection=1;break;default:}if(direction!="vertical"){_.slideHandler(slideCount);_.touchObject={};_.$slider.trigger("swipe",[_,direction])}}else{if(_.touchObject.startX!==_.touchObject.curX){_.slideHandler(_.currentSlide);_.touchObject={}}}};Slick.prototype.swipeHandler=function(event){var _=this;if(_.options.swipe===false||"ontouchend"in document&&_.options.swipe===false){return}else if(_.options.draggable===false&&event.type.indexOf("mouse")!==-1){return}_.touchObject.fingerCount=event.originalEvent&&event.originalEvent.touches!==undefined?event.originalEvent.touches.length:1;_.touchObject.minSwipe=_.listWidth/_.options.touchThreshold;if(_.options.verticalSwiping===true){_.touchObject.minSwipe=_.listHeight/_.options.touchThreshold}switch(event.data.action){case"start":_.swipeStart(event);break;case"move":_.swipeMove(event);break;case"end":_.swipeEnd(event);break}};Slick.prototype.swipeMove=function(event){var _=this,edgeWasHit=false,curLeft,swipeDirection,swipeLength,positionOffset,touches,verticalSwipeLength;touches=event.originalEvent!==undefined?event.originalEvent.touches:null;if(!_.dragging||_.scrolling||touches&&touches.length!==1){return false}curLeft=_.getLeft(_.currentSlide);_.touchObject.curX=touches!==undefined?touches[0].pageX:event.clientX;_.touchObject.curY=touches!==undefined?touches[0].pageY:event.clientY;_.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curX-_.touchObject.startX,2)));verticalSwipeLength=Math.round(Math.sqrt(Math.pow(_.touchObject.curY-_.touchObject.startY,2)));if(!_.options.verticalSwiping&&!_.swiping&&verticalSwipeLength>4){_.scrolling=true;return false}if(_.options.verticalSwiping===true){_.touchObject.swipeLength=verticalSwipeLength}swipeDirection=_.swipeDirection();if(event.originalEvent!==undefined&&_.touchObject.swipeLength>4){_.swiping=true;event.preventDefault()}positionOffset=(_.options.rtl===false?1:-1)*(_.touchObject.curX>_.touchObject.startX?1:-1);if(_.options.verticalSwiping===true){positionOffset=_.touchObject.curY>_.touchObject.startY?1:-1}swipeLength=_.touchObject.swipeLength;_.touchObject.edgeHit=false;if(_.options.infinite===false){if(_.currentSlide===0&&swipeDirection==="right"||_.currentSlide>=_.getDotCount()&&swipeDirection==="left"){swipeLength=_.touchObject.swipeLength*_.options.edgeFriction;_.touchObject.edgeHit=true}}if(_.options.vertical===false){_.swipeLeft=curLeft+swipeLength*positionOffset}else{_.swipeLeft=curLeft+swipeLength*(_.$list.height()/_.listWidth)*positionOffset}if(_.options.verticalSwiping===true){_.swipeLeft=curLeft+swipeLength*positionOffset}if(_.options.fade===true||_.options.touchMove===false){return false}if(_.animating===true){_.swipeLeft=null;return false}_.setCSS(_.swipeLeft)};Slick.prototype.swipeStart=function(event){var _=this,touches;_.interrupted=true;if(_.touchObject.fingerCount!==1||_.slideCount<=_.options.slidesToShow){_.touchObject={};return false}if(event.originalEvent!==undefined&&event.originalEvent.touches!==undefined){touches=event.originalEvent.touches[0]}_.touchObject.startX=_.touchObject.curX=touches!==undefined?touches.pageX:event.clientX;_.touchObject.startY=_.touchObject.curY=touches!==undefined?touches.pageY:event.clientY;_.dragging=true};Slick.prototype.unfilterSlides=Slick.prototype.slickUnfilter=function(){var _=this;if(_.$slidesCache!==null){_.unload();_.$slideTrack.children(this.options.slide).detach();_.$slidesCache.appendTo(_.$slideTrack);_.reinit()}};Slick.prototype.unload=function(){var _=this;$(".slick-cloned",_.$slider).remove();if(_.$dots){_.$dots.remove()}if(_.$prevArrow&&_.htmlExpr.test(_.options.prevArrow)){_.$prevArrow.remove()}if(_.$nextArrow&&_.htmlExpr.test(_.options.nextArrow)){_.$nextArrow.remove()}_.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")};Slick.prototype.unslick=function(fromBreakpoint){var _=this;_.$slider.trigger("unslick",[_,fromBreakpoint]);_.destroy()};Slick.prototype.updateArrows=function(){var _=this,centerOffset;centerOffset=Math.floor(_.options.slidesToShow/2);if(_.options.arrows===true&&_.slideCount>_.options.slidesToShow&&!_.options.infinite){_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false");_.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false");if(_.currentSlide===0){_.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true");_.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")}else if(_.currentSlide>=_.slideCount-_.options.slidesToShow&&_.options.centerMode===false){_.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true");_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")}else if(_.currentSlide>=_.slideCount-1&&_.options.centerMode===true){_.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true");_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")}}};Slick.prototype.updateDots=function(){var _=this;if(_.$dots!==null){_.$dots.find("li").removeClass("slick-active").end();_.$dots.find("li").eq(Math.floor(_.currentSlide/_.options.slidesToScroll)).addClass("slick-active")}};Slick.prototype.visibility=function(){var _=this;if(_.options.autoplay){if(document[_.hidden]){_.interrupted=true}else{_.interrupted=false}}};$.fn.slick=function(){var _=this,opt=arguments[0],args=Array.prototype.slice.call(arguments,1),l=_.length,i,ret;for(i=0;i<l;i++){if(typeof opt=="object"||typeof opt=="undefined")_[i].slick=new Slick(_[i],opt);else ret=_[i].slick[opt].apply(_[i].slick,args);if(typeof ret!="undefined")return ret}return _}});/* Nav Accordion Plugin v1.1
************************************/
(function($){$.fn.navAccordion=function(options,callback){this.each(function(){
//Options
var settings=$.extend({expandButtonText:"+",//Text inside of expand button
collapseButtonText:"-",//Text inside of collapse button
selectedExpand:"true",//Expand the selected channel
selectedClass:"selected",//Class that will be used to detect the currently selected channel - this will check the "parentElement" for this class (the parent <li> by default)
multipleLevels:"true",//Apply accordion to all levels - setting this to false will apply the accordion only to the first level
buttonWidth:"20%",//Width of accordion expand/collapse button as a percentage or pixels
buttonPosition:"right",//Position of button - 'right' is default - you can also choose 'left'
slideSpeed:"fast",//Speed of slide animation - "fast", "slow", or number in milliseconds such as 500
parentElement:"li",//Parent element type, class or ID - you don't need to change this if you're using a ul > li > ul pattern
childElement:"ul",//Child element type, class or ID - you don't need to change this if you're using a ul > li > ul pattern
headersOnly:false,//False is default - setting to true will make any link with sub-nav behave as if it were set to header only, making the link inaccessible - this option is useful if you are using the plugin for a non-navigation area 
headersOnlyCheck:false,// False is default - set to true to apply the accordion only to links that are set as "header only" (have no href)
delayLink:false,//Delay following the href of links until after the accordion the has expanded
delayAmount:null},options);var container=this,
//Multiple levels variable
multi=settings.multipleLevels?"":" > "+settings.childElement+" > ";
//Add class to container
$(container).addClass("accordion-nav");
//Apply has-subnav class to lis with uls - also add accordion buttons with styles
$(multi+settings.parentElement,container).each(function(){if($(this).contents(settings.childElement).length>0&&settings.headersOnlyCheck===false||!$("> a",this).attr("href")&&settings.headersOnlyCheck===true){
//Apply Class and styles to parent item
$(this).addClass("has-subnav").attr("aria-expanded","false").css("position","relative").find(">a").css("margin-"+settings.buttonPosition,settings.buttonWidth);
//Add expand button elements
$(" > "+settings.childElement,this).before('<button class="accordion-btn-wrap"><span class="accordion-btn accordion-collapsed">'+settings.expandButtonText+'</span><span class="accordion-btn accordion-expanded">'+settings.collapseButtonText+"</span></button>");
//Apply Styles to expand button
$(".accordion-btn-wrap",this).css({width:settings.buttonWidth,position:"absolute",top:0,"text-align":"center",cursor:"pointer",display:"inline-block"}).css(settings.buttonPosition,0).attr("tabindex","0").attr("aria-expanded","false");$(".accordion-btn ",this).css({display:"inline-block",width:"100%"});$(".accordion-expanded",this).css("display","none")}
//Apply styles to <a> tags that are set to header only
if(!$("> a",this).attr("href")||settings.headersOnly){$(this).addClass("accordion-header-only").find(".accordion-btn-wrap").css({width:"100%","text-align":settings.buttonPosition}).find(".accordion-btn ").css({width:settings.buttonWidth,"text-align":"center"})}
//Delay Link Mode
if(settings.delayLink&&!settings.headersOnly){var currentThis=this,speed=settings.delayAmount!==null?settings.delayAmount:settings.slideSpeed;if(speed=="fast"){speed=200}else if(speed=="slow"){speed=600}$("> a",currentThis).on("click",function(e){if(!$("> .accordion-btn-wrap",currentThis).hasClass("accordion-active")){e.preventDefault();var href=$(this).attr("href");clickToggle($("> .accordion-btn-wrap",currentThis));
//Go to link after delay
setTimeout(function(){window.location=href},speed)}})}});var selectedNavAccordion=$(settings.parentElement+"."+settings.selectedClass+" > .accordion-btn-wrap",container);
//Debounced Button height event listener
var buttonheightResize=debounce(function(){
//Run button height
buttonheight();
//Expand Selected Channel
expandSelected()},250);$(window).on("resize",buttonheightResize);
//Set button heights
buttonheight();
//Expand Selected Channel
expandSelected();
//On click function
$(container).on("click",".accordion-btn-wrap",function(e){e.preventDefault();clickToggle(this)});
// accessibilty for return on accordion buttons
$(".accordion-btn-wrap").unbind().keypress(function(e){if(e.which===13){e.preventDefault();clickToggle(this)}});
//Callback
if(typeof callback=="function"){callback()}/* Functions 
			*******************************/
//Click Toggle function
function clickToggle(element){var nextChild=$(element).next(settings.childElement),currentExpandBtn=$(".accordion-expanded",element),currentCollapseBtn=$(".accordion-collapsed",element),parentObj=$(element).closest(settings.parentElement);if(nextChild.is(":visible")){nextChild.slideUp(settings.slideSpeed).attr("aria-hidden","true");$(element).removeClass("accordion-active").attr("aria-expanded","false");currentExpandBtn.css("display","none");currentCollapseBtn.css("display","inline-block");parentObj.add(parentObj.siblings(".active")).add(parentObj.find(".active")).removeClass("active")}else{$(element).closest(settings.childElement).find(".accordion-active").removeClass("accordion-active").attr("aria-expanded","false").next(settings.childElement).slideUp(settings.slideSpeed).prev().find(".accordion-expanded").css("display","none").parent().find(".accordion-collapsed").css("display","inline-block");parentObj.add(parentObj.siblings(".active")).add(parentObj.find(".active")).removeClass("active");$(element).addClass("accordion-active").attr("aria-expanded","true");nextChild.slideToggle(settings.slideSpeed).attr("aria-hidden","false");currentExpandBtn.css("display","inline-block");currentCollapseBtn.css("display","none");parentObj.addClass("active")}}
//Expand Selected Channel Function
function expandSelected(){if(settings.selectedExpand){if(!settings.headersOnlyCheck){selectedNavAccordion.find(".accordion-expanded").css("display","inline-block");selectedNavAccordion.find(".accordion-collapsed").css("display","none");selectedNavAccordion.addClass("accordion-active").attr("aria-expanded","true").next(settings.childElement).css("display","block").attr("aria-hidden","false");selectedNavAccordion.closest(settings.parentElement).addClass("active").attr("aria-expanded","true")}else{$(settings.parentElement+"."+settings.selectedClass+" > "+settings.childElement,container).css("display","block").attr("aria-hidden","false");$(settings.parentElement+"."+settings.selectedClass).addClass("active").attr("aria-expanded","true")}}}
//Accordion Button Height Function
function buttonheight(){$(".accordion-btn",container).each(function(){
//Show uls so heights are calculated correctly
$(settings.parentElement+".has-subnav > "+settings.childElement,container).css("display","block");
//Calculate and set heights
var parentItem=$(this).closest(settings.parentElement),lineheight=$("> a",parentItem).innerHeight();$(this).css({"line-height":lineheight+"px",height:lineheight});
//Hide uls under lis and reset expand/collapse buttons
$(settings.parentElement+(settings.headersOnlyCheck?" ":".has-subnav > ")+settings.childElement,container).css("display","none");$(".accordion-expanded").css("display","none");$(".accordion-collapsed").css("display","inline-block")})}
//Debounce function
function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args)}}})}})(jQuery);(function(w){"use strict";var utils={};utils.classes={hiddenVisually:"u-hidden-visually",modifier:"--",isActive:"is-active",isClosed:"is-closed",isOpen:"is-open",isClicked:"is-clicked",isAnimating:"is-animating",isVisible:"is-visible",hidden:"u-hidden"};utils.keyCodes={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38};/**
	 * a11yclick
	 * Slightly modified from: http://www.karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility/
	 */
utils.a11yclick=function(event){var code=event.charCode||event.keyCode,type=event.type;if(type==="click"){return true}else if(type==="keydown"){if(code===utils.keyCodes.SPACE||code===utils.keyCodes.ENTER){return true}}else{return false}};utils.a11yclickBind=function(el,callback,name){el.on("click."+name+" keydown."+name,function(event){if(w.utils.a11yclick(event)){event.preventDefault(event);if(callback&&typeof callback==="function"){callback.call()}el.trigger("clicked."+name)}})};utils.doc=w.document;utils.supportTransition=Modernizr.csstransitions;utils.supportAnimations=Modernizr.cssanimations;utils.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};utils.animEndEventNames={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd",animation:"animationend"};utils.transEndEventName=utils.transEndEventNames[Modernizr.prefixed("transition")];utils.animEndEventName=utils.animEndEventNames[Modernizr.prefixed("animation")];utils.onEndTransition=function(el,callback){var onEndCallbackFn=function(ev){if(utils.supportTransition){if(ev.target!=this)return;this.removeEventListener(utils.transEndEventName,onEndCallbackFn)}if(callback&&typeof callback==="function"){callback.call()}};if(utils.supportTransition){el.addEventListener(utils.transEndEventName,onEndCallbackFn)}else{onEndCallbackFn()}};utils.onEndAnimation=function(el,callback){var onEndCallbackFn=function(ev){if(utils.supportAnimations){if(ev.target!=this)return;this.removeEventListener(utils.animEndEventName,onEndCallbackFn)}if(callback&&typeof callback==="function"){callback.call()}};if(utils.supportAnimations){el.addEventListener(utils.animEndEventName,onEndCallbackFn)}else{onEndCallbackFn()}};utils.createModifierClass=function(cl,modifier){return cl+utils.classes.modifier+modifier};utils.cssModifiers=function(modifiers,cssClasses,baseClass){var arr=modifiers.split(",");for(var i=0,l=arr.length;i<l;i++){cssClasses.push(utils.createModifierClass(baseClass,arr[i]))}};utils.getMetaOptions=function(el,name,metadata){var dataAttr="data-"+name;var dataOptionsAttr=dataAttr+"-options";var attr=el.getAttribute(dataAttr)||el.getAttribute(dataOptionsAttr);try{return attr&&JSON.parse(attr)||{}}catch(error){
// log error, do not initialize
if(console){console.error("Error parsing "+dataAttr+" on "+el.className+": "+error)}return}};
// polyfill raf if needed
var raf=function(callback){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}();utils.raf=function(callback){raf(callback)};
// expose global utils
w.utils=utils})(this);/*
 * TrapTabKey
 * Based on https://github.com/gdkraus/accessible-modal-dialog/blob/master/modal-window.js
 * Copyright (c) 2016 Vasileios Mitsaras.
 * Licensed under MIT
 */
(function(w,$){"use strict";var name="trab-tab",componentName=name+"-component";w.componentNamespace=w.componentNamespace||{};var TrapTabKey=w.componentNamespace.TrapTabKey=function(element,options){if(!element){throw new Error("Element required to initialize object")}
// assign element for method events
this.element=element;this.$element=$(element);
// Options
options=options||{};this.options=$.extend({},this.defaults,options)};TrapTabKey.prototype.init=function(){if(this.$element.data(componentName)){return}this.$element.data(componentName,this)};TrapTabKey.prototype.bindTrap=function(){var self=this;this.$element.on("keydown."+name,function(e){self._trapTabKey(self.$element,e)})};TrapTabKey.prototype.unbindTrap=function(){this.$element.off("keydown."+name)};TrapTabKey.prototype.giveFocus=function(){var self=this,opts=self.options;
// get list of all children elements in given object
var o=self.$element.find("*");
// set the focus to the first keyboard focusable item
o.filter(opts.focusableElementsString).filter(":visible").first().focus()};TrapTabKey.prototype._trapTabKey=function(obj,evt){var self=this,opts=self.options;
// if tab or shift-tab pressed
if(evt.which==9){
// get list of all children elements in given object
var o=obj.find("*");
// get list of focusable items
var focusableItems;focusableItems=o.filter(opts.focusableElementsString).filter(":visible");
// get currently focused item
var focusedItem;focusedItem=jQuery(":focus");
// get the number of focusable items
var numberOfFocusableItems;numberOfFocusableItems=focusableItems.length;
// get the index of the currently focused item
var focusedItemIndex;focusedItemIndex=focusableItems.index(focusedItem);if(evt.shiftKey){
//back tab
// if focused on first item and user preses back-tab, go to the last focusable item
if(focusedItemIndex==0){focusableItems.get(numberOfFocusableItems-1).focus();evt.preventDefault()}}else{
//forward tab
// if focused on the last item and user preses tab, go to the first focusable item
if(focusedItemIndex==numberOfFocusableItems-1){focusableItems.get(0).focus();evt.preventDefault()}}}};TrapTabKey.prototype.defaults={focusableElementsString:"a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"};TrapTabKey.defaults=TrapTabKey.prototype.defaults})(this,jQuery);(function(w,$){"use strict";var name="button",componentName=name+"-component",utils=w.utils,cl={iconOnly:"icon-only",withIcon:"icon",toggleState:"toggle-state",showHide:"visible-on-active"};w.componentNamespace=w.componentNamespace||{};var Button=w.componentNamespace.Button=function(element,options){if(!element){throw new Error("Element required to initialize object")}
// assign element for method events
this.element=element;this.$element=$(element);
// Options
this.options=options=options||{};this.metadata=utils.getMetaOptions(this.element,name);this.options=$.extend({},this.defaults,this.metadata,options)};Button.prototype.init=function(){if(this.$element.data(componentName)){return}this.$element.data(componentName,this);this.hasTitle=!!this.$element.attr("title");this.$element.trigger("beforecreate."+name);this.isPressed=false;this._create()};Button.prototype._create=function(){var options=this.options,buttonClasses=[options.baseClass],buttonTextClasses=[options.baseClass+"__text"];if(options.label===null){options.label=this.$element.html()}if(options.wrapText){this.$buttonText=$("<span></span>").html(options.label).appendTo(this.$element.empty())}if(options.icon){this.$buttonIcon=$("<span class='"+options.iconFamily+" "+utils.createModifierClass(options.iconFamily,options.icon)+"'></span>").prependTo(this.$element);buttonClasses.push(utils.createModifierClass(options.baseClass,cl.withIcon));if(options.iconActive){options.toggle=true;this.$buttonIconActive=$("<span class='"+options.iconFamily+" "+utils.createModifierClass(options.iconFamily,options.iconActive)+" "+utils.createModifierClass(options.iconFamily,cl.showHide)+"'></span>").insertAfter(this.$buttonIcon);buttonClasses.push(utils.createModifierClass(options.baseClass,cl.toggleState))}if(options.hideText){buttonTextClasses.push(utils.classes.hiddenVisually);buttonClasses.push(utils.createModifierClass(options.baseClass,cl.iconOnly))}}if(options.modifiers){utils.cssModifiers(options.modifiers,buttonClasses,options.baseClass)}if(options.wrapText){this.$buttonText.addClass(buttonTextClasses.join(" "))}if(options.textActive&&options.wrapText){options.toggle=true;buttonTextClasses.push(utils.createModifierClass(options.baseClass+"__text",cl.showHide));buttonClasses.push(utils.createModifierClass(options.baseClass,cl.toggleState));this.$buttonTextActive=$("<span></span>").addClass(buttonTextClasses.join(" ")).html(options.textActive).insertAfter(this.$buttonText);this.$element.attr("aria-live","polite")}this.$element.addClass(buttonClasses.join(" "));if(options.role){this.$element.attr("role",options.role)}if(options.controls){this.controls(options.controls)}if(options.pressed){this._isPressed(options.pressed)}if(options.expanded){this.isPressed=true;this._isExpanded(options.expanded)}if(!this.hasTitle&&options.hideText&&!options.hideTitle){this.$element.attr("title",this.$element.text())}if(options.ripple&&w.componentNamespace.Ripple){new w.componentNamespace.Ripple(this.element).init()}this.$element.trigger("create."+name)};Button.prototype._isPressed=function(state){this.isPressed=state;this.$element.attr("aria-pressed",state)[state?"addClass":"removeClass"](utils.classes.isActive)};Button.prototype._isExpanded=function(state){this._isPressed(state);this.$element.attr("aria-expanded",state)};Button.prototype.controls=function(el){this.$element.attr("aria-controls",el)};Button.prototype.defaults={baseClass:"c-button",role:"button",label:null,modifiers:null,controls:null,textActive:null,wrapText:true,hideText:false,hideTitle:false,icon:null,iconActive:null,iconFamily:"o-icon",iconPosition:null,pressed:false,expanded:false,ripple:false};Button.defaults=Button.prototype.defaults})(this,jQuery);(function(w,$){"use strict";var pluginName="jsButton",initSelector=".js-button";$.fn[pluginName]=function(){return this.each(function(){new w.componentNamespace.Button(this).init()})};
// auto-init on enhance (which is called on domready)
$(document).bind("enhance",function(e){$($(e.target).is(initSelector)&&e.target).add(initSelector,e.target).filter(initSelector)[pluginName]()})})(this,jQuery);(function(w,$){"use strict";var name="offcanvas",componentName=name+"-component",utils=w.utils,doc=w.document;w.componentNamespace=w.componentNamespace||{};var Offcanvas=w.componentNamespace.Offcanvas=function(element,options){if(!element){throw new Error("Element required to initialize object")}
// assign element for method events
this.element=element;this.$element=$(element);
// Options
this.options=options=options||{};this.metadata=utils.getMetaOptions(this.element,name);this.options=$.extend({},this.defaults,this.metadata,options);this.isOpen=false;this.onOpen=this.options.onOpen;this.onClose=this.options.onClose;this.onInit=this.options.onInit};Offcanvas.prototype.init=function(){if(this.$element.data(componentName)){return}this.$element.data(componentName,this);this.$element.trigger("beforecreate."+name);this._addAttributes();this._initTrigger();this._createModal();this._trapTabKey();this._closeButton();if(this.onInit&&typeof this.onInit==="function"){this.onInit.call(this.element)}this.$element.trigger("create."+name)};Offcanvas.prototype._addAttributes=function(){var options=this.options,panelClasses=[options.baseClass,utils.classes.isClosed],panelAttr={tabindex:"-1","aria-hidden":!this.isOpen};if(options.role){panelAttr.role=options.role}if(!w.utils.supportTransition){panelClasses.push(utils.createModifierClass(options.baseClass,options.supportNoTransitionsClass))}utils.cssModifiers(options.modifiers,panelClasses,options.baseClass);this.$element.attr(panelAttr).addClass(panelClasses.join(" "));
// Content-wrap
this.$content=$("."+options.contentClass);this._contentOpenClasses=[];utils.cssModifiers(options.modifiers,this._contentOpenClasses,options.contentClass);
// Modal
this._modalOpenClasses=[options.modalClass,utils.classes.isClosed];utils.cssModifiers(options.modifiers,this._modalOpenClasses,options.modalClass);
// body
this._bodyOpenClasses=[options.bodyModifierClass+"--visible"];utils.cssModifiers(options.modifiers,this._bodyOpenClasses,options.bodyModifierClass);if(options.modifiers.toLowerCase().indexOf("reveal")>=0){this.transitionElement=this.$content[0]}else{this.transitionElement=this.element}};Offcanvas.prototype._createModal=function(){var self=this,target=self.$element.parent();if(this.options.modal){this.$modal=$("<div></div>").on("mousedown."+name,function(){self.close()}).appendTo(target);this.$modal.addClass(this._modalOpenClasses.join(" "))}};Offcanvas.prototype._trapTabKey=function(){this.trapTabKey=new w.componentNamespace.TrapTabKey(this.element);this.trapTabKey.init()};Offcanvas.prototype._trapTabEscKey=function(){var self=this;
// close on ESC
$(doc).on("keyup."+name,function(ev){var keyCode=ev.keyCode||ev.which;if(keyCode===utils.keyCodes.ESCAPE&&self.isOpen){if($("input").is(":focus")){return}self.close()}})};Offcanvas.prototype._closeButton=function(){var self=this,options=self.options;function closeOffcanvas(){self.close()}this.$closeBtn=this.$element.find("."+options.closeButtonClass);if(this.$closeBtn.length){this.closeBtn=new w.componentNamespace.Button(this.$closeBtn[0]);this.closeBtn.init();this.closeBtn.controls(this.$element.attr("id"));utils.a11yclickBind(this.$closeBtn,closeOffcanvas,name)}};Offcanvas.prototype.open=function(){var self=this,options=self.options;if(!this.isOpen){if(options.resize){this.resize()}if(!this.$trigger){this.$trigger=this.$element.data(componentName+"-trigger")}if(doc.activeElement){this.lastFocus=doc.activeElement}this.isOpen=true;$("body").addClass(this._bodyOpenClasses.join(" "));this._addClasses(this.$element,this.isOpen,true);this._addClasses(this.$content,this.isOpen,true);if(options.modal){this._addClasses(this.$modal,this.isOpen,true)}this.$element.attr("aria-hidden","false").addClass(utils.createModifierClass(options.baseClass,"opening"));this.$content.addClass(this._contentOpenClasses.join(" "));
// Transition End Callback
utils.onEndTransition(this.transitionElement,function(){self.trapTabKey.giveFocus();self.trapTabKey.bindTrap();self._addClasses(self.$element,self.isOpen,false);self._addClasses(self.$content,self.isOpen,false);if(options.modal){self._addClasses(self.$modal,self.isOpen,false)}self.$element.removeClass(utils.createModifierClass(options.baseClass,"opening"))});if(this.$trigger){this.$trigger.button._isExpanded(true)}
// callback on open
//options.onOpen( this );
if(this.onOpen&&typeof this.onOpen==="function"){this.onOpen.call(this.$element)}this.$element.trigger("open."+name);
// close on ESC
this._trapTabEscKey()}};Offcanvas.prototype.close=function(){var self=this;if(!this.isOpen){return}this.isOpen=false;this._addClasses(this.$element,this.isOpen,true);this._addClasses(this.$content,this.isOpen,true);if(this.options.modal){this._addClasses(this.$modal,this.isOpen,true)}this.$element.attr("aria-hidden","true");this.trapTabKey.unbindTrap();if(self.$trigger){self.$trigger.button._isExpanded(false)}utils.onEndTransition(this.transitionElement,function(){self._addClasses(self.$element,self.isOpen,false);self._addClasses(self.$content,self.isOpen,false);if(self.options.modal){self._addClasses(self.$modal,self.isOpen,false)}self.$content.removeClass(self._contentOpenClasses.join(" "));$("body").removeClass(self._bodyOpenClasses.join(" "));if(self.lastFocus){self.lastFocus.focus()}});
// callback onClose
//options.onClose( this );
if(this.onClose&&typeof this.onClose==="function"){this.onClose.call(this.element)}this.$element.trigger("close."+name);$(doc).off("keyup."+name);$(window).off("."+name)};Offcanvas.prototype._addClasses=function(el,isOpen,beforeTransition){if(isOpen){if(beforeTransition){el.removeClass(utils.classes.isClosed).addClass(utils.classes.isAnimating).addClass(utils.classes.isOpen)}else{el.removeClass(utils.classes.isAnimating)}}else{if(beforeTransition){el.removeClass(utils.classes.isOpen).addClass(utils.classes.isAnimating)}else{el.addClass(utils.classes.isClosed).removeClass(utils.classes.isAnimating)}}};Offcanvas.prototype.toggle=function(){this[this.isOpen?"close":"open"]()};Offcanvas.prototype.resize=function(){var self=this,ticking;function update(){ticking=false}function requestTick(){if(!ticking){utils.raf(update)}ticking=true}function onResize(){requestTick();self.$element.trigger("resizing."+name);self.close()}$(window).on("resize."+name+" orientationchange."+name,onResize)};Offcanvas.prototype._initTrigger=function(){var self=this,options=self.options,offcanvasID=this.$element.attr("id"),att="data-offcanvas-trigger",$triggerButton;if(!options.triggerButton){$triggerButton=$("["+att+"='"+offcanvasID+"']")}else{$triggerButton=$(options.triggerButton)}new w.componentNamespace.OffcanvasTrigger($triggerButton[0],{offcanvas:offcanvasID}).init()};Offcanvas.prototype.setButton=function(trigger){this.$element.data(componentName+"-trigger",trigger)};Offcanvas.prototype.defaults={role:"dialog",modifiers:"left,overlay",baseClass:"c-offcanvas",modalClass:"c-offcanvas-bg",contentClass:"c-offcanvas-content-wrap",closeButtonClass:"js-offcanvas-close",bodyModifierClass:"has-offcanvas",supportNoTransitionsClass:"support-no-transitions",resize:true,triggerButton:null,modal:true,onOpen:null,onClose:null,onInit:null};Offcanvas.defaults=Offcanvas.prototype.defaults})(this,jQuery);(function(w,$){"use strict";var pluginName="offcanvas",initSelector=".js-"+pluginName;$.fn[pluginName]=function(options){return this.each(function(){new w.componentNamespace.Offcanvas(this,options).init()})};
// auto-init on enhance (which is called on domready)
$(w.document).on("enhance",function(e){$($(e.target).is(initSelector)&&e.target).add(initSelector,e.target).filter(initSelector)[pluginName]()})})(this,jQuery);(function(w,$){"use strict";var name="offcanvas-trigger",componentName=name+"-component",utils=w.utils;w.componentNamespace=w.componentNamespace||{};var OffcanvasTrigger=w.componentNamespace.OffcanvasTrigger=function(element,options){if(!element){throw new Error("Trigger Element required to initialize object")}
// assign element for method events
this.element=element;this.$element=$(element);
// Options
this.options=options=options||{};this.options=$.extend({},this.defaults,options)};OffcanvasTrigger.prototype.init=function(){if(this.$element.data(componentName)){return}this.$element.data(componentName,this);this._create()};OffcanvasTrigger.prototype._create=function(){this.options.offcanvas=this.options.offcanvas||this.$element.attr("data-offcanvas-trigger");this.$offcanvas=$("#"+this.options.offcanvas);this.offcanvas=this.$offcanvas.data("offcanvas-component");if(!this.offcanvas){throw new Error("Offcanvas Element not found")}this.button=new w.componentNamespace.Button(this.element);this.button.init();this.button.controls(this.options.offcanvas);this.button._isExpanded(false);this._bindbehavior()};OffcanvasTrigger.prototype._bindbehavior=function(){var self=this;this.offcanvas.setButton(self);function toggleOffcanvas(){self.offcanvas.toggle()}utils.a11yclickBind(this.$element,toggleOffcanvas,name)};OffcanvasTrigger.prototype.defaults={offcanvas:null}})(this,jQuery);(function(w,$){"use strict";var pluginName="offcanvasTrigger",initSelector="[data-offcanvas-trigger],.js-"+pluginName;$.fn[pluginName]=function(options){return this.each(function(){new w.componentNamespace.OffcanvasTrigger(this,options).init()})};
// auto-init on enhance (which is called on domready)
$(w.document).on("enhance",function(e){$($(e.target).is(initSelector)&&e.target).add(initSelector,e.target).filter(initSelector)[pluginName]()})})(this,jQuery);