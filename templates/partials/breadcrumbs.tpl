<script src="/plugins/nodebb-theme-antergos/vendor/jquery.waypoints.min.js"></script>
<ol class="breadcrumb<!-- IF displayGlobalAlert --> globalAlertFlag<!-- ENDIF displayGlobalAlert -->">
	<!-- BEGIN breadcrumbs -->
	<li itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb" title="{breadcrumbs.text}" <!-- IF @last -->class="active"<!-- ELSE -->class="bcrumb"<!-- ENDIF @last -->>
		<!-- IF !@last --><a href="{breadcrumbs.url}" itemprop="url"><!-- ENDIF !@last -->
			<span itemprop="title">
				{breadcrumbs.text}
				<!-- IF @last -->
				<!-- IF !feeds:disableRSS -->
				<!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}"><i class="fa fa-rss-square"></i></a><!-- ENDIF rssFeedUrl --><!-- ENDIF !feeds:disableRSS -->
				<!-- ENDIF @last -->
			</span>
		<!-- IF !@last --></a><!-- ENDIF !@last -->
	</li>
	<!-- END breadcrumbs -->
</ol>
<!-- IF displayGlobalAlert -->
<input type="hidden" id="globalAlertSubject" value="{globalAlertSubject}" />
<input type="hidden" id="globalAlertMsg" value="{globalAlertMsg}" />
<!-- ENDIF displayGlobalAlert -->