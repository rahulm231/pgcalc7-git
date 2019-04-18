$(function () {
    var ldr = $('loader');
    ldr.each(function (i, el) {
        var src = $(el).attr('src');
        var tmp = $('<div />');
        $(tmp).load(src);
        $(el).replaceWith(tmp);
    });
});

$(function () {
    //initMap();
});

$(".interrupt img").click(function () {
    $(".interrupt").fadeOut("slow");
});

$('.fad-search .adv-search a.btn.btn-link.btn-link-forward.down-btn.m-show').unbind('click').click(function () {
    $(this).toggleClass('opn'); 
});

$(".panel-title .accordion-control a").click(function () {
    $(".panel-heading").addClass("hide");
});

//match height
$(function () {
    $('.full-width-cta .cta').matchHeight();
    $('.card-cta .panel-heading').matchHeight();
    $('.card-cta .panel-body').matchHeight();
    $('.fad-search-section').matchHeight();
    $('.about-loc div.ourTeam .profiles .doc-box').matchHeight();
    $('.fad-details div[class^="col-"]:nth-of-type(2) .detail-section .detail-card').matchHeight();


    $('.result-footer .btn.btn-link.btn-link-forward').click(function () {
        $('.about-loc div.ourTeam .profiles .doc-box').matchHeight();
    });

});

//home page video
$(function () {

    var $allVideos = $(".video-bg iframe[src^='//player.vimeo.com'], .video-bg iframe[src^='//www.youtube.com'], object, embed"), $fluidEl = $("figure");

    $allVideos.each(function () {

        $(this)
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });

    $(window).resize(function () {

        var newWidth = $fluidEl.width();
        $allVideos.each(function () {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.attr('data-aspectRatio'));

        });

    }).resize();

});

//custom
$(function () {
    //video banner container open/close
    $('.banner-btn').click(function () {
        $('.banner-btn').toggle('slow');
        $('.finder-body').parent().toggle('slow');
        $('.finder .click-area').toggle();
    });
    $('.finder .click-area').click(function () {
        $(this).toggle();
        $('.finder-body').parent().toggle('slow');
        $('.banner-btn').toggle('slow');
    });

    

    //end video banner container open/close
    //FAD taking new patients icon
    //$('.result').each(function() {
    //  if ($(this).hasClass('taking-new-patients')){
    //   $(this).find('.drname').append('<span class="new-patients"><img src="_img/check.png" alt="accepting new patients" />Accepting new patients</span>');
    // }
    //});
    //end taking new patients icon
    //scroll to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    $('.scrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    //end scroll to top button
});

//responsive

$(function (e) {
    var windowWidth = $(window).width();
    if (windowWidth < 768) {
        $(".search-head-wrapper .m-show.new-search").click(function () {
            $(this).toggleClass('up-arw');
            $(".div-ce-results .ce-drop-mob").slideToggle();
            e.preventDefault();
        });
        $('.search-drp.tab-show').click(function () {
            $(this).toggleClass('down');
            $('.icon-row').slideToggle();
            e.preventDefault();
        });
        $('.page .list-group.list-group-locations h4').click(function () {
            $('.page .list-group.list-group-locations').toggleClass('up-arw');
            $('.page .list-group.list-group-locations .list-group-item').slideToggle();
            $('.page .list-group.list-group-locations a#viewbtn.btn.loc-right-pad').slideToggle();
            e.preventDefault();

        });
        if ($('.mobile-swipe').length > 0) {
            $(".mobile-swipe").swiperight(function () {
                $(this).carousel('prev');
            });
            $(".mobile-swipe").swipeleft(function () {
                $(this).carousel('next');
            });
        }
       
    }

    enquire.register("screen and (min-width: 991px)", {
        match: function () {
            $('nav.navbar.navbar-munson.nmdi ul.nav li.dropdown').hover(function () {
                $(this).addClass("open");
            }, function () {
                $(this).removeClass("open");
            });
        },
        unmatch: function () {
        }
    });

    if (windowWidth < 992) {
        $('.navbar.navbar-munson .primary .navbar-header .search-btn').attr('type', 'button');
        $('.page.individual-site .navbar.navbar-munson .primary .navbar-collapse .navbar-right .micro-nav-right').insertAfter('.sub-nav .navbar .navbar-collapse');
        $('.sub-nav .navbar .micro-nav-right').attr('id', 'micro-nav-right');
        $('.sub-nav .navbar .navbar-header .navbar-toggle').attr('data-target', '#sub-nav, #micro-nav-right');
        $('<i class="fa fa-angle-down" aria-hidden="true"></i>').appendTo('.sub-nav .navbar .micro-nav-right button:not(.search-btn) span:last-of-type');
        $('.sub-nav .navbar .micro-nav-right button:not(.search-btn)').click(function () {
            $(this).toggleClass('active');
        });

        $('body.page.individual-site .sub-nav .navbar .navbar-collapse .navbar-nav > li.dropdown.hidden-md.hidden-lg').each(function () {
            $(this).click(function () {
                event.stopPropagation();
                $(this).children('.dropdown-menu').slideToggle();
                $(this).toggleClass("open");
            });
        });    

        $('.nav.navbar-nav > li.dropdown.hidden-md.hidden-lg').each(function () {
            $(this).click(function () {
                var parent = $(this)["0"].parentNode;
                var list = $(this)["0"].parentNode.children[2];
                $(list).slideToggle();
                $(parent).toggleClass("open");
            });
        });  
        
        $('body.page.individual-site .sub-nav .navbar .navbar-collapse .navbar-nav > li.dropdown li.dropdown').each(function () {
            $(this).click(function () {
                event.stopPropagation();
                $(this).children('.dropdown-menu').slideToggle();
                $(this).toggleClass("open");
            });
        });

        $('.sub-nav .navbar .navbar-collapse .navbar-nav > li.dropdown.white-nav .fa.fa-chevron-down').each(function () {
            $(this).click(function () {
                event.stopPropagation();
                var parent = $(this)["0"].parentNode;
                var list = $(this)["0"].parentNode.children[2];
                $(list).slideToggle();
                $(parent).toggleClass("open");
            });
        });
        
        $('.bio-drop h3').click(function () {
            $('.bio-drop ul').slideToggle();
            e.stopPropagation();
        });
        $('.sub-nav .navbar .navbar-header').click(function () {
            $(this).toggleClass('active');
        });

        $('.sidebar .list-group .show-click').prependTo('.sidebar');

        $('.sidebar .show-click').click(function () {
            $(this).toggleClass('active');
            $('.sidebar .list-group').slideToggle();
        });
        $('.left-content').insertBefore('.content.container');
    }
    if (windowWidth > 767) {
        var $ctaAmount = 100 / $('.full-width-cta .cta').length
        $('.full-width-cta .cta').css('width', $ctaAmount + '%');
    }
    else {
        $('.full-width-cta').bxSlider({
            controls: false,
            auto: true
        });
    }
});


