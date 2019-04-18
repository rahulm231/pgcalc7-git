(function() {
  var $, alignSlideArrows, openAccordions, prepSkipLinks, slideshows, verticalHero;

  $ = jQuery;

  $(document).foundation();

  prepSkipLinks = function() {
    $(".menu-skip-links").focusin(function() {
      return $(this).css({
        top: 0
      });
    });
    return $(".menu-skip-links").focusout(function() {
      return $(this).css({
        top: "-5em"
      });
    });
  };

  verticalHero = function() {
    var $hero, captionHeight;
    $hero = $('.vertical-hero');
    if ($hero.length === 0) {
      return;
    }
    captionHeight = $('.vertical-hero figcaption').outerHeight();
    console.log(captionHeight);
    if (captionHeight > 0) {
      return $('.vertical-hero .fill').css('bottom', captionHeight + 52 + "px");
    }
  };

  alignSlideArrows = function() {
    var asideSlideshows;
    asideSlideshows = $('.slideshow--aside.slick-initialized');
    return asideSlideshows.map(function(i, slideshow) {
      var $s, arrowHeight, figHeight;
      $s = $(slideshow);
      figHeight = $s.find('img,iframe').height() / 2;
      arrowHeight = $s.find('.slick-arrow').height() / 2;
      return $s.find('.slick-prev,.slick-next').css({
        'top': figHeight - arrowHeight
      });
    });
  };

  openAccordions = function() {
    var accordion, pane, ref;
    accordion = $('.open-accordion .accordion');
    pane = (ref = $('.accordion')) != null ? ref.find('.accordion-title').first() : void 0;
    if (pane.length > 0) {
      return accordion.foundation('down', pane);
    }
  };

  slideshows = function() {
    $(".slideshow--fourup").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      speed: 300,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }, {
          breakpoint: 650,
          settings: "unslick"
        }
      ]
    });
    $(".slideshow--threeup").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      speed: 300,
      responsive: [
        {
          breakpoint: 930,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 650,
          settings: "unslick"
        }
      ]
    });
    $(".slideshow--feature").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      speed: 300,
      responsive: [
        {
          breakpoint: 650,
          settings: "unslick"
        }
      ]
    });
    $(".slideshow--aside").on('init', function(event, slick) {
      if ($(this).parents(".vertical-hero").length > 0) {
        return verticalHero();
      }
    });
    $(".slideshow--aside").on('setPosition', function(event, slick) {
      return alignSlideArrows();
    });
    $(".slideshow--aside").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      speed: 300
    });
    return $(".slideshow--centered").slick({
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      speed: 300,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 650,
          settings: "unslick"
        }
      ]
    });
  };

  $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
    return $("#offCanvasRight").foundation('close');
  });

  $(window).load(function() {
    alignSlideArrows();
    slideshows();
    return $(".fit-media").fitVids();
  });

  $(document).ready(function() {
    prepSkipLinks();
    verticalHero();
    openAccordions();
    return $(window).on('resize.zf.trigger', function() {
      return verticalHero();
    });

    /*
    	listSortOptions = {
    		valueNames: ['name'],
    		listClass: "live-search-list",
    		searchClass: "live-search-box"
    	}
    	sortableList = new List('live-search-wrapper', listSortOptions)
     */
  });

}).call(this);
