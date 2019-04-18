jQuery(document).ready(function () {

    AlertViewValidation();
    mobileViewSwitch();
});

function mobileViewSwitch() {
    if(jQuery('.page-nav ul.control li a.active').length == 1)
    {
        jQuery('.page-nav ul.control li a').addClass('mobhide');
    }
    
}

function AlertViewValidation() {
    
    if (getCookie("alertClosed")) {
        jQuery('div.alert').hide();
    }
    else {
        jQuery('div.alert').show();

    }
    jQuery('.close-button').click(function () {
        jQuery('.alert.callout').hide()
        setCookie("alertClosed", true, 1);
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +"; path=/"
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function BuildPackageTypeOption(key, value) {
    
    
    return "<option value='" +value + "'>" + key + "</option>";
}

function BuildPerfTimeOption(key, value) {


    return "<option value='" + key + "'>" + value + "</option>";
}


function BuildPerfCountOption(key, value, count) {
    
    if (!isNaN(key))
    {
        if (key <= count)
            return "<option value='" + value + "'>" + key + "</option>";
        else
            return "";
    }
    else if(key.length > 0)
    {
        return "<option value='" + value + "'>" + key + "</option>";
    }
    
}

function BuildProductionList(key,value)
{
    var id = value + "";
    id = id.replace(" ", "_");
    return "<div class='check-holder' style='height: 65px;'><label for='" + id + "'><input type='checkbox' data-id='" + id + "' id='" + id + "' value='"+ key + "'><span>" + key + "</span></label></div>"
}

function ClearDivider() {

    var children = jQuery('.center ul').children().length;
    if(children == 1)
    {
        jQuery('.center .centerGrouping li p').addClass('no-after');
    }

}

function ActivateMenuOptions()
{
    var active = jQuery('ul li a.lvl2.active')
    if (active)
    {
        var ID = "#" + active.attr('data-sub-nav');
        jQuery(ID).attr('style', 'display:inline')
    }
    
}

function formatAMPM(datestring) {
    var date = new Date(datestring);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function SetDisabledState()
{
    jQuery.each(jQuery('.check-holder input'), function (key, value) {

        var idNum = value.getAttribute("data-id")
        if (idNum == -1) {
            jQuery('.check-holder input').prop('disabled', true);
        }
    });
}

function SecondLevelActivation()
{
	
	if(jQuery('.lvl2.active').length == 1)
	{
		var dataID = jQuery('.lvl2.active').attr('data-sub-nav');
		if(jQuery('#' + dataID).length == 0)
		{
			jQuery('.holder').show();
			var parentUL = jQuery('.lvl2.active').parent().parent().attr('id');
			jQuery('#' + parentUL + ' > li a').removeClass('hidden');
			jQuery('#' + parentUL + ' > li a').addClass('disabled')
			jQuery('.lvl2.active').removeClass('disabled');
			jQuery('.lvl2.active').removeClass('active');
		}		
	}	
}

function MoveToPage(pageNum)
{
    jQuery('.filterItem').hide();
    var itemCount =  jQuery('.filterItem').length;
    if (itemCount > 0)
    {
        var jQuerystartSet;
        var pageCount = Math.ceil(itemCount / 3);
        var startIndex = ((pageNum - 1) * 3);
        if (startIndex + 3 > itemCount)
        {
            jQuerystartSet = jQuery('.filterItem').slice(startIndex, startIndex + (itemCount % 3));
        }
        else
        {
            jQuerystartSet = jQuery('.filterItem').slice(startIndex, startIndex + 3);
        }
        
        jQuerystartSet.each(function (index, value) {
            jQuery("#" + value.id).show();
        });

        var pageBlock = getPaginationBlockHtml(pageCount, pageNum);
        

        jQuery('#paginationBlock').empty();
        jQuery('#paginationBlock').append(pageBlock);
        jQuery(window).scrollTop(jQuery('.explore-bb').height() - jQuery('.filters').height());
        window.setupSlick && setupSlick(true);
        jQuery(window).trigger('resize');
    }
}

/*
var prm = Sys.WebForms.PageRequestManager.getInstance();
prm.add_endRequest(function (s, e) {
    Paginate()
});
*/

function Paginate()
{
    jQuery('#paginationBlock').empty();
    var itemCount =  jQuery('.filterItem').length;
    if(itemCount > 3)
    {
        jQuery('.filterItem').hide();
        var pageCount = Math.ceil(itemCount / 3);
        var jQuerystartSet = jQuery('.filterItem').slice(0, 3);
        jQuerystartSet.each(function (index, value) {
            jQuery("#" + value.id).show();
        });
        
        var pageBlock = getPaginationBlockHtml(pageCount, 1);

        jQuery('#paginationBlock').append(pageBlock);
    }
    jQuery(window).trigger('resize');
}

function getPaginationBlockHtml(totalPages, currentPageNum) {
    var html = '';
    currentPageNum = currentPageNum || 1; //1-index based number
    currentPageNum = currentPageNum > totalPages ? totalPages : currentPageNum;
    var maxSiblingPages = 3; 

    var isFirstPage = currentPageNum == 1;
    var isLastPage = currentPageNum == totalPages; 

    var prevPageNum = !isFirstPage ? currentPageNum - 1 : 1;
    var nextPageNum = !isLastPage ? currentPageNum + 1 : totalPages;

    var prevNumClassActiveCssClass = isFirstPage ? 'inactive' : '';
    var nextNumClassActiveCssClass = isLastPage ? 'inactive' : '';

    var prevOnClickAttr = !isFirstPage ? 'onclick="event.preventDefault(); MoveToPage(' + prevPageNum + ')"' : '';
    var nextOnClickAttr = !isLastPage ? 'onclick="event.preventDefault(); MoveToPage(' + nextPageNum + ')"' : '';

    html += '<a class="page-num-item prev-p ' + prevNumClassActiveCssClass + '" ' + prevOnClickAttr + '></a>'; 

    for (var i = 1; i <= totalPages; i++) {
        var pageHtml = '';

        var showPageNum = false;
        var showDotsBefore = false;
        var showDotsAfter = false;

        var iIsFirstPage = i == 1;
        var iIsLastPage = i == totalPages;

        var countPagesBeforeOrAfterCurrent = currentPageNum - i;
        var countPagesBeforeOrAfterCurrent = countPagesBeforeOrAfterCurrent > 0 ? countPagesBeforeOrAfterCurrent : countPagesBeforeOrAfterCurrent*-1;

        var countPagesToFirst = currentPageNum - 1;
        var countPagesToLast = totalPages - currentPageNum;

        //logic to show page number or not
        if (iIsFirstPage || iIsLastPage || i == currentPageNum) {
            showPageNum = true;
        } else if (countPagesBeforeOrAfterCurrent <= maxSiblingPages) {
            showPageNum = true;
        }

        //logic to show "..." or not
        if (i < currentPageNum) {
            if (!iIsFirstPage && countPagesToFirst > (maxSiblingPages + 1)) {
                if (countPagesBeforeOrAfterCurrent == maxSiblingPages) {
                    showDotsBefore = true;
                }
            }
        } else if (i > currentPageNum) {
            if (!isLastPage && countPagesToLast > (maxSiblingPages + 1)) {
                if (countPagesBeforeOrAfterCurrent == maxSiblingPages) {
                    showDotsAfter = true;
                }
            }
        }

        if (showDotsBefore && !showDotsAfter) {
            pageHtml += '<a class="page-num-item dots">...</a>';
        }
        if (showPageNum) {
            if (i == currentPageNum) {
                pageHtml += "<a class='currentPage page-num-item'>" + i + "</a>";
            } else {
                pageHtml += "<a class='page-num-item' href='#' onclick='event.preventDefault(); MoveToPage(" + i + ")'>" + i + "</a>";
            }
        }
        if (showDotsAfter && !showDotsBefore) {
            pageHtml += '<a class="page-num-item dots">...</a>';
        }

        html += pageHtml;
    }

    html += '<a class="page-num-item next-p ' + nextNumClassActiveCssClass + '" ' + nextOnClickAttr + '></a>';
    return html;
}



function pauseVideoPlayer(player) {
    videojs.getPlayers()[jQuery(player).attr('id')].pause();
    var vidContainer = jQuery(player).closest('.vid-container');
    vidContainer.addClass('paused');
}

function FixArticleSpacing() {
    if (jQuery('.img-content.negative-image').length > 0 && jQuery('.TopItem .media-item').length == 0) {
        jQuery('section.img-content.negative-image').css('padding-top', "3em");
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var specialPackage = false;
jQuery(document).ready(function ()
{   

    FixArticleSpacing();
    Paginate();
    SecondLevelActivation();
    ClearDivider();
    ActivateMenuOptions();

    

    jQuery('.nav-menu').click(function () {
        var modal = jQuery('#nav-frame');
        jQuery('body').detach('#nav-frame');
        jQuery('form').append(modal);
    });

    jQuery('#nav-frame .close-button').click(function () {
        var modal = jQuery('#nav-frame');
        jQuery('form').detach('#nav-frame');
        jQuery('body').append(modal);
    });

    if (jQuery('.donation-options').length > 0) {
        jQuery('.donation-options input').change(function () {
            jQuery('.donation-textbox').val("");
            jQuery('.donation-options').fadeTo('slow', 1)
        }); 

        jQuery('.donation-textbox').keypress(function () {
            jQuery('.donation-options input').prop('checked', false);
            jQuery('.donation-options').fadeTo('slow', 0.5)
        });
    }

    function GetProductions()
    {
        jQuery('#checkboxBlock').empty();
        if (jQuery('#season_id option:selected').val() != -1)
        {
            
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "/services/SubscriptionService.ashx",
                data: "MethodName=GetProductions&season=" + jQuery('#season_id option:selected').val(),
                dataType: "json",
                async: false,
                success: function (data) {
                    productionCount = 0;
                    var options = "";
                    jQuery.each(data, function (key, value) {
                        options += BuildProductionList(key, value);
                        productionCount++;
                    }
                    );
                    jQuery('#checkboxBlock').html(options);                    

                    SetDisabledState();
                }
            });            
        }        
    }

    function BindSeasonDropdown()
    {
        var seasonCount = 0;
        jQuery.ajax({

            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/services/SubscriptionService.ashx",
            data: "MethodName=GetSeasonList",
            dataType: "json",
            async: false,
            success: function (data) {

                var options = "<option value='-1'>Select a season</option>";
                
                jQuery.each(data, function (key, value)
                    {
                        seasonCount++;
                        options += BuildSeasonOptions(key, value);
                        jQuery('#season_id').html(options);
                    });                
            }
        });
        var presetSeason = getUrlVars()["season"];
        if (presetSeason)
        {
            jQuery('#season_id option[value=' + presetSeason + ']').prop('selected', true)
            jQuery('#season_id').change()
        }
        else if (seasonCount == 1) {
            jQuery('#season_id option:eq(1)').prop('selected', true)
            jQuery('#season_id').change()
        }
    }

    function BuildSeasonOptions(key, value)
    {
        return "<option value='"+ value +"'>" + key + "</option>";
    }

    function GetPerformanceRange()
    {
        jQuery('#num_perf').html(" ")
        jQuery('#timeSelect').html(" ")
        var options = "<option value='-1'>Select a number of performances</option>";
        var perfOptionCount = 0;
        jQuery.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/services/SubscriptionService.ashx",
            data: "MethodName=GetPerformanceRange",
            dataType: "json",
            async: false,
            success: function (data)
            {
                jQuery.each(data, function (key, value)
                {
                    perfOptionCount++;
                    options += BuildPerfCountOption(key, value, productionCount);
                });
                jQuery('#num_perf').html(options);
            }            
        });

        jQuery('.check-holder input').click(function () {
            var max = parseInt(jQuery('#num_perf option:selected').text());
            var currentAmount = jQuery('.check-holder input:checked').length;
            if (currentAmount == max) {
                jQuery('.check-holder input:not(:checked)').prop('disabled', true);

                //disable non-checked
            }
            else if (currentAmount < max) {
                //enable
                jQuery('.check-holder input:not(:checked)').prop('disabled', false);
                jQuery('.error').text("")
            }
        });

        
        jQuery('.check-holder input').prop('checked', false);  

        var presetPerfString = getUrlVars()["perfs"];
        presetPerfString = presetPerfString.replace('#packagesubmit', '');
        var presetPerfs = presetPerfString.split(',');
        if (presetPerfs)
        {
            var option = jQuery('#num_perf option:contains(' + presetPerfs.length + ')');
            option.attr('selected', "select");
            jQuery('#num_perf').change();
            jQuery.each(presetPerfs, function (data, key) {
                jQuery('#checkboxBlock input#' + key).click()
                jQuery('#checkboxBlock input#' + key).change();
            });
        }

        else if (perfOptionCount == 1)
        {
            jQuery('#num_perf option:eq(1)').prop('selected', true)
            jQuery('#num_perf').change()

            if (isNaN(jQuery('#num_perf :nth-child(2)').val())) {
                specialPackage = true;
            }
            else
            {
                specialPackage = false;
            }
        }
        else {
            specialPackage = false;
        }      
    }

    function GetFriendlyTimes()
    {        
        var options = "<option value='-1'>Select a package time</option>";
        var value = jQuery("#num_perf option:selected").val();
        var friendlyTimeCount = 0;
        if (value != -1) {
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "/services/SubscriptionService.ashx",
                data: "MethodName=GetFriendlyTimes&path=" + value,
                dataType: "json",
                async: false,
                success: function (data) {


                    jQuery.each(data, function (key, value) {
                        friendlyTimeCount++;
                        options += BuildPerfTimeOption(key, value);
                    }
                    );
                }
            });
        }
        jQuery('#timeSelect').html(options);
        jQuery('.check-holder input').prop('checked', false);
        jQuery('.check-holder input').prop('disabled', false);
            
        if (friendlyTimeCount == 1) {
            jQuery('#timeSelect option:eq(1)').prop('selected', true)
            jQuery('#timeSelect').change()
        }
        if (specialPackage)
        {
            jQuery('.check-holder input').prop('disabled', true);
        }
        else
        {
            jQuery('.check-holder input').removeAttr('disabled');
            var maxChecks = parseInt(jQuery('#num_perf option:selected').text());
            if (maxChecks == productionCount) {
                jQuery.each(jQuery('#checkboxBlock input'), function (data, key) {
                    key.click();
                });
            }
        }
    }

    function subscribe()
    {
        
        var value = jQuery("#timeSelect option:selected").val();
        var seasonId = jQuery('#season_id option:selected').val();
        var numberChecked = jQuery('.check-holder input:checked').length;
        var maxChecks = parseInt(jQuery('#num_perf option:selected').text());
        var maxCheckText = jQuery('#num_perf option:selected').text();
        specialPackage = isNaN(maxChecks) && maxCheckText != "Select a number of performances";

        if (specialPackage || (value != -1 && numberChecked == maxChecks && seasonId != -1)) {
            var packages = " ";
            jQuery.each(jQuery('.check-holder input:checked'), function (data, key) {
                var idText = key.id;
                packages += jQuery('#' + idText).attr('data-id') + ";"
            });
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "/services/SubscriptionService.ashx",
                data: "MethodName=subscribe&packageslot=" + value + "&prodIDs=" + packages + "&count=" + numberChecked + "&special=" + specialPackage + "&seasonNum=" + seasonId,
                dataType: "json",
                async: false,
                success: function (data) {

                    if (data.length > 0) {
                        window.location.href = data;
                    }
                    else {
                        jQuery('.error').text("No packages could be found for this selection.")
                    }



                }
            });
        }
        if (!specialPackage) {
            if (jQuery('#season_id option:selected').val() == -1) {
                jQuery('.error').text("Please select a season")
            }            
            else if (jQuery('#num_perf option:selected').val() == -1) {
                jQuery('.error').text("Please select a number of performances")
            }            
            else if (numberChecked > maxChecks) {
                jQuery('.error').text("Please select fewer performances.")
            }
            else if (numberChecked < maxChecks) {
                jQuery('.error').text("Please select more performances.")
            }
            else if (value == -1) {
                jQuery('.error').text("Please select a package time.")
            }
        }

        
    }

    var productionCount = 0;
    if (jQuery('.subscriptionwizard').length > 0)
    {
        if (window.location.hash == "#packagesumbit")
        {
            jQuery(window).scrollTop(jQuery('.subscriptionwizard').offset().top);
        }             
        
        

        jQuery('#season_id').change(function () {
            var perfLimit = 0;

            jQuery('#num_perf').change(function (e) {                
                GetFriendlyTimes();
            });

            jQuery('.subButton').click(function () {
                subscribe();
            });

           

            GetProductions()

            GetPerformanceRange();
        });

        BindSeasonDropdown();
    }


    jQuery('#monthSelect').change(function () {
        var monthval = parseInt(jQuery('#monthSelect').val());
        if (monthval != -1)
        {
            datepicker.setyearmonth({ month: monthval })
        }
    });

    jQuery('#yearSelect').change(function () {
        var yearVal = parseInt(jQuery('#monthSelect').val());
        if (yearVal != -1) {
            datepicker.setyearmonth({ year: yearVal })
        }
    });


    jQuery('.thevideo').each(function (i, val) {

        var myPlayer = {};
        var video = jQuery(this).closest('.video-js');
        var isModal = video.hasClass('modal-video');

        var videoSection = jQuery(this).closest('.video-section');
        var vidContainer = video.closest('.vid-container');
        var vidOverlay = video.closest('.video-overlay');
        var videoLink = videoSection.attr('video-link');

        var dataOptions = (isModal) ? { "inactivityTimeout": 0 } : {};
        myPlayer.player = videojs(this, dataOptions, function () {
            if (isModal) {
                var controlBarComponents = videojs.getComponent("ControlBar").prototype.options.components;
                videojs.getComponent("ControlBar").prototype.options_ = {};

                myPlayer.controlBar = myPlayer.player.addChild('ControlBar');
                myPlayer.controlBar.addClass('external-controls-bar');

                myPlayer.progressControl = myPlayer.controlBar.addChild('ProgressControl');
                myPlayer.spacer1 = myPlayer.controlBar.addChild('Spacer');
                myPlayer.playToggle = myPlayer.controlBar.addChild('PlayToggle');
                myPlayer.remainingTimeDisplay = myPlayer.controlBar.addChild('RemainingTimeDisplay');
                myPlayer.fullscreenToggle = myPlayer.controlBar.addChild('FullscreenToggle');
                myPlayer.volumeMenuButton = myPlayer.controlBar.addChild('VolumeMenuButton');
                myPlayer.spacer2 = myPlayer.controlBar.addChild('Spacer');

                

                videojs.getComponent("ControlBar").prototype.options.components = controlBarComponents;
            };
            if (video.closest('.carousel').length > 0) {
                // this.load();
            }
            
            if (this.hasClass('vjs-using-native-controls')) {
                vidContainer.addClass('native-controls');
            } else {
            }
        });

        
        var video = jQuery(this).closest('.video-js');
        vidOverlay.on('click playerclick', function (e) {
                if (jQuery(e.target).attr('class').indexOf('video-overlay') >= 0) {
                    if (myPlayer.player.paused() == true) {
                        vidContainer.removeClass('paused');
                        myPlayer.player.play();
                    } else {
                        myPlayer.player.pause();
                        vidContainer.addClass('paused');
                    }
                } else if (jQuery(e.target).attr('class').indexOf('vjs-play-control') >= 0) {
                    if (myPlayer.player.paused() == true) {
                        vidContainer.addClass('paused');
                    } else if (myPlayer.player.paused() == false) {
                        vidContainer.removeClass('paused');                        
                    }
                } else if (e.type == 'playerclick') {
                    if (myPlayer.player.paused() == true) {
                        vidContainer.removeClass('paused');
                    } else if (myPlayer.player.paused() == false) {
                        vidContainer.addClass('paused');
                    }
                }
            });
            
            var playButton = myPlayer.player.getChild('controlBar').getChild('playToggle');

    }).on('loadeddata', function () {
        
        var playButton = jQuery(this).siblings('.external-controls-bar').find('.vjs-play-control');
        playButton.on('tap touchstart', function () {
            playButton.trigger('playerclick');
        });
    }).on('error', function() {

    });

    jQuery('.video-button').each(function(value, key) {
        var myPlayer = {};
        var videoButton = jQuery(this);

        var videoSection = jQuery(this).closest('.video-section');
        var vidContainer = videoButton.closest('.vid-container');
        var vidOverlay = videoButton.closest('.video-overlay');
        var videoLink = videoSection.attr('video-link');

        if (typeof videoLink !== typeof undefined && videoLink !== false) {
            var modalSelector = '#' + videoLink;
            vidOverlay.on('click  tap', function () {
                jQuery.fancybox({
                    transitionIn: 'elastic',
                    transitionOut: 'elastic',
                    speedIn: 500,
                    speedOut: 300,
                    fitToView: false,
                    width: "100%",
                    height: "auto",
                    maxWidth: 1345,//"84.875rem",
                    autoSize: false,
                    scrolling: false,
                    showCloseButton: true,
                    centerOnScroll: true,
                    padding: 0,
                    beforeShow: function () {
                        jQuery(".fancybox-skin").css("backgroundColor", "transparent");
                        jQuery(modalSelector).css("visibility", "hidden");
                        jQuery(modalSelector).css("position", "absolute");


                        jQuery('.fancybox-wrap').on('click', function (event) {
                            var classCheck = jQuery(event.target).attr('class');

                            if (classCheck != undefined && classCheck.indexOf("fancybox") >= 0) {
                                jQuery.fancybox.close();
                            }
                        });
                        jQuery('.video-controls .accordion-fancy', '.fancybox-wrap').off('click');
                        jQuery('.video-controls .accordion-fancy .accordion-fancy-content', '.fancybox-wrap').bbTruncate('update');
                    },
                    afterShow: function () {
                        jQuery(modalSelector).css("visibility", "visible");
                        jQuery(modalSelector).css("position", "relative");
                    },
                    href: modalSelector
                });

                if (jQuery(modalSelector + ' .thevideo').hasClass('vjs-using-native-controls')) {
                    jQuery(modalSelector + ' .thevideo').closest('.vid-container').addClass('native-controls');
                } else {
                }
            });
        }
    });

    jQuery('.image-slider-controls .accordion-fancy').on('click', function () {
        if (jQuery(this).hasClass('enabled')) {
            jQuery(this).removeClass('enabled');
            jQuery(this).find('.accordion-fancy-content').css('max-height', "");
        } else {
            jQuery(this).addClass('enabled');
            var contents = jQuery(this).find('.accordion-fancy-content');
            var height = 0;
            contents.children().each(function (i, value) {
                height += jQuery(value).outerHeight();
            });
            contents.css('max-height', height + "px");
        }
    });

    jQuery('.media-gallery').each(function(value, key) {
        var gallery = jQuery(this);
        var imageSliderSection = jQuery(this).closest('.image-slider-section');
        var imageSliderModalId = imageSliderSection.attr('gallery-link');
        var modalSelector = '#' + imageSliderModalId;
        var carousel = modalSelector + " .carousel";
      
        gallery.on('click', function () {

            jQuery.fancybox({

                transitionIn: 'elastic',
                transitionOut: 'elastic',
                speedIn: 500,
                speedOut: 300,
                fitToView: true,
                width: "100%",
                height: "auto",
                maxWidth: 1345,//"84.875rem",
                autoSize: false,
                scrolling: false,
                showCloseButton: true,
                centerOnScroll: true,
                padding: 0,
                wrapCSS: 'galleryfancybox',
                beforeShow: function(){
                    jQuery(".fancybox-skin").css("backgroundColor","transparent");
                    jQuery(modalSelector).css("visibility", "hidden");

                    jQuery('.fancybox-wrap').on('click', function (event) {
                        var classCheck = jQuery(event.target).attr('class');

                        if (classCheck != undefined && classCheck.indexOf("fancybox") >= 0) {
                            jQuery.fancybox.close();
                        }
                    });

                },
                afterShow: function(){
                    jQuery(modalSelector).css("visibility", "visible");
                    jQuery('.fancybox-wrap .carousel.modal-slider').on('init', function(slick) {
                        jQuery.fancybox.update();
                    }).slick({
                        dots: false,
                        infinite: true,
                        speed: 300,
                        fade: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        nextArrow: ".slick-next",
                        prevArrow: ".slick-prev"
                    });

                    jQuery('.image-slider-controls .accordion-fancy', '.fancybox-wrap').off('click');
                },
                beforeClose: function() {
                    jQuery('.fancybox-wrap .carousel.modal-slider').slick('unslick');
                },
                href : modalSelector
            });
            
        });
    });

    jQuery('.fancybox-wrap .accordion-fancy').on('click', function () {
        if (jQuery(this).hasClass('enabled')) {
            jQuery(this).removeClass('enabled');
            jQuery(this).find('.accordion-fancy-content').css('max-height', "");
        } else {
            jQuery(this).addClass('enabled');
            var contents = jQuery(this).find('.accordion-fancy-content');
            var height = 0;
            contents.children().each(function (i, value) {
                height += jQuery(value).outerHeight();
            });
            contents.css('max-height', height + "px");
        }
    });
    jQuery('.down-arr, .scroll-link').click(function () {
        jQuery("html, body").animate({ scrollTop: jQuery(window).scrollTop() + jQuery(window).height() }, 600);
    });    

    

    if (jQuery('.carousel.modal-slider').length) {
        jQuery('.carousel.modal-slider').on('init', function (event, slick) {

            jQuery(this).find('.slick-counter').html(slick.currentSlide + 1 + ' / ' + slick.slideCount);
            jQuery(this).find('.slick-next').off('click').on('click', function () {
                slick.slickNext();
                jQuery(this).closest('.counter-container').prev().find('.thevideo').each(function () { videojs.getPlayers()[jQuery(this).attr('id')].pause(); });
            });
            jQuery(this).find('.slick-prev').off('click').on('click', function () {
                slick.slickPrev();
                jQuery(this).closest('.counter-container').prev().find('.thevideo').each(function () { videojs.getPlayers()[jQuery(this).attr('id')].pause(); });
            });
        });
        jQuery('.carousel.modal-slider').on('afterChange', function (event, slick, currentSlide) {
            jQuery(this).find('.slick-counter').html(currentSlide + 1 + ' / ' + slick.slideCount);
        });
        //jQuery.fancybox.update()
        
    }


    jQuery('.filterSection li a').click(function (evt) {
        evt.preventDefault();
        return false;
    });

    jQuery('.email-input').keypress(function (e) {
        jQuery('.submit-button').attr('CommandName', jQuery(this).val());
        if (e.which == 13) {
            jQuery('.submit-button')[0].click()
        }
    });

    /* Donation Logic */
    var numberReg = new RegExp('^\\d+jQuery');

    jQuery('.donation-textbox').on("keyup", function () {
        SetDonationLink();
    });
    jQuery('.donation-textbox').keypress(function (e) {
        if (e.which == 13) {
            if (SetDonationLink()) {
                var href = jQuery('.submit-button').attr('href');
                window.location.href = href;
            }
        }
    });

    jQuery('label.checkbox, .donation-options input').on('change', function () {
        SetDonationLink();
    });


    function SetDonationLink() {
        isValidNumber = false;
        var submitValue = {};
        var donationUrl = jQuery('.submit-button').attr('donation-url');
        var donationRecipient = jQuery('.submit-button').attr('donation-recipient');
        var checkboxValue = jQuery('.donation-options').find('input[type="radio"]:checked').attr('donation-value');
        var textboxValue = jQuery('.donation-textbox').val();

        if (textboxValue) {
            submitValue = textboxValue;
        } else {
            submitValue = checkboxValue;
        }

        if (numberReg.test(submitValue)) {
            jQuery('.submit-button').removeClass('disable-click');
            isValidNumber = true;
        } else {
            jQuery('.submit-button').addClass('disable-click');
        }

        jQuery('.submit-button').attr('href', donationUrl + '?don=' + donationRecipient + '&fieldAmt=' + submitValue);
        return isValidNumber;
    }

    jQuery('.video-controls .accordion-fancy .accordion-fancy-content').bbTruncate({
        heightOffset: 40,
        heightMinTrail: 40
    });
    jQuery('.image-slider-controls .accordion-fancy .accordion-fancy-content').bbTruncate({
        heightOffset: 40,
        heightMinTrail: 40
    });
});


/**
 *
 */
;(function (jQuery) {
    jQuery.fn.bbTruncate = function (options, arg) {
        if (options && typeof(options) == 'object') {
            options = jQuery.extend( {}, jQuery.bbTruncate.defaults, options );
        }
        return this.each(function () {
            jQuery.bbTruncate(this, options, arg);
        });
    };
    jQuery.bbTruncate = function (elem, options, args) {
        if (options && typeof (options) == 'string') {
            var data = jQuery(elem).data('bbTruncate');
            if (options == "update") 
            {
                truncate_update(elem, data);
            }
        } else {
            if (data == null) {
                truncate_setup(elem, options);
            }
        }

        function truncate_update(elem, options) {
            var jQueryelem = jQuery(elem);
            truncate_setup(elem, options);
        };
        function truncate_setup(elem, options) {
            var obj = jQuery(elem);
            obj.data('bbTruncate', options);

            obj.removeClass('bb-truncate-content');
            obj.removeClass('bb-truncate-no-truncate')
            obj.removeClass('bb-truncate-j-cont');
            obj.removeClass('open');
            obj.css('max-height', "");
            obj.off('click'); 

            var originalHeight = obj.height();

            if (options.useSelf) {
                obj.addClass('bb-truncate-content');

                if (obj.height() <= options.heightOffset) {
                    obj.addClass('bb-truncate-no-truncate');
                    obj.off('click.bb.truncate'); 

                } else {
                    obj.addClass('bb-truncate-j-cont');
                    obj.css('max-height', options.heightOffset + "px"); 
                    obj.off('click.bb.truncate').on('click.bb.truncate', function () {
                        var obj = jQuery(this);
                        if (obj.hasClass('open')) {
                            obj.removeClass('open');
                            obj.css('max-height', options.heightOffset + "px");
                        } else {
                            obj.addClass('open');
                            var height = 0;
                            obj.children().each(function (i, value) {
                                height += jQuery(value).outerHeight(true);
                            });
                            obj.css('max-height', height + "px");
                        }
                    });
                }
            }
        };
    };
    jQuery.bbTruncate.defaults = {
        minTrail: 20,
        heightOffset: 0,
        heightMinTrail: 100,
        useSelf: true
    }; 
})(jQuery);

