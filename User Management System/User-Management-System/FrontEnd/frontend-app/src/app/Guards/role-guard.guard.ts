import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const expectedRoles = route.data['roles'] as string[];
    const userRole = localStorage.getItem('role');

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    // unauthorized
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
