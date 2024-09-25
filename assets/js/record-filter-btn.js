document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // 切換按鈕的 active 狀態
    this.classList.toggle("active");

    // 取得當前已選擇的篩選條件
    const filters = Array.from(
      document.querySelectorAll(".filter-btn.active")
    ).map((btn) => btn.id);

    // 選擇所有的記錄項目
    const records = document.querySelectorAll(".record-item");

    records.forEach((record) => {
      let shouldShow = true;

      // 根據篩選條件判斷是否顯示記錄
      if (filters.includes("filter-date")) {
        // 過濾日期邏輯：匹配多個日期
        const allowedDates = ["2024-07-25", "2024-07-20", "2024-07-15"];
        shouldShow =
          shouldShow && allowedDates.includes(record.getAttribute("data-date"));
      }
      if (filters.includes("filter-type")) {
        // 範例：過濾記帳類型邏輯
        shouldShow = shouldShow && record.getAttribute("data-type") === "支出";
      }
      if (filters.includes("filter-amount")) {
        // 範例：過濾金額
        shouldShow =
          shouldShow && parseInt(record.getAttribute("data-amount")) > 1000;
      }

      // 顯示或隱藏記錄
      record.style.display = shouldShow ? "" : "none";
    });
  });
});
