// Set the require.js configuration for the application
// This paths get appended to by `grunt bower`. The map
// is there so that calls to underscore resolve to lodash.
require.config({
	baseUrl: 'js',
	stubModules: [
		'text'
	],
	map: {
		'*': {
			underscore: 'lodash'
		}
	},
	paths: {
		jquery: 'empty:',
		bkwld: 'vendor/bkwld',
		backbone: 'vendor/backbone/backbone',
		underscore: 'vendor/underscore/underscore',
		lodash: 'vendor/lodash/dist/lodash.compat',
		three: 'vendor/threejs/build/three',
		threex: 'vendor/threex',
		detector: 'vendor/utils/Detector',
		stats: 'vendor/utils/Stats',
		dragPanControls: 'vendor/threex.dragpancontrols',
		text: 'vendor/text/text'
	},
	packages: [

	]
});

// Start the application
require(['start']);