import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(route, url)
    }

    checkUserLogin(route : ActivatedRouteSnapshot, url: any) : boolean {
        if (this.authService.isLoggedIn()) {
            const userRole = this.authService.getRole()
            if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/auth'])
        return false
    }  
}
