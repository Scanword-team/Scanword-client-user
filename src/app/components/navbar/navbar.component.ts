import { Component, OnInit } from '@angular/core';
import { AuthenticationHttpService } from 'src/app/services/http/authentication/authentication-http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private authenticationHttpService: AuthenticationHttpService) { }

    ngOnInit(): void {
    }

    onClickLogout() : void {
        this.authenticationHttpService.logout().subscribe()
    }
}
