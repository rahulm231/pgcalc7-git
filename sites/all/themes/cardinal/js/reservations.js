// Allow Zero Dollar Reservations
jQuery(document).ready(function($){
  //you can now use $ as your jQuery object.
	
	$('.event-sections-container .give-form-section').hide();
	$('#checkout_btn').hide();
	
	var event_id = $('#event_id').val();
	
	$('#reserve_btn').attr('href', '/reservation-form?event-id='+event_id);
	
	$('#paypal-form .section-item-cbox').change(function() {

    	var total = $('#total_amount').val();
    	
    	if(total > 0){
	    	$('.event-sections-container .give-form-section').show();
			$('#checkout_btn').show();
			$('#reserve_btn').hide();
    	} else{
	    	$('.event-sections-container .give-form-section').hide();
			$('#checkout_btn').hide();
			$('#reserve_btn').show();
    	}
    	
    	var is_checked = false;
    	
    	$('#paypal-form .section-item-cbox').each(function(){
	    	if($(this).is(":checked")) {
		    	is_checked = true;
		    }
    	});

		if(is_checked === false && total > 0){
			$('#reserve_btn').hide();
		}
		
	 });
	 

});
