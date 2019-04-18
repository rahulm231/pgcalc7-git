jQuery.noConflict();

var originalFeatureBottomMargin;

function prepInputs(){
	jQuery('input, textarea').placeholder()
		.filter('[type="text"], [type="email"], [type="tel"], [type="password"]').addClass('text').end()
		.filter('[type="checkbox"]').addClass('checkbox').end()
		.filter('[type="radio"]').addClass('radiobutton').end()
		.filter('[type="submit"]').addClass('submit').end()
		.filter('[type="image"]').addClass('buttonImage');
}

function vimeoScreenshots() {
	jQuery('.vimeo-placeholder').each(function() {
		var $this = jQuery(this),
			id = $this.data('src'),
			$title = $this.attr('title'),
			vimeoPath = '//vimeo.com/api/v2/video/' + id + '.json';

			console.log(vimeoPath);

		jQuery.ajax({
			url: vimeoPath,
			dataType: 'jsonp',
			success: function(data) {
				var meta = data,
					image = meta[0].thumbnail_large;

				$this.parent().parent().parent().find('.fb-sharer').attr('data-picture', image);
				$this.replaceWith('<img src="'+ image +'" alt="'+ $title +'" />');
			}
		});
	});
}

function chosenSelect() {
	jQuery(".sortable-filter select").chosen({
		disable_search_threshold: 15
	});
}

function isoContainer() {
	jQuery.Isotope.prototype._getCenteredMasonryColumns = function() {
		this.width = this.element.width();

		var parentWidth = this.element.parent().width();

		// i.e. options.masonry && options.masonry.columnWidth
		var colW = this.options.masonry && this.options.masonry.columnWidth ||
			// or use the size of the first item
			this.$filteredAtoms.outerWidth(true) ||
			// if there's no items, use size of container
			parentWidth;

		var cols = Math.floor( parentWidth / colW );
		cols = Math.max( cols, 1 );

		// i.e. this.masonry.cols = ....
		this.masonry.cols = cols;
		// i.e. this.masonry.columnWidth = ...
		this.masonry.columnWidth = colW;
	};

	jQuery.Isotope.prototype._masonryReset = function() {
		// layout-specific props
		this.masonry = {};
		// FIXME shouldn't have to call this again
		this._getCenteredMasonryColumns();
		var i = this.masonry.cols;
		this.masonry.colYs = [];
		while (i--) {
			this.masonry.colYs.push( 0 );
		}
	};

	jQuery.Isotope.prototype._masonryResizeChanged = function() {
		var prevColCount = this.masonry.cols;
		// get updated colCount
		this._getCenteredMasonryColumns();
		return ( this.masonry.cols !== prevColCount );
	};

	jQuery.Isotope.prototype._masonryGetContainerSize = function() {
		var unusedCols = 0,
			i = this.masonry.cols;
		// count unused columns
		while ( --i ) {
			if ( this.masonry.colYs[i] !== 0 ) {break;}
			unusedCols++;
		}
		
		return {
			height : Math.max.apply( Math, this.masonry.colYs ),
			// fit container to columns that have been used;
			width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
		};
	};
}

