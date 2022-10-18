import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { AddVnmComponent } from './add-vnm.component';
import { AddVnmRoutingModule } from './add-vnm-routing.module';




@NgModule({
  declarations: [
  AddVnmComponent
  ],
  imports: [
    CommonModule,
    AddVnmRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,ReactiveFormsModule,
    FormModule,
  ]
})
export class AddVNMModule { }
