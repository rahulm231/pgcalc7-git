// 6-17-2014: This js loads snippets of html includes, such as a broadcast message, the topnavs, the footer, and scripts that go at the bottom of the html page before the </body>.
// 7-28-2014: Chain ajax calls together using $.when, then call functions, like this answer: http://stackoverflow.com/a/9865124 

var s_a = [
	{name: 'gSection', value: gSection},
	{name: 'gSectionPrefix', value: gSectionPrefix},
	{name: 'gSectionSubNavNode', value: gSectionSubNavNode},
	{name: 'gSectionName', value: gSectionName}
];
//console.table(s_a);

// Set up an array of scripts to be added in the footer.
// This can be added to before the getty_chrome_includes() function is run:
// getty_footer_script_array.push("/path/to/file.js");
var getty_footer_script_array = [
	"/sites/all/themes/getty/js/foundation.js", 
	//"/global/r/js/foundation/foundation.alerts.js", // used with alert boxes. Not sure we actually use this.
	//"/global/r/js/foundation/foundation.abide.js", // used with forms to validate
	//"/global/r/js/foundation/foundation.forms.js", // only use on pages with forms
	"/sites/all/themes/getty/js/foundation.interchange.js", // used globally with images. Must keep.
	// "/global/r/js/foundation/foundation.section.js", // used for toggle-able section boxes, like search filters
	// "/global/r/js/foundation/foundation.tooltips.js", // used anywhere we add tooltips
	"/sites/all/themes/getty/js/foundation.topbar.js", // used to make the top bar work
	//"/global/r/js/vendor/jquery.mousewheel.js", // not sure what this is used for now.
];


// Set up an array to load scripts into the head. 
// Make sure to add other scripts that may be needed in the page, e.g:
// getty_header_script_array.push("/global/r/js/vendor/jquery.fittext.js","/global/r/js/vendor/jquery.mCustomScrollbar.concat.min.js");
var getty_header_script_array = [
	"/sites/all/themes/getty/js/custom.modernizr.js",
	"/sites/all/themes/getty/js/onmediaquery.min.js",
	"/sites/all/themes/getty/js/jquery.fancybox.pack.js",
	"/sites/all/themes/getty/js/getty.functions.js"
];

// This is triggered near the bottom of the page.
function getty_chrome_includes() {
	// pull broadcast function out so it doesn't stop the when/done below
	//ajax_site_alert();
	
	//chain together a bunch of ajax calls, then fire final completed functions
	$.when(
		//ajax_header_scripts(),
		ajax_populate_nav(),
		ajax_off_canvas_extras(), 
		ajax_global_nav(), 
		ajax_utilities(),
		ajax_footer(),
		ajax_footer_scripts()
	).fail(function(f1,f2,f3,f4,f5,f6) {
		//console.log("fail",f1,f2,f3,f4,f5,f6);
	}).done(function() {
		//console.log("done");
		// reinitialize foundation
		$(document).foundation();
		
		$(document).foundation('interchange', {
			named_queries : {
				sm	:	'only screen',
				med	:	'only screen and (min-width: 481px)',
				midmed:	'only screen and (min-width: 569px)',
				lrg	:	'only screen and (min-width: 769px)',
				print:  'print'
			}
		});
		
		// Add active class to the level2 container As, and the mobile panel nav As
		$('#level2-nav-container a, #mobile-panel-wrap a').each(function() {
			add_active_class($(this));
		});
		$('#mobile-panel-nav-sections > li:first-child a').removeClass('active');
		
		// reinitialize the off-canvas
		// need a function to set active states for off-canvas, including active search. Do this in off_canvas_init()
		off_canvas_init();
		
		// initialize language choice in visit
		//console.log("language choice should init here");
		language_choice_init();

		// force footer copy and programs to shift depending on size
		var footerFunc = move_element_on_resize({
			small:false,
			medium: false,
			large: true,
			xlarge: true,
			sourceElement: '#footer-copy',
			targetElement: '#footer-programs'
		});
		footerFunc();
		// this is the timer for the footer shift
		var thisRand = getUniqueID();
        $(window).on("resize", function() {
			waitForFinalEvent(function() {
				footerFunc();
			}, 400, thisRand);
		});
	});	
}

// this will populate both the offcanvas nav as well as the level2 nav,
// as we're using the same html file for both.
function ajax_populate_nav() {
	// if's the home page, we need to do a slightly different thing in the mobile panel
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/nav-"+gSection+".html",
		success: function(data) {
			if (gSection === "home") {
				$('#mobile-panel-nav-sections-container').remove();
				$('#mobile-panel-nav-sections, #level2-nav-container').append(data);
			} else {
				$('#mobile-panel-nav-section-nav-container, #level2-nav-container').append(data);
			}
			
			$('#mobile-panel-nav-section-name').attr('href', '/'+gSection+'/').text(gSectionName).addClass('active');
		}
	});
}

