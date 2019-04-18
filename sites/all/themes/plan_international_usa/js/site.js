//=========================================================================================================
//	Site FUnctions
//=========================================================================================================
//---------------------------------------------------------------------------------------------------------
//	Google Analytics Functions
//---------------------------------------------------------------------------------------------------------
var spamcountries = ['CA','Canada','AU','Australia','FR','France','DE','Germany','IT','Italy','NL','Netherlands','ES','Spain','UK','United Kingdom'];

//	Get data from _utmz cookie
function extractAnalyticsData() {
	var data        = {};
	var ga_source   = '';
	var ga_campaign = '';
	var ga_medium   = '';
	var ga_term     = '';
	var ga_content  = '';
	var gc          = '';

	var c_name      = "__utmz";
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			gc = unescape(document.cookie.substring(c_start,c_end));
		}
	}
	data.gc = gc;
	if(gc != "") {
		var y = gc.split('|'); 
		for(i=0; i<y.length; i++)
		{
			if(y[i].indexOf('utmcsr=') >= 0) data.ga_source = y[i].substring(y[i].indexOf('=')+1);
			if(y[i].indexOf('utmccn=') >= 0) data.ga_campaign = y[i].substring(y[i].indexOf('=')+1);
			if(y[i].indexOf('utmcmd=') >= 0) data.ga_medium = y[i].substring(y[i].indexOf('=')+1);
			if(y[i].indexOf('utmcct=') >= 0) data.ga_content = y[i].substring(y[i].indexOf('=')+1);
			if(y[i].indexOf('utmctr=') >= 0) data.ga_term = y[i].substring(y[i].indexOf('=')+1);
		}
	}
	return data;
};

//	Get GA ID from _utma cookie
function extractID() {
	var c_name = "__utma";
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			gc = unescape(document.cookie.substring(c_start,c_end));

			if(gc != "") {
				var y = gc.split('.'); 
				return y[1];
			}

		}
	}
};	

//---------------------------------------------------------------------------------------------------------
//	Site Functions
//---------------------------------------------------------------------------------------------------------
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

function scrollActions(){
	if (jQuery(window).scrollTop() > 1) {
		jQuery('body').addClass('scrolled');
	}else{
		jQuery('body').removeClass('scrolled');
	}
}

//	do this on page load, and when loading a form via ajax
function formLoad(disableslectric){
	$('.quicklinks').click(function(event){
		$(this).toggleClass('active');
	});

	if (!disableslectric) {
		$('select').selectric();
	}

	$('#cvv').payment('formatCardCVC');
	$('.numeric').numeric();

	$('.overlay-trigger-image').magnificPopup({
		type:'image',
		closeOnBgClick: false,
		closeOnContentClick: false,
	});

	$('.overlay-trigger-give').magnificPopup({
		closeMarkup: '<button title="%title%" class="mfp-close"><span class="mfp-close-icn">X</span>Close</button>',
		type:'ajax',
		closeOnBgClick: false,
		closeOnContentClick: false,
		mainClass: 'give-overlay',
	});

	$('.overlay-trigger').magnificPopup({
		type:'inline',
		closeOnBgClick: false,
		closeOnContentClick: false,
	});

/*
	$('.overlay-trigger2').magnificPopup({
		type:'inline',
		closeOnBgClick: false,
		closeOnContentClick: false,
		key: 'overlay2',
	});
*/

	$('.overlay-trigger-iframe').magnificPopup({
		type:'iframe',
		closeOnBgClick: false,
		closeOnContentClick: false,
	});

	$('.overlay-trigger-ajax').magnificPopup( { 
		type:'ajax',
		closeOnBgClick: false,
		closeOnContentClick: false,
	    callbacks: {
			ajaxContentAdded: function() {
				$('.mfp-content select').selectric();
				formLoad();
			}
		}
	});

	$('body').on('change','#checkall',function(event){
		$('#email-preferences input').attr('checked',true);
	});

	$('body').on('change','#email-preferences',function(event){
		$('#checkall').attr('checked',false);
	});
}

//---------------------------------------------------------------------------------------------------------
//	On Window Load
//---------------------------------------------------------------------------------------------------------
/*
$(window).load(function(){
 	$('.scrollblock .sidebar-nav').each(function(i){
		var container      = $(this).closest('div');
		var containerLimit = container.offset().top + container.height() - $(this).height()-20;

 		$(this).scrollToFixed({
 			limit: containerLimit,
 			marginTop: $('#header').outerHeight(),
 		});
 	});
});
*/
//=======================================================================================================
//-------------------------------------------------------------------------------------------------------
//	Jquery on ready
//-------------------------------------------------------------------------------------------------------
//=======================================================================================================
function resetFormElement(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();

  // Prevent form submission
  e.stopPropagation();
  e.preventDefault();
}


