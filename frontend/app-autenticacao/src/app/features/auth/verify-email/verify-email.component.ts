import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  token = '';
  isLoading = false;
  isVerified = false;
  error = '';

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      this.verifyEmail();
    }
  }

  verifyEmail(): void {
    this.isLoading = true;
    this.authService.verifyEmail(this.token).subscribe({
      next: () => {
        this.isVerified = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error.message || 'Email verification failed';
        this.isLoading = false;
      }
    });
  }

  resendVerification(): void {
    
  }
}