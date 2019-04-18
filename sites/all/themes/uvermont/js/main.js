/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=3e94a5616b1e1291015f)
 * Config saved to config.json and https://gist.github.com/3e94a5616b1e1291015f
 */
if ("undefined" == typeof jQuery)
	throw new Error("Bootstrap's JavaScript requires jQuery");
+ function(t) {
	var e = t.fn.jquery.split(" ")[0].split(".");
	if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1)
		throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {"use strict";
	function e(e) {
		return this.each(function() {
			var o = t(this), s = o.data("bs.button"), n = "object" == typeof e && e;
			s || o.data("bs.button", s = new i(this, n)), "toggle" == e ? s.toggle() : e && s.setState(e)
		})
	}

	var i = function(e, o) {
		this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
	};
	i.VERSION = "3.3.1", i.DEFAULTS = {
		loadingText : "loading..."
	}, i.prototype.setState = function(e) {
		var i = "disabled", o = this.$element, s = o.is("input") ? "val" : "html", n = o.data();
		e += "Text", null == n.resetText && o.data("resetText", o[s]()), setTimeout(t.proxy(function() {
			o[s](null == n[e] ? this.options[e] : n[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
		}, this), 0)
	}, i.prototype.toggle = function() {
		var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
		if (e.length) {
			var i = this.$element.find("input");
			"radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
		} else
			this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
		t && this.$element.toggleClass("active")
	};
	var o = t.fn.button;
	t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
		return t.fn.button = o, this
	}, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
		var o = t(i.target);
		o.hasClass("btn") || ( o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault()
	}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
		t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
	})
}(jQuery), + function(t) {"use strict";
	function e(e, o) {
		return this.each(function() {
			var s = t(this), n = s.data("bs.modal"), r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
			n || s.data("bs.modal", n = new i(this, r)), "string" == typeof e ? n[e](o) : r.show && n.show(o)
		})
	}

	var i = function(e, i) {
		this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
			this.$element.trigger("loaded.bs.modal")
		}, this))
	};
	i.VERSION = "3.3.1", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
		backdrop : !0,
		keyboard : !0,
		show : !0
	}, i.prototype.toggle = function(t) {
		return this.isShown ? this.hide() : this.show(t)
	}, i.prototype.show = function(e) {
		var o = this, s = t.Event("show.bs.modal", {
			relatedTarget : e
		});
		this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
			var s = t.support.transition && o.$element.hasClass("fade");
			o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.options.backdrop && o.adjustBackdrop(), o.adjustDialog(), s && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
			var n = t.Event("shown.bs.modal", {
				relatedTarget : e
			});
			s ? o.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
				o.$element.trigger("focus").trigger(n)
			}).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(n)
		}))
	}, i.prototype.hide = function(e) {
		e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
	}, i.prototype.enforceFocus = function() {
		t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
			this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
		}, this))
	}, i.prototype.escape = function() {
		this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
			27 == t.which && this.hide()
		}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
	}, i.prototype.resize = function() {
		this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
	}, i.prototype.hideModal = function() {
		var t = this;
		this.$element.hide(), this.backdrop(function() {
			t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
		})
	}, i.prototype.removeBackdrop = function() {
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, i.prototype.backdrop = function(e) {
		var o = this, s = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var n = t.support.transition && s;
			if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function(t) {
					t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
				}, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)
				return;
			n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
		} else if (!this.isShown && this.$backdrop) {
			this.$backdrop.removeClass("in");
			var r = function() {
				o.removeBackdrop(), e && e()
			};
			t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
		} else
			e && e()
	}, i.prototype.handleUpdate = function() {
		this.options.backdrop && this.adjustBackdrop(), this.adjustDialog()
	}, i.prototype.adjustBackdrop = function() {
		this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
	}, i.prototype.adjustDialog = function() {
		var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
		this.$element.css({
			paddingLeft : !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
			paddingRight : this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
		})
	}, i.prototype.resetAdjustments = function() {
		this.$element.css({
			paddingLeft : "",
			paddingRight : ""
		})
	}, i.prototype.checkScrollbar = function() {
		this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar()
	}, i.prototype.setScrollbar = function() {
		var t = parseInt(this.$body.css("padding-right") || 0, 10);
		this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
	}, i.prototype.resetScrollbar = function() {
		this.$body.css("padding-right", "")
	}, i.prototype.measureScrollbar = function() {
		var t = document.createElement("div");
		t.className = "modal-scrollbar-measure", this.$body.append(t);
		var e = t.offsetWidth - t.clientWidth;
		return this.$body[0].removeChild(t), e
	};
	var o = t.fn.modal;
	t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
		return t.fn.modal = o, this
	}, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
		var o = t(this), s = o.attr("href"), n = t(o.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")), r = n.data("bs.modal") ? "toggle" : t.extend({
			remote : !/#/.test(s) && s
		}, n.data(), o.data());
		o.is("a") && i.preventDefault(), n.one("show.bs.modal", function(t) {
			t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
				o.is(":visible") && o.trigger("focus")
			})
		}), e.call(n, r, this)
	})
}(jQuery), + function(t) {"use strict";
	function e(e) {
		return this.each(function() {
			var o = t(this), s = o.data("bs.tooltip"), n = "object" == typeof e && e, r = n && n.selector;
			(s || "destroy" != e) && ( r ? (s || o.data("bs.tooltip", s = {}), s[r] || (s[r] = new i(this, n))) : s || o.data("bs.tooltip", s = new i(this, n)), "string" == typeof e && s[e]())
		})
	}

	var i = function(t, e) {
		this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
	};
	i.VERSION = "3.3.1", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
		animation : !0,
		placement : "top",
		selector : !1,
		template : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger : "hover focus",
		title : "",
		delay : 0,
		html : !1,
		container : !1,
		viewport : {
			selector : "body",
			padding : 0
		}
	}, i.prototype.init = function(e, i, o) {
		this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
		for (var s = this.options.trigger.split(" "), n = s.length; n--; ) {
			var r = s[n];
			if ("click" == r)
				this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
			else if ("manual" != r) {
				var a = "hover" == r ? "mouseenter" : "focusin", l = "hover" == r ? "mouseleave" : "focusout";
				this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
			}
		}
		this.options.selector ? this._options = t.extend({}, this.options, {
			trigger : "manual",
			selector : ""
		}) : this.fixTitle()
	}, i.prototype.getDefaults = function() {
		return i.DEFAULTS
	}, i.prototype.getOptions = function(e) {
		return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
			show : e.delay,
			hide : e.delay
		}), e
	}, i.prototype.getDelegateOptions = function() {
		var e = {}, i = this.getDefaults();
		return this._options && t.each(this._options, function(t, o) {
			i[t] != o && (e[t] = o)
		}), e
	}, i.prototype.enter = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
		return i && i.$tip && i.$tip.is(":visible") ?
		void (i.hoverState = "in") : (i || ( i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ?
		void (i.timeout = setTimeout(function() {
			"in" == i.hoverState && i.show()
		}, i.options.delay.show)) : i.show())
	}, i.prototype.leave = function(e) {
		var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
		return i || ( i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ?
		void (i.timeout = setTimeout(function() {
			"out" == i.hoverState && i.hide()
		}, i.options.delay.hide)) : i.hide()
	}, i.prototype.show = function() {
		var e = t.Event("show.bs." + this.type);
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(e);
			var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
			if (e.isDefaultPrevented() || !o)
				return;
			var s = this, n = this.tip(), r = this.getUID(this.type);
			this.setContent(), n.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && n.addClass("fade");
			var a = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(a);
			h && ( a = a.replace(l, "") || "top"), n.detach().css({
				top : 0,
				left : 0,
				display : "block"
			}).addClass(a).data("bs." + this.type, this), this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
			var p = this.getPosition(), d = n[0].offsetWidth, c = n[0].offsetHeight;
			if (h) {
				var f = a, u = this.options.container ? t(this.options.container) : this.$element.parent(), g = this.getPosition(u);
				a = "bottom" == a && p.bottom + c > g.bottom ? "top" : "top" == a && p.top - c < g.top ? "bottom" : "right" == a && p.right + d > g.width ? "left" : "left" == a && p.left - d < g.left ? "right" : a, n.removeClass(f).addClass(a)
			}
			var m = this.getCalculatedOffset(a, p, d, c);
			this.applyPlacement(m, a);
			var v = function() {
				var t = s.hoverState;
				s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
			};
			t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
		}
	}, i.prototype.applyPlacement = function(e, i) {
		var o = this.tip(), s = o[0].offsetWidth, n = o[0].offsetHeight, r = parseInt(o.css("margin-top"), 10), a = parseInt(o.css("margin-left"), 10);
		isNaN(r) && ( r = 0), isNaN(a) && ( a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(o[0], t.extend({
			using : function(t) {
				o.css({
					top : Math.round(t.top),
					left : Math.round(t.left)
				})
			}
		}, e), 0), o.addClass("in");
		var l = o[0].offsetWidth, h = o[0].offsetHeight;
		"top" == i && h != n && (e.top = e.top + n - h);
		var p = this.getViewportAdjustedDelta(i, e, l, h);
		p.left ? e.left += p.left : e.top += p.top;
		var d = /top|bottom/.test(i), c = d ? 2 * p.left - s + l : 2 * p.top - n + h, f = d ? "offsetWidth" : "offsetHeight";
		o.offset(e), this.replaceArrow(c, o[0][f], d)
	}, i.prototype.replaceArrow = function(t, e, i) {
		this.arrow().css( i ? "left" : "top", 50 * (1 - t / e) + "%").css( i ? "top" : "left", "")
	}, i.prototype.setContent = function() {
		var t = this.tip(), e = this.getTitle();
		t.find(".tooltip-inner")[this.options.html?"html":"text"](e), t.removeClass("fade in top bottom left right")
	}, i.prototype.hide = function(e) {
		function o() {
			"in" != s.hoverState && n.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e()
		}

		var s = this, n = this.tip(), r = t.Event("hide.bs." + this.type);
		return this.$element.trigger(r), r.isDefaultPrevented() ?
		void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this)
	}, i.prototype.fixTitle = function() {
		var t = this.$element;
		(t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
	}, i.prototype.hasContent = function() {
		return this.getTitle()
	}, i.prototype.getPosition = function(e) {
		e = e || this.$element;
		var i = e[0], o = "BODY" == i.tagName, s = i.getBoundingClientRect();
		null == s.width && ( s = t.extend({}, s, {
			width : s.right - s.left,
			height : s.bottom - s.top
		}));
		var n = o ? {
			top : 0,
			left : 0
		} : e.offset(), r = {
			scroll : o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
		}, a = o ? {
			width : t(window).width(),
			height : t(window).height()
		} : null;
		return t.extend({}, s, r, a, n)
	}, i.prototype.getCalculatedOffset = function(t, e, i, o) {
		return "bottom" == t ? {
			top : e.top + e.height,
			left : e.left + e.width / 2 - i / 2
		} : "top" == t ? {
			top : e.top - o,
			left : e.left + e.width / 2 - i / 2
		} : "left" == t ? {
			top : e.top + e.height / 2 - o / 2,
			left : e.left - i
		} : {
			top : e.top + e.height / 2 - o / 2,
			left : e.left + e.width
		}
	}, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
		var s = {
			top : 0,
			left : 0
		};
		if (!this.$viewport)
			return s;
		var n = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
		if (/right|left/.test(t)) {
			var a = e.top - n - r.scroll, l = e.top + n - r.scroll + o;
			a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
		} else {
			var h = e.left - n, p = e.left + n + i;
			h < r.left ? s.left = r.left - h : p > r.width && (s.left = r.left + r.width - p)
		}
		return s
	}, i.prototype.getTitle = function() {
		var t, e = this.$element, i = this.options;
		return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
	}, i.prototype.getUID = function(t) {
		do
			t += ~~(1e6 * Math.random());
		while(document.getElementById(t));
		return t
	}, i.prototype.tip = function() {
		return this.$tip = this.$tip || t(this.options.template)
	}, i.prototype.arrow = function() {
		return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
	}, i.prototype.enable = function() {
		this.enabled = !0
	}, i.prototype.disable = function() {
		this.enabled = !1
	}, i.prototype.toggleEnabled = function() {
		this.enabled = !this.enabled
	}, i.prototype.toggle = function(e) {
		var i = this;
		e && ( i = t(e.currentTarget).data("bs." + this.type), i || ( i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
	}, i.prototype.destroy = function() {
		var t = this;
		clearTimeout(this.timeout), this.hide(function() {
			t.$element.off("." + t.type).removeData("bs." + t.type)
		})
	};
	var o = t.fn.tooltip;
	t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
		return t.fn.tooltip = o, this
	}
}(jQuery), + function(t) {"use strict";
	function e(e) {
		var i, o = e.attr("data-target") || ( i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
		return t(o)
	}

	function i(e) {
		return this.each(function() {
			var i = t(this), s = i.data("bs.collapse"), n = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
			!s && n.toggle && "show" == e && (n.toggle = !1), s || i.data("bs.collapse", s = new o(this, n)), "string" == typeof e && s[e]()
		})
	}

	var o = function(e, i) {
		this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
	};
	o.VERSION = "3.3.1", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
		toggle : !0,
		trigger : '[data-toggle="collapse"]'
	}, o.prototype.dimension = function() {
		var t = this.$element.hasClass("width");
		return t ? "width" : "height"
	}, o.prototype.show = function() {
		if (!this.transitioning && !this.$element.hasClass("in")) {
			var e, s = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
			if (!(s && s.length && ( e = s.data("bs.collapse"), e && e.transitioning))) {
				var n = t.Event("show.bs.collapse");
				if (this.$element.trigger(n), !n.isDefaultPrevented()) {
					s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
					var r = this.dimension();
					this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
					var a = function() {
						this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
					};
					if (!t.support.transition)
						return a.call(this);
					var l = t.camelCase(["scroll", r].join("-"));
					this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
				}
			}
		}
	}, o.prototype.hide = function() {
		if (!this.transitioning && this.$element.hasClass("in")) {
			var e = t.Event("hide.bs.collapse");
			if (this.$element.trigger(e), !e.isDefaultPrevented()) {
				var i = this.dimension();
				this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
				var s = function() {
					this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
				};
				return t.support.transition ?
				void  this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : s.call(this)
			}
		}
	}, o.prototype.toggle = function() {
		this[this.$element.hasClass("in")?"hide":"show"]()
	}, o.prototype.getParent = function() {
		return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
			var s = t(o);
			this.addAriaAndCollapsedClass(e(s), s)
		}, this)).end()
	}, o.prototype.addAriaAndCollapsedClass = function(t, e) {
		var i = t.hasClass("in");
		t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
	};
	var s = t.fn.collapse;
	t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
		return t.fn.collapse = s, this
	}, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
		var s = t(this);
		s.attr("data-target") || o.preventDefault();
		var n = e(s), r = n.data("bs.collapse"), a = r ? "toggle" : t.extend({}, s.data(), {
			trigger : this
		});
		i.call(n, a)
	})
}(jQuery), + function(t) {"use strict";
	function e(i, o) {
		var s = t.proxy(this.process, this);
		this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", s), this.refresh(), this.process()
	}

	function i(i) {
		return this.each(function() {
			var o = t(this), s = o.data("bs.scrollspy"), n = "object" == typeof i && i;
			s || o.data("bs.scrollspy", s = new e(this, n)), "string" == typeof i && s[i]()
		})
	}
	e.VERSION = "3.3.1", e.DEFAULTS = {
		offset : 10
	}, e.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	}, e.prototype.refresh = function() {
		var e = "offset", i = 0;
		t.isWindow(this.$scrollElement[0]) || ( e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
		var o = this;
		this.$body.find(this.selector).map(function() {
			var o = t(this), s = o.data("target") || o.attr("href"), n = /^#./.test(s) && t(s);
			return n && n.length && n.is(":visible") && [[n[e]().top + i, s]] || null
		}).sort(function(t, e) {
			return t[0] - e[0]
		}).each(function() {
			o.offsets.push(this[0]), o.targets.push(this[1])
		})
	}, e.prototype.process = function() {
		var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, n = this.targets, r = this.activeTarget;
		if (this.scrollHeight != i && this.refresh(), e >= o)
			return r != ( t = n[n.length - 1]) && this.activate(t);
		if (r && e < s[0])
			return this.activeTarget = null, this.clear();
		for ( t = s.length; t--; )
			r != n[t] && e >= s[t] && (!s[t + 1] || e <= s[t + 1]) && this.activate(n[t])
	}, e.prototype.activate = function(e) {
		this.activeTarget = e, this.clear();
		var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
		o.parent(".dropdown-menu").length && ( o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
	}, e.prototype.clear = function() {
		t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
	};
	var o = t.fn.scrollspy;
	t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
		return t.fn.scrollspy = o, this
	}, t(window).on("load.bs.scrollspy.data-api", function() {
		t('[data-spy="scroll"]').each(function() {
			var e = t(this);
			i.call(e, e.data())
		})
	})
}(jQuery), + function(t) {"use strict";
	function e() {
		var t = document.createElement("bootstrap"), e = {
			WebkitTransition : "webkitTransitionEnd",
			MozTransition : "transitionend",
			OTransition : "oTransitionEnd otransitionend",
			transition : "transitionend"
		};
		for (var i in e)
		if (
			void 0 !== t.style[i])
			return {
				end : e[i]
			};
		return !1
	}
	t.fn.emulateTransitionEnd = function(e) {
		var i = !1, o = this;
		t(this).one("bsTransitionEnd", function() {
			i = !0
		});
		var s = function() {
			i || t(o).trigger(t.support.transition.end)
		};
		return setTimeout(s, e), this
	}, t(function() {
		t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
			bindType : t.support.transition.end,
			delegateType : t.support.transition.end,
			handle : function(e) {
				return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) :
				void 0
			}
		})
	})
}(jQuery), /**
 * BxSlider v4.1 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2012, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */
