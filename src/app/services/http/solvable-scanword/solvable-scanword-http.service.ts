import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SolvableScanwordHttpService {
    baseURL = "http://localhost:4200/api/solvableScanword"    
    

    constructor(
        private http: HttpClient,
        private tokenService:TokenService
    ) { }

    getAllResolvedByScanwordId(Id: number): Observable<Question[]> {
        return this.http.get<Question[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.tokenService.getToken() || "")})
    }

    public saveQuestion(scanwordId: number, question: Question) {
        return this.http.post(this.baseURL + "/addResolvedQuestion/" + scanwordId, question, {headers :new HttpHeaders().append('Authorization', this.tokenService.getToken() || "")})
    }
}