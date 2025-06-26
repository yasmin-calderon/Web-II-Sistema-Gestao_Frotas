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

    /**
     * RF004: Busca a lista de viagens do motorista a partir do backend.
     * Esta é a chamada HTTP real.
     */
    listarViagensPorMotorista(): Observable<ViagemHistorico[]> {
        console.log('ViagemService: Fazendo chamada HTTP REAL para listar viagens...');
        
        // MUDANÇA: A chamada HTTP real está ativa.
        // O mock foi removido.
        return this.http.get<ViagemHistorico[]>(`${this.apiUrl}/motorista/meu-historico`).pipe(
            tap(data => console.log('Dados brutos recebidos do backend:', data)),
            // Transforma as strings de data em objetos Date
            map(viagens => viagens.map(viagem => ({
                ...viagem,
                dataHoraSaida: viagem.dataHoraSaida ? new Date(viagem.dataHoraSaida) : null
            }))),
            tap(data => console.log('Dados transformados para o componente:', data)),
            catchError(this.handleError)
        );
    }

    /**
     * RF007: Busca os detalhes de uma viagem no backend.
     */
    obterDetalhesViagem(viagemId: number): Observable<ViagemDetalhes> {
        return this.http.get<any>(`${this.apiUrl}/${viagemId}`).pipe(
            tap(data => console.log(`Dados brutos recebidos para detalhes da viagem ${viagemId}:`, data)),
            // MUDANÇA: O 'map' agora faz a tradução completa dos nomes de campos
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            tap(data => console.log(`Dados transformados para o componente de detalhes:`, data)),
            catchError(this.handleError)
        );
    }

    /**
     * RF005: Envia os dados para iniciar uma viagem para o backend.
     */
    iniciarViagem(viagemId: number, dados: IniciarViagemRequest): Observable<ViagemDetalhes> {
        return this.http.post<any>(`${this.apiUrl}/${viagemId}/iniciar`, dados).pipe(
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            catchError(this.handleError)
        );
    }

    /**
     * RF006: Envia os dados para finalizar uma viagem para o backend.
     */
    finalizarViagem(viagemId: number, dados: FinalizarViagemRequest): Observable<ViagemDetalhes> {
        return this.http.post<any>(`${this.apiUrl}/${viagemId}/finalizar`, dados).pipe(
            map(backendDto => this.transformToViagemDetalhes(backendDto)),
            catchError(this.handleError)
        );
    }

    private transformToViagemDetalhes(backendDto: any): ViagemDetalhes {
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

    /**
     * Método privado para tratar erros de HTTP.
     */
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
