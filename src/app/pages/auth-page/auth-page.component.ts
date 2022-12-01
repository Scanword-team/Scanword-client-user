import { Component, OnInit } from '@angular/core';
import { AuthenticationHttpService } from 'src/app/services/http/authentication/authentication-http.service';
import { TokenService } from 'src/app/services/token/token.service';
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
        private tokenService: TokenService,
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
                this.tokenService.setToken(res.token)
                this.router.navigate(['/scanwords'])
            } else {
                this.error =res
            }            
        })
    }
}
