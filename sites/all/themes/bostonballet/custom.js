(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			var url = "https://www.bostonballet.org/Home/Search-Results.aspx?searchtext=";
			$(".fsearch").click(function(){			  
			  var keyword = $(this).parent().find(".fsearch-i.form-control").val();
			  window.location = url+keyword+"&searchmode=anyword";
		    });
		    
		    $(".fsearch-i.form-control").keyup(function(event) {
			  if (event.keyCode === 13) {
			    var keyword = $(this).val();
			    window.location = url+keyword+"&searchmode=anyword";
			  }
			});
		}
	}

})(jQuery, Drupal, this, this.document);