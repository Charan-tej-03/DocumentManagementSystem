import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  template: `
  <div class="container mt-5">
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input class="form-control mb-2" [(ngModel)]="email" name="email" placeholder="Email">
      <input class="form-control mb-2" type="password" [(ngModel)]="password" name="password" placeholder="Password">
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
  <div class="mt-3 text-center">
       Don't have an account?
       <a routerLink="/register">Register</a>
  </div>

  `
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/documents']);
      });
  }
}
