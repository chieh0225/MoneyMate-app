document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");

  if (searchInput && clearButton) {
    // 當點擊清除按鈕時，清空輸入框
    clearButton.addEventListener("click", () => {
      searchInput.value = ""; // 清空輸入框內容
      searchInput.focus(); // 重新獲取焦點
    });

    // 當輸入框內容變化時，根據有無內容顯示或隱藏按鈕
    searchInput.addEventListener("input", () => {
      // 清除按鈕的顯示邏輯由 CSS 控制，這裡不需要額外處理
    });

    // 當輸入框獲得焦點時，隱藏 placeholder
    searchInput.addEventListener("focus", () => {
      searchInput.placeholder = ""; // 隱藏 placeholder
      if (searchInput.value) {
        clearButton.style.display = "inline"; // 有內容時顯示按鈕
      }
    });

    // 當輸入框失去焦點時，恢復 placeholder（可選）
    searchInput.addEventListener("blur", () => {
      if (!searchInput.value) {
        searchInput.placeholder = "搜尋記帳記錄"; // 恢復 placeholder
      }
    });
  }
});
