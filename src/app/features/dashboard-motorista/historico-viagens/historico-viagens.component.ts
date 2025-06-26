import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViagemService } from '../services/viagem.service';
import { ViagemDetalhes, ViagemHistorico } from '../models/viagem.model';
import { RouterModule } from '@angular/router';
import { IniciarViagemComponent } from '../iniciar-viagem/iniciar-viagem.component';
import { FinalizarViagemComponent } from '../finalizar-viagem/finalizar-viagem.component';

@Component({
  selector: 'app-historico-viagens',
  standalone: true,
  imports: [CommonModule, RouterModule, IniciarViagemComponent, FinalizarViagemComponent],
  providers: [DatePipe],
  templateUrl: './historico-viagens.component.html',
  styleUrls: ['./historico-viagens.component.css']
})
export class HistoricoViagensComponent implements OnInit {
  viagens: ViagemHistorico[] = [];
  
  // Variáveis de estado para controlar os modais
  modalIniciarAberto = false;
  modalFinalizarAberto = false;
  viagemSelecionadaId: number | null = null;
  
  constructor(private viagemService: ViagemService, public datePipe: DatePipe) {}

  ngOnInit(): void {
    this.viagemService.listarViagensPorMotorista().subscribe({
      next: (data) => this.viagens = data,
      error: (err) => console.error('Erro ao carregar o histórico de viagens:', err),
    });
  }

  recarregarViagens(): void {
    this.viagemService.listarViagensPorMotorista().subscribe({
      next: (data) => this.viagens = data,
      error: (err) => console.error('Erro ao recarregar o histórico de viagens:', err),
    });
  }

  // Modais
  
  abrirModalIniciar(viagemId: number): void {
    this.viagemSelecionadaId = viagemId;
    this.modalIniciarAberto = true;
  }

  fecharModalIniciar(): void {
    this.modalIniciarAberto = false;
    this.viagemSelecionadaId = null;
  }

  abrirModalFinalizar(viagemId: number): void {
    this.viagemSelecionadaId = viagemId;
    this.modalFinalizarAberto = true;
  }

  fecharModalFinalizar(): void {
    this.modalFinalizarAberto = false;
    this.viagemSelecionadaId = null;
  }
  
  // Recarregar lista após executar modal
  onViagemAtualizada(detalhes: ViagemDetalhes): void {
    console.log('Viagem atualizada com sucesso:', detalhes);
    this.recarregarViagens(); 
  }
}