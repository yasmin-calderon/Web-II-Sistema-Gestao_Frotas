import { AgendamentoStatus } from '../enums/agendamentostatus.enum';

// Para a lista de histórico (RF004)
export interface ViagemHistorico {
    id: number;
    veiculoInfo: string;
    destino: string;
    dataHoraSaida: Date | null; 
    status: AgendamentoStatus;
}

// Para o workflow dentro dos detalhes (RF007)
export interface WorkflowStatus {
    tipoEvento: string;
    descricaoEvento: string;
    dataHora: string;
}

// Para a tela de detalhes completa (RF007)
export interface ViagemDetalhes {
    id: number;
    veiculoUtilizado: string;
    motoristaNome: string;
    dataHoraSaida: Date | null;
    dataHoraRetorno: Date | null;
    destino: string;
    justificativa: string;
    quilometragemSaida: number | null;
    observacoesSaida: string | null;
    statusAtual: AgendamentoStatus;
    quilometragemFinal: number | null;
    observacoesFinal: string | null;
    workflow?: any[]; // Workflow é opcional
}

// Para o corpo da requisição de iniciar viagem (RF005)
export interface IniciarViagemRequest {
    quilometragemSaida: number;
    observacoesSaida?: string;
}

// Para o corpo da requisição de finalizar viagem (RF006)
export interface FinalizarViagemRequest {
    quilometragemRetorno: number;
    observacoesRetorno?: string;
}