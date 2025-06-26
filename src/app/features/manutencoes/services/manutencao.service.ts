import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manutencao } from '../models/manutencao';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  private apiUrl = 'http://localhost:8080/manutencoes';

  constructor(private http: HttpClient) {}

  criar(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.apiUrl, manutencao);
  }
}
