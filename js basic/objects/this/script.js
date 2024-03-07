/*Task 1 

let calculator = {
    read(){
        let firstNumber = prompt("please enter first number: ");
        let secondNumber = prompt("please enter second number: ");

        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
    },
    sum(){
        return +this.firstNumber + +this.secondNumber;
    },
    mul(){
        return this.firstNumber * this.secondNumber;
    },
};
  
calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

*/

/*Task 2

let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { 
      alert( this.step );
      return this;
    }
};

ladder.up().up().down().showStep().down().showStep();

*/
