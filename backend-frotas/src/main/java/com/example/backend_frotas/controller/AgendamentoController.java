package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.AgendamentoResponseDto;
import com.example.backend_frotas.dto.CreateAgendamentoDto;
import com.example.backend_frotas.entity.Agendamento;
import com.example.backend_frotas.repository.AgendamentoRepository;
import com.example.backend_frotas.service.AgendamentoService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping("/motorista/{id}")
    public List<Agendamento> buscarPorMotorista(@PathVariable Long id) {
        return agendamentoRepository.findByMotoristaId(id);
    }
    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody @Valid CreateAgendamentoDto dto) {
        Agendamento novo = agendamentoService.agendar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }
    // // @PreAuthorize("hasAuthority('ADMINISTRADOR')")
    // @GetMapping
    // public List<Agendamento> listarTodos() {
    //     return agendamentoRepository.findAll();
    // }
    @GetMapping
    public List<AgendamentoResponseDto> listarTodos() {
        return agendamentoRepository.findAll().stream()
            .map(agendamentoService::toDto)
            .toList();
    }


}

