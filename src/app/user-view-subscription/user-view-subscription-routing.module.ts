import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewSubscriptionComponent } from './user-view-subscription.component';

const routes: Routes = [
  { path: '' , component: UserViewSubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewSubscriptionRoutingModule { }
