(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.pgcalc_custom_filters = {
		attach: function(context, settings) { 
			  $("#block-pgc-misc-blocks-mobilenav .open-btn").click(function(){
			    $("#block-pgc-misc-blocks-mobilenav .subnav-mobile-mask").slideToggle();
			    $("#block-pgc-misc-blocks-mobilenav .open-btn").hide();
			    $("#block-pgc-misc-blocks-mobilenav .close-btn").show();
			  });
			
			  $("#block-pgc-misc-blocks-mobilenav .close-btn").click(function(){
			    $("#block-pgc-misc-blocks-mobilenav .subnav-mobile-mask").slideToggle();
			    $("#block-pgc-misc-blocks-mobilenav .open-btn").show();
			    $("#block-pgc-misc-blocks-mobilenav .close-btn").hide();
			  });
  
  
			  var baseFontSize = 100;
		      $('.pgc-font-size a').click(function() {
		        if($(this).hasClass('increase')) {
		          if(baseFontSize < 150)
		            baseFontSize += 20;
		          $('.pg-content-body p').css('font-size', baseFontSize+'%');
		        } else {
		          if(baseFontSize > 70)
		            baseFontSize -= 10;
		          $('.pg-content-body p').css('font-size', baseFontSize+'%');
		        }
		      });
		
		      // Print button
		      var href = window.location.href;			
			  if(href.indexOf("/pgc-print")!==-1){	  	
			  	window.print();
			  }     
		      
		      // Gift details accordion
		      $('.pg-gift-details .accordion-items').css('display', 'none');
		      $('.pg-gift-details .accordion-switch').unbind('click').click(function(){
		        if($(this).hasClass('open')) {
		          $(this).find('span').removeClass('icon-arrow-up').addClass('icon-arrow-down');
		          $('.pg-gift-details .accordion-items').slideUp('slow');
		          $(this).html($(this).html().replace('Hide', 'Show More'));
		          $(this).removeClass('open');
		        } else {
		          $(this).find('span').removeClass('icon-arrow-down').addClass('icon-arrow-up');
		          $('.pg-gift-details .accordion-items').slideDown('slow');
		          $(this).html($(this).html().replace('Show More', 'Hide'));
		          $(this).addClass('open');
		        }
		      });
		}
	}

})(jQuery, Drupal, this, this.document);

