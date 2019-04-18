Drupal.behaviors.pgc_sync = {
  attach: function() {
    $ = jQuery;
    // Make it so a field can only be selected to be forced or skipped, not both.
    $('input[type=checkbox]').change(function() {
      if($(this).is(':checked')) {
        var otherOne = 'force';
        var thisOne = 'skip';
        if($(this).attr('name').indexOf('force') > 0) {
          otherOne = 'skip';
          thisOne = 'force';
        }
        $('input[name="'+$(this).attr('name').replace(thisOne, otherOne)+'"]').attr('checked', false);
      }
    });
  }
};