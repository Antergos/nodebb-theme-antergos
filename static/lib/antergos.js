(function ($) {
	$(document).ready(function () {
		var secLastHeight,
			$wpWidget,
			wpWidgetHeight,
			$secLast,
			$lastWidget,
			lastWidgetHeight,
			avatarNotice = localStorage.getItem('avatarNotice'),
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
			var template = 'checkWaypoints_' + app.template + '_' + $(window).width(),
				checkedWidgets = $.cookie(template),
				$visible = $('.sidebar .panel').filter(':visible').not('.panel-footer');
			if (!checkedWidgets) {
				$wpWidget = $visible.eq(-3);
				setLocalStorage(template, 'wpWidgetHeight', $wpWidget.height());
				setLocalStorage(template, 'wpWidgetWidth', $wpWidget.width() + 'px');
				$secLast = $visible.eq(-2);
				setLocalStorage(template, 'secLastHeight', $secLast.height() + 100 + 'px');
				$lastWidget = $visible.eq(-1);
				setLocalStorage(template, 'lastWidgetHeight', $lastWidget.height());
				allWidgets = $visible.length;
				enoughWidgets = ((allWidgets >= 3) && (($secLast.height() + $lastWidget.height()) < $(window).height())) ? 'true' : 'false';
				setLocalStorage(template, 'enoughWidgets', enoughWidgets);
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
			$('[widget-area="sidebar"]').addClass('sidebar');
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
			var $visible = $('.sidebar .panel').filter(':visible').not('.panel-footer'),
				$wp = $visible.eq(-3);
			$wp.waypoint({
				handler: function (direction) {
					checkWidgetHeight();
					var tpl = 'checkWaypoints_' + app.template + '_' + $(window).width();
					if (getLS(tpl, 'enoughWidgets') === 'true') {
						if (direction === "down") {
							//console.log('waypoint fired down - 2last');
							$visible.eq(-2).css({
								'top': '80px',
								'width': getLS(tpl, 'wpWidgetWidth')
							}).addClass('fixed');
							$visible.eq(-1).css({
								'top': getLS(tpl, 'secLastHeight'),
								'width': getLS(tpl, 'wpWidgetWidth')
							}).addClass('fixed');
						} else {
							//console.log('waypoint fired up - 2last');
							$visible.eq(-1).removeClass('fixed').css('top', 'inherit');
							$visible.eq(-2).removeClass('fixed').css('top', 'inherit');
						}
					}
				},
				offset: function () {
					checkWidgetHeight();
					var tpl = 'checkWaypoints_' + app.template + '_' + $(window).width(),
						theOffset;
					theOffset = Number(getLS(tpl, 'wpWidgetHeight')) > 80 ? Number(getLS(tpl, 'wpWidgetHeight')) - 80 : 80;
					//console.log(-theOffset);
					return theOffset > 0 ? -theOffset : theOffset;
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

		function fix_breadcrumbs() {
			if (!$('.bcrumb').length || $('.bcfixed').length) return;
			var titles = ["About Antergos", "Technical Issues and Assistance", "Contributions & Discussion",
					"Antergos in other languages"],
				catName = ajaxify.variables.get('pageCount');
			$('.bcrumb').each(function () {
				var theTitle = $(this).attr('title');
				if ($.inArray(theTitle, titles) > -1) {
					theTitle = theTitle.split(' ').join('_');
					$(this).find('a').attr('href', '/#' + theTitle);
				}
				$(this).addClass('bcfixed');
			});
			if ($.inArray(catName, titles) > -1) {
				$('#new_topic').on('click', function () {
					setTimeout(function () {
						var qAndA = $('.composer .dropdown-menu .fa-question-circle').parent();
						qAndA.trigger('click');
					}, 750);
				});
			}

		}

		function fix_widgets(tpl) {
			var chosenValue = Math.random() < 0.5 ? '.etban-topic' : '.etban-bloom';
			if (tpl !== 'categories') {
				if ('.etban-topic' === chosenValue) {
					$(chosenValue).css('display', 'block');
					$('.etban-bloom').css('display', 'none');
				} else {
					$(chosenValue).css('display', 'block');
					$('.etban-topic').css('display', 'none');
				}
			} else {
				$('.etban-topic').css('display', 'none');
				$('.etban-bloom').css('display', 'none');
			}

			if (tpl === 'topic' || tpl === 'category' || tpl === 'chats') {
				$('.active-users').css('display', 'block');
				$('.thread_active_users.active-users.inline-block').css('display', 'inline-block');
			} else {
				$('.active-users').css('display', 'none');
			}
			if (tpl === 'topic') {
				$('#bloom-ban').css('display', 'none');
			}
			if (tpl === 'unread' || tpl === 'popular' || tpl === 'recent' || tpl === 'groups' || tpl === 'users' || tpl === 'tags') {
				$('#welcome').css('display', 'block');
			}
		}

		function fixQandA() {
			$('[component="topic/reply"]').on('click', function () {
				setTimeout(function () {
					var qAndA = $('.composer .dropdown-menu .fa-question-circle').parents('li');
					qAndA.hide();
				}, 750);
			});
			if ($('.qafixed').length) return;
			$('.category-page').addClass('qafixed');
			var titles = ["Installation", "Newbie Corner", "Applications & Desktop Environments",
					"Multimedia and Games", "Kernel & Hardware", "Pacman & Package Upgrade Issues", "GNOME", "KDE",
					"Cinnamon", "Xfce", "LXQT", "MATE", "Openbox"],
				catName = ajaxify.variables.get('category_name');
			if ($.inArray(catName, titles) > -1) {
				//$('#new_topic').on('click', function () {
				$(window).on('action:composer.loaded', function (err, data) {
					setTimeout(function () {
						var qAndA = $('.composer .dropdown-menu .fa-question-circle').parent(),
							qAndAIcon = qAndA.children('i').clone();
						qAndALabel = qAndA.text().replace('Ask as Question', 'Submit Question');
						qAndA.text(qAndALabel);
						qAndAIcon.prependTo(qAndA);
						qAndA.trigger('click');
					}, 750);
				});
			} else {
				//$('#new_topic').on('click', function () {
				$(window).on('action:composer.loaded', function (err, data) {
					setTimeout(function () {
						var qAndA = $('.composer .dropdown-menu .fa-question-circle').parents('li');
						qAndA.hide();
					}, 750);
				});
			}

		}

		fixHomeGrid();

		/*if (avatarNotice !== 'True' && isLoggedIn === 'true' {
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
			var $tpl = $('.category-page').length,
					tpl = app.template;
			if ($tpl) {
				doSlick();
			}
			makeFooterToBottom();
			fix_breadcrumbs();
			fixQandA();
			fix_widgets(tpl);
		});

		$(window).on('action:ajaxify.start', function (ev, data) {
			$('footer').hide();
		});


		$(window).on('action:ajaxify.end', function (ev, data) {
			var url = data.url,
				tpl = app.template,
				height = $(window).scrollTop();

			if (tpl === 'categories') {
				fixHomeGrid();
			}

			console.log(tpl);


			if (!/^admin\//.test(data.url) && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if ($('.categories').length) {
					$('.category-header .badge i').tooltip();
					var hash = window.location.hash;
					hash = hash.replace(' ', '_');
					if (hash.length) {
						$('.category-group').each(function () {
							var theId = $(this).attr('id'),
								theNewId = theId.split(' ').join('_');
							$(this).attr('id', theNewId);
						});
						var $elem = $(hash);
						$('html, body').animate({
							scrollTop: $elem.offset().top - 80
						}, 1200);
						window.location.hash = '';
					}
				}
				fix_breadcrumbs();
				fix_widgets(tpl);
				if (tpl === 'category') {
					doSlick();
					fixQandA();
				}
				if (height < 25) {
					$('#header-menu').removeClass('ant-fixed-header');
					$('#top-header').addClass('ant-fixed-header');
				}
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

		$(window).on('action:ajaxify.start', function () {
			if ($('.navbar .navbar-collapse').hasClass('in')) {
				$('.navbar-header button').click();
			}
		});
	});
})(jQuery);