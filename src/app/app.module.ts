import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { QuestionButtonComponent } from './components/question-button/question-button.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    QuestionButtonComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
