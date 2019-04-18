jQuery.noConflict();
(function($){
    function formInputClasses() {
        $('input, textarea').placeholder()
                    .filter('[type="text"], [type="email"], [type="tel"], [type="phone"], [type="password"]').addClass('text').end()
                    .filter('[type="checkbox"]').addClass('checkbox').end()
                    .filter('[type="radio"]').addClass('radiobutton').end()
                    .filter('[type="submit"]').addClass('submit').end()
                    .filter('[type="image"]').addClass('buttonImage');
    }

    function formLabelize() {
        // https://github.com/mathiasbynens/jquery-placeholder
        return $('input, textarea').placeholder();
    }

    function linkTweets() {
        $('.entry.tweet p').linkify('*');
    }


    $(document).ready(function() {
        formInputClasses();
        formLabelize();
        linkTweets();

    });


jQuery(document).ready(function() {
    jQuery('#home .entry').slice(5).addClass('hideOnMobile');

    // SLIDER ANIMATION
    jQuery('.slider-next:not(.active)').click(function() {
        var contentwidth = jQuery('.centered').width()-10;
        jQuery(this).addClass('active');
        if((((jQuery('.slider').position().left-contentwidth)*-1)+10) >= jQuery('.slider').width()) {
            jQuery('.slider').animate({left: '10px'},500,function() {jQuery('.slider-next').removeClass('.active');});
            jQuery('.slider-prev').removeClass('hover');
            jQuery('.slider-next').addClass('hover');
            jQuery('.slider-mask-left').fadeOut();
            jQuery('.slider-mask-right').fadeIn();
            }
        else {
            jQuery('.slider').animate({left: '-=' + contentwidth},500,function() {jQuery('.slider-next').removeClass('.active');});
            jQuery('.slider-prev').addClass('hover');
            jQuery('.slider-mask-left').fadeIn();
            if((((jQuery('.slider').position().left-(contentwidth*2))*-1)+10) >= jQuery('.slider').width()) {
                jQuery('.slider-next').removeClass('hover');
                jQuery('.slider-mask-right').fadeOut();
                }
            else {jQuery('.slider-mask-right').fadeIn();}
            }
        });
    jQuery('.slider-prev:not(.active)').click(function() {
        var contentwidth = jQuery('.centered').width()-10;
        jQuery(this).addClass('active');
        if(((jQuery('.slider').position().left)*-1) < 0) {
            var offset = Math.floor((jQuery('.slider').width()-10) / contentwidth)*contentwidth - 10;
            jQuery('.slider').animate({left: '-' + offset + 'px'},500,function() {jQuery('.slider-prev').removeClass('.active');});
            jQuery('.slider-next').removeClass('hover');
            jQuery('.slider-prev').addClass('hover');
            jQuery('.slider-mask-right').fadeOut();
            jQuery('.slider-mask-left').fadeIn();
            }
        else {
            jQuery('.slider').animate({left: '+=' + contentwidth},500,function() {jQuery('.slider-prev').removeClass('.active');});
            jQuery('.slider-next').addClass('hover');
            jQuery('.slider-mask-right').fadeIn();
            if((((jQuery('.slider').position().left) + contentwidth) *-1) < 0) {
                jQuery('.slider-prev').removeClass('hover');
                jQuery('.slider-mask-left').fadeOut();
                }
            else {jQuery('.slider-mask-left').fadeIn();}
            }
        });

    // HEADER SIGNUP TOGGLE
    jQuery('.join-us').click(function() {
        jQuery(this).toggleClass('expanded');
        //jQuery('.join-us.expanded span').html('×'); //css is already doing this on sub-tablet, not relevant on desktop
        //jQuery('.join-us').not('.expanded').find('span').html('▸');
        jQuery('.quick-signup').toggleClass('expanded');
        });

    // TOUCH DROPDOWNS
    if(jQuery('html.touch').length) {
        jQuery('li.has_children.level_1 > a').on('click', function(e) {
            if(!jQuery(this).parent().hasClass('sfHover')) {
                jQuery(this).parent().addClass('sfHover');
                e.preventDefault();
                e.stopPropagation();
                return false;
                }
            });
        }

    //jQuery('.archive-list.two-column').isotope();

//Core Functions

function addposts() {
    //console.log("addposts");
    var $loading = jQuery('.loading').show(),
        lastposttime = parseInt(jQuery(".entry").last().find("time").attr("datetime"),10) - 1;
    if(isNaN(lastposttime) || lastposttime === "") {
        lastposttime = "0";
    }
    var channel = jQuery("#channel").val();
    var querystring = "/entries/" +
        jQuery("#control-country").val() +
        "/" + jQuery("#control-priority").val() +
        "/" + jQuery("#control-type").val() +
        "/all/" + lastposttime + "/10/" +
        ( (jQuery('body.blog-style').length)?("blog/" + channel):"" ); //optional pagetype and channel attribute

    console.log(querystring);

    if(jQuery('.infinite-scroll').find('.nomore').length){$loading.hide();}
    else {
        jQuery.ajax(querystring).done(function(data) {
            if(jQuery('body.blog-style').length) {
                jQuery(".blog-landing .posts-stage").append(data);  //.isotope('reload');
            }
            else {
                //console.log(data);
                jQuery(".blog-landing .posts-stage").isotope('insert',jQuery(data));
            }
            $loading.hide();
            setupScroll();
            linkTweets();
        });
    }
}

function setupScroll() {
    //console.log("setupScroll", jQuery('.posts-stage').find('.entry').last().find('time').text() );
    jQuery('.posts-stage').find('.entry').last().waypoint(addposts,{ offset: 'bottom-in-view', triggerOnce:true });
    jQuery.waypoints('refresh');
}

function destroyScroll() {
    //console.log("destroyScroll", jQuery('.posts-stage').find('.entry').last().find('time').text() );
    jQuery('.posts-stage').find('.entry').last().waypoint('destroy');
}

function landingIsotope() {
    //console.log("landingIsotope");
    jQuery('body:not(.blog-style):not(#library).blog-landing .posts-stage').isotope('destroy').isotope({ masonry: {columnWidth:350} });
    }

function updateLibraryHash(type) {
    var catstring = '';
    jQuery(".categories .active").each( function() {
        catstring += '&' + jQuery(this).data('category');
        });
    catstring = catstring.substring(1);

    if(catstring === "") {
        catstring = 0;
        }

    var lastposttime;

    if(window.location.hash === "" || window.location.hash === "#" || type !== "pagination") {
        lastposttime = "0";
        }
    else {
        lastposttime = parseInt(jQuery(".lib-entry").last().find("time").attr("datetime"),10) - 1;
        if(isNaN(lastposttime)) {
            lastposttime = new Date().getTime() / 1000;
            }
        }

    var urlstring = "#search/" + catstring + "/" + jQuery("#control-date").val() + "/" + lastposttime + "/10/";

    window.location.hash = urlstring;
    }

function getLibraryPosts() {
    var searchParams = window.location.hash.slice(1).split("/");
    jQuery(".lib-pagination").hide();
/*
    if(searchParams[0] == "search") {
        jQuery("#control-date option[value=" + searchParams[2] + "]").attr("selected","selected");
        if(searchParams[1] != "all") {
            var catParams = searchParams[1].split("&");
            jQuery.each(catParams, function(index,value) {
                jQuery(".categories a").removeClass('active');
                jQuery(".categories a[data-category=" + value + "]").addClass('active').parent().parent().slideDown();
                });
            }
        }*/

    jQuery('.blog-landing .posts-stage').html('');
/*    var catstring = '';
    jQuery(".categories .active").each( function() {
        catstring += '&' + jQuery(this).data('category');
        });
    catstring = catstring.substring(1);

    if(catstring === "") {
        catstring = 0;
        }
*/
    jQuery('.loading').show();
    /*var lastposttime = parseInt(jQuery(".lib-entry").last().find("time").attr("datetime"),10) - 1;
    if(isNaN(lastposttime)) {
        lastposttime = new Date().getTime() / 1000;
        }*/
    var querystring = "/library/entries/" + searchParams[1] + "/" + searchParams[2] + "/" + searchParams[3] + "/10/";
    //var urlstring = "#search/" + catstring + "/" + jQuery("#control-date").val() + "/" + lastposttime + "/10/";

    //window.location.pathname = urlstring;

    //window.history.pushState("object or string", "Title", urlstring);

    //window.location.hash = urlstring;

    console.log(querystring);
    jQuery.ajax(querystring).done(function(data) {
        jQuery(".landing .posts-stage").html(data);//.isotope('reload');
//        jQuery(".blog-landing .posts-stage").append(data);//.isotope('reload');
        jQuery('.loading').hide();
        //setupScroll();
        setupLibraryLightboxLinks();
        //setupPagination();
        });
    }

function setupPagination() {
    if(jQuery(".blog-landing .posts-stage .lib-entry").length === 10) {
        jQuery(".lib-pagination").show();
        jQuery(".lib-next").on("click",function() {updateLibraryHash("pagination");});
        }
    else {jQuery(".lib-pagination").hide();}
    }

function setupLibraryLightboxLinks() {
    // LIBRARY LIGHTBOX
    var $lb = jQuery("#library-lightbox"),
        $form = $lb.find('#lightbx-form'),
        $action = $form.find(".action-split");
    $action.on("click",function(event) {
        var err=false, what='',verb = ' is';
        $form.find('[required]').each(function() {
            var input = jQuery(this), pat = (!!input.attr("pattern")) ? new RegExp(input.attr("pattern")) : null;
            if (input.val() === input.attr('title') || input.val()==='' || (pat && !pat.test(jQuery.trim(input.val()))) ) {
                input.prev('label').addClass('red-error');
                if (err===true){
                    verb = ' are';
                }
                err=true;
                what += (what==='')?input.attr('title'):' and '+input.attr('title');
            }
            else {input.prev('label').removeClass('red-error');}
        });
        if (!!err){
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            jQuery('#lb-error').html("A valid "+ what + verb + ' required.');
            return false;
        }
        else {
            $form.submit();
            console.log( jQuery('#library-lightbox #email').val(), jQuery('#library-lightbox #occupation').val(), jQuery('#library-lightbox #country').val(), jQuery('#library-lightbox #employer').val(), jQuery('#library-lightbox #zip').val(), jQuery("#library-lightbox form .action-split").attr('href'));
            //jQuery.post('/page/s/library-download', { email: jQuery('#library-lightbox #email').val(), occupation: jQuery('#library-lightbox #occupation').val(), country: jQuery('#library-lightbox #country').val(), employer: jQuery('#library-lightbox #employer').val(), zip: jQuery('#library-lightbox #zip').val(), 'custom-2176': jQuery("#library-lightbox form .action-split").attr('href') });
            jQuery.cookie('library-lightbox2','shown',{expires:30, path:'/'});
            jQuery.cookie('library-email',jQuery('#library-lightbox #email').val(),{expires:30, path:'/'});
            jQuery.cookie('library-occupation',jQuery('#library-lightbox #occupation').val(),{expires:30, path:'/'});
            jQuery.cookie('library-employer',jQuery('#library-lightbox #employer').val(),{expires:30, path:'/'});
            jQuery.cookie('library-zip',jQuery('#library-lightbox #zip').val(),{expires:30, path:'/'});
            jQuery.cookie('library-country',jQuery('#library-lightbox #country').val(),{expires:30, path:'/'});
        }
    });
    jQuery(".lib-entry .download-link").on('click', function(e){
        var contentLink = jQuery(this).attr('href'),
            $form = jQuery('#lightbx-form'),
            hiddenfield = $form.find('input[name="custom-2176"]').length ? $form.find('input[name="custom-2176"]') : jQuery('<input type="hidden" name="custom-2176">').appendTo($form);
            hiddenfield.val(contentLink);
        if(jQuery.cookie('library-lightbox2') !== 'shown') {
            e.stopPropagation();
            e.preventDefault();
            jQuery('input, textarea').placeholder();
            $lb.reveal().find("form .action-split").attr('href',contentLink);
            return false;
        }
        else {
            $form.submit();
            jQuery.cookie('library-download',contentLink,{expires:30, path:'/'});
            console.log(jQuery.cookie('library-email'), jQuery.cookie('library-occupation'), jQuery.cookie('library-country'), jQuery.cookie('library-employer'),jQuery.cookie('library-zip'), jQuery.cookie('library-download'));
            //jQuery.post('/page/s/library-download', { email: jQuery.cookie('library-email'), occupation: jQuery.cookie('library-occupation'), country: jQuery.cookie('library-country'), employer: jQuery.cookie('library-employer'), zip: jQuery.cookie('library-zip'), 'custom-2176': jQuery.cookie('library-download'), bp_load_counter: '1' });
        }
    });
}

function setupTbQuiz() {

    jQuery('.radio-field label').on('click', function() {jQuery(this).parent().children('.radio').children('.tb-answer').click();});

    jQuery('.tb-answer').on('click', function() {
        var currentQuestion = jQuery(this).attr('name');
        var currentQuestionNum = currentQuestion.replace( /\D+/g, '');
        var answerElement = "#a" + currentQuestionNum;
        jQuery(answerElement).fadeIn();
        var answerOffset = jQuery(answerElement).offset().top;
        function scrollNext(aOff, oNum) {
            window.setTimeout(function() {
                $("html, body").animate({
                    scrollTop: aOff
                }, 1000);
            }, oNum);
        }
        if (jQuery(this).parent().hasClass('radio')) {
            jQuery(this).parent().parent().children('label').addClass('error');
            jQuery(this).parent().parent().parent().children('.radio-field').children('label').addClass('incorrect');
        }
        if (jQuery(this).hasClass('right-answer')) {
            jQuery(this).parent().parent().children('label').addClass('correct');
            scrollNext(answerOffset, 500);
        } else {
            scrollNext(answerOffset, 500);
        }
    });

    jQuery('.tb-next').on('click', function() {
        var currentQuestion = jQuery(this).attr('name');
        var currentQuestionNum = currentQuestion.replace( /\D+/g, '');
        currentQuestionNum++;
        var answerElement = "#q" + currentQuestionNum;
        jQuery(answerElement).fadeIn();
        var answerOffset = jQuery(answerElement).offset().top;
        $("html, body").animate({
            scrollTop: answerOffset
        }, 1000);
    });

    function scrollFirst(oNum) {

        jQuery('.first-question').fadeIn();
        var questionOffset = jQuery('.first-question').offset().top;
        if (!jQuery('.tb-donate-module').is(':visible')) {
            window.setTimeout(function() {
                $("html, body").animate({
                    scrollTop: questionOffset
                }, 1000);
            }, oNum);
        } else {jQuery('.thank-you').fadeIn();}
    }

    jQuery(".quick-signup").on('submit', function(e) {
        if (jQuery('#tbquiz').is(':visible')) {
            e.preventDefault();
            e.stopPropagation();
            var tbemail = jQuery(".quick-signup .email").val();
            var tbzip = jQuery(".quick-signup .zip").val();
            var tbquickdata = {email: tbemail, zip: tbzip};
            jQuery.getJSON("/index.php/php/process_signup?callback=?&" + jQuery.param(tbquickdata))
                .done( function(tbquickdata, status, jqXHR){
                    console.log(tbquickdata, status, jqXHR);
                    scrollFirst(500);
                })
                .fail( function(tbquickdata, status,c ){console.log(tbquickdata,status,c,"fail");});
        }
    });

    jQuery('.tb-donate').click(function() {
        window.location = "https://donate.pih.org/page/contribute/help-stop-tb?subsource=20150318_Quiz_TB";
    });
}
$(document).ready(function() {setupTbQuiz();});

    // POST FILTER CONTROLS
    jQuery('.posts-controls select').on('change',function() {
        if(jQuery('body#library').length) {
            //libraryPostRequest();
            updateLibraryHash();
            }
        else {postRequest();}
        });

    jQuery('#control-date li').on('click',function() {
        jQuery('#control-date li').removeClass('active');
        jQuery(this).addClass('active');
        postRequest();
    });

    function postRequest() {
        console.log("postRequest");
        var controlDate = (jQuery('#control-date li').length)?jQuery("#control-date .active").data('date'):jQuery("#control-date").val(), //li vs. select option
            querystring = "/entries/" +
                jQuery("#control-country").val() +
                "/" + jQuery("#control-priority").val() +
                "/" + jQuery("#control-type").val() +
                "/" + controlDate + "/all/10" +
                ( (jQuery('body.blog-style').length)?"/blog":"" ); //optional pagetype attribute

        console.log('qs',querystring);
        jQuery('.loading').show();
        if(!jQuery("body.blog-style").length) {
            jQuery('.blog-landing .posts-stage').html('').isotope('destroy');
        }
        jQuery.ajax(querystring).done(function(data) {
            destroyScroll();
            jQuery(".blog-landing .posts-stage").html(data);
            if(!jQuery("body.blog-style").length) {
                landingIsotope();
                //jQuery(".blog-landing .posts-stage").isotope('insert',jQuery(data));
                //jQuery(".blog-landing .posts-stage").isotope('remove',jQuery(".isotope-item")).isotope('insert',jQuery(data));
            }
            jQuery('.loading').hide();
            setupScroll();
            linkTweets();
        });
    }

    // RELATED LINKS TABS
    jQuery('.related-links-tabs a').on('click', function() {
        var relatedIndex = jQuery(this).index();
        jQuery('.related-links-tabs a').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.related-links-content').hide();
        jQuery('.related-links-content').eq(relatedIndex).show();
        return false;
        });

    // BLOG POST RELATED LINKS SLIDEBOX
    if (jQuery('.take-action-list li').length > 1) {
        jQuery('.slidebox').slidebox({ pagePercentage: 0.7 });
    }

    if(jQuery('.blog-landing .infinite-scroll').length) {
        jQuery('.posts-stage .entry:last-child').waypoint(function(event, direction) {addposts();}, { offset: 'bottom-in-view', triggerOnce: true });
        }

    // MEDIA SLIDESHOW EVENT

    if(jQuery('.cycle-slideshow').length) {
        jQuery('.caption').html(jQuery('.slideshow-slide').first().find('.slideshow-caption').html());

        jQuery( '.cycle-slideshow' ).on( 'cycle-after', function( event, optionHash, outgoing, incoming, forwardFlag ) {
            var $mycaption = jQuery(this).parent('.slideshow-outer-wrapper').find('.caption');
            $mycaption.html(jQuery(incoming).find('.slideshow-caption').html());
        });
    }

    // PARTNERSHIPS HOVER EFFECT

    // if (jQuery("#partnerships").length) {
    //     jQuery(".partnership").hover( function() {
    //         jQuery(this).find("p.summary").show();
    //     }, function(){
    //         jQuery(this).find("p.summary").hide();
    //     });
    // }

    // SETUP LIGHTBOX FOR DOWNLOAD LINKS ON ARTICLE PAGES

    if(jQuery(".publication .download-link").length) {setupLibraryLightboxLinks();}

    // LIBRARY CATEGORY SELECTION

    jQuery("#library .categories .section li a").on('click', function(e) {
        if(jQuery(this).hasClass('active')) {jQuery(this).removeClass('active');}
        else {
            jQuery(this).parent().parent().find("a").removeClass('active');
            jQuery(this).addClass('active');
            }
        updateLibraryHash();

        e.preventDefault();
        return false;
        });

    // LIBRARY URL SETUP

    if(jQuery('body#library .posts-stage').length) {
        if(window.location.hash === "" || window.location.hash === "#") {updateLibraryHash();}
        else {
            var searchParams = window.location.hash.slice(1).split("/");
            if(searchParams[0] === "search") {
                jQuery("#control-date option[value=" + searchParams[2] + "]").attr("selected","selected");
                if(searchParams[1] !== "all") {
                    var catParams = searchParams[1].split("&");
                    jQuery.each(catParams, function(index,value) {
                        jQuery(".categories a[data-category=" + value + "]").addClass('active').parent().parent().slideDown();
                        });
                    }
                }
        }
        getLibraryPosts();
        }

    jQuery(window).hashchange(function() {
        if (!jQuery('#speakout_form').length && !jQuery('#bsd_contribute_form').length  ){getLibraryPosts();}
    });
/*
    var searchParams = window.location.hash.slice(1).split("/");

    if(searchParams[0] == "search") {
        if(searchParams[2] != "all") {
            jQuery("#control-date option[value=" + searchParams[2] + "]").attr("selected","selected");
            }

        if(searchParams[1] != "all") {
            var catParams = searchParams[1].split("&");
            jQuery.each(catParams, function(index,value) {
                jQuery(".categories a[data-category=" + value + "]").addClass('active').parent().parent().slideDown();
                });
            }
        }*/

    function libraryPostRequest() {


        }

    jQuery("#library .categories .section h3").on('click', function() {
        var section = jQuery(this).parent();
        if(jQuery(section).hasClass('open')) {jQuery(section).removeClass('open').find('ul').slideUp();}
        else {jQuery(section).addClass('open').find('ul').slideDown();}
        });


    // RESPONSIVE FUNCTIONS FOR HOMEPAGE SLIDER AND SUBPAGE HEADLINES
    // + MOBILE
    enquire.register("screen and (max-width:768px)", {
        match: function() {
            console.log("enquire <tablet");

            jQuery('.page-title').bigtext({
                childSelector: '> h1',
                maxfontsize: 60
                });

            jQuery('#home .slider').isotope('destroy');

            landingIsotope();
            }
        });

    // + TABLET
    enquire.register("screen and (min-width:768px) and (max-width:1000px)", {
        match: function() {
            console.log("enquire >tablet");

            jQuery('.page-title').bigtext({
                childSelector: '> h1',
                maxfontsize: 80
                });


            jQuery('#home .slider').isotope({
                layoutMode: 'masonryHorizontal',
                masonryHorizontal: {
                    rowHeight : 150,
                    columnWidth:320
                    }
                });

            landingIsotope();
            }
        });

    // + DESKTOP
    enquire.register("screen and (min-width:1000px)", {
        match: function() {
            jQuery('.quick-signup').removeClass('expanded');
            jQuery('.join-us').removeClass('expanded'); //.find('span').html('▸'); css handles this
            jQuery('.page-title').bigtext({
                childSelector: '> h1',
                maxfontsize: 110
                });

            jQuery('#home .slider').isotope({
                layoutMode: 'masonryHorizontal',
                masonryHorizontal: {
                    rowHeight : 150,
                    columnWidth:320
                    }
                });
            landingIsotope();
            }
        },true);

    // CHECK AT STARTUP
    enquire.fire().listen();

    // SHOW RECURRING UPSELLS ON DONATION PAGES
    function calculateMonthlyAmount(amount) {
        var monthlyAmount = Math.floor(amount * 0.25);
        return monthlyAmount > 5 ? monthlyAmount : 5;
    }

    function setRecurringDonation(amount) {
        // Set the amount in the Other amount field
        $('#cd_amount_other').val(amount);
        $('#cd_amount_other').trigger('keydown');
        // Check the monthly donation checkbox
        $('#cd_recurring_acknowledge').prop('checked', true);
    }

    function showThankYouMessage(monthlyAmount) {
        $('#recurring-thank-you').text('Thank you! You are giving $' + monthlyAmount + ' per month for a total of $' + (monthlyAmount * 12) + ' annually.');
    }

    if ($('body').hasClass('variant-lightbox')) {
        // Use the LOE API to determine if the user is already a recurring donor
        var guid = $.cookie('guid');
        if (guid) {
            $.ajax({
                url: '/page/graph/loe' + guid,
                cache: true,
                dataType: 'json'
            }).done(function(data) {
                if (data.group_recurring_donor) {
                    $.cookie('upsell-lightbox', 'viewed');
                }
            });
        }

        $('#submit').click(function(e) {
            if ($.cookie('upsell-lightbox') !== 'viewed' && !$('#cd_recurring_acknowledge').prop('checked')) {
                var amount = $('input[name="amount"]:checked');
                if (!amount.length || amount.val() === 'other') {
                    amount = $('input[name="amount_other"]');
                }
                amount = amount.val();
                if (!isNaN(amount) && amount > 0 && amount <= 500) {
                    e.preventDefault();
                    var monthlyAmount = calculateMonthlyAmount(amount);
                    $('#recurring-amt').text(monthlyAmount);
                    $.magnificPopup.open({
                        items: {
                            src: '#recurring-opt-in',
                            type: 'inline'
                        },
                        modal: true
                    });
                    _gaq.push(['_trackEvent', 'Lightbox', 'Show', 'EOY Recurring Upsell', 0, true]);
                    $.cookie('upsell-lightbox', 'viewed');
                }
            }
        });

        $('#choose-recurring').click(function(e) {
            e.preventDefault();
            $.magnificPopup.close();
            var amount = $('input[name="amount"]:checked').val(),
                monthlyAmount;
            if (!isNaN(amount) && amount > 0) {
                monthlyAmount = calculateMonthlyAmount(amount);
                setRecurringDonation(monthlyAmount);
            }
            _gaq.push(['_trackEvent', 'Lightbox', 'Recurring Button', 'EOY Recurring Upsell', 0, true]);
            $('#bsd_contribute_form').submit();
        });

        $('#choose-single').click(function(e) {
            e.preventDefault();
            $.magnificPopup.close();
            _gaq.push(['_trackEvent', 'Lightbox', 'One-Time Button', 'EOY Recurring Upsell', 0, true]);
            $('#bsd_contribute_form').submit();
        });
    }

    // Disable the gift acknowledgement when user opts out of monthly donation
    // on Paul's Partners in Health page
    if ($('body').hasClass('sd-redesign')) {
        $('#cd_recurring_acknowledge').on('change', function() {
            if ($(this).prop('checked')) {
                $('#cd_waterbottle_optin').prop('disabled', false);
                $('#cd_waterbottle_optin').parent().removeClass('hidden');
            } else {
                $('#cd_waterbottle_optin').prop('disabled', true);
                $('#cd_waterbottle_optin').prop('checked', false);
                $('#cd_waterbottle_optin').parent().addClass('hidden');
            }
        });
    }

});

jQuery(window).load(function() {
    // EQUALIZE FEATURED TOUT HEIGHTS
    jQuery.fn.setAllToMaxHeight = function(){
        return this.height( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).height(); }) ) );
        };
    if(jQuery('.featured-touts').length) {
        jQuery('.featured-touts .tout').setAllToMaxHeight();
        }
    });


