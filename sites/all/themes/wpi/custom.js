(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			$("form.search-form #edit-submit").click(function(event){
			  event.preventDefault();
			  var url = "http://www.wpi.edu/search/google/";
			  var keyword = $("form.search-form #edit-keys").val();			  
			  window.location = url+keyword+"#gsc.tab=0&gsc.q=test&gsc.sort=";
		    });
		    
		    $("#search-dropdown-button").click(function(event){
			  $('section#search-dropdown').slideToggle();
		    });
		    
		    $("#header-dropdown-button").click(function(event){
			  $('section#menu-dropdown').slideToggle();
		    });
		}
	}

})(jQuery, Drupal, this, this.document);