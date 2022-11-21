import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScanwordsPageComponent } from './pages/scanwords-page/scanwords-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/auth' , pathMatch: 'full'},
    {path: 'auth', component: AuthPageComponent},
    {path: 'scanwords', component: ScanwordsPageComponent},
    {path: 'scanword/:id', component: MainPageComponent},
    {path: 'help', component: HelpPageComponent}
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
