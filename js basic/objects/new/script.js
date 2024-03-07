/*Task 1

let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() );

*/

/*Task 2

function Calculator(){
    this.read = function(){
        let firstNumber = prompt("please enter first number: ");
        let secondNumber = prompt("please enter second number: ");

        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
    };
    this.sum = function(){
        return +this.firstNumber + +this.secondNumber;
    };
    this.mul = function(){
        return this.firstNumber * this.secondNumber;
    };
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

*/

/*Task 3

function Accumulator(startingValue){
    this.value = +startingValue;
    this.read = function(){
        let userInput = prompt("please enter first number: ");
        this.value += +userInput;
    }
}

let accumulator = new Accumulator(1);

accumulator.read(); 
accumulator.read();

alert(accumulator.value);

*/