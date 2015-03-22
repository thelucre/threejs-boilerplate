// --------------------------------------------------
// Make console.log not error on unsupported browsers
// http://stackoverflow.com/a/5967632/59160
// --------------------------------------------------
define(function (require) {
	if (typeof window.console === 'undefined') window.console = {};
	var methods = ['log', 'debug', 'error', 'warn', 'info'];
	for (var i=0; i<methods.length; i++) {
		if (typeof window.console[methods[i]] === 'undefined') {
			window.console[methods[i]] = function() {};
		}
	}
});
