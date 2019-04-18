;
jQuery(function() { // onReady()
  //jQuery('#edit-field-txnmy-microsite .form-select option:disabled').hide();
  var txnmy_microsite;
  var microsite;
  txnmy_microsite = jQuery('#edit-field-txnmy-microsite .form-select option:disabled');
  microsite = jQuery('#edit-field-microsite .form-select option:disabled');
  if (typeof txnmy_microsite != 'undefined') {
    txnmy_microsite.remove();
  }
  if (typeof microsite != 'undefined') {
    microsite.remove();
  }
  
} ); // end onReady()
;
