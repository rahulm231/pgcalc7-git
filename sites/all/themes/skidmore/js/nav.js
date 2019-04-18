$(document).ready(function() {// JavaScript Document
	/* column height to start */
	if ($(window).width() > 500) {
		setColHeight();
		/* on resize */
	} else {
		$('#mainContent').prependTo('#rightCol');
		$('#subNav').appendTo('#mobilesubnav');
		$('footer').appendTo('#mobileFooter');
		$('#socialMedia').prependTo('footer');
		$('#topNav').appendTo('body');
	}
	if(!($.browser.msie && $.browser.version.slice(0,1) <= "7" )) {
		// slide out tab
		$('#ctmTabWrap').show();
		$('.slide-out-div').tabSlideOut({
			tabHandle: '.handle',                     //class of the element that will become your tab
			pathToTabImage: '/images/template/tab-ctm.gif', //path to the image for the tab //Optionally can be set using css
			imageHeight: '122px',                     //height of tab image           //Optionally can be set using css
			imageWidth: '40px',                       //width of tab image            //Optionally can be set using css
			tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
			speed: 300,                               //speed of animation
			action: 'click',                          //options: 'click' or 'hover', action to trigger animation
			topPos: '0px',                          //position from the top/ use if tabLocation is left or right
			leftPos: '0px',                          //position from left/ use if tabLocation is bottom or top
			fixedPosition: false                      //options: true makes it stick(fixed position) on scroll
		});
	}
	/* student quick links */
	$("#studentQLClick").click(function(){
		$("#academicQL").hide();
        $('#academicQLClick').removeClass('clickQLOn').addClass('clickQLOff');
		$("#studentQL").toggle();
		changeArrow(this);
		return false;
	});
	/* student quick links */
	$("#academicQLClick").click(function(){
		$("#studentQL").hide();
        $('#studentQLClick').removeClass('clickQLOn').addClass('clickQLOff');
		$("#academicQL").toggle();
		changeArrow(this);
		return false;
	});
	/* popupLink class to make a popup window */
	$(".popupLink").click(function(){
		var NWin = window.open($(this).prop('href'), '', 'height=500,width=600');
		if (window.focus){
			NWin.focus();
		}
		return false;
	});
	/* open CTM tab */
	$("#ctmTab").click(function(){
		$("#ctmContent").animate({width: 'toggle'}, "slow");
		return false;
	});
	/* START font resize */
	// Reset Font Size
	var originalFontSize = $('#rightCol').css('font-size');
		$(".resetFont").click(function(){
		$('#rightCol, .ad-gallery').css('font-size', originalFontSize);
	});
	// Increase Font Size
	$(".increaseFont").click(function(){
		var currentFontSize = $('#rightCol').css('font-size');
		var currentFontSizeNum = parseFloat(currentFontSize, 10);
		var newFontSize = currentFontSizeNum*1.1;
		$('#rightCol, .ad-gallery').css('font-size', newFontSize);
		setColHeight()
		return false;
	});
	// Decrease Font Size
	$(".decreaseFont").click(function(){
		var currentFontSize = $('#rightCol').css('font-size');
		var currentFontSizeNum = parseFloat(currentFontSize, 10);
		var newFontSize = currentFontSizeNum*0.8;
		$('#rightCol, .ad-gallery').css('font-size', newFontSize);
		setColHeight()
		return false;
	});
	/* END font resize */
	/* START: language options */
	if ($.parseQuerystring().lang == null) $("#langopts").val('en');
	else $("#langopts").val($.parseQuerystring().lang);
	$("#langopts").change(switchLangs);
	switchLangs();
	/* End: language options */
});

