// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
let currentInput = "";
let operator = "";
let firstOperand = null;
let secondOperand = null;

// Event listener for buttons
buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    const value = event.target.dataset.value;

    // Handle digit buttons
    if (value >= "0" && value <= "9") {
      currentInput += value;
      display.textContent = currentInput;
    }
    //Handles decimal point(.)
    else if (value === "." && !currentInput.includes(".")) {
        currentInput += value;
        display.textContent = currentInput;
      }

    // Handle operator buttons (+, -, *, /)
    else if (["+", "-", "*", "/"].includes(value)) {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        operator = value;
        currentInput = "";
      } else if (currentInput !== "") {
        secondOperand = parseFloat(currentInput);
        firstOperand = performCalculation(firstOperand, secondOperand, operator);
        operator = value;
        currentInput = "";
        display.textContent = firstOperand;
      }
    }

    // Handle equals button
    else if (value === "=") {
      if (firstOperand !== null && currentInput !== "") {
        secondOperand = parseFloat(currentInput);
        const result = performCalculation(firstOperand, secondOperand, operator);
        display.textContent = result;
        firstOperand = result;
        operator = "";
        currentInput = "";
      }
    }

    // Handle clear button
    else if (value === "C") {
      currentInput = "";
      firstOperand = null;
      secondOperand = null;
      operator = "";
      display.textContent = "";
    }
  });
});

// Function to perform calculations
function performCalculation(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    if (second === 0) {
      alert("Cannot divide by zero!");
      return first;
    }
    return first / second;
  }
}