$(document).ready(function () {

$( "iframe" ).wrap( "<div class='video-container'></div>" );


    enquire.register("screen and (max-width:991px)", {
        match: function () {

            $('.class-info-desc').each(function () {
                $(this).insertBefore('.c-det');
            });

            $('.ce-detail .back-to').each(function () {
                $(this).addClass('ce-detail ce-ban');
                $(this).insertBefore('.content-container > .container');
            });


            $('.interior-page-wrapper.find-a-doctor .fad-search .finder.text-only.shortBanner').each(function () {
                $(this).addClass('fad-ban');
                $(this).insertBefore('.content-container > .container');
            });

            $('.interior-page-wrapper.find-a-doctor .fad-results .finder.text-only.shortBanner').each(function () {
                $(this).addClass('fad-ban');
                $(this).insertBefore('.content-container > .container');
            });

            $('.search-filter').each(function () {
                $(this).insertBefore('.results-number');
            });

            $('.classes-cart').each(function () {
                $(this).insertBefore('.classes-header');
            });

            $('.back-bg').each(function () {
                $(this).insertAfter('.banner-header h1');
            });

            $('.make-appt').each(function () {
                $(this).insertAfter('.fad-detail-info');
            });

            $('.individual-site .container-fluid.cta-row .divCTA .divSecCta .container .history_rt .careers .promo .container .row .feature.mob-feat img').each(function () {
                $(this).insertBefore('.individual-site .container-fluid.cta-row .divCTA .divSecCta .container .history_rt .careers')
            });
        },
        unmatch: function () {

            $('.class-info-desc').each(function () {
                $(this).insertAfter('.c-det');
            });

            $('.ce-detail .back-to').each(function () {
                $(this).insertAfter('.ce-detail');
            });

            $('.interior-page-wrapper.find-a-doctor .fad-search .finder.text-only.shortBanner').each(function () {
                $(this).insertAfter('.interior-page-wrapper.find-a-doctor .fad-search');
            });

            $('.interior-page-wrapper.find-a-doctor .fad-results .finder.text-only.shortBanner').each(function () {
                $(this).insertAfter('.interior-page-wrapper.find-a-doctor .fad-results');
            });


            $('.search-filter').each(function () {
                $(this).insertAfter('.results-number');
            });

            $('.classes-cart').each(function () {
                $(this).insertAfter('.classes-header');
            });

            $('.banner-header').each(function () {
                $(this).insertBefore('.back-bg');
            });

            $('.make-appt').each(function () {
                $(this).insertBefore('.fad-details div[class^="col-"]:nth-of-type(2) .fad-detail-info div[class^="col-"]:last-of-type > span:nth-of-type(1)');
            });

            $('.individual-site .container-fluid.cta-row .divCTA .divSecCta .container .history_rt .careers .promo .container .row .feature.mob-feat img').each(function () {
                $(this).insertAfter('.careers .promo .container .content-lft-cta');
            });

        }
    });

    enquire.register("screen and (max-width:767px)", {
        match: function () {

            $('#newsImage').each(function () {
                $(this).insertBefore('.individual-site .featured-news');
            });

        },
        unmatch: function () {

            $('#newsImage').each(function () {
                $(this).insertAfter('.NewsItem .feature');
            });

        }
    });


});


var windowWidth = $(window).width();
$('.banner-header.tab-drop').unbind('click').click(function () {
    if (windowWidth < 991) {
        $(".banner-header.tab-drop").unbind('click').click(function () {
            $(".fad-results .search-filter").slideToggle();
        });
    }
});

$("#search-txt-input").keyup(function (event) {
    if (event.keyCode === 13) {
        $(".form-inline .btn.btn-primary").click();
    }
});

$('nav.navbar.navbar-munson.nmdi li.dropdown a').click(function () {

    var path = this.childNodes["0"].parentNode.attributes["0"].value;

    window.location = path;
});