import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { RegisterUser } from 'src/app/models/register_user';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {
    baseURL = "http://localhost:4200/api/auth"

    constructor(
        private http: HttpClient,
        private authService:AuthService
    ) { }

    register(username: string, password: string) :Observable<RegisterUser>{
        return this.http.post<RegisterUser>(this.baseURL + "/register", 
        {
            username: username,
            password: password
        }).pipe(
            catchError(this.handleError<RegisterUser>())
        )
    }


    login (username: string, password: string) : Observable<RegisterUser> {
        return this.http.post<RegisterUser>(this.baseURL + "/login",
        {
            username: username,
            password: password
        }).pipe(
            catchError(this.handleError<RegisterUser>())
        )
    }

    loginGuest() : Observable<RegisterUser> {
        return this.http.post<RegisterUser>(this.baseURL + "/loginGuest",{}).pipe(
            catchError(this.handleError<RegisterUser>())
        )
    }

    logout() :Observable<RegisterUser>{
        this.authService.logout()
        return this.http.post<RegisterUser>(this.baseURL + "/logout",{}, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")}).pipe(
            catchError(this.handleError<RegisterUser>())
        )
    }


    private handleError<T> (result?: T) {
        return (error: any): Observable<T> => {
            // console.log(error.error.message)
            return of (error.error.message as T)      
        }        
    }
}
