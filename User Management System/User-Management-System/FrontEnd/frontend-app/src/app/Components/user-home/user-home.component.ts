import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  user: any;
  errorMessage = '';

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: () => {
        this.errorMessage = 'Unable to load user profile';
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}