<div class="row home" itemscope itemtype="http://www.schema.org/ItemList">
    <div class="col-lg-8 col-sm-12" no-widget-class="col-lg-12 col-sm-12" no-widget-target="sidebar">
        <div class="row">
            <!-- BEGIN categories -->
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
                <div class="<!-- IF categories.children.class -->{categories.children.class}<!-- ELSE -->col-md-4 col-sm-6 col-xs-12<!-- ENDIF categories.children.class --> category-item"
                     data-cid="{categories.children.cid}"
                     data-numRecentReplies="{categories.children.numRecentReplies}">
                    <meta itemprop="name" content="{categories.children.name}">

                    <div class="category-wrapper">

                        <!-- IF categories.children.link -->
                        <a style="color: {categories.children.color};" href="{categories.children.link}" itemprop="url"
                           target="_blank">
                            <!-- ELSE -->
                            <a style="color: {categories.children.color};"
                               href="{relative_path}/category/{categories.children.slug}" itemprop="url">
                                <!-- ENDIF categories.children.link -->
                                <div id="category-{categories.children.cid}" class="category-header">
                                    <!-- IF !categories.children.link -->
                                    <span class="category-stats"><i class="fa fa-book" data-toggle="tooltip"
                                                                    title="[[global:topics]]"></i> <span
                                            class="human-readable-number" title="{categories.children.topic_count}">{categories.children.topic_count}</span>&nbsp; <i
                                            class="fa fa-comments" data-toggle="tooltip"
                                            title="[[global:posts]]"></i> <span class="human-readable-number"
                                                                                title="{categories.children.post_count}">{categories.children.post_count}</span></span>
                                    <!-- ENDIF !categories.children.link -->
                                    <div class="category-header-image-{categories.children.imageClass}"
                                         style=" <!-- IF categories.children.backgroundImage -->background-image: url({categories.children.backgroundImage});<!-- ENDIF categories.children.backgroundImage --> <!-- IF categories.children.bgColor -->background-color: {categories.children.bgColor};<!-- ENDIF categories.children.bgColor --> ">
                                    </div>
                                    <h4 style="color: {categories.children.color};">{categories.children.name}</h4>
                                </div>
                            </a>

                            <div class="category-box">
                                <div class="category-info">
                                    <div class="description" itemprop="description"><p>
                                        {categories.children.description}</p></div>
                                </div>
                                <!-- IF !categories.children.link -->
                                <div class="post-preview-content clearfix {categories.children.unread-class} col-md-12 col-sm-12 col-xs-12">
                                    <!-- BEGIN posts -->
                                    <a class="user-picture col-md-2 col-sm-2"
                                       style="color: {categories.children.color};"
                                       href="<!-- IF categories.children.posts.user.userslug -->{relative_path}/user/{categories.children.posts.user.userslug}<!-- ELSE -->#<!-- ENDIF categories.children.posts.user.userslug-->">
                                        <span class="user-picture small pull-left"><img
                                                src="{categories.children.posts.user.picture}"
                                                title="{categories.children.posts.user.username}"
                                                class="user-img"></span>
                                    </a>

                                    <div class="post-info pull-left col-md-10 col-sm-10 col-xs-10">
                                        <h5><a href="{relative_path}/topic/{categories.children.posts.topic.slug}">{categories.children.posts.topic.title}</a>
                                        </h5>
                                        <a href="{relative_path}/user/{categories.children.posts.user.username}"
                                           class="user">{categories.children.posts.user.username}</a>
                                        <span class="timeago" title="{categories.children.posts.relativeTime}"></span>
                                    </div>
                                    <a class="readmore-link pull-right"
                                       href="{relative_path}/topic/{categories.children.posts.topic.slug}<!-- IF categories.children.posts.index -->/{categories.children.posts.index}<!-- ENDIF categories.children.posts.index -->"
                                       title="[[global:read_more]]"><i class="fa fa-fw fa-link fa-gradient"></i></a>
                                    <!-- END posts -->
                                </div>
                                <!-- ENDIF !categories.children.link -->
                            </div>
                    </div>
                </div>
                <!-- END children -->
            </div>
            <!-- END categories -->
        </div>
    </div>

    <div widget-area="sidebar" class="col-lg-3 col-lg-offset-1 col-sm-12"></div>
</div>
