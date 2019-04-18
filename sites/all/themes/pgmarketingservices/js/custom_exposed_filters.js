(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.custom_exposed_filters = {
		attach: function(context, settings) { 
			
			/*
			var listViewSelector = ".view-event-list-view";
			var calViewSelector = ".view-calendar-view";
			var CategorySelector = ".form-item-field-event-category-tid select";
			var FilterSelector = ".form-item-field-event-filter-tid select";
			var submitSelector = "form .ctools-auto-submit-click";
			
		    // change filters of calendar view on filter change of list view 
		    $(listViewSelector+' '+CategorySelector).change(function() {
		      var listCategory = $(this).find('option:selected').val();
		      $(calViewSelector+' '+CategorySelector+' option').removeAttr('selected')
     .filter('[value='+listCategory+']').attr('selected', true);
     		  $(calViewSelector+' '+submitSelector).trigger('fullcalendar_submit');		      
		    });
		    
		    $(listViewSelector+' '+FilterSelector).change(function() {
		      var listFilter = $(this).find('option:selected').val();
		      $(calViewSelector+' '+FilterSelector+' option').removeAttr('selected')
     .filter('[value='+listFilter+']').attr('selected', true);		      
		      $(calViewSelector+' '+submitSelector).click('');
		    });
		    
		    
		    // change filters of list view on filter change of calendar view 
		    $(calViewSelector+' '+CategorySelector).change(function() {
		      var calCategory = $(this).find('option:selected').val();
		      $(listViewSelector+' '+CategorySelector+' option').removeAttr('selected')
     .filter('[value='+calCategory+']').attr('selected', true);
		      $(listViewSelector+' '+submitSelector).click();
		    });
		    
		    $(calViewSelector+' '+FilterSelector).change(function() {
		      var calFilter = $(this).find('option:selected').val();
		      $(listViewSelector+' '+FilterSelector+' option').removeAttr('selected')
     .filter('[value='+calFilter+']').attr('selected', true);		      
		      $(listViewSelector+' '+submitSelector).click();
		    });
		    
		    */
		}
	}

})(jQuery, Drupal, this, this.document);

