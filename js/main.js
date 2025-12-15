import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const start = async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: 'targets/targets.mind'
  });

  const { renderer, scene, camera } = mindarThree;

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const anchor = mindarThree.addAnchor(0);

  const loader = new GLTFLoader();
  loader.load('models/modelo.glb', (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    anchor.group.add(gltf.scene);
  });

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

start();
