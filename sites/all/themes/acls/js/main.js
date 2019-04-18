var carouselItemCount = 0;
    carouselPos = jQuery('#filmStripScroller li.selected').index() + 1,
		carouselOnCLick = false;
function mycarousel_initCallback(carousel) {
    jQuery('#filmStripScroller a').bind('click', function(a) {
        carouselOnCLick = true;
        carouselPos = jQuery(this).text();
        if(carouselOnCLick == true) {
          carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
          jQuery('.filmStripHeaderFade .filmTeaser, #filmStripScroller li a').removeClass('selected');
          jQuery(this).addClass('selected');
          jQuery('.filmStripHeaderFade').find('#film'+jQuery(this).text()).addClass('selected');
        }
        a.preventDefault();
    });

};
jQuery(document).ready(function ($) {
    $("ul.listTypeActions li").click(function () { var href = $(this).find("a").attr("href"); location.href = href; });
    $("ul.DownloadLinks li").click(function () { var href = $(this).find("a").attr("href"); location.href = href; });
    
    $('#ctl00_ctl00_txtSearch').keypress(function (e) {
        if (e.which == 13) {
            window.location.href = "/search.aspx?search=" + $('#ctl00_ctl00_txtSearch').val();
            return false;
        }
    });

    //$("div.topBar").sticky({ topSpacing: 0 });
    //$("#NavMenuWrapper").sticky({ topSpacing: 42 });

    var hasCarousel = false;
    if (jQuery('body').hasClass('carousel')) {
        hasCarousel = true;
    }

    if (hasCarousel == true) {
        var filmStripCurrent = 1;
        filmStripWidth = 850;
        filmStripleft = jQuery('.filmStripHeader .filmStripHeaderFade').offset().left - filmStripWidth,
        filmStripCount = jQuery('.filmStripHeader .filmStripSlider li').length,
        filmStripTotalWidth = filmStripWidth * filmStripCount,
        filmStripScroll = '',
        filmStripTeaser = '',
        mainPageWrapperOffsetLeft = jQuery('#PageWrapper').offset().left;
        if (mainPageWrapperOffsetLeft > 0) {
            filmStripleft = (jQuery('.filmStripHeader .filmStripHeaderFade').offset().left - mainPageWrapperOffsetLeft) - filmStripWidth;
            jQuery('.filmStripHeader #filmStripSliderWrapper').css({ 'left': filmStripleft, 'width': filmStripTotalWidth });
        } else {
            jQuery('.filmStripHeader #filmStripSliderWrapper').css({ 'left': filmStripleft, 'width': filmStripTotalWidth });
        }
        carouselItemCount = filmStripCount;
        jQuery(window).resize(function () {
            var filmStripCurrent = 1;
            filmStripWidth = 850;
            filmStripleft = jQuery('.filmStripHeader .filmStripHeaderFade').offset().left - filmStripWidth,
        filmStripCount = jQuery('.filmStripHeader .filmStripSlider li').length,
        filmStripTotalWidth = filmStripWidth * filmStripCount,
        filmStripScroll = '',
        filmStripTeaser = '',
        mainPageWrapperOffsetLeft = jQuery('#PageWrapper').offset().left;
            if (mainPageWrapperOffsetLeft > 0) {
                filmStripleft = (jQuery('.filmStripHeader .filmStripHeaderFade').offset().left - mainPageWrapperOffsetLeft) - filmStripWidth;
                jQuery('.filmStripHeader #filmStripSliderWrapper').css({ 'left': filmStripleft, 'width': filmStripTotalWidth });
            } else {
                jQuery('.filmStripHeader #filmStripSliderWrapper').css({ 'left': filmStripleft, 'width': filmStripTotalWidth });
            }
        });

        jQuery("#filmStripSliderWrapper .filmStripSlider").carouFredSel({
            onCreate: function () {

            },
            height: 320,
            items: {
                visible: 3,
                width: 850,
                height: 320,
                minimum: 1
            },
            auto: {
                play: true,
                delay: 0,
                items: 1,
                duration: 1000,
                timeoutDuration: 8000,
                onAfter: function () {
                    jQuery('div.filmTeaserWrapper').empty().append(jQuery('#filmStripSliderWrapper .filmStripSlider li:eq(1) .filmTeaser').html());
                }
            },
            pagination: {
                container: '#filmStripScroller',
                anchorBuilder: function (nr, item) {
                    return '<li><a href="#' + nr + '"><span>' + nr + '</span></a></li>';
                },
                items: 1,
                onAfter: function () {
                    jQuery('div.filmTeaserWrapper').empty().append(jQuery('#filmStripSliderWrapper .filmStripSlider li:eq(1) .filmTeaser').html());

                }
            }

        });
        jQuery('div.filmTeaserWrapper').append(jQuery('#filmStripSliderWrapper .filmStripSlider li:nth-child(2) .filmTeaser').html());
        /*
        jQuery('.filmStripHeader .filmStripSlider li').each(function() {
        if(filmStripCurrent == carouselPos) {
        filmStripScroll = filmStripScroll + '<li><a class="selected" href="#film'+filmStripCurrent+'">'+filmStripCurrent+'</a></li>';
        filmStripTeaser = filmStripTeaser + '<div id="film'+ filmStripCurrent +'" class="filmTeaser selected">' + jQuery(this).find('.filmTeaser').html() + '</div>';
        } else {
        filmStripScroll = filmStripScroll + '<li><a href="#film'+filmStripCurrent+'">'+filmStripCurrent+'</a></li>';
        filmStripTeaser = filmStripTeaser + '<div id="film'+ filmStripCurrent +'" class="filmTeaser">' + jQuery(this).find('.filmTeaser').html() + '</div>'; 
        }
        filmStripCurrent ++;
        });
        jQuery(".filmStripHeaderFade").append('<div class="filmTeaserWrapper">' + filmStripTeaser + '</div><ul id="filmStripScroller">'+filmStripScroll+'</ul>');
        jQuery("#filmStripSliderWrapper").jcarousel({
        initCallback: mycarousel_initCallback,
        //auto: 6,
        scroll: 1,
        wrap: 'circular',
        animation: 'slow',
        start: carouselPos,
        itemVisibleInCallback: {
        onBeforeAnimation: function() {
        },
        onAfterAnimation: function(a,b,c) {
          
        if(carouselOnCLick == false) {
        carouselPos ++;
        if(carouselPos > carouselItemCount) {
        carouselPos = 1;
        }
        jQuery('.filmStripHeaderFade .filmTeaser, #filmStripScroller li a').removeClass('selected');
        jQuery('#filmStripScroller a[href="#film'+carouselPos+'"]').addClass('selected');
        jQuery('.filmStripHeaderFade').find('#film'+carouselPos+'').addClass('selected');  
        }
        carouselOnCLick = false;
        //console.log(carouselPos);
          
        }
          
        }
        });
        */
    } //End hasCarousel

    //Toggle SearchSHow/Hide and Adds Placeholder
    if ($.browser.msie) {
        var SearchBarVal = 'Search';
        jQuery('div.topBarSearch #ctl00_ctl00_txtSearch').val(SearchBarVal)
	.focus(function () {
	    jQuery(this).val('');
	})
	.blur(function () {
	    jQuery(this).val(SearchBarVal);
	});
}

    jQuery('div.topBarSearch .SearchToggle').click(function () {
        jQuery('div.topBarSearch #ctl00_ctl00_txtSearch, div.topBarSearch .SearchToggleClose').fadeToggle(function () {
            jQuery('div.topBarSearch #ctl00_ctl00_txtSearch').addClass('searchVisible');
        });
        jQuery(this).fadeToggle();
    });
    jQuery('div.topBarSearch .SearchToggleClose').click(function () {
        jQuery(this).fadeToggle();
        jQuery('div.topBarSearch #ctl00_ctl00_txtSearch').fadeToggle(function () {
            jQuery('div.topBarSearch #ctl00_ctl00_txtSearch').removeClass('searchVisible');
            jQuery('div.topBarSearch .SearchToggle').fadeToggle();
        });
    });


//    jQuery('div.topBarSearch .SearchToggle').click(function () {
//        jQuery('div.topBarSearch #ctl00_ctl00_txtSearch, div.topBarSearch .SearchToggleClose').fadeToggle();
//        jQuery(this).fadeToggle();
//    });
//    jQuery('div.topBarSearch .SearchToggleClose').click(function () {
//        jQuery('div.topBarSearch #ctl00_ctl00_txtSearch, div.topBarSearch .SearchToggle').fadeToggle();
//        jQuery(this).fadeToggle();
//    });

    // Implementation of Accodion Side Menu
    $(".sideBarAcc > li").each(function () {
        if (!$(this).hasClass('selected')) {
            $(this).find('ul.sideBarAccChild').addClass('hide').hide();
        }
    });
    //$(".sideBarAcc > li ul.sideBarAccChild").addClass('hide').hide();
    $(".sideBarAcc > li ul.sideBarAccChild").parents('li.menu-item').addClass('has-child-menu');
    $(".sideBarAcc > li > a").click(function (a) {
        var $this = $(this);
        var $li_parent = $(this).parents('li');
        if ($li_parent.find('ul').hasClass('sideBarAccChild')) {
            //a.preventDefault();
            if ($li_parent.find('ul').hasClass('hide')) {
                a.preventDefault();
                $(".sideBarAcc > li ul").each(function () {
                    if ($(this).hasClass('show')) {
                        $(this).slideUp('normal').removeClass('show').addClass('hide').parents('li').removeClass('selected');
                    }
                });

                $li_parent.find('ul').slideDown('normal', function () { window.location = $this.attr('href'); }).removeClass('hide').addClass('show');
                $li_parent.addClass('selected');
            } 
            //else if ($li_parent.find('ul').hasClass('show')) {
//                $(".sideBarAcc > li ul").each(function () {
//                    if ($(this).hasClass('show')) {
//                        $(this).slideUp('normal').removeClass('show').addClass('hide').parents('li').removeClass('selected');

//                    }
//                });
//                $li_parent.find('ul').slideUp('normal').removeClass('show').addClass('hide');
//                $li_parent.removeClass('selected');
//            }

        }

    });

    $('.TalksByPresidentContent').videoSlideToggle();
    if ($.fn.jScrollPane) {
        $('.latestTweetsContents').jScrollPane();
    }
});

