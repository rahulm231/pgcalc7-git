var $ = jQuery.noConflict();



$(function(){



	/*COUNTER*/



 counter = function(){

 		now = new Date();

		 end = Date.parse(theDate);

		 diff = end - now;

		 days  = Math.floor( diff / (1000*60*60*24) );

		 hours = Math.floor( diff / (1000*60*60) );

		 mins  = Math.floor( diff / (1000*60) );

		 secs  = Math.floor( diff / 1000 );

		 dd = days;

		 hh = hours - days  * 24;

		 mm = mins  - hours * 60;

		 ss = secs  - mins  * 60;

		 if(dd >= 0) jQuery('#home .counter .days span').text(dd); else jQuery('#home .counter .days span').text(0);

 }



 counter();



	/*FLEXLIDER*/



/*	$('#banner .flexslider').flexslider({

		animation: "fade",

		controlNav: false,

		directionNav: false,

		slideshowSpeed: 7000

	});
*/


	$('#main .flexslider').flexslider({

		animation: "fade",

		controlNav: false,

		directionNav: true,
		
		slideshowSpeed: 7000

	});



	

	customScroll = function(){

		if ($(window).width() < 480) {

		$('.scroll-pane tbody').jScrollPane();

	};

		

		var scrollH = $('.jspContainer').height();

		$('.jspContainer').height(scrollH+16);

};



customScroll();



$('.widget-container ul li ul.children').siblings('a').after('<a href="#" class="icon"></a>');
$('.widget-container ul li.menu-item-has-children > a').after('<a href="#" class="icon"></a>');



		/*ACCORDION*/



		$('.widget-container ul li .icon').on('click', function(e){

			var bgPos = $(this).css('background-position');

			e.preventDefault();

			$(this).siblings('ul').slideToggle();

			if(bgPos == "-14px 0px") {

				$(this).css('background-position', '0px 0px');

			}

			else {

				$(this).css('background-position', '-14px 0px');

			}

		});



		/*MOBILE MENU*/



		$('nav.page-menu-mobile .page-menu-trigger').on('click', function(e){

			e.preventDefault();

			$(this).toggleClass('open');

			$('nav.page-menu-mobile .widget-container').slideToggle();



		});



		$('aside.sidebar.visible-xs .widget-container .widget-title').on('click', function(e){

			e.preventDefault();

			$(this).siblings('div').children('ul').slideToggle();

			$(this).toggleClass('open');

		});



		$('header.main .menu-trigger').on('click', function(e){

				e.preventDefault();

				$('nav.main-menu-mobile').slideToggle();

			});



		$('.dropdown .dropdown-trigger').on('click', function(e){

			e.preventDefault();

			$(this).toggleClass('open');

			$('.dropdown .dropdown-content, .dropdown .dropdown-content ul').slideToggle();

		});

		$('.dropdown-trigger-mobile').on('click', function(e){

			e.preventDefault();

			$('.dropdown .dropdown-content, .dropdown .dropdown-content-mobile').slideToggle();

		});



});



$(document).ready(function(){

		/*SMOOTH SCROLL*/



	$('body').localScroll();

});

