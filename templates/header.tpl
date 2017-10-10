<!DOCTYPE html>
<html lang="{function.localeToHTML, defaultLang}" <!-- IF languageDirection -->data-dir="{languageDirection}" style="direction: {languageDirection};" <!-- ENDIF languageDirection -->>
<head>
	<title>{browserTitle}</title>
	<!-- BEGIN metaTags -->
	{function.buildMetaTag}
	<!-- END metaTags -->
	<link rel="stylesheet" type="text/css" href="{relative_path}/assets/stylesheet.css?{config.cache-buster}" />
	<!-- BEGIN linkTags -->
	{function.buildLinkTag}
	<!-- END linkTags -->

	<script>
		var RELATIVE_PATH = "{config.relative_path}";
		var config = JSON.parse('{{configJSON}}');
		var app = {
			template: "{template.name}",
			user: JSON.parse('{{userJSON}}')
		};
	</script>
	<script src="{relative_path}/assets/nodebb.min.js?{config.cache-buster}"></script>

	<!-- BEGIN scripts -->
	<script type="text/javascript" src="{scripts.src}"></script>
	<!-- END scripts -->

	<script src="{relative_path}/assets/plugins/nodebb-theme-antergos/vendor/jquery.waypoints-4.0.1.min.js"></script>
	<script src="{relative_path}/assets/plugins/nodebb-theme-antergos/vendor/js.cookie-1.5.1.min.js"></script>


	<link rel="stylesheet" id="et-gf-raleway-css" href="https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,600,500,700,800,900&amp;subset=latin" type="text/css" media="all">
	<link rel="stylesheet" id="et-gf-lato-css" href="https://fonts.googleapis.com/css?family=Open+Sans:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic&amp;subset=latin" type="text/css" media="all">

	<link rel="stylesheet" id="divi-style-css" href="{relative_path}/assets/plugins/nodebb-theme-antergos/vendor/style.css" type="text/css" media="all">

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
			padding-left: 35px;
			padding-right: 43px
		}

		#top-menu li.current-menu-ancestor > a, #top-menu li.current-menu-item > a, .bottom-nav li.current-menu-item > a {
			color: #2EA3F2;
		}

		h1, h2, h3, h4, h5, h6 {
			font-family: 'Raleway', Helvetica, Arial, Lucida, sans-serif !important;
		}

		body, input, textarea, select {
			font-family: 'Open Sans', Helvetica, Arial, Lucida, sans-serif !important;
		}
	</style>

	<!-- IF useCustomJS -->
	{{customJS}}
	<!-- ENDIF useCustomJS -->
	<!-- IF useCustomCSS -->
	<style type="text/css">{{customCSS}}</style>
	<!-- ENDIF useCustomCSS -->

</head>

<body class="{bodyClass}">
<input id="isLoggedIn" type="hidden" template-variable="loggedIn" value="{loggedIn}"/>
<input id="currentTpl" type="hidden" template-variable="currentTpl" value="{app.template}"/>


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
							<a href="//www.facebook.com/antergos" class="icon">
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
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1343">
						<a href="//antergos.com">Main</a></li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1344">
						<a href="//antergos.com/wiki">Wiki</a>
					</li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1345">
						<a href="//build.antergos.com">Packages</a></li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1346">
						<a href="//github.com/antergos">Bugs</a></li>
					<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1346">
						<a href="http://status.antergos.com">Status</a></li>
				</ul>
			</div>
			<!-- #et-secondary-menu -->

		</div>
		<!-- .container -->
	</div>
	<!-- this detects when the masthead should fix -->
	<div id="header-menu-detector"></div>

	<div class="navbar navbar-inverse navbar-fixed-top header" role="navigation" id="header-menu" component="navbar">
		<div class="container">
			<!-- IMPORT partials/menu.tpl -->
		</div>
		<div class="loading-bar"></div>
	</div>
	<div class="container" id="content" component="content">
	<!-- IMPORT partials/noscript/warning.tpl -->
