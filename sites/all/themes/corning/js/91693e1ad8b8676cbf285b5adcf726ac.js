(function ($) {

  var initGlassDictionary = function (cx, s) {

    $('#main-content').once('glass-dictionary', function () {

      if (typeof openDialog === 'undefined') window.openDialog = false;

      if ($.isFunction($.fn.on)) {
        // For jQuery 1.7+
        $(document).on('mouseenter','a.dict-word-link',gdMouseEnter);
        $(document).on('mouseleave','a.dict-word-link',gdMouseExit);
      } else {
        // For jQuery 1.3.x -> 1.6.x
        // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
        // This is not here for jQuery 1.9, it's here for legacy users.
        $('a.dict-word-link').live({
          mouseenter: gdMouseEnter,
          mouseleave: gdMouseExit
        });
      }


      var dictionary = [];

      $words = $('.dict-word-def');
      $cont = $('#main-content');
      $els = $('p, em, i, b, strong, li, span', $cont);

      $words.each(function (i, el) {
        dictionary.push({
          title: el.title,
          nid: $(el).data('nid')
        });
      });

      $els.each(function (i, el) {
        $el = $(el); // a little caching

        // No dictionary terms in the callout menus, please
        if ($el.closest('.callout-markup').length || $el.closest('ul.tabs').length) return;

        $el.contents().each(function (i, content) {

          if (content.nodeType != 3 || content.nodeValue.length <= 5) return;

          var matches = [],
            safety = [];

          // loop through the dictionary and get all matches
          dictionaryLoop: for (i in dictionary) {
            var regex = new RegExp('(?!%%)\\b' + dictionary[i].title + '(?!%%)\\b', 'i');
            var match = content.nodeValue.match(regex);
            if (!!match) {
              // check against repeats
              if (safety.length) {
                for (s in safety) {
                  if (safety[s].match(match[0])) continue dictionaryLoop;
                }
              }
              // all clear, match is successful
              matches.push({word: dictionary[i], match: match});
              safety.push(match[0]);
            }
          }

          // replace all matches
          if (matches.length) buildDictionaryLinks(matches, content);

        });

        // clean up delimiters - only replace if matched
        var match = el.innerHTML.match(/%{2}(.*?)%{2}/gi);
        if (!!match) el.innerHTML = el.innerHTML.replace(/%{2}(.*?)%{2}/gi, '$1');
      });

    });

  }

  var gdMouseEnter = function (e) {

    window.linkHover = true;

    // close others
    if (window.openDialog) {
      window.openDialog.hovering = false;
      window.openDialog.dialog('close');
    }

    $div = $('#dict-word-def-' + this.rel);

    if ($div.length) {

      $div.dialog({
        resizable: false,
        dialogClass: 'dict-definition-dialog',
        position: [e.clientX, e.clientY]
      });

      var h = $div.dialog('widget').height();
      $div.dialog('option', 'position', [e.clientX + 30, e.clientY - (h + 20)]);

      $div.parent().hover(function () {
        $div.hovering = true;
      }, function () {
        $div.hovering = false;
      });

      window.openDialog = $div;

    }
  }

  var gdMouseExit = function () {
    window.linkHover = false;
    setTimeout(function () {
      dialogTimer();
    }, 500);
  }

  var sortMatches = function (matches) {
    return matches.sort(function (a, b) {
      return a.match.index - b.match.index;
    });
  }

  var buildDictionaryLinks = function (matches, old) { //word, el, match){

    var newText = document.createDocumentFragment();
    var i = 0;

    matches = sortMatches(matches); // sort the matches by index

    for (m in matches) {
      // add the part before the match
      var part = old.nodeValue.slice(i, matches[m].match.index).replace(/%%/g, '');
      newText.appendChild(document.createTextNode(part));

      // add the match as an anchor element
      var a = document.createElement('a');
      a.className = 'dict-word-link';
      a.innerHTML = matches[m].match[0];
      a.rel = matches[m].word.nid;

      newText.appendChild(a);

      // move the index to right after the match
      i = matches[m].match.index + matches[m].match[0].split('').length;
    }

    // add the remaining part (after the matches)
    var part = old.nodeValue.slice(i).replace(/%%/g, '');
    newText.appendChild(document.createTextNode(part));

    if (!!old.parentNode) old.parentNode.replaceChild(newText, old);

  }

  var dialogTimer = function () {
    var dialog = window.openDialog;
    if (dialog.hovering || window.linkHover) {
      setTimeout(dialogTimer, 500);
    } else if (dialog) {
      dialog.hovering = false;
      window.openDialog = false;
      if (typeof(dialog.dialog) == 'function') {
        dialog.dialog('close');
      }
    }
  }

  Drupal.behaviors.glassDictionary = {
    attach: initGlassDictionary
  }

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
