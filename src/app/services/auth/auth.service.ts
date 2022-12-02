import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLogin = false;

    roleAs: string = "";
    tokenAs: string = "";


    constructor() { }

    login(role: string, token: string) {
        this.isLogin = true
        this.roleAs = role
        this.tokenAs = token
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', this.roleAs)
        localStorage.setItem('TOKEN', this.tokenAs)
        return of({success: this.isLogin, role: this.roleAs})
    }

    logout() {
        this.isLogin = false
        this.roleAs = ""
        this.tokenAs = ""
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ROLE', "")
        localStorage.setItem('TOKEN', "")
        return of({success: this.isLogin, role: this.roleAs})
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true')
          this.isLogin = true;
        else
          this.isLogin = false;
        return this.isLogin; 
    }

    getRole() {
        let role  = localStorage.getItem('ROLE');
        if (role) {
            this.roleAs = role
        } else {
            this.roleAs = ""
        }
        return this.roleAs;
    }


    getToken() {
        let token  = localStorage.getItem('TOKEN');
        if (token) {
            this.tokenAs = token
        } else {
            this.tokenAs = ""
        }
        return this.tokenAs;
    }
}
