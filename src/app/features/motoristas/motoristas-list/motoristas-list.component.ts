import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MotoristaService } from '../services/motorista.service';
import { Motorista } from '../models/motorista';
import { AuthService } from '../../../core/auth/login/services/auth.service';

@Component({
  selector: 'app-motoristas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './motoristas-list.component.html',
  styleUrls: ['./motoristas-list.component.css'],
})
export class MotoristasListComponent implements OnInit {
  motoristas: Motorista[] = [];
  perfilUsuario: string | null = null;

  constructor(
    private motoristaService: MotoristaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.perfilUsuario = this.authService.getPerfil();

    this.motoristaService.listarTodos().subscribe({
      next: (data) => this.motoristas = data,
      error: (err) => console.error('Erro ao carregar motoristas:', err),
    });
  }
  deletarMotorista(cpf: string): void {
    if (confirm('Tem certeza que deseja desativar este motorista?')) {
      this.motoristaService.desativar(cpf).subscribe({
        next: () => {
          this.motoristas = this.motoristas.filter(m => m.cpf !== cpf);
        },
        error: (err) => {
          console.error('Erro ao desativar motorista:', err);
          alert('Erro ao desativar motorista');
        }
      });
    }
  }
}
