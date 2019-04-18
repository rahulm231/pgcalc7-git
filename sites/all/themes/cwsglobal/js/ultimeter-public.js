(function( $ ) {
	'use strict';

	//originally from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
	function formatCurrency(n, c, d, t) {
		"use strict";

		var s, i, j;

		c = isNaN(c = Math.abs(c)) ? 2 : c;
		d = d === undefined ? "." : d;
		t = t === undefined ? "," : t;

		s = n < 0 ? "-" : "";
		i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
		j = (j = i.length) > 3 ? j % 3 : 0;

		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}

	/**
	* Do funky stuff to our meters
	*
	*/
	function upgm_funky() {
		"use strict";

		$( ".upgm_meter" ).each( function(i, obj) {

			var $thermo = $(this),
	        $progress = $(".upgm_meter_progress", $thermo),
	        $goal = $(".upgm_meter_goal", $thermo);

			var $symbol = $(this).attr("data-currency");

			var goalAmount = parseFloat( $goal.text() );
			var progressAmount = parseFloat( $progress.text() );
			var percentageAmount =  Math.min( Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

			// If currency, format that currency and return
			$goal.find(".upgm_currency").text($symbol + formatCurrency( goalAmount ) );
			$progress.find(".upgm_currency").text($symbol + formatCurrency( progressAmount ) );

			// Also format currency where the total amount is outside meter outer
			$(this).find(".upgm_meter_total_amount.upgm_currency").text($symbol + formatCurrency( goalAmount ) );

			// Animate the progress amount, taking into account orientation
			$(this).find(".upgm_meter_amount").hide();
			if ( $(this).hasClass( "upgm_height") ) {
				$(this).find(".upgm_meter_progress").animate({
					"height": percentageAmount + "%"
				}, 1200, function(){
					// $(this).find(".upgm_meter_amount").fadeIn(500);
				});
			// $(this).find(".upgm_meter_amount").fadeIn(500);
			} else if ( $(this).hasClass( "upgm_width") ) {
				$(this).find(".upgm_meter_progress").animate({
					"width": percentageAmount + "%"
				}, 1200, function(){
					// $(".upgm_meter_amount").fadeIn(500);
				});
			} else if ( $(this).hasClass( "upgm_circle") ) {
				var $progress = $(this).attr("data-progress");
				var $goal = $(this).attr("data-goal");
				var goalAmount = parseFloat( $goal );
				var progressAmount = parseFloat( $progress );
				var percentageAmount =  Math.ceil( Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

				//Now push percentageAmount back to DOM to start the radial meter
				$(this).attr("data-percentage", percentageAmount);

				// If currency, format that currency and return
				$(this).find(".upgm_radial_currency").text($symbol + formatCurrency( progressAmount ) );
			}
			$(this).find(".upgm_meter_amount").fadeIn(500);


		});
	}

	$(document).ready(function(){
		upgm_funky();
	})

})( jQuery );
