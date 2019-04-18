$(document).ready(function() {
	$('.SmartBoard_Table').fadeIn(1000, function() {
		$('.SmartBoard_Surround').css('width','100%');
		$('.SmartBoard_Surround').css('height','100%');
		$('.SmartBoard_Surround').css('opacity','0.7');
		$('.SmartBoard_Surround').css('background','#000');
		$('.SmartBoard_Surround').fadeIn(1000);
	}); 
	$('.SmartBoard_Surround, .SmartBoard_Table').live("click", function() {
		$('.SmartBoard_Surround, .SmartBoard_Table').fadeOut(500);
	});
});
