const canvas = document.querySelector('#bg');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Adding a starfield
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 1500;
const posArray = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starsMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

// Central Nebula-like Sphere
const geometry = new THREE.IcosahedronGeometry(10, 2);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x1a2238, 
    wireframe: true,
    transparent: true,
    opacity: 0.1 
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const light = new THREE.PointLight(0x5eead4, 2);
light.position.set(10, 10, 10);
scene.add(light);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    sphere.rotation.y += 0.002;
    starMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();