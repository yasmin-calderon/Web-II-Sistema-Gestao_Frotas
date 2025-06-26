package com.example.backend_frotas.service.impl;

import com.example.backend_frotas.dto.*;
import com.example.backend_frotas.entity.Agendamento;
import com.example.backend_frotas.enums.AgendamentoStatus;
import com.example.backend_frotas.repository.AgendamentoRepository;
import com.example.backend_frotas.service.ViagemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViagemServiceImpl implements ViagemService {

    private final AgendamentoRepository agendamentoRepository;

    @Override
    public List<ViagemHistoricoDto> listarViagensPorMotorista(Long motoristaId) {
        List<Agendamento> agendamentos = agendamentoRepository.findByMotoristaId(motoristaId);
        return agendamentos.stream()
                .map(this::convertToHistoricoDto)
                .collect(Collectors.toList());
    }

    @Override
    public ViagemDetalhesDto obterDetalhesViagem(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agendamento não encontrado"));
        return convertToDetalhesDto(agendamento);
    }

    @Override
    @Transactional
    public ViagemDetalhesDto iniciarViagem(Long id, IniciarViagemRequestDto requestDTO) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agendamento não encontrado para iniciar"));

        if (agendamento.getStatus() != AgendamentoStatus.AGENDADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A viagem não pode ser iniciada pois seu status é: " + agendamento.getStatus());
        }

        agendamento.setQuilometragemSaida(BigDecimal.valueOf(requestDTO.getQuilometragemSaida()));
        agendamento.setObservacoesSaida(requestDTO.getObservacoesSaida());
        agendamento.setStatus(AgendamentoStatus.EM_USO);

        Agendamento agendamentoSalvo = agendamentoRepository.save(agendamento);
        return convertToDetalhesDto(agendamentoSalvo);
    }

    @Override
    @Transactional
    public ViagemDetalhesDto finalizarViagem(Long id, FinalizarViagemRequestDto requestDTO) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agendamento não encontrado para finalizar"));

        if (agendamento.getStatus() != AgendamentoStatus.EM_USO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A viagem não pode ser finalizada pois seu status é: " + agendamento.getStatus());
        }

        agendamento.setQuilometragemFinal(BigDecimal.valueOf(requestDTO.getQuilometragemRetorno()));
        agendamento.setObservacoesFinal(requestDTO.getObservacoesRetorno());
        agendamento.setDataHoraRetorno(LocalDateTime.now());
        agendamento.setStatus(AgendamentoStatus.FINALIZADO);

        Agendamento agendamentoSalvo = agendamentoRepository.save(agendamento);
        return convertToDetalhesDto(agendamentoSalvo);
    }

    private ViagemHistoricoDto convertToHistoricoDto(Agendamento agendamento) {
        return ViagemHistoricoDto.builder()
                .id(agendamento.getId())
                .veiculoInfo(agendamento.getVeiculo().getModelo() + " - " + agendamento.getVeiculo().getPlaca())
                .destino(agendamento.getDestino())
                .dataHoraSaidaProgramada(agendamento.getDataHoraSaida())
                .status(agendamento.getStatus())
                .build();
    }

    private ViagemDetalhesDto convertToDetalhesDto(Agendamento agendamento) {
    return ViagemDetalhesDto.builder()
            .id(agendamento.getId())
            .veiculoUtilizado(agendamento.getVeiculo().getModelo() + " - " + agendamento.getVeiculo().getPlaca())
            .motoristaNome(agendamento.getMotorista().getNomeCompleto())
            .dataHoraSaida(agendamento.getDataHoraSaida())
            .dataHoraRetorno(agendamento.getDataHoraRetorno())
            .destino(agendamento.getDestino())
            .justificativa(agendamento.getJustificativa())
            .quilometragemSaida(agendamento.getQuilometragemSaida())
            .observacoesSaida(agendamento.getObservacoesSaida())
            .statusAtual(agendamento.getStatus())
            .quilometragemFinal(agendamento.getQuilometragemFinal())
            .observacoesFinal(agendamento.getObservacoesFinal())
            .build();
    }
}