var $ = jQuery.noConflict();

$(function(){
$('.widget-container ul li.collapsed > a').after('<a href="#" class="icon"></a>');
$('.widget-container ul li.expanded > a').after('<a href="#" class="icon"></a>');

var menu = $('#block-menu-block-1 .menu-block-wrapper > ul.nav').clone();
$('.page-menu-mobile .widget-inner > ul').replaceWith(menu);
$('.page-menu-mobile .page-menu-trigger .inner').html($('#block-menu-block-1 h2 a').html());
});
