var menuhover = false;
jQuery(document).ready(function(){
	//jQuery('input, select').not('.tribe-bar-views-select').styler();

	jQuery('#header .btn-menu-header').click(function(){
		jQuery('.overlay-search-lightbox').hide();
		show_custom_popup('main-menu-nav');
		return false;
	});

	jQuery('#main-nav').hover(
		function(){ menuhover = true; },
		function(){ menuhover = false; }
	);
	jQuery(document).click(function(){
		if (!menuhover) {
			jQuery('.main-menu-nav').hide();
		}
	});


	jQuery('.main-menu-nav .btn-close').click(function(){
		hide_custom_popup('main-menu-nav');
		return false;
	});

	if (is_mobile) {
		jQuery('#main-nav .menu-item-has-children a').click(function(){
			if (jQuery(this).parent().find('.sub-menu').size()) {
				if (jQuery(this).parent().find('.sub-menu').is(':visible')) {
					jQuery(this).parent().find('.sub-menu').slideUp();
				} else {
					jQuery(this).parent().find('.sub-menu').slideDown();
				}
				return false;
			}
		});
		jQuery('div.videoplay').remove();
	}
	
	jQuery('#header .btn-searcht-header').click(function(){
		jQuery('.main-menu-nav').hide();
		if (jQuery('.overlay-search-lightbox').is(':visible')) {
			jQuery('.overlay-search-lightbox').fadeOut();
		} else {
			jQuery('.overlay-search-lightbox').fadeIn();
		}
		return false;
	});
	
	jQuery('.overlay-search-lightbox .btn-close').click(function(){
		jQuery('.overlay-search-lightbox').fadeOut();
		return false;
	});

	jQuery('.btn-schedule-header').click(function(){
		show_custom_popup('overlay-schedule-lightbox');
		return false;
	});
	
	jQuery('.overlay-schedule-lightbox .btn-close').click(function(){
		hide_custom_popup('overlay-schedule-lightbox');
		return false;
	});
	
	jQuery('a[href="#ceo-message-modal"]').each(function(){
		jQuery(this).addClass('btn-seo');
	});
	jQuery('.btn-seo, #main-nav .nav-ceo-message a').click(function(){
		show_custom_popup('overlay-message-lightbox');
		return false;
	});
	
	jQuery('.overlay-message-lightbox .btn-close').click(function(){
		hide_custom_popup('overlay-message-lightbox');
		return false;
	});

	jQuery('a[href="#five-wishes-modal"]').each(function(){
		jQuery(this).addClass('five-wishes-popup');
	});
	jQuery('.five-wishes-popup').click(function(){
		show_custom_popup('overlay-wishes-lightbox');
		return false;
	});

	jQuery('.overlay-wishes-lightbox .btn-close').click(function(){
		hide_custom_popup('overlay-wishes-lightbox');
		return false;
	});
	if (jQuery('#homevideo').size()) {
		var vobj = document.getElementById("homevideo");
		vobj.onplay = function() {
			jQuery('.home-slider .videoplay').hide();
		};
		vobj.onpause = function() {
			jQuery('.home-slider .videoplay').show();
		};
		jQuery('.home-slider .videoplay').click(function(){
			vobj.play();
			jQuery('.home-slider .videoplay').hide();
		});
		jQuery('.home-slider').flexslider({
			animation: 'slide',
			slideshow: true,
			smoothHeight: true,
			customDirectionNav: jQuery(".nav-link"),
			controlsContainer: ".pagination-full-slider",
			before: function(){ vobj.pause(); jQuery('.home-slider .videoplay').show(); }
		});
	} else {
		jQuery('.home-slider').flexslider({
			animation: 'slide',
			slideshow: true,
			smoothHeight: true,
			customDirectionNav: jQuery(".nav-link"),
			controlsContainer: ".pagination-full-slider"
		});
	}
	if (jQuery('#videoobj').size()) {
		var vobj = document.getElementById("videoobj");
		vobj.onplay = function() {
			jQuery('.video-box .videoplay').hide();
		};
		vobj.onpause = function() {
			jQuery('.video-box .videoplay').show();
		};
		jQuery('.video-box .videoplay').click(function(){
			vobj.play();
			jQuery('.video-box .videoplay').hide();
		});
	}

	jQuery('.slide-slider').flexslider({
		animation: 'slide',
		slideshow: true,
		customDirectionNav: jQuery(".nav-link"),
		controlsContainer: ".pagination-full-slider"
	});
	jQuery('.gallery-slider').flexslider({
		animation: 'slide',
		slideshow: true,
		customDirectionNav: jQuery(".gnav-link"),
		controlsContainer: ".gallery-slider-pagination"
	});
	if (is_mobile) {
		jQuery('.slider-top-discus').flexslider({
			animation: 'slide',
			slideshow: true,
			customDirectionNav: jQuery(".nav-link"),
			controlsContainer: ".slider-top-discus-pagination"
		});
	}
	jQuery('.services-slider').flexslider({
		animation: 'slide',
		slideshow: false,
		customDirectionNav: jQuery(".nav-link"),
		controlsContainer: ".slider-nav-list-box"
	});
	jQuery('.services-top-slider .slider-nav-list-box ul').addClass('slider-nav-list');
	jQuery('.services-top-slider .slider-nav-list-box ul li').each(function(index, val){
		var liclass = jQuery('.services-top-slider .slider-nav-list-hidden li').eq(index).attr('class');
		var ahtml = jQuery('.services-top-slider .slider-nav-list-hidden li').eq(index).find('a').html();
		jQuery(this).attr('class', liclass).find('a').html(ahtml);
	});
	// contact form
	jQuery('.c-form .services-list .jq-radio').click(function(){
		var v = jQuery(this).find('input').val();
		cform_service(v);
	});
	jQuery('.c-form .via-list .jq-radio').click(function(){
		var v = jQuery(this).find('input').val();
		cform_via(v);
	});
	if (jQuery('.contact-success-text').size()) {
		jQuery('html, body').animate({
			scrollTop: jQuery('.contact-success-text').offset().top - 150
		}, 500);
	}
	// volunteer page
	jQuery('.volunteer-blocks .con').click(function(){
		var block = jQuery(this).attr('rel');
		if (block == volunteerblock) {
			if (jQuery('.volunteer-blocks .'+block+'-content').is(':visible')) {
				jQuery('.volunteer-blocks .con-'+block).parent().removeClass('open');
				jQuery('.volunteer-blocks .'+block+'-content').slideUp();
			} else {
				jQuery('.volunteer-blocks .'+block+'-content').slideDown();
				jQuery('.volunteer-blocks .con-'+block).parent().addClass('open');
			}
		} else {
			jQuery('.volunteer-blocks .blocks-content').hide();
			jQuery('.volunteer-blocks .vol-tabs-nav__item').removeClass('open');

			jQuery('.volunteer-blocks .'+block+'-content').slideDown();
			jQuery('.volunteer-blocks .con-'+block).parent().addClass('open');
			volunteerblock = block;
		}
	});
	jQuery('.volunteer-blocks .blocks-content .btn-close').click(function(){
		var block = jQuery(this).attr('rel');
		jQuery('.volunteer-blocks .con-'+block).parent().removeClass('open');
		jQuery(this).parent().slideUp();
		return false;
	});
	jQuery('.volunteer-blocks .more-link').click(function(){
		jQuery(this).parent().trigger('click');
		return false;
	});
	jQuery('.volunteer-tabs .tab-tit').click(function(){
		var tabclass = jQuery(this).attr('href').replace('#', '');
		if (tabclass != volunteertab) {
			jQuery('.volunteer-tabs .tab-tit').parent().removeClass('open');
			jQuery('.volunteer-tabs .'+volunteertab+'-content').hide();
			jQuery('.volunteer-tabs .'+tabclass+'-content').fadeIn();
			jQuery(this).parent().addClass('open');
			volunteertab = tabclass;
		}
		return false;
	});
	jQuery('.volunteer-tabs .tab1-content .page-nav a').click(function(){
		var vlpg = jQuery(this).attr('href').replace('#', '');
		if (vlpg != volunteervlpg) {
			jQuery('.volunteer-tabs .tab1-content .page-nav a').removeClass('active');
			jQuery(this).addClass('active');
			jQuery('.volunteer-tabs .vol-list-'+volunteervlpg).hide();
			jQuery('.volunteer-tabs .vol-list-'+vlpg).animate({height:'show'}, 300);
			volunteervlpg = vlpg;
			jQuery('html, body').animate({
				scrollTop: jQuery('.volunteer-tabs .tab1-content').offset().top
			}, 0);
			
		}
		return false;
	});
	// teams page
	jQuery('.team-box .team-type').click(function(){
		if (!jQuery(this).parent().hasClass('active')) {
			var ttid = jQuery(this).attr('href').replace('#', '');
			var ttrel = jQuery(this).attr('rel');
			jQuery('.team-box .tt-filter-'+ttrel+' li').removeClass('active');
			jQuery(this).parent().addClass('active');

			jQuery('.team-box .team-list-'+ttrel+' li').hide();
			if (ttid == '0') {
				jQuery('.team-box .team-list-'+ttrel+' li').fadeIn();
			} else {
				jQuery('.team-box .team-list-'+ttrel+' li.team-tax-'+ttid).fadeIn();
			}
		}
		return false;
	});
	jQuery('.team-box .team-more').click(function(){
		var href = jQuery(this).attr('href');
		var tid = href.replace('#', '');
		var tname = jQuery('.team-box .team-data-'+tid+' figcaption').html();
		var timg = jQuery('.team-box .team-data-'+tid+' .team-img').html();
		var tplace = jQuery('.team-box .team-data-'+tid+' .team-place').html();
		var tposition = jQuery('.team-box .team-data-'+tid+' .team-position').html();
		var tcontent = jQuery('.team-box .team-data-'+tid+' .team-content').html();

		jQuery('.team-lightbox .t-img').attr('src', '');
		if (timg != '') {
			jQuery('.team-lightbox .t-img').attr('src', timg).show();
		} else {
			jQuery('.team-lightbox .t-img').hide();
		}

		jQuery('.team-lightbox .t-name').html(tname);
		jQuery('.team-lightbox .t-place').html(tplace);
		jQuery('.team-lightbox .t-position').html(tposition);
		jQuery('.team-lightbox .t-content').html(tcontent);

		var tetp = jQuery('.team-box .team-data-'+tid).offset().top - 30;
		show_custom_popup('overlay-team-lightbox');
		window.location.href = href;
		return false;
	});
	jQuery('.overlay-team-lightbox .btn-close').click(function(){
		var refferer = jQuery(this).attr('data-refferer');
		if (refferer != '') {
			window.location.href = refferer;
		} else {
			hide_custom_popup('overlay-team-lightbox');
		}
		return false;
	});
	if (jQuery('.team-box').size()) {
		var wl = window.location.href;
		if (wl.indexOf('#') > 0) {
			var thref = wl.substring(wl.indexOf('#'), wl.length);
			var teamid = thref.replace('#', '');
			var teampos = jQuery('.team-box .team-data-'+teamid).offset().top - 80;
			jQuery('html, body').animate({
				scrollTop: teampos
			}, 0);
			jQuery('.team-list li a.team-more-'+teamid).trigger('click');
			if (http_refferer != '') {
				jQuery('.overlay-team-lightbox .btn-close').attr('data-refferer', http_refferer);
			}
		}
	}
	jQuery('.schedule-call-lightbox span.service_email').hide();
	if (jQuery('.schedule-call-lightbox .service-radio').size()) {
		jQuery('.schedule-call-lightbox .service-radio .jq-radio').click(function(){
			var rval = jQuery(this).find('input').val();
			schcall_service(rval);
		});
		var dval = jQuery('.schedule-call-lightbox .service-radio div.checked').find('input').val();
		schcall_service(dval);
	}
});
// content images
jQuery('.wp-caption').removeAttr('style');
jQuery('.wp-caption .wp-caption-text').remove();
jQuery('.wp-caption img').removeAttr('width').removeAttr('height');

