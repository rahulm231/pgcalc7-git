/* Custom JS - write your own functions for meerkat16 */

jQuery(document).ready(function($){

  $(document).on('facetwp-loaded', function() {
    // Hide archive pagination when a search term is present
    // because it's not accurate in that situation.
    if ($('.facetwp-search').val()) {
      $('.tool-pagination-archive').hide();
    } else {
      $('.tool-pagination-archive').show();
    }
  });

});
