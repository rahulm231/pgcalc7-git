/**
* Returns an XMLHttp instance to use for asynchronous
* downloading. This method will never throw an exception, but will
* return NULL if the browser does not support XmlHttp for any reason.
* @return {XMLHttpRequest|Null}
*/
function createXmlHttpRequest() {
    try {
        if (typeof ActiveXObject != 'undefined') {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window["XMLHttpRequest"]) {
            return new XMLHttpRequest();
        }
    } catch (e) {
        changeStatus(e);
    }
    return null;
};

/**
* This functions wraps XMLHttpRequest open/send function.
* It lets you specify a URL and will call the callback if
* it gets a status code of 200.
* @param {String} url The URL to retrieve
* @param {Function} callback The function to call once retrieved.
*/
function downloadUrl(url, callback) {
    var status = -1;
    var request = createXmlHttpRequest();
    if (!request) {
        return false;
    }
   
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            try {
                status = request.status;
            } catch (e) {
                // Usually indicates request timed out in FF.
            }
            if (status == 200) {
                callback(request.responseXML, request.status);
                request.onreadystatechange = function() {};
            }
        }
    }
    request.open('GET', url, true);
    try {
        request.send(null);
    } catch (e) {
        changeStatus(e);
    }
};

/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
function xmlParse(str) {
    if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
        var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.loadXML(str);
        return doc;
    }
    
    if (typeof DOMParser != 'undefined') {
        return (new DOMParser()).parseFromString(str, 'text/xml');
    }
    
    return createElement('div', null);
}

/**
 * Appends a JavaScript file to the page.
 * @param {string} url
 */
function downloadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function validate_required(field, alerttxt) {
    if (field.name == "cons_email") {
        with (field) {
            if (value == null || value == "" || value == "Your email address...") {
                alert(alerttxt);
                return false;
            } else {
                return true;
            }
        }
    } else if (field.name == "cons_zip_code") {
        with (field) {
            if (value == null || value == "" || value == "Your zip code...") {
                alert(alerttxt);
                return false;
            } else {
                return true;
            }
        }
    }
}

function validate_email(field, alerttxt) {
    with (field) {
        apos = value.indexOf("@");
        dotpos = value.lastIndexOf(".");
        if (apos<1 || dotpos-apos < 2) {
            alert(alerttxt);
            return false;
        } else {
            return true;
        }
    }
}

function validate_form(thisform) {
    with (thisform) {
        if (validate_required(cons_email,"Email must be filled out.")==false) {
            cons_email.focus(); return false;
        } else {
            if (validate_email(cons_email,"Not a valid e-mail address.")==false) {
                cons_email.focus(); return false;
            } else {
                if (validate_required(cons_zip_code,"Zip Code must be filled out.")==false) {
                    cons_zip_code.focus(); return false;
                }
            }
        }
    }
}

function validate_state(field, alerttxt) {
    if (field.name == "state") {
        with (field) {
            if (value == null || value == "" || value == "State") {
                alert(alerttxt);
                return false;
            } else {
                return true;
            }
        }
    } else if (field.name == "zip") {
        with (field) {
            if (value == null || value == "" || value == "Zip code") {
                alert(alerttxt);
                return false;
            } else {
                if (value.length < 5) {
                    alert(alerttxt);
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
}

function validate_state_search(thisform) {
    with (thisform) {
        if (validate_state(state,"Please select a State.")==false) {
            state.focus(); return false;
        }
    }
}

function validate_zip_search(thisform) {
    with (thisform) {
        if (validate_state(zip,"Please enter a valid Zip code.")==false) {
            zip.focus(); return false;
        }
    }
}

function toggleMenu(which_menu) {
    if ($(which_menu).siblings().css('left') == '-200000px') {
        $('.dropdown').css('left','-200000px');
        $(which_menu).siblings().attr('style','left:0');
        $(which_menu).removeAttr('style');
    } else {
        $('.dropdown').css('left','-200000px');
        $(which_menu).attr('style','background-color: transparent; border:none; color:#FFFFFF;');
    }
}

function toggle_layer(layer){
    switch(layer){
        case 'fb':
            $('#facebook_link').addClass('active');
            $('#fb_feed').show();
            $('#twitter_link').removeClass('active');
            $('#tw_feed').css('height','0');    
            break;
        case 'tw':
            $('#twitter_link').addClass('active');
            $('#tw_feed').css('height','272px');
            $('#facebook_link').removeClass('active');
            $('#fb_feed').hide();
            break;
    }
}

// Functionality related to User-Submitted spotlights
function setTitle(){
    var first=$('input[name="client_first_name"]').val();
    var last=$('input[name="client_last_name"]').val();
    $('input[name="title"]').val("Client Profile "+first+" "+last);
}

function about(value){   
    if(value=='yes'){
        $('#client_info').hide();
        var first=$('input[name="submitter_first_name"]').val();
        var last=$('input[name="submitter_last_name"]').val();
        $('input[name="client_first_name"]').val(first);
        $('input[name="client_last_name"]').val(last);
    }
    if(value=='no'){
        $('#client_info').show();
        $('input[name="client_first_name"]').val('');
        $('input[name="client_last_name"]').val('');
    }
}

$(document).ready(function() {
    $('#nav_toggle_link').click(function() {
        $('#mob_nav').slideToggle('slow', function() {
        });
    });
    $('#search_toggle_link').click(function() {
        $('#mob_search').slideToggle('slow', function() {
        });
    });
    
    $("#email_submit").on({
        mouseenter: function(){
            $(this).attr('src','http://www.easterseals.com/assets/wrapper-images/join-us-home2.gif');
        },
        mouseleave: function(){
            $(this).attr('src','http://www.easterseals.com/assets/wrapper-images/join-us-home.gif');
        }
    });
    $('.join_us_button a').click(function() {
        $('#email_submit').click();
    });
    $('#nav li#connect_locally div.dropdown #lookup .zip_and_dist .go_button a').click(function() {
        $('#zip_search_submit').click();
    });
    $('.lookup .zip_and_dist .go_button a').click(function() {
        $('#zip_search_submit2').click();
    });
    $('#lookup .go_button a.nh_search').click(function() {
        $('#zip_search_submit3').click();
    });
    // Remove certain directories from the breadcrumbs
    $('#breadcrumbs a').each(function(){
      var theHref = $(this).attr('href');
      if (theHref.match( /(spotlights|assets|miscellaneous|shared-components)/ )) {
        $(this).prev('.breadcrumbseparator').remove();
        $(this).next().remove();
        $(this).remove();
      }
    });
    
    /*
    // The following function is for accommodating drop down menus for mobile devices.
    if (Modernizr.touch) {
        // Loop through each top level anchor 
        $('#nav').children('li').each(function(i){
            // Grab anchor href value                                      
            var newLink = $(this).children('a').attr('href');
            // Grab anchor text and replace break tags with space
            var newText = $(this).html().replace(/<br\s?\/?>/,'&nbsp;');
            // Make the top level anchor not hyperlinked, yet clickable to expand drop down
            var theHref = $(this).children('a').attr('href','javascript:void(0);').attr('onclick','toggleMenu(this);');
            // Prepend the top nav anchor to the sub nav 
            $('<li><a href="'+newLink+'">'+newText+'</a></li>').prependTo($(this).children('div.dropdown').children('div.dropdown_nav').children('ul.first'));
            // Since it grabs the sub nav with it, we need to remove subnav from newly created link
            $('.first .dropdown').remove();
            // Set all dropdowns to be hidden to avoid issue when menu doesn't show on first page load
            $('.dropdown').attr('style','left:-200000px;');
        });
    }
    */

  // Track all downloads and external links in Google Analytics
  var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
    var baseHref = '';
    if ($('base').attr('href') != undefined) baseHref = $('base').attr('href');
    $('a').on('click', function(event) {
      var el = $(this);
      var track = true;
      var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
      var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
    if (!href.match(/^javascript:/i) && !el.attr('onclick')) {
      var elEv = []; elEv.value=0, elEv.non_i=false;
      if (href.match(/^mailto\:/i)) {
        elEv.category = "Email";
        elEv.action = "Click";
        elEv.label = href.replace(/^mailto\:/i, '');
        elEv.loc = href;
      }
      else if (href.match(filetypes)) {
        var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
        elEv.category = "Download";
        elEv.action = "Click - " + extension[0].toUpperCase();
        elEv.label = href.replace(/ /g,"-");
        elEv.loc = baseHref + href;
      }
      else if (href.match(/^https?\:/i) && !isThisDomain && !href.match(/^https?\:\/\/secure2/i) && !href.match(/^https?\:\/\/es\./i)) {
        elEv.category = "External";
        elEv.action = "Click";
        elEv.label = href.replace(/^https?\:\/\//i, '');
        elEv.non_i = true;
        elEv.loc = href;
      }
      else if (href.match(/^tel\:/i)) {
        elEv.category = "Telephone";
        elEv.action = "Click";
        elEv.label = href.replace(/^tel\:/i, '');
        elEv.loc = href;
      }
      else track = false;

      if (track) {
        _gaq.push(['_trackEvent', elEv.category, elEv.action, elEv.label, elEv.value, elEv.non_i]);
        if ( el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') {
          setTimeout(function() { location.href = elEv.loc; }, 400);
          return false;
        }
      }
    }
    });
  
});