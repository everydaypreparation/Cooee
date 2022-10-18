import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteVnmComponent } from './delete-vnm.component';

const routes: Routes = [
  { path: '' , component: DeleteVnmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteVnmRoutingModule { }
