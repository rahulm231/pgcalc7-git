(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.aier = {
		attach: function(context, settings) { 
			$('.navbar-toggle').click(function(){
			  if($(this).hasClass('collapsed')){
			  	$(this).removeClass('collapsed');
			  }else{
			  	$(this).addClass('collapsed');
			  }
			});
			
			$('.navbar-toggle .icon-bar').click(function(){
			  if($('#navbar-collapse').hasClass('in')){
			  	$('#navbar-collapse').removeClass('in');
			  	$('#navbar-collapse').css('height','0px');
			  }else{
			  	$('#navbar-collapse').addClass('in');
			  	$('#search-collapse').removeClass('in');
			  	$('#navbar-collapse').css('height','auto');
			  }
			});
			
			$('.navbar-toggle .icon-search').click(function(){
			  if($('#search-collapse').hasClass('in')){
			  	$('#search-collapse').removeClass('in');
			  	$('#search-collapse').css('height','0px');
			  }else{
			  	$('#search-collapse').addClass('in');
			  	$('#navbar-collapse').removeClass('in');
			  	$('#search-collapse').css('height','auto');
			  }
			});
		}
	}

})(jQuery, Drupal, this, this.document);

