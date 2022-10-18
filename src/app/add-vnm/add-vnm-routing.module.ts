import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVnmComponent } from './add-vnm.component';

const routes: Routes = [
  { path: '' , component: AddVnmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVnmRoutingModule { }
