<div class="row categories" itemscope itemtype="http://www.schema.org/ItemList">
	<div class="col-lg-9 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
		<!-- BEGIN categories -->
		<!-- IF !categories.disabled -->
		<div itemprop="itemListElement" itemscope itemtype="http://www.schema.org/ListItem">
			<!-- IMPORT partials/category_header.tpl -->
			<div class="row parent-cat" itemscope itemtype="http://www.schema.org/ItemList">
				<!-- BEGIN children -->
				<!-- IF !categories.children.disabled -->
				<div component="categories/category" class="col-md-4 col-sm-6 col-xs-12 category-item" data-cid="{categories.children.cid}" data-numRecentReplies="{categories.children.numRecentReplies}" itemprop="itemListElement" itemscope itemtype="http://www.schema.org/ListItem">
					<div id="category-{categories.children.cid}" class="category-module">
						<div class="module-head">
							<a style="color: {categories.children.color};" href="{config.relative_path}/category/{categories.children.slug}" itemprop="url">
								<h1 style="color: {categories.children.color};" itemprop="name">{categories.children.name}</h1>
								<meta itemprop="description" content="{categories.children.description}"/>
							</a>
						</div>
						<div itemscope itemtype="http://www.schema.org/ItemList">
							<!-- BEGIN posts -->
							<!-- IF @first -->
							<div class="latest-post">
								<article component="category/posts">
									<div class="category-header category-header-image-{categories.children.imageClass}" style="<!-- IF categories.children.backgroundImage -->background-image: url({categories.children.backgroundImage});<!-- ENDIF categories.children.backgroundImage --><!-- IF categories.children.bgColor -->background-color: {categories.children.bgColor};<!-- ENDIF categories.children.bgColor -->color: {categories.children.color};">
										<div class="badge {categories.children.unread-class}" itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
											<meta itemprop="interactionType" content="http://schema.org/CommentAction" />
											<i class="fa fa-book" data-toggle="tooltip" title="[[global:topics]]"></i> <span class="human-readable-number" title="{categories.children.totalTopicCount}">{categories.children.totalTopicCount}</span>&nbsp; <i class="fa fa-pencil" data-toggle="tooltip" title="[[global:posts]]"></i> <span class="human-readable-number" title="{categories.children.totalPostCount}" itemprop="userInteractionCount">{categories.children.totalPostCount}</span>
										</div>
										<!-- IF categories.children.icon -->
										<div><i class="fa {categories.children.icon} fa-4x"></i></div>
										<!-- ENDIF categories.children.icon -->
									</div>
									<div class="post-content" itemprop="itemListElement" itemscope itemtype="http://www.schema.org/DiscussionForumPosting">
										<h2 class="post-title" itemprop="headline">
											<a href="{config.relative_path}/topic/{categories.children.posts.topic.slug}" itemprop="discussionUrl">{categories.children.posts.topic.title}</a>
										</h2>
										<div class="post-meta-vcard">
											<div>
												<time class="updated timeago" title="{categories.children.posts.timestampISO}" itemprop="dateModified" datetime="{categories.children.posts.timestampISO}"></time> |
											</div>
											<div itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
												<meta itemprop="interactionType" content="http://schema.org/ReplyAction" />
												<span itemprop="userInteractionCount">{categories.children.posts.postCount}</span> <i class="fa fa-comments-o"></i> |
											</div>
											<div itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
												<meta itemprop="interactionType" content="http://schema.org/LikeAction" />
												<span itemprop="userInteractionCount">{categories.children.posts.likesCount}</span> <i class="fa fa-heart"></i>
											</div>
										</div>
										<div class="excerpt entry-summary" itemprop="description">

											<!-- STOPPED HERE -->

										</div>
									</div>

								</article>
							</div>
							<!-- ENDIF @first -->

							<div  class="post-preview clearfix">
								<strong></strong>
								<hr/>
								<a style="color: {categories.children.color};" href="<!-- IF categories.children.posts.user.userslug -->{config.relative_path}/user/{categories.children.posts.user.userslug}<!-- ELSE -->#<!-- ENDIF categories.children.posts.user.userslug -->">
									<!-- IF categories.children.posts.user.picture -->
									<img src="{categories.children.posts.user.picture}" title="{categories.children.posts.user.username}" class="pull-left user-img"/>
									<!-- ELSE -->
									<div class="pull-left user-img user-icon" title="{categories.children.posts.user.username}" style="background-color: {categories.children.posts.user.icon:bgColor}">
										{categories.children.posts.user.icon:text}
									</div>
									<!-- ENDIF categories.children.posts.user.picture -->
								</a>
								<div class="post-preview-content">

									<div class="content">
										{categories.children.posts.content}
									</div>
									<p class="fade-out"></p>
								</div>
								<span class="pull-left" style="margin-top: 18px;">
									<span class="timeago" title="{categories.children.posts.timestampISO}"></span>
								</span>
							<span class="pull-right post-preview-footer">
								<a href="{config.relative_path}/topic/{categories.children.posts.topic.slug}<!-- IF categories.children.posts.index -->/{categories.children.posts.index}<!-- ENDIF categories.children.posts.index -->" class="readmore">[[global:read_more]]</a>
							</span>
							</div>
							<!-- END posts -->
							<!-- ENDIF !categories.children.link -->
						</div>
				</div>
			</div>
		</div>
		<!-- END children -->
	</div>


	<!-- END categories -->
</div>
<div widget-area="sidebar" class="col-lg-3 col-sm-12 hm-sidebar sidebar"></div>
</div>
