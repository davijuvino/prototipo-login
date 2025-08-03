import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  currentUser = signal<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: true,
    createdAt: new Date()
  });

  fetchUser(): void {
    this.http.get<User>('/api/user').subscribe(user => {
      this.currentUser.set(user);
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('/api/user', user).pipe(
      tap(updatedUser => {
        this.currentUser.set(updatedUser);
      })
    );
  }
}

