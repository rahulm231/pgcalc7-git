(function ($){
 $(window).load(function(){
   var offset = $(".nav-wrap").offset().top;

   $(window).scroll(function(e){
     $el = $('.nav-wrap');
     if ($(this).scrollTop() > offset && $el.css('position') != 'fixed'){
     $('.nav-wrap').css({'position': 'fixed', 'top': '0px', 'left': '0', 'width': '100%', 'z-index': '1000'});
     }

     if ($(this).scrollTop() < offset && $el.css('position') == 'fixed')
     {
     $('.nav-wrap').css({'position': 'static', 'top': '0px'});
     }
     });

   $("#main-nav-open li.level_1").hover(function(){
     $(this).find("ul").css("display", "block");
     }, function(){
     $(this).find("ul").css("display", "none");
     });

 });

 $(document).ready(function() {
    var mobilenav = $('#block-pgc-misc-blocks-mobilenav .header-mobile');
    var title = $('.pg-page-header h1').text();
    mobilenav.append('<div class="title"><h2>' + title + '</h2></div>');
 });

}(jQuery));
