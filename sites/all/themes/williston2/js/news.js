jQuery(document).ready(function($) {

    const initial_items = $('.ws-news__item').length;
    var current_items = initial_items;

    $('.ws-news__more').click(function() {

        $.ajax({
            url: newsAjax.url,
            type: 'post',
            data: {
                action: 'load_news_widget',
                nonce: newsAjax.nonce,
                amount: initial_items,
                offset: current_items,
                cats: $('.ws-news').data('cats').split(',')
            },
            success: function(response) {
                current_items += initial_items;
                console.log(response);
                $('.ws-news__list').append(response.data.html);
                if(!response.data.more) $('.ws-news__footer').addClass('ws-news__footer--hidden');
            }
        });

    });
});