(function($){
    $(document).ready(function() {
        //fix image sizes on double posts on IE8
        if($('html').hasClass('oldie')){
            var home = !!$('#home').length,
                $slider  = $('body').not('.blog-style').find('.slider,.posts-stage');
            if ($slider.length){
                $slider.find('.entry').not('.sticky').filter('.double').filter('.hasthumb').each(function(){
                    var $el = $(this),
                        $mwrapper = $el.find('.media-wrapper'),
                        img = $mwrapper.css('background-image'),
                        removeresize = img.substring(0, (img.lastIndexOf('/@')) );
                        $mwrapper.css({'background-image':removeresize+'/@mx_'+(home?'320':'335')+')'});
                        //console.log(img, removeresize);
                });
            }
        }
        //get the user to the last step in speakouts, if it exists
        if( $('#speakout_form').find('#step-3').length)  {window.location.hash='#step-3';}

        if(window.location.href.indexOf('/page/receipt')){
            $('#container').find('header').find('h1.logo').append('<img src="https://donate.pih.org/page/-/img/header-logo.png" id="logo-receipt-print" style="display:none;">');
            $('body').append('<style>@media print {#content,#container header {border:none;}#cse-search-box p:first-child{display:none;}#logo-receipt-print {display:block !important;}}</'+'style>');
            $('.download_link').show().html('Print Receipt').on('click',function(e){
                e.preventDefault();
                window.print();
            });

        }

        /*
        if (window.location.href.indexOf('dt-font-test')>-1){
            $('html').on('keydown', function(e) {
                if(e.keyCode===84){ //f
                    $('body').toggleClass('dt-font-test');
                }
                if(e.keyCode===54){ //f
                    $('body').removeClass('test14');
                    $('body').toggleClass('test16');
                }
                if(e.keyCode===53){ //f
                    $('body').removeClass('test14 test16');
                }
                if(e.keyCode===52){ //f
                    $('body').removeClass('test16');
                    $('body').toggleClass('test14');
                }
            });
        }*/
    });
}(jQuery));

