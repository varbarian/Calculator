//  3.  Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
const display = document.getElementsByTagName('display');
const previousOperand = document.getElementById('displayPreviousOperand');
const currentOperand = document.getElementById('displayCurrentOperand');
const operands = Array.from(document.getElementsByClassName('operand'));
const operators = Array.from(document.getElementsByClassName('operator'));
const equal = Array.from(document.getElementsByClassName('equals'));
const clear = Array.from(document.getElementsByClassName('clear'));
let currentOperandValue = null;
let previousOperandValue = null;
let currentOperatorValue = null;
let needReset = false;

//  1. Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, 
//so start by creating functions for the following items and testing them in your browser’s console.
function add(a,b) {
    return a + b;
};

function substract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function divide(a,b) {
    return a / b;
};

//  2.  Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
function operate(operator, a, b) {
    if (operator == '+') {
        return add(a,b);
    } else if (operator == '-') {
        return substract(a,b)
    } else if (operator == '*') {
        return multiply(a,b)
    } else if (operator == '/') {
        return divide(a,b)
    }
};

//  4.  Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in
//a variable somewhere for use in the next step.



//Event Listeners
function operandInput() {
    operands.forEach((button) => {
            button.addEventListener('click', () => addNumber(button.textContent))
    })
};
function operatorInput() {
    operators.forEach((button) => {
        button.addEventListener('click', () => addOperator(button.textContent))
    })
};


//Add numbers to operands
function addNumber(number) {
    currentOperand.textContent += number;
    currentOperandValue = currentOperand.textContent;
};

//Add operators. Transition Value from current operator to previ
function addOperator(value) {
    currentOperatorValue = value;
    console.log(currentOperatorValue);
    // transition the value of current operand to previous operand.
    previousOperandValue = currentOperandValue;
    // refresh the calculator text that displays 1 operand and 1 operator
    previousOperand.textContent = `${previousOperandValue} ${currentOperatorValue}`;
    // empty current operand before adding the next number
    currentOperandValue = null;
    currentOperand.textContent = null;
};

//Calculate
function equals() {
    equal.forEach((button) => {
        button.addEventListener('click', () => {
            console.log(`currentOperatorValue [${currentOperatorValue}], previousOperandValue [${previousOperandValue}], currentOperandValue [${currentOperandValue}]`);
            currentOperandValue = operate(currentOperatorValue, parseInt(previousOperandValue), parseInt(currentOperandValue));
            previousOperandValue = 0;
            previousOperand.textContent = '';
            currentOperand.textContent = currentOperandValue;
        })
    })
};

//Clear screen / values
function clearScreen(){
    clear.forEach((button) => {
        button.addEventListener('click', () => {
            currentOperandValue = null;
            previousOperandValue = null;
            previousOperand.textContent = '';
            currentOperand.textContent = '';
        })
    })
};


operandInput();
operatorInput();
equals();
clearScreen();





















// OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands OLD CODE Operands
// function operandInput() {
//     operands.forEach((button) => {
//         if (currentOperandValue == null) {
//             button.addEventListener('click', () => {
//                 currentOperandValue = 0;
//                 currentOperand.textContent += button.textContent;
//                 currentOperandValue = currentOperand.textContent;
//         })}
//     })
// };

// Operator
// function operatorInput() {
//     operators.forEach((button) => {
//         if (currentOperandValue != null) {
//             button.addEventListener('click', () => {
//                 // puts the chosen operator into variables (1 for display with symbol, 1 for calculation with text)
//                 currentOperatorDisplay = button.textContent;
//                 currentOperatorValue = button.id;
//                 console.log(currentOperatorValue);
//                 // transition the value of current operand to previous operand
//                 previousOperandValue = currentOperandValue;
//                 console.log(`previous ${previousOperandValue}`);
//                 // refresh the calculator text that displays 1 operand and 1 operator
//                 previousOperand.textContent = `${previousOperandValue} ${currentOperatorDisplay}`;
//                 currentOperandValue = null;
//                 currentOperand.textContent = null;
//             })
//         }
//     })
// };