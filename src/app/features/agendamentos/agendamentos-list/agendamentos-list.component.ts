import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../services/agendamento.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/login/services/auth.service';

@Component({
  selector: 'app-agendamentos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agendamentos-list.component.html',
  styleUrls: ['./agendamentos-list.component.css']
})
export class AgendamentosListComponent implements OnInit {
  agendamentos: any[] = [];
  perfil: string | null = null;

  constructor(
    private agendamentoService: AgendamentoService,
    private authService: AuthService
    
  ) {}

  ngOnInit(): void {
    this.perfil = this.authService.getPerfil();

    if (this.perfil === 'ADMINISTRADOR') {
      this.agendamentoService.getTodosAgendamentos().subscribe({
        next: (data) => this.agendamentos = data,
        error: (err) => console.error('Erro ao carregar agendamentos:', err)
      });
    }
  }
}
