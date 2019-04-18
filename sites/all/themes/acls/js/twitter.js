var hideTwitterAttempts = 0;
function hideTwitterBoxElements() {
    setTimeout( function() {
        if ( $('[id*=twitter]').length ) {
        $('[id*=twitter]').each( function(){
            var ibody = $(this).contents().find( 'body' );

            if ( ibody.find( '.timeline .stream .h-feed li.tweet' ).length ) {
            ibody.find( '.customisable-border' ).css( 'border', 0 );
            ibody.find( '.timeline' ).css( 'background-color', 'rgba(0,0,0,0)' ); //theme: shell: background:
            ibody.find( '.var-narrow .permalink' ).css( 'display:none' );
            ibody.find( '.var-narrow .timeline-header').css('display:none');
            ibody.find( '.timeline-header').css('display:none');
            ibody.find( 'ol.h-feed').css('background-color', 'rgba(0,0,0,0)'); //theme: tweets: background:
            ibody.find( 'ol.h-feed' ).css( 'border-radius', '5px 5px 5px 5px' );
            ibody.find( 'li.tweet' ).css( 'border-bottom', '1px solid #eee' ); //theme: tweets: color:
            ibody.find( 'li.tweet' ).css( 'color', '#000' ); //theme: tweets: color:
            ibody.find( '.customisable:link' ).css( 'color', '#cc3333' ); //theme: tweets: links:
            ibody.find( '.footer' ).css( 'visibility', 'hidden' ); //hide reply, retweet, favorite images
            ibody.find( '.footer' ).css( 'min-height', 0 ); //hide reply, retweet, favorite images
            ibody.find( '.footer' ).css( 'height', 0 ); //hide reply, retweet, favorite images
            ibody.find( '.var-narrow .header .p-nickname' ).css( 'position', 'relative' ); //hide reply, retweet, favorite images
            ibody.find( '.var-narrow .header .p-nickname' ).css( 'left', '-35px' ); //hide reply, retweet, favorite images
            ibody.find( '.avatar' ).css( 'height', 0 ); //hide avatar
            ibody.find( '.var-narrow .permalink' ).css( 'display', 'none' ); //hide reply, retweet, favorite images
            ibody.find( '.var-narrow .timeline-header').css('display', 'none'); //hide avatar
            ibody.find( '.timeline-header').css('display', 'none'); //hide avatar
            ibody.find('.avatar').css('width', 0); //hide avatar
            ibody.find( '.full-name' ).css( 'margin', '0px 0px 0px -35px' ); //move name of tweet to left (over avatar)
            ibody.find( '.p-name' ).css( 'color', '#cc3333' ); //theme: tweets: links:
            }
            else {
                $(this).hide();
            }
        });
        }
        hideTwitterAttempts++;
        if ( hideTwitterAttempts < 3 ) {
            hideTwitterBoxElements();
        }
    }, 1500);
}

// somewhere in your code after html page load
//hideTwitterBoxElements();