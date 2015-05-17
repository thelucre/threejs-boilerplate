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

		this.uniforms = THREE.UniformsUtils.merge([
        	THREE.UniformsLib['lights'],{
		  delta: {type: 'f', value: 0.0},
		  scale: {type: 'f', value: 1.0},
		  alpha: {type: 'f', value: 0.5}
		}]);;

		this.material = new THREE.ShaderMaterial({
		  	uniforms: this.uniforms,
		  	attributes: this.attributes,
		  	vertexShader:   require('text!shaders/pulse.vert'),
			fragmentShader: require('text!shaders/pulse.frag'),
		  	transparent: true,
		  	lights: true
		});

		// simple cube
		var geometry	= new THREE.BoxGeometry( 2, 2, 2 );
		var material	= new THREE.MeshPhongMaterial({ ambient: 0x808080 });
		this.mesh	= new THREE.Mesh( geometry, this.material ); 
		this.scene.add( this.mesh );
		console.log(this.mesh);

		// LIGHT Orbits the cube
		this.light	= new THREE.SpotLight( 0xFFFFFF);
		this.light.position.set(10,2,2);
		this.scene.add( this.light );

		// light follows the cube
		this.light.target = this.mesh;
	};

	Model.update = function(shouldJiggle) {
		if(shouldJiggle)
			this.uniforms.delta.value = window.time;

		this.light.position.set( Math.sin(window.time * 3) * 5, Math.cos(window.time * 3) * 5, Math.sin(window.time/10) * 5 );

	};
	
	// Return the model
	return Backbone.Model.extend(Model);
});