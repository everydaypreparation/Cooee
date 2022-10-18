import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

	constructor(private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		var token = sessionStorage.getItem("loginStatus");
		if (token == 'true') {
			this.router.navigate(['dashboard', 'default'], { replaceUrl: true });
			return false;
		} else {
			return true;
		}
	}

}
