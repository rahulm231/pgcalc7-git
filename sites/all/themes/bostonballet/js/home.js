var calendarContainer;
var datepicker;
var playerPlaceholder = "";

$(window).load(function () {
    $('video.vjs-tech').bind("play", function () {
        var keystore = this.id + "_play";
        if (playerPlaceholder.indexOf(keystore) == -1)
        {
            var video = $(this);
            PushVideoEvent('Play', video);
            playerPlaceholder += keystore;
        }        
    });

    $('video.vjs-tech').bind("timeupdate", function () {

        var player = videojs(this.id)
        var percent = (player.currentTime() / player.duration()) * 100;

        if (percent >= 25 && percent < 50) {
            var keystore = this.id + "_25%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 25%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 50 && percent < 75) {
            var keystore = this.id + "_50%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 50%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 75 && percent < 90) {
            var keystore = this.id + "_75%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 75%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 90 && percent < 99) {
            var keystore = this.id + "_90%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 90%', video);
                playerPlaceholder += keystore;
            }
        }
    });

    $('video.vjs-tech').bind("ended", function () {
        var keystore = this.id + "_100%Progress";
        if (playerPlaceholder.indexOf(keystore) == -1) {
            var video = $(this);
            PushVideoEvent('Reach 100%', video);
            playerPlaceholder += keystore;
        }
    });

    $('video.vjs-tech').bind("pause", function () {

        var player = videojs(this.id)
        var percent = (player.currentTime() / player.duration()) * 100;

        if (percent >= 25 && percent < 50) {
            var keystore = this.id + "_25%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 25%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 50 && percent < 75) {
            var keystore = this.id + "_50%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 50%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 75 && percent < 90) {
            var keystore = this.id + "_75%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 75%', video);
                playerPlaceholder += keystore;
            }
        }
        else if (percent >= 90 && percent < 99) {
            var keystore = this.id + "_90%Progress";
            if (playerPlaceholder.indexOf(keystore) == -1) {
                var video = $(this);
                PushVideoEvent('Reach 90%', video);
                playerPlaceholder += keystore;
            }
        }
    });

    $('video.vjs-tech').bind("ended", function () {
        var keystore = this.id + "_100%Progress";
        if (playerPlaceholder.indexOf(keystore) == -1) {
            var video = $(this);
            PushVideoEvent('Reach 100%', video);
            playerPlaceholder += keystore;
        }
    });

    function PushVideoEvent(action, video) {
        var btsTitle = video.closest('.item').find('.media-title').text();
        var productionTitle = video.closest('.interior-image').find('.large.light').text();
        var title = productionTitle + btsTitle;
        dataLayer.push({
            'event': 'videoTracking',
            'videoAction': action,
            'videoName': title
        });
    }
});


function CarouselDataPush(event, slick, currentSlide, nextSlide)
{
    var target = event.target.className;
    var change = nextSlide - currentSlide;
    var direction = (change == -1 || change > 1) ? "left" : "right";

    if(target.indexOf("quote") >= 0)
    {
        PushSlideEvent("Quote Module",direction);
    }
    else if (target.indexOf("productionslider") >= 0)
    {
        PushSlideEvent("Program Gallery Module",direction);
    }
    else if (target.indexOf("synopsisslider") >= 0) {
        PushSlideEvent("Program Details Module", direction);
    }
    else if (target.indexOf("cast") >= 0) {
        PushSlideEvent("Featured Cast Module", direction);
    }
    else if (target.indexOf("instagram") >= 0) {
        PushSlideEvent("Instagram Module", direction);
    }
    else if (target.indexOf("featuredcontent") >= 0) {
        console.log("Behind The Scenes Module", direction);
    }
}

function PushSlideEvent(moduleName, direction)
{
    dataLayer.push({
        'event': 'pdpScroll',
        'pdpModule': moduleName,
        'pdpScrollDirection': direction
    });
}

