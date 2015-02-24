<!DOCTYPE html>
<html>
<head>
	<title>{browserTitle}</title>
	<!-- BEGIN metaTags -->
	{function.buildMetaTag}
	<!-- END metaTags -->
	<link rel="stylesheet" type="text/css" href="{relative_path}/stylesheet.css?{css-buster}"/>
	<!-- BEGIN linkTags -->
	<link
	<!-- IF linkTags.link --> link="{linkTags.link}"<!-- ENDIF linkTags.link --><!-- IF linkTags.rel --> rel="{linkTags.rel}"<!-- ENDIF linkTags.rel --><!-- IF linkTags.type --> type="{linkTags.type}"<!-- ENDIF linkTags.type --><!-- IF linkTags.href --> href="{linkTags.href}"<!-- ENDIF linkTags.href --> />
	<!-- END linkTags -->

	<!--[if lt IE 9]>
	<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
	<script>__lt_ie_9__ = 1;</script>
	<![endif]-->

	<script>
		var RELATIVE_PATH = "{relative_path}";
		var config = JSON.parse('{configJSON}');
		var app = {};
		app.user = JSON.parse('{userJSON}');
	</script>
	<script src="{relative_path}/nodebb.min.js?{script-buster}"></script>
	<script>
		require.config({
			baseUrl: "{relative_path}/src/modules",
			waitSeconds: 3,
			urlArgs: "{cache-buster}",
			paths: {
				'forum': '../forum',
				'vendor': '../../vendor'
			}
		});
	</script>
	<script src="/plugins/nodebb-theme-antergos/vendor/jquery.waypoints.min.js"></script>
	<script type="text/javascript">
		var checkWidget = true;
		var secLastHeight;
		function doWaypoints() {
			function checkWidgetHeight() {
				secLastHeight = $('.panel:nth-last-child(2)').height();
				checkWidget = false;
			}
			$('[widget-area=sidebar]').waypoint({
				handler: function(direction) {
					if (direction === "down") {
						$('#header-menu').addClass('ant-fixed-header');
						$('#top-header').removeClass('ant-fixed-header');
					} else {
						$('#header-menu').removeClass('ant-fixed-header');
						$('#top-header').addClass('ant-fixed-header');
					}
				}
			});
			$('.panel:nth-last-child(2)').waypoint({
				handler: function(direction) {
					if (direction === "down") {
						console.log('waypoint fired down - 2last');
						$('.panel:nth-last-child(2)').addClass('fixed');
					} else {
						console.log('waypoint fired up - 2last');
						$('.panel:nth-last-child(2)').removeClass('fixed');
					}
				},
				offset: 80
			});

			$('.panel:nth-last-child(1)').waypoint({
				handler: function(direction) {
					if (direction === "down") {
						console.log('waypoint fired down - last');
						$('.panel:nth-last-child(1)').addClass('fixed');
					} else {
						console.log('waypoint fired up - last');
						$('.panel:nth-last-child(1)').removeClass('fixed');
					}
				},
				offset: function() {
					if (checkWidget === true) checkWidgetHeight();
					console.log('2lastHeight is ' + secLastHeight);
					return secLastHeight + 80;
				}
			});
		}
		$(window).load(function() {
			doWaypoints();
		});
		$(window).on('action:ajaxify.end', function (ev, data) {
			doWaypoints();
		});


	</script>


	<link rel="stylesheet" id="et-gf-raleway-css"
	      href="http://fonts.googleapis.com/css?family=Raleway:400,100,200,300,600,500,700,800,900&amp;subset=latin"
	      type="text/css" media="all">
	<link rel="stylesheet" id="et-gf-lato-css"
	      href="http://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic&amp;subset=latin"
	      type="text/css" media="all">

	<link rel="stylesheet" id="divi-style-css"
	      href="/plugins/nodebb-theme-antergos/vendor/style.css" type="text/css" media="all">

	<style>
		a {
			color: #2EA3F2;
		}

		body {
			color: #666666;
		}

		#et_search_icon:hover, .mobile_menu_bar:before, .footer-widget h4, .et-social-icon a:hover, .comment-reply-link, .form-submit input, .et_pb_sum, .et_pb_pricing li a, .et_pb_pricing_table_button, .et_overlay:before, .entry-summary p.price ins, .woocommerce div.product span.price, .woocommerce-page div.product span.price, .woocommerce #content div.product span.price, .woocommerce-page #content div.product span.price, .woocommerce div.product p.price, .woocommerce-page div.product p.price, .woocommerce #content div.product p.price, .woocommerce-page #content div.product p.price, .et_pb_member_social_links a:hover {
			color: #2EA3F2 !important;
		}

		.woocommerce .star-rating span:before, .woocommerce-page .star-rating span:before, .et_pb_widget li a:hover, .et_pb_bg_layout_light .et_pb_promo_button, .et_pb_bg_layout_light .et_pb_more_button, .et_pb_filterable_portfolio .et_pb_portfolio_filters li a.active, .et_pb_filterable_portfolio .et_pb_portofolio_pagination ul li a.active, .et_pb_gallery .et_pb_gallery_pagination ul li a.active, .wp-pagenavi span.current, .wp-pagenavi a:hover, .et_pb_contact_submit, .et_pb_bg_layout_light .et_pb_newsletter_button, .nav-single a, .posted_in a {
			color: #2EA3F2 !important;
		}

		.et-search-form, .nav li ul, .et_mobile_menu, .footer-widget li:before, .et_pb_pricing li:before, blockquote {
			border-color: #2EA3F2;
		}

		#main-footer {
			background-color: #222222;
		}

		#top-menu a {
			color: #666666;
		}

		#top-header .et-container {
			padding-top: 10px;
		}

		.et-container {
			margin: 0 auto;
			position: relative;
			padding-left: 28px;
			padding-right: 39px
		}

		#top-menu li.current-menu-ancestor > a, #top-menu li.current-menu-item > a, .bottom-nav li.current-menu-item > a {
			color: #2EA3F2;
		}

		h1, h2, h3, h4, h5, h6 {
			font-family: 'Raleway', Helvetica, Arial, Lucida, sans-serif !important;
		}

		body, input, textarea, select {
			font-family: 'Lato', Helvetica, Arial, Lucida, sans-serif !important;
		}
	</style>
	<!-- IF useCustomJS -->
	{customJS}
	<!-- ENDIF useCustomJS -->
	<!-- IF useCustomCSS -->
	<style type="text/css">{customCSS}</style>
	<!-- ENDIF useCustomCSS -->

</head>

<body>
<input id="isLoggedIn" type="hidden" template-variable="loggedIn" value="{loggedIn}"/>

<div id="wrap" class="container">
	<div id="top-header" class="et_nav_text_color_dark ant-fixed-header">
		<div class="et-container container clearfix">


			<div id="et-info">

				<a href="mailto:info@antergos.com"><span id="et-info-email">info@antergos.com</span></a>

				<ul class="et-social-icons">

					<li class="et-social-icon et-social-facebook">
						<a href="//www.facebook.com/pages/Antergos/649575488393114" class="icon">
							<span>Facebook</span>
						</a>
					</li>
					<li class="et-social-icon et-social-twitter">
						<a href="//www.twitter.com/antergos" class="icon">
							<span>Twitter</span>
						</a>
					</li>
					<li class="et-social-icon et-social-google-plus">
						<a href="//plus.google.com/communities/116626481503903480477" class="icon">
							<span>Google</span>
						</a>
					</li>
					<li class="et-social-icon et-social-rss">
						<a href="/recent.rss" class="icon">
							<span>RSS</span>
						</a>
					</li>

				</ul>
			</div>
			<!-- #et-info -->


			<div id="et-secondary-menu">
				<div class="et_duplicate_social_icons">
					<ul class="et-social-icons">

						<li class="et-social-icon et-social-facebook">
							<a href="//www.facebook.com/pages/Antergos/649575488393114" class="icon">
								<span>Facebook</span>
							</a>
						</li>
						<li class="et-social-icon et-social-twitter">
							<a href="//www.twitter.com/antergos" class="icon">
								<span>Twitter</span>
							</a>
						</li>
						<li class="et-social-icon et-social-google-plus">
							<a href="//plus.google.com/communities/116626481503903480477" class="icon">
								<span>Google</span>
							</a>
						</li>
						<li class="et-social-icon et-social-rss">
							<a href="/recent.rss" class="icon">
								<span>RSS</span>
							</a>
						</li>

					</ul>
				</div>
				<ul id="et-secondary-nav" class="menu">
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1343"><a
							href="//antergos.com">Main</a></li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1344">
						<a href="//antergos.com/wiki">Wiki</a>
					</li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1345"><a
							href="//build.antergos.com">Packages</a></li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1346"><a
							href="//github.com/antergos">Bugs</a></li>
				</ul>
			</div>
			<!-- #et-secondary-menu -->

		</div>
		<!-- .container -->
	</div>
	<!-- this detects when the masthead should fix -->
	<div id="header-menu-detector"></div>

	<!-- Here's their old navbar -->
	<!--
<div class="navbar navbar-default navbar-fixed-top header" role="navigation" id="header-menu">
	-->
	<!-- Here's Po's new navbar styling -->
	<div class="navbar navbar-inverse navbar-fixed-top header" role="navigation" id="header-menu">
		<div class="container">
			<!-- IMPORT partials/menu.tpl -->
		</div>
		<div class="loading-bar"></div>
	</div>
	<div class="container" id="content">
		<!-- IMPORT partials/noscript/warning.tpl -->
