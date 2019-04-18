(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.bsw_custom = {
	  attach: function(context, settings) { 
	  	
	  	 // Set navigation
	  	 var path = window.location.pathname.split('/');
		 $(".main-menu a").each(function() {
		   var href = $(this).attr('href');
		   if (path == href) {
		     $(this).closest('li').addClass('selected');
		   }
		 });
		 
		 
		 // Breadcrumb
		 var pathArray = window.location.pathname.split('/');
		 var parts = [{
			 "text" : 'Home',
			 "link" : '/'
		 }];
		 for (var i = 1; i < pathArray.length; i++) {
			 var part = pathArray[i];
			 var text = part;
			 var link = pathArray.slice(0, i + 1).join('/');
			 parts.push({
				 "text" : text,
				 "link" : link
			 });
		 }
		 var markup = '';
		 $.each(parts, function(index, value) {
			 markup += '<a alt="' + value.text + '" href="' + value.link + '">' + value.text.replace(/-/g, ' ') + '';
			 if (index <= parts.length - 2)
			 markup += ' > ';
		 });
		 $('#breadcrumb').not(':has(a)').append(markup);
		 if(location.pathname=='/'){
		 	$('#breadcrumb a:first-child').text('Home');
		 }else{
		 	$('#breadcrumb a:first-child').text('Home >'); 
		 }
		
		 
		 // mobile menu logic
		 $('.mobile-menu-wrap .main-menu').hide();
		 $('#mm-trigger').click(function() {
		 $(this).toggleClass('active');
		 $('.mobile-menu-wrap .main-menu').slideToggle();
		 $('.mobile-menu-wrap .main-menu').toggleClass('open');
		 });
		 // adding classes to body in BBNC from url path
		 var pathArrayclass = window.location.pathname.split('/');
		 var newclasses = "";
		 for ( i = 0; i < pathArrayclass.length; i++) {
		 newclasses += pathArrayclass[i];
		 newclasses += " ";
		 }
		 $('body').addClass(newclasses);
		 // force active menus on subpages not in menu
		 $('body.news-events .main-menu li.news-selected-trail').addClass('selected');
		 $('body.news-events.starlight .main-menu li.news-selected-trail').addClass('selected');
		 $('body.news-events.starlight .main-menu li.starlight-selected-trail').addClass('selected');
		 $('body.news-events.catalyst .main-menu li.catalyst-selected-trail').addClass('selected');
		 //quick search box clear
		 $('.QuickSearchTextbox').attr('defaultSearchValue', 'Search our site')
		 $('.QuickSearchTextbox').attr('value', 'Search our site')
		 $('.QuickSearchTextbox').attr('onfocus', 'changeSearchText(this)')
		 $('.QuickSearchTextbox').attr('onblur', 'changeSearchText(this)')
	  	
		$(".QuickSearchTextbox").keypress(function (e){
			
		  if (e.which == 13) {
		  	console.log("hello");
		    var url = "https://giving.sw.org/search?txtSearch=";
		    var keyword = $(this).val();			  
		    window.location = url+keyword;
		  }
	    }); 
    	 
	  }
	  
	}
	changeSearchText = function(e) {
	  var searchValue = e.value;
	  var defaultSearchValue = e.getAttribute("defaultSearchValue");
	  if (!defaultSearchValue) {
	   e.setAttribute("defaultSearchValue", searchValue);
	   defaultSearchValue = searchValue;
	  }
	 if (searchValue == defaultSearchValue)
	   e.value = "";
	 if (searchValue == "")
	   e.value = defaultSearchValue;
	}
})(jQuery, Drupal, this, this.document);



