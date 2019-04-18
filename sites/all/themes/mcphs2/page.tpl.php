<body id="MainBody" class="IMOD1552 interior">
		<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js" type="text/javascript"></script><script src="/sites/all/themes/mcphs2/js/DefaultPageBundle.debug.js" type="text/javascript"></script><script type="text/javascript">
			//<![CDATA[
			imod.dom.AddHandler(window, 'load', function() {
				imod.Accessibility.Enable508SkipNav('#main');
			});
			imod.dom.AddHandler(window, "load", CreateFloaterDiv);

			function CreateFloaterDiv() {
				window.fd = new imod_FloaterDiv("FloaterDivTitle", "FloaterDivText", "", "true", "", "");
				fd.Width = 400;
				fd.Height = 200;
			}

			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-52261035-1']);
			_gaq.push(['_trackPageview']);
			(function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
			var htmlScraper_cid_6263;

			function GetHtmlFromUrlSuccess_cid_6263(data) {
				imod.log(data);

				if (data.Success) {
					htmlScraper_cid_6263.resultElement.parent().append(data.Data[0]);
				} else {
					htmlScraper_cid_6263.resultElement.parent().append(data.ErrorMessage);
				}

				imod.Events.publish('/html_text/loaded');
			}

			function GetHtmlFromUrl_cid_6263(controlId, urlToScrape, startToken, endToken, urlToScriptFile, cacheDuration, resultElement) {
				htmlScraper_cid_6263 = new imod.HtmlScraper('/apiservices/HtmlScraper/HtmlScraperService.asmx/GetHtmlFromUrl', controlId, urlToScrape, startToken, endToken, urlToScriptFile, cacheDuration, resultElement, GetHtmlFromUrlSuccess_cid_6263);
				htmlScraper_cid_6263.getHtmlFromUrl();
			}

			//]]>
		</script><script src="/sites/all/themes/mcphs2/js/main.js" type="text/javascript"></script><script src="/sites/all/themes/mcphs2/js/imods.custom.js" type="text/javascript"></script><script src="/sites/all/themes/mcphs2/js/imod_FloaterDiv.js" type="text/javascript"></script><script src="/sites/all/themes/mcphs2/js/enc-18167.js?jsversion=60.1.0.11042" type="text/javascript"></script><script src="/sites/all/themes/mcphs2/js/calendarcontrol.js" type="text/javascript"></script><!-- SiteBuilder // --><!-- NavMaster // --><a name="pagetop" aria-hidden="true"> <span class="sr-only">Page Top</span> </a>
		<div id="outer-wrap">

			<div id="inner-wrap">

				<!-- UTILITY BAR -->
				<div class="utilityBar hidden-xs">
					<div class="container">
						<div class="row">
							<div class="utilInner col-md-12">

								<nav id="ContentMemberTools18" class="imodSiteMap memberTools hidden-sm hidden-xs" aria-label="Alumni Tools" role="navigation"><ul><li class="Login ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=3&amp;cid=40&amp;returnUrl=https%3a%2f%2fwww.alumni.mcphs.edu%2fs%2f1022%2f18%2finterior.aspx%3fsid%3d1022%26gid%3d1%26pgid%3d1552">Login</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=8&amp;cid=46">Alumni Registration</a>
										</li>
										<li class=" ">
											<a target="_blank" href="https://www.mcphs.edu/en/academics/academic-support-and-resources/registrar">Transcripts</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=59&amp;cid=211">Help</a>
										</li>
										<li class="siteSearchToggle hidden-xs hidden-sm ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2322"><i class="fas fa-search fa-fw"></i> <i class="fas fa-times fa-fw"></i><span class="sr-only">Site Search</span></a>
										</li>
									</ul></nav><div class="searchWrap" aria-hidden="true">
									<div id="ContentSearch" class="search">
										<label for="cid_6363_tbSearch" id="cid_6363_litSearch">Search Content: </label>
										<input name="cid_6363$tbSearch" type="text" size="10" id="cid_6363_tbSearch"><span class="SearchModuleSpacer">&nbsp;</span>
										<img src="/sites/all/themes/mcphs2/img/199e1ae1-a246-483f-9b50-13abbe5088ee.png" id="cid_6363_imgbtnSearch" border="0" style="cursor:pointer;display:;" align="absbottom" onclick="return cid_6363_hbtnSearch_Click();" alt="Submit search"></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- HEADER -->
				<header class="structHead" role="banner" id="top"><div class="container">
						<div class="row">
							<div id="ContentLogo" class="col-xs-12 col-sm-8 col-md-5 col-lg-5 headLogo">

								<div id="scraperResultDiv_cid_6263" style="display: none;"></div>

								<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1"><img alt="MCPHS Logo" src="/sites/all/themes/mcphs2/img/logo.png"><span class="logoTxt">Alumni &amp; Friends</span></a>
							</div>
							<!-- Desktop Navigation Bar -->
							<div class="desktopNav col-md-7 col-lg-7 hidden-sm hidden-xs">

								<nav id="ContentTopNav18" class="desktopNavInner imodSiteMap" aria-label="Main" role="navigation"><ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2292">Participate</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1545">Events</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1878">Alumni</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1547">News</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="?sid=1022&amp;gid=1&amp;pgid=2016">Career Services</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1988">Services</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1986">Networking</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2013">Job Search Tools</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2002">Job Opportunities</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1974">Upcoming Events</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1975">Instructional Video Archive</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1976">Alumni Career Spotlights</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1987">Mid-life and Beyond</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1551">Continuing Education</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1583">Live CE Activities</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1584">Online CE Activities</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1585">About Continuing Education</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1586">CE Credit Process</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1587">News &amp; Resources</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1590">FAQ</a>
												</li>
												<li class=" ">
													<a href="http://alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=1263&amp;cid=2803">Join Our Notification List</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1554">Contact</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1626">About</a>
												</li>
											</ul></li>
										<li class="desktopHide selected">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1552">SUPPORT MCPHS STUDENTS</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/giving/17/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2137">Give Now</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1598">Campaigns</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1606">Scholarships</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1609">Donor Recognition</a>
												</li>
												<li class=" ">
													<a href="http://legacygiving.mcphs.edu/">Legacy Giving</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1615">Types of Gifts</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2156">Giving FAQ</a>
												</li>
											</ul></li>
									</ul></nav></div>
							<div class="menuToggleBtnWrap col-xs-6 col-sm-4 visible-xs visible-sm">
								<div role="navigation" aria-label="Mobile Main Menu">
									<button id="menuToggle" href="#off-canvas" data-offcanvas-trigger="off-canvas" aria-label="Open Mobile Navigation" class="">
										<span class="menuTitle visible-xs-inline-block">Menu</span>
										<i class="fas fa-bars icon-close"></i>
									</button>
								</div>
							</div>
							<div class="giveBtnWrap">
								<div class="container">
									<div class="row">
										<div id="ContentGiveBtn">
											<a class="giveBtn" href="https://www.alumni.mcphs.edu/s/1022/18/home.aspx?sid=1022&amp;gid=1&amp;pgid=1552"><img alt="cardinal icon" class="icon" src="/sites/all/themes/mcphs2/img/cardinal_white.png"><span class="hidden-xs">Give
												<br>
												Now</span><span class="visible-xs">Give</span></a>
										</div>
									</div>
								</div>

							</div>

						</div>
					</div>
				</header><!-- MAIN CONTENT AREA --><main role="main" id="main" class="structBody"><!-- OPTIONAL Hero Banner Img --><div class="heroWrap">
						<div id="ContentMiddleLayoutHero" class="ftImg"></div>
					</div>

					<div class="container">

						<div class="row">
							<nav id="ContentBreadCrumbs18" class="hidden-xs col-xs-12 breadCrumbs imodSiteMap" aria-label="Site Breadcrumbs"><ul><li>
										<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1">Home</a>
									</li>
									<li>
										<a class="selected" href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1552">SUPPORT MCPHS STUDENTS</a>
									</li>
								</ul></nav></div>

						<!-- Two Col Interior Verison -->
						<div class="row">
							<section class="mainCol col-sm-12 col-sm-push-0 col-md-9 col-md-push-3" id="mainWrap"><?php require(DRUPAL_ROOT."/sites/all/themes/pgcalc_master/page.content.tpl.php"); ?></section><!-- LEFT COLUMN --><div class="structLeft col-sm-12 col-sm-pull-0 col-md-3 col-md-pull-9"><?php print render($page['menu']); ?></div>
						</div>

					</div>
				</main><!-- FOOTER --><footer role="contentinfo"><div class="container">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-3 ftMain">
								<div id="ContentFooter"><img class="footerLogo" alt="MCPHS Footer Logo" src="/sites/all/themes/mcphs2/img/footer-logo.png"><div class="socialWrap">
										<ul class="socialBar"><li>
												<a target="_blank" href="https://www.facebook.com/MCPHSAlumni">
												<div role="link" class="fab fa-facebook">
													&nbsp;
												</div> <span class="sr-only">Facebook</span></a>
											</li>
											<li>
												<a target="_blank" href="https://twitter.com/mcphsalumni">
												<div role="link" class="fab fa-twitter">
													&nbsp;
												</div> <span class="sr-only">Twitter</span></a>
											</li>
											<li>
												<a target="_blank" href="http://www.youtube.com/user/MCPHStv">
												<div role="link" class="fab fa-youtube">
													&nbsp;
												</div> <span class="sr-only">YouTube</span></a>
											</li>
											<li>
												<a target="_blank" href="https://instagram.com/mcphs_alumni">
												<div role="link" class="fab fa-instagram">
													&nbsp;
												</div> <span class="sr-only">Instagram</span></a>
											</li>
											<li>
												<a target="_blank" href="http://www.flickr.com/photos/mcphs/sets/">
												<div role="link" class="fab fa-flickr">
													&nbsp;
												</div> <span class="sr-only">Flickr</span></a>
											</li>
											<li>
												<a target="_blank" href="http://www.linkedin.com/groups?home=&amp;gid=4589808&amp;trk=anet_ug_hm">
												<div role="link" class="fab fa-linkedin">
													&nbsp;
												</div> <span class="sr-only">LinkedIn</span></a>
											</li>
										</ul></div>
									<div class="address">
										<strong>Address:</strong>
										<address>
											179 Longwood Avenue
											<br>
											Boston, MA 02115
										</address>
									</div>

								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-9">
								<div class="row">
									<div class="col-xs-12 col-sm-4 ftContact">
										<div id="ContentFooterContact">
											<h2>Contact</h2>
											<p>
												<strong>Alumni:</strong>
												<br><a href="mailto:alumni@mcphs.edu">alumni@mcphs.edu</a>
											</p>
											<p>
												<strong>Development:</strong>
												<br><a href="mailto:development@mcphs.edu">development@mcphs.edu</a>
											</p>
											<p>
												<strong>Continuing Education:</strong>
												<br><a href="mailto:continuing.education@mcphs.edu">continuing.education@mcphs.edu</a>
											</p>
										</div>
									</div>
									<div class="col-xs-12 col-sm-8 ftLinks">
										<div id="ContentFooterLinksHdr">
											<h2>Quick Links</h2>
										</div>
										<div id="ContentFooterLinks18" class="footerLinks imodSiteMap">
											<ul class="split-list"><li class=" ">
													<a target="_blank" href="https://www.mcphs.edu/privacy-policy">Privacy Policy</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/indexSocial.aspx?sid=1022&amp;gid=1&amp;pgid=1658&amp;cid=3635">Update Your Information</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/indexSocial.aspx?sid=1022&amp;gid=1&amp;pgid=1845">Alumni Benefits and Services</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=2016">Career Services</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=6&amp;cid=41#/Search/Simple">Alumni Directory</a>
												</li>
												<li class=" ">
													<a href="?sid=1022&amp;gid=1&amp;pgid=1655">Share Your News</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=1551">Continuing Education</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/giving/17/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2137">Make a Gift</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=1545">Events</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/indexSocial.aspx?sid=1022&amp;gid=1&amp;pgid=1547">News</a>
												</li>
											</ul></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer><!-- Navigation drawer --><div class="js-offcanvas" id="off-canvas" role="complementary" aria-label="Mobile Site Menu">
					<div class="c-offcanvas__inner l-wrapper l-wrapper--sm">
						<div class="menuTitleBar">
							<h2><span class="sr-only">Mobile </span>Menu</h2>
							<button class="js-offcanvas-close" data-button-options='{"modifiers":"blue,hard,close-right"}' tabindex="0">
								<i class="fas fa-times"></i>
								<span class="sr-only">Close Menu</span>
							</button>
						</div>
						<div class="mobileSearchWrap">
							<div id="ContentMobileSearch" class="hidden-md hidden-lg mobileSearch">
								<label for="cid_6301_tbSearch" id="cid_6301_litSearch">Search Content: </label>
								<input name="cid_6301$tbSearch" type="text" size="10" id="cid_6301_tbSearch"><span class="SearchModuleSpacer">&nbsp;</span>
								<img src="/s/1022/Resources/SearchButtons/a2eae3be-756a-45f2-acdb-c7213981245e.png" id="cid_6301_imgbtnSearch" border="0" style="cursor:pointer;display:;" align="absbottom" onclick="return cid_6301_hbtnSearch_Click();" alt="site search"></div>
						</div>
						<nav id="ContentMobNav18" class="mainNav hidden-md hidden-lg" aria-label="Mobile Site Navigation"><ul><li class=" ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2292">Participate</a>
									<ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1545">Events</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1878">Alumni</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/indexSocial.aspx?sid=1022&amp;gid=1&amp;pgid=1658&amp;cid=3635">Update Your Info</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1843">Get Involved</a>
													<ul><li class=" ">
															<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2315">Calling All Cardinals</a>
														</li>
														<li class=" ">
															<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1894">Support an MCPHS Student</a>
														</li>
														<li class=" ">
															<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1859">Connect With Us </a>
														</li>
													</ul></li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1845">Alumni Benefits and Services </a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1547">News</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1581">Publications</a>
													<ul><li class=" ">
															<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1582">The Bulletin</a>
														</li>
														<li class=" ">
															<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1737">MCPHS Donor Reports</a>
														</li>
													</ul></li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1655">Share Your News</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1794">Farewell</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2135">Faculty Stories</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2293">Newsroom</a>
												</li>
											</ul></li>
									</ul></li>
								<li class=" ">
									<a href="?sid=1022&amp;gid=1&amp;pgid=2016">Career Services</a>
									<ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1988">Services</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1986">Networking</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2013">Job Search Tools</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2002">Job Opportunities</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1974">Upcoming Events</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1975">Instructional Video Archive</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1976">Alumni Career Spotlights</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1987">Mid-life and Beyond</a>
										</li>
									</ul></li>
								<li class=" ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1551">Continuing Education</a>
									<ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1583">Live CE Activities</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1584">Online CE Activities</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1585">About Continuing Education</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1586">CE Credit Process</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1587">News &amp; Resources</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1590">FAQ</a>
										</li>
										<li class=" ">
											<a href="http://alumni.mcphs.edu/s/1022/index.aspx?sid=1022&amp;gid=1&amp;pgid=1263&amp;cid=2803">Join Our Notification List</a>
										</li>
									</ul></li>
								<li class=" ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1554">Contact</a>
									<ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1626">About</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1553">Vision &amp; Mission</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1556">University Leadership</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1557">Visiting MCPHS University</a>
												</li>
												<li class="footerOnly ">
													<a href="https://www.mcphs.edu/privacy-policy">Privacy Policy</a>
												</li>
											</ul></li>
									</ul></li>
								<li class="desktopHide selected">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1552">SUPPORT MCPHS STUDENTS</a>
									<ul><li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/giving/17/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2137">Give Now</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1598">Campaigns</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1594">Annual Giving</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1599">Phone-a-thon</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1601">Parents Campaign</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1600">Laying the Foundation: Engrave Your Brick</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1606">Scholarships</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1848">Why Support Scholarships?</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1846">Scholarship FAQ</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1607">Endowed Scholarships</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1608">Restricted Scholarships</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1900">MCPHS Scholarship Golf Tournament</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1609">Donor Recognition</a>
											<ul><li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1610">Annual Giving Societies</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1612">Constant Cardinals</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1628">Lifetime Benefactors</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1629">Pillar Society</a>
												</li>
												<li class=" ">
													<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1613">Scholar Supporters</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="http://legacygiving.mcphs.edu/">Legacy Giving</a>
										</li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=1615">Types of Gifts</a>
											<ul><li class=" ">
													<a href="http://www.matchinggift.com/mcphs/">Corporate Matching Gift</a>
												</li>
											</ul></li>
										<li class=" ">
											<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2156">Giving FAQ</a>
										</li>
									</ul></li>
							</ul></nav><nav id="ContentMobileUtils18" aria-label="Mobile Site Tools" class="mobileUtils"><ul><li class="Login ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=3&amp;cid=40&amp;returnUrl=https%3a%2f%2fwww.alumni.mcphs.edu%2fs%2f1022%2f18%2finterior.aspx%3fsid%3d1022%26gid%3d1%26pgid%3d1552">Login</a>
								</li>
								<li class=" ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=8&amp;cid=46">Alumni Registration</a>
								</li>
								<li class=" ">
									<a target="_blank" href="https://www.mcphs.edu/en/academics/academic-support-and-resources/registrar">Transcripts</a>
								</li>
								<li class=" ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=59&amp;cid=211">Help</a>
								</li>
								<li class="siteSearchToggle hidden-xs hidden-sm ">
									<a href="https://www.alumni.mcphs.edu/s/1022/18/interior.aspx?sid=1022&amp;gid=1&amp;pgid=2322"><i class="fas fa-search fa-fw"></i> <i class="fas fa-times fa-fw"></i><span class="sr-only">Site Search</span></a>
								</li>
							</ul></nav></div>
				</div>

				<div class="toplink visible-xs-block">
					<a href="#pagetop" role="button"><i class="fas fa-angle-double-up"></i> Back to Top <i class="fas fa-angle-double-up"></i></a>
				</div>

			</div>
		</div>

		<script type="text/javascript">
			//<![CDATA[

			if (window.CmsMenuBar) {
				CmsMenuBar.LogoutUrl = 'https://securelb.imodules.com/?sid=1022&gid=1&pgid=61&logout=1';
			}
			if (window.CmsMenuBar) {
				CmsMenuBar.AuthenticationTicket = '';
			}
			if (window.CmsMenuBar) {
				CmsMenuBar.SiteId = '1022';
			}
			if (window.CmsMenuBar) {
				CmsMenuBar.GroupId = '1';
			}

			if ( typeof IModController != 'undefined' && typeof IModController.init == 'function') {
				IModController.init(1022, 1, 'MCPHS Alumni Community', '1', 0, false, false);
				IModController.siteLoginUrl = 'https://securelb.imodules.com';
			}

			jQuery(document).ready(function() {
				imod.HelpProvider.init({
					"HelpIconUrl" : "\/images\/icons\/v2\/context_help.gif",
					"HelpItems" : []
				}, {
					helpIconUrl : '/images/icons/v2/context_help.gif'
				});
			});

			jQuery(document).ready(function() {
				imod.SessionData.Data = {
					"SessionId" : "eb4aab75-5261-4eb2-b631-86243d6f8024",
					"SiteViewMode" : 1
				};
			});

			imod.Security.LogoutUrl = 'https://securelb.imodules.com/?sid=1022&gid=1&pgid=61&logout=1';
			imod.Security.AuthenticationTicket = '';
			imod.Security.SiteId = '1022';
			imod.Security.GroupId = '1';
			imod.Browser.IsSmartPhone = false;
			imod.Browser.IsTablet = false;
			imod.Browser.PlatformName = "Windows NT";
			imod.Browser.BrowserName = "Chrome";
			imod.Browser.BrowserVersion = "Unknown";
			imod.Browser.IsMobile = "False";
			imod.Security.IsImodEmployee = false;
			imod.Security.LoginSessionMonitorEnabled = false;
			imod.Security.LoginDomain = "https://securelb.imodules.com";

			imod$('cid_6363_tbSearch').onkeypress = SearchKeyCheck6363;
			function SearchKeyCheck6363(e) {
				if (window.event != null) {
					e = window.event;
				}
				if (e.keyCode == 13) {
					cid_6363_hbtnSearch_Click();
					return false;
				}
			}

			function cid_6363_hbtnSearch_Click() {
				var SearchParam = document.getElementById('cid_6363_tbSearch');
				if (SearchParam.value.length > 0) {
					window.location = "https://www.alumni.mcphs.edu?sid=1022&gid=1&page_id=1552&pgid=253&cid=645&ecid=6363&search=" + escape(SearchParam.value);
				} else {
					SearchParam.style['background'] = 'red';
				}
				return false;
			}
			imod$('cid_6301_tbSearch').onkeypress = SearchKeyCheck6301;
			function SearchKeyCheck6301(e) {
				if (window.event != null) {
					e = window.event;
				}
				if (e.keyCode == 13) {
					cid_6301_hbtnSearch_Click();
					return false;
				}
			}

			function cid_6301_hbtnSearch_Click() {
				var SearchParam = document.getElementById('cid_6301_tbSearch');
				if (SearchParam.value.length > 0) {
					window.location = "https://www.alumni.mcphs.edu?sid=1022&gid=1&page_id=1552&pgid=253&cid=645&ecid=6301&search=" + escape(SearchParam.value);
				} else {
					SearchParam.style['background'] = 'red';
				}
				return false;
			}


			jQuery(document).ready(function() {

				// set hero image bkgd
				if (jQuery('html').hasClass('loggedin')) {
					// do nothing when logged in
				} else {
					var heroSrc = jQuery("#ContentMiddleLayoutHero").find('img').attr('src');
					console.log('img src=' + heroSrc);
					jQuery("#ContentMiddleLayoutHero").find('img').addClass('invisible');
					jQuery("#ContentMiddleLayoutHero").css('background-image', 'url(' + heroSrc + ')');
				}

			});
			Sys.Application.add_init(function() {
				$create(Telerik.Web.UI.RadToolTip, {
					"_cssClass" : "",
					"_manualCloseButtonText" : "Close",
					"clientStateFieldID" : "HELPPROVIDER_RadToolTip_ClientState",
					"formID" : "MainForm",
					"hideEvent" : 4,
					"position" : 13,
					"relativeTo" : 1,
					"showEvent" : 16,
					"skin" : "Default",
					"width" : "350px"
				}, null, null, $get("HELPPROVIDER_RadToolTip"));
			});
			//]]>
		</script><!-- Unminified and externally loading scripts - custom script files must have .custom in file name --></body>