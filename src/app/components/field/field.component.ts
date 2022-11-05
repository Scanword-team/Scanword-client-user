import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { ScanwordQuestionHttpService } from 'src/app/services/http/scanword-question/scanword-question-http.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  
  scanwordQuestions: ScanwordQuestion[] = [];  
  @Input() text?:Array<Array<string>>;
  @Input() text0?:Array<string>;
  
  constructor(private scanwordQuestionHttpService: ScanwordQuestionHttpService) { }

  getNumber(line: string) {
    line = line.substring(1,line.length)
    return parseInt(line)
  }

  getQuestion(number: number): Question {
    return this.scanwordQuestions.find(q => q.number === number)!.question;
  }

  ngOnInit(): void {
    this.scanwordQuestionHttpService.getAllByScanwordId(1).subscribe(res => {
      this.scanwordQuestions = res;
      let n = this.scanwordQuestions[0].scanword.width;
      let m = this.scanwordQuestions[0].scanword.height;
      let mas = []
      for (var i = 0; i < n; i++) {
        mas[i] = new Array(m);
        for (var j = 0; j < n; j++) {
          mas[i][j] = '+';        
        }
      }
      for (let question of res) {
        let x = question.x;
        let y = question.y;
        if (question.direction) {
          mas[y][x++] += question.number;
          for (let symbol of question.question.answer) {
            mas[y][x++] = symbol;            
          }
        } else {
          mas[y++][x] += question.number;
          for (let symbol of question.question.answer) {
            mas[y++][x] = symbol;            
          }
        }
        this.text = mas
        this.text0 =mas[0]
      }
    })      
  }
}
