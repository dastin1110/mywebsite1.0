// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Interaction helpers
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let targetSpeed = 0.01;
let currentSpeed = 0.01;
let scaleFactor = 1;
let redirected = false; // 防止重复跳转

// Animate loop
function animate() {
  requestAnimationFrame(animate);

  currentSpeed += (targetSpeed - currentSpeed) * 0.05;
  cube.rotation.x += currentSpeed;
  cube.rotation.y += currentSpeed;

  cube.scale.set(scaleFactor, scaleFactor, scaleFactor);

  renderer.render(scene, camera);

  // 🎯 满足条件后跳转
  if (scaleFactor >= 10 && !redirected) {
    redirected = true;
    document.getElementById("page-body").classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "projects.html";
    }, 1000); // 动画1秒后跳转
  }
}
animate();

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hover interaction
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  targetSpeed = intersects.length > 0 ? 0 : 0.01;
});

// Scroll zoom
window.addEventListener("wheel", (event) => {
  const delta = event.deltaY * -0.001;
  scaleFactor += delta;
  scaleFactor = Math.max(1, Math.min(scaleFactor, 20));
});
