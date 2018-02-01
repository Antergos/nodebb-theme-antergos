(function (module) {
	"use strict";

	var theme = {};
	var async = require('async');
	var meta = module.parent.require('./meta'),
	var path = module.parent.require('path'),
	var nconf = module.parent.require('nconf'),
	var Topic = module.parent.require('./topics'),
	var Post = module.parent.require('./posts');

	theme.defineWidgetAreas = function (areas, callback) {
		areas = areas.concat([
			{
				name: "Categories Sidebar",
				template: "categories.tpl",
				location: "sidebar"
			},
			{
				name: "Category Sidebar",
				template: "category.tpl",
				location: "sidebar"
			},
			{
				name: "Topic Sidebar",
				template: "topic.tpl",
				location: "sidebar"
			}
		]);

		callback(null, areas);
	};

	theme.preinit = function (params, callback) {
		nconf.set('base_templates_path', path.join(nconf.get('themes_path'), 'nodebb-theme-vanilla/templates'));

		callback();
	};

	theme.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware;

		app.get('/admin/plugins/antergos', middleware.admin.buildHeader, renderAdmin);
		app.get('/api/admin/plugins/antergos', renderAdmin);

		callback();
	};

	theme.addAdminNavigation = function(header, callback) {
		header.plugins.push({
			route: '/plugins/antergos',
			icon: 'fa-paint-brush',
			name: 'Antergos Theme'
		});

		callback(null, header);
	};

	theme.getConfig = function(config, callback) {
		config.displayGlobalAlert = !!parseInt(meta.config.displayGlobalAlert, 10);
		config.globalAlertSubject = meta.config.globalAlertSubject;
		config.globalAlertMsg = meta.config.globalAlertMsg;
		callback(false, config);
	};

	theme.filter_post_content = function( postData, callback ) {
		postData.postData.content = postData.postData.content.replace(/src=['"]http:/g, '');
		return callback(null, postData);
	};

	theme.filter_topic_teasers = function( data, callback ) {
		async.each(data.teasers, (teaser, next) => {
			if (!teaser) {
				return next();
			}
			Topic.getTopicFields(teaser.tid, ['postcount', 'mainPid'], (err, fields) => {
				if (err) {
					return next(err);
				}
				teaser.postCount = fields.postcount;

				Post.getPostFields(fields.mainPid, ['upvotes', 'downvotes'], (err, post_fields) => {
					if (err) {
						return next(err);
					}
					let upvotes = parseInt(post_fields.upvotes) || 0;
					let downvotes = parseInt(post_fields.downvotes) || 0;

					if (upvotes > downvotes) {
						upvotes -= downvotes;
					}

					teaser.likesCount = upvotes;
					next();			
				});
			});
		}, function (err) {
			callback(null, data);
		});
	};

	function renderAdmin(req, res, next) {
		res.render('admin/plugins/antergos', {});
	}

	module.exports = theme;

}(module));
