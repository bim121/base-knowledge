/*Task 1

function camelize(str){
    return str.split('-').map((word, index) => {
        if(index == 0){
            return word;
        }else{
            return word[0].toUpperCase() + word.slice(1)
        }
    }).join('');
}

alert(camelize("background-color") == 'backgroundColor');

*/

/*Task 2

function filterRange(arr, a, b){
    return arr.filter(item => {
        if(a <= item && item <= b){
            return item;
        }
    })
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); 

alert( arr );

*/
