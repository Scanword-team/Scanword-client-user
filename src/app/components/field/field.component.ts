import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cell } from 'src/app/models/cell';
import { Question } from 'src/app/models/question';
import { ScanwordQuestion } from 'src/app/models/scanword_question';
import { ScanwordQuestionHttpService } from 'src/app/services/http/scanword-question/scanword-question-http.service';
import { SolvableScanwordHttpService } from 'src/app/services/http/solvable-scanword/solvable-scanword-http.service';
import { ScanwordHttpService } from 'src/app/services/http/scanword/scanword-http.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
    
  
    id = Number(this.route.snapshot.paramMap.get('id'))
    role = this.authService.getRole()
    currentQuestionNumber = 0;
    n = 0;
    m = 0;
    prompt = 0
    cellSize = 0
    currentQuestion:Question | undefined;
    scanwordQuestions: ScanwordQuestion[] = [];  
    blockedQuestions: Question[] = [];    
    text:Array<Cell> = Array();
    solved = false
    
    constructor(
        private route: ActivatedRoute,
        private scanwordQuestionHttpService: ScanwordQuestionHttpService,
        private solvableScanwordHttpService: SolvableScanwordHttpService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.getData()
    }

    getScanwordQuestion(number: number): ScanwordQuestion {
        return this.scanwordQuestions.find(q => q.number === number)!;
    }
  
    getQuestion(number: number): Question {
        return this.scanwordQuestions.find(q => q.number === number)!.question;
    }
  
    isShow(questions:Question[], scanwordQuestion: ScanwordQuestion): boolean {
        return questions.find(q => q.id == scanwordQuestion.question.id) != undefined
    }

    isSolved(question : Question) {
        return this.blockedQuestions.find(q => q.id == question.id) != undefined
    }

    isDisabled(cell:Cell) {
        return !(cell.text == "")
    }

    showQuestion(cell:Cell) {
        let number = parseInt(cell.text); 
        this.currentQuestionNumber = number
        this.currentQuestion = this.getQuestion(number)
    }

    checkPrompt() {
        if (this.currentQuestionNumber == 0) {
            return true
        } 
        return this.isSolved(this.getQuestion(this.currentQuestionNumber))
    }

    printWordOnGrid(scanword_question: ScanwordQuestion, isDisable: boolean) {

        let x = scanword_question.x
        let y = scanword_question.y

        if (scanword_question.direction) {
            this.text[y * this.m + x++] = new Cell("button", scanword_question.number.toString(), [], true)
            for (let symbol of scanword_question.question.answer) {
                if (this.text[y * this.m + x].type == "input") {  
                    if (this.text[y * this.m + x].text == "") {
                        this.text[y * this.m + x].text = symbol
                        this.text[y * this.m + x].isDisable = this.text[y * this.m + x].isDisable || isDisable 
                    }                                  
                    this.text[y * this.m + x].questionNumber.push(scanword_question.number)   
                } else {
                    this.text[y * this.m + x] = new Cell("input",symbol, [scanword_question.number], isDisable)
                }
                x++
            }
        } else {
            this.text[y++ * this.m + x] = new Cell("button", scanword_question.number.toString(), [], true)
            for (let symbol of scanword_question.question.answer) {
                if (this.text[y * this.m + x].type == "input") {  
                    if (this.text[y * this.m + x].text == "") {
                        this.text[y * this.m + x].text = symbol
                        this.text[y * this.m + x].isDisable = this.text[y * this.m + x].isDisable || isDisable 
                    }                                  
                    this.text[y * this.m + x].questionNumber.push(scanword_question.number)   
                } else {
                    this.text[y * this.m + x] = new Cell("input",symbol, [scanword_question.number], isDisable)
                }
                y++
            }
        }
    }

    disableWordOnGrid(scanword_question: ScanwordQuestion) {
        let x = scanword_question.x
        let y = scanword_question.y
        if (scanword_question.direction) {
            x++
            for (let symbol of scanword_question.question.answer) {
                this.text[y * this.m + x++].isDisable = true
            }
        } else {
            y++
            for (let symbol of scanword_question.question.answer) {
                this.text[y++ * this.m + x].isDisable = true
            }
        }
    }


    onCheck() {
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
                    this.disableWordOnGrid(question)     
                    this.blockedQuestions.push(question.question)                     
                }
            }            
        }
        this.solved = this.blockedQuestions.length == this.scanwordQuestions.length  
        console.log(this.solved)    
    }

    onSave(): void {
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
                    this.blockedQuestions.push(question.question)                   
                }
            }            
        }
        this.solvableScanwordHttpService.saveQuestion(id, this.blockedQuestions).subscribe()
    } 
    
    getNewPrompt() {
        this.prompt--
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.solvableScanwordHttpService.decrease(id).subscribe()
        let question = this.getScanwordQuestion(this.currentQuestionNumber)
        this.printWordOnGrid(question, true)   
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
                this.cellSize = 900 / max // Общий размер тут пока 900
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
        })       
    } 
}
