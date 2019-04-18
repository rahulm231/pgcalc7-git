(function ($, document, window) {

	var $form, $input, $selectbox, $parentDiv, $spinner;

	$(document).ready(function onReady() {
		$('.program-finder-interests__form').on('submit', function onFormSubmit(e) {
			e.preventDefault();

			if (!$form) {
				$form = $(this);
				$input = $form.find(':input');
				$selectbox = $form.find('.selectbox');
				$parentDiv = $form.parent();
				$spinner = $form.find('.sk-spinner');

				$parentDiv.nextAll().remove();
			}

			data = $form.serialize();

			$spinner.removeClass('hide');
			$input.prop('disabled', true);
			$selectbox.addClass('disabled');

			$.get($form.attr('action'), data)
				.done(function done(res, status, xhr) {
					var html = ((res || {}).data || {}).html || null;

					if (html) {
						if ($form.next('.accordion').length) {
							if ($form.next('.accordion').find('.accordion').length) {
								$form.next('.accordion').find('.accordion').foundation('_destroy');
							}
							$form.next('.accordion').foundation('_destroy').remove();
						}

						$form.after(html);
						new Foundation.Accordion($form.next('.accordion'));
						new Foundation.Accordion($form.next('.accordion').find('.accordion'));
					}
				})
				.fail(function fail(xhr, status, error) {
				})
				.always(function always() {
					$spinner.addClass('hide');
					$input.prop('disabled', false);
					$selectbox.removeClass('disabled');
				})
			;
		});

		$('#program-finder-tabs').on('change.zf.tabs', function onChangeTabs(event, $target, $targetContent) {
			var $a = $target.children('a');
			if (!$a.length) {
				return;
			}

			var $form = $('form[data-tabs-panel="' + $a.attr('href').replace('#', '') + '"]');
			if (!$form.length) {
				return;
			}

			$form.siblings().addClass('hide');

			if ($form.data('showOnTabSwitch')) {
				$form.removeClass('hide');
			}
		});

		$('.post-type-archive-program').find('.letters-nav').parent().on('submit', function onLettersNavSubmit(e) {
			var $form = $(e.target);

			if (!$form.hasClass('letters-nav')) {
				return;
			}

			e.preventDefault();

			var $letters = $form.children('button')
				, $clickedButton = $(document.activeElement)
				, $filtersForm = $('.tabs-wrapper').find('.filters').not('.hide')
				, $input = $filtersForm.find('[name="ws_letter"]')
			;

			$letters.prop('disabled', true);

			if (!$input.length) {
				$input = $('<input type="hidden" name="ws_letter"/>');
				$filtersForm.append($input);
			}

			$input.val($clickedButton.val());
			$filtersForm.submit();
		});

		$('.post-type-archive-program').find('.filters').on('submit', function onFiltersSubmit(e) {
			e.preventDefault();

			var $form = $(this)
				, $inputs = $form.find(':input')
				, data = $form.serialize()
				, action = $form.attr('action')
				, panelId = $form.data('tabsPanel')
			;

			if (panelId && action && data) {
				var $panel = $('#' + panelId)
					, $spinner = $panel.find('.sk-spinner')
				;

				$inputs.prop('disabled', true);
				$spinner.removeClass('hide').nextAll().remove();

				$.get(action, data)
					.done(function done(res, status, xhr) {
						var html = ((res || {}).data || {}).html || null;
						if (html) {
							$spinner.after(html);
						}
					})
					.fail(function fail(xhr, status, error) {

					})
					.always(function always() {
						$spinner.addClass('hide');
						$inputs.prop('disabled', false);
					})
				;
			}
		});
	});

})(jQuery, document, window);
