/*
 * Put all your regular jQuery in here.
 * Within this funtion you can use the namespace $ instead of jQuery
 * ex. use this $('#id') ... NOT jQuery('#id')
*/
jQuery(document).ready(function($) {

	$('#mobile-toggle').on('click', function(){
		$(this).toggleClass('open');
		$('#mobile-nav').slideToggle();
	});

	$('.search-toggle').on('click', function(){
		$('.searchbar').slideToggle();
$('#q').focus();
	});

	$('.homepage-slideshow').slick({
		infinite: true,
  		slidesToShow: 1,
	});

	$('.video-slideshow').slick({
		infinite: true,
  		slidesToShow: 1,
  		adaptiveHeight: true
	});

	var video_data = $('.video-slide-play').data('video');
	var video_id = '#' + video_data;
	var video_url = $(video_id).prop('src');

	$('.video-slide-play').on('click', function(){
		var myvideo_data = $(this).data('video');
		var myvideo_id = '#' + myvideo_data;
		var myvideo_url = $(this).data('videosrc');
		$(myvideo_id).removeClass('hide');
		$(myvideo_id).addClass('video-playing');
		$(myvideo_id).prop('src',myvideo_url);
	});
	
	$('.video-slideshow').on('beforeChange', function(event, slick, currentSlide){
		var currentVideo = '#' + $(slick.$slides.get(currentSlide)).attr('id');
		console.log(currentVideo);
		var currentVideoFrame = $(currentVideo).children('.tcc-video');
		currentVideoFrame.addClass('hide');
		currentVideoFrame.prop('src', '');
	});

	$('.calendar-slideshow-container').slick({
		infinte: true,
		slidesToShow: 5,
		centerMode: true,
		responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        slidesToShow: 1
		      }
		    }
	    ]
	});

	$('.photo-gallery-container').slick({
		centerMode: true,
		slidesToShow: 1,
		responsive: [
		    {
		      breakpoint: 992,
		      settings: {
		        arrows: false,
		        slidesToShow: 1,
		      }
		    }
	    ]
	});

	$('.financial-aid-menu-row h4').on('click', function(){
		var tabData = $(this).data('tab');

		$('.financial-aid-menu-row .tab-active').each(function(){
			$(this).removeClass('tab-active');
		});
		$(this).addClass('tab-active');

		$('.financial-aid-content').each(function(){
			var contentData = $(this).data('content');
			if(contentData == tabData) {
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
			}
		});

		$('.financial-aid-content').each(function(){
			var contentData = $(this).data('content');
			if(contentData == tabData) {
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
			}
		});

	});

	$('.archive-toggle > a').on('click', function(e){
		$('.newsroom-select').slideToggle();
		$(this).toggleClass('news-toggle-active');
		e.preventDefault();
	});

	$('.sub-select-toggle').on('click', function(e){
		$(this).parent('li').children('ul').slideToggle();
		$(this).toggleClass('news-toggle-active');
		e.preventDefault();
	});

	$('.tuition-menu-row h4').on('click', function(){
		var tabData = $(this).data('tab');

		$('.tuition-menu-row .tab-active').each(function(){
			$(this).removeClass('tab-active');
		});
		$(this).addClass('tab-active');

		$('.tuition-content').each(function(){
			var contentData = $(this).data('content');
			if(contentData == tabData) {
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
			}
		});

		$('.tuition-content').each(function(){
			var contentData = $(this).data('content');
			if(contentData == tabData) {
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
			}
		});

	});
 // edited 22/06/2016 AL
    $('.tuition-menu-row h4').removeClass('tab-active');
	$('.tuition-menu-row h4:first').addClass('tab-active');
     

	$('.career-services-play').on('click', function(){
		var video_id = $('#career_services_video');
		var video_url = $(video_id).prop('src');
		video_url += "&autoplay=1";
		$(video_id).removeClass('hide');
		$(video_id).prop('src',video_url);
	});

	$('.admissions-check-list-slide').slick({
		infinite: true,
  		slidesToShow: 4,
  		responsive: [
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 992,
		      settings: {
		        slidesToShow: 2
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 1
		      }
		    }
	    ]
	});

	$('.degree-detail-filter h3').on('click', function(){
		var filter = $(this).attr('data-degree-filter');
		var degreeContent = $('.degree-detail-content');

		$('.degree-detail-filter h3').each(function(){
			$(this).removeClass('filter-active');
		});

		$(this).addClass('filter-active');

		degreeContent.each(function(){
			if($(this).attr('data-degree-content') == filter){
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
			}
		});

		console.log(filter);
	});




	$('#mobile-nav li a').on('click', function(e){
if ($(this).parent('li').children('ul.multilevel-linkurl-2').is(':hidden'))
{
		$(this).parent('li').children('ul.multilevel-linkurl-2').slideToggle();
e.preventDefault();
}
	});

  

	$('#mobile-nav li.has-sub-menu > a').on('click', function(e){	
if ($(this).parent('li').children('ul').is(':hidden')){
$(this).parent('li').children('ul').slideToggle();
		e.preventDefault();
}
	});
	
	$('#main-nav li ul li').has('ul').addClass('pg');
	$(window).scroll(function(){
		if ($(this).scrollTop() > 50) {
			$('.tcc-scroll-arrow').fadeOut();
		}
	});
	$(".tcc-scroll-arrow i").click(function() {
		var mySD = $("#main-content section").first();
    	$('html, body').animate({
        	scrollTop: $(mySD).offset().top
    	}, 500);
	});

//added jw 9-7-16
$('.tcc-featured-slider').slick({
	slidesToShow: ($(this).hasClass('tcc-3-up')) ? 3 : 1,
	slidesToScroll: 1,
	autoplay: ($(this).hasClass("tcc-autoscroll")) ? true : false,
	autplaySpeed: ($(this).hasClass("tcc-autoscroll") && $(this).data("autoscroll-speed") !== null && $(this).data("autoscroll-speed") > 0) ? $(this).data("autoscroll-speed") : 3000,
	adaptiveHeight: true,
	variableWidth: true,
	infinite: true
});

}); /* end of as page load scripts */


/*
 * If jquery needs to be called after the page has loaded completely put your jquery in this funciton. 
 * Within this funtion you can use the namespace $ instead of jQuery
 * ex. use this $('#id') ... NOT jQuery('#id')
*/
(function($){
    $(window).load(function() {

    });
})(jQuery);































