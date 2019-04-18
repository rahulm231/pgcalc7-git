<!DOCTYPE html>
<html><head><style type="text/css">
 .menu-mlid-12747 {
 display: none !important;
 }
 </style><meta charset="utf-8"><script src="https://use.typekit.net/fon0ydh.js"></script><script>
 try {
 Typekit.load({
 async : true
 });
 } catch(e) {
 }
 </script><script type="text/javascript">
 (window.NREUM || ( NREUM = {})).loader_config = {
 xpid : "UwMGV15aGwAGUVZWBAY="
 };
 window.NREUM || ( NREUM = {}), __nr_require = function(t, e, n) {
 function r(n) {
 if (!e[n]) {
 var o = e[n] = {
 exports : {}
 };
 t[n][0].call(o.exports, function(e) {
 var o = t[n][1][e];
 return r(o || e)
 }, o, o.exports)
 }
 return e[n].exports
 }
 if ("function" == typeof __nr_require)
 return __nr_require;
 for (var o = 0; o < n.length; o++)
 r(n[o]);
 return r
 }({
 1 : [
 function(t, e, n) {
 function r(t) {
 try {
 s.console && console.log(t)
 } catch(e) {
 }
 }
 var o, i = t("ee"), a = t(15), s = {};
 try {
 o = localStorage.getItem("__nr_flags").split(","), console && "function" == typeof console.log && (s.console = !0, -1 !== o.indexOf("dev") && (s.dev = !0), -1 !== o.indexOf("nr_dev") && (s.nrDev = !0))
 } catch(c) {
 }
 s.nrDev && i.on("internal-error", function(t) {
 r(t.stack)
 }), s.dev && i.on("fn-err", function(t, e, n) {
 r(n.stack)
 }), s.dev && (r("NR AGENT IN DEVELOPMENT MODE"), r("flags: " + a(s, function(t, e) {
 return t
 }).join(", ")))
 }, {}],
 2 : [
 function(t, e, n) {
 function r(t, e, n, r, o) {
 try {
 d ? d -= 1 : i("err", [o || new UncaughtException(t, e, n)])
 } catch(s) {
 try {
 i("ierr", [s, (new Date).getTime(), !0])
 } catch(c) {
 }
 }
 return "function" == typeof f ? f.apply(this, a(arguments)) : !1
 }
 function UncaughtException(t, e, n) {
 this.message = t || "Uncaught error with no additional information", this.sourceURL = e, this.line = n
 }
 function o(t) {
 i("err", [t, (new Date).getTime()])
 }
 var i = t("handle"), a = t(16), s = t("ee"), c = t("loader"), f = window.onerror, u = !1, d = 0;
 c.features.err = !0, t(1), window.onerror = r;
 try {
 throw new Error
 } catch(l) {
 "stack" in l && (t(8), t(7), "addEventListener" in window && t(5), c.xhrWrappable && t(9), u = !0)
 }
 s.on("fn-start", function(t, e, n) {
 u && (d += 1)
 }), s.on("fn-err", function(t, e, n) {
 u && (this.thrown = !0, o(n))
 }), s.on("fn-end", function() {
 u && !this.thrown && d > 0 && (d -= 1)
 }), s.on("internal-error", function(t) {
 i("ierr", [t, (new Date).getTime(), !0])
 })
 }, {}],
 3 : [
 function(t, e, n) {
 t("loader").features.ins = !0
 }, {}],
 4 : [
 function(t, e, n) {
 function r(t) {
 }
 if (window.performance && window.performance.timing && window.performance.getEntriesByType) {
 var o = t("ee"), i = t("handle"), a = t(8), s = t(7), c = "learResourceTimings", f = "addEventListener", u = "resourcetimingbufferfull", d = "bstResource", l = "resource", p = "-start", h = "-end", m = "fn" + p, w = "fn" + h, v = "bstTimer", y = "pushState";
 t("loader").features.stn = !0, t(6);
 var g = NREUM.o.EV;
 o.on(m, function(t, e) {
 var n = t[0];
 n instanceof g && (this.bstStart = Date.now())
 }), o.on(w, function(t, e) {
 var n = t[0];
 n instanceof g && i("bst", [n, e, this.bstStart, Date.now()])
 }), a.on(m, function(t, e, n) {
 this.bstStart = Date.now(), this.bstType = n
 }), a.on(w, function(t, e) {
 i(v, [e, this.bstStart, Date.now(), this.bstType])
 }), s.on(m, function() {
 this.bstStart = Date.now()
 }), s.on(w, function(t, e) {
 i(v, [e, this.bstStart, Date.now(), "requestAnimationFrame"])
 }), o.on(y + p, function(t) {
 this.time = Date.now(), this.startPath = location.pathname + location.hash
 }), o.on(y + h, function(t) {
 i("bstHist", [location.pathname + location.hash, this.startPath, this.time])
 }), f in window.performance && (window.performance["c" + c] ? window.performance[f](u, function(t) {
 i(d, [window.performance.getEntriesByType(l)]), window.performance["c"+c]()
 }, !1) : window.performance[f]("webkit" + u, function(t) {
 i(d, [window.performance.getEntriesByType(l)]), window.performance["webkitC"+c]()
 }, !1)), document[f]("scroll", r, !1), document[f]("keypress", r, !1), document[f]("click", r, !1)
 }
 }, {}],
 5 : [
 function(t, e, n) {
 function r(t) {
 for (var e = t; e && !e.hasOwnProperty(u); )
 e = Object.getPrototypeOf(e);
 e && o(e)
 }
 function o(t) {
 s.inPlace(t, [u, d], "-", i)
 }
 function i(t, e) {
 return t[1]
 }
 var a = t("ee").get("events"), s = t(17)(a), c = t("gos"), f = XMLHttpRequest, u = "addEventListener", d = "removeEventListener";
 e.exports = a, "getPrototypeOf" in Object ? (r(document), r(window), r(f.prototype)) : f.prototype.hasOwnProperty(u) && (o(window), o(f.prototype)), a.on(u + "-start", function(t, e) {
 if (t[1]) {
 var n = t[1];
 if ("function" == typeof n) {
 var r = c(n, "nr@wrapped", function() {
 return s(n, "fn-", null, n.name || "anonymous")
 });
 this.wrapped = t[1] = r
 } else
 "function" == typeof n.handleEvent && s.inPlace(n, ["handleEvent"], "fn-")
 }
 }), a.on(d + "-start", function(t) {
 var e = this.wrapped;
 e && (t[1] = e)
 })
 }, {}],
 6 : [
 function(t, e, n) {
 var r = t("ee").get("history"), o = t(17)(r);
 e.exports = r, o.inPlace(window.history, ["pushState", "replaceState"], "-")
 }, {}],
 7 : [
 function(t, e, n) {
 var r = t("ee").get("raf"), o = t(17)(r), i = "equestAnimationFrame";
 e.exports = r, o.inPlace(window, ["r" + i, "mozR" + i, "webkitR" + i, "msR" + i], "raf-"), r.on("raf-start", function(t) {
 t[0] = o(t[0], "fn-")
 })
 }, {}],
 8 : [
 function(t, e, n) {
 function r(t, e, n) {
 t[0] = a(t[0], "fn-", null, n)
 }
 function o(t, e, n) {
 this.method = n, this.timerDuration = "number" == typeof t[1] ? t[1] : 0, t[0] = a(t[0], "fn-", this, n)
 }
 var i = t("ee").get("timer"), a = t(17)(i), s = "setTimeout", c = "setInterval", f = "clearTimeout", u = "-start", d = "-";
 e.exports = i, a.inPlace(window, [s, "setImmediate"], s + d), a.inPlace(window, [c], c + d), a.inPlace(window, [f, "clearImmediate"], f + d), i.on(c + u, r), i.on(s + u, o)
 }, {}],
 9 : [
 function(t, e, n) {
 function r(t, e) {
 d.inPlace(e, ["onreadystatechange"], "fn-", s)
 }
 function o() {
 var t = this, e = u.context(t);
 t.readyState > 3 && !e.resolved && (e.resolved = !0, u.emit("xhr-resolved", [], t)), d.inPlace(t, w, "fn-", s)
 }
 function i(t) {
 v.push(t), h && ( g = -g, b.data = g)
 }
 function a() {
 for (var t = 0; t < v.length; t++)
 r([], v[t]);
 v.length && ( v = [])
 }
 function s(t, e) {
 return e
 }
 function c(t, e) {
 for (var n in t)
 e[n] = t[n];
 return e
 }
 t(5);
 var f = t("ee"), u = f.get("xhr"), d = t(17)(u), l = NREUM.o, p = l.XHR, h = l.MO, m = "readystatechange", w = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"], v = [];
 e.exports = u;
 var y = window.XMLHttpRequest = function(t) {
 var e = new p(t);
 try {
 u.emit("new-xhr", [e], e), e.addEventListener(m, o, !1)
 } catch(n) {
 try {
 u.emit("internal-error", [n])
 } catch(r) {
 }
 }
 return e
 };
 if (c(p, y), y.prototype = p.prototype, d.inPlace(y.prototype, ["open", "send"], "-xhr-", s), u.on("send-xhr-start", function(t, e) {
 r(t, e), i(e)
 }), u.on("open-xhr-start", r), h) {
 var g = 1, b = document.createTextNode(g);
 new h(a).observe(b, {
 characterData : !0
 })
 } else
 f.on("fn-end", function(t) {
 t[0] && t[0].type === m || a()
 })
 }, {}],
 10 : [
 function(t, e, n) {
 function r(t) {
 var e = this.params, n = this.metrics;
 if (!this.ended) {
 this.ended = !0;
 for (var r = 0; d > r; r++)
 t.removeEventListener(u[r], this.listener, !1);
 if (!e.aborted) {
 if (n.duration = (new Date).getTime() - this.startTime, 4 === t.readyState) {
 e.status = t.status;
 var i = o(t, this.lastSize);
 if (i && (n.rxSize = i), this.sameOrigin) {
 var a = t.getResponseHeader("X-NewRelic-App-Data");
 a && (e.cat = a.split(", ").pop())
 }
 } else
 e.status = 0;
 n.cbTime = this.cbTime, f.emit("xhr-done", [t], t), s("xhr", [e, n, this.startTime])
 }
 }
 }
 function o(t, e) {
 var n = t.responseType;
 if ("json" === n && null !== e)
 return e;
 var r = "arraybuffer" === n || "blob" === n || "json" === n ? t.response : t.responseText;
 return h(r)
 }
 function i(t, e) {
 var n = c(e), r = t.params;
 r.host = n.hostname + ":" + n.port, r.pathname = n.pathname, t.sameOrigin = n.sameOrigin
 }
 var a = t("loader");
 if (a.xhrWrappable) {
 var s = t("handle"), c = t(11), f = t("ee"), u = ["load", "error", "abort", "timeout"], d = u.length, l = t("id"), p = t(14), h = t(13), m = window.XMLHttpRequest;
 a.features.xhr = !0, t(9), f.on("new-xhr", function(t) {
 var e = this;
 e.totalCbs = 0, e.called = 0, e.cbTime = 0, e.end = r, e.ended = !1, e.xhrGuids = {}, e.lastSize = null, p && (p > 34 || 10 > p) || window.opera || t.addEventListener("progress", function(t) {
 e.lastSize = t.loaded
 }, !1)
 }), f.on("open-xhr-start", function(t) {
 this.params = {
 method : t[0]
 }, i(this, t[1]), this.metrics = {}
 }), f.on("open-xhr-end", function(t, e) {
 "loader_config" in NREUM && "xpid" in NREUM.loader_config && this.sameOrigin && e.setRequestHeader("X-NewRelic-ID", NREUM.loader_config.xpid)
 }), f.on("send-xhr-start", function(t, e) {
 var n = this.metrics, r = t[0], o = this;
 if (n && r) {
 var i = h(r);
 i && (n.txSize = i)
 }
 this.startTime = (new Date).getTime(), this.listener = function(t) {
 try {
 "abort" === t.type && (o.params.aborted = !0), ("load" !== t.type || o.called === o.totalCbs && (o.onloadCalled || "function" != typeof e.onload)) && o.end(e)
 } catch(n) {
 try {
 f.emit("internal-error", [n])
 } catch(r) {
 }
 }
 };
 for (var a = 0; d > a; a++)
 e.addEventListener(u[a], this.listener, !1)
 }), f.on("xhr-cb-time", function(t, e, n) {
 this.cbTime += t, e ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof n.onload || this.end(n)
 }), f.on("xhr-load-added", function(t, e) {
 var n = "" + l(t) + !!e;
 this.xhrGuids && !this.xhrGuids[n] && (this.xhrGuids[n] = !0, this.totalCbs += 1)
 }), f.on("xhr-load-removed", function(t, e) {
 var n = "" + l(t) + !!e;
 this.xhrGuids && this.xhrGuids[n] && (
 delete this.xhrGuids[n], this.totalCbs -= 1)
 }), f.on("addEventListener-end", function(t, e) {
 e instanceof m && "load" === t[0] && f.emit("xhr-load-added", [t[1], t[2]], e)
 }), f.on("removeEventListener-end", function(t, e) {
 e instanceof m && "load" === t[0] && f.emit("xhr-load-removed", [t[1], t[2]], e)
 }), f.on("fn-start", function(t, e, n) {
 e instanceof m && ("onload" === n && (this.onload = !0), ("load" === (t[0] && t[0].type) || this.onload) && (this.xhrCbStart = (new Date).getTime()))
 }), f.on("fn-end", function(t, e) {
 this.xhrCbStart && f.emit("xhr-cb-time", [(new Date).getTime() - this.xhrCbStart, this.onload, e], e)
 })
 }
 }, {}],
 11 : [
 function(t, e, n) {
 e.exports = function(t) {
 var e = document.createElement("a"), n = window.location, r = {};
 e.href = t, r.port = e.port;
 var o = e.href.split("://");
 !r.port && o[1] && (r.port = o[1].split("/")[0].split("@").pop().split(":")[1]), r.port && "0" !== r.port || (r.port = "https" === o[0] ? "443" : "80"), r.hostname = e.hostname || n.hostname, r.pathname = e.pathname, r.protocol = o[0], "/" !== r.pathname.charAt(0) && (r.pathname = "/" + r.pathname);
 var i = !e.protocol || ":" === e.protocol || e.protocol === n.protocol, a = e.hostname === document.domain && e.port === n.port;
 return r.sameOrigin = i && (!e.hostname || a), r
 }
 }, {}],
 12 : [
 function(t, e, n) {
 function r(t, e) {
 return function() {
 o(t, [(new Date).getTime()].concat(a(arguments)), null, e)
 }
 }
 var o = t("handle"), i = t(15), a = t(16);
 "undefined" == typeof window.newrelic && ( newrelic = NREUM);
 var s = ["setPageViewName", "setCustomAttribute", "finished", "addToTrace", "inlineHit"], c = ["addPageAction"], f = "api-";
 i(s, function(t, e) {
 newrelic[e] = r(f + e, "api")
 }), i(c, function(t, e) {
 newrelic[e] = r(f + e)
 }), e.exports = newrelic, newrelic.noticeError = function(t) {
 "string" == typeof t && ( t = new Error(t)), o("err", [t, (new Date).getTime()])
 }
 }, {}],
 13 : [
 function(t, e, n) {
 e.exports = function(t) {
 if ("string" == typeof t && t.length)
 return t.length;
 if ("object" == typeof t) {
 if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer && t.byteLength)
 return t.byteLength;
 if ("undefined" != typeof Blob && t instanceof Blob && t.size)
 return t.size;
 if (!("undefined" != typeof FormData && t instanceof FormData))
 try {
 return JSON.stringify(t).length
 } catch(e) {
 return
 }
 }
 }
 }, {}],
 14 : [
 function(t, e, n) {
 var r = 0, o = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
 o && ( r = +o[1]), e.exports = r
 }, {}],
 15 : [
 function(t, e, n) {
 function r(t, e) {
 var n = [], r = "", i = 0;
 for (r in t)o.call(t, r) && (n[i] = e(r, t[r]), i += 1);
 return n
 }
 var o = Object.prototype.hasOwnProperty;
 e.exports = r
 }, {}],
 16 : [
 function(t, e, n) {
 function r(t, e, n) {
 e || ( e = 0), "undefined" == typeof n && ( n = t ? t.length : 0);
 for (var r = -1, o = n - e || 0, i = Array(0 > o ? 0 : o); ++r < o; )
 i[r] = t[e + r];
 return i
 }
 e.exports = r
 }, {}],
 17 : [
 function(t, e, n) {
 function r(t) {
 return !(t && "function" == typeof t && t.apply && !t[a])
 }
 var o = t("ee"), i = t(16), a = "nr@original", s = Object.prototype.hasOwnProperty, c = !1;
 e.exports = function(t) {
 function e(t, e, n, o) {
 function nrWrapper() {
 var r, a, s, c;
 try {
 a = this, r = i(arguments), s = "function" == typeof n ? n(r, a) : n || {}
 } catch(u) {
 d([u, "", [r, a, o], s])
 }
 f(e + "start", [r, a, o], s);
 try {
 return c = t.apply(a, r)
 } catch(l) {
 throw f(e + "err", [r, a, l], s), l
 } finally {
 f(e + "end", [r, a, c], s)
 }
 }
 return r(t) ? t : (e || ( e = ""), nrWrapper[a] = t, u(t, nrWrapper), nrWrapper)
 }
 function n(t, n, o, i) {
 o || ( o = "");
 var a, s, c, f = "-" === o.charAt(0);
 for ( c = 0; c < n.length; c++)
 s = n[c], a = t[s], r(a) || (t[s] = e(a, f ? s + o : o, i, s))
 }
 function f(e, n, r) {
 if (!c) {
 c = !0;
 try {
 t.emit(e, n, r)
 } catch(o) {
 d([o, e, n, r])
 }
 c = !1
 }
 }
 function u(t, e) {
 if (Object.defineProperty && Object.keys)
 try {
 var n = Object.keys(t);
 return n.forEach(function(n) {
 Object.defineProperty(e, n, {
 get : function() {
 return t[n]
 },
 set : function(e) {
 return t[n] = e, e
 }
 })
 }), e
 } catch(r) {
 d([r])
 }
 for (var o in t)s.call(t, o) && (e[o] = t[o]);
 return e
 }
 function d(e) {
 try {
 t.emit("internal-error", e)
 } catch(n) {
 }
 }
 return t || ( t = o), e.inPlace = n, e.flag = a, e
 }
 }, {}],
 ee : [
 function(t, e, n) {
 function r() {
 }
 function o(t) {
 function e(t) {
 return t && t instanceof r ? t : t ? s(t, a, i) : i()
 }
 function n(n, r, o) {
 t && t(n, r, o);
 for (var i = e(o), a = l(n), s = a.length, c = 0; s > c; c++)
 a[c].apply(i, r);
 var u = f[w[n]];
 return u && u.push([v, n, r, i]), i
 }
 function d(t, e) {
 m[t] = l(t).concat(e)
 }
 function l(t) {
 return m[t] || []
 }
 function p(t) {
 return u[t] = u[t] || o(n)
 }
 function h(t, e) {
 c(t, function(t, n) {
 e = e || "feature", w[n] = e, e in f || (f[e] = [])
 })
 }
 var m = {}, w = {}, v = {
 on : d,
 emit : n,
 get : p,
 listeners : l,
 context : e,
 buffer : h
 };
 return v
 }
 function i() {
 return new r
 }
 var a = "nr@context", s = t("gos"), c = t(15), f = {}, u = {}, d = e.exports = o();
 d.backlog = f
 }, {}],
 gos : [
 function(t, e, n) {
 function r(t, e, n) {
 if (o.call(t, e))
 return t[e];
 var r = n();
 if (Object.defineProperty && Object.keys)
 try {
 return Object.defineProperty(t, e, {
 value : r,
 writable : !0,
 enumerable : !1
 }), r
 } catch(i) {
 }
 return t[e] = r, r
 }
 var o = Object.prototype.hasOwnProperty;
 e.exports = r
 }, {}],
 handle : [
 function(t, e, n) {
 function r(t, e, n, r) {
 o.buffer([t], r), o.emit(t, e, n)
 }
 var o = t("ee").get("handle");
 e.exports = r, r.ee = o
 }, {}],
 id : [
 function(t, e, n) {
 function r(t) {
 var e = typeof t;
 return !t || "object" !== e && "function" !== e ? -1 : t === window ? 0 : a(t, i, function() {
 return o++
 })
 }
 var o = 1, i = "nr@id", a = t("gos");
 e.exports = r
 }, {}],
 loader : [
 function(t, e, n) {
 function r() {
 if (!g++) {
 var t = y.info = NREUM.info, e = u.getElementsByTagName("script")[0];
 if (t && t.licenseKey && t.applicationID && e) {
 c(w, function(e, n) {
 t[e] || (t[e] = n)
 });
 var n = "https" === m.split(":")[0] || t.sslForHttp;
 y.proto = n ? "https://" : "http://", s("mark", ["onload", a()], null, "api");
 var r = u.createElement("script");
 r.src = y.proto + t.agent, e.parentNode.insertBefore(r, e)
 }
 }
 }
 function o() {
 "complete" === u.readyState && i()
 }
 function i() {
 s("mark", ["domContent", a()], null, "api")
 }
 function a() {
 return (new Date).getTime()
 }
 var s = t("handle"), c = t(15), f = window, u = f.document, d = "addEventListener", l = "attachEvent", p = f.XMLHttpRequest, h = p && p.prototype;
 NREUM.o = {
 ST : setTimeout,
 CT : clearTimeout,
 XHR : p,
 REQ : f.Request,
 EV : f.Event,
 PR : f.Promise,
 MO : f.MutationObserver
 }, t(12);
 var m = "" + location, w = {
 beacon : "bam.nr-data.net",
 errorBeacon : "bam.nr-data.net",
 agent : "js-agent.newrelic.com/nr-952.min.js"
 }, v = p && h && h[d] && !/CriOS/.test(navigator.userAgent), y = e.exports = {
 offset : a(),
 origin : m,
 features : {},
 xhrWrappable : v
 };
 u[d] ? (u[d]("DOMContentLoaded", i, !1), f[d]("load", r, !1)) : (u[l]("onreadystatechange", o), f[l]("onload", r)), s("mark", ["firstbyte", a()], null, "api");
 var g = 0
 }, {}]
 }, {}, ["loader", 2, 10, 4, 3]);
 </script><link href="https://www.justice.org/node/91597" rel="shortlink"><link href="/sites/all/themes/justice/linked/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon"><link href="https://www.justice.org/contribute-to-the-cause/evergreen-fund" rel="canonical"><meta content="The civil justice system is designed to give Americans a voice to obtain justice when injured by the negligence or misconduct of others. When big business delays claims, produces unsafe products, pollutes the environment, we must hold them accountable." name="description"><meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"><meta content="https://www.justice.org/sites/all/themes/justice/img/logo.png" property="og:image"><meta content="Drupal 7 (http://drupal.org)" name="generator"><title><?php print $head_title; ?></title><link href="/sites/all/themes/justice/css/font-awesome.min.css" rel="stylesheet"><link href="/sites/all/themes/justice/css/91e12affee6723c4619c1f22b9a88fc8.css" media="all" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/67c4ebd2bd23b661c3982e3111da51d9.css" media="all" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/1cff53b547455c90b95bb1ef51a58768.css" media="all" rel="stylesheet" type="text/css"><!--[if lt IE 10]>
 <link type="text/css" rel="stylesheet" href="/sites/all/themes/justice/css/60ca8fa8dbcdfc48829840a3050347c5.css" media="all" />
 <![endif]--><link href="/sites/all/themes/justice/css/72231bc83b5cdc3e5e1d082e8b81f6d6.css" media="all" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/067c3e154341f85a2d835272163078e5.css" media="all" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/99c75c1c173ee98ae5ee8e72833850c6.css" media="screen and (max-width: 480px)" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/c760daedb32ae38a2c4bc57306535362.css" media="print" rel="stylesheet" type="text/css"><link href="/sites/all/themes/justice/css/css" media="all" rel="stylesheet" type="text/css"><script src="/sites/all/themes/justice/js/jquery.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.once.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.ui.core.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.ui.widget.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/drupal.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.ui.accordion.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.ui.tabs.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery_ui_filter.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/admin_devel.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/apachesolr_sort.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/simpleads.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/simpleads_campaigns.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery_ui_filter_accordion.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery_ui_filter_tabs.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/extlink.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/views_slideshow.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/vlx3kmk.js" type="text/javascript"></script><script type="text/javascript">
 <!--//--><![CDATA[//><!--
 try {
 Typekit.load();
 } catch(e) {
 }
 //--><!]]>
 </script><script src="/sites/all/themes/justice/js/jquery.hoverIntent.minified.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/sftouchscreen.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/superfish.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/5768096602d08.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.easing.1.3.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.cycle2.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.cycle2.carousel.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.cycle2.swipe.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/imagesloaded.pkgd.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.masonry.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.vgrid.min.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.easyListSplitter.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/jquery.simplemodal-1.4.4.js" type="text/javascript"></script><script src="/sites/all/themes/justice/js/scripts.js" type="text/javascript"></script><script type="text/javascript">
 <!--//--><![CDATA[//><!--
 jQuery.extend(Drupal.settings, {
 "basePath" : "\/",
 "pathPrefix" : "",
 "ajaxPageState" : {
 "theme" : "justice",
 "theme_token" : "xW0jrBIMUrcImo20J2xKQI2qr3RqC1GMqUHC3DAcncs",
 "js" : {
 "sites\/all\/modules\/jquery_update\/replace\/jquery\/1.7\/jquery.min.js" : 1,
 "misc\/jquery.once.js" : 1,
 "sites\/all\/modules\/jquery_update\/replace\/ui\/ui\/minified\/jquery.ui.core.min.js" : 1,
 "sites\/all\/modules\/jquery_update\/replace\/ui\/ui\/minified\/jquery.ui.widget.min.js" : 1,
 "misc\/drupal.js" : 1,
 "sites\/all\/modules\/jquery_update\/replace\/ui\/ui\/minified\/jquery.ui.accordion.min.js" : 1,
 "sites\/all\/modules\/jquery_update\/replace\/ui\/ui\/minified\/jquery.ui.tabs.min.js" : 1,
 "sites\/all\/modules\/jquery_ui_filter\/jquery_ui_filter.js" : 1,
 "sites\/all\/modules\/admin_menu\/admin_devel\/admin_devel.js" : 1,
 "sites\/all\/modules\/apachesolr_sort\/apachesolr_sort.js" : 1,
 "sites\/all\/modules\/simpleads\/simpleads.js" : 1,
 "sites\/all\/modules\/simpleads\/modules\/simpleads_campaigns\/simpleads_campaigns.js" : 1,
 "sites\/all\/modules\/jquery_ui_filter\/accordion\/jquery_ui_filter_accordion.js" : 1,
 "sites\/all\/modules\/jquery_ui_filter\/tabs\/jquery_ui_filter_tabs.js" : 1,
 "sites\/all\/modules\/extlink\/extlink.js" : 1,
 "sites\/all\/modules\/views_slideshow\/js\/views_slideshow.js" : 1,
 "sites\/all\/modules\/google_analytics\/googleanalytics.js" : 1,
 "0" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.easing.1.3.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.cycle2.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.cycle2.carousel.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.cycle2.swipe.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/imagesloaded.pkgd.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.masonry.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.vgrid.min.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.easyListSplitter.js" : 1,
 "sites\/all\/themes\/Justice\/js\/jquery.simplemodal-1.4.4.js" : 1,
 "sites\/all\/themes\/Justice\/js\/scripts.js" : 1,
 "1" : 1,
 "https:\/\/use.typekit.com\/vlx3kmk.js" : 1,
 "2" : 1,
 "sites\/all\/libraries\/superfish\/jquery.hoverIntent.minified.js" : 1,
 "sites\/all\/libraries\/superfish\/sftouchscreen.js" : 1,
 "sites\/all\/libraries\/superfish\/superfish.js" : 1,
 "sites\/all\/modules\/superfish\/superfish.js" : 1
 },
 "css" : {
 "misc\/ui\/jquery.ui.core.css" : 1,
 "misc\/ui\/jquery.ui.theme.css" : 1,
 "modules\/system\/system.base.css" : 1,
 "modules\/system\/system.menus.css" : 1,
 "modules\/system\/system.messages.css" : 1,
 "modules\/system\/system.theme.css" : 1,
 "misc\/ui\/jquery.ui.accordion.css" : 1,
 "misc\/ui\/jquery.ui.tabs.css" : 1,
 "sites\/all\/modules\/calendar\/css\/calendar_multiday.css" : 1,
 "modules\/comment\/comment.css" : 1,
 "sites\/all\/modules\/date\/date_api\/date.css" : 1,
 "sites\/all\/modules\/date\/date_popup\/themes\/datepicker.1.7.css" : 1,
 "modules\/field\/theme\/field.css" : 1,
 "modules\/node\/node.css" : 1,
 "modules\/search\/search.css" : 1,
 "sites\/all\/modules\/simpleads\/simpleads.css" : 1,
 "modules\/user\/user.css" : 1,
 "sites\/all\/modules\/extlink\/extlink.css" : 1,
 "sites\/all\/modules\/views\/css\/views.css" : 1,
 "sites\/all\/modules\/ckeditor\/css\/ckeditor.css" : 1,
 "sites\/all\/themes\/bwm_njord\/css\/tabs.css" : 1,
 "sites\/all\/modules\/ctools\/css\/ctools.css" : 1,
 "sites\/all\/modules\/views_slideshow\/views_slideshow.css" : 1,
 "public:\/\/ctools\/css\/d41d8cd98f00b204e9800998ecf8427e.css" : 1,
 "sites\/all\/libraries\/superfish\/css\/superfish.css" : 1,
 "sites\/all\/themes\/Justice\/css\/normalize.css" : 1,
 "sites\/all\/themes\/Justice\/css\/default.css" : 1,
 "sites\/all\/themes\/Justice\/css\/tabs.css" : 1,
 "sites\/all\/themes\/Justice\/css\/layout.css" : 1,
 "sites\/all\/themes\/Justice\/css\/style.css" : 1,
 "sites\/all\/themes\/Justice\/css\/mobile.css" : 1,
 "sites\/all\/themes\/Justice\/css\/print.css" : 1,
 "https:\/\/fonts.googleapis.com\/css?family=Open+Sans:300\u0026subset=latin" : 1
 }
 },
 "jQueryUiFilter" : {
 "disabled" : 0,
 "accordionHeaderTag" : "h3",
 "accordionOptions" : {
 "active" : 0,
 "animated" : "slide",
 "autoHeight" : "false",
 "clearStyle" : "false",
 "collapsible" : "true",
 "event" : "click",
 "scrollTo" : 0,
 "history" : "false"
 },
 "tabsOptions" : {
 "collapsible" : "false",
 "event" : "click",
 "fx" : 0,
 "paging" : {
 "back" : "\u0026laquo; Previous",
 "next" : "Next \u0026raquo;"
 },
 "selected" : "",
 "scrollTo" : 0,
 "history" : "false"
 },
 "tabsHeaderTag" : "h3"
 },
 "simpleads" : {
 "url" : {
 "ckeditor" : "\/simpleads\/dashboard\/ckeditor"
 },
 "modulepath" : "sites\/all\/modules\/simpleads"
 },
 "extlink" : {
 "extTarget" : "_blank",
 "extClass" : 0,
 "extSubdomains" : 1,
 "extExclude" : "",
 "extInclude" : "",
 "extCssExclude" : "",
 "extCssExplicit" : "",
 "extAlert" : 0,
 "extAlertText" : "This link will take you to an external web site. We are not responsible for their content.",
 "mailtoClass" : 0
 },
 "googleanalytics" : {
 "trackOutbound" : 1,
 "trackMailto" : 1,
 "trackDownload" : 1,
 "trackDownloadExtensions" : "7z|aac|arc|arj|asf|asx|avi|bin|csv|doc(x|m)?|dot(x|m)?|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt(x|m)?|pot(x|m)?|pps(x|m)?|ppam|sld(x|m)?|thmx|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls(x|m|b)?|xlt(x|m)|xlam|xml|z|zip",
 "trackUrlFragments" : 1
 },
 "urlIsAjaxTrusted" : {
 "\/contribute-to-the-cause\/evergreen-fund" : true
 },
 "superfish" : {
 "1" : {
 "id" : "1",
 "sf" : {
 "delay" : "400",
 "animation" : {
 "opacity" : "show"
 },
 "speed" : 200,
 "autoArrows" : false,
 "dropShadows" : false,
 "disableHI" : false
 },
 "plugins" : {
 "touchscreen" : {
 "mode" : "window_width"
 },
 "supposition" : false,
 "bgiframe" : false
 }
 }
 }
 });
 //--><!]]>
 </script><!--[if lt IE 9]>
 <script src="/sites/all/themes/justice/js/html5shiv.js"></script>
 <![endif]--><!-- Icons --><meta content="width=device-width, initial-scale=1" name="viewport"><link href="/sites/all/themes/Justice/images/favicon.ico" rel="shortcut icon" type="image/x-icon"><link href="/sites/all/themes/Justice/images/favicon-touch.png" rel="apple-touch-icon"><meta content="American Association for Justice" name="application-name"><meta content="#4c8fcd" name="msapplication-TileColor"><meta content="/sites/all/themes/Justice/images/favicon.png" name="msapplication-TileImage"><script src="/sites/all/themes/justice/js/js"></script><script src="https://jquery-ui.googlecode.com/svn/tags/latest/ui/jquery.effects.core.js"></script><script src="https://jquery-ui.googlecode.com/svn/tags/latest/ui/jquery.effects.slide.js"></script><script src="/sites/all/themes/justice/js/slideout.js"></script><script>
 window.onload = function() {
 var slideout = new Slideout({
 'panel' : document.getElementById('content-inner'),
 'menu' : document.getElementById('sidebar-first'),
 'side' : 'left'
 });
 document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
 slideout.toggle();
 });
 document.querySelector('.slideout-menu').addEventListener('click', function(eve) {
 if (eve.target.nodeName === 'A') {
 slideout.close();
 }
 });
 };
 </script><!-- Run this just only on upadte profile page --><!-- End Run this just only on update profile page --><link href="/sites/all/themes/justice/linked/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57"><link href="/sites/all/themes/justice/linked/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72"><link href="/sites/all/themes/justice/linked/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114"><link href="/sites/all/themes/justice/linked/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
<?php
print $head;
print $styles;
print $scripts;
?>
<!--[if IE 7]>
<link rel="stylesheet" href="/sites/all/themes/pgcalc_master/ie7/ie7.css">
<![endif]-->
</head>
<?php
print $page_top;
print $page;
print $page_bottom;
?>
</html>