function isoFilter() {
	isoContainer();

	var $container = jQuery('.wrap-sortable'),
		$parent = jQuery('body'),
		filters = {};

	if ($parent.hasClass('gallery-home') === true) {
		$container.isotope({
			itemSelector : '.sortable',
			disable_search_threshold: 15
		});
	}

	// Set up for all interior sorters besides the funds pages
	if ($parent.not('#funds').hasClass('gallery-interior') === true) {
		$container.isotope({
			itemSelector : '.sortable',
			layoutMode : 'fitRows',
			disable_search_threshold: 15
		});
	}

	// set up specific for Funds page
	if ($parent.is('#funds') === true) {
		$container.isotope({
			itemSelector : '.sortable',
			layoutMode : 'fitRows',
			getSortData : {
				name : function($elem) {
					return $elem.find('.data-title').text();
				}
			},
			filter: '.popular'
		});
	}

	jQuery('.sortable-filter select').change(function() {
		var $this = jQuery(this),
			$header,
			group = $this.prop('name'),
			selected = $this.children('option:selected'),
			sortType,
			isoFIlters = [];

		// Sets up sort dropdown that works like a toggle on Funds
		if (jQuery('body#funds').length === 1) {
			$this.parent().find('.selected').removeClass('selected');
			
			// Find the header associated with the select is changed
			$header = $this.data('header');
			$header = jQuery($header);
			$header.parent().find('.cat-head').not('.hidden').addClass('hidden');
			$header.removeClass('hidden');

		}

		if (selected.data('sort') === "name") {
			// sets sortType
			sortType = 'byName';
		} else {
			sortType = 'byCategory';
			selected = selected.prop('value');
		}

		filters[group] = selected;

		for (var prop in filters) {isoFIlters.push(filters[prop]);}

		var selector = isoFIlters.join('');

		if (sortType === 'byName') {
			$container.isotope({
				filter: '*',
				sortBy : 'name',
				sortAscending : true
			});
		} else {
			$container.isotope({
				filter: selector
			});
		}
	});

	if (jQuery('body#funds').length === 1) {
		jQuery('.sortable-filter a.btn').on('click', function(e) {
			e.preventDefault();

			var $this = jQuery(this),
				group = $this.data('group'),
				$header;

			$this.parent().find('.selected').removeClass('selected');

			// Find the header associated with the btn clicked
			$header = $this.data('header');
			$header = jQuery($header);
			$header.parent().find('.cat-head').not('.hidden').addClass('hidden');
			$header.removeClass('hidden');

			if (jQuery('.sortable-filter select option:selected').val() !== '*') {
				jQuery('.sortable-filter select option').removeAttr('selected');
				jQuery('.sortable-filter select option[value="*"]').attr('selected', 'selected');
				jQuery('.sortable-filter select').trigger("chosen:updated");
			}

			$this.addClass('selected');

			var selector = group;

			$container.isotope({
				filter: selector
			});
		});
	}
}

function homeSlider() {
	var transition;
	if (jQuery('html.oldie').length === 1) {
		transition = 'scrollHorz';
	} else {
		transition = 'fade';
	}

	if (jQuery('#home .wrap-slider .slide').length > 1) {
		jQuery('#home .wrap-slider').after('<a class="slider-nav next" href="#">></a>').cycle({
			fx: transition,
			log: false,
			manualSpeed: 600,
			next: '.slider-nav.next',
			slides: '.slide',
			speed: 600,
			swipe: true,
			timeout: 9000
		});
	}
}

function footerSlider() {
	function runSlider() {
		jQuery('.foot-slider .wrap-slider').after('<a class="slider-nav prev" href="#"></a><a class="slider-nav next" href="#"></a>').cycle({
			carouselVisible: 3,
			fx: 'carousel',
			// log: false,
			manualSpeed: 600,
			prev: '.slider-nav.prev',
			next: '.slider-nav.next',
			slides: '> .slide',
			speed: 600,
			swipe: true,
			timeout: 9000
		});
	}

	if (jQuery('html').hasClass('oldie') !== true) {
		var size = jQuery(document.body,':after').css('content');
		if (size === 'desktop' || '\'desktop\'') {
			if (jQuery('.foot-slider .wrap-slider .slide').length >= 4) {runSlider();}
		}
	} else {runSlider();}
}

function fbShareBtn() {
    jQuery('.fb-sharer').on('click', function(e) {
                
        e.preventDefault();

        var $this = jQuery(this),
            name = $this.data('name'),
            link = $this.data('link'),
            picture = $this.data('picture'),
            description = $this.data('description');

        FB.init({
            appId: '211402505650569',
            status: true,
            cookie: true
        });

        FB.ui({
              method: 'feed',
              display: 'popup',
              name: name,
              link: link,
              picture: picture,
              description: description
          });
    });
}

function dropDownNav() {
	function runDropdown() {
		jQuery('.head-nav > ul').not('.home').superfish({
			hoverClass: 'hover',
			autoArrows: false,
			delay: 100
		});
	}
	if (jQuery('html').hasClass('oldie') !== true) {
		var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
		if (size === 'desktop' || '\'desktop\'') {runDropdown();}
	} else {runDropdown();}
}

function stickNav() {
	jQuery('.nav-wrap').waypoint('sticky', {
		stuckClass: 'sticky'
	});
}

