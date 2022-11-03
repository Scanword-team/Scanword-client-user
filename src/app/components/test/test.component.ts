import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { HttpService } from 'src/app/services/http/http.service'; 
import { ScanwordQuestion } from 'src/app/models/scanword_question';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  scanwordQuestions: ScanwordQuestion[] = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe({next:(data:any) => this.scanwordQuestions=data});
  }

}
