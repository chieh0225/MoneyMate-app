// 計算機功能
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
