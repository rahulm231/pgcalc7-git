(function ($) {

/* ADD NAVIGATION TOGGLE BUTTON FOR USE WITH MOBILE SCREEN WIDTHS */
$(function() {
  $('.mobile-nav-toggle').click(function() {
    var menu = $('.global-nav-wrapper');
	var header_wrapper = $('.header-wrapper');	
    menu.prepend('<a class="mobile-nav-close" href="#"></a>');
    $('.mobile-nav-close').click(function() {
      menu.toggleClass('visible');
	  header_wrapper.toggleClass('visible');	  
      $('.mobile-nav-close').remove();
      return false;
    });
    menu.toggleClass('visible');
	header_wrapper.toggleClass('visible');	
    return false;
  });
});

/*NORMAL NAV MENU - ADD SUB-MENU EXPAND/COLLASE FUNCTIONALITY FOR MOBILE SUB_MENU ITEMS */
$(function() {
      $('.region-global-nav .block ul.menu > li.expanded > a').each(function() {
          $(this).before('<a title="Click to expand or collapse" href="#" class="nested-menu-item-toggle"></a>');
      });	  
      $('.region-global-nav .block ul.menu > li.expanded').each(function() {
          $(this).removeClass('expanded');
      });		  
      $('.block .nested-menu-item-toggle').click(function() {
        $(this).closest('li').toggleClass('expanded');
        $(this).siblings('ul').toggle();		
        return false;
      });
});

} )( jQuery );
;
;
(function ($) {

$(function() {
  $("#block-search-form .form-text").attr("value", "Search");

  $("#search-block-form input#edit-submit").bind("click", function(e){
    e.preventDefault();
    var val = $("input#edit-search-block-form--2").val();
    window.location.href = "http://www.psuf.org/search/site/" + val;
  });

  var text = "Search";

  $("#block-search-form .form-text").focus(function() {
    if($(this).attr("value") == text) $(this).attr("value", "");
  });

  $("#block-search-form .form-text").blur(function() {
    if($(this).attr("value") == "") $(this).attr("value", text);
  });
});

} )( jQuery );;
(function ($) {

$(function() {
	$('.view-faqs .views-field-body').hide();
	$('.view-faqs .views-field-field-tags').hide();	
	$('.view-faqs .views-field-title') .addClass('question') .click(function() {
		if ($(this).hasClass('expanded')) {
			$(this).removeClass('expanded');
		}
		else {
			$(this).addClass('expanded');
			
		}
		$(this).parent().children('.view-faqs .views-field-body').toggle();
		$(this).parent().children('.view-faqs .views-field-field-tags').toggle();
	});	
	$('#show_answers').click(function () {
		if (!$('.view-faqs .views-field-title').hasClass('expanded')) {
			$('.view-faqs .views-field-title').addClass('expanded');
		}								   
		$('.view-faqs .views-field-body').show();
		$('.view-faqs .views-field-field-tags').show();
	});
	$('#hide_answers').click(function () {
		if ($('.view-faqs .views-field-title').hasClass('expanded')) {
			$('.view-faqs .views-field-title').removeClass('expanded');
		}										   
		$('.view-faqs .views-field-body').hide();
		$('.view-faqs .views-field-field-tags').hide();
	});	
});

} )( jQuery );
;
(function ($) {

$(function() {
      $('.block-jquerymenu ul.jquerymenu > li.parent').each(function() {
          if (!$(this).hasClass('active-trail')) {
			  $(this).removeClass('open').addClass('closed');
		  }
      });  
});

$(function() {
      $('.block-jquerymenu ul.jquerymenu > li.parent > span').each(function() {
          if (!$(this).hasClass('active-trail')) {
			  $(this).removeClass('open').addClass('closed');
		  }
      });  
});

} )( jQuery );


;
(function ($) {

/*Hide all node form check boxes that are disabled/greyed out */
$(function() {
	$('.node-form label.option.disabled').each(function() {
		$(this).parent().hide();
	}); 
});		   

/*Only show basic tabs (Title, Files, Images, Etc) */
$(function () {
	$('.node-page-form .vertical-tabs ul.vertical-tabs-list li').hide();
	$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Title and Body)').show();
	$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Files)').show();
	$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Images)').show();
	$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Publishing options)').show();

	$('#edit-field-google-map').appendTo('#edit-actions');
	$('#edit-field-google-map').css('padding-top','500px');
	setTimeout(function() {
		$('#edit-field-google-map').detach().appendTo('#edit-field-location-und-0');
		$('#edit-field-google-map').css('padding-top','0px');
	}, 4500);	

});