function setupSlick(isReinit) {
    isReinit = isReinit || false;
    
    if ($('.carousel.col1').length) {
      $('.carousel.col1').each(function (index, carousel) {
          var arrowsBool = ($(carousel).hasClass('counter') ? false : true);
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: false,
              infinite: true,
              speed: 1250,
              fade: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: arrowsBool
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
      });
  }

  if ($('.carousel.bars.fade').length) {
      $('.carousel.bars.fade').each(function (index, carousel) {
          var arrowsBool = ($(carousel).hasClass('counter') ? false : true);
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: true,
              infinite: true,
              speed: 300,
              fade: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: arrowsBool
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
      });
  }

  if ($('.carousel.bars.cast').length) {
      $('.carousel.bars.cast').each(function (index, carousel) {
          var arrowsBool = ($(carousel).hasClass('counter') ? false : true);
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              centerMode: true,
              centerPadding: '0',
              dots: true,
              infinite: true,
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: arrowsBool,
              responsive: [
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '22%',
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 490,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        centerPadding: '70px',
                        slidesToScroll: 1
                    }
                }
              ]
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
          $('.carousel.bars.cast .item').matchHeight();
      });
  }

  if ($('.carousel.bars.normal').length) {
      $('.carousel.bars.normal').each(function (index, carousel) {
          var arrowsBool = ($(carousel).hasClass('counter') ? false : true);
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: true,
              infinite: true,
              speed: 500,
              fade: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: arrowsBool
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
    });
  }

  if ($('.carousel.col2').length) {
      $('.carousel.col2').each(function (index, carousel) {
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: false,
              infinite: true,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
              ]
          }).on('breakpoint', function () {
              if ($(this).slick('slickGetOption', 'slidesToShow') != 1) {
                  $(this).slick('slickSetOption', 'initialSlide', 0, true); //refresh slick

              }
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
      });
  }

  if ($('.carousel.col3').length) {
      $('.carousel.col3').each(function (index, carousel) {
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: false,
              infinite: true,
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: false,
              responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
              ]
          }).on('breakpoint', function () {
              if ($(this).slick('slickGetOption', 'slidesToShow') != 1) {
                  $(this).slick('slickSetOption', 'initialSlide', 0, true); //refresh slick

              }
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
      });
  }

  if ($('.carousel.col5').length) {
      $('.carousel.col5').each(function (index, carousel) {
          isReinit && $(carousel).slick('unslick');
          $(carousel).slick({
              dots: false,
              infinite: true,
              speed: 300,
              slidesToShow: 5,
              slidesToScroll: 1,
              centerMode: true,
              swipeToSlide: true,
              arrows: true,
              responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        centerMode: true,
                        centerPadding: '200px',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 470,
                    settings: {
                        centerMode: true,
                        centerPadding: '130px',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        arrows: true
                    }
                },
                {
                    breakpoint: 430,
                    settings: {
                        centerMode: true,
                        centerPadding: '90px',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        arrows: true
                    }
                }
              ]
          }).on('breakpoint', function () {
              if ($(this).slick('slickGetOption', 'slidesToShow') != 1) {
                  $(this).slick('slickSetOption', 'initialSlide', 0, true);

              }
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              CarouselDataPush(event, slick, currentSlide, nextSlide);
          });
      });
  }
}

$(window).resize(function () {
    setupOrUpdateSocialVert(true);
});

