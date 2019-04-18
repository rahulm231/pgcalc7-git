/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);;
/**
 * jQuery Masonry v2.1.06
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left";var g=this.element.css("padding-"+this.horizontalDirection),h=this.element.css("padding-top");this.offset={x:g?parseInt(g,10):0,y:h?parseInt(h,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){i.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){i.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);;
/**
 * Set all passed elements to the same height as the highest element.
 * 
 * Copyright (c) 2010 Ewen Elder
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: Ewen Elder <glomainn at yahoo dot co dot uk> <ewen at jainaewen dot com>
 * @version: 1.0
 * 
 * @todo: Recaluclate height if extra content is loaded into one of the elements after it has been resized
 *        possibly detect if the highest column has a fixed CSS height to being with or is set to 'auto'; if set to auto
 *        then leave as auto so that it well expend or contract naturally as it would normally.
**/ 

(function ($)
{
	$.fn.equalHeightColumns = function (options)
	{
		var height, elements;
		
		options = $.extend({}, $.equalHeightColumns.defaults, options);
		height = options.height;
		elements = $(this);
		
		$(this).each
		(
			function ()
			{
				// Apply equal height to the children of this element??
				if (options.children)
				{
					elements = $(this).children(options.children);
				}
				
				// If options.height is 0, then find which element is the highest.
				if (!options.height)
				{
					// If applying to this elements children, then loop each child element and find which is the highest.
					if (options.children)
					{
						elements.each
						(
							function ()
							{
								// If this element's height is more than is store in 'height' then update 'height'.
								if ($(this).height() > height)
								{
									height = $(this).height();
								}
							}
						);
					}
					
					else
					{
						// If this element's height is more than is store in 'height' then update 'height'.
						if ($(this).height() > height)
						{
							height = $(this).height();
						}
					}
				}
			}
		);
		
		
		// Enforce min height.
		if (options.minHeight && height < options.minHeight)
		{
			height = options.minHeight;
		}
		
		
		// Enforce max height.
		if (options.maxHeight && height > options.maxHeight)
		{
			height = options.maxHeight;
		}
		
		
		// Animate the column's height change.
		elements.animate
		(
			{
				height : height
			},
			options.speed
		);
		
		return $(this);
	};
	
	
	$.equalHeightColumns = {
		version : 1.0,
		defaults : {
			children : false,
			height : 0,
			minHeight : 0,
			maxHeight : 0,
			speed : 0
		}
	};
})(jQuery);;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/* 
*
* Easy front-end framework
*
* Copyright (c) 2011 Alen Grakalic
* http://easyframework.com/license.php
*
* supported by Templatica (http://templatica.com)
* and Css Globe (http://cssglobe.com)
* 
* built to be used with jQuery library
* http://jquery.com
* 
* update: Mar 22nd 2011
* 
*/


