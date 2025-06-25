import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.auth.login(this.email, this.senha).subscribe({
      error: (err) => {
        console.log(err)
        if(err.status == 401) {
          this.erro = 'E-mail ou senha incorretos.'
        } else {
          this.erro = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
        }
        alert(this.erro); // Mostra mensagem de erro ao usuário
      }
    });
  }
}