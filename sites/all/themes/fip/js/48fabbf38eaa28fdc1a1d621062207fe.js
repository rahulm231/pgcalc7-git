/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {


jQuery(document).ready(function($) {
	// Create dropdown menu based on main-menu
	jQuery(function() {

	  if ($( "#block-menu-block-1").length) {
	  	var block = "#block-menu-block-1 ";
	  }
	  else if ($( "#block-menu-menu-become-a-volunteer-menu").length) {
	  	var block = "#block-menu-menu-become-a-volunteer-menu ";
	  }
	  else if ($( "#block-menu-menu-ways-to-give-menu").length) {
	  	var block = "#block-menu-menu-ways-to-give-menu ";
	  }

	  // Create the dropdown base
	  jQuery("<select />").attr('id', 'mobile-menu').appendTo(block);

	  // Create default option "Home"
	  var defOpt = jQuery("<option />", {
	    "selected": "selected",
	    "value"   : "/",
	    "text"    : "Home"
	  }).appendTo("nav select");

	  // Populate dropdown with menu items
	  jQuery(block + ".menu a").each(function() {
	    var el = jQuery(this);
	    var padding = "";
	    for (var i = 0; i < el.parentsUntil('div > ul').length - 1; i++) padding += "-";
	    var opt = jQuery("<option />", {
	      "value" : el.attr("href"),
	      "text"  : padding + el.text()
	    });
	    if (el.hasClass('active')) {
	      defOpt.removeAttr('defOpt');
	      opt.attr('selected', 'selected');
	    }

	    opt.appendTo("#mobile-menu");
	  });

	  // Creates unique class on each menu item
	  var unique_menu_identifier = 1;
	  jQuery("#mobile-menu option").each(function() {
	    jQuery(this).addClass("mobile-menu-item-" + unique_menu_identifier++);
	  });

	  // To make dropdown actually work
	  jQuery("#mobile-menu").change(function() {
	    window.location = $(this).find("option:selected").val();
	  });
	});

	//removes trailing slashes in url to prevent errors
	var current_url = window.location.href;
	if (current_url.slice(-14) === "stm-volunteer/") {
		var url = current_url.substring(0, current_url.length-1);
		jQuery(location).attr('href',url);
	}
});


// // To understand behaviors, see https://drupal.org/node/756722#behaviors
// Drupal.behaviors.my_custom_behavior = {
//   attach: function(context, settings) {

//     // Place your code here.

//   }
// };


})(jQuery, Drupal, this, this.document);
;
