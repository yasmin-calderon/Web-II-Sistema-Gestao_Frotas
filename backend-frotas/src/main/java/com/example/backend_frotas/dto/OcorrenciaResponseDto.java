package com.example.backend_frotas.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OcorrenciaResponseDto {
    private Long id;
    private String descricaoProblema;
    private LocalDateTime dataRegistro;
    private boolean resolvida;
    private String nomeMotorista;
    private String placaVeiculo;
}
