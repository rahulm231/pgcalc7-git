$(window).load(function() {
  $('.flexslider.home-slide').flexslider({
    animation: "slide"
  });
});

(function() {

    var listingLinks = $('.page-nav a.page-link'),
        listingNextLink = $('.page-nav a.next-page'),
        listingPrevLink = $('.page-nav a.prev-page'),
        menuIcon = $('.mobile-menu a'),
        photoLinks = $('.page-nav .photo-link'),
        petDetailsPhoto = $('.pet-details .photo img'),
        introVideo = document.getElementById('intro-video'),
        adoptionNavLinks = $('.adoption-nav a.photo-link'),
        curPetPhoto = $('.photo img'),
        petVideo = $('.photo .video'),
        petVideoLink = $('.photo-nav a.video'),
        adoptionCategoryLinks = $('#animal-listings .adoption-nav a'),
        offsiteListing = $('#animal-listings .listing.offsite'),
        goldenPawListing = $('#animal-listings .listing.golden-paws'),
        diamondDogListing = $('#animal-listings .listing.diamond-dogs'),
        ambassadorLink = $('.ambassadors .thumbnails a'),
        closeStory = $('.ambassador-stories .story .close-popup'),
        storyShareLinks = $('.ambassador-stories ul li a');

    listingLinks.click(function() {
        pageNum = $(this).data('page');
        $('.animal-listings .page.active').removeClass('active');
        $('.animal-listings .page.set-' + pageNum).addClass('active');

        if (pageNum != 1) {
            listingPrevLink.show();
        } else {
            listingPrevLink.hide();
        }

        if (pageNum != listingNextLink.data('max')) {
            listingNextLink.show();
        } else {
            listingNextLink.hide();
        }

        listingLinks.removeClass('active');
        $(this).addClass('active');
    });

    listingNextLink.click(function() {
        var currentPage = $('.animal-listings .page.active'),
            nextPage = currentPage.next(),
            currentLink = $('.page-nav a.page-link.active'),
            numberOfPages = $(this).data('max');

        if (currentLink.data('page') === (numberOfPages - 1)) {
            $(this).hide();
        }

        listingPrevLink.show();

        currentPage.removeClass('active');
        nextPage.addClass('active');
        listingLinks.removeClass('active');
        currentLink.next().addClass('active');
    });

    listingPrevLink.click(function() {
        var currentPage = $('.animal-listings .page.active'),
            prevPage = currentPage.prev(),
            currentLink = $('.page-nav a.page-link.active'),
            numberOfPages = $(this).data('max');

        if (currentLink.data('page') === 2) {
            $(this).hide();
        }

        listingNextLink.show();

        currentPage.removeClass('active');
        prevPage.addClass('active');
        listingLinks.removeClass('active');
        currentLink.prev().addClass('active');
    });

    menuIcon.click(function() {
        var closeMenuIcon = '<img style="position: relative; left: -7px;" src="/spca/wp-content/themes/spca/images/close-menu-icon.png">';

        if (!$(this).hasClass('open')) {
            $(this)
                .html('&#10006;')
                .addClass('open');
        } else {
            $(this)
                .html('&#9776;')
                .removeClass('open');
        }
    });

    // Swaps photos on pet details page

    photoLinks.click(function() {
        var imgSrc = $(this).data('photo');

        curPetPhoto.show();
        petVideo.hide();

        // highlight clicked nav
        photoLinks.removeClass('active');
        petVideoLink.removeClass('active');
        $(this).addClass('active');

        petDetailsPhoto.attr('src', imgSrc);

        resizePetDetailsPhotos();

    });

    adoptionNavLinks.click(function(e) {
        e.preventDefault();

        var section = $(this).data('section'),
            rehomeSection = $('.rehomes'),
            adoptionSection = $('.animal-listings'),
            adoptionNav = $('.page-nav');

        // Set clicked link as active
        adoptionNavLinks.removeClass('active');
        $(this).addClass('active');

        // Show/Hide appropriate sections
        if (section === 'rehome') {
            rehomeSection.show();
            adoptionSection.hide();
            adoptionNav.hide();
        } else {
            adoptionSection.show();
            adoptionNav.show();
            rehomeSection.hide();
        }
    });

    petVideoLink.click(function() {
        photoLinks.removeClass('active');
        $(this).addClass('active');
        curPetPhoto.hide();
        petVideo.show();
    });

    $('.mailing-list-signup-form .button').click(function() {
        var elem = $(this),
            inputFields = $('.mailing-list-signup-form input');

        if (elem.hasClass('submit')) {
            $.ajax({
                url: '/constant-contact/index.php',
                method: 'POST',
                data: $('.mailing-list-signup-form').serialize(),
                error: function(xhr, status, err) {
                    console.log(status + ": " + err);
                }
            }).done(function(msg) {
                elem.html('added');
                $('#ajax-message').html(msg);
            });
        } else {
            elem
                .addClass('submit')
                .html('Sign up now');

            inputFields.fadeIn(500);
        }
    });

    adoptionCategoryLinks.click(function(e) {
        e.preventDefault();
        var section = $(this).data('section');

        adoptionCategoryLinks.removeClass('active');
        $(this).addClass('active');

        if (section === 'rehome') {
            $('.rehomes').show();
            $('.animal-listings').hide();
        } else if (section === 'adoption') {
            $('.rehomes').hide();
            $('.animal-listings').show();
        }

    });

    offsiteListing.each(function() {
        $(this).append('<a class="offsite-link" href="#"></a>');
        $(this).append('<p class="gp-desc">Off-Campus animals are housed outside of our Largo shelter. Location details can be found on pet\'s profile.</p>');
    });    

    goldenPawListing.each(function() {
        $(this).append('<a class="golden-paw-link" href="#"></a>');
        $(this).append('<p class="gp-desc">Golden Paws are our adoptables who are over 6 years of age.</p>');
    });

    diamondDogListing.each(function() {
        $(this).append('<a class="diamond-dog-link" href="#"></a>');
        $(this).append('<p class="gp-desc">Diamond Dogs receive advanced health screenings and other perks sponsored by Love My Dog Resort.</p>');
    });

    $('a.golden-paw-link').click(function(e) {
        e.preventDefault();
    });

    $('a.golden-paw-link').hover(function() {
        $(this).next().fadeIn(300);
    }, function() {
        $(this).next().fadeOut(300);
    });

    $('a.diamond-dog-link').click(function(e) {
        e.preventDefault();
    });

    $('a.diamond-dog-link').hover(function() {
        $(this).next().fadeIn(300);
    }, function() {
        $(this).next().fadeOut(300);
    });

    $('a.offsite-link').click(function(e) {
        e.preventDefault();
    });

    $('a.offsite-link').hover(function() {
        $(this).next().fadeIn(300);
    }, function() {
        $(this).next().fadeOut(300);
    });

    ambassadorLink.click(function(e) {
        e.preventDefault();
        toggleStories($(this).attr('href'));
    });

    closeStory.click(function() {
        var id = '#' + $(this).parent().parent().attr('id');
        toggleStories(id);
    });

    function toggleStories(id) {
        var story = $(id);

        if (story.css('display') === 'none') {
            story.fadeIn(300);
        } else {
            story.fadeOut(300);
        }

    }

    storyShareLinks.click(function(e) {
        e.preventDefault();
        var type = $(this).attr('class'),
            page = $(this).attr('href'),
            name = $(this).data('name'),
            shareLink;

        switch (type) {
            case 'facebook':
                shareLink = createFacebookLink(page);
                break;
            case 'twitter':
                shareLink = createTwitterLink(page, name);
                break;
            case 'linkedin':
                shareLink = createLinkedinLink(page);
                break;
        }

        window.open(shareLink);

    });

    function createFacebookLink(page) {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + page;
    }

    function createTwitterLink(page, name) {
        var title = get_title(name);
        return 'https://twitter.com/home?status=' + title + ' ' + page;
    }

    function createLinkedinLink(page) {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + page;
    }

    function get_title(name) {
        name = (name.slice(-1) === 's') ? name + '%27' : name + '%27s';
        return 'Share your joy with SPCA Tampa Bay - read ' + name + ' story';
    }

    function accordionArrows() {
        // $('.collapse').on('shown.bs.collapse', function() {
        //     $(this).parent().find(".accordion-open").removeClass("accordion-open").addClass("accordion-close");
        // }).on('hidden.bs.collapse', function() {
        //     $(this).parent().find(".accordion-close").removeClass("accordion-close").addClass("accordion-open");
        // });
        $('.collapse').on('shown.bs.collapse', function() {
            $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }).on('hidden.bs.collapse', function() {
            $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        });
    }
    accordionArrows()
})();

/*var resizeListingPhotos = function () {
    var animalListings = $('.animal-listings .listing'),
        petPhotoWrapper = $('.animal-listings .listing .pet-img');

    if (animalListings.length > 0) {

        petPhotoWrapper.each(function () {
            var petPhoto = $(this).find('img');

            if (petPhoto.width() > petPhoto.height()) {
                petPhoto.css({
                    height: '100%',
                    width: 'auto',
                    minWidth: '150px'
                });
            }
        });

    }
}();*/

var resizePetDetailsPhotos = function() {
    var photo;

    if ($('.pet-details')) {
        photo = $('.pet-details .photo img');

        if (photo.width() < photo.height()) {
            photo.css({
                height: '100%',
                width: 'auto'
            });
        } else {
            photo.css({
                height: 'auto',
                width: '100%'
            });
        }
    }
};

// initial resize
resizePetDetailsPhotos();