function stickyShare() {
	if (jQuery('.social-desktop').length >= 1) {
		var $sticky = jQuery('.social-desktop'),
			stickyMarkup = $sticky.html(),
			socialPosition = function() {
			
			var $socialDesktop = jQuery('.social-desktop'),
				left = (jQuery(window).width() - jQuery('#content').width()) / 2 - 64 - 18;

			// console.log('window: ' + jQuery(window).width() + ', content: ' + jQuery('#content').width() + ', sharelist: ' + 64 - 18);
			console.log(left);

			$socialDesktop.css({
				left: left
			});
		};
			
		$sticky.remove();

		jQuery('#container').prepend('<aside class="sidebar-social social-desktop">' + stickyMarkup + '</aside>');

		$sticky = jQuery('.social-desktop');

		jQuery('#content').prepend('<span class="social-sticky social-stickyStart"></span>').append('<span class="social-sticky social-stickyStop"></span>');

		fbShareBtn();

		var $stickyStart = jQuery('.social-stickyStart'),
			$stickStop = jQuery('.social-stickyStop');

		socialPosition();

		$stickyStart.waypoint({
			handler: function(direction) {

				console.log(direction);
				
				if (direction === 'down') {$sticky.addClass('sticky');}

				if (direction === 'up') {$sticky.removeClass('sticky');}
			},
			offset: 57
		});

		$stickStop.waypoint({
			handler: function(direction) {

				console.log(direction);

				if (direction === 'down') {$sticky.removeClass('sticky');}

				if (direction === 'up') {$sticky.addClass('sticky');}
			},
			offset: 214
		});

		jQuery(window).resize(function() {socialPosition();});
	}
}

function getFeaturedData(data) {
	var pidReverseLookup = {},
		getRanking = function() {
			var pidArray= [];

			for (var i in data) {
				var ranking = data[i].order,
					path = data[i].url_title,
					pathLength = path.length,
					pid,
					str = '&pid=',
					strLoc = path.search(str);
				
				// get rid of str
				strLoc = strLoc + str.length;

				// find PID
				pid = path.substr(strLoc, pathLength);

				pidReverseLookup['pid_' + pid] = i;

				// push the PID to an array
				pidArray.push({'rank': ranking, 'pid': pid});

			}
			return pidArray;
		},
		rankingArray = getRanking();
	
	// Loop through entries
	jQuery('.wrap-sortable-container article.entry').each(function() {
		var $this = jQuery(this),
			pid;
		pid = 'pid_' + $this.data('pid');
		
		// find entries that have a rank
		if (typeof pidReverseLookup[pid] !== 'undefined') {
			var arrLoc = pidReverseLookup[pid],
				rank = rankingArray[arrLoc].rank;

			// Add data Attribute for the rank
			$this.attr('data-rank', rank).addClass('popular');
		}
	});
}

function getFeatured(path) {
	jQuery.ajax({
		url: path,
		dataType: 'json',
		success: function(data) {getFeaturedData(data);},
		complete: function() {isoFilter();}
	});
}

function fakejaxPosts() {
	jQuery('.pagination').on('click', '.load-more', function(e) {
		e.preventDefault();

		var url = jQuery(this).prop('href'),
			$container = jQuery('.wrap-dyno');

		if (location.pathname === '/') {
			if(url.indexOf('content/index') === -1) {
				url = url.substring(0,url.lastIndexOf('/') + 1) + 'content/index/' + url.substring(url.lastIndexOf('/') + 1);
			}
		}

		jQuery('.wrap-sortable-container').append('<div class="loading"></div>');
	
		$container.load(url + ' .wrap-sortable-container .wrap-sortable article , .pagination', function() {
			var pagination = $container.find('.pagination a'),
				newPosts = $container.find('article');
			
			vimeoScreenshots();

			$container.find('.pagination').remove();

			jQuery('.wrap-sortable-container .wrap-sortable').isotope('insert', newPosts, function() {
				jQuery(this).imagesLoaded(function(){jQuery(this).isotope('reLayout');});

				jQuery('.wrap-sortable-container .loading').remove();
			});
			
			jQuery('.pagination').html(pagination);
		});
	});

	if(jQuery('#funds.gallery-interior.funds-dev').length === 1) {getFeatured('/js/featured-funds.json');}
}


