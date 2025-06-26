package com.example.backend_frotas.service;

import com.example.backend_frotas.dto.AgendamentoResponseDto;
import com.example.backend_frotas.dto.CreateAgendamentoDto;
import com.example.backend_frotas.entity.Agendamento;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.entity.Veiculo;
import com.example.backend_frotas.enums.PerfilUsuario;
import com.example.backend_frotas.enums.AgendamentoStatus;
import com.example.backend_frotas.repository.AgendamentoRepository;
import com.example.backend_frotas.repository.UsuarioRepository;
import com.example.backend_frotas.repository.VeiculoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Transactional
    public Agendamento agendar(CreateAgendamentoDto dto) {
        Usuario motorista = usuarioRepository.findById(dto.getIdMotorista())
                .filter(u -> u.getPerfil().equals(PerfilUsuario.MOTORISTA) && Boolean.TRUE.equals(u.getAtivo()))
                .orElseThrow(() -> new RuntimeException("Motorista inválido"));

        Veiculo veiculo = veiculoRepository.findById(dto.getIdVeiculo())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        Agendamento agendamento = new Agendamento();
        agendamento.setMotorista(motorista);
        agendamento.setVeiculo(veiculo);
        agendamento.setDataHoraSaida(dto.getDataHoraSaida());
        agendamento.setDestino(dto.getDestino());
        agendamento.setJustificativa(dto.getJustificativa());
        agendamento.setStatus(AgendamentoStatus.AGENDADO);

        return agendamentoRepository.save(agendamento);
    }
    public AgendamentoResponseDto toDto(Agendamento agendamento) {
    AgendamentoResponseDto dto = new AgendamentoResponseDto();
    dto.setId(agendamento.getId());
    dto.setDestino(agendamento.getDestino());
    dto.setDataHoraSaida(agendamento.getDataHoraSaida());
    dto.setStatus(agendamento.getStatus().toString());
    dto.setMotoristaNome(agendamento.getMotorista().getNomeCompleto());
    dto.setVeiculo(agendamento.getVeiculo().getModelo()); 
    return dto;
}

}
