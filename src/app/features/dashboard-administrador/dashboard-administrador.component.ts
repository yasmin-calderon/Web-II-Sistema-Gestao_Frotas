import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../features/agendamentos/services/agendamento.service';

interface Agendamento {
  id: number;
  dataHoraSaida: Date;
  veiculo: string;
  destino: string;
  status: 'AGENDADO' | 'EM USO' | 'FINALIZADO' | 'CANCELADO';
  motoristaNome: string;
}

@Component({
  selector: 'app-dashboard-administrador',
  standalone: true,
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardAdministradorComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  agendamentosFiltrados: Agendamento[] = [];

  filtroStatus: string = '';
  filtroMotorista: string = '';
  filtroData: string = '';

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router) {}
  
  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getTodosAgendamentos().subscribe({
      next: (dados) => {
        this.agendamentos = dados;
        this.aplicarFiltros();
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
      }
    });
  }

  aplicarFiltros() {
    this.agendamentosFiltrados = this.agendamentos.filter(agendamento => {
      const dataFiltro = this.filtroData ? new Date(this.filtroData).toDateString() : '';
      const dataAgendamento = new Date(agendamento.dataHoraSaida).toDateString();

      return (!this.filtroStatus || agendamento.status === this.filtroStatus)
        && (!this.filtroMotorista || agendamento.motoristaNome.toLowerCase().includes(this.filtroMotorista.toLowerCase()))
        && (!this.filtroData || dataAgendamento === dataFiltro);
    });
  }

  agendarViagem() {
    this.router.navigate(['/app/agendamentos/novo']);
  }

  registrarAbastecimento() {
    console.log('Registrar Abastecimento');
  }

  registrarManutencao() {
    console.log('Registrar Manutenção');
  }
}
