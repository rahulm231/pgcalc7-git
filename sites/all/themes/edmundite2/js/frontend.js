;(function($){
	"use strict";

	var DGTFramework = {
		init: function(){
			String.prototype.replaceAll = function(search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
		}
	};

	var DGTQuickView = {
		init: function(){
			$('.products .product').each(function(){
				var product_url = $(this).find('a:first').attr('href');
				$(this).append('<a class="btn dgt-quickview-btn" data-href="'+product_url+'">'+DGTFW_I18N_JS.quick_view+'</a>');
			})

			this.show();
		},
		reBindEventWooProductDetail: function(){
			// wc_add_to_cart_params is required to continue, ensure the object exists
			//if ( typeof wc_add_to_cart_params != 'undefined' ) {

			// Ajax add to cart
			$( document ).on( 'click', '.add_to_cart_button', function() {

				// AJAX add to cart request
				var $thisbutton = $( this );

				if ( $thisbutton.is( '.ajax_add_to_cart' ) ) {

					if ( ! $thisbutton.attr( 'data-product_id' ) ) {
						return true;
					}

					$thisbutton.removeClass( 'added' );
					$thisbutton.addClass( 'loading' );

					var data = {};

					$.each( $thisbutton.data(), function( key, value ) {
						data[key] = value;
					});

					// Trigger event
					$( document.body ).trigger( 'adding_to_cart', [ $thisbutton, data ] );

					// Ajax action
					$.post( wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'add_to_cart' ), data, function( response ) {

						if ( ! response ) {
							return;
						}

						var this_page = window.location.toString();

						this_page = this_page.replace( 'add-to-cart', 'added-to-cart' );

						if ( response.error && response.product_url ) {
							window.location = response.product_url;
							return;
						}

						// Redirect to cart option
						if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {

							window.location = wc_add_to_cart_params.cart_url;
							return;

						} else {

							$thisbutton.removeClass( 'loading' );

							var fragments = response.fragments;
							var cart_hash = response.cart_hash;

							// Block fragments class
							if ( fragments ) {
								$.each( fragments, function( key ) {
									$( key ).addClass( 'updating' );
								});
							}

							// Block widgets and fragments
							$( '.shop_table.cart, .updating, .cart_totals' ).fadeTo( '400', '0.6' ).block({
								message: null,
								overlayCSS: {
									opacity: 0.6
								}
							});

							// Changes button classes
							$thisbutton.addClass( 'added' );

							// View cart text
							if ( ! wc_add_to_cart_params.is_cart && $thisbutton.parent().find( '.added_to_cart' ).size() === 0 ) {
								$thisbutton.after( ' <a href="' + wc_add_to_cart_params.cart_url + '" class="added_to_cart wc-forward" title="' +
									wc_add_to_cart_params.i18n_view_cart + '">' + wc_add_to_cart_params.i18n_view_cart + '</a>' );
							}

							// Replace fragments
							if ( fragments ) {
								$.each( fragments, function( key, value ) {
									$( key ).replaceWith( value );
								});
							}

							// Unblock
							$( '.widget_shopping_cart, .updating' ).stop( true ).css( 'opacity', '1' ).unblock();

							// Cart page elements
							$( '.shop_table.cart' ).load( this_page + ' .shop_table.cart:eq(0) > *', function() {

								$( '.shop_table.cart' ).stop( true ).css( 'opacity', '1' ).unblock();

								$( document.body ).trigger( 'cart_page_refreshed' );
							});

							$( '.cart_totals' ).load( this_page + ' .cart_totals:eq(0) > *', function() {
								$( '.cart_totals' ).stop( true ).css( 'opacity', '1' ).unblock();
							});

							// Trigger event so themes can refresh other areas
							$( document.body ).trigger( 'added_to_cart', [ fragments, cart_hash, $thisbutton ] );
						}
					});

					return false;

				}

				return true;
			});
			//}

			// wc_single_product_params is required to continue, ensure the object exists
			//if ( typeof wc_single_product_params != 'undefined' ) {


			// Tabs
			$( '.wc-tabs-wrapper, .woocommerce-tabs' )
				.on( 'init', function() {
					$( '.wc-tab, .woocommerce-tabs .panel:not(.panel .panel)' ).hide();

					var hash  = window.location.hash;
					var url   = window.location.href;
					var $tabs = $( this ).find( '.wc-tabs, ul.tabs' ).first();

					if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' ) {
						$tabs.find( 'li.reviews_tab a' ).click();
					} else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
						$tabs.find( 'li.reviews_tab a' ).click();
					} else {
						$tabs.find( 'li:first a' ).click();
					}
				})
				.on( 'click', '.wc-tabs li a, ul.tabs li a', function() {
					var $tab          = $( this );
					var $tabs_wrapper = $tab.closest( '.wc-tabs-wrapper, .woocommerce-tabs' );
					var $tabs         = $tabs_wrapper.find( '.wc-tabs, ul.tabs' );

					$tabs.find( 'li' ).removeClass( 'active' );
					$tabs_wrapper.find( '.wc-tab, .panel:not(.panel .panel)' ).hide();

					$tab.closest( 'li' ).addClass( 'active' );
					$tabs_wrapper.find( $tab.attr( 'href' ) ).show();

					return false;
				})
				.trigger( 'init' );

			$( 'a.woocommerce-review-link' ).click( function() {
				$( '.reviews_tab a' ).click();
				return true;
			});

			// Star ratings for comments
			$( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );

			$( 'body' )
				.on( 'click', '#respond p.stars a', function() {
					var $star   	= $( this ),
						$rating 	= $( this ).closest( '#respond' ).find( '#rating' ),
						$container 	= $( this ).closest( '.stars' );

					$rating.val( $star.text() );
					$star.siblings( 'a' ).removeClass( 'active' );
					$star.addClass( 'active' );
					$container.addClass( 'selected' );

					return false;
				})
				.on( 'click', '#respond #submit', function() {
					var $rating = $( this ).closest( '#respond' ).find( '#rating' ),
						rating  = $rating.val();

					if ( $rating.size() > 0 && ! rating && wc_single_product_params.review_rating_required === 'yes' ) {
						window.alert( wc_single_product_params.i18n_required_rating_text );

						return false;
					}
				});
			//}
		},
		show: function(){

			$('.products .product .dgt-quickview-btn').on('click', function(){
				var $this = $(this);
				$.get( $this.data('href'), function( response ) {
					var product_data = $(response).find('.product.type-product').html();
					$.fancybox({
						'padding'		: 0,
						'autoScale'		: true,
						'transitionIn'	: 'none',
						'transitionOut'	: 'none',
						'content'		: product_data,
					});

					DGTQuickView.reBindEventWooProductDetail();

					return false;
				});
			});
		}
	};

	var DGTAnimation = {
		add_loading: function(){

		},
		remove_loading: function(){

		}
	};

	var DGTProductFilter = {
		init: function(){
			this.remove_ordering();
			this.event_filter();
			this.event_remove_var();
		},
		remove_ordering: function(){
			$('.woocommerce-ordering').remove();
		},

		event_filter: function(){
			$('.dgt-ajax-filter a').on('click', function(e){
				e.preventDefault();

				var $this = $(this);
				var type =  $this.data('type');
				var data_filter = {};
				data_filter['dgt_ajax_product_filter'] = '1';

				if(!$this.hasClass('active')){
					//Remove all params in sortby and price filter. In sortby and price filter we just use single params.
					if( type == 'sortby' || type == 'price_filter' ){
						$this.closest('.dgt-ajax-filter').find('a').removeClass('active').next().remove();
					}

					//add class active and remove button
					$this.addClass('active')
						.after('<span class="dgt-remove-ajax-product-filter-var"><i class="fa fa-times"></i></span>');
					DGTProductFilter.event_remove_var();
				}else{
					$this.removeClass('active').next().remove();
				}


				$('.dgt-ajax-filter a.active').each(function() {
					var type = $(this).data('type');
					if(!data_filter[type]){
						data_filter[type] = [];
					}
					data_filter[type].push( $(this).data('value') );
				});

				DGTAnimation.add_loading();
				$.get(DGTFW_JS.shop_url, data_filter).done(function(data) {
					var wc_products = $(data).find('.products').html();
					if(wc_products){
						$('.products').html( wc_products );
					} else {
						$('.products').html('');
					}

					var wc_pagination = $(data).find('.woocommerce-pagination').html();
					if(wc_pagination) {
						$('.woocommerce-pagination').html(wc_pagination);
					} else {
						$('.woocommerce-pagination').html('');
					}
					$('.woocommerce-result-count').html( $(data).find('.woocommerce-result-count').html() );

					if(DGTQuickView){
						DGTQuickView.init();
					}

					DGTAnimation.remove_loading();

				});
			});
		},
		event_remove_var: function(){
			$('.dgt-remove-ajax-product-filter-var').on('click', function(){
				var $this = $(this);
				$this.prev().trigger('click');
			});
		}
	};

	var DGTMegaMenu = {
		megamenu: function(){
			var menu_container = $('#dgt-navigation ul ul.dgt-megamenu-content');
			menu_container.each(function(){
				$(this).addClass( 'dgt-megamenu-cols-' + $(this).find(' > li ').length);
			});
			menu_container.find(' > li').addClass('dgt-megamenu-item');
			menu_container.find(' > li > a').addClass('dgt-megamenu-title');
		}
	};

	var DGTDonate = {

		validateEmail: function (email) {
			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(email);
		},

		donateValidate: function(dgt_donate_form){
			var valid = true;
			//check amount value
			dgt_donate_form.find('.dgt-notice').slideUp(200);

			if (!parseInt(dgt_donate_form.find('[name="amount"]').val()) ) {
				dgt_donate_form.children('.dgt-notice.amount-invalid').slideDown(200);
				valid = false;
			}

			// check require fields
			dgt_donate_form.find('.dgt-require').each(function () {
				if ($(this).val() == '') {
					dgt_donate_form.children('.dgt-notice.require-field').slideDown(200);
					valid = false;
				}
			});
			// check email
			dgt_donate_form.find('.dgt-email').each(function () {
				if (! DGTDonate.validateEmail($(this).val())) {
					dgt_donate_form.children('.dgt-notice.email-invalid').slideDown(200);
					valid = false;
				}
			});
			return valid;
		},

		init: function(){
			$('.dgt-donate-button').on('click', function(e){
				e.preventDefault();
				var cause_id = $(this).data('id');

				jQuery.fancybox({
					href: DGTFW_JS.ajax_url,
					type: "ajax",
					ajax: {
						type: "POST",
						data: {
							action: 'dgt_donate_form',
							cause_id: cause_id
						},
						dataType: 'html',
					},
					padding : 0,
					overlayColor: "#000",
					overlayOpacity: 0.6,
					onComplete: function(){
						DGTDonate.initDonateForm();
					}
				});



			});
		},

		initDonateForm: function(){
			// donate form
			$('.dgt-paypal-form').each(function() {
				var dgt_donate_form = $(this);
				dgt_donate_form.find('.dgt-amount-button').click(function () {
					var amount = $(this).attr('data-val');
					$(this).addClass('active').siblings().removeClass('active');
					$(this).closest('.dgt-paypal-form').find('[name="amount"]').val(amount);
				});

				dgt_donate_form.find('.custom-amount').change(function () {
					var amount = parseInt($(this).val());
					$(this).siblings().removeClass('active');
					$(this).closest('.dgt-paypal-form').find('[name="amount"]').val(amount);
				});

				dgt_donate_form.submit(function (e) {

					if ( DGTDonate.donateValidate(dgt_donate_form) ) {
						dgt_donate_form.children('.dgt-notice').slideUp(200);
						dgt_donate_form.children('.dgt-paypal-loader').slideDown(200);

						var custom = '';
						dgt_donate_form.find('.dgt-donor-fields input, .dgt-donor-fields textarea').each(function() {
							custom += $(this).val().replaceAll(',', ' ') + ',';
						});
						dgt_donate_form.find('[name="custom"]').val( custom.slice(0, -1) );

						var ajax_url = DGTFW_JS.ajax_url;

						$.ajax({
							type: 'POST',
							url: ajax_url,
							data: dgt_donate_form.serialize(),
							dataType: 'json',
							error: function (a, b, c) {
								console.log(a, b, c);
							},
							success: function (data) {
								dgt_donate_form.children('.dgt-paypal-loader').slideUp(200);

								dgt_donate_form.children('.dgt-notice.alert-message')
									.html(data.message).slideDown(200).addClass('dgt-' + data.status);
								if (data.status == 'redirect') {
									dgt_donate_form[0].submit();
								}

								if (data.status == 'success') {
									dgt_donate_form.attr('action', data.thankyou);
									dgt_donate_form[0].submit();
								}
							}
						});
					}

					e.preventDefault();
					e.returnValue = false;
				});
			});
		}
	}

	if(!window.DGTFramework) {
		window.DGTFramework = DGTFramework;
	}

	if(!window.DGTMegaMenu) {
		window.DGTMegaMenu = DGTMegaMenu;
	}
	if(!window.DGTQuickView) {
		window.DGTQuickView = DGTQuickView;
	}
	if(!window.DGTAnimation) {
		window.DGTAnimation = DGTAnimation;
	}
	if(!window.DGTProductFilter) {
		window.DGTProductFilter = DGTProductFilter;
	}
	if(!window.DGTDonate) {
		window.DGTDonate = DGTDonate;
	}

	$(document).ready(function () {
		DGTFramework.init();
		DGTMegaMenu.megamenu();
		DGTDonate.init();
	});
})(window.jQuery);
