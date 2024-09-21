// 月曆
// 點擊圖示顯示月曆
document.getElementById("calendarIcon").addEventListener("click", function () {
  document.getElementById("customDateInput").showPicker(); // 顯示日期選擇器
});
// 點擊 input 顯示月曆
document
  .getElementById("customDateInput")
  .addEventListener("click", function () {
    this.showPicker(); // 顯示日期選擇器
  });
