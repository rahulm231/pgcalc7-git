/**
Core script to handle the entire theme and core functions
**/

var Layout = function() {

    var layoutImgPath = 'layout/img/';

    var layoutCssPath = 'layout/css/';

    var resBreakpointMd = App.getResponsiveBreakpoint('md');

    //* BEGIN:CORE HANDLERS *//
    // this function handles responsive layout on screen size resize or mobile device rotate.

    // Handles header
    var handleHeader = function() {
        // handle search box expand/collapse        
        $('.page-header').on('click', '.search-form', function(e) {
            $(this).addClass("open");
            $(this).find('.form-control').focus();

            $('.page-header .search-form .form-control').on('blur', function(e) {
                $(this).closest('.search-form').removeClass("open");
                $(this).unbind("blur");
            });
        });

        // handle hor menu search form on enter press
        $('.page-header').on('keypress', '.hor-menu .search-form .form-control', function(e) {
            if (e.which == 13) {
                $(this).closest('.search-form').submit();
                return false;
            }
        });

        // handle header search button click
        $('.page-header').on('mousedown', '.search-form.open .submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.search-form').submit();
        });

        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        $('body').on('click', '.page-header-top-fixed .page-header-top .menu-toggler', function() {
            App.scrollTop();
        });

        // CWRU handle same page navigation links
        $(".nav-btn").click(function(e) {
            e.preventDefault();
            var url = $(this).prop("href");
            var scrollto = url.substring(url.indexOf("#") + 1);
            var position = $("#" + scrollto).offset().top;

            $('html, body').animate({
                scrollTop: position
            }, 500);
        });

    };

    // Handles main menu
    var handleMainMenu = function() {

        // handle menu toggler icon click
        $(".page-header .menu-toggler").on("click", function(event) {
            if (App.getViewPort().width < resBreakpointMd) {
                var menu = $(".page-header .page-header-menu");
                if (menu.is(":visible")) {
                    menu.slideUp(300);
                } else {
                    menu.slideDown(300);
                }

                if ($('body').hasClass('page-header-top-fixed')) {
                    App.scrollTop();
                }
            }
        });

        // handle sub dropdown menu click for mobile devices only
        $(".hor-menu .menu-dropdown > a, .hor-menu .dropdown-submenu > a").on("click", function(e) {
            if (App.getViewPort().width < resBreakpointMd) {
                if ($(this).next().hasClass('dropdown-menu')) {
                    //            e.stopPropagation();
                    if ($(this).parent().hasClass("opened")) {
                        $(this).parent().removeClass("opened");
                    } else {
                        $(this).parent().addClass("opened");
                    }
                }
            }
        });

        // CWRU handle hover dropdown menu for desktop devices only
        if (App.getViewPort().width >= resBreakpointMd) {
            $('.hor-menu [data-hover="megamenu-dropdown"]').not('.hover-initialized').each(function() {
                $(this).dropdownHover();
                $(this).addClass('hover-initialized');
            });
        }

        // CWRU handle auto scroll to selected sub menu node on mobile devices
        $(document).on('click', '.hor-menu .menu-dropdown > a[data-hover="megamenu-dropdown"]', function() {
            if (App.getViewPort().width < resBreakpointMd) {
                App.scrollTo($(this));
            }
        });

        // close main menu on final link click for mobile mode
        $(".hor-menu li > a").on("click", function(e) {
            if (App.getViewPort().width < resBreakpointMd) {
                if (!$(this).parent('li').hasClass('classic-menu-dropdown') && !$(this).parent('li').hasClass('mega-menu-dropdown') && !$(this).parent('li').hasClass('dropdown-submenu')) {
                    $(".page-header .page-header-menu").slideUp(300);
                    App.scrollTop();
                }
            }
        });

        // hold mega menu content open on click/tap. 
        $(document).on('click', '.mega-menu-dropdown .dropdown-menu, .classic-menu-dropdown .dropdown-menu', function(e) {
            e.stopPropagation();
        });

        // CWRU handle fixed mega menu(minimized) 
        $(window).scroll(function() {
            var offset = 220; // CWRU demo_header1.html
            if ($('body').hasClass('page-header-menu-fixed')) {
                if ($(window).scrollTop() > offset) {
                    $(".page-header-menu").addClass("fixed");
                } else {
                    $(".page-header-menu").removeClass("fixed");
                }
            }

            if ($('body').hasClass('page-header-top-fixed')) {
                if ($(window).scrollTop() > offset) {
                    $(".page-header-top").addClass("fixed");
                } else {
                    $(".page-header-top").removeClass("fixed");
                }
            }
        });

        $(window).scroll(function() {
            var offset2 = 213; // demo_header2.html
            if ($('body').hasClass('page-header-menu-fixed-alt')) {
                if ($(window).scrollTop() > offset2) {
                    $(".page-header-menu").addClass("fixed");
                } else {
                    $(".page-header-menu").removeClass("fixed");
                }
            }

            if ($('body').hasClass('page-header-top-fixed-alt')) {
                if ($(window).scrollTop() > offset2) {
                    $(".page-header-top").addClass("fixed");
                } else {
                    $(".page-header-top").removeClass("fixed");
                }
            }
        });


        $(window).scroll(function() {
            var offset3 = 211; // demo_header3.html
            if ($('body').hasClass('page-header-menu-fixed-no-department')) {
                if ($(window).scrollTop() > offset3) {
                    $(".page-header-menu").addClass("fixed");
                } else {
                    $(".page-header-menu").removeClass("fixed");
                }
            }

            if ($('body').hasClass('page-header-top-fixed-no-department')) {
                if ($(window).scrollTop() > offset3) {
                    $(".page-header-top").addClass("fixed");
                } else {
                    $(".page-header-top").removeClass("fixed");
                }
            }
        });

        $(window).scroll(function() {
            var offset4 = 216; // demo_header4.html
            if ($('body').hasClass('page-header-menu-fixed-no-department-alt')) {
                if ($(window).scrollTop() > offset4) {
                    $(".page-header-menu").addClass("fixed");
                } else {
                    $(".page-header-menu").removeClass("fixed");
                }
            }

            if ($('body').hasClass('page-header-top-fixed-no-department-alt')) {
                if ($(window).scrollTop() > offset4) {
                    $(".page-header-top").addClass("fixed");
                } else {
                    $(".page-header-top").removeClass("fixed");
                }
            }
        });

    };

    // Handle sidebar menu links
    var handleMainMenuActiveLink = function(mode, el) {
        var url = location.hash.toLowerCase();

        var menu = $('.hor-menu');

        if (mode === 'click' || mode === 'set') {
            el = $(el);
        } else if (mode === 'match') {
            menu.find("li > a").each(function() {
                var path = $(this).attr("href").toLowerCase();
                // url match condition         
                if (path.length > 1 && url.substr(1, path.length - 1) == path.substr(1)) {
                    el = $(this);
                    return;
                }
            });
        }

        if (!el || el.size() == 0) {
            return;
        }

        if (el.attr('href').toLowerCase() === 'javascript:;' || el.attr('href').toLowerCase() === '#') {
            return;
        }

        // disable active states
        menu.find('li.active').removeClass('active');
        menu.find('li > a > .selected').remove();
        menu.find('li.open').removeClass('open');

        el.parents('li').each(function() {
            $(this).addClass('active');

            if ($(this).parent('ul.navbar-nav').size() === 1) {
                $(this).find('> a').append('<span class="selected"></span>');
            }
        });
    };

    // CWRU Handles main menu on window resize
    var handleMainMenuOnResize = function() {
        // handle hover dropdown menu for desktop devices only
        var width = App.getViewPort().width;
        var menu = $(".page-header-menu");

        if (width >= resBreakpointMd && menu.data('breakpoint') !== 'desktop') {
            // reset active states
            $('.hor-menu [data-toggle="dropdown"].active').removeClass('open');

            menu.data('breakpoint', 'desktop');
            $('.hor-menu [data-hover="megamenu-dropdown"]').not('.hover-initialized').each(function() {
                $(this).dropdownHover();
                $(this).addClass('hover-initialized');
            });
            $('.hor-menu .navbar-nav li.open').removeClass('open');
            $(".page-header-menu").css("display", "block");
        } else if (width < resBreakpointMd && menu.data('breakpoint') !== 'mobile') {
            // set active states as open
            $('.hor-menu [data-toggle="dropdown"].active').addClass('open');

            $(".page-header-menu").css("display", "none");
            menu.data('breakpoint', 'mobile');
            // disable hover bootstrap dropdowns plugin
            $('.hor-menu [data-hover="megamenu-dropdown"].hover-initialized').each(function() {
                $(this).unbind('hover');
                $(this).parent().unbind('hover').find('.dropdown-submenu').each(function() {
                    $(this).unbind('hover');
                });
                $(this).removeClass('hover-initialized');
            });
        } else if (width < resBreakpointMd) {
            //$(".page-header-menu").css("display", "none");  
        }
    };

    // Required for go to top button at the footer
    var handleContentHeight = function() {
        return;
        var height;

        if ($('body').height() < App.getViewPort().height) {
            height = App.getViewPort().height -
                $('.page-header').outerHeight() -
                ($('.page-container').outerHeight() - $('.page-content').outerHeight()) -
                $('.page-prefooter').outerHeight() -
                $('.page-footer').outerHeight();

            $('.page-content').css('min-height', height);
        }
    };

    // Handles the go to top button at the footer
    var handleGoTop = function() {
        var offset = 100;
        var duration = 500;

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
            $(window).bind("touchend touchcancel touchleave", function(e) {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                } else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        } else { // general 
            $(window).scroll(function() {
                if ($(this).scrollTop() > offset) {
                    $('.scroll-to-top').fadeIn(duration);
                } else {
                    $('.scroll-to-top').fadeOut(duration);
                }
            });
        }

        $('.scroll-to-top').click(function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    };

    // CWRU Handles focus on dropdowns to add accessibility to selected menu
    var handleDropdownAccess = function() {
        var i = 0;
        var accessDrop = $('nav.navbar-desktop').find('> ul > li').each(function() {
            $(this).attr('data-id', i);
            i++;
        });
        i = '';
        accessDrop.focusin(function() {
            clearit = '';
            if ($(this).attr('data-id') != i) {
                $(this).addClass('open');
                if (i != '') {
                    $(accessDrop[i]).removeClass('open');
                }
                i = $(this).attr('data-id');
            }
        });
        accessDrop.focusout(function() {
            clearit = 'clear';
            setTimeout(function() {
                if (clearit == 'clear') {
                    $(accessDrop[i]).removeClass('open');
                }
            }, 15);
        });

        // mobile drill down navigation
        $('.arrow').click(function(e) {
            e.preventDefault();
            var clicked = $(this);

            // open the clicked item
            var item = clicked.parent().next('ul');
            if (item.is(':hidden')) {
                item.slideDown(300);
                clicked.addClass('opened');
            } else {
                item.slideUp(300);
                clicked.removeClass('opened');
            }
        });
    };

    // CWRU look at the url and match links in the nav to set 'active' and 'current' classes
    $(document).ready(function() {
        // grab the url to see where you are
        var urlHolder = window.location.pathname
        var urlPieces = urlHolder.split("/");
        // first make adjustments to the top nav
        if ((urlPieces.length) == 4) {
            $(".navbar-desktop a[href='" + urlHolder + "']").parent().addClass('active');
            $(".navbar-desktop a[href='" + urlHolder + "']").parentsUntil('ul.nav').addClass('active');
        } else if ((urlPieces.length) > 4) {
            $(".navbar-desktop a[href='" + "/" + urlPieces[1] + "/" + urlPieces[2] + "/" + urlPieces[3] + "/" + "']").parent().addClass('active');
            $(".navbar-desktop a[href='" + "/" + urlPieces[1] + "/" + urlPieces[2] + "/" + urlPieces[3] + "/" + "']").parentsUntil('ul.nav').slice(2).addClass('active');
        }
        // now take a look at the sidebar and add states based on three levels
        if ((urlPieces.length) == 5) {
            $(".page-sidebar a[href='" + urlHolder + "']").parent().addClass('open active current');
        } else if (((urlPieces.length) == 6) && (urlPieces[5] == "")) {
            $(".page-sidebar a[href='" + urlHolder + "']").parent().addClass('open current');
            $(".page-sidebar a[href='" + "/" + urlPieces[1] + "/" + urlPieces[2] + "/" + urlPieces[3] + "/" + "']").parent().addClass('open active');
        } else if (((urlPieces.length) == 6) && (urlPieces[5] != "")) {
            $(".page-sidebar a[href='" + urlHolder + "']").parent().addClass('current');
            $(".page-sidebar a[href='" + "/" + urlPieces[1] + "/" + urlPieces[2] + "/" + urlPieces[3] + "/" + urlPieces[4] + "/" + "']").parent().addClass('open');
            $(".page-sidebar a[href='" + "/" + urlPieces[1] + "/" + urlPieces[2] + "/" + urlPieces[3] + "/" + "']").parent().addClass('open active');
        }




        function waitForElement(elementPath){
            window.setTimeout(function() {
                ($(elementPath).length) ? endit() : waitForElement(elementPath);
            }, 500)
        }
        function endit() {
            //take care of search bar flip
            if (urlPieces[2] == 'results') {
                var tabsholder = $('.gsc-tabsArea > div > div').each(function() {
                    if($(this)[0].tabIndex == 0) {
                        $('.gsc-tabsArea > div > span:first').after($(this));
                    } else {
                        $('.gsc-tabsArea > div').prepend($(this));
                    }
                });
            }
        }
        waitForElement('.gsc-tabsArea');

        //adjust the aside to load below the body content
        window.addEventListener("resize", asideMover);
        var asideHolder = ($("body").not("#subpage-three-column, #staff-profile")).find("div.body-column aside");
        var contentBlockHolder = $("body").not("#subpage-three-column, #staff-profile").find("div.body-column");
        function asideMover() {
            (App.getViewPort().width < App.getResponsiveBreakpoint('sm')) ? contentBlockHolder.append(asideHolder) : contentBlockHolder.prepend(asideHolder);
        }

        // on page load find out the width of the menu
        var desktopMenuSizeAdder = 0;
        var desktopMenuSize = $("nav.navbar-desktop>ul>li").each(function() {
            desktopMenuSizeAdder += Number($(this).width());
        })
        // console.log(desktopMenuSizeAdder);
            
        // eq heights for sidebar and main content border - compare heights and make the changes
        var sidebarHolder = $(".sidebar-desktop");
        if (sidebarHolder.height() > sidebarHolder.next().height()) {
            sidebarHolder.next().css('border-left', 'none');
            sidebarHolder.css({
                'margin-bottom': '0px',
                'padding-bottom': '36px',
                'border-right': '1px solid #eeeeee'
            });
        };

        // This will add contents of tabbed group to the empty .print-mode div which will only render when printing
        $(".tab-section").each(function() {
            $(this).append('<div class="print-mode"></div>');
            $(this).find(".print-mode").append($(this).find(".tabbable").html());
        })

        // This set of calls closes all tab and accordion groups
        // With JS turned off all are set to appear open
        $("div.tab-section .tabbable ul.nav.nav-tabs.sub").each(function() {
            $("div.tab-section ul.nav.nav-tabs:not('.sub')").append('<li>' + $(this).find(">li:nth-child(2)").html() + '</li>');
            $(this).hide().find("+div.tab-pane.fade.active.in").removeClass("active").removeClass("in");
        })
        $("section.tab-section .tabbable ul.nav.nav-tabs.sub").each(function() {
            $("section.tab-section ul.nav.nav-tabs:not('.sub')").append('<li>' + $(this).find(">li:nth-child(2)").html() + '</li>');
            $(this).hide().find("+div.tab-pane.fade.active.in").removeClass("active").removeClass("in");
        })
        $("section div.panel-collapse.collapse.in").removeClass("in");
        $("section a.accordion-toggle.accordion-toggle-styled.collapse").addClass("collapsed");
        $("div div.panel-collapse.collapse.in").removeClass("in");
        $("div a.accordion-toggle.accordion-toggle-styled.collapse").addClass("collapsed");
        $('.nav-tabs').tabdrop('layout');

        
    })
    // Window event listener to look for a ctrl+f, cmd+f, or F3
    // If the key is pressed - open all tabs and accordions to make them searchable
    window.addEventListener("keydown", function(e) {
        if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
            $("ul.nav.nav-tabs:not('.sub')").find(">li:nth-child(2)").addClass("active");
            $("ul.nav.nav-tabs:not('.sub')").find(">li:gt(1)").removeClass("active").html("");
            $("ul.nav.nav-tabs:not('.sub')").find("+div").addClass("active").addClass("in");
            $("ul.nav.nav-tabs.sub").show().find("+div.tab-pane.fade").addClass("active").addClass("in");
            $("section div.panel-collapse.collapse").addClass("in").css("height", "");
            $("section a.accordion-toggle.accordion-toggle-styled").removeClass("collapsed");
            $("div div.panel-collapse.collapse").addClass("in").css("height", "");
            $("div a.accordion-toggle.accordion-toggle-styled").removeClass("collapsed");
        }
    })



    handleDropdownAccess();

    //* END:CORE HANDLERS *//

    return {

        // Main init methods to initialize the layout
        // IMPORTANT!!!: Do not modify the core handlers call order.

        initHeader: function() {
            handleHeader(); // handles horizontal menu    
            handleMainMenu(); // handles menu toggle for mobile
            App.addResizeHandler(handleMainMenuOnResize); // handle main menu on window resize

            if (App.isAngularJsApp()) {
                handleMainMenuActiveLink('match'); // init sidebar active links 
            }
        },

        initContent: function() {
            handleContentHeight(); // handles content height 
        },

        initFooter: function() {
            handleGoTop(); //handles scroll to top functionality in the footer
        },

        init: function() {
            this.initHeader();
            this.initContent();
            this.initFooter();
        },

        setMainMenuActiveLink: function(mode, el) {
            handleMainMenuActiveLink(mode, el);
        },

        closeMainMenu: function() {
            $('.hor-menu').find('li.open').removeClass('open');

            if (App.getViewPort().width < resBreakpointMd && $('.page-header-menu').is(":visible")) { // close the menu on mobile view while laoding a page 
                $('.page-header .menu-toggler').click();
            }
        },

        getLayoutImgPath: function() {
            return App.getAssetsPath() + layoutImgPath;
        },

        getLayoutCssPath: function() {
            return App.getAssetsPath() + layoutCssPath;
        }
    };

}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        Layout.init(); // init metronic core componets
        // init jQuery Mobile Swipe
        $(".carousel").swiperight(function() {
            $(this).carousel('prev');
        });
        $(".carousel").swipeleft(function() {
            $(this).carousel('next');
        });
        // init FitVids
        $(".page-content-inner").fitVids();
        // CSS Tricks fix for lists
        $(function() {
            $(".user-content ul li")
                .wrapInner("<span>");
            $(".portlet-body ul li")
                .wrapInner("<span>");
            $(".panel-body ul li")
                .wrapInner("<span>");
            $(".tab-pane ul li")
                .wrapInner("<span>");
            $(".feed-container ul li")
                .wrapInner("<span>");
            $(".user-content ol li")
                .wrapInner("<span>");
            $(".portlet-body ol li")
                .wrapInner("<span>");
            $(".panel-body ol li")
                .wrapInner("<span>");
            $(".tab-pane ol li")
                .wrapInner("<span>");
        });
        // Apply CSS class for last subfeature
        $('main section:last div.subfeatures[class*="col-"]').each(function() {
            $(this).addClass('subfeatures-last');
        });
    });
}