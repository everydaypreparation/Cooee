import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { FormModule } from '../form/form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PushNotificationSendComponent } from './push-notification-send.component';
import { PushNotificationSendRoutingModule } from './push-notification-send-routing.module';
@NgModule({
    declarations: [PushNotificationSendComponent],
    imports: [
        CommonModule,
        PushNotificationSendRoutingModule,
        NgbModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        ReactiveFormsModule,
        MatChipsModule,
        FormModule,
        FormModule,
        MatFormFieldModule,
    ]
})
export class PushNotificationSendModule { }
