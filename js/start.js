/**
 * Bootstrap the JS.  This is invoked by main.js.  Add site
 * specific initialization logic to this.
 */
define(function (require) {
	// AMD dependencies and var assignments
	var $ = require('jquery');

	// Plugin dependencies
	require('bkwld/console');
	require('bkwld/csrf');
	require('bkwld/jquery-views');

	// load up all the necessary libs here
	// threejs modules are tyically registered globally so they should
	// only be added once, not in indivual views
	require('three');
	require('detector');
	require('stats');
	require('dragPanControls');

	// INIT
	// kick off backbone views here, or whatever, man, jeez. get off my back, already.
	var TestView = $('body').views(require('template/test-view'));
});