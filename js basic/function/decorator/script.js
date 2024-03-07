/*Task 1

function spy(func){

    function wrapper(...args){
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];

    return wrapper;
}

function work(a, b) {
    alert( a + b ); 
}
  
work = spy(work);
  
work(1, 2); 
work(4, 5); 
  
for (let args of work.calls) {
    alert( 'call:' + args.join() );
}

*/

/*Task 2

function debounce(func, ms){
    let timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    }
}

*/
