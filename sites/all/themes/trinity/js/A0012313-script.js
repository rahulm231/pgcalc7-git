jQuery(document).ready(function() {

    // set current link
    jQuery("#rightnav a").each(function(){
      var itempath = jQuery(this).attr("href");
         if (typeof itempath !== typeof undefined && itempath !== false) {
              var itempathParts = itempath.split( '/' );
              var lastitempathPart = itempathParts[itempathParts.length-1];
          }else{
            lastitempathPart = "NotHref";
          }
          var pathArray = window.location.pathname.split( '/' );
          var lastLocation = pathArray[pathArray.length-1];
        if(lastLocation == lastitempathPart)
          {
            jQuery(this).addClass("stl-selected");
        }
    });

    jQuery('.charitable-gift-annuities .stl-copyright p').before('<p>Minimum contribution for a charitable gift annuity is $10,000.<br>Currently not available in Alabama, Arkansas, California, Hawaii, North Dakota, Tennessee and Washington.</p>')
    jQuery( "#rightnav > li:nth-child(11) > a" ).addClass( "lightbox" );
    
    // Carousel
    //Sort random function
    function random(owlSelector) {
        owlSelector.children().sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).each(function () {
            $(this).appendTo(owlSelector);
        });
    }
    /*
    jQuery("#owl-demo").owlCarousel({
        transitionStyle: 'fade',
        nav: false,
        slideSpeed: 5000,
        paginationSpeed: 2000,
        autoPlay: true,
        singleItem: true,
        navigationText: [
      "<span class='icon-chevron-left icon-white'>Prev</span>",
      "<span class='icon-chevron-right icon-white'>Next</span>"
      ],
        beforeInit: function (elem) {
            //Parameter elem pointing to $("#owl-demo")
            random(elem);
        }
    });*/
});