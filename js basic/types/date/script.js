/*Task 1

function getSecondsToTomorrow(){
    let now = new Date();

    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    let diff = tomorrow - now;

    return Math.round(diff / 1000);
}

alert( getSecondsToTomorrow() );

*/

/*Task 2

function getLastDayOfMonth(year, month){
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) );

*/
