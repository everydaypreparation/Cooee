import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportContentTicketCloseComponent } from './support-content-ticket-close.component';

const routes: Routes = [
  { path: '' , component: SupportContentTicketCloseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportContentTicketCloseRoutingModule { }
