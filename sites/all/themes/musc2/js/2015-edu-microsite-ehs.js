// JavaScript Document
//alt analytics pink house



$(document).ready(function() {
	
	//set up accordions
	$("p .expandable").hide();
	$("div.expandable").hide();
    $("h3 .expandable").click(function() {
		var index = $(".expandable").index(this);
		$(".expandable:eq("+index+")").toggleClass("reveal");
		var mate = index + 1;
		$(".expandable:eq("+mate+")").slideToggle();
	});
});


////click a directory filter, and hide them
function filterSelection(show) {
	var chosen = show;
	$(".directory").hide();	
	$("."+chosen).show();
	
	$(".directory_sort a").removeClass("directory_heading");
	$("#"+chosen).addClass("directory_heading");
}
//show all of a class we were hiding
function showSelection(show) {
	var hiddenClass = show;
	$("."+hiddenClass).show();
	$(".directory_sort a").removeClass("directory_heading");
	$("#show_all").addClass("directory_heading");
}