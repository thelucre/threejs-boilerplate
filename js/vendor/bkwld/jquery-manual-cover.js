// --------------------------------------------------
// Make an element fill it's container like background-size:cover
// --------------------------------------------------
define(function (require) {
	
	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
		, $win = $(window)
	;
	
	// Plugin definition
	$.fn.manualCover = function (aspect_ratio) {
		var $els = this;
		
		// Watch for lazy resizings
		size();
		$win.on('orientationchange resize load', _.debounce(size, 50));
		function size() {
			
			// Loop through all elements to get their parent's dimensions
			$els.each(function(i, el) {
				
				// Measure elements
				var $el = $(el),
					$parent = $el.parent(),
					parent_w = $parent.width(),
					parent_h = $parent.height(),
					w,h,x,y
				;
				
				// Decide what the dimensions of this element should be
				if (parent_w / parent_h > aspect_ratio) {
					w = parent_w;
					h = parent_w / aspect_ratio;
					x = 0;
					y = ( parent_h - h ) /2;
				} else {
					w = parent_h * aspect_ratio;
					h = parent_h;
					x = ( parent_w - w ) /2;
					y = 0;
				}
				
				// Apply the dimensions
				$el.css({ width: w, height: h, top: y, left: x });
				
			});
			
		}
		
		// Chain
		return this;
		
	};
	
});