import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportContentEmailComponent } from './support-content-email.component';

const routes: Routes = [
  { path: '' , component: SupportContentEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportContentEmailRoutingModule { }
