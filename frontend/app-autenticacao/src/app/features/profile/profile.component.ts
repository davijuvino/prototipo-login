import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { User } from '../../core/models/user.model'; // Adjust the path as needed

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  userService = inject(UserService);
  user = this.userService.currentUser;

  profileForm = this.fb.group({
    name: [this.user().name, [Validators.required, Validators.minLength(3)]],
    email: [this.user().email, [Validators.required, Validators.email]],
    phone: [this.user().phone || ''],
    bio: [this.user().bio || '']
  });

  isEditing = false;

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        name: this.user().name,
        email: this.user().email,
        phone: this.user().phone || '',
        bio: this.user().bio || ''
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;

    const updatedUser = {
      ...this.user(),
      ...this.profileForm.value,
      name: this.profileForm.value.name || this.user().name,
      email: this.profileForm.value.email || this.user().email
    };

    this.userService.updateUser(updatedUser as User).subscribe(() => {
      this.isEditing = false;
    });
  }
}