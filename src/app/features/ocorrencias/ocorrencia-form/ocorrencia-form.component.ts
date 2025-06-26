import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { OcorrenciaService } from '../services/ocorrencia.service';
import { Ocorrencia } from '../models/ocorrencia';

@Component({
  selector: 'app-ocorrencia-form',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './ocorrencia-form.component.html'
})
export class OcorrenciaFormComponent {
  ocorrencia: Ocorrencia = {
    veiculoId: 0,
    descricaoProblema: '',
    motoristaId: 0
  };

  constructor(private ocorrenciaService: OcorrenciaService) {}

  registrar() {
    this.ocorrenciaService.registrarOcorrencia(this.ocorrencia).subscribe({
      next: () => {
        alert('Ocorrência registrada com sucesso!');
        this.ocorrencia = { veiculoId: 0, descricaoProblema: '', motoristaId: 0 };
      },
      error: (err) => {
        alert('Erro ao registrar ocorrência');
        console.error(err);
      }
    });
  }
}
