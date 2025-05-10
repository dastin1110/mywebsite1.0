// 筛选功能
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // 设置按钮激活样式
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll(".project-card").forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 添加放大预览逻辑
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").innerText;
    const desc = card.querySelector("p").innerText;
    const imgSrc = card.querySelector("img").getAttribute("src");

    // 如果已存在 overlay，先删除
    const oldOverlay = document.querySelector(".overlay");
    if (oldOverlay) oldOverlay.remove();

    // 创建 overlay 元素
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    overlay.innerHTML = `
      <div class="overlay-content">
        <span class="overlay-close">&times;</span>
        <h2>${title}</h2>
        <p>${desc}</p>
        <img src="${imgSrc}" alt="${title}">
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.style.display = "flex";

    // 关闭按钮逻辑
    overlay.querySelector(".overlay-close").addEventListener("click", () => {
      overlay.remove();
    });

    // 点击空白区域关闭
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  });
});