(function($){$.easy={navigation:function(_11){var _12={selector:"#nav li, nav li",className:"over"};if(typeof _11=="string"){_12.selector=_11;}var _11=$.extend(_12,_11);return $(_11.selector).each(function(){$(this).hover(function(){$("ul:first",this).fadeIn(100);$(this).addClass(_11.className);},function(){$("ul",this).hide();$(this).removeClass(_11.className);});});},tooltip:function(_13){var _14={selector:".tooltip",xOffset:10,yOffset:25,clickRemove:false,id:"easy_tooltip",content:"",useElement:""};if(typeof _13=="string"){_14.selector=_13;}var _13=$.extend(_14,_13);var _15;return $(_13.selector).each(function(){var _16=$(this).attr("title");$(this).hover(function(e){_15=(_13.content!="")?_13.content:_16;_15=(_13.useElement!="")?$("#"+_13.useElement).html():_15;$(this).attr("title","");if(_15!=""&&_15!=undefined){$("body").append("<div id=\""+_13.id+"\">"+_15+"</div>");$("#"+_13.id).css({"position":"absolute","display":"none"}).css("top",(e.pageY-_13.yOffset)+"px").css("left",(e.pageX+_13.xOffset)+"px").fadeIn("fast");}},function(){$("#"+_13.id).remove();$(this).attr("title",_16);});$(this).mousemove(function(e){var x=((e.pageX+_13.xOffset+$(this).width())<$(window).width())?(e.pageX+_13.xOffset):(e.pageX-_13.xOffset-$(this).width()-16);$("#"+_13.id).css("top",(e.pageY-_13.yOffset)+"px").css("left",(x+"px"));});if(_13.clickRemove){$(this).mousedown(function(e){$("#"+_13.id).remove();$(this).attr("title",_16);});}});},popup:function(_17){var _18={selector:".popup",popupId:"easy_popup",preloadText:"Loading...",errorText:"There has been a problem with your request, please click outside this window to close it.",closeText:"Close",prevText:"&laquo; Previous",nextText:"Next &raquo;",opacity:0.7,hiddenClass:"hidden",callback:function(){}};if(typeof _17=="string"){_18.selector=_17;}var _17=$.extend(_18,_17);return $(_17.selector).each(function(i){var obj=this;var _19,_1a;var _1b=true;var _1c=this.tagName.toLowerCase();if($(this).hasClass("gallery")){var _1d=$(this).attr("class");_1d=_1d.split(" ").join("");$.data(this,"gallery",_1d);eval("if((typeof "+_1d+"_arr == \"undefined\")) "+_1d+"_arr= new Array()");eval(_1d+"_arr").push($(this));$.data(this,"index",eval(_1d+"_arr").length-1);}if($.browser.opera){$.support.opacity=true;}var ie6=$.browser.msie&&$.browser.version.substr(0,1)<7;var _1e=$.browser.opera&&$.browser.version<=9.5;var w,h,w2,h2;var cw,ch;cw=ch=0;var _1f=false;var _20=function(){w=$(window).width();h=$(document).height();w2=$(window).width()/2;h2=$(window).height()/2;if($("#"+_17.popupId).length==0){$("<div id=\""+_17.popupId+"\"></div>").appendTo("body").css({"width":w,"height":h,"position":"absolute","top":"0","left":"0","z-index":"10000","opacity":_17.opacity}).click(function(){_26();});}$("<div id=\""+_17.popupId+"_preloader\">"+_17.preloadText+"</div>").appendTo("body");set($("#"+_17.popupId+"_preloader"));$("<div id=\""+_17.popupId+"_content\"></div>").appendTo("body").css({"visibility":"hidden","position":"absolute","top":"-10000px","left":"-10000px"});$("<div id=\""+_17.popupId+"_inner\"></div>").appendTo("#"+_17.popupId+"_content").css({"overflow":"auto","height":"100%"});$("<small id=\""+_17.popupId+"_close\">"+_17.closeText+"</small>").appendTo("#"+_17.popupId+"_inner").click(function(){_26();});var rel=$(obj).attr("rel").split(";");$.each(rel,function(i){if(rel[i].indexOf("width")!=-1){cw=rel[i].split(":")[1];}if(rel[i].indexOf("height")!=-1){ch=rel[i].split(":")[1];}});if($(obj).attr("title")!=""){$("<span class=\"caption\">"+$(obj).attr("title")+"</span>").appendTo("#"+_17.popupId+"_content").hide();}};var _21=function(){$("#"+_17.popupId+"_preloader").remove();var _22=$("#"+_17.popupId+"_content");var fh=false;if(cw!=0){$(_22).css("width",parseInt(cw));}if(ch!=0){$(_22).css("height",parseInt(ch));fh=true;}if($(_22).width()>($(window).width()-50)){$(_22).css("width",$(window).width()-50);}if($(_22).height()>($(window).height()-50)){$(_22).css("height",$(window).height()-50);fh=true;}$(".caption",_22).css({"width":$(_22).width(),"display":"block"});if($(".caption",_22).height()>0){if(fh){$("#"+_17.popupId+"_inner").height($("#"+_17.popupId+"_inner").height()-$(".caption",_22).outerHeight());}}set($("#"+_17.popupId+"_content"));$("#"+_17.popupId+"_content").css("visibility","visible");};var set=function(_23){$(_23).css({"text-align":"left","float":"left","position":"fixed","z-index":"10001","visible":"hidden"});var _24=w2-$(_23).width()/2;var top=h2-$(_23).height()/2;$(_23).css({"left":_24,"top":top,"display":"none"}).fadeIn("1000");if(ie6){$(_23).css({"position":"absolute","top":(top+$(window).scrollTop())+"px"});}if(_1e){$(_23).css({"position":"absolute","top":(document.body["clientHeight"]/2-$(obj).height()/2+$(window).scrollTop())+"px"});}if(ie6){$("embed, object, select").css("visibility","hidden");}};var _25=function(){$("#"+_17.popupId+"_content").text(_17.errorText);_21();};var _26=function(){if(!_1b){$(_19).addClass(_17.hiddenClass).appendTo(_1a);}$("#"+_17.popupId).remove();$("#"+_17.popupId+"_content").remove();$("#"+_17.popupId+"_preloader").remove();if(ie6){$("embed, object, select").css("visibility","visible");}_17.callback();};if(_1c!="a"){_26();_20();_19=this;_1b=$(_19).is(":visible");_1a=$(_19).parent();if(_1b){_19=$(_19).clone();}$(_19).removeClass(_17.hiddenClass).appendTo("#"+_17.popupId+"_inner").show();_21();}else{$(this).bind("click",function(e){e.preventDefault();_26();_20();var _27=$(this).attr("href");var _28=_27.substr(_27.lastIndexOf(".")).toLowerCase();var _29;if($(this).hasClass("flash")){var _2a="<object width=\"100%\" height=\"100%\"><param name=\"allowfullscreen\" value=\"true\" /><param name=\"allowscriptaccess\" value=\"always\" /><param name=\"movie\" value=\""+_27+"\" /><embed src=\""+_27+"\" type=\"application/x-shockwave-flash\" allowfullscreen=\"true\" allowscriptaccess=\"always\" width=\"100%\" height=\"100%\"></embed></object>";$(_2a).appendTo("#"+_17.popupId+"_inner");if(cw==0){cw=600;}if(ch==0){ch=400;}_1f=true;}else{if(_28==".jpg"||_28==".jpeg"||_28==".gif"||_28==".png"||_28==".bmp"){var img=new Image();$(img).error(function(){_25();}).appendTo("#"+_17.popupId+"_inner");img.onload=function(){_21();_1f=false;img.onload=function(){};};img.src=_27+"?"+(new Date()).getTime()+" ="+(new Date()).getTime();}else{if(_27.charAt(0)=="#"){_19=$(_27).get(0);_1b=$(_19).is(":visible");_1a=$(_19).parent();if(_1b){_19=$(_19).clone();}$(_19).removeClass(_17.hiddenClass).appendTo("#"+_17.popupId+"_inner").show();_1f=true;}else{$("<iframe frameborder=\"0\" scrolling=\"auto\" style=\"width:100%;height:100%\" src=\""+_27+"\" />").appendTo("#"+_17.popupId+"_inner");if(cw==0){cw=900;}if(ch==0){ch=500;}_1f=true;}}}if(_1f){_21();}if($(this).hasClass("gallery")){var arr=$.data(this,"gallery");arr=eval(arr+"_arr");var _2b=$.data(this,"index");if(arr.length>1){$("<small id=\""+_17.popupId+"_counter\">"+(_2b+1)+"/"+arr.length+"</small>").appendTo("#"+_17.popupId+"_inner");$("<small id=\""+_17.popupId+"_gallery\"></small>").appendTo("#"+_17.popupId+"_inner");if(_2b!=0){$("<span id=\""+_17.popupId+"_prev\">"+_17.prevText+"</span>").appendTo("#"+_17.popupId+"_gallery").click(function(){_26();var obj=arr[_2b-1];$(obj).trigger("click");});}if(_2b<arr.length-1){$("<span id=\""+_17.popupId+"_next\">"+_17.nextText+"</span>").appendTo("#"+_17.popupId+"_gallery").click(function(){_26();var obj=arr[_2b+1];$(obj).trigger("click");});}}}});}});},external:function(_2c){var _2d={selector:"a"};if(typeof _2c=="string"){_2d.selector=_2c;}var _2c=$.extend(_2d,_2c);var _2e=window.location.hostname;_2e=_2e.replace("www.","").toLowerCase();return $(_2c.selector).each(function(){var _2f=$(this).attr("href").toLowerCase();if(_2f.indexOf("http://")!=-1&&_2f.indexOf(_2e)==-1){$(this).attr("target","_blank");$(this).addClass("external");}});},rotate:function(_30){var _31={selector:".rotate",initPause:0,pause:5000,randomize:false,callback:function(){}};if(typeof _30=="string"){_31.selector=_30;}var _30=$.extend(_31,_30);return $(_30.selector).each(function(){var obj=$(this);var _32=$(obj).children().length;var _33=0;function _34(){var ran=Math.floor(Math.random()*_32)+1;return ran;};function _35(){if(_30.randomize){var ran=_34();while(ran==_33){ran=_34();}_33=ran;}else{_33=(_33==_32)?1:_33+1;}$(obj).children().hide();$(obj).children(":nth-child("+_33+")").fadeIn("slow",function(){_30.callback();});};function _36(){_35();setInterval(_35,_30.pause);};if(_32>1){setTimeout(_36,_30.initPause);}});},cycle:function(_37){var _38={selector:".cycle",effect:"fade",initPause:0,pause:5000,callback:function(){}};if(typeof _37=="string"){_38.selector=_37;}var _37=$.extend(_38,_37);return $(_37.selector).each(function(){var obj=$(this);var _39=$(obj).children().length;var _3a=0;var _3b=-1;var z=1;var h=$(obj).children(":nth-child(1)").height();var w=$(obj).children(":nth-child(1)").width();var _3c=($(obj).css("position")=="absolute")?"absolute":"relative";$(obj).css({"position":_3c,"overflow":"hidden"}).height(h).width(w);$(obj).children().hide().css({"position":"absolute","top":"0","left":"0"});function _3d(){_3a=(_3a==_39)?1:_3a+1;_3b=(_3a==1)?_39:_3a-1;tempObj=$(obj).children(":nth-child("+_3a+")");prevObj=$(obj).children(":nth-child("+_3b+")");if(_37.effect=="slideUp"){$(prevObj).animate({top:h*(-1)},function(){$(prevObj).hide();$(tempObj).css({"z-index":z,"top":h}).show().animate({top:0});});}else{$(tempObj).css("z-index",z).fadeIn("slow",function(){$(prevObj).fadeOut("slow",function(){_37.callback();});});}z++;};function _3e(){_3d();setInterval(_3d,_37.pause);};setTimeout(_3e,_37.initPause);});},jump:function(_3f){var _40={selector:"a.jump",speed:500};if(typeof _3f=="string"){_40.selector=_3f;}var _3f=$.extend(_40,_3f);return $(_3f.selector).click(function(){var _41=$($(this).attr("href"));var _42=$(_41).offset().top;$("html,body").animate({scrollTop:_42},_3f.speed,"linear");});},showhide:function(_43){var _44={selector:".toggle"};if(typeof _43=="string"){_44.selector=_43;}var _43=$.extend(_44,_43);return $(_43.selector).each(function(){var _45;if($(this).hasClass("prev")){_45=$(this).prev().hide();}else{if($(this).hasClass("id")){_45=$(this).attr("href");_45=$(_45).hide();}else{_45=$(this).next().hide();}}$(this).css("cursor","pointer");$(this).toggle(function(){$(this).addClass("expanded");$(_45).slideDown();},function(){$(_45).slideUp();$(this).removeClass("expanded");});});},forms:function(_46){var _47={selector:"form",err:"This is required",errEmail:"Valid email address is required",errUrl:"URL is required",errPhone:"Phone number is required",notValidClass:"notvalid",validCallback:function(obj){},notValidCallback:function(obj){},ajax:false,ajaxParams:{}};function _48(obj){if($(obj).val()==""||_49(obj)){var _4a=($(obj).attr("title")!="")?$(obj).attr("title"):_46.err;_4b(obj,_4a);}};function _4c(_4d,_4e){if($(_4d).val()!=$(_4e).val()){var _4f=($(_4d).attr("title")!="")?$(_4d).attr("title"):_46.err;_4b(_4d,_4f);}};function _50(obj,_51){var _52,err;switch(_51){case "url":_52=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;err=_46.errUrl;break;case "phone":var _52=/[\d\s_-]/;err=_46.errPhone;break;default:_52=/^[^@]+@[^@]+.[a-z]{2,}$/;err=_46.errEmail;}var val=$(obj).val();if(val.search(_52)==-1||_49(obj)){var _53=($(obj).attr("title")!="")?$(obj).attr("title"):err;_4b(obj,_53);}};function _54(obj){var _55=$(obj).attr("class");var _56=$(":password[class=\""+_55+"\"], :password[class=\""+_55+" "+_46.notValidClass+"\"]");var _57=$(_56).index(obj);if(_57!=0){return _4c(obj,$(_56).get(0));}else{return _48(obj);}};function _49(obj){var _58=$("label[for="+$(obj).attr("id")+"]").text();return (_58==$(obj).val());};function _4b(obj,_59){var _5a=$(obj).parent();_5a.append("<span class=\"error\">"+_59+"</span>");$("span.error",_5a).hide().fadeIn("fast");$(obj).addClass(_46.notValidClass);valid=false;};$("input.label,textarea.label").each(function(){var _5b=$("label[for="+$(this).attr("id")+"]").text();$("label[for="+$(this).attr("id")+"]").css("display","none");$(this).val(_5b);$(this).focus(function(){if($(this).val()==_5b){$(this).val("");}});$(this).blur(function(){if($(this).val()==""){$(this).val(_5b);}});});if(typeof _46=="string"){_47.selector=_46;}var _46=$.extend(_47,_46);return $(_46.selector).each(function(){var _5c=this;$(_5c).submit(function(){$(".error",_5c).remove();$("."+_46.notValidClass,_5c).removeClass(_46.notValidClass);valid=true;$(":text.required",_5c).each(function(){if($(this).hasClass("email")){_50(this,"email");}else{if($(this).hasClass("url")){_50(this,"url");}else{if($(this).hasClass("phone")){_50(this,"phone");}else{_48(this);}}}});$(":password.required",_5c).each(function(){_54(this);});$("textarea.required",_5c).each(function(){_48(this);});$(":checkbox.required",_5c).each(function(){if(!$(this).attr("checked")){var _5d=($(this).attr("title")!="")?$(this).attr("title"):_46.err;_4b(this,_5d);}});if(valid){$(".label",_5c).each(function(){if(_49(this)){$(this).val("");}});}if(valid){_46.validCallback();}else{_46.notValidCallback();}if(_46.ajax){if(_46.ajaxParams.data==undefined){_46.ajaxParams.data=values(_5c);}if(valid){$.ajax(_46.ajaxParams);}return false;}else{return valid;}});});},accordion:function(_5e){var _5f={selector:".accordion",parent:"li",source:"h3",target:"p"};if(typeof _5e=="string"){_5f.selector=_5e;}var _5e=$.extend(_5f,_5e);return $(_5e.selector).each(function(){var obj=this;$(_5e.parent,this).each(function(){var _60=$(_5e.target,this);$(_5e.target,this).hide();$(_5e.source,this).css({"cursor":"pointer"}).click(function(){$(_5e.target,_5e.selector).slideUp();if(!$(_60).is(":visible")){$(_60).slideDown();}});});});},tabs:function(_61){var _62={selector:".tabs",selectedClass:"selected"};if(typeof _61=="string"){_62.selector=_61;}var _61=$.extend(_62,_61);return $(_61.selector).each(function(){var obj=this;var _63=Array();function _64(i){$.each(_63,function(_65,_66){$(_66).hide();});$(_63[i]).fadeIn();$(obj).children().removeClass(_61.selectedClass);selected=$(obj).children().get(i);$(selected).addClass(_61.selectedClass);};$("a",this).each(function(i){_63.push($(this).attr("href"));$(this).click(function(e){e.preventDefault();_64(i);});});_64(0);});}};})(jQuery);;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

