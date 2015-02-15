$('document').ready(function () {
	requirejs([
		'lavender/masonry',
		'lavender/imagesLoaded'
	], function (Masonry, imagesLoaded) {
		var fixed = localStorage.getItem('fixed') || 1,
			masonry;

		function doMasonry() {
			if ($('.home').length) {

				$('.parent-cat').each(function (index) {
					var $pcat = $(this);
					var pcatId = 'pcat_' + index;
					var pcatClass = '.pcat_' + index;
					$pcat.addClass(pcatId);
					var $ccats = $pcat.find('.category-item');

					if (!$pcat.find('.new-row').length) {
						$ccats.each(function (index) {
							if ((index + 1) % 3 == 0) {
								$('<div class="clearfix visible-lg visible-md new-row"></div>').insertAfter($(this));
							}
						});
					}


				});
				var containers = document.querySelectorAll('.parent-cat');

				for (var i = 0, len = containers.length; i < len; i++) {
					var container = containers[i];
					initMasonry(container);
				}

				function initMasonry(container) {
					imagesLoaded(container, function () {
						new Masonry(container, {
							itemSelector: '.category-item',
							columnWidth: '.category-item:not(.col-lg-12)',
							transitionDuration: '0'
						});
					});
				}
				var lsName = 'masonry:layout:' + pcatId;
					var saved = JSON.parse(localStorage.getItem(lsName));
					if (saved) {
						for (var cid in saved) {
							if (saved.hasOwnProperty(cid)) {
								var category = saved[cid];

								$('.category-item[data-cid="' + cid + '"]').css({
									left: category.left,
									top: category.top,
									position: 'absolute'
								});
							}
						}
					}

					masonry.on('layoutComplete', function () {
						var saved = {};
						$ccats.each(function () {
							var $this = $(this);

							saved[$this.attr('data-cid')] = {
								left: $this.css('left'),
								top: $this.css('top')
							};
						});

						localStorage.setItem(lsName, JSON.stringify(saved));
					});


			}
		}

		function resize(fixed) {
			fixed = parseInt(fixed, 10);

			var container = fixed ? $('.container-fluid') : $('.container');
			container.toggleClass('container-fluid', fixed !== 1).toggleClass('container', fixed === 1);
			localStorage.setItem('fixed', fixed);
		}

		resize(fixed);

		$(window).on('action:ajaxify.end', function (ev, data) {
			var url = data.url;

			if (!/^admin\//.test(data.url) && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				doMasonry();
				if ($('.home').length) {
					$('.category-header .badge i').tooltip();
				}
			}
		});

		if (!$('.admin').length) {
			setupResizer();
		}

		$(window).on('action:posts.loaded', function () {
			doMasonry();
		});

		function setupResizer() {
			var div = $('<div class="overlay-container"><div class="panel resizer pointer"><div class="panel-body"><i class="fa fa-arrows-h fa-2x"></i></div></div></div>');

			div.css({
				position: 'fixed',
				bottom: '20px',
				right: '20px'
			}).hide().appendTo(document.body);

			$(window).on('mousemove', function (ev) {
				if (ev.clientX > $(window).width() - 150 && ev.clientY > $(window).height() - 150) {
					div.fadeIn();
				} else {
					div.stop(true, true).fadeOut();
				}
			});

			div.find('.resizer').on('click', function () {
				fixed = parseInt(fixed, 10) === 1 ? 0 : 1;
				resize(fixed);
				doMasonry();
			});
		}
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
	(function () {
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

		$(document).ready(function () {
			doSlick();
		});
		$(window).on('action:ajaxify.end', function (ev, data) {
			doSlick();
		});

	}());
});