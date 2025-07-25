import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
  this.auth.loginWithCredentials(this.username, this.password).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);

      // 🔁 Redirect based on role
      if (res.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (res.role === 'user') {
        this.router.navigate(['/user']);
      }
    },
    error: () => {
      this.error = 'Invalid username or password';
    }
  });
}

}
