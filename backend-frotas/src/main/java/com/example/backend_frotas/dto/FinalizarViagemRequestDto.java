package com.example.backend_frotas.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data

public class FinalizarViagemRequestDto {
    @NotNull(message = "Quilometragem de retorno é obrigatória.")
    @PositiveOrZero(message = "Quilometragem de retorno deve ser um valor positivo ou zero.")
    private Double quilometragemRetorno;

    private String observacoesRetorno; // Opcional
}
