import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailApproveComponent } from './user-detail-approve.component';

const routes: Routes = [
  { path: '' , component: UserDetailApproveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailApproveRoutingModule { }
