import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableVirtualListComponent } from './available-virtual-list/available-virtual-list.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { VirtualListComponent } from './virtual-list/virtual-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'available-virtual-list',
        component: AvailableVirtualListComponent,
        data: {
          title: 'Available DID List'
        }
      },
      {
        path: 'bulk-upload',
        component: BulkUploadComponent,
        data: {
          title: 'Builk Upload'
        }
      },
      {
        path: 'virtual-list',
        component: VirtualListComponent,
        data: {
          title: 'Virtual No. Management'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DIDRoutingModule { }
