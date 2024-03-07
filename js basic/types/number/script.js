/* Task 1

let fistNumber = +prompt("Enter first number: ");
let secondNumber = +prompt("Enter second number: ");

let result = fistNumber + secondNumber;

alert(result);

*/

/*Task 2

function readNumber(){
    let num;

    do{
        num = prompt("Enter number: ");
    } while(!isFinite(num));

    if(num === '' || num === null){
        return null;
    }

    return +num;
}

readNumber();

*/

/*Task 3

function minMaxRandom(min, max){
    let random = Math.random();
    return min + random * ( max - min );
}

alert(minMaxRandom(2, 5));

*/

/*Task 4

function minMaxIntegerRandom(min, max){
    let random = Math.random();
    let result = min + random * ( max + 1 - min );
    return Math.floor(result);
}

alert(minMaxRandom(2, 5));

*/
