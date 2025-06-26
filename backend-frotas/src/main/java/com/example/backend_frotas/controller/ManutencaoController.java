package com.example.backend_frotas.controller;

import com.example.backend_frotas.entity.Manutencao;
import com.example.backend_frotas.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manutencoes")
@CrossOrigin(origins = "http://localhost:4200") // ajuste se necessário
public class ManutencaoController {

    @Autowired
    private ManutencaoService manutencaoService;

    @PostMapping
    public ResponseEntity<Manutencao> registrar(@RequestBody Manutencao manutencao) {
        Manutencao salvo = manutencaoService.registrarManutencao(manutencao);
        return ResponseEntity.status(201).body(salvo);
    }
}
