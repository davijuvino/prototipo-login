import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', { email, password }).pipe(
      tap({
        next: (response) => {
          this.tokenService.setToken(response.token);
          this.notification.show('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.notification.show('Invalid credentials', 'error');
        }
      })
    );
  }

  register(userData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/register', userData).pipe(
      tap({
        next: (response) => {
          this.tokenService.setToken(response.token);
          this.notification.show('Registration successful! Please verify your email.');
          this.router.navigate(['/verify-email']);
        },
        error: (err) => {
          this.notification.show(err.error.message || 'Registration failed', 'error');
        }
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>('/api/auth/forgot-password', { email }).pipe(
      tap({
        next: () => {
          this.notification.show('Password reset link sent to your email');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.notification.show(err.error.message || 'Failed to send reset link', 'error');
        }
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>('/api/auth/reset-password', { token, newPassword }).pipe(
      tap({
        next: () => {
          this.notification.show('Password reset successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.notification.show(err.error.message || 'Failed to reset password', 'error');
        }
      })
    );
  }

  verifyEmail(token: string): Observable<void> {
    return this.http.post<void>('/api/auth/verify-email', { token }).pipe(
      tap({
        next: () => {
          this.notification.show('Email verified successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.notification.show(err.error.message || 'Email verification failed', 'error');
        }
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const payload = { currentPassword, newPassword };
    return this.http.post(`/api/auth/change-password`, payload);
  }

  logout(): void {
    this.tokenService.clearToken();
    this.notification.show('Logged out successfully');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}