import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const perfil = this.authService.getPerfil(); // Implement this to get user info
    if (perfil && perfil === 'ADMINISTRADOR') {
      return true;
    }
    this.router.navigate(['/app/forbidden']); // Redirect to forbidden page if not admin
    return false;
  }
}