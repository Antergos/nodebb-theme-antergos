<input type="hidden" template-variable="category_id" value="{cid}"/>
<input type="hidden" template-variable="category_name" value="{name}"/>
<input type="hidden" template-variable="category_slug" value="{slug}"/>
<input type="hidden" template-variable="topic_count" value="{topic_count}"/>
<input type="hidden" template-variable="currentPage" value="{currentPage}"/>
<input type="hidden" template-variable="pageCount" value="{pageCount}"/>
<script src="/plugins/nodebb-theme-antergos/vendor/slick.js"></script>
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.3.15/slick.css"/>
<div class="category-page" style="position:absolute;left:-9999px;"></div>


<div class="category row">
	<div class="col-md-9" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">

		<!-- IMPORT partials/breadcrumbs.tpl -->
		<div class="row">
			<div class="et_pb_column et_pb_column_4_4">
				<div class="et_pb_text et_pb_bg_layout_light et_pb_text_align_left">

					<h2 class="category-group">{name}</h2>

				</div>
				<!-- .et_pb_text -->
				<hr class="et_pb_space et_pb_divider" style="border-color: #dddddd;">
			</div>
		</div>
		<div class="subcategories row">
			<!-- BEGIN children -->
			<!-- IMPORT partials/category_child.tpl -->
			<!-- END children -->
		</div>

		<div class="header category-tools clearfix">
			<!-- IF privileges.topics:create -->
			<button id="new_topic" class="btn btn-primary">[[category:new_topic_button]]</button>
			<!-- ELSE -->
			<!-- IF !loggedIn -->
				<a href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
			<!-- ENDIF !loggedIn -->
			<!-- ENDIF privileges.topics:create -->

			<span class="pull-right" component="category/controls">
				<!-- IMPORT partials/category_watch.tpl -->

				<!-- IMPORT partials/category_sort.tpl -->

				<!-- IMPORT partials/category_tools.tpl -->
			</span>
		</div>

		<!-- IF !topics.length -->
		<div class="alert alert-warning" id="category-no-topics">
			[[category:no_topics]]
		</div>
		<!-- ENDIF !topics.length -->

		<!-- IMPORT partials/topics_list.tpl -->

		<!-- IF config.usePagination -->
		<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>

	<!-- IF topics.length -->
	<div widget-area="sidebar" class="col-md-3 col-xs-12 category-sidebar sidebar"></div>
	<!-- ENDIF topics.length -->
</div>

<!-- IMPORT partials/move_thread_modal.tpl -->

<!-- IF !config.usePagination -->
<noscript>
	<!-- IMPORT partials/paginator.tpl -->
</noscript>
<!-- ENDIF !config.usePagination -->
