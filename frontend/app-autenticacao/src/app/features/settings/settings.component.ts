import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { passwordMatchValidator } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  notificationForm = this.fb.group({
    emailNotifications: [true],
    pushNotifications: [true],
    newsletter: [false]
  });

  isChangingPassword = false;
  passwordError = '';

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.authService.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.isChangingPassword = false;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.passwordError = err.error.message || 'Password change failed';
      }
    });
  }
}