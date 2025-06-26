import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../models/veiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:8080/veiculos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  criar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }

  editar(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }

  inativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/inativar`, {});
  }

  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/${id}`);
  }

    // Alias para compatibilidade com outros componentes
  getTodos(): Observable<Veiculo[]> {
    return this.listarTodos();
  }
}
