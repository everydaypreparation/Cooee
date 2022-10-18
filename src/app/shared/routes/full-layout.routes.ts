import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'application',
        loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule)

    },
    {
        path: 'welcome',
        loadChildren: () => import('../../welcome/welcome.module').then(m => m.WelcomeModule)

    },
    {
        path: 'usermanagement',
        loadChildren: () => import('../../user-management/user-management.module').then(m => m.UserManagementModule)

    },
    {
        path: 'did-management',
        loadChildren: () => import('../../DID-Management/did-management.module').then(m => m.DIDModule)

    },
    {
        path: 'widgets',
        loadChildren: () => import('../../widgets/widgets.module').then(m => m.WidgetsModule)

    },
    {
        path: 'subscription',
        loadChildren: () => import('../../subscription-management/subscription-management.module').then(m => m.SubscriptionModule)

    },
    {
        path: 'termscondition-content',
        loadChildren: () => import('../../termscondition-content/termscondition.module').then(m => m.TermsConditionModule)

    },
    {
        path: 'send-notification',
        loadChildren: () => import('../../send-notification/send-notification.module').then(m => m.SendNotificationModule)
    },
    {
        path: 'support-ticket',
        loadChildren: () => import('../../support-ticket/support-ticket.module').then(m => m.SupportTicketModule)
    },
    {
        path: 'userdetails',
        loadChildren: () => import('../../user-details/user-details.module').then(m => m.UserDetailsModule)
    },
    {
        path: 'userdetailsapprove',
        loadChildren: () => import('../../user-details/user-details.module').then(m => m.UserDetailsModule)
    },
    {
        path: 'userdetailsreject',
        loadChildren: () => import('../../user-detail-reject/user-details-reject.module').then(m => m.UserDetailRejectModule)
    },
    {
        path: 'changepassword',
        loadChildren: () => import('../../user-change-password/user-change-password.module').then(m => m.UserChangePasswordModule)
    },
    {
        path: 'user-view-subscription',
        loadChildren: () => import('../../user-view-subscription/user-view-subscription.module').then(m => m.UserViewSubscriptionModule)
    },
    {
        path: 'support-ticket-details',
        loadChildren: () => import('../../support-ticket-details/support-ticket-details.module').then(m => m.SupportTicketDetailsModule)
    },
    {
        path: 'support-content-email',
        loadChildren: () => import('../../support-content-email/support-content-email.module').then(m => m.SupportContentEmailModule)
    },
    {
        path: 'support-content-ticket-close',
        loadChildren: () => import('../../support-content-ticket-close/support-content-ticket-close.module').then(m => m.SupportContentTicketCloseModule)
    },
    {
        path: 'delete-subscription-plan',
        loadChildren: () => import('../../delete-subscription-plan/delete-subscription-plan.module').then(m => m.DeleteSubscriptionPlanModule)
    },
    {
        path: 'email-send',
        loadChildren: () => import('../../email-notification-send/email-notification-send.module').then(m => m.EmailNotificationSendModule)
    },
    {
        path: 'push-send',
        loadChildren: () => import('../../push-notification-send/push-notification-send.module').then(m => m.PushNotificationSendModule)
    },
    {
        path: 'userrefundreject',
        loadChildren: () => import('../../user-refund-reject/user-refund-reject.module').then(m => m.UserRefundRejectModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('../../icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'form',
        loadChildren: () => import('../../form/form.module').then(m => m.FormModule)
    },
    {
        path: 'table',
        loadChildren: () => import('../../table/table.module').then(m => m.TableModule)

    },
    {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)

    },
    // {
    //     path: 'faq',
    //     loadChildren: () => import('../../faq/faq.module').then(m => m.FaqModule)
    // },
    {
        path: 'pricing',
        loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
    },
    {
        path: 'earnings',
        loadChildren: () => import('../../earnings/earnings.module').then(m => m.EarningsModule)
    },
    {
        path: 'downloads',
        loadChildren: () => import('../../downloads/downloads.module').then(m => m.DownloadsModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('../../timeline/timeline.module').then(m => m.TimelineModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('../../charts/chart.module').then(m => m.ChartModule)
    },
    // {
    //     path: 'maps',
    //     loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)

    // }
];