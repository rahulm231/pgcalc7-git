jQuery(window).bind({
	'load': function() {
		setupExpandablePage();
	},
	'resize': function() {
		setupExpandablePage();
	}
});


function setupExpandablePage() {
	var $ = jQuery,
			version;
	// do not  trigger resizing if browser is IE 9 or below
	if(version = navigator.appVersion.match(/MSIE (\d).\d/)) {
		if(parseInt(version[1]) == 7 || parseInt(version[1]) == 8) {
			sizeChange('content_expand', 960);
			return;
		}
	}
	
	// Parse browser width.
    var width = $(document).width();
	if (width >= 1200) {
		if(window.ADAPT_STATE == 'expanded') return;
		// set the state on the window
		window.ADAPT_STATE = 'expanded';
		sizeChange('content_expand', width);	
	}
	else {
		if(window.ADAPT_STATE == 'collapsed') return;
		// set the state on the window
		window.ADAPT_STATE = 'collapsed';
		sizeChange('content_collapse', width);
	}
}

function sizeChange(change, width) {
	var $ = jQuery;
	
	$(document).trigger(change);
	$(document).trigger('accordian_recalculate', width);
	$(document).trigger('slider_recalculate', width);
	$(document).trigger('calendar_resize', width);
}

function recalculate_margins(elements, columns) {
	var $ = jQuery;
	// ensure columns is an integer
	var columns = (columns == parseInt(columns)) ? columns : false;
	if (!columns) return false;

	// iterate through elements, reassigning layout classes
	var col = 0;
	
	// remove any clear divs before calculation
	elements.filter('.clear').remove();

	// adjust alphas and omegas
	elements.removeClass('alpha omega');

	elements.filter(':not(.clear)').each(function() {
		// apply the alpha class to the first element in each row
		if (col == 0 || (col / columns) == parseInt(col / columns)) {
			// console.log('adding alpha, col: '+col, $(this).attr('class'));
			$(this).addClass('alpha');
		}
		
		// apply the omega class to the last element in each row
		if ((col + 1) / columns == parseInt((col + 1) / columns)) {
			$(this).addClass('omega');
		} 
		col += 1;
	});
	
	// add clear divs
	elements.filter('.omega').after($('<div class="clear">&nbsp;</div>'));
};
