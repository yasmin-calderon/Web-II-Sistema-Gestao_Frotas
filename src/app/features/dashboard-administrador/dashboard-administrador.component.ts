import { Component } from '@angular/core';
import { AdministradorListComponent } from '../administradores/administrador-list/administrador-list.component'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-administrador',
  standalone: true,
  imports: [CommonModule, AdministradorListComponent],
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css']
})
export class DashboardAdministradorComponent {
  constructor(private router: Router) {}

  irParaCadastro() {
    this.router.navigate(['/app/administradores/novo']);
  }

  irParaEdicao() {
    const id = 1; /// exemploo
    this.router.navigate([`/app/administradores/editar/${id}`]);
  }
}
