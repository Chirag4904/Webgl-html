import "./style.css";
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.getElementById("container");
let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
	45,
	canvasWidth / canvasHeight,
	0.1,
	3000
);
camera.position.setZ(10);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//Window resize
window.addEventListener("resize", () => {
	// Update camera
	camera.aspect = canvasWidth / canvasHeight;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);

renderer.render(scene, camera);
const number_of_particles = 512 * 512;
const geometry = new THREE.PlaneBufferGeometry(3, 3, 100, 100);
// const material = new THREE.PointsMaterial({ side: THREE.DoubleSide });
const material = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
	uniforms: {
		progress: { type: "f", value: 0 },
	},
	side: THREE.DoubleSide,
});
const plane = new THREE.Points(geometry, material);
scene.add(plane);

//Animate
const clock = new THREE.Clock();

function animate() {
	const elapsedTime = clock.getElapsedTime();

	controls.update();

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