function(e) {
	var t = {}, n = {
		mode : "horizontal",
		slideSelector : "",
		infiniteLoop : !0,
		hideControlOnEnd : !1,
		speed : 500,
		easing : null,
		slideMargin : 0,
		startSlide : 0,
		randomStart : !1,
		captions : !1,
		ticker : !1,
		tickerHover : !1,
		adaptiveHeight : !1,
		adaptiveHeightSpeed : 500,
		video : !1,
		useCSS : !0,
		preloadImages : "visible",
		touchEnabled : !0,
		swipeThreshold : 50,
		oneToOneTouch : !0,
		preventDefaultSwipeX : !0,
		preventDefaultSwipeY : !1,
		pager : !0,
		pagerType : "full",
		pagerShortSeparator : " / ",
		pagerSelector : null,
		buildPager : null,
		pagerCustom : null,
		controls : !0,
		nextText : "Next",
		prevText : "Prev",
		nextSelector : null,
		prevSelector : null,
		autoControls : !1,
		startText : "Start",
		stopText : "Stop",
		autoControlsCombine : !1,
		autoControlsSelector : null,
		auto : !1,
		pause : 4e3,
		autoStart : !0,
		autoDirection : "next",
		autoHover : !1,
		autoDelay : 0,
		minSlides : 1,
		maxSlides : 1,
		moveSlides : 0,
		slideWidth : 0,
		onSliderLoad : function() {
		},
		onSlideBefore : function() {
		},
		onSlideAfter : function() {
		},
		onSlideNext : function() {
		},
		onSlidePrev : function() {
		}
	};
	e.fn.bxSlider = function(s) {
		if (0 != this.length) {
			if (this.length > 1)
				return this.each(function() {
					e(this).bxSlider(s)
				}), this;
			var o = {}, r = this;
			t.el = this;
			var a = e(window).width(), l = e(window).height(), d = function() {
				o.settings = e.extend({}, n, s), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {
					index : o.settings.startSlide
				}, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function() {
					var e = document.createElement("div"), t = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
					for (var i in t)
					if (
						void 0 !== e.style[t[i]])
						return o.cssPrefix = t[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
					return !1
				}(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), c()
			}, c = function() {
				if (r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = e('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({
					width : "horizontal" == o.settings.mode ? 215 * o.children.length + "%" : "auto",
					position : "relative"
				}), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), v(), o.viewport.css({
					width : "100%",
					overflow : "hidden",
					position : "relative"
				}), o.viewport.parent().css({
					maxWidth : u()
				}), o.children.css({
					"float" : "horizontal" == o.settings.mode ? "left" : "none",
					listStyle : "none",
					position : "relative"
				}), o.children.width(p()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({
					position : "absolute",
					zIndex : 0,
					display : "none"
				}), o.children.eq(o.settings.startSlide).css({
					zIndex : 50,
					display : "block"
				})), o.controls.el = e('<div class="bx-controls" />'), o.settings.captions && E(), o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
					var t = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, t).clone().addClass("bx-clone"), n = o.children.slice(-t).clone().addClass("bx-clone");
					r.append(i).prepend(n)
				}
				o.active.last = o.settings.startSlide == f() - 1, o.settings.video && r.fitVids();
				var s = o.children.eq(o.settings.startSlide);
				"all" == o.settings.preloadImages && ( s = r.children()), o.settings.ticker || (o.settings.pager && w(), o.settings.controls && T(), o.settings.auto && o.settings.autoControls && C(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), s.imagesLoaded(g)
			}, g = function() {
				o.loader.remove(), x(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(h()), r.updateDimensions(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, e(window).bind("resize", X), o.settings.auto && o.settings.autoStart && L(), o.settings.ticker && W(), o.settings.pager && M(o.settings.startSlide), o.settings.controls && q(), o.settings.touchEnabled && !o.settings.ticker && O()
			}, h = function() {
				var t = 0, n = e();
				if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
					if (o.carousel) {
						var s = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
						for ( n = o.children.eq(s), i = 1; o.settings.maxSlides - 1 >= i; i++)
							n = s + i >= o.children.length ? n.add(o.children.eq(i - 1)) : n.add(o.children.eq(s + i))
					} else
						n = o.children.eq(o.active.index);
				else
					n = o.children;
				return "vertical" == o.settings.mode ? (n.each(function() {
					t += e(this).outerHeight()
				}), o.settings.slideMargin > 0 && (t += o.settings.slideMargin * (o.settings.minSlides - 1))) : t = Math.max.apply(Math, n.map(function() {
					return e(this).outerHeight(!1)
				}).get()), t
			}, u = function() {
				var e = "100%";
				return o.settings.slideWidth > 0 && ( e = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), e
			}, p = function() {
				var e = o.settings.slideWidth, t = o.viewport.width();
				return 0 == o.settings.slideWidth || o.settings.slideWidth > t && !o.carousel || "vertical" == o.settings.mode ? e = t : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (t > o.maxThreshold || o.minThreshold > t && ( e = (t - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), e
			}, v = function() {
				var e = 1;
				if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
					if (o.viewport.width() < o.minThreshold)
						e = o.settings.minSlides;
					else if (o.viewport.width() > o.maxThreshold)
						e = o.settings.maxSlides;
					else {
						var t = o.children.first().width();
						e = Math.floor(o.viewport.width() / t)
					}
				else
					"vertical" == o.settings.mode && ( e = o.settings.minSlides);
				return e
			}, f = function() {
				var e = 0;
				if (o.settings.moveSlides > 0)
					if (o.settings.infiniteLoop)
						e = o.children.length / m();
					else
						for (var t = 0, i = 0; o.children.length > t; )
							++e, t = i + v(), i += o.settings.moveSlides <= v() ? o.settings.moveSlides : v();
				else
					e = Math.ceil(o.children.length / v());
				return e
			}, m = function() {
				return o.settings.moveSlides > 0 && o.settings.moveSlides <= v() ? o.settings.moveSlides : v()
			}, x = function() {
				if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
					if ("horizontal" == o.settings.mode) {
						var e = o.children.last(), t = e.position();
						S(-(t.left - (o.viewport.width() - e.width())), "reset", 0)
					} else if ("vertical" == o.settings.mode) {
						var i = o.children.length - o.settings.minSlides, t = o.children.eq(i).position();
						S(-t.top, "reset", 0)
					}
				} else {
					var t = o.children.eq(o.active.index * m()).position();
					o.active.index == f() - 1 && (o.active.last = !0),
					void 0 != t && ("horizontal" == o.settings.mode ? S(-t.left, "reset", 0) : "vertical" == o.settings.mode && S(-t.top, "reset", 0))
				}
			}, S = function(e, t, i, n) {
				if (o.usingCSS) {
					var s = "vertical" == o.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)";
					r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == t ? (r.css(o.animProp, s), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
						r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
					})) : "reset" == t ? r.css(o.animProp, s) : "ticker" == t && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, s), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
						r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), S(n.resetValue, "reset", 0), H()
					}))
				} else {
					var a = {};
					a[o.animProp] = e, "slide" == t ? r.animate(a, i, o.settings.easing, function() {
						D()
					}) : "reset" == t ? r.css(o.animProp, e) : "ticker" == t && r.animate(a, speed, "linear", function() {
						S(n.resetValue, "reset", 0), H()
					})
				}
			}, b = function() {
				var t = "";
				pagerQty = f();
				for (var i = 0; pagerQty > i; i++) {
					var n = "";
					o.settings.buildPager && e.isFunction(o.settings.buildPager) ? ( n = o.settings.buildPager(i), o.pagerEl.addClass("bx-custom-pager")) : ( n = i + 1, o.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + n + "</a></div>"
				}
				o.pagerEl.html(t)
			}, w = function() {
				o.settings.pagerCustom ? o.pagerEl = e(o.settings.pagerCustom) : (o.pagerEl = e('<div class="bx-pager" />'), o.settings.pagerSelector ? e(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), b()), o.pagerEl.delegate("a", "click", z)
			}, T = function() {
				o.controls.next = e('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = e('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", A), o.controls.prev.bind("click", P), o.settings.nextSelector && e(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && e(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = e('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
			}, C = function() {
				o.controls.start = e('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = e('<div class="bx-controls-auto" />'), o.controls.autoEl.delegate(".bx-start", "click", y), o.controls.autoEl.delegate(".bx-stop", "click", k), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? e(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), I(o.settings.autoStart ? "stop" : "start")
			}, E = function() {
				o.children.each(function() {
					var t = e(this).find("img:first").attr("title");
					void 0 != t && e(this).append('<div class="bx-caption"><span>' + t + "</span></div>")
				})
			}, A = function(e) {
				o.settings.auto && r.stopAuto(), r.goToNextSlide(), e.preventDefault()
			}, P = function(e) {
				o.settings.auto && r.stopAuto(), r.goToPrevSlide(), e.preventDefault()
			}, y = function(e) {
				r.startAuto(), e.preventDefault()
			}, k = function(e) {
				r.stopAuto(), e.preventDefault()
			}, z = function(t) {
				o.settings.auto && r.stopAuto();
				var i = e(t.currentTarget), n = parseInt(i.attr("data-slide-index"));
				n != o.active.index && r.goToSlide(n), t.preventDefault()
			}, M = function(t) {
				return "short" == o.settings.pagerType ?
				void  o.pagerEl.html(t + 1 + o.settings.pagerShortSeparator + o.children.length) : (o.pagerEl.find("a").removeClass("active"),
				void  o.pagerEl.each(function(i, n) {
					e(n).find("a").eq(t).addClass("active")
				}))
			}, D = function() {
				if (o.settings.infiniteLoop) {
					var e = "";
					0 == o.active.index ? e = o.children.eq(0).position() : o.active.index == f() - 1 && o.carousel ? e = o.children.eq((f() - 1) * m()).position() : o.active.index == o.children.length - 1 && ( e = o.children.eq(o.children.length - 1).position()), "horizontal" == o.settings.mode ? S(-e.left, "reset", 0) : "vertical" == o.settings.mode && S(-e.top, "reset", 0)
				}
				o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
			}, I = function(e) {
				o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[e]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + e + ")").addClass("active"))
			}, q = function() {
				!o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == f() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
			}, L = function() {
				o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function() {
					o.interval && (r.stopAuto(!0), o.autoPaused = !0)
				}, function() {
					o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
				})
			}, W = function() {
				var t = 0;
				if ("next" == o.settings.autoDirection)
					r.append(o.children.clone().addClass("bx-clone"));
				else {
					r.prepend(o.children.clone().addClass("bx-clone"));
					var i = o.children.first().position();
					t = "horizontal" == o.settings.mode ? -i.left : -i.top
				}
				S(t, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
					r.stop()
				}, function() {
					var t = 0;
					o.children.each(function() {
						t += "horizontal" == o.settings.mode ? e(this).outerWidth(!0) : e(this).outerHeight(!0)
					});
					var i = o.settings.speed / t, n = "horizontal" == o.settings.mode ? "left" : "top", s = i * (t - Math.abs(parseInt(r.css(n))));
					H(s)
				}), H()
			}, H = function(e) {
				speed = e ? e : o.settings.speed;
				var t = {
					left : 0,
					top : 0
				}, i = {
					left : 0,
					top : 0
				};
				"next" == o.settings.autoDirection ? t = r.find(".bx-clone").first().position() : i = o.children.first().position();
				var n = "horizontal" == o.settings.mode ? -t.left : -t.top, s = "horizontal" == o.settings.mode ? -i.left : -i.top, a = {
					resetValue : s
				};
				S(n, "ticker", speed, a)
			}, O = function() {
				o.touch = {
					start : {
						x : 0,
						y : 0
					},
					end : {
						x : 0,
						y : 0
					}
				}, o.viewport.bind("touchstart", N)
			}, N = function(e) {
				if (o.working)
					e.preventDefault();
				else {
					o.touch.originalPos = r.position();
					var t = e.originalEvent;
					o.touch.start.x = t.changedTouches[0].pageX, o.touch.start.y = t.changedTouches[0].pageY, o.viewport.bind("touchmove", B), o.viewport.bind("touchend", Q)
				}
			}, B = function(e) {
				var t = e.originalEvent, i = Math.abs(t.changedTouches[0].pageX - o.touch.start.x), n = Math.abs(t.changedTouches[0].pageY - o.touch.start.y);
				if (3 * i > n && o.settings.preventDefaultSwipeX ? e.preventDefault() : 3 * n > i && o.settings.preventDefaultSwipeY && e.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
					var s = 0;
					if ("horizontal" == o.settings.mode) {
						var r = t.changedTouches[0].pageX - o.touch.start.x;
						s = o.touch.originalPos.left + r
					} else {
						var r = t.changedTouches[0].pageY - o.touch.start.y;
						s = o.touch.originalPos.top + r
					}
					S(s, "reset", 0)
				}
			}, Q = function(e) {
				o.viewport.unbind("touchmove", B);
				var t = e.originalEvent, i = 0;
				if (o.touch.end.x = t.changedTouches[0].pageX, o.touch.end.y = t.changedTouches[0].pageY, "fade" == o.settings.mode) {
					var n = Math.abs(o.touch.start.x - o.touch.end.x);
					n >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
				} else {
					var n = 0;
					"horizontal" == o.settings.mode ? ( n = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : ( n = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && n > 0 || o.active.last && 0 > n) ? S(i, "reset", 200) : Math.abs(n) >= o.settings.swipeThreshold ? (0 > n ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : S(i, "reset", 200)
				}
				o.viewport.unbind("touchend", Q)
			}, X = function() {
				var t = e(window).width(), i = e(window).height();
				(a != t || l != i) && ( a = t, l = i, r.updateDimensions(), o.active.last && (o.active.index = f() - 1), o.active.index >= f() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (b(), M(o.active.index)))
			};
			return r.goToSlide = function(t, i) {
				if (!o.working && o.active.index != t)
					if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > t ? f() - 1 : t >= f() ? 0 : t, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= f() - 1, o.settings.pager && M(o.active.index), o.settings.controls && q(), "fade" == o.settings.mode)
						o.settings.adaptiveHeight && o.viewport.height() != h() && o.viewport.animate({
							height : h()
						}, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({
							zIndex : 0
						}), o.children.eq(o.active.index).css("zIndex", 51).fadeIn(o.settings.speed, function() {
							e(this).css("zIndex", 50), D()
						});
					else {
						o.settings.adaptiveHeight && o.viewport.height() != h() && o.viewport.animate({
							height : h()
						}, o.settings.adaptiveHeightSpeed);
						var n = 0, s = {
							left : 0,
							top : 0
						};
						if (!o.settings.infiniteLoop && o.carousel && o.active.last)
							if ("horizontal" == o.settings.mode) {
								var a = o.children.eq(o.children.length - 1);
								s = a.position(), n = o.viewport.width() - a.width()
							} else {
								var l = o.children.length - o.settings.minSlides;
								s = o.children.eq(l).position()
							}
						else if (o.carousel && o.active.last && "prev" == i) {
							var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (f() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".bx-clone").eq(d);
							s = a.position()
						} else if ("next" == i && 0 == o.active.index)
							s = r.find(".bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1;
						else if (t >= 0) {
							var c = t * m();
							s = o.children.eq(c).position()
						}
						var g = "horizontal" == o.settings.mode ? -(s.left - n) : -s.top;
						S(g, "slide", o.settings.speed)
					}
			}, r.goToNextSlide = function() {
				if (o.settings.infiniteLoop || !o.active.last) {
					var e = parseInt(o.active.index) + 1;
					r.goToSlide(e, "next")
				}
			}, r.goToPrevSlide = function() {
				if (o.settings.infiniteLoop || 0 != o.active.index) {
					var e = parseInt(o.active.index) - 1;
					r.goToSlide(e, "prev")
				}
			}, r.startAuto = function(e) {
				o.interval || (o.interval = setInterval(function() {
					"next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
				}, o.settings.pause), o.settings.autoControls && 1 != e && I("stop"))
			}, r.stopAuto = function(e) {
				o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != e && I("start"))
			}, r.getCurrentSlide = function() {
				return o.active.index
			}, r.getSlideCount = function() {
				return o.children.length
			}, r.updateDimensions = function() {
				o.children.add(r.find(".bx-clone")).width(p()), o.viewport.css("height", h()), o.settings.ticker || x()
			}, r.destroySlider = function() {
				o.initialized && (o.initialized = !1, e(".bx-clone", this).remove(), o.children.removeAttr("style"), this.removeAttr("style").unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.pagerEl.remove(), e(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), e(window).unbind("resize", X))
			}, r.reloadSlider = function(e) {
				void 0 != e && ( s = e), r.destroySlider(), d()
			}, d(), this
		}
	}
}(jQuery), function(e, t) {
	var i = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	e.fn.imagesLoaded = function(n) {
		function s() {
			var t = e(g), i = e(h);
			a && (h.length ? a.reject(d, t, i) : a.resolve(d)), e.isFunction(n) && n.call(r, d, t, i)
		}

		function o(t, n) {
			t.src === i || -1 !== e.inArray(t, c) || (c.push(t), n ? h.push(t) : g.push(t), e.data(t, "imagesLoaded", {
				isBroken : n,
				src : t.src
			}), l && a.notifyWith(e(t), [n, d, e(g), e(h)]), d.length === c.length && (setTimeout(s), d.unbind(".imagesLoaded")))
		}

		var r = this, a = e.isFunction(e.Deferred) ? e.Deferred() : 0, l = e.isFunction(a.notify), d = r.find("img").add(r.filter("img")), c = [], g = [], h = [];
		return e.isPlainObject(n) && e.each(n, function(e, t) {
			"callback" === e ? n = t : a && a[e](t)
		}), d.length ? d.bind("load.imagesLoaded error.imagesLoaded", function(e) {
			o(e.target, "error" === e.type)
		}).each(function(n, s) {
			var r = s.src, a = e.data(s, "imagesLoaded");
			a && a.src === r ? o(s, a.isBroken) : s.complete && s.naturalWidth !== t ? o(s, 0 === s.naturalWidth || 0 === s.naturalHeight) : (s.readyState || s.complete) && (s.src = i, s.src = r)
		}) : s(), a ? a.promise(r) : r
	}
}(jQuery);
/****************************
 ! mobify-pikabu 0.2.1 2013-10-30
 ****************************/
