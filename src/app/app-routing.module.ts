import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScanwordsPageComponent } from './pages/scanwords-page/scanwords-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/auth' , pathMatch: 'full'},
    {path: 'auth', component: AuthPageComponent},
    {
        path: 'scanwords', component: ScanwordsPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'scanword/:id', component: MainPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'help', component: HelpPageComponent,
        canActivate: [AuthGuard]
    }
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
