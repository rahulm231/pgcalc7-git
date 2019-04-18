var deviceAgent = navigator.userAgent.toLowerCase();
//this variable is set to null if the device is not iphone, ipod or ipad
var isiOS = deviceAgent.match(/(iphone|ipod|ipad)/);	
if(oldJquery){
	var $gi_jq = jQuery.noConflict(true);
}
else{
	var $gi_jq = jQuery;
}
$gi_jq(document).ready(function() {	
	if(!isiOS){				
		var dWidth = 980;
		var dHeight = 610;
		var screenHeight = $gi_jq(window).height();		
		var minScreenHeight = 720;
		var giDomain = "web.giftillustrator.com";
		var maxZindex = 2147483647;
		var maxZMinusOne = 2147483647 - 1;
		var pullDown = "<div class='pull down'><div></div></div>";
		$gi_jq('a.lightbox').each(function(){
			var isGI = $gi_jq(this).attr("href").search(giDomain) > -1;
			if(isGI){
				$gi_jq(this).click(function(){$gi_jq(document).scrollTop(0);});
				$gi_jq(this).fancybox({
					'margin'                : 0,
					'padding'                : 0,
					'speedIn'                : 500,
					'speedOut'            : 500,
					'titlePosition'    : 'over',
					'transitionIn'    : 'fade',
					'transitionOut'    : 'fade',
					'type'                    : 'iframe',
					'hideOnContentClick':false,
					'width' : dWidth,
					'height' : dHeight,
					'scrolling-y':'yes',
					"onComplete" : function() {
						//set fancybox to the highest z-index
						$gi_jq("#fancybox-overlay").css("zIndex",maxZMinusOne);
						$gi_jq("#fancybox-wrap").css("zIndex",maxZindex);
						if($gi_jq(".pull").length == 0){					
							$gi_jq(pullDown).appendTo("#fancybox-wrap");
							if(screenHeight < minScreenHeight){
								$gi_jq(".pull").hide();
							}
						}
					}
				});
			}
		});
		//This function is to be included if you are calling the home page
		$gi_jq(".home-lightbox").each(function(){
			var isGI = $gi_jq(this).attr("href").search(giDomain) > -1;
			if(isGI){
				$gi_jq(this).click(function(){$gi_jq(document).scrollTop(0);});			
				$gi_jq(this).fancybox({
					'margin'                : 0,
					'padding'                : 0,
					'speedIn'                : 500,
					'speedOut'            : 500,
					'titlePosition'    : 'over',
					'transitionIn'    : 'fade',
					'transitionOut'    : 'fade',
					'type'                    : 'iframe',
					'width' : dWidth,
					'height' : dHeight,
					'scrolling': 'auto',
					"onComplete" : function() {
						//set fancybox to the highest z-index
						$gi_jq("#fancybox-overlay").css("zIndex",maxZMinusOne);
						$gi_jq("#fancybox-wrap").css("zIndex",maxZindex);										
						if($gi_jq(".pull").length == 0){					
							$gi_jq(pullDown).appendTo("#fancybox-wrap");	
							if(screenHeight < minScreenHeight){							
								$gi_jq(".pull").hide();
							}						
						}
					}
				});
			}
		});
		//This function is to be included if you are calling the secondary page
		$gi_jq(".secondary-lightbox").each(function(){
			var isGI = $gi_jq(this).attr("href").search(giDomain) > -1;
			if(isGI){
				$gi_jq(this).click(function(){$gi_jq(document).scrollTop(0);});
				$gi_jq(this).fancybox({
					'margin'                : 0,
					'padding'                : 0,
					'speedIn'                : 500,
					'speedOut'            : 500,
					'titlePosition'    : 'over',
					'transitionIn'    : 'fade',
					'transitionOut'    : 'fade',
					'type'                    : 'iframe',
					'width' : dWidth,
					'height' : dHeight,                    
					'scrolling': 'auto',
					"onComplete" : function() {
						//set fancybox to the highest z-index
						$gi_jq("#fancybox-overlay").css("zIndex",maxZMinusOne);
						$gi_jq("#fancybox-wrap").css("zIndex",maxZindex);
						if($gi_jq(".pull").length == 0){					
							$gi_jq(pullDown).appendTo("#fancybox-wrap");
							if(screenHeight < minScreenHeight){
								$gi_jq(".pull").hide();
							}
						}
					}
				});
			}
		});
		$gi_jq(".down").live("click", function(){					
			$gi_jq("#fancybox-content").css("height",screenHeight-100+"px");
			$gi_jq(this).removeClass("down").addClass("up");
		});
		$gi_jq(".up").live("click", function(){						
			$gi_jq("#fancybox-content").css("height",dHeight+"px");
			$gi_jq(this).removeClass("up").addClass("down");
		});
		setInterval(function () {
			if ($gi_jq(window).height() !== screenHeight) {				
				screenHeight = $gi_jq(window).height();
				$gi_jq(window).trigger('resolutionchange');
			}					
		}, 50);
		$gi_jq(window).bind('resolutionchange',function(){
			$gi_jq("#fancybox-content").css("height",dHeight+"px");
			if($gi_jq(window).height() <= minScreenHeight){				
				$gi_jq(".pull").hide();
			}
			else{				
				$gi_jq(".pull").show();
				if(!$gi_jq(".pull").hasClass("down")){
					$gi_jq(".pull").addClass("down").removeClass("up");;					
				}
			}
		});		
	} else {
		$gi_jq(".lightbox, .home-lightbox, .secondary-lightbox").attr("target","_blank").unbind("click.fb");
        }   
});