import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.js";
// linkState
import './assets/js/linkState.js';
// chart.js
import "./assets/js/custom-chart.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        displayValue === "0" ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);

      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }

  // 刪減功能的實現
  function handleBackspace() {
    const { displayValue } = calculator;
    if (displayValue.length > 1) {
      calculator.displayValue = displayValue.slice(0, -1);
    } else {
      calculator.displayValue = "0";
    }
  }

  const performCalculation = {
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
  };

  function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function updateDisplay() {
    const display = document.querySelector("#result-input");
    display.value = calculator.displayValue;
  }

  document
    .querySelector("#calculator-modal .modal-body")
    .addEventListener("click", (event) => {
      const { target } = event;
      if (!target.matches("button")) {
        return;
      }

      if (target.classList.contains("operator")) {
        const operatorValue = target.getAttribute("value");
        if (operatorValue === "backspace") {
          handleBackspace(); // 呼叫刪減功能
        } else {
          handleOperator(operatorValue);
        }
        updateDisplay();
        return;
      }

      if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
      }

      if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
      }

      inputDigit(target.value);
      updateDisplay();
    });

  // 當點擊等於按鈕時，將結果顯示到 result-input 並顯示 Offcanvas
  document
    .querySelector("#calculator-modal .equal-sign")
    .addEventListener("click", () => {
      document.getElementById("result-input").value = calculator.displayValue;
      const offcanvasElement = document.getElementById("mainOffcanvas");
      const offcanvas =
        bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.show();
    });
});
