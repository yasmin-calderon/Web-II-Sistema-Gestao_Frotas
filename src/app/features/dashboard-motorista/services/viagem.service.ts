import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ViagemHistorico, ViagemDetalhes, IniciarViagemRequest, FinalizarViagemRequest } from '../models/viagem.model';

@Injectable({
    providedIn: 'root'
})
export class ViagemService {
    private readonly apiUrl = 'http://localhost:8080/viagens';

    constructor(private http: HttpClient) { }
    listarViagensPorMotorista(): Observable<ViagemHistorico[]> { //RF0004
        console.log('ViagemService: Fazendo chamada HTTP REAL para listar viagens...');
        
        return this.http.get<ViagemHistorico[]>(`${this.apiUrl}/motorista/meu-historico`).pipe(
            tap(data => console.log('Dados brutos recebidos do backend:', data)),
            map(viagens => viagens.map(viagem => ({
                ...viagem,
                dataHoraSaida: viagem.dataHoraSaida ? new Date(viagem.dataHoraSaida) : null
            }))),
            tap(data => console.log('Dados transformados para o componente:', data)),
            catchError(this.handleError)
        );
    }

    obterDetalhesViagem(viagemId: number): Observable<ViagemDetalhes> { //RF007
        return this.http.get<any>(`${this.apiUrl}/${viagemId}`).pipe(
            tap(data => console.log(`Dados brutos recebidos para detalhes da viagem ${viagemId}:`, data)),
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            tap(data => console.log(`Dados transformados para o componente de detalhes:`, data)),
            catchError(this.handleError)
        );
    }

    iniciarViagem(viagemId: number, dados: IniciarViagemRequest): Observable<ViagemDetalhes> { //RF005
        return this.http.post<any>(`${this.apiUrl}/${viagemId}/iniciar`, dados).pipe(
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            catchError(this.handleError)
        );
    }

    finalizarViagem(viagemId: number, dados: FinalizarViagemRequest): Observable<ViagemDetalhes> { //RF006
        return this.http.post<any>(`${this.apiUrl}/${viagemId}/finalizar`, dados).pipe(
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            catchError(this.handleError)
        );
    }

    private transformToViagemDetalhes(backendDto: any): ViagemDetalhes { // Método auxiliar para garantir a conformidade dos dados
        return {
            id: backendDto.id,
            veiculoUtilizado: backendDto.veiculoUtilizado,
            motoristaNome: backendDto.motoristaNome,
            destino: backendDto.destino,
            justificativa: backendDto.justificativa,
            quilometragemSaida: backendDto.quilometragemSaida,
            observacoesSaida: backendDto.observacoesSaida,
            statusAtual: backendDto.statusAtual,
            dataHoraSaida: backendDto.dataHoraSaida ? new Date(backendDto.dataHoraSaida) : null,
            dataHoraRetorno: backendDto.dataHoraRetorno ? new Date(backendDto.dataHoraRetorno) : null,
            quilometragemFinal: backendDto.quilometragemFinal,
            observacoesFinal: backendDto.observacoesFinal,
            workflow: backendDto.workflow || []
        };
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erro de rede ou do lado do cliente: ${error.error.message}`;
        } else {
            errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.error?.message || error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
