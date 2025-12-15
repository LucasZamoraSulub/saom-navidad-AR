const start = async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: 'targets/targets.mind'
  });

  const { renderer, scene, camera } = mindarThree;

  // Luz
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Ancla del marcador
  const anchor = mindarThree.addAnchor(0);

  // Loader GLTF (ya viene con THREE)
  const loader = new THREE.GLTFLoader();
  loader.load('models/PikachuAnimadoNavidad2.glb', (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    anchor.group.add(gltf.scene);
  });

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

start();
