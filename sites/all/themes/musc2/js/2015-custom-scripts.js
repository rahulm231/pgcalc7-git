// JavaScript Document
$(document).ready(function() {
								   
    $('.reveal').click(function () {
        $(this).children('ul').slideToggle();
    });
    //$(".lefthealthLinks").hide();
    $(".health-arrow-activeDRK").hide();
    $(".university-arrow-activeDRK").hide();
    $(".research-arrow-activeDRK").hide();

    if ($(window).width() < 960) {
        var showLeftPush;
        var menuLeft = document.getElementById('footer'),
            showLeftPush = document.getElementById('mobile'),
            body = document.getElementById('body_wrapper');
            title = document.getElementById('MicrositeTitle');
        showLeftPush.onclick = function () {
            classie.toggle(this, 'active');
            classie.toggle(body, 'cbp-spmenu-push-toright');
            classie.toggle(title, 'cbp-spmenu-push-toright-margin');
            classie.toggle(menuLeft, 'cbp-spmenu-open');
            disableOther('showLeftPush');
        };
        $(".footer_nav").click(function () {
            classie.toggle(body, 'cbp-spmenu-push-toright');
            classie.toggle(title, 'cbp-spmenu-push-toright-margin');
            classie.toggle(menuLeft, 'cbp-spmenu-open');
            disableOther('showLeftPush');
        });
        $('.healthLinks').on('click', function (e) {
            if ($(".healthlist").css("display") == "block") {
                $(".healthlist").slideUp();
                $(".health-arrowDRK").show();
                $(".health-arrow-activeDRK").hide();
            }
            else {
                $(".healthlist").slideDown();
                $(".health-arrowDRK").hide();
                $(".health-arrow-activeDRK").show();
            }
        });

        $('.universityLinks').on('click', function (e) {
            if ($(".universitylist").css("display") == "block") {
                $(".universitylist").slideUp();
                $(".university-arrowDRK").show();
                $(".university-arrow-activeDRK").hide();
            }
            else {
                $(".universitylist").slideDown();
                $(".university-arrowDRK").hide();
                $(".university-arrow-activeDRK").show();
            }
        });

        $('.researchLinks').on('click', function (e) {
            if ($(".researchlist").css("display") == "block") {
                $(".researchlist").slideUp();
                $(".research-arrowDRK").show();
                $(".research-arrow-activeDRK").hide();
            }
            else {
                $(".researchlist").slideDown();
                $(".research-arrowDRK").hide();
                $(".research-arrow-activeDRK").show();
            }
        });
    }


    if ($(window).width() >= 960) {
 
    $(".health-arrow-activeDRK").hide();
    $(".university-arrow-activeDRK").hide();
    $(".research-arrow-activeDRK").hide();
    $(".health-arrowDRK").hide();
    $(".university-arrowDRK").hide();
    $(".research-arrowDRK").hide();
    $(".healthlist").slideDown();
    $(".universitylist").slideDown();
    $(".researchlist").slideDown();
     //   });
    }


   
  
})

$(window).scroll(function (e) {
    if ($(window).width() >= 960) {
        $el = $('.call-to-action');
        if ($(this).scrollTop() > 300 && $el.css('position') != 'fixed') {
            $('.call-to-action').css({ 'position': 'fixed', 'top': '155px', 'width': '960px', 'right': '0px' });
            $('.call-to-action .content').css({ 'float': 'right', 'margin-right': '12px' });
            $('.callout-fixed').css({ 'position': 'fixed', 'top': '290px', 'width': '960px', 'right': '0px' });
            $('.callout-fixed .callout').css({ 'float': 'right', 'margin-right': '12px' });
        }
        if ($(this).scrollTop() < 300 && $el.css('position') == 'fixed') {
            $('.call-to-action').css({ 'position': 'relative', 'top': '0px', 'width': '100%' });
            $('.call-to-action .content').css({ 'float': 'none' });
            $('.callout-fixed').css({ 'position': 'relative', 'top': '0px', 'width': '100%' });
            $('.callout-fixed .callout').css({ 'float': 'none' });
        }
    }
});

