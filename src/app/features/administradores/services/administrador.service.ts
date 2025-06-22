import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Administrador {
  id?: number;
  cpf: string;
  nomeCompleto: string;
  telefone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = 'http://localhost:8080/administradores';

  constructor(private http: HttpClient) {}

  criarAdministrador(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.apiUrl, admin);
  }

  listar(): Observable<Administrador[]> {
  return this.http.get<Administrador[]>(this.apiUrl);
  }
  buscarPorId(id: string) {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
  }
  
  atualizarAdministrador(id: string, dados: any) {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }  

  desativar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorCpf(cpf: string): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${cpf}`);
  }
}

