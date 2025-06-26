package com.example.backend_frotas.controller;

import com.example.backend_frotas.entity.Agendamento;
import com.example.backend_frotas.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
