import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  users: any[] = [];
  errorMessage = '';

  constructor(private userService: UserServiceService) {}

  successMessage: string | null = null;

ngOnInit() {
  this.loadUsers();

  const msg = localStorage.getItem('deleteSuccess');
  if (msg) {
    this.successMessage = msg;

    // remove after showing once
    localStorage.removeItem('deleteSuccess');

    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: () => this.errorMessage = 'Failed to load users'
    });
  }

  deleteUser(id: number) {
    if (!confirm(`Are you sure you want to delete this user with id: ${id}?`)) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        localStorage.setItem('deleteSuccess', 'User deleted successfully');
        window.location.reload();
      },
      error: () => {
        alert('Delete failed');
      }
    });
  }

  logout() {
    localStorage.clear();
    location.href = '/login';
  }
}
