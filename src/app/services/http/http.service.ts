import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:4200/api/question/getById/1', {headers :new HttpHeaders().append('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiR4U3luSUdsOTl2NURyM3QvaUxYWGMuUEVFOEpsZk5QZjA5U3JYVFhmVGQ4Z2gwNkR6bG1GNiIsImlhdCI6MTY2NzQxMjY0OCwiZXhwIjoxNjY4MDE3NDQ4fQ.B17NriOh9LqE1xg0usMLKrrZ3SO4nZtPAy4HW2aCfLA')})
  }
}
