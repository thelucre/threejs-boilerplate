define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	// Init view
	var View = {};

	console.log(Detector);

	// Global view properties
	var stats, scene, renderer, composer;
	var camera, cameraControl;
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);
		
		// Selectors
		this.$win = $(window);

		if( Detector.webgl ){
			renderer = new THREE.WebGLRenderer({
				antialias				: true,	// to get smoother output
				preserveDrawingBuffer	: true,	// to allow screenshot
				alpha					: true // view the css background color
			});
			renderer.setClearColor( 0xbbbbbb );
		}else{
			renderer	= new THREE.CanvasRenderer();
		}
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0x000000, 0 ); // the default
		document.getElementById('container').appendChild(renderer.domElement);

		// add Stats.js - https://github.com/mrdoob/stats.js
		stats = new Stats();
		stats.domElement.style.position	= 'absolute';
		stats.domElement.style.bottom	= '0px';
		document.body.appendChild( stats.domElement );

		// create a scene
		scene = new THREE.Scene();

		// put a camera in the scene
		camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set(0, 0, 5);
		scene.add(camera);

		// create a camera contol
		cameraControls	= new THREEx.DragPanControls(camera)

		// here you add your objects
		// - you will most likely replace this part by your own
		var light	= new THREE.AmbientLight( Math.random() * 0xffffff );
		scene.add( light );
		var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
		light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
		scene.add( light );
		var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
		light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
		scene.add( light );
		var light	= new THREE.PointLight( Math.random() * 0xffffff );
		light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
					.normalize().multiplyScalar(1.2);
		scene.add( light );
		var light	= new THREE.PointLight( Math.random() * 0xffffff );
		light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
					.normalize().multiplyScalar(1.2);
		scene.add( light );


		// simple cube
		// var geometry	= new THREE.CubeGeometry( 2, 2, 2 );
		// var material	= new THREE.MeshPhongMaterial({ambient: 0x808080, color: Math.random() * 0xffffff});
		// var mesh	= new THREE.Mesh( geometry, material ); 
		// scene.add( mesh );

		// load a JSON mesh
		// instantiate a loader 
		var loader = new THREE.JSONLoader(); 
		// load a resource 
		loader.load( 
			// resource URL 
			'models/head.json', 

			// Function when resource is loaded 
			function ( geometry, materials ) { 
				console.log(geometry);
				console.log(materials);
				var material = new THREE.MeshPhongMaterial({ wireframe : false, shading : THREE.FlatShading }); 
				var object = new THREE.Mesh( geometry, material ); 
				object.position.set(0,0,-5);
				scene.add( object ); 
			} 
		);

		this.animate();
	};

	// animation loop
	View.animate = function() {

		// loop on request animation loop
		// - it has to be at the begining of the function
		// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		requestAnimationFrame( this.animate );

		// do the render
		this.render();

		// update stats
		stats.update();
	}

	// render the scene
	View.render = function() {
		// variable which is increase by Math.PI every seconds - usefull for animation
		var PIseconds	= Date.now() * Math.PI;

		// update camera controls
		cameraControls.update();

		// // animation of all objects
		// scene.traverse(function(object3d, i){
		// 	if( object3d instanceof THREE.Mesh === false )	return
		// 	object3d.rotation.y = PIseconds*0.0003 * (i % 2 ? 1 : -1);
		// 	object3d.rotation.x = PIseconds*0.0002 * (i % 2 ? 1 : -1);
		// })
		// // animate PointLights
		// scene.traverse(function(object3d, idx){
		// 	if( object3d instanceof THREE.PointLight === false )	return
		// 	var angle	= 0.0005 * PIseconds * (idx % 2 ? 1 : -1) + idx * Math.PI/3;
		// 	object3d.position.set(Math.cos(angle)*3, Math.sin(angle*3)*2, Math.cos(angle*2)).normalize().multiplyScalar(2);
		// })

		// actually render the scene
		renderer.render( scene, camera );
	}
	
	// Return the view
	return Backbone.View.extend(View);
});