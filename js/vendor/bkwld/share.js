/**
 * Open up a share dialog for a variety of services.  See the source for
 * the list of supported services.  Example usage:
 *
 * share('service', {
 *   url: 'url',                 // Required
 *   title:'Title', 
 *   description: 'Description', 
 *   image:'Image',
 *   domain: 'domain'            // Like http://bkwld.com
 * });
 *  
 */
define(function (require) {

	// Dependencies
	var $ = require('jquery');

	return function(service, data) {

		// Defaults
		var data = data || {}
			, title = (data.title || $('title').text()).trim()
			, description = (data.description || '').trim()
			, image = (data.image || $('meta[property="og:image"]').attr('content') || '').trim()
			, domain = (data.domain || ('http://'+window.location.hostname)).trim()
			, url = (data.url || window.location.href).trim()
		;

		// Build urls
		var urls = {
			
			// To share media, use Twitter cards
			// https://dev.twitter.com/cards/overview
			'twitter' : 'https://twitter.com/intent/tweet?tw_p=tweetbutton&'+$.param({original_referer:domain, text:(title+' '+url) }),
			
			'pinterest' : 'http://pinterest.com/pin/create/extension/?'+$.param({media:image, url:url, description:(title+" - "+description) }),

			// To customize the messaging, use Open Graph
			// http://ogp.me/
			'facebook' : 'http://www.facebook.com/sharer.php?m2w&s=100&'+$.param({'p[title]':title, 'p[summary]':description, 'p[url]':url, 'p[images][0]':image}),

			'google+' : 'https://plus.google.com/share?'+$.param({url:url}),

			'reddit' : 'http://www.reddit.com/submit?'+$.param({url:url, title:title}),

			'delicious' : 'http://del.icio.us/post?'+$.param({url:url, title:title, notes:description}),

			'linkedin' : 'http://www.linkedin.com/shareArticle?mini=true&'+$.param({url:url, title:title, source:domain}),

			'tumblr' : 'http://www.tumblr.com/share/photo?'+$.param({source:image, caption:title+'<br />'+"<a href='" + url + "'>" + url + "</a>", click_thru:url}),

			'deeplink' : url,

			'email' : 'mailto:?subject='+title+'&body='+description+url

		};
		
		// Check to make sure selected service is listed below
		if (!urls[service]) return false;
		else if (service == 'email') window.location = urls[service];
		else return window.open(urls[service],'sharer','toolbar=0,status=0,width=548,height=325');
	};
});
