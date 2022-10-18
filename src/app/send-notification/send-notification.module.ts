import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotificationRoutingModule } from './send-notification-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormModule } from '../form/form.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
       EmailNotificationComponent,
       PushNotificationComponent,
       
    ],
    imports: [
        CommonModule,
        SendNotificationRoutingModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        FormsModule,
        MatCheckboxModule,
        FormModule,
        MatChipsModule
    ]
})
export class SendNotificationModule { }
