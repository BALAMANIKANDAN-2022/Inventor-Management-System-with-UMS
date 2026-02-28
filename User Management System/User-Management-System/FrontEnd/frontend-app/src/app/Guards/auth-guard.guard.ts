import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {

    // SSR safety
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    // not logged in → redirect
    this.router.navigate(['/login']);
    return false;
  }
}
