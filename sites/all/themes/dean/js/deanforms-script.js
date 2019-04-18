/* =========== FIXES FOR THE FORMS THAT ARE LOADED INSIDE THE IFRAME OF THE DEAN'S SITE =========== */

function autoResize(id) {
    var newheight = 0;
    var newwidth = 0;

    if (document.getElementById) {
        var element = document.getElementById(id);

        if (element != null) {
            newheight = document.getElementById(id).contentWindow.document.body.scrollHeight;
            newwidth = document.getElementById(id).contentWindow.document.body.scrollWidth;
        }
    }

    if (newheight > 0 && newwidth > 0) {
        document.getElementById(id).height = (newheight) + "px";
        document.getElementById(id).width = (newwidth) + "px";
    }
}

window.onresize = function () { autoResize('formIFrame'); };

function updateIframeSize(x) {
    autoResize(x);
}

function moveToTop() {
    window.scrollTo(0, 0);
}