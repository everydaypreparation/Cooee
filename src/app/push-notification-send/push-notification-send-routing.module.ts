import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushNotificationSendComponent } from './push-notification-send.component';

const routes: Routes = [
  { path: '' , component: PushNotificationSendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushNotificationSendRoutingModule { }
