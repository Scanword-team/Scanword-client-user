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
}