jQuery(document).ready(function(){
/*	
    $('#childletter #fileupload').bind('change', function() {
		if (this.files[0].size > 2000000) {
//			$('#fieldblock-fileupload').closest('#fieldblock-fileupload').addClass('fieldblock-error').find('.fielderror').html('File exceeded 2MB limit');

			$.magnificPopup.open({
				items: {
					src: '#file-size-error'
				},
				type: 'inline',
			}, 0);

			resetFormElement( $("#fieldblock-fileupload") );
		}
		else
		{
			$('#fieldblock-fileupload').closest('#fieldblock-fileupload').removeClass('fieldblock-error').find('.fielderror').html('');

		}
    });

	//---------------------------------------------------------------------------------------------------------
	//	GA Events
	//---------------------------------------------------------------------------------------------------------
	//	mailto
	$('body').on('click','a[href^="mailto:"]',function(){
		_gaq.push(['_trackEvent', 'Email', 'Click', document.location.pathname.match(/[^\/]+$/)[0] ]);
	});

	//	eNews Signup
	$('body').on('submit','#signup',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','eNews Signup']);
	});

	//	Site entry form
	$('body').on('submit','#siteentryform',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','Site Entry Form']);
	});

	$('body').on('submit','#exitintent',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','Site Exit without Cart']);
	});

	//	Exit with Cart
	$('body').on('submit','#exitwithcart',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','Site Exit with Cart']);
	});

	//	Exit with Cart
	$('body').on('submit','#exitwithcart',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','Site Exit with Cart']);
	});

	//	Login
	$('body').on('submit','#login',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','Donor Portal Signin']);
	});

	//	Quick Checkout/Give
	$('body').on('submit','#quickgive, #orderform-new',function(){
		_gaq.push(['_trackEvent', 'Form', 'Submission','New Account/Quick Give']);
	});
	
	//	Send Gift Card
	$('body').on('submit','#giftcardform',function(){
		var isPrint = $(this).closest('form').find('.submitprint-field').val();
		
		if (isPrint != 1)
		{
			_gaq.push(['_trackEvent', 'Form', 'Submission','Tell a Friend eCard']);
		}
	});

	//	Custom Form Submission
	$('body').on('submit','#customfrom',function(){
		var formName = $('#customformname').val();
		_gaq.push(['_trackEvent', 'Form', 'Submission',formName]);
	});	
	
	
	$('body').on('change','#fieldblock-paymenttype input',function(event) {
		var value = $(this).val();
		
		if (value == 'ACH') {
			$('#ach-fields').show();
			$('#cc-fields').hide();
		} else {
			$('#ach-fields').hide();
			$('#cc-fields').show();
		}
	});

	$('body').on('click','.formattr',function(event){
		var formname = $(this).attr("form");
		$('#'+formname).submit();
	});
	//$( "#hero").delay( 2000 ).css('visibility', 'visible');

	$('#hero')
		.delay(200)
		.queue(function (next) { 
			$(this).css('visibility', 'visible'); 
			next(); 
	});

	$('body').on('change', 'select#country', function(event){
		var value = $(this).val();
		var isspamcountry = jQuery.inArray(value,spamcountries);

		if( isspamcountry > 0  ) {
			$('#fieldblock-optin').removeClass('hidden');
			$('#optin').attr('checked', false);
		}else{
			$('#fieldblock-optin').addClass('hidden');
			$('#optin').attr('checked', true);
		}
	});


	$(".ellipsis").dotdotdot();
	
	$('.play').click(function(event){
		event.preventDefault();

		var video = $(this).closest('.video-container').find('video').get(0);
		video.play();
		$(this).hide();
	});

	$('body').on('change', '#fieldblock-giftcardrecipient input', function(event){
		if ( $(this).val() == 2 ) {
			$('#designee').slideDown();
		} else {
			$('#designee').slideUp();
		}
	});

	$('#apply-coupon').click(function(event){
		$('#update-input').val(1);
	});

	$("#cart .change-submit").change(function(event){
		$('#update-input').val(1);
	});

	$('body').on('click','.continue-button',function(event){
		$('#continue-input').val( $(this).val() );
	});

	$('#header-cart a').click(function(event){
		var cartcount = $('#cart-count').html();
		cartcount     = parseInt(cartcount);
		if (cartcount < 4) {
			event.preventDefault();
			$('#mini-cart').slideToggle();
		};
	});


	$('.fieldblock input[value!=""]' ).addClass('notempty');

	/* define init variables for your organization 
	luminateExtend({
		apiKey: lo_api_key, 
//		apiKey: 'planapi', 
		path: {
			nonsecure: 'http://'+lo_short_name+'.convio.net/site/', 
			secure: 'https://secure3.convio.net/'+lo_short_name+'/site/'

//			nonsecure: 'http://plandev.convio.net/site/', 
//			secure: 'https://secure3.convio.net/plan/site/'

		}
	});
	*/

	/*
	$('.tabs a').click(function(event){
		event.preventDefault();
		$(this).closest('.tab-container').find('.tab').hide();
		$(this).closest('.tabs').find('a').removeClass('active');
		$(this).addClass('active');
		$($(this).attr('href')).show();
	});

	$('body').on('change','#fieldblock-recurring input',function(event){
		var value = $(this).val();
		if (value == 2 || value=='monthly') {
			$('#recurring-description').show();
			$('#one-time-description').hide()
			$('#frequency-section').show();
			$('#giftdedication').hide();
			$('#giftdedication input:checked').attr('checked',false);
			$('#designee input').val('');
			$('#designee').hide();
			$('.recurring-only').show();
		}else{
			$('#recurring-description').hide();
			$('#one-time-description').show()
			$('#frequency-section').hide();
			$('#giftdedication').show();
			$('.recurring-only').hide();
		}
	});

	$('body').on('change','#gift-designation',function(event){
		var formId = $(this).val();
		$('#form-fields').load('/give/donation.php?id='+formId, function(){
			formLoad(true);
		});
	});
	
	$('select').selectric();
	
	$('body').on('blur','#cardnumber',function(event){
		
		var cardType = $.payment.cardType( $(this).val() );

		if (cardType != 'null') {
			$('#card-icon').attr('src','/site/images/cards/'+cardType+'.png');
		}
	});

	formLoad();
	
	$('body').on('change','#country',function(event){
		var country = $(this).val();

		if (country == 'CA'|| country == 'Canada') {
			$('#state').load('/site/provinces.php',function(){
				$('#state').selectric('refresh');
			});
			$('#fieldblock-state').show();
			$('#optin').attr('checked', false);
			$('#fieldblock-postalcode .require').show();
			$('#fieldblock-postalcode input').not('.not-required').attr('placeholder','ZIP/Postal Code *');
		} else if(country == 'US' || country == 'United States') {
			$('#state').load('/site/states.php',function(){
				$('#state').selectric('refresh');
			});
			$('#fieldblock-state').show();
			$('#fieldblock-postalcode .require').show();
			$('#fieldblock-postalcode input').not('.not-required').attr('placeholder','ZIP/Postal Code *');
		} else {
			$('#state').html('<option value="" selected></option>');
			$('#state').selectric('refresh');
			$('#fieldblock-state').hide();
			$('#fieldblock-postalcode .require').hide();
			$('#fieldblock-postalcode input').attr('placeholder','ZIP/Postal Code');
		}
	});
	
	$('#cvv').payment('formatCardCVC');
	$('.numeric').payment('restrictNumeric');

	$('#mainnav-3140 a').magnificPopup({ 
		type:'ajax',
		mainClass:'quickgive-overlay light-on-dark',
		removalDelay: 400,
		closeOnBgClick: false,
		closeOnContentClick: false,
	    callbacks: {
			ajaxContentAdded: function() {
				$('.mfp-content select').selectric();
				formLoad();
			}
		}
	});

	$('body').on('click','#quick-step-1',function(event){

		var amount       = $("#fieldblock-givinglevel input:radio:checked").attr('data-value');
		var quickminimum = $('#otheramount').attr('data-minimum');

		if (amount <= 0) {
			amount = $('#otheramount').val();
			if (amount == '') {
				amount = 0;
			}
		}

		amount       = parseInt(amount);
		quickminimum = parseInt(quickminimum);

		if (amount <= 0) {
			$('#fielderror-givinglevel').html('Please enter a gift amount.').show();
			return;
		} else if(amount < (quickminimum)) {
			$('#fielderror-givinglevel').html('Please enter a gift amount of $'+quickminimum+' or more.').show();
			return;
		} else {
			$('#fielderror-givinglevel').html('').hide();
		}

		$('#step1').hide();
		$('#step2').show();
	});

	$('body').on('change','#fieldblock-givinglevel .levels',function(){
		var val = $(this).attr('data-value');
		$('#quickgive-amount span').html(val);
		$('#otheramount').val('');
	});
	
	$('body').on('change','#otherlevel',function(){
		var ischecked = $(this).attr('checked');
		if (ischecked) {
			$('#quickgive-amount span').html('0');
			$('#otheramount').focus();
		}
	});

	$('body').on('keyup','#fieldblock-givinglevel input[type=text]',function(){
		var val = $(this).val();
		if (val > 0)
		{
			$('#otherlevellabel').click();
		}
		$('#quickgive-amount span').html(val);
	});


	$('body').on('blur','input[type=text],input[type=email],textarea',function(){
	    var val = $(this).val();
	    if(val == '') {
			$(this).removeClass('notempty');
		}else{
			$(this).addClass('notempty');			
		}
	});
	*/
	jQuery( window ).scroll(function() {
		scrollActions();
	});
	
	// ?? #globalnav li.i0, #header #global-nav2 a 
	/*
	$("#mainnav li.i0").hover(function(event){
		$('#header').addClass('supernav-active');
	},function(event){
		$('#header').removeClass('supernav-active');
	});
	
	// ?? #globalnav li.i0, #header #global-nav2 a 
	$("#portalnav li.i0").hover(function(event){
		$('#portalnav').addClass('nav-hover');
	},function(event){
		$('#portalnav').removeClass('nav-hover');
	});


	$('#map-legend-toggle').click(function(event){
		$(this).hide();
		$('#map-legend').show();
	});

	$('#map-legend .close').click(function(event){
		$('#map-legend').hide();
		$('#map-legend-toggle').css('display','inline-block');
	});

	$('#map-legend a[data-color]').toggle(function(event){
		event.preventDefault();
		var color = $(this).attr('data-color');
		var groupId = $(this).attr('data-group');
		$(this).addClass('inactive');
		ammap.hideGroup(groupId);
	},function(event){
		event.preventDefault();
		var color = $(this).attr('data-color');
		var groupId = $(this).attr('data-group');
		$(this).removeClass('inactive');
		ammap.showGroup(groupId);
	});

	$('#map-info').on('click','.close',function(){
		$('#map-info').hide();
		ammap.zoomToLongLat(1.2, 10.215272, 30.241616);		
	})

	$('#main p').highlighter({
		'selector': '.highlighter-container',
		'minWords': 1,
		'complete': function (data) {
			var text = getSelectionText();
			//	Update twitter link
			var url = $('.highlighter-container a.share-twitter').attr('href');
			url = UpdateQueryString('text', text, url);
			$('.highlighter-container a.share-twitter').attr('href',url);

			//	Update linked link
			var url = $('.highlighter-container a.share-linkedin').attr('href');
			url = UpdateQueryString('summary', text, url);
			$('.highlighter-container a.share-linkedin').attr('href',url);

			//	Update email link
			var url = $('.highlighter-container a.share-email').attr('href');
			url = UpdateQueryString('text', text, url);
			$('.highlighter-container a.share-email').attr('href',url);

		}
	});

	$('body').on('click','.mfp-content .filtertype h4',function(event){
		$(this).toggleClass('active').next('.filter-options').slideToggle();
	});

	$('.mobile-overlay-button').magnificPopup({
		type:'inline',
		mainClass: 'filter-overlay',
		alignTop:true,
		closeOnBgClick: false,
		closeOnContentClick: false,
	});

	$('#goh-filter #mobile-filter-footer button').click(function(event){
		$('#goh-filters').detach().appendTo('form.filter-form');
		var data = $('form.filter-form').serialize();
		var action = $('form.filter-form').attr('action');
		window.location.href = action+'?'+data;
	});

	$('#all-filters #mobile-filter-footer button').click(function(event){
		$('#all-filters').detach().appendTo('form.filter-form');
		var data = $('form.filter-form').serialize();
		var action = $('form.filter-form').attr('action');
		window.location.href = action+'?'+data;
	});

	$('body').on('click','.mfp-content .filter-toggle',function(event){
		var target = $(this).attr('data-target');
		if( $(this).hasClass( 'active' ) ) {
			$(this).removeClass('active');
			$(target).slideUp();
		} else {
			$(this).addClass('active').removeClass('inactive');
			$('#all-filters').addClass('open');
			$('#filters .toggle').hide()
			$(target).detach().insertAfter(this).slideDown();
		}
	});

	$('body').on('click','.mfp-content .filter-toggle label',function(event){
		$('#all-filters').addClass('active');
	});

	$('#results').on('click','.filter-toggle',function(event){
		var target = $(this).attr('data-target');
		if( $(this).hasClass( 'active' ) ) {
			$(this).siblings('.filter-toggle').removeClass('inactive').removeClass('active');
			$(this).removeClass('active');
			$(target).slideUp();
		} else {
			$(this).siblings('.toggle').hide();
			$(this).siblings('.filter-toggle').addClass('inactive').removeClass('active');
			$(this).addClass('active').removeClass('inactive');
			$('#filters .toggle').hide()
			$(target).slideDown();
		}
	});

	//	Submit a form via ajax
	$('body').on('submit','.ajaxsubmit',function(event){
		var target = $(this).attr('data-target');
		target	= (typeof target === "undefined")
				? '#results' 
				: target;

		$.ajax({
            url     : $(this).attr('action'),
            type    : $(this).attr('method'),
            data    : $(this).serialize(),
            success : function( data ) {
                        $(target).html(data);
                        formLoad();
                      },
            error   : function( xhr, err ) {
                      }
        });    
        return false;
	});

	$('body').on('keyup','.keyup-submit2',function(event){
		var value = $(this).val();
		if (value > 0) {
			$(this).closest('form').delay(700).submit();
			$('#update-input').val(1);			
		};
	});

	$('body').on('keyup','.keyup-submit',function(event){
		var length = $(this).val().length;
		if (length == 0 || length > 3) {
			$(this).closest('form').delay(700).submit();
		};
		$('#update-input').val(1);
	});

	$('body').on('change','.change-submit',function(event){
		$('#update-input').val(1);
		$(this).closest('form').submit();
	});

	$('.scroll-list a').click(function(event){
		event.preventDefault();

		var target    = $(this).attr('href');
		var faqPos    = $(target).closest('div').offset().top;
		var targetPos = $(target).offset().top;

//		$(this).closest('.sidebar-nav').animate({
//			paddingTop: targetPos-faqPos
//		}, 2000);

		$('html, body').animate({
			scrollTop: targetPos-100
		}, 2000);

	});


	$('a.scroller').click(function(event){
		event.preventDefault();
		var target    = $(this).attr('href');
		var targetPos = $(target).offset().top;

		$('html, body').animate({
			scrollTop: targetPos-100
		}, 2000);		
	});

	$('li[data-image]').hover(function(event){
		var dataImage = $(this).attr('data-image');
		var dataMask = $(this).attr('data-mask');
		if (dataImage.length > 0) {
			$('#menu-image').css('background-image', 'url('+dataImage+')' );
			$('#menu-image-mask').addClass(dataMask);
		}else{
			$('#menu-image').css('background-image', 'url(/site/images/logomark_default.png)' );
			$('#menu-image-mask').attr('class','');
		}
	},function(event){
		$('#menu-image').css('background-image', 'url(/site/images/logomark_default.png)' );
			$('#menu-image-mask').attr('class','');
	});
	*/
	jQuery('#header .b-search').toggle(function(event){
		event.preventDefault();
		jQuery(this).addClass('active');
		jQuery('#search').show();
		jQuery('#search input').focus();
		jQuery('#social-container').hide();
	},function(event){
		event.preventDefault();
		jQuery(this).removeClass('active');
		jQuery('#search').hide();
		jQuery('#search input').val('');
		jQuery('#jquery-live-search').html('');
		jQuery('#social-container').show();
	});

	/*
	$('#mobilemain a.a0').click(function(event){
		var submenu = $(this).closest('li').find('ul');
		if (submenu.length > 0) {
			event.preventDefault();
			submenu.addClass('active').animate({left: '0px'},1000);
			$('#mobilemain').animate({left: '-238px'},1000);
			$('#mobileglobal').animate({left: '-238px'},1000);
			$('#mobile-icons-shadow').show();
		};
	});

	$('#mobilemain .m1 .first a.a1').click(function(event){
		event.preventDefault();
		$(this).closest('ul').animate({left: '238px'},1000,function(){
			$(this).removeClass('active');
		});
		$('#mobilemain').animate({left: '0px'},1000);
		$('#mobileglobal').animate({left: '0px'},1000);
		$('#mobile-icons-shadow').hide();
	});
	*/

	jQuery('#menu-toggle').toggle(function(){
		//$('#wrapper').css('margin-left','238px');
		jQuery('#wrapper').animate({marginLeft:'238px'},1000);
		jQuery('#mobilenav').show().animate({left: '0px'},1000);
		jQuery('body').css('overflow','hidden');
	},function(){
		jQuery('body').css('overflow','auto');
		jQuery('#wrapper').animate({marginLeft:'0px'},1000);
		jQuery('#mobilenav').animate(
			{left: '-238px'},
			1000,
			function() {
				jQuery(this).hide();
			});
	});
	/*
	$('#child-filter .filter-reset').click(function(event){
		event.preventDefault();
		$(this).addClass('hidden');
		$('#child-filter select').val('').selectric('refresh');
		$('#child-filter').submit();
	});

//	$('#child-filter').submit(function(event){
//		event.preventDefault();
//		var data = $(this).serialize();
//		var url = $(this).attr('action');
//
//		if (data != 'gender=&age=&country=') {
//			$('#child-filter .filter-reset').removeClass('hidden');
//		}else{
//			$('#child-filter .filter-reset').addClass('hidden');
//		}
//
//		$('#results').load(url,data,function(){
//			formLoad();
//		});
//		$('#select-gender').load('/sponsorship/genders.php',data);
//		$('#select-age').load('/sponsorship/ages.php',data);
//		$('#select-country').load('/sponsorship/countries.php',data);
//
//	});

	$('#results').on('click','.child-button',function(event){
		event.preventDefault();

		$('.child-button.active,.child.active').removeClass('active');

		var target = $(this).attr('data-target');
		$(target).addClass('active');
		$(this).addClass('active');
	});

	$('#results').on('click','#pagelinks a',function(event){
		event.preventDefault();

		var url = $(this).attr('href');
		$('#results').load(url,function(){
			formLoad();

			$('html, body').animate({
				scrollTop: 0
			}, 500);
		});
	});


//-------------------------------------------------------------------------------------------------------
//	Example fixed position elements
//-------------------------------------------------------------------------------------------------------
//	$('#right').scrollToFixed( { 
//		limit: ($('#footer').offset().top)-($('#right').height())
//	});
//
//	$('#left').scrollToFixed( { 
//		limit: ($('#footer').offset().top)-($('#left').height())
//	});

//---------------------------------------------------------------------------------------------------------
//	Init the acton forms
//---------------------------------------------------------------------------------------------------------
//	$('form').ActOnForm();

//---------------------------------------------------------------------------------------------------------
//	Predictive Search
//---------------------------------------------------------------------------------------------------------
	$('#header input[name="findtext"]').liveSearch({url: '/search/predictive_search.php?findtext='});

//-------------------------------------------------------------------------------------------------------
//	External Links
//-------------------------------------------------------------------------------------------------------
	$('a[href^="http://"]').attr("target", "_blank");
	$('a[href^="https://"]').attr("target", "_blank");

//-------------------------------------------------------------------------------------------------------
//	Social Media Share - Open new window
//-------------------------------------------------------------------------------------------------------
	$(".sharepopup").click(function(event) {
		event.preventDefault();

		//	Master category for all shares
		var	category	= 'Share';

		//	Share category
		var	subcategory	= $(this).attr("data-id");

		//	Label based on title
		var	label		= $(document).attr("title");

		//	Send the event to Analytics
//		_gaq.push(['_trackEvent', category, subcategory, label ]);

		var	attributes	= "width=550,height=300,location=0,menubar=0,toolbar=0";
		window.open( $(this).attr("href"), "share", attributes, true );
	});

//---------------------------------------------------------------------------------------------------------
//	Fix stupid youtube videos
//---------------------------------------------------------------------------------------------------------
	$("iframe[src*='youtube.com']").each(function() {

		var url = $(this).attr('src');
		if (url.indexOf('?')>1) {
		    $(this).attr("src", $(this).attr("src") + '&wmode=transparent');
		}else{
		    $(this).attr("src", $(this).attr("src") + '?wmode=transparent');
		}
	});

//-------------------------------------------------------------------------------------------------------
//	Track Downloads
//-------------------------------------------------------------------------------------------------------
	$("a.download,a[href$='pdf'],a[href$='doc'],a[href$='mp3']").click(function(){

		//	Master category for all downloads
		var	category	= 'Downloads';

		//	Path of file being downloaded
		var	filepath	= $(this).attr("href");

		//	Use the file extention as the "action" parameter for the event
		filepath		= filepath.split(".");
		var	filetype	= filepath[ ( filepath.length - 1 ) ].toUpperCase();

		//	Label based on title or href
		var	label		= $(this).attr("title");

		if( !label )
		{
			label		= $(this).attr("href");
		}

		//	Send the event to Analytics
		_gaq.push(['_trackEvent', category, filetype, label ]);

		//	Open in new tab
		$(this).attr("target","_blank");
	});

//---------------------------------------------------------------------------------------------------------
//	Expandible widgets
//---------------------------------------------------------------------------------------------------------
    $("h2.expand").click(function () {
		$(this).next("div.expandable").slideToggle("fast");
    });

    $('.toggle-trigger').click(function(event){
    	event.preventDefault();

    	var target = $(this).attr('href');
    	$(target).slideToggle();
    });

	$('a.scroll-toggle').click(function(event){
		event.preventDefault();
		var target       = $(this).attr('href');
		var scrolltarget = $(this).attr('data-target');
		var targetPos    = $(scrolltarget).offset().top;


    	$(target).slideDown(function(){
			$('html, body').animate({
				scrollTop: targetPos-100
			}, 2000);		
    	});

	});    

    $('body').on('click','.toggle-more',function(event){
    	event.preventDefault();

		var active = $(this).attr('data-active');
		var target = $(this).attr('href');

    	if (active == 1) {
    		$(this).attr('data-active',0).html('<span>+</span> MORE');
	    	$(target).slideUp();
    	} else {
    		$(this).attr('data-active',1).html('<span>-</span> LESS');
	    	$(target).slideDown();
    	}
    });

    $('body').on('click','.toggle-more2',function(event){
    	event.preventDefault();

		var active = $(this).attr('data-active');
		var target = $(this).attr('href');

    	if (active == 1) {
    		$(this).attr('data-active',0).html('More');
	    	$(target).slideUp();
    	} else {
    		$(this).attr('data-active',1).html('Less');
	    	$(target).slideDown();
    	}
    });
//---------------------------------------------------------------------------------------------------------
//	Remove text from the textboxes when one focuses on the textbox
//---------------------------------------------------------------------------------------------------------
    $('.inline-label input,.inline-label textarea').each(function(){

		$(this).focus(function(){
			$(this).siblings("label").fadeTo( 75, 0 );
		});

		$(this).blur(function(){
			if( $(this).val() )
			{
				fade_on_blur	= 0;
			}
			else
			{
				fade_on_blur	= 1.0;
			}
			$(this).siblings("label").fadeTo( 75, fade_on_blur );
		});

	});

//---------------------------------------------------------------------------------------------------------
//	Add submenu indicators
//---------------------------------------------------------------------------------------------------------
	$("nav#mainnav li.i1").find("ul").parent().each(function () {
		$(this).find("a.a1").addClass("showsub");
	});

//---------------------------------------------------------------------------------------------------------
//	Remove broken event.layerX and event.layerY properties (jQuery < 1.7)
//	http://jsperf.com/removing-event-props/9
//---------------------------------------------------------------------------------------------------------
	(function(){
		// reset
		$.event.props = [
            'altKey', 'attrChange', 'attrName', 'bubbles', 'button', 'cancelable',
            'charCode', 'clientX', 'clientY', 'ctrlKey', 'currentTarget', 'data',
            'detail', 'eventPhase', 'fromElement', 'handler', 'keyCode', 'layerX',
            'layerY', 'metaKey', 'newValue', 'offsetX', 'offsetY', 'pageX', 'pageY',
            'prevValue', 'relatedNode', 'relatedTarget', 'screenX', 'screenY',
            'shiftKey', 'srcElement', 'target', 'toElement', 'view', 'wheelDelta',
            'which'
        ];
		// remove layerX and layerY
		if ($.event.props[17] == 'layerX') {
			$.event.props.splice(17, 2);
		}
	}());
	*/
});


