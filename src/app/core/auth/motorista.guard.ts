import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login/services/auth.service';

@Injectable({ providedIn: 'root' })
export class MotoristaGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean { // Mesma lógica da Admin para aplicação nas rotas
    const perfil = this.authService.getPerfil();
    if (perfil === 'MOTORISTA') {
      return true;
    } else {
      this.router.navigate(['/app/forbidden']);
      return false;
    }
  }
}