var Mobify = window.Mobify = window.Mobify || {};
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery, function(t) {
	function e() {
		function t() {
			var t = ["webkit", "moz", "o", "ms"], e = document.createElement("div"), i = document.getElementsByTagName("body")[0], s = !1;
			i.appendChild(e);
			for (var n = 0; t.length > n; n++) {
				var o = t[n];
				e.style[o + "OverflowScrolling"] = "touch"
			}
			e.style.overflowScrolling = "touch";
			var r = window.getComputedStyle && window.getComputedStyle(e);
			r || ( r = e.currentStyle), s = !!r.overflowScrolling;
			for (var n = 0; t.length > n; n++) {
				var o = t[n];
				if (r[o + "OverflowScrolling"]) {
					s = !0;
					break
				}
			}
			return e.parentNode.removeChild(e), s
		}

		function e() {
			var t = /Android\s+([\d\.]+)/.exec(window.navigator.userAgent);
			return !(!t || !t.length)
		}

		function i() {
			var t = /Android\s+([\d\.]+)/.exec(window.navigator.userAgent);
			return !!(t && t.length && 3 > parseInt(t[1]))
		}

		function s() {
			var t = document.body || document.documentElement, e = t.style, i = "transition";
			if ("string" == typeof e[i])
				return !0;
			v = ["Moz", "Webkit", "Khtml", "O", "ms"], i = i.charAt(0).toUpperCase() + i.substr(1);
			for (var s = 0; v.length > s; s++)
				if ("string" == typeof e[v[s] + i])
					return !0;
			return !1
		}

		function n() {
			var t, e = document.createElement("p"), i = {
				webkitTransform : "-webkit-transform",
				OTransform : "-o-transform",
				msTransform : "-ms-transform",
				MozTransform : "-moz-transform",
				transform : "transform"
			};
			document.body.insertBefore(e, null);
			for (var s in i)
			void 0 !== e.style[s] && (e.style[s] = "translate3d(1px,1px,1px)", t = window.getComputedStyle(e).getPropertyValue(i[s]));
			return document.body.removeChild(e),
			void 0 !== t && t.length > 0 && "none" !== t
		}

		function o() {
			if (/iPhone\ OS\ 3_1/.test(navigator.userAgent))
				return
				void 0;
			var t, e = document.createElement("fakeelement"), i = {
				transition : "transitionEnd transitionend",
				OTransition : "oTransitionEnd",
				MSTransition : "msTransitionEnd",
				MozTransition : "transitionend",
				WebkitTransition : "webkitTransitionEnd"
			};
			for (t in i)
			if (
				void 0 !== e.style[t])
				return i[t]
		}

		function r(t) {
			var e = navigator.userAgent.match(/Chrome\/([\d\.]+)\s/), t = 29;
			return e && parseFloat(e[1]) >= t
		}
		return {
			hasOverflowScrollingTouch : t(),
			isAndroid : e(),
			isLegacyAndroid : i(),
			supportsTransitions : s(),
			has3d : n(),
			transitionEvent : o(),
			isNewChrome : r(),
			height : window.innerHeight + 81,
			width : window.innerWidth
		}
	}
	window.Pikabu = function(e) {
		var i = t.extend(this, {
			$document : t("html"),
			leftVisibleClass : "m-pikabu-left-visible",
			rightVisibleClass : "m-pikabu-right-visible",
			activePikabuStylesSelector : "#m-pikabu-styles",
			settings : {
				viewportSelector : ".m-pikabu-viewport",
				selectors : {
					element : ".m-pikabu-container",
					common : ".m-pikabu-sidebar",
					left : ".m-pikabu-left",
					right : ".m-pikabu-right",
					overlay : ".m-pikabu-overlay",
					navToggles : ".m-pikabu-nav-toggle"
				},
				widths : {
					left : "70%",
					right : "70%"
				},
				transitionSpeed : .2,
				onInit : function() {
				},
				onOpened : function() {
				},
				onClosed : function() {
				}
			}
		});
		return i.init(e), i
	}, Pikabu.prototype.scrollTo = function(t, e, i) {
		var s = function(t, e, i) {
			return t + (e - t) * i
		}, n = function(t) {
			return -Math.cos(t * Math.PI) / 2 + .5
		}, t = t || (this.device.isAndroid ? 1 : 0), e = e || 200;
		"function" == typeof i && ( n = i), Date.now = Date.now ||
		function() {
			return +new Date
		};
		var o = window.pageYOffset, r = Date.now(), a = r + e, l = function() {
			var i = +new Date, h = i > a ? 1 : (i - r) / e;
			window.scrollTo(0, s(o, t, n(h))), i > a || setTimeout(l, 15)
		};
		l()
	}, Pikabu.prototype.init = function(i) {
		var s = this.settings;
		t("html").removeClass("no-js"), this.device = Pikabu.prototype.device || e(), this.markDeviceCharacteristics(), t.extend(!0, s, i), this.$viewport = t(this.settings.viewportSelector), this.$element = t(s.selectors.element), this.$sidebars = {
			left : t(s.selectors.left),
			right : t(s.selectors.right)
		}, this.$navToggles = t(s.selectors.navToggles), t(s.selectors.overlay).length || this.$element.prepend('<div class="' + s.selectors.overlay.slice(1) + '">'), this.$overlay = t(s.selectors.overlay), this.applyPersistentStyles(), this.bindHandlers(), this.bindEvents(), this.$sidebars.left.addClass("m-pikabu-hidden"), this.$sidebars.right.addClass("m-pikabu-hidden"), this.settings = s, this.setViewportWidth(), this.$element.trigger("pikabu:initialized")
	}, Pikabu.prototype.bindEvents = function() {
		this.$element.on("pikabu:initialized", this.settings.onInit), this.$element.on("pikabu:opened", this.settings.onOpened), this.$element.on("pikabu:closed", this.settings.onClosed)
	}, Pikabu.prototype.bindHandlers = function() {
		var e = this;
		this.$navToggles.on("click", function(i) {
			i.stopPropagation(), e.openSidebar(t(this).attr("data-role"))
		}), this.$overlay.on("click", function(t) {
			t.stopPropagation(), e.closeSidebars()
		}), t(window).on("resize orientationchange", function() {
			var i = t(window).height();
			e.activeSidebar ? (e.setHeights(), e.setViewportWidth()) : (e.$sidebars.left.is(":visible") || e.$sidebars.right.is(":visible")) && (e.$viewport.height(i), e.$sidebars.left.height(i), e.$sidebars.right.height(i))
		})
	}, Pikabu.prototype.markDeviceCharacteristics = function() {
		this.device.hasOverflowScrollingTouch && this.$document.addClass("m-pikabu-overflow-scrolling"), this.device.isLegacyAndroid && this.$document.addClass("m-pikabu-legacy-android"), this.device.supportsTransitions && this.$document.addClass("m-pikabu-transitions"), this.device.has3d && this.$document.addClass("m-pikabu-translate3d")
	}, Pikabu.prototype.applyPersistentStyles = function() {
		var t = this.settings.selectors.common + ", \n" + this.settings.selectors.element, e = "." + this.leftVisibleClass + " " + this.settings.selectors.left, i = "." + this.rightVisibleClass + " " + this.settings.selectors.right, s = "<style>\n" + t + " {\n-webkit-transition: -webkit-transform " + this.settings.transitionSpeed + "s ease-in;\n-moz-transition: -moz-transform " + this.settings.transitionSpeed + "s ease-in;\n-ms-transition: -ms-transform " + this.settings.transitionSpeed + "s ease-in;\n-o-transition: -o-transform " + this.settings.transitionSpeed + "s ease-in;\ntransition: transform " + this.settings.transitionSpeed + "s ease-in;\n}\n" + e + " {\n	width: " + this.settings.widths.left + ";\n}\n" + i + " {\n	width: " + this.settings.widths.right + ";\n}</style>";
		this.$document.find("head").append(s)
	}, Pikabu.prototype.applyTransformations = function(t) {
		var e, i;
		e = this.settings.widths[t], i = "left" === t ? e : "-" + e;
		var s = '<style id="' + this.activePikabuStylesSelector.slice(1) + '">\n' + this.settings.selectors.element + " {\n	-webkit-transform: translate3d(" + i + ", 0, 0);\n	-moz-transform: translate3d(" + i + ", 0, 0);\n	-ms-transform: translate3d(" + i + ", 0, 0);\n	-o-transform: translate3d(" + i + ", 0, 0);\n	transform: translate3d(" + i + ", 0, 0);\n}\n" + this.settings.selectors[t] + " {\n	-webkit-transform: translate3d(0, 0, 0);\n	-moz-transform: translate3d(0, 0, 0);\n	-ms-transform: translate3d(0, 0, 0);\n	-o-transform: translate3d(0, 0, 0);\n	transform: translate3d(0, 0, 0);\n}</style>";
		this.$document.find("head").append(s)
	}, Pikabu.prototype.openSidebar = function(t) {
		this.scrollOffset = window.pageYOffset, this.$sidebars[t].removeClass("m-pikabu-hidden"), this.activeSidebar = t, this.$sidebars[t].addClass("m-pikabu-overflow-touch"), this.$document.addClass("m-pikabu-" + t + "-visible"), this.setHeights(), this.setViewportWidth(), this.applyTransformations(t), this.scrollTo(0), this.$element.trigger("pikabu:opened")
	}, Pikabu.prototype.resetSidebar = function(t) {
		t.removeClass("m-pikabu-overflow-touch"), this.$viewport.css("height", ""), this.$element.css("height", ""), this.$element.css("marginBottom", 1), this.scrollTo(0), this.$element.css("marginBottom", ""), this.$sidebars.left.addClass("m-pikabu-hidden"), this.$sidebars.right.addClass("m-pikabu-hidden"), this.activeSidebar = null, this.$element.trigger("pikabu:closed")
	}, Pikabu.prototype.closeSidebars = function() {
		var e = this;
		this.$document.removeClass(this.leftVisibleClass + " " + this.rightVisibleClass), this.$viewport.css("width", "auto"), t(this.activePikabuStylesSelector).remove(), this.device.transitionEvent && this.activeSidebar ? this.$element.one(this.device.transitionEvent, function() {
			e.resetSidebar(t(this)), e.scrollTo(e.scrollOffset)
		}) : setTimeout(function() {
			e.resetSidebar(t(this)), e.scrollTo(e.scrollOffset)
		}, 250)
	}, Pikabu.prototype.setViewportWidth = function() {
		var t = "auto";
		this.device.isLegacyAndroid && 0 == orientation && ( t = Math.max(this.device.height, this.device.width)), this.$viewport.css("width", t)
	}, Pikabu.prototype.setHeights = function() {
		var e = this.device.isNewChrome ? window.outerHeight : t(window).height(), i = this.activeSidebar && this.$sidebars[this.activeSidebar], s = i.removeAttr("style")[0].scrollHeight, n = Math.max(e, s);
		this.device.hasOverflowScrollingTouch ? (i.height(e), this.$element.height(e), this.$viewport.height(e), this.$overlay.height(e)) : (i.height(n), this.$viewport.height(n), this.$overlay.height(n), this.$element.height(n))
	}
}(Mobify.$), /***
 Nav Accordion Plugin
 ********************************
 ********************************/
