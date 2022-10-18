import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRefundApproveComponent } from './user-refund-approve.component';

const routes: Routes = [
  { path: '' , component: UserRefundApproveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRefundApproveRoutingModule { }
