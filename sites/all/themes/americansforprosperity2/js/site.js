var click = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? "touchstart" : "click";

// Feature Functions
	action = {
		selectors: {
			issues: null,
			types: null,
		},
		data: {
			action: 'get_actions',
			count: 3,
			issues: [],
			types: [],
		},
		init: function() {
			action.$                = jQuery('#action-center');
			action.data.count       = action.$.data('action-count');
			action.selectors.issues = action.$.find('.toggle[data-action-issue]');
			action.selectors.types  = action.$.find('.toggle[data-action-type]');
			action.steps            = action.$.find('.action-step').length == 2 ? action.$.find('.action-step') : false;

			if ( action.selectors.issues.length || action.selectors.types.length ) {
				action.selectors.issues.each(action.defaults);
				action.selectors.types.each(action.defaults);
				action.events();
			}
		},
		data_add: function(array, value) {
			array.push(value);
		},
		data_remove: function(array, value) {
			if ( array.indexOf(value) > 0 || array.indexOf(value) === 0 )
				array.splice(array.indexOf(value), 1);
		},
		defaults: function() {
			var $this = jQuery(this),
				type  = $this.data('action-type'),
				issue = $this.data('action-issue');

			if ( $this.hasClass('on') ) {
				if ( issue && issue != 'clear' ) action.data.issues.push(issue);
				if ( type ) action.data.types.push(type);
			}
		},
		events: function() {
			action.selectors.issues.on(click, action.toggle);
			action.selectors.types.on(click, action.toggle);
		},
		load: function() {
			var $loading = jQuery('.loading');

			jQuery('#action-cards .fill').html('');

			$loading.removeClass('hide');

			jQuery.ajax({
				url: vars.ajax_url,
				cache: false,
				data: action.data,
				data_type: 'json',
				method: 'GET',
				success: function(data) {
					$loading.addClass('hide');
					if ( data != '' ) {
						jQuery('.none-found:visible').addClass('hide');
						jQuery('#action-cards .fill').html("<div class=\"row\">"+data+"</div>");
						jQuery('#action-cards + #paging').hide();
						cpage.actions.tooltip();
					}
					else {
						jQuery('#action-cards.fill .row').html('');
						jQuery('.none-found').removeClass('hide');
					}
				},
			});
		},
		get: function() {
			action.data.action = 'get_first_action';

			jQuery.ajax({
				url: vars.ajax_url,
				cache: false,
				data: action.data,
				data_type: 'json',
				method: 'GET',
				success: function(response) {
					window.location = response.data.link;
				},
			});
		},
		toggle: function(e) {
			var $this = jQuery(this);

			if ( click == 'touchstart' ) {
				$this.on('touchend', function(e){
					action.toggle_trigger( e, $this);
					$this.off('touchend');
				});
				$this.on('touchmove', function(e){
					$this.off('touchend');
				});
			}
			else {
				action.toggle_trigger( e, $this);
				return false;
			}
		},
		toggle_trigger: function( e, $this ) {
			e.preventDefault();

			var type   = $this.data('action-type'),
				issue  = $this.data('action-issue'),
				toggle = true;

			if ( !$this.hasClass('on') ) {
				if ( issue == 'clear' ) {
					var siblings = $this.siblings('.on');
						toggle   = false;

					$this.addClass('on');
					siblings
						.removeClass('on')
						.each(function() {
							var i = jQuery(this).data('action-issue');
							action.data_remove(action.data.issues, i);
						});
				}
				if ( type ) action.data.types.push(type);
				if ( toggle && issue ) {
					jQuery('.toggle[data-action-issue="clear"]').removeClass('on')
					action.data.issues.push(issue);
				}
			}
			else {
				action.data_remove(action.data.types, type);
				action.data_remove(action.data.issues, issue);
				if ( action.data.issues.length === 0 ) jQuery('.toggle[data-action-issue="clear"]').addClass('on');
			}

			if ( toggle ) $this.toggleClass('on');

			if ( action.steps ) {
				if ( $this.parents('.action-step').hasClass('first') ) {
					jQuery(action.steps[0]).toggleClass('hide');
					jQuery(action.steps[1]).toggleClass('hide');
				}
				else action.get();
			}
			else action.load();
		}
	};
	cookie = {
		create: function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		erase: function(name) {
			cookie.create(name,"",-1);
		},
		read: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
	};
	interstitial = {
		onHold: false,
		init: function() {
			if ( vars.disable_interstitial_modals == 'false' ) {
				this.actions();
				this.on();
			}
		},
		actions: function() {
			jQuery(document).bind('gform_confirmation_loaded', function() {
				jQuery('.closebutton').click();
				cookie.create(interstitial.onComplete, 1, 30);
			});

			jQuery('.closebutton').click(function() {
				interstitial.wait();
				jQuery.magnificPopup.close();
			});
		},
		activate: function( id ) {
			jQuery.magnificPopup.open({
				showCloseBtn: false,
				mainClass: 'mfp-fade',
				removalDelay: 300,
				items: {
					src: id,
					type: 'inline'
				},
				callbacks: {
					open: function() {
						interstitial.onComplete = this.content.data('oncomplete');
						interstitial.onWait     = this.content.data('onwait');
					},
					close: function() {
						interstitial.wait();
					}
				}
			});
		},
		on: function() {
			if ( ! interstitial.onHold ) {
				jQuery('.interstitial').each(function() {
					var $this = jQuery(this);

					if ( $this.data('load') ) interstitial.onLoad( $this);
					if ( $this.data('leave') ) interstitial.onLeave( $this);
				});
			}
		},
		onLeave: function( int ) {
			var id         = int.attr('id'),
				onComplete = cookie.read(int.data('oncomplete')),
				onWait     = cookie.read(int.data('onwait'));

			if ( onComplete != 1 && onWait < 2 ) {
				interstitial.leave = true;
				jQuery(document).mouseout(function(e) {
					if ( e.toElement == null && interstitial.leave && ! jQuery('.mfp-bg').length ) {
						interstitial.leave = false;
						interstitial.activate('#'+id);
					}
				});
			}
		},
		onLoad: function( int ) {
			var id         = int.attr('id'),
				onComplete = cookie.read(int.data('oncomplete')),
				onWait     = cookie.read(int.data('onwait'));

			if ( onComplete != 1 && onWait < 1 ) this.activate('#'+id);
		},
		wait: function() {
			var wait = cookie.read(interstitial.onWait);
			if ( wait ) cookie.create(interstitial.onWait, parseInt(wait)+1, 7);
			else cookie.create(interstitial.onWait, 1, 7);
		},
	};
	state = {
		selector: null,
		init: function() {
			state.selector = jQuery('.state_selector');

			if ( jQuery('.tax-state').length ) cookie.create('state', state.selector.val());

			state.events();
		},
		events: function() {
			state.selector.change(function(e) {
				var state = jQuery(this).val();
				if ( state != '' ) cookie.create('state', state);
				else cookie.erase('state');

				var data = {
					'action' : 'set_cookie'
				};

				jQuery.ajax({
					url: vars.ajax_url,
					cache: false,
					data: data,
					data_type: 'json',
					method: 'GET',
					success: function(data) {
						// console.log(data);
					},
				});

				location.reload();
			});
		},
		abbrv: function( statename ) {
			var states = {
				'alabama' : 'AL',
				'alaska' : 'AK',
				'arizona' : 'AZ',
				'arkansas' : 'AR',
				'california' : 'CA',
				'colorado' : 'CO',
				'connecticut' : 'CT',
				'delaware' : 'DE',
				'district-of-columbia' : 'DC',
				'florida' : 'FL',
				'georgia' : 'GA',
				'hawaii' : 'HI',
				'idaho' : 'ID',
				'illinois' : 'IL',
				'indiana' : 'IN',
				'iowa' : 'IA',
				'kansas' : 'KS',
				'kentucky' : 'KY',
				'louisiana' : 'LA',
				'maine' : 'ME',
				'maryland' : 'MD',
				'massachusetts' : 'MA',
				'michigan' : 'MI',
				'minnesota' : 'MN',
				'mississippi' : 'MS',
				'missouri' : 'MO',
				'montana' : 'MT',
				'nebraska' : 'NE',
				'nevada' : 'NV',
				'new-hampshire' : 'NH',
				'new-jersey' : 'NJ',
				'new-mexico' : 'NM',
				'new-york' : 'NY',
				'north-carolina' : 'NC',
				'north-dakota' : 'ND',
				'ohio' : 'OH',
				'oklahoma' : 'OK',
				'oregon' : 'OR',
				'pennsylvania' : 'PA',
				'rhode-island' : 'RI',
				'south-carolina' : 'SC',
				'south-dakota' : 'SD',
				'tennessee' : 'TN',
				'texas' : 'TX',
				'utah' : 'UT',
				'vermont' : 'VT',
				'virginia' : 'VA',
				'washington' : 'WA',
				'west-virginia' : 'WV',
				'wisconsin' : 'WI',
				'wyoming' : 'WY',
			}
			return states[statename];
		}
	};
	takeover = {
		init: function() {
			takeover.onWait = 'takeover-wait';
			this.hold();
			this.actions();
		},
		actions: function() {
			jQuery('.close-takeover').on(click, function(e) {
				e.preventDefault();

				interstitial.onHold = false;
				// interstitial.on(); // Uncomment to fire interstitals after take over closes.

				jQuery('body').removeClass('takeover');
				jQuery('#takeover').remove();

				takeover.wait();

				cpage.onHold = false;
				cpage.init();

				return false;
			});

			jQuery('#takeover form').on('submit', function() {
				takeover.wait();
			});
		},
		hold: function() {
			if ( jQuery('body').hasClass('takeover') ) {
				cpage.onHold = true;
				interstitial.onHold = true;
			}
		},
		wait: function() {
			var wait = cookie.read(takeover.onWait);
			if ( wait ) cookie.create(takeover.onWait, parseInt(wait)+1, 7);
			else cookie.create(takeover.onWait, 1, 7);
		},
	};
	uform = {
		info: null,
		init: function() {
			var info      = cookie.read('uform'),
				statename = vars.state;

			if ( info != undefined ) uform.info = JSON.parse(decodeURIComponent(info));
			else uform.info = {}

			if ( statename != undefined && uform.info.stateabbrv == undefined ) uform.info.stateabbrv = state.abbrv(statename);
		},
	};

