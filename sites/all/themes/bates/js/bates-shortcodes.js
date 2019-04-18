jQuery(function($){


	/** 
	 * Foldaway Shortcode
	 */
	if( $('.foldaway-section-header').length > 0) {

		$('.foldaway-section-header a').live('click',function(e){
			e.preventDefault();
			var parent = $(this).parent('.foldaway-section-header');
			if( parent.hasClass('js-active')){
				$(this).find('span').text('+');
				parent
					.removeClass('js-active')
					.next()
						.slideUp(200);
			} else {
				$(this).find('span').text('-');
				parent
					.addClass('js-active')
					.next()
						.slideDown(230);
			}
		});

	}


	/**
	 * Btn Shortcode
	 */
	if( $('.btn-wrap').length > 0 ) {
	   function toggleBtn($b) {

	   		if($b.hasClass('btn-action'))
	   			$wrap = $b.parents('.btn-wrap').eq(0);
	   		else if ($b.hasClass('btn-wrap'))
	   			$wrap = $b;

	 		if($wrap.hasClass('js-opened')){
	 			$wrap
	 				.removeClass('js-opened')
	 				.find('.btn-content')
	 					.slideUp(200)
	 			;
	 		} else {
	 			$wrap
	 				.addClass('js-opened')
	 				.find('.btn-content')
	 					.slideDown(200)
	 			;
	 		}

		}

		$('.btn-wrap.btn-start-open').each(function(){
			toggleBtn( $(this) );
		});

		$('.btn-action').click(function(){
			
			toggleBtn( $(this) );
			
			//add the hash to the url
			var id = $(this).attr('id');
			var newhref = window.location.origin + window.location.pathname + '#' + id;
			window.history.pushState('','', newhref);
		
	    });
		
		if( window.location.hash != '' ) {
			$el = $(window.location.hash);
			if(
			   $el.length > 0
			   && $el.hasClass('btn-action')
			   && ! $el.parents('.btn-wrap').eq(0).hasClass('btn-start-open')
			) {
				toggleBtn( $el );
			}
		}

		$('.btn-controller').click(function(){
			
			var link = $(this).attr('href');
			parts = link.split('#');
			hash = '#'+parts[1];
			//console.log(hash);
			
			if (hash != '') {
				$(hash).click();
				console.log(hash);
			}
			
			return false;
			
			});

		$('#open-all-btns').live('click touchstart', function() {
			$('.btn-action').not('.js-opened').each(function(){	
				toggleBtn( $(this) );	
			});
			return false;
		});
	}
	
	
	/**
	 * ShowHide Inline shortcode
	 */
	$('.bates_showhide_inline_control').click(function() {
		
		var elemName = $(this).data('bates_showhide_name');
		
		if ( elemName != '' ) {
			
			var $elem = $('.bates_showhide_inline_element[id="bates_showhide_inline_element-'+elemName+'"]');
			
			if( $(this).hasClass('bates_showhide_inline_control_on') ) {
				
				// change the indicator
				$(this).find('.bates_showhide_inline_indicator').text('+');
                                
				// if this element is showing, hide it
				$(this).removeClass('bates_showhide_inline_control_on');
				
				$elem.css('display','none');
			
			} else {
				
				// show the associated content area with this click
				$(this).addClass('bates_showhide_inline_control_on');
				
				$elem.css('display','inline-block');
                                
				// change the indicator
				$(this).find('.bates_showhide_inline_indicator').text('-');


			}
		}
		
		return false;
		
	});
	

	/**
	 * Tabs Shortcode
	 */
	$('.bates_tab').parents('ul').attr('id','bates_tab_group');
	
	$('.bates_tab').click(function() {
		
		var elemName = $(this).data('bates_tab_name');
		
		if ( elemName != '' ) {
			var $elem = $('.bates_tab_area[id="bates_tab_area-'+elemName+'"]');
			if( $(this).hasClass('bates_tab_on') ) {     
				// if this element is showing, hide it
				$(this).removeClass('bates_tab_on');
				$elem.slideUp(200);

			// if any tab area is showing
			} else {
	
				// if a tab area is open, don't animate, just change
				if ($('.bates_tab.bates_tab_on').length > 0) {
					$('.bates_tab_area').not($elem).hide();
					$elem.show();
	
				// if no tab area was previously showing
				} else {
					$('.bates_tab_area').not($elem).slideUp(200);
					$elem.slideDown(200);					
				}

				// add/remove tab_on class after checking for it's existence above
				$('.bates_tab').not(this).removeClass('bates_tab_on');
				$(this).addClass('bates_tab_on');

			}
		}
		return false;
	})
	$('.bates_tab_initial').click();
	
	
	/**
	 * Ex Shortcode
	 */
	/*--------------------------------------------------------------------------
	 Repurposed by Nicholas O'Brien. 
	 Provides condensed content for responsive presentation.
	 Originally written by rrichar2 for campusconnect site in WordPress.
	---------------------------------------------------------------------------*/
	if( $('div.listing-item').length > 0 ) {
		$("div.listing-item").addClass("collapse");
		$("a.title").attr("href" , "#");
		// expand/collapse to hide/show tables
		$("a.title").click(function () {
			var parentSelect = $(this).parent().attr("class");
			if (parentSelect == 'listing-item collapse')  {
				$(this).parent().removeClass("collapse").addClass("expand");
				return false;
			}
			if (parentSelect == 'listing-item expand')  {
				$(this).parent().removeClass("expand").addClass("collapse");
				return false;
			}
		});	
		/*show/hide all detail*/
		$("#hideDetail").hide();
		$("#showDetail").show();

		$("#hideDetail").click(function () {
			$("div.listing-item").removeClass("expand").addClass("collapse");
			$("#hideDetail").hide();
			$("#showDetail").show();
			
		});
		$("#showDetail").click(function () {
			$("div.listing-item").removeClass("collapse").addClass("expand");
			$("#hideDetail").show();
			$("#showDetail").hide();
		});
	}


	/** 
	 * Thermometer Gauge shortcode
	 *
	 * requires: d3
	 */
	if( $('.thermometer-gauge').length ) {
		var svgPadding = -1;

		// basically let css control the width and just get the existing width
		// return document.getElementById('thermo-gauge').getBBox().width;
		var getSvgSize = function(dimension) {
			var dim = (typeof dimension !== 'undefined' && (dimension == 'height' || dimension == 'h' ))
					   ? 'h' : 'w';
			if(dim == 'h') {
				return document.getElementById('thermo-gauge-svg').getBoundingClientRect().height;
			} else {
				return document.getElementById('thermo-gauge-svg').getBoundingClientRect().width;
			}
		};

		var maxBarWidth = function(){
			return getSvgSize('w') - (svgPadding *2);
		};

		var svg = d3.select('.thermometer-gauge').append('svg').attr('class','bar-gauge').attr('id','thermo-gauge-svg');
		var bar,labels;
		var defs = svg.append('defs');
		var barGradient = defs.append('linearGradient').attr('id','bar-gradient');

		barGradient
			.append('stop')
				.attr('offset','0%')
				.classed('gauge-stop-1',true)
		;
		barGradient
			.append('stop')
				.attr('offset','100%')
				.classed('gauge-stop-2',true)
		;


		var currently = $('.thermometer-gauge').data('count');
		var goal = $('.thermometer-gauge').data('goal');
		var gaugeLabels = {
			success: $('.thermometer-gauge').data('successtext'),
			goal:  $('.thermometer-gauge').data('goaltext')
		};

		var doGauge = function() {
			// set the svg size
			svg.attr('height',function(){return getSvgSize('h');})//.attr('width', function(){return '90%';/*getSvgSize('w');*/});
			;
			var barWidth = maxBarWidth();

			var gaugeScale = d3.scale.linear()
				.domain([0,goal-1,goal,goal*goal])
				.range([50+svgPadding, (getSvgSize('w')-svgPadding-30), barWidth, barWidth])
			;
			var addComma = d3.format("0,000");

			// initialize bar
			bar = svg.selectAll('rect').data([currently]);

			// on redraw only
			bar
				.attr('height',function() {
					return getSvgSize('h') - (svgPadding*2);
				})
				.transition().duration(1000).ease('exp-out') 
				.attr('width',function(d){
					return gaugeScale(d);
				})

			// on first draw only
			bar.enter().append('rect')
				.attr('height',0)
				.attr('y', svgPadding )
				.attr('width', 0 )
				.attr('x', svgPadding )
				.attr('fill','url(#bar-gradient)')
				.attr('height',function() {
					return getSvgSize('h') - (svgPadding*2);
				})
				.transition().delay(300).duration(3000).ease('exp-out') 
				.attr('width',function(d){
					return gaugeScale(d);
				})

			;

			// initialize labels
			labels = svg.selectAll('text').data([{"current":currently},{"goal":gaugeLabels.goal}]);
			
			labels.enter().append('text').text(0)
				.classed('label',true)
				.each(function(d,i){

				// if we're looking at the current number
				if( typeof d.current != 'undefined' ) {

					d3.select(this)
					.classed('label-current',true)
					.transition().delay(300).duration(3200).ease('exp-out')

					// animate the numbers
					.tween('text',function(d){
						var currentVal = parseInt( this.textContent, 10);
						var interpolator = d3.interpolateRound(currentVal,d.current);
						return function(t){
							var numContent = interpolator(t);
							this.textContent = addComma( numContent );
							if( numContent >= goal ){
								d3.select(this).classed('label-success',true);
								this.textContent = gaugeLabels.success;
							}
						};
					});

				} else {
				
					// label the goal
					d3.select(this)
						.text(function(d){
							if(typeof d.goal==='number')
								return addComma(d.goal);
							else
								return d.goal;
						})
						.classed('label-goal',true)
					;
				
				}
			});

			// update label placement/size
			labels.each(function(d,i){

				d3.select(this)
					.attr('y',function(){
						// center the text vertically
						return (getSvgSize('h')/2) + svgPadding + (this.getBBox().height / 4);
					})
				;

				if( typeof d.current != 'undefined') {
					d3.select(this)
						.attr('x', svgPadding + 15)
					;
				} else {
					d3.select(this)
						.attr('x',function(){
							return getSvgSize('w') - svgPadding - 15 - this.getBBox().width;
						})
					;
				}

			});
		};

		doGauge();

		// redraw the bar, but not too often
		var resizeThermobarTimeout;
		$(window).live('resize',function(){
			window.clearTimeout(resizeThermobarTimeout);
			resizeThermobarTimeout = window.setTimeout(doGauge,250);
		});
	}

	/* Tablesaw
	 */
	var tdHasText = function(td,text){
		var tdText = td.text();
		if(tdText=='')
			return false;
		tdText = tdText.toLowerCase();
		if( tdText.indexOf(text) > -1)
			return true;

		return false;
	};

	var resetTable = function($table) {
		$table.find('tr').removeClass('hidden');
		$table.removeClass('filtered');
	}

	$('.tablesaw-inline-search-results').live('keyup',function(){

		var table = $(this).parent('.tablesaw-wrapper').find('table');
		var val = $(this).val();

		if(table.length==0) return;

		if(val == '' || val.length < 3) {
			resetTable(table);
			return;
		}

		val = val.toLowerCase();

		table.find('tbody tr').each(function(){
		 
		 	$(this).find('td').each(function(){

		 		var elementToSearch = $(this);

		 		// tablesaw puts the cell content into a sub element to allow collapsing, so
		 		// we have to grab the content from there and not the also-added label element.
		 		if( $(this).find('.tablesaw-cell-content').length > 0)
		 			elementToSearch = $(this).find('.tablesaw-cell-content');

			 	if( tdHasText( elementToSearch , val ) ) {
					$(this).parents('tr').eq(0).removeClass('hidden');
					return false;
				} else {
					$(this).parents('tr').eq(0).addClass('hidden');
				}
		 	});


			
		});
		table.addClass('filtered');

	});


	/* Make a Give [give] module
	 */

	(function(){
		if( ! $('.give-now-module').length )
			return false;

		$('.give-now-button').hover(function(){
			$(this).siblings().removeClass('hover').addClass('unhover');
			$(this).removeClass('unhover').addClass('hover');
		},function(){
			$('.give-now-button').removeClass('hover unhover');
		});

		// purposefully only getting first, though there could be multiple
		var modal = document.querySelector('.give-module-modal');
		var modalContent = modal.querySelector('.modal-content');
		modal.addEventListener('click', function(e){
			this.classList.add('js-inactive');
			this.classList.remove('js-active');
			var animationEndFunc = function(){
				this.classList.remove('js-inactive');
				this.removeEventListener('animationend',animationEndFunc);
			}
			this.addEventListener('animationend',animationEndFunc);
		});
		modalContent.addEventListener('click',function(e){
			e.stopImmediatePropagation();
		});

		// set the hover tips
		var tippedSmallOpts = {
			position: 'top',
			size: 'large',
			maxWidth: 150,
			showDelay: 500,
			offset: { x: -4 },
		};
		var tippedFooterOpts = JSON.parse(JSON.stringify(tippedSmallOpts));
		tippedFooterOpts.skin = 'light';
		var tippedLargeOpts = {
			position: 'topleft',
			size: 'large',
			maxWidth: 225,
			showDelay: 500,
		}

		Tipped.create('.js-tipped-large',false,tippedLargeOpts);
		Tipped.create('.js-tipped-small',false,tippedSmallOpts);
		Tipped.create('.js-tipped-footer',false,tippedFooterOpts);

		// set the paypal click action
		var paypalClicks = document.querySelectorAll(".give-now-button-paypal");
		for(var i=0;i<paypalClicks.length;i++) {
			paypalClicks[i].addEventListener("click",function(e){
				e.preventDefault();
				var form = document.createElement("form");
				var fields = [
					{
						type: "hidden",
						name: "cmd",
						value: "_s-xclick"
					},
					{
						type: "hidden",
						name: "hosted_button_id",
						value: "J3G8N2BQ96P32"
					}
				];
				form.style.display = 'none';
				form.setAttribute("method","post");
				form.setAttribute("action","https://www.paypal.com/cgi-bin/webscr");
				for(var i=0;i<fields.length;i++){
					var field = document.createElement("input");
					for(attr in fields[i]) {
						if( ! fields[i].hasOwnProperty(attr) ) continue;
						field.setAttribute( attr , fields[i][attr] );
					}
					form.appendChild(field);
				}
				document.querySelector("body").appendChild(form);
				form.submit();
			});
		}

		// set the Amazon click action
		var amazonClicks = document.querySelectorAll('.give-now-button-amazon');
		for(var i=0;i<amazonClicks.length;i++){
			amazonClicks[i].addEventListener("click", function(e){
				e.preventDefault();
				// Sigh, still supporting IE10, which doesn't have template literals.
				// modalContent.innerHTML = `<div
				// 	data-ap-widget-type="expressDonationWidget"
				// 	data-ap-widget-theme="ap-light"
				// 	data-ap-widget-amount-presets="5,25,50,100"
				// 	data-ap-widget-default-amount="25"
				// 	data-ap-signature="z%2F7CQNj2sU1wodrtSz65X5Sqs%2FPNrRjlJA%2FSzZxtpcM%3D"
				// 	data-ap-seller-id="A38QO804OX4J0B"
				// 	data-ap-access-key="AKIAJBIKQMSL6OWGWA6A"
				// 	data-ap-lwa-client-id="amzn1.application-oa2-client.79d4cf316f04480ebe546ad965f5ee91"
				// 	data-ap-return-url="https://www.bates.edu/giving/successful-transaction/"
				// 	data-ap-cancel-return-url="https://www.bates.edu/giving/unsuccessful-transaction/"   
				// 	data-ap-currency-code="USD"
				// 	data-ap-amount="0"
				// 	data-ap-note=""
				// 	data-ap-shipping-address-required="false"
				// 	data-ap-payment-action="AuthorizeAndCapture"
				// 	>
				// </div>`;
				modalContent.innerHTML = '<div \
					data-ap-widget-type="expressDonationWidget" \
					data-ap-widget-theme="ap-light" \
					data-ap-widget-amount-presets="5,25,50,100" \
					data-ap-widget-default-amount="25" \
					data-ap-signature="z%2F7CQNj2sU1wodrtSz65X5Sqs%2FPNrRjlJA%2FSzZxtpcM%3D" \
					data-ap-seller-id="A38QO804OX4J0B" \
					data-ap-access-key="AKIAJBIKQMSL6OWGWA6A" \
					data-ap-lwa-client-id="amzn1.application-oa2-client.79d4cf316f04480ebe546ad965f5ee91" \
					data-ap-return-url="https://www.bates.edu/giving/successful-transaction/" \
					data-ap-cancel-return-url="https://www.bates.edu/giving/unsuccessful-transaction/" \
					data-ap-currency-code="USD" \
					data-ap-amount="0" \
					data-ap-note="" \
					data-ap-shipping-address-required="false" \
					data-ap-payment-action="AuthorizeAndCapture" \
					> \
				</div>';
				var amazonGiveScript = document.createElement('script');
				amazonGiveScript.setAttribute('src', "https://static-na.payments-amazon.com/OffAmazonPayments/us/js/Widgets.js");
				amazonGiveScript.async = true;
				modal.appendChild(amazonGiveScript);
				modal.classList.add('js-active');
			});
		}
	})();

});
