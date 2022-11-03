import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QUESTIONS } from 'src/app/constants/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionById(id:number) : Observable<Question> {
    const question = QUESTIONS.find(h => h.id === id)!;
    return of(question)
  }
}
