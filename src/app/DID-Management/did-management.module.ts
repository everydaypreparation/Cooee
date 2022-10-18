import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIDRoutingModule } from './did-management-routing.module';
import { VirtualListComponent } from './virtual-list/virtual-list.component';
import { AvailableVirtualListComponent } from './available-virtual-list/available-virtual-list.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';




@NgModule({
  declarations: [
   VirtualListComponent,
   AvailableVirtualListComponent,
   BulkUploadComponent
  ],
  imports: [
    CommonModule,
    DIDRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,ReactiveFormsModule,
    FormModule,
  ]
})
export class DIDModule { }
