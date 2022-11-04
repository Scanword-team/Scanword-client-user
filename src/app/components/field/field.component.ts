import { Component, OnInit, Input } from '@angular/core';
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

  // text = [
  //   ['+','+3','+4','+5','+6','+7'],
  //   ['+1','б','и','с','а','у'],
  //   ['+2','и','и','и','в','с'],
  //   ['г','т','с','е','т','т'],
  //   ['о','в','у','з','о','ю'],
  //   ['т','а','с','а','р','г']
  // ]

  // text0 = this.text[0]

  
  constructor(private scanwordQuestionHttpService: ScanwordQuestionHttpService) { }

  getNumber(line: string) {
    line = line.substring(1,line.length)
    return parseInt(line)
  }
  ngOnInit(): void {
    this.scanwordQuestionHttpService.getAllByScanwordId(3).subscribe(res => {
      this.scanwordQuestions = res;
      //console.log(this.scanwordQuestions);
      let n = this.scanwordQuestions[0].scanword.width;
      let m = this.scanwordQuestions[0].scanword.height;

      let mas = []
      for (var i = 0; i < n; i++) {
        mas[i] = new Array(m);
        for (var j = 0; j < n; j++) {
          mas[i][j] = '+';        
        }
      }

      //console.log(mas)
      for (let question of res) {
        //console.log(question)
        let x = question.x;
        let y = question.y;
        if (question.direction) {
          mas[y][x++] += "1";
          for (let symbol of question.question.answer) {
            mas[y][x++] = symbol;            
          }
        } else {
          mas[y++][x] += "2";
          for (let symbol of question.question.answer) {
            mas[y++][x] = symbol;            
          }
        }
        console.log(mas)
        this.text = mas
        this.text0 =mas[0]
      }
    })      
  }
}
