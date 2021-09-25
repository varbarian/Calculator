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
        return substract(a,b);
    } else if (operator == '*') {
        return multiply(a,b);
    } else if (operator == '/') {
        return divide(a,b);
    }
};

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
let storedOperatorValue = null;

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
function equals() {
    equal.forEach((button) => {
        button.addEventListener('click', () => calculate()
        )
    })
};
function clearScreen() {
    clear.forEach((button) => {
        button.addEventListener('click', () => wipeScreenData()
        )
    })
};

//Add numbers to operands
function addNumber(number) {
    currentOperand.textContent += number;
    currentOperandValue = currentOperand.textContent;
};

//Add operators. shift Value from current operator to previous
function addOperator(value) {
    //if this is second operand input
    if (currentOperandValue != null && previousOperandValue != null && currentOperatorValue != null) {
        storedOperatorValue = value;
        console.log(`stored operator value is ${storedOperatorValue}`);
        calculate();
        currentOperatorValue = storedOperatorValue;
        console.log(`shifted current operator value to ${currentOperatorValue}`);
        storedOperatorValue = '';
        console.log(`stored operator value is ${storedOperatorValue}`);
    }
    //if this is the first operand input
    if (currentOperandValue != null && previousOperandValue == null) {
    currentOperatorValue = value;
    // transition the value of current operand to previous operand.
    previousOperandValue = currentOperandValue;
    // refresh the calculator text that displays 1 operand and 1 operator
    previousOperand.textContent = `${previousOperandValue} ${currentOperatorValue}`;
    // empty current operand before adding the next number
    currentOperandValue = null;
    currentOperand.textContent = null;
    }
};

//Calculate
function calculate() {
    if (currentOperandValue != null && previousOperandValue != null && currentOperatorValue != null) {
        console.log(`currentOperatorValue [${currentOperatorValue}], previousOperandValue [${previousOperandValue}], currentOperandValue [${currentOperandValue}]`);
        if (previousOperandValue == 0 || currentOperandValue == 0) {
            wipeScreenData();
            currentOperand.textContent = `(:`
            return;
        }
        currentOperandValue = (operate(currentOperatorValue, parseFloat(previousOperandValue), parseFloat(currentOperandValue)));
        console.log(` value is ${currentOperandValue}`);
        //round numbers with long decimals to two positions after .
        if (currentOperandValue % 1 != 0) {
            currentOperandValue = currentOperandValue.toFixed(2);
        };
        currentOperand.textContent = currentOperandValue;
        previousOperandValue = null;
        previousOperand.textContent = '';
        currentOperatorValue = null;
    } else if (currentOperatorValue != null && currentOperatorValue != null){
        currentOperandValue = previousOperandValue;
        currentOperand.textContent = currentOperandValue;
        previousOperandValue = null;
        previousOperand.textContent = '';
    } else if (currentOperandValue != null && currentOperatorValue == null) {
        return;
    }
};


function wipeScreenData() {
    currentOperandValue = null;
    previousOperandValue = null;
    previousOperand.textContent = '';
    currentOperand.textContent = '';
};

operandInput();
operatorInput();
equals();
clearScreen();