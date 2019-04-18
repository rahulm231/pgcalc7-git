(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.custom_pgcalc = {
		attach: function(context, settings) { 
		  
		  /* change registration deadline on change of start date and time */
		  $(".node-events-form #edit-field-event-date-und-0-value-datepicker-popup-0").change(function(){
		  	var startdate = $(".node-events-form #edit-field-event-date-und-0-value-datepicker-popup-0").val();
		  	var starttime = $(".node-events-form #edit-field-event-date-und-0-value-timeEntry-popup-1").val();
		  	$(".node-events-form #edit-field-registration-deadline-und-0-value-datepicker-popup-0").val(startdate);
		  	$(".node-events-form #edit-field-registration-deadline-und-0-value-timeEntry-popup-1").val(starttime);
		  });
		  
		  $(".node-events-form #edit-field-event-date-und-0-value-timeEntry-popup-1").change(function(){
		  	var startdate = $(".node-events-form #edit-field-event-date-und-0-value-datepicker-popup-0").val();
		  	var starttime = $(".node-events-form #edit-field-event-date-und-0-value-timeEntry-popup-1").val();
		  	$(".node-events-form #edit-field-registration-deadline-und-0-value-datepicker-popup-0").val(startdate);
		  	$(".node-events-form #edit-field-registration-deadline-und-0-value-timeEntry-popup-1").val(starttime);
		  });
		  
		  /* remove Clone of from node title when cloned */
		 
		  if(window.location.href.indexOf("clone") > -1) {
		  	clongString = $(".node-form #edit-title").val();
	        clongString = clongString.replace("Clone of ",'');
	        $(".node-form #edit-title").val(clongString);
	      }
	      
	      /* Uncheck generate automatic alias */
	     // $(".node-events-form #edit-path-pathauto").prop("checked", false );
		  
          // default price set zero in software traning event.
          $(".node-type-events #field-webinar-cd-online-und-form-commerce-price-add-more-wrapper input[type=text]").val("0");
          $(".node-type-events #field-webinar-cd-online-und-form-commerce-price-add-more-wrapper input[type=text]").prop("readonly", true);
		  
//                  if(jQuery('button:eq(1) a').html() == "undefined"){ 
//                      alert("Yes"); 
//                  } else { 
//                     alert("No"); 
//                  }

              jQuery('fieldset label[class="option"]:contains("N/A")').text("Product Actual Price").css({"font-weight":'bolder',"color":'brown'});
              jQuery("td.inline-entity-form-commerce_product-field_training_discount:empty").text("Product Actual Price").css({"font-weight":'bolder',"color":'brown'});
              
              /********************** Software page clear button ******************/
//              if(jQuery('.node-type-events .form-item-rent-laptop-computer .rest-button').html()!='Clear'){
//                jQuery('.node-type-events .form-item-rent-laptop-computer').append("<div class='btn btn-default rest-button'>Clear</div>");
//                }
                jQuery(".node-type-events .form-item-rent-laptop-computer .rest-button").click(function(){
                    window.location.reload();
                    jQuery('.node-type-events input[type="radio"]').prop("checked", false);
                    jQuery('.node-type-events input[type="checkbox"]').prop("checked", false);
                });
               
                jQuery('.webinar-default-price input[type="radio"]:first').click(function(){
                    //alert('111');
                    jQuery('input[type="radio"]:eq(1)').prop('checked',false);
                    jQuery('.form-item-attributes-field-training-discount input[type="radio"]:eq(2)').prop('checked', false);
                });
                jQuery('input[type="radio"]:eq(1)').click(function(){
                    //alert('222');
                    jQuery('.webinar-default-price input[type="radio"]:first').prop('checked',false);
                    jQuery('.form-item-attributes-field-training-discount input[type="radio"]:eq(2)').prop('checked', false);
                });
                jQuery('.form-item-attributes-field-training-discount input[type="radio"]:eq(2)').click(function(){
                   // alert('333');
                    jQuery('input[type="radio"]:eq(1)').prop('checked',false);
                    jQuery('.webinar-default-price input[type="radio"]:first').prop('checked', false);
                });
                 jQuery('label[for="edit-attributes-field-training-discount"]').hide();
              /********************** Software page clear button ******************/  
              
	    }
	}

})(jQuery, Drupal, this, this.document);

