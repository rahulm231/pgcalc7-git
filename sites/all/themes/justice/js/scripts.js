( function($) {
		Drupal.behaviors.bwm_theme = {
			attach : function(context, settings) {
				$(document).ready(function() {

					/* PGCS - 353*/
					var current_path = window.location.pathname;
					if (current_path === "/") {
						$('#block-system-main-menu h2 a').addClass("active-trail active");
					}

					// Back to top fun scrolling
					$('a[href=#top]').click(function() {
						$('html, body').animate({
							scrollTop : 0
						}, 'slow');
						return false;
					});

					$("#selCOid").change(function() {
						if ($("select option:selected").length > 5) {
							alert('Only 5 group selections are allowed.');
							$("#selCOid option:selected").removeAttr("selected");
						}
					});

					// Dashboard member benefits - Move the membership expiring block from bottom to top of my-member-benefits page
					if ($('.page-node-12995').length && $('#block-block-24').length) {
						$('#block-block-24').appendTo('#content-header');
					}

					// Expand secondary menu in mobile if viewed thru app on dashboard page. Hidden elsewhere on site.
					if ($('body').hasClass("app")) {
						$('#block-block-59').prependTo('#dashboard-content');
						$('#block-block-59').css({
							"display" : "block",
							"position" : "relative",
							"top" : "0"
						});
						$('#block-block-59').hide();
						// hidden at start
					}

					// Show secondary menu in mobile if viewed thru app on dashboard page. It will be hidden elsewhere
					if ($('body').hasClass("app") && ($('body').hasClass("page-node-11255") || $('body').hasClass("page-user-1"))) {
						$('#block-block-59').show();
					}

					// Member Search: Show mobile iframe if viewed thru app on dashboard page. Will show desktop version otherwise
					if ($('body').hasClass("app") && ($('body').hasClass("page-node-12474"))) {
						$('.content iframe#mobileFrame').show();
						$('.content iframe#desktopFrame').hide();
					}

					/*====================================================================
					 /*	This MODAL call is for the splash page.  Remove this call, and the
					 /*	associated .js file (../js/jquery.simplemodal-1.4.4.js) to remove.
					 /*==================================================================

					 if (getCookie('modal-banner-911-shown') != '1') {
					 jQuery.modal('<div id="modal" class="modal-banner-911">' +
					 '<div class="modal-banner-911-background"><a class="modal-banner-911-link" title="Learn more and sign up today" href="http://www.enddd.org/trial-lawyer-911-campaign/" target="_blank"></a></div>' +
					 ' </div>'
					 ,
					 {
					 autoResize: true,
					 escapeClose: true,
					 overlayClose: true
					 });

					 createCookie('modal-banner-911-shown', '1', 15);
					 }*/

					/*====================================================================
					 Fixed header
					 On scroll, it gets the height of the fixed header and sets the spacing to that height
					 Then fixes the header
					 ====================================================================*/
					window.menuOpen = false;

					$(window).scroll(function() {
						var fh = $('#fixed-header').height();
						if (!window.menuOpen) {
							if ($(window).scrollTop() > 0) {
								$('#fix-head-spacing').height(fh);
								$('#fixed-header').css('position', 'fixed');
							} else {
								$('#fix-head-spacing').height(0);
								$('#fixed-header').css('position', 'relative');
							}
						}
					});

					/*==========================================================
					Mobile Navigation
					//this has to interact with the fixed header
					==========================================================*/

					//Open button
					$('#mobile-menu-button').click(function(e) {
						if ($('#navigation .mobile-menu').css('display') == 'none') {
							//code to scroll to top and remove fixed header
							$(window).scrollTop(0).trigger('scroll');
							window.menuOpen = true;
							//fadeIn
							$('#navigation .mobile-menu').fadeIn();
						} else {
							$('#navigation .mobile-menu').fadeOut(function() {
								//code to reactive fixed header
								window.menuOpen = false;
							});
						}
						e.preventDefault();
					});

					//function to hide open menu when window is resized larger than mobile
					// The number that I am comparing is the breakpoint at which the menu button disappears
					function hideResizeMobileMenu() {
						var myCurWi = $(window).width();
						if (myCurWi > 1294) {
							$('#navigation .mobile-menu').css('display', 'none');
							window.menuOpen = false;
						}
					}

					//adding arrows to links w/ subnavs
					function addSubnavIndicator(thisLink) {
						$(thisLink).each(function(idx, obj) {
							if ($(obj).parent().has('ul').length > 0) {
								$(obj).append(' <i class="fa fa-angle-down"></i>');
							}
						});
					}

					//addSubnavIndicator($("#navigation .mobile-menu ul.menu li a"));

					//function to look for sublinks and activate them if there are
					//this allows for the opening and closing of menus but you cannot click on a parent link
					/*function mobileSubnav(thisLink){
					if( $(thisLink).parent().has('ul').length > 0 ){
					if( $(thisLink).parent().find('ul:first').is(":visible")){
					$(thisLink).parent().find('ul:first').fadeOut();
					$(thisLink).parent().removeClass('mobile-link-open');
					} else {
					$(thisLink).parent().find('ul:first').fadeIn();
					$(thisLink).parent().addClass('mobile-link-open');
					}
					return false;
					}
					return true;
					}*/

					//function to look for sublinks and activate them if there are
					//This does NOT allow the closing of links
					function mobileSubnav(thisLink) {
						//checks to see if current link is already open and goes to url if it is
						if ($(thisLink).hasClass('firstclick')) {
							var addressValue = $(thisLink).attr("href");
							window.location = addressValue;
						} else if ($(thisLink).parent().has('ul').length > 0) {
							$(thisLink).parent().find('ul:first').fadeIn();
							$(thisLink).parent().addClass('mobile-link-open');
							$(thisLink).addClass('firstclick');
							return false;
						}
						return true;
					}

					//Action on a link that contains sublinks
					$('#navigation .mobile-menu ul.menu li a').click(function(e) {
						if (! mobileSubnav(this)) {
							e.preventDefault();
						}
					});

					/*==========================================================
					Dashboard Navigation
					This also interacts with fixed header
					==========================================================*/
					//Open button
					$('#dashboard-button').click(function(e) {
						//if in mobile
						if (($('#dashboard-heading').width() <= 480) && (!$('body').hasClass('app'))) {
							if ($('.dashboard-menu.mobile-nav').css('display') == 'none') {
								//code to scroll to top and remove fixed header
								$(window).scrollTop(0).trigger('scroll');
								window.menuOpen = true;
								//fadeIn
								$('.dashboard-menu.mobile-nav').fadeIn();
							} else {
								//fadeOut
								$('.dashboard-menu.mobile-nav').fadeOut(function() {
									//code to reactive fixed header
									window.menuOpen = false;
								});
							}
							e.preventDefault();
						} else if ($('body').hasClass('app')) {
							// if in mobile app - On Dashboard button click: toggle prepended Menu div on/off
							$('#block-block-59').toggle("slow");
							e.preventDefault();
						}
					});

					/*==========================================================
					 scrolling to target id's on page
					 this needs to be offset by height of fixed header
					 ==========================================================*/
					$(".jump-link").click(function(e) {
						//gets the target based on the href of the <a>
						var pageNum = $(this).attr("href");
						//gets the height of the fixed header
						var fh = $('#fixed-header').height();
						//animates to the target
						$('html, body').animate({
							scrollTop : $(pageNum).offset().top - fh
						}, 500);
						e.preventDefault();
					});

					/*==========================================================
					Multi column lists (on Sections, etc)
					//uses jquery.easyListSplitter.js
					==========================================================*/
					//Sections (2 cols)
					$('.sections-list ul').easyListSplitter({
						colNumber : 2
					});
					//Litigation Groups (4 cols)
					$('.litigation-list ul').easyListSplitter({
						colNumber : 4
					});
					//Litigation Groups (2 cols)
					$('.litigation-list-2 ul').easyListSplitter({
						colNumber : 2
					});

					/*====================================================================
					Homepage Slide Carousel
					====================================================================*/
					//Set the variable with the default code
					var mySlideshow = $(".view-homepage-slideshow").html();

					function slideShowResize() {
						if (mySlideshow) {
							//destroy the slideshow
							$('#block-views-homepage_slideshow-block .view-content').cycle('destroy');
							//delete the html
							$('#block-views-homepage_slideshow-block .view-content').remove();
							//add back the html from the variable (captured on load)
							$('#block-views-homepage_slideshow-block').append(mySlideshow);
							//reinitalize the slideshow
							$('#block-views-homepage_slideshow-block .view-content').cycle({
								fx : 'carousel',
								slides : '#views_slideshow_cycle_teaser_section_homepage_slideshow-block > div',
								speed : 800,
								easing : 'easeInOutCirc',
								/*next: "#slide-cycle-next",
								 prev: "#slide-cycle-prev",*/
								pagerTemplate : '<img src="/sites/all/themes/Justice/images/blank.gif" />',
								paused : false,
								swipe : true,
								carouselVisible : 3,
								timeout : 8000,
								slideResize : false
							});
						};
					};
					$('#slide-cycle-next').live('click', function() {
						$('#block-views-homepage_slideshow-block .view-content').cycle('next');
					});
					$('#slide-cycle-prev').live('click', function() {
						$('#block-views-homepage_slideshow-block .view-content').cycle('prev');
					});

					/*====================================================================
					 Search Block
					 ====================================================================*/
					$('.search.icon.normal').toggle(function() {
						$(this).toggleClass('active');
						$('.search-container').stop();
						$('.search-container').show();
					}, function() {
						$(this).toggleClass('active');
						$('.search-container').stop();
						$('.search-container').hide();
					});

					/*====================================================================
					Search Facets (Accordion effect)
					====================================================================*/
					//hide all facet data
					$('.facet-search-block .item-list').toggle();
					$('.facet-search-block form').toggle();

					//add icon to h2 and class to block
					$('.facet-search-block').addClass('facet-closed').find('h2').prepend('<i class="fa fa-angle-right"></i> ');

					//Actions to open/close data
					$('.facet-search-block h2').click(function() {
						if ($(this).parents('.facet-search-block').hasClass('facet-closed')) {
							$(this).parents('.facet-search-block').removeClass('facet-closed').addClass('facet-open');
							$(this).find('i').removeClass('fa-angle-right').addClass('fa-angle-down');
						} else {
							$(this).parents('.facet-search-block').removeClass('facet-open').addClass('facet-closed');
							$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-right');
						}
						$(this).parent().find('.item-list').toggle();
						$(this).parent().find('form').toggle();
						setTheContentHeight();
					});

					/*====================================================================
					 Injecting fontawesome icons
					 ====================================================================*/

					function injectRightArrow(obj) {
						$(obj).append(' <i class="fa fa-angle-right injected"></i>');
					}

					//injectRightArrow($(".join-login-nav .leaf a"));
					//injectRightArrow($("#block-menu_block-6 .leaf a"));
					//injectRightArrow($(".slide-caption-text a"));

					function injectDownArrow(obj) {
						$(obj).append(' <i class="fa fa-angle-down injected"></i>');
					}

					injectDownArrow($(".side-menu-accordion li.expanded a.active"))

					/*====================================================================
					Injecting pdf class to Newsletters
					====================================================================*/
					//$('.page-sections a[href$=".pdf"]').addClass('pdf');
					$('.page-sections .angle-right-list a[href$=".pdf"]').append(' <img src="/modules/file/icons/application-pdf.png" alt="pdf" />');

					/*====================================================================
					Breadcrumb fixes
					====================================================================*/
					//Sections - changing the word "section" to "sections"
					$("a[href*='/section/']").each(function(idx, obj) {
						h = $(obj).attr('href');
						$(obj).attr('href', h.replace('/section/', '/sections/'));
					});

					/*====================================================================
					Home page Overlays for labels in forms
					====================================================================*/
					//Old version when form was embedded
					/*function toggleLabel() {
					var input = $(this);
					setTimeout(function() {
					var def = input.attr('title');
					if (!input.val() || (input.val() == def)) {
					input.prev('span').css('visibility', '');
					if (def) {
					var dummy = $('<label></label>').text(def).css('visibility','hidden').appendTo('body');
					input.prev('span').css('margin-left', dummy.width() + 3 + 'px');
					dummy.remove();
					}
					} else {
					input.prev('span').css('visibility', 'hidden');
					}
					}, 0);
					};

					function resetField() {
					var def = $(this).attr('title');
					if (!$(this).val() || ($(this).val() == def)) {
					$(this).val(def);
					$(this).prev('span').css('visibility', '');
					}
					};

					$(document).on('keydown', '.input-overlay input', toggleLabel);
					$(document).on('paste', '.input-overlay input', toggleLabel);

					$(document).on('focusin', '.input-overlay input', function() {
					$(this).prev('span').css('opacity', '0.4');
					});

					$(document).on('focusout', '.input-overlay input', function() {
					$(this).prev('span').css('opacity', '1');
					});

					$(function() {
					$('.input-overlay input').each(function() { toggleLabel.call(this); });
					});*/

					//New version w/ Drupal form
					function toggleLabel() {
						var input = $(this);
						setTimeout(function() {
							var def = input.attr('title');
							if (!input.val() || (input.val() == def)) {
								input.prev('label').css('visibility', '');
								if (def) {
									var dummy = $('<div></div>').text(def).css('visibility', 'hidden').appendTo('body');
									input.prev('label').css('margin-left', dummy.width() + 3 + 'px');
									dummy.remove();
								}
							} else {
								input.prev('label').css('visibility', 'hidden');
							}
						}, 0);
					};

					function resetField() {
						var def = $(this).attr('title');
						if (!$(this).val() || ($(this).val() == def)) {
							$(this).val(def);
							$(this).prev('label').css('visibility', '');
						}
					};

					//$(document).on('keydown', '.front #user-login .form-item input', toggleLabel);
					//$(document).on('paste', '.front #user-login .form-item input', toggleLabel);

					$(document).on('keydown', '.front #user-login .form-item input', function() {
						$('.front #user-login .form-item input').each(function() {
							toggleLabel.call(this);
						});
					});
					$(document).on('paste', '.front #user-login .form-item input', function() {
						$('.front #user-login .form-item input').each(function() {
							toggleLabel.call(this);
						});
					});

					//on any change
					$(document).change(function() {
						$('.front #user-login .form-item input').each(function() {
							toggleLabel.call(this);
						});
					});

					$(document).on('focusin', '.front #user-login .form-item input', function() {
						$(this).prev('label').css('opacity', '0.4');
					});

					$(document).on('focusout', '.front #user-login .form-item input', function() {
						$(this).prev('label').css('opacity', '1');
					});

					//Run the togglelabel on load
					$(function() {
						$(".front #user-login .form-item input:text:visible:first").focus();
						$('.front #user-login .form-item input').each(function() {
							toggleLabel.call(this);
						});
					});

					//Run the togglelabel on load with a delay
					setTimeout(function() {
						$('.front #user-login .form-item input').each(function() {
							toggleLabel.call(this);
						});
					}, 3000);

					/*====================================================================
					 Home Page Latest News - getting the tallest li and setting others
					 //This is also triggered on resizeInterval which is in the Dashboard code
					 ====================================================================*/
					function setHomeNews() {
						var maxHeight = -1;
						$('.front .view-latest-news-events article .data').css('height', '');
						$('.front .view-latest-news-events article .data').each(function() {
							maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
						});
						$('.front .view-latest-news-events article .data').each(function() {
							$(this).css({
								'height' : maxHeight
							});
						});
					}

					setHomeNews();

					/*====================================================================
					 Parent page - getting the tallest li and setting others
					 //This is also triggered on resizeInterval which is in the Dashboard code
					 ====================================================================*/
					function setParentNav() {

						//Used to set height
						var maxHeight = -1;
						$('.parent-page-children-list ul.menu li a').css({
							'padding-top' : '',
							'padding-bottom' : ''
						});

						$('.parent-page-children-list ul.menu li').each(function() {
							maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
						});

						$('.parent-page-children-list ul.menu li a').each(function() {
							h = $(this).height();
							pad = (maxHeight - h) / 2;
							$(this).css({
								'padding-top' : pad + 'px',
								'padding-bottom' : pad + 'px'
							});
						});

						//Used to get width and center odd number items
						if ($(".parent-page-children-list ul.menu li").length % 2 != 0) {
							lastone = $(".parent-page-children-list ul.menu li:last");
							w = $(lastone).width();
							if (w != $(lastone).parent().width()) {
								$(lastone).css('margin-left', '25%');
							} else {
								$(lastone).css('margin-left', '');
							}
						}
					}

					/*==========================================================
					 Setting height of content to match height of sidebars if they are larger
					 ==========================================================*/
					function setTheContentHeight() {
						//clear value for screen resize
						$('#content').css('min-height', '');
						//vars for left, center and right column heights
						var centerCol = $('#content-inner').height();
						var leftCol = $('#sidebar-first').height();
						var rightCol = $('#sidebar-second').height();
						//array with variables above, getting the tallest one

						//have to check to make sure the sidebars are visible before setting height
						if ($('#sidebar-first').css('display') != "none") {
							if ($('#sidebar-second').css('display') != "none") {
								var heightArray = [centerCol, leftCol, rightCol];
							} else {
								var heightArray = [centerCol, leftCol];
							}
						}

						//var heightArray = [centerCol, leftCol, rightCol];
						var biggest = Math.max.apply(null, heightArray);

						if (window.currentHeight != biggest) {
							window.timesEqual = 0;
							window.currentHeight = biggest;
						} else {
							window.timesEqual++;
						}

						//applying tallest height to center column
						$('#content').css({
							'min-height' : biggest + 'px'
						});

						//console.log("After clear -- left col: " + leftCol + " | center col: " + centerCol + " | right: " + rightCol);
						//console.log("setting the height; time: " + window.timesEqual + " height: " + biggest + "px");

						if (window.timesEqual == 6) {
							clearInterval(window.intervalID);
							//console.log("clearing the interval");
						}

					}


					window.currentHeight = 0;
					window.timesEqual = 0;
					window.intervalID = setInterval(function() {
						setTheContentHeight();
						setLitGroupNav();
					}, 500);

					/*==========================================================
					setting the height of litigation groups side nav
					==========================================================*/
					//This function is triggered by setTheContentHeight() (above)
					function setLitGroupNav() {
						//clear value for the side nav
						$('.view-litigation-groups ul.menu').css('height', '');
						//vars for left, center and right column heights
						var centerCol = $('#content-inner').height();
						var leftCol = $('#sidebar-first').height();
						var rightCol = $('#sidebar-second').height()

						//have to check to make sure the sidebars are visible before setting height
						//if the right side bar is visible, it must compare the center and the right
						if ($('#sidebar-second').css('display') != "none") {
							//sets the height based on both columns
							if (leftCol > rightCol && centerCol) {
								if (rightCol <= centerCol) {
									$('.view-litigation-groups ul.menu').css({
										'height' : centerCol + 'px'
									});
								} else {
									$('.view-litigation-groups ul.menu').css({
										'height' : rightCol + 'px'
									});
								}
							}
							//if the right side bar is not there, then set to center
						} else {
							//sets the height based on both columns
							if (leftCol > centerCol) {
								$('.view-litigation-groups ul.menu').css({
									'height' : centerCol + 'px'
								});
							}
						}
					}

					/*====================================================================
					 Footer
					 setting min-height of address to match links
					 ====================================================================*/
					function setAddressHeight() {
						$('.footer-address').css('min-height', '');
						if ($('.smart-footer').is(':visible')) {
							var myLinks = $('.smart-footer').height();
							$('.footer-address').css('min-height', myLinks + 'px');
						}
					}

					setAddressHeight();

					/*==========================================================
					 Accordions - jquery
					 ==========================================================*/
					if ($(".content-accordion").length) {
						$(".content-accordion").accordion({
							active : false,
							collapsible : true,
							//heightStyle: "content", //newer jquery
							autoHeight : false //for older jquery
						});
					}

					/*====================================================================
					 Dashboard Center column
					 Width determined by remaining space
					 Calls the vgrid function after resizing center column
					 ====================================================================*/
					function setDashContentWidth() {
						dc = $("#dashboard-content").width();
						dn = $("#dashboard-nav").width();
						da = $("#dashboard-ads").width();

						//Checking to see size of widow and modifying center column as needed
						// Mobile is set to 480 in this site
						if (dc <= 480) {
							$("#dashboard-data").width("100%");
						} else if ((dc >= 481) && (dc <= 1000)) {
							$("#dashboard-data").width( ddw = dc - dn);
						} else {
							$("#dashboard-data").width( ddw = dc - dn - da - 25);
							//vg.vgrefresh();
						}
					}

					//Runs a bunch of things when window is resized
					window.resizeInterval = null;
					$(window).on('resize', function() {
						clearTimeout(window.resizeInterval);
						//Here are all the functions it runs
						window.resizeInterval = setTimeout(function() {
							setDashContentWidth();
							setParentNav();
							hideResizeMobileMenu();
							setHomeNews();
							setTheContentHeight();
							setAddressHeight();
							slideShowResize();
						}, 300);
					});
					$(window).resize();

					/*// Cascading grid on dashboard
					 var vg = $('body.page-node-11255 #dashboard-middle-data .region-dashboard-data').vgrid({
					 easing: "easeOutQuint",
					 time: 500,
					 delay: 20,
					 fadeIn: {
					 time: 300,
					 delay: 50
					 }
					 });

					 // Cascading grid on publications
					 var vgp = $('.page-node-14922 #content-bottom .region-content-bottom').vgrid({
					 easing: "easeOutQuint",
					 time: 500,
					 delay: 20,
					 fadeIn: {
					 time: 300,
					 delay: 50
					 }
					 });

					 // Cascading grid on magazines
					 var vgm = $('#mag-main-data').vgrid({
					 easing: "easeOutQuint",
					 time: 500,
					 delay: 20,
					 fadeIn: {
					 time: 300,
					 delay: 50
					 }
					 });*/

					/*====================================================================
					 VGrid - effect similar to Pinterest grid
					 ====================================================================*/
					function vGrid(myVariable, target) {
						myVariable = $(target).vgrid({
							easing : "easeOutQuint",
							time : 500,
							delay : 20,
							fadeIn : {
								time : 300,
								delay : 50
							}
						});
					}

					setTimeout(function() {
						//dashboard
						vGrid("vgd", "body.page-node-11255 #dashboard-middle-data .region-dashboard-data");
						//Publications - public
						vGrid("vgp", ".page-node-14922 #content-bottom .region-content-bottom");
						//Magazines individual articl
						vGrid("vgm", "#mag-main-data");
						//Legal Books - public
						vGrid("vglb", ".page-node-141 #content-bottom .region-content-bottom");
					}, 1000)

					/*==========================================================
					 Dashboard List Server Subscription
					 // This shows and hides the dropdowns depending on if the checkbox for that row is checked
					 ==========================================================*/

					if ($('#list-server-subscribe').length) {
						$('#list-server-subscribe tbody tr input').each(function() {
							if (!$(this).is(':checked')) {
								$(this).parent().children().children('select').hide();
							}
						});
						$('#list-server-subscribe tbody tr input').click(function() {
							if (!$(this).is(':checked')) {
								$(this).parent().children().children('select').hide('slide', {
									direction : 'left'
								}, 1000);
							} else {
								$(this).parent().children().children('select').show('slide', {
									direction : 'left'
								}, 1000);
							}
						});
					}

					/*====================================================================
					 Fighting for Justice blog items
					 ====================================================================*/
					$('.print-button').click(function(e) {
						window.print();
						e.preventDefault();
					});

					/*====================================================================
					Sean's JS
					====================================================================*/
					// Search for Sections and Lit Groups on Dashboard
					// Click Pratice sections or Lit Groups to switch select boxes
					$('input[name=sectionorlit]').click(function() {
						if ($(this).val() == 'section') {
							$('#sections-form').show();
							$('#litgroups-form').hide();
						} else {
							$('#sections-form').hide();
							$('#litgroups-form').show();
						}
					});
					// Open page when clicking select item
					$('.autoselect').bind('change', function() {
						var url = $(this).val();
						// get selected value
						if (url) {// require a URL
							window.location = url;
							// redirect
						}
						return false;
					});
					// User registration
					// Swap Business Address and Home Address section labels when choosing preferred
					if ($('#bwm-avectra-user-registration-form').length) {
						if ($('#edit-preferred-home').is(':checked')) {
							$('#edit-business-address legend span').html('Home Address');
							$('#edit-home-address legend span').html('Business Address');
						}
					}
					$('#bwm-avectra-user-registration-form #edit-preferred-business').click(function() {
						$('#edit-business-address legend span').html('Business Address');
						$('#edit-home-address legend span').html('Home Address');
					});
					$('#bwm-avectra-user-registration-form #edit-preferred-home').click(function() {
						$('#edit-business-address legend span').html('Home Address');
						$('#edit-home-address legend span').html('Business Address');
					});
					// Show certain fields depending on what role is selected
					$('#membership-purchase #role-select').change(function() {
						$('.sections-box').show();
						$('.field-contribution').show();
						$('.field-nature').hide();
						$('.accept-text').hide();
						$('.field-bardate').hide();
						$('.field-sponsor').hide();
						$('.field-graduationdate').hide();
						if ($(this).val() == 'attorney' || $(this).val() == 'attorney_int') {
							$('.field-nature').show();
							$('.field-bardate').show();
							display_accept();
						}
						$('#membership-purchase #nature-select').change(function() {
							display_accept();
						});
						if ($(this).val() == 'paralegal') {
							$('.field-sponsor').show();
							$('.accept-text-paralegal').show();
							$('.accept-text-radio').show();
							$('.field-legal-statement').show();
						}
						if ($(this).val() == 'student') {
							$('.field-graduationdate').show();
							$('.accept-text-student').show();
							$('.accept-text-radio').show();
							$('.field-legal-statement').show();
						}
					});
					function display_accept() {
						$('.field-legal-statement').show();
						$('.accept-text').hide();
						if ($('#nature-select').val() == 'Represent plaintiff in civil cases') {
							$('.accept-text-regular').show();
							$('.accept-text-radio').show();
						}
						if ($('#nature-select').val() == 'Represent defendant in civil cases' || $('#nature-select').val() == 'Other') {
							$('.accept-text-associate').show();
							$('.accept-text-radio').show();
						}
						if ($('#nature-select').val() == 'Represent defendant in criminal cases') {
							$('.accept-text-regular').show();
							$('.accept-text-radio').show();
						}
						if ($('#nature-select').val() == 'Full-time active service of the military') {
							$('.accept-text-military').show();
							$('.accept-text-radio').show();
						}
						if ($('#nature-select').val() == 'Full-time employee of government agency') {
							$('.accept-text-government').show();
							$('.accept-text-radio').show();
						}
						if ($('#nature-select').val() == 'Full-time professor of law') {
							$('.accept-text-professor').show();
							$('.accept-text-radio').show();
						}
					}

				});
			}
		};
	}(jQuery));

var createCookie = function(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

//Add node result to your favorites
function addToFavoris(nid) {

	var my_parameters = nid;
	var res = nid.split(",");

	var nid = res[0];
	var uid = res[1];
	var deleted_url = nid + ',' + uid + ',del_from_f';

	jQuery.ajax({
		type : "POST",
		url : '/node/235099/' + my_parameters,
		complete : function(jqXHR) {
			if (jqXHR.readyState === 4) {
				jQuery("." + nid).addClass("favorite_heart_red");
				jQuery("." + nid).removeClass("favorite_heart_white");
				jQuery("." + nid).prop("href", "javascript:delFromFavoris('" + deleted_url + "')");
				jQuery("." + nid).html('<i class="fa fa-star"></i> Remove from Favorites');

			}
		}
	});
}

//Delete node result from your favorites
function delFromFavoris(nid) {

	var my_parameters = nid;
	var res = nid.split(",");
	console.log(nid);
	var nid = res[0];
	var uid = res[1];
	var deleted_url = nid + ',' + uid + ',add_to_f';

	jQuery.ajax({
		type : "POST",
		url : '/node/235099/' + my_parameters,
		complete : function(jqXHR) {
			if (jqXHR.readyState === 4) {
				jQuery("." + nid).addClass("favorite_heart_white");
				jQuery("." + nid).removeClass("favorite_heart_red");
				jQuery("." + nid).prop("href", "javascript:addToFavoris('" + deleted_url + "')");
				jQuery("." + nid).html('<i class="fa fa-star"></i> Add to Favorites');
			}
		}
	});
}

function delFromFav(nid) {

	var my_parameters = nid;
	var res = nid.split(",");

	var nid = res[0];
	var uid = res[1];
	var node_title = res[3];
	var deleted_url = nid + ',' + uid + ',add_to_f';

	jQuery.ajax({
		type : "POST",
		url : '/node/235099/' + my_parameters,
		complete : function(jqXHR) {
			if (jqXHR.readyState === 4) {

				$("#favorites_tab").load(location.href + " #favorites_tab");

				jQuery(".msg").html('<span class="msg_success">' + node_title + ' Succesfully deleted from favorites!</span>');

			}
		}
	});
}

//$("#step1Content").load();
