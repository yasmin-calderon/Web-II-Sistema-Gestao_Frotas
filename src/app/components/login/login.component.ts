import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  constructor(private auth: AuthService) {}

  onSubmit(): void {
    this.auth.login(this.email, this.senha).subscribe({
      error: () => this.erro = 'E-mail ou senha incorretos.'
    });
  }
}