import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MotoristaService } from '../services/motorista.service';
import { Motorista } from '../models/motorista';

@Component({
  selector: 'app-motoristas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './motoristas-list.component.html',
  styleUrls: ['./motoristas-list.component.css'],
})
export class MotoristasListComponent implements OnInit {
  motoristas: Motorista[] = [];

  constructor(private motoristaService: MotoristaService) {}

  ngOnInit(): void {
    this.motoristaService.listarTodos().subscribe({
      next: (data) => this.motoristas = data,
      error: (err) => console.error('Erro ao carregar motoristas:', err),
    });
  }
}
