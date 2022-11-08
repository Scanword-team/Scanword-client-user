import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cell } from 'src/app/models/cell';
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
  
    currentCell = 0;
    scanwordQuestions: ScanwordQuestion[] = [];  
    blockedQuestions: Question[] = [];    
    text:Array<Array<Cell>> = Array();
    
    constructor(
        private route: ActivatedRoute,
        private scanwordQuestionHttpService: ScanwordQuestionHttpService,
        private solvableScanwordHttpService: SolvableScanwordHttpService,
    ) { }
  
    getNumber(cell: Cell) {
        return parseInt(cell.text)
    }
  
    getQuestion(number: number): Question {
        return this.scanwordQuestions.find(q => q.number === number)!.question;
    }
  
    isShow(questions:Question[], scanwordQuestion: ScanwordQuestion): boolean {
        return questions.find(q => q.id == scanwordQuestion.question.id) != undefined
    }

    isInput(cell:Cell) {
        return cell.type == "input"
    }
    isCurrentInput(cell: Cell) {
        return cell.type == "input" && cell.questionNumber.includes(this.currentCell)
    }

    isButton(cell:Cell) {
        return cell.type == "button"
    }

    isDisabled(cell:Cell) {
        return !(cell.text == "")
    }

    getData(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.scanwordQuestionHttpService.getAllByScanwordId(id).subscribe(res => {
            this.scanwordQuestions = res;
            this.solvableScanwordHttpService.getAllResolvedByScanwordId(id).subscribe(res => {
                this.blockedQuestions = res  
                console.log(res)              
                let n = this.scanwordQuestions[0].scanword.width;
                let m = this.scanwordQuestions[0].scanword.height;
                let mas = []
                for (var i = 0; i < n; i++) {
                    let mas2 = []       
                    for (var j = 0; j < m; j++) {  
                        mas2.push(new Cell("empty","", [], false)) 
                    }
                    mas.push(mas2)
                }
                for (let question of this.scanwordQuestions) {
                    let x = question.x
                    let y = question.y
                    console.log(question)
                    if (this.isShow(res, question)) {
                        if (question.direction) {
                            mas[y][x++] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y][x].type == "input") {  
                                    if (mas[y][x].text == "") {
                                        mas[y][x].text = symbol
                                        console.log(symbol)
                                        mas[y][x].isDisable = true 
                                    }                                  
                                    mas[y][x].questionNumber.push(question.number)   
                                } else {
                                  mas[y][x] = new Cell("input",symbol, [question.number], true)
                                }
                                x++
                            }
                        } else {
                            mas[y++][x] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y][x].type == "input") {
                                    if (mas[y][x].text == "") {
                                        mas[y][x].text = symbol
                                        mas[y][x].isDisable = true 
                                    }
                                    mas[y][x].questionNumber.push(question.number) 
                                } else {
                                  mas[y][x] = new Cell("input",symbol, [question.number], true)
                                }
                                y++
                            }
                        }
                        
                    } else {
                        if (question.direction) {
                            mas[y][x++] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y][x].type == "input") {
                                    mas[y][x].questionNumber.push(question.number)
                                    mas[y][x].text = ""
                                } else {
                                  mas[y][x] = new Cell("input", "", [question.number], false)
                                }
                                x++
                            }
                        } else {
                            mas[y++][x] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y][x].type == "input") {
                                    mas[y][x].questionNumber.push(question.number)
                                    mas[y][x].text = ""
                                } else {
                                  mas[y][x] = new Cell("input", "", [question.number], false)
                                }
                                y++
                            }
                        }
                    }
                }
                this.text = mas
            }) 
        })       
    } 

    onCheck(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        for (let question of this.scanwordQuestions) {
            if (!this.isShow(this.blockedQuestions, question)) {
                let res = true
                let x = question.x
                let y = question.y
                if (question.direction) {
                    x++
                    for (let symbol of question.question.answer) {
                        res = res && (symbol == this.text[y][x++].text)
                    }
                } else {
                    y++
                    for (let symbol of question.question.answer) {
                        res = res && (symbol == this.text[y++][x].text)
                    } 
                }
                if (res) {      
                    this.solvableScanwordHttpService.saveQuestion(id, question.question).subscribe()
                }
            }            
        } 
        this.getData()
    }

    ngOnInit(): void {
        this.getData()
    }
}
