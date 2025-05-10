// 分类按钮逻辑
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // 更新激活按钮状态
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    cards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 弹窗逻辑
const overlay = document.getElementById('projectOverlay');
const overlayImage = document.getElementById('overlayImage');
const overlayTitle = document.getElementById('overlayTitle');
const overlayIntro = document.getElementById('overlayIntro');
const overlayCategory = document.getElementById('overlayCategory');
const overlayDescription = document.getElementById('overlayDescription');
const closeBtn = document.querySelector('.close-btn');

// 每个卡片绑定点击事件
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3').innerText;
    const intro = card.querySelector('p').innerText;
    const category = [...card.classList].find(cls => cls !== 'project-card');

    overlayImage.src = img.src;
    overlayTitle.textContent = title;
    overlayIntro.textContent = intro;
    overlayCategory.textContent = category;
    overlayDescription.textContent = `${title} is a ${category} project.`;

    overlay.classList.remove("hidden");
  });
});

// 关闭按钮事件
closeBtn.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

// 点击覆盖层其他区域也关闭
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});
