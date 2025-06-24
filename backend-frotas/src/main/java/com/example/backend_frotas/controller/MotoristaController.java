package com.example.backend_frotas.controller;

import com.example.backend_frotas.dto.CreateMotoristaDto;
import com.example.backend_frotas.dto.MotoristaResponseDto;
import com.example.backend_frotas.dto.UpdateMotoristaDto;
import com.example.backend_frotas.entity.Usuario;
import com.example.backend_frotas.service.MotoristaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/motoristas")
public class MotoristaController {

    @Autowired
    private MotoristaService motoristaService;

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PostMapping
    public ResponseEntity<Usuario> criarMotorista(@RequestBody @Valid CreateMotoristaDto dto) {
        Usuario novoMotorista = motoristaService.criar(dto);
        return ResponseEntity.ok(novoMotorista);
    }

    @GetMapping
    public ResponseEntity<List<MotoristaResponseDto>> listarMotoristas() {
        return ResponseEntity.ok(motoristaService.listarTodos());
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Usuario> buscarPorCpf(@PathVariable String cpf) {
        Usuario motorista = motoristaService.buscarPorCpf(cpf);
        return ResponseEntity.ok(motorista);
    }

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @PutMapping("/{cpf}")
    public ResponseEntity<Usuario> atualizarMotorista(@PathVariable String cpf, @RequestBody @Valid UpdateMotoristaDto dto) {
        return ResponseEntity.ok(motoristaService.atualizar(cpf, dto));
    }

    @PreAuthorize("@customSecurity.hasPerfil(authentication, 'ADMINISTRADOR')")
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> desativarMotorista(@PathVariable String cpf) {
        //
        motoristaService.desativar(cpf);
        return ResponseEntity.noContent().build();
    }
}