window.onload = function () {

  $('.six-block .inner').matchHeight({byRow:false});  
  $('.align-center .cta-panel').matchHeight();
  $('.img-grid .column').matchHeight();
  $('.tri-grid .item .acc-cont .mH').matchHeight();
  $('.subs .columns .check-holder').matchHeight();

  if ($('.home').length ) {
    $('.home .inner').addClass('menu-bg-down').delay(2000).queue(function(downbg) {
      $(this).removeClass('menu-bg-down');
      downbg();
    });
  }

  if ($('#header').length ) {
    (function() {
        var header = document.querySelector("#header");
        if(window.location.hash) {
          header.classList.add("slide--up");
        }
        new Headroom(header, {
            offset : 0,
            tolerance: {
              down : 0,
              up : 20
            }
        }).init();
    }());
  }

  setupOrUpdateSocialVert();
  
  if ($('.cal-wrap .calendar').length ) {
      var date = new Date();
      
      var prodID = getParameterByName("prodID");
      if (prodID) {
         calendarContainer =  $('.calendar').Zebra_DatePicker({
              always_visible: $('#container'),
              days_abbr: true,
              direction: true,
              days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
              show_select_today: false,
              show_clear_date: false,
              first_day_of_week: 0,
              show_other_months: false,
              weekend_days: [],
              header_navigation: ['', ''],
              disabled_dates: ['*'],
              enabled_dates: LoadPerfDate(),
              onSelect: function (date, dateRaw, dateJS, element) {
                  LoadSelectedDate(date);
                  $(window).scrollTop($(document).height());
              }
              

          });
      }
    
  }
   
  if ($('.cal-wrap .calendar').length) {
      datepicker = calendarContainer.data('Zebra_DatePicker');
  }
  $('.mob-acc').click(function (event) {
      event.preventDefault();
      var menu = '#' + $(this).attr('acc-id');

      if ($(this).hasClass('active')) {
          $(menu).slideUp(500);
          $(this).removeClass('active');
          return;
      }

      $(this).addClass('active');
      $(menu).slideDown(500);
  });

  $('.filters .top li a').click(function (event) {
      event.preventDefault();
      var menu = '#' + $(this).attr('data-drawer');

      if ($(this).hasClass('selected')) {
          $('.filters .top .filterSection').removeClass('filterSectionOpen');
          $(this).removeClass('selected');
          $('.filters .bottom ul').addClass('hidden');
          $('.filters .bottom').slideDown(500);
          $(menu).removeClass('hidden');
          return;
      }

      if ($(this).hasClass('active')) {
          $('.filters .top .filterSection').removeClass('filterSectionOpen');
          $(this).removeClass('active');
          $('.filters .bottom').slideUp(500);
          $('.filters .bottom ul').addClass('hidden');
          return;
      }

      $('.filters .top .filterSection').addClass('filterSectionOpen');
      $('.filters .top li a').removeClass('active');
      $('.filters .bottom ul').addClass('hidden');
      $(menu).removeClass('hidden');
      $('.filters .bottom').slideDown(500);
      $(this).addClass('active');
  });

  $('.list .item .acc-open').click(function (event) {
      event.preventDefault();

      if ($(this).hasClass('active')) {
          $(this).closest('.item').find('.acc-cont').slideUp(500);
          $(this).removeClass('active');
          return;
      }

      $('.list .item .acc-open').removeClass('active');
      $('.list .item .acc-cont').slideUp(500);
      $(this).addClass('active');
      $(this).closest('.item').find('.acc-cont').slideDown(500);
  });

  $('.page-nav ul.control li a').click(function (event) {
      var menu = '#' + $(this).attr('data-nav');
      var subID = 'ul' + menu
      if ($(subID).length > 0)
      {
          event.preventDefault();


          if ($(this).hasClass('active')) {
              $(menu).fadeOut('slow');
              $('.page-nav .holder').slideUp(500);
              $('.page-nav ul.control li a').removeClass('active mobhide');
              return;
          }

          $('.page-nav .holder ul li a').removeClass('hidden');
          $('.page-nav .holder ul').css('display', 'none');
          $(menu).fadeIn('slow');
          $('.page-nav ul li a').removeClass('active');
          $('.page-nav ul.control li a').addClass('mobhide');
          $(this).addClass('active');
          $('.page-nav .holder').slideDown(500);
          if ( $( window ).width() > 767 ) {
            $('.page-nav .holder ul li a').addClass('animated navslidedown');
            $('.page-nav .holder ul ul li a').removeClass('animated navslidedown');
          }
      }
      else
      {
          if($(this).hasClass('active'))
          {
              $(menu).fadeOut('slow');
              $('.page-nav .holder').slideUp(500);
              $('.page-nav ul.control li a').removeClass('active mobhide');
          }
          $('.page-nav .holder ul li a').removeClass('hidden');
          $('.page-nav .holder ul').css('display', 'none');
      }
      
  });

  $('.page-nav .holder ul li a.lvl2').click(function (event) {
      
      var menu = '#' + $(this).attr('data-sub-nav');
      var subID = menu + ' li a';
      if ($(subID).length > 0)
      {
          event.preventDefault();
          if ($(this).hasClass('active')) {
              $(this).removeClass('active');
              $(menu).find('li a').fadeOut('slow');
              $(menu).css('display', 'none');
              $(this).parent().parent().find('li a').removeClass('hidden');
              return;
          }

          $(this).addClass('active');
          $(this).parent().parent().find('li a').not('.active').addClass('hidden');
          $(menu).css('display', 'inline');
          $(menu).find('li a').fadeIn('slow');
      }
      
  });

  if ($('.carousel.counter').length) {
      $('.carousel.counter').each(function (index, carousel) {
          $(carousel).on('init', function (event, slick) {
              if ($(this).hasClass('bars')) {
                  $(this).addClass((slick.slideCount > 5) ? "enable-counter" : "disable-counter");
              }
              if (slick.slideCount > 1) {
                  var cur_slide = slick.currentSlide + 1;
                  slide_tot = $(this).find('.slick-slide:not(.slick-cloned)').length;
                  $(this).after('<div class="counter-container"><button type="button" class="slick-prev slick-arrow slide-count-arrow custom">Next</button> <div class="slide-count">' + cur_slide + '/' + slide_tot + '</div> <button type="button" class="slick-next slick-arrow slide-count-arrow custom">Next</button></div>');
                  $(this).on('afterChange', function (event, currentSlide, nextSlide) {

                      $(this).next('.counter-container').find('.slide-count').text((nextSlide + 1) + '/' + ($(this).find('.slick-slide:not(.slick-cloned)').length));
                  });
                  $(this).next('.counter-container').find('.slick-next').on('click', function () {
                      slick.slickNext();
                      $(this).closest('.counter-container').prev().find('.thevideo').each(function () { pauseVideoPlayer(this); });
                  });
                  $(this).next('.counter-container').find('.slick-prev').on('click', function () {
                      slick.slickPrev();
                      $(this).closest('.counter-container').prev().find('.thevideo').each(function () { pauseVideoPlayer(this); });
                  });
              }
          });
      });
  }

  setupSlick();

  if ($('.carousel.slide-left').length ) {
      // On before slide change
      $('.carousel.slide-left').each(function (index, carousel) {
          $(carousel).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              $('.carousel.slide-left .item .inner h5').addClass('animated carhfivefadeInRight');
              $('.carousel.slide-left .item .inner h2').addClass('animated carfadeInRight');
              $('.carousel.slide-left .item .inner p').addClass('animated carfadeInRight');
          });
          $(carousel).on('afterChange', function (event, slick, currentSlide, nextSlide) {
              $('.carousel.slide-left').delay(600).queue(function (slidechange) {
                  $('.carousel.slide-left .item .inner h5').removeClass('animated carhfivefadeInRight');
                  $('.carousel.slide-left .item .inner h2').removeClass('animated carfadeInRight');
                  $('.carousel.slide-left .item .inner p').removeClass('animated carfadeInRight');
                  slidechange();
              });
          });
      });
  }

  if ($('.carousel.col1.white-left').length ) {
    // On before slide change
    $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.carousel.col1.white-left .item .large-12.columns').addClass('animated carfadeInRight');
      $('.carousel.col1.white-left .item.slick-current .large-12.columns').removeClass('animated carfadeInRight');
    }); 
    $(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.carousel.col1.white-left').delay(300).queue(function(slidechange) {
        $('.carousel.col1.white-left .item .large-12.columns').removeClass('animated carfadeInRight');
        slidechange();
      }); 
    }); 
  }

  $(document).ready(function($){
      // browser window scroll (in pixels) after which the "back to top" link is shown
      var offset = 150,
          //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
          offset_opacity = 1200,
          //duration of the top scrolling animation (in ms)
          scroll_top_duration = 700,
          //grab the "back to top" link
          $back_to_top = $('.fixed-cta');

      //hide or show the "back to top" link
      $(window).scroll(function(){
          ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cta-is-visible') : $back_to_top.removeClass('cta-is-visible cta-fade-out');
          if( $(this).scrollTop() > offset_opacity ) { 
              $back_to_top.addClass('cta-fade-out');
          }  
      });
  });  

};
var buttonPurchaseLink;
function LoadPerfDate()
{
    buttonPurchaseLink = $('.info-box a.button').attr("href");
    var prodID = getParameterByName("prodID");
    var result = [];
    if (prodID) {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/services/CalendarService.ashx",
            data: "MethodName=GetPerfs&prodID=" + prodID,
            dataType: "json",
            async: false,
            success: function (data) {

                var performanceBlock = "";
                var monthOptions = "<option value='-1' selected>Select a Month</option>";
                var yearOptions = "<option value='-1' selected>Select a Year</option>";
            $.each(data, function (key, value) {
                   
                if (value)
                {     
                    var datestring = value.Day + " " + (value.Month+1) + " " + value.Year;
                    result.push(datestring)

                    //building month options
                    var months = BuildMonthOptions(value);
                    if (monthOptions.indexOf(months) == -1)
                    {
                        monthOptions += months;
                    }

                    var years = BuildYearOptions(value);
                    if (yearOptions.indexOf(years) == -1) {
                        yearOptions += years;
                    }                        
                }
            });
                
                $('#monthSelect').html(monthOptions);
                $('#yearSelect').html(yearOptions);
            },
            
        });
    }    

    return result;
    
}


function LoadSelectedDate(date) {
    var prodID = getParameterByName("prodID");    
    if (date && prodID)
    {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/services/CalendarService.ashx",
            data: "MethodName=GetPerfsByDay&dateSelected=" + date + "&prodID=" + prodID,
            dataType: "json",
            async: false,
            success: function (data) {
                var performanceBlock = "";
                $('#radioContainer').html("");
                $.each(data, function (key, value) {
                    
                    $('.info-box').show();
                    
                    $('#showingSection').html(AbbreviatedMonthName(value.Month) + " " + value.Day + ", " + value.Year);
                    performanceBlock += RenderPerf(value);
                });
                $('#radioContainer').html(performanceBlock);
                $('#radioContainer input').change(function () {
                    $('.info-box a.button').show()
                    $('.info-box a.button').attr("href", buttonPurchaseLink + this.id);
                });
            },            
        });        
    }  
}



function BuildMonthOptions(value) {
    
    return "<option value='" + value.Month + "' >" + AbbreviatedMonthName(value.Month) + "</option>";
}

function BuildYearOptions(value) {
    
    return "<option value='" + value.Year + "'>" + value.Year + "</option>";
}

function RenderPerf(performance) {

    return "<input type='radio' name='show' id='" + performance.PerformanceNumber + "'><label for='" + performance.PerformanceNumber + "'><span></span><div class='inner'><p>" + performance.FormattedTime + "</p><h3>" + performance.Description + "</h3><p><i>" + performance.FacilityDescription + "</i></p></div></label>";
}

function DayOfTheWeek(int) {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[int];
}


function MonthName(int) {

    var Months = new Array(7);
    Months[0] = "January";
    Months[1] = "February";
    Months[2] = "March";
    Months[3] = "April";
    Months[4] = "May";
    Months[5] = "June";
    Months[6] = "July";
    Months[7] = "August";
    Months[8] = "September";
    Months[9] = "October";
    Months[10] = "November";
    Months[11] = "December";

    return Months[int];
}

function AbbreviatedMonthName(int) {

    var Months = new Array(7);
    Months[0] = "Jan";
    Months[1] = "Feb";
    Months[2] = "Mar";
    Months[3] = "Apr";
    Months[4] = "May";
    Months[5] = "June";
    Months[6] = "July";
    Months[7] = "Aug";
    Months[8] = "Sept";
    Months[9] = "Oct";
    Months[10] = "Nov";
    Months[11] = "Dec";

    return Months[int];
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setupOrUpdateSocialVert(update)
{
    update = update || false;
    var customOffset = 40; //postive number will make the .social-vert content be more towards the top when one is below the page content. 

    if ($('.social-vert').length) {
        var bottom = $(document).height() - $('.social-pos-ph-end').offset().top + 50 + customOffset; // 50 comes from the 'top' css property (or top margin for .social-vert)
        update && $(".social-vert").unstick();
        if (!isFoundationSmall()) {
            $(".social-vert").sticky({ topSpacing: 50, bottomSpacing: bottom });
        }
    }
}

function isFoundationSmall()
{
    return Foundation != null && Foundation.MediaQuery != null && Foundation.MediaQuery.current == 'small';
}

$(document).ready(function() {
    function checkDOMChange()
    {
        // check for any new element being inserted here,
        // or a particular node being modified

        // call the function again after 100 milliseconds
        if ( $('.nav-menu').length ) {
          $('.nav-menu').click(function() {
            $('body').addClass('menu-open');
            if ( $( window ).width() > 767 ) {
              $('header.home .inner').addClass('open');
              $('.nav-frame').removeClass('animated slideInDown NavslideOutUp');
              $('.nav-frame').addClass('open animated slideInDown');
              $('.nav-frame .main li').addClass('animated fadeInLeft');
              $('.nav-frame .border-left .perf').addClass('animated fadeInRight');
              $('.nav-frame .medium-6.columns').matchHeight();
              $('.nav-frame .perf').matchHeight();
              $('.nav-menu').delay(600).queue(function(opennav) {
                $('.nav-frame .close-button').addClass('open');
                opennav();
              });  
            }
            if ( $( window ).width() < 767 ) {
              $('#nav-frame').foundation('open');
            }
          });

          $('.nav-frame .close-button').click(function() {
            $('body').removeClass('menu-open');
            $('header.home .inner').removeClass('open');
            $('.nav-frame .close-button').removeClass('open');
            if ( $( window ).width() > 767 ) {
              $('.nav-frame').removeClass('animated slideInDown NavslideOutUp');
              $('.nav-frame .main li').removeClass('animated fadeInLeft');
              $('.nav-frame .border-left .perf').removeClass('animated fadeInRight');
              $('.nav-frame').addClass('animated NavslideOutUp').delay(1000).queue(function(opennav) {
                $('.nav-frame').removeClass('open');
                opennav();
              }); 
              $('header.home').addClass('no-hover');
            }
            if ( $(window).width() < 767 ) {      
              $('#nav-frame').foundation('close');
            }
          });
        }
        else {
            setTimeout( checkDOMChange, 100 );
        }
    }
    checkDOMChange();
});