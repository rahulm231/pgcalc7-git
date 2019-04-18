jQuery(function($){

	var loaded = false;
	
	$( document ).ready(function() {

		if (!loaded){
			loaded = true;
			$("#pgc-banner").append("<div class=\"header-mobile\" style=\"display:none\"><div class=\"meta\"><h3></h3></div><div class=\"control-container open\"><div class=\"control close-btn\"><span class=\"fa fa-times\"></span></div><div class=\"control open-btn\"><span class=\"fa fa-align-justify\"></span> </div></div></div>");

			var navMenu = $("ul#main-menu").html();
			var title = $("h2.title a").html();
			var menuHtml = "<div class=\"subnav-mobile-mask\"><ul>" + "<li class=\"mobile-title\">" + title + "</li>" + navMenu + "</ul></div>";			
			$("#pgc-banner").append(menuHtml);
	
			if ($(window).width() <= 767){
                		$("#pgc-banner .header-mobile").show();
                	}

                	$(window).resize(function(){
	                	if ($(window).width() > 767){
		                	$("#pgc-banner .header-mobile").hide();
		                	$("#pgc-banner .subnav-mobile-mask").hide();
	                	}
	                	else{
		                	$("#pgc-banner .header-mobile").show();
	                	}
                	});

                	$("#pgc-banner .open-btn").click(function(){
	                	$("#pgc-banner .subnav-mobile-mask").slideToggle();
                		$("#pgc-banner .open-btn").hide();
                		$("#pgc-banner .close-btn").show();
                	});

                	$("#pgc-banner .close-btn").click(function(){
                		$("#pgc-banner .subnav-mobile-mask").slideToggle();
	                	$("#pgc-banner .open-btn").show();
	                	$("#pgc-banner .close-btn").hide();
                	});

		}

		//even out footer nav columns so that they have equal widths
		$intColumns = $('.footerNav>ul#nav1>li').length;
		$fltPercent = 100/$intColumns;
		imod.log ('footer columns: '+$intColumns);
		imod.log ('width percent: '+$fltPercent);
		$('.footerNav>ul#nav1>li').css('width',$fltPercent+'%');
		
		//remove empty pagename
		$('#ContentPageName').each(function(){
			imod.log('PageName Length: '+$(this).html().length);
			if($(this).html().length==0)$(this).remove();
		});
		

		$('.expand').each(function() {
			if($(this).children('img').attr('src').toLowerCase().indexOf("expand.gif") >= 0)
			{
				$(this).html('<em class="fa fa-angle-double-down"></em>');
			}
			else
			{
				$(this).html('<em class="fa fa-angle-double-up"></em>');
			}
			var text = $(this).parent().attr('href');		text = text.replace('<SPAN class=expand><IMG src="/s/1022/images/expand.gif" border=0></SPAN>', '<span class=expand><em class="fa fa-angle-double-down"></em></span>');
			text = text.replace('<SPAN class=expand><IMG src="/s/1022/images/collapse.gif" border=0></SPAN>', '<span class=expand><em class="fa fa-angle-double-up"></em></span>');
			$(this).parent().attr('href',text);
		});
	});

});
