import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VeiculoService } from '../services/veiculo.service';
import { Veiculo } from '../models/veiculo';

@Component({
  selector: 'app-veiculos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './veiculos-list.component.html',
  styleUrl: './veiculos-list.component.css'
})
export class VeiculosListComponent implements OnInit {
  veiculos: Veiculo[] = [];
  sortColumn: string = '';
  sortAsc: boolean = true;

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.veiculoService.listarTodos().subscribe({
      next: (data) => this.veiculos = data,
      error: (err) => console.error('Erro ao carregar veículos:', err),
    });
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.veiculos.sort((a: any, b: any) => {
      if (a[column] < b[column]) return this.sortAsc ? -1 : 1;
      if (a[column] > b[column]) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  inativarVeiculo(id: number | undefined): void {
    if (!id) return;
    this.veiculoService.inativar(id).subscribe({
      next: () => {
        this.veiculos = this.veiculos.map(v =>
          v.id === id ? { ...v, status: "INATIVO" } : v
        );
      },
      error: (err) => console.error('Erro ao inativar veículo:', err),
    });
  }

  getStatusLabel(status: String): String {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível';
      case 'EM_MANUTENCAO':
        return 'Manutenção';
      case 'INATIVO':
        return 'Inativo';
      default:
        return status;
    }
  }
}
