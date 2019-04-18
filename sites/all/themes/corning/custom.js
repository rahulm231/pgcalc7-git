(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.cornig = {
		attach: function(context, settings) { 
			var url = "https://www.cmog.org/search/site/";
			var rurl = "https://www.cmog.org/research/library-search/";
			$("#apachesolr-panels-search-block .form-actions #edit-submit--2").click(function(event){		
			  event.preventDefault();	  
			  var keyword = $("#apachesolr-panels-search-block #edit-apachesolr-panels-search-form").val();
			  window.location = url+keyword;
		    });
		    
		    $("#apachesolr-panels-search-block #edit-apachesolr-panels-search-form").keyup(function(event) {
			  if (event.keyCode === 13) {
			  	event.preventDefault();
			    var keyword = $(this).val();
			    window.location = url+keyword;
			  }
			});
			
			$(".corning-quick-search-form #edit-submit--4").click(function(event){		
			  event.preventDefault();	  
			  var keyword = $(".corning-quick-search-form #edit-search--2").val();
			  window.location = rurl+keyword;
		    });
		    
		    $(".corning-quick-search-form #edit-search--2").keyup(function(event) {
			  if (event.keyCode === 13) {
			  	event.preventDefault();
			    var keyword = $(this).val();
			    window.location = rurl+keyword;
			  }
			});
		}
	}

})(jQuery, Drupal, this, this.document);