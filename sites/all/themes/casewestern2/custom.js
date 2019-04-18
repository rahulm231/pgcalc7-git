(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.casewestern = {
		attach: function(context, settings) { 
			if($('div.sidebar-desktop .page-sidebar ul.page-sidebar-menu li.nav-item div.region-menu').length===0){
			  $('.page-content-inner .sidebar-desktop').hide();
			  $('.col-lg-9').css('width','100%');
			}
			
			var url = "//www.case.edu/search-results/?q=";
			$("form.search-form button .icon-magnifier").click(function(event){	
			  event.preventDefault();		  
			  var keyword = $("form.search-form #headersearch").val();
			  window.location = url+keyword+"&cx=004305171799132815236%253Aciq4c8b3yv4&ie=UTF-8";
		    });
		    
		    $("form.search-form #headersearch").keyup(function(event) {
			  if (event.keyCode === 13) {
			    var keyword = $(this).val();
			    window.location = url+keyword+"&cx=004305171799132815236%253Aciq4c8b3yv4&ie=UTF-8";
			  }
			});
		}
	}

})(jQuery, Drupal, this, this.document);