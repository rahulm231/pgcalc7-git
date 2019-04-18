(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.custom_event_display = {
		attach: function(context, settings) { 
		 // Toggle between Calendar and List View 
		  var getView = settings.default_event_view;
		  var cookieFlag = settings.delete_event_view_cookie;
		  var cookieSet = settings.event_display_cookie;
		  
		  if (window.location.host == "localhost"){
	    	var goToUrl = 'http://'+window.location.host+'/pg-calc/custom_event_display/setcookie';
	      }else{
	    	var goToUrl = 'http://'+window.location.host+'/custom_event_display/setcookie';
	      }
	     // console.log(cookieSet);
	      
		  if(cookieSet=="list"){
		  	  $('.view-calendar-view').css("visibility", "hidden");
		  	  $('.view-calendar-view').css("height", "0px");
		  	  $('.view-event-list-view').css("visibility", "visible");
		  	  $('.view-event-list-view').css("height", "");
		  }else{
		  	  $('.view-calendar-view').css("visibility", "visible");
		  	  $('.view-calendar-view').css("height", "");
		  	  $('.view-event-list-view').css("visibility", "hidden");
		  	  $('.view-event-list-view').css("height", "0px");
		  }
				
		  $('#event-display-toggle span.btnListView').click(function(){		
		  	
		    $('.view-event-list-view').css("visibility", "visible");
		    $('.view-event-list-view').css("height", "");
		    $('.view-calendar-view').css("visibility", "hidden");
		    $('.view-calendar-view').css("height", "0px");
		    
		    $.ajax({
		        url: goToUrl,
		        data: {'output':"list"},
		        type: 'POST',
		        success: function(data){
		          //console.log(data);  
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		          console.log(textStatus + errorThrown); //Better diagnostics
		        }
		    });
		  });
		  
		  $('#event-display-toggle span.btnCalenderView').click(function(){		
		  	$(window).resize();
		    $('.view-calendar-view').css("visibility", "visible");
		    $('.view-calendar-view').css("height", "");
		    $('.view-event-list-view').css("visibility", "hidden");
		    $('.view-event-list-view').css("height", "0px");
		    
		    $.ajax({
		        url: goToUrl,
		        data: {'output':"calendar"},
		        type: 'POST',
		        success: function(data){
		          //console.log(data);  
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		          console.log(textStatus + errorThrown); //Better diagnostics
		        }
		    });
		  });
		 // Toggle between Calendar and List View //
		 
		 
		 // expand and collapse event in list view //
		  $('.view-event-list-view .event-list-wrapper .views-field-title .fields-collapsed').click(function(){		 	
		 	$(this).closest('.event-list-wrapper').find('.event-list-view-wrapped-fields').show();
		 	$(this).hide();
		 	$(this).closest('.views-field-title').find('.fields-expanded').show();
		  });
		  
		  $('.view-event-list-view .event-list-wrapper .views-field-title .fields-expanded').click(function(){		 	
		 	$(this).closest('.event-list-wrapper').find('.event-list-view-wrapped-fields').hide();
		 	$(this).hide();
		 	$(this).closest('.views-field-title').find('.fields-collapsed').show();
		  });
		 // expand and collapse events in list view //
		 
		 // expand all and collapse all events in list view //
		 
		 $(".view-event-list-view div.event-list-view-action #event-list-view-action-expand-all").click(function(){
		 	$('.event-list-view-wrapped-fields').show();
		 	$(".view-event-list-view div.event-list-view-action #event-list-view-action-expand-all").hide();
		 	$(".view-event-list-view div.event-list-view-action #event-list-view-action-collapse-all").show();	
		 	$('.view-event-list-view .event-list-wrapper .views-field-title .fields-collapsed').hide();	 
		 	$('.view-event-list-view .event-list-wrapper .views-field-title .fields-expanded').show();		 	
		 });
		 
		 $(".view-event-list-view div.event-list-view-action #event-list-view-action-collapse-all").click(function(){
		 	$('.event-list-view-wrapped-fields').hide();
		 	$(".view-event-list-view div.event-list-view-action #event-list-view-action-expand-all").show();
		 	$(".view-event-list-view div.event-list-view-action #event-list-view-action-collapse-all").hide();
		 	$('.view-event-list-view .event-list-wrapper .views-field-title .fields-collapsed').show();	 
		 	$('.view-event-list-view .event-list-wrapper .views-field-title .fields-expanded').hide();	 			 	
		 });
		 
		 // expand all and collapse all events in list view //
		 
		 // Toggle between description and summary in List View //
		  
		  $('span.list-view-read-more.expand-desc').click(function(){
		  	var id = $(this).attr("id");		    
		    $('#event-list-view-body-full-'+id).show("slide");
		    $('#event-list-view-body-summary-'+id).hide("slide");
		  });
		  
		  $('span.list-view-read-more.collapse-desc').click(function(){
		  	var id = $(this).attr("id");		    
		    $('#event-list-view-body-full-'+id).hide("slide");
		    $('#event-list-view-body-summary-'+id).show("slide");
		  });
		 // Toggle between description and summary in List View //
		 
		 
		 // on click of calendar event title/read more go to list view //		 
		  $(document).on('click', '.custom-fullcalendar-event-hover-body a', function() {
	        var id = $(this).attr("id");
			
			$('.view-calendar-view').css("visibility", "hidden");
			$('.view-calendar-view').css("height", "0px");
			$('.view-event-list-view').css("visibility", "visible");
			$('.view-event-list-view').css("height", "");
			
			$.ajax({
		        url: goToUrl,
		        data: {'output':"list"},
		        type: 'POST',
		        success: function(data){
		          //console.log(data);  
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		          console.log(textStatus + errorThrown); //Better diagnostics
		        }
		    });				
			
		    $(window).scrollTop($('.event-list-view-row-'+id).offset().top-100);
            
	      });	      
	      
	      
	      // Sync filter between list view and calendar view 
	        var listViewSelector = ".view-event-list-view";
			var calViewSelector = ".view-calendar-view";
			var CategorySelector = ".form-item-field-event-category-tid select";
			var FilterSelector = ".form-item-field-event-filter-tid select";
			var daterangePicker = ".form-item-daterangepicker #edit-daterangepicker";
			var daterangePickerVal = settings.daterange_from_date+" To "+settings.daterange_to_date;
			var submitSelector = "form .ctools-auto-submit-click";
			
		    // change filters of calendar view on filter change of list view 
		    
		    $(listViewSelector+' '+CategorySelector).change(function() {
		      var listCategory = $(this).find('option:selected').val();
     		  $(calViewSelector+' '+CategorySelector).val(listCategory);
     		  $(calViewSelector+' '+submitSelector).trigger('fullcalendar_submit');	
		    });
		    
		    $(listViewSelector+' '+FilterSelector).change(function() {
		      var listFilter = $(this).find('option:selected').val();
    		  $(calViewSelector+' '+FilterSelector).val(listFilter);
     		  $(calViewSelector+' '+submitSelector).trigger('fullcalendar_submit');
		    });
		    
		    
		    // Done
		    // change filters of list view on filter change of calendar view 
		    $(calViewSelector+' '+CategorySelector).change(function() {
		      var calCategory = $(this).find('option:selected').val();
    		  $(listViewSelector+' '+CategorySelector).val(calCategory);
     		  $(listViewSelector+' '+daterangePicker).val(daterangePickerVal);
		      $(listViewSelector+' '+submitSelector).click();
		    });
		    
		    $(calViewSelector+' '+FilterSelector).change(function() {
		      var calFilter = $(this).find('option:selected').val();
    		  $(listViewSelector+' '+FilterSelector).val(calFilter);
     		  $(listViewSelector+' '+daterangePicker).val(daterangePickerVal);
		      $(listViewSelector+' '+submitSelector).click();
		    });
		 
		 
	   }
	}

})(jQuery, Drupal, this, this.document);

