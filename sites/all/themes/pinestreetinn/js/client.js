// JavaScript Document


$(document).ready(function(){
  
/*
  	$("#txt1").slideUp("slow");
	$("#txt2").slideUp("slow");
	$("#txt3").slideUp("slow");
*/
    
    $("#jump1").click(function () {
      if ($("#txt1").is(":hidden")) {
        $("#txt1").slideDown("medium");
      } else {
        //$("#txt1").slideUp("slow");
      }
    });
	
	$("#jump2").click(function () {
      if ($("#txt2").is(":hidden")) {
        $("#txt2").slideDown("medium");
      } else {
        //$("#txt2").slideUp("slow");
        //$("#txt2").fadeOut("slow");
      }
    });
	
	$("#jump3").click(function () {
      if ($("#txt3").is(":hidden")) {
        $("#txt3").slideDown("medium");
      } else {
        //$("#txt3").slideUp("slow");
      }
    });



	$('#headerMenuBtn').click(function() {
	  $('#mobileMenu').slideToggle('fast', function() {
	  });
	});

  });
  

	




function clearemail()  {
	document.icpsignup.fields_email.value="";	
}

function unhide(divID) {
	closeall();
	
  var item = document.getElementById(divID);
  if (item) {
    item.className=(item.className=='sponsors_hidden')?'sponsors_show':'sponsors_hidden';
  }
}

function closeall() {
  var item = document.getElementById("1");
  if (item) {item.className=(item.className=='sponsors_hidden')?'sponsors_show':'sponsors_hidden';}
}

