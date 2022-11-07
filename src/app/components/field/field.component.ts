import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { ScanwordQuestionHttpService } from 'src/app/services/http/scanword-question/scanword-question-http.service';
import { SolvableScanwordHttpService } from 'src/app/services/http/solvable-scanword/solvable-scanword-http.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  
  scanwordQuestions: ScanwordQuestion[] = [];  
  @Input() text?:Array<Array<string>>;
  @Input() text0?:Array<string>;
  
  constructor(
    private route: ActivatedRoute,
    private scanwordQuestionHttpService: ScanwordQuestionHttpService,
    private solvableScanwordHttpService: SolvableScanwordHttpService,
  ) { }

  getNumber(line: string) {
    line = line.substring(1,line.length)
    return parseInt(line)
  }

  getQuestion(number: number): Question {
    return this.scanwordQuestions.find(q => q.number === number)!.question;
  }

  isShow(questions:Question[], scanwordQuestion: ScanwordQuestion): boolean {
    return questions.find(q => q.id == scanwordQuestion.question.id) != undefined
  }

  isEmpty(line:string) {
    return line == ""
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.scanwordQuestionHttpService.getAllByScanwordId(id).subscribe(res => {
      //console.log(res)
      this.scanwordQuestions = res;
      this.solvableScanwordHttpService.getAllResolvedByScanwordId(id).subscribe(res => {
        console.log(res)
        let n = this.scanwordQuestions[0].scanword.width;
        let m = this.scanwordQuestions[0].scanword.height;
        let mas = []
        for (var i = 0; i < n; i++) {
          mas[i] = new Array(m);
          for (var j = 0; j < n; j++) {
            mas[i][j] = '+';        
          }
        }
        for (let question of this.scanwordQuestions) {
          let x = question.x;
          let y = question.y;
          if (this.isShow(res, question)) {
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
          } else {
            if (question.direction) {
              mas[y][x++] += question.number;
              for (let symbol of question.question.answer) {
                if (mas[y][x] == "+") {
                  mas[y][x] = "";   
                }
                x++;       
              }
            } else {
              mas[y++][x] += question.number;
              for (let symbol of question.question.answer) {
                if (mas[y][x] == "+") {
                  mas[y][x] = ""; 
                }
                y++                         
              }
            }
          }        
          this.text = mas
          this.text0 =mas[0]
        }
      }) 
    })  
    // this.solvableScanwordHttpService.getAllResolvedByScanwordId(id).subscribe(res => {
    //   console.log(this.scanwordQuestions)
    //   let n = this.scanwordQuestions[0].scanword.width;
    //   let m = this.scanwordQuestions[0].scanword.height;
    //   let mas = []
    //   for (var i = 0; i < n; i++) {
    //     mas[i] = new Array(m);
    //     for (var j = 0; j < n; j++) {
    //       mas[i][j] = '+';        
    //     }
    //   }
    //   for (let question of this.scanwordQuestions) {
    //     let x = question.x;
    //     let y = question.y;
    //     if (this.isShow(res, question)) {
    //       if (question.direction) {
    //         mas[y][x++] += question.number;
    //         for (let symbol of question.question.answer) {
    //           mas[y][x++] = symbol;            
    //         }
    //       } else {
    //         mas[y++][x] += question.number;
    //         for (let symbol of question.question.answer) {
    //           mas[y++][x] = symbol;            
    //         }
    //       }
    //     } else {
    //       if (question.direction) {
    //         mas[y][x++] += question.number;
    //         for (let symbol of question.question.answer) {
    //           if (mas[y][x] == "+") {
    //             mas[y][x] = "";   
    //           }
    //           x++;       
    //         }
    //       } else {
    //         mas[y++][x] += question.number;
    //         for (let symbol of question.question.answer) {
    //           if (mas[y][x] == "+") {
    //             mas[y][x] = ""; 
    //           }
    //           y++                         
    //         }
    //       }
    //     }        
    //     this.text = mas
    //     this.text0 =mas[0]
    //   }
    // })    
  }  
}
