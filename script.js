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
const display = document.getElementById('display');
const previousOperand = document.getElementById('displayPreviousOperand');
const currentOperand = document.getElementById('displayCurrentOperand');
const operands = Array.from(document.getElementsByClassName('operand'));
const operators = Array.from(document.getElementsByClassName('operator'));
const dot = document.getElementById('dot');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
let currentOperandValue = null;
let previousOperandValue = null;
let currentOperatorValue = null;
let storedOperatorValue = null;
let dotDisable = false;

//  4.  Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in
//a variable somewhere for use in the next step.

//Event Listeners
equal.addEventListener('click', () => calculate());
clear.addEventListener('click', () => wipeScreenData());
backspace.addEventListener('click', () => deleteSymbol());

function operandInput() {
    operands.forEach((button) => {
            button.addEventListener('click', () => addNumber(button.textContent))
    })
};

function dotBtnEnabler(){
dot.addEventListener('click', () => addDot(),{once:true});
};

function operatorInput() {
    operators.forEach((button) => {
        button.addEventListener('click', () => addOperator(button.textContent))
    })
};

//Keyboard Support
document.addEventListener('keydown',logKey);
function logKey(e){
    if (e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' || e.key == '9' || e.key == '0') {
        addNumber(e.key);
    } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' ) {
        addOperator(e.key);
    } else if (e.key == '.') {
        addDot();
    } else if (e.key == 'Backspace') {
        deleteSymbol();
    } else if (e.key == 'Escape') {
        wipeScreenData();
    } else if (e.key == '=') {
        calculate();
    }
};


//Add numbers to operands
function addNumber(number) {
    currentOperand.textContent += number;
    currentOperandValue = currentOperand.textContent;
};
//Add dot to operands
function addDot() {
    if (dotDisable == false) {
        currentOperand.textContent += '.';
        currentOperandValue = currentOperand.textContent;
        dotDisable = true;
    }
};

//ResetDotBtn
function ResetDotBtn(){
    if (dotDisable == true) {
        dotBtnEnabler();
        dotDisable = false;
    }
};

//Add operators. shift Value from current operator to previous
function addOperator(value) {
    //able to add dot again to number
    ResetDotBtn();
    //if this is second operator input
    if (currentOperandValue != null && previousOperandValue != null && currentOperatorValue != null) {
        storedOperatorValue = value;
        calculate();
        currentOperatorValue = storedOperatorValue;
        // storedOperatorValue = '';
        storedOperatorValue = null;
        previousOperandValue = currentOperandValue;
        // currentOperandValue = '';
        currentOperandValue = null;
        currentOperand.textContent = null;
        previousOperand.textContent = `${previousOperandValue} ${currentOperatorValue}`;
    //if this is the first operator input
    } else if (currentOperandValue != null && previousOperandValue == null) {
        currentOperatorValue = value;
        // transition the value of current operand to previous operand.
        previousOperandValue = currentOperandValue;
        // refresh the calculator text that displays 1 operand and 1 operator
        previousOperand.textContent = `${previousOperandValue} ${currentOperatorValue}`;
        // empty current operand before adding the next number
        currentOperandValue = null;
        currentOperand.textContent = null;
    } else if (currentOperandValue == null && previousOperandValue != null && currentOperatorValue != null) {
        currentOperatorValue = value;
        previousOperand.textContent = `${previousOperandValue} ${currentOperatorValue}`;
    }
};

//Calculate
function calculate() {5
    if (currentOperandValue != null && previousOperandValue != null && currentOperatorValue != null) {
        // console.log(`currentOperatorValue [${currentOperatorValue}], previousOperandValue [${previousOperandValue}], currentOperandValue [${currentOperandValue}]`);
        if (previousOperandValue == 0 || currentOperandValue == 0 && currentOperatorValue == '/') {
            wipeScreenData();
            currentOperand.textContent = `(:`
            return;
        };
        currentOperandValue = (operate(currentOperatorValue, parseFloat(previousOperandValue), parseFloat(currentOperandValue)));
        //round numbers with long decimals to two positions after '.'
        if (currentOperandValue % 1 != 0) {
            currentOperandValue = currentOperandValue.toFixed(1);
        };
        currentOperand.textContent = currentOperandValue;
        previousOperandValue = null;
        previousOperand.textContent = null;
        currentOperatorValue = null;
    } else if (currentOperandValue != null && currentOperatorValue != null){
        currentOperandValue = previousOperandValue;
        currentOperand.textContent = currentOperandValue;
        previousOperandValue = null;
        previousOperand.textContent = null;
    } else if (currentOperandValue != null && currentOperatorValue == null) {
        return;
    }
};

//All clear button
function wipeScreenData() {
    currentOperandValue = null;
    previousOperandValue = null;
    previousOperand.textContent = '';
    currentOperand.textContent = '';
    ResetDotBtn();
};

//backspace button
function deleteSymbol(){
    currentOperand.textContent = (currentOperand.textContent).slice(0,-1);
    currentOperandValue = currentOperand.textContent;
};

//load functions
operandInput();
operatorInput();
dotBtnEnabler();

