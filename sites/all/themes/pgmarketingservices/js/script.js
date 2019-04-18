(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.pgcalc_theme = {
		attach: function(context, settings) { 
				var myElembodyclass = $('body').hasClass('logged-in');
				if (myElembodyclass == true){ 
					var a1_text = $('#login-link-for-mobile').text();
					$('#login-link-for-mobile').text('Logout');
				}

				$(window).scroll(function(){
					var sticky = $('.mainNavigation, .logo'),
							scroll = $(window).scrollTop();		
					if (scroll >= 89) sticky.addClass('stickyNav');
					else sticky.removeClass('stickyNav');
				});
				
				// accordian effect
				activeItem = $(".view-home-accordin-slider-paragraph-fields ul li:first");
				$(activeItem).addClass('active');
				$(".view-home-accordin-slider-paragraph-fields ul li").click(function(){
					$(".view-home-accordin-slider-paragraph-fields ul li").removeClass('active');
					$(this).addClass('active');
					if($(window).width()<=768){
						$('html, body').animate({ scrollTop: ($(this).offset().top - 93)}, 'slow');
					}
					activeItem = this;
				});
					
    //             if (jQuery('#block-search-form').length)
				// {
				// jQuery('#block-search-form').css('display','none');
				// }
                   if(window.location.pathname.indexOf("search/node") == 1) {
		  			jQuery('#block-system-main > #search-form').css('display','none');
	                console.log('yes');
	      			}

				// jQuery('li.leaf.menu-9927 a, .searchLinkMobile > a').click(function()
				// {
					
				// 	 if( jQuery('#block-search-form').is(':visible') ) {
				// 	    jQuery('#block-search-form').css('display','none');
				// 	 }
				// 	 else {
				// 	    jQuery('#block-search-form').css('display','block');
				// 	 }

				// });

	            $('.searchBox .menu.nav > .menu-9923 > a, .searchLinkMobile > a').click(function(){
					$('.searchBox .menu.nav > .menu-9923 > a, .searchLinkMobile > a').parent().toggleClass("searchOpened");
					$('.searchBox section#block-search-form').toggle();
				});			
			
				
				$('.searchBox .menu.nav > .menu-2862 > a, .searchLinkMobile > a').click(function(){
					$('.searchBox .menu.nav > .menu-2862 > a, .searchLinkMobile > a').parent().toggleClass("searchOpened");
					$('.searchBox section#block-search-form').toggle();
				});
			
				$("html").on('click', function (e) {
						//console.log($(e.target).is(".nav-collapse *"));
						if(!$(e.target).is(".nav-collapse.collapse *")) {
								$(".nav-collapse.collapse").removeClass("in");									
						}
				});

				$('li.level-1.dropdown').click(function(){			
					if($(this).hasClass("expandedDropdown")){
						$(this).removeClass("expandedDropdown");
					}else{
						$('li.level-1.dropdown').removeClass("expandedDropdown");
						$(this).addClass("expandedDropdown");
					}
				});	
					
				var heroImageScroll = function() {
						if($( window ).width() < 767){
							$(".view-home-top-slider-paragraph-fields .item-list").mCustomScrollbar({
								scrollButtons:{enable:true,scrollType:"stepped"},
								keyboard:{scrollType:"stepped"},
								mouseWheel:{scrollAmount:320,normalizeDelta:true},
								autoExpandScrollbar:true,
								snapAmount:320
							});
						}else{
							$(".view-home-top-slider-paragraph-fields .item-list").mCustomScrollbar({
								scrollButtons:{enable:true,scrollType:"stepped"},
								keyboard:{scrollType:"stepped"},
								mouseWheel:{scrollAmount:634,normalizeDelta:true},
								autoExpandScrollbar:true,
								snapAmount:634
							});
						}	
					}

					//$(window).load(function() {
							heroImageScroll();	
					//});
					$(window).resize(function(){heroImageScroll();});
					$(document).resize(function(){heroImageScroll();});
					$(".accordianContent > .field-content").mCustomScrollbar();		
					
					// Select and loop the container element of the elements you want to equalise
					$('.productListingSection .Outer.Wrapper').each(function(){  
						// Cache the highest
						var highestBox = 0;
						// Select and loop the elements you want to equalise
						$('.innerBlocks', this).each(function(){
						// If this box is higher than the cached highest then store it
						if($(this).height() > highestBox) {
							highestBox = $(this).height(); 
						}
						});   
						// Set the height of all those children to whichever was highest 
						$('.innerBlocks',this).height(highestBox);			
					});
					
				// WEBSITE-59 - Starts
				$('.node-type-events .field-name-field-event-type div:contains("Free")').css('float', 'none');
				// WEBSITE-59 - Ends
					
			}
	}

})(jQuery, Drupal, this, this.document);
