import { AgendamentoStatus } from '../enums/agendamentostatus.enum';

// Histórico (RF004)
export interface ViagemHistorico {
    id: number;
    veiculoInfo: string;
    destino: string;
    dataHoraSaida: Date | null; 
    status: AgendamentoStatus;
}

// Iniciar Viagem (RF005)
export interface IniciarViagemRequest {
    quilometragemSaida: number;
    observacoesSaida?: string;
}

// Finalizar Viagem (RF006)
export interface FinalizarViagemRequest {
    quilometragemRetorno: number;
    observacoesRetorno?: string;
}

// Detalhes (RF007)
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
    workflow?: any[];
}

// Workflow de detalhes (RF007)
export interface WorkflowStatus {
    tipoEvento: string;
    descricaoEvento: string;
    dataHora: string;
}