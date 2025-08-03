import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  visible = signal(false);
  message = signal('');
  type = signal<'success' | 'error' | 'warning'>('success');

  private timeoutId: any;

  show(message: string, type: 'success' | 'error' | 'warning' = 'success', duration: number = 5000): void {
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.hide(), duration);
  }

  hide(): void {
    this.visible.set(false);
    clearTimeout(this.timeoutId);
  }
}