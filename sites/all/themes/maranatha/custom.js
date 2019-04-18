(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.maranatha = {
		attach: function(context, settings) { 
		 $(".form-item-search-block-form").keyup(function(event) {
 			if (event.keyCode === 13) {
			    var key = $('#edit-search-block-form--2').val();
			    window.location = "http://maranatha.stage.pgdonors.org/search/node/"+key;
			  }
 			})
		}
	}

})(jQuery, Drupal, this, this.document);