/* Custom Dashboard Links - set checkboxes based on dashboard create page selection */
$(function () {
        var href = location.href;
        var split = href.split("#");
        if(split[1] != null) {
          var pagetype = split[1];
          switch(pagetype) {
            case 'meeting':
                $('.node-page-form input#edit-field-select-a-page-type-und-48').attr('checked','checked');
                $('.node-page-form input#edit-field-event-type-und-14').attr('checked','checked');
	            $('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Files)').hide();
	            $('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Images)').hide();
                break;
            case 'event':
                $('.node-page-form input#edit-field-select-a-page-type-und-48').attr('checked','checked');
                $('.node-page-form input#edit-field-event-type-und-13').attr('checked','checked');
	            $('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Files)').hide();
                break;
            case 'rfp':
                $('.node-page-form input#edit-field-select-a-page-type-und-52').attr('checked','checked');
                break;
            case 'job':
                $('.node-page-form input#edit-field-select-a-page-type-und-51').attr('checked','checked');
                break;
            case 'news':
                $('.node-page-form input#edit-field-select-a-page-type-und-49').attr('checked','checked');
                break;
            case 'park':
                $('.node-page-form input#edit-field-select-a-page-type-und-48').attr('checked','checked');
                break;
            case 'alert':
                $('.node-page-form input#edit-field-select-a-page-type-und-59').attr('checked','checked');
                break;
            default:
                break;
          }
        } else { /*if it is none of the above, it must be a web page */
          $('.node-page-form input#edit-field-advanced-features-und-60').attr('checked','checked');
        }
});

/*Check boxes if content is filled out on the page */

/* News/Press Release Null/Not Null */
$(function() {
  if ( ($('#edit-field-news-und-0-value input').length > 0) && ($('#edit-field-news-und-0-value input').val() != '') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-49').attr('checked','checked');
  }
});

/* Alert Null/Not Null */
$(function() {
  if ( ($('#edit-field-is-alert input').length > 0) && ($('#edit-field-is-alert input').val() != '') && ($('#edit-field-is-alert input').val() != '1') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-50').attr('checked','checked');
  }
});

/* Bid/RFP Null/Not Null */
$(function() {
  if ( ($('#edit-field-bid-rfp-status-und input').length > 0) && ($('#edit-field-bid-rfp-status-und input').val() != '') && ($('#edit-field-bid-rfp-status-und input').val() != '_none') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-52').attr('checked','checked');
  }
});

/* Calendar Event Null/Not Null */
$(function() {
  if ( ($('#edit-field-calendar-date-und-0-value input').length > 0) && ($('#edit-field-calendar-date-und-0-value input').val() != '') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-48').attr('checked','checked');
  }
});

/* Job Opening Null/Not Null */
$(function() {
  if ( ($('#edit-field-job-status-und input').length > 0) && ($('#edit-field-job-status-und input').val() != '') && ($('#edit-field-job-status-und input').val() != '_none') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-51').attr('checked','checked');
  }
});

/* Park Null/Not Null */
$(function() {
  if ( ($('#edit-field-add-this-page-to-park-site input').length > 0) && ($('#edit-field-add-this-page-to-park-site input').val() != '') && ($('#edit-field-add-this-page-to-park-site input').val() != '1') ) {
    $('.node-page-form input#edit-field-select-a-page-type-und-59').attr('checked','checked');
  }
});

/* Banners Null/Not Null */
$(function() {
  if ( ($('#field-custom-banner-values input').length > 0) && ($('#field-custom-banner-values input').val() != '') ) {
    $('.node-page-form input#edit-field-advanced-features-und-57').attr('checked','checked');
  }
});

/* Contact Information Null/Not Null */
$(function() {
  if ($('#edit-field-custom-contact-information-und input:radio:checked').length > 0) {
    $('.node-page-form input#edit-field-advanced-features-und-58').attr('checked',true);
  } else {
    $('.node-page-form input#edit-field-advanced-features-und-58').attr('checked',false);
  }
});

