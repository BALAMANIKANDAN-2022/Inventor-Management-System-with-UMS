import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavbar = false;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        const hideRoutes = [
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password'
        ];

        const token = typeof window !== 'undefined'
          ? localStorage.getItem('token')
          : null;

        this.showNavbar =
          !!token && !hideRoutes.includes(event.urlAfterRedirects);
      });
  }
  title = 'frontend-app';
}