(function( $ ) {
$.fn.videoSlideToggle = function() {
  var $main = $(this);
  $main.find('li a.videoLink').each(function() {
    $(this).click(function(a) {
      a.preventDefault();
      var $clicked = $(this);
        $main.find('li .embededVideo').each(function() {
		  if(!$clicked.hasClass('videoLinkSelected')) {
			  $clicked.parents('li').find('.embededVideo').slideDown(function() {
				$(this).addClass('embededVideoVisible');
				$clicked.addClass('videoLinkSelected');
			  });
		  }
          if($(this).hasClass('embededVideoVisible') && !$clicked.hasClass('videoLinkSelected')) {
            $(this).slideUp();
            $(this).removeClass('embededVideoVisible');
          }
        });
		if(!$clicked.hasClass('videoLinkSelected')) {
			$main.find('li a.videoLink').removeClass('videoLinkSelected');
		}
		
    });
  });
}
})( jQuery );




function XBrowser() { }

// detects Internet Explorer
XBrowser.isIE = document.all && window.ActiveXObject &&
    (navigator.userAgent.toLowerCase().indexOf('msie') > -1);

// Sets the 'class' of a DOM element

//useage: XBrowser.setClass(this,'myClass');
XBrowser.setClass = function setClass(element, val) {
    var attrName = (XBrowser.isIE ? 'className' : 'class');
    element.setAttribute(attrName, val);
}
//useage: XBrowser.getClass(this);
XBrowser.getClass = function getClass(element) {
    var attrName = (XBrowser.isIE ? 'className' : 'class');
    return element.getAttribute(attrName);
}

XBrowser.removeClass = function removeClass(element) {
    var attrName = (XBrowser.isIE ? 'className' : 'class');
    return element.removeAttribute(attrName);

}

function TabSwap(colIndex, element) {
    if (document.getElementById) {
        // Get a reference to the th tag element on the page
        var nameTH = document.getElementById('inv_thName');
        var yearTH = document.getElementById('inv_thDate');
        var nameImage = document.getElementById('inv_imgName');
        var yearImage = document.getElementById('inv_imgDate');

        if (element.id == "inv_thName") {
            XBrowser.setClass(element, 'Tab On');
            XBrowser.setClass(yearTH, 'Tab-End');
            var nameSrc = "";
            var yearSrc = "";
            if (nameImage.src && yearImage.src) {
                var lio = nameImage.src.lastIndexOf("/");
                nameSrc = nameImage.src.substr(lio + 1);
                nameSrcPre = nameImage.src.substr(0, lio + 1);
                lio = yearImage.src.lastIndexOf("/");
                yearSrc = yearImage.src.substr(lio + 1);
                yearSrcPre = yearImage.src.substr(0, lio + 1);
                if (nameSrc == "icon.arrow_right_blue.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_down.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
                else if (nameSrc == "icon.arrow_down.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_up.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, true);
                }
                else if (nameSrc == "icon.arrow_up.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_down.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
            }
        }
        else {
            XBrowser.setClass(element, 'Tab-End On');
            XBrowser.setClass(nameTH, 'Tab');
            var nameSrc = "";
            var yearSrc = "";
            if (nameImage.src && yearImage.src) {
                var lio = nameImage.src.lastIndexOf("/");
                nameSrc = nameImage.src.substr(lio + 1);
                nameSrcPre = nameImage.src.substr(0, lio + 1);
                lio = yearImage.src.lastIndexOf("/");
                yearSrc = yearImage.src.substr(lio + 1);
                yearSrcPre = yearImage.src.substr(0, lio + 1);
                if (yearSrc == "icon.arrow_right_blue.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_down.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
                else if (yearSrc == "icon.arrow_down.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_up.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, true);
                }
                else if (yearSrc == "icon.arrow_up.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_down.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
            }
        }
    }

}

function popUpWindow(url, hWind, nWidth, nHeight, nScroll, nResize) {
    var popupwin, cToolBar;
    cToolBar = 'toolbar=0,location=0,directories=0,status=' + nResize + ',menubar=0,scrollbars=' + nScroll + ',resizable=' + nResize + ',width=' + nWidth + ',height=' + nHeight;
    popupwin = window.open(url, hWind, cToolBar);
    return popupwin;
}

function TabSwap(colIndex, element) {
    if (document.getElementById) {
        // Get a reference to the th tag element on the page
        var nameTH = document.getElementById('inv_thName');
        var yearTH = document.getElementById('inv_thDate');
        var nameImage = document.getElementById('inv_imgName');
        var yearImage = document.getElementById('inv_imgDate');

        if (element.id == "inv_thName") {
            XBrowser.setClass(element, 'Tab On');
            XBrowser.setClass(yearTH, 'Tab-End');
            var nameSrc = "";
            var yearSrc = "";
            if (nameImage.src && yearImage.src) {
                var lio = nameImage.src.lastIndexOf("/");
                nameSrc = nameImage.src.substr(lio + 1);
                nameSrcPre = nameImage.src.substr(0, lio + 1);
                lio = yearImage.src.lastIndexOf("/");
                yearSrc = yearImage.src.substr(lio + 1);
                yearSrcPre = yearImage.src.substr(0, lio + 1);
                if (nameSrc == "icon.arrow_right_blue.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_down.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
                else if (nameSrc == "icon.arrow_down.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_up.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, true);
                }
                else if (nameSrc == "icon.arrow_up.gif") {
                    nameImage.src = nameSrcPre + "icon.arrow_down.gif";
                    yearImage.src = yearSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
            }
        }
        else {
            XBrowser.setClass(element, 'Tab-End On');
            XBrowser.setClass(nameTH, 'Tab');
            var nameSrc = "";
            var yearSrc = "";
            if (nameImage.src && yearImage.src) {
                var lio = nameImage.src.lastIndexOf("/");
                nameSrc = nameImage.src.substr(lio + 1);
                nameSrcPre = nameImage.src.substr(0, lio + 1);
                lio = yearImage.src.lastIndexOf("/");
                yearSrc = yearImage.src.substr(lio + 1);
                yearSrcPre = yearImage.src.substr(0, lio + 1);
                if (yearSrc == "icon.arrow_right_blue.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_down.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
                else if (yearSrc == "icon.arrow_down.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_up.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, true);
                }
                else if (yearSrc == "icon.arrow_up.gif") {
                    yearImage.src = yearSrcPre + "icon.arrow_down.gif";
                    nameImage.src = nameSrcPre + "icon.arrow_right_blue.gif";
                    Grid1.sort(colIndex, false);
                }
            }
        }
    }

}

function inv_switchColor(position, dir) {
    return;

    //first get the DOM position of the arrow
    if (document.getElementById) {
        // Get a reference to the li tag element on the page
        var liElement = document.getElementById('inv_' + position);
        // Get a reference to the class attribute to see what it's value is
        if (dir == undefined) {
            var liClassValue = XBrowser.getClass(liElement);
            //Check if it is Not opened 
            if (liClassValue != "Cell On") {
                XBrowser.setClass(liElement, 'Cell On');
            }
            else {
                XBrowser.setClass(liElement, 'Cell Off');
            }
        }
        else if (dir == 'Cell On') {
            XBrowser.setClass(liElement, 'Cell On');
        }
        else if (dir == 'Cell Off') {
            XBrowser.setClass(liElement, 'Cell Off');
        }
    }
}


function inv_ExpandAll(elementArrayName) {
    if (elementArrayName != undefined || elementArrayName != null) {
        var x = 0;
        while (x < elementArrayName.length) {
            if (elementArrayName[x].runtimer == null) ArrowSwap(x, 'down');
            elementArrayName[x].slidedown();
            x++;
        }
    }
}

function inv_CollapseAll(elementArrayName) {
    if (elementArrayName != undefined || elementArrayName != null) {
        var x = 0;
        while (x < elementArrayName.length) {
            if (elementArrayName[x].runtimer == null) ArrowSwap(x, 'up');
            elementArrayName[x].slideup();
            x++;
        }
    }
}

function inv_ToggleAll(elementArrayName) {
    if (elementArrayName != undefined || elementArrayName != null) {
        var x = 0;
        while (x < elementArrayName.length) {
            if (elementArrayName[x].runtimer == null) ArrowSwap(x);
            elementArrayName[x].slideit();
            x++;
        }
    }
}



function ArrowSwap(position, dir) {

    //first get the DOM position of the arrow
    if (document.getElementById) {
        // Get a reference to the li tag element on the page
        var liElement = document.getElementById('inv_li' + position);
        // Get a reference to the class attribute to see what it's value is

        if (dir == undefined) {
            var liClassValue = XBrowser.getClass(liElement);
            //Check if it is Not opened 
            if (liClassValue != "Opened") {
                XBrowser.setClass(liElement, 'Opened');

            }
            else {
                XBrowser.removeClass(liElement);
            }
        }
        else if (dir == 'up') {
            XBrowser.removeClass(liElement);
        }
        else if (dir == 'down') {
            XBrowser.setClass(liElement, 'Opened');
        }
    }
}
