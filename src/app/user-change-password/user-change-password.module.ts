import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserChangePasswordComponent } from './user-change-password.component';
import { UserChangePasswordRoutingModule } from './user-change-password-routing.module';



@NgModule({
  declarations: [UserChangePasswordComponent],
  imports: [
    CommonModule,
    UserChangePasswordRoutingModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class  UserChangePasswordModule { }
