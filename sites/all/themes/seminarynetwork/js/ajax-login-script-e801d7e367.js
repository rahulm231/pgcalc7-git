jQuery(function(a){a("form.login").on("submit",function(t){var e=a(this),n=a(this).parents(".footer-form");e.find("p.status").show().text(ajax_login_object.loadingmessage),a.ajax({type:"POST",dataType:"json",url:ajax_login_object.ajaxurl,data:{action:"ajaxlogin",username:e.find("#username").val(),password:e.find("#password").val(),security:e.find("#security").val()},success:function(a){e.find("p.status").html(a.message),!0===a.loggedin&&(n.length?document.location.href=ajax_login_object.redirecturl:window.location.reload())}}),t.preventDefault()})});