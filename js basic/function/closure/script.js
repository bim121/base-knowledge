/*Task 1

function sun(a){

    return function(b){
        return a + b;
    }
}

alert( sum(1)(2) ); 
alert( sum(5)(-1) );

*/

/*Task 2

function inBetween(a, b){
    return function(x){
        return x >= a && x <= b;
    }
}

function inArray(arr){
    return function(x){
        return arr.includes(x);
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) );

alert( arr.filter(inArray([1, 2, 10])) )

*/

/*Task 3

function byField(fieldName){
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

alert(users.sort(byField('age')));

*/
