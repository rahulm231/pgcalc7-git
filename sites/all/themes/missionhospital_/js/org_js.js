$(window).scroll(function() {
	var mh = $('#TopBarZone').outerHeight(),
		mp = $('#MastheadZone').height() + $('.desktop-nav').height();
	if (!$('html').hasClass('anchors')) {
		if ($(this).scrollTop() > mh) {
			$('#TopArea, body').addClass('masthead-fixed');
			$('body').css('padding-top', mp);
		} else {
			$('#TopArea, body').removeClass('masthead-fixed');
			$('body').css('padding-top', 0);
		}
	}
});
$(document).ready(function() {
	//e.preventDefault();
	var path = window.location.href,
		anchor = path.split('#')[1],
		link = $('body').find('a[name=' + anchor + ']');
	//$.log(anchor);
	if (anchor && link.length > 0) {
		animateAnchor(anchor);
	}
	$('.content a[href*=#]').on('click', function(e) {
		e.preventDefault();
		var path = window.location.href.split('?')[0],
			target = e.target.href.split('#')[0],
			anchor = e.target.href.split('#')[1],
			link = $('body').find('a[name=' + anchor + ']');
		//$.log([path,target]);
		//$.log(anchor);
		if (path == target && link.length > 0) {
			animateAnchor(anchor);
		} else {
			window.location = e.target.href;
		}
	});
});

function animateAnchor(anchor) {
	var buffer = $('#TopArea').height() + $('.desktop-nav').height(),
		link = $('body').find('a[name=' + anchor + ']'),
		cms = $('body').hasClass('cms-admin'),
		loc = link.offset().top;
	var currentOffset = loc - buffer;
	//	$.log('link offset: ' + loc);
	if ($('body').scrollTop() === 0) {
		$('html').addClass('anchors');
		$('#TopArea').addClass('masthead-fixed');
		$('#MastheadZone').one(transitionEvent, function(event) {
			var buffer = $('#MastheadZone').height() + $('.desktop-nav').height(),
				loc = link.offset().top,
				currentOffset = loc - buffer;
			if (cms) {
				cmsOffset = $('#AdminToolbar').height();
				currentOffset -= cmsOffset;
			}
			$('html, body').animate({
				scrollTop: currentOffset
			}, 2000, function() {
				$('html').removeClass('anchors');
			});
		});
	} else {
		if (cms) {
			cmsOffset = $('#AdminToolbar').height();
			currentOffset -= cmsOffset;
		}
		$('html, body').animate({
			scrollTop: currentOffset
		}, 2000, function() {
			$('html').removeClass('anchors');
		});
	}
}

