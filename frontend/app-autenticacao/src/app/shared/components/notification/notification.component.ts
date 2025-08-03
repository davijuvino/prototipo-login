import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  host: {
    '[class.visible]': 'notificationService.visible()',
    '[class.success]': 'notificationService.type() === "success"',
    '[class.error]': 'notificationService.type() === "error"',
    '[class.warning]': 'notificationService.type() === "warning"'
  }
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  closeNotification(): void {
    this.notificationService.hide();
  }
}