/* column resize - not the best solution, but works for now */
function setColHeight(){
	// check document and two content columns for full height. 
	var pageH = $(document).height();
	$("#navCol").height(pageH);
};
/* remove click on class for the QL image */
function changeArrow(imgChange){
	if ($(imgChange).hasClass('clickQLOn')) {
		$(imgChange).removeClass('clickQLOn').addClass('clickQLOff');
	} else if ($(imgChange).hasClass('clickQLOff')) {
		$(imgChange).removeClass('clickQLOff').addClass('clickQLOn');
	} else {
		$(imgChange).addClass('clickQLOn');
	}
};
/* changes languages on pages with the select box */
function switchLangs(){
	var lang = $("#langopts").val();
	switch (lang)
	{
	case "en": 
		$("#en").show();
		$("#sp").hide();
		$("#ma").hide();
	break;
	case "sp": 
		$("#en").hide();
		$("#sp").show();
		$("#ma").hide();
		$("#new-nav").css('margin-right','-23px')
	break;
	case "ma": 
		$("#en").hide();
		$("#sp").hide();
		$("#ma").show();
	break;
	default : 
		$("#en").show();
		$("#sp").hide();
		$("#ma").hide();
	}
};

jQuery(function($){
	// ====================================================================================================
	// OU Form Replacement 
	// ====================================================================================================
	var this_string = "";
	$("#form .phpConvert").each(function() {
		this_string = $(this).html();
		this_string = this_string.replace(/&lt;/g, "<");
		this_string = this_string.replace(/&gt;/g, ">");
		$(this).html(this_string);
	});
	
	// ====================================================================================================
	// OU Forms - Replace Microsoft Word curly apostrophes, curly quotes, dash and ellipsis (...)
	// ====================================================================================================
	$("form input").blur(function() {
		replaceSpecialWordCharacters($(this));
	});
	
	$("form textarea").blur(function() {
		replaceSpecialWordCharacters($(this));
	});
	
	function replaceSpecialWordCharacters(form_input) {
		var input_value = form_input.val();
		input_value = input_value.replace(/[\u2018|\u2019|\u201A]/g, "'");
		input_value = input_value.replace(/[\u201C|\u201D|\u201E]/g, '"');
		input_value = input_value.replace(/\u2026/g, "...");
		input_value = input_value.replace(/[\u2013|\u2014]/g, "-");
		form_input.val(input_value);	
	}
	
	
	
	
	// ====================================================================================================
	// Snippets - Used with OU Campus 
	// ====================================================================================================
	/*
	// ===== Read More =====
	$(".snippetReadMoreLink a").click(function() {
		$(".snippetReadMoreTxt").animate({ height: 'toggle' });
		
		var linkWording = $(".snippetReadMoreLink a").html();
		if(linkWording == "More") {
			$(".snippetReadMoreLink a").html("Less");
			$(".snippetReadMoreLink a").css("background-image", "url(/_resources/icons/icon-arrow-down-darkgrey.png)");
		} else {
			$(".snippetReadMoreLink a").html("More");
			$(".snippetReadMoreLink a").css("background-image", "url(/_resources/icons/icon-arrow-right-darkgrey.png)");
		}
		
		return false;
	})
	*/
	
	
	
	// ====================================================================================================
	// Document Resize
	// ====================================================================================================
	$( window ).resize(function() {
		
		
		// Left Column Height
		//console.log($(document).height());
		//if ($(window).width() > 500) {
		//	var pageH = $(document).height();
		//	$("#navCol").height(pageH);
		//}
	});
		
});
 

$(window).load(function() {
	// ====================================================================================================
	// 501 Challenge
	// ====================================================================================================
	//$(".challenge501").animate({width: ["toggle","swing"]},1000,"linear");
	//$("#challenge501close").click(function() { $(".challenge501").animate({width: ["toggle","swing"]},1000,"linear"); }) 
	
	// ====================================================================================================
	// Left Column Height 100% - this is actually a function earlier
	// but is sometimes called befor the page load finishes
	// ====================================================================================================
	if ($(window).width() > 500) {
		var pageH = $(document).height();
		$("#navCol").height(pageH);
	}
})
