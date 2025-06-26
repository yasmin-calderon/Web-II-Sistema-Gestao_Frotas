import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViagemService } from '../services/viagem.service';
import { ViagemDetalhes, ViagemHistorico } from '../models/viagem.model';
import { AgendamentoStatus } from '../enums/agendamentostatus.enum';
import { RouterModule } from '@angular/router';
import { IniciarViagemComponent } from '../iniciar-viagem/iniciar-viagem.component';
import { FinalizarViagemComponent } from '../finalizar-viagem/finalizar-viagem.component';

@Component({
  selector: 'app-historico-viagens',
  standalone: true,
  imports: [CommonModule, RouterModule, IniciarViagemComponent, FinalizarViagemComponent],
  providers: [DatePipe],
  templateUrl: './historico-viagens.component.html',
  styleUrls: ['./historico-viagens.component.css'] // O seu CSS do Bootstrap deve estar configurado globalmente
})
export class HistoricoViagensComponent implements OnInit {
  viagens: ViagemHistorico[] = [];
  
  // Variáveis de estado para controlar os modais
  modalIniciarAberto = false;
  modalFinalizarAberto = false;
  viagemSelecionadaId: number | null = null;
  
  constructor(private viagemService: ViagemService, public datePipe: DatePipe) {}

  ngOnInit(): void {
    // A lógica de carregamento agora está diretamente no ngOnInit, como no seu exemplo
    this.viagemService.listarViagensPorMotorista().subscribe({
      next: (data) => this.viagens = data,
      error: (err) => console.error('Erro ao carregar o histórico de viagens:', err),
    });
  }

  // A função para carregar pode ser chamada para atualizar a lista
  recarregarViagens(): void {
    this.viagemService.listarViagensPorMotorista().subscribe({
      next: (data) => this.viagens = data,
      error: (err) => console.error('Erro ao recarregar o histórico de viagens:', err),
    });
  }
  
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
  
  // Quando um modal termina com sucesso, recarregamos a lista
  onViagemAtualizada(detalhes: ViagemDetalhes): void {
    console.log('Viagem atualizada com sucesso:', detalhes);
    this.recarregarViagens(); 
  }
}