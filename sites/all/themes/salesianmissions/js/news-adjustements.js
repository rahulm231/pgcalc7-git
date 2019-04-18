(function ($){

if ($("body").hasClass ("node-type-salesian-news-item")){
    $('#block-menu-primary-links .expanded.active-trail .expanded.first.active-trail ul li:nth-child(15)').nextAll('li.leaf').remove();
}

})(jQuery);
