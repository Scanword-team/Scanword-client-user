import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question-button',
  templateUrl: './question-button.component.html',
  styleUrls: ['./question-button.component.css']
})
export class QuestionButtonComponent implements OnInit {

    overlay = false;
    @Input() number?: number;
    @Input() question?: Question;
    ngOnInit(): void {    
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
}