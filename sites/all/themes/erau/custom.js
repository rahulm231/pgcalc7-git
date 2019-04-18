(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.pgc_custom = {
	attach: function(context, settings) { 
	  $( "#block-pgc-misc-blocks-mobilenav .header-mobile" ).prepend( '<a href="/" class="mobile-nav-bar-title">Planned Giving</a>' );	
	}
  }
})(jQuery, Drupal, this, this.document);
