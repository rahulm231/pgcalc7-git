jQuery(document).ready(function () {
    /*
     * @ProductType : Gift Calcs (This code is applied on all commerce product).
     * @Codition    : Shoppers must purchase setup AND service.
     * @Desc        : When user purchase "GiftCalcs Setup" must purchase "GiftCalcs Service".
     * @Date        : 10/May/2016
     * @author      : Vishal Sirsodiya
     * @note        : This code is applied on all commerce product.
     */
    /*************** payment page *************/
     // Add string in cradit cart option
   // jQuery('.commerce_payment.panel.panel-default.form-wrapper > .panel-heading').replaceWith("All credit card information (and other information) that you enter on this form will be sent to a secure server using SSL encryption technology.<br /><br /><b>Payment information</b><br /><br />");
    
    jQuery('.commerce_payment.panel.panel-default.form-wrapper > .panel-heading').replaceWith("<br /><b>Payment information</b><br />");
    jQuery('input#edit-commerce-payment-payment-method-firstdata-gge4-wscommerce-payment-firstdata-gge4-ws').after("Pay with ");
    jQuery(jQuery('#customer-profile-billing-field-billing-e-mail-add-more-wrapper').html()).insertBefore('.field-name-commerce-customer-address .addressfield-container-inline.locality-block.country-US');
   jQuery('.field-name-field-billing-e-mail #customer-profile-billing-field-billing-e-mail-add-more-wrapper').remove();
    
    
     jQuery(jQuery('.field-type-text.field-name-field-billing-organization').html()).insertAfter('.addressfield-container-inline.name-block');
     jQuery('.panel-body > .field-type-text.field-name-field-billing-organization').remove();
    
   /******************************************************************************************************/
   
   // jQuery('.node-type-commerce-product button[type="submit"]').prop("disabled", true);
    // First checkbox "checked" As per requirment
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-giftcalcs-service-12').prop("checked", true);
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-giftcalcs-service-12').ready(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-giftcalcs-service-12').prop("checked")===true){
            jQuery('.node-type-commerce-product button[type="submit"]').show(); //.prop("disabled", false);
        }
    });
    jQuery('.node-type-commerce-product input[type="checkbox"]').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]:eq(1)').prop("checked")===true){
           jQuery('.node-type-commerce-product button[type="submit"]').show(); //.prop("disabled", false);
        } else {
           jQuery('.node-type-commerce-product button[type="submit"]').hide(); //.prop("disabled", true);
        }
    });
    /********************* Gift Calcs ************************/
    //Add not for product
    //jQuery('.node-type-commerce-product .commerce-product-giftcalcs-service').after("<div class='giftcalcs-service-note'>Shoppers must purchase setup AND service.</div>");
    
    /********************** canadian-manual-service ***********************/
    // Add not for product
    jQuery('.node-type-commerce-product .commerce-product-canadian-manual-service').after("<div class='canadian-manual-service-note'>For Canadian Manual, license fee ONLY charged at purchase.</div>");
    // First checkbox "checked" As per requirment
