import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/profile', icon: 'account_circle', label: 'Profile' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
    { path: '/messages', icon: 'email', label: 'Messages' },
    { path: '/notifications', icon: 'notifications', label: 'Notifications' }
  ];
}