import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailRejectComponent } from './user-detail-reject.component';

const routes: Routes = [
  { path: '' , component: UserDetailRejectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailRejectRoutingModule { }
