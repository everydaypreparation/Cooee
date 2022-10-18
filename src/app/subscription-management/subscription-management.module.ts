import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionRoutingModule } from './subscription-management-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { UserRefundComponent } from './user-refund/user-refund.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ViewSubscriptionComponent } from './view-subscription/view-subscription.component';
import { FormModule } from '../form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        UserRefundComponent,
        TransactionHistoryComponent,
        ViewSubscriptionComponent,
        AddSubscriptionComponent,
        UpdateSubscriptionComponent
    ],
    imports: [
        CommonModule,
        SubscriptionRoutingModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        FormModule,
        ReactiveFormsModule,
        FormsModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule
    ]
})
export class SubscriptionModule { }
