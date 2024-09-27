document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");

  if (searchInput && clearButton) {
    // 當點擊清除按鈕時，清空輸入框並隱藏按鈕
    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      clearButton.style.display = "none"; // 清除後隱藏按鈕
    });

    // 當輸入框內容變化時，根據有無內容顯示或隱藏按鈕
    searchInput.addEventListener("input", () => {
      clearButton.style.display = searchInput.value ? "inline" : "none";
    });

    // 如果輸入框失去焦點且沒有內容，隱藏清除按鈕
    searchInput.addEventListener("blur", () => {
      if (!searchInput.value) {
        clearButton.style.display = "none";
      }
    });

    // 當輸入框獲得焦點時，如果有內容則顯示清除按鈕
    searchInput.addEventListener("focus", () => {
      if (searchInput.value) {
        clearButton.style.display = "inline";
      }
    });
  }
});
