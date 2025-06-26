package com.example.backend_frotas.dto;

import com.example.backend_frotas.enums.AgendamentoStatus;
import lombok.Data;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Builder

public class ViagemHistoricoDto {
    private Long id;
    private String veiculoInfo; // Formato "Modelo - Placa"
    private String destino;
    private LocalDateTime dataHoraSaidaProgramada; // Ou dataHoraSaidaEfetiva se preferir
    private AgendamentoStatus status;
}
