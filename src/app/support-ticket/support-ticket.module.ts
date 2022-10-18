import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportTicketComponent } from './support-ticket.component';
import { SupportTicketRoutingModule } from './support-ticket-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [SupportTicketComponent],
    imports: [
        CommonModule,
        SupportTicketRoutingModule,
        NgbModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule
    ]
})
export class SupportTicketModule { }
