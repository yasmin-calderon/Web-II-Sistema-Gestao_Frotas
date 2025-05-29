export class Motorista {
    id: number;
    nomeCompleto: string;
    cpf: string; 
    cnh: string;
    validadeCnh: string; // inicialmente coloquei como string, vou tratar depois
    telefone: string;
    cep: string; // aqui vai ter a validacao via integracao da api
    logradouro: string; // preenchimento automatico via api de cep
    bairro: string; // preenchimento automatico via api de cep
    cidade: string; // preenchimento automatico via api de cep
    estado: string; // preenchimento automatico via api de cep
    email: string;
    senha: string;
  }
  