function loadSubnavContent()
{
        
    var substituteMainContent = function(data_id, hide_cta){
        
        _gaq.push(['_trackEvent', 'Anchor Link', jQuery( ".subnav-mobile li a[data-id=" + data_id + "]" ).text(), location.pathname + location.search + location.hash]); 
        
        var $newContent = jQuery( ".subnav-content-container" ).find(".subnav-content[data-id=" + data_id + "]" );
            
        jQuery( ".subnav li a, .subnav-mobile li a" ).removeClass("selected");
        jQuery( ".subnav li a[data-id=" + data_id + "]" ).addClass("selected");
        jQuery( ".subnav-mobile li a[data-id=" + data_id + "]" ).addClass("selected");
        jQuery(".control-container, ul.subnav-mobile").removeClass("open");
        jQuery( "#content .wrap-content .content-container" ).fadeOut(500, function(){
            jQuery( this ).html( $newContent.html() ).fadeIn(500);
            jQuery("figure.feature").animate({marginBottom:originalFeatureBottomMargin}, 500);
        });
        if(hide_cta === "Yes" )
        {
            jQuery( ".wrap-content .primary-sidebar" ).fadeOut(500);
        }else{
            jQuery( ".wrap-content .primary-sidebar" ).fadeIn(500);
        }
            
    };


    jQuery( ".subnav-content-container" ).prepend("<div class='subnav-content' data-id='-1'>" + jQuery( "#content .wrap-content .content-container" ).html() + "</div>");

    // trigger correct behavior when clicking a subnav <li>
    jQuery( ".sidebar-subnav li a, .subnav-mobile li a, .sidebar-funds li a" ).click(function(e){
        
        if ((jQuery(this).attr('href')).charAt(0) !== "#") {
            // subnav item is a Simple Link, 
            // ie a link to an external URL that should be treated as a "normal" link tag
            // soooo... do nothing.
        } else {
            substituteMainContent( jQuery(this).data("id"), jQuery(this).data("hide_cta") );
        }
    });

	// only once on load, check for #url-title in the URL
	if (jQuery('body').hasClass('subnav') && window.location.hash){
		// find data id by li with the href of the location hash
		var data_id = jQuery('ul.subnav a[href$="'+window.location.hash+'"]').data("id");
		var hide_cta = jQuery('ul.subnav a[href$="'+window.location.hash+'"]').data("hide_cta");

		// load content with url_title of window.location.hash
		substituteMainContent(data_id, hide_cta);
	}
}

function sizeMobileHeader()
{jQuery(".subnav-mobile-mask").height(jQuery("ul.subnav-mobile").height());}

function positionMobileSubnav()
{
    sizeMobileHeader();

    //originalFeatureBottomMargin = Number(jQuery("figure.feature").css("margin-bottom").replace("px",""));

    jQuery(".control-container").click(function(e){
        e.preventDefault();
        jQuery("ul.subnav-mobile").toggleClass("open");
        jQuery(this).toggleClass("open");
        /*
        if( jQuery(this).hasClass("open") )
        {
            jQuery("figure.feature").animate({marginBottom:jQuery("ul.subnav-mobile").height() + originalFeatureBottomMargin}, 500);
        }else{jQuery("figure.feature").animate({marginBottom:originalFeatureBottomMargin}, 500);
        }
        */
    });
}

jQuery(document).ready(function() {
	prepInputs();
	chosenSelect();
	homeSlider();
	footerSlider();
	dropDownNav();
	stickNav();
	stickyShare();
	// vimeoScreenshots();
	// formValidation();
	fakejaxPosts();
	loadSubnavContent();
});

var loaded = false;

jQuery(window).load(function() {

   if (!loaded){
	// stickyShare();
	loaded = true;

	if(jQuery('#funds.gallery-interior.funds-dev').length === 1) {getFeatured('/js/featured-funds.json');} else {isoFilter();}
	
	jQuery(".read-more").analytics(function(e){
		_gaq.push(["_trackEvent", 'Learn More Click', jQuery(this).text(), this.href, 0, true]);
	});
	jQuery(".load-more").analytics(function(e){
		_gaq.push(["_trackEvent", 'Load More Click', jQuery(this).text(), this.href, 0, true]);
	});
	
	positionMobileSubnav();
	jQuery(window).resize(sizeMobileHeader);
   }
});
