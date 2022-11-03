import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { HttpService } from 'src/app/services/http/http.service'; 


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  user: User | undefined;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe({next:(data:any) => this.user=new User(data.answer, data.question)});
    console.log(this.user)
  }

}
