import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5" style="max-width: 500px;">
      <h2 class="mb-4">Register</h2>

      <form (ngSubmit)="register()">

        <input class="form-control mb-3"
               [(ngModel)]="name"
               name="name"
               placeholder="Full Name"
               required>

        <input class="form-control mb-3"
               [(ngModel)]="email"
               name="email"
               type="email"
               placeholder="Email"
               required>

        <input class="form-control mb-3"
               [(ngModel)]="password"
               name="password"
               type="password"
               placeholder="Password"
               required>

        <select class="form-control mb-3"
                [(ngModel)]="role"
                name="role">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        <button class="btn btn-success w-100">Register</button>
      </form>

      <div class="mt-3 text-center">
        Already have an account?
        <a routerLink="/login">Login</a>
      </div>
    </div>
  `
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  role = 'viewer';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        alert("Registration successful!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || "Registration failed");
      }
    });
  }
}
