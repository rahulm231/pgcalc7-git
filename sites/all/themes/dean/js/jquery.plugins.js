var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */
(function(a){var b=a({});a.subscribe=function(){b.on.apply(b,arguments)},a.unsubscribe=function(){b.off.apply(b,arguments)},a.publish=function(){b.trigger.apply(b,arguments)}})(jQuery);

/**
 * jquery.placeholder http://matoilic.github.com/jquery.placeholder
 *
 * @version v0.2.4
 * @author Mato Ilic <info@matoilic.ch>
 * @copyright 2013 Mato Ilic
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(b,f,i){function l(){b(this).find(c).each(j)}function m(a){for(var a=a.attributes,b={},c=/^jQuery\d+/,e=0;e<a.length;e++)if(a[e].specified&&!c.test(a[e].name))b[a[e].name]=a[e].value;return b}function j(){var a=b(this),d;a.is(":password")||(a.data("password")?(d=a.next().show().focus(),b("label[for="+a.attr("id")+"]").attr("for",d.attr("id")),a.remove()):a.realVal()==a.attr("placeholder")&&(a.val(""),a.removeClass("placeholder")))}function k(){var a=b(this),d,c;placeholder=a.attr("placeholder");
    b.trim(a.val()).length>0||(a.is(":password")?(c=a.attr("id")+"-clone",d=b("<input/>").attr(b.extend(m(this),{type:"text",value:placeholder,"data-password":1,id:c})).addClass("placeholder"),a.before(d).hide(),b("label[for="+a.attr("id")+"]").attr("for",c)):(a.val(placeholder),a.addClass("placeholder")))}var g="placeholder"in f.createElement("input"),h="placeholder"in f.createElement("textarea"),c=":input[placeholder]";b.placeholder={input:g,textarea:h};!i&&g&&h?b.fn.placeholder=function(){}:(!i&&g&&
    !h&&(c="textarea[placeholder]"),b.fn.realVal=b.fn.val,b.fn.val=function(){var a=b(this),d;if(arguments.length>0)return a.realVal.apply(this,arguments);d=a.realVal();a=a.attr("placeholder");return d==a?"":d},b.fn.placeholder=function(){this.filter(c).each(k);return this},b(function(a){var b=a(f);b.on("submit","form",l);b.on("focus",c,j);b.on("blur",c,k);a(c).placeholder()}))})(jQuery,document,window.debug);


/*
* Copyright (c) 2011 Thomas Billenstein, http://thomasbillenstein.com/jTweetsAnywhere
*/

(function(){function e(e){for(var e=e||window.event,g=e.target||e.srcElement,i,k;g&&"a"!==g.nodeName.toLowerCase();)g=g.parentNode;if(g&&"a"===g.nodeName.toLowerCase()&&g.href&&(i=g.href.match(a)))i=Math.round(f/2-c/2),k=0,h>d&&(k=Math.round(h/2-d/2)),window.open(g.href,"intent",b+",width="+c+",height="+d+",left="+i+",top="+k),e.returnValue=!1,e.preventDefault&&e.preventDefault()}if(!window.__twitterIntentHandler){var a=/twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,b="scrollbars=yes,resizable=yes,toolbar=no,location=yes",
    c=550,d=420,h=screen.height,f=screen.width;document.addEventListener?document.addEventListener("click",e,!1):document.attachEvent&&document.attachEvent("onclick",e);window.__twitterIntentHandler=!0}})();
(function(){if(!window.__JTA_I18N)JTA_I18N=function(){function e(a,c){function d(a,b,d){var e=c?c[a]||a:a;1!==b&&"object"===typeof e&&(e=h(a,e,b));if(e&&d)for(p in d)e=e.replace(p,c?c[d[p]]||d[p]:d[p]);return e}function h(a,b,c){for(pat in b){var d=/(\d+)\s*-\s*(\d+)/;if(d=d.exec(pat)){var e=d[2];if(c>=d[1]&&c<=e)return b[pat]}d=/([<>]=?)\s*(\d+)/;if(d=d.exec(pat)){e=d[1];d=d[2];if(">"===e&&c>d)return b[pat];if(">="===e&&c>=d)return b[pat];if("<"===e&&c<d)return b[pat];if("<="===e&&c<=d)return b[pat]}d=
    /\s*,\s*/;if(d=pat.split(d))for(e=0;e<d.length;e++)if(c===~~d[e])return b[pat]}return a}this.getLocale=function(){return a};this._=this.get=function(a,b){return d(a,1,b)};this.__=this.nget=function(a,b,c,e){return 1===c?d(a,1,e):d(b,c,e)}}var a={};return{addResourceBundle:function(b,c,d){a[b]||(a[b]={});a[b][c]=d},getResourceBundle:function(b,c){return new e(c,a[b]?a[b][c]:null)}}}(),window.__JTA_I18N=!0})();JTA_I18N.addResourceBundle("jTweetsAnywhere","en",{$$monthNames:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",")});
(function(e){e.fn.jTweetsAnywhere=function(a){var b=e.extend({username:"tbillenstein",list:null,searchParams:null,count:0,tweetProfileImagePresent:null,tweetFilter:defaultTweetFilter,showTweetFeed:!0,showFollowButton:!1,showConnectButton:!1,showLoginInfo:!1,showTweetBox:!1,locale:"en",tweetDataProvider:defaultTweetDataProvider,rateLimitDataProvider:defaultRateLimitDataProvider,mainDecorator:defaultMainDecorator,tweetFeedDecorator:defaultTweetFeedDecorator,tweetDecorator:defaultTweetDecorator,tweetProfileImageDecorator:defaultTweetProfileImageDecorator,
    tweetBodyDecorator:defaultTweetBodyDecorator,tweetUsernameDecorator:defaultTweetUsernameDecorator,tweetTextDecorator:defaultTweetTextDecorator,tweetAttributesDecorator:defaultTweetAttributesDecorator,tweetTwitterBirdDecorator:defaultTweetTwitterBirdDecorator,tweetTimestampDecorator:defaultTweetTimestampDecorator,tweetSourceDecorator:defaultTweetSourceDecorator,tweetGeoLocationDecorator:defaultTweetGeoLocationDecorator,tweetInReplyToDecorator:defaultTweetInReplyToDecorator,tweetRetweeterDecorator:defaultTweetRetweeterDecorator,
    tweetActionsDecorator:defaultTweetActionsDecorator,tweetActionReplyDecorator:defaultTweetActionReplyDecorator,tweetActionRetweetDecorator:defaultTweetActionRetweetDecorator,tweetActionFavoriteDecorator:defaultTweetActionFavoriteDecorator,tweetFeedControlsDecorator:defaultTweetFeedControlsDecorator,tweetFeedControlsMoreBtnDecorator:defaultTweetFeedControlsMoreBtnDecorator,tweetFeedControlsPrevBtnDecorator:defaultTweetFeedControlsPrevBtnDecorator,tweetFeedControlsNextBtnDecorator:defaultTweetFeedControlsNextBtnDecorator,
    tweetFeedAutorefreshTriggerDecorator:defaultTweetFeedAutorefreshTriggerDecorator,tweetFeedAutorefreshTriggerContentDecorator:defaultTweetFeedAutorefreshTriggerContentDecorator,connectButtonDecorator:defaultConnectButtonDecorator,loginInfoDecorator:defaultLoginInfoDecorator,loginInfoContentDecorator:defaultLoginInfoContentDecorator,followButtonDecorator:defaultFollowButtonDecorator,tweetBoxDecorator:defaultTweetBoxDecorator,linkDecorator:defaultLinkDecorator,usernameDecorator:defaultUsernameDecorator,
    hashtagDecorator:defaultHashtagDecorator,loadingDecorator:defaultLoadingDecorator,errorDecorator:defaultErrorDecorator,noDataDecorator:defaultNoDataDecorator,tweetTimestampFormatter:defaultTweetTimestampFormatter,tweetTimestampTooltipFormatter:defaultTweetTimestampTooltipFormatter,tweetVisualizer:defaultTweetVisualizer,loadingIndicatorVisualizer:defaultLoadingIndicatorVisualizer,autorefreshTriggerVisualizer:defaultAutorefreshTriggerVisualizer,onDataRequestHandler:defaultOnDataRequestHandler,onRateLimitDataHandler:defaultOnRateLimitDataHandler,
    onOptionsInitializingHandler:defaultOnOptionsInitializingHandler,_tweetFeedConfig:{autoConformToTwitterStyleguide:!1,showTwitterBird:!0,showTimestamp:{refreshInterval:0},showSource:!1,showGeoLocation:!0,showInReplyTo:!0,showActionReply:!1,showActionRetweet:!1,showActionFavorite:!1,showProfileImages:null,showUserScreenNames:null,showUserFullNames:!1,expandHovercards:!1,includeRetweets:!0,paging:{mode:"none",_limit:0,_offset:0},autorefresh:{mode:"none",interval:60,duration:3600,max:-1,_startTime:null,
        _triggerElement:null},_pageParam:0,_maxId:null,_recLevel:0,_noData:!1,_clearBeforePopulate:!1},_tweetBoxConfig:{counter:!0,width:515,height:65,label:null,defaultContent:"",onTweet:function(){}},_connectButtonConfig:{size:"medium"},_baseSelector:null,_baseElement:null,_tweetFeedElement:null,_tweetFeedControlsElement:null,_followButtonElement:null,_loginInfoElement:null,_connectButtonElement:null,_tweetBoxElement:null,_loadingIndicatorElement:null,_noDataElement:null,_tweetsCache:[],_autorefreshTweetsCache:[],
    _stats:{dataRequestCount:0,rateLimitPreventionCount:0,rateLimit:{remaining_hits:150,hourly_limit:150}},_resourceBundle:null},a);b._baseSelector=this.selector;b.onOptionsInitializingHandler(b);setupOptions(b);if(b.mainDecorator)return e.ajaxSetup({cache:!0}),this.each(function(){b._baseElement=e(this);b._tweetFeedElement=b.tweetFeedDecorator?e(b.tweetFeedDecorator(b)):null;b._tweetFeedControlsElement=b.tweetFeedControlsDecorator?e(b.tweetFeedControlsDecorator(b)):null;b._followButtonElement=b.followButtonDecorator?
    e(b.followButtonDecorator(b)):null;b._tweetBoxElement=b.tweetBoxDecorator?e(b.tweetBoxDecorator(b)):null;b._connectButtonElement=b.connectButtonDecorator?e(b.connectButtonDecorator(b)):null;b._loginInfoElement=b.loginInfoDecorator?e(b.loginInfoDecorator(b)):null;b.mainDecorator(b);populateTweetFeed(b);populateAnywhereControls(b);bindEventHandlers(b);setupAutorefresh(b)})};defaultMainDecorator=function(a){a._tweetFeedElement&&a._baseElement.append(a._tweetFeedElement);a._tweetFeedControlsElement&&
a._baseElement.append(a._tweetFeedControlsElement);a._connectButtonElement&&a._baseElement.append(a._connectButtonElement);a._loginInfoElement&&a._baseElement.append(a._loginInfoElement);a._followButtonElement&&a._baseElement.append(a._followButtonElement);a._tweetBoxElement&&a._baseElement.append(a._tweetBoxElement)};defaultTweetFeedControlsDecorator=function(a){var b="";"prev-next"==a._tweetFeedConfig.paging.mode?(a.tweetFeedControlsPrevBtnDecorator&&(b+=a.tweetFeedControlsPrevBtnDecorator(a)),
    a.tweetFeedControlsNextBtnDecorator&&(b+=a.tweetFeedControlsNextBtnDecorator(a))):"endless-scroll"!=a._tweetFeedConfig.paging.mode&&a.tweetFeedControlsMoreBtnDecorator&&(b+=a.tweetFeedControlsMoreBtnDecorator(a));return'<div class="jta-tweet-list-controls">'+b+"</div>"};defaultTweetFeedControlsMoreBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-more">'+a._resourceBundle._("More")+"</span>"};defaultTweetFeedControlsPrevBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-prev">'+
    a._resourceBundle._("Prev")+"</span>"};defaultTweetFeedControlsNextBtnDecorator=function(a){return'<span class="jta-tweet-list-controls-button jta-tweet-list-controls-button-next">'+a._resourceBundle._("Next")+"</span>"};defaultTweetFeedAutorefreshTriggerDecorator=function(a,b){var c="";b.tweetFeedAutorefreshTriggerContentDecorator&&(c=b.tweetFeedAutorefreshTriggerContentDecorator(a,b));return'<li class="jta-tweet-list-autorefresh-trigger">'+c+"</li>"};defaultTweetFeedAutorefreshTriggerContentDecorator=
    function(a,b){return'<span class="jta-tweet-list-autorefresh-trigger-content">'+b._resourceBundle.__("%count% new tweet","%count% new tweets",a,{"%count%":a})+"</span>"};defaultTweetFeedDecorator=function(){return'<ul class="jta-tweet-list"></ul>'};defaultTweetDecorator=function(a,b){var c="";b._tweetFeedConfig.showProfileImages&&(c+=b.tweetProfileImageDecorator(a,b));b.tweetBodyDecorator&&(c+=b.tweetBodyDecorator(a,b));return'<li class="jta-tweet-list-item">'+(c+'<div class="jta-clear">&nbsp;</div>')+
    "</li>"};defaultTweetProfileImageDecorator=function(a){var b=a.retweeted_status||a,a=getScreenName(a);return'<div class="jta-tweet-profile-image">'+('<a class="jta-tweet-profile-image-link" href="http://twitter.com/'+a+'" target="_blank"><img src="'+(b.user?b.user.profile_image_url:b.profile_image_url)+'" alt="'+a+'"'+(isAnywherePresent()?"":' title="'+a+'"')+"/></a>")+"</div>"};defaultTweetBodyDecorator=function(a,b){var c="";b.tweetTextDecorator&&(c+=b.tweetTextDecorator(a,b));b.tweetAttributesDecorator&&
(c+=b.tweetAttributesDecorator(a,b));b.tweetActionsDecorator&&(c+=b.tweetActionsDecorator(a,b));return'<div class="jta-tweet-body '+(b._tweetFeedConfig.showProfileImages?"jta-tweet-body-list-profile-image-present":"")+'">'+c+"</div>"};defaultTweetTextDecorator=function(a,b){var c=a.text;if(a.retweeted_status&&(b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserScreenNames||b._tweetFeedConfig.showUserFullNames||null==b._tweetFeedConfig.showUserFullNames))c=a.retweeted_status.text;
    b.linkDecorator&&(c=b.linkDecorator(c,b));b.usernameDecorator&&(c=b.usernameDecorator(c,b));b.hashtagDecorator&&(c=b.hashtagDecorator(c,b));if(b._tweetFeedConfig.showUserScreenNames||b._tweetFeedConfig.showUserFullNames||a.retweeted_status&&(null==b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserFullNames))c=b.tweetUsernameDecorator(a,b)+" "+c;return'<span class="jta-tweet-text">'+c+"</span>"};defaultTweetUsernameDecorator=function(a,b){var c=getScreenName(a),d=getFullName(a),
    e=null;if(c&&(b._tweetFeedConfig.showUserScreenNames||null==b._tweetFeedConfig.showUserScreenNames&&a.retweeted_status))e='<span class="jta-tweet-user-screen-name"><a class="jta-tweet-user-screen-name-link" href="http://twitter.com/'+c+'" target="_blank">'+c+"</a></span>";var f=null;if(d&&(b._tweetFeedConfig.showUserFullNames||null==b._tweetFeedConfig.showUserFullNames&&a.retweeted_status))f='<span class="jta-tweet-user-full-name">'+(e?" ":"")+'<a class="jta-tweet-user-full-name-link" href="http://twitter.com/'+
    c+'" name="'+c+'" target="_blank">'+d+"</a></span>";c="";e&&(c+=e);f&&(e&&(c+=" "),c+=f);if(e||f)c='<span class="jta-tweet-user-name">'+(a.retweeted_status?"RT ":"")+c+"</span>";return c};defaultTweetAttributesDecorator=function(a,b){var c="";if(b.tweetTwitterBirdDecorator||b.tweetTimestampDecorator||b.tweetSourceDecorator||b.tweetGeoLocationDecorator||b.tweetInReplyToDecorator||a.retweeted_status&&b.tweetRetweeterDecorator)c+='<span class="jta-tweet-attributes">',b.tweetTwitterBirdDecorator&&(c+=
    b.tweetTwitterBirdDecorator(a,b)),b.tweetTimestampDecorator&&(c+=b.tweetTimestampDecorator(a,b)),b.tweetSourceDecorator&&(c+=b.tweetSourceDecorator(a,b)),b.tweetGeoLocationDecorator&&(c+=b.tweetGeoLocationDecorator(a,b)),b.tweetInReplyToDecorator&&(c+=b.tweetInReplyToDecorator(a,b)),a.retweeted_status&&b.tweetRetweeterDecorator&&(c+=b.tweetRetweeterDecorator(a,b)),c+="</span>";return c};defaultTweetTimestampDecorator=function(a,b){var c=a.retweeted_status||a,d=formatDate(c.created_at),e=b.tweetTimestampFormatter(d,
    b),f=b.tweetTimestampTooltipFormatter(d);return'<span class="jta-tweet-timestamp"><a class="jta-tweet-timestamp-link" data-timestamp="'+d+'" href="http://twitter.com/'+getScreenName(a)+"/status/"+c.id+'" target="_blank" title="'+f+'">'+e+"</a></span>"};defaultTweetTwitterBirdDecorator=function(a,b){var c=getScreenName(a),d="https://twitter.com/intent/user?screen_name="+c,c=c+" "+b._resourceBundle._("on Twitter");return'<span class="jta-tweet-twitter-bird"><a href="'+d+'" target="_blank" title="'+
    c+'"><span class="jta-tweet-twitter-bird-icon">&nbsp;</span></a></span>'};defaultTweetTimestampTooltipFormatter=function(a){return(new Date(a)).toLocaleString()};defaultTweetTimestampFormatter=function(a,b){var c=new Date,d=parseInt((c.getTime()-Date.parse(a))/1E3),e="";if(60>d)e+=b._resourceBundle.__("%secs% second ago","%secs% seconds ago",d,{"%secs%":d});else if(3600>d)c=parseInt((d+30)/60),e+=b._resourceBundle.__("%mins% minute ago","%mins% minutes ago",c,{"%mins%":c});else if(86400>d)c=parseInt((d+
    1800)/3600),e+=b._resourceBundle.__("%hours% hour ago","%hours% hours ago",c,{"%hours%":c});else{var f=new Date(a),j=b._resourceBundle._("$$monthNames"),e=e+(j[f.getMonth()]+" "+f.getDate());f.getFullYear()<c.getFullYear()&&(e+=", "+f.getFullYear());c=parseInt((d+43200)/86400);e+=" ("+b._resourceBundle.__("%days% day ago","%days% days ago",c,{"%days%":c})+")"}return e};defaultTweetSourceDecorator=function(a,b){var c=(a.retweeted_status||a).source.replace(/\&lt\;/gi,"<").replace(/\&gt\;/gi,">").replace(/\&quot\;/gi,
    '"');return'<span class="jta-tweet-source"> '+b._resourceBundle._("via")+' <span class="jta-tweet-source-link">'+c+"</span></span>"};defaultTweetGeoLocationDecorator=function(a,b){var c="",d=a.retweeted_status||a,e=null;if(d.geo&&d.geo.coordinates)e=d.geo.coordinates.join();else if(d.place&&d.place.full_name)e=d.place.full_name;if(e){c=b._resourceBundle._("here");if(d.place&&d.place.full_name)c=d.place.full_name;c='<span class="jta-tweet-location"> '+b._resourceBundle._("from")+' <a class="jta-tweet-location-link" href="'+
    ("http://maps.google.com/maps?q="+e)+'" target="_blank">'+c+"</a></span>"}return c};defaultTweetInReplyToDecorator=function(a,b){var c=a.retweeted_status||a,d="";c.in_reply_to_status_id&&c.in_reply_to_screen_name&&(d="http://twitter.com/"+c.in_reply_to_screen_name+"/status/"+c.in_reply_to_status_id,c=b._resourceBundle._("in reply to")+" "+c.in_reply_to_screen_name,d='<span class="jta-tweet-inreplyto"> <a class="jta-tweet-inreplyto-link" href="'+d+'" target="_blank">'+c+"</a></span>");return d};defaultTweetRetweeterDecorator=
    function(a,b){var c="";if(a.retweeted_status)var d=getUserScreenName(a),c=(a.retweeted_status.retweet_count||0)-1,d='<a class="jta-tweet-retweeter-link" href="http://twitter.com/'+d+'" target="_blank">'+d+"</a>",e=b._resourceBundle.__(" and %rtc% other"," and %rtc% others",c,{"%rtc%":c}),c='<br/><span class="jta-tweet-retweeter">'+b._resourceBundle._("Retweeted by")+" "+d+(0<c?e:"")+"</span>";return c};defaultTweetActionsDecorator=function(a,b){var c="";if(b.tweetActionReplyDecorator||b.tweetActionRetweetDecorator||
    b.tweetActionFavoriteDecorator)c+='<span class="jta-tweet-actions">',b.tweetActionReplyDecorator&&(c+=b.tweetActionReplyDecorator(a,b)),b.tweetActionRetweetDecorator&&(c+=b.tweetActionRetweetDecorator(a,b)),b.tweetActionFavoriteDecorator&&(c+=b.tweetActionFavoriteDecorator(a,b)),c+="</span>";return c};defaultTweetActionReplyDecorator=function(a,b){var c="https://twitter.com/intent/tweet?in_reply_to="+a.id,d=b._resourceBundle._("Reply");return'<span class="jta-tweet-action-reply"><a href="'+c+'">'+
    d+"</a></span>"};defaultTweetActionRetweetDecorator=function(a,b){var c="https://twitter.com/intent/retweet?tweet_id="+a.id,d=b._resourceBundle._("Retweet");return'<span class="jta-tweet-action-retweet"><a href="'+c+'">'+d+"</a></span>"};defaultTweetActionFavoriteDecorator=function(a,b){var c="https://twitter.com/intent/favorite?tweet_id="+a.id,d=b._resourceBundle._("Favorite");return'<span class="jta-tweet-action-favorite"><a href="'+c+'">'+d+"</a></span>"};defaultConnectButtonDecorator=function(){return'<div class="jta-connect-button"></div>'};
    defaultLoginInfoDecorator=function(){return'<div class="jta-login-info"></div>'};defaultLoginInfoContentDecorator=function(a,b){var c="";if(b.isConnected())var c=b.currentUser.data("screen_name"),d=b.currentUser.data("profile_image_url"),c='<div class="jta-login-info-profile-image"><a href="http://twitter.com/'+c+'" target="_blank"><img src="'+d+'" alt="'+c+'" title="'+c+'"/></a></div><div class="jta-login-info-block"><div class="jta-login-info-screen-name"><a href="http://twitter.com/'+c+'" target="_blank">'+
        c+'</a></div><div class="jta-login-info-sign-out">'+a._resourceBundle._("Sign out")+'</div></div><div class="jta-clear">&nbsp;</div>';return c};defaultFollowButtonDecorator=function(){return'<div class="jta-follow-button"></div>'};defaultTweetBoxDecorator=function(){return'<div class="jta-tweet-box"></div>'};defaultLinkDecorator=function(a){return a.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1" class="jta-tweet-a jta-tweet-link" target="_blank" rel="nofollow">$1</a>')};
    defaultUsernameDecorator=function(a){return isAnywherePresent()?a:a.replace(/\B@(\w+)/gi,'@<a href="http://twitter.com/$1" class="jta-tweet-a twitter-anywhere-user" target="_blank" rel="nofollow">$1</a>')};defaultHashtagDecorator=function(a){return a.replace(/#([a-zA-Z0-9_]+)/gi,'<a href="http://search.twitter.com/search?q=%23$1" class="jta-tweet-a jta-tweet-hashtag" title="#$1" target="_blank" rel="nofollow">#$1</a>')};defaultLoadingDecorator=function(a){return'<li class="jta-loading">'+a._resourceBundle._("loading")+
        " ...</li>"};defaultErrorDecorator=function(a,b){return'<li class="jta-error">'+b._resourceBundle._("ERROR")+": "+a+"</li>"};defaultNoDataDecorator=function(a){return'<li class="jta-nodata">'+a._resourceBundle._("No more data")+"</li>"};defaultTweetFilter=function(){return!0};defaultTweetVisualizer=function(a,b,c){a[c](b)};defaultLoadingIndicatorVisualizer=function(a,b,c,d){defaultVisualizer(a,b,"append","fadeIn",600,"fadeOut",200,d)};defaultAutorefreshTriggerVisualizer=function(a,b,c,d){defaultVisualizer(a,
        b,"prepend","slideDown",600,"fadeOut",200,d)};defaultVisualizer=function(a,b,c,d,e,f,j,g){var i=function(){g&&g()};if(a)b.hide(),a[c](b),b[d](e,i);else b[f](j,function(){b.remove();i()})};defaultOnDataRequestHandler=function(){return!0};defaultOnRateLimitDataHandler=function(){};defaultOnOptionsInitializingHandler=function(){};updateLoginInfoElement=function(a,b){a._loginInfoElement&&a.loginInfoContentDecorator&&(a._loginInfoElement.children().remove(),a._loginInfoElement.append(a.loginInfoContentDecorator(a,
        b)),e(a._baseSelector+" .jta-login-info-sign-out").bind("click",function(){twttr.anywhere.signOut()}))};getFeedUrl=function(a,b){var c="https:"==document.location.protocol?"https:":"http:";a.searchParams?c+="//search.twitter.com/search.json?"+(a.searchParams instanceof Array?a.searchParams.join("&"):a.searchParams)+"&rpp=100":a.list?c="favorites"==a.list?c+("//api.twitter.com/1/favorites/"+a.username+".json?count=20"):c+("//api.twitter.com/1/"+a.username+"/lists/"+a.list+"/statuses.json?per_page=20"):
        (c+="//api.twitter.com/1/statuses/user_timeline.json?screen_name="+a.username+"&count=20",a._tweetFeedConfig.includeRetweets&&(c+="&include_rts=true"));b&&(c+=(a._tweetFeedConfig._maxId?"&max_id="+a._tweetFeedConfig._maxId:"")+"&page="+a._tweetFeedConfig._pageParam);return c+"&callback=?"};isAnywherePresent=function(){return"undefined"!=typeof twttr&&"undefined"!=typeof twttr.anywhere};clearTweetFeed=function(a){a._tweetFeedElement&&a._tweetFeedElement.empty()};setupOptions=function(a){a._resourceBundle=
        JTA_I18N.getResourceBundle("jTweetsAnywhere",a.locale);a._tweetBoxConfig.label=a._resourceBundle._("What's happening?");if("string"!=typeof a.username){if(!a.searchParams)a.searchParams=["q=from:"+a.username.join(" OR from:")];a.username=a.username[0]}"object"==typeof a.showTweetFeed&&e.extend(!0,a._tweetFeedConfig,a.showTweetFeed);if("object"==typeof a.showTweetBox)e.extend(!0,a._tweetBoxConfig,a.showTweetBox),a.showTweetBox=!0;if("object"==typeof a.showConnectButton)a._connectButtonConfig=a.showConnectButton,
        a.showConnectButton=!0;if(null==a._tweetFeedConfig.showProfileImages)a._tweetFeedConfig.showProfileImages=a.tweetProfileImagePresent;if(null==a._tweetFeedConfig.showProfileImages)a._tweetFeedConfig.showProfileImages=(a.list||a.searchParams)&&a.tweetProfileImageDecorator;if(a._tweetFeedConfig.autoConformToTwitterStyleguide)a._tweetFeedConfig.showUserFullNames=null,a._tweetFeedConfig.showTwitterBird=!0,a._tweetFeedConfig.showActionReply=!0,a._tweetFeedConfig.showActionRetweet=!0,a._tweetFeedConfig.showActionFavorite=
        !0;if(null==a._tweetFeedConfig.showUserScreenNames){if(a.list||a.searchParams)a._tweetFeedConfig.showUserScreenNames=!0;if(!a.tweetUsernameDecorator)a._tweetFeedConfig.showUserScreenNames=!1}if(null==a._tweetFeedConfig.showUserFullNames){if(a.list||a.searchParams)a._tweetFeedConfig.showUserFullNames=!0;if(!a.tweetUsernameDecorator)a._tweetFeedConfig.showUserFullNames=!1}a.count=validateRange(a.count,0,a.searchParams?100:20);a._tweetFeedConfig.autorefresh.interval=Math.max(30,a._tweetFeedConfig.autorefresh.interval);
        if(0>=a._tweetFeedConfig.autorefresh.max)a._tweetFeedConfig.autorefresh.max=-1;a._tweetFeedConfig.paging._offset=0;a._tweetFeedConfig.paging._limit=a.count;if(0==a.count||!a.showTweetFeed)a.tweetFeedDecorator=null,a.tweetFeedControlsDecorator=null;if("none"==a._tweetFeedConfig.paging.mode)a.tweetFeedControlsDecorator=null;if(!a.showFollowButton)a.followButtonDecorator=null;if(!a.showTweetBox)a.tweetBoxDecorator=null;if(!a.showConnectButton)a.connectButtonDecorator=null;if(!a.showLoginInfo)a.loginInfoDecorator=
            null;if(!a._tweetFeedConfig.showTwitterBird)a.tweetTwitterBirdDecorator=null;if(!a._tweetFeedConfig.showTimestamp)a.tweetTimestampDecorator=null;if(!a._tweetFeedConfig.showSource)a.tweetSourceDecorator=null;if(!a._tweetFeedConfig.showGeoLocation)a.tweetGeoLocationDecorator=null;if(!a._tweetFeedConfig.showInReplyTo)a.tweetInReplyToDecorator=null;if(!a._tweetFeedConfig.showActionReply)a.tweetActionReplyDecorator=null;if(!a._tweetFeedConfig.showActionRetweet)a.tweetActionRetweetDecorator=null;if(!a._tweetFeedConfig.showActionFavorite)a.tweetActionFavoriteDecorator=
            null};setupAutorefresh=function(a){a._tweetFeedConfig.autorefresh._startTime=(new Date).getTime();startAutorefresh(a);startTimestampRefresh(a)};populateTweetFeed=function(a){a.tweetDecorator&&a._tweetFeedElement&&getPagedTweets(a,function(a,c){c._tweetFeedConfig._clearBeforePopulate&&clearTweetFeed(c);hideLoadingIndicator(c,function(){e.each(a,function(a,b){c.tweetVisualizer(c._tweetFeedElement,e(c.tweetDecorator(b,c)),"append",c)});if(c._tweetFeedConfig._noData&&c.noDataDecorator&&!c._tweetFeedConfig._noDataElement)c._tweetFeedConfig._noDataElement=
        e(c.noDataDecorator(c)),c._tweetFeedElement.append(c._tweetFeedConfig._noDataElement);c._tweetFeedConfig._clearBeforePopulate&&c._tweetFeedElement.scrollTop(0);addHovercards(c)})})};populateTweetFeed2=function(a){if(a._tweetFeedElement&&0<a._autorefreshTweetsCache.length)if("trigger-insert"==a._tweetFeedConfig.autorefresh.mode)if(a._tweetFeedConfig.autorefresh._triggerElement)a.tweetFeedAutorefreshTriggerContentDecorator&&a._tweetFeedConfig.autorefresh._triggerElement.html(a.tweetFeedAutorefreshTriggerContentDecorator(a._autorefreshTweetsCache.length,
        a));else{if(a.tweetFeedAutorefreshTriggerDecorator)a._tweetFeedConfig.autorefresh._triggerElement=e(a.tweetFeedAutorefreshTriggerDecorator(a._autorefreshTweetsCache.length,a)),a._tweetFeedConfig.autorefresh._triggerElement.bind("click",function(){a.autorefreshTriggerVisualizer(null,a._tweetFeedConfig.autorefresh._triggerElement,a,function(){insertTriggerTweets(a)});a._tweetFeedConfig.autorefresh._triggerElement=null}),a.autorefreshTriggerVisualizer(a._tweetFeedElement,a._tweetFeedConfig.autorefresh._triggerElement,
        a)}else insertTriggerTweets(a)};insertTriggerTweets=function(a){if(a.tweetDecorator&&0<a._autorefreshTweetsCache.length){for(;0<a._autorefreshTweetsCache.length;){var b=a._autorefreshTweetsCache.pop();a._tweetsCache.unshift(b);a._tweetFeedConfig.paging._offset++;a.tweetVisualizer(a._tweetFeedElement,e(a.tweetDecorator(b,a)),"prepend",a)}addHovercards(a)}};addHovercards=function(a){isAnywherePresent()&&twttr.anywhere(function(b){b(a._baseSelector+" .jta-tweet-list").hovercards({expanded:a._tweetFeedConfig.expandHovercards});
        b(a._baseSelector+" .jta-tweet-profile-image img").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.alt}});b(a._baseSelector+" .jta-tweet-retweeter-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.text}});b(a._baseSelector+" .jta-tweet-user-screen-name-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,username:function(a){return a.text}});b(a._baseSelector+" .jta-tweet-user-full-name-link").hovercards({expanded:a._tweetFeedConfig.expandHovercards,
            username:function(a){return a.name}})})};populateAnywhereControls=function(a){isAnywherePresent()&&twttr.anywhere(function(b){a.tweetBoxDecorator&&b(a._baseSelector+" .jta-tweet-box").tweetBox(a._tweetBoxConfig);a.followButtonDecorator&&b(a._baseSelector+" .jta-follow-button").followButton(a.username);if(a.connectButtonDecorator){var c=e.extend({authComplete:function(){updateLoginInfoElement(a,b)},signOut:function(){updateLoginInfoElement(a,b)}},a._connectButtonConfig);b(a._baseSelector+" .jta-connect-button").connectButton(c);
        updateLoginInfoElement(a,b)}})};bindEventHandlers=function(a){a.tweetFeedControlsDecorator&&("prev-next"==a._tweetFeedConfig.paging.mode?(e(a._baseSelector+" .jta-tweet-list-controls-button-prev").bind("click",function(){!isLoading(a)&&0<a._tweetFeedConfig.paging._offset&&prevPage(a,!0)}),e(a._baseSelector+" .jta-tweet-list-controls-button-next").bind("click",function(){isLoading(a)||nextPage(a,!0)})):"endless-scroll"==a._tweetFeedConfig.paging.mode?a._tweetFeedElement.bind("scroll",function(){!isLoading(a)&&
        e(this)[0].scrollHeight-e(this).scrollTop()==e(this).outerHeight()&&nextPage(a,!1)}):e(a._baseSelector+" .jta-tweet-list-controls-button-more").bind("click",function(){isLoading(a)||nextPage(a,!1)}))};nextPage=function(a,b){doPage(a,b,Math.min(a._tweetFeedConfig.paging._offset+a._tweetFeedConfig.paging._limit,a._tweetsCache.length))};prevPage=function(a,b){doPage(a,b,Math.max(0,a._tweetFeedConfig.paging._offset-a._tweetFeedConfig.paging._limit))};doPage=function(a,b,c){a._tweetFeedConfig.paging._offset=
        c;a._tweetFeedConfig._clearBeforePopulate=b;populateTweetFeed(a)};startAutorefresh=function(a){"none"!=a._tweetFeedConfig.autorefresh.mode&&"prev-next"!=a._tweetFeedConfig.paging.mode&&0!=a._tweetFeedConfig.autorefresh.duration&&(0>a._tweetFeedConfig.autorefresh.duration||(new Date).getTime()-a._tweetFeedConfig.autorefresh._startTime<=1E3*a._tweetFeedConfig.autorefresh.duration)&&window.setTimeout(function(){processAutorefresh(a)},1E3*a._tweetFeedConfig.autorefresh.interval)};stopAutorefresh=function(a){a._tweetFeedConfig.autorefresh.duration=
        0};processAutorefresh=function(a){0!=a._tweetFeedConfig.autorefresh.duration&&(getRateLimitedData(a,!0,getFeedUrl(a,!1),function(a,c){var d=(a.results||a).slice(0);d.reverse();e.each(d,function(a,b){if(b.id_str)b.id=b.id_str;if(b.in_reply_to_status_id_str)b.in_reply_to_status_id=b.in_reply_to_status_id_str;if(!isTweetInAutorefreshCache(b,c)&&!isTweetInCache(b,c)&&c.tweetFilter(b,c)&&(c._autorefreshTweetsCache.unshift(b),0<c._tweetFeedConfig.autorefresh.max))for(;c._autorefreshTweetsCache.length>c._tweetFeedConfig.autorefresh.max;)c._autorefreshTweetsCache.pop()});
        populateTweetFeed2(c)}),startAutorefresh(a))};startTimestampRefresh=function(a){a.tweetTimestampDecorator&&"object"==typeof a._tweetFeedConfig.showTimestamp&&0<a._tweetFeedConfig.showTimestamp.refreshInterval&&window.setTimeout(function(){processTimestampRefresh(a)},1E3*a._tweetFeedConfig.showTimestamp.refreshInterval)};processTimestampRefresh=function(a){e.each(a._tweetFeedElement.find(".jta-tweet-timestamp-link"),function(b,c){var d=e(c).attr("data-timestamp");e(c).html(a.tweetTimestampFormatter(d,
        a))});startTimestampRefresh(a)};isTweetInCache=function(a,b){for(var c=b._tweetsCache.length,d=0;d<c;d++)if(a.id==b._tweetsCache[d].id)return!0;return!1};isTweetInAutorefreshCache=function(a,b){for(var c=b._autorefreshTweetsCache.length,d=0;d<c;d++)if(a.id==b._autorefreshTweetsCache[d].id)return!0;return!1};showLoadingIndicator=function(a){if(a._tweetFeedElement&&a.loadingDecorator&&!a._loadingIndicatorElement)a._loadingIndicatorElement=e(a.loadingDecorator(a)),a.loadingIndicatorVisualizer(a._tweetFeedElement,
        a._loadingIndicatorElement,a,null),a._tweetFeedElement.scrollTop(1E6)};hideLoadingIndicator=function(a,b){a._loadingIndicatorElement?(a.loadingIndicatorVisualizer(null,a._loadingIndicatorElement,a,b),a._loadingIndicatorElement=null):b&&b()};isLoading=function(a){return null!=a._loadingIndicatorElement};formatDate=function(a){return a.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3")};getUserScreenName=function(a){return a.user?a.user.screen_name:a.from_user};getScreenName=function(a){a=
        a.retweeted_status||a;return a.user?a.user.screen_name:a.from_user};getFullName=function(a){a=a.retweeted_status||a;return a.user?a.user.name:void 0};validateRange=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};showError=function(a,b){a.errorDecorator&&a._tweetFeedElement&&a._tweetFeedElement.append(a.errorDecorator(b,a))};getPagedTweets=function(a,b){a._tweetFeedConfig._recLevel=0;getRecPagedTweets(a,a._tweetFeedConfig.paging._offset,a._tweetFeedConfig.paging._limit,b)};getRecPagedTweets=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                b,c,d){++a._tweetFeedConfig._recLevel;if(b+c<=a._tweetsCache.length||3<a._tweetFeedConfig._recLevel||a._tweetFeedConfig._noData){b+c>a._tweetsCache.length&&(c=Math.max(0,a._tweetsCache.length-b));for(var h=[],f=0;f<c;f++)h[f]=a._tweetsCache[b+f];d(h,a)}else++a._tweetFeedConfig._pageParam,getRateLimitedData(a,!1,getFeedUrl(a,!0),function(a,f){var h=a.results||a;0==h.length?f._tweetFeedConfig._noData=!0:e.each(h,function(a,b){if(b.id_str)b.id=b.id_str;if(b.in_reply_to_status_id_str)b.in_reply_to_status_id=
        b.in_reply_to_status_id_str;if(!f._tweetFeedConfig._maxId)f._tweetFeedConfig._maxId=b.id;f.tweetFilter(b,f)&&f._tweetsCache.push(b)});getRecPagedTweets(f,b,c,d)})};getRateLimitedData=function(a,b,c,d){getRateLimit(a,function(e){e&&0>=e.remaining_hits?(a._stats.rateLimitPreventionCount++,hideLoadingIndicator(a,null)):getData(a,b,c,d)})};getData=function(a,b,c,d){a._stats.dataRequestCount++;a.onDataRequestHandler(a._stats,a)?(b||showLoadingIndicator(a),a.tweetDataProvider(c,function(b){b.error?showError(a,
        b.error):d(b,a)})):hideLoadingIndicator(a,null)};getRateLimit=function(a,b){a.rateLimitDataProvider(function(c){a._stats.rateLimit=c;a.onRateLimitDataHandler(a._stats,a);b(c)})};defaultTweetDataProvider=function(a,b){e.getJSON(a,b)};defaultRateLimitDataProvider=function(a){e.getJSON("http://api.twitter.com/1/account/rate_limit_status.json?callback=?",a)}})(jQuery);