function ajax_off_canvas_extras() {
	// Set up a switch, as not every section needs their own.
	// We'll have a generic one, then create other extra files as needed.
	var extra;
	switch(gSection){
		case "conservation":
		case "museum":
		case "research":
		case "foundation":
			extra = gSection;
			break;
		default:
			extra = "home";
	}
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/off_canvas_extras-"+extra+".html",
		success: function(data) {
			$('#mobile-panel-nav-extras').append(data);
		}
	});
}
// site alert will appear if broadcast.html has data in it.
function ajax_site_alert() {
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/broadcast.html",
		success: function(data) {
			// console.log("site alert length:",data.length);
			if (data.length > 0){
				$('#site-alert').html(data).removeClass('hide');	
			}
		}
	});
}	
// set up the global-nav. active class is set on success.
function ajax_global_nav() {
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/global-nav.html",
		success: function(data) {
			$('#global-nav-wrapper').html(data);
			if (gSectionPrefix === "home") {
				$('#global-nav .section-title a').attr('href', '/').text(gSectionName);
			}
			else {
				$('#global-nav .section-title a').attr('href', '/'+gSection+'/').text(gSectionName);
			}
			$('#global-nav .show-for-large-up .left li[id$="'+gSection+'"] > a').addClass("active");
		}
	});
}
// set up the utilities area
function ajax_utilities() {
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/utilities.html",
		success: function(data) {
			$('#utilities').html(data);
			if (gSection === "visit" && gSectionSubNavNode !== "cal") {
				$('.page-languages').toggleClass('hide');
				//console.log("subnav is " + gSectionSubNavNode);
			}
			
			if (gSection === "museum" && gSectionSubNavNode === "collection") {
				$('.page-feedback').toggleClass('hide');
			}
		}
	});
}
function ajax_footer() {
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/footer-nav.html",
		success: function(data) {
			$('#footer').html(data);
			//console.log("footer-nav.html loaded");
		}
	});
}
function ajax_hours(loc) { // use "villa" or "center" in function call.
	var this_loc = ".getty-"+loc;
	var this_hours = ($(this_loc).hasClass('hours') === true && $(this_loc).prop("tagName") !== "BODY") ? $(this_loc) : $(this_loc).find('.hours');
	if (this_hours.length > 0) {
		return $.ajax({
			type: "GET",
			url: "/global/r/html-includes/hours-getty-"+loc+".html",
			success: function(data) {
				this_hours.html(data);
			}
		});
	}	
}

function ajax_promo(id, file) { // in function call, provide id of div and html file to be loaded.
	//console.log("id is ",id);
	//console.log("file is ",file);
	if (id.length > 0) {
		return $.ajax({
			type: "GET",
			url: "/global/r/html-includes/"+file,
			success: function(data) {
			// console.log("data is ",data);
				if (data.length > 0){
					$('#'+id).html(data);
					$.each($('[data-getty-href]'), function() {
						$(this).clickable_tile();
					});
				}
			}
		});
	}
}

// header scripts need to be loaded in a different way than footer scripts.
// needs to be synchronous, so append them to the head.
// Using an array means we can push other scripts in as needed, for example fittext and mousescroller.
function ajax_header_scripts(array) {
	for(var i =0; i<array.length;i++) {
		// I know this is EVIL. PURE EVIL.
		// And... without the hours to implement something like Require.js,
		// document.write is what we're going to do. My apologies to the world.
		document.write('<script type="text/javascript" src="'+array[i]+'"></script>');
/*
		var js = document.createElement('script');
		js.setAttribute("type","text/javascript");
		js.setAttribute("src", array[i]);
		document.getElementsByTagName("head")[0].appendChild(js);
*/
	}
}

// set up deferred load of multiple scripts using Deferred object.
// Using a plugin to do plural $.getScripts()
// http://www.erichynds.com/blog/using-deferreds-in-jquery
function ajax_footer_scripts() {
	var gsd = $.Deferred();
	$.getScripts({
		urls: getty_footer_script_array,
		cache: true,
		async: false,
		success: gsd.resolve
	});
	return gsd.promise();
}

function ajax_photo_policy() {
	return $.ajax({
		type: "GET",
		url: "/global/r/html-includes/photo-policy.html",
		success: function(data) {
			$('#photo-policy').html(data);
		}
	});
}
