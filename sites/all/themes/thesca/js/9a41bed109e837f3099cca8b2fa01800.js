/**
 * @preserve HTML5 Shiv v3.6.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 */
;(function(window, document) {
  /*jshint evil:true */
  /** version */
  var version = '3.6.2';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
      var a = document.createElement('a');
      a.innerHTML = '<xyz></xyz>';
      //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
      supportsHtml5Styles = ('hidden' in a);

      supportsUnknownElements = a.childNodes.length == 1 || (function() {
        // assign a false positive if unable to shiv
        (document.createElement)('a');
        var frag = document.createDocumentFragment();
        return (
          typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
      }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
      parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
      data = {};
      expanID++;
      ownerDocument[expando] = expanID;
      expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if(supportsUnknownElements){
      return ownerDocument.createElement(nodeName);
    }
    if (!data) {
      data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
      node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
      node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
      node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if(supportsUnknownElements){
      return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
      i = 0,
      elems = getElements(),
      l = elems.length;
    for(;i<l;i++){
      clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
      data.cache = {};
      data.createElem = ownerDocument.createElement;
      data.createFrag = ownerDocument.createDocumentFragment;
      data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
        return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
      // unroll the `createElement` calls
      getElements().join().replace(/\w+/g, function(nodeName) {
        data.createElem(nodeName);
        data.frag.createElement(nodeName);
        return 'c("' + nodeName + '")';
      }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
          // adds styling not present in IE6/7/8/9
          'mark{background:#FF0;color:#000}' +
          // hides non-rendered elements
          'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

}(this, document));
;
/**
 * @preserve HTML5 Shiv v3.6.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 */
;(function(window, document) {
  /*jshint evil:true */
  /** version */
  var version = '3.6.2';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
      var a = document.createElement('a');
      a.innerHTML = '<xyz></xyz>';
      //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
      supportsHtml5Styles = ('hidden' in a);

      supportsUnknownElements = a.childNodes.length == 1 || (function() {
        // assign a false positive if unable to shiv
        (document.createElement)('a');
        var frag = document.createDocumentFragment();
        return (
          typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
      }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
      parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
      data = {};
      expanID++;
      ownerDocument[expando] = expanID;
      expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if(supportsUnknownElements){
      return ownerDocument.createElement(nodeName);
    }
    if (!data) {
      data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
      node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
      node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
      node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if(supportsUnknownElements){
      return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
      i = 0,
      elems = getElements(),
      l = elems.length;
    for(;i<l;i++){
      clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
      data.cache = {};
      data.createElem = ownerDocument.createElement;
      data.createFrag = ownerDocument.createDocumentFragment;
      data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
        return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
      // unroll the `createElement` calls
      getElements().join().replace(/\w+/g, function(nodeName) {
        data.createElem(nodeName);
        data.frag.createElement(nodeName);
        return 'c("' + nodeName + '")';
      }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
          // adds styling not present in IE6/7/8/9
          'mark{background:#FF0;color:#000}' +
          // hides non-rendered elements
          'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  /*------------------------------- Print Shiv -------------------------------*/

  /** Used to filter media types */
  var reMedia = /^$|\b(?:all|print)\b/;

  /** Used to namespace printable elements */
  var shivNamespace = 'html5shiv';

  /** Detect whether the browser supports shivable style sheets */
  var supportsShivableSheets = !supportsUnknownElements && (function() {
    // assign a false negative if unable to shiv
    var docEl = document.documentElement;
    return !(
      typeof document.namespaces == 'undefined' ||
        typeof document.parentWindow == 'undefined' ||
        typeof docEl.applyElement == 'undefined' ||
        typeof docEl.removeNode == 'undefined' ||
        typeof window.attachEvent == 'undefined'
      );
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps all HTML5 elements in the given document with printable elements.
   * (eg. the "header" element is wrapped with the "html5shiv:header" element)
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Array} An array wrappers added.
   */
  function addWrappers(ownerDocument) {
    var node,
      nodes = ownerDocument.getElementsByTagName('*'),
      index = nodes.length,
      reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
      result = [];

    while (index--) {
      node = nodes[index];
      if (reElements.test(node.nodeName)) {
        result.push(node.applyElement(createWrapper(node)));
      }
    }
    return result;
  }

  /**
   * Creates a printable wrapper for the given element.
   * @private
   * @param {Element} element The element.
   * @returns {Element} The wrapper.
   */
  function createWrapper(element) {
    var node,
      nodes = element.attributes,
      index = nodes.length,
      wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);

    // copy element attributes to the wrapper
    while (index--) {
      node = nodes[index];
      node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
    }
    // copy element styles to the wrapper
    wrapper.style.cssText = element.style.cssText;
    return wrapper;
  }

  /**
   * Shivs the given CSS text.
   * (eg. header{} becomes html5shiv\:header{})
   * @private
   * @param {String} cssText The CSS text to shiv.
   * @returns {String} The shived CSS text.
   */
  function shivCssText(cssText) {
    var pair,
      parts = cssText.split('{'),
      index = parts.length,
      reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
      replacement = '$1' + shivNamespace + '\\:$2';

    while (index--) {
      pair = parts[index] = parts[index].split('}');
      pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
      parts[index] = pair.join('}');
    }
    return parts.join('{');
  }

  /**
   * Removes the given wrappers, leaving the original elements.
   * @private
   * @params {Array} wrappers An array of printable wrappers.
   */
  function removeWrappers(wrappers) {
    var index = wrappers.length;
    while (index--) {
      wrappers[index].removeNode();
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document for print.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivPrint(ownerDocument) {
    var shivedSheet,
      wrappers,
      data = getExpandoData(ownerDocument),
      namespaces = ownerDocument.namespaces,
      ownerWindow = ownerDocument.parentWindow;

    if (!supportsShivableSheets || ownerDocument.printShived) {
      return ownerDocument;
    }
    if (typeof namespaces[shivNamespace] == 'undefined') {
      namespaces.add(shivNamespace);
    }

    function removeSheet() {
      clearTimeout(data._removeSheetTimer);
      if (shivedSheet) {
        shivedSheet.removeNode(true);
      }
      shivedSheet= null;
    }

    ownerWindow.attachEvent('onbeforeprint', function() {

      removeSheet();

      var imports,
        length,
        sheet,
        collection = ownerDocument.styleSheets,
        cssText = [],
        index = collection.length,
        sheets = Array(index);

      // convert styleSheets collection to an array
      while (index--) {
        sheets[index] = collection[index];
      }
      // concat all style sheet CSS text
      while ((sheet = sheets.pop())) {
        // IE does not enforce a same origin policy for external style sheets...
        // but has trouble with some dynamically created stylesheets
        if (!sheet.disabled && reMedia.test(sheet.media)) {

          try {
            imports = sheet.imports;
            length = imports.length;
          } catch(er){
            length = 0;
          }

          for (index = 0; index < length; index++) {
            sheets.push(imports[index]);
          }

          try {
            cssText.push(sheet.cssText);
          } catch(er){}
        }
      }

      // wrap all HTML5 elements with printable elements and add the shived style sheet
      cssText = shivCssText(cssText.reverse().join(''));
      wrappers = addWrappers(ownerDocument);
      shivedSheet = addStyleSheet(ownerDocument, cssText);

    });

    ownerWindow.attachEvent('onafterprint', function() {
      // remove wrappers, leaving the original elements, and remove the shived style sheet
      removeWrappers(wrappers);
      clearTimeout(data._removeSheetTimer);
      data._removeSheetTimer = setTimeout(removeSheet, 500);
    });

    ownerDocument.printShived = true;
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  // expose API
  html5.type += ' print';
  html5.shivPrint = shivPrint;

  // shiv for print
  shivPrint(document);

}(this, document));
;
/* selectivizr v1.0.3b - (c) Keith Clark, freely distributable under the terms of the MIT license. selectivizr.com */
(function(e){function _(e){return e.replace(g,M).replace(y,function(e,t,n){var r=n.split(",");for(var i=0,s=r.length;i<s;i++){var o=R(r[i])+O;var u=[];r[i]=o.replace(b,function(e,t,n,r,i){if(t){if(u.length>0){f.push({selector:o.substring(0,i),patches:u});u=[]}return t}else{var s=n?P(n):D(r);if(s){u.push(s);return"."+s.className}return e}})}return t+r.join(",")})}function D(e){return!T||T.test(e)?{className:j(e),applyClass:true}:null}function P(t){var n=true;var i=j(t.slice(1));var o=t.substring(0,5)==":not(";var u;var f;if(o){t=t.slice(5,-1)}var l=t.indexOf("(");if(l>-1){t=t.substring(0,l)}if(t.charAt(0)==":"){switch(t.slice(1)){case"root":n=function(e){return o?e!=r:e==r};break;case"target":if(s==8){n=function(t){var n=function(){var e=location.hash;var n=e.slice(1);return o?e==A||t.id!=n:e!=A&&t.id==n};W(e,"hashchange",function(){U(t,i,n())});return n()};break}return false;case"checked":n=function(e){if(x.test(e.type)){W(e,"propertychange",function(){if(event.propertyName=="checked"){U(e,i,e.checked!==o)}})}return e.checked!==o};break;case"disabled":o=!o;case"enabled":n=function(e){if(S.test(e.tagName)){W(e,"propertychange",function(){if(event.propertyName=="$disabled"){U(e,i,e.$disabled===o)}});a.push(e);e.$disabled=e.disabled;return e.disabled===o}return t==":enabled"?o:!o};break;case"focus":u="focus";f="blur";case"hover":if(!u){u="mouseenter";f="mouseleave"}n=function(e){W(e,o?f:u,function(){U(e,i,true)});W(e,o?u:f,function(){U(e,i,false)});return o};break;default:if(!m.test(t)){return false}break}}return{className:i,applyClass:n}}function H(){var e,t,n,r;for(var i=0;i<f.length;i++){t=f[i].selector;n=f[i].patches;r=t.replace(w,A);if(r==A||r.charAt(r.length-1)==O){r+="*"}try{e=u(r)}catch(s){F("Selector '"+t+"' threw exception '"+s+"'")}if(e){for(var o=0,a=e.length;o<a;o++){var l=e[o];var c=l.className;for(var h=0,p=n.length;h<p;h++){var d=n[h];if(!B(l,d)){if(d.applyClass&&(d.applyClass===true||d.applyClass(l)===true)){c=z(c,d.className,true)}}}l.className=c}}}}function B(e,t){return(new RegExp("(^|\\s)"+t.className+"(\\s|$)")).test(e.className)}function j(e){return h+"-"+(s==6&&c?l++:e.replace(E,function(e){return e.charCodeAt(0)}))}function F(t){if(e.console){e.console.log(t)}}function I(e){return e.replace(L,M)}function q(e){return I(e).replace(k,O)}function R(e){return q(e.replace(N,M).replace(C,M))}function U(e,t,n){var r=e.className;var i=z(r,t,n);if(i!=r){e.className=i;e.parentNode.className+=A}}function z(e,t,n){var r=RegExp("(^|\\s)"+t+"(\\s|$)");var i=r.test(e);if(n){return i?e:e+O+t}else{return i?I(e.replace(r,M)):e}}function W(e,t,n){e.attachEvent("on"+t,n)}function X(){if(e.XMLHttpRequest){return new XMLHttpRequest}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){return null}}function V(e){i.open("GET",e,false);i.send();return i.status==200?i.responseText:A}function $(e,t,n){function r(e){return e.substring(0,e.indexOf("//"))}function i(e){return e.substring(0,e.indexOf("/",8))}if(!t){t=Y}if(e.substring(0,2)=="//"){e=r(t)+e}if(/^https?:\/\//i.test(e)){return!n&&i(t)!=i(e)?null:e}if(e.charAt(0)=="/"){return i(t)+e}var s=t.split(/[?#]/)[0];if(e.charAt(0)!="?"&&s.charAt(s.length-1)!="/"){s=s.substring(0,s.lastIndexOf("/")+1)}return s+e}function J(e){if(e){return V(e).replace(p,A).replace(d,function(t,n,r,i,s,o){var u=J($(r||s,e));return o?"@media "+o+" {"+u+"}":u}).replace(v,function(t,n,r,i){r=r||A;return n?t:" url("+r+$(i,e,true)+r+") "})}return A}function K(){var e,t;for(var r=0;r<n.styleSheets.length;r++){t=n.styleSheets[r];if(t.href!=A){e=$(t.href);if(e){t.cssText=t["rawCssText"]=_(J(e))}}}}function Q(){H();if(a.length>0){setInterval(function(){for(var e=0,t=a.length;e<t;e++){var n=a[e];if(n.disabled!==n.$disabled){if(n.disabled){n.disabled=false;n.$disabled=true;n.disabled=true}else{n.$disabled=n.disabled}}}},250)}}function Z(e,t){var i=false,s=true,o=function(r){if(r.type=="readystatechange"&&n.readyState!="complete")return;(r.type=="load"?e:n).detachEvent("on"+r.type,o,false);if(!i&&(i=true))t.call(e,r.type||r)},u=function(){try{r.doScroll("left")}catch(e){setTimeout(u,50);return}o("poll")};if(n.readyState=="complete")t.call(e,A);else{if(n.createEventObject&&r.doScroll){try{s=!e.frameElement}catch(a){}if(s)u()}W(n,"readystatechange",o);W(e,"load",o)}}var t=navigator.userAgent.match(/MSIE (\d+)/);if(!t){return false}var n=document;var r=n.documentElement;var i=X();var s=t[1];if(n.compatMode!="CSS1Compat"||s<6||s>8||!i){return}var o={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"};var u;var a=[];var f=[];var l=0;var c=true;var h="slvzr";var p=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g;var d=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g;var v=/(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g;var m=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;var g=/:(:first-(?:line|letter))/g;var y=/((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g;var b=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g;var w=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;var E=/[^\w-]/g;var S=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/;var x=/^(checkbox|radio)$/;var T=s>6?/[\$\^*]=(['"])\1/:null;var N=/([(\[+~])\s+/g;var C=/\s+([)\]+~])/g;var k=/\s+/g;var L=/^\s*((?:[\S\s]*\S)?)\s*$/;var A="";var O=" ";var M="$1";var G=n.getElementsByTagName("BASE");var Y=G.length>0?G[0].href:n.location.href;K();Z(e,function(){for(var t in o){var n,r,i=e;if(e[t]){n=o[t].replace("*",t).split(".");while((r=n.shift())&&(i=i[r])){}if(typeof i=="function"){u=i;Q();return}}}});})(this)
;
/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(a){"use strict";function x(){u(!0)}var b={};if(a.respond=b,b.update=function(){},b.mediaQueriesSupported=a.matchMedia&&a.matchMedia("only all").matches,!b.mediaQueriesSupported){var q,r,t,c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=c.getElementsByTagName("base")[0],l=j.getElementsByTagName("link"),m=[],n=function(){for(var b=0;l.length>b;b++){var c=l[b],d=c.href,e=c.media,f=c.rel&&"stylesheet"===c.rel.toLowerCase();d&&f&&!h[d]&&(c.styleSheet&&c.styleSheet.rawCssText?(p(c.styleSheet.rawCssText,d,e),h[d]=!0):(!/^([a-zA-Z:]*\/\/)/.test(d)&&!k||d.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&m.push({href:d,media:e}))}o()},o=function(){if(m.length){var b=m.shift();v(b.href,function(c){p(c,b.href,b.media),h[b.href]=!0,a.setTimeout(function(){o()},0)})}},p=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),g=d&&d.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c;b.length&&(b+="/"),i&&(g=1);for(var j=0;g>j;j++){var k,l,m,n;i?(k=c,f.push(h(a))):(k=d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),m=k.split(","),n=m.length;for(var o=0;n>o;o++)l=m[o],e.push({media:l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:f.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},s=function(){var a,b=c.createElement("div"),e=c.body,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",e||(e=f=c.createElement("body"),e.style.background="none"),e.appendChild(b),d.insertBefore(e,d.firstChild),a=b.offsetWidth,f?d.removeChild(e):e.removeChild(b),a=t=parseFloat(a)},u=function(b){var h="clientWidth",k=d[h],m="CSS1Compat"===c.compatMode&&k||c.body[h]||k,n={},o=l[l.length-1],p=(new Date).getTime();if(b&&q&&i>p-q)return a.clearTimeout(r),r=a.setTimeout(u,i),void 0;q=p;for(var v in e)if(e.hasOwnProperty(v)){var w=e[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?t||s():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?t||s():1)),w.hasquery&&(z&&A||!(z||m>=x)||!(A||y>=m))||(n[w.media]||(n[w.media]=[]),n[w.media].push(f[w.rules]))}for(var C in g)g.hasOwnProperty(C)&&g[C]&&g[C].parentNode===j&&j.removeChild(g[C]);for(var D in n)if(n.hasOwnProperty(D)){var E=c.createElement("style"),F=n[D].join("\n");E.type="text/css",E.media=D,j.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(c.createTextNode(F)),g.push(E)}},v=function(a,b){var c=w();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},w=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}();n(),b.update=n,a.addEventListener?a.addEventListener("resize",x,!1):a.attachEvent&&a.attachEvent("onresize",x)}})(this);
;
