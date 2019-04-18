/**
 * @file
 * AddThis javascript actions.
 */

(function ($) {
  Drupal.behaviors.addthis = {
    scriptLoaded: false,

    attach: function(context, settings) {

      // The addthis configuration is not loaded but the settings are passed
      // to do so.
      if (!this.isConfigLoaded() && this.isSettingsLoaded()) {
        // Initialize config.
        this.initConfig();

        // Load widget js.
        if (!this.scriptLoaded) {
          this.loadDomready();
        }
      }
      // The addthis configuration is not loaded but no setting are available
      // to load anything.
      else if(!this.isConfigLoaded() && !this.isSettingsLoaded()) {
        // Do nothing
      }

      // Trigger ready on ajax attach.
      if (context != window.document) {
        Drupal.behaviors.addthis.ajaxLoad(context, settings);
      }

    },

    // Returns if the settings defined by the addthis module are loaded.
    isSettingsLoaded: function () {
      if (typeof Drupal.settings.addthis == 'undefined') {
        return false;
      }
      return true;
    },

    // Returns if the configuration variables needed for widget.js are defined.
    isConfigLoaded: function() {
      if (typeof addthis_config == 'undefined' || typeof addthis_share == 'undefined') {
        return false;
      }
      return true;
    },

    initConfig: function () {
      addthis_config = Drupal.settings.addthis.addthis_config;
      addthis_share = Drupal.settings.addthis.addthis_share;
    },

    // Load the js library when the dom is ready.
    loadDomready: function() {
      // If settings asks for loading the script after the dom is loaded, then
      // load the script here.
      if (!this.scriptLoaded &&
          this.isConfigLoaded() &&
          Drupal.settings.addthis.domready) {
        $.getScript(Drupal.settings.addthis.widget_url, Drupal.behaviors.addthis.scriptReady);
      }
    },

    // Callback for loading the widget.js dynamically.
    scriptReady: function () {
      this.scriptLoaded = true;
    },

    // Called when a ajax request returned.
    ajaxLoad: function(context, settings) {
      if (typeof window.addthis != 'undefined' &&
          typeof window.addthis.toolbox == 'function')
      {
          window.addthis.toolbox('.addthis_toolbox');
      }
    }

  };

  // This load the config in time to run any addthis functionality.
  if (Drupal.behaviors.addthis.isConfigLoaded()) {
    addthis_config = Drupal.settings.addthis.addthis_config;
    addthis_share = Drupal.settings.addthis.addthis_share;
  }

  // Document ready in case we want to load AddThis into the dom after every
  // thing is loaded.
  //
  // Is executed once after the attach happened.
  $(document).ready(function() {
    Drupal.behaviors.addthis.loadDomready();
  });

}(jQuery));
;
(function ($) {

  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
  Drupal.theme.prototype.scaExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. The advantage
   * of behaviors over simIn short, the advantage of Behaviors over a simple
   * document.ready() lies in how it interacts with content loaded through Ajax.
   * Opposed to the 'document.ready()' event which is only fired once when the
   * page is initially loaded, behaviors get re-executed whenever something is
   * added to the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */
  Drupal.behaviors.scaExampleBehavior = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.
      $('.some-selector', context).once('foo', function () {
        // Now, we are invoking the previously declared theme function using two
        // settings as arguments.
        var $anchor = Drupal.theme('scaExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

        // The anchor is then appended to the current element.
        $anchor.appendTo(this);
      });

      // Placeholder fix
      $('input, textarea').placeholder();

			// hide stuff from not-logged-in users
      $('.logged-in a.only-anon', context).once('sca', function() {
	      $(this).each( function( index, elem ) {
		      if ( $(elem).parent('li').length ) {
		      	$(elem).parent('li').remove();
		      } else {
			      $(elem).remove();
		      }
	      });
      });

			// hide stuff from logged-in users
      $('.not-logged-in a.only-auth', context).once('sca', function() {
	      $(this).each( function( index, elem ) {
		      if ( $(elem).parent('li').length ) {
		      	$(elem).parent('li').remove();
		      } else {
			      $(elem).remove();
		      }
	      });
      });

      //clone homepage stuff for mobile
      $('.whats-happening', context).clone().toggleClass('mobile-only desktop-only').appendTo('.white-1 .inside');

    }
  };

  Drupal.behaviors.scaHomeNav = {
    attach: function (context, settings) {

			var $submenu = $('.secondary-nav-holder', context),
				$menu = $('.front #block-menu-block-2', context);

			$("a[class^='item-']", $menu).on({
		    mouseenter: function () {
		      $(this).addClass('active').next('.menu').clone().appendTo( $submenu );
		    },
		    // this is actually a problem because if the user is "leaving" to go to the subnav....
		    mouseleave: function (e) {
					var nowOn = e.toElement || e.relatedTarget,
						$newElement = $(nowOn);
					if ( $newElement.closest( $submenu ).length ) {
						// do nothing
					} else {
			      $(this).removeClass('active');
			      $submenu.html('');
					}
		    }
			});

			$submenu.on('mouseleave', function() {
				$('a', $menu).removeClass('active');
				$submenu.html('');
			});
    }
  }; //end scaHomeNav

  Drupal.behaviors.scaCarousel = {
    attach: function (context, settings) {

			// turn a .carousel into an actual carousel
      $('.carousel', context).once('sca', function() {
	      $(this).cycle({
		      carouselVisible: 1,
		      fx: 'carousel',
		      next: '.carousel-next',
		      prev: '.carousel-prev',
		      slides: '> li',
		      speed: 800,
		      timeout: 7000,
		      swipe: true
	      });
      });

      //build slideshows elsewhere
      $( '.sca-slideshow', context ).cycle({
	     slides: '> *',
	     swipe: true
      });

      //homepage carousels
      $('.carousel-three .view-content ul', context)
	      .after('<div class="controls"><a class="cycle-prev">‹</a><a class="cycle-next">›</a></div>')
	      .cycle({
		      fx: 'carousel',
		      slides: '> li',
		      speed: 400,
		      timeout: 0,
		      next: '+ div .cycle-next',
		      prev: ' + div .cycle-prev',
		      swipe: true
      });
		}
	}; //end scaCarousel

  Drupal.behaviors.homeSlider = {
    attach: function (context, settings) {

			// if we have a homepage slider, turn it into one!
			if ( $('.view-homepage-slider', context ).length ) {
				$('.view-homepage-slider article', context ).each( function() {
					$(this).css('background-image', "url(" + $(this).attr('data-bg') + ")" );
				});
				$('.view-homepage-slider .hero-pager', context ).appendTo('.view-homepage-slider article .content');

				$('.view-homepage-slider .item-list > ul', context ).attr('data-swipe-fx','scrollHorz').cycle({
					fx: 'fade',
		      next: '.hero-next',
		      prev: '.hero-prev',
		      pager: '.hero-pager',
		      slides: '> li',
		      speed: 800,
		      timeout: 7000,
		      swipe: true,
		      swipeFx: 'scrollHorz',
					swipeFX: 'scrollHorz',
					swipefx: 'scrollHorz'
				});
			}

			// track clicks in Google Analytics
			$('.view-homepage-slider .view-content').on('click', 'a', function() {
				var url = $(this).attr('href');
				if ( typeof ga == 'function') ga('send', 'event', 'slider-click', url);
			});

		}
	}; //end homeSlider

	Drupal.behaviors.scaGrid = {
		attach: function (context, settings) {
			var $grid = $('.not-front .tiles .view-content ul');

			if ( $(window).width() > 620 ) {
				$grid.isotope( { masonry: { columnWidth: 310 } } );
			}
		}
	}; // end grids

  Drupal.behaviors.scaFAQ = {
    attach: function (context, settings) {
			// turn a .carousel into an actual carousel
      $('.node--faq--teaser', context).each(function() {
      	var $this = $(this);
      	$this.once('sca', function() {
      		$this.addClass('collapsible closed');
					$('header a', $this).click(function() {
						$(this).closest('.node--faq--teaser').toggleClass('closed open').find('.node__content').slideToggle();
						return false;
					});
				});
      });
		}
	}; //end scaFAQ

	Drupal.behaviors.scaResponsive = {
		attach: function (context, settings) {
			// responsive menu
			if ( !$('body.admin-menu', context).length && !$('.jPanelMenu-panel', context).length && window.self === window.top ) {

				//any script elements that are further down than body > * need to be moved due to a bug in jPanelMenu
				var els = document.querySelectorAll('body > * script');
				[].forEach.call(els, function (el) { // wtf is this, you ask? see http://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript
					document.head.appendChild(el);
				});

				var jPM = $.jPanelMenu({
			  	menu: 'header #mobile_menu',
					trigger: '.mobile_menu_trigger',
					duration: 300,
					excludedPanelContent: 'script, style, #cboxOverlay, #colorbox'
				});
				jPM.on();
			}
		}
	}; //end scaResponsive


	// height adjustments, right on load
	$(window).on('load', function() {

    // reposition the second-rail as needed on node pages
    if ( $('.group-flow').length ) {
	    var body_top = $('.group-flow').position().top;
	    $('.rail-second').css('top', body_top);

			// set the min-height of the body on rail-second pages, just in case
			$('.group-flow').css('min-height', $('.rail-second').outerHeight() + $('.l-region--sidebar-second').outerHeight() );

			// set the height of the rail-second on node pages
			var body_height = $('.group-flow').outerHeight();
			$('.rail-second').css('min-height', body_height);
		} else {
			$('.content').css('min-height', $('.rail-second').outerHeight() + $('.l-region--sidebar-second').outerHeight() + 200);
		}

		// vertical rule height
		$('.vert').each(function() {
    	var $this = $(this);
	    $this.height( $this.parent().height() - ( parseInt($this.css('marginTop'), 10) * 2) );
    });
	});

	// ready stuff
	$(document).ready(function() {

		//sticky scrolling for lefthand rail
		var $rail = $('.rail-first');

		if ( $rail.length ) {
			var mainHeight = $('.main').outerHeight();

			$(window).on('scroll', function() {

				var	scroll = $(window).scrollTop(),
					topPos = $rail.offset().top,
					topMargin = parseInt( $rail.css('margin-top') ),
					railHeight = $rail.height();

				if ( topPos - topMargin < scroll ) {
					var offset = (scroll - topPos) + topMargin;
					// TO DO CHECK body height
					if ( railHeight + offset + topMargin < mainHeight ) {
						$rail.css('padding-top', offset );
					}
				} else {
					$rail.css('padding-top', 0);
				}
			});
		}

		//Twitter
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

	});

	// Show/hide more text
	$(function() {
    $(".moreLess").hide();

    $(".moreLessSwitch").toggle(function() {
        $(this).html("[-] Less");
        $(this).prevAll(".moreLess").slideDown();
    }, function() {
        $(this).html("[+] More");
        $(this).prevAll(".moreLess").slideUp();
    });
});

})(jQuery);;