Drupal.settings.stlSettings = Drupal.settings.stlSettings || {};
Drupal.behaviors.initFrontpage = {
  attach: function(context, settings) {

/**
$('.page-social .view-content').masonry({
  columnWidth: 24,
  itemSelector: '.views-row'
});
**/


/**
//javascript for testing new images for backgrounds
var i = 0;
var maxID = 0;
var scan = true;
while(scan){
  i++;
  if(i < 10){
    num = "0"+i;
  }else{
    num = ""+i;
  }
  var url = "/sites/all/files/temp/"+num+".jpg";
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  if(http.status!=404){
    maxID = i;
  }else{
    scan = false;
  }
}
i=0;
startbg = jQuery(".body-background .image").css("background-image");
previousbg = jQuery(".body-background .image").css("background-image");
jQuery(document).keydown(function(e){
  if(event.ctrlKey && (e.keyCode == 37 || e.keyCode == 39)){
    jQuery(".body-background .image").css("background-image",previousbg);
    if(event.ctrlKey && e.keyCode == 37){i--;}
    if(event.ctrlKey && e.keyCode == 39){i++;}
    if(i < 0){i = i + maxID + 1;}
    if(i > maxID){i = i - maxID - 1;}
    if(i < 10){
      num = "0"+i;
    }else{
      num = ""+i;
    }
    bg = "url('/sites/all/files/temp/"+num+".jpg')";
    if(jQuery("#page-title .background-slider").size()<1){
      jQuery("#page-title").append(jQuery("<span>").addClass("background-slider"));
    }
    if(i==0){
      bg = startbg;
      jQuery(".body-background .image").css("background-image",bg+","+jQuery(".body-background .image").css("background-image"));
      jQuery("#page-title .background-slider").html("");
    } else {
      jQuery(".body-background .image").css("background-image",bg+","+jQuery(".body-background .image").css("background-image"));
      jQuery("#page-title .background-slider").html(" (with background "+num+")");
    }
    previousbg = bg;
  }
});
**/


    //Parallax on Konami Code
    if (Drupal.settings.cmDetect.device == 3) {
      var keys = [];
      var konami = "38,38,40,40,37,39,37,39,66,65";
      jQuery(document).keydown(function(e){
        keys.push(e.keyCode);
        if(keys.toString().indexOf(konami) >= 0 ){
          // User entered Konami Code, do something cool!!!
          jQuery(document).scroll(function(){
            jQuery(".not-front .body-background .image").css("top",jQuery(document).scrollTop()/2+"px");
            jQuery(".not-front #eyebrow").css("top","-"+jQuery(document).scrollTop()/3+"px");
            jQuery(".not-front #header #logo-wrapper").css("position","relative").css("top","-"+jQuery(document).scrollTop()/3+"px");
            jQuery(".not-front #header #navigation").css("top",57-jQuery(document).scrollTop()/3+"px");
          });
          kkeys = [];
        }
      });
    }
    // SPLASH Box
    if ($('.front #splash').size()) {
      var splash_box = $('.front #splash');

      if (undefined === Drupal.settings.stlSettings.splash) {
        Drupal.settings.stlSettings.splash = {
          'width': splash_box.width(),
          'height': splash_box.height()
        };
      }
      $('#block-views-frontpage-splash-block .expand', context).click(function() {
        var label = $(this);
      
        splash_box.height(Drupal.settings.stlSettings.splash.height);
        if (splash_box.hasClass('expanded')) {
          Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": "frontpage_splash-block", "force": true });
          splash_box.animate({'width': Drupal.settings.stlSettings.splash.width}).removeClass('expanded');
          $('.summary.expanded-slide', splash_box).hide();
          $('.views-slideshow-controls-bottom', splash_box).animate({'width': Drupal.settings.stlSettings.splash.width});
          $('#block-views-frontpage-splash-block .expand').text(Drupal.t('+ Expand to learn more'));
        } else {
          Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": "frontpage_splash-block", "force": true });
          splash_box.animate({'width': '630px'}).addClass('expanded');
          $('.views-slideshow-controls-bottom', splash_box).animate({'width': '630px'}, function() {
            $('.summary.expanded-slide', splash_box).show();
          });
          $('#block-views-frontpage-splash-block .expand').text(Drupal.t('- Return'));
        }
        return false;
      });

      /*splash_box.hover(function() {
      }, function() {
        splash_box.animate({'width': Drupal.settings.stlSettings.splash.width}).removeClass('expanded');
        $('.views-slideshow-controls-bottom', splash_box).animate({'width': Drupal.settings.stlSettings.splash.width});
        $('#block-views-frontpage-splash-block .views-row .expand', context).text(Drupal.t('+ Expand to learn more'));
      });*/
    }

    // FRONTPAGE BOXES
    $('#block-boxes-about p span, #block-boxes-news p span, #block-boxes-spotlight p span').each(function() {
      var href = jQuery(this).attr('rel');
      $(this).click(function() {
        $(window).scrollTo(href, 500);
        return false;
      }).parents('.block').click(function() {
        $(window).scrollTo(href, 500);
        return false;
      });
    });

    // ADMISSIONS BOXES
    $('.section-general-styles-front .header-boxes .block').click(function() {
      window.location.href = $(this).find('.boxes-box-content a').attr('href');
    });

    // PAGE SLIDER
    Drupal.settings.stlSettings.sliderDirection = 'bottom';
    $('#block-boxes-slide-page .slide-page-down').click(function() {
      slidePage('down');
      return false;
    });
    $('#block-boxes-slide-page .slide-page-up').click(function() {
      slidePage('up');
      return false;
    });
        
    // SEARCH -- Appending a control to expand/collapse the search section
    if (Drupal.settings.cmDetect && Drupal.settings.cmDetect.device && Drupal.settings.cmDetect.device != 3) {
    	// hiding the search button because other device will directly use the "search button"
    	$('#block-search-form .form-submit').hide();
    	$('#search-block-form .form-actions').append('<input type="button" id="search-control" value="" />');
    	
	    $('#search-control').click(function() {
	        var eyebrow = $('#eyebrow');
	        if (eyebrow.hasClass('exposed')) {
	          $('#block-search-form .form-text').hide();
	          eyebrow.animate({height: '0'}, 500).removeClass('exposed');
	          $('#block-search-form .form-submit').css('background-position', 'center 6px');
	          $('#block-search-form .form-type-textfield label').css('display', 'none');
	        } else {
	          eyebrow.animate({height: '125px'}, 500, function() {
	            $('#block-search-form .form-text').show();
	            $('#block-search-form .form-submit').css('background-position', 'center -54px');
	          $('#block-search-form .form-type-textfield label').css('display', 'block');
	          }).addClass('exposed');
	        }
	    });
	  }
	  
	  // search fix for reponsive 786 version for desktop, issue redirect to search page when search button is clicked
	  if (Drupal.settings.cmDetect.device == 3) {
			if ($('body').width() < 871) {
				$('#block-search-form .form-submit').click(function() {
					document.location = Drupal.settings.basePath + 'search/all';
					return false;
				})
			}
				  
			var myInterval = false; 
			var $win = $(window); 
			var dimensions = [ $win.width(), $win.height() ]; 
			
			$(window).resize(function() { 			
				if( !myInterval ) 
				{
					myInterval  = setInterval( function() {
					if( dimensions[ 0 ] === $win.width() && dimensions[ 1 ] ===  $win.height() )
					{   
						clearInterval( myInterval ); 
						myInterval = false;					
						if ($('body').width() < 871) {
							$('#block-search-form .form-submit').click(function() {
								document.location = Drupal.settings.basePath + 'search/all';
								return false;
							})
						}
						else {
							$('#block-search-form .form-submit').unbind('click');
						}
					}
					else
					{
						dimensions[ 0 ] =    $win.width();
						dimensions[ 1 ] =    $win.height();
					}
				}, 64 );
				}
			});
	  }

    // HISTORY 
    $('#block-views-history-block .next, #block-views-history-block .prev').click(function() {
      Drupal.viewsSlideshow.action({'slideshowID': 'history_images-block_1', 'action': 'nextSlide'});
    });

    // FRONTPAGE MENU 
    if (Drupal.settings.cmDetect && Drupal.settings.cmDetect.device && Drupal.settings.cmDetect.device == 1) {
      $('#block-menu-menu-frontpage-menu .menu li.last').prev().find('a').css('border-bottom', '1px dashed transparent');
    }

    // BUTTON TITLE MENU
    // WJ switched this .button-title for .mobile-menu
    $('.mobile-menu').find('.quicktabs-wrapper > .item-list, .menu').each(function() {
      var el = $(this);
      $(this).find('a').click(function() {
        if($('body').width() < 871){
          el.hide();
        }        
        $('.button-title .block-title').removeClass('active');
      });
    });
    $('.button-title .block-title').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').parent().find('.quicktabs-wrapper > .item-list, .menu').hide();
      } else {
        $(this).addClass('active').parent().find('.quicktabs-wrapper > .item-list, .menu').show();
      } 
    });

    // MAIN MENU
    $('#block-system-main-menu, #block-menu-menu-sluwire-menu').each(function() {
      var menu = jQuery(this);
      $('.block-title', menu).click(function() {
        if (!$(this).hasClass('exposed')) {
          $(this).addClass('exposed');
          $('> .menu', menu).slideDown('slow');
        } else {
          $(this).removeClass('exposed');
          $('> .menu', menu).slideUp('slow');
        }
      });
      $('.menu .expanded > a', menu).each(function() {
        var icon = $('<img src="' + Drupal.settings.basePath + '/sites/all/themes/stlawrence/images/menu-plus.png" class="expand-icon"/>');
        icon.click(function() {
          if (!$(this).hasClass('exposed')) {
            $(this).addClass('exposed').next().slideDown('slow');
          } else {
            $(this).removeClass('exposed').next().slideUp('slow');
          }
        });
        $(this).after(icon);
      });
    });
    if (!$('body').hasClass('front')) { // not the frontpage
      jQuery('#nice-menu-1 a.active:not(.boxes-processed)').each(function() {
        var container = jQuery(this).closest('.container');
        if (container) {
          container.parent().addClass('active-trail');
        } else {
          jQuery(this).closest('.menuparent').addClass('active-trail');
        }
      });
      jQuery('#block-system-main-menu .menu a.active:not(.boxes-processed)').each(function() {
        jQuery(this).closest('li').addClass('active-trail');
      });
    }
    if (Drupal.settings.cmDetect && Drupal.settings.cmDetect.device && Drupal.settings.cmDetect.device == 1 && !$('body').hasClass('front')) {
      var text = $('#block-system-main-menu li.active-trail > a').first().text(); 
      if (text) {
        $('#block-system-main-menu .block-title').text(text);
      }
    }

    // NEWS PAGE
    var img1 = $('.view-news-article.view-display-id-page_2 img'),
        img2 = $('#block-views-news-article-block-5 img');
    if (img1) {
     img1.load(function() {
       setTimeout("jQuery('.view-news-article.view-display-id-page_2, #block-views-news-article-block-5').equalHeightColumns();", 500);
     });
    } 
    if (img2) {
     img2.load(function() {
      setTimeout("jQuery('.view-news-article.view-display-id-page_2, #block-views-news-article-block-5').equalHeightColumns();", 500);
     });
    } 
    setTimeout("jQuery('.view-news-article.view-display-id-page_2, #block-views-news-article-block-5').equalHeightColumns();", 500);

    // FACULTY PAGE / select
    if (jQuery.browser.mozilla || jQuery.browser.msie) {
      $('#views-exposed-form-staff-page select').css('opacity', '0').after('<div class="pseudo-select">By Department</div>');
      $('#views-exposed-form-staff-page select').change(function() {
        jQuery(this).next().text(jQuery('#views-exposed-form-staff-page select option:selected').text());
      });
    }

    // FRONTPAGE POPUPs / mobile
    if (Drupal.settings.cmDetect && Drupal.settings.cmDetect.device && Drupal.settings.cmDetect.device == 1) {
      jQuery('#block-quicktabs-frontpage .quicktabs-tabs.quicktabs-style-stl-tabs li a').each(function() {
        var id = '#' + jQuery(this).attr('id').replace('-tab-', '-tabpage-');
        jQuery(this).addClass('popup').attr({'href': id});
      });
      jQuery.easy.popup();
    }

    // SLUWire FRONTPAGE
    if ($('.section-sluwire-front').size() && jQuery.fn.masonry != undefined) {
      $('.section-sluwire-front .region-content-bottom').attr('id', 'content-bottom');
      $('#content-bottom').masonry({
        itemSelector: '.sluwire-content-box',
        gutterWidth: 10
      });
    }

    //News Category page
    if($(".page-news-category").size()){
      var today = new Date();
      var nextMonth = today.getMonth()+2;
      if(nextMonth<10){
        nextMonth = "0"+nextMonth;
      }
      if($(".date-next a").attr("href").indexOf(today.getFullYear()+"-"+nextMonth) !== -1){
        $(".date-next a").hide();
      }
    }

    if (Drupal.settings.cmDetect && Drupal.settings.cmDetect.device && Drupal.settings.cmDetect.device == 1) {
      $('.sluwire-box, .sluwire-content-box').each(function() {
        var el = $(this);
        el.find('.block-title').click(function() {
          if (el.hasClass('active')) {
            el.removeClass('active').find('> .menu, .view').hide(200);
          } else {
            el.addClass('active').find('> .menu, .view').show(200);
          }
        });
      });
    }

    // SECONDARY LEVEL
    $('#block-menu-menu-useful-links > .menu').each(function () {
      $('ul', this).hide();
      $('li.expanded').click(function() {
        var el = $(this);
        if (!el.hasClass('collapsed')) {
          el.addClass('collapsed').find('> ul').show(200);
        } else {
          el.removeClass('collapsed').find('> ul').hide(200);
        }
        return false;
      });
    });

    // IE placeholder fix
    if ($.browser.msie) {
      $('input[placeholder]').each(function(){          
        var input = $(this);
        input.val(input.attr('placeholder'));
        input.focus(function(){
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
        });
        input.blur(function(){
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.val(input.attr('placeholder'));
          }
        });
      });
    }
  }
};

function showSubMenu(){ $(this).find('.container').fadeIn('fast'); }
function hideSubMenu(){ $(this).find('.container').fadeOut('slow'); }

Drupal.behaviors.menuHover = {
  attach: function(context, settings) {
    var settings = {
      sensitivity: 4,
      interval: 75,
      over: showSubMenu,
      out: hideSubMenu
    }; 
    if (jQuery.fn.hoverIntent) {
      jQuery("#block-nice-menus-1 ul li.menuparent").hover(function(e) {
	 e.preventDefault();
	 $(this).find('.container').hide();
      });
      jQuery("#block-nice-menus-1 ul li.menuparent").hoverIntent(settings);
    }
  }
};
if(Drupal.viewsSlideshowPager){
 Drupal.viewsSlideshowPager.transitionBegin = function (options) {
  try {
//    if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
      if (options.slideshowID == 'frontpage_splash-block' || options.slideshowID == 'frontpage_splash-block_1') {
        if(jQuery('#widget_pager_bottom_frontpage_splash-block .views-slideshow-pager-field-item.active').size() ||
           jQuery('#widget_pager_bottom_frontpage_splash-block_1 .views-slideshow-pager-field-item.active').size()){ 
          jQuery('.body-background .image').fadeOut(2000);
          jQuery('.body-background .image-' + options.slideNum).fadeIn(2000);
	}
        jQuery('#widget_pager_bottom_frontpage_splash-block .views-slideshow-pager-field-item, #widget_pager_bottom_frontpage_splash-block_1 .views-slideshow-pager-field-item').removeClass('active');
	jQuery('#views_slideshow_pager_field_item_bottom_frontpage_splash-block_' +  options.slideNum).addClass('active');
	jQuery('#views_slideshow_pager_field_item_bottom_frontpage_splash-block_1_' +  options.slideNum).addClass('active');
      }
//    }
      //jfl

      if (options.slideshowID == 'slide_show-block') {
        jQuery('#widget_pager_bottom_slide_show-block .views-slideshow-pager-field-item').removeClass('active');
        jQuery('#views_slideshow_pager_field_item_bottom_slide_show-block_' +  options.slideNum).addClass('active');
        jQuery(".view-id-slide_show .pager-item").hide();
	jQuery(".view-id-slide_show .pager-item.active").show();
	jQuery(".view-id-slide_show .pager-item.active").prev().show();
	jQuery(".view-id-slide_show .pager-item.active").next().show();
	if(jQuery(".view-id-slide_show .pager-item:visible").size() < 3){
	  jQuery(".view-id-slide_show .pager-item.active").next().next().show();
	}
	if(jQuery(".view-id-slide_show .pager-item:visible").size() < 3){
	  jQuery(".view-id-slide_show .pager-item.active").prev().prev().show();
	}
      }

  }
  catch(err) {
    // Don't need to do anything on error.
  }
 };
}

jQuery(window).resize(function() {
  if (jQuery('body').width() < 1150) {
    jQuery('#block-boxes-slide-page').hide();
  } else {
    jQuery('#block-boxes-slide-page').show();
  }
});

jQuery(window).scroll(function() {
  var $getObject = jQuery('#block-boxes-slide-page');
  var options = {
    easing: 'linear',
    duration: 300,
    queue: false
  };
  var offset = 50;

  if ($getObject.size() > 0) {
    if(jQuery(window).scrollTop() > (jQuery($getObject).parent().offset().top) + offset) {
      jQuery($getObject).animate({ top: (jQuery(window).scrollTop() - jQuery($getObject).parent().offset().top) + offset + "px" }, 
        { queue: options.queue, easing: options.easing, duration: options.duration }
      );
    }
    else if(jQuery(window).scrollTop() < (jQuery($getObject).parent().offset().top) + offset){
      jQuery($getObject).animate({ top: "-40px" },
        { queue: options.queue, easing: options.easing, duration: options.duration }
      );
    }
  }
});

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && ((elemTop >= docViewTop)));
}

function slidePage(direction) {
  var elements = ['#eyebrow', '#block-views-about-st-lawrence-block', '#block-views-news-article-block-1', '#block-views-spotlight-block', '#bottom-wrapper'];
  var unknown_element = 0;
  var scrollup_check = 0;
  var end_scrollup_check = 0;
 
  if (direction == 'up') {
    elements = elements.reverse();
  }

  for (element in elements) {
    if (isScrolledIntoView(elements[element])) {
      element = element*1 + 1;
      unknown_element = 0;
      if (!(direction=='up')) {
        break;
      }
      else {
    	if (scrollup_check) {
    	  break;	
    	}
    	scrollup_check = 1;
      }
    } else {
      unknown_element = 1;
      if (scrollup_check) {
    	 end_scrollup_check = 1;  
      }
    }
    
    if (direction == 'up' && scrollup_check && end_scrollup_check) {
      break;
    }
  }

  if (unknown_element == 1) {
    if (!(direction=='up')) {
      jQuery(window).scrollTo('#block-views-about-st-lawrence-block', 500);
    }
    else {
      jQuery(window).scrollTo('#eyebrow', 500);
    }
  } else {
    jQuery(window).scrollTo(elements[element], 500);
  }
}

})(jQuery, Drupal, this, this.document);
;
