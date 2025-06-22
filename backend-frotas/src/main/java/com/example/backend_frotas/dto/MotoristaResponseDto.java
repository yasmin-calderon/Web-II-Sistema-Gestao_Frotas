package com.example.backend_frotas.dto;

import lombok.Data;

@Data
public class MotoristaResponseDto {
    private Long id;
    private String nomeCompleto;
    private String cpf;
    private String email;
    private String telefone;
}