//    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-canadian-manual-service').prop("checked", true);
    
    /****************************************************************************************/
    
    
    /*************************** Cart Page ********************************/
    /******************* gift_calcs product type ******************/
    // gift_calcs : quantity update.
    jQuery('.page-cart .gift_calcs input[type="text"]').change(function(){
        jQuery('.page-cart .giftcalcs_service-12 input[type="text"]').val(jQuery('.page-cart .gift_calcs input[type="text"]').val());
    });
    // gift_calcs : Reverse
    jQuery('.page-cart .giftcalcs_service-12 input[type="text"]').change(function(){
        jQuery('.page-cart .gift_calcs input[type="text"]').val(jQuery('.page-cart .giftcalcs_service-12 input[type="text"]').val());
    });
    
    /******************* pgm_license_primary product type ******************/
    jQuery('.page-cart .pgm_license_primary input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .pgm_service_primary input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .pgm_additional input[type="text"]').change(function(){
        jQuery('.page-cart .pgm_additional_service input[type="text"]').val(jQuery('.page-cart .pgm_additional input[type="text"]').val());
    });

    jQuery('.page-cart .pgm_additional_service input[type="text"]').change(function(){
        jQuery('.page-cart .pgm_additional input[type="text"]').val(jQuery('.page-cart .pgm_additional_service input[type="text"]').val());
    });
    
    /******************* gam_license product type ******************/
    jQuery('.page-cart .gam_license input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .gam_service input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .gam_additional input[type="text"]').change(function(){
        jQuery('.page-cart .gam_additional_service input[type="text"]').val(jQuery('.page-cart .gam_additional input[type="text"]').val());
    });

    jQuery('.page-cart .gam_additional_service input[type="text"]').change(function(){
        jQuery('.page-cart .gam_additional input[type="text"]').val(jQuery('.page-cart .gam_additional_service input[type="text"]').val());
    });
    
    /******************* cga_manual_electronic product type ******************/
    jQuery('.page-cart .cga_manual_electronic_primary input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .cga_manual_electronic_service input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .cga_manual_electronic_addl input[type="text"]').change(function(){
        jQuery('.page-cart .cga_manual_electronic_additional input[type="text"]').val(jQuery('.page-cart .cga_manual_electronic_addl input[type="text"]').val());
    });
    jQuery('.page-cart .cga_manual_electronic_additional input[type="text"]').change(function(){
        jQuery('.page-cart .cga_manual_electronic_addl input[type="text"]').val(jQuery('.page-cart .cga_manual_electronic_additional input[type="text"]').val());
    });
    // add fieldset Vishal
    jQuery('.form-item-cga-manual-electronic-service, .form-item-cga-manual-electronic-addl, .form-item-cga-manual-electronic-additional').wrapAll("<fieldset></fieldset>");
    jQuery('fieldset:first .form-item-cga-manual-electronic-service').before("<legend>Electronic Edition</legend>");
    //<legend></legend>
    
    /******************* cga_manual_bundle_primary product type ******************/
    jQuery('.page-cart .cga_manual_bundle_primary input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .cga_manual_bundle_primary_servic input[type="text"]').prop("disabled", true);
    jQuery('.form-item-cga-manual-bundle-primary, .form-item-cga-manual-bundle-primary-servic, .form-item-cga-manual-bundle-addl, .form-item-cga-manual-bundle-addl-service').wrapAll("<fieldset></fieldset>");
    jQuery('fieldset:eq(1) .form-item-cga-manual-bundle-primary').before("<legend>Electronic and Print Editions Combo</legend>");
    //<legend></legend>

    /******************* cga_manual_print product type ******************/
    jQuery('.page-cart .cga_manual_print_primary input[type="text"]').prop("disabled", true);
    jQuery('.page-cart .cga_manual_print_primary_service input[type="text"]').prop("disabled", true);
    jQuery('.form-item-cga-manual-print-primary, .form-item-cga-manual-print-primary-service, .form-item-cga-manual-print-addl, .form-item-cga-manual-print-addl-service').wrapAll("<fieldset></fieldset>");
    jQuery('fieldset:eq(2) .form-item-cga-manual-print-primary').before("<legend>Print Edition</legend>");
    //<legend>Print</legend>
    
    /*************************Checkout Page ****************************/
    jQuery('.checkout-buttons button[type="submit"]#edit-continue').html('Submit');
    jQuery('.checkout-buttons button[type="submit"]#edit-cancel').html('Back');
    
    /*****************************************************************/
    jQuery('input[title="Quantity"]').attr("type","number");
    jQuery('input[title="Quantity"]').attr("min","1");
    
    /**************************** total price calculate *************************************/
    jQuery('input[type="number"]').change(function() {
        var priceString =jQuery(this).closest('tr').find('.views-field-commerce-unit-price').html().trim();
        var priceVal = priceString.substring(1, priceString.length-3);
        var qty = jQuery(this).val();
        var total = priceVal*qty;

        jQuery(this).closest('tr').find('.views-field-commerce-total').html('$'+total+'.00');

        var sum = 0;
        jQuery('td.views-field-commerce-total').each(function(){
            var priceString = jQuery(this).html().trim();
            var priceVal = priceString.substring(1, priceString.length-3);
            priceVal = priceVal.replace(',','');
            sum += parseFloat(priceVal);  // Or this.innerHTML, this.innerText
        });     
        jQuery('.line-item-total-raw').html('$'+sum+'.00');
    
    });
    /********************************************************************/
    jQuery("input[type='number']").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    /******************* line item select box label change ******************/
    jQuery('.field-name-field-attendee-state option[value="_none"]').text("Select a State");
    // checkout page
    jQuery('.form-item-customer-profile-billing-commerce-customer-address-und-0-administrative-area option[value=""]').text("Select a State");
    // commerce product : add default price checkbox for every commerce product
    jQuery(".node-type-commerce-product .commerce-product-title:eq(0)").prepend('<input type="checkbox" checked="checked" />'+" ");
    // default product remove for cga.
    jQuery("#node-204 .commerce-product-title:eq(0)").remove();
    jQuery("#node-204 .field-name-commerce-price:eq(0)").remove();
    //jQuery('.node-type-commerce-product .field-type-commerce-price div:eq(1)').append(" "+jQuery(".page-title").text()+"  ");
     jQuery(".commerce-product-title-label").css({"display":'none'});
