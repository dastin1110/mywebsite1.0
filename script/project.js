// Debug log to confirm JS is loaded
console.log("✅ project.js loaded");

// 筛选功能
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // 移除所有按钮的激活状态
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 获取筛选类别
    const filter = btn.getAttribute("data-filter");

    // 显示/隐藏卡片
    document.querySelectorAll(".project-card").forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 项目卡片点击事件
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").innerText;
    const intro = card.querySelector("p").innerText;
    const imgSrc = card.querySelector("img").getAttribute("src");
    const category = [...card.classList].find(cls => cls !== "project-card");

    // 填充 overlay 内容
    document.getElementById("overlayTitle").textContent = title;
    document.getElementById("overlayIntro").textContent = intro;
    document.getElementById("overlayImage").src = imgSrc;
    document.getElementById("overlayCategory").textContent = category;
    document.getElementById("overlayDescription").textContent = "More detailed description will go here.";

    // 显示 overlay
    const overlay = document.getElementById("projectOverlay");
    overlay.classList.remove("hidden");
    overlay.style.display = "flex";
  });
});

// 关闭按钮事件
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("projectOverlay").style.display = "none";
});
