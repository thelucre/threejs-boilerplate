/**
 * Test model using Backbone to manage an object with Geometry
 */	
 define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

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
		this.originalGeometry;
		this.messFactor = 0;

		// object values 
		this.src = 'models/head.json';
		this.material = new THREE.MeshPhongMaterial({ 
			wireframe : false, 
			shading : THREE.FlatShading 
		}); 
		
		// load the JSON mesh object
		this.load();
	};

	Model.load = function() {
		// load a JSON mesh
		// instantiate a loader 
		var loader = new THREE.JSONLoader(); 

		// load a resource 
		loader.load( 
			// resource URL 
			this.src, 

			// fire the call back
			this.onLoad
		);
	}

	Model.onLoad = function( geometry, materials ) {
		// Function when resource is loaded 
		this.originalGeometry = geometry.clone();
		this.geometry = geometry;
		this.object = new THREE.Mesh( this.geometry, this.material ); 
		this.object.position.set(0,0,-5);
		this.scene.add(this.object);
	}

	Model.update = function() {
		this.messFactor += Math.sin( counter ) / 100 + 0.0001;
  		counter += increase;

		if( !this.geometry ) return;

		for(var i = 0; i < this.geometry.vertices.length; i++) {
			var v = this.geometry.vertices[i];
			// v.x = this.originalGeometry.vertices[i].x + (-this.messFactor / 2) + Math.random() * this.messFactor;
			// v.y = this.originalGeometry.vertices[i].y + (-this.messFactor / 2) + Math.random() * this.messFactor;
			v.z = this.originalGeometry.vertices[i].z + (-this.messFactor / 2) + Math.random() * this.messFactor;
			this.geometry.vertices[i] = v;
		}

		this.geometry.verticesNeedUpdate = true;
	};
	
	// Return the model
	return Backbone.Model.extend(Model);
});