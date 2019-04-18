

/**
*  In this configuration map, you can define the default tracking ids/pixels to be used with each 
*  domain. You can also define "exceptions", which are paths under that domain which use a 
*  different tracking id. 
*
*  Each domain has two possible properties: "fb" (for facebook stuff) and "ga" (for google analytics)
*  stuff. Each of these properties accepts the same things, with the exception of the 
*  "allowMultiple" setting for the fb object. More on that later. You can leave off one of
*  those two properties to disable that tracking type for that domain.
*
*  There are few ways to setup the tracking:
*  
*  1) you can directly feed a tracking id variable to the property:
*        ga: googleAnalytics_ids.production
*    This is the easiest way to associate a domain with a tracking id.
*
*  2) you can feed the property with an object which has two properties: "exceptions" and 
*     "default". Default should be a tracking id variable (or false to disable tracking on
*     all but the exceptions). Exceptions should be an object with subpaths as the keys, 
*     and tracking ids as the values. Here's an example: 
*
*     "abacus.bates.edu": {
*		ga: {
*  			"exceptions": {
*  				'/oralhistory/': googleAnalytics_ids.production,
*  				'/muskie-archives/': googleAnalytics_ids.production
*  			},
*  			default: false
*  		},
*  		fb: false
*  	  }
*
*     In this example, no ga tracking will be used (default: false) on abacus.bates.edu
*     except on abacus.bates.edu/oralhistory/ and abacus.bates.edu/muskie-archives/, both 
*     of which will use the google analytics production tracking id.
*
*     You could also reverse this example to use tracking by default, but disable it on a
*     specific path on the domain.
*
*     Subpaths will match a parent path as well, so in our previous example, the url
*     abacus.bates.edu/oralhistory/something-else would also use the given tracking id.
*     If a path matches partially and exactly, preference will be given to the exact match. 
*
*     If the tracking type property is "fb", each path in the exceptions object 
*     can also accept an object, this time with the properties "id" for the tracking id, and
*     "allowMultiple": true to indicate that the default tracking id should be used also with
*     any exception ids found. You only need to do it this way if you want to use multiple
*     tracking pixels for facebook. This would look something like this:
*
*     "domain.bates.edu": {
*  		fb: {
*  			exceptions: {
*  				"/alumni/": facebookPixel_ids.advancement,
*  				"/campaign/": {
*  					id: facebookPixel_ids.advancement,
*  					allowMultiple: true
*  				},
*  			},
*  			default: facebookPixel_ids.default
*  		}
*  	  },
*
* 	  In that example, on domain.bates.edu/ the default facebook pixel is used, on 
* 	  domain.bates.edu/advancement/ (and sub-paths), the advancement pixel id used, and on 
* 	  domain.bates.edu/campaign/ (and sub-paths), both the default and the advancement
* 	  pixel are used. 
*
*/


