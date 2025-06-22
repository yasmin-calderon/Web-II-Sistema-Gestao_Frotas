package com.example.backend_frotas.model;

import com.example.backend_frotas.enums.PerfilUsuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioModel {
    private Long id;
    private String cpf;
    private String nomeCompleto;
    private String email;
    private String senhaHash;
    private PerfilUsuario perfil;
    private String telefone;
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;
    private Boolean ativo;
}
