/*
	This JS file should only contain minor tweaks to page layout for functionality purposes. It
	is not intended to override PatternLab scripts. If you are revising scripts for presentation,
	you should change those styles in the PatternLab styleguide. If this file becomes long,
	you are doing it wrong.
			-- JHW 6/28/16
*/

// From http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

/*
	For the directory search page. Hide the exposed filter form and copy the
	value from that form over to the custom form we've provided in a block.
	Only happens if both the form and the block are present; remove the block
	to get the exposed form back.
*/
function nameSearchMigrate() {
	$exposed_name_form = jQuery("#views-exposed-form-faculty-staff-list-fs-search");
	$name_search = jQuery("#namesearch");
	if($exposed_name_form.length > 0 && $name_search.length > 0) {
		$exposed_name_form.attr({"hidden":true});
		$name_search.val($exposed_name_form.find("#edit-name").val());
	}
}

function gcseSearchFix() {
	$keywordsearch_field = jQuery("#keywordsearch");
	$queryStr = getURLParameter('q');
	if ($keywordsearch_field.length <= 0) return;
	//$keywordsearch_field.val($queryStr).focus();
	if($queryStr) {
		jQuery('.no-search-content').hide();
	}
}

function accordionFragment() {
	fragment = window.location.hash;
	if(fragment == "") return;

	$target = jQuery(fragment);
	if($target.length != 1) return; // There needs to be precisely one.
	$accordionPane = $target.parents('.accordion-item');
	$accordion = $target.parents('.accordion');
	if($accordion.length != 1 || $accordionPane.length != 1) return;
	$accordion.foundation('down',$accordionPane);
	$target[0].scrollIntoView(true);
}

function programPlaceholderSearch() {
	placeholderTarget = jQuery("#views-exposed-form-program-search-program-search input[type=text]");
	if(placeholderTarget.length <= 0) return;
	placeholderTarget.attr({"placeholder":"Enter your program of interest"});
}

// Execute all of the tweaks.
jQuery(document).ready( function() {
	nameSearchMigrate();
	gcseSearchFix();
	accordionFragment();
	programPlaceholderSearch();
});