/* Embedded Pages Null/Not Null */
$(function() {
  if ( ($('#field-embed-pages-values input').length > 0) && ($('#field-embed-pages-values input').val() != '') ) {
    $('.node-page-form input#edit-field-advanced-features-und-53').attr('checked','checked');
  }
});

/* FAQs Null/Not Null */
$(function() {
  if ($('#edit-field-faq-tag-sorting-und').val() != '_none') {
    $('.node-page-form input#edit-field-advanced-features-und-55').attr('checked',true);
  } else {
    $('.node-page-form input#edit-field-advanced-features-und-55').attr('checked',false); 
  }
});

/* Links Null/Not Null */
$(function() {
  if ($('#edit-field-links-und-0-url').val() != '') {
    $('.node-page-form input#edit-field-advanced-features-und-65').attr('checked',true);
  }
});

/* Maps Null/Not Null */
$(function() {
  if ( ($('#edit-field-standard-location-und').val() != '_none') || ($('#edit-field-location-und-0-street').val() != '') ){
    $('.node-page-form input#edit-field-advanced-features-und-56').attr('checked',true);
  } else {
    $('.node-page-form input#edit-field-advanced-features-und-56').attr('checked',false);
  }
});

/* Scheduling Null/Not Null */
$(function() {
  if ( ($('#edit-scheduler-settings input#edit-unpublish-on').val() != '') || ($('#edit-scheduler-settings input#edit-publish-on').val() != '') ){
    $('.node-page-form input#edit-field-advanced-features-und-63').attr('checked','checked');
  }
});

/* Services Null/Not Null */
$(function() {
  if ( ($('#field-services-tags-values input').length > 0) && ($('#field-services-tags-values input').val() != '') ) {
    $('.node-page-form input#edit-field-advanced-features-und-54').attr('checked','checked');
  }
});

/* End Checking Content */

/********* Select A Page Type - display or hide fields in edit screen when options are checked/unchecked ****************/

/*News/Press Release Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-49").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(News)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-49").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(News)').toggle();
	});
});

/*Alert Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-50").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Alerts)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-50").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Alerts)').toggle();
	});
});

/*Bid/RFP Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-52").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Bids/RFPs)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-52").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Bids/RFPs)').toggle();
	});
});

/*Calendar Event Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-48").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Event/Meeting)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-48").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Event/Meeting)').toggle();
	});
});

/*Job Opening Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-51").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Jobs)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-51").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Jobs)').toggle();
	});
});

/*Park Show/Hide */
$(function () {	
	if ($("input#edit-field-select-a-page-type-und-59").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Parks)').show();
});

$(function () {	
	$("input#edit-field-select-a-page-type-und-59").change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Parks)').toggle();
	});
});

/********** Advanced Options - display or hide fields in edit screen when options are checked/unchecked *********/
		   
/*Banner Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-57").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Custom Banners)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-57').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Custom Banners)').toggle();
	});
});

/*Contact Information Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-58").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Custom Contact Info)').show();
});

$(function () {
	$('input#edit-field-advanced-features-und-58').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Custom Contact Info)').toggle();
	});
});

/*Embedded Pages Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-53").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Embed Other Pages)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-53').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Embed Other Pages)').toggle();
	});
});

/*FAQs Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-55").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(FAQs)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-55').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(FAQs)').toggle();
	});
});

/*Maps Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-56").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Google Map)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-56').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Google Map)').toggle();
	});
});

/*Menu Settings Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-60").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Menu settings)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-60').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Menu settings)').toggle();
	});
});

/*Revision Notes Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-61").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Revision information)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-61').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Revision information)').toggle();
	});
});

/*Scheduling Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-63").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Scheduling options)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-63').change(function() {
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Scheduling options)').toggle();
	});
});

/*Services Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-54").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Services)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-54').change(function() {
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Services)').toggle();
	});
});

/*Links Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-65").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Links)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-65').change(function() {
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Links)').toggle();
	});
});

/*Video Show/Hide */
$(function () {	
	if ($("input#edit-field-advanced-features-und-66").is(':checked'))
		$('.node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Video)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-66').change(function() {
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Video)').toggle();
	});
});

/*Aha Only Show/Hide */
$(function () {	
	if ($('input#edit-field-advanced-features-und-64').is(':checked'))
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Authoring information)').show();
});

$(function () {	
	if ($('input#edit-field-advanced-features-und-64').is(':checked'))
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Printer, email and PDF versions)').show();
});

$(function () {	
	if ($('input#edit-field-advanced-features-und-64').is(':checked'))
		$('.vertical-tabs ul.vertical-tabs-list li:contains(URL path settings)').show();
});

$(function () {	
	if ($('input#edit-field-advanced-features-und-64').is(':checked'))
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Aha Import Notes)').show();
});

$(function () {	
	if ($('input#edit-field-advanced-features-und-64').is(':checked'))
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Aha Admin)').show();
});

$(function () {	
	$('input#edit-field-advanced-features-und-64').change(function() {
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Authoring information)').toggle();
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Printer, email and PDF versions)').toggle();
		$('.vertical-tabs ul.vertical-tabs-list li:contains(URL path settings)').toggle();
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Aha Import Notes)').toggle();
		$('.vertical-tabs ul.vertical-tabs-list li:contains(Aha Admin)').toggle();
	});
});

/********************* Restricted Admin Permissions ****************************/

/*Hide the node edit Menu Settings tab and field on pages with restricted admin permissions */
$(function () {     
      $('.taxterm-name-restrictadminpermissions .node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Menu settings)').hide();
      $('.taxterm-name-restrictadminpermissions .node-page-form .form-item-field-advanced-features-und-60').hide();
});

/*Hide all but needed node edit tabs on pages with site home page */
$(function () {     
      $('.taxterm-name-sitehomepage .node-page-form .vertical-tabs ul.vertical-tabs-list li').hide();
      $('.taxterm-name-sitehomepage .node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Custom Banners)').show();
      $('.taxterm-name-sitehomepage .node-page-form .vertical-tabs ul.vertical-tabs-list li:contains(Embed Other Pages)').show();
      $('.taxterm-name-sitehomepage .node-page-form #edit-field-embedded-pages-display').hide();
      $('.taxterm-name-sitehomepage .node-page-form #node_page_form_group_customize').hide();

});

} )( jQuery );
;
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){v(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},g=function(a){return a.replace(c.regex.minmaxwh,"").match(c.regex.other)};if(c.ajax=f,c.queue=d,c.unsupportedmq=g,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var h,i,j,k=a.document,l=k.documentElement,m=[],n=[],o=[],p={},q=30,r=k.getElementsByTagName("head")[0]||l,s=k.getElementsByTagName("base")[0],t=r.getElementsByTagName("link"),u=function(){var a,b=k.createElement("div"),c=k.body,d=l.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=k.createElement("body"),c.style.background="none"),l.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&l.insertBefore(c,l.firstChild),a=b.offsetWidth,f?l.removeChild(c):c.removeChild(b),l.style.fontSize=d,e&&(c.style.fontSize=e),a=j=parseFloat(a)},v=function(b){var c="clientWidth",d=l[c],e="CSS1Compat"===k.compatMode&&d||k.body[c]||d,f={},g=t[t.length-1],p=(new Date).getTime();if(b&&h&&q>p-h)return a.clearTimeout(i),i=a.setTimeout(v,q),void 0;h=p;for(var s in m)if(m.hasOwnProperty(s)){var w=m[s],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?j||u():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?j||u():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(n[w.rules]))}for(var C in o)o.hasOwnProperty(C)&&o[C]&&o[C].parentNode===r&&r.removeChild(o[C]);o.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=k.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,r.insertBefore(E,g.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(k.createTextNode(F)),o.push(E)}},w=function(a,b,d){var e=a.replace(c.regex.comments,"").replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},i=!f&&d;b.length&&(b+="/"),i&&(f=1);for(var j=0;f>j;j++){var k,l,o,p;i?(k=d,n.push(h(a))):(k=e[j].match(c.regex.findStyles)&&RegExp.$1,n.push(RegExp.$2&&h(RegExp.$2))),o=k.split(","),p=o.length;for(var q=0;p>q;q++)l=o[q],g(l)||m.push({media:l.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:n.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}v()},x=function(){if(d.length){var b=d.shift();f(b.href,function(c){w(c,b.href,b.media),p[b.href]=!0,a.setTimeout(function(){x()},0)})}},y=function(){for(var b=0;b<t.length;b++){var c=t[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!p[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(w(c.styleSheet.rawCssText,e,f),p[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!s||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}x()};y(),c.update=y,c.getEmValue=u,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);;
