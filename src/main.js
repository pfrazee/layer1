var World = require('./world');
var CameraControls = require('./camera-controls');

// global state & behaviors
window.world = new World(); // a whole new woooooorld

// init
setup();
tick();

function setup() {
	// setup camera
	window.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1500;

	// setup scene
	window.scene = new THREE.Scene();
	world.setup(scene);

	// setup renderer
	window.renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';
	document.getElementById('world-div').appendChild(renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);

	// setup controls
	window.cameraControls = new CameraControls(camera, renderer.domElement);
	cameraControls.minDistance = 100;
	cameraControls.maxDistance = 6000;
	cameraControls.noEdgePan = true;
	cameraControls.noKeyboardPan = true;
	cameraControls.staticMousePan = true;
	cameraControls.addEventListener( 'change', render );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}

function tick() {
	requestAnimationFrame(tick);
	cameraControls.update();
	TWEEN.update();
	render();
}

function render() {
	renderer.render(scene, camera);
}