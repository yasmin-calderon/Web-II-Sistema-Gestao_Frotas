import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './login/services/auth.service' // Comentando temporariamente

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {} // Comente ou ajuste o constructor

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Retornando true para permitir o acesso durante o desenvolvimento sem login
    /* console.warn('AuthGuard está temporariamente desabilitado para desenvolvimento');
    return true; */

    // Logica final a ser implementada
    if (this.authService.isLoggedIn()) {
      // Usuário autenticado, acesso permitido
      return true;
    } else {
      // Usuário não autenticado, redirecionando para login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
