import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoViaCep } from './viacep.model';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<EnderecoViaCep> {
    return this.http.get<EnderecoViaCep>(`${this.apiUrl}/${cep}/json`);
  }
}