(function($){
    $(document).ready(function() {
        var $touts =  $('.touts,.featured-touts'),
            toutType;
            if (!$touts.length){
                $touts = $('.tout, .action-item');
                toutType = $touts.eq(0).data('tout-type');
            }
            else{
                toutType = $touts.eq(0).data('tout-type');
                $touts = $touts.find('.tout');
            }
        //console.log('tout-type?',toutType);
        $touts.each(function(){
            var $el = $(this),
            $action = $el.find('form').eq(0),
            sub;
            if (toutType){
                if($action.length){
                    sub = $action.find('input[name="subsource"]').length ? $action.find('input[name="subsource"]') : $('<input type="hidden" name="subsource" />').appendTo($action);
                    sub.val(toutType);
                }
                else if( $el.find('.action-light,.action-dark').length ){
                    $action = $el.find('.action-light,.action-dark').eq(0);
                    sub = $action.attr('href');
                    $action.attr('href', sub + (sub.indexOf('?') > -1 ? "&" : "?") + "subsource=" + toutType);
                }
            }
        });
    });
}(jQuery));


/*qd page*/
$(document).ready(function() {
    var $qdpage = $('#BSD-quickdonate_info_new,#BSD-quickdonate_info,#bsd-quick-donate-update').eq(0),
        $inliner = $('<div class="inliner"/>');

        if($qdpage.length>0){
            $('#bsd-quick-donate-update, #bsd-quick-donate-delete, #bsd-quick-donate-back, #bsd-confirm-quick-donate, #bsd-skip-quick-donate').addClass('submit').appendTo($inliner.insertAfter($qdpage));
            if($('#bsd-confirm-quick-donate').length && $('#BSD-quickdonate_info_old') && (window.location.href.indexOf('UpdateInfo')>0)){
                $('<h2>Update Payment Information </h2>').prependTo($('#framework'));
                $('#BSD-quickdonate_info_new,#BSD-quickdonate_info_old').addClass('floatl');
                $('#BSD-quickdonate_info_old').parent().addClass('old-to-new');
            }
        }

});

