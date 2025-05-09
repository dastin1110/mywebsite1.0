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

// Bigger cube
const geometry = new THREE.BoxGeometry(2, 2, 2); // 初始立方体尺寸
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Raycaster & mouse for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let targetSpeed = 0.01;
let currentSpeed = 0.01;

// 缩放相关
let scaleFactor = 1;

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  currentSpeed += (targetSpeed - currentSpeed) * 0.05;

  cube.rotation.x += currentSpeed;
  cube.rotation.y += currentSpeed;

  cube.scale.set(scaleFactor, scaleFactor, scaleFactor); // 应用缩放

  renderer.render(scene, camera);
}
animate();

// 窗口缩放适配
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 鼠标移动控制旋转速度
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    targetSpeed = 0; // 鼠标悬停时停止旋转
  } else {
    targetSpeed = 0.01;
  }
});

// 鼠标滚轮控制缩放
window.addEventListener("wheel", (event) => {
  // 根据滚动方向调整缩放因子
  const delta = event.deltaY * -0.001;
  scaleFactor += delta;

  // 限制缩放范围（可见后超出视野）
  scaleFactor = Math.max(1, Math.min(scaleFactor, 20));
});
