import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const params = new URLSearchParams(window.location.search);
const modelName = params.get("model") || "reno";

const mindarThree = new window.MINDAR.IMAGE.MindARThree({
  container: document.body,
  imageTargetSrc: "assets/targets/navidad.mind",
});

const { renderer, scene, camera } = mindarThree;

// Luz
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// Ancla al marcador 0
const anchor = mindarThree.addAnchor(0);

// Cargar modelo
const loader = new GLTFLoader();
loader.load(`assets/models/${modelName}.glb`, (gltf) => {
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  anchor.group.add(gltf.scene);
});

// Iniciar AR
await mindarThree.start();
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
