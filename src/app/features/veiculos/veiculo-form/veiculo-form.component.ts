import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoService } from '../services/veiculo.service';
import { Veiculo } from '../models/veiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {
  veiculo: Veiculo = {
    placa: '',
    modelo: '',
    tipo: '',
    ano: new Date().getFullYear(),
    quilometragemAtual: 0,
    status: 'DISPONIVEL',
    ativo: true
  };
  isEdit = false;

  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.veiculoService.buscarPorId(+id).subscribe({
        next: (data) => this.veiculo = data,
        error: () => this.router.navigate(['/app/veiculos'])
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.veiculo.id) {
      this.veiculoService.editar(this.veiculo.id, this.veiculo).subscribe({
        next: () => this.router.navigate(['/app/veiculos']),
        error: (err) => alert('Erro ao atualizar veículo')
      });
    } else {
      this.veiculoService.criar(this.veiculo).subscribe({
        next: () => this.router.navigate(['/app/veiculos']),
        error: (err) => alert('Erro ao cadastrar veículo')
      });
    }
  }
}
