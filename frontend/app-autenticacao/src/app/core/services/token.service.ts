import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private token = signal<string | null>(null);

  constructor() {
    this.token.set(localStorage.getItem(this.TOKEN_KEY));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token();
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token.set(null);
  }

  hasToken(): boolean {
    return this.token() !== null;
  }
}