function($) {
	$.fn.navAccordion = function(options) {
		this.each(function() {
			function expandSelected() {
				if (settings.selectedExpand)
					if (settings.headersOnlyCheck)
						$(settings.parentElement + "." + settings.selectedClass + " > " + settings.childElement, container).css("display", "block");
					else {
						var selectedNavAccordion = $(settings.parentElement + "." + settings.selectedClass + " > .accordion-btn-wrap", container);
						selectedNavAccordion.find(".accordion-expanded").css("display", "inline-block"), selectedNavAccordion.find(".accordion-collapsed").css("display", "none"), selectedNavAccordion.addClass("accordion-active").next(settings.childElement).css("display", "block")
					}
			}

			function buttonheight() {
				$(".accordion-btn", container).each(function() {
					$(settings.parentElement + ".has-subnav > " + settings.childElement, container).css("display", "block");
					var parentItem = $(this).closest(settings.parentElement), lineheight = $("> a", parentItem).innerHeight();
					$(this).css({
						"line-height" : lineheight + "px",
						height : lineheight
					}), $(settings.parentElement + (settings.headersOnlyCheck ? " " : ".has-subnav > ") + settings.childElement, container).css("display", "none"), $(".accordion-expanded").css("display", "none"), $(".accordion-collapsed").css("display", "inline-block")
				})
			}

			function debounce(func, wait, immediate) {
				var timeout;
				return function() {
					var context = this, args = arguments, later = function() {
						timeout = null, immediate || func.apply(context, args)
					}, callNow = immediate && !timeout;
					clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && func.apply(context, args)
				}
			}

			var settings = $.extend({
				expandButtonText : "+",
				collapseButtonText : "-",
				selectedExpand : "true",
				selectedClass : "selected",
				multipleLevels : "true",
				buttonWidth : "20%",
				buttonPosition : "right",
				slideSpeed : "fast",
				parentElement : "li",
				childElement : "ul",
				headersOnly : !1,
				headersOnlyCheck : !1
			}, options), container = this;
			jQuery(container).addClass("accordion-nav");
			var multi;
			multi = settings.multipleLevels ? "" : " > " + settings.childElement + " > ", $(multi + settings.parentElement, container).each(function() {
				($(this).contents(settings.childElement).length > 0 && 0 == settings.headersOnlyCheck || !$("> a", this).attr("href") && 1 == settings.headersOnlyCheck) && ($(this).addClass("has-subnav").css("position", "relative").find(">a").css("margin-" + settings.buttonPosition, settings.buttonWidth), $(" > " + settings.childElement, this).before('<span class="accordion-btn-wrap"><span class="accordion-btn accordion-collapsed">' + settings.expandButtonText + '</span><span class="accordion-btn accordion-expanded">' + settings.collapseButtonText + "</span></span>"), $(".accordion-btn-wrap", this).css({
					width : settings.buttonWidth,
					position : "absolute",
					top : 0,
					"text-align" : "center",
					cursor : "pointer",
					display : "inline-block"
				}).css(settings.buttonPosition, 0), $(".accordion-btn ", this).css({
					display : "inline-block",
					width : "100%"
				}), $(".accordion-expanded", this).css("display", "none")), (!$("> a", this).attr("href") || settings.headersOnly) && $(this).addClass("accordion-header-only").find(".accordion-btn-wrap").css({
					width : "100%",
					"text-align" : settings.buttonPosition
				}).find(".accordion-btn ").css({
					width : settings.buttonWidth,
					"text-align" : "center"
				})
			});
			var buttonheightResize = debounce(function() {
				buttonheight(), expandSelected()
			}, 250);
			$(window).on("resize", buttonheightResize), buttonheight(), expandSelected(), $(container).on("click", ".accordion-btn-wrap", function(e) {
				e.preventDefault();
				var nextChild = $(this).next(settings.childElement), currentExpandBtn = $(".accordion-expanded", this), currentCollapseBtn = $(".accordion-collapsed", this);
				nextChild.is(":visible") ? (nextChild.slideUp(settings.slideSpeed), $(this).removeClass("accordion-active"), currentExpandBtn.css("display", "none"), currentCollapseBtn.css("display", "inline-block")) : ($(this).closest(settings.childElement).find(".accordion-active").removeClass("accordion-active").next(settings.childElement).slideUp(settings.slideSpeed).prev().find(".accordion-expanded").css("display", "none").parent().find(".accordion-collapsed").css("display", "inline-block"), $(this).addClass("accordion-active"), nextChild.slideToggle(settings.slideSpeed), currentExpandBtn.css("display", "inline-block"), currentCollapseBtn.css("display", "none"))
			})
		})
	}
}(jQuery); 