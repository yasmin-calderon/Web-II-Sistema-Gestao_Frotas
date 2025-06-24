import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-404',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top: 5rem;">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
    </div>
  `,
  styles: []
})
export class NotFound404Component {}