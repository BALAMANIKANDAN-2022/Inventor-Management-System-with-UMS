import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.forgotForm.invalid) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    this.userService.forgotPassword(this.forgotForm.value.email)
    .subscribe({
      next: (response: any) => {
        const token = response.token;

        this.router.navigate(['/reset-password'], {
          queryParams: { token }
        });

        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Email not registered';
        this.message = '';
      }
    });
  }
}