//

    /******************* gift_calcs product rules start ******************/
    if(window.location.pathname == '/commerce/giftcalcs' || window.location.pathname == '/commerce/gift-annuity-manager' || window.location.pathname == '/commerce/planned-giving-manager' || window.location.pathname == '/commerce/charitable-gift-annuities-complete-resource-manual'){
        jQuery('button[type="submit"]').html("Buy");
        jQuery('input[type="checkbox"]:first').click(function(){
            if(jQuery('.node-type-commerce-product input[type="checkbox"]:first').prop("checked") == true){
                jQuery('button[type="submit"]').show();//.prop("disabled", false);
                jQuery('.node-type-commerce-product input[type="checkbox"]:eq(1)').prop("checked", true);
            } else {
                 jQuery('button[type="submit"]').hide(); //.prop("disabled", true);
                jQuery('.node-type-commerce-product input[type="checkbox"]:eq(1)').prop("checked", false);
            }
        });
       jQuery('input[type="checkbox"]:eq(1)').click(function(){
           if(jQuery('.node-type-commerce-product input[type="checkbox"]:eq(1)').prop("checked") == true){
                jQuery('button[type="submit"]').show();
                jQuery('.node-type-commerce-product input[type="checkbox"]:first').prop("checked", true);
            } else {
                jQuery('button[type="submit"]').hide();
                jQuery('.node-type-commerce-product input[type="checkbox"]:first').prop("checked", false);
            }
       });
    }
    /******************* gift_calcs product rules end ******************/
    /******************* First 2 checkbox disable (PGM & GAM) ******************/
     if(window.location.pathname == '/commerce/gift-annuity-manager' || window.location.pathname == '/commerce/planned-giving-manager'){
        jQuery('input[type="checkbox"]:first, input[type="checkbox"]:eq(1)').click(function(){ 
            jQuery('.node-type-commerce-product input[type="checkbox"]:first').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]:eq(1)').prop("checked", true);
            jQuery('button[type="submit"]').show();
        }); 
        jQuery('input[type="checkbox"]:first, input[type="checkbox"]:eq(1)').css({"opacity":'.5',"cursor": 'not-allowed'});
     }
    /********************************* Commerce Product Order *******************************************************/
    /********** pgm *********/
        jQuery('.form-item-pgm-additional').hide();
        jQuery('<div class="form-item form-item-pgm-additional form-type-checkbox checkbox">'+jQuery('.form-item-pgm-additional').html()+'</div>').insertBefore('.form-item-pgm-additional-service');
    /********** gam *********/    
        jQuery('.form-item-gam-additional').hide();
        jQuery('<div class="form-item form-item-gam-additional form-type-checkbox checkbox">'+jQuery('.form-item-gam-additional').html()+'</div>').insertBefore('.form-item-gam-additional-service');
    /********** cga-electronic *********/    
        jQuery('<div class="form-item form-item-cga-manual-electronic-primary form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-electronic-primary').html()+'</div>').insertBefore('.form-item-cga-manual-electronic-additional');
        jQuery('.form-item-cga-manual-electronic-primary:eq(1)').remove();
        jQuery('<div class="form-item form-item-cga-manual-electronic-service form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-electronic-service').html()+'</div>').insertBefore('.form-item-cga-manual-electronic-additional');
        jQuery('.form-item-cga-manual-electronic-service:eq(1)').remove();
        jQuery('<div class="form-item form-item-cga-manual-electronic-addl form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-electronic-addl').html()+'</div>').insertBefore('.form-item-cga-manual-electronic-additional');
        jQuery('.form-item-cga-manual-electronic-addl:eq(1)').remove();
    
    /********** cga-electronic-print *********/
        jQuery('<div class="form-item form-item-cga-manual-bundle-primary form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-bundle-primary').html()+'</div>').insertBefore('.form-item-cga-manual-bundle-addl');
        jQuery('.form-item-cga-manual-bundle-primary:eq(1)').remove();
        jQuery('<div class="form-item form-item-cga-manual-bundle-primary-servic form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-bundle-primary-servic').html()+'</div>').insertBefore('.form-item-cga-manual-bundle-addl');
        jQuery('.form-item-cga-manual-bundle-primary-servic:eq(1)').remove();
    /********** cga-print *********/
        jQuery('<div class="form-item form-item-cga-manual-print-primary form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-print-primary').html()+'</div>').insertBefore('.form-item-cga-manual-print-addl');
        jQuery('.form-item-cga-manual-print-primary:eq(1)').remove();
        jQuery('<div class="form-item form-item-cga-manual-print-primary-service form-type-checkbox checkbox">'+jQuery('.form-item-cga-manual-print-primary-service').html()+'</div>').insertBefore('.form-item-cga-manual-print-addl');
        jQuery('.form-item-cga-manual-print-primary-service:eq(1)').remove();
    /********************************* Gift-annuity-manager Rules *******************************************************/   
    /******************** gam-service Rule Start *************************/
    // First checkbox "checked" As per requirment
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-service').prop("checked", true);
     // Shoppers must purchase license AND service in similar quantities. 
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional:first').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional:first').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional-service').prop("checked", true);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional-service').prop("checked", false);
        }
    });
    // Reverse : Shoppers must purchase license AND service in similar quantities.
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional').prop("checked", true);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-gam-additional').prop("checked", false);
        }
    });
    /******************** gam-service Rule End *************************/
    /********************* pgm-service Rules Start ************************/
