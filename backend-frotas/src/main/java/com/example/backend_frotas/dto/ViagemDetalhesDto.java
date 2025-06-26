package com.example.backend_frotas.dto;

import com.example.backend_frotas.enums.AgendamentoStatus;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ViagemDetalhesDto {
    private Long id;
    private String veiculoUtilizado; 
    private String motoristaNome;
    private LocalDateTime dataHoraSaida;
    private LocalDateTime dataHoraRetorno;
    private String destino;
    private String justificativa;
    private BigDecimal quilometragemSaida;
    private BigDecimal quilometragemFinal;
    private String observacoesSaida;
    private String observacoesFinal;
    private AgendamentoStatus statusAtual;
    private List<WorkflowStatusDto> workflow;
}