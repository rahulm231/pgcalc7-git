var $ = jQuery; 
$(document).ready(function(){

	// smooth scrolling
	$(function() {
	  $('a[href*=#]:not([href=#testimonial_carousel])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 90
	        }, 500);
	        return false;
	      }
	    }
	  });
	});

	$(window).scroll(function(){
		if($(window).width() > 767){
			if($(window).scrollTop() > 0){
				$('.header_top').hide();
				$('.header_main').css('top', '0');
				$('.header').addClass('header_scrolled');
			}else{
				$('.header_top').show();
				$('.header_main').css('top', 'initial');
				$('.header').removeClass('header_scrolled');
			}
		}
	});

	$('.header_top_search span').click(function(){
		$('.header_top_search_bar').toggle();
		$(this).toggleClass('fa-search').toggleClass('fa-close');

		if($(window).width() < 768){
			$('.header_top_search_bar').css('width', $(window).width());
		}
	});

	$('.header_main_nav li').hover(function(){
		$(this).find('.header_main_megamenu').toggle();
	});

	// check if is touch device
	function isTouchDevice() {
	    return 'ontouchstart' in document.documentElement;
	}

	if(isTouchDevice()){
		if(($(window).width() <= 992) && ($(window).width() > 767)){
			$(".header_main_nav li").not($('.header_main_megamenu ul li')).one("click", function(e){
		       e.preventDefault();
		       return false;    
		   	});
		}
	}

	$('.header_mobile').click(function(){
		$('.header_main_nav').toggle();
		$(this).find('i').toggleClass('fa-bars').toggleClass('fa-close');
		$('.header_top_nav').toggle();

		var navHeight = $('.header_main_nav').outerHeight();
		var navHeight = navHeight + 45 + 70;

		$('.header_top_nav').css('top', navHeight+'px');
	});

	// limit character length
	function cut(n) {
	    return function textCutter(i, text) {
	        var short = text.substr(0, n);
	        if (/^\S/.test(text.substr(n)))
	            return short.replace(/\s+\S*$/, "")+'...';
	        return short;
	    };
	}

	$('.bc_news_post_text h4 a').text(cut(50));
	$('.bc_news_post_preview').text(cut(260));

	$('.bc_testimonial_slider').slick({
		arrows:true,
		appendArrows:$('.bc_testimonial_slider_arrows'),
		autoplay:true,
		autoplaySpeed:5000
	});

	$('.bc_content_sidebar_mobile').click(function(){
		$('.bc_content_sidebar').toggle();
		$(this).find('i').toggleClass('fa-bars').toggleClass('fa-close');
	});



  var maxHeight = -1;

    $('.bc_post').each(function() {
     maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
    });

    $('.bc_post').each(function() {
        if($(window).width() > 767){
            $(this).css('height', maxHeight + 'px');
        }
    });  




});