/*
 * Example usage:
 * $(elem).animate( {top: 100}, $.easie(0.25,0.1,0.25,1.0) );
 */

/*
 * jquery.easie.js:
 * http://www.github.com/jaukia/easie
 *
 * Version history:
 * 1.0.1 Semver versioning for jQuery plugins repository
 * 1.0.0 Initial public version
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2011 Janne Aukia (janne.aukia.com),
 * Louis-Rémi Babé (public@lrbabe.com).
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 * LICENCE INFORMATION FOR DERIVED FUNCTIONS:
 *
 * Function cubicBezierAtTime is written by Christian Effenberger,
 * and corresponds 1:1 to the WebKit project function.
 * "WebCore and JavaScriptCore are available under the
 * Lesser GNU Public License. WebKit is available under
 * a BSD-style license."
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    var prefix = "easie",
        ease = "Ease",
        easeIn = prefix+ease+"In",
        easeOut = prefix+ease+"Out",
        easeInOut = prefix+ease+"InOut",
        names = ["Quad","Cubic","Quart","Quint","Sine","Expo","Circ"];

    $.easie = function(p1x,p1y,p2x,p2y,name,forceUpdate) {
        name = name || [prefix,p1x,p1y,p2x,p2y].join("-");
        if ( !$.easing[name] || forceUpdate ) {
            // around 40x faster with lookup than without it in FF4
            var cubicBezierAtTimeLookup = makeLookup(function(p) {
                // the duration is set to 5.0. this defines the precision of the bezier calculation.
                // the animation is ok for durations up to 5 secs with this.
                // with the lookup table, the precision can be high without any big penalty.
                return cubicBezierAtTime(p,p1x,p1y,p2x,p2y,5.0);
            });

            $.easing[name] = function(p, n, firstNum, diff) {
                return cubicBezierAtTimeLookup.call(null, p);
            }
            $.easing[name].params = [p1x,p1y,p2x,p2y];
        }
        return name;
    }

    var $easie = $.easie;

    // default css3 easings

    $easie(0.000, 0.000, 1.000, 1.000, prefix+"Linear");
    $easie(0.250, 0.100, 0.250, 1.000, prefix+ease);
    $easie(0.420, 0.000, 1.000, 1.000, easeIn);
    $easie(0.000, 0.000, 0.580, 1.000, easeOut);
    $easie(0.420, 0.000, 0.580, 1.000, easeInOut);

    // approximated Penner equations, from:
    // http://matthewlein.com/ceaser/

    $easie(0.550, 0.085, 0.680, 0.530, easeIn+names[0]);
    $easie(0.550, 0.055, 0.675, 0.190, easeIn+names[1]);
    $easie(0.895, 0.030, 0.685, 0.220, easeIn+names[2]);
    $easie(0.755, 0.050, 0.855, 0.060, easeIn+names[3]);
    $easie(0.470, 0.000, 0.745, 0.715, easeIn+names[4]);
    $easie(0.950, 0.050, 0.795, 0.035, easeIn+names[5]);
    $easie(0.600, 0.040, 0.980, 0.335, easeIn+names[6]);

    $easie(0.250, 0.460, 0.450, 0.940, easeOut+names[0]);
    $easie(0.215, 0.610, 0.355, 1.000, easeOut+names[1]);
    $easie(0.165, 0.840, 0.440, 1.000, easeOut+names[2]);
    $easie(0.230, 1.000, 0.320, 1.000, easeOut+names[3]);
    $easie(0.390, 0.575, 0.565, 1.000, easeOut+names[4]);
    $easie(0.190, 1.000, 0.220, 1.000, easeOut+names[5]);
    $easie(0.075, 0.820, 0.165, 1.000, easeOut+names[6]);

    $easie(0.455, 0.030, 0.515, 0.955, easeInOut+names[0]);
    $easie(0.645, 0.045, 0.355, 1.000, easeInOut+names[1]);
    $easie(0.770, 0.000, 0.175, 1.000, easeInOut+names[2]);
    $easie(0.860, 0.000, 0.070, 1.000, easeInOut+names[3]);
    $easie(0.445, 0.050, 0.550, 0.950, easeInOut+names[4]);
    $easie(1.000, 0.000, 0.000, 1.000, easeInOut+names[5]);
    $easie(0.785, 0.135, 0.150, 0.860, easeInOut+names[6]);

    function makeLookup(func,steps) {
        var i;
        steps = steps || 101;
        var lookupTable = [];
        for(i=0;i<(steps+1);i++) {
            lookupTable[i] = func.call(null,i/steps);
        }
        return function(p) {
            if(p===1) return lookupTable[steps];
            var sp = steps*p;
            // fast flooring, see
            // http://stackoverflow.com/questions/2526682/why-is-javascripts-math-floor-the-slowest-way-to-calculate-floor-in-javascript
            var p0 = Math.floor(sp);
            var y1 = lookupTable[p0];
            var y2 = lookupTable[p0+1];
            return y1+(y2-y1)*(sp-p0);
        }
    }

    // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
    // 1:1 conversion to js from webkit source files
    // UnitBezier.h, WebCore_animation_AnimationBase.cpp
    function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
        var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;}
        function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;}
        function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;}
        // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
        // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.
        function solveEpsilon(duration) {return 1.0/(200.0*duration);}
        function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));}
        // Given an x value, find a parametric value it came from.
        function solveCurveX(x,epsilon) {var t0,t1,t2,x2,d2,i;
            function fabs(n) {if(n>=0) {return n;}else {return 0-n;}}
            // First try a few iterations of Newton's method -- normally very fast.
            for(t2=x, i=0; i<8; i++) {x2=sampleCurveX(t2)-x; if(fabs(x2)<epsilon) {return t2;} d2=sampleCurveDerivativeX(t2); if(fabs(d2)<1e-6) {break;} t2=t2-x2/d2;}
            // Fall back to the bisection method for reliability.
            t0=0.0; t1=1.0; t2=x; if(t2<t0) {return t0;} if(t2>t1) {return t1;}
            while(t0<t1) {x2=sampleCurveX(t2); if(fabs(x2-x)<epsilon) {return t2;} if(x>x2) {t0=t2;}else {t1=t2;} t2=(t1-t0)*0.5+t0;}
            return t2; // Failure.
        }
        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
        cx=3.0*p1x; bx=3.0*(p2x-p1x)-cx; ax=1.0-cx-bx; cy=3.0*p1y; by=3.0*(p2y-p1y)-cy; ay=1.0-cy-by;
        // Convert from input time to parametric value in curve, then from that to output time.
        return solve(t, solveEpsilon(duration));
    }

})(jQuery);

(function($, undefined) {
    'use strict';

    // no jQuery or Zepto!
    if($ === undefined) {
        return;
    }

    /**
     * bind dom events
     * this overwrites addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        eventTypes
     * @param   {Function}      handler
     */
    Hammer.event.bindDom = function(element, eventTypes, handler) {
        $(element).on(eventTypes, function(ev) {
            var data = ev.originalEvent || ev;

            // IE pageX fix
            if(data.pageX === undefined) {
                data.pageX = ev.pageX;
                data.pageY = ev.pageY;
            }

            // IE target fix
            if(!data.target) {
                data.target = ev.target;
            }

            // IE button fix
            if(data.which === undefined) {
                data.which = data.button;
            }

            // IE preventDefault
            if(!data.preventDefault) {
                data.preventDefault = ev.preventDefault;
            }

            // IE stopPropagation
            if(!data.stopPropagation) {
                data.stopPropagation = ev.stopPropagation;
            }

            handler.call(this, data);
        });
    };

    /**
     * the methods are called by the instance, but with the jquery plugin
     * we use the jquery event methods instead.
     * @this    {Hammer.Instance}
     * @return  {jQuery}
     */
    Hammer.Instance.prototype.on = function(types, handler) {
        return $(this.element).on(types, handler);
    };
    Hammer.Instance.prototype.off = function(types, handler) {
        return $(this.element).off(types, handler);
    };


    /**
     * trigger events
     * this is called by the gestures to trigger an event like 'tap'
     * @this    {Hammer.Instance}
     * @param   {String}    gesture
     * @param   {Object}    eventData
     * @return  {jQuery}
     */
    Hammer.Instance.prototype.trigger = function(gesture, eventData){
        var el = $(this.element);
        if(el.has(eventData.target).length) {
            el = $(eventData.target);
        }

        return el.trigger({
            type: gesture,
            gesture: eventData
        });
    };


    /**
     * jQuery plugin
     * create instance of Hammer and watch for gestures,
     * and when called again you can change the options
     * @param   {Object}    [options={}]
     * @return  {jQuery}
     */
    $.fn.hammer = function(options) {
        return this.each(function() {
            var el = $(this);
            var inst = el.data('hammer');
            // start new hammer instance
            if(!inst) {
                el.data('hammer', new Hammer(this, options || {}));
            }
            // change the options
            else if(inst && options) {
                Hammer.utils.extend(inst.options, options);
            }
        });
    };

})(window.jQuery || window.Zepto);


