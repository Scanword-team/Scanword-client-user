import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-question-button',
  templateUrl: './question-button.component.html',
  styleUrls: ['./question-button.component.css']
})
export class QuestionButtonComponent implements OnInit {

  overlay = false;
  @Input() id?: number;
  @Input() question?: Question;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestion();
  }

  isAudio(): boolean {
    if (this.question) {
      return this.question.type == "audio";
    }
    return false;
  }
  isImage(): boolean {
    if (this.question) {   
      return this.question.type == "image";
    }
    return false;
  }

  getQuestion(): void {
    const testId = Number(this.id)
    this.questionService.getQuestionById(testId).subscribe(question => this.question = question);
  }

}
