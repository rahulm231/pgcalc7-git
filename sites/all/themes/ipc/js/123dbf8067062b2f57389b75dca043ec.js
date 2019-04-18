function updateValue(e, t) {
    e.val(t), null === e.val() && e.val(t), e.focus(function() {
        e.val() === t && e.val("")
    }), e.blur(function() {
        null !== e.val() && "" !== e.val() || e.val(t)
    })
}

function backgroundImage(e, t, r) {
    $(e).each(function() {
        var e = $(this).find("img").first().attr("src");
        e && (1 == r ? $(this).find("img").first("img").hide() : $(this).find("img").parent(".image, .spotlight-image").hide(), $(this).css("background", "url(" + e + ")" + t))
    })
}

function bodyClassToggler(e, t) {
    $(e).on("click", function() {
        $("body").toggleClass(t)
    })
}

function placeHolders(a) {
    $(a).find(".portal-login div, .form-row, .e2ma_signup_form_row").each(function() {
        if (!$(a).hasClass("fdpc_designready_order_form") && !($(this).hasClass("form-row--sub-options") || $(this).hasClass("form-row--file") || $(this).hasClass("form-row--date") || $(this).hasClass("form-row--datetime") || $(this).hasClass("form-row--time") || $(this).hasClass("payment--cc-exp") || $(this).parents(".checkout_process, .event-calendar-search__jump").length)) {
            var e = $(this).find(".form-row__label label, .e2ma_signup_form_label"),
                t = $(this).find('.form-row__controls input[type="text"], .form-row__controls input[type="email"], .form-row__controls input[type="password"], .e2ma_signup_form_element input[type="text"], .e2ma_signup_form_element input[type="email"]'),
                r = $(this).find("textarea"),
                i = $.trim(e.text()).replace(/ +(?= )/g, ""),
                n = !1;
            $(this).hasClass("form-row--required") && (n = !0), n && (i += " *"), i && (t.length && ($(t).attr("placeholder", i), e.hide(), $(this).find(".form-row__label").hide()), r.length && ($(r).attr("placeholder", i), e.hide(), $(this).find(".form-row__label").hide()), $(this).hasClass("payment--cc-csc") && $(this).find(".form-row__label").show())
        }
    })
}

function init(e) {
    e.each(function(e) {
        $(this).css({
            position: "relative",
            top: "20px",
            opacity: "0",
            translate3d: "0,0,0"
        })
    })
}

function checkInView(e, r) {
    var i = 1e3 / e.length;
    e.each(function(e) {
        var t = $(this).offset().top;
        $(window).scrollTop() + ($(window).height() - r) >= t && ($(this).is("previously-animated") || $(this).velocity({
            top: 0,
            opacity: 1
        }, {
            duration: 400,
            loop: !1,
            delay: e * i,
            complete: function() {
                $(this).addClass("previously-animated")
            }
        }))
    })
}

function checkum() {
    checkInView($(".featured-container li"), 100), checkInView($(".secondary-container"), 100), checkInView($(".logos-container li"), 100), checkInView($(".news-container .news-article"), 0), checkInView($(".email-marketing-container .wrap"), 100)
}

function textWrapper(e, t, r, i) {
    $(e).each(function() {
        $(this).find(t).html(function(e, t) {
            0 <= $(this).text().indexOf(r) && (splitText = $(this).text().split(r), formattedText = splitText[0] + '<span class="' + i + '">' + splitText[1] + "</span>", $(this).html(formattedText))
        })
    })
}

