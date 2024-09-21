// 計算機功能
document.addEventListener("DOMContentLoaded", () => {
  const calculator = {
    displayValue: "0",
    expression: "", // 用來存儲完整的運算式
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
    // 更新運算式
    calculator.expression += digit;
  }

  function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
      calculator.expression += dot; // 更新運算式
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

    // 根據運算符號更新運算式
    if (nextOperator === "+") {
      calculator.expression += " + ";
    } else if (nextOperator === "-") {
      calculator.expression += " - ";
    } else if (nextOperator === "*") {
      calculator.expression += " × ";
    } else if (nextOperator === "/") {
      calculator.expression += " ÷ ";
    }

    updateDisplay(calculator.expression); // 顯示運算式
  }

  function handleBackspace() {
    const { displayValue, expression } = calculator;
    if (displayValue.length > 1) {
      calculator.displayValue = displayValue.slice(0, -1);
      calculator.expression = expression.slice(0, -1); // 更新運算式
    } else {
      calculator.displayValue = "0";
      calculator.expression = ""; // 清空運算式
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
    calculator.expression = ""; // 重置運算式
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function updateDisplay(value) {
    const display = document.querySelector("#result-input");
    display.value = value;
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
        updateDisplay(calculator.expression); // 實時顯示運算式
        return;
      }

      if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay(calculator.expression); // 實時顯示運算式
        return;
      }

      if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay(calculator.expression); // 重置後顯示空運算式
        return;
      }

      inputDigit(target.value);
      updateDisplay(calculator.expression); // 實時顯示運算式
    });

  // 當點擊等於按鈕時，將結果顯示到 result-input 並顯示 Offcanvas
  document
    .querySelector("#calculator-modal .equal-sign")
    .addEventListener("click", () => {
      const { firstOperand, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);

      if (firstOperand != null && operator != null) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = null;
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
        calculator.expression = result; // 更新顯示為最終結果
      }

      updateDisplay(calculator.displayValue); // 顯示最終結果

      const offcanvasElement = document.getElementById("mainOffcanvas");
      const offcanvas =
        bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.show();
    });
});
