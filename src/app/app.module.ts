import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { AppRoutingModule } from './app-routing.module';
import { ScanwordMenuComponent } from './components/scanword-menu/scanword-menu.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScanwordsPageComponent } from './pages/scanwords-page/scanwords-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    ScanwordMenuComponent,
    AuthPageComponent,
    NavbarComponent,
    MainPageComponent,
    ScanwordsPageComponent,
    HelpPageComponent,
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