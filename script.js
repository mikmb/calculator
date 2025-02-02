let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let numberEntered = false;

let resDisplay = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function updateDisplayValue() {
  resDisplay.textContent = displayValue.toString();
  if (displayValue.toString().length > 9) {
    resDisplay.textContent = displayValue.toString().substring(0, 9);
  }
}

updateDisplayValue();

function addClickEventListenerToButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      if (buttons[i].classList.contains("operand")) {
        handleInputOperand(buttons[i].value);
        updateDisplayValue();
      } else if (buttons[i].classList.contains("operator")) {
        handleInputOperator(buttons[i].value);
        updateDisplayValue();
      } else if (buttons[i].classList.contains("equal-sign-button")) {
        handleEqualSign();
        updateDisplayValue();
      } else if (buttons[i].classList.contains("decimal-button")) {
        handleDecimal(buttons[i].value);
        updateDisplayValue();
      } else if (buttons[i].classList.contains("percent-button")) {
        handlePercent(displayValue);
        updateDisplayValue();
      } else if (buttons[i].classList.contains("pos-neg-sign-button")) {
        handleSign(displayValue);
        updateDisplayValue();
      } else if (buttons[i].classList.contains("clear-button")) {
        clearDisplay();
        updateDisplayValue();
      }
    });
  }
}
addClickEventListenerToButtons();

function handleInputOperand(operandValue) {
  numberEntered = true;

  if (firstOperator === null) {
    if (displayValue === 0 || displayValue === "0") {
      displayValue = operandValue;
    } else if (displayValue === firstOperand) {
      displayValue = operandValue;
    } else {
      displayValue += operandValue;
    }
  } else {
    if (displayValue === firstOperand) {
      displayValue = operandValue;
    } else {
      displayValue += operandValue;
    }
  }
}
function handleInputOperator(operator) {
  if (numberEntered) {
    numberEntered = false;

    if (firstOperator != null && secondOperator === null) {
      secondOperator = operator;
      secondOperand = displayValue;
      result = operate(
        firstOperator,
        Number(firstOperand),
        Number(secondOperand)
      );
      displayValue = result;
      firstOperand = displayValue;
      result = null;
    } else if (firstOperator != null && secondOperator != null) {
      secondOperand = displayValue;
      result = operate(
        secondOperator,
        Number(firstOperand),
        Number(secondOperand)
      );
      secondOperator = operator;
      displayValue = result;
      firstOperand = displayValue;
      result = null;
    } else {
      firstOperator = operator;
      firstOperand = displayValue;
    }
  } else {
    firstOperator = operator;
  }
}
function handleEqualSign() {
  if (firstOperator === null) {
    displayValue = displayValue;
  } else if (secondOperator != null) {
    secondOperand = displayValue;
    result = operate(
      secondOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    if (result === "Nice Try!") {
      displayValue = "Nice Try!";
    } else {
      displayValue = result;
      firstOperand = displayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  } else {
    secondOperand = displayValue;
    result = operate(
      firstOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    if (result === "Nice Try!") {
      displayValue = "Nice Try!";
    } else {
      displayValue = result;
      firstOperand = displayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  }
}

function handleDecimal(decimal) {
  if (displayValue === firstOperand || displayValue === secondOperand) {
    displayValue = "0";
    displayValue += decimal;
  } else if (!displayValue.toString().includes(decimal)) {
    displayValue += decimal;
  }
}
function handlePercent(number) {
  displayValue = (number / 100).toString();
}
function handleSign(number) {
  displayValue = (number * -1).toString();
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}
// add
function add(x, y) {
  return x + y;
}
// subtract
function subtract(x, y) {
  return x - y;
}
// multiply
function multiply(x, y) {
  return x * y;
}

// divide
function divide(x, y) {
  if (y === 0) {
    return "Nice Try!";
  } else {
    return x / y;
  }
}

function operate(operator, operand1, operand2) {
  if (operator === "+") {
    return add(operand1, operand2);
  } else if (operator === "-") {
    return subtract(operand1, operand2);
  } else if (operator === "*") {
    return multiply(operand1, operand2);
  } else if (operator === "/") {
    return divide(operand1, operand2);
  }
}
