// --------------------------------------------------
// Make elements all selected elements have the same height
// 
// Basic usage:
//   $('.units').matchHeight();
// 
// Clear the listeners:
//   var $units = $('.units'); // Must act on the same exact jquery collection
//   $units.matchHeight().removeMatchHeight();
// --------------------------------------------------
define(function (require) {
	
	// dependencies
	var $ = require('jquery')
		, _ = require('lodash')
		, $win = $(window)
	;
	
	// Add logic to jQuery
	$.fn.matchHeight = function(options) {
		var $els = this;
		options = options || {};
		
		// Immediately match
		match();

		// Store a reference to the lazy resizer in the collection so it can be cleared
		if ($els.matchHeightResizeCallback) return console.debug('Did not add more matchHeight listeners');
		$els.matchHeightResizeCallback = _.debounce(match, 100);
		$win.on('orientationchange resize load', $els.matchHeightResizeCallback);

		// Expose a method for clearing the resize listener
		$els.removeMatchHeight = function() {
			$els.css('height', '');
			$win.off('orientationchange resize load', $els.matchHeightResizeCallback);
			$els.matchHeightResizeCallback = null;
		};
		
		// Match heights of all els
		function match() {
			
			// Reset $els to native height
			$els.css('height', '');
			
			// Respect responsive bounds, keeping native height set above
			if (options.minWidth && $win.width() <= options.minWidth ||
			    options.maxWidth && $win.width() >= options.maxWidth) {
				return;
			}
			
			// Measure to get tallest
			var h = _.reduce($els, function(memo, el) {
				return Math.max(memo, $(el).outerHeight());
			}, 0);
			
			// Set heights
			$els.css('height', h);
			
		}
		
		// Chain
		return this;
	};
	
});
	
