let user = {
    name: "John",
    years: 30,
};

let {name, year: age, isAdmin = false} = user;

alert( name ); 
alert( age ); 
alert( isAdmin );
