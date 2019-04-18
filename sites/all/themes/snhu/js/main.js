/*CHANGELOG
MM/DD/YYYY - DEV NAME - CHANGE MADE
09/09/2015 - Reggie Brown - commented out the section that was removing nbsp. This was also removing validation messages
if there are specific design issues, I can update this to target those.
11/05/2015 - Reggie Brown - Added function for adding class to table rows in login table for mentor and mentee checkboxes
*/


$(document).ready(function() {

	$('.flexslider').flexslider({
		animation: "slide",
		prevText: "",
		nextText: "",
		useCSS: false
	});

	// remove empty slider
	$('.flexslider:empty').remove();

	// bbnc doesn't use svg :( so here's the retina logic with js
	if (window.devicePixelRatio > 1) {
		$('#logo > img').attr('src', function() {
			return $(this).attr('src').replace('.png', '-2x.png');
		});
	}

	$('.GivingSearchFormTable').wrap('<div class="block"></div>');



	// put sidebar social icons into the contact block
	$('.sidebar .widget.contactUs + .social-wrap').insertAfter('.sidebar .widget.contactUs .inner .info');

	// initialize fitvids jquery plugin
	$(".container").fitVids();

	// utlity menu home icon
	$('#header ul.utility li.homepage > a').html('<i class="fa fa-home"></i>');

	// fix margin-left that bbnc adds to this table for no reason
	$('table[style*="margin-left: -3px"]').css('margin-left','0');
	// fix bbnc inline css style for table cell
	$('td[style="width: 25px;"]').css('width','auto');

	// remove non-breaking spaces from bbnc table output that causes breaks and space       
	/*$("td").each(function() {
        var $this = $(this);
        $this.html($this.html().replace(/&nbsp;/g, ''));
        Commented out because this was affecting legitimate fields, such as validation items.
        Can replace with more targeted code. Example page that I fixed this for was:
        https://alumni.snhu.edu/support There was no html populated in to the form validation 
        area with this code in place. I suspect that BBNC was momentarily placing an nbsp and 
        replacing it with the actual validation message. 
    });*/

	// adding classes to body in BBNC from url path
	var pathArrayclass = window.location.pathname.split( '/' );
	var newclasses = "";
	for (i = 0; i < pathArrayclass.length; i++) {
		newclasses += pathArrayclass[i];
		newclasses += " ";
	}
	$('body').addClass(newclasses);


	// make events active menu item on event item pages
	$('body.events .main-menu > li.events').addClass('selected').find('> a').addClass('selected');

	// hide sidebar menu if there aren't any active menu items   
	if (!$('.sidebar .main-menu > li.selected').length > 0) { 
		$('.sidebar .main-menu').hide();
	}

	// mobile menu logic
	$('#mmenu').hide();
	$('#mm-trigger').click(function() {
		$('#mmenu').slideToggle();
		$('#mmenu').toggleClass('open');
		$(this).toggleClass('open');
		$(this).find('i.fa').toggleClass('fa-bars fa-times');
	});

	// styling of BBNC quicksearch form
	$('.header .QuickSearchFormTable input.BBFormSubmitButton').wrap('<div class="search-btn"></div>');
	$('.search-btn').append('<i class="fa fa-search"></i>');

	// Accordion  
	// starting state, all closed except first-child
	$('ul.accordion li:first-child').addClass('first open');
	$('ul.accordion li:first-child h3').addClass('open');
	$('ul.accordion > li:not(.first)').each(function(){
		$(this).find('.body').hide();
	});
	$('ul.accordion > li > h3').click(function(){
		// close all others tabs
		var siblingLIs = $(this).closest('li').siblings('li');
		$(siblingLIs).removeClass('open');
		$(siblingLIs).find('h3').removeClass('open');
		$(siblingLIs).find('.body').slideUp();
		// expand clicked tab
		$(this).next('.body').slideToggle();
		$(this).toggleClass('open');
		$(this).parent('li').toggleClass('open');
	});

	// breadcrumb
	var pathArray = window.location.pathname.split('/');
	var parts = [{ "text": 'Home', "link": '/' }];
	for( var i = 1; i < pathArray.length; i++ ) {
		var part = pathArray[i];
		var text = part;
		var link = pathArray.slice( 0, i + 1 ).join('/');
		parts.push({ "text": text, "link": link });
	}
	var markup = '';
	$.each(parts, function(index, value) {
		markup += '<a alt="' + value.text + '" href="' + value.link + '">' + value.text.replace(/-/g, ' ') + '</a>';
		if(index <= parts.length - 2) markup += ' > '; 
	});
	$('#breadcrumb').not(':has(a)').append(markup);

	// adds placeholder attr to mobile slideMenu contact form
	$('.placehold').each(function(){
		var placeh = $(this).find('label').text();
		$(this).find('.BBFormDisplayTextbox, .BBFormDisplayEmail').attr('placeholder', placeh);
	});

	// checks placholder support and adds html class, also this adds javascript for cross-browser no-placholder support
	// if(!Modernizr.input.placeholder){

		// $('html').addClass('no-placeholder');

		// $('[placeholder]').focus(function() {
			// var input = $(this);
			// if (input.val() == input.attr('placeholder')) {
				// input.val('');
				// input.removeClass('placeholder');
			// }
		// }).blur(function() {
			// var input = $(this);
			// if (input.val() == '' || input.val() == input.attr('placeholder')) {
				// input.addClass('placeholder');
				// input.val(input.attr('placeholder'));
			// }
		// }).blur();
		// $('[placeholder]').parents('form').submit(function() {
			// $(this).find('[placeholder]').each(function() {
				// var input = $(this);
				// if (input.val() == input.attr('placeholder')) {
					// input.val('');
				// }
			// });
		// });
	// } else {

		// $('html').addClass('placeholder');

	// }

});

// this is how you can do stuff on BB form reload
/*
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function () {
	if ( $('[id$="trSignInBody"]').length ) {
		loginForm();
	}
	if ( $('.ProfileFieldControlCell').length ) {
		profileFieldFix();
	}
});
*/

function loginForm() {
	$('.BBFormChecklist').find('input').each(function(){
		if ( $(this).prop('value') == 'Mentor' || $(this).prop('value') == 'Mentee' ) {
			$(this).parents('tr').first().addClass('oneLine');
		}
	});
}
function profileFieldFix() {
	$('.ProfileFieldControlCell').removeAttr('colspan');
}