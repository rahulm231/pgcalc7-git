// eBrochure Global
jQuery(document).ready(function($) {
    // hide copyright information for all ebrochures except X68 and X70
    if ($("body.ebrochure-page").length > 0) {
        var path = "ebr=x68";
        var path2 = "ebr=x70";
        if (!(window.location.search.replace("?", "").match(path) ||
                window.location.search.replace("?", "").match(path2))) {
            $("body.ebrochure-page .cga-copyright").css("display", "none");
        }
    }
});