//=========================================================================================================
//	LO integration
//=========================================================================================================
var loFormName = '';

//---------------------------------------------------------------------------------------------------------
//	Submit Order Form to LO
//---------------------------------------------------------------------------------------------------------
var orderstoprocess = 0;
var currentOrder    = 0;
var OrderbuttonHTML = '';

function SubmitOrderToLO(formname) {
	//	Make sure the form exists
	formObj = document.forms[formname];

	loFormName = formname;

	//	Submit the form
	if (formObj)
	{
		OrderbuttonHTML = $('#order-button-container').html();
		$('#order-button-container').html('<span class="button">Processing...</span>');

		var postdata = '';
		var delay    = 1500;

		//	Format postdata
		$('#'+formname+' *').filter(':input').each(function(){
			var type     = $(this).attr('type');
			var key      = $(this).attr('data-cloFieldName');
			var val      = $(this).val();
			var itemData = '';

			if ( type == 'radio' || type == 'checkbox') {
		    	if($(this).is(':checked')==false){
		    		val = '';
		    	}
		    }

		    if (key && val) {
		    	postdata += '&'+key+'='+ encodeURIComponent(val);
		    };
		});

		orderstoprocess = $('.order-items').length;

		$.magnificPopup.open({
			items: {
				src: $('<div><center><img src="/site/images/loading.gif"><br><br>Processing...</center></div>')
			},
			type: 'inline',
			showCloseBtn: false
		}, 0);

		var ga_data = extractAnalyticsData();

		postdata += '&set.custom.utm_campaign=' + ga_data.ga_campaign;
		postdata += '&set.custom.utm_medium='   + ga_data.ga_medium;
		postdata += '&set.custom.utm_source='   + ga_data.ga_source;
		postdata += '&set.custom.utm_content='  + ga_data.ga_content;
		postdata += '&set.custom.utm_term='  	+ ga_data.ga_term;
		postdata += '&set.custom.utm_ga=' 		+ extractID();

		//	Submit each form
		$('.order-items').each(function(){
			var idx = $(this).attr('data-index');

			setTimeout(function() {

				itemData = '';

				$('div[data-index='+idx+'] input').each(function(){
				    var key  = $(this).attr('data-cloName');
				    var val  = $(this).val();

				    if (key && val) {
				    	itemData += '&'+key+'='+ encodeURIComponent(val);
				    };

				});

				//	Submit to Convio
				luminateExtend.api({
					api: 'CRDonationAPI', 
					callback: orderCallback, 
					data: postdata+itemData, 
					requestType: 'POST', 
					requiresAuth: false
				});

			}, delay * (idx-1));

		});
	}
	else
	{
		alert('error: missing form object');
		return false;
	}
}

