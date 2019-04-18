$(document).ready(function () {

    $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right button[type="button"]').hover(function () {
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right .micro-nav-right-drop').css('display', 'block');
    }, function () {
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right .micro-nav-right-drop').css('display', 'none');
    });

    $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right .micro-nav-right-drop').hover(function () {
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right .micro-nav-right-drop').css('display', 'block');
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right button[type="button"]').addClass('keep-hover');
    }, function () {
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right .micro-nav-right-drop').css('display', 'none');
        $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right button[type="button"]').removeClass('keep-hover');

    });

    $('.news-panel .panel-default .panel-body').matchHeight();
    $('div#our-team .doc-box').matchHeight();
    $('.icon-row .search-row').matchHeight();


    $('.navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right button[type="button"]').click(function () {
        $(this).toggleClass('system-ham-click');
        $('.micro-nav-right .btn.btn-primary.search-btn').css("margin-left:67px");
    });

    $('.navbar.navbar-munson .primary .navbar-collapse .navbar-nav li.dropdown').click(function () {
        $(this).toggleClass('open');
    });

    var Piedmont = {};


    function htmlEncode(value) {
        return $('<div/>').text(value).html();
    }

    function htmlDecode(value) {
        return $('<div/>').html(value).text();
    }

    /* BEGIN Video Overlay */
    overlayVideoThumbnail();

    function overlayVideoThumbnail() {

        if ($('#hdnVideoOverlayLeft').length > 0) {
            var overlayLeftUrl = $('#hdnVideoOverlayLeft').val();
            var overlayRightTopUrl = $('#hdnVideoOverlayRightTop').val();
            var overlayRightBottomUrl = $('#hdnVideoOverlayRightBottom').val();


            if (overlayLeftUrl) {
                applyOverlay('.mhv-home-col .videowrapfull', overlayLeftUrl);
            }
            if (overlayRightTopUrl) {
                applyOverlay('.mhv-home-col .right-col-video', overlayRightTopUrl);
            }
            if (overlayRightBottomUrl) {
                applyOverlay('.mhv-home-col .mhv-patientvideo p', overlayRightBottomUrl);
            }
        }

    }

    // Adds active to link clicked if it matches current url

    var full_path = location.href.split("#")[0];

    $("#list-nav-links a").each(function () {

        var $this = $(this);
        if ($this.prop("href").split("#")[0] == full_path) {

            $(this).parents('.sublinks').slideToggle('slow');
            $(this).parents('.dropdown').next('.sublinks').slideToggle('slow');
            $(this).parents('.dropdown').addClass('open');
            $(this).parents('.dropdown').find('.caret-down').addClass('turn-right');
            $(this).parents('.sublinks').prev('.dropdown').find('.caret-down').addClass('turn-right');
            $(this).parents('.sublinks').prev('.dropdown').addClass('open');

        }

    });

    $('ul.nav#home-main li.dropdown').hover(function () {
        $(this).addClass("open");
    }, function () {
        $(this).removeClass("open");
    });

    enquire.register("screen and (min-width: 991px)", {
        match: function () {
            $('.sub-nav ul.nav li.dropdown, .universal-nav-control ul.nav li.dropdown').hover(function () {
                $(this).addClass("open");
            }, function () {
                $(this).removeClass("open");
            });
        },
        unmatch: function () {
        }
    });

    $('.sub-nav ul.nav li.dropdown > a').click(function () {

        var path = this.href;
        window.location = path;
    });

    $('.universal-nav-control ul.nav li.dropdown a').click(function () {

        var path = this.childNodes[1].attributes["0"].nodeValue;
        window.location = path;
    });

    $('.navbar.navbar-munson .secondary a.dropdown-toggle').click(function () {

        var path = this.href;
        window.location = path;
    });


    function applyOverlay(element, imageUrl) {
        $(element).each(function () {

            var wrapperElem = this;

            $(wrapperElem).children('iframe, object').each(function () {
                var videoElem = this;

                var overlay = document.createElement("div");
                overlay.className = "video-button";

                var overlayImg = document.createElement("img");
                overlayImg.className = "video-button-img";
                overlayImg.src = imageUrl;
                //var overlay = $("<div>", {class: "video-button"});
                //var overlayImg = $("<img>", {src: imageUrl, class: "video-button-img"});


                $(videoElem).addClass('video-embed');

                //$(overlay).css('background-image', 'url(' + overlayUrl + ')');
                $(overlayImg).css('max-height', $(videoElem).height());
                //$(overlay).css('width', $(videoElem).width());

                $(overlayImg).appendTo(overlay);
                $(videoElem).appendTo(overlay);
                $(wrapperElem).prepend(overlay);
            });
        });
    }



    /*
        $(window).resize(function () {
            $('.videowrapfull, .right-col-video, .mhv-patientvideo p').each(function(){
                var wrapperElem = this;
    
                $(wrapperElem).children('.video-button').each(function(){
                    var overlay = this;
    
                    var vidWidth = '';
                    var vidHeight = '';
    
                    $(this).children('iframe, object').each(function(){
                        var videoElem = this;
    
                        vidWidth = $(this).width();
                        vidHeight = $(this).height();
                    });
    
                    $(overlay).css('height', vidHeight);
                    $(overlay).css('width', vidWidth);
                });
            });
        });
    */

    $('.video-button').on('click', function () {
        var videoButton = this;
        $(this).children('.video-button-img').each(function () {
            $(this).fadeOut(function () {
                $(videoButton).children('.video-embed').each(function () {
                    var videoElem = this;
                    $(videoElem).css({ "opacity": "1", "display": "block" });

                    // BrightCove videos render as objects, while Vimeo uses iframes - set the autoplay params accordingly
                    if (videoElem.tagName === 'OBJECT') {
                        var videoData = $(videoElem).attr('data').replace('&autoStart=&', '&autoStart=true&');
                        $(videoElem).attr('data', videoData);
                    }
                    if (videoElem.tagName === 'IFRAME') {
                        $(videoElem)[0].src += "?autoplay=1";
                    }

                    $(this).unbind("click");
                });

            });
        });


    });
    /* END Video Overlay */



    if (($('.layout-mobile').css("display") != "none")) { Piedmont.displayMode = "mobile"; }
    if (($('.layout-large').css("display") != "none")) { Piedmont.displayMode = "large"; }
    if (($('.layout-medium').css("display") != "none")) { Piedmont.displayMode = "medium"; }
    if (($('.layout-small').css("display") != "none")) { Piedmont.displayMode = "small"; }


    if ($('#hdnTopAdTitle')) {
        $('#lnkTopAd').attr('name', $('#hdnTopAdTitle').val());
    }

    if ($('#hdnBottomAdTitle')) {
        $('#lnkBottomAd').attr('name', $('#hdnBottomAdTitle').val());
    }

    /* ---------------------- BEGIN Google Analytics Event Tracking ------------------------------*/

    /* Global events */
    $('#footer-main a').each(function () {
        $(this).data('category', 'GlobalFooter');
        $(this).data('label-prefix', 'Footer Link');
    });

    $('#footer-main .hospital-left a').each(function () {
        $(this).data('label-prefix', 'Locations');
    });

    $('#footer-main .pnl-news a').each(function () {
        $(this).data('label-prefix', 'News');
    });

    $('.header a, #pnl-search input[type=button], .nav-in a').each(function () {
        $(this).data('category', 'GlobalHeader');
    });

    $('.nav-in .container .logo a').each(function () {
        $(this).data('ga-click-label', 'Piedmont Logo');
    });

    $('.nav-in .nav a').each(function () {
        $(this).data('label-prefix', 'Top Nav');
    });
    /* END Global events */

    /* Homepage events */
    $('.home-baner a, #footer-main .resource a').each(function () {
        $(this).data('category', 'PiedmontHome')
    });

    $('.home-baner .home-baner-right a').each(function () {
        $(this).data('label-prefix', 'Learn More');
    });

    $('#footer-main .resource a').each(function () {
        $(this).data('label-prefix', 'Share');
    });

    $('.blog-article-widget a').each(function () {
        if ($(this).children('h5.article-widget-header').length == 0) {
            var articleTitleElem = $(this).children('.article-widget-content').first().children('.article-widget-article-title').first();
            if (articleTitleElem && $(articleTitleElem).length > 0) {
                var articleTitle = $(articleTitleElem).text();
                $(this).data('ga-click-label', articleTitle);
            }
        }
    });
    /* END Homepage events */

    /* Find a Doc events */
    $('.find-a-doc-profile-wrapper.light a').each(function () {
        $(this).data('category', 'ProfileOverview');
    });

    $('.find-a-doc-profile-wrapper.light h1').each(function () {
        $(this).data('category', 'ProfileOverview');
    });

    $('.find-a-doc-profile-wrapper.full a, find-a-doc-profile-wrapper.full h1').each(function () {
        $(this).data('category', 'ProfileDetailed');
    });

    $('.find-a-doc-profile-wrapper.full h1').each(function () {
        $(this).data('category', 'ProfileDetailed');
    });

    var docName = $('.find-a-doc-profile-wrapper .header-doctor-name').text();
    if (docName) {
        $('.find-a-doc-profile-wrapper .doctor-contact-location-address a, .find-a-doc-profile-wrapper .pnl-doctor-contact-phone a, .pnl-doctor-contact-fax, .find-a-doc-profile-wrapper .pnl-doctor-contact-fax a').each(function () {
            $(this).data('label-prefix', docName);
        });
    }

    $('.find-a-doc-profile-wrapper.full .list-doctor-tabs a').each(function () {
        $(this).data('label-prefix', 'Tab');
    });

    $('.BrightcoveExperience object').on('click', function () {

    });

    $('.pnl-doctor-social-share ul li a').each(function () {
        $(this).data('category', 'ProfileDetailed');
        $(this).data('label-prefix', 'Share');
        var faIcon = $(this).children('span').first().children('i').first();
        if (faIcon) {
            if ($(faIcon).hasClass('fa-envelope-o')) { $(this).data('ga-click-label', 'Email'); }
            if ($(faIcon).hasClass('fa-twitter')) { $(this).data('ga-click-label', 'Twitter'); }
            if ($(faIcon).hasClass('fa-facebook')) { $(this).data('ga-click-label', 'Facebook'); }
            if ($(faIcon).hasClass('fa-pinterest')) { $(this).data('ga-click-label', 'Pinterest'); }
        }
    });

    $('.btn.btn-link.btn-link-forward.down-btn.advanced.m-show').on('click', function () {
        var form = $('.adv-search.down-search');

        $('html, body').animate({
            scrollTop: form.offset().top + 'px'
        }, 'fast');
        e.preventDefault;
        return this;
    });
    /*
        if($('.find-a-doc-profile-wrapper.full').length > 0){
            $('.nav-in .container .logo a').each(function(){
                $(this).data('category', 'ProfileDetailed');
                $(this).data('ga-click-label', 'PiedmontLogo');
            });
        }
    */
    /* END Find a Doc events */

    /* Location Events */
    $('#avid-loc-search-type #pnl-category-buttons button').each(function () {
        $(this).data('category', 'Locations');
        $(this).data('label-prefix', 'Filter');
    });

    $('#avid-loc-container .pnl-location').each(function () {
        $(this).data('category', 'Locations');
        $(this).data('label-prefix', 'Results');
        $(this).addClass('ga-click');
    });


    $('#avid-loc-container .lnk-google-maps').each(function () {
        $(this).data('category', 'Locations');
        $(this).data('label-prefix', 'GoogleMaps');
    });

    $('#avid-loc-container .lnk-learn-more').each(function () {
        $(this).data('category', 'Locations');
        $(this).data('label-prefix', 'LearnMore');
    });

    /* END Location Events */

    /* Living Better Homepage Events */
    $('#blog-home-wrapper .blog-topics-list-item a').each(function () {
        $(this).data('category', 'LivingBetter');
        $(this).data('label-prefix', 'Filter');
    });

    $('#pnlSignup #btnSignup').each(function () {
        $(this).data('category', 'LivingBetter');
    });

    $('#blog-home-wrapper .blog-article a').each(function () {
        $(this).data('category', 'LivingBetter');
        var titleElem = $(this).parent().parent().children('.pnl-article-title').first();
        if (titleElem) {
            var blogTitle = $(titleElem).text();
            $(this).data('ga-click-label', blogTitle);
            $(this).data('label-prefix', 'Article Selected');
        }
    });

    $('#blog-home-wrapper .blog-pages .btn-prev-next').each(function () {
        $(this).data('category', 'LivingBetter');
        $(this).data('label-prefix', 'Bottom Nav');

        if ($(this).children('i').first().hasClass('fa-chevron-left')) {
            $(this).data('ga-click-label', 'BackArrow');
        }
        if ($(this).children('i').first().hasClass('fa-chevron-right')) {
            $(this).data('ga-click-label', 'ForwardArrow');
        }

    });
    /* END Living Better Homepage Events */

    /* Living Better Article Events */
    $('.left-content #pnlSignup #btnSignup').each(function () {
        $(this).data('category', 'Article');
        var blogTitle = $('.blog-article .pnl-header-title h2').text();
        if (blogTitle) {
            $(this).data('label-prefix', 'Sign Up');
            $(this).data('ga-click-label', blogTitle);

        }
    });

    $('.living-better .left-content .btn-back').each(function () {
        $(this).data('category', 'Article');
        $(this).data('ga-click-label', 'Back');
    });

    $('.blog-article .pnl-content a').each(function () {
        $(this).data('category', 'Article');
        $(this).data('label-prefix', 'Link');
    });

    $('.blog-tags .tag-item a').each(function () {
        $(this).data('category', 'Article');
        $(this).data('label-prefix', 'Tags');
    });

    $('.pnl-blog-share-fonts ul li a').each(function () {
        $(this).data('category', 'Article');
        $(this).data('label-prefix', 'Share');
        var faIcon = $(this).children('span').first().children('i').first();
        if (faIcon) {
            if ($(faIcon).hasClass('fa-envelope-o')) { $(this).data('ga-click-label', 'Email'); }
            if ($(faIcon).hasClass('fa-twitter')) { $(this).data('ga-click-label', 'Twitter'); }
            if ($(faIcon).hasClass('fa-facebook')) { $(this).data('ga-click-label', 'Facebook'); }
            if ($(faIcon).hasClass('fa-pinterest')) { $(this).data('ga-click-label', 'Pinterest'); }
        }
    });
    /* END Living Better Article Events */

    /* Content Page events */
    $('.left-content a').each(function () {

    });
    /* END Content Page events */

    $('a, input[type=button], button, h1, .ga-click').on('click', function (e) {

        var clicked = this;
        var category = '';
        var labelPrefix = '';
        var label = $(clicked).text();


        if ($(clicked).is('input')) {
            label = $(clicked).val();
        }

        if ($(clicked).data('ga-click-label')) {
            label = $(clicked).data('ga-click-label');
        }

        if (label.length == 0) {
            label = $(clicked).attr('name');
        }
        if (label && label.length > 0) {
            label = htmlEncode(label.trim());
        }

        if ($(clicked).data("category")) {
            category = $(clicked).data("category");
        }
        if ($(clicked).data("label-prefix")) {
            labelPrefix = $(clicked).data("label-prefix");
            if (label) {
                labelPrefix = labelPrefix + " - ";
            }
        }

        if (category && label) {
            GoogleAnalyticsTrackEvent(category, 'Click', labelPrefix + label);
            //e.preventDefault();
            //console.log("_trackEvent(" + category + ", Click, " + labelPrefix + label + ")");
        }
    });
    /* ---------------------- END Google Analytics Event Tracking ------------------------------*/

    $('.left-content #list-nav-links li a.active').on('click', function (e) {
        e.preventDefault();
    });


    var mobileNavDisplay = $('navigation-icons').css('display') != 'none' && $('.navigation-icons').css('display') != undefined;

    if (mobileNavDisplay) {
        $('.mobile-search-icon').click(function () {
            $('.mobile-search-drop').slideDown();
        });

        $('#mobile-pnl-search-close').click(function () {
            $('.mobile-search-drop').slideUp();
        });
    }

    showFindADoctorControls('#pnl-fad-nav');
    showFindADoctorControls('#pnl-fad-widget');

    var imageToShowPathBanner = "";
    var imageToShowLinkBanner = "";

    var imageToShowPathTop = "";
    var imageToShowLinkTop = "";

    var imageToShowPathBottom = "";
    var imageToShowLinkBottom = "";

    function findCorrectImage(start) {
        var imageSmallBanner = $('#hdnSmallBanner').attr('Value');
        var imageMediumBanner = $('#hdnMediumBanner').attr('Value');
        var imageLargeBanner = $('#hdnLargeBanner').attr('Value');

        var imageBannerArr = [imageSmallBanner, imageMediumBanner, imageLargeBanner];

        var imageSmallTop = $('#hdnSmallTopAd').attr('Value');
        var imageMedTop = $('#hdnMedTopAd').attr('Value');
        var imageLargeTop = $('#hdnLargeTopAd').attr('Value');

        var imageSmallBottom = $('#hdnSmallBottomAd').attr('Value');
        var imageMedBottom = $('#hdnMedBottomAd').attr('Value');
        var imageLargeBottom = $('#hdnLargeBottomAd').attr('Value');


        var imageTopArr = [imageSmallTop, imageMedTop, imageLargeTop];
        var imageBottomArr = [imageSmallBottom, imageMedBottom, imageLargeBottom];

        var imageSmallBannerLink = $('#hdnSmallBannerLink').attr('Value');
        var imageMediumBannerLink = $('#hdnMediumBannerLink').attr('Value');
        var imageLargeBannerLink = $('#hdnLargeBannerLink').attr('Value');

        var imageBannerLinkArr = [imageSmallBannerLink, imageMediumBannerLink, imageLargeBannerLink];

        var imageSmallLinkTop = $('#hdnSmallTopAdLink').attr('Value');
        var imageMedLinkTop = $('#hdnMedTopAdLink').attr('Value');
        var imageLargeLinkTop = $('#hdnLargeTopAdLink').attr('Value');

        var imageSmallLinkBottom = $('#hdnSmallBottomAdLink').attr('Value');
        var imageMedLinkBottom = $('#hdnMedBottomAdLink').attr('Value');
        var imageLargeLinkBottom = $('#hdnLargeBottomAdLink').attr('Value');

        var imageTopLinkArr = [imageSmallLinkTop, imageMedLinkTop, imageLargeLinkTop];
        var imageBottomLinkArr = [imageSmallLinkBottom, imageMedLinkBottom, imageLargeLinkBottom];


        //Set Image For Top 
        for (i = start; i < imageTopArr.length; i++) {
            if (imageTopArr[i] != undefined) {
                imageToShowPathTop = imageTopArr[i];
                break;
            }
        }

        //Set Image For Bottom 
        for (i = start; i < imageBottomArr.length; i++) {
            if (imageBottomArr[i] != undefined) {
                imageToShowPathBottom = imageBottomArr[i];
                break;
            }
        }

        //Set Link For Top 
        for (i = start; i < imageTopLinkArr.length; i++) {
            if (imageTopLinkArr[i] != undefined) {
                imageToShowLinkTop = imageTopLinkArr[i];
                break;
            }
        }


        //Set Link For Bottom 
        for (i = start; i < imageBottomLinkArr.length; i++) {
            if (imageBottomLinkArr[i] != undefined) {
                imageToShowLinkBottom = imageBottomLinkArr[i];
                break;
            }
        }

        //Set Image For Banner
        for (i = start; i < imageBannerArr.length; i++) {
            if (imageBannerArr[i] != undefined) {
                imageToShowPathBanner = imageBannerArr[i];
                break;
            }
        }

        //Set Link For Banner
        for (i = start; i < imageBannerLinkArr.length; i++) {
            if (imageBannerLinkArr[i] != undefined) {
                imageToShowLinkBanner = imageBannerLinkArr[i];
                break;
            }
        }

    }

    if (Piedmont.displayMode === "mobile" || Piedmont.displayMode === "small") {

        if ($('.content.practice').length) {
            $('.nav-mobile-header').text($('h1.header-practice').text());

        }

        if ($('.find-a-doc-profile-wrapper').length) {
            $('.pnl-doctor-name').insertBefore('.pnl-doctor-image');
            $('.pnl-doctor-specialty').insertAfter('.pnl-doctor-name');
            //$('.pnl-doctor-medical-group').insertAfter('.pnl-doctor-contact-info');
            //$('.pnl-doctor-social-share').insertAfter('.pnl-doctor-medical-group');
            //$('.pnl-doctor-medical-group-2').insertAfter('.pnl-doctor-medical-group');

        }

        if ($().phoneLinker) {
            var plink = $().phoneLinker();
            phoneLink = plink.createLinks('.phone-main');
            plink.createLinks('.phone-link');

        }
    }

    if (Piedmont.displayMode === "small") {
        findCorrectImage(0);

        /*$('.blog-signup.inline').appendTo('#blog-home-wrapper');*/
        /*$('.left-content .blog-signup').insertAfter('.pnl-blog-social-share');*/
        $('.pnl-signup-wrapper').addClass('pagenav-mobile');
    }
    if (Piedmont.displayMode === "medium") {
        /*$('.blog-signup.inline').appendTo('#blog-home-wrapper');*/
        /*$('.left-content .blog-signup').insertAfter('.pnl-blog-social-share');*/
        $('.pnl-signup-wrapper').addClass('pagenav-mobile');

        findCorrectImage(1);
    }
    if (Piedmont.displayMode === "large") {
        findCorrectImage(2);

        if ($('.blog-page-list li a.active').length) {
            if ($('.blog-page-list li a.active').text() != "1") {
                $('.blog-article-list ul li.blog-article-item').slice(0, 2).appendTo('#ul-blog-posts-header');
                $('#ul-blog-posts-header').show();
                $('#blog-article-list-header').show();

                $('#ul-blog-posts-header li:first').addClass('first');
                $('.blog-signup.inline .sign-up').addClass('small');
            }
        }
    }

    $('#imgBanner').attr('src', imageToShowPathBanner);
    $('#lnkBanner').attr('href', imageToShowLinkBanner);

    $('#imgTopAd').attr('src', imageToShowPathTop);
    $('#lnkTopAd').attr('href', imageToShowLinkTop);
    $('#imgBottomAd').attr('src', imageToShowPathBottom);
    $('#lnkBottomAd').attr('href', imageToShowLinkBottom);
    /*
    if (Piedmont.displayMode === "small") {
        $('.home-baner-right').insertBefore('.better');
        $('.resource').insertBefore('.hospital-left');
        $('.midle-content .main').insertBefore('.left-content');
        $('#divNavigationPart').insertAfter('.mhv-home-col.col2');
        $('.blog-signup.inline').appendTo('#blog-home-wrapper');
        $('.blog-signup').insertAfter('.right-content');
    }

    if (Piedmont.displayMode === "medium") {
        $('.blog-signup').insertAfter('.right-content');
    }
    */
    $('.find_doctor_right_select').change(function () {
        if (Piedmont.displayMode === "large") {

            var id = "#" + this.id;

            if ($(id + ' option:selected').val() != 'all') {
                $(this).next('.input-text').hide();
            }
            else $(this).next('.input-text').show();
        }
    });

    $('#txtFindADocName, #txtFindADocKeyword').on('focus', function () {
        if (Piedmont.displayMode === "large") {
            $(this).next('.input-text').hide();
        }

        else {
            if ($(this).val() === "or find by name" || $(this).val() === "or find by ZIP code") {
                $(this).val('');
            }
        }
    });

    $('#txtFindADocName, #txtFindADocKeyword').blur(function () {
        if (Piedmont.displayMode === "large") {
            if (!$(this).val()) {
                $(this).next('.input-text').show();
            }
        }
        else {
            if ($(this).val() == '') {
                $(this).val($(this).next('.input-text').text());
            }
        }
    });


    $('li.unav-location').on('mouseover', function () {
        var id = $(this).data('location');
        $('.hCard .maps').each(function () {
            $(this).hide();
            if (id === $(this).data('location')) {
                $(this).show();
            }
        });

    });

    function selectLocation(id) {
        document.getElementById('<%= hdnHoverLocationId.ClientID  %>').value = id;
        var currentlocationid = document.getElementById('<%= hdnCurrentLocationId.ClientID  %>').value;
        if (id != currentlocationid)
            document.getElementById('<%= btnLocationHover.ClientID  %>').click()
    }

    $('#practice-nav-details li').on('click', function (e) {
        if ($(this).data('type')) {
            var tabType = $(this).data('type');
            if (tabType == "link") {

            }

            if (tabType == "content") {
                var target = "#" + $(this).data('target');
                $(target).html($(this).data('content'));
                $(target).show();
            }
        }

        if ((!$(this).data('type')) || ($(this).data('type') != "link")) {

            $('#practice-nav-details li').each(function () {
                $(this).removeClass('active');
                var target = "#" + $(this).data("target");
                $(target).hide();
            });

            $(this).addClass('active');

            var target = "#" + $(this).data("target");
            $(target).show();
        }
    });




    // Show nav items based on selected category in two-panel nav elements
    $('li.category').each(function (e, item) {
        var category = $(item).data('category');

        $(item).hover(
            function () {

                $(item).closest('.nav-left').find('li.category').each(function (index, element) {
                    $(element).removeClass('active1');
                });

                $(item).closest('.nav-left').find('li.category a').each(function (index, element) {
                    $(element).removeClass('active1');
                });

                $(item).addClass('active1');

                $(item).closest('.nav-left').parent().find('.nav-right ul li').each(function (index, element) {
                    $(element).hide();
                });

                $('.link-category-' + category).show();
            }
        );
    });

    /*$('.sub_nav2_left h3 a').each(function(e, item){
    
        $(item).hover(
            function () {
                var category = $(item).data('category');
    
                $('.sub_nav2_left h3').each(function (index, element) {
                    $(element).removeClass('active');
                });
    
    
                $(item).parent().addClass('active');
    
                $('.sub_nav2_right ul li').each(function (index, element) {
                    $(element).hide();
                    var cat = $(element).data('category');
    
                    if(cat === category){$(element).show();
                    }
                    
                });
    
            }
        );
    });*/


    $('.nav-two-panel').on('mouseenter', function (event) {
        var nav = event.target;
        var navId = "#" + nav.id;

        $(navId).next('div').find('.category').each(function (i, e) {
            $(e).removeClass('active1');
        });

        $(navId).next('div').find('.nav-right li').each(function (i, e) {
            $(e).hide();
        });
    });

    $('input.search').on('click', function () {
        $('#pnl-search-inner').slideToggle('slow');
        $('#pnl-search-close').toggle();
        $('#txtSearch').focus();
        $(this).toggle();
    });

    //     $( ".fad-results .banner-header .fa-angle-down" ).click(function() {
    //   $( ".fad-results .search-filter" ).slideToggle( "slow", function() {
    //     // Animation complete.
    //   });
    // });


    $('#pnl-search-close').on('click', function () {
        $('#pnl-search-inner').slideToggle('slow');
        $('input.search').toggle();
        $(this).toggle();
    });

    $('.nav ul li a.nav-top-level').on('mouseover', function () {
        $('.nav ul li a.nav-top-level').each(function () {
            $(this).removeClass('active');
        });

        $(this).addClass('active');
    });

    $('.nav').on('mouseleave', function () {
        $('.nav ul li a.nav-top-level').each(function () {
            $(this).removeClass('active');
        });
    });

    $('#pnl-fad-widget .input-text, #pnl-fad-nav .input-text').on('click', function () {
        $(this).hide();
        var id = this.id;

        if (id === "lbl-fad-box-name") { $('#pnl-fad-widget #txtFindADocName').focus(); }
        if (id === "lbl-fad-box-keyword") { $('#pnl-fad-widget #txtFindADocKeyword').focus(); }
        if (id === "lbl-fad-box-specialty") { $('#pnl-fad-widget select').click(); }


    });

    // Fix for dropdown elements that spill outside of flyout container
    addBoxEvents();
    var activeForm = false;

    $("#li-find-doctor .find_doctor_right_select").on('click', function (E) {
        activeForm = true;
        $('#li-find-doctor a#lnkMenu1').addClass('active');
    });

    $("#li-find-doctor .find_doctor_right_select").on('blur', function (E) {
        activeForm = false;
        $('#li-find-doctor a#lnkMenu1').addClass('active');
    });

    function addBoxEvents() {
        $('.sub_nav1').on('mouseover', function (E) {
            $('.sub_nav1').css('display', 'block');
        });

        $('.sub_nav1').on('mouseleave', function (E) {
            if (!activeForm) {
                if (!$('.ui-autocomplete').is(":visible")) {
                    $('.sub_nav1').css('display', 'none');
                    $('#li-find-doctor a#lnkMenu1').removeClass('active');
                    $('.sub_nav1 input').each(function () {
                        $(this).blur();
                    });
                }
            }
        });

        $('#li-find-doctor a#lnkMenu1').on('mouseover', function (E) {
            if (($('.sub_nav1').css('display') === 'block') == false) {
                $('.sub_nav1').css('display', 'block');
                showFindADoctorControls('#pnl-fad-nav');
                $(this).addClass('active');
            }

        });

        $('#li-find-doctor').on('mouseleave', function (E) {
            if (!activeForm) {
                if (!$('.ui-autocomplete').is(":visible")) {
                    $('.sub_nav1').css('display', 'none');
                    $('.sub_nav1 input').each(function () {
                        $(this).blur();
                    });
                }
            }
        });
    }
    // End flyout dropdown fix

    $('#li-find-doctor a#lnkMenu1').on('mouseover', function () {
        showFindADoctorControls('#pnl-fad-nav');

    });

    $('#pnl-fad-image, #pnl-fad-image .together-top a').on('click', function (e) {
        e.preventDefault();
        $(this).fadeOut(function () {
            $('.homepage-blk.second #pnl-fad-widget').show();
            showFindADoctorControls('.homepage-blk.second #pnl-fad-widget');
        });
    });


    if ($('#ccp-menu-wrapper').length > 0) {
        var top = $('#ccp-menu-wrapper').height() + "px";
        $('#pnl-search').css('top', top);

        $('.nav ul li .sub_nav').each(function () {
            var origTop = parseInt($(this).css('top').replace("px", ""));
            var offset = $('#ccp-menu-wrapper').height();
            var newTop = (origTop + offset) + "px";

            $(this).css('top', newTop);

        });
    }

    $('#ccp-close a').on('click', function () {
        $('#pnl-search').css('top', 0);

        $('.nav ul li .sub_nav').each(function () {
            var origTop = parseInt($(this).css('top').replace("px", ""));
            var offset = $('#ccp-menu-wrapper').height();
            var newTop = (origTop - offset) + "px";

            $(this).css('top', newTop);

        });

    });

    $('#ctl00_ContentControlPanel1_lnkShowCCP').on('click', function () {
        var top = $('#ccp-menu-wrapper').height() + "px";
        $('#pnl-search').css('top', top);
    });

    $('.nav-top-level').on('mouseover', function () {
        $('.unav-location').each(function () {
            $(this).removeClass('active');
        });

        $('.hCard .maps').each(function () {
            $(this).hide();
        });

        $('.sub_nav4_left ul li:first').addClass('active');
        $('.sub_nav4_right div:first').show();
    });

    $('.hospital-right .resource ul li:last').addClass('last');



    function showFindADoctorControls(container) {
        var input = $(container + ' .styled-select select');
        var inputCon = $(container + ' .styled-select');
        var pos = $(input).position();
        var width = $(inputCon).outerWidth();
        var height = $(inputCon).outerHeight();
        var target = $(container + ' .input-text.specialty');

        if (target.length > 0) {
            $(target).css({ top: pos.top, left: pos.left, height: height, width: width });
        }

        if ($(input).length > 0 && $(input).val() === 'all') {
            if (Piedmont.displayMode === "large") {

                if (target) {
                    $(target).show();
                }
            }
            else {

                $(container + ' .styled-select select option[value="all"]').text("Find a doctor who specializes in");
            }

        }

        input = $(container + ' #txtFindADocName');
        pos = $(input).position();
        width = $(input).outerWidth();
        height = $(input).outerHeight();
        target = $(container + ' .input-text.name');

        if (target.length > 0) {
            $(target).css({ top: pos.top, left: pos.left, height: height, width: width });
        }
        if ($(input).length > 0 && $(input).val().length === 0) {
            if (Piedmont.displayMode === "large") {

                if (target.length > 0) {
                    $(target).show();
                }
            }
            else {
                $(input).val("or find by name");
            }
        }


        input = $(container + ' #txtFindADocKeyword');
        pos = $(input).position();
        width = $(input).outerWidth();
        height = $(input).outerHeight();
        target = $(container + ' .input-text.zip');

        if (target.length > 0) {
            $(target).css({ top: pos.top, left: pos.left, height: height, width: width });
        }
        if ($(input).length > 0 && $(input).val().length === 0) {
            if (Piedmont.displayMode === "large") {

                if (target.length > 0) {
                    $(target).show();
                }
            }
            else {
                $(input).val("or find by ZIP code");
            }

        }

    }
});

