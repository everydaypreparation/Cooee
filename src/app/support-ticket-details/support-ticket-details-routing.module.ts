import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportTicketDetailsComponent } from './support-ticket-details.component';

const routes: Routes = [
  { path: '' , component: SupportTicketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTicketDetailsRoutingModule { }
