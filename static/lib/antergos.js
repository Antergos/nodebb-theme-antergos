(function ($) {
	$(document).ready(function () {
		var secLastHeight,
			$wpWidget,
			wpWidgetHeight,
			$secLast,
			$lastWidget,
			lastWidgetHeight,
			globalAlertDismissed,
			isLoggedIn = $('#isLoggedIn').val(),
			allWidgets,
			enoughWidgets,
			childRows,
			wpWidgetWidth;

		function setLS(tpl, key, value) {
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
				$visible = $('.sidebar .panel, .sidebar .etban-divi').filter(':visible').not('.panel-footer');

			if (!checkedWidgets) {
				$wpWidget = $visible.eq(-3);
				setLS(template, 'wpWidgetHeight', $wpWidget.height());
				setLS(template, 'wpWidgetWidth', $wpWidget.width() + 'px');
				$secLast = $visible.eq(-2);
				setLS(template, 'secLastHeight', $secLast.height() + 100 + 'px');
				$lastWidget = $visible.eq(-1);
				setLS(template, 'lastWidgetHeight', $lastWidget.height());
				allWidgets = $visible.length;
				enoughWidgets = ((allWidgets >= 3) && (($secLast.height() + $lastWidget.height()) < $(window).height())) ? 'true' : 'false';
				setLS(template, 'enoughWidgets', enoughWidgets);
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
			var $visible = $('.sidebar .panel, .sidebar .etban-divi').filter(':visible').not('.panel-footer'),
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
					"Antergos in other languages"];
			$('.bcrumb').each(function () {
				var theTitle = $(this).find('span').text().trim();
				if ($.inArray(theTitle, titles) > -1) {
					theTitle = theTitle.split(' ').join('-');
					$(this).find('a').attr('href', '/#' + theTitle);
				}
				$(this).addClass('bcfixed');
			});
			if ($('.page-category').length && $.inArray(ajaxify.data.name, titles) > -1) {
				$('#new_topic').on('click', function () {
					setTimeout(function () {
						var qAndA = $('.composer .dropdown-menu .fa-question-circle').parent();
						qAndA.trigger('click');
					}, 750);
				});
			}

		}

		function get_random(list) {
			return list[Math.floor((Math.random() * list.length))];
		}

		function fix_widgets(tpl) {
			if (tpl !== 'categories') {
				var banners = ['.etban-topic', '.etban-bloom', '.etban-divi'],
					chosenValue = get_random(banners);
				$(chosenValue).css('display', 'block');
				for (var i = 0; i < banners.length; i++) {
					var banner = banners[i];
					if (banner !== chosenValue) {
						$(banner).css('display', 'none');
					}

				}
			} else {
				$('.etban-topic').css('display', 'none');
				$('.etban-bloom').css('display', 'none');
				$('.etban-divi').css('display', 'none');
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
				catName = ajaxify.data.template.category ? ajaxify.data.name : null;
			if (null !== catName && $.inArray(catName, titles) > -1) {
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

		function maybeDisplayGlobalALert() {
			if (!$('body').hasClass('globalAlert')) {
				$('body').addClass('globalAlert');

				globalAlertDismissed = $.cookie('globalAlertDismissed');

				if (true === config.displayGlobalAlert && globalAlertDismissed !== 'True') {

					app.alert({
						title: config.globalAlertSubject,
						message: config.globalAlertMsg,
						location: 'right-top',
						type: 'info',
						closefn: function () {
							$.cookie('globalAlertDismissed', 'True', {expires: 5, path: '/'});
						},
						clickfn: function () {
							$.cookie('globalAlertDismissed', 'True', {expires: 5, path: '/'});
						}
					});
				}
			}
		}

		function maybe_add_click_handler_on_external_links() {
			var $content = $('#content');

			if ($content.hasClass('external_link_prompt_check_done_all')) {
				return;
			}

			$content.find( 'a' ).each( function() {
				if ( $( this ).hasClass( 'external_link_prompt_check_done' ) ) {
					return true;
				}

				if ( this.host !== window.location.host && this.host.indexOf( 'bbs.archlinux.org' ) > - 1 ) {
					$( this ).on( 'click', function( event ) {
						event.stopPropagation();
						event.preventDefault();

						var $target = $(event.target);

						bootbox.dialog( {
							message: "<p>You clicked a link to a page on the Arch Linux Forum. Please be advised that the Arch Linux Forum is not the proper channel through which Antergos users should obtain support. We ask that you utilize the Arch Linux Forum as a <strong><em>READ ONLY</em></strong> resource.</p><p>Please direct any and all questions regarding content found on the Arch Linux Forum right here on the Antergos Forum. Be sure to include a reference link to the related Arch Linux Forum post.</p><p>Thanks for your cooperation!</p><p>-Antergos Developers</p>",
							title: "A Note Regarding The Arch Linux Forum...",
							buttons: {
								main: {
									label: "Okay, I understand.",
									className: "btn-primary",
									callback: function() {
										window.open($target.attr('href'));
									}
								}
							}
						} );
					} );
				}

				$(this).addClass('external_link_prompt_check_done');

			});

			$content.addClass('external_link_prompt_check_done_all');
		}

		$(window).load(function () {
			var $tpl = $('.category-page').length,
				tpl = app.template;
			if ($tpl) {
				doSlick();
			}
			maybeDisplayGlobalALert();
			makeFooterToBottom();
			fix_breadcrumbs();
			doWaypoints();
			fixQandA();
			fix_widgets(tpl);
			maybe_add_click_handler_on_external_links();
		});

		$(window).on('action:ajaxify.start', function (ev, data) {
			$('footer').hide();
		});


		$(window).on('action:ajaxify.end', function (ev, data) {
			var url = data.url,
				tpl = app.template,
				height = $(window).scrollTop();
			if (!/^admin\//.test(data.url)) {
				maybeDisplayGlobalALert();
				maybe_add_click_handler_on_external_links();
			}

			if (tpl === 'categories') {
				fixHomeGrid();
			}


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

		$('li[component="user/logout"]').on('click', function () {
			var logout_in_progress = localStorage.getItem('logging_out');
			if (typeof logout_in_progress !== 'undefined' && 'true' !== logout_in_progress) {
				localStorage.setItem('logging_out', 'true');
				window.location = 'https://antergos.auth0.com/v2/logout?federated&redirectTo=https://forum.antergos.com/logout';
			} else {
				localStorage.setItem('logging_out', 'false');
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