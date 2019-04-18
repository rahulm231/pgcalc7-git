/*
 ___ __  __  ___ _____   __    ___ ___  __   __   _    ___  
| __|  \/  || _ ) _ \ \ / /___| _ \_ _||   \|   \| |  | __| 
| _|| |\/| || _ \   /\ V //___    /| | | |) | |) | |__| _|  
|___|_|  |_||___/_|_\ |_|     |_|_\___||___/|___/|____|___| 
                Aeronautical University

document-ready.js
*/

jQuery(document).ready(function() {
  "use strict";
  var erauPathname = window.location.pathname;
  var erauSplitPath = erauPathname.split("/");
  var erauMainSection = erauSplitPath[1];
  // Main Nav Highlighting
  if (erauMainSection === "") {
    jQuery("a[href='/']").parent("li").addClass("current");
  } else {
    jQuery("a[href='/" +erauMainSection+ "/']").parent("li").addClass("current");
  }
  // Left Nav Highlighting
  jQuery(".left-nav a[href='" + erauPathname + "']").parents("li").addClass("current"); // Add class=current to the parents <li> of any link to the current page.
  jQuery(".left-nav a[href*='/" +erauMainSection+ "/']").parents("li").show(); // Reveal the parents <li> of any link to the current section.

  // ============ Smooth Scroller =============
   jQuery(function() {
     jQuery('a[href*=#]:not([href=#], .expand-button)').click(function() {
       if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
         var target = jQuery(this.hash);
         target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           jQuery('html,body').animate({
             scrollTop: target.offset().top - 30
           }, 1750, "easeInOutCubic");
           return false;
         }
       }
     });
   });
  // ============ End Smooth Scroller =============

  /* ============= Push Menu ================ */
  jQuery('#erauMenuButton').click(function () {
  //  if (jQuery(window).width() < 1200) {
      if (jQuery('#erauMenu').hasClass('hid')) {
        jQuery('#erauMenu').removeClass('hid');
        jQuery("#entirety, #header-holder").addClass("slideOver");
      } else {
        jQuery('#erauMenu').addClass('hid');
        jQuery("#entirety, #header-holder").removeClass("slideOver");
      }
  //  }
  });
  /* ============= END Push Menu ================ */

  jQuery('#hidden-panels a.hidden-panel-tab').on('click', function(e) {
    if ( jQuery(this.getAttribute('data-target') ).css('display') === "none" ) {
      e.preventDefault();
      jQuery('#hidden-panels .hidden-panel').hide();
      jQuery('#hidden-panels a.hidden-panel-tab').removeClass('active');
      jQuery(this).addClass('active');
      jQuery(this.getAttribute('data-target')).slideDown();
    }
  });

  /* ============ nav-hat Support ============ */
  jQuery('.nav-hat').each(function() {
    var icon = jQuery(this).find('.icon-menu');

    icon.click(
      function(e) {
        e.preventDefault();
        jQuery('.collapsable-nav').slideToggle();
      }
    );
  });
  /* ============ END nav-hat support ============ */
  
  jQuery(".modal").appendTo("body");

});

jQuery(window).on('load scroll', function(){
  "use strict";
  jQuery('.dot').each(function(){
    var imagePos = jQuery(this).offset().top;
    var topOfWindow = jQuery(window).scrollTop();
    if (imagePos < topOfWindow+jQuery(window).height()) {
      jQuery(this).addClass("fadeIn");
    }
  });
});
