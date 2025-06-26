/*import { Component } from '@angular/core';

@Component({
  selector: 'app-abastecimento-form',
  imports: [],
  templateUrl: './abastecimento-form.component.html',
  styleUrl: './abastecimento-form.component.css'
})
export class AbastecimentoFormComponent {

}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-abastecimento-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abastecimento-form.component.html',
  styleUrls: ['./abastecimento-form.component.css']
})
export class AbastecimentoFormComponent {

  abastecimento: Abastecimento = {
    veiculoId: 0,
    motoristaId: 0,
    data: '',
    tipoCombustivel: '',
    valor: 0,
    quilometragem: 0
  };

  veiculos = [
    { id: 1, nome: 'Carro A' },
    { id: 2, nome: 'Carro B' }
  ];

  motoristas = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
  ];

  onSubmit() {
    console.log('Abastecimento registrado:', this.abastecimento);
    // Aqui futuramente vai chamar um serviço para salvar no backend
    alert('Registro de abastecimento enviado com sucesso!');
  }
}

interface Abastecimento {
  veiculoId: number;
  motoristaId: number;
  data: string;
  tipoCombustivel: string;
  valor: number;
  quilometragem: number;
}
