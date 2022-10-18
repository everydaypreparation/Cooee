import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailNotificationSendComponent } from './email-notification-send.component';

const routes: Routes = [
  { path: '' , component: EmailNotificationSendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailNotificationSendRoutingModule { }
