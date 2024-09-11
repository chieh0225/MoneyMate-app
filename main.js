import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world!");

// 深色模式初始化
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");

  // 根據 localStorage 設定深色模式與按鈕狀態
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) {
      darkModeToggle.checked = true; // 設定按鈕為開啟狀態
    }
  }

  // 在 setting.html 中處理深色模式切換
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "dark-mode",
        document.body.classList.contains("dark-mode")
      );
    });
  }
});
