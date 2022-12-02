import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { Question } from 'src/app/models/question';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class ScanwordQuestionHttpService {
  baseURL = "http://localhost:4200/api/scanwordQuestion" 

  constructor(
    private http: HttpClient,
    private authService:AuthService
) { }

  getAllByScanwordId(Id : number): Observable<ScanwordQuestion[]> {
    return this.http.get<ScanwordQuestion[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.authService.getToken() || "")} )
  }
}