(function ($) {
    /*
  $('a[data-reveal-id]').live('click', function (event) {
    event.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    $('#' + modalLocation).reveal($(this).data());
  });
    */
  $.fn.reveal2 = function (options) {
    var defaults = {
      animation: 'fadeAndPop',                // fade, fadeAndPop, none
      animationSpeed: 300,                    // how fast animtions are
      startCallback: function(){},
      endCallback: function(){},
      closeOnBackgroundClick: true,           // if you click background will modal close?
      dismissModalClass: 'close-reveal-modal' // the class of a button or element that will close an open modal
    };
    options = $.extend({}, defaults, options);

    return this.each(function () {
      var modal    = $(this),
        topMeasure = parseInt(modal.css('top'),10),
        topOffset  = modal.height() + topMeasure,
        locked     = false,
        modalBg    = $('.reveal-modal-bg');

      if (modalBg.length === 0) {
        modalBg = $('<div class="reveal-modal-bg" />').insertAfter(modal);
        modalBg.fadeTo('fast', 0.8);
      }

      function openAnimation() {
        modalBg.unbind('click.modalEvent');
        $('.' + options.dismissModalClass).unbind('click.modalEvent');
        if (!locked) {
          lockModal();
          if (options.animation === "fadeAndPop") {
            modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible'});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "top": $(document).scrollTop() + topMeasure + 'px',
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation === "fade") {
            modal.css({'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "opacity": 1
            }, options.animationSpeed, unlockModal);
          }
          if (options.animation === "none") {
            modal.css({'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.css({"display": "block"});
            unlockModal();
          }
            options.startCallback.apply(modal);
        }
        modal.unbind('reveal:open', openAnimation);
      }
      modal.bind('reveal:open', openAnimation);

      function closeAnimation() {
        if (!locked) {
          lockModal();
          if (options.animation === "fadeAndPop") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "top":  $(document).scrollTop() - topOffset + 'px',
              "opacity": 0
            }, options.animationSpeed / 2, function () {
              modal.css({'top': topMeasure, 'opacity': 1, 'visibility': 'hidden'});
              unlockModal();
            });
          }
          if (options.animation === "fade") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "opacity" : 0
            }, options.animationSpeed, function () {
              modal.css({'opacity': 1, 'visibility': 'hidden', 'top': topMeasure});
              unlockModal();
            });
          }
          if (options.animation === "none") {
            modal.css({'visibility': 'hidden', 'top': topMeasure});
            modalBg.css({'display': 'none'});
          }
          options.endCallback.apply(modal);
        }
        modal.unbind('reveal:close', closeAnimation);
      }
      modal.bind('reveal:close', closeAnimation);
      modal.trigger('reveal:open');

      var closeButton = $('.' + options.dismissModalClass).bind('click.modalEvent', function () {modal.trigger('reveal:close');});

      if (options.closeOnBackgroundClick) {
        modalBg.css({"cursor": "pointer"});
        modalBg.bind('click.modalEvent', function () {modal.trigger('reveal:close');});
      }

      $('body').keyup(function (event) {
        if (event.which === 27) { // 27 is the keycode for the Escape key
          modal.trigger('reveal:close');
        }
      });

      function unlockModal() {
        locked = false;
      }

      function lockModal() {
        locked = true;
      }
    });
  };
})(jQuery);

    function nativeDimension($el){
        var test = new Image();
            test.src = $el.attr('src');
            return {'width':test.width, 'height': test.height, 'ratio': test.width/test.height };
    }


        $(document).ready(function() {
            var $body = $('body'),
                $win = $(window),
                nativeHeight,
                $modal = $('#ssModal'),
                widest = 0,
                orient= false,
                captionMax = 175;
            if($modal.length){
                $(window).load(function(){
                    $('.slideshow-outer-wrapper').eq(0).find('.caption').before('<button id="trigger-slideshow" data-reveal-id="ssModal" class="action-dark submit" style="float:right;margin:10px; 0 5px 5px;">Full Screen</button>');
                });
                $modal.find('.slideshow-caption').each(function(){
                    var height = $(this).height();
                    if (height>captionMax){
                        captionMax = height;
                    }
                });
                console.log('highest caption '+captionMax);
                $('body').on('click','#trigger-slideshow' ,function(){
                    if(!orient && !!window.addEventListener){
                        window.addEventListener("orientationchange", function(){
                            $modal.find('.close-reveal-modal').click();
                            //$('#trigger-slideshow').click();
                        });
                    }
                    var $slideshow = $modal.find('.slideshow-wrapper'),
                        nativeHeight = $modal.height(),
                        $images = $slideshow.find('.media-wrapper').find('img');
                    if(widest === 0){
                        widest = 1;
                        $images.each(function(){
                            var $el = $(this),
                                dimen = nativeDimension($el);
                                console.log(dimen);
                            widest = (dimen.ratio>widest)?dimen.ratio:widest;
                        });
                    }
                    console.log('widest ratio'+widest);
                    $modal.reveal2({
                        animation: 'fade',
                        startCallback:function(){
                            $body.addClass('ssModalOn');
                            var wWidth = $win.width(),
                                wHeight = $win.height(),
                                ssheight,
                                sswidth,
                                marginLeft;

                                if(wWidth > wHeight || wWidth>1200){
                                    console.log(wWidth + 'greater than '+wHeight);
                                    ssheight = ~~(wHeight) - captionMax - 60;
                                    sswidth = ~~(ssheight * widest);
                                    sswidth = (sswidth>wWidth)?wWidth:sswidth;
                                    console.log(sswidth);
                                }
                                else {
                                    console.log(wWidth + 'less than '+wHeight);
                                    wWidth = (wWidth>1200)?1200:wWidth;
                                    sswidth = wWidth;
                                    ssheight = sswidth/widest;
                                }
                            if (wWidth>767) {
                                    marginLeft = ~~((wWidth - sswidth)/2);
                                    console.log('heights: actual: '+$win.height() +' vs. '+ ssheight, 'widths: actual: '+$win.width() +' vs. '+ sswidth, marginLeft);
                                $slideshow.height( ssheight );
                                $modal.width( sswidth ).css({'margin-left':marginLeft});
                            } else {$slideshow.height(nativeHeight);}
                            $images.each(function(){
                                var $el = $(this),
                                    src = $el.attr('src').replace(/\@my_\d+/,'');
                                $el.attr('src',(src+'@my_'+(~~ssheight)));
                            });
                            $slideshow.cycle('reinit').cycle('goto', 0).cycle('resume');
                        },
                        endCallback: function(){
                            $body.removeClass('ssModalOn');
                            $slideshow.cycle('pause');
                        }
                    });
                });
            }
        });

}(jQuery));

