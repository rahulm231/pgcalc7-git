var $ = jQuery.noConflict(); // default wordpress jquery version converted to common jquery (noly in front end)

/**
 * 
 * Load page scripts
 * 
 * @type type
 */

var pages = {

    init : function(){

        pages.shared.init(); // shared fn
    },
    shared : {
        init : function(){
            
            // login logic, common widgets ++ 
     
            pages.shared.events();
            pages.shared.validate();
        },
        events : function(){
            
            // prevent navigation from main menu items (in header, not footer)
            jQuery('.site-header-menu nav > div > ul > li.menu-item-has-children > a').on('click', function(){
                return false;
            });
            
            //Show sub-menus
            jQuery( '.site-header-menu .menu-item-has-children' ).hover(
                function(){   
                  
                    if(jQuery(this).find("a:first").is(":hover"))
                        jQuery(this).children('.sub-menu').slideDown(200);
                    
                },
                function(){
                    jQuery(this).children('.sub-menu').slideUp(200);
                }
            );
    
            jQuery('#colophon .goto-top').click(function(){
                jQuery("html, body").animate({ scrollTop: 0 }, 600);
                return false;
            });

            jQuery("#search-content").keyup(function(e){
                if(e.keyCode == 13) {
                    jQuery( ".search-btn" ).click();
                }
            });

            jQuery( ".search-btn" ).click(function() {
                if( jQuery(".search-box").hasClass("search-open") ){
                    jQuery(".search-box").removeClass("search-open");
                    jQuery(".site-branding").removeClass("hide-this");
                    var text = jQuery("#search-content").val();
                    if(text !== ""){
                        var url = 'https://alumni.cardinalhayes.org/search/'+text;
                        jQuery(location).attr('href', url);
                    }
                }else{
                    jQuery(".search-box").addClass("search-open");
                    jQuery(".site-branding").addClass("hide-this");
                }
            });

            // social sharing popup
            jQuery('body').on('click', '.sharer-popup', function (e) {

                if(jQuery(this).hasClass('no-popup'))
                    return false;

                var url = jQuery(this).attr('href');

                var w = 640;
                var h = 270;
                var left = (screen.width/2)-(w/2);
                var top = (screen.height/2)-(h/2);
                var newWin = window.open( url, "cardinal hayes - social sharing", "status = 1, height = "+h+", width = "+w+", resizable = 1, top="+top+", left="+left );

                if(!newWin || newWin.closed || typeof newWin.closed=='undefined') 
                { 
                    //POPUP BLOCKED (works for mosts browsers but chrome)
                    return true;
                } else {
                    e.preventDefault();
                    return false;
                }
            });

        },
        validate : function(){ 
            
        }                    
    },
    homepage : {
        init : function(){
                 
            pages.homepage.events();
        },
        events : function(){
                       
            jQuery('#homepage-slider .flexslider').flexslider({
                animation: "fade",
                animationLoop: true,
                slideshowSpeed: 7000,
                animationSpeed: 600,
                controlNav: true,
                directionNav: true,
                prevText: "<span>Previous</span>",
                nextText: "<span>Next</span>"
            });            
        }
    },
    event : {
        init : function(){
              
            pages.event.events();
            pages.event.validate();
        },
        events : function(){
            
            /* payment data */
            jQuery('.section-item-cbox, #paypal-form .section-item .quantifier').on('change', function(event){

                var fields = '';
                jQuery('input.section-item-cbox:checked').each(function(i, el){

                    var $container = jQuery(this).closest('li');

                    var index = i+1;

                    var itemPrice = $container.find('.price').val();
                    var itemName = $container.find('.name').val();
                    var itemQuantity = $container.find('.quantity').val();

                    fields+='<div class="payment-data-group">';
                    fields+='<input type="hidden" class="amount" name="amount_'+index+'" value="'+itemPrice+'" />';
                    fields+='<input type="hidden" name="item_name_'+index+'" value="'+itemName+'" />';
                    fields+='<input type="hidden" name="quantity_'+index+'" class="quantity" value="'+itemQuantity+'" />';
                    fields+='</div>';
                });

                jQuery('#payment-fields').html(fields);   
                
                pages.event.calculateTotal();
            });
          
            /* Checkout */
            jQuery('#paypal-form').on('submit', function(e, options){
               
                options = options || {};
                
                if(!options.submit_to_paypal){
                    
                    e.preventDefault();
                  
                    if(jQuery('.section-item-cbox:checked').length<1){
                        
                        $("span.validation-message").show();
                        return false;
                    }                       
                             
                    var formData = jQuery('#paypal-form').serialize();
                  
                    jQuery.post("/payment&action=new_payment", formData, function(result){

                        jQuery("span.ajax-result").html(result.message);
                   
                        if(result.success){
                            jQuery('#payment_id').val(result.post_id);
                            jQuery('#paypal-form').trigger('submit', { 'submit_to_paypal': true });
                        } else {
                            
                            jQuery('.no-amount-selected.error').addClass('hidden');
                            
                            var $first = null;
                            jQuery.each(result.invalid_fields, function(i, el){
                              
                                if($first == null)
                                    $first = jQuery('[name="'+el+'"]');
                               
                                jQuery('[name="'+el+'"]').addClass('error');
                            });
                        
                            if($first.attr('id') === 'amount'){
                                jQuery('.no-amount-selected.error').removeClass('hidden');
                                jQuery("html, body").animate({ scrollTop: jQuery('.amount-selector input:first').offset().top }, 600);
                            } else{
                                
                                $first.focus();
                            }                                
                        }
                    }, "json");
                }
            });   
        },      
        calculateTotal : function(){ 
            
            var total = 0.0;
            jQuery('#payment-fields .payment-data-group').each(function(){
                var amount = jQuery(this).find('input.amount').val();
                var quantity = jQuery(this).find('input.quantity').val();
             
                total+=parseFloat( accounting.unformat(amount) * quantity );        
            });
            
            jQuery('#amount-preview').text( accounting.formatMoney(total) );
            jQuery('#total_amount').val( total );
        },
        validate : function(){
            
            jQuery("#paypal-form").validate({ 
                rules: {
                    phone: {
                        required: true,
                        phoneUS: true
                    }
                },
                errorPlacement: function(error, element) {} 
            });
        }
    },
    giving : {

        init : function(){
            
            pages.giving.events();

        },
        events : function(){

            jQuery( "#accordion" ).accordion({
                heightStyle: "content",
                collapsible: true,
                active: false
            });

            jQuery(".call-to-action-button a").click(function(e){
                
                var link = jQuery(this).attr('href');

                var result = link.indexOf("downloads") > -1;
                
                //it check if it has some file to download
                if (result){
                    e.preventDefault;
                    window.open(link, '_blank');
                    return false;
                }

            });
        }

    },
    foreverHayesCampaign : {

        init : function(){
            
            pages.foreverHayesCampaign.events();

        },
        events : function(){

            jQuery( "#accordion" ).accordion({
                heightStyle: "content",
                collapsible: true,
                active: false
            });

            jQuery( "#accordion-2" ).accordion({
                heightStyle: "content",
                collapsible: true,
                active: false
            });

            jQuery(".call-to-action-button a").click(function(e){
                
                var link = $(this).attr('href');

                var result = link.indexOf("downloads") > -1;
                
                //it check if it has some file to download
                if (result){
                    e.preventDefault;
                    window.open(link, '_blank');
                    return false;
                }

            });
        }

    },
    onlineDonationForm : {
        
        init : function(){
                 
            pages.onlineDonationForm.events();
            pages.onlineDonationForm.validate();
        },
        events : function(){
            
            jQuery("#duration, #custom-amount").keypress(function (e) {
                //if the letter is not digit then display error and don't type anything
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                }
            });

            jQuery(".frequency-selector input:radio").click( function () {
                var frequency = $(this).val();
                var label;
                if (frequency !== "once") {  
                    
                    switch(frequency){
                        case 'monthly': 
                            label = "Months";
                            break;
                        case 'quarterly': 
                            label = "Quarters";
                            break;
                        case 'yearly': 
                            label = "Years";
                            break;                        
                    }
                  
                    jQuery(".duration-block .group span.label").text(label);
                    jQuery('.duration-block').removeClass('hidden');
                }else{                    
                    jQuery('.duration-block').addClass('hidden');
                }
            });

            jQuery('#donation-amount-block .amount-selector [name="custom-amount"]').on('focus', function(){
                jQuery('.other-amount').trigger('click');
            });
               
            //  add a row to the summary list
            jQuery('#add-donation').on('click', function(event){
                
                event.preventDefault();
               
                // get radio buttons value
                var amount = jQuery('#donation-amount-block .amount-selector [type="radio"]:checked').val();
                if(amount == 0)
                    amount = jQuery('#donation-amount-block .amount-selector [name="custom-amount"]').val().replace(/[^0-9]/gi, '');
                
                // get designation 
                var designationName = jQuery.trim( $('#donation-amount-block #designations').val() );
               
                // validate
                jQuery('.no-amount-selected.error').addClass('hidden');
                            
                if(amount == 0 || isNaN(amount)){
                    jQuery('.no-amount-selected.error').removeClass('hidden');
                    return;
                }
                
                if(designationName == ""){
                    designationName = "Donation";
                }                
                 
                // add a new row to the table
                var $tpl = jQuery('#donation-summary tr.row-tpl').clone().attr('class', 'donation-row');
                $tpl.find('input').each(function(){
                   jQuery(this).attr('name', jQuery(this).attr('name').replace('%d', event.timeStamp));                   
                });
                $tpl.find('.amount').val( accounting.formatMoney(amount) );
                $tpl.find('.designation').val( jQuery.trim(designationName) );
                jQuery('#donation-summary .total-row').before($tpl);
              
                jQuery("#designations").val(""); // reset field value. IMPORTANT: this causes HTML5 to mark it invalid. Dont know why
                
                // calculate total 
                pages.onlineDonationForm.calculateTotal();
                pages.onlineDonationForm.toggleSummary();
                
                return false;
            });  
            
            jQuery('#donation-summary').on('click', '.remove-btn', function(event){
                
                jQuery(this).closest('tr').remove();
                pages.onlineDonationForm.calculateTotal();
                pages.onlineDonationForm.toggleSummary();
            });
                      
            jQuery('#paypal-form').on('submit', function(e, options){
               
                options = options || {};
                
                if(!options.submit_to_paypal){
                    
                    e.preventDefault();

                    /*if($('#donation-summary .donation-row').length < 1){
                        
                        $('.no-amount-selected.error').removeClass('hidden');
                        $("html, body").animate({ scrollTop: $('.amount-selector input:first').offset().top }, 600);
                        return false;
                    }*/
                    if (jQuery('input[name="donation-amount[]"]:checked', '#paypal-form').val()=='0') {
                        jQuery('#amount').val(jQuery('#custom-amount').val());
                        jQuery('#a3').val(jQuery('#custom-amount').val());
                    } else {
                        jQuery('#amount').val(jQuery('input[name="donation-amount[]"]:checked', '#paypal-form').val());
                        jQuery('#a3').val(jQuery('input[name="donation-amount[]"]:checked', '#paypal-form').val());
                    }
                    
                    var frequency = jQuery('.frequency-selector [type="radio"]:checked').val();

                    // recurring payments
                    if(frequency == 'monthly'){
                        jQuery("#cmd").val('_xclick-subscriptions');
                        jQuery("#t3").val('M');
                        jQuery("#src").val('1');
                        jQuery("#srt").val(jQuery("#duration").val());
                        jQuery("#p3").val('1');
                    }else if (frequency == 'yearly'){
                        jQuery("#cmd").val('_xclick-subscriptions');
                        jQuery("#t3").val('Y');
                        jQuery("#src").val('1');
                        jQuery("#srt").val(jQuery("#duration").val());
                        jQuery("#p3").val('1');
                    }else if (frequency == 'quarterly'){
                        jQuery("#cmd").val('_xclick-subscriptions');
                        jQuery("#t3").val('M');
                        jQuery("#p3").val('4'); // every 4 months
                        jQuery("#src").val('1');
                        jQuery("#srt").val(jQuery("#duration").val()); // times
                    }else{                        
                        jQuery("#cmd").val('_donations');
                    }
                    
                    // Test daily donations. use like: ?test=daily
                    if(getUrlParameter('test') === 'daily')
                    {
                        jQuery("#cmd").val('_xclick-subscriptions');
                        jQuery("#t3").val('D');
                        jQuery("#p3").val('1');
                        jQuery("#src").val('1');
                        jQuery("#srt").val(7); // 7 times                        
                    }                    
                    
                    // $("span.ajax-result").html("going ajax");                 
                    var formData = jQuery('#paypal-form').serialize();
                    console.log(formData);
                    jQuery.post("/donations&action=new_donation", formData, function(result){

                        jQuery("span.ajax-result").html(result.message);
                   
                        if(result.success){
                            jQuery('#donation_id').val(result.post_id);
                            jQuery('#paypal-form').trigger('submit', { 'submit_to_paypal': true });
                        } else {
                            
                            jQuery('.no-amount-selected.error').addClass('hidden');
                            
                            var $first = null;
                            jQuery.each(result.invalid_fields, function(i, el){
                              
                                if($first == null)
                                    $first = jQuery('[name="'+el+'"]');
                               
                                jQuery('[name="'+el+'"]').addClass('error');
                            });
                        
                            if($first.attr('id') === 'amount'){
                                jQuery('.no-amount-selected.error').removeClass('hidden');
                                jQuery("html, body").animate({ scrollTop: jQuery('.amount-selector input:first').offset().top }, 600);
                            } else{
                                
                                $first.focus();
                            }
                                
                        }
                    }, "json");
                }
            });            
        },
        toggleSummary : function(){ 
            
            if(!jQuery('#donation-summary tr.donation-row').size())
                jQuery('#donation-summary').addClass('hidden');  
            else
                jQuery('#donation-summary').removeClass('hidden');  
            
        },
        calculateTotal : function(){ 
            
            var total = 0.0;
            
            jQuery('#donation-summary tr.donation-row').each(function(){
                var row = jQuery(this).find('.amount').val();
                total+=parseFloat( accounting.unformat(row) );        
            });
            
            jQuery('#amount-preview').text( accounting.formatMoney(total) );
            jQuery('#amount').val( total);
            jQuery('#a3').val( total);
        },
        validate : function(){ 
            
            jQuery("#paypal-form").validate({ 
                ignore: "#designations",
                rules: {                    
                    designations:{
                        required: false  
                    },
                    duration:{
                        required: function(element) {
                            return (jQuery(".frequency-selector input:radio").val() !== 'once')
                        }
                    },
                    phone: {
                        required: true,
                        phoneUS: true
                    },
                    class_of: {
                        number: true
                    }
                },
                errorPlacement: function(error, element) {} 
            });
        }   
    },    
    affinityGroup: {
        init : function() {
            postTypes.affinityGroup.events();
            postTypes.affinityGroup.validate();
        },
        events : function() {
            var accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
            jQuery.validator.addMethod("specialChars", function( value, element ) {
                var regex = new RegExp("^[a-zA-Z"+accentedCharacters+" , .]+$");
                var key = value;

                if (!regex.test(key)) {
                   return false;
                }
                return true;
            });

        },
        validate : function() {
        
             jQuery(".wpcf7 form").validate({
                rules: {
                    phone: {
                        required: true,
                        phoneUS: true
                    },
                    first_name:{
                        required: true,
                        specialChars: true
                    },
                    last_name:{
                        required: true,
                        specialChars: true
                    },
                    address:{
                        required: true
                    },
                    city:{
                        required: true
                    },
                    state:{
                        required: true
                    },
                    zip:{
                        required: true
                    },
                    country:{
                        required: true
                    },
                    email:{
                        required: true
                    },
                    profession:{
                        required: true
                    }
                },
                errorPlacement: function(error, element) {} 
            });
        
        }
    },    
    contactUs : {
        init : function() {
          
            pages.contactUs.events();
            pages.contactUs.validate();
        },
        events : function() {

            var accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
            jQuery.validator.addMethod("specialChars", function( value, element ) {
                var regex = new RegExp("^[a-zA-Z"+accentedCharacters+" , .]+$");
                var key = value;

                if (!regex.test(key)) {
                   return false;
                }
                return true;
            });

        },
        validate : function() {
        
             jQuery(".wpcf7 form").validate({
                rules: {
                    name: {
                        required: true,
                        specialChars: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {                      
                      phoneUS: true
                    },
                    subject: {
                        required: true
                    },
                    message: {
                        required: true
                    }
                }
            });
            
        }
    },
    alumniEventsCalendar : {
        init: function(){
            pages.alumniEventsCalendar.events();
        },
        events : function(){
            $("div.ai1ec-date-block-wrap a.ai1ec-load-view").prop('disabled', true);
        }
    },
    reservationForm : {
        init : function(){
            pages.reservationForm.events();
            pages.reservationForm.validate();
        },
        events : function(){
            
            jQuery('#reservation-form').on('submit', function(e){
               
                e.preventDefault();

                if(!jQuery('#reservation-form').valid())
                    return;
                
                var formData = jQuery('#reservation-form').serialize();
                jQuery.post("/reservation-form&action=event_reservation", formData, function(result){

                    // $("span.ajax-result").html(result.message);

                    if(result.success){
                        window.location.href = '/thank-you?status=reservation-done';
                    } else {
                        var invalid_fields = result.invalid_fields.split(',');
                        jQuery.each(invalid_fields, function(i){
                            jQuery("[name='"+invalid_fields[i]+"']").addClass('error');
                        });
                    }
                }, "json");
                
            });

            
            var accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
            jQuery.validator.addMethod("specialChars", function( value, element ) {
                var regex = new RegExp("^[a-zA-Z"+accentedCharacters+" , .]+$");
                var key = value;

                if (!regex.test(key)) {
                   return false;
                }
                return true;
            });
            
            
        },
        validate : function(){
           
            jQuery("#reservation-form").validate({ 
                rules: {
                    phone: {
                      required: true,
                      phoneUS: true
                    },                    
                    first_name:{                        
                        specialChars: true
                    },
                    last_name:{                        
                        specialChars: true
                    },
                },
                errorPlacement: function(error, element) {} 
            });
        }
    },
    default : {

        init : function(){
            // DUMMY PAGE
        }
    }
};





