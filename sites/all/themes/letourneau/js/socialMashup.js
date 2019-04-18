/*****************************************
// Last Updated: 4 Aug 2017 ©Hannon Hill
//
// Variables that need to be set:
// 
// facebook : true if you want to include Facebook, false if you don't want Facebook 
// twitter : true if you want to include Twitter, false if you don't want Twitter
// instagram : true if you want to include Instagram, false if you don't want Instagram
// elementId: the id of the HTML element on the page where you want the posts to show
//
// ******* \\
// FACEBOOK \\
// 
// FBuserName : your Facebook name, found at the end of the url on your profile page e.g. www.facebook.com/hannonhillcorp
// limitF : the number of Facebook posts you want displayed (max: 100)
// 
// Create your app at https://developers.facebook.com/apps/ and fill in the fields below
// appIdF : (15 numbers)
// accessTokenF : string of numbers and letters
//                   go to this link https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=APP_ID&client_secret=APP_SECRET 
//                   but replace APP_ID with your App ID and APP_SECRET with your App Secret to generate your Access Token
// ****** \\
// TWITTER \\
//
// twitterHandle : your Twitter handle
// limitT : the number of Twitter posts you want displayed
// 
// Create your app at https://apps.twitter.com/, set permissions to read only and fill in the fields below
// consumerKey : Consumer Key (API key)
// consumerSecret : Consumer Secret (API Secret)
//  
// Advanced Twitter Setup
// You can format your search parameters (searchType and params) using any of the GET methods as described at https://dev.twitter.com/rest/public
// Example: https://dev.twitter.com/rest/reference/get/statuses/user_timeline
// searchType = "statuses_userTimeline";
// var params = { screen_name : twitterHandle, include_rts : false, exclude_replies : true, count : 10 };
// This will display 10 tweets from the specified users timeline, excluding retweets and replies (these are included in the count though)
//
// ******** \\
// INSTAGRAM \\
//
// instagramId : your Instagram Account ID (find this number at https://smashballoon.com/instagram-feed/find-instagram-user-id/ or a similar site)
// limitI : the number of Instagram images you want displayed
// 
// Create your client at https://www.instagram.com/developer/clients/manage/. Set the redirect URI to http://localhost and uncheck "Disable implicit OAuth" in your app settings (click Edit after you created your client)
// accessTokenI : string of numbers and letters
//              go to this link https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=http://localhost&response_type=token
//              but replace CLIENT_ID with your client's id (found on manage clients page)
//
*****************************************/
// Global Variables
var facebook = true;
var twitter = true;
var instagram = false;
var elementId = "grid";

// Facebook Variables
var FBuserName = "myletu";
var limitF = 20;
// It is recommended that you store these values server side for your app's protection
var appIdF = "308414922515276";
var accessTokenF = '308414922515276|q-6_k4upNDheGK6oqqIrZNffeCk'; 

// Twitter Variables
var twitterHandle = "LeTourneauUniv";
var limitT = 20;
// It is recommended that you store these values server side for your app's protection
var consumerKey = "PaCqMQr0o7iy2jMFvuOHA";
var consumerSecret = "QYwb9esdbctqdQirsIUIxHNqjbCVdJRkHhywnbSPF8";

// Instagram Variables
var instagramId = '378735070';
var limitI = '20';
// It is recommended that you store this value server side for your app's protection
var accessTokenI = '225479750.3a91473.cb98312a82b34db4b5244461509bbe5c';

