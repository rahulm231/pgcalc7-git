/*
 * jQuery CareWorks Media Gallery Plugin v 1.1.0
 * http://www.caretech.com
 *
 * Requires:	Nivo Plugin http://nivo.dev7studios.com
 *
 * April 2011
 *
 * Updated July 2012 to add support for multiple viewer types and enhance Nivo Slider functionality (v 1.1.0)
 */

(function ($)
{
    $.fn.CWMediaGallery = function (embedparams)
    {
        return this.each(function ()
        {
            var galleryDiv = $(this);

            if (typeof (embedparams.gallery) == "undefined" || embedparams.gallery <= 0 || embedparams.gallery == "")		//get out if we don't have an id
            {
                trace("Gallery ID not Found");
                return this;
            }
            else trace("Gallery ID: " + embedparams.gallery);

            //we have a gallery id - load the xml and attempt to retrieve the data
            //download XML file
            $.ajax({
                type: "GET",
                url: "/MediaGallery/Default.aspx?galleryid=" + embedparams.gallery,
                dataType: "text",
                success: function (url) { getXML(url, embedparams, galleryDiv) }
            });
        });
    }

    function getXML(url, embedparams, galleryDiv)
    {
        $.ajax(
			{
			    type: "GET",
			    url: url,
			    dataType: "xml",
			    success: function (xml) { insertGallery(xml, embedparams, galleryDiv) }
			});
    }

    function insertGallery(xml, embedparams, galleryDiv)
    {
        trace("XML Downloaded");

        $.getJSON("/MediaGallery/Viewer.aspx?galleryid=" + embedparams.gallery,
					function (settings)
					{
					    galleryDiv.attr("style", "");
					    galleryDiv.find(".galleryName").remove();
					    galleryDiv.removeClass("mgPlaceholder");

					    switch (settings.ViewerTypeId)
					    {
					        case 1:
					            insertFlashGallery(embedparams, settings, galleryDiv)
					            break;
					        case 2:
					            insertJQueryNivoSliderGallery(embedparams, xml, settings, galleryDiv);
					            break;
					    }
					});
    }

    function insertFlashGallery(embedparams, settings, galleryDiv)
    {
        trace("Inserting Flash viewer...");
        swfobject.embedSWF(settings.FilePath, galleryDiv[0].id, settings.Width, settings.Height, "8.0.0", "/Upload/flash/expressInstall.swf", embedparams, { menu: "false", wmode: "transparent" }, {});
    }

    //IE 7 and 8 don't play nice with max-width and max-height on the wrapper div
    function isIE7Or8()
    {
        if (navigator.appName == "Microsoft Internet Explorer") //IE
        {
            if (typeof (document.documentMode) == "undefined" || document.documentMode < 9)
                return true;
        }

        return false;
    }

    function insertJQueryNivoSliderGallery(embedparams, xml, settings, galleryDiv)
    {
        trace("Inserting jQuery viewer...");
        if (settings.IsResponsive && !isIE7Or8())
        {
            galleryDiv.css("max-width", settings.Width + "px");
            galleryDiv.css("max-height", settings.Height + "px");
        }
        else
        {
            galleryDiv.css("width", settings.Width + "px");
            galleryDiv.css("height", settings.Height + "px");
        }

        galleryDiv.css("overflow", "hidden");

        if (settings.skinCssClass != "" && typeof (settings.skinCssClass) != undefined)
        {
            galleryDiv.addClass(settings.skinCssClass);
        }


        var htmlString = "<div class=\"nivo-wrapper\">";

        var nivocaptions = "";

        var embedalbum;
        var embeditem;

        if (typeof (embedparams.album) != "undefined" && embedparams.album != "" && embedparams.album > 0)
        {
            embedalbum = embedparams.album;
        }

        if (typeof (embedparams.item) != "undefined" && embedparams.item != "" && embedparams.item > 0)
        {
            embeditem = embedparams.item;
        }

        //Index to get position for start item
        var index = 0;

        $(xml).find("album").each(function ()
        {
            var albumid = $(this).attr("id");
            var imgpath = $(this).attr("lgPath");
            var tnpath = $(this).attr("tnPath");

            trace("Loading images from: " + imgpath);

            $(this).find("img").each(function ()
            {
                //If embed album is provided and start slide isn't already set (i.e. if we're on the first image in the album),
                //  start with this image -- if an item ID is provided, we'll override this later
                if (typeof (embedalbum) != "undefined" && albumid == embedalbum && typeof (settings.startSlide) == "undefined")
                {
                    settings.startSlide = index;
                }

                //Get image attributes from XML
                var imgid = $(this).attr("id");
                var imgsrc = $(this).attr("src");
                var imglink = $(this).attr("link");
                var imgtarget = $(this).attr("target") || "_self";
                var imgpause = $(this).attr("pause");
                var imgtitle = $(this).attr("title");
                var imgdesc = $(this).attr("caption")
                var imgtn = $(this).attr("tn");

                if (typeof (embeditem) != "undefined" && imgid == embeditem)
                {
                    settings.startSlide = index;
                }

                trace("Loading Image: " + imgsrc);

                //Start constructing image tag
                var imgtag = "<img src=\"" + imgpath + imgsrc + "\" ";

                //Set alt attribute
                if (typeof (imgtitle) == "undefined")
                {
                    imgtitle = "";
                }

                imgtag += "alt=\"" + imgtitle + "\" ";

                //Set data-thumb attribute
                if (imgtn != "" && typeof (imgtn) != "undefined" && tnpath != "" && typeof (tnpath) != "undefined")
                {
                    imgtag += "data-thumb=\"" + tnpath + imgtn + "\" ";
                }

                //Create caption div and add ID reference to image tag
                if (settings.showCaptions && imgdesc != "" && typeof (imgdesc) != "undefined")
                {
                    var captionid = galleryDiv[0].id + "_img" + imgid + "caption";
                    nivocaptions += "<div id=\"" + captionid + "\" class=\"nivo-html-caption\">" + imgdesc + "</div>";
                    imgtag += "title=\"#" + captionid + "\" ";
                }

                // Close image tag
                imgtag += "/>";

                //Add image tag to wrapper div (with link if applicable)
                if (imglink != "" && typeof (imglink) != "undefined")
                {
                    htmlString += "<a href=\"" + imglink + "\" target=\"" + imgtarget + "\">" + imgtag + "</a>";
                }

                else
                {
                    htmlString += imgtag;
                }

                index++;
            });
        });
        htmlString += "</div>";

        galleryDiv.append(htmlString);

        if (settings.showCaptions && nivocaptions != "")
        {
            galleryDiv.append(nivocaptions);
        }

        //Use random start item if no start item or album was selected
        if (typeof (settings.startItem) == undefined)
        {
            settings.randomStart = true;
        }

        if (settings.IsResponsive)
        {
            galleryDiv.find(".nivo-wrapper").css("max-width", settings.ItemWidth + "px");
            galleryDiv.find(".nivo-wrapper").css("max-height", settings.ItemHeight + "px");
        }
        else
        {
            galleryDiv.find(".nivo-wrapper").css("width", settings.ItemWidth + "px");
            galleryDiv.find(".nivo-wrapper").css("height", settings.ItemHeight + "px");
        }

        galleryDiv.find(".nivo-wrapper").nivoSlider(settings);

		//Munson customization: add DOM elements for custom skin	
        galleryDiv.find(".nivo-wrapper").append("<div class=\"nivo-playPauseNav playing\"><a href=\"javascript:nivoPlayPauseToggle('" + galleryDiv[0].id + "');\" /></div>");
        galleryDiv.find(".nivo-wrapper").append("<div class=\"nivo-controlBackground\"></div>");
		//End Munson customization
    }

    // For debugging
    var trace = function (msg)
    {
        if (this.console && typeof console.log != "undefined")
            console.log(msg);
    }

})(jQuery);

//Munson customization: add play/pause toggle code
function nivoPlayPauseToggle(galleryID)
{
	var galleryDiv = $("#" + galleryID);
	var playPauseNav = galleryDiv.find(".nivo-playPauseNav");
	if(playPauseNav.hasClass("playing"))
	{
		playPauseNav.removeClass("playing");
		playPauseNav.addClass("paused");
		galleryDiv.find(".nivo-wrapper").data('nivoslider').stop();
		
	}
	else
	{
		playPauseNav.removeClass("paused");
		playPauseNav.addClass("playing");
		galleryDiv.find(".nivo-wrapper").data('nivoslider').start();
	}
}
//End Munson customization