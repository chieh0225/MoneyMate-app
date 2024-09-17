document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");

  if (searchInput && clearButton) {
    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      clearButton.style.display = "none"; // 清除後隱藏按鈕
    });

    searchInput.addEventListener("input", () => {
      clearButton.style.display = searchInput.value ? "inline" : "none";
    });
  } else {
  }
});
