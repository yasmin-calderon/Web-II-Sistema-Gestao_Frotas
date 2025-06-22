package com.example.backend_frotas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateAdministradorDto {

    @NotBlank
    private String nomeCompleto;

    @NotBlank
    private String telefone;

    @NotBlank
    private String email;
}
