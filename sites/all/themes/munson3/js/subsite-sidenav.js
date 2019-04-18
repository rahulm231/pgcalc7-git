$(document).ready(function () {
        // if ($(window).width() > 767) {
        //     $(window).scroll(function () {
        //         if ($(window).scrollTop() > 100) {
        //             $('.sub-nav').css({
        //                 'position': 'fixed',
        //                 'top': '0px',
        //                 'left': '50%',
        //                 'transform': 'translateX(-50%)',
        //                 'margin-top': '0px'
        //             });
        //         } else {
        //             $('.sub-nav').css({
        //                 'position': 'relative',
        //                 'top': 'none',
        //                 'margin-top': '30px'
        //             });
        //         }
        //     });
        // }
        var windowWidth = $(window).width();
        if (windowWidth < 768) {
            if ($('.sub-nav').length > 0) {
                $('.text-only').insertBefore('.sub-nav');
            }
            $('.sub-nav .navbar-toggle').click(function () {
                $('.navbar-toggle button').toggleClass('rotated');
            });
        }

        $('.list-group li[data-is-child="True"]').next('li[data-is-sub-child="True"]').each(function () {
            var childParent = $(this).prev();
            console.log(childParent.html());

            var subChildList = childParent.nextUntil('li[data-is-parent="True"]');
            //var subSubChildList = childParent.nextUntil('li[data-is-child="True"]');
            if (subChildList.length < 1) {
                if (childParent["0"].attributes[1].value == "False") {
                    subChildList = childParent.nextAll('li[data-is-child="True"]');
                    childParent.addClass('parent-item');
                }
                else {
                    childParent.removeClass('child-item');
                    childParent.addClass('grand-child-item');
                }

            }

            if (childParent["0"].attributes[3].value == "True") {
                childParent.addClass("parent-item");
                subChildList.appendTo(childParent);
                childParent.children('li[data-is-child="True"]').wrapAll('<ul></ul>');
            }

        });

        $('.list-group li[data-is-parent="True"]').next('li[data-is-child="True"]').each(function () {
            var parent = $(this).prev();
            var childList = parent.nextUntil('li[data-is-parent="True"]');
            childList.appendTo(parent);
            if (window.innerWidth < 991) {
                parent.children('li').wrapAll('<ul class="dropdown-menu"></ul>');
            }
            else {
                parent.children('li').wrapAll('<ul></ul>');

            }
            parent.addClass('parent-item');
        });

        $('.list-group .list-group-item + .fa', '.list-group .parent-item + .fa').click(function () {
            $(this).parent().toggleClass('active');
        })

        if ($('.parent-item ul li a.selected.list-group-item').length) {
            $('.parent-item ul li a.selected.list-group-item').parent().addClass("active");

            $('.parent-item ul li a.selected.list-group-item').parent().parent().parent().addClass("active");
            $('.parent-item ul li a.selected.list-group-item').parent().parent().parent().parent().parent().addClass("active");

        }

        if (window.innerWidth < 991) {
			if ( !$(' body ').hasClass("subsite-landing")) {
                                if ($('.list-group')["0"] != null) {
				    var sidelinks = $('.list-group')["0"].children;
				    $('#white-menu').append(sidelinks);
                                }
				if($(' .side-nav-sub #white-menu li').length >= 1){
					$(' .side-nav-sub ').show();
				}
                                if ($('.show-click h3 a')["0"] != null) {
				    var subTitle = $('.show-click h3 a')["0"].innerHTML;
				    var subNavTitle = $('.dropdown.white-nav a')
				    subNavTitle["0"].innerText = subTitle.replace(/&amp;/g, '&');
                                }
			}
            

            $('#white-menu .show-click').hide();

            var siteName = $('.individual-site .sub-nav .navbar .navbar-collapse .navbar-nav > li:first-child a')["0"].innerText.trim();
            $('nav.navbar.navbar-nav ul.nav.navbar-nav li.dropdown.hidden-md.hidden-lg a')["0"].innerText = siteName;

			$('#ctl00_SubsiteNav1_SiteNav').attr('href', 'javascript:void(0);');
			
			
			$('.sub-nav .navbar .navbar-collapse .navbar-nav > li.dropdown.white-nav .fa.fa-chevron-down').each(function () {
                $(this).click(function () {
                    event.stopPropagation()
                    $(this).parent('li').toggleClass('open');
                    $(this).siblings('ul').slideToggle();
                });
            });
        }
    });