// Pull social media once the page is ready
$(document).ready(function() {
    var selectors = [];
    if (facebook) {
        selectors.push('#lastDivfacebook');
        getFacebook(FBuserName, limitF, elementId);
    }
    if (twitter) {
        selectors.push('#lastDivtwitter');
        getTwitter(twitterHandle, limitT, elementId);
    } 
    if (instagram) {
        selectors.push('#lastDivinstagram');
        getInstagram(instagramId, limitI, elementId);
    }
    
    loadIsotope(selectors, 100);
    
    // Scroll to top button
    $(document).on( 'scroll', function(){
		if ($(window).scrollTop() > 100) {
			if (!$('#back_to_top').is(":visible")) {
				$('#back_to_top').fadeIn();
			}
		} else if ($('#back_to_top').is(":visible")) {
			$('#back_to_top').fadeOut();
		}
	});
	$('#back_to_top').on('click', scrollToTop);
    
    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $('.grid').isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('.filter-button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });
});

// Make sure all social media has been loaded before initiating Isotope
function loadIsotope(selectors, time) {
    if (check(selectors)) {    
        $('#grid').imagesLoaded(function() {
            $('#loading').fadeOut();
            $('#grid').fadeIn(1000);
            $('.grid').isotope({
                layoutMode: 'packery',
                packery: {
                    gutter: '.gutter-sizer'
                },
                itemSelector: '.grid-item',
                percentPosition: true,
                getSortData: {
                  date: '.date parseInt'
                },
                sortBy: 'date'
            });
        });
        $('button').removeAttr('disabled');
        return;
    }
    else {
        setTimeout(function() {
            loadIsotope(selectors, time);
        }, time);
    }
}

// Format all posts based on type (Facebook, Instagram, Twitter)
function outputPost(type, id, userName, message, image, date, grid, last) {
    var post = "http://www." + type + ".com/" + id;
    var user = "http://www." + type + ".com/" + userName;
    if (type === "twitter") {
        post = user + "/status/" + id;
    } else if (type === "instagram") {
        post = id;
    }
    var gridItem = document.createElement('div');
    if (last === true) { // so that isotope knows when it is done loading Facebook posts
        gridItem.id = "lastDiv" + type;
    } else if (last === false) {
        gridItem.className = "grid-item-2 ";
    }
    
    // Post link
    var postLink = document.createElement('a'), span = document.createElement('span');
    postLink.href = post;
    postLink.target = "_blank";
    span.className = "fullLink";
    postLink.appendChild(span);
    gridItem.appendChild(postLink);
    
    // Post has a photo
    if (typeof image !== "undefined" && image != "") {
        var img = document.createElement('img'), imgDiv = document.createElement('div'), link = document.createElement('a');
        img.src = image;
        img.className = "img-responsive";
        imgDiv.className = "image";
        link.href = post;
        link.target = "_blank";
        link.appendChild(img);
        imgDiv.appendChild(link);
        gridItem.appendChild(imgDiv);
    }
    
    var gridContent = document.createElement('div');
    gridContent.className = "grid-content";
    // Post text
    if (typeof message !== "undefined") {
        /*
        if (message.length > 500) {
            message = jQuery.trim(message).substring(0, 500).split(" ").slice(0, -1).join(" ") + "...";
        }*/
        if (type === "twitter") {
            message = formatTweetMessage(message);
        } else if (type === "instagram") {
            message = formatInstaMessage(message);
        }

        var text = document.createElement('div');
        text.innerHTML = message;
        text.className = "text";
        gridContent.appendChild(text);
    }
    
    // Post Date and Time
    var bottom = document.createElement('div'), postDate = document.createElement('p');
    bottom.className = "bottom";
    if (type === "Facebook") {
        date = date.split("T").join(" ");
        date = date.split("+");
        date = date[0];
        date = new Date(date.replace(/\s+/g, 'T').concat('.0000+00:00')).getTime();
    }
    var dateFormat = formatDate(new Date(date));
    date = document.createElement('p');
    postDate.innerHTML = dateFormat[0];
    postDate.className = "postDate";
    bottom.appendChild(postDate);
    // Time since post (in milliseconds) for sorting (hidden)
    date.innerHTML = dateFormat[1];
    date.className = "date";
    bottom.appendChild(date);
    
    // Logo Link
    var logo = document.createElement('span'), link = document.createElement('a');
    logo.className = "fa pull-left fa-" + type;
    link.href = user;
    link.target = "_blank";
    link.className = "logoLink";
    link.appendChild(logo);
    bottom.appendChild(link);
    
    gridContent.appendChild(bottom);
    gridItem.append(gridContent);
    gridItem.className += "grid-item " + type;
    var category = document.createAttribute("data-category");
    category.value = type;
    gridItem.setAttributeNode(category);
    grid.appendChild(gridItem);
}

// Add links to text in Facebook Post
function formatFBMessage(string) {
    var message = string.replace(/(http:\/\/|https:\/\/|www.)([^\s]*)/gi, '<a href="$1$2" target="_blank">$1$2</a>');
    message = message.replace(/href=[\"\'](www\.[^\s\"\']*)/gi, 'href="http://$1');
    message = message.replace(/(#)([a-z][a-z0-9]*)/gi, '<a href="http://www.facebook.com/hashtag/$2" target="_blank">$1$2</a>');
    return message;
}

// Add links to text in Tweet
function formatTweetMessage(text) {
    var link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var user = /@(\w+)/ig;
    var hashTags = /#(\w+)/ig;
    var desc = "";
	desc = text.replace(link,'<a href="$1" target="_blank">$1</a>');
	desc = desc.replace(user,'<a href="https://twitter.com/$1" target="_blank">@$1</a>');
	desc = desc.replace(hashTags,'<a href="https://twitter.com/search?q=%23$1" target="_blank">#$1</a>');
	return desc;
}

// Add links to text in Instagram Post
function formatInstaMessage(text) {
    var link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var user = /@(\w+)/ig;
    var hashTags = /#(\w+)/ig;
    var desc = "";
    desc = text.replace(link,'<a href="$1" target="_blank">$1</a>');
	desc = desc.replace(user,'<a href="https://instagram.com/$1" target="_blank">@$1</a>');
	desc = desc.replace(hashTags,'<a href="https://instagram.com/explore/tags/$1" target="_blank">#$1</a>');
	return desc;
}


// Get Facebook posts
function getFacebook(userName, limit, elementId) {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function() { 
        FB.init({
            appId: appIdF,
            version: 'v2.5'
        });     
        FB.api('/' + userName + '/posts?fields=message,created_time,full_picture,link,type,message_tags,description,from&limit=' + limit + '&access_token=' + accessTokenF, function(response) {
            var grid = document.getElementById(elementId);
            if (response && !response.error) {
                for (var i = 0; i < response.data.length; i++){
                    var post = response.data[i];
                    if (post.type !== "offer") { // prevent post types from displaying, types include: link, status, photo, video, offer
                        if (typeof post.message !== "undefined") {
                            message = post.message;
                            message = formatFBMessage(message);
                        }
                        if (typeof post.message_tags !== "undefined" && post.message_tags.length > 0) {
                            for (var n = 0; n < post.message_tags.length; n++) {
                                var tag = post.message_tags[n].name;
                                var regex = new RegExp(tag);
                                message = message.replace(regex, '<a href="http://www.facebook.com/' + post.message_tags[n].id + '" target="_blank">' + tag + '</a>')
                            }
                        }
                        var last = "";
                        if (i === response.data.length - 1) {
                            last = true;
                            document.getElementById("loading").innerHTML += "Facebook done...";
                        } else if (i === 0) {
                            last = false;
                        }
                        outputPost("facebook", post.id, post.from.id, message, post.full_picture, post.created_time, grid, last);
                    }
                }
            } else {
                document.getElementById("loading").innerHTML += "Error connecting to Facebook...";
                var gridItem = document.createElement('div');
                gridItem.id = "lastDivfacebook";
                grid.appendChild(gridItem);
            }
        });
    });
}

// Get Twitter Posts
function getTwitter(userName, limit, elementId) {
    // Advanced Setup
    var searchType = "statuses_userTimeline";
    var params = { screen_name : userName, include_rts : true, exclude_replies : false, count : limit };
    
    var cb = new Codebird;
    cb.setConsumerKey(consumerKey, consumerSecret); 
    cb.__call(
        "oauth2_token",
        {},
        function (reply,err) {
            var bearer_token;
            var grid = document.getElementById(elementId);
            if (err || reply.errors) {
                if (err) {
                    document.getElementById("loading").innerHTML += "Error connecting to Twitter: " + err.error + "...";
                } else if (reply.errors) {
                    document.getElementById("loading").innerHTML += "Error connecting to Twitter: " + reply.errors[0].message + "...";
                }
                var gridItem = document.createElement('div');
                gridItem.id = "lastDivtwitter";
                grid.appendChild(gridItem);
            }
            if (reply) {
                bearer_token = reply.access_token;
                cb.setBearerToken(bearer_token);
                cb.__call(
                    searchType,
                    params,
                    function (tweets) {
                        for (var key in tweets) {
                            if (key === "statuses") {
                                tweets = tweets[key];
                            }
                        }
                        for (var i = 0; i < tweets.length; i++) {
                            var tweet = tweets[i];
                            var image;
                            if (typeof tweet.entities.media !== "undefined") {
                                image = tweet.entities.media[0].media_url_https;
                            } else {
                                image = "";
                            }
                            var last = "";
                            if (i === tweets.length - 1) {
                                last = true;
                                document.getElementById("loading").innerHTML += "Twitter done...";
                            } else if (i === 0) {
                                last = false;
                            }
                            outputPost("twitter", tweet.id_str, tweet.user.screen_name, tweet.text, image, tweet.created_at, grid, last);
                        }
                    },
                    true
                );
            }
        }
    );
}

// Pull Instagram posts
function getInstagram(userId, limit, elementId) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://api.instagram.com/v1/users/" + userId + "/media/recent/?access_token=" + accessTokenI + "&count=" + limit,
        success: function(data) {
            var grid = document.getElementById(elementId);
            if (data.meta.error_message) {
                document.getElementById("loading").innerHTML += "Error connecting to Instagram: " + data.meta.error_message + "...";
                var gridItem = document.createElement('div');
                gridItem.id = "lastDivinstagram";
                grid.appendChild(gridItem);
            } else {
                for (var i = 0; i < data.data.length; i++) {
                    var post = data.data[i];
                    var date = parseInt(post.created_time) * 1000;
                    var last = "";
                    if (i === data.data.length - 1) {
                        last = true;
                        document.getElementById("loading").innerHTML += "Instagram done...";
                    } else if (i === 0) {
                        last = false;;
                    }
                    outputPost("instagram", post.link, post.user.username, post.caption.text, post.images.standard_resolution.url, date, grid, last);
                }
            }
        }
    });
}

// Back To Top button
function scrollToTop() {
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 300, 'linear');
}

