import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Manutencao } from '../models/manutencao';
import { ManutencaoService } from '../services/manutencao.service';
import { VeiculoService } from '../../veiculos/services/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manutencao-form',
  standalone: true,
  templateUrl: './manutencao-form.component.html',
  styleUrls: ['./manutencao-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ManutencaoFormComponent implements OnInit {
  manutencao: Manutencao = {
    veiculoId: 0,
    dataManutencao: '',
    tipo: 'PREVENTIVA',
    descricao: '',
    valor: 0,
    quilometragemManutencao: 0
  };

  veiculos: any[] = [];

  constructor(
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.getTodos().subscribe((dados) => {
      this.veiculos = dados;
    });
  }

  salvar() {
    // Verifica se a data foi preenchida
    if (!this.manutencao.dataManutencao) {
      alert('Preencha a data da manutenção');
      return;
    }
  
    // Concatena hora fixa para o LocalDateTime
    const dataFormatada = `${this.manutencao.dataManutencao}T00:00:00`;
  
    const manutencaoCorrigida = {
      ...this.manutencao,
      dataManutencao: dataFormatada
    };
  
    console.log('Enviando para o backend:', manutencaoCorrigida); // debug
  
    this.manutencaoService.criar(manutencaoCorrigida).subscribe({
      next: () => {
        alert('Manutenção registrada com sucesso!');
        this.router.navigate(['/app/veiculos']);
      },
      error: (erro) => {
        alert('Erro ao registrar manutenção');
        console.error('Erro detalhado:', erro);
      }
    });
  }
  
}
