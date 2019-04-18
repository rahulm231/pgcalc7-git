// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$('.col-height').matchHeight();

$(window).load(function() {
	Pizza.init('#stats-chart', {
		data: [68.62, 15.95, 15.43],
		donut: false, // enable donut chart
		donut_inner_ratio: 0.4,   // between 0 and 1
		percent_offset: 35, // relative to radius
		stroke_color: '#333',
		stroke_width: 0,
		show_percent: true, // show or hide the percentage on the chart.
		animation_speed: 500,
		animation_type: 'elastic' // options: backin, backout, bounce, easein, easeinout, easeout, linear
	});
});

$(document).ready(function() {
    $.timeliner({
    	fontOpen: '1.2em',
    	fontClosed: '1em'
    });
});