$(".form-group select").change(function () {
    $(this).css("color", "black");
});


$('.categories-wrapper.services-pg .alist a').on('click', function (letter) {

    if ($(window).width() < 767) {
        $('.alpha-column').css("display", "none");
        var selected = letter.currentTarget.attributes["0"].nodeValue;
        var openLet = $(selected);
        openLet.css("display", "block");
        return false;
    }


});

var windowWidth = $(window).width();

$('.navbar-munson .navbar-collapse .navbar-right ul.second-nav li.dropdown').click(function () {
	$('.navbar-munson .navbar-collapse .navbar-right ul.second-nav li.dropdown i').toggleClass('fa-angle-down fa-angle-up');
	if ($('.navbar-munson .navbar-collapse .navbar-right ul.second-nav.inner-page li.dropdown').hasClass("open")) {
		$('.navbar-munson .navbar-collapse .navbar-right ul.second-nav.inner-page li.dropdown').removeClass("open");
	} else {
		$('.primary .container .navbar-collapse .navbar-right .navbar-nav.second-nav li.dropdown').toggleClass("open");
	}
	
});

function printPage() {
    window.print();

    //workaround for Chrome bug - https://code.google.com/p/chromium/issues/detail?id=141633
    if (window.stop) {
        location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
    }
    return false;
}
