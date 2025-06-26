import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient) {}

  getAgendamentosPorMotorista(motoristaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorista/${motoristaId}`);
  }

  getTodosAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Envia os dados do formulário para agendar uma nova viagem */
  criarAgendamento(dto: {
    idMotorista: number;
    idVeiculo: number;
    dataHoraSaida: string;
    destino: string;
    justificativa: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, dto);
  }
  
}


