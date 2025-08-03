import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userService = inject(UserService);
  user = this.userService.currentUser;

  stats = [
    { icon: 'account_circle', title: 'Profile Views', value: '1,234', change: '+12%' },
    { icon: 'email', title: 'Messages', value: '56', change: '+5%' },
    { icon: 'notifications', title: 'Notifications', value: '23', change: '-2%' },
    { icon: 'settings', title: 'Settings', value: 'Updated', change: 'Today' }
  ];

  recentActivities = [
    { action: 'Logged in', time: 'Just now', icon: 'login' },
    { action: 'Updated profile', time: '2 hours ago', icon: 'edit' },
    { action: 'Changed password', time: '1 day ago', icon: 'lock' },
    { action: 'Verified email', time: '3 days ago', icon: 'verified' }
  ];
}