// Gravity Forms Donate
	gravity_forms_donate = {
		init: function() {
			this.setSelectedAmountLabel();

			jQuery('.gfield_price input[type="radio"]').change(function() {
		    gravity_forms_donate.setSelectedAmountLabel();
		  });
		},
		setSelectedAmountLabel: function() {
			var $selected = jQuery(".gfield_price input[type='radio']:checked");
		  jQuery('.gfield_price li label').removeClass('selected');
		  $selected.next('label').addClass('selected');
		}
	};

// Page Feature Initializer
	cpage = {
		onHold: false,
		init: function() {
			if ( !this.onHold ) {
				this.window();
				this.modules();
				this.click.init();
				this.actions.init();
				this.royalsliders.init();
			}
		},
		modules: function() {
			action.init();
			state.init();
			uform.init();
		},
		window: function() {
			jQuery(window).scroll(function() {
				cpage.actions.growth();
				cpage.actions.scrolledtrigger();
			});

			jQuery(window).resize(function() {
				cpage.actions.fillmargin();
				cpage.actions.postbox();
			});
		},
	};
	cpage.actions = {
		init: function() {
			this.fillmargin();
			this.growth();
			this.scrolledtrigger();
			this.selectmask();
			this.tooltip();
			this.visits();
			this.marquee();
			setTimeout(function() { cpage.actions.postbox(); }, 750);

			jQuery('.popup-video').magnificPopup({
				type: 'iframe'
			});

			jQuery('form[id*="gform"]').submit(function(e) {
				ga('send', 'event', "Email Capture", "submit", document.title);
			});

			if ( jQuery(".error404").length > 0) {
				jQuery('map').imageMapResize();
			}
		},
		growth: function() {
			var pos = (document.documentElement.scrollTop||document.body.scrollTop)/6;
			jQuery('#growth circle').attr('r', pos);
		},
		fillmargin: function() {
			var margin = ( jQuery(window).width()-jQuery('.wrapper').width())/2;
			jQuery('.right-half').css({'margin-right':'-'+margin+'px', 'padding-right': margin+'px'});
			jQuery('.left-half').css({'margin-left':'-'+(margin+40)+'px', 'padding-left': margin+'px'});
		},
		marquee: function() {
			jQuery('marquee').marquee();
			jQuery('.marquee').marquee('marquee').mouseover(function () {
				jQuery(this).trigger('stop');
			}).mouseout(function () {
				jQuery(this).trigger('start');
			});
		},
		postbox: function() {
			jQuery('.post-box').each(function() {
				var hheight = jQuery(this).find('.heading').outerHeight(),
					ehieght = jQuery(this).find('.excerpt').outerHeight();

				jQuery(this).find('.overlay').css('top',(270-18-hheight));
				jQuery(this).hover(function() {
					jQuery(this).find('.overlay').css('top',(270-ehieght-hheight));
				}, function() {
					jQuery(this).find('.overlay').css('top',(270-18-hheight));
				});
			});
		},
		scrolledtrigger: function() {
			if ( jQuery('#header').length ) {
				var target = jQuery('.scrolledtrigger').length ? jQuery('.scrolledtrigger').offset() : jQuery('#header + *').offset(),
					pos    = document.body.scrollTop;

				if ( pos > 60 && target.top > pos ) jQuery('#headerbar').addClass('scrolled up');
				else if (target.top < pos) {
					jQuery('#headerbar').addClass('scrolled');
					jQuery('#headerbar').removeClass('up');
				}

				else jQuery('#headerbar').removeClass('scrolled up');
			}
		},
		selectmask: function() {
			var jQueryselects = jQuery('select:not([name^=input_]):not([id^=input_])');
			if ( jQueryselects.length ) {
				jQueryselects.each(function() {
					var jQuerythis    = jQuery(this),
						selectclasses = jQuerythis.attr('class'),
						classes       = selectclasses ? selectclasses+' select-container' : 'select-container',
						width         = jQuerythis.outerWidth() == 0 ? 150 : jQuerythis.outerWidth() + 10;

					if ( !jQuerythis.parent().hasClass('select-container') && !jQuerythis.hasClass('selectized') )
						jQuerythis.wrap('<div class="'+classes+'" style="width:'+width+'px"></div>');
				});
			}
		},
		subissuefix: function() {
			jQuery('.sub-issues').each(function() {
				var minheight = jQuery(this).find('.rsTabs').height();
				jQuery(this).css('min-height',minheight+'px');
			});
		},
		tooltip: function() {
			var targets = jQuery('[rel~=tooltip]'),
				target  = false, tooltip = false, title = false;

			targets.bind( 'mouseenter', function() {
				target  = jQuery( this );
				tip     = target.attr( 'title' );
				tooltip = jQuery('<div id="tooltip"></div>');

				if ( !tip || tip == '' ) return false;

				target.removeAttr( 'title' );

				tooltip.css( 'opacity', 0 ).html( tip ).appendTo( 'body' );

				var init_tooltip = function() {
					if ( jQuery( window ).width() < tooltip.outerWidth() * 1.5 ) tooltip.css( 'max-width', jQuery( window ).width() / 2 );
					else tooltip.css( 'max-width', 150 );

					var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
						pos_top  = target.offset().top - tooltip.outerHeight() - 5;

					if ( pos_left < 0 ) {
						pos_left = target.offset().left + target.outerWidth() / 2 - 20;
						tooltip.addClass( 'left' );
					}
					else tooltip.removeClass( 'left' );

					if ( pos_left + tooltip.outerWidth() > jQuery( window ).width() ) {
						pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
						tooltip.addClass( 'right' );
					}
					else tooltip.removeClass( 'right' );

					if ( pos_top < 0 ) {
						var pos_top	= target.offset().top + target.outerHeight();
						tooltip.addClass( 'top' );
					}
					else tooltip.removeClass( 'top' );

					tooltip.css( { left: pos_left, top: pos_top } ).animate( { opacity: 1 }, 100 );
				};

				init_tooltip();

				jQuery( window ).resize( init_tooltip );

				var remove_tooltip = function() {
					tooltip.animate( { opacity: 0 }, 50, function() {
						jQuery( this ).remove();
					});
					target.attr( 'title', tip );
				};

				target.bind( 'mouseleave', remove_tooltip );
				document.addEventListener("touchstart", remove_tooltip, false);
			});
		},
		visits: function() {
			var visits = cookie.read('visits');

			if ( visits && window.location.pathname == '/' && ! jQuery('body').hasClass('takeover') ) {
				var visit = parseInt(visits)+1;
				cookie.create('visits', visit, 7);

				if ( visit >= 3 ) {
					setTimeout(function() {
						var target = jQuery('#focus');
						if ( target.length ) {
							jQuery('html, body').animate({
								scrollTop: target.offset().top-60
							}, 1500);
							return false;
						}
					}, 200);
				}
			}
			else cookie.create('visits', 1, 7);
		}
	};
	cpage.click = {
		init: function() {
			this.nav();
			this.more();
			this.confirm();
			this.audioPlay();
			this.accordion();
		},
		confirm: function() {
			jQuery('a[data-confirm]').on(click, function() {
				if ( !confirm( jQuery(this).data('confirm')) ) return false;
			});
		},
		more: function() {
			jQuery('.more').on( click, function(e) {
				e.preventDefault();
				jQuery("#more").fadeIn();
			});
			jQuery(document).on(click, function(e) {
				if ( !jQuery(e.target).parents('#more').length && !jQuery(e.target).is(".more") ) {
					jQuery("#more").fadeOut();
				}
			});
		},
		nav: function() {
			jQuery('#mobile-nav-toggle').click(function(e) {
				e.preventDefault();
				jQuery('#mobile-nav').toggleClass('open');
			});
		},
		audioPlay: function() {
			jQuery('audio').bind("play", function(e) {
				var el = jQuery(this);

				if ( el.attr('data-played' ) !== undefined ) return false;
				el.attr('data-played', 'true');

				if ( typeof window["dataLayer"] === undefined ) dataLayer = [];
				var fileName = /[^/]*$/.exec(el.attr('src'))[0];
				fileName = /^[^?]+/.exec(fileName)[0];
				dataLayer.push({
					'event': 'audioPlay',
					'audioFileName': fileName
				})
			});
		},
		accordion: function() {
			jQuery('.accordion-header').click(function(){
				var $current = jQuery('.accordion-item.open');
				var $next = jQuery(this).parent('.accordion-item');
				var selfOpen = $next.hasClass('open');
				$current.children('.accordion-content').slideUp(300);
				$current.removeClass('open');
				if (!selfOpen) {
					$next.children('.accordion-content').slideDown(300);
					$next.addClass('open');
				}
			});
		},
	},
	cpage.royalsliders = {
		init: function() {
			this.focii();
			this.subissues();
			this.team();
			this.testimonials();
		},
		focii: function() {
			if ( jQuery("#focii").length > 0) {
				jQuery("#focii").royalSlider({
					autoHeight: true,
					controlNavigation: 'tabs',
					controlsInside: false,
					slidesSpacing: 0,
					navigateByClick: false,
					transitionType: 'fade',
					autoPlay: {
						enabled: true,
						delay: 10000,
					},
					thumbs: {
						spacing: 0,
						arrowsAutoHide: true,
					}
				});
			}
		},
		subissues: function() {
			if ( jQuery(".sub-issues").length > 0) {
				jQuery(".sub-issues").royalSlider({
					autoHeight: true,
					controlNavigation: 'tabs',
					controlsInside: false,
					slidesSpacing: 0,
					navigateByClick: false,
					transitionType: 'fade',
					thumbs: {
						spacing: 0,
						arrowsAutoHide: true,
					}
				});
				cpage.actions.subissuefix();
			}
		},
		team: function() {
			var jQueryteamSlider = jQuery("#team-slider");
			if ( jQueryteamSlider.length > 0 ) {
				jQueryteamSlider.royalSlider({
					autoHeight: true,
					autoPlay: {
						enabled: true,
						delay: 4000,
					},
					controlNavigation: 'bullets',
					loop: true,
					transitionType: 'fade',
				});
			}
		},
		testimonials: function() {
			if ( jQuery("#testimonials .testimonial").length > 0) {
				jQuery("#testimonials").royalSlider({
					autoHeight: true,
					autoPlay: {
						enabled: true,
						delay: 6000,
						pauseOnHover: false,
					},
					controlNavigation: 'bullets',
					loop: true,
					randomizeSlides: true,
					transitionType: 'fade',
				});
			}
		}
	};

// Daisychain
	daisychain = {
		load: function( is_error ) {
			error = is_error === undefined ? false : is_error;
			data = { action: 'daisychain_bar', ajax_ref: window.location.href, error: error };
			
			jQuery.ajax({
				url: vars.ajax_url,
				cache: false,
				data: data,
				data_type: 'json',
				method: 'GET',
				success: function(response) {
					var $daisychain = jQuery('#daisychain');
					if ( $daisychain.length ) $daisychain.replaceWith(response.data);
					else jQuery('.content').before(response.data);
				},
			});
		}
	};

(function($) {
	$(function() {
		takeover.init();
		interstitial.init();
		cpage.init();
		gravity_forms_donate.init();
	});
})(jQuery);
