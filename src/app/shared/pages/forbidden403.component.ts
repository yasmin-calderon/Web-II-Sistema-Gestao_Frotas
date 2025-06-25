import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden-403',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top: 5rem;">
      <h1>403 - Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
     <!--  <a routerLink="/login">Voltar para o login</a> -->
    </div>
  `,
  styles: []
})
export class Forbidden403Component {}