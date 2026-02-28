import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { UserHomeComponent } from './Components/user-home/user-home.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthGuard } from './Guards/auth-guard.guard';
import { RoleGuard } from './Guards/role-guard.guard';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path: "forgot-password", component: ForgotPasswordComponent},
  {
    path: 'user-home',
    component: UserHomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] }
  },

  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  { path: "reset-password", component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
