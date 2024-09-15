import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.js";

// 計算機.js
import "./assets/js/calculator.js";

// chart.js
import "./assets/js/custom-chart.js";

console.log("Hello world!");

// 深色模式初始化
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeImages = document.querySelectorAll(".status-bar"); // 選擇所有 .status-bar 的圖片元素

  function getImagePath(imageName) {
    const isGitHubPages = window.location.hostname === "chieh0225.github.io";
    const basePath = isGitHubPages
      ? "/MoneyMate-app/assets/images/"
      : "assets/images/";
    return basePath + imageName;
  }

  function updateImageForDarkMode() {
    darkModeImages.forEach((image) => {
      if (document.body.classList.contains("dark-mode")) {
        image.src = getImagePath("statusbar-dark.svg"); // 深色模式的圖片
      } else {
        image.src = getImagePath("statusbar.svg"); // 淺色模式的圖片
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

// footer nav
window.addEventListener("DOMContentLoaded", () => {
  // 選擇 navItems 和設置事件
  const navItems = document.querySelectorAll(".nav-item");

  // 當頁面載入時，根據 LocalStorage 的值設定樣式
  const activeLink = localStorage.getItem("activeNavItem");
  console.log("Active Link from LocalStorage:", activeLink); // 調試用
  if (activeLink) {
    const absoluteActiveLink = new URL(activeLink, window.location.origin).href;
    console.log(
      "Active Link from LocalStorage (Absolute):",
      absoluteActiveLink
    ); // 調試用

    navItems.forEach((item) => {
      const linkElement = item.querySelector("a");
      if (linkElement) {
        // 確保 href 值為絕對路徑進行比較
        const link = new URL(
          linkElement.getAttribute("href"),
          window.location.origin
        ).href;
        console.log("Current link:", link); // 調試用
        if (link === absoluteActiveLink) {
          item.classList.add("active");
        }
      }
    });
  }

  // 為每個 navItem 綁定點擊事件
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 移除其他選項的 active 樣式
      navItems.forEach((nav) => nav.classList.remove("active"));
      // 為點選的項目添加 active 樣式
      this.classList.add("active");

      // 將選中的項目的 href 存入 LocalStorage
      const linkElement = this.querySelector("a");
      if (linkElement) {
        const link = new URL(
          linkElement.getAttribute("href"),
          window.location.origin
        ).href;
        console.log("Saving Active Link to LocalStorage:", link); // 調試用
        localStorage.setItem("activeNavItem", link);
      }
    });
  });
});
