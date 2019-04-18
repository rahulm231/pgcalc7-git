(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.intervarsity = {
		attach: function(context, settings) { 
		 $(".form-item-search-block-form").keyup(function(event) {
 			if (event.keyCode === 13) {
			    var key = $('#edit-search-block-form--2').val();
			    window.location = "https://intervarsity.org/search/node/"+key;
			  }
 			})
		}
	}

})(jQuery, Drupal, this, this.document);