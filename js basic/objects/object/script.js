/* //Task 1

const user = {};

user.name = "John";
user.surname = "Smith";

console.log(user);

user.name = "Pete";

console.log(user);

delete user.name;

console.log(user); 

*/

/* //Task 2

function isEmpty(obj){
    if(Object.keys(obj).length === 0){
        return true;
    }
    return false;
}

let schedule = {};

alert( isEmpty(schedule) );

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); 

*/

/* //Task3

function summarySalary(obj){
    let summary = 0;
    for(let key in obj){
        summary += obj[key];
    }
    return summary;
}

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

console.log(summarySalary(salaries));

*/
/* //Task4

function multiplyNumeric(obj){
    for(let key in obj){
        if(typeof obj[key] === 'number'){
            obj[key] *= 2;
        }
    }
}

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};
  
console.log(multiplyNumeric(menu));

*/
