import { Component, OnInit, Input } from '@angular/core';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { ScanwordQuestionHttpService } from 'src/app/services/http/scanword-question/scanword-question-http.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input()scanwordQuestions?: ScanwordQuestion[];
  // @Input()scanword?:Scanword2;
  // @Input()content?:number;
  constructor(private scanwordQuestionHttpService: ScanwordQuestionHttpService) { }

  ngOnInit(): void {
    //this.scanwordQuestionHttpService.getAllByScanwordId(3).subscribe({next:(data:any) => this.scanwordQuestions=data});
    this.scanwordQuestionHttpService.getAllByScanwordId(3).subscribe(res => {
      this.scanwordQuestions = res;
      console.log(this.scanwordQuestions);
    })    
  } 
}
