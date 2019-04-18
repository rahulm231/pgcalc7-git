if (typeof jQuery == 'undefined'){
	document.write(unescape("%3Cscript src='https://web.giftillustrator.com/CalculatorTest/Production/scripts/jquery.js' type='text/javascript'%3E%3C/script%3E"));
}
else{
	if(isNaN($.fn.jquery.split('.')[1]) || $.fn.jquery.split('.')[1] <= 3){   /*Altered by James Y on 11-24-2014 per Ratheesh's request. */  
	
	/*if(isNaN($.fn.jquery.split('.')[1]) || ($.fn.jquery.split('.')[1] <= 3 && $.fn.jquery.split('.')[0] <= 1)){*/
		var oldJquery = "needs new jQuery";
		document.write(unescape("%3Cscript src='https://web.giftillustrator.com/CalculatorTest/Production/scripts/jquery.js' type='text/javascript'%3E%3C/script%3E"));								
	}			
}