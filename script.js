//1. created all buttons 
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


//2. class with constructor for placement of info on display
class Calculator {
        constructor(previousOperandTextElement, currentOperandTextElement) {
          this.previousOperandTextElement = previousOperandTextElement;
          this.currentOperandTextElement = currentOperandTextElement;
          this.clear();
        }
      //clear diff variables
        clear() {
          this.currentOperand = '';//bottom line;
          this.previousOperand = '';//top line;
                    this.operation = undefined;//not selected
        }
       //delete function 
        delete() {
          this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
      //to add number to the screen  - output //double check
        appendNumber(number) {//user selected number
          if (number === '.' && this.currentOperand.includes('.')) return; //only one period
          this.currentOperand = this.currentOperand.toString() + number.toString();
        }
      
        chooseOperation(operation) {//what the user does
          if (this.currentOperand === '') return;
          if (this.previousOperand !== '') {
            this.compute();
          }
          this.operation = operation;
          this.previousOperand = this.currentOperand;
          this.currentOperand = '';
        }
      //to compute a single value 
        compute() {
          let computation;
          const prev = parseFloat(this.previousOperand);
          const current = parseFloat(this.currentOperand);
          if (isNaN(prev) || isNaN(current)) return;
          switch (this.operation) {
            case '+':
              computation = prev + current;
              break;
            case '-':
              computation = prev - current;
              break;
            case '*':
              computation = prev * current;
              break;
            case '÷':
              computation = prev / current;
              break;
            default:
              return;
          }
          this.currentOperand = computation;
          this.operation = undefined;
          this.previousOperand = '';
        }
      
        getDisplayNumber(number) {
          const stringNumber = number.toString();
          const integerDigits = parseFloat(stringNumber.split('.')[0]);
          const decimalDigits = stringNumber.split('.')[1];
          let integerDisplay;
          if (isNaN(integerDigits)) {
            integerDisplay = '';
          } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
          }
          if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
          } else {
            return integerDisplay;
          }
        }
        //all output on display
        updateDisplay() {
          this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
          if (this.operation != null) {
            this.previousOperandTextElement.innerText =
              `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
          } else {
            this.previousOperandTextElement.innerText = '';
          }
        }
      }
      
        
      //to loop throught the buttons 
      const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
      
      numberButtons.forEach(button => {
        button.addEventListener('click', () => {
          calculator.appendNumber(button.innerText);//adding number 
          calculator.updateDisplay();//updating display as we go 
        });
      });
      
      operationButtons.forEach(button => {
        button.addEventListener('click', () => {
          calculator.chooseOperation(button.innerText);
          calculator.updateDisplay();
        });
      });
      
      equalsButton.addEventListener('click', button => {
        calculator.compute();
        calculator.updateDisplay();
      });
      
      allClearButton.addEventListener('click', button => {
        calculator.clear();
        calculator.updateDisplay();
      });
      
      deleteButton.addEventListener('click', button => {
        calculator.delete();
        calculator.updateDisplay();
      });
  
