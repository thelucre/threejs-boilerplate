/*jshint smarttabs:true */
/**
 * This module was created to fix the issue of IE not displaying fontface
 * in pseudo elements until the font is cached in the browser.  It is
 * described in more detail here: 
 * 
 *   http://andymcfee.com/2012/04/04/icon-fonts-pseudo-elements-and-ie8/
 *
 * This is solution is based on this post:
 *
 *   http://stackoverflow.com/a/10557782/59160
 */
define(function (require) {
  
	// Dependencies
	var $ = require('jquery');
	
	// If not IE8, abort. This expects HTML5 boilerplate IE selectors
	// on the HTML tag
	if (!$('html').hasClass('lt-ie9')) return;

	// Add a new style declaration that removes all psuedo elements
	var $style = $('<style type="text/css">:before,:after{content:none !important};</style>');
	$('head').append($style);

	// Then remove that style tag, which will make IE8 redraw them
	setTimeout(function() { $style.remove(); }, 0);
	

});