import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldComponent } from './components/field/field.component';
import { ScanwordMenuComponent } from './components/scanword-menu/scanword-menu.component';

const routes: Routes = [
  {path: 'scanwords', component: ScanwordMenuComponent},
  {path: 'scanword/:id', component: FieldComponent}
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
