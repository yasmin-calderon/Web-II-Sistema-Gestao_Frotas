package com.example.backend_frotas.dto;

import lombok.Data;

@Data
public class CreateOcorrenciaDto {
    private Long veiculoId;
    private String descricaoProblema;
    private Long motoristaId;
}
