package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.CreateMotoristaDto;
import com.example.backend_frotas.dto.UpdateMotoristaDto;
import com.example.backend_frotas.model.Motorista;
import com.example.backend_frotas.service.MotoristaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/motoristas")
public class MotoristaController {

    @Autowired
    private MotoristaService motoristaService;

    @PostMapping
    public ResponseEntity<Motorista> criarMotorista(@RequestBody @Valid CreateMotoristaDto dto) {
        Motorista novoMotorista = motoristaService.criar(dto);
        return ResponseEntity.ok(novoMotorista);
    }

    @GetMapping
    public ResponseEntity<List<Motorista>> listarMotoristas() {
        return ResponseEntity.ok(motoristaService.listarTodos());
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Motorista> atualizarMotorista(@PathVariable String cpf, @RequestBody @Valid UpdateMotoristaDto dto) {
        return ResponseEntity.ok(motoristaService.atualizar(cpf, dto));
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> desativarMotorista(@PathVariable String cpf) {
        motoristaService.desativar(cpf);
        return ResponseEntity.noContent().build();
    }
    /// aqui ainda precisa adicionar a parte do motorista nao poder desativar a si mesmo, mas depende da feature de login 
}
