import * as bootstrap from "bootstrap"; // 將 Bootstrap 整個模組導入

// 顯示 Toast
function showToast() {
  const toastContainer = document.getElementById("toastPlacement");
  const toastElement = toastContainer.querySelector(".toast"); // 獲取已存在的 Toast

  // 創建 Toast 實例
  const toast = new bootstrap.Toast(toastElement);
  toast.show(); // 顯示 Toast

  // 自動隱藏 Toast
  setTimeout(() => {
    toast.hide(); // 隱藏 Toast
  }, 5000); // 5 秒後自動隱藏
}

// 清除 URL 中的 showToast 參數並跳轉到目標頁面
function clearToastParam(event) {
  event.preventDefault(); // 防止默認的點擊行為

  const currentPage = window.location.pathname.split("/").pop(); // 獲取當前頁面名稱
  let targetPage = ""; // 初始化目標頁面

  // 根據當前頁面決定跳轉的目標頁面
  if (currentPage === "index.html") {
    targetPage = "record.html";
  } else if (currentPage === "travel-index.html") {
    targetPage = "travel-record.html";
  } else if (currentPage === "group-index.html") {
    targetPage = "travel-record.html";
  } else if (currentPage === "record.html") {
    targetPage = "record.html"; // 保持在同一頁面
  } else if (currentPage === "travel-record.html") {
    targetPage = "travel-record.html"; // 保持在同一頁面
  }

  // 清除 URL 中的 showToast 參數，並重新添加
  const url = new URL(window.location.href);
  url.searchParams.delete("showToast"); // 清除 showToast 參數
  url.searchParams.set("showToast", "true"); // 重新添加 showToast 參數

  // 跳轉到目標頁面
  if (targetPage) {
    window.location.href = `${targetPage}?${url.searchParams.toString()}`; // 跳轉到目標頁面
  }
}

// 等待 DOM 完成加載
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  // 顯示預先定義好的 Toast
  if (urlParams.has("showToast")) {
    showToast();
  }

  // 綁定點擊事件到 <a> 標籤
  const doneButton = document.querySelector(".done-btn");
  if (doneButton) {
    doneButton.onclick = (event) => {
      clearToastParam(event); // 處理跳轉邏輯
    };
  }

  // 綁定點擊事件到關閉按鈕
  const closeButton = document.getElementById("closeToastButton"); // 使用 id 獲取按鈕
  if (closeButton) {
    closeButton.onclick = () => {
      const toastElement = closeButton.closest(".toast");
      const toast = bootstrap.Toast.getInstance(toastElement);
      if (toast) {
        toast.hide(); // 隱藏 Toast

        // 清除 URL 中的 showToast 參數
        const url = new URL(window.location.href);
        url.searchParams.delete("showToast"); // 清除 showToast 參數

        // 更新網址，不刷新頁面
        window.history.replaceState({}, document.title, url.toString()); // 更新 URL
      }
    };
  }
});
