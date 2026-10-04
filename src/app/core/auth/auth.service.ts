import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthUser, LoginRequest, LoginResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'spartan_token';
  currentUser = signal<AuthUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.currentUser.set(res.user);
      })
    );
  }

  loginWithGoogle(googleToken: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/google`, { token: googleToken }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.currentUser.set(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadUserFromToken() {
    const token = this.getToken();
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUser.set({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role
      });
    } catch {
      this.logout();
    }
  }
}
