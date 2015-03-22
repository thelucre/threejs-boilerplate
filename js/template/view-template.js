define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// Init view
	var View = {};
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$win = $(window);

	};
	
	// Return the view
	return Backbone.View.extend(View);
});