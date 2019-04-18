(function ($) {
  var initCollectionSet = function (context, settings) {
    if (!settings.collectionSet || $('#create-collection-set').length) {
      return false;
    }

    // add 'add to set' link
    if (!!settings.collectionSet.addToSetLink) {
      $('.user-collection-sets').html(settings.collectionSet.addToSetLink);
    }

    if (settings.collectionSet.loggedIn) {
      // add collection set list to end of page
      $('body').append($('<div>', {
        id: 'collection-set-list',
        title: 'My Collection Sets'
      }).append($('<div>').addClass('content')));
      // add loader
      $('#collection-set-list').prepend('<div class="loader">loading...</div>');
      // add collection set form to end of page
      $('body').append($('<div>', {
        html: settings.collectionSet.collectionSetCreateForm,
        id: 'create-collection-set',
        title: 'Create New Set'
      }));
      $('#create-collection-set').prepend('<div class="loader"></div>');
      if (settings.collectionSet.cloneSet) {
        $('.pane-title').append(settings.collectionSet.cloneSet);
      }

      // initialize modal dialog for display collection sets
      $('#collection-set-list').dialog({
        autoOpen: false,
        height: 300,
        modal: true,
        buttons: {
          "Create New Set": function () {
            resetCollectionSetForm();
            $(this).dialog('close');
            $('#create-collection-set').dialog('open');
          },
          "Done": function () {
            $(this).dialog('close');
          }
        }
      });

      // initialize modal dialog for creating a collection set
      $('#create-collection-set').dialog({
        autoOpen: false,
        height: 'auto',
        modal: true,
        buttons: {
          "Create Set": function () {
            if ($('#edit-set-title').val().length > 0) {
              createCollectionSet();
              retrieveCollectionSets();
              $(this).dialog('close');
              $('#collection-set-list').dialog('open');
            } else {
              if ($('.messages', '#create-collection-set').length <= 0) {
                $('#create-collection-set').prepend($('<div>', {
                  html: 'Please enter a title.'
                }).addClass('messages warning'));
              }
              $('#edit-set-title').focus();
            }
          },
          "Cancel": function () {
            resetCollectionSetForm();
            $(this).dialog('close');
            $('#collection-set-list').dialog('open');
          }
        }
      });

      if ($.isFunction($.fn.on)) {
        // For jQuery 1.7+
        $(document).on('click', '#collection-set-list .remove-item', function (e) {
            e.preventDefault();
            removeObjectFromSet(this);
          }
        );
      } else {
        // For jQuery 1.3.x -> 1.6.x
        // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
        // This is not here for jQuery 1.9, it's here for legacy users.
        $('#collection-set-list .remove-item').live({
          click: function (e) {
            e.preventDefault();
            removeObjectFromSet(this);
          }
        });
      }

      if ($.isFunction($.fn.on)) {
        // For jQuery 1.7+
        $(document).on('click', '#collection-set-list .add-item', function (e) {
            e.preventDefault();
            addObjectToSet(this);
          }
        );
      } else {
        // For jQuery 1.3.x -> 1.6.x
        // This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
        // This is not here for jQuery 1.9, it's here for legacy users.
        $('#collection-set-list .add-item').live({
          click: function (e) {
            e.preventDefault();
            addObjectToSet(this);
          }
        });
      }

      // prevent the form from submitting
      $('#corning-collection-set-create-set-form').submit(function (e) {
        e.preventDefault();
      });

      // open 'add to set' dialog
      $('.add-to-set').click(function (e) {
        e.preventDefault();
        // retrieve collection sets
        retrieveCollectionSets();
        $('#collection-set-list').dialog('open');
      });


      $("#create-new-set").click(function (e) {
        e.preventDefault();
      });
    }
  }

  /*
     * Resets the create set form
     */
  function resetCollectionSetForm() {
    $('#create-collection-set .messages').remove();
    $('#edit-set-title').val('');
    $('#edit-set-description').val('');
    $('#edit-set-private').removeAttr('checked').removeAttr('selected');
  }

  /*
     * Retrieve collection sets
     */
  function retrieveCollectionSets() {
    var data = {};
    data.nid = Drupal.settings.collectionSet.node;
    $('#collection-set-list .loader').toggle().html('loading...');
    $('#collection-set-list .content').empty();
    $.ajax({
      type: "POST",
      url: Drupal.settings.basePath + 'collection-set/retrieve-list',
      data: {
        data: JSON.stringify(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#collection-set-list').prepend($('<div>', {
          html: 'Unable to retrieve set list.'
        }).addClass('messages warning'));
        $('#collection-set-list .loader').toggle().html('');
      },
      success: function (data, textStatus, jqXHR) {
        $('#collection-set-list .loader').toggle().html('');
        $('#collection-set-list .content').empty().html(data);
      }
    });
  }

  /*
     * Create collection set
     */
  function createCollectionSet() {
    var data = {};
    $('#create-collection-set .loader').toggle().html('saving...');
    data.title = $('#edit-set-title').val();
    data.description = $('#edit-set-description').val();
    data.privateSet = $('#edit-set-private').is(':checked') ? 1 : 0;
    $.ajax({
      type: "POST",
      async: false,
      url: Drupal.settings.basePath + 'collection-set/create',
      data: {
        data: JSON.stringify(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#collection-set-list').prepend($('<div>', {
          html: 'Unable to create collection set.'
        }).addClass('messages warning'));
        $('#collection-set-list .loader').toggle().html('');
        setTimeout(function () {
          $("#collection-set-list .messages").remove();
        }, 5000);
      },
      success: function (data, textStatus, jqXHR) {
        $('#create-collection-set .loader').toggle().html('');
      }
    });
  }

  /*
     * Add object to collection set
     */
  function addObjectToSet(obj) {
    $(obj).removeClass('add-item').addClass('saving');

    var data = {};
    data.nid = Drupal.settings.collectionSet.node;
    data.list = $(obj).attr('rel');
    $.ajax({
      type: "POST",
      url: Drupal.settings.basePath + 'collection-set/add-object',
      async: false,
      data: {
        data: JSON.stringify(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#collection-set-list').prepend($('<div>', {
          html: 'Unable to add item to set.'
        }).addClass('messages warning'));
        $(obj).removeClass('saving').addClass('remove-item');
        setTimeout(function () {
          $("#collection-set-list .messages").remove();
        }, 5000);
      },
      success: function (data, textStatus, jqXHR) {
        $(obj).removeClass('saving').addClass('remove-item');
      }
    });
  }

  /*
     * Remove from collection set
     */
  function removeObjectFromSet(obj) {
    $(obj).removeClass('remove-item').addClass('saving');

    var data = {};
    data.nid = Drupal.settings.collectionSet.node;
    data.list = $(obj).attr('rel');
    $.ajax({
      type: "POST",
      url: Drupal.settings.basePath + 'collection-set/remove-object',
      async: false,
      data: {
        data: JSON.stringify(data)
      },
      success: function (data, textStatus, jqXHR) {
        $(obj).removeClass('saving').addClass('add-item');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#collection-set-list').prepend($('<div>', {
          html: 'Unable to remove item to set.'
        }).addClass('messages warning'));
        $(obj).removeClass('saving').addClass('add-item');
        setTimeout(function () {
          $("#collection-set-list .messages").remove();
        }, 5000);
      }
    });
  }

  Drupal.behaviors.collectionSet = {
    attach: initCollectionSet
  }
}(jQuery));
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function($){
    
    var searchToggle = function(cx, s){
        
        $('input[type="text"], input[type="email"], input[type="password"], textarea').focus(function(){
            if($(this).val() == $(this).attr('title')) $(this).val('').addClass('active');
        });
        
        $('input[type="text"], input[type="email"], input[type="password"], textarea').blur(function(){
            if($(this).val() == '') $(this).val($(this).attr('title')).removeClass('active');
        });
        
    }
    
    Drupal.behaviors.searchBehavior = {
        attach: searchToggle
    }
    
})(jQuery);;
(function ($) {
  $(document).ready(function() {
    $('.megamenu > li').hover(
      function() {
        $(this).find('div.item-list').show();
      }, function() {
        $(this).find('div.item-list').hide();
      }
    );
  });
})(jQuery);
;
(function($) {

var cmogMailchimpModalInit = function(context, settings) {
    var trigger = $('.mailchimp-trigger');
    var block   = $('.mailchimp-trigger + .block-mailchimp-lists');
    var dialog  = $('form', block).clone();

    $('.footer-subscribe-button', trigger).click(function(e) {
        e.preventDefault();

        var description = $('[id$="list-title"]').children().eq(0).text();
        var title = $('[id$="list-title"]').text().replace(description, '');
        var email = $('.footer-subscribe-email', trigger).val();

        $('[id$="mergevars-email"]', dialog).val(email);

        dialog
            .css('display', 'block')
            .dialog({
                title:     title || 'Mailing List Sign Up',
                width:     500,
                modal:     true,
                resizable: false,
            });
    });
}

Drupal.behaviors.cmogMailchimpModal = {
    attach: cmogMailchimpModalInit
}

})(jQuery);
;
//////////////////////////////////////////////////////////////////////////////////
// Cloud Zoom V1.0.2
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////
(function ($) {

    $(function () {
        $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
    });
    
    $(window).resize(function(){
        $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
    });

    function format(str) {
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace('%' + (i - 1), arguments[i]);
        }
        return str;
    }

    function CloudZoom(jWin, opts) {
        var sImg = $('img', jWin);
		var	img1;
		var	img2;
        var zoomDiv = null;
		var	$mouseTrap = null;
		var	lens = null;
		var	$tint = null;
		var	softFocus = null;
		var	$ie6Fix = null;
		var	zoomImage;
        var controlTimer = 0;      
        var cw, ch;
        var destU = 0;
		var	destV = 0;
        var currV = 0;
        var currU = 0;      
        var filesLoaded = 0;
        var mx,
            my; 
        var ctx = this, zw;
        // Display an image loading message. This message gets deleted when the images have loaded and the zoom init function is called.
        // We add a small delay before the message is displayed to avoid the message flicking on then off again virtually immediately if the
        // images load really fast, e.g. from the cache. 
        //var	ctx = this;
        setTimeout(function () {
            //						 <img src="/images/loading.gif"/>
            if ($mouseTrap === null) {
                var w = jWin.width();
                jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', w / 3, (w / 2) - (w / 6))).find(':last').css('opacity', 0.5);
            }
        }, 200);


        var ie6FixRemove = function () {

            if ($ie6Fix !== null) {
                $ie6Fix.remove();
                $ie6Fix = null;
            }
        };

        // Removes cursor, tint layer, blur layer etc.
        this.removeBits = function () {
            //$mouseTrap.unbind();
            if (lens) {
                lens.remove();
                lens = null;             
            }
            if ($tint) {
                $tint.remove();
                $tint = null;
            }
            if (softFocus) {
                softFocus.remove();
                softFocus = null;
            }
            ie6FixRemove();

            $('.cloud-zoom-loading', jWin.parent()).remove();
        };


        this.destroy = function () {
            jWin.data('zoom', null);

            if ($mouseTrap) {
                $mouseTrap.unbind();
                $mouseTrap.remove();
                $mouseTrap = null;
            }
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null;
            }
            //ie6FixRemove();
            this.removeBits();
            // DON'T FORGET TO REMOVE JQUERY 'DATA' VALUES
        };


        // This is called when the zoom window has faded out so it can be removed.
        this.fadedOut = function () {
            
			if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null;
            }
			 this.removeBits();
            //ie6FixRemove();
        };

        this.controlLoop = function () {
            if (lens) {
                
                var par = $('img', jWin).parentsUntil('.cloud-zoom');
                var xOff = parseInt(par.css('paddingLeft')) + parseInt(par.css('marginLeft'));
                var yOff = parseInt(par.css('paddingTop')) + parseInt(par.css('marginTop'));
        
                var x = (mx - sImg.offset().left - (cw * 0.5)) >> 0;
                var y = (my - sImg.offset().top - (ch * 0.5)) >> 0;
               
                if (x < 0) {
                    x = 0;
                }
                else if (x > (sImg.outerWidth() - cw)) {
                    x = (sImg.outerWidth() - cw);
                }
                if (y < 0) {
                    y = 0;
                }
                else if (y > (sImg.outerHeight() - ch)) {
                    y = (sImg.outerHeight() - ch);
                }

                lens.css({
                    left: x + xOff,
                    top: y + yOff
                });
                lens.css('background-position', (-x) + 'px ' + (-y) + 'px');

                destU = (((x) / sImg.outerWidth()) * zoomImage.width) >> 0;
                destV = (((y) / sImg.outerHeight()) * zoomImage.height) >> 0;
                currU += (destU - currU) / opts.smoothMove;
                currV += (destV - currV) / opts.smoothMove;

                zoomDiv.css('background-position', (-(currU >> 0) + 'px ') + (-(currV >> 0) + 'px'));              
            }
            controlTimer = setTimeout(function () {
                ctx.controlLoop();
            }, 30);
        };

        this.init2 = function (img, id) {

            filesLoaded++;
            //console.log(img.src + ' ' + id + ' ' + img.width);	
            if (id === 1) {
                zoomImage = img;
            }
            //this.images[id] = img;
            if (filesLoaded === 2) {
                this.init();
            }
        };

        /* Init function start.  */
        this.init = function () {
            // Remove loading message (if present);
            $('.cloud-zoom-loading', jWin.parent()).remove();


/* Add a box (mouseTrap) over the small image to trap mouse events.
		It has priority over zoom window to avoid issues with inner zoom.
		We need the dummy background image as IE does not trap mouse events on
		transparent parts of a div.
		*/
		    var pos = $(jWin).position();
		
		    var par = $('img', jWin).parentsUntil('.cloud-zoom');
	        var xOff = parseInt(par.css('paddingLeft')) + parseInt(par.css('marginLeft'));
	        var yOff = parseInt(par.css('paddingTop')) + parseInt(par.css('marginTop'));
		
            $mouseTrap = jWin.parent()
                .append(format(
                    "<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>", 
                    sImg.outerWidth(), 
                    sImg.outerHeight(), 
                    pos.left + xOff,
                    pos.top + yOff
                )).find(':last');

            //////////////////////////////////////////////////////////////////////			
            /* Do as little as possible in mousemove event to prevent slowdown. */
            $mouseTrap.bind('mousemove', this, function (event) {
                // Just update the mouse position
                mx = event.pageX;
                my = event.pageY;
            });
            //////////////////////////////////////////////////////////////////////					
            $mouseTrap.bind('mouseleave', this, function (event) {
                clearTimeout(controlTimer);
                //event.data.removeBits();                
				if(lens) { lens.fadeOut(299); }
				if($tint) { $tint.fadeOut(299); }
				if(softFocus) { softFocus.fadeOut(299); }
				zoomDiv.fadeOut(300, function () {
                    ctx.fadedOut();
                });																
                return false;
            });
            //////////////////////////////////////////////////////////////////////			
            $mouseTrap.bind('mouseenter', this, function (event) {
				mx = event.pageX;
                my = event.pageY;
                zw = event.data;
                if (zoomDiv) {
                    zoomDiv.stop(true, false);
                    zoomDiv.remove();
                }

                var xPos = parseFloat(opts.adjustX),
                    yPos = parseFloat(opts.adjustY);
                             
                var siw = sImg.outerWidth();
                var sih = sImg.outerHeight();

                var w = opts.zoomWidth;
                var h = opts.zoomHeight;
                if (opts.zoomWidth == 'auto') {
                    w = siw;
                }
                if (opts.zoomHeight == 'auto') {
                    h = sih;
                }
                //$('#info').text( xPos + ' ' + yPos + ' ' + siw + ' ' + sih );
                var appendTo = jWin.parent(); // attach to the wrapper			
                switch (opts.position) {
                case 'top':
                    yPos -= h; // + opts.adjustY;
                    break;
                case 'right':
                    xPos += siw; // + opts.adjustX;					
                    break;
                case 'bottom':
                    yPos += sih; // + opts.adjustY;
                    break;
                case 'left':
                    xPos -= w; // + opts.adjustX;					
                    break;
                case 'inside':
                    w = siw;
                    h = sih;
                    break;
                    // All other values, try and find an id in the dom to attach to.
                default:
                    appendTo = $('#' + opts.position);
                    // If dom element doesn't exit, just use 'right' position as default.
                    if (!appendTo.length) {
                        appendTo = jWin;
                        xPos += siw; //+ opts.adjustX;
                        yPos += sih; // + opts.adjustY;	
                    } else {
                        w = appendTo.innerWidth();
                        h = appendTo.innerHeight();
                    }
                }

                var pos = jWin.position();
                xPos += pos.left;
                yPos += pos.top;
                
                var par = $('img', jWin).parentsUntil('.cloud-zoom');
                xPos += parseInt(par.css('paddingLeft')) + parseInt(par.css('marginLeft'));
                yPos += parseInt(par.css('paddingTop')) + parseInt(par.css('marginTop'));

                zoomDiv = appendTo
                    .append(format(
                        '<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>', 
                        xPos, 
                        yPos, 
                        w, 
                        h, 
                        zoomImage.src
                    )).find(':last');

                // Add the title from title tag.
                if (sImg.attr('title') && opts.showTitle) {
                    zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>', sImg.attr('title'))).find(':last').css('opacity', opts.titleOpacity);
                }

                // Fix ie6 select elements wrong z-index bug. Placing an iFrame over the select element solves the issue...		
                if ($.browser.msie && $.browser.version < 7) {
                    $ie6Fix = $('<iframe frameborder="0" src="#"></iframe>').css({
                        position: "absolute",
                        left: xPos,
                        top: yPos,
                        zIndex: 99,
                        width: w,
                        height: h
                    }).insertBefore(zoomDiv);
                }

                zoomDiv.fadeIn(500);

                if (lens) {
                    lens.remove();
                    lens = null;
                } /* Work out size of cursor */
                cw = (sImg.outerWidth() / zoomImage.width) * zoomDiv.width();
                ch = (sImg.outerHeight() / zoomImage.height) * zoomDiv.height();

                var par = $('img', jWin).parentsUntil('.cloud-zoom');
                var xOff = parseInt(par.css('paddingLeft')) + parseInt(par.css('marginLeft'));
                var yOff = parseInt(par.css('paddingTop')) + parseInt(par.css('marginTop'));

                // Attach mouse, initially invisible to prevent first frame glitch
                lens = jWin
                    .append(format(
                        "<div class='cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",
                        cw,
                        ch
                    )).find(':last');

                $mouseTrap.css('cursor', lens.css('cursor'));

                var noTrans = false;

                // Init tint layer if needed. (Not relevant if using inside mode)			
                if (opts.tint) {
                    lens.css('background', 'url("' + sImg.attr('src') + '")');
                    $tint = jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', sImg.outerWidth(), sImg.outerHeight(), opts.tint)).find(':last');
                    $tint.css('opacity', opts.tintOpacity);                    
					noTrans = true;
					$tint.fadeIn(500);
                }
                
                if (opts.softFocus) {
                    lens.css('background', 'url("' + sImg.attr('src') + '")');
                    softFocus = jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', sImg.outerWidth() - 2, sImg.outerHeight() - 2, opts.tint)).find(':last');
                    softFocus.css('background', 'url("' + sImg.attr('src') + '")');
                    softFocus.css('opacity', 0.5);
                    noTrans = true;
                    softFocus.fadeIn(500);
                }

                if (!noTrans) {
                    lens.css('opacity', opts.lensOpacity);										
                }
				if ( opts.position !== 'inside' ) { lens.fadeIn(500); }

                // Start processing. 
                zw.controlLoop();

                return; // Don't return false here otherwise opera will not detect change of the mouse pointer type.
            });
        };

        img1 = new Image();
        $(img1).load(function () {
            ctx.init2(this, 0);
        });
        img1.src = sImg.attr('src');

        img2 = new Image();
        $(img2).load(function () {
            ctx.init2(this, 1);
        });
        img2.src = jWin.attr('href');
    }

    $.fn.CloudZoom = function (options) {
        // IE6 background image flicker fix
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        this.each(function () {
			var	relOpts, opts;
			// Hmm...eval...slap on wrist.
			eval('var	a = {' + $(this).attr('rel') + '}');
			relOpts = a;
            if ($(this).is('.cloud-zoom')) {
                $(this).css({
                    'position': 'relative',
                    'display': 'block'
                });
                $('img', $(this)).css({
                    'display': 'block'
                });
                // Wrap an outer div around the link so we can attach things without them becoming part of the link.
                // But not if wrap already exists.
                if (!$(this).parent().is('.cloudzoom-wrapper')) {
                    $(this).wrap('<div class="cloudzoom-wrapper" style="top:0px;z-index:1000;position:relative;"></div>');
                }
                opts = $.extend({}, $.fn.CloudZoom.defaults, options);
                opts = $.extend({}, opts, relOpts);
                $(this).data('zoom', new CloudZoom($(this), opts));

            } else if ($(this).is('.cloud-zoom-gallery')) {
                opts = $.extend({}, relOpts, options);
                $(this).data('relOpts', opts);
                $(this).bind('click', $(this), function (event) {
                    var data = event.data.data('relOpts');
                    // Destroy the previous zoom
                    $('#' + data.useZoom).data('zoom').destroy();
                    // Change the biglink to point to the new big image.
                    $('#' + data.useZoom).attr('href', event.data.attr('href'));
                    // Change the small image to point to the new small image.
                    $('#' + data.useZoom + ' img').attr('src', event.data.data('relOpts').smallImage);
                    // Init a new zoom with the new images.				
                    $('#' + event.data.data('relOpts').useZoom).CloudZoom();
                    return false;
                });
            }
        });
        return this;
    };

    $.fn.CloudZoom.defaults = {
        zoomWidth: 'auto',
        zoomHeight: 'auto',
        position: 'right',
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: true,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    };

})(jQuery);;
(function($){
    
    Drupal.behaviors.ckeditorPath = {
        attach: function(){
            window.CKEDITOR_BASEPATH = Drupal.settings.basePath+'sites/all/libraries/ckeditor/';           
        }
    }
    
})(jQuery);
;
adroll_adv_id = "UGJ6YTKJWRECRGQKKBII63";
adroll_pix_id = "PKQ6ZOE7S5EFVNE7RFO2I7";
(function () {
var oldonload = window.onload;
window.onload = function(){
  __adroll_loaded=true;
  var scr = document.createElement("script");
  var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
  scr.setAttribute('async', 'true');
  scr.type = "text/javascript";
  scr.src = host + "/j/roundtrip.js";
  ((document.getElementsByTagName('head') || [null])[0] ||
   document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
  if(oldonload){oldonload()}};
}());;
