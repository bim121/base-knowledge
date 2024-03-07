/*Task 1

function ucFirst(str){
    if(!str) return str;

    return str[0].upperCase() + str.splice(0);
}

alert(ucFirst("dfd"));

*/

/*Task 2

function checkSpam(str){
    let lower = str.toLowerCase();

    return lower.includes('viagra') || lower.includes('xxx');
}

alert(checkSpam( "dfdfviagra" ));

*/

/*Task 3

function truncate(str, maxLength){
    return (str.length > maxLength) ? str.splice(0, maxLength - 1) + '...' : str;
}

alert(truncate("sdfsdf", 2));

*/

/*Task 4

function extractCurrencyValue(str){
    return +str.splice(1);
}

alert(extractCurrencyValue("$12"));

*/
