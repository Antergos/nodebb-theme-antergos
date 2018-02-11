		</div><!--END container -->
		<footer id="main-footer">
			<div id="footer-bottom">
				<div class="et-container clearfix">
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
					<p id="footer-info">Copyright &copy; 2018
						<a href="https://antergos.com" title="Antergos">Antergos</a> | Forum powered by
						<a href="http://www.nodebb.org" rel="nofollow">NodeBB.</a>
						<a class="etdevs-signup" href="https://falgout.us/determination.php">Sign Up</a>
					</p>
				</div>
			</div>
		</footer>
	</div> <!-- .wrap.container -->

	<div class="topic-search hidden">
		<div class="btn-group">
			<button type="button" class="btn btn-default count"></button>
			<button type="button" class="btn btn-default prev"><i class="fa fa-fw fa-angle-up"></i></button>
			<button type="button" class="btn btn-default next"><i class="fa fa-fw fa-angle-down"></i></button>
		</div>
	</div>

	<div component="toaster/tray" class="alert-window">
		<div id="reconnect-alert" class="alert alert-dismissable alert-warning clearfix hide" component="toaster/toast">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
				&times;
			</button>
			<p>[[global:reconnecting-message, {config.siteTitle}]]</p>
		</div>
	</div>

	<script defer src="{relative_path}/assets/nodebb.min.js?{config.cache-buster}"></script>

	<script defer src="{relative_path}/assets/plugins/nodebb-theme-antergos/vendor/jquery.waypoints-4.0.1.min.js"></script>
	<script defer src="{relative_path}/assets/plugins/nodebb-theme-antergos/vendor/js.cookie-1.5.1.min.js"></script>

	<!-- BEGIN scripts -->
	<script defer type="text/javascript" src="{scripts.src}"></script>
	<!-- END scripts -->

	<script>
		window.addEventListener( 'load', function() {
			require(['forum/footer']);

			<!-- IF useCustomJS -->
			{{customJS}}
			<!-- END -->
		} );
	</script>

	<div class="hide">
	<!-- IMPORT 500-embed.tpl -->
	</div>
</body>
</html>
