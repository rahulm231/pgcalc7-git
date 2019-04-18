// JavaScript Document

jQuery(function() {
	
	// // search wrap drawer
	// jQuery("#searchBtn").on('click','a',function(event) {
	//   event.preventDefault();
	//   jQuery(".searchWrap").slideToggle();
	//   jQuery(this).toggleClass('open');
	// });
	
	// //dropdown
	// jQuery('#ContentTopNav ul li:has(ul)').hover(function(){
		
	// 	jQuery(this).addClass("hover");
	// 	jQuery(this).find('ul').stop(true,true).slideDown('fast');
	// },function(){
		
	// 	jQuery(this).removeClass("hover");
	// 	jQuery(this).find('ul').stop(true,true).hide();
	// });
	
	// //dropdown classes
	// jQuery('#ContentTopNav nav > ul > li').each(function(){
	// 	jQuery(this).has('ul.sub-menu').addClass('dropdown');
	// 	jQuery(this).has('ul.sub-menu').find('> a').append('<span></span>');
	// });

	//set logged in var
	var loggedin = jQuery('#CmsMasterMenu').length ? true : false;
	if (loggedin){jQuery('body').addClass('loggedin');}

	//FA icon in search btn, placeholder
	jQuery('.search button').text('').addClass('fa fa-search');
	jQuery('.search input').attr('placeholder','search...');

	//quicklink drawer toggle
	jQuery('a.qlToggle').click(function(){
		jQuery('.qlWrap').slideToggle();
		jQuery('a.qlToggle .fa').toggleClass('.fa-caret-down, .fa-caret-up');
	});

	//mob nav add class/icon if has children
	jQuery('#nav .mainNav a').each(function(){
		if (!!jQuery(this).siblings('ul').length){
			jQuery(this).addClass('parent').append('<i class="fa fa-plus"></i>');
		}
	});
	//mob nav children toggling
	jQuery('#nav .mainNav a.parent').click(function(e){
		if (!jQuery(this).parent().hasClass('open')){
			e.preventDefault();
			jQuery(this).parent().toggleClass('open');
			jQuery(this).find('.fa').toggleClass('fa-plus fa-minus');
		}
	});

	//main nav sticky
	jQuery(window).scroll(function(){
		var headerOffset = jQuery('header').outerHeight() - jQuery('header .white').outerHeight();
		if (jQuery(window).scrollTop() >= headerOffset){
			jQuery('body').addClass('stickyNav');
		} else {
			jQuery('body').removeClass('stickyNav');
		}
		//var padTop = jQuery('structBody').css('padding-top');
		//jQuery('.structBody').css('padding-top',padTop + jQuery('header .white').outerHeight());
	});

	//shift banner img to bg img
	if (loggedin){
		var src = jQuery('.banner img').last().attr('src');
		jQuery('.banner').css('background-image','url(' + src + ')');
		jQuery('.banner img').last().css('display','none');
	} else {
		var src = jQuery('.banner img').attr('src');
		jQuery('.banner').css('background-image','url(' + src + ')');
		jQuery('.banner img').css('display','none');
	}

	jQuery('.elWrap img[title="Add to calendar"]').parent().addClass('addCalIcon').html('Add to Calendar').unwrap();
	jQuery('.addCalIcon').each(function() {
		jQuery(this).closest('.elText').find('.elButtons').append(jQuery(this));
	});

	jQuery('.col-md-3.news').newsItemSlice({
		rowWrapper: '<div class="newsRow clearfix"></div>',
		countPerRow: 4
	});

	jQuery('.newsCollapse h1').click(function(){
		jQuery(this).parent().toggleClass('open');
		jQuery(this).find('img').toggle();
	});

});

/*  News Item Slicer
	 *
	 *  USAGE EXAMPLE:
	 *  jQuery('.bx_slide').newsItemSlice({
	 *  	containerWrapper: '<div class="bx_slider"></div>'
	 *  	//rowWrapper: '<div class="row"></div>'
	 *  	//countPerRow: 3	
	 *  });
	 */
	(function($) { $.fn.newsItemSlice = function(options){ var items = $(this), selector = items.selector, containerWrapper = options.containerWrapper, rowWrapper = options.rowWrapper, countPerRow = options.countPerRow; for(var i=0; i < items.length;) { var wrap = items.eq(i).nextUntil(':not(' + selector + ')').addBack().wrapAll(containerWrapper); i += wrap.length; if (countPerRow != undefined) { for(var b = 0; b < wrap.length; b+=countPerRow) { wrap.slice(b, b+countPerRow).wrapAll(rowWrapper); }; } } }; }(jQuery));
