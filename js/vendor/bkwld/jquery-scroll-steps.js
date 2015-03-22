// --------------------------------------------------
// Fire events when elements become visible or go away and
// provide an API for jumping to steps
// 
// Options:
// - slug - The name of the data element that contains the slug for an element
// - hesitate - Boolean that make sure the user isn't flying by a section
// - top - Percentage (0.0 - 1.0) The percentage that the given edge is within the 
//   viewport before a change event is fired. So, at `top == .5` as you scroll down the 
//   page, an elements change event is fired until it's moved past the halfway mark 
//   of the viewport. If top was 0, then it would fired once the element basically 
//   was scrolling out of view, past the top of the viewport. And 1 would trigger 
//   once the element first appeared in the viewport at the bottom of the page.
// - bottom - Like `top` but for the bottom of the element.
// --------------------------------------------------
define(function (require) {
	
	// Dependencies
	var $ = require('jquery')
		, _ = require('lodash')
		, Backbone = require('backbone')
		, tram = require('tram')
		, $win = $(window)
		, $doc = $(document)
	;
	
	// Create a model to store the current visible element but mainly
	// to emit events
	var Model = {
		defaults: { '$el': null, slug: null }
	};
	
	// Constructor
	Model.initialize = function() {
		
		// Shorthand change method
		this.on('change:$el', function(model, $el) {
			this.trigger('changed', $el, model.get('slug'));
			this.trigger('previous', model.previous('$el'), model.previous('slug'));
		}, this);
		
	};
	
	// A set triggered by a scroll event
	Model.scrolled = function($el, slug) {
		this.set({slug: slug, '$el' : $el});
		this.trigger('scrolled', slug);
	};
		
	// A set triggered by a click on a nav element
	Model.jump = function(slug) {
			this.set({slug: slug});
			this.trigger('jumped', slug);
	};
	
	// Give the model it's powers
	Model = Backbone.Model.extend(Model);
	
	// jQuery plugin definition
	$.fn.scrollSteps = function (options) {
		var $els = this;
		
		// Defaults
		options = _.defaults(options || {}, {
			slug: null,
			hesitate: false,
			top: 0.5,
			bottom: 0.5
		});
		
		// Create a new instance of the state model
		var state = new Model();
		
		// Listen for scrolls
		$win.on('scroll orientationchange resize load', _.throttle(onScroll, 50));
		function onScroll(e, $hesitated_match) {
			
			// Measure distances
			// Add some padding so the page changes when you're close to the new section
			// scrolling past the top of the browser
			var viewport = $win.height()
				, scroll = $win.scrollTop() // The current scroll position
				, $el, $match, offset
			;
			
			// Loop through all sections to find the $el that the user has
			// scrolled to.  It's possible for "match" to end up null.
			$els.each(function(i, el) {
				$el = $els.eq(i); // Trying to reduce jQuery work here
				offset = $el.offset();
				
				// Check if we've scrolled past this elements top, adding in the viewport offset
				if (scroll + options.top * viewport > offset.top &&
					
					// And check whether we HAVEN't scrolled past the bottom of the element
					scroll + options.bottom * viewport < offset.top + $el.height() ) {
					
					// This element is the one we want, no longer need to search
					$match = $el;
					return false; // Exits each()
				}
								
			});
			
			// Make sure the user isn't blowing by the match
			if (options.hesitate && $hesitated_match && $hesitated_match.is($match)) fireScrolled($match);
			else if (options.hesitate && e) _.delay(onScroll, 300, null, $match);
				
			// Normal firing of setting of model data / firing of events
			else fireScrolled($match);
			
		}
		
		// Triggering scrolling event differently depending on whether a slug was specified
		function fireScrolled($match) {
			if (options.slug && $match) state.scrolled($match, $match.data(options.slug));
			else state.scrolled($match);
		}
		
		// Listen for jump requests and scroll the page
		state.on('jumped', function(section) {

			// Require a slug
			if (!options.slug && window.console) window.console.log('Jumping requires a slug to be defined');
			
			// Calculate where to go
			var $el = $('[data-'+options.slug+'="'+section+'"]')
				, y = !section || $el.length === 0 ? 0 : $el.offset().top
				, distance = Math.abs($win.scrollTop() - y)
				, time = 800 + distance / this.height * 1300
			;

			// Go there
			tram(window).add('scroll-top ' + time + 'ms ease-out-sine').start({ scrollTop: y });
			
		});

		// Return the model instance so events can be subscribed to
		return state;
		
	};
	
	// Have require return the model class just for the heck of it
	return Model;
	
});
