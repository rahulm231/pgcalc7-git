(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			$("#ctl00_btnSearch001").click(function(){
			  var url = "http://www.munsonhealthcare.org/search/?sid=20&cx=014782065546096959900:nzah0grwr_k&cof=FORID%3A11&ie=UTF-8&q=";
			  var keyword = $(".ctl00_pnlSearch001 #ctl00_txtSearch").val();			  
			  window.location = url+keyword+"&sa=Search";
		    });
		}
	}

})(jQuery, Drupal, this, this.document);

