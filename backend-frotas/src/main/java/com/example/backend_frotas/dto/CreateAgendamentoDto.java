package com.example.backend_frotas.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class CreateAgendamentoDto {

    @NotNull
    private Long idMotorista;

    @NotNull
    private Long idVeiculo;

    @NotNull
    private LocalDateTime dataHoraSaida;

    @NotBlank
    private String destino;

    @NotBlank
    private String justificativa;

    // Getters e Setters
    public Long getIdMotorista() {
        return idMotorista;
    }

    public void setIdMotorista(Long idMotorista) {
        this.idMotorista = idMotorista;
    }

    public Long getIdVeiculo() {
        return idVeiculo;
    }

    public void setIdVeiculo(Long idVeiculo) {
        this.idVeiculo = idVeiculo;
    }

    public LocalDateTime getDataHoraSaida() {
        return dataHoraSaida;
    }

    public void setDataHoraSaida(LocalDateTime dataHoraSaida) {
        this.dataHoraSaida = dataHoraSaida;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }
}
