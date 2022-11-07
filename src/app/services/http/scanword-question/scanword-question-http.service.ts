import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root'
})


export class ScanwordQuestionHttpService {
  baseURL = "http://localhost:4200/api/scanwordQuestion"
  token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiRBMnJtZWoubHhvY1l5QUhacEJnRDR1NE9vNkoySU1JMTdCRE9sODQ4WmJReVdONnB0ZFU3bSIsImlhdCI6MTY2NzgxNDAxNSwiZXhwIjoxNjY4NDE4ODE1fQ.rC-21MR6_5y-H8d0tEoAs0H-Cx1zPJ_le7Q2VToMpuM"

  constructor(private http: HttpClient) { }

  getAllByScanwordId(Id : number): Observable<ScanwordQuestion[]> {
    return this.http.get<ScanwordQuestion[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.token)} )
  }

  getAllResolvedByScanwordId(Id: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.token)})
    
  }
}