//---------------------------------------------------------------------------------------------------------
//	Luminate Extend Order Callback
//---------------------------------------------------------------------------------------------------------
	window.orderCallback = {
		error: function(data) {
			currentOrder++;
			var error = data.errorResponse.message;

			$('#order-items-'+currentOrder+' .error').val(error);
			submitComplete();
		}, 
		success: function(data) {
			currentOrder++;

			if(data.donationResponse.errors) {
				var error      = data.donationResponse.errors.message;
				var resultText = JSON.stringify(data);

				$('#order-items-'+currentOrder+' .error').val(error);
				$('#order-items-'+currentOrder+' .raw_result').val(resultText);

				submitComplete();
			} else {
				var transID     = data.donationResponse.donation.transaction_id;
				var confirmCode = data.donationResponse.donation.confirmation_code;
				var resultText  = JSON.stringify(data);

				$('#order-items-'+currentOrder+' .transaction_id').val(transID);
				$('#order-items-'+currentOrder+' .confirmation_code').val(confirmCode);
				$('#order-items-'+currentOrder+' .raw_result').val(resultText);

				submitComplete();
			}
		}
	}

//---------------------------------------------------------------------------------------------------------
//	Submit Order when all callbacks are done
//---------------------------------------------------------------------------------------------------------
function submitComplete() {
	--orderstoprocess;

	if (orderstoprocess <= 0 ) {
		setTimeout( "formObj.submit();", 1 );
	};
}


