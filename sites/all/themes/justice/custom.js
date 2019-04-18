(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.justice_custom = {
		attach: function(context, settings) { 
			$('.mobile-menu-button a').unbind("click").click(function(e) {
				if($('#navigation .mobile-menu').css('display')=="none"){
				  
				  if(!($("#navigation .mobile-menu .menu-block-wrapper > ul.menu >  li > a > i").length)){
				  	$($("#navigation .mobile-menu .menu-block-wrapper > ul.menu >  li > a")).append(' <i class="fa fa-angle-down injected"></i>');
				  }
				  
				  $('#navigation .mobile-menu').css('display','block');
				}else{
				  $('#navigation .mobile-menu').css('display','none');
				}
			});
			
			$("#navigation .mobile-menu ul.menu li a").unbind("click").click(function(e){
				if (!$(this).hasClass('firstclick')) {
					$(this).parent().find('ul:first').fadeIn();
					$(this).parent().addClass('mobile-link-open');
					$(this).addClass('firstclick');					
					e.preventDefault();
				}
			});
		}
	}

})(jQuery, Drupal, this, this.document);

