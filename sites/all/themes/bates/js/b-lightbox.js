// A simplistic polyfill for URLSearchParams, for our own use here. Only implements set, get, and toString(). No constructor param.
if(typeof window.URLSearchParams==='undefined'){window.URLSearchParams = function(){this.params={};this.get=function(k){if(typeof this.params[k]=='undefined'){return null}return this.params[k]};this.set=function(k,v){this.params[k]=v};this.toString=function(){var out=[];for(var key in this.params){if(!this.params.hasOwnProperty(key)){continue}out.push(key+'='+this.params[key])}return out.join('&')}}}

jQuery(function($){

	var allLightboxImages = [];
	var lightboxCurrent = 0;
	var blightboxOpen = false;
	originalMetaTags = [];

	function removeSharingMetaTags(){
		$('meta[name^="twitter:"]').remove();
		$('meta[property^="og:"]').remove();
		$('meta[itemprop]').remove();
	}

	/**
	 * Add (or update existing) meta tags
	 * @param  {string} attributeName The attribute name for the key
	 * @param  {object} obj           key/value pairs for the meta tag
	 * @return void
	 */
	function updateMetaTags(attributeName,obj){
		var tags = [], meta;

		for(key in obj){
			// if a tag with that attribute/key exists, just update it
			if( $('meta['+attributeName+'="'+key+'"]').length ) {
				$('meta['+attributeName+'="'+key+'"]').attr('content',obj[key]);
			} else {
				// create new meta tag
				meta = document.createElement('meta');
				meta.setAttribute(attributeName,key);
				meta.setAttribute('content',obj[key]);
				document.getElementsByTagName('head')[0].appendChild(meta);
			}
		}
	}

	function hideNavigation(){
		$('.blightbox-navigation').css('opacity','0');
	}

	function addBodyOrientationClass(){
		var img = $('#blightbox-image');
		if( img.width() == img.height() ){
			$('body').addClass('blightbox-image-square')
				.removeClass('blightbox-image-vertical blightbox-image-horizontal');

		} else if ( img.width() < img.height() ){
			$('body').addClass('blightbox-image-vertical')
				.removeClass('blightbox-image-horizontal blightbox-image-square');

		} else {
			$('body').addClass('blightbox-image-horizontal')
				.removeClass('blightbox-image-square blightbox-image-vertical');
		}
	}
	function removeBodyOrientationClasses(){
		$('body').removeClass('blightbox-image-square blightbox-image-vertical blightbox-image-horizontal');
	}

	function getElementCaption(el){
		var caption = $(el).parents('.wp-caption, .gallery-item').find('.wp-caption-text').html();
		if ( typeof caption == 'undefined') {
			caption = $(el).find('img').attr('alt');
		}
		return caption;
	}

	/* Get dom element by providing the url in the href attribute
	 *
	 * Will ignore the protocol
	 */
	function getElementByHrefValue(url){
		// allow for protocol-less urls by removing the protocol, then matching just the end
		// of the href attribute
		url = url.replace(/^http[s]?:/,'');
		var el = $('a[href$="'+url+'"]').get(0);
		if( typeof el == 'undefined' ){
			console.error('Error: Could not get <a> element with href: '
				+ url );
			return false;
		}
		return el;
	}

	function getNextLightboxImage(){
		var i = lightboxCurrent + 1;
		if( typeof allLightboxImages[i] == 'undefined' )
			return allLightboxImages[0];

		return allLightboxImages[i];
	}

	function getPreviousLightboxImage(){
		var i = lightboxCurrent - 1;
		if( i < 0 )
			return allLightboxImages[ allLightboxImages.length-1 ];

		return allLightboxImages[i];
	}

	function moveLightboxTo(src){
		if( allLightboxImages.indexOf(src) < 0 )
			return false;
		var el = getElementByHrefValue(src);
		if( ! el ) 
			return false;
		var caption = getElementCaption( el );
		setModalImage( el, caption );
	}
	function moveLightboxPrevious(){
		var newImg = getPreviousLightboxImage();
		moveLightboxTo(newImg);
	}
	function moveLightboxNext(){
		var newImg = getNextLightboxImage();
		moveLightboxTo(newImg);
	}

	function closeModal() {

		$('body').removeClass('modal-open');
		$('#blightbox').fadeOut(200);
		
		$('#blightbox').find('img').attr('src','');
		$('#blightbox').find('.blightbox-caption').html('');

		// remove key handlers
		$(document).off('keyup.blightbox');	
		setLightboxUrl(null);
		removeBodyOrientationClasses();

		removeSharingMetaTags();

		for(var i=0;i<originalMetaTags.length;i++){
			$('head').append( originalMetaTags[i].cloneNode() );
		}

		blightboxOpen = false;

	}
	
	function setLightboxUrl(imgurl){
		var p = new URLSearchParams(window.location.search);
		if( ! imgurl )
			p.delete('lightbox_image');
		else
			p.set('lightbox_image',imgurl);
		var url = window.location.origin + window.location.pathname;
		if( p.toString() !== '' ) {
			url += '?' + p.toString();
		}
		history.replaceState({},'',url);
		return url;
	}

	function setModalImage(el,caption){
		var blx = $('#blightbox')
			, img = $('#blightbox-image')
			, src = el.href
		;
		blx.addClass('loading');

		img.attr('src',src);

		lightboxCurrent = allLightboxImages.indexOf(src);

		if( img.complete ) {
			blx.removeClass('loading');
			addBodyOrientationClass();
		} else {
			img.livee('load',function(){
				blx.removeClass('loading');
				addBodyOrientationClass();
			});
		}

		if( typeof caption == 'undefined')
			caption = '';
		blx.find('.blightbox-caption').html(caption);

		setLightboxUrl(src);

		if( blxSettings.useSharing ){
			$('a.blightbox-share').addClass('loading');

			$.post( blxSettings.ajaxurl , {
				action: 'getSharingUrls',
				image: src,
				url: window.location.href,
				content: caption
			},function(resp){
				if( ! resp.length ){
					console.error('error getting sharing urls');
					return;
				}
				for(var i=0;i<resp.length;i++){
					$('a.blightbox-share-'+resp[i].service).attr('href', resp[i].link )
					$('a.blightbox-share-'+resp[i].service).removeClass('loading');
				}
			});

			updateMetaTags('name',{
				"twitter:card": "summary_large_image",
				"twitter:image": src,
				"twitter:description": caption,
			});
			// <meta name="twitter:site" content="@nytimes">
			// <meta name="twitter:creator" content="@SarahMaslinNir">

			updateMetaTags('property',{
				"og:url": window.location.href,
				"og:description": caption,
				"og:image": src
			});

			updateMetaTags('itemprop',{
				"url": window.location.href,
				"image": src,
			});

		} // end sharing
	};

	function openModal(id,caption) {
		blightboxOpen = true;
	
		$('body').addClass('modal-open');

		var blx = $('#blightbox');

		setModalImage( id , caption );
		
		$(document).live('keyup.blightbox',function(e) {

			// let escape key close the lightbox too			
			if (e.keyCode == 27)
				$('.blightbox-close').click();
			
			if (e.keyCode == 37)
				moveLightboxPrevious();

			if( e.keyCode == 39)
				moveLightboxNext();

		});

		blx.fadeIn(300);
		
	}
	
	$('.blightbox-close, #blightbox').live('click',function(){
		
		closeModal();
		return false;
		
	});
	
	$('img')
		.parent('a[href$=".jpg"], a[href$=".png"], a[href$=".jpeg"]')
		.not('.nolightbox')
		.live('click', function(e){
			e.preventDefault();
			var caption = getElementCaption( this );
			openModal( this, caption );
		})
		.each(function(){
			if( allLightboxImages.indexOf(this.href) < 0 )
				allLightboxImages.push( this.href );
		})
	;

	if( allLightboxImages.length < 2 ){
		hideNavigation();
	}

	// check if, on initial load, the url wants us to open the lightbox
	(function(){
		var p = new URLSearchParams(window.location.search);
		var imgsrc = p.get('lightbox_image');
		if( ! imgsrc )
			return;

		if( allLightboxImages.indexOf(imgsrc) < 0)
			return;

		var el = getElementByHrefValue(imgsrc);
		if( ! el ) {
			// if we can't find that image, remove it from the url
			setLightboxUrl(null);
			return false;
		}
		var caption = getElementCaption( el );
		openModal( el, caption );
	})();

	// Take note of the page's original meta tags so we can restore them when the
	// lightbox is closed.
	if( blxSettings.useSharing == '1' ) {
		$('meta[name^="twitter:"]').each(function(){
			originalMetaTags.push( this.cloneNode() );
		});
		$('meta[property^="og:"]').each(function(){
			originalMetaTags.push( this.cloneNode() );
		});
		$('meta[itemprop]').each(function(){
			originalMetaTags.push( this.cloneNode() );
		});
	}


	$('#blx-next').live('click',function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		moveLightboxNext();
	});
	$('#blx-prev').live('click',function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		moveLightboxPrevious();
	});
	
	$('a.blightbox-share').live('click',function(e){
		e.stopImmediatePropagation();
	});
});
