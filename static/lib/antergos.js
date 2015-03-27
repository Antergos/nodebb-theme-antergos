$(document).ready(function() {
	var secLastHeight,
		$wpWidget,
		wpWidgetHeight,
		$secLast,
		$lastWidget,
		lastWidgetHeight,
		passwdNotice = localStorage.getItem('passwdNotice'),
		isLoggedIn = $('#isLoggedIn').val(),
		allWidgets,
		enoughWidgets,
		childRows,
		wpWidgetWidth;

	function setLocalStorage(tpl, key, value) {
		key = tpl + ':' + key;
		localStorage.setItem(key, value)
	}

	function getLS(tpl, key) {
		var value;
		key = tpl + ':' + key;
		value = localStorage.getItem(key);
		return value;
	}

	function checkWidgetHeight() {
		var template = 'checkWaypoints:' + app.template + ':' + $(window).width(),
			checkedWidgets = $.cookie(template);
		if (!checkedWidgets) {
			$wpWidget = $('.sidebar .panel:nth-last-child(3)').not('.panel-footer');
			setLocalStorage(template, 'wpWidgetHeight' + $(window).width(), $wpWidget.height());
			setLocalStorage(template, 'wpWidgetWidth' + $(window).width(), $wpWidget.width() + 'px');
			$secLast = $('.sidebar .panel:nth-last-child(2)').not('.panel-footer');
			setLocalStorage(template, 'secLastHeight' + $(window).width(), $secLast.height() + 100 + 'px');
			$lastWidget = $('.sidebar .panel:last-child').not('.panel-footer');
			setLocalStorage(template, 'lastWidgetHeight' + $(window).width(), $lastWidget.height());
			allWidgets = $('[widget-area="sidebar"]').children().length;
			enoughWidgets = ((allWidgets >= 3) && ($secLast.height() + $lastWidget.height()) < $(window).height()) ? 'true' : 'false';
			setLocalStorage(template, 'enoughWidgets' + $(window).width(), enoughWidgets);
			$.cookie(template, true, {expires: 1, path: '/'});

		}

	}

	function fixHomeGrid() {
		if ($('.categories').length) {
			$('.parent-cat').each(function (index) {
				var $pcat = $(this),
					pcatId = 'pcat_' + index;

				$pcat.addClass(pcatId);

				if (!$pcat.find('.child_row.row').length) {

					childRows = Math.ceil($pcat.children().length / 3);
					//console.log('childRows: ' + childRows);
					for (var i = 0, len = childRows; i < len; i++) {
						var $ccats = $pcat.children('.category-item:lt(3)');
						var ccatsLen = $ccats.length;
						$ccats.each(function (index) {
							var childRowClass = '.child_row_' + i;
							var $childRow = $(this).siblings(childRowClass);
							$(this).appendTo($childRow);
							if (index == ccatsLen - 1) {
								$childRow.addClass('row').css('display', 'block');
							}

						});
					}
				}

			});
		}
	}

	function doWaypoints() {
		$('[widget-area="sidebar"]').waypoint({
			handler: function (direction) {
				if (direction === "down") {
					$('#header-menu').addClass('ant-fixed-header');
					$('#top-header').removeClass('ant-fixed-header');
				} else {
					$('#header-menu').removeClass('ant-fixed-header');
					$('#top-header').addClass('ant-fixed-header');
				}
			}
		});
		$('.panel:nth-last-child(3)').waypoint({
			handler: function (direction) {
				checkWidgetHeight();
				var tpl = 'checkWaypoints:' + app.template + ':' + $(window).width();
				if (getLS(tpl, 'enoughWidgets') === 'true') {
					if (direction === "down") {
						//console.log('waypoint fired down - 2last');
						$('.panel:nth-last-child(2)').not('.panel-footer').css({
							'top': '80px',
							'width': getLS(tpl, 'wpWidgetWidth')
						}).addClass('fixed');
						$('.panel:nth-last-child(1)').not('.panel-footer').css({
							'top': getLS(tpl, 'secLastHeight'),
							'width': getLS(tpl, 'wpWidgetWidth')
						}).addClass('fixed');
					} else {
						//console.log('waypoint fired up - 2last');
						$('.panel:nth-last-child(1)').removeClass('fixed').css('top', 'inherit');
						$('.panel:nth-last-child(2)').removeClass('fixed').css('top', 'inherit');
					}
				}
			},
			offset: function () {
				checkWidgetHeight();
				var tpl = 'checkWaypoints:' + app.template;
				//console.log('2lastHeight is ' + secLastHeight);
				return -(getLS(tpl, 'wpWidgetHeight')) + 80;
			}
		});
	}

	function doSlick() {
		//noinspection JSJQueryEfficiency
		if ($('.subcategories').length && !$('.slick-initialized').length) {

			$('.subcategories').slick({
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4
			});
		}
	}

	function reload_js(src) {
		$('script[src="' + src + '"]').remove();
		$('<script>').attr('src', src).appendTo('head');
	}

	function makeFooterToBottom() {
		if (!$('.footer-position-running').length) {
			$('footer').addClass('footer-position-running');
			var wheight = $(window).height() - 12,
				pheight = $('body').height(),
				fheight = $('footer').height(),
				diff;
			if ((pheight + fheight) < wheight) {
				//diff = (wheight - pheight);
				//diff = (diff > fheight) ? (diff - fheight) : diff;
				//console.log('w ' + wheight + ' p ' + pheight + ' d ' + diff);
				//$('footer').css('margin-top', diff + 'px');
				$('footer').css({
					'position': 'fixed',
					'bottom': '0',
					'width': '100%'
				});
			} else {
				$('footer').css({
					'position': 'initial',
					'bottom': 'initial',
					'width': '100%'
				});
			}
			$('footer').show().removeClass('footer-position-running');
		}
	}

		fixHomeGrid();

		/*if (passwdNotice !== 'True' && isLoggedIn !== 'true' && isLoggedIn !== true && $('.login').length) {
		 //noinspection JSUnusedGlobalSymbols
		 app.alert({
		 title: 'Attention Existing Users:',
		 message: 'All user accounts were imported from the old forum. For security reasons, passwords were' +
		 ' not imported. In order to activate your account on the new forum, you must reset your password' +
		 ' Click this message to <strong>reset your password now</strong>.',
		 location: 'right-top',
		 type: 'info',
		 image: '//antergos.org/info.png',
		 closefn: function passwdNoticeClosed() {
		 localStorage.setItem('passwdNotice', 'True');
		 },
		 clickfn: function passwdNoticeClicked() {
		 localStorage.setItem('passwdNotice', 'True');
		 window.location = '/reset';
		 }
		 });
		 }*/

	$(window).load(function () {
		var $tpl = $('.category-page').length;
		if ($tpl === 'category') {
			doSlick();
		}
		makeFooterToBottom();
	});

	$(window).on('action:ajaxify.start', function (ev, data) {
		$('footer').hide();
	});

	$(window).on('action:ajaxify.end', function (ev, data) {
		var url = data.url,
			tpl = app.template,
			height = $(window).scrollTop();

		console.log(tpl);
		if (tpl === 'categories') {
			fixHomeGrid();
		}

		if (!/^admin\//.test(data.url) && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			if ($('.categories').length) {
				$('.category-header .badge i').tooltip();
			}
		}
		if (tpl !== 'categories' && tpl !== 'category') {
			$('.etban-topic').css('display', 'block');
		} else {
			$('.etban-topic').css('display', 'none');
		}
		if (tpl === 'topic' || tpl === 'category' || tpl === 'chats') {
			$('.active-users').css('display', 'block');
		} else {
			$('.active-users').css('display', 'none');
		}
		if (tpl === 'category') {
			doSlick();
		}
		if (height < 25) {
			$('#header-menu').removeClass('ant-fixed-header');
			$('#top-header').addClass('ant-fixed-header');
		}

	});

	$(window).on('action:ajaxify.contentLoaded', function (ev, data) {
		reload_js('/plugins/nodebb-theme-antergos/vendor/jquery.waypoints.min.js');
		reload_js('/plugins/nodebb-theme-antergos/vendor/jquery.cookie.js');
		setTimeout(function () {
			doWaypoints();
			makeFooterToBottom();
		}, 500);
	});

	(function () {
		// loading animation
		var refreshTitle = app.refreshTitle;

		$(window).on('action:ajaxify.start', function (data) {
			$('.loading-bar').fadeIn(200).removeClass('reset');
		});

		$(window).on('action:ajaxify.loadingTemplates', function () {
			$('.loading-bar').css('width', '90%');
		});

		app.refreshTitle = function (url) {
			$('.loading-bar').css('width', '100%');
			setTimeout(function () {
				$('.loading-bar').fadeOut(250);

				setTimeout(function () {
					$('.loading-bar').addClass('reset').css('width', '0%');
				}, 250);

			}, 750);

			return refreshTitle(url);
		};
	}());
});