(function( $ ){

    var methods = {
        init : function( options ) {
            var $tabs = $([]),
                $links = $(this);

            return this.each(function(){

                var $this = $(this),
                    _id = this.href.indexOf('#') != -1 ? this.href.substr(this.href.indexOf('#')) : false;
                    _data = $this.data('simpleTab');

                if ( ! _data && _id ) {
                    var $tab = $(_id);
                    $tabs.push($tab.get(0));

                    if ($this.parent().hasClass('active')) {
                        $tab.show();
                    } else {
                        $tab.hide();
                    }

                    $this.on('click.simpleTab', function(e){
                        e.preventDefault();
                        if (!$(this).parent().hasClass('active')) {
                            $tabs.hide();
                            $tab.show();
                            $links.parent().removeClass('active');
                            $(this).parent().addClass('active');
                        }
                    });


                    $(this).data('simpleTab', {link : this, tab : $tab});
                }
            });
        },
        destroy : function( ) {

            return this.each(function(){

                var $this = $(this),
                    _data = $this.data('simpleTab');
                if (_data) {
                    _data.tab.show();

                    // Namespacing FTW
                    $(window).unbind('.simpleTab');
                    $this.removeData('simpleTab');
                }
            })

        }
    };

    $.fn.simpleTab = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.simpleTab' );
        }
    };

})( jQuery );