// Slider
jQuery(function($){
    $('#bulletLooper').on('shown', function(e){
        $('.looper-nav > li', this)
                .removeClass('active')
                .eq(e.relatedIndex)
                    .addClass('active');
    });
});


jQuery(document).ready(function($) {

    // display share and tweet boxes in popup window
    // -----------------------
    $('.sharer-tw').click(function(e) {
        var $target = $(e.currentTarget),
          tweet = $target.data('tweet'),
          url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);

        e.preventDefault();
        window.open(url, 'tweet', 'width=500,height=384,menubar=no,status=no,toolbar=no');
    });

    $('.sharer-fb').click(function(e) {
        var $target = $(e.currentTarget),
          fbLink = $target.data('fblink'),
          url = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(fbLink);

        e.preventDefault();
        window.open(url, 'share', 'width=500,height=300,menubar=no,status=no,toolbar=no');
    });

    //  Sticky Side Shares
    // -----------------------
    if ($(window).width() >= 1000 && !!jQuery('.side-share')) {

        var sideShare = jQuery('.side-share');

        if(sideShare.length) {
            var stickyShare = sideShare.offset().top;

            $(window).scroll(function(){
                var windowTop = jQuery(window).scrollTop();

                if (stickyShare < windowTop){$('.side-share').addClass('side-share__sticky');} else {$('.side-share').removeClass('side-share__sticky');}
            });
        }
    } //end sticky sideshares

    // Init bigSlide
    $('.bigslide-menu').bigSlide({
        side: 'right',
        easyClose: true,
        push: ('.push'),
        afterOpen: function() {
            $('.bigslide-menu').removeClass( 'fa-bars' ).addClass( 'fa-times' );
        },
        afterClose: function() {
            $('.bigslide-menu').addClass( 'fa-bars' ).removeClass( 'fa-times' );
        }
    });

    // bigSlide nested nav items
    // if ( $('.bigslide-panel .level_1').hasClass('has_children') ) {
    //     $('.bigslide-panel .level_1').on('click tap', function(e){
    //         var navItem = $(this),
    //             nestedNav = navItem.children('ul');

    //         nestedNav.toggle();
    //         navItem.toggleClass('js-subnav-open');

    //         e.preventDefault();
    //     });
    // }

    // Mobile search
    $('#mobile-search-trigger').on('click', function(e) {
        var searchIcon = $(this),
            search = $( '.mobile-search' ),
            $body = $('body');

        $body.addClass( 'js-search-active' );
        search.fadeIn();

        e.preventDefault();
    });
    $('#mobile-search-close').on('click', function(e) {
        var search = $( '.mobile-search' ),
            $body = $('body');

        $body.removeClass( 'js-search-active' );
        search.fadeOut();

        e.preventDefault();
    });
});