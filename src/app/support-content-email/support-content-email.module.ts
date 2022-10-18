import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SupportContentEmailComponent } from './support-content-email.component';
import { SupportContentEmailRoutingModule } from './support-content-email-routing.module';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SupportContentEmailComponent],
    imports: [
        CommonModule,
        SupportContentEmailRoutingModule,
        NgbModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        FormModule,
        ReactiveFormsModule,
    ]
})
export class SupportContentEmailModule { }
