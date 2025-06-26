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

  workflowSteps: { descricaoEvento: string }[] = [
    { descricaoEvento: 'Agendado' },
    { descricaoEvento: 'Em Uso' },
    { descricaoEvento: 'Finalizado' }
  ];

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

    // Validação de status do workflow
    isStepCompleted(stepIndex: number): boolean {
      if (!this.viagem || !this.viagem.workflow) return false;
      const stepDescription = this.workflowSteps[stepIndex].descricaoEvento;
      return this.viagem.workflow.some(e => e.descricaoEvento === stepDescription);
    }

    getEventDate(stepDescription: string): Date | null {
      if (!this.viagem || !this.viagem.workflow) return null;
      const event = this.viagem.workflow.find(e => e.descricaoEvento === stepDescription);
      return event ? event.dataHora : null;
    }

    getWorkflowProgressPercentage(): number {
      if (!this.viagem || !this.viagem.workflow) return 0;
      const completedStepsCount = this.viagem.workflow.length;
      if (completedStepsCount <= 1) return 0;
      return ((completedStepsCount - 1) / (this.workflowSteps.length - 1)) * 100;
    }
}