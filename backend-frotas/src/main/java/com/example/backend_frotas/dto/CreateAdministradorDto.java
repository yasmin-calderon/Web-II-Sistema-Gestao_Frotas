package com.example.backend_frotas.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAdministradorDto {

    @NotBlank
    private String cpf;

    @NotBlank
    private String nomeCompleto;

    @NotBlank
    private String telefone;

    @NotBlank
    private String cep;

    private String logradouro;
    private String bairro;
    private String cidade;
    private String estado;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String senha;
}