var volunteerblock = 'block1';
var volunteertab = 'tab1';
var volunteervlpg = '1';

jQuery('.overlay-schedule-lightbox .day-select select').attr('data-placeholder', 'Choose a day*').find('option').eq(0).text('');
jQuery('.overlay-schedule-lightbox .time-select select').attr('data-placeholder', 'Choose a time*').find('option').eq(0).text('');

var cpoptop = 0;
function show_custom_popup(block) {
	var wheight = jQuery(window).height();
	var wscrolltop = jQuery(window).scrollTop();
	var block_height = jQuery('.'+block).height();
	if (block_height < wheight) {
		block_height = wheight;
		if (block != 'main-menu-nav') {
			jQuery('.'+block).height(wheight);
		}
	}

	jQuery('.main-menu-nav').hide();

	jQuery('.global-box').css('height', block_height+'px').addClass('open');
	//jQuery('.'+block).css('top', wscrolltop+'px');
	jQuery('html, body').animate({ scrollTop: 0 }, 0);
	jQuery('.'+block).css('top', '0px');
	jQuery('.'+block).fadeIn(300);
	cpoptop = wscrolltop;
}

function hide_custom_popup(block) {
	jQuery('.global-box').css('height', 'auto').removeClass('open');
	if (cpoptop > 0) {
		jQuery('html, body').animate({ scrollTop: cpoptop }, 0);
	}
	jQuery('.'+block).fadeOut(300);
}

