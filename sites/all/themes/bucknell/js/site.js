(function(a, g) {
    function h(b) {
        var d = b.length,
            k = e.type(b);
        return e.isWindow(b) ? !1 : 1 === b.nodeType && d ? !0 : "array" === k || "function" !== k && (0 === d || "number" == typeof d && 0 < d && d - 1 in b)
    }

    function m(b) {
        var d = Za[b] = {};
        return e.each(b.match(T) || [], function(b, e) {
            d[e] = !0
        }), d
    }

    function v(b, d, k, a) {
        if (e.acceptData(b)) {
            var q, c, z = e.expando,
                f = b.nodeType,
                l = f ? e.cache : b,
                h = f ? b[z] : b[z] && z;
            if (h && l[h] && (a || l[h].data) || k !== g || "string" != typeof d) return h || (h = f ? b[z] = ra.pop() || e.guid++ : z), l[h] || (l[h] = f ? {} : {
                toJSON: e.noop
            }), ("object" ==
                typeof d || "function" == typeof d) && (a ? l[h] = e.extend(l[h], d) : l[h].data = e.extend(l[h].data, d)), c = l[h], a || (c.data || (c.data = {}), c = c.data), k !== g && (c[e.camelCase(d)] = k), "string" == typeof d ? (q = c[d], null == q && (q = c[e.camelCase(d)])) : q = c, q
        }
    }

    function w(b, d, k) {
        if (e.acceptData(b)) {
            var a, c, r = b.nodeType,
                z = r ? e.cache : b,
                f = r ? b[e.expando] : e.expando;
            if (z[f]) {
                if (d && (a = k ? z[f] : z[f].data)) {
                    e.isArray(d) ? d = d.concat(e.map(d, e.camelCase)) : d in a ? d = [d] : (d = e.camelCase(d), d = d in a ? [d] : d.split(" "));
                    for (c = d.length; c--;) delete a[d[c]];
                    if (k ? !n(a) : !e.isEmptyObject(a)) return
                }(k || (delete z[f].data, n(z[f]))) && (r ? e.cleanData([b], !0) : e.support.deleteExpando || z != z.window ? delete z[f] : z[f] = null)
            }
        }
    }

    function u(b, d, k) {
        if (k === g && 1 === b.nodeType) {
            var a = "data-" + d.replace(Db, "-$1").toLowerCase();
            if (k = b.getAttribute(a), "string" == typeof k) {
                try {
                    k = "true" === k ? !0 : "false" === k ? !1 : "null" === k ? null : +k + "" === k ? +k : Eb.test(k) ? e.parseJSON(k) : k
                } catch (x) {}
                e.data(b, d, k)
            } else k = g
        }
        return k
    }

    function n(b) {
        for (var d in b)
            if (("data" !== d || !e.isEmptyObject(b[d])) && "toJSON" !==
                d) return !1;
        return !0
    }

    function F() {
        return !0
    }

    function y() {
        return !1
    }

    function G() {
        try {
            return D.activeElement
        } catch (b) {}
    }

    function t(b, d) {
        do b = b[d]; while (b && 1 !== b.nodeType);
        return b
    }

    function H(b, d, k) {
        if (e.isFunction(d)) return e.grep(b, function(b, e) {
            return !!d.call(b, e, b) !== k
        });
        if (d.nodeType) return e.grep(b, function(b) {
            return b === d !== k
        });
        if ("string" == typeof d) {
            if (Fb.test(d)) return e.filter(d, b, k);
            d = e.filter(d, b)
        }
        return e.grep(b, function(b) {
            return 0 <= e.inArray(b, d) !== k
        })
    }

    function I(b) {
        var d = $a.split("|");
        b =
            b.createDocumentFragment();
        if (b.createElement)
            for (; d.length;) b.createElement(d.pop());
        return b
    }

    function K(b, d) {
        return e.nodeName(b, "table") && e.nodeName(1 === d.nodeType ? d : d.firstChild, "tr") ? b.getElementsByTagName("tbody")[0] || b.appendChild(b.ownerDocument.createElement("tbody")) : b
    }

    function C(b) {
        return b.type = (null !== e.find.attr(b, "type")) + "/" + b.type, b
    }

    function p(b) {
        var d = Gb.exec(b.type);
        return d ? b.type = d[1] : b.removeAttribute("type"), b
    }

    function J(b, d) {
        for (var k, a = 0; null != (k = b[a]); a++) e._data(k, "globalEval", !d || e._data(d[a], "globalEval"))
    }

    function M(b, d) {
        if (1 === d.nodeType && e.hasData(b)) {
            var k, a, c;
            a = e._data(b);
            var r = e._data(d, a),
                f = a.events;
            if (f)
                for (k in delete r.handle, r.events = {}, f)
                    for (a = 0, c = f[k].length; c > a; a++) e.event.add(d, k, f[k][a]);
            r.data && (r.data = e.extend({}, r.data))
        }
    }

    function f(b, d) {
        var k, a, c = 0,
            r = typeof b.getElementsByTagName !== fa ? b.getElementsByTagName(d || "*") : typeof b.querySelectorAll !== fa ? b.querySelectorAll(d || "*") : g;
        if (!r)
            for (r = [], k = b.childNodes || b; null != (a = k[c]); c++) !d || e.nodeName(a, d) ? r.push(a) :
                e.merge(r, f(a, d));
        return d === g || d && e.nodeName(b, d) ? e.merge([b], r) : r
    }

    function S(b) {
        La.test(b.type) && (b.defaultChecked = b.checked)
    }

    function L(b, d) {
        if (d in b) return d;
        for (var e = d.charAt(0).toUpperCase() + d.slice(1), a = d, c = ab.length; c--;)
            if (d = ab[c] + e, d in b) return d;
        return a
    }

    function E(b, d) {
        return b = d || b, "none" === e.css(b, "display") || !e.contains(b.ownerDocument, b)
    }

    function U(b, d) {
        for (var k, a, c, r = [], f = 0, g = b.length; g > f; f++) a = b[f], a.style && (r[f] = e._data(a, "olddisplay"), k = a.style.display, d ? (r[f] || "none" !== k ||
            (a.style.display = ""), "" === a.style.display && E(a) && (r[f] = e._data(a, "olddisplay", Q(a.nodeName)))) : r[f] || (c = E(a), (k && "none" !== k || !c) && e._data(a, "olddisplay", c ? k : e.css(a, "display"))));
        for (f = 0; g > f; f++) a = b[f], a.style && (d && "none" !== a.style.display && "" !== a.style.display || (a.style.display = d ? r[f] || "" : "none"));
        return b
    }

    function aa(b, d, e) {
        return (b = Hb.exec(d)) ? Math.max(0, b[1] - (e || 0)) + (b[2] || "px") : d
    }

    function c(b, d, k, a, c) {
        d = k === (a ? "border" : "content") ? 4 : "width" === d ? 1 : 0;
        for (var q = 0; 4 > d; d += 2) "margin" === k && (q += e.css(b,
            k + ha[d], !0, c)), a ? ("content" === k && (q -= e.css(b, "padding" + ha[d], !0, c)), "margin" !== k && (q -= e.css(b, "border" + ha[d] + "Width", !0, c))) : (q += e.css(b, "padding" + ha[d], !0, c), "padding" !== k && (q += e.css(b, "border" + ha[d] + "Width", !0, c)));
        return q
    }

    function sa(b, d, k) {
        var a = !0,
            x = "width" === d ? b.offsetWidth : b.offsetHeight,
            r = Z(b),
            f = e.support.boxSizing && "border-box" === e.css(b, "boxSizing", !1, r);
        if (0 >= x || null == x) {
            if (x = ia(b, d, r), (0 > x || null == x) && (x = b.style[d]), Ba.test(x)) return x;
            a = f && (e.support.boxSizingReliable || x === b.style[d]);
            x = parseFloat(x) || 0
        }
        return x + c(b, d, k || (f ? "border" : "content"), a, r) + "px"
    }

    function Q(b) {
        var d = D,
            k = bb[b];
        return k || (k = V(b, d), "none" !== k && k || (ja = (ja || e("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(d.documentElement), d = (ja[0].contentWindow || ja[0].contentDocument).document, d.write("<!doctype html><html><body>"), d.close(), k = V(b, d), ja.detach()), bb[b] = k), k
    }

    function V(b, d) {
        var k = e(d.createElement(b)).appendTo(d.body),
            a = e.css(k[0], "display");
        return k.remove(),
            a
    }

    function B(b, d, k, a) {
        var c;
        if (e.isArray(d)) e.each(d, function(d, e) {
            k || Ib.test(b) ? a(b, e) : B(b + "[" + ("object" == typeof e ? d : "") + "]", e, k, a)
        });
        else if (k || "object" !== e.type(d)) a(b, d);
        else
            for (c in d) B(b + "[" + c + "]", d[c], k, a)
    }

    function l(b) {
        return function(d, k) {
            "string" != typeof d && (k = d, d = "*");
            var a, c = 0,
                r = d.toLowerCase().match(T) || [];
            if (e.isFunction(k))
                for (; a = r[c++];) "+" === a[0] ? (a = a.slice(1) || "*", (b[a] = b[a] || []).unshift(k)) : (b[a] = b[a] || []).push(k)
        }
    }

    function A(b, d, k, a) {
        function c(x) {
            var r;
            return q[x] = !0, e.each(b[x] || [], function(b, e) {
                var x = e(d, k, a);
                return "string" != typeof x || f || q[x] ? f ? !(r = x) : g : (d.dataTypes.unshift(x), c(x), !1)
            }), r
        }
        var q = {},
            f = b === Ma;
        return c(d.dataTypes[0]) || !q["*"] && c("*")
    }

    function N(b, d) {
        var k, a, c = e.ajaxSettings.flatOptions || {};
        for (a in d) d[a] !== g && ((c[a] ? b : k || (k = {}))[a] = d[a]);
        return k && e.extend(!0, b, k), b
    }

    function O() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function ka() {
        return setTimeout(function() {
            la = g
        }), la = e.now()
    }

    function oa(b, d, e) {
        for (var k, a = (pa[d] || []).concat(pa["*"]), c = 0, f = a.length; f >
            c; c++)
            if (k = a[c].call(e, d, b)) return k
    }

    function ta(b, d, k) {
        var a, c = 0,
            f = Ca.length,
            z = e.Deferred().always(function() {
                delete g.elem
            }),
            g = function() {
                if (a) return !1;
                for (var d = la || ka(), d = Math.max(0, l.startTime + l.duration - d), e = 1 - (d / l.duration || 0), k = 0, c = l.tweens.length; c > k; k++) l.tweens[k].run(e);
                return z.notifyWith(b, [l, e, d]), 1 > e && c ? d : (z.resolveWith(b, [l]), !1)
            },
            l = z.promise({
                elem: b,
                props: e.extend({}, d),
                opts: e.extend(!0, {
                    specialEasing: {}
                }, k),
                originalProperties: d,
                originalOptions: k,
                startTime: la || ka(),
                duration: k.duration,
                tweens: [],
                createTween: function(d, k) {
                    var a = e.Tween(b, l.opts, d, k, l.opts.specialEasing[d] || l.opts.easing);
                    return l.tweens.push(a), a
                },
                stop: function(d) {
                    var e = 0,
                        k = d ? l.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; k > e; e++) l.tweens[e].run(1);
                    return d ? z.resolveWith(b, [l, d]) : z.rejectWith(b, [l, d]), this
                }
            });
        k = l.props;
        for (Ea(k, l.opts.specialEasing); f > c; c++)
            if (d = Ca[c].call(l, b, k, l.opts)) return d;
        return e.map(k, oa, l), e.isFunction(l.opts.start) && l.opts.start.call(b, l), e.fx.timer(e.extend(g, {
                elem: b,
                anim: l,
                queue: l.opts.queue
            })),
            l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function Ea(b, d) {
        var k, a, c, f, z;
        for (k in b)
            if (a = e.camelCase(k), c = d[a], f = b[k], e.isArray(f) && (c = f[1], f = b[k] = f[0]), k !== a && (b[a] = f, delete b[k]), z = e.cssHooks[a], z && "expand" in z)
                for (k in f = z.expand(f), delete b[a], f) k in b || (b[k] = f[k], d[k] = c);
            else d[a] = c
    }

    function X(b, d, e, a, c) {
        return new X.prototype.init(b, d, e, a, c)
    }

    function ua(b, d) {
        var e, a = {
                height: b
            },
            c = 0;
        for (d = d ? 1 : 0; 4 > c; c += 2 - d) e = ha[c], a["margin" + e] = a["padding" +
            e] = b;
        return d && (a.opacity = a.width = b), a
    }

    function cb(b) {
        return e.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1
    }
    var Da, db, fa = typeof g,
        Jb = a.location,
        D = a.document,
        eb = D.documentElement,
        Kb = a.jQuery,
        Lb = a.$,
        Fa = {},
        ra = [],
        fb = ra.concat,
        Na = ra.push,
        ma = ra.slice,
        gb = ra.indexOf,
        Mb = Fa.toString,
        va = Fa.hasOwnProperty,
        Oa = "1.10.2".trim,
        e = function(b, d) {
            return new e.fn.init(b, d, db)
        },
        Ga = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = /\S+/g,
        Nb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Ob = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        hb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Pb = /^[\],:{}\s]*$/,
        Qb = /(?:^|:|,)(?:\s*\[)+/g,
        Rb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Sb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        Tb = /^-ms-/,
        Ub = /-([\da-z])/gi,
        Vb = function(b, d) {
            return d.toUpperCase()
        },
        na = function(b) {
            (D.addEventListener || "load" === b.type || "complete" === D.readyState) && (ib(), e.ready())
        },
        ib = function() {
            D.addEventListener ? (D.removeEventListener("DOMContentLoaded", na, !1), a.removeEventListener("load", na, !1)) : (D.detachEvent("onreadystatechange",
                na), a.detachEvent("onload", na))
        };
    e.fn = e.prototype = {
        jquery: "1.10.2",
        constructor: e,
        init: function(b, d, k) {
            var a, c;
            if (!b) return this;
            if ("string" == typeof b) {
                if (a = "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? [null, b, null] : Ob.exec(b), !a || !a[1] && d) return !d || d.jquery ? (d || k).find(b) : this.constructor(d).find(b);
                if (a[1]) {
                    if (d = d instanceof e ? d[0] : d, e.merge(this, e.parseHTML(a[1], d && d.nodeType ? d.ownerDocument || d : D, !0)), hb.test(a[1]) && e.isPlainObject(d))
                        for (a in d) e.isFunction(this[a]) ? this[a](d[a]) :
                            this.attr(a, d[a]);
                    return this
                }
                if (c = D.getElementById(a[2]), c && c.parentNode) {
                    if (c.id !== a[2]) return k.find(b);
                    this.length = 1;
                    this[0] = c
                }
                return this.context = D, this.selector = b, this
            }
            return b.nodeType ? (this.context = this[0] = b, this.length = 1, this) : e.isFunction(b) ? k.ready(b) : (b.selector !== g && (this.selector = b.selector, this.context = b.context), e.makeArray(b, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return ma.call(this)
        },
        get: function(b) {
            return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b]
        },
        pushStack: function(b) {
            b =
                e.merge(this.constructor(), b);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(b, d) {
            return e.each(this, b, d)
        },
        ready: function(b) {
            return e.ready.promise().done(b), this
        },
        slice: function() {
            return this.pushStack(ma.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(b) {
            var d = this.length;
            b = +b + (0 > b ? d : 0);
            return this.pushStack(0 <= b && d > b ? [this[b]] : [])
        },
        map: function(b) {
            return this.pushStack(e.map(this, function(d, e) {
                return b.call(d, e, d)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Na,
        sort: [].sort,
        splice: [].splice
    };
    e.fn.init.prototype = e.fn;
    e.extend = e.fn.extend = function() {
        var b, d, k, a, c, f, z = arguments[0] || {},
            l = 1,
            h = arguments.length,
            m = !1;
        "boolean" == typeof z && (m = z, z = arguments[1] || {}, l = 2);
        "object" == typeof z || e.isFunction(z) || (z = {});
        for (h === l && (z = this, --l); h > l; l++)
            if (null != (c = arguments[l]))
                for (a in c) b = z[a], k = c[a], z !== k && (m && k && (e.isPlainObject(k) || (d = e.isArray(k))) ? (d ? (d = !1, f = b && e.isArray(b) ? b : []) : f = b && e.isPlainObject(b) ?
                    b : {}, z[a] = e.extend(m, f, k)) : k !== g && (z[a] = k));
        return z
    };
    e.extend({
        expando: "jQuery" + ("1.10.2" + Math.random()).replace(/\D/g, ""),
        noConflict: function(b) {
            return a.$ === e && (a.$ = Lb), b && a.jQuery === e && (a.jQuery = Kb), e
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) {
            b ? e.readyWait++ : e.ready(!0)
        },
        ready: function(b) {
            if (!0 === b ? !--e.readyWait : !e.isReady) {
                if (!D.body) return setTimeout(e.ready);
                e.isReady = !0;
                !0 !== b && 0 < --e.readyWait || (Da.resolveWith(D, [e]), e.fn.trigger && e(D).trigger("ready").off("ready"))
            }
        },
        isFunction: function(b) {
            return "function" ===
                e.type(b)
        },
        isArray: Array.isArray || function(b) {
            return "array" === e.type(b)
        },
        isWindow: function(b) {
            return null != b && b == b.window
        },
        isNumeric: function(b) {
            return !isNaN(parseFloat(b)) && isFinite(b)
        },
        type: function(b) {
            return null == b ? b + "" : "object" == typeof b || "function" == typeof b ? Fa[Mb.call(b)] || "object" : typeof b
        },
        isPlainObject: function(b) {
            var d;
            if (!b || "object" !== e.type(b) || b.nodeType || e.isWindow(b)) return !1;
            try {
                if (b.constructor && !va.call(b, "constructor") && !va.call(b.constructor.prototype, "isPrototypeOf")) return !1
            } catch (k) {
                return !1
            }
            if (e.support.ownLast)
                for (d in b) return va.call(b,
                    d);
            for (d in b);
            return d === g || va.call(b, d)
        },
        isEmptyObject: function(b) {
            for (var d in b) return !1;
            return !0
        },
        error: function(b) {
            throw Error(b);
        },
        parseHTML: function(b, d, k) {
            if (!b || "string" != typeof b) return null;
            "boolean" == typeof d && (k = d, d = !1);
            d = d || D;
            var a = hb.exec(b);
            k = !k && [];
            return a ? [d.createElement(a[1])] : (a = e.buildFragment([b], d, k), k && e(k).remove(), e.merge([], a.childNodes))
        },
        parseJSON: function(b) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(b) : null === b ? b : "string" == typeof b && (b = e.trim(b), b && Pb.test(b.replace(Rb,
                "@").replace(Sb, "]").replace(Qb, ""))) ? Function("return " + b)() : (e.error("Invalid JSON: " + b), g)
        },
        parseXML: function(b) {
            var d, k;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? (k = new DOMParser, d = k.parseFromString(b, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(b))
            } catch (q) {
                d = g
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || e.error("Invalid XML: " + b), d
        },
        noop: function() {},
        globalEval: function(b) {
            b && e.trim(b) && (a.execScript || function(b) {
                a.eval.call(a,
                    b)
            })(b)
        },
        camelCase: function(b) {
            return b.replace(Tb, "ms-").replace(Ub, Vb)
        },
        nodeName: function(b, d) {
            return b.nodeName && b.nodeName.toLowerCase() === d.toLowerCase()
        },
        each: function(b, d, e) {
            var k, a = 0,
                c = b.length,
                f = h(b);
            if (e)
                if (f)
                    for (; c > a && (k = d.apply(b[a], e), !1 !== k); a++);
                else
                    for (a in b) {
                        if (k = d.apply(b[a], e), !1 === k) break
                    } else if (f)
                        for (; c > a && (k = d.call(b[a], a, b[a]), !1 !== k); a++);
                    else
                        for (a in b)
                            if (k = d.call(b[a], a, b[a]), !1 === k) break;
            return b
        },
        trim: Oa && !Oa.call("\ufeff\u00a0") ? function(b) {
            return null == b ? "" : Oa.call(b)
        } : function(b) {
            return null == b ? "" : (b + "").replace(Nb, "")
        },
        makeArray: function(b, d) {
            var k = d || [];
            return null != b && (h(Object(b)) ? e.merge(k, "string" == typeof b ? [b] : b) : Na.call(k, b)), k
        },
        inArray: function(b, d, e) {
            var a;
            if (d) {
                if (gb) return gb.call(d, b, e);
                a = d.length;
                for (e = e ? 0 > e ? Math.max(0, a + e) : e : 0; a > e; e++)
                    if (e in d && d[e] === b) return e
            }
            return -1
        },
        merge: function(b, d) {
            var e = d.length,
                a = b.length,
                c = 0;
            if ("number" == typeof e)
                for (; e > c; c++) b[a++] = d[c];
            else
                for (; d[c] !== g;) b[a++] = d[c++];
            return b.length = a, b
        },
        grep: function(b, d, e) {
            var a,
                k = [],
                c = 0,
                f = b.length;
            for (e = !!e; f > c; c++) a = !!d(b[c], c), e !== a && k.push(b[c]);
            return k
        },
        map: function(b, d, e) {
            var a, k = 0,
                c = b.length,
                f = [];
            if (h(b))
                for (; c > k; k++) a = d(b[k], k, e), null != a && (f[f.length] = a);
            else
                for (k in b) a = d(b[k], k, e), null != a && (f[f.length] = a);
            return fb.apply([], f)
        },
        guid: 1,
        proxy: function(b, d) {
            var a, c, f;
            return "string" == typeof d && (f = b[d], d = b, b = f), e.isFunction(b) ? (a = ma.call(arguments, 2), c = function() {
                return b.apply(d || this, a.concat(ma.call(arguments)))
            }, c.guid = b.guid = b.guid || e.guid++, c) : g
        },
        access: function(b,
            d, a, c, f, r, z) {
            var k = 0,
                q = b.length,
                x = null == a;
            if ("object" === e.type(a))
                for (k in f = !0, a) e.access(b, d, k, a[k], !0, r, z);
            else if (c !== g && (f = !0, e.isFunction(c) || (z = !0), x && (z ? (d.call(b, c), d = null) : (x = d, d = function(b, d, a) {
                    return x.call(e(b), a)
                })), d))
                for (; q > k; k++) d(b[k], a, z ? c : c.call(b[k], k, d(b[k], a)));
            return f ? b : x ? d.call(b) : q ? d(b[0], a) : r
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(b, d, e, a) {
            var k, c = {};
            for (k in d) c[k] = b.style[k], b.style[k] = d[k];
            e = e.apply(b, a || []);
            for (k in d) b.style[k] = c[k];
            return e
        }
    });
    e.ready.promise = function(b) {
        if (!Da)
            if (Da = e.Deferred(), "complete" === D.readyState) setTimeout(e.ready);
            else if (D.addEventListener) D.addEventListener("DOMContentLoaded", na, !1), a.addEventListener("load", na, !1);
        else {
            D.attachEvent("onreadystatechange", na);
            a.attachEvent("onload", na);
            var d = !1;
            try {
                d = null == a.frameElement && D.documentElement
            } catch (k) {}
            d && d.doScroll && function q() {
                if (!e.isReady) {
                    try {
                        d.doScroll("left")
                    } catch (x) {
                        return setTimeout(q, 50)
                    }
                    ib();
                    e.ready()
                }
            }()
        }
        return Da.promise(b)
    };
    e.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function(b, d) {
            Fa["[object " + d + "]"] = d.toLowerCase()
        });
    db = e(D);
    (function(b, d) {
        function a(b, d, e, a) {
            var k, c, q, f, x;
            if ((d ? d.ownerDocument || d : U) !== L && F(d), d = d || L, e = e || [], !b || "string" != typeof b) return e;
            if (1 !== (f = d.nodeType) && 9 !== f) return [];
            if (D && !a) {
                if (k = Aa.exec(b))
                    if (q = k[1])
                        if (9 === f) {
                            if (c = d.getElementById(q), !c || !c.parentNode) return e;
                            if (c.id === q) return e.push(c), e
                        } else {
                            if (d.ownerDocument && (c = d.ownerDocument.getElementById(q)) && ta(d, c) && c.id === q) return e.push(c), e
                        } else {
                    if (k[2]) return W.apply(e, d.getElementsByTagName(b)),
                        e;
                    if ((q = k[3]) && v.getElementsByClassName && d.getElementsByClassName) return W.apply(e, d.getElementsByClassName(q)), e
                }
                if (v.qsa && (!M || !M.test(b))) {
                    if (c = k = R, q = d, x = 9 === f && b, 1 === f && "object" !== d.nodeName.toLowerCase()) {
                        f = B(b);
                        (k = d.getAttribute("id")) ? c = k.replace(Da, "\\$&"): d.setAttribute("id", c);
                        c = "[id='" + c + "'] ";
                        for (q = f.length; q--;) f[q] = c + A(f[q]);
                        q = la.test(b) && d.parentNode || d;
                        x = f.join(",")
                    }
                    if (x) try {
                        return W.apply(e, q.querySelectorAll(x)), e
                    } catch (Cc) {} finally {
                        k || d.removeAttribute("id")
                    }
                }
            }
            var r;
            a: {
                b = b.replace(ea,
                    "$1");
                var g, z;
                c = B(b);
                if (!a && 1 === c.length) {
                    if (r = c[0] = c[0].slice(0), 2 < r.length && "ID" === (g = r[0]).type && v.getById && 9 === d.nodeType && D && y.relative[r[1].type]) {
                        if (d = (y.find.ID(g.matches[0].replace(wa, xa), d) || [])[0], !d) {
                            r = e;
                            break a
                        }
                        b = b.slice(r.shift().value.length)
                    }
                    for (f = ja.needsContext.test(b) ? 0 : r.length; f-- && (g = r[f], !y.relative[k = g.type]);)
                        if ((z = y.find[k]) && (a = z(g.matches[0].replace(wa, xa), la.test(r[0].type) && d.parentNode || d))) {
                            if (r.splice(f, 1), b = a.length && A(r), !b) {
                                r = (W.apply(e, a), e);
                                break a
                            }
                            break
                        }
                }
                r = (H(b,
                    c)(a, d, !D, e, la.test(b)), e)
            }
            return r
        }

        function c() {
            function b(e, a) {
                return d.push(e += " ") > y.cacheLength && delete b[d.shift()], b[e] = a
            }
            var d = [];
            return b
        }

        function f(b) {
            return b[R] = !0, b
        }

        function r(b) {
            var d = L.createElement("div");
            try {
                return !!b(d)
            } catch (P) {
                return !1
            } finally {
                d.parentNode && d.parentNode.removeChild(d)
            }
        }

        function g(b, d) {
            for (var e = b.split("|"), a = b.length; a--;) y.attrHandle[e[a]] = d
        }

        function l(b, d) {
            var e = d && b,
                a = e && 1 === b.nodeType && 1 === d.nodeType && (~d.sourceIndex || -2147483648) - (~b.sourceIndex || -2147483648);
            if (a) return a;
            if (e)
                for (; e = e.nextSibling;)
                    if (e === d) return -1;
            return b ? 1 : -1
        }

        function h(b) {
            return function(d) {
                return "input" === d.nodeName.toLowerCase() && d.type === b
            }
        }

        function m(b) {
            return function(d) {
                var e = d.nodeName.toLowerCase();
                return ("input" === e || "button" === e) && d.type === b
            }
        }

        function p(b) {
            return f(function(d) {
                return d = +d, f(function(e, a) {
                    for (var k, c = b([], e.length, d), q = c.length; q--;) e[k = c[q]] && (e[k] = !(a[k] = e[k]))
                })
            })
        }

        function ca() {}

        function B(b, d) {
            var e, k, c, q, f, x, r;
            if (f = Ea[b + " "]) return d ? 0 : f.slice(0);
            f =
                b;
            x = [];
            for (r = y.preFilter; f;) {
                e && !(k = ra.exec(f)) || (k && (f = f.slice(k[0].length) || f), x.push(c = []));
                e = !1;
                (k = sa.exec(f)) && (e = k.shift(), c.push({
                    value: e,
                    type: k[0].replace(ea, " ")
                }), f = f.slice(e.length));
                for (q in y.filter) !(k = ja[q].exec(f)) || r[q] && !(k = r[q](k)) || (e = k.shift(), c.push({
                    value: e,
                    type: q,
                    matches: k
                }), f = f.slice(e.length));
                if (!e) break
            }
            return d ? f.length : f ? a.error(b) : Ea(b, x).slice(0)
        }

        function A(b) {
            for (var d = 0, e = b.length, a = ""; e > d; d++) a += b[d].value;
            return a
        }

        function n(b, d, e) {
            var a = d.dir,
                k = e && "parentNode" ===
                a,
                c = X++;
            return d.first ? function(d, e, c) {
                for (; d = d[a];)
                    if (1 === d.nodeType || k) return b(d, e, c)
            } : function(d, e, f) {
                var q, x, r, g = qa + " " + c;
                if (f)
                    for (; d = d[a];) {
                        if ((1 === d.nodeType || k) && b(d, e, f)) return !0
                    } else
                        for (; d = d[a];)
                            if (1 === d.nodeType || k)
                                if (r = d[R] || (d[R] = {}), (x = r[a]) && x[0] === g) {
                                    if (!0 === (q = x[1]) || q === J) return !0 === q
                                } else if (x = r[a] = [g], x[1] = b(d, e, f) || J, !0 === x[1]) return !0
            }
        }

        function t(b) {
            return 1 < b.length ? function(d, e, a) {
                for (var k = b.length; k--;)
                    if (!b[k](d, e, a)) return !1;
                return !0
            } : b[0]
        }

        function u(b, d, e, a, k) {
            for (var c,
                    f = [], q = 0, x = b.length, r = null != d; x > q; q++)(c = b[q]) && (!e || e(c, a, k)) && (f.push(c), r && d.push(q));
            return f
        }

        function S(b, d, e, k, c, q) {
            return k && !k[R] && (k = S(k)), c && !c[R] && (c = S(c, q)), f(function(f, q, x, r) {
                var g, z, l = [],
                    da = [],
                    Y = q.length,
                    h;
                if (!(h = f)) {
                    h = d || "*";
                    for (var P = x.nodeType ? [x] : x, ca = [], p = 0, Wb = P.length; Wb > p; p++) a(h, P[p], ca);
                    h = ca
                }
                h = !b || !f && d ? h : u(h, l, b, x, r);
                P = e ? c || (f ? b : Y || k) ? [] : q : h;
                if (e && e(h, P, x, r), k)
                    for (g = u(P, da), k(g, [], x, r), x = g.length; x--;)(z = g[x]) && (P[da[x]] = !(h[da[x]] = z));
                if (f) {
                    if (c || b) {
                        if (c) {
                            g = [];
                            for (x = P.length; x--;)(z =
                                P[x]) && g.push(h[x] = z);
                            c(null, P = [], g, r)
                        }
                        for (x = P.length; x--;)(z = P[x]) && -1 < (g = c ? Z.call(f, z) : l[x]) && (f[g] = !(q[g] = z))
                    }
                } else P = u(P === q ? P.splice(Y, P.length) : P), c ? c(null, q, P, r) : W.apply(q, P)
            })
        }

        function G(b) {
            var d, e, a, k = b.length,
                c = y.relative[b[0].type];
            e = c || y.relative[" "];
            for (var f = c ? 1 : 0, q = n(function(b) {
                    return b === d
                }, e, !0), x = n(function(b) {
                    return -1 < Z.call(d, b)
                }, e, !0), r = [function(b, e, a) {
                    return !c && (a || e !== C) || ((d = e).nodeType ? q(b, e, a) : x(b, e, a))
                }]; k > f; f++)
                if (e = y.relative[b[f].type]) r = [n(t(r), e)];
                else {
                    if (e = y.filter[b[f].type].apply(null,
                            b[f].matches), e[R]) {
                        for (a = ++f; k > a && !y.relative[b[a].type]; a++);
                        return S(1 < f && t(r), 1 < f && A(b.slice(0, f - 1).concat({
                            value: " " === b[f - 2].type ? "*" : ""
                        })).replace(ea, "$1"), e, a > f && G(b.slice(f, a)), k > a && G(b = b.slice(a)), k > a && A(b))
                    }
                    r.push(e)
                }
            return t(r)
        }

        function N(b, d) {
            var e = 0,
                k = 0 < d.length,
                c = 0 < b.length,
                q = function(f, q, x, r, g) {
                    var z, l, da = [],
                        Y = 0,
                        h = "0",
                        P = f && [],
                        ca = null != g,
                        p = C,
                        m = f || c && y.find.TAG("*", g && q.parentNode || q),
                        B = qa += null == p ? 1 : Math.random() || .1;
                    for (ca && (C = q !== L && q, J = e); null != (g = m[h]); h++) {
                        if (c && g) {
                            for (z = 0; l = b[z++];)
                                if (l(g,
                                        q, x)) {
                                    r.push(g);
                                    break
                                }
                            ca && (qa = B, J = ++e)
                        }
                        k && ((g = !l && g) && Y--, f && P.push(g))
                    }
                    if (Y += h, k && h !== Y) {
                        for (z = 0; l = d[z++];) l(P, da, q, x);
                        if (f) {
                            if (0 < Y)
                                for (; h--;) P[h] || da[h] || (da[h] = fa.call(r));
                            da = u(da)
                        }
                        W.apply(r, da);
                        ca && !f && 0 < da.length && 1 < Y + d.length && a.uniqueSort(r)
                    }
                    return ca && (qa = B, C = p), P
                };
            return k ? f(q) : q
        }
        var w, v, J, y, K, E, H, C, O, F, L, I, D, M, ka, Ia, ta, R = "sizzle" + -new Date,
            U = b.document,
            qa = 0,
            X = 0,
            aa = c(),
            Ea = c(),
            Q = c(),
            oa = !1,
            ua = function(b, d) {
                return b === d ? (oa = !0, 0) : 0
            },
            V = typeof d,
            ba = {}.hasOwnProperty,
            T = [],
            fa = T.pop,
            na = T.push,
            W =
            T.push,
            ha = T.slice,
            Z = T.indexOf || function(b) {
                for (var d = 0, e = this.length; e > d; d++)
                    if (this[d] === b) return d;
                return -1
            },
            ia = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
            ma = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ia + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
            ga = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ma.replace(3, 8) + ")*)|.*)\\)|)",
            ea = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
                "g"),
            ra = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
            sa = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            la = /[\x20\t\r\n\f]*[+~]/,
            va = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"),
            ya = RegExp(ga),
            za = RegExp("^" + ia + "$"),
            ja = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: RegExp("^" + ma),
                PSEUDO: RegExp("^" + ga),
                CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
            },
            pa = /^[^{]+\{\s*\[native \w/,
            Aa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Ba = /^(?:input|select|textarea|button)$/i,
            Ca = /^h\d$/i,
            Da = /'|\\/g,
            wa = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"),
            xa = function(b, d,
                e) {
                b = "0x" + d - 65536;
                return b !== b || e ? d : 0 > b ? String.fromCharCode(b + 65536) : String.fromCharCode(55296 | b >> 10, 56320 | 1023 & b)
            };
        try {
            W.apply(T = ha.call(U.childNodes), U.childNodes), T[U.childNodes.length].nodeType
        } catch (da) {
            W = {
                apply: T.length ? function(b, d) {
                    na.apply(b, ha.call(d))
                } : function(b, d) {
                    for (var e = b.length, a = 0; b[e++] = d[a++];);
                    b.length = e - 1
                }
            }
        }
        E = a.isXML = function(b) {
            return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1
        };
        v = a.support = {};
        F = a.setDocument = function(b) {
            var e = b ? b.ownerDocument || b : U;
            b =
                e.defaultView;
            return e !== L && 9 === e.nodeType && e.documentElement ? (L = e, I = e.documentElement, D = !E(e), b && b.attachEvent && b !== b.top && b.attachEvent("onbeforeunload", function() {
                F()
            }), v.attributes = r(function(b) {
                return b.className = "i", !b.getAttribute("className")
            }), v.getElementsByTagName = r(function(b) {
                return b.appendChild(e.createComment("")), !b.getElementsByTagName("*").length
            }), v.getElementsByClassName = r(function(b) {
                return b.innerHTML = "<div class='a'></div><div class='a i'></div>", b.firstChild.className = "i",
                    2 === b.getElementsByClassName("i").length
            }), v.getById = r(function(b) {
                return I.appendChild(b).id = R, !e.getElementsByName || !e.getElementsByName(R).length
            }), v.getById ? (y.find.ID = function(b, d) {
                if (typeof d.getElementById !== V && D) {
                    var e = d.getElementById(b);
                    return e && e.parentNode ? [e] : []
                }
            }, y.filter.ID = function(b) {
                var d = b.replace(wa, xa);
                return function(b) {
                    return b.getAttribute("id") === d
                }
            }) : (delete y.find.ID, y.filter.ID = function(b) {
                var d = b.replace(wa, xa);
                return function(b) {
                    return (b = typeof b.getAttributeNode !==
                        V && b.getAttributeNode("id")) && b.value === d
                }
            }), y.find.TAG = v.getElementsByTagName ? function(b, e) {
                return typeof e.getElementsByTagName !== V ? e.getElementsByTagName(b) : d
            } : function(b, d) {
                var e, a = [],
                    k = 0,
                    c = d.getElementsByTagName(b);
                if ("*" === b) {
                    for (; e = c[k++];) 1 === e.nodeType && a.push(e);
                    return a
                }
                return c
            }, y.find.CLASS = v.getElementsByClassName && function(b, e) {
                return typeof e.getElementsByClassName !== V && D ? e.getElementsByClassName(b) : d
            }, ka = [], M = [], (v.qsa = pa.test(e.querySelectorAll)) && (r(function(b) {
                b.innerHTML = "<select><option selected=''></option></select>";
                b.querySelectorAll("[selected]").length || M.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                b.querySelectorAll(":checked").length || M.push(":checked")
            }), r(function(b) {
                var d = e.createElement("input");
                d.setAttribute("type", "hidden");
                b.appendChild(d).setAttribute("t", "");
                b.querySelectorAll("[t^='']").length && M.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                b.querySelectorAll(":enabled").length ||
                    M.push(":enabled", ":disabled");
                b.querySelectorAll("*,:x");
                M.push(",.*:")
            })), (v.matchesSelector = pa.test(Ia = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function(b) {
                v.disconnectedMatch = Ia.call(b, "div");
                Ia.call(b, "[s!='']:x");
                ka.push("!=", ga)
            }), M = M.length && RegExp(M.join("|")), ka = ka.length && RegExp(ka.join("|")), ta = pa.test(I.contains) || I.compareDocumentPosition ? function(b, d) {
                var e = 9 === b.nodeType ? b.documentElement : b,
                    a = d && d.parentNode;
                return b === a || !(!a || 1 !==
                    a.nodeType || !(e.contains ? e.contains(a) : b.compareDocumentPosition && 16 & b.compareDocumentPosition(a)))
            } : function(b, d) {
                if (d)
                    for (; d = d.parentNode;)
                        if (d === b) return !0;
                return !1
            }, ua = I.compareDocumentPosition ? function(b, d) {
                if (b === d) return oa = !0, 0;
                var a = d.compareDocumentPosition && b.compareDocumentPosition && b.compareDocumentPosition(d);
                return a ? 1 & a || !v.sortDetached && d.compareDocumentPosition(b) === a ? b === e || ta(U, b) ? -1 : d === e || ta(U, d) ? 1 : O ? Z.call(O, b) - Z.call(O, d) : 0 : 4 & a ? -1 : 1 : b.compareDocumentPosition ? -1 : 1
            } : function(b,
                d) {
                var a, k = 0;
                a = b.parentNode;
                var c = d.parentNode,
                    f = [b],
                    q = [d];
                if (b === d) return oa = !0, 0;
                if (!a || !c) return b === e ? -1 : d === e ? 1 : a ? -1 : c ? 1 : O ? Z.call(O, b) - Z.call(O, d) : 0;
                if (a === c) return l(b, d);
                for (a = b; a = a.parentNode;) f.unshift(a);
                for (a = d; a = a.parentNode;) q.unshift(a);
                for (; f[k] === q[k];) k++;
                return k ? l(f[k], q[k]) : f[k] === U ? -1 : q[k] === U ? 1 : 0
            }, e) : L
        };
        a.matches = function(b, d) {
            return a(b, null, null, d)
        };
        a.matchesSelector = function(b, d) {
            if ((b.ownerDocument || b) !== L && F(b), d = d.replace(va, "='$1']"), !(!v.matchesSelector || !D || ka && ka.test(d) ||
                    M && M.test(d))) try {
                var e = Ia.call(b, d);
                if (e || v.disconnectedMatch || b.document && 11 !== b.document.nodeType) return e
            } catch (Bc) {}
            return 0 < a(d, L, null, [b]).length
        };
        a.contains = function(b, d) {
            return (b.ownerDocument || b) !== L && F(b), ta(b, d)
        };
        a.attr = function(b, e) {
            (b.ownerDocument || b) !== L && F(b);
            var a = y.attrHandle[e.toLowerCase()],
                a = a && ba.call(y.attrHandle, e.toLowerCase()) ? a(b, e, !D) : d;
            return a === d ? v.attributes || !D ? b.getAttribute(e) : (a = b.getAttributeNode(e)) && a.specified ? a.value : null : a
        };
        a.error = function(b) {
            throw Error("Syntax error, unrecognized expression: " +
                b);
        };
        a.uniqueSort = function(b) {
            var d, e = [],
                a = 0,
                k = 0;
            if (oa = !v.detectDuplicates, O = !v.sortStable && b.slice(0), b.sort(ua), oa) {
                for (; d = b[k++];) d === b[k] && (a = e.push(k));
                for (; a--;) b.splice(e[a], 1)
            }
            return b
        };
        K = a.getText = function(b) {
            var d, e = "",
                a = 0;
            if (d = b.nodeType)
                if (1 === d || 9 === d || 11 === d) {
                    if ("string" == typeof b.textContent) return b.textContent;
                    for (b = b.firstChild; b; b = b.nextSibling) e += K(b)
                } else {
                    if (3 === d || 4 === d) return b.nodeValue
                } else
                for (; d = b[a]; a++) e += K(d);
            return e
        };
        y = a.selectors = {
            cacheLength: 50,
            createPseudo: f,
            match: ja,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(b) {
                    return b[1] = b[1].replace(wa, xa), b[3] = (b[4] || b[5] || "").replace(wa, xa), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
                },
                CHILD: function(b) {
                    return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || a.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && a.error(b[0]),
                        b
                },
                PSEUDO: function(b) {
                    var e, a = !b[5] && b[2];
                    return ja.CHILD.test(b[0]) ? null : (b[3] && b[4] !== d ? b[2] = b[4] : a && ya.test(a) && (e = B(a, !0)) && (e = a.indexOf(")", a.length - e) - a.length) && (b[0] = b[0].slice(0, e), b[2] = a.slice(0, e)), b.slice(0, 3))
                }
            },
            filter: {
                TAG: function(b) {
                    var d = b.replace(wa, xa).toLowerCase();
                    return "*" === b ? function() {
                        return !0
                    } : function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === d
                    }
                },
                CLASS: function(b) {
                    var d = aa[b + " "];
                    return d || (d = RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)")) && aa(b, function(b) {
                        return d.test("string" ==
                            typeof b.className && b.className || typeof b.getAttribute !== V && b.getAttribute("class") || "")
                    })
                },
                ATTR: function(b, d, e) {
                    return function(k) {
                        k = a.attr(k, b);
                        return null == k ? "!=" === d : d ? (k += "", "=" === d ? k === e : "!=" === d ? k !== e : "^=" === d ? e && 0 === k.indexOf(e) : "*=" === d ? e && -1 < k.indexOf(e) : "$=" === d ? e && k.slice(-e.length) === e : "~=" === d ? -1 < (" " + k + " ").indexOf(e) : "|=" === d ? k === e || k.slice(0, e.length + 1) === e + "-" : !1) : !0
                    }
                },
                CHILD: function(b, d, e, a, k) {
                    var c = "nth" !== b.slice(0, 3),
                        f = "last" !== b.slice(-4),
                        q = "of-type" === d;
                    return 1 === a && 0 === k ?
                        function(b) {
                            return !!b.parentNode
                        } : function(d, e, x) {
                            var r, g, z, l, Y;
                            e = c !== f ? "nextSibling" : "previousSibling";
                            var h = d.parentNode,
                                ca = q && d.nodeName.toLowerCase();
                            x = !x && !q;
                            if (h) {
                                if (c) {
                                    for (; e;) {
                                        for (g = d; g = g[e];)
                                            if (q ? g.nodeName.toLowerCase() === ca : 1 === g.nodeType) return !1;
                                        Y = e = "only" === b && !Y && "nextSibling"
                                    }
                                    return !0
                                }
                                if (Y = [f ? h.firstChild : h.lastChild], f && x)
                                    for (x = h[R] || (h[R] = {}), r = x[b] || [], l = r[0] === qa && r[1], z = r[0] === qa && r[2], g = l && h.childNodes[l]; g = ++l && g && g[e] || (z = l = 0) || Y.pop();) {
                                        if (1 === g.nodeType && ++z && g === d) {
                                            x[b] = [qa, l, z];
                                            break
                                        }
                                    } else if (x && (r = (d[R] || (d[R] = {}))[b]) && r[0] === qa) z = r[1];
                                    else
                                        for (;
                                            (g = ++l && g && g[e] || (z = l = 0) || Y.pop()) && ((q ? g.nodeName.toLowerCase() !== ca : 1 !== g.nodeType) || !++z || (x && ((g[R] || (g[R] = {}))[b] = [qa, z]), g !== d)););
                                return z -= k, z === a || 0 === z % a && 0 <= z / a
                            }
                        }
                },
                PSEUDO: function(b, d) {
                    var e, k = y.pseudos[b] || y.setFilters[b.toLowerCase()] || a.error("unsupported pseudo: " + b);
                    return k[R] ? k(d) : 1 < k.length ? (e = [b, b, "", d], y.setFilters.hasOwnProperty(b.toLowerCase()) ? f(function(b, e) {
                        for (var a, c = k(b, d), f = c.length; f--;) a =
                            Z.call(b, c[f]), b[a] = !(e[a] = c[f])
                    }) : function(b) {
                        return k(b, 0, e)
                    }) : k
                }
            },
            pseudos: {
                not: f(function(b) {
                    var d = [],
                        e = [],
                        a = H(b.replace(ea, "$1"));
                    return a[R] ? f(function(b, d, e, k) {
                        var c;
                        e = a(b, null, k, []);
                        for (k = b.length; k--;)(c = e[k]) && (b[k] = !(d[k] = c))
                    }) : function(b, k, c) {
                        return d[0] = b, a(d, null, c, e), !e.pop()
                    }
                }),
                has: f(function(b) {
                    return function(d) {
                        return 0 < a(b, d).length
                    }
                }),
                contains: f(function(b) {
                    return function(d) {
                        return -1 < (d.textContent || d.innerText || K(d)).indexOf(b)
                    }
                }),
                lang: f(function(b) {
                    return za.test(b || "") || a.error("unsupported lang: " +
                            b), b = b.replace(wa, xa).toLowerCase(),
                        function(d) {
                            var e;
                            do
                                if (e = D ? d.lang : d.getAttribute("xml:lang") || d.getAttribute("lang")) return e = e.toLowerCase(), e === b || 0 === e.indexOf(b + "-");
                            while ((d = d.parentNode) && 1 === d.nodeType);
                            return !1
                        }
                }),
                target: function(d) {
                    var e = b.location && b.location.hash;
                    return e && e.slice(1) === d.id
                },
                root: function(b) {
                    return b === I
                },
                focus: function(b) {
                    return b === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(b.type || b.href || ~b.tabIndex)
                },
                enabled: function(b) {
                    return !1 === b.disabled
                },
                disabled: function(b) {
                    return !0 ===
                        b.disabled
                },
                checked: function(b) {
                    var d = b.nodeName.toLowerCase();
                    return "input" === d && !!b.checked || "option" === d && !!b.selected
                },
                selected: function(b) {
                    return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
                },
                empty: function(b) {
                    for (b = b.firstChild; b; b = b.nextSibling)
                        if ("@" < b.nodeName || 3 === b.nodeType || 4 === b.nodeType) return !1;
                    return !0
                },
                parent: function(b) {
                    return !y.pseudos.empty(b)
                },
                header: function(b) {
                    return Ca.test(b.nodeName)
                },
                input: function(b) {
                    return Ba.test(b.nodeName)
                },
                button: function(b) {
                    var d = b.nodeName.toLowerCase();
                    return "input" === d && "button" === b.type || "button" === d
                },
                text: function(b) {
                    var d;
                    return "input" === b.nodeName.toLowerCase() && "text" === b.type && (null == (d = b.getAttribute("type")) || d.toLowerCase() === b.type)
                },
                first: p(function() {
                    return [0]
                }),
                last: p(function(b, d) {
                    return [d - 1]
                }),
                eq: p(function(b, d, e) {
                    return [0 > e ? e + d : e]
                }),
                even: p(function(b, d) {
                    for (var e = 0; d > e; e += 2) b.push(e);
                    return b
                }),
                odd: p(function(b, d) {
                    for (var e = 1; d > e; e += 2) b.push(e);
                    return b
                }),
                lt: p(function(b, d, e) {
                    for (d = 0 > e ? e + d : e; 0 <= --d;) b.push(d);
                    return b
                }),
                gt: p(function(b,
                    d, e) {
                    for (e = 0 > e ? e + d : e; d > ++e;) b.push(e);
                    return b
                })
            }
        };
        y.pseudos.nth = y.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) y.pseudos[w] = h(w);
        for (w in {
                submit: !0,
                reset: !0
            }) y.pseudos[w] = m(w);
        ca.prototype = y.filters = y.pseudos;
        y.setFilters = new ca;
        H = a.compile = function(b, d) {
            var e, a = [],
                k = [],
                c = Q[b + " "];
            if (!c) {
                d || (d = B(b));
                for (e = d.length; e--;) c = G(d[e]), c[R] ? a.push(c) : k.push(c);
                c = Q(b, N(k, a))
            }
            return c
        };
        v.sortStable = R.split("").sort(ua).join("") === R;
        v.detectDuplicates = oa;
        F();
        v.sortDetached = r(function(b) {
            return 1 &
                b.compareDocumentPosition(L.createElement("div"))
        });
        r(function(b) {
            return b.innerHTML = "<a href='#'></a>", "#" === b.firstChild.getAttribute("href")
        }) || g("type|href|height|width", function(b, e, a) {
            return a ? d : b.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        });
        v.attributes && r(function(b) {
            return b.innerHTML = "<input/>", b.firstChild.setAttribute("value", ""), "" === b.firstChild.getAttribute("value")
        }) || g("value", function(b, e, a) {
            return a || "input" !== b.nodeName.toLowerCase() ? d : b.defaultValue
        });
        r(function(b) {
            return null ==
                b.getAttribute("disabled")
        }) || g("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(b, e, a) {
            var k;
            return a ? d : (k = b.getAttributeNode(e)) && k.specified ? k.value : !0 === b[e] ? e.toLowerCase() : null
        });
        e.find = a;
        e.expr = a.selectors;
        e.expr[":"] = e.expr.pseudos;
        e.unique = a.uniqueSort;
        e.text = a.getText;
        e.isXMLDoc = a.isXML;
        e.contains = a.contains
    })(a);
    var Za = {};
    e.Callbacks = function(b) {
        b = "string" == typeof b ? Za[b] || m(b) : e.extend({}, b);
        var d, a, c,
            f, r, z, l = [],
            h = !b.once && [],
            p = function(e) {
                a = b.memory && e;
                c = !0;
                r = z || 0;
                z = 0;
                f = l.length;
                for (d = !0; l && f > r; r++)
                    if (!1 === l[r].apply(e[0], e[1]) && b.stopOnFalse) {
                        a = !1;
                        break
                    }
                d = !1;
                l && (h ? h.length && p(h.shift()) : a ? l = [] : B.disable())
            },
            B = {
                add: function() {
                    if (l) {
                        var k = l.length;
                        (function Ha(d) {
                            e.each(d, function(d, a) {
                                var k = e.type(a);
                                "function" === k ? b.unique && B.has(a) || l.push(a) : a && a.length && "string" !== k && Ha(a)
                            })
                        })(arguments);
                        d ? f = l.length : a && (z = k, p(a))
                    }
                    return this
                },
                remove: function() {
                    return l && e.each(arguments, function(b, a) {
                        for (var k; - 1 <
                            (k = e.inArray(a, l, k));) l.splice(k, 1), d && (f >= k && f--, r >= k && r--)
                    }), this
                },
                has: function(b) {
                    return b ? -1 < e.inArray(b, l) : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], f = 0, this
                },
                disable: function() {
                    return l = h = a = g, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return h = g, a || B.disable(), this
                },
                locked: function() {
                    return !h
                },
                fireWith: function(b, e) {
                    return !l || c && !h || (e = e || [], e = [b, e.slice ? e.slice() : e], d ? h.push(e) : p(e)), this
                },
                fire: function() {
                    return B.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return B
    };
    e.extend({
        Deferred: function(b) {
            var d = [
                    ["resolve", "done", e.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", e.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", e.Callbacks("memory")]
                ],
                a = "pending",
                c = {
                    state: function() {
                        return a
                    },
                    always: function() {
                        return f.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var b = arguments;
                        return e.Deferred(function(a) {
                            e.each(d, function(d, k) {
                                var q = k[0],
                                    x = e.isFunction(b[d]) && b[d];
                                f[k[1]](function() {
                                    var b = x && x.apply(this, arguments);
                                    b && e.isFunction(b.promise) ?
                                        b.promise().done(a.resolve).fail(a.reject).progress(a.notify) : a[q + "With"](this === c ? a.promise() : this, x ? [b] : arguments)
                                })
                            });
                            b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? e.extend(b, c) : c
                    }
                },
                f = {};
            return c.pipe = c.then, e.each(d, function(b, e) {
                var k = e[2],
                    q = e[3];
                c[e[1]] = k.add;
                q && k.add(function() {
                    a = q
                }, d[1 ^ b][2].disable, d[2][2].lock);
                f[e[0]] = function() {
                    return f[e[0] + "With"](this === f ? c : this, arguments), this
                };
                f[e[0] + "With"] = k.fireWith
            }), c.promise(f), b && b.call(f, f), f
        },
        when: function(b) {
            var d = 0,
                a = ma.call(arguments),
                c = a.length,
                f = 1 !== c || b && e.isFunction(b.promise) ? c : 0,
                r = 1 === f ? b : e.Deferred(),
                g = function(b, d, e) {
                    return function(a) {
                        d[b] = this;
                        e[b] = 1 < arguments.length ? ma.call(arguments) : a;
                        e === l ? r.notifyWith(d, e) : --f || r.resolveWith(d, e)
                    }
                },
                l, h, p;
            if (1 < c)
                for (l = Array(c), h = Array(c), p = Array(c); c > d; d++) a[d] && e.isFunction(a[d].promise) ? a[d].promise().done(g(d, p, a)).fail(r.reject).progress(g(d, h, l)) : --f;
            return f || r.resolveWith(p, a), r.promise()
        }
    });
    e.support = function(b) {
        var d, k, c, f, r, g, l = D.createElement("div");
        if (l.setAttribute("className",
                "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = l.getElementsByTagName("*") || [], k = l.getElementsByTagName("a")[0], !k || !k.style || !d.length) return b;
        c = D.createElement("select");
        f = c.appendChild(D.createElement("option"));
        d = l.getElementsByTagName("input")[0];
        k.style.cssText = "top:1px;float:left;opacity:.5";
        b.getSetAttribute = "t" !== l.className;
        b.leadingWhitespace = 3 === l.firstChild.nodeType;
        b.tbody = !l.getElementsByTagName("tbody").length;
        b.htmlSerialize = !!l.getElementsByTagName("link").length;
        b.style = /top/.test(k.getAttribute("style"));
        b.hrefNormalized = "/a" === k.getAttribute("href");
        b.opacity = /^0.5/.test(k.style.opacity);
        b.cssFloat = !!k.style.cssFloat;
        b.checkOn = !!d.value;
        b.optSelected = f.selected;
        b.enctype = !!D.createElement("form").enctype;
        b.html5Clone = "<:nav></:nav>" !== D.createElement("nav").cloneNode(!0).outerHTML;
        b.inlineBlockNeedsLayout = !1;
        b.shrinkWrapBlocks = !1;
        b.pixelPosition = !1;
        b.deleteExpando = !0;
        b.noCloneEvent = !0;
        b.reliableMarginRight = !0;
        b.boxSizingReliable = !0;
        d.checked = !0;
        b.noCloneChecked =
            d.cloneNode(!0).checked;
        c.disabled = !0;
        b.optDisabled = !f.disabled;
        try {
            delete l.test
        } catch (yc) {
            b.deleteExpando = !1
        }
        d = D.createElement("input");
        d.setAttribute("value", "");
        b.input = "" === d.getAttribute("value");
        d.value = "t";
        d.setAttribute("type", "radio");
        b.radioValue = "t" === d.value;
        d.setAttribute("checked", "t");
        d.setAttribute("name", "t");
        k = D.createDocumentFragment();
        k.appendChild(d);
        b.appendChecked = d.checked;
        b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked;
        l.attachEvent && (l.attachEvent("onclick",
            function() {
                b.noCloneEvent = !1
            }), l.cloneNode(!0).click());
        for (g in {
                submit: !0,
                change: !0,
                focusin: !0
            }) l.setAttribute(k = "on" + g, "t"), b[g + "Bubbles"] = k in a || !1 === l.attributes[k].expando;
        l.style.backgroundClip = "content-box";
        l.cloneNode(!0).style.backgroundClip = "";
        b.clearCloneStyle = "content-box" === l.style.backgroundClip;
        for (g in e(b)) break;
        return b.ownLast = "0" !== g, e(function() {
            var d, k, c, f = D.getElementsByTagName("body")[0];
            f && (d = D.createElement("div"), d.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
                f.appendChild(d).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c = l.getElementsByTagName("td"), c[0].style.cssText = "padding:0;margin:0;border:0;display:none", r = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", b.reliableHiddenOffsets = r && 0 === c[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                e.swap(f, null != f.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    b.boxSizing = 4 === l.offsetWidth
                }), a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                    width: "4px"
                }).width, k = l.appendChild(D.createElement("div")), k.style.cssText = l.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", k.style.marginRight = k.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(k, null) || {}).marginRight)), typeof l.style.zoom !== fa && (l.innerHTML = "", l.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (f.style.zoom = 1)), f.removeChild(d),
                d = l = c = k = null)
        }), d = c = k = f = k = d = null, b
    }({});
    var Eb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Db = /([A-Z])/g;
    e.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(b) {
            return b = b.nodeType ? e.cache[b[e.expando]] : b[e.expando], !!b && !n(b)
        },
        data: function(b, d, e) {
            return v(b, d, e)
        },
        removeData: function(b, d) {
            return w(b, d)
        },
        _data: function(b, d, e) {
            return v(b, d, e, !0)
        },
        _removeData: function(b, d) {
            return w(b, d, !0)
        },
        acceptData: function(b) {
            if (b.nodeType && 1 !== b.nodeType && 9 !== b.nodeType) return !1;
            var d = b.nodeName && e.noData[b.nodeName.toLowerCase()];
            return !d || !0 !== d && b.getAttribute("classid") === d
        }
    });
    e.fn.extend({
        data: function(b, d) {
            var a, c, f = null,
                r = 0,
                l = this[0];
            if (b === g) {
                if (this.length && (f = e.data(l), 1 === l.nodeType && !e._data(l, "parsedAttrs"))) {
                    for (a = l.attributes; a.length > r; r++) c = a[r].name, 0 === c.indexOf("data-") && (c = e.camelCase(c.slice(5)), u(l, c, f[c]));
                    e._data(l, "parsedAttrs", !0)
                }
                return f
            }
            return "object" == typeof b ? this.each(function() {
                e.data(this, b)
            }) : 1 < arguments.length ? this.each(function() {
                e.data(this,
                    b, d)
            }) : l ? u(l, b, e.data(l, b)) : null
        },
        removeData: function(b) {
            return this.each(function() {
                e.removeData(this, b)
            })
        }
    });
    e.extend({
        queue: function(b, d, a) {
            var k;
            return b ? (d = (d || "fx") + "queue", k = e._data(b, d), a && (!k || e.isArray(a) ? k = e._data(b, d, e.makeArray(a)) : k.push(a)), k || []) : g
        },
        dequeue: function(b, d) {
            d = d || "fx";
            var a = e.queue(b, d),
                c = a.length,
                f = a.shift(),
                r = e._queueHooks(b, d),
                g = function() {
                    e.dequeue(b, d)
                };
            "inprogress" === f && (f = a.shift(), c--);
            f && ("fx" === d && a.unshift("inprogress"), delete r.stop, f.call(b, g, r));
            !c && r && r.empty.fire()
        },
        _queueHooks: function(b, d) {
            var a = d + "queueHooks";
            return e._data(b, a) || e._data(b, a, {
                empty: e.Callbacks("once memory").add(function() {
                    e._removeData(b, d + "queue");
                    e._removeData(b, a)
                })
            })
        }
    });
    e.fn.extend({
        queue: function(b, d) {
            var a = 2;
            return "string" != typeof b && (d = b, b = "fx", a--), a > arguments.length ? e.queue(this[0], b) : d === g ? this : this.each(function() {
                var a = e.queue(this, b, d);
                e._queueHooks(this, b);
                "fx" === b && "inprogress" !== a[0] && e.dequeue(this, b)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                e.dequeue(this, b)
            })
        },
        delay: function(b, d) {
            return b = e.fx ? e.fx.speeds[b] || b : b, d = d || "fx", this.queue(d, function(d, e) {
                var a = setTimeout(d, b);
                e.stop = function() {
                    clearTimeout(a)
                }
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(b, d) {
            var a, c = 1,
                f = e.Deferred(),
                r = this,
                l = this.length,
                h = function() {
                    --c || f.resolveWith(r, [r])
                };
            "string" != typeof b && (d = b, b = g);
            for (b = b || "fx"; l--;)(a = e._data(r[l], b + "queueHooks")) && a.empty && (c++, a.empty.add(h));
            return h(), f.promise(d)
        }
    });
    var ya, kb, Pa = /[\t\r\n\f]/g,
        Yb = /\r/g,
        Zb = /^(?:input|select|textarea|button|object)$/i,
        $b = /^(?:a|area)$/i,
        Qa = /^(?:checked|selected)$/i,
        ga = e.support.getSetAttribute,
        Ja = e.support.input;
    e.fn.extend({
        attr: function(b, d) {
            return e.access(this, e.attr, b, d, 1 < arguments.length)
        },
        removeAttr: function(b) {
            return this.each(function() {
                e.removeAttr(this, b)
            })
        },
        prop: function(b, d) {
            return e.access(this, e.prop, b, d, 1 < arguments.length)
        },
        removeProp: function(b) {
            return b = e.propFix[b] || b, this.each(function() {
                try {
                    this[b] = g, delete this[b]
                } catch (d) {}
            })
        },
        addClass: function(b) {
            var d, a, c, f, r, g = 0,
                l = this.length;
            d = "string" ==
                typeof b && b;
            if (e.isFunction(b)) return this.each(function(d) {
                e(this).addClass(b.call(this, d, this.className))
            });
            if (d)
                for (d = (b || "").match(T) || []; l > g; g++)
                    if (a = this[g], c = 1 === a.nodeType && (a.className ? (" " + a.className + " ").replace(Pa, " ") : " ")) {
                        for (r = 0; f = d[r++];) 0 > c.indexOf(" " + f + " ") && (c += f + " ");
                        a.className = e.trim(c)
                    }
            return this
        },
        removeClass: function(b) {
            var d, a, c, f, r, g = 0,
                l = this.length;
            d = 0 === arguments.length || "string" == typeof b && b;
            if (e.isFunction(b)) return this.each(function(d) {
                e(this).removeClass(b.call(this,
                    d, this.className))
            });
            if (d)
                for (d = (b || "").match(T) || []; l > g; g++)
                    if (a = this[g], c = 1 === a.nodeType && (a.className ? (" " + a.className + " ").replace(Pa, " ") : "")) {
                        for (r = 0; f = d[r++];)
                            for (; 0 <= c.indexOf(" " + f + " ");) c = c.replace(" " + f + " ", " ");
                        a.className = b ? e.trim(c) : ""
                    }
            return this
        },
        toggleClass: function(b, d) {
            var a = typeof b;
            return "boolean" == typeof d && "string" === a ? d ? this.addClass(b) : this.removeClass(b) : e.isFunction(b) ? this.each(function(a) {
                e(this).toggleClass(b.call(this, a, this.className, d), d)
            }) : this.each(function() {
                if ("string" ===
                    a)
                    for (var d, c = 0, k = e(this), f = b.match(T) || []; d = f[c++];) k.hasClass(d) ? k.removeClass(d) : k.addClass(d);
                else(a === fa || "boolean" === a) && (this.className && e._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : e._data(this, "__className__") || "")
            })
        },
        hasClass: function(b) {
            b = " " + b + " ";
            for (var d = 0, e = this.length; e > d; d++)
                if (1 === this[d].nodeType && 0 <= (" " + this[d].className + " ").replace(Pa, " ").indexOf(b)) return !0;
            return !1
        },
        val: function(b) {
            var d, a, c, f = this[0];
            if (arguments.length) return c =
                e.isFunction(b), this.each(function(d) {
                    var k;
                    1 === this.nodeType && (k = c ? b.call(this, d, e(this).val()) : b, null == k ? k = "" : "number" == typeof k ? k += "" : e.isArray(k) && (k = e.map(k, function(b) {
                        return null == b ? "" : b + ""
                    })), a = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()], a && "set" in a && a.set(this, k, "value") !== g || (this.value = k))
                });
            if (f) return a = e.valHooks[f.type] || e.valHooks[f.nodeName.toLowerCase()], a && "get" in a && (d = a.get(f, "value")) !== g ? d : (d = f.value, "string" == typeof d ? d.replace(Yb, "") : null == d ? "" : d)
        }
    });
    e.extend({
        valHooks: {
            option: {
                get: function(b) {
                    var d =
                        e.find.attr(b, "value");
                    return null != d ? d : b.text
                }
            },
            select: {
                get: function(b) {
                    for (var d, a = b.options, c = b.selectedIndex, f = "select-one" === b.type || 0 > c, g = f ? null : [], l = f ? c + 1 : a.length, h = 0 > c ? l : f ? c : 0; l > h; h++)
                        if (d = a[h], !(!d.selected && h !== c || (e.support.optDisabled ? d.disabled : null !== d.getAttribute("disabled")) || d.parentNode.disabled && e.nodeName(d.parentNode, "optgroup"))) {
                            if (b = e(d).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(b, d) {
                    for (var a, c, f = b.options, g = e.makeArray(d), l = f.length; l--;) c = f[l], (c.selected = 0 <= e.inArray(e(c).val(),
                        g)) && (a = !0);
                    return a || (b.selectedIndex = -1), g
                }
            }
        },
        attr: function(b, d, a) {
            var c, k, f = b.nodeType;
            if (b && 3 !== f && 8 !== f && 2 !== f) return typeof b.getAttribute === fa ? e.prop(b, d, a) : (1 === f && e.isXMLDoc(b) || (d = d.toLowerCase(), c = e.attrHooks[d] || (e.expr.match.bool.test(d) ? kb : ya)), a === g ? c && "get" in c && null !== (k = c.get(b, d)) ? k : (k = e.find.attr(b, d), null == k ? g : k) : null !== a ? c && "set" in c && (k = c.set(b, a, d)) !== g ? k : (b.setAttribute(d, a + ""), a) : (e.removeAttr(b, d), g))
        },
        removeAttr: function(b, d) {
            var a, c, f = 0,
                g = d && d.match(T);
            if (g && 1 === b.nodeType)
                for (; a =
                    g[f++];) c = e.propFix[a] || a, e.expr.match.bool.test(a) ? Ja && ga || !Qa.test(a) ? b[c] = !1 : b[e.camelCase("default-" + a)] = b[c] = !1 : e.attr(b, a, ""), b.removeAttribute(ga ? a : c)
        },
        attrHooks: {
            type: {
                set: function(b, d) {
                    if (!e.support.radioValue && "radio" === d && e.nodeName(b, "input")) {
                        var a = b.value;
                        return b.setAttribute("type", d), a && (b.value = a), d
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(b, d, a) {
            var c, k, f, l = b.nodeType;
            if (b && 3 !== l && 8 !== l && 2 !== l) return f = 1 !== l || !e.isXMLDoc(b), f && (d = e.propFix[d] || d, k = e.propHooks[d]),
                a !== g ? k && "set" in k && (c = k.set(b, a, d)) !== g ? c : b[d] = a : k && "get" in k && null !== (c = k.get(b, d)) ? c : b[d]
        },
        propHooks: {
            tabIndex: {
                get: function(b) {
                    var d = e.find.attr(b, "tabindex");
                    return d ? parseInt(d, 10) : Zb.test(b.nodeName) || $b.test(b.nodeName) && b.href ? 0 : -1
                }
            }
        }
    });
    kb = {
        set: function(b, d, a) {
            return !1 === d ? e.removeAttr(b, a) : Ja && ga || !Qa.test(a) ? b.setAttribute(!ga && e.propFix[a] || a, a) : b[e.camelCase("default-" + a)] = b[a] = !0, a
        }
    };
    e.each(e.expr.match.bool.source.match(/\w+/g), function(b, d) {
        var a = e.expr.attrHandle[d] || e.find.attr;
        e.expr.attrHandle[d] = Ja && ga || !Qa.test(d) ? function(b, d, c) {
            var k = e.expr.attrHandle[d];
            b = c ? g : (e.expr.attrHandle[d] = g) != a(b, d, c) ? d.toLowerCase() : null;
            return e.expr.attrHandle[d] = k, b
        } : function(b, d, a) {
            return a ? g : b[e.camelCase("default-" + d)] ? d.toLowerCase() : null
        }
    });
    Ja && ga || (e.attrHooks.value = {
        set: function(b, d, a) {
            return e.nodeName(b, "input") ? (b.defaultValue = d, g) : ya && ya.set(b, d, a)
        }
    });
    ga || (ya = {
        set: function(b, d, e) {
            var a = b.getAttributeNode(e);
            return a || b.setAttributeNode(a = b.ownerDocument.createAttribute(e)),
                a.value = d += "", "value" === e || d === b.getAttribute(e) ? d : g
        }
    }, e.expr.attrHandle.id = e.expr.attrHandle.name = e.expr.attrHandle.coords = function(b, d, e) {
        var a;
        return e ? g : (a = b.getAttributeNode(d)) && "" !== a.value ? a.value : null
    }, e.valHooks.button = {
        get: function(b, d) {
            var e = b.getAttributeNode(d);
            return e && e.specified ? e.value : g
        },
        set: ya.set
    }, e.attrHooks.contenteditable = {
        set: function(b, d, e) {
            ya.set(b, "" === d ? !1 : d, e)
        }
    }, e.each(["width", "height"], function(b, d) {
        e.attrHooks[d] = {
            set: function(b, e) {
                return "" === e ? (b.setAttribute(d,
                    "auto"), e) : g
            }
        }
    }));
    e.support.hrefNormalized || e.each(["href", "src"], function(b, d) {
        e.propHooks[d] = {
            get: function(b) {
                return b.getAttribute(d, 4)
            }
        }
    });
    e.support.style || (e.attrHooks.style = {
        get: function(b) {
            return b.style.cssText || g
        },
        set: function(b, d) {
            return b.style.cssText = d + ""
        }
    });
    e.support.optSelected || (e.propHooks.selected = {
        get: function(b) {
            b = b.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    });
    e.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "),
        function() {
            e.propFix[this.toLowerCase()] = this
        });
    e.support.enctype || (e.propFix.enctype = "encoding");
    e.each(["radio", "checkbox"], function() {
        e.valHooks[this] = {
            set: function(b, d) {
                return e.isArray(d) ? b.checked = 0 <= e.inArray(e(b).val(), d) : g
            }
        };
        e.support.checkOn || (e.valHooks[this].get = function(b) {
            return null === b.getAttribute("value") ? "on" : b.value
        })
    });
    var Ra = /^(?:input|select|textarea)$/i,
        ac = /^key/,
        bc = /^(?:mouse|contextmenu)|click/,
        lb = /^(?:focusinfocus|focusoutblur)$/,
        mb = /^([^.]*)(?:\.(.+)|)$/;
    e.event = {
        global: {},
        add: function(b, d, a, c, f) {
            var k, l, q, x, h, p, B, m, A, n;
            if (q = e._data(b)) {
                a.handler && (x = a, a = x.handler, f = x.selector);
                a.guid || (a.guid = e.guid++);
                (l = q.events) || (l = q.events = {});
                (p = q.handle) || (p = q.handle = function(b) {
                    return typeof e === fa || b && e.event.triggered === b.type ? g : e.event.dispatch.apply(p.elem, arguments)
                }, p.elem = b);
                d = (d || "").match(T) || [""];
                for (q = d.length; q--;) k = mb.exec(d[q]) || [], A = n = k[1], k = (k[2] || "").split(".").sort(), A && (h = e.event.special[A] || {}, A = (f ? h.delegateType : h.bindType) || A, h = e.event.special[A] || {},
                    B = e.extend({
                        type: A,
                        origType: n,
                        data: c,
                        handler: a,
                        guid: a.guid,
                        selector: f,
                        needsContext: f && e.expr.match.needsContext.test(f),
                        namespace: k.join(".")
                    }, x), (m = l[A]) || (m = l[A] = [], m.delegateCount = 0, h.setup && !1 !== h.setup.call(b, c, k, p) || (b.addEventListener ? b.addEventListener(A, p, !1) : b.attachEvent && b.attachEvent("on" + A, p))), h.add && (h.add.call(b, B), B.handler.guid || (B.handler.guid = a.guid)), f ? m.splice(m.delegateCount++, 0, B) : m.push(B), e.event.global[A] = !0);
                b = null
            }
        },
        remove: function(b, d, a, c, f) {
            var k, g, l, q, x, h, p, B, m, A,
                n, t = e.hasData(b) && e._data(b);
            if (t && (h = t.events)) {
                d = (d || "").match(T) || [""];
                for (x = d.length; x--;)
                    if (l = mb.exec(d[x]) || [], m = n = l[1], A = (l[2] || "").split(".").sort(), m) {
                        p = e.event.special[m] || {};
                        m = (c ? p.delegateType : p.bindType) || m;
                        B = h[m] || [];
                        l = l[2] && RegExp("(^|\\.)" + A.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (q = k = B.length; k--;) g = B[k], !f && n !== g.origType || a && a.guid !== g.guid || l && !l.test(g.namespace) || c && c !== g.selector && ("**" !== c || !g.selector) || (B.splice(k, 1), g.selector && B.delegateCount--, p.remove && p.remove.call(b, g));
                        q && !B.length && (p.teardown && !1 !== p.teardown.call(b, A, t.handle) || e.removeEvent(b, m, t.handle), delete h[m])
                    } else
                        for (m in h) e.event.remove(b, m + d[x], a, c, !0);
                e.isEmptyObject(h) && (delete t.handle, e._removeData(b, "events"))
            }
        },
        trigger: function(b, d, c, f) {
            var k, l, q, h, p, m, B = [c || D],
                A = va.call(b, "type") ? b.type : b;
            m = va.call(b, "namespace") ? b.namespace.split(".") : [];
            if (q = k = c = c || D, 3 !== c.nodeType && 8 !== c.nodeType && !lb.test(A + e.event.triggered) && (0 <= A.indexOf(".") && (m = A.split("."), A = m.shift(), m.sort()), l = 0 > A.indexOf(":") &&
                    "on" + A, b = b[e.expando] ? b : new e.Event(A, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = m.join("."), b.namespace_re = b.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = g, b.target || (b.target = c), d = null == d ? [b] : e.makeArray(d, [b]), p = e.event.special[A] || {}, f || !p.trigger || !1 !== p.trigger.apply(c, d))) {
                if (!f && !p.noBubble && !e.isWindow(c)) {
                    h = p.delegateType || A;
                    for (lb.test(h + A) || (q = q.parentNode); q; q = q.parentNode) B.push(q), k = q;
                    k === (c.ownerDocument || D) && B.push(k.defaultView || k.parentWindow ||
                        a)
                }
                for (m = 0;
                    (q = B[m++]) && !b.isPropagationStopped();) b.type = 1 < m ? h : p.bindType || A, (k = (e._data(q, "events") || {})[b.type] && e._data(q, "handle")) && k.apply(q, d), (k = l && q[l]) && e.acceptData(q) && k.apply && !1 === k.apply(q, d) && b.preventDefault();
                if (b.type = A, !(f || b.isDefaultPrevented() || p._default && !1 !== p._default.apply(B.pop(), d)) && e.acceptData(c) && l && c[A] && !e.isWindow(c)) {
                    (k = c[l]) && (c[l] = null);
                    e.event.triggered = A;
                    try {
                        c[A]()
                    } catch (Ac) {}
                    e.event.triggered = g;
                    k && (c[l] = k)
                }
                return b.result
            }
        },
        dispatch: function(b) {
            b = e.event.fix(b);
            var d, a, c, f, l, h, p = ma.call(arguments);
            d = (e._data(this, "events") || {})[b.type] || [];
            var m = e.event.special[b.type] || {};
            if (p[0] = b, b.delegateTarget = this, !m.preDispatch || !1 !== m.preDispatch.call(this, b)) {
                h = e.event.handlers.call(this, b, d);
                for (d = 0;
                    (f = h[d++]) && !b.isPropagationStopped();)
                    for (b.currentTarget = f.elem, l = 0;
                        (c = f.handlers[l++]) && !b.isImmediatePropagationStopped();) b.namespace_re && !b.namespace_re.test(c.namespace) || (b.handleObj = c, b.data = c.data, a = ((e.event.special[c.origType] || {}).handle || c.handler).apply(f.elem,
                        p), a === g || !1 !== (b.result = a) || (b.preventDefault(), b.stopPropagation()));
                return m.postDispatch && m.postDispatch.call(this, b), b.result
            }
        },
        handlers: function(b, d) {
            var a, c, f, l, h = [],
                p = d.delegateCount,
                m = b.target;
            if (p && m.nodeType && (!b.button || "click" !== b.type))
                for (; m != this; m = m.parentNode || this)
                    if (1 === m.nodeType && (!0 !== m.disabled || "click" !== b.type)) {
                        f = [];
                        for (l = 0; p > l; l++) c = d[l], a = c.selector + " ", f[a] === g && (f[a] = c.needsContext ? 0 <= e(a, this).index(m) : e.find(a, this, null, [m]).length), f[a] && f.push(c);
                        f.length && h.push({
                            elem: m,
                            handlers: f
                        })
                    }
            return d.length > p && h.push({
                elem: this,
                handlers: d.slice(p)
            }), h
        },
        fix: function(b) {
            if (b[e.expando]) return b;
            var d, a, c;
            d = b.type;
            var f = b,
                l = this.fixHooks[d];
            l || (this.fixHooks[d] = l = bc.test(d) ? this.mouseHooks : ac.test(d) ? this.keyHooks : {});
            c = l.props ? this.props.concat(l.props) : this.props;
            b = new e.Event(f);
            for (d = c.length; d--;) a = c[d], b[a] = f[a];
            return b.target || (b.target = f.srcElement || D), 3 === b.target.nodeType && (b.target = b.target.parentNode), b.metaKey = !!b.metaKey, l.filter ? l.filter(b, f) : b
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(b, d) {
                return null == b.which && (b.which = null != d.charCode ? d.charCode : d.keyCode), b
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b, d) {
                var a, e, c, f = d.button,
                    l = d.fromElement;
                return null == b.pageX && null != d.clientX && (e = b.target.ownerDocument || D, c = e.documentElement, a = e.body, b.pageX = d.clientX + (c && c.scrollLeft || a && a.scrollLeft || 0) - (c &&
                    c.clientLeft || a && a.clientLeft || 0), b.pageY = d.clientY + (c && c.scrollTop || a && a.scrollTop || 0) - (c && c.clientTop || a && a.clientTop || 0)), !b.relatedTarget && l && (b.relatedTarget = l === b.target ? d.toElement : l), b.which || f === g || (b.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), b
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== G() && this.focus) try {
                        return this.focus(), !1
                    } catch (b) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === G() && this.blur ? (this.blur(), !1) : g
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return e.nodeName(this,
                        "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : g
                },
                _default: function(b) {
                    return e.nodeName(b.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(b) {
                    b.result !== g && (b.originalEvent.returnValue = b.result)
                }
            }
        },
        simulate: function(b, d, a, c) {
            b = e.extend(new e.Event, a, {
                type: b,
                isSimulated: !0,
                originalEvent: {}
            });
            c ? e.event.trigger(b, null, d) : e.event.dispatch.call(d, b);
            b.isDefaultPrevented() && a.preventDefault()
        }
    };
    e.removeEvent = D.removeEventListener ? function(b, d, a) {
        b.removeEventListener && b.removeEventListener(d,
            a, !1)
    } : function(b, d, a) {
        d = "on" + d;
        b.detachEvent && (typeof b[d] === fa && (b[d] = null), b.detachEvent(d, a))
    };
    e.Event = function(b, d) {
        return this instanceof e.Event ? (b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? F : y) : this.type = b, d && e.extend(this, d), this.timeStamp = b && b.timeStamp || e.now(), this[e.expando] = !0, g) : new e.Event(b, d)
    };
    e.Event.prototype = {
        isDefaultPrevented: y,
        isPropagationStopped: y,
        isImmediatePropagationStopped: y,
        preventDefault: function() {
            var b = this.originalEvent;
            this.isDefaultPrevented = F;
            b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
        },
        stopPropagation: function() {
            var b = this.originalEvent;
            this.isPropagationStopped = F;
            b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = F;
            this.stopPropagation()
        }
    };
    e.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(b, d) {
        e.event.special[b] = {
            delegateType: d,
            bindType: d,
            handle: function(b) {
                var a,
                    c = b.relatedTarget,
                    k = b.handleObj;
                return (!c || c !== this && !e.contains(this, c)) && (b.type = k.origType, a = k.handler.apply(this, arguments), b.type = d), a
            }
        }
    });
    e.support.submitBubbles || (e.event.special.submit = {
        setup: function() {
            return e.nodeName(this, "form") ? !1 : (e.event.add(this, "click._submit keypress._submit", function(b) {
                    b = b.target;
                    (b = e.nodeName(b, "input") || e.nodeName(b, "button") ? b.form : g) && !e._data(b, "submitBubbles") && (e.event.add(b, "submit._submit", function(b) {
                        b._submit_bubble = !0
                    }), e._data(b, "submitBubbles", !0))
                }),
                g)
        },
        postDispatch: function(b) {
            b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && e.event.simulate("submit", this.parentNode, b, !0))
        },
        teardown: function() {
            return e.nodeName(this, "form") ? !1 : (e.event.remove(this, "._submit"), g)
        }
    });
    e.support.changeBubbles || (e.event.special.change = {
        setup: function() {
            return Ra.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (e.event.add(this, "propertychange._change", function(b) {
                "checked" === b.originalEvent.propertyName && (this._just_changed = !0)
            }), e.event.add(this, "click._change", function(b) {
                this._just_changed && !b.isTrigger && (this._just_changed = !1);
                e.event.simulate("change", this, b, !0)
            })), !1) : (e.event.add(this, "beforeactivate._change", function(b) {
                b = b.target;
                Ra.test(b.nodeName) && !e._data(b, "changeBubbles") && (e.event.add(b, "change._change", function(b) {
                    !this.parentNode || b.isSimulated || b.isTrigger || e.event.simulate("change", this.parentNode, b, !0)
                }), e._data(b, "changeBubbles", !0))
            }), g)
        },
        handle: function(b) {
            var d = b.target;
            return this !== d || b.isSimulated ||
                b.isTrigger || "radio" !== d.type && "checkbox" !== d.type ? b.handleObj.handler.apply(this, arguments) : g
        },
        teardown: function() {
            return e.event.remove(this, "._change"), !Ra.test(this.nodeName)
        }
    });
    e.support.focusinBubbles || e.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, d) {
        var a = 0,
            c = function(b) {
                e.event.simulate(d, b.target, e.event.fix(b), !0)
            };
        e.event.special[d] = {
            setup: function() {
                0 === a++ && D.addEventListener(b, c, !0)
            },
            teardown: function() {
                0 === --a && D.removeEventListener(b, c, !0)
            }
        }
    });
    e.fn.extend({
        on: function(b, d, a,
            c, f) {
            var k, l;
            if ("object" == typeof b) {
                "string" != typeof d && (a = a || d, d = g);
                for (k in b) this.on(k, d, a, b[k], f);
                return this
            }
            if (null == a && null == c ? (c = d, a = d = g) : null == c && ("string" == typeof d ? (c = a, a = g) : (c = a, a = d, d = g)), !1 === c) c = y;
            else if (!c) return this;
            return 1 === f && (l = c, c = function(b) {
                return e().off(b), l.apply(this, arguments)
            }, c.guid = l.guid || (l.guid = e.guid++)), this.each(function() {
                e.event.add(this, b, c, a, d)
            })
        },
        one: function(b, d, a, e) {
            return this.on(b, d, a, e, 1)
        },
        off: function(b, d, a) {
            var c, k;
            if (b && b.preventDefault && b.handleObj) return c =
                b.handleObj, e(b.delegateTarget).off(c.namespace ? c.origType + "." + c.namespace : c.origType, c.selector, c.handler), this;
            if ("object" == typeof b) {
                for (k in b) this.off(k, d, b[k]);
                return this
            }
            return (!1 === d || "function" == typeof d) && (a = d, d = g), !1 === a && (a = y), this.each(function() {
                e.event.remove(this, b, a, d)
            })
        },
        trigger: function(b, d) {
            return this.each(function() {
                e.event.trigger(b, d, this)
            })
        },
        triggerHandler: function(b, d) {
            var a = this[0];
            return a ? e.event.trigger(b, d, a, !0) : g
        }
    });
    var Fb = /^.[^:#\[\.,]*$/,
        cc = /^(?:parents|prev(?:Until|All))/,
        nb = e.expr.match.needsContext,
        dc = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    e.fn.extend({
        find: function(b) {
            var d, a = [],
                c = this,
                f = c.length;
            if ("string" != typeof b) return this.pushStack(e(b).filter(function() {
                for (d = 0; f > d; d++)
                    if (e.contains(c[d], this)) return !0
            }));
            for (d = 0; f > d; d++) e.find(b, c[d], a);
            return a = this.pushStack(1 < f ? e.unique(a) : a), a.selector = this.selector ? this.selector + " " + b : b, a
        },
        has: function(b) {
            var d, a = e(b, this),
                c = a.length;
            return this.filter(function() {
                for (d = 0; c > d; d++)
                    if (e.contains(this, a[d])) return !0
            })
        },
        not: function(b) {
            return this.pushStack(H(this, b || [], !0))
        },
        filter: function(b) {
            return this.pushStack(H(this, b || [], !1))
        },
        is: function(b) {
            return !!H(this, "string" == typeof b && nb.test(b) ? e(b) : b || [], !1).length
        },
        closest: function(b, d) {
            for (var a, c = 0, f = this.length, l = [], g = nb.test(b) || "string" != typeof b ? e(b, d || this.context) : 0; f > c; c++)
                for (a = this[c]; a && a !== d; a = a.parentNode)
                    if (11 > a.nodeType && (g ? -1 < g.index(a) : 1 === a.nodeType && e.find.matchesSelector(a, b))) {
                        l.push(a);
                        break
                    }
            return this.pushStack(1 < l.length ? e.unique(l) : l)
        },
        index: function(b) {
            return b ? "string" == typeof b ? e.inArray(this[0], e(b)) : e.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(b, d) {
            var a = "string" == typeof b ? e(b, d) : e.makeArray(b && b.nodeType ? [b] : b),
                a = e.merge(this.get(), a);
            return this.pushStack(e.unique(a))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });
    e.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null
        },
        parents: function(b) {
            return e.dir(b,
                "parentNode")
        },
        parentsUntil: function(b, d, a) {
            return e.dir(b, "parentNode", a)
        },
        next: function(b) {
            return t(b, "nextSibling")
        },
        prev: function(b) {
            return t(b, "previousSibling")
        },
        nextAll: function(b) {
            return e.dir(b, "nextSibling")
        },
        prevAll: function(b) {
            return e.dir(b, "previousSibling")
        },
        nextUntil: function(b, d, a) {
            return e.dir(b, "nextSibling", a)
        },
        prevUntil: function(b, d, a) {
            return e.dir(b, "previousSibling", a)
        },
        siblings: function(b) {
            return e.sibling((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return e.sibling(b.firstChild)
        },
        contents: function(b) {
            return e.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : e.merge([], b.childNodes)
        }
    }, function(b, d) {
        e.fn[b] = function(a, c) {
            var k = e.map(this, d, a);
            return "Until" !== b.slice(-5) && (c = a), c && "string" == typeof c && (k = e.filter(c, k)), 1 < this.length && (dc[b] || (k = e.unique(k)), cc.test(b) && (k = k.reverse())), this.pushStack(k)
        }
    });
    e.extend({
        filter: function(b, d, a) {
            var c = d[0];
            return a && (b = ":not(" + b + ")"), 1 === d.length && 1 === c.nodeType ? e.find.matchesSelector(c, b) ? [c] : [] : e.find.matches(b, e.grep(d,
                function(b) {
                    return 1 === b.nodeType
                }))
        },
        dir: function(b, d, a) {
            var c = [];
            for (b = b[d]; b && 9 !== b.nodeType && (a === g || 1 !== b.nodeType || !e(b).is(a));) 1 === b.nodeType && c.push(b), b = b[d];
            return c
        },
        sibling: function(b, d) {
            for (var a = []; b; b = b.nextSibling) 1 === b.nodeType && b !== d && a.push(b);
            return a
        }
    });
    var $a = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ec = / jQuery\d+="(?:null|\d+)"/g,
        ob = RegExp("<(?:" + $a + ")[\\s/>]",
            "i"),
        Sa = /^\s+/,
        pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        qb = /<([\w:]+)/,
        rb = /<tbody/i,
        fc = /<|&#?\w+;/,
        gc = /<(?:script|style|link)/i,
        La = /^(?:checkbox|radio)$/i,
        hc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        sb = /^$|\/(?:java|ecma)script/i,
        Gb = /^true\/(.*)/,
        ic = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ba = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: e.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Ta = I(D).appendChild(D.createElement("div"));
    ba.optgroup = ba.option;
    ba.tbody = ba.tfoot = ba.colgroup = ba.caption = ba.thead;
    ba.th = ba.td;
    e.fn.extend({
        text: function(b) {
            return e.access(this, function(b) {
                    return b === g ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || D).createTextNode(b))
                },
                null, b, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(b) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || K(this, b).appendChild(b)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(b) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var d = K(this, b);
                    d.insertBefore(b, d.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(b) {
                this.parentNode && this.parentNode.insertBefore(b, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
                function(b) {
                    this.parentNode && this.parentNode.insertBefore(b, this.nextSibling)
                })
        },
        remove: function(b, d) {
            for (var a, c = b ? e.filter(b, this) : this, l = 0; null != (a = c[l]); l++) d || 1 !== a.nodeType || e.cleanData(f(a)), a.parentNode && (d && e.contains(a.ownerDocument, a) && J(f(a, "script")), a.parentNode.removeChild(a));
            return this
        },
        empty: function() {
            for (var b, d = 0; null != (b = this[d]); d++) {
                for (1 === b.nodeType && e.cleanData(f(b, !1)); b.firstChild;) b.removeChild(b.firstChild);
                b.options && e.nodeName(b, "select") && (b.options.length = 0)
            }
            return this
        },
        clone: function(b, d) {
            return b = null == b ? !1 : b, d = null == d ? b : d, this.map(function() {
                return e.clone(this, b, d)
            })
        },
        html: function(b) {
            return e.access(this, function(b) {
                var a = this[0] || {},
                    d = 0,
                    c = this.length;
                if (b === g) return 1 === a.nodeType ? a.innerHTML.replace(ec, "") : g;
                if (!("string" != typeof b || gc.test(b) || !e.support.htmlSerialize && ob.test(b) || !e.support.leadingWhitespace && Sa.test(b) || ba[(qb.exec(b) || ["", ""])[1].toLowerCase()])) {
                    b = b.replace(pb, "<$1></$2>");
                    try {
                        for (; c > d; d++) a = this[d] || {}, 1 === a.nodeType && (e.cleanData(f(a, !1)), a.innerHTML = b);
                        a = 0
                    } catch (r) {}
                }
                a && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function() {
            var b = e.map(this, function(b) {
                    return [b.nextSibling, b.parentNode]
                }),
                a = 0;
            return this.domManip(arguments, function(d) {
                var c = b[a++],
                    k = b[a++];
                k && (c && c.parentNode !== k && (c = this.nextSibling), e(this).remove(), k.insertBefore(d, c))
            }, !0), a ? this : this.remove()
        },
        detach: function(b) {
            return this.remove(b, !0)
        },
        domManip: function(b, a, c) {
            b = fb.apply([], b);
            var d, k, l, g, h = 0,
                m = this.length,
                A = this,
                B = m - 1,
                n = b[0],
                t = e.isFunction(n);
            if (t || !(1 >= m || "string" != typeof n || e.support.checkClone) && hc.test(n)) return this.each(function(d) {
                var e = A.eq(d);
                t && (b[0] = n.call(this, d, e.html()));
                e.domManip(b, a, c)
            });
            if (m && (g = e.buildFragment(b, this[0].ownerDocument, !1, !c && this), d = g.firstChild, 1 === g.childNodes.length && (g = d), d)) {
                l = e.map(f(g, "script"), C);
                for (k = l.length; m > h; h++) d = g, h !== B && (d = e.clone(d, !0, !0), k && e.merge(l, f(d, "script"))), a.call(this[h], d, h);
                if (k)
                    for (g = l[l.length - 1].ownerDocument, e.map(l, p), h = 0; k > h; h++) d = l[h], sb.test(d.type || "") && !e._data(d,
                        "globalEval") && e.contains(g, d) && (d.src ? e._evalUrl(d.src) : e.globalEval((d.text || d.textContent || d.innerHTML || "").replace(ic, "")));
                g = d = null
            }
            return this
        }
    });
    e.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, a) {
        e.fn[b] = function(b) {
            for (var d = 0, c = [], k = e(b), f = k.length - 1; f >= d; d++) b = d === f ? this : this.clone(!0), e(k[d])[a](b), Na.apply(c, b.get());
            return this.pushStack(c)
        }
    });
    e.extend({
        clone: function(b, d, a) {
            var c, k, l, g, h, m = e.contains(b.ownerDocument,
                b);
            if (e.support.html5Clone || e.isXMLDoc(b) || !ob.test("<" + b.nodeName + ">") ? l = b.cloneNode(!0) : (Ta.innerHTML = b.outerHTML, Ta.removeChild(l = Ta.firstChild)), !(e.support.noCloneEvent && e.support.noCloneChecked || 1 !== b.nodeType && 11 !== b.nodeType || e.isXMLDoc(b)))
                for (c = f(l), h = f(b), g = 0; null != (k = h[g]); ++g)
                    if (c[g]) {
                        var A = void 0,
                            B, n = k,
                            t = c[g];
                        if (1 === t.nodeType) {
                            if (B = t.nodeName.toLowerCase(), !e.support.noCloneEvent && t[e.expando]) {
                                k = e._data(t);
                                for (A in k.events) e.removeEvent(t, A, k.handle);
                                t.removeAttribute(e.expando)
                            }
                            "script" ===
                            B && t.text !== n.text ? (C(t).text = n.text, p(t)) : "object" === B ? (t.parentNode && (t.outerHTML = n.outerHTML), e.support.html5Clone && n.innerHTML && !e.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : "input" === B && La.test(n.type) ? (t.defaultChecked = t.checked = n.checked, t.value !== n.value && (t.value = n.value)) : "option" === B ? t.defaultSelected = t.selected = n.defaultSelected : ("input" === B || "textarea" === B) && (t.defaultValue = n.defaultValue)
                        }
                    }
            if (d)
                if (a)
                    for (h = h || f(b), c = c || f(l), g = 0; null != (k = h[g]); g++) M(k, c[g]);
                else M(b, l);
            return c = f(l,
                "script"), 0 < c.length && J(c, !m && f(b, "script")), l
        },
        buildFragment: function(b, a, c, l) {
            for (var d, k, g, h, q, m, p, B = b.length, A = I(a), t = [], n = 0; B > n; n++)
                if (k = b[n], k || 0 === k)
                    if ("object" === e.type(k)) e.merge(t, k.nodeType ? [k] : k);
                    else if (fc.test(k)) {
                h = h || A.appendChild(a.createElement("div"));
                q = (qb.exec(k) || ["", ""])[1].toLowerCase();
                p = ba[q] || ba._default;
                h.innerHTML = p[1] + k.replace(pb, "<$1></$2>") + p[2];
                for (d = p[0]; d--;) h = h.lastChild;
                if (!e.support.leadingWhitespace && Sa.test(k) && t.push(a.createTextNode(Sa.exec(k)[0])), !e.support.tbody)
                    for (d =
                        (k = "table" !== q || rb.test(k) ? "<table>" !== p[1] || rb.test(k) ? 0 : h : h.firstChild) && k.childNodes.length; d--;) e.nodeName(m = k.childNodes[d], "tbody") && !m.childNodes.length && k.removeChild(m);
                e.merge(t, h.childNodes);
                for (h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                h = A.lastChild
            } else t.push(a.createTextNode(k));
            h && A.removeChild(h);
            e.support.appendChecked || e.grep(f(t, "input"), S);
            for (n = 0; k = t[n++];)
                if ((!l || -1 === e.inArray(k, l)) && (g = e.contains(k.ownerDocument, k), h = f(A.appendChild(k), "script"), g && J(h), c))
                    for (d =
                        0; k = h[d++];) sb.test(k.type || "") && c.push(k);
            return A
        },
        cleanData: function(b, a) {
            for (var d, c, f, l, g = 0, h = e.expando, m = e.cache, p = e.support.deleteExpando, A = e.event.special; null != (d = b[g]); g++)
                if ((a || e.acceptData(d)) && (f = d[h], l = f && m[f])) {
                    if (l.events)
                        for (c in l.events) A[c] ? e.event.remove(d, c) : e.removeEvent(d, c, l.handle);
                    m[f] && (delete m[f], p ? delete d[h] : typeof d.removeAttribute !== fa ? d.removeAttribute(h) : d[h] = null, ra.push(f))
                }
        },
        _evalUrl: function(b) {
            return e.ajax({
                url: b,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    e.fn.extend({
        wrapAll: function(b) {
            if (e.isFunction(b)) return this.each(function(d) {
                e(this).wrapAll(b.call(this, d))
            });
            if (this[0]) {
                var d = e(b, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && d.insertBefore(this[0]);
                d.map(function() {
                    for (var b = this; b.firstChild && 1 === b.firstChild.nodeType;) b = b.firstChild;
                    return b
                }).append(this)
            }
            return this
        },
        wrapInner: function(b) {
            return e.isFunction(b) ? this.each(function(d) {
                e(this).wrapInner(b.call(this, d))
            }) : this.each(function() {
                var d = e(this),
                    a =
                    d.contents();
                a.length ? a.wrapAll(b) : d.append(b)
            })
        },
        wrap: function(b) {
            var d = e.isFunction(b);
            return this.each(function(a) {
                e(this).wrapAll(d ? b.call(this, a) : b)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                e.nodeName(this, "body") || e(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var ja, Z, ia, Ua = /alpha\([^)]*\)/i,
        jc = /opacity\s*=\s*([^)]*)/,
        kc = /^(top|right|bottom|left)$/,
        lc = /^(none|table(?!-c[ea]).+)/,
        tb = /^margin/,
        Hb = RegExp("^(" + Ga + ")(.*)$", "i"),
        Ba = RegExp("^(" + Ga + ")(?!px)[a-z%]+$", "i"),
        mc = RegExp("^([+-])=(" +
            Ga + ")", "i"),
        bb = {
            BODY: "block"
        },
        nc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ub = {
            letterSpacing: 0,
            fontWeight: 400
        },
        ha = ["Top", "Right", "Bottom", "Left"],
        ab = ["Webkit", "O", "Moz", "ms"];
    e.fn.extend({
        css: function(b, a) {
            return e.access(this, function(b, a, d) {
                var c, k = {},
                    f = 0;
                if (e.isArray(a)) {
                    c = Z(b);
                    for (d = a.length; d > f; f++) k[a[f]] = e.css(b, a[f], !1, c);
                    return k
                }
                return d !== g ? e.style(b, a, d) : e.css(b, a)
            }, b, a, 1 < arguments.length)
        },
        show: function() {
            return U(this, !0)
        },
        hide: function() {
            return U(this)
        },
        toggle: function(b) {
            return "boolean" ==
                typeof b ? b ? this.show() : this.hide() : this.each(function() {
                    E(this) ? e(this).show() : e(this).hide()
                })
        }
    });
    e.extend({
        cssHooks: {
            opacity: {
                get: function(b, a) {
                    if (a) {
                        var d = ia(b, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": e.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(b, a, c, f) {
            if (b && 3 !== b.nodeType && 8 !== b.nodeType && b.style) {
                var d, k, l, h = e.camelCase(a),
                    q = b.style;
                if (a =
                    e.cssProps[h] || (e.cssProps[h] = L(q, h)), l = e.cssHooks[a] || e.cssHooks[h], c === g) return l && "get" in l && (d = l.get(b, !1, f)) !== g ? d : q[a];
                if (k = typeof c, "string" === k && (d = mc.exec(c)) && (c = (d[1] + 1) * d[2] + parseFloat(e.css(b, a)), k = "number"), !(null == c || "number" === k && isNaN(c) || ("number" !== k || e.cssNumber[h] || (c += "px"), e.support.clearCloneStyle || "" !== c || 0 !== a.indexOf("background") || (q[a] = "inherit"), l && "set" in l && (c = l.set(b, c, f)) === g))) try {
                    q[a] = c
                } catch (zc) {}
            }
        },
        css: function(b, a, c, f) {
            var d, k, l, h = e.camelCase(a);
            return a = e.cssProps[h] ||
                (e.cssProps[h] = L(b.style, h)), l = e.cssHooks[a] || e.cssHooks[h], l && "get" in l && (k = l.get(b, !0, c)), k === g && (k = ia(b, a, f)), "normal" === k && a in ub && (k = ub[a]), "" === c || c ? (d = parseFloat(k), !0 === c || e.isNumeric(d) ? d || 0 : k) : k
        }
    });
    a.getComputedStyle ? (Z = function(b) {
        return a.getComputedStyle(b, null)
    }, ia = function(b, a, c) {
        var d, f, k, l = (c = c || Z(b)) ? c.getPropertyValue(a) || c[a] : g,
            h = b.style;
        return c && ("" !== l || e.contains(b.ownerDocument, b) || (l = e.style(b, a)), Ba.test(l) && tb.test(a) && (d = h.width, f = h.minWidth, k = h.maxWidth, h.minWidth = h.maxWidth =
            h.width = l, l = c.width, h.width = d, h.minWidth = f, h.maxWidth = k)), l
    }) : D.documentElement.currentStyle && (Z = function(b) {
        return b.currentStyle
    }, ia = function(b, a, e) {
        var d, c, f;
        e = (e = e || Z(b)) ? e[a] : g;
        var k = b.style;
        return null == e && k && k[a] && (e = k[a]), Ba.test(e) && !kc.test(a) && (d = k.left, c = b.runtimeStyle, f = c && c.left, f && (c.left = b.currentStyle.left), k.left = "fontSize" === a ? "1em" : e, e = k.pixelLeft + "px", k.left = d, f && (c.left = f)), "" === e ? "auto" : e
    });
    e.each(["height", "width"], function(b, a) {
        e.cssHooks[a] = {
            get: function(b, d, c) {
                return d ?
                    0 === b.offsetWidth && lc.test(e.css(b, "display")) ? e.swap(b, nc, function() {
                        return sa(b, a, c)
                    }) : sa(b, a, c) : g
            },
            set: function(b, d, f) {
                var k = f && Z(b);
                return aa(b, d, f ? c(b, a, f, e.support.boxSizing && "border-box" === e.css(b, "boxSizing", !1, k), k) : 0)
            }
        }
    });
    e.support.opacity || (e.cssHooks.opacity = {
        get: function(b, a) {
            return jc.test((a && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : a ? "1" : ""
        },
        set: function(b, a) {
            var d = b.style,
                c = b.currentStyle,
                f = e.isNumeric(a) ? "alpha(opacity=" + 100 * a + ")" : "",
                l = c && c.filter || d.filter || "";
            d.zoom = 1;
            (1 <= a || "" === a) && "" === e.trim(l.replace(Ua, "")) && d.removeAttribute && (d.removeAttribute("filter"), "" === a || c && !c.filter) || (d.filter = Ua.test(l) ? l.replace(Ua, f) : l + " " + f)
        }
    });
    e(function() {
        e.support.reliableMarginRight || (e.cssHooks.marginRight = {
            get: function(b, a) {
                return a ? e.swap(b, {
                    display: "inline-block"
                }, ia, [b, "marginRight"]) : g
            }
        });
        !e.support.pixelPosition && e.fn.position && e.each(["top", "left"], function(b, a) {
            e.cssHooks[a] = {
                get: function(b, d) {
                    return d ? (d = ia(b, a), Ba.test(d) ?
                        e(b).position()[a] + "px" : d) : g
                }
            }
        })
    });
    e.expr && e.expr.filters && (e.expr.filters.hidden = function(b) {
        return 0 >= b.offsetWidth && 0 >= b.offsetHeight || !e.support.reliableHiddenOffsets && "none" === (b.style && b.style.display || e.css(b, "display"))
    }, e.expr.filters.visible = function(b) {
        return !e.expr.filters.hidden(b)
    });
    e.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(b, a) {
        e.cssHooks[b + a] = {
            expand: function(d) {
                var e = 0,
                    c = {};
                for (d = "string" == typeof d ? d.split(" ") : [d]; 4 > e; e++) c[b + ha[e] + a] = d[e] || d[e - 2] || d[0];
                return c
            }
        };
        tb.test(b) ||
            (e.cssHooks[b + a].set = aa)
    });
    var oc = /%20/g,
        Ib = /\[\]$/,
        vb = /\r?\n/g,
        pc = /^(?:submit|button|image|reset|file)$/i,
        qc = /^(?:input|select|textarea|keygen)/i;
    e.fn.extend({
        serialize: function() {
            return e.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var b = e.prop(this, "elements");
                return b ? e.makeArray(b) : this
            }).filter(function() {
                var b = this.type;
                return this.name && !e(this).is(":disabled") && qc.test(this.nodeName) && !pc.test(b) && (this.checked || !La.test(b))
            }).map(function(b, a) {
                var d =
                    e(this).val();
                return null == d ? null : e.isArray(d) ? e.map(d, function(b) {
                    return {
                        name: a.name,
                        value: b.replace(vb, "\r\n")
                    }
                }) : {
                    name: a.name,
                    value: d.replace(vb, "\r\n")
                }
            }).get()
        }
    });
    e.param = function(b, a) {
        var d, c = [],
            f = function(b, a) {
                a = e.isFunction(a) ? a() : null == a ? "" : a;
                c[c.length] = encodeURIComponent(b) + "=" + encodeURIComponent(a)
            };
        if (a === g && (a = e.ajaxSettings && e.ajaxSettings.traditional), e.isArray(b) || b.jquery && !e.isPlainObject(b)) e.each(b, function() {
            f(this.name, this.value)
        });
        else
            for (d in b) B(d, b[d], a, f);
        return c.join("&").replace(oc,
            "+")
    };
    e.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(b, a) {
        e.fn[a] = function(b, d) {
            return 0 < arguments.length ? this.on(a, null, b, d) : this.trigger(a)
        }
    });
    e.fn.extend({
        hover: function(b, a) {
            return this.mouseenter(b).mouseleave(a || b)
        },
        bind: function(b, a, e) {
            return this.on(b, null, a, e)
        },
        unbind: function(b, a) {
            return this.off(b, null, a)
        },
        delegate: function(b, a, e, c) {
            return this.on(a, b, e, c)
        },
        undelegate: function(b, a, e) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(a, b || "**", e)
        }
    });
    var ea, W, Va = e.now(),
        Wa = /\?/,
        rc = /#.*$/,
        wb = /([?&])_=[^&]*/,
        sc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        tc = /^(?:GET|HEAD)$/,
        uc = /^\/\//,
        xb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        yb = e.fn.load,
        zb = {},
        Ma = {},
        Ab = "*/".concat("*");
    try {
        W = Jb.href
    } catch (b) {
        W = D.createElement("a"), W.href = "", W = W.href
    }
    ea = xb.exec(W.toLowerCase()) || [];
    e.fn.load = function(b, a, c) {
        if ("string" !=
            typeof b && yb) return yb.apply(this, arguments);
        var d, f, k, l = this,
            h = b.indexOf(" ");
        return 0 <= h && (d = b.slice(h, b.length), b = b.slice(0, h)), e.isFunction(a) ? (c = a, a = g) : a && "object" == typeof a && (k = "POST"), 0 < l.length && e.ajax({
            url: b,
            type: k,
            dataType: "html",
            data: a
        }).done(function(b) {
            f = arguments;
            l.html(d ? e("<div>").append(e.parseHTML(b)).find(d) : b)
        }).complete(c && function(b, a) {
            l.each(c, f || [b.responseText, a, b])
        }), this
    };
    e.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, a) {
        e.fn[a] =
            function(b) {
                return this.on(a, b)
            }
    });
    e.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: W,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ea[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ab,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": e.parseJSON,
                "text xml": e.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(b, a) {
            return a ? N(N(b, e.ajaxSettings), a) : N(e.ajaxSettings, b)
        },
        ajaxPrefilter: l(zb),
        ajaxTransport: l(Ma),
        ajax: function(b, a) {
            function d(b, a, d, c) {
                var f, k, q, r, A = a;
                if (2 !== J) {
                    J = 2;
                    m && clearTimeout(m);
                    B = g;
                    h = c || "";
                    E.readyState = 0 < b ? 4 : 0;
                    c = 200 <= b && 300 > b || 304 === b;
                    if (d) {
                        q = n;
                        for (var x = E, t, z, w, N, K = q.contents, H = q.dataTypes;
                            "*" === H[0];) H.shift(), z === g && (z = q.mimeType ||
                            x.getResponseHeader("Content-Type"));
                        if (z)
                            for (N in K)
                                if (K[N] && K[N].test(z)) {
                                    H.unshift(N);
                                    break
                                }
                        if (H[0] in d) w = H[0];
                        else {
                            for (N in d) {
                                if (!H[0] || q.converters[N + " " + H[0]]) {
                                    w = N;
                                    break
                                }
                                t || (t = N)
                            }
                            w = w || t
                        }
                        q = w ? (w !== H[0] && H.unshift(w), d[w]) : g
                    }
                    var C;
                    a: {
                        d = n;
                        t = q;
                        z = E;
                        w = c;
                        var O, L, I;
                        q = {};
                        x = d.dataTypes.slice();
                        if (x[1])
                            for (O in d.converters) q[O.toLowerCase()] = d.converters[O];
                        for (N = x.shift(); N;)
                            if (d.responseFields[N] && (z[d.responseFields[N]] = t), !I && w && d.dataFilter && (t = d.dataFilter(t, d.dataType)), I = N, N = x.shift())
                                if ("*" ===
                                    N) N = I;
                                else if ("*" !== I && I !== N) {
                            if (O = q[I + " " + N] || q["* " + N], !O)
                                for (C in q)
                                    if (L = C.split(" "), L[1] === N && (O = q[I + " " + L[0]] || q["* " + L[0]])) {
                                        !0 === O ? O = q[C] : !0 !== q[C] && (N = L[0], x.unshift(L[1]));
                                        break
                                    }
                            if (!0 !== O)
                                if (O && d["throws"]) t = O(t);
                                else try {
                                    t = O(t)
                                } catch (Xb) {
                                    C = {
                                        state: "parsererror",
                                        error: O ? Xb : "No conversion from " + I + " to " + N
                                    };
                                    break a
                                }
                        }
                        C = {
                            state: "success",
                            data: t
                        }
                    }
                    q = C;
                    c ? (n.ifModified && (r = E.getResponseHeader("Last-Modified"), r && (e.lastModified[l] = r), r = E.getResponseHeader("etag"), r && (e.etag[l] = r)), 204 === b || "HEAD" ===
                        n.type ? A = "nocontent" : 304 === b ? A = "notmodified" : (A = q.state, f = q.data, k = q.error, c = !k)) : (k = A, (b || !A) && (A = "error", 0 > b && (b = 0)));
                    E.status = b;
                    E.statusText = (a || A) + "";
                    c ? S.resolveWith(u, [f, A, E]) : S.rejectWith(u, [E, A, k]);
                    E.statusCode(G);
                    G = g;
                    p && y.trigger(c ? "ajaxSuccess" : "ajaxError", [E, n, c ? f : k]);
                    v.fireWith(u, [E, A]);
                    p && (y.trigger("ajaxComplete", [E, n]), --e.active || e.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof b && (a = b, b = g);
            a = a || {};
            var c, f, l, h, m, p, B, t, n = e.ajaxSetup({}, a),
                u = n.context || n,
                y = n.context && (u.nodeType || u.jquery) ?
                e(u) : e.event,
                S = e.Deferred(),
                v = e.Callbacks("once memory"),
                G = n.statusCode || {},
                w = {},
                N = {},
                J = 0,
                K = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(b) {
                        var a;
                        if (2 === J) {
                            if (!t)
                                for (t = {}; a = sc.exec(h);) t[a[1].toLowerCase()] = a[2];
                            a = t[b.toLowerCase()]
                        }
                        return null == a ? null : a
                    },
                    getAllResponseHeaders: function() {
                        return 2 === J ? h : null
                    },
                    setRequestHeader: function(b, a) {
                        var d = b.toLowerCase();
                        return J || (b = N[d] = N[d] || b, w[b] = a), this
                    },
                    overrideMimeType: function(b) {
                        return J || (n.mimeType = b), this
                    },
                    statusCode: function(b) {
                        var a;
                        if (b)
                            if (2 > J)
                                for (a in b) G[a] = [G[a], b[a]];
                            else E.always(b[E.status]);
                        return this
                    },
                    abort: function(b) {
                        b = b || K;
                        return B && B.abort(b), d(0, b), this
                    }
                };
            if (S.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, n.url = ((b || n.url || W) + "").replace(rc, "").replace(uc, ea[1] + "//"), n.type = a.method || a.type || n.method || n.type, n.dataTypes = e.trim(n.dataType || "*").toLowerCase().match(T) || [""], null == n.crossDomain && (c = xb.exec(n.url.toLowerCase()), n.crossDomain = !(!c || c[1] === ea[1] && c[2] === ea[2] && (c[3] || ("http:" === c[1] ? "80" :
                    "443")) === (ea[3] || ("http:" === ea[1] ? "80" : "443")))), n.data && n.processData && "string" != typeof n.data && (n.data = e.param(n.data, n.traditional)), A(zb, n, a, E), 2 === J) return E;
            (p = n.global) && 0 === e.active++ && e.event.trigger("ajaxStart");
            n.type = n.type.toUpperCase();
            n.hasContent = !tc.test(n.type);
            l = n.url;
            n.hasContent || (n.data && (l = n.url += (Wa.test(l) ? "&" : "?") + n.data, delete n.data), !1 === n.cache && (n.url = wb.test(l) ? l.replace(wb, "$1_=" + Va++) : l + (Wa.test(l) ? "&" : "?") + "_=" + Va++));
            n.ifModified && (e.lastModified[l] && E.setRequestHeader("If-Modified-Since",
                e.lastModified[l]), e.etag[l] && E.setRequestHeader("If-None-Match", e.etag[l]));
            (n.data && n.hasContent && !1 !== n.contentType || a.contentType) && E.setRequestHeader("Content-Type", n.contentType);
            E.setRequestHeader("Accept", n.dataTypes[0] && n.accepts[n.dataTypes[0]] ? n.accepts[n.dataTypes[0]] + ("*" !== n.dataTypes[0] ? ", " + Ab + "; q=0.01" : "") : n.accepts["*"]);
            for (f in n.headers) E.setRequestHeader(f, n.headers[f]);
            if (n.beforeSend && (!1 === n.beforeSend.call(u, E, n) || 2 === J)) return E.abort();
            K = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) E[f](n[f]);
            if (B = A(Ma, n, a, E)) {
                E.readyState = 1;
                p && y.trigger("ajaxSend", [E, n]);
                n.async && 0 < n.timeout && (m = setTimeout(function() {
                    E.abort("timeout")
                }, n.timeout));
                try {
                    J = 1, B.send(w, d)
                } catch (jb) {
                    if (!(2 > J)) throw jb;
                    d(-1, jb)
                }
            } else d(-1, "No Transport");
            return E
        },
        getJSON: function(b, a, c) {
            return e.get(b, a, c, "json")
        },
        getScript: function(b, a) {
            return e.get(b, g, a, "script")
        }
    });
    e.each(["get", "post"], function(b, a) {
        e[a] = function(b, d, c, f) {
            return e.isFunction(d) && (f = f || c, c = d, d = g), e.ajax({
                url: b,
                type: a,
                dataType: f,
                data: d,
                success: c
            })
        }
    });
    e.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(b) {
                return e.globalEval(b), b
            }
        }
    });
    e.ajaxPrefilter("script", function(b) {
        b.cache === g && (b.cache = !1);
        b.crossDomain && (b.type = "GET", b.global = !1)
    });
    e.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var a, c = D.head || e("head")[0] || D.documentElement;
            return {
                send: function(d, e) {
                    a = D.createElement("script");
                    a.async = !0;
                    b.scriptCharset && (a.charset = b.scriptCharset);
                    a.src = b.url;
                    a.onload = a.onreadystatechange = function(b, d) {
                        (d || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null, a.parentNode && a.parentNode.removeChild(a), a = null, d || e(200, "success"))
                    };
                    c.insertBefore(a, c.firstChild)
                },
                abort: function() {
                    a && a.onload(g, !0)
                }
            }
        }
    });
    var Bb = [],
        Xa = /(=)\?(?=&|$)|\?\?/;
    e.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = Bb.pop() || e.expando + "_" + Va++;
            return this[b] = !0, b
        }
    });
    e.ajaxPrefilter("json jsonp",
        function(b, d, c) {
            var f, k, l, h = !1 !== b.jsonp && (Xa.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Xa.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (f = b.jsonpCallback = e.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Xa, "$1" + f) : !1 !== b.jsonp && (b.url += (Wa.test(b.url) ? "&" : "?") + b.jsonp + "=" + f), b.converters["script json"] = function() {
                    return l || e.error(f + " was not called"), l[0]
                }, b.dataTypes[0] = "json", k = a[f],
                a[f] = function() {
                    l = arguments
                }, c.always(function() {
                    a[f] = k;
                    b[f] && (b.jsonpCallback = d.jsonpCallback, Bb.push(f));
                    l && e.isFunction(k) && k(l[0]);
                    l = k = g
                }), "script") : g
        });
    var za, Aa, vc = 0,
        Ya = a.ActiveXObject && function() {
            for (var b in za) za[b](g, !0)
        };
    e.ajaxSettings.xhr = a.ActiveXObject ? function() {
        var b;
        if (!(b = !this.isLocal && O())) a: {
            try {
                b = new a.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (d) {}
            b = void 0
        }
        return b
    } : O;
    Aa = e.ajaxSettings.xhr();
    e.support.cors = !!Aa && "withCredentials" in Aa;
    (Aa = e.support.ajax = !!Aa) && e.ajaxTransport(function(b) {
        if (!b.crossDomain ||
            e.support.cors) {
            var d;
            return {
                send: function(c, f) {
                    var k, l, h = b.xhr();
                    if (b.username ? h.open(b.type, b.url, b.async, b.username, b.password) : h.open(b.type, b.url, b.async), b.xhrFields)
                        for (l in b.xhrFields) h[l] = b.xhrFields[l];
                    b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType);
                    b.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (l in c) h.setRequestHeader(l, c[l])
                    } catch (Y) {}
                    h.send(b.hasContent && b.data || null);
                    d = function(a, c) {
                        var l, q, n, m;
                        try {
                            if (d && (c || 4 === h.readyState))
                                if (d =
                                    g, k && (h.onreadystatechange = e.noop, Ya && delete za[k]), c) 4 !== h.readyState && h.abort();
                                else {
                                    m = {};
                                    l = h.status;
                                    q = h.getAllResponseHeaders();
                                    "string" == typeof h.responseText && (m.text = h.responseText);
                                    try {
                                        n = h.statusText
                                    } catch (Ha) {
                                        n = ""
                                    }
                                    l || !b.isLocal || b.crossDomain ? 1223 === l && (l = 204) : l = m.text ? 200 : 404
                                }
                        } catch (Ha) {
                            c || f(-1, Ha)
                        }
                        m && f(l, n, m, q)
                    };
                    b.async ? 4 === h.readyState ? setTimeout(d) : (k = ++vc, Ya && (za || (za = {}, e(a).unload(Ya)), za[k] = d), h.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(g, !0)
                }
            }
        }
    });
    var la, Ka, wc = /^(?:toggle|show|hide)$/,
        Cb = RegExp("^(?:([+-])=|)(" + Ga + ")([a-z%]*)$", "i"),
        xc = /queueHooks$/,
        Ca = [function(b, a, c) {
            var d, f, k, l, g, h = this,
                m = {},
                n = b.style,
                p = b.nodeType && E(b),
                A = e._data(b, "fxshow");
            c.queue || (l = e._queueHooks(b, "fx"), null == l.unqueued && (l.unqueued = 0, g = l.empty.fire, l.empty.fire = function() {
                l.unqueued || g()
            }), l.unqueued++, h.always(function() {
                h.always(function() {
                    l.unqueued--;
                    e.queue(b, "fx").length || l.empty.fire()
                })
            }));
            1 === b.nodeType && ("height" in a || "width" in a) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], "inline" ===
                e.css(b, "display") && "none" === e.css(b, "float") && (e.support.inlineBlockNeedsLayout && "inline" !== Q(b.nodeName) ? n.zoom = 1 : n.display = "inline-block"));
            c.overflow && (n.overflow = "hidden", e.support.shrinkWrapBlocks || h.always(function() {
                n.overflow = c.overflow[0];
                n.overflowX = c.overflow[1];
                n.overflowY = c.overflow[2]
            }));
            for (d in a)(f = a[d], wc.exec(f)) && (delete a[d], k = k || "toggle" === f, f !== (p ? "hide" : "show")) && (m[d] = A && A[d] || e.style(b, d));
            if (!e.isEmptyObject(m))
                for (d in A ? "hidden" in A && (p = A.hidden) : A = e._data(b, "fxshow", {}), k && (A.hidden = !p), p ? e(b).show() : h.done(function() {
                        e(b).hide()
                    }), h.done(function() {
                        var a;
                        e._removeData(b, "fxshow");
                        for (a in m) e.style(b, a, m[a])
                    }), m) a = oa(p ? A[d] : 0, d, h), d in A || (A[d] = a.start, p && (a.end = a.start, a.start = "width" === d || "height" === d ? 1 : 0))
        }],
        pa = {
            "*": [function(b, a) {
                var d = this.createTween(b, a),
                    c = d.cur(),
                    f = Cb.exec(a),
                    l = f && f[3] || (e.cssNumber[b] ? "" : "px"),
                    g = (e.cssNumber[b] || "px" !== l && +c) && Cb.exec(e.css(d.elem, b)),
                    h = 1,
                    n = 20;
                if (g && g[3] !== l) {
                    l = l || g[3];
                    f = f || [];
                    g = +c || 1;
                    do h = h || ".5", g /= h, e.style(d.elem,
                        b, g + l); while (h !== (h = d.cur() / c) && 1 !== h && --n)
                }
                return f && (g = d.start = +g || +c || 0, d.unit = l, d.end = f[1] ? g + (f[1] + 1) * f[2] : +f[2]), d
            }]
        };
    e.Animation = e.extend(ta, {
        tweener: function(b, a) {
            e.isFunction(b) ? (a = b, b = ["*"]) : b = b.split(" ");
            for (var d, c = 0, f = b.length; f > c; c++) d = b[c], pa[d] = pa[d] || [], pa[d].unshift(a)
        },
        prefilter: function(b, a) {
            a ? Ca.unshift(b) : Ca.push(b)
        }
    });
    e.Tween = X;
    X.prototype = {
        constructor: X,
        init: function(b, a, c, f, l, g) {
            this.elem = b;
            this.prop = c;
            this.easing = l || "swing";
            this.options = a;
            this.start = this.now = this.cur();
            this.end =
                f;
            this.unit = g || (e.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var b = X.propHooks[this.prop];
            return b && b.get ? b.get(this) : X.propHooks._default.get(this)
        },
        run: function(b) {
            var a, c = X.propHooks[this.prop];
            return this.pos = a = this.options.duration ? e.easing[this.easing](b, this.options.duration * b, 0, 1, this.options.duration) : b, this.now = (this.end - this.start) * a + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : X.propHooks._default.set(this), this
        }
    };
    X.prototype.init.prototype =
        X.prototype;
    X.propHooks = {
        _default: {
            get: function(b) {
                var a;
                return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (a = e.css(b.elem, b.prop, ""), a && "auto" !== a ? a : 0) : b.elem[b.prop]
            },
            set: function(b) {
                e.fx.step[b.prop] ? e.fx.step[b.prop](b) : b.elem.style && (null != b.elem.style[e.cssProps[b.prop]] || e.cssHooks[b.prop]) ? e.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
            }
        }
    };
    X.propHooks.scrollTop = X.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    };
    e.each(["toggle", "show", "hide"], function(b, a) {
        var d = e.fn[a];
        e.fn[a] = function(b, e, c) {
            return null == b || "boolean" == typeof b ? d.apply(this, arguments) : this.animate(ua(a, !0), b, e, c)
        }
    });
    e.fn.extend({
        fadeTo: function(b, a, e, c) {
            return this.filter(E).css("opacity", 0).show().end().animate({
                opacity: a
            }, b, e, c)
        },
        animate: function(b, a, c, f) {
            var d = e.isEmptyObject(b),
                k = e.speed(a, c, f);
            a = function() {
                var a = ta(this, e.extend({}, b), k);
                (d || e._data(this, "finish")) && a.stop(!0)
            };
            return a.finish = a, d || !1 === k.queue ? this.each(a) : this.queue(k.queue,
                a)
        },
        stop: function(b, a, c) {
            var d = function(b) {
                var a = b.stop;
                delete b.stop;
                a(c)
            };
            return "string" != typeof b && (c = a, a = b, b = g), a && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var a = !0,
                    f = null != b && b + "queueHooks",
                    k = e.timers,
                    l = e._data(this);
                if (f) l[f] && l[f].stop && d(l[f]);
                else
                    for (f in l) l[f] && l[f].stop && xc.test(f) && d(l[f]);
                for (f = k.length; f--;) k[f].elem !== this || null != b && k[f].queue !== b || (k[f].anim.stop(c), a = !1, k.splice(f, 1));
                !a && c || e.dequeue(this, b)
            })
        },
        finish: function(b) {
            return !1 !== b && (b = b || "fx"), this.each(function() {
                var a,
                    c = e._data(this),
                    f = c[b + "queue"];
                a = c[b + "queueHooks"];
                var l = e.timers,
                    g = f ? f.length : 0;
                c.finish = !0;
                e.queue(this, b, []);
                a && a.stop && a.stop.call(this, !0);
                for (a = l.length; a--;) l[a].elem === this && l[a].queue === b && (l[a].anim.stop(!0), l.splice(a, 1));
                for (a = 0; g > a; a++) f[a] && f[a].finish && f[a].finish.call(this);
                delete c.finish
            })
        }
    });
    e.each({
        slideDown: ua("show"),
        slideUp: ua("hide"),
        slideToggle: ua("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(b, a) {
        e.fn[b] = function(b, d, e) {
            return this.animate(a,
                b, d, e)
        }
    });
    e.speed = function(b, a, c) {
        var d = b && "object" == typeof b ? e.extend({}, b) : {
            complete: c || !c && a || e.isFunction(b) && b,
            duration: b,
            easing: c && a || a && !e.isFunction(a) && a
        };
        return d.duration = e.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in e.fx.speeds ? e.fx.speeds[d.duration] : e.fx.speeds._default, (null == d.queue || !0 === d.queue) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            e.isFunction(d.old) && d.old.call(this);
            d.queue && e.dequeue(this, d.queue)
        }, d
    };
    e.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return .5 - Math.cos(b * Math.PI) / 2
        }
    };
    e.timers = [];
    e.fx = X.prototype.init;
    e.fx.tick = function() {
        var b, a = e.timers,
            c = 0;
        for (la = e.now(); a.length > c; c++) b = a[c], b() || a[c] !== b || a.splice(c--, 1);
        a.length || e.fx.stop();
        la = g
    };
    e.fx.timer = function(b) {
        b() && e.timers.push(b) && e.fx.start()
    };
    e.fx.interval = 13;
    e.fx.start = function() {
        Ka || (Ka = setInterval(e.fx.tick, e.fx.interval))
    };
    e.fx.stop = function() {
        clearInterval(Ka);
        Ka = null
    };
    e.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    e.fx.step = {};
    e.expr && e.expr.filters && (e.expr.filters.animated =
        function(b) {
            return e.grep(e.timers, function(a) {
                return b === a.elem
            }).length
        });
    e.fn.offset = function(b) {
        if (arguments.length) return b === g ? this : this.each(function(a) {
            e.offset.setOffset(this, b, a)
        });
        var a, c, f = {
                top: 0,
                left: 0
            },
            l = this[0],
            h = l && l.ownerDocument;
        if (h) return a = h.documentElement, e.contains(a, l) ? (typeof l.getBoundingClientRect !== fa && (f = l.getBoundingClientRect()), c = cb(h), {
            top: f.top + (c.pageYOffset || a.scrollTop) - (a.clientTop || 0),
            left: f.left + (c.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
        }) : f
    };
    e.offset = {
        setOffset: function(b, a, c) {
            var d = e.css(b, "position");
            "static" === d && (b.style.position = "relative");
            var f = e(b),
                l = f.offset(),
                k = e.css(b, "top"),
                g = e.css(b, "left"),
                h = {},
                n = {},
                m, p;
            ("absolute" === d || "fixed" === d) && -1 < e.inArray("auto", [k, g]) ? (n = f.position(), m = n.top, p = n.left) : (m = parseFloat(k) || 0, p = parseFloat(g) || 0);
            e.isFunction(a) && (a = a.call(b, c, l));
            null != a.top && (h.top = a.top - l.top + m);
            null != a.left && (h.left = a.left - l.left + p);
            "using" in a ? a.using.call(b, h) : f.css(h)
        }
    };
    e.fn.extend({
        position: function() {
            if (this[0]) {
                var b,
                    a, c = {
                        top: 0,
                        left: 0
                    },
                    f = this[0];
                return "fixed" === e.css(f, "position") ? a = f.getBoundingClientRect() : (b = this.offsetParent(), a = this.offset(), e.nodeName(b[0], "html") || (c = b.offset()), c.top += e.css(b[0], "borderTopWidth", !0), c.left += e.css(b[0], "borderLeftWidth", !0)), {
                    top: a.top - c.top - e.css(f, "marginTop", !0),
                    left: a.left - c.left - e.css(f, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var b = this.offsetParent || eb; b && !e.nodeName(b, "html") && "static" === e.css(b, "position");) b = b.offsetParent;
                return b ||
                    eb
            })
        }
    });
    e.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, a) {
        var d = /Y/.test(a);
        e.fn[b] = function(c) {
            return e.access(this, function(b, c, f) {
                var l = cb(b);
                return f === g ? l ? a in l ? l[a] : l.document.documentElement[c] : b[c] : (l ? l.scrollTo(d ? e(l).scrollLeft() : f, d ? f : e(l).scrollTop()) : b[c] = f, g)
            }, b, c, arguments.length, null)
        }
    });
    e.each({
        Height: "height",
        Width: "width"
    }, function(b, a) {
        e.each({
            padding: "inner" + b,
            content: a,
            "": "outer" + b
        }, function(d, c) {
            e.fn[c] = function(c, f) {
                var l = arguments.length && (d || "boolean" !=
                        typeof c),
                    k = d || (!0 === c || !0 === f ? "margin" : "border");
                return e.access(this, function(a, d, c) {
                    var f;
                    return e.isWindow(a) ? a.document.documentElement["client" + b] : 9 === a.nodeType ? (f = a.documentElement, Math.max(a.body["scroll" + b], f["scroll" + b], a.body["offset" + b], f["offset" + b], f["client" + b])) : c === g ? e.css(a, d, k) : e.style(a, d, c, k)
                }, a, l ? c : g, l, null)
            }
        })
    });
    e.fn.size = function() {
        return this.length
    };
    e.fn.andSelf = e.fn.addBack;
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = e : (a.jQuery = a.$ =
        e, "function" == typeof define && define.amd && define("jquery", [], function() {
            return e
        }))
})(window);
(function(a) {
    function g(g) {
        function w() {
            g ? v.removeData(g) : I && delete h[I]
        }

        function u() {
            y.id = setTimeout(function() {
                y.fn()
            }, K)
        }
        var n = this,
            v, y = {},
            G = g ? a.fn : a,
            t = arguments,
            H = 4,
            I = t[1],
            K = t[2],
            C = t[3];
        "string" !== typeof I && (H--, I = g = 0, K = t[1], C = t[2]);
        g ? (v = n.eq(0), v.data(g, y = v.data(g) || {})) : I && (y = h[I] || (h[I] = {}));
        y.id && clearTimeout(y.id);
        delete y.id;
        if (C) y.fn = function(a) {
            "string" === typeof C && (C = G[C]);
            !0 !== C.apply(n, m.call(t, H)) || a ? w() : u()
        }, u();
        else {
            if (y.fn) return void 0 === K ? w() : y.fn(!1 === K), !0;
            w()
        }
    }
    var h = {},
        m = Array.prototype.slice;
    a.doTimeout = function() {
        return g.apply(window, [0].concat(m.call(arguments)))
    };
    a.fn.doTimeout = function() {
        var a = m.call(arguments),
            h = g.apply(this, ["doTimeout" + a[0]].concat(a));
        return "number" === typeof a[0] || "number" === typeof a[1] ? this : h
    }
})(jQuery);
! function(a, g) {
    function h(c) {
        return Q.formatter = F, a(this).on("click.boxer", a.extend({}, Q, c || {}), m)
    }

    function m(f) {
        var l = a(this),
            h = f.data.$object,
            n = l[0].attributes ? l.attr("href") || "" : "",
            m = n.toLowerCase().split(".").pop().split(/\#|\?/)[0],
            t = -1 < a.inArray(m, f.data.extensions) || "data:image" === n.substr(0, 10),
            B = -1 < n.indexOf("youtube.com/embed") || -1 < n.indexOf("player.vimeo.com/video"),
            w = !t && !B && "http" === n.substr(0, 4),
            S = !t && !B && !w && "#" === n.substr(0, 1),
            G = "undefined" != typeof h;
        if (!(1 < a("#boxer").length) && (t ||
                B || w || S || G)) {
            if (E(f), c = a.extend({}, {
                    $window: a(g),
                    $body: a("body"),
                    $target: l,
                    $object: h,
                    visible: !1,
                    resizeTimer: null,
                    touchTimer: null,
                    gallery: {
                        active: !1
                    },
                    isMobile: sa || f.data.mobile
                }, f.data), c.margin *= 2, c.containerHeight = c.height, c.containerWidth = c.width, c.type = t ? "image" : B ? "video" : "element", t || B) f = c.$target.data("gallery") || c.$target.attr("rel"), "undefined" != typeof f && !1 !== f && (c.gallery.active = !0, c.gallery.id = f, c.gallery.$items = a("a[data-gallery= " + c.gallery.id + "], a[rel= " + c.gallery.id + "]"), c.gallery.index =
                c.gallery.$items.index(c.$target), c.gallery.total = c.gallery.$items.length - 1);
            f = "";
            return c.isMobile || (f += '<div id="boxer-overlay" class="' + c.customClass + '" style="opacity: 0"></div>'), f += '<div id="boxer" class="loading ' + c.customClass, c.isMobile && (f += " mobile"), w && (f += " iframe"), (S || G) && (f += " inline"), f += '" style="opacity: 0;', !0 === c.fixed && (f += " position: fixed;"), f += '">', f += '<span class="boxer-close">' + c.labels.close + "</span>", f += '<div class="boxer-container" style="', f += c.isMobile ? "height: 100%; width: 100%" :
                "height: " + c.height + "px; width: " + c.width + "px", f += '">', f += '<div class="boxer-content" style="opacity: 0;">', (t || B) && (f += '<div class="boxer-meta">', c.gallery.active ? (f += '<div class="boxer-arrow previous">' + c.labels.previous + "</div>", f += '<div class="boxer-arrow next">' + c.labels.next + "</div>", f += '<p class="boxer-position"', 1 > c.gallery.total && (f += ' style="display: none;"'), f += ">", f += '<span class="current">' + (c.gallery.index + 1) + "</span> " + c.labels.count + ' <span class="total">' + (c.gallery.total + 1) + "</span>",
                    f += "</p>", f += '<div class="boxer-caption gallery">') : f += '<div class="boxer-caption">', f += c.formatter.apply(c.$body, [c.$target]), f += "</div></div>"), f += "</div></div></div>", c.$body.append(f), c.$overlay = a("#boxer-overlay"), c.$boxer = a("#boxer"), c.$container = c.$boxer.find(".boxer-container"), c.$content = c.$boxer.find(".boxer-content"), c.$meta = c.$boxer.find(".boxer-meta"), c.$position = c.$boxer.find(".boxer-position"), c.$caption = c.$boxer.find(".boxer-caption"), c.$arrows = c.$boxer.find(".boxer-arrow"), c.$animatables =
                a("#boxer-overlay, #boxer, .boxer-container"), c.paddingVertical = parseInt(c.$boxer.css("paddingTop"), 10) + parseInt(c.$boxer.css("paddingBottom"), 10), c.paddingHorizontal = parseInt(c.$boxer.css("paddingLeft"), 10) + parseInt(c.$boxer.css("paddingRight"), 10), u(), c.gallery.active && C(), c.$window.on("resize.boxer", V.resize).on("keydown.boxer", p), c.$body.on("touchstart.boxer click.boxer", "#boxer-overlay, #boxer .boxer-close", v).on("touchmove.boxer", E), c.gallery.active && c.$boxer.on("touchstart.boxer click.boxer",
                    ".boxer-arrow", K), c.$overlay.stop().animate({
                    opacity: c.opacity
                }, c.duration), c.$boxer.stop().animate({
                    opacity: 1
                }, c.duration, function() {
                    if (t) y(n);
                    else if (B) H(n);
                    else if (w) {
                        var f = n,
                            f = f + (-1 < f.indexOf("?") ? "&" + Q.requestKey + "=true" : "?" + Q.requestKey + "=true"),
                            f = a('<iframe class="boxer-iframe" src="' + f + '" />');
                        J(f)
                    } else S ? (f = a(n).find(">:first-child").clone(), J(f)) : G ? J(c.$object) : a.error("BOXER: '" + n + "' is not valid.")
                }), G ? c.$boxer : void 0
        }
    }

    function v(f) {
        E(f);
        "undefined" != typeof c.$animatables && (c.$animatables.stop().animate({
                opacity: 0
            },
            c.duration,
            function() {
                a(this).remove()
            }), aa(c.resizeTimer), c.$window.off("resize.boxer").off("keydown.boxer"), c.$body.off(".boxer").removeClass("boxer-open"), c.gallery.active && c.$boxer.off(".boxer"), c.isMobile && "image" === c.type && c.gallery.active && c.$container.off(".boxer"), c.$window.trigger("close.boxer"), c = {})
    }

    function w() {
        var g = n(),
            l = 0,
            h = c.isMobile ? 0 : c.duration;
        c.isMobile || (l = c.$arrows.outerHeight(), c.$arrows.css({
            marginTop: (c.contentHeight - l) / 2
        }));
        !c.visible && c.isMobile && c.gallery.active && c.$content.on("touchstart.boxer",
            ".boxer-image", f);
        (c.isMobile || c.fixed) && c.$body.addClass("boxer-open");
        c.$boxer.stop().animate({
            left: g.left,
            top: g.top
        }, h);
        c.$container.show().stop().animate({
            height: c.containerHeight,
            width: c.containerWidth
        }, h, function() {
            c.$content.stop().animate({
                opacity: 1
            }, c.duration);
            c.$boxer.removeClass("loading").find(".boxer-close").stop().animate({
                opacity: 1
            }, c.duration);
            c.visible = !0;
            c.callback.apply(c.$boxer);
            c.$window.trigger("open.boxer");
            if (c.gallery.active) {
                var f = "";
                0 < c.gallery.index && (f = c.gallery.$items.eq(c.gallery.index -
                    1).attr("href"), 0 > f.indexOf("youtube.com/embed") && 0 > f.indexOf("player.vimeo.com/video") && a('<img src="' + f + '">'));
                c.gallery.index < c.gallery.total && (f = c.gallery.$items.eq(c.gallery.index + 1).attr("href"), 0 > f.indexOf("youtube.com/embed") && 0 > f.indexOf("player.vimeo.com/video") && a('<img src="' + f + '">'))
            }
        })
    }

    function u() {
        var a = n();
        c.$boxer.css({
            left: a.left,
            top: a.top
        })
    }

    function n() {
        if (c.isMobile) return {
            left: 0,
            top: 0
        };
        var a = {
            left: (c.$window.width() - c.containerWidth - c.paddingHorizontal) / 2,
            top: 0 >= c.top ? (c.$window.height() -
                c.containerHeight - c.paddingVertical) / 2 : c.top
        };
        return !0 !== c.fixed && (a.top += c.$window.scrollTop()), a
    }

    function F(a) {
        a = a.attr("title");
        return "" !== a && void 0 !== a ? '<p class="caption">' + a + "</p>" : ""
    }

    function y(f) {
        c.$image = a("<img />");
        c.$image.one("load.boxer", function() {
            var a;
            a = c.$image[0];
            var f = new Image;
            a = "undefined" != typeof a.naturalHeight ? {
                naturalHeight: a.naturalHeight,
                naturalWidth: a.naturalWidth
            } : "img" === a.tagName.toLowerCase() ? (f.src = a.src, {
                naturalHeight: f.height,
                naturalWidth: f.width
            }) : !1;
            c.naturalHeight =
                a.naturalHeight;
            c.naturalWidth = a.naturalWidth;
            c.retina && (c.naturalHeight /= 2, c.naturalWidth /= 2);
            c.$content.prepend(c.$image);
            "" === c.$caption.html() ? c.$caption.hide() : c.$caption.show();
            G();
            w()
        }).attr("src", f).addClass("boxer-image");
        (c.$image[0].complete || 4 === c.$image[0].readyState) && c.$image.trigger("load")
    }

    function G() {
        var a = 0;
        c.windowHeight = c.viewportHeight = c.$window.height();
        c.windowWidth = c.viewportWidth = c.$window.width();
        c.containerHeight = 1 / 0;
        c.contentHeight = 0;
        c.containerWidth = 1 / 0;
        c.contentWidth =
            0;
        c.imageMarginTop = 0;
        for (c.imageMarginLeft = 0; c.containerHeight > c.viewportHeight && 2 > a;) c.imageHeight = 0 === a ? c.naturalHeight : c.$image.outerHeight(), c.imageWidth = 0 === a ? c.naturalWidth : c.$image.outerWidth(), c.metaHeight = 0 === a ? 0 : c.metaHeight, 0 === a && (c.ratioHorizontal = c.imageHeight / c.imageWidth, c.ratioVertical = c.imageWidth / c.imageHeight, c.isWide = c.imageWidth > c.imageHeight), c.imageHeight < c.minHeight && (c.minHeight = c.imageHeight), c.imageWidth < c.minWidth && (c.minWidth = c.imageWidth), c.isMobile ? (c.$meta.css({
                width: c.windowWidth
            }),
            c.metaHeight = c.$meta.outerHeight(!0), c.contentHeight = c.viewportHeight, c.contentWidth = c.viewportWidth, c.containerHeight = c.viewportHeight - c.paddingVertical, c.containerWidth = c.viewportWidth - c.paddingHorizontal, t(), c.imageMarginTop = (c.containerHeight - c.targetImageHeight - c.metaHeight) / 2, c.imageMarginLeft = (c.containerWidth - c.targetImageWidth) / 2) : (0 === a && (c.viewportHeight -= c.margin + c.paddingVertical, c.viewportWidth -= c.margin + c.paddingHorizontal), c.viewportHeight -= c.metaHeight, t(), c.containerHeight = c.contentHeight =
            c.targetImageHeight, c.containerWidth = c.contentWidth = c.targetImageWidth), c.$content.css({
            height: c.isMobile ? c.contentHeight : "auto",
            width: c.contentWidth
        }), c.$meta.css({
            width: c.contentWidth
        }), c.$image.css({
            height: c.targetImageHeight,
            width: c.targetImageWidth,
            marginTop: c.imageMarginTop,
            marginLeft: c.imageMarginLeft
        }), c.isMobile || (c.metaHeight = c.$meta.outerHeight(!0), c.containerHeight += c.metaHeight), a++
    }

    function t() {
        var a = c.isMobile ? c.containerHeight - c.metaHeight : c.viewportHeight,
            f = c.isMobile ? c.containerWidth :
            c.viewportWidth;
        c.isWide ? (c.targetImageWidth = f, c.targetImageHeight = c.targetImageWidth * c.ratioHorizontal, c.targetImageHeight > a && (c.targetImageHeight = a, c.targetImageWidth = c.targetImageHeight * c.ratioVertical)) : (c.targetImageHeight = a, c.targetImageWidth = c.targetImageHeight * c.ratioVertical, c.targetImageWidth > f && (c.targetImageWidth = f, c.targetImageHeight = c.targetImageWidth * c.ratioHorizontal));
        (c.targetImageWidth > c.imageWidth || c.targetImageHeight > c.imageHeight) && (c.targetImageHeight = c.imageHeight, c.targetImageWidth =
            c.imageWidth);
        (c.targetImageWidth < c.minWidth || c.targetImageHeight < c.minHeight) && (c.targetImageWidth < c.minWidth ? (c.targetImageWidth = c.minWidth, c.targetImageHeight = c.targetImageWidth * c.ratioHorizontal) : (c.targetImageHeight = c.minHeight, c.targetImageWidth = c.targetImageHeight * c.ratioVertical))
    }

    function H(f) {
        c.$videoWrapper = a('<div class="boxer-video-wrapper" />');
        c.$video = a('<iframe class="boxer-video" seamless="seamless" />');
        c.$video.attr("src", f).addClass("boxer-video").prependTo(c.$videoWrapper);
        c.$content.prepend(c.$videoWrapper);
        I();
        w()
    }

    function I() {
        c.windowHeight = c.viewportHeight = c.contentHeight = c.$window.height() - c.paddingVertical;
        c.windowWidth = c.viewportWidth = c.contentWidth = c.$window.width() - c.paddingHorizontal;
        c.videoMarginTop = 0;
        c.videoMarginLeft = 0;
        c.isMobile ? (c.$meta.css({
            width: c.windowWidth
        }), c.metaHeight = c.$meta.outerHeight(!0), c.viewportHeight -= c.metaHeight, c.targetVideoWidth = c.viewportWidth, c.targetVideoHeight = c.targetVideoWidth * c.videoRatio, c.targetVideoHeight > c.viewportHeight && (c.targetVideoHeight = c.viewportHeight,
            c.targetVideoWidth = c.targetVideoHeight / c.videoRatio), c.videoMarginTop = (c.viewportHeight - c.targetVideoHeight) / 2, c.videoMarginLeft = (c.viewportWidth - c.targetVideoWidth) / 2) : (c.viewportHeight = c.windowHeight - c.margin, c.viewportWidth = c.windowWidth - c.margin, c.targetVideoWidth = c.videoWidth > c.viewportWidth ? c.viewportWidth : c.videoWidth, c.targetVideoWidth < c.minWidth && (c.targetVideoWidth = c.minWidth), c.targetVideoHeight = c.targetVideoWidth * c.videoRatio, c.contentHeight = c.targetVideoHeight, c.contentWidth = c.targetVideoWidth);
        c.$content.css({
            height: c.isMobile ? c.contentHeight : "auto",
            width: c.contentWidth
        });
        c.$meta.css({
            width: c.contentWidth
        });
        c.$videoWrapper.css({
            height: c.targetVideoHeight,
            width: c.targetVideoWidth,
            marginTop: c.videoMarginTop,
            marginLeft: c.videoMarginLeft
        });
        c.isMobile || (c.metaHeight = c.$meta.outerHeight(!0), c.contentHeight = c.targetVideoHeight + c.metaHeight);
        c.containerHeight = c.contentHeight;
        c.containerWidth = c.contentWidth
    }

    function K(f) {
        E(f);
        f = a(this);
        f.hasClass("disabled") || (c.$boxer.addClass("loading"), c.gallery.index +=
            f.hasClass("next") ? 1 : -1, c.gallery.index > c.gallery.total && (c.gallery.index = c.gallery.total), 0 > c.gallery.index && (c.gallery.index = 0), c.$content.stop().animate({
                opacity: 0
            }, c.duration, function() {
                "undefined" != typeof c.$image && c.$image.remove();
                "undefined" != typeof c.$videoWrapper && c.$videoWrapper.remove();
                c.$target = c.gallery.$items.eq(c.gallery.index);
                c.$caption.html(c.formatter.apply(c.$body, [c.$target]));
                c.$position.find(".current").html(c.gallery.index + 1);
                var a = c.$target.attr("href"); - 1 < a.indexOf("youtube.com/embed") ||
                    -1 < a.indexOf("player.vimeo.com/video") ? H(a) : y(a);
                C()
            }))
    }

    function C() {
        c.$arrows.removeClass("disabled");
        0 === c.gallery.index && c.$arrows.filter(".previous").addClass("disabled");
        c.gallery.index === c.gallery.total && c.$arrows.filter(".next").addClass("disabled")
    }

    function p(a) {
        !c.gallery.active || 37 !== a.keyCode && 39 !== a.keyCode ? 27 === a.keyCode && c.$boxer.find(".boxer-close").trigger("click") : (E(a), c.$arrows.filter(37 === a.keyCode ? ".previous" : ".next").trigger("click"))
    }

    function J(a) {
        c.$content.append(a);
        M(a);
        w()
    }

    function M(a) {
        c.windowHeight = c.$window.height() - c.paddingVertical;
        c.windowWidth = c.$window.width() - c.paddingHorizontal;
        c.objectHeight = a.outerHeight(!0);
        c.objectWidth = a.outerWidth(!0);
        c.targetHeight = c.targetHeight || c.$target.data("boxer-height");
        c.targetWidth = c.targetWidth || c.$target.data("boxer-width");
        c.maxHeight = 0 > c.windowHeight ? Q.minHeight : c.windowHeight;
        c.isIframe = a.is("iframe");
        c.objectMarginTop = 0;
        c.objectMarginLeft = 0;
        c.isMobile || (c.windowHeight -= c.margin, c.windowWidth -= c.margin);
        c.contentHeight =
            void 0 !== c.targetHeight ? c.targetHeight : c.isIframe || c.isMobile ? c.windowHeight : c.objectHeight;
        c.contentWidth = void 0 !== c.targetWidth ? c.targetWidth : c.isIframe || c.isMobile ? c.windowWidth : c.objectWidth;
        c.isIframe && c.isMobile && (c.contentHeight = c.windowHeight, c.contentWidth = c.windowWidth);
        a = c;
        a.containerHeight = a.contentHeight;
        a.containerWidth = a.contentWidth;
        a.$content.css({
            height: a.contentHeight,
            width: a.contentWidth
        })
    }

    function f(a) {
        if (E(a), aa(c.touchTimer), !c.isAnimating) {
            var f = "undefined" != typeof a.originalEvent.targetTouches ?
                a.originalEvent.targetTouches[0] : null;
            c.xStart = f ? f.pageX : a.clientX;
            c.leftPosition = 0;
            c.touchMax = 1 / 0;
            c.touchMin = -1 / 0;
            c.edge = .25 * c.contentWidth;
            0 === c.gallery.index && (c.touchMax = 0);
            c.gallery.index === c.gallery.total && (c.touchMin = 0);
            c.$boxer.on("touchmove.boxer", S).one("touchend.boxer", L)
        }
    }

    function S(a) {
        var f = "undefined" != typeof a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : null;
        c.delta = c.xStart - (f ? f.pageX : a.clientX);
        20 < c.delta && E(a);
        c.canSwipe = !0;
        f = -c.delta;
        f < c.touchMin && (f = c.touchMin,
            c.canSwipe = !1);
        f > c.touchMax && (f = c.touchMax, c.canSwipe = !1);
        c.$image.css({
            transform: "translate3D(" + f + "px,0,0)"
        });
        c.touchTimer = U(c.touchTimer, 300, function() {
            L(a)
        })
    }

    function L(a) {
        E(a);
        aa(c.touchTimer);
        c.$boxer.off("touchmove.boxer touchend.boxer");
        c.delta && (c.$boxer.addClass("animated"), c.swipe = !1, c.canSwipe && (c.delta > c.edge || c.delta < -c.edge) ? (c.swipe = !0, c.delta <= c.leftPosition ? c.$image.css({
                transform: "translate3D(" + c.contentWidth + "px,0,0)"
            }) : c.$image.css({
                transform: "translate3D(" + -c.contentWidth + "px,0,0)"
            })) :
            c.$image.css({
                transform: "translate3D(0,0,0)"
            }), c.swipe && c.$arrows.filter(c.delta <= c.leftPosition ? ".previous" : ".next").trigger("click"), U(c.resetTimer, c.duration, function() {
                c.$boxer.removeClass("animated")
            }))
    }

    function E(a) {
        a.preventDefault && (a.stopPropagation(), a.preventDefault())
    }

    function U(a, c, f) {
        return aa(a), setTimeout(f, c)
    }

    function aa(a) {
        a && clearTimeout(a)
    }
    var c = {},
        sa = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(g.navigator.userAgent || g.navigator.vendor || g.opera),
        Q = {
            callback: a.noop,
            customClass: "",
            duration: 250,
            extensions: ["jpg", "sjpg", "jpeg", "png", "gif"],
            fixed: !1,
            formatter: a.noop,
            height: 100,
            labels: {
                close: "Close",
                count: "of",
                next: "Next",
                previous: "Previous"
            },
            margin: 50,
            minHeight: 100,
            minWidth: 100,
            mobile: !1,
            opacity: .75,
            retina: !1,
            requestKey: "boxer",
            top: 0,
            videoRatio: .5625,
            videoWidth: 600,
            width: 100
        },
        V = {
            close: function() {
                "undefined" != typeof c.$boxer && (c.$boxer.off(".boxer"), c.$overlay.trigger("click"))
            },
            defaults: function(c) {
                return Q = a.extend(Q, c || {}), a(this)
            },
            destroy: function() {
                return a(this).off(".boxer")
            },
            resize: function(f, l) {
                if ("undefined" != typeof c.$boxer) {
                    "object" != typeof f && (c.targetHeight = f, c.targetWidth = l);
                    "element" === c.type ? M(c.$content.find(">:first-child")) : "image" === c.type ? G() : "video" === c.type && I();
                    var g = void 0;
                    if (g = g || !1, c.visible) {
                        var h = n(),
                            m = 0;
                        c.isMobile || (m = c.$arrows.outerHeight(), c.$arrows.css({
                            marginTop: (c.contentHeight - m) / 2
                        }));
                        g ? (c.$boxer.stop().animate({
                            left: h.left,
                            top: h.top
                        }, c.duration), c.$container.show().stop().animate({
                            height: c.containerHeight,
                            width: c.containerWidth
                        })) : (c.$boxer.css({
                            left: h.left,
                            top: h.top
                        }), c.$container.css({
                            height: c.containerHeight,
                            width: c.containerWidth
                        }))
                    }
                }
                return a(this)
            }
        };
    a.fn.boxer = function(a) {
        return V[a] ? V[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : h.apply(this, arguments)
    };
    a.boxer = function(c, f) {
        return V[c] ? V[c].apply(g, Array.prototype.slice.call(arguments, 1)) : c instanceof a ? m.apply(g, [{
            data: a.extend({
                $object: c
            }, Q, f || {})
        }]) : void 0
    }
}(jQuery, window);
! function(a) {
    function g(g, v, w) {
        var m = new Date;
        w = a.extend({}, h, w);
        (w.expires || "number" == typeof w.expires) && m.setTime(m.getTime() + w.expires);
        m = w.expires || "number" == typeof w.expires ? "; expires=" + m.toGMTString() : "";
        document.cookie = g + "=" + v + m + (w.domain ? "; domain=" + w.domain : "") + (w.path ? "; path=" + w.path : "")
    }
    var h = {
        domain: null,
        expires: 6048E5,
        path: null
    };
    a.macaroon = function(m, v, w) {
        if ("object" == typeof m) return h = a.extend(h, m), null;
        if (w = a.extend({}, h, w), "undefined" != typeof m) {
            if ("undefined" == typeof v) {
                a: {
                    m += "=";
                    v = document.cookie.split(";");
                    for (w = 0; w < v.length; w++) {
                        for (var u = v[w];
                            " " === u.charAt(0);) u = u.substring(1, u.length);
                        if (0 === u.indexOf(m)) {
                            m = u.substring(m.length, u.length);
                            break a
                        }
                    }
                    m = null
                }
                return m
            }
            null === v ? g(m, "FALSE", {
                expires: -6048E5
            }) : g(m, v, w)
        }
    }
}(jQuery, window);
! function(a) {
    function g(g) {
        g = a.extend({}, y, g);
        for (var t = a(this), G = 0, v = t.length; v > G; G++) {
            var C = t.eq(G),
                p = g;
            if (!C.data("picker")) {
                var p = a.extend({}, p, C.data("picker-options")),
                    J = C.closest("label"),
                    J = J.length ? J.eq(0) : a("label[for=" + C.attr("id") + "]"),
                    F = C.attr("type"),
                    f = "picker-" + ("radio" === F ? "radio" : "checkbox"),
                    S = C.attr("name"),
                    L = '<div class="picker-handle"><div class="picker-flag" /></div>';
                p.toggle && (f += " picker-toggle", L = '<span class="picker-toggle-label on">' + p.labels.on + '</span><span class="picker-toggle-label off">' +
                    p.labels.off + "</span>" + L);
                C.addClass("picker-element");
                J.length ? J.wrap('<div class="picker ' + f + " " + p.customClass + '" />').before(L).addClass("picker-label") : C.before('<div class="picker ' + f + " " + p.customClass + '">' + L + "</div>");
                var f = J.length ? J.parents(".picker") : C.prev(".picker"),
                    L = f.find(".picker-handle"),
                    E = f.find(".picker-toggle-label");
                C.is(":checked") && f.addClass("checked");
                C.is(":disabled") && f.addClass("disabled");
                C = a.extend({}, p, {
                    $picker: f,
                    $input: C,
                    $handle: L,
                    $label: J,
                    $labels: E,
                    group: S,
                    isRadio: "radio" ===
                        F,
                    isCheckbox: "checkbox" === F
                });
                C.$input.on("focus.picker", C, u).on("blur.picker", C, n).on("change.picker", C, m).on("click.picker", C, h).on("deselect.picker", C, w).data("picker", C);
                C.$picker.on("click.picker", C, h)
            }
        }
        return t
    }

    function h(g) {
        g.stopPropagation();
        var h = g.data;
        a(g.target).is(h.$input) || (g.preventDefault(), h.$input.trigger("click"))
    }

    function m(a) {
        var g = a.data;
        if (!g.$input.is(":disabled")) {
            var h = g.$input.is(":checked");
            g.isCheckbox ? h ? v(a, !0) : w(a, !0) : (h || F && !h) && v(a)
        }
    }

    function v(g) {
        g = g.data;
        "undefined" !=
        typeof g.group && g.isRadio && a('input[name="' + g.group + '"]').not(g.$input).trigger("deselect");
        g.$picker.addClass("checked")
    }

    function w(a) {
        a.data.$picker.removeClass("checked")
    }

    function u(a) {
        a.data.$picker.addClass("focus")
    }

    function n(a) {
        a.data.$picker.removeClass("focus")
    }
    var F = document.all && document.querySelector && !document.addEventListener,
        y = {
            customClass: "",
            toggle: !1,
            labels: {
                on: "ON",
                off: "OFF"
            }
        },
        G = {
            defaults: function(g) {
                return y = a.extend(y, g || {}), a(this)
            },
            destroy: function() {
                return a(this).each(function(g,
                    h) {
                    var n = a(h).data("picker");
                    n && (n.$picker.off(".picker"), n.$handle.remove(), n.$labels.remove(), n.$input.off(".picker").removeClass("picker-element").data("picker", null), n.$label.removeClass("picker-label").unwrap())
                })
            },
            disable: function() {
                return a(this).each(function(g, h) {
                    var n = a(h).data("picker");
                    n && (n.$input.prop("disabled", !0), n.$picker.addClass("disabled"))
                })
            },
            enable: function() {
                return a(this).each(function(g, h) {
                    var n = a(h).data("picker");
                    n && (n.$input.prop("disabled", !1), n.$picker.removeClass("disabled"))
                })
            },
            update: function() {
                return a(this).each(function(g, h) {
                    var n = a(h).data("picker");
                    n && !n.$input.is(":disabled") && (n.$input.is(":checked") ? v({
                        data: n
                    }, !0) : w({
                        data: n
                    }, !0))
                })
            }
        };
    a.fn.picker = function(a) {
        return G[a] ? G[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : g.apply(this, arguments)
    };
    a.picker = function(a) {
        "defaults" === a && G.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
}(jQuery);
! function(a, g) {
    function h(f) {
        f = a.extend({}, J, f);
        for (var g = a(this), h = 0, n = g.length; n > h; h++) m(g.eq(h), f);
        return g
    }

    function m(f, h) {
        if (!f.data("roller")) {
            h = a.extend({}, h, f.data("roller-options"));
            h.single || (f.find(".roller-viewport").length || (f.wrapInner('<div class="roller-viewport"></div>'), h.viewport = !0), f.find(".roller-canister").length || (f.find(".roller-viewport").wrapInner('<div class="roller-canister"></div>'), h.canister = !0));
            var n = "";
            h.controls && !f.find(".roller-controls").length && (n += '<div class="roller-controls">',
                n += '<span class="roller-control previous">' + h.labels.previous + "</span>", n += '<span class="roller-control next">' + h.labels.next + "</span>", n += "</div>");
            h.pagination && !f.find(".roller-pagination").length && (n += '<div class="roller-pagination">', n += "</div>");
            f.addClass("roller " + (h.single ? "single " : "") + h.customClass).append(n);
            var m = a.extend({}, {
                $roller: f,
                $viewport: f.find(".roller-viewport").eq(0),
                $canister: f.find(".roller-canister").eq(0),
                $captions: f.find(".roller-captions").eq(0),
                $controls: f.find(".roller-controls").eq(0),
                $pagination: f.find(".roller-pagination").eq(0),
                index: 0,
                deltaX: null,
                deltaY: null,
                leftPosition: 0,
                xStart: 0,
                yStart: 0,
                enabled: !1,
                touchstart: 0,
                touchEnd: 0
            }, h);
            if (m.$items = m.single ? m.$roller.find(".roller-item") : m.$canister.children(".roller-item"), m.$captionItems = m.$captions.find(".roller-caption"), m.$controlItems = m.$controls.find(".roller-control"), m.$paginationItems = m.$pagination.find(".roller-page"), m.$images = m.$canister.find("img"), m.totalImages = m.$images.length, f.data("roller", m), void 0 !== g.matchMedia &&
                (m.maxWidth = 1 / 0 === m.maxWidth ? "100000px" : m.maxWidth, m.mediaQuery = g.matchMedia("(min-width:" + m.minWidth + ") and (max-width:" + m.maxWidth + ")"), m.mediaQuery.addListener(function() {
                    H.apply(m.$roller)
                }), H.apply(m.$roller)), 0 < m.totalImages)
                for (n = m.loadedImages = 0; n < m.totalImages; n++) {
                    var p = m.$images.eq(n);
                    p.one("load.roller", m, v);
                    (p[0].complete || p[0].height) && p.trigger("load.roller")
                }(m.autoAdvance || m.auto) && (m.autoTimer = C(m.autoTimer, m.autoTime, function() {
                    var a = m.index + 1;
                    a > m.pageCount && (a = 0);
                    G(m, a)
                }, !0))
        }
    }

    function v(a) {
        a = a.data;
        a.loadedImages++;
        a.loadedImages === a.totalImages && M.resize.apply(a.$roller)
    }

    function w(a) {
        a.stopPropagation();
        var f = a.data;
        p(f.autoTimer);
        f.touchStart = (new Date).getTime();
        f.$canister.css(K("transition", "none"));
        var g = "undefined" != typeof a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : null;
        f.xStart = g ? g.pageX : a.clientX;
        f.yStart = g ? g.pageY : a.clientY;
        f.$canister.on("touchmove.roller", f, u).one("touchend.roller touchcancel.roller", f, n)
    }

    function u(a) {
        a.stopPropagation();
        var f = a.data,
            g = "undefined" != typeof a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : null;
        f.deltaX = f.xStart - (g ? g.pageX : a.clientX);
        f.deltaY = f.yStart - (g ? g.pageY : a.clientY);
        (-10 > f.deltaX || 10 < f.deltaX) && a.preventDefault();
        f.touchLeft = f.leftPosition - f.deltaX;
        0 < f.touchLeft && (f.touchLeft = 0);
        f.touchLeft < f.maxMove && (f.touchLeft = f.maxMove);
        f.useMargin ? f.$canister.css({
            marginLeft: f.touchLeft
        }) : f.$canister.css(K("transform", "translate3d(" + f.touchLeft + "px, 0, 0)"))
    }

    function n(a) {
        a = a.data;
        a.touchEnd =
            (new Date).getTime();
        a.leftPosition = a.touchLeft;
        a.$canister.css(K("transition", ""));
        a.$canister.off("touchmove.roller touchend.roller touchcancel.roller");
        var f = -10 < a.deltaX && 10 > a.deltaX ? a.index : I(a);
        a.touchPaged && !a.swipe ? G(a, f) : (a.index = f, t(a));
        a.deltaX = null;
        a.touchStart = 0;
        a.touchEnd = 0
    }

    function F(f) {
        f.preventDefault();
        f.stopPropagation();
        var g = f.data;
        f = g.index + (a(f.currentTarget).hasClass("next") ? 1 : -1);
        p(g.autoTimer);
        G(g, f)
    }

    function y(f) {
        f.preventDefault();
        f.stopPropagation();
        var g = f.data;
        f = g.$paginationItems.index(a(f.currentTarget));
        p(g.autoTimer);
        G(g, f)
    }

    function G(a, g, h) {
        if (0 > g && (g = a.infinite ? a.pageCount : 0), g > a.pageCount && (g = a.infinite ? 0 : a.pageCount), a.single) a.$items.removeClass("active").eq(g).addClass("active");
        else {
            if (a.paged) {
                var f = a.$items.eq(g).position();
                f && (a.leftPosition = -f.left)
            } else a.leftPosition = -(g * a.pageMove);
            a.leftPosition < a.maxMove && (a.leftPosition = a.maxMove);
            isNaN(a.leftPosition) && (a.leftPosition = 0);
            a.useMargin ? a.$canister.css({
                marginLeft: a.leftPosition
            }) : !1 === h ? (a.$canister.css(K("transition", "none")).css(K("transform",
                "translate3d(" + a.leftPosition + "px, 0, 0)")), a.resizeTimer = C(a.resizeTimer, 5, function() {
                a.$canister.css(K("transition", ""))
            }, !1)) : a.$canister.css(K("transform", "translate3d(" + a.leftPosition + "px, 0, 0)"))
        }
        g !== a.index && !1 !== h && a.$roller.trigger("update.roller", [g]);
        a.index = g;
        t(a)
    }

    function t(a) {
        if (a.$captionItems.filter(".active").removeClass("active"), a.$captionItems.eq(a.index).addClass("active"), a.$paginationItems.filter(".active").removeClass("active"), a.$paginationItems.eq(a.index).addClass("active"),
            a.$items.removeClass("visible"), !a.single && 1 / 0 !== a.perPage)
            for (var f = 0; f < a.perPage; f++) a.leftPosition === a.maxMove ? a.$items.eq(a.count - 1 - f).addClass("visible") : a.$items.eq(a.perPage * a.index + f).addClass("visible");
        a.infinite ? a.$controlItems.addClass("enabled") : 0 >= a.pageCount ? a.$controlItems.removeClass("enabled") : (a.$controlItems.addClass("enabled"), 0 >= a.index ? a.$controlItems.filter(".previous").removeClass("enabled") : (a.index >= a.pageCount || a.leftPosition === a.maxMove) && a.$controlItems.filter(".next").removeClass("enabled"))
    }

    function H() {
        var f = a(this).data("roller");
        f.mediaQuery.matches ? M.enable.apply(f.$roller) : M.disable.apply(f.$roller)
    }

    function I(f) {
        if (f.single) return f.index;
        if ((20 < f.deltaX || -20 > f.deltaX) && f.touchStart && f.touchEnd && 200 > f.touchEnd - f.touchStart) return f.index + (0 < f.deltaX ? 1 : -1);
        if (f.paged) {
            var g = 1 / 0;
            if (f.leftPosition === f.maxMove) return f.$items.length - 1;
            var h = 0;
            return f.$items.each(function(n) {
                var m = a(this).position().left + f.leftPosition;
                0 > m && (m = -m);
                g > m && (g = m, h = n)
            }), h
        }
        return Math.round(-f.leftPosition /
            f.viewportWidth)
    }

    function K(a, g) {
        var f = {};
        return f["-webkit-" + a] = g, f["-moz-" + a] = g, f["-ms-" + a] = g, f["-o-" + a] = g, f[a] = g, f
    }

    function C(a, g, h, n) {
        return p(a, n), !0 === n ? setInterval(h, g) : setTimeout(h, g)
    }

    function p(a) {
        null !== a && clearInterval(a)
    }
    var J = {
            autoAdvance: !1,
            autoTime: 8E3,
            autoWidth: !1,
            controls: !0,
            customClass: "",
            infinite: !1,
            labels: {
                next: "Next",
                previous: "Previous"
            },
            maxWidth: 1 / 0,
            minWidth: "0px",
            paged: !1,
            pagination: !0,
            single: !1,
            touchPaged: !0,
            useMargin: !1
        },
        M = {
            defaults: function(f) {
                return J = a.extend(J, f || {}),
                    a(this)
            },
            destroy: function() {
                return a(this).each(function() {
                    var f = a(this).data("roller");
                    f && (p(f.autoTimer), f.single || (f.viewport && f.$items.unwrap(), f.canister ? f.$items.unwrap() : f.$canister.attr("style", null)), f.$items.removeClass("visible"), f.pagination && f.$pagination.remove(), f.controls && f.$controls.remove(), f.$roller.removeClass("roller enabled " + (f.single ? "single " : "") + f.customClass).off(".roller").data("roller", null))
                })
            },
            disable: function() {
                return a(this).each(function() {
                    var f = a(this).data("roller");
                    f && f.enabled && (p(f.autoTimer), f.enabled = !1, f.$roller.removeClass("enabled").off("touchstart.roller click.roller"), f.$canister.attr("style", "").css(K("transition", "none")).off("touchstart.roller"), f.$controls.removeClass("visible"), f.$pagination.removeClass("visible").html(""), f.useMargin ? f.$canister.css({
                        marginLeft: ""
                    }) : f.$canister.css(K("transform", "translate3d(0px, 0, 0)")), f.index = 0)
                })
            },
            enable: function() {
                return a(this).each(function() {
                    var f = a(this).data("roller");
                    f && !f.enabled && (f.enabled = !0, f.$roller.addClass("enabled").on("touchstart.roller click.roller",
                        ".roller-control", f, F).on("touchstart.roller click.roller", ".roller-page", f, y), f.$canister.css(K("transition", "")), M.resize.apply(f.$roller), f.single || f.$canister.on("touchstart.roller", f, w))
                })
            },
            jump: function(f) {
                return a(this).each(function() {
                    var g = a(this).data("roller");
                    g && g.enabled && (p(g.autoTimer), G(g, f - 1))
                })
            },
            resize: function() {
                return a(this).each(function() {
                    var f = a(this).data("roller");
                    if (f && f.enabled && !(f.count = f.$items.length, 1 > f.count)) {
                        if (f.viewportWidth = f.$viewport.outerWidth(!1), f.itemMargin =
                            parseInt(f.$items.eq(0).css("margin-left"), 10) + parseInt(f.$items.eq(0).css("margin-right"), 10), f.autoWidth && f.$items.css({
                                width: f.viewportWidth
                            }), f.single) f.perPage = 1, f.pageCount = f.count - 1;
                        else if (f.paged) {
                            for (var g = f.canisterWidth = 0; g < f.count; g++) f.canisterWidth += f.$items.eq(g).outerWidth() + f.itemMargin;
                            f.perPage = 1;
                            f.pageCount = f.canisterWidth > f.viewportWidth ? f.count - 1 : 0
                        } else f.itemWidth = f.$items.eq(0).outerWidth(!1) + f.itemMargin, f.perPage = Math.floor(f.viewportWidth / f.itemWidth), 1 > f.perPage && (f.perPage =
                            1), f.pageCount = Math.ceil(f.count / f.perPage) - 1, f.pageMove = f.itemWidth * f.perPage, f.canisterWidth = f.itemWidth * f.count;
                        if (f.maxMove = -f.canisterWidth + f.viewportWidth + f.itemMargin, 0 < f.maxMove && (f.maxMove = 0), 1 / 0 !== f.pageCount) {
                            for (var g = "", h = 0; h <= f.pageCount; h++) g += '<span class="roller-page">' + (h + 1) + "</span>";
                            f.$pagination.html(g)
                        }
                        1 > f.pageCount ? (f.$controls.removeClass("visible"), f.$pagination.removeClass("visible")) : (f.$controls.addClass("visible"), f.$pagination.addClass("visible"));
                        f.$paginationItems =
                            f.$roller.find(".roller-page");
                        f.single || f.$canister.css({
                            width: f.canisterWidth
                        });
                        G(f, I(f), !1)
                    }
                })
            },
            reset: function() {
                return a(this).each(function() {
                    var f = a(this).data("roller");
                    f && f.enabled && (f.$items = f.$roller.find(".roller-item"), M.resize.apply(f.$roller))
                })
            }
        };
    a.fn.roller = function(a) {
        return M[a] ? M[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : h.apply(this, arguments)
    };
    a.roller = function(a) {
        "defaults" === a && M.defaults.apply(this, Array.prototype.slice.call(arguments,
            1))
    }
}(jQuery, window);
! function(a, g) {
    function h(h) {
        h = h || {};
        for (var n in G) G.hasOwnProperty(n) && (H[n] = h[n] ? a.merge(h[n], H[n]) : H[n]);
        H = a.extend(H, h);
        H.minWidth.sort(u);
        H.maxWidth.sort(w);
        H.minHeight.sort(u);
        H.maxHeight.sort(w);
        for (var p in G)
            if (G.hasOwnProperty(p)) {
                y[p] = {};
                for (var t in H[p]) H[p].hasOwnProperty(t) && (h = g.matchMedia("(" + G[p] + ": " + (1 / 0 === H[p][t] ? 1E5 : H[p][t]) + H.unit + ")"), h.addListener(m), y[p][H[p][t]] = h)
            }
        m()
    }

    function m() {
        F = {
            unit: H.unit
        };
        for (var h in G)
            if (G.hasOwnProperty(h))
                for (var n in y[h])
                    if (y[h].hasOwnProperty(n) && y[h][n].matches) {
                        var m =
                            "Infinity" === n ? 1 / 0 : parseInt(n, 10); - 1 < h.indexOf("max") ? (!F[h] || m < F[h]) && (F[h] = m) : (!F[h] || m > F[h]) && (F[h] = m)
                    }
        a(g).trigger("snap", [F])
    }

    function v(a) {
        var g = t[a.media],
            h = a.matches ? "enter" : "leave";
        if (g.active || !g.active && a.matches) {
            for (var n in g[h]) g[h].hasOwnProperty(n) && g[h][n].apply(g.mq);
            g.active = !0
        }
    }

    function w(a, g) {
        return g - a
    }

    function u(a, g) {
        return a - g
    }
    var n = void 0 !== g.matchMedia,
        F = null,
        y = {},
        G = {
            minWidth: "min-width",
            maxWidth: "max-width",
            minHeight: "min-height",
            maxHeight: "max-height"
        },
        t = [],
        H = {
            minWidth: [0],
            maxWidth: [1 / 0],
            minHeight: [0],
            maxHeight: [1 / 0],
            unit: "px"
        },
        I = {
            bind: function(a, h) {
                t[a] || (t[a] = {
                    mq: g.matchMedia(a),
                    active: !1,
                    enter: [],
                    leave: []
                }, t[a].mq.addListener(v));
                for (var n in h) h.hasOwnProperty(n) && t[a].hasOwnProperty(n) && t[a][n].push(h[n]);
                return v(t[a].mq), this
            },
            unbind: function(a) {
                return t[a] && (t[a].mq.removeListener(v), t = t.splice(t.indexOf(t[a]), 1)), this
            },
            defaults: function(g) {
                H = a.extend(H, g || {})
            },
            state: function() {
                return F
            }
        };
    a.rubberband = function(a) {
        if (n) {
            if (I[a]) return I[a].apply(this, Array.prototype.slice.call(arguments,
                1));
            if ("object" == typeof a || !a) return h.apply(this, arguments)
        }
        return this
    }
}(jQuery, window);
(function(a, g) {
    function h(g) {
        if (!n) {
            n = !0;
            u = a("body");
            a.extend(F, g || {});
            u.find("a").not("[data-scout-event]").each(v);
            u.on("click.scout", "*[data-scout-event]", m);
            for (var h in a.scout.extensions)
                if (a.scout.extensions.hasOwnProperty(h)) a.scout.extensions[h](F.extensions[h] || null)
        }
    }

    function m(h) {
        if ("function" === typeof g.ga) {
            h.preventDefault();
            h = a(this);
            var n = h.attr("href"),
                m = h.data("scout-event").split(","),
                u;
            for (u in m) m.hasOwnProperty(u) && (m[u] = a.trim(m[u]));
            w(m[0], m[1], m[2] || n, m[3], m[4], h)
        }
    }

    function v() {}

    function w(a, h, n, m, w, u) {
        if ("function" === typeof g.ga) {
            var t = {
                hitType: "event",
                location: g.location,
                title: g.document.title
            };
            a && (t.eventCategory = a);
            h && (t.eventAction = h);
            n && (t.eventLabel = n);
            m && (t.eventValue = m);
            w && (t.nonInteraction = w);
            if ("undefined" !== typeof u && !u.attr("data-scout-stop")) {
                a = "undefined" !== typeof u[0].href ? u[0].href : "";
                var p = !a.match(/^mailto\:/i) && !a.match(/^tel\:/i) && 0 > a.indexOf(":") ? g.location.protocol + "//" + g.location.hostname + "/" + a : a;
                "" !== a && (u.attr("target") ? g.open(p, u.attr("target")) :
                    t.hitCallback = function() {
                        document.location = p
                    })
            }
            g.ga("send", t)
        }
    }
    var u, n = !1,
        F = {
            delay: 100,
            extensions: {},
            filetypes: /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i
        };
    a.scout = function() {
        arguments.length && "object" !== typeof arguments[0] ? w.apply(this, arguments) : h.apply(this, arguments)
    };
    a.scout.extensions = {}
})(jQuery, window);
! function(a, g) {
    function h(c) {
        c = a.extend({}, V, c || {});
        null === Q && (Q = a("body"));
        for (var f = a(this), g = 0, l = f.length; l > g; g++) m(f.eq(g), c);
        return f
    }

    function m(g, h) {
        if (!g.hasClass("selecter-element")) {
            h = a.extend({}, h, g.data("selecter-options"));
            h.multiple = g.prop("multiple");
            h.disabled = g.is(":disabled");
            h.external && (h.links = !0);
            var l = g.find(":selected");
            h.multiple || "" === h.label ? h.label = "" : g.prepend('<option value="" class="selecter-placeholder" selected>' + h.label + "</option>");
            var n = g.find("option, optgroup"),
                m = n.filter("option"),
                l = m.filter(":selected"),
                A = 0 < l.length ? m.index(l) : 0,
                l = "" !== h.label ? h.label : l.text();
            h.tabIndex = g[0].tabIndex;
            g[0].tabIndex = -1;
            var u = "",
                y;
            y = '<div class="selecter ' + h.customClass;
            c ? y += " mobile" : h.cover && (y += " cover");
            y += h.multiple ? " multiple" : " closed";
            h.disabled && (y += " disabled");
            y += '" tabindex="' + h.tabIndex + '">';
            y += "</div>";
            h.multiple || (u += '<span class="selecter-selected">', u += a("<span></span>").text(f(l, h.trim)).html(), u += "</span>");
            u += '<div class="selecter-options"></div>';
            g.addClass("selecter-element").wrap(y).after(u);
            l = g.parent(".selecter");
            n = a.extend({
                $select: g,
                $allOptions: n,
                $options: m,
                $selecter: l,
                $selected: l.find(".selecter-selected"),
                $itemsWrapper: l.find(".selecter-options"),
                index: -1,
                guid: E++
            }, h);
            v(n);
            n.multiple || p(A, n);
            void 0 !== a.fn.scroller && n.$itemsWrapper.scroller();
            n.$selecter.on("touchstart.selecter", ".selecter-selected", n, w).on("click.selecter", ".selecter-selected", n, F).on("click.selecter", ".selecter-item", n, t).on("close.selecter", n, G).data("selecter", n);
            n.$select.on("change.selecter", n, H);
            c || (n.$selecter.on("focus.selecter",
                n, I).on("blur.selecter", n, K), n.$select.on("focus.selecter", n, function(a) {
                a.data.$selecter.trigger("focus")
            }))
        }
    }

    function v(c) {
        for (var g = "", l = c.links ? "a" : "span", h = 0, n = 0, m = c.$allOptions.length; m > n; n++) {
            var p = c.$allOptions.eq(n);
            if ("OPTGROUP" === p[0].tagName) g += '<span class="selecter-group', p.is(":disabled") && (g += " disabled"), g += '">' + p.attr("label") + "</span>";
            else {
                var t = p.val();
                p.attr("value") || p.attr("value", t);
                g += "<" + l + ' class="selecter-item';
                p.hasClass("selecter-placeholder") && (g += " placeholder");
                p.is(":selected") &&
                    (g += " selected");
                p.is(":disabled") && (g += " disabled");
                g += '" ';
                g += c.links ? 'href="' + t + '"' : 'data-value="' + t + '"';
                g += ">" + a("<span></span>").text(f(p.text(), c.trim)).html() + "</" + l + ">";
                h++
            }
        }
        c.$itemsWrapper.html(g);
        c.$items = c.$selecter.find(".selecter-item")
    }

    function w(a) {
        a.stopPropagation();
        var c = a.data;
        a = a.originalEvent;
        var f = c.timer;
        null !== f && clearInterval(f);
        c.touchStartX = a.touches[0].clientX;
        c.touchStartY = a.touches[0].clientY;
        c.$selecter.on("touchmove.selecter", ".selecter-selected", c, u).on("touchend.selecter",
            ".selecter-selected", c, n)
    }

    function u(a) {
        var c = a.data;
        a = a.originalEvent;
        (10 < Math.abs(a.touches[0].clientX - c.touchStartX) || 10 < Math.abs(a.touches[0].clientY - c.touchStartY)) && c.$selecter.off("touchmove.selecter touchend.selecter")
    }

    function n(a) {
        var c = a.data;
        c.$selecter.off("touchmove.selecter touchend.selecter click.selecter");
        c.timer = L(c.timer, 1E3, function() {
            c.$selecter.on("click.selecter", ".selecter-selected", c, F).on("click.selecter", ".selecter-item", c, t)
        });
        F(a)
    }

    function F(f) {
        f.preventDefault();
        f.stopPropagation();
        var h = f.data;
        if (!h.$select.is(":disabled"))
            if (a(".selecter").not(h.$selecter).trigger("close.selecter", [h]), h.mobile || !c || sa)
                if (h.$selecter.hasClass("closed")) {
                    if (f.preventDefault(), f.stopPropagation(), f = f.data, !f.$selecter.hasClass("open")) {
                        var h = f.$selecter.offset(),
                            l = Q.outerHeight(),
                            n = f.$itemsWrapper.outerHeight(!0);
                        0 <= f.index ? f.$items.eq(f.index).position() : {
                            left: 0,
                            top: 0
                        };
                        h.top + n > l && f.$selecter.addClass("bottom");
                        f.$itemsWrapper.show();
                        f.$selecter.removeClass("closed").addClass("open");
                        Q.on("click.selecter-" +
                            f.guid, ":not(.selecter-options)", f, y);
                        J(f)
                    }
                } else h.$selecter.hasClass("open") && G(f);
        else f = h.$select[0], g.document.createEvent ? (h = g.document.createEvent("MouseEvents"), h.initMouseEvent("mousedown", !1, !0, g, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), f.dispatchEvent(h)) : f.fireEvent && f.fireEvent("onmousedown")
    }

    function y(c) {
        c.preventDefault();
        c.stopPropagation();
        0 === a(c.currentTarget).parents(".selecter").length && G(c)
    }

    function G(a) {
        a.preventDefault();
        a.stopPropagation();
        a = a.data;
        a.$selecter.hasClass("open") && (a.$itemsWrapper.hide(),
            a.$selecter.removeClass("open bottom").addClass("closed"), Q.off(".selecter-" + a.guid))
    }

    function t(c) {
        c.preventDefault();
        c.stopPropagation();
        var f = a(this),
            g = c.data;
        g.$select.is(":disabled") || (g.$itemsWrapper.is(":visible") && (f = g.$items.index(f), f !== g.index && (p(f, g), M(g))), g.multiple || G(c))
    }

    function H(c, f) {
        var g = a(this),
            h = c.data;
        f || h.multiple || (g = h.$options.index(h.$options.filter("[value='" + S(g.val()) + "']")), p(g, h), M(h))
    }

    function I(c) {
        c.preventDefault();
        c.stopPropagation();
        c = c.data;
        c.$select.is(":disabled") ||
            c.multiple || (c.$selecter.addClass("focus").on("keydown.selecter-" + c.guid, c, C), a(".selecter").not(c.$selecter).trigger("close.selecter", [c]))
    }

    function K(c) {
        c.preventDefault();
        c.stopPropagation();
        c = c.data;
        c.$selecter.removeClass("focus").off("keydown.selecter-" + c.guid);
        a(".selecter").not(c.$selecter).trigger("close.selecter", [c])
    }

    function C(c) {
        var f = c.data;
        if (13 === c.keyCode) f.$selecter.hasClass("open") && (G(c), p(f.index, f)), M(f);
        else if (!(9 === c.keyCode || c.metaKey || c.altKey || c.ctrlKey || c.shiftKey)) {
            c.preventDefault();
            c.stopPropagation();
            var g = f.$items.length - 1,
                h = 0 > f.index ? 0 : f.index;
            if (-1 < a.inArray(c.keyCode, aa ? [38, 40, 37, 39] : [38, 40])) h += 38 === c.keyCode || aa && 37 === c.keyCode ? -1 : 1, 0 > h && (h = 0), h > g && (h = g);
            else {
                var l, n = String.fromCharCode(c.keyCode).toUpperCase();
                for (c = f.index + 1; g >= c; c++)
                    if (l = f.$options.eq(c).text().charAt(0).toUpperCase(), l === n) {
                        h = c;
                        break
                    }
                if (0 > h || h === f.index)
                    for (c = 0; g >= c; c++)
                        if (l = f.$options.eq(c).text().charAt(0).toUpperCase(), l === n) {
                            h = c;
                            break
                        }
            }
            0 <= h && (p(h, f), J(f))
        }
    }

    function p(a, c) {
        var f = c.$items.eq(a),
            g = f.hasClass("selected");
        f.hasClass("disabled") || (c.multiple ? g ? (c.$options.eq(a).prop("selected", null), f.removeClass("selected")) : (c.$options.eq(a).prop("selected", !0), f.addClass("selected")) : -1 < a && a < c.$items.length ? (g = f.html(), f.data("value"), c.$selected.html(g).removeClass("placeholder"), c.$items.filter(".selected").removeClass("selected"), c.$select[0].selectedIndex = a, f.addClass("selected"), c.index = a) : "" !== c.label && c.$selected.html(c.label))
    }

    function J(c) {
        var f = c.$items.eq(c.index),
            f = 0 <= c.index &&
            !f.hasClass("placeholder") ? f.position() : {
                left: 0,
                top: 0
            };
        void 0 !== a.fn.scroller ? c.$itemsWrapper.scroller("scroll", c.$itemsWrapper.find(".scroller-content").scrollTop() + f.top, 0).scroller("reset") : c.$itemsWrapper.scrollTop(c.$itemsWrapper.scrollTop() + f.top)
    }

    function M(a) {
        if (a.links) {
            var c = a.$select.val();
            a.external ? g.open(c) : g.location.href = c
        } else a.callback.call(a.$selecter, a.$select.val(), a.index), a.$select.trigger("change", [!0])
    }

    function f(a, c) {
        return 0 === c ? a : a.length > c ? a.substring(0, c) + "..." : a
    }

    function S(a) {
        return "string" ==
            typeof a ? a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1") : a
    }

    function L(a, c, f, g) {
        null !== a && clearInterval(a);
        return !0 === g ? setInterval(f, c) : setTimeout(f, c)
    }
    var E = 0,
        U = g.navigator.userAgent || g.navigator.vendor || g.opera,
        aa = /Firefox/i.test(U),
        c = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(U),
        sa = aa && c,
        Q = null,
        V = {
            callback: a.noop,
            cover: !1,
            customClass: "",
            label: "",
            external: !1,
            links: !1,
            mobile: !1,
            trim: 0
        },
        B = {
            defaults: function(c) {
                return V = a.extend(V, c || {}), a(this)
            },
            disable: function(c) {
                return a(this).each(function(f,
                    g) {
                    var h = a(g).parent(".selecter").data("selecter");
                    if (h)
                        if ("undefined" != typeof c) {
                            var l = h.$items.index(h.$items.filter("[data-value=" + c + "]"));
                            h.$items.eq(l).addClass("disabled");
                            h.$options.eq(l).prop("disabled", !0)
                        } else h.$selecter.hasClass("open") && h.$selecter.find(".selecter-selected").trigger("click.selecter"), h.$selecter.addClass("disabled"), h.$select.prop("disabled", !0)
                })
            },
            destroy: function() {
                return a(this).each(function(c, f) {
                    var g = a(f).parent(".selecter").data("selecter");
                    g && (g.$selecter.hasClass("open") &&
                        g.$selecter.find(".selecter-selected").trigger("click.selecter"), void 0 !== a.fn.scroller && g.$selecter.find(".selecter-options").scroller("destroy"), g.$select[0].tabIndex = g.tabIndex, g.$select.find(".selecter-placeholder").remove(), g.$selected.remove(), g.$itemsWrapper.remove(), g.$selecter.off(".selecter"), g.$select.off(".selecter").removeClass("selecter-element").show().unwrap())
                })
            },
            enable: function(c) {
                return a(this).each(function(f, g) {
                    var h = a(g).parent(".selecter").data("selecter");
                    if (h)
                        if ("undefined" !=
                            typeof c) {
                            var l = h.$items.index(h.$items.filter("[data-value=" + c + "]"));
                            h.$items.eq(l).removeClass("disabled");
                            h.$options.eq(l).prop("disabled", !1)
                        } else h.$selecter.removeClass("disabled"), h.$select.prop("disabled", !1)
                })
            },
            refresh: function() {
                return B.update.apply(a(this))
            },
            update: function() {
                return a(this).each(function(c, f) {
                    var g = a(f).parent(".selecter").data("selecter");
                    if (g) {
                        var h;
                        g.$allOptions = g.$select.find("option, optgroup");
                        g.$options = g.$allOptions.filter("option");
                        g.index = -1;
                        h = g.$options.index(g.$options.filter(":selected"));
                        v(g);
                        g.multiple || p(h, g)
                    }
                })
            }
        };
    a.fn.selecter = function(a) {
        return B[a] ? B[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : h.apply(this, arguments)
    };
    a.selecter = function(a) {
        "defaults" === a && B.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
}(jQuery, window);
jQuery && function(a) {
    function g(g) {
        g = a.extend({}, w, g);
        for (var n = a(this), m = 0, u = n.length; m < u; m++) h(n.eq(m), g);
        a("#sizer-style").length || a("body").append('<style id="sizer-style">.sizer-size:after { clear: both; content: "."; display: block; height: 0; line-height: 0; visibility: hidden; }</style>');
        return n
    }

    function h(g, h) {
        var n = a.extend({}, {
            $sizer: g,
            $items: g.find(".sizer-item"),
            updateParent: g.hasClass("sizer-update") || 0 < g.find(".sizer-update").length,
            diabled: !1,
            guid: v++
        }, h);
        n.$items.wrapInner('<div class="sizer-size" />');
        n.$sizer.addClass("sizer-ready").data("sizer", n).on("resize.sizer", n, m).trigger("resize.sizer");
        n.$sizer.find("img").each(function() {
            var g = a(this);
            if (g[0].complete) a(this).trigger("resize.sizer");
            else g.on("load", function() {
                a(this).trigger("resize.sizer")
            })
        })
    }

    function m(a) {
        a = a.data;
        if (a.minWidth < Site.maxWidth) {
            for (var g = 0, h = 0; h < a.$items.length; h++) {
                var n = a.$items.eq(h).find(".sizer-size").outerHeight(!0);
                n > g && (g = n)
            }
            a.$items.css({
                height: g
            });
            a.updateParent && a.$sizer.css({
                height: g
            }).find(".sizer-update").css({
                height: g
            })
        } else a.$items.css({
                height: ""
            }),
            a.$sizer.css({
                height: ""
            })
    }
    var v = 0,
        w = {
            minWidth: 0
        },
        u = {
            defaults: function(g) {
                w = a.extend(w, g || {});
                return a(this)
            },
            disable: function() {
                a(this).each(function() {
                    var g = a(this).data("sizer");
                    g.disabled = !0;
                    g.$sizer.off("resize.sizer");
                    g.$items.css({
                        height: ""
                    });
                    g.updateParent && g.$sizer.css({
                        height: ""
                    }).find(".sizer-update").css({
                        height: ""
                    })
                })
            },
            enable: function() {
                a(this).each(function() {
                    var g = a(this).data("sizer");
                    g.disabled && (g.disabled = !1, g.$sizer.on("resize.sizer", g, m).trigger("resize.sizer"))
                })
            }
        };
    a.fn.sizer =
        function(a) {
            return u[a] ? u[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== typeof a && a ? this : g.apply(this, arguments)
        }
}(jQuery);
! function(a, g) {
    function h(g) {
        g = a.extend({}, F, g || {});
        for (var h = a(this), n = 0, u = h.length; u > n; n++) m(h.eq(n), g);
        return h
    }

    function m(h, m) {
        if (!h.data("tabber")) {
            m = a.extend({}, m, h.data("tabber-options"));
            h.addClass("tabber " + m.customClass);
            for (var u = a.extend({
                    $tabber: h,
                    $tabs: h.find(".tabber-tab"),
                    $handles: h.find(".tabber-handle"),
                    index: -1
                }, m), t = 0, y = u.$handles.length; y > t; t++) u.$tabs.eq(t).before('<span class="tabber-handle mobile">' + u.$handles.eq(t).text() + "</span>");
            u.$mobileHandles = h.find(".tabber-handle.mobile");
            h.addClass("initialized").on("click.tabber", ".tabber-handle", u, v).data("tabber", u);
            void 0 !== g.matchMedia && (u.mediaQuery = g.matchMedia("(max-width:" + (1 / 0 === u.maxWidth ? "100000px" : u.maxWidth) + ")"), u.mediaQuery.addListener(function() {
                n.apply(u.$tabber)
            }), n.apply(u.$tabber));
            w(u, 0)
        }
    }

    function v(g) {
        g.preventDefault();
        g.stopPropagation();
        var h = a(this);
        g = g.data;
        h = h.hasClass("mobile") ? g.$mobileHandles.index(h) : g.$handles.index(h);
        w(g, h)
    }

    function w(a, g) {
        g !== a.index && (0 > g && (g = 0), g > a.$tabs.length && (g = a.$tabs.length -
            1), a.index = g, a.$tabs.removeClass("active").eq(g).addClass("active"), u(a))
    }

    function u(a) {
        a.$handles.removeClass("active").eq(a.index).addClass("active");
        a.$mobileHandles.removeClass("active").eq(a.index).addClass("active")
    }

    function n() {
        var g = a(this).data("tabber");
        g.mediaQuery.matches ? g.$tabber.addClass("mobile") : g.$tabber.removeClass("mobile");
        u(g)
    }
    var F = {
            customClass: "",
            maxWidth: "980px"
        },
        y = {
            defaults: function(g) {
                return F = a.extend(F, g || {}), a(this)
            },
            destroy: function() {
                return a(this).each(function() {
                    var g =
                        a(this).data("tabber");
                    g && (g.$mobileHandles.remove(), g.$tabber.removeClass("tabber initialized " + g.customClass).off(".tabber").data("tabber", null))
                })
            },
            select: function(g) {
                return a(this).each(function() {
                    var h = a(this).data("tabber");
                    h && w(h, g - 1)
                })
            }
        };
    a.fn.tabber = function(a) {
        return y[a] ? y[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : h.apply(this, arguments)
    };
    a.tabber = function(a) {
        "defaults" === a && y.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
}(jQuery, this);
! function(a, g) {
    function h(g) {
        g = a.extend({}, K, g);
        for (var h = a(this), n = 0, f = h.length; f > n; n++) m.apply(h.eq(n), [a.extend({}, g)]);
        return t.hasClass("wallpaper-inititalized") || (t.addClass("wallpaper-inititalized"), G.on("resize.wallpaper", g, y)), h
    }

    function m(g) {
        var h = a(this);
        h.hasClass("wallpaper") || (a.extend(g, h.data("wallpaper-options")), h.addClass("wallpaper loading").append('<div class="wallpaper-container"></div>'), g.isAnimating = !1, g.$target = h, g.$container = g.$target.find(".wallpaper-container"), g.$target.data("wallpaper",
            g).on("resize.wallpaper", g, F), h = g.source, g.source = null, v(h, g), g.onReady.call())
    }

    function v(a, g) {
        g.isAnimating || (g.source !== a ? (g.$target.addClass("loading"), g.source = a, g.isAnimating = !0, "object" == typeof a ? u(a, g) : w(a, g)) : g.$target.trigger("wallpaper.loaded"))
    }

    function w(g, h, m) {
        var f = a('<div class="wallpaper-media wallpaper-image"><img /></div>'),
            p = f.find("img");
        p.one("load.wallpaper", function() {
            H && f.addClass("native").css({
                backgroundImage: "url(" + g + ")"
            });
            f.animate({
                opacity: 1
            }, h.speed, function() {
                m || n(h)
            });
            h.isAnimating = !1;
            h.$target.removeClass("loading").trigger("wallpaper.loaded");
            F({
                data: h
            });
            m || h.onLoad.call()
        }).attr("src", g);
        f.appendTo(h.$container);
        (p[0].complete || 4 === p[0].readyState) && p.trigger("load")
    }

    function u(g, h) {
        if (h.source.poster && w(h.source.poster, h, !0), !I) {
            var m = a('<div class="wallpaper-media wallpaper-video"></div>'),
                f = "<video";
            h.loop && (f += " loop");
            f += ">";
            h.source.webm && (f += '<source src="' + h.source.webm + '" type="video/webm" />');
            h.source.mp4 && (f += '<source src="' + h.source.mp4 + '" type="video/mp4" />');
            h.source.ogg && (f += '<source src="' + h.source.ogg + '" type="video/ogg" />');
            m.append(f + "</video>").find("video").one("loadedmetadata", function() {
                m.appendTo(h.$container).animate({
                    opacity: 1
                }, h.speed, function() {
                    n(h)
                });
                h.isAnimating = !1;
                h.$target.removeClass("loading").trigger("wallpaper.loaded");
                F({
                    data: h
                });
                h.onLoad.call();
                h.hoverPlay ? h.$target.on("mouseover.boxer", C.play).on("mouseout.boxer", C.stop) : h.autoPlay && this.play()
            })
        }
    }

    function n(a) {
        a = a.$container.find(".wallpaper-media");
        1 <= a.length && a.not(":last").remove()
    }

    function F(a) {
        a.preventDefault && (a.preventDefault(), a.stopPropagation());
        a = a.data;
        for (var g = a.$container.find(".wallpaper-media"), h = 0, f = g.length; f > h; h++) {
            var n = g.eq(h),
                m = n.find("video").length ? "video" : "image",
                p = n.find(m);
            if (p.length && ("image" !== m || !a.nativeSupport)) {
                var m = a.$target.outerWidth(),
                    u = a.$target.outerHeight();
                if (p.is("img"))
                    if (p = p[0], "undefined" != typeof p.naturalHeight) p = {
                        naturalHeight: p.naturalHeight,
                        naturalWidth: p.naturalWidth
                    };
                    else var w = new Image,
                        p = (w.src = p.src, {
                            naturalHeight: w.height,
                            naturalWidth: w.width
                        });
                else p = {
                    naturalHeight: p[0].videoHeight,
                    naturalWidth: p[0].videoWidth
                };
                a.width = p.naturalWidth;
                a.height = p.naturalHeight;
                a.left = 0;
                a.top = 0;
                p = a.width / a.height;
                a.height = u;
                a.width = a.height * p;
                a.width < m && (a.width = m, a.height = a.width / p);
                a.left = -(a.width - m) / 2;
                a.top = -(a.height - u) / 2;
                n.css({
                    height: a.height,
                    width: a.width,
                    left: a.left,
                    top: a.top
                })
            }
        }
    }

    function y() {
        a(".wallpaper").each(function() {
            var g = a(this).data("wallpaper");
            F({
                data: g
            })
        })
    }
    var G = a(g),
        t = a("body"),
        H = "backgroundSize" in document.documentElement.style,
        I = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(g.navigator.userAgent || g.navigator.vendor || g.opera),
        K = {
            autoPlay: !0,
            hoverPlay: !1,
            loop: !0,
            onLoad: a.noop,
            onReady: a.noop,
            source: null,
            speed: 500
        },
        C = {
            defaults: function(g) {
                return K = a.extend(K, g || {}), a(this)
            },
            destroy: function() {
                var g = a(this).each(function() {
                    var g = a(this).data("wallpaper");
                    g.$target.removeClass("wallpaper").off(".boxer");
                    g.$container.remove()
                });
                return 1 > a(".wallpaper").length && (t.removeClass("wallpaper-inititalized"), G.off(".wallpaper")),
                    g
            },
            load: function(g) {
                return a(this).each(function() {
                    var h = a(this).data("wallpaper");
                    h && v(g, h)
                })
            },
            play: function() {
                return a(this).each(function() {
                    var g = a(this).data("wallpaper");
                    g && (g = g.$container.find("video"), g.length && g[0].play())
                })
            },
            stop: function() {
                return a(this).each(function() {
                    var g = a(this).data("wallpaper");
                    g && (g = g.$container.find("video"), g.length && g[0].pause())
                })
            }
        };
    a.fn.wallpaper = function(a) {
        return C[a] ? C[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : h.apply(this,
            arguments)
    };
    a.wallpaper = function(a) {
        "defaults" === a && C.defaults.apply(this, Array.prototype.slice.call(arguments, 1))
    }
}(jQuery, window);
! function(a) {
    for (var g = 0, h = ["webkit", "moz"], m = 0; m < h.length && !a.requestAnimationFrame; m++) a.requestAnimationFrame = a[h[m] + "RequestAnimationFrame"], a.cancelAnimationFrame = a[h[m] + "CancelAnimationFrame"] || a[h[m] + "CancelRequestAnimationFrame"];
    a.navtiveRAF = "undefined" != typeof a.requestAnimationFrame;
    a.navtiveRAF || (a.requestAnimationFrame = function(h) {
        var m = (new Date).getTime(),
            u = Math.max(0, 16 - (m - g)),
            n = a.setTimeout(function() {
                h(m + u)
            }, u);
        return g = m + u, n
    }, a.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    })
}(this);
(function(a, g) {
    function h() {
        m && (g.requestAnimationFrame(h), jQuery.fx.tick())
    }
    var m = !1;
    g.navtiveRAF || (a.fx.timer = function(g) {
        g() && a.timers.push(g) && !m && (m = !0, h())
    }, a.fx.stop = function() {
        m = !1
    })
})(jQuery, this);
(function(a) {
    function g(g, u) {
        u = a.extend({}, w, u);
        u.compressor = g || 1;
        for (var n = a(this), F = 0, t = n.length; F < t; F++) {
            var H = n.eq(F),
                I = a.extend({}, u);
            I.$target = H;
            H.addClass("fit-text").data("fit-text", I)
        }
        m || (m = !0, a(window).on("resize.fittext orientationchange.fittext", h));
        v = a(".fit-text");
        return n
    }

    function h(a) {
        a = 0;
        for (var g = v.length; a < g; a++) {
            var h = v.eq(a).data("fit-text");
            "undefined" !== typeof h && h.$target.css("font-size", Math.max(Math.min(h.$target.width() / (10 * h.compressor), parseFloat(h.maxFontSize)), parseFloat(h.minFontSize)))
        }
    }
    var m = !1,
        v = null,
        w = {
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        },
        u = {
            destroy: function() {
                a(this).removeClass("fit-text").css("font-size", "");
                return v = a(".fit-text")
            }
        };
    a.fn.fitText = function(a) {
        return u[a] ? u[a].apply(this, Array.prototype.slice.call(arguments, 1)) : g.apply(this, arguments)
    }
})(jQuery);
jQuery && function(a) {
    a.dependent = function(g, h, m) {
        "function" == typeof h && (m = h, h = null);
        return a.ajax(a.extend(h || {}, {
            dataType: "script",
            cache: !0,
            url: g
        })).done(m || a.noop)
    }
}(jQuery);
jQuery && function(a) {
    function g(g) {
        g = a.extend({}, v, g);
        for (var m = a(this), u = 0, w = m.length; u < w; u++) h.apply(m[u], [g]);
        return m
    }

    function h(g) {
        var h = a(this);
        h.data("cl") || (g = a.extend({}, g, h.data("cl-options")), g.$loader = h, g.$target = h.find(".cl-target"), g.$select = h.find(".cl-options"), g.url = g.$loader.data("content-url"), g.key = g.$select.attr("name"), g.$loader.data("cl", g), g.$select.on("change.cl", g, m))
    }

    function m(a) {
        var g = a.data;
        a = g.$select.val();
        g.$loader.addClass("loading");
        g.$target.load(g.url + "?" + g.key +
            "=" + a,
            function(a) {
                g.$loader.removeClass("loading");
                g.callback.apply(g.$loader, [g])
            })
    }
    var v = {
            callback: a.noop
        },
        w = {
            defaults: function(g) {
                v = a.extend(v, g || {});
                return a(this)
            },
            destroy: function() {
                return a(this).each(function() {
                    var g = a(this).data("cl");
                    g && (g.$select.off(".cl"), g.$target.off(".cl"), g.$loader.data("cl", null))
                })
            },
            load: function() {
                return a(this).each(function() {
                    var g = a(this).data("cl");
                    g && m({
                        data: g
                    })
                })
            }
        };
    a.fn.contentLoader = function(a) {
        return w[a] ? w[a].apply(this, Array.prototype.slice.call(arguments,
            1)) : "object" !== typeof a && a ? this : g.apply(this, arguments)
    }
}(jQuery);
void 0 === window.console && (window.console = {
    log: function() {},
    error: function() {},
    warn: function() {}
});
Array.prototype.indexOf || (Array.prototype.indexOf = function(a, g) {
    var h = this.length >>> 0,
        m = Number(g) || 0,
        m = 0 > m ? Math.ceil(m) : Math.floor(m);
    for (0 > m && (m += h); m < h; m++)
        if (m in this && this[m] === a) return m;
    return -1
});
Array.prototype.forEach || (Array.prototype.forEach = function(a, g) {
    for (var h = 0, m = this.length; h < m; h++) h in this && a.call(g, this[h], h, this)
});
String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
});
var IE8 = IE8 || !1,
    IE9 = IE9 || !1,
    Site = {
        minWidth: 320,
        maxWidth: Infinity,
        scrollTop: 0,
        maxScroll: 0,
        windowHeight: 0,
        windowWidth: 0,
        localStorage: "undefined" !== typeof Storage,
        transitionEnd: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera),
        isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor || window.opera),
        singleRollerOptions: {
            single: !0,
            pagination: !1
        },
        contentRollerOptions: {
            paged: !0,
            minWidth: "740px",
            pagination: !1
        },
        _init: function() {
            Site.$window = $(window);
            Site.$doc = $(document);
            Site.$html = $("html");
            Site.$body = $("body");
            (IE8 || IE9) && Site.$html.addClass("no-touch");
            $.dependent("//platform.twitter.com/widgets.js");
            $.macaroon({
                path: "/"
            });
            $.scout();
            Site.$window.on("snap", Site._onRespond).on("resize", Site._onResize).on("scroll", Site._onScroll);
            $.boxer("defaults", {
                fixed: !0,
                margin: 100,
                opacity: .85,
                videoRatio: .6083,
                videoWidth: 975
            });
            $("a.lightbox").boxer();
            $("select").not(".home_section.photos select").selecter();
            //$("input[type=checkbox], input[type=radio]").picker();
            $(".expander").expander();
            $(".duplicator").duplicator();
            $(".tabber").tabber({
                onAfter: function() {
                    $(this).find(".tabber-content.active .roller").roller("resize")
                }
            });
            if (IE8 || IE9) Site.singleRollerOptions.useMargin = !0, Site.contentRollerOptions.useMargin = !0;
            $(".single_roller").roller(Site.singleRollerOptions);
            $(".content_roller").roller("defaults", Site.contentRollerOptions).roller();
            $(".content_loader").contentLoader({
                callback: Site._onContentLoad
            });
            $(".sizer").sizer({
                minWidth: 740
            });
            $(".full_bg").wallpaper();
            Navigation._init();
            Search._init();
            History._init();
            Subnavigation._init();
            Media._init();
            Social._init();
            EverythingDirectory._init();
            Home._init();
            HomeTimeline._init();
            Timeline._init();
            ListGallery._init();
            $(".full_gallery").fullGallery();
            $.rubberband({
                maxWidth: [1220, 980, 740, 500, 320],
                minWidth: [1220, 980, 740, 500, 320]
            });
            Site.$window.trigger("resize").trigger("scroll");
            if (IE8) {
                var a = [".image_grid figure:nth-of-type(3n+1)", ".link_set:nth-child(3n+1)",
                        ".link_set.columned:nth-child(3n+1)", ".link_set.categorized .column:nth-child(2n+1)"
                    ],
                    g;
                for (g in a) a.hasOwnProperty(g) && $(a[g]).addClass("clear")
            }
            Site._fixCovers()
        },
        _onRespond: function(a, g) {
            Site.minWidth = g.minWidth;
            Site.maxWidth = g.maxWidth;
            $(".roller").roller("resize");
            Navigation._respond();
            Subnavigation._respond();
            Home._respond();
            History._onScroll();
            Timeline._onScroll();
            $(".sizer").trigger("resize");
            740 <= Site.minWidth ? $(".page_header h1").fitText("destroy") : $(".page_header h1").fitText(.8, {
                minFontSize: 32,
                maxFontSize: 42
            })
        },
        _onResize: function(a) {
            Site.windowHeight = Site.$window.height();
            Site.windowWidth = Site.$window.width();
            Search._onResize()
        },
        _onRAF: function() {
            window.requestAnimationFrame(Site._onRAF)
        },
        _onScroll: function(a) {
            Site.scrollTop = Site.$window.scrollTop();
            980 <= Site.maxWidth && (Navigation._onScroll(), HomeTimeline._onScroll());
            History._onScroll();
            Timeline._onScroll()
        },
        _onScrollEnd: function() {
            Site.$body.removeClass("disable-hover")
        },
        _scrollTo: function(a) {
            var g = $(a.currentTarget).attr("href");
            "#" !=
            g && (a.stopPropagation(), a.preventDefault(), Site._scrollToElement(g))
        },
        _scrollToElement: function(a, g) {
            var h = $(a);
            h.length || (h = $("[name=" + a.substring(1) + "]"));
            h.length && (h = h.offset(), "#top" === a && (h.top = 0), Site._scrollToPos(h.top - ("undefined" === typeof g ? 20 : g)))
        },
        _scrollToPos: function(a) {
            $("html, body").animate({
                scrollTop: a
            });
            $(window).one("mousedown DOMMouseScroll mousewheel keyup", Site._clearScroll)
        },
        _clearScroll: function() {
            $("html, body").stop()
        },
        _onContentLoad: function() {
            $(".content_loader").each(function() {
                Site._fixCovers();
                var a = $(this);
                $roller = a.hasClass("content_roller") ? a : a.find(".content_roller");
                $roller.roller("reset").roller("jump", 1).find("a.lightbox").boxer()
            })
        },
        _fixCovers: function() {
            $(".content_block.background, .content_block.brandedbackground, .content_block.news_event").not(".covered").each(function() {
                var a = $(this);
                $img = a.find(".bg");
                src = $img.attr("src");
                a.css({
                    "background-image": "url(" + src + ")"
                }).addClass("covered")
            })
        }
    },
    Navigation = {
        scrollStarted: !1,
        scrollPaused: !1,
        lastScrollTop: 0,
        headerPos: 0,
        hasTouched: !1,
        selectedAudience: !1,
        _init: function() {
            Navigation.$header =
                $("#header");
            Navigation.$mobileNav = Navigation.$header.find(".mobile_navigation");
            Navigation.$mobileHandle = Navigation.$header.find(".mobile_handle");
            Navigation.$header.on("mouseenter", Navigation._showHeader).on("touchstart click", ".mobile_handle", Navigation._toggleMobileNav);
            Navigation.$desktopNav = Navigation.$header.find(".desktop_navigation");
            Navigation.selectedAudience = $.macaroon("bu-active-audience") || !1;
            Navigation.selectedAudience && (Navigation.$desktopNav.find(".explore").addClass("set"), Navigation.$desktopNav.find(".current[data-type=" +
                Navigation.selectedAudience + "]").addClass("active"));
            Navigation.$desktopNav.on("click", ".explore a", Navigation._setActive);
            Navigation.$mobileNav.on("click", ".dropdown a", Navigation._setActive)
        },
        _respond: function() {
            980 <= Site.minWidth && Navigation._closeMobileNav()
        },
        _toggleMobileNav: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Navigation.hasTouched || (Navigation.$header.hasClass("navigation_open") ? Navigation._closeMobileNav() : Navigation.$header.addClass("navigation_open"), "touchstart" === a.type &&
                (Navigation.hasTouched = !0, $.doTimeout("navigation-touch", 500, Navigation._resetTouch)))
        },
        _closeMobileNav: function() {
            Navigation.$header.removeClass("navigation_open")
        },
        _resetTouch: function() {
            Navigation.hasTouched = !1
        },
        _onScroll: function() {
            Navigation.scrollStarted && !Navigation.scrollPaused && (Site.maxScroll = Site.$doc.height() - Site.windowHeight - 5, Site.scrollTop >= Navigation.lastScrollTop && Site.scrollTop <= Site.maxScroll ? (0 >= Site.scrollTop ? Navigation.headerPos = 0 : (Navigation.headerPos += -(Site.scrollTop - Navigation.lastScrollTop), -85 >= Navigation.headerPos && (Navigation.headerPos = -85)), Navigation.$header.stop().css({
                top: Navigation.headerPos
            })) : Navigation._showHeader());
            Navigation.lastScrollTop = Site.scrollTop;
            Navigation.scrollStarted = !0
        },
        _showHeader: function() {
            0 != Navigation.headerPos && (Navigation.headerPos = 0, Navigation.$header.stop().animate({
                top: Navigation.headerPos
            }, 200))
        },
        _hideHeader: function() {
            Navigation.headerPos = -85;
            Navigation.$header.stop().css({
                top: Navigation.headerPos
            })
        },
        _setActive: function(a) {
            a = $(a.currentTarget);
            $.macaroon("bu-active-audience",
                a.data("type"))
        }
    },
    Search = {
        searchData: null,
        desktopOpen: !1,
        desktopFocus: !1,
        quickSearchDate: !1,
        _init: function() {
            Search.$searchBlock = $(".desktop_navigation .search");
            Search.$searchBlock.length && (Search.$searchForm = Search.$searchBlock.find(".search_form"), Search.$searchInput = Search.$searchForm.find(".text"), Search.$searchResults = Search.$searchBlock.find(".search_results"), Search.actionEverything = Search.$searchForm.data("action-everything"), Search.actionPeople = Search.$searchForm.data("action-people"), Search.$searchForm.on("keypress",
                ".text", Search._onLiveSearch), Search.$searchBlock.on("mouseenter", Search._openDesktop).on("touchstart click", ".button", Search._doRealSearch), Search._loadSearchData(), "undefined" !== typeof CSEID && (window.__gcse = {
                callback: Search._onCSEReady
            }, $.dependent("//www.google.com/cse/cse.js?cx=" + CSEID)))
        },
        _onResize: function() {
            Search.$searchResults.css({
                maxHeight: Site.windowHeight - 275
            })
        },
        _openDesktop: function(a) {
            Search.desktopOpen || (Search.desktopOpen = !0, Search.$searchBlock.addClass("hover").one("mouseleave.search",
                Search._closeDesktop).one("mousedown.search", "input", Search._focusDesktop), Site.$body.on("click.search", Search._closeDesktop), Site.$window.one("scroll.search", Search._closeDesktop), $.scout("Search", "Open"))
        },
        _focusDesktop: function(a) {
            a.stopPropagation();
            Search.desktopFocus = !0;
            Search.$searchBlock.off("mouseleave.search")
        },
        _closeDesktop: function(a) {
            a.stopPropagation();
            if (!Search.desktopFocus || Search.desktopFocus && !$(a.target).closest(".desktop_navigation .search").length) Search.desktopOpen = !1, Search.desktopFocus = !1, Search.$searchBlock.removeClass("hover").off("mouseleave.search").one("mousedown.search"), Site.$body.off("click.search"), Site.$window.off("scroll.search"), $.scout("Search", "Close")
        },
        _loadSearchData: function() {
            if (Site.localStorage) try {
                Search.searchData = JSON.parse(localStorage.getItem("searchData"))
            } catch (g) {}
            if ("undefined" !== typeof QuickSearchDate) Search.quickSearchDate = QuickSearchDate;
            else {
                var a = new Date;
                Search.quickSearchDate = a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate()
            }
            a = $.macaroon("bu-quick-search-cached") ===
                Search.quickSearchDate;
            Search.searchData && a || (Search.searchData = {}, $.getJSON(Search.$searchForm.data("content-url"), Search._searchDataLoaded))
        },
        _searchDataLoaded: function(a) {
            a && (Site.localStorage && localStorage.setItem("searchData", JSON.stringify(a)), Search.searchData = a, $.macaroon("bu-quick-search-cached", Search.quickSearchDate))
        },
        _onLiveSearch: function() {
            $.doTimeout("search-live", 200, Search._doLiveSearch)
        },
        _doLiveSearch: function(a) {
            a && a.preventDefault && (a.preventDefault(), a.stopPropagation());
            980 <=
                Site.minWidth && (a = Search.$searchInput.val(), a = Search._getLocalResults(a), Search.$searchResults.html(a), "" === a ? Search.$searchResults.hide() : Search.$searchResults.show(), $.scout("Search", "Query", "Quick Search"))
        },
        _doRealSearch: function(a) {
            a.preventDefault();
            a.stopPropagation();
            a = $(a.currentTarget).attr("href");
            var g = Search.$searchForm.serialize();
            window.location.href = a + "?" + g
        },
        _getLocalResults: function(a) {
            var g = "",
                h = [],
                m = a.toLowerCase().trim();
            if (3 <= a.length) {
                for (var v in Search.searchData.categories)
                    if (Search.searchData.categories.hasOwnProperty(v)) {
                        a =
                            Search.searchData.categories[v];
                        var w = [],
                            u;
                        for (u in a.pages) {
                            var n = a.pages[u].hasOwnProperty("name") && -1 < a.pages[u].name.toLowerCase().indexOf(m),
                                F = a.pages[u].hasOwnProperty("tags") && -1 < a.pages[u].tags.toLowerCase().indexOf(m);
                            a.pages.hasOwnProperty(u) && (n || F) && w.push(a.pages[u])
                        }
                        w.length && (h[a.name] = w)
                    }
                for (i in h)
                    if (h.hasOwnProperty(i)) {
                        g += '<div class="mobile-full tablet-half desktop-3 column">';
                        g += "<h4>" + i + "</h4>";
                        g += '<nav class="links">';
                        if (0 == h[i].length) g += '<p class="no_results">No Quick Results</p>';
                        else
                            for (v in h[i]) h[i].hasOwnProperty(v) && h[i][v].hasOwnProperty("url") && h[i][v].hasOwnProperty("name") && (g += '<a href="' + h[i][v].url + '">' + h[i][v].name + "</a>");
                        g += "</nav>";
                        g += "</div>"
                    }
            }
            return g
        },
        _onCSEReady: function(a, g, h) {
            Search.cseElement = google.search.cse.element.getElement("searchbox");
            Search.$cseForm = $("#cse_form");
            Search.$cseInput = Search.$cseForm.find("input[type=text]");
            Search.$cseTitle = $(".search_header h2");
            Search.$cseQuery = Search.$cseTitle.find(".query");
            Search.$quickResults = $("#quick_results");
            Search.$cseForm.find("input[type=text], input[type=button]").on("keydown", Search._onCSEKeyDown);
            Search.$cseForm.on("click", "input[type=button]", Search._onCSESearch);
            Site.$body.on("click", ".gsc-cursor-page", Search._onCSEPage);
            Search._onCSESearch()
        },
        _onCSEKeyDown: function(a) {
            13 == a.keyCode && Search._onCSESearch()
        },
        _onCSESearch: function() {
            var a = Search.$cseInput.val(),
                g = "";
            "" == a ? (Search.cseElement.clearAllResults(), Search.$cseTitle.hide()) : (g = Search._getLocalResults(a), Search.$cseTitle.show());
            "" != a && "" ==
                g && (g = '<div class="mobile-full tablet-half desktop-full"><p class="no_results" style="border: none; padding-top: 10px;">No Quick Results</p></div>');
            Search.$quickResults.html(g);
            Search.$cseQuery.text(a);
            $.scout("Search", "Query", "Full Search")
        },
        _onCSEPage: function() {
            Navigation.scrollPaused = !0;
            Navigation._hideHeader();
            $.doTimeout("cse-pagination", 10, function() {
                Navigation.scrollPaused = !1
            })
        }
    },
    History = {
        root: "",
        maxPages: 27,
        data: {},
        initialized: !1,
        open: !1,
        delay: 0,
        scrollTop: 0,
        hasTouched: !1,
        _init: function() {
            History.root =
                window.location.protocol + "//" + window.location.hostname;
            History.$history = $("#history");
            if (History.$history.length) {
                History.initialized = !0;
                History.$overlay = $("#history-overlay");
                History.$handle = $("#header .history");
                History.$pageContainer = History.$history.find(".pages");
                if (Site.localStorage) try {
                    History.data = JSON.parse(localStorage.getItem("historyData"))
                } catch (a) {}
                History.data || (History.data = {});
                History.data.pages || (History.data.pages = []);
                History.data.pinned || (History.data.pinned = []);
                History.data.messageClosed ||
                    (History.data.messageClosed = !1);
                History.data.messageClosed && History.$history.find("p").hide();
                History.$handle.on("touchstart click", History._toggle);
                History.$history.on("touchstart click", ".close.icon", History._toggle).on("click", ".close.text", History._closeMessage);
                History.$pageContainer.on("touchstart click", ".action", History._handleAction);
                History._pushPage()
            }
        },
        _toggle: function(a) {
            a.preventDefault();
            a.stopPropagation();
            History.hasTouched || (History.$history.hasClass("open") ? ($.doTimeout("history-open"),
                History.open = !1, History.delay = 0, Site.$body.removeClass("locked"), History.$history.off("scroll").removeClass("open active"), History.$overlay.off("touchstart click").removeClass("open"), History.$pages.scrollTop(0).off(Site.transitionEnd).removeClass("visible rendered").css(History._transitionDelay("")), $.scout("Place I've Been", "Close")) : (History._drawPages(), Site.$body.addClass("locked"), History.$history.on("scroll", History._onScroll).addClass("open"), History.$overlay.addClass("open").one("touchstart click",
                function(a) {
                    a.preventDefault();
                    a.stopPropagation();
                    History._toggle(a)
                }), $.doTimeout("history-open", 250, function() {
                History.open = !0;
                History._onScroll();
                History.$history.addClass("active")
            }), $.scout("Place I've Been", "Open")), "touchstart" === a.type && (History.hasTouched = !0, $.doTimeout("history-touch", 500, History._resetTouch)))
        },
        _closeMessage: function(a) {
            $(a.currentTarget).parents("p").hide();
            History.data.messageClosed = !0;
            History._saveData()
        },
        _resetTouch: function() {
            History.hasTouched = !1
        },
        _pushPage: function() {
            var a = {
                url: window.location.pathname,
                section: $("meta[property='history:section']").attr("content") || "",
                title: $("meta[property='history:title']").attr("content") || $("title").text() || "",
                image: $("meta[property='history:image']").attr("content") || ""
            };
            $.grep(History.data.pages.concat(History.data.pinned), function(g) {
                return g.url === a.url
            }).length || (History.data.pages.unshift(a), History._saveData())
        },
        _saveData: function() {
            var a = History.maxPages - History.data.pinned.length;
            History.data.pinned.length + History.data.pages.length >
                History.maxPages && (History.data.pages = History.data.pages.slice(0, a));
            localStorage.setItem("historyData", JSON.stringify(History.data))
        },
        _drawPages: function() {
            var a = "",
                g = History.maxPages - History.data.pinned.length - History.data.pages.length,
                h;
            for (h in History.data.pinned)
                if (History.data.pinned.hasOwnProperty(h)) {
                    var m = History.data.pinned[h],
                        a = a + ('<a href="' + History.root + m.url + '" class="mobile-full tablet-half desktop-4 content_block page pinned');
                    m.image && (a += ' image" style="background-image: url(' +
                        m.image + ")");
                    a += '" data-url="' + m.url + '">';
                    a += '<span class="action"></span>';
                    a += '<div class="title">';
                    a += "<h4>" + m.section + "</h4>";
                    a += "<h2>" + m.title + "</h2>";
                    a += "</div>";
                    a += "</a>"
                }
            for (h in History.data.pages) History.data.pages.hasOwnProperty(h) && (m = History.data.pages[h], a += '<a href="' + History.root + m.url + '" class="mobile-full tablet-half desktop-4 content_block page', m.image && (a += ' image" style="background-image: url(' + m.image + ")"), a += '" data-url="' + m.url + '">', a += '<span class="action"></span>', a += '<div class="title">',
                a += "<h4>" + m.section + "</h4>", a += "<h2>" + m.title + "</h2>", a += "</div>", a += "</a>");
            for (h = 0; h < g; h++) a += '<div class="mobile-full tablet-half desktop-4 content_block page placeholder"></div>';
            History.$pageContainer.html(a);
            History.$pages = History.$pageContainer.find(".page")
        },
        _handleAction: function(a) {
            a.stopPropagation();
            a.preventDefault();
            var g = $(a.currentTarget).parents(".page");
            a = g.data("url");
            if (g.hasClass("pinned")) {
                g.removeClass("pinned");
                for (var h in History.data.pinned)
                    if (History.data.pinned.hasOwnProperty(h) &&
                        History.data.pinned[h].url == a) break;
                h = History.data.pinned.splice(h, 1);
                History.data.pages = h.concat(History.data.pages);
                $.scout("Place I've Been", "Unpin", a)
            } else {
                g.addClass("pinned");
                for (h in History.data.pages)
                    if (History.data.pages.hasOwnProperty(h) && History.data.pages[h].url == a) break;
                h = History.data.pages.splice(h, 1);
                History.data.pinned = History.data.pinned.concat(h);
                $.scout("Place I've Been", "Pin", a)
            }
            History._saveData()
        },
        _onScroll: function() {
            History.initialized && History.open && (History.scrollTop = History.$history.scrollTop(),
                History._onRender())
        },
        _onRender: function() {
            History.$pages.not(".visible").each(function(a) {
                a = $(this);
                var g = a.offset(),
                    h = .5 * a.outerHeight(!0);
                Site.scrollTop + Site.windowHeight > g.top + h && (History.delay++, a.css(History._transitionDelay(.1 * History.delay + "s")).one(Site.transitionEnd, History._pageRendered).addClass("visible"))
            })
        },
        _pageRendered: function(a) {
            History.delay--;
            0 > History.delay && (History.delay = -0);
            $(a.currentTarget).css(History._transitionDelay("")).addClass("rendered")
        },
        _transitionDelay: function(a) {
            return {
                "-webkit-transition-delay": a,
                "-moz-transition-delay": a,
                "-ms-transition-delay": a,
                "-o-transition-delay": a,
                "transition-delay": a
            }
        }
    },
    Subnavigation = {
        initialized: !1,
        hasTouched: !1,
        _init: function() {
            Subnavigation.$wrapper = $(".section_navigation");
            Subnavigation.$navs = Subnavigation.$wrapper.find(".subnavigation");
            !Subnavigation.initialized && Subnavigation.$navs.length && (Subnavigation.initialized = !0, Subnavigation.$navs.on("touchstart click", ".handle", Subnavigation._toggleNav))
        },
        _respond: function() {
            Subnavigation.$navs.removeClass("open")
        },
        _toggleNav: function(a) {
            a.preventDefault();
            a.stopPropagation();
            var g = $(a.currentTarget).parents(".subnavigation");
            Subnavigation.hasTouched || (g.hasClass("open") ? g.removeClass("open") : (Subnavigation.$navs.removeClass("open"), g.addClass("open")), "touchstart" === a.type && (Subnavigation.hasTouched = !0, $.doTimeout("subnavigation-touch", 500, Subnavigation._resetTouch)))
        },
        _resetTouch: function() {
            Subnavigation.hasTouched = !1
        }
    },
    Media = {
        videoReady: !1,
        queue: [],
        _init: function() {
            $.dependent("http://cdnapi.kaltura.com/p/662731/sp/66273100/embedIframeJs/uiconf_id/20952542/partner_id/662731",
                Media._ready)
        },
        _ready: function() {
            Media.videoReady = !0;
            mw.setConfig({
                "Kaltura.EnableEmbedUiConfJs": !0,
                "Kaltura.LeadWithHTML5": !0,
                "EmbedPlayer.UseFlashOnAndroid": !1,
                "EmbedPlayer.AttributionButton": !1,
                "EmbedPlayer.EnableRightClick": !1,
                "LoadingSpinner.ImageUrl": "/images/system/loading_circle_small.gif"
            });
            Site.$body.on("click", ".lightbox_video", Media._launchVideoLightbox).on("touchstart click", ".handle.caption", Media._toggleCaption);
            if (Media.queue.length)
                for (var a = 0; a < Media.queue.length; a++)
                    if (Media.queue.hasOwnProperty(a)) {
                        var g =
                            Media.queue[a];
                        Media._embedVideo(g.target, g.data, g.autoplay)
                    }
        },
        _videoThumbnail: function(a) {
            if (Media.videoReady) return kWidget.getKalturaThumbUrl({
                wid: a.widget,
                entry_id: a.id,
                height: a.height || 480,
                quality: 100
            })
        },
        _embedVideo: function(a, g, h) {
            Media.videoReady ? (h = {
                targetId: a,
                wid: g.widget,
                uiconf_id: g.ui,
                entry_id: g.id,
                flashvars: {
                    autoPlay: h || !1,
                    IframeCustomPluginCss1: "/prebuilt/css/player.css"
                },
                readyCallback: function(a) {
                    a = $("#" + a)[0];
                    a.addJsListener("playerPlayed", Media._onPlayStart);
                    a.addJsListener("playerPaused",
                        Media._onPlayEnd);
                    a.addJsListener("playerPlayEnd", Media._onPlayEnd)
                }
            }, Site.isIOS ? kWidget.thumbEmbed(h) : kWidget.embed(h), $("#" + a).parent().addClass("video_share").data("share", g)) : Media.queue.push({
                target: a,
                data: g,
                autoplay: h
            })
        },
        _removeVideo: function(a) {
            Media.videoReady && kWidget.destroy(a)
        },
        _launchVideoLightbox: function(a) {
            a.preventDefault();
            a.stopPropagation();
            if (Media.videoReady) {
                var g = $(a.currentTarget).data("video-options");
                a = $('<div class="video_modal_wrapper"><div class="video_modal"><div class="video_player" id="lightbox_video">&nbsp;</div></div></div>');
                $.boxer(a, {
                    callback: function() {
                        Media._embedVideo("lightbox_video", g, !0)
                    }
                });
                Site.$window.one("boxer.open", function() {
                    Site.$window.trigger("resize")
                }).one("boxer.close", Home._closeVideoLightbox)
            }
        },
        _closeVideoLightbox: function() {
            Media.videoReady && Media._removeVideo("lightbox_video")
        },
        _toggleCaption: function(a) {
            a.preventDefault();
            a.stopPropagation();
            a = $(a.currentTarget).parents(".media");
            a.hasClass("caption_open") ? a.removeClass("caption_open") : a.addClass("caption_open")
        },
        _onPlayStart: function(a) {
            $("#" +
                a).find(".share_tools").hide()
        },
        _onPlayEnd: function(a) {
            a = $("#" + a);
            a.find(".share_tools").length ? a.find(".share_tools").show() : a.append('<div class="share_tools"><span class="label">Share This</span><a href="#facebook" class="share facebook">Facebook</a><a href="#twitter" class="share twitter">Twitter</a><a href="#email" class="share email">Email</a></div>')
        }
    },
    Social = {
        _init: function() {
            Site.$body.on("click", ".share", Social._share)
        },
        _share: function(a) {
            a.preventDefault();
            a.stopPropagation();
            var g = $(a.currentTarget);
            a = g.parents(".video_share");
            var h = a.length ? a.data("share") : g.parents(".share_tools").data("share");
            "undefined" !== typeof h && "object" !== typeof h && (h = JSON.parse(h));
            a = "height=300,width=600";
            var g = g.attr("class").replace("share", "").trim(),
                m = encodeURIComponent(h && h.link ? h.link : window.location.href),
                h = encodeURIComponent(h && h.title ? h.title : document.title),
                m = "http://api.addthis.com/oexchange/0.8/forward/" + g + "/offer?url=" + m;
            "twitter" === g ? m += "&text=" + h + "&via=BucknellU" : "facebook" !== g && (m += "&title=" + h);
            "facebook" ===
            g ? a = "height=370,width=670" : "twitter" === g ? a = "height=260,width=560" : "email" === g && (a = "height=710,width=480");
            window.open(m, "Name", a + ",location=no,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=no,toolbar=no")
        }
    },
    Home = {
        initialized: !1,
        preferences: null,
        _init: function() {
            Home.$preferences = $(".content_preferences");
            Home.$preferencesPanel = $("#content_preferences");
            Home.$preferencesOverlay = $("#content_preferences_overlay");
            if (!Subnavigation.initialized && Home.$preferences.length && Home.$preferencesPanel.length) {
                Home.initialized = !0;
                Home.$toggleWraper = Home.$preferencesPanel.find(".toggles");
                Home.$toggles = Home.$toggleWraper.find(".toggle");
                Home.$sections = $(".home_section_container");
                Home.$activeSections = Home.$sections.filter(".loaded.open");
                try {
                    Home.preferences = JSON.parse($.macaroon("bu-home-preferences"))
                } catch (a) {}
                Home.preferences || (Home.preferences = {
                    edited: !1,
                    sections: []
                });
                Home.preferences.sections.length || Home.$toggles.filter(":checked").each(function() {
                    Home.preferences.sections.push($(this).attr("name"))
                });
                Home.$toggles.each(function() {
                    var a =
                        $(this),
                        g = a.is(":checked"),
                        h = a.attr("name");
                    0 <= Home.preferences.sections.indexOf(h) && !g ? a.prop("checked", !0).trigger("change") : 0 > Home.preferences.sections.indexOf(h) && g && a.prop("checked", !1).trigger("change")
                });
                Home.$preferences.on("touchstart click", ".open_panel", Home._openPreferencesPanel).on("touchstart click", ".nothanks", Home._togglePreferencesIntro);
                Home.$preferencesPanel.on("touchstart click", ".close_panel", Home._closePreferencesPanel).on("change", ".toggle", Home._togglePreference);
                Home._initSections();
                Home.$sections.on(Site.transitionEnd, Home._unanimateSection);
                Home.preferences.edited && Home.$preferences.addClass("closed");
                Home.$preferences.addClass("visible");
                Home._togglePreferences()
            }
        },
        _respond: function() {
            Home._respondSections()
        },
        _togglePreferencesIntro: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Home.$preferences.addClass("closed");
            Home.preferences.edited = !0;
            Home._updatePreferences()
        },
        _openPreferencesPanel: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Home.preferences.edited || Home._togglePreferencesIntro(a);
            Home.$preferencesPanel.addClass("open");
            Home.$preferencesOverlay.addClass("open")
        },
        _closePreferencesPanel: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Home.$preferencesPanel.removeClass("open");
            Home.$preferencesOverlay.removeClass("open");
            Site._scrollToElement(Home.$preferences, 980 <= Site.minWidth ? 90 : 0)
        },
        _togglePreferencesPanel: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Home.$preferencesPanel.hasClass("open") ? Home._closePreferencesPanel(a) : Home._openPreferencesPanel(a)
        },
        _togglePreference: function() {
            var a =
                $(this),
                g = a.attr("name"),
                g = Home.$sections.filter("#section_" + g);
            a.is(":checked") && Site._scrollToElement(g, 0);
            Home._togglePreferences()
        },
        _togglePreferences: function(a) {
            Home.$toggles.filter(":checked");
            var g = !1;
            Home.preferences.sections = [];
            Home.$toggles.each(function() {
                var a = $(this),
                    m = a.is(":checked"),
                    a = a.attr("name"),
                    v = Home.$sections.filter("#section_" + a),
                    w = v.hasClass("loaded"),
                    u = v.hasClass("open");
                m ? (Home.preferences.sections.push(a), u || (w ? (v.addClass("animated open"), Home._sizeSection(v)) : (g = !0,
                    v.load(v.data("source"), function() {
                        Site._fixCovers();
                        Home._initSections();
                        v.addClass("loaded animated open");
                        Home._sizeSection(v)
                    }), Site.$doc.one("ajaxStop", Home._ajaxComplete)), $.scout("Home Preferences", "Open", a))) : u && (v.addClass("animated").removeClass("open").css({
                    height: ""
                }), $.scout("Home Preferences", "Close", a))
            });
            g || Home._ajaxComplete();
            Home._updatePreferences()
        },
        _updatePreferences: function() {
            $.macaroon("bu-home-preferences", JSON.stringify(Home.preferences))
        },
        _ajaxComplete: function() {
            Home.$activeSections =
                Home.$sections.filter(".loaded.open")
        },
        _initSections: function() {
            $(".home_section .content_roller, .home_section.content_roller").not(".roller").roller();
            Home.Academics._init();
            Home.Photos._init()
        },
        _respondSections: function() {
            Home.initialized && (980 <= Site.maxWidth ? Home.$activeSections.each(function() {
                Home._sizeSection($(this))
            }) : Home.$sections.css({
                height: ""
            }))
        },
        _unanimateSection: function(a) {
            "opacity" !== a.originalEvent.propertyName && $(a.currentTarget).removeClass("animated")
        },
        _sizeSection: function(a) {
            var g =
                a.hasClass("open") ? a.find(".home_section").outerHeight(!0) : 0;
            a.css({
                height: g - 1
            });
            $.doTimeout(50, function() {
                Home._sizeSection(a)
            })
        },
        Academics: {
            inititalized: !1,
            url: "",
            _init: function() {
                Home.Academics.$section = $(".home_section.academics");
                !Home.Academics.initialized && Home.Academics.$section.length && (Home.Academics.initialized = !0, Home.Academics.$roller = Home.Academics.$section.find(".content_roller"), Home.Academics.$roller.contentLoader({
                    callback: Site._onContentLoad
                }))
            }
        },
        Photos: {
            inititalized: !1,
            _init: function() {
                Home.Photos.$section =
                    $(".home_section.photos");
                !Home.Photos.initialized && Home.Photos.$section.length && (Home.Photos.initialized = !0, Home.Photos.$image = Home.Photos.$section.find(".full_bg"), Home.Photos.$form = Home.Photos.$section.find(".content_form"), Home.Photos.$form.find("select").selecter({
                    callback: Home.Photos._loadImageData
                }), Home.Photos.$section.fullGallery(), Home.Photos.$image.on("wallpaper.loaded", Home.Photos._imageLoaded).one("wallpaper.loaded", function() {
                    Home._sizeSection(Home.Photos.$section.parent())
                }), Home.Photos._loadImageData(0))
            },
            _loadImageData: function(a, g) {
                var h = Home.Photos.$form.data("content-url") + "?category=" + a;
                Home.Photos.$section.addClass("loading");
                $.getJSON(h, Home.Photos._imageDataLoaded, function(a) {
                    Home.Photos.$section.fullGallery("updateData", a);
                    Home._respondSections();
                    Site._fixCovers()
                })
            },
            _imageLoaded: function() {
                Home.Photos.$section.removeClass("loading")
            }
        }
    },
    HomeTimeline = {
        initialized: !1,
        animating: !1,
        videoActive: !1,
        isYouTube: !1,
        _init: function() {
            HomeTimeline.$timeline = $(".home_timeline");
            HomeTimeline.$timeline.length &&
                (HomeTimeline.initialized = !0, HomeTimeline.$background = HomeTimeline.$timeline.find(".background"), HomeTimeline.$video = HomeTimeline.$timeline.find(".video"), HomeTimeline.$dates = HomeTimeline.$timeline.find(".date"), HomeTimeline.$statement = HomeTimeline.$timeline.find(".statement"), HomeTimeline.$scroll = HomeTimeline.$timeline.find(".scroll"), HomeTimeline.$timeline.on("touchstart click", ".date:not(.more)", HomeTimeline._selectDate).on("touchstart click", ".play", HomeTimeline._launchVideo), HomeTimeline.$background.on("wallpaper.loaded",
                    HomeTimeline._backgroundLoaded), $.doTimeout("home-timeline-scroll", 1E4, HomeTimeline._showScroll))
        },
        _selectDate: function(a) {
            if (!HomeTimeline.animating) {
                HomeTimeline.videoActive && HomeTimeline._removeVideo();
                HomeTimeline.animating = !0;
                HomeTimeline.$timeline.addClass("loading");
                a = $(a.currentTarget);
                var g = a.data("link"),
                    h = a.data("video-options");
                HomeTimeline.$dates.removeClass("active");
                a.addClass("active");
                var m = '<h1 class="new' + (g && h ? " double" : "") + '">';
                g && h ? (m += '<a href="' + g + '" class="primary play" data-video-options=\'' +
                    JSON.stringify(h) + '\'><div class="table">', m += '<span class="label">' + a.find(".flag").text() + "</span>", m = m + '<span class="icon"></span></div></a>' + ('<a href="' + g + '" class="secondary"><div class="table">') + '<span class="icon"></span>') : g && !h ? (m = m + ('<a href="' + g + '" class="primary"><div class="table">') + ('<span class="label">' + a.find(".flag").text() + "</span>"), m += '<span class="icon"></span>') : !g && h ? (m += '<a href="#" class="primary play" data-video-options=\'' + JSON.stringify(h) + '\'><div class="table">',
                    m += '<span class="label">' + a.find(".flag").text() + "</span>", m += '<span class="icon"></span>') : m = m + '<a href="#" class="primary play"><div class="table">' + ('<span class="label">' + a.find(".flag").text() + "</span>");
                m += "</div></a></h1>";
                HomeTimeline.$statement.addClass("hidden").find("h1").addClass("old").after(m).end().find("h1.new").data("video-options", h);
                HomeTimeline.$background.wallpaper("load", a.data("background"))
            }
        },
        _backgroundLoaded: function() {
            HomeTimeline.$statement.removeClass("hidden").find(".old").remove().end().find(".new").removeClass("new");
            HomeTimeline.animating = !1;
            HomeTimeline.$timeline.removeClass("loading")
        },
        _launchVideo: function(a) {
            a.preventDefault();
            a.stopPropagation();
            a = $(a.currentTarget).data("video-options");
            if ("undefined" !== typeof a.youtube) {
                HomeTimeline.isYouTube = !0;
                var g = a.youtube,
                    h = g.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i),
                    g = g.split("?"),
                    h = "//www.youtube.com/embed/" + h[1],
                    m = "autoplay=1 autohide=1 color=white controls=1 rel=0 theme=light enablejsapi=1".split(" "),
                    h = 2 <= g.length ? h + ("?" + g.slice(1)[0].trim() + "&" + m.join("&")) : h + ("?" + m.join("&")),
                    g = '<iframe id="timeline_youtube" type="text/html" src="' + h + '" frameborder="0">';
                $("script").eq(0).before('<script src="https://www.youtube.com/iframe_api">\x3c/script>');
                $("#timeline_video").addClass("video_share").data("share", a).append(g)
            } else Media._embedVideo("timeline_video", a, !0);
            HomeTimeline.$statement.addClass("hidden");
            HomeTimeline.$timeline.addClass("playing");
            HomeTimeline.videoActive = !0
        },
        _removeVideo: function() {
            HomeTimeline.isYouTube ?
                $("#timeline_video").find("iframe").remove() : Media._removeVideo("timeline_video");
            HomeTimeline.$timeline.removeClass("playing");
            HomeTimeline.videoActive = !1
        },
        _showScroll: function() {
            HomeTimeline.initialized && 980 <= Site.maxWidth && HomeTimeline.$scroll.addClass("visible")
        },
        _onScroll: function() {
            HomeTimeline.initialized && 50 < Site.scrollTop && ($.doTimeout("home-timeline-scroll"), HomeTimeline.$scroll.removeClass("visible"))
        },
        _onYouTubeStart: function() {
            $("#timeline_video").find(".share_tools").hide()
        },
        _onYouTubeEnd: function() {
            var a =
                $("#timeline_video");
            a.find(".share_tools").length ? a.find(".share_tools").show() : a.append('<div class="share_tools"><span class="label">Share This</span><a href="#facebook" class="share facebook">Facebook</a><a href="#twitter" class="share twitter">Twitter</a><a href="#email" class="share email">Email</a></div>')
        }
    };

function onYouTubeIframeAPIReady() {}
var EverythingDirectory = {
        filters: null,
        _init: function() {
            EverythingDirectory.$filters = $(".everything_filters");
            if (EverythingDirectory.$filters.length) {
                EverythingDirectory.initialized = !0;
                EverythingDirectory.$listings = $(".everything_listing .item");
                if (Site.localStorage) try {
                    EverythingDirectory.filters = JSON.parse(localStorage.getItem("everythingDirectoryFilters"))
                } catch (a) {}
                EverythingDirectory.filters || (EverythingDirectory.filters = [], EverythingDirectory.$filters.find(":checked").each(function() {
                    EverythingDirectory.filters.push($(this).val())
                }));
                EverythingDirectory.$filters.find("input").each(function() {
                    var a = $(this),
                        g = a.is(":checked"),
                        h = a.val();
                    0 <= EverythingDirectory.filters.indexOf(h) && !g ? a.prop("checked", !0).trigger("change") : 0 > EverythingDirectory.filters.indexOf(h) && g && a.prop("checked", !1).trigger("change")
                });
                EverythingDirectory._filter();
                EverythingDirectory.$filters.on("change", "input", EverythingDirectory._toggleFilters)
            }
        },
        _toggleFilters: function() {
            EverythingDirectory.filters = [];
            EverythingDirectory.$filters.find(":checked").each(function() {
                EverythingDirectory.filters.push($(this).val())
            });
            EverythingDirectory._filter()
        },
        _filter: function() {
            Site.localStorage && localStorage.setItem("everythingDirectoryFilters", JSON.stringify(EverythingDirectory.filters));
            EverythingDirectory.$listings.each(function() {
                var a = $(this);
                a.hasOneClass(EverythingDirectory.filters) ? a.show() : a.hide()
            })
        }
    },
    Timeline = {
        initialized: !1,
        index: 0,
        data: null,
        infinite: !1,
        build: !1,
        _init: function() {
            Timeline.$timeline = $(".timeline");
            !Timeline.initialized && Timeline.$timeline.length && (Timeline.initialized = !0, Timeline.url = Timeline.$timeline.data("content-url"),
                Timeline.$target = $("#timeline_events"), Timeline.infinite = !0, Timeline.$footer = $("#footer"), $.getJSON(Timeline.url, Timeline._dataLoaded))
        },
        _dataLoaded: function(a) {
            Timeline.data = a;
            Timeline._buildEvents(5)
        },
        _loadEvents: function(a) {
            a.preventDefault();
            a.stopPropagation();
            Timeline.initialized && (Timeline.infinite = !0, Timeline._buildEvents(10))
        },
        _buildEvents: function(a) {
            Timeline.building = !0;
            a = Timeline.data.slice(Timeline.index, Timeline.index + a);
            var g = "";
            Timeline.index += a.length;
            a.forEach(function(a, m) {
                g += "<article ";
                g = a.video ? g + ('class="event row lightbox_video" data-video-options=\'' + unescape(a.video) + "'") : g + 'class="event row"';
                g += ">";
                a.link && (g += '<a href="' + a.link + '">');
                g += '<figure class="mobile-full tablet-half desktop-half contained image">';
                g += '<img src="' + a.image + '" />';
                g += "</figure>";
                g += '<div class="mobile-full tablet-half desktop-half contained title">';
                g += "<h4>" + a.month + " <strong>" + a.day + "</strong></h4>";
                g += "<h3>" + a.title + "</h3>";
                a.link ? g += '<span class="link">View More</span>' : a.video && (g += '<span class="link">Watch Video</span>');
                g += "</div>";
                a.link && (g += "</a>");
                g += "</article>"
            });
            Timeline.$target.append(g);
            Timeline.$events = Timeline.$target.find(".event");
            Timeline._onRender();
            Timeline.building = !1
        },
        _onScroll: function() {
            if (Timeline.initialized && Timeline.data) {
                if (Timeline.infinite && !Timeline.building) {
                    var a = Timeline.$footer.offset().top - Site.windowHeight;
                    Site.scrollTop > a && Timeline._buildEvents(10)
                }
                Timeline._onRender()
            }
        },
        _onRender: function() {
            Timeline.initialized && Timeline.data && Timeline.$events.not(".visible").each(function() {
                var a =
                    $(this),
                    g = a.offset(),
                    h = a.outerHeight(!0);
                Site.scrollTop + Site.windowHeight > g.top + h && (a.find("img").on(Site.transitionEnd, Timeline._eventRendered), a.addClass("visible"))
            })
        },
        _eventRendered: function(a) {
            $(a.currentTarget).parents(".event").addClass("rendered")
        }
    },
    ListGallery = {
        initialized: !1,
        imageData: !1,
        _init: function() {
            ListGallery.$gallery = $(".list_gallery");
            !ListGallery.initialized && ListGallery.$gallery.length && (ListGallery.initialized = !0, ListGallery.images = ListGallery.$gallery.data("gallery"), ListGallery.$image =
                ListGallery.$gallery.find(".full_bg"), ListGallery.$caption = ListGallery.$gallery.find(".caption p"), ListGallery.$form = ListGallery.$gallery.find(".content_form"), ListGallery.$form.on("change", ListGallery._imageSelect), ListGallery._loadImage(0))
        },
        _imageSelect: function(a) {
            a = $(a.target).val();
            ListGallery._loadImage(a)
        },
        _loadImage: function(a) {
            ListGallery.images && ListGallery.images[a] && (ListGallery.$image.wallpaper("load", ListGallery.images[a].image), ListGallery.$caption.text(ListGallery.images[a].caption))
        }
    };
(function(a) {
    function g(a) {
        a = a.data;
        if (null !== a) {
            var g = a.index + 1;
            g > a.images.length - 1 && (g = 0);
            v(a, g)
        }
    }

    function h(a) {
        a = a.data;
        if (null !== a) {
            var g = a.index - 1;
            0 > g && (g = a.images.length - 1);
            v(a, g)
        }
    }

    function m(a, g) {
        var h = a.data;
        null !== h && (h.images = g, v(h, 0))
    }

    function v(a, g) {
        a.images && a.images[g] && (a.$gallery.addClass("loading"), a.$image.one("wallpaper.loaded", function() {
            a.$gallery.removeClass("loading");
            "" === a.images[g].caption.trim() ? a.$caption.hide() : a.$caption.show();
            a.$caption.text(a.images[g].caption)
        }).wallpaper("load",
            a.images[g].image), a.index = g)
    }
    a.fn.fullGallery = function(w, u) {
        return "string" === typeof w && "updateData" === w ? a(this).trigger("update", [u]) : a(this).each(function() {
            var n = a(this);
            n.data("full-gallery") || (n = {
                $gallery: n,
                index: 0
            }, n.images = n.$gallery.data("gallery"), n.$image = n.$gallery.find(".full_bg"), n.$caption = n.$gallery.find(".caption p"), n.$gallery.on("update", n, m).on("click", ".button.load", n, g).on("click", ".control.previous", n, h).on("click", ".control.next", n, g).data("full-gallery", n), v(n, 0))
        })
    }
})(jQuery);
(function(a) {
    function g(g) {
        g.preventDefault();
        g.stopPropagation();
        a(this).parents(".expander").addClass("open")
    }
    a.fn.expander = function() {
        return a(this).find(".expander-handle").click(g)
    }
})(jQuery);
(function(a) {
    function g(g) {
        g.preventDefault();
        g.stopPropagation();
        var h = g.data;
        g = h.$content.clone();
        h.index++;
        g.find("input, textarea, select").each(function() {
            a(this).attr("name", a(this).attr("name").replace("{x}", h.index))
        });
        h.$button.before(g)
    }
    a.fn.duplicator = function() {
        return a(this).each(function() {
            var h = a(this),
                m = {
                    $duplicator: h,
                    $content: h.find(".duplicator_content").clone(),
                    $button: h.find(".duplicator_button"),
                    index: 1
                };
            m.$content.find("input, textarea, select").each(function() {
                a(this).attr("name",
                    a(this).attr("name").replace("1", "{x}"))
            });
            h.on("click", ".duplicator_button", m, g).data(m)
        })
    }
})(jQuery);
(function(a) {
    a.fn.classCount = function(g) {
        var h = a(this),
            m = 0,
            v;
        for (v in g) g.hasOwnProperty(v) && h.hasClass(g[v]) && m++;
        return m
    }
})(jQuery);
(function(a) {
    a.fn.hasOneClass = function(g) {
        var h = a(this),
            m;
        for (m in g)
            if (g.hasOwnProperty(m) && h.hasClass(g[m])) return !0;
        return !1
    }
})(jQuery);
(function(a) {
    a.fn.hasAllClasses = function(g) {
        var h = a(this),
            m;
        for (m in g)
            if (g.hasOwnProperty(m) && !h.hasClass(g[m])) return !1;
        return !0
    }
})(jQuery);
$(document).ready(function() {
    Site._init()
});