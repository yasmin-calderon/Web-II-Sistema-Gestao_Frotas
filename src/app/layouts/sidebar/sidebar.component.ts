import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html', // Usaremos o arquivo HTML
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // Variável temporária para simular o perfil do usuário
  // Podemos mudar para 'Administrador' ou 'Motorista' para testar
  userProfile: 'Motorista' | 'Administrador' | null = 'Administrador'; // Mudar para testar

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Em um cenário real, buscaria o perfil do AuthService aqui:
    // this.userProfile = this.authService.getUserProfile();
    // Por enquanto, mantenho o valor fixo para testes de layout.
  }

  logout(): void {
    // Isso ainda é um placeholder, até ter o login
    // Por enquanto, apenas redireciona para a tela de login.
    console.log('Tentando logout...');
    // this.authService.logout(); // Chama o método (vazio) do AuthService
    this.router.navigate(['/login']);
  }
}
