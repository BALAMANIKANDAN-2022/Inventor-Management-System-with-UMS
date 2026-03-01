import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  userName = '';
  userEmail = '';
  appTitle = '';

  constructor(
    private userService: UserServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    // ✅ Only run in browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadProfile();
      this.setRoleTitle();
    }
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.userName = data.name;
        this.userEmail = data.email;
      }
    });
  }

  setRoleTitle() {
    const role = localStorage.getItem('role');

    if (role === 'ROLE_ADMIN') {
      this.appTitle = 'IMS Admin';
    } else {
      this.appTitle = 'IMS User';
    }
  }

  goHome() {
  const role = localStorage.getItem('role');
  console.log(role);

  if (role === 'ROLE_ADMIN') {
    this.router.navigate(['/admin']);
  } else if (role === 'ROLE_USER') {
    this.router.navigate(['/user-home']);
  } else {
    this.router.navigate(['/login']);
  }
}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}