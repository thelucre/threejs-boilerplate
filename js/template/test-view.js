define(function(require) {
	
	// Dependencies
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		PulseCube = require('template/pulse-cube');

	require('text');

	// Init view
	var View = {};

	// Global view properties
	var stats, scene, renderer, composer;
	var camera, cameraControl, uniforms;
	var srcDir = 'js/vendor/threejs/examples/js/';
	
	// Constructor
	View.initialize = function() {
		_.bindAll(this);

		// Selectors
		this.$win = $(window);

		this.options = {
			postprocessing: true,
			jiggle: true
		};

		var gui = new dat.GUI();
		gui.add(this.options, 'postprocessing');
		gui.add(this.options, 'jiggle');

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

		// load non-AMD THREEjs 
		require([
			srcDir + 'shaders/CopyShader.js',
			srcDir + 'postprocessing/ShaderPass.js',
			srcDir + 'shaders/DotScreenShader.js',
			srcDir + 'postprocessing/RenderPass.js',
			srcDir + 'postprocessing/MaskPass.js',
			srcDir + 'postprocessing/EffectComposer.js'
		], this.onDependencyLoad);
	};

	View.onDependencyLoad = function() {
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

		/***************************
		 * CREATE SCENE OBJECTS
		 ***************************/
		// here you add your objects
		// - you will most likely replace this part by your own
		var light	= new THREE.AmbientLight( 0x88E9CC);
		scene.add( light );

		// add a Pulse Cube  
		this.pulseCube = new PulseCube({ scene : scene });


		/***************************
		 * POST PROCESSING SHADERS
		 ***************************/
		composer = new THREE.EffectComposer( renderer );
		composer.addPass( new THREE.RenderPass( scene, camera ) );

		var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
		dotScreenEffect.uniforms[ 'scale' ].value = 4;

		// ! The last post procesing effect should set renderToScreen to true
		dotScreenEffect.renderToScreen = true;
		composer.addPass( dotScreenEffect );

		this.animate();
	};

	// animation loop
	View.animate = function() {

		// loop on request animation loop
		// - it has to be at the begining of the function
		// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		requestAnimationFrame( this.animate );

		this.pulseCube.update(this.options.jiggle);

		// do the render
		this.render();

		// update stats
		stats.update();
	}

	// render the scene
	View.render = function() {

		// update camera controls
		cameraControls.update();

		// actually render the scene
		if(this.options.postprocessing)
			composer.render( scene, camera );
		else 
			renderer.render( scene, camera );
	}
	
	// Return the view
	return Backbone.View.extend(View);
});