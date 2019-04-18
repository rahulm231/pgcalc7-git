jQuery(document).ready(function ($) {    
    $('#keypress-search').keypress(function (e) {
        if (e.which == 13) {
            window.location.href = "http://www.acls.org/search.aspx?search=" + $('#keypress-search').val();
            return false;
        }
    });

    jQuery('.utility-search .search-toggle').click(function () {
        jQuery('#keypress-search, .utility-search .search-toggle-close').fadeToggle(function () {
            jQuery('#keypress-search').addClass('search-visible');
        });
        jQuery(this).fadeToggle();
    });
    jQuery('.utility-search .search-toggle-close').click(function () {
        jQuery(this).fadeToggle();
        jQuery('#keypress-search').fadeToggle(function () {
            jQuery('#keypress-search').removeClass('search-visible');
            jQuery('.utility-search .search-toggle').fadeToggle();
        });
    });
});