//       jQuery('.node-type-commerce-product .commerce-product-pgm-service-primary  .field-name-commerce-price').after("<div class='pgm-service-primary-note'>Shoppers must purchase license AND service in similar quantities.</div>");
    // First checkbox "checked" As per requirment
      jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-service-primary').prop("checked", true);
    // Shoppers must purchase license AND service in similar quantities. 
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional-service').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional-service').prop("checked", false);
        }
    });
    // Reverse : Shoppers must purchase license AND service in similar quantities.
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-pgm-additional').prop("checked", false);
        }
    });
    /********************* pgm-service Rules End ************************/
    /******************** cga-manual-electronic-service *************************/
    if(window.location.pathname == '/commerce/charitable-gift-annuities-complete-resource-manual'){
    // First checkbox "checked" As per requirment
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", true);
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked", true);
    //Shoppers must purchase license AND service in similar quantities.
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked", true);
            //jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show(); //.prop("disabled", false);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-additional').prop("checked", false);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked", false);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-addl').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
            

        }
    });
    // Reverse : Shoppers must purchase license AND service in similar quantities.
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show(); //.prop("disabled", false);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //edit-cga-manual-electronic-addl
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-addl').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-addl').prop("checked")===true){
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", true); 
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked", true);
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-additional').prop("checked", true);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-additional').prop("checked", false);
        }
    });
    
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-additional').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-additional').prop("checked")===true){
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked", true); 
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked", true);
           jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-addl').prop("checked", true);
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-addl').prop("checked", false);
        }
    });
    
    //CGA - Electronic & Print
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //Reverse : CGA - Electronic & Print
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //CGA - Electronic & Print - Additional
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl-service').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl-service').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //Reverse : CGA - Electronic & Print - Additional
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-addl').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    // CGA - Print
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //Reverse : CGA - Print
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    
    // CGA - Print - Additional
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl-service').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl-service').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    //Reverse : CGA - Print - Additional
    jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl-service').click(function(){
        if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl-service').prop("checked")===true){
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked", true);
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked", true);
            jQuery('.node-type-commerce-product button[type="submit"]').show();
        } else {
            jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-addl').prop("checked", false);
            jQuery('.node-type-commerce-product button[type="submit"]').hide();
        }
    });
    
        jQuery('.node-type-commerce-product input[type="checkbox"]').click(function(){
            if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-primary').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            }else if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-electronic-service').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            }else if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            }else if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-bundle-primary-servic').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            }else if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            }else if(jQuery('.node-type-commerce-product input[type="checkbox"]#edit-cga-manual-print-primary-service').prop("checked")===true){ jQuery('.node-type-commerce-product button[type="submit"]').show();
            } else {  jQuery('.node-type-commerce-product button[type="submit"]').hide(); 
            }
        });
    }
    /*************************localStorage Data for billing page **********************/
   jQuery('.commerce-add-to-cart button[type="submit"]').click(function(){
       localStorage.fullName = jQuery('input[name="line_item_fields[field_attendee_first_name][und][0][value]"]').val();
       localStorage.city = jQuery('input[name="line_item_fields[field_attendee_city][und][0][value]"]').val();
       localStorage.email = jQuery('input[name="line_item_fields[field_attendee_email][und][0][email]"]').val();
       localStorage.state = jQuery('select[name="line_item_fields[field_attendee_state][und]"]').val();
       localStorage.organization = jQuery('input[name="line_item_fields[field_attendee_organization][und][0][value]"]').val();
   });
   
    /***************** Checkout Page *********************/
    jQuery('.page-checkout button#edit-continue').click(function(){
       localStorage.fullName = jQuery('input[name="customer_profile_billing[commerce_customer_address][und][0][name_line]"]').val();
       localStorage.city = jQuery('input[name="customer_profile_billing[commerce_customer_address][und][0][locality]"]').val();
       localStorage.email = jQuery('input[name="customer_profile_billing[field_billing_e_mail][und][0][email]"]').val();
       localStorage.state = jQuery('select[name="customer_profile_billing[commerce_customer_address][und][0][administrative_area]"]').val();
       localStorage.organization = jQuery('input[name="customer_profile_billing[field_billing_organization][und][0][value]"]').val();
    });
   // alert(localStorage.organization);
    jQuery('input[name="customer_profile_billing[commerce_customer_address][und][0][name_line]"]').val(localStorage.fullName);
    jQuery('input[name="customer_profile_billing[field_billing_e_mail][und][0][email]"]').val(localStorage.email);
    jQuery('input[name="customer_profile_billing[commerce_customer_address][und][0][locality]"]').val(localStorage.city);
    jQuery('select[name="customer_profile_billing[commerce_customer_address][und][0][administrative_area]"]').val(localStorage.state);
    jQuery('input[name="customer_profile_billing[field_billing_organization][und][0][value]"]').val(localStorage.organization);
    
    /*************************localStorage Data for billing page **********************/
    /***********************Displaying Title Below Search Box ***********************************************/
   
        
       var first = window.location.pathname.split('/')[1];
        var second = window.location.pathname.split('/')[2];
        var url = "/"+first+"/"+second+"/";
         if(url == '/support/knowledge-base/'){        
             var xy = jQuery(".page-title").html();
        jQuery(".page-title").remove();
         jQuery("section#block-pgcalc-kb-public-menu").after("<h2 class='page-title-custom'>"+xy+"</h2>");

         }
          else if (url =='/support/knowledge-base')
          {

            jQuery('article > .field-name-body > .field-items > .field-item> h2').css('margin-top', '15px');             
          }    

    /**********************************************************************/
});
/*
 * handle ajax request : Software Training form 
 */
(function($) {
    
    Drupal.behaviors.custom_commerce_product = {
        attach: function (context, settings) {
return (window.jQuery = window.$ = jQuery);
            
            Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
                var _first_val = jQuery(".prod-price:first").text();
                var _second_val = jQuery(".prod-price:eq(1)").text();
                if(_first_val!=''){ localStorage['_first_val'] = _first_val;  } 
                if(_second_val!=''){ localStorage['_second_val'] = _second_val; }
            };
        }
    };
})(jQuery);