function landingImage(e, t) {
    $(e).each(function() {
        var e = $(this).find(".masthead-container img").first().attr("src");
        $(this).find(".masthead-container").hide(), $(this).css("background", "url(" + e + ")" + t)
    })
}! function(t) {
    function s(e) {
        var t = e.length,
            r = u.type(e);
        return "function" !== r && !u.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === r || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    if (!t.jQuery) {
        var u = function(e, t) {
            return new u.fn.init(e, t)
        };
        u.isWindow = function(e) {
            return null != e && e == e.window
        }, u.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? r[n.call(e)] || "object" : typeof e
        }, u.isArray = Array.isArray || function(e) {
            return "array" === u.type(e)
        }, u.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== u.type(e) || e.nodeType || u.isWindow(e)) return !1;
            try {
                if (e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            for (t in e);
            return void 0 === t || i.call(e, t)
        }, u.each = function(e, t, r) {
            var i = 0,
                n = e.length,
                a = s(e);
            if (r) {
                if (a)
                    for (; i < n && !1 !== t.apply(e[i], r); i++);
                else
                    for (i in e)
                        if (!1 === t.apply(e[i], r)) break
            } else if (a)
                for (; i < n && !1 !== t.call(e[i], i, e[i]); i++);
            else
                for (i in e)
                    if (!1 === t.call(e[i], i, e[i])) break; return e
        }, u.data = function(e, t, r) {
            if (void 0 === r) {
                var i = (n = e[u.expando]) && a[n];
                if (void 0 === t) return i;
                if (i && t in i) return i[t]
            } else if (void 0 !== t) {
                var n = e[u.expando] || (e[u.expando] = ++u.uuid);
                return a[n] = a[n] || {}, a[n][t] = r
            }
        }, u.removeData = function(e, t) {
            var r = e[u.expando],
                i = r && a[r];
            i && u.each(t, function(e, t) {
                delete i[t]
            })
        }, u.extend = function() {
            var e, t, r, i, n, a, o = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof o && (c = o, o = arguments[s] || {}, s++), "object" != typeof o && "function" !== u.type(o) && (o = {}), s === l && (o = this, s--); s < l; s++)
                if (null != (n = arguments[s]))
                    for (i in n) e = o[i], o !== (r = n[i]) && (c && r && (u.isPlainObject(r) || (t = u.isArray(r))) ? (a = t ? (t = !1, e && u.isArray(e) ? e : []) : e && u.isPlainObject(e) ? e : {}, o[i] = u.extend(c, a, r)) : void 0 !== r && (o[i] = r));
            return o
        }, u.queue = function(e, t, r) {
            if (e) {
                t = (t || "fx") + "queue";
                var i = u.data(e, t);
                return r ? (!i || u.isArray(r) ? i = u.data(e, t, (o = a || [], null != (n = r) && (s(Object(n)) ? function(e, t) {
                    for (var r = +t.length, i = 0, n = e.length; i < r;) e[n++] = t[i++];
                    if (r != r)
                        for (; void 0 !== t[i];) e[n++] = t[i++];
                    e.length = n
                }(o, "string" == typeof n ? [n] : n) : [].push.call(o, n)), o)) : i.push(r), i) : i || []
            }
            var n, a, o
        }, u.dequeue = function(e, n) {
            u.each(e.nodeType ? [e] : e, function(e, t) {
                n = n || "fx";
                var r = u.queue(t, n),
                    i = r.shift();
                "inprogress" === i && (i = r.shift()), i && ("fx" === n && r.unshift("inprogress"), i.call(t, function() {
                    u.dequeue(t, n)
                }))
            })
        }, u.fn = u.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }
                var t = this[0],
                    e = e.apply(t),
                    r = this.offset(),
                    i = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0,
                        left: 0
                    } : u(e).offset();
                return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (i.top += parseFloat(e.style.borderTopWidth) || 0, i.left += parseFloat(e.style.borderLeftWidth) || 0), {
                    top: r.top - i.top,
                    left: r.left - i.left
                }
            }
        };
        var a = {};
        u.expando = "velocity" + (new Date).getTime(), u.uuid = 0;
        for (var r = {}, i = r.hasOwnProperty, n = r.toString, e = "Boolean Number String Function Array Date RegExp Object Error".split(" "), o = 0; o < e.length; o++) r["[object " + e[o] + "]"] = e[o].toLowerCase();
        u.fn.init.prototype = u.fn, t.Velocity = {
            Utilities: u
        }
    }
}(window),
function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    return function(e, L, z, O) {
        function h(e) {
            return M.isWrapped(e) ? e = [].slice.call(e) : M.isNode(e) && (e = [e]), e
        }

        function R(e) {
            var t = W.data(e, "velocity");
            return null === t ? O : t
        }

        function i(o, t, s, r) {
            function i(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function n(e, t) {
                return 3 * t - 6 * e
            }

            function a(e) {
                return 3 * e
            }

            function l(e, t, r) {
                return ((i(t, r) * e + n(t, r)) * e + a(t)) * e
            }

            function c(e, t, r) {
                return 3 * i(t, r) * e * e + 2 * n(t, r) * e + a(t)
            }

            function u(e) {
                for (var t = 0, r = 1, i = g - 1; r != i && v[r] <= e; ++r) t += m;
                var n = t + (e - v[--r]) / (v[r + 1] - v[r]) * m,
                    a = c(n, o, s);
                return .001 <= a ? function(e, t) {
                    for (var r = 0; r < d; ++r) {
                        var i = c(t, o, s);
                        if (0 === i) return t;
                        t -= (l(t, o, s) - e) / i
                    }
                    return t
                }(e, n) : 0 == a ? n : function(e, t, r) {
                    for (var i, n, a = 0; 0 < (i = l(n = t + (r - t) / 2, o, s) - e) ? r = n : t = n, Math.abs(i) > f && ++a < h;);
                    return n
                }(e, t, t + m)
            }

            function p() {
                b = !0, (o != t || s != r) && function() {
                    for (var e = 0; e < g; ++e) v[e] = l(e * m, o, s)
                }()
            }
            var d = 4,
                f = 1e-7,
                h = 10,
                g = 11,
                m = 1 / (g - 1),
                e = "Float32Array" in L;
            if (4 !== arguments.length) return !1;
            for (var y = 0; y < 4; ++y)
                if ("number" != typeof arguments[y] || isNaN(arguments[y]) || !isFinite(arguments[y])) return !1;
            o = Math.min(o, 1), s = Math.min(s, 1), o = Math.max(o, 0), s = Math.max(s, 0);
            var v = e ? new Float32Array(g) : new Array(g),
                b = !1,
                x = function(e) {
                    return b || p(), o === t && s === r ? e : 0 === e ? 0 : 1 === e ? 1 : l(u(e), t, r)
                };
            x.getControlPoints = function() {
                return [{
                    x: o,
                    y: t
                }, {
                    x: s,
                    y: r
                }]
            };
            var w = "generateBezier(" + [o, t, s, r] + ")";
            return x.toString = function() {
                return w
            }, x
        }

        function I(e, t) {
            var r = e;
            return M.isString(e) ? B.Easings[e] || (r = !1) : r = M.isArray(e) && 1 === e.length ? function(t) {
                return function(e) {
                    return Math.round(e * t) * (1 / t)
                }
            }.apply(null, e) : M.isArray(e) && 2 === e.length ? o.apply(null, e.concat([t])) : !(!M.isArray(e) || 4 !== e.length) && i.apply(null, e), !1 === r && (r = B.Easings[B.defaults.easing] ? B.defaults.easing : a), r
        }

        function q(e) {
            if (e) {
                var t = (new Date).getTime(),
                    r = B.State.calls.length;
                1e4 < r && (B.State.calls = function(e) {
                    for (var t = -1, r = e ? e.length : 0, i = []; ++t < r;) {
                        var n = e[t];
                        n && i.push(n)
                    }
                    return i
                }(B.State.calls));
                for (var i = 0; i < r; i++)
                    if (B.State.calls[i]) {
                        var n = B.State.calls[i],
                            a = n[0],
                            o = n[2],
                            s = n[3],
                            l = !!s,
                            c = null;
                        s || (s = B.State.calls[i][3] = t - 16);
                        for (var u = Math.min((t - s) / o.duration, 1), p = 0, d = a.length; p < d; p++) {
                            var f = a[p],
                                h = f.element;
                            if (R(h)) {
                                var g = !1;
                                if (o.display !== O && null !== o.display && "none" !== o.display) {
                                    if ("flex" === o.display) {
                                        W.each(["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"], function(e, t) {
                                            D.setPropertyValue(h, "display", t)
                                        })
                                    }
                                    D.setPropertyValue(h, "display", o.display)
                                }
                                for (var m in o.visibility !== O && "hidden" !== o.visibility && D.setPropertyValue(h, "visibility", o.visibility), f)
                                    if ("element" !== m) {
                                        var y, v = f[m],
                                            b = M.isString(v.easing) ? B.Easings[v.easing] : v.easing;
                                        if (1 === u) y = v.endValue;
                                        else {
                                            var x = v.endValue - v.startValue;
                                            if (y = v.startValue + x * b(u, o, x), !l && y === v.currentValue) continue
                                        }
                                        if (v.currentValue = y, "tween" === m) c = y;
                                        else {
                                            if (D.Hooks.registered[m]) {
                                                var w = D.Hooks.getRoot(m),
                                                    S = R(h).rootPropertyValueCache[w];
                                                S && (v.rootPropertyValue = S)
                                            }
                                            var C = D.setPropertyValue(h, m, v.currentValue + (0 === parseFloat(y) ? "" : v.unitType), v.rootPropertyValue, v.scrollData);
                                            D.Hooks.registered[m] && (R(h).rootPropertyValueCache[w] = D.Normalizations.registered[w] ? D.Normalizations.registered[w]("extract", null, C[1]) : C[1]), "transform" === C[0] && (g = !0)
                                        }
                                    }
                                o.mobileHA && R(h).transformCache.translate3d === O && (R(h).transformCache.translate3d = "(0px, 0px, 0px)", g = !0), g && D.flushTransformCache(h)
                            }
                        }
                        o.display !== O && "none" !== o.display && (B.State.calls[i][2].display = !1), o.visibility !== O && "hidden" !== o.visibility && (B.State.calls[i][2].visibility = !1), o.progress && o.progress.call(n[1], n[1], u, Math.max(0, s + o.duration - t), s, c), 1 === u && P(i)
                    }
            }
            B.State.isTicking && V(q)
        }

        function P(e, t) {
            if (!B.State.calls[e]) return !1;
            for (var r = B.State.calls[e][0], i = B.State.calls[e][1], n = B.State.calls[e][2], a = B.State.calls[e][4], o = !1, s = 0, l = r.length; s < l; s++) {
                var c = r[s].element;
                if (t || n.loop || ("none" === n.display && D.setPropertyValue(c, "display", n.display), "hidden" === n.visibility && D.setPropertyValue(c, "visibility", n.visibility)), !0 !== n.loop && (W.queue(c)[1] === O || !/\.velocityQueueEntryFlag/i.test(W.queue(c)[1])) && R(c)) {
                    R(c).isAnimating = !1;
                    var u = !(R(c).rootPropertyValueCache = {});
                    W.each(D.Lists.transforms3D, function(e, t) {
                        var r = /^scale/.test(t) ? 1 : 0,
                            i = R(c).transformCache[t];
                        R(c).transformCache[t] !== O && new RegExp("^\\(" + r + "[^.]").test(i) && (u = !0, delete R(c).transformCache[t])
                    }), n.mobileHA && (u = !0, delete R(c).transformCache.translate3d), u && D.flushTransformCache(c), D.Values.removeClass(c, "velocity-animating")
                }
                if (!t && n.complete && !n.loop && s === l - 1) try {
                    n.complete.call(i, i)
                } catch (e) {
                    setTimeout(function() {
                        throw e
                    }, 1)
                }
                a && !0 !== n.loop && a(i), R(c) && !0 === n.loop && !t && (W.each(R(c).tweensContainer, function(e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                }), B(c, "reverse", {
                    loop: !0,
                    delay: n.delay
                })), !1 !== n.queue && W.dequeue(c, n.queue)
            }
            B.State.calls[e] = !1;
            for (var p = 0, d = B.State.calls.length; p < d; p++)
                if (!1 !== B.State.calls[p]) {
                    o = !0;
                    break
                }!1 === o && (B.State.isTicking = !1, delete B.State.calls, B.State.calls = [])
        }
        var W, n, p = function() {
                if (z.documentMode) return z.documentMode;
                for (var e = 7; 4 < e; e--) {
                    var t = z.createElement("div");
                    if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e
                }
                return O
            }(),
            t = (n = 0, L.webkitRequestAnimationFrame || L.mozRequestAnimationFrame || function(e) {
                var t, r = (new Date).getTime();
                return t = Math.max(0, 16 - (r - n)), n = r + t, setTimeout(function() {
                    e(r + t)
                }, t)
            }),
            M = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                },
                isNode: function(e) {
                    return e && e.nodeType
                },
                isNodeList: function(e) {
                    return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== O && (0 === e.length || "object" == typeof e[0] && 0 < e[0].nodeType)
                },
                isWrapped: function(e) {
                    return e && (e.jquery || L.Zepto && L.Zepto.zepto.isZ(e))
                },
                isSVG: function(e) {
                    return L.SVGElement && e instanceof L.SVGElement
                },
                isEmptyObject: function(e) {
                    for (var t in e) return !1;
                    return !0
                }
            },
            r = !1;
        if (e.fn && e.fn.jquery ? (W = e, r = !0) : W = L.Velocity.Utilities, p <= 8 && !r) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (!(p <= 7)) {
            var a = "swing",
                B = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: L.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: z.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: W,
                    Redirects: {},
                    Easings: {},
                    Promise: L.Promise,
                    defaults: {
                        queue: "",
                        duration: 400,
                        easing: a,
                        begin: O,
                        complete: O,
                        progress: O,
                        display: O,
                        visibility: O,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(e) {
                        W.data(e, "velocity", {
                            isSVG: M.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            L.pageYOffset !== O ? (B.State.scrollAnchor = L, B.State.scrollPropertyLeft = "pageXOffset", B.State.scrollPropertyTop = "pageYOffset") : (B.State.scrollAnchor = z.documentElement || z.body.parentNode || z.body, B.State.scrollPropertyLeft = "scrollLeft", B.State.scrollPropertyTop = "scrollTop");
            var o = function() {
                function v(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function b(e, t, r) {
                    var i = {
                        x: e.x + r.dx * t,
                        v: e.v + r.dv * t,
                        tension: e.tension,
                        friction: e.friction
                    };
                    return {
                        dx: i.v,
                        dv: v(i)
                    }
                }
                return function e(t, r, i) {
                    var n, a, o, s, l, c, u, p, d, f, h, g = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        m = [0],
                        y = 0;
                    for (t = parseFloat(t) || 500, r = parseFloat(r) || 20, i = i || null, g.tension = t, g.friction = r, a = (n = null !== i) ? (y = e(t, r)) / i * .016 : .016; l = a, void 0, c = {
                            dx: (s = o || g).v,
                            dv: v(s)
                        }, u = b(s, .5 * l, c), p = b(s, .5 * l, u), d = b(s, l, p), f = 1 / 6 * (c.dx + 2 * (u.dx + p.dx) + d.dx), h = 1 / 6 * (c.dv + 2 * (u.dv + p.dv) + d.dv), s.x = s.x + f * l, s.v = s.v + h * l, o = s, m.push(1 + o.x), y += 16, 1e-4 < Math.abs(o.x) && 1e-4 < Math.abs(o.v););
                    return n ? function(e) {
                        return m[e * (m.length - 1) | 0]
                    } : y
                }
            }();
            B.Easings = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function(e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, W.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(e, t) {
                B.Easings[t[0]] = i.apply(null, t[1])
            });
            var D = B.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var e = 0; e < D.Lists.colors.length; e++) {
                            var t = "color" === D.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            D.Hooks.templates[D.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var r, i, n;
                        if (p)
                            for (r in D.Hooks.templates) {
                                n = (i = D.Hooks.templates[r])[0].split(" ");
                                var a = i[1].match(D.RegEx.valueSplit);
                                "Color" === n[0] && (n.push(n.shift()), a.push(a.shift()), D.Hooks.templates[r] = [n.join(" "), a.join(" ")])
                            }
                        for (r in D.Hooks.templates)
                            for (var e in n = (i = D.Hooks.templates[r])[0].split(" ")) {
                                var o = r + n[e],
                                    s = e;
                                D.Hooks.registered[o] = [r, s]
                            }
                    },
                    getRoot: function(e) {
                        var t = D.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    cleanRootPropertyValue: function(e, t) {
                        return D.RegEx.valueUnwrap.test(t) && (t = t.match(D.RegEx.valueUnwrap)[1]), D.Values.isCSSNullValue(t) && (t = D.Hooks.templates[e][1]), t
                    },
                    extractValue: function(e, t) {
                        var r = D.Hooks.registered[e];
                        if (r) {
                            var i = r[0],
                                n = r[1];
                            return (t = D.Hooks.cleanRootPropertyValue(i, t)).toString().match(D.RegEx.valueSplit)[n]
                        }
                        return t
                    },
                    injectValue: function(e, t, r) {
                        var i = D.Hooks.registered[e];
                        if (i) {
                            var n, a = i[0],
                                o = i[1];
                            return (n = (r = D.Hooks.cleanRootPropertyValue(a, r)).toString().match(D.RegEx.valueSplit))[o] = t, n.join(" ")
                        }
                        return r
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(e, t, r) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var i;
                                    return i = D.RegEx.wrappedValueAlreadyExtracted.test(r) ? r : (i = r.toString().match(D.RegEx.valueUnwrap)) ? i[1].replace(/,(\s+)?/g, " ") : r;
                                case "inject":
                                    return "rect(" + r + ")"
                            }
                        },
                        blur: function(e, t, r) {
                            switch (e) {
                                case "name":
                                    return B.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var i = parseFloat(r);
                                    if (!i && 0 !== i) {
                                        var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        i = n ? n[1] : 0
                                    }
                                    return i;
                                case "inject":
                                    return parseFloat(r) ? "blur(" + r + ")" : "none"
                            }
                        },
                        opacity: function(e, t, r) {
                            if (p <= 8) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var i = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return i ? i[1] / 100 : 1;
                                case "inject":
                                    return (t.style.zoom = 1) <= parseFloat(r) ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                case "inject":
                                    return r
                            }
                        }
                    },
                    register: function() {
                        p <= 9 || B.State.isGingerbread || (D.Lists.transformsBase = D.Lists.transformsBase.concat(D.Lists.transforms3D));
                        for (var e = 0; e < D.Lists.transformsBase.length; e++) ! function() {
                            var n = D.Lists.transformsBase[e];
                            D.Normalizations.registered[n] = function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return R(t) === O || R(t).transformCache[n] === O ? /^scale/i.test(n) ? 1 : 0 : R(t).transformCache[n].replace(/[()]/g, "");
                                    case "inject":
                                        var i = !1;
                                        switch (n.substr(0, n.length - 1)) {
                                            case "translate":
                                                i = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                                break;
                                            case "scal":
                                            case "scale":
                                                B.State.isAndroid && R(t).transformCache[n] === O && r < 1 && (r = 1), i = !/(\d)$/i.test(r);
                                                break;
                                            case "skew":
                                                i = !/(deg|\d)$/i.test(r);
                                                break;
                                            case "rotate":
                                                i = !/(deg|\d)$/i.test(r)
                                        }
                                        return i || (R(t).transformCache[n] = "(" + r + ")"), R(t).transformCache[n]
                                }
                            }
                        }();
                        for (e = 0; e < D.Lists.colors.length; e++) ! function() {
                            var o = D.Lists.colors[e];
                            D.Normalizations.registered[o] = function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return o;
                                    case "extract":
                                        var i;
                                        if (D.RegEx.wrappedValueAlreadyExtracted.test(r)) i = r;
                                        else {
                                            var n, a = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(r) ? n = a[r] !== O ? a[r] : a.black : D.RegEx.isHex.test(r) ? n = "rgb(" + D.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (n = a.black), i = (n || r).toString().match(D.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return p <= 8 || 3 !== i.split(" ").length || (i += " 1"), i;
                                    case "inject":
                                        return p <= 8 ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (p <= 8 ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function(e) {
                        return e.replace(/-(\w)/g, function(e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function(e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (p || B.State.isAndroid && !B.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function(e) {
                        if (B.State.prefixMatches[e]) return [B.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, i = t.length; r < i; r++) {
                            var n;
                            if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                                    return e.toUpperCase()
                                }), M.isString(B.State.prefixElement.style[n])) return [B.State.prefixMatches[e] = n, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function(e) {
                        var t;
                        return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, r, i) {
                            return t + t + r + r + i + i
                        }), (t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(e) {
                        return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function(e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function(e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function(e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    },
                    removeClass: function(e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(e, t, r, c) {
                    function u(e, t) {
                        function r() {
                            a && D.setPropertyValue(e, "display", "none")
                        }
                        var i = 0;
                        if (p <= 8) i = W.css(e, t);
                        else {
                            var n, a = !1;
                            if (/^(width|height)$/.test(t) && 0 === D.getPropertyValue(e, "display") && (a = !0, D.setPropertyValue(e, "display", D.Values.getDisplayType(e))), !c) {
                                if ("height" === t && "border-box" !== D.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var o = e.offsetHeight - (parseFloat(D.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(D.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(D.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(D.getPropertyValue(e, "paddingBottom")) || 0);
                                    return r(), o
                                }
                                if ("width" === t && "border-box" !== D.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var s = e.offsetWidth - (parseFloat(D.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(D.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(D.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(D.getPropertyValue(e, "paddingRight")) || 0);
                                    return r(), s
                                }
                            }
                            n = R(e) === O ? L.getComputedStyle(e, null) : R(e).computedStyle ? R(e).computedStyle : R(e).computedStyle = L.getComputedStyle(e, null), "borderColor" === t && (t = "borderTopColor"), ("" === (i = 9 === p && "filter" === t ? n.getPropertyValue(t) : n[t]) || null === i) && (i = e.style[t]), r()
                        }
                        if ("auto" === i && /^(top|right|bottom|left)$/i.test(t)) {
                            var l = u(e, "position");
                            ("fixed" === l || "absolute" === l && /top|left/i.test(t)) && (i = W(e).position()[t] + "px")
                        }
                        return i
                    }
                    var i;
                    if (D.Hooks.registered[t]) {
                        var n = t,
                            a = D.Hooks.getRoot(n);
                        r === O && (r = D.getPropertyValue(e, D.Names.prefixCheck(a)[0])), D.Normalizations.registered[a] && (r = D.Normalizations.registered[a]("extract", e, r)), i = D.Hooks.extractValue(n, r)
                    } else if (D.Normalizations.registered[t]) {
                        var o, s;
                        "transform" !== (o = D.Normalizations.registered[t]("name", e)) && (s = u(e, D.Names.prefixCheck(o)[0]), D.Values.isCSSNullValue(s) && D.Hooks.templates[t] && (s = D.Hooks.templates[t][1])), i = D.Normalizations.registered[t]("extract", e, s)
                    }
                    if (!/^[\d-]/.test(i))
                        if (R(e) && R(e).isSVG && D.Names.SVGAttribute(t))
                            if (/^(height|width)$/i.test(t)) try {
                                i = e.getBBox()[t]
                            } catch (e) {
                                i = 0
                            } else i = e.getAttribute(t);
                            else i = u(e, D.Names.prefixCheck(t)[0]);
                    return D.Values.isCSSNullValue(i) && (i = 0), 2 <= B.debug && console.log("Get " + t + ": " + i), i
                },
                setPropertyValue: function(e, t, r, i, n) {
                    var a = t;
                    if ("scroll" === t) n.container ? n.container["scroll" + n.direction] = r : "Left" === n.direction ? L.scrollTo(r, n.alternateValue) : L.scrollTo(n.alternateValue, r);
                    else if (D.Normalizations.registered[t] && "transform" === D.Normalizations.registered[t]("name", e)) D.Normalizations.registered[t]("inject", e, r), a = "transform", r = R(e).transformCache[t];
                    else {
                        if (D.Hooks.registered[t]) {
                            var o = t,
                                s = D.Hooks.getRoot(t);
                            i = i || D.getPropertyValue(e, s), r = D.Hooks.injectValue(o, r, i), t = s
                        }
                        if (D.Normalizations.registered[t] && (r = D.Normalizations.registered[t]("inject", e, r), t = D.Normalizations.registered[t]("name", e)), a = D.Names.prefixCheck(t)[0], p <= 8) try {
                            e.style[a] = r
                        } catch (e) {
                            B.debug && console.log("Browser does not support [" + r + "] for [" + a + "]")
                        } else R(e) && R(e).isSVG && D.Names.SVGAttribute(t) ? e.setAttribute(t, r) : e.style[a] = r;
                        2 <= B.debug && console.log("Set " + t + " (" + a + "): " + r)
                    }
                    return [a, r]
                },
                flushTransformCache: function(t) {
                    function e(e) {
                        return parseFloat(D.getPropertyValue(t, e))
                    }
                    var r = "";
                    if ((p || B.State.isAndroid && !B.State.isChrome) && R(t).isSVG) {
                        var i = {
                            translate: [e("translateX"), e("translateY")],
                            skewX: [e("skewX")],
                            skewY: [e("skewY")],
                            scale: 1 !== e("scale") ? [e("scale"), e("scale")] : [e("scaleX"), e("scaleY")],
                            rotate: [e("rotateZ"), 0, 0]
                        };
                        W.each(R(t).transformCache, function(e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), i[e] && (r += e + "(" + i[e].join(" ") + ") ", delete i[e])
                        })
                    } else {
                        var n, a;
                        W.each(R(t).transformCache, function(e) {
                            return n = R(t).transformCache[e], "transformPerspective" === e ? (a = n, !0) : (9 === p && "rotateZ" === e && (e = "rotate"), void(r += e + n + " "))
                        }), a && (r = "perspective" + a + " " + r)
                    }
                    D.setPropertyValue(t, "transform", r)
                }
            };
            D.Hooks.register(), D.Normalizations.register(), B.hook = function(e, i, n) {
                var a = O;
                return e = h(e), W.each(e, function(e, t) {
                    if (R(t) === O && B.init(t), n === O) a === O && (a = B.CSS.getPropertyValue(t, i));
                    else {
                        var r = B.CSS.setPropertyValue(t, i, n);
                        "transform" === r[0] && B.CSS.flushTransformCache(t), a = r
                    }
                }), a
            };
            var g = function() {
                function e() {
                    return t ? H.promise || null : r
                }
                var t, r, i, $, T, A, n = arguments[0] && (arguments[0].p || W.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || M.isString(arguments[0].properties));
                if (M.isWrapped(this) ? (t = !1, i = 0, r = $ = this) : (t = !0, i = 1, $ = n ? arguments[0].elements || arguments[0].e : arguments[0]), $ = h($)) {
                    A = n ? (T = arguments[0].properties || arguments[0].p, arguments[0].options || arguments[0].o) : (T = arguments[i], arguments[i + 1]);
                    var F = $.length,
                        E = 0;
                    if (!/^(stop|finish|finishAll)$/i.test(T) && !W.isPlainObject(A)) {
                        A = {};
                        for (var a = i + 1; a < arguments.length; a++) M.isArray(arguments[a]) || !/^(fast|normal|slow)$/i.test(arguments[a]) && !/^\d/.test(arguments[a]) ? M.isString(arguments[a]) || M.isArray(arguments[a]) ? A.easing = arguments[a] : M.isFunction(arguments[a]) && (A.complete = arguments[a]) : A.duration = arguments[a]
                    }
                    var j, H = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    switch (t && B.Promise && (H.promise = new B.Promise(function(e, t) {
                        H.resolver = e, H.rejecter = t
                    })), T) {
                        case "scroll":
                            j = "scroll";
                            break;
                        case "reverse":
                            j = "reverse";
                            break;
                        case "finish":
                        case "finishAll":
                        case "stop":
                            W.each($, function(e, t) {
                                R(t) && R(t).delayTimer && (clearTimeout(R(t).delayTimer.setTimeout), R(t).delayTimer.next && R(t).delayTimer.next(), delete R(t).delayTimer), "finishAll" !== T || !0 !== A && !M.isString(A) || (W.each(W.queue(t, M.isString(A) ? A : ""), function(e, t) {
                                    M.isFunction(t) && t()
                                }), W.queue(t, M.isString(A) ? A : "", []))
                            });
                            var o = [];
                            return W.each(B.State.calls, function(n, a) {
                                a && W.each(a[1], function(e, r) {
                                    var i = A === O ? "" : A;
                                    return !0 !== i && a[2].queue !== i && (A !== O || !1 !== a[2].queue) || void W.each($, function(e, t) {
                                        t === r && ((!0 === A || M.isString(A)) && (W.each(W.queue(t, M.isString(A) ? A : ""), function(e, t) {
                                            M.isFunction(t) && t(null, !0)
                                        }), W.queue(t, M.isString(A) ? A : "", [])), "stop" === T ? (R(t) && R(t).tweensContainer && !1 !== i && W.each(R(t).tweensContainer, function(e, t) {
                                            t.endValue = t.currentValue
                                        }), o.push(n)) : ("finish" === T || "finishAll" === T) && (a[2].duration = 1))
                                    })
                                })
                            }), "stop" === T && (W.each(o, function(e, t) {
                                P(t, !0)
                            }), H.promise && H.resolver($)), e();
                        default:
                            if (!W.isPlainObject(T) || M.isEmptyObject(T)) {
                                if (M.isString(T) && B.Redirects[T]) {
                                    var s = (p = W.extend({}, A)).duration,
                                        l = p.delay || 0;
                                    return !0 === p.backwards && ($ = W.extend(!0, [], $).reverse()), W.each($, function(e, t) {
                                        parseFloat(p.stagger) ? p.delay = l + parseFloat(p.stagger) * e : M.isFunction(p.stagger) && (p.delay = l + p.stagger.call(t, e, F)), p.drag && (p.duration = parseFloat(s) || (/^(callout|transition)/.test(T) ? 1e3 : 400), p.duration = Math.max(p.duration * (p.backwards ? 1 - e / F : (e + 1) / F), .75 * p.duration, 200)), B.Redirects[T].call(t, t, p || {}, e, F, $, H.promise ? H : O)
                                    }), e()
                                }
                                var c = "Velocity: First argument (" + T + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return H.promise ? H.rejecter(new Error(c)) : console.log(c), e()
                            }
                            j = "start"
                    }
                    var u, p, N = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        _ = [];
                    if (W.each($, function(e, t) {
                            M.isNode(t) && function() {
                                function r() {
                                    function p(e, t) {
                                        var r = O,
                                            i = O,
                                            n = O;
                                        return M.isArray(e) ? (r = e[0], !M.isArray(e[1]) && /^[\d-]/.test(e[1]) || M.isFunction(e[1]) || D.RegEx.isHex.test(e[1]) ? n = e[1] : (M.isString(e[1]) && !D.RegEx.isHex.test(e[1]) || M.isArray(e[1])) && (i = t ? e[1] : I(e[1], V.duration), e[2] !== O && (n = e[2]))) : r = e, t || (i = i || V.easing), M.isFunction(r) && (r = r.call(P, E, F)), M.isFunction(n) && (n = n.call(P, E, F)), [r || 0, i, n]
                                    }

                                    function e(e, t) {
                                        var r, i;
                                        return i = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                            return r = e, ""
                                        }), r || (r = D.Values.getUnitType(e)), [i, r]
                                    }

                                    function t() {
                                        var e = {
                                                myParent: P.parentNode || z.body,
                                                position: D.getPropertyValue(P, "position"),
                                                fontSize: D.getPropertyValue(P, "fontSize")
                                            },
                                            t = e.position === N.lastPosition && e.myParent === N.lastParent,
                                            r = e.fontSize === N.lastFontSize;
                                        N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;
                                        var i = {};
                                        if (r && t) i.emToPx = N.lastEmToPx, i.percentToPxWidth = N.lastPercentToPxWidth, i.percentToPxHeight = N.lastPercentToPxHeight;
                                        else {
                                            var n = R(P).isSVG ? z.createElementNS("http://www.w3.org/2000/svg", "rect") : z.createElement("div");
                                            B.init(n), e.myParent.appendChild(n), W.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                                B.CSS.setPropertyValue(n, t, "hidden")
                                            }), B.CSS.setPropertyValue(n, "position", e.position), B.CSS.setPropertyValue(n, "fontSize", e.fontSize), B.CSS.setPropertyValue(n, "boxSizing", "content-box"), W.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                                B.CSS.setPropertyValue(n, t, "100%")
                                            }), B.CSS.setPropertyValue(n, "paddingLeft", "100em"), i.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(D.getPropertyValue(n, "width", null, !0)) || 1) / 100, i.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(D.getPropertyValue(n, "height", null, !0)) || 1) / 100, i.emToPx = N.lastEmToPx = (parseFloat(D.getPropertyValue(n, "paddingLeft")) || 1) / 100, e.myParent.removeChild(n)
                                        }
                                        return null === N.remToPx && (N.remToPx = parseFloat(D.getPropertyValue(z.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(L.innerWidth) / 100, N.vhToPx = parseFloat(L.innerHeight) / 100), i.remToPx = N.remToPx, i.vwToPx = N.vwToPx, i.vhToPx = N.vhToPx, 1 <= B.debug && console.log("Unit ratios: " + JSON.stringify(i), P), i
                                    }
                                    if (V.begin && 0 === E) try {
                                        V.begin.call($, $)
                                    } catch (e) {
                                        setTimeout(function() {
                                            throw e
                                        }, 1)
                                    }
                                    if ("scroll" === j) {
                                        var r, i, n, a = /^x$/i.test(V.axis) ? "Left" : "Top",
                                            o = parseFloat(V.offset) || 0;
                                        V.container ? M.isWrapped(V.container) || M.isNode(V.container) ? (V.container = V.container[0] || V.container, n = (r = V.container["scroll" + a]) + W(P).position()[a.toLowerCase()] + o) : V.container = null : (r = B.State.scrollAnchor[B.State["scrollProperty" + a]], i = B.State.scrollAnchor[B.State["scrollProperty" + ("Left" === a ? "Top" : "Left")]], n = W(P).offset()[a.toLowerCase()] + o), k = {
                                            scroll: {
                                                rootPropertyValue: !1,
                                                startValue: r,
                                                currentValue: r,
                                                endValue: n,
                                                unitType: "",
                                                easing: V.easing,
                                                scrollData: {
                                                    container: V.container,
                                                    direction: a,
                                                    alternateValue: i
                                                }
                                            },
                                            element: P
                                        }, B.debug && console.log("tweensContainer (scroll): ", k.scroll, P)
                                    } else if ("reverse" === j) {
                                        if (!R(P).tweensContainer) return void W.dequeue(P, V.queue);
                                        "none" === R(P).opts.display && (R(P).opts.display = "auto"), "hidden" === R(P).opts.visibility && (R(P).opts.visibility = "visible"), R(P).opts.loop = !1, R(P).opts.begin = null, R(P).opts.complete = null, A.easing || delete V.easing, A.duration || delete V.duration, V = W.extend({}, R(P).opts, V);
                                        var s = W.extend(!0, {}, R(P).tweensContainer);
                                        for (var l in s)
                                            if ("element" !== l) {
                                                var c = s[l].startValue;
                                                s[l].startValue = s[l].currentValue = s[l].endValue, s[l].endValue = c, M.isEmptyObject(A) || (s[l].easing = V.easing), B.debug && console.log("reverse tweensContainer (" + l + "): " + JSON.stringify(s[l]), P)
                                            }
                                        k = s
                                    } else if ("start" === j) {
                                        for (var u in R(P).tweensContainer && !0 === R(P).isAnimating && (s = R(P).tweensContainer), W.each(T, function(e, t) {
                                                if (RegExp("^" + D.Lists.colors.join("$|^") + "$").test(e)) {
                                                    var r = p(t, !0),
                                                        i = r[0],
                                                        n = r[1],
                                                        a = r[2];
                                                    if (D.RegEx.isHex.test(i)) {
                                                        for (var o = ["Red", "Green", "Blue"], s = D.Values.hexToRgb(i), l = a ? D.Values.hexToRgb(a) : O, c = 0; c < o.length; c++) {
                                                            var u = [s[c]];
                                                            n && u.push(n), l !== O && u.push(l[c]), T[e + o[c]] = u
                                                        }
                                                        delete T[e]
                                                    }
                                                }
                                            }), T) {
                                            var d = p(T[u]),
                                                f = d[0],
                                                h = d[1],
                                                g = d[2];
                                            u = D.Names.camelCase(u);
                                            var m = D.Hooks.getRoot(u),
                                                y = !1;
                                            if (R(P).isSVG || "tween" === m || !1 !== D.Names.prefixCheck(m)[1] || D.Normalizations.registered[m] !== O) {
                                                (V.display !== O && null !== V.display && "none" !== V.display || V.visibility !== O && "hidden" !== V.visibility) && /opacity|filter/.test(u) && !g && 0 !== f && (g = 0), V._cacheValues && s && s[u] ? (g === O && (g = s[u].endValue + s[u].unitType), y = R(P).rootPropertyValueCache[m]) : D.Hooks.registered[u] ? g === O ? (y = D.getPropertyValue(P, m), g = D.getPropertyValue(P, u, y)) : y = D.Hooks.templates[m][1] : g === O && (g = D.getPropertyValue(P, u));
                                                var v, b, x, w = !1;
                                                if (g = (v = e(u, g))[0], x = v[1], f = (v = e(u, f))[0].replace(/^([+-\/*])=/, function(e, t) {
                                                        return w = t, ""
                                                    }), b = v[1], g = parseFloat(g) || 0, f = parseFloat(f) || 0, "%" === b && (/^(fontSize|lineHeight)$/.test(u) ? (f /= 100, b = "em") : /^scale/.test(u) ? (f /= 100, b = "") : /(Red|Green|Blue)$/i.test(u) && (f = f / 100 * 255, b = "")), /[\/*]/.test(w)) b = x;
                                                else if (x !== b && 0 !== g)
                                                    if (0 === f) b = x;
                                                    else {
                                                        C = C || t();
                                                        var S = /margin|padding|left|right|width|text|word|letter/i.test(u) || /X$/.test(u) || "x" === u ? "x" : "y";
                                                        switch (x) {
                                                            case "%":
                                                                g *= "x" === S ? C.percentToPxWidth : C.percentToPxHeight;
                                                                break;
                                                            case "px":
                                                                break;
                                                            default:
                                                                g *= C[x + "ToPx"]
                                                        }
                                                        switch (b) {
                                                            case "%":
                                                                g *= 1 / ("x" === S ? C.percentToPxWidth : C.percentToPxHeight);
                                                                break;
                                                            case "px":
                                                                break;
                                                            default:
                                                                g *= 1 / C[b + "ToPx"]
                                                        }
                                                    }
                                                switch (w) {
                                                    case "+":
                                                        f = g + f;
                                                        break;
                                                    case "-":
                                                        f = g - f;
                                                        break;
                                                    case "*":
                                                        f *= g;
                                                        break;
                                                    case "/":
                                                        f = g / f
                                                }
                                                k[u] = {
                                                    rootPropertyValue: y,
                                                    startValue: g,
                                                    currentValue: g,
                                                    endValue: f,
                                                    unitType: b,
                                                    easing: h
                                                }, B.debug && console.log("tweensContainer (" + u + "): " + JSON.stringify(k[u]), P)
                                            } else B.debug && console.log("Skipping [" + m + "] due to a lack of browser support.")
                                        }
                                        k.element = P
                                    }
                                    k.element && (D.Values.addClass(P, "velocity-animating"), _.push(k), "" === V.queue && (R(P).tweensContainer = k, R(P).opts = V), R(P).isAnimating = !0, E === F - 1 ? (B.State.calls.push([_, $, V, null, H.resolver]), !1 === B.State.isTicking && (B.State.isTicking = !0, q())) : E++)
                                }
                                var C, P = this,
                                    V = W.extend({}, B.defaults, A),
                                    k = {};
                                switch (R(P) === O && B.init(P), parseFloat(V.delay) && !1 !== V.queue && W.queue(P, V.queue, function(e) {
                                    B.velocityQueueEntryFlag = !0, R(P).delayTimer = {
                                        setTimeout: setTimeout(e, parseFloat(V.delay)),
                                        next: e
                                    }
                                }), V.duration.toString().toLowerCase()) {
                                    case "fast":
                                        V.duration = 200;
                                        break;
                                    case "normal":
                                        V.duration = 400;
                                        break;
                                    case "slow":
                                        V.duration = 600;
                                        break;
                                    default:
                                        V.duration = parseFloat(V.duration) || 1
                                }!1 !== B.mock && (!0 === B.mock ? V.duration = V.delay = 1 : (V.duration *= parseFloat(B.mock) || 1, V.delay *= parseFloat(B.mock) || 1)), V.easing = I(V.easing, V.duration), V.begin && !M.isFunction(V.begin) && (V.begin = null), V.progress && !M.isFunction(V.progress) && (V.progress = null), V.complete && !M.isFunction(V.complete) && (V.complete = null), V.display !== O && null !== V.display && (V.display = V.display.toString().toLowerCase(), "auto" === V.display && (V.display = B.CSS.Values.getDisplayType(P))), V.visibility !== O && null !== V.visibility && (V.visibility = V.visibility.toString().toLowerCase()), V.mobileHA = V.mobileHA && B.State.isMobile && !B.State.isGingerbread, !1 === V.queue ? V.delay ? setTimeout(r, V.delay) : r() : W.queue(P, V.queue, function(e, t) {
                                    return !0 === t ? (H.promise && H.resolver($), !0) : (B.velocityQueueEntryFlag = !0, void r())
                                }), "" !== V.queue && "fx" !== V.queue || "inprogress" === W.queue(P)[0] || W.dequeue(P)
                            }.call(t)
                        }), (p = W.extend({}, B.defaults, A)).loop = parseInt(p.loop), u = 2 * p.loop - 1, p.loop)
                        for (var d = 0; d < u; d++) {
                            var f = {
                                delay: p.delay,
                                progress: p.progress
                            };
                            d === u - 1 && (f.display = p.display, f.visibility = p.visibility, f.complete = p.complete), g($, "reverse", f)
                        }
                    return e()
                }
            };
            (B = W.extend(g, B)).animate = g;
            var V = L.requestAnimationFrame || t;
            return B.State.isMobile || z.hidden === O || z.addEventListener("visibilitychange", function() {
                z.hidden ? (V = function(e) {
                    return setTimeout(function() {
                        e(!0)
                    }, 16)
                }, q()) : V = L.requestAnimationFrame || t
            }), e.Velocity = B, e !== L && (e.fn.velocity = g, e.fn.velocity.defaults = B.defaults), W.each(["Down", "Up"], function(e, p) {
                B.Redirects["slide" + p] = function(r, e, t, i, n, a) {
                    var o = W.extend({}, e),
                        s = o.begin,
                        l = o.complete,
                        c = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        u = {};
                    o.display === O && (o.display = "Down" === p ? "inline" === B.CSS.Values.getDisplayType(r) ? "inline-block" : "block" : "none"), o.begin = function() {
                        for (var e in s && s.call(n, n), c) {
                            u[e] = r.style[e];
                            var t = B.CSS.getPropertyValue(r, e);
                            c[e] = "Down" === p ? [t, 0] : [0, t]
                        }
                        u.overflow = r.style.overflow, r.style.overflow = "hidden"
                    }, o.complete = function() {
                        for (var e in u) r.style[e] = u[e];
                        l && l.call(n, n), a && a.resolver(n)
                    }, B(r, c, o)
                }
            }), W.each(["In", "Out"], function(e, c) {
                B.Redirects["fade" + c] = function(e, t, r, i, n, a) {
                    var o = W.extend({}, t),
                        s = {
                            opacity: "In" === c ? 1 : 0
                        },
                        l = o.complete;
                    o.complete = r !== i - 1 ? o.begin = null : function() {
                        l && l.call(n, n), a && a.resolver(n)
                    }, o.display === O && (o.display = "In" === c ? "auto" : "none"), B(this, s, o)
                }
            }), B
        }
        jQuery.fn.velocity = jQuery.fn.animate
    }(window.jQuery || window.Zepto || window, window, document)
}), $(document).ready(function() {
        0 < $("nav.accordian").length && ($("nav.accordian").find("ul").children("li").has("ul").each(function() {
            $(this).children("a").append('<span class="accordian_toggle"></span>'), $(this).hasClass("nav__list--here") && ($(this).addClass("accordian_open"), $(this).closest("li").children("ul").slideDown())
        }), $("span.accordian_toggle").click(function(e) {
            e.preventDefault(), $(this).closest("li").hasClass("accordian_open") ? $(this).closest("li").removeClass("accordian_open").children("ul").slideUp() : ($(this).closest("li").siblings().removeClass("accordian_open").children("ul").slideUp(), $(this).closest("li").addClass("accordian_open"), $(this).closest("li").children("ul").slideDown())
        }))
    }),
    function(n, r, t, e) {
        function i(e, t, r) {
            this.$el = n(e), this.selector = r;
            var i = {
                activeClass: "desktop-nav-is-too-wide",
                children: [],
                childrenWidth: 0,
                targets: [n("body")],
                minWidth: 0
            };
            this.options = n.extend({}, i, t), this.init()
        }
        var a = "navChecker";
        i.prototype = {
            init: function() {
                var e = this;
                0 === e.options.children.length && e.options.children.push(e.$el.children()), e.initEvents(), e.checkSize()
            },
            initEvents: function() {
                var e = this;
                n(r).resize(function() {
                    e.checkSize()
                }), n(r).on("load", function() {
                    e.getChildren(), e.checkSize()
                }), n(t).ready(function() {
                    e.checkSize()
                })
            },
            getChildren: function() {
                var r = this;
                r.options.childrenWidth = 0, n.each(r.options.children, function(e, t) {
                    t.each(function() {
                        r.options.childrenWidth += n(this).outerWidth()
                    })
                })
            },
            checkSize: function() {
                var e = this,
                    t = e.$el.width();
                n(r).width() > e.options.minWidth ? e.options.childrenWidth >= t ? e.updateClasses("add") : e.updateClasses("remove") : e.updateClasses("add")
            },
            updateClasses: function(r) {
                var i = this;
                n.each(i.options.targets, function(e, t) {
                    "remove" == r ? t.removeClass(i.options.activeClass) : t.addClass(i.options.activeClass)
                })
            }
        }, n.fn[a] = function(e) {
            var t = this.selector;
            return this.each(function() {
                n.data(this, a) || n.data(this, a, new i(this, e, t))
            })
        }
    }(jQuery, window, document), init($(".featured-container li")), init($(".secondary-container")), init($(".logos-container li")), init($(".news-container .news-article")), init($(".email-marketing-container .wrap"), 0), checkum(), $(window).scroll(function() {
        checkum()
    }), 1 < $(".spotlight-container ul > li").length && $(".spotlight-container ul").each(function() {
        $(this).fireSlider({
            delay: 8e3,
            hoverPause: !0,
            pager: $(".spotlight-container .slider-controls-pager")
        })
    }), $(document).ready(function() {
        landingImage($(".has-bg-landing"), "center center / cover no-repeat")
    }), $(window).on("load", function() {
        document.body.classList.add("window_loaded"), document.body.classList.remove("window_loading")
    }), $(document).keyup(function(e) {
        27 == e.keyCode && ($(".mobile-is-visible").removeClass("mobile-is-visible"), $(".search-is-visible").removeClass("search-is-visible"))
    }), $(document).ready(function() {
        backgroundImage($(".has-bg"), "center center / cover no-repeat", 2), backgroundImage($(".has-bg__collection li"), "center center / cover no-repeat", 2), backgroundImage($(".has-bg-li__collection li .collection-item-image"), "center center / cover no-repeat", 1), updateValue($(".search-block input"), "Search"), placeHolders(".e2ma_signup_form form"), $(".header .wrap").navChecker(), bodyClassToggler(".search-trigger", "search-is-visible"), bodyClassToggler(".mobile-trigger", "mobile-is-visible"), $(".mobile-open").on("click", function() {
            $(".mobile-nav-container").css("padding-top", $(".header").outerHeight())
        }), $("#e2ma_signup_submit_button").attr("value", "Sign Up"), $(".featured-container li").each(function() {
            var e = $(this).find("a").attr("href");
            e && $(this).wrapInner('<a href="' + e + '" class="featured-link"></a>')
        }), $(".news-article").each(function() {
            var e = $(this).find(".news-article-title a").attr("href");
            e && $(this).find(".news-article-header").append('<a class="read-more-link" href="' + e + '"><i class="fa fa-newspaper-o"></i></a>')
        })
    });