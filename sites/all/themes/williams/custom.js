(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.williams = {
		attach: function(context, settings) { 
			
		  
		  if( $('.pgc-email > a > span.icon-email').length === 0){
		    $(".pgc-email > a").append('<span class="icon-email"></span>');
		  }
		  
		  $("#block-system-main-menu ul#main-menu li.expanded > a").after('<div class="dropdown-toggle" aria-expanded="false"><span class="screen-reader-text test3">Expand child menu</span></div>');	
		  
		  var linkHtml = '<li><span class="quick-item"><a class="link-goes-to" href="http://www.williams.edu/a-z/">A-Z Index</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://map.williams.edu/">Campus Map</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://dining.williams.edu">Dining</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://employment.williams.edu/">Employment</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="https://events.williams.edu">Events</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://communications.williams.edu/media-relations/fast-facts/">Fast Facts</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="https://glow.williams.edu/">Glow Login</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://www.williams.edu/feeds/">News &amp; Event Feeds</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://www.williams.edu/people/">People Directory</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://ephsports.williams.edu/">Sports Scores &amp; Schedules</a></span></li><li><span class="quick-item"><a class="link-goes-to" href="http://email.williams.edu">Williams Email</a></span></li>';
		  
		  $("#quick-container ul#your-links").html(linkHtml);
		  
		  $('.dropdown-toggle').click(function(e) {
		  
		    if($(this).hasClass("toggled-on")){
		      $(this).removeClass("toggled-on");
		      $(this).attr("aria-expanded", false);
		      $(this).next("ul.nav").css("display","none");
		      $(this).next("ul.nav").removeClass("toggled-on");
		      $(this).closest("li.expanded").removeClass("toggled-on");
		    }else{
		      $(this).addClass("toggled-on");
		      $(this).attr("aria-expanded", true);
		      $(this).next("ul.nav").css("display","block");
		      $(this).next("ul.nav").addClass("toggled-on");
		      $(this).closest("li.expanded").addClass("toggled-on");
		    }
		  	
		  });
		  
		  if($("#block-system-main-menu ul#main-menu li.expanded").hasClass("active-trail")){
		      $("#block-system-main-menu ul#main-menu li.active-trail .dropdown-toggle").addClass("toggled-on");
		      $("#block-system-main-menu ul#main-menu li.active-trail .dropdown-toggle").attr("aria-expanded", true);
		      $("#block-system-main-menu ul#main-menu li.active-trail .dropdown-toggle").next("ul.nav").css("display","block");
		      $("#block-system-main-menu ul#main-menu li.active-trail .dropdown-toggle").next("ul.nav").addClass("toggled-on");
		      $(this).closest("li.expanded").addClass("toggled-on");
		  }
		}
	}

})(jQuery, Drupal, this, this.document);

