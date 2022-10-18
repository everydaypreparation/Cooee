import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRefundRejectComponent } from './user-refund-reject.component';

const routes: Routes = [
  { path: '' , component: UserRefundRejectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRefundRejectRoutingModule { }
