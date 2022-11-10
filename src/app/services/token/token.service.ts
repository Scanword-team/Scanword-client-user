import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

    constructor() { }
  
    public getToken() {        
        return localStorage.getItem('token')        
    }

    setToken(token: string) {
        localStorage.setItem('token', token)
    }
}
