import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motorista } from '../models/motorista';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MotoristaService {
  private apiUrl = 'http://localhost:8080/motoristas';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl);
  }

  criar(data: any): Observable<Motorista> {
    return this.http.post<Motorista>(this.apiUrl, data);
  }

  buscarPorCpf(cpf: string): Observable<Motorista> {
    return this.http.get<Motorista>(`${this.apiUrl}/${cpf}`);
  }

  atualizar(cpf: string, data: any): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.apiUrl}/${cpf}`, data);
  }
  desativar(cpf: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/motoristas/${cpf}`);
  }
}