//---------------------------------------------------------------------------------------------------------
//	Submit Form to LO
//---------------------------------------------------------------------------------------------------------
var LObuttonHTML = '';

function SubmitToLO(formname) {
	//	Make sure the form exists
	formObj = document.forms[formname];

	loFormName = formname;

	LObuttonHTML = $('#finish-donation').html();
	$('#ajax-load #finish-donation').html('<span class="button">Processing...</span>');
	
	//	Submit the form
	if (formObj)
	{
		var postdata = '';

		//	Format postdata
		$('#'+formname+' *').filter(':input').each(function(){
		    var type = $(this).attr('type');
		    var key  = $(this).attr('data-cloFieldName');
		    var val  = $(this).val();

			if ( type == 'radio' || type == 'checkbox'){
		    	if($(this).is(':checked')==false){
		    		val = '';
		    	}
		    }

		    if (key && val) {
		    	postdata += '&'+key+'='+ encodeURIComponent(val);
		    };
		});

		var ga_data = extractAnalyticsData();

		postdata += '&set.custom.utm_campaign=' + ga_data.ga_campaign;
		postdata += '&set.custom.utm_medium='   + ga_data.ga_medium;
		postdata += '&set.custom.utm_source='   + ga_data.ga_source;
		postdata += '&set.custom.utm_content='  + ga_data.ga_content;
		postdata += '&set.custom.utm_term='  	+ ga_data.ga_term;
		postdata += '&set.custom.utm_ga=' 		+ extractID();

		//	Submit to Convio
		luminateExtend.api({
			api: 'CRDonationAPI', 
			callback: donateCallback, 
			data: postdata, 
			requestType: 'POST', 
			requiresAuth: false
		});

		return false;
	}
	else
	{
		alert('error: missing form object');
		return false;
	}
}