function whichTransitionEvent() {
	var t,
		el = document.createElement("fakeelement");
	var transitions = {
		"transition": "transitionend",
		"OTransition": "oTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	}
	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}
var transitionEvent = whichTransitionEvent();

!function(t){function e(){var t=document.createElement("p"),e=!1;if(t.addEventListener)t.addEventListener("DOMAttrModified",function(){e=!0},!1);else{if(!t.attachEvent)return!1;t.attachEvent("onDOMAttrModified",function(){e=!0})}return t.setAttribute("id","target"),e}function a(e,a){if(e){var n=this.data("attr-old-value");if(a.attributeName.indexOf("style")>=0){n.style||(n.style={});var r=a.attributeName.split(".");a.attributeName=r[0],a.oldValue=n.style[r[1]],a.newValue=r[1]+":"+this.prop("style")[t.camelCase(r[1])],n.style[r[1]]=a.newValue}else a.oldValue=n[a.attributeName],a.newValue=this.attr(a.attributeName),n[a.attributeName]=a.newValue;this.data("attr-old-value",n)}}var n=window.MutationObserver||window.WebKitMutationObserver;t.fn.attrchange=function(r,o){if("object"==typeof r){var i={trackValues:!1,callback:t.noop};if("function"==typeof r?i.callback=r:t.extend(i,r),i.trackValues&&this.each(function(e,a){for(var n,r={},e=0,o=a.attributes,i=o.length;i>e;e++)n=o.item(e),r[n.nodeName]=n.value;t(this).data("attr-old-value",r)}),n){var l={subtree:!1,attributes:!0,attributeOldValue:i.trackValues},c=new n(function(e){e.forEach(function(e){var a=e.target;i.trackValues&&(e.newValue=t(a).attr(e.attributeName)),"connected"===t(a).data("attrchange-status")&&i.callback.call(a,e)})});return this.data("attrchange-method","Mutation Observer").data("attrchange-status","connected").data("attrchange-obs",c).each(function(){c.observe(this,l)})}return e()?this.data("attrchange-method","DOMAttrModified").data("attrchange-status","connected").on("DOMAttrModified",function(e){e.originalEvent&&(e=e.originalEvent),e.attributeName=e.attrName,e.oldValue=e.prevValue,"connected"===t(this).data("attrchange-status")&&i.callback.call(this,e)}):"onpropertychange"in document.body?this.data("attrchange-method","propertychange").data("attrchange-status","connected").on("propertychange",function(e){e.attributeName=window.event.propertyName,a.call(t(this),i.trackValues,e),"connected"===t(this).data("attrchange-status")&&i.callback.call(this,e)}):this}return"string"==typeof r&&t.fn.attrchange.hasOwnProperty("extensions")&&t.fn.attrchange.extensions.hasOwnProperty(r)?t.fn.attrchange.extensions[r].call(this,o):void 0}}(jQuery),$.fn.attrchange.extensions={disconnect:function(t){return"undefined"!=typeof t&&t.isPhysicalDisconnect?this.each(function(){var t=$(this).data("attrchange-method");"propertychange"==t||"DOMAttrModified"==t?$(this).off(t):"Mutation Observer"==t?$(this).data("attrchange-obs").disconnect():"polling"==t&&clearInterval($(this).data("attrchange-polling-timer"))}).removeData(["attrchange-method","attrchange-status"]):this.data("attrchange-status","disconnected")},remove:function(){return $.fn.attrchange.extensions.disconnect.call(this,{isPhysicalDisconnect:!0})},getProperties:function(){var t=$(this).data("attrchange-method"),e=$(this).data("attrchange-pollInterval");return{method:t,isPolling:"polling"==t,pollingInterval:"undefined"==typeof e?0:parseInt(e,10),status:"undefined"==typeof t?"removed":$(this).data("attrchange-status")}},reconnect:function(){return this.data("attrchange-status","connected")},polling:function(t){return this.each(t.hasOwnProperty("isComputedStyle")&&"true"==t.isComputedStyle?function(e,a){if(!t.hasOwnProperty("properties")||"[object Array]"!==Object.prototype.toString.call(t.properties)||0===t.properties.length)return!1;for(var n={},e=0;e<t.properties.length;e++)n[t.properties[e]]=$(this).css(t.properties[e]);var a=this;$(this).data("attrchange-polling-timer",setInterval(function(){for(var e,r={},o=!1,i=0;i<t.properties.length;i++)e=$(a).css(t.properties[i]),n[t.properties[i]]!==e&&(o=!0,r[t.properties[i]]={oldValue:n[t.properties[i]],newValue:e},n[t.properties[i]]=e);o&&"connected"===$(a).data("attrchange-status")&&t.callback.call(a,r)},t.pollInterval?t.pollInterval:1e3)).data("attrchange-method","polling").data("attrchange-pollInterval",t.pollInterval).data("attrchange-status","connected")}:function(e,a){for(var n,r={},e=0,o=a.attributes,i=o.length;i>e;e++)n=o.item(e),r[n.nodeName]=n.nodeValue;$(a).data("attrchange-polling-timer",setInterval(function(){for(var e,n={},o=!1,i=0,l=a.attributes,c=l.length;c>i;i++)e=l.item(i),r.hasOwnProperty(e.nodeName)&&r[e.nodeName]!=e.nodeValue?(n[e.nodeName]={oldValue:r[e.nodeName],newValue:e.nodeValue},o=!0):r.hasOwnProperty(e.nodeName)||(n[e.nodeName]={oldValue:"",newValue:e.nodeValue},o=!0),r[e.nodeName]=e.nodeValue;o&&"connected"===$(a).data("attrchange-status")&&t.callback.call(a,n)},t.pollInterval?t.pollInterval:1e3)).data("attrchange-method","polling").data("attrchange-pollInterval",t.pollInterval).data("attrchange-status","connected")})}};

$(function() {
	$('.mobile-nav .search-trigger').on('click', function() {
		$('.top-search div[data-item=h]').toggleClass('active');
	});
	$('#SmallMenu').on('click', function() {
		$('html, body').animate({ scrollTop: '0px' });
		if ($(window).width() <= 640) {
			$('#TopArea').css({position: 'relative'});
			$('body').addClass('mobile-fix');
		}
	});
});
$(document).ready(function() {
	$('.top-search').attrchange({
		trackValues: true,
		callback: function (event) {
			var properties = $(this).attrchange('getProperties');						
			//$.log('Status: ' + properties.status + '. Attribute Name: ' + event.attributeName + ' Prev Value: ' + event.oldValue + ' New Value: ' + event.newValue);
			if (event.attributeName == 'class' && event.newValue.indexOf('searching')>= 0) {
				if ($(window).innerWidth() <= 640) {
					$('#TopArea').css({position: 'relative'});
					$('html, body').animate({ scrollTop: '0px' });
					$('body').addClass('mobile-fix');
				}
				$('.top-search').attrchange('disconnect');
			}
		}
	});
});

(function(e){e.widget("cms.flyoutpanel",{options:{links:".desktop-nav a",panels:".cdd-item",active:"active",container:null},_create:function(){var t=null,n=e.proxy(this._handleEvents,this);this._tablet=window.orientation!==undefined;if(this._tablet){this.element.find(this.options.links).click(e.proxy(this._tabletClick,this));}this.elements={links:this.element.find(this.options.links),panels:this.element.find(this.options.panels).css({opacity:0})};if(this.options.container){if(typeof this.options.container==="string"){t=this.element.find(this.options.container);}else if(this.options.container.jquery){t=this.options.container;}else if(this.options.container.innerHTML){t=e(this.options.container);}}if(t&&t.length){this._over=false;t[0]._over=true;this.element.find(this.options.container).bind("mouseover mouseout",n);this.elements.panels.bind("mouseover mouseout",n).each(function(e){this._over=true;});}else{this._over=undefined;this.element.bind("mouseover mouseleave",n);}this.element.find("input:text,textarea,select").bind("focus blur",n);this._id=this.element.attr("id");this._cls=this.options.panels.split(".").pop();this._index=-1;this._locked=false;this._fading=false;this._active=false;this._over=false;this._lasttime=(new Date()).getTime();var r=this;setTimeout(function(){r._active=true;},500);e.cms.flyoutpanel._instaces.addItem(this);},_handleEvents:function(t){if(!this._active){return;}switch(t.type){case"mouseover":if(this._over===false){this._over=true;}var n=e.getLinkTarget(t);if(n&&n.is(this.options.links)){this.show(this.elements.links.index(n));}else if(t.target){if(this._locked||this._fading){var r=t.target,i=false,s=this.elements.panels.eq(this._last);while(r.parentNode){if(r===s[0]){i=true;break;}else if(r===this.element[0]){break;}r=r.parentNode;}if(i){this._index=this._last;if(this._fading){s.stop().animate({'opacity':1},500);if(e.isFunction(this.options.onshow)){this.options.onshow.apply(this,[this._index,s,this]);}}}}}break;case"mouseout":var r=t&&t.relatedTarget;if(r){do{if(r===this.element[0]){break;}else if(r._over){return;}else{r=r.parentNode;}}while(r);}if(this._over===true){this._over=false;}this.hide();break;case"mouseleave":this.hide();break;case"focus":this.lock();break;case"blur":this.unlock();break;}},_tabletClick:function(e){var t=(new Date()).getTime()-this._lasttime;if(t<100){return false;}},show:function(t){if(t===this._index){return;}this._locked=false;this._index=t;this._last=t;this.elements.links.removeClass(this.options.active);this.elements.links.eq(this._index).addClass(this.options.active);var n=this.elements.panels.filter(":visible").removeClass('active');var r=true;if(n.length){n.stop().css({'opacity':0});r=false;}this._fading=false;var i=this.elements.panels.eq(this._index);if(i.hasClass('no-cdd')){$('.bcb-spacer').slideDown();}this._animatePanel(i,r);if(e.isFunction(this.options.onshow)){this.options.onshow.apply(this,[this._index,i,this]);}this._lasttime=(new Date()).getTime();},_animatePanel:function(e,t){this.elements.panels.removeClass('active');e.stop().css({opacity:1}).addClass('active');if(!e.hasClass('no-cdd')&&!$('#TopArea').hasClass('masthead-fixed')){$('.bcb-spacer').slideUp();}},hide:function(){this._index=-1;if(this._locked){return;}this.elements.links.removeClass(this.options.active);var t=this.elements.panels.filter(":visible");this._last=this.elements.panels.index(t);if(this._last>=0){if(e.isFunction(this.options.onstarthide)){this.options.onstarthide.apply(this,[this._index,t,this]);}this._fading=true;this._hidePanel(t);}},_hidePanel:function(e){e.stop().removeClass('active').css({opacity:0},this._endHide());$('.bcb-spacer').slideDown();},_endHide:function(){var t=this;return function(n){t._fading=false;if(t._over===true){return;}else{if(e.isFunction(t.options.onhide)){t.options.onhide.apply(t,[t._index,e(this),t]);}}};},lock:function(){this._locked=true;},unlock:function(){this._locked=false;if(this._index<0){this.elements.panels.filter(":visible").removeClass('active').css({opacity:0});}else{this.show(this._index);}},destroy:function(){e.cms.flyoutpanel._instaces.removeItem(this);e.Widget.prototype.destroy.apply(this,arguments);}});e.extend(e.cms.flyoutpanel,{_paused:false,_instaces:[],pause:function(){e.cms.flyoutpanel._paused=true;for(var t=0;t<this._instaces.length;t++){this._instaces[t]._active=false;}},play:function(){e.cms.flyoutpanel._paused=false;for(var t=0;t<this._instaces.length;t++){this._instaces[t]._active=true;}},paused:function(){return!!e.cms.flyoutpanel._paused;}});})(jQuery);

$(document).ready(function(){
	// Start the main flyout panel.
	if ($(window).width() > 780) {
		$('#TopNavigation').flyoutpanel();
	}
	
	$('#CDServicesCTA li a:not(.all)').each(function() {		
		$(this).on('mouseover', function() {
			var desc = $.decode( $(this).data('desc') ),
				link = $(this).attr('href'),
				text = [];
			text.push('<p>' + desc );
			text.push( ' <a href="' );
			text.push( link );
			text.push( '">Read More [+]</a></p>' );
			
			$(this).closest('div')
				.find('section')
						.html( text.join("") );
			$(this).closest('div').find('.active').removeClass('active');
			$(this).addClass('active');
		});
	});
});
$(document).ready(function(){
	var	fontBtn = $('.bc-buttons a.font');
	
	fontBtn.click(function(e) {
		e.preventDefault();
		var content = $('.content');
		
		content.toggleClass('large-fonts');
	});
	
});
(function( $ ) {

$.widget( "cms.accordion", {
	options: {
	},

	_create: function() {
		//$.log(this.element);
		// Add event handler to each title
		this.element.find("[data-type='title']").click($.proxy(this._toggleSection,this));
		var title = this.element.find("[data-type='main']"),
			titletext = title.html();
		if (titletext.indexOf("*EMPTY*") >= 0) {
			//$.log('has *EMPTY*');
			var newtext = titletext.replace('*EMPTY*','').trim();
			//$.log(newtext.length);
			if (newtext.length > 0) {
				title.hide();
			} else {
				title.remove();	
			}
		}
		var printing = $('body').hasClass('print');
		if (printing) {
			this.element.find("[data-type='section']").slideDown();
		}
	},

	_toggleSection: function(e) {
		var el = $(e.target).closest("[data-type='title']"),
			p = el.parent(),
			active = el.is('.active');

		if ( active ) {
			el.removeClass('active');
			p.children("[data-type='section']").slideUp();
		} else {
			this.element.find("[data-type='title']").removeClass('active');
			this.element.find("[data-type='section']").slideUp();
			el.addClass('active');
			p.children("[data-type='section']").slideDown();
		}
	}
});

})( jQuery );
$(window).load(function() {
	var pathname = window.location.pathname;
	//checks if page is a print page
	if (pathname.indexOf("Print.aspx") >= 0) {
		window.print();
	}

});
$(document).ready(function(){
	$("#MainContent a[href$='.mp3']").click(PlayAudio);
});
function PlayAudio(e) {
	var link = $(this),
		href = link.attr('href');	
	$.cms.popupvideo(href,null,true,443,24);
	return false;
}
$(document).ready(function(){
	var levelOne = $('ul.slide-list .level1'),
		levelTwo = $('ul.slide-list .level2, ul.slide-list .level3, ul.slide-list .level4, ul.slide-list .level5'),
		sysLTwo = $('.sys-nav li > ul');

	levelOne.find('span').each(function() {
		$(this).click(function(e){
			var item = $(this).closest('.level1'),
				icon = item.find('icon'),
				list = item.nextUntil('.level1'),
				sysList = item.find('ul');
			
			if ( item.hasClass('child0')) {
				item[0].click();
				e.stopPropagation();
			} else if ( item.hasClass('minus') ) {
				sysLTwo.slideUp();
				levelTwo.slideUp();
				levelOne.removeClass('minus');
				
				return false;
			} else {	
				sysLTwo.slideUp();
				levelTwo.slideUp();
				levelOne.removeClass('minus');
				if ( item.parents('.sys-nav').length !== 0 ) {
					sysList.slideDown();	
				} else {
					list.slideDown();	
				}
				
				item.addClass('minus');
				return false;
			}
		});
		$(this).hover( function() {
				$(this).closest('.level1').addClass('hovered');
			}, function () {
				$(this).closest('.level1').removeClass('hovered');
		});
	});
	levelOne.filter('.selected')
		.each(function(i){
			var item = $(this).closest('.level1'),
				list = item.nextUntil('.level1');
			if (!item.hasClass('child0')) {
				list.slideDown();
				item.addClass('minus');	
			}
		});
});
$(document).ready(function() {
	$('.footer-toggle').hide();
	$('.footer-module .map').on('click', function() {
		$('.footer-toggle').slideToggle();
	});
});
$(document).ready(function() {
	function add() {
		if ($(this).val() === '') {
			$(this).val($(this).attr('placeholder')).addClass('placeholder');
		}
	}

	function remove() {
			if ($(this).val() === $(this).attr('placeholder')) {
				$(this).val('').removeClass('placeholder');
			}
		}
		// Create a dummy element for feature detection
	if (!('placeholder' in $('<input>')[0])) {
		// Select the elements that have a placeholder attribute
		$('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
	}
	if ($('input[type=date]').length > 0 && !Modernizr.inputtypes.date) {
		$('input[type=date]').attr('type', 'text').addClass('date').inputStyle();
	}
	if ($('input[type=time]').length > 0 && !Modernizr.inputtypes.time) {
		$('input[type=time]').attr('type', 'text').addClass('time').inputStyle();
	}
});

function WebForm_DoPostBackWithOptions(options) {
	if (!('placeholder' in $('<input>')[0])) {
		//alert('no placeholders');
		$('form').find('input[placeholder], textarea[placeholder]').each(function() {
			if ($(this).val() === $(this).attr('placeholder')) {
				$(this).val('').removeClass('placeholder');
			}
		});
	}
	var validationResult = true;
	if (options.validation) {
		if (typeof(Page_ClientValidate) == 'function') {
			validationResult = Page_ClientValidate(options.validationGroup);
		}
	}
	if (validationResult) {
		$( '.form .btn' ).hide();
		$(document.body).loading({
			timeout: 0
		});
		if ((typeof(options.actionUrl) != "undefined") && (options.actionUrl != null) && (options.actionUrl.length > 0)) {
			theForm.action = options.actionUrl;
		}
		if (options.trackFocus) {
			var lastFocus = theForm.elements["__LASTFOCUS"];
			if ((typeof(lastFocus) != "undefined") && (lastFocus != null)) {
				if (typeof(document.activeElement) == "undefined") {
					lastFocus.value = options.eventTarget;
				} else {
					var active = document.activeElement;
					if ((typeof(active) != "undefined") && (active != null)) {
						if ((typeof(active.id) != "undefined") && (active.id != null) && (active.id.length > 0)) {
							lastFocus.value = active.id;
						} else if (typeof(active.name) != "undefined") {
							lastFocus.value = active.name;
						}
					}
				}
			}
		}
	} else {
		if (!('placeholder' in $('<input>')[0])) {
			$('form').find('input[placeholder], textarea[placeholder]').each(function() {
				if ($(this).val() === '') {
					$(this).val($(this).attr('placeholder')).addClass('placeholder');
				}
			});
		}
	}
	if (options.clientSubmit) {
		__doPostBack(options.eventTarget, options.eventArgument);
	}
}
$( function () {
	if ( !Modernizr.boxsizing ) {
		$( 'form *' ).each( function() {
			if ( !this.currentStyle || !this.currentStyle.width || this.currentStyle.width == 'auto' ) {
				return;
			}
			var el = $( this ),
				full = el.outerWidth(),
				actual = el.width(),
				delta = full - actual;
			if ( delta ) {
				el.css( { width: actual - delta } );
			}
		} );
	}
} );
	$(document).ready(function(){
		$('#TargetedSiteSearch').ajaxlist({
			paging: false,
			sort: false,
			search: true,
			edit: false,
			edit2: false,
			edit3: false,
			del: false,
			del2: false,
			del3: false,
			drag: false,
			autosuggest: "<div class=\"combo-box\"></div>"
		});
	});
	$(document).ready(function(){
		$('#PhysNameSrch').ajaxlist({
			paging: false,
			sort: false,
			search: true,
			edit: false,
			edit2: false,
			edit3: false,
			del: false,
			del2: false,
			del3: false,
			drag: false,
			autosuggest: "<div class=\"autodrop\"></div>"
		});
	});
	$(document).ready(function(){
		$('#PhysSpecSrch').ajaxlist({
			paging: false,
			sort: false,
			search: true,
			edit: false,
			edit2: false,
			edit3: false,
			del: false,
			del2: false,
			del3: false,
			drag: false,
			autosuggest: "<div class=\"autodrop\"></div>"
		});
	});
	$(document).ready(function(){
		$('#ServicesByKeyword').ajaxlist({
			paging: false,
			sort: false,
			search: true,
			edit: false,
			edit2: false,
			edit3: false,
			del: false,
			del2: false,
			del3: false,
			drag: false,
			autosuggest: true
		});
	});