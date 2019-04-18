jQuery(document).ready(function ($) {

    $("#iconMenu").on("click", function() {
            if($("#menu1").css("display") != "none") {
                $("#menu1").slideUp();
            }
            else {
                $("#menu1").slideDown();
            }
        
            if($("#menu2").css("display") != "none") {
                $("#menu2").slideUp();
                
                $("#iconLinks").css("-webkit-transform","rotate(0deg)");
                $("#iconLinks").css("-moz-transform","rotate(0deg)");
                $("#iconLinks").css("-o-transform","rotate(0deg)");
                $("#iconLinks").css("-ms-transform","rotate(0deg)");
                $("#iconLinks").css("transform","rotate(0deg)");
            }
            if($("#menu3").css("display") != "none") {
                $("#menu3").slideUp();
            }
    });
    
    $("#iconLinks").on("click", function() {
            if($("#menu2").css("display") != "none") {
                $("#menu2").slideUp();
                $("#iconLinks").css("-webkit-transform","rotate(0deg)");
                $("#iconLinks").css("-moz-transform","rotate(0deg)");
                $("#iconLinks").css("-o-transform","rotate(0deg)");
                $("#iconLinks").css("-ms-transform","rotate(0deg)");
                $("#iconLinks").css("transform","rotate(0deg)");
            }
            else {
                $("#menu2").slideDown();
                $("#iconLinks").css("-webkit-transform","rotate(180deg)");
                $("#iconLinks").css("-moz-transform","rotate(180deg)");
                $("#iconLinks").css("-o-transform","rotate(180deg)");
                $("#iconLinks").css("-ms-transform","rotate(180deg)");
                $("#iconLinks").css("transform","rotate(180deg)");
            }
        
            if($("#menu1").css("display") != "none") {
                $("#menu1").slideUp();
            }
            if($("#menu3").css("display") != "none") {
                $("#menu3").slideUp();
            }
    });
    $("#iconSearch").on("click", function() {
            if($("#menu3").css("display") != "none") {
                $("#menu3").slideUp();
            }
            else {
                $("#menu3").slideDown();
            }
        
            if($("#menu1").css("display") != "none") {
                $("#menu1").slideUp();
            }
            if($("#menu2").css("display") != "none") {
                $("#menu2").slideUp();
                
                $("#iconLinks").css("-webkit-transform","rotate(0deg)");
                $("#iconLinks").css("-moz-transform","rotate(0deg)");
                $("#iconLinks").css("-o-transform","rotate(0deg)");
                $("#iconLinks").css("-ms-transform","rotate(0deg)");
                $("#iconLinks").css("transform","rotate(0deg)");
            }
    });
    
    $("#iconSub").on("click", function() {
        if($("#leftMenu li").length > 0) {
            if($("#dropdownSub").css("display") == "none") {
                $("#dropdownSub").slideDown();
                $("#iconSub").css("-webkit-transform","rotate(180deg)");
                $("#iconSub").css("-moz-transform","rotate(180deg)");
                $("#iconSub").css("-o-transform","rotate(180deg)");
                $("#iconSub").css("-ms-transform","rotate(180deg)");
                $("#iconSub").css("transform","rotate(180deg)");
            }
            else {
                $("#dropdownSub").slideUp();
                $("#iconSub").css("-webkit-transform","rotate(0deg)");
                $("#iconSub").css("-moz-transform","rotate(0deg)");
                $("#iconSub").css("-o-transform","rotate(0deg)");
                $("#iconSub").css("-ms-transform","rotate(0deg)");
                $("#iconSub").css("transform","rotate(0deg)");
            }
        }
    });
    
    if($("#leftMenu li").length == 0) {
        $("#iconSub").hide();
    }
    
//    if($(".standardtext").height() < 800) {
//        var increaseFactor = ($(".standardtext").height() * 3);
//        var increaseFactor = ($(".standardtext").height() * 3);
//        $("#footer").css("marginTop","200");
//        $("#footer").css("marginTop",increaseFactor);
//    }
    
    
       
//    var inHeight = $(".standardtext").height();
//    
//    alert(inHeight);
//    
//    if((inHeight < 800) && (inHeight > 600)) {
//        $("#footer").css("marginTop","200");        
//    }
    
    
    
    
//    if($(".standardtext").height() < 600 && $(".standardtext").height() > 400) {
//        $("#footer").css("marginTop","400");        
//    }
//    if($(".standardtext").height() < 400 && $(".standardtext").height() > 200) {
//        $("#footer").css("marginTop","600");        
//    }
//    if($(".standardtext").height() < 200) {
//        $("#footer").css("marginTop","800");        
//    }
    
});