//---------------------------------------------------------------------------------------------------------
//	Luminate Extend Donation Callback
//---------------------------------------------------------------------------------------------------------
	window.donateCallback = {
		error: function(data) {
			var error = data.errorResponse.message;
			ShowCLOError('Error:',error);

		}, 
		success: function(data) {
			if(data.donationResponse.errors) {
				var error = data.donationResponse.errors.message;
				ShowCLOError('Error:',error);
			} else {
				var transID     = data.donationResponse.donation.transaction_id;
				var confirmCode = data.donationResponse.donation.confirmation_code;
				var resultText  = JSON.stringify(data);
				$('#transaction_id').val(transID);
				$('#confirmation_code').val(confirmCode);
				$('#raw_result').val(resultText);

				if (loFormName) {
					submitLoForm(loFormName);
				}else{
					setTimeout( "formObj.submit();", 1 );
				}
			}
		}
	}

//---------------------------------------------------------------------------------------------------------
//	Display CLO errors
//---------------------------------------------------------------------------------------------------------
	function ShowCLOError(title,message)
	{
		var errorsHTML = '<h3>'+title+'</h3>'+message;

		$('#formerrorscloform').show().html(errorsHTML+'<br>&nbsp;');
		if (LObuttonHTML != '') {
			$('#ajax-load #finish-donation').html(LObuttonHTML);
		}
		if (OrderbuttonHTML != '') {
			$('#order-button-container').html(OrderbuttonHTML);
		}
		$('.clo-error-show').show();
		$(document).scrollTop( $("#formerrorscloform").offset().top );  
	}

	function submitLoForm( formname )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Make sure the form exists
	//---------------------------------------------------------------------------------------------------------
		formObj = document.forms[formname];

	//---------------------------------------------------------------------------------------------------------
	//	Submit the form
	//---------------------------------------------------------------------------------------------------------
		if (formObj)
		{
			var postdata = $(formObj).serialize();
			var posturl  = $(formObj).attr('action');

			if ($('#ajaxsubmit', $(formObj)).val() == 1 ) {
				$.ajax({
					type:'POST',
					 url: posturl,
					data: postdata,
					success: function(data)
					{
						$('html, body').animate({
							scrollTop: $(formObj).offset().top - 200
						}, 200, function(){
							$(formObj).animate({
								opacity: 0 
							}, 300, function(){
								$(formObj).replaceWith( data ); 
							});
						});
					}
				});
	 	    } else { 
	 	    	setTimeout( "formObj.submit();", 1 );
	 	    }
			return;
		}

	//---------------------------------------------------------------------------------------------------------
	//	All done
	//---------------------------------------------------------------------------------------------------------
		validationDone();
	}
