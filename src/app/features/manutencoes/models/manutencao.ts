/*export class Manutencao {
}*/

export interface Manutencao {
    id?: number;
    veiculoId: number;
    dataManutencao: string; // ISO format YYYY-MM-DD
    tipo: 'PREVENTIVA' | 'CORRETIVA';
    descricao: string;
    valor: number;
    quilometragemManutencao: number;
  }
