jQuery.noConflict();

jQuery(window).load(function() {
    jQuery('.imageCaption').each(function() {
        jQuery(this).width(jQuery(this).find('img').width());
    });
    jQuery('.figcaption').each(function() {
        jQuery(this).width(jQuery(this).find('img').width());
    });
});

jQuery(document).ready(function($){

    // move Talk To Us box
    var contactBlocks = $("#pgc-contact-block");
    if (contactBlocks.length > 0){
        var block = contactBlocks[0];
	var container = $(block).closest(".pg-content-inline-blocks");
        var moveTo = $(container).next().find(".field-items").find(".field-item").first();
        $(container).remove();
	$(moveTo).prepend(container);
    }

    function changeCarouselImage()
    {
        $imageToDisplay = $('.flex-active-slide').find( ".hero-carousel-image")[0].value;
        $('.hero').css('background-image', 'url(/images/' + $imageToDisplay + ')');
    }
    $('.page-utilities .btn-print').click(function(){
        window.print();
        return false;
    });
        
    $('body').removeClass('no-js loading');

    // Declare site variables
    var $body = $('body'), $footer = $('.footer'), $wrapper = $('.wrapper'),$facultyNav = $('.faculty-menu-bar, .faculty-nav li'), $menuSub = $('.sub-menu-wrap'),$btnMenu = $('.btn-menu'),$dropWrap = $('.drop-wrap'), $auxSearchBtn = $('.search-form button'), $infoWin = $('.info-window-wrap'), $btnInfoWin = $('.btn-info');

// Prevent Arrow Widows
    $(".home-callouts p a").append("&nbsp;");

//// Header

// Show menu on homepage
    if (jQuery(window).scrollTop() <= 30 && $('body').hasClass("homepage") && $body.width() > 768 ) {
        $('body').addClass('sub-open');
    }

   $(window).scroll(function(){
        if (jQuery(window).scrollTop() <= 30 && $('body').hasClass("homepage") && $body.width() > 768 ) {
            $('body').addClass('sub-open');
        } else if (jQuery(window).scrollTop() >= 30 && $('body').hasClass("homepage")) {
            $('body').removeClass('sub-open');
            $('.drop-wrap').css('display','none');
        }
   });

// Show menu when click button
    $btnMenu.on('click',function(e){
        e.preventDefault();
        $('.sub-menu li').removeClass('active');
        if(!$dropWrap.is(':empty')){
            closeDrop(true);
        } else {
            $body.toggleClass('sub-open');
        }
    });

// Toggle faculty nav
    $facultyNav.on('click',function(e){
        e.preventDefault();
        $('.faculty-nav li').toggleClass('open');
    });

// Show dropdown on sub menu click
    $('.sub-menu li a').on('click',function(e){

        if ($(this)[0].id === '-1' || $('.page-wrapper').width() < 767) {
            window.location.href = $(this)[0].href;
            return true;
        }

        $parentLi = $(this).parent();
        $parentLi.siblings().removeClass('active');
        if(!$parentLi.hasClass('active')){
            $dropWrap.empty();
            $parentLi.find('.drop').clone().appendTo('.drop-wrap');
            $dropWrap.slideDown(200);
        } else {
            closeDrop();
        }
        $parentLi.toggleClass('active');
    });

// Close to dropdown
    function closeDrop(open){
        $dropWrap.slideUp(200,function(){
            $(this).empty();
            if(open){
                $body.toggleClass('sub-open');
            }
        });
    }

//Populate Top Nav Content
var topNavHomepageIDs = document.getElementById('top-nav-hompepage-ids').value;
    if (topNavHomepageIDs) {
        if (!window.location.origin) {
            window.location.origin = window.location.protocol+"//"+window.location.host;
        }
        var splitTopNavHomepageIDs = topNavHomepageIDs.split(",");
        for (var i = 0; i < splitTopNavHomepageIDs.length; i++) {
            var url = window.location.origin + '/site/scripts/home_info.php?homepageID=' + splitTopNavHomepageIDs[i];
            $( "#top_nav_content_" +  splitTopNavHomepageIDs[i]).load( url + " .main-content" );
        }
    }

// Search Form open/close
    $auxSearchBtn.on('click',function(e){
        if(!$(this).prev('input').val().length){
            e.preventDefault();
            $auxSearchBtn.closest('.main-nav').toggleClass('search-open');
            $('.logo').toggleClass('collapsed');
        }
    });

// Info window

    $('.right-menu .btn-info').click(function (e) {
        var link = e.target.href;
        if (!link) link = e.target.parentElement.href;
        if (link && link.indexOf("#") != -1) {
            e.preventDefault();
        } else {
            window.location.href = link;
        }
        $('.right-menu').toggleClass('open');
    });


    $('.info-window-wrap-events').click(function (e) {
        var link = e.target.href;
        if (!link) link = e.target.parentElement.href;
        if (link && link.indexOf("#") != -1) {
            e.preventDefault();
        } else {
            window.location.href = link;
        }
        e.preventDefault();
        $('.info-window-wrap-events').toggleClass('open');
    });  

    $('.left-menu .btn-info').click(function (e) {
        var link = e.target.href;
        if (!link) link = e.target.parentElement.href;
        if (link && link.indexOf("#") != -1) {
            e.preventDefault();
        } else {
            window.location.href = link;
        }
        e.preventDefault();
        $('.left-menu').toggleClass('open');
    });

    $('#tab-nav a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

// Fullscreen Gallery
    $('.gallery').each(function() { // the containers for all your galleries should have the class gallery
        $(this).magnificPopup({
            delegate: 'a', // the container for each your gallery items
            type: 'image',
            mainClass: 'mfp-with-fade',
            image : {titleSrc: function(item) {
                var caption = item.el[0].children[0];
                var queryCaption = $(caption).html() ? $(caption).html() : '';
                return queryCaption;
            }},
            gallery:{enabled:true}
        });
    });

// Footer Padding
    $wrapper.css("padding-bottom", $footer.height()+100);
    $(window).resize(function() {
        $wrapper.css("padding-bottom", $footer.height()+100);
    });

// Responsive repositioning 
    if($('.page-wrapper').width() < 767){
        $('h1.span12').insertBefore('.subpage-header').addClass('subpage-title'); //for subsite homepage
        $('.side-nav').insertBefore('.main-content'); //for sidebar nav
    }
    
        $('.featured-slider').flexslider({
            smoothHeight: true,
            animation: "slide",
            controlNav: false,
            prevText: "N",
            nextText: "O",
            slideshow: false,
            animationSpeed: 400,
            after: function(slider) { changeCarouselImage() }
        });
        

//Sub site nav dropdown
    $('.primary-header-links').on('click',function(e) {
        if (e.currentTarget.className.indexOf('noDropdown') > 1 && e.target.href) {
            window.location.href = e.target.href;
            return false;
        }

        e.preventDefault();
        var linkID = e.target.id;
        var linkIDSplit = linkID.split("-");
        var dropdownNum = linkIDSplit[linkIDSplit.length - 1];
        var totalDropDowns = $('.total-primary-navs').val();

        for (var i = 0; i < totalDropDowns; i++) {
            var dropDownID = '.primary-header-dropdown-' + i;
            var dropDown = $(dropDownID);

            if (i == dropdownNum) {
                if(dropDown.is(':visible')){
                    dropDown.hide();
                } else {
                    dropDown.show();   
                }
            } else {
                dropDown.hide();
            }
        }

        return true;
    });

//Ang rotation box
    $('.ang-rotation').on('click',function(e) {
        e.preventDefault();

        var imageID = $(this).attr('id');

        //set image
        var imageValue = document.getElementById(imageID + '-image').value;
        $('.hero').css('background-image', 'url(/images/' + imageValue + ')');

        //set headline
        var headline = document.getElementById(imageID + '-headline').value;
        $('.page-title-homepage').html(headline);

        //set summmary
        var summary = document.getElementById(imageID + '-summary').value;
        $('.ang-box-summary').html(summary);

        //set sub headline
        var subheadline = '';
        var subheadlineValue = document.getElementById(imageID + '-subheadline').value;
        if (subheadlineValue) {
            var subheadlineTitle = document.getElementById(imageID + '-subheadlinetitle').value;
            var subheadlineURL = document.getElementById(imageID + '-subheadlineurl').value;
            subheadline = '<a href="' + subheadlineURL + '" title="' + subheadlineTitle + '" class="cat-tag">' + subheadlineValue + '</a>';
        }
        $('.ang-box-sub_heading').html(subheadline);

        //set read more
        var readMoreURL = document.getElementById(imageID + '-readmoreurl').value;
        var readmoreTitle = document.getElementById(imageID + '-readmoretitle').value;
        $('.ang-box-readmore').attr('href', readMoreURL);
        $('.ang-box-readmore').attr('title', readmoreTitle);

        var imageIDSplit = imageID.split("-");
        var rowRemovalID = imageIDSplit[imageIDSplit.length-1];
        $('.hero').attr('id', 'hero'+rowRemovalID);  
        resetAngularRotationBox(false, rowRemovalID);
    });

    function resetAngularRotationBox (removeFirstItem, valueToHide) {
        var angRow = $('.angrow0').html();

        if (removeFirstItem && angRow) {
            $('.angrow0').hide();
             $('.angrow0').next('hr').hide();
        } else {
            var rowCount = $('.ang-rotation-box-count').val();
            var loopCount = rowCount - 1;

            for (var i=0; i < loopCount; i++) { 
                var angBoxRox = '.angrow' + i;
                if (i == valueToHide) {
                    $(angBoxRox).hide();
                    $(angBoxRox).next('hr').hide();
                } else {
                    $(angBoxRox).show();
                    $(angBoxRox).next('hr').show();
                }
                if($(angBoxRox).is(':visible')){
                    $(angBoxRox).addClass('angrowShow');    
                }else{
                    $(angBoxRox).removeClass('angrowShow'); 
                }
            }
        }     
        $('div.angrowShow').last().next('hr').hide();
    }

    resetAngularRotationBox(true);

//Carousel
    // SUBSITE MENU BUTTON
	$('.btn-sec-nav').on('click',function(){
		$(this).find('i').toggleClass('icon-arw-tim-down icon-arw-tim-up');
		$(this).next('.subsite-menu-wrap').toggleClass('open');
	});
	
});

// Parallax Headers
/*
$(window).scroll(function () {

    scrollPos = $(this).scrollTop();

    $(".hero-featured-wrap, .bordered-headline, .hero-headline-wrapper").css({
        "top" : 0+(scrollPos/6)+"px",
    });

    $(".hero").css({
        "background-position" : "center " + (+scrollPos/2)+"px",
    });

});
*/

jQuery(window).load(function($){
//// Carousel widget
    if(jQuery('.widget-carousel').length){
        jQuery('.widget-carousel').flexslider({
          smoothHeight: true,
          animation: "slide",
          controlNav: false,
          prevText: "N",
          nextText: "O",
          slideshow: false,
          animationSpeed: 400, 
          after: function(slider) { changeCarouselImage() }
      });
    }
    
});
