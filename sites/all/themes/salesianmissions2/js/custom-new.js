(function ($) {
    $("#expand_country").click(function (e) {
        e.preventDefault();
        $('.siblings_lower').slideDown('slow');
        $(this).hide();
    });
    $("#collapse_country").click(function (e) {
        e.preventDefault();
        $('.siblings_lower').slideUp('slow');
        $("#expand_country").show();
    });

    //Country Detail slider
    $('.country_slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3,
            },
        }
    })
    var windowWidth = jQuery(window).width();
    if (windowWidth < 767) {
        $('.box_arrow_show').show();
        var acc = document.getElementsByClassName("bullet_accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            }
        }
        var acc = document.getElementsByClassName("history_accordian");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                jQuery(".history_accordian").removeClass("active");
                jQuery(".panel2").hide();
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                    jQuery('html, body').animate({
                        scrollTop: jQuery(this).offset().top
                    }, 2000);
                }
            }
        }

    }

    //author niket
   // $('.box_arrow_show').show();
    jQuery(".history_accordian").removeClass("active");
    jQuery(".panel2").hide();
    var acc = document.getElementsByClassName("bullet_accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }
    }
    var acc = document.getElementsByClassName("history_accordian");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {
            //jQuery(".history_accordian").removeClass("active");
           // jQuery(".panel2").hide();
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
//                jQuery('html, body').animate({
//                    scrollTop: jQuery(this).offset().top
//                }, 2000);
            }
        }
    }

    $('.sf-field-taxonomy-project_category select').wrap('<div class="select"></div>');
    $('.sf-field-post-meta-wpcf-regions select').wrap('<div class="select"></div>');
    $('.sf-field-post-meta-wpcf-country select').wrap('<div class="select"></div>');
    $('.sf-field-post-meta-wpcf-regions').addClass('location');
    $('.sf-field-post-meta-wpcf-country').addClass('location');
    //~ $(".location").wrapAll("<li />");
    //~ $('.location').wrapAll('<ul class="sub_list"></ul>');
    $('.sf-input-checkbox').after('<label for="squaredOne" class="squaredOne"></label>');
     $('.grid').masonry({
     itemSelector: '.grid-item',
     horizontalOrder: true,
     horizontalOrder: true
     });

    // $('.proinf_btn').on('click', function () {
    //     $(this).toggleClass('active');
    //     $(this).parent().find('.cost_cls').toggle();
    //     $(this).parent().find('.info_cls').toggle('slow');
    // });
    $('.box_arrow_show').on('click', function () {
        $(this).hide();
        $(this).parent().find('.box_arrow_hide').show();
        $(this).parent().parent().parent().find('.mobile_hide').addClass('show');
        $(this).parent().parent().parent().find('.info_cls').show();
        $(this).parent().parent().parent().find('.box_arrow_hide').show();
        $(this).parent().parent().parent().addClass('active');
    });
	
			    $('.mobile_dir h2, .givenow-position .post-date, .mobile-country').on('click', function () {
	var windowWidth1 = jQuery(window).width();
	if (windowWidth1 < 767){
        $(this).parent().find('.box_arrow_hide').show();
        $(this).parent().parent().parent().find('.mobile_hide').addClass('show');
        $(this).parent().parent().parent().find('.info_cls').show();
        $(this).parent().parent().parent().find('.box_arrow_hide').show();
        $(this).parent().parent().parent().addClass('active');
	}
    });
	
    $('.box_arrow_hide').on('click', function () {
        $(this).hide();
        $(this).parent().find('.box_arrow_show').show();
        $(this).parent().parent().parent().find('.mobile_hide').removeClass('show');
        $(this).parent().parent().parent().find('.info_cls').show();
        $(this).parent().parent().parent().find('.box_arrow_hide').hide();
        $(this).parent().parent().parent().find('.box_arrow_show').show();
        $(this).parent().parent().parent().removeClass('active');
        $(this).parent().parent().removeClass('active');
    });
	
	

	
$('#masthead > div > div.act-now.container > div.vc_row.wpb_row.vc_row-fluid.mobile_box.vc_custom_1503037054203.vc_row-has-fill.vc_row-o-content-middle.vc_row-flex').prepend('<h2 class="project-filter-title"> Project Filter</h2>');
$( ".sf-range-min" ).prev().addClass('range-wraper1');
$( ".sf-range-max" ).prev().addClass('range-wraper2');
$('.range-wraper1,.sf-range-min').wrapAll('<div class="min_wrap"></div>');
$('.range-wraper2,.sf-range-max').wrapAll('<div class="max_wrap"></div>');
$(".min_wrap").css("left", "0");
$(".max_wrap").css("left", "250px");
$('.min_wrap,.max_wrap,.sf-range-values-seperator').wrapAll('<div class="full_wrap"></div>');


    $('#switch').on('click', function () {
        $('.show_form').toggleClass('show');

        if ($(this).is(':checked')) {
            $('.searchform_content').css('margin-left', '75%');
        } else {
            $('.searchform_content').css('margin-left', '10px');
        }
    });
    setTimeout(function () {
        var min = $('.noUi-origin.noUi-connect').css('left');
        //~ var min = $('.noUi-origin.noUi-connect').attr("style");
        var max = $('.noUi-base .noUi-origin.noUi-background').css('left');
        var intmaxval = parseInt(max.replace('px',''));
        var intleftmin = parseInt(min.replace('px',''))-60;
        //~ var intleftmin = intleftmin.replace('%;','px');
         if(intleftmin > 0) {
        $('.min_wrap').css('left', intleftmin+'px');
		}
        if(intmaxval > 70) {
			$('.max_wrap').css('left', max);
		}

    }, 2000);
})(jQuery);


jQuery('#slick').slick({
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: false,
    speed: 1200,
    pauseOnHover: false,
    pauseOnDotsHover: true,
    prevArrow: '<span class="prev-nav"><i class="fa fa-angle-left"></i></span>',
    nextArrow: '<span class="next-nav"><i class="fa fa-angle-right"></i></span>'
});

// jQuery(".salesian-falimy-toggle").click(function(){
// jQuery(this).next(".inner").slideToggle();
// });

jQuery('.select').on('click', function(){
		//console.log('clicked');
		jQuery(this).find('.sf-input-select').click(function(event){
			event.stopPropagation();
				});
			});

var hlogos= jQuery('.little-lightblue-bar > .social-icons li a');
if(hlogos.length > 0){
	jQuery('.little-lightblue-bar > .social-icons li a').each(function() {
		jQuery(this).attr('target', '_blank');
	});
}

var flogos= jQuery('.top-footer.mobile-footer .social-icons li a');
if(flogos.length > 0){
	jQuery('.top-footer.mobile-footer .social-icons li a').each(function() {
		jQuery(this).attr('target', '_blank');
	});
}

var givehlogos= jQuery('.very-top-right .social-icons li a');
if(givehlogos.length > 0){
	jQuery('.very-top-right .social-icons li a').each(function() {
		jQuery(this).attr('target', '_blank');
	});
}

jQuery('.page-template-template-fund div.vc_row.wpb_row.vc_row-fluid.mobile_box.vc_custom_1503037054203.vc_row-has-fill.vc_row-o-content-middle.vc_row-flex').prepend('<h2 class="project-filter-mobile-addition-title">Project Filter</h2>');