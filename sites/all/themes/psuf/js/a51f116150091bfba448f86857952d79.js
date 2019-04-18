// ******************************************
// onReady()
// ******************************************
jQuery(function() { // onReady()
  var gcal,href;
  gcal = jQuery('a.ical-icon').clone(true);

  jQuery(gcal).addClass('gcal-icon');
  href = 'http://www.google.com/calendar/render?cid=' + jQuery(gcal).attr('href');
  jQuery(gcal).attr('href',href);

  jQuery('a.ical-icon img').attr('src','/sites/all/modules/aha_google_ical/images/outlook.gif');
  jQuery('a.ical-icon img').removeAttr('height');
  jQuery('a.ical-icon img').removeAttr('width');
  jQuery('a.ical-icon').after(gcal);
  jQuery('a.gcal-icon img').attr('src','/sites/all/modules/aha_google_ical/images/google.gif');
  jQuery('a.gcal-icon img').removeAttr('height');
  jQuery('a.gcal-icon img').removeAttr('width');

  var givingMenu = jQuery(".sidebar-first-wrapper #block-system-main-menu h2");
  jQuery(givingMenu).prepend("<span class=\"parent closed first\" original-class=\"parent closed first\"></span>");
  var givingToggle = jQuery("#block-system-main-menu h2 span");
  var subMenu = jQuery(".sidebar-first-wrapper #block-system-main-menu ul");
  
  if (jQuery(givingMenu).parent().parent().parent().hasClass("active-trail")){
    jQuery(givingToggle).removeClass("closed").addClass("open");
  }else{
    jQuery(subMenu).hide();
  }

  jQuery(givingToggle).click(function(){
    if (jQuery(this).hasClass("closed")){
      jQuery(this).removeClass("closed");
      jQuery(this).addClass("open");
      jQuery(subMenu).slideToggle('700');
    }else{
      jQuery(this).removeClass("open");
      jQuery(this).addClass("closed");
      jQuery(subMenu).slideToggle('700');
    }
  });


} ); // end onReady()
// ******************************************
// End onReady()
// ******************************************
;
(function ($) {
    
Drupal.behaviors.jquerymenu = { 
    attach:function(context) {    
    
    
  jqm_showit = function() {
    $(this).children('.jqm_link_edit').fadeIn();
  }
  jqm_hideit = function() {
    $(this).children('.jqm_link_edit').fadeOut();
  }
  $('ul.jquerymenu li').hover(jqm_showit, jqm_hideit);
  
  jqm_mouseenter = function() {
    momma = $(this);
    if ($(momma).hasClass('closed')){
      if (Drupal.settings.jquerymenu.animate === 1) {
        $($(this).siblings('ul').children()).hide().fadeIn('3000');
        $(momma).children('ul').slideDown('700');
      }
      $(momma).removeClass('closed').addClass('open');
      $(this).removeClass('closed').addClass('open');
    }    
  }
  
  jqm_mouseleave = function(){
    momma = $(this);
    if ($(momma).hasClass('open')){
      if (Drupal.settings.jquerymenu.animate === 1) {
        $(momma).children('ul').slideUp('700');
        $($(this).siblings('ul').children()).fadeOut('3000');
      }
      $(momma).removeClass('open').addClass('closed');
      $(this).removeClass('open').addClass('closed');
    }
  }

$('ul.jquerymenu .active').parents('li').removeClass('closed').addClass('open');
$('ul.jquerymenu .active').parents('li').children('span.parent').removeClass('closed').addClass('open');

  if (Drupal.settings.jquerymenu.hover === 1) {
    $('ul.jquerymenu:not(.jquerymenu-processed)', context).addClass('jquerymenu-processed').each(function(){
      $(this).find('li.parent').hover(jqm_mouseenter, jqm_mouseleave);
    });
    $('ul.jquerymenu-processed span.parent').remove();
  }

  else if (Drupal.settings.jquerymenu.hover === 0) {
    $('ul.jquerymenu:not(.jquerymenu-processed)', context).addClass('jquerymenu-processed').each(function(){
      $(this).find("li.parent span.parent").click(function(){
        momma = $(this).parent();
        if ($(momma).hasClass('closed')){
          if (Drupal.settings.jquerymenu.animate === 1) {
            $($(this).siblings('ul').children()).hide().fadeIn('3000');
            $(momma).children('ul').slideDown('700');
          }
          $(momma).removeClass('closed').addClass('open');
          $(this).removeClass('closed').addClass('open');
        }
        else{
          if (Drupal.settings.jquerymenu.animate === 1) {          
            $(momma).children('ul').slideUp('700');
            $($(this).siblings('ul').children()).fadeOut('3000');
          }
          $(momma).removeClass('open').addClass('closed');
          $(this).removeClass('open').addClass('closed');
        }
      });
    });
  }
}
}})(jQuery);;
