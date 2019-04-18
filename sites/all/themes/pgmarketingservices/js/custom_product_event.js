/*(function ($, Drupal, window, document, undefined) {
    Drupal.behaviors.custom_exposed_filters = {
        attach: function (context, settings) {*/

            jQuery(document).ready(function () {
//                jQuery('.node-type-events .form-type-checkbox .commerce-product-title-label').empty();
//                jQuery('.page-checkout .customer_profile_billing .panel-title').empty();
                jQuery('.page-checkout .form-item-customer-profile-billing-commerce-customer-address-und-0-country').css({"display": "none"});
                jQuery('.page-checkout .commerce_payment legend').before('<p>All credit card information (and other information) that you enter on this form will be sent to a secure server using SSL encryption technology.</p>');
                jQuery('.page-checkout .commerce_payment legend .panel-title').replaceWith('<b>Credit card information</b>');
                //Set "CD" title for webinar event.
                //06-05-2016 @vishal
                jQuery('.node-type-events input[name="webinar_cd"]').before("<div class='title-online'><strong>CD</strong></div>");
                //Set "Online" title for webinar event.
                //06-05-2016 @vishal
                jQuery('.node-type-events input[name="webinar_online"]').before("<div class='title-online'><strong>Online</strong></div>");
                
                /*******************************************************/
                //jQuery('.node-type-events button[type="submit"]#edit-submit').prop("disabled", true);
                // Webinar condition check.
                jQuery("#edit-webinar-cd").attr({type:"radio"});
                jQuery("#edit-webinar-cd0").attr({type:"radio"});
                // Default check
                //jQuery("#edit-webinar-cd").prop("checked", true);
                jQuery("#edit-webinar-cd").click(function(){
                    chkWebinarCDOnline();
                    if(jQuery("#edit-webinar-cd").prop("checked") === true){
                        jQuery("#edit-webinar-cd0").prop("checked", false);
                    } else { 
                        jQuery("#edit-webinar-cd0").prop("checked", true);
                    }
                });
                jQuery("#edit-webinar-cd0").click(function(){
                    chkWebinarCDOnline();
                    if(jQuery("#edit-webinar-cd0").prop("checked") === true){
                        jQuery("#edit-webinar-cd").prop("checked", false);
                    } else { 
                        jQuery("#edit-webinar-cd").prop("checked", true);
                    }
                });
                /*******************************************************/
                jQuery("#edit-webinar-online").attr({type:"radio"});
                jQuery("#edit-webinar-online0").attr({type:"radio"});
                 // Default check
                jQuery("#edit-webinar-online").prop("checked", true);
                jQuery("#edit-webinar-online").click(function(){
                    chkWebinarCDOnline();
                    if(jQuery("#edit-webinar-online").prop("checked") === true){
                        jQuery("#edit-webinar-online0").prop("checked", false);
                    } else { 
                        jQuery("#edit-webinar-online0").prop("checked", true);
                    }
                });
                jQuery("#edit-webinar-online0").click(function(){
                    chkWebinarCDOnline();
                    if(jQuery("#edit-webinar-online0").prop("checked") === true){
                        jQuery("#edit-webinar-online").prop("checked", false);
                    } else { 
                        jQuery("#edit-webinar-online").prop("checked", true);
                    }
                });
                /*******************************************************/
                jQuery('.node-type-events .form-item-webinar-additional').append("<div class='btn btn-default rest-button'>Clear</div>");
                jQuery(".node-type-events .rest-button").click(function(){
                    jQuery("#edit-webinar-online0").prop("checked", false);
                    jQuery("#edit-webinar-online").prop("checked", false);
                    jQuery("#edit-webinar-cd").prop("checked", false);
                    jQuery("#edit-webinar-cd0").prop("checked", false);
                    jQuery("#edit-webinar-additional").prop("checked", false);
                     chkWebinarCDOnline();
                });
                /*******************************************************/
//                jQuery('.page-cart .page-title').replaceWith("<span class='page-title'>Registered Events</span>");
//                jQuery('.page-checkout .page-title').replaceWith("<span class='page-title'>Registered Events</span>");
                
                //jQuery('.page-checkout .commerce_payment .form-radios .radio:first').css({"display": "none"});
                //jQuery('.page-checkout .commerce_payment .form-radios #edit-commerce-payment-payment-method-firstdata-gge4-wscommerce-payment-firstdata-gge4-ws').before('Bill the following credit card (PG Calc accepts payment by Master Card, Visa, American Express, Diner\'s Club, and Discover.)');
//                jQuery('.page-checkout .commerce_payment .form-radios input').next('label').text('your text');
            /*
             * @returns {undefined}
             */
//                if(jQuery('form .hide').hasClass("Additional")==false){
//                    jQuery(".views-field-edit-quantity").replaceWith('<div class="hide">Quantity</div>');
//                }
                // cart page table hide when cart total price is zero.
                if(jQuery('.page-cart form .line-item-total .line-item-total-raw').html() === '$0.00'){
                    jQuery('.block-system form').css({"display":"none"});
                    jQuery('.page-cart .region-content section').before().text("Your shopping cart is empty.");
                }
                // add to cart msg hide for "Fundamentals of Planned Giving Webinar Series" product because price is zero.
                if(jQuery('.page-cart .alert ul li em.placeholder:first').html()==='Fundamentals of Planned Giving Webinar Series'){
                    jQuery('.page-cart .alert ul li:first').css({"display":'none'});
                }
                /*
                 * @returns {undefined}
                 */
                if(jQuery('#commerce-cart-add-to-cart-form-47-48 button:eq(1)').val()=='Back'){
                    jQuery('#commerce-cart-add-to-cart-form-47-48 button:eq(1)').hide();
                }
                /*
                 * Event(webinar) price not editable.
                 */
                jQuery("input#edit-field-webinar-cd-online-und-form-commerce-price-und-0-amount").val('0.00').prop("readonly", true).css({"border":'0px'});
                /*
                 * Software training page : cast lable change with product name.
                 */                
                //jQuery('.node-type-events .field-name-field-event-type .field-label').html(jQuery('.page-title').html()+' Cost:');
                var a = jQuery('.breadcrumb a').each(function () {

                                 jQuery(this).text();
                        })

                jQuery('.node-type-events .field-name-field-event-type .field-label').html('<div class="webinar-h3">Software Training Registration Forms</div><div class="webinar-h2">Select the fee for which you qualify.</div>');

              if(a[3].firstChild.data == 'Software Training')
                {
                    jQuery('.node-type-events .field-name-field-event-type .field-items').html('<div class="webinar-default-price"><input type="radio" name="attributes[field_training_discount]" checked="checked" class="webinar-default" /> First Attendee Fee: '+jQuery('.node-type-events .field-name-field-event-type .field-items').html()+'</div>');
                }
                else
                    {
                     jQuery('.node-type-events .field-name-field-event-type .field-items').html('<div class="webinar-default-price"><input type="radio" name="attributes[field_training_discount]" checked="checked" class="webinar-default" /> Standard Fee: '+jQuery('.node-type-events .field-name-field-event-type .field-items').html()+'</div>');
                        }

                jQuery('.node-type-events .field-name-field-event-product-attributes input[type="radio"]').click(function(){
                    jQuery('.node-type-events .field-name-field-event-type .field-items input[type="radio"]').prop("checked", false);
                });
                jQuery('.node-type-events .field-name-field-event-type .field-items input[type="radio"]').click(function(){
                  jQuery('.node-type-events .field-name-field-event-product-attributes input[type="radio"]').prop("checked", false);
                  window.location.reload();
                });
                jQuery('.node-type-events .form-item-rent-laptop-computer .btn.btn-default.rest-button').remove();
                
                    /************ show email on payment complate page. *****************/
                // alert("Yesss");
                 jQuery(".page-checkout-complete .checkout-completion-message p > span").text(localStorage.email);

            });
        /*}
    }
})(jQuery, Drupal, this, this.document);*/
/*
 * @desc : Check User product check/unchecked.
 */
function chkWebinarCDOnline(){
    if(jQuery("#edit-webinar-cd").prop("checked")===true || jQuery("#edit-webinar-cd0").prop("checked")===true || jQuery("#edit-webinar-online").prop("checked")===true || jQuery("#edit-webinar-online0").prop("checked")===true){
        jQuery('.node-type-events button[type="submit"]#edit-submit').prop("disabled", false);
    } else {
        jQuery('.node-type-events button[type="submit"]#edit-submit').prop("disabled", true);
    }
}
