jQuery(document).ready(function() {

    jQuery('.flexslider').flexslider({
        animation: "slide",
        prevText: "",
        nextText: "",
        useCSS: false,
        controlNav: "thumbnails"
    }); 
	
	jQuery('#grand-rounds-slider').flexslider({
        animation: "slide",
        prevText: "",
        nextText: "",
        useCSS: false,
        controlNav: true
    }); 
	
	jQuery("#grand-rounds-slider > .flex-control-nav").removeClass("flex-control-thumbs");
	jQuery("#grand-rounds-slider > .flex-control-nav").addClass("flex-control-paging");

    // extra body classes
    var pathArrayclass = window.location.pathname.split( '/' );
    var newclasses = "";
    for (i = 0; i < pathArrayclass.length; i++) {
        newclasses += pathArrayclass[i];
        newclasses += " ";
    }
    jQuery('body').addClass(newclasses);

    // active certain menu items when these critirea are present
    jQuery('body.email-preferences-form-2015 .main-menu li.about-us-li').each(function(){ 
        jQuery(this).addClass('selected'); 
    });
    jQuery('body.board-nomination-form-page-2015 .main-menu li.about-us-li').each(function(){ 
        jQuery(this).addClass('selected'); 
    });
    jQuery('body.get-involved .main-menu li.get-involved-li').each(function() { 
        jQuery(this).addClass('selected'); 
    });

    jQuery('body.areas-of-need.fy17-priorities.canine-companions.donate .main-menu li.canine-companions-trail, body.areas-of-need.fy17-priorities.canine-companions.donate .main-menu li.canine-companions-li > a').each(function() {
        jQuery(this).addClass('selected'); 
    });
	
	jQuery('body.ways-to-give.north-texas-disaster-relief .main-menu li.north-texas-disaster-relief-trail, body.ways-to-give.north-texas-disaster-relief .main-menu li.north-texas-disaster-relief-trail > a').each(function() {
        jQuery(this).addClass('selected'); 
    });
	
	jQuery('body.ways-to-give.youve-made-baylor-250-million-better-for-all .main-menu li.north-texas-disaster-relief-trail').each(function() {
        jQuery(this).addClass('selected'); 
    });
	 jQuery('body.grandrounds .main-menu li.get-involved-li').each(function() { 
        jQuery(this).addClass('selected'); 
    });
	 jQuery('body.Grateful .main-menu li.ways-to-give-li').each(function() { 
        jQuery(this).addClass('selected'); 
    });
	 jQuery('body.grateful .main-menu li.ways-to-give-li').each(function() { 
        jQuery(this).addClass('selected'); 
    });

	jQuery('#mmenu .main-menu').hide();
    jQuery('#mm-trigger').click(function() {
       jQuery('#mmenu .main-menu').slideToggle();
       jQuery(this).find('i.fa').toggleClass('fa-bars fa-times');
    });

    jQuery('ul.utility li.fontawe.search > a').html('<i class="fa fa-search"></i>');
    jQuery('ul.utility li.fontawe.twitter > a').html('<i class="fa fa-twitter"></i>');
    jQuery('ul.utility li.fontawe.facebook > a').html('<i class="fa fa-facebook"></i>');
    jQuery('ul.utility li.login > a').not(':has(i)').prepend('<i class="fa fa-unlock-alt"></i>');

    jQuery('.footer .col2 > h3').not(':has(i)').prepend('<i class="fa fa-map-marker"></i>');
    jQuery('.footer .col3 > h3').not(':has(i)').prepend('<i class="torch-icon"></i>');
    jQuery('.footer .col4 > h3').not(':has(i)').prepend('<i class="fa fa-chevron-circle-down"></i>');

    jQuery('ul.checkmark > li').not(':has(i)').prepend('<i class="fa fa-check-circle"></i>');

	var current_width = jQuery(window).width();
    if(current_width < 900){
 
	}

    // breadcrumb
    var pathArray = window.location.pathname.split('/');
    var parts = [{ "text": 'Home', "link": '/' }];
    for( var i = 1; i < pathArray.length; i++ ) {
                var part = pathArray[i];
                var text = part;
                var link = pathArray.slice( 0, i + 1 ).join('/');
                 parts.push({ "text": text, "link": link });
    }
    var markup = '';
    jQuery.each(parts, function(index, value) {
            markup += '<a alt="' + value.text + '" href="' + value.link + '">' + value.text.replace(/-/g, ' ') + '</a>';
             if(index <= parts.length - 2) markup += ' > '; 
    });
    jQuery('#breadcrumb').not(':has(a)').append(markup);
    jQuery('#breadcrumb a:first-child').text('Home');


    // adds placeholder attr to mobile slideMenu contact form
    jQuery('.placehold').each(function(){
        var placeh = jQuery(this).find('label').text();
        jQuery(this).find('.BBFormDisplayTextbox, .BBFormDisplayEmail').attr('placeholder', placeh);
        jQuery(this).find('.BBFormDisplayFieldCaption').hide();
    });

    // !placeholder with modernzir
    if(!Modernizr.input.placeholder){

        jQuery('[placeholder]').focus(function() {
            var input = jQuery(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = jQuery(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
        jQuery('[placeholder]').parents('form').submit(function() {
            jQuery(this).find('[placeholder]').each(function() {
                var input = jQuery(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });
        });
    }

});

jQuery(window).resize(function(){
    
    var current_width = jQuery(window).width();
    if(current_width < 900){

    }
    if(current_width >= 900){

    }
});

/*
var bbpage = Sys.WebForms.PageRequestManager.getInstance();
bbpage.add_pageLoaded(function(){
    jQuery("td").each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.html(jQuerythis.html().replace(/&nbsp;/g, ''));
    });
    jQuery('td[style*="width: 25px;"]').css('width','auto');
});
*/