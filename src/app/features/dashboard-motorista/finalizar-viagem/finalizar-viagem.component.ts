import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViagemService } from '../services/viagem.service';
import { ViagemDetalhes } from '../models/viagem.model';

@Component({
  selector: 'app-finalizar-viagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './finalizar-viagem.component.html',
  styleUrl: './finalizar-viagem.component.css'
})
export class FinalizarViagemComponent {
  @Input() viagemId!: number;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() viagemFinalizada = new EventEmitter<ViagemDetalhes>();

  form: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private viagemService: ViagemService) {
    this.form = this.fb.group({
      quilometragemRetorno: ['', [Validators.required, Validators.min(0)]],
      observacoesRetorno: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    this.viagemService.finalizarViagem(this.viagemId, this.form.value).subscribe({
      next: (data) => {
        this.isSubmitting = false;
        this.viagemFinalizada.emit(data);
        this.fecharModal.emit();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSubmitting = false;
      }
    });
  }

  cancelar(): void {
    this.fecharModal.emit();
  }
}