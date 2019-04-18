/**
 * jquery.detectSwipe v2.1.3
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad and Android
 * http://github.com/marcandre/detect_swipe
 * Based on touchwipe by Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function e(){this.removeEventListener("touchmove",f),this.removeEventListener("touchend",e),d=!1}function f(f){if(a.detectSwipe.preventDefault&&f.preventDefault(),d){var k,g=f.touches[0].pageX,h=f.touches[0].pageY,i=b-g,j=c-h;Math.abs(i)>=a.detectSwipe.threshold?k=i>0?"left":"right":Math.abs(j)>=a.detectSwipe.threshold&&(k=j>0?"up":"down"),k&&(e.call(this),a(this).trigger("swipe",k).trigger("swipe"+k))}}function g(a){1==a.touches.length&&(b=a.touches[0].pageX,c=a.touches[0].pageY,d=!0,this.addEventListener("touchmove",f,!1),this.addEventListener("touchend",e,!1))}function h(){this.addEventListener&&this.addEventListener("touchstart",g,!1)}a.detectSwipe={version:"2.1.2",enabled:"ontouchstart"in document.documentElement,preventDefault:!0,threshold:20};var b,c,d=!1;a.event.special.swipe={setup:h},a.each(["left","up","down","right"],function(){a.event.special["swipe"+this]={setup:function(){a(this).on("swipe",a.noop)}}})});
