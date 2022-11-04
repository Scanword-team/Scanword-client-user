import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scanword2 } from 'src/app/scanword2';
import { Observable } from 'rxjs';
import { ScanwordQuestion } from 'src/app/models/scanword_question';

@Injectable({
  providedIn: 'root'
})


export class ScanwordQuestionHttpService {
  baseURL = "http://localhost:4200/api/scanwordQuestion"
  constructor(private http: HttpClient) { }

  getAllByScanwordId(Id : number): Observable<ScanwordQuestion[]> {
    return this.http.get<ScanwordQuestion[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiR4U3luSUdsOTl2NURyM3QvaUxYWGMuUEVFOEpsZk5QZjA5U3JYVFhmVGQ4Z2gwNkR6bG1GNiIsImlhdCI6MTY2NzQxMjY0OCwiZXhwIjoxNjY4MDE3NDQ4fQ.B17NriOh9LqE1xg0usMLKrrZ3SO4nZtPAy4HW2aCfLA')} )
  }

  getData(): Observable<Scanword2>{
    return this.http.get<Scanword2>("http://localhost:4200/api/scanword/getById/3", {headers :new HttpHeaders().append('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiR4U3luSUdsOTl2NURyM3QvaUxYWGMuUEVFOEpsZk5QZjA5U3JYVFhmVGQ4Z2gwNkR6bG1GNiIsImlhdCI6MTY2NzQxMjY0OCwiZXhwIjoxNjY4MDE3NDQ4fQ.B17NriOh9LqE1xg0usMLKrrZ3SO4nZtPAy4HW2aCfLA')})
  }
}
