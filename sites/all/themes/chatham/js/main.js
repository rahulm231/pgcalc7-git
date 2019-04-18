$(document).ready(function() { 

		//main navigation for mobile
		$("#menu-link").click(function(){ToggleMenu();});
		
		function ToggleMenu(){
			if($("#Menu").length > 0) {
				$("#menu-link").html("<img src='https://www.chatham.edu/_images/icon-menu-close.png' alt='Close Menu' id='Close-Menu' />");		
				$("#main-nav").slideToggle();	
			} else {	
				$("#menu-link").html("<img src='https://www.chatham.edu/_images/icon-menu.png' alt='Menu' id='Menu' />");						
				$("#main-nav").slideToggle(500);
			}
		}
		
		// Toggle the selected menu's class and expand or collapse the menu
		$("nav.collapsible > li > a").not(".noexpand").click(function() {
				$(this).toggleClass("expanded").toggleClass("collapsed").find("+ ul").slideToggle("medium");
		});			
		
		// Toggle the selected menu's class and expand or collapse the menu
		$("nav .collapsible > li > h2").click(function() {
				$(this).toggleClass("expanded").toggleClass("collapsed").find("+ ul").slideToggle("medium");
		});		

		//mobile sidemenu functionality
			$(".sidemenu-tab").click(function(){
					if($("#breadcrumb").css("display") == "none") {
						$("#sidemenu-main").slideToggle();				
						$("#sidemenu section").slideToggle();					
						return false;
				}
			});
	
	  //show root navigation link
		var maintab = $("h1.sidemenu-tab");
		var mainsection = maintab.next();
		mainsection.prepend("<h2 class='home'>"+maintab.html()+"</h2>");
			
			
		//expandible/collapsible lists
	  $(".expandlist dd").hide();
	  $(".expandlist dt.show+dd").css("display","block");
		var div = window.location.hash;
		if(div !== ''){$(".expandlist").children(div).next().css("display","block");}
	  $(".expandlist dt").click(function(){ $(this).next().slideToggle(); });
		
		
		//set required field check for safari. Added 4/19/2016 HM
		//add email validation 9/13/2016 HM
		//add phone validation 10/06/2016 HM
		$("form").submit(function(e) {
			var ref = $(this).find("[required]");
			$(ref).each(function(){
					if ( $(this).val() === '' ) {
							alert("Required field should not be blank.");
							$(this).focus();
							e.preventDefault();
							return false;
					}
			}); 
			
			validEmail = true;
			$(this).find("input[type=email]").each(function(){
				vEmail = $(this).val().replace(" ","");
				if($(this).prop('required') || vEmail != "") {
					if(!IsEmail(vEmail)) {
						alert("Enter a valid email address");
						$(this).focus()
						validEmail = false
					}
				} 
			});		
			
			validPhone = true;
			$(this).find("input[type=tel]").each(function(){
			var vPhone = $(this).val().replace(/\ /g,"");
			vPhone = vPhone.replace(/\(/g,"");
			vPhone = vPhone.replace(/\)/g,"");
			vPhone = vPhone.replace(/\-/g,"");
			vPhone = vPhone.replace(/\./g,"");
			vPhone = vPhone.replace(/\+/g,"");
			if($(this).prop('required') || vPhone != "") {
				if(!IsPhone(vPhone)) {
					alert("Enter a valid Phone Number");
					$(this).focus()
					validPhone = false
				}
			} 
		});
		
		if(!validEmail || !validPhone) return false;
		
		function IsEmail(email) {
			var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			return regex.test(email);
		}
		
		function IsPhone(phone) {
			//var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
			var regex = /^\d{10,16}$/;
			return regex.test(phone);
		}
		
		
		
	});
		
 
});	