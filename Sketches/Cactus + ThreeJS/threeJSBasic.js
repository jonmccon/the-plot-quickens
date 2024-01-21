// Import necessary modules from three.js
import * as THREE from 'https://threejs.org/build/three.module.js';
import { OBJExporter } from 'https://threejs.org/examples/jsm/exporters/OBJExporter.js';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Add a cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Render the scene
renderer.render(scene, camera);

// Export the scene to an OBJ file
const exporter = new OBJExporter();
const result = exporter.parse(scene);
console.log(result); // This will log the OBJ file content to the console