let user = {
    name: "Elysa Male",
    age: 35
}

let userJson = JSON.parse(JSON.stringify(user));

alert(userJson);
