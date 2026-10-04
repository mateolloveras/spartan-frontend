import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const { email, password } = this.form.value;
    this.auth.login({ email: email!, password: password! }).subscribe({
      next: (res) => this.redirectByRole(res.user.role),
      error: () => {
        this.error = 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }

  onGoogleLogin() {
    // TODO: integrar Google OAuth SDK y llamar auth.loginWithGoogle(googleToken)
  }

  private redirectByRole(role: string) {
    const routes: Record<string, string> = {
      admin: '/admin/dashboard',
      employee: '/employee/dashboard',
      client: '/client/dashboard'
    };
    this.router.navigate([routes[role] ?? '/auth/login']);
  }
}
