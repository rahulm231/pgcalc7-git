/*-------------------------------------------	
	Carnegie Mellon University
	Alumni & Giving JavaScript Document
	July 2011
	web-feedback@andrew.cmu.edu
-------------------------------------------*/

jQuery(document).ready(function(){ // when elements are ready to be manipulated

//	jQuery.fn.fadeToggle = function(speed, easing, callback) {
//   		return this.animate({opacity: 'toggle'}, speed, easing, callback);
//	};

	if (jQuery.browser.opera && jQuery("header nav ul li a")) {jQuery("header nav ul li a").css("font-size","10px");} // if header nav exists and browser is opera, fix font-size bug in Opera
	
//	jQuery("header nav ul li").hover(function() {
	//	jQuery(this).find("ul").stop(true, true).fadeIn("fast");
	//   }, function() {
	//	jQuery(this).find("ul").stop(true, true).fadeOut("fast");
	//   }); // on nav hover, animate drop down
	
	
	    	//Set the anchor link opacity to 0 and begin hover function
	//jQuery("header nav ul li").hover(function(){ 

		//Fade to an opacity of 1 at a speed of 200ms
	//	jQuery(this).children('ul').stop(true,true).animate({"opacity" : 1}, 200); 

		//On mouse-off
	//	}, function(){

		//Fade to an opacity of 0 at a speed of 100ms
	//	jQuery(this).children('ul').stop(true,true).animate({"opacity" : 0}, 100); 

	//});
	
	
	//MEGA HOVER
	jQuery(document).ready(function(){ // when elements are ready to be manipulated

	jQuery("#ContentTopNav li .sub").each(function() {
		jQuery(this).siblings().clone().prependTo(this);
	});
		
	//On Hover
	function megaHoverOver(){
		jQuery(this).find(".sub").stop().fadeTo('fast', 1).show(); //Find sub and fade it in
		(function(jQuery) {
			//Function to calculate total width of all ul's
			jQuery.fn.calcSubWidth = function() {
				var maxRowWidth = 600;
				rowWidth = 0;
				//Calculate row
				jQuery(this).find("ul").each(function() { 	//for each ul...
					rowWidth += jQuery(this).width(); 		//Add each ul's width together

				});
				if (rowWidth > maxRowWidth)
				{
					rowWidth = maxRowWidth;
				}
				
				//rowWidth = rowWidth - 150;
				  
			};
		})(jQuery); 
	
		if ( jQuery(this).find(".row").length > 0 ) { //If row exists...
	
			var biggestRow = 0;	
	
			jQuery(this).find(".row").each(function() {	//for each row...
				jQuery(this).calcSubWidth(); //Call function to calculate width of all ul's
				//Find biggest row
				if(rowWidth > biggestRow) {
					biggestRow = rowWidth;
				}
			});
	
			jQuery(this).find(".sub").css({'width' :biggestRow}); //Set width
			jQuery(this).find(".row:last").css({'margin':'0'});  //Kill last row's margin
	
		} else { //If row does not exist...
	
			jQuery(this).calcSubWidth();  //Call function to calculate width of all ul's
			jQuery(this).find(".sub").css({'width' : rowWidth}); //Set Width
			
		}
	}
	//On Hover Out
	function megaHoverOut(){
	  jQuery(this).find(".sub").stop().fadeTo('fast', 0, function() { //Fade to 0 opactiy
		  jQuery(this).hide();  //after fading, hide it
	  });
	}
	
	//Set custom configurations
	var config = {
		 sensitivity: 4, 		// number = sensitivity threshold (must be 1 or higher)
		 interval: 0,			// number = milliseconds for onMouseOver polling interval
		 over: megaHoverOver, 	// function = onMouseOver callback (REQUIRED)
		 timeout: 100, 			// number = milliseconds delay before onMouseOut
		 out: megaHoverOut 		// function = onMouseOut callback (REQUIRED)
	};
	
	jQuery("#ContentTopNav li .sub").css({'opacity':'0'}); //Fade sub nav to 0 opacity on default
	jQuery("#ContentTopNav li").hoverIntent(config); //Trigger Hover intent with custom configurations		
});

	
	
	
	
	
	//Zebra stripping tables
	jQuery('.idbmsOuterTable_User .idbmsInstanceColumnLabel').parent().parent().parent().addClass('stripe');
	jQuery('#ContentMiddle .stripe tr[id*="rg_gfid"]:nth-child(odd)').addClass('odd');
	jQuery('#ContentMiddle .stripe .idbmsInstanceColumnInput tr').removeClass('odd');
	jQuery('#ContentMiddle .idbmsOuterTable_User .EventsHeader').parent().parent().removeClass('odd');
	jQuery('#ContentMiddle .idbmsOuterTable_User .EventsHeader tr').removeClass('odd');
	
	
	// clears & refills input text boxes
	jQuery("header input[type='text']").click(function() {if(jQuery(this).value==jQuery(this).title) jQuery(this).value=""});
	jQuery("header input[type='text']").blur(function() {clearInput(jQuery(this).value, jQuery(this).title, jQuery(this))});
	jQuery("header input[type='text']").focus(function() {clearInput(jQuery(this).value, jQuery(this).title, jQuery(this))});	
	
	// stretch level page height past the left nav
	//if (jQuery("section#content nav") && jQuery("section#content nav").height() > jQuery("section#content").height()) jQuery("section#content").css("height", jQuery("section#content nav").height() + 100); 
	
	var leftNavH = jQuery("nav#ContentLeftNav").height() + 73;
	var contentH = jQuery("section#content").height();
		
	if (jQuery("nav#ContentLeftNav") && leftNavH > contentH) { 
		jQuery("section#content").css("min-height", leftNavH + 100 + "px");
	}
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) jQuery("#scroll").css({"position":"absolute", "top":"35%"}); // if iOS device, fix #scroll
	
});


function clearInput(value, title, e) { // clears and restores input fields
	var inputs = document.getElementsByTagName("input"); // make array of inputs
	for (i=0;i<inputs.length;i++) if (inputs[i].value == "" && inputs[i].type != "password") inputs[i].value = inputs[i].title; // for each input, if value is blank and type is not password, fill value with the title
	if (value == title) e.value = ""; // if value is equal to title, clear the value
}