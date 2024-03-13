declare var google: any;
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    private router = inject(Router);
    constructor(private _ngZone: NgZone){
    }
    ngOnInit(): void {
        google.accounts.id.initialize({
            client_id: '551484765559-bhm5r9htcal5m13vi8fie6cdd6k7gt5s.apps.googleusercontent.com',
            callback: (resp: any)=> this.handleLogin(resp)
        });

        google.accounts.id.renderButton(document.getElementById("google-btn"), {
            theme: 'filled_blue',
            size: 'large',
            shape: 'rectangle',
            width: 350
          })
    }

    private decodeToken(token: string){
        return JSON.parse(atob(token.split(".")[1]));
      }
    
    handleLogin(response: any){
        if(response) {
          const payLoad = this.decodeToken(response.credential);
          sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
          this._ngZone.run(() => {
            this.router.navigate(['/browse']);
          });
        }
      }
}
