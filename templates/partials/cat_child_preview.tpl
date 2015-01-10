
<!-- BEGIN posts -->
<div class="post-preview clearfix">
    <div class="post-preview-content">
        <strong><a href="{relative_path}/topic/{children.posts.topic.slug}">{children.posts.topic.title}</a></strong>
        <hr/>
        <a style="color: {children.color};"
           href="<!-- IF children.posts.user.userslug -->{relative_path}/user/{children.posts.user.userslug}<!-- ELSE -->#<!-- ENDIF children.posts.user.userslug-->">
            <img src="{children.posts.user.picture}" title="{children.posts.user.username}" class="pull-left user-img"/>
        </a>

        <div class="content">
            {children.posts.content}
        </div>
        <p class="fade-out"></p>
    </div>
							<span class="pull-right footer">
								<span class="timeago" title="{children.posts.relativeTime}"></span> &bull;
                                <a href="{relative_path}/topic/{children.posts.topic.slug}<!-- IF children.posts.index -->/{children.posts.index}<!-- ENDIF children.posts.index -->">[[global:read_more]]</a>
							</span>
</div>
<!-- END posts -->