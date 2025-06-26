import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { VeiculoService } from '../../veiculos/services/veiculo.service';
import { MotoristaService } from '../../motoristas/services/motorista.service';
import { AgendamentoService } from '../services/agendamento.service';

import { Motorista } from '../../motoristas/models/motorista';
import { Veiculo } from '../../veiculos/models/veiculo';

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css'],
})
export class AgendamentoFormComponent implements OnInit {
  agendamentoForm!: FormGroup;
  motoristas: Motorista[] = [];
  veiculos: Veiculo[] = [];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agendamentoForm = this.fb.group({
      idMotorista: [null, Validators.required],
      idVeiculo: [null, Validators.required],
      dataHoraSaida: [null, Validators.required],
      destino: ['', Validators.required],
      justificativa: ['', Validators.required],
    });

    this.motoristaService.listarTodos().subscribe({
      next: (data) => this.motoristas = data,
      error: (err) => console.error('Erro ao carregar motoristas:', err)
    });

    this.veiculoService.listarTodos().subscribe({
      next: (data) => this.veiculos = data,
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  onSubmit() {
    if (this.agendamentoForm.valid) {
      this.agendamentoService.criarAgendamento(this.agendamentoForm.value).subscribe({
        next: () => this.router.navigate(['/app/administrador']),
        error: (err) => console.error('Erro ao agendar:', err)
      });
    }
  }
}
