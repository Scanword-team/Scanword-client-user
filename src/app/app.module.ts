import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { QuestionButtonComponent } from './components/question-button/question-button.component';
import { AppRoutingModule } from './app-routing.module';
import { ScanwordMenuComponent } from './components/scanword-menu/scanword-menu.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    QuestionButtonComponent,
    ScanwordMenuComponent,
    AuthPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }