/*Task 1

Function.prototype.defer = function(ms){
    setTimeout(this, ms);
};

function f(){
    alert("Hello");
}

f.defer(1000);

*/

/*Task 2

Function.prototype.defer = function(ms){
    let customFunction = this;
    return function(...args){
        setTimeout(() => customFunction.apply(this, args), ms);
    }
};

function customFunction(a, b){
    alert(a + b);
}

customFunction.defer(1000)(1, 2);

*/
