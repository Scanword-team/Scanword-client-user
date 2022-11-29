import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { RegisterUser } from 'src/app/models/register_user';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {
    baseURL = "http://localhost:4200/api/auth"

    constructor(
        private http: HttpClient,
    ) { }

    public register(username: string, password: string) {
        return this.http.post(this.baseURL + "/register", 
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

    private handleError<T> (result?: T) {
        return (error: any): Observable<T> => {
            alert(error.error.message)
            
            return of(result as T);        
        }        
    }
}
