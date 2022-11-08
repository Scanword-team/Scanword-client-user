import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scanword } from 'src/app/models/scanword';
import { Stats } from 'src/app/models/stats';

@Injectable({
  providedIn: 'root'
})
export class ScanwordHttpService {
    baseURL = "http://localhost:4200/api/scanword"
    token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUZXQiLCJwYXNzd29yZCI6IiQyYSQxMiRBMnJtZWoubHhvY1l5QUhacEJnRDR1NE9vNkoySU1JMTdCRE9sODQ4WmJReVdONnB0ZFU3bSIsImlhdCI6MTY2NzgxNDAxNSwiZXhwIjoxNjY4NDE4ODE1fQ.rC-21MR6_5y-H8d0tEoAs0H-Cx1zPJ_le7Q2VToMpuM"

    constructor(private http: HttpClient) { }

    getAllScanword(): Observable<Scanword[]> {
        return this.http.get<Scanword[]>(this.baseURL, {headers :new HttpHeaders().append('Authorization', this.token)} )
    }

    getStatsById(Id: number): Observable<Stats> {
        return this.http.get<Stats>(this.baseURL + "/getStats/" + Id, {headers :new HttpHeaders().append('Authorization', this.token)})
    }
}
