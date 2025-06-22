
import { Component, OnInit } from '@angular/core';
import { Administrador, AdministradorService } from '../../administradores/services/administrador.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule]
})
export class AdministradorListComponent implements OnInit {
  administradores: Administrador[] = [];
  carregando = true;
  erro?: string;

  constructor(private administradorService: AdministradorService) {}

  ngOnInit() {
    this.administradorService.listar().subscribe({
      next: (dados) => {
        this.administradores = dados;
        this.carregando = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar administradores.';
        this.carregando = false;
        console.error(err);
      }
    });
  }
}

