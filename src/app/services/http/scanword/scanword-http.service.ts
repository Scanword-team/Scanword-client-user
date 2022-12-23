import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scanword } from 'src/app/models/scanword';
import { Stats } from 'src/app/models/stats';
// import { TokenService } from '../../token/token.service';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScanwordHttpService {
    baseURL = "http://localhost:4200/api/scanword"    

    constructor(
        private http: HttpClient,
        private authService:AuthService
    ) { }

    getAllScanword(): Observable<Scanword[]> {
        return this.http.get<Scanword[]>(this.baseURL+ "/getAllWithQuestions", {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")} )
    }

    getStatsById(Id: number): Observable<Stats> {
        return this.http.get<Stats>(this.baseURL + "/getStats/" + Id, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")})
    }   
}