(function($){

    var methods = {
        close : null,
        init : function( _options ) {

            var _options = methods.options = $.extend({
                opener: 'a.opener',
                slide: 'div.slide',
                activeItemClass: 'ui-state-active',
                openerActiveClass: 'active',
                accordionLevel:'ul',
                accordionItem:'li',
                duration:400
            },_options);

            return this.each(function(){

                var _this = $(this),
                    _data = _this.data('mAccordion');

                if ( !_data ) {
                    var _levels = _this.find(_options.accordionLevel).andSelf();

                    _this.data('mAccordion', {levels : _levels, opt : _options});

                    _levels.each(function(i, _lv){
                        var _items = $(_options.accordionItem,_lv);

                        _items.activeItem = false;
                        _items.each(function(k,item){
                            item.slide = $(_options.slide,item);
                            item.slide.show();
                        });
                        _items.each(function(k,item){
                            item.opener = $(_options.opener,item);
                            item.h = item.slide.innerHeight();
                            item.pT = parseInt(item.slide.css('paddingTop'),10);
                            item.pB = parseInt(item.slide.css('paddingBottom'),10);
                            item.slide.css({
                                'paddingTop':0,
                                'paddingBottom':0
                            });
                            item.slide.find(_options.slide,item).hide()
                            if ($(item).hasClass(_options.activeItemClass) || item.opener.hasClass(_options.openerActiveClass)) {
                                _items.activeItem = item;
                                $(item).addClass(_options.activeItemClass)
                                item.opener.addClass(_options.openerActiveClass);
                                item.slide.show();
                            }
                            item.opener.on('click.mAccordion',function(){
                                if (!$(item).hasClass(_options.activeItemClass)) {
                                    methods.close = false;
                                    _items.each(function(z,item_temp){
                                        if (item_temp == item) methods.close = true;
                                    });
                                    methods.showItem(item, _items);
                                } else {
                                    methods.hideItem(item, _items);
                                }
                                return false;
                            });

                        });
                    });
                    _levels.each(function(i, _lv){
                        var _items = $(_options.accordionItem,_lv);
                        _items.each(function(k,item){
                            var _slide = $(_options.slide,item);
                            _slide.hide();
                            if ($(item).hasClass(_options.activeItemClass)) {
                                _slide.show();
                            }
                        });
                    });
                }
            });
        },

        showItem : function (_item, _items){
            if (_items.activeItem) _items.activeItem.h = $(_items.activeItem.slide).innerHeight();
            $(_item.slide).show().css('position','absolute');
            _item.h = $(_item.slide).innerHeight();

            $(_item).addClass(methods.options.activeItemClass);
            $(_items.activeItem).removeClass(methods.options.activeItemClass);
            _item.opener.addClass(methods.options.openerActiveClass);
            _item.slide.css({'height':0, 'opacity':0, 'paddingTop':0, 'paddingBottom':0, 'position':'static'});
            _item.slide.animate({'height': _item.h, 'paddingTop': _item.pT, 'paddingBottom': _item.pB, 'opacity':1}, {duration:methods.options.duration, queue:false, complete:function(){
                if (_items.activeItem) {
                    _items.activeItem.opener.removeClass(methods.options.openerActiveClass);
                    _items.activeItem.slide.hide();
                    _items.activeItem.slide.css('height','auto');
                }
                _items.activeItem = _item;
                _items.activeItem.slide.css('height','auto');
            }, step: function(i,j){
                var _p = j.now/j.end;
                if (_items.activeItem != _item && _items.activeItem != false && methods.close) {
                    var _thisValue = 0;
                    if (j.prop == 'height') {
                        _thisValue = _items.activeItem.h - (_items.activeItem.h * _p);
                    } else {
                        _thisValue = j.end - j.now;
                    }
                    var _css = {};
                    _css[j.prop] = _thisValue;
                    _items.activeItem.slide.css(_css)
                }
            }});
        },

        hideItem : function(_item, _items){
            _item.h = _item.slide.innerHeight();
            _item.slide.animate({'height': 0, 'opacity':0, 'paddingTop':0, 'paddingBottom':0}, {duration:methods.options.duration, queue:false, complete:function(){
                _item.slide.hide();
                _item.slide.css('height','auto');
                $(_item).removeClass(methods.options.activeItemClass);
                _item.opener.removeClass(methods.options.openerActiveClass);
                _items.activeItem = false;
            }})
        },

        showAllItems : function(_levels, opt){
            _levels.each(function(i, _lv){
                var _items = $(opt.accordionItem,_lv);
                _items.each(function(k,item){
                    item.slide = $(opt.slide,item);
                    item.opener = $(opt.opener,item);
                    item.slide.removeAttr('style');
                    item.opener.off('click').removeClass(opt.openerActiveClass);
                    $(item).removeClass(opt.activeItemClass);
                });
            });
        },

        destroy : function( ) {

            return this.each(function(){

                var $this = $(this),
                    _data = $this.data('mAccordion');
                if (_data) {
                    methods.showAllItems(_data.levels, _data.opt);
                    // Namespacing FTW
                    $(window).unbind('.mAccordion');
                    $this.removeData('mAccordion');
                }
            })

        }
    };

    $.fn.mAccordion = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.mAccordion' );
        }
    };
})(jQuery);

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch(er) {}
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                config.raw ? key : encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));

