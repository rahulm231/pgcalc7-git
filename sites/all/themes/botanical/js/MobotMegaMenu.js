(function ($, Drupal, window, document, undefined) {

	Drupal.behaviors.botanical = {
		attach: function(context, settings) { 
			/* Main Menu DropDown */

    $('ul.lvl0 li').children('.sub-outer').hide();

    function makeTall() {
        $(this).children('.sub-outer').slideDown(200);
        $(this).children('a').toggleClass('active');
        $(this).children('span').toggleClass('active');

    }
    function makeShort() {

        $(this).children('.sub-outer').hide();
        $(this).children('a').toggleClass('active');
        $(this).children('span').toggleClass('active');
    }
    var config1 = {
        over: makeTall, // function = onMouseOver callback (REQUIRED)    
        timeout: 500, // number = milliseconds delay before onMouseOut    
        out: makeShort // function = onMouseOut callback (REQUIRED)    
    };
    $('ul.lvl0 li').hoverIntent(config1);


    /* 4th Level DropDown */

    function showFour() {
        $(this).children('.lvl3').slideDown(200);


    }

    function hideFour() {

        $(this).children('.lvl3').slideUp(200);

    }
    var config2 = {
        over: showFour, // function = onMouseOver callback (REQUIRED)    
        timeout: 0, // number = milliseconds delay before onMouseOut    
        out: hideFour // function = onMouseOut callback (REQUIRED)    
    };
    $('ul.lvl2 li').hoverIntent(config2);
    
    // Newsletter submit
	$("#PageFooterNewsletter .submit-button").click(function(){
		var email = $("#PageFooterNewsletter .text-input").val();
		window.location.href = "https://app.e2ma.net/app2/audience/signup/1827964/1782331/?EmailAddress="+email;
	});
	$("#PageFooterNewsletter .text-input").keypress(function (e) {
        if (e.keyCode === 13) {
          var email = $(this).val();
		  window.location.href = "https://app.e2ma.net/app2/audience/signup/1827964/1782331/?EmailAddress="+email;
        }
    });
    
    // Search form submit
    $("#PageHeaderSearch #dnn_CustomSearch_btnSearch").click(function(){
		var search = $("#PageHeaderSearch #dnn_CustomSearch_txtQuery").val();
		window.location.href = "https://cse.google.com/cse?cx=015816930756675652018:7gxyi5crvvu&q="+search+"&sa=Search&sitesearch=&width=800#gsc.tab=0&gsc.q="+search+"&gsc.page=1";
	});
	$("#PageHeaderSearch #dnn_CustomSearch_txtQuery").keypress(function (e) {
        if (e.keyCode === 13) {
          var search = $(this).val();
		  window.location.href = "https://cse.google.com/cse?cx=015816930756675652018:7gxyi5crvvu&q="+search+"&sa=Search&sitesearch=&width=800#gsc.tab=0&gsc.q="+search+"&gsc.page=1";
        }
    });
    
    // 

	}
	}
	
	

})(jQuery, Drupal, this, this.document);