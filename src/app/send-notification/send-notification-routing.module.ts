import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';





const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'email-notification',
        component: EmailNotificationComponent,
        data: {
          title: 'Email Notification'
        }
      },
      {
        path: 'push-notification',
        component: PushNotificationComponent,
        data: {
          title: 'Push Notification'
        }
      },
     
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendNotificationRoutingModule { }
