/* On Document Ready
********************************************/
jQuery(document).ready(function(){
	
	/* Initialize Pikabu mobile menu
	********************************************/
		// creates new left nav panel at 70% wide
		pikabu = new Pikabu({
			widths: {left: '100%' },
			//add class to fix the fixed height on resize
			onInit: function() {jQuery('html').addClass('m-pikabu-closed')}, 
			onOpened: function() {jQuery('html').removeClass('m-pikabu-closed')},
			onClosed: function() {jQuery('html').addClass('m-pikabu-closed')}
		});
		// close nav panel when window is resized only if nav is open
		if(!pikabu.device.isAndroid){
			jQuery( window ).resize(function() {
				if(pikabu.activeSidebar){
					pikabu.closeSidebars(); 
				}
			});
		}
		//Close Button
		jQuery('#nav-close-btn').unbind().on('click', function(e){
			e.preventDefault();
			pikabu.closeSidebars();
		});
		
	//Mobile Accordion
	jQuery('.m-pikabu-sidebar .mainNav').navAccordion({
		expandButtonText: '<i class="fa fa-plus-circle"></i>',  //Text inside of Expand button - this can be a Font Awesome Icon
		collapseButtonText: '<i class="fa fa-minus-circle"></i>',  //Text inside of Collapse button - this can be a Font Awesome Icon
		buttonWidth: '15%'
	});
	
	//Dropdown Nav
	jQuery('.desktopNav li').on( 'mouseenter', function(e){
		jQuery(this).addClass('sfHover');
	});
	jQuery('.desktopNav li').on( 'mouseleave', function(e){
		jQuery(this).removeClass('sfHover');
	});
		//Touch
		jQuery('.touch .desktopNav > ul > li > a').on('click', function(e){
			if(!jQuery(this).hasClass('open')){
				e.preventDefault();
				jQuery('.desktopNav .open').removeClass('open');
				jQuery(this).addClass('open');
			}
		});
		if(jQuery('html').hasClass('touch')) {
			jQuery(document).on('click', function(e){
				console.log(jQuery(e.target).parent('a.open').index())
				if (jQuery(e.target).parent('a.open').index() == -1) {
					console.log('test')
					jQuery('.desktopNav .open').removeClass('open');
				}
			});
		}
	
	//Logged in
	if (jQuery("#CmsMasterMenu").length > 0){
		jQuery('html').addClass('loggedin');
	}
	
	//Remove Empty space from subtitle
	jQuery ('.PageSubTitleHeader').each(function() {
		if(jQuery(this).text().trim().replace(/\&nbsp\;/g, '').length == 0) {
			jQuery(this).parent().css('display', 'none');
			jQuery(this).parent().next('br').css('display', 'none');
		}
	});
	
	//Sticky nav
	var headOffset = jQuery('.structHead').offset().top;
	scrollCheck = function(){
		var headHeight = jQuery('.structHead').outerHeight();
		var scroll = jQuery(document).scrollTop();
		if 	(scroll >  headOffset) {
			jQuery('html').addClass('sticky-on');
			jQuery('.utilityBar').css('margin-bottom', headHeight + 'px');
		}
		else{
			jQuery('html').removeClass('sticky-on');
			jQuery('.utilityBar').css('margin-bottom', 0);
		}
	};
	scrollCheck();
	jQuery(window).on('scroll', scrollCheck);
	
	//Interior Top Image
	if (!jQuery('html').hasClass('loggedin') && jQuery('.topImg img').length > 0) {
		var src = jQuery('.topImg img').attr('src');
		jQuery('.topImg').addClass('hasImg').css('background-image', 'url(' + src + ')');
	}
	
	//Mobile Menu - Copy Items
	jQuery('.mobileMemberTools li.quicklink').clone().appendTo('.mobileQuickLinks ul');
	
	//Search Accessibility
	jQuery('img[id$="_imgbtnSearch"]').attr({'role' : 'button', 'tabindex' : '0'});
	
	//Empty Checks
	emptyCheck('.emptyCheck');
	
	/* News Listing
	********************************/
		//Class for black text
		jQuery('.newsItemList .preview .black').closest('.newsItemList').addClass('black');

		//custom button for news listing
		jQuery('.newsItem').each(function() {
			if(jQuery(this).find('.preview a.btn-view-more').length > 0)  {
				var clonedLinkHref = jQuery(this).find('.preview a').attr('href');
				var clonedLinkText = jQuery(this).find('.preview a').html();
				jQuery(this).find('.preview a.btn-view-more').remove();
				jQuery(this).find('.text a.btn-view-more').attr('href', clonedLinkHref);
				jQuery(this).find('.text a.btn-view-more').html(clonedLinkText);
				jQuery(this).find('.text a.btn-view-more').toggleClass('btn-view-more btn-view-more-custom');
			}
		});
		//View more button
		jQuery('.newsItem .btn-view-more').on('click', function(e){
			e.preventDefault();
			var item = jQuery(this).closest('.newsItem');
			item.addClass('active');
			jQuery('.content', item).slideDown('fast');
			//Scroll - for above mobile version only
				var height;
				if (jQuery(window).width() > 699) {
					//Desktop/Tablet version scroll
					height = jQuery('.content', item).offset().top - jQuery('.structHead').height() - jQuery('.campaignBar').height();
				} else {
					//Mobile version scroll
					height = item.offset().top - jQuery('.structHead').height();
				}
				//Animate Scroll
				jQuery('html,body').animate({
				  scrollTop: height
				}, 400);
		});
		//Close Button
		jQuery('.newsItem .btn-close').on('click', function(e){
			e.preventDefault();
			var item = jQuery(this).closest('.newsItem');
			item.removeClass('active');
			jQuery('.content', item).slideUp('fast');
			//Scroll
				jQuery('html,body').animate({
				  scrollTop: item.offset().top - jQuery('.structHead').height()
				}, 400);
		});
		//Next/Prev Buttons
		jQuery('.newsItem').each(function(i){
			jQuery(this).attr({"data-count" : i, "id" : "slideItem" + i});
			jQuery('.btn-prev', this).attr('href', '#slideItem' + (i-1));
			jQuery('.btn-next', this).attr('href', '#slideItem' + (i+1));
		});
	
	
	
	//Video Modal Window
	/* jQuery('.modal-video').modalVideo(); */
	
	//Move news article back link
	var backLink = jQuery('.backLink');
	backLink.clone().prependTo('.structBody .midWrap');
	backLink.remove();
		//Add anchor if linking to homepage
		jQuery('.backLink a').each(function(){
			var url = jQuery(this).attr('onclick').match(/'([^']*)'/)[1];
			var pgid = getUrlVars(url)["pgid"];
			if (pgid == "447") {
				jQuery(this).attr('onclick', "window.location = '" + url + "#Units' ")
			}
		});
	
});


/* Global Functions
********************************************/
	//Debounce function
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	//News Item Slicer Advanced - can specify wrappers
	function newsItemSlice(newsname, listingWrapper, rowWrapper, columns){
		var items = jQuery(newsname);
		for(var i=0; i < items.length;) {
			var wrap = items.eq(i).nextUntil(':not(' + newsname + ')').addBack().wrapAll(listingWrapper);
			i += wrap.length;
			if (columns != undefined) {
				for(var b = 0; b < wrap.length; b+=columns) {
					wrap.slice(b, b+columns).wrapAll(rowWrapper);
				};
			}
		}
	}
	//Advanced Empty Check - data-subcheck attribute specifies sub items to check and then hide parent item
	function emptyCheck(item){
		jQuery(item).each(function(){
			var subItem = jQuery(this).data('subcheck'),
				subLength = 0;
			if (subItem != undefined) {
				jQuery(subItem, this).each(function(){
					subLength += jQuery(this).html().trim().replace(/\&nbsp\;/g, '').length
				});
			}
			if (subItem != undefined && subLength == 0 && jQuery("#CmsMasterMenu").length == 0) {
				jQuery(this).css('display', 'none');
			} else if (jQuery(this).html().trim().length == 0 && jQuery("#CmsMasterMenu").length == 0){
				jQuery(this).css('display', 'none');
			}
		});
	}
	//Get query strings
	function getUrlVars(string)
	{
		var vars = [], hash;
		var hashes = string.slice(string.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	
	// Detect if viewport units supported
	(function(jQuery){
		jQuery('body').prepend('<div id="checkVh" style="position: absolute; height: 50vh">')
		var elemHeight = parseInt(getComputedStyle(document.querySelector("#checkVh"), null).height, 10);
		var halfHeight = parseInt(window.innerHeight / 2, 10);
		if ((elemHeight == halfHeight)) {
			jQuery('html').addClass('cssvhunit');
		}
		jQuery('#checkVh').remove();
	})(jQuery);
	


/* Smooth Scrolling - CSS Tricks 
http://css-tricks.com/snippets/jquery/smooth-scrolling/
********************************************/
jQuery(function() {
  jQuery('a[href*=\\#]:not([href=\\#]):not([class="tabLink"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html,body').animate({
          scrollTop: target.offset().top - jQuery('.structHead').height()
        }, 400);
        return false;
      }
    }
  });
});