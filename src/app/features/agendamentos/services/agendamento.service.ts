import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:8080/agendamentos'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  getAgendamentosPorMotorista(motoristaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorista/${motoristaId}`);
  }
}
