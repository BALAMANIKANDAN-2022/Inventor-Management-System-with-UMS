import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Error loading profile', err);
      }
    });
  }
}