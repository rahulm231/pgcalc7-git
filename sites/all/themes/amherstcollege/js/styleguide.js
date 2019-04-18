$(document).ready(function() {
	
	
	//Select2 menus
	$("#select2").select2({
	    minimumInputLength: 2,
	    placeholder: "Search for a name",
	    allowClear: true,
	});
	
	//Money Mask
	$('.money').mask('000,000,000,000,000.00', {reverse: true});
	
});