function trim(str) {
	if (str != 'undefined') {
		return str.replace(/^\s+|\s+$/g,"");
	} else {
		return '';
	}
}

function in_array(val, avals) {
	if (avals.length) {
		for (var i=0; i<avals.length; i++) {
			if (val == avals[i]) {
				return true;
			}
		}
	}
	return false;
}

function checkemail(email) {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
		return false;
	}
	return true;
}

function schedule_sent() {
	jQuery('.overlay-schedule-lightbox .day-select .jq-selectbox__select-text').html('Choose a day*');
	jQuery('.overlay-schedule-lightbox .time-select .jq-selectbox__select-text').html('Choose a time*');
	setTimeout(function(){
		jQuery('.overlay-schedule-lightbox .btn-close').trigger('click');
		jQuery('.wpcf7-mail-sent-ok').hide();
	}, 2000);
}

function cform_service(v) {
	var phone_field_service = jQuery('.c-form .phone-field-service').val();
	var phone_field_services = phone_field_service.split(',');
	jQuery('.c-form .fields-box').hide();
	if (in_array(v, phone_field_services)) {
		jQuery('.c-form .phone-only-b').animate({height:'show'}, 200);
	} else {
		jQuery('.c-form .contact-phone-b').animate({height:'show'}, 200);
		var via = jQuery('.c-form .via-list .jq-radio.checked').find('input').val();
		cform_via(via);
	}
}

