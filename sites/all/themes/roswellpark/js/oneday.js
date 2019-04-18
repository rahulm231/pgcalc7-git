// We define a function that takes one parameter named $.
(function ($) {
$(document).ready(function(){
    
    //Global variables
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    
    /*****
    * Making the search box big - try and find way to move this into
    * template.php file.
    *****/
    $(".google-cse.form-search > div > .input-group > input").focusin(function(){
        $('.region-searchbar').addClass('active');
    });
    $(".google-cse.form-search > div > .input-group > input").focusout(function(){
        $('.region-searchbar').removeClass('active');
    });

    
    /*****
     * Reusable Functions
     *****/
    //Enabling ScrollTo and Local Scroll
    //$.localScroll();
    
    //Parallax effects - Initiating
    //$('.parallax').parallax("50%", 0.5);
    
    
    //Enable a Bootstrap Carousel if one exist
    $('.carousel').carousel('cycle');
    
    //Trigger pushing classes
    $('.trigger').click(function(){
        var triggerTarget = $(this).data("target");
        var targetClass = $(this).data("class");
        $(triggerTarget).toggleClass(targetClass);
    });

    /*****
     * Scroll to top for Mobile
     *****/
    //Activate button function
    $('#mobile-scroller').click(function() {
        $('#content-container').animate({scrollTop: '0px'}, 800);
    });
    //Show the button when we've scrolled far enough
        
    $('#content-container').scroll(function(){
        var containerOffset = $('.main-container').offset().top;
        if (containerOffset < -winHeight/2){;
            $('#mobile-scroller').addClass('active');
        }else{
            $('#mobile-scroller').removeClass('active');
        }
    });
   
   /*****
    * Themeing
    *****/
   
    //Responsive Tables - adding a class
    $("table").parent().addClass('table-responsive');
    
    //Removing the submenu collapse from the landing pages
    $(".panel-landing-page-alt .submenu-collapse.collapse").removeClass('submenu-collapse collapse');
    
    //Adding icons to expandable menu items in the menu
    //$('.nav li.collapsed > a').append('<span class="glyphicon glyphicon-plus pull-right"></span>');
   
   //Make bucckest same size on homepage [THIS SHOULD BE A FUNCTION NOW]
   /*var highestCol = Math.max($('#featured-teaser .panel-default:first-child').height(),$('#featured-teaser .panel-default:nth-child(2)').height(),$('#featured-teaser .panel-default:last-child').height());
    $('#featured-teaser .panel-default').height(highestCol);*/
   
    /*****
    * Helpers
    *****/
    var contentWrapper = $('#content-container');
    var siteNav = $('nav#roswell-navbar');
    
    //Equal Height
     function equalHeight(container){
        //Only if we aren't on mobile 
        if(winWidth > 767){
            var currentTallest = 0;
            var currentRowStart = 0;
            var rowDivs = new Array();
            var $el;
            var topPosition = 0;

            $(container).each(function() {

               $el = $(this);
               $($el).height('auto');
               topPostion = $el.position().top;

               if (currentRowStart !== topPostion) {
                 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                   rowDivs[currentDiv].height(currentTallest);
                 }
                 rowDivs.length = 0; // empty the array
                 currentRowStart = topPostion;
                 currentTallest = $el.height();
                 rowDivs.push($el);
               } else {
                 rowDivs.push($el);
                 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
              }
               for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                 rowDivs[currentDiv].height(currentTallest);
               }
             });
        }
    }
    
    //Vertical Centering
    function verticalCenter(){
        var winWidth = $(window).width();
        if(winWidth > 960){
            var objHeight = $('.vertical-center').height();
            var parentTarget = $('.vertical-center').data('center-parent');
            var targetHeight = $(parentTarget).height();
            $('.vertical-center').css('margin-top',(targetHeight - objHeight) * .5);
        }
    }
    
    //If the site is wide, move the navigation to a desktop architecture
    function menuPlacement(){
        var winWidth = $(window).width();
        if(winWidth > 767){
            //Height of parallax container
        }
        if(winWidth > 960){
            $('#parallax-home #top-row').css('height',Math.floor(winWidth * .4));
            $('#navigation-desktop').prepend(siteNav);
            contentWrapper.css('height','auto');
        }else{
            $('#navigation-mobile').prepend(siteNav);
            //Both Nav and Main Content get sized to allow overflowY scrolling in CSS.
            $('#navigation-mobile').css('height',winHeight);
            contentWrapper.css('height',winHeight);
        }
    }
    
    
    //Window Size functions
    $(window).load(function() {
        //reassign value
        winHeight = $(window).height();
        winWidth = $(window).width();
        
        //trigger functions
        //menuPlacement();
        verticalCenter();
        equalHeight($('.sameheight .panel'));
    });
    $(window).resize(function() {
        //reassign value
        winHeight = $(window).height();
        winWidth = $(window).width();
        
        //trigger functions
        //menuPlacement();
        verticalCenter();
        equalHeight($('.sameheight .panel'));
    });
    
    //Adding focus to the search input when the search bar is activated/
    $('#search-trigger').click(function(){
        $('input#edit-search-block-form--2').focus();
    });
    
});
// Here we immediately call the function with jQuery as the parameter.
}(jQuery));
