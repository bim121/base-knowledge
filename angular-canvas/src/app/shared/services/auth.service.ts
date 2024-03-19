import { Injectable } from "@angular/core";
import { IUser } from "../entity/user.entity";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    private readonly _baseUrl = 'https://dummyjson.com/';
    private _user: IUser | null = null;
    
    constructor(private readonly _httpClient: HttpClient){ }

    public get isAuthorized(): boolean{
        return !!this._user || false;
    }

    public get profile(): IUser | null{
        return this._user;
    }

    public get token(): string | undefined{
        return this._user?.token;
    }

    public restoreUserFromStorage(): IUser | undefined{
        let userData;
        if(this._user){
            return this._user;
        }else if((userData = localStorage.getItem('UserData'))){
            return (this._user = JSON.parse(userData));
        }
        return undefined;
    }

    public login(username: string, password: string){
        return this._httpClient
            .post<IUser>(`${this._baseUrl}auth/login`, {username, password})
            .pipe(
                tap((v) => {
                    this._user = v;
                    localStorage.setItem('UserData', JSON.stringify(v));
                })
            )
    }

    public logout(){
        this._user = null;
        localStorage.removeItem('UserData');
    }
}
