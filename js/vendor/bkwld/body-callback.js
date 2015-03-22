/**
 * Execute methods defined on the passed object if there
 * is a body class that matches the property name
 */
define(function (require) {
  
	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
	;
	
	// Cache
	var $body = $('body');

	// Expose logic as a function
	return function (callbacks) {
		
		// For each class on the body, match against body
		var classes = $body[0].className.split(/\s+/);
		_.each(classes, function (name) {
			if (!callbacks[name]) return;

			// If found, invoke callback
			callbacks[name]();
		});

	};

});