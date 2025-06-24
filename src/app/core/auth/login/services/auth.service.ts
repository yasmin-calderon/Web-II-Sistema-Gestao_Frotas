import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  perfil: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // tipo explícito
  private readonly baseUrl: string = 'http://localhost:8080/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    const url: string = `${this.baseUrl}/login`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<LoginResponse>(
        url,
        { email: email, senha: senha },
        { headers: headers }
      )
      .pipe(
        tap((resp: LoginResponse) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('perfil', resp.perfil);

          if (resp.perfil === 'ADMINISTRADOR') {
            this.router.navigate(['/app/administrador']);
          } else if (resp.perfil === 'MOTORISTA') {
            this.router.navigate(['/app/agendamentos']);
          } else {
            this.router.navigate(['/not-found']); // TODO: Redirecionar para uma página padrão ou de erro
          }
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}