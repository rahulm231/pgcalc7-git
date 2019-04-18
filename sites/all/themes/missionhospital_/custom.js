(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.munson = {
		attach: function(context, settings) { 
			
			 $('.map a').click(function (){
			 	$('div.footer-toggle').slideToggle();
			 });
			
			 $("ul#DesktopNav li:nth-child(1)").hover(function () {
			    $(".cdd .cdd-item1").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item1" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(2)").hover(function () {
			    $(".cdd .cdd-item2").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item2" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(3)").hover(function () {
			    $(".cdd .cdd-item3").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item3" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(4)").hover(function () {
			    $(".cdd .cdd-item4").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item4" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(5)").hover(function () {
			    $(".cdd .cdd-item5").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item5" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(6)").hover(function () {
			    $(".cdd .cdd-item6").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item6" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
			 
			 $("ul#DesktopNav li:nth-child(7)").hover(function () {
			    $(".cdd .cdd-item7").toggleClass("active");
			 });
			 
			 $( ".cdd .cdd-item7" )
			 	.mouseover(function() {
				    $(this).addClass("active");
			  	})
		  		.mouseout(function() {
			    	$(this).removeClass("active");
			 	});
		}
	}

})(jQuery, Drupal, this, this.document);