/*
 * jQuery galleryScroll v1.4.1
 */

(function($){
    $.fn.galleryScroll = function(_options){
        // defaults options
        var _options = $.extend({
            btPrev: 'a.prev',
            btNext: 'a.next',
            holder: 'div',
            mover: 'ul',
            scrollEl: 'li',
            duration : 1000,
            tabset: false,
            step: false,
            vertical:false,
            autoRotation:false,
            stopARbyHover:false,
            startARafterClick:false,
            generateNumLinks:false,
            currentNum:false,
            allNum:false,
            disable:false,
            slideStart:function(){},
            slideFinish:function(){}
        },_options);

        return this.each(function(){
            var _wraper = $(this),
                _holder = $(_options.holder, _wraper),
                _mover = $(_options.mover, _holder),
                _lis = $(_options.scrollEl, _mover),
                _links = _options.tabset ? $(_options.tabset, _wraper) : null,
                _prev = $(_options.btPrev, _wraper),
                _next = $(_options.btNext, _wraper),
                _duration = _options.duration,
                _allNum = $(_options.allNum, _wraper),
                _currentNum = $(_options.currentNum, _wraper);

            var _maxMargin, _length = 0, _current = 0, _margin = 0, _startARafterClickTimer;

            function init() {
                _step = _options.step ? (_lis.eq(0).outerWidth(true) * _options.step) : _holder.innerWidth();
                if (_options.vertical) _step = _options.step ? (_lis.eq(0).outerHeight(true) * _options.step) : _holder.innerHeight();

                if (!_options.vertical) {
                    _maxMargin = _lis.length*_lis.eq(0).outerWidth(true)-_holder.innerWidth();
                } else {
                    _maxMargin = _lis.length*_lis.eq(0).outerHeight(true)-_holder.innerHeight();
                }
                _length = Math.floor(_maxMargin/_step)+1;

                if (_maxMargin <= 0) {
                    _prev.css('visibility','hidden');
                    _next.css('visibility','hidden');
                } else {
                    _prev.css('visibility','visible');
                    _next.css('visibility','visible');
                }
                if (_maxMargin%_step == 0) _length -= 1;

                // generate Number Links
                if (_options.generateNumLinks) {
                    var _linkHolder = $(_options.generateNumLinks, _wraper),
                        _numLinksStr = '<ul class="slider-nav">';
                    for (var i=0; i<_length+1; i++) {
                        _numLinksStr += '<li><a href="#">'+(i+1)+'</a></li>';
                    }
                    _numLinksStr += '</ul>';
                    _options.tabset = true;
                    _linkHolder.html(_numLinksStr);
                    _links = _linkHolder.find('a');
                }

                _margin = _step*_current;
                if (_current >= _length) _margin = _maxMargin;
                if (_maxMargin <= 0) _margin = 0;

                var _anim = (_options.vertical) ? {'marginTop': -_margin} : {'marginLeft': -_margin};
                _mover.css(_anim);
                _options.slideFinish();

                // click events
                if (_options.tabset) {
                    _links.each(tabsetClick);
                    _links.eq(_current).parent().addClass('active');
                }
                _wraper.data('pager', _links);
                _wraper.data('maxItems', Math.floor(_holder.innerWidth()/_step));
            }
            init();
            $(window).resize(init).load(init);

            function tabsetClick(i, link){
                $(link).click(function(){
                    if (_timer) clearInterval(_timer);
                    _links.parent().removeClass('active');
                    _margin = _step*i;
                    if (i >= _length) _margin = _maxMargin;
                    _options.slideStart();
                    var _anim = (_options.vertical) ? {'marginTop': -_margin} : {'marginLeft': -_margin};
                    _mover.animate(_anim, {duration:_duration, queue:false, complete:function(){
                        setTimeout(function(){
                            if (!_mover.is(':animated')) {
                                _options.slideFinish();
                            }
                        }, 50)
                    }});
                    _current = i;
                    if (_options.autoRotation && _options.startARafterClick) {
                        if (_startARafterClickTimer) clearInterval(_startARafterClickTimer);
                        _startARafterClickTimer = setTimeout(function(){
                            _timer = setInterval(function(){nextSlides()},_options.autoRotation);
                        },_options.startARafterClick-_options.autoRotation);
                    }
                    $(this).parent().addClass('active');
                    if (_options.disable && _current == _length)
                        _next.addClass('next-disable').addClass('disable');
                    else _next.removeClass('next-disable').removeClass('disable');
                    if (_options.disable && _current == 0)
                        _prev.addClass('prev-disable').addClass('disable');
                    else _prev.removeClass('prev-disable').removeClass('disable');
                    return false;
                });
            };

            // init timer
            var _timer = false;
            if (_options.autoRotation) {
                _timer = setInterval(function(){nextSlides()},_options.autoRotation);
                if (_options.stopARbyHover)
                    _holder.hover(function(){
                        if (_timer) clearInterval(_timer);
                    }, function(){
                        _timer = setInterval(function(){nextSlides()},_options.autoRotation);
                    });
            }


            _next.click(function(){
                if ($(this).hasClass('disable')) return false;
                if (_timer) clearInterval(_timer);
                if (_options.autoRotation && _options.startARafterClick) {
                    if (_startARafterClickTimer) clearInterval(_startARafterClickTimer);
                    _startARafterClickTimer = setTimeout(function(){
                        _timer = setInterval(function(){nextSlides()},_options.autoRotation);
                    },_options.startARafterClick-_options.autoRotation);
                }
                nextSlides();
                return false;
            });
            if (_options.disable && _current == 0) _prev.addClass('prev-disable').addClass('disable');
            _prev.click(function(){
                if ($(this).hasClass('disable')) return false;
                if (_timer) clearInterval(_timer);
                if (_options.autoRotation && _options.startARafterClick) {
                    if (_startARafterClickTimer) clearInterval(_startARafterClickTimer);
                    _startARafterClickTimer = setTimeout(function(){
                        _timer = setInterval(function(){nextSlides()},_options.autoRotation);
                    },_options.startARafterClick-_options.autoRotation);
                }

                _current -= 1;
                if (_options.disable && _current < _length) _next.removeClass('next-disable').removeClass('disable');
                if (_options.disable && _current == 0) _prev.addClass('prev-disable').addClass('disable');
                if (_current < 0) _current = _length;
                _margin = _step*_current;
                if (_current >= _length) _margin = _maxMargin;
                _options.slideStart();
                var _anim = (_options.vertical) ? {'marginTop': -_margin} : {'marginLeft': -_margin};
                _mover.animate(_anim, {duration:_duration, queue:false, complete:function(){
                    setTimeout(function(){
                        if (!_mover.is(':animated')) {
                            _options.slideFinish();
                        }
                    }, 50)
                }});
                setActive();
                return false;
            });
            function nextSlides(){
                _current += 1;
                if (_options.disable && _current > 0) _prev.removeClass('prev-disable').removeClass('disable');
                if (_options.disable && _current >= _length) _next.addClass('next-disable').addClass('disable');
                if (_current > _length) _current = 0;
                _margin = _step*_current;
                if (_current >= _length) _margin = _maxMargin;
                _options.slideStart();
                var _anim = (_options.vertical) ? {'marginTop': -_margin} : {'marginLeft': -_margin};
                _mover.animate(_anim, {duration:_duration, queue:false, complete:function(){
                    setTimeout(function(){
                        if (!_mover.is(':animated')) {
                            _options.slideFinish();
                        }
                    }, 50)
                }});
                setActive();
            }

            if (typeof $().hammer == 'function') {
                _mover.hammer({drag_lock_to_axis:true})
                    .on("swipeleft swiperight", function(ev){
                        // disable browser scrolling
                        ev.gesture.preventDefault();
                        switch(ev.type) {
                            case 'swipeleft':
                                _next.trigger('click');
                                ev.gesture.stopDetect();
                                break;

                            case 'swiperight':
                                _prev.trigger('click');
                                ev.gesture.stopDetect();
                                break;
                        }
                    });
            }

            function setActive () {
                if (_options.tabset && _links) {
                    _links.parent().removeClass('active');
                    _links.eq(_current).parent().addClass('active');
                }
                currentNum();
            }
            if (_options.currentNum && _currentNum.length) {
                _allNum.html(_length+1);
                currentNum();
            }

            function currentNum() {
                if (_currentNum.length && _options.currentNum)
                    _currentNum.html(_current+1);
            }
        });
    }
})(jQuery);

