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
		var $sidebar = $("[widget-area='sidebar']");
		if ($sidebar.length) {
			$sidebar.children('.panel').slice(-2).each(function () {
				var $widget = $(this);
				var widgetOffset = $widget.offset().top;
				$widget.affix({
					offset: {
						top: widgetOffset
						}
					}
				});
				console.log('set affix');
			});
		}
	}
	fixHomeGrid();


	$(window).on('action:ajaxify.end', function (ev, data) {
		var url = data.url,
			tpl = data['tpl_url'];
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
		doAffix();
	});
	$(window).load(function () {
		doAffix();
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
