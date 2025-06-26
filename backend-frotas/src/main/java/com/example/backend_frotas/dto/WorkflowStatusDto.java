package com.example.backend_frotas.dto;

import lombok.Data;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Builder

public class WorkflowStatusDto {
    private String tipoEvento; // Ex: "Status Alterado", "Ocorrência Registrada"
    private String descricaoEvento; // Ex: "AGENDADO", "EM_USO", "Descrição da Ocorrência"
    private LocalDateTime dataHora;
}
