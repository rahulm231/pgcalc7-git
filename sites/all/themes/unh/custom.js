(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			$(".form-search input-group-btn button").click(function(){
			  var url = "https://www.unh.edu/give/search/node/";
			  var keyword = $(".form-search #edit-search-block-form--2").val();			  
			  window.location = url+keyword";
		    });
		    
		    $('.form-search #edit-search-block-form--2').keypress(function (e) {
			 var key = e.which;
			 if(key == 13){
			    var url = "https://www.unh.edu/give/search/node/";
				var keyword = $(".form-search #edit-search-block-form--2").val();			  
				window.location = url+keyword";
			  }
			});   
		}
	}

})(jQuery, Drupal, this, this.document);