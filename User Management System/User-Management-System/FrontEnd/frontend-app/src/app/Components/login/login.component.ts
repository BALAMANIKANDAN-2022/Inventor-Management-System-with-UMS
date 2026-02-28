import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import { Router } from '@angular/router';
import { RoleGuard } from '../../Guards/role-guard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
      next: (response) => {
        // store token (basic version)
        console.log('LOGIN RESPONSE:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        console.log('TOKEN IN STORAGE:', localStorage.getItem('token'));

        const role=response.role
        if(role == 'ROLE_ADMIN'){
          this.router.navigate(['/admin'])
        }
        else if(role == 'ROLE_USER'){
        // navigate to user home
        this.router.navigate(['/user-home']);
        }
        else{
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
