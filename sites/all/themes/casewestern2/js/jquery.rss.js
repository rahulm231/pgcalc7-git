(function($) {
    'use strict';

    var RSS = function(target, url, options, callback) {
        this.target = target;

        this.url = url;
        this.html = [];
        this.effectQueue = [];

        this.options = $.extend({
            ssl: true,
            host: 'www.feedrapp.info',
            limit: null,
            key: null,
            layoutTemplate: '<ul>{entries}</ul>',
            entryTemplate: '<li><a href="{url}" target="_blank" class="feed-container-title">{title}</a><div class="feed-container-date">{date}</div></li>',
            tokens: {
                img: function(entry, tokens) {
                    return entry.thumbnail;
                },
                excerptBody350: function(entry, tokens) {
                    return tokens.body.slice(0, 350) + '...';
                },
                excerptBody300: function(entry, tokens) {
                    return tokens.body.slice(0, 300) + '...';
                },
                excerptBody250: function(entry, tokens) {
                    return tokens.body.slice(0, 250) + '...';
                },
                excerptBody200: function(entry, tokens) {
                    return tokens.body.slice(0, 200) + '...';
                },
                excerptBody150: function(entry, tokens) {
                    return tokens.body.slice(0, 150) + '...';
                },
                excerptBody100: function(entry, tokens) {
                    return tokens.body.slice(0, 100) + '...';
                }
            },
            outputMode: 'json',
            dateFormat: 'MM/DD/YYYY',
            dateLocale: 'en',
            effect: 'show',
            offsetStart: null,
            offsetEnd: null,
            error: function() {
                console.log('jQuery RSS: url doesn\'t link to RSS-Feed');
            },
            onData: function() {},
            success: function() {}
        }, options || {});

        // The current SSL certificate is only valid for *.herokuapp.com
        if (this.options.ssl && (this.options.host === 'www.feedrapp.info')) {
            this.options.host = 'feedrapp.herokuapp.com';
        }

        this.callback = callback || this.options.success;
    };

    RSS.htmlTags = [
        'doctype', 'html', 'head', 'title', 'base', 'link', 'meta', 'style', 'script', 'noscript',
        'body', 'article', 'nav', 'aside', 'section', 'header', 'footer', 'h1-h6', 'hgroup', 'address',
        'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption',
        'div', 'table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'col', 'colgroup',
        'form', 'fieldset', 'legend', 'label', 'input', 'button', 'select', 'datalist', 'optgroup',
        'option', 'textarea', 'keygen', 'output', 'progress', 'meter', 'details', 'summary', 'command',
        'menu', 'del', 'ins', 'img', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'source',
        'canvas', 'track', 'map', 'area', 'a', 'em', 'strong', 'i', 'b', 'u', 's', 'small', 'abbr', 'q',
        'cite', 'dfn', 'sub', 'sup', 'time', 'code', 'kbd', 'samp', 'var', 'mark', 'bdi', 'bdo', 'ruby',
        'rt', 'rp', 'span', 'br', 'wbr'
    ];

    RSS.prototype.load = function(callback) {
        var apiProtocol = 'http' + (this.options.ssl ? 's' : '');
        var apiHost = apiProtocol + '://' + this.options.host;
        var apiUrl = apiHost + '?callback=?&q=' + encodeURIComponent(this.url);

        // set limit to offsetEnd if offset has been set
        if (this.options.offsetStart && this.options.offsetEnd) {
            this.options.limit = this.options.offsetEnd;
        }

        if (this.options.limit !== null) {
            apiUrl += '&num=' + this.options.limit;
        }

        if (this.options.key !== null) {
            apiUrl += '&key=' + this.options.key;
        }

        $.getJSON(apiUrl, callback);
    };

    RSS.prototype.render = function() {
        var self = this;
        this.load(function(data) {
            try {
                self.feed = data.responseData.feed;
                self.entries = data.responseData.feed.entries;
            } catch (e) {
                self.entries = [];
                self.feed = null;
                return self.options.error.call(self);
            }

            var html = self.generateHTMLForEntries();

            self.target.append(html.layout);

            if (html.entries.length !== 0) {
                if ($.isFunction(self.options.onData)) {
                    self.options.onData.call(self);
                }

                var container = $(html.layout).is('entries') ? html.layout : $('entries', html.layout);

                self.appendEntriesAndApplyEffects(container, html.entries);
            }

            if (self.effectQueue.length > 0) {
                self.executeEffectQueue(self.callback);
            } else if ($.isFunction(self.callback)) {
                self.callback.call(self);
            }
        });
        // Check for image, and hide if none
        function checkForImage(elementPath) {
            window.setTimeout(function() {
                ($(elementPath).length) ? finalWriteOut(elementPath): checkForImage(elementPath);
            }, 50)
        }

        function finalWriteOut(elementPath) {
            $(elementPath).find("li.search-item").each(function() {
                if ($(this).find('a>img').attr("src") == "") {
                    $(this).find('a>img').css("display", "none");
                    $(this).find('div').css("padding-left", "0px");
                }
            })
        }
        checkForImage("#" + self.target.attr("id") + ">ul");
        // Check for image Column Layout, and hide if none
        function checkForImageCol(elementPath) {
            window.setTimeout(function() {
                ($(elementPath).length) ? finalWriteOutCol(elementPath): checkForImageCol(elementPath);
            }, 50)
        }

        function finalWriteOutCol(elementPath) {
            $(elementPath).find("div.thumbnail").each(function() {
                if ($(this).find('a>img').attr("src") == "") {
                    $(this).find('a>img').css("display", "none");
                    $(this).find('>div h2').css("margin-top", "0px");
                }
            })
        }
        checkForImageCol("#" + self.target.attr("id") + ">div.row");
    };

    RSS.prototype.appendEntriesAndApplyEffects = function(target, entries) {
        var self = this;

        $.each(entries, function(idx, entry) {
            var $html = self.wrapContent(entry);

            if (self.options.effect === 'show') {
                target.before($html);
            } else {
                $html.css({ display: 'none' });
                target.before($html);
                self.applyEffect($html, self.options.effect);
            }
        });

        target.remove();
    };

    RSS.prototype.generateHTMLForEntries = function() {
        var self = this;
        var result = { entries: [], layout: null };

        $(this.entries).each(function() {
            var entry = this;
            var offsetStart = self.options.offsetStart;
            var offsetEnd = self.options.offsetEnd;
            var evaluatedString;

            // offset required
            if (offsetStart && offsetEnd) {
                if (index >= offsetStart && index <= offsetEnd) {
                    if (self.isRelevant(entry, result.entries)) {
                        evaluatedString = self.evaluateStringForEntry(
                            self.options.entryTemplate, entry
                        );

                        result.entries.push(evaluatedString);
                    }
                }
            } else {
                // no offset
                if (self.isRelevant(entry, result.entries)) {
                    evaluatedString = self.evaluateStringForEntry(
                        self.options.entryTemplate, entry
                    );

                    result.entries.push(evaluatedString);
                }
            }
        });

        if (!!this.options.entryTemplate) {
            // we have an entryTemplate
            result.layout = this.wrapContent(
                this.options.layoutTemplate.replace('{entries}', '<entries></entries>')
            );
        } else {
            // no entryTemplate available
            result.layout = this.wrapContent('<div><entries></entries></div>');
        }

        return result;
    };

    RSS.prototype.wrapContent = function(content) {
        if (($.trim(content).indexOf('<') !== 0)) {
            // the content has no html => create a surrounding div
            return $('<div>' + content + '</div>');
        } else {
            // the content has html => don't touch it
            return $(content);
        }
    };

    RSS.prototype.applyEffect = function($element, effect, callback) {
        var self = this;

        switch (effect) {
            case 'slide':
                $element.slideDown('slow', callback);
                break;
            case 'slideFast':
                $element.slideDown(callback);
                break;
            case 'slideSynced':
                self.effectQueue.push({ element: $element, effect: 'slide' });
                break;
            case 'slideFastSynced':
                self.effectQueue.push({ element: $element, effect: 'slideFast' });
                break;
        }
    };

    RSS.prototype.executeEffectQueue = function(callback) {
        var self = this;

        this.effectQueue.reverse();

        var executeEffectQueueItem = function() {
            var item = self.effectQueue.pop();

            if (item) {
                self.applyEffect(item.element, item.effect, executeEffectQueueItem);
            } else if (callback) {
                callback();
            }
        };

        executeEffectQueueItem();
    };

    RSS.prototype.evaluateStringForEntry = function(string, entry) {
        var result = string;
        var self = this;

        $(string.match(/(\{.*?\})/g)).each(function() {
            var token = this.toString();

            result = result.replace(token, self.getValueForToken(token, entry));
        });

        return result;
    };

    RSS.prototype.isRelevant = function(entry, entries) {
        var tokenMap = this.getTokenMap(entry);

        if (this.options.filter) {
            if (this.options.filterLimit && (this.options.filterLimit === entries.length)) {
                return false;
            } else {
                return this.options.filter(entry, tokenMap);
            }
        } else {
            return true;
        }
    };

    RSS.prototype.getFormattedDate = function(dateString) {
        // If a custom formatting function is provided, use that.
        if (this.options.dateFormatFunction) {
            return this.options.dateFormatFunction(dateString);
        } else if (typeof moment !== 'undefined') {
            // If moment.js is available and dateFormatFunction is not overriding it,
            // use it to format the date.
            var date = moment(new Date(dateString));

            if (date.locale) {
                date = date.locale(this.options.dateLocale);
            } else {
                date = date.lang(this.options.dateLocale);
            }

            return date.format(this.options.dateFormat);
        } else {
            // If all else fails, just use the date as-is.
            return dateString;
        }
    };

    RSS.prototype.getTokenMap = function(entry) {
        if (!this.feedTokens) {
            var feed = JSON.parse(JSON.stringify(this.feed));

            delete feed.entries;
            this.feedTokens = feed;
        }

        return $.extend({
            feed: this.feedTokens,
            url: entry.link,
            author: entry.author,
            date: this.getFormattedDate(entry.publishedDate),
            title: entry.title,
            body: entry.content,
            shortBody: entry.contentSnippet,
            excerptContent100: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 100) + '...',
            excerptContent150: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 150) + '...',
            excerptContent200: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 200) + '...',
            excerptContent250: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 250) + '...',
            excerptContent300: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 300) + '...',
            excerptContent350: entry.content.replace(/(<([^>]+)>)/ig, '').substring(0, 350) + '...',
            excerptContentPM100: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 100) + '...',
            excerptContentPM150: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 150) + '...',
            excerptContentPM200: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 200) + '...',
            excerptContentPM250: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 250) + '...',
            excerptContentPM300: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 300) + '...',
            excerptContentPM350: entry.content.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi, '').substring(18, 350) + '...',

            bodyPlain: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '');

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),

            bodyPlain350: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 350) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),



            bodyPlain300: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 300) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),


            bodyPlain250: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 250) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),



            bodyPlain200: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 200) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),

            bodyPlain150: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 150) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),

            bodyPlain100: (function(entry) {
                var result = entry.content
                    .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
                    .replace(/<\/?[^>]+>/gi, '')
                    .substring(0, 100) + '...';

                for (var i = 0; i < RSS.htmlTags.length; i++) {
                    result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '');
                }

                return result;
            })(entry),
            shortBodyPlain: entry.contentSnippet.replace(/<\/?[^>]+>/gi, ''),
            index: $.inArray(entry, this.entries),
            totalEntries: this.entries.length,

            teaserImage: (function(entry) {
                try {
                    return entry.content.match(/(<img.*?>)/gi)[0];
                } catch (e) {
                    return '';
                }
            })(entry),

            teaserImageUrl: (function(entry) {
                try {
                    return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1];
                } catch (e) {
                    return '';
                }
            })(entry)
        }, this.options.tokens);
    };

    RSS.prototype.getValueForToken = function(_token, entry) {
        var tokenMap = this.getTokenMap(entry);
        var token = _token.replace(/[\{\}]/g, '');
        var result = tokenMap[token];

        if (typeof result !== 'undefined') {
            return ((typeof result === 'function') ? result(entry, tokenMap) : result);
        } else {
            throw new Error('Unknown token: ' + _token + ', url:' + this.url);
        }
    };

    $.fn.rss = function(url, options, callback) {
        new RSS(this, url, options, callback).render();
        return this; // Implement chaining
    };

})(jQuery);