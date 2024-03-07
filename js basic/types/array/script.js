/*Task1

function sumInput(){
    let numbers = [];

    while(true){
        let value = prompt("Enter number: ", 0);

        if(value === '' || value === null || !isFinite(value)) break;

        numbers.push(+value);
    }
    
    let sum = 0;
    
    for(let number of numbers){
        sum += number;
    }

    return sum;
}

alert(sumInput());

*/

/*Task 2 

function getMaxSubSum(arr){
    let maxSum = 0;
    let partialSum = 0;

    for(let item of arr){
        partialSum += item;
        maxSum = Math.max(maxSum, partialSum);
        if(partialSum < 0) partialSum = 0;
    }

    return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) );

*/
