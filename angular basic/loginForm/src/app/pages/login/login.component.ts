import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
    isSignDivVisiable: boolean = true;

    signUpObj: SignUpModel = new SignUpModel();
    loginObj: LoginModel = new LoginModel();

    constructor(private router: Router){}

    onRegister(){
        debugger;
        const localUser = localStorage.getItem('angular17users');
        if(localUser !== null){
            const users = JSON.parse(localUser);
            users.push(this.signUpObj);
            localStorage.setItem('angular17users', JSON.stringify(users));
        }else{
            const users = [];
            users.push(this.signUpObj);
            localStorage.setItem('angular17users', JSON.stringify(users));
        }
        alert('Registration Success');
    }

    onLogin(){
        debugger;
        const localUser = localStorage.getItem('angular17users');
        if(localUser !== null){
            const users = JSON.parse(localUser);

            const isUserPresent = users.find( (user:SignUpModel)=> user.email === this.loginObj.email && user.password === this.loginObj.password);
            if(isUserPresent !== undefined){
                alert("User found...");
                localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
                this.router.navigateByUrl('/dashboard');
            }else{
                alert('No user found');
            }
        }
    }
}

export class SignUpModel {
    name: string;
    email: string;
    password: string;

    constructor(){
        this.email = '';
        this.name = "";
        this.password = '';
    }
}

export class LoginModel{
    email: string;
    password: string;
    
    constructor(){
        this.email = '';
        this.password = '';
    }
}
