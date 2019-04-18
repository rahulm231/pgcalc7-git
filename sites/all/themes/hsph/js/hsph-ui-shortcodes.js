jQuery(document).ready(function($) {
	// Tabs Shortcode
	$( ".hsph-ui-shortcodes.tabs" ).tabs();
	
	// Expendable Region Shortcode
	$(".hsph-ui-shortcodes.expandable h3").on( "click", function( event ) {
		event.preventDefault();
		$(this).next( "div" ).slideToggle( "slow" );
		$(this).find( "span" ).toggleClass( "icon-down" );
		$(this).next( "div" ).attr( "aria-expanded", $(this).next( "div" ).attr( "aria-expanded" ) === "false" ? "true" : "false" );
		$(this).find( "span" ).attr( "aria-expanded", $(this).find( "span" ).attr( "aria-expanded" ) === "false" ? "true" : "false" );
	}).next().hide();
	$( ".hsph-ui-shortcodes.expandable .ui-expandable-header-icon" ).attr( "aria-expanded", "false" );
	$( ".hsph-ui-shortcodes.expandable .ui-expandable-content" ).attr( "aria-expanded", "false" );
	
	// Accordion Shortcode
	$( ".hsph-ui-shortcodes.accordion" ).accordion({
		heightStyle: "content",
		animate: 500,
		collapsible: true,
		icons: { "header": "dashicons dashicons-arrow-down-alt2 icon-up", "activeHeader": "dashicons dashicons-arrow-down-alt2 icon-down" },
	});
});