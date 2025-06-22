package com.example.backend_frotas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Administrador {

    @Id
    private String cpf;
    private String nomeCompleto;
    private String telefone;
    private String cep;
    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;
    private String email;
    private String senha;
    private boolean ativo;
}
