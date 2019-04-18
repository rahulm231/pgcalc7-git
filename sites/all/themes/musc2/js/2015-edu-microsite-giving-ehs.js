// JavaScript Document

$(document).ready(function() {
	//set up the donation smart selection
	//check if area is set on the page
	var area_cookie = getCookie("const_area");
		console.log("cookie: " + area_cookie);
		
	if(typeof(area) != "undefined" && area !== null) {
		console.log("variable: " +area);
			$("#"+area).prop('selected',true);
			updateForm();
	} else {
		//check if Constituent Area (const_area) cookie exists
		var area_cookie = getCookie("const_area");
		console.log("cookie: " + area_cookie);
		if(area_cookie != "") {
			$("#"+area_cookie).prop('selected',true);
			updateForm();
		} else {
			console.log("no cookie");
		}
	}
	

});

function updateForm() {
	//gets the selected value and changes the URL of the form's action
	var constituent_area = $(".area_select").val();
	var selection_id = $(".area_select").children(":selected").attr("id");
	if(selection_id === "other") {
		window.open(constituent_area);
	} else {
		document.development_donation_general.action=constituent_area;
	}
}

// find the constituent area cookie 
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
