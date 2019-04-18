(function ($) { $(document).ready(function() {
  $("#block-pgc-misc-blocks-mobilenav .open-btn").click(function(){
    $("#block-pgc-misc-blocks-mobilenav .subnav-mobile-mask").slideToggle();
    $("#block-pgc-misc-blocks-mobilenav .open-btn").hide();
    $("#block-pgc-misc-blocks-mobilenav .close-btn").show();
  });

  $("#block-pgc-misc-blocks-mobilenav .close-btn").click(function(){
    $("#block-pgc-misc-blocks-mobilenav .subnav-mobile-mask").slideToggle();
    $("#block-pgc-misc-blocks-mobilenav .open-btn").show();
    $("#block-pgc-misc-blocks-mobilenav .close-btn").hide();
  });
})})(jQuery);