// Format Date, takes in a date object
function formatDate(date) {
    var today = new Date();
    var diff = today.getTime() - date.getTime();
    
    // Set the unit values in milliseconds.  
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;
    var msecPerWeek = msecPerDay * 7;
    var msecPerMonth = msecPerWeek * 4;
    var msecPerYear = msecPerMonth * 12;
    
    // Get the difference in milliseconds.  
    var interval = today - date.getTime();
    
    var years = Math.floor(interval / msecPerYear );
    interval = interval - (years * msecPerYear )
    
    var months = Math.floor(interval / msecPerMonth );
    interval = interval - (months * msecPerMonth )
    
    var weeks = Math.floor(interval / msecPerWeek );
    interval = interval - (weeks * msecPerWeek )
    
    // Calculate how many days the interval contains. Subtract that  
    // many days from the interval to determine the remainder.  
    var days = Math.floor(interval / msecPerDay );  
    interval = interval - (days * msecPerDay );  
    
    // Calculate the hours, minutes, and seconds.  
    var hours = Math.floor(interval / msecPerHour );  
    interval = interval - (hours * msecPerHour );  
    
    var minutes = Math.floor(interval / msecPerMinute );  
    interval = interval - (minutes * msecPerMinute );  
    
    var seconds = Math.floor(interval / 1000 );  
    
    var values = [years, months, weeks, days, hours, minutes, seconds];
    var abbrs = ["yr", "mo", "wk", "day", "hr", "min", "sec"];
    var value = values.find(function (v) {
        return v > 0;
    });
    var abbr = abbrs[values.indexOf(value)];
    if (value > 1) {
        abbr += "s";
    }
    return [value + " " + abbr, diff];
}

// Format time, takes in a date object
function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes; // less then 10 minutes should have a 0 in front
  var time = hours + ':' + minutes + ' ' + ampm;
  return time;
}

// Checks the page for existance of all items in array
function check(array) {
    for (var i = 0; i < array.length; i++) {
        if (document.querySelector(array[i]) === null) {
            return false;
        }
    }
    return true;
}