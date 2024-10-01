// 載入圖片
import statusbarDark from "/assets/images/statusbar-dark.svg";
import statusbar from "/assets/images/statusbar.svg";

// 深色模式初始化
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeImages = document.querySelectorAll(".status-bar"); // 選擇所有 .status-bar 的圖片元素

  function updateImageForDarkMode() {
    darkModeImages.forEach((image) => {
      if (document.body.classList.contains("dark-mode")) {
        image.src = statusbarDark; // 深色模式的圖片
      } else {
        image.src = statusbar; // 淺色模式的圖片
      }
    });
  }

  // 根據 localStorage 設定深色模式與按鈕狀態
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) {
      darkModeToggle.checked = true; // 設定按鈕為開啟狀態
    }
  }

  updateImageForDarkMode(); // 初始化時更新圖片

  // 在 setting.html 中處理深色模式切換
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("dark-mode", isDarkMode);
      updateImageForDarkMode(); // 更新圖片
    });
  }
});
