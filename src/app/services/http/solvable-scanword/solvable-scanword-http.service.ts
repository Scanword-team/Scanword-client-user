import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { AuthService } from '../../auth/auth.service';
import { SolvableScanword } from 'src/app/models/solvable_scanword';

@Injectable({
  providedIn: 'root'
})
export class SolvableScanwordHttpService {
    baseURL = "http://localhost:4200/api/solvableScanword"    
    

    constructor(
        private http: HttpClient,
        private authService:AuthService
    ) { }

    getAllResolvedByScanwordId(Id: number): Observable<Question[]> {
        return this.http.get<Question[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")})
    }

    getByScanwordId(Id: number): Observable<SolvableScanword> {
        return this.http.get<SolvableScanword>(this.baseURL + "/getByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")})
    }

    public saveQuestion(scanwordId: number, questions: Array<Question>) {
        return this.http.post(this.baseURL + "/updateResoledQuestionList/" + scanwordId, questions, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")})
    }

    public decrease(scanwordId: number) {
        return this.http.post(this.baseURL + "/decreasePromptById/" + scanwordId, {}, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")})
    }
}