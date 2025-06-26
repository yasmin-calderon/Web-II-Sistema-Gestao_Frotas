package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.CreateOcorrenciaDto;
import com.example.backend_frotas.dto.OcorrenciaResponseDto;
import com.example.backend_frotas.entity.Ocorrencia;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.repository.OcorrenciaRepository;
import com.example.backend_frotas.repository.UsuarioRepository;
import com.example.backend_frotas.repository.VeiculoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OcorrenciaService {

    private final OcorrenciaRepository ocorrenciaRepository;
    private final VeiculoRepository veiculoRepository;
    private final UsuarioRepository usuarioRepository;

    public OcorrenciaResponseDto registrar(CreateOcorrenciaDto dto) {
        Veiculo veiculo = veiculoRepository.findById(dto.getVeiculoId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        Usuario motorista = usuarioRepository.findById(dto.getMotoristaId())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setVeiculo(veiculo);
        ocorrencia.setMotorista(motorista);
        ocorrencia.setDescricaoProblema(dto.getDescricaoProblema());
        ocorrencia.setDataRegistro(LocalDateTime.now());
        ocorrencia.setResolvida(false);

        Ocorrencia salva = ocorrenciaRepository.save(ocorrencia);
        return toResponse(salva);
    }

    public List<OcorrenciaResponseDto> listarTodas() {
        return ocorrenciaRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private OcorrenciaResponseDto toResponse(Ocorrencia o) {
        OcorrenciaResponseDto dto = new OcorrenciaResponseDto();
        dto.setId(o.getId());
        dto.setDescricaoProblema(o.getDescricaoProblema());
        dto.setDataRegistro(o.getDataRegistro());
        dto.setResolvida(o.getResolvida());
        dto.setNomeMotorista(o.getMotorista().getNomeCompleto());
        dto.setPlacaVeiculo(o.getVeiculo().getPlaca());
        return dto;
    }
}
