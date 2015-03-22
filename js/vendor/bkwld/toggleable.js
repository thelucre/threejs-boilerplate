/*jshint smarttabs:true */
/**
 * Show and hide elements when other elements are clicked.
 *
 * map(array mapping);
 * 
 * 		Provide a mapping of elements to OTHER elements that should be shown
 * 		when clicked. `mapping` is an array of objects that look like: 
 * 		`{ on: $el, show: $el}`.  When the on $el is clicked, all the `show`
 * 		$elements but the one one in the pairin are hidden.
 *
 * 		Example:
 *
 * 			require('toggleable').map([
 * 				{ on: $('.one'), show: $('other') },
 * 				{ on: $('.two'), show: $('another') }
 * 			]).showFirst();
 * 		
 */
define(function (require) {

	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
	;

	// Setup toggleablility given a mapping array of objects
	function map(mapping) {

		// Make a jquery collection of all of the toggleable elements
		var $toggleables = _.reduce(mapping, function($set, pair) {
			if (pair.show) return $set.add(pair.show);
			else return $set;
		}, $());

		// Loop through the mappings and assign click listeners
		_.each(mapping, function(pair) {

			// Required properties
			if (!_.has(pair, 'on')) return console.error('"On" needs to be defined on each toggleable pair');

			// Defaults
			_.defaults(pair, {
				show: null
			});			

			// Assign listener, assume that on and show are already
			// wrapped in jQuery.
			pair.on.on('click', function() {

				// Hide everything but the selection
				$toggleables.not(pair.show).hide();

				// Then show the selected one
				if (pair.show) pair.show.show();
			});

		});

		// Return a new MapFactory instance
		return new MapFactory(mapping);

	}

	// Helper to make a mapping based on the value of radio input fields and
	// targeting elements based on the presence of [data-show-on=val] attribtues
	function radios($radios) {
		return map(_.map(function($el) {
			return {
				on: $el,
				show: $('[data-show-on="'+$el.attr('value')+'"]')
			}
		}, $radios.toArray()));
	}

	// This class constructor wraps a mapping definition and lets other methods
	// to be chained onto it
	function MapFactory(mapping) {
		this.mapping = mapping;
		return { showFirst: _.bind(showFirst, this) };
	}

	// Enable the first item in a mapping
	function showFirst() {
		this.mapping[0].show.show();
	}

	// API of the module
	return { 
		map: map,
		radios: radios
	};

});
