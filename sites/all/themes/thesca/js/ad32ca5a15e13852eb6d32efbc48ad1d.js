jQuery(document).ready(function($){

  /**
   * Stuff for the WALL view(s)
   */
  var $wall = $('.view-spirit-wall'),
  	baseHeight = $('#wall-pledge').outerHeight(),
  	formHeight = $('#wall-pledge > .block-content').outerHeight() + 60,
  	isMSIE = /*@cc_on!@*/0;

  //add meta tag for responsive and other responsive stuff
  if ( $wall.length ) {
	  //$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');

	  $('a.lightbox-processed').clone().attr('rel','nada').attr('target','_blank').css('display','none').toggleClass('lightbox-clone lightbox-processed').insertAfter('a.lightbox-processed');

	  $(window).resize(function() {
		  if ( $(this).width() < 940 ) {
				$('a.lightbox-processed:visible').hide();
				$('a.lightbox-clone:hidden').show();
		  } else {
				$('a.lightbox-processed:hidden').show();
				$('a.lightbox-clone:visible').hide();
		  }
	  }).resize();

		if ( $('#sca-wall-alumni-form').length ) {
			formHeight += 44;
		}
  }

  //add the more box
  if ( $('.pager-next', $wall).length ) {
	  $('.view-content', $wall).append('<div class="views-row views-more node">more</div>');
  }

  //remove label colons because they suck
  $('#wall-pledge label').each(function() {
	  this.innerHTML = this.innerHTML.replace(":","");
  });

  //Fix the uploader for IE
  if (isMSIE) {
	  $('body').addClass('is-ie');
  }

  //hide labels, expand form
  $('#wall-pledge input[type="text"]:not([name="hours"]), #wall-pledge .form-textarea')
  	.focus(function() {
  		id = $(this).attr('id');
  		$('label[for="'+id+'"]:visible').fadeOut('fast');
  		if ( $('#wall-pledge').hasClass('closed')) $('#wall-pledge').trigger('switch');
	  })
	  .blur(function() {
  		id = $(this).attr('id');
		  if ( $(this).val() == "") $('label[for="'+id+'"]:hidden').fadeIn('fast');
	  })
	  .change(function() {
  		id = $(this).attr('id');
		  if ( $(this).val() != "") $('label[for="'+id+'"]:visible').fadeOut('fast');
	  });

	//file upload hack
	$('.form-item-files-photo .edit-photo', $wall).click(function() {
		if (!isMSIE) $("#edit-photo", $wall).trigger('click');
	});

	//monitor file upload status
	$('#edit-photo').change(function() {
		var file = (isMSIE) ? "uploaded" : $(this).val();
		if (file.length > 4 && !isMSIE) {
			var filename = file.replace(/^.*[\\\/]/, '');
			$('#edit-photo-wrapper .edit-photo').addClass('submitted').html(filename);
		} else {
			$('#edit-photo-wrapper .edit-photo').removeClass('submitted').html('Add a photo');
		}
	});

	//disable send button upon successful form submission
	$('#sca-wall-form, #sca-wall-alumni-form').bind('shutoff', function() {
		$('.form-submit', this).attr('value','sent!').css('visibility','hidden').css('height','0');	//ugly but it works!
	});

	//hovering on submissions
	$($wall).on('mouseenter', '.pledge', function() {
		var $this = $(this),
			$bubble = $('.pledge-content', $this),
			bubbleMove = $bubble.height() - 100;
		$this.addClass('hovered');
		$bubble.animate({
			opacity: 1,
			top: '-=' + bubbleMove
		}, 320);
	}).on('mouseleave', '.pledge', function() {
		var $this = $(this),
			$bubble = $('.pledge-content', $this),
			bubbleMove = $bubble.height() - 100;
		$bubble.animate({
			opacity: 0,
			top: '+=' + bubbleMove
		}, 180, function() {
			$this.removeClass('hovered');
		});
	});

  //click the more box to trigger the pager
  $(".views-more").bind('click', function() {
    $('.pager-next > a', $wall).trigger('click');
  });

  //override pager behavior
  $('.pager-next > a', $wall).bind('click', function(e) {
  	console.log('pager click');
  	var $this = $(this),
  		url = $this.attr('href');
    $.ajax({
    	dataType: 'html',
    	type: 'GET',
    	url: url,
	    complete: function(jqXHR, status) {	//use 'complete' instead of 'success' to circumvent error 500
	    	var data = $(jqXHR.responseText),
		    	$content = $('.view-spirit-wall .view-content > div', data),
		    	nextlink = $('.pager-next > a', data)[0];
	    	$('.views-more', $wall).before($content);
	    	if (nextlink && nextlink.href) {
	    		$this.attr('href', nextlink.href );
	    		$('.view-content', $wall)
						.isotope('appended', $content)
						.isotope('reLayout');
	    	} else {
		    	$('.views-more').fadeOut('fast', function() {
			    	$('.view-content', $wall).masonry('reload');
		    	});	//hide the more button if we're done
	    	}
	    }
    });
    e.stopPropagation();
    return false;
  });

  //dropdowns trigger filter w/no submit required
  $('.view-filters select', $wall).bind('change', function() {
    $('#edit-submit-walls').trigger('click');
  });

  //form expander, needs to work on field focus and control click
  //TO DO: implement field focus
  $('#wall-pledge .control').bind('click', function(e) {
	  $('#wall-pledge').trigger('switch');
	  e.stopPropagation();
  });

  $('#wall-pledge').bind('click', function() {
	  if ( $(this).hasClass('closed') ) {
		  $('#wall-pledge').trigger('switch');
	  }
  });

  $('#wall-pledge').bind('switch', function() {
	  var $this = $(this);
	  //open it up
	  if ($this.hasClass('closed')) {
	  	$this.height( $this.outerHeight() );
		  $this.animate({ height: formHeight }, 'slow');
		  $this.toggleClass('open').toggleClass('closed');
	  } else {
		  $this.animate({ height: baseHeight }, 'slow');
		  $this.toggleClass('open').toggleClass('closed');
	  }
  });

	if ( $.fn.isotope ) {
	  $('.view-content', $wall).isotope({
		  itemSelector: '.node',
		  containerStyle: {
			  position: 'relative'
		  }
	  });
  }
});;
