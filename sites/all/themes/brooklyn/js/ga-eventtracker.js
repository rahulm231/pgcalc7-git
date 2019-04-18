
    $(document).ready(function(){
    $('a').click(function(){
    var eventCategory = $(this).attr('ga-category');
    var eventAction = $(this).attr('ga-action');
    var eventLabel = $(this).attr('ga-label');
    trackClick(eventCategory,eventAction,eventLabel);
    });
    });