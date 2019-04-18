(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			var url = "https://www.bostonballet.org/Home/Search-Results.aspx?searchtext=";
			$("li.top.search > .fa-search").click(function(){			  
			  $('li.top.search').addClass('open');
		    });
		    
		    $("li.top.search .fa.fa-times.close").click(function(){			  
			  $('li.top.search').removeClass('open');
		    });
		}
	}

})(jQuery, Drupal, this, this.document);