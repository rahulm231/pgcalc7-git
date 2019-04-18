(function() {
    var __hs_cta = {
        "_class": "hs-cta-null"
    };

    __hs_cta.kill = function() {
        var allTags, check, i,
            tags = [];
        if (document.getElementsByClassName) {
            allTags = document.getElementsByClassName(__hs_cta._class);
            check = function(ele) {
                return ele.nodeName == 'DIV' || ele.nodeName == 'SPAN';
            };
        } else {
            allTags = [];
            divTags = document.getElementsByTagName("div");
            spanTags = document.getElementsByTagName("span");
            for (i = 0; i < spanTags.length; i++) {
                allTags.push(spanTags[i]);
            }
            for (i = 0; i < divTags.length; i++) {
                allTags.push(divTags[i]);
            }

            check = function(ele) {
                return ele.className.indexOf(__hs_cta._class) > -1;
            };
        }
        for (i = 0; i < allTags.length; ++i) {
            if (check(allTags[i])) {
                allTags[i].parentNode.removeChild(allTags[i]);
            }
        }
    };

    // need to do a slight timeout so IE has time to react
    setTimeout(__hs_cta.kill, 10);
}());