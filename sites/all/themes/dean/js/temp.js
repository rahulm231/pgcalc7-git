$(document).ready( function () {
    $(".lnk-more").click(function () {
        $(this).val("Loading ...");
    })

    $(".update-cookie").click(function () {
        var now = new Date().toLocaleString();
        if ($(this).hasClass("cookie-news")) {
            $.cookie("visit-news", now, { expires: 356 });
        }

        if ($(this).hasClass("cookie-events")) {
            $.cookie("visit-events", now, { expires: 356 });
        }

        if ($(this).hasClass("cookie-blogs")) {
            $.cookie("visit-blogs", now, { expires: 356 });
        }

        if ($(this).hasClass("cookie-twitter")) {
            $.cookie("visit-twitter", now, { expires: 356 });
        }
    });
});

function OnClientNodeClickingHandler(sender, eventArgs) {
    var node = eventArgs.get_node();
    if (node.get_category() == "Disabled") {
        eventArgs.set_cancel(true);
    }
    else {
        if (typeof widgetActivateSave == 'function') {
            widgetActivateSave();
        }
    }
}