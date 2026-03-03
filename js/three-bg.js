const canvas = document.querySelector('#bg');

if (canvas && window.THREE) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1200);
  camera.position.set(0, 0, 28);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ambientLight = new THREE.AmbientLight(0x80d1ff, 0.45);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0x5eead4, 2.3, 180);
  keyLight.position.set(15, 10, 20);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x7c3aed, 1.5, 120);
  fillLight.position.set(-18, -8, 6);
  scene.add(fillLight);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2500;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i += 1) {
    const i3 = i * 3;
    starPositions[i3] = (Math.random() - 0.5) * 220;
    starPositions[i3 + 1] = (Math.random() - 0.5) * 220;
    starPositions[i3 + 2] = (Math.random() - 0.5) * 220;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    size: 0.22,
    color: 0xe2f7ff,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  const coreGeometry = new THREE.IcosahedronGeometry(6.8, 32);
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x3af0d9,
    metalness: 0.2,
    roughness: 0.18,
    transmission: 0.8,
    thickness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    transparent: true,
    opacity: 0.65
  });

  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  const wireGeometry = new THREE.TorusKnotGeometry(10, 0.2, 300, 28, 3, 7);
  const wireMaterial = new THREE.MeshStandardMaterial({
    color: 0x8da9ff,
    emissive: 0x1a1f52,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });

  const knot = new THREE.Mesh(wireGeometry, wireMaterial);
  scene.add(knot);

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
  });

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();
    const speed = prefersReducedMotion ? 0.15 : 1;

    core.rotation.x += 0.0017 * speed;
    core.rotation.y += 0.003 * speed;

    knot.rotation.x -= 0.0014 * speed;
    knot.rotation.y += 0.0021 * speed;

    starField.rotation.y += 0.00025 * speed;
    starField.rotation.x = Math.sin(t * 0.11) * 0.02;

    camera.position.x += (pointer.x * 2.1 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 1.5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);
  animate();
}
