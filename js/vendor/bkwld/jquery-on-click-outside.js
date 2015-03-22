/**
 * Listen for a click outside, fire callback, and then remove yoself.
 * Based on: http://stackoverflow.com/a/7385673/59160
 *
 * Ex: this.$modal.onClickOutside(this.close);
 */
define(function (require) {
	
	// Dependencies
	var $ = require('jquery')
		, $document = $(document)
		, key = 'on-click-outside-handler'
	;

	// Add listner
	$.fn.onClickOutside = function (callback) {
		var $el = $(this);

		// Create the handler
		var handler = function(e) {
			if ($el.is(e.target) || $el.has(e.target).length !== 0) return;
			$el.offClickOutside();
			callback();
		};

		// Save a reference to the handler on the element so it can be cleared
		$el.data(key, handler);

		// Wait a tick so that the same click that called this doesn't count as
		// a click outside.
		setTimeout(function() {
			$document.on('click', handler);
		}, 1);
	};

	// Remove listener
	$.fn.offClickOutside = function() {
		var $el = $(this),
			handler = $el.data(key);

		// If a handler was set, clear it
		if (handler) {
			$document.off('click', handler);
			$el.data(null);
		}
	}
});
