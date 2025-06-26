package com.example.backend_frotas.dto;

import lombok.Data;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Builder

public class WorkflowStatusDto {
    private String tipoEvento; 
    private String descricaoEvento; 
    private LocalDateTime dataHora;
}
