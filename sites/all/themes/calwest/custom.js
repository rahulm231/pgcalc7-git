(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.calwest = {
		attach: function(context, settings) { 
			$("#main_header_0_header_search_0_btnSubmit").click(function(){
			  var url = "https://www.cwsl.edu/search-results?search=";
			  var keyword = $("#main_header_0_header_search_0_tbSearch").val();			  
			  window.location = url+keyword;
			});
			
			$("#main_header_0_header_search_0_tbSearch").keypress(function (e) {
			  if (e.which == 13) {		    
			    var url = "https://www.cwsl.edu/search-results?search=";
			    var keyword = $(this).val();			  
			    window.location = url+keyword;
			  }
			});
			
			
			$('.megamenu ul.navbar-nav li.dropdown').mouseenter(function() {
		        $(this).find('ul.dropdown-menu').show();
		    });
		    $('.megamenu ul.navbar-nav li.dropdown').mouseleave(function() {
		        $(this).find('ul.dropdown-menu').hide();
		    });
		}
	}

})(jQuery, Drupal, this, this.document);

