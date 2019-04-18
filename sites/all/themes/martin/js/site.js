//---------------------------------------------------------------------------------------------------------
//	Variables
//---------------------------------------------------------------------------------------------------------
	var widest            = 1600;
	var wide              = 1200;
	var desktop           = 1024;
	var tablet            = 768;
	var mobile            = 480;
	var pageWidth         = 0;
	var validationRunning = false;

//=======================================================================================================
//	Custom Javascript functions
//=======================================================================================================
//---------------------------------------------------------------------------------------------------------
//	Do this on resize
//---------------------------------------------------------------------------------------------------------
function resizeFunctions() {
	pageWidth = $(window).width();

	if (pageWidth < desktop) {
		var topicFilter = $('#sidebars #magazine-topic-filter').detach();
		topicFilter.prependTo('.magazine.list');
	}else{
		var topicFilter = $('.magazine.list #magazine-topic-filter').detach();
		topicFilter.prependTo('#sidebars');
	}

	//	Fix the position of the banner text.
	if (pageWidth > desktop) {
		var rightPos = $('#right').outerWidth();
		$('#banner-text').css('right',rightPos+'px');
	};

	//	IE8 just can't.
	if (ie == 'old') {
		$("#magazine-image").css( { backgroundSize: "cover" } );
		return;
	};

	if (pageWidth > widest) {
		$('#push-right').css('width','405px');
		$('#wrapper').css('margin-left','0px');
	} else {
		var active = $('#searchHasResultsch-button').attr('data-active');
		if (active != 'true') {
			$('#push-right').css('width','0');
		} else {
			$('#push-right').css('width','540px');
			$('#wrapper').css('margin-left','-503px');
		}
	}

	if (pageWidth < desktop) {
		var exists = $('#sectionnav-toggle').length;
		if (exists == 0) {
			var activeSubnav = $('#sectionnav .a1.active');
			if (activeSubnav.length > 0) {
				activeSubnav.closest('li').prepend('<div id="sectionnav-toggle">Sidebar Menu</div>');
			}else{
				$('.i1.first').prepend('<div id="sectionnav-toggle">Sidebar Menu</div>');
			}
		};
	}
	else
	{
		$('#sectionnav-toggle').remove();
	}
}

//---------------------------------------------------------------------------------------------------------
//	wait for it...
//---------------------------------------------------------------------------------------------------------
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

//=======================================================================================================
//	Jquery ready
//=======================================================================================================
$(document).ready(function() {
	var added = 0;

	$('body').on('click','#magazine-topic-filter h2',function(event) {
		$(this).next('form').slideToggle();
	});

	$('#down-link').click(function(event){
		event.preventDefault();
		$('html, body').animate({
        	scrollTop: $("#home-magazine").offset().top
    	}, 2000);
	});

	$('#eventdate').Zebra_DatePicker({
			format: 'n/j/Y',
			 direction: true,
		});

	$('.lazy-ajax').lazyload({
		threshold: 200,
		load: function(element){
			objToString(element);
			var src = element.attr('data-src');
//			alert(src);
		},
	});

	$('#findmore').click(function(event){
		$('#nextaction').val(1);
	});

	// Filter by find text
	$( '#phone-search .findtext' ).live( "keyup", function(event){
		findtext = $("#phone-search .findtext").val();
		if (findtext=='') {
			$("#scroller .phone-listing").show();
			$("#category-list").show();
		}else{
		    $("#category-list").hide();
		    $("#scroller .phone-listing").hide();
			$("#scroller .phone-listing:containsIN('"+ findtext +"')").show();
		}
	});

	// Filter by find text
	$( '#perk-search .findtext' ).live( "keyup", function(event){
		findtext = $("#perk-search .findtext").val();
		if (findtext=='') {
		    $('.perk-category').show();
			$(".category-list").show();
		    $("#scroller .perks-listing").show();
		}else{
		    $("#scroller .category-list").hide();
			$("#scroller .category-list:containsIN('"+ findtext +"')").show();
		    $("#scroller .perk-category").hide();
			$("#scroller .perk-category:containsIN('"+ findtext +"')").show();
		    $("#scroller .perks-listing").hide();
			$("#scroller .perks-listing:containsIN('"+ findtext +"')").show();
		}
	});

	//	Filter by category
	$( '#perk-category-select' ).live( "change", function(event){
		var id = $("#perk-category-select").val();
		if (!id) {
		    $("#scroller .category-list").show();
			$('.perk-category').show();
		}else{
		    $("#scroller .category-list").hide();
		    $('.perk-category').hide();
			$('#perk-category-'+id).show().closest('.category-list').show();
		}
	});


	$('nav#letters a').click(function(event){
		event.preventDefault();
		var selection = $(this).attr('href');
		var position = $(selection).position();
		$('#scroller').animate({top:0-position.top},500);
	});

	$('.overlay-trigger').magnificPopup({ type:'inline' });

	$('.iframe-overlay-trigger').magnificPopup({ type:'iframe' });

	$('.popup-trigger').click(function(event){
		event.preventDefault();
		var url = $(this).attr('href');
		window.open(url,'popup',"width=500,height=500");
	});

	$('.flexslider').flexslider({
		animation: "slide"
	});

	$('.select-link').change(function(event){
		var url = $(this).val();
		if (url != '') {
			window.location = url;
		};
	});

	$('.tool-tip').tooltipster({ theme: 'mmg-tooltip',offsetY:10,contentAsHTML:true });

	$('body').on('click','.additional .remove',function(event) {
		event.preventDefault();
		$(this).closest('.additional').slideUp().find('.order').val(0);
		--added;
		if (added < attendee_limit) {
			$('#add-attendee').show();
		};
	});

	$('#add-attendee').click(function(event){
		++added;
		if (added <= attendee_limit) {
			$('.additional:hidden').first().slideDown().find('.order').val(1);
		};
		if (added >= attendee_limit) {
			$('#add-attendee').hide();
		};
	});

//	pageWidth = $(window).width();

	//	External Links
	$('body').on('click','a[href^="http://"]',function(){
		$(this).attr("target", "_blank");
	});

	$('body').on('click','a[href^="https://"]',function(){
		$(this).attr("target", "_blank");
	});

	//	Clear a dynamic filter
	$('body').on('click','.clear-filter',function(event){
		event.preventDefault();
		var formID    = $(this).attr('data-filter');
		var URL       = $('#'+formID).attr('action');
		var filterURL = $('#'+formID).attr('data-filter');
		$('#results').load(URL,function(){
			$('.tool-tip').tooltipster({ theme: 'mmg-tooltip',offsetY:10,contentAsHTML:true });
		});
		$('#filter').load(filterURL,function(){
			$('#filter select').selectric({expandToItemText:true});
		});
	});

	//	Toggle a div
	$('body').on('click','.toggle-trigger',function(event){
		event.preventDefault();

		var active = $(this).hasClass('active');

		if (active == true) {
			$(this).next('.toggle').animate({
			    "height": "hide",
			    "marginTop": "hide",
			    "marginBottom": "hide",
			    "paddingTop": "hide",
			    "paddingBottom": "hide",
			    "opacity":0
			});
			$(this).removeClass('active');
		}else{
			$(this).next('.toggle').animate({
			    "height": "show",
			    "marginTop": "show",
			    "marginBottom": "show",
			    "paddingTop": "show",
			    "paddingBottom": "show",
			    "opacity":1
			});
			$(this).addClass('active');
		}
	});


	//	Mobile only toggle trigger
	$('.mobile-toggle-trigger').click(function(event){
		event.preventDefault();
		if (pageWidth <= mobile)
		{
			var active = $(this).hasClass('active');

			if (active == true) {
				$(this).next('.mobile-toggle').animate({
				    "height": "hide",
				    "marginTop": "hide",
				    "marginBottom": "hide",
				    "paddingTop": "hide",
				    "paddingBottom": "hide",
				    "opacity":0
				});
				$(this).removeClass('active');
			}else{
				$(this).next('.mobile-toggle').animate({
				    "height": "show",
				    "marginTop": "show",
				    "marginBottom": "show",
				    "paddingTop": "show",
				    "paddingBottom": "show",
				    "opacity":1
				});
				$(this).addClass('active');
			}
		}
	});

	//	Autosubmit a form on change
	$('body').on('change','.autosubmit select, .autosubmit input',function(event){
		$(this).closest('form').submit();
	});

	//	Submit a form via ajax
	$('body').on('submit','.ajaxsubmit',function(event){
		 $.ajax({
            url     : $(this).attr('action'),
            type    : $(this).attr('method'),
            data    : $(this).serialize(),
            success : function( data ) {
                        $('#results').html(data);
						$('.tool-tip').tooltipster({ theme: 'mmg-tooltip',offsetY:10,contentAsHTML:true });
                      },
            error   : function( xhr, err ) {
                        alert('Error');
                      }
        });
        return false;
	});
	//	Update a form on text input keup
	$('body').on('keyup','input.liveupdate',function(event){
		var object = $(this);
		delay(function(){
			var value = object.val();
			if (value.length >= 3 || value.length == 0) {
				object.closest('form').submit();
			};
		}, 100 );
	});

	//	Update a dynamic search filter
	$('form.filterupdate').submit(function(event){
		var data = $(this).serialize();
		var url  = $(this).attr('data-filter');
		$('#filter').load(url,data,function(){
			$('#filter select').selectric({expandToItemText:true});
		});
	});
	//	Custom Select skinning
	$('select').selectric({expandToItemText:true});

	//	Toggle label
	$('input[data-toggle]').change(function(event){
		var checked = $(this).is(':checked');
		var target = $(this).attr('data-toggle');
		if (checked) {
			$('#'+target).slideDown();
		}else{
			$('#'+target).slideUp();
		}
	});

	//	Custom form handling
	$('.ajaxvalidate form').submit(function(event){
		event.preventDefault();
		var form_name = $(this).attr('name');
		martin_makeValidationCall( form_name );
	});

	//	Handle some sizing issues on load and on window resize.
	resizeFunctions();

	$( window ).resize(function() {
	    waitForFinalEvent(function(){
			resizeFunctions();
	    }, 500, 'resizeme');

	});

	//---------------------------------------------------------------------------------------------------------
	//	Close Push
	//---------------------------------------------------------------------------------------------------------
	var pushing = false;
	$('html').on('click','.pushed #wrapper',function(event) {
		if (ie == 'old') { return; }
		if (pageWidth > widest) { return };
		if (pushing == true) { return };

		pushing = true;

		$('body').removeClass('pushed');

		setTimeout(function(){
			$('#wrapper').animate({
				marginLeft: "0px",
				marginRight: "0px",
			}, 500,function(){
				pushing = false;
			});
			$('#push-right').animate({
				width: '0px',
			}, 500);
			$('#push-left').animate({
				width: '0px',
			}, 500);

			$('#search-button').attr('data-active','false');
			$('#mainnav a').attr('data-active','false');
			$('#mainnav').attr('data-active','false');
		}, 100);

	});

	//---------------------------------------------------------------------------------------------------------
	//	Search push right
	//---------------------------------------------------------------------------------------------------------
	$('#push-right .pushclose').click(function(event){
		event.preventDefault();
		$("#search-button").click();
	});

	$('#push-left .pushclose').click(function(event){
		event.preventDefault();
		$("#nav-toggle").click();
	});



	$( "#search-button" ).click(function(event) {
		if (ie == 'old') {
			return true;
		}
		event.preventDefault();
		var active = $(this).attr('data-active');

		if (pageWidth > widest) {return};

		if (active!='true') {
			pushing = true;
			$('body').addClass('pushed');
			$('#wrapper').animate({
				marginLeft: "-503px",
			}, 500,function(){
				pushing = false;
			});
			$('#push-right').animate({
				width: '540px',
			}, 500);
			$('#push-left').animate({
				width: '0px',
			}, 500);
			$(this).attr('data-active','true');
		}
		else
		{
			$('body').removeClass('pushed');
			$('#wrapper').animate({
				marginLeft: "0px",
			}, 500);
			$('#push-right').animate({
				width: '0px',
			}, 500);
			$(this).attr('data-active','false');
		}
	});

	//---------------------------------------------------------------------------------------------------------
	//	Mobile Nav Push Left
	//---------------------------------------------------------------------------------------------------------
		$('#nav-toggle').click(function(event) {
			event.preventDefault();
			var active = $(this).attr('data-active');
			var pageWidth = $(window).width();
			var pushwidth = '440px';

			if(active!='true')
			{
				pushing = true;
				$(this).attr('data-active','true');
				$('body').addClass('pushed');
				$('#wrapper').animate({
					marginLeft: pushwidth,
				}, 500,function(){
					pushing = false;
				});
				$('#push-left').animate({
					width: pushwidth,
				}, 500);
				$('#mobile-nav').show();
			}
			else
			{
				$('body').removeClass('pushed');
				$('#wrapper').animate({
					marginLeft: "0px",
				}, 500);
				$('#push-left').animate({
					width: '0px',
				}, 500);
				$(this).attr('data-active','false');
				$('#mobile-nav').hide();

			}

		});

	//---------------------------------------------------------------------------------------------------------
	//	Main Nav Push Left
	//---------------------------------------------------------------------------------------------------------
		$('#mainnav a').click(function(event){
		var navactive = $('#mainnav').attr('data-active');
		var active = $(this).attr('data-active');
		pushing = true;

		if(active!='true')
		{
			var subnav = $(this).closest('li').find('ul');
			if (subnav.length > 0) {
				event.preventDefault();
				$('#mainnav li.i0').removeClass('nav-active');
				$(this).closest('li').addClass('nav-active');
				$('#mainnav a').attr('data-active','false');
				$(this).attr('data-active','true');
				setTimeout(function(){pushing=false}, 500);
			};
		}
		else
		{
			event.preventDefault();
			$('body').removeClass('pushed');
			$('#wrapper').animate({
				marginLeft: "0px",
			}, 500,function(){
				pushing = false;
			});
			$('#push-left').animate({
				width: '0px',
			}, 500);
			$(this).attr('data-active','false');
			$('#mainnav').attr('data-active','false');
		}

		if (navactive!='true') {
			var subnav = $(this).closest('li').find('ul');
			if (subnav.length > 0) {
				$('body').addClass('pushed');
				$('#wrapper').animate({
					marginLeft: "440px",
				}, 500,function(){
					pushing = false;
				});
				$('#push-left').animate({
					width: '440px',
				}, 500);
				if (pageWidth <= widest) {
					$('#push-right').animate({
						width: '0px',
					}, 500);
				};
				$('#mainnav').attr('data-active','true');
			}
		}
	});

	//---------------------------------------------------------------------------------------------------------
	//	Phone size sectionnav toggle
	//---------------------------------------------------------------------------------------------------------
	$('#left').on('click','#sectionnav-toggle',function(event){

		var active         = $(this).attr('data-active');
		var inactiveWidth  = '65px';
		var buttonPosition = '35px';

		if(pageWidth < mobile)
		{
			inactiveWidth  = '35px';
			buttonPosition = '62px';
		}

		if (active!='true') {
			$('body').addClass('pushed');
			$('#sectionnav a').css('left','0px');
			$('#main').css('margin-left','290px');
			$('#main').css('margin-right','-290px');
			$('#left').css('width','290px');
			$(this).css('right','0px').attr('data-active','true');
		} else {
			$('body').removeClass('pushed');
			$('#sectionnav a').css('left','-1000px');
			$('#main').css('margin-left',inactiveWidth);
			$('#main').css('margin-right',0);
			$('#left').css('width',inactiveWidth);
			$(this).css('right',buttonPosition).attr('data-active','false');
		}
	});
});

//---------------------------------------------------------------------------------------------------------
//	Delay for keyup events.
//---------------------------------------------------------------------------------------------------------
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();

//---------------------------------------------------------------------------------------------------------
//	Custom Form Handling
//---------------------------------------------------------------------------------------------------------
//*********************************************************************************************************
//	Function: makeValidationCall()
//				Compile the fields, submit them to the validator
//*********************************************************************************************************
	function martin_makeValidationCall( form_name )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Do not resubmit if a validation is pending
	//---------------------------------------------------------------------------------------------------------
		if (validationRunning)
		{
			return;
		}

		validationRunning = true;

	//---------------------------------------------------------------------------------------------------------
	//	Reset the display of previous error reports
	//---------------------------------------------------------------------------------------------------------
		clearFieldErrors( form_name );

	//---------------------------------------------------------------------------------------------------------
	//	Make sure the form exists
	//---------------------------------------------------------------------------------------------------------
		formObj = document.forms[form_name];

		if (!formObj)
		{
			validationDone();
		}

	//---------------------------------------------------------------------------------------------------------
	//	Get the form parameters as a string
	//---------------------------------------------------------------------------------------------------------
		postParms = compileAllFieldValues( formObj );

		if (!postParms)
		{
			validationDone();
		}

	//---------------------------------------------------------------------------------------------------------
	//	Submit the validation request via an ajax call
	//---------------------------------------------------------------------------------------------------------
		postURL = '/formsmgr/validate.php';

		var xmlhttp =  initHTTPObject();
		xmlhttp.open('POST', postURL, true );
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//	xmlhttp.setRequestHeader("Content-length", postParms.length);
	//	xmlhttp.setRequestHeader("Connection", "close");

		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 )
			{
				martin_processValidationResponse( form_name, xmlhttp.responseText )
			}
		};

		xmlhttp.send(postParms);
	}

//*********************************************************************************************************
//
//	Function: processValidationResponse()
//				Response handler for makeValidationCall()
//*********************************************************************************************************
	function martin_processValidationResponse( form_name, response )
	{
		validationRunning = false;

	//---------------------------------------------------------------------------------------------------------
	//	Init
	//---------------------------------------------------------------------------------------------------------
		found_errors = new Array();
		form_name	 = form_name.toString();

	//---------------------------------------------------------------------------------------------------------
	//	Was a response returned from the validator?
	//---------------------------------------------------------------------------------------------------------
		if (!response)
		{
			//	No, submit the form
			martin_submitForm(form_name);
			return;
		}

	//---------------------------------------------------------------------------------------------------------
	//	Turn the response into a js array
	//---------------------------------------------------------------------------------------------------------
		eval( response );

	//---------------------------------------------------------------------------------------------------------
	//	Were errors returned?
	//---------------------------------------------------------------------------------------------------------
		if (!found_errors[0])
		{
			//	No, submit the form
			martin_submitForm(form_name);
			return;
		}

	//---------------------------------------------------------------------------------------------------------
	//	Loop through the errors
	//---------------------------------------------------------------------------------------------------------
		for (i=0; i<=(found_errors.length-1); i++)
		{
			errornumber  = i+1;
			errormessage = found_errors[i][0];
			fieldname	 = found_errors[i][1];
			fieldid		 = found_errors[i][2];
			showError( form_name, errornumber, errormessage, fieldname, fieldid );
		}

	//---------------------------------------------------------------------------------------------------------
	//	Focus on the top of the form
	//---------------------------------------------------------------------------------------------------------
		window.location = '#fieldblock-' + found_errors[0][2];	//	anchor to first error

	//---------------------------------------------------------------------------------------------------------
	//	All done
	//---------------------------------------------------------------------------------------------------------
		validationDone();
	}


//*********************************************************************************************************
//
//	Function: submitForm()
//
//*********************************************************************************************************
	function martin_submitForm( formname )
	{
	//---------------------------------------------------------------------------------------------------------
	//	Make sure the form exists
	//---------------------------------------------------------------------------------------------------------
		var form   = $('#'+formname);

		//	Dancing baloney
		var button      = form.find('.progress-button');
		button.html('').css('height','11px');
		var progressDiv = $('<div class="progress" style="width:1px;float:left"></div>').appendTo(button);
		progressDiv.animate({ width: '100%' }, 1500);

		var data        = form.serialize();
		var action      = form.attr('action');
		$.post( action,data, function( data ) {
			$( '#'+formname+'-container' ).html( data );
		});
	//---------------------------------------------------------------------------------------------------------
	//	All done
	//---------------------------------------------------------------------------------------------------------
		validationDone();

	}


//---------------------------------------------------------------------------------------------------------
//	Responsive Table Functions
//---------------------------------------------------------------------------------------------------------
	function splitTable(original) {
		original.wrap("<div class='table-wrapper' />");

		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("scroll-table");

		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
		original.after('<a href="#" class="scroll-left">&laquo;</a>');
		original.after('<a href="#" class="scroll-right">&raquo;</a>');

		setCellHeights(original, copy);
	}

	function unsplitTable(original) {
	    original.closest(".table-wrapper").find(".pinned").remove();
	    original.closest(".table-wrapper").find(".scroll-left").remove();
	    original.closest(".table-wrapper").find(".scroll-right").remove();
	    original.unwrap();
	    original.unwrap();
	}

	function setCellHeights(original, copy) {
		var tr = original.find('tr'),
		    tr_copy = copy.find('tr'),
		    heights = [];

		tr.each(function (index) {
		  var self = $(this),
		      tx = self.find('th, td');

		  tx.each(function () {
		    var height = $(this).outerHeight(true);
		    heights[index] = heights[index] || 0;
		    if (height > heights[index]) heights[index] = height;
		  });

	});

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

$(document).ready(function() {
	$('body').on('click','.scrollable .scroll-right',function(event){
		event.preventDefault();
		scroller = $(this).closest('.scrollable');
		var leftpos = scroller.scrollLeft()+200;
		scroller.find('.scroll-left').fadeIn('slow');
		scroller.animate({ scrollLeft:leftpos });
		if ((leftpos + scroller.width()) >= scroller.find('table').outerWidth() ) {
			scroller.find('.scroll-right').fadeOut('slow');
		};
	});

	$('body').on('click','.scrollable .scroll-left',function(event){
		event.preventDefault();
		scroller = $(this).closest('.scrollable');
		var leftpos = scroller.scrollLeft()-200;
		scroller.animate({ scrollLeft:leftpos });
		if (leftpos <= 0) {
			scroller.find('.scroll-left').fadeOut('slow');
		};
		scroller.find('.scroll-right').fadeIn('slow');
	});

    $('.scroll-table').each(function() {
    	var width = parseInt($(this).attr('data-width'));
    	if(!width)
    	{
    		width = $(this)[0].scrollWidth;
    	}

    	var containerWidth = $(this).closest('.inner').outerWidth();

    	if (width>containerWidth) {
    		$(this).attr('data-switched',true).attr('data-width',width);
    		splitTable($(this));
    	}else{
    		if( $(this).attr('data-switched') )
    		{
	    		$(this).attr('data-switched',false);
    			unsplitTable($(this));
    		}
    	}
    })
});
