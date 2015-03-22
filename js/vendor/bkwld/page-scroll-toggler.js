// --------------------------------------------------
// Disable the ability to scroll the page.  Useful when
// a modal is up.
// 
// Usage:
//   var pageScroll = require('bkwld/page-scroll-toggler');
//   pageScroll.disable();
//   pageScroll.enable();
// --------------------------------------------------
define(function (require) {
	var $ = require('jquery')
		, $win = $(window)
		, $body = $('body')
	;

	// Stop dragging on iOS
	function noTouchMove(e) { e.preventDefault(); }

	// Public interface
	return {

		// Disable scrolling
		disable: function() {
			$body.css('overflow', 'hidden');
			$(window).on('touchmove', noTouchMove);
		},

		// Enable scrolling
		enable: function() {
			$body.css('overflow', 'visible');
			$(window).off('touchmove', noTouchMove);
		}
	};
});