function cform_via(v) {
	if (v == 'Email') {
		jQuery('.c-form .phone-only-b').hide();
		jQuery('.c-form .contact-email-b').animate({height:'show'}, 300);
	} else {
		jQuery('.c-form .contact-email-b').hide();
		jQuery('.c-form .phone-only-b').animate({height:'show'}, 300);
	}
}

function cform_submit() {
	var errors = '';
	var first_name = trim(jQuery('.c-form .first-name').val());
	var last_name = trim(jQuery('.c-form .last-name').val());
	var email = trim(jQuery('.c-form .email').val());
	var phone = trim(jQuery('.c-form .phone').val());
	var contact_day = jQuery('.c-form .contact-day select').val();
	var contact_time = jQuery('.c-form .contact-time select').val();
	var phone_field_service = jQuery('.c-form .phone-field-service').val();
	var comments = trim(jQuery('.c-form .comments').val());

	var phone_field_services = phone_field_service.split(',');

	var service = '';
	var contact_via = '';
	if (jQuery('.c-form .services-list .jq-radio.checked').size()) {
		service = jQuery('.c-form .services-list .jq-radio.checked').find('input').val();
	}
	if (jQuery('.c-form .via-list .jq-radio.checked').size()) {
		contact_via = jQuery('.c-form .via-list .jq-radio.checked').find('input').val();
	}

	jQuery('.c-form .cform-errors').hide();

	if (first_name == '') {
		errors += 'First Name is required field.<br />';
	}
	if (last_name == '') {
		errors += 'Last Name is required field.<br />';
	}
	if (service == '') {
		errors += 'Please select topic or service.<br />';
	} else {
		if (in_array(service, phone_field_services) || contact_via == 'Phone') {
			if (phone == '') {
				errors += 'Phone Number is required field.<br />';
			}
			if (contact_day == '') {
				errors += 'Please select contact day.<br />';
			}
			if (contact_time == '') {
				errors += 'Please select contact time.<br />';
			}
		} else if (contact_via == 'Email') {
			if (email == '') {
				errors += 'Email is required field.<br />';
			} else if (!checkemail(email)) {
				errors += 'Email address is incorrect.<br />';
			}
		}
	}
    var $captcha = jQuery( '.g-recaptcha' ),
      response = grecaptcha.getResponse();
    if (response.length === 0) {
        errors += 'reCaptcha field is not checked.<br />';
      }
	if (errors == '') {
		return true;
	} else {
		jQuery('.c-form .cform-errors').html(errors).animate({height:'show'}, 300);
		return false;
	}
}

function loc_cform_submit() {
	var errors = '';
	var first_name = trim(jQuery('.loc-cform .first-name').val());
	var last_name = trim(jQuery('.loc-cform .last-name').val());
	var phone = trim(jQuery('.loc-cform .phone').val());
	var reason = jQuery('.loc-cform .reasons select').val();

	jQuery('.loc-cform .cform-errors').hide();

	if (first_name == '') {
		errors += 'First Name is required field.<br />';
	}
	if (last_name == '') {
		errors += 'Last Name is required field.<br />';
	}
	if (phone == '') {
		errors += 'Phone Number is required field.<br />';
	}
	if (reason == '') {
		errors += 'Please select Reason for inquiry.<br />';
	}
    var $captcha = jQuery( '.g-recaptcha' ),
      response = grecaptcha.getResponse();
    if (response.length === 0) {
        errors += 'reCaptcha field is not checked.<br />';
      }
	if (errors == '') {
		return true;
	} else {
		jQuery('.loc-cform .cform-errors').html(errors).animate({height:'show'}, 300);
		return false;
	}
}

function schcall_service(v) {
	var service_emails = jQuery('.schedule-call-lightbox form input.service-emails').val().split('|');
	for (var i=0; i<service_emails.length; i++) {
		var semail = service_emails[i].split(';');
		if (semail[0] == v) {
			jQuery('.schedule-call-lightbox form input.service-email').val(semail[1]);
			jQuery('.schedule-call-lightbox form input.service-email').attr('value', semail[1]);
		}
	}
}