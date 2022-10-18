import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { UserRefundComponent } from './user-refund/user-refund.component';
import { ViewSubscriptionComponent } from './view-subscription/view-subscription.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-subscription',
        component: AddSubscriptionComponent,
        data: {
          title: 'Add Subscription'
        }
      },
      {
        path: 'view-subscription',
        component: ViewSubscriptionComponent,
        data: {
          title: 'View Subscription'
        }
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent,
        data: {
          title: 'Transaction History'
        }
      },
      {
        path: 'user-refund',
        component: UserRefundComponent,
        data: {
          title: 'User Refund'
        }
      },
      {
        path: 'update-subscription',
        component: UpdateSubscriptionComponent,
        data: {
          title: 'Update Subscription'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
