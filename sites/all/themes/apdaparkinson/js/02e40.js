(function(){window.wpfront_scroll_top=function(d){var e=jQuery;var a=e("#wpfront-scroll-top-container").css("opacity",0);var f={};switch(d.location){case 1:f.right=d.marginX+"px";f.bottom=d.marginY+"px";break;case 2:f.left=d.marginX+"px";f.bottom=d.marginY+"px";break;case 3:f.right=d.marginX+"px";f.top=d.marginY+"px";break;case 4:f.left=d.marginX+"px";f.top=d.marginY+"px";break}a.css(f);if(d.button_width==0){d.button_width="auto"}else{d.button_width+="px"}if(d.button_height==0){d.button_height="auto"}else{d.button_height+="px"}a.children("img").css({width:d.button_width,height:d.button_height});if(d.hide_iframe){if(e(window).attr("self")!==e(window).attr("top")){return}}var g=false;var b=0;var h=function(){clearTimeout(b);if(a.is(":visible")){a.stop().fadeTo(d.button_fade_duration,0,function(){a.hide();g=false})}};var j=function(){clearTimeout(b);b=setTimeout(function(){h()},d.auto_hide_after*1000)};var i=false;var c=function(){if(i){return}i=true;if(e(window).scrollTop()>d.scroll_offset){a.stop().css("opacity",g?1:d.button_opacity).show();if(!g&&d.auto_hide){j()}}else{h()}i=false};e(window).scroll(c);e(document).scroll(c);a.hover(function(){clearTimeout(b);g=true;e(this).css("opacity",1)},function(){e(this).css("opacity",d.button_opacity);g=false;j()}).click(function(){e("html, body").animate({scrollTop:0},d.scroll_duration);return false})}})();
;/*
 * SVGeezy.js
 *
 * Copyright 2016, Ben Howdle http://benhowdle.im
 *
 * Date: Sun Aug 26 20:38 2012 GMT
 */
/*
	//call like so, pass in a class name that you don't want it to check and a filetype to replace .svg with
	svgeezy.init('nocheck', 'png');
*/
window.svgeezy=function(){return{init:function(t,i){this.avoid=t||false;this.filetype=i||"png";this.svgSupport=this.supportsSvg();if(!this.svgSupport){this.images=document.getElementsByTagName("img");this.imgL=this.images.length;this.fallbacks()}},fallbacks:function(){while(this.imgL--){if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var t=this.images[this.imgL].getAttribute("src");if(t===null){continue}if(this.getFileExt(t)=="svg"){var i=t.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",i)}}}},getFileExt:function(t){var i=t.split(".").pop();if(i.indexOf("?")!==-1){i=i.split("?")[0]}return i},hasClass:function(t,i){return(" "+t.className+" ").indexOf(" "+i+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();

;(function(){var container,button,menu,links,i,len;container=document.getElementById('site-navigation');if(!container){return;}
button=container.getElementsByTagName('button')[0];if('undefined'===typeof button){return;}
menu=container.getElementsByTagName('ul')[0];if('undefined'===typeof menu){button.style.display='none';return;}
menu.setAttribute('aria-expanded','false');if(-1===menu.className.indexOf('nav-menu')){menu.className+=' nav-menu';}
button.onclick=function(){if(-1!==container.className.indexOf('toggled')){container.className=container.className.replace(' toggled','');button.setAttribute('aria-expanded','false');menu.setAttribute('aria-expanded','false');}else{container.className+=' toggled';button.setAttribute('aria-expanded','true');menu.setAttribute('aria-expanded','true');}};links=menu.getElementsByTagName('a');for(i=0,len=links.length;i<len;i++){}
function toggleFocus(){var self=this;while(-1===self.className.indexOf('nav-menu')){if('li'===self.tagName.toLowerCase()){if(-1!==self.className.indexOf('focus')){}else{}}
self=self.parentElement;}}
(function(container){var touchStartFn,i,parentLink=container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');if('ontouchstart'in window){touchStartFn=function(e){var menuItem=this.parentNode,i;if(!menuItem.classList.contains('focus')){for(i=0;i<menuItem.parentNode.children.length;++i){if(menuItem===menuItem.parentNode.children[i]){continue;}}}else{}};for(i=0;i<parentLink.length;++i){parentLink[i].addEventListener('touchstart',touchStartFn,false);}}}(container));})();;(function(){var isIe=/(trident|msie)/i.test(navigator.userAgent);if(isIe&&document.getElementById&&window.addEventListener){window.addEventListener('hashchange',function(){var id=location.hash.substring(1),element;if(!(/^[A-z0-9_-]+$/.test(id))){return;}
element=document.getElementById(id);if(element){if(!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))){element.tabIndex=-1;}
element.focus();}},false);}})();