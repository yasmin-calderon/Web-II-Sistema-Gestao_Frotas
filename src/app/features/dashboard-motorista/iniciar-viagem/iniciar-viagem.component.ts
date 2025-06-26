import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViagemService } from '../services/viagem.service'; // Ajuste o caminho se necessário
import { ViagemDetalhes } from '../models/viagem.model'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-iniciar-viagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './iniciar-viagem.component.html',
  styleUrl: './iniciar-viagem.component.css'
})
export class IniciarViagemComponent {
  // @Input recebe o ID da viagem do componente pai (ex: HistoricoViagensComponent)
  @Input() viagemId!: number; 
  
  // @Output emite um evento para o pai quando o modal deve ser fechado
  @Output() fecharModal = new EventEmitter<void>();

  // @Output emite os dados da viagem atualizada para o pai após o sucesso
  @Output() viagemIniciada = new EventEmitter<ViagemDetalhes>(); 

  form: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private viagemService: ViagemService) {
    // Cria o formulário reativo com as validações necessárias
    this.form = this.fb.group({
      quilometragemSaida: ['', [Validators.required, Validators.min(0)]],
      observacoesSaida: [''] // Campo opcional
    });
  }

  // Método chamado quando o formulário é submetido
  onSubmit(): void {
    // Se o formulário for inválido, marca os campos como "tocados" para exibir os erros
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    // Chama o serviço para iniciar a viagem, passando o ID e os dados do formulário
    this.viagemService.iniciarViagem(this.viagemId, this.form.value).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        this.viagemIniciada.emit(data); // Notifica o pai sobre o sucesso
        this.fecharModal.emit(); // Pede ao pai para fechar o modal
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSubmitting = false;
      }
    });
  }

  // Método chamado pelo botão "Cancelar" ou ao clicar no fundo do modal
  cancelar(): void {
    this.fecharModal.emit();
  }
}