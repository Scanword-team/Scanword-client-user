import { Component, OnInit } from '@angular/core';
import { AuthenticationHttpService } from 'src/app/services/http/authentication/authentication-http.service';
// import { TokenService } from 'src/app/services/token/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/register_user';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

    name = ""
    password = ""
    error: RegisterUser| undefined;

    constructor(
        private authenticationHttpService: AuthenticationHttpService,
        private authService: AuthService,
        private router: Router 
        ) { }

    ngOnInit(): void {
    }

    register(): void {
        this.authenticationHttpService.register(this.name, this.password).subscribe(res => {
            this.error = res
        })
    }

    login(): void {
        this.authenticationHttpService.login(this.name, this.password).subscribe( res => {
            this.error = undefined
            if (res.token) {
                this.authService.login(res.role, res.token)
                this.router.navigate(['/scanwords'])
            } else {
                this.error =res
            }            
        })
    }

    loginGuest() {
        this.authenticationHttpService.loginGuest().subscribe(res => {
            this.error = undefined
            if (res.token) {
                console.log(res)
                this.authService.login(res.role, res.token)
                this.router.navigate(['/scanwords'])
            } else {
                this.error =res
            } 
        })
    }
}
