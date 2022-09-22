import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EnsureAuthenticated implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('_auth_royal_shopping')) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { next: encodeURI(state.url) } });
    return false;
  }
}


