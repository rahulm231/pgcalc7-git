jQuery(document).ready(function() {
    function waitForElement(elementPath){
        window.setTimeout(function() {
            (jQuery(elementPath).length) ? endit(elementPath) : waitForElement(elementPath);
        }, 1500)
    }
    function endit(elementPath) {
        var imageHolder = jQuery(elementPath).each(function(index) {
            if (jQuery(this).find('>div>a>img')[0].naturalWidth < 765){
                jQuery(this).addClass('rss-feed-image')
            }
        });
    }
    waitForElement('#divResearchRss div.feeditem');
});