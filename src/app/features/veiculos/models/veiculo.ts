export interface Veiculo {
  id?: number;
  placa: string;
  modelo: string;
  tipo: String;
  ano: number;
  quilometragemAtual: number;
  status: String;
  ativo: boolean;

  // Related entities (optional, use correct types if you have them)
  agendamentos?: any[];
  ocorrencias?: any[];
  abastecimentos?: any[];
  manutencoes?: any[];
}

