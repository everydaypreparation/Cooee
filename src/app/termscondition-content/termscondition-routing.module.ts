import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailManagementComponent } from './email-management/email-management.component';
import { FAQComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditioncompComponent } from './term-conditioncomp/term-conditioncomp.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'email-management',
        component: EmailManagementComponent,
        data: {
          title: 'Email Management'
        }
      },
      {
        path: 'terms-condition',
        component: TermConditioncompComponent,
        data: {
          title: 'Terms Condition'
        }
      },
      {
        path: 'faq',
        component: FAQComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsConditionRoutingModule { }
