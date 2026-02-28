import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  errorMessage = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;

    if (!this.token) {
      this.errorMessage = 'Invalid or expired token';
      return;
    }

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  submit() {
    if (this.resetForm.invalid) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const { password, confirmPassword } = this.resetForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.userService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.message = 'Password reset successful';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Token expired or invalid';
      },
    });
  }
}
