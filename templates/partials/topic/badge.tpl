<!-- IF posts.user.selectedGroup.slug -->
<a href="{config.relative_path}/groups/{posts.user.selectedGroup.slug}"><small class="label group-label inline-block" style="background-color: {posts.user.selectedGroup.labelColor};"><!-- IF posts.user.selectedGroup.icon --><i class="fa {posts.user.selectedGroup.icon}"></i> <!-- ENDIF posts.user.selectedGroup.icon -->{posts.user.selectedGroup.userTitle}</small></a>
<!-- ENDIF posts.user.selectedGroup.slug -->
<!-- IF !posts.user.selectedGroup.slug -->
	<!-- BEGIN posts.user.groups -->
		<!-- IF @first -->
<a href="{config.relative_path}/groups/{posts.user.groups.slug}"><small class="label group-label inline-block" style="background-color: {posts.user.groups.labelColor};"><!-- IF posts.user.groups.icon --><i class="fa {posts.user.groups.icon}"></i> <!-- ENDIF posts.user.groups.icon -->{posts.user.groups.userTitle}</small></a>
		<!-- ENDIF @first -->
	<!-- END posts.user.groups -->
<!-- ENDIF !posts.user.selectedGroup.slug -->