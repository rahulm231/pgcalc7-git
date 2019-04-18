(function ($, Drupal, window, document, undefined) {
	Drupal.behaviors.christianscience_filters = {
		attach: function(context, settings) { 
			$("form.l-site-search").submit(function(e){
				e.preventDefault();
				var searchkey = $("form.l-site-search .searchbox").val();
				document.location.href = '/search/node/'+searchkey;
			});
			
			$("a.donate-link").click(function(e){
				$("form.donate-form").submit();
			});
		}
	}
})(jQuery, Drupal, this, this.document);