var getTrackingCodesForDomain = function(trackingType){

	var googleTagManager_ids = {
		production: {
			type: 'live',
			container_id: "GTM-NS4K3BT", //'GTM-W6GDN8'
		},
		development: {
			type: 'preview',
			container_id: 'GTM-NS4K3BT',
			gtm_auth: 'iabrlUDTie1_Xw8T7W1mIg',
			gtm_preview: 'env-6',
		}
	}

	var hostMap = {
		"abacus.bates.edu": {
			gtm: {
				"exceptions": {
					'/oralhistory/': googleTagManager_ids.production,
					'/muskie-archives/': googleTagManager_ids.production
				},
				default: false
			},
		},
		"adminlb.imodules.com": {
			gtm: googleTagManager_ids.production,
		},
		"apply.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"www.gobatesbobcats.com": {
			gtm: googleTagManager_ids.production,
		},
		"bates-college-store.myshopify.com":{
			gtm: googleTagManager_ids.production,
		},
		"bates.beta.libguides.com": {
			gtm: googleTagManager_ids.production,
		},
		"bates.prestosports.com": {
			gtm: googleTagManager_ids.production,
		},
		"batescollege.tumblr.com": {
			gtm: googleTagManager_ids.production,
		},
		"batesnews.tumblr.com": {
			gtm: googleTagManager_ids.production,
		},
		"batesorientation2014.sched.org": {
			gtm: googleTagManager_ids.production,
		},
		"batesshortterm.tumblr.com": {
			gtm: googleTagManager_ids.production,
		},
		"bco-dev.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"bco-jparis.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"bco-kblake.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"bco-nobrien.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"bco-remodel.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"bco-test.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"community.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"digilib.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"diversebookfinder.org": {
			gtm: googleTagManager_ids.production,
		},
		"events.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"events-test.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"illiad.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"libanswers.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"libguides.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"marchmania.org": {
			gtm: googleTagManager_ids.production,
		},
		"museum.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"museum-dev.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"new.livestream.com": {
			gtm: googleTagManager_ids.production,
		},
		"olle-jlm.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"quad.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"quad-dev.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"quad-sa.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"quad-test.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"securelb.imodules.com": {
			gtm: googleTagManager_ids.production,
		},
		"store.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"vmnode163.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"www-stage.bates.edu": {
			gtm: googleTagManager_ids.development,
		},
		"www.bates.edu": {
			gtm: googleTagManager_ids.production,
		},
		"www.batesdancefestival.org": {
			gtm: googleTagManager_ids.production,
		},
		"www.garnetgateway.com": {
			gtm: googleTagManager_ids.production,
		},
		"www.marchmania.org": {
			gtm: googleTagManager_ids.production,
		},
		"www.thousandwordsproject.org": {
			gtm: googleTagManager_ids.production,
		}
	};

	trackingType = typeof trackingType !== 'undefined' ? trackingType : 'gtm';
	var out = [];
	var allowMultipleCodes = false;
	var domain = window.location.host;
	var path = window.location.pathname.toLowerCase();
	
	if( hostMap.hasOwnProperty(domain) ) {

		if( typeof hostMap[domain][trackingType] === 'undefined' || hostMap[domain][trackingType] == false)
			return;

		// if we don't have a full object, but just a string, use that as the default for the domain
		// if( typeof hostMap[domain][trackingType] === 'string' ){
		// 	return hostMap[domain][trackingType];
		// }

		// set our default if there is one
		if( typeof hostMap[domain][trackingType].default != 'undefined' && hostMap[domain][trackingType].default )
			out.push( hostMap[domain][trackingType].default );
		else
			out.push( hostMap[domain][trackingType]);

		// check for exceptions, and change the default as needed
		if( typeof hostMap[domain][trackingType].exceptions != 'undefined' && hostMap[domain][trackingType].exceptions ){
			for( var domainPathKey in hostMap[domain][trackingType].exceptions) {

				if( path.indexOf( domainPathKey ) === 0 ) {
					var tid = hostMap[domain][trackingType].exceptions[domainPathKey];
					if( typeof hostMap[domain][trackingType].exceptions[domainPathKey].allowMultiple !== 'undefined' 
						&& hostMap[domain][trackingType].exceptions[domainPathKey].allowMultiple == true ) 
					{
						allowMultipleCodes = true;
					}

					out.push( tid );
					// only break on exact match, to give a chance for the loop to catch an exact match later
					if( path === domainPathKey )
						break;
				}
			}
		}
	}
	// ga only allows one tracking id per page, so grab the last one
	if( trackingType == 'ga' )
		return out.pop();
	// gtm only needs one tracking element per page
	if( trackingType === 'gtm' )
		return out.pop();
	// for fb, we allow multiple pixels per page, if the config says it's ok
	if( trackingType == 'fb' && ! allowMultipleCodes ){
		return out.pop();
	}
	return out;
};
/**/


/*
 * Google Tag manager
 */
var gtmTrackingCode = getTrackingCodesForDomain();

if( gtmTrackingCode ) {
	if( gtmTrackingCode.type === 'live' ) {

		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer', gtmTrackingCode.container_id );

	} else {

		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth='+gtmTrackingCode.gtm_auth+'&gtm_preview='+gtmTrackingCode.gtm_preview+'&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer', gtmTrackingCode.container_id );

	}
}
