import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionRoutingModule } from './termscondition-routing.module';
import { EmailManagementComponent } from './email-management/email-management.component';
import { TermConditioncompComponent } from './term-conditioncomp/term-conditioncomp.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FAQComponent } from './faq/faq.component';


@NgModule({
    declarations: [
        EmailManagementComponent,
        TermConditioncompComponent,
        PrivacyPolicyComponent,
        FAQComponent
    ],
    imports: [
        CommonModule,
        TermsConditionRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        FormModule,
        MatFormFieldModule,
        FormsModule 
       
    ]
})
export class TermsConditionModule { }