jQuery(document).ready(function () {
    var pageName = currentPageName.replace(/-([a-z])/gi, function(s, group1) { return group1.toUpperCase(); });        
    var postType = currentPostType.replace(/_([a-z])/gi, function(s, group1) { return group1.toUpperCase(); });
    
    if(postType == 'ai1ecEvent') postType = 'event';
    
    if(typeof pages[pageName] !== 'undefined' && typeof pages[pageName].init === 'function')
        pages[pageName].init();
    if(postType == 'event' && typeof pages[postType] !== 'undefined' && typeof pages[postType].init === 'function')
        pages['event'].init();
   
    pages.init();

    mbl = jQuery(window).width();
    if(mbl < 991){
        jQuery(".right-top-bar .menu-mbl-trigger").click(function(){
            jQuery(".site-header-menu").slideToggle();
        });
    }
});



/* Public Functions */

function isValidDate(dateStr) {
    
    if(typeof dateStr === 'undefined')
        return false;

    var comp = dateStr.split('-');
    var y = parseInt(comp[0], 10);
    var m = parseInt(comp[1], 10);
    var d = parseInt(comp[2], 10);
    var date = new Date(y,m-1,d);
    if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
      return true;
    } else {
      return false;
    }

};

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) 
        {
            return sParameterName[1];
        }
    }
    return null;
}     
/* END Public Functions */

       
