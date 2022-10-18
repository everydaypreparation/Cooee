import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { AuthGuard } from './shared/auth.guard';
import { DashboardGuard } from './shared/dashboard.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
		canActivate: [DashboardGuard]
	},
	{
		path: '',
		component: FullLayoutComponent,
		data: { title: 'Full Views' },
		children: Full_ROUTES,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		component: ContentLayoutComponent,
		data: { title: 'Content Views' },
		children: CONTENT_ROUTES,
		canActivate: [AuthGuard],
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
