import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../core/auth/auth.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Supondo que temos um NotificationService e uma interface para notificações
interface Notification {
  id: string;
  message: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NgbDropdownModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  currentUserDisplayName: string = 'Usuário Teste';
  currentUserProfile: 'Motorista' | 'Administrador' | null = 'Administrador'; // Simulação do perfil

  notifications: Notification[] = []; // Array de notificações
  unreadNotificationsCount: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Em um cenário real, buscariamos o nome e perfil do AuthService
    // this.currentUserDisplayName = this.authService.getCurrentUser()?.nomeCompleto || 'Usuário';
    // this.currentUserProfile = this.authService.getUserProfile();

    this.loadNotifications(); // Carrega as notificações iniciais
  }

  logout(): void {
    console.log('Tentando logout...');
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadNotifications(): void {
    // Simulação de carregamento de notificações
    // Em um projeto real, teriamos um NotificationService para isso
    this.notifications = [
      { id: '1', message: 'Manutenção preventiva da Van C agendada para 01/06.', date: new Date(), read: false },
      { id: '2', message: 'Ocorrência: Ruído estranho no Furgão A, motorista Paulo.', date: new Date(new Date().setDate(new Date().getDate() - 1)), read: false },
      { id: '3', message: 'Novo agendamento criado para Caminhonete B.', date: new Date(new Date().setDate(new Date().getDate() - 2)), read: true }
    ];
    this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  }
}
