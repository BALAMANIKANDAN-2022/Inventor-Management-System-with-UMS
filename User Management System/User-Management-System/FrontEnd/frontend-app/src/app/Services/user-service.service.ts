import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../Model/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/User';
  private authUrl = 'http://localhost:8080/auth';

  
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  
  private options = {
    headers: this.httpHeaders,
  };
  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ---------------- REGISTER ----------------
  register(user: User) {
    return this.http
      .post(`${this.baseUrl}/register`, user)
      .pipe(catchError(this.errorHandler));
  }

  // ---------------- LOGIN ----------------
  login(email: string, password: string) {
    const payload = { email, password };

    return this.http
      .post<{ token: string; role: string }>(
        `${this.authUrl}/login`,
        payload
      )
      .pipe(catchError(this.errorHandler));
  }


forgotPassword(email: string) {
  return this.http
    .post(
      `${this.authUrl}/forgot-password`,
      { email },
      this.options
    )
    .pipe(catchError(this.errorHandler));
}

resetPassword(token: string, password: string) {
  return this.http
    .post(
      `${this.authUrl}/reset-password?token=${token}`,
      { password },
      this.options
    )
    .pipe(catchError(this.errorHandler));
}

 private buildAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}

private isBrowser(): boolean {
  return typeof window !== 'undefined';
}

getProfile() {
  if (!this.isBrowser()) {
    console.log('SSR MODE – skipping profile');
    return throwError(() => 'SSR mode');
  }

  return this.http.get(
    `${this.baseUrl}/profile`,
    { headers: this.buildAuthHeaders() }
  );
}

getAllUsers() {
  return this.http.get<User[]>(
    `${this.baseUrl}/all`,
    { headers: this.buildAuthHeaders() }
  );
}

deleteUser(id: number) {
  return this.http.delete(
    `${this.baseUrl}/${id}`,
    {
      headers: this.buildAuthHeaders(),
      responseType: 'text' 
    }
  );
}

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  }

  // ---------------- ERROR HANDLER ----------------
  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.status === 403) {
        errorMessage = 'Access denied';
      } else if (error.status === 0) {
        errorMessage = 'Server not reachable';
      } else {
        errorMessage = error.error?.message || error.message;
      }
    }

    console.error('API Error:', errorMessage);
    return throwError(() => errorMessage);
  }
}
