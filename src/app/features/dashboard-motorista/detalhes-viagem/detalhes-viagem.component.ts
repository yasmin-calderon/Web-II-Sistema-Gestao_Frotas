import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ViagemService } from '../services/viagem.service';
import { ViagemDetalhes, ViagemHistorico } from '../models/viagem.model';
import { AgendamentoStatus } from '../enums/agendamentostatus.enum';

@Component({
  selector: 'app-detalhes-viagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './detalhes-viagem.component.html',
  styleUrl: './detalhes-viagem.component.css'
})
export class DetalhesViagemComponent implements OnInit {
  viagem: ViagemDetalhes | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  private statusOrder = [
      AgendamentoStatus.PENDENTE,
      AgendamentoStatus.AGENDADO,
      AgendamentoStatus.EM_USO,
      AgendamentoStatus.FINALIZADO
  ];

  constructor(
    private route: ActivatedRoute,
    private viagemService: ViagemService
  ) {}

  ngOnInit(): void {
    const viagemId = this.route.snapshot.paramMap.get('id');
    if (viagemId) {
      this.carregarDetalhes(+viagemId);
    } else {
      this.isLoading = false;
      this.errorMessage = "ID da viagem não fornecido na rota.";
    }
  }

  carregarDetalhes(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.viagemService.obterDetalhesViagem(id).subscribe({
      next: (data) => {
        this.viagem = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

    getStatusIndex(status: AgendamentoStatus): number {
    const index = this.statusOrder.indexOf(status);
    return index === -1 ? 0 : index; // Retorna 0 se o status não for encontrado
  }
}