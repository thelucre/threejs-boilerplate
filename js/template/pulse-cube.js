/**
 * Pulse Cube with custom shaders loaded through require
 */	
 define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// to load the shaders
	require('text')

	// Init view
	var Model = {};

	var counter = 0;
	// 100 iterations
	var increase = Math.PI * 2 / 100;

	// Constructor
	Model.initialize = function(options) {
		_.bindAll(this);

		// pull options
		this.scene = options.scene;
		
		this.attributes = {};

		this.uniforms = {
		  delta: {type: 'f', value: 0.0},
		  scale: {type: 'f', value: 1.0},
		  alpha: {type: 'f', value: 1.0}
		};

		this.material = new THREE.ShaderMaterial({
		  	uniforms: this.uniforms,
		  	attributes: this.attributes,
		  	vertexShader:   require('text!shaders/pulse.vert'),
			fragmentShader: require('text!shaders/pulse.frag'),
		  	transparent: true
		});

		// simple cube
		var geometry	= new THREE.BoxGeometry( 2, 2, 2 );
		var material	= new THREE.MeshPhongMaterial({ ambient: 0x808080 });
		var mesh	= new THREE.Mesh( geometry, this.material ); 
		this.scene.add( mesh );
	};

	Model.update = function() {
		this.uniforms.delta.value += 0.1;
	};
	
	// Return the model
	return Backbone.Model.extend(Model);
});