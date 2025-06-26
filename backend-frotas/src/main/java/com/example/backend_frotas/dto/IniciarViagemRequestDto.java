package com.example.backend_frotas.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data

public class IniciarViagemRequestDto {
     @NotNull(message = "Quilometragem de saída é obrigatória.")
    @PositiveOrZero(message = "Quilometragem de saída deve ser um valor positivo ou zero.")
    private Double quilometragemSaida;
    private String observacoesSaida;
}