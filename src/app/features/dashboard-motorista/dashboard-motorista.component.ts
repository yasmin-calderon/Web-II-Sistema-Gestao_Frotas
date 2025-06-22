/*import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-motorista',
  imports: [],
  templateUrl: './dashboard-motorista.component.html',
  styleUrl: './dashboard-motorista.component.css'
})
export class DashboardMotoristaComponent {

}
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../features/agendamentos/services/agendamento.service';

interface Agendamento {
  id: number;
  dataHoraSaida: Date;
  veiculo: string;
  destino: string;
  status: 'AGENDADO' | 'EM USO' | 'FINALIZADO' | 'CANCELADO';
}

@Component({
  selector: 'app-dashboard-motorista',
  standalone: true,
  templateUrl: './dashboard-motorista.component.html',
  styleUrls: ['./dashboard-motorista.component.css'],
  imports: [CommonModule]
})
export class DashboardMotoristaComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  motoristaId = 1; // 🔁 Este valor será dinâmico no futuro (login)

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getAgendamentosPorMotorista(this.motoristaId)
      .subscribe({
        next: (dados) => {
          this.agendamentos = dados.sort(
            (a, b) => new Date(a.dataHoraSaida).getTime() - new Date(b.dataHoraSaida).getTime()
          );
        },
        error: (erro) => {
          console.error('Erro ao carregar agendamentos:', erro);
        }
      });
  }

  iniciarViagem(agendamento: Agendamento) {
    console.log('Iniciando viagem para:', agendamento);
  }

  finalizarViagem(agendamento: Agendamento) {
    console.log('Finalizando viagem para:', agendamento);
  }

  verDetalhes(agendamento: Agendamento) {
    console.log('Visualizando detalhes de:', agendamento);
  }
}
