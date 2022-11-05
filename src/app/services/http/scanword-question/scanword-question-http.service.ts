import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScanwordQuestion } from 'src/app/models/scanword_question';

@Injectable({
  providedIn: 'root'
})


export class ScanwordQuestionHttpService {
  baseURL = "http://localhost:4200/api/scanwordQuestion"
  token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiRnTjJoVGdnT3RKRUdvcDUxYzJIb1VlWXBTd1RhQlY0c1hmMDVod29jcWlLMDZWM0RpaC4yZSIsImlhdCI6MTY2NzYzNjAyOSwiZXhwIjoxNjY4MjQwODI5fQ.vXDaSAmAR5uvBMBroSl2cPj6di1AmbdnBgzru9j0QP4"

  constructor(private http: HttpClient) { }

  getAllByScanwordId(Id : number): Observable<ScanwordQuestion[]> {
    return this.http.get<ScanwordQuestion[]>(this.baseURL + "/getAllByScanwordId/" + Id, {headers :new HttpHeaders().append('Authorization', this.token)} )
  }
}
