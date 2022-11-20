import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cell } from 'src/app/models/cell';
import { Question } from 'src/app/models/question';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { ScanwordQuestionHttpService } from 'src/app/services/http/scanword-question/scanword-question-http.service';
import { SolvableScanwordHttpService } from 'src/app/services/http/solvable-scanword/solvable-scanword-http.service';
import { ScanwordHttpService } from 'src/app/services/http/scanword/scanword-http.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
    
  
    currentCell = 0;
    n = 0;
    m = 0;
    prompt = 0
    cellSize = 0
    currentQuestion:Question | undefined;
    scanwordQuestions: ScanwordQuestion[] = [];  
    blockedQuestions: Question[] = [];    
    text:Array<Cell> = Array();
    
    constructor(
        private route: ActivatedRoute,
        private scanwordQuestionHttpService: ScanwordQuestionHttpService,
        private solvableScanwordHttpService: SolvableScanwordHttpService,
        private scanwordHttpService: ScanwordHttpService,
    ) { }

    ngOnInit(): void {
        this.getData()
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

    showQuestion(cell:Cell) {
        let number = parseInt(cell.text); 
        this.currentCell = number
        this.currentQuestion = this.getQuestion(number)
    }

    isText(question: Question) {
        return question.type == "text"
    }

    isAudio(question: Question) {
        return question.type == "audio"
    }

    isImage(question: Question) {
        return question.type == "image"
    }

    getNewPrompt() {
        this.prompt--
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.solvableScanwordHttpService.decrease(id).subscribe()
    }

    getData(): void {     
        const id = Number(this.route.snapshot.paramMap.get('id'))   
        this.scanwordQuestionHttpService.getAllByScanwordId(id).subscribe(res => {
            this.scanwordQuestions = res;

            this.solvableScanwordHttpService.getByScanwordId(id).subscribe(res => {
                this.blockedQuestions = res.solvedQuestions   
                this.prompt = res.prompt          
                let scan = this.scanwordQuestions[0].scanword
                this.n = scan.width;
                this.m = scan.height;
                let max = this.n > this.m ?  this.n: this.m;
                this.cellSize = 1000 / max // Общий размер тут пока 600
                let mas = []
                for (var i = 0; i < this.n; i++) {     
                    for (var j = 0; j < this.m; j++) {  
                        mas.push(new Cell("empty","", [], false)) 
                    }
                }              
                for (let question of this.scanwordQuestions) {
                    let x = question.x
                    let y = question.y
                    if (this.isShow(this.blockedQuestions, question)) {
                        if (question.direction) {
                            mas[y * this.m + x++] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y * this.m + x].type == "input") {  
                                    if (mas[y * this.m + x].text == "") {
                                        mas[y * this.m + x].text = symbol
                                        mas[y * this.m + x].isDisable = true 
                                    }                                  
                                    mas[y * this.m + x].questionNumber.push(question.number)   
                                } else {
                                  mas[y * this.m + x] = new Cell("input",symbol, [question.number], true)
                                }
                                x++
                            }
                        } else {
                            mas[y++ * this.m + x] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y * this.m + x].type == "input") {
                                    if (mas[y * this.m + x].text == "") {
                                        mas[y * this.m + x].text = symbol
                                        mas[y * this.m + x].isDisable = true 
                                    }
                                    mas[y * this.m + x].questionNumber.push(question.number) 
                                } else {
                                  mas[y * this.m + x] = new Cell("input",symbol, [question.number], true)
                                }
                                y++
                            }
                        }
                        
                    } else {
                        if (question.direction) {
                            mas[y * this.m + x++] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y * this.m + x].type == "input") {
                                    mas[y * this.m + x].questionNumber.push(question.number)                                    
                                } else {
                                  mas[y * this.m + x] = new Cell("input", "", [question.number], false)
                                }
                                x++
                            }
                        } else {
                            mas[y++ * this.m + x] = new Cell("button",question.number.toString(), [], true)
                            for (let symbol of question.question.answer) {
                                if (mas[y * this.m + x].type == "input") {
                                    mas[y * this.m + x].questionNumber.push(question.number)
                                } else {
                                  mas[y * this.m + x] = new Cell("input", "", [question.number], false)
                                }
                                y++
                            }
                        }
                    }
                }
                this.text = mas
            })

            // this.solvableScanwordHttpService.getAllResolvedByScanwordId(id).subscribe(res => {
                
            // }) 
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
                        res = res && (symbol.toLowerCase() == this.text[y * this.m + x++].text.toLowerCase())
                    }
                } else {
                    y++
                    for (let symbol of question.question.answer) {
                        res = res && (symbol.toLowerCase() == this.text[y++ * this.m + x].text.toLowerCase())
                    } 
                }
                if (res) {      
                    this.solvableScanwordHttpService.saveQuestion(id, question.question).subscribe()
                }
            }            
        }
        this.getData()
    }    
}
