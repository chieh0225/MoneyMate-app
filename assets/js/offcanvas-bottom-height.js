document.addEventListener("DOMContentLoaded", () => {
  const offcanvas = document.querySelector(".offcanvas-bottom");
  const toolBarHeight = 56; // 根據實際工具列的高度設置
  const updateOffcanvasHeight = () => {
    const maxHeight = window.innerHeight - toolBarHeight; // 獲取可見高度
    offcanvas.style.maxHeight = `${maxHeight}px`; // 設置最大高度
  };

  // 初始設置
  updateOffcanvasHeight();

  // 當窗口大小改變時更新高度
  window.addEventListener("resize", updateOffcanvasHeight);
});
