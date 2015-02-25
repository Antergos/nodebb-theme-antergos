$('document').ready(function () {
	function fixHomeGrid() {
		$('.parent-cat').each(function (index) {
			var $pcat = $(this),
				pcatId = 'pcat_' + index;

			$pcat.addClass(pcatId);

			if (!$pcat.find('.child_row.row').length) {

				childRows = Math.ceil($pcat.children().length / 3);
				console.log('childRows: ' + childRows);
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

	function doAffix() {
		var $theSidebar = $("[widget-area='sidebar']"),
			$sidebar;
		if ($theSidebar.length && !$('.categories.length')) {
			$sidebar = ($theSidebar.length > 2) ? $theSidebar.children('.panel').slice(-2) : $theSidebar.children('.panel');
			$sidebar.each(function () {
				var $widget = $(this);
				var widgetOffset = $widget.offset().top;
				$widget.affix({
					offset: {
						top: widgetOffset
					}
				});
				console.log('set affix');
			});
		}
	}

	fixHomeGrid();

	var checkWidget = true,
		checkWidgetTwo = true;
		var secLastHeight,
			$wpWidget,
			wpWidgetHeight,
			$secLast,
			secLastHeight,
			$lastWidget,
			lastWidgetHeight ;
		function doWaypoints() {
			function checkWidgetHeight() {
				$wpWidget = $('.panel:nth-last-child(3)');
				wpWidgetHeight = $wpWidget.height();
				$secLast = $('.panel:nth-last-child(2)');
				secLastHeight = $secLast.height();
				$lastWidget = $('.panel:last-child');
				lastWidgetHeight = $lastWidget.height();
			}
			$('[widget-area=sidebar]').waypoint({
				handler: function(direction) {
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
				handler: function(direction) {
					checkWidgetHeight();
					if (direction === "down") {
						console.log('waypoint fired down - 2last');
						$('.panel:nth-last-child(2)').css('top', '80px').addClass('fixed');
						$('.panel:nth-last-child(1)').css('top', secLastHeight + 100 + 'px').addClass('fixed');
					} else {
						console.log('waypoint fired up - 2last');
						$('.panel:nth-last-child(1)').removeClass('fixed').css('top', 'inherit');
						$('.panel:nth-last-child(2)').removeClass('fixed').css('top', 'inherit');
					}
				},
				offset: function() {
					checkWidgetHeight();
					console.log('2lastHeight is ' + secLastHeight);
					checkWidget = false;
					return -wpWidgetHeight + 80;
				}
			});


			/*$('.panel:nth-last-child(3)').waypoint({
				handler: function(direction) {
					checkWidgetHeight();
					if (direction === "down") {
						console.log('waypoint fired down');

						$('.panel:nth-last-child(1)').css('top', secLastHeight + 100 + 'px').addClass('fixed');
					} else {
						console.log('waypoint fired up - last');
						$('.panel:nth-last-child(1)').removeClass('fixed').css('top', 'inherit');
					}
				},
				offset: function() {
					if (checkWidgetTwo === true) checkWidgetHeight();
					console.log('2lastHeight is ' + secLastHeight);
					checkWidgetTwo = false;
					return (secLastHeight + 80) - wpWidgetHeight;
				}
			});*/
		}

	$(window).on('action:ajaxify.end', function (ev, data) {
		var url = data.url,
			tpl = data['tpl_url'];
		setTimeout(function() {
			doWaypoints();
		},500);
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
		if (tpl === 'category') {
			doSlick();
		}
	});
	$(window).load(function () {
		setTimeout(function() {
			doWaypoints();
		}, 300);
		doSlick();

	});

	(function () {
		// loading animation
		var refreshTitle = app.refreshTitle,
			loadingBar = $('.loading-bar');

		$(window).on('action:ajaxify.start', function (data) {
			loadingBar.fadeIn(0).removeClass('reset');
		});

		$(window).on('action:ajaxify.loadingTemplates', function () {
			loadingBar.css('width', '90%');
		});

		app.refreshTitle = function (url) {
			loadingBar.css('width', '100%');
			setTimeout(function () {
				loadingBar.fadeOut(250);

				setTimeout(function () {
					loadingBar.addClass('reset').css('width', '0%');
				}, 250);
			}, 750);

			return refreshTitle(url);
		};
	}());
	function doSlick() {
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


	var passwdNotice = localStorage.getItem('passwdNotice'),
		isLoggedIn = $('#isLoggedIn').val(),
		isFirefox = navigator.userAgent.indexOf("Firefox") !== -1,
		firefoxNotice = localStorage.getItem('firefoxNotice');


	if (passwdNotice !== 'True' && isLoggedIn !== 'true' && isLoggedIn !== true) {
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
	}
});
