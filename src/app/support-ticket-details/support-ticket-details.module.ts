import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SupportTicketDetailsComponent } from './support-ticket-details.component';
import { SupportTicketDetailsRoutingModule } from './support-ticket-details-routing.module';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SupportTicketDetailsComponent],
    imports: [
        CommonModule,
        SupportTicketDetailsRoutingModule,
        NgbModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        FormModule,ReactiveFormsModule
    ]
})
export class SupportTicketDetailsModule { }
