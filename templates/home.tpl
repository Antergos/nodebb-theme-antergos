<div class="row home" itemscope itemtype="http://www.schema.org/ItemList">
    <div class="col-lg-8 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
        <!-- BEGIN categories -->
        <div class="row">
            <div class="<!-- IF categories.class -->col-md-12 col-sm-12 col-xs-12<!-- ELSE -->col-md-12 col-sm-12 col-xs-12<!-- ENDIF categories.class -->"
                 data-cid="{categories.cid}" data-numRecentReplies="{categories.numRecentReplies}">
                <div class="et_pb_column et_pb_column_4_4">
                    <div class="et_pb_text et_pb_bg_layout_light et_pb_text_align_left">

                        <h2 class="category-group">{categories.name}</h2>

                        <p><em>{categories.description}</em></p>
                    </div>
                    <!-- .et_pb_text -->
                    <hr class="et_pb_space et_pb_divider" style="border-color: #dddddd;">
                </div>

                <!-- BEGIN children -->
                <div class="<!-- IF categories.children.class -->col-md-4 col-sm-6 col-xs-12<!-- ELSE -->col-md-4 col-sm-6 col-xs-12<!-- ENDIF categories.children.class --> category-item"
                     data-cid="{categories.children.cid}"
                     data-numRecentReplies="{categories.children.numRecentReplies}">
                    <meta itemprop="name" content="{categories.children.name}">

                    <div class="category-icon">

                        <!-- IF categories.children.link -->
					<a style="color: {categories.children.color};" href="{categories.children.link}" itemprop="url" target="_blank">
					<!-- ELSE -->
					<a style="color: {categories.children.color};" href="{relative_path}/category/{categories.children.slug}" itemprop="url">
					<!-- ENDIF categories.children.link -->
						<div
							id="category-{categories.children.cid}" class="category-header category-header-image-{categories.children.imageClass}"
							style="
								<!-- IF categories.children.backgroundImage -->background-image: url({categories.children.backgroundImage});<!-- ENDIF categories.children.backgroundImage -->
								<!-- IF categories.children.bgColor -->background-color: {categories.children.bgColor};<!-- ENDIF categories.children.bgColor -->
								color: {categories.children.color};
							"
						>
							<!-- IF !categories.children.link -->
							<span class="badge {categories.children.unread-class}"><i class="fa fa-book" data-toggle="tooltip" title="[[global:topics]]"></i> <span class="human-readable-number" title="{categories.children.topic_count}">{categories.children.topic_count}</span>&nbsp; <i class="fa fa-pencil" data-toggle="tooltip" title="[[global:posts]]"></i> <span class="human-readable-number" title="{categories.children.post_count}">{categories.children.post_count}</span></span>
							<!-- ENDIF !categories.children.link -->

							<!-- IF categories.children.icon -->
							<div><i class="fa {categories.children.icon} fa-4x"></i></div>
							<!-- ENDIF categories.children.icon -->
						</div>
					</a>

					<div class="category-box">
						<div class="category-info">
							<!-- IF categories.children.link -->
							<a href="{categories.children.link}" itemprop="url" target="_blank">
							<!-- ELSE -->
							<a href="{relative_path}/category/{categories.children.slug}" itemprop="url">
							<!-- ENDIF categories.children.link-->
								<h4><!-- IF categories.children.icon --><i class="fa {categories.children.icon} visible-xs-inline"></i> <!-- ENDIF categories.children.icon -->{categories.children.name}</h4>
							</a>
							<div class="description" itemprop="description">{categories.children.description}</div>
						</div>
						<!-- IF !categories.children.link -->
						<!-- BEGIN posts -->
						<div class="post-preview clearfix">
							<div class="post-preview-content">
								<strong><a href="{relative_path}/topic/{categories.children.posts.topic.slug}">{categories.children.posts.topic.title}</a></strong>
								<hr/>
								<a style="color: {categories.children.color};" href="<!-- IF categories.children.posts.user.userslug -->{relative_path}/user/{categories.children.posts.user.userslug}<!-- ELSE -->#<!-- ENDIF categories.children.posts.user.userslug-->">
									<img src="{categories.children.posts.user.picture}" title="{categories.children.posts.user.username}" class="pull-left user-img" />
								</a>
								<div class="content">
								{categories.children.posts.content}
								</div>
								<p class="fade-out"></p>
							</div>
							<span class="pull-right footer">
								<span class="timeago" title="{categories.children.posts.relativeTime}"></span> &bull;
								<a href="{relative_path}/topic/{categories.children.posts.topic.slug}<!-- IF categories.children.posts.index -->/{categories.children.posts.index}<!-- ENDIF categories.children.posts.index -->">[[global:read_more]]</a>
							</span>
						</div>
						<!-- END posts -->
						<!-- ENDIF !categories.children.link -->
                            </div>
                    </div>
                </div>
                <!-- END children -->
            </div>

        </div>
        <!-- END categories -->
    </div>

    <div widget-area="sidebar" class="col-lg-3 col-lg-offset-1 col-sm-12"></div>
</div>
