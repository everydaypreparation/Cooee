import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteSubscriptionPlanComponent } from './delete-subscription-plan.component';

const routes: Routes = [
  { path: '' , component: DeleteSubscriptionPlanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